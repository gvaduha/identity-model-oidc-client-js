import { Log } from './Log.js';

/**
 * Generates RFC4122 version 4 guid ()
 */

function getCrypto() {
    if (typeof window !== 'undefined' && (window.crypto || window.msCrypto)) {
        return window.crypto || window.msCrypto;
    }
    // workers, Node >= 19, React Native with a getRandomValues polyfill
    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
        return globalThis.crypto;
    }
    return null;
}

var crypto = getCrypto();

function _cryptoUuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function _uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ Math.random() * 16 >> c / 4).toString(16)
  )
}

var warned = false;

export default function random() {
  var hasRandomValues = !!crypto && typeof crypto.getRandomValues === 'function';
  if (!hasRandomValues && !warned) {
    warned = true;
    // state, nonce and PKCE code_verifier are built from this value
    Log.warn("random: crypto.getRandomValues is not available; falling back to Math.random, which is not cryptographically secure");
  }
  var uuid = hasRandomValues ? _cryptoUuidv4 : _uuidv4;
  return uuid().replace(/-/g, '');
}
