// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

// JWT parsing and validation without jsrsasign.
// - Signatures are verified with WebCrypto (crypto.subtle): RS/PS/ES 256/384/512.
// - Hashing (at_hash / c_hash / PKCE) uses crypto-js.
// - Base64 decoding uses base64-js.

import { Log } from './Log.js';
import SHA256 from 'crypto-js/sha256.js';
import SHA384 from 'crypto-js/sha384.js';
import SHA512 from 'crypto-js/sha512.js';
import Hex from 'crypto-js/enc-hex.js';
import Base64 from 'crypto-js/enc-base64.js';
import { toByteArray } from 'base64-js';

const AllowedSigningAlgs = ['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512', 'ES256', 'ES384', 'ES512'];

const Hashers = { sha256: SHA256, sha384: SHA384, sha512: SHA512 };

function b64ToBytes(s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    while (s.length % 4) {
        s += '=';
    }
    return toByteArray(s);
}

function utf8Decode(bytes) {
    let escaped = '';
    for (let i = 0; i < bytes.length; i++) {
        escaped += '%' + ('0' + bytes[i].toString(16)).slice(-2);
    }
    return decodeURIComponent(escaped);
}

function b64uToJson(s) {
    return JSON.parse(utf8Decode(b64ToBytes(s)));
}

// The JWS signing input is base64url text, i.e. pure ASCII
function asciiToBytes(s) {
    const out = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) {
        out[i] = s.charCodeAt(i);
    }
    return out;
}

function getSubtle() {
    const c = (typeof window !== 'undefined' && window.crypto) ||
        (typeof globalThis !== 'undefined' && globalThis.crypto) ||
        (typeof global !== 'undefined' && global.crypto);
    if (!c || !c.subtle) {
        throw new Error('WebCrypto (crypto.subtle) is not available; a secure context (https) is required');
    }
    return c.subtle;
}

// Minimal DER reader: returns tag, content start/end and the full element end
function readTlv(bytes, offset) {
    const tag = bytes[offset];
    let len = bytes[offset + 1];
    let start = offset + 2;
    if (len & 0x80) {
        const n = len & 0x7f;
        if (n < 1 || n > 4) {
            throw new Error('Unsupported DER length');
        }
        len = 0;
        for (let i = 0; i < n; i++) {
            len = (len * 256) + bytes[start + i];
        }
        start += n;
    }
    const end = start + len;
    if (end > bytes.length) {
        throw new Error('Truncated DER element');
    }
    return { tag, start, end };
}

// Extracts the DER SubjectPublicKeyInfo from a DER X.509 certificate
function spkiFromCertificate(der) {
    const cert = readTlv(der, 0);
    if (cert.tag !== 0x30) {
        throw new Error('Invalid certificate');
    }
    const tbs = readTlv(der, cert.start);
    if (tbs.tag !== 0x30) {
        throw new Error('Invalid certificate');
    }
    let pos = tbs.start;
    let el = readTlv(der, pos);
    if (el.tag === 0xa0) { // [0] version
        pos = el.end;
        el = readTlv(der, pos);
    }
    // serialNumber, signature, issuer, validity, subject
    for (let i = 0; i < 5; i++) {
        pos = el.end;
        el = readTlv(der, pos);
    }
    if (el.tag !== 0x30) {
        throw new Error('Invalid certificate: subjectPublicKeyInfo not found');
    }
    return der.slice(pos, el.end);
}

// Normalizes a JWK into what WebCrypto importKey accepts.
// Extra members (alg, use, key_ops, kid, x5t...) are dropped because they can make importKey reject.
function resolveKey(key) {
    if (!key) {
        throw new Error('Unsupported key type: ' + key);
    }
    if (key.kty === 'RSA') {
        if (key.e && key.n) {
            return { kty: 'RSA', format: 'jwk', data: { kty: 'RSA', n: key.n, e: key.e, ext: true } };
        }
        if (key.x5c && key.x5c.length) {
            return { kty: 'RSA', format: 'spki', data: spkiFromCertificate(b64ToBytes(key.x5c[0])) };
        }
        throw new Error('RSA key missing key material');
    }
    if (key.kty === 'EC') {
        if (key.crv && key.x && key.y) {
            return { kty: 'EC', crv: key.crv, format: 'jwk', data: { kty: 'EC', crv: key.crv, x: key.x, y: key.y, ext: true } };
        }
        throw new Error('EC key missing key material');
    }
    throw new Error('Unsupported key type: ' + key.kty);
}

// Maps a JWS alg to WebCrypto import/verify parameters
function algParams(alg) {
    const bits = alg.substr(2);
    const hash = { name: 'SHA-' + bits };
    switch (alg.substr(0, 2)) {
        case 'RS':
            return { kty: 'RSA', importAlg: { name: 'RSASSA-PKCS1-v1_5', hash }, verifyAlg: { name: 'RSASSA-PKCS1-v1_5' } };
        case 'PS':
            return { kty: 'RSA', importAlg: { name: 'RSA-PSS', hash }, verifyAlg: { name: 'RSA-PSS', saltLength: parseInt(bits, 10) / 8 } };
        case 'ES': {
            const curve = { '256': 'P-256', '384': 'P-384', '512': 'P-521' }[bits];
            return { kty: 'EC', curve, importAlg: { name: 'ECDSA', namedCurve: curve }, verifyAlg: { name: 'ECDSA', hash } };
        }
    }
    throw new Error('Unsupported alg: ' + alg);
}

export class JoseUtil {

    static parseJwt(jwt) {
        Log.debug("JoseUtil.parseJwt");
        try {
            const parts = jwt.split('.');
            if (parts.length !== 3) {
                throw new Error('Malformed JWT');
            }
            return {
                header: b64uToJson(parts[0]),
                payload: b64uToJson(parts[1])
            };
        } catch (e) {
            Log.error(e);
        }
    }

    static validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive) {
        Log.debug("JoseUtil.validateJwt");

        let resolved;
        try {
            resolved = resolveKey(key);
        } catch (e) {
            Log.error("JoseUtil.validateJwt: " + (e && e.message), key);
            return Promise.reject(e);
        }

        return JoseUtil.validateJwtAttributes(jwt, issuer, audience, clockSkew, now, timeInsensitive).then(payload => {
            return JoseUtil._verifySignature(jwt, resolved).then(valid => {
                if (!valid) {
                    Log.error("JoseUtil._validateJwt: signature validation failed");
                    return Promise.reject(new Error("signature validation failed"));
                }
                return payload;
            }, e => {
                Log.error(e && e.message || e);
                return Promise.reject(new Error("signature validation failed"));
            });
        });
    }

    static _verifySignature(jwt, resolved) {
        try {
            const parts = jwt.split('.');
            const alg = b64uToJson(parts[0]).alg;
            if (AllowedSigningAlgs.indexOf(alg) < 0) {
                throw new Error('alg not allowed: ' + alg);
            }
            const p = algParams(alg);
            if (p.kty !== resolved.kty) {
                throw new Error('Key type ' + resolved.kty + ' does not match alg ' + alg);
            }
            if (p.curve && resolved.crv && p.curve !== resolved.crv) {
                throw new Error('EC key curve ' + resolved.crv + ' does not match alg ' + alg);
            }
            const subtle = getSubtle();
            const data = asciiToBytes(parts[0] + '.' + parts[1]);
            // JWS ECDSA signatures are raw r||s, which is the format WebCrypto expects
            const signature = b64ToBytes(parts[2]);
            return Promise.resolve(subtle.importKey(resolved.format, resolved.data, p.importAlg, false, ['verify']))
                .then(cryptoKey => subtle.verify(p.verifyAlg, cryptoKey, signature, data));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    static validateJwtAttributes(jwt, issuer, audience, clockSkew, now, timeInsensitive) {
        if (!clockSkew) {
            clockSkew = 0;
        }

        if (!now) {
            now = parseInt(Date.now() / 1000);
        }

        const parsed = JoseUtil.parseJwt(jwt);
        if (!parsed) {
            return Promise.reject(new Error("Failed to parse JWT"));
        }
        const payload = parsed.payload;

        if (!payload.iss) {
            Log.error("JoseUtil._validateJwt: issuer was not provided");
            return Promise.reject(new Error("issuer was not provided"));
        }
        if (payload.iss !== issuer) {
            Log.error("JoseUtil._validateJwt: Invalid issuer in token", payload.iss);
            return Promise.reject(new Error("Invalid issuer in token: " + payload.iss));
        }

        if (!payload.aud) {
            Log.error("JoseUtil._validateJwt: aud was not provided");
            return Promise.reject(new Error("aud was not provided"));
        }
        const validAudience = payload.aud === audience || (Array.isArray(payload.aud) && payload.aud.indexOf(audience) >= 0);
        if (!validAudience) {
            Log.error("JoseUtil._validateJwt: Invalid audience in token", payload.aud);
            return Promise.reject(new Error("Invalid audience in token: " + payload.aud));
        }
        if (payload.azp && payload.azp !== audience) {
            Log.error("JoseUtil._validateJwt: Invalid azp in token", payload.azp);
            return Promise.reject(new Error("Invalid azp in token: " + payload.azp));
        }

        if (!timeInsensitive) {
            const lowerNow = now + clockSkew;
            const upperNow = now - clockSkew;

            if (!payload.iat) {
                Log.error("JoseUtil._validateJwt: iat was not provided");
                return Promise.reject(new Error("iat was not provided"));
            }
            if (lowerNow < payload.iat) {
                Log.error("JoseUtil._validateJwt: iat is in the future", payload.iat);
                return Promise.reject(new Error("iat is in the future: " + payload.iat));
            }

            if (payload.nbf && lowerNow < payload.nbf) {
                Log.error("JoseUtil._validateJwt: nbf is in the future", payload.nbf);
                return Promise.reject(new Error("nbf is in the future: " + payload.nbf));
            }

            if (!payload.exp) {
                Log.error("JoseUtil._validateJwt: exp was not provided");
                return Promise.reject(new Error("exp was not provided"));
            }
            if (payload.exp < upperNow) {
                Log.error("JoseUtil._validateJwt: exp is in the past", payload.exp);
                return Promise.reject(new Error("exp is in the past:" + payload.exp));
            }
        }

        return Promise.resolve(payload);
    }

    // Same contract as jsrsasign's crypto.Util.hashString: UTF-8 input, lowercase hex output
    static hashString(value, alg) {
        try {
            const hasher = Hashers[String(alg).toLowerCase().replace(/[^a-z0-9]/g, '')];
            if (!hasher) {
                throw new Error('Unsupported hash alg: ' + alg);
            }
            return hasher(value).toString(Hex);
        } catch (e) {
            Log.error(e);
        }
    }

    static hexToBase64Url(value) {
        try {
            return Base64.stringify(Hex.parse(value))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        } catch (e) {
            Log.error(e);
        }
    }
}
