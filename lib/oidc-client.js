(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Log = __webpack_require__(/*! ./src/Log.js */ "./src/Log.js");

var _OidcClient = __webpack_require__(/*! ./src/OidcClient.js */ "./src/OidcClient.js");

var _OidcClientSettings = __webpack_require__(/*! ./src/OidcClientSettings.js */ "./src/OidcClientSettings.js");

var _WebStorageStateStore = __webpack_require__(/*! ./src/WebStorageStateStore.js */ "./src/WebStorageStateStore.js");

var _InMemoryWebStorage = __webpack_require__(/*! ./src/InMemoryWebStorage.js */ "./src/InMemoryWebStorage.js");

var _UserManager = __webpack_require__(/*! ./src/UserManager.js */ "./src/UserManager.js");

var _AccessTokenEvents = __webpack_require__(/*! ./src/AccessTokenEvents.js */ "./src/AccessTokenEvents.js");

var _MetadataService = __webpack_require__(/*! ./src/MetadataService.js */ "./src/MetadataService.js");

var _CordovaPopupNavigator = __webpack_require__(/*! ./src/CordovaPopupNavigator.js */ "./src/CordovaPopupNavigator.js");

var _CordovaIFrameNavigator = __webpack_require__(/*! ./src/CordovaIFrameNavigator.js */ "./src/CordovaIFrameNavigator.js");

var _CheckSessionIFrame = __webpack_require__(/*! ./src/CheckSessionIFrame.js */ "./src/CheckSessionIFrame.js");

var _TokenRevocationClient = __webpack_require__(/*! ./src/TokenRevocationClient.js */ "./src/TokenRevocationClient.js");

var _SessionMonitor = __webpack_require__(/*! ./src/SessionMonitor.js */ "./src/SessionMonitor.js");

var _Global = __webpack_require__(/*! ./src/Global.js */ "./src/Global.js");

var _User = __webpack_require__(/*! ./src/User.js */ "./src/User.js");

var _version = __webpack_require__(/*! ./version.js */ "./version.js");

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

exports.default = {
    Version: _version.Version,
    Log: _Log.Log,
    OidcClient: _OidcClient.OidcClient,
    OidcClientSettings: _OidcClientSettings.OidcClientSettings,
    WebStorageStateStore: _WebStorageStateStore.WebStorageStateStore,
    InMemoryWebStorage: _InMemoryWebStorage.InMemoryWebStorage,
    UserManager: _UserManager.UserManager,
    AccessTokenEvents: _AccessTokenEvents.AccessTokenEvents,
    MetadataService: _MetadataService.MetadataService,
    CordovaPopupNavigator: _CordovaPopupNavigator.CordovaPopupNavigator,
    CordovaIFrameNavigator: _CordovaIFrameNavigator.CordovaIFrameNavigator,
    CheckSessionIFrame: _CheckSessionIFrame.CheckSessionIFrame,
    TokenRevocationClient: _TokenRevocationClient.TokenRevocationClient,
    SessionMonitor: _SessionMonitor.SessionMonitor,
    Global: _Global.Global,
    User: _User.User
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/crypto-js/core.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/core.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/*globals window, global, require*/

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {

	    var crypto;

	    // Native crypto from window (Browser)
	    if (typeof window !== 'undefined' && window.crypto) {
	        crypto = window.crypto;
	    }

	    // Native crypto in web worker (Browser)
	    if (typeof self !== 'undefined' && self.crypto) {
	        crypto = self.crypto;
	    }

	    // Native crypto from worker
	    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
	        crypto = globalThis.crypto;
	    }

	    // Native (experimental IE 11) crypto from window (Browser)
	    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
	        crypto = window.msCrypto;
	    }

	    // Native crypto from global (NodeJS)
	    if (!crypto && typeof global !== 'undefined' && global.crypto) {
	        crypto = global.crypto;
	    }

	    // Native crypto import via require (NodeJS)
	    if (!crypto && "function" === 'function') {
	        try {
	            crypto = __webpack_require__(/*! crypto */ 0);
	        } catch (err) {}
	    }

	    /*
	     * Cryptographically secure pseudorandom number generator
	     *
	     * As Math.random() is cryptographically not safe to use
	     */
	    var cryptoSecureRandomInt = function () {
	        if (crypto) {
	            // Use getRandomValues method (Browser)
	            if (typeof crypto.getRandomValues === 'function') {
	                try {
	                    return crypto.getRandomValues(new Uint32Array(1))[0];
	                } catch (err) {}
	            }

	            // Use randomBytes method (NodeJS)
	            if (typeof crypto.randomBytes === 'function') {
	                try {
	                    return crypto.randomBytes(4).readInt32LE();
	                } catch (err) {}
	            }
	        }

	        throw new Error('Native crypto module could not be used to get secure random number.');
	    };

	    /*
	     * Local polyfill of Object.create

	     */
	    var create = Object.create || (function () {
	        function F() {}

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }());

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var j = 0; j < thatSigBytes; j += 4) {
	                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            for (var i = 0; i < nBytes; i += 4) {
	                words.push(cryptoSecureRandomInt());
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            var processedWords;

	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/crypto-js/enc-base64.js":
/*!**********************************************!*\
  !*** ./node_modules/crypto-js/enc-base64.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              var bitsCombined = bits1 | bits2;
	              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),

/***/ "./node_modules/crypto-js/enc-hex.js":
/*!*******************************************!*\
  !*** ./node_modules/crypto-js/enc-hex.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha256.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha256.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha384.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha384.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "./node_modules/crypto-js/x64-core.js"), __webpack_require__(/*! ./sha512 */ "./node_modules/crypto-js/sha512.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;
	    var SHA512 = C_algo.SHA512;

	    /**
	     * SHA-384 hash algorithm.
	     */
	    var SHA384 = C_algo.SHA384 = SHA512.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
	                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
	                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
	                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA512._doFinalize.call(this);

	            hash.sigBytes -= 16;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA384('message');
	     *     var hash = CryptoJS.SHA384(wordArray);
	     */
	    C.SHA384 = SHA512._createHelper(SHA384);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA384(message, key);
	     */
	    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	}());


	return CryptoJS.SHA384;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha512.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha512.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "./node_modules/crypto-js/x64-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;

	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }

	    // Constants
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];

	    // Reusable objects
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());

	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var H = this._hash.words;

	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];

	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;

	            // Working variables
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;

	            // Rounds
	            for (var i = 0; i < 80; i++) {
	                var Wil;
	                var Wih;

	                // Shortcut
	                var Wi = W[i];

	                // Extend message
	                if (i < 16) {
	                    Wih = Wi.high = M[offset + i * 2]     | 0;
	                    Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    // Gamma0
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	                    // Gamma1
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;

	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;

	                    Wil = gamma0l + Wi7l;
	                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    Wil = Wil + gamma1l;
	                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    Wil = Wil + Wi16l;
	                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }

	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	                // t1 = h + sigma1 + ch + K[i] + W[i]
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;

	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	                // t2 = sigma0 + maj
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	                // Update working variables
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }

	            // Intermediate hash value
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Convert hash to 32-bit word array before returning
	            var hash = this._hash.toX32();

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        },

	        blockSize: 1024/32
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());


	return CryptoJS.SHA512;

}));

/***/ }),

/***/ "./node_modules/crypto-js/x64-core.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/x64-core.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());


	return CryptoJS;

}));

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/AccessTokenEvents.js":
/*!**********************************!*\
  !*** ./src/AccessTokenEvents.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AccessTokenEvents = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _Timer = __webpack_require__(/*! ./Timer.js */ "./src/Timer.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var DefaultAccessTokenExpiringNotificationTime = 60; // seconds

var AccessTokenEvents = exports.AccessTokenEvents = function () {
    function AccessTokenEvents() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$accessTokenExpir = _ref.accessTokenExpiringNotificationTime,
            accessTokenExpiringNotificationTime = _ref$accessTokenExpir === undefined ? DefaultAccessTokenExpiringNotificationTime : _ref$accessTokenExpir,
            _ref$accessTokenExpir2 = _ref.accessTokenExpiringTimer,
            accessTokenExpiringTimer = _ref$accessTokenExpir2 === undefined ? new _Timer.Timer("Access token expiring") : _ref$accessTokenExpir2,
            _ref$accessTokenExpir3 = _ref.accessTokenExpiredTimer,
            accessTokenExpiredTimer = _ref$accessTokenExpir3 === undefined ? new _Timer.Timer("Access token expired") : _ref$accessTokenExpir3;

        _classCallCheck(this, AccessTokenEvents);

        this._accessTokenExpiringNotificationTime = accessTokenExpiringNotificationTime;

        this._accessTokenExpiring = accessTokenExpiringTimer;
        this._accessTokenExpired = accessTokenExpiredTimer;
    }

    AccessTokenEvents.prototype.load = function load(container) {
        // only register events if there's an access token and it has an expiration
        if (container.access_token && container.expires_in !== undefined) {
            var duration = container.expires_in;
            _Log.Log.debug("AccessTokenEvents.load: access token present, remaining duration:", duration);

            if (duration > 0) {
                // only register expiring if we still have time
                var expiring = duration - this._accessTokenExpiringNotificationTime;
                if (expiring <= 0) {
                    expiring = 1;
                }

                _Log.Log.debug("AccessTokenEvents.load: registering expiring timer in:", expiring);
                this._accessTokenExpiring.init(expiring);
            } else {
                _Log.Log.debug("AccessTokenEvents.load: canceling existing expiring timer becase we're past expiration.");
                this._accessTokenExpiring.cancel();
            }

            // if it's negative, it will still fire
            var expired = duration + 1;
            _Log.Log.debug("AccessTokenEvents.load: registering expired timer in:", expired);
            this._accessTokenExpired.init(expired);
        } else {
            this._accessTokenExpiring.cancel();
            this._accessTokenExpired.cancel();
        }
    };

    AccessTokenEvents.prototype.unload = function unload() {
        _Log.Log.debug("AccessTokenEvents.unload: canceling existing access token timers");
        this._accessTokenExpiring.cancel();
        this._accessTokenExpired.cancel();
    };

    AccessTokenEvents.prototype.addAccessTokenExpiring = function addAccessTokenExpiring(cb) {
        this._accessTokenExpiring.addHandler(cb);
    };

    AccessTokenEvents.prototype.removeAccessTokenExpiring = function removeAccessTokenExpiring(cb) {
        this._accessTokenExpiring.removeHandler(cb);
    };

    AccessTokenEvents.prototype.addAccessTokenExpired = function addAccessTokenExpired(cb) {
        this._accessTokenExpired.addHandler(cb);
    };

    AccessTokenEvents.prototype.removeAccessTokenExpired = function removeAccessTokenExpired(cb) {
        this._accessTokenExpired.removeHandler(cb);
    };

    return AccessTokenEvents;
}();

/***/ }),

/***/ "./src/CheckSessionIFrame.js":
/*!***********************************!*\
  !*** ./src/CheckSessionIFrame.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckSessionIFrame = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var DefaultInterval = 2000;

var CheckSessionIFrame = exports.CheckSessionIFrame = function () {
    function CheckSessionIFrame(callback, client_id, url, interval) {
        var stopOnError = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        _classCallCheck(this, CheckSessionIFrame);

        this._callback = callback;
        this._client_id = client_id;
        this._url = url;
        this._interval = interval || DefaultInterval;
        this._stopOnError = stopOnError;

        var idx = url.indexOf("/", url.indexOf("//") + 2);
        this._frame_origin = url.substr(0, idx);

        this._frame = window.document.createElement("iframe");

        // shotgun approach
        this._frame.style.visibility = "hidden";
        this._frame.style.position = "absolute";
        this._frame.style.display = "none";
        this._frame.width = 0;
        this._frame.height = 0;

        this._frame.src = url;
    }

    CheckSessionIFrame.prototype.load = function load() {
        var _this = this;

        return new Promise(function (resolve) {
            _this._frame.onload = function () {
                resolve();
            };

            window.document.body.appendChild(_this._frame);
            _this._boundMessageEvent = _this._message.bind(_this);
            window.addEventListener("message", _this._boundMessageEvent, false);
        });
    };

    CheckSessionIFrame.prototype._message = function _message(e) {
        if (e.origin === this._frame_origin && e.source === this._frame.contentWindow) {
            if (e.data === "error") {
                _Log.Log.error("CheckSessionIFrame: error message from check session op iframe");
                if (this._stopOnError) {
                    this.stop();
                }
            } else if (e.data === "changed") {
                _Log.Log.debug("CheckSessionIFrame: changed message from check session op iframe");
                this.stop();
                this._callback();
            } else {
                _Log.Log.debug("CheckSessionIFrame: " + e.data + " message from check session op iframe");
            }
        }
    };

    CheckSessionIFrame.prototype.start = function start(session_state) {
        var _this2 = this;

        if (this._session_state !== session_state) {
            _Log.Log.debug("CheckSessionIFrame.start");

            this.stop();

            this._session_state = session_state;

            var send = function send() {
                _this2._frame.contentWindow.postMessage(_this2._client_id + " " + _this2._session_state, _this2._frame_origin);
            };

            // trigger now
            send();

            // and setup timer
            this._timer = window.setInterval(send, this._interval);
        }
    };

    CheckSessionIFrame.prototype.stop = function stop() {
        this._session_state = null;

        if (this._timer) {
            _Log.Log.debug("CheckSessionIFrame.stop");

            window.clearInterval(this._timer);
            this._timer = null;
        }
    };

    return CheckSessionIFrame;
}();

/***/ }),

/***/ "./src/ClockService.js":
/*!*****************************!*\
  !*** ./src/ClockService.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClockService = exports.ClockService = function () {
    function ClockService() {
        _classCallCheck(this, ClockService);
    }

    ClockService.prototype.getEpochTime = function getEpochTime() {
        return Promise.resolve(Date.now() / 1000 | 0);
    };

    return ClockService;
}();

/***/ }),

/***/ "./src/CordovaIFrameNavigator.js":
/*!***************************************!*\
  !*** ./src/CordovaIFrameNavigator.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CordovaIFrameNavigator = undefined;

var _CordovaPopupWindow = __webpack_require__(/*! ./CordovaPopupWindow.js */ "./src/CordovaPopupWindow.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var CordovaIFrameNavigator = exports.CordovaIFrameNavigator = function () {
    function CordovaIFrameNavigator() {
        _classCallCheck(this, CordovaIFrameNavigator);
    }

    CordovaIFrameNavigator.prototype.prepare = function prepare(params) {
        params.popupWindowFeatures = 'hidden=yes';
        var popup = new _CordovaPopupWindow.CordovaPopupWindow(params);
        return Promise.resolve(popup);
    };

    return CordovaIFrameNavigator;
}();

/***/ }),

/***/ "./src/CordovaPopupNavigator.js":
/*!**************************************!*\
  !*** ./src/CordovaPopupNavigator.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CordovaPopupNavigator = undefined;

var _CordovaPopupWindow = __webpack_require__(/*! ./CordovaPopupWindow.js */ "./src/CordovaPopupWindow.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var CordovaPopupNavigator = exports.CordovaPopupNavigator = function () {
    function CordovaPopupNavigator() {
        _classCallCheck(this, CordovaPopupNavigator);
    }

    CordovaPopupNavigator.prototype.prepare = function prepare(params) {
        var popup = new _CordovaPopupWindow.CordovaPopupWindow(params);
        return Promise.resolve(popup);
    };

    return CordovaPopupNavigator;
}();

/***/ }),

/***/ "./src/CordovaPopupWindow.js":
/*!***********************************!*\
  !*** ./src/CordovaPopupWindow.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CordovaPopupWindow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultPopupFeatures = 'location=no,toolbar=no,zoom=no';
var DefaultPopupTarget = "_blank";

var CordovaPopupWindow = exports.CordovaPopupWindow = function () {
    function CordovaPopupWindow(params) {
        var _this = this;

        _classCallCheck(this, CordovaPopupWindow);

        this._promise = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });

        this.features = params.popupWindowFeatures || DefaultPopupFeatures;
        this.target = params.popupWindowTarget || DefaultPopupTarget;

        this.redirect_uri = params.startUrl;
        _Log.Log.debug("CordovaPopupWindow.ctor: redirect_uri: " + this.redirect_uri);
    }

    CordovaPopupWindow.prototype._isInAppBrowserInstalled = function _isInAppBrowserInstalled(cordovaMetadata) {
        return ["cordova-plugin-inappbrowser", "cordova-plugin-inappbrowser.inappbrowser", "org.apache.cordova.inappbrowser"].some(function (name) {
            return cordovaMetadata.hasOwnProperty(name);
        });
    };

    CordovaPopupWindow.prototype.navigate = function navigate(params) {
        if (!params || !params.url) {
            this._error("No url provided");
        } else {
            if (!window.cordova) {
                return this._error("cordova is undefined");
            }

            var cordovaMetadata = window.cordova.require("cordova/plugin_list").metadata;
            if (this._isInAppBrowserInstalled(cordovaMetadata) === false) {
                return this._error("InAppBrowser plugin not found");
            }
            this._popup = cordova.InAppBrowser.open(params.url, this.target, this.features);
            if (this._popup) {
                _Log.Log.debug("CordovaPopupWindow.navigate: popup successfully created");

                this._exitCallbackEvent = this._exitCallback.bind(this);
                this._loadStartCallbackEvent = this._loadStartCallback.bind(this);

                this._popup.addEventListener("exit", this._exitCallbackEvent, false);
                this._popup.addEventListener("loadstart", this._loadStartCallbackEvent, false);
            } else {
                this._error("Error opening popup window");
            }
        }
        return this.promise;
    };

    CordovaPopupWindow.prototype._loadStartCallback = function _loadStartCallback(event) {
        if (event.url.indexOf(this.redirect_uri) === 0) {
            this._success({ url: event.url });
        }
    };

    CordovaPopupWindow.prototype._exitCallback = function _exitCallback(message) {
        this._error(message);
    };

    CordovaPopupWindow.prototype._success = function _success(data) {
        this._cleanup();

        _Log.Log.debug("CordovaPopupWindow: Successful response from cordova popup window");
        this._resolve(data);
    };

    CordovaPopupWindow.prototype._error = function _error(message) {
        this._cleanup();

        _Log.Log.error(message);
        this._reject(new Error(message));
    };

    CordovaPopupWindow.prototype.close = function close() {
        this._cleanup();
    };

    CordovaPopupWindow.prototype._cleanup = function _cleanup() {
        if (this._popup) {
            _Log.Log.debug("CordovaPopupWindow: cleaning up popup");
            this._popup.removeEventListener("exit", this._exitCallbackEvent, false);
            this._popup.removeEventListener("loadstart", this._loadStartCallbackEvent, false);
            this._popup.close();
        }
        this._popup = null;
    };

    _createClass(CordovaPopupWindow, [{
        key: 'promise',
        get: function get() {
            return this._promise;
        }
    }]);

    return CordovaPopupWindow;
}();

/***/ }),

/***/ "./src/ErrorResponse.js":
/*!******************************!*\
  !*** ./src/ErrorResponse.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorResponse = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var ErrorResponse = exports.ErrorResponse = function (_Error) {
    _inherits(ErrorResponse, _Error);

    function ErrorResponse() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            error = _ref.error,
            error_description = _ref.error_description,
            error_uri = _ref.error_uri,
            state = _ref.state,
            session_state = _ref.session_state;

        _classCallCheck(this, ErrorResponse);

        if (!error) {
            _Log.Log.error("No error passed to ErrorResponse");
            throw new Error("error");
        }

        var _this = _possibleConstructorReturn(this, _Error.call(this, error_description || error));

        _this.name = "ErrorResponse";

        _this.error = error;
        _this.error_description = error_description;
        _this.error_uri = error_uri;

        _this.state = state;
        _this.session_state = session_state;
        return _this;
    }

    return ErrorResponse;
}(Error);

/***/ }),

/***/ "./src/Event.js":
/*!**********************!*\
  !*** ./src/Event.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Event = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var Event = exports.Event = function () {
    function Event(name) {
        _classCallCheck(this, Event);

        this._name = name;
        this._callbacks = [];
    }

    Event.prototype.addHandler = function addHandler(cb) {
        this._callbacks.push(cb);
    };

    Event.prototype.removeHandler = function removeHandler(cb) {
        var idx = this._callbacks.findIndex(function (item) {
            return item === cb;
        });
        if (idx >= 0) {
            this._callbacks.splice(idx, 1);
        }
    };

    Event.prototype.raise = function raise() {
        _Log.Log.debug("Event: Raising event: " + this._name);
        for (var i = 0; i < this._callbacks.length; i++) {
            var _callbacks;

            (_callbacks = this._callbacks)[i].apply(_callbacks, arguments);
        }
    };

    return Event;
}();

/***/ }),

/***/ "./src/Global.js":
/*!***********************!*\
  !*** ./src/Global.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var timer = {
    setInterval: function (_setInterval) {
        function setInterval(_x, _x2) {
            return _setInterval.apply(this, arguments);
        }

        setInterval.toString = function () {
            return _setInterval.toString();
        };

        return setInterval;
    }(function (cb, duration) {
        return setInterval(cb, duration);
    }),
    clearInterval: function (_clearInterval) {
        function clearInterval(_x3) {
            return _clearInterval.apply(this, arguments);
        }

        clearInterval.toString = function () {
            return _clearInterval.toString();
        };

        return clearInterval;
    }(function (handle) {
        return clearInterval(handle);
    })
};

var testing = false;
var request = null;

var Global = exports.Global = function () {
    function Global() {
        _classCallCheck(this, Global);
    }

    Global._testing = function _testing() {
        testing = true;
    };

    Global.setXMLHttpRequest = function setXMLHttpRequest(newRequest) {
        request = newRequest;
    };

    _createClass(Global, null, [{
        key: 'location',
        get: function get() {
            if (!testing) {
                return location;
            }
        }
    }, {
        key: 'localStorage',
        get: function get() {
            if (!testing && typeof window !== 'undefined') {
                return localStorage;
            }
        }
    }, {
        key: 'sessionStorage',
        get: function get() {
            if (!testing && typeof window !== 'undefined') {
                return sessionStorage;
            }
        }
    }, {
        key: 'XMLHttpRequest',
        get: function get() {
            if (!testing && typeof window !== 'undefined') {
                return request || XMLHttpRequest;
            }
        }
    }, {
        key: 'timer',
        get: function get() {
            if (!testing) {
                return timer;
            }
        }
    }]);

    return Global;
}();

/***/ }),

/***/ "./src/IFrameNavigator.js":
/*!********************************!*\
  !*** ./src/IFrameNavigator.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IFrameNavigator = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _IFrameWindow = __webpack_require__(/*! ./IFrameWindow.js */ "./src/IFrameWindow.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var IFrameNavigator = exports.IFrameNavigator = function () {
    function IFrameNavigator() {
        _classCallCheck(this, IFrameNavigator);
    }

    IFrameNavigator.prototype.prepare = function prepare(params) {
        var frame = new _IFrameWindow.IFrameWindow(params);
        return Promise.resolve(frame);
    };

    IFrameNavigator.prototype.callback = function callback(url) {
        _Log.Log.debug("IFrameNavigator.callback");

        try {
            _IFrameWindow.IFrameWindow.notifyParent(url);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    return IFrameNavigator;
}();

/***/ }),

/***/ "./src/IFrameWindow.js":
/*!*****************************!*\
  !*** ./src/IFrameWindow.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IFrameWindow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultTimeout = 10000;

var IFrameWindow = exports.IFrameWindow = function () {
    function IFrameWindow(params) {
        var _this = this;

        _classCallCheck(this, IFrameWindow);

        this._promise = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });

        this._boundMessageEvent = this._message.bind(this);
        window.addEventListener("message", this._boundMessageEvent, false);

        this._frame = window.document.createElement("iframe");

        // shotgun approach
        this._frame.style.visibility = "hidden";
        this._frame.style.position = "absolute";
        this._frame.width = 0;
        this._frame.height = 0;

        window.document.body.appendChild(this._frame);
    }

    IFrameWindow.prototype.navigate = function navigate(params) {
        if (!params || !params.url) {
            this._error("No url provided");
        } else {
            var timeout = params.silentRequestTimeout || DefaultTimeout;
            _Log.Log.debug("IFrameWindow.navigate: Using timeout of:", timeout);
            this._timer = window.setTimeout(this._timeout.bind(this), timeout);
            this._frame.src = params.url;
        }

        return this.promise;
    };

    IFrameWindow.prototype._success = function _success(data) {
        this._cleanup();

        _Log.Log.debug("IFrameWindow: Successful response from frame window");
        this._resolve(data);
    };

    IFrameWindow.prototype._error = function _error(message) {
        this._cleanup();

        _Log.Log.error(message);
        this._reject(new Error(message));
    };

    IFrameWindow.prototype.close = function close() {
        this._cleanup();
    };

    IFrameWindow.prototype._cleanup = function _cleanup() {
        if (this._frame) {
            _Log.Log.debug("IFrameWindow: cleanup");

            window.removeEventListener("message", this._boundMessageEvent, false);
            window.clearTimeout(this._timer);
            window.document.body.removeChild(this._frame);

            this._timer = null;
            this._frame = null;
            this._boundMessageEvent = null;
        }
    };

    IFrameWindow.prototype._timeout = function _timeout() {
        _Log.Log.debug("IFrameWindow.timeout");
        this._error("Frame window timed out");
    };

    IFrameWindow.prototype._message = function _message(e) {
        _Log.Log.debug("IFrameWindow.message");

        if (this._timer && e.origin === this._origin && e.source === this._frame.contentWindow && typeof e.data === 'string' && (e.data.startsWith('http://') || e.data.startsWith('https://'))) {
            var url = e.data;
            if (url) {
                this._success({ url: url });
            } else {
                this._error("Invalid response from frame");
            }
        }
    };

    IFrameWindow.notifyParent = function notifyParent(url) {
        _Log.Log.debug("IFrameWindow.notifyParent");
        url = url || window.location.href;
        if (url) {
            _Log.Log.debug("IFrameWindow.notifyParent: posting url message to parent");
            window.parent.postMessage(url, location.protocol + "//" + location.host);
        }
    };

    _createClass(IFrameWindow, [{
        key: "promise",
        get: function get() {
            return this._promise;
        }
    }, {
        key: "_origin",
        get: function get() {
            return location.protocol + "//" + location.host;
        }
    }]);

    return IFrameWindow;
}();

/***/ }),

/***/ "./src/InMemoryWebStorage.js":
/*!***********************************!*\
  !*** ./src/InMemoryWebStorage.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InMemoryWebStorage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InMemoryWebStorage = exports.InMemoryWebStorage = function () {
    function InMemoryWebStorage() {
        _classCallCheck(this, InMemoryWebStorage);

        this._data = {};
    }

    InMemoryWebStorage.prototype.getItem = function getItem(key) {
        _Log.Log.debug("InMemoryWebStorage.getItem", key);
        return this._data[key];
    };

    InMemoryWebStorage.prototype.setItem = function setItem(key, value) {
        _Log.Log.debug("InMemoryWebStorage.setItem", key);
        this._data[key] = value;
    };

    InMemoryWebStorage.prototype.removeItem = function removeItem(key) {
        _Log.Log.debug("InMemoryWebStorage.removeItem", key);
        delete this._data[key];
    };

    InMemoryWebStorage.prototype.key = function key(index) {
        return Object.getOwnPropertyNames(this._data)[index];
    };

    _createClass(InMemoryWebStorage, [{
        key: "length",
        get: function get() {
            return Object.getOwnPropertyNames(this._data).length;
        }
    }]);

    return InMemoryWebStorage;
}();

/***/ }),

/***/ "./src/JoseUtil.js":
/*!*************************!*\
  !*** ./src/JoseUtil.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JoseUtil = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _sha = __webpack_require__(/*! crypto-js/sha256.js */ "./node_modules/crypto-js/sha256.js");

var _sha2 = _interopRequireDefault(_sha);

var _sha3 = __webpack_require__(/*! crypto-js/sha384.js */ "./node_modules/crypto-js/sha384.js");

var _sha4 = _interopRequireDefault(_sha3);

var _sha5 = __webpack_require__(/*! crypto-js/sha512.js */ "./node_modules/crypto-js/sha512.js");

var _sha6 = _interopRequireDefault(_sha5);

var _encHex = __webpack_require__(/*! crypto-js/enc-hex.js */ "./node_modules/crypto-js/enc-hex.js");

var _encHex2 = _interopRequireDefault(_encHex);

var _encBase = __webpack_require__(/*! crypto-js/enc-base64.js */ "./node_modules/crypto-js/enc-base64.js");

var _encBase2 = _interopRequireDefault(_encBase);

var _base64Js = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

// JWT parsing and validation.
// - Signatures are verified with WebCrypto (crypto.subtle): RS/PS/ES 256/384/512.
// - Hashing (at_hash / c_hash / PKCE) uses crypto-js.
// - Base64 decoding uses base64-js.

var AllowedSigningAlgs = ['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512', 'ES256', 'ES384', 'ES512'];

var Hashers = { sha256: _sha2.default, sha384: _sha4.default, sha512: _sha6.default };

function b64ToBytes(s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    while (s.length % 4) {
        s += '=';
    }
    return (0, _base64Js.toByteArray)(s);
}

function utf8Decode(bytes) {
    var escaped = '';
    for (var i = 0; i < bytes.length; i++) {
        escaped += '%' + ('0' + bytes[i].toString(16)).slice(-2);
    }
    return decodeURIComponent(escaped);
}

function b64uToJson(s) {
    return JSON.parse(utf8Decode(b64ToBytes(s)));
}

// The JWS signing input is base64url text, i.e. pure ASCII
function asciiToBytes(s) {
    var out = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        out[i] = s.charCodeAt(i);
    }
    return out;
}

function getSubtle() {
    var c = typeof window !== 'undefined' && window.crypto || typeof globalThis !== 'undefined' && globalThis.crypto || typeof global !== 'undefined' && global.crypto;
    if (!c || !c.subtle) {
        throw new Error('WebCrypto (crypto.subtle) is not available; a secure context (https) is required');
    }
    return c.subtle;
}

// Minimal DER reader: returns tag, content start/end and the full element end
function readTlv(bytes, offset) {
    var tag = bytes[offset];
    var len = bytes[offset + 1];
    var start = offset + 2;
    if (len & 0x80) {
        var n = len & 0x7f;
        if (n < 1 || n > 4) {
            throw new Error('Unsupported DER length');
        }
        len = 0;
        for (var i = 0; i < n; i++) {
            len = len * 256 + bytes[start + i];
        }
        start += n;
    }
    var end = start + len;
    if (end > bytes.length) {
        throw new Error('Truncated DER element');
    }
    return { tag: tag, start: start, end: end };
}

// Extracts the DER SubjectPublicKeyInfo from a DER X.509 certificate
function spkiFromCertificate(der) {
    var cert = readTlv(der, 0);
    if (cert.tag !== 0x30) {
        throw new Error('Invalid certificate');
    }
    var tbs = readTlv(der, cert.start);
    if (tbs.tag !== 0x30) {
        throw new Error('Invalid certificate');
    }
    var pos = tbs.start;
    var el = readTlv(der, pos);
    if (el.tag === 0xa0) {
        // [0] version
        pos = el.end;
        el = readTlv(der, pos);
    }
    // serialNumber, signature, issuer, validity, subject
    for (var i = 0; i < 5; i++) {
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
    var bits = alg.substr(2);
    var hash = { name: 'SHA-' + bits };
    switch (alg.substr(0, 2)) {
        case 'RS':
            return { kty: 'RSA', importAlg: { name: 'RSASSA-PKCS1-v1_5', hash: hash }, verifyAlg: { name: 'RSASSA-PKCS1-v1_5' } };
        case 'PS':
            return { kty: 'RSA', importAlg: { name: 'RSA-PSS', hash: hash }, verifyAlg: { name: 'RSA-PSS', saltLength: parseInt(bits, 10) / 8 } };
        case 'ES':
            {
                var curve = { '256': 'P-256', '384': 'P-384', '512': 'P-521' }[bits];
                return { kty: 'EC', curve: curve, importAlg: { name: 'ECDSA', namedCurve: curve }, verifyAlg: { name: 'ECDSA', hash: hash } };
            }
    }
    throw new Error('Unsupported alg: ' + alg);
}

var JoseUtil = exports.JoseUtil = function () {
    function JoseUtil() {
        _classCallCheck(this, JoseUtil);
    }

    JoseUtil.parseJwt = function parseJwt(jwt) {
        _Log.Log.debug("JoseUtil.parseJwt");
        try {
            var parts = jwt.split('.');
            if (parts.length !== 3) {
                throw new Error('Malformed JWT');
            }
            return {
                header: b64uToJson(parts[0]),
                payload: b64uToJson(parts[1])
            };
        } catch (e) {
            _Log.Log.error(e);
        }
    };

    JoseUtil.validateJwt = function validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive) {
        _Log.Log.debug("JoseUtil.validateJwt");

        var resolved = void 0;
        try {
            resolved = resolveKey(key);
        } catch (e) {
            _Log.Log.error("JoseUtil.validateJwt: " + (e && e.message), key);
            return Promise.reject(e);
        }

        return JoseUtil.validateJwtAttributes(jwt, issuer, audience, clockSkew, now, timeInsensitive).then(function (payload) {
            return JoseUtil._verifySignature(jwt, resolved).then(function (valid) {
                if (!valid) {
                    _Log.Log.error("JoseUtil._validateJwt: signature validation failed");
                    return Promise.reject(new Error("signature validation failed"));
                }
                return payload;
            }, function (e) {
                _Log.Log.error(e && e.message || e);
                return Promise.reject(new Error("signature validation failed"));
            });
        });
    };

    JoseUtil._verifySignature = function _verifySignature(jwt, resolved) {
        try {
            var parts = jwt.split('.');
            var alg = b64uToJson(parts[0]).alg;
            if (AllowedSigningAlgs.indexOf(alg) < 0) {
                throw new Error('alg not allowed: ' + alg);
            }
            var p = algParams(alg);
            if (p.kty !== resolved.kty) {
                throw new Error('Key type ' + resolved.kty + ' does not match alg ' + alg);
            }
            if (p.curve && resolved.crv && p.curve !== resolved.crv) {
                throw new Error('EC key curve ' + resolved.crv + ' does not match alg ' + alg);
            }
            var subtle = getSubtle();
            var data = asciiToBytes(parts[0] + '.' + parts[1]);
            // JWS ECDSA signatures are raw r||s, which is the format WebCrypto expects
            var signature = b64ToBytes(parts[2]);
            return Promise.resolve(subtle.importKey(resolved.format, resolved.data, p.importAlg, false, ['verify'])).then(function (cryptoKey) {
                return subtle.verify(p.verifyAlg, cryptoKey, signature, data);
            });
        } catch (e) {
            return Promise.reject(e);
        }
    };

    JoseUtil.validateJwtAttributes = function validateJwtAttributes(jwt, issuer, audience, clockSkew, now, timeInsensitive) {
        if (!clockSkew) {
            clockSkew = 0;
        }

        if (!now) {
            now = parseInt(Date.now() / 1000);
        }

        var parsed = JoseUtil.parseJwt(jwt);
        if (!parsed) {
            return Promise.reject(new Error("Failed to parse JWT"));
        }
        var payload = parsed.payload;

        if (!payload.iss) {
            _Log.Log.error("JoseUtil._validateJwt: issuer was not provided");
            return Promise.reject(new Error("issuer was not provided"));
        }
        if (payload.iss !== issuer) {
            _Log.Log.error("JoseUtil._validateJwt: Invalid issuer in token", payload.iss);
            return Promise.reject(new Error("Invalid issuer in token: " + payload.iss));
        }

        if (!payload.aud) {
            _Log.Log.error("JoseUtil._validateJwt: aud was not provided");
            return Promise.reject(new Error("aud was not provided"));
        }
        var validAudience = payload.aud === audience || Array.isArray(payload.aud) && payload.aud.indexOf(audience) >= 0;
        if (!validAudience) {
            _Log.Log.error("JoseUtil._validateJwt: Invalid audience in token", payload.aud);
            return Promise.reject(new Error("Invalid audience in token: " + payload.aud));
        }
        if (payload.azp && payload.azp !== audience) {
            _Log.Log.error("JoseUtil._validateJwt: Invalid azp in token", payload.azp);
            return Promise.reject(new Error("Invalid azp in token: " + payload.azp));
        }

        if (!timeInsensitive) {
            var lowerNow = now + clockSkew;
            var upperNow = now - clockSkew;

            if (!payload.iat) {
                _Log.Log.error("JoseUtil._validateJwt: iat was not provided");
                return Promise.reject(new Error("iat was not provided"));
            }
            if (lowerNow < payload.iat) {
                _Log.Log.error("JoseUtil._validateJwt: iat is in the future", payload.iat);
                return Promise.reject(new Error("iat is in the future: " + payload.iat));
            }

            if (payload.nbf && lowerNow < payload.nbf) {
                _Log.Log.error("JoseUtil._validateJwt: nbf is in the future", payload.nbf);
                return Promise.reject(new Error("nbf is in the future: " + payload.nbf));
            }

            if (!payload.exp) {
                _Log.Log.error("JoseUtil._validateJwt: exp was not provided");
                return Promise.reject(new Error("exp was not provided"));
            }
            if (payload.exp < upperNow) {
                _Log.Log.error("JoseUtil._validateJwt: exp is in the past", payload.exp);
                return Promise.reject(new Error("exp is in the past:" + payload.exp));
            }
        }

        return Promise.resolve(payload);
    };

    // UTF-8 input, lowercase hex output


    JoseUtil.hashString = function hashString(value, alg) {
        try {
            var hasher = Hashers[String(alg).toLowerCase().replace(/[^a-z0-9]/g, '')];
            if (!hasher) {
                throw new Error('Unsupported hash alg: ' + alg);
            }
            return hasher(value).toString(_encHex2.default);
        } catch (e) {
            _Log.Log.error(e);
        }
    };

    JoseUtil.hexToBase64Url = function hexToBase64Url(value) {
        try {
            return _encBase2.default.stringify(_encHex2.default.parse(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        } catch (e) {
            _Log.Log.error(e);
        }
    };

    return JoseUtil;
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/JsonService.js":
/*!****************************!*\
  !*** ./src/JsonService.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JsonService = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _Global = __webpack_require__(/*! ./Global.js */ "./src/Global.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var JsonService = exports.JsonService = function () {
    function JsonService() {
        var additionalContentTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var XMLHttpRequestCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Global.Global.XMLHttpRequest;
        var jwtHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, JsonService);

        if (additionalContentTypes && Array.isArray(additionalContentTypes)) {
            this._contentTypes = additionalContentTypes.slice();
        } else {
            this._contentTypes = [];
        }
        this._contentTypes.push('application/json');
        if (jwtHandler) {
            this._contentTypes.push('application/jwt');
        }

        this._XMLHttpRequest = XMLHttpRequestCtor;
        this._jwtHandler = jwtHandler;
    }

    JsonService.prototype.getJson = function getJson(url, token) {
        var _this = this;

        if (!url) {
            _Log.Log.error("JsonService.getJson: No url passed");
            throw new Error("url");
        }

        _Log.Log.debug("JsonService.getJson, url: ", url);

        return new Promise(function (resolve, reject) {

            var req = new _this._XMLHttpRequest();
            req.open('GET', url);

            var allowedContentTypes = _this._contentTypes;
            var jwtHandler = _this._jwtHandler;

            req.onload = function () {
                _Log.Log.debug("JsonService.getJson: HTTP response received, status", req.status);

                if (req.status === 200) {

                    var contentType = req.getResponseHeader("Content-Type");
                    if (contentType) {

                        var found = allowedContentTypes.find(function (item) {
                            if (contentType.startsWith(item)) {
                                return true;
                            }
                        });

                        if (found == "application/jwt") {
                            jwtHandler(req).then(resolve, reject);
                            return;
                        }

                        if (found) {
                            try {
                                resolve(JSON.parse(req.responseText));
                                return;
                            } catch (e) {
                                _Log.Log.error("JsonService.getJson: Error parsing JSON response", e.message);
                                reject(e);
                                return;
                            }
                        }
                    }

                    reject(Error("Invalid response Content-Type: " + contentType + ", from URL: " + url));
                } else {
                    reject(Error(req.statusText + " (" + req.status + ")"));
                }
            };

            req.onerror = function () {
                _Log.Log.error("JsonService.getJson: network error");
                reject(Error("Network Error"));
            };

            if (token) {
                _Log.Log.debug("JsonService.getJson: token passed, setting Authorization header");
                req.setRequestHeader("Authorization", "Bearer " + token);
            }

            req.send();
        });
    };

    JsonService.prototype.postForm = function postForm(url, payload, basicAuth) {
        var _this2 = this;

        if (!url) {
            _Log.Log.error("JsonService.postForm: No url passed");
            throw new Error("url");
        }

        _Log.Log.debug("JsonService.postForm, url: ", url);

        return new Promise(function (resolve, reject) {

            var req = new _this2._XMLHttpRequest();
            req.open('POST', url);

            var allowedContentTypes = _this2._contentTypes;

            req.onload = function () {
                _Log.Log.debug("JsonService.postForm: HTTP response received, status", req.status);

                if (req.status === 200) {

                    var contentType = req.getResponseHeader("Content-Type");
                    if (contentType) {

                        var found = allowedContentTypes.find(function (item) {
                            if (contentType.startsWith(item)) {
                                return true;
                            }
                        });

                        if (found) {
                            try {
                                resolve(JSON.parse(req.responseText));
                                return;
                            } catch (e) {
                                _Log.Log.error("JsonService.postForm: Error parsing JSON response", e.message);
                                reject(e);
                                return;
                            }
                        }
                    }

                    reject(Error("Invalid response Content-Type: " + contentType + ", from URL: " + url));
                    return;
                }

                if (req.status === 400) {

                    var contentType = req.getResponseHeader("Content-Type");
                    if (contentType) {

                        var found = allowedContentTypes.find(function (item) {
                            if (contentType.startsWith(item)) {
                                return true;
                            }
                        });

                        if (found) {
                            try {
                                var payload = JSON.parse(req.responseText);
                                if (payload && payload.error) {
                                    _Log.Log.error("JsonService.postForm: Error from server: ", payload.error);
                                    reject(new Error(payload.error));
                                    return;
                                }
                            } catch (e) {
                                _Log.Log.error("JsonService.postForm: Error parsing JSON response", e.message);
                                reject(e);
                                return;
                            }
                        }
                    }
                }

                reject(Error(req.statusText + " (" + req.status + ")"));
            };

            req.onerror = function () {
                _Log.Log.error("JsonService.postForm: network error");
                reject(Error("Network Error"));
            };

            var body = "";
            for (var key in payload) {

                var value = payload[key];

                if (value) {

                    if (body.length > 0) {
                        body += "&";
                    }

                    body += encodeURIComponent(key);
                    body += "=";
                    body += encodeURIComponent(value);
                }
            }

            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            if (basicAuth !== undefined) {
                req.setRequestHeader("Authorization", "Basic " + btoa(basicAuth));
            }

            req.send(body);
        });
    };

    return JsonService;
}();

/***/ }),

/***/ "./src/Log.js":
/*!********************!*\
  !*** ./src/Log.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var nopLogger = {
    debug: function debug() {},
    info: function info() {},
    warn: function warn() {},
    error: function error() {}
};

var NONE = 0;
var ERROR = 1;
var WARN = 2;
var INFO = 3;
var DEBUG = 4;

var logger = void 0;
var level = void 0;

var Log = exports.Log = function () {
    function Log() {
        _classCallCheck(this, Log);
    }

    Log.reset = function reset() {
        level = INFO;
        logger = nopLogger;
    };

    Log.debug = function debug() {
        if (level >= DEBUG) {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            logger.debug.apply(logger, Array.from(args));
        }
    };

    Log.info = function info() {
        if (level >= INFO) {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            logger.info.apply(logger, Array.from(args));
        }
    };

    Log.warn = function warn() {
        if (level >= WARN) {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            logger.warn.apply(logger, Array.from(args));
        }
    };

    Log.error = function error() {
        if (level >= ERROR) {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            logger.error.apply(logger, Array.from(args));
        }
    };

    _createClass(Log, null, [{
        key: "NONE",
        get: function get() {
            return NONE;
        }
    }, {
        key: "ERROR",
        get: function get() {
            return ERROR;
        }
    }, {
        key: "WARN",
        get: function get() {
            return WARN;
        }
    }, {
        key: "INFO",
        get: function get() {
            return INFO;
        }
    }, {
        key: "DEBUG",
        get: function get() {
            return DEBUG;
        }
    }, {
        key: "level",
        get: function get() {
            return level;
        },
        set: function set(value) {
            if (NONE <= value && value <= DEBUG) {
                level = value;
            } else {
                throw new Error("Invalid log level");
            }
        }
    }, {
        key: "logger",
        get: function get() {
            return logger;
        },
        set: function set(value) {
            if (!value.debug && value.info) {
                // just to stay backwards compat. can remove in 2.0
                value.debug = value.info;
            }

            if (value.debug && value.info && value.warn && value.error) {
                logger = value;
            } else {
                throw new Error("Invalid logger");
            }
        }
    }]);

    return Log;
}();

Log.reset();

/***/ }),

/***/ "./src/MetadataService.js":
/*!********************************!*\
  !*** ./src/MetadataService.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MetadataService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _JsonService = __webpack_require__(/*! ./JsonService.js */ "./src/JsonService.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OidcMetadataUrlPath = '.well-known/openid-configuration';

var MetadataService = exports.MetadataService = function () {
    function MetadataService(settings) {
        var JsonServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _JsonService.JsonService;

        _classCallCheck(this, MetadataService);

        if (!settings) {
            _Log.Log.error("MetadataService: No settings passed to MetadataService");
            throw new Error("settings");
        }

        this._settings = settings;
        this._jsonService = new JsonServiceCtor(['application/jwk-set+json']);
    }

    MetadataService.prototype.resetSigningKeys = function resetSigningKeys() {
        this._settings = this._settings || {};
        this._settings.signingKeys = undefined;
    };

    MetadataService.prototype.getMetadata = function getMetadata() {
        var _this = this;

        if (this._settings.metadata) {
            _Log.Log.debug("MetadataService.getMetadata: Returning metadata from settings");
            return Promise.resolve(this._settings.metadata);
        }

        if (!this.metadataUrl) {
            _Log.Log.error("MetadataService.getMetadata: No authority or metadataUrl configured on settings");
            return Promise.reject(new Error("No authority or metadataUrl configured on settings"));
        }

        _Log.Log.debug("MetadataService.getMetadata: getting metadata from", this.metadataUrl);

        return this._jsonService.getJson(this.metadataUrl).then(function (metadata) {
            _Log.Log.debug("MetadataService.getMetadata: json received");

            var seed = _this._settings.metadataSeed || {};
            _this._settings.metadata = Object.assign({}, seed, metadata);
            return _this._settings.metadata;
        });
    };

    MetadataService.prototype.getIssuer = function getIssuer() {
        return this._getMetadataProperty("issuer");
    };

    MetadataService.prototype.getAuthorizationEndpoint = function getAuthorizationEndpoint() {
        return this._getMetadataProperty("authorization_endpoint");
    };

    MetadataService.prototype.getUserInfoEndpoint = function getUserInfoEndpoint() {
        return this._getMetadataProperty("userinfo_endpoint");
    };

    MetadataService.prototype.getTokenEndpoint = function getTokenEndpoint() {
        var optional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        return this._getMetadataProperty("token_endpoint", optional);
    };

    MetadataService.prototype.getCheckSessionIframe = function getCheckSessionIframe() {
        return this._getMetadataProperty("check_session_iframe", true);
    };

    MetadataService.prototype.getEndSessionEndpoint = function getEndSessionEndpoint() {
        return this._getMetadataProperty("end_session_endpoint", true);
    };

    MetadataService.prototype.getRevocationEndpoint = function getRevocationEndpoint() {
        return this._getMetadataProperty("revocation_endpoint", true);
    };

    MetadataService.prototype.getKeysEndpoint = function getKeysEndpoint() {
        return this._getMetadataProperty("jwks_uri", true);
    };

    MetadataService.prototype._getMetadataProperty = function _getMetadataProperty(name) {
        var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _Log.Log.debug("MetadataService.getMetadataProperty for: " + name);

        return this.getMetadata().then(function (metadata) {
            _Log.Log.debug("MetadataService.getMetadataProperty: metadata recieved");

            if (metadata[name] === undefined) {

                if (optional === true) {
                    _Log.Log.warn("MetadataService.getMetadataProperty: Metadata does not contain optional property " + name);
                    return undefined;
                } else {
                    _Log.Log.error("MetadataService.getMetadataProperty: Metadata does not contain property " + name);
                    throw new Error("Metadata does not contain property " + name);
                }
            }

            return metadata[name];
        });
    };

    MetadataService.prototype.getSigningKeys = function getSigningKeys() {
        var _this2 = this;

        if (this._settings.signingKeys) {
            _Log.Log.debug("MetadataService.getSigningKeys: Returning signingKeys from settings");
            return Promise.resolve(this._settings.signingKeys);
        }

        return this._getMetadataProperty("jwks_uri").then(function (jwks_uri) {
            _Log.Log.debug("MetadataService.getSigningKeys: jwks_uri received", jwks_uri);

            return _this2._jsonService.getJson(jwks_uri).then(function (keySet) {
                _Log.Log.debug("MetadataService.getSigningKeys: key set received", keySet);

                if (!keySet.keys) {
                    _Log.Log.error("MetadataService.getSigningKeys: Missing keys on keyset");
                    throw new Error("Missing keys on keyset");
                }

                _this2._settings.signingKeys = keySet.keys;
                return _this2._settings.signingKeys;
            });
        });
    };

    _createClass(MetadataService, [{
        key: 'metadataUrl',
        get: function get() {
            if (!this._metadataUrl) {
                if (this._settings.metadataUrl) {
                    this._metadataUrl = this._settings.metadataUrl;
                } else {
                    this._metadataUrl = this._settings.authority;

                    if (this._metadataUrl && this._metadataUrl.indexOf(OidcMetadataUrlPath) < 0) {
                        if (this._metadataUrl[this._metadataUrl.length - 1] !== '/') {
                            this._metadataUrl += '/';
                        }
                        this._metadataUrl += OidcMetadataUrlPath;
                    }
                }
            }

            return this._metadataUrl;
        }
    }]);

    return MetadataService;
}();

/***/ }),

/***/ "./src/OidcClient.js":
/*!***************************!*\
  !*** ./src/OidcClient.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OidcClient = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _OidcClientSettings = __webpack_require__(/*! ./OidcClientSettings.js */ "./src/OidcClientSettings.js");

var _ErrorResponse = __webpack_require__(/*! ./ErrorResponse.js */ "./src/ErrorResponse.js");

var _SigninRequest = __webpack_require__(/*! ./SigninRequest.js */ "./src/SigninRequest.js");

var _SigninResponse = __webpack_require__(/*! ./SigninResponse.js */ "./src/SigninResponse.js");

var _SignoutRequest = __webpack_require__(/*! ./SignoutRequest.js */ "./src/SignoutRequest.js");

var _SignoutResponse = __webpack_require__(/*! ./SignoutResponse.js */ "./src/SignoutResponse.js");

var _SigninState = __webpack_require__(/*! ./SigninState.js */ "./src/SigninState.js");

var _State = __webpack_require__(/*! ./State.js */ "./src/State.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OidcClient = exports.OidcClient = function () {
    function OidcClient() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, OidcClient);

        if (settings instanceof _OidcClientSettings.OidcClientSettings) {
            this._settings = settings;
        } else {
            this._settings = new _OidcClientSettings.OidcClientSettings(settings);
        }
    }

    OidcClient.prototype.createSigninRequest = function createSigninRequest() {
        var _this = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            response_type = _ref.response_type,
            scope = _ref.scope,
            redirect_uri = _ref.redirect_uri,
            data = _ref.data,
            state = _ref.state,
            prompt = _ref.prompt,
            display = _ref.display,
            max_age = _ref.max_age,
            ui_locales = _ref.ui_locales,
            id_token_hint = _ref.id_token_hint,
            login_hint = _ref.login_hint,
            acr_values = _ref.acr_values,
            resource = _ref.resource,
            request = _ref.request,
            request_uri = _ref.request_uri,
            response_mode = _ref.response_mode,
            extraQueryParams = _ref.extraQueryParams,
            extraTokenParams = _ref.extraTokenParams,
            request_type = _ref.request_type,
            skipUserInfo = _ref.skipUserInfo;

        var stateStore = arguments[1];

        _Log.Log.debug("OidcClient.createSigninRequest");

        var client_id = this._settings.client_id;
        response_type = response_type || this._settings.response_type;
        scope = scope || this._settings.scope;
        redirect_uri = redirect_uri || this._settings.redirect_uri;

        // id_token_hint, login_hint aren't allowed on _settings
        prompt = prompt || this._settings.prompt;
        display = display || this._settings.display;
        max_age = max_age || this._settings.max_age;
        ui_locales = ui_locales || this._settings.ui_locales;
        acr_values = acr_values || this._settings.acr_values;
        resource = resource || this._settings.resource;
        response_mode = response_mode || this._settings.response_mode;
        extraQueryParams = extraQueryParams || this._settings.extraQueryParams;
        extraTokenParams = extraTokenParams || this._settings.extraTokenParams;

        var authority = this._settings.authority;

        if (_SigninRequest.SigninRequest.isCode(response_type) && response_type !== "code") {
            return Promise.reject(new Error("OpenID Connect hybrid flow is not supported"));
        }

        return this._metadataService.getAuthorizationEndpoint().then(function (url) {
            _Log.Log.debug("OidcClient.createSigninRequest: Received authorization endpoint", url);

            var signinRequest = new _SigninRequest.SigninRequest({
                url: url,
                client_id: client_id,
                redirect_uri: redirect_uri,
                response_type: response_type,
                scope: scope,
                data: data || state,
                authority: authority,
                prompt: prompt, display: display, max_age: max_age, ui_locales: ui_locales, id_token_hint: id_token_hint, login_hint: login_hint, acr_values: acr_values,
                resource: resource, request: request, request_uri: request_uri, extraQueryParams: extraQueryParams, extraTokenParams: extraTokenParams, request_type: request_type, response_mode: response_mode,
                client_secret: _this._settings.client_secret,
                skipUserInfo: skipUserInfo
            });

            var signinState = signinRequest.state;
            stateStore = stateStore || _this._stateStore;

            return stateStore.set(signinState.id, signinState.toStorageString()).then(function () {
                return signinRequest;
            });
        });
    };

    OidcClient.prototype.readSigninResponseState = function readSigninResponseState(url, stateStore) {
        var removeState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _Log.Log.debug("OidcClient.readSigninResponseState");

        var useQuery = this._settings.response_mode === "query" || !this._settings.response_mode && _SigninRequest.SigninRequest.isCode(this._settings.response_type);
        var delimiter = useQuery ? "?" : "#";

        var response = new _SigninResponse.SigninResponse(url, delimiter);

        if (!response.state) {
            _Log.Log.error("OidcClient.readSigninResponseState: No state in response");
            return Promise.reject(new Error("No state in response"));
        }

        stateStore = stateStore || this._stateStore;

        var stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);

        return stateApi(response.state).then(function (storedStateString) {
            if (!storedStateString) {
                _Log.Log.error("OidcClient.readSigninResponseState: No matching state found in storage");
                throw new Error("No matching state found in storage");
            }

            var state = _SigninState.SigninState.fromStorageString(storedStateString);
            return { state: state, response: response };
        });
    };

    OidcClient.prototype.processSigninResponse = function processSigninResponse(url, stateStore) {
        var _this2 = this;

        _Log.Log.debug("OidcClient.processSigninResponse");

        return this.readSigninResponseState(url, stateStore, true).then(function (_ref2) {
            var state = _ref2.state,
                response = _ref2.response;

            _Log.Log.debug("OidcClient.processSigninResponse: Received state from storage; validating response");
            return _this2._validator.validateSigninResponse(state, response);
        });
    };

    OidcClient.prototype.createSignoutRequest = function createSignoutRequest() {
        var _this3 = this;

        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            id_token_hint = _ref3.id_token_hint,
            data = _ref3.data,
            state = _ref3.state,
            post_logout_redirect_uri = _ref3.post_logout_redirect_uri,
            extraQueryParams = _ref3.extraQueryParams,
            request_type = _ref3.request_type;

        var stateStore = arguments[1];

        _Log.Log.debug("OidcClient.createSignoutRequest");

        post_logout_redirect_uri = post_logout_redirect_uri || this._settings.post_logout_redirect_uri;
        extraQueryParams = extraQueryParams || this._settings.extraQueryParams;

        return this._metadataService.getEndSessionEndpoint().then(function (url) {
            if (!url) {
                _Log.Log.error("OidcClient.createSignoutRequest: No end session endpoint url returned");
                throw new Error("no end session endpoint");
            }

            _Log.Log.debug("OidcClient.createSignoutRequest: Received end session endpoint", url);

            var request = new _SignoutRequest.SignoutRequest({
                url: url,
                id_token_hint: id_token_hint,
                post_logout_redirect_uri: post_logout_redirect_uri,
                data: data || state,
                extraQueryParams: extraQueryParams,
                request_type: request_type
            });

            var signoutState = request.state;
            if (signoutState) {
                _Log.Log.debug("OidcClient.createSignoutRequest: Signout request has state to persist");

                stateStore = stateStore || _this3._stateStore;
                stateStore.set(signoutState.id, signoutState.toStorageString());
            }

            return request;
        });
    };

    OidcClient.prototype.readSignoutResponseState = function readSignoutResponseState(url, stateStore) {
        var removeState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _Log.Log.debug("OidcClient.readSignoutResponseState");

        var response = new _SignoutResponse.SignoutResponse(url);
        if (!response.state) {
            _Log.Log.debug("OidcClient.readSignoutResponseState: No state in response");

            if (response.error) {
                _Log.Log.warn("OidcClient.readSignoutResponseState: Response was error: ", response.error);
                return Promise.reject(new _ErrorResponse.ErrorResponse(response));
            }

            return Promise.resolve({ state: undefined, response: response });
        }

        var stateKey = response.state;

        stateStore = stateStore || this._stateStore;

        var stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);
        return stateApi(stateKey).then(function (storedStateString) {
            if (!storedStateString) {
                _Log.Log.error("OidcClient.readSignoutResponseState: No matching state found in storage");
                throw new Error("No matching state found in storage");
            }

            var state = _State.State.fromStorageString(storedStateString);

            return { state: state, response: response };
        });
    };

    OidcClient.prototype.processSignoutResponse = function processSignoutResponse(url, stateStore) {
        var _this4 = this;

        _Log.Log.debug("OidcClient.processSignoutResponse");

        return this.readSignoutResponseState(url, stateStore, true).then(function (_ref4) {
            var state = _ref4.state,
                response = _ref4.response;

            if (state) {
                _Log.Log.debug("OidcClient.processSignoutResponse: Received state from storage; validating response");
                return _this4._validator.validateSignoutResponse(state, response);
            } else {
                _Log.Log.debug("OidcClient.processSignoutResponse: No state from storage; skipping validating response");
                return response;
            }
        });
    };

    OidcClient.prototype.clearStaleState = function clearStaleState(stateStore) {
        _Log.Log.debug("OidcClient.clearStaleState");

        stateStore = stateStore || this._stateStore;

        return _State.State.clearStaleState(stateStore, this.settings.staleStateAge);
    };

    _createClass(OidcClient, [{
        key: '_stateStore',
        get: function get() {
            return this.settings.stateStore;
        }
    }, {
        key: '_validator',
        get: function get() {
            return this.settings.validator;
        }
    }, {
        key: '_metadataService',
        get: function get() {
            return this.settings.metadataService;
        }
    }, {
        key: 'settings',
        get: function get() {
            return this._settings;
        }
    }, {
        key: 'metadataService',
        get: function get() {
            return this._metadataService;
        }
    }]);

    return OidcClient;
}();

/***/ }),

/***/ "./src/OidcClientSettings.js":
/*!***********************************!*\
  !*** ./src/OidcClientSettings.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OidcClientSettings = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _ClockService = __webpack_require__(/*! ./ClockService.js */ "./src/ClockService.js");

var _WebStorageStateStore = __webpack_require__(/*! ./WebStorageStateStore.js */ "./src/WebStorageStateStore.js");

var _ResponseValidator = __webpack_require__(/*! ./ResponseValidator.js */ "./src/ResponseValidator.js");

var _MetadataService = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OidcMetadataUrlPath = '.well-known/openid-configuration';

var DefaultResponseType = "id_token";
var DefaultScope = "openid";
var DefaultClientAuthentication = "client_secret_post"; // The default value must be client_secret_basic, as explained in https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication
var DefaultStaleStateAge = 60 * 15; // seconds
var DefaultClockSkewInSeconds = 60 * 5;

var OidcClientSettings = exports.OidcClientSettings = function () {
    function OidcClientSettings() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            authority = _ref.authority,
            metadataUrl = _ref.metadataUrl,
            metadata = _ref.metadata,
            signingKeys = _ref.signingKeys,
            metadataSeed = _ref.metadataSeed,
            client_id = _ref.client_id,
            client_secret = _ref.client_secret,
            _ref$response_type = _ref.response_type,
            response_type = _ref$response_type === undefined ? DefaultResponseType : _ref$response_type,
            _ref$scope = _ref.scope,
            scope = _ref$scope === undefined ? DefaultScope : _ref$scope,
            redirect_uri = _ref.redirect_uri,
            post_logout_redirect_uri = _ref.post_logout_redirect_uri,
            _ref$client_authentic = _ref.client_authentication,
            client_authentication = _ref$client_authentic === undefined ? DefaultClientAuthentication : _ref$client_authentic,
            prompt = _ref.prompt,
            display = _ref.display,
            max_age = _ref.max_age,
            ui_locales = _ref.ui_locales,
            acr_values = _ref.acr_values,
            resource = _ref.resource,
            response_mode = _ref.response_mode,
            _ref$filterProtocolCl = _ref.filterProtocolClaims,
            filterProtocolClaims = _ref$filterProtocolCl === undefined ? true : _ref$filterProtocolCl,
            _ref$loadUserInfo = _ref.loadUserInfo,
            loadUserInfo = _ref$loadUserInfo === undefined ? true : _ref$loadUserInfo,
            _ref$staleStateAge = _ref.staleStateAge,
            staleStateAge = _ref$staleStateAge === undefined ? DefaultStaleStateAge : _ref$staleStateAge,
            _ref$clockSkew = _ref.clockSkew,
            clockSkew = _ref$clockSkew === undefined ? DefaultClockSkewInSeconds : _ref$clockSkew,
            _ref$clockService = _ref.clockService,
            clockService = _ref$clockService === undefined ? new _ClockService.ClockService() : _ref$clockService,
            _ref$userInfoJwtIssue = _ref.userInfoJwtIssuer,
            userInfoJwtIssuer = _ref$userInfoJwtIssue === undefined ? 'OP' : _ref$userInfoJwtIssue,
            _ref$mergeClaims = _ref.mergeClaims,
            mergeClaims = _ref$mergeClaims === undefined ? false : _ref$mergeClaims,
            _ref$stateStore = _ref.stateStore,
            stateStore = _ref$stateStore === undefined ? new _WebStorageStateStore.WebStorageStateStore() : _ref$stateStore,
            _ref$ResponseValidato = _ref.ResponseValidatorCtor,
            ResponseValidatorCtor = _ref$ResponseValidato === undefined ? _ResponseValidator.ResponseValidator : _ref$ResponseValidato,
            _ref$MetadataServiceC = _ref.MetadataServiceCtor,
            MetadataServiceCtor = _ref$MetadataServiceC === undefined ? _MetadataService.MetadataService : _ref$MetadataServiceC,
            _ref$extraQueryParams = _ref.extraQueryParams,
            extraQueryParams = _ref$extraQueryParams === undefined ? {} : _ref$extraQueryParams,
            _ref$extraTokenParams = _ref.extraTokenParams,
            extraTokenParams = _ref$extraTokenParams === undefined ? {} : _ref$extraTokenParams;

        _classCallCheck(this, OidcClientSettings);

        this._authority = authority;
        this._metadataUrl = metadataUrl;
        this._metadata = metadata;
        this._metadataSeed = metadataSeed;
        this._signingKeys = signingKeys;

        this._client_id = client_id;
        this._client_secret = client_secret;
        this._response_type = response_type;
        this._scope = scope;
        this._redirect_uri = redirect_uri;
        this._post_logout_redirect_uri = post_logout_redirect_uri;
        this._client_authentication = client_authentication;

        this._prompt = prompt;
        this._display = display;
        this._max_age = max_age;
        this._ui_locales = ui_locales;
        this._acr_values = acr_values;
        this._resource = resource;
        this._response_mode = response_mode;

        this._filterProtocolClaims = !!filterProtocolClaims;
        this._loadUserInfo = !!loadUserInfo;
        this._staleStateAge = staleStateAge;
        this._clockSkew = clockSkew;
        this._clockService = clockService;
        this._userInfoJwtIssuer = userInfoJwtIssuer;
        this._mergeClaims = !!mergeClaims;

        this._stateStore = stateStore;
        this._validator = new ResponseValidatorCtor(this);
        this._metadataService = new MetadataServiceCtor(this);

        this._extraQueryParams = (typeof extraQueryParams === 'undefined' ? 'undefined' : _typeof(extraQueryParams)) === 'object' ? extraQueryParams : {};
        this._extraTokenParams = (typeof extraTokenParams === 'undefined' ? 'undefined' : _typeof(extraTokenParams)) === 'object' ? extraTokenParams : {};
    }

    // client config


    // get the time
    OidcClientSettings.prototype.getEpochTime = function getEpochTime() {
        return this._clockService.getEpochTime();
    };

    _createClass(OidcClientSettings, [{
        key: 'client_id',
        get: function get() {
            return this._client_id;
        },
        set: function set(value) {
            if (!this._client_id) {
                // one-time set only
                this._client_id = value;
            } else {
                _Log.Log.error("OidcClientSettings.set_client_id: client_id has already been assigned.");
                throw new Error("client_id has already been assigned.");
            }
        }
    }, {
        key: 'client_secret',
        get: function get() {
            return this._client_secret;
        }
    }, {
        key: 'response_type',
        get: function get() {
            return this._response_type;
        }
    }, {
        key: 'scope',
        get: function get() {
            return this._scope;
        }
    }, {
        key: 'redirect_uri',
        get: function get() {
            return this._redirect_uri;
        }
    }, {
        key: 'post_logout_redirect_uri',
        get: function get() {
            return this._post_logout_redirect_uri;
        }
    }, {
        key: 'client_authentication',
        get: function get() {
            return this._client_authentication;
        }

        // optional protocol params

    }, {
        key: 'prompt',
        get: function get() {
            return this._prompt;
        }
    }, {
        key: 'display',
        get: function get() {
            return this._display;
        }
    }, {
        key: 'max_age',
        get: function get() {
            return this._max_age;
        }
    }, {
        key: 'ui_locales',
        get: function get() {
            return this._ui_locales;
        }
    }, {
        key: 'acr_values',
        get: function get() {
            return this._acr_values;
        }
    }, {
        key: 'resource',
        get: function get() {
            return this._resource;
        }
    }, {
        key: 'response_mode',
        get: function get() {
            return this._response_mode;
        }

        // metadata

    }, {
        key: 'authority',
        get: function get() {
            return this._authority;
        },
        set: function set(value) {
            if (!this._authority) {
                // one-time set only
                this._authority = value;
            } else {
                _Log.Log.error("OidcClientSettings.set_authority: authority has already been assigned.");
                throw new Error("authority has already been assigned.");
            }
        }
    }, {
        key: 'metadataUrl',
        get: function get() {
            if (!this._metadataUrl) {
                this._metadataUrl = this.authority;

                if (this._metadataUrl && this._metadataUrl.indexOf(OidcMetadataUrlPath) < 0) {
                    if (this._metadataUrl[this._metadataUrl.length - 1] !== '/') {
                        this._metadataUrl += '/';
                    }
                    this._metadataUrl += OidcMetadataUrlPath;
                }
            }

            return this._metadataUrl;
        }

        // settable/cachable metadata values

    }, {
        key: 'metadata',
        get: function get() {
            return this._metadata;
        },
        set: function set(value) {
            this._metadata = value;
        }
    }, {
        key: 'metadataSeed',
        get: function get() {
            return this._metadataSeed;
        },
        set: function set(value) {
            this._metadataSeed = value;
        }
    }, {
        key: 'signingKeys',
        get: function get() {
            return this._signingKeys;
        },
        set: function set(value) {
            this._signingKeys = value;
        }

        // behavior flags

    }, {
        key: 'filterProtocolClaims',
        get: function get() {
            return this._filterProtocolClaims;
        }
    }, {
        key: 'loadUserInfo',
        get: function get() {
            return this._loadUserInfo;
        }
    }, {
        key: 'staleStateAge',
        get: function get() {
            return this._staleStateAge;
        }
    }, {
        key: 'clockSkew',
        get: function get() {
            return this._clockSkew;
        }
    }, {
        key: 'userInfoJwtIssuer',
        get: function get() {
            return this._userInfoJwtIssuer;
        }
    }, {
        key: 'mergeClaims',
        get: function get() {
            return this._mergeClaims;
        }
    }, {
        key: 'stateStore',
        get: function get() {
            return this._stateStore;
        }
    }, {
        key: 'validator',
        get: function get() {
            return this._validator;
        }
    }, {
        key: 'metadataService',
        get: function get() {
            return this._metadataService;
        }

        // extra query params

    }, {
        key: 'extraQueryParams',
        get: function get() {
            return this._extraQueryParams;
        },
        set: function set(value) {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                this._extraQueryParams = value;
            } else {
                this._extraQueryParams = {};
            }
        }

        // extra token params

    }, {
        key: 'extraTokenParams',
        get: function get() {
            return this._extraTokenParams;
        },
        set: function set(value) {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                this._extraTokenParams = value;
            } else {
                this._extraTokenParams = {};
            }
        }
    }]);

    return OidcClientSettings;
}();

/***/ }),

/***/ "./src/PopupNavigator.js":
/*!*******************************!*\
  !*** ./src/PopupNavigator.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PopupNavigator = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _PopupWindow = __webpack_require__(/*! ./PopupWindow.js */ "./src/PopupWindow.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var PopupNavigator = exports.PopupNavigator = function () {
    function PopupNavigator() {
        _classCallCheck(this, PopupNavigator);
    }

    PopupNavigator.prototype.prepare = function prepare(params) {
        var popup = new _PopupWindow.PopupWindow(params);
        return Promise.resolve(popup);
    };

    PopupNavigator.prototype.callback = function callback(url, keepOpen, delimiter) {
        _Log.Log.debug("PopupNavigator.callback");

        try {
            _PopupWindow.PopupWindow.notifyOpener(url, keepOpen, delimiter);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    return PopupNavigator;
}();

/***/ }),

/***/ "./src/PopupWindow.js":
/*!****************************!*\
  !*** ./src/PopupWindow.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PopupWindow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _UrlUtility = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckForPopupClosedInterval = 500;
var DefaultPopupFeatures = 'location=no,toolbar=no,width=500,height=500,left=100,top=100;';
//const DefaultPopupFeatures = 'location=no,toolbar=no,width=500,height=500,left=100,top=100;resizable=yes';

var DefaultPopupTarget = "_blank";

var PopupWindow = exports.PopupWindow = function () {
    function PopupWindow(params) {
        var _this = this;

        _classCallCheck(this, PopupWindow);

        this._promise = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });

        var target = params.popupWindowTarget || DefaultPopupTarget;
        var features = params.popupWindowFeatures || DefaultPopupFeatures;

        this._popup = window.open('', target, features);
        if (this._popup) {
            _Log.Log.debug("PopupWindow.ctor: popup successfully created");
            this._checkForPopupClosedTimer = window.setInterval(this._checkForPopupClosed.bind(this), CheckForPopupClosedInterval);
        }
    }

    PopupWindow.prototype.navigate = function navigate(params) {
        if (!this._popup) {
            this._error("PopupWindow.navigate: Error opening popup window");
        } else if (!params || !params.url) {
            this._error("PopupWindow.navigate: no url provided");
            this._error("No url provided");
        } else {
            _Log.Log.debug("PopupWindow.navigate: Setting URL in popup");

            this._id = params.id;
            if (this._id) {
                window["popupCallback_" + params.id] = this._callback.bind(this);
            }

            this._popup.focus();
            this._popup.window.location = params.url;
        }

        return this.promise;
    };

    PopupWindow.prototype._success = function _success(data) {
        _Log.Log.debug("PopupWindow.callback: Successful response from popup window");

        this._cleanup();
        this._resolve(data);
    };

    PopupWindow.prototype._error = function _error(message) {
        _Log.Log.error("PopupWindow.error: ", message);

        this._cleanup();
        this._reject(new Error(message));
    };

    PopupWindow.prototype.close = function close() {
        this._cleanup(false);
    };

    PopupWindow.prototype._cleanup = function _cleanup(keepOpen) {
        _Log.Log.debug("PopupWindow.cleanup");

        window.clearInterval(this._checkForPopupClosedTimer);
        this._checkForPopupClosedTimer = null;

        delete window["popupCallback_" + this._id];

        if (this._popup && !keepOpen) {
            this._popup.close();
        }
        this._popup = null;
    };

    PopupWindow.prototype._checkForPopupClosed = function _checkForPopupClosed() {
        if (!this._popup || this._popup.closed) {
            this._error("Popup window closed");
        }
    };

    PopupWindow.prototype._callback = function _callback(url, keepOpen) {
        this._cleanup(keepOpen);

        if (url) {
            _Log.Log.debug("PopupWindow.callback success");
            this._success({ url: url });
        } else {
            _Log.Log.debug("PopupWindow.callback: Invalid response from popup");
            this._error("Invalid response from popup");
        }
    };

    PopupWindow.notifyOpener = function notifyOpener(url, keepOpen, delimiter) {
        if (window.opener) {
            url = url || window.location.href;
            if (url) {
                var data = _UrlUtility.UrlUtility.parseUrlFragment(url, delimiter);

                if (data.state) {
                    var name = "popupCallback_" + data.state;
                    var callback = window.opener[name];
                    if (callback) {
                        _Log.Log.debug("PopupWindow.notifyOpener: passing url message to opener");
                        callback(url, keepOpen);
                    } else {
                        _Log.Log.warn("PopupWindow.notifyOpener: no matching callback found on opener");
                    }
                } else {
                    _Log.Log.warn("PopupWindow.notifyOpener: no state found in response url");
                }
            }
        } else {
            _Log.Log.warn("PopupWindow.notifyOpener: no window.opener. Can't complete notification.");
        }
    };

    _createClass(PopupWindow, [{
        key: 'promise',
        get: function get() {
            return this._promise;
        }
    }]);

    return PopupWindow;
}();

/***/ }),

/***/ "./src/RedirectNavigator.js":
/*!**********************************!*\
  !*** ./src/RedirectNavigator.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RedirectNavigator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RedirectNavigator = exports.RedirectNavigator = function () {
    function RedirectNavigator() {
        _classCallCheck(this, RedirectNavigator);
    }

    RedirectNavigator.prototype.prepare = function prepare() {
        return Promise.resolve(this);
    };

    RedirectNavigator.prototype.navigate = function navigate(params) {
        if (!params || !params.url) {
            _Log.Log.error("RedirectNavigator.navigate: No url provided");
            return Promise.reject(new Error("No url provided"));
        }

        if (params.useReplaceToNavigate) {
            window.location.replace(params.url);
        } else {
            window.location = params.url;
        }

        return Promise.resolve();
    };

    _createClass(RedirectNavigator, [{
        key: "url",
        get: function get() {
            return window.location.href;
        }
    }]);

    return RedirectNavigator;
}();

/***/ }),

/***/ "./src/ResponseValidator.js":
/*!**********************************!*\
  !*** ./src/ResponseValidator.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResponseValidator = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _MetadataService = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");

var _UserInfoService = __webpack_require__(/*! ./UserInfoService.js */ "./src/UserInfoService.js");

var _TokenClient = __webpack_require__(/*! ./TokenClient.js */ "./src/TokenClient.js");

var _ErrorResponse = __webpack_require__(/*! ./ErrorResponse.js */ "./src/ErrorResponse.js");

var _JoseUtil = __webpack_require__(/*! ./JoseUtil.js */ "./src/JoseUtil.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var ProtocolClaims = ["nonce", "at_hash", "iat", "nbf", "exp", "aud", "iss", "c_hash"];

var ResponseValidator = exports.ResponseValidator = function () {
    function ResponseValidator(settings) {
        var MetadataServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _MetadataService.MetadataService;
        var UserInfoServiceCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _UserInfoService.UserInfoService;
        var joseUtil = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _JoseUtil.JoseUtil;
        var TokenClientCtor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _TokenClient.TokenClient;

        _classCallCheck(this, ResponseValidator);

        if (!settings) {
            _Log.Log.error("ResponseValidator.ctor: No settings passed to ResponseValidator");
            throw new Error("settings");
        }

        this._settings = settings;
        this._metadataService = new MetadataServiceCtor(this._settings);
        this._userInfoService = new UserInfoServiceCtor(this._settings);
        this._joseUtil = joseUtil;
        this._tokenClient = new TokenClientCtor(this._settings);
    }

    ResponseValidator.prototype.validateSigninResponse = function validateSigninResponse(state, response) {
        var _this = this;

        _Log.Log.debug("ResponseValidator.validateSigninResponse");

        return this._processSigninParams(state, response).then(function (response) {
            _Log.Log.debug("ResponseValidator.validateSigninResponse: state processed");
            return _this._validateTokens(state, response).then(function (response) {
                _Log.Log.debug("ResponseValidator.validateSigninResponse: tokens validated");
                return _this._processClaims(state, response).then(function (response) {
                    _Log.Log.debug("ResponseValidator.validateSigninResponse: claims processed");
                    return response;
                });
            });
        });
    };

    ResponseValidator.prototype.validateSignoutResponse = function validateSignoutResponse(state, response) {
        if (state.id !== response.state) {
            _Log.Log.error("ResponseValidator.validateSignoutResponse: State does not match");
            return Promise.reject(new Error("State does not match"));
        }

        // now that we know the state matches, take the stored data
        // and set it into the response so callers can get their state
        // this is important for both success & error outcomes
        _Log.Log.debug("ResponseValidator.validateSignoutResponse: state validated");
        response.state = state.data;

        if (response.error) {
            _Log.Log.warn("ResponseValidator.validateSignoutResponse: Response was error", response.error);
            return Promise.reject(new _ErrorResponse.ErrorResponse(response));
        }

        return Promise.resolve(response);
    };

    ResponseValidator.prototype._processSigninParams = function _processSigninParams(state, response) {
        if (state.id !== response.state) {
            _Log.Log.error("ResponseValidator._processSigninParams: State does not match");
            return Promise.reject(new Error("State does not match"));
        }

        if (!state.client_id) {
            _Log.Log.error("ResponseValidator._processSigninParams: No client_id on state");
            return Promise.reject(new Error("No client_id on state"));
        }

        if (!state.authority) {
            _Log.Log.error("ResponseValidator._processSigninParams: No authority on state");
            return Promise.reject(new Error("No authority on state"));
        }

        // this allows the authority to be loaded from the signin state
        if (!this._settings.authority) {
            this._settings.authority = state.authority;
        }
        // ensure we're using the correct authority if the authority is not loaded from signin state
        else if (this._settings.authority && this._settings.authority !== state.authority) {
                _Log.Log.error("ResponseValidator._processSigninParams: authority mismatch on settings vs. signin state");
                return Promise.reject(new Error("authority mismatch on settings vs. signin state"));
            }
        // this allows the client_id to be loaded from the signin state
        if (!this._settings.client_id) {
            this._settings.client_id = state.client_id;
        }
        // ensure we're using the correct client_id if the client_id is not loaded from signin state
        else if (this._settings.client_id && this._settings.client_id !== state.client_id) {
                _Log.Log.error("ResponseValidator._processSigninParams: client_id mismatch on settings vs. signin state");
                return Promise.reject(new Error("client_id mismatch on settings vs. signin state"));
            }

        // now that we know the state matches, take the stored data
        // and set it into the response so callers can get their state
        // this is important for both success & error outcomes
        _Log.Log.debug("ResponseValidator._processSigninParams: state validated");
        response.state = state.data;

        if (response.error) {
            _Log.Log.warn("ResponseValidator._processSigninParams: Response was error", response.error);
            return Promise.reject(new _ErrorResponse.ErrorResponse(response));
        }

        if (state.nonce && !response.id_token) {
            _Log.Log.error("ResponseValidator._processSigninParams: Expecting id_token in response");
            return Promise.reject(new Error("No id_token in response"));
        }

        if (!state.nonce && response.id_token) {
            _Log.Log.error("ResponseValidator._processSigninParams: Not expecting id_token in response");
            return Promise.reject(new Error("Unexpected id_token in response"));
        }

        if (state.code_verifier && !response.code) {
            _Log.Log.error("ResponseValidator._processSigninParams: Expecting code in response");
            return Promise.reject(new Error("No code in response"));
        }

        if (!state.code_verifier && response.code) {
            _Log.Log.error("ResponseValidator._processSigninParams: Not expecting code in response");
            return Promise.reject(new Error("Unexpected code in response"));
        }

        if (!response.scope) {
            // if there's no scope on the response, then assume all scopes granted (per-spec) and copy over scopes from original request
            response.scope = state.scope;
        }

        return Promise.resolve(response);
    };

    ResponseValidator.prototype._processClaims = function _processClaims(state, response) {
        var _this2 = this;

        if (response.isOpenIdConnect) {
            _Log.Log.debug("ResponseValidator._processClaims: response is OIDC, processing claims");

            response.profile = this._filterProtocolClaims(response.profile);

            if (state.skipUserInfo !== true && this._settings.loadUserInfo && response.access_token) {
                _Log.Log.debug("ResponseValidator._processClaims: loading user info");

                return this._userInfoService.getClaims(response.access_token).then(function (claims) {
                    _Log.Log.debug("ResponseValidator._processClaims: user info claims received from user info endpoint");

                    if (claims.sub !== response.profile.sub) {
                        _Log.Log.error("ResponseValidator._processClaims: sub from user info endpoint does not match sub in id_token");
                        return Promise.reject(new Error("sub from user info endpoint does not match sub in id_token"));
                    }

                    response.profile = _this2._mergeClaims(response.profile, claims);
                    _Log.Log.debug("ResponseValidator._processClaims: user info claims received, updated profile:", response.profile);

                    return response;
                });
            } else {
                _Log.Log.debug("ResponseValidator._processClaims: not loading user info");
            }
        } else {
            _Log.Log.debug("ResponseValidator._processClaims: response is not OIDC, not processing claims");
        }

        return Promise.resolve(response);
    };

    ResponseValidator.prototype._mergeClaims = function _mergeClaims(claims1, claims2) {
        var result = Object.assign({}, claims1);

        for (var name in claims2) {
            var values = claims2[name];
            if (!Array.isArray(values)) {
                values = [values];
            }

            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                if (!result[name]) {
                    result[name] = value;
                } else if (Array.isArray(result[name])) {
                    if (result[name].indexOf(value) < 0) {
                        result[name].push(value);
                    }
                } else if (result[name] !== value) {
                    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && this._settings.mergeClaims) {
                        result[name] = this._mergeClaims(result[name], value);
                    } else {
                        result[name] = [result[name], value];
                    }
                }
            }
        }

        return result;
    };

    ResponseValidator.prototype._filterProtocolClaims = function _filterProtocolClaims(claims) {
        _Log.Log.debug("ResponseValidator._filterProtocolClaims, incoming claims:", claims);

        var result = Object.assign({}, claims);

        if (this._settings._filterProtocolClaims) {
            ProtocolClaims.forEach(function (type) {
                delete result[type];
            });

            _Log.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims filtered", result);
        } else {
            _Log.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims not filtered");
        }

        return result;
    };

    ResponseValidator.prototype._validateTokens = function _validateTokens(state, response) {
        if (response.code) {
            _Log.Log.debug("ResponseValidator._validateTokens: Validating code");
            return this._processCode(state, response);
        }

        if (response.id_token) {
            if (response.access_token) {
                _Log.Log.debug("ResponseValidator._validateTokens: Validating id_token and access_token");
                return this._validateIdTokenAndAccessToken(state, response);
            }

            _Log.Log.debug("ResponseValidator._validateTokens: Validating id_token");
            return this._validateIdToken(state, response);
        }

        _Log.Log.debug("ResponseValidator._validateTokens: No code to process or id_token to validate");
        return Promise.resolve(response);
    };

    ResponseValidator.prototype._processCode = function _processCode(state, response) {
        var _this3 = this;

        var request = {
            client_id: state.client_id,
            client_secret: state.client_secret,
            code: response.code,
            redirect_uri: state.redirect_uri,
            code_verifier: state.code_verifier
        };

        if (state.extraTokenParams && _typeof(state.extraTokenParams) === 'object') {
            Object.assign(request, state.extraTokenParams);
        }

        return this._tokenClient.exchangeCode(request).then(function (tokenResponse) {

            for (var key in tokenResponse) {
                response[key] = tokenResponse[key];
            }

            if (response.id_token) {
                _Log.Log.debug("ResponseValidator._processCode: token response successful, processing id_token");
                return _this3._validateIdTokenAttributes(state, response);
            } else {
                _Log.Log.debug("ResponseValidator._processCode: token response successful, returning response");
            }

            return response;
        });
    };

    ResponseValidator.prototype._validateIdTokenAttributes = function _validateIdTokenAttributes(state, response) {
        var _this4 = this;

        return this._metadataService.getIssuer().then(function (issuer) {

            var audience = state.client_id;
            var clockSkewInSeconds = _this4._settings.clockSkew;
            _Log.Log.debug("ResponseValidator._validateIdTokenAttributes: Validaing JWT attributes; using clock skew (in seconds) of: ", clockSkewInSeconds);

            return _this4._settings.getEpochTime().then(function (now) {
                return _this4._joseUtil.validateJwtAttributes(response.id_token, issuer, audience, clockSkewInSeconds, now).then(function (payload) {

                    if (state.nonce && state.nonce !== payload.nonce) {
                        _Log.Log.error("ResponseValidator._validateIdTokenAttributes: Invalid nonce in id_token");
                        return Promise.reject(new Error("Invalid nonce in id_token"));
                    }

                    if (!payload.sub) {
                        _Log.Log.error("ResponseValidator._validateIdTokenAttributes: No sub present in id_token");
                        return Promise.reject(new Error("No sub present in id_token"));
                    }

                    response.profile = payload;
                    return response;
                });
            });
        });
    };

    ResponseValidator.prototype._validateIdTokenAndAccessToken = function _validateIdTokenAndAccessToken(state, response) {
        var _this5 = this;

        return this._validateIdToken(state, response).then(function (response) {
            return _this5._validateAccessToken(response);
        });
    };

    ResponseValidator.prototype._getSigningKeyForJwt = function _getSigningKeyForJwt(jwt) {
        var _this6 = this;

        return this._metadataService.getSigningKeys().then(function (keys) {
            var kid = jwt.header.kid;
            if (!keys) {
                _Log.Log.error("ResponseValidator._validateIdToken: No signing keys from metadata");
                return Promise.reject(new Error("No signing keys from metadata"));
            }

            _Log.Log.debug("ResponseValidator._validateIdToken: Received signing keys");
            var key = void 0;
            if (!kid) {
                keys = _this6._filterByAlg(keys, jwt.header.alg);

                if (keys.length > 1) {
                    _Log.Log.error("ResponseValidator._validateIdToken: No kid found in id_token and more than one key found in metadata");
                    return Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));
                } else {
                    // kid is mandatory only when there are multiple keys in the referenced JWK Set document
                    // see http://openid.net/specs/openid-connect-core-1_0.html#Signing
                    key = keys[0];
                }
            } else {
                key = keys.filter(function (key) {
                    return key.kid === kid;
                })[0];
            }
            return Promise.resolve(key);
        });
    };

    ResponseValidator.prototype._getSigningKeyForJwtWithSingleRetry = function _getSigningKeyForJwtWithSingleRetry(jwt) {
        var _this7 = this;

        return this._getSigningKeyForJwt(jwt).then(function (key) {
            // Refreshing signingKeys if no suitable verification key is present for given jwt header.
            if (!key) {
                // set to undefined, to trigger network call to jwks_uri.
                _this7._metadataService.resetSigningKeys();
                return _this7._getSigningKeyForJwt(jwt);
            } else {
                return Promise.resolve(key);
            }
        });
    };

    ResponseValidator.prototype._validateIdToken = function _validateIdToken(state, response) {
        var _this8 = this;

        if (!state.nonce) {
            _Log.Log.error("ResponseValidator._validateIdToken: No nonce on state");
            return Promise.reject(new Error("No nonce on state"));
        }

        var jwt = this._joseUtil.parseJwt(response.id_token);
        if (!jwt || !jwt.header || !jwt.payload) {
            _Log.Log.error("ResponseValidator._validateIdToken: Failed to parse id_token", jwt);
            return Promise.reject(new Error("Failed to parse id_token"));
        }

        if (state.nonce !== jwt.payload.nonce) {
            _Log.Log.error("ResponseValidator._validateIdToken: Invalid nonce in id_token");
            return Promise.reject(new Error("Invalid nonce in id_token"));
        }

        return this._metadataService.getIssuer().then(function (issuer) {
            _Log.Log.debug("ResponseValidator._validateIdToken: Received issuer");
            return _this8._getSigningKeyForJwtWithSingleRetry(jwt).then(function (key) {
                if (!key) {
                    _Log.Log.error("ResponseValidator._validateIdToken: No key matching kid or alg found in signing keys");
                    return Promise.reject(new Error("No key matching kid or alg found in signing keys"));
                }

                var audience = state.client_id;

                var clockSkewInSeconds = _this8._settings.clockSkew;
                _Log.Log.debug("ResponseValidator._validateIdToken: Validaing JWT; using clock skew (in seconds) of: ", clockSkewInSeconds);

                return _this8._joseUtil.validateJwt(response.id_token, key, issuer, audience, clockSkewInSeconds).then(function () {
                    _Log.Log.debug("ResponseValidator._validateIdToken: JWT validation successful");

                    if (!jwt.payload.sub) {
                        _Log.Log.error("ResponseValidator._validateIdToken: No sub present in id_token");
                        return Promise.reject(new Error("No sub present in id_token"));
                    }

                    response.profile = jwt.payload;

                    return response;
                });
            });
        });
    };

    ResponseValidator.prototype._filterByAlg = function _filterByAlg(keys, alg) {
        var kty = null;
        if (alg.startsWith("RS")) {
            kty = "RSA";
        } else if (alg.startsWith("PS")) {
            kty = "PS";
        } else if (alg.startsWith("ES")) {
            kty = "EC";
        } else {
            _Log.Log.debug("ResponseValidator._filterByAlg: alg not supported: ", alg);
            return [];
        }

        _Log.Log.debug("ResponseValidator._filterByAlg: Looking for keys that match kty: ", kty);

        keys = keys.filter(function (key) {
            return key.kty === kty;
        });

        _Log.Log.debug("ResponseValidator._filterByAlg: Number of keys that match kty: ", kty, keys.length);

        return keys;
    };

    ResponseValidator.prototype._validateAccessToken = function _validateAccessToken(response) {
        if (!response.profile) {
            _Log.Log.error("ResponseValidator._validateAccessToken: No profile loaded from id_token");
            return Promise.reject(new Error("No profile loaded from id_token"));
        }

        if (!response.profile.at_hash) {
            _Log.Log.error("ResponseValidator._validateAccessToken: No at_hash in id_token");
            return Promise.reject(new Error("No at_hash in id_token"));
        }

        if (!response.id_token) {
            _Log.Log.error("ResponseValidator._validateAccessToken: No id_token");
            return Promise.reject(new Error("No id_token"));
        }

        var jwt = this._joseUtil.parseJwt(response.id_token);
        if (!jwt || !jwt.header) {
            _Log.Log.error("ResponseValidator._validateAccessToken: Failed to parse id_token", jwt);
            return Promise.reject(new Error("Failed to parse id_token"));
        }

        var hashAlg = jwt.header.alg;
        if (!hashAlg || hashAlg.length !== 5) {
            _Log.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg);
            return Promise.reject(new Error("Unsupported alg: " + hashAlg));
        }

        var hashBits = hashAlg.substr(2, 3);
        if (!hashBits) {
            _Log.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg, hashBits);
            return Promise.reject(new Error("Unsupported alg: " + hashAlg));
        }

        hashBits = parseInt(hashBits);
        if (hashBits !== 256 && hashBits !== 384 && hashBits !== 512) {
            _Log.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg, hashBits);
            return Promise.reject(new Error("Unsupported alg: " + hashAlg));
        }

        var sha = "sha" + hashBits;
        var hash = this._joseUtil.hashString(response.access_token, sha);
        if (!hash) {
            _Log.Log.error("ResponseValidator._validateAccessToken: access_token hash failed:", sha);
            return Promise.reject(new Error("Failed to validate at_hash"));
        }

        var left = hash.substr(0, hash.length / 2);
        var left_b64u = this._joseUtil.hexToBase64Url(left);
        if (left_b64u !== response.profile.at_hash) {
            _Log.Log.error("ResponseValidator._validateAccessToken: Failed to validate at_hash", left_b64u, response.profile.at_hash);
            return Promise.reject(new Error("Failed to validate at_hash"));
        }

        _Log.Log.debug("ResponseValidator._validateAccessToken: success");

        return Promise.resolve(response);
    };

    return ResponseValidator;
}();

/***/ }),

/***/ "./src/SessionMonitor.js":
/*!*******************************!*\
  !*** ./src/SessionMonitor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SessionMonitor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _CheckSessionIFrame = __webpack_require__(/*! ./CheckSessionIFrame.js */ "./src/CheckSessionIFrame.js");

var _Global = __webpack_require__(/*! ./Global.js */ "./src/Global.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionMonitor = exports.SessionMonitor = function () {
    function SessionMonitor(userManager) {
        var _this = this;

        var CheckSessionIFrameCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _CheckSessionIFrame.CheckSessionIFrame;
        var timer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Global.Global.timer;

        _classCallCheck(this, SessionMonitor);

        if (!userManager) {
            _Log.Log.error("SessionMonitor.ctor: No user manager passed to SessionMonitor");
            throw new Error("userManager");
        }

        this._userManager = userManager;
        this._CheckSessionIFrameCtor = CheckSessionIFrameCtor;
        this._timer = timer;

        this._userManager.events.addUserLoaded(this._start.bind(this));
        this._userManager.events.addUserUnloaded(this._stop.bind(this));

        Promise.resolve(this._userManager.getUser().then(function (user) {
            // doing this manually here since calling getUser 
            // doesn't trigger load event.
            if (user) {
                _this._start(user);
            } else if (_this._settings.monitorAnonymousSession) {
                _this._userManager.querySessionStatus().then(function (session) {
                    var tmpUser = {
                        session_state: session.session_state
                    };
                    if (session.sub && session.sid) {
                        tmpUser.profile = {
                            sub: session.sub,
                            sid: session.sid
                        };
                    }
                    _this._start(tmpUser);
                }).catch(function (err) {
                    // catch to suppress errors since we're in a ctor
                    _Log.Log.error("SessionMonitor ctor: error from querySessionStatus:", err.message);
                });
            }
        }).catch(function (err) {
            // catch to suppress errors since we're in a ctor
            _Log.Log.error("SessionMonitor ctor: error from getUser:", err.message);
        }));
    }

    SessionMonitor.prototype._start = function _start(user) {
        var _this2 = this;

        var session_state = user.session_state;

        if (session_state) {
            if (user.profile) {
                this._sub = user.profile.sub;
                this._sid = user.profile.sid;
                _Log.Log.debug("SessionMonitor._start: session_state:", session_state, ", sub:", this._sub);
            } else {
                this._sub = undefined;
                this._sid = undefined;
                _Log.Log.debug("SessionMonitor._start: session_state:", session_state, ", anonymous user");
            }

            if (!this._checkSessionIFrame) {
                this._metadataService.getCheckSessionIframe().then(function (url) {
                    if (url) {
                        _Log.Log.debug("SessionMonitor._start: Initializing check session iframe");

                        var client_id = _this2._client_id;
                        var interval = _this2._checkSessionInterval;
                        var stopOnError = _this2._stopCheckSessionOnError;

                        _this2._checkSessionIFrame = new _this2._CheckSessionIFrameCtor(_this2._callback.bind(_this2), client_id, url, interval, stopOnError);
                        _this2._checkSessionIFrame.load().then(function () {
                            _this2._checkSessionIFrame.start(session_state);
                        });
                    } else {
                        _Log.Log.warn("SessionMonitor._start: No check session iframe found in the metadata");
                    }
                }).catch(function (err) {
                    // catch to suppress errors since we're in non-promise callback
                    _Log.Log.error("SessionMonitor._start: Error from getCheckSessionIframe:", err.message);
                });
            } else {
                this._checkSessionIFrame.start(session_state);
            }
        }
    };

    SessionMonitor.prototype._stop = function _stop() {
        var _this3 = this;

        this._sub = undefined;
        this._sid = undefined;

        if (this._checkSessionIFrame) {
            _Log.Log.debug("SessionMonitor._stop");
            this._checkSessionIFrame.stop();
        }

        if (this._settings.monitorAnonymousSession) {
            // using a timer to delay re-initialization to avoid race conditions during signout
            var timerHandle = this._timer.setInterval(function () {
                _this3._timer.clearInterval(timerHandle);

                _this3._userManager.querySessionStatus().then(function (session) {
                    var tmpUser = {
                        session_state: session.session_state
                    };
                    if (session.sub && session.sid) {
                        tmpUser.profile = {
                            sub: session.sub,
                            sid: session.sid
                        };
                    }
                    _this3._start(tmpUser);
                }).catch(function (err) {
                    // catch to suppress errors since we're in a callback
                    _Log.Log.error("SessionMonitor: error from querySessionStatus:", err.message);
                });
            }, 1000);
        }
    };

    SessionMonitor.prototype._callback = function _callback() {
        var _this4 = this;

        this._userManager.querySessionStatus().then(function (session) {
            var raiseEvent = true;

            if (session) {
                if (session.sub === _this4._sub) {
                    raiseEvent = false;
                    _this4._checkSessionIFrame.start(session.session_state);

                    if (session.sid === _this4._sid) {
                        _Log.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, restarting check session iframe; session_state:", session.session_state);
                    } else {
                        _Log.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:", session.session_state);
                        _this4._userManager.events._raiseUserSessionChanged();
                    }
                } else {
                    _Log.Log.debug("SessionMonitor._callback: Different subject signed into OP:", session.sub);
                }
            } else {
                _Log.Log.debug("SessionMonitor._callback: Subject no longer signed into OP");
            }

            if (raiseEvent) {
                if (_this4._sub) {
                    _Log.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed out event");
                    _this4._userManager.events._raiseUserSignedOut();
                } else {
                    _Log.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed in event");
                    _this4._userManager.events._raiseUserSignedIn();
                }
            }
        }).catch(function (err) {
            if (_this4._sub) {
                _Log.Log.debug("SessionMonitor._callback: Error calling queryCurrentSigninSession; raising signed out event", err.message);
                _this4._userManager.events._raiseUserSignedOut();
            }
        });
    };

    _createClass(SessionMonitor, [{
        key: '_settings',
        get: function get() {
            return this._userManager.settings;
        }
    }, {
        key: '_metadataService',
        get: function get() {
            return this._userManager.metadataService;
        }
    }, {
        key: '_client_id',
        get: function get() {
            return this._settings.client_id;
        }
    }, {
        key: '_checkSessionInterval',
        get: function get() {
            return this._settings.checkSessionInterval;
        }
    }, {
        key: '_stopCheckSessionOnError',
        get: function get() {
            return this._settings.stopCheckSessionOnError;
        }
    }]);

    return SessionMonitor;
}();

/***/ }),

/***/ "./src/SigninRequest.js":
/*!******************************!*\
  !*** ./src/SigninRequest.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SigninRequest = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _UrlUtility = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");

var _SigninState = __webpack_require__(/*! ./SigninState.js */ "./src/SigninState.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var SigninRequest = exports.SigninRequest = function () {
    function SigninRequest(_ref) {
        var url = _ref.url,
            client_id = _ref.client_id,
            redirect_uri = _ref.redirect_uri,
            response_type = _ref.response_type,
            scope = _ref.scope,
            authority = _ref.authority,
            data = _ref.data,
            prompt = _ref.prompt,
            display = _ref.display,
            max_age = _ref.max_age,
            ui_locales = _ref.ui_locales,
            id_token_hint = _ref.id_token_hint,
            login_hint = _ref.login_hint,
            acr_values = _ref.acr_values,
            resource = _ref.resource,
            response_mode = _ref.response_mode,
            request = _ref.request,
            request_uri = _ref.request_uri,
            extraQueryParams = _ref.extraQueryParams,
            request_type = _ref.request_type,
            client_secret = _ref.client_secret,
            extraTokenParams = _ref.extraTokenParams,
            skipUserInfo = _ref.skipUserInfo;

        _classCallCheck(this, SigninRequest);

        if (!url) {
            _Log.Log.error("SigninRequest.ctor: No url passed");
            throw new Error("url");
        }
        if (!client_id) {
            _Log.Log.error("SigninRequest.ctor: No client_id passed");
            throw new Error("client_id");
        }
        if (!redirect_uri) {
            _Log.Log.error("SigninRequest.ctor: No redirect_uri passed");
            throw new Error("redirect_uri");
        }
        if (!response_type) {
            _Log.Log.error("SigninRequest.ctor: No response_type passed");
            throw new Error("response_type");
        }
        if (!scope) {
            _Log.Log.error("SigninRequest.ctor: No scope passed");
            throw new Error("scope");
        }
        if (!authority) {
            _Log.Log.error("SigninRequest.ctor: No authority passed");
            throw new Error("authority");
        }

        var oidc = SigninRequest.isOidc(response_type);
        var code = SigninRequest.isCode(response_type);

        if (!response_mode) {
            response_mode = SigninRequest.isCode(response_type) ? "query" : null;
        }

        this.state = new _SigninState.SigninState({ nonce: oidc,
            data: data, client_id: client_id, authority: authority, redirect_uri: redirect_uri,
            code_verifier: code,
            request_type: request_type, response_mode: response_mode,
            client_secret: client_secret, scope: scope, extraTokenParams: extraTokenParams, skipUserInfo: skipUserInfo });

        url = _UrlUtility.UrlUtility.addQueryParam(url, "client_id", client_id);
        url = _UrlUtility.UrlUtility.addQueryParam(url, "redirect_uri", redirect_uri);
        url = _UrlUtility.UrlUtility.addQueryParam(url, "response_type", response_type);
        url = _UrlUtility.UrlUtility.addQueryParam(url, "scope", scope);

        url = _UrlUtility.UrlUtility.addQueryParam(url, "state", this.state.id);
        if (oidc) {
            url = _UrlUtility.UrlUtility.addQueryParam(url, "nonce", this.state.nonce);
        }
        if (code) {
            url = _UrlUtility.UrlUtility.addQueryParam(url, "code_challenge", this.state.code_challenge);
            url = _UrlUtility.UrlUtility.addQueryParam(url, "code_challenge_method", "S256");
        }

        var optional = { prompt: prompt, display: display, max_age: max_age, ui_locales: ui_locales, id_token_hint: id_token_hint, login_hint: login_hint, acr_values: acr_values, resource: resource, request: request, request_uri: request_uri, response_mode: response_mode };
        for (var key in optional) {
            if (optional[key]) {
                url = _UrlUtility.UrlUtility.addQueryParam(url, key, optional[key]);
            }
        }

        for (var _key in extraQueryParams) {
            url = _UrlUtility.UrlUtility.addQueryParam(url, _key, extraQueryParams[_key]);
        }

        this.url = url;
    }

    SigninRequest.isOidc = function isOidc(response_type) {
        var result = response_type.split(/\s+/g).filter(function (item) {
            return item === "id_token";
        });
        return !!result[0];
    };

    SigninRequest.isOAuth = function isOAuth(response_type) {
        var result = response_type.split(/\s+/g).filter(function (item) {
            return item === "token";
        });
        return !!result[0];
    };

    SigninRequest.isCode = function isCode(response_type) {
        var result = response_type.split(/\s+/g).filter(function (item) {
            return item === "code";
        });
        return !!result[0];
    };

    return SigninRequest;
}();

/***/ }),

/***/ "./src/SigninResponse.js":
/*!*******************************!*\
  !*** ./src/SigninResponse.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SigninResponse = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _UrlUtility = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OidcScope = "openid";

var SigninResponse = exports.SigninResponse = function () {
    function SigninResponse(url) {
        var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#";

        _classCallCheck(this, SigninResponse);

        var values = _UrlUtility.UrlUtility.parseUrlFragment(url, delimiter);

        this.error = values.error;
        this.error_description = values.error_description;
        this.error_uri = values.error_uri;

        this.code = values.code;
        this.state = values.state;
        this.id_token = values.id_token;
        this.session_state = values.session_state;
        this.access_token = values.access_token;
        this.token_type = values.token_type;
        this.scope = values.scope;
        this.profile = undefined; // will be set from ResponseValidator

        this.expires_in = values.expires_in;
    }

    _createClass(SigninResponse, [{
        key: "expires_in",
        get: function get() {
            if (this.expires_at) {
                var now = parseInt(Date.now() / 1000);
                return this.expires_at - now;
            }
            return undefined;
        },
        set: function set(value) {
            var expires_in = parseInt(value);
            if (typeof expires_in === 'number' && expires_in > 0) {
                var now = parseInt(Date.now() / 1000);
                this.expires_at = now + expires_in;
            }
        }
    }, {
        key: "expired",
        get: function get() {
            var expires_in = this.expires_in;
            if (expires_in !== undefined) {
                return expires_in <= 0;
            }
            return undefined;
        }
    }, {
        key: "scopes",
        get: function get() {
            return (this.scope || "").split(" ");
        }
    }, {
        key: "isOpenIdConnect",
        get: function get() {
            return this.scopes.indexOf(OidcScope) >= 0 || !!this.id_token;
        }
    }]);

    return SigninResponse;
}();

/***/ }),

/***/ "./src/SigninState.js":
/*!****************************!*\
  !*** ./src/SigninState.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SigninState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _State2 = __webpack_require__(/*! ./State.js */ "./src/State.js");

var _JoseUtil = __webpack_require__(/*! ./JoseUtil.js */ "./src/JoseUtil.js");

var _random = __webpack_require__(/*! ./random.js */ "./src/random.js");

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var SigninState = exports.SigninState = function (_State) {
    _inherits(SigninState, _State);

    function SigninState() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            nonce = _ref.nonce,
            authority = _ref.authority,
            client_id = _ref.client_id,
            redirect_uri = _ref.redirect_uri,
            code_verifier = _ref.code_verifier,
            response_mode = _ref.response_mode,
            client_secret = _ref.client_secret,
            scope = _ref.scope,
            extraTokenParams = _ref.extraTokenParams,
            skipUserInfo = _ref.skipUserInfo;

        _classCallCheck(this, SigninState);

        var _this = _possibleConstructorReturn(this, _State.call(this, arguments[0]));

        if (nonce === true) {
            _this._nonce = (0, _random2.default)();
        } else if (nonce) {
            _this._nonce = nonce;
        }

        if (code_verifier === true) {
            // random() produces 32 length
            _this._code_verifier = (0, _random2.default)() + (0, _random2.default)() + (0, _random2.default)();
        } else if (code_verifier) {
            _this._code_verifier = code_verifier;
        }

        if (_this.code_verifier) {
            var hash = _JoseUtil.JoseUtil.hashString(_this.code_verifier, "SHA256");
            _this._code_challenge = _JoseUtil.JoseUtil.hexToBase64Url(hash);
        }

        _this._redirect_uri = redirect_uri;
        _this._authority = authority;
        _this._client_id = client_id;
        _this._response_mode = response_mode;
        _this._client_secret = client_secret;
        _this._scope = scope;
        _this._extraTokenParams = extraTokenParams;
        _this._skipUserInfo = skipUserInfo;
        return _this;
    }

    SigninState.prototype.toStorageString = function toStorageString() {
        _Log.Log.debug("SigninState.toStorageString");
        return JSON.stringify({
            id: this.id,
            data: this.data,
            created: this.created,
            request_type: this.request_type,
            nonce: this.nonce,
            code_verifier: this.code_verifier,
            redirect_uri: this.redirect_uri,
            authority: this.authority,
            client_id: this.client_id,
            response_mode: this.response_mode,
            client_secret: this.client_secret,
            scope: this.scope,
            extraTokenParams: this.extraTokenParams,
            skipUserInfo: this.skipUserInfo
        });
    };

    SigninState.fromStorageString = function fromStorageString(storageString) {
        _Log.Log.debug("SigninState.fromStorageString");
        var data = JSON.parse(storageString);
        return new SigninState(data);
    };

    _createClass(SigninState, [{
        key: 'nonce',
        get: function get() {
            return this._nonce;
        }
    }, {
        key: 'authority',
        get: function get() {
            return this._authority;
        }
    }, {
        key: 'client_id',
        get: function get() {
            return this._client_id;
        }
    }, {
        key: 'redirect_uri',
        get: function get() {
            return this._redirect_uri;
        }
    }, {
        key: 'code_verifier',
        get: function get() {
            return this._code_verifier;
        }
    }, {
        key: 'code_challenge',
        get: function get() {
            return this._code_challenge;
        }
    }, {
        key: 'response_mode',
        get: function get() {
            return this._response_mode;
        }
    }, {
        key: 'client_secret',
        get: function get() {
            return this._client_secret;
        }
    }, {
        key: 'scope',
        get: function get() {
            return this._scope;
        }
    }, {
        key: 'extraTokenParams',
        get: function get() {
            return this._extraTokenParams;
        }
    }, {
        key: 'skipUserInfo',
        get: function get() {
            return this._skipUserInfo;
        }
    }]);

    return SigninState;
}(_State2.State);

/***/ }),

/***/ "./src/SignoutRequest.js":
/*!*******************************!*\
  !*** ./src/SignoutRequest.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SignoutRequest = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _UrlUtility = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");

var _State = __webpack_require__(/*! ./State.js */ "./src/State.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var SignoutRequest = exports.SignoutRequest = function SignoutRequest(_ref) {
    var url = _ref.url,
        id_token_hint = _ref.id_token_hint,
        post_logout_redirect_uri = _ref.post_logout_redirect_uri,
        data = _ref.data,
        extraQueryParams = _ref.extraQueryParams,
        request_type = _ref.request_type;

    _classCallCheck(this, SignoutRequest);

    if (!url) {
        _Log.Log.error("SignoutRequest.ctor: No url passed");
        throw new Error("url");
    }

    if (id_token_hint) {
        url = _UrlUtility.UrlUtility.addQueryParam(url, "id_token_hint", id_token_hint);
    }

    if (post_logout_redirect_uri) {
        url = _UrlUtility.UrlUtility.addQueryParam(url, "post_logout_redirect_uri", post_logout_redirect_uri);

        if (data) {
            this.state = new _State.State({ data: data, request_type: request_type });

            url = _UrlUtility.UrlUtility.addQueryParam(url, "state", this.state.id);
        }
    }

    for (var key in extraQueryParams) {
        url = _UrlUtility.UrlUtility.addQueryParam(url, key, extraQueryParams[key]);
    }

    this.url = url;
};

/***/ }),

/***/ "./src/SignoutResponse.js":
/*!********************************!*\
  !*** ./src/SignoutResponse.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SignoutResponse = undefined;

var _UrlUtility = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var SignoutResponse = exports.SignoutResponse = function SignoutResponse(url) {
    _classCallCheck(this, SignoutResponse);

    var values = _UrlUtility.UrlUtility.parseUrlFragment(url, "?");

    this.error = values.error;
    this.error_description = values.error_description;
    this.error_uri = values.error_uri;

    this.state = values.state;
};

/***/ }),

/***/ "./src/SilentRenewService.js":
/*!***********************************!*\
  !*** ./src/SilentRenewService.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SilentRenewService = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var SilentRenewService = exports.SilentRenewService = function () {
    function SilentRenewService(userManager) {
        _classCallCheck(this, SilentRenewService);

        this._userManager = userManager;
    }

    SilentRenewService.prototype.start = function start() {
        if (!this._callback) {
            this._callback = this._tokenExpiring.bind(this);
            this._userManager.events.addAccessTokenExpiring(this._callback);

            // this will trigger loading of the user so the expiring events can be initialized
            this._userManager.getUser().then(function (user) {
                // deliberate nop
            }).catch(function (err) {
                // catch to suppress errors since we're in a ctor
                _Log.Log.error("SilentRenewService.start: Error from getUser:", err.message);
            });
        }
    };

    SilentRenewService.prototype.stop = function stop() {
        if (this._callback) {
            this._userManager.events.removeAccessTokenExpiring(this._callback);
            delete this._callback;
        }
    };

    SilentRenewService.prototype._tokenExpiring = function _tokenExpiring() {
        var _this = this;

        this._userManager.signinSilent().then(function (user) {
            _Log.Log.debug("SilentRenewService._tokenExpiring: Silent token renewal successful");
        }, function (err) {
            _Log.Log.error("SilentRenewService._tokenExpiring: Error from signinSilent:", err.message);
            _this._userManager.events._raiseSilentRenewError(err);
        });
    };

    return SilentRenewService;
}();

/***/ }),

/***/ "./src/State.js":
/*!**********************!*\
  !*** ./src/State.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.State = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _random = __webpack_require__(/*! ./random.js */ "./src/random.js");

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = exports.State = function () {
    function State() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            id = _ref.id,
            data = _ref.data,
            created = _ref.created,
            request_type = _ref.request_type;

        _classCallCheck(this, State);

        this._id = id || (0, _random2.default)();
        this._data = data;

        if (typeof created === 'number' && created > 0) {
            this._created = created;
        } else {
            this._created = parseInt(Date.now() / 1000);
        }
        this._request_type = request_type;
    }

    State.prototype.toStorageString = function toStorageString() {
        _Log.Log.debug("State.toStorageString");
        return JSON.stringify({
            id: this.id,
            data: this.data,
            created: this.created,
            request_type: this.request_type
        });
    };

    State.fromStorageString = function fromStorageString(storageString) {
        _Log.Log.debug("State.fromStorageString");
        return new State(JSON.parse(storageString));
    };

    State.clearStaleState = function clearStaleState(storage, age) {

        var cutoff = Date.now() / 1000 - age;

        return storage.getAllKeys().then(function (keys) {
            _Log.Log.debug("State.clearStaleState: got keys", keys);

            var promises = [];

            var _loop = function _loop(i) {
                var key = keys[i];
                p = storage.get(key).then(function (item) {
                    var remove = false;

                    if (item) {
                        try {
                            var state = State.fromStorageString(item);

                            _Log.Log.debug("State.clearStaleState: got item from key: ", key, state.created);

                            if (state.created <= cutoff) {
                                remove = true;
                            }
                        } catch (e) {
                            _Log.Log.error("State.clearStaleState: Error parsing state for key", key, e.message);
                            remove = true;
                        }
                    } else {
                        _Log.Log.debug("State.clearStaleState: no item in storage for key: ", key);
                        remove = true;
                    }

                    if (remove) {
                        _Log.Log.debug("State.clearStaleState: removed item for key: ", key);
                        return storage.remove(key);
                    }
                });


                promises.push(p);
            };

            for (var i = 0; i < keys.length; i++) {
                var p;

                _loop(i);
            }

            _Log.Log.debug("State.clearStaleState: waiting on promise count:", promises.length);
            return Promise.all(promises);
        });
    };

    _createClass(State, [{
        key: 'id',
        get: function get() {
            return this._id;
        }
    }, {
        key: 'data',
        get: function get() {
            return this._data;
        }
    }, {
        key: 'created',
        get: function get() {
            return this._created;
        }
    }, {
        key: 'request_type',
        get: function get() {
            return this._request_type;
        }
    }]);

    return State;
}();

/***/ }),

/***/ "./src/Timer.js":
/*!**********************!*\
  !*** ./src/Timer.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Timer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _Global = __webpack_require__(/*! ./Global.js */ "./src/Global.js");

var _Event2 = __webpack_require__(/*! ./Event.js */ "./src/Event.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var TimerDuration = 5; // seconds

var Timer = exports.Timer = function (_Event) {
    _inherits(Timer, _Event);

    function Timer(name) {
        var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Global.Global.timer;
        var nowFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        _classCallCheck(this, Timer);

        var _this = _possibleConstructorReturn(this, _Event.call(this, name));

        _this._timer = timer;

        if (nowFunc) {
            _this._nowFunc = nowFunc;
        } else {
            _this._nowFunc = function () {
                return Date.now() / 1000;
            };
        }
        return _this;
    }

    Timer.prototype.init = function init(duration) {
        if (duration <= 0) {
            duration = 1;
        }
        duration = parseInt(duration);

        var expiration = this.now + duration;
        if (this.expiration === expiration && this._timerHandle) {
            // no need to reinitialize to same expiration, so bail out
            _Log.Log.debug("Timer.init timer " + this._name + " skipping initialization since already initialized for expiration:", this.expiration);
            return;
        }

        this.cancel();

        _Log.Log.debug("Timer.init timer " + this._name + " for duration:", duration);
        this._expiration = expiration;

        // we're using a fairly short timer and then checking the expiration in the
        // callback to handle scenarios where the browser device sleeps, and then
        // the timers end up getting delayed.
        var timerDuration = TimerDuration;
        if (duration < timerDuration) {
            timerDuration = duration;
        }
        this._timerHandle = this._timer.setInterval(this._callback.bind(this), timerDuration * 1000);
    };

    Timer.prototype.cancel = function cancel() {
        if (this._timerHandle) {
            _Log.Log.debug("Timer.cancel: ", this._name);
            this._timer.clearInterval(this._timerHandle);
            this._timerHandle = null;
        }
    };

    Timer.prototype._callback = function _callback() {
        var diff = this._expiration - this.now;
        _Log.Log.debug("Timer.callback; " + this._name + " timer expires in:", diff);

        if (this._expiration <= this.now) {
            this.cancel();
            _Event.prototype.raise.call(this);
        }
    };

    _createClass(Timer, [{
        key: 'now',
        get: function get() {
            return parseInt(this._nowFunc());
        }
    }, {
        key: 'expiration',
        get: function get() {
            return this._expiration;
        }
    }]);

    return Timer;
}(_Event2.Event);

/***/ }),

/***/ "./src/TokenClient.js":
/*!****************************!*\
  !*** ./src/TokenClient.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TokenClient = undefined;

var _JsonService = __webpack_require__(/*! ./JsonService.js */ "./src/JsonService.js");

var _MetadataService = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var TokenClient = exports.TokenClient = function () {
    function TokenClient(settings) {
        var JsonServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _JsonService.JsonService;
        var MetadataServiceCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MetadataService.MetadataService;

        _classCallCheck(this, TokenClient);

        if (!settings) {
            _Log.Log.error("TokenClient.ctor: No settings passed");
            throw new Error("settings");
        }

        this._settings = settings;
        this._jsonService = new JsonServiceCtor();
        this._metadataService = new MetadataServiceCtor(this._settings);
    }

    TokenClient.prototype.exchangeCode = function exchangeCode() {
        var _this = this;

        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        args = Object.assign({}, args);

        args.grant_type = args.grant_type || "authorization_code";
        args.client_id = args.client_id || this._settings.client_id;
        args.client_secret = args.client_secret || this._settings.client_secret;
        args.redirect_uri = args.redirect_uri || this._settings.redirect_uri;

        var basicAuth = undefined;
        var client_authentication = args._client_authentication || this._settings._client_authentication;
        delete args._client_authentication;

        if (!args.code) {
            _Log.Log.error("TokenClient.exchangeCode: No code passed");
            return Promise.reject(new Error("A code is required"));
        }
        if (!args.redirect_uri) {
            _Log.Log.error("TokenClient.exchangeCode: No redirect_uri passed");
            return Promise.reject(new Error("A redirect_uri is required"));
        }
        if (!args.code_verifier) {
            _Log.Log.error("TokenClient.exchangeCode: No code_verifier passed");
            return Promise.reject(new Error("A code_verifier is required"));
        }
        if (!args.client_id) {
            _Log.Log.error("TokenClient.exchangeCode: No client_id passed");
            return Promise.reject(new Error("A client_id is required"));
        }
        if (!args.client_secret && client_authentication == "client_secret_basic") {
            _Log.Log.error("TokenClient.exchangeCode: No client_secret passed");
            return Promise.reject(new Error("A client_secret is required"));
        }

        // Sending the client credentials using the Basic Auth method
        if (client_authentication == "client_secret_basic") {
            basicAuth = args.client_id + ':' + args.client_secret;
            delete args.client_id;
            delete args.client_secret;
        }

        return this._metadataService.getTokenEndpoint(false).then(function (url) {
            _Log.Log.debug("TokenClient.exchangeCode: Received token endpoint");
            return _this._jsonService.postForm(url, args, basicAuth).then(function (response) {
                _Log.Log.debug("TokenClient.exchangeCode: response received");
                return response;
            });
        });
    };

    TokenClient.prototype.exchangeRefreshToken = function exchangeRefreshToken() {
        var _this2 = this;

        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        args = Object.assign({}, args);

        args.grant_type = args.grant_type || "refresh_token";
        args.client_id = args.client_id || this._settings.client_id;
        args.client_secret = args.client_secret || this._settings.client_secret;

        var basicAuth = undefined;
        var client_authentication = args._client_authentication || this._settings._client_authentication;
        delete args._client_authentication;

        if (!args.refresh_token) {
            _Log.Log.error("TokenClient.exchangeRefreshToken: No refresh_token passed");
            return Promise.reject(new Error("A refresh_token is required"));
        }
        if (!args.client_id) {
            _Log.Log.error("TokenClient.exchangeRefreshToken: No client_id passed");
            return Promise.reject(new Error("A client_id is required"));
        }

        // Sending the client credentials using the Basic Auth method
        if (client_authentication == "client_secret_basic") {
            basicAuth = args.client_id + ':' + args.client_secret;
            delete args.client_id;
            delete args.client_secret;
        }

        return this._metadataService.getTokenEndpoint(false).then(function (url) {
            _Log.Log.debug("TokenClient.exchangeRefreshToken: Received token endpoint");

            return _this2._jsonService.postForm(url, args, basicAuth).then(function (response) {
                _Log.Log.debug("TokenClient.exchangeRefreshToken: response received");
                return response;
            });
        });
    };

    return TokenClient;
}();

/***/ }),

/***/ "./src/TokenRevocationClient.js":
/*!**************************************!*\
  !*** ./src/TokenRevocationClient.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TokenRevocationClient = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _MetadataService = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");

var _Global = __webpack_require__(/*! ./Global.js */ "./src/Global.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var AccessTokenTypeHint = "access_token";
var RefreshTokenTypeHint = "refresh_token";

var TokenRevocationClient = exports.TokenRevocationClient = function () {
    function TokenRevocationClient(settings) {
        var XMLHttpRequestCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Global.Global.XMLHttpRequest;
        var MetadataServiceCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MetadataService.MetadataService;

        _classCallCheck(this, TokenRevocationClient);

        if (!settings) {
            _Log.Log.error("TokenRevocationClient.ctor: No settings provided");
            throw new Error("No settings provided.");
        }

        this._settings = settings;
        this._XMLHttpRequestCtor = XMLHttpRequestCtor;
        this._metadataService = new MetadataServiceCtor(this._settings);
    }

    TokenRevocationClient.prototype.revoke = function revoke(token, required) {
        var _this = this;

        var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "access_token";

        if (!token) {
            _Log.Log.error("TokenRevocationClient.revoke: No token provided");
            throw new Error("No token provided.");
        }

        if (type !== AccessTokenTypeHint && type != RefreshTokenTypeHint) {
            _Log.Log.error("TokenRevocationClient.revoke: Invalid token type");
            throw new Error("Invalid token type.");
        }

        return this._metadataService.getRevocationEndpoint().then(function (url) {
            if (!url) {
                if (required) {
                    _Log.Log.error("TokenRevocationClient.revoke: Revocation not supported");
                    throw new Error("Revocation not supported");
                }

                // not required, so don't error and just return
                return;
            }

            _Log.Log.debug("TokenRevocationClient.revoke: Revoking " + type);
            var client_id = _this._settings.client_id;
            var client_secret = _this._settings.client_secret;
            return _this._revoke(url, client_id, client_secret, token, type);
        });
    };

    TokenRevocationClient.prototype._revoke = function _revoke(url, client_id, client_secret, token, type) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {

            var xhr = new _this2._XMLHttpRequestCtor();
            xhr.open("POST", url);

            xhr.onload = function () {
                _Log.Log.debug("TokenRevocationClient.revoke: HTTP response received, status", xhr.status);

                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(Error(xhr.statusText + " (" + xhr.status + ")"));
                }
            };
            xhr.onerror = function () {
                _Log.Log.debug("TokenRevocationClient.revoke: Network Error.");
                reject("Network Error");
            };

            var body = "client_id=" + encodeURIComponent(client_id);
            if (client_secret) {
                body += "&client_secret=" + encodeURIComponent(client_secret);
            }
            body += "&token_type_hint=" + encodeURIComponent(type);
            body += "&token=" + encodeURIComponent(token);

            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(body);
        });
    };

    return TokenRevocationClient;
}();

/***/ }),

/***/ "./src/UrlUtility.js":
/*!***************************!*\
  !*** ./src/UrlUtility.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UrlUtility = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _Global = __webpack_require__(/*! ./Global.js */ "./src/Global.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var UrlUtility = exports.UrlUtility = function () {
    function UrlUtility() {
        _classCallCheck(this, UrlUtility);
    }

    UrlUtility.addQueryParam = function addQueryParam(url, name, value) {
        if (url.indexOf('?') < 0) {
            url += "?";
        }

        if (url[url.length - 1] !== "?") {
            url += "&";
        }

        url += encodeURIComponent(name);
        url += "=";
        url += encodeURIComponent(value);

        return url;
    };

    UrlUtility.parseUrlFragment = function parseUrlFragment(value) {
        var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#";
        var global = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Global.Global;

        if (typeof value !== 'string') {
            value = global.location.href;
        }

        var idx = value.lastIndexOf(delimiter);
        if (idx >= 0) {
            value = value.substr(idx + 1);
        }

        if (delimiter === "?") {
            // if we're doing query, then strip off hash fragment before we parse
            idx = value.indexOf('#');
            if (idx >= 0) {
                value = value.substr(0, idx);
            }
        }

        var params = {},
            regex = /([^&=]+)=([^&]*)/g,
            m;

        var counter = 0;
        while (m = regex.exec(value)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2].replace(/\+/g, ' '));
            if (counter++ > 50) {
                _Log.Log.error("UrlUtility.parseUrlFragment: response exceeded expected number of parameters", value);
                return {
                    error: "Response exceeded expected number of parameters"
                };
            }
        }

        for (var prop in params) {
            return params;
        }

        return {};
    };

    return UrlUtility;
}();

/***/ }),

/***/ "./src/User.js":
/*!*********************!*\
  !*** ./src/User.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = exports.User = function () {
    function User(_ref) {
        var id_token = _ref.id_token,
            session_state = _ref.session_state,
            access_token = _ref.access_token,
            refresh_token = _ref.refresh_token,
            token_type = _ref.token_type,
            scope = _ref.scope,
            profile = _ref.profile,
            expires_at = _ref.expires_at,
            state = _ref.state;

        _classCallCheck(this, User);

        this.id_token = id_token;
        this.session_state = session_state;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.token_type = token_type;
        this.scope = scope;
        this.profile = profile;
        this.expires_at = expires_at;
        this.state = state;
    }

    User.prototype.toStorageString = function toStorageString() {
        _Log.Log.debug("User.toStorageString");
        return JSON.stringify({
            id_token: this.id_token,
            session_state: this.session_state,
            access_token: this.access_token,
            refresh_token: this.refresh_token,
            token_type: this.token_type,
            scope: this.scope,
            profile: this.profile,
            expires_at: this.expires_at
        });
    };

    User.fromStorageString = function fromStorageString(storageString) {
        _Log.Log.debug("User.fromStorageString");
        return new User(JSON.parse(storageString));
    };

    _createClass(User, [{
        key: 'expires_in',
        get: function get() {
            if (this.expires_at) {
                var now = parseInt(Date.now() / 1000);
                return this.expires_at - now;
            }
            return undefined;
        },
        set: function set(value) {
            var expires_in = parseInt(value);
            if (typeof expires_in === 'number' && expires_in > 0) {
                var now = parseInt(Date.now() / 1000);
                this.expires_at = now + expires_in;
            }
        }
    }, {
        key: 'expired',
        get: function get() {
            var expires_in = this.expires_in;
            if (expires_in !== undefined) {
                return expires_in <= 0;
            }
            return undefined;
        }
    }, {
        key: 'scopes',
        get: function get() {
            return (this.scope || "").split(" ");
        }
    }]);

    return User;
}();

/***/ }),

/***/ "./src/UserInfoService.js":
/*!********************************!*\
  !*** ./src/UserInfoService.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserInfoService = undefined;

var _JsonService = __webpack_require__(/*! ./JsonService.js */ "./src/JsonService.js");

var _MetadataService = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _JoseUtil = __webpack_require__(/*! ./JoseUtil.js */ "./src/JoseUtil.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var UserInfoService = exports.UserInfoService = function () {
    function UserInfoService(settings) {
        var JsonServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _JsonService.JsonService;
        var MetadataServiceCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MetadataService.MetadataService;
        var joseUtil = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _JoseUtil.JoseUtil;

        _classCallCheck(this, UserInfoService);

        if (!settings) {
            _Log.Log.error("UserInfoService.ctor: No settings passed");
            throw new Error("settings");
        }

        this._settings = settings;
        this._jsonService = new JsonServiceCtor(undefined, undefined, this._getClaimsFromJwt.bind(this));
        this._metadataService = new MetadataServiceCtor(this._settings);
        this._joseUtil = joseUtil;
    }

    UserInfoService.prototype.getClaims = function getClaims(token) {
        var _this = this;

        if (!token) {
            _Log.Log.error("UserInfoService.getClaims: No token passed");
            return Promise.reject(new Error("A token is required"));
        }

        return this._metadataService.getUserInfoEndpoint().then(function (url) {
            _Log.Log.debug("UserInfoService.getClaims: received userinfo url", url);

            return _this._jsonService.getJson(url, token).then(function (claims) {
                _Log.Log.debug("UserInfoService.getClaims: claims received", claims);
                return claims;
            });
        });
    };

    UserInfoService.prototype._getClaimsFromJwt = function _getClaimsFromJwt(req) {
        var _this2 = this;

        try {
            var jwt = this._joseUtil.parseJwt(req.responseText);
            if (!jwt || !jwt.header || !jwt.payload) {
                _Log.Log.error("UserInfoService._getClaimsFromJwt: Failed to parse JWT", jwt);
                return Promise.reject(new Error("Failed to parse id_token"));
            }

            var kid = jwt.header.kid;

            var issuerPromise = void 0;
            switch (this._settings.userInfoJwtIssuer) {
                case 'OP':
                    issuerPromise = this._metadataService.getIssuer();
                    break;
                case 'ANY':
                    issuerPromise = Promise.resolve(jwt.payload.iss);
                    break;
                default:
                    issuerPromise = Promise.resolve(this._settings.userInfoJwtIssuer);
                    break;
            }

            return issuerPromise.then(function (issuer) {
                _Log.Log.debug("UserInfoService._getClaimsFromJwt: Received issuer:" + issuer);

                return _this2._metadataService.getSigningKeys().then(function (keys) {
                    if (!keys) {
                        _Log.Log.error("UserInfoService._getClaimsFromJwt: No signing keys from metadata");
                        return Promise.reject(new Error("No signing keys from metadata"));
                    }

                    _Log.Log.debug("UserInfoService._getClaimsFromJwt: Received signing keys");
                    var key = void 0;
                    if (!kid) {
                        keys = _this2._filterByAlg(keys, jwt.header.alg);

                        if (keys.length > 1) {
                            _Log.Log.error("UserInfoService._getClaimsFromJwt: No kid found in id_token and more than one key found in metadata");
                            return Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));
                        } else {
                            // kid is mandatory only when there are multiple keys in the referenced JWK Set document
                            // see http://openid.net/specs/openid-connect-core-1_0.html#Signing
                            key = keys[0];
                        }
                    } else {
                        key = keys.filter(function (key) {
                            return key.kid === kid;
                        })[0];
                    }

                    if (!key) {
                        _Log.Log.error("UserInfoService._getClaimsFromJwt: No key matching kid or alg found in signing keys");
                        return Promise.reject(new Error("No key matching kid or alg found in signing keys"));
                    }

                    var audience = _this2._settings.client_id;

                    var clockSkewInSeconds = _this2._settings.clockSkew;
                    _Log.Log.debug("UserInfoService._getClaimsFromJwt: Validaing JWT; using clock skew (in seconds) of: ", clockSkewInSeconds);

                    return _this2._joseUtil.validateJwt(req.responseText, key, issuer, audience, clockSkewInSeconds, undefined, true).then(function () {
                        _Log.Log.debug("UserInfoService._getClaimsFromJwt: JWT validation successful");
                        return jwt.payload;
                    });
                });
            });
            return;
        } catch (e) {
            _Log.Log.error("UserInfoService._getClaimsFromJwt: Error parsing JWT response", e.message);
            reject(e);
            return;
        }
    };

    UserInfoService.prototype._filterByAlg = function _filterByAlg(keys, alg) {
        var kty = null;
        if (alg.startsWith("RS")) {
            kty = "RSA";
        } else if (alg.startsWith("PS")) {
            kty = "PS";
        } else if (alg.startsWith("ES")) {
            kty = "EC";
        } else {
            _Log.Log.debug("UserInfoService._filterByAlg: alg not supported: ", alg);
            return [];
        }

        _Log.Log.debug("UserInfoService._filterByAlg: Looking for keys that match kty: ", kty);

        keys = keys.filter(function (key) {
            return key.kty === kty;
        });

        _Log.Log.debug("UserInfoService._filterByAlg: Number of keys that match kty: ", kty, keys.length);

        return keys;
    };

    return UserInfoService;
}();

/***/ }),

/***/ "./src/UserManager.js":
/*!****************************!*\
  !*** ./src/UserManager.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _OidcClient2 = __webpack_require__(/*! ./OidcClient.js */ "./src/OidcClient.js");

var _UserManagerSettings = __webpack_require__(/*! ./UserManagerSettings.js */ "./src/UserManagerSettings.js");

var _User = __webpack_require__(/*! ./User.js */ "./src/User.js");

var _UserManagerEvents = __webpack_require__(/*! ./UserManagerEvents.js */ "./src/UserManagerEvents.js");

var _SilentRenewService = __webpack_require__(/*! ./SilentRenewService.js */ "./src/SilentRenewService.js");

var _SessionMonitor = __webpack_require__(/*! ./SessionMonitor.js */ "./src/SessionMonitor.js");

var _SigninRequest = __webpack_require__(/*! ./SigninRequest */ "./src/SigninRequest.js");

var _TokenRevocationClient = __webpack_require__(/*! ./TokenRevocationClient.js */ "./src/TokenRevocationClient.js");

var _TokenClient = __webpack_require__(/*! ./TokenClient.js */ "./src/TokenClient.js");

var _JoseUtil = __webpack_require__(/*! ./JoseUtil.js */ "./src/JoseUtil.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var UserManager = exports.UserManager = function (_OidcClient) {
    _inherits(UserManager, _OidcClient);

    function UserManager() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var SilentRenewServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _SilentRenewService.SilentRenewService;
        var SessionMonitorCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _SessionMonitor.SessionMonitor;
        var TokenRevocationClientCtor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _TokenRevocationClient.TokenRevocationClient;
        var TokenClientCtor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _TokenClient.TokenClient;
        var joseUtil = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _JoseUtil.JoseUtil;

        _classCallCheck(this, UserManager);

        if (!(settings instanceof _UserManagerSettings.UserManagerSettings)) {
            settings = new _UserManagerSettings.UserManagerSettings(settings);
        }

        var _this = _possibleConstructorReturn(this, _OidcClient.call(this, settings));

        _this._events = new _UserManagerEvents.UserManagerEvents(settings);
        _this._silentRenewService = new SilentRenewServiceCtor(_this);

        // order is important for the following properties; these services depend upon the events.
        if (_this.settings.automaticSilentRenew) {
            _Log.Log.debug("UserManager.ctor: automaticSilentRenew is configured, setting up silent renew");
            _this.startSilentRenew();
        }

        if (_this.settings.monitorSession) {
            _Log.Log.debug("UserManager.ctor: monitorSession is configured, setting up session monitor");
            _this._sessionMonitor = new SessionMonitorCtor(_this);
        }

        _this._tokenRevocationClient = new TokenRevocationClientCtor(_this._settings);
        _this._tokenClient = new TokenClientCtor(_this._settings);
        _this._joseUtil = joseUtil;
        return _this;
    }

    UserManager.prototype.getUser = function getUser() {
        var _this2 = this;

        return this._loadUser().then(function (user) {
            if (user) {
                _Log.Log.info("UserManager.getUser: user loaded");

                _this2._events.load(user, false);

                return user;
            } else {
                _Log.Log.info("UserManager.getUser: user not found in storage");
                return null;
            }
        });
    };

    UserManager.prototype.removeUser = function removeUser() {
        var _this3 = this;

        return this.storeUser(null).then(function () {
            _Log.Log.info("UserManager.removeUser: user removed from storage");
            _this3._events.unload();
        });
    };

    UserManager.prototype.signinRedirect = function signinRedirect() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        args = Object.assign({}, args);

        args.request_type = "si:r";
        var navParams = {
            useReplaceToNavigate: args.useReplaceToNavigate
        };
        return this._signinStart(args, this._redirectNavigator, navParams).then(function () {
            _Log.Log.info("UserManager.signinRedirect: successful");
        });
    };

    UserManager.prototype.signinRedirectCallback = function signinRedirectCallback(url) {
        return this._signinEnd(url || this._redirectNavigator.url).then(function (user) {
            if (user.profile && user.profile.sub) {
                _Log.Log.info("UserManager.signinRedirectCallback: successful, signed in sub: ", user.profile.sub);
            } else {
                _Log.Log.info("UserManager.signinRedirectCallback: no sub");
            }

            return user;
        });
    };

    UserManager.prototype.signinPopup = function signinPopup() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        args = Object.assign({}, args);

        args.request_type = "si:p";
        var url = args.redirect_uri || this.settings.popup_redirect_uri || this.settings.redirect_uri;
        if (!url) {
            _Log.Log.error("UserManager.signinPopup: No popup_redirect_uri or redirect_uri configured");
            return Promise.reject(new Error("No popup_redirect_uri or redirect_uri configured"));
        }

        args.redirect_uri = url;
        args.display = "popup";

        return this._signin(args, this._popupNavigator, {
            startUrl: url,
            popupWindowFeatures: args.popupWindowFeatures || this.settings.popupWindowFeatures,
            popupWindowTarget: args.popupWindowTarget || this.settings.popupWindowTarget
        }).then(function (user) {
            if (user) {
                if (user.profile && user.profile.sub) {
                    _Log.Log.info("UserManager.signinPopup: signinPopup successful, signed in sub: ", user.profile.sub);
                } else {
                    _Log.Log.info("UserManager.signinPopup: no sub");
                }
            }

            return user;
        });
    };

    UserManager.prototype.signinPopupCallback = function signinPopupCallback(url) {
        return this._signinCallback(url, this._popupNavigator).then(function (user) {
            if (user) {
                if (user.profile && user.profile.sub) {
                    _Log.Log.info("UserManager.signinPopupCallback: successful, signed in sub: ", user.profile.sub);
                } else {
                    _Log.Log.info("UserManager.signinPopupCallback: no sub");
                }
            }

            return user;
        }).catch(function (err) {
            _Log.Log.error( true && err.message);
        });
    };

    UserManager.prototype.signinSilent = function signinSilent() {
        var _this4 = this;

        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        args = Object.assign({}, args);

        // first determine if we have a refresh token, or need to use iframe
        return this._loadUser().then(function (user) {
            if (user && user.refresh_token) {
                args.refresh_token = user.refresh_token;
                return _this4._useRefreshToken(args);
            } else {
                args.request_type = "si:s";
                args.id_token_hint = args.id_token_hint || _this4.settings.includeIdTokenInSilentRenew && user && user.id_token;
                if (user && _this4._settings.validateSubOnSilentRenew) {
                    _Log.Log.debug("UserManager.signinSilent, subject prior to silent renew: ", user.profile.sub);
                    args.current_sub = user.profile.sub;
                }
                return _this4._signinSilentIframe(args);
            }
        });
    };

    UserManager.prototype._useRefreshToken = function _useRefreshToken() {
        var _this5 = this;

        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return this._tokenClient.exchangeRefreshToken(args).then(function (result) {
            if (!result) {
                _Log.Log.error("UserManager._useRefreshToken: No response returned from token endpoint");
                return Promise.reject("No response returned from token endpoint");
            }
            if (!result.access_token) {
                _Log.Log.error("UserManager._useRefreshToken: No access token returned from token endpoint");
                return Promise.reject("No access token returned from token endpoint");
            }

            return _this5._loadUser().then(function (user) {
                if (user) {
                    var idTokenValidation = Promise.resolve();
                    if (result.id_token) {
                        idTokenValidation = _this5._validateIdTokenFromTokenRefreshToken(user.profile, result.id_token);
                    }

                    return idTokenValidation.then(function () {
                        _Log.Log.debug("UserManager._useRefreshToken: refresh token response success");
                        user.id_token = result.id_token || user.id_token;
                        user.access_token = result.access_token;
                        user.refresh_token = result.refresh_token || user.refresh_token;
                        user.expires_in = result.expires_in;

                        return _this5.storeUser(user).then(function () {
                            _this5._events.load(user);
                            return user;
                        });
                    });
                } else {
                    return null;
                }
            });
        });
    };

    UserManager.prototype._validateIdTokenFromTokenRefreshToken = function _validateIdTokenFromTokenRefreshToken(profile, id_token) {
        var _this6 = this;

        return this._metadataService.getIssuer().then(function (issuer) {
            return _this6.settings.getEpochTime().then(function (now) {
                return _this6._joseUtil.validateJwtAttributes(id_token, issuer, _this6._settings.client_id, _this6._settings.clockSkew, now).then(function (payload) {
                    if (!payload) {
                        _Log.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: Failed to validate id_token");
                        return Promise.reject(new Error("Failed to validate id_token"));
                    }
                    if (payload.sub !== profile.sub) {
                        _Log.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: sub in id_token does not match current sub");
                        return Promise.reject(new Error("sub in id_token does not match current sub"));
                    }
                    if (payload.auth_time && payload.auth_time !== profile.auth_time) {
                        _Log.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: auth_time in id_token does not match original auth_time");
                        return Promise.reject(new Error("auth_time in id_token does not match original auth_time"));
                    }
                    if (payload.azp && payload.azp !== profile.azp) {
                        _Log.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp in id_token does not match original azp");
                        return Promise.reject(new Error("azp in id_token does not match original azp"));
                    }
                    if (!payload.azp && profile.azp) {
                        _Log.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp not in id_token, but present in original id_token");
                        return Promise.reject(new Error("azp not in id_token, but present in original id_token"));
                    }
                });
            });
        });
    };

    UserManager.prototype._signinSilentIframe = function _signinSilentIframe() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var url = args.redirect_uri || this.settings.silent_redirect_uri || this.settings.redirect_uri;
        if (!url) {
            _Log.Log.error("UserManager.signinSilent: No silent_redirect_uri configured");
            return Promise.reject(new Error("No silent_redirect_uri configured"));
        }

        args.redirect_uri = url;
        args.prompt = args.prompt || "none";

        return this._signin(args, this._iframeNavigator, {
            startUrl: url,
            silentRequestTimeout: args.silentRequestTimeout || this.settings.silentRequestTimeout
        }).then(function (user) {
            if (user) {
                if (user.profile && user.profile.sub) {
                    _Log.Log.info("UserManager.signinSilent: successful, signed in sub: ", user.profile.sub);
                } else {
                    _Log.Log.info("UserManager.signinSilent: no sub");
                }
            }

            return user;
        });
    };

    UserManager.prototype.signinSilentCallback = function signinSilentCallback(url) {
        return this._signinCallback(url, this._iframeNavigator).then(function (user) {
            if (user) {
                if (user.profile && user.profile.sub) {
                    _Log.Log.info("UserManager.signinSilentCallback: successful, signed in sub: ", user.profile.sub);
                } else {
                    _Log.Log.info("UserManager.signinSilentCallback: no sub");
                }
            }

            return user;
        });
    };

    UserManager.prototype.signinCallback = function signinCallback(url) {
        var _this7 = this;

        return this.readSigninResponseState(url).then(function (_ref) {
            var state = _ref.state,
                response = _ref.response;

            if (state.request_type === "si:r") {
                return _this7.signinRedirectCallback(url);
            }
            if (state.request_type === "si:p") {
                return _this7.signinPopupCallback(url);
            }
            if (state.request_type === "si:s") {
                return _this7.signinSilentCallback(url);
            }
            return Promise.reject(new Error("invalid response_type in state"));
        });
    };

    UserManager.prototype.signoutCallback = function signoutCallback(url, keepOpen) {
        var _this8 = this;

        return this.readSignoutResponseState(url).then(function (_ref2) {
            var state = _ref2.state,
                response = _ref2.response;

            if (state) {
                if (state.request_type === "so:r") {
                    return _this8.signoutRedirectCallback(url);
                }
                if (state.request_type === "so:p") {
                    return _this8.signoutPopupCallback(url, keepOpen);
                }
                return Promise.reject(new Error("invalid response_type in state"));
            }
            return response;
        });
    };

    UserManager.prototype.querySessionStatus = function querySessionStatus() {
        var _this9 = this;

        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        args = Object.assign({}, args);

        args.request_type = "si:s"; // this acts like a signin silent
        var url = args.redirect_uri || this.settings.silent_redirect_uri || this.settings.redirect_uri;
        if (!url) {
            _Log.Log.error("UserManager.querySessionStatus: No silent_redirect_uri configured");
            return Promise.reject(new Error("No silent_redirect_uri configured"));
        }

        args.redirect_uri = url;
        args.prompt = "none";
        args.response_type = args.response_type || this.settings.query_status_response_type;
        args.scope = args.scope || "openid";
        args.skipUserInfo = true;

        return this._signinStart(args, this._iframeNavigator, {
            startUrl: url,
            silentRequestTimeout: args.silentRequestTimeout || this.settings.silentRequestTimeout
        }).then(function (navResponse) {
            return _this9.processSigninResponse(navResponse.url).then(function (signinResponse) {
                _Log.Log.debug("UserManager.querySessionStatus: got signin response");

                if (signinResponse.session_state && signinResponse.profile.sub) {
                    _Log.Log.info("UserManager.querySessionStatus: querySessionStatus success for sub: ", signinResponse.profile.sub);
                    return {
                        session_state: signinResponse.session_state,
                        sub: signinResponse.profile.sub,
                        sid: signinResponse.profile.sid
                    };
                } else {
                    _Log.Log.info("querySessionStatus successful, user not authenticated");
                }
            }).catch(function (err) {
                if (err.session_state && _this9.settings.monitorAnonymousSession) {
                    if (err.message == "login_required" || err.message == "consent_required" || err.message == "interaction_required" || err.message == "account_selection_required") {
                        _Log.Log.info("UserManager.querySessionStatus: querySessionStatus success for anonymous user");
                        return {
                            session_state: err.session_state
                        };
                    }
                }

                throw err;
            });
        });
    };

    UserManager.prototype._signin = function _signin(args, navigator) {
        var _this10 = this;

        var navigatorParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this._signinStart(args, navigator, navigatorParams).then(function (navResponse) {
            return _this10._signinEnd(navResponse.url, args);
        });
    };

    UserManager.prototype._signinStart = function _signinStart(args, navigator) {
        var _this11 = this;

        var navigatorParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


        return navigator.prepare(navigatorParams).then(function (handle) {
            _Log.Log.debug("UserManager._signinStart: got navigator window handle");

            return _this11.createSigninRequest(args).then(function (signinRequest) {
                _Log.Log.debug("UserManager._signinStart: got signin request");

                navigatorParams.url = signinRequest.url;
                navigatorParams.id = signinRequest.state.id;

                return handle.navigate(navigatorParams);
            }).catch(function (err) {
                if (handle.close) {
                    _Log.Log.debug("UserManager._signinStart: Error after preparing navigator, closing navigator window");
                    handle.close();
                }
                throw err;
            });
        });
    };

    UserManager.prototype._signinEnd = function _signinEnd(url) {
        var _this12 = this;

        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this.processSigninResponse(url).then(function (signinResponse) {
            _Log.Log.debug("UserManager._signinEnd: got signin response");

            var user = new _User.User(signinResponse);

            if (args.current_sub) {
                if (args.current_sub !== user.profile.sub) {
                    _Log.Log.debug("UserManager._signinEnd: current user does not match user returned from signin. sub from signin: ", user.profile.sub);
                    return Promise.reject(new Error("login_required"));
                } else {
                    _Log.Log.debug("UserManager._signinEnd: current user matches user returned from signin");
                }
            }

            return _this12.storeUser(user).then(function () {
                _Log.Log.debug("UserManager._signinEnd: user stored");

                _this12._events.load(user);

                return user;
            });
        });
    };

    UserManager.prototype._signinCallback = function _signinCallback(url, navigator) {
        _Log.Log.debug("UserManager._signinCallback");
        var useQuery = this._settings.response_mode === "query" || !this._settings.response_mode && _SigninRequest.SigninRequest.isCode(this._settings.response_type);
        var delimiter = useQuery ? "?" : "#";
        return navigator.callback(url, undefined, delimiter);
    };

    UserManager.prototype.signoutRedirect = function signoutRedirect() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        args = Object.assign({}, args);

        args.request_type = "so:r";
        var postLogoutRedirectUri = args.post_logout_redirect_uri || this.settings.post_logout_redirect_uri;
        if (postLogoutRedirectUri) {
            args.post_logout_redirect_uri = postLogoutRedirectUri;
        }
        var navParams = {
            useReplaceToNavigate: args.useReplaceToNavigate
        };
        return this._signoutStart(args, this._redirectNavigator, navParams).then(function () {
            _Log.Log.info("UserManager.signoutRedirect: successful");
        });
    };

    UserManager.prototype.signoutRedirectCallback = function signoutRedirectCallback(url) {
        return this._signoutEnd(url || this._redirectNavigator.url).then(function (response) {
            _Log.Log.info("UserManager.signoutRedirectCallback: successful");
            return response;
        });
    };

    UserManager.prototype.signoutPopup = function signoutPopup() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        args = Object.assign({}, args);

        args.request_type = "so:p";
        var url = args.post_logout_redirect_uri || this.settings.popup_post_logout_redirect_uri || this.settings.post_logout_redirect_uri;
        args.post_logout_redirect_uri = url;
        args.display = "popup";
        if (args.post_logout_redirect_uri) {
            // we're putting a dummy entry in here because we
            // need a unique id from the state for notification
            // to the parent window, which is necessary if we
            // plan to return back to the client after signout
            // and so we can close the popup after signout
            args.state = args.state || {};
        }

        return this._signout(args, this._popupNavigator, {
            startUrl: url,
            popupWindowFeatures: args.popupWindowFeatures || this.settings.popupWindowFeatures,
            popupWindowTarget: args.popupWindowTarget || this.settings.popupWindowTarget
        }).then(function () {
            _Log.Log.info("UserManager.signoutPopup: successful");
        });
    };

    UserManager.prototype.signoutPopupCallback = function signoutPopupCallback(url, keepOpen) {
        if (typeof keepOpen === 'undefined' && typeof url === 'boolean') {
            keepOpen = url;
            url = null;
        }

        var delimiter = '?';
        return this._popupNavigator.callback(url, keepOpen, delimiter).then(function () {
            _Log.Log.info("UserManager.signoutPopupCallback: successful");
        });
    };

    UserManager.prototype._signout = function _signout(args, navigator) {
        var _this13 = this;

        var navigatorParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return this._signoutStart(args, navigator, navigatorParams).then(function (navResponse) {
            return _this13._signoutEnd(navResponse.url);
        });
    };

    UserManager.prototype._signoutStart = function _signoutStart() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _this14 = this;

        var navigator = arguments[1];
        var navigatorParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return navigator.prepare(navigatorParams).then(function (handle) {
            _Log.Log.debug("UserManager._signoutStart: got navigator window handle");

            return _this14._loadUser().then(function (user) {
                _Log.Log.debug("UserManager._signoutStart: loaded current user from storage");

                var revokePromise = _this14._settings.revokeAccessTokenOnSignout ? _this14._revokeInternal(user) : Promise.resolve();
                return revokePromise.then(function () {

                    var id_token = args.id_token_hint || user && user.id_token;
                    if (id_token) {
                        _Log.Log.debug("UserManager._signoutStart: Setting id_token into signout request");
                        args.id_token_hint = id_token;
                    }

                    return _this14.removeUser().then(function () {
                        _Log.Log.debug("UserManager._signoutStart: user removed, creating signout request");

                        return _this14.createSignoutRequest(args).then(function (signoutRequest) {
                            _Log.Log.debug("UserManager._signoutStart: got signout request");

                            navigatorParams.url = signoutRequest.url;
                            if (signoutRequest.state) {
                                navigatorParams.id = signoutRequest.state.id;
                            }
                            return handle.navigate(navigatorParams);
                        });
                    });
                });
            }).catch(function (err) {
                if (handle.close) {
                    _Log.Log.debug("UserManager._signoutStart: Error after preparing navigator, closing navigator window");
                    handle.close();
                }
                throw err;
            });
        });
    };

    UserManager.prototype._signoutEnd = function _signoutEnd(url) {
        return this.processSignoutResponse(url).then(function (signoutResponse) {
            _Log.Log.debug("UserManager._signoutEnd: got signout response");

            return signoutResponse;
        });
    };

    UserManager.prototype.revokeAccessToken = function revokeAccessToken() {
        var _this15 = this;

        return this._loadUser().then(function (user) {
            return _this15._revokeInternal(user, true).then(function (success) {
                if (success) {
                    _Log.Log.debug("UserManager.revokeAccessToken: removing token properties from user and re-storing");

                    user.access_token = null;
                    user.refresh_token = null;
                    user.expires_at = null;
                    user.token_type = null;

                    return _this15.storeUser(user).then(function () {
                        _Log.Log.debug("UserManager.revokeAccessToken: user stored");
                        _this15._events.load(user);
                    });
                }
            });
        }).then(function () {
            _Log.Log.info("UserManager.revokeAccessToken: access token revoked successfully");
        });
    };

    UserManager.prototype._revokeInternal = function _revokeInternal(user, required) {
        var _this16 = this;

        if (user) {
            var access_token = user.access_token;
            var refresh_token = user.refresh_token;

            return this._revokeAccessTokenInternal(access_token, required).then(function (atSuccess) {
                return _this16._revokeRefreshTokenInternal(refresh_token, required).then(function (rtSuccess) {
                    if (!atSuccess && !rtSuccess) {
                        _Log.Log.debug("UserManager.revokeAccessToken: no need to revoke due to no token(s), or JWT format");
                    }

                    return atSuccess || rtSuccess;
                });
            });
        }

        return Promise.resolve(false);
    };

    UserManager.prototype._revokeAccessTokenInternal = function _revokeAccessTokenInternal(access_token, required) {
        // check for JWT vs. reference token
        if (!access_token || access_token.indexOf('.') >= 0) {
            return Promise.resolve(false);
        }

        return this._tokenRevocationClient.revoke(access_token, required).then(function () {
            return true;
        });
    };

    UserManager.prototype._revokeRefreshTokenInternal = function _revokeRefreshTokenInternal(refresh_token, required) {
        if (!refresh_token) {
            return Promise.resolve(false);
        }

        return this._tokenRevocationClient.revoke(refresh_token, required, "refresh_token").then(function () {
            return true;
        });
    };

    UserManager.prototype.startSilentRenew = function startSilentRenew() {
        this._silentRenewService.start();
    };

    UserManager.prototype.stopSilentRenew = function stopSilentRenew() {
        this._silentRenewService.stop();
    };

    UserManager.prototype._loadUser = function _loadUser() {
        return this._userStore.get(this._userStoreKey).then(function (storageString) {
            if (storageString) {
                _Log.Log.debug("UserManager._loadUser: user storageString loaded");
                return _User.User.fromStorageString(storageString);
            }

            _Log.Log.debug("UserManager._loadUser: no user storageString");
            return null;
        });
    };

    UserManager.prototype.storeUser = function storeUser(user) {
        if (user) {
            _Log.Log.debug("UserManager.storeUser: storing user");

            var storageString = user.toStorageString();
            return this._userStore.set(this._userStoreKey, storageString);
        } else {
            _Log.Log.debug("storeUser.storeUser: removing user");
            return this._userStore.remove(this._userStoreKey);
        }
    };

    _createClass(UserManager, [{
        key: '_redirectNavigator',
        get: function get() {
            return this.settings.redirectNavigator;
        }
    }, {
        key: '_popupNavigator',
        get: function get() {
            return this.settings.popupNavigator;
        }
    }, {
        key: '_iframeNavigator',
        get: function get() {
            return this.settings.iframeNavigator;
        }
    }, {
        key: '_userStore',
        get: function get() {
            return this.settings.userStore;
        }
    }, {
        key: 'events',
        get: function get() {
            return this._events;
        }
    }, {
        key: '_userStoreKey',
        get: function get() {
            return 'user:' + this.settings.authority + ':' + this.settings.client_id;
        }
    }]);

    return UserManager;
}(_OidcClient2.OidcClient);

/***/ }),

/***/ "./src/UserManagerEvents.js":
/*!**********************************!*\
  !*** ./src/UserManagerEvents.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserManagerEvents = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _AccessTokenEvents2 = __webpack_require__(/*! ./AccessTokenEvents.js */ "./src/AccessTokenEvents.js");

var _Event = __webpack_require__(/*! ./Event.js */ "./src/Event.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var UserManagerEvents = exports.UserManagerEvents = function (_AccessTokenEvents) {
    _inherits(UserManagerEvents, _AccessTokenEvents);

    function UserManagerEvents(settings) {
        _classCallCheck(this, UserManagerEvents);

        var _this = _possibleConstructorReturn(this, _AccessTokenEvents.call(this, settings));

        _this._userLoaded = new _Event.Event("User loaded");
        _this._userUnloaded = new _Event.Event("User unloaded");
        _this._silentRenewError = new _Event.Event("Silent renew error");
        _this._userSignedIn = new _Event.Event("User signed in");
        _this._userSignedOut = new _Event.Event("User signed out");
        _this._userSessionChanged = new _Event.Event("User session changed");
        return _this;
    }

    UserManagerEvents.prototype.load = function load(user) {
        var raiseEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _Log.Log.debug("UserManagerEvents.load");
        _AccessTokenEvents.prototype.load.call(this, user);
        if (raiseEvent) {
            this._userLoaded.raise(user);
        }
    };

    UserManagerEvents.prototype.unload = function unload() {
        _Log.Log.debug("UserManagerEvents.unload");
        _AccessTokenEvents.prototype.unload.call(this);
        this._userUnloaded.raise();
    };

    UserManagerEvents.prototype.addUserLoaded = function addUserLoaded(cb) {
        this._userLoaded.addHandler(cb);
    };

    UserManagerEvents.prototype.removeUserLoaded = function removeUserLoaded(cb) {
        this._userLoaded.removeHandler(cb);
    };

    UserManagerEvents.prototype.addUserUnloaded = function addUserUnloaded(cb) {
        this._userUnloaded.addHandler(cb);
    };

    UserManagerEvents.prototype.removeUserUnloaded = function removeUserUnloaded(cb) {
        this._userUnloaded.removeHandler(cb);
    };

    UserManagerEvents.prototype.addSilentRenewError = function addSilentRenewError(cb) {
        this._silentRenewError.addHandler(cb);
    };

    UserManagerEvents.prototype.removeSilentRenewError = function removeSilentRenewError(cb) {
        this._silentRenewError.removeHandler(cb);
    };

    UserManagerEvents.prototype._raiseSilentRenewError = function _raiseSilentRenewError(e) {
        _Log.Log.debug("UserManagerEvents._raiseSilentRenewError", e.message);
        this._silentRenewError.raise(e);
    };

    UserManagerEvents.prototype.addUserSignedIn = function addUserSignedIn(cb) {
        this._userSignedIn.addHandler(cb);
    };

    UserManagerEvents.prototype.removeUserSignedIn = function removeUserSignedIn(cb) {
        this._userSignedIn.removeHandler(cb);
    };

    UserManagerEvents.prototype._raiseUserSignedIn = function _raiseUserSignedIn() {
        _Log.Log.debug("UserManagerEvents._raiseUserSignedIn");
        this._userSignedIn.raise();
    };

    UserManagerEvents.prototype.addUserSignedOut = function addUserSignedOut(cb) {
        this._userSignedOut.addHandler(cb);
    };

    UserManagerEvents.prototype.removeUserSignedOut = function removeUserSignedOut(cb) {
        this._userSignedOut.removeHandler(cb);
    };

    UserManagerEvents.prototype._raiseUserSignedOut = function _raiseUserSignedOut() {
        _Log.Log.debug("UserManagerEvents._raiseUserSignedOut");
        this._userSignedOut.raise();
    };

    UserManagerEvents.prototype.addUserSessionChanged = function addUserSessionChanged(cb) {
        this._userSessionChanged.addHandler(cb);
    };

    UserManagerEvents.prototype.removeUserSessionChanged = function removeUserSessionChanged(cb) {
        this._userSessionChanged.removeHandler(cb);
    };

    UserManagerEvents.prototype._raiseUserSessionChanged = function _raiseUserSessionChanged() {
        _Log.Log.debug("UserManagerEvents._raiseUserSessionChanged");
        this._userSessionChanged.raise();
    };

    return UserManagerEvents;
}(_AccessTokenEvents2.AccessTokenEvents);

/***/ }),

/***/ "./src/UserManagerSettings.js":
/*!************************************!*\
  !*** ./src/UserManagerSettings.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserManagerSettings = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _OidcClientSettings2 = __webpack_require__(/*! ./OidcClientSettings.js */ "./src/OidcClientSettings.js");

var _RedirectNavigator = __webpack_require__(/*! ./RedirectNavigator.js */ "./src/RedirectNavigator.js");

var _PopupNavigator = __webpack_require__(/*! ./PopupNavigator.js */ "./src/PopupNavigator.js");

var _IFrameNavigator = __webpack_require__(/*! ./IFrameNavigator.js */ "./src/IFrameNavigator.js");

var _WebStorageStateStore = __webpack_require__(/*! ./WebStorageStateStore.js */ "./src/WebStorageStateStore.js");

var _Global = __webpack_require__(/*! ./Global.js */ "./src/Global.js");

var _SigninRequest = __webpack_require__(/*! ./SigninRequest.js */ "./src/SigninRequest.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var DefaultAccessTokenExpiringNotificationTime = 60;
var DefaultCheckSessionInterval = 2000;

var UserManagerSettings = exports.UserManagerSettings = function (_OidcClientSettings) {
    _inherits(UserManagerSettings, _OidcClientSettings);

    function UserManagerSettings() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            popup_redirect_uri = _ref.popup_redirect_uri,
            popup_post_logout_redirect_uri = _ref.popup_post_logout_redirect_uri,
            popupWindowFeatures = _ref.popupWindowFeatures,
            popupWindowTarget = _ref.popupWindowTarget,
            silent_redirect_uri = _ref.silent_redirect_uri,
            silentRequestTimeout = _ref.silentRequestTimeout,
            _ref$automaticSilentR = _ref.automaticSilentRenew,
            automaticSilentRenew = _ref$automaticSilentR === undefined ? false : _ref$automaticSilentR,
            _ref$validateSubOnSil = _ref.validateSubOnSilentRenew,
            validateSubOnSilentRenew = _ref$validateSubOnSil === undefined ? false : _ref$validateSubOnSil,
            _ref$includeIdTokenIn = _ref.includeIdTokenInSilentRenew,
            includeIdTokenInSilentRenew = _ref$includeIdTokenIn === undefined ? true : _ref$includeIdTokenIn,
            _ref$monitorSession = _ref.monitorSession,
            monitorSession = _ref$monitorSession === undefined ? true : _ref$monitorSession,
            _ref$monitorAnonymous = _ref.monitorAnonymousSession,
            monitorAnonymousSession = _ref$monitorAnonymous === undefined ? false : _ref$monitorAnonymous,
            _ref$checkSessionInte = _ref.checkSessionInterval,
            checkSessionInterval = _ref$checkSessionInte === undefined ? DefaultCheckSessionInterval : _ref$checkSessionInte,
            _ref$stopCheckSession = _ref.stopCheckSessionOnError,
            stopCheckSessionOnError = _ref$stopCheckSession === undefined ? true : _ref$stopCheckSession,
            query_status_response_type = _ref.query_status_response_type,
            _ref$revokeAccessToke = _ref.revokeAccessTokenOnSignout,
            revokeAccessTokenOnSignout = _ref$revokeAccessToke === undefined ? false : _ref$revokeAccessToke,
            _ref$accessTokenExpir = _ref.accessTokenExpiringNotificationTime,
            accessTokenExpiringNotificationTime = _ref$accessTokenExpir === undefined ? DefaultAccessTokenExpiringNotificationTime : _ref$accessTokenExpir,
            _ref$redirectNavigato = _ref.redirectNavigator,
            redirectNavigator = _ref$redirectNavigato === undefined ? new _RedirectNavigator.RedirectNavigator() : _ref$redirectNavigato,
            _ref$popupNavigator = _ref.popupNavigator,
            popupNavigator = _ref$popupNavigator === undefined ? new _PopupNavigator.PopupNavigator() : _ref$popupNavigator,
            _ref$iframeNavigator = _ref.iframeNavigator,
            iframeNavigator = _ref$iframeNavigator === undefined ? new _IFrameNavigator.IFrameNavigator() : _ref$iframeNavigator,
            _ref$userStore = _ref.userStore,
            userStore = _ref$userStore === undefined ? new _WebStorageStateStore.WebStorageStateStore({ store: _Global.Global.sessionStorage }) : _ref$userStore;

        _classCallCheck(this, UserManagerSettings);

        var _this = _possibleConstructorReturn(this, _OidcClientSettings.call(this, arguments[0]));

        _this._popup_redirect_uri = popup_redirect_uri;
        _this._popup_post_logout_redirect_uri = popup_post_logout_redirect_uri;
        _this._popupWindowFeatures = popupWindowFeatures;
        _this._popupWindowTarget = popupWindowTarget;

        _this._silent_redirect_uri = silent_redirect_uri;
        _this._silentRequestTimeout = silentRequestTimeout;
        _this._automaticSilentRenew = automaticSilentRenew;
        _this._validateSubOnSilentRenew = validateSubOnSilentRenew;
        _this._includeIdTokenInSilentRenew = includeIdTokenInSilentRenew;
        _this._accessTokenExpiringNotificationTime = accessTokenExpiringNotificationTime;

        _this._monitorSession = monitorSession;
        _this._monitorAnonymousSession = monitorAnonymousSession;
        _this._checkSessionInterval = checkSessionInterval;
        _this._stopCheckSessionOnError = stopCheckSessionOnError;
        if (query_status_response_type) {
            _this._query_status_response_type = query_status_response_type;
        } else if (arguments[0] && arguments[0].response_type) {
            _this._query_status_response_type = _SigninRequest.SigninRequest.isOidc(arguments[0].response_type) ? "id_token" : "code";
        } else {
            _this._query_status_response_type = "id_token";
        }
        _this._revokeAccessTokenOnSignout = revokeAccessTokenOnSignout;

        _this._redirectNavigator = redirectNavigator;
        _this._popupNavigator = popupNavigator;
        _this._iframeNavigator = iframeNavigator;

        _this._userStore = userStore;
        return _this;
    }

    _createClass(UserManagerSettings, [{
        key: 'popup_redirect_uri',
        get: function get() {
            return this._popup_redirect_uri;
        }
    }, {
        key: 'popup_post_logout_redirect_uri',
        get: function get() {
            return this._popup_post_logout_redirect_uri;
        }
    }, {
        key: 'popupWindowFeatures',
        get: function get() {
            return this._popupWindowFeatures;
        }
    }, {
        key: 'popupWindowTarget',
        get: function get() {
            return this._popupWindowTarget;
        }
    }, {
        key: 'silent_redirect_uri',
        get: function get() {
            return this._silent_redirect_uri;
        }
    }, {
        key: 'silentRequestTimeout',
        get: function get() {
            return this._silentRequestTimeout;
        }
    }, {
        key: 'automaticSilentRenew',
        get: function get() {
            return this._automaticSilentRenew;
        }
    }, {
        key: 'validateSubOnSilentRenew',
        get: function get() {
            return this._validateSubOnSilentRenew;
        }
    }, {
        key: 'includeIdTokenInSilentRenew',
        get: function get() {
            return this._includeIdTokenInSilentRenew;
        }
    }, {
        key: 'accessTokenExpiringNotificationTime',
        get: function get() {
            return this._accessTokenExpiringNotificationTime;
        }
    }, {
        key: 'monitorSession',
        get: function get() {
            return this._monitorSession;
        }
    }, {
        key: 'monitorAnonymousSession',
        get: function get() {
            return this._monitorAnonymousSession;
        }
    }, {
        key: 'checkSessionInterval',
        get: function get() {
            return this._checkSessionInterval;
        }
    }, {
        key: 'stopCheckSessionOnError',
        get: function get() {
            return this._stopCheckSessionOnError;
        }
    }, {
        key: 'query_status_response_type',
        get: function get() {
            return this._query_status_response_type;
        }
    }, {
        key: 'revokeAccessTokenOnSignout',
        get: function get() {
            return this._revokeAccessTokenOnSignout;
        }
    }, {
        key: 'redirectNavigator',
        get: function get() {
            return this._redirectNavigator;
        }
    }, {
        key: 'popupNavigator',
        get: function get() {
            return this._popupNavigator;
        }
    }, {
        key: 'iframeNavigator',
        get: function get() {
            return this._iframeNavigator;
        }
    }, {
        key: 'userStore',
        get: function get() {
            return this._userStore;
        }
    }]);

    return UserManagerSettings;
}(_OidcClientSettings2.OidcClientSettings);

/***/ }),

/***/ "./src/WebStorageStateStore.js":
/*!*************************************!*\
  !*** ./src/WebStorageStateStore.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebStorageStateStore = undefined;

var _Log = __webpack_require__(/*! ./Log.js */ "./src/Log.js");

var _Global = __webpack_require__(/*! ./Global.js */ "./src/Global.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

var WebStorageStateStore = exports.WebStorageStateStore = function () {
    function WebStorageStateStore() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$prefix = _ref.prefix,
            prefix = _ref$prefix === undefined ? "oidc." : _ref$prefix,
            _ref$store = _ref.store,
            store = _ref$store === undefined ? _Global.Global.localStorage : _ref$store;

        _classCallCheck(this, WebStorageStateStore);

        this._store = store;
        this._prefix = prefix;
    }

    WebStorageStateStore.prototype.set = function set(key, value) {
        _Log.Log.debug("WebStorageStateStore.set", key);

        key = this._prefix + key;

        this._store.setItem(key, value);

        return Promise.resolve();
    };

    WebStorageStateStore.prototype.get = function get(key) {
        _Log.Log.debug("WebStorageStateStore.get", key);

        key = this._prefix + key;

        var item = this._store.getItem(key);

        return Promise.resolve(item);
    };

    WebStorageStateStore.prototype.remove = function remove(key) {
        _Log.Log.debug("WebStorageStateStore.remove", key);

        key = this._prefix + key;

        var item = this._store.getItem(key);
        this._store.removeItem(key);

        return Promise.resolve(item);
    };

    WebStorageStateStore.prototype.getAllKeys = function getAllKeys() {
        _Log.Log.debug("WebStorageStateStore.getAllKeys");

        var keys = [];

        for (var index = 0; index < this._store.length; index++) {
            var key = this._store.key(index);

            if (key.indexOf(this._prefix) === 0) {
                keys.push(key.substr(this._prefix.length));
            }
        }

        return Promise.resolve(keys);
    };

    return WebStorageStateStore;
}();

/***/ }),

/***/ "./src/random.js":
/*!***********************!*\
  !*** ./src/random.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = random;
/**
 * Generates RFC4122 version 4 guid ()
 */

var crypto = typeof window !== 'undefined' ? window.crypto || window.msCrypto : null;

function _cryptoUuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
}

function _uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ Math.random() * 16 >> c / 4).toString(16);
  });
}

function random() {
  var hasCrypto = crypto != 'undefined' && crypto !== null;
  var hasRandomValues = hasCrypto && typeof crypto.getRandomValues != 'undefined';
  var uuid = hasRandomValues ? _cryptoUuidv4 : _uuidv4;
  return uuid().replace(/-/g, '');
}
module.exports = exports['default'];

/***/ }),

/***/ "./version.js":
/*!********************!*\
  !*** ./version.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Version = "1.11.5";exports.Version = Version;

/***/ }),

/***/ 0:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2VuYy1iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9lbmMtaGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMjU2LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMzg0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhNTEyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMveDY0LWNvcmUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQWNjZXNzVG9rZW5FdmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrU2Vzc2lvbklGcmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2xvY2tTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9Db3Jkb3ZhSUZyYW1lTmF2aWdhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9Db3Jkb3ZhUG9wdXBOYXZpZ2F0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvcmRvdmFQb3B1cFdpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3JSZXNwb25zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSUZyYW1lTmF2aWdhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9JRnJhbWVXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0luTWVtb3J5V2ViU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSm9zZVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0pzb25TZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9Mb2cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01ldGFkYXRhU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvT2lkY0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvT2lkY0NsaWVudFNldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9Qb3B1cE5hdmlnYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUG9wdXBXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlZGlyZWN0TmF2aWdhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9SZXNwb25zZVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2Vzc2lvbk1vbml0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NpZ25pblJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NpZ25pblJlc3BvbnNlLmpzIiwid2VicGFjazovLy8uL3NyYy9TaWduaW5TdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2lnbm91dFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NpZ25vdXRSZXNwb25zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2lsZW50UmVuZXdTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9TdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Rva2VuQ2xpZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9Ub2tlblJldm9jYXRpb25DbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VybFV0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VzZXJJbmZvU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVXNlck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VzZXJNYW5hZ2VyRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9Vc2VyTWFuYWdlclNldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9XZWJTdG9yYWdlU3RhdGVTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmFuZG9tLmpzIiwid2VicGFjazovLy8uL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vL2NyeXB0byAoaWdub3JlZCkiXSwibmFtZXMiOlsiVmVyc2lvbiIsIkxvZyIsIk9pZGNDbGllbnQiLCJPaWRjQ2xpZW50U2V0dGluZ3MiLCJXZWJTdG9yYWdlU3RhdGVTdG9yZSIsIkluTWVtb3J5V2ViU3RvcmFnZSIsIlVzZXJNYW5hZ2VyIiwiQWNjZXNzVG9rZW5FdmVudHMiLCJNZXRhZGF0YVNlcnZpY2UiLCJDb3Jkb3ZhUG9wdXBOYXZpZ2F0b3IiLCJDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yIiwiQ2hlY2tTZXNzaW9uSUZyYW1lIiwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50IiwiU2Vzc2lvbk1vbml0b3IiLCJHbG9iYWwiLCJVc2VyIiwiRGVmYXVsdEFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lIiwiYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUiLCJhY2Nlc3NUb2tlbkV4cGlyaW5nVGltZXIiLCJUaW1lciIsImFjY2Vzc1Rva2VuRXhwaXJlZFRpbWVyIiwiX2FjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lIiwiX2FjY2Vzc1Rva2VuRXhwaXJpbmciLCJfYWNjZXNzVG9rZW5FeHBpcmVkIiwibG9hZCIsImNvbnRhaW5lciIsImFjY2Vzc190b2tlbiIsImV4cGlyZXNfaW4iLCJ1bmRlZmluZWQiLCJkdXJhdGlvbiIsImRlYnVnIiwiZXhwaXJpbmciLCJpbml0IiwiY2FuY2VsIiwiZXhwaXJlZCIsInVubG9hZCIsImFkZEFjY2Vzc1Rva2VuRXhwaXJpbmciLCJjYiIsImFkZEhhbmRsZXIiLCJyZW1vdmVBY2Nlc3NUb2tlbkV4cGlyaW5nIiwicmVtb3ZlSGFuZGxlciIsImFkZEFjY2Vzc1Rva2VuRXhwaXJlZCIsInJlbW92ZUFjY2Vzc1Rva2VuRXhwaXJlZCIsIkRlZmF1bHRJbnRlcnZhbCIsImNhbGxiYWNrIiwiY2xpZW50X2lkIiwidXJsIiwiaW50ZXJ2YWwiLCJzdG9wT25FcnJvciIsIl9jYWxsYmFjayIsIl9jbGllbnRfaWQiLCJfdXJsIiwiX2ludGVydmFsIiwiX3N0b3BPbkVycm9yIiwiaWR4IiwiaW5kZXhPZiIsIl9mcmFtZV9vcmlnaW4iLCJzdWJzdHIiLCJfZnJhbWUiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJwb3NpdGlvbiIsImRpc3BsYXkiLCJ3aWR0aCIsImhlaWdodCIsInNyYyIsIlByb21pc2UiLCJyZXNvbHZlIiwib25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiX2JvdW5kTWVzc2FnZUV2ZW50IiwiX21lc3NhZ2UiLCJiaW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJvcmlnaW4iLCJzb3VyY2UiLCJjb250ZW50V2luZG93IiwiZGF0YSIsImVycm9yIiwic3RvcCIsInN0YXJ0Iiwic2Vzc2lvbl9zdGF0ZSIsIl9zZXNzaW9uX3N0YXRlIiwic2VuZCIsInBvc3RNZXNzYWdlIiwiX3RpbWVyIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiQ2xvY2tTZXJ2aWNlIiwiZ2V0RXBvY2hUaW1lIiwiRGF0ZSIsIm5vdyIsInByZXBhcmUiLCJwYXJhbXMiLCJwb3B1cFdpbmRvd0ZlYXR1cmVzIiwicG9wdXAiLCJDb3Jkb3ZhUG9wdXBXaW5kb3ciLCJEZWZhdWx0UG9wdXBGZWF0dXJlcyIsIkRlZmF1bHRQb3B1cFRhcmdldCIsIl9wcm9taXNlIiwicmVqZWN0IiwiX3Jlc29sdmUiLCJfcmVqZWN0IiwiZmVhdHVyZXMiLCJ0YXJnZXQiLCJwb3B1cFdpbmRvd1RhcmdldCIsInJlZGlyZWN0X3VyaSIsInN0YXJ0VXJsIiwiX2lzSW5BcHBCcm93c2VySW5zdGFsbGVkIiwiY29yZG92YU1ldGFkYXRhIiwic29tZSIsIm5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hdmlnYXRlIiwiX2Vycm9yIiwiY29yZG92YSIsInJlcXVpcmUiLCJtZXRhZGF0YSIsIl9wb3B1cCIsIkluQXBwQnJvd3NlciIsIm9wZW4iLCJfZXhpdENhbGxiYWNrRXZlbnQiLCJfZXhpdENhbGxiYWNrIiwiX2xvYWRTdGFydENhbGxiYWNrRXZlbnQiLCJfbG9hZFN0YXJ0Q2FsbGJhY2siLCJwcm9taXNlIiwiZXZlbnQiLCJfc3VjY2VzcyIsIm1lc3NhZ2UiLCJfY2xlYW51cCIsIkVycm9yIiwiY2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiRXJyb3JSZXNwb25zZSIsImVycm9yX2Rlc2NyaXB0aW9uIiwiZXJyb3JfdXJpIiwic3RhdGUiLCJFdmVudCIsIl9uYW1lIiwiX2NhbGxiYWNrcyIsInB1c2giLCJmaW5kSW5kZXgiLCJpdGVtIiwic3BsaWNlIiwicmFpc2UiLCJpIiwibGVuZ3RoIiwidGltZXIiLCJoYW5kbGUiLCJ0ZXN0aW5nIiwicmVxdWVzdCIsIl90ZXN0aW5nIiwic2V0WE1MSHR0cFJlcXVlc3QiLCJuZXdSZXF1ZXN0IiwibG9jYXRpb24iLCJsb2NhbFN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsIlhNTEh0dHBSZXF1ZXN0IiwiSUZyYW1lTmF2aWdhdG9yIiwiZnJhbWUiLCJJRnJhbWVXaW5kb3ciLCJub3RpZnlQYXJlbnQiLCJEZWZhdWx0VGltZW91dCIsInRpbWVvdXQiLCJzaWxlbnRSZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJfdGltZW91dCIsImNsZWFyVGltZW91dCIsInJlbW92ZUNoaWxkIiwiX29yaWdpbiIsInN0YXJ0c1dpdGgiLCJocmVmIiwicGFyZW50IiwicHJvdG9jb2wiLCJob3N0IiwiX2RhdGEiLCJnZXRJdGVtIiwia2V5Iiwic2V0SXRlbSIsInZhbHVlIiwicmVtb3ZlSXRlbSIsImluZGV4IiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIkFsbG93ZWRTaWduaW5nQWxncyIsIkhhc2hlcnMiLCJzaGEyNTYiLCJTSEEyNTYiLCJzaGEzODQiLCJTSEEzODQiLCJzaGE1MTIiLCJTSEE1MTIiLCJiNjRUb0J5dGVzIiwicyIsInJlcGxhY2UiLCJ1dGY4RGVjb2RlIiwiYnl0ZXMiLCJlc2NhcGVkIiwidG9TdHJpbmciLCJzbGljZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImI2NHVUb0pzb24iLCJKU09OIiwicGFyc2UiLCJhc2NpaVRvQnl0ZXMiLCJvdXQiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsImdldFN1YnRsZSIsImMiLCJjcnlwdG8iLCJnbG9iYWxUaGlzIiwiZ2xvYmFsIiwic3VidGxlIiwicmVhZFRsdiIsIm9mZnNldCIsInRhZyIsImxlbiIsIm4iLCJlbmQiLCJzcGtpRnJvbUNlcnRpZmljYXRlIiwiZGVyIiwiY2VydCIsInRicyIsInBvcyIsImVsIiwicmVzb2x2ZUtleSIsImt0eSIsImZvcm1hdCIsImV4dCIsIng1YyIsImNydiIsIngiLCJ5IiwiYWxnUGFyYW1zIiwiYWxnIiwiYml0cyIsImhhc2giLCJpbXBvcnRBbGciLCJ2ZXJpZnlBbGciLCJzYWx0TGVuZ3RoIiwicGFyc2VJbnQiLCJjdXJ2ZSIsIm5hbWVkQ3VydmUiLCJKb3NlVXRpbCIsInBhcnNlSnd0Iiwiand0IiwicGFydHMiLCJzcGxpdCIsImhlYWRlciIsInBheWxvYWQiLCJ2YWxpZGF0ZUp3dCIsImlzc3VlciIsImF1ZGllbmNlIiwiY2xvY2tTa2V3IiwidGltZUluc2Vuc2l0aXZlIiwicmVzb2x2ZWQiLCJ2YWxpZGF0ZUp3dEF0dHJpYnV0ZXMiLCJ0aGVuIiwiX3ZlcmlmeVNpZ25hdHVyZSIsInZhbGlkIiwicCIsInNpZ25hdHVyZSIsImltcG9ydEtleSIsInZlcmlmeSIsImNyeXB0b0tleSIsInBhcnNlZCIsImlzcyIsImF1ZCIsInZhbGlkQXVkaWVuY2UiLCJBcnJheSIsImlzQXJyYXkiLCJhenAiLCJsb3dlck5vdyIsInVwcGVyTm93IiwiaWF0IiwibmJmIiwiZXhwIiwiaGFzaFN0cmluZyIsImhhc2hlciIsIlN0cmluZyIsInRvTG93ZXJDYXNlIiwiSGV4IiwiaGV4VG9CYXNlNjRVcmwiLCJCYXNlNjQiLCJzdHJpbmdpZnkiLCJKc29uU2VydmljZSIsImFkZGl0aW9uYWxDb250ZW50VHlwZXMiLCJYTUxIdHRwUmVxdWVzdEN0b3IiLCJqd3RIYW5kbGVyIiwiX2NvbnRlbnRUeXBlcyIsIl9YTUxIdHRwUmVxdWVzdCIsIl9qd3RIYW5kbGVyIiwiZ2V0SnNvbiIsInRva2VuIiwicmVxIiwiYWxsb3dlZENvbnRlbnRUeXBlcyIsInN0YXR1cyIsImNvbnRlbnRUeXBlIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJmb3VuZCIsImZpbmQiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0Iiwib25lcnJvciIsInNldFJlcXVlc3RIZWFkZXIiLCJwb3N0Rm9ybSIsImJhc2ljQXV0aCIsImVuY29kZVVSSUNvbXBvbmVudCIsImJ0b2EiLCJub3BMb2dnZXIiLCJpbmZvIiwid2FybiIsIk5PTkUiLCJFUlJPUiIsIldBUk4iLCJJTkZPIiwiREVCVUciLCJsb2dnZXIiLCJsZXZlbCIsInJlc2V0IiwiYXJncyIsImFwcGx5IiwiZnJvbSIsIk9pZGNNZXRhZGF0YVVybFBhdGgiLCJzZXR0aW5ncyIsIkpzb25TZXJ2aWNlQ3RvciIsIl9zZXR0aW5ncyIsIl9qc29uU2VydmljZSIsInJlc2V0U2lnbmluZ0tleXMiLCJzaWduaW5nS2V5cyIsImdldE1ldGFkYXRhIiwibWV0YWRhdGFVcmwiLCJzZWVkIiwibWV0YWRhdGFTZWVkIiwiYXNzaWduIiwiZ2V0SXNzdWVyIiwiX2dldE1ldGFkYXRhUHJvcGVydHkiLCJnZXRBdXRob3JpemF0aW9uRW5kcG9pbnQiLCJnZXRVc2VySW5mb0VuZHBvaW50IiwiZ2V0VG9rZW5FbmRwb2ludCIsIm9wdGlvbmFsIiwiZ2V0Q2hlY2tTZXNzaW9uSWZyYW1lIiwiZ2V0RW5kU2Vzc2lvbkVuZHBvaW50IiwiZ2V0UmV2b2NhdGlvbkVuZHBvaW50IiwiZ2V0S2V5c0VuZHBvaW50IiwiZ2V0U2lnbmluZ0tleXMiLCJqd2tzX3VyaSIsImtleVNldCIsImtleXMiLCJfbWV0YWRhdGFVcmwiLCJhdXRob3JpdHkiLCJjcmVhdGVTaWduaW5SZXF1ZXN0IiwicmVzcG9uc2VfdHlwZSIsInNjb3BlIiwicHJvbXB0IiwibWF4X2FnZSIsInVpX2xvY2FsZXMiLCJpZF90b2tlbl9oaW50IiwibG9naW5faGludCIsImFjcl92YWx1ZXMiLCJyZXNvdXJjZSIsInJlcXVlc3RfdXJpIiwicmVzcG9uc2VfbW9kZSIsImV4dHJhUXVlcnlQYXJhbXMiLCJleHRyYVRva2VuUGFyYW1zIiwicmVxdWVzdF90eXBlIiwic2tpcFVzZXJJbmZvIiwic3RhdGVTdG9yZSIsIlNpZ25pblJlcXVlc3QiLCJpc0NvZGUiLCJfbWV0YWRhdGFTZXJ2aWNlIiwic2lnbmluUmVxdWVzdCIsImNsaWVudF9zZWNyZXQiLCJzaWduaW5TdGF0ZSIsIl9zdGF0ZVN0b3JlIiwic2V0IiwiaWQiLCJ0b1N0b3JhZ2VTdHJpbmciLCJyZWFkU2lnbmluUmVzcG9uc2VTdGF0ZSIsInJlbW92ZVN0YXRlIiwidXNlUXVlcnkiLCJkZWxpbWl0ZXIiLCJyZXNwb25zZSIsIlNpZ25pblJlc3BvbnNlIiwic3RhdGVBcGkiLCJyZW1vdmUiLCJnZXQiLCJzdG9yZWRTdGF0ZVN0cmluZyIsIlNpZ25pblN0YXRlIiwiZnJvbVN0b3JhZ2VTdHJpbmciLCJwcm9jZXNzU2lnbmluUmVzcG9uc2UiLCJfdmFsaWRhdG9yIiwidmFsaWRhdGVTaWduaW5SZXNwb25zZSIsImNyZWF0ZVNpZ25vdXRSZXF1ZXN0IiwicG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIiwiU2lnbm91dFJlcXVlc3QiLCJzaWdub3V0U3RhdGUiLCJyZWFkU2lnbm91dFJlc3BvbnNlU3RhdGUiLCJTaWdub3V0UmVzcG9uc2UiLCJzdGF0ZUtleSIsIlN0YXRlIiwicHJvY2Vzc1NpZ25vdXRSZXNwb25zZSIsInZhbGlkYXRlU2lnbm91dFJlc3BvbnNlIiwiY2xlYXJTdGFsZVN0YXRlIiwic3RhbGVTdGF0ZUFnZSIsInZhbGlkYXRvciIsIm1ldGFkYXRhU2VydmljZSIsIkRlZmF1bHRSZXNwb25zZVR5cGUiLCJEZWZhdWx0U2NvcGUiLCJEZWZhdWx0Q2xpZW50QXV0aGVudGljYXRpb24iLCJEZWZhdWx0U3RhbGVTdGF0ZUFnZSIsIkRlZmF1bHRDbG9ja1NrZXdJblNlY29uZHMiLCJjbGllbnRfYXV0aGVudGljYXRpb24iLCJmaWx0ZXJQcm90b2NvbENsYWltcyIsImxvYWRVc2VySW5mbyIsImNsb2NrU2VydmljZSIsInVzZXJJbmZvSnd0SXNzdWVyIiwibWVyZ2VDbGFpbXMiLCJSZXNwb25zZVZhbGlkYXRvckN0b3IiLCJSZXNwb25zZVZhbGlkYXRvciIsIk1ldGFkYXRhU2VydmljZUN0b3IiLCJfYXV0aG9yaXR5IiwiX21ldGFkYXRhIiwiX21ldGFkYXRhU2VlZCIsIl9zaWduaW5nS2V5cyIsIl9jbGllbnRfc2VjcmV0IiwiX3Jlc3BvbnNlX3R5cGUiLCJfc2NvcGUiLCJfcmVkaXJlY3RfdXJpIiwiX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsIl9jbGllbnRfYXV0aGVudGljYXRpb24iLCJfcHJvbXB0IiwiX2Rpc3BsYXkiLCJfbWF4X2FnZSIsIl91aV9sb2NhbGVzIiwiX2Fjcl92YWx1ZXMiLCJfcmVzb3VyY2UiLCJfcmVzcG9uc2VfbW9kZSIsIl9maWx0ZXJQcm90b2NvbENsYWltcyIsIl9sb2FkVXNlckluZm8iLCJfc3RhbGVTdGF0ZUFnZSIsIl9jbG9ja1NrZXciLCJfY2xvY2tTZXJ2aWNlIiwiX3VzZXJJbmZvSnd0SXNzdWVyIiwiX21lcmdlQ2xhaW1zIiwiX2V4dHJhUXVlcnlQYXJhbXMiLCJfZXh0cmFUb2tlblBhcmFtcyIsIlBvcHVwTmF2aWdhdG9yIiwiUG9wdXBXaW5kb3ciLCJrZWVwT3BlbiIsIm5vdGlmeU9wZW5lciIsIkNoZWNrRm9yUG9wdXBDbG9zZWRJbnRlcnZhbCIsIl9jaGVja0ZvclBvcHVwQ2xvc2VkVGltZXIiLCJfY2hlY2tGb3JQb3B1cENsb3NlZCIsIl9pZCIsImZvY3VzIiwiY2xvc2VkIiwib3BlbmVyIiwiVXJsVXRpbGl0eSIsInBhcnNlVXJsRnJhZ21lbnQiLCJSZWRpcmVjdE5hdmlnYXRvciIsInVzZVJlcGxhY2VUb05hdmlnYXRlIiwiUHJvdG9jb2xDbGFpbXMiLCJVc2VySW5mb1NlcnZpY2VDdG9yIiwiVXNlckluZm9TZXJ2aWNlIiwiam9zZVV0aWwiLCJUb2tlbkNsaWVudEN0b3IiLCJUb2tlbkNsaWVudCIsIl91c2VySW5mb1NlcnZpY2UiLCJfam9zZVV0aWwiLCJfdG9rZW5DbGllbnQiLCJfcHJvY2Vzc1NpZ25pblBhcmFtcyIsIl92YWxpZGF0ZVRva2VucyIsIl9wcm9jZXNzQ2xhaW1zIiwibm9uY2UiLCJpZF90b2tlbiIsImNvZGVfdmVyaWZpZXIiLCJjb2RlIiwiaXNPcGVuSWRDb25uZWN0IiwicHJvZmlsZSIsImdldENsYWltcyIsImNsYWltcyIsInN1YiIsImNsYWltczEiLCJjbGFpbXMyIiwicmVzdWx0IiwidmFsdWVzIiwiZm9yRWFjaCIsInR5cGUiLCJfcHJvY2Vzc0NvZGUiLCJfdmFsaWRhdGVJZFRva2VuQW5kQWNjZXNzVG9rZW4iLCJfdmFsaWRhdGVJZFRva2VuIiwiZXhjaGFuZ2VDb2RlIiwidG9rZW5SZXNwb25zZSIsIl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzIiwiY2xvY2tTa2V3SW5TZWNvbmRzIiwiX3ZhbGlkYXRlQWNjZXNzVG9rZW4iLCJfZ2V0U2lnbmluZ0tleUZvckp3dCIsImtpZCIsIl9maWx0ZXJCeUFsZyIsImZpbHRlciIsIl9nZXRTaWduaW5nS2V5Rm9ySnd0V2l0aFNpbmdsZVJldHJ5IiwiYXRfaGFzaCIsImhhc2hBbGciLCJoYXNoQml0cyIsInNoYSIsImxlZnQiLCJsZWZ0X2I2NHUiLCJ1c2VyTWFuYWdlciIsIkNoZWNrU2Vzc2lvbklGcmFtZUN0b3IiLCJfdXNlck1hbmFnZXIiLCJfQ2hlY2tTZXNzaW9uSUZyYW1lQ3RvciIsImV2ZW50cyIsImFkZFVzZXJMb2FkZWQiLCJfc3RhcnQiLCJhZGRVc2VyVW5sb2FkZWQiLCJfc3RvcCIsImdldFVzZXIiLCJ1c2VyIiwibW9uaXRvckFub255bW91c1Nlc3Npb24iLCJxdWVyeVNlc3Npb25TdGF0dXMiLCJ0bXBVc2VyIiwic2Vzc2lvbiIsInNpZCIsImNhdGNoIiwiZXJyIiwiX3N1YiIsIl9zaWQiLCJfY2hlY2tTZXNzaW9uSUZyYW1lIiwiX2NoZWNrU2Vzc2lvbkludGVydmFsIiwiX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yIiwidGltZXJIYW5kbGUiLCJyYWlzZUV2ZW50IiwiX3JhaXNlVXNlclNlc3Npb25DaGFuZ2VkIiwiX3JhaXNlVXNlclNpZ25lZE91dCIsIl9yYWlzZVVzZXJTaWduZWRJbiIsImNoZWNrU2Vzc2lvbkludGVydmFsIiwic3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IiLCJvaWRjIiwiaXNPaWRjIiwiYWRkUXVlcnlQYXJhbSIsImNvZGVfY2hhbGxlbmdlIiwiaXNPQXV0aCIsIk9pZGNTY29wZSIsInRva2VuX3R5cGUiLCJleHBpcmVzX2F0Iiwic2NvcGVzIiwiYXJndW1lbnRzIiwiX25vbmNlIiwiX2NvZGVfdmVyaWZpZXIiLCJfY29kZV9jaGFsbGVuZ2UiLCJfc2tpcFVzZXJJbmZvIiwiY3JlYXRlZCIsInN0b3JhZ2VTdHJpbmciLCJTaWxlbnRSZW5ld1NlcnZpY2UiLCJfdG9rZW5FeHBpcmluZyIsInNpZ25pblNpbGVudCIsIl9yYWlzZVNpbGVudFJlbmV3RXJyb3IiLCJfY3JlYXRlZCIsIl9yZXF1ZXN0X3R5cGUiLCJzdG9yYWdlIiwiYWdlIiwiY3V0b2ZmIiwiZ2V0QWxsS2V5cyIsInByb21pc2VzIiwiYWxsIiwiVGltZXJEdXJhdGlvbiIsIm5vd0Z1bmMiLCJfbm93RnVuYyIsImV4cGlyYXRpb24iLCJfdGltZXJIYW5kbGUiLCJfZXhwaXJhdGlvbiIsInRpbWVyRHVyYXRpb24iLCJkaWZmIiwiZ3JhbnRfdHlwZSIsImV4Y2hhbmdlUmVmcmVzaFRva2VuIiwicmVmcmVzaF90b2tlbiIsIkFjY2Vzc1Rva2VuVHlwZUhpbnQiLCJSZWZyZXNoVG9rZW5UeXBlSGludCIsIl9YTUxIdHRwUmVxdWVzdEN0b3IiLCJyZXZva2UiLCJyZXF1aXJlZCIsIl9yZXZva2UiLCJ4aHIiLCJsYXN0SW5kZXhPZiIsInJlZ2V4IiwibSIsImNvdW50ZXIiLCJleGVjIiwicHJvcCIsIl9nZXRDbGFpbXNGcm9tSnd0IiwiaXNzdWVyUHJvbWlzZSIsIlNpbGVudFJlbmV3U2VydmljZUN0b3IiLCJTZXNzaW9uTW9uaXRvckN0b3IiLCJUb2tlblJldm9jYXRpb25DbGllbnRDdG9yIiwiVXNlck1hbmFnZXJTZXR0aW5ncyIsIl9ldmVudHMiLCJVc2VyTWFuYWdlckV2ZW50cyIsIl9zaWxlbnRSZW5ld1NlcnZpY2UiLCJhdXRvbWF0aWNTaWxlbnRSZW5ldyIsInN0YXJ0U2lsZW50UmVuZXciLCJtb25pdG9yU2Vzc2lvbiIsIl9zZXNzaW9uTW9uaXRvciIsIl90b2tlblJldm9jYXRpb25DbGllbnQiLCJfbG9hZFVzZXIiLCJyZW1vdmVVc2VyIiwic3RvcmVVc2VyIiwic2lnbmluUmVkaXJlY3QiLCJuYXZQYXJhbXMiLCJfc2lnbmluU3RhcnQiLCJfcmVkaXJlY3ROYXZpZ2F0b3IiLCJzaWduaW5SZWRpcmVjdENhbGxiYWNrIiwiX3NpZ25pbkVuZCIsInNpZ25pblBvcHVwIiwicG9wdXBfcmVkaXJlY3RfdXJpIiwiX3NpZ25pbiIsIl9wb3B1cE5hdmlnYXRvciIsInNpZ25pblBvcHVwQ2FsbGJhY2siLCJfc2lnbmluQ2FsbGJhY2siLCJfdXNlUmVmcmVzaFRva2VuIiwiaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3IiwidmFsaWRhdGVTdWJPblNpbGVudFJlbmV3IiwiY3VycmVudF9zdWIiLCJfc2lnbmluU2lsZW50SWZyYW1lIiwiaWRUb2tlblZhbGlkYXRpb24iLCJfdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuIiwiYXV0aF90aW1lIiwic2lsZW50X3JlZGlyZWN0X3VyaSIsIl9pZnJhbWVOYXZpZ2F0b3IiLCJzaWduaW5TaWxlbnRDYWxsYmFjayIsInNpZ25pbkNhbGxiYWNrIiwic2lnbm91dENhbGxiYWNrIiwic2lnbm91dFJlZGlyZWN0Q2FsbGJhY2siLCJzaWdub3V0UG9wdXBDYWxsYmFjayIsInF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlIiwibmF2UmVzcG9uc2UiLCJzaWduaW5SZXNwb25zZSIsIm5hdmlnYXRvciIsIm5hdmlnYXRvclBhcmFtcyIsInNpZ25vdXRSZWRpcmVjdCIsInBvc3RMb2dvdXRSZWRpcmVjdFVyaSIsIl9zaWdub3V0U3RhcnQiLCJfc2lnbm91dEVuZCIsInNpZ25vdXRQb3B1cCIsInBvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsIl9zaWdub3V0IiwicmV2b2tlUHJvbWlzZSIsInJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0IiwiX3Jldm9rZUludGVybmFsIiwic2lnbm91dFJlcXVlc3QiLCJzaWdub3V0UmVzcG9uc2UiLCJyZXZva2VBY2Nlc3NUb2tlbiIsInN1Y2Nlc3MiLCJfcmV2b2tlQWNjZXNzVG9rZW5JbnRlcm5hbCIsIl9yZXZva2VSZWZyZXNoVG9rZW5JbnRlcm5hbCIsImF0U3VjY2VzcyIsInJ0U3VjY2VzcyIsInN0b3BTaWxlbnRSZW5ldyIsIl91c2VyU3RvcmUiLCJfdXNlclN0b3JlS2V5IiwicmVkaXJlY3ROYXZpZ2F0b3IiLCJwb3B1cE5hdmlnYXRvciIsImlmcmFtZU5hdmlnYXRvciIsInVzZXJTdG9yZSIsIl91c2VyTG9hZGVkIiwiX3VzZXJVbmxvYWRlZCIsIl9zaWxlbnRSZW5ld0Vycm9yIiwiX3VzZXJTaWduZWRJbiIsIl91c2VyU2lnbmVkT3V0IiwiX3VzZXJTZXNzaW9uQ2hhbmdlZCIsInJlbW92ZVVzZXJMb2FkZWQiLCJyZW1vdmVVc2VyVW5sb2FkZWQiLCJhZGRTaWxlbnRSZW5ld0Vycm9yIiwicmVtb3ZlU2lsZW50UmVuZXdFcnJvciIsImFkZFVzZXJTaWduZWRJbiIsInJlbW92ZVVzZXJTaWduZWRJbiIsImFkZFVzZXJTaWduZWRPdXQiLCJyZW1vdmVVc2VyU2lnbmVkT3V0IiwiYWRkVXNlclNlc3Npb25DaGFuZ2VkIiwicmVtb3ZlVXNlclNlc3Npb25DaGFuZ2VkIiwiRGVmYXVsdENoZWNrU2Vzc2lvbkludGVydmFsIiwic3RvcmUiLCJfcG9wdXBfcmVkaXJlY3RfdXJpIiwiX3BvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsIl9wb3B1cFdpbmRvd0ZlYXR1cmVzIiwiX3BvcHVwV2luZG93VGFyZ2V0IiwiX3NpbGVudF9yZWRpcmVjdF91cmkiLCJfc2lsZW50UmVxdWVzdFRpbWVvdXQiLCJfYXV0b21hdGljU2lsZW50UmVuZXciLCJfdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3IiwiX2luY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyIsIl9tb25pdG9yU2Vzc2lvbiIsIl9tb25pdG9yQW5vbnltb3VzU2Vzc2lvbiIsIl9xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSIsIl9yZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dCIsInByZWZpeCIsIl9zdG9yZSIsIl9wcmVmaXgiLCJyYW5kb20iLCJtc0NyeXB0byIsIl9jcnlwdG9VdWlkdjQiLCJnZXRSYW5kb21WYWx1ZXMiLCJfdXVpZHY0IiwiTWF0aCIsImhhc0NyeXB0byIsImhhc1JhbmRvbVZhbHVlcyIsInV1aWQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7O0FBRVY7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLGdCQUFn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WCxRQUFqRSxDQUEwRSxFQUExRSxDQURvRDtBQUFBLEdBQS9DLENBQVA7QUFHRDs7QUFFRCxTQUFTeWYsT0FBVCxHQUFtQjtBQUNmLFNBQU8sQ0FBQyxDQUFDLEdBQUQsSUFBTSxDQUFDLEdBQVAsR0FBVyxDQUFDLEdBQVosR0FBZ0IsQ0FBQyxHQUFqQixHQUFxQixDQUFDLElBQXZCLEVBQTZCN2YsT0FBN0IsQ0FBcUMsUUFBckMsRUFBK0M7QUFBQSxXQUN0RCxDQUFDZSxJQUFJK2UsS0FBS0wsTUFBTCxLQUFnQixFQUFoQixJQUFzQjFlLElBQUksQ0FBL0IsRUFBa0NYLFFBQWxDLENBQTJDLEVBQTNDLENBRHNEO0FBQUEsR0FBL0MsQ0FBUDtBQUdIOztBQUVjLFNBQVNxZixNQUFULEdBQWtCO0FBQy9CLE1BQUlNLFlBQVkvZSxVQUFVLFdBQVYsSUFBeUJBLFdBQVcsSUFBcEQ7QUFDQSxNQUFJZ2Ysa0JBQWtCRCxhQUFjLE9BQU8vZSxPQUFPNGUsZUFBZCxJQUFrQyxXQUF0RTtBQUNBLE1BQUlLLE9BQU9ELGtCQUFrQkwsYUFBbEIsR0FBa0NFLE9BQTdDO0FBQ0EsU0FBT0ksT0FBT2pnQixPQUFQLENBQWUsSUFBZixFQUFxQixFQUFyQixDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCRCxJQUFNdk0sVUFBVSxRQUFoQixDLFFBQWtDQSxPLEdBQUFBLE87Ozs7Ozs7Ozs7O0FDQWxDLGUiLCJmaWxlIjoib2lkYy1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vc3JjL0xvZy5qcyc7XG5pbXBvcnQgeyBPaWRjQ2xpZW50IH0gZnJvbSAnLi9zcmMvT2lkY0NsaWVudC5qcyc7XG5pbXBvcnQgeyBPaWRjQ2xpZW50U2V0dGluZ3MgfSBmcm9tICcuL3NyYy9PaWRjQ2xpZW50U2V0dGluZ3MuanMnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZVN0YXRlU3RvcmUgfSBmcm9tICcuL3NyYy9XZWJTdG9yYWdlU3RhdGVTdG9yZS5qcyc7XG5pbXBvcnQgeyBJbk1lbW9yeVdlYlN0b3JhZ2UgfSBmcm9tICcuL3NyYy9Jbk1lbW9yeVdlYlN0b3JhZ2UuanMnO1xuaW1wb3J0IHsgVXNlck1hbmFnZXIgfSBmcm9tICcuL3NyYy9Vc2VyTWFuYWdlci5qcyc7XG5pbXBvcnQgeyBBY2Nlc3NUb2tlbkV2ZW50cyB9IGZyb20gJy4vc3JjL0FjY2Vzc1Rva2VuRXZlbnRzLmpzJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vc3JjL01ldGFkYXRhU2VydmljZS5qcyc7XG5pbXBvcnQgeyBDb3Jkb3ZhUG9wdXBOYXZpZ2F0b3IgfSBmcm9tICcuL3NyYy9Db3Jkb3ZhUG9wdXBOYXZpZ2F0b3IuanMnO1xuaW1wb3J0IHsgQ29yZG92YUlGcmFtZU5hdmlnYXRvciB9IGZyb20gJy4vc3JjL0NvcmRvdmFJRnJhbWVOYXZpZ2F0b3IuanMnO1xuaW1wb3J0IHsgQ2hlY2tTZXNzaW9uSUZyYW1lIH0gZnJvbSAnLi9zcmMvQ2hlY2tTZXNzaW9uSUZyYW1lLmpzJztcbmltcG9ydCB7IFRva2VuUmV2b2NhdGlvbkNsaWVudCB9IGZyb20gJy4vc3JjL1Rva2VuUmV2b2NhdGlvbkNsaWVudC5qcyc7XG5pbXBvcnQgeyBTZXNzaW9uTW9uaXRvciB9IGZyb20gJy4vc3JjL1Nlc3Npb25Nb25pdG9yLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vc3JjL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi9zcmMvVXNlci5qcyc7XG5cbmltcG9ydCB7IFZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24uanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgVmVyc2lvbixcbiAgICBMb2csXG4gICAgT2lkY0NsaWVudCxcbiAgICBPaWRjQ2xpZW50U2V0dGluZ3MsXG4gICAgV2ViU3RvcmFnZVN0YXRlU3RvcmUsXG4gICAgSW5NZW1vcnlXZWJTdG9yYWdlLFxuICAgIFVzZXJNYW5hZ2VyLFxuICAgIEFjY2Vzc1Rva2VuRXZlbnRzLFxuICAgIE1ldGFkYXRhU2VydmljZSxcbiAgICBDb3Jkb3ZhUG9wdXBOYXZpZ2F0b3IsXG4gICAgQ29yZG92YUlGcmFtZU5hdmlnYXRvcixcbiAgICBDaGVja1Nlc3Npb25JRnJhbWUsXG4gICAgVG9rZW5SZXZvY2F0aW9uQ2xpZW50LFxuICAgIFNlc3Npb25Nb25pdG9yLFxuICAgIEdsb2JhbCxcbiAgICBVc2VyXG59O1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgdmFyIGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aCkpKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0cm9vdC5DcnlwdG9KUyA9IGZhY3RvcnkoKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cblx0LypnbG9iYWxzIHdpbmRvdywgZ2xvYmFsLCByZXF1aXJlKi9cblxuXHQvKipcblx0ICogQ3J5cHRvSlMgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0dmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgKGZ1bmN0aW9uIChNYXRoLCB1bmRlZmluZWQpIHtcblxuXHQgICAgdmFyIGNyeXB0bztcblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIHdpbmRvdyAoQnJvd3Nlcilcblx0ICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gd2luZG93LmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBpbiB3ZWIgd29ya2VyIChCcm93c2VyKVxuXHQgICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHNlbGYuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gd29ya2VyXG5cdCAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gZ2xvYmFsVGhpcy5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSAoZXhwZXJpbWVudGFsIElFIDExKSBjcnlwdG8gZnJvbSB3aW5kb3cgKEJyb3dzZXIpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubXNDcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSB3aW5kb3cubXNDcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSBnbG9iYWwgKE5vZGVKUylcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBnbG9iYWwuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGltcG9ydCB2aWEgcmVxdWlyZSAoTm9kZUpTKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblx0ICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICB9XG5cblx0ICAgIC8qXG5cdCAgICAgKiBDcnlwdG9ncmFwaGljYWxseSBzZWN1cmUgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3Jcblx0ICAgICAqXG5cdCAgICAgKiBBcyBNYXRoLnJhbmRvbSgpIGlzIGNyeXB0b2dyYXBoaWNhbGx5IG5vdCBzYWZlIHRvIHVzZVxuXHQgICAgICovXG5cdCAgICB2YXIgY3J5cHRvU2VjdXJlUmFuZG9tSW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmIChjcnlwdG8pIHtcblx0ICAgICAgICAgICAgLy8gVXNlIGdldFJhbmRvbVZhbHVlcyBtZXRob2QgKEJyb3dzZXIpXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoMSkpWzBdO1xuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gVXNlIHJhbmRvbUJ5dGVzIG1ldGhvZCAoTm9kZUpTKVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0by5yYW5kb21CeXRlcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKDQpLnJlYWRJbnQzMkxFKCk7XG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hdGl2ZSBjcnlwdG8gbW9kdWxlIGNvdWxkIG5vdCBiZSB1c2VkIHRvIGdldCBzZWN1cmUgcmFuZG9tIG51bWJlci4nKTtcblx0ICAgIH07XG5cblx0ICAgIC8qXG5cdCAgICAgKiBMb2NhbCBwb2x5ZmlsbCBvZiBPYmplY3QuY3JlYXRlXG5cblx0ICAgICAqL1xuXHQgICAgdmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBGKCkge31cblxuXHQgICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG5cdCAgICAgICAgICAgIHZhciBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gb2JqO1xuXG5cdCAgICAgICAgICAgIHN1YnR5cGUgPSBuZXcgRigpO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gbnVsbDtcblxuXHQgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICB9O1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDcnlwdG9KUyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGlicmFyeSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2xpYiA9IEMubGliID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZSBvYmplY3QgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZSA9IChmdW5jdGlvbiAoKSB7XG5cblxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdmVycmlkZXMgUHJvcGVydGllcyB0byBjb3B5IGludG8gdGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnLFxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIG1ldGhvZDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTcGF3blxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YnR5cGUgPSBjcmVhdGUodGhpcyk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEF1Z21lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLm1peEluKG92ZXJyaWRlcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGluaXRpYWxpemVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIXN1YnR5cGUuaGFzT3duUHJvcGVydHkoJ2luaXQnKSB8fCB0aGlzLmluaXQgPT09IHN1YnR5cGUuaW5pdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemVyJ3MgcHJvdG90eXBlIGlzIHRoZSBzdWJ0eXBlIG9iamVjdFxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0LnByb3RvdHlwZSA9IHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlZmVyZW5jZSBzdXBlcnR5cGVcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyID0gdGhpcztcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEV4dGVuZHMgdGhpcyBvYmplY3QgYW5kIHJ1bnMgdGhlIGluaXQgbWV0aG9kLlxuXHQgICAgICAgICAgICAgKiBBcmd1bWVudHMgdG8gY3JlYXRlKCkgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgaW5zdGFuY2UgPSBNeVR5cGUuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZXh0ZW5kKCk7XG5cdCAgICAgICAgICAgICAgICBpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBvYmplY3QuXG5cdCAgICAgICAgICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGFkZCBzb21lIGxvZ2ljIHdoZW4geW91ciBvYmplY3RzIGFyZSBjcmVhdGVkLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgICAgICAvLyAuLi5cblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ29waWVzIHByb3BlcnRpZXMgaW50byB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdG8gbWl4IGluLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgTXlUeXBlLm1peEluKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJ1xuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBtaXhJbjogZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJRSB3b24ndCBjb3B5IHRvU3RyaW5nIHVzaW5nIHRoZSBsb29wIGFib3ZlXG5cdCAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBwcm9wZXJ0aWVzLnRvU3RyaW5nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBpbnN0YW5jZS5jbG9uZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSwgNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogNDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlbmNvZGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uY2F0ZW5hdGVzIGEgd29yZCBhcnJheSB0byB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5IHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkxLmNvbmNhdCh3b3JkQXJyYXkyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB0aGlzV29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhpc1NpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRTaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB0aGlzLmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29uY2F0XG5cdCAgICAgICAgICAgIGlmICh0aGlzU2lnQnl0ZXMgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0Qnl0ZSA9ICh0aGF0V29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpc1NpZ0J5dGVzICsgaSkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhhdFNpZ0J5dGVzOyBqICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGopID4+PiAyXSA9IHRoYXRXb3Jkc1tqID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5CeXRlczsgaSArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkcy5wdXNoKGNyeXB0b1NlY3VyZVJhbmRvbUludCgpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVNpZ0J5dGVzID0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IHRoaXMuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJsb2NrcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJsb2Nrc1JlYWR5ID0gZGF0YVNpZ0J5dGVzIC8gYmxvY2tTaXplQnl0ZXM7XG5cdCAgICAgICAgICAgIGlmIChkb0ZsdXNoKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCB1cCB0byBpbmNsdWRlIHBhcnRpYWwgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLmNlaWwobkJsb2Nrc1JlYWR5KTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIGRvd24gdG8gaW5jbHVkZSBvbmx5IGZ1bGwgYmxvY2tzLFxuXHQgICAgICAgICAgICAgICAgLy8gbGVzcyB0aGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IG11c3QgcmVtYWluIGluIHRoZSBidWZmZXJcblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGgubWF4KChuQmxvY2tzUmVhZHkgfCAwKSAtIHRoaXMuX21pbkJ1ZmZlclNpemUsIDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgd29yZHMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5Xb3Jkc1JlYWR5ID0gbkJsb2Nrc1JlYWR5ICogYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJ5dGVzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQnl0ZXNSZWFkeSA9IE1hdGgubWluKG5Xb3Jkc1JlYWR5ICogNCwgZGF0YVNpZ0J5dGVzKTtcblxuXHQgICAgICAgICAgICAvLyBQcm9jZXNzIGJsb2Nrc1xuXHQgICAgICAgICAgICBpZiAobldvcmRzUmVhZHkpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IG5Xb3Jkc1JlYWR5OyBvZmZzZXQgKz0gYmxvY2tTaXplKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1hbGdvcml0aG0gbG9naWNcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb1Byb2Nlc3NCbG9jayhkYXRhV29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBwcm9jZXNzZWQgd29yZHNcblx0ICAgICAgICAgICAgICAgIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBCYXNlNjQgZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlNjQgPSBDX2VuYy5CYXNlNjQgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBCYXNlNjQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgYmFzZTY0U3RyaW5nID0gQ3J5cHRvSlMuZW5jLkJhc2U2NC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGJhc2U2NENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkgKz0gMykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUxID0gKHdvcmRzW2kgPj4+IDJdICAgICAgID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICAgICAgICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMiA9ICh3b3Jkc1soaSArIDEpID4+PiAyXSA+Pj4gKDI0IC0gKChpICsgMSkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTMgPSAod29yZHNbKGkgKyAyKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDIpICUgNCkgKiA4KSkgJiAweGZmO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgdHJpcGxldCA9IChieXRlMSA8PCAxNikgfCAoYnl0ZTIgPDwgOCkgfCBieXRlMztcblxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IChqIDwgNCkgJiYgKGkgKyBqICogMC43NSA8IHNpZ0J5dGVzKTsgaisrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmFzZTY0Q2hhcnMucHVzaChtYXAuY2hhckF0KCh0cmlwbGV0ID4+PiAoNiAqICgzIC0gaikpKSAmIDB4M2YpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nQ2hhciA9IG1hcC5jaGFyQXQoNjQpO1xuXHQgICAgICAgICAgICBpZiAocGFkZGluZ0NoYXIpIHtcblx0ICAgICAgICAgICAgICAgIHdoaWxlIChiYXNlNjRDaGFycy5sZW5ndGggJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmFzZTY0Q2hhcnMucHVzaChwYWRkaW5nQ2hhcik7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gYmFzZTY0Q2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgQmFzZTY0IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZTY0U3RyIFRoZSBCYXNlNjQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5CYXNlNjQucGFyc2UoYmFzZTY0U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGJhc2U2NFN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGJhc2U2NFN0ckxlbmd0aCA9IGJhc2U2NFN0ci5sZW5ndGg7XG5cdCAgICAgICAgICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG5cdCAgICAgICAgICAgIHZhciByZXZlcnNlTWFwID0gdGhpcy5fcmV2ZXJzZU1hcDtcblxuXHQgICAgICAgICAgICBpZiAoIXJldmVyc2VNYXApIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXZlcnNlTWFwID0gdGhpcy5fcmV2ZXJzZU1hcCA9IFtdO1xuXHQgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWFwLmxlbmd0aDsgaisrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldmVyc2VNYXBbbWFwLmNoYXJDb2RlQXQoaildID0gajtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJZ25vcmUgcGFkZGluZ1xuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ0NoYXIgPSBtYXAuY2hhckF0KDY0KTtcblx0ICAgICAgICAgICAgaWYgKHBhZGRpbmdDaGFyKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcGFkZGluZ0luZGV4ID0gYmFzZTY0U3RyLmluZGV4T2YocGFkZGluZ0NoYXIpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHBhZGRpbmdJbmRleCAhPT0gLTEpIHtcblx0ICAgICAgICAgICAgICAgICAgICBiYXNlNjRTdHJMZW5ndGggPSBwYWRkaW5nSW5kZXg7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHJldHVybiBwYXJzZUxvb3AoYmFzZTY0U3RyLCBiYXNlNjRTdHJMZW5ndGgsIHJldmVyc2VNYXApO1xuXG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9tYXA6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSdcblx0ICAgIH07XG5cblx0ICAgIGZ1bmN0aW9uIHBhcnNlTG9vcChiYXNlNjRTdHIsIGJhc2U2NFN0ckxlbmd0aCwgcmV2ZXJzZU1hcCkge1xuXHQgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgdmFyIG5CeXRlcyA9IDA7XG5cdCAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZTY0U3RyTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgIGlmIChpICUgNCkge1xuXHQgICAgICAgICAgICAgIHZhciBiaXRzMSA9IHJldmVyc2VNYXBbYmFzZTY0U3RyLmNoYXJDb2RlQXQoaSAtIDEpXSA8PCAoKGkgJSA0KSAqIDIpO1xuXHQgICAgICAgICAgICAgIHZhciBiaXRzMiA9IHJldmVyc2VNYXBbYmFzZTY0U3RyLmNoYXJDb2RlQXQoaSldID4+PiAoNiAtIChpICUgNCkgKiAyKTtcblx0ICAgICAgICAgICAgICB2YXIgYml0c0NvbWJpbmVkID0gYml0czEgfCBiaXRzMjtcblx0ICAgICAgICAgICAgICB3b3Jkc1tuQnl0ZXMgPj4+IDJdIHw9IGJpdHNDb21iaW5lZCA8PCAoMjQgLSAobkJ5dGVzICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgICBuQnl0ZXMrKztcblx0ICAgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gV29yZEFycmF5LmNyZWF0ZSh3b3JkcywgbkJ5dGVzKTtcblx0ICAgIH1cblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5lbmMuQmFzZTY0O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHRyZXR1cm4gQ3J5cHRvSlMuZW5jLkhleDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gSW5pdGlhbGl6YXRpb24gYW5kIHJvdW5kIGNvbnN0YW50cyB0YWJsZXNcblx0ICAgIHZhciBIID0gW107XG5cdCAgICB2YXIgSyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBpc1ByaW1lKG4pIHtcblx0ICAgICAgICAgICAgdmFyIHNxcnROID0gTWF0aC5zcXJ0KG4pO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBmYWN0b3IgPSAyOyBmYWN0b3IgPD0gc3FydE47IGZhY3RvcisrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIShuICUgZmFjdG9yKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGZ1bmN0aW9uIGdldEZyYWN0aW9uYWxCaXRzKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuICgobiAtIChuIHwgMCkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgbiA9IDI7XG5cdCAgICAgICAgdmFyIG5QcmltZSA9IDA7XG5cdCAgICAgICAgd2hpbGUgKG5QcmltZSA8IDY0KSB7XG5cdCAgICAgICAgICAgIGlmIChpc1ByaW1lKG4pKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoblByaW1lIDwgOCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEhbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAyKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBLW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMykpO1xuXG5cdCAgICAgICAgICAgICAgICBuUHJpbWUrKztcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIG4rKztcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3Rcblx0ICAgIHZhciBXID0gW107XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTI1NiBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTI1NiA9IENfYWxnby5TSEEyNTYgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KEguc2xpY2UoMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblx0ICAgICAgICAgICAgdmFyIGUgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgZiA9IEhbNV07XG5cdCAgICAgICAgICAgIHZhciBnID0gSFs2XTtcblx0ICAgICAgICAgICAgdmFyIGggPSBIWzddO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBNW29mZnNldCArIGldIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHggPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMCAgPSAoKGdhbW1hMHggPDwgMjUpIHwgKGdhbW1hMHggPj4+IDcpKSAgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTB4IDw8IDE0KSB8IChnYW1tYTB4ID4+PiAxOCkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWEweCA+Pj4gMyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCA9IFdbaSAtIDJdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTEgID0gKChnYW1tYTF4IDw8IDE1KSB8IChnYW1tYTF4ID4+PiAxNykpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWExeCA8PCAxMykgfCAoZ2FtbWExeCA+Pj4gMTkpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMXggPj4+IDEwKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIGNoICA9IChlICYgZikgXiAofmUgJiBnKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWogPSAoYSAmIGIpIF4gKGEgJiBjKSBeIChiICYgYyk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTAgPSAoKGEgPDwgMzApIHwgKGEgPj4+IDIpKSBeICgoYSA8PCAxOSkgfCAoYSA+Pj4gMTMpKSBeICgoYSA8PCAxMCkgfCAoYSA+Pj4gMjIpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTEgPSAoKGUgPDwgMjYpIHwgKGUgPj4+IDYpKSBeICgoZSA8PCAyMSkgfCAoZSA+Pj4gMTEpKSBeICgoZSA8PCA3KSAgfCAoZSA+Pj4gMjUpKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxID0gaCArIHNpZ21hMSArIGNoICsgS1tpXSArIFdbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgdDIgPSBzaWdtYTAgKyBtYWo7XG5cblx0ICAgICAgICAgICAgICAgIGggPSBnO1xuXHQgICAgICAgICAgICAgICAgZyA9IGY7XG5cdCAgICAgICAgICAgICAgICBmID0gZTtcblx0ICAgICAgICAgICAgICAgIGUgPSAoZCArIHQxKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBkID0gYztcblx0ICAgICAgICAgICAgICAgIGMgPSBiO1xuXHQgICAgICAgICAgICAgICAgYiA9IGE7XG5cdCAgICAgICAgICAgICAgICBhID0gKHQxICsgdDIpIHwgMDtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICAgICAgSFs0XSA9IChIWzRdICsgZSkgfCAwO1xuXHQgICAgICAgICAgICBIWzVdID0gKEhbNV0gKyBmKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNl0gPSAoSFs2XSArIGcpIHwgMDtcblx0ICAgICAgICAgICAgSFs3XSA9IChIWzddICsgaCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBkYXRhV29yZHMubGVuZ3RoICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1Nih3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTI1NiA9IEhhc2hlci5fY3JlYXRlSGVscGVyKFNIQTI1Nik7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMjU2KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTI1NiA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihTSEEyNTYpO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEyNTY7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4veDY0LWNvcmVcIiksIHJlcXVpcmUoXCIuL3NoYTUxMlwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi94NjQtY29yZVwiLCBcIi4vc2hhNTEyXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQ7XG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQ7XG5cdCAgICB2YXIgWDY0V29yZEFycmF5ID0gQ194NjQuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblx0ICAgIHZhciBTSEE1MTIgPSBDX2FsZ28uU0hBNTEyO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0zODQgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEzODQgPSBDX2FsZ28uU0hBMzg0ID0gU0hBNTEyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBYNjRXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4Y2JiYjlkNWQsIDB4YzEwNTllZDgpLCBuZXcgWDY0V29yZC5pbml0KDB4NjI5YTI5MmEsIDB4MzY3Y2Q1MDcpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDkxNTkwMTVhLCAweDMwNzBkZDE3KSwgbmV3IFg2NFdvcmQuaW5pdCgweDE1MmZlY2Q4LCAweGY3MGU1OTM5KSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg2NzMzMjY2NywgMHhmZmMwMGIzMSksIG5ldyBYNjRXb3JkLmluaXQoMHg4ZWI0NGE4NywgMHg2ODU4MTUxMSksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4ZGIwYzJlMGQsIDB4NjRmOThmYTcpLCBuZXcgWDY0V29yZC5pbml0KDB4NDdiNTQ4MWQsIDB4YmVmYTRmYTQpXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IFNIQTUxMi5fZG9GaW5hbGl6ZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIGhhc2guc2lnQnl0ZXMgLT0gMTY7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEzODQoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTM4NCh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTM4NCA9IFNIQTUxMi5fY3JlYXRlSGVscGVyKFNIQTM4NCk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMzg0KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTM4NCA9IFNIQTUxMi5fY3JlYXRlSG1hY0hlbHBlcihTSEEzODQpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTM4NDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi94NjQtY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi94NjQtY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX3g2NCA9IEMueDY0O1xuXHQgICAgdmFyIFg2NFdvcmQgPSBDX3g2NC5Xb3JkO1xuXHQgICAgdmFyIFg2NFdvcmRBcnJheSA9IENfeDY0LldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIGZ1bmN0aW9uIFg2NFdvcmRfY3JlYXRlKCkge1xuXHQgICAgICAgIHJldHVybiBYNjRXb3JkLmNyZWF0ZS5hcHBseShYNjRXb3JkLCBhcmd1bWVudHMpO1xuXHQgICAgfVxuXG5cdCAgICAvLyBDb25zdGFudHNcblx0ICAgIHZhciBLID0gW1xuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NDI4YTJmOTgsIDB4ZDcyOGFlMjIpLCBYNjRXb3JkX2NyZWF0ZSgweDcxMzc0NDkxLCAweDIzZWY2NWNkKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGI1YzBmYmNmLCAweGVjNGQzYjJmKSwgWDY0V29yZF9jcmVhdGUoMHhlOWI1ZGJhNSwgMHg4MTg5ZGJiYyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgzOTU2YzI1YiwgMHhmMzQ4YjUzOCksIFg2NFdvcmRfY3JlYXRlKDB4NTlmMTExZjEsIDB4YjYwNWQwMTkpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4OTIzZjgyYTQsIDB4YWYxOTRmOWIpLCBYNjRXb3JkX2NyZWF0ZSgweGFiMWM1ZWQ1LCAweGRhNmQ4MTE4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGQ4MDdhYTk4LCAweGEzMDMwMjQyKSwgWDY0V29yZF9jcmVhdGUoMHgxMjgzNWIwMSwgMHg0NTcwNmZiZSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyNDMxODViZSwgMHg0ZWU0YjI4YyksIFg2NFdvcmRfY3JlYXRlKDB4NTUwYzdkYzMsIDB4ZDVmZmI0ZTIpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NzJiZTVkNzQsIDB4ZjI3Yjg5NmYpLCBYNjRXb3JkX2NyZWF0ZSgweDgwZGViMWZlLCAweDNiMTY5NmIxKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDliZGMwNmE3LCAweDI1YzcxMjM1KSwgWDY0V29yZF9jcmVhdGUoMHhjMTliZjE3NCwgMHhjZjY5MjY5NCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhlNDliNjljMSwgMHg5ZWYxNGFkMiksIFg2NFdvcmRfY3JlYXRlKDB4ZWZiZTQ3ODYsIDB4Mzg0ZjI1ZTMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MGZjMTlkYzYsIDB4OGI4Y2Q1YjUpLCBYNjRXb3JkX2NyZWF0ZSgweDI0MGNhMWNjLCAweDc3YWM5YzY1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDJkZTkyYzZmLCAweDU5MmIwMjc1KSwgWDY0V29yZF9jcmVhdGUoMHg0YTc0ODRhYSwgMHg2ZWE2ZTQ4MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg1Y2IwYTlkYywgMHhiZDQxZmJkNCksIFg2NFdvcmRfY3JlYXRlKDB4NzZmOTg4ZGEsIDB4ODMxMTUzYjUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4OTgzZTUxNTIsIDB4ZWU2NmRmYWIpLCBYNjRXb3JkX2NyZWF0ZSgweGE4MzFjNjZkLCAweDJkYjQzMjEwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGIwMDMyN2M4LCAweDk4ZmIyMTNmKSwgWDY0V29yZF9jcmVhdGUoMHhiZjU5N2ZjNywgMHhiZWVmMGVlNCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhjNmUwMGJmMywgMHgzZGE4OGZjMiksIFg2NFdvcmRfY3JlYXRlKDB4ZDVhNzkxNDcsIDB4OTMwYWE3MjUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MDZjYTYzNTEsIDB4ZTAwMzgyNmYpLCBYNjRXb3JkX2NyZWF0ZSgweDE0MjkyOTY3LCAweDBhMGU2ZTcwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI3YjcwYTg1LCAweDQ2ZDIyZmZjKSwgWDY0V29yZF9jcmVhdGUoMHgyZTFiMjEzOCwgMHg1YzI2YzkyNiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg0ZDJjNmRmYywgMHg1YWM0MmFlZCksIFg2NFdvcmRfY3JlYXRlKDB4NTMzODBkMTMsIDB4OWQ5NWIzZGYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NjUwYTczNTQsIDB4OGJhZjYzZGUpLCBYNjRXb3JkX2NyZWF0ZSgweDc2NmEwYWJiLCAweDNjNzdiMmE4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDgxYzJjOTJlLCAweDQ3ZWRhZWU2KSwgWDY0V29yZF9jcmVhdGUoMHg5MjcyMmM4NSwgMHgxNDgyMzUzYiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhhMmJmZThhMSwgMHg0Y2YxMDM2NCksIFg2NFdvcmRfY3JlYXRlKDB4YTgxYTY2NGIsIDB4YmM0MjMwMDEpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YzI0YjhiNzAsIDB4ZDBmODk3OTEpLCBYNjRXb3JkX2NyZWF0ZSgweGM3NmM1MWEzLCAweDA2NTRiZTMwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGQxOTJlODE5LCAweGQ2ZWY1MjE4KSwgWDY0V29yZF9jcmVhdGUoMHhkNjk5MDYyNCwgMHg1NTY1YTkxMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhmNDBlMzU4NSwgMHg1NzcxMjAyYSksIFg2NFdvcmRfY3JlYXRlKDB4MTA2YWEwNzAsIDB4MzJiYmQxYjgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MTlhNGMxMTYsIDB4YjhkMmQwYzgpLCBYNjRXb3JkX2NyZWF0ZSgweDFlMzc2YzA4LCAweDUxNDFhYjUzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI3NDg3NzRjLCAweGRmOGVlYjk5KSwgWDY0V29yZF9jcmVhdGUoMHgzNGIwYmNiNSwgMHhlMTliNDhhOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgzOTFjMGNiMywgMHhjNWM5NWE2MyksIFg2NFdvcmRfY3JlYXRlKDB4NGVkOGFhNGEsIDB4ZTM0MThhY2IpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NWI5Y2NhNGYsIDB4Nzc2M2UzNzMpLCBYNjRXb3JkX2NyZWF0ZSgweDY4MmU2ZmYzLCAweGQ2YjJiOGEzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDc0OGY4MmVlLCAweDVkZWZiMmZjKSwgWDY0V29yZF9jcmVhdGUoMHg3OGE1NjM2ZiwgMHg0MzE3MmY2MCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg4NGM4NzgxNCwgMHhhMWYwYWI3MiksIFg2NFdvcmRfY3JlYXRlKDB4OGNjNzAyMDgsIDB4MWE2NDM5ZWMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4OTBiZWZmZmEsIDB4MjM2MzFlMjgpLCBYNjRXb3JkX2NyZWF0ZSgweGE0NTA2Y2ViLCAweGRlODJiZGU5KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGJlZjlhM2Y3LCAweGIyYzY3OTE1KSwgWDY0V29yZF9jcmVhdGUoMHhjNjcxNzhmMiwgMHhlMzcyNTMyYiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhjYTI3M2VjZSwgMHhlYTI2NjE5YyksIFg2NFdvcmRfY3JlYXRlKDB4ZDE4NmI4YzcsIDB4MjFjMGMyMDcpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZWFkYTdkZDYsIDB4Y2RlMGViMWUpLCBYNjRXb3JkX2NyZWF0ZSgweGY1N2Q0ZjdmLCAweGVlNmVkMTc4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDA2ZjA2N2FhLCAweDcyMTc2ZmJhKSwgWDY0V29yZF9jcmVhdGUoMHgwYTYzN2RjNSwgMHhhMmM4OThhNiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgxMTNmOTgwNCwgMHhiZWY5MGRhZSksIFg2NFdvcmRfY3JlYXRlKDB4MWI3MTBiMzUsIDB4MTMxYzQ3MWIpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MjhkYjc3ZjUsIDB4MjMwNDdkODQpLCBYNjRXb3JkX2NyZWF0ZSgweDMyY2FhYjdiLCAweDQwYzcyNDkzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDNjOWViZTBhLCAweDE1YzliZWJjKSwgWDY0V29yZF9jcmVhdGUoMHg0MzFkNjdjNCwgMHg5YzEwMGQ0YyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg0Y2M1ZDRiZSwgMHhjYjNlNDJiNiksIFg2NFdvcmRfY3JlYXRlKDB4NTk3ZjI5OWMsIDB4ZmM2NTdlMmEpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NWZjYjZmYWIsIDB4M2FkNmZhZWMpLCBYNjRXb3JkX2NyZWF0ZSgweDZjNDQxOThjLCAweDRhNDc1ODE3KVxuXHQgICAgXTtcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0c1xuXHQgICAgdmFyIFcgPSBbXTtcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG5cdCAgICAgICAgICAgIFdbaV0gPSBYNjRXb3JkX2NyZWF0ZSgpO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTUxMiBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTUxMiA9IENfYWxnby5TSEE1MTIgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFg2NFdvcmRBcnJheS5pbml0KFtcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg2YTA5ZTY2NywgMHhmM2JjYzkwOCksIG5ldyBYNjRXb3JkLmluaXQoMHhiYjY3YWU4NSwgMHg4NGNhYTczYiksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4M2M2ZWYzNzIsIDB4ZmU5NGY4MmIpLCBuZXcgWDY0V29yZC5pbml0KDB4YTU0ZmY1M2EsIDB4NWYxZDM2ZjEpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDUxMGU1MjdmLCAweGFkZTY4MmQxKSwgbmV3IFg2NFdvcmQuaW5pdCgweDliMDU2ODhjLCAweDJiM2U2YzFmKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHgxZjgzZDlhYiwgMHhmYjQxYmQ2YiksIG5ldyBYNjRXb3JkLmluaXQoMHg1YmUwY2QxOSwgMHgxMzdlMjE3OSlcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBIMCA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBIMSA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBIMiA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBIMyA9IEhbM107XG5cdCAgICAgICAgICAgIHZhciBINCA9IEhbNF07XG5cdCAgICAgICAgICAgIHZhciBINSA9IEhbNV07XG5cdCAgICAgICAgICAgIHZhciBINiA9IEhbNl07XG5cdCAgICAgICAgICAgIHZhciBINyA9IEhbN107XG5cblx0ICAgICAgICAgICAgdmFyIEgwaCA9IEgwLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIMGwgPSBIMC5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIMWggPSBIMS5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDFsID0gSDEubG93O1xuXHQgICAgICAgICAgICB2YXIgSDJoID0gSDIuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgybCA9IEgyLmxvdztcblx0ICAgICAgICAgICAgdmFyIEgzaCA9IEgzLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIM2wgPSBIMy5sb3c7XG5cdCAgICAgICAgICAgIHZhciBINGggPSBINC5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDRsID0gSDQubG93O1xuXHQgICAgICAgICAgICB2YXIgSDVoID0gSDUuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg1bCA9IEg1Lmxvdztcblx0ICAgICAgICAgICAgdmFyIEg2aCA9IEg2LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBINmwgPSBINi5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIN2ggPSBINy5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDdsID0gSDcubG93O1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhaCA9IEgwaDtcblx0ICAgICAgICAgICAgdmFyIGFsID0gSDBsO1xuXHQgICAgICAgICAgICB2YXIgYmggPSBIMWg7XG5cdCAgICAgICAgICAgIHZhciBibCA9IEgxbDtcblx0ICAgICAgICAgICAgdmFyIGNoID0gSDJoO1xuXHQgICAgICAgICAgICB2YXIgY2wgPSBIMmw7XG5cdCAgICAgICAgICAgIHZhciBkaCA9IEgzaDtcblx0ICAgICAgICAgICAgdmFyIGRsID0gSDNsO1xuXHQgICAgICAgICAgICB2YXIgZWggPSBINGg7XG5cdCAgICAgICAgICAgIHZhciBlbCA9IEg0bDtcblx0ICAgICAgICAgICAgdmFyIGZoID0gSDVoO1xuXHQgICAgICAgICAgICB2YXIgZmwgPSBINWw7XG5cdCAgICAgICAgICAgIHZhciBnaCA9IEg2aDtcblx0ICAgICAgICAgICAgdmFyIGdsID0gSDZsO1xuXHQgICAgICAgICAgICB2YXIgaGggPSBIN2g7XG5cdCAgICAgICAgICAgIHZhciBobCA9IEg3bDtcblxuXHQgICAgICAgICAgICAvLyBSb3VuZHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgV2lsO1xuXHQgICAgICAgICAgICAgICAgdmFyIFdpaDtcblxuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBXaSA9IFdbaV07XG5cblx0ICAgICAgICAgICAgICAgIC8vIEV4dGVuZCBtZXNzYWdlXG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgV2loID0gV2kuaGlnaCA9IE1bb2Zmc2V0ICsgaSAqIDJdICAgICB8IDA7XG5cdCAgICAgICAgICAgICAgICAgICAgV2lsID0gV2kubG93ICA9IE1bb2Zmc2V0ICsgaSAqIDIgKyAxXSB8IDA7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIEdhbW1hMFxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4ICA9IFdbaSAtIDE1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweGggPSBnYW1tYTB4LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHhsID0gZ2FtbWEweC5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMGggID0gKChnYW1tYTB4aCA+Pj4gMSkgfCAoZ2FtbWEweGwgPDwgMzEpKSBeICgoZ2FtbWEweGggPj4+IDgpIHwgKGdhbW1hMHhsIDw8IDI0KSkgXiAoZ2FtbWEweGggPj4+IDcpO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTBsICA9ICgoZ2FtbWEweGwgPj4+IDEpIHwgKGdhbW1hMHhoIDw8IDMxKSkgXiAoKGdhbW1hMHhsID4+PiA4KSB8IChnYW1tYTB4aCA8PCAyNCkpIF4gKChnYW1tYTB4bCA+Pj4gNykgfCAoZ2FtbWEweGggPDwgMjUpKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIEdhbW1hMVxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4ICA9IFdbaSAtIDJdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4aCA9IGdhbW1hMXguaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeGwgPSBnYW1tYTF4Lmxvdztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExaCAgPSAoKGdhbW1hMXhoID4+PiAxOSkgfCAoZ2FtbWExeGwgPDwgMTMpKSBeICgoZ2FtbWExeGggPDwgMykgfCAoZ2FtbWExeGwgPj4+IDI5KSkgXiAoZ2FtbWExeGggPj4+IDYpO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTFsICA9ICgoZ2FtbWExeGwgPj4+IDE5KSB8IChnYW1tYTF4aCA8PCAxMykpIF4gKChnYW1tYTF4bCA8PCAzKSB8IChnYW1tYTF4aCA+Pj4gMjkpKSBeICgoZ2FtbWExeGwgPj4+IDYpIHwgKGdhbW1hMXhoIDw8IDI2KSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBXW2ldID0gZ2FtbWEwICsgV1tpIC0gN10gKyBnYW1tYTEgKyBXW2kgLSAxNl1cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2k3ICA9IFdbaSAtIDddO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTdoID0gV2k3LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpN2wgPSBXaTcubG93O1xuXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpMTYgID0gV1tpIC0gMTZdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTE2aCA9IFdpMTYuaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2kxNmwgPSBXaTE2LmxvdztcblxuXHQgICAgICAgICAgICAgICAgICAgIFdpbCA9IGdhbW1hMGwgKyBXaTdsO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IGdhbW1hMGggKyBXaTdoICsgKChXaWwgPj4+IDApIDwgKGdhbW1hMGwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpbCA9IFdpbCArIGdhbW1hMWw7XG5cdCAgICAgICAgICAgICAgICAgICAgV2loID0gV2loICsgZ2FtbWExaCArICgoV2lsID4+PiAwKSA8IChnYW1tYTFsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBXaWwgKyBXaTE2bDtcblx0ICAgICAgICAgICAgICAgICAgICBXaWggPSBXaWggKyBXaTE2aCArICgoV2lsID4+PiAwKSA8IChXaTE2bCA+Pj4gMCkgPyAxIDogMCk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBXaS5oaWdoID0gV2loO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpLmxvdyAgPSBXaWw7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIHZhciBjaGggID0gKGVoICYgZmgpIF4gKH5laCAmIGdoKTtcblx0ICAgICAgICAgICAgICAgIHZhciBjaGwgID0gKGVsICYgZmwpIF4gKH5lbCAmIGdsKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWpoID0gKGFoICYgYmgpIF4gKGFoICYgY2gpIF4gKGJoICYgY2gpO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1hamwgPSAoYWwgJiBibCkgXiAoYWwgJiBjbCkgXiAoYmwgJiBjbCk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTBoID0gKChhaCA+Pj4gMjgpIHwgKGFsIDw8IDQpKSAgXiAoKGFoIDw8IDMwKSAgfCAoYWwgPj4+IDIpKSBeICgoYWggPDwgMjUpIHwgKGFsID4+PiA3KSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwbCA9ICgoYWwgPj4+IDI4KSB8IChhaCA8PCA0KSkgIF4gKChhbCA8PCAzMCkgIHwgKGFoID4+PiAyKSkgXiAoKGFsIDw8IDI1KSB8IChhaCA+Pj4gNykpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMWggPSAoKGVoID4+PiAxNCkgfCAoZWwgPDwgMTgpKSBeICgoZWggPj4+IDE4KSB8IChlbCA8PCAxNCkpIF4gKChlaCA8PCAyMykgfCAoZWwgPj4+IDkpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTFsID0gKChlbCA+Pj4gMTQpIHwgKGVoIDw8IDE4KSkgXiAoKGVsID4+PiAxOCkgfCAoZWggPDwgMTQpKSBeICgoZWwgPDwgMjMpIHwgKGVoID4+PiA5KSk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIHQxID0gaCArIHNpZ21hMSArIGNoICsgS1tpXSArIFdbaV1cblx0ICAgICAgICAgICAgICAgIHZhciBLaSAgPSBLW2ldO1xuXHQgICAgICAgICAgICAgICAgdmFyIEtpaCA9IEtpLmhpZ2g7XG5cdCAgICAgICAgICAgICAgICB2YXIgS2lsID0gS2kubG93O1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gaGwgKyBzaWdtYTFsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IGhoICsgc2lnbWExaCArICgodDFsID4+PiAwKSA8IChobCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gdDFsICsgY2hsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IHQxaCArIGNoaCArICgodDFsID4+PiAwKSA8IChjaGwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IHQxbCArIEtpbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSB0MWggKyBLaWggKyAoKHQxbCA+Pj4gMCkgPCAoS2lsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSB0MWwgKyBXaWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gdDFoICsgV2loICsgKCh0MWwgPj4+IDApIDwgKFdpbCA+Pj4gMCkgPyAxIDogMCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIHQyID0gc2lnbWEwICsgbWFqXG5cdCAgICAgICAgICAgICAgICB2YXIgdDJsID0gc2lnbWEwbCArIG1hamw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDJoID0gc2lnbWEwaCArIG1hamggKyAoKHQybCA+Pj4gMCkgPCAoc2lnbWEwbCA+Pj4gMCkgPyAxIDogMCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB3b3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICAgICAgaGggPSBnaDtcblx0ICAgICAgICAgICAgICAgIGhsID0gZ2w7XG5cdCAgICAgICAgICAgICAgICBnaCA9IGZoO1xuXHQgICAgICAgICAgICAgICAgZ2wgPSBmbDtcblx0ICAgICAgICAgICAgICAgIGZoID0gZWg7XG5cdCAgICAgICAgICAgICAgICBmbCA9IGVsO1xuXHQgICAgICAgICAgICAgICAgZWwgPSAoZGwgKyB0MWwpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGVoID0gKGRoICsgdDFoICsgKChlbCA+Pj4gMCkgPCAoZGwgPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBkaCA9IGNoO1xuXHQgICAgICAgICAgICAgICAgZGwgPSBjbDtcblx0ICAgICAgICAgICAgICAgIGNoID0gYmg7XG5cdCAgICAgICAgICAgICAgICBjbCA9IGJsO1xuXHQgICAgICAgICAgICAgICAgYmggPSBhaDtcblx0ICAgICAgICAgICAgICAgIGJsID0gYWw7XG5cdCAgICAgICAgICAgICAgICBhbCA9ICh0MWwgKyB0MmwpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGFoID0gKHQxaCArIHQyaCArICgoYWwgPj4+IDApIDwgKHQxbCA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEgwbCA9IEgwLmxvdyAgPSAoSDBsICsgYWwpO1xuXHQgICAgICAgICAgICBIMC5oaWdoID0gKEgwaCArIGFoICsgKChIMGwgPj4+IDApIDwgKGFsID4+PiAwKSA/IDEgOiAwKSk7XG5cdCAgICAgICAgICAgIEgxbCA9IEgxLmxvdyAgPSAoSDFsICsgYmwpO1xuXHQgICAgICAgICAgICBIMS5oaWdoID0gKEgxaCArIGJoICsgKChIMWwgPj4+IDApIDwgKGJsID4+PiAwKSA/IDEgOiAwKSk7XG5cdCAgICAgICAgICAgIEgybCA9IEgyLmxvdyAgPSAoSDJsICsgY2wpO1xuXHQgICAgICAgICAgICBIMi5oaWdoID0gKEgyaCArIGNoICsgKChIMmwgPj4+IDApIDwgKGNsID4+PiAwKSA/IDEgOiAwKSk7XG5cdCAgICAgICAgICAgIEgzbCA9IEgzLmxvdyAgPSAoSDNsICsgZGwpO1xuXHQgICAgICAgICAgICBIMy5oaWdoID0gKEgzaCArIGRoICsgKChIM2wgPj4+IDApIDwgKGRsID4+PiAwKSA/IDEgOiAwKSk7XG5cdCAgICAgICAgICAgIEg0bCA9IEg0LmxvdyAgPSAoSDRsICsgZWwpO1xuXHQgICAgICAgICAgICBINC5oaWdoID0gKEg0aCArIGVoICsgKChINGwgPj4+IDApIDwgKGVsID4+PiAwKSA/IDEgOiAwKSk7XG5cdCAgICAgICAgICAgIEg1bCA9IEg1LmxvdyAgPSAoSDVsICsgZmwpO1xuXHQgICAgICAgICAgICBINS5oaWdoID0gKEg1aCArIGZoICsgKChINWwgPj4+IDApIDwgKGZsID4+PiAwKSA/IDEgOiAwKSk7XG5cdCAgICAgICAgICAgIEg2bCA9IEg2LmxvdyAgPSAoSDZsICsgZ2wpO1xuXHQgICAgICAgICAgICBINi5oaWdoID0gKEg2aCArIGdoICsgKChINmwgPj4+IDApIDwgKGdsID4+PiAwKSA/IDEgOiAwKSk7XG5cdCAgICAgICAgICAgIEg3bCA9IEg3LmxvdyAgPSAoSDdsICsgaGwpO1xuXHQgICAgICAgICAgICBINy5oaWdoID0gKEg3aCArIGhoICsgKChIN2wgPj4+IDApIDwgKGhsID4+PiAwKSA/IDEgOiAwKSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDEyOCkgPj4+IDEwKSA8PCA1KSArIDMwXSA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDEyOCkgPj4+IDEwKSA8PCA1KSArIDMxXSA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBkYXRhV29yZHMubGVuZ3RoICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydCBoYXNoIHRvIDMyLWJpdCB3b3JkIGFycmF5IGJlZm9yZSByZXR1cm5pbmdcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9oYXNoLnRvWDMyKCk7XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogMTAyNC8zMlxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEE1MTIoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTUxMih3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTUxMiA9IEhhc2hlci5fY3JlYXRlSGVscGVyKFNIQTUxMik7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBNTEyKG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTUxMiA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihTSEE1MTIpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTUxMjtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICh1bmRlZmluZWQpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlO1xuXHQgICAgdmFyIFgzMldvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiB4NjQgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ194NjQgPSBDLng2NCA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEEgNjQtYml0IHdvcmQuXG5cdCAgICAgKi9cblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZCA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgNjQtYml0IHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaGlnaCBUaGUgaGlnaCAzMiBiaXRzLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsb3cgVGhlIGxvdyAzMiBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgeDY0V29yZCA9IENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDAwMDEwMjAzLCAweDA0MDUwNjA3KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoaGlnaCwgbG93KSB7XG5cdCAgICAgICAgICAgIHRoaXMuaGlnaCA9IGhpZ2g7XG5cdCAgICAgICAgICAgIHRoaXMubG93ID0gbG93O1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgTk9UcyB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgbmVnYXRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBuZWdhdGVkID0geDY0V29yZC5ub3QoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBub3Q6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB+dGhpcy5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gfnRoaXMubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIEFORHMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBBTkQgd2l0aCB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgQU5EaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgYW5kZWQgPSB4NjRXb3JkLmFuZChhbm90aGVyWDY0V29yZCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gYW5kOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCAmIHdvcmQuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93ICYgd29yZC5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgT1JzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gT1Igd2l0aCB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgT1JpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBvcmVkID0geDY0V29yZC5vcihhbm90aGVyWDY0V29yZCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gb3I6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoIHwgd29yZC5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgfCB3b3JkLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBYT1JzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gWE9SIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIFhPUmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHhvcmVkID0geDY0V29yZC54b3IoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHhvcjogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggXiB3b3JkLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyBeIHdvcmQubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBTaGlmdHMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgbGVmdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byBzaGlmdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBzaGlmdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHNoaWZ0ZWQgPSB4NjRXb3JkLnNoaWZ0TCgyNSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gc2hpZnRMOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyBpZiAobiA8IDMyKSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9ICh0aGlzLmhpZ2ggPDwgbikgfCAodGhpcy5sb3cgPj4+ICgzMiAtIG4pKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyA8PCBuO1xuXHQgICAgICAgICAgICAvLyB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmxvdyA8PCAobiAtIDMyKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBsb3cgPSAwO1xuXHQgICAgICAgICAgICAvLyB9XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFNoaWZ0cyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSByaWdodC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byBzaGlmdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBzaGlmdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHNoaWZ0ZWQgPSB4NjRXb3JkLnNoaWZ0Uig3KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBzaGlmdFI6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIGlmIChuIDwgMzIpIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBsb3cgPSAodGhpcy5sb3cgPj4+IG4pIHwgKHRoaXMuaGlnaCA8PCAoMzIgLSBuKSk7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCA+Pj4gbjtcblx0ICAgICAgICAgICAgLy8gfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmhpZ2ggPj4+IChuIC0gMzIpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSAwO1xuXHQgICAgICAgICAgICAvLyB9XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJvdGF0ZXMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgbGVmdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByb3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgcm90YXRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciByb3RhdGVkID0geDY0V29yZC5yb3RMKDI1KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyByb3RMOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyByZXR1cm4gdGhpcy5zaGlmdEwobikub3IodGhpcy5zaGlmdFIoNjQgLSBuKSk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJvdGF0ZXMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgcmlnaHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcm90YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHJvdGF0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcm90YXRlZCA9IHg2NFdvcmQucm90Uig3KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyByb3RSOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyByZXR1cm4gdGhpcy5zaGlmdFIobikub3IodGhpcy5zaGlmdEwoNjQgLSBuKSk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEFkZHMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBhZGQgd2l0aCB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgYWRkaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgYWRkZWQgPSB4NjRXb3JkLmFkZChhbm90aGVyWDY0V29yZCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gYWRkOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gKHRoaXMubG93ICsgd29yZC5sb3cpIHwgMDtcblx0ICAgICAgICAgICAgLy8gdmFyIGNhcnJ5ID0gKGxvdyA+Pj4gMCkgPCAodGhpcy5sb3cgPj4+IDApID8gMSA6IDA7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gKHRoaXMuaGlnaCArIHdvcmQuaGlnaCArIGNhcnJ5KSB8IDA7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgNjQtYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiBDcnlwdG9KUy54NjQuV29yZCBvYmplY3RzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgWDY0V29yZEFycmF5ID0gQ194NjQuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiBDcnlwdG9KUy54NjQuV29yZCBvYmplY3RzLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaWdCeXRlcyAoT3B0aW9uYWwpIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhlIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMueDY0LldvcmRBcnJheS5jcmVhdGUoKTtcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMueDY0LldvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MDAwMTAyMDMsIDB4MDQwNTA2MDcpLFxuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MTgxOTFhMWIsIDB4MWMxZDFlMWYpXG5cdCAgICAgICAgICogICAgIF0pO1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy54NjQuV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgwMDAxMDIwMywgMHgwNDA1MDYwNyksXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgxODE5MWExYiwgMHgxYzFkMWUxZilcblx0ICAgICAgICAgKiAgICAgXSwgMTApO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3b3Jkcywgc2lnQnl0ZXMpIHtcblx0ICAgICAgICAgICAgd29yZHMgPSB0aGlzLndvcmRzID0gd29yZHMgfHwgW107XG5cblx0ICAgICAgICAgICAgaWYgKHNpZ0J5dGVzICE9IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHdvcmRzLmxlbmd0aCAqIDg7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgdGhpcyA2NC1iaXQgd29yZCBhcnJheSB0byBhIDMyLWJpdCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q3J5cHRvSlMubGliLldvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5J3MgZGF0YSBhcyBhIDMyLWJpdCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgeDMyV29yZEFycmF5ID0geDY0V29yZEFycmF5LnRvWDMyKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9YMzI6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB4NjRXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB4NjRXb3Jkc0xlbmd0aCA9IHg2NFdvcmRzLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB4MzJXb3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHg2NFdvcmRzTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciB4NjRXb3JkID0geDY0V29yZHNbaV07XG5cdCAgICAgICAgICAgICAgICB4MzJXb3Jkcy5wdXNoKHg2NFdvcmQuaGlnaCk7XG5cdCAgICAgICAgICAgICAgICB4MzJXb3Jkcy5wdXNoKHg2NFdvcmQubG93KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBYMzJXb3JkQXJyYXkuY3JlYXRlKHgzMldvcmRzLCB0aGlzLnNpZ0J5dGVzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHg2NFdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBcIndvcmRzXCIgYXJyYXlcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIC8vIENsb25lIGVhY2ggWDY0V29yZCBvYmplY3Rcblx0ICAgICAgICAgICAgdmFyIHdvcmRzTGVuZ3RoID0gd29yZHMubGVuZ3RoO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2ldID0gd29yZHNbaV0uY2xvbmUoKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSAnLi9UaW1lci5qcyc7XG5cbmNvbnN0IERlZmF1bHRBY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IDYwOyAvLyBzZWNvbmRzXG5cbmV4cG9ydCBjbGFzcyBBY2Nlc3NUb2tlbkV2ZW50cyB7XG5cbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lID0gRGVmYXVsdEFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyaW5nVGltZXIgPSBuZXcgVGltZXIoXCJBY2Nlc3MgdG9rZW4gZXhwaXJpbmdcIiksXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlZFRpbWVyID0gbmV3IFRpbWVyKFwiQWNjZXNzIHRva2VuIGV4cGlyZWRcIilcbiAgICB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSBhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZTtcblxuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nID0gYWNjZXNzVG9rZW5FeHBpcmluZ1RpbWVyO1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQgPSBhY2Nlc3NUb2tlbkV4cGlyZWRUaW1lcjtcbiAgICB9XG5cbiAgICBsb2FkKGNvbnRhaW5lcikge1xuICAgICAgICAvLyBvbmx5IHJlZ2lzdGVyIGV2ZW50cyBpZiB0aGVyZSdzIGFuIGFjY2VzcyB0b2tlbiBhbmQgaXQgaGFzIGFuIGV4cGlyYXRpb25cbiAgICAgICAgaWYgKGNvbnRhaW5lci5hY2Nlc3NfdG9rZW4gJiYgY29udGFpbmVyLmV4cGlyZXNfaW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gY29udGFpbmVyLmV4cGlyZXNfaW47XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJBY2Nlc3NUb2tlbkV2ZW50cy5sb2FkOiBhY2Nlc3MgdG9rZW4gcHJlc2VudCwgcmVtYWluaW5nIGR1cmF0aW9uOlwiLCBkdXJhdGlvbik7XG5cbiAgICAgICAgICAgIGlmIChkdXJhdGlvbiA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHJlZ2lzdGVyIGV4cGlyaW5nIGlmIHdlIHN0aWxsIGhhdmUgdGltZVxuICAgICAgICAgICAgICAgIGxldCBleHBpcmluZyA9IGR1cmF0aW9uIC0gdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWU7XG4gICAgICAgICAgICAgICAgaWYgKGV4cGlyaW5nIDw9IDApe1xuICAgICAgICAgICAgICAgICAgICBleHBpcmluZyA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkFjY2Vzc1Rva2VuRXZlbnRzLmxvYWQ6IHJlZ2lzdGVyaW5nIGV4cGlyaW5nIHRpbWVyIGluOlwiLCBleHBpcmluZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZy5pbml0KGV4cGlyaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkFjY2Vzc1Rva2VuRXZlbnRzLmxvYWQ6IGNhbmNlbGluZyBleGlzdGluZyBleHBpcmluZyB0aW1lciBiZWNhc2Ugd2UncmUgcGFzdCBleHBpcmF0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBpdCdzIG5lZ2F0aXZlLCBpdCB3aWxsIHN0aWxsIGZpcmVcbiAgICAgICAgICAgIGxldCBleHBpcmVkID0gZHVyYXRpb24gKyAxO1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiQWNjZXNzVG9rZW5FdmVudHMubG9hZDogcmVnaXN0ZXJpbmcgZXhwaXJlZCB0aW1lciBpbjpcIiwgZXhwaXJlZCk7XG4gICAgICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQuaW5pdChleHBpcmVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcuY2FuY2VsKCk7XG4gICAgICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQuY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxvYWQoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkFjY2Vzc1Rva2VuRXZlbnRzLnVubG9hZDogY2FuY2VsaW5nIGV4aXN0aW5nIGFjY2VzcyB0b2tlbiB0aW1lcnNcIik7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJlZC5jYW5jZWwoKTtcbiAgICB9XG5cbiAgICBhZGRBY2Nlc3NUb2tlbkV4cGlyaW5nKGNiKSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZUFjY2Vzc1Rva2VuRXhwaXJpbmcoY2IpIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZy5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG5cbiAgICBhZGRBY2Nlc3NUb2tlbkV4cGlyZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVBY2Nlc3NUb2tlbkV4cGlyZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuY29uc3QgRGVmYXVsdEludGVydmFsID0gMjAwMDtcblxuZXhwb3J0IGNsYXNzIENoZWNrU2Vzc2lvbklGcmFtZSB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2ssIGNsaWVudF9pZCwgdXJsLCBpbnRlcnZhbCwgc3RvcE9uRXJyb3IgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2NsaWVudF9pZCA9IGNsaWVudF9pZDtcbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IGludGVydmFsIHx8IERlZmF1bHRJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5fc3RvcE9uRXJyb3IgPSBzdG9wT25FcnJvcjtcblxuICAgICAgICB2YXIgaWR4ID0gdXJsLmluZGV4T2YoXCIvXCIsIHVybC5pbmRleE9mKFwiLy9cIikgKyAyKTtcbiAgICAgICAgdGhpcy5fZnJhbWVfb3JpZ2luID0gdXJsLnN1YnN0cigwLCBpZHgpO1xuXG4gICAgICAgIHRoaXMuX2ZyYW1lID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG5cbiAgICAgICAgLy8gc2hvdGd1biBhcHByb2FjaFxuICAgICAgICB0aGlzLl9mcmFtZS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGhpcy5fZnJhbWUuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMuX2ZyYW1lLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5fZnJhbWUud2lkdGggPSAwO1xuICAgICAgICB0aGlzLl9mcmFtZS5oZWlnaHQgPSAwO1xuXG4gICAgICAgIHRoaXMuX2ZyYW1lLnNyYyA9IHVybDtcbiAgICB9XG4gICAgbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9mcmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCA9IHRoaXMuX21lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX21lc3NhZ2UoZSkge1xuICAgICAgICBpZiAoZS5vcmlnaW4gPT09IHRoaXMuX2ZyYW1lX29yaWdpbiAmJlxuICAgICAgICAgICAgZS5zb3VyY2UgPT09IHRoaXMuX2ZyYW1lLmNvbnRlbnRXaW5kb3dcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoZS5kYXRhID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJDaGVja1Nlc3Npb25JRnJhbWU6IGVycm9yIG1lc3NhZ2UgZnJvbSBjaGVjayBzZXNzaW9uIG9wIGlmcmFtZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RvcE9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZS5kYXRhID09PSBcImNoYW5nZWRcIikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNoZWNrU2Vzc2lvbklGcmFtZTogY2hhbmdlZCBtZXNzYWdlIGZyb20gY2hlY2sgc2Vzc2lvbiBvcCBpZnJhbWVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNoZWNrU2Vzc2lvbklGcmFtZTogXCIgKyBlLmRhdGEgKyBcIiBtZXNzYWdlIGZyb20gY2hlY2sgc2Vzc2lvbiBvcCBpZnJhbWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnQoc2Vzc2lvbl9zdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5fc2Vzc2lvbl9zdGF0ZSAhPT0gc2Vzc2lvbl9zdGF0ZSkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiQ2hlY2tTZXNzaW9uSUZyYW1lLnN0YXJ0XCIpO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcblxuICAgICAgICAgICAgdGhpcy5fc2Vzc2lvbl9zdGF0ZSA9IHNlc3Npb25fc3RhdGU7XG5cbiAgICAgICAgICAgIGxldCBzZW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UodGhpcy5fY2xpZW50X2lkICsgXCIgXCIgKyB0aGlzLl9zZXNzaW9uX3N0YXRlLCB0aGlzLl9mcmFtZV9vcmlnaW4pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdHJpZ2dlciBub3dcbiAgICAgICAgICAgIHNlbmQoKTtcblxuICAgICAgICAgICAgLy8gYW5kIHNldHVwIHRpbWVyXG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbChzZW5kLCB0aGlzLl9pbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLl9zZXNzaW9uX3N0YXRlID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5fdGltZXIpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNoZWNrU2Vzc2lvbklGcmFtZS5zdG9wXCIpO1xuXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQ2xvY2tTZXJ2aWNlIHtcbiAgICBnZXRFcG9jaFRpbWUoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoRGF0ZS5ub3coKSAvIDEwMDAgfCAwKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBDb3Jkb3ZhUG9wdXBXaW5kb3cgfSBmcm9tICcuL0NvcmRvdmFQb3B1cFdpbmRvdy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yIHtcblxuICAgIHByZXBhcmUocGFyYW1zKSB7XG4gICAgICAgIHBhcmFtcy5wb3B1cFdpbmRvd0ZlYXR1cmVzID0gJ2hpZGRlbj15ZXMnO1xuICAgICAgICBsZXQgcG9wdXAgPSBuZXcgQ29yZG92YVBvcHVwV2luZG93KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocG9wdXApO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IENvcmRvdmFQb3B1cFdpbmRvdyB9IGZyb20gJy4vQ29yZG92YVBvcHVwV2luZG93LmpzJztcblxuZXhwb3J0IGNsYXNzIENvcmRvdmFQb3B1cE5hdmlnYXRvciB7XG5cbiAgICBwcmVwYXJlKHBhcmFtcykge1xuICAgICAgICBsZXQgcG9wdXAgPSBuZXcgQ29yZG92YVBvcHVwV2luZG93KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocG9wdXApO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuY29uc3QgRGVmYXVsdFBvcHVwRmVhdHVyZXMgPSAnbG9jYXRpb249bm8sdG9vbGJhcj1ubyx6b29tPW5vJztcbmNvbnN0IERlZmF1bHRQb3B1cFRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbmV4cG9ydCBjbGFzcyBDb3Jkb3ZhUG9wdXBXaW5kb3cge1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mZWF0dXJlcyA9IHBhcmFtcy5wb3B1cFdpbmRvd0ZlYXR1cmVzIHx8IERlZmF1bHRQb3B1cEZlYXR1cmVzO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHBhcmFtcy5wb3B1cFdpbmRvd1RhcmdldCB8fCBEZWZhdWx0UG9wdXBUYXJnZXQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlZGlyZWN0X3VyaSA9IHBhcmFtcy5zdGFydFVybDtcbiAgICAgICAgTG9nLmRlYnVnKFwiQ29yZG92YVBvcHVwV2luZG93LmN0b3I6IHJlZGlyZWN0X3VyaTogXCIgKyB0aGlzLnJlZGlyZWN0X3VyaSk7XG4gICAgfVxuXG4gICAgX2lzSW5BcHBCcm93c2VySW5zdGFsbGVkKGNvcmRvdmFNZXRhZGF0YSkge1xuICAgICAgICByZXR1cm4gW1wiY29yZG92YS1wbHVnaW4taW5hcHBicm93c2VyXCIsIFwiY29yZG92YS1wbHVnaW4taW5hcHBicm93c2VyLmluYXBwYnJvd3NlclwiLCBcIm9yZy5hcGFjaGUuY29yZG92YS5pbmFwcGJyb3dzZXJcIl0uc29tZShmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvcmRvdmFNZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShuYW1lKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBuYXZpZ2F0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMgfHwgIXBhcmFtcy51cmwpIHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiTm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY29yZG92YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lcnJvcihcImNvcmRvdmEgaXMgdW5kZWZpbmVkXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBjb3Jkb3ZhTWV0YWRhdGEgPSB3aW5kb3cuY29yZG92YS5yZXF1aXJlKFwiY29yZG92YS9wbHVnaW5fbGlzdFwiKS5tZXRhZGF0YTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0luQXBwQnJvd3Nlckluc3RhbGxlZChjb3Jkb3ZhTWV0YWRhdGEpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lcnJvcihcIkluQXBwQnJvd3NlciBwbHVnaW4gbm90IGZvdW5kXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wb3B1cCA9IGNvcmRvdmEuSW5BcHBCcm93c2VyLm9wZW4ocGFyYW1zLnVybCwgdGhpcy50YXJnZXQsIHRoaXMuZmVhdHVyZXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BvcHVwKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiQ29yZG92YVBvcHVwV2luZG93Lm5hdmlnYXRlOiBwb3B1cCBzdWNjZXNzZnVsbHkgY3JlYXRlZFwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl9leGl0Q2FsbGJhY2tFdmVudCA9IHRoaXMuX2V4aXRDYWxsYmFjay5iaW5kKHRoaXMpOyBcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkU3RhcnRDYWxsYmFja0V2ZW50ID0gdGhpcy5fbG9hZFN0YXJ0Q2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwiZXhpdFwiLCB0aGlzLl9leGl0Q2FsbGJhY2tFdmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RhcnRcIiwgdGhpcy5fbG9hZFN0YXJ0Q2FsbGJhY2tFdmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvcihcIkVycm9yIG9wZW5pbmcgcG9wdXAgd2luZG93XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0IHByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICAgIH1cblxuICAgIF9sb2FkU3RhcnRDYWxsYmFjayhldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudXJsLmluZGV4T2YodGhpcy5yZWRpcmVjdF91cmkpID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWNjZXNzKHsgdXJsOiBldmVudC51cmwgfSk7XG4gICAgICAgIH0gICAgXG4gICAgfVxuICAgIF9leGl0Q2FsbGJhY2sobWVzc2FnZSkge1xuICAgICAgICB0aGlzLl9lcnJvcihtZXNzYWdlKTsgICAgXG4gICAgfVxuICAgIFxuICAgIF9zdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIkNvcmRvdmFQb3B1cFdpbmRvdzogU3VjY2Vzc2Z1bCByZXNwb25zZSBmcm9tIGNvcmRvdmEgcG9wdXAgd2luZG93XCIpO1xuICAgICAgICB0aGlzLl9yZXNvbHZlKGRhdGEpO1xuICAgIH1cbiAgICBfZXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG5cbiAgICAgICAgTG9nLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl9yZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgIH1cblxuICAgIF9jbGVhbnVwKCkge1xuICAgICAgICBpZiAodGhpcy5fcG9wdXApe1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiQ29yZG92YVBvcHVwV2luZG93OiBjbGVhbmluZyB1cCBwb3B1cFwiKTtcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleGl0XCIsIHRoaXMuX2V4aXRDYWxsYmFja0V2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsIHRoaXMuX2xvYWRTdGFydENhbGxiYWNrRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcG9wdXAgPSBudWxsO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIEVycm9yUmVzcG9uc2UgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3Ioe2Vycm9yLCBlcnJvcl9kZXNjcmlwdGlvbiwgZXJyb3JfdXJpLCBzdGF0ZSwgc2Vzc2lvbl9zdGF0ZX09e31cbiAgICApIHtcbiAgICAgICAgIGlmICghZXJyb3Ipe1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiTm8gZXJyb3IgcGFzc2VkIHRvIEVycm9yUmVzcG9uc2VcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlcnJvclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyKGVycm9yX2Rlc2NyaXB0aW9uIHx8IGVycm9yKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBcIkVycm9yUmVzcG9uc2VcIjtcblxuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuZXJyb3JfZGVzY3JpcHRpb24gPSBlcnJvcl9kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5lcnJvcl91cmkgPSBlcnJvcl91cmk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnNlc3Npb25fc3RhdGUgPSBzZXNzaW9uX3N0YXRlO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIEV2ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IFtdO1xuICAgIH1cblxuICAgIGFkZEhhbmRsZXIoY2IpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goY2IpO1xuICAgIH1cblxuICAgIHJlbW92ZUhhbmRsZXIoY2IpIHtcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMuX2NhbGxiYWNrcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtID09PSBjYik7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmFpc2UoLi4ucGFyYW1zKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkV2ZW50OiBSYWlzaW5nIGV2ZW50OiBcIiArIHRoaXMuX25hbWUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzW2ldKC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5jb25zdCB0aW1lciA9IHtcbiAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24gKGNiLCBkdXJhdGlvbikge1xuICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoY2IsIGR1cmF0aW9uKTtcbiAgICB9LFxuICAgIGNsZWFySW50ZXJ2YWw6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaGFuZGxlKTtcbiAgICB9XG59O1xuXG5sZXQgdGVzdGluZyA9IGZhbHNlO1xubGV0IHJlcXVlc3QgPSBudWxsO1xuXG5leHBvcnQgY2xhc3MgR2xvYmFsIHtcblxuICAgIHN0YXRpYyBfdGVzdGluZygpIHtcbiAgICAgICAgdGVzdGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzZXNzaW9uU3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0WE1MSHR0cFJlcXVlc3QobmV3UmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0ID0gbmV3UmVxdWVzdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IFhNTEh0dHBSZXF1ZXN0KCkge1xuICAgICAgICBpZiAoIXRlc3RpbmcgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0IHx8IFhNTEh0dHBSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB0aW1lcigpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBJRnJhbWVXaW5kb3cgfSBmcm9tICcuL0lGcmFtZVdpbmRvdy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBJRnJhbWVOYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZShwYXJhbXMpIHtcbiAgICAgICAgbGV0IGZyYW1lID0gbmV3IElGcmFtZVdpbmRvdyhwYXJhbXMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZyYW1lKTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayh1cmwpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lTmF2aWdhdG9yLmNhbGxiYWNrXCIpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBJRnJhbWVXaW5kb3cubm90aWZ5UGFyZW50KHVybCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuY29uc3QgRGVmYXVsdFRpbWVvdXQgPSAxMDAwMDtcblxuZXhwb3J0IGNsYXNzIElGcmFtZVdpbmRvdyB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCA9IHRoaXMuX21lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuX2JvdW5kTWVzc2FnZUV2ZW50LCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5fZnJhbWUgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcblxuICAgICAgICAvLyBzaG90Z3VuIGFwcHJvYWNoXG4gICAgICAgIHRoaXMuX2ZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB0aGlzLl9mcmFtZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGhpcy5fZnJhbWUud2lkdGggPSAwO1xuICAgICAgICB0aGlzLl9mcmFtZS5oZWlnaHQgPSAwO1xuXG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2ZyYW1lKTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMgfHwgIXBhcmFtcy51cmwpIHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiTm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRpbWVvdXQgPSBwYXJhbXMuc2lsZW50UmVxdWVzdFRpbWVvdXQgfHwgRGVmYXVsdFRpbWVvdXQ7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3cubmF2aWdhdGU6IFVzaW5nIHRpbWVvdXQgb2Y6XCIsIHRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCh0aGlzLl90aW1lb3V0LmJpbmQodGhpcyksIHRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUuc3JjID0gcGFyYW1zLnVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0IHByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICAgIH1cblxuICAgIF9zdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdzogU3VjY2Vzc2Z1bCByZXNwb25zZSBmcm9tIGZyYW1lIHdpbmRvd1wiKTtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZShkYXRhKTtcbiAgICB9XG4gICAgX2Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgICAgIExvZy5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fcmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICB9XG5cbiAgICBfY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZyYW1lKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3c6IGNsZWFudXBcIik7XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLl9mcmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kTWVzc2FnZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90aW1lb3V0KCkge1xuICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3cudGltZW91dFwiKTtcbiAgICAgICAgdGhpcy5fZXJyb3IoXCJGcmFtZSB3aW5kb3cgdGltZWQgb3V0XCIpO1xuICAgIH1cblxuICAgIF9tZXNzYWdlKGUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93Lm1lc3NhZ2VcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyICYmXG4gICAgICAgICAgICBlLm9yaWdpbiA9PT0gdGhpcy5fb3JpZ2luICYmXG4gICAgICAgICAgICBlLnNvdXJjZSA9PT0gdGhpcy5fZnJhbWUuY29udGVudFdpbmRvdyAmJlxuICAgICAgICAgICAgKHR5cGVvZiBlLmRhdGEgPT09ICdzdHJpbmcnICYmIChlLmRhdGEuc3RhcnRzV2l0aCgnaHR0cDovLycpIHx8IGUuZGF0YS5zdGFydHNXaXRoKCdodHRwczovLycpKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgdXJsID0gZS5kYXRhO1xuICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1Y2Nlc3MoeyB1cmw6IHVybCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiSW52YWxpZCByZXNwb25zZSBmcm9tIGZyYW1lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IF9vcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdGlmeVBhcmVudCh1cmwpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93Lm5vdGlmeVBhcmVudFwiKTtcbiAgICAgICAgdXJsID0gdXJsIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3cubm90aWZ5UGFyZW50OiBwb3N0aW5nIHVybCBtZXNzYWdlIHRvIHBhcmVudFwiKTtcbiAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UodXJsLCBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3QpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgSW5NZW1vcnlXZWJTdG9yYWdle1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG5cbiAgICBnZXRJdGVtKGtleSkge1xuICAgICAgICBMb2cuZGVidWcoXCJJbk1lbW9yeVdlYlN0b3JhZ2UuZ2V0SXRlbVwiLCBrZXkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtrZXldO1xuICAgIH1cblxuICAgIHNldEl0ZW0oa2V5LCB2YWx1ZSl7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkluTWVtb3J5V2ViU3RvcmFnZS5zZXRJdGVtXCIsIGtleSk7XG4gICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlbW92ZUl0ZW0oa2V5KXtcbiAgICAgICAgTG9nLmRlYnVnKFwiSW5NZW1vcnlXZWJTdG9yYWdlLnJlbW92ZUl0ZW1cIiwga2V5KTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2RhdGFba2V5XTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5fZGF0YSkubGVuZ3RoO1xuICAgIH1cblxuICAgIGtleShpbmRleCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5fZGF0YSlbaW5kZXhdO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbi8vIEpXVCBwYXJzaW5nIGFuZCB2YWxpZGF0aW9uLlxuLy8gLSBTaWduYXR1cmVzIGFyZSB2ZXJpZmllZCB3aXRoIFdlYkNyeXB0byAoY3J5cHRvLnN1YnRsZSk6IFJTL1BTL0VTIDI1Ni8zODQvNTEyLlxuLy8gLSBIYXNoaW5nIChhdF9oYXNoIC8gY19oYXNoIC8gUEtDRSkgdXNlcyBjcnlwdG8tanMuXG4vLyAtIEJhc2U2NCBkZWNvZGluZyB1c2VzIGJhc2U2NC1qcy5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IFNIQTI1NiBmcm9tICdjcnlwdG8tanMvc2hhMjU2LmpzJztcbmltcG9ydCBTSEEzODQgZnJvbSAnY3J5cHRvLWpzL3NoYTM4NC5qcyc7XG5pbXBvcnQgU0hBNTEyIGZyb20gJ2NyeXB0by1qcy9zaGE1MTIuanMnO1xuaW1wb3J0IEhleCBmcm9tICdjcnlwdG8tanMvZW5jLWhleC5qcyc7XG5pbXBvcnQgQmFzZTY0IGZyb20gJ2NyeXB0by1qcy9lbmMtYmFzZTY0LmpzJztcbmltcG9ydCB7IHRvQnl0ZUFycmF5IH0gZnJvbSAnYmFzZTY0LWpzJztcblxuY29uc3QgQWxsb3dlZFNpZ25pbmdBbGdzID0gWydSUzI1NicsICdSUzM4NCcsICdSUzUxMicsICdQUzI1NicsICdQUzM4NCcsICdQUzUxMicsICdFUzI1NicsICdFUzM4NCcsICdFUzUxMiddO1xuXG5jb25zdCBIYXNoZXJzID0geyBzaGEyNTY6IFNIQTI1Niwgc2hhMzg0OiBTSEEzODQsIHNoYTUxMjogU0hBNTEyIH07XG5cbmZ1bmN0aW9uIGI2NFRvQnl0ZXMocykge1xuICAgIHMgPSBzLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJykucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICB3aGlsZSAocy5sZW5ndGggJSA0KSB7XG4gICAgICAgIHMgKz0gJz0nO1xuICAgIH1cbiAgICByZXR1cm4gdG9CeXRlQXJyYXkocyk7XG59XG5cbmZ1bmN0aW9uIHV0ZjhEZWNvZGUoYnl0ZXMpIHtcbiAgICBsZXQgZXNjYXBlZCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZXNjYXBlZCArPSAnJScgKyAoJzAnICsgYnl0ZXNbaV0udG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgfVxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlZCk7XG59XG5cbmZ1bmN0aW9uIGI2NHVUb0pzb24ocykge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHV0ZjhEZWNvZGUoYjY0VG9CeXRlcyhzKSkpO1xufVxuXG4vLyBUaGUgSldTIHNpZ25pbmcgaW5wdXQgaXMgYmFzZTY0dXJsIHRleHQsIGkuZS4gcHVyZSBBU0NJSVxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzKHMpIHtcbiAgICBjb25zdCBvdXQgPSBuZXcgVWludDhBcnJheShzLmxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG91dFtpXSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gZ2V0U3VidGxlKCkge1xuICAgIGNvbnN0IGMgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNyeXB0bykgfHxcbiAgICAgICAgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzLmNyeXB0bykgfHxcbiAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5jcnlwdG8pO1xuICAgIGlmICghYyB8fCAhYy5zdWJ0bGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJDcnlwdG8gKGNyeXB0by5zdWJ0bGUpIGlzIG5vdCBhdmFpbGFibGU7IGEgc2VjdXJlIGNvbnRleHQgKGh0dHBzKSBpcyByZXF1aXJlZCcpO1xuICAgIH1cbiAgICByZXR1cm4gYy5zdWJ0bGU7XG59XG5cbi8vIE1pbmltYWwgREVSIHJlYWRlcjogcmV0dXJucyB0YWcsIGNvbnRlbnQgc3RhcnQvZW5kIGFuZCB0aGUgZnVsbCBlbGVtZW50IGVuZFxuZnVuY3Rpb24gcmVhZFRsdihieXRlcywgb2Zmc2V0KSB7XG4gICAgY29uc3QgdGFnID0gYnl0ZXNbb2Zmc2V0XTtcbiAgICBsZXQgbGVuID0gYnl0ZXNbb2Zmc2V0ICsgMV07XG4gICAgbGV0IHN0YXJ0ID0gb2Zmc2V0ICsgMjtcbiAgICBpZiAobGVuICYgMHg4MCkge1xuICAgICAgICBjb25zdCBuID0gbGVuICYgMHg3ZjtcbiAgICAgICAgaWYgKG4gPCAxIHx8IG4gPiA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIERFUiBsZW5ndGgnKTtcbiAgICAgICAgfVxuICAgICAgICBsZW4gPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGVuID0gKGxlbiAqIDI1NikgKyBieXRlc1tzdGFydCArIGldO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0ICs9IG47XG4gICAgfVxuICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgbGVuO1xuICAgIGlmIChlbmQgPiBieXRlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcnVuY2F0ZWQgREVSIGVsZW1lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdGFnLCBzdGFydCwgZW5kIH07XG59XG5cbi8vIEV4dHJhY3RzIHRoZSBERVIgU3ViamVjdFB1YmxpY0tleUluZm8gZnJvbSBhIERFUiBYLjUwOSBjZXJ0aWZpY2F0ZVxuZnVuY3Rpb24gc3BraUZyb21DZXJ0aWZpY2F0ZShkZXIpIHtcbiAgICBjb25zdCBjZXJ0ID0gcmVhZFRsdihkZXIsIDApO1xuICAgIGlmIChjZXJ0LnRhZyAhPT0gMHgzMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY2VydGlmaWNhdGUnKTtcbiAgICB9XG4gICAgY29uc3QgdGJzID0gcmVhZFRsdihkZXIsIGNlcnQuc3RhcnQpO1xuICAgIGlmICh0YnMudGFnICE9PSAweDMwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjZXJ0aWZpY2F0ZScpO1xuICAgIH1cbiAgICBsZXQgcG9zID0gdGJzLnN0YXJ0O1xuICAgIGxldCBlbCA9IHJlYWRUbHYoZGVyLCBwb3MpO1xuICAgIGlmIChlbC50YWcgPT09IDB4YTApIHsgLy8gWzBdIHZlcnNpb25cbiAgICAgICAgcG9zID0gZWwuZW5kO1xuICAgICAgICBlbCA9IHJlYWRUbHYoZGVyLCBwb3MpO1xuICAgIH1cbiAgICAvLyBzZXJpYWxOdW1iZXIsIHNpZ25hdHVyZSwgaXNzdWVyLCB2YWxpZGl0eSwgc3ViamVjdFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIHBvcyA9IGVsLmVuZDtcbiAgICAgICAgZWwgPSByZWFkVGx2KGRlciwgcG9zKTtcbiAgICB9XG4gICAgaWYgKGVsLnRhZyAhPT0gMHgzMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY2VydGlmaWNhdGU6IHN1YmplY3RQdWJsaWNLZXlJbmZvIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICByZXR1cm4gZGVyLnNsaWNlKHBvcywgZWwuZW5kKTtcbn1cblxuLy8gTm9ybWFsaXplcyBhIEpXSyBpbnRvIHdoYXQgV2ViQ3J5cHRvIGltcG9ydEtleSBhY2NlcHRzLlxuLy8gRXh0cmEgbWVtYmVycyAoYWxnLCB1c2UsIGtleV9vcHMsIGtpZCwgeDV0Li4uKSBhcmUgZHJvcHBlZCBiZWNhdXNlIHRoZXkgY2FuIG1ha2UgaW1wb3J0S2V5IHJlamVjdC5cbmZ1bmN0aW9uIHJlc29sdmVLZXkoa2V5KSB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBrZXkgdHlwZTogJyArIGtleSk7XG4gICAgfVxuICAgIGlmIChrZXkua3R5ID09PSAnUlNBJykge1xuICAgICAgICBpZiAoa2V5LmUgJiYga2V5Lm4pIHtcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ1JTQScsIGZvcm1hdDogJ2p3aycsIGRhdGE6IHsga3R5OiAnUlNBJywgbjoga2V5Lm4sIGU6IGtleS5lLCBleHQ6IHRydWUgfSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkueDVjICYmIGtleS54NWMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdSU0EnLCBmb3JtYXQ6ICdzcGtpJywgZGF0YTogc3BraUZyb21DZXJ0aWZpY2F0ZShiNjRUb0J5dGVzKGtleS54NWNbMF0pKSB9O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUlNBIGtleSBtaXNzaW5nIGtleSBtYXRlcmlhbCcpO1xuICAgIH1cbiAgICBpZiAoa2V5Lmt0eSA9PT0gJ0VDJykge1xuICAgICAgICBpZiAoa2V5LmNydiAmJiBrZXkueCAmJiBrZXkueSkge1xuICAgICAgICAgICAgcmV0dXJuIHsga3R5OiAnRUMnLCBjcnY6IGtleS5jcnYsIGZvcm1hdDogJ2p3aycsIGRhdGE6IHsga3R5OiAnRUMnLCBjcnY6IGtleS5jcnYsIHg6IGtleS54LCB5OiBrZXkueSwgZXh0OiB0cnVlIH0gfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VDIGtleSBtaXNzaW5nIGtleSBtYXRlcmlhbCcpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGtleSB0eXBlOiAnICsga2V5Lmt0eSk7XG59XG5cbi8vIE1hcHMgYSBKV1MgYWxnIHRvIFdlYkNyeXB0byBpbXBvcnQvdmVyaWZ5IHBhcmFtZXRlcnNcbmZ1bmN0aW9uIGFsZ1BhcmFtcyhhbGcpIHtcbiAgICBjb25zdCBiaXRzID0gYWxnLnN1YnN0cigyKTtcbiAgICBjb25zdCBoYXNoID0geyBuYW1lOiAnU0hBLScgKyBiaXRzIH07XG4gICAgc3dpdGNoIChhbGcuc3Vic3RyKDAsIDIpKSB7XG4gICAgICAgIGNhc2UgJ1JTJzpcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ1JTQScsIGltcG9ydEFsZzogeyBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnLCBoYXNoIH0sIHZlcmlmeUFsZzogeyBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnIH0gfTtcbiAgICAgICAgY2FzZSAnUFMnOlxuICAgICAgICAgICAgcmV0dXJuIHsga3R5OiAnUlNBJywgaW1wb3J0QWxnOiB7IG5hbWU6ICdSU0EtUFNTJywgaGFzaCB9LCB2ZXJpZnlBbGc6IHsgbmFtZTogJ1JTQS1QU1MnLCBzYWx0TGVuZ3RoOiBwYXJzZUludChiaXRzLCAxMCkgLyA4IH0gfTtcbiAgICAgICAgY2FzZSAnRVMnOiB7XG4gICAgICAgICAgICBjb25zdCBjdXJ2ZSA9IHsgJzI1Nic6ICdQLTI1NicsICczODQnOiAnUC0zODQnLCAnNTEyJzogJ1AtNTIxJyB9W2JpdHNdO1xuICAgICAgICAgICAgcmV0dXJuIHsga3R5OiAnRUMnLCBjdXJ2ZSwgaW1wb3J0QWxnOiB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6IGN1cnZlIH0sIHZlcmlmeUFsZzogeyBuYW1lOiAnRUNEU0EnLCBoYXNoIH0gfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGFsZzogJyArIGFsZyk7XG59XG5cbmV4cG9ydCBjbGFzcyBKb3NlVXRpbCB7XG5cbiAgICBzdGF0aWMgcGFyc2VKd3Qoand0KSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkpvc2VVdGlsLnBhcnNlSnd0XCIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFydHMgPSBqd3Quc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBKV1QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaGVhZGVyOiBiNjR1VG9Kc29uKHBhcnRzWzBdKSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiBiNjR1VG9Kc29uKHBhcnRzWzFdKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHZhbGlkYXRlSnd0KGp3dCwga2V5LCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXcsIG5vdywgdGltZUluc2Vuc2l0aXZlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkpvc2VVdGlsLnZhbGlkYXRlSnd0XCIpO1xuXG4gICAgICAgIGxldCByZXNvbHZlZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc29sdmVkID0gcmVzb2x2ZUtleShrZXkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC52YWxpZGF0ZUp3dDogXCIgKyAoZSAmJiBlLm1lc3NhZ2UpLCBrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEpvc2VVdGlsLnZhbGlkYXRlSnd0QXR0cmlidXRlcyhqd3QsIGlzc3VlciwgYXVkaWVuY2UsIGNsb2NrU2tldywgbm93LCB0aW1lSW5zZW5zaXRpdmUpLnRoZW4ocGF5bG9hZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gSm9zZVV0aWwuX3ZlcmlmeVNpZ25hdHVyZShqd3QsIHJlc29sdmVkKS50aGVuKHZhbGlkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogc2lnbmF0dXJlIHZhbGlkYXRpb24gZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwic2lnbmF0dXJlIHZhbGlkYXRpb24gZmFpbGVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgICAgICAgICB9LCBlID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoZSAmJiBlLm1lc3NhZ2UgfHwgZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcInNpZ25hdHVyZSB2YWxpZGF0aW9uIGZhaWxlZFwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIF92ZXJpZnlTaWduYXR1cmUoand0LCByZXNvbHZlZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFydHMgPSBqd3Quc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGNvbnN0IGFsZyA9IGI2NHVUb0pzb24ocGFydHNbMF0pLmFsZztcbiAgICAgICAgICAgIGlmIChBbGxvd2VkU2lnbmluZ0FsZ3MuaW5kZXhPZihhbGcpIDwgMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWxnIG5vdCBhbGxvd2VkOiAnICsgYWxnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHAgPSBhbGdQYXJhbXMoYWxnKTtcbiAgICAgICAgICAgIGlmIChwLmt0eSAhPT0gcmVzb2x2ZWQua3R5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXkgdHlwZSAnICsgcmVzb2x2ZWQua3R5ICsgJyBkb2VzIG5vdCBtYXRjaCBhbGcgJyArIGFsZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocC5jdXJ2ZSAmJiByZXNvbHZlZC5jcnYgJiYgcC5jdXJ2ZSAhPT0gcmVzb2x2ZWQuY3J2KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFQyBrZXkgY3VydmUgJyArIHJlc29sdmVkLmNydiArICcgZG9lcyBub3QgbWF0Y2ggYWxnICcgKyBhbGcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3VidGxlID0gZ2V0U3VidGxlKCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXNjaWlUb0J5dGVzKHBhcnRzWzBdICsgJy4nICsgcGFydHNbMV0pO1xuICAgICAgICAgICAgLy8gSldTIEVDRFNBIHNpZ25hdHVyZXMgYXJlIHJhdyByfHxzLCB3aGljaCBpcyB0aGUgZm9ybWF0IFdlYkNyeXB0byBleHBlY3RzXG4gICAgICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBiNjRUb0J5dGVzKHBhcnRzWzJdKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3VidGxlLmltcG9ydEtleShyZXNvbHZlZC5mb3JtYXQsIHJlc29sdmVkLmRhdGEsIHAuaW1wb3J0QWxnLCBmYWxzZSwgWyd2ZXJpZnknXSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oY3J5cHRvS2V5ID0+IHN1YnRsZS52ZXJpZnkocC52ZXJpZnlBbGcsIGNyeXB0b0tleSwgc2lnbmF0dXJlLCBkYXRhKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB2YWxpZGF0ZUp3dEF0dHJpYnV0ZXMoand0LCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXcsIG5vdywgdGltZUluc2Vuc2l0aXZlKSB7XG4gICAgICAgIGlmICghY2xvY2tTa2V3KSB7XG4gICAgICAgICAgICBjbG9ja1NrZXcgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFub3cpIHtcbiAgICAgICAgICAgIG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IEpvc2VVdGlsLnBhcnNlSnd0KGp3dCk7XG4gICAgICAgIGlmICghcGFyc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIEpXVFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHBhcnNlZC5wYXlsb2FkO1xuXG4gICAgICAgIGlmICghcGF5bG9hZC5pc3MpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogaXNzdWVyIHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaXNzdWVyIHdhcyBub3QgcHJvdmlkZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmlzcyAhPT0gaXNzdWVyKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IEludmFsaWQgaXNzdWVyIGluIHRva2VuXCIsIHBheWxvYWQuaXNzKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIGlzc3VlciBpbiB0b2tlbjogXCIgKyBwYXlsb2FkLmlzcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXlsb2FkLmF1ZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBhdWQgd2FzIG5vdCBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhdWQgd2FzIG5vdCBwcm92aWRlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsaWRBdWRpZW5jZSA9IHBheWxvYWQuYXVkID09PSBhdWRpZW5jZSB8fCAoQXJyYXkuaXNBcnJheShwYXlsb2FkLmF1ZCkgJiYgcGF5bG9hZC5hdWQuaW5kZXhPZihhdWRpZW5jZSkgPj0gMCk7XG4gICAgICAgIGlmICghdmFsaWRBdWRpZW5jZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBJbnZhbGlkIGF1ZGllbmNlIGluIHRva2VuXCIsIHBheWxvYWQuYXVkKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIGF1ZGllbmNlIGluIHRva2VuOiBcIiArIHBheWxvYWQuYXVkKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuYXpwICYmIHBheWxvYWQuYXpwICE9PSBhdWRpZW5jZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBJbnZhbGlkIGF6cCBpbiB0b2tlblwiLCBwYXlsb2FkLmF6cCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBhenAgaW4gdG9rZW46IFwiICsgcGF5bG9hZC5henApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGltZUluc2Vuc2l0aXZlKSB7XG4gICAgICAgICAgICBjb25zdCBsb3dlck5vdyA9IG5vdyArIGNsb2NrU2tldztcbiAgICAgICAgICAgIGNvbnN0IHVwcGVyTm93ID0gbm93IC0gY2xvY2tTa2V3O1xuXG4gICAgICAgICAgICBpZiAoIXBheWxvYWQuaWF0KSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBpYXQgd2FzIG5vdCBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaWF0IHdhcyBub3QgcHJvdmlkZWRcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxvd2VyTm93IDwgcGF5bG9hZC5pYXQpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IGlhdCBpcyBpbiB0aGUgZnV0dXJlXCIsIHBheWxvYWQuaWF0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaWF0IGlzIGluIHRoZSBmdXR1cmU6IFwiICsgcGF5bG9hZC5pYXQpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBheWxvYWQubmJmICYmIGxvd2VyTm93IDwgcGF5bG9hZC5uYmYpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IG5iZiBpcyBpbiB0aGUgZnV0dXJlXCIsIHBheWxvYWQubmJmKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwibmJmIGlzIGluIHRoZSBmdXR1cmU6IFwiICsgcGF5bG9hZC5uYmYpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmV4cCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogZXhwIHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImV4cCB3YXMgbm90IHByb3ZpZGVkXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXlsb2FkLmV4cCA8IHVwcGVyTm93KSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBleHAgaXMgaW4gdGhlIHBhc3RcIiwgcGF5bG9hZC5leHApO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJleHAgaXMgaW4gdGhlIHBhc3Q6XCIgKyBwYXlsb2FkLmV4cCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYXlsb2FkKTtcbiAgICB9XG5cbiAgICAvLyBVVEYtOCBpbnB1dCwgbG93ZXJjYXNlIGhleCBvdXRwdXRcbiAgICBzdGF0aWMgaGFzaFN0cmluZyh2YWx1ZSwgYWxnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBoYXNoZXIgPSBIYXNoZXJzW1N0cmluZyhhbGcpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15hLXowLTldL2csICcnKV07XG4gICAgICAgICAgICBpZiAoIWhhc2hlcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgaGFzaCBhbGc6ICcgKyBhbGcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhhc2hlcih2YWx1ZSkudG9TdHJpbmcoSGV4KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGhleFRvQmFzZTY0VXJsKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gQmFzZTY0LnN0cmluZ2lmeShIZXgucGFyc2UodmFsdWUpKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC89KyQvLCAnJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcblxuZXhwb3J0IGNsYXNzIEpzb25TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgYWRkaXRpb25hbENvbnRlbnRUeXBlcyA9IG51bGwsIFxuICAgICAgICBYTUxIdHRwUmVxdWVzdEN0b3IgPSBHbG9iYWwuWE1MSHR0cFJlcXVlc3QsIFxuICAgICAgICBqd3RIYW5kbGVyID0gbnVsbFxuICAgICkge1xuICAgICAgICBpZiAoYWRkaXRpb25hbENvbnRlbnRUeXBlcyAmJiBBcnJheS5pc0FycmF5KGFkZGl0aW9uYWxDb250ZW50VHlwZXMpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50VHlwZXMgPSBhZGRpdGlvbmFsQ29udGVudFR5cGVzLnNsaWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50VHlwZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZW50VHlwZXMucHVzaCgnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICBpZiAoand0SGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFR5cGVzLnB1c2goJ2FwcGxpY2F0aW9uL2p3dCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fWE1MSHR0cFJlcXVlc3QgPSBYTUxIdHRwUmVxdWVzdEN0b3I7XG4gICAgICAgIHRoaXMuX2p3dEhhbmRsZXIgPSBqd3RIYW5kbGVyO1xuICAgIH1cblxuICAgIGdldEpzb24odXJsLCB0b2tlbikge1xuICAgICAgICBpZiAoIXVybCl7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5nZXRKc29uOiBObyB1cmwgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXJsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UuZ2V0SnNvbiwgdXJsOiBcIiwgdXJsKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IHRoaXMuX1hNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXEub3BlbignR0VUJywgdXJsKTtcblxuICAgICAgICAgICAgdmFyIGFsbG93ZWRDb250ZW50VHlwZXMgPSB0aGlzLl9jb250ZW50VHlwZXM7XG4gICAgICAgICAgICB2YXIgand0SGFuZGxlciA9IHRoaXMuX2p3dEhhbmRsZXI7XG5cbiAgICAgICAgICAgIHJlcS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJKc29uU2VydmljZS5nZXRKc29uOiBIVFRQIHJlc3BvbnNlIHJlY2VpdmVkLCBzdGF0dXNcIiwgcmVxLnN0YXR1cyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxLnN0YXR1cyA9PT0gMjAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0gcmVxLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gYWxsb3dlZENvbnRlbnRUeXBlcy5maW5kKGl0ZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUuc3RhcnRzV2l0aChpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IFwiYXBwbGljYXRpb24vand0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqd3RIYW5kbGVyKHJlcSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5nZXRKc29uOiBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiSW52YWxpZCByZXNwb25zZSBDb250ZW50LVR5cGU6IFwiICsgY29udGVudFR5cGUgKyBcIiwgZnJvbSBVUkw6IFwiICsgdXJsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IocmVxLnN0YXR1c1RleHQgKyBcIiAoXCIgKyByZXEuc3RhdHVzICsgXCIpXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLmdldEpzb246IG5ldHdvcmsgZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJKc29uU2VydmljZS5nZXRKc29uOiB0b2tlbiBwYXNzZWQsIHNldHRpbmcgQXV0aG9yaXphdGlvbiBoZWFkZXJcIik7XG4gICAgICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXEuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwb3N0Rm9ybSh1cmwsIHBheWxvYWQsIGJhc2ljQXV0aCkge1xuICAgICAgICBpZiAoIXVybCl7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5wb3N0Rm9ybTogTm8gdXJsIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVybFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIkpzb25TZXJ2aWNlLnBvc3RGb3JtLCB1cmw6IFwiLCB1cmwpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHZhciByZXEgPSBuZXcgdGhpcy5fWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHJlcS5vcGVuKCdQT1NUJywgdXJsKTtcblxuICAgICAgICAgICAgdmFyIGFsbG93ZWRDb250ZW50VHlwZXMgPSB0aGlzLl9jb250ZW50VHlwZXM7XG5cbiAgICAgICAgICAgIHJlcS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJKc29uU2VydmljZS5wb3N0Rm9ybTogSFRUUCByZXNwb25zZSByZWNlaXZlZCwgc3RhdHVzXCIsIHJlcS5zdGF0dXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50VHlwZSA9IHJlcS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGFsbG93ZWRDb250ZW50VHlwZXMuZmluZChpdGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlLnN0YXJ0c1dpdGgoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IEVycm9yIHBhcnNpbmcgSlNPTiByZXNwb25zZVwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IoXCJJbnZhbGlkIHJlc3BvbnNlIENvbnRlbnQtVHlwZTogXCIgKyBjb250ZW50VHlwZSArIFwiLCBmcm9tIFVSTDogXCIgKyB1cmwpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXEuc3RhdHVzID09PSA0MDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSByZXEuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBhbGxvd2VkQ29udGVudFR5cGVzLmZpbmQoaXRlbT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZS5zdGFydHNXaXRoKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZCA9IEpTT04ucGFyc2UocmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkICYmIHBheWxvYWQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBFcnJvciBmcm9tIHNlcnZlcjogXCIsIHBheWxvYWQuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihwYXlsb2FkLmVycm9yKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IEVycm9yIHBhcnNpbmcgSlNPTiByZXNwb25zZVwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IocmVxLnN0YXR1c1RleHQgKyBcIiAoXCIgKyByZXEuc3RhdHVzICsgXCIpXCIpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IG5ldHdvcmsgZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgYm9keSA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGtleSBpbiBwYXlsb2FkKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXlsb2FkW2tleV07XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9keS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ICs9IFwiJlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYm9keSArPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgYm9keSArPSBcIj1cIjtcbiAgICAgICAgICAgICAgICAgICAgYm9keSArPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cbiAgICAgICAgICAgIGlmIChiYXNpY0F1dGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgXCJCYXNpYyBcIiArIGJ0b2EoYmFzaWNBdXRoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcS5zZW5kKGJvZHkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5sZXQgbm9wTG9nZ2VyID0ge1xuICAgIGRlYnVnKCl7fSxcbiAgICBpbmZvKCl7fSxcbiAgICB3YXJuKCl7fSxcbiAgICBlcnJvcigpe31cbn07XG5cbmNvbnN0IE5PTkUgPSAwO1xuY29uc3QgRVJST1IgPSAxO1xuY29uc3QgV0FSTiA9IDI7XG5jb25zdCBJTkZPID0gMztcbmNvbnN0IERFQlVHID0gNDtcblxubGV0IGxvZ2dlcjtcbmxldCBsZXZlbDtcblxuZXhwb3J0IGNsYXNzIExvZyB7XG4gICAgc3RhdGljIGdldCBOT05FKCkge3JldHVybiBOT05FfTtcbiAgICBzdGF0aWMgZ2V0IEVSUk9SKCkge3JldHVybiBFUlJPUn07XG4gICAgc3RhdGljIGdldCBXQVJOKCkge3JldHVybiBXQVJOfTtcbiAgICBzdGF0aWMgZ2V0IElORk8oKSB7cmV0dXJuIElORk99O1xuICAgIHN0YXRpYyBnZXQgREVCVUcoKSB7cmV0dXJuIERFQlVHfTtcbiAgICBcbiAgICBzdGF0aWMgcmVzZXQoKXtcbiAgICAgICAgbGV2ZWwgPSBJTkZPO1xuICAgICAgICBsb2dnZXIgPSBub3BMb2dnZXI7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBnZXQgbGV2ZWwoKXtcbiAgICAgICAgcmV0dXJuIGxldmVsO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IGxldmVsKHZhbHVlKXtcbiAgICAgICAgaWYgKE5PTkUgPD0gdmFsdWUgJiYgdmFsdWUgPD0gREVCVUcpe1xuICAgICAgICAgICAgbGV2ZWwgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbG9nIGxldmVsXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBnZXQgbG9nZ2VyKCl7XG4gICAgICAgIHJldHVybiBsb2dnZXI7XG4gICAgfVxuICAgIHN0YXRpYyBzZXQgbG9nZ2VyKHZhbHVlKXtcbiAgICAgICAgaWYgKCF2YWx1ZS5kZWJ1ZyAmJiB2YWx1ZS5pbmZvKSB7XG4gICAgICAgICAgICAvLyBqdXN0IHRvIHN0YXkgYmFja3dhcmRzIGNvbXBhdC4gY2FuIHJlbW92ZSBpbiAyLjBcbiAgICAgICAgICAgIHZhbHVlLmRlYnVnID0gdmFsdWUuaW5mbztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5kZWJ1ZyAmJiB2YWx1ZS5pbmZvICYmIHZhbHVlLndhcm4gJiYgdmFsdWUuZXJyb3Ipe1xuICAgICAgICAgICAgbG9nZ2VyID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvZ2dlclwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZGVidWcoLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBERUJVRyl7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcuYXBwbHkobG9nZ2VyLCBBcnJheS5mcm9tKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaW5mbyguLi5hcmdzKXtcbiAgICAgICAgaWYgKGxldmVsID49IElORk8pe1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8uYXBwbHkobG9nZ2VyLCBBcnJheS5mcm9tKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgd2FybiguLi5hcmdzKXtcbiAgICAgICAgaWYgKGxldmVsID49IFdBUk4pe1xuICAgICAgICAgICAgbG9nZ2VyLndhcm4uYXBwbHkobG9nZ2VyLCBBcnJheS5mcm9tKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZXJyb3IoLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBFUlJPUil7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IuYXBwbHkobG9nZ2VyLCBBcnJheS5mcm9tKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTG9nLnJlc2V0KCk7XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBKc29uU2VydmljZSB9IGZyb20gJy4vSnNvblNlcnZpY2UuanMnO1xuXG5jb25zdCBPaWRjTWV0YWRhdGFVcmxQYXRoID0gJy53ZWxsLWtub3duL29wZW5pZC1jb25maWd1cmF0aW9uJztcblxuZXhwb3J0IGNsYXNzIE1ldGFkYXRhU2VydmljZSB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIEpzb25TZXJ2aWNlQ3RvciA9IEpzb25TZXJ2aWNlKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk1ldGFkYXRhU2VydmljZTogTm8gc2V0dGluZ3MgcGFzc2VkIHRvIE1ldGFkYXRhU2VydmljZVwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldHRpbmdzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgdGhpcy5fanNvblNlcnZpY2UgPSBuZXcgSnNvblNlcnZpY2VDdG9yKFsnYXBwbGljYXRpb24vandrLXNldCtqc29uJ10pO1xuICAgIH1cblxuICAgIGdldCBtZXRhZGF0YVVybCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tZXRhZGF0YVVybCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhVXJsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgPSB0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YVVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsID0gdGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21ldGFkYXRhVXJsICYmIHRoaXMuX21ldGFkYXRhVXJsLmluZGV4T2YoT2lkY01ldGFkYXRhVXJsUGF0aCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybFt0aGlzLl9tZXRhZGF0YVVybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YVVybCArPSAnLyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gT2lkY01ldGFkYXRhVXJsUGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFVcmw7XG4gICAgfVxuXG4gICAgcmVzZXRTaWduaW5nS2V5cygpIHtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSB0aGlzLl9zZXR0aW5ncyB8fCB7fVxuICAgICAgICB0aGlzLl9zZXR0aW5ncy5zaWduaW5nS2V5cyA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGdldE1ldGFkYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MubWV0YWRhdGEpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YTogUmV0dXJuaW5nIG1ldGFkYXRhIGZyb20gc2V0dGluZ3NcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tZXRhZGF0YVVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiTWV0YWRhdGFTZXJ2aWNlLmdldE1ldGFkYXRhOiBObyBhdXRob3JpdHkgb3IgbWV0YWRhdGFVcmwgY29uZmlndXJlZCBvbiBzZXR0aW5nc1wiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBhdXRob3JpdHkgb3IgbWV0YWRhdGFVcmwgY29uZmlndXJlZCBvbiBzZXR0aW5nc1wiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGE6IGdldHRpbmcgbWV0YWRhdGEgZnJvbVwiLCB0aGlzLm1ldGFkYXRhVXJsKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UuZ2V0SnNvbih0aGlzLm1ldGFkYXRhVXJsKVxuICAgICAgICAgICAgLnRoZW4obWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YToganNvbiByZWNlaXZlZFwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgc2VlZCA9IHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhU2VlZCB8fCB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHNlZWQsIG1ldGFkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MubWV0YWRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJc3N1ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiaXNzdWVyXCIpO1xuICAgIH1cblxuICAgIGdldEF1dGhvcml6YXRpb25FbmRwb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJhdXRob3JpemF0aW9uX2VuZHBvaW50XCIpO1xuICAgIH1cblxuICAgIGdldFVzZXJJbmZvRW5kcG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwidXNlcmluZm9fZW5kcG9pbnRcIik7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW5FbmRwb2ludChvcHRpb25hbD10cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwidG9rZW5fZW5kcG9pbnRcIiwgb3B0aW9uYWwpO1xuICAgIH1cblxuICAgIGdldENoZWNrU2Vzc2lvbklmcmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJjaGVja19zZXNzaW9uX2lmcmFtZVwiLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRFbmRTZXNzaW9uRW5kcG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiZW5kX3Nlc3Npb25fZW5kcG9pbnRcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0UmV2b2NhdGlvbkVuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcInJldm9jYXRpb25fZW5kcG9pbnRcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0S2V5c0VuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcImp3a3NfdXJpXCIsIHRydWUpO1xuICAgIH1cblxuICAgIF9nZXRNZXRhZGF0YVByb3BlcnR5KG5hbWUsIG9wdGlvbmFsPWZhbHNlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5IGZvcjogXCIgKyBuYW1lKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNZXRhZGF0YSgpLnRoZW4obWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiTWV0YWRhdGFTZXJ2aWNlLmdldE1ldGFkYXRhUHJvcGVydHk6IG1ldGFkYXRhIHJlY2lldmVkXCIpO1xuXG4gICAgICAgICAgICBpZiAobWV0YWRhdGFbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy53YXJuKFwiTWV0YWRhdGFTZXJ2aWNlLmdldE1ldGFkYXRhUHJvcGVydHk6IE1ldGFkYXRhIGRvZXMgbm90IGNvbnRhaW4gb3B0aW9uYWwgcHJvcGVydHkgXCIgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5OiBNZXRhZGF0YSBkb2VzIG5vdCBjb250YWluIHByb3BlcnR5IFwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGFkYXRhIGRvZXMgbm90IGNvbnRhaW4gcHJvcGVydHkgXCIgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YVtuYW1lXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U2lnbmluZ0tleXMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaWduaW5nS2V5cykge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiTWV0YWRhdGFTZXJ2aWNlLmdldFNpZ25pbmdLZXlzOiBSZXR1cm5pbmcgc2lnbmluZ0tleXMgZnJvbSBzZXR0aW5nc1wiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJqd2tzX3VyaVwiKS50aGVuKGp3a3NfdXJpID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5czogandrc191cmkgcmVjZWl2ZWRcIiwgandrc191cmkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UuZ2V0SnNvbihqd2tzX3VyaSkudGhlbihrZXlTZXQgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5czoga2V5IHNldCByZWNlaXZlZFwiLCBrZXlTZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFrZXlTZXQua2V5cykge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXM6IE1pc3Npbmcga2V5cyBvbiBrZXlzZXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3Npbmcga2V5cyBvbiBrZXlzZXRcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMgPSBrZXlTZXQua2V5cztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudFNldHRpbmdzIH0gZnJvbSAnLi9PaWRjQ2xpZW50U2V0dGluZ3MuanMnO1xuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vRXJyb3JSZXNwb25zZS5qcyc7XG5pbXBvcnQgeyBTaWduaW5SZXF1ZXN0IH0gZnJvbSAnLi9TaWduaW5SZXF1ZXN0LmpzJztcbmltcG9ydCB7IFNpZ25pblJlc3BvbnNlIH0gZnJvbSAnLi9TaWduaW5SZXNwb25zZS5qcyc7XG5pbXBvcnQgeyBTaWdub3V0UmVxdWVzdCB9IGZyb20gJy4vU2lnbm91dFJlcXVlc3QuanMnO1xuaW1wb3J0IHsgU2lnbm91dFJlc3BvbnNlIH0gZnJvbSAnLi9TaWdub3V0UmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgU2lnbmluU3RhdGUgfSBmcm9tICcuL1NpZ25pblN0YXRlLmpzJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi9TdGF0ZS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBPaWRjQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIGlmIChzZXR0aW5ncyBpbnN0YW5jZW9mIE9pZGNDbGllbnRTZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gbmV3IE9pZGNDbGllbnRTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgX3N0YXRlU3RvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnN0YXRlU3RvcmU7XG4gICAgfVxuICAgIGdldCBfdmFsaWRhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy52YWxpZGF0b3I7XG4gICAgfVxuICAgIGdldCBfbWV0YWRhdGFTZXJ2aWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5tZXRhZGF0YVNlcnZpY2U7XG4gICAgfVxuXG4gICAgZ2V0IHNldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3M7XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVNlcnZpY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2U7XG4gICAgfVxuXG4gICAgY3JlYXRlU2lnbmluUmVxdWVzdCh7XG4gICAgICAgIHJlc3BvbnNlX3R5cGUsIHNjb3BlLCByZWRpcmVjdF91cmksXG4gICAgICAgIC8vIGRhdGEgd2FzIG1lYW50IHRvIGJlIHRoZSBwbGFjZSBhIGNhbGxlciBjb3VsZCBpbmRpY2F0ZSB0aGUgZGF0YSB0b1xuICAgICAgICAvLyBoYXZlIHJvdW5kIHRyaXBwZWQsIGJ1dCBwZW9wbGUgd2VyZSBnZXR0aW5nIGNvbmZ1c2VkLCBzbyBpIGFkZGVkIHN0YXRlIChzaW5jZSB0aGF0IG1hdGNoZXMgdGhlIHNwZWMpXG4gICAgICAgIC8vIGFuZCBzbyBub3cgaWYgZGF0YSBpcyBub3QgcGFzc2VkLCBidXQgc3RhdGUgaXMgdGhlbiBzdGF0ZSB3aWxsIGJlIHVzZWRcbiAgICAgICAgZGF0YSwgc3RhdGUsIHByb21wdCwgZGlzcGxheSwgbWF4X2FnZSwgdWlfbG9jYWxlcywgaWRfdG9rZW5faGludCwgbG9naW5faGludCwgYWNyX3ZhbHVlcyxcbiAgICAgICAgcmVzb3VyY2UsIHJlcXVlc3QsIHJlcXVlc3RfdXJpLCByZXNwb25zZV9tb2RlLCBleHRyYVF1ZXJ5UGFyYW1zLCBleHRyYVRva2VuUGFyYW1zLCByZXF1ZXN0X3R5cGUsIHNraXBVc2VySW5mbyB9ID0ge30sXG4gICAgICAgIHN0YXRlU3RvcmVcbiAgICApIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5jcmVhdGVTaWduaW5SZXF1ZXN0XCIpO1xuXG4gICAgICAgIGxldCBjbGllbnRfaWQgPSB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgICAgIHJlc3BvbnNlX3R5cGUgPSByZXNwb25zZV90eXBlIHx8IHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX3R5cGU7XG4gICAgICAgIHNjb3BlID0gc2NvcGUgfHwgdGhpcy5fc2V0dGluZ3Muc2NvcGU7XG4gICAgICAgIHJlZGlyZWN0X3VyaSA9IHJlZGlyZWN0X3VyaSB8fCB0aGlzLl9zZXR0aW5ncy5yZWRpcmVjdF91cmk7XG5cbiAgICAgICAgLy8gaWRfdG9rZW5faGludCwgbG9naW5faGludCBhcmVuJ3QgYWxsb3dlZCBvbiBfc2V0dGluZ3NcbiAgICAgICAgcHJvbXB0ID0gcHJvbXB0IHx8IHRoaXMuX3NldHRpbmdzLnByb21wdDtcbiAgICAgICAgZGlzcGxheSA9IGRpc3BsYXkgfHwgdGhpcy5fc2V0dGluZ3MuZGlzcGxheTtcbiAgICAgICAgbWF4X2FnZSA9IG1heF9hZ2UgfHwgdGhpcy5fc2V0dGluZ3MubWF4X2FnZTtcbiAgICAgICAgdWlfbG9jYWxlcyA9IHVpX2xvY2FsZXMgfHwgdGhpcy5fc2V0dGluZ3MudWlfbG9jYWxlcztcbiAgICAgICAgYWNyX3ZhbHVlcyA9IGFjcl92YWx1ZXMgfHwgdGhpcy5fc2V0dGluZ3MuYWNyX3ZhbHVlcztcbiAgICAgICAgcmVzb3VyY2UgPSByZXNvdXJjZSB8fCB0aGlzLl9zZXR0aW5ncy5yZXNvdXJjZTtcbiAgICAgICAgcmVzcG9uc2VfbW9kZSA9IHJlc3BvbnNlX21vZGUgfHwgdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZTtcbiAgICAgICAgZXh0cmFRdWVyeVBhcmFtcyA9IGV4dHJhUXVlcnlQYXJhbXMgfHwgdGhpcy5fc2V0dGluZ3MuZXh0cmFRdWVyeVBhcmFtcztcbiAgICAgICAgZXh0cmFUb2tlblBhcmFtcyA9IGV4dHJhVG9rZW5QYXJhbXMgfHwgdGhpcy5fc2V0dGluZ3MuZXh0cmFUb2tlblBhcmFtcztcblxuICAgICAgICBsZXQgYXV0aG9yaXR5ID0gdGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5O1xuXG4gICAgICAgIGlmIChTaWduaW5SZXF1ZXN0LmlzQ29kZShyZXNwb25zZV90eXBlKSAmJiByZXNwb25zZV90eXBlICE9PSBcImNvZGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk9wZW5JRCBDb25uZWN0IGh5YnJpZCBmbG93IGlzIG5vdCBzdXBwb3J0ZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRBdXRob3JpemF0aW9uRW5kcG9pbnQoKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25pblJlcXVlc3Q6IFJlY2VpdmVkIGF1dGhvcml6YXRpb24gZW5kcG9pbnRcIiwgdXJsKTtcblxuICAgICAgICAgICAgbGV0IHNpZ25pblJlcXVlc3QgPSBuZXcgU2lnbmluUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIGNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICByZWRpcmVjdF91cmksXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VfdHlwZSxcbiAgICAgICAgICAgICAgICBzY29wZSxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhIHx8IHN0YXRlLFxuICAgICAgICAgICAgICAgIGF1dGhvcml0eSxcbiAgICAgICAgICAgICAgICBwcm9tcHQsIGRpc3BsYXksIG1heF9hZ2UsIHVpX2xvY2FsZXMsIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQsIGFjcl92YWx1ZXMsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UsIHJlcXVlc3QsIHJlcXVlc3RfdXJpLCBleHRyYVF1ZXJ5UGFyYW1zLCBleHRyYVRva2VuUGFyYW1zLCByZXF1ZXN0X3R5cGUsIHJlc3BvbnNlX21vZGUsXG4gICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogdGhpcy5fc2V0dGluZ3MuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICBza2lwVXNlckluZm9cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc2lnbmluU3RhdGUgPSBzaWduaW5SZXF1ZXN0LnN0YXRlO1xuICAgICAgICAgICAgc3RhdGVTdG9yZSA9IHN0YXRlU3RvcmUgfHwgdGhpcy5fc3RhdGVTdG9yZTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlU3RvcmUuc2V0KHNpZ25pblN0YXRlLmlkLCBzaWduaW5TdGF0ZS50b1N0b3JhZ2VTdHJpbmcoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpZ25pblJlcXVlc3Q7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZFNpZ25pblJlc3BvbnNlU3RhdGUodXJsLCBzdGF0ZVN0b3JlLCByZW1vdmVTdGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucmVhZFNpZ25pblJlc3BvbnNlU3RhdGVcIik7XG5cbiAgICAgICAgbGV0IHVzZVF1ZXJ5ID0gdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZSA9PT0gXCJxdWVyeVwiIHx8IFxuICAgICAgICAgICAgKCF0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV9tb2RlICYmIFNpZ25pblJlcXVlc3QuaXNDb2RlKHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX3R5cGUpKTtcbiAgICAgICAgbGV0IGRlbGltaXRlciA9IHVzZVF1ZXJ5ID8gXCI/XCIgOiBcIiNcIjtcblxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBuZXcgU2lnbmluUmVzcG9uc2UodXJsLCBkZWxpbWl0ZXIpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2Uuc3RhdGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnQucmVhZFNpZ25pblJlc3BvbnNlU3RhdGU6IE5vIHN0YXRlIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHN0YXRlIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgdmFyIHN0YXRlQXBpID0gcmVtb3ZlU3RhdGUgPyBzdGF0ZVN0b3JlLnJlbW92ZS5iaW5kKHN0YXRlU3RvcmUpIDogc3RhdGVTdG9yZS5nZXQuYmluZChzdGF0ZVN0b3JlKTtcblxuICAgICAgICByZXR1cm4gc3RhdGVBcGkocmVzcG9uc2Uuc3RhdGUpLnRoZW4oc3RvcmVkU3RhdGVTdHJpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdG9yZWRTdGF0ZVN0cmluZykge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnQucmVhZFNpZ25pblJlc3BvbnNlU3RhdGU6IE5vIG1hdGNoaW5nIHN0YXRlIGZvdW5kIGluIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbWF0Y2hpbmcgc3RhdGUgZm91bmQgaW4gc3RvcmFnZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN0YXRlID0gU2lnbmluU3RhdGUuZnJvbVN0b3JhZ2VTdHJpbmcoc3RvcmVkU3RhdGVTdHJpbmcpO1xuICAgICAgICAgICAgcmV0dXJuIHtzdGF0ZSwgcmVzcG9uc2V9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9jZXNzU2lnbmluUmVzcG9uc2UodXJsLCBzdGF0ZVN0b3JlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucHJvY2Vzc1NpZ25pblJlc3BvbnNlXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRTaWduaW5SZXNwb25zZVN0YXRlKHVybCwgc3RhdGVTdG9yZSwgdHJ1ZSkudGhlbigoe3N0YXRlLCByZXNwb25zZX0pID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucHJvY2Vzc1NpZ25pblJlc3BvbnNlOiBSZWNlaXZlZCBzdGF0ZSBmcm9tIHN0b3JhZ2U7IHZhbGlkYXRpbmcgcmVzcG9uc2VcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2Uoc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlU2lnbm91dFJlcXVlc3Qoe2lkX3Rva2VuX2hpbnQsIGRhdGEsIHN0YXRlLCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmksIGV4dHJhUXVlcnlQYXJhbXMsIHJlcXVlc3RfdHlwZSB9ID0ge30sXG4gICAgICAgIHN0YXRlU3RvcmVcbiAgICApIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5jcmVhdGVTaWdub3V0UmVxdWVzdFwiKTtcblxuICAgICAgICBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgPSBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgfHwgdGhpcy5fc2V0dGluZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgICAgICBleHRyYVF1ZXJ5UGFyYW1zID0gZXh0cmFRdWVyeVBhcmFtcyB8fCB0aGlzLl9zZXR0aW5ncy5leHRyYVF1ZXJ5UGFyYW1zO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0RW5kU2Vzc2lvbkVuZHBvaW50KCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25vdXRSZXF1ZXN0OiBObyBlbmQgc2Vzc2lvbiBlbmRwb2ludCB1cmwgcmV0dXJuZWRcIik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gZW5kIHNlc3Npb24gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbm91dFJlcXVlc3Q6IFJlY2VpdmVkIGVuZCBzZXNzaW9uIGVuZHBvaW50XCIsIHVybCk7XG5cbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFNpZ25vdXRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgaWRfdG9rZW5faGludCxcbiAgICAgICAgICAgICAgICBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmksXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSB8fCBzdGF0ZSxcbiAgICAgICAgICAgICAgICBleHRyYVF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RfdHlwZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBzaWdub3V0U3RhdGUgPSByZXF1ZXN0LnN0YXRlO1xuICAgICAgICAgICAgaWYgKHNpZ25vdXRTdGF0ZSkge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbm91dFJlcXVlc3Q6IFNpZ25vdXQgcmVxdWVzdCBoYXMgc3RhdGUgdG8gcGVyc2lzdFwiKTtcblxuICAgICAgICAgICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG4gICAgICAgICAgICAgICAgc3RhdGVTdG9yZS5zZXQoc2lnbm91dFN0YXRlLmlkLCBzaWdub3V0U3RhdGUudG9TdG9yYWdlU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlKHVybCwgc3RhdGVTdG9yZSwgcmVtb3ZlU3RhdGUgPSBmYWxzZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZVwiKTtcblxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBuZXcgU2lnbm91dFJlc3BvbnNlKHVybCk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uuc3RhdGUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlOiBObyBzdGF0ZSBpbiByZXNwb25zZVwiKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgTG9nLndhcm4oXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZTogUmVzcG9uc2Ugd2FzIGVycm9yOiBcIiwgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3JSZXNwb25zZShyZXNwb25zZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtzdGF0ZTogdW5kZWZpbmVkLCByZXNwb25zZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXRlS2V5ID0gcmVzcG9uc2Uuc3RhdGU7XG5cbiAgICAgICAgc3RhdGVTdG9yZSA9IHN0YXRlU3RvcmUgfHwgdGhpcy5fc3RhdGVTdG9yZTtcblxuICAgICAgICB2YXIgc3RhdGVBcGkgPSByZW1vdmVTdGF0ZSA/IHN0YXRlU3RvcmUucmVtb3ZlLmJpbmQoc3RhdGVTdG9yZSkgOiBzdGF0ZVN0b3JlLmdldC5iaW5kKHN0YXRlU3RvcmUpO1xuICAgICAgICByZXR1cm4gc3RhdGVBcGkoc3RhdGVLZXkpLnRoZW4oc3RvcmVkU3RhdGVTdHJpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdG9yZWRTdGF0ZVN0cmluZykge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnQucmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlOiBObyBtYXRjaGluZyBzdGF0ZSBmb3VuZCBpbiBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1hdGNoaW5nIHN0YXRlIGZvdW5kIGluIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IFN0YXRlLmZyb21TdG9yYWdlU3RyaW5nKHN0b3JlZFN0YXRlU3RyaW5nKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtzdGF0ZSwgcmVzcG9uc2V9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9jZXNzU2lnbm91dFJlc3BvbnNlKHVybCwgc3RhdGVTdG9yZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWdub3V0UmVzcG9uc2VcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlKHVybCwgc3RhdGVTdG9yZSwgdHJ1ZSkudGhlbigoe3N0YXRlLCByZXNwb25zZX0pID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucHJvY2Vzc1NpZ25vdXRSZXNwb25zZTogUmVjZWl2ZWQgc3RhdGUgZnJvbSBzdG9yYWdlOyB2YWxpZGF0aW5nIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3IudmFsaWRhdGVTaWdub3V0UmVzcG9uc2Uoc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucHJvY2Vzc1NpZ25vdXRSZXNwb25zZTogTm8gc3RhdGUgZnJvbSBzdG9yYWdlOyBza2lwcGluZyB2YWxpZGF0aW5nIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJTdGFsZVN0YXRlKHN0YXRlU3RvcmUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5jbGVhclN0YWxlU3RhdGVcIik7XG5cbiAgICAgICAgc3RhdGVTdG9yZSA9IHN0YXRlU3RvcmUgfHwgdGhpcy5fc3RhdGVTdG9yZTtcblxuICAgICAgICByZXR1cm4gU3RhdGUuY2xlYXJTdGFsZVN0YXRlKHN0YXRlU3RvcmUsIHRoaXMuc2V0dGluZ3Muc3RhbGVTdGF0ZUFnZSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgQ2xvY2tTZXJ2aWNlIH0gZnJvbSAnLi9DbG9ja1NlcnZpY2UuanMnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZVN0YXRlU3RvcmUgfSBmcm9tICcuL1dlYlN0b3JhZ2VTdGF0ZVN0b3JlLmpzJztcbmltcG9ydCB7IFJlc3BvbnNlVmFsaWRhdG9yIH0gZnJvbSAnLi9SZXNwb25zZVZhbGlkYXRvci5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL01ldGFkYXRhU2VydmljZS5qcyc7XG5cbmNvbnN0IE9pZGNNZXRhZGF0YVVybFBhdGggPSAnLndlbGwta25vd24vb3BlbmlkLWNvbmZpZ3VyYXRpb24nO1xuXG5jb25zdCBEZWZhdWx0UmVzcG9uc2VUeXBlID0gXCJpZF90b2tlblwiO1xuY29uc3QgRGVmYXVsdFNjb3BlID0gXCJvcGVuaWRcIjtcbmNvbnN0IERlZmF1bHRDbGllbnRBdXRoZW50aWNhdGlvbiA9IFwiY2xpZW50X3NlY3JldF9wb3N0XCIgLy8gVGhlIGRlZmF1bHQgdmFsdWUgbXVzdCBiZSBjbGllbnRfc2VjcmV0X2Jhc2ljLCBhcyBleHBsYWluZWQgaW4gaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjQ2xpZW50QXV0aGVudGljYXRpb25cbmNvbnN0IERlZmF1bHRTdGFsZVN0YXRlQWdlID0gNjAgKiAxNTsgLy8gc2Vjb25kc1xuY29uc3QgRGVmYXVsdENsb2NrU2tld0luU2Vjb25kcyA9IDYwICogNTtcblxuZXhwb3J0IGNsYXNzIE9pZGNDbGllbnRTZXR0aW5ncyB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICAvLyBtZXRhZGF0YSByZWxhdGVkXG4gICAgICAgIGF1dGhvcml0eSwgbWV0YWRhdGFVcmwsIG1ldGFkYXRhLCBzaWduaW5nS2V5cywgbWV0YWRhdGFTZWVkLFxuICAgICAgICAvLyBjbGllbnQgcmVsYXRlZFxuICAgICAgICBjbGllbnRfaWQsIGNsaWVudF9zZWNyZXQsIHJlc3BvbnNlX3R5cGUgPSBEZWZhdWx0UmVzcG9uc2VUeXBlLCBzY29wZSA9IERlZmF1bHRTY29wZSxcbiAgICAgICAgcmVkaXJlY3RfdXJpLCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmksXG4gICAgICAgIGNsaWVudF9hdXRoZW50aWNhdGlvbiA9IERlZmF1bHRDbGllbnRBdXRoZW50aWNhdGlvbixcbiAgICAgICAgLy8gb3B0aW9uYWwgcHJvdG9jb2xcbiAgICAgICAgcHJvbXB0LCBkaXNwbGF5LCBtYXhfYWdlLCB1aV9sb2NhbGVzLCBhY3JfdmFsdWVzLCByZXNvdXJjZSwgcmVzcG9uc2VfbW9kZSxcbiAgICAgICAgLy8gYmVoYXZpb3IgZmxhZ3NcbiAgICAgICAgZmlsdGVyUHJvdG9jb2xDbGFpbXMgPSB0cnVlLCBsb2FkVXNlckluZm8gPSB0cnVlLFxuICAgICAgICBzdGFsZVN0YXRlQWdlID0gRGVmYXVsdFN0YWxlU3RhdGVBZ2UsIFxuICAgICAgICBjbG9ja1NrZXcgPSBEZWZhdWx0Q2xvY2tTa2V3SW5TZWNvbmRzLFxuICAgICAgICBjbG9ja1NlcnZpY2UgPSBuZXcgQ2xvY2tTZXJ2aWNlKCksXG4gICAgICAgIHVzZXJJbmZvSnd0SXNzdWVyID0gJ09QJyxcbiAgICAgICAgbWVyZ2VDbGFpbXMgPSBmYWxzZSxcbiAgICAgICAgLy8gb3RoZXIgYmVoYXZpb3JcbiAgICAgICAgc3RhdGVTdG9yZSA9IG5ldyBXZWJTdG9yYWdlU3RhdGVTdG9yZSgpLFxuICAgICAgICBSZXNwb25zZVZhbGlkYXRvckN0b3IgPSBSZXNwb25zZVZhbGlkYXRvcixcbiAgICAgICAgTWV0YWRhdGFTZXJ2aWNlQ3RvciA9IE1ldGFkYXRhU2VydmljZSxcbiAgICAgICAgLy8gZXh0cmEgcXVlcnkgcGFyYW1zXG4gICAgICAgIGV4dHJhUXVlcnlQYXJhbXMgPSB7fSxcbiAgICAgICAgZXh0cmFUb2tlblBhcmFtcyA9IHt9XG4gICAgfSA9IHt9KSB7XG5cbiAgICAgICAgdGhpcy5fYXV0aG9yaXR5ID0gYXV0aG9yaXR5O1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVVybCA9IG1ldGFkYXRhVXJsO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlZWQgPSBtZXRhZGF0YVNlZWQ7XG4gICAgICAgIHRoaXMuX3NpZ25pbmdLZXlzID0gc2lnbmluZ0tleXM7XG5cbiAgICAgICAgdGhpcy5fY2xpZW50X2lkID0gY2xpZW50X2lkO1xuICAgICAgICB0aGlzLl9jbGllbnRfc2VjcmV0ID0gY2xpZW50X3NlY3JldDtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VfdHlwZSA9IHJlc3BvbnNlX3R5cGU7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX3JlZGlyZWN0X3VyaSA9IHJlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgICAgICB0aGlzLl9jbGllbnRfYXV0aGVudGljYXRpb24gPSBjbGllbnRfYXV0aGVudGljYXRpb247XG5cbiAgICAgICAgdGhpcy5fcHJvbXB0ID0gcHJvbXB0O1xuICAgICAgICB0aGlzLl9kaXNwbGF5ID0gZGlzcGxheTtcbiAgICAgICAgdGhpcy5fbWF4X2FnZSA9IG1heF9hZ2U7XG4gICAgICAgIHRoaXMuX3VpX2xvY2FsZXMgPSB1aV9sb2NhbGVzO1xuICAgICAgICB0aGlzLl9hY3JfdmFsdWVzID0gYWNyX3ZhbHVlcztcbiAgICAgICAgdGhpcy5fcmVzb3VyY2UgPSByZXNvdXJjZTtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VfbW9kZSA9IHJlc3BvbnNlX21vZGU7XG5cbiAgICAgICAgdGhpcy5fZmlsdGVyUHJvdG9jb2xDbGFpbXMgPSAhIWZpbHRlclByb3RvY29sQ2xhaW1zO1xuICAgICAgICB0aGlzLl9sb2FkVXNlckluZm8gPSAhIWxvYWRVc2VySW5mbztcbiAgICAgICAgdGhpcy5fc3RhbGVTdGF0ZUFnZSA9IHN0YWxlU3RhdGVBZ2U7XG4gICAgICAgIHRoaXMuX2Nsb2NrU2tldyA9IGNsb2NrU2tldztcbiAgICAgICAgdGhpcy5fY2xvY2tTZXJ2aWNlID0gY2xvY2tTZXJ2aWNlO1xuICAgICAgICB0aGlzLl91c2VySW5mb0p3dElzc3VlciA9IHVzZXJJbmZvSnd0SXNzdWVyO1xuICAgICAgICB0aGlzLl9tZXJnZUNsYWltcyA9ICEhbWVyZ2VDbGFpbXM7XG5cbiAgICAgICAgdGhpcy5fc3RhdGVTdG9yZSA9IHN0YXRlU3RvcmU7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRvciA9IG5ldyBSZXNwb25zZVZhbGlkYXRvckN0b3IodGhpcyk7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZSA9IG5ldyBNZXRhZGF0YVNlcnZpY2VDdG9yKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2V4dHJhUXVlcnlQYXJhbXMgPSB0eXBlb2YgZXh0cmFRdWVyeVBhcmFtcyA9PT0gJ29iamVjdCcgPyBleHRyYVF1ZXJ5UGFyYW1zIDoge307XG4gICAgICAgIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXMgPSB0eXBlb2YgZXh0cmFUb2tlblBhcmFtcyA9PT0gJ29iamVjdCcgPyBleHRyYVRva2VuUGFyYW1zIDoge307XG4gICAgfVxuXG4gICAgLy8gY2xpZW50IGNvbmZpZ1xuICAgIGdldCBjbGllbnRfaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnRfaWQ7XG4gICAgfVxuICAgIHNldCBjbGllbnRfaWQodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jbGllbnRfaWQpIHtcbiAgICAgICAgICAgIC8vIG9uZS10aW1lIHNldCBvbmx5XG4gICAgICAgICAgICB0aGlzLl9jbGllbnRfaWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnRTZXR0aW5ncy5zZXRfY2xpZW50X2lkOiBjbGllbnRfaWQgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNsaWVudF9pZCBoYXMgYWxyZWFkeSBiZWVuIGFzc2lnbmVkLlwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBjbGllbnRfc2VjcmV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50X3NlY3JldDtcbiAgICB9XG4gICAgZ2V0IHJlc3BvbnNlX3R5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zZV90eXBlO1xuICAgIH1cbiAgICBnZXQgc2NvcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29wZTtcbiAgICB9XG4gICAgZ2V0IHJlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgZ2V0IHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgZ2V0IGNsaWVudF9hdXRoZW50aWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9hdXRoZW50aWNhdGlvbjtcbiAgICB9XG4gICAgXG5cbiAgICAvLyBvcHRpb25hbCBwcm90b2NvbCBwYXJhbXNcbiAgICBnZXQgcHJvbXB0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbXB0O1xuICAgIH1cbiAgICBnZXQgZGlzcGxheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXk7XG4gICAgfVxuICAgIGdldCBtYXhfYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4X2FnZTtcbiAgICB9XG4gICAgZ2V0IHVpX2xvY2FsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91aV9sb2NhbGVzO1xuICAgIH1cbiAgICBnZXQgYWNyX3ZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fjcl92YWx1ZXM7XG4gICAgfVxuICAgIGdldCByZXNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlO1xuICAgIH1cbiAgICBnZXQgcmVzcG9uc2VfbW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNlX21vZGU7XG4gICAgfVxuXG5cbiAgICAvLyBtZXRhZGF0YVxuICAgIGdldCBhdXRob3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRob3JpdHk7XG4gICAgfVxuICAgIHNldCBhdXRob3JpdHkodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hdXRob3JpdHkpIHtcbiAgICAgICAgICAgIC8vIG9uZS10aW1lIHNldCBvbmx5XG4gICAgICAgICAgICB0aGlzLl9hdXRob3JpdHkgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnRTZXR0aW5ncy5zZXRfYXV0aG9yaXR5OiBhdXRob3JpdHkgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImF1dGhvcml0eSBoYXMgYWxyZWFkeSBiZWVuIGFzc2lnbmVkLlwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVVybCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tZXRhZGF0YVVybCkge1xuICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgPSB0aGlzLmF1dGhvcml0eTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX21ldGFkYXRhVXJsICYmIHRoaXMuX21ldGFkYXRhVXJsLmluZGV4T2YoT2lkY01ldGFkYXRhVXJsUGF0aCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21ldGFkYXRhVXJsW3RoaXMuX21ldGFkYXRhVXJsLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gJy8nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YVVybCArPSBPaWRjTWV0YWRhdGFVcmxQYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhVXJsO1xuICAgIH1cblxuICAgIC8vIHNldHRhYmxlL2NhY2hhYmxlIG1ldGFkYXRhIHZhbHVlc1xuICAgIGdldCBtZXRhZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhO1xuICAgIH1cbiAgICBzZXQgbWV0YWRhdGEodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IG1ldGFkYXRhU2VlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VlZDtcbiAgICB9XG4gICAgc2V0IG1ldGFkYXRhU2VlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgc2lnbmluZ0tleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5nS2V5cztcbiAgICB9XG4gICAgc2V0IHNpZ25pbmdLZXlzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3NpZ25pbmdLZXlzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gYmVoYXZpb3IgZmxhZ3NcbiAgICBnZXQgZmlsdGVyUHJvdG9jb2xDbGFpbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJQcm90b2NvbENsYWltcztcbiAgICB9XG4gICAgZ2V0IGxvYWRVc2VySW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VySW5mbztcbiAgICB9XG4gICAgZ2V0IHN0YWxlU3RhdGVBZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFsZVN0YXRlQWdlO1xuICAgIH1cbiAgICBnZXQgY2xvY2tTa2V3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvY2tTa2V3O1xuICAgIH1cbiAgICBnZXQgdXNlckluZm9Kd3RJc3N1ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VySW5mb0p3dElzc3VlcjtcbiAgICB9XG4gICAgZ2V0IG1lcmdlQ2xhaW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVyZ2VDbGFpbXM7XG4gICAgfVxuICAgIFxuICAgIGdldCBzdGF0ZVN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVTdG9yZTtcbiAgICB9XG4gICAgZ2V0IHZhbGlkYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvcjtcbiAgICB9XG4gICAgZ2V0IG1ldGFkYXRhU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZTtcbiAgICB9XG5cbiAgICAvLyBleHRyYSBxdWVyeSBwYXJhbXNcbiAgICBnZXQgZXh0cmFRdWVyeVBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dHJhUXVlcnlQYXJhbXM7XG4gICAgfVxuICAgIHNldCBleHRyYVF1ZXJ5UGFyYW1zKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKXtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhUXVlcnlQYXJhbXMgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhUXVlcnlQYXJhbXMgPSB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV4dHJhIHRva2VuIHBhcmFtc1xuICAgIGdldCBleHRyYVRva2VuUGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0cmFUb2tlblBhcmFtcztcbiAgICB9XG4gICAgc2V0IGV4dHJhVG9rZW5QYXJhbXModmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgdGhpcy5fZXh0cmFUb2tlblBhcmFtcyA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZXh0cmFUb2tlblBhcmFtcyA9IHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSB0aW1lXG4gICAgZ2V0RXBvY2hUaW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvY2tTZXJ2aWNlLmdldEVwb2NoVGltZSgpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFBvcHVwV2luZG93IH0gZnJvbSAnLi9Qb3B1cFdpbmRvdy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQb3B1cE5hdmlnYXRvciB7XG5cbiAgICBwcmVwYXJlKHBhcmFtcykge1xuICAgICAgICBsZXQgcG9wdXAgPSBuZXcgUG9wdXBXaW5kb3cocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwb3B1cCk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2sodXJsLCBrZWVwT3BlbiwgZGVsaW1pdGVyKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwTmF2aWdhdG9yLmNhbGxiYWNrXCIpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXIodXJsLCBrZWVwT3BlbiwgZGVsaW1pdGVyKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5cbmNvbnN0IENoZWNrRm9yUG9wdXBDbG9zZWRJbnRlcnZhbCA9IDUwMDtcbmNvbnN0IERlZmF1bHRQb3B1cEZlYXR1cmVzID0gJ2xvY2F0aW9uPW5vLHRvb2xiYXI9bm8sd2lkdGg9NTAwLGhlaWdodD01MDAsbGVmdD0xMDAsdG9wPTEwMDsnO1xuLy9jb25zdCBEZWZhdWx0UG9wdXBGZWF0dXJlcyA9ICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vLHdpZHRoPTUwMCxoZWlnaHQ9NTAwLGxlZnQ9MTAwLHRvcD0xMDA7cmVzaXphYmxlPXllcyc7XG5cbmNvbnN0IERlZmF1bHRQb3B1cFRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbmV4cG9ydCBjbGFzcyBQb3B1cFdpbmRvdyB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdGFyZ2V0ID0gcGFyYW1zLnBvcHVwV2luZG93VGFyZ2V0IHx8IERlZmF1bHRQb3B1cFRhcmdldDtcbiAgICAgICAgbGV0IGZlYXR1cmVzID0gcGFyYW1zLnBvcHVwV2luZG93RmVhdHVyZXMgfHwgRGVmYXVsdFBvcHVwRmVhdHVyZXM7XG5cbiAgICAgICAgdGhpcy5fcG9wdXAgPSB3aW5kb3cub3BlbignJywgdGFyZ2V0LCBmZWF0dXJlcyk7XG4gICAgICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUG9wdXBXaW5kb3cuY3RvcjogcG9wdXAgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0ZvclBvcHVwQ2xvc2VkVGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5fY2hlY2tGb3JQb3B1cENsb3NlZC5iaW5kKHRoaXMpLCBDaGVja0ZvclBvcHVwQ2xvc2VkSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICAgIH1cblxuICAgIG5hdmlnYXRlKHBhcmFtcykge1xuICAgICAgICBpZiAoIXRoaXMuX3BvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIlBvcHVwV2luZG93Lm5hdmlnYXRlOiBFcnJvciBvcGVuaW5nIHBvcHVwIHdpbmRvd1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghcGFyYW1zIHx8ICFwYXJhbXMudXJsKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIlBvcHVwV2luZG93Lm5hdmlnYXRlOiBubyB1cmwgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIk5vIHVybCBwcm92aWRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93Lm5hdmlnYXRlOiBTZXR0aW5nIFVSTCBpbiBwb3B1cFwiKTtcblxuICAgICAgICAgICAgdGhpcy5faWQgPSBwYXJhbXMuaWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbXCJwb3B1cENhbGxiYWNrX1wiICsgcGFyYW1zLmlkXSA9IHRoaXMuX2NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3BvcHVwLmZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC53aW5kb3cubG9jYXRpb24gPSBwYXJhbXMudXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZTtcbiAgICB9XG5cbiAgICBfc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93LmNhbGxiYWNrOiBTdWNjZXNzZnVsIHJlc3BvbnNlIGZyb20gcG9wdXAgd2luZG93XCIpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZShkYXRhKTtcbiAgICB9XG4gICAgX2Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgTG9nLmVycm9yKFwiUG9wdXBXaW5kb3cuZXJyb3I6IFwiLCBtZXNzYWdlKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgdGhpcy5fcmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoZmFsc2UpO1xuICAgIH1cblxuICAgIF9jbGVhbnVwKGtlZXBPcGVuKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93LmNsZWFudXBcIik7XG5cbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5fY2hlY2tGb3JQb3B1cENsb3NlZFRpbWVyKTtcbiAgICAgICAgdGhpcy5fY2hlY2tGb3JQb3B1cENsb3NlZFRpbWVyID0gbnVsbDtcblxuICAgICAgICBkZWxldGUgd2luZG93W1wicG9wdXBDYWxsYmFja19cIiArIHRoaXMuX2lkXTtcblxuICAgICAgICBpZiAodGhpcy5fcG9wdXAgJiYgIWtlZXBPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BvcHVwID0gbnVsbDtcbiAgICB9XG5cbiAgICBfY2hlY2tGb3JQb3B1cENsb3NlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb3B1cCB8fCB0aGlzLl9wb3B1cC5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiUG9wdXAgd2luZG93IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxsYmFjayh1cmwsIGtlZXBPcGVuKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoa2VlcE9wZW4pO1xuXG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93LmNhbGxiYWNrIHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICB0aGlzLl9zdWNjZXNzKHsgdXJsOiB1cmwgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jYWxsYmFjazogSW52YWxpZCByZXNwb25zZSBmcm9tIHBvcHVwXCIpO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJJbnZhbGlkIHJlc3BvbnNlIGZyb20gcG9wdXBcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbm90aWZ5T3BlbmVyKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcikge1xuICAgICAgICBpZiAod2luZG93Lm9wZW5lcikge1xuICAgICAgICAgICAgdXJsID0gdXJsIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gVXJsVXRpbGl0eS5wYXJzZVVybEZyYWdtZW50KHVybCwgZGVsaW1pdGVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gXCJwb3B1cENhbGxiYWNrX1wiICsgZGF0YS5zdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gd2luZG93Lm9wZW5lcltuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXI6IHBhc3NpbmcgdXJsIG1lc3NhZ2UgdG8gb3BlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodXJsLCBrZWVwT3Blbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cud2FybihcIlBvcHVwV2luZG93Lm5vdGlmeU9wZW5lcjogbm8gbWF0Y2hpbmcgY2FsbGJhY2sgZm91bmQgb24gb3BlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cud2FybihcIlBvcHVwV2luZG93Lm5vdGlmeU9wZW5lcjogbm8gc3RhdGUgZm91bmQgaW4gcmVzcG9uc2UgdXJsXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy53YXJuKFwiUG9wdXBXaW5kb3cubm90aWZ5T3BlbmVyOiBubyB3aW5kb3cub3BlbmVyLiBDYW4ndCBjb21wbGV0ZSBub3RpZmljYXRpb24uXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgUmVkaXJlY3ROYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMgfHwgIXBhcmFtcy51cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlZGlyZWN0TmF2aWdhdG9yLm5hdmlnYXRlOiBObyB1cmwgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gdXJsIHByb3ZpZGVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMudXNlUmVwbGFjZVRvTmF2aWdhdGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHBhcmFtcy51cmwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gcGFyYW1zLnVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBnZXQgdXJsKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuaW1wb3J0IHsgVXNlckluZm9TZXJ2aWNlIH0gZnJvbSAnLi9Vc2VySW5mb1NlcnZpY2UuanMnO1xuaW1wb3J0IHsgVG9rZW5DbGllbnQgfSBmcm9tICcuL1Rva2VuQ2xpZW50LmpzJztcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL0Vycm9yUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgSm9zZVV0aWwgfSBmcm9tICcuL0pvc2VVdGlsLmpzJztcblxuY29uc3QgUHJvdG9jb2xDbGFpbXMgPSBbXCJub25jZVwiLCBcImF0X2hhc2hcIiwgXCJpYXRcIiwgXCJuYmZcIiwgXCJleHBcIiwgXCJhdWRcIiwgXCJpc3NcIiwgXCJjX2hhc2hcIl07XG5cbmV4cG9ydCBjbGFzcyBSZXNwb25zZVZhbGlkYXRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgXG4gICAgICAgIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UsXG4gICAgICAgIFVzZXJJbmZvU2VydmljZUN0b3IgPSBVc2VySW5mb1NlcnZpY2UsIFxuICAgICAgICBqb3NlVXRpbCA9IEpvc2VVdGlsLFxuICAgICAgICBUb2tlbkNsaWVudEN0b3IgPSBUb2tlbkNsaWVudCkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5jdG9yOiBObyBzZXR0aW5ncyBwYXNzZWQgdG8gUmVzcG9uc2VWYWxpZGF0b3JcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZSA9IG5ldyBNZXRhZGF0YVNlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fdXNlckluZm9TZXJ2aWNlID0gbmV3IFVzZXJJbmZvU2VydmljZUN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl9qb3NlVXRpbCA9IGpvc2VVdGlsO1xuICAgICAgICB0aGlzLl90b2tlbkNsaWVudCA9IG5ldyBUb2tlbkNsaWVudEN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlU2lnbmluUmVzcG9uc2Uoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2VcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NTaWduaW5QYXJhbXMoc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2U6IHN0YXRlIHByb2Nlc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZVRva2VucyhzdGF0ZSwgcmVzcG9uc2UpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2U6IHRva2VucyB2YWxpZGF0ZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NDbGFpbXMoc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IudmFsaWRhdGVTaWduaW5SZXNwb25zZTogY2xhaW1zIHByb2Nlc3NlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhbGlkYXRlU2lnbm91dFJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoc3RhdGUuaWQgIT09IHJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25vdXRSZXNwb25zZTogU3RhdGUgZG9lcyBub3QgbWF0Y2hcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiU3RhdGUgZG9lcyBub3QgbWF0Y2hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IHRoYXQgd2Uga25vdyB0aGUgc3RhdGUgbWF0Y2hlcywgdGFrZSB0aGUgc3RvcmVkIGRhdGFcbiAgICAgICAgLy8gYW5kIHNldCBpdCBpbnRvIHRoZSByZXNwb25zZSBzbyBjYWxsZXJzIGNhbiBnZXQgdGhlaXIgc3RhdGVcbiAgICAgICAgLy8gdGhpcyBpcyBpbXBvcnRhbnQgZm9yIGJvdGggc3VjY2VzcyAmIGVycm9yIG91dGNvbWVzXG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbm91dFJlc3BvbnNlOiBzdGF0ZSB2YWxpZGF0ZWRcIik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXRlID0gc3RhdGUuZGF0YTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIExvZy53YXJuKFwiUmVzcG9uc2VWYWxpZGF0b3IudmFsaWRhdGVTaWdub3V0UmVzcG9uc2U6IFJlc3BvbnNlIHdhcyBlcnJvclwiLCByZXNwb25zZS5lcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIF9wcm9jZXNzU2lnbmluUGFyYW1zKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoc3RhdGUuaWQgIT09IHJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogU3RhdGUgZG9lcyBub3QgbWF0Y2hcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiU3RhdGUgZG9lcyBub3QgbWF0Y2hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGF0ZS5jbGllbnRfaWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBObyBjbGllbnRfaWQgb24gc3RhdGVcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gY2xpZW50X2lkIG9uIHN0YXRlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUuYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogTm8gYXV0aG9yaXR5IG9uIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGF1dGhvcml0eSBvbiBzdGF0ZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzIGFsbG93cyB0aGUgYXV0aG9yaXR5IHRvIGJlIGxvYWRlZCBmcm9tIHRoZSBzaWduaW4gc3RhdGVcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5hdXRob3JpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eSA9IHN0YXRlLmF1dGhvcml0eTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbnN1cmUgd2UncmUgdXNpbmcgdGhlIGNvcnJlY3QgYXV0aG9yaXR5IGlmIHRoZSBhdXRob3JpdHkgaXMgbm90IGxvYWRlZCBmcm9tIHNpZ25pbiBzdGF0ZVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZXR0aW5ncy5hdXRob3JpdHkgJiYgdGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5ICE9PSBzdGF0ZS5hdXRob3JpdHkpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBhdXRob3JpdHkgbWlzbWF0Y2ggb24gc2V0dGluZ3MgdnMuIHNpZ25pbiBzdGF0ZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhdXRob3JpdHkgbWlzbWF0Y2ggb24gc2V0dGluZ3MgdnMuIHNpZ25pbiBzdGF0ZVwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcyBhbGxvd3MgdGhlIGNsaWVudF9pZCB0byBiZSBsb2FkZWQgZnJvbSB0aGUgc2lnbmluIHN0YXRlXG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQgPSBzdGF0ZS5jbGllbnRfaWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5zdXJlIHdlJ3JlIHVzaW5nIHRoZSBjb3JyZWN0IGNsaWVudF9pZCBpZiB0aGUgY2xpZW50X2lkIGlzIG5vdCBsb2FkZWQgZnJvbSBzaWduaW4gc3RhdGVcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkICYmIHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCAhPT0gc3RhdGUuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogY2xpZW50X2lkIG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiY2xpZW50X2lkIG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IHRoYXQgd2Uga25vdyB0aGUgc3RhdGUgbWF0Y2hlcywgdGFrZSB0aGUgc3RvcmVkIGRhdGFcbiAgICAgICAgLy8gYW5kIHNldCBpdCBpbnRvIHRoZSByZXNwb25zZSBzbyBjYWxsZXJzIGNhbiBnZXQgdGhlaXIgc3RhdGVcbiAgICAgICAgLy8gdGhpcyBpcyBpbXBvcnRhbnQgZm9yIGJvdGggc3VjY2VzcyAmIGVycm9yIG91dGNvbWVzXG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBzdGF0ZSB2YWxpZGF0ZWRcIik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXRlID0gc3RhdGUuZGF0YTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIExvZy53YXJuKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IFJlc3BvbnNlIHdhcyBlcnJvclwiLCByZXNwb25zZS5lcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5ub25jZSAmJiAhcmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBFeHBlY3RpbmcgaWRfdG9rZW4gaW4gcmVzcG9uc2VcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gaWRfdG9rZW4gaW4gcmVzcG9uc2VcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGF0ZS5ub25jZSAmJiByZXNwb25zZS5pZF90b2tlbikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IE5vdCBleHBlY3RpbmcgaWRfdG9rZW4gaW4gcmVzcG9uc2VcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5leHBlY3RlZCBpZF90b2tlbiBpbiByZXNwb25zZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUuY29kZV92ZXJpZmllciAmJiAhcmVzcG9uc2UuY29kZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IEV4cGVjdGluZyBjb2RlIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGNvZGUgaW4gcmVzcG9uc2VcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGF0ZS5jb2RlX3ZlcmlmaWVyICYmIHJlc3BvbnNlLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBOb3QgZXhwZWN0aW5nIGNvZGUgaW4gcmVzcG9uc2VcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5leHBlY3RlZCBjb2RlIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzcG9uc2Uuc2NvcGUpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gc2NvcGUgb24gdGhlIHJlc3BvbnNlLCB0aGVuIGFzc3VtZSBhbGwgc2NvcGVzIGdyYW50ZWQgKHBlci1zcGVjKSBhbmQgY29weSBvdmVyIHNjb3BlcyBmcm9tIG9yaWdpbmFsIHJlcXVlc3RcbiAgICAgICAgICAgIHJlc3BvbnNlLnNjb3BlID0gc3RhdGUuc2NvcGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBfcHJvY2Vzc0NsYWltcyhzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmlzT3BlbklkQ29ubmVjdCkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDbGFpbXM6IHJlc3BvbnNlIGlzIE9JREMsIHByb2Nlc3NpbmcgY2xhaW1zXCIpO1xuXG4gICAgICAgICAgICByZXNwb25zZS5wcm9maWxlID0gdGhpcy5fZmlsdGVyUHJvdG9jb2xDbGFpbXMocmVzcG9uc2UucHJvZmlsZSk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5za2lwVXNlckluZm8gIT09IHRydWUgJiYgdGhpcy5fc2V0dGluZ3MubG9hZFVzZXJJbmZvICYmIHJlc3BvbnNlLmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiBsb2FkaW5nIHVzZXIgaW5mb1wiKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VySW5mb1NlcnZpY2UuZ2V0Q2xhaW1zKHJlc3BvbnNlLmFjY2Vzc190b2tlbikudGhlbihjbGFpbXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogdXNlciBpbmZvIGNsYWltcyByZWNlaXZlZCBmcm9tIHVzZXIgaW5mbyBlbmRwb2ludFwiKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhaW1zLnN1YiAhPT0gcmVzcG9uc2UucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiBzdWIgZnJvbSB1c2VyIGluZm8gZW5kcG9pbnQgZG9lcyBub3QgbWF0Y2ggc3ViIGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcInN1YiBmcm9tIHVzZXIgaW5mbyBlbmRwb2ludCBkb2VzIG5vdCBtYXRjaCBzdWIgaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZSA9IHRoaXMuX21lcmdlQ2xhaW1zKHJlc3BvbnNlLnByb2ZpbGUsIGNsYWltcyk7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiB1c2VyIGluZm8gY2xhaW1zIHJlY2VpdmVkLCB1cGRhdGVkIHByb2ZpbGU6XCIsIHJlc3BvbnNlLnByb2ZpbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiBub3QgbG9hZGluZyB1c2VyIGluZm9cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogcmVzcG9uc2UgaXMgbm90IE9JREMsIG5vdCBwcm9jZXNzaW5nIGNsYWltc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIF9tZXJnZUNsYWltcyhjbGFpbXMxLCBjbGFpbXMyKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBjbGFpbXMxKTtcblxuICAgICAgICBmb3IgKGxldCBuYW1lIGluIGNsYWltczIpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBjbGFpbXMyW25hbWVdO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHRbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0W25hbWVdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0W25hbWVdLmluZGV4T2YodmFsdWUpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdFtuYW1lXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdGhpcy5fc2V0dGluZ3MubWVyZ2VDbGFpbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtuYW1lXSA9IHRoaXMuX21lcmdlQ2xhaW1zKHJlc3VsdFtuYW1lXSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gW3Jlc3VsdFtuYW1lXSwgdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBfZmlsdGVyUHJvdG9jb2xDbGFpbXMoY2xhaW1zKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJQcm90b2NvbENsYWltcywgaW5jb21pbmcgY2xhaW1zOlwiLCBjbGFpbXMpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBjbGFpbXMpO1xuXG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5fZmlsdGVyUHJvdG9jb2xDbGFpbXMpIHtcbiAgICAgICAgICAgIFByb3RvY29sQ2xhaW1zLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlc3VsdFt0eXBlXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyUHJvdG9jb2xDbGFpbXM6IHByb3RvY29sIGNsYWltcyBmaWx0ZXJlZFwiLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlclByb3RvY29sQ2xhaW1zOiBwcm90b2NvbCBjbGFpbXMgbm90IGZpbHRlcmVkXCIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIF92YWxpZGF0ZVRva2VucyhzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZVRva2VuczogVmFsaWRhdGluZyBjb2RlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NDb2RlKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVUb2tlbnM6IFZhbGlkYXRpbmcgaWRfdG9rZW4gYW5kIGFjY2Vzc190b2tlblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVJZFRva2VuQW5kQWNjZXNzVG9rZW4oc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlVG9rZW5zOiBWYWxpZGF0aW5nIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlSWRUb2tlbihzdGF0ZSwgcmVzcG9uc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlVG9rZW5zOiBObyBjb2RlIHRvIHByb2Nlc3Mgb3IgaWRfdG9rZW4gdG8gdmFsaWRhdGVcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIF9wcm9jZXNzQ29kZShzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBjbGllbnRfaWQ6IHN0YXRlLmNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHN0YXRlLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICBjb2RlIDogcmVzcG9uc2UuY29kZSxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogc3RhdGUucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgY29kZV92ZXJpZmllcjogc3RhdGUuY29kZV92ZXJpZmllclxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdGF0ZS5leHRyYVRva2VuUGFyYW1zICYmIHR5cGVvZihzdGF0ZS5leHRyYVRva2VuUGFyYW1zKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVxdWVzdCwgc3RhdGUuZXh0cmFUb2tlblBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlbkNsaWVudC5leGNoYW5nZUNvZGUocmVxdWVzdCkudGhlbih0b2tlblJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gdG9rZW5SZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlW2tleV0gPSB0b2tlblJlc3BvbnNlW2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5pZF90b2tlbikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ29kZTogdG9rZW4gcmVzcG9uc2Ugc3VjY2Vzc2Z1bCwgcHJvY2Vzc2luZyBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVJZFRva2VuQXR0cmlidXRlcyhzdGF0ZSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDb2RlOiB0b2tlbiByZXNwb25zZSBzdWNjZXNzZnVsLCByZXR1cm5pbmcgcmVzcG9uc2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXMoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0SXNzdWVyKCkudGhlbihpc3N1ZXIgPT4ge1xuXG4gICAgICAgICAgICBsZXQgYXVkaWVuY2UgPSBzdGF0ZS5jbGllbnRfaWQ7XG4gICAgICAgICAgICBsZXQgY2xvY2tTa2V3SW5TZWNvbmRzID0gdGhpcy5fc2V0dGluZ3MuY2xvY2tTa2V3O1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXM6IFZhbGlkYWluZyBKV1QgYXR0cmlidXRlczsgdXNpbmcgY2xvY2sgc2tldyAoaW4gc2Vjb25kcykgb2Y6IFwiLCBjbG9ja1NrZXdJblNlY29uZHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MuZ2V0RXBvY2hUaW1lKCkudGhlbihub3cgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb3NlVXRpbC52YWxpZGF0ZUp3dEF0dHJpYnV0ZXMocmVzcG9uc2UuaWRfdG9rZW4sIGlzc3VlciwgYXVkaWVuY2UsIGNsb2NrU2tld0luU2Vjb25kcywgbm93KS50aGVuKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUubm9uY2UgJiYgc3RhdGUubm9uY2UgIT09IHBheWxvYWQubm9uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzOiBJbnZhbGlkIG5vbmNlIGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgbm9uY2UgaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGF5bG9hZC5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzOiBObyBzdWIgcHJlc2VudCBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzdWIgcHJlc2VudCBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZSA9IHBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVJZFRva2VuQW5kQWNjZXNzVG9rZW4oc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUlkVG9rZW4oc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUFjY2Vzc1Rva2VuKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2dldFNpZ25pbmdLZXlGb3JKd3Qoand0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXMoKS50aGVuKGtleXMgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2lkID0gand0LmhlYWRlci5raWQ7XG4gICAgICAgICAgICBpZiAoIWtleXMpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBObyBzaWduaW5nIGtleXMgZnJvbSBtZXRhZGF0YVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gc2lnbmluZyBrZXlzIGZyb20gbWV0YWRhdGFcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBSZWNlaXZlZCBzaWduaW5nIGtleXNcIik7XG4gICAgICAgICAgICBsZXQga2V5O1xuICAgICAgICAgICAgaWYgKCFraWQpIHtcbiAgICAgICAgICAgICAgICBrZXlzID0gdGhpcy5fZmlsdGVyQnlBbGcoa2V5cywgand0LmhlYWRlci5hbGcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBObyBraWQgZm91bmQgaW4gaWRfdG9rZW4gYW5kIG1vcmUgdGhhbiBvbmUga2V5IGZvdW5kIGluIG1ldGFkYXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8ga2lkIGZvdW5kIGluIGlkX3Rva2VuIGFuZCBtb3JlIHRoYW4gb25lIGtleSBmb3VuZCBpbiBtZXRhZGF0YVwiKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8ga2lkIGlzIG1hbmRhdG9yeSBvbmx5IHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIGtleXMgaW4gdGhlIHJlZmVyZW5jZWQgSldLIFNldCBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNTaWduaW5nXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBrZXlzLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5LmtpZCA9PT0ga2lkO1xuICAgICAgICAgICAgICAgIH0pWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZ2V0U2lnbmluZ0tleUZvckp3dFdpdGhTaW5nbGVSZXRyeShqd3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNpZ25pbmdLZXlGb3JKd3Qoand0KS50aGVuKGtleSA9PiB7XG4gICAgICAgICAgICAvLyBSZWZyZXNoaW5nIHNpZ25pbmdLZXlzIGlmIG5vIHN1aXRhYmxlIHZlcmlmaWNhdGlvbiBrZXkgaXMgcHJlc2VudCBmb3IgZ2l2ZW4gand0IGhlYWRlci5cbiAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRvIHVuZGVmaW5lZCwgdG8gdHJpZ2dlciBuZXR3b3JrIGNhbGwgdG8gandrc191cmkuXG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLnJlc2V0U2lnbmluZ0tleXMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U2lnbmluZ0tleUZvckp3dChqd3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZUlkVG9rZW4oc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghc3RhdGUubm9uY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIG5vbmNlIG9uIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIG5vbmNlIG9uIHN0YXRlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBqd3QgPSB0aGlzLl9qb3NlVXRpbC5wYXJzZUp3dChyZXNwb25zZS5pZF90b2tlbik7XG4gICAgICAgIGlmICghand0IHx8ICFqd3QuaGVhZGVyIHx8ICFqd3QucGF5bG9hZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIsIGp3dCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5ub25jZSAhPT0gand0LnBheWxvYWQubm9uY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IEludmFsaWQgbm9uY2UgaW4gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBub25jZSBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldElzc3VlcigpLnRoZW4oaXNzdWVyID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IFJlY2VpdmVkIGlzc3VlclwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTaWduaW5nS2V5Rm9ySnd0V2l0aFNpbmdsZVJldHJ5KGp3dCkudGhlbihrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIGtleSBtYXRjaGluZyBraWQgb3IgYWxnIGZvdW5kIGluIHNpZ25pbmcga2V5c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGtleSBtYXRjaGluZyBraWQgb3IgYWxnIGZvdW5kIGluIHNpZ25pbmcga2V5c1wiKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGF1ZGllbmNlID0gc3RhdGUuY2xpZW50X2lkO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNsb2NrU2tld0luU2Vjb25kcyA9IHRoaXMuX3NldHRpbmdzLmNsb2NrU2tldztcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBWYWxpZGFpbmcgSldUOyB1c2luZyBjbG9jayBza2V3IChpbiBzZWNvbmRzKSBvZjogXCIsIGNsb2NrU2tld0luU2Vjb25kcyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fam9zZVV0aWwudmFsaWRhdGVKd3QocmVzcG9uc2UuaWRfdG9rZW4sIGtleSwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3SW5TZWNvbmRzKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IEpXVCB2YWxpZGF0aW9uIHN1Y2Nlc3NmdWxcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFqd3QucGF5bG9hZC5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIHN1YiBwcmVzZW50IGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHN1YiBwcmVzZW50IGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnByb2ZpbGUgPSBqd3QucGF5bG9hZDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2ZpbHRlckJ5QWxnKGtleXMsIGFsZyl7XG4gICAgICAgIHZhciBrdHkgPSBudWxsO1xuICAgICAgICBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJSU1wiKSkge1xuICAgICAgICAgICAga3R5ID0gXCJSU0FcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGcuc3RhcnRzV2l0aChcIlBTXCIpKSB7XG4gICAgICAgICAgICBrdHkgPSBcIlBTXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJFU1wiKSkge1xuICAgICAgICAgICAga3R5ID0gXCJFQ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlckJ5QWxnOiBhbGcgbm90IHN1cHBvcnRlZDogXCIsIGFsZyk7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyQnlBbGc6IExvb2tpbmcgZm9yIGtleXMgdGhhdCBtYXRjaCBrdHk6IFwiLCBrdHkpO1xuXG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtleS5rdHkgPT09IGt0eTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlckJ5QWxnOiBOdW1iZXIgb2Yga2V5cyB0aGF0IG1hdGNoIGt0eTogXCIsIGt0eSwga2V5cy5sZW5ndGgpO1xuXG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZUFjY2Vzc1Rva2VuKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UucHJvZmlsZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IE5vIHByb2ZpbGUgbG9hZGVkIGZyb20gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gcHJvZmlsZSBsb2FkZWQgZnJvbSBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlc3BvbnNlLnByb2ZpbGUuYXRfaGFzaCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IE5vIGF0X2hhc2ggaW4gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gYXRfaGFzaCBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlc3BvbnNlLmlkX3Rva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogTm8gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGp3dCA9IHRoaXMuX2pvc2VVdGlsLnBhcnNlSnd0KHJlc3BvbnNlLmlkX3Rva2VuKTtcbiAgICAgICAgaWYgKCFqd3QgfHwgIWp3dC5oZWFkZXIpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBGYWlsZWQgdG8gcGFyc2UgaWRfdG9rZW5cIiwgand0KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc2hBbGcgPSBqd3QuaGVhZGVyLmFsZztcbiAgICAgICAgaWYgKCFoYXNoQWxnIHx8IGhhc2hBbGcubGVuZ3RoICE9PSA1KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogVW5zdXBwb3J0ZWQgYWxnOlwiLCBoYXNoQWxnKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBhbGc6IFwiICsgaGFzaEFsZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc2hCaXRzID0gaGFzaEFsZy5zdWJzdHIoMiwgMyk7XG4gICAgICAgIGlmICghaGFzaEJpdHMpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBVbnN1cHBvcnRlZCBhbGc6XCIsIGhhc2hBbGcsIGhhc2hCaXRzKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBhbGc6IFwiICsgaGFzaEFsZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFzaEJpdHMgPSBwYXJzZUludChoYXNoQml0cyk7XG4gICAgICAgIGlmIChoYXNoQml0cyAhPT0gMjU2ICYmIGhhc2hCaXRzICE9PSAzODQgJiYgaGFzaEJpdHMgIT09IDUxMikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IFVuc3VwcG9ydGVkIGFsZzpcIiwgaGFzaEFsZywgaGFzaEJpdHMpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIGFsZzogXCIgKyBoYXNoQWxnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hhID0gXCJzaGFcIiArIGhhc2hCaXRzO1xuICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2pvc2VVdGlsLmhhc2hTdHJpbmcocmVzcG9uc2UuYWNjZXNzX3Rva2VuLCBzaGEpO1xuICAgICAgICBpZiAoIWhhc2gpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBhY2Nlc3NfdG9rZW4gaGFzaCBmYWlsZWQ6XCIsIHNoYSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHZhbGlkYXRlIGF0X2hhc2hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlZnQgPSBoYXNoLnN1YnN0cigwLCBoYXNoLmxlbmd0aCAvIDIpO1xuICAgICAgICB2YXIgbGVmdF9iNjR1ID0gdGhpcy5fam9zZVV0aWwuaGV4VG9CYXNlNjRVcmwobGVmdCk7XG4gICAgICAgIGlmIChsZWZ0X2I2NHUgIT09IHJlc3BvbnNlLnByb2ZpbGUuYXRfaGFzaCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IEZhaWxlZCB0byB2YWxpZGF0ZSBhdF9oYXNoXCIsIGxlZnRfYjY0dSwgcmVzcG9uc2UucHJvZmlsZS5hdF9oYXNoKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gdmFsaWRhdGUgYXRfaGFzaFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogc3VjY2Vzc1wiKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBDaGVja1Nlc3Npb25JRnJhbWUgfSBmcm9tICcuL0NoZWNrU2Vzc2lvbklGcmFtZS5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTZXNzaW9uTW9uaXRvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1c2VyTWFuYWdlciwgQ2hlY2tTZXNzaW9uSUZyYW1lQ3RvciA9IENoZWNrU2Vzc2lvbklGcmFtZSwgdGltZXIgPSBHbG9iYWwudGltZXIpIHtcbiAgICAgICAgaWYgKCF1c2VyTWFuYWdlcikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2Vzc2lvbk1vbml0b3IuY3RvcjogTm8gdXNlciBtYW5hZ2VyIHBhc3NlZCB0byBTZXNzaW9uTW9uaXRvclwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXJNYW5hZ2VyXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIgPSB1c2VyTWFuYWdlcjtcbiAgICAgICAgdGhpcy5fQ2hlY2tTZXNzaW9uSUZyYW1lQ3RvciA9IENoZWNrU2Vzc2lvbklGcmFtZUN0b3I7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gdGltZXI7XG5cbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLmFkZFVzZXJMb2FkZWQodGhpcy5fc3RhcnQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5hZGRVc2VyVW5sb2FkZWQodGhpcy5fc3RvcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5fdXNlck1hbmFnZXIuZ2V0VXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAvLyBkb2luZyB0aGlzIG1hbnVhbGx5IGhlcmUgc2luY2UgY2FsbGluZyBnZXRVc2VyIFxuICAgICAgICAgICAgLy8gZG9lc24ndCB0cmlnZ2VyIGxvYWQgZXZlbnQuXG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0KHVzZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2V0dGluZ3MubW9uaXRvckFub255bW91c1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXMoKS50aGVuKHNlc3Npb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wVXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25fc3RhdGUgOiBzZXNzaW9uLnNlc3Npb25fc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uc3ViICYmIHNlc3Npb24uc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBVc2VyLnByb2ZpbGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViOiBzZXNzaW9uLnN1YixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWQ6IHNlc3Npb24uc2lkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0KHRtcFVzZXIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhdGNoIHRvIHN1cHByZXNzIGVycm9ycyBzaW5jZSB3ZSdyZSBpbiBhIGN0b3JcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiU2Vzc2lvbk1vbml0b3IgY3RvcjogZXJyb3IgZnJvbSBxdWVyeVNlc3Npb25TdGF0dXM6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIC8vIGNhdGNoIHRvIHN1cHByZXNzIGVycm9ycyBzaW5jZSB3ZSdyZSBpbiBhIGN0b3JcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yIGN0b3I6IGVycm9yIGZyb20gZ2V0VXNlcjpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJNYW5hZ2VyLnNldHRpbmdzO1xuICAgIH1cbiAgICBnZXQgX21ldGFkYXRhU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJNYW5hZ2VyLm1ldGFkYXRhU2VydmljZTtcbiAgICB9XG4gICAgZ2V0IF9jbGllbnRfaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgfVxuICAgIGdldCBfY2hlY2tTZXNzaW9uSW50ZXJ2YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5jaGVja1Nlc3Npb25JbnRlcnZhbDtcbiAgICB9XG4gICAgZ2V0IF9zdG9wQ2hlY2tTZXNzaW9uT25FcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLnN0b3BDaGVja1Nlc3Npb25PbkVycm9yO1xuICAgIH1cblxuICAgIF9zdGFydCh1c2VyKSB7XG4gICAgICAgIGxldCBzZXNzaW9uX3N0YXRlID0gdXNlci5zZXNzaW9uX3N0YXRlO1xuXG4gICAgICAgIGlmIChzZXNzaW9uX3N0YXRlKSB7XG4gICAgICAgICAgICBpZiAodXNlci5wcm9maWxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViID0gdXNlci5wcm9maWxlLnN1YjtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaWQgPSB1c2VyLnByb2ZpbGUuc2lkO1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogc2Vzc2lvbl9zdGF0ZTpcIiwgc2Vzc2lvbl9zdGF0ZSwgXCIsIHN1YjpcIiwgdGhpcy5fc3ViKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX3N0YXJ0OiBzZXNzaW9uX3N0YXRlOlwiLCBzZXNzaW9uX3N0YXRlLCBcIiwgYW5vbnltb3VzIHVzZXJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldENoZWNrU2Vzc2lvbklmcmFtZSgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX3N0YXJ0OiBJbml0aWFsaXppbmcgY2hlY2sgc2Vzc2lvbiBpZnJhbWVcIilcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaWVudF9pZCA9IHRoaXMuX2NsaWVudF9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IHRoaXMuX2NoZWNrU2Vzc2lvbkludGVydmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0b3BPbkVycm9yID0gdGhpcy5fc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3I7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZSA9IG5ldyB0aGlzLl9DaGVja1Nlc3Npb25JRnJhbWVDdG9yKHRoaXMuX2NhbGxiYWNrLmJpbmQodGhpcyksIGNsaWVudF9pZCwgdXJsLCBpbnRlcnZhbCwgc3RvcE9uRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUuc3RhcnQoc2Vzc2lvbl9zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy53YXJuKFwiU2Vzc2lvbk1vbml0b3IuX3N0YXJ0OiBObyBjaGVjayBzZXNzaW9uIGlmcmFtZSBmb3VuZCBpbiB0aGUgbWV0YWRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gbm9uLXByb21pc2UgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiU2Vzc2lvbk1vbml0b3IuX3N0YXJ0OiBFcnJvciBmcm9tIGdldENoZWNrU2Vzc2lvbklmcmFtZTpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lLnN0YXJ0KHNlc3Npb25fc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3N0b3AoKSB7XG4gICAgICAgIHRoaXMuX3N1YiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fc2lkID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9zdG9wXCIpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lLnN0b3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5tb25pdG9yQW5vbnltb3VzU2Vzc2lvbikge1xuICAgICAgICAgICAgLy8gdXNpbmcgYSB0aW1lciB0byBkZWxheSByZS1pbml0aWFsaXphdGlvbiB0byBhdm9pZCByYWNlIGNvbmRpdGlvbnMgZHVyaW5nIHNpZ25vdXRcbiAgICAgICAgICAgIGxldCB0aW1lckhhbmRsZSA9IHRoaXMuX3RpbWVyLnNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXIuY2xlYXJJbnRlcnZhbCh0aW1lckhhbmRsZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXMoKS50aGVuKHNlc3Npb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wVXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25fc3RhdGUgOiBzZXNzaW9uLnNlc3Npb25fc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uc3ViICYmIHNlc3Npb24uc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBVc2VyLnByb2ZpbGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViOiBzZXNzaW9uLnN1YixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWQ6IHNlc3Npb24uc2lkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0KHRtcFVzZXIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhdGNoIHRvIHN1cHByZXNzIGVycm9ycyBzaW5jZSB3ZSdyZSBpbiBhIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yOiBlcnJvciBmcm9tIHF1ZXJ5U2Vzc2lvblN0YXR1czpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzKCkudGhlbihzZXNzaW9uID0+IHtcbiAgICAgICAgICAgIHZhciByYWlzZUV2ZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5zdWIgPT09IHRoaXMuX3N1Yikge1xuICAgICAgICAgICAgICAgICAgICByYWlzZUV2ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZS5zdGFydChzZXNzaW9uLnNlc3Npb25fc3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLnNpZCA9PT0gdGhpcy5fc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IFNhbWUgc3ViIHN0aWxsIGxvZ2dlZCBpbiBhdCBPUCwgcmVzdGFydGluZyBjaGVjayBzZXNzaW9uIGlmcmFtZTsgc2Vzc2lvbl9zdGF0ZTpcIiwgc2Vzc2lvbi5zZXNzaW9uX3N0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogU2FtZSBzdWIgc3RpbGwgbG9nZ2VkIGluIGF0IE9QLCBzZXNzaW9uIHN0YXRlIGhhcyBjaGFuZ2VkLCByZXN0YXJ0aW5nIGNoZWNrIHNlc3Npb24gaWZyYW1lOyBzZXNzaW9uX3N0YXRlOlwiLCBzZXNzaW9uLnNlc3Npb25fc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLl9yYWlzZVVzZXJTZXNzaW9uQ2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IERpZmZlcmVudCBzdWJqZWN0IHNpZ25lZCBpbnRvIE9QOlwiLCBzZXNzaW9uLnN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBTdWJqZWN0IG5vIGxvbmdlciBzaWduZWQgaW50byBPUFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJhaXNlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOyByYWlzaW5nIHNpZ25lZCBvdXQgZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkT3V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IFNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazsgcmFpc2luZyBzaWduZWQgaW4gZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkSW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3ViKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBFcnJvciBjYWxsaW5nIHF1ZXJ5Q3VycmVudFNpZ25pblNlc3Npb247IHJhaXNpbmcgc2lnbmVkIG91dCBldmVudFwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLl9yYWlzZVVzZXJTaWduZWRPdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5pbXBvcnQgeyBTaWduaW5TdGF0ZSB9IGZyb20gJy4vU2lnbmluU3RhdGUuanMnO1xuXG5leHBvcnQgY2xhc3MgU2lnbmluUmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICAvLyBtYW5kYXRvcnlcbiAgICAgICAgdXJsLCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaSwgcmVzcG9uc2VfdHlwZSwgc2NvcGUsIGF1dGhvcml0eSxcbiAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgZGF0YSwgcHJvbXB0LCBkaXNwbGF5LCBtYXhfYWdlLCB1aV9sb2NhbGVzLCBpZF90b2tlbl9oaW50LCBsb2dpbl9oaW50LCBhY3JfdmFsdWVzLCByZXNvdXJjZSwgcmVzcG9uc2VfbW9kZSxcbiAgICAgICAgcmVxdWVzdCwgcmVxdWVzdF91cmksIGV4dHJhUXVlcnlQYXJhbXMsIHJlcXVlc3RfdHlwZSwgY2xpZW50X3NlY3JldCwgZXh0cmFUb2tlblBhcmFtcywgc2tpcFVzZXJJbmZvXG4gICAgfSkge1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbmluUmVxdWVzdC5jdG9yOiBObyB1cmwgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXJsXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIGNsaWVudF9pZCBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGllbnRfaWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZWRpcmVjdF91cmkpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gcmVkaXJlY3RfdXJpIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInJlZGlyZWN0X3VyaVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gcmVzcG9uc2VfdHlwZSBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZXNwb25zZV90eXBlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gc2NvcGUgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2NvcGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhdXRob3JpdHkpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gYXV0aG9yaXR5IHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImF1dGhvcml0eVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvaWRjID0gU2lnbmluUmVxdWVzdC5pc09pZGMocmVzcG9uc2VfdHlwZSk7XG4gICAgICAgIGxldCBjb2RlID0gU2lnbmluUmVxdWVzdC5pc0NvZGUocmVzcG9uc2VfdHlwZSk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZV9tb2RlKSB7XG4gICAgICAgICAgICByZXNwb25zZV9tb2RlID0gU2lnbmluUmVxdWVzdC5pc0NvZGUocmVzcG9uc2VfdHlwZSkgPyBcInF1ZXJ5XCIgOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBTaWduaW5TdGF0ZSh7IG5vbmNlOiBvaWRjLCBcbiAgICAgICAgICAgIGRhdGEsIGNsaWVudF9pZCwgYXV0aG9yaXR5LCByZWRpcmVjdF91cmksIFxuICAgICAgICAgICAgY29kZV92ZXJpZmllcjogY29kZSwgXG4gICAgICAgICAgICByZXF1ZXN0X3R5cGUsIHJlc3BvbnNlX21vZGUsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LCBzY29wZSwgZXh0cmFUb2tlblBhcmFtcywgc2tpcFVzZXJJbmZvIH0pO1xuXG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwiY2xpZW50X2lkXCIsIGNsaWVudF9pZCk7XG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwicmVkaXJlY3RfdXJpXCIsIHJlZGlyZWN0X3VyaSk7XG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwicmVzcG9uc2VfdHlwZVwiLCByZXNwb25zZV90eXBlKTtcbiAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJzY29wZVwiLCBzY29wZSk7XG5cbiAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJzdGF0ZVwiLCB0aGlzLnN0YXRlLmlkKTtcbiAgICAgICAgaWYgKG9pZGMpIHtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwibm9uY2VcIiwgdGhpcy5zdGF0ZS5ub25jZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwiY29kZV9jaGFsbGVuZ2VcIiwgdGhpcy5zdGF0ZS5jb2RlX2NoYWxsZW5nZSk7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcImNvZGVfY2hhbGxlbmdlX21ldGhvZFwiLCBcIlMyNTZcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3B0aW9uYWwgPSB7IHByb21wdCwgZGlzcGxheSwgbWF4X2FnZSwgdWlfbG9jYWxlcywgaWRfdG9rZW5faGludCwgbG9naW5faGludCwgYWNyX3ZhbHVlcywgcmVzb3VyY2UsIHJlcXVlc3QsIHJlcXVlc3RfdXJpLCByZXNwb25zZV9tb2RlIH07XG4gICAgICAgIGZvcihsZXQga2V5IGluIG9wdGlvbmFsKXtcbiAgICAgICAgICAgIGlmIChvcHRpb25hbFtrZXldKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwga2V5LCBvcHRpb25hbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQga2V5IGluIGV4dHJhUXVlcnlQYXJhbXMpe1xuICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwga2V5LCBleHRyYVF1ZXJ5UGFyYW1zW2tleV0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNPaWRjKHJlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3BvbnNlX3R5cGUuc3BsaXQoL1xccysvZykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtID09PSBcImlkX3Rva2VuXCI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gISEocmVzdWx0WzBdKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNPQXV0aChyZXNwb25zZV90eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZXNwb25zZV90eXBlLnNwbGl0KC9cXHMrL2cpLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gXCJ0b2tlblwiO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICEhKHJlc3VsdFswXSk7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBpc0NvZGUocmVzcG9uc2VfdHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVzcG9uc2VfdHlwZS5zcGxpdCgvXFxzKy9nKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09IFwiY29kZVwiO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICEhKHJlc3VsdFswXSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5cbmNvbnN0IE9pZGNTY29wZSA9IFwib3BlbmlkXCI7XG5cbmV4cG9ydCBjbGFzcyBTaWduaW5SZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IodXJsLCBkZWxpbWl0ZXIgPSBcIiNcIikge1xuXG4gICAgICAgIHZhciB2YWx1ZXMgPSBVcmxVdGlsaXR5LnBhcnNlVXJsRnJhZ21lbnQodXJsLCBkZWxpbWl0ZXIpO1xuXG4gICAgICAgIHRoaXMuZXJyb3IgPSB2YWx1ZXMuZXJyb3I7XG4gICAgICAgIHRoaXMuZXJyb3JfZGVzY3JpcHRpb24gPSB2YWx1ZXMuZXJyb3JfZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZXJyb3JfdXJpID0gdmFsdWVzLmVycm9yX3VyaTtcblxuICAgICAgICB0aGlzLmNvZGUgPSB2YWx1ZXMuY29kZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHZhbHVlcy5zdGF0ZTtcbiAgICAgICAgdGhpcy5pZF90b2tlbiA9IHZhbHVlcy5pZF90b2tlbjtcbiAgICAgICAgdGhpcy5zZXNzaW9uX3N0YXRlID0gdmFsdWVzLnNlc3Npb25fc3RhdGU7XG4gICAgICAgIHRoaXMuYWNjZXNzX3Rva2VuID0gdmFsdWVzLmFjY2Vzc190b2tlbjtcbiAgICAgICAgdGhpcy50b2tlbl90eXBlID0gdmFsdWVzLnRva2VuX3R5cGU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB2YWx1ZXMuc2NvcGU7XG4gICAgICAgIHRoaXMucHJvZmlsZSA9IHVuZGVmaW5lZDsgLy8gd2lsbCBiZSBzZXQgZnJvbSBSZXNwb25zZVZhbGlkYXRvclxuXG4gICAgICAgIHRoaXMuZXhwaXJlc19pbiA9IHZhbHVlcy5leHBpcmVzX2luO1xuICAgIH1cblxuICAgIGdldCBleHBpcmVzX2luKCkge1xuICAgICAgICBpZiAodGhpcy5leHBpcmVzX2F0KSB7XG4gICAgICAgICAgICBsZXQgbm93ID0gcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwaXJlc19hdCAtIG5vdztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBzZXQgZXhwaXJlc19pbih2YWx1ZSl7XG4gICAgICAgIGxldCBleHBpcmVzX2luID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICBpZiAodHlwZW9mIGV4cGlyZXNfaW4gPT09ICdudW1iZXInICYmIGV4cGlyZXNfaW4gPiAwKSB7XG4gICAgICAgICAgICBsZXQgbm93ID0gcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgdGhpcy5leHBpcmVzX2F0ID0gbm93ICsgZXhwaXJlc19pbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBleHBpcmVkKCkge1xuICAgICAgICBsZXQgZXhwaXJlc19pbiA9IHRoaXMuZXhwaXJlc19pbjtcbiAgICAgICAgaWYgKGV4cGlyZXNfaW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cGlyZXNfaW4gPD0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBzY29wZXMoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5zY29wZSB8fCBcIlwiKS5zcGxpdChcIiBcIik7XG4gICAgfVxuXG4gICAgZ2V0IGlzT3BlbklkQ29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGVzLmluZGV4T2YoT2lkY1Njb3BlKSA+PSAwIHx8ICEhdGhpcy5pZF90b2tlbjtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vU3RhdGUuanMnO1xuaW1wb3J0IHsgSm9zZVV0aWwgfSBmcm9tICcuL0pvc2VVdGlsLmpzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20uanMnO1xuXG5leHBvcnQgY2xhc3MgU2lnbmluU3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gICAgY29uc3RydWN0b3Ioe25vbmNlLCBhdXRob3JpdHksIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpLCBjb2RlX3ZlcmlmaWVyLCByZXNwb25zZV9tb2RlLCBjbGllbnRfc2VjcmV0LCBzY29wZSwgZXh0cmFUb2tlblBhcmFtcywgc2tpcFVzZXJJbmZvfSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGFyZ3VtZW50c1swXSk7XG5cbiAgICAgICAgaWYgKG5vbmNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLl9ub25jZSA9IHJhbmRvbSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9ub25jZSA9IG5vbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGVfdmVyaWZpZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHJhbmRvbSgpIHByb2R1Y2VzIDMyIGxlbmd0aFxuICAgICAgICAgICAgdGhpcy5fY29kZV92ZXJpZmllciA9IHJhbmRvbSgpICsgcmFuZG9tKCkgKyByYW5kb20oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2RlX3ZlcmlmaWVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2RlX3ZlcmlmaWVyID0gY29kZV92ZXJpZmllcjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY29kZV92ZXJpZmllcikge1xuICAgICAgICAgICAgbGV0IGhhc2ggPSBKb3NlVXRpbC5oYXNoU3RyaW5nKHRoaXMuY29kZV92ZXJpZmllciwgXCJTSEEyNTZcIik7XG4gICAgICAgICAgICB0aGlzLl9jb2RlX2NoYWxsZW5nZSA9IEpvc2VVdGlsLmhleFRvQmFzZTY0VXJsKGhhc2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVkaXJlY3RfdXJpID0gcmVkaXJlY3RfdXJpO1xuICAgICAgICB0aGlzLl9hdXRob3JpdHkgPSBhdXRob3JpdHk7XG4gICAgICAgIHRoaXMuX2NsaWVudF9pZCA9IGNsaWVudF9pZDtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VfbW9kZSA9IHJlc3BvbnNlX21vZGU7XG4gICAgICAgIHRoaXMuX2NsaWVudF9zZWNyZXQgPSBjbGllbnRfc2VjcmV0O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9leHRyYVRva2VuUGFyYW1zID0gZXh0cmFUb2tlblBhcmFtcztcbiAgICAgICAgdGhpcy5fc2tpcFVzZXJJbmZvID0gc2tpcFVzZXJJbmZvO1xuICAgIH1cblxuICAgIGdldCBub25jZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vbmNlO1xuICAgIH1cbiAgICBnZXQgYXV0aG9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0aG9yaXR5O1xuICAgIH1cbiAgICBnZXQgY2xpZW50X2lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50X2lkO1xuICAgIH1cbiAgICBnZXQgcmVkaXJlY3RfdXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkaXJlY3RfdXJpO1xuICAgIH1cbiAgICBnZXQgY29kZV92ZXJpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGVfdmVyaWZpZXI7XG4gICAgfVxuICAgIGdldCBjb2RlX2NoYWxsZW5nZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGVfY2hhbGxlbmdlO1xuICAgIH1cbiAgICBnZXQgcmVzcG9uc2VfbW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNlX21vZGU7XG4gICAgfVxuICAgIGdldCBjbGllbnRfc2VjcmV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50X3NlY3JldDtcbiAgICB9XG4gICAgZ2V0IHNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcGU7XG4gICAgfVxuICAgIGdldCBleHRyYVRva2VuUGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0cmFUb2tlblBhcmFtcztcbiAgICB9XG4gICAgZ2V0IHNraXBVc2VySW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NraXBVc2VySW5mbztcbiAgICB9XG4gICAgXG4gICAgdG9TdG9yYWdlU3RyaW5nKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJTaWduaW5TdGF0ZS50b1N0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IHRoaXMuY3JlYXRlZCxcbiAgICAgICAgICAgIHJlcXVlc3RfdHlwZTogdGhpcy5yZXF1ZXN0X3R5cGUsXG4gICAgICAgICAgICBub25jZTogdGhpcy5ub25jZSxcbiAgICAgICAgICAgIGNvZGVfdmVyaWZpZXI6IHRoaXMuY29kZV92ZXJpZmllcixcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdF91cmksXG4gICAgICAgICAgICBhdXRob3JpdHk6IHRoaXMuYXV0aG9yaXR5LFxuICAgICAgICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudF9pZCxcbiAgICAgICAgICAgIHJlc3BvbnNlX21vZGU6IHRoaXMucmVzcG9uc2VfbW9kZSxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHRoaXMuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgICAgICAgZXh0cmFUb2tlblBhcmFtcyA6IHRoaXMuZXh0cmFUb2tlblBhcmFtcyxcbiAgICAgICAgICAgIHNraXBVc2VySW5mbzogdGhpcy5za2lwVXNlckluZm9cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21TdG9yYWdlU3RyaW5nKHN0b3JhZ2VTdHJpbmcpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiU2lnbmluU3RhdGUuZnJvbVN0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTaWduaW5TdGF0ZShkYXRhKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBVcmxVdGlsaXR5IH0gZnJvbSAnLi9VcmxVdGlsaXR5LmpzJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi9TdGF0ZS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTaWdub3V0UmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3Ioe3VybCwgaWRfdG9rZW5faGludCwgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLCBkYXRhLCBleHRyYVF1ZXJ5UGFyYW1zLCByZXF1ZXN0X3R5cGV9KSB7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWdub3V0UmVxdWVzdC5jdG9yOiBObyB1cmwgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXJsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlkX3Rva2VuX2hpbnQpIHtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwiaWRfdG9rZW5faGludFwiLCBpZF90b2tlbl9oaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkpIHtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwicG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpXCIsIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBTdGF0ZSh7IGRhdGEsIHJlcXVlc3RfdHlwZSB9KTtcblxuICAgICAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwic3RhdGVcIiwgdGhpcy5zdGF0ZS5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGtleSBpbiBleHRyYVF1ZXJ5UGFyYW1zKXtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIGtleSwgZXh0cmFRdWVyeVBhcmFtc1trZXldKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTaWdub3V0UmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKHVybCkge1xuXG4gICAgICAgIHZhciB2YWx1ZXMgPSBVcmxVdGlsaXR5LnBhcnNlVXJsRnJhZ21lbnQodXJsLCBcIj9cIik7XG5cbiAgICAgICAgdGhpcy5lcnJvciA9IHZhbHVlcy5lcnJvcjtcbiAgICAgICAgdGhpcy5lcnJvcl9kZXNjcmlwdGlvbiA9IHZhbHVlcy5lcnJvcl9kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5lcnJvcl91cmkgPSB2YWx1ZXMuZXJyb3JfdXJpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB2YWx1ZXMuc3RhdGU7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgU2lsZW50UmVuZXdTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVzZXJNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyID0gdXNlck1hbmFnZXI7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdGhpcy5fdG9rZW5FeHBpcmluZy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLmFkZEFjY2Vzc1Rva2VuRXhwaXJpbmcodGhpcy5fY2FsbGJhY2spO1xuXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgdHJpZ2dlciBsb2FkaW5nIG9mIHRoZSB1c2VyIHNvIHRoZSBleHBpcmluZyBldmVudHMgY2FuIGJlIGluaXRpYWxpemVkXG4gICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5nZXRVc2VyKCkudGhlbih1c2VyPT57XG4gICAgICAgICAgICAgICAgLy8gZGVsaWJlcmF0ZSBub3BcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgIC8vIGNhdGNoIHRvIHN1cHByZXNzIGVycm9ycyBzaW5jZSB3ZSdyZSBpbiBhIGN0b3JcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWxlbnRSZW5ld1NlcnZpY2Uuc3RhcnQ6IEVycm9yIGZyb20gZ2V0VXNlcjpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5yZW1vdmVBY2Nlc3NUb2tlbkV4cGlyaW5nKHRoaXMuX2NhbGxiYWNrKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90b2tlbkV4cGlyaW5nKCkge1xuICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5zaWduaW5TaWxlbnQoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2lsZW50UmVuZXdTZXJ2aWNlLl90b2tlbkV4cGlyaW5nOiBTaWxlbnQgdG9rZW4gcmVuZXdhbCBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lsZW50UmVuZXdTZXJ2aWNlLl90b2tlbkV4cGlyaW5nOiBFcnJvciBmcm9tIHNpZ25pblNpbGVudDpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLl9yYWlzZVNpbGVudFJlbmV3RXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTdGF0ZSB7XG4gICAgY29uc3RydWN0b3Ioe2lkLCBkYXRhLCBjcmVhdGVkLCByZXF1ZXN0X3R5cGV9ID0ge30pIHtcbiAgICAgICAgdGhpcy5faWQgPSBpZCB8fCByYW5kb20oKTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjcmVhdGVkID09PSAnbnVtYmVyJyAmJiBjcmVhdGVkID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlZCA9IGNyZWF0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVkID0gcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlcXVlc3RfdHlwZSA9ICByZXF1ZXN0X3R5cGU7XG4gICAgfVxuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG4gICAgZ2V0IGNyZWF0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVkO1xuICAgIH1cbiAgICBnZXQgcmVxdWVzdF90eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdF90eXBlO1xuICAgIH1cblxuICAgIHRvU3RvcmFnZVN0cmluZygpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUudG9TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBjcmVhdGVkOiB0aGlzLmNyZWF0ZWQsXG4gICAgICAgICAgICByZXF1ZXN0X3R5cGU6IHRoaXMucmVxdWVzdF90eXBlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tU3RvcmFnZVN0cmluZyhzdG9yYWdlU3RyaW5nKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLmZyb21TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gbmV3IFN0YXRlKEpTT04ucGFyc2Uoc3RvcmFnZVN0cmluZykpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhclN0YWxlU3RhdGUoc3RvcmFnZSwgYWdlKSB7XG5cbiAgICAgICAgdmFyIGN1dG9mZiA9IERhdGUubm93KCkgLyAxMDAwIC0gYWdlO1xuXG4gICAgICAgIHJldHVybiBzdG9yYWdlLmdldEFsbEtleXMoKS50aGVuKGtleXMgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiBnb3Qga2V5c1wiLCBrZXlzKTtcblxuICAgICAgICAgICAgdmFyIHByb21pc2VzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHN0b3JhZ2UuZ2V0KGtleSkudGhlbihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbW92ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmZyb21TdG9yYWdlU3RyaW5nKGl0ZW0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IGdvdCBpdGVtIGZyb20ga2V5OiBcIiwga2V5LCBzdGF0ZS5jcmVhdGVkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5jcmVhdGVkIDw9IGN1dG9mZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiBFcnJvciBwYXJzaW5nIHN0YXRlIGZvciBrZXlcIiwga2V5LCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IG5vIGl0ZW0gaW4gc3RvcmFnZSBmb3Iga2V5OiBcIiwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IHJlbW92ZWQgaXRlbSBmb3Iga2V5OiBcIiwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG9yYWdlLnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IHdhaXRpbmcgb24gcHJvbWlzZSBjb3VudDpcIiwgcHJvbWlzZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9FdmVudC5qcyc7XG5cbmNvbnN0IFRpbWVyRHVyYXRpb24gPSA1OyAvLyBzZWNvbmRzXG5cbmV4cG9ydCBjbGFzcyBUaW1lciBleHRlbmRzIEV2ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRpbWVyID0gR2xvYmFsLnRpbWVyLCBub3dGdW5jID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB0aGlzLl90aW1lciA9IHRpbWVyO1xuXG4gICAgICAgIGlmIChub3dGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLl9ub3dGdW5jID0gbm93RnVuYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX25vd0Z1bmMgPSAoKSA9PiBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBub3coKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLl9ub3dGdW5jKCkpO1xuICAgIH1cblxuICAgIGluaXQoZHVyYXRpb24pIHtcbiAgICAgICAgaWYgKGR1cmF0aW9uIDw9IDApIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gMTtcbiAgICAgICAgfVxuICAgICAgICBkdXJhdGlvbiA9IHBhcnNlSW50KGR1cmF0aW9uKTtcblxuICAgICAgICB2YXIgZXhwaXJhdGlvbiA9IHRoaXMubm93ICsgZHVyYXRpb247XG4gICAgICAgIGlmICh0aGlzLmV4cGlyYXRpb24gPT09IGV4cGlyYXRpb24gJiYgdGhpcy5fdGltZXJIYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIG5vIG5lZWQgdG8gcmVpbml0aWFsaXplIHRvIHNhbWUgZXhwaXJhdGlvbiwgc28gYmFpbCBvdXRcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRpbWVyLmluaXQgdGltZXIgXCIgKyB0aGlzLl9uYW1lICsgXCIgc2tpcHBpbmcgaW5pdGlhbGl6YXRpb24gc2luY2UgYWxyZWFkeSBpbml0aWFsaXplZCBmb3IgZXhwaXJhdGlvbjpcIiwgdGhpcy5leHBpcmF0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiVGltZXIuaW5pdCB0aW1lciBcIiArIHRoaXMuX25hbWUgKyBcIiBmb3IgZHVyYXRpb246XCIsIGR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5fZXhwaXJhdGlvbiA9IGV4cGlyYXRpb247XG5cbiAgICAgICAgLy8gd2UncmUgdXNpbmcgYSBmYWlybHkgc2hvcnQgdGltZXIgYW5kIHRoZW4gY2hlY2tpbmcgdGhlIGV4cGlyYXRpb24gaW4gdGhlXG4gICAgICAgIC8vIGNhbGxiYWNrIHRvIGhhbmRsZSBzY2VuYXJpb3Mgd2hlcmUgdGhlIGJyb3dzZXIgZGV2aWNlIHNsZWVwcywgYW5kIHRoZW5cbiAgICAgICAgLy8gdGhlIHRpbWVycyBlbmQgdXAgZ2V0dGluZyBkZWxheWVkLlxuICAgICAgICB2YXIgdGltZXJEdXJhdGlvbiA9IFRpbWVyRHVyYXRpb247XG4gICAgICAgIGlmIChkdXJhdGlvbiA8IHRpbWVyRHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRpbWVyRHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aW1lckhhbmRsZSA9IHRoaXMuX3RpbWVyLnNldEludGVydmFsKHRoaXMuX2NhbGxiYWNrLmJpbmQodGhpcyksIHRpbWVyRHVyYXRpb24gKiAxMDAwKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGV4cGlyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHBpcmF0aW9uO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVySGFuZGxlKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUaW1lci5jYW5jZWw6IFwiLCB0aGlzLl9uYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyLmNsZWFySW50ZXJ2YWwodGhpcy5fdGltZXJIYW5kbGUpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXJIYW5kbGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NhbGxiYWNrKCkge1xuICAgICAgICB2YXIgZGlmZiA9IHRoaXMuX2V4cGlyYXRpb24gLSB0aGlzLm5vdztcbiAgICAgICAgTG9nLmRlYnVnKFwiVGltZXIuY2FsbGJhY2s7IFwiICsgdGhpcy5fbmFtZSArIFwiIHRpbWVyIGV4cGlyZXMgaW46XCIsIGRpZmYpO1xuXG4gICAgICAgIGlmICh0aGlzLl9leHBpcmF0aW9uIDw9IHRoaXMubm93KSB7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgc3VwZXIucmFpc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IEpzb25TZXJ2aWNlIH0gZnJvbSAnLi9Kc29uU2VydmljZS5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL01ldGFkYXRhU2VydmljZS5qcyc7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUb2tlbkNsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIEpzb25TZXJ2aWNlQ3RvciA9IEpzb25TZXJ2aWNlLCBNZXRhZGF0YVNlcnZpY2VDdG9yID0gTWV0YWRhdGFTZXJ2aWNlKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmN0b3I6IE5vIHNldHRpbmdzIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldHRpbmdzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgdGhpcy5fanNvblNlcnZpY2UgPSBuZXcgSnNvblNlcnZpY2VDdG9yKCk7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZSA9IG5ldyBNZXRhZGF0YVNlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICB9XG5cbiAgICBleGNoYW5nZUNvZGUoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLmdyYW50X3R5cGUgPSBhcmdzLmdyYW50X3R5cGUgfHwgXCJhdXRob3JpemF0aW9uX2NvZGVcIjtcbiAgICAgICAgYXJncy5jbGllbnRfaWQgPSBhcmdzLmNsaWVudF9pZCB8fCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgICAgIGFyZ3MuY2xpZW50X3NlY3JldCA9IGFyZ3MuY2xpZW50X3NlY3JldCB8fCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICBhcmdzLnJlZGlyZWN0X3VyaSA9IGFyZ3MucmVkaXJlY3RfdXJpIHx8IHRoaXMuX3NldHRpbmdzLnJlZGlyZWN0X3VyaTtcblxuICAgICAgICB2YXIgYmFzaWNBdXRoID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgY2xpZW50X2F1dGhlbnRpY2F0aW9uID0gYXJncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uIHx8IHRoaXMuX3NldHRpbmdzLl9jbGllbnRfYXV0aGVudGljYXRpb247XG4gICAgICAgIGRlbGV0ZSBhcmdzLl9jbGllbnRfYXV0aGVudGljYXRpb247XG5cbiAgICAgICAgaWYgKCFhcmdzLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogTm8gY29kZSBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSBjb2RlIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MucmVkaXJlY3RfdXJpKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IE5vIHJlZGlyZWN0X3VyaSBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSByZWRpcmVjdF91cmkgaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJncy5jb2RlX3ZlcmlmaWVyKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IE5vIGNvZGVfdmVyaWZpZXIgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgY29kZV92ZXJpZmllciBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiBObyBjbGllbnRfaWQgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgY2xpZW50X2lkIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MuY2xpZW50X3NlY3JldCAmJiBjbGllbnRfYXV0aGVudGljYXRpb24gPT0gXCJjbGllbnRfc2VjcmV0X2Jhc2ljXCIpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogTm8gY2xpZW50X3NlY3JldCBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSBjbGllbnRfc2VjcmV0IGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlbmRpbmcgdGhlIGNsaWVudCBjcmVkZW50aWFscyB1c2luZyB0aGUgQmFzaWMgQXV0aCBtZXRob2RcbiAgICAgICAgaWYoY2xpZW50X2F1dGhlbnRpY2F0aW9uID09IFwiY2xpZW50X3NlY3JldF9iYXNpY1wiKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNpY0F1dGggPSBhcmdzLmNsaWVudF9pZCArICc6JyArIGFyZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgICAgIGRlbGV0ZSBhcmdzLmNsaWVudF9pZDtcbiAgICAgICAgICAgIGRlbGV0ZSBhcmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFRva2VuRW5kcG9pbnQoZmFsc2UpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogUmVjZWl2ZWQgdG9rZW4gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UucG9zdEZvcm0odXJsLCBhcmdzLCBiYXNpY0F1dGgpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogcmVzcG9uc2UgcmVjZWl2ZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4Y2hhbmdlUmVmcmVzaFRva2VuKGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5ncmFudF90eXBlID0gYXJncy5ncmFudF90eXBlIHx8IFwicmVmcmVzaF90b2tlblwiO1xuICAgICAgICBhcmdzLmNsaWVudF9pZCA9IGFyZ3MuY2xpZW50X2lkIHx8IHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZDtcbiAgICAgICAgYXJncy5jbGllbnRfc2VjcmV0ID0gYXJncy5jbGllbnRfc2VjcmV0IHx8IHRoaXMuX3NldHRpbmdzLmNsaWVudF9zZWNyZXQ7XG5cbiAgICAgICAgdmFyIGJhc2ljQXV0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGNsaWVudF9hdXRoZW50aWNhdGlvbiA9IGFyZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbiB8fCB0aGlzLl9zZXR0aW5ncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuICAgICAgICBkZWxldGUgYXJncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuXG4gICAgICAgIGlmICghYXJncy5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZVJlZnJlc2hUb2tlbjogTm8gcmVmcmVzaF90b2tlbiBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSByZWZyZXNoX3Rva2VuIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZVJlZnJlc2hUb2tlbjogTm8gY2xpZW50X2lkIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIGNsaWVudF9pZCBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZW5kaW5nIHRoZSBjbGllbnQgY3JlZGVudGlhbHMgdXNpbmcgdGhlIEJhc2ljIEF1dGggbWV0aG9kXG4gICAgICAgIGlmKGNsaWVudF9hdXRoZW50aWNhdGlvbiA9PSBcImNsaWVudF9zZWNyZXRfYmFzaWNcIilcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzaWNBdXRoID0gYXJncy5jbGllbnRfaWQgKyAnOicgKyBhcmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgICAgICBkZWxldGUgYXJncy5jbGllbnRfaWQ7XG4gICAgICAgICAgICBkZWxldGUgYXJncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRUb2tlbkVuZHBvaW50KGZhbHNlKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlbkNsaWVudC5leGNoYW5nZVJlZnJlc2hUb2tlbjogUmVjZWl2ZWQgdG9rZW4gZW5kcG9pbnRcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9qc29uU2VydmljZS5wb3N0Rm9ybSh1cmwsIGFyZ3MsIGJhc2ljQXV0aCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW46IHJlc3BvbnNlIHJlY2VpdmVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL01ldGFkYXRhU2VydmljZS5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmNvbnN0IEFjY2Vzc1Rva2VuVHlwZUhpbnQgPSBcImFjY2Vzc190b2tlblwiO1xuY29uc3QgUmVmcmVzaFRva2VuVHlwZUhpbnQgPSBcInJlZnJlc2hfdG9rZW5cIjtcblxuZXhwb3J0IGNsYXNzIFRva2VuUmV2b2NhdGlvbkNsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIFhNTEh0dHBSZXF1ZXN0Q3RvciA9IEdsb2JhbC5YTUxIdHRwUmVxdWVzdCwgTWV0YWRhdGFTZXJ2aWNlQ3RvciA9IE1ldGFkYXRhU2VydmljZSkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlblJldm9jYXRpb25DbGllbnQuY3RvcjogTm8gc2V0dGluZ3MgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzZXR0aW5ncyBwcm92aWRlZC5cIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLl9YTUxIdHRwUmVxdWVzdEN0b3IgPSBYTUxIdHRwUmVxdWVzdEN0b3I7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZSA9IG5ldyBNZXRhZGF0YVNlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICB9XG5cbiAgICByZXZva2UodG9rZW4sIHJlcXVpcmVkLCB0eXBlID0gXCJhY2Nlc3NfdG9rZW5cIikge1xuICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBObyB0b2tlbiBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRva2VuIHByb3ZpZGVkLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlICE9PSBBY2Nlc3NUb2tlblR5cGVIaW50ICYmIHR5cGUgIT0gUmVmcmVzaFRva2VuVHlwZUhpbnQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IEludmFsaWQgdG9rZW4gdHlwZVwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdG9rZW4gdHlwZS5cIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFJldm9jYXRpb25FbmRwb2ludCgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IFJldm9jYXRpb24gbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmV2b2NhdGlvbiBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG5vdCByZXF1aXJlZCwgc28gZG9uJ3QgZXJyb3IgYW5kIGp1c3QgcmV0dXJuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBSZXZva2luZyBcIiArIHR5cGUpO1xuICAgICAgICAgICAgdmFyIGNsaWVudF9pZCA9IHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZDtcbiAgICAgICAgICAgIHZhciBjbGllbnRfc2VjcmV0ID0gdGhpcy5fc2V0dGluZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXZva2UodXJsLCBjbGllbnRfaWQsIGNsaWVudF9zZWNyZXQsIHRva2VuLCB0eXBlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3Jldm9rZSh1cmwsIGNsaWVudF9pZCwgY2xpZW50X3NlY3JldCwgdG9rZW4sIHR5cGUpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IHRoaXMuX1hNTEh0dHBSZXF1ZXN0Q3RvcigpO1xuICAgICAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIHVybCk7XG5cbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZTogSFRUUCByZXNwb25zZSByZWNlaXZlZCwgc3RhdHVzXCIsIHhoci5zdGF0dXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IoeGhyLnN0YXR1c1RleHQgKyBcIiAoXCIgKyB4aHIuc3RhdHVzICsgXCIpXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7IFxuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IE5ldHdvcmsgRXJyb3IuXCIpXG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiTmV0d29yayBFcnJvclwiKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBib2R5ID0gXCJjbGllbnRfaWQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoY2xpZW50X2lkKTtcbiAgICAgICAgICAgIGlmIChjbGllbnRfc2VjcmV0KSB7XG4gICAgICAgICAgICAgICAgYm9keSArPSBcIiZjbGllbnRfc2VjcmV0PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNsaWVudF9zZWNyZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keSArPSBcIiZ0b2tlbl90eXBlX2hpbnQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodHlwZSk7XG4gICAgICAgICAgICBib2R5ICs9IFwiJnRva2VuPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHRva2VuKTtcblxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG4gICAgICAgICAgICB4aHIuc2VuZChib2R5KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuXG5leHBvcnQgY2xhc3MgVXJsVXRpbGl0eSB7XG4gICAgc3RhdGljIGFkZFF1ZXJ5UGFyYW0odXJsLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICBpZiAodXJsLmluZGV4T2YoJz8nKSA8IDApIHtcbiAgICAgICAgICAgIHVybCArPSBcIj9cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxbdXJsLmxlbmd0aCAtIDFdICE9PSBcIj9cIikge1xuICAgICAgICAgICAgdXJsICs9IFwiJlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsICs9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKTtcbiAgICAgICAgdXJsICs9IFwiPVwiO1xuICAgICAgICB1cmwgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZVVybEZyYWdtZW50KHZhbHVlLCBkZWxpbWl0ZXIgPSBcIiNcIiwgZ2xvYmFsID0gR2xvYmFsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIHZhbHVlID0gZ2xvYmFsLmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaWR4ID0gdmFsdWUubGFzdEluZGV4T2YoZGVsaW1pdGVyKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cihpZHggKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWxpbWl0ZXIgPT09IFwiP1wiKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSdyZSBkb2luZyBxdWVyeSwgdGhlbiBzdHJpcCBvZmYgaGFzaCBmcmFnbWVudCBiZWZvcmUgd2UgcGFyc2VcbiAgICAgICAgICAgIGlkeCA9IHZhbHVlLmluZGV4T2YoJyMnKTtcbiAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKDAsIGlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFyYW1zID0ge30sXG4gICAgICAgICAgICByZWdleCA9IC8oW14mPV0rKT0oW14mXSopL2csXG4gICAgICAgICAgICBtO1xuXG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgd2hpbGUgKG0gPSByZWdleC5leGVjKHZhbHVlKSkge1xuICAgICAgICAgICAgcGFyYW1zW2RlY29kZVVSSUNvbXBvbmVudChtWzFdKV0gPSBkZWNvZGVVUklDb21wb25lbnQobVsyXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgICAgICBpZiAoY291bnRlcisrID4gNTApIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVcmxVdGlsaXR5LnBhcnNlVXJsRnJhZ21lbnQ6IHJlc3BvbnNlIGV4Y2VlZGVkIGV4cGVjdGVkIG51bWJlciBvZiBwYXJhbWV0ZXJzXCIsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJSZXNwb25zZSBleGNlZWRlZCBleHBlY3RlZCBudW1iZXIgb2YgcGFyYW1ldGVyc1wiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIFVzZXIge1xuICAgIGNvbnN0cnVjdG9yKHtpZF90b2tlbiwgc2Vzc2lvbl9zdGF0ZSwgYWNjZXNzX3Rva2VuLCByZWZyZXNoX3Rva2VuLCB0b2tlbl90eXBlLCBzY29wZSwgcHJvZmlsZSwgZXhwaXJlc19hdCwgc3RhdGV9KSB7XG4gICAgICAgIHRoaXMuaWRfdG9rZW4gPSBpZF90b2tlbjtcbiAgICAgICAgdGhpcy5zZXNzaW9uX3N0YXRlID0gc2Vzc2lvbl9zdGF0ZTtcbiAgICAgICAgdGhpcy5hY2Nlc3NfdG9rZW4gPSBhY2Nlc3NfdG9rZW47XG4gICAgICAgIHRoaXMucmVmcmVzaF90b2tlbiA9IHJlZnJlc2hfdG9rZW47XG4gICAgICAgIHRoaXMudG9rZW5fdHlwZSA9IHRva2VuX3R5cGU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5wcm9maWxlID0gcHJvZmlsZTtcbiAgICAgICAgdGhpcy5leHBpcmVzX2F0ID0gZXhwaXJlc19hdDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxuICAgIGdldCBleHBpcmVzX2luKCkge1xuICAgICAgICBpZiAodGhpcy5leHBpcmVzX2F0KSB7XG4gICAgICAgICAgICBsZXQgbm93ID0gcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwaXJlc19hdCAtIG5vdztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBzZXQgZXhwaXJlc19pbih2YWx1ZSkge1xuICAgICAgICBsZXQgZXhwaXJlc19pbiA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBleHBpcmVzX2luID09PSAnbnVtYmVyJyAmJiBleHBpcmVzX2luID4gMCkge1xuICAgICAgICAgICAgbGV0IG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMuZXhwaXJlc19hdCA9IG5vdyArIGV4cGlyZXNfaW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZXhwaXJlZCgpIHtcbiAgICAgICAgbGV0IGV4cGlyZXNfaW4gPSB0aGlzLmV4cGlyZXNfaW47XG4gICAgICAgIGlmIChleHBpcmVzX2luICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBleHBpcmVzX2luIDw9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgc2NvcGVzKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2NvcGUgfHwgXCJcIikuc3BsaXQoXCIgXCIpO1xuICAgIH1cblxuICAgIHRvU3RvcmFnZVN0cmluZygpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlci50b1N0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZF90b2tlbjogdGhpcy5pZF90b2tlbixcbiAgICAgICAgICAgIHNlc3Npb25fc3RhdGU6IHRoaXMuc2Vzc2lvbl9zdGF0ZSxcbiAgICAgICAgICAgIGFjY2Vzc190b2tlbjogdGhpcy5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICB0b2tlbl90eXBlOiB0aGlzLnRva2VuX3R5cGUsXG4gICAgICAgICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgICAgICAgIHByb2ZpbGU6IHRoaXMucHJvZmlsZSxcbiAgICAgICAgICAgIGV4cGlyZXNfYXQ6IHRoaXMuZXhwaXJlc19hdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbVN0b3JhZ2VTdHJpbmcoc3RvcmFnZVN0cmluZykge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyLmZyb21TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gbmV3IFVzZXIoSlNPTi5wYXJzZShzdG9yYWdlU3RyaW5nKSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgSnNvblNlcnZpY2UgfSBmcm9tICcuL0pzb25TZXJ2aWNlLmpzJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vTWV0YWRhdGFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEpvc2VVdGlsIH0gZnJvbSAnLi9Kb3NlVXRpbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBVc2VySW5mb1NlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzZXR0aW5ncywgXG4gICAgICAgIEpzb25TZXJ2aWNlQ3RvciA9IEpzb25TZXJ2aWNlLCBcbiAgICAgICAgTWV0YWRhdGFTZXJ2aWNlQ3RvciA9IE1ldGFkYXRhU2VydmljZSwgXG4gICAgICAgIGpvc2VVdGlsID0gSm9zZVV0aWxcbiAgICApIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLmN0b3I6IE5vIHNldHRpbmdzIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldHRpbmdzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgdGhpcy5fanNvblNlcnZpY2UgPSBuZXcgSnNvblNlcnZpY2VDdG9yKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzLl9nZXRDbGFpbXNGcm9tSnd0LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX2pvc2VVdGlsID0gam9zZVV0aWw7XG4gICAgfVxuXG4gICAgZ2V0Q2xhaW1zKHRva2VuKSB7XG4gICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5nZXRDbGFpbXM6IE5vIHRva2VuIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIHRva2VuIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0VXNlckluZm9FbmRwb2ludCgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5nZXRDbGFpbXM6IHJlY2VpdmVkIHVzZXJpbmZvIHVybFwiLCB1cmwpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UuZ2V0SnNvbih1cmwsIHRva2VuKS50aGVuKGNsYWltcyA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLmdldENsYWltczogY2xhaW1zIHJlY2VpdmVkXCIsIGNsYWltcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYWltcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZ2V0Q2xhaW1zRnJvbUp3dChyZXEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBqd3QgPSB0aGlzLl9qb3NlVXRpbC5wYXJzZUp3dChyZXEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGlmICghand0IHx8ICFqd3QuaGVhZGVyIHx8ICFqd3QucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogRmFpbGVkIHRvIHBhcnNlIEpXVFwiLCBqd3QpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIga2lkID0gand0LmhlYWRlci5raWQ7XG5cbiAgICAgICAgICAgIGxldCBpc3N1ZXJQcm9taXNlO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9zZXR0aW5ncy51c2VySW5mb0p3dElzc3Vlcikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ09QJzpcbiAgICAgICAgICAgICAgICAgICAgaXNzdWVyUHJvbWlzZSA9IHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRJc3N1ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQU5ZJzpcbiAgICAgICAgICAgICAgICAgICAgaXNzdWVyUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShqd3QucGF5bG9hZC5pc3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpc3N1ZXJQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3NldHRpbmdzLnVzZXJJbmZvSnd0SXNzdWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpc3N1ZXJQcm9taXNlLnRoZW4oaXNzdWVyID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IFJlY2VpdmVkIGlzc3VlcjpcIiArIGlzc3Vlcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFNpZ25pbmdLZXlzKCkudGhlbihrZXlzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IE5vIHNpZ25pbmcga2V5cyBmcm9tIG1ldGFkYXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHNpZ25pbmcga2V5cyBmcm9tIG1ldGFkYXRhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogUmVjZWl2ZWQgc2lnbmluZyBrZXlzXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWtpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cyA9IHRoaXMuX2ZpbHRlckJ5QWxnKGtleXMsIGp3dC5oZWFkZXIuYWxnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogTm8ga2lkIGZvdW5kIGluIGlkX3Rva2VuIGFuZCBtb3JlIHRoYW4gb25lIGtleSBmb3VuZCBpbiBtZXRhZGF0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8ga2lkIGZvdW5kIGluIGlkX3Rva2VuIGFuZCBtb3JlIHRoYW4gb25lIGtleSBmb3VuZCBpbiBtZXRhZGF0YVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraWQgaXMgbWFuZGF0b3J5IG9ubHkgd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUga2V5cyBpbiB0aGUgcmVmZXJlbmNlZCBKV0sgU2V0IGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VlIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjU2lnbmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlzLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXkua2lkID09PSBraWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IE5vIGtleSBtYXRjaGluZyBraWQgb3IgYWxnIGZvdW5kIGluIHNpZ25pbmcga2V5c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBrZXkgbWF0Y2hpbmcga2lkIG9yIGFsZyBmb3VuZCBpbiBzaWduaW5nIGtleXNcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGF1ZGllbmNlID0gdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9ja1NrZXdJblNlY29uZHMgPSB0aGlzLl9zZXR0aW5ncy5jbG9ja1NrZXc7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogVmFsaWRhaW5nIEpXVDsgdXNpbmcgY2xvY2sgc2tldyAoaW4gc2Vjb25kcykgb2Y6IFwiLCBjbG9ja1NrZXdJblNlY29uZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb3NlVXRpbC52YWxpZGF0ZUp3dChyZXEucmVzcG9uc2VUZXh0LCBrZXksIGlzc3VlciwgYXVkaWVuY2UsIGNsb2NrU2tld0luU2Vjb25kcywgdW5kZWZpbmVkLCB0cnVlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogSldUIHZhbGlkYXRpb24gc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqd3QucGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBFcnJvciBwYXJzaW5nIEpXVCByZXNwb25zZVwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2ZpbHRlckJ5QWxnKGtleXMsIGFsZykge1xuICAgICAgICB2YXIga3R5ID0gbnVsbDtcbiAgICAgICAgaWYgKGFsZy5zdGFydHNXaXRoKFwiUlNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiUlNBXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJQU1wiKSkge1xuICAgICAgICAgICAga3R5ID0gXCJQU1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsZy5zdGFydHNXaXRoKFwiRVNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiRUNcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZmlsdGVyQnlBbGc6IGFsZyBub3Qgc3VwcG9ydGVkOiBcIiwgYWxnKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZmlsdGVyQnlBbGc6IExvb2tpbmcgZm9yIGtleXMgdGhhdCBtYXRjaCBrdHk6IFwiLCBrdHkpO1xuXG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtleS5rdHkgPT09IGt0eTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLl9maWx0ZXJCeUFsZzogTnVtYmVyIG9mIGtleXMgdGhhdCBtYXRjaCBrdHk6IFwiLCBrdHksIGtleXMubGVuZ3RoKTtcblxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBPaWRjQ2xpZW50IH0gZnJvbSAnLi9PaWRjQ2xpZW50LmpzJztcbmltcG9ydCB7IFVzZXJNYW5hZ2VyU2V0dGluZ3MgfSBmcm9tICcuL1VzZXJNYW5hZ2VyU2V0dGluZ3MuanMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vVXNlci5qcyc7XG5pbXBvcnQgeyBVc2VyTWFuYWdlckV2ZW50cyB9IGZyb20gJy4vVXNlck1hbmFnZXJFdmVudHMuanMnO1xuaW1wb3J0IHsgU2lsZW50UmVuZXdTZXJ2aWNlIH0gZnJvbSAnLi9TaWxlbnRSZW5ld1NlcnZpY2UuanMnO1xuaW1wb3J0IHsgU2Vzc2lvbk1vbml0b3IgfSBmcm9tICcuL1Nlc3Npb25Nb25pdG9yLmpzJztcbmltcG9ydCB7IFNpZ25pblJlcXVlc3QgfSBmcm9tIFwiLi9TaWduaW5SZXF1ZXN0XCI7XG5pbXBvcnQgeyBUb2tlblJldm9jYXRpb25DbGllbnQgfSBmcm9tICcuL1Rva2VuUmV2b2NhdGlvbkNsaWVudC5qcyc7XG5pbXBvcnQgeyBUb2tlbkNsaWVudCB9IGZyb20gJy4vVG9rZW5DbGllbnQuanMnO1xuaW1wb3J0IHsgSm9zZVV0aWwgfSBmcm9tICcuL0pvc2VVdGlsLmpzJztcblxuXG5leHBvcnQgY2xhc3MgVXNlck1hbmFnZXIgZXh0ZW5kcyBPaWRjQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncyA9IHt9LFxuICAgICAgICBTaWxlbnRSZW5ld1NlcnZpY2VDdG9yID0gU2lsZW50UmVuZXdTZXJ2aWNlLFxuICAgICAgICBTZXNzaW9uTW9uaXRvckN0b3IgPSBTZXNzaW9uTW9uaXRvcixcbiAgICAgICAgVG9rZW5SZXZvY2F0aW9uQ2xpZW50Q3RvciA9IFRva2VuUmV2b2NhdGlvbkNsaWVudCxcbiAgICAgICAgVG9rZW5DbGllbnRDdG9yID0gVG9rZW5DbGllbnQsXG4gICAgICAgIGpvc2VVdGlsID0gSm9zZVV0aWxcbiAgICApIHtcblxuICAgICAgICBpZiAoIShzZXR0aW5ncyBpbnN0YW5jZW9mIFVzZXJNYW5hZ2VyU2V0dGluZ3MpKSB7XG4gICAgICAgICAgICBzZXR0aW5ncyA9IG5ldyBVc2VyTWFuYWdlclNldHRpbmdzKHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcihzZXR0aW5ncyk7XG5cbiAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IFVzZXJNYW5hZ2VyRXZlbnRzKHNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdTZXJ2aWNlID0gbmV3IFNpbGVudFJlbmV3U2VydmljZUN0b3IodGhpcyk7XG5cbiAgICAgICAgLy8gb3JkZXIgaXMgaW1wb3J0YW50IGZvciB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM7IHRoZXNlIHNlcnZpY2VzIGRlcGVuZCB1cG9uIHRoZSBldmVudHMuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG9tYXRpY1NpbGVudFJlbmV3KSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5jdG9yOiBhdXRvbWF0aWNTaWxlbnRSZW5ldyBpcyBjb25maWd1cmVkLCBzZXR0aW5nIHVwIHNpbGVudCByZW5ld1wiKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTaWxlbnRSZW5ldygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubW9uaXRvclNlc3Npb24pIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLmN0b3I6IG1vbml0b3JTZXNzaW9uIGlzIGNvbmZpZ3VyZWQsIHNldHRpbmcgdXAgc2Vzc2lvbiBtb25pdG9yXCIpO1xuICAgICAgICAgICAgdGhpcy5fc2Vzc2lvbk1vbml0b3IgPSBuZXcgU2Vzc2lvbk1vbml0b3JDdG9yKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdG9rZW5SZXZvY2F0aW9uQ2xpZW50ID0gbmV3IFRva2VuUmV2b2NhdGlvbkNsaWVudEN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl90b2tlbkNsaWVudCA9IG5ldyBUb2tlbkNsaWVudEN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl9qb3NlVXRpbCA9IGpvc2VVdGlsO1xuICAgIH1cblxuICAgIGdldCBfcmVkaXJlY3ROYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnJlZGlyZWN0TmF2aWdhdG9yO1xuICAgIH1cbiAgICBnZXQgX3BvcHVwTmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5wb3B1cE5hdmlnYXRvcjtcbiAgICB9XG4gICAgZ2V0IF9pZnJhbWVOYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmlmcmFtZU5hdmlnYXRvcjtcbiAgICB9XG4gICAgZ2V0IF91c2VyU3RvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnVzZXJTdG9yZTtcbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIGdldFVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuZ2V0VXNlcjogdXNlciBsb2FkZWRcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubG9hZCh1c2VyLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuZ2V0VXNlcjogdXNlciBub3QgZm91bmQgaW4gc3RvcmFnZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVVc2VyKG51bGwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5yZW1vdmVVc2VyOiB1c2VyIHJlbW92ZWQgZnJvbSBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnVubG9hZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWduaW5SZWRpcmVjdChhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MucmVxdWVzdF90eXBlID0gXCJzaTpyXCI7XG4gICAgICAgIGxldCBuYXZQYXJhbXMgPSB7XG4gICAgICAgICAgICB1c2VSZXBsYWNlVG9OYXZpZ2F0ZSA6IGFyZ3MudXNlUmVwbGFjZVRvTmF2aWdhdGVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pblN0YXJ0KGFyZ3MsIHRoaXMuX3JlZGlyZWN0TmF2aWdhdG9yLCBuYXZQYXJhbXMpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUmVkaXJlY3Q6IHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaWduaW5SZWRpcmVjdENhbGxiYWNrKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluRW5kKHVybCB8fCB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvci51cmwpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlci5wcm9maWxlICYmIHVzZXIucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblJlZGlyZWN0Q2FsbGJhY2s6IHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUmVkaXJlY3RDYWxsYmFjazogbm8gc3ViXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbmluUG9wdXAoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic2k6cFwiO1xuICAgICAgICBsZXQgdXJsID0gYXJncy5yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmk7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cDogTm8gcG9wdXBfcmVkaXJlY3RfdXJpIG9yIHJlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHBvcHVwX3JlZGlyZWN0X3VyaSBvciByZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzLnJlZGlyZWN0X3VyaSA9IHVybDtcbiAgICAgICAgYXJncy5kaXNwbGF5ID0gXCJwb3B1cFwiO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW4oYXJncywgdGhpcy5fcG9wdXBOYXZpZ2F0b3IsIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsOiB1cmwsXG4gICAgICAgICAgICBwb3B1cFdpbmRvd0ZlYXR1cmVzOiBhcmdzLnBvcHVwV2luZG93RmVhdHVyZXMgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cFdpbmRvd0ZlYXR1cmVzLFxuICAgICAgICAgICAgcG9wdXBXaW5kb3dUYXJnZXQ6IGFyZ3MucG9wdXBXaW5kb3dUYXJnZXQgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cFdpbmRvd1RhcmdldFxuICAgICAgICB9KS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5wcm9maWxlICYmIHVzZXIucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cDogc2lnbmluUG9wdXAgc3VjY2Vzc2Z1bCwgc2lnbmVkIGluIHN1YjogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cDogbm8gc3ViXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaWduaW5Qb3B1cENhbGxiYWNrKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluQ2FsbGJhY2sodXJsLCB0aGlzLl9wb3B1cE5hdmlnYXRvcikudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXBDYWxsYmFjazogc3VjY2Vzc2Z1bCwgc2lnbmVkIGluIHN1YjogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cENhbGxiYWNrOiBubyBzdWJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cENhbGxiYWNrIGVycm9yOiBcIiArIGVyciAmJiBlcnIubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25pblNpbGVudChhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIC8vIGZpcnN0IGRldGVybWluZSBpZiB3ZSBoYXZlIGEgcmVmcmVzaCB0b2tlbiwgb3IgbmVlZCB0byB1c2UgaWZyYW1lXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlciAmJiB1c2VyLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBhcmdzLnJlZnJlc2hfdG9rZW4gPSB1c2VyLnJlZnJlc2hfdG9rZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZVJlZnJlc2hUb2tlbihhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFyZ3MucmVxdWVzdF90eXBlID0gXCJzaTpzXCI7XG4gICAgICAgICAgICAgICAgYXJncy5pZF90b2tlbl9oaW50ID0gYXJncy5pZF90b2tlbl9oaW50IHx8ICh0aGlzLnNldHRpbmdzLmluY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyAmJiB1c2VyICYmIHVzZXIuaWRfdG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyICYmIHRoaXMuX3NldHRpbmdzLnZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldykge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5zaWduaW5TaWxlbnQsIHN1YmplY3QgcHJpb3IgdG8gc2lsZW50IHJlbmV3OiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY3VycmVudF9zdWIgPSB1c2VyLnByb2ZpbGUuc3ViO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluU2lsZW50SWZyYW1lKGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdXNlUmVmcmVzaFRva2VuKGFyZ3MgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW4oYXJncykudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdXNlUmVmcmVzaFRva2VuOiBObyByZXNwb25zZSByZXR1cm5lZCBmcm9tIHRva2VuIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIk5vIHJlc3BvbnNlIHJldHVybmVkIGZyb20gdG9rZW4gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdXNlUmVmcmVzaFRva2VuOiBObyBhY2Nlc3MgdG9rZW4gcmV0dXJuZWQgZnJvbSB0b2tlbiBlbmRwb2ludFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJObyBhY2Nlc3MgdG9rZW4gcmV0dXJuZWQgZnJvbSB0b2tlbiBlbmRwb2ludFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VyKCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaWRUb2tlblZhbGlkYXRpb24gPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pZF90b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRUb2tlblZhbGlkYXRpb24gPSB0aGlzLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW4odXNlci5wcm9maWxlLCByZXN1bHQuaWRfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkVG9rZW5WYWxpZGF0aW9uLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3VzZVJlZnJlc2hUb2tlbjogcmVmcmVzaCB0b2tlbiByZXNwb25zZSBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5pZF90b2tlbiA9IHJlc3VsdC5pZF90b2tlbiB8fCB1c2VyLmlkX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5hY2Nlc3NfdG9rZW4gPSByZXN1bHQuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5yZWZyZXNoX3Rva2VuID0gcmVzdWx0LnJlZnJlc2hfdG9rZW4gfHwgdXNlci5yZWZyZXNoX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5leHBpcmVzX2luID0gcmVzdWx0LmV4cGlyZXNfaW47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlVXNlcih1c2VyKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLmxvYWQodXNlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbihwcm9maWxlLCBpZF90b2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldElzc3VlcigpLnRoZW4oaXNzdWVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmdldEVwb2NoVGltZSgpLnRoZW4obm93ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fam9zZVV0aWwudmFsaWRhdGVKd3RBdHRyaWJ1dGVzKGlkX3Rva2VuLCBpc3N1ZXIsIHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCwgdGhpcy5fc2V0dGluZ3MuY2xvY2tTa2V3LCBub3cpLnRoZW4ocGF5bG9hZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcGF5bG9hZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbjogRmFpbGVkIHRvIHZhbGlkYXRlIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byB2YWxpZGF0ZSBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuc3ViICE9PSBwcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbjogc3ViIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIGN1cnJlbnQgc3ViXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcInN1YiBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBjdXJyZW50IHN1YlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXV0aF90aW1lICYmIHBheWxvYWQuYXV0aF90aW1lICE9PSBwcm9maWxlLmF1dGhfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbjogYXV0aF90aW1lIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIG9yaWdpbmFsIGF1dGhfdGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhdXRoX3RpbWUgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggb3JpZ2luYWwgYXV0aF90aW1lXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5henAgJiYgcGF5bG9hZC5henAgIT09IHByb2ZpbGUuYXpwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuOiBhenAgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggb3JpZ2luYWwgYXpwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImF6cCBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBvcmlnaW5hbCBhenBcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghcGF5bG9hZC5henAgJiYgcHJvZmlsZS5henApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW46IGF6cCBub3QgaW4gaWRfdG9rZW4sIGJ1dCBwcmVzZW50IGluIG9yaWdpbmFsIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImF6cCBub3QgaW4gaWRfdG9rZW4sIGJ1dCBwcmVzZW50IGluIG9yaWdpbmFsIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBfc2lnbmluU2lsZW50SWZyYW1lKGFyZ3MgPSB7fSkge1xuICAgICAgICBsZXQgdXJsID0gYXJncy5yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5zaWxlbnRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50OiBObyBzaWxlbnRfcmVkaXJlY3RfdXJpIGNvbmZpZ3VyZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gc2lsZW50X3JlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyZ3MucmVkaXJlY3RfdXJpID0gdXJsO1xuICAgICAgICBhcmdzLnByb21wdCA9IGFyZ3MucHJvbXB0IHx8IFwibm9uZVwiO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW4oYXJncywgdGhpcy5faWZyYW1lTmF2aWdhdG9yLCB7XG4gICAgICAgICAgICBzdGFydFVybDogdXJsLFxuICAgICAgICAgICAgc2lsZW50UmVxdWVzdFRpbWVvdXQ6IGFyZ3Muc2lsZW50UmVxdWVzdFRpbWVvdXQgfHwgdGhpcy5zZXR0aW5ncy5zaWxlbnRSZXF1ZXN0VGltZW91dFxuICAgICAgICB9KS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5wcm9maWxlICYmIHVzZXIucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5TaWxlbnQ6IHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50OiBubyBzdWJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbmluU2lsZW50Q2FsbGJhY2sodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5DYWxsYmFjayh1cmwsIHRoaXMuX2lmcmFtZU5hdmlnYXRvcikudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50Q2FsbGJhY2s6IHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50Q2FsbGJhY2s6IG5vIHN1YlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWduaW5DYWxsYmFjayh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFNpZ25pblJlc3BvbnNlU3RhdGUodXJsKS50aGVuKCh7c3RhdGUsIHJlc3BvbnNlfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0YXRlLnJlcXVlc3RfdHlwZSA9PT0gXCJzaTpyXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaWduaW5SZWRpcmVjdENhbGxiYWNrKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUucmVxdWVzdF90eXBlID09PSBcInNpOnBcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25pblBvcHVwQ2FsbGJhY2sodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0ZS5yZXF1ZXN0X3R5cGUgPT09IFwic2k6c1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmluU2lsZW50Q2FsbGJhY2sodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJpbnZhbGlkIHJlc3BvbnNlX3R5cGUgaW4gc3RhdGVcIikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWdub3V0Q2FsbGJhY2sodXJsLCBrZWVwT3Blbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkU2lnbm91dFJlc3BvbnNlU3RhdGUodXJsKS50aGVuKCh7c3RhdGUsIHJlc3BvbnNlfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnJlcXVlc3RfdHlwZSA9PT0gXCJzbzpyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbm91dFJlZGlyZWN0Q2FsbGJhY2sodXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnJlcXVlc3RfdHlwZSA9PT0gXCJzbzpwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbm91dFBvcHVwQ2FsbGJhY2sodXJsLCBrZWVwT3Blbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJpbnZhbGlkIHJlc3BvbnNlX3R5cGUgaW4gc3RhdGVcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBxdWVyeVNlc3Npb25TdGF0dXMoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic2k6c1wiOyAvLyB0aGlzIGFjdHMgbGlrZSBhIHNpZ25pbiBzaWxlbnRcbiAgICAgICAgbGV0IHVybCA9IGFyZ3MucmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3Muc2lsZW50X3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnJlZGlyZWN0X3VyaTtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1czogTm8gc2lsZW50X3JlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHNpbGVudF9yZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzLnJlZGlyZWN0X3VyaSA9IHVybDtcbiAgICAgICAgYXJncy5wcm9tcHQgPSBcIm5vbmVcIjtcbiAgICAgICAgYXJncy5yZXNwb25zZV90eXBlID0gYXJncy5yZXNwb25zZV90eXBlIHx8IHRoaXMuc2V0dGluZ3MucXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGU7XG4gICAgICAgIGFyZ3Muc2NvcGUgPSBhcmdzLnNjb3BlIHx8IFwib3BlbmlkXCI7XG4gICAgICAgIGFyZ3Muc2tpcFVzZXJJbmZvID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluU3RhcnQoYXJncywgdGhpcy5faWZyYW1lTmF2aWdhdG9yLCB7XG4gICAgICAgICAgICBzdGFydFVybDogdXJsLFxuICAgICAgICAgICAgc2lsZW50UmVxdWVzdFRpbWVvdXQ6IGFyZ3Muc2lsZW50UmVxdWVzdFRpbWVvdXQgfHwgdGhpcy5zZXR0aW5ncy5zaWxlbnRSZXF1ZXN0VGltZW91dFxuICAgICAgICB9KS50aGVuKG5hdlJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NTaWduaW5SZXNwb25zZShuYXZSZXNwb25zZS51cmwpLnRoZW4oc2lnbmluUmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1czogZ290IHNpZ25pbiByZXNwb25zZVwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChzaWduaW5SZXNwb25zZS5zZXNzaW9uX3N0YXRlICYmIHNpZ25pblJlc3BvbnNlLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzOiBxdWVyeVNlc3Npb25TdGF0dXMgc3VjY2VzcyBmb3Igc3ViOiBcIiwgIHNpZ25pblJlc3BvbnNlLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25fc3RhdGU6IHNpZ25pblJlc3BvbnNlLnNlc3Npb25fc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWI6IHNpZ25pblJlc3BvbnNlLnByb2ZpbGUuc3ViLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2lkOiBzaWduaW5SZXNwb25zZS5wcm9maWxlLnNpZFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJxdWVyeVNlc3Npb25TdGF0dXMgc3VjY2Vzc2Z1bCwgdXNlciBub3QgYXV0aGVudGljYXRlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVyci5zZXNzaW9uX3N0YXRlICYmIHRoaXMuc2V0dGluZ3MubW9uaXRvckFub255bW91c1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5tZXNzYWdlID09IFwibG9naW5fcmVxdWlyZWRcIiB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID09IFwiY29uc2VudF9yZXF1aXJlZFwiIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPT0gXCJpbnRlcmFjdGlvbl9yZXF1aXJlZFwiIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPT0gXCJhY2NvdW50X3NlbGVjdGlvbl9yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXM6IHF1ZXJ5U2Vzc2lvblN0YXR1cyBzdWNjZXNzIGZvciBhbm9ueW1vdXMgdXNlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbl9zdGF0ZTogZXJyLnNlc3Npb25fc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3NpZ25pbihhcmdzLCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5TdGFydChhcmdzLCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcykudGhlbihuYXZSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluRW5kKG5hdlJlc3BvbnNlLnVybCwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2lnbmluU3RhcnQoYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMgPSB7fSkge1xuXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IucHJlcGFyZShuYXZpZ2F0b3JQYXJhbXMpLnRoZW4oaGFuZGxlID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5TdGFydDogZ290IG5hdmlnYXRvciB3aW5kb3cgaGFuZGxlXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTaWduaW5SZXF1ZXN0KGFyZ3MpLnRoZW4oc2lnbmluUmVxdWVzdCA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pblN0YXJ0OiBnb3Qgc2lnbmluIHJlcXVlc3RcIik7XG5cbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3JQYXJhbXMudXJsID0gc2lnbmluUmVxdWVzdC51cmw7XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yUGFyYW1zLmlkID0gc2lnbmluUmVxdWVzdC5zdGF0ZS5pZDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUubmF2aWdhdGUobmF2aWdhdG9yUGFyYW1zKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZS5jbG9zZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluU3RhcnQ6IEVycm9yIGFmdGVyIHByZXBhcmluZyBuYXZpZ2F0b3IsIGNsb3NpbmcgbmF2aWdhdG9yIHdpbmRvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NpZ25pbkVuZCh1cmwsIGFyZ3MgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzU2lnbmluUmVzcG9uc2UodXJsKS50aGVuKHNpZ25pblJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5FbmQ6IGdvdCBzaWduaW4gcmVzcG9uc2VcIik7XG5cbiAgICAgICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIoc2lnbmluUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBpZiAoYXJncy5jdXJyZW50X3N1Yikge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmN1cnJlbnRfc3ViICE9PSB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5FbmQ6IGN1cnJlbnQgdXNlciBkb2VzIG5vdCBtYXRjaCB1c2VyIHJldHVybmVkIGZyb20gc2lnbmluLiBzdWIgZnJvbSBzaWduaW46IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImxvZ2luX3JlcXVpcmVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5FbmQ6IGN1cnJlbnQgdXNlciBtYXRjaGVzIHVzZXIgcmV0dXJuZWQgZnJvbSBzaWduaW5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVVzZXIodXNlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pbkVuZDogdXNlciBzdG9yZWRcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubG9hZCh1c2VyKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2lnbmluQ2FsbGJhY2sodXJsLCBuYXZpZ2F0b3IpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pbkNhbGxiYWNrXCIpO1xuICAgICAgICBsZXQgdXNlUXVlcnkgPSB0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV9tb2RlID09PSBcInF1ZXJ5XCIgfHwgKCF0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV9tb2RlICYmIFNpZ25pblJlcXVlc3QuaXNDb2RlKHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX3R5cGUpKTtcbiAgICAgICAgbGV0IGRlbGltaXRlciA9IHVzZVF1ZXJ5ID8gXCI/XCIgOiBcIiNcIjtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5jYWxsYmFjayh1cmwsIHVuZGVmaW5lZCwgZGVsaW1pdGVyKTtcbiAgICB9XG5cbiAgICBzaWdub3V0UmVkaXJlY3QoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic286clwiO1xuICAgICAgICBsZXQgcG9zdExvZ291dFJlZGlyZWN0VXJpID0gYXJncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgICAgIGlmIChwb3N0TG9nb3V0UmVkaXJlY3RVcmkpe1xuICAgICAgICAgICAgYXJncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgPSBwb3N0TG9nb3V0UmVkaXJlY3RVcmk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5hdlBhcmFtcyA9IHtcbiAgICAgICAgICAgIHVzZVJlcGxhY2VUb05hdmlnYXRlIDogYXJncy51c2VSZXBsYWNlVG9OYXZpZ2F0ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbm91dFN0YXJ0KGFyZ3MsIHRoaXMuX3JlZGlyZWN0TmF2aWdhdG9yLCBuYXZQYXJhbXMpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbm91dFJlZGlyZWN0OiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2lnbm91dFJlZGlyZWN0Q2FsbGJhY2sodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWdub3V0RW5kKHVybCB8fCB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvci51cmwpLnRoZW4ocmVzcG9uc2U9PntcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbm91dFJlZGlyZWN0Q2FsbGJhY2s6IHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25vdXRQb3B1cChhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MucmVxdWVzdF90eXBlID0gXCJzbzpwXCI7XG4gICAgICAgIGxldCB1cmwgPSBhcmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnBvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgYXJncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgPSB1cmw7XG4gICAgICAgIGFyZ3MuZGlzcGxheSA9IFwicG9wdXBcIjtcbiAgICAgICAgaWYgKGFyZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpKXtcbiAgICAgICAgICAgIC8vIHdlJ3JlIHB1dHRpbmcgYSBkdW1teSBlbnRyeSBpbiBoZXJlIGJlY2F1c2Ugd2VcbiAgICAgICAgICAgIC8vIG5lZWQgYSB1bmlxdWUgaWQgZnJvbSB0aGUgc3RhdGUgZm9yIG5vdGlmaWNhdGlvblxuICAgICAgICAgICAgLy8gdG8gdGhlIHBhcmVudCB3aW5kb3csIHdoaWNoIGlzIG5lY2Vzc2FyeSBpZiB3ZVxuICAgICAgICAgICAgLy8gcGxhbiB0byByZXR1cm4gYmFjayB0byB0aGUgY2xpZW50IGFmdGVyIHNpZ25vdXRcbiAgICAgICAgICAgIC8vIGFuZCBzbyB3ZSBjYW4gY2xvc2UgdGhlIHBvcHVwIGFmdGVyIHNpZ25vdXRcbiAgICAgICAgICAgIGFyZ3Muc3RhdGUgPSBhcmdzLnN0YXRlIHx8IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25vdXQoYXJncywgdGhpcy5fcG9wdXBOYXZpZ2F0b3IsIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsOiB1cmwsXG4gICAgICAgICAgICBwb3B1cFdpbmRvd0ZlYXR1cmVzOiBhcmdzLnBvcHVwV2luZG93RmVhdHVyZXMgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cFdpbmRvd0ZlYXR1cmVzLFxuICAgICAgICAgICAgcG9wdXBXaW5kb3dUYXJnZXQ6IGFyZ3MucG9wdXBXaW5kb3dUYXJnZXQgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cFdpbmRvd1RhcmdldFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbm91dFBvcHVwOiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2lnbm91dFBvcHVwQ2FsbGJhY2sodXJsLCBrZWVwT3Blbikge1xuICAgICAgICBpZiAodHlwZW9mKGtlZXBPcGVuKSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKHVybCkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAga2VlcE9wZW4gPSB1cmw7XG4gICAgICAgICAgICB1cmwgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRlbGltaXRlciA9ICc/JztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwTmF2aWdhdG9yLmNhbGxiYWNrKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25vdXRQb3B1cENhbGxiYWNrOiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfc2lnbm91dChhcmdzLCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWdub3V0U3RhcnQoYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMpLnRoZW4obmF2UmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25vdXRFbmQobmF2UmVzcG9uc2UudXJsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9zaWdub3V0U3RhcnQoYXJncyA9IHt9LCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IucHJlcGFyZShuYXZpZ2F0b3JQYXJhbXMpLnRoZW4oaGFuZGxlID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IGdvdCBuYXZpZ2F0b3Igd2luZG93IGhhbmRsZVwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VyKCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiBsb2FkZWQgY3VycmVudCB1c2VyIGZyb20gc3RvcmFnZVwiKTtcblxuICAgICAgICAgICAgICAgIHZhciByZXZva2VQcm9taXNlID0gdGhpcy5fc2V0dGluZ3MucmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQgPyB0aGlzLl9yZXZva2VJbnRlcm5hbCh1c2VyKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXZva2VQcm9taXNlLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZF90b2tlbiA9IGFyZ3MuaWRfdG9rZW5faGludCB8fCB1c2VyICYmIHVzZXIuaWRfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZF90b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRTdGFydDogU2V0dGluZyBpZF90b2tlbiBpbnRvIHNpZ25vdXQgcmVxdWVzdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuaWRfdG9rZW5faGludCA9IGlkX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlVXNlcigpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRTdGFydDogdXNlciByZW1vdmVkLCBjcmVhdGluZyBzaWdub3V0IHJlcXVlc3RcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNpZ25vdXRSZXF1ZXN0KGFyZ3MpLnRoZW4oc2lnbm91dFJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IGdvdCBzaWdub3V0IHJlcXVlc3RcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3JQYXJhbXMudXJsID0gc2lnbm91dFJlcXVlc3QudXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaWdub3V0UmVxdWVzdC5zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3JQYXJhbXMuaWQgPSBzaWdub3V0UmVxdWVzdC5zdGF0ZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZS5uYXZpZ2F0ZShuYXZpZ2F0b3JQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlLmNsb3NlKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IEVycm9yIGFmdGVyIHByZXBhcmluZyBuYXZpZ2F0b3IsIGNsb3NpbmcgbmF2aWdhdG9yIHdpbmRvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NpZ25vdXRFbmQodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NTaWdub3V0UmVzcG9uc2UodXJsKS50aGVuKHNpZ25vdXRSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dEVuZDogZ290IHNpZ25vdXQgcmVzcG9uc2VcIik7XG5cbiAgICAgICAgICAgIHJldHVybiBzaWdub3V0UmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldm9rZUFjY2Vzc1Rva2VuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jldm9rZUludGVybmFsKHVzZXIsIHRydWUpLnRoZW4oc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIucmV2b2tlQWNjZXNzVG9rZW46IHJlbW92aW5nIHRva2VuIHByb3BlcnRpZXMgZnJvbSB1c2VyIGFuZCByZS1zdG9yaW5nXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHVzZXIuYWNjZXNzX3Rva2VuID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlci5yZWZyZXNoX3Rva2VuID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlci5leHBpcmVzX2F0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlci50b2tlbl90eXBlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVVzZXIodXNlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5yZXZva2VBY2Nlc3NUb2tlbjogdXNlciBzdG9yZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubG9hZCh1c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIucmV2b2tlQWNjZXNzVG9rZW46IGFjY2VzcyB0b2tlbiByZXZva2VkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3Jldm9rZUludGVybmFsKHVzZXIsIHJlcXVpcmVkKSB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICB2YXIgYWNjZXNzX3Rva2VuID0gdXNlci5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICB2YXIgcmVmcmVzaF90b2tlbiA9IHVzZXIucmVmcmVzaF90b2tlbjtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jldm9rZUFjY2Vzc1Rva2VuSW50ZXJuYWwoYWNjZXNzX3Rva2VuLCByZXF1aXJlZClcbiAgICAgICAgICAgICAgICAudGhlbihhdFN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmV2b2tlUmVmcmVzaFRva2VuSW50ZXJuYWwocmVmcmVzaF90b2tlbiwgcmVxdWlyZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihydFN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXRTdWNjZXNzICYmICFydFN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIucmV2b2tlQWNjZXNzVG9rZW46IG5vIG5lZWQgdG8gcmV2b2tlIGR1ZSB0byBubyB0b2tlbihzKSwgb3IgSldUIGZvcm1hdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF0U3VjY2VzcyB8fCBydFN1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cblxuICAgIF9yZXZva2VBY2Nlc3NUb2tlbkludGVybmFsKGFjY2Vzc190b2tlbiwgcmVxdWlyZWQpIHtcbiAgICAgICAgLy8gY2hlY2sgZm9yIEpXVCB2cy4gcmVmZXJlbmNlIHRva2VuXG4gICAgICAgIGlmICghYWNjZXNzX3Rva2VuIHx8IGFjY2Vzc190b2tlbi5pbmRleE9mKCcuJykgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZShhY2Nlc3NfdG9rZW4sIHJlcXVpcmVkKS50aGVuKCgpID0+IHRydWUpO1xuICAgIH1cblxuICAgIF9yZXZva2VSZWZyZXNoVG9rZW5JbnRlcm5hbChyZWZyZXNoX3Rva2VuLCByZXF1aXJlZCkge1xuICAgICAgICBpZiAoIXJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2UocmVmcmVzaF90b2tlbiwgcmVxdWlyZWQsIFwicmVmcmVzaF90b2tlblwiKS50aGVuKCgpID0+IHRydWUpO1xuICAgIH1cblxuICAgIHN0YXJ0U2lsZW50UmVuZXcoKSB7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3U2VydmljZS5zdGFydCgpO1xuICAgIH1cblxuICAgIHN0b3BTaWxlbnRSZW5ldygpIHtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdTZXJ2aWNlLnN0b3AoKTtcbiAgICB9XG5cbiAgICBnZXQgX3VzZXJTdG9yZUtleSgpIHtcbiAgICAgICAgcmV0dXJuIGB1c2VyOiR7dGhpcy5zZXR0aW5ncy5hdXRob3JpdHl9OiR7dGhpcy5zZXR0aW5ncy5jbGllbnRfaWR9YDtcbiAgICB9XG5cbiAgICBfbG9hZFVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyU3RvcmUuZ2V0KHRoaXMuX3VzZXJTdG9yZUtleSkudGhlbihzdG9yYWdlU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGlmIChzdG9yYWdlU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX2xvYWRVc2VyOiB1c2VyIHN0b3JhZ2VTdHJpbmcgbG9hZGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBVc2VyLmZyb21TdG9yYWdlU3RyaW5nKHN0b3JhZ2VTdHJpbmcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fbG9hZFVzZXI6IG5vIHVzZXIgc3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdG9yZVVzZXIodXNlcikge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuc3RvcmVVc2VyOiBzdG9yaW5nIHVzZXJcIik7XG5cbiAgICAgICAgICAgIHZhciBzdG9yYWdlU3RyaW5nID0gdXNlci50b1N0b3JhZ2VTdHJpbmcoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyU3RvcmUuc2V0KHRoaXMuX3VzZXJTdG9yZUtleSwgc3RvcmFnZVN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJzdG9yZVVzZXIuc3RvcmVVc2VyOiByZW1vdmluZyB1c2VyXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTdG9yZS5yZW1vdmUodGhpcy5fdXNlclN0b3JlS2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEFjY2Vzc1Rva2VuRXZlbnRzIH0gZnJvbSAnLi9BY2Nlc3NUb2tlbkV2ZW50cy5qcyc7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vRXZlbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgVXNlck1hbmFnZXJFdmVudHMgZXh0ZW5kcyBBY2Nlc3NUb2tlbkV2ZW50cyB7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuICAgICAgICBzdXBlcihzZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX3VzZXJMb2FkZWQgPSBuZXcgRXZlbnQoXCJVc2VyIGxvYWRlZFwiKTtcbiAgICAgICAgdGhpcy5fdXNlclVubG9hZGVkID0gbmV3IEV2ZW50KFwiVXNlciB1bmxvYWRlZFwiKTtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdFcnJvciA9IG5ldyBFdmVudChcIlNpbGVudCByZW5ldyBlcnJvclwiKTtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZEluID0gbmV3IEV2ZW50KFwiVXNlciBzaWduZWQgaW5cIik7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRPdXQgPSBuZXcgRXZlbnQoXCJVc2VyIHNpZ25lZCBvdXRcIik7XG4gICAgICAgIHRoaXMuX3VzZXJTZXNzaW9uQ2hhbmdlZCA9IG5ldyBFdmVudChcIlVzZXIgc2Vzc2lvbiBjaGFuZ2VkXCIpO1xuICAgIH1cblxuICAgIGxvYWQodXNlciwgcmFpc2VFdmVudD10cnVlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLmxvYWRcIik7XG4gICAgICAgIHN1cGVyLmxvYWQodXNlcik7XG4gICAgICAgIGlmIChyYWlzZUV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyTG9hZGVkLnJhaXNlKHVzZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVubG9hZCgpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXJFdmVudHMudW5sb2FkXCIpO1xuICAgICAgICBzdXBlci51bmxvYWQoKTtcbiAgICAgICAgdGhpcy5fdXNlclVubG9hZGVkLnJhaXNlKCk7XG4gICAgfVxuXG4gICAgYWRkVXNlckxvYWRlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyTG9hZGVkLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVVc2VyTG9hZGVkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJMb2FkZWQucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuXG4gICAgYWRkVXNlclVubG9hZGVkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJVbmxvYWRlZC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlclVubG9hZGVkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJVbmxvYWRlZC5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG5cbiAgICBhZGRTaWxlbnRSZW5ld0Vycm9yKGNiKSB7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3RXJyb3IuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZVNpbGVudFJlbmV3RXJyb3IoY2IpIHtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdFcnJvci5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgX3JhaXNlU2lsZW50UmVuZXdFcnJvcihlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLl9yYWlzZVNpbGVudFJlbmV3RXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdFcnJvci5yYWlzZShlKTtcbiAgICB9XG5cbiAgICBhZGRVc2VyU2lnbmVkSW4oY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZEluLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVVc2VyU2lnbmVkSW4oY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZEluLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICBfcmFpc2VVc2VyU2lnbmVkSW4oKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLl9yYWlzZVVzZXJTaWduZWRJblwiKTtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZEluLnJhaXNlKCk7XG4gICAgfVxuXG4gICAgYWRkVXNlclNpZ25lZE91dChjYikge1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkT3V0LmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVVc2VyU2lnbmVkT3V0KGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRPdXQucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuICAgIF9yYWlzZVVzZXJTaWduZWRPdXQoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLl9yYWlzZVVzZXJTaWduZWRPdXRcIik7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRPdXQucmFpc2UoKTtcbiAgICB9XG5cbiAgICBhZGRVc2VyU2Vzc2lvbkNoYW5nZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNlc3Npb25DaGFuZ2VkLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVVc2VyU2Vzc2lvbkNoYW5nZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNlc3Npb25DaGFuZ2VkLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICBfcmFpc2VVc2VyU2Vzc2lvbkNoYW5nZWQoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLl9yYWlzZVVzZXJTZXNzaW9uQ2hhbmdlZFwiKTtcbiAgICAgICAgdGhpcy5fdXNlclNlc3Npb25DaGFuZ2VkLnJhaXNlKCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudFNldHRpbmdzIH0gZnJvbSAnLi9PaWRjQ2xpZW50U2V0dGluZ3MuanMnO1xuaW1wb3J0IHsgUmVkaXJlY3ROYXZpZ2F0b3IgfSBmcm9tICcuL1JlZGlyZWN0TmF2aWdhdG9yLmpzJztcbmltcG9ydCB7IFBvcHVwTmF2aWdhdG9yIH0gZnJvbSAnLi9Qb3B1cE5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBJRnJhbWVOYXZpZ2F0b3IgfSBmcm9tICcuL0lGcmFtZU5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBXZWJTdG9yYWdlU3RhdGVTdG9yZSB9IGZyb20gJy4vV2ViU3RvcmFnZVN0YXRlU3RvcmUuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0IHsgU2lnbmluUmVxdWVzdCB9IGZyb20gJy4vU2lnbmluUmVxdWVzdC5qcyc7XG5cbmNvbnN0IERlZmF1bHRBY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IDYwO1xuY29uc3QgRGVmYXVsdENoZWNrU2Vzc2lvbkludGVydmFsID0gMjAwMDtcblxuZXhwb3J0IGNsYXNzIFVzZXJNYW5hZ2VyU2V0dGluZ3MgZXh0ZW5kcyBPaWRjQ2xpZW50U2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgcG9wdXBfcmVkaXJlY3RfdXJpLFxuICAgICAgICBwb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmksXG4gICAgICAgIHBvcHVwV2luZG93RmVhdHVyZXMsXG4gICAgICAgIHBvcHVwV2luZG93VGFyZ2V0LFxuICAgICAgICBzaWxlbnRfcmVkaXJlY3RfdXJpLFxuICAgICAgICBzaWxlbnRSZXF1ZXN0VGltZW91dCxcbiAgICAgICAgYXV0b21hdGljU2lsZW50UmVuZXcgPSBmYWxzZSxcbiAgICAgICAgdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3ID0gZmFsc2UsXG4gICAgICAgIGluY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyA9IHRydWUsXG4gICAgICAgIG1vbml0b3JTZXNzaW9uID0gdHJ1ZSxcbiAgICAgICAgbW9uaXRvckFub255bW91c1Nlc3Npb24gPSBmYWxzZSxcbiAgICAgICAgY2hlY2tTZXNzaW9uSW50ZXJ2YWwgPSBEZWZhdWx0Q2hlY2tTZXNzaW9uSW50ZXJ2YWwsXG4gICAgICAgIHN0b3BDaGVja1Nlc3Npb25PbkVycm9yID0gdHJ1ZSxcbiAgICAgICAgcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUsXG4gICAgICAgIHJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0ID0gZmFsc2UsXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lID0gRGVmYXVsdEFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lLFxuICAgICAgICByZWRpcmVjdE5hdmlnYXRvciA9IG5ldyBSZWRpcmVjdE5hdmlnYXRvcigpLFxuICAgICAgICBwb3B1cE5hdmlnYXRvciA9IG5ldyBQb3B1cE5hdmlnYXRvcigpLFxuICAgICAgICBpZnJhbWVOYXZpZ2F0b3IgPSBuZXcgSUZyYW1lTmF2aWdhdG9yKCksXG4gICAgICAgIHVzZXJTdG9yZSA9IG5ldyBXZWJTdG9yYWdlU3RhdGVTdG9yZSh7IHN0b3JlOiBHbG9iYWwuc2Vzc2lvblN0b3JhZ2UgfSlcbiAgICB9ID0ge30pIHtcbiAgICAgICAgc3VwZXIoYXJndW1lbnRzWzBdKTtcblxuICAgICAgICB0aGlzLl9wb3B1cF9yZWRpcmVjdF91cmkgPSBwb3B1cF9yZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX3BvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSA9IHBvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fcG9wdXBXaW5kb3dGZWF0dXJlcyA9IHBvcHVwV2luZG93RmVhdHVyZXM7XG4gICAgICAgIHRoaXMuX3BvcHVwV2luZG93VGFyZ2V0ID0gcG9wdXBXaW5kb3dUYXJnZXQ7XG5cbiAgICAgICAgdGhpcy5fc2lsZW50X3JlZGlyZWN0X3VyaSA9IHNpbGVudF9yZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlcXVlc3RUaW1lb3V0ID0gc2lsZW50UmVxdWVzdFRpbWVvdXQ7XG4gICAgICAgIHRoaXMuX2F1dG9tYXRpY1NpbGVudFJlbmV3ID0gYXV0b21hdGljU2lsZW50UmVuZXc7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldyA9IHZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldztcbiAgICAgICAgdGhpcy5faW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3ID0gaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3O1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IGFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lO1xuXG4gICAgICAgIHRoaXMuX21vbml0b3JTZXNzaW9uID0gbW9uaXRvclNlc3Npb247XG4gICAgICAgIHRoaXMuX21vbml0b3JBbm9ueW1vdXNTZXNzaW9uID0gbW9uaXRvckFub255bW91c1Nlc3Npb247XG4gICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbkludGVydmFsID0gY2hlY2tTZXNzaW9uSW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yID0gc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3I7XG4gICAgICAgIGlmIChxdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUgPSBxdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAoYXJndW1lbnRzWzBdICYmIGFyZ3VtZW50c1swXS5yZXNwb25zZV90eXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSA9IFNpZ25pblJlcXVlc3QuaXNPaWRjKGFyZ3VtZW50c1swXS5yZXNwb25zZV90eXBlKSA/IFwiaWRfdG9rZW5cIiA6IFwiY29kZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUgPSBcImlkX3Rva2VuXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQgPSByZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dDtcblxuICAgICAgICB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvciA9IHJlZGlyZWN0TmF2aWdhdG9yO1xuICAgICAgICB0aGlzLl9wb3B1cE5hdmlnYXRvciA9IHBvcHVwTmF2aWdhdG9yO1xuICAgICAgICB0aGlzLl9pZnJhbWVOYXZpZ2F0b3IgPSBpZnJhbWVOYXZpZ2F0b3I7XG5cbiAgICAgICAgdGhpcy5fdXNlclN0b3JlID0gdXNlclN0b3JlO1xuICAgIH1cblxuICAgIGdldCBwb3B1cF9yZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3B1cF9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBwb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBwb3B1cFdpbmRvd0ZlYXR1cmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBXaW5kb3dGZWF0dXJlcztcbiAgICB9XG4gICAgZ2V0IHBvcHVwV2luZG93VGFyZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBXaW5kb3dUYXJnZXQ7XG4gICAgfVxuXG4gICAgZ2V0IHNpbGVudF9yZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWxlbnRfcmVkaXJlY3RfdXJpO1xuICAgIH1cbiAgICAgZ2V0IHNpbGVudFJlcXVlc3RUaW1lb3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lsZW50UmVxdWVzdFRpbWVvdXQ7XG4gICAgfVxuICAgIGdldCBhdXRvbWF0aWNTaWxlbnRSZW5ldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9tYXRpY1NpbGVudFJlbmV3O1xuICAgIH1cbiAgICBnZXQgdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3O1xuICAgIH1cbiAgICBnZXQgaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3O1xuICAgIH1cbiAgICBnZXQgYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZTtcbiAgICB9XG5cbiAgICBnZXQgbW9uaXRvclNlc3Npb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb25pdG9yU2Vzc2lvbjtcbiAgICB9XG4gICAgZ2V0IG1vbml0b3JBbm9ueW1vdXNTZXNzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvckFub255bW91c1Nlc3Npb247XG4gICAgfVxuICAgIGdldCBjaGVja1Nlc3Npb25JbnRlcnZhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrU2Vzc2lvbkludGVydmFsO1xuICAgIH1cbiAgICBnZXQgc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yO1xuICAgIH1cbiAgICBnZXQgcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlO1xuICAgIH1cbiAgICBnZXQgcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dDtcbiAgICB9XG5cbiAgICBnZXQgcmVkaXJlY3ROYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvcjtcbiAgICB9XG4gICAgZ2V0IHBvcHVwTmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBOYXZpZ2F0b3I7XG4gICAgfVxuICAgIGdldCBpZnJhbWVOYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZnJhbWVOYXZpZ2F0b3I7XG4gICAgfVxuXG4gICAgZ2V0IHVzZXJTdG9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTdG9yZTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBXZWJTdG9yYWdlU3RhdGVTdG9yZSB7XG4gICAgY29uc3RydWN0b3Ioe3ByZWZpeCA9IFwib2lkYy5cIiwgc3RvcmUgPSBHbG9iYWwubG9jYWxTdG9yYWdlfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XG4gICAgICAgIHRoaXMuX3ByZWZpeCA9IHByZWZpeDtcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJXZWJTdG9yYWdlU3RhdGVTdG9yZS5zZXRcIiwga2V5KTtcblxuICAgICAgICBrZXkgPSB0aGlzLl9wcmVmaXggKyBrZXk7XG5cbiAgICAgICAgdGhpcy5fc3RvcmUuc2V0SXRlbShrZXksIHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBMb2cuZGVidWcoXCJXZWJTdG9yYWdlU3RhdGVTdG9yZS5nZXRcIiwga2V5KTtcblxuICAgICAgICBrZXkgPSB0aGlzLl9wcmVmaXggKyBrZXk7XG5cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9zdG9yZS5nZXRJdGVtKGtleSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpdGVtKTtcbiAgICB9XG5cbiAgICByZW1vdmUoa2V5KSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIldlYlN0b3JhZ2VTdGF0ZVN0b3JlLnJlbW92ZVwiLCBrZXkpO1xuXG4gICAgICAgIGtleSA9IHRoaXMuX3ByZWZpeCArIGtleTtcblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX3N0b3JlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgdGhpcy5fc3RvcmUucmVtb3ZlSXRlbShrZXkpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaXRlbSk7XG4gICAgfVxuXG4gICAgZ2V0QWxsS2V5cygpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiV2ViU3RvcmFnZVN0YXRlU3RvcmUuZ2V0QWxsS2V5c1wiKTtcblxuICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9zdG9yZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLl9zdG9yZS5rZXkoaW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAoa2V5LmluZGV4T2YodGhpcy5fcHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkuc3Vic3RyKHRoaXMuX3ByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5cyk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgUkZDNDEyMiB2ZXJzaW9uIDQgZ3VpZCAoKVxuICovXG5cbnZhciBjcnlwdG8gPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKSA6IG51bGw7XG5cbmZ1bmN0aW9uIF9jcnlwdG9VdWlkdjQoKSB7XG4gIHJldHVybiAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csIGMgPT5cbiAgICAoYyBeIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgMTUgPj4gYyAvIDQpLnRvU3RyaW5nKDE2KVxuICApXG59XG5cbmZ1bmN0aW9uIF91dWlkdjQoKSB7XG4gICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZywgYyA9PlxuICAgIChjIF4gTWF0aC5yYW5kb20oKSAqIDE2ID4+IGMgLyA0KS50b1N0cmluZygxNilcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb20oKSB7XG4gIHZhciBoYXNDcnlwdG8gPSBjcnlwdG8gIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvICE9PSBudWxsO1xuICB2YXIgaGFzUmFuZG9tVmFsdWVzID0gaGFzQ3J5cHRvICYmICh0eXBlb2YoY3J5cHRvLmdldFJhbmRvbVZhbHVlcykgIT0gJ3VuZGVmaW5lZCcpOyAgXG4gIHZhciB1dWlkID0gaGFzUmFuZG9tVmFsdWVzID8gX2NyeXB0b1V1aWR2NCA6IF91dWlkdjQ7XG4gIHJldHVybiB1dWlkKCkucmVwbGFjZSgvLS9nLCAnJyk7XG59XG4iLCJjb25zdCBWZXJzaW9uID0gXCIxLjExLjVcIjsgZXhwb3J0IHtWZXJzaW9ufTsiLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9