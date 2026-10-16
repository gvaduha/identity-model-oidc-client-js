/**
 * Generates an RFC4122 version 4 guid (without dashes) from a CSPRNG.
 *
 * state, nonce and the PKCE code_verifier are built from this value, so there is
 * deliberately no Math.random fallback: without crypto.getRandomValues this throws.
 */

function getCrypto() {
    // Resolved on every call so a polyfill loaded after this module is still picked up
    if (typeof window !== 'undefined' && (window.crypto || window.msCrypto)) {
        return window.crypto || window.msCrypto;
    }
    // workers, Node >= 19, React Native with a getRandomValues polyfill
    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
        return globalThis.crypto;
    }
    return null;
}

export function secureUuid(crypto) {
    if (!crypto || typeof crypto.getRandomValues !== 'function') {
        throw new Error("crypto.getRandomValues is not available; secure random generation is required for OIDC");
    }
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    ).replace(/-/g, '');
}

export default function random() {
    return secureUuid(getCrypto());
}
