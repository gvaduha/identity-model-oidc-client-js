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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2VuYy1iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9lbmMtaGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMjU2LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMzg0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhNTEyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMveDY0LWNvcmUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQWNjZXNzVG9rZW5FdmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrU2Vzc2lvbklGcmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2xvY2tTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9Db3Jkb3ZhSUZyYW1lTmF2aWdhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9Db3Jkb3ZhUG9wdXBOYXZpZ2F0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvcmRvdmFQb3B1cFdpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3JSZXNwb25zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSUZyYW1lTmF2aWdhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9JRnJhbWVXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0luTWVtb3J5V2ViU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSm9zZVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0pzb25TZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9Mb2cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01ldGFkYXRhU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvT2lkY0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvT2lkY0NsaWVudFNldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9Qb3B1cE5hdmlnYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUG9wdXBXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlZGlyZWN0TmF2aWdhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9SZXNwb25zZVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2Vzc2lvbk1vbml0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NpZ25pblJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NpZ25pblJlc3BvbnNlLmpzIiwid2VicGFjazovLy8uL3NyYy9TaWduaW5TdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2lnbm91dFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NpZ25vdXRSZXNwb25zZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2lsZW50UmVuZXdTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9TdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGltZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Rva2VuQ2xpZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9Ub2tlblJldm9jYXRpb25DbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VybFV0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VzZXJJbmZvU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVXNlck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VzZXJNYW5hZ2VyRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9Vc2VyTWFuYWdlclNldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9XZWJTdG9yYWdlU3RhdGVTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmFuZG9tLmpzIiwid2VicGFjazovLy8uL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vL2NyeXB0byAoaWdub3JlZCkiXSwibmFtZXMiOlsiVmVyc2lvbiIsIkxvZyIsIk9pZGNDbGllbnQiLCJPaWRjQ2xpZW50U2V0dGluZ3MiLCJXZWJTdG9yYWdlU3RhdGVTdG9yZSIsIkluTWVtb3J5V2ViU3RvcmFnZSIsIlVzZXJNYW5hZ2VyIiwiQWNjZXNzVG9rZW5FdmVudHMiLCJNZXRhZGF0YVNlcnZpY2UiLCJDb3Jkb3ZhUG9wdXBOYXZpZ2F0b3IiLCJDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yIiwiQ2hlY2tTZXNzaW9uSUZyYW1lIiwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50IiwiU2Vzc2lvbk1vbml0b3IiLCJHbG9iYWwiLCJVc2VyIiwiRGVmYXVsdEFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lIiwiYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUiLCJhY2Nlc3NUb2tlbkV4cGlyaW5nVGltZXIiLCJUaW1lciIsImFjY2Vzc1Rva2VuRXhwaXJlZFRpbWVyIiwiX2FjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lIiwiX2FjY2Vzc1Rva2VuRXhwaXJpbmciLCJfYWNjZXNzVG9rZW5FeHBpcmVkIiwibG9hZCIsImNvbnRhaW5lciIsImFjY2Vzc190b2tlbiIsImV4cGlyZXNfaW4iLCJ1bmRlZmluZWQiLCJkdXJhdGlvbiIsImRlYnVnIiwiZXhwaXJpbmciLCJpbml0IiwiY2FuY2VsIiwiZXhwaXJlZCIsInVubG9hZCIsImFkZEFjY2Vzc1Rva2VuRXhwaXJpbmciLCJjYiIsImFkZEhhbmRsZXIiLCJyZW1vdmVBY2Nlc3NUb2tlbkV4cGlyaW5nIiwicmVtb3ZlSGFuZGxlciIsImFkZEFjY2Vzc1Rva2VuRXhwaXJlZCIsInJlbW92ZUFjY2Vzc1Rva2VuRXhwaXJlZCIsIkRlZmF1bHRJbnRlcnZhbCIsImNhbGxiYWNrIiwiY2xpZW50X2lkIiwidXJsIiwiaW50ZXJ2YWwiLCJzdG9wT25FcnJvciIsIl9jYWxsYmFjayIsIl9jbGllbnRfaWQiLCJfdXJsIiwiX2ludGVydmFsIiwiX3N0b3BPbkVycm9yIiwiaWR4IiwiaW5kZXhPZiIsIl9mcmFtZV9vcmlnaW4iLCJzdWJzdHIiLCJfZnJhbWUiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJwb3NpdGlvbiIsImRpc3BsYXkiLCJ3aWR0aCIsImhlaWdodCIsInNyYyIsIlByb21pc2UiLCJyZXNvbHZlIiwib25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiX2JvdW5kTWVzc2FnZUV2ZW50IiwiX21lc3NhZ2UiLCJiaW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJvcmlnaW4iLCJzb3VyY2UiLCJjb250ZW50V2luZG93IiwiZGF0YSIsImVycm9yIiwic3RvcCIsInN0YXJ0Iiwic2Vzc2lvbl9zdGF0ZSIsIl9zZXNzaW9uX3N0YXRlIiwic2VuZCIsInBvc3RNZXNzYWdlIiwiX3RpbWVyIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiQ2xvY2tTZXJ2aWNlIiwiZ2V0RXBvY2hUaW1lIiwiRGF0ZSIsIm5vdyIsInByZXBhcmUiLCJwYXJhbXMiLCJwb3B1cFdpbmRvd0ZlYXR1cmVzIiwicG9wdXAiLCJDb3Jkb3ZhUG9wdXBXaW5kb3ciLCJEZWZhdWx0UG9wdXBGZWF0dXJlcyIsIkRlZmF1bHRQb3B1cFRhcmdldCIsIl9wcm9taXNlIiwicmVqZWN0IiwiX3Jlc29sdmUiLCJfcmVqZWN0IiwiZmVhdHVyZXMiLCJ0YXJnZXQiLCJwb3B1cFdpbmRvd1RhcmdldCIsInJlZGlyZWN0X3VyaSIsInN0YXJ0VXJsIiwiX2lzSW5BcHBCcm93c2VySW5zdGFsbGVkIiwiY29yZG92YU1ldGFkYXRhIiwic29tZSIsIm5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hdmlnYXRlIiwiX2Vycm9yIiwiY29yZG92YSIsInJlcXVpcmUiLCJtZXRhZGF0YSIsIl9wb3B1cCIsIkluQXBwQnJvd3NlciIsIm9wZW4iLCJfZXhpdENhbGxiYWNrRXZlbnQiLCJfZXhpdENhbGxiYWNrIiwiX2xvYWRTdGFydENhbGxiYWNrRXZlbnQiLCJfbG9hZFN0YXJ0Q2FsbGJhY2siLCJwcm9taXNlIiwiZXZlbnQiLCJfc3VjY2VzcyIsIm1lc3NhZ2UiLCJfY2xlYW51cCIsIkVycm9yIiwiY2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiRXJyb3JSZXNwb25zZSIsImVycm9yX2Rlc2NyaXB0aW9uIiwiZXJyb3JfdXJpIiwic3RhdGUiLCJFdmVudCIsIl9uYW1lIiwiX2NhbGxiYWNrcyIsInB1c2giLCJmaW5kSW5kZXgiLCJpdGVtIiwic3BsaWNlIiwicmFpc2UiLCJpIiwibGVuZ3RoIiwidGltZXIiLCJoYW5kbGUiLCJ0ZXN0aW5nIiwicmVxdWVzdCIsIl90ZXN0aW5nIiwic2V0WE1MSHR0cFJlcXVlc3QiLCJuZXdSZXF1ZXN0IiwibG9jYXRpb24iLCJsb2NhbFN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsIlhNTEh0dHBSZXF1ZXN0IiwiSUZyYW1lTmF2aWdhdG9yIiwiZnJhbWUiLCJJRnJhbWVXaW5kb3ciLCJub3RpZnlQYXJlbnQiLCJEZWZhdWx0VGltZW91dCIsInRpbWVvdXQiLCJzaWxlbnRSZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJfdGltZW91dCIsImNsZWFyVGltZW91dCIsInJlbW92ZUNoaWxkIiwiX29yaWdpbiIsInN0YXJ0c1dpdGgiLCJocmVmIiwicGFyZW50IiwicHJvdG9jb2wiLCJob3N0IiwiX2RhdGEiLCJnZXRJdGVtIiwia2V5Iiwic2V0SXRlbSIsInZhbHVlIiwicmVtb3ZlSXRlbSIsImluZGV4IiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIkFsbG93ZWRTaWduaW5nQWxncyIsIkhhc2hlcnMiLCJzaGEyNTYiLCJTSEEyNTYiLCJzaGEzODQiLCJTSEEzODQiLCJzaGE1MTIiLCJTSEE1MTIiLCJiNjRUb0J5dGVzIiwicyIsInJlcGxhY2UiLCJ1dGY4RGVjb2RlIiwiYnl0ZXMiLCJlc2NhcGVkIiwidG9TdHJpbmciLCJzbGljZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImI2NHVUb0pzb24iLCJKU09OIiwicGFyc2UiLCJhc2NpaVRvQnl0ZXMiLCJvdXQiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsImdldFN1YnRsZSIsImMiLCJjcnlwdG8iLCJnbG9iYWxUaGlzIiwiZ2xvYmFsIiwic3VidGxlIiwicmVhZFRsdiIsIm9mZnNldCIsInRhZyIsImxlbiIsIm4iLCJlbmQiLCJzcGtpRnJvbUNlcnRpZmljYXRlIiwiZGVyIiwiY2VydCIsInRicyIsInBvcyIsImVsIiwicmVzb2x2ZUtleSIsImt0eSIsImZvcm1hdCIsImV4dCIsIng1YyIsImNydiIsIngiLCJ5IiwiYWxnUGFyYW1zIiwiYWxnIiwiYml0cyIsImhhc2giLCJpbXBvcnRBbGciLCJ2ZXJpZnlBbGciLCJzYWx0TGVuZ3RoIiwicGFyc2VJbnQiLCJjdXJ2ZSIsIm5hbWVkQ3VydmUiLCJKb3NlVXRpbCIsInBhcnNlSnd0Iiwiand0IiwicGFydHMiLCJzcGxpdCIsImhlYWRlciIsInBheWxvYWQiLCJ2YWxpZGF0ZUp3dCIsImlzc3VlciIsImF1ZGllbmNlIiwiY2xvY2tTa2V3IiwidGltZUluc2Vuc2l0aXZlIiwicmVzb2x2ZWQiLCJ2YWxpZGF0ZUp3dEF0dHJpYnV0ZXMiLCJ0aGVuIiwiX3ZlcmlmeVNpZ25hdHVyZSIsInZhbGlkIiwicCIsInNpZ25hdHVyZSIsImltcG9ydEtleSIsInZlcmlmeSIsImNyeXB0b0tleSIsInBhcnNlZCIsImlzcyIsImF1ZCIsInZhbGlkQXVkaWVuY2UiLCJBcnJheSIsImlzQXJyYXkiLCJhenAiLCJsb3dlck5vdyIsInVwcGVyTm93IiwiaWF0IiwibmJmIiwiZXhwIiwiaGFzaFN0cmluZyIsImhhc2hlciIsIlN0cmluZyIsInRvTG93ZXJDYXNlIiwiSGV4IiwiaGV4VG9CYXNlNjRVcmwiLCJCYXNlNjQiLCJzdHJpbmdpZnkiLCJKc29uU2VydmljZSIsImFkZGl0aW9uYWxDb250ZW50VHlwZXMiLCJYTUxIdHRwUmVxdWVzdEN0b3IiLCJqd3RIYW5kbGVyIiwiX2NvbnRlbnRUeXBlcyIsIl9YTUxIdHRwUmVxdWVzdCIsIl9qd3RIYW5kbGVyIiwiZ2V0SnNvbiIsInRva2VuIiwicmVxIiwiYWxsb3dlZENvbnRlbnRUeXBlcyIsInN0YXR1cyIsImNvbnRlbnRUeXBlIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJmb3VuZCIsImZpbmQiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0Iiwib25lcnJvciIsInNldFJlcXVlc3RIZWFkZXIiLCJwb3N0Rm9ybSIsImJhc2ljQXV0aCIsImVuY29kZVVSSUNvbXBvbmVudCIsImJ0b2EiLCJub3BMb2dnZXIiLCJpbmZvIiwid2FybiIsIk5PTkUiLCJFUlJPUiIsIldBUk4iLCJJTkZPIiwiREVCVUciLCJsb2dnZXIiLCJsZXZlbCIsInJlc2V0IiwiYXJncyIsImFwcGx5IiwiZnJvbSIsIk9pZGNNZXRhZGF0YVVybFBhdGgiLCJzZXR0aW5ncyIsIkpzb25TZXJ2aWNlQ3RvciIsIl9zZXR0aW5ncyIsIl9qc29uU2VydmljZSIsInJlc2V0U2lnbmluZ0tleXMiLCJzaWduaW5nS2V5cyIsImdldE1ldGFkYXRhIiwibWV0YWRhdGFVcmwiLCJzZWVkIiwibWV0YWRhdGFTZWVkIiwiYXNzaWduIiwiZ2V0SXNzdWVyIiwiX2dldE1ldGFkYXRhUHJvcGVydHkiLCJnZXRBdXRob3JpemF0aW9uRW5kcG9pbnQiLCJnZXRVc2VySW5mb0VuZHBvaW50IiwiZ2V0VG9rZW5FbmRwb2ludCIsIm9wdGlvbmFsIiwiZ2V0Q2hlY2tTZXNzaW9uSWZyYW1lIiwiZ2V0RW5kU2Vzc2lvbkVuZHBvaW50IiwiZ2V0UmV2b2NhdGlvbkVuZHBvaW50IiwiZ2V0S2V5c0VuZHBvaW50IiwiZ2V0U2lnbmluZ0tleXMiLCJqd2tzX3VyaSIsImtleVNldCIsImtleXMiLCJfbWV0YWRhdGFVcmwiLCJhdXRob3JpdHkiLCJjcmVhdGVTaWduaW5SZXF1ZXN0IiwicmVzcG9uc2VfdHlwZSIsInNjb3BlIiwicHJvbXB0IiwibWF4X2FnZSIsInVpX2xvY2FsZXMiLCJpZF90b2tlbl9oaW50IiwibG9naW5faGludCIsImFjcl92YWx1ZXMiLCJyZXNvdXJjZSIsInJlcXVlc3RfdXJpIiwicmVzcG9uc2VfbW9kZSIsImV4dHJhUXVlcnlQYXJhbXMiLCJleHRyYVRva2VuUGFyYW1zIiwicmVxdWVzdF90eXBlIiwic2tpcFVzZXJJbmZvIiwic3RhdGVTdG9yZSIsIlNpZ25pblJlcXVlc3QiLCJpc0NvZGUiLCJfbWV0YWRhdGFTZXJ2aWNlIiwic2lnbmluUmVxdWVzdCIsImNsaWVudF9zZWNyZXQiLCJzaWduaW5TdGF0ZSIsIl9zdGF0ZVN0b3JlIiwic2V0IiwiaWQiLCJ0b1N0b3JhZ2VTdHJpbmciLCJyZWFkU2lnbmluUmVzcG9uc2VTdGF0ZSIsInJlbW92ZVN0YXRlIiwidXNlUXVlcnkiLCJkZWxpbWl0ZXIiLCJyZXNwb25zZSIsIlNpZ25pblJlc3BvbnNlIiwic3RhdGVBcGkiLCJyZW1vdmUiLCJnZXQiLCJzdG9yZWRTdGF0ZVN0cmluZyIsIlNpZ25pblN0YXRlIiwiZnJvbVN0b3JhZ2VTdHJpbmciLCJwcm9jZXNzU2lnbmluUmVzcG9uc2UiLCJfdmFsaWRhdG9yIiwidmFsaWRhdGVTaWduaW5SZXNwb25zZSIsImNyZWF0ZVNpZ25vdXRSZXF1ZXN0IiwicG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIiwiU2lnbm91dFJlcXVlc3QiLCJzaWdub3V0U3RhdGUiLCJyZWFkU2lnbm91dFJlc3BvbnNlU3RhdGUiLCJTaWdub3V0UmVzcG9uc2UiLCJzdGF0ZUtleSIsIlN0YXRlIiwicHJvY2Vzc1NpZ25vdXRSZXNwb25zZSIsInZhbGlkYXRlU2lnbm91dFJlc3BvbnNlIiwiY2xlYXJTdGFsZVN0YXRlIiwic3RhbGVTdGF0ZUFnZSIsInZhbGlkYXRvciIsIm1ldGFkYXRhU2VydmljZSIsIkRlZmF1bHRSZXNwb25zZVR5cGUiLCJEZWZhdWx0U2NvcGUiLCJEZWZhdWx0Q2xpZW50QXV0aGVudGljYXRpb24iLCJEZWZhdWx0U3RhbGVTdGF0ZUFnZSIsIkRlZmF1bHRDbG9ja1NrZXdJblNlY29uZHMiLCJjbGllbnRfYXV0aGVudGljYXRpb24iLCJmaWx0ZXJQcm90b2NvbENsYWltcyIsImxvYWRVc2VySW5mbyIsImNsb2NrU2VydmljZSIsInVzZXJJbmZvSnd0SXNzdWVyIiwibWVyZ2VDbGFpbXMiLCJSZXNwb25zZVZhbGlkYXRvckN0b3IiLCJSZXNwb25zZVZhbGlkYXRvciIsIk1ldGFkYXRhU2VydmljZUN0b3IiLCJfYXV0aG9yaXR5IiwiX21ldGFkYXRhIiwiX21ldGFkYXRhU2VlZCIsIl9zaWduaW5nS2V5cyIsIl9jbGllbnRfc2VjcmV0IiwiX3Jlc3BvbnNlX3R5cGUiLCJfc2NvcGUiLCJfcmVkaXJlY3RfdXJpIiwiX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsIl9jbGllbnRfYXV0aGVudGljYXRpb24iLCJfcHJvbXB0IiwiX2Rpc3BsYXkiLCJfbWF4X2FnZSIsIl91aV9sb2NhbGVzIiwiX2Fjcl92YWx1ZXMiLCJfcmVzb3VyY2UiLCJfcmVzcG9uc2VfbW9kZSIsIl9maWx0ZXJQcm90b2NvbENsYWltcyIsIl9sb2FkVXNlckluZm8iLCJfc3RhbGVTdGF0ZUFnZSIsIl9jbG9ja1NrZXciLCJfY2xvY2tTZXJ2aWNlIiwiX3VzZXJJbmZvSnd0SXNzdWVyIiwiX21lcmdlQ2xhaW1zIiwiX2V4dHJhUXVlcnlQYXJhbXMiLCJfZXh0cmFUb2tlblBhcmFtcyIsIlBvcHVwTmF2aWdhdG9yIiwiUG9wdXBXaW5kb3ciLCJrZWVwT3BlbiIsIm5vdGlmeU9wZW5lciIsIkNoZWNrRm9yUG9wdXBDbG9zZWRJbnRlcnZhbCIsIl9jaGVja0ZvclBvcHVwQ2xvc2VkVGltZXIiLCJfY2hlY2tGb3JQb3B1cENsb3NlZCIsIl9pZCIsImZvY3VzIiwiY2xvc2VkIiwib3BlbmVyIiwiVXJsVXRpbGl0eSIsInBhcnNlVXJsRnJhZ21lbnQiLCJSZWRpcmVjdE5hdmlnYXRvciIsInVzZVJlcGxhY2VUb05hdmlnYXRlIiwiUHJvdG9jb2xDbGFpbXMiLCJVc2VySW5mb1NlcnZpY2VDdG9yIiwiVXNlckluZm9TZXJ2aWNlIiwiam9zZVV0aWwiLCJUb2tlbkNsaWVudEN0b3IiLCJUb2tlbkNsaWVudCIsIl91c2VySW5mb1NlcnZpY2UiLCJfam9zZVV0aWwiLCJfdG9rZW5DbGllbnQiLCJfcHJvY2Vzc1NpZ25pblBhcmFtcyIsIl92YWxpZGF0ZVRva2VucyIsIl9wcm9jZXNzQ2xhaW1zIiwibm9uY2UiLCJpZF90b2tlbiIsImNvZGVfdmVyaWZpZXIiLCJjb2RlIiwiaXNPcGVuSWRDb25uZWN0IiwicHJvZmlsZSIsImdldENsYWltcyIsImNsYWltcyIsInN1YiIsImNsYWltczEiLCJjbGFpbXMyIiwicmVzdWx0IiwidmFsdWVzIiwiZm9yRWFjaCIsInR5cGUiLCJfcHJvY2Vzc0NvZGUiLCJfdmFsaWRhdGVJZFRva2VuQW5kQWNjZXNzVG9rZW4iLCJfdmFsaWRhdGVJZFRva2VuIiwiZXhjaGFuZ2VDb2RlIiwidG9rZW5SZXNwb25zZSIsIl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzIiwiY2xvY2tTa2V3SW5TZWNvbmRzIiwiX3ZhbGlkYXRlQWNjZXNzVG9rZW4iLCJfZ2V0U2lnbmluZ0tleUZvckp3dCIsImtpZCIsIl9maWx0ZXJCeUFsZyIsImZpbHRlciIsIl9nZXRTaWduaW5nS2V5Rm9ySnd0V2l0aFNpbmdsZVJldHJ5IiwiYXRfaGFzaCIsImhhc2hBbGciLCJoYXNoQml0cyIsInNoYSIsImxlZnQiLCJsZWZ0X2I2NHUiLCJ1c2VyTWFuYWdlciIsIkNoZWNrU2Vzc2lvbklGcmFtZUN0b3IiLCJfdXNlck1hbmFnZXIiLCJfQ2hlY2tTZXNzaW9uSUZyYW1lQ3RvciIsImV2ZW50cyIsImFkZFVzZXJMb2FkZWQiLCJfc3RhcnQiLCJhZGRVc2VyVW5sb2FkZWQiLCJfc3RvcCIsImdldFVzZXIiLCJ1c2VyIiwibW9uaXRvckFub255bW91c1Nlc3Npb24iLCJxdWVyeVNlc3Npb25TdGF0dXMiLCJ0bXBVc2VyIiwic2Vzc2lvbiIsInNpZCIsImNhdGNoIiwiZXJyIiwiX3N1YiIsIl9zaWQiLCJfY2hlY2tTZXNzaW9uSUZyYW1lIiwiX2NoZWNrU2Vzc2lvbkludGVydmFsIiwiX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yIiwidGltZXJIYW5kbGUiLCJyYWlzZUV2ZW50IiwiX3JhaXNlVXNlclNlc3Npb25DaGFuZ2VkIiwiX3JhaXNlVXNlclNpZ25lZE91dCIsIl9yYWlzZVVzZXJTaWduZWRJbiIsImNoZWNrU2Vzc2lvbkludGVydmFsIiwic3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IiLCJvaWRjIiwiaXNPaWRjIiwiYWRkUXVlcnlQYXJhbSIsImNvZGVfY2hhbGxlbmdlIiwiaXNPQXV0aCIsIk9pZGNTY29wZSIsInRva2VuX3R5cGUiLCJleHBpcmVzX2F0Iiwic2NvcGVzIiwiYXJndW1lbnRzIiwiX25vbmNlIiwiX2NvZGVfdmVyaWZpZXIiLCJfY29kZV9jaGFsbGVuZ2UiLCJfc2tpcFVzZXJJbmZvIiwiY3JlYXRlZCIsInN0b3JhZ2VTdHJpbmciLCJTaWxlbnRSZW5ld1NlcnZpY2UiLCJfdG9rZW5FeHBpcmluZyIsInNpZ25pblNpbGVudCIsIl9yYWlzZVNpbGVudFJlbmV3RXJyb3IiLCJfY3JlYXRlZCIsIl9yZXF1ZXN0X3R5cGUiLCJzdG9yYWdlIiwiYWdlIiwiY3V0b2ZmIiwiZ2V0QWxsS2V5cyIsInByb21pc2VzIiwiYWxsIiwiVGltZXJEdXJhdGlvbiIsIm5vd0Z1bmMiLCJfbm93RnVuYyIsImV4cGlyYXRpb24iLCJfdGltZXJIYW5kbGUiLCJfZXhwaXJhdGlvbiIsInRpbWVyRHVyYXRpb24iLCJkaWZmIiwiZ3JhbnRfdHlwZSIsImV4Y2hhbmdlUmVmcmVzaFRva2VuIiwicmVmcmVzaF90b2tlbiIsIkFjY2Vzc1Rva2VuVHlwZUhpbnQiLCJSZWZyZXNoVG9rZW5UeXBlSGludCIsIl9YTUxIdHRwUmVxdWVzdEN0b3IiLCJyZXZva2UiLCJyZXF1aXJlZCIsIl9yZXZva2UiLCJ4aHIiLCJsYXN0SW5kZXhPZiIsInJlZ2V4IiwibSIsImNvdW50ZXIiLCJleGVjIiwicHJvcCIsIl9nZXRDbGFpbXNGcm9tSnd0IiwiaXNzdWVyUHJvbWlzZSIsIlNpbGVudFJlbmV3U2VydmljZUN0b3IiLCJTZXNzaW9uTW9uaXRvckN0b3IiLCJUb2tlblJldm9jYXRpb25DbGllbnRDdG9yIiwiVXNlck1hbmFnZXJTZXR0aW5ncyIsIl9ldmVudHMiLCJVc2VyTWFuYWdlckV2ZW50cyIsIl9zaWxlbnRSZW5ld1NlcnZpY2UiLCJhdXRvbWF0aWNTaWxlbnRSZW5ldyIsInN0YXJ0U2lsZW50UmVuZXciLCJtb25pdG9yU2Vzc2lvbiIsIl9zZXNzaW9uTW9uaXRvciIsIl90b2tlblJldm9jYXRpb25DbGllbnQiLCJfbG9hZFVzZXIiLCJyZW1vdmVVc2VyIiwic3RvcmVVc2VyIiwic2lnbmluUmVkaXJlY3QiLCJuYXZQYXJhbXMiLCJfc2lnbmluU3RhcnQiLCJfcmVkaXJlY3ROYXZpZ2F0b3IiLCJzaWduaW5SZWRpcmVjdENhbGxiYWNrIiwiX3NpZ25pbkVuZCIsInNpZ25pblBvcHVwIiwicG9wdXBfcmVkaXJlY3RfdXJpIiwiX3NpZ25pbiIsIl9wb3B1cE5hdmlnYXRvciIsInNpZ25pblBvcHVwQ2FsbGJhY2siLCJfc2lnbmluQ2FsbGJhY2siLCJfdXNlUmVmcmVzaFRva2VuIiwiaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3IiwidmFsaWRhdGVTdWJPblNpbGVudFJlbmV3IiwiY3VycmVudF9zdWIiLCJfc2lnbmluU2lsZW50SWZyYW1lIiwiaWRUb2tlblZhbGlkYXRpb24iLCJfdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuIiwiYXV0aF90aW1lIiwic2lsZW50X3JlZGlyZWN0X3VyaSIsIl9pZnJhbWVOYXZpZ2F0b3IiLCJzaWduaW5TaWxlbnRDYWxsYmFjayIsInNpZ25pbkNhbGxiYWNrIiwic2lnbm91dENhbGxiYWNrIiwic2lnbm91dFJlZGlyZWN0Q2FsbGJhY2siLCJzaWdub3V0UG9wdXBDYWxsYmFjayIsInF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlIiwibmF2UmVzcG9uc2UiLCJzaWduaW5SZXNwb25zZSIsIm5hdmlnYXRvciIsIm5hdmlnYXRvclBhcmFtcyIsInNpZ25vdXRSZWRpcmVjdCIsInBvc3RMb2dvdXRSZWRpcmVjdFVyaSIsIl9zaWdub3V0U3RhcnQiLCJfc2lnbm91dEVuZCIsInNpZ25vdXRQb3B1cCIsInBvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsIl9zaWdub3V0IiwicmV2b2tlUHJvbWlzZSIsInJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0IiwiX3Jldm9rZUludGVybmFsIiwic2lnbm91dFJlcXVlc3QiLCJzaWdub3V0UmVzcG9uc2UiLCJyZXZva2VBY2Nlc3NUb2tlbiIsInN1Y2Nlc3MiLCJfcmV2b2tlQWNjZXNzVG9rZW5JbnRlcm5hbCIsIl9yZXZva2VSZWZyZXNoVG9rZW5JbnRlcm5hbCIsImF0U3VjY2VzcyIsInJ0U3VjY2VzcyIsInN0b3BTaWxlbnRSZW5ldyIsIl91c2VyU3RvcmUiLCJfdXNlclN0b3JlS2V5IiwicmVkaXJlY3ROYXZpZ2F0b3IiLCJwb3B1cE5hdmlnYXRvciIsImlmcmFtZU5hdmlnYXRvciIsInVzZXJTdG9yZSIsIl91c2VyTG9hZGVkIiwiX3VzZXJVbmxvYWRlZCIsIl9zaWxlbnRSZW5ld0Vycm9yIiwiX3VzZXJTaWduZWRJbiIsIl91c2VyU2lnbmVkT3V0IiwiX3VzZXJTZXNzaW9uQ2hhbmdlZCIsInJlbW92ZVVzZXJMb2FkZWQiLCJyZW1vdmVVc2VyVW5sb2FkZWQiLCJhZGRTaWxlbnRSZW5ld0Vycm9yIiwicmVtb3ZlU2lsZW50UmVuZXdFcnJvciIsImFkZFVzZXJTaWduZWRJbiIsInJlbW92ZVVzZXJTaWduZWRJbiIsImFkZFVzZXJTaWduZWRPdXQiLCJyZW1vdmVVc2VyU2lnbmVkT3V0IiwiYWRkVXNlclNlc3Npb25DaGFuZ2VkIiwicmVtb3ZlVXNlclNlc3Npb25DaGFuZ2VkIiwiRGVmYXVsdENoZWNrU2Vzc2lvbkludGVydmFsIiwic3RvcmUiLCJfcG9wdXBfcmVkaXJlY3RfdXJpIiwiX3BvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsIl9wb3B1cFdpbmRvd0ZlYXR1cmVzIiwiX3BvcHVwV2luZG93VGFyZ2V0IiwiX3NpbGVudF9yZWRpcmVjdF91cmkiLCJfc2lsZW50UmVxdWVzdFRpbWVvdXQiLCJfYXV0b21hdGljU2lsZW50UmVuZXciLCJfdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3IiwiX2luY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyIsIl9tb25pdG9yU2Vzc2lvbiIsIl9tb25pdG9yQW5vbnltb3VzU2Vzc2lvbiIsIl9xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSIsIl9yZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dCIsInByZWZpeCIsIl9zdG9yZSIsIl9wcmVmaXgiLCJyYW5kb20iLCJtc0NyeXB0byIsIl9jcnlwdG9VdWlkdjQiLCJnZXRSYW5kb21WYWx1ZXMiLCJfdXVpZHY0IiwiTWF0aCIsImhhc0NyeXB0byIsImhhc1JhbmRvbVZhbHVlcyIsInV1aWQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7O0FBRVY7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLGdCQUFn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WCxRQUFqRSxDQUEwRSxFQUExRSxDQURvRDtBQUFBLEdBQS9DLENBQVA7QUFHRDs7QUFFRCxTQUFTeWYsT0FBVCxHQUFtQjtBQUNmLFNBQU8sQ0FBQyxDQUFDLEdBQUQsSUFBTSxDQUFDLEdBQVAsR0FBVyxDQUFDLEdBQVosR0FBZ0IsQ0FBQyxHQUFqQixHQUFxQixDQUFDLElBQXZCLEVBQTZCN2YsT0FBN0IsQ0FBcUMsUUFBckMsRUFBK0M7QUFBQSxXQUN0RCxDQUFDZSxJQUFJK2UsS0FBS0wsTUFBTCxLQUFnQixFQUFoQixJQUFzQjFlLElBQUksQ0FBL0IsRUFBa0NYLFFBQWxDLENBQTJDLEVBQTNDLENBRHNEO0FBQUEsR0FBL0MsQ0FBUDtBQUdIOztBQUVjLFNBQVNxZixNQUFULEdBQWtCO0FBQy9CLE1BQUlNLFlBQVkvZSxVQUFVLFdBQVYsSUFBeUJBLFdBQVcsSUFBcEQ7QUFDQSxNQUFJZ2Ysa0JBQWtCRCxhQUFjLE9BQU8vZSxPQUFPNGUsZUFBZCxJQUFrQyxXQUF0RTtBQUNBLE1BQUlLLE9BQU9ELGtCQUFrQkwsYUFBbEIsR0FBa0NFLE9BQTdDO0FBQ0EsU0FBT0ksT0FBT2pnQixPQUFQLENBQWUsSUFBZixFQUFxQixFQUFyQixDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCRCxJQUFNdk0sVUFBVSxRQUFoQixDLFFBQWtDQSxPLEdBQUFBLE87Ozs7Ozs7Ozs7O0FDQWxDLGUiLCJmaWxlIjoib2lkYy1jbGllbnQucnNhMjU2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL3NyYy9Mb2cuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudCB9IGZyb20gJy4vc3JjL09pZGNDbGllbnQuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudFNldHRpbmdzIH0gZnJvbSAnLi9zcmMvT2lkY0NsaWVudFNldHRpbmdzLmpzJztcbmltcG9ydCB7IFdlYlN0b3JhZ2VTdGF0ZVN0b3JlIH0gZnJvbSAnLi9zcmMvV2ViU3RvcmFnZVN0YXRlU3RvcmUuanMnO1xuaW1wb3J0IHsgSW5NZW1vcnlXZWJTdG9yYWdlIH0gZnJvbSAnLi9zcmMvSW5NZW1vcnlXZWJTdG9yYWdlLmpzJztcbmltcG9ydCB7IFVzZXJNYW5hZ2VyIH0gZnJvbSAnLi9zcmMvVXNlck1hbmFnZXIuanMnO1xuaW1wb3J0IHsgQWNjZXNzVG9rZW5FdmVudHMgfSBmcm9tICcuL3NyYy9BY2Nlc3NUb2tlbkV2ZW50cy5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL3NyYy9NZXRhZGF0YVNlcnZpY2UuanMnO1xuaW1wb3J0IHsgQ29yZG92YVBvcHVwTmF2aWdhdG9yIH0gZnJvbSAnLi9zcmMvQ29yZG92YVBvcHVwTmF2aWdhdG9yLmpzJztcbmltcG9ydCB7IENvcmRvdmFJRnJhbWVOYXZpZ2F0b3IgfSBmcm9tICcuL3NyYy9Db3Jkb3ZhSUZyYW1lTmF2aWdhdG9yLmpzJztcbmltcG9ydCB7IENoZWNrU2Vzc2lvbklGcmFtZSB9IGZyb20gJy4vc3JjL0NoZWNrU2Vzc2lvbklGcmFtZS5qcyc7XG5pbXBvcnQgeyBUb2tlblJldm9jYXRpb25DbGllbnQgfSBmcm9tICcuL3NyYy9Ub2tlblJldm9jYXRpb25DbGllbnQuanMnO1xuaW1wb3J0IHsgU2Vzc2lvbk1vbml0b3IgfSBmcm9tICcuL3NyYy9TZXNzaW9uTW9uaXRvci5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL3NyYy9HbG9iYWwuanMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vc3JjL1VzZXIuanMnO1xuXG5pbXBvcnQgeyBWZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFZlcnNpb24sXG4gICAgTG9nLFxuICAgIE9pZGNDbGllbnQsXG4gICAgT2lkY0NsaWVudFNldHRpbmdzLFxuICAgIFdlYlN0b3JhZ2VTdGF0ZVN0b3JlLFxuICAgIEluTWVtb3J5V2ViU3RvcmFnZSxcbiAgICBVc2VyTWFuYWdlcixcbiAgICBBY2Nlc3NUb2tlbkV2ZW50cyxcbiAgICBNZXRhZGF0YVNlcnZpY2UsXG4gICAgQ29yZG92YVBvcHVwTmF2aWdhdG9yLFxuICAgIENvcmRvdmFJRnJhbWVOYXZpZ2F0b3IsXG4gICAgQ2hlY2tTZXNzaW9uSUZyYW1lLFxuICAgIFRva2VuUmV2b2NhdGlvbkNsaWVudCxcbiAgICBTZXNzaW9uTW9uaXRvcixcbiAgICBHbG9iYWwsXG4gICAgVXNlclxufTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdHJvb3QuQ3J5cHRvSlMgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXG5cdC8qZ2xvYmFscyB3aW5kb3csIGdsb2JhbCwgcmVxdWlyZSovXG5cblx0LyoqXG5cdCAqIENyeXB0b0pTIGNvcmUgY29tcG9uZW50cy5cblx0ICovXG5cdHZhciBDcnlwdG9KUyA9IENyeXB0b0pTIHx8IChmdW5jdGlvbiAoTWF0aCwgdW5kZWZpbmVkKSB7XG5cblx0ICAgIHZhciBjcnlwdG87XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSB3aW5kb3cgKEJyb3dzZXIpXG5cdCAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHdpbmRvdy5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gaW4gd2ViIHdvcmtlciAoQnJvd3Nlcilcblx0ICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBzZWxmLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIHdvcmtlclxuXHQgICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IGdsb2JhbFRoaXMuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgKGV4cGVyaW1lbnRhbCBJRSAxMSkgY3J5cHRvIGZyb20gd2luZG93IChCcm93c2VyKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lm1zQ3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gd2luZG93Lm1zQ3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gZ2xvYmFsIChOb2RlSlMpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gZ2xvYmFsLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBpbXBvcnQgdmlhIHJlcXVpcmUgKE5vZGVKUylcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cdCAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgfVxuXG5cdCAgICAvKlxuXHQgICAgICogQ3J5cHRvZ3JhcGhpY2FsbHkgc2VjdXJlIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yXG5cdCAgICAgKlxuXHQgICAgICogQXMgTWF0aC5yYW5kb20oKSBpcyBjcnlwdG9ncmFwaGljYWxseSBub3Qgc2FmZSB0byB1c2Vcblx0ICAgICAqL1xuXHQgICAgdmFyIGNyeXB0b1NlY3VyZVJhbmRvbUludCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoY3J5cHRvKSB7XG5cdCAgICAgICAgICAgIC8vIFVzZSBnZXRSYW5kb21WYWx1ZXMgbWV0aG9kIChCcm93c2VyKVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDEpKVswXTtcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFVzZSByYW5kb21CeXRlcyBtZXRob2QgKE5vZGVKUylcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8ucmFuZG9tQnl0ZXMgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyeXB0by5yYW5kb21CeXRlcyg0KS5yZWFkSW50MzJMRSgpO1xuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYXRpdmUgY3J5cHRvIG1vZHVsZSBjb3VsZCBub3QgYmUgdXNlZCB0byBnZXQgc2VjdXJlIHJhbmRvbSBudW1iZXIuJyk7XG5cdCAgICB9O1xuXG5cdCAgICAvKlxuXHQgICAgICogTG9jYWwgcG9seWZpbGwgb2YgT2JqZWN0LmNyZWF0ZVxuXG5cdCAgICAgKi9cblx0ICAgIHZhciBjcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gRigpIHt9XG5cblx0ICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICAgICAgICB2YXIgc3VidHlwZTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG9iajtcblxuXHQgICAgICAgICAgICBzdWJ0eXBlID0gbmV3IEYoKTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG51bGw7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQ3J5cHRvSlMgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExpYnJhcnkgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYiA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2Ugb2JqZWN0IGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2UgPSAoZnVuY3Rpb24gKCkge1xuXG5cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3ZlcnJpZGVzIFByb3BlcnRpZXMgdG8gY29weSBpbnRvIHRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJyxcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgICAgICBtZXRob2Q6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGV4dGVuZDogZnVuY3Rpb24gKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgLy8gU3Bhd25cblx0ICAgICAgICAgICAgICAgIHZhciBzdWJ0eXBlID0gY3JlYXRlKHRoaXMpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBBdWdtZW50XG5cdCAgICAgICAgICAgICAgICBpZiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5taXhJbihvdmVycmlkZXMpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBDcmVhdGUgZGVmYXVsdCBpbml0aWFsaXplclxuXHQgICAgICAgICAgICAgICAgaWYgKCFzdWJ0eXBlLmhhc093blByb3BlcnR5KCdpbml0JykgfHwgdGhpcy5pbml0ID09PSBzdWJ0eXBlLmluaXQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplcidzIHByb3RvdHlwZSBpcyB0aGUgc3VidHlwZSBvYmplY3Rcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdC5wcm90b3R5cGUgPSBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZWZlcmVuY2Ugc3VwZXJ0eXBlXG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlciA9IHRoaXM7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBFeHRlbmRzIHRoaXMgb2JqZWN0IGFuZCBydW5zIHRoZSBpbml0IG1ldGhvZC5cblx0ICAgICAgICAgICAgICogQXJndW1lbnRzIHRvIGNyZWF0ZSgpIHdpbGwgYmUgcGFzc2VkIHRvIGluaXQoKS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGluc3RhbmNlID0gTXlUeXBlLmNyZWF0ZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmV4dGVuZCgpO1xuXHQgICAgICAgICAgICAgICAgaW5zdGFuY2UuaW5pdC5hcHBseShpbnN0YW5jZSwgYXJndW1lbnRzKTtcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBhZGQgc29tZSBsb2dpYyB3aGVuIHlvdXIgb2JqZWN0cyBhcmUgY3JlYXRlZC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICAgICAgLy8gLi4uXG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENvcGllcyBwcm9wZXJ0aWVzIGludG8gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIHRvIG1peCBpbi5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIE15VHlwZS5taXhJbih7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZSdcblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgbWl4SW46IGZ1bmN0aW9uIChwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSUUgd29uJ3QgY29weSB0b1N0cmluZyB1c2luZyB0aGUgbG9vcCBhYm92ZVxuXHQgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3RvU3RyaW5nJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvU3RyaW5nID0gcHJvcGVydGllcy50b1N0cmluZztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNsb25lLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gaW5zdGFuY2UuY2xvbmUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0LnByb3RvdHlwZS5leHRlbmQodGhpcyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9O1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtBcnJheX0gd29yZHMgVGhlIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaWdCeXRlcyBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIChPcHRpb25hbCkgQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaWdCeXRlcyAoT3B0aW9uYWwpIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhlIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10sIDYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3b3Jkcywgc2lnQnl0ZXMpIHtcblx0ICAgICAgICAgICAgd29yZHMgPSB0aGlzLndvcmRzID0gd29yZHMgfHwgW107XG5cblx0ICAgICAgICAgICAgaWYgKHNpZ0J5dGVzICE9IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHdvcmRzLmxlbmd0aCAqIDQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgdGhpcyB3b3JkIGFycmF5IHRvIGEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyIChPcHRpb25hbCkgVGhlIGVuY29kaW5nIHN0cmF0ZWd5IHRvIHVzZS4gRGVmYXVsdDogQ3J5cHRvSlMuZW5jLkhleFxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5naWZpZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheSArICcnO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKCk7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoZW5jb2Rlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gKGVuY29kZXIgfHwgSGV4KS5zdHJpbmdpZnkodGhpcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmNhdGVuYXRlcyBhIHdvcmQgYXJyYXkgdG8gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgd29yZEFycmF5MS5jb25jYXQod29yZEFycmF5Mik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29uY2F0OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgdGhpc1dvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRXb3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoaXNTaWdCeXRlcyA9IHRoaXMuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0U2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAgdGhpcy5jbGFtcCgpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbmNhdFxuXHQgICAgICAgICAgICBpZiAodGhpc1NpZ0J5dGVzICUgNCkge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgYnl0ZSBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdEJ5dGUgPSAodGhhdFdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSB8PSB0aGF0Qnl0ZSA8PCAoMjQgLSAoKHRoaXNTaWdCeXRlcyArIGkpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIHdvcmQgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoYXRTaWdCeXRlczsgaiArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBqKSA+Pj4gMl0gPSB0aGF0V29yZHNbaiA+Pj4gMl07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyArPSB0aGF0U2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZW1vdmVzIGluc2lnbmlmaWNhbnQgYml0cy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgd29yZEFycmF5LmNsYW1wKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xhbXA6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHRoaXMuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXBcblx0ICAgICAgICAgICAgd29yZHNbc2lnQnl0ZXMgPj4+IDJdICY9IDB4ZmZmZmZmZmYgPDwgKDMyIC0gKHNpZ0J5dGVzICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgd29yZHMubGVuZ3RoID0gTWF0aC5jZWlsKHNpZ0J5dGVzIC8gNCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSB3b3JkQXJyYXkuY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLndvcmRzID0gdGhpcy53b3Jkcy5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSB3b3JkIGFycmF5IGZpbGxlZCB3aXRoIHJhbmRvbSBieXRlcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuQnl0ZXMgVGhlIG51bWJlciBvZiByYW5kb20gYnl0ZXMgdG8gZ2VuZXJhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSByYW5kb20gd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkucmFuZG9tKDE2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByYW5kb206IGZ1bmN0aW9uIChuQnl0ZXMpIHtcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgd29yZHMucHVzaChjcnlwdG9TZWN1cmVSYW5kb21JbnQoKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBuQnl0ZXMpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEVuY29kZXIgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEhleCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEhleCA9IENfZW5jLkhleCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoZXhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuSGV4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgaGV4Q2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlID4+PiA0KS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSAmIDB4MGYpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gaGV4Q2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgaGV4IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGV4U3RyIFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5IZXgucGFyc2UoaGV4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGhleFN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGV4U3RyTGVuZ3RoID0gaGV4U3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhleFN0ckxlbmd0aDsgaSArPSAyKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAzXSB8PSBwYXJzZUludChoZXhTdHIuc3Vic3RyKGksIDIpLCAxNikgPDwgKDI0IC0gKGkgJSA4KSAqIDQpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgaGV4U3RyTGVuZ3RoIC8gMik7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMYXRpbjEgZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBMYXRpbjEgPSBDX2VuYy5MYXRpbjEgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbGF0aW4xU3RyaW5nID0gQ3J5cHRvSlMuZW5jLkxhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMUNoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgbGF0aW4xQ2hhcnMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJpdGUpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBsYXRpbjFDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBMYXRpbjEgc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXRpbjFTdHIgVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkxhdGluMS5wYXJzZShsYXRpbjFTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAobGF0aW4xU3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFTdHJMZW5ndGggPSBsYXRpbjFTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF0aW4xU3RyTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDJdIHw9IChsYXRpbjFTdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYpIDw8ICgyNCAtIChpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGxhdGluMVN0ckxlbmd0aCk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBVVEYtOCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFV0ZjggPSBDX2VuYy5VdGY4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB1dGY4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLlV0Zjguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShMYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSkpKTtcblx0ICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgVVRGLTggZGF0YScpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgVVRGLTggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dGY4U3RyIFRoZSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UodXRmOFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uICh1dGY4U3RyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBMYXRpbjEucGFyc2UodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHV0ZjhTdHIpKSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBidWZmZXJlZCBibG9jayBhbGdvcml0aG0gdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogVGhlIHByb3BlcnR5IGJsb2NrU2l6ZSBtdXN0IGJlIGltcGxlbWVudGVkIGluIGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gX21pbkJ1ZmZlclNpemUgVGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBzaG91bGQgYmUga2VwdCB1bnByb2Nlc3NlZCBpbiB0aGUgYnVmZmVyLiBEZWZhdWx0OiAwXG5cdCAgICAgKi9cblx0ICAgIHZhciBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQ19saWIuQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBibG9jayBhbGdvcml0aG0ncyBkYXRhIGJ1ZmZlciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIEluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBuZXcgV29yZEFycmF5LmluaXQoKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyA9IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEFkZHMgbmV3IGRhdGEgdG8gdGhpcyBibG9jayBhbGdvcml0aG0ncyBidWZmZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYXBwZW5kLiBTdHJpbmdzIGFyZSBjb252ZXJ0ZWQgdG8gYSBXb3JkQXJyYXkgdXNpbmcgVVRGLTguXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCgnZGF0YScpO1xuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfYXBwZW5kOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBXb3JkQXJyYXksIGVsc2UgYXNzdW1lIFdvcmRBcnJheSBhbHJlYWR5XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgZGF0YSA9IFV0ZjgucGFyc2UoZGF0YSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YS5jb25jYXQoZGF0YSk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgKz0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUHJvY2Vzc2VzIGF2YWlsYWJsZSBkYXRhIGJsb2Nrcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIFRoaXMgbWV0aG9kIGludm9rZXMgX2RvUHJvY2Vzc0Jsb2NrKG9mZnNldCksIHdoaWNoIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBkb0ZsdXNoIFdoZXRoZXIgYWxsIGJsb2NrcyBhbmQgcGFydGlhbCBibG9ja3Mgc2hvdWxkIGJlIHByb2Nlc3NlZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHByb2Nlc3NlZCBkYXRhLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX3Byb2Nlc3M6IGZ1bmN0aW9uIChkb0ZsdXNoKSB7XG5cdCAgICAgICAgICAgIHZhciBwcm9jZXNzZWRXb3JkcztcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGRhdGFTaWdCeXRlcyA9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSB0aGlzLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBibG9ja3MgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CbG9ja3NSZWFkeSA9IGRhdGFTaWdCeXRlcyAvIGJsb2NrU2l6ZUJ5dGVzO1xuXHQgICAgICAgICAgICBpZiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgdXAgdG8gaW5jbHVkZSBwYXJ0aWFsIGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5jZWlsKG5CbG9ja3NSZWFkeSk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCBkb3duIHRvIGluY2x1ZGUgb25seSBmdWxsIGJsb2Nrcyxcblx0ICAgICAgICAgICAgICAgIC8vIGxlc3MgdGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBtdXN0IHJlbWFpbiBpbiB0aGUgYnVmZmVyXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLm1heCgobkJsb2Nrc1JlYWR5IHwgMCkgLSB0aGlzLl9taW5CdWZmZXJTaXplLCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvdW50IHdvcmRzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuV29yZHNSZWFkeSA9IG5CbG9ja3NSZWFkeSAqIGJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBieXRlcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJ5dGVzUmVhZHkgPSBNYXRoLm1pbihuV29yZHNSZWFkeSAqIDQsIGRhdGFTaWdCeXRlcyk7XG5cblx0ICAgICAgICAgICAgLy8gUHJvY2VzcyBibG9ja3Ncblx0ICAgICAgICAgICAgaWYgKG5Xb3Jkc1JlYWR5KSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBuV29yZHNSZWFkeTsgb2Zmc2V0ICs9IGJsb2NrU2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtYWxnb3JpdGhtIGxvZ2ljXG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9Qcm9jZXNzQmxvY2soZGF0YVdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgICAgICBwcm9jZXNzZWRXb3JkcyA9IGRhdGFXb3Jkcy5zcGxpY2UoMCwgbldvcmRzUmVhZHkpO1xuXHQgICAgICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyAtPSBuQnl0ZXNSZWFkeTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBwcm9jZXNzZWQgd29yZHNcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdChwcm9jZXNzZWRXb3JkcywgbkJ5dGVzUmVhZHkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5fZGF0YSA9IHRoaXMuX2RhdGEuY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9taW5CdWZmZXJTaXplOiAwXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBoYXNoZXIgdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJsb2NrU2l6ZSBUaGUgbnVtYmVyIG9mIDMyLWJpdCB3b3JkcyB0aGlzIGhhc2hlciBvcGVyYXRlcyBvbi4gRGVmYXVsdDogMTYgKDUxMiBiaXRzKVxuXHQgICAgICovXG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyID0gQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEJhc2UuZXh0ZW5kKCksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgaGFzaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoYXNoZXIgPSBDcnlwdG9KUy5hbGdvLlNIQTI1Ni5jcmVhdGUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICB0aGlzLmNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGhhc2hlciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gUmVzZXQgZGF0YSBidWZmZXJcblx0ICAgICAgICAgICAgQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5yZXNldC5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHRoaXMuX2RvUmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogVXBkYXRlcyB0aGlzIGhhc2hlciB3aXRoIGEgbWVzc2FnZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSBUaGUgbWVzc2FnZSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtIYXNoZXJ9IFRoaXMgaGFzaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7XG5cblx0ICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBoYXNoXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEZpbmFsaXplcyB0aGUgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKiBOb3RlIHRoYXQgdGhlIGZpbmFsaXplIG9wZXJhdGlvbiBpcyBlZmZlY3RpdmVseSBhIGRlc3RydWN0aXZlLCByZWFkLW9uY2Ugb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIChPcHRpb25hbCkgQSBmaW5hbCBtZXNzYWdlIHVwZGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEZpbmFsIG1lc3NhZ2UgdXBkYXRlXG5cdCAgICAgICAgICAgIGlmIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2RvRmluYWxpemUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiA1MTIvMzIsXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gYSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIGNyZWF0ZSBhIGhlbHBlciBmb3IuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHNob3J0Y3V0IGZ1bmN0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSGVscGVyOiBmdW5jdGlvbiAoaGFzaGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSwgY2ZnKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGhhc2hlci5pbml0KGNmZykuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gdXNlIGluIHRoaXMgSE1BQyBoZWxwZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHNob3J0Y3V0IGZ1bmN0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgSG1hY1NIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIbWFjSGVscGVyOiBmdW5jdGlvbiAoaGFzaGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSwga2V5KSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENfYWxnby5ITUFDLmluaXQoaGFzaGVyLCBrZXkpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFsZ29yaXRobSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ28gPSB7fTtcblxuXHQgICAgcmV0dXJuIEM7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmM7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZTY0IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZTY0ID0gQ19lbmMuQmFzZTY0ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGJhc2U2NFN0cmluZyA9IENyeXB0b0pTLmVuYy5CYXNlNjQuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDMpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMSA9ICh3b3Jkc1tpID4+PiAyXSAgICAgICA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAgICAgICAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTIgPSAod29yZHNbKGkgKyAxKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDEpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUzID0gKHdvcmRzWyhpICsgMikgPj4+IDJdID4+PiAoMjQgLSAoKGkgKyAyKSAlIDQpICogOCkpICYgMHhmZjtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZTEgPDwgMTYpIHwgKGJ5dGUyIDw8IDgpIHwgYnl0ZTM7XG5cblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyAoaiA8IDQpICYmIChpICsgaiAqIDAuNzUgPCBzaWdCeXRlcyk7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gobWFwLmNoYXJBdCgodHJpcGxldCA+Pj4gKDYgKiAoMyAtIGopKSkgJiAweDNmKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ0NoYXIgPSBtYXAuY2hhckF0KDY0KTtcblx0ICAgICAgICAgICAgaWYgKHBhZGRpbmdDaGFyKSB7XG5cdCAgICAgICAgICAgICAgICB3aGlsZSAoYmFzZTY0Q2hhcnMubGVuZ3RoICUgNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gocGFkZGluZ0NoYXIpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGJhc2U2NENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIEJhc2U2NCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2U2NFN0ciBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuQmFzZTY0LnBhcnNlKGJhc2U2NFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChiYXNlNjRTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRTdHJMZW5ndGggPSBiYXNlNjRTdHIubGVuZ3RoO1xuXHQgICAgICAgICAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHQgICAgICAgICAgICB2YXIgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXA7XG5cblx0ICAgICAgICAgICAgaWYgKCFyZXZlcnNlTWFwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXAgPSBbXTtcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1hcC5sZW5ndGg7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlTWFwW21hcC5jaGFyQ29kZUF0KGopXSA9IGo7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSWdub3JlIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdDaGFyID0gbWFwLmNoYXJBdCg2NCk7XG5cdCAgICAgICAgICAgIGlmIChwYWRkaW5nQ2hhcikge1xuXHQgICAgICAgICAgICAgICAgdmFyIHBhZGRpbmdJbmRleCA9IGJhc2U2NFN0ci5pbmRleE9mKHBhZGRpbmdDaGFyKTtcblx0ICAgICAgICAgICAgICAgIGlmIChwYWRkaW5nSW5kZXggIT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmFzZTY0U3RyTGVuZ3RoID0gcGFkZGluZ0luZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICByZXR1cm4gcGFyc2VMb29wKGJhc2U2NFN0ciwgYmFzZTY0U3RyTGVuZ3RoLCByZXZlcnNlTWFwKTtcblxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWFwOiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nXG5cdCAgICB9O1xuXG5cdCAgICBmdW5jdGlvbiBwYXJzZUxvb3AoYmFzZTY0U3RyLCBiYXNlNjRTdHJMZW5ndGgsIHJldmVyc2VNYXApIHtcblx0ICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgIHZhciBuQnl0ZXMgPSAwO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U2NFN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICBpZiAoaSAlIDQpIHtcblx0ICAgICAgICAgICAgICB2YXIgYml0czEgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkgLSAxKV0gPDwgKChpICUgNCkgKiAyKTtcblx0ICAgICAgICAgICAgICB2YXIgYml0czIgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkpXSA+Pj4gKDYgLSAoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHNDb21iaW5lZCA9IGJpdHMxIHwgYml0czI7XG5cdCAgICAgICAgICAgICAgd29yZHNbbkJ5dGVzID4+PiAyXSB8PSBiaXRzQ29tYmluZWQgPDwgKDI0IC0gKG5CeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgbkJ5dGVzKys7XG5cdCAgICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIFdvcmRBcnJheS5jcmVhdGUod29yZHMsIG5CeXRlcyk7XG5cdCAgICB9XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuZW5jLkJhc2U2NDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0cmV0dXJuIENyeXB0b0pTLmVuYy5IZXg7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIEluaXRpYWxpemF0aW9uIGFuZCByb3VuZCBjb25zdGFudHMgdGFibGVzXG5cdCAgICB2YXIgSCA9IFtdO1xuXHQgICAgdmFyIEsgPSBbXTtcblxuXHQgICAgLy8gQ29tcHV0ZSBjb25zdGFudHNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gaXNQcmltZShuKSB7XG5cdCAgICAgICAgICAgIHZhciBzcXJ0TiA9IE1hdGguc3FydChuKTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgZmFjdG9yID0gMjsgZmFjdG9yIDw9IHNxcnROOyBmYWN0b3IrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKCEobiAlIGZhY3RvcikpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBmdW5jdGlvbiBnZXRGcmFjdGlvbmFsQml0cyhuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoKG4gLSAobiB8IDApKSAqIDB4MTAwMDAwMDAwKSB8IDA7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIG4gPSAyO1xuXHQgICAgICAgIHZhciBuUHJpbWUgPSAwO1xuXHQgICAgICAgIHdoaWxlIChuUHJpbWUgPCA2NCkge1xuXHQgICAgICAgICAgICBpZiAoaXNQcmltZShuKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKG5QcmltZSA8IDgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBIW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMikpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgS1tuUHJpbWVdID0gZ2V0RnJhY3Rpb25hbEJpdHMoTWF0aC5wb3cobiwgMSAvIDMpKTtcblxuXHQgICAgICAgICAgICAgICAgblByaW1lKys7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBuKys7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0XG5cdCAgICB2YXIgVyA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0yNTYgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEyNTYgPSBDX2FsZ28uU0hBMjU2ID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChILnNsaWNlKDApKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYSA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBiID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIGMgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgZCA9IEhbM107XG5cdCAgICAgICAgICAgIHZhciBlID0gSFs0XTtcblx0ICAgICAgICAgICAgdmFyIGYgPSBIWzVdO1xuXHQgICAgICAgICAgICB2YXIgZyA9IEhbNl07XG5cdCAgICAgICAgICAgIHZhciBoID0gSFs3XTtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRhdGlvblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmIChpIDwgMTYpIHtcblx0ICAgICAgICAgICAgICAgICAgICBXW2ldID0gTVtvZmZzZXQgKyBpXSB8IDA7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4ID0gV1tpIC0gMTVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTAgID0gKChnYW1tYTB4IDw8IDI1KSB8IChnYW1tYTB4ID4+PiA3KSkgIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWEweCA8PCAxNCkgfCAoZ2FtbWEweCA+Pj4gMTgpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMHggPj4+IDMpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXggPSBXW2kgLSAyXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExICA9ICgoZ2FtbWExeCA8PCAxNSkgfCAoZ2FtbWExeCA+Pj4gMTcpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMXggPDwgMTMpIHwgKGdhbW1hMXggPj4+IDE5KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnYW1tYTF4ID4+PiAxMCk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBXW2ldID0gZ2FtbWEwICsgV1tpIC0gN10gKyBnYW1tYTEgKyBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIHZhciBjaCAgPSAoZSAmIGYpIF4gKH5lICYgZyk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqID0gKGEgJiBiKSBeIChhICYgYykgXiAoYiAmIGMpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwID0gKChhIDw8IDMwKSB8IChhID4+PiAyKSkgXiAoKGEgPDwgMTkpIHwgKGEgPj4+IDEzKSkgXiAoKGEgPDwgMTApIHwgKGEgPj4+IDIyKSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExID0gKChlIDw8IDI2KSB8IChlID4+PiA2KSkgXiAoKGUgPDwgMjEpIHwgKGUgPj4+IDExKSkgXiAoKGUgPDwgNykgIHwgKGUgPj4+IDI1KSk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQyID0gc2lnbWEwICsgbWFqO1xuXG5cdCAgICAgICAgICAgICAgICBoID0gZztcblx0ICAgICAgICAgICAgICAgIGcgPSBmO1xuXHQgICAgICAgICAgICAgICAgZiA9IGU7XG5cdCAgICAgICAgICAgICAgICBlID0gKGQgKyB0MSkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZCA9IGM7XG5cdCAgICAgICAgICAgICAgICBjID0gYjtcblx0ICAgICAgICAgICAgICAgIGIgPSBhO1xuXHQgICAgICAgICAgICAgICAgYSA9ICh0MSArIHQyKSB8IDA7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNF0gPSAoSFs0XSArIGUpIHwgMDtcblx0ICAgICAgICAgICAgSFs1XSA9IChIWzVdICsgZikgfCAwO1xuXHQgICAgICAgICAgICBIWzZdID0gKEhbNl0gKyBnKSB8IDA7XG5cdCAgICAgICAgICAgIEhbN10gPSAoSFs3XSArIGgpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjU2KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEyNTYgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEEyNTYpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTI1NihtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEyNTYgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMjU2KTtcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBMjU2O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3g2NC1jb3JlXCIpLCByZXF1aXJlKFwiLi9zaGE1MTJcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4veDY0LWNvcmVcIiwgXCIuL3NoYTUxMlwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX3g2NCA9IEMueDY0O1xuXHQgICAgdmFyIFg2NFdvcmQgPSBDX3g2NC5Xb3JkO1xuXHQgICAgdmFyIFg2NFdvcmRBcnJheSA9IENfeDY0LldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgU0hBNTEyID0gQ19hbGdvLlNIQTUxMjtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMzg0IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMzg0ID0gQ19hbGdvLlNIQTM4NCA9IFNIQTUxMi5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgWDY0V29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweGNiYmI5ZDVkLCAweGMxMDU5ZWQ4KSwgbmV3IFg2NFdvcmQuaW5pdCgweDYyOWEyOTJhLCAweDM2N2NkNTA3KSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg5MTU5MDE1YSwgMHgzMDcwZGQxNyksIG5ldyBYNjRXb3JkLmluaXQoMHgxNTJmZWNkOCwgMHhmNzBlNTkzOSksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NjczMzI2NjcsIDB4ZmZjMDBiMzEpLCBuZXcgWDY0V29yZC5pbml0KDB4OGViNDRhODcsIDB4Njg1ODE1MTEpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweGRiMGMyZTBkLCAweDY0Zjk4ZmE3KSwgbmV3IFg2NFdvcmQuaW5pdCgweDQ3YjU0ODFkLCAweGJlZmE0ZmE0KVxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSBTSEE1MTIuX2RvRmluYWxpemUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICBoYXNoLnNpZ0J5dGVzIC09IDE2O1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMzg0KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEzODQod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEzODQgPSBTSEE1MTIuX2NyZWF0ZUhlbHBlcihTSEEzODQpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTM4NChtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEzODQgPSBTSEE1MTIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMzg0KTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEzODQ7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4veDY0LWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4veDY0LWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ194NjQgPSBDLng2NDtcblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZDtcblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICBmdW5jdGlvbiBYNjRXb3JkX2NyZWF0ZSgpIHtcblx0ICAgICAgICByZXR1cm4gWDY0V29yZC5jcmVhdGUuYXBwbHkoWDY0V29yZCwgYXJndW1lbnRzKTtcblx0ICAgIH1cblxuXHQgICAgLy8gQ29uc3RhbnRzXG5cdCAgICB2YXIgSyA9IFtcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDQyOGEyZjk4LCAweGQ3MjhhZTIyKSwgWDY0V29yZF9jcmVhdGUoMHg3MTM3NDQ5MSwgMHgyM2VmNjVjZCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiNWMwZmJjZiwgMHhlYzRkM2IyZiksIFg2NFdvcmRfY3JlYXRlKDB4ZTliNWRiYTUsIDB4ODE4OWRiYmMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Mzk1NmMyNWIsIDB4ZjM0OGI1MzgpLCBYNjRXb3JkX2NyZWF0ZSgweDU5ZjExMWYxLCAweGI2MDVkMDE5KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkyM2Y4MmE0LCAweGFmMTk0ZjliKSwgWDY0V29yZF9jcmVhdGUoMHhhYjFjNWVkNSwgMHhkYTZkODExOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkODA3YWE5OCwgMHhhMzAzMDI0MiksIFg2NFdvcmRfY3JlYXRlKDB4MTI4MzViMDEsIDB4NDU3MDZmYmUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MjQzMTg1YmUsIDB4NGVlNGIyOGMpLCBYNjRXb3JkX2NyZWF0ZSgweDU1MGM3ZGMzLCAweGQ1ZmZiNGUyKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDcyYmU1ZDc0LCAweGYyN2I4OTZmKSwgWDY0V29yZF9jcmVhdGUoMHg4MGRlYjFmZSwgMHgzYjE2OTZiMSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5YmRjMDZhNywgMHgyNWM3MTIzNSksIFg2NFdvcmRfY3JlYXRlKDB4YzE5YmYxNzQsIDB4Y2Y2OTI2OTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZTQ5YjY5YzEsIDB4OWVmMTRhZDIpLCBYNjRXb3JkX2NyZWF0ZSgweGVmYmU0Nzg2LCAweDM4NGYyNWUzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDBmYzE5ZGM2LCAweDhiOGNkNWI1KSwgWDY0V29yZF9jcmVhdGUoMHgyNDBjYTFjYywgMHg3N2FjOWM2NSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyZGU5MmM2ZiwgMHg1OTJiMDI3NSksIFg2NFdvcmRfY3JlYXRlKDB4NGE3NDg0YWEsIDB4NmVhNmU0ODMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NWNiMGE5ZGMsIDB4YmQ0MWZiZDQpLCBYNjRXb3JkX2NyZWF0ZSgweDc2Zjk4OGRhLCAweDgzMTE1M2I1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDk4M2U1MTUyLCAweGVlNjZkZmFiKSwgWDY0V29yZF9jcmVhdGUoMHhhODMxYzY2ZCwgMHgyZGI0MzIxMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiMDAzMjdjOCwgMHg5OGZiMjEzZiksIFg2NFdvcmRfY3JlYXRlKDB4YmY1OTdmYzcsIDB4YmVlZjBlZTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YzZlMDBiZjMsIDB4M2RhODhmYzIpLCBYNjRXb3JkX2NyZWF0ZSgweGQ1YTc5MTQ3LCAweDkzMGFhNzI1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDA2Y2E2MzUxLCAweGUwMDM4MjZmKSwgWDY0V29yZF9jcmVhdGUoMHgxNDI5Mjk2NywgMHgwYTBlNmU3MCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyN2I3MGE4NSwgMHg0NmQyMmZmYyksIFg2NFdvcmRfY3JlYXRlKDB4MmUxYjIxMzgsIDB4NWMyNmM5MjYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGQyYzZkZmMsIDB4NWFjNDJhZWQpLCBYNjRXb3JkX2NyZWF0ZSgweDUzMzgwZDEzLCAweDlkOTViM2RmKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDY1MGE3MzU0LCAweDhiYWY2M2RlKSwgWDY0V29yZF9jcmVhdGUoMHg3NjZhMGFiYiwgMHgzYzc3YjJhOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg4MWMyYzkyZSwgMHg0N2VkYWVlNiksIFg2NFdvcmRfY3JlYXRlKDB4OTI3MjJjODUsIDB4MTQ4MjM1M2IpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YTJiZmU4YTEsIDB4NGNmMTAzNjQpLCBYNjRXb3JkX2NyZWF0ZSgweGE4MWE2NjRiLCAweGJjNDIzMDAxKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGMyNGI4YjcwLCAweGQwZjg5NzkxKSwgWDY0V29yZF9jcmVhdGUoMHhjNzZjNTFhMywgMHgwNjU0YmUzMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkMTkyZTgxOSwgMHhkNmVmNTIxOCksIFg2NFdvcmRfY3JlYXRlKDB4ZDY5OTA2MjQsIDB4NTU2NWE5MTApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZjQwZTM1ODUsIDB4NTc3MTIwMmEpLCBYNjRXb3JkX2NyZWF0ZSgweDEwNmFhMDcwLCAweDMyYmJkMWI4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDE5YTRjMTE2LCAweGI4ZDJkMGM4KSwgWDY0V29yZF9jcmVhdGUoMHgxZTM3NmMwOCwgMHg1MTQxYWI1MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyNzQ4Nzc0YywgMHhkZjhlZWI5OSksIFg2NFdvcmRfY3JlYXRlKDB4MzRiMGJjYjUsIDB4ZTE5YjQ4YTgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MzkxYzBjYjMsIDB4YzVjOTVhNjMpLCBYNjRXb3JkX2NyZWF0ZSgweDRlZDhhYTRhLCAweGUzNDE4YWNiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDViOWNjYTRmLCAweDc3NjNlMzczKSwgWDY0V29yZF9jcmVhdGUoMHg2ODJlNmZmMywgMHhkNmIyYjhhMyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg3NDhmODJlZSwgMHg1ZGVmYjJmYyksIFg2NFdvcmRfY3JlYXRlKDB4NzhhNTYzNmYsIDB4NDMxNzJmNjApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ODRjODc4MTQsIDB4YTFmMGFiNzIpLCBYNjRXb3JkX2NyZWF0ZSgweDhjYzcwMjA4LCAweDFhNjQzOWVjKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkwYmVmZmZhLCAweDIzNjMxZTI4KSwgWDY0V29yZF9jcmVhdGUoMHhhNDUwNmNlYiwgMHhkZTgyYmRlOSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiZWY5YTNmNywgMHhiMmM2NzkxNSksIFg2NFdvcmRfY3JlYXRlKDB4YzY3MTc4ZjIsIDB4ZTM3MjUzMmIpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Y2EyNzNlY2UsIDB4ZWEyNjYxOWMpLCBYNjRXb3JkX2NyZWF0ZSgweGQxODZiOGM3LCAweDIxYzBjMjA3KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGVhZGE3ZGQ2LCAweGNkZTBlYjFlKSwgWDY0V29yZF9jcmVhdGUoMHhmNTdkNGY3ZiwgMHhlZTZlZDE3OCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgwNmYwNjdhYSwgMHg3MjE3NmZiYSksIFg2NFdvcmRfY3JlYXRlKDB4MGE2MzdkYzUsIDB4YTJjODk4YTYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MTEzZjk4MDQsIDB4YmVmOTBkYWUpLCBYNjRXb3JkX2NyZWF0ZSgweDFiNzEwYjM1LCAweDEzMWM0NzFiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI4ZGI3N2Y1LCAweDIzMDQ3ZDg0KSwgWDY0V29yZF9jcmVhdGUoMHgzMmNhYWI3YiwgMHg0MGM3MjQ5MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgzYzllYmUwYSwgMHgxNWM5YmViYyksIFg2NFdvcmRfY3JlYXRlKDB4NDMxZDY3YzQsIDB4OWMxMDBkNGMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGNjNWQ0YmUsIDB4Y2IzZTQyYjYpLCBYNjRXb3JkX2NyZWF0ZSgweDU5N2YyOTljLCAweGZjNjU3ZTJhKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDVmY2I2ZmFiLCAweDNhZDZmYWVjKSwgWDY0V29yZF9jcmVhdGUoMHg2YzQ0MTk4YywgMHg0YTQ3NTgxNylcblx0ICAgIF07XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdHNcblx0ICAgIHZhciBXID0gW107XG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICBXW2ldID0gWDY0V29yZF9jcmVhdGUoKTtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS01MTIgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEE1MTIgPSBDX2FsZ28uU0hBNTEyID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBYNjRXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NmEwOWU2NjcsIDB4ZjNiY2M5MDgpLCBuZXcgWDY0V29yZC5pbml0KDB4YmI2N2FlODUsIDB4ODRjYWE3M2IpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDNjNmVmMzcyLCAweGZlOTRmODJiKSwgbmV3IFg2NFdvcmQuaW5pdCgweGE1NGZmNTNhLCAweDVmMWQzNmYxKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg1MTBlNTI3ZiwgMHhhZGU2ODJkMSksIG5ldyBYNjRXb3JkLmluaXQoMHg5YjA1Njg4YywgMHgyYjNlNmMxZiksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4MWY4M2Q5YWIsIDB4ZmI0MWJkNmIpLCBuZXcgWDY0V29yZC5pbml0KDB4NWJlMGNkMTksIDB4MTM3ZTIxNzkpXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgSDAgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgSDEgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgSDIgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgSDMgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgSDQgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgSDUgPSBIWzVdO1xuXHQgICAgICAgICAgICB2YXIgSDYgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgSDcgPSBIWzddO1xuXG5cdCAgICAgICAgICAgIHZhciBIMGggPSBIMC5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDBsID0gSDAubG93O1xuXHQgICAgICAgICAgICB2YXIgSDFoID0gSDEuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgxbCA9IEgxLmxvdztcblx0ICAgICAgICAgICAgdmFyIEgyaCA9IEgyLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIMmwgPSBIMi5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIM2ggPSBIMy5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDNsID0gSDMubG93O1xuXHQgICAgICAgICAgICB2YXIgSDRoID0gSDQuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg0bCA9IEg0Lmxvdztcblx0ICAgICAgICAgICAgdmFyIEg1aCA9IEg1LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBINWwgPSBINS5sb3c7XG5cdCAgICAgICAgICAgIHZhciBINmggPSBINi5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDZsID0gSDYubG93O1xuXHQgICAgICAgICAgICB2YXIgSDdoID0gSDcuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg3bCA9IEg3LmxvdztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYWggPSBIMGg7XG5cdCAgICAgICAgICAgIHZhciBhbCA9IEgwbDtcblx0ICAgICAgICAgICAgdmFyIGJoID0gSDFoO1xuXHQgICAgICAgICAgICB2YXIgYmwgPSBIMWw7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IEgyaDtcblx0ICAgICAgICAgICAgdmFyIGNsID0gSDJsO1xuXHQgICAgICAgICAgICB2YXIgZGggPSBIM2g7XG5cdCAgICAgICAgICAgIHZhciBkbCA9IEgzbDtcblx0ICAgICAgICAgICAgdmFyIGVoID0gSDRoO1xuXHQgICAgICAgICAgICB2YXIgZWwgPSBINGw7XG5cdCAgICAgICAgICAgIHZhciBmaCA9IEg1aDtcblx0ICAgICAgICAgICAgdmFyIGZsID0gSDVsO1xuXHQgICAgICAgICAgICB2YXIgZ2ggPSBINmg7XG5cdCAgICAgICAgICAgIHZhciBnbCA9IEg2bDtcblx0ICAgICAgICAgICAgdmFyIGhoID0gSDdoO1xuXHQgICAgICAgICAgICB2YXIgaGwgPSBIN2w7XG5cblx0ICAgICAgICAgICAgLy8gUm91bmRzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIFdpbDtcblx0ICAgICAgICAgICAgICAgIHZhciBXaWg7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgV2kgPSBXW2ldO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBFeHRlbmQgbWVzc2FnZVxuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpLmhpZ2ggPSBNW29mZnNldCArIGkgKiAyXSAgICAgfCAwO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpbCA9IFdpLmxvdyAgPSBNW29mZnNldCArIGkgKiAyICsgMV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTBcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCAgPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHhoID0gZ2FtbWEweC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4bCA9IGdhbW1hMHgubG93O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTBoICA9ICgoZ2FtbWEweGggPj4+IDEpIHwgKGdhbW1hMHhsIDw8IDMxKSkgXiAoKGdhbW1hMHhoID4+PiA4KSB8IChnYW1tYTB4bCA8PCAyNCkpIF4gKGdhbW1hMHhoID4+PiA3KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwbCAgPSAoKGdhbW1hMHhsID4+PiAxKSB8IChnYW1tYTB4aCA8PCAzMSkpIF4gKChnYW1tYTB4bCA+Pj4gOCkgfCAoZ2FtbWEweGggPDwgMjQpKSBeICgoZ2FtbWEweGwgPj4+IDcpIHwgKGdhbW1hMHhoIDw8IDI1KSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTFcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCAgPSBXW2kgLSAyXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeGggPSBnYW1tYTF4LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXhsID0gZ2FtbWExeC5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMWggID0gKChnYW1tYTF4aCA+Pj4gMTkpIHwgKGdhbW1hMXhsIDw8IDEzKSkgXiAoKGdhbW1hMXhoIDw8IDMpIHwgKGdhbW1hMXhsID4+PiAyOSkpIF4gKGdhbW1hMXhoID4+PiA2KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExbCAgPSAoKGdhbW1hMXhsID4+PiAxOSkgfCAoZ2FtbWExeGggPDwgMTMpKSBeICgoZ2FtbWExeGwgPDwgMykgfCAoZ2FtbWExeGggPj4+IDI5KSkgXiAoKGdhbW1hMXhsID4+PiA2KSB8IChnYW1tYTF4aCA8PCAyNikpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpNyAgPSBXW2kgLSA3XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2k3aCA9IFdpNy5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTdsID0gV2k3LmxvdztcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTE2ICA9IFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2kxNmggPSBXaTE2LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpMTZsID0gV2kxNi5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBnYW1tYTBsICsgV2k3bDtcblx0ICAgICAgICAgICAgICAgICAgICBXaWggPSBnYW1tYTBoICsgV2k3aCArICgoV2lsID4+PiAwKSA8IChnYW1tYTBsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBXaWwgKyBnYW1tYTFsO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpaCArIGdhbW1hMWggKyAoKFdpbCA+Pj4gMCkgPCAoZ2FtbWExbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICAgICAgV2lsID0gV2lsICsgV2kxNmw7XG5cdCAgICAgICAgICAgICAgICAgICAgV2loID0gV2loICsgV2kxNmggKyAoKFdpbCA+Pj4gMCkgPCAoV2kxNmwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV2kuaGlnaCA9IFdpaDtcblx0ICAgICAgICAgICAgICAgICAgICBXaS5sb3cgID0gV2lsO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2hoICA9IChlaCAmIGZoKSBeICh+ZWggJiBnaCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgY2hsICA9IChlbCAmIGZsKSBeICh+ZWwgJiBnbCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqaCA9IChhaCAmIGJoKSBeIChhaCAmIGNoKSBeIChiaCAmIGNoKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWpsID0gKGFsICYgYmwpIF4gKGFsICYgY2wpIF4gKGJsICYgY2wpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwaCA9ICgoYWggPj4+IDI4KSB8IChhbCA8PCA0KSkgIF4gKChhaCA8PCAzMCkgIHwgKGFsID4+PiAyKSkgXiAoKGFoIDw8IDI1KSB8IChhbCA+Pj4gNykpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMGwgPSAoKGFsID4+PiAyOCkgfCAoYWggPDwgNCkpICBeICgoYWwgPDwgMzApICB8IChhaCA+Pj4gMikpIF4gKChhbCA8PCAyNSkgfCAoYWggPj4+IDcpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTFoID0gKChlaCA+Pj4gMTQpIHwgKGVsIDw8IDE4KSkgXiAoKGVoID4+PiAxOCkgfCAoZWwgPDwgMTQpKSBeICgoZWggPDwgMjMpIHwgKGVsID4+PiA5KSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExbCA9ICgoZWwgPj4+IDE0KSB8IChlaCA8PCAxOCkpIF4gKChlbCA+Pj4gMTgpIHwgKGVoIDw8IDE0KSkgXiAoKGVsIDw8IDIzKSB8IChlaCA+Pj4gOSkpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldXG5cdCAgICAgICAgICAgICAgICB2YXIgS2kgID0gS1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciBLaWggPSBLaS5oaWdoO1xuXHQgICAgICAgICAgICAgICAgdmFyIEtpbCA9IEtpLmxvdztcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IGhsICsgc2lnbWExbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSBoaCArIHNpZ21hMWggKyAoKHQxbCA+Pj4gMCkgPCAoaGwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IHQxbCArIGNobDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSB0MWggKyBjaGggKyAoKHQxbCA+Pj4gMCkgPCAoY2hsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSB0MWwgKyBLaWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gdDFoICsgS2loICsgKCh0MWwgPj4+IDApIDwgKEtpbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gdDFsICsgV2lsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IHQxaCArIFdpaCArICgodDFsID4+PiAwKSA8IChXaWwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MiA9IHNpZ21hMCArIG1halxuXHQgICAgICAgICAgICAgICAgdmFyIHQybCA9IHNpZ21hMGwgKyBtYWpsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQyaCA9IHNpZ21hMGggKyBtYWpoICsgKCh0MmwgPj4+IDApIDwgKHNpZ21hMGwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBVcGRhdGUgd29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgICAgIGhoID0gZ2g7XG5cdCAgICAgICAgICAgICAgICBobCA9IGdsO1xuXHQgICAgICAgICAgICAgICAgZ2ggPSBmaDtcblx0ICAgICAgICAgICAgICAgIGdsID0gZmw7XG5cdCAgICAgICAgICAgICAgICBmaCA9IGVoO1xuXHQgICAgICAgICAgICAgICAgZmwgPSBlbDtcblx0ICAgICAgICAgICAgICAgIGVsID0gKGRsICsgdDFsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBlaCA9IChkaCArIHQxaCArICgoZWwgPj4+IDApIDwgKGRsID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZGggPSBjaDtcblx0ICAgICAgICAgICAgICAgIGRsID0gY2w7XG5cdCAgICAgICAgICAgICAgICBjaCA9IGJoO1xuXHQgICAgICAgICAgICAgICAgY2wgPSBibDtcblx0ICAgICAgICAgICAgICAgIGJoID0gYWg7XG5cdCAgICAgICAgICAgICAgICBibCA9IGFsO1xuXHQgICAgICAgICAgICAgICAgYWwgPSAodDFsICsgdDJsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBhaCA9ICh0MWggKyB0MmggKyAoKGFsID4+PiAwKSA8ICh0MWwgPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIMGwgPSBIMC5sb3cgID0gKEgwbCArIGFsKTtcblx0ICAgICAgICAgICAgSDAuaGlnaCA9IChIMGggKyBhaCArICgoSDBsID4+PiAwKSA8IChhbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMWwgPSBIMS5sb3cgID0gKEgxbCArIGJsKTtcblx0ICAgICAgICAgICAgSDEuaGlnaCA9IChIMWggKyBiaCArICgoSDFsID4+PiAwKSA8IChibCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMmwgPSBIMi5sb3cgID0gKEgybCArIGNsKTtcblx0ICAgICAgICAgICAgSDIuaGlnaCA9IChIMmggKyBjaCArICgoSDJsID4+PiAwKSA8IChjbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIM2wgPSBIMy5sb3cgID0gKEgzbCArIGRsKTtcblx0ICAgICAgICAgICAgSDMuaGlnaCA9IChIM2ggKyBkaCArICgoSDNsID4+PiAwKSA8IChkbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINGwgPSBINC5sb3cgID0gKEg0bCArIGVsKTtcblx0ICAgICAgICAgICAgSDQuaGlnaCA9IChINGggKyBlaCArICgoSDRsID4+PiAwKSA8IChlbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINWwgPSBINS5sb3cgID0gKEg1bCArIGZsKTtcblx0ICAgICAgICAgICAgSDUuaGlnaCA9IChINWggKyBmaCArICgoSDVsID4+PiAwKSA8IChmbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINmwgPSBINi5sb3cgID0gKEg2bCArIGdsKTtcblx0ICAgICAgICAgICAgSDYuaGlnaCA9IChINmggKyBnaCArICgoSDZsID4+PiAwKSA8IChnbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIN2wgPSBINy5sb3cgID0gKEg3bCArIGhsKTtcblx0ICAgICAgICAgICAgSDcuaGlnaCA9IChIN2ggKyBoaCArICgoSDdsID4+PiAwKSA8IChobCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgaGFzaCB0byAzMi1iaXQgd29yZCBhcnJheSBiZWZvcmUgcmV0dXJuaW5nXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5faGFzaC50b1gzMigpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEwMjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBNTEyKCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEE1MTIod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEE1MTIpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTUxMihtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBNTEyKTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEE1MTI7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBYMzJXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogeDY0IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBIDY0LWJpdCB3b3JkLlxuXHQgICAgICovXG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIDY0LWJpdCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGhpZ2ggVGhlIGhpZ2ggMzIgYml0cy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbG93IFRoZSBsb3cgMzIgYml0cy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHg2NFdvcmQgPSBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgwMDAxMDIwMywgMHgwNDA1MDYwNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGhpZ2gsIGxvdykge1xuXHQgICAgICAgICAgICB0aGlzLmhpZ2ggPSBoaWdoO1xuXHQgICAgICAgICAgICB0aGlzLmxvdyA9IGxvdztcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIE5PVHMgdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIG5lZ2F0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbmVnYXRlZCA9IHg2NFdvcmQubm90KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gbm90OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gfnRoaXMuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IH50aGlzLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBBTkRzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gQU5EIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIEFORGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGFuZGVkID0geDY0V29yZC5hbmQoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIGFuZDogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggJiB3b3JkLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyAmIHdvcmQubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIE9ScyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIE9SIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIE9SaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgb3JlZCA9IHg2NFdvcmQub3IoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIG9yOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCB8IHdvcmQuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IHwgd29yZC5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgWE9ScyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIFhPUiB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBYT1JpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4b3JlZCA9IHg2NFdvcmQueG9yKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyB4b3I6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoIF4gd29yZC5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgXiB3b3JkLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogU2hpZnRzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIGxlZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgc2hpZnRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzaGlmdGVkID0geDY0V29yZC5zaGlmdEwoMjUpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHNoaWZ0TDogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gaWYgKG4gPCAzMikge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSAodGhpcy5oaWdoIDw8IG4pIHwgKHRoaXMubG93ID4+PiAoMzIgLSBuKSk7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgPDwgbjtcblx0ICAgICAgICAgICAgLy8gfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5sb3cgPDwgKG4gLSAzMik7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gMDtcblx0ICAgICAgICAgICAgLy8gfVxuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBTaGlmdHMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgcmlnaHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgc2hpZnRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzaGlmdGVkID0geDY0V29yZC5zaGlmdFIoNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gc2hpZnRSOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyBpZiAobiA8IDMyKSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gKHRoaXMubG93ID4+PiBuKSB8ICh0aGlzLmhpZ2ggPDwgKDMyIC0gbikpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggPj4+IG47XG5cdCAgICAgICAgICAgIC8vIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5oaWdoID4+PiAobiAtIDMyKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gMDtcblx0ICAgICAgICAgICAgLy8gfVxuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSb3RhdGVzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIGxlZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcm90YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHJvdGF0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcm90YXRlZCA9IHg2NFdvcmQucm90TCgyNSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gcm90TDogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2hpZnRMKG4pLm9yKHRoaXMuc2hpZnRSKDY0IC0gbikpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSb3RhdGVzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIHJpZ2h0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJvdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciByb3RhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHJvdGF0ZWQgPSB4NjRXb3JkLnJvdFIoNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gcm90UjogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2hpZnRSKG4pLm9yKHRoaXMuc2hpZnRMKDY0IC0gbikpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gYWRkIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIGFkZGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGFkZGVkID0geDY0V29yZC5hZGQoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIGFkZDogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9ICh0aGlzLmxvdyArIHdvcmQubG93KSB8IDA7XG5cdCAgICAgICAgICAgIC8vIHZhciBjYXJyeSA9IChsb3cgPj4+IDApIDwgKHRoaXMubG93ID4+PiAwKSA/IDEgOiAwO1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9ICh0aGlzLmhpZ2ggKyB3b3JkLmhpZ2ggKyBjYXJyeSkgfCAwO1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDY0LWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgQ3J5cHRvSlMueDY0LldvcmQgb2JqZWN0cy5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaWdCeXRlcyBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFg2NFdvcmRBcnJheSA9IENfeDY0LldvcmRBcnJheSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIChPcHRpb25hbCkgQW4gYXJyYXkgb2YgQ3J5cHRvSlMueDY0LldvcmQgb2JqZWN0cy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDAwMDEwMjAzLCAweDA0MDUwNjA3KSxcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDE4MTkxYTFiLCAweDFjMWQxZTFmKVxuXHQgICAgICAgICAqICAgICBdKTtcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMueDY0LldvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MDAwMTAyMDMsIDB4MDQwNTA2MDcpLFxuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MTgxOTFhMWIsIDB4MWMxZDFlMWYpXG5cdCAgICAgICAgICogICAgIF0sIDEwKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgNjQtYml0IHdvcmQgYXJyYXkgdG8gYSAzMi1iaXQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NyeXB0b0pTLmxpYi5Xb3JkQXJyYXl9IFRoaXMgd29yZCBhcnJheSdzIGRhdGEgYXMgYSAzMi1iaXQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHgzMldvcmRBcnJheSA9IHg2NFdvcmRBcnJheS50b1gzMigpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvWDMyOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgeDY0V29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgeDY0V29yZHNMZW5ndGggPSB4NjRXb3Jkcy5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgeDMyV29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4NjRXb3Jkc0xlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgeDY0V29yZCA9IHg2NFdvcmRzW2ldO1xuXHQgICAgICAgICAgICAgICAgeDMyV29yZHMucHVzaCh4NjRXb3JkLmhpZ2gpO1xuXHQgICAgICAgICAgICAgICAgeDMyV29yZHMucHVzaCh4NjRXb3JkLmxvdyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gWDMyV29yZEFycmF5LmNyZWF0ZSh4MzJXb3JkcywgdGhpcy5zaWdCeXRlcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmRBcnJheX0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSB4NjRXb3JkQXJyYXkuY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUgXCJ3b3Jkc1wiIGFycmF5XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IGNsb25lLndvcmRzID0gdGhpcy53b3Jkcy5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBlYWNoIFg2NFdvcmQgb2JqZWN0XG5cdCAgICAgICAgICAgIHZhciB3b3Jkc0xlbmd0aCA9IHdvcmRzLmxlbmd0aDtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkc0xlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpXSA9IHdvcmRzW2ldLmNsb25lKCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJy4vVGltZXIuanMnO1xuXG5jb25zdCBEZWZhdWx0QWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSA2MDsgLy8gc2Vjb25kc1xuXG5leHBvcnQgY2xhc3MgQWNjZXNzVG9rZW5FdmVudHMge1xuXG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IERlZmF1bHRBY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSxcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmluZ1RpbWVyID0gbmV3IFRpbWVyKFwiQWNjZXNzIHRva2VuIGV4cGlyaW5nXCIpLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZWRUaW1lciA9IG5ldyBUaW1lcihcIkFjY2VzcyB0b2tlbiBleHBpcmVkXCIpXG4gICAgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lID0gYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWU7XG5cbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZyA9IGFjY2Vzc1Rva2VuRXhwaXJpbmdUaW1lcjtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkID0gYWNjZXNzVG9rZW5FeHBpcmVkVGltZXI7XG4gICAgfVxuXG4gICAgbG9hZChjb250YWluZXIpIHtcbiAgICAgICAgLy8gb25seSByZWdpc3RlciBldmVudHMgaWYgdGhlcmUncyBhbiBhY2Nlc3MgdG9rZW4gYW5kIGl0IGhhcyBhbiBleHBpcmF0aW9uXG4gICAgICAgIGlmIChjb250YWluZXIuYWNjZXNzX3Rva2VuICYmIGNvbnRhaW5lci5leHBpcmVzX2luICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGNvbnRhaW5lci5leHBpcmVzX2luO1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiQWNjZXNzVG9rZW5FdmVudHMubG9hZDogYWNjZXNzIHRva2VuIHByZXNlbnQsIHJlbWFpbmluZyBkdXJhdGlvbjpcIiwgZHVyYXRpb24pO1xuXG4gICAgICAgICAgICBpZiAoZHVyYXRpb24gPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSByZWdpc3RlciBleHBpcmluZyBpZiB3ZSBzdGlsbCBoYXZlIHRpbWVcbiAgICAgICAgICAgICAgICBsZXQgZXhwaXJpbmcgPSBkdXJhdGlvbiAtIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lO1xuICAgICAgICAgICAgICAgIGlmIChleHBpcmluZyA8PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJpbmcgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJBY2Nlc3NUb2tlbkV2ZW50cy5sb2FkOiByZWdpc3RlcmluZyBleHBpcmluZyB0aW1lciBpbjpcIiwgZXhwaXJpbmcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcuaW5pdChleHBpcmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJBY2Nlc3NUb2tlbkV2ZW50cy5sb2FkOiBjYW5jZWxpbmcgZXhpc3RpbmcgZXhwaXJpbmcgdGltZXIgYmVjYXNlIHdlJ3JlIHBhc3QgZXhwaXJhdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZy5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgaXQncyBuZWdhdGl2ZSwgaXQgd2lsbCBzdGlsbCBmaXJlXG4gICAgICAgICAgICBsZXQgZXhwaXJlZCA9IGR1cmF0aW9uICsgMTtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkFjY2Vzc1Rva2VuRXZlbnRzLmxvYWQ6IHJlZ2lzdGVyaW5nIGV4cGlyZWQgdGltZXIgaW46XCIsIGV4cGlyZWQpO1xuICAgICAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkLmluaXQoZXhwaXJlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLmNhbmNlbCgpO1xuICAgICAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5sb2FkKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJBY2Nlc3NUb2tlbkV2ZW50cy51bmxvYWQ6IGNhbmNlbGluZyBleGlzdGluZyBhY2Nlc3MgdG9rZW4gdGltZXJzXCIpO1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQuY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgYWRkQWNjZXNzVG9rZW5FeHBpcmluZyhjYikge1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVBY2Nlc3NUb2tlbkV4cGlyaW5nKGNiKSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuXG4gICAgYWRkQWNjZXNzVG9rZW5FeHBpcmVkKGNiKSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJlZC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlQWNjZXNzVG9rZW5FeHBpcmVkKGNiKSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJlZC5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmNvbnN0IERlZmF1bHRJbnRlcnZhbCA9IDIwMDA7XG5cbmV4cG9ydCBjbGFzcyBDaGVja1Nlc3Npb25JRnJhbWUge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCBjbGllbnRfaWQsIHVybCwgaW50ZXJ2YWwsIHN0b3BPbkVycm9yID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLl9jbGllbnRfaWQgPSBjbGllbnRfaWQ7XG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCBEZWZhdWx0SW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuX3N0b3BPbkVycm9yID0gc3RvcE9uRXJyb3I7XG5cbiAgICAgICAgdmFyIGlkeCA9IHVybC5pbmRleE9mKFwiL1wiLCB1cmwuaW5kZXhPZihcIi8vXCIpICsgMik7XG4gICAgICAgIHRoaXMuX2ZyYW1lX29yaWdpbiA9IHVybC5zdWJzdHIoMCwgaWR4KTtcblxuICAgICAgICB0aGlzLl9mcmFtZSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuXG4gICAgICAgIC8vIHNob3RndW4gYXBwcm9hY2hcbiAgICAgICAgdGhpcy5fZnJhbWUuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHRoaXMuX2ZyYW1lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLl9mcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuX2ZyYW1lLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5fZnJhbWUuaGVpZ2h0ID0gMDtcblxuICAgICAgICB0aGlzLl9mcmFtZS5zcmMgPSB1cmw7XG4gICAgfVxuICAgIGxvYWQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZnJhbWUpO1xuICAgICAgICAgICAgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQgPSB0aGlzLl9tZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9tZXNzYWdlKGUpIHtcbiAgICAgICAgaWYgKGUub3JpZ2luID09PSB0aGlzLl9mcmFtZV9vcmlnaW4gJiZcbiAgICAgICAgICAgIGUuc291cmNlID09PSB0aGlzLl9mcmFtZS5jb250ZW50V2luZG93XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGUuZGF0YSA9PT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiQ2hlY2tTZXNzaW9uSUZyYW1lOiBlcnJvciBtZXNzYWdlIGZyb20gY2hlY2sgc2Vzc2lvbiBvcCBpZnJhbWVcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0b3BPbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGUuZGF0YSA9PT0gXCJjaGFuZ2VkXCIpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJDaGVja1Nlc3Npb25JRnJhbWU6IGNoYW5nZWQgbWVzc2FnZSBmcm9tIGNoZWNrIHNlc3Npb24gb3AgaWZyYW1lXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJDaGVja1Nlc3Npb25JRnJhbWU6IFwiICsgZS5kYXRhICsgXCIgbWVzc2FnZSBmcm9tIGNoZWNrIHNlc3Npb24gb3AgaWZyYW1lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0KHNlc3Npb25fc3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Nlc3Npb25fc3RhdGUgIT09IHNlc3Npb25fc3RhdGUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNoZWNrU2Vzc2lvbklGcmFtZS5zdGFydFwiKTtcblxuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25fc3RhdGUgPSBzZXNzaW9uX3N0YXRlO1xuXG4gICAgICAgICAgICBsZXQgc2VuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKHRoaXMuX2NsaWVudF9pZCArIFwiIFwiICsgdGhpcy5fc2Vzc2lvbl9zdGF0ZSwgdGhpcy5fZnJhbWVfb3JpZ2luKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgbm93XG4gICAgICAgICAgICBzZW5kKCk7XG5cbiAgICAgICAgICAgIC8vIGFuZCBzZXR1cCB0aW1lclxuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoc2VuZCwgdGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5fc2Vzc2lvbl9zdGF0ZSA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJDaGVja1Nlc3Npb25JRnJhbWUuc3RvcFwiKTtcblxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5fdGltZXIpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENsb2NrU2VydmljZSB7XG4gICAgZ2V0RXBvY2hUaW1lKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKERhdGUubm93KCkgLyAxMDAwIHwgMCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgQ29yZG92YVBvcHVwV2luZG93IH0gZnJvbSAnLi9Db3Jkb3ZhUG9wdXBXaW5kb3cuanMnO1xuXG5leHBvcnQgY2xhc3MgQ29yZG92YUlGcmFtZU5hdmlnYXRvciB7XG5cbiAgICBwcmVwYXJlKHBhcmFtcykge1xuICAgICAgICBwYXJhbXMucG9wdXBXaW5kb3dGZWF0dXJlcyA9ICdoaWRkZW49eWVzJztcbiAgICAgICAgbGV0IHBvcHVwID0gbmV3IENvcmRvdmFQb3B1cFdpbmRvdyhwYXJhbXMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBvcHVwKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBDb3Jkb3ZhUG9wdXBXaW5kb3cgfSBmcm9tICcuL0NvcmRvdmFQb3B1cFdpbmRvdy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDb3Jkb3ZhUG9wdXBOYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZShwYXJhbXMpIHtcbiAgICAgICAgbGV0IHBvcHVwID0gbmV3IENvcmRvdmFQb3B1cFdpbmRvdyhwYXJhbXMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBvcHVwKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmNvbnN0IERlZmF1bHRQb3B1cEZlYXR1cmVzID0gJ2xvY2F0aW9uPW5vLHRvb2xiYXI9bm8sem9vbT1ubyc7XG5jb25zdCBEZWZhdWx0UG9wdXBUYXJnZXQgPSBcIl9ibGFua1wiO1xuXG5leHBvcnQgY2xhc3MgQ29yZG92YVBvcHVwV2luZG93IHtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZmVhdHVyZXMgPSBwYXJhbXMucG9wdXBXaW5kb3dGZWF0dXJlcyB8fCBEZWZhdWx0UG9wdXBGZWF0dXJlcztcbiAgICAgICAgdGhpcy50YXJnZXQgPSBwYXJhbXMucG9wdXBXaW5kb3dUYXJnZXQgfHwgRGVmYXVsdFBvcHVwVGFyZ2V0O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWRpcmVjdF91cmkgPSBwYXJhbXMuc3RhcnRVcmw7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkNvcmRvdmFQb3B1cFdpbmRvdy5jdG9yOiByZWRpcmVjdF91cmk6IFwiICsgdGhpcy5yZWRpcmVjdF91cmkpO1xuICAgIH1cblxuICAgIF9pc0luQXBwQnJvd3Nlckluc3RhbGxlZChjb3Jkb3ZhTWV0YWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIFtcImNvcmRvdmEtcGx1Z2luLWluYXBwYnJvd3NlclwiLCBcImNvcmRvdmEtcGx1Z2luLWluYXBwYnJvd3Nlci5pbmFwcGJyb3dzZXJcIiwgXCJvcmcuYXBhY2hlLmNvcmRvdmEuaW5hcHBicm93c2VyXCJdLnNvbWUoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb3Jkb3ZhTWV0YWRhdGEuaGFzT3duUHJvcGVydHkobmFtZSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgbmF2aWdhdGUocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMudXJsKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIk5vIHVybCBwcm92aWRlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghd2luZG93LmNvcmRvdmEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXJyb3IoXCJjb3Jkb3ZhIGlzIHVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgY29yZG92YU1ldGFkYXRhID0gd2luZG93LmNvcmRvdmEucmVxdWlyZShcImNvcmRvdmEvcGx1Z2luX2xpc3RcIikubWV0YWRhdGE7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNJbkFwcEJyb3dzZXJJbnN0YWxsZWQoY29yZG92YU1ldGFkYXRhKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXJyb3IoXCJJbkFwcEJyb3dzZXIgcGx1Z2luIG5vdCBmb3VuZFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcG9wdXAgPSBjb3Jkb3ZhLkluQXBwQnJvd3Nlci5vcGVuKHBhcmFtcy51cmwsIHRoaXMudGFyZ2V0LCB0aGlzLmZlYXR1cmVzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNvcmRvdmFQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogcG9wdXAgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5fZXhpdENhbGxiYWNrRXZlbnQgPSB0aGlzLl9leGl0Q2FsbGJhY2suYmluZCh0aGlzKTsgXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFN0YXJ0Q2FsbGJhY2tFdmVudCA9IHRoaXMuX2xvYWRTdGFydENhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcImV4aXRcIiwgdGhpcy5fZXhpdENhbGxiYWNrRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsIHRoaXMuX2xvYWRTdGFydENhbGxiYWNrRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJFcnJvciBvcGVuaW5nIHBvcHVwIHdpbmRvd1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldCBwcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG5cbiAgICBfbG9hZFN0YXJ0Q2FsbGJhY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnVybC5pbmRleE9mKHRoaXMucmVkaXJlY3RfdXJpKSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3VjY2Vzcyh7IHVybDogZXZlbnQudXJsIH0pO1xuICAgICAgICB9ICAgIFxuICAgIH1cbiAgICBfZXhpdENhbGxiYWNrKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5fZXJyb3IobWVzc2FnZSk7ICAgIFxuICAgIH1cbiAgICBcbiAgICBfc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcblxuICAgICAgICBMb2cuZGVidWcoXCJDb3Jkb3ZhUG9wdXBXaW5kb3c6IFN1Y2Nlc3NmdWwgcmVzcG9uc2UgZnJvbSBjb3Jkb3ZhIHBvcHVwIHdpbmRvd1wiKTtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZShkYXRhKTtcbiAgICB9XG4gICAgX2Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgICAgIExvZy5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fcmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICB9XG5cbiAgICBfY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BvcHVwKXtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNvcmRvdmFQb3B1cFdpbmRvdzogY2xlYW5pbmcgdXAgcG9wdXBcIik7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhpdFwiLCB0aGlzLl9leGl0Q2FsbGJhY2tFdmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRzdGFydFwiLCB0aGlzLl9sb2FkU3RhcnRDYWxsYmFja0V2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BvcHVwID0gbnVsbDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBFcnJvclJlc3BvbnNlIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHtlcnJvciwgZXJyb3JfZGVzY3JpcHRpb24sIGVycm9yX3VyaSwgc3RhdGUsIHNlc3Npb25fc3RhdGV9PXt9XG4gICAgKSB7XG4gICAgICAgICBpZiAoIWVycm9yKXtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk5vIGVycm9yIHBhc3NlZCB0byBFcnJvclJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXJyb3JcIik7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlcihlcnJvcl9kZXNjcmlwdGlvbiB8fCBlcnJvcik7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gXCJFcnJvclJlc3BvbnNlXCI7XG5cbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLmVycm9yX2Rlc2NyaXB0aW9uID0gZXJyb3JfZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZXJyb3JfdXJpID0gZXJyb3JfdXJpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zZXNzaW9uX3N0YXRlID0gc2Vzc2lvbl9zdGF0ZTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBFdmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRIYW5kbGVyKGNiKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICB9XG5cbiAgICByZW1vdmVIYW5kbGVyKGNiKSB7XG4gICAgICAgIHZhciBpZHggPSB0aGlzLl9jYWxsYmFja3MuZmluZEluZGV4KGl0ZW0gPT4gaXRlbSA9PT0gY2IpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJhaXNlKC4uLnBhcmFtcykge1xuICAgICAgICBMb2cuZGVidWcoXCJFdmVudDogUmFpc2luZyBldmVudDogXCIgKyB0aGlzLl9uYW1lKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1tpXSguLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuY29uc3QgdGltZXIgPSB7XG4gICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uIChjYiwgZHVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHNldEludGVydmFsKGNiLCBkdXJhdGlvbik7XG4gICAgfSxcbiAgICBjbGVhckludGVydmFsOiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHJldHVybiBjbGVhckludGVydmFsKGhhbmRsZSk7XG4gICAgfVxufTtcblxubGV0IHRlc3RpbmcgPSBmYWxzZTtcbmxldCByZXF1ZXN0ID0gbnVsbDtcblxuZXhwb3J0IGNsYXNzIEdsb2JhbCB7XG5cbiAgICBzdGF0aWMgX3Rlc3RpbmcoKSB7XG4gICAgICAgIHRlc3RpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbG9jYXRpb24oKSB7XG4gICAgICAgIGlmICghdGVzdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsb2NhbFN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICghdGVzdGluZyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgc2Vzc2lvblN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICghdGVzdGluZyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFhNTEh0dHBSZXF1ZXN0KG5ld1JlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdCA9IG5ld1JlcXVlc3Q7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBYTUxIdHRwUmVxdWVzdCgpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCB8fCBYTUxIdHRwUmVxdWVzdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgdGltZXIoKSB7XG4gICAgICAgIGlmICghdGVzdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVyO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgSUZyYW1lV2luZG93IH0gZnJvbSAnLi9JRnJhbWVXaW5kb3cuanMnO1xuXG5leHBvcnQgY2xhc3MgSUZyYW1lTmF2aWdhdG9yIHtcblxuICAgIHByZXBhcmUocGFyYW1zKSB7XG4gICAgICAgIGxldCBmcmFtZSA9IG5ldyBJRnJhbWVXaW5kb3cocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmcmFtZSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2sodXJsKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZU5hdmlnYXRvci5jYWxsYmFja1wiKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgSUZyYW1lV2luZG93Lm5vdGlmeVBhcmVudCh1cmwpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmNvbnN0IERlZmF1bHRUaW1lb3V0ID0gMTAwMDA7XG5cbmV4cG9ydCBjbGFzcyBJRnJhbWVXaW5kb3cge1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQgPSB0aGlzLl9tZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuX2ZyYW1lID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG5cbiAgICAgICAgLy8gc2hvdGd1biBhcHByb2FjaFxuICAgICAgICB0aGlzLl9mcmFtZS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGhpcy5fZnJhbWUuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMuX2ZyYW1lLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5fZnJhbWUuaGVpZ2h0ID0gMDtcblxuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9mcmFtZSk7XG4gICAgfVxuXG4gICAgbmF2aWdhdGUocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMudXJsKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIk5vIHVybCBwcm92aWRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0aW1lb3V0ID0gcGFyYW1zLnNpbGVudFJlcXVlc3RUaW1lb3V0IHx8IERlZmF1bHRUaW1lb3V0O1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93Lm5hdmlnYXRlOiBVc2luZyB0aW1lb3V0IG9mOlwiLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQodGhpcy5fdGltZW91dC5iaW5kKHRoaXMpLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lLnNyYyA9IHBhcmFtcy51cmw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldCBwcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG5cbiAgICBfc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcblxuICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3c6IFN1Y2Nlc3NmdWwgcmVzcG9uc2UgZnJvbSBmcmFtZSB3aW5kb3dcIik7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUoZGF0YSk7XG4gICAgfVxuICAgIF9lcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcblxuICAgICAgICBMb2cuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuX3JlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgfVxuXG4gICAgX2NsZWFudXAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9mcmFtZSkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93OiBjbGVhbnVwXCIpO1xuXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fZnJhbWUpO1xuXG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdGltZW91dCgpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93LnRpbWVvdXRcIik7XG4gICAgICAgIHRoaXMuX2Vycm9yKFwiRnJhbWUgd2luZG93IHRpbWVkIG91dFwiKTtcbiAgICB9XG5cbiAgICBfbWVzc2FnZShlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdy5tZXNzYWdlXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLl90aW1lciAmJlxuICAgICAgICAgICAgZS5vcmlnaW4gPT09IHRoaXMuX29yaWdpbiAmJlxuICAgICAgICAgICAgZS5zb3VyY2UgPT09IHRoaXMuX2ZyYW1lLmNvbnRlbnRXaW5kb3cgJiZcbiAgICAgICAgICAgICh0eXBlb2YgZS5kYXRhID09PSAnc3RyaW5nJyAmJiAoZS5kYXRhLnN0YXJ0c1dpdGgoJ2h0dHA6Ly8nKSB8fCBlLmRhdGEuc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKSkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgbGV0IHVybCA9IGUuZGF0YTtcbiAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWNjZXNzKHsgdXJsOiB1cmwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvcihcIkludmFsaWQgcmVzcG9uc2UgZnJvbSBmcmFtZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBfb3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICAgIH1cblxuICAgIHN0YXRpYyBub3RpZnlQYXJlbnQodXJsKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdy5ub3RpZnlQYXJlbnRcIik7XG4gICAgICAgIHVybCA9IHVybCB8fCB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93Lm5vdGlmeVBhcmVudDogcG9zdGluZyB1cmwgbWVzc2FnZSB0byBwYXJlbnRcIik7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHVybCwgbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIEluTWVtb3J5V2ViU3RvcmFnZXtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuXG4gICAgZ2V0SXRlbShrZXkpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSW5NZW1vcnlXZWJTdG9yYWdlLmdldEl0ZW1cIiwga2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFba2V5XTtcbiAgICB9XG5cbiAgICBzZXRJdGVtKGtleSwgdmFsdWUpe1xuICAgICAgICBMb2cuZGVidWcoXCJJbk1lbW9yeVdlYlN0b3JhZ2Uuc2V0SXRlbVwiLCBrZXkpO1xuICAgICAgICB0aGlzLl9kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGtleSl7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkluTWVtb3J5V2ViU3RvcmFnZS5yZW1vdmVJdGVtXCIsIGtleSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhW2tleV07XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX2RhdGEpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBrZXkoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX2RhdGEpW2luZGV4XTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG4vLyBKV1QgcGFyc2luZyBhbmQgdmFsaWRhdGlvbi5cbi8vIC0gU2lnbmF0dXJlcyBhcmUgdmVyaWZpZWQgd2l0aCBXZWJDcnlwdG8gKGNyeXB0by5zdWJ0bGUpOiBSUy9QUy9FUyAyNTYvMzg0LzUxMi5cbi8vIC0gSGFzaGluZyAoYXRfaGFzaCAvIGNfaGFzaCAvIFBLQ0UpIHVzZXMgY3J5cHRvLWpzLlxuLy8gLSBCYXNlNjQgZGVjb2RpbmcgdXNlcyBiYXNlNjQtanMuXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCBTSEEyNTYgZnJvbSAnY3J5cHRvLWpzL3NoYTI1Ni5qcyc7XG5pbXBvcnQgU0hBMzg0IGZyb20gJ2NyeXB0by1qcy9zaGEzODQuanMnO1xuaW1wb3J0IFNIQTUxMiBmcm9tICdjcnlwdG8tanMvc2hhNTEyLmpzJztcbmltcG9ydCBIZXggZnJvbSAnY3J5cHRvLWpzL2VuYy1oZXguanMnO1xuaW1wb3J0IEJhc2U2NCBmcm9tICdjcnlwdG8tanMvZW5jLWJhc2U2NC5qcyc7XG5pbXBvcnQgeyB0b0J5dGVBcnJheSB9IGZyb20gJ2Jhc2U2NC1qcyc7XG5cbmNvbnN0IEFsbG93ZWRTaWduaW5nQWxncyA9IFsnUlMyNTYnLCAnUlMzODQnLCAnUlM1MTInLCAnUFMyNTYnLCAnUFMzODQnLCAnUFM1MTInLCAnRVMyNTYnLCAnRVMzODQnLCAnRVM1MTInXTtcblxuY29uc3QgSGFzaGVycyA9IHsgc2hhMjU2OiBTSEEyNTYsIHNoYTM4NDogU0hBMzg0LCBzaGE1MTI6IFNIQTUxMiB9O1xuXG5mdW5jdGlvbiBiNjRUb0J5dGVzKHMpIHtcbiAgICBzID0gcy5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgd2hpbGUgKHMubGVuZ3RoICUgNCkge1xuICAgICAgICBzICs9ICc9JztcbiAgICB9XG4gICAgcmV0dXJuIHRvQnl0ZUFycmF5KHMpO1xufVxuXG5mdW5jdGlvbiB1dGY4RGVjb2RlKGJ5dGVzKSB7XG4gICAgbGV0IGVzY2FwZWQgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVzY2FwZWQgKz0gJyUnICsgKCcwJyArIGJ5dGVzW2ldLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZWQpO1xufVxuXG5mdW5jdGlvbiBiNjR1VG9Kc29uKHMpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh1dGY4RGVjb2RlKGI2NFRvQnl0ZXMocykpKTtcbn1cblxuLy8gVGhlIEpXUyBzaWduaW5nIGlucHV0IGlzIGJhc2U2NHVybCB0ZXh0LCBpLmUuIHB1cmUgQVNDSUlcbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyhzKSB7XG4gICAgY29uc3Qgb3V0ID0gbmV3IFVpbnQ4QXJyYXkocy5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBvdXRbaV0gPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFN1YnRsZSgpIHtcbiAgICBjb25zdCBjID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jcnlwdG8pIHx8XG4gICAgICAgICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcy5jcnlwdG8pIHx8XG4gICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuY3J5cHRvKTtcbiAgICBpZiAoIWMgfHwgIWMuc3VidGxlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViQ3J5cHRvIChjcnlwdG8uc3VidGxlKSBpcyBub3QgYXZhaWxhYmxlOyBhIHNlY3VyZSBjb250ZXh0IChodHRwcykgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGMuc3VidGxlO1xufVxuXG4vLyBNaW5pbWFsIERFUiByZWFkZXI6IHJldHVybnMgdGFnLCBjb250ZW50IHN0YXJ0L2VuZCBhbmQgdGhlIGZ1bGwgZWxlbWVudCBlbmRcbmZ1bmN0aW9uIHJlYWRUbHYoYnl0ZXMsIG9mZnNldCkge1xuICAgIGNvbnN0IHRhZyA9IGJ5dGVzW29mZnNldF07XG4gICAgbGV0IGxlbiA9IGJ5dGVzW29mZnNldCArIDFdO1xuICAgIGxldCBzdGFydCA9IG9mZnNldCArIDI7XG4gICAgaWYgKGxlbiAmIDB4ODApIHtcbiAgICAgICAgY29uc3QgbiA9IGxlbiAmIDB4N2Y7XG4gICAgICAgIGlmIChuIDwgMSB8fCBuID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBERVIgbGVuZ3RoJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGxlbiA9IChsZW4gKiAyNTYpICsgYnl0ZXNbc3RhcnQgKyBpXTtcbiAgICAgICAgfVxuICAgICAgICBzdGFydCArPSBuO1xuICAgIH1cbiAgICBjb25zdCBlbmQgPSBzdGFydCArIGxlbjtcbiAgICBpZiAoZW5kID4gYnl0ZXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHJ1bmNhdGVkIERFUiBlbGVtZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiB7IHRhZywgc3RhcnQsIGVuZCB9O1xufVxuXG4vLyBFeHRyYWN0cyB0aGUgREVSIFN1YmplY3RQdWJsaWNLZXlJbmZvIGZyb20gYSBERVIgWC41MDkgY2VydGlmaWNhdGVcbmZ1bmN0aW9uIHNwa2lGcm9tQ2VydGlmaWNhdGUoZGVyKSB7XG4gICAgY29uc3QgY2VydCA9IHJlYWRUbHYoZGVyLCAwKTtcbiAgICBpZiAoY2VydC50YWcgIT09IDB4MzApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNlcnRpZmljYXRlJyk7XG4gICAgfVxuICAgIGNvbnN0IHRicyA9IHJlYWRUbHYoZGVyLCBjZXJ0LnN0YXJ0KTtcbiAgICBpZiAodGJzLnRhZyAhPT0gMHgzMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY2VydGlmaWNhdGUnKTtcbiAgICB9XG4gICAgbGV0IHBvcyA9IHRicy5zdGFydDtcbiAgICBsZXQgZWwgPSByZWFkVGx2KGRlciwgcG9zKTtcbiAgICBpZiAoZWwudGFnID09PSAweGEwKSB7IC8vIFswXSB2ZXJzaW9uXG4gICAgICAgIHBvcyA9IGVsLmVuZDtcbiAgICAgICAgZWwgPSByZWFkVGx2KGRlciwgcG9zKTtcbiAgICB9XG4gICAgLy8gc2VyaWFsTnVtYmVyLCBzaWduYXR1cmUsIGlzc3VlciwgdmFsaWRpdHksIHN1YmplY3RcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBwb3MgPSBlbC5lbmQ7XG4gICAgICAgIGVsID0gcmVhZFRsdihkZXIsIHBvcyk7XG4gICAgfVxuICAgIGlmIChlbC50YWcgIT09IDB4MzApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNlcnRpZmljYXRlOiBzdWJqZWN0UHVibGljS2V5SW5mbyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlci5zbGljZShwb3MsIGVsLmVuZCk7XG59XG5cbi8vIE5vcm1hbGl6ZXMgYSBKV0sgaW50byB3aGF0IFdlYkNyeXB0byBpbXBvcnRLZXkgYWNjZXB0cy5cbi8vIEV4dHJhIG1lbWJlcnMgKGFsZywgdXNlLCBrZXlfb3BzLCBraWQsIHg1dC4uLikgYXJlIGRyb3BwZWQgYmVjYXVzZSB0aGV5IGNhbiBtYWtlIGltcG9ydEtleSByZWplY3QuXG5mdW5jdGlvbiByZXNvbHZlS2V5KGtleSkge1xuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQga2V5IHR5cGU6ICcgKyBrZXkpO1xuICAgIH1cbiAgICBpZiAoa2V5Lmt0eSA9PT0gJ1JTQScpIHtcbiAgICAgICAgaWYgKGtleS5lICYmIGtleS5uKSB7XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdSU0EnLCBmb3JtYXQ6ICdqd2snLCBkYXRhOiB7IGt0eTogJ1JTQScsIG46IGtleS5uLCBlOiBrZXkuZSwgZXh0OiB0cnVlIH0gfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5Lng1YyAmJiBrZXkueDVjLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHsga3R5OiAnUlNBJywgZm9ybWF0OiAnc3BraScsIGRhdGE6IHNwa2lGcm9tQ2VydGlmaWNhdGUoYjY0VG9CeXRlcyhrZXkueDVjWzBdKSkgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JTQSBrZXkgbWlzc2luZyBrZXkgbWF0ZXJpYWwnKTtcbiAgICB9XG4gICAgaWYgKGtleS5rdHkgPT09ICdFQycpIHtcbiAgICAgICAgaWYgKGtleS5jcnYgJiYga2V5LnggJiYga2V5LnkpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ0VDJywgY3J2OiBrZXkuY3J2LCBmb3JtYXQ6ICdqd2snLCBkYXRhOiB7IGt0eTogJ0VDJywgY3J2OiBrZXkuY3J2LCB4OiBrZXkueCwgeToga2V5LnksIGV4dDogdHJ1ZSB9IH07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFQyBrZXkgbWlzc2luZyBrZXkgbWF0ZXJpYWwnKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBrZXkgdHlwZTogJyArIGtleS5rdHkpO1xufVxuXG4vLyBNYXBzIGEgSldTIGFsZyB0byBXZWJDcnlwdG8gaW1wb3J0L3ZlcmlmeSBwYXJhbWV0ZXJzXG5mdW5jdGlvbiBhbGdQYXJhbXMoYWxnKSB7XG4gICAgY29uc3QgYml0cyA9IGFsZy5zdWJzdHIoMik7XG4gICAgY29uc3QgaGFzaCA9IHsgbmFtZTogJ1NIQS0nICsgYml0cyB9O1xuICAgIHN3aXRjaCAoYWxnLnN1YnN0cigwLCAyKSkge1xuICAgICAgICBjYXNlICdSUyc6XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdSU0EnLCBpbXBvcnRBbGc6IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JywgaGFzaCB9LCB2ZXJpZnlBbGc6IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JyB9IH07XG4gICAgICAgIGNhc2UgJ1BTJzpcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ1JTQScsIGltcG9ydEFsZzogeyBuYW1lOiAnUlNBLVBTUycsIGhhc2ggfSwgdmVyaWZ5QWxnOiB7IG5hbWU6ICdSU0EtUFNTJywgc2FsdExlbmd0aDogcGFyc2VJbnQoYml0cywgMTApIC8gOCB9IH07XG4gICAgICAgIGNhc2UgJ0VTJzoge1xuICAgICAgICAgICAgY29uc3QgY3VydmUgPSB7ICcyNTYnOiAnUC0yNTYnLCAnMzg0JzogJ1AtMzg0JywgJzUxMic6ICdQLTUyMScgfVtiaXRzXTtcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ0VDJywgY3VydmUsIGltcG9ydEFsZzogeyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiBjdXJ2ZSB9LCB2ZXJpZnlBbGc6IHsgbmFtZTogJ0VDRFNBJywgaGFzaCB9IH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBhbGc6ICcgKyBhbGcpO1xufVxuXG5leHBvcnQgY2xhc3MgSm9zZVV0aWwge1xuXG4gICAgc3RhdGljIHBhcnNlSnd0KGp3dCkge1xuICAgICAgICBMb2cuZGVidWcoXCJKb3NlVXRpbC5wYXJzZUp3dFwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gand0LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgSldUJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhlYWRlcjogYjY0dVRvSnNvbihwYXJ0c1swXSksXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogYjY0dVRvSnNvbihwYXJ0c1sxXSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB2YWxpZGF0ZUp3dChqd3QsIGtleSwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3LCBub3csIHRpbWVJbnNlbnNpdGl2ZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJKb3NlVXRpbC52YWxpZGF0ZUp3dFwiKTtcblxuICAgICAgICBsZXQgcmVzb2x2ZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNvbHZlZCA9IHJlc29sdmVLZXkoa2V5KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwudmFsaWRhdGVKd3Q6IFwiICsgKGUgJiYgZS5tZXNzYWdlKSwga2V5KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBKb3NlVXRpbC52YWxpZGF0ZUp3dEF0dHJpYnV0ZXMoand0LCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXcsIG5vdywgdGltZUluc2Vuc2l0aXZlKS50aGVuKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEpvc2VVdGlsLl92ZXJpZnlTaWduYXR1cmUoand0LCByZXNvbHZlZCkudGhlbih2YWxpZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IHNpZ25hdHVyZSB2YWxpZGF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcInNpZ25hdHVyZSB2YWxpZGF0aW9uIGZhaWxlZFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgICAgICAgICAgfSwgZSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKGUgJiYgZS5tZXNzYWdlIHx8IGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzaWduYXR1cmUgdmFsaWRhdGlvbiBmYWlsZWRcIikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdmVyaWZ5U2lnbmF0dXJlKGp3dCwgcmVzb2x2ZWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gand0LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBjb25zdCBhbGcgPSBiNjR1VG9Kc29uKHBhcnRzWzBdKS5hbGc7XG4gICAgICAgICAgICBpZiAoQWxsb3dlZFNpZ25pbmdBbGdzLmluZGV4T2YoYWxnKSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FsZyBub3QgYWxsb3dlZDogJyArIGFsZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwID0gYWxnUGFyYW1zKGFsZyk7XG4gICAgICAgICAgICBpZiAocC5rdHkgIT09IHJlc29sdmVkLmt0eSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignS2V5IHR5cGUgJyArIHJlc29sdmVkLmt0eSArICcgZG9lcyBub3QgbWF0Y2ggYWxnICcgKyBhbGcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHAuY3VydmUgJiYgcmVzb2x2ZWQuY3J2ICYmIHAuY3VydmUgIT09IHJlc29sdmVkLmNydikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRUMga2V5IGN1cnZlICcgKyByZXNvbHZlZC5jcnYgKyAnIGRvZXMgbm90IG1hdGNoIGFsZyAnICsgYWxnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN1YnRsZSA9IGdldFN1YnRsZSgpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGFzY2lpVG9CeXRlcyhwYXJ0c1swXSArICcuJyArIHBhcnRzWzFdKTtcbiAgICAgICAgICAgIC8vIEpXUyBFQ0RTQSBzaWduYXR1cmVzIGFyZSByYXcgcnx8cywgd2hpY2ggaXMgdGhlIGZvcm1hdCBXZWJDcnlwdG8gZXhwZWN0c1xuICAgICAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYjY0VG9CeXRlcyhwYXJ0c1syXSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHN1YnRsZS5pbXBvcnRLZXkocmVzb2x2ZWQuZm9ybWF0LCByZXNvbHZlZC5kYXRhLCBwLmltcG9ydEFsZywgZmFsc2UsIFsndmVyaWZ5J10pKVxuICAgICAgICAgICAgICAgIC50aGVuKGNyeXB0b0tleSA9PiBzdWJ0bGUudmVyaWZ5KHAudmVyaWZ5QWxnLCBjcnlwdG9LZXksIHNpZ25hdHVyZSwgZGF0YSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdmFsaWRhdGVKd3RBdHRyaWJ1dGVzKGp3dCwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3LCBub3csIHRpbWVJbnNlbnNpdGl2ZSkge1xuICAgICAgICBpZiAoIWNsb2NrU2tldykge1xuICAgICAgICAgICAgY2xvY2tTa2V3ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbm93KSB7XG4gICAgICAgICAgICBub3cgPSBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJzZWQgPSBKb3NlVXRpbC5wYXJzZUp3dChqd3QpO1xuICAgICAgICBpZiAoIXBhcnNlZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBKV1RcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBwYXJzZWQucGF5bG9hZDtcblxuICAgICAgICBpZiAoIXBheWxvYWQuaXNzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IGlzc3VlciB3YXMgbm90IHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImlzc3VlciB3YXMgbm90IHByb3ZpZGVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5pc3MgIT09IGlzc3Vlcikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBJbnZhbGlkIGlzc3VlciBpbiB0b2tlblwiLCBwYXlsb2FkLmlzcyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBpc3N1ZXIgaW4gdG9rZW46IFwiICsgcGF5bG9hZC5pc3MpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGF5bG9hZC5hdWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogYXVkIHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXVkIHdhcyBub3QgcHJvdmlkZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbGlkQXVkaWVuY2UgPSBwYXlsb2FkLmF1ZCA9PT0gYXVkaWVuY2UgfHwgKEFycmF5LmlzQXJyYXkocGF5bG9hZC5hdWQpICYmIHBheWxvYWQuYXVkLmluZGV4T2YoYXVkaWVuY2UpID49IDApO1xuICAgICAgICBpZiAoIXZhbGlkQXVkaWVuY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogSW52YWxpZCBhdWRpZW5jZSBpbiB0b2tlblwiLCBwYXlsb2FkLmF1ZCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBhdWRpZW5jZSBpbiB0b2tlbjogXCIgKyBwYXlsb2FkLmF1ZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmF6cCAmJiBwYXlsb2FkLmF6cCAhPT0gYXVkaWVuY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogSW52YWxpZCBhenAgaW4gdG9rZW5cIiwgcGF5bG9hZC5henApO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgYXpwIGluIHRva2VuOiBcIiArIHBheWxvYWQuYXpwKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRpbWVJbnNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgY29uc3QgbG93ZXJOb3cgPSBub3cgKyBjbG9ja1NrZXc7XG4gICAgICAgICAgICBjb25zdCB1cHBlck5vdyA9IG5vdyAtIGNsb2NrU2tldztcblxuICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmlhdCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogaWF0IHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImlhdCB3YXMgbm90IHByb3ZpZGVkXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsb3dlck5vdyA8IHBheWxvYWQuaWF0KSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBpYXQgaXMgaW4gdGhlIGZ1dHVyZVwiLCBwYXlsb2FkLmlhdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImlhdCBpcyBpbiB0aGUgZnV0dXJlOiBcIiArIHBheWxvYWQuaWF0KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXlsb2FkLm5iZiAmJiBsb3dlck5vdyA8IHBheWxvYWQubmJmKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBuYmYgaXMgaW4gdGhlIGZ1dHVyZVwiLCBwYXlsb2FkLm5iZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIm5iZiBpcyBpbiB0aGUgZnV0dXJlOiBcIiArIHBheWxvYWQubmJmKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcGF5bG9hZC5leHApIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IGV4cCB3YXMgbm90IHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJleHAgd2FzIG5vdCBwcm92aWRlZFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5leHAgPCB1cHBlck5vdykge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogZXhwIGlzIGluIHRoZSBwYXN0XCIsIHBheWxvYWQuZXhwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiZXhwIGlzIGluIHRoZSBwYXN0OlwiICsgcGF5bG9hZC5leHApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocGF5bG9hZCk7XG4gICAgfVxuXG4gICAgLy8gVVRGLTggaW5wdXQsIGxvd2VyY2FzZSBoZXggb3V0cHV0XG4gICAgc3RhdGljIGhhc2hTdHJpbmcodmFsdWUsIGFsZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaGFzaGVyID0gSGFzaGVyc1tTdHJpbmcoYWxnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCAnJyldO1xuICAgICAgICAgICAgaWYgKCFoYXNoZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGhhc2ggYWxnOiAnICsgYWxnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoYXNoZXIodmFsdWUpLnRvU3RyaW5nKEhleCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBoZXhUb0Jhc2U2NFVybCh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEJhc2U2NC5zdHJpbmdpZnkoSGV4LnBhcnNlKHZhbHVlKSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICdfJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvPSskLywgJycpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBKc29uU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGFkZGl0aW9uYWxDb250ZW50VHlwZXMgPSBudWxsLCBcbiAgICAgICAgWE1MSHR0cFJlcXVlc3RDdG9yID0gR2xvYmFsLlhNTEh0dHBSZXF1ZXN0LCBcbiAgICAgICAgand0SGFuZGxlciA9IG51bGxcbiAgICApIHtcbiAgICAgICAgaWYgKGFkZGl0aW9uYWxDb250ZW50VHlwZXMgJiYgQXJyYXkuaXNBcnJheShhZGRpdGlvbmFsQ29udGVudFR5cGVzKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFR5cGVzID0gYWRkaXRpb25hbENvbnRlbnRUeXBlcy5zbGljZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFR5cGVzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29udGVudFR5cGVzLnB1c2goJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgaWYgKGp3dEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRUeXBlcy5wdXNoKCdhcHBsaWNhdGlvbi9qd3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX1hNTEh0dHBSZXF1ZXN0ID0gWE1MSHR0cFJlcXVlc3RDdG9yO1xuICAgICAgICB0aGlzLl9qd3RIYW5kbGVyID0gand0SGFuZGxlcjtcbiAgICB9XG5cbiAgICBnZXRKc29uKHVybCwgdG9rZW4pIHtcbiAgICAgICAgaWYgKCF1cmwpe1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogTm8gdXJsIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVybFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIkpzb25TZXJ2aWNlLmdldEpzb24sIHVybDogXCIsIHVybCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgdmFyIHJlcSA9IG5ldyB0aGlzLl9YTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybCk7XG5cbiAgICAgICAgICAgIHZhciBhbGxvd2VkQ29udGVudFR5cGVzID0gdGhpcy5fY29udGVudFR5cGVzO1xuICAgICAgICAgICAgdmFyIGp3dEhhbmRsZXIgPSB0aGlzLl9qd3RIYW5kbGVyO1xuXG4gICAgICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogSFRUUCByZXNwb25zZSByZWNlaXZlZCwgc3RhdHVzXCIsIHJlcS5zdGF0dXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50VHlwZSA9IHJlcS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGFsbG93ZWRDb250ZW50VHlwZXMuZmluZChpdGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlLnN0YXJ0c1dpdGgoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSBcImFwcGxpY2F0aW9uL2p3dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgand0SGFuZGxlcihyZXEpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogRXJyb3IgcGFyc2luZyBKU09OIHJlc3BvbnNlXCIsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIkludmFsaWQgcmVzcG9uc2UgQ29udGVudC1UeXBlOiBcIiArIGNvbnRlbnRUeXBlICsgXCIsIGZyb20gVVJMOiBcIiArIHVybCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKHJlcS5zdGF0dXNUZXh0ICsgXCIgKFwiICsgcmVxLnN0YXR1cyArIFwiKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5nZXRKc29uOiBuZXR3b3JrIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogdG9rZW4gcGFzc2VkLCBzZXR0aW5nIEF1dGhvcml6YXRpb24gaGVhZGVyXCIpO1xuICAgICAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcG9zdEZvcm0odXJsLCBwYXlsb2FkLCBiYXNpY0F1dGgpIHtcbiAgICAgICAgaWYgKCF1cmwpe1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IE5vIHVybCBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1cmxcIik7XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJKc29uU2VydmljZS5wb3N0Rm9ybSwgdXJsOiBcIiwgdXJsKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IHRoaXMuX1hNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXEub3BlbignUE9TVCcsIHVybCk7XG5cbiAgICAgICAgICAgIHZhciBhbGxvd2VkQ29udGVudFR5cGVzID0gdGhpcy5fY29udGVudFR5cGVzO1xuXG4gICAgICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IEhUVFAgcmVzcG9uc2UgcmVjZWl2ZWQsIHN0YXR1c1wiLCByZXEuc3RhdHVzKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXEuc3RhdHVzID09PSAyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSByZXEuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBhbGxvd2VkQ29udGVudFR5cGVzLmZpbmQoaXRlbT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZS5zdGFydHNXaXRoKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVxLnJlc3BvbnNlVGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiSW52YWxpZCByZXNwb25zZSBDb250ZW50LVR5cGU6IFwiICsgY29udGVudFR5cGUgKyBcIiwgZnJvbSBVUkw6IFwiICsgdXJsKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxLnN0YXR1cyA9PT0gNDAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0gcmVxLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gYWxsb3dlZENvbnRlbnRUeXBlcy5maW5kKGl0ZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUuc3RhcnRzV2l0aChpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWQgPSBKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZCAmJiBwYXlsb2FkLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5wb3N0Rm9ybTogRXJyb3IgZnJvbSBzZXJ2ZXI6IFwiLCBwYXlsb2FkLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocGF5bG9hZC5lcnJvcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKHJlcS5zdGF0dXNUZXh0ICsgXCIgKFwiICsgcmVxLnN0YXR1cyArIFwiKVwiKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBuZXR3b3JrIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IGJvZHkgPSBcIlwiO1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gcGF5bG9hZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcGF5bG9hZFtrZXldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSArPSBcIiZcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgKz0gXCI9XCI7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXG4gICAgICAgICAgICBpZiAoYmFzaWNBdXRoICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIFwiQmFzaWMgXCIgKyBidG9hKGJhc2ljQXV0aCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXEuc2VuZChib2R5KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxubGV0IG5vcExvZ2dlciA9IHtcbiAgICBkZWJ1Zygpe30sXG4gICAgaW5mbygpe30sXG4gICAgd2Fybigpe30sXG4gICAgZXJyb3IoKXt9XG59O1xuXG5jb25zdCBOT05FID0gMDtcbmNvbnN0IEVSUk9SID0gMTtcbmNvbnN0IFdBUk4gPSAyO1xuY29uc3QgSU5GTyA9IDM7XG5jb25zdCBERUJVRyA9IDQ7XG5cbmxldCBsb2dnZXI7XG5sZXQgbGV2ZWw7XG5cbmV4cG9ydCBjbGFzcyBMb2cge1xuICAgIHN0YXRpYyBnZXQgTk9ORSgpIHtyZXR1cm4gTk9ORX07XG4gICAgc3RhdGljIGdldCBFUlJPUigpIHtyZXR1cm4gRVJST1J9O1xuICAgIHN0YXRpYyBnZXQgV0FSTigpIHtyZXR1cm4gV0FSTn07XG4gICAgc3RhdGljIGdldCBJTkZPKCkge3JldHVybiBJTkZPfTtcbiAgICBzdGF0aWMgZ2V0IERFQlVHKCkge3JldHVybiBERUJVR307XG4gICAgXG4gICAgc3RhdGljIHJlc2V0KCl7XG4gICAgICAgIGxldmVsID0gSU5GTztcbiAgICAgICAgbG9nZ2VyID0gbm9wTG9nZ2VyO1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IGxldmVsKCl7XG4gICAgICAgIHJldHVybiBsZXZlbDtcbiAgICB9XG4gICAgc3RhdGljIHNldCBsZXZlbCh2YWx1ZSl7XG4gICAgICAgIGlmIChOT05FIDw9IHZhbHVlICYmIHZhbHVlIDw9IERFQlVHKXtcbiAgICAgICAgICAgIGxldmVsID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvZyBsZXZlbFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IGxvZ2dlcigpe1xuICAgICAgICByZXR1cm4gbG9nZ2VyO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IGxvZ2dlcih2YWx1ZSl7XG4gICAgICAgIGlmICghdmFsdWUuZGVidWcgJiYgdmFsdWUuaW5mbykge1xuICAgICAgICAgICAgLy8ganVzdCB0byBzdGF5IGJhY2t3YXJkcyBjb21wYXQuIGNhbiByZW1vdmUgaW4gMi4wXG4gICAgICAgICAgICB2YWx1ZS5kZWJ1ZyA9IHZhbHVlLmluZm87XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUuZGVidWcgJiYgdmFsdWUuaW5mbyAmJiB2YWx1ZS53YXJuICYmIHZhbHVlLmVycm9yKXtcbiAgICAgICAgICAgIGxvZ2dlciA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2dnZXJcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGRlYnVnKC4uLmFyZ3Mpe1xuICAgICAgICBpZiAobGV2ZWwgPj0gREVCVUcpe1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGluZm8oLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBJTkZPKXtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHdhcm4oLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBXQVJOKXtcbiAgICAgICAgICAgIGxvZ2dlci53YXJuLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGVycm9yKC4uLmFyZ3Mpe1xuICAgICAgICBpZiAobGV2ZWwgPj0gRVJST1Ipe1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkxvZy5yZXNldCgpO1xuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgSnNvblNlcnZpY2UgfSBmcm9tICcuL0pzb25TZXJ2aWNlLmpzJztcblxuY29uc3QgT2lkY01ldGFkYXRhVXJsUGF0aCA9ICcud2VsbC1rbm93bi9vcGVuaWQtY29uZmlndXJhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBNZXRhZGF0YVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBKc29uU2VydmljZUN0b3IgPSBKc29uU2VydmljZSkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJNZXRhZGF0YVNlcnZpY2U6IE5vIHNldHRpbmdzIHBhc3NlZCB0byBNZXRhZGF0YVNlcnZpY2VcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX2pzb25TZXJ2aWNlID0gbmV3IEpzb25TZXJ2aWNlQ3RvcihbJ2FwcGxpY2F0aW9uL2p3ay1zZXQranNvbiddKTtcbiAgICB9XG5cbiAgICBnZXQgbWV0YWRhdGFVcmwoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbWV0YWRhdGFVcmwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YVVybCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsID0gdGhpcy5fc2V0dGluZ3MubWV0YWRhdGFVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YVVybCA9IHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybCAmJiB0aGlzLl9tZXRhZGF0YVVybC5pbmRleE9mKE9pZGNNZXRhZGF0YVVybFBhdGgpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWV0YWRhdGFVcmxbdGhpcy5fbWV0YWRhdGFVcmwubGVuZ3RoIC0gMV0gIT09ICcvJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gJy8nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsICs9IE9pZGNNZXRhZGF0YVVybFBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhVXJsO1xuICAgIH1cblxuICAgIHJlc2V0U2lnbmluZ0tleXMoKSB7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gdGhpcy5fc2V0dGluZ3MgfHwge31cbiAgICAgICAgdGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMgPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBnZXRNZXRhZGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGE6IFJldHVybmluZyBtZXRhZGF0YSBmcm9tIHNldHRpbmdzXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubWV0YWRhdGFVcmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YTogTm8gYXV0aG9yaXR5IG9yIG1ldGFkYXRhVXJsIGNvbmZpZ3VyZWQgb24gc2V0dGluZ3NcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gYXV0aG9yaXR5IG9yIG1ldGFkYXRhVXJsIGNvbmZpZ3VyZWQgb24gc2V0dGluZ3NcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiTWV0YWRhdGFTZXJ2aWNlLmdldE1ldGFkYXRhOiBnZXR0aW5nIG1ldGFkYXRhIGZyb21cIiwgdGhpcy5tZXRhZGF0YVVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLmdldEpzb24odGhpcy5tZXRhZGF0YVVybClcbiAgICAgICAgICAgIC50aGVuKG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGE6IGpzb24gcmVjZWl2ZWRcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHNlZWQgPSB0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YVNlZWQgfHwge307XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MubWV0YWRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzZWVkLCBtZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SXNzdWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcImlzc3VlclwiKTtcbiAgICB9XG5cbiAgICBnZXRBdXRob3JpemF0aW9uRW5kcG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiYXV0aG9yaXphdGlvbl9lbmRwb2ludFwiKTtcbiAgICB9XG5cbiAgICBnZXRVc2VySW5mb0VuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcInVzZXJpbmZvX2VuZHBvaW50XCIpO1xuICAgIH1cblxuICAgIGdldFRva2VuRW5kcG9pbnQob3B0aW9uYWw9dHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcInRva2VuX2VuZHBvaW50XCIsIG9wdGlvbmFsKTtcbiAgICB9XG5cbiAgICBnZXRDaGVja1Nlc3Npb25JZnJhbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiY2hlY2tfc2Vzc2lvbl9pZnJhbWVcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0RW5kU2Vzc2lvbkVuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcImVuZF9zZXNzaW9uX2VuZHBvaW50XCIsIHRydWUpO1xuICAgIH1cblxuICAgIGdldFJldm9jYXRpb25FbmRwb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJyZXZvY2F0aW9uX2VuZHBvaW50XCIsIHRydWUpO1xuICAgIH1cblxuICAgIGdldEtleXNFbmRwb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJqd2tzX3VyaVwiLCB0cnVlKTtcbiAgICB9XG5cbiAgICBfZ2V0TWV0YWRhdGFQcm9wZXJ0eShuYW1lLCBvcHRpb25hbD1mYWxzZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGFQcm9wZXJ0eSBmb3I6IFwiICsgbmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0YWRhdGEoKS50aGVuKG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5OiBtZXRhZGF0YSByZWNpZXZlZFwiKTtcblxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhW25hbWVdID09PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25hbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cud2FybihcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5OiBNZXRhZGF0YSBkb2VzIG5vdCBjb250YWluIG9wdGlvbmFsIHByb3BlcnR5IFwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGFQcm9wZXJ0eTogTWV0YWRhdGEgZG9lcyBub3QgY29udGFpbiBwcm9wZXJ0eSBcIiArIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRhZGF0YSBkb2VzIG5vdCBjb250YWluIHByb3BlcnR5IFwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFbbmFtZV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFNpZ25pbmdLZXlzKCkge1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5czogUmV0dXJuaW5nIHNpZ25pbmdLZXlzIGZyb20gc2V0dGluZ3NcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3NldHRpbmdzLnNpZ25pbmdLZXlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiandrc191cmlcIikudGhlbihqd2tzX3VyaSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXM6IGp3a3NfdXJpIHJlY2VpdmVkXCIsIGp3a3NfdXJpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLmdldEpzb24oandrc191cmkpLnRoZW4oa2V5U2V0ID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXM6IGtleSBzZXQgcmVjZWl2ZWRcIiwga2V5U2V0KTtcblxuICAgICAgICAgICAgICAgIGlmICgha2V5U2V0LmtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiTWV0YWRhdGFTZXJ2aWNlLmdldFNpZ25pbmdLZXlzOiBNaXNzaW5nIGtleXMgb24ga2V5c2V0XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGtleXMgb24ga2V5c2V0XCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzLnNpZ25pbmdLZXlzID0ga2V5U2V0LmtleXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLnNpZ25pbmdLZXlzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnRTZXR0aW5ncyB9IGZyb20gJy4vT2lkY0NsaWVudFNldHRpbmdzLmpzJztcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL0Vycm9yUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgU2lnbmluUmVxdWVzdCB9IGZyb20gJy4vU2lnbmluUmVxdWVzdC5qcyc7XG5pbXBvcnQgeyBTaWduaW5SZXNwb25zZSB9IGZyb20gJy4vU2lnbmluUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgU2lnbm91dFJlcXVlc3QgfSBmcm9tICcuL1NpZ25vdXRSZXF1ZXN0LmpzJztcbmltcG9ydCB7IFNpZ25vdXRSZXNwb25zZSB9IGZyb20gJy4vU2lnbm91dFJlc3BvbnNlLmpzJztcbmltcG9ydCB7IFNpZ25pblN0YXRlIH0gZnJvbSAnLi9TaWduaW5TdGF0ZS5qcyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vU3RhdGUuanMnO1xuXG5leHBvcnQgY2xhc3MgT2lkY0NsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MgPSB7fSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MgaW5zdGFuY2VvZiBPaWRjQ2xpZW50U2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IG5ldyBPaWRjQ2xpZW50U2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IF9zdGF0ZVN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zdGF0ZVN0b3JlO1xuICAgIH1cbiAgICBnZXQgX3ZhbGlkYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudmFsaWRhdG9yO1xuICAgIH1cbiAgICBnZXQgX21ldGFkYXRhU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MubWV0YWRhdGFTZXJ2aWNlO1xuICAgIH1cblxuICAgIGdldCBzZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzO1xuICAgIH1cbiAgICBnZXQgbWV0YWRhdGFTZXJ2aWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlO1xuICAgIH1cblxuICAgIGNyZWF0ZVNpZ25pblJlcXVlc3Qoe1xuICAgICAgICByZXNwb25zZV90eXBlLCBzY29wZSwgcmVkaXJlY3RfdXJpLFxuICAgICAgICAvLyBkYXRhIHdhcyBtZWFudCB0byBiZSB0aGUgcGxhY2UgYSBjYWxsZXIgY291bGQgaW5kaWNhdGUgdGhlIGRhdGEgdG9cbiAgICAgICAgLy8gaGF2ZSByb3VuZCB0cmlwcGVkLCBidXQgcGVvcGxlIHdlcmUgZ2V0dGluZyBjb25mdXNlZCwgc28gaSBhZGRlZCBzdGF0ZSAoc2luY2UgdGhhdCBtYXRjaGVzIHRoZSBzcGVjKVxuICAgICAgICAvLyBhbmQgc28gbm93IGlmIGRhdGEgaXMgbm90IHBhc3NlZCwgYnV0IHN0YXRlIGlzIHRoZW4gc3RhdGUgd2lsbCBiZSB1c2VkXG4gICAgICAgIGRhdGEsIHN0YXRlLCBwcm9tcHQsIGRpc3BsYXksIG1heF9hZ2UsIHVpX2xvY2FsZXMsIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQsIGFjcl92YWx1ZXMsXG4gICAgICAgIHJlc291cmNlLCByZXF1ZXN0LCByZXF1ZXN0X3VyaSwgcmVzcG9uc2VfbW9kZSwgZXh0cmFRdWVyeVBhcmFtcywgZXh0cmFUb2tlblBhcmFtcywgcmVxdWVzdF90eXBlLCBza2lwVXNlckluZm8gfSA9IHt9LFxuICAgICAgICBzdGF0ZVN0b3JlXG4gICAgKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbmluUmVxdWVzdFwiKTtcblxuICAgICAgICBsZXQgY2xpZW50X2lkID0gdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuICAgICAgICByZXNwb25zZV90eXBlID0gcmVzcG9uc2VfdHlwZSB8fCB0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV90eXBlO1xuICAgICAgICBzY29wZSA9IHNjb3BlIHx8IHRoaXMuX3NldHRpbmdzLnNjb3BlO1xuICAgICAgICByZWRpcmVjdF91cmkgPSByZWRpcmVjdF91cmkgfHwgdGhpcy5fc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xuXG4gICAgICAgIC8vIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQgYXJlbid0IGFsbG93ZWQgb24gX3NldHRpbmdzXG4gICAgICAgIHByb21wdCA9IHByb21wdCB8fCB0aGlzLl9zZXR0aW5ncy5wcm9tcHQ7XG4gICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5IHx8IHRoaXMuX3NldHRpbmdzLmRpc3BsYXk7XG4gICAgICAgIG1heF9hZ2UgPSBtYXhfYWdlIHx8IHRoaXMuX3NldHRpbmdzLm1heF9hZ2U7XG4gICAgICAgIHVpX2xvY2FsZXMgPSB1aV9sb2NhbGVzIHx8IHRoaXMuX3NldHRpbmdzLnVpX2xvY2FsZXM7XG4gICAgICAgIGFjcl92YWx1ZXMgPSBhY3JfdmFsdWVzIHx8IHRoaXMuX3NldHRpbmdzLmFjcl92YWx1ZXM7XG4gICAgICAgIHJlc291cmNlID0gcmVzb3VyY2UgfHwgdGhpcy5fc2V0dGluZ3MucmVzb3VyY2U7XG4gICAgICAgIHJlc3BvbnNlX21vZGUgPSByZXNwb25zZV9tb2RlIHx8IHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX21vZGU7XG4gICAgICAgIGV4dHJhUXVlcnlQYXJhbXMgPSBleHRyYVF1ZXJ5UGFyYW1zIHx8IHRoaXMuX3NldHRpbmdzLmV4dHJhUXVlcnlQYXJhbXM7XG4gICAgICAgIGV4dHJhVG9rZW5QYXJhbXMgPSBleHRyYVRva2VuUGFyYW1zIHx8IHRoaXMuX3NldHRpbmdzLmV4dHJhVG9rZW5QYXJhbXM7XG5cbiAgICAgICAgbGV0IGF1dGhvcml0eSA9IHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eTtcblxuICAgICAgICBpZiAoU2lnbmluUmVxdWVzdC5pc0NvZGUocmVzcG9uc2VfdHlwZSkgJiYgcmVzcG9uc2VfdHlwZSAhPT0gXCJjb2RlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJPcGVuSUQgQ29ubmVjdCBoeWJyaWQgZmxvdyBpcyBub3Qgc3VwcG9ydGVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0QXV0aG9yaXphdGlvbkVuZHBvaW50KCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5jcmVhdGVTaWduaW5SZXF1ZXN0OiBSZWNlaXZlZCBhdXRob3JpemF0aW9uIGVuZHBvaW50XCIsIHVybCk7XG5cbiAgICAgICAgICAgIGxldCBzaWduaW5SZXF1ZXN0ID0gbmV3IFNpZ25pblJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlX3R5cGUsXG4gICAgICAgICAgICAgICAgc2NvcGUsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSB8fCBzdGF0ZSxcbiAgICAgICAgICAgICAgICBhdXRob3JpdHksXG4gICAgICAgICAgICAgICAgcHJvbXB0LCBkaXNwbGF5LCBtYXhfYWdlLCB1aV9sb2NhbGVzLCBpZF90b2tlbl9oaW50LCBsb2dpbl9oaW50LCBhY3JfdmFsdWVzLFxuICAgICAgICAgICAgICAgIHJlc291cmNlLCByZXF1ZXN0LCByZXF1ZXN0X3VyaSwgZXh0cmFRdWVyeVBhcmFtcywgZXh0cmFUb2tlblBhcmFtcywgcmVxdWVzdF90eXBlLCByZXNwb25zZV9tb2RlLFxuICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHRoaXMuX3NldHRpbmdzLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgc2tpcFVzZXJJbmZvXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHNpZ25pblN0YXRlID0gc2lnbmluUmVxdWVzdC5zdGF0ZTtcbiAgICAgICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVN0b3JlLnNldChzaWduaW5TdGF0ZS5pZCwgc2lnbmluU3RhdGUudG9TdG9yYWdlU3RyaW5nKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaWduaW5SZXF1ZXN0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWRTaWduaW5SZXNwb25zZVN0YXRlKHVybCwgc3RhdGVTdG9yZSwgcmVtb3ZlU3RhdGUgPSBmYWxzZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnJlYWRTaWduaW5SZXNwb25zZVN0YXRlXCIpO1xuXG4gICAgICAgIGxldCB1c2VRdWVyeSA9IHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX21vZGUgPT09IFwicXVlcnlcIiB8fCBcbiAgICAgICAgICAgICghdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZSAmJiBTaWduaW5SZXF1ZXN0LmlzQ29kZSh0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV90eXBlKSk7XG4gICAgICAgIGxldCBkZWxpbWl0ZXIgPSB1c2VRdWVyeSA/IFwiP1wiIDogXCIjXCI7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gbmV3IFNpZ25pblJlc3BvbnNlKHVybCwgZGVsaW1pdGVyKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LnJlYWRTaWduaW5SZXNwb25zZVN0YXRlOiBObyBzdGF0ZSBpbiByZXNwb25zZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzdGF0ZSBpbiByZXNwb25zZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZVN0b3JlID0gc3RhdGVTdG9yZSB8fCB0aGlzLl9zdGF0ZVN0b3JlO1xuXG4gICAgICAgIHZhciBzdGF0ZUFwaSA9IHJlbW92ZVN0YXRlID8gc3RhdGVTdG9yZS5yZW1vdmUuYmluZChzdGF0ZVN0b3JlKSA6IHN0YXRlU3RvcmUuZ2V0LmJpbmQoc3RhdGVTdG9yZSk7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlQXBpKHJlc3BvbnNlLnN0YXRlKS50aGVuKHN0b3JlZFN0YXRlU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGlmICghc3RvcmVkU3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LnJlYWRTaWduaW5SZXNwb25zZVN0YXRlOiBObyBtYXRjaGluZyBzdGF0ZSBmb3VuZCBpbiBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1hdGNoaW5nIHN0YXRlIGZvdW5kIGluIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IFNpZ25pblN0YXRlLmZyb21TdG9yYWdlU3RyaW5nKHN0b3JlZFN0YXRlU3RyaW5nKTtcbiAgICAgICAgICAgIHJldHVybiB7c3RhdGUsIHJlc3BvbnNlfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1NpZ25pblJlc3BvbnNlKHVybCwgc3RhdGVTdG9yZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWduaW5SZXNwb25zZVwiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkU2lnbmluUmVzcG9uc2VTdGF0ZSh1cmwsIHN0YXRlU3RvcmUsIHRydWUpLnRoZW4oKHtzdGF0ZSwgcmVzcG9uc2V9KSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWduaW5SZXNwb25zZTogUmVjZWl2ZWQgc3RhdGUgZnJvbSBzdG9yYWdlOyB2YWxpZGF0aW5nIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVNpZ25vdXRSZXF1ZXN0KHtpZF90b2tlbl9oaW50LCBkYXRhLCBzdGF0ZSwgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLCBleHRyYVF1ZXJ5UGFyYW1zLCByZXF1ZXN0X3R5cGUgfSA9IHt9LFxuICAgICAgICBzdGF0ZVN0b3JlXG4gICAgKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbm91dFJlcXVlc3RcIik7XG5cbiAgICAgICAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuX3NldHRpbmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgZXh0cmFRdWVyeVBhcmFtcyA9IGV4dHJhUXVlcnlQYXJhbXMgfHwgdGhpcy5fc2V0dGluZ3MuZXh0cmFRdWVyeVBhcmFtcztcblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldEVuZFNlc3Npb25FbmRwb2ludCgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiT2lkY0NsaWVudC5jcmVhdGVTaWdub3V0UmVxdWVzdDogTm8gZW5kIHNlc3Npb24gZW5kcG9pbnQgdXJsIHJldHVybmVkXCIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGVuZCBzZXNzaW9uIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25vdXRSZXF1ZXN0OiBSZWNlaXZlZCBlbmQgc2Vzc2lvbiBlbmRwb2ludFwiLCB1cmwpO1xuXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBTaWdub3V0UmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIGlkX3Rva2VuX2hpbnQsXG4gICAgICAgICAgICAgICAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEgfHwgc3RhdGUsXG4gICAgICAgICAgICAgICAgZXh0cmFRdWVyeVBhcmFtcyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0X3R5cGVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc2lnbm91dFN0YXRlID0gcmVxdWVzdC5zdGF0ZTtcbiAgICAgICAgICAgIGlmIChzaWdub3V0U3RhdGUpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25vdXRSZXF1ZXN0OiBTaWdub3V0IHJlcXVlc3QgaGFzIHN0YXRlIHRvIHBlcnNpc3RcIik7XG5cbiAgICAgICAgICAgICAgICBzdGF0ZVN0b3JlID0gc3RhdGVTdG9yZSB8fCB0aGlzLl9zdGF0ZVN0b3JlO1xuICAgICAgICAgICAgICAgIHN0YXRlU3RvcmUuc2V0KHNpZ25vdXRTdGF0ZS5pZCwgc2lnbm91dFN0YXRlLnRvU3RvcmFnZVN0cmluZygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZSh1cmwsIHN0YXRlU3RvcmUsIHJlbW92ZVN0YXRlID0gZmFsc2UpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5yZWFkU2lnbm91dFJlc3BvbnNlU3RhdGVcIik7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gbmV3IFNpZ25vdXRSZXNwb25zZSh1cmwpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZTogTm8gc3RhdGUgaW4gcmVzcG9uc2VcIik7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgICAgIExvZy53YXJuKFwiT2lkY0NsaWVudC5yZWFkU2lnbm91dFJlc3BvbnNlU3RhdGU6IFJlc3BvbnNlIHdhcyBlcnJvcjogXCIsIHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7c3RhdGU6IHVuZGVmaW5lZCwgcmVzcG9uc2V9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGF0ZUtleSA9IHJlc3BvbnNlLnN0YXRlO1xuXG4gICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgdmFyIHN0YXRlQXBpID0gcmVtb3ZlU3RhdGUgPyBzdGF0ZVN0b3JlLnJlbW92ZS5iaW5kKHN0YXRlU3RvcmUpIDogc3RhdGVTdG9yZS5nZXQuYmluZChzdGF0ZVN0b3JlKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlQXBpKHN0YXRlS2V5KS50aGVuKHN0b3JlZFN0YXRlU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGlmICghc3RvcmVkU3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZTogTm8gbWF0Y2hpbmcgc3RhdGUgZm91bmQgaW4gc3RvcmFnZVwiKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYXRjaGluZyBzdGF0ZSBmb3VuZCBpbiBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBTdGF0ZS5mcm9tU3RvcmFnZVN0cmluZyhzdG9yZWRTdGF0ZVN0cmluZyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7c3RhdGUsIHJlc3BvbnNlfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1NpZ25vdXRSZXNwb25zZSh1cmwsIHN0YXRlU3RvcmUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5wcm9jZXNzU2lnbm91dFJlc3BvbnNlXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZSh1cmwsIHN0YXRlU3RvcmUsIHRydWUpLnRoZW4oKHtzdGF0ZSwgcmVzcG9uc2V9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWdub3V0UmVzcG9uc2U6IFJlY2VpdmVkIHN0YXRlIGZyb20gc3RvcmFnZTsgdmFsaWRhdGluZyByZXNwb25zZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yLnZhbGlkYXRlU2lnbm91dFJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWdub3V0UmVzcG9uc2U6IE5vIHN0YXRlIGZyb20gc3RvcmFnZTsgc2tpcHBpbmcgdmFsaWRhdGluZyByZXNwb25zZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyU3RhbGVTdGF0ZShzdGF0ZVN0b3JlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY2xlYXJTdGFsZVN0YXRlXCIpO1xuXG4gICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgcmV0dXJuIFN0YXRlLmNsZWFyU3RhbGVTdGF0ZShzdGF0ZVN0b3JlLCB0aGlzLnNldHRpbmdzLnN0YWxlU3RhdGVBZ2UpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IENsb2NrU2VydmljZSB9IGZyb20gJy4vQ2xvY2tTZXJ2aWNlLmpzJztcbmltcG9ydCB7IFdlYlN0b3JhZ2VTdGF0ZVN0b3JlIH0gZnJvbSAnLi9XZWJTdG9yYWdlU3RhdGVTdG9yZS5qcyc7XG5pbXBvcnQgeyBSZXNwb25zZVZhbGlkYXRvciB9IGZyb20gJy4vUmVzcG9uc2VWYWxpZGF0b3IuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuXG5jb25zdCBPaWRjTWV0YWRhdGFVcmxQYXRoID0gJy53ZWxsLWtub3duL29wZW5pZC1jb25maWd1cmF0aW9uJztcblxuY29uc3QgRGVmYXVsdFJlc3BvbnNlVHlwZSA9IFwiaWRfdG9rZW5cIjtcbmNvbnN0IERlZmF1bHRTY29wZSA9IFwib3BlbmlkXCI7XG5jb25zdCBEZWZhdWx0Q2xpZW50QXV0aGVudGljYXRpb24gPSBcImNsaWVudF9zZWNyZXRfcG9zdFwiIC8vIFRoZSBkZWZhdWx0IHZhbHVlIG11c3QgYmUgY2xpZW50X3NlY3JldF9iYXNpYywgYXMgZXhwbGFpbmVkIGluIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI0NsaWVudEF1dGhlbnRpY2F0aW9uXG5jb25zdCBEZWZhdWx0U3RhbGVTdGF0ZUFnZSA9IDYwICogMTU7IC8vIHNlY29uZHNcbmNvbnN0IERlZmF1bHRDbG9ja1NrZXdJblNlY29uZHMgPSA2MCAqIDU7XG5cbmV4cG9ydCBjbGFzcyBPaWRjQ2xpZW50U2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgLy8gbWV0YWRhdGEgcmVsYXRlZFxuICAgICAgICBhdXRob3JpdHksIG1ldGFkYXRhVXJsLCBtZXRhZGF0YSwgc2lnbmluZ0tleXMsIG1ldGFkYXRhU2VlZCxcbiAgICAgICAgLy8gY2xpZW50IHJlbGF0ZWRcbiAgICAgICAgY2xpZW50X2lkLCBjbGllbnRfc2VjcmV0LCByZXNwb25zZV90eXBlID0gRGVmYXVsdFJlc3BvbnNlVHlwZSwgc2NvcGUgPSBEZWZhdWx0U2NvcGUsXG4gICAgICAgIHJlZGlyZWN0X3VyaSwgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLFxuICAgICAgICBjbGllbnRfYXV0aGVudGljYXRpb24gPSBEZWZhdWx0Q2xpZW50QXV0aGVudGljYXRpb24sXG4gICAgICAgIC8vIG9wdGlvbmFsIHByb3RvY29sXG4gICAgICAgIHByb21wdCwgZGlzcGxheSwgbWF4X2FnZSwgdWlfbG9jYWxlcywgYWNyX3ZhbHVlcywgcmVzb3VyY2UsIHJlc3BvbnNlX21vZGUsXG4gICAgICAgIC8vIGJlaGF2aW9yIGZsYWdzXG4gICAgICAgIGZpbHRlclByb3RvY29sQ2xhaW1zID0gdHJ1ZSwgbG9hZFVzZXJJbmZvID0gdHJ1ZSxcbiAgICAgICAgc3RhbGVTdGF0ZUFnZSA9IERlZmF1bHRTdGFsZVN0YXRlQWdlLCBcbiAgICAgICAgY2xvY2tTa2V3ID0gRGVmYXVsdENsb2NrU2tld0luU2Vjb25kcyxcbiAgICAgICAgY2xvY2tTZXJ2aWNlID0gbmV3IENsb2NrU2VydmljZSgpLFxuICAgICAgICB1c2VySW5mb0p3dElzc3VlciA9ICdPUCcsXG4gICAgICAgIG1lcmdlQ2xhaW1zID0gZmFsc2UsXG4gICAgICAgIC8vIG90aGVyIGJlaGF2aW9yXG4gICAgICAgIHN0YXRlU3RvcmUgPSBuZXcgV2ViU3RvcmFnZVN0YXRlU3RvcmUoKSxcbiAgICAgICAgUmVzcG9uc2VWYWxpZGF0b3JDdG9yID0gUmVzcG9uc2VWYWxpZGF0b3IsXG4gICAgICAgIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UsXG4gICAgICAgIC8vIGV4dHJhIHF1ZXJ5IHBhcmFtc1xuICAgICAgICBleHRyYVF1ZXJ5UGFyYW1zID0ge30sXG4gICAgICAgIGV4dHJhVG9rZW5QYXJhbXMgPSB7fVxuICAgIH0gPSB7fSkge1xuXG4gICAgICAgIHRoaXMuX2F1dGhvcml0eSA9IGF1dGhvcml0eTtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgPSBtZXRhZGF0YVVybDtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZWVkID0gbWV0YWRhdGFTZWVkO1xuICAgICAgICB0aGlzLl9zaWduaW5nS2V5cyA9IHNpZ25pbmdLZXlzO1xuXG4gICAgICAgIHRoaXMuX2NsaWVudF9pZCA9IGNsaWVudF9pZDtcbiAgICAgICAgdGhpcy5fY2xpZW50X3NlY3JldCA9IGNsaWVudF9zZWNyZXQ7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlX3R5cGUgPSByZXNwb25zZV90eXBlO1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9yZWRpcmVjdF91cmkgPSByZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSA9IHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uID0gY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuXG4gICAgICAgIHRoaXMuX3Byb21wdCA9IHByb21wdDtcbiAgICAgICAgdGhpcy5fZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgICAgIHRoaXMuX21heF9hZ2UgPSBtYXhfYWdlO1xuICAgICAgICB0aGlzLl91aV9sb2NhbGVzID0gdWlfbG9jYWxlcztcbiAgICAgICAgdGhpcy5fYWNyX3ZhbHVlcyA9IGFjcl92YWx1ZXM7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlID0gcmVzb3VyY2U7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlX21vZGUgPSByZXNwb25zZV9tb2RlO1xuXG4gICAgICAgIHRoaXMuX2ZpbHRlclByb3RvY29sQ2xhaW1zID0gISFmaWx0ZXJQcm90b2NvbENsYWltcztcbiAgICAgICAgdGhpcy5fbG9hZFVzZXJJbmZvID0gISFsb2FkVXNlckluZm87XG4gICAgICAgIHRoaXMuX3N0YWxlU3RhdGVBZ2UgPSBzdGFsZVN0YXRlQWdlO1xuICAgICAgICB0aGlzLl9jbG9ja1NrZXcgPSBjbG9ja1NrZXc7XG4gICAgICAgIHRoaXMuX2Nsb2NrU2VydmljZSA9IGNsb2NrU2VydmljZTtcbiAgICAgICAgdGhpcy5fdXNlckluZm9Kd3RJc3N1ZXIgPSB1c2VySW5mb0p3dElzc3VlcjtcbiAgICAgICAgdGhpcy5fbWVyZ2VDbGFpbXMgPSAhIW1lcmdlQ2xhaW1zO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlO1xuICAgICAgICB0aGlzLl92YWxpZGF0b3IgPSBuZXcgUmVzcG9uc2VWYWxpZGF0b3JDdG9yKHRoaXMpO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzKTtcblxuICAgICAgICB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zID0gdHlwZW9mIGV4dHJhUXVlcnlQYXJhbXMgPT09ICdvYmplY3QnID8gZXh0cmFRdWVyeVBhcmFtcyA6IHt9O1xuICAgICAgICB0aGlzLl9leHRyYVRva2VuUGFyYW1zID0gdHlwZW9mIGV4dHJhVG9rZW5QYXJhbXMgPT09ICdvYmplY3QnID8gZXh0cmFUb2tlblBhcmFtcyA6IHt9O1xuICAgIH1cblxuICAgIC8vIGNsaWVudCBjb25maWdcbiAgICBnZXQgY2xpZW50X2lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50X2lkO1xuICAgIH1cbiAgICBzZXQgY2xpZW50X2lkKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2xpZW50X2lkKSB7XG4gICAgICAgICAgICAvLyBvbmUtdGltZSBzZXQgb25seVxuICAgICAgICAgICAgdGhpcy5fY2xpZW50X2lkID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50U2V0dGluZ3Muc2V0X2NsaWVudF9pZDogY2xpZW50X2lkIGhhcyBhbHJlYWR5IGJlZW4gYXNzaWduZWQuXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGllbnRfaWQgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgY2xpZW50X3NlY3JldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9zZWNyZXQ7XG4gICAgfVxuICAgIGdldCByZXNwb25zZV90eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcG9uc2VfdHlwZTtcbiAgICB9XG4gICAgZ2V0IHNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcGU7XG4gICAgfVxuICAgIGdldCByZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBjbGllbnRfYXV0aGVudGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnRfYXV0aGVudGljYXRpb247XG4gICAgfVxuICAgIFxuXG4gICAgLy8gb3B0aW9uYWwgcHJvdG9jb2wgcGFyYW1zXG4gICAgZ2V0IHByb21wdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21wdDtcbiAgICB9XG4gICAgZ2V0IGRpc3BsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5O1xuICAgIH1cbiAgICBnZXQgbWF4X2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heF9hZ2U7XG4gICAgfVxuICAgIGdldCB1aV9sb2NhbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdWlfbG9jYWxlcztcbiAgICB9XG4gICAgZ2V0IGFjcl92YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3JfdmFsdWVzO1xuICAgIH1cbiAgICBnZXQgcmVzb3VyY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZTtcbiAgICB9XG4gICAgZ2V0IHJlc3BvbnNlX21vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zZV9tb2RlO1xuICAgIH1cblxuXG4gICAgLy8gbWV0YWRhdGFcbiAgICBnZXQgYXV0aG9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0aG9yaXR5O1xuICAgIH1cbiAgICBzZXQgYXV0aG9yaXR5KHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5fYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICAvLyBvbmUtdGltZSBzZXQgb25seVxuICAgICAgICAgICAgdGhpcy5fYXV0aG9yaXR5ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50U2V0dGluZ3Muc2V0X2F1dGhvcml0eTogYXV0aG9yaXR5IGhhcyBhbHJlYWR5IGJlZW4gYXNzaWduZWQuXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdXRob3JpdHkgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbWV0YWRhdGFVcmwoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbWV0YWRhdGFVcmwpIHtcbiAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsID0gdGhpcy5hdXRob3JpdHk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybCAmJiB0aGlzLl9tZXRhZGF0YVVybC5pbmRleE9mKE9pZGNNZXRhZGF0YVVybFBhdGgpIDwgMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybFt0aGlzLl9tZXRhZGF0YVVybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsICs9ICcvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gT2lkY01ldGFkYXRhVXJsUGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVVybDtcbiAgICB9XG5cbiAgICAvLyBzZXR0YWJsZS9jYWNoYWJsZSBtZXRhZGF0YSB2YWx1ZXNcbiAgICBnZXQgbWV0YWRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YTtcbiAgICB9XG4gICAgc2V0IG1ldGFkYXRhKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVNlZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlZWQ7XG4gICAgfVxuICAgIHNldCBtZXRhZGF0YVNlZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZWVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNpZ25pbmdLZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluZ0tleXM7XG4gICAgfVxuICAgIHNldCBzaWduaW5nS2V5cyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zaWduaW5nS2V5cyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGJlaGF2aW9yIGZsYWdzXG4gICAgZ2V0IGZpbHRlclByb3RvY29sQ2xhaW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyUHJvdG9jb2xDbGFpbXM7XG4gICAgfVxuICAgIGdldCBsb2FkVXNlckluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlckluZm87XG4gICAgfVxuICAgIGdldCBzdGFsZVN0YXRlQWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhbGVTdGF0ZUFnZTtcbiAgICB9XG4gICAgZ2V0IGNsb2NrU2tldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb2NrU2tldztcbiAgICB9XG4gICAgZ2V0IHVzZXJJbmZvSnd0SXNzdWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlckluZm9Kd3RJc3N1ZXI7XG4gICAgfVxuICAgIGdldCBtZXJnZUNsYWltcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlQ2xhaW1zO1xuICAgIH1cbiAgICBcbiAgICBnZXQgc3RhdGVTdG9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlU3RvcmU7XG4gICAgfVxuICAgIGdldCB2YWxpZGF0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3I7XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVNlcnZpY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2U7XG4gICAgfVxuXG4gICAgLy8gZXh0cmEgcXVlcnkgcGFyYW1zXG4gICAgZ2V0IGV4dHJhUXVlcnlQYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zO1xuICAgIH1cbiAgICBzZXQgZXh0cmFRdWVyeVBhcmFtcyh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBleHRyYSB0b2tlbiBwYXJhbXNcbiAgICBnZXQgZXh0cmFUb2tlblBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXM7XG4gICAgfVxuICAgIHNldCBleHRyYVRva2VuUGFyYW1zKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKXtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXMgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXMgPSB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdldCB0aGUgdGltZVxuICAgIGdldEVwb2NoVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb2NrU2VydmljZS5nZXRFcG9jaFRpbWUoKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBQb3B1cFdpbmRvdyB9IGZyb20gJy4vUG9wdXBXaW5kb3cuanMnO1xuXG5leHBvcnQgY2xhc3MgUG9wdXBOYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZShwYXJhbXMpIHtcbiAgICAgICAgbGV0IHBvcHVwID0gbmV3IFBvcHVwV2luZG93KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocG9wdXApO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcikge1xuICAgICAgICBMb2cuZGVidWcoXCJQb3B1cE5hdmlnYXRvci5jYWxsYmFja1wiKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUG9wdXBXaW5kb3cubm90aWZ5T3BlbmVyKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuXG5jb25zdCBDaGVja0ZvclBvcHVwQ2xvc2VkSW50ZXJ2YWwgPSA1MDA7XG5jb25zdCBEZWZhdWx0UG9wdXBGZWF0dXJlcyA9ICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vLHdpZHRoPTUwMCxoZWlnaHQ9NTAwLGxlZnQ9MTAwLHRvcD0xMDA7Jztcbi8vY29uc3QgRGVmYXVsdFBvcHVwRmVhdHVyZXMgPSAnbG9jYXRpb249bm8sdG9vbGJhcj1ubyx3aWR0aD01MDAsaGVpZ2h0PTUwMCxsZWZ0PTEwMCx0b3A9MTAwO3Jlc2l6YWJsZT15ZXMnO1xuXG5jb25zdCBEZWZhdWx0UG9wdXBUYXJnZXQgPSBcIl9ibGFua1wiO1xuXG5leHBvcnQgY2xhc3MgUG9wdXBXaW5kb3cge1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHRhcmdldCA9IHBhcmFtcy5wb3B1cFdpbmRvd1RhcmdldCB8fCBEZWZhdWx0UG9wdXBUYXJnZXQ7XG4gICAgICAgIGxldCBmZWF0dXJlcyA9IHBhcmFtcy5wb3B1cFdpbmRvd0ZlYXR1cmVzIHx8IERlZmF1bHRQb3B1cEZlYXR1cmVzO1xuXG4gICAgICAgIHRoaXMuX3BvcHVwID0gd2luZG93Lm9wZW4oJycsIHRhcmdldCwgZmVhdHVyZXMpO1xuICAgICAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93LmN0b3I6IHBvcHVwIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tGb3JQb3B1cENsb3NlZFRpbWVyID0gd2luZG93LnNldEludGVydmFsKHRoaXMuX2NoZWNrRm9yUG9wdXBDbG9zZWQuYmluZCh0aGlzKSwgQ2hlY2tGb3JQb3B1cENsb3NlZEludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb3B1cCkge1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogRXJyb3Igb3BlbmluZyBwb3B1cCB3aW5kb3dcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXBhcmFtcyB8fCAhcGFyYW1zLnVybCkge1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogbm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJObyB1cmwgcHJvdmlkZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogU2V0dGluZyBVUkwgaW4gcG9wdXBcIik7XG5cbiAgICAgICAgICAgIHRoaXMuX2lkID0gcGFyYW1zLmlkO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93W1wicG9wdXBDYWxsYmFja19cIiArIHBhcmFtcy5pZF0gPSB0aGlzLl9jYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAud2luZG93LmxvY2F0aW9uID0gcGFyYW1zLnVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2U7XG4gICAgfVxuXG4gICAgX3N1Y2Nlc3MoZGF0YSkge1xuICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jYWxsYmFjazogU3VjY2Vzc2Z1bCByZXNwb25zZSBmcm9tIHBvcHVwIHdpbmRvd1wiKTtcblxuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUoZGF0YSk7XG4gICAgfVxuICAgIF9lcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIExvZy5lcnJvcihcIlBvcHVwV2luZG93LmVycm9yOiBcIiwgbWVzc2FnZSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuX3JlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKGZhbHNlKTtcbiAgICB9XG5cbiAgICBfY2xlYW51cChrZWVwT3Blbikge1xuICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jbGVhbnVwXCIpO1xuXG4gICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2NoZWNrRm9yUG9wdXBDbG9zZWRUaW1lcik7XG4gICAgICAgIHRoaXMuX2NoZWNrRm9yUG9wdXBDbG9zZWRUaW1lciA9IG51bGw7XG5cbiAgICAgICAgZGVsZXRlIHdpbmRvd1tcInBvcHVwQ2FsbGJhY2tfXCIgKyB0aGlzLl9pZF07XG5cbiAgICAgICAgaWYgKHRoaXMuX3BvcHVwICYmICFrZWVwT3Blbikge1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb3B1cCA9IG51bGw7XG4gICAgfVxuXG4gICAgX2NoZWNrRm9yUG9wdXBDbG9zZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcG9wdXAgfHwgdGhpcy5fcG9wdXAuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIlBvcHVwIHdpbmRvdyBjbG9zZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsbGJhY2sodXJsLCBrZWVwT3Blbikge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKGtlZXBPcGVuKTtcblxuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jYWxsYmFjayBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgdGhpcy5fc3VjY2Vzcyh7IHVybDogdXJsIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUG9wdXBXaW5kb3cuY2FsbGJhY2s6IEludmFsaWQgcmVzcG9uc2UgZnJvbSBwb3B1cFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiSW52YWxpZCByZXNwb25zZSBmcm9tIHBvcHVwXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdGlmeU9wZW5lcih1cmwsIGtlZXBPcGVuLCBkZWxpbWl0ZXIpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcbiAgICAgICAgICAgIHVybCA9IHVybCB8fCB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IFVybFV0aWxpdHkucGFyc2VVcmxGcmFnbWVudCh1cmwsIGRlbGltaXRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFwicG9wdXBDYWxsYmFja19cIiArIGRhdGEuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHdpbmRvdy5vcGVuZXJbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUG9wdXBXaW5kb3cubm90aWZ5T3BlbmVyOiBwYXNzaW5nIHVybCBtZXNzYWdlIHRvIG9wZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVybCwga2VlcE9wZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLndhcm4oXCJQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXI6IG5vIG1hdGNoaW5nIGNhbGxiYWNrIGZvdW5kIG9uIG9wZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLndhcm4oXCJQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXI6IG5vIHN0YXRlIGZvdW5kIGluIHJlc3BvbnNlIHVybFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cud2FybihcIlBvcHVwV2luZG93Lm5vdGlmeU9wZW5lcjogbm8gd2luZG93Lm9wZW5lci4gQ2FuJ3QgY29tcGxldGUgbm90aWZpY2F0aW9uLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0TmF2aWdhdG9yIHtcblxuICAgIHByZXBhcmUoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgfVxuXG4gICAgbmF2aWdhdGUocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMudXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZWRpcmVjdE5hdmlnYXRvci5uYXZpZ2F0ZTogTm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHVybCBwcm92aWRlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnVzZVJlcGxhY2VUb05hdmlnYXRlKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShwYXJhbXMudXJsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHBhcmFtcy51cmw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHVybCgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vTWV0YWRhdGFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IFVzZXJJbmZvU2VydmljZSB9IGZyb20gJy4vVXNlckluZm9TZXJ2aWNlLmpzJztcbmltcG9ydCB7IFRva2VuQ2xpZW50IH0gZnJvbSAnLi9Ub2tlbkNsaWVudC5qcyc7XG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9FcnJvclJlc3BvbnNlLmpzJztcbmltcG9ydCB7IEpvc2VVdGlsIH0gZnJvbSAnLi9Kb3NlVXRpbC5qcyc7XG5cbmNvbnN0IFByb3RvY29sQ2xhaW1zID0gW1wibm9uY2VcIiwgXCJhdF9oYXNoXCIsIFwiaWF0XCIsIFwibmJmXCIsIFwiZXhwXCIsIFwiYXVkXCIsIFwiaXNzXCIsIFwiY19oYXNoXCJdO1xuXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VWYWxpZGF0b3Ige1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIFxuICAgICAgICBNZXRhZGF0YVNlcnZpY2VDdG9yID0gTWV0YWRhdGFTZXJ2aWNlLFxuICAgICAgICBVc2VySW5mb1NlcnZpY2VDdG9yID0gVXNlckluZm9TZXJ2aWNlLCBcbiAgICAgICAgam9zZVV0aWwgPSBKb3NlVXRpbCxcbiAgICAgICAgVG9rZW5DbGllbnRDdG9yID0gVG9rZW5DbGllbnQpIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuY3RvcjogTm8gc2V0dGluZ3MgcGFzc2VkIHRvIFJlc3BvbnNlVmFsaWRhdG9yXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0dGluZ3NcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX3VzZXJJbmZvU2VydmljZSA9IG5ldyBVc2VySW5mb1NlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fam9zZVV0aWwgPSBqb3NlVXRpbDtcbiAgICAgICAgdGhpcy5fdG9rZW5DbGllbnQgPSBuZXcgVG9rZW5DbGllbnRDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVNpZ25pblJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzU2lnbmluUGFyYW1zKHN0YXRlLCByZXNwb25zZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlOiBzdGF0ZSBwcm9jZXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVUb2tlbnMoc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlOiB0b2tlbnMgdmFsaWRhdGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzQ2xhaW1zKHN0YXRlLCByZXNwb25zZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2U6IGNsYWltcyBwcm9jZXNzZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVNpZ25vdXRSZXNwb25zZShzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHN0YXRlLmlkICE9PSByZXNwb25zZS5zdGF0ZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IudmFsaWRhdGVTaWdub3V0UmVzcG9uc2U6IFN0YXRlIGRvZXMgbm90IG1hdGNoXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlN0YXRlIGRvZXMgbm90IG1hdGNoXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyB0aGF0IHdlIGtub3cgdGhlIHN0YXRlIG1hdGNoZXMsIHRha2UgdGhlIHN0b3JlZCBkYXRhXG4gICAgICAgIC8vIGFuZCBzZXQgaXQgaW50byB0aGUgcmVzcG9uc2Ugc28gY2FsbGVycyBjYW4gZ2V0IHRoZWlyIHN0YXRlXG4gICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGZvciBib3RoIHN1Y2Nlc3MgJiBlcnJvciBvdXRjb21lc1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25vdXRSZXNwb25zZTogc3RhdGUgdmFsaWRhdGVkXCIpO1xuICAgICAgICByZXNwb25zZS5zdGF0ZSA9IHN0YXRlLmRhdGE7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICBMb2cud2FybihcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbm91dFJlc3BvbnNlOiBSZXNwb25zZSB3YXMgZXJyb3JcIiwgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBfcHJvY2Vzc1NpZ25pblBhcmFtcyhzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHN0YXRlLmlkICE9PSByZXNwb25zZS5zdGF0ZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IFN0YXRlIGRvZXMgbm90IG1hdGNoXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlN0YXRlIGRvZXMgbm90IG1hdGNoXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogTm8gY2xpZW50X2lkIG9uIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGNsaWVudF9pZCBvbiBzdGF0ZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN0YXRlLmF1dGhvcml0eSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IE5vIGF1dGhvcml0eSBvbiBzdGF0ZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBhdXRob3JpdHkgb24gc3RhdGVcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcyBhbGxvd3MgdGhlIGF1dGhvcml0eSB0byBiZSBsb2FkZWQgZnJvbSB0aGUgc2lnbmluIHN0YXRlXG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncy5hdXRob3JpdHkgPSBzdGF0ZS5hdXRob3JpdHk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5zdXJlIHdlJ3JlIHVzaW5nIHRoZSBjb3JyZWN0IGF1dGhvcml0eSBpZiB0aGUgYXV0aG9yaXR5IGlzIG5vdCBsb2FkZWQgZnJvbSBzaWduaW4gc3RhdGVcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5ICYmIHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eSAhPT0gc3RhdGUuYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogYXV0aG9yaXR5IG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXV0aG9yaXR5IG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMgYWxsb3dzIHRoZSBjbGllbnRfaWQgdG8gYmUgbG9hZGVkIGZyb20gdGhlIHNpZ25pbiBzdGF0ZVxuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkID0gc3RhdGUuY2xpZW50X2lkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVuc3VyZSB3ZSdyZSB1c2luZyB0aGUgY29ycmVjdCBjbGllbnRfaWQgaWYgdGhlIGNsaWVudF9pZCBpcyBub3QgbG9hZGVkIGZyb20gc2lnbmluIHN0YXRlXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCAmJiB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQgIT09IHN0YXRlLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IGNsaWVudF9pZCBtaXNtYXRjaCBvbiBzZXR0aW5ncyB2cy4gc2lnbmluIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImNsaWVudF9pZCBtaXNtYXRjaCBvbiBzZXR0aW5ncyB2cy4gc2lnbmluIHN0YXRlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyB0aGF0IHdlIGtub3cgdGhlIHN0YXRlIG1hdGNoZXMsIHRha2UgdGhlIHN0b3JlZCBkYXRhXG4gICAgICAgIC8vIGFuZCBzZXQgaXQgaW50byB0aGUgcmVzcG9uc2Ugc28gY2FsbGVycyBjYW4gZ2V0IHRoZWlyIHN0YXRlXG4gICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGZvciBib3RoIHN1Y2Nlc3MgJiBlcnJvciBvdXRjb21lc1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogc3RhdGUgdmFsaWRhdGVkXCIpO1xuICAgICAgICByZXNwb25zZS5zdGF0ZSA9IHN0YXRlLmRhdGE7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICBMb2cud2FybihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBSZXNwb25zZSB3YXMgZXJyb3JcIiwgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUubm9uY2UgJiYgIXJlc3BvbnNlLmlkX3Rva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogRXhwZWN0aW5nIGlkX3Rva2VuIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGlkX3Rva2VuIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUubm9uY2UgJiYgcmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBOb3QgZXhwZWN0aW5nIGlkX3Rva2VuIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgaWRfdG9rZW4gaW4gcmVzcG9uc2VcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmNvZGVfdmVyaWZpZXIgJiYgIXJlc3BvbnNlLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBFeHBlY3RpbmcgY29kZSBpbiByZXNwb25zZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBjb2RlIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUuY29kZV92ZXJpZmllciAmJiByZXNwb25zZS5jb2RlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogTm90IGV4cGVjdGluZyBjb2RlIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgY29kZSBpbiByZXNwb25zZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlc3BvbnNlLnNjb3BlKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGVyZSdzIG5vIHNjb3BlIG9uIHRoZSByZXNwb25zZSwgdGhlbiBhc3N1bWUgYWxsIHNjb3BlcyBncmFudGVkIChwZXItc3BlYykgYW5kIGNvcHkgb3ZlciBzY29wZXMgZnJvbSBvcmlnaW5hbCByZXF1ZXN0XG4gICAgICAgICAgICByZXNwb25zZS5zY29wZSA9IHN0YXRlLnNjb3BlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuXG4gICAgX3Byb2Nlc3NDbGFpbXMoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5pc09wZW5JZENvbm5lY3QpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiByZXNwb25zZSBpcyBPSURDLCBwcm9jZXNzaW5nIGNsYWltc1wiKTtcblxuICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZSA9IHRoaXMuX2ZpbHRlclByb3RvY29sQ2xhaW1zKHJlc3BvbnNlLnByb2ZpbGUpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdGUuc2tpcFVzZXJJbmZvICE9PSB0cnVlICYmIHRoaXMuX3NldHRpbmdzLmxvYWRVc2VySW5mbyAmJiByZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogbG9hZGluZyB1c2VyIGluZm9cIik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlckluZm9TZXJ2aWNlLmdldENsYWltcyhyZXNwb25zZS5hY2Nlc3NfdG9rZW4pLnRoZW4oY2xhaW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDbGFpbXM6IHVzZXIgaW5mbyBjbGFpbXMgcmVjZWl2ZWQgZnJvbSB1c2VyIGluZm8gZW5kcG9pbnRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYWltcy5zdWIgIT09IHJlc3BvbnNlLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogc3ViIGZyb20gdXNlciBpbmZvIGVuZHBvaW50IGRvZXMgbm90IG1hdGNoIHN1YiBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzdWIgZnJvbSB1c2VyIGluZm8gZW5kcG9pbnQgZG9lcyBub3QgbWF0Y2ggc3ViIGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnByb2ZpbGUgPSB0aGlzLl9tZXJnZUNsYWltcyhyZXNwb25zZS5wcm9maWxlLCBjbGFpbXMpO1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogdXNlciBpbmZvIGNsYWltcyByZWNlaXZlZCwgdXBkYXRlZCBwcm9maWxlOlwiLCByZXNwb25zZS5wcm9maWxlKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogbm90IGxvYWRpbmcgdXNlciBpbmZvXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDbGFpbXM6IHJlc3BvbnNlIGlzIG5vdCBPSURDLCBub3QgcHJvY2Vzc2luZyBjbGFpbXNcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBfbWVyZ2VDbGFpbXMoY2xhaW1zMSwgY2xhaW1zMikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgY2xhaW1zMSk7XG5cbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBjbGFpbXMyKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gY2xhaW1zMltuYW1lXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzID0gW3ZhbHVlc107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0W25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdFtuYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtuYW1lXS5pbmRleE9mKHZhbHVlKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtuYW1lXS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXN1bHRbbmFtZV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHRoaXMuX3NldHRpbmdzLm1lcmdlQ2xhaW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbbmFtZV0gPSB0aGlzLl9tZXJnZUNsYWltcyhyZXN1bHRbbmFtZV0sIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtuYW1lXSA9IFtyZXN1bHRbbmFtZV0sIHZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgX2ZpbHRlclByb3RvY29sQ2xhaW1zKGNsYWltcykge1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyUHJvdG9jb2xDbGFpbXMsIGluY29taW5nIGNsYWltczpcIiwgY2xhaW1zKTtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgY2xhaW1zKTtcblxuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MuX2ZpbHRlclByb3RvY29sQ2xhaW1zKSB7XG4gICAgICAgICAgICBQcm90b2NvbENsYWltcy5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByZXN1bHRbdHlwZV07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlclByb3RvY29sQ2xhaW1zOiBwcm90b2NvbCBjbGFpbXMgZmlsdGVyZWRcIiwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJQcm90b2NvbENsYWltczogcHJvdG9jb2wgY2xhaW1zIG5vdCBmaWx0ZXJlZFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVUb2tlbnMoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5jb2RlKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVUb2tlbnM6IFZhbGlkYXRpbmcgY29kZVwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzQ29kZShzdGF0ZSwgcmVzcG9uc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmlkX3Rva2VuKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlVG9rZW5zOiBWYWxpZGF0aW5nIGlkX3Rva2VuIGFuZCBhY2Nlc3NfdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlSWRUb2tlbkFuZEFjY2Vzc1Rva2VuKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZVRva2VuczogVmFsaWRhdGluZyBpZF90b2tlblwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUlkVG9rZW4oc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZVRva2VuczogTm8gY29kZSB0byBwcm9jZXNzIG9yIGlkX3Rva2VuIHRvIHZhbGlkYXRlXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBfcHJvY2Vzc0NvZGUoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgY2xpZW50X2lkOiBzdGF0ZS5jbGllbnRfaWQsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBzdGF0ZS5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgY29kZSA6IHJlc3BvbnNlLmNvZGUsXG4gICAgICAgICAgICByZWRpcmVjdF91cmk6IHN0YXRlLnJlZGlyZWN0X3VyaSxcbiAgICAgICAgICAgIGNvZGVfdmVyaWZpZXI6IHN0YXRlLmNvZGVfdmVyaWZpZXJcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc3RhdGUuZXh0cmFUb2tlblBhcmFtcyAmJiB0eXBlb2Yoc3RhdGUuZXh0cmFUb2tlblBhcmFtcykgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlcXVlc3QsIHN0YXRlLmV4dHJhVG9rZW5QYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlKHJlcXVlc3QpLnRoZW4odG9rZW5SZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHRva2VuUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZVtrZXldID0gdG9rZW5SZXNwb25zZVtrZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NvZGU6IHRva2VuIHJlc3BvbnNlIHN1Y2Nlc3NmdWwsIHByb2Nlc3NpbmcgaWRfdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXMoc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ29kZTogdG9rZW4gcmVzcG9uc2Ugc3VjY2Vzc2Z1bCwgcmV0dXJuaW5nIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldElzc3VlcigpLnRoZW4oaXNzdWVyID0+IHtcblxuICAgICAgICAgICAgbGV0IGF1ZGllbmNlID0gc3RhdGUuY2xpZW50X2lkO1xuICAgICAgICAgICAgbGV0IGNsb2NrU2tld0luU2Vjb25kcyA9IHRoaXMuX3NldHRpbmdzLmNsb2NrU2tldztcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzOiBWYWxpZGFpbmcgSldUIGF0dHJpYnV0ZXM7IHVzaW5nIGNsb2NrIHNrZXcgKGluIHNlY29uZHMpIG9mOiBcIiwgY2xvY2tTa2V3SW5TZWNvbmRzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLmdldEVwb2NoVGltZSgpLnRoZW4obm93ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fam9zZVV0aWwudmFsaWRhdGVKd3RBdHRyaWJ1dGVzKHJlc3BvbnNlLmlkX3Rva2VuLCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXdJblNlY29uZHMsIG5vdykudGhlbihwYXlsb2FkID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLm5vbmNlICYmIHN0YXRlLm5vbmNlICE9PSBwYXlsb2FkLm5vbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuQXR0cmlidXRlczogSW52YWxpZCBub25jZSBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIG5vbmNlIGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBheWxvYWQuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuQXR0cmlidXRlczogTm8gc3ViIHByZXNlbnQgaW4gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gc3ViIHByZXNlbnQgaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnByb2ZpbGUgPSBwYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlSWRUb2tlbkFuZEFjY2Vzc1Rva2VuKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVJZFRva2VuKHN0YXRlLCByZXNwb25zZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVBY2Nlc3NUb2tlbihyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9nZXRTaWduaW5nS2V5Rm9ySnd0KGp3dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFNpZ25pbmdLZXlzKCkudGhlbihrZXlzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtpZCA9IGp3dC5oZWFkZXIua2lkO1xuICAgICAgICAgICAgaWYgKCFrZXlzKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogTm8gc2lnbmluZyBrZXlzIGZyb20gbWV0YWRhdGFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHNpZ25pbmcga2V5cyBmcm9tIG1ldGFkYXRhXCIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogUmVjZWl2ZWQgc2lnbmluZyBrZXlzXCIpO1xuICAgICAgICAgICAgbGV0IGtleTtcbiAgICAgICAgICAgIGlmICgha2lkKSB7XG4gICAgICAgICAgICAgICAga2V5cyA9IHRoaXMuX2ZpbHRlckJ5QWxnKGtleXMsIGp3dC5oZWFkZXIuYWxnKTtcblxuICAgICAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogTm8ga2lkIGZvdW5kIGluIGlkX3Rva2VuIGFuZCBtb3JlIHRoYW4gb25lIGtleSBmb3VuZCBpbiBtZXRhZGF0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGtpZCBmb3VuZCBpbiBpZF90b2tlbiBhbmQgbW9yZSB0aGFuIG9uZSBrZXkgZm91bmQgaW4gbWV0YWRhdGFcIikpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGtpZCBpcyBtYW5kYXRvcnkgb25seSB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSBrZXlzIGluIHRoZSByZWZlcmVuY2VkIEpXSyBTZXQgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VlIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjU2lnbmluZ1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAga2V5ID0ga2V5cy5maWx0ZXIoa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleS5raWQgPT09IGtpZDtcbiAgICAgICAgICAgICAgICB9KVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2dldFNpZ25pbmdLZXlGb3JKd3RXaXRoU2luZ2xlUmV0cnkoand0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTaWduaW5nS2V5Rm9ySnd0KGp3dCkudGhlbihrZXkgPT4ge1xuICAgICAgICAgICAgLy8gUmVmcmVzaGluZyBzaWduaW5nS2V5cyBpZiBubyBzdWl0YWJsZSB2ZXJpZmljYXRpb24ga2V5IGlzIHByZXNlbnQgZm9yIGdpdmVuIGp3dCBoZWFkZXIuXG4gICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgIC8vIHNldCB0byB1bmRlZmluZWQsIHRvIHRyaWdnZXIgbmV0d29yayBjYWxsIHRvIGp3a3NfdXJpLlxuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZS5yZXNldFNpZ25pbmdLZXlzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNpZ25pbmdLZXlGb3JKd3Qoand0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVJZFRva2VuKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoIXN0YXRlLm5vbmNlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBObyBub25jZSBvbiBzdGF0ZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBub25jZSBvbiBzdGF0ZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgand0ID0gdGhpcy5fam9zZVV0aWwucGFyc2VKd3QocmVzcG9uc2UuaWRfdG9rZW4pO1xuICAgICAgICBpZiAoIWp3dCB8fCAhand0LmhlYWRlciB8fCAhand0LnBheWxvYWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IEZhaWxlZCB0byBwYXJzZSBpZF90b2tlblwiLCBqd3QpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUubm9uY2UgIT09IGp3dC5wYXlsb2FkLm5vbmNlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBJbnZhbGlkIG5vbmNlIGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgbm9uY2UgaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRJc3N1ZXIoKS50aGVuKGlzc3VlciA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBSZWNlaXZlZCBpc3N1ZXJcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U2lnbmluZ0tleUZvckp3dFdpdGhTaW5nbGVSZXRyeShqd3QpLnRoZW4oa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBObyBrZXkgbWF0Y2hpbmcga2lkIG9yIGFsZyBmb3VuZCBpbiBzaWduaW5nIGtleXNcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBrZXkgbWF0Y2hpbmcga2lkIG9yIGFsZyBmb3VuZCBpbiBzaWduaW5nIGtleXNcIikpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBhdWRpZW5jZSA9IHN0YXRlLmNsaWVudF9pZDtcblxuICAgICAgICAgICAgICAgIGxldCBjbG9ja1NrZXdJblNlY29uZHMgPSB0aGlzLl9zZXR0aW5ncy5jbG9ja1NrZXc7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogVmFsaWRhaW5nIEpXVDsgdXNpbmcgY2xvY2sgc2tldyAoaW4gc2Vjb25kcykgb2Y6IFwiLCBjbG9ja1NrZXdJblNlY29uZHMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvc2VVdGlsLnZhbGlkYXRlSnd0KHJlc3BvbnNlLmlkX3Rva2VuLCBrZXksIGlzc3VlciwgYXVkaWVuY2UsIGNsb2NrU2tld0luU2Vjb25kcykudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBKV1QgdmFsaWRhdGlvbiBzdWNjZXNzZnVsXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghand0LnBheWxvYWQuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBObyBzdWIgcHJlc2VudCBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzdWIgcHJlc2VudCBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5wcm9maWxlID0gand0LnBheWxvYWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9maWx0ZXJCeUFsZyhrZXlzLCBhbGcpe1xuICAgICAgICB2YXIga3R5ID0gbnVsbDtcbiAgICAgICAgaWYgKGFsZy5zdGFydHNXaXRoKFwiUlNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiUlNBXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJQU1wiKSkge1xuICAgICAgICAgICAga3R5ID0gXCJQU1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsZy5zdGFydHNXaXRoKFwiRVNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiRUNcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJCeUFsZzogYWxnIG5vdCBzdXBwb3J0ZWQ6IFwiLCBhbGcpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlckJ5QWxnOiBMb29raW5nIGZvciBrZXlzIHRoYXQgbWF0Y2gga3R5OiBcIiwga3R5KTtcblxuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoa2V5ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrZXkua3R5ID09PSBrdHk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJCeUFsZzogTnVtYmVyIG9mIGtleXMgdGhhdCBtYXRjaCBrdHk6IFwiLCBrdHksIGtleXMubGVuZ3RoKTtcblxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVBY2Nlc3NUb2tlbihyZXNwb25zZSkge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLnByb2ZpbGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBObyBwcm9maWxlIGxvYWRlZCBmcm9tIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHByb2ZpbGUgbG9hZGVkIGZyb20gaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5wcm9maWxlLmF0X2hhc2gpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBObyBhdF9oYXNoIGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGF0X2hhc2ggaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5pZF90b2tlbikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IE5vIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBqd3QgPSB0aGlzLl9qb3NlVXRpbC5wYXJzZUp3dChyZXNwb25zZS5pZF90b2tlbik7XG4gICAgICAgIGlmICghand0IHx8ICFqd3QuaGVhZGVyKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIsIGp3dCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYXNoQWxnID0gand0LmhlYWRlci5hbGc7XG4gICAgICAgIGlmICghaGFzaEFsZyB8fCBoYXNoQWxnLmxlbmd0aCAhPT0gNSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IFVuc3VwcG9ydGVkIGFsZzpcIiwgaGFzaEFsZyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgYWxnOiBcIiArIGhhc2hBbGcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYXNoQml0cyA9IGhhc2hBbGcuc3Vic3RyKDIsIDMpO1xuICAgICAgICBpZiAoIWhhc2hCaXRzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogVW5zdXBwb3J0ZWQgYWxnOlwiLCBoYXNoQWxnLCBoYXNoQml0cyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgYWxnOiBcIiArIGhhc2hBbGcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc2hCaXRzID0gcGFyc2VJbnQoaGFzaEJpdHMpO1xuICAgICAgICBpZiAoaGFzaEJpdHMgIT09IDI1NiAmJiBoYXNoQml0cyAhPT0gMzg0ICYmIGhhc2hCaXRzICE9PSA1MTIpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBVbnN1cHBvcnRlZCBhbGc6XCIsIGhhc2hBbGcsIGhhc2hCaXRzKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBhbGc6IFwiICsgaGFzaEFsZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNoYSA9IFwic2hhXCIgKyBoYXNoQml0cztcbiAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9qb3NlVXRpbC5oYXNoU3RyaW5nKHJlc3BvbnNlLmFjY2Vzc190b2tlbiwgc2hhKTtcbiAgICAgICAgaWYgKCFoYXNoKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogYWNjZXNzX3Rva2VuIGhhc2ggZmFpbGVkOlwiLCBzaGEpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byB2YWxpZGF0ZSBhdF9oYXNoXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsZWZ0ID0gaGFzaC5zdWJzdHIoMCwgaGFzaC5sZW5ndGggLyAyKTtcbiAgICAgICAgdmFyIGxlZnRfYjY0dSA9IHRoaXMuX2pvc2VVdGlsLmhleFRvQmFzZTY0VXJsKGxlZnQpO1xuICAgICAgICBpZiAobGVmdF9iNjR1ICE9PSByZXNwb25zZS5wcm9maWxlLmF0X2hhc2gpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBGYWlsZWQgdG8gdmFsaWRhdGUgYXRfaGFzaFwiLCBsZWZ0X2I2NHUsIHJlc3BvbnNlLnByb2ZpbGUuYXRfaGFzaCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHZhbGlkYXRlIGF0X2hhc2hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IHN1Y2Nlc3NcIik7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgQ2hlY2tTZXNzaW9uSUZyYW1lIH0gZnJvbSAnLi9DaGVja1Nlc3Npb25JRnJhbWUuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuXG5leHBvcnQgY2xhc3MgU2Vzc2lvbk1vbml0b3Ige1xuXG4gICAgY29uc3RydWN0b3IodXNlck1hbmFnZXIsIENoZWNrU2Vzc2lvbklGcmFtZUN0b3IgPSBDaGVja1Nlc3Npb25JRnJhbWUsIHRpbWVyID0gR2xvYmFsLnRpbWVyKSB7XG4gICAgICAgIGlmICghdXNlck1hbmFnZXIpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yLmN0b3I6IE5vIHVzZXIgbWFuYWdlciBwYXNzZWQgdG8gU2Vzc2lvbk1vbml0b3JcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyTWFuYWdlclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyID0gdXNlck1hbmFnZXI7XG4gICAgICAgIHRoaXMuX0NoZWNrU2Vzc2lvbklGcmFtZUN0b3IgPSBDaGVja1Nlc3Npb25JRnJhbWVDdG9yO1xuICAgICAgICB0aGlzLl90aW1lciA9IHRpbWVyO1xuXG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5hZGRVc2VyTG9hZGVkKHRoaXMuX3N0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuYWRkVXNlclVubG9hZGVkKHRoaXMuX3N0b3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3VzZXJNYW5hZ2VyLmdldFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgLy8gZG9pbmcgdGhpcyBtYW51YWxseSBoZXJlIHNpbmNlIGNhbGxpbmcgZ2V0VXNlciBcbiAgICAgICAgICAgIC8vIGRvZXNuJ3QgdHJpZ2dlciBsb2FkIGV2ZW50LlxuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCh1c2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NldHRpbmdzLm1vbml0b3JBbm9ueW1vdXNTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzKCkudGhlbihzZXNzaW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcFVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uX3N0YXRlIDogc2Vzc2lvbi5zZXNzaW9uX3N0YXRlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLnN1YiAmJiBzZXNzaW9uLnNpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wVXNlci5wcm9maWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Yjogc2Vzc2lvbi5zdWIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkOiBzZXNzaW9uLnNpZFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCh0bXBVc2VyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gYSBjdG9yXG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yIGN0b3I6IGVycm9yIGZyb20gcXVlcnlTZXNzaW9uU3RhdHVzOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gYSBjdG9yXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTZXNzaW9uTW9uaXRvciBjdG9yOiBlcnJvciBmcm9tIGdldFVzZXI6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGdldCBfc2V0dGluZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyTWFuYWdlci5zZXR0aW5ncztcbiAgICB9XG4gICAgZ2V0IF9tZXRhZGF0YVNlcnZpY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyTWFuYWdlci5tZXRhZGF0YVNlcnZpY2U7XG4gICAgfVxuICAgIGdldCBfY2xpZW50X2lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuICAgIH1cbiAgICBnZXQgX2NoZWNrU2Vzc2lvbkludGVydmFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MuY2hlY2tTZXNzaW9uSW50ZXJ2YWw7XG4gICAgfVxuICAgIGdldCBfc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5zdG9wQ2hlY2tTZXNzaW9uT25FcnJvcjtcbiAgICB9XG5cbiAgICBfc3RhcnQodXNlcikge1xuICAgICAgICBsZXQgc2Vzc2lvbl9zdGF0ZSA9IHVzZXIuc2Vzc2lvbl9zdGF0ZTtcblxuICAgICAgICBpZiAoc2Vzc2lvbl9zdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YiA9IHVzZXIucHJvZmlsZS5zdWI7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2lkID0gdXNlci5wcm9maWxlLnNpZDtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fc3RhcnQ6IHNlc3Npb25fc3RhdGU6XCIsIHNlc3Npb25fc3RhdGUsIFwiLCBzdWI6XCIsIHRoaXMuX3N1Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2lkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogc2Vzc2lvbl9zdGF0ZTpcIiwgc2Vzc2lvbl9zdGF0ZSwgXCIsIGFub255bW91cyB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRDaGVja1Nlc3Npb25JZnJhbWUoKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogSW5pdGlhbGl6aW5nIGNoZWNrIHNlc3Npb24gaWZyYW1lXCIpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGllbnRfaWQgPSB0aGlzLl9jbGllbnRfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSB0aGlzLl9jaGVja1Nlc3Npb25JbnRlcnZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdG9wT25FcnJvciA9IHRoaXMuX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUgPSBuZXcgdGhpcy5fQ2hlY2tTZXNzaW9uSUZyYW1lQ3Rvcih0aGlzLl9jYWxsYmFjay5iaW5kKHRoaXMpLCBjbGllbnRfaWQsIHVybCwgaW50ZXJ2YWwsIHN0b3BPbkVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZS5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lLnN0YXJ0KHNlc3Npb25fc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cud2FybihcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogTm8gY2hlY2sgc2Vzc2lvbiBpZnJhbWUgZm91bmQgaW4gdGhlIG1ldGFkYXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2F0Y2ggdG8gc3VwcHJlc3MgZXJyb3JzIHNpbmNlIHdlJ3JlIGluIG5vbi1wcm9taXNlIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogRXJyb3IgZnJvbSBnZXRDaGVja1Nlc3Npb25JZnJhbWU6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZS5zdGFydChzZXNzaW9uX3N0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zdG9wKCkge1xuICAgICAgICB0aGlzLl9zdWIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3NpZCA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fc3RvcFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZS5zdG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MubW9uaXRvckFub255bW91c1Nlc3Npb24pIHtcbiAgICAgICAgICAgIC8vIHVzaW5nIGEgdGltZXIgdG8gZGVsYXkgcmUtaW5pdGlhbGl6YXRpb24gdG8gYXZvaWQgcmFjZSBjb25kaXRpb25zIGR1cmluZyBzaWdub3V0XG4gICAgICAgICAgICBsZXQgdGltZXJIYW5kbGUgPSB0aGlzLl90aW1lci5zZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyLmNsZWFySW50ZXJ2YWwodGltZXJIYW5kbGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzKCkudGhlbihzZXNzaW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcFVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uX3N0YXRlIDogc2Vzc2lvbi5zZXNzaW9uX3N0YXRlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLnN1YiAmJiBzZXNzaW9uLnNpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wVXNlci5wcm9maWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Yjogc2Vzc2lvbi5zdWIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkOiBzZXNzaW9uLnNpZFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCh0bXBVc2VyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gYSBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJTZXNzaW9uTW9uaXRvcjogZXJyb3IgZnJvbSBxdWVyeVNlc3Npb25TdGF0dXM6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1cygpLnRoZW4oc2Vzc2lvbiA9PiB7XG4gICAgICAgICAgICB2YXIgcmFpc2VFdmVudCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChzZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uc3ViID09PSB0aGlzLl9zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFpc2VFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUuc3RhcnQoc2Vzc2lvbi5zZXNzaW9uX3N0YXRlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5zaWQgPT09IHRoaXMuX3NpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBTYW1lIHN1YiBzdGlsbCBsb2dnZWQgaW4gYXQgT1AsIHJlc3RhcnRpbmcgY2hlY2sgc2Vzc2lvbiBpZnJhbWU7IHNlc3Npb25fc3RhdGU6XCIsIHNlc3Npb24uc2Vzc2lvbl9zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IFNhbWUgc3ViIHN0aWxsIGxvZ2dlZCBpbiBhdCBPUCwgc2Vzc2lvbiBzdGF0ZSBoYXMgY2hhbmdlZCwgcmVzdGFydGluZyBjaGVjayBzZXNzaW9uIGlmcmFtZTsgc2Vzc2lvbl9zdGF0ZTpcIiwgc2Vzc2lvbi5zZXNzaW9uX3N0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VVc2VyU2Vzc2lvbkNoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBEaWZmZXJlbnQgc3ViamVjdCBzaWduZWQgaW50byBPUDpcIiwgc2Vzc2lvbi5zdWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogU3ViamVjdCBubyBsb25nZXIgc2lnbmVkIGludG8gT1BcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyYWlzZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IFNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazsgcmFpc2luZyBzaWduZWQgb3V0IGV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuX3JhaXNlVXNlclNpZ25lZE91dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s7IHJhaXNpbmcgc2lnbmVkIGluIGV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuX3JhaXNlVXNlclNpZ25lZEluKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N1Yikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogRXJyb3IgY2FsbGluZyBxdWVyeUN1cnJlbnRTaWduaW5TZXNzaW9uOyByYWlzaW5nIHNpZ25lZCBvdXQgZXZlbnRcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkT3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuaW1wb3J0IHsgU2lnbmluU3RhdGUgfSBmcm9tICcuL1NpZ25pblN0YXRlLmpzJztcblxuZXhwb3J0IGNsYXNzIFNpZ25pblJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgLy8gbWFuZGF0b3J5XG4gICAgICAgIHVybCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmksIHJlc3BvbnNlX3R5cGUsIHNjb3BlLCBhdXRob3JpdHksXG4gICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgIGRhdGEsIHByb21wdCwgZGlzcGxheSwgbWF4X2FnZSwgdWlfbG9jYWxlcywgaWRfdG9rZW5faGludCwgbG9naW5faGludCwgYWNyX3ZhbHVlcywgcmVzb3VyY2UsIHJlc3BvbnNlX21vZGUsXG4gICAgICAgIHJlcXVlc3QsIHJlcXVlc3RfdXJpLCBleHRyYVF1ZXJ5UGFyYW1zLCByZXF1ZXN0X3R5cGUsIGNsaWVudF9zZWNyZXQsIGV4dHJhVG9rZW5QYXJhbXMsIHNraXBVc2VySW5mb1xuICAgIH0pIHtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gdXJsIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVybFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNsaWVudF9pZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbmluUmVxdWVzdC5jdG9yOiBObyBjbGllbnRfaWQgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2xpZW50X2lkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVkaXJlY3RfdXJpKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIHJlZGlyZWN0X3VyaSBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZWRpcmVjdF91cmlcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXNwb25zZV90eXBlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIHJlc3BvbnNlX3R5cGUgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmVzcG9uc2VfdHlwZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNjb3BlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIHNjb3BlIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNjb3BlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIGF1dGhvcml0eSBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdXRob3JpdHlcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb2lkYyA9IFNpZ25pblJlcXVlc3QuaXNPaWRjKHJlc3BvbnNlX3R5cGUpO1xuICAgICAgICBsZXQgY29kZSA9IFNpZ25pblJlcXVlc3QuaXNDb2RlKHJlc3BvbnNlX3R5cGUpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2VfbW9kZSkge1xuICAgICAgICAgICAgcmVzcG9uc2VfbW9kZSA9IFNpZ25pblJlcXVlc3QuaXNDb2RlKHJlc3BvbnNlX3R5cGUpID8gXCJxdWVyeVwiIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgU2lnbmluU3RhdGUoeyBub25jZTogb2lkYywgXG4gICAgICAgICAgICBkYXRhLCBjbGllbnRfaWQsIGF1dGhvcml0eSwgcmVkaXJlY3RfdXJpLCBcbiAgICAgICAgICAgIGNvZGVfdmVyaWZpZXI6IGNvZGUsIFxuICAgICAgICAgICAgcmVxdWVzdF90eXBlLCByZXNwb25zZV9tb2RlLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCwgc2NvcGUsIGV4dHJhVG9rZW5QYXJhbXMsIHNraXBVc2VySW5mbyB9KTtcblxuICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcImNsaWVudF9pZFwiLCBjbGllbnRfaWQpO1xuICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInJlZGlyZWN0X3VyaVwiLCByZWRpcmVjdF91cmkpO1xuICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInJlc3BvbnNlX3R5cGVcIiwgcmVzcG9uc2VfdHlwZSk7XG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwic2NvcGVcIiwgc2NvcGUpO1xuXG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwic3RhdGVcIiwgdGhpcy5zdGF0ZS5pZCk7XG4gICAgICAgIGlmIChvaWRjKSB7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcIm5vbmNlXCIsIHRoaXMuc3RhdGUubm9uY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcImNvZGVfY2hhbGxlbmdlXCIsIHRoaXMuc3RhdGUuY29kZV9jaGFsbGVuZ2UpO1xuICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJjb2RlX2NoYWxsZW5nZV9tZXRob2RcIiwgXCJTMjU2XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9wdGlvbmFsID0geyBwcm9tcHQsIGRpc3BsYXksIG1heF9hZ2UsIHVpX2xvY2FsZXMsIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQsIGFjcl92YWx1ZXMsIHJlc291cmNlLCByZXF1ZXN0LCByZXF1ZXN0X3VyaSwgcmVzcG9uc2VfbW9kZSB9O1xuICAgICAgICBmb3IobGV0IGtleSBpbiBvcHRpb25hbCl7XG4gICAgICAgICAgICBpZiAob3B0aW9uYWxba2V5XSkge1xuICAgICAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIGtleSwgb3B0aW9uYWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGtleSBpbiBleHRyYVF1ZXJ5UGFyYW1zKXtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIGtleSwgZXh0cmFRdWVyeVBhcmFtc1trZXldKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzT2lkYyhyZXNwb25zZV90eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZXNwb25zZV90eXBlLnNwbGl0KC9cXHMrL2cpLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gXCJpZF90b2tlblwiO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICEhKHJlc3VsdFswXSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzT0F1dGgocmVzcG9uc2VfdHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVzcG9uc2VfdHlwZS5zcGxpdCgvXFxzKy9nKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09IFwidG9rZW5cIjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAhIShyZXN1bHRbMF0pO1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgaXNDb2RlKHJlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3BvbnNlX3R5cGUuc3BsaXQoL1xccysvZykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtID09PSBcImNvZGVcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAhIShyZXN1bHRbMF0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuXG5jb25zdCBPaWRjU2NvcGUgPSBcIm9wZW5pZFwiO1xuXG5leHBvcnQgY2xhc3MgU2lnbmluUmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgZGVsaW1pdGVyID0gXCIjXCIpIHtcblxuICAgICAgICB2YXIgdmFsdWVzID0gVXJsVXRpbGl0eS5wYXJzZVVybEZyYWdtZW50KHVybCwgZGVsaW1pdGVyKTtcblxuICAgICAgICB0aGlzLmVycm9yID0gdmFsdWVzLmVycm9yO1xuICAgICAgICB0aGlzLmVycm9yX2Rlc2NyaXB0aW9uID0gdmFsdWVzLmVycm9yX2Rlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmVycm9yX3VyaSA9IHZhbHVlcy5lcnJvcl91cmk7XG5cbiAgICAgICAgdGhpcy5jb2RlID0gdmFsdWVzLmNvZGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB2YWx1ZXMuc3RhdGU7XG4gICAgICAgIHRoaXMuaWRfdG9rZW4gPSB2YWx1ZXMuaWRfdG9rZW47XG4gICAgICAgIHRoaXMuc2Vzc2lvbl9zdGF0ZSA9IHZhbHVlcy5zZXNzaW9uX3N0YXRlO1xuICAgICAgICB0aGlzLmFjY2Vzc190b2tlbiA9IHZhbHVlcy5hY2Nlc3NfdG9rZW47XG4gICAgICAgIHRoaXMudG9rZW5fdHlwZSA9IHZhbHVlcy50b2tlbl90eXBlO1xuICAgICAgICB0aGlzLnNjb3BlID0gdmFsdWVzLnNjb3BlO1xuICAgICAgICB0aGlzLnByb2ZpbGUgPSB1bmRlZmluZWQ7IC8vIHdpbGwgYmUgc2V0IGZyb20gUmVzcG9uc2VWYWxpZGF0b3JcblxuICAgICAgICB0aGlzLmV4cGlyZXNfaW4gPSB2YWx1ZXMuZXhwaXJlc19pbjtcbiAgICB9XG5cbiAgICBnZXQgZXhwaXJlc19pbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgbGV0IG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGlyZXNfYXQgLSBub3c7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc2V0IGV4cGlyZXNfaW4odmFsdWUpe1xuICAgICAgICBsZXQgZXhwaXJlc19pbiA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBleHBpcmVzX2luID09PSAnbnVtYmVyJyAmJiBleHBpcmVzX2luID4gMCkge1xuICAgICAgICAgICAgbGV0IG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMuZXhwaXJlc19hdCA9IG5vdyArIGV4cGlyZXNfaW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZXhwaXJlZCgpIHtcbiAgICAgICAgbGV0IGV4cGlyZXNfaW4gPSB0aGlzLmV4cGlyZXNfaW47XG4gICAgICAgIGlmIChleHBpcmVzX2luICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBleHBpcmVzX2luIDw9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgc2NvcGVzKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2NvcGUgfHwgXCJcIikuc3BsaXQoXCIgXCIpO1xuICAgIH1cblxuICAgIGdldCBpc09wZW5JZENvbm5lY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Blcy5pbmRleE9mKE9pZGNTY29wZSkgPj0gMCB8fCAhIXRoaXMuaWRfdG9rZW47XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuL1N0YXRlLmpzJztcbmltcG9ydCB7IEpvc2VVdGlsIH0gZnJvbSAnLi9Kb3NlVXRpbC5qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tLmpzJztcblxuZXhwb3J0IGNsYXNzIFNpZ25pblN0YXRlIGV4dGVuZHMgU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKHtub25jZSwgYXV0aG9yaXR5LCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaSwgY29kZV92ZXJpZmllciwgcmVzcG9uc2VfbW9kZSwgY2xpZW50X3NlY3JldCwgc2NvcGUsIGV4dHJhVG9rZW5QYXJhbXMsIHNraXBVc2VySW5mb30gPSB7fSkge1xuICAgICAgICBzdXBlcihhcmd1bWVudHNbMF0pO1xuXG4gICAgICAgIGlmIChub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbm9uY2UgPSByYW5kb20oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub25jZSkge1xuICAgICAgICAgICAgdGhpcy5fbm9uY2UgPSBub25jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2RlX3ZlcmlmaWVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyByYW5kb20oKSBwcm9kdWNlcyAzMiBsZW5ndGhcbiAgICAgICAgICAgIHRoaXMuX2NvZGVfdmVyaWZpZXIgPSByYW5kb20oKSArIHJhbmRvbSgpICsgcmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZV92ZXJpZmllcikge1xuICAgICAgICAgICAgdGhpcy5fY29kZV92ZXJpZmllciA9IGNvZGVfdmVyaWZpZXI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmNvZGVfdmVyaWZpZXIpIHtcbiAgICAgICAgICAgIGxldCBoYXNoID0gSm9zZVV0aWwuaGFzaFN0cmluZyh0aGlzLmNvZGVfdmVyaWZpZXIsIFwiU0hBMjU2XCIpO1xuICAgICAgICAgICAgdGhpcy5fY29kZV9jaGFsbGVuZ2UgPSBKb3NlVXRpbC5oZXhUb0Jhc2U2NFVybChoYXNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlZGlyZWN0X3VyaSA9IHJlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fYXV0aG9yaXR5ID0gYXV0aG9yaXR5O1xuICAgICAgICB0aGlzLl9jbGllbnRfaWQgPSBjbGllbnRfaWQ7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlX21vZGUgPSByZXNwb25zZV9tb2RlO1xuICAgICAgICB0aGlzLl9jbGllbnRfc2VjcmV0ID0gY2xpZW50X3NlY3JldDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZXh0cmFUb2tlblBhcmFtcyA9IGV4dHJhVG9rZW5QYXJhbXM7XG4gICAgICAgIHRoaXMuX3NraXBVc2VySW5mbyA9IHNraXBVc2VySW5mbztcbiAgICB9XG5cbiAgICBnZXQgbm9uY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub25jZTtcbiAgICB9XG4gICAgZ2V0IGF1dGhvcml0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dGhvcml0eTtcbiAgICB9XG4gICAgZ2V0IGNsaWVudF9pZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9pZDtcbiAgICB9XG4gICAgZ2V0IHJlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgZ2V0IGNvZGVfdmVyaWZpZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2RlX3ZlcmlmaWVyO1xuICAgIH1cbiAgICBnZXQgY29kZV9jaGFsbGVuZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2RlX2NoYWxsZW5nZTtcbiAgICB9XG4gICAgZ2V0IHJlc3BvbnNlX21vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zZV9tb2RlO1xuICAgIH1cbiAgICBnZXQgY2xpZW50X3NlY3JldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9zZWNyZXQ7XG4gICAgfVxuICAgIGdldCBzY29wZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3BlO1xuICAgIH1cbiAgICBnZXQgZXh0cmFUb2tlblBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXM7XG4gICAgfVxuICAgIGdldCBza2lwVXNlckluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9za2lwVXNlckluZm87XG4gICAgfVxuICAgIFxuICAgIHRvU3RvcmFnZVN0cmluZygpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiU2lnbmluU3RhdGUudG9TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBjcmVhdGVkOiB0aGlzLmNyZWF0ZWQsXG4gICAgICAgICAgICByZXF1ZXN0X3R5cGU6IHRoaXMucmVxdWVzdF90eXBlLFxuICAgICAgICAgICAgbm9uY2U6IHRoaXMubm9uY2UsXG4gICAgICAgICAgICBjb2RlX3ZlcmlmaWVyOiB0aGlzLmNvZGVfdmVyaWZpZXIsXG4gICAgICAgICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgYXV0aG9yaXR5OiB0aGlzLmF1dGhvcml0eSxcbiAgICAgICAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRfaWQsXG4gICAgICAgICAgICByZXNwb25zZV9tb2RlOiB0aGlzLnJlc3BvbnNlX21vZGUsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0OiB0aGlzLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgICAgICAgIGV4dHJhVG9rZW5QYXJhbXMgOiB0aGlzLmV4dHJhVG9rZW5QYXJhbXMsXG4gICAgICAgICAgICBza2lwVXNlckluZm86IHRoaXMuc2tpcFVzZXJJbmZvXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tU3RvcmFnZVN0cmluZyhzdG9yYWdlU3RyaW5nKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlNpZ25pblN0YXRlLmZyb21TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cmluZyk7XG4gICAgICAgIHJldHVybiBuZXcgU2lnbmluU3RhdGUoZGF0YSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vU3RhdGUuanMnO1xuXG5leHBvcnQgY2xhc3MgU2lnbm91dFJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKHt1cmwsIGlkX3Rva2VuX2hpbnQsIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSwgZGF0YSwgZXh0cmFRdWVyeVBhcmFtcywgcmVxdWVzdF90eXBlfSkge1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbm91dFJlcXVlc3QuY3RvcjogTm8gdXJsIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVybFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpZF90b2tlbl9oaW50KSB7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcImlkX3Rva2VuX2hpbnRcIiwgaWRfdG9rZW5faGludCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpKSB7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaVwiLCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgU3RhdGUoeyBkYXRhLCByZXF1ZXN0X3R5cGUgfSk7XG5cbiAgICAgICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInN0YXRlXCIsIHRoaXMuc3RhdGUuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBrZXkgaW4gZXh0cmFRdWVyeVBhcmFtcyl7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBrZXksIGV4dHJhUXVlcnlQYXJhbXNba2V5XSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuXG5leHBvcnQgY2xhc3MgU2lnbm91dFJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcblxuICAgICAgICB2YXIgdmFsdWVzID0gVXJsVXRpbGl0eS5wYXJzZVVybEZyYWdtZW50KHVybCwgXCI/XCIpO1xuXG4gICAgICAgIHRoaXMuZXJyb3IgPSB2YWx1ZXMuZXJyb3I7XG4gICAgICAgIHRoaXMuZXJyb3JfZGVzY3JpcHRpb24gPSB2YWx1ZXMuZXJyb3JfZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZXJyb3JfdXJpID0gdmFsdWVzLmVycm9yX3VyaTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gdmFsdWVzLnN0YXRlO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIFNpbGVudFJlbmV3U2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1c2VyTWFuYWdlcikge1xuICAgICAgICB0aGlzLl91c2VyTWFuYWdlciA9IHVzZXJNYW5hZ2VyO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHRoaXMuX3Rva2VuRXhwaXJpbmcuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5hZGRBY2Nlc3NUb2tlbkV4cGlyaW5nKHRoaXMuX2NhbGxiYWNrKTtcblxuICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHRyaWdnZXIgbG9hZGluZyBvZiB0aGUgdXNlciBzbyB0aGUgZXhwaXJpbmcgZXZlbnRzIGNhbiBiZSBpbml0aWFsaXplZFxuICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZ2V0VXNlcigpLnRoZW4odXNlcj0+e1xuICAgICAgICAgICAgICAgIC8vIGRlbGliZXJhdGUgbm9wXG4gICAgICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gYSBjdG9yXG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lsZW50UmVuZXdTZXJ2aWNlLnN0YXJ0OiBFcnJvciBmcm9tIGdldFVzZXI6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMucmVtb3ZlQWNjZXNzVG9rZW5FeHBpcmluZyh0aGlzLl9jYWxsYmFjayk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdG9rZW5FeHBpcmluZygpIHtcbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuc2lnbmluU2lsZW50KCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNpbGVudFJlbmV3U2VydmljZS5fdG9rZW5FeHBpcmluZzogU2lsZW50IHRva2VuIHJlbmV3YWwgc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpbGVudFJlbmV3U2VydmljZS5fdG9rZW5FeHBpcmluZzogRXJyb3IgZnJvbSBzaWduaW5TaWxlbnQ6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VTaWxlbnRSZW5ld0Vycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20uanMnO1xuXG5leHBvcnQgY2xhc3MgU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKHtpZCwgZGF0YSwgY3JlYXRlZCwgcmVxdWVzdF90eXBlfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2lkID0gaWQgfHwgcmFuZG9tKCk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY3JlYXRlZCA9PT0gJ251bWJlcicgJiYgY3JlYXRlZCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZWQgPSBjcmVhdGVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlZCA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXF1ZXN0X3R5cGUgPSAgcmVxdWVzdF90eXBlO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cbiAgICBnZXQgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxuICAgIGdldCBjcmVhdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlZDtcbiAgICB9XG4gICAgZ2V0IHJlcXVlc3RfdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RfdHlwZTtcbiAgICB9XG5cbiAgICB0b1N0b3JhZ2VTdHJpbmcoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLnRvU3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgY3JlYXRlZDogdGhpcy5jcmVhdGVkLFxuICAgICAgICAgICAgcmVxdWVzdF90eXBlOiB0aGlzLnJlcXVlc3RfdHlwZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbVN0b3JhZ2VTdHJpbmcoc3RvcmFnZVN0cmluZykge1xuICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5mcm9tU3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZShKU09OLnBhcnNlKHN0b3JhZ2VTdHJpbmcpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXJTdGFsZVN0YXRlKHN0b3JhZ2UsIGFnZSkge1xuXG4gICAgICAgIHZhciBjdXRvZmYgPSBEYXRlLm5vdygpIC8gMTAwMCAtIGFnZTtcblxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRBbGxLZXlzKCkudGhlbihrZXlzID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLmNsZWFyU3RhbGVTdGF0ZTogZ290IGtleXNcIiwga2V5cyk7XG5cbiAgICAgICAgICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBzdG9yYWdlLmdldChrZXkpLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1vdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5mcm9tU3RvcmFnZVN0cmluZyhpdGVtKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiBnb3QgaXRlbSBmcm9tIGtleTogXCIsIGtleSwgc3RhdGUuY3JlYXRlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuY3JlYXRlZCA8PSBjdXRvZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlN0YXRlLmNsZWFyU3RhbGVTdGF0ZTogRXJyb3IgcGFyc2luZyBzdGF0ZSBmb3Iga2V5XCIsIGtleSwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiBubyBpdGVtIGluIHN0b3JhZ2UgZm9yIGtleTogXCIsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiByZW1vdmVkIGl0ZW0gZm9yIGtleTogXCIsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmFnZS5yZW1vdmUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiB3YWl0aW5nIG9uIHByb21pc2UgY291bnQ6XCIsIHByb21pc2VzLmxlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vRXZlbnQuanMnO1xuXG5jb25zdCBUaW1lckR1cmF0aW9uID0gNTsgLy8gc2Vjb25kc1xuXG5leHBvcnQgY2xhc3MgVGltZXIgZXh0ZW5kcyBFdmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB0aW1lciA9IEdsb2JhbC50aW1lciwgbm93RnVuYyA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgdGhpcy5fdGltZXIgPSB0aW1lcjtcblxuICAgICAgICBpZiAobm93RnVuYykge1xuICAgICAgICAgICAgdGhpcy5fbm93RnVuYyA9IG5vd0Z1bmM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9ub3dGdW5jID0gKCkgPT4gRGF0ZS5ub3coKSAvIDEwMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbm93KCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5fbm93RnVuYygpKTtcbiAgICB9XG5cbiAgICBpbml0KGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChkdXJhdGlvbiA8PSAwKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZHVyYXRpb24gPSBwYXJzZUludChkdXJhdGlvbik7XG5cbiAgICAgICAgdmFyIGV4cGlyYXRpb24gPSB0aGlzLm5vdyArIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGhpcy5leHBpcmF0aW9uID09PSBleHBpcmF0aW9uICYmIHRoaXMuX3RpbWVySGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBubyBuZWVkIHRvIHJlaW5pdGlhbGl6ZSB0byBzYW1lIGV4cGlyYXRpb24sIHNvIGJhaWwgb3V0XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUaW1lci5pbml0IHRpbWVyIFwiICsgdGhpcy5fbmFtZSArIFwiIHNraXBwaW5nIGluaXRpYWxpemF0aW9uIHNpbmNlIGFscmVhZHkgaW5pdGlhbGl6ZWQgZm9yIGV4cGlyYXRpb246XCIsIHRoaXMuZXhwaXJhdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbmNlbCgpO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlRpbWVyLmluaXQgdGltZXIgXCIgKyB0aGlzLl9uYW1lICsgXCIgZm9yIGR1cmF0aW9uOlwiLCBkdXJhdGlvbik7XG4gICAgICAgIHRoaXMuX2V4cGlyYXRpb24gPSBleHBpcmF0aW9uO1xuXG4gICAgICAgIC8vIHdlJ3JlIHVzaW5nIGEgZmFpcmx5IHNob3J0IHRpbWVyIGFuZCB0aGVuIGNoZWNraW5nIHRoZSBleHBpcmF0aW9uIGluIHRoZVxuICAgICAgICAvLyBjYWxsYmFjayB0byBoYW5kbGUgc2NlbmFyaW9zIHdoZXJlIHRoZSBicm93c2VyIGRldmljZSBzbGVlcHMsIGFuZCB0aGVuXG4gICAgICAgIC8vIHRoZSB0aW1lcnMgZW5kIHVwIGdldHRpbmcgZGVsYXllZC5cbiAgICAgICAgdmFyIHRpbWVyRHVyYXRpb24gPSBUaW1lckR1cmF0aW9uO1xuICAgICAgICBpZiAoZHVyYXRpb24gPCB0aW1lckR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aW1lckR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdGltZXJIYW5kbGUgPSB0aGlzLl90aW1lci5zZXRJbnRlcnZhbCh0aGlzLl9jYWxsYmFjay5iaW5kKHRoaXMpLCB0aW1lckR1cmF0aW9uICogMTAwMCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBleHBpcmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwaXJhdGlvbjtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLl90aW1lckhhbmRsZSkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVGltZXIuY2FuY2VsOiBcIiwgdGhpcy5fbmFtZSk7XG4gICAgICAgICAgICB0aGlzLl90aW1lci5jbGVhckludGVydmFsKHRoaXMuX3RpbWVySGFuZGxlKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVySGFuZGxlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxsYmFjaygpIHtcbiAgICAgICAgdmFyIGRpZmYgPSB0aGlzLl9leHBpcmF0aW9uIC0gdGhpcy5ub3c7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlRpbWVyLmNhbGxiYWNrOyBcIiArIHRoaXMuX25hbWUgKyBcIiB0aW1lciBleHBpcmVzIGluOlwiLCBkaWZmKTtcblxuICAgICAgICBpZiAodGhpcy5fZXhwaXJhdGlvbiA8PSB0aGlzLm5vdykge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgIHN1cGVyLnJhaXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBKc29uU2VydmljZSB9IGZyb20gJy4vSnNvblNlcnZpY2UuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgVG9rZW5DbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBKc29uU2VydmljZUN0b3IgPSBKc29uU2VydmljZSwgTWV0YWRhdGFTZXJ2aWNlQ3RvciA9IE1ldGFkYXRhU2VydmljZSkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5jdG9yOiBObyBzZXR0aW5ncyBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX2pzb25TZXJ2aWNlID0gbmV3IEpzb25TZXJ2aWNlQ3RvcigpO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgZXhjaGFuZ2VDb2RlKGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5ncmFudF90eXBlID0gYXJncy5ncmFudF90eXBlIHx8IFwiYXV0aG9yaXphdGlvbl9jb2RlXCI7XG4gICAgICAgIGFyZ3MuY2xpZW50X2lkID0gYXJncy5jbGllbnRfaWQgfHwgdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuICAgICAgICBhcmdzLmNsaWVudF9zZWNyZXQgPSBhcmdzLmNsaWVudF9zZWNyZXQgfHwgdGhpcy5fc2V0dGluZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgYXJncy5yZWRpcmVjdF91cmkgPSBhcmdzLnJlZGlyZWN0X3VyaSB8fCB0aGlzLl9zZXR0aW5ncy5yZWRpcmVjdF91cmk7XG5cbiAgICAgICAgdmFyIGJhc2ljQXV0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGNsaWVudF9hdXRoZW50aWNhdGlvbiA9IGFyZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbiB8fCB0aGlzLl9zZXR0aW5ncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuICAgICAgICBkZWxldGUgYXJncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuXG4gICAgICAgIGlmICghYXJncy5jb2RlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IE5vIGNvZGUgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgY29kZSBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLnJlZGlyZWN0X3VyaSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiBObyByZWRpcmVjdF91cmkgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgcmVkaXJlY3RfdXJpIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MuY29kZV92ZXJpZmllcikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiBObyBjb2RlX3ZlcmlmaWVyIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIGNvZGVfdmVyaWZpZXIgaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJncy5jbGllbnRfaWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogTm8gY2xpZW50X2lkIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIGNsaWVudF9pZCBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLmNsaWVudF9zZWNyZXQgJiYgY2xpZW50X2F1dGhlbnRpY2F0aW9uID09IFwiY2xpZW50X3NlY3JldF9iYXNpY1wiKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IE5vIGNsaWVudF9zZWNyZXQgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgY2xpZW50X3NlY3JldCBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZW5kaW5nIHRoZSBjbGllbnQgY3JlZGVudGlhbHMgdXNpbmcgdGhlIEJhc2ljIEF1dGggbWV0aG9kXG4gICAgICAgIGlmKGNsaWVudF9hdXRoZW50aWNhdGlvbiA9PSBcImNsaWVudF9zZWNyZXRfYmFzaWNcIilcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzaWNBdXRoID0gYXJncy5jbGllbnRfaWQgKyAnOicgKyBhcmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgICAgICBkZWxldGUgYXJncy5jbGllbnRfaWQ7XG4gICAgICAgICAgICBkZWxldGUgYXJncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRUb2tlbkVuZHBvaW50KGZhbHNlKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IFJlY2VpdmVkIHRva2VuIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLnBvc3RGb3JtKHVybCwgYXJncywgYmFzaWNBdXRoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IHJlc3BvbnNlIHJlY2VpdmVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleGNoYW5nZVJlZnJlc2hUb2tlbihhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MuZ3JhbnRfdHlwZSA9IGFyZ3MuZ3JhbnRfdHlwZSB8fCBcInJlZnJlc2hfdG9rZW5cIjtcbiAgICAgICAgYXJncy5jbGllbnRfaWQgPSBhcmdzLmNsaWVudF9pZCB8fCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgICAgIGFyZ3MuY2xpZW50X3NlY3JldCA9IGFyZ3MuY2xpZW50X3NlY3JldCB8fCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfc2VjcmV0O1xuXG4gICAgICAgIHZhciBiYXNpY0F1dGggPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBjbGllbnRfYXV0aGVudGljYXRpb24gPSBhcmdzLl9jbGllbnRfYXV0aGVudGljYXRpb24gfHwgdGhpcy5fc2V0dGluZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbjtcbiAgICAgICAgZGVsZXRlIGFyZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbjtcblxuICAgICAgICBpZiAoIWFyZ3MucmVmcmVzaF90b2tlbikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW46IE5vIHJlZnJlc2hfdG9rZW4gcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgcmVmcmVzaF90b2tlbiBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW46IE5vIGNsaWVudF9pZCBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSBjbGllbnRfaWQgaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VuZGluZyB0aGUgY2xpZW50IGNyZWRlbnRpYWxzIHVzaW5nIHRoZSBCYXNpYyBBdXRoIG1ldGhvZFxuICAgICAgICBpZihjbGllbnRfYXV0aGVudGljYXRpb24gPT0gXCJjbGllbnRfc2VjcmV0X2Jhc2ljXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2ljQXV0aCA9IGFyZ3MuY2xpZW50X2lkICsgJzonICsgYXJncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICAgICAgZGVsZXRlIGFyZ3MuY2xpZW50X2lkO1xuICAgICAgICAgICAgZGVsZXRlIGFyZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0VG9rZW5FbmRwb2ludChmYWxzZSkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW46IFJlY2VpdmVkIHRva2VuIGVuZHBvaW50XCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UucG9zdEZvcm0odXJsLCBhcmdzLCBiYXNpY0F1dGgpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuQ2xpZW50LmV4Y2hhbmdlUmVmcmVzaFRva2VuOiByZXNwb25zZSByZWNlaXZlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuXG5jb25zdCBBY2Nlc3NUb2tlblR5cGVIaW50ID0gXCJhY2Nlc3NfdG9rZW5cIjtcbmNvbnN0IFJlZnJlc2hUb2tlblR5cGVIaW50ID0gXCJyZWZyZXNoX3Rva2VuXCI7XG5cbmV4cG9ydCBjbGFzcyBUb2tlblJldm9jYXRpb25DbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBYTUxIdHRwUmVxdWVzdEN0b3IgPSBHbG9iYWwuWE1MSHR0cFJlcXVlc3QsIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UpIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LmN0b3I6IE5vIHNldHRpbmdzIHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc2V0dGluZ3MgcHJvdmlkZWQuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgdGhpcy5fWE1MSHR0cFJlcXVlc3RDdG9yID0gWE1MSHR0cFJlcXVlc3RDdG9yO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgcmV2b2tlKHRva2VuLCByZXF1aXJlZCwgdHlwZSA9IFwiYWNjZXNzX3Rva2VuXCIpIHtcbiAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZTogTm8gdG9rZW4gcHJvdmlkZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB0b2tlbiBwcm92aWRlZC5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSAhPT0gQWNjZXNzVG9rZW5UeXBlSGludCAmJiB0eXBlICE9IFJlZnJlc2hUb2tlblR5cGVIaW50KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBJbnZhbGlkIHRva2VuIHR5cGVcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHRva2VuIHR5cGUuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRSZXZvY2F0aW9uRW5kcG9pbnQoKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBSZXZvY2F0aW9uIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJldm9jYXRpb24gbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBub3QgcmVxdWlyZWQsIHNvIGRvbid0IGVycm9yIGFuZCBqdXN0IHJldHVyblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZTogUmV2b2tpbmcgXCIgKyB0eXBlKTtcbiAgICAgICAgICAgIHZhciBjbGllbnRfaWQgPSB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgICAgICAgICB2YXIgY2xpZW50X3NlY3JldCA9IHRoaXMuX3NldHRpbmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmV2b2tlKHVybCwgY2xpZW50X2lkLCBjbGllbnRfc2VjcmV0LCB0b2tlbiwgdHlwZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9yZXZva2UodXJsLCBjbGllbnRfaWQsIGNsaWVudF9zZWNyZXQsIHRva2VuLCB0eXBlKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgdmFyIHhociA9IG5ldyB0aGlzLl9YTUxIdHRwUmVxdWVzdEN0b3IoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwpO1xuXG4gICAgICAgICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IEhUVFAgcmVzcG9uc2UgcmVjZWl2ZWQsIHN0YXR1c1wiLCB4aHIuc3RhdHVzKTtcblxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKHhoci5zdGF0dXNUZXh0ICsgXCIgKFwiICsgeGhyLnN0YXR1cyArIFwiKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4geyBcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBOZXR3b3JrIEVycm9yLlwiKVxuICAgICAgICAgICAgICAgIHJlamVjdChcIk5ldHdvcmsgRXJyb3JcIik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYm9keSA9IFwiY2xpZW50X2lkPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNsaWVudF9pZCk7XG4gICAgICAgICAgICBpZiAoY2xpZW50X3NlY3JldCkge1xuICAgICAgICAgICAgICAgIGJvZHkgKz0gXCImY2xpZW50X3NlY3JldD1cIiArIGVuY29kZVVSSUNvbXBvbmVudChjbGllbnRfc2VjcmV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHkgKz0gXCImdG9rZW5fdHlwZV9oaW50PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHR5cGUpO1xuICAgICAgICAgICAgYm9keSArPSBcIiZ0b2tlbj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbik7XG5cbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcblxuZXhwb3J0IGNsYXNzIFVybFV0aWxpdHkge1xuICAgIHN0YXRpYyBhZGRRdWVyeVBhcmFtKHVybCwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHVybC5pbmRleE9mKCc/JykgPCAwKSB7XG4gICAgICAgICAgICB1cmwgKz0gXCI/XCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJsW3VybC5sZW5ndGggLSAxXSAhPT0gXCI/XCIpIHtcbiAgICAgICAgICAgIHVybCArPSBcIiZcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybCArPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSk7XG4gICAgICAgIHVybCArPSBcIj1cIjtcbiAgICAgICAgdXJsICs9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VVcmxGcmFnbWVudCh2YWx1ZSwgZGVsaW1pdGVyID0gXCIjXCIsIGdsb2JhbCA9IEdsb2JhbCkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICB2YWx1ZSA9IGdsb2JhbC5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlkeCA9IHZhbHVlLmxhc3RJbmRleE9mKGRlbGltaXRlcik7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoaWR4ICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVsaW1pdGVyID09PSBcIj9cIikge1xuICAgICAgICAgICAgLy8gaWYgd2UncmUgZG9pbmcgcXVlcnksIHRoZW4gc3RyaXAgb2ZmIGhhc2ggZnJhZ21lbnQgYmVmb3JlIHdlIHBhcnNlXG4gICAgICAgICAgICBpZHggPSB2YWx1ZS5pbmRleE9mKCcjJyk7XG4gICAgICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCBpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9LFxuICAgICAgICAgICAgcmVnZXggPSAvKFteJj1dKyk9KFteJl0qKS9nLFxuICAgICAgICAgICAgbTtcblxuICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChtID0gcmVnZXguZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHBhcmFtc1tkZWNvZGVVUklDb21wb25lbnQobVsxXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMl0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIrKyA+IDUwKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXJsVXRpbGl0eS5wYXJzZVVybEZyYWdtZW50OiByZXNwb25zZSBleGNlZWRlZCBleHBlY3RlZCBudW1iZXIgb2YgcGFyYW1ldGVyc1wiLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiUmVzcG9uc2UgZXhjZWVkZWQgZXhwZWN0ZWQgbnVtYmVyIG9mIHBhcmFtZXRlcnNcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcih7aWRfdG9rZW4sIHNlc3Npb25fc3RhdGUsIGFjY2Vzc190b2tlbiwgcmVmcmVzaF90b2tlbiwgdG9rZW5fdHlwZSwgc2NvcGUsIHByb2ZpbGUsIGV4cGlyZXNfYXQsIHN0YXRlfSkge1xuICAgICAgICB0aGlzLmlkX3Rva2VuID0gaWRfdG9rZW47XG4gICAgICAgIHRoaXMuc2Vzc2lvbl9zdGF0ZSA9IHNlc3Npb25fc3RhdGU7XG4gICAgICAgIHRoaXMuYWNjZXNzX3Rva2VuID0gYWNjZXNzX3Rva2VuO1xuICAgICAgICB0aGlzLnJlZnJlc2hfdG9rZW4gPSByZWZyZXNoX3Rva2VuO1xuICAgICAgICB0aGlzLnRva2VuX3R5cGUgPSB0b2tlbl90eXBlO1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMucHJvZmlsZSA9IHByb2ZpbGU7XG4gICAgICAgIHRoaXMuZXhwaXJlc19hdCA9IGV4cGlyZXNfYXQ7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgZXhwaXJlc19pbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgbGV0IG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGlyZXNfYXQgLSBub3c7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc2V0IGV4cGlyZXNfaW4odmFsdWUpIHtcbiAgICAgICAgbGV0IGV4cGlyZXNfaW4gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZXhwaXJlc19pbiA9PT0gJ251bWJlcicgJiYgZXhwaXJlc19pbiA+IDApIHtcbiAgICAgICAgICAgIGxldCBub3cgPSBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgICAgICB0aGlzLmV4cGlyZXNfYXQgPSBub3cgKyBleHBpcmVzX2luO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGV4cGlyZWQoKSB7XG4gICAgICAgIGxldCBleHBpcmVzX2luID0gdGhpcy5leHBpcmVzX2luO1xuICAgICAgICBpZiAoZXhwaXJlc19pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwaXJlc19pbiA8PSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHNjb3BlcygpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnNjb3BlIHx8IFwiXCIpLnNwbGl0KFwiIFwiKTtcbiAgICB9XG5cbiAgICB0b1N0b3JhZ2VTdHJpbmcoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXIudG9TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgaWRfdG9rZW46IHRoaXMuaWRfdG9rZW4sXG4gICAgICAgICAgICBzZXNzaW9uX3N0YXRlOiB0aGlzLnNlc3Npb25fc3RhdGUsXG4gICAgICAgICAgICBhY2Nlc3NfdG9rZW46IHRoaXMuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgdG9rZW5fdHlwZTogdGhpcy50b2tlbl90eXBlLFxuICAgICAgICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICAgICAgICBwcm9maWxlOiB0aGlzLnByb2ZpbGUsXG4gICAgICAgICAgICBleHBpcmVzX2F0OiB0aGlzLmV4cGlyZXNfYXRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21TdG9yYWdlU3RyaW5nKHN0b3JhZ2VTdHJpbmcpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlci5mcm9tU3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBVc2VyKEpTT04ucGFyc2Uoc3RvcmFnZVN0cmluZykpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IEpzb25TZXJ2aWNlIH0gZnJvbSAnLi9Kc29uU2VydmljZS5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL01ldGFkYXRhU2VydmljZS5qcyc7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBKb3NlVXRpbCB9IGZyb20gJy4vSm9zZVV0aWwuanMnO1xuXG5leHBvcnQgY2xhc3MgVXNlckluZm9TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2V0dGluZ3MsIFxuICAgICAgICBKc29uU2VydmljZUN0b3IgPSBKc29uU2VydmljZSwgXG4gICAgICAgIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UsIFxuICAgICAgICBqb3NlVXRpbCA9IEpvc2VVdGlsXG4gICAgKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5jdG9yOiBObyBzZXR0aW5ncyBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX2pzb25TZXJ2aWNlID0gbmV3IEpzb25TZXJ2aWNlQ3Rvcih1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcy5fZ2V0Q2xhaW1zRnJvbUp3dC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZXJ2aWNlID0gbmV3IE1ldGFkYXRhU2VydmljZUN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl9qb3NlVXRpbCA9IGpvc2VVdGlsO1xuICAgIH1cblxuICAgIGdldENsYWltcyh0b2tlbikge1xuICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuZ2V0Q2xhaW1zOiBObyB0b2tlbiBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSB0b2tlbiBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFVzZXJJbmZvRW5kcG9pbnQoKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuZ2V0Q2xhaW1zOiByZWNlaXZlZCB1c2VyaW5mbyB1cmxcIiwgdXJsKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLmdldEpzb24odXJsLCB0b2tlbikudGhlbihjbGFpbXMgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5nZXRDbGFpbXM6IGNsYWltcyByZWNlaXZlZFwiLCBjbGFpbXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2dldENsYWltc0Zyb21Kd3QocmVxKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgand0ID0gdGhpcy5fam9zZVV0aWwucGFyc2VKd3QocmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBpZiAoIWp3dCB8fCAhand0LmhlYWRlciB8fCAhand0LnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IEZhaWxlZCB0byBwYXJzZSBKV1RcIiwgand0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGtpZCA9IGp3dC5oZWFkZXIua2lkO1xuXG4gICAgICAgICAgICBsZXQgaXNzdWVyUHJvbWlzZTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fc2V0dGluZ3MudXNlckluZm9Kd3RJc3N1ZXIpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdPUCc6XG4gICAgICAgICAgICAgICAgICAgIGlzc3VlclByb21pc2UgPSB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0SXNzdWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0FOWSc6XG4gICAgICAgICAgICAgICAgICAgIGlzc3VlclByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoand0LnBheWxvYWQuaXNzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaXNzdWVyUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9zZXR0aW5ncy51c2VySW5mb0p3dElzc3Vlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaXNzdWVyUHJvbWlzZS50aGVuKGlzc3VlciA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBSZWNlaXZlZCBpc3N1ZXI6XCIgKyBpc3N1ZXIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5cygpLnRoZW4oa2V5cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgha2V5cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBObyBzaWduaW5nIGtleXMgZnJvbSBtZXRhZGF0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzaWduaW5nIGtleXMgZnJvbSBtZXRhZGF0YVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IFJlY2VpdmVkIHNpZ25pbmcga2V5c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFraWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgPSB0aGlzLl9maWx0ZXJCeUFsZyhrZXlzLCBqd3QuaGVhZGVyLmFsZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IE5vIGtpZCBmb3VuZCBpbiBpZF90b2tlbiBhbmQgbW9yZSB0aGFuIG9uZSBrZXkgZm91bmQgaW4gbWV0YWRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGtpZCBmb3VuZCBpbiBpZF90b2tlbiBhbmQgbW9yZSB0aGFuIG9uZSBrZXkgZm91bmQgaW4gbWV0YWRhdGFcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga2lkIGlzIG1hbmRhdG9yeSBvbmx5IHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIGtleXMgaW4gdGhlIHJlZmVyZW5jZWQgSldLIFNldCBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlZSBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI1NpZ25pbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5cy5maWx0ZXIoa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5LmtpZCA9PT0ga2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBObyBrZXkgbWF0Y2hpbmcga2lkIG9yIGFsZyBmb3VuZCBpbiBzaWduaW5nIGtleXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8ga2V5IG1hdGNoaW5nIGtpZCBvciBhbGcgZm91bmQgaW4gc2lnbmluZyBrZXlzXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBhdWRpZW5jZSA9IHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZDtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xvY2tTa2V3SW5TZWNvbmRzID0gdGhpcy5fc2V0dGluZ3MuY2xvY2tTa2V3O1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IFZhbGlkYWluZyBKV1Q7IHVzaW5nIGNsb2NrIHNrZXcgKGluIHNlY29uZHMpIG9mOiBcIiwgY2xvY2tTa2V3SW5TZWNvbmRzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fam9zZVV0aWwudmFsaWRhdGVKd3QocmVxLnJlc3BvbnNlVGV4dCwga2V5LCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXdJblNlY29uZHMsIHVuZGVmaW5lZCwgdHJ1ZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IEpXVCB2YWxpZGF0aW9uIHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gand0LnBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogRXJyb3IgcGFyc2luZyBKV1QgcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9maWx0ZXJCeUFsZyhrZXlzLCBhbGcpIHtcbiAgICAgICAgdmFyIGt0eSA9IG51bGw7XG4gICAgICAgIGlmIChhbGcuc3RhcnRzV2l0aChcIlJTXCIpKSB7XG4gICAgICAgICAgICBrdHkgPSBcIlJTQVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsZy5zdGFydHNXaXRoKFwiUFNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiUFNcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGcuc3RhcnRzV2l0aChcIkVTXCIpKSB7XG4gICAgICAgICAgICBrdHkgPSBcIkVDXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2ZpbHRlckJ5QWxnOiBhbGcgbm90IHN1cHBvcnRlZDogXCIsIGFsZyk7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2ZpbHRlckJ5QWxnOiBMb29raW5nIGZvciBrZXlzIHRoYXQgbWF0Y2gga3R5OiBcIiwga3R5KTtcblxuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoa2V5ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrZXkua3R5ID09PSBrdHk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZmlsdGVyQnlBbGc6IE51bWJlciBvZiBrZXlzIHRoYXQgbWF0Y2gga3R5OiBcIiwga3R5LCBrZXlzLmxlbmd0aCk7XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudCB9IGZyb20gJy4vT2lkY0NsaWVudC5qcyc7XG5pbXBvcnQgeyBVc2VyTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi9Vc2VyTWFuYWdlclNldHRpbmdzLmpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL1VzZXIuanMnO1xuaW1wb3J0IHsgVXNlck1hbmFnZXJFdmVudHMgfSBmcm9tICcuL1VzZXJNYW5hZ2VyRXZlbnRzLmpzJztcbmltcG9ydCB7IFNpbGVudFJlbmV3U2VydmljZSB9IGZyb20gJy4vU2lsZW50UmVuZXdTZXJ2aWNlLmpzJztcbmltcG9ydCB7IFNlc3Npb25Nb25pdG9yIH0gZnJvbSAnLi9TZXNzaW9uTW9uaXRvci5qcyc7XG5pbXBvcnQgeyBTaWduaW5SZXF1ZXN0IH0gZnJvbSBcIi4vU2lnbmluUmVxdWVzdFwiO1xuaW1wb3J0IHsgVG9rZW5SZXZvY2F0aW9uQ2xpZW50IH0gZnJvbSAnLi9Ub2tlblJldm9jYXRpb25DbGllbnQuanMnO1xuaW1wb3J0IHsgVG9rZW5DbGllbnQgfSBmcm9tICcuL1Rva2VuQ2xpZW50LmpzJztcbmltcG9ydCB7IEpvc2VVdGlsIH0gZnJvbSAnLi9Kb3NlVXRpbC5qcyc7XG5cblxuZXhwb3J0IGNsYXNzIFVzZXJNYW5hZ2VyIGV4dGVuZHMgT2lkY0NsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MgPSB7fSxcbiAgICAgICAgU2lsZW50UmVuZXdTZXJ2aWNlQ3RvciA9IFNpbGVudFJlbmV3U2VydmljZSxcbiAgICAgICAgU2Vzc2lvbk1vbml0b3JDdG9yID0gU2Vzc2lvbk1vbml0b3IsXG4gICAgICAgIFRva2VuUmV2b2NhdGlvbkNsaWVudEN0b3IgPSBUb2tlblJldm9jYXRpb25DbGllbnQsXG4gICAgICAgIFRva2VuQ2xpZW50Q3RvciA9IFRva2VuQ2xpZW50LFxuICAgICAgICBqb3NlVXRpbCA9IEpvc2VVdGlsXG4gICAgKSB7XG5cbiAgICAgICAgaWYgKCEoc2V0dGluZ3MgaW5zdGFuY2VvZiBVc2VyTWFuYWdlclNldHRpbmdzKSkge1xuICAgICAgICAgICAgc2V0dGluZ3MgPSBuZXcgVXNlck1hbmFnZXJTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoc2V0dGluZ3MpO1xuXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBVc2VyTWFuYWdlckV2ZW50cyhzZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3U2VydmljZSA9IG5ldyBTaWxlbnRSZW5ld1NlcnZpY2VDdG9yKHRoaXMpO1xuXG4gICAgICAgIC8vIG9yZGVyIGlzIGltcG9ydGFudCBmb3IgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOyB0aGVzZSBzZXJ2aWNlcyBkZXBlbmQgdXBvbiB0aGUgZXZlbnRzLlxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvbWF0aWNTaWxlbnRSZW5ldykge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuY3RvcjogYXV0b21hdGljU2lsZW50UmVuZXcgaXMgY29uZmlndXJlZCwgc2V0dGluZyB1cCBzaWxlbnQgcmVuZXdcIik7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2lsZW50UmVuZXcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1vbml0b3JTZXNzaW9uKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5jdG9yOiBtb25pdG9yU2Vzc2lvbiBpcyBjb25maWd1cmVkLCBzZXR0aW5nIHVwIHNlc3Npb24gbW9uaXRvclwiKTtcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25Nb25pdG9yID0gbmV3IFNlc3Npb25Nb25pdG9yQ3Rvcih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Rva2VuUmV2b2NhdGlvbkNsaWVudCA9IG5ldyBUb2tlblJldm9jYXRpb25DbGllbnRDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fdG9rZW5DbGllbnQgPSBuZXcgVG9rZW5DbGllbnRDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fam9zZVV0aWwgPSBqb3NlVXRpbDtcbiAgICB9XG5cbiAgICBnZXQgX3JlZGlyZWN0TmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5yZWRpcmVjdE5hdmlnYXRvcjtcbiAgICB9XG4gICAgZ2V0IF9wb3B1cE5hdmlnYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MucG9wdXBOYXZpZ2F0b3I7XG4gICAgfVxuICAgIGdldCBfaWZyYW1lTmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5pZnJhbWVOYXZpZ2F0b3I7XG4gICAgfVxuICAgIGdldCBfdXNlclN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy51c2VyU3RvcmU7XG4gICAgfVxuXG4gICAgZ2V0IGV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cztcbiAgICB9XG5cbiAgICBnZXRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLmdldFVzZXI6IHVzZXIgbG9hZGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLmxvYWQodXNlciwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLmdldFVzZXI6IHVzZXIgbm90IGZvdW5kIGluIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZVVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlVXNlcihudWxsKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIucmVtb3ZlVXNlcjogdXNlciByZW1vdmVkIGZyb20gc3RvcmFnZVwiKTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy51bmxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbmluUmVkaXJlY3QoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic2k6clwiO1xuICAgICAgICBsZXQgbmF2UGFyYW1zID0ge1xuICAgICAgICAgICAgdXNlUmVwbGFjZVRvTmF2aWdhdGUgOiBhcmdzLnVzZVJlcGxhY2VUb05hdmlnYXRlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5TdGFydChhcmdzLCB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvciwgbmF2UGFyYW1zKS50aGVuKCgpPT57XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblJlZGlyZWN0OiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2lnbmluUmVkaXJlY3RDYWxsYmFjayh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pbkVuZCh1cmwgfHwgdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3IudXJsKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5SZWRpcmVjdENhbGxiYWNrOiBzdWNjZXNzZnVsLCBzaWduZWQgaW4gc3ViOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblJlZGlyZWN0Q2FsbGJhY2s6IG5vIHN1YlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25pblBvcHVwKGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5yZXF1ZXN0X3R5cGUgPSBcInNpOnBcIjtcbiAgICAgICAgbGV0IHVybCA9IGFyZ3MucmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucG9wdXBfcmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXA6IE5vIHBvcHVwX3JlZGlyZWN0X3VyaSBvciByZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBwb3B1cF9yZWRpcmVjdF91cmkgb3IgcmVkaXJlY3RfdXJpIGNvbmZpZ3VyZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5yZWRpcmVjdF91cmkgPSB1cmw7XG4gICAgICAgIGFyZ3MuZGlzcGxheSA9IFwicG9wdXBcIjtcblxuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluKGFyZ3MsIHRoaXMuX3BvcHVwTmF2aWdhdG9yLCB7XG4gICAgICAgICAgICBzdGFydFVybDogdXJsLFxuICAgICAgICAgICAgcG9wdXBXaW5kb3dGZWF0dXJlczogYXJncy5wb3B1cFdpbmRvd0ZlYXR1cmVzIHx8IHRoaXMuc2V0dGluZ3MucG9wdXBXaW5kb3dGZWF0dXJlcyxcbiAgICAgICAgICAgIHBvcHVwV2luZG93VGFyZ2V0OiBhcmdzLnBvcHVwV2luZG93VGFyZ2V0IHx8IHRoaXMuc2V0dGluZ3MucG9wdXBXaW5kb3dUYXJnZXRcbiAgICAgICAgfSkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXA6IHNpZ25pblBvcHVwIHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXA6IG5vIHN1YlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2lnbmluUG9wdXBDYWxsYmFjayh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pbkNhbGxiYWNrKHVybCwgdGhpcy5fcG9wdXBOYXZpZ2F0b3IpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyLnByb2ZpbGUgJiYgdXNlci5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblBvcHVwQ2FsbGJhY2s6IHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXBDYWxsYmFjazogbm8gc3ViXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXBDYWxsYmFjayBlcnJvcjogXCIgKyBlcnIgJiYgZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWduaW5TaWxlbnQoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICAvLyBmaXJzdCBkZXRlcm1pbmUgaWYgd2UgaGF2ZSBhIHJlZnJlc2ggdG9rZW4sIG9yIG5lZWQgdG8gdXNlIGlmcmFtZVxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIgJiYgdXNlci5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgYXJncy5yZWZyZXNoX3Rva2VuID0gdXNlci5yZWZyZXNoX3Rva2VuO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VSZWZyZXNoVG9rZW4oYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic2k6c1wiO1xuICAgICAgICAgICAgICAgIGFyZ3MuaWRfdG9rZW5faGludCA9IGFyZ3MuaWRfdG9rZW5faGludCB8fCAodGhpcy5zZXR0aW5ncy5pbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXcgJiYgdXNlciAmJiB1c2VyLmlkX3Rva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAodXNlciAmJiB0aGlzLl9zZXR0aW5ncy52YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50LCBzdWJqZWN0IHByaW9yIHRvIHNpbGVudCByZW5ldzogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgICAgICBhcmdzLmN1cnJlbnRfc3ViID0gdXNlci5wcm9maWxlLnN1YjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pblNpbGVudElmcmFtZShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3VzZVJlZnJlc2hUb2tlbihhcmdzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rva2VuQ2xpZW50LmV4Y2hhbmdlUmVmcmVzaFRva2VuKGFyZ3MpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3VzZVJlZnJlc2hUb2tlbjogTm8gcmVzcG9uc2UgcmV0dXJuZWQgZnJvbSB0b2tlbiBlbmRwb2ludFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJObyByZXNwb25zZSByZXR1cm5lZCBmcm9tIHRva2VuIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3VzZVJlZnJlc2hUb2tlbjogTm8gYWNjZXNzIHRva2VuIHJldHVybmVkIGZyb20gdG9rZW4gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiTm8gYWNjZXNzIHRva2VuIHJldHVybmVkIGZyb20gdG9rZW4gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkVG9rZW5WYWxpZGF0aW9uID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkVG9rZW5WYWxpZGF0aW9uID0gdGhpcy5fdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuKHVzZXIucHJvZmlsZSwgcmVzdWx0LmlkX3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpZFRva2VuVmFsaWRhdGlvbi50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl91c2VSZWZyZXNoVG9rZW46IHJlZnJlc2ggdG9rZW4gcmVzcG9uc2Ugc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuaWRfdG9rZW4gPSByZXN1bHQuaWRfdG9rZW4gfHwgdXNlci5pZF90b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuYWNjZXNzX3Rva2VuID0gcmVzdWx0LmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIucmVmcmVzaF90b2tlbiA9IHJlc3VsdC5yZWZyZXNoX3Rva2VuIHx8IHVzZXIucmVmcmVzaF90b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuZXhwaXJlc19pbiA9IHJlc3VsdC5leHBpcmVzX2luO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVVzZXIodXNlcikudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5sb2FkKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW4ocHJvZmlsZSwgaWRfdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRJc3N1ZXIoKS50aGVuKGlzc3VlciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5nZXRFcG9jaFRpbWUoKS50aGVuKG5vdyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvc2VVdGlsLnZhbGlkYXRlSnd0QXR0cmlidXRlcyhpZF90b2tlbiwgaXNzdWVyLCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQsIHRoaXMuX3NldHRpbmdzLmNsb2NrU2tldywgbm93KS50aGVuKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW46IEZhaWxlZCB0byB2YWxpZGF0ZSBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gdmFsaWRhdGUgaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLnN1YiAhPT0gcHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW46IHN1YiBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBjdXJyZW50IHN1YlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzdWIgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggY3VycmVudCBzdWJcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmF1dGhfdGltZSAmJiBwYXlsb2FkLmF1dGhfdGltZSAhPT0gcHJvZmlsZS5hdXRoX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW46IGF1dGhfdGltZSBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBvcmlnaW5hbCBhdXRoX3RpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXV0aF90aW1lIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIG9yaWdpbmFsIGF1dGhfdGltZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXpwICYmIHBheWxvYWQuYXpwICE9PSBwcm9maWxlLmF6cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbjogYXpwIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIG9yaWdpbmFsIGF6cFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhenAgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggb3JpZ2luYWwgYXpwXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBheWxvYWQuYXpwICYmIHByb2ZpbGUuYXpwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuOiBhenAgbm90IGluIGlkX3Rva2VuLCBidXQgcHJlc2VudCBpbiBvcmlnaW5hbCBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhenAgbm90IGluIGlkX3Rva2VuLCBidXQgcHJlc2VudCBpbiBvcmlnaW5hbCBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgX3NpZ25pblNpbGVudElmcmFtZShhcmdzID0ge30pIHtcbiAgICAgICAgbGV0IHVybCA9IGFyZ3MucmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3Muc2lsZW50X3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnJlZGlyZWN0X3VyaTtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudDogTm8gc2lsZW50X3JlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHNpbGVudF9yZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzLnJlZGlyZWN0X3VyaSA9IHVybDtcbiAgICAgICAgYXJncy5wcm9tcHQgPSBhcmdzLnByb21wdCB8fCBcIm5vbmVcIjtcblxuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluKGFyZ3MsIHRoaXMuX2lmcmFtZU5hdmlnYXRvciwge1xuICAgICAgICAgICAgc3RhcnRVcmw6IHVybCxcbiAgICAgICAgICAgIHNpbGVudFJlcXVlc3RUaW1lb3V0OiBhcmdzLnNpbGVudFJlcXVlc3RUaW1lb3V0IHx8IHRoaXMuc2V0dGluZ3Muc2lsZW50UmVxdWVzdFRpbWVvdXRcbiAgICAgICAgfSkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50OiBzdWNjZXNzZnVsLCBzaWduZWQgaW4gc3ViOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudDogbm8gc3ViXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25pblNpbGVudENhbGxiYWNrKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluQ2FsbGJhY2sodXJsLCB0aGlzLl9pZnJhbWVOYXZpZ2F0b3IpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyLnByb2ZpbGUgJiYgdXNlci5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudENhbGxiYWNrOiBzdWNjZXNzZnVsLCBzaWduZWQgaW4gc3ViOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudENhbGxiYWNrOiBubyBzdWJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbmluQ2FsbGJhY2sodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRTaWduaW5SZXNwb25zZVN0YXRlKHVybCkudGhlbigoe3N0YXRlLCByZXNwb25zZX0pID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5yZXF1ZXN0X3R5cGUgPT09IFwic2k6clwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmluUmVkaXJlY3RDYWxsYmFjayh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlLnJlcXVlc3RfdHlwZSA9PT0gXCJzaTpwXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaWduaW5Qb3B1cENhbGxiYWNrKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUucmVxdWVzdF90eXBlID09PSBcInNpOnNcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25pblNpbGVudENhbGxiYWNrKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaW52YWxpZCByZXNwb25zZV90eXBlIGluIHN0YXRlXCIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbm91dENhbGxiYWNrKHVybCwga2VlcE9wZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlKHVybCkudGhlbigoe3N0YXRlLCByZXNwb25zZX0pID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZXF1ZXN0X3R5cGUgPT09IFwic286clwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25vdXRSZWRpcmVjdENhbGxiYWNrKHVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZXF1ZXN0X3R5cGUgPT09IFwic286cFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25vdXRQb3B1cENhbGxiYWNrKHVybCwga2VlcE9wZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaW52YWxpZCByZXNwb25zZV90eXBlIGluIHN0YXRlXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcXVlcnlTZXNzaW9uU3RhdHVzKGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5yZXF1ZXN0X3R5cGUgPSBcInNpOnNcIjsgLy8gdGhpcyBhY3RzIGxpa2UgYSBzaWduaW4gc2lsZW50XG4gICAgICAgIGxldCB1cmwgPSBhcmdzLnJlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnNpbGVudF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmk7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXM6IE5vIHNpbGVudF9yZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzaWxlbnRfcmVkaXJlY3RfdXJpIGNvbmZpZ3VyZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5yZWRpcmVjdF91cmkgPSB1cmw7XG4gICAgICAgIGFyZ3MucHJvbXB0ID0gXCJub25lXCI7XG4gICAgICAgIGFyZ3MucmVzcG9uc2VfdHlwZSA9IGFyZ3MucmVzcG9uc2VfdHlwZSB8fCB0aGlzLnNldHRpbmdzLnF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlO1xuICAgICAgICBhcmdzLnNjb3BlID0gYXJncy5zY29wZSB8fCBcIm9wZW5pZFwiO1xuICAgICAgICBhcmdzLnNraXBVc2VySW5mbyA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pblN0YXJ0KGFyZ3MsIHRoaXMuX2lmcmFtZU5hdmlnYXRvciwge1xuICAgICAgICAgICAgc3RhcnRVcmw6IHVybCxcbiAgICAgICAgICAgIHNpbGVudFJlcXVlc3RUaW1lb3V0OiBhcmdzLnNpbGVudFJlcXVlc3RUaW1lb3V0IHx8IHRoaXMuc2V0dGluZ3Muc2lsZW50UmVxdWVzdFRpbWVvdXRcbiAgICAgICAgfSkudGhlbihuYXZSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzU2lnbmluUmVzcG9uc2UobmF2UmVzcG9uc2UudXJsKS50aGVuKHNpZ25pblJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXM6IGdvdCBzaWduaW4gcmVzcG9uc2VcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2lnbmluUmVzcG9uc2Uuc2Vzc2lvbl9zdGF0ZSAmJiBzaWduaW5SZXNwb25zZS5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1czogcXVlcnlTZXNzaW9uU3RhdHVzIHN1Y2Nlc3MgZm9yIHN1YjogXCIsICBzaWduaW5SZXNwb25zZS5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uX3N0YXRlOiBzaWduaW5SZXNwb25zZS5zZXNzaW9uX3N0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViOiBzaWduaW5SZXNwb25zZS5wcm9maWxlLnN1YixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZDogc2lnbmluUmVzcG9uc2UucHJvZmlsZS5zaWRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwicXVlcnlTZXNzaW9uU3RhdHVzIHN1Y2Nlc3NmdWwsIHVzZXIgbm90IGF1dGhlbnRpY2F0ZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIuc2Vzc2lvbl9zdGF0ZSAmJiB0aGlzLnNldHRpbmdzLm1vbml0b3JBbm9ueW1vdXNTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIubWVzc2FnZSA9PSBcImxvZ2luX3JlcXVpcmVkXCIgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9PSBcImNvbnNlbnRfcmVxdWlyZWRcIiB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID09IFwiaW50ZXJhY3Rpb25fcmVxdWlyZWRcIiB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID09IFwiYWNjb3VudF9zZWxlY3Rpb25fcmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzOiBxdWVyeVNlc3Npb25TdGF0dXMgc3VjY2VzcyBmb3IgYW5vbnltb3VzIHVzZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25fc3RhdGU6IGVyci5zZXNzaW9uX3N0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9zaWduaW4oYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluU3RhcnQoYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMpLnRoZW4obmF2UmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pbkVuZChuYXZSZXNwb25zZS51cmwsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NpZ25pblN0YXJ0KGFyZ3MsIG5hdmlnYXRvciwgbmF2aWdhdG9yUGFyYW1zID0ge30pIHtcblxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnByZXBhcmUobmF2aWdhdG9yUGFyYW1zKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluU3RhcnQ6IGdvdCBuYXZpZ2F0b3Igd2luZG93IGhhbmRsZVwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlU2lnbmluUmVxdWVzdChhcmdzKS50aGVuKHNpZ25pblJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5TdGFydDogZ290IHNpZ25pbiByZXF1ZXN0XCIpO1xuXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yUGFyYW1zLnVybCA9IHNpZ25pblJlcXVlc3QudXJsO1xuICAgICAgICAgICAgICAgIG5hdmlnYXRvclBhcmFtcy5pZCA9IHNpZ25pblJlcXVlc3Quc3RhdGUuaWQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlLm5hdmlnYXRlKG5hdmlnYXRvclBhcmFtcyk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kbGUuY2xvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pblN0YXJ0OiBFcnJvciBhZnRlciBwcmVwYXJpbmcgbmF2aWdhdG9yLCBjbG9zaW5nIG5hdmlnYXRvciB3aW5kb3dcIik7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9zaWduaW5FbmQodXJsLCBhcmdzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1NpZ25pblJlc3BvbnNlKHVybCkudGhlbihzaWduaW5SZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluRW5kOiBnb3Qgc2lnbmluIHJlc3BvbnNlXCIpO1xuXG4gICAgICAgICAgICBsZXQgdXNlciA9IG5ldyBVc2VyKHNpZ25pblJlc3BvbnNlKTtcblxuICAgICAgICAgICAgaWYgKGFyZ3MuY3VycmVudF9zdWIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5jdXJyZW50X3N1YiAhPT0gdXNlci5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluRW5kOiBjdXJyZW50IHVzZXIgZG9lcyBub3QgbWF0Y2ggdXNlciByZXR1cm5lZCBmcm9tIHNpZ25pbi4gc3ViIGZyb20gc2lnbmluOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJsb2dpbl9yZXF1aXJlZFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluRW5kOiBjdXJyZW50IHVzZXIgbWF0Y2hlcyB1c2VyIHJldHVybmVkIGZyb20gc2lnbmluXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVVc2VyKHVzZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5FbmQ6IHVzZXIgc3RvcmVkXCIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLmxvYWQodXNlcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NpZ25pbkNhbGxiYWNrKHVybCwgbmF2aWdhdG9yKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5DYWxsYmFja1wiKTtcbiAgICAgICAgbGV0IHVzZVF1ZXJ5ID0gdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZSA9PT0gXCJxdWVyeVwiIHx8ICghdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZSAmJiBTaWduaW5SZXF1ZXN0LmlzQ29kZSh0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV90eXBlKSk7XG4gICAgICAgIGxldCBkZWxpbWl0ZXIgPSB1c2VRdWVyeSA/IFwiP1wiIDogXCIjXCI7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuY2FsbGJhY2sodXJsLCB1bmRlZmluZWQsIGRlbGltaXRlcik7XG4gICAgfVxuXG4gICAgc2lnbm91dFJlZGlyZWN0KGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5yZXF1ZXN0X3R5cGUgPSBcInNvOnJcIjtcbiAgICAgICAgbGV0IHBvc3RMb2dvdXRSZWRpcmVjdFVyaSA9IGFyZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgICAgICBpZiAocG9zdExvZ291dFJlZGlyZWN0VXJpKXtcbiAgICAgICAgICAgIGFyZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gcG9zdExvZ291dFJlZGlyZWN0VXJpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuYXZQYXJhbXMgPSB7XG4gICAgICAgICAgICB1c2VSZXBsYWNlVG9OYXZpZ2F0ZSA6IGFyZ3MudXNlUmVwbGFjZVRvTmF2aWdhdGVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25vdXRTdGFydChhcmdzLCB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvciwgbmF2UGFyYW1zKS50aGVuKCgpPT57XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25vdXRSZWRpcmVjdDogc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpZ25vdXRSZWRpcmVjdENhbGxiYWNrKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbm91dEVuZCh1cmwgfHwgdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3IudXJsKS50aGVuKHJlc3BvbnNlPT57XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25vdXRSZWRpcmVjdENhbGxiYWNrOiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWdub3V0UG9wdXAoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic286cFwiO1xuICAgICAgICBsZXQgdXJsID0gYXJncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgICAgIGFyZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gdXJsO1xuICAgICAgICBhcmdzLmRpc3BsYXkgPSBcInBvcHVwXCI7XG4gICAgICAgIGlmIChhcmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSl7XG4gICAgICAgICAgICAvLyB3ZSdyZSBwdXR0aW5nIGEgZHVtbXkgZW50cnkgaW4gaGVyZSBiZWNhdXNlIHdlXG4gICAgICAgICAgICAvLyBuZWVkIGEgdW5pcXVlIGlkIGZyb20gdGhlIHN0YXRlIGZvciBub3RpZmljYXRpb25cbiAgICAgICAgICAgIC8vIHRvIHRoZSBwYXJlbnQgd2luZG93LCB3aGljaCBpcyBuZWNlc3NhcnkgaWYgd2VcbiAgICAgICAgICAgIC8vIHBsYW4gdG8gcmV0dXJuIGJhY2sgdG8gdGhlIGNsaWVudCBhZnRlciBzaWdub3V0XG4gICAgICAgICAgICAvLyBhbmQgc28gd2UgY2FuIGNsb3NlIHRoZSBwb3B1cCBhZnRlciBzaWdub3V0XG4gICAgICAgICAgICBhcmdzLnN0YXRlID0gYXJncy5zdGF0ZSB8fCB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWdub3V0KGFyZ3MsIHRoaXMuX3BvcHVwTmF2aWdhdG9yLCB7XG4gICAgICAgICAgICBzdGFydFVybDogdXJsLFxuICAgICAgICAgICAgcG9wdXBXaW5kb3dGZWF0dXJlczogYXJncy5wb3B1cFdpbmRvd0ZlYXR1cmVzIHx8IHRoaXMuc2V0dGluZ3MucG9wdXBXaW5kb3dGZWF0dXJlcyxcbiAgICAgICAgICAgIHBvcHVwV2luZG93VGFyZ2V0OiBhcmdzLnBvcHVwV2luZG93VGFyZ2V0IHx8IHRoaXMuc2V0dGluZ3MucG9wdXBXaW5kb3dUYXJnZXRcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25vdXRQb3B1cDogc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpZ25vdXRQb3B1cENhbGxiYWNrKHVybCwga2VlcE9wZW4pIHtcbiAgICAgICAgaWYgKHR5cGVvZihrZWVwT3BlbikgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZih1cmwpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGtlZXBPcGVuID0gdXJsO1xuICAgICAgICAgICAgdXJsID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkZWxpbWl0ZXIgPSAnPyc7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3B1cE5hdmlnYXRvci5jYWxsYmFjayh1cmwsIGtlZXBPcGVuLCBkZWxpbWl0ZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWdub3V0UG9wdXBDYWxsYmFjazogc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3NpZ25vdXQoYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbm91dFN0YXJ0KGFyZ3MsIG5hdmlnYXRvciwgbmF2aWdhdG9yUGFyYW1zKS50aGVuKG5hdlJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaWdub3V0RW5kKG5hdlJlc3BvbnNlLnVybCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2lnbm91dFN0YXJ0KGFyZ3MgPSB7fSwgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMgPSB7fSkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnByZXBhcmUobmF2aWdhdG9yUGFyYW1zKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiBnb3QgbmF2aWdhdG9yIHdpbmRvdyBoYW5kbGVcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRTdGFydDogbG9hZGVkIGN1cnJlbnQgdXNlciBmcm9tIHN0b3JhZ2VcIik7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmV2b2tlUHJvbWlzZSA9IHRoaXMuX3NldHRpbmdzLnJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0ID8gdGhpcy5fcmV2b2tlSW50ZXJuYWwodXNlcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV2b2tlUHJvbWlzZS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaWRfdG9rZW4gPSBhcmdzLmlkX3Rva2VuX2hpbnQgfHwgdXNlciAmJiB1c2VyLmlkX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWRfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IFNldHRpbmcgaWRfdG9rZW4gaW50byBzaWdub3V0IHJlcXVlc3RcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmlkX3Rva2VuX2hpbnQgPSBpZF90b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVVzZXIoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IHVzZXIgcmVtb3ZlZCwgY3JlYXRpbmcgc2lnbm91dCByZXF1ZXN0XCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTaWdub3V0UmVxdWVzdChhcmdzKS50aGVuKHNpZ25vdXRSZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiBnb3Qgc2lnbm91dCByZXF1ZXN0XCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yUGFyYW1zLnVybCA9IHNpZ25vdXRSZXF1ZXN0LnVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2lnbm91dFJlcXVlc3Quc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yUGFyYW1zLmlkID0gc2lnbm91dFJlcXVlc3Quc3RhdGUuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUubmF2aWdhdGUobmF2aWdhdG9yUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZS5jbG9zZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiBFcnJvciBhZnRlciBwcmVwYXJpbmcgbmF2aWdhdG9yLCBjbG9zaW5nIG5hdmlnYXRvciB3aW5kb3dcIik7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9zaWdub3V0RW5kKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzU2lnbm91dFJlc3BvbnNlKHVybCkudGhlbihzaWdub3V0UmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRFbmQ6IGdvdCBzaWdub3V0IHJlc3BvbnNlXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2lnbm91dFJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXZva2VBY2Nlc3NUb2tlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VyKCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXZva2VJbnRlcm5hbCh1c2VyLCB0cnVlKS50aGVuKHN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnJldm9rZUFjY2Vzc1Rva2VuOiByZW1vdmluZyB0b2tlbiBwcm9wZXJ0aWVzIGZyb20gdXNlciBhbmQgcmUtc3RvcmluZ1wiKTtcblxuICAgICAgICAgICAgICAgICAgICB1c2VyLmFjY2Vzc190b2tlbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIucmVmcmVzaF90b2tlbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIuZXhwaXJlc19hdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIudG9rZW5fdHlwZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVVc2VyKHVzZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIucmV2b2tlQWNjZXNzVG9rZW46IHVzZXIgc3RvcmVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLmxvYWQodXNlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnJldm9rZUFjY2Vzc1Rva2VuOiBhY2Nlc3MgdG9rZW4gcmV2b2tlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9yZXZva2VJbnRlcm5hbCh1c2VyLCByZXF1aXJlZCkge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgdmFyIGFjY2Vzc190b2tlbiA9IHVzZXIuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgdmFyIHJlZnJlc2hfdG9rZW4gPSB1c2VyLnJlZnJlc2hfdG9rZW47XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXZva2VBY2Nlc3NUb2tlbkludGVybmFsKGFjY2Vzc190b2tlbiwgcmVxdWlyZWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oYXRTdWNjZXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jldm9rZVJlZnJlc2hUb2tlbkludGVybmFsKHJlZnJlc2hfdG9rZW4sIHJlcXVpcmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocnRTdWNjZXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF0U3VjY2VzcyAmJiAhcnRTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnJldm9rZUFjY2Vzc1Rva2VuOiBubyBuZWVkIHRvIHJldm9rZSBkdWUgdG8gbm8gdG9rZW4ocyksIG9yIEpXVCBmb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdFN1Y2Nlc3MgfHwgcnRTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBfcmV2b2tlQWNjZXNzVG9rZW5JbnRlcm5hbChhY2Nlc3NfdG9rZW4sIHJlcXVpcmVkKSB7XG4gICAgICAgIC8vIGNoZWNrIGZvciBKV1QgdnMuIHJlZmVyZW5jZSB0b2tlblxuICAgICAgICBpZiAoIWFjY2Vzc190b2tlbiB8fCBhY2Nlc3NfdG9rZW4uaW5kZXhPZignLicpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2UoYWNjZXNzX3Rva2VuLCByZXF1aXJlZCkudGhlbigoKSA9PiB0cnVlKTtcbiAgICB9XG5cbiAgICBfcmV2b2tlUmVmcmVzaFRva2VuSW50ZXJuYWwocmVmcmVzaF90b2tlbiwgcmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKCFyZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlKHJlZnJlc2hfdG9rZW4sIHJlcXVpcmVkLCBcInJlZnJlc2hfdG9rZW5cIikudGhlbigoKSA9PiB0cnVlKTtcbiAgICB9XG5cbiAgICBzdGFydFNpbGVudFJlbmV3KCkge1xuICAgICAgICB0aGlzLl9zaWxlbnRSZW5ld1NlcnZpY2Uuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBzdG9wU2lsZW50UmVuZXcoKSB7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3U2VydmljZS5zdG9wKCk7XG4gICAgfVxuXG4gICAgZ2V0IF91c2VyU3RvcmVLZXkoKSB7XG4gICAgICAgIHJldHVybiBgdXNlcjoke3RoaXMuc2V0dGluZ3MuYXV0aG9yaXR5fToke3RoaXMuc2V0dGluZ3MuY2xpZW50X2lkfWA7XG4gICAgfVxuXG4gICAgX2xvYWRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclN0b3JlLmdldCh0aGlzLl91c2VyU3RvcmVLZXkpLnRoZW4oc3RvcmFnZVN0cmluZyA9PiB7XG4gICAgICAgICAgICBpZiAoc3RvcmFnZVN0cmluZykge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9sb2FkVXNlcjogdXNlciBzdG9yYWdlU3RyaW5nIGxvYWRlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXNlci5mcm9tU3RvcmFnZVN0cmluZyhzdG9yYWdlU3RyaW5nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX2xvYWRVc2VyOiBubyB1c2VyIHN0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcmVVc2VyKHVzZXIpIHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnN0b3JlVXNlcjogc3RvcmluZyB1c2VyXCIpO1xuXG4gICAgICAgICAgICB2YXIgc3RvcmFnZVN0cmluZyA9IHVzZXIudG9TdG9yYWdlU3RyaW5nKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclN0b3JlLnNldCh0aGlzLl91c2VyU3RvcmVLZXksIHN0b3JhZ2VTdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwic3RvcmVVc2VyLnN0b3JlVXNlcjogcmVtb3ZpbmcgdXNlclwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyU3RvcmUucmVtb3ZlKHRoaXMuX3VzZXJTdG9yZUtleSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBBY2Nlc3NUb2tlbkV2ZW50cyB9IGZyb20gJy4vQWNjZXNzVG9rZW5FdmVudHMuanMnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL0V2ZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFVzZXJNYW5hZ2VyRXZlbnRzIGV4dGVuZHMgQWNjZXNzVG9rZW5FdmVudHMge1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcbiAgICAgICAgc3VwZXIoc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl91c2VyTG9hZGVkID0gbmV3IEV2ZW50KFwiVXNlciBsb2FkZWRcIik7XG4gICAgICAgIHRoaXMuX3VzZXJVbmxvYWRlZCA9IG5ldyBFdmVudChcIlVzZXIgdW5sb2FkZWRcIik7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3RXJyb3IgPSBuZXcgRXZlbnQoXCJTaWxlbnQgcmVuZXcgZXJyb3JcIik7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRJbiA9IG5ldyBFdmVudChcIlVzZXIgc2lnbmVkIGluXCIpO1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkT3V0ID0gbmV3IEV2ZW50KFwiVXNlciBzaWduZWQgb3V0XCIpO1xuICAgICAgICB0aGlzLl91c2VyU2Vzc2lvbkNoYW5nZWQgPSBuZXcgRXZlbnQoXCJVc2VyIHNlc3Npb24gY2hhbmdlZFwiKTtcbiAgICB9XG5cbiAgICBsb2FkKHVzZXIsIHJhaXNlRXZlbnQ9dHJ1ZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5sb2FkXCIpO1xuICAgICAgICBzdXBlci5sb2FkKHVzZXIpO1xuICAgICAgICBpZiAocmFpc2VFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5fdXNlckxvYWRlZC5yYWlzZSh1c2VyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bmxvYWQoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLnVubG9hZFwiKTtcbiAgICAgICAgc3VwZXIudW5sb2FkKCk7XG4gICAgICAgIHRoaXMuX3VzZXJVbmxvYWRlZC5yYWlzZSgpO1xuICAgIH1cblxuICAgIGFkZFVzZXJMb2FkZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlckxvYWRlZC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlckxvYWRlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyTG9hZGVkLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cblxuICAgIGFkZFVzZXJVbmxvYWRlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyVW5sb2FkZWQuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZVVzZXJVbmxvYWRlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyVW5sb2FkZWQucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuXG4gICAgYWRkU2lsZW50UmVuZXdFcnJvcihjYikge1xuICAgICAgICB0aGlzLl9zaWxlbnRSZW5ld0Vycm9yLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVTaWxlbnRSZW5ld0Vycm9yKGNiKSB7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3RXJyb3IucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuICAgIF9yYWlzZVNpbGVudFJlbmV3RXJyb3IoZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5fcmFpc2VTaWxlbnRSZW5ld0Vycm9yXCIsIGUubWVzc2FnZSk7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3RXJyb3IucmFpc2UoZSk7XG4gICAgfVxuXG4gICAgYWRkVXNlclNpZ25lZEluKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRJbi5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlclNpZ25lZEluKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRJbi5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgX3JhaXNlVXNlclNpZ25lZEluKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkSW5cIik7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRJbi5yYWlzZSgpO1xuICAgIH1cblxuICAgIGFkZFVzZXJTaWduZWRPdXQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZE91dC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlclNpZ25lZE91dChjYikge1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkT3V0LnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICBfcmFpc2VVc2VyU2lnbmVkT3V0KCkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkT3V0XCIpO1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkT3V0LnJhaXNlKCk7XG4gICAgfVxuXG4gICAgYWRkVXNlclNlc3Npb25DaGFuZ2VkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTZXNzaW9uQ2hhbmdlZC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlclNlc3Npb25DaGFuZ2VkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTZXNzaW9uQ2hhbmdlZC5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgX3JhaXNlVXNlclNlc3Npb25DaGFuZ2VkKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5fcmFpc2VVc2VyU2Vzc2lvbkNoYW5nZWRcIik7XG4gICAgICAgIHRoaXMuX3VzZXJTZXNzaW9uQ2hhbmdlZC5yYWlzZSgpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnRTZXR0aW5ncyB9IGZyb20gJy4vT2lkY0NsaWVudFNldHRpbmdzLmpzJztcbmltcG9ydCB7IFJlZGlyZWN0TmF2aWdhdG9yIH0gZnJvbSAnLi9SZWRpcmVjdE5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBQb3B1cE5hdmlnYXRvciB9IGZyb20gJy4vUG9wdXBOYXZpZ2F0b3IuanMnO1xuaW1wb3J0IHsgSUZyYW1lTmF2aWdhdG9yIH0gZnJvbSAnLi9JRnJhbWVOYXZpZ2F0b3IuanMnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZVN0YXRlU3RvcmUgfSBmcm9tICcuL1dlYlN0b3JhZ2VTdGF0ZVN0b3JlLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IFNpZ25pblJlcXVlc3QgfSBmcm9tICcuL1NpZ25pblJlcXVlc3QuanMnO1xuXG5jb25zdCBEZWZhdWx0QWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSA2MDtcbmNvbnN0IERlZmF1bHRDaGVja1Nlc3Npb25JbnRlcnZhbCA9IDIwMDA7XG5cbmV4cG9ydCBjbGFzcyBVc2VyTWFuYWdlclNldHRpbmdzIGV4dGVuZHMgT2lkY0NsaWVudFNldHRpbmdzIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIHBvcHVwX3JlZGlyZWN0X3VyaSxcbiAgICAgICAgcG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLFxuICAgICAgICBwb3B1cFdpbmRvd0ZlYXR1cmVzLFxuICAgICAgICBwb3B1cFdpbmRvd1RhcmdldCxcbiAgICAgICAgc2lsZW50X3JlZGlyZWN0X3VyaSxcbiAgICAgICAgc2lsZW50UmVxdWVzdFRpbWVvdXQsXG4gICAgICAgIGF1dG9tYXRpY1NpbGVudFJlbmV3ID0gZmFsc2UsXG4gICAgICAgIHZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldyA9IGZhbHNlLFxuICAgICAgICBpbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXcgPSB0cnVlLFxuICAgICAgICBtb25pdG9yU2Vzc2lvbiA9IHRydWUsXG4gICAgICAgIG1vbml0b3JBbm9ueW1vdXNTZXNzaW9uID0gZmFsc2UsXG4gICAgICAgIGNoZWNrU2Vzc2lvbkludGVydmFsID0gRGVmYXVsdENoZWNrU2Vzc2lvbkludGVydmFsLFxuICAgICAgICBzdG9wQ2hlY2tTZXNzaW9uT25FcnJvciA9IHRydWUsXG4gICAgICAgIHF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlLFxuICAgICAgICByZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dCA9IGZhbHNlLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IERlZmF1bHRBY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSxcbiAgICAgICAgcmVkaXJlY3ROYXZpZ2F0b3IgPSBuZXcgUmVkaXJlY3ROYXZpZ2F0b3IoKSxcbiAgICAgICAgcG9wdXBOYXZpZ2F0b3IgPSBuZXcgUG9wdXBOYXZpZ2F0b3IoKSxcbiAgICAgICAgaWZyYW1lTmF2aWdhdG9yID0gbmV3IElGcmFtZU5hdmlnYXRvcigpLFxuICAgICAgICB1c2VyU3RvcmUgPSBuZXcgV2ViU3RvcmFnZVN0YXRlU3RvcmUoeyBzdG9yZTogR2xvYmFsLnNlc3Npb25TdG9yYWdlIH0pXG4gICAgfSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGFyZ3VtZW50c1swXSk7XG5cbiAgICAgICAgdGhpcy5fcG9wdXBfcmVkaXJlY3RfdXJpID0gcG9wdXBfcmVkaXJlY3RfdXJpO1xuICAgICAgICB0aGlzLl9wb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgPSBwb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX3BvcHVwV2luZG93RmVhdHVyZXMgPSBwb3B1cFdpbmRvd0ZlYXR1cmVzO1xuICAgICAgICB0aGlzLl9wb3B1cFdpbmRvd1RhcmdldCA9IHBvcHVwV2luZG93VGFyZ2V0O1xuXG4gICAgICAgIHRoaXMuX3NpbGVudF9yZWRpcmVjdF91cmkgPSBzaWxlbnRfcmVkaXJlY3RfdXJpO1xuICAgICAgICB0aGlzLl9zaWxlbnRSZXF1ZXN0VGltZW91dCA9IHNpbGVudFJlcXVlc3RUaW1lb3V0O1xuICAgICAgICB0aGlzLl9hdXRvbWF0aWNTaWxlbnRSZW5ldyA9IGF1dG9tYXRpY1NpbGVudFJlbmV3O1xuICAgICAgICB0aGlzLl92YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXcgPSB2YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXc7XG4gICAgICAgIHRoaXMuX2luY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyA9IGluY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldztcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSBhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZTtcblxuICAgICAgICB0aGlzLl9tb25pdG9yU2Vzc2lvbiA9IG1vbml0b3JTZXNzaW9uO1xuICAgICAgICB0aGlzLl9tb25pdG9yQW5vbnltb3VzU2Vzc2lvbiA9IG1vbml0b3JBbm9ueW1vdXNTZXNzaW9uO1xuICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JbnRlcnZhbCA9IGNoZWNrU2Vzc2lvbkludGVydmFsO1xuICAgICAgICB0aGlzLl9zdG9wQ2hlY2tTZXNzaW9uT25FcnJvciA9IHN0b3BDaGVja1Nlc3Npb25PbkVycm9yO1xuICAgICAgICBpZiAocXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlID0gcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGU7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKGFyZ3VtZW50c1swXSAmJiBhcmd1bWVudHNbMF0ucmVzcG9uc2VfdHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUgPSBTaWduaW5SZXF1ZXN0LmlzT2lkYyhhcmd1bWVudHNbMF0ucmVzcG9uc2VfdHlwZSkgPyBcImlkX3Rva2VuXCIgOiBcImNvZGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlID0gXCJpZF90b2tlblwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0ID0gcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQ7XG5cbiAgICAgICAgdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3IgPSByZWRpcmVjdE5hdmlnYXRvcjtcbiAgICAgICAgdGhpcy5fcG9wdXBOYXZpZ2F0b3IgPSBwb3B1cE5hdmlnYXRvcjtcbiAgICAgICAgdGhpcy5faWZyYW1lTmF2aWdhdG9yID0gaWZyYW1lTmF2aWdhdG9yO1xuXG4gICAgICAgIHRoaXMuX3VzZXJTdG9yZSA9IHVzZXJTdG9yZTtcbiAgICB9XG5cbiAgICBnZXQgcG9wdXBfcmVkaXJlY3RfdXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBfcmVkaXJlY3RfdXJpO1xuICAgIH1cbiAgICBnZXQgcG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgIH1cbiAgICBnZXQgcG9wdXBXaW5kb3dGZWF0dXJlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwV2luZG93RmVhdHVyZXM7XG4gICAgfVxuICAgIGdldCBwb3B1cFdpbmRvd1RhcmdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwV2luZG93VGFyZ2V0O1xuICAgIH1cblxuICAgIGdldCBzaWxlbnRfcmVkaXJlY3RfdXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lsZW50X3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgIGdldCBzaWxlbnRSZXF1ZXN0VGltZW91dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpbGVudFJlcXVlc3RUaW1lb3V0O1xuICAgIH1cbiAgICBnZXQgYXV0b21hdGljU2lsZW50UmVuZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvbWF0aWNTaWxlbnRSZW5ldztcbiAgICB9XG4gICAgZ2V0IHZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldztcbiAgICB9XG4gICAgZ2V0IGluY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldztcbiAgICB9XG4gICAgZ2V0IGFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWU7XG4gICAgfVxuXG4gICAgZ2V0IG1vbml0b3JTZXNzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvclNlc3Npb247XG4gICAgfVxuICAgIGdldCBtb25pdG9yQW5vbnltb3VzU2Vzc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbml0b3JBbm9ueW1vdXNTZXNzaW9uO1xuICAgIH1cbiAgICBnZXQgY2hlY2tTZXNzaW9uSW50ZXJ2YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja1Nlc3Npb25JbnRlcnZhbDtcbiAgICB9XG4gICAgZ2V0IHN0b3BDaGVja1Nlc3Npb25PbkVycm9yKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9wQ2hlY2tTZXNzaW9uT25FcnJvcjtcbiAgICB9XG4gICAgZ2V0IHF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZTtcbiAgICB9XG4gICAgZ2V0IHJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQ7XG4gICAgfVxuXG4gICAgZ2V0IHJlZGlyZWN0TmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3I7XG4gICAgfVxuICAgIGdldCBwb3B1cE5hdmlnYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwTmF2aWdhdG9yO1xuICAgIH1cbiAgICBnZXQgaWZyYW1lTmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWZyYW1lTmF2aWdhdG9yO1xuICAgIH1cblxuICAgIGdldCB1c2VyU3RvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyU3RvcmU7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuXG5leHBvcnQgY2xhc3MgV2ViU3RvcmFnZVN0YXRlU3RvcmUge1xuICAgIGNvbnN0cnVjdG9yKHtwcmVmaXggPSBcIm9pZGMuXCIsIHN0b3JlID0gR2xvYmFsLmxvY2FsU3RvcmFnZX0gPSB7fSkge1xuICAgICAgICB0aGlzLl9zdG9yZSA9IHN0b3JlO1xuICAgICAgICB0aGlzLl9wcmVmaXggPSBwcmVmaXg7XG4gICAgfVxuXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiV2ViU3RvcmFnZVN0YXRlU3RvcmUuc2V0XCIsIGtleSk7XG5cbiAgICAgICAga2V5ID0gdGhpcy5fcHJlZml4ICsga2V5O1xuXG4gICAgICAgIHRoaXMuX3N0b3JlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiV2ViU3RvcmFnZVN0YXRlU3RvcmUuZ2V0XCIsIGtleSk7XG5cbiAgICAgICAga2V5ID0gdGhpcy5fcHJlZml4ICsga2V5O1xuXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5fc3RvcmUuZ2V0SXRlbShrZXkpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaXRlbSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGtleSkge1xuICAgICAgICBMb2cuZGVidWcoXCJXZWJTdG9yYWdlU3RhdGVTdG9yZS5yZW1vdmVcIiwga2V5KTtcblxuICAgICAgICBrZXkgPSB0aGlzLl9wcmVmaXggKyBrZXk7XG5cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9zdG9yZS5nZXRJdGVtKGtleSk7XG4gICAgICAgIHRoaXMuX3N0b3JlLnJlbW92ZUl0ZW0oa2V5KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGl0ZW0pO1xuICAgIH1cblxuICAgIGdldEFsbEtleXMoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIldlYlN0b3JhZ2VTdGF0ZVN0b3JlLmdldEFsbEtleXNcIik7XG5cbiAgICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fc3RvcmUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5fc3RvcmUua2V5KGluZGV4KTtcblxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuX3ByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5LnN1YnN0cih0aGlzLl9wcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleXMpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogR2VuZXJhdGVzIFJGQzQxMjIgdmVyc2lvbiA0IGd1aWQgKClcbiAqL1xuXG52YXIgY3J5cHRvID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/ICh3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0bykgOiBudWxsO1xuXG5mdW5jdGlvbiBfY3J5cHRvVXVpZHY0KCkge1xuICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLCBjID0+XG4gICAgKGMgXiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmIDE1ID4+IGMgLyA0KS50b1N0cmluZygxNilcbiAgKVxufVxuXG5mdW5jdGlvbiBfdXVpZHY0KCkge1xuICAgIHJldHVybiAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csIGMgPT5cbiAgICAoYyBeIE1hdGgucmFuZG9tKCkgKiAxNiA+PiBjIC8gNCkudG9TdHJpbmcoMTYpXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tKCkge1xuICB2YXIgaGFzQ3J5cHRvID0gY3J5cHRvICE9ICd1bmRlZmluZWQnICYmIGNyeXB0byAhPT0gbnVsbDtcbiAgdmFyIGhhc1JhbmRvbVZhbHVlcyA9IGhhc0NyeXB0byAmJiAodHlwZW9mKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpICE9ICd1bmRlZmluZWQnKTsgIFxuICB2YXIgdXVpZCA9IGhhc1JhbmRvbVZhbHVlcyA/IF9jcnlwdG9VdWlkdjQgOiBfdXVpZHY0O1xuICByZXR1cm4gdXVpZCgpLnJlcGxhY2UoLy0vZywgJycpO1xufVxuIiwiY29uc3QgVmVyc2lvbiA9IFwiMS4xMS41XCI7IGV4cG9ydCB7VmVyc2lvbn07IiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==