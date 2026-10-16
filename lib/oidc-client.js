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
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AccessTokenEvents.js":
/*!**********************************!*\
  !*** ./src/AccessTokenEvents.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessTokenEvents: function() { return /* binding */ AccessTokenEvents; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _Timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timer.js */ "./src/Timer.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.



var DefaultAccessTokenExpiringNotificationTime = 60; // seconds

var AccessTokenEvents = /*#__PURE__*/function () {
  function AccessTokenEvents() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$accessTokenExpir = _ref.accessTokenExpiringNotificationTime,
      accessTokenExpiringNotificationTime = _ref$accessTokenExpir === void 0 ? DefaultAccessTokenExpiringNotificationTime : _ref$accessTokenExpir,
      _ref$accessTokenExpir2 = _ref.accessTokenExpiringTimer,
      accessTokenExpiringTimer = _ref$accessTokenExpir2 === void 0 ? new _Timer_js__WEBPACK_IMPORTED_MODULE_1__.Timer("Access token expiring") : _ref$accessTokenExpir2,
      _ref$accessTokenExpir3 = _ref.accessTokenExpiredTimer,
      accessTokenExpiredTimer = _ref$accessTokenExpir3 === void 0 ? new _Timer_js__WEBPACK_IMPORTED_MODULE_1__.Timer("Access token expired") : _ref$accessTokenExpir3;
    this._accessTokenExpiringNotificationTime = accessTokenExpiringNotificationTime;
    this._accessTokenExpiring = accessTokenExpiringTimer;
    this._accessTokenExpired = accessTokenExpiredTimer;
  }
  var _proto = AccessTokenEvents.prototype;
  _proto.load = function load(container) {
    // only register events if there's an access token and it has an expiration
    if (container.access_token && container.expires_in !== undefined) {
      var duration = container.expires_in;
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("AccessTokenEvents.load: access token present, remaining duration:", duration);
      if (duration > 0) {
        // only register expiring if we still have time
        var expiring = duration - this._accessTokenExpiringNotificationTime;
        if (expiring <= 0) {
          expiring = 1;
        }
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("AccessTokenEvents.load: registering expiring timer in:", expiring);
        this._accessTokenExpiring.init(expiring);
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("AccessTokenEvents.load: canceling existing expiring timer becase we're past expiration.");
        this._accessTokenExpiring.cancel();
      }

      // if it's negative, it will still fire
      var expired = duration + 1;
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("AccessTokenEvents.load: registering expired timer in:", expired);
      this._accessTokenExpired.init(expired);
    } else {
      this._accessTokenExpiring.cancel();
      this._accessTokenExpired.cancel();
    }
  };
  _proto.unload = function unload() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("AccessTokenEvents.unload: canceling existing access token timers");
    this._accessTokenExpiring.cancel();
    this._accessTokenExpired.cancel();
  };
  _proto.addAccessTokenExpiring = function addAccessTokenExpiring(cb) {
    this._accessTokenExpiring.addHandler(cb);
  };
  _proto.removeAccessTokenExpiring = function removeAccessTokenExpiring(cb) {
    this._accessTokenExpiring.removeHandler(cb);
  };
  _proto.addAccessTokenExpired = function addAccessTokenExpired(cb) {
    this._accessTokenExpired.addHandler(cb);
  };
  _proto.removeAccessTokenExpired = function removeAccessTokenExpired(cb) {
    this._accessTokenExpired.removeHandler(cb);
  };
  return AccessTokenEvents;
}();

/***/ }),

/***/ "./src/CheckSessionIFrame.js":
/*!***********************************!*\
  !*** ./src/CheckSessionIFrame.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckSessionIFrame: function() { return /* binding */ CheckSessionIFrame; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


var DefaultInterval = 2000;
var CheckSessionIFrame = /*#__PURE__*/function () {
  function CheckSessionIFrame(callback, client_id, url, interval) {
    var stopOnError = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
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
  var _proto = CheckSessionIFrame.prototype;
  _proto.load = function load() {
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
  _proto._message = function _message(e) {
    if (e.origin === this._frame_origin && e.source === this._frame.contentWindow) {
      if (e.data === "error") {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("CheckSessionIFrame: error message from check session op iframe");
        if (this._stopOnError) {
          this.stop();
        }
      } else if (e.data === "changed") {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("CheckSessionIFrame: changed message from check session op iframe");
        this.stop();
        this._callback();
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("CheckSessionIFrame: " + e.data + " message from check session op iframe");
      }
    }
  };
  _proto.start = function start(session_state) {
    var _this2 = this;
    if (this._session_state !== session_state) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("CheckSessionIFrame.start");
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
  _proto.stop = function stop() {
    this._session_state = null;
    if (this._timer) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("CheckSessionIFrame.stop");
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClockService: function() { return /* binding */ ClockService; }
/* harmony export */ });
var ClockService = /*#__PURE__*/function () {
  function ClockService() {}
  var _proto = ClockService.prototype;
  _proto.getEpochTime = function getEpochTime() {
    return Promise.resolve(Date.now() / 1000 | 0);
  };
  return ClockService;
}();

/***/ }),

/***/ "./src/CordovaIFrameNavigator.js":
/*!***************************************!*\
  !*** ./src/CordovaIFrameNavigator.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CordovaIFrameNavigator: function() { return /* binding */ CordovaIFrameNavigator; }
/* harmony export */ });
/* harmony import */ var _CordovaPopupWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CordovaPopupWindow.js */ "./src/CordovaPopupWindow.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


var CordovaIFrameNavigator = /*#__PURE__*/function () {
  function CordovaIFrameNavigator() {}
  var _proto = CordovaIFrameNavigator.prototype;
  _proto.prepare = function prepare(params) {
    params.popupWindowFeatures = 'hidden=yes';
    var popup = new _CordovaPopupWindow_js__WEBPACK_IMPORTED_MODULE_0__.CordovaPopupWindow(params);
    return Promise.resolve(popup);
  };
  return CordovaIFrameNavigator;
}();

/***/ }),

/***/ "./src/CordovaPopupNavigator.js":
/*!**************************************!*\
  !*** ./src/CordovaPopupNavigator.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CordovaPopupNavigator: function() { return /* binding */ CordovaPopupNavigator; }
/* harmony export */ });
/* harmony import */ var _CordovaPopupWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CordovaPopupWindow.js */ "./src/CordovaPopupWindow.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


var CordovaPopupNavigator = /*#__PURE__*/function () {
  function CordovaPopupNavigator() {}
  var _proto = CordovaPopupNavigator.prototype;
  _proto.prepare = function prepare(params) {
    var popup = new _CordovaPopupWindow_js__WEBPACK_IMPORTED_MODULE_0__.CordovaPopupWindow(params);
    return Promise.resolve(popup);
  };
  return CordovaPopupNavigator;
}();

/***/ }),

/***/ "./src/CordovaPopupWindow.js":
/*!***********************************!*\
  !*** ./src/CordovaPopupWindow.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CordovaPopupWindow: function() { return /* binding */ CordovaPopupWindow; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;
var DefaultPopupFeatures = 'location=no,toolbar=no,zoom=no';
var DefaultPopupTarget = "_blank";
var CordovaPopupWindow = /*#__PURE__*/function () {
  function CordovaPopupWindow(params) {
    var _this = this;
    this._promise = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
    this.features = params.popupWindowFeatures || DefaultPopupFeatures;
    this.target = params.popupWindowTarget || DefaultPopupTarget;
    this.redirect_uri = params.startUrl;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("CordovaPopupWindow.ctor: redirect_uri: " + this.redirect_uri);
  }
  var _proto = CordovaPopupWindow.prototype;
  _proto._isInAppBrowserInstalled = function _isInAppBrowserInstalled(cordovaMetadata) {
    return ["cordova-plugin-inappbrowser", "cordova-plugin-inappbrowser.inappbrowser", "org.apache.cordova.inappbrowser"].some(function (name) {
      return cordovaMetadata.hasOwnProperty(name);
    });
  };
  _proto.navigate = function navigate(params) {
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
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("CordovaPopupWindow.navigate: popup successfully created");
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
  _proto._loadStartCallback = function _loadStartCallback(event) {
    if (event.url.indexOf(this.redirect_uri) === 0) {
      this._success({
        url: event.url
      });
    }
  };
  _proto._exitCallback = function _exitCallback(message) {
    this._error(message);
  };
  _proto._success = function _success(data) {
    this._cleanup();
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("CordovaPopupWindow: Successful response from cordova popup window");
    this._resolve(data);
  };
  _proto._error = function _error(message) {
    this._cleanup();
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error(message);
    this._reject(new Error(message));
  };
  _proto.close = function close() {
    this._cleanup();
  };
  _proto._cleanup = function _cleanup() {
    if (this._popup) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("CordovaPopupWindow: cleaning up popup");
      this._popup.removeEventListener("exit", this._exitCallbackEvent, false);
      this._popup.removeEventListener("loadstart", this._loadStartCallbackEvent, false);
      this._popup.close();
    }
    this._popup = null;
  };
  return _createClass(CordovaPopupWindow, [{
    key: "promise",
    get: function get() {
      return this._promise;
    }
  }]);
}();

/***/ }),

/***/ "./src/ErrorResponse.js":
/*!******************************!*\
  !*** ./src/ErrorResponse.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorResponse: function() { return /* binding */ ErrorResponse; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;
var ErrorResponse = /*#__PURE__*/function (_Error) {
  function ErrorResponse() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      error = _ref.error,
      error_description = _ref.error_description,
      error_uri = _ref.error_uri,
      state = _ref.state,
      session_state = _ref.session_state;
    if (!error) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("No error passed to ErrorResponse");
      throw new Error("error");
    }
    _this = _Error.call(this, error_description || error) || this;
    _this.name = "ErrorResponse";
    _this.error = error;
    _this.error_description = error_description;
    _this.error_uri = error_uri;
    _this.state = state;
    _this.session_state = session_state;
    return _this;
  }
  _inheritsLoose(ErrorResponse, _Error);
  return ErrorResponse;
}(/*#__PURE__*/_wrapNativeSuper(Error));

/***/ }),

/***/ "./src/Event.js":
/*!**********************!*\
  !*** ./src/Event.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Event: function() { return /* binding */ Event; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


var Event = /*#__PURE__*/function () {
  function Event(name) {
    this._name = name;
    this._callbacks = [];
  }
  var _proto = Event.prototype;
  _proto.addHandler = function addHandler(cb) {
    this._callbacks.push(cb);
  };
  _proto.removeHandler = function removeHandler(cb) {
    var idx = this._callbacks.findIndex(function (item) {
      return item === cb;
    });
    if (idx >= 0) {
      this._callbacks.splice(idx, 1);
    }
  };
  _proto.raise = function raise() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("Event: Raising event: " + this._name);
    for (var i = 0; i < this._callbacks.length; i++) {
      var _this$_callbacks;
      (_this$_callbacks = this._callbacks)[i].apply(_this$_callbacks, arguments);
    }
  };
  return Event;
}();

/***/ }),

/***/ "./src/Global.js":
/*!***********************!*\
  !*** ./src/Global.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Global: function() { return /* binding */ Global; }
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
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
var Global = /*#__PURE__*/function () {
  function Global() {}
  Global._testing = function _testing() {
    testing = true;
  };
  Global.setXMLHttpRequest = function setXMLHttpRequest(newRequest) {
    request = newRequest;
  };
  return _createClass(Global, null, [{
    key: "location",
    get: function get() {
      if (!testing) {
        return location;
      }
    }
  }, {
    key: "localStorage",
    get: function get() {
      if (!testing && typeof window !== 'undefined') {
        return localStorage;
      }
    }
  }, {
    key: "sessionStorage",
    get: function get() {
      if (!testing && typeof window !== 'undefined') {
        return sessionStorage;
      }
    }
  }, {
    key: "XMLHttpRequest",
    get: function get() {
      if (!testing && typeof window !== 'undefined') {
        return request || XMLHttpRequest;
      }
    }
  }, {
    key: "timer",
    get: function get() {
      if (!testing) {
        return timer;
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/IFrameNavigator.js":
/*!********************************!*\
  !*** ./src/IFrameNavigator.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IFrameNavigator: function() { return /* binding */ IFrameNavigator; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _IFrameWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IFrameWindow.js */ "./src/IFrameWindow.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.



var IFrameNavigator = /*#__PURE__*/function () {
  function IFrameNavigator() {}
  var _proto = IFrameNavigator.prototype;
  _proto.prepare = function prepare(params) {
    var frame = new _IFrameWindow_js__WEBPACK_IMPORTED_MODULE_1__.IFrameWindow(params);
    return Promise.resolve(frame);
  };
  _proto.callback = function callback(url) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("IFrameNavigator.callback");
    try {
      _IFrameWindow_js__WEBPACK_IMPORTED_MODULE_1__.IFrameWindow.notifyParent(url);
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IFrameWindow: function() { return /* binding */ IFrameWindow; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;
var DefaultTimeout = 10000;
var IFrameWindow = /*#__PURE__*/function () {
  function IFrameWindow(params) {
    var _this = this;
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
  var _proto = IFrameWindow.prototype;
  _proto.navigate = function navigate(params) {
    if (!params || !params.url) {
      this._error("No url provided");
    } else {
      var timeout = params.silentRequestTimeout || DefaultTimeout;
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("IFrameWindow.navigate: Using timeout of:", timeout);
      this._timer = window.setTimeout(this._timeout.bind(this), timeout);
      this._frame.src = params.url;
    }
    return this.promise;
  };
  _proto._success = function _success(data) {
    this._cleanup();
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("IFrameWindow: Successful response from frame window");
    this._resolve(data);
  };
  _proto._error = function _error(message) {
    this._cleanup();
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error(message);
    this._reject(new Error(message));
  };
  _proto.close = function close() {
    this._cleanup();
  };
  _proto._cleanup = function _cleanup() {
    if (this._frame) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("IFrameWindow: cleanup");
      window.removeEventListener("message", this._boundMessageEvent, false);
      window.clearTimeout(this._timer);
      window.document.body.removeChild(this._frame);
      this._timer = null;
      this._frame = null;
      this._boundMessageEvent = null;
    }
  };
  _proto._timeout = function _timeout() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("IFrameWindow.timeout");
    this._error("Frame window timed out");
  };
  _proto._message = function _message(e) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("IFrameWindow.message");
    if (this._timer && e.origin === this._origin && e.source === this._frame.contentWindow && typeof e.data === 'string' && (e.data.startsWith('http://') || e.data.startsWith('https://'))) {
      var url = e.data;
      if (url) {
        this._success({
          url: url
        });
      } else {
        this._error("Invalid response from frame");
      }
    }
  };
  IFrameWindow.notifyParent = function notifyParent(url) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("IFrameWindow.notifyParent");
    url = url || window.location.href;
    if (url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("IFrameWindow.notifyParent: posting url message to parent");
      window.parent.postMessage(url, location.protocol + "//" + location.host);
    }
  };
  return _createClass(IFrameWindow, [{
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
}();

/***/ }),

/***/ "./src/InMemoryWebStorage.js":
/*!***********************************!*\
  !*** ./src/InMemoryWebStorage.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InMemoryWebStorage: function() { return /* binding */ InMemoryWebStorage; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;
var InMemoryWebStorage = /*#__PURE__*/function () {
  function InMemoryWebStorage() {
    this._data = {};
  }
  var _proto = InMemoryWebStorage.prototype;
  _proto.getItem = function getItem(key) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("InMemoryWebStorage.getItem", key);
    return this._data[key];
  };
  _proto.setItem = function setItem(key, value) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("InMemoryWebStorage.setItem", key);
    this._data[key] = value;
  };
  _proto.removeItem = function removeItem(key) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("InMemoryWebStorage.removeItem", key);
    delete this._data[key];
  };
  _proto.key = function key(index) {
    return Object.getOwnPropertyNames(this._data)[index];
  };
  return _createClass(InMemoryWebStorage, [{
    key: "length",
    get: function get() {
      return Object.getOwnPropertyNames(this._data).length;
    }
  }]);
}();

/***/ }),

/***/ "./src/JoseUtil.js":
/*!*************************!*\
  !*** ./src/JoseUtil.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JoseUtil: function() { return /* binding */ JoseUtil; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto-js/sha256.js */ "./node_modules/crypto-js/sha256.js");
/* harmony import */ var crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var crypto_js_sha384_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto-js/sha384.js */ "./node_modules/crypto-js/sha384.js");
/* harmony import */ var crypto_js_sha384_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js_sha384_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var crypto_js_sha512_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! crypto-js/sha512.js */ "./node_modules/crypto-js/sha512.js");
/* harmony import */ var crypto_js_sha512_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto_js_sha512_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var crypto_js_enc_hex_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crypto-js/enc-hex.js */ "./node_modules/crypto-js/enc-hex.js");
/* harmony import */ var crypto_js_enc_hex_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(crypto_js_enc_hex_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var crypto_js_enc_base64_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! crypto-js/enc-base64.js */ "./node_modules/crypto-js/enc-base64.js");
/* harmony import */ var crypto_js_enc_base64_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(crypto_js_enc_base64_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var base64_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

// JWT parsing and validation.
// - Signatures are verified with WebCrypto (crypto.subtle): RS/PS/ES 256/384/512.
// - Hashing (at_hash / c_hash / PKCE) uses crypto-js.
// - Base64 decoding uses base64-js.








var AllowedSigningAlgs = ['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512', 'ES256', 'ES384', 'ES512'];

// Only asymmetric signatures from the allowlist are accepted. "none" (unsigned) and HS*
// (which would treat the public key as an HMAC secret) are rejected explicitly, whatever
// their case, so this does not depend on the allowlist alone.
function assertAllowedAlg(alg) {
  if (typeof alg !== 'string' || !alg) {
    throw new Error('Missing or invalid JWT alg');
  }
  if (alg.toLowerCase() === 'none') {
    throw new Error('Unsigned JWT (alg "none") is not allowed');
  }
  if (AllowedSigningAlgs.indexOf(alg) < 0) {
    throw new Error('Invalid or unsupported JWT alg: ' + alg);
  }
  return alg;
}
var Hashers = {
  sha256: (crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_1___default()),
  sha384: (crypto_js_sha384_js__WEBPACK_IMPORTED_MODULE_2___default()),
  sha512: (crypto_js_sha512_js__WEBPACK_IMPORTED_MODULE_3___default())
};
function b64ToBytes(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  while (s.length % 4) {
    s += '=';
  }
  return (0,base64_js__WEBPACK_IMPORTED_MODULE_6__.toByteArray)(s);
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
  var c = typeof window !== 'undefined' && window.crypto || typeof globalThis !== 'undefined' && globalThis.crypto || typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.crypto;
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
  return {
    tag: tag,
    start: start,
    end: end
  };
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
      return {
        kty: 'RSA',
        format: 'jwk',
        data: {
          kty: 'RSA',
          n: key.n,
          e: key.e,
          ext: true
        }
      };
    }
    if (key.x5c && key.x5c.length) {
      return {
        kty: 'RSA',
        format: 'spki',
        data: spkiFromCertificate(b64ToBytes(key.x5c[0]))
      };
    }
    throw new Error('RSA key missing key material');
  }
  if (key.kty === 'EC') {
    if (key.crv && key.x && key.y) {
      return {
        kty: 'EC',
        crv: key.crv,
        format: 'jwk',
        data: {
          kty: 'EC',
          crv: key.crv,
          x: key.x,
          y: key.y,
          ext: true
        }
      };
    }
    throw new Error('EC key missing key material');
  }
  throw new Error('Unsupported key type: ' + key.kty);
}

// Maps a JWS alg to WebCrypto import/verify parameters
function algParams(alg) {
  var bits = alg.substr(2);
  var hash = {
    name: 'SHA-' + bits
  };
  switch (alg.substr(0, 2)) {
    case 'RS':
      return {
        kty: 'RSA',
        importAlg: {
          name: 'RSASSA-PKCS1-v1_5',
          hash: hash
        },
        verifyAlg: {
          name: 'RSASSA-PKCS1-v1_5'
        }
      };
    case 'PS':
      return {
        kty: 'RSA',
        importAlg: {
          name: 'RSA-PSS',
          hash: hash
        },
        verifyAlg: {
          name: 'RSA-PSS',
          saltLength: parseInt(bits, 10) / 8
        }
      };
    case 'ES':
      {
        var curve = {
          '256': 'P-256',
          '384': 'P-384',
          '512': 'P-521'
        }[bits];
        return {
          kty: 'EC',
          curve: curve,
          importAlg: {
            name: 'ECDSA',
            namedCurve: curve
          },
          verifyAlg: {
            name: 'ECDSA',
            hash: hash
          }
        };
      }
  }
  throw new Error('Unsupported alg: ' + alg);
}
var JoseUtil = /*#__PURE__*/function () {
  function JoseUtil() {}
  JoseUtil.parseJwt = function parseJwt(jwt) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("JoseUtil.parseJwt");
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
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error(e);
    }
  };
  JoseUtil.isAllowedSigningAlg = function isAllowedSigningAlg(alg) {
    try {
      assertAllowedAlg(alg);
      return true;
    } catch (e) {
      return false;
    }
  };
  JoseUtil.validateJwt = function validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("JoseUtil.validateJwt");

    // Check the algorithm and signature presence before anything else, so an unsigned
    // or downgraded token is rejected without its claims ever being considered
    try {
      var parts = typeof jwt === 'string' ? jwt.split('.') : [];
      if (parts.length !== 3 || !parts[2]) {
        throw new Error('JWT is not signed');
      }
      var alg = assertAllowedAlg(b64uToJson(parts[0]).alg);
      if (key && key.alg && key.alg !== alg) {
        throw new Error('JWT alg ' + alg + ' does not match key alg ' + key.alg);
      }
    } catch (e) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil.validateJwt: " + (e && e.message));
      return Promise.reject(new Error("signature validation failed: " + (e && e.message)));
    }
    var resolved;
    try {
      resolved = resolveKey(key);
    } catch (e) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil.validateJwt: " + (e && e.message), key);
      return Promise.reject(e);
    }
    return JoseUtil.validateJwtAttributes(jwt, issuer, audience, clockSkew, now, timeInsensitive).then(function (payload) {
      return JoseUtil._verifySignature(jwt, resolved).then(function (valid) {
        if (!valid) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: signature validation failed");
          return Promise.reject(new Error("signature validation failed"));
        }
        return payload;
      }, function (e) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error(e && e.message || e);
        return Promise.reject(new Error("signature validation failed"));
      });
    });
  };
  JoseUtil._verifySignature = function _verifySignature(jwt, resolved) {
    try {
      var parts = jwt.split('.');
      // checked again here so this path is safe on its own
      var alg = assertAllowedAlg(b64uToJson(parts[0]).alg);
      if (!parts[2]) {
        throw new Error('JWT is not signed');
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
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: issuer was not provided");
      return Promise.reject(new Error("issuer was not provided"));
    }
    if (payload.iss !== issuer) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: Invalid issuer in token", payload.iss);
      return Promise.reject(new Error("Invalid issuer in token: " + payload.iss));
    }
    if (!payload.aud) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: aud was not provided");
      return Promise.reject(new Error("aud was not provided"));
    }
    var validAudience = payload.aud === audience || Array.isArray(payload.aud) && payload.aud.indexOf(audience) >= 0;
    if (!validAudience) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: Invalid audience in token", payload.aud);
      return Promise.reject(new Error("Invalid audience in token: " + payload.aud));
    }
    if (payload.azp && payload.azp !== audience) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: Invalid azp in token", payload.azp);
      return Promise.reject(new Error("Invalid azp in token: " + payload.azp));
    }
    if (!timeInsensitive) {
      var lowerNow = now + clockSkew;
      var upperNow = now - clockSkew;
      if (!payload.iat) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: iat was not provided");
        return Promise.reject(new Error("iat was not provided"));
      }
      if (lowerNow < payload.iat) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: iat is in the future", payload.iat);
        return Promise.reject(new Error("iat is in the future: " + payload.iat));
      }
      if (payload.nbf && lowerNow < payload.nbf) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: nbf is in the future", payload.nbf);
        return Promise.reject(new Error("nbf is in the future: " + payload.nbf));
      }
      if (!payload.exp) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: exp was not provided");
        return Promise.reject(new Error("exp was not provided"));
      }
      if (payload.exp < upperNow) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JoseUtil._validateJwt: exp is in the past", payload.exp);
        return Promise.reject(new Error("exp is in the past:" + payload.exp));
      }
    }
    return Promise.resolve(payload);
  }

  // UTF-8 input, lowercase hex output
;
  JoseUtil.hashString = function hashString(value, alg) {
    try {
      var hasher = Hashers[String(alg).toLowerCase().replace(/[^a-z0-9]/g, '')];
      if (!hasher) {
        throw new Error('Unsupported hash alg: ' + alg);
      }
      return hasher(value).toString((crypto_js_enc_hex_js__WEBPACK_IMPORTED_MODULE_4___default()));
    } catch (e) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error(e);
    }
  };
  JoseUtil.hexToBase64Url = function hexToBase64Url(value) {
    try {
      return crypto_js_enc_base64_js__WEBPACK_IMPORTED_MODULE_5___default().stringify(crypto_js_enc_hex_js__WEBPACK_IMPORTED_MODULE_4___default().parse(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch (e) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error(e);
    }
  };
  return JoseUtil;
}();

/***/ }),

/***/ "./src/JsonService.js":
/*!****************************!*\
  !*** ./src/JsonService.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonService: function() { return /* binding */ JsonService; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Global.js */ "./src/Global.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.



var JsonService = /*#__PURE__*/function () {
  function JsonService() {
    var additionalContentTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var XMLHttpRequestCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Global_js__WEBPACK_IMPORTED_MODULE_1__.Global.XMLHttpRequest;
    var jwtHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
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
  var _proto = JsonService.prototype;
  _proto.getJson = function getJson(url, token) {
    var _this = this;
    if (!url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JsonService.getJson: No url passed");
      throw new Error("url");
    }
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("JsonService.getJson, url: ", url);
    return new Promise(function (resolve, reject) {
      var req = new _this._XMLHttpRequest();
      req.open('GET', url);
      var allowedContentTypes = _this._contentTypes;
      var jwtHandler = _this._jwtHandler;
      req.onload = function () {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("JsonService.getJson: HTTP response received, status", req.status);
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
                _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JsonService.getJson: Error parsing JSON response", e.message);
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
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JsonService.getJson: network error");
        reject(Error("Network Error"));
      };
      if (token) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("JsonService.getJson: token passed, setting Authorization header");
        req.setRequestHeader("Authorization", "Bearer " + token);
      }
      req.send();
    });
  };
  _proto.postForm = function postForm(url, payload, basicAuth) {
    var _this2 = this;
    if (!url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JsonService.postForm: No url passed");
      throw new Error("url");
    }
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("JsonService.postForm, url: ", url);
    return new Promise(function (resolve, reject) {
      var req = new _this2._XMLHttpRequest();
      req.open('POST', url);
      var allowedContentTypes = _this2._contentTypes;
      req.onload = function () {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("JsonService.postForm: HTTP response received, status", req.status);
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
                _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JsonService.postForm: Error parsing JSON response", e.message);
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
                  _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JsonService.postForm: Error from server: ", payload.error);
                  reject(new Error(payload.error));
                  return;
                }
              } catch (e) {
                _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JsonService.postForm: Error parsing JSON response", e.message);
                reject(e);
                return;
              }
            }
          }
        }
        reject(Error(req.statusText + " (" + req.status + ")"));
      };
      req.onerror = function () {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("JsonService.postForm: network error");
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Log: function() { return /* binding */ Log; }
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
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
var logger;
var level;
var Log = /*#__PURE__*/function () {
  function Log() {}
  Log.reset = function reset() {
    level = INFO;
    logger = nopLogger;
  };
  Log.debug = function debug() {
    if (level >= DEBUG) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      logger.debug.apply(logger, Array.from(args));
    }
  };
  Log.info = function info() {
    if (level >= INFO) {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      logger.info.apply(logger, Array.from(args));
    }
  };
  Log.warn = function warn() {
    if (level >= WARN) {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      logger.warn.apply(logger, Array.from(args));
    }
  };
  Log.error = function error() {
    if (level >= ERROR) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      logger.error.apply(logger, Array.from(args));
    }
  };
  return _createClass(Log, null, [{
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
}();
Log.reset();

/***/ }),

/***/ "./src/MetadataService.js":
/*!********************************!*\
  !*** ./src/MetadataService.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MetadataService: function() { return /* binding */ MetadataService; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _JsonService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JsonService.js */ "./src/JsonService.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;

var OidcMetadataUrlPath = '.well-known/openid-configuration';
var MetadataService = /*#__PURE__*/function () {
  function MetadataService(settings) {
    var JsonServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _JsonService_js__WEBPACK_IMPORTED_MODULE_1__.JsonService;
    if (!settings) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("MetadataService: No settings passed to MetadataService");
      throw new Error("settings");
    }
    this._settings = settings;
    this._jsonService = new JsonServiceCtor(['application/jwk-set+json']);
  }
  var _proto = MetadataService.prototype;
  _proto.resetSigningKeys = function resetSigningKeys() {
    this._settings = this._settings || {};
    this._settings.signingKeys = undefined;
  };
  _proto.getMetadata = function getMetadata() {
    var _this = this;
    if (this._settings.metadata) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("MetadataService.getMetadata: Returning metadata from settings");
      return Promise.resolve(this._settings.metadata);
    }
    if (!this.metadataUrl) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("MetadataService.getMetadata: No authority or metadataUrl configured on settings");
      return Promise.reject(new Error("No authority or metadataUrl configured on settings"));
    }
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("MetadataService.getMetadata: getting metadata from", this.metadataUrl);
    return this._jsonService.getJson(this.metadataUrl).then(function (metadata) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("MetadataService.getMetadata: json received");
      var seed = _this._settings.metadataSeed || {};
      _this._settings.metadata = Object.assign({}, seed, metadata);
      return _this._settings.metadata;
    });
  };
  _proto.getIssuer = function getIssuer() {
    return this._getMetadataProperty("issuer");
  };
  _proto.getAuthorizationEndpoint = function getAuthorizationEndpoint() {
    return this._getMetadataProperty("authorization_endpoint");
  };
  _proto.getUserInfoEndpoint = function getUserInfoEndpoint() {
    return this._getMetadataProperty("userinfo_endpoint");
  };
  _proto.getTokenEndpoint = function getTokenEndpoint() {
    var optional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return this._getMetadataProperty("token_endpoint", optional);
  };
  _proto.getCheckSessionIframe = function getCheckSessionIframe() {
    return this._getMetadataProperty("check_session_iframe", true);
  };
  _proto.getEndSessionEndpoint = function getEndSessionEndpoint() {
    return this._getMetadataProperty("end_session_endpoint", true);
  };
  _proto.getRevocationEndpoint = function getRevocationEndpoint() {
    return this._getMetadataProperty("revocation_endpoint", true);
  };
  _proto.getKeysEndpoint = function getKeysEndpoint() {
    return this._getMetadataProperty("jwks_uri", true);
  };
  _proto._getMetadataProperty = function _getMetadataProperty(name) {
    var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("MetadataService.getMetadataProperty for: " + name);
    return this.getMetadata().then(function (metadata) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("MetadataService.getMetadataProperty: metadata recieved");
      if (metadata[name] === undefined) {
        if (optional === true) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.warn("MetadataService.getMetadataProperty: Metadata does not contain optional property " + name);
          return undefined;
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("MetadataService.getMetadataProperty: Metadata does not contain property " + name);
          throw new Error("Metadata does not contain property " + name);
        }
      }
      return metadata[name];
    });
  };
  _proto.getSigningKeys = function getSigningKeys() {
    var _this2 = this;
    if (this._settings.signingKeys) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("MetadataService.getSigningKeys: Returning signingKeys from settings");
      return Promise.resolve(this._settings.signingKeys);
    }
    return this._getMetadataProperty("jwks_uri").then(function (jwks_uri) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("MetadataService.getSigningKeys: jwks_uri received", jwks_uri);
      return _this2._jsonService.getJson(jwks_uri).then(function (keySet) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("MetadataService.getSigningKeys: key set received", keySet);
        if (!keySet.keys) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("MetadataService.getSigningKeys: Missing keys on keyset");
          throw new Error("Missing keys on keyset");
        }
        _this2._settings.signingKeys = keySet.keys;
        return _this2._settings.signingKeys;
      });
    });
  };
  return _createClass(MetadataService, [{
    key: "metadataUrl",
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
}();

/***/ }),

/***/ "./src/OidcClient.js":
/*!***************************!*\
  !*** ./src/OidcClient.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OidcClient: function() { return /* binding */ OidcClient; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _OidcClientSettings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OidcClientSettings.js */ "./src/OidcClientSettings.js");
/* harmony import */ var _ErrorResponse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ErrorResponse.js */ "./src/ErrorResponse.js");
/* harmony import */ var _SigninRequest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SigninRequest.js */ "./src/SigninRequest.js");
/* harmony import */ var _SigninResponse_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SigninResponse.js */ "./src/SigninResponse.js");
/* harmony import */ var _SignoutRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SignoutRequest.js */ "./src/SignoutRequest.js");
/* harmony import */ var _SignoutResponse_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SignoutResponse.js */ "./src/SignoutResponse.js");
/* harmony import */ var _SigninState_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SigninState.js */ "./src/SigninState.js");
/* harmony import */ var _State_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./State.js */ "./src/State.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;








var OidcClient = /*#__PURE__*/function () {
  function OidcClient() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (settings instanceof _OidcClientSettings_js__WEBPACK_IMPORTED_MODULE_1__.OidcClientSettings) {
      this._settings = settings;
    } else {
      this._settings = new _OidcClientSettings_js__WEBPACK_IMPORTED_MODULE_1__.OidcClientSettings(settings);
    }
  }
  var _proto = OidcClient.prototype;
  _proto.createSigninRequest = function createSigninRequest() {
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
    var stateStore = arguments.length > 1 ? arguments[1] : undefined;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.createSigninRequest");
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
    if (_SigninRequest_js__WEBPACK_IMPORTED_MODULE_3__.SigninRequest.isCode(response_type) && response_type !== "code") {
      return Promise.reject(new Error("OpenID Connect hybrid flow is not supported"));
    }
    return this._metadataService.getAuthorizationEndpoint().then(function (url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.createSigninRequest: Received authorization endpoint", url);
      var signinRequest = new _SigninRequest_js__WEBPACK_IMPORTED_MODULE_3__.SigninRequest({
        url: url,
        client_id: client_id,
        redirect_uri: redirect_uri,
        response_type: response_type,
        scope: scope,
        data: data || state,
        authority: authority,
        prompt: prompt,
        display: display,
        max_age: max_age,
        ui_locales: ui_locales,
        id_token_hint: id_token_hint,
        login_hint: login_hint,
        acr_values: acr_values,
        resource: resource,
        request: request,
        request_uri: request_uri,
        extraQueryParams: extraQueryParams,
        extraTokenParams: extraTokenParams,
        request_type: request_type,
        response_mode: response_mode,
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
  _proto.readSigninResponseState = function readSigninResponseState(url, stateStore) {
    var removeState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.readSigninResponseState");
    var useQuery = this._settings.response_mode === "query" || !this._settings.response_mode && _SigninRequest_js__WEBPACK_IMPORTED_MODULE_3__.SigninRequest.isCode(this._settings.response_type);
    var delimiter = useQuery ? "?" : "#";
    var response = new _SigninResponse_js__WEBPACK_IMPORTED_MODULE_4__.SigninResponse(url, delimiter);
    if (!response.state) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("OidcClient.readSigninResponseState: No state in response");
      return Promise.reject(new Error("No state in response"));
    }
    stateStore = stateStore || this._stateStore;
    var stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);
    return stateApi(response.state).then(function (storedStateString) {
      if (!storedStateString) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("OidcClient.readSigninResponseState: No matching state found in storage");
        throw new Error("No matching state found in storage");
      }
      var state = _SigninState_js__WEBPACK_IMPORTED_MODULE_7__.SigninState.fromStorageString(storedStateString);
      return {
        state: state,
        response: response
      };
    });
  };
  _proto.processSigninResponse = function processSigninResponse(url, stateStore) {
    var _this2 = this;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.processSigninResponse");
    return this.readSigninResponseState(url, stateStore, true).then(function (_ref2) {
      var state = _ref2.state,
        response = _ref2.response;
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.processSigninResponse: Received state from storage; validating response");
      return _this2._validator.validateSigninResponse(state, response);
    });
  };
  _proto.createSignoutRequest = function createSignoutRequest() {
    var _this3 = this;
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id_token_hint = _ref3.id_token_hint,
      data = _ref3.data,
      state = _ref3.state,
      post_logout_redirect_uri = _ref3.post_logout_redirect_uri,
      extraQueryParams = _ref3.extraQueryParams,
      request_type = _ref3.request_type;
    var stateStore = arguments.length > 1 ? arguments[1] : undefined;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.createSignoutRequest");
    post_logout_redirect_uri = post_logout_redirect_uri || this._settings.post_logout_redirect_uri;
    extraQueryParams = extraQueryParams || this._settings.extraQueryParams;
    return this._metadataService.getEndSessionEndpoint().then(function (url) {
      if (!url) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("OidcClient.createSignoutRequest: No end session endpoint url returned");
        throw new Error("no end session endpoint");
      }
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.createSignoutRequest: Received end session endpoint", url);
      var request = new _SignoutRequest_js__WEBPACK_IMPORTED_MODULE_5__.SignoutRequest({
        url: url,
        id_token_hint: id_token_hint,
        post_logout_redirect_uri: post_logout_redirect_uri,
        data: data || state,
        extraQueryParams: extraQueryParams,
        request_type: request_type
      });
      var signoutState = request.state;
      if (signoutState) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.createSignoutRequest: Signout request has state to persist");
        stateStore = stateStore || _this3._stateStore;
        stateStore.set(signoutState.id, signoutState.toStorageString());
      }
      return request;
    });
  };
  _proto.readSignoutResponseState = function readSignoutResponseState(url, stateStore) {
    var removeState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.readSignoutResponseState");
    var response = new _SignoutResponse_js__WEBPACK_IMPORTED_MODULE_6__.SignoutResponse(url);
    if (!response.state) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.readSignoutResponseState: No state in response");
      if (response.error) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.warn("OidcClient.readSignoutResponseState: Response was error: ", response.error);
        return Promise.reject(new _ErrorResponse_js__WEBPACK_IMPORTED_MODULE_2__.ErrorResponse(response));
      }
      return Promise.resolve({
        state: undefined,
        response: response
      });
    }
    var stateKey = response.state;
    stateStore = stateStore || this._stateStore;
    var stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);
    return stateApi(stateKey).then(function (storedStateString) {
      if (!storedStateString) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("OidcClient.readSignoutResponseState: No matching state found in storage");
        throw new Error("No matching state found in storage");
      }
      var state = _State_js__WEBPACK_IMPORTED_MODULE_8__.State.fromStorageString(storedStateString);
      return {
        state: state,
        response: response
      };
    });
  };
  _proto.processSignoutResponse = function processSignoutResponse(url, stateStore) {
    var _this4 = this;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.processSignoutResponse");
    return this.readSignoutResponseState(url, stateStore, true).then(function (_ref4) {
      var state = _ref4.state,
        response = _ref4.response;
      if (state) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.processSignoutResponse: Received state from storage; validating response");
        return _this4._validator.validateSignoutResponse(state, response);
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.processSignoutResponse: No state from storage; skipping validating response");
        return response;
      }
    });
  };
  _proto.clearStaleState = function clearStaleState(stateStore) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("OidcClient.clearStaleState");
    stateStore = stateStore || this._stateStore;
    return _State_js__WEBPACK_IMPORTED_MODULE_8__.State.clearStaleState(stateStore, this.settings.staleStateAge);
  };
  return _createClass(OidcClient, [{
    key: "_stateStore",
    get: function get() {
      return this.settings.stateStore;
    }
  }, {
    key: "_validator",
    get: function get() {
      return this.settings.validator;
    }
  }, {
    key: "_metadataService",
    get: function get() {
      return this.settings.metadataService;
    }
  }, {
    key: "settings",
    get: function get() {
      return this._settings;
    }
  }, {
    key: "metadataService",
    get: function get() {
      return this._metadataService;
    }
  }]);
}();

/***/ }),

/***/ "./src/OidcClientSettings.js":
/*!***********************************!*\
  !*** ./src/OidcClientSettings.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OidcClientSettings: function() { return /* binding */ OidcClientSettings; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _ClockService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClockService.js */ "./src/ClockService.js");
/* harmony import */ var _WebStorageStateStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WebStorageStateStore.js */ "./src/WebStorageStateStore.js");
/* harmony import */ var _ResponseValidator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ResponseValidator.js */ "./src/ResponseValidator.js");
/* harmony import */ var _MetadataService_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;




var OidcMetadataUrlPath = '.well-known/openid-configuration';
var DefaultResponseType = "id_token";
var DefaultScope = "openid";
var DefaultClientAuthentication = "client_secret_post"; // The default value must be client_secret_basic, as explained in https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication
var DefaultStaleStateAge = 60 * 15; // seconds
var DefaultClockSkewInSeconds = 60 * 5;
var OidcClientSettings = /*#__PURE__*/function () {
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
      response_type = _ref$response_type === void 0 ? DefaultResponseType : _ref$response_type,
      _ref$scope = _ref.scope,
      scope = _ref$scope === void 0 ? DefaultScope : _ref$scope,
      redirect_uri = _ref.redirect_uri,
      post_logout_redirect_uri = _ref.post_logout_redirect_uri,
      _ref$client_authentic = _ref.client_authentication,
      client_authentication = _ref$client_authentic === void 0 ? DefaultClientAuthentication : _ref$client_authentic,
      prompt = _ref.prompt,
      display = _ref.display,
      max_age = _ref.max_age,
      ui_locales = _ref.ui_locales,
      acr_values = _ref.acr_values,
      resource = _ref.resource,
      response_mode = _ref.response_mode,
      _ref$filterProtocolCl = _ref.filterProtocolClaims,
      filterProtocolClaims = _ref$filterProtocolCl === void 0 ? true : _ref$filterProtocolCl,
      _ref$loadUserInfo = _ref.loadUserInfo,
      loadUserInfo = _ref$loadUserInfo === void 0 ? true : _ref$loadUserInfo,
      _ref$staleStateAge = _ref.staleStateAge,
      staleStateAge = _ref$staleStateAge === void 0 ? DefaultStaleStateAge : _ref$staleStateAge,
      _ref$clockSkew = _ref.clockSkew,
      clockSkew = _ref$clockSkew === void 0 ? DefaultClockSkewInSeconds : _ref$clockSkew,
      _ref$clockService = _ref.clockService,
      clockService = _ref$clockService === void 0 ? new _ClockService_js__WEBPACK_IMPORTED_MODULE_1__.ClockService() : _ref$clockService,
      _ref$userInfoJwtIssue = _ref.userInfoJwtIssuer,
      userInfoJwtIssuer = _ref$userInfoJwtIssue === void 0 ? 'OP' : _ref$userInfoJwtIssue,
      _ref$mergeClaims = _ref.mergeClaims,
      mergeClaims = _ref$mergeClaims === void 0 ? false : _ref$mergeClaims,
      _ref$stateStore = _ref.stateStore,
      stateStore = _ref$stateStore === void 0 ? new _WebStorageStateStore_js__WEBPACK_IMPORTED_MODULE_2__.WebStorageStateStore() : _ref$stateStore,
      _ref$ResponseValidato = _ref.ResponseValidatorCtor,
      ResponseValidatorCtor = _ref$ResponseValidato === void 0 ? _ResponseValidator_js__WEBPACK_IMPORTED_MODULE_3__.ResponseValidator : _ref$ResponseValidato,
      _ref$MetadataServiceC = _ref.MetadataServiceCtor,
      MetadataServiceCtor = _ref$MetadataServiceC === void 0 ? _MetadataService_js__WEBPACK_IMPORTED_MODULE_4__.MetadataService : _ref$MetadataServiceC,
      _ref$extraQueryParams = _ref.extraQueryParams,
      extraQueryParams = _ref$extraQueryParams === void 0 ? {} : _ref$extraQueryParams,
      _ref$extraTokenParams = _ref.extraTokenParams,
      extraTokenParams = _ref$extraTokenParams === void 0 ? {} : _ref$extraTokenParams;
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
    this._extraQueryParams = _typeof(extraQueryParams) === 'object' ? extraQueryParams : {};
    this._extraTokenParams = _typeof(extraTokenParams) === 'object' ? extraTokenParams : {};
  }

  // client config
  var _proto = OidcClientSettings.prototype;
  // get the time
  _proto.getEpochTime = function getEpochTime() {
    return this._clockService.getEpochTime();
  };
  return _createClass(OidcClientSettings, [{
    key: "client_id",
    get: function get() {
      return this._client_id;
    },
    set: function set(value) {
      if (!this._client_id) {
        // one-time set only
        this._client_id = value;
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("OidcClientSettings.set_client_id: client_id has already been assigned.");
        throw new Error("client_id has already been assigned.");
      }
    }
  }, {
    key: "client_secret",
    get: function get() {
      return this._client_secret;
    }
  }, {
    key: "response_type",
    get: function get() {
      return this._response_type;
    }
  }, {
    key: "scope",
    get: function get() {
      return this._scope;
    }
  }, {
    key: "redirect_uri",
    get: function get() {
      return this._redirect_uri;
    }
  }, {
    key: "post_logout_redirect_uri",
    get: function get() {
      return this._post_logout_redirect_uri;
    }
  }, {
    key: "client_authentication",
    get: function get() {
      return this._client_authentication;
    }

    // optional protocol params
  }, {
    key: "prompt",
    get: function get() {
      return this._prompt;
    }
  }, {
    key: "display",
    get: function get() {
      return this._display;
    }
  }, {
    key: "max_age",
    get: function get() {
      return this._max_age;
    }
  }, {
    key: "ui_locales",
    get: function get() {
      return this._ui_locales;
    }
  }, {
    key: "acr_values",
    get: function get() {
      return this._acr_values;
    }
  }, {
    key: "resource",
    get: function get() {
      return this._resource;
    }
  }, {
    key: "response_mode",
    get: function get() {
      return this._response_mode;
    }

    // metadata
  }, {
    key: "authority",
    get: function get() {
      return this._authority;
    },
    set: function set(value) {
      if (!this._authority) {
        // one-time set only
        this._authority = value;
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("OidcClientSettings.set_authority: authority has already been assigned.");
        throw new Error("authority has already been assigned.");
      }
    }
  }, {
    key: "metadataUrl",
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
    key: "metadata",
    get: function get() {
      return this._metadata;
    },
    set: function set(value) {
      this._metadata = value;
    }
  }, {
    key: "metadataSeed",
    get: function get() {
      return this._metadataSeed;
    },
    set: function set(value) {
      this._metadataSeed = value;
    }
  }, {
    key: "signingKeys",
    get: function get() {
      return this._signingKeys;
    },
    set: function set(value) {
      this._signingKeys = value;
    }

    // behavior flags
  }, {
    key: "filterProtocolClaims",
    get: function get() {
      return this._filterProtocolClaims;
    }
  }, {
    key: "loadUserInfo",
    get: function get() {
      return this._loadUserInfo;
    }
  }, {
    key: "staleStateAge",
    get: function get() {
      return this._staleStateAge;
    }
  }, {
    key: "clockSkew",
    get: function get() {
      return this._clockSkew;
    }
  }, {
    key: "userInfoJwtIssuer",
    get: function get() {
      return this._userInfoJwtIssuer;
    }
  }, {
    key: "mergeClaims",
    get: function get() {
      return this._mergeClaims;
    }
  }, {
    key: "stateStore",
    get: function get() {
      return this._stateStore;
    }
  }, {
    key: "validator",
    get: function get() {
      return this._validator;
    }
  }, {
    key: "metadataService",
    get: function get() {
      return this._metadataService;
    }

    // extra query params
  }, {
    key: "extraQueryParams",
    get: function get() {
      return this._extraQueryParams;
    },
    set: function set(value) {
      if (_typeof(value) === 'object') {
        this._extraQueryParams = value;
      } else {
        this._extraQueryParams = {};
      }
    }

    // extra token params
  }, {
    key: "extraTokenParams",
    get: function get() {
      return this._extraTokenParams;
    },
    set: function set(value) {
      if (_typeof(value) === 'object') {
        this._extraTokenParams = value;
      } else {
        this._extraTokenParams = {};
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/PopupNavigator.js":
/*!*******************************!*\
  !*** ./src/PopupNavigator.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupNavigator: function() { return /* binding */ PopupNavigator; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _PopupWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PopupWindow.js */ "./src/PopupWindow.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.



var PopupNavigator = /*#__PURE__*/function () {
  function PopupNavigator() {}
  var _proto = PopupNavigator.prototype;
  _proto.prepare = function prepare(params) {
    var popup = new _PopupWindow_js__WEBPACK_IMPORTED_MODULE_1__.PopupWindow(params);
    return Promise.resolve(popup);
  };
  _proto.callback = function callback(url, keepOpen, delimiter) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("PopupNavigator.callback");
    try {
      _PopupWindow_js__WEBPACK_IMPORTED_MODULE_1__.PopupWindow.notifyOpener(url, keepOpen, delimiter);
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupWindow: function() { return /* binding */ PopupWindow; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;

var CheckForPopupClosedInterval = 500;
var DefaultPopupFeatures = 'location=no,toolbar=no,width=500,height=500,left=100,top=100;';
//const DefaultPopupFeatures = 'location=no,toolbar=no,width=500,height=500,left=100,top=100;resizable=yes';

var DefaultPopupTarget = "_blank";
var PopupWindow = /*#__PURE__*/function () {
  function PopupWindow(params) {
    var _this = this;
    this._promise = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
    var target = params.popupWindowTarget || DefaultPopupTarget;
    var features = params.popupWindowFeatures || DefaultPopupFeatures;
    this._popup = window.open('', target, features);
    if (this._popup) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("PopupWindow.ctor: popup successfully created");
      this._checkForPopupClosedTimer = window.setInterval(this._checkForPopupClosed.bind(this), CheckForPopupClosedInterval);
    }
  }
  var _proto = PopupWindow.prototype;
  _proto.navigate = function navigate(params) {
    if (!this._popup) {
      this._error("PopupWindow.navigate: Error opening popup window");
    } else if (!params || !params.url) {
      this._error("PopupWindow.navigate: no url provided");
      this._error("No url provided");
    } else {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("PopupWindow.navigate: Setting URL in popup");
      this._id = params.id;
      if (this._id) {
        window["popupCallback_" + params.id] = this._callback.bind(this);
      }
      this._popup.focus();
      this._popup.window.location = params.url;
    }
    return this.promise;
  };
  _proto._success = function _success(data) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("PopupWindow.callback: Successful response from popup window");
    this._cleanup();
    this._resolve(data);
  };
  _proto._error = function _error(message) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("PopupWindow.error: ", message);
    this._cleanup();
    this._reject(new Error(message));
  };
  _proto.close = function close() {
    this._cleanup(false);
  };
  _proto._cleanup = function _cleanup(keepOpen) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("PopupWindow.cleanup");
    window.clearInterval(this._checkForPopupClosedTimer);
    this._checkForPopupClosedTimer = null;
    delete window["popupCallback_" + this._id];
    if (this._popup && !keepOpen) {
      this._popup.close();
    }
    this._popup = null;
  };
  _proto._checkForPopupClosed = function _checkForPopupClosed() {
    if (!this._popup || this._popup.closed) {
      this._error("Popup window closed");
    }
  };
  _proto._callback = function _callback(url, keepOpen) {
    this._cleanup(keepOpen);
    if (url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("PopupWindow.callback success");
      this._success({
        url: url
      });
    } else {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("PopupWindow.callback: Invalid response from popup");
      this._error("Invalid response from popup");
    }
  };
  PopupWindow.notifyOpener = function notifyOpener(url, keepOpen, delimiter) {
    if (window.opener) {
      url = url || window.location.href;
      if (url) {
        var data = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.parseUrlFragment(url, delimiter);
        if (data.state) {
          var name = "popupCallback_" + data.state;
          var callback = window.opener[name];
          if (callback) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("PopupWindow.notifyOpener: passing url message to opener");
            callback(url, keepOpen);
          } else {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.warn("PopupWindow.notifyOpener: no matching callback found on opener");
          }
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.warn("PopupWindow.notifyOpener: no state found in response url");
        }
      }
    } else {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.warn("PopupWindow.notifyOpener: no window.opener. Can't complete notification.");
    }
  };
  return _createClass(PopupWindow, [{
    key: "promise",
    get: function get() {
      return this._promise;
    }
  }]);
}();

/***/ }),

/***/ "./src/RedirectNavigator.js":
/*!**********************************!*\
  !*** ./src/RedirectNavigator.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RedirectNavigator: function() { return /* binding */ RedirectNavigator; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;
var RedirectNavigator = /*#__PURE__*/function () {
  function RedirectNavigator() {}
  var _proto = RedirectNavigator.prototype;
  _proto.prepare = function prepare() {
    return Promise.resolve(this);
  };
  _proto.navigate = function navigate(params) {
    if (!params || !params.url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("RedirectNavigator.navigate: No url provided");
      return Promise.reject(new Error("No url provided"));
    }
    if (params.useReplaceToNavigate) {
      window.location.replace(params.url);
    } else {
      window.location = params.url;
    }
    return Promise.resolve();
  };
  return _createClass(RedirectNavigator, [{
    key: "url",
    get: function get() {
      return window.location.href;
    }
  }]);
}();

/***/ }),

/***/ "./src/ResponseValidator.js":
/*!**********************************!*\
  !*** ./src/ResponseValidator.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResponseValidator: function() { return /* binding */ ResponseValidator; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _MetadataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");
/* harmony import */ var _UserInfoService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserInfoService.js */ "./src/UserInfoService.js");
/* harmony import */ var _TokenClient_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TokenClient.js */ "./src/TokenClient.js");
/* harmony import */ var _ErrorResponse_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ErrorResponse.js */ "./src/ErrorResponse.js");
/* harmony import */ var _JoseUtil_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./JoseUtil.js */ "./src/JoseUtil.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;






// Keys that must never be copied from server responses onto plain objects
var UnsafeKeys = ["__proto__", "constructor", "prototype"];
var ProtocolClaims = ["nonce", "at_hash", "iat", "nbf", "exp", "aud", "iss", "c_hash"];
var ResponseValidator = /*#__PURE__*/function () {
  function ResponseValidator(settings) {
    var MetadataServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _MetadataService_js__WEBPACK_IMPORTED_MODULE_1__.MetadataService;
    var UserInfoServiceCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _UserInfoService_js__WEBPACK_IMPORTED_MODULE_2__.UserInfoService;
    var joseUtil = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _JoseUtil_js__WEBPACK_IMPORTED_MODULE_5__.JoseUtil;
    var TokenClientCtor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _TokenClient_js__WEBPACK_IMPORTED_MODULE_3__.TokenClient;
    if (!settings) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator.ctor: No settings passed to ResponseValidator");
      throw new Error("settings");
    }
    this._settings = settings;
    this._metadataService = new MetadataServiceCtor(this._settings);
    this._userInfoService = new UserInfoServiceCtor(this._settings);
    this._joseUtil = joseUtil;
    this._tokenClient = new TokenClientCtor(this._settings);
  }
  var _proto = ResponseValidator.prototype;
  _proto.validateSigninResponse = function validateSigninResponse(state, response) {
    var _this = this;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator.validateSigninResponse");
    return this._processSigninParams(state, response).then(function (response) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator.validateSigninResponse: state processed");
      return _this._validateTokens(state, response).then(function (response) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator.validateSigninResponse: tokens validated");
        return _this._processClaims(state, response).then(function (response) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator.validateSigninResponse: claims processed");
          return response;
        });
      });
    });
  };
  _proto.validateSignoutResponse = function validateSignoutResponse(state, response) {
    if (state.id !== response.state) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator.validateSignoutResponse: State does not match");
      return Promise.reject(new Error("State does not match"));
    }

    // now that we know the state matches, take the stored data
    // and set it into the response so callers can get their state
    // this is important for both success & error outcomes
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator.validateSignoutResponse: state validated");
    response.state = state.data;
    if (response.error) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.warn("ResponseValidator.validateSignoutResponse: Response was error", response.error);
      return Promise.reject(new _ErrorResponse_js__WEBPACK_IMPORTED_MODULE_4__.ErrorResponse(response));
    }
    return Promise.resolve(response);
  };
  _proto._processSigninParams = function _processSigninParams(state, response) {
    if (state.id !== response.state) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processSigninParams: State does not match");
      return Promise.reject(new Error("State does not match"));
    }
    if (!state.client_id) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processSigninParams: No client_id on state");
      return Promise.reject(new Error("No client_id on state"));
    }
    if (!state.authority) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processSigninParams: No authority on state");
      return Promise.reject(new Error("No authority on state"));
    }

    // this allows the authority to be loaded from the signin state
    if (!this._settings.authority) {
      this._settings.authority = state.authority;
    }
    // ensure we're using the correct authority if the authority is not loaded from signin state
    else if (this._settings.authority && this._settings.authority !== state.authority) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processSigninParams: authority mismatch on settings vs. signin state");
      return Promise.reject(new Error("authority mismatch on settings vs. signin state"));
    }
    // this allows the client_id to be loaded from the signin state
    if (!this._settings.client_id) {
      this._settings.client_id = state.client_id;
    }
    // ensure we're using the correct client_id if the client_id is not loaded from signin state
    else if (this._settings.client_id && this._settings.client_id !== state.client_id) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processSigninParams: client_id mismatch on settings vs. signin state");
      return Promise.reject(new Error("client_id mismatch on settings vs. signin state"));
    }

    // now that we know the state matches, take the stored data
    // and set it into the response so callers can get their state
    // this is important for both success & error outcomes
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._processSigninParams: state validated");
    response.state = state.data;
    if (response.error) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.warn("ResponseValidator._processSigninParams: Response was error", response.error);
      return Promise.reject(new _ErrorResponse_js__WEBPACK_IMPORTED_MODULE_4__.ErrorResponse(response));
    }
    if (state.nonce && !response.id_token) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processSigninParams: Expecting id_token in response");
      return Promise.reject(new Error("No id_token in response"));
    }
    if (!state.nonce && response.id_token) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processSigninParams: Not expecting id_token in response");
      return Promise.reject(new Error("Unexpected id_token in response"));
    }
    if (state.code_verifier && !response.code) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processSigninParams: Expecting code in response");
      return Promise.reject(new Error("No code in response"));
    }
    if (!state.code_verifier && response.code) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processSigninParams: Not expecting code in response");
      return Promise.reject(new Error("Unexpected code in response"));
    }
    if (!response.scope) {
      // if there's no scope on the response, then assume all scopes granted (per-spec) and copy over scopes from original request
      response.scope = state.scope;
    }
    return Promise.resolve(response);
  };
  _proto._processClaims = function _processClaims(state, response) {
    var _this2 = this;
    if (response.isOpenIdConnect) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._processClaims: response is OIDC, processing claims");
      response.profile = this._filterProtocolClaims(response.profile);
      if (state.skipUserInfo !== true && this._settings.loadUserInfo && response.access_token) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._processClaims: loading user info");
        return this._userInfoService.getClaims(response.access_token).then(function (claims) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._processClaims: user info claims received from user info endpoint");
          if (claims.sub !== response.profile.sub) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._processClaims: sub from user info endpoint does not match sub in id_token");
            return Promise.reject(new Error("sub from user info endpoint does not match sub in id_token"));
          }
          response.profile = _this2._mergeClaims(response.profile, claims);
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._processClaims: user info claims received, updated profile:", response.profile);
          return response;
        });
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._processClaims: not loading user info");
      }
    } else {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._processClaims: response is not OIDC, not processing claims");
    }
    return Promise.resolve(response);
  };
  _proto._mergeClaims = function _mergeClaims(claims1, claims2) {
    var result = Object.assign({}, claims1);
    for (var name in claims2) {
      if (UnsafeKeys.indexOf(name) >= 0) {
        continue;
      }
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
          if (_typeof(value) === 'object' && this._settings.mergeClaims) {
            result[name] = this._mergeClaims(result[name], value);
          } else {
            result[name] = [result[name], value];
          }
        }
      }
    }
    return result;
  };
  _proto._filterProtocolClaims = function _filterProtocolClaims(claims) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._filterProtocolClaims, incoming claims:", claims);
    var result = Object.assign({}, claims);
    if (this._settings._filterProtocolClaims) {
      ProtocolClaims.forEach(function (type) {
        delete result[type];
      });
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims filtered", result);
    } else {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims not filtered");
    }
    return result;
  };
  _proto._validateTokens = function _validateTokens(state, response) {
    if (response.code) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateTokens: Validating code");
      return this._processCode(state, response);
    }
    if (response.id_token) {
      if (response.access_token) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateTokens: Validating id_token and access_token");
        return this._validateIdTokenAndAccessToken(state, response);
      }
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateTokens: Validating id_token");
      return this._validateIdToken(state, response);
    }
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateTokens: No code to process or id_token to validate");
    return Promise.resolve(response);
  };
  _proto._processCode = function _processCode(state, response) {
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
        if (UnsafeKeys.indexOf(key) < 0) {
          response[key] = tokenResponse[key];
        }
      }
      if (response.id_token) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._processCode: token response successful, processing id_token");
        return _this3._validateIdTokenAttributes(state, response);
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._processCode: token response successful, returning response");
      }
      return response;
    });
  };
  _proto._validateIdTokenAttributes = function _validateIdTokenAttributes(state, response) {
    var _this4 = this;
    return this._metadataService.getIssuer().then(function (issuer) {
      var audience = state.client_id;
      var clockSkewInSeconds = _this4._settings.clockSkew;
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateIdTokenAttributes: Validaing JWT attributes; using clock skew (in seconds) of: ", clockSkewInSeconds);
      return _this4._settings.getEpochTime().then(function (now) {
        return _this4._joseUtil.validateJwtAttributes(response.id_token, issuer, audience, clockSkewInSeconds, now).then(function (payload) {
          if (state.nonce && state.nonce !== payload.nonce) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateIdTokenAttributes: Invalid nonce in id_token");
            return Promise.reject(new Error("Invalid nonce in id_token"));
          }
          if (!payload.sub) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateIdTokenAttributes: No sub present in id_token");
            return Promise.reject(new Error("No sub present in id_token"));
          }
          response.profile = payload;
          return response;
        });
      });
    });
  };
  _proto._validateIdTokenAndAccessToken = function _validateIdTokenAndAccessToken(state, response) {
    var _this5 = this;
    return this._validateIdToken(state, response).then(function (response) {
      return _this5._validateAccessToken(response);
    });
  };
  _proto._getSigningKeyForJwt = function _getSigningKeyForJwt(jwt) {
    var _this6 = this;
    return this._metadataService.getSigningKeys().then(function (keys) {
      var kid = jwt.header.kid;
      if (!keys) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateIdToken: No signing keys from metadata");
        return Promise.reject(new Error("No signing keys from metadata"));
      }
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateIdToken: Received signing keys");
      var key;
      if (!kid) {
        keys = _this6._filterByAlg(keys, jwt.header.alg);
        if (keys.length > 1) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateIdToken: No kid found in id_token and more than one key found in metadata");
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
  _proto._getSigningKeyForJwtWithSingleRetry = function _getSigningKeyForJwtWithSingleRetry(jwt) {
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
  _proto._validateIdToken = function _validateIdToken(state, response) {
    var _this8 = this;
    if (!state.nonce) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateIdToken: No nonce on state");
      return Promise.reject(new Error("No nonce on state"));
    }
    var jwt = this._joseUtil.parseJwt(response.id_token);
    if (!jwt || !jwt.header || !jwt.payload) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateIdToken: Failed to parse id_token", jwt);
      return Promise.reject(new Error("Failed to parse id_token"));
    }
    if (state.nonce !== jwt.payload.nonce) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateIdToken: Invalid nonce in id_token");
      return Promise.reject(new Error("Invalid nonce in id_token"));
    }
    return this._metadataService.getIssuer().then(function (issuer) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateIdToken: Received issuer");
      return _this8._getSigningKeyForJwtWithSingleRetry(jwt).then(function (key) {
        if (!key) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateIdToken: No key matching kid or alg found in signing keys");
          return Promise.reject(new Error("No key matching kid or alg found in signing keys"));
        }
        var audience = state.client_id;
        var clockSkewInSeconds = _this8._settings.clockSkew;
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateIdToken: Validaing JWT; using clock skew (in seconds) of: ", clockSkewInSeconds);
        return _this8._joseUtil.validateJwt(response.id_token, key, issuer, audience, clockSkewInSeconds).then(function () {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateIdToken: JWT validation successful");
          if (!jwt.payload.sub) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateIdToken: No sub present in id_token");
            return Promise.reject(new Error("No sub present in id_token"));
          }
          response.profile = jwt.payload;
          return response;
        });
      });
    });
  };
  _proto._filterByAlg = function _filterByAlg(keys, alg) {
    if (!_JoseUtil_js__WEBPACK_IMPORTED_MODULE_5__.JoseUtil.isAllowedSigningAlg(alg)) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._filterByAlg: alg not allowed: ", alg);
      return [];
    }
    var kty = null;
    if (alg.startsWith("RS")) {
      kty = "RSA";
    } else if (alg.startsWith("PS")) {
      kty = "RSA";
    } else if (alg.startsWith("ES")) {
      kty = "EC";
    } else {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._filterByAlg: alg not supported: ", alg);
      return [];
    }
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._filterByAlg: Looking for keys that match kty: ", kty);
    keys = keys.filter(function (key) {
      return key.kty === kty;
    });
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._filterByAlg: Number of keys that match kty: ", kty, keys.length);
    return keys;
  };
  _proto._validateAccessToken = function _validateAccessToken(response) {
    if (!response.profile) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateAccessToken: No profile loaded from id_token");
      return Promise.reject(new Error("No profile loaded from id_token"));
    }
    if (!response.profile.at_hash) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateAccessToken: No at_hash in id_token");
      return Promise.reject(new Error("No at_hash in id_token"));
    }
    if (!response.id_token) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateAccessToken: No id_token");
      return Promise.reject(new Error("No id_token"));
    }
    var jwt = this._joseUtil.parseJwt(response.id_token);
    if (!jwt || !jwt.header) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateAccessToken: Failed to parse id_token", jwt);
      return Promise.reject(new Error("Failed to parse id_token"));
    }
    var hashAlg = jwt.header.alg;
    if (!hashAlg || hashAlg.length !== 5) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg);
      return Promise.reject(new Error("Unsupported alg: " + hashAlg));
    }
    var hashBits = hashAlg.substr(2, 3);
    if (!hashBits) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg, hashBits);
      return Promise.reject(new Error("Unsupported alg: " + hashAlg));
    }
    hashBits = parseInt(hashBits);
    if (hashBits !== 256 && hashBits !== 384 && hashBits !== 512) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg, hashBits);
      return Promise.reject(new Error("Unsupported alg: " + hashAlg));
    }
    var sha = "sha" + hashBits;
    var hash = this._joseUtil.hashString(response.access_token, sha);
    if (!hash) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateAccessToken: access_token hash failed:", sha);
      return Promise.reject(new Error("Failed to validate at_hash"));
    }
    var left = hash.substr(0, hash.length / 2);
    var left_b64u = this._joseUtil.hexToBase64Url(left);
    if (left_b64u !== response.profile.at_hash) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("ResponseValidator._validateAccessToken: Failed to validate at_hash", left_b64u, response.profile.at_hash);
      return Promise.reject(new Error("Failed to validate at_hash"));
    }
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("ResponseValidator._validateAccessToken: success");
    return Promise.resolve(response);
  };
  return ResponseValidator;
}();

/***/ }),

/***/ "./src/SessionMonitor.js":
/*!*******************************!*\
  !*** ./src/SessionMonitor.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionMonitor: function() { return /* binding */ SessionMonitor; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _CheckSessionIFrame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckSessionIFrame.js */ "./src/CheckSessionIFrame.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Global.js */ "./src/Global.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;


var SessionMonitor = /*#__PURE__*/function () {
  function SessionMonitor(userManager) {
    var _this = this;
    var CheckSessionIFrameCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _CheckSessionIFrame_js__WEBPACK_IMPORTED_MODULE_1__.CheckSessionIFrame;
    var timer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Global_js__WEBPACK_IMPORTED_MODULE_2__.Global.timer;
    if (!userManager) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SessionMonitor.ctor: No user manager passed to SessionMonitor");
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
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SessionMonitor ctor: error from querySessionStatus:", err.message);
        });
      }
    }).catch(function (err) {
      // catch to suppress errors since we're in a ctor
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SessionMonitor ctor: error from getUser:", err.message);
    }));
  }
  var _proto = SessionMonitor.prototype;
  _proto._start = function _start(user) {
    var _this2 = this;
    var session_state = user.session_state;
    if (session_state) {
      if (user.profile) {
        this._sub = user.profile.sub;
        this._sid = user.profile.sid;
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._start: session_state:", session_state, ", sub:", this._sub);
      } else {
        this._sub = undefined;
        this._sid = undefined;
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._start: session_state:", session_state, ", anonymous user");
      }
      if (!this._checkSessionIFrame) {
        this._metadataService.getCheckSessionIframe().then(function (url) {
          if (url) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._start: Initializing check session iframe");
            var client_id = _this2._client_id;
            var interval = _this2._checkSessionInterval;
            var stopOnError = _this2._stopCheckSessionOnError;
            _this2._checkSessionIFrame = new _this2._CheckSessionIFrameCtor(_this2._callback.bind(_this2), client_id, url, interval, stopOnError);
            _this2._checkSessionIFrame.load().then(function () {
              _this2._checkSessionIFrame.start(session_state);
            });
          } else {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.warn("SessionMonitor._start: No check session iframe found in the metadata");
          }
        }).catch(function (err) {
          // catch to suppress errors since we're in non-promise callback
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SessionMonitor._start: Error from getCheckSessionIframe:", err.message);
        });
      } else {
        this._checkSessionIFrame.start(session_state);
      }
    }
  };
  _proto._stop = function _stop() {
    var _this3 = this;
    this._sub = undefined;
    this._sid = undefined;
    if (this._checkSessionIFrame) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._stop");
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
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SessionMonitor: error from querySessionStatus:", err.message);
        });
      }, 1000);
    }
  };
  _proto._callback = function _callback() {
    var _this4 = this;
    this._userManager.querySessionStatus().then(function (session) {
      var raiseEvent = true;
      if (session) {
        if (session.sub === _this4._sub) {
          raiseEvent = false;
          _this4._checkSessionIFrame.start(session.session_state);
          if (session.sid === _this4._sid) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, restarting check session iframe; session_state:", session.session_state);
          } else {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:", session.session_state);
            _this4._userManager.events._raiseUserSessionChanged();
          }
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._callback: Different subject signed into OP:", session.sub);
        }
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._callback: Subject no longer signed into OP");
      }
      if (raiseEvent) {
        if (_this4._sub) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed out event");
          _this4._userManager.events._raiseUserSignedOut();
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed in event");
          _this4._userManager.events._raiseUserSignedIn();
        }
      }
    }).catch(function (err) {
      if (_this4._sub) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SessionMonitor._callback: Error calling queryCurrentSigninSession; raising signed out event", err.message);
        _this4._userManager.events._raiseUserSignedOut();
      }
    });
  };
  return _createClass(SessionMonitor, [{
    key: "_settings",
    get: function get() {
      return this._userManager.settings;
    }
  }, {
    key: "_metadataService",
    get: function get() {
      return this._userManager.metadataService;
    }
  }, {
    key: "_client_id",
    get: function get() {
      return this._settings.client_id;
    }
  }, {
    key: "_checkSessionInterval",
    get: function get() {
      return this._settings.checkSessionInterval;
    }
  }, {
    key: "_stopCheckSessionOnError",
    get: function get() {
      return this._settings.stopCheckSessionOnError;
    }
  }]);
}();

/***/ }),

/***/ "./src/SigninRequest.js":
/*!******************************!*\
  !*** ./src/SigninRequest.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SigninRequest: function() { return /* binding */ SigninRequest; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");
/* harmony import */ var _SigninState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SigninState.js */ "./src/SigninState.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.




var SigninRequest = /*#__PURE__*/function () {
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
    if (!url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SigninRequest.ctor: No url passed");
      throw new Error("url");
    }
    if (!client_id) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SigninRequest.ctor: No client_id passed");
      throw new Error("client_id");
    }
    if (!redirect_uri) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SigninRequest.ctor: No redirect_uri passed");
      throw new Error("redirect_uri");
    }
    if (!response_type) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SigninRequest.ctor: No response_type passed");
      throw new Error("response_type");
    }
    if (!scope) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SigninRequest.ctor: No scope passed");
      throw new Error("scope");
    }
    if (!authority) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SigninRequest.ctor: No authority passed");
      throw new Error("authority");
    }
    var oidc = SigninRequest.isOidc(response_type);
    var code = SigninRequest.isCode(response_type);
    if (!response_mode) {
      response_mode = SigninRequest.isCode(response_type) ? "query" : null;
    }
    this.state = new _SigninState_js__WEBPACK_IMPORTED_MODULE_2__.SigninState({
      nonce: oidc,
      data: data,
      client_id: client_id,
      authority: authority,
      redirect_uri: redirect_uri,
      code_verifier: code,
      request_type: request_type,
      response_mode: response_mode,
      client_secret: client_secret,
      scope: scope,
      extraTokenParams: extraTokenParams,
      skipUserInfo: skipUserInfo
    });
    url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "client_id", client_id);
    url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "redirect_uri", redirect_uri);
    url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "response_type", response_type);
    url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "scope", scope);
    url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "state", this.state.id);
    if (oidc) {
      url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "nonce", this.state.nonce);
    }
    if (code) {
      url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "code_challenge", this.state.code_challenge);
      url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "code_challenge_method", "S256");
    }
    var optional = {
      prompt: prompt,
      display: display,
      max_age: max_age,
      ui_locales: ui_locales,
      id_token_hint: id_token_hint,
      login_hint: login_hint,
      acr_values: acr_values,
      resource: resource,
      request: request,
      request_uri: request_uri,
      response_mode: response_mode
    };
    for (var key in optional) {
      if (optional[key]) {
        url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, key, optional[key]);
      }
    }
    for (var _key in extraQueryParams) {
      url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, _key, extraQueryParams[_key]);
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SigninResponse: function() { return /* binding */ SigninResponse; }
/* harmony export */ });
/* harmony import */ var _UrlUtility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;
var OidcScope = "openid";
var SigninResponse = /*#__PURE__*/function () {
  function SigninResponse(url) {
    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#";
    var values = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_0__.UrlUtility.parseUrlFragment(url, delimiter);
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
  return _createClass(SigninResponse, [{
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
}();

/***/ }),

/***/ "./src/SigninState.js":
/*!****************************!*\
  !*** ./src/SigninState.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SigninState: function() { return /* binding */ SigninState; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _State_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./State.js */ "./src/State.js");
/* harmony import */ var _JoseUtil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JoseUtil.js */ "./src/JoseUtil.js");
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./random.js */ "./src/random.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;



var SigninState = /*#__PURE__*/function (_State) {
  function SigninState() {
    var _this;
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
    _this = _State.call(this, arguments[0]) || this;
    if (nonce === true) {
      _this._nonce = (0,_random_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
    } else if (nonce) {
      _this._nonce = nonce;
    }
    if (code_verifier === true) {
      // random() produces 32 length
      _this._code_verifier = (0,_random_js__WEBPACK_IMPORTED_MODULE_3__["default"])() + (0,_random_js__WEBPACK_IMPORTED_MODULE_3__["default"])() + (0,_random_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
    } else if (code_verifier) {
      _this._code_verifier = code_verifier;
    }
    if (_this.code_verifier) {
      var hash = _JoseUtil_js__WEBPACK_IMPORTED_MODULE_2__.JoseUtil.hashString(_this.code_verifier, "SHA256");
      _this._code_challenge = _JoseUtil_js__WEBPACK_IMPORTED_MODULE_2__.JoseUtil.hexToBase64Url(hash);
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
  _inheritsLoose(SigninState, _State);
  var _proto = SigninState.prototype;
  _proto.toStorageString = function toStorageString() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SigninState.toStorageString");
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
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SigninState.fromStorageString");
    var data = JSON.parse(storageString);
    return new SigninState(data);
  };
  return _createClass(SigninState, [{
    key: "nonce",
    get: function get() {
      return this._nonce;
    }
  }, {
    key: "authority",
    get: function get() {
      return this._authority;
    }
  }, {
    key: "client_id",
    get: function get() {
      return this._client_id;
    }
  }, {
    key: "redirect_uri",
    get: function get() {
      return this._redirect_uri;
    }
  }, {
    key: "code_verifier",
    get: function get() {
      return this._code_verifier;
    }
  }, {
    key: "code_challenge",
    get: function get() {
      return this._code_challenge;
    }
  }, {
    key: "response_mode",
    get: function get() {
      return this._response_mode;
    }
  }, {
    key: "client_secret",
    get: function get() {
      return this._client_secret;
    }
  }, {
    key: "scope",
    get: function get() {
      return this._scope;
    }
  }, {
    key: "extraTokenParams",
    get: function get() {
      return this._extraTokenParams;
    }
  }, {
    key: "skipUserInfo",
    get: function get() {
      return this._skipUserInfo;
    }
  }]);
}(_State_js__WEBPACK_IMPORTED_MODULE_1__.State);

/***/ }),

/***/ "./src/SignoutRequest.js":
/*!*******************************!*\
  !*** ./src/SignoutRequest.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignoutRequest: function() { return /* binding */ SignoutRequest; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");
/* harmony import */ var _State_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./State.js */ "./src/State.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.




var SignoutRequest = function SignoutRequest(_ref) {
  var url = _ref.url,
    id_token_hint = _ref.id_token_hint,
    post_logout_redirect_uri = _ref.post_logout_redirect_uri,
    data = _ref.data,
    extraQueryParams = _ref.extraQueryParams,
    request_type = _ref.request_type;
  if (!url) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SignoutRequest.ctor: No url passed");
    throw new Error("url");
  }
  if (id_token_hint) {
    url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "id_token_hint", id_token_hint);
  }
  if (post_logout_redirect_uri) {
    url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "post_logout_redirect_uri", post_logout_redirect_uri);
    if (data) {
      this.state = new _State_js__WEBPACK_IMPORTED_MODULE_2__.State({
        data: data,
        request_type: request_type
      });
      url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, "state", this.state.id);
    }
  }
  for (var key in extraQueryParams) {
    url = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_1__.UrlUtility.addQueryParam(url, key, extraQueryParams[key]);
  }
  this.url = url;
};

/***/ }),

/***/ "./src/SignoutResponse.js":
/*!********************************!*\
  !*** ./src/SignoutResponse.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignoutResponse: function() { return /* binding */ SignoutResponse; }
/* harmony export */ });
/* harmony import */ var _UrlUtility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UrlUtility.js */ "./src/UrlUtility.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


var SignoutResponse = function SignoutResponse(url) {
  var values = _UrlUtility_js__WEBPACK_IMPORTED_MODULE_0__.UrlUtility.parseUrlFragment(url, "?");
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SilentRenewService: function() { return /* binding */ SilentRenewService; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


var SilentRenewService = /*#__PURE__*/function () {
  function SilentRenewService(userManager) {
    this._userManager = userManager;
  }
  var _proto = SilentRenewService.prototype;
  _proto.start = function start() {
    if (!this._callback) {
      this._callback = this._tokenExpiring.bind(this);
      this._userManager.events.addAccessTokenExpiring(this._callback);

      // this will trigger loading of the user so the expiring events can be initialized
      this._userManager.getUser().then(function (user) {
        // deliberate nop
      }).catch(function (err) {
        // catch to suppress errors since we're in a ctor
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SilentRenewService.start: Error from getUser:", err.message);
      });
    }
  };
  _proto.stop = function stop() {
    if (this._callback) {
      this._userManager.events.removeAccessTokenExpiring(this._callback);
      delete this._callback;
    }
  };
  _proto._tokenExpiring = function _tokenExpiring() {
    var _this = this;
    this._userManager.signinSilent().then(function (user) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("SilentRenewService._tokenExpiring: Silent token renewal successful");
    }, function (err) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("SilentRenewService._tokenExpiring: Error from signinSilent:", err.message);
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   State: function() { return /* binding */ State; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./random.js */ "./src/random.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;

var State = /*#__PURE__*/function () {
  function State() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id = _ref.id,
      data = _ref.data,
      created = _ref.created,
      request_type = _ref.request_type;
    this._id = id || (0,_random_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    this._data = data;
    if (typeof created === 'number' && created > 0) {
      this._created = created;
    } else {
      this._created = parseInt(Date.now() / 1000);
    }
    this._request_type = request_type;
  }
  var _proto = State.prototype;
  _proto.toStorageString = function toStorageString() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("State.toStorageString");
    return JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type
    });
  };
  State.fromStorageString = function fromStorageString(storageString) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("State.fromStorageString");
    return new State(JSON.parse(storageString));
  };
  State.clearStaleState = function clearStaleState(storage, age) {
    var cutoff = Date.now() / 1000 - age;
    return storage.getAllKeys().then(function (keys) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("State.clearStaleState: got keys", keys);
      var promises = [];
      var _loop = function _loop() {
          var key = keys[i];
          p = storage.get(key).then(function (item) {
            var remove = false;
            if (item) {
              try {
                var state = State.fromStorageString(item);
                _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("State.clearStaleState: got item from key: ", key, state.created);
                if (state.created <= cutoff) {
                  remove = true;
                }
              } catch (e) {
                _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("State.clearStaleState: Error parsing state for key", key, e.message);
                remove = true;
              }
            } else {
              _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("State.clearStaleState: no item in storage for key: ", key);
              remove = true;
            }
            if (remove) {
              _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("State.clearStaleState: removed item for key: ", key);
              return storage.remove(key);
            }
          });
          promises.push(p);
        },
        p;
      for (var i = 0; i < keys.length; i++) {
        _loop();
      }
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("State.clearStaleState: waiting on promise count:", promises.length);
      return Promise.all(promises);
    });
  };
  return _createClass(State, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }, {
    key: "created",
    get: function get() {
      return this._created;
    }
  }, {
    key: "request_type",
    get: function get() {
      return this._request_type;
    }
  }]);
}();

/***/ }),

/***/ "./src/Timer.js":
/*!**********************!*\
  !*** ./src/Timer.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Timer: function() { return /* binding */ Timer; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Global.js */ "./src/Global.js");
/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Event.js */ "./src/Event.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;


var TimerDuration = 5; // seconds

var Timer = /*#__PURE__*/function (_Event) {
  function Timer(name) {
    var _this;
    var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Global_js__WEBPACK_IMPORTED_MODULE_1__.Global.timer;
    var nowFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    _this = _Event.call(this, name) || this;
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
  _inheritsLoose(Timer, _Event);
  var _proto = Timer.prototype;
  _proto.init = function init(duration) {
    if (duration <= 0) {
      duration = 1;
    }
    duration = parseInt(duration);
    var expiration = this.now + duration;
    if (this.expiration === expiration && this._timerHandle) {
      // no need to reinitialize to same expiration, so bail out
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("Timer.init timer " + this._name + " skipping initialization since already initialized for expiration:", this.expiration);
      return;
    }
    this.cancel();
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("Timer.init timer " + this._name + " for duration:", duration);
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
  _proto.cancel = function cancel() {
    if (this._timerHandle) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("Timer.cancel: ", this._name);
      this._timer.clearInterval(this._timerHandle);
      this._timerHandle = null;
    }
  };
  _proto._callback = function _callback() {
    var diff = this._expiration - this.now;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("Timer.callback; " + this._name + " timer expires in:", diff);
    if (this._expiration <= this.now) {
      this.cancel();
      _Event.prototype.raise.call(this);
    }
  };
  return _createClass(Timer, [{
    key: "now",
    get: function get() {
      return parseInt(this._nowFunc());
    }
  }, {
    key: "expiration",
    get: function get() {
      return this._expiration;
    }
  }]);
}(_Event_js__WEBPACK_IMPORTED_MODULE_2__.Event);

/***/ }),

/***/ "./src/TokenClient.js":
/*!****************************!*\
  !*** ./src/TokenClient.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenClient: function() { return /* binding */ TokenClient; }
/* harmony export */ });
/* harmony import */ var _JsonService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JsonService.js */ "./src/JsonService.js");
/* harmony import */ var _MetadataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.




var TokenClient = /*#__PURE__*/function () {
  function TokenClient(settings) {
    var JsonServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _JsonService_js__WEBPACK_IMPORTED_MODULE_0__.JsonService;
    var MetadataServiceCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MetadataService_js__WEBPACK_IMPORTED_MODULE_1__.MetadataService;
    if (!settings) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("TokenClient.ctor: No settings passed");
      throw new Error("settings");
    }
    this._settings = settings;
    this._jsonService = new JsonServiceCtor();
    this._metadataService = new MetadataServiceCtor(this._settings);
  }
  var _proto = TokenClient.prototype;
  _proto.exchangeCode = function exchangeCode() {
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
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("TokenClient.exchangeCode: No code passed");
      return Promise.reject(new Error("A code is required"));
    }
    if (!args.redirect_uri) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("TokenClient.exchangeCode: No redirect_uri passed");
      return Promise.reject(new Error("A redirect_uri is required"));
    }
    if (!args.code_verifier) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("TokenClient.exchangeCode: No code_verifier passed");
      return Promise.reject(new Error("A code_verifier is required"));
    }
    if (!args.client_id) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("TokenClient.exchangeCode: No client_id passed");
      return Promise.reject(new Error("A client_id is required"));
    }
    if (!args.client_secret && client_authentication == "client_secret_basic") {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("TokenClient.exchangeCode: No client_secret passed");
      return Promise.reject(new Error("A client_secret is required"));
    }

    // Sending the client credentials using the Basic Auth method
    if (client_authentication == "client_secret_basic") {
      basicAuth = args.client_id + ':' + args.client_secret;
      delete args.client_id;
      delete args.client_secret;
    }
    return this._metadataService.getTokenEndpoint(false).then(function (url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("TokenClient.exchangeCode: Received token endpoint");
      return _this._jsonService.postForm(url, args, basicAuth).then(function (response) {
        _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("TokenClient.exchangeCode: response received");
        return response;
      });
    });
  };
  _proto.exchangeRefreshToken = function exchangeRefreshToken() {
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
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("TokenClient.exchangeRefreshToken: No refresh_token passed");
      return Promise.reject(new Error("A refresh_token is required"));
    }
    if (!args.client_id) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("TokenClient.exchangeRefreshToken: No client_id passed");
      return Promise.reject(new Error("A client_id is required"));
    }

    // Sending the client credentials using the Basic Auth method
    if (client_authentication == "client_secret_basic") {
      basicAuth = args.client_id + ':' + args.client_secret;
      delete args.client_id;
      delete args.client_secret;
    }
    return this._metadataService.getTokenEndpoint(false).then(function (url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("TokenClient.exchangeRefreshToken: Received token endpoint");
      return _this2._jsonService.postForm(url, args, basicAuth).then(function (response) {
        _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("TokenClient.exchangeRefreshToken: response received");
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenRevocationClient: function() { return /* binding */ TokenRevocationClient; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _MetadataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Global.js */ "./src/Global.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.




var AccessTokenTypeHint = "access_token";
var RefreshTokenTypeHint = "refresh_token";
var TokenRevocationClient = /*#__PURE__*/function () {
  function TokenRevocationClient(settings) {
    var XMLHttpRequestCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Global_js__WEBPACK_IMPORTED_MODULE_2__.Global.XMLHttpRequest;
    var MetadataServiceCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MetadataService_js__WEBPACK_IMPORTED_MODULE_1__.MetadataService;
    if (!settings) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("TokenRevocationClient.ctor: No settings provided");
      throw new Error("No settings provided.");
    }
    this._settings = settings;
    this._XMLHttpRequestCtor = XMLHttpRequestCtor;
    this._metadataService = new MetadataServiceCtor(this._settings);
  }
  var _proto = TokenRevocationClient.prototype;
  _proto.revoke = function revoke(token, required) {
    var _this = this;
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "access_token";
    if (!token) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("TokenRevocationClient.revoke: No token provided");
      throw new Error("No token provided.");
    }
    if (type !== AccessTokenTypeHint && type != RefreshTokenTypeHint) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("TokenRevocationClient.revoke: Invalid token type");
      throw new Error("Invalid token type.");
    }
    return this._metadataService.getRevocationEndpoint().then(function (url) {
      if (!url) {
        if (required) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("TokenRevocationClient.revoke: Revocation not supported");
          throw new Error("Revocation not supported");
        }

        // not required, so don't error and just return
        return;
      }
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("TokenRevocationClient.revoke: Revoking " + type);
      var client_id = _this._settings.client_id;
      var client_secret = _this._settings.client_secret;
      return _this._revoke(url, client_id, client_secret, token, type);
    });
  };
  _proto._revoke = function _revoke(url, client_id, client_secret, token, type) {
    var _this2 = this;
    return new Promise(function (resolve, reject) {
      var xhr = new _this2._XMLHttpRequestCtor();
      xhr.open("POST", url);
      xhr.onload = function () {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("TokenRevocationClient.revoke: HTTP response received, status", xhr.status);
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(Error(xhr.statusText + " (" + xhr.status + ")"));
        }
      };
      xhr.onerror = function () {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("TokenRevocationClient.revoke: Network Error.");
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UrlUtility: function() { return /* binding */ UrlUtility; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Global.js */ "./src/Global.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.



var UrlUtility = /*#__PURE__*/function () {
  function UrlUtility() {}
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
    var global = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Global_js__WEBPACK_IMPORTED_MODULE_1__.Global;
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
      var key, val;
      try {
        key = decodeURIComponent(m[1]);
        val = decodeURIComponent(m[2].replace(/\+/g, ' '));
      } catch (e) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UrlUtility.parseUrlFragment: response contains malformed URL encoding", value);
        return {
          error: "Response contains malformed URL encoding"
        };
      }
      // never let a response URL write to the object prototype
      if (key !== "__proto__" && key !== "constructor" && key !== "prototype") {
        params[key] = val;
      }
      if (counter++ > 50) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UrlUtility.parseUrlFragment: response exceeded expected number of parameters", value);
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   User: function() { return /* binding */ User; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;
var User = /*#__PURE__*/function () {
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
  var _proto = User.prototype;
  _proto.toStorageString = function toStorageString() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("User.toStorageString");
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
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("User.fromStorageString");
    return new User(JSON.parse(storageString));
  };
  return _createClass(User, [{
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
  }]);
}();

/***/ }),

/***/ "./src/UserInfoService.js":
/*!********************************!*\
  !*** ./src/UserInfoService.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserInfoService: function() { return /* binding */ UserInfoService; }
/* harmony export */ });
/* harmony import */ var _JsonService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JsonService.js */ "./src/JsonService.js");
/* harmony import */ var _MetadataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetadataService.js */ "./src/MetadataService.js");
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _JoseUtil_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JoseUtil.js */ "./src/JoseUtil.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.





var UserInfoService = /*#__PURE__*/function () {
  function UserInfoService(settings) {
    var JsonServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _JsonService_js__WEBPACK_IMPORTED_MODULE_0__.JsonService;
    var MetadataServiceCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MetadataService_js__WEBPACK_IMPORTED_MODULE_1__.MetadataService;
    var joseUtil = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _JoseUtil_js__WEBPACK_IMPORTED_MODULE_3__.JoseUtil;
    if (!settings) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("UserInfoService.ctor: No settings passed");
      throw new Error("settings");
    }
    this._settings = settings;
    this._jsonService = new JsonServiceCtor(undefined, undefined, this._getClaimsFromJwt.bind(this));
    this._metadataService = new MetadataServiceCtor(this._settings);
    this._joseUtil = joseUtil;
  }
  var _proto = UserInfoService.prototype;
  _proto.getClaims = function getClaims(token) {
    var _this = this;
    if (!token) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("UserInfoService.getClaims: No token passed");
      return Promise.reject(new Error("A token is required"));
    }
    return this._metadataService.getUserInfoEndpoint().then(function (url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("UserInfoService.getClaims: received userinfo url", url);
      return _this._jsonService.getJson(url, token).then(function (claims) {
        _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("UserInfoService.getClaims: claims received", claims);
        return claims;
      });
    });
  };
  _proto._getClaimsFromJwt = function _getClaimsFromJwt(req) {
    var _this2 = this;
    try {
      var jwt = this._joseUtil.parseJwt(req.responseText);
      if (!jwt || !jwt.header || !jwt.payload) {
        _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("UserInfoService._getClaimsFromJwt: Failed to parse JWT", jwt);
        return Promise.reject(new Error("Failed to parse id_token"));
      }
      var kid = jwt.header.kid;
      var issuerPromise;
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
        _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("UserInfoService._getClaimsFromJwt: Received issuer:" + issuer);
        return _this2._metadataService.getSigningKeys().then(function (keys) {
          if (!keys) {
            _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("UserInfoService._getClaimsFromJwt: No signing keys from metadata");
            return Promise.reject(new Error("No signing keys from metadata"));
          }
          _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("UserInfoService._getClaimsFromJwt: Received signing keys");
          var key;
          if (!kid) {
            keys = _this2._filterByAlg(keys, jwt.header.alg);
            if (keys.length > 1) {
              _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("UserInfoService._getClaimsFromJwt: No kid found in id_token and more than one key found in metadata");
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
            _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("UserInfoService._getClaimsFromJwt: No key matching kid or alg found in signing keys");
            return Promise.reject(new Error("No key matching kid or alg found in signing keys"));
          }
          var audience = _this2._settings.client_id;
          var clockSkewInSeconds = _this2._settings.clockSkew;
          _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("UserInfoService._getClaimsFromJwt: Validaing JWT; using clock skew (in seconds) of: ", clockSkewInSeconds);
          return _this2._joseUtil.validateJwt(req.responseText, key, issuer, audience, clockSkewInSeconds, undefined, true).then(function () {
            _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("UserInfoService._getClaimsFromJwt: JWT validation successful");
            return jwt.payload;
          });
        });
      });
      // removed by dead control flow

    } catch (e) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("UserInfoService._getClaimsFromJwt: Error parsing JWT response", e.message);
      reject(e);
      return;
    }
  };
  _proto._filterByAlg = function _filterByAlg(keys, alg) {
    if (!_JoseUtil_js__WEBPACK_IMPORTED_MODULE_3__.JoseUtil.isAllowedSigningAlg(alg)) {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.error("UserInfoService._filterByAlg: alg not allowed: ", alg);
      return [];
    }
    var kty = null;
    if (alg.startsWith("RS")) {
      kty = "RSA";
    } else if (alg.startsWith("PS")) {
      // RSA-PSS keys are kty "RSA" (RFC 7518)
      kty = "RSA";
    } else if (alg.startsWith("ES")) {
      kty = "EC";
    } else {
      _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("UserInfoService._filterByAlg: alg not supported: ", alg);
      return [];
    }
    _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("UserInfoService._filterByAlg: Looking for keys that match kty: ", kty);
    keys = keys.filter(function (key) {
      return key.kty === kty;
    });
    _Log_js__WEBPACK_IMPORTED_MODULE_2__.Log.debug("UserInfoService._filterByAlg: Number of keys that match kty: ", kty, keys.length);
    return keys;
  };
  return UserInfoService;
}();

/***/ }),

/***/ "./src/UserManager.js":
/*!****************************!*\
  !*** ./src/UserManager.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserManager: function() { return /* binding */ UserManager; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _OidcClient_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OidcClient.js */ "./src/OidcClient.js");
/* harmony import */ var _UserManagerSettings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserManagerSettings.js */ "./src/UserManagerSettings.js");
/* harmony import */ var _User_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./User.js */ "./src/User.js");
/* harmony import */ var _UserManagerEvents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserManagerEvents.js */ "./src/UserManagerEvents.js");
/* harmony import */ var _SilentRenewService_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SilentRenewService.js */ "./src/SilentRenewService.js");
/* harmony import */ var _SessionMonitor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SessionMonitor.js */ "./src/SessionMonitor.js");
/* harmony import */ var _SigninRequest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SigninRequest */ "./src/SigninRequest.js");
/* harmony import */ var _TokenRevocationClient_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TokenRevocationClient.js */ "./src/TokenRevocationClient.js");
/* harmony import */ var _TokenClient_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TokenClient.js */ "./src/TokenClient.js");
/* harmony import */ var _JoseUtil_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./JoseUtil.js */ "./src/JoseUtil.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;










var UserManager = /*#__PURE__*/function (_OidcClient) {
  function UserManager() {
    var _this;
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var SilentRenewServiceCtor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _SilentRenewService_js__WEBPACK_IMPORTED_MODULE_5__.SilentRenewService;
    var SessionMonitorCtor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _SessionMonitor_js__WEBPACK_IMPORTED_MODULE_6__.SessionMonitor;
    var TokenRevocationClientCtor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _TokenRevocationClient_js__WEBPACK_IMPORTED_MODULE_8__.TokenRevocationClient;
    var TokenClientCtor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _TokenClient_js__WEBPACK_IMPORTED_MODULE_9__.TokenClient;
    var joseUtil = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _JoseUtil_js__WEBPACK_IMPORTED_MODULE_10__.JoseUtil;
    if (!(settings instanceof _UserManagerSettings_js__WEBPACK_IMPORTED_MODULE_2__.UserManagerSettings)) {
      settings = new _UserManagerSettings_js__WEBPACK_IMPORTED_MODULE_2__.UserManagerSettings(settings);
    }
    _this = _OidcClient.call(this, settings) || this;
    _this._events = new _UserManagerEvents_js__WEBPACK_IMPORTED_MODULE_4__.UserManagerEvents(settings);
    _this._silentRenewService = new SilentRenewServiceCtor(_this);

    // order is important for the following properties; these services depend upon the events.
    if (_this.settings.automaticSilentRenew) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager.ctor: automaticSilentRenew is configured, setting up silent renew");
      _this.startSilentRenew();
    }
    if (_this.settings.monitorSession) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager.ctor: monitorSession is configured, setting up session monitor");
      _this._sessionMonitor = new SessionMonitorCtor(_this);
    }
    _this._tokenRevocationClient = new TokenRevocationClientCtor(_this._settings);
    _this._tokenClient = new TokenClientCtor(_this._settings);
    _this._joseUtil = joseUtil;
    return _this;
  }
  _inheritsLoose(UserManager, _OidcClient);
  var _proto = UserManager.prototype;
  _proto.getUser = function getUser() {
    var _this2 = this;
    return this._loadUser().then(function (user) {
      if (user) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.getUser: user loaded");
        _this2._events.load(user, false);
        return user;
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.getUser: user not found in storage");
        return null;
      }
    });
  };
  _proto.removeUser = function removeUser() {
    var _this3 = this;
    return this.storeUser(null).then(function () {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.removeUser: user removed from storage");
      _this3._events.unload();
    });
  };
  _proto.signinRedirect = function signinRedirect() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    args = Object.assign({}, args);
    args.request_type = "si:r";
    var navParams = {
      useReplaceToNavigate: args.useReplaceToNavigate
    };
    return this._signinStart(args, this._redirectNavigator, navParams).then(function () {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinRedirect: successful");
    });
  };
  _proto.signinRedirectCallback = function signinRedirectCallback(url) {
    return this._signinEnd(url || this._redirectNavigator.url).then(function (user) {
      if (user.profile && user.profile.sub) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinRedirectCallback: successful, signed in sub: ", user.profile.sub);
      } else {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinRedirectCallback: no sub");
      }
      return user;
    });
  };
  _proto.signinPopup = function signinPopup() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    args = Object.assign({}, args);
    args.request_type = "si:p";
    var url = args.redirect_uri || this.settings.popup_redirect_uri || this.settings.redirect_uri;
    if (!url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager.signinPopup: No popup_redirect_uri or redirect_uri configured");
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
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinPopup: signinPopup successful, signed in sub: ", user.profile.sub);
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinPopup: no sub");
        }
      }
      return user;
    });
  };
  _proto.signinPopupCallback = function signinPopupCallback(url) {
    return this._signinCallback(url, this._popupNavigator).then(function (user) {
      if (user) {
        if (user.profile && user.profile.sub) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinPopupCallback: successful, signed in sub: ", user.profile.sub);
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinPopupCallback: no sub");
        }
      }
      return user;
    }).catch(function (err) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager.signinPopupCallback error: " + err && err.message);
    });
  };
  _proto.signinSilent = function signinSilent() {
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
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager.signinSilent, subject prior to silent renew: ", user.profile.sub);
          args.current_sub = user.profile.sub;
        }
        return _this4._signinSilentIframe(args);
      }
    });
  };
  _proto._useRefreshToken = function _useRefreshToken() {
    var _this5 = this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this._tokenClient.exchangeRefreshToken(args).then(function (result) {
      if (!result) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager._useRefreshToken: No response returned from token endpoint");
        return Promise.reject("No response returned from token endpoint");
      }
      if (!result.access_token) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager._useRefreshToken: No access token returned from token endpoint");
        return Promise.reject("No access token returned from token endpoint");
      }
      return _this5._loadUser().then(function (user) {
        if (user) {
          var idTokenValidation = Promise.resolve();
          if (result.id_token) {
            idTokenValidation = _this5._validateIdTokenFromTokenRefreshToken(user.profile, result.id_token);
          }
          return idTokenValidation.then(function () {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._useRefreshToken: refresh token response success");
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
  _proto._validateIdTokenFromTokenRefreshToken = function _validateIdTokenFromTokenRefreshToken(profile, id_token) {
    var _this6 = this;
    return this._metadataService.getIssuer().then(function (issuer) {
      return _this6.settings.getEpochTime().then(function (now) {
        return _this6._joseUtil.validateJwtAttributes(id_token, issuer, _this6._settings.client_id, _this6._settings.clockSkew, now).then(function (payload) {
          if (!payload) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: Failed to validate id_token");
            return Promise.reject(new Error("Failed to validate id_token"));
          }
          if (payload.sub !== profile.sub) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: sub in id_token does not match current sub");
            return Promise.reject(new Error("sub in id_token does not match current sub"));
          }
          if (payload.auth_time && payload.auth_time !== profile.auth_time) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: auth_time in id_token does not match original auth_time");
            return Promise.reject(new Error("auth_time in id_token does not match original auth_time"));
          }
          if (payload.azp && payload.azp !== profile.azp) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp in id_token does not match original azp");
            return Promise.reject(new Error("azp in id_token does not match original azp"));
          }
          if (!payload.azp && profile.azp) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp not in id_token, but present in original id_token");
            return Promise.reject(new Error("azp not in id_token, but present in original id_token"));
          }
        });
      });
    });
  };
  _proto._signinSilentIframe = function _signinSilentIframe() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var url = args.redirect_uri || this.settings.silent_redirect_uri || this.settings.redirect_uri;
    if (!url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager.signinSilent: No silent_redirect_uri configured");
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
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinSilent: successful, signed in sub: ", user.profile.sub);
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinSilent: no sub");
        }
      }
      return user;
    });
  };
  _proto.signinSilentCallback = function signinSilentCallback(url) {
    return this._signinCallback(url, this._iframeNavigator).then(function (user) {
      if (user) {
        if (user.profile && user.profile.sub) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinSilentCallback: successful, signed in sub: ", user.profile.sub);
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signinSilentCallback: no sub");
        }
      }
      return user;
    });
  };
  _proto.signinCallback = function signinCallback(url) {
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
  _proto.signoutCallback = function signoutCallback(url, keepOpen) {
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
  _proto.querySessionStatus = function querySessionStatus() {
    var _this9 = this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    args = Object.assign({}, args);
    args.request_type = "si:s"; // this acts like a signin silent
    var url = args.redirect_uri || this.settings.silent_redirect_uri || this.settings.redirect_uri;
    if (!url) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.error("UserManager.querySessionStatus: No silent_redirect_uri configured");
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
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager.querySessionStatus: got signin response");
        if (signinResponse.session_state && signinResponse.profile.sub) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.querySessionStatus: querySessionStatus success for sub: ", signinResponse.profile.sub);
          return {
            session_state: signinResponse.session_state,
            sub: signinResponse.profile.sub,
            sid: signinResponse.profile.sid
          };
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("querySessionStatus successful, user not authenticated");
        }
      }).catch(function (err) {
        if (err.session_state && _this9.settings.monitorAnonymousSession) {
          if (err.message == "login_required" || err.message == "consent_required" || err.message == "interaction_required" || err.message == "account_selection_required") {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.querySessionStatus: querySessionStatus success for anonymous user");
            return {
              session_state: err.session_state
            };
          }
        }
        throw err;
      });
    });
  };
  _proto._signin = function _signin(args, navigator) {
    var _this0 = this;
    var navigatorParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return this._signinStart(args, navigator, navigatorParams).then(function (navResponse) {
      return _this0._signinEnd(navResponse.url, args);
    });
  };
  _proto._signinStart = function _signinStart(args, navigator) {
    var _this1 = this;
    var navigatorParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return navigator.prepare(navigatorParams).then(function (handle) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signinStart: got navigator window handle");
      return _this1.createSigninRequest(args).then(function (signinRequest) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signinStart: got signin request");
        navigatorParams.url = signinRequest.url;
        navigatorParams.id = signinRequest.state.id;
        return handle.navigate(navigatorParams);
      }).catch(function (err) {
        if (handle.close) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signinStart: Error after preparing navigator, closing navigator window");
          handle.close();
        }
        throw err;
      });
    });
  };
  _proto._signinEnd = function _signinEnd(url) {
    var _this10 = this;
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.processSigninResponse(url).then(function (signinResponse) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signinEnd: got signin response");
      var user = new _User_js__WEBPACK_IMPORTED_MODULE_3__.User(signinResponse);
      if (args.current_sub) {
        if (args.current_sub !== user.profile.sub) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signinEnd: current user does not match user returned from signin. sub from signin: ", user.profile.sub);
          return Promise.reject(new Error("login_required"));
        } else {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signinEnd: current user matches user returned from signin");
        }
      }
      return _this10.storeUser(user).then(function () {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signinEnd: user stored");
        _this10._events.load(user);
        return user;
      });
    });
  };
  _proto._signinCallback = function _signinCallback(url, navigator) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signinCallback");
    var useQuery = this._settings.response_mode === "query" || !this._settings.response_mode && _SigninRequest__WEBPACK_IMPORTED_MODULE_7__.SigninRequest.isCode(this._settings.response_type);
    var delimiter = useQuery ? "?" : "#";
    return navigator.callback(url, undefined, delimiter);
  };
  _proto.signoutRedirect = function signoutRedirect() {
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
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signoutRedirect: successful");
    });
  };
  _proto.signoutRedirectCallback = function signoutRedirectCallback(url) {
    return this._signoutEnd(url || this._redirectNavigator.url).then(function (response) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signoutRedirectCallback: successful");
      return response;
    });
  };
  _proto.signoutPopup = function signoutPopup() {
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
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signoutPopup: successful");
    });
  };
  _proto.signoutPopupCallback = function signoutPopupCallback(url, keepOpen) {
    if (typeof keepOpen === 'undefined' && typeof url === 'boolean') {
      keepOpen = url;
      url = null;
    }
    var delimiter = '?';
    return this._popupNavigator.callback(url, keepOpen, delimiter).then(function () {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.signoutPopupCallback: successful");
    });
  };
  _proto._signout = function _signout(args, navigator) {
    var _this11 = this;
    var navigatorParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return this._signoutStart(args, navigator, navigatorParams).then(function (navResponse) {
      return _this11._signoutEnd(navResponse.url);
    });
  };
  _proto._signoutStart = function _signoutStart() {
    var _this12 = this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var navigator = arguments.length > 1 ? arguments[1] : undefined;
    var navigatorParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return navigator.prepare(navigatorParams).then(function (handle) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signoutStart: got navigator window handle");
      return _this12._loadUser().then(function (user) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signoutStart: loaded current user from storage");
        var revokePromise = _this12._settings.revokeAccessTokenOnSignout ? _this12._revokeInternal(user) : Promise.resolve();
        return revokePromise.then(function () {
          var id_token = args.id_token_hint || user && user.id_token;
          if (id_token) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signoutStart: Setting id_token into signout request");
            args.id_token_hint = id_token;
          }
          return _this12.removeUser().then(function () {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signoutStart: user removed, creating signout request");
            return _this12.createSignoutRequest(args).then(function (signoutRequest) {
              _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signoutStart: got signout request");
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
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signoutStart: Error after preparing navigator, closing navigator window");
          handle.close();
        }
        throw err;
      });
    });
  };
  _proto._signoutEnd = function _signoutEnd(url) {
    return this.processSignoutResponse(url).then(function (signoutResponse) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._signoutEnd: got signout response");
      return signoutResponse;
    });
  };
  _proto.revokeAccessToken = function revokeAccessToken() {
    var _this13 = this;
    return this._loadUser().then(function (user) {
      return _this13._revokeInternal(user, true).then(function (success) {
        if (success) {
          _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager.revokeAccessToken: removing token properties from user and re-storing");
          user.access_token = null;
          user.refresh_token = null;
          user.expires_at = null;
          user.token_type = null;
          return _this13.storeUser(user).then(function () {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager.revokeAccessToken: user stored");
            _this13._events.load(user);
          });
        }
      });
    }).then(function () {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.info("UserManager.revokeAccessToken: access token revoked successfully");
    });
  };
  _proto._revokeInternal = function _revokeInternal(user, required) {
    var _this14 = this;
    if (user) {
      var access_token = user.access_token;
      var refresh_token = user.refresh_token;
      return this._revokeAccessTokenInternal(access_token, required).then(function (atSuccess) {
        return _this14._revokeRefreshTokenInternal(refresh_token, required).then(function (rtSuccess) {
          if (!atSuccess && !rtSuccess) {
            _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager.revokeAccessToken: no need to revoke due to no token(s), or JWT format");
          }
          return atSuccess || rtSuccess;
        });
      });
    }
    return Promise.resolve(false);
  };
  _proto._revokeAccessTokenInternal = function _revokeAccessTokenInternal(access_token, required) {
    // check for JWT vs. reference token
    if (!access_token || access_token.indexOf('.') >= 0) {
      return Promise.resolve(false);
    }
    return this._tokenRevocationClient.revoke(access_token, required).then(function () {
      return true;
    });
  };
  _proto._revokeRefreshTokenInternal = function _revokeRefreshTokenInternal(refresh_token, required) {
    if (!refresh_token) {
      return Promise.resolve(false);
    }
    return this._tokenRevocationClient.revoke(refresh_token, required, "refresh_token").then(function () {
      return true;
    });
  };
  _proto.startSilentRenew = function startSilentRenew() {
    this._silentRenewService.start();
  };
  _proto.stopSilentRenew = function stopSilentRenew() {
    this._silentRenewService.stop();
  };
  _proto._loadUser = function _loadUser() {
    return this._userStore.get(this._userStoreKey).then(function (storageString) {
      if (storageString) {
        _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._loadUser: user storageString loaded");
        return _User_js__WEBPACK_IMPORTED_MODULE_3__.User.fromStorageString(storageString);
      }
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager._loadUser: no user storageString");
      return null;
    });
  };
  _proto.storeUser = function storeUser(user) {
    if (user) {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManager.storeUser: storing user");
      var storageString = user.toStorageString();
      return this._userStore.set(this._userStoreKey, storageString);
    } else {
      _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("storeUser.storeUser: removing user");
      return this._userStore.remove(this._userStoreKey);
    }
  };
  return _createClass(UserManager, [{
    key: "_redirectNavigator",
    get: function get() {
      return this.settings.redirectNavigator;
    }
  }, {
    key: "_popupNavigator",
    get: function get() {
      return this.settings.popupNavigator;
    }
  }, {
    key: "_iframeNavigator",
    get: function get() {
      return this.settings.iframeNavigator;
    }
  }, {
    key: "_userStore",
    get: function get() {
      return this.settings.userStore;
    }
  }, {
    key: "events",
    get: function get() {
      return this._events;
    }
  }, {
    key: "_userStoreKey",
    get: function get() {
      return "user:".concat(this.settings.authority, ":").concat(this.settings.client_id);
    }
  }]);
}(_OidcClient_js__WEBPACK_IMPORTED_MODULE_1__.OidcClient);

/***/ }),

/***/ "./src/UserManagerEvents.js":
/*!**********************************!*\
  !*** ./src/UserManagerEvents.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserManagerEvents: function() { return /* binding */ UserManagerEvents; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _AccessTokenEvents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccessTokenEvents.js */ "./src/AccessTokenEvents.js");
/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Event.js */ "./src/Event.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;


var UserManagerEvents = /*#__PURE__*/function (_AccessTokenEvents) {
  function UserManagerEvents(settings) {
    var _this;
    _this = _AccessTokenEvents.call(this, settings) || this;
    _this._userLoaded = new _Event_js__WEBPACK_IMPORTED_MODULE_2__.Event("User loaded");
    _this._userUnloaded = new _Event_js__WEBPACK_IMPORTED_MODULE_2__.Event("User unloaded");
    _this._silentRenewError = new _Event_js__WEBPACK_IMPORTED_MODULE_2__.Event("Silent renew error");
    _this._userSignedIn = new _Event_js__WEBPACK_IMPORTED_MODULE_2__.Event("User signed in");
    _this._userSignedOut = new _Event_js__WEBPACK_IMPORTED_MODULE_2__.Event("User signed out");
    _this._userSessionChanged = new _Event_js__WEBPACK_IMPORTED_MODULE_2__.Event("User session changed");
    return _this;
  }
  _inheritsLoose(UserManagerEvents, _AccessTokenEvents);
  var _proto = UserManagerEvents.prototype;
  _proto.load = function load(user) {
    var raiseEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManagerEvents.load");
    _AccessTokenEvents.prototype.load.call(this, user);
    if (raiseEvent) {
      this._userLoaded.raise(user);
    }
  };
  _proto.unload = function unload() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManagerEvents.unload");
    _AccessTokenEvents.prototype.unload.call(this);
    this._userUnloaded.raise();
  };
  _proto.addUserLoaded = function addUserLoaded(cb) {
    this._userLoaded.addHandler(cb);
  };
  _proto.removeUserLoaded = function removeUserLoaded(cb) {
    this._userLoaded.removeHandler(cb);
  };
  _proto.addUserUnloaded = function addUserUnloaded(cb) {
    this._userUnloaded.addHandler(cb);
  };
  _proto.removeUserUnloaded = function removeUserUnloaded(cb) {
    this._userUnloaded.removeHandler(cb);
  };
  _proto.addSilentRenewError = function addSilentRenewError(cb) {
    this._silentRenewError.addHandler(cb);
  };
  _proto.removeSilentRenewError = function removeSilentRenewError(cb) {
    this._silentRenewError.removeHandler(cb);
  };
  _proto._raiseSilentRenewError = function _raiseSilentRenewError(e) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManagerEvents._raiseSilentRenewError", e.message);
    this._silentRenewError.raise(e);
  };
  _proto.addUserSignedIn = function addUserSignedIn(cb) {
    this._userSignedIn.addHandler(cb);
  };
  _proto.removeUserSignedIn = function removeUserSignedIn(cb) {
    this._userSignedIn.removeHandler(cb);
  };
  _proto._raiseUserSignedIn = function _raiseUserSignedIn() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManagerEvents._raiseUserSignedIn");
    this._userSignedIn.raise();
  };
  _proto.addUserSignedOut = function addUserSignedOut(cb) {
    this._userSignedOut.addHandler(cb);
  };
  _proto.removeUserSignedOut = function removeUserSignedOut(cb) {
    this._userSignedOut.removeHandler(cb);
  };
  _proto._raiseUserSignedOut = function _raiseUserSignedOut() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManagerEvents._raiseUserSignedOut");
    this._userSignedOut.raise();
  };
  _proto.addUserSessionChanged = function addUserSessionChanged(cb) {
    this._userSessionChanged.addHandler(cb);
  };
  _proto.removeUserSessionChanged = function removeUserSessionChanged(cb) {
    this._userSessionChanged.removeHandler(cb);
  };
  _proto._raiseUserSessionChanged = function _raiseUserSessionChanged() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("UserManagerEvents._raiseUserSessionChanged");
    this._userSessionChanged.raise();
  };
  return UserManagerEvents;
}(_AccessTokenEvents_js__WEBPACK_IMPORTED_MODULE_1__.AccessTokenEvents);

/***/ }),

/***/ "./src/UserManagerSettings.js":
/*!************************************!*\
  !*** ./src/UserManagerSettings.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserManagerSettings: function() { return /* binding */ UserManagerSettings; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _OidcClientSettings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OidcClientSettings.js */ "./src/OidcClientSettings.js");
/* harmony import */ var _RedirectNavigator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RedirectNavigator.js */ "./src/RedirectNavigator.js");
/* harmony import */ var _PopupNavigator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PopupNavigator.js */ "./src/PopupNavigator.js");
/* harmony import */ var _IFrameNavigator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IFrameNavigator.js */ "./src/IFrameNavigator.js");
/* harmony import */ var _WebStorageStateStore_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WebStorageStateStore.js */ "./src/WebStorageStateStore.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Global.js */ "./src/Global.js");
/* harmony import */ var _SigninRequest_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SigninRequest.js */ "./src/SigninRequest.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

;







var DefaultAccessTokenExpiringNotificationTime = 60;
var DefaultCheckSessionInterval = 2000;
var UserManagerSettings = /*#__PURE__*/function (_OidcClientSettings) {
  function UserManagerSettings() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      popup_redirect_uri = _ref.popup_redirect_uri,
      popup_post_logout_redirect_uri = _ref.popup_post_logout_redirect_uri,
      popupWindowFeatures = _ref.popupWindowFeatures,
      popupWindowTarget = _ref.popupWindowTarget,
      silent_redirect_uri = _ref.silent_redirect_uri,
      silentRequestTimeout = _ref.silentRequestTimeout,
      _ref$automaticSilentR = _ref.automaticSilentRenew,
      automaticSilentRenew = _ref$automaticSilentR === void 0 ? false : _ref$automaticSilentR,
      _ref$validateSubOnSil = _ref.validateSubOnSilentRenew,
      validateSubOnSilentRenew = _ref$validateSubOnSil === void 0 ? false : _ref$validateSubOnSil,
      _ref$includeIdTokenIn = _ref.includeIdTokenInSilentRenew,
      includeIdTokenInSilentRenew = _ref$includeIdTokenIn === void 0 ? true : _ref$includeIdTokenIn,
      _ref$monitorSession = _ref.monitorSession,
      monitorSession = _ref$monitorSession === void 0 ? true : _ref$monitorSession,
      _ref$monitorAnonymous = _ref.monitorAnonymousSession,
      monitorAnonymousSession = _ref$monitorAnonymous === void 0 ? false : _ref$monitorAnonymous,
      _ref$checkSessionInte = _ref.checkSessionInterval,
      checkSessionInterval = _ref$checkSessionInte === void 0 ? DefaultCheckSessionInterval : _ref$checkSessionInte,
      _ref$stopCheckSession = _ref.stopCheckSessionOnError,
      stopCheckSessionOnError = _ref$stopCheckSession === void 0 ? true : _ref$stopCheckSession,
      query_status_response_type = _ref.query_status_response_type,
      _ref$revokeAccessToke = _ref.revokeAccessTokenOnSignout,
      revokeAccessTokenOnSignout = _ref$revokeAccessToke === void 0 ? false : _ref$revokeAccessToke,
      _ref$accessTokenExpir = _ref.accessTokenExpiringNotificationTime,
      accessTokenExpiringNotificationTime = _ref$accessTokenExpir === void 0 ? DefaultAccessTokenExpiringNotificationTime : _ref$accessTokenExpir,
      _ref$redirectNavigato = _ref.redirectNavigator,
      redirectNavigator = _ref$redirectNavigato === void 0 ? new _RedirectNavigator_js__WEBPACK_IMPORTED_MODULE_2__.RedirectNavigator() : _ref$redirectNavigato,
      _ref$popupNavigator = _ref.popupNavigator,
      popupNavigator = _ref$popupNavigator === void 0 ? new _PopupNavigator_js__WEBPACK_IMPORTED_MODULE_3__.PopupNavigator() : _ref$popupNavigator,
      _ref$iframeNavigator = _ref.iframeNavigator,
      iframeNavigator = _ref$iframeNavigator === void 0 ? new _IFrameNavigator_js__WEBPACK_IMPORTED_MODULE_4__.IFrameNavigator() : _ref$iframeNavigator,
      _ref$userStore = _ref.userStore,
      userStore = _ref$userStore === void 0 ? new _WebStorageStateStore_js__WEBPACK_IMPORTED_MODULE_5__.WebStorageStateStore({
        store: _Global_js__WEBPACK_IMPORTED_MODULE_6__.Global.sessionStorage
      }) : _ref$userStore;
    _this = _OidcClientSettings.call(this, arguments[0]) || this;
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
      _this._query_status_response_type = _SigninRequest_js__WEBPACK_IMPORTED_MODULE_7__.SigninRequest.isOidc(arguments[0].response_type) ? "id_token" : "code";
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
  _inheritsLoose(UserManagerSettings, _OidcClientSettings);
  return _createClass(UserManagerSettings, [{
    key: "popup_redirect_uri",
    get: function get() {
      return this._popup_redirect_uri;
    }
  }, {
    key: "popup_post_logout_redirect_uri",
    get: function get() {
      return this._popup_post_logout_redirect_uri;
    }
  }, {
    key: "popupWindowFeatures",
    get: function get() {
      return this._popupWindowFeatures;
    }
  }, {
    key: "popupWindowTarget",
    get: function get() {
      return this._popupWindowTarget;
    }
  }, {
    key: "silent_redirect_uri",
    get: function get() {
      return this._silent_redirect_uri;
    }
  }, {
    key: "silentRequestTimeout",
    get: function get() {
      return this._silentRequestTimeout;
    }
  }, {
    key: "automaticSilentRenew",
    get: function get() {
      return this._automaticSilentRenew;
    }
  }, {
    key: "validateSubOnSilentRenew",
    get: function get() {
      return this._validateSubOnSilentRenew;
    }
  }, {
    key: "includeIdTokenInSilentRenew",
    get: function get() {
      return this._includeIdTokenInSilentRenew;
    }
  }, {
    key: "accessTokenExpiringNotificationTime",
    get: function get() {
      return this._accessTokenExpiringNotificationTime;
    }
  }, {
    key: "monitorSession",
    get: function get() {
      return this._monitorSession;
    }
  }, {
    key: "monitorAnonymousSession",
    get: function get() {
      return this._monitorAnonymousSession;
    }
  }, {
    key: "checkSessionInterval",
    get: function get() {
      return this._checkSessionInterval;
    }
  }, {
    key: "stopCheckSessionOnError",
    get: function get() {
      return this._stopCheckSessionOnError;
    }
  }, {
    key: "query_status_response_type",
    get: function get() {
      return this._query_status_response_type;
    }
  }, {
    key: "revokeAccessTokenOnSignout",
    get: function get() {
      return this._revokeAccessTokenOnSignout;
    }
  }, {
    key: "redirectNavigator",
    get: function get() {
      return this._redirectNavigator;
    }
  }, {
    key: "popupNavigator",
    get: function get() {
      return this._popupNavigator;
    }
  }, {
    key: "iframeNavigator",
    get: function get() {
      return this._iframeNavigator;
    }
  }, {
    key: "userStore",
    get: function get() {
      return this._userStore;
    }
  }]);
}(_OidcClientSettings_js__WEBPACK_IMPORTED_MODULE_1__.OidcClientSettings);

/***/ }),

/***/ "./src/WebStorageStateStore.js":
/*!*************************************!*\
  !*** ./src/WebStorageStateStore.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebStorageStateStore: function() { return /* binding */ WebStorageStateStore; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Global.js */ "./src/Global.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.



var WebStorageStateStore = /*#__PURE__*/function () {
  function WebStorageStateStore() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? "oidc." : _ref$prefix,
      _ref$store = _ref.store,
      store = _ref$store === void 0 ? _Global_js__WEBPACK_IMPORTED_MODULE_1__.Global.localStorage : _ref$store;
    this._store = store;
    this._prefix = prefix;
  }
  var _proto = WebStorageStateStore.prototype;
  _proto.set = function set(key, value) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("WebStorageStateStore.set", key);
    key = this._prefix + key;
    this._store.setItem(key, value);
    return Promise.resolve();
  };
  _proto.get = function get(key) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("WebStorageStateStore.get", key);
    key = this._prefix + key;
    var item = this._store.getItem(key);
    return Promise.resolve(item);
  };
  _proto.remove = function remove(key) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("WebStorageStateStore.remove", key);
    key = this._prefix + key;
    var item = this._store.getItem(key);
    this._store.removeItem(key);
    return Promise.resolve(item);
  };
  _proto.getAllKeys = function getAllKeys() {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("WebStorageStateStore.getAllKeys");
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ random; },
/* harmony export */   secureUuid: function() { return /* binding */ secureUuid; }
/* harmony export */ });
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
function secureUuid(crypto) {
  if (!crypto || typeof crypto.getRandomValues !== 'function') {
    throw new Error("crypto.getRandomValues is not available; secure random generation is required for OIDC");
  }
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  }).replace(/-/g, '');
}
function random() {
  return secureUuid(getCrypto());
}

/***/ }),

/***/ "./version.js":
/*!********************!*\
  !*** ./version.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Version: function() { return /* binding */ Version; }
/* harmony export */ });
var Version = "1.11.5";


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports) {

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
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else // removed by dead control flow
{}
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
	    if (!crypto && typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.crypto) {
	        crypto = __webpack_require__.g.crypto;
	    }

	    // Native crypto import via require (NodeJS)
	    if (!crypto && "function" === 'function') {
	        try {
	            crypto = __webpack_require__(/*! crypto */ "?9157");
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

/***/ }),

/***/ "./node_modules/crypto-js/enc-base64.js":
/*!**********************************************!*\
  !*** ./node_modules/crypto-js/enc-base64.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else // removed by dead control flow
{}
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
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else // removed by dead control flow
{}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));

/***/ }),

/***/ "./node_modules/crypto-js/sha256.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha256.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else // removed by dead control flow
{}
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
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "./node_modules/crypto-js/x64-core.js"), __webpack_require__(/*! ./sha512 */ "./node_modules/crypto-js/sha512.js"));
	}
	else // removed by dead control flow
{}
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
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "./node_modules/crypto-js/x64-core.js"));
	}
	else // removed by dead control flow
{}
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
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else // removed by dead control flow
{}
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

/***/ "?9157":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function() { return module['default']; } :
/******/ 			function() { return module; };
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Log.js */ "./src/Log.js");
/* harmony import */ var _src_OidcClient_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/OidcClient.js */ "./src/OidcClient.js");
/* harmony import */ var _src_OidcClientSettings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/OidcClientSettings.js */ "./src/OidcClientSettings.js");
/* harmony import */ var _src_WebStorageStateStore_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/WebStorageStateStore.js */ "./src/WebStorageStateStore.js");
/* harmony import */ var _src_InMemoryWebStorage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/InMemoryWebStorage.js */ "./src/InMemoryWebStorage.js");
/* harmony import */ var _src_UserManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/UserManager.js */ "./src/UserManager.js");
/* harmony import */ var _src_AccessTokenEvents_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/AccessTokenEvents.js */ "./src/AccessTokenEvents.js");
/* harmony import */ var _src_MetadataService_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/MetadataService.js */ "./src/MetadataService.js");
/* harmony import */ var _src_CordovaPopupNavigator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/CordovaPopupNavigator.js */ "./src/CordovaPopupNavigator.js");
/* harmony import */ var _src_CordovaIFrameNavigator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/CordovaIFrameNavigator.js */ "./src/CordovaIFrameNavigator.js");
/* harmony import */ var _src_CheckSessionIFrame_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./src/CheckSessionIFrame.js */ "./src/CheckSessionIFrame.js");
/* harmony import */ var _src_TokenRevocationClient_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./src/TokenRevocationClient.js */ "./src/TokenRevocationClient.js");
/* harmony import */ var _src_SessionMonitor_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./src/SessionMonitor.js */ "./src/SessionMonitor.js");
/* harmony import */ var _src_Global_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./src/Global.js */ "./src/Global.js");
/* harmony import */ var _src_User_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./src/User.js */ "./src/User.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./version.js */ "./version.js");
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

















/* harmony default export */ __webpack_exports__["default"] = ({
  Version: _version_js__WEBPACK_IMPORTED_MODULE_15__.Version,
  Log: _src_Log_js__WEBPACK_IMPORTED_MODULE_0__.Log,
  OidcClient: _src_OidcClient_js__WEBPACK_IMPORTED_MODULE_1__.OidcClient,
  OidcClientSettings: _src_OidcClientSettings_js__WEBPACK_IMPORTED_MODULE_2__.OidcClientSettings,
  WebStorageStateStore: _src_WebStorageStateStore_js__WEBPACK_IMPORTED_MODULE_3__.WebStorageStateStore,
  InMemoryWebStorage: _src_InMemoryWebStorage_js__WEBPACK_IMPORTED_MODULE_4__.InMemoryWebStorage,
  UserManager: _src_UserManager_js__WEBPACK_IMPORTED_MODULE_5__.UserManager,
  AccessTokenEvents: _src_AccessTokenEvents_js__WEBPACK_IMPORTED_MODULE_6__.AccessTokenEvents,
  MetadataService: _src_MetadataService_js__WEBPACK_IMPORTED_MODULE_7__.MetadataService,
  CordovaPopupNavigator: _src_CordovaPopupNavigator_js__WEBPACK_IMPORTED_MODULE_8__.CordovaPopupNavigator,
  CordovaIFrameNavigator: _src_CordovaIFrameNavigator_js__WEBPACK_IMPORTED_MODULE_9__.CordovaIFrameNavigator,
  CheckSessionIFrame: _src_CheckSessionIFrame_js__WEBPACK_IMPORTED_MODULE_10__.CheckSessionIFrame,
  TokenRevocationClient: _src_TokenRevocationClient_js__WEBPACK_IMPORTED_MODULE_11__.TokenRevocationClient,
  SessionMonitor: _src_SessionMonitor_js__WEBPACK_IMPORTED_MODULE_12__.SessionMonitor,
  Global: _src_Global_js__WEBPACK_IMPORTED_MODULE_13__.Global,
  User: _src_User_js__WEBPACK_IMPORTED_MODULE_14__.User
});
}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDbkIscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUNySkEsQ0FBQztBQUNELEtBQUssSUFBMkI7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUFBLEVBT0o7QUFDRixDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO1VBQ0EsR0FBRztVQUNIO1VBQ0E7VUFDQSxDQUFDLEk7OztVQ1BELDhDQUE4QywwRDs7O1VDQTlDO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBOztBQUVtQztBQUNjO0FBQ2dCO0FBQ0k7QUFDSjtBQUNkO0FBQ1k7QUFDSjtBQUNZO0FBQ0U7QUFDUjtBQUNNO0FBQ2Q7QUFDaEI7QUFDSjtBQUVFO0FBRXZDLCtEQUFlO0VBQ1hBLE9BQU8sRUFBUEEsaURBQU87RUFDUDF4QixHQUFHLEVBQUhBLDRDQUFHO0VBQ0hxWSxVQUFVLEVBQVZBLDBEQUFVO0VBQ1ZQLGtCQUFrQixFQUFsQkEsMEVBQWtCO0VBQ2xCNkQsb0JBQW9CLEVBQXBCQSw4RUFBb0I7RUFDcEJ6UCxrQkFBa0IsRUFBbEJBLDBFQUFrQjtFQUNsQmlkLFdBQVcsRUFBWEEsNERBQVc7RUFDWGhwQixpQkFBaUIsRUFBakJBLHdFQUFpQjtFQUNqQitWLGVBQWUsRUFBZkEsb0VBQWU7RUFDZjlQLHFCQUFxQixFQUFyQkEsZ0ZBQXFCO0VBQ3JCTCxzQkFBc0IsRUFBdEJBLGtGQUFzQjtFQUN0QnpELGtCQUFrQixFQUFsQkEsMkVBQWtCO0VBQ2xCMmxCLHFCQUFxQixFQUFyQkEsaUZBQXFCO0VBQ3JCM0UsY0FBYyxFQUFkQSxtRUFBYztFQUNkN1ksTUFBTSxFQUFOQSxtREFBTTtFQUNOcWUsSUFBSSxFQUFKQSwrQ0FBSUE7QUFDUixDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vaWRjLWNsaWVudC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvQWNjZXNzVG9rZW5FdmVudHMuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvQ2hlY2tTZXNzaW9uSUZyYW1lLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0Nsb2NrU2VydmljZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Db3Jkb3ZhSUZyYW1lTmF2aWdhdG9yLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0NvcmRvdmFQb3B1cE5hdmlnYXRvci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Db3Jkb3ZhUG9wdXBXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvRXJyb3JSZXNwb25zZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9FdmVudC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvSUZyYW1lTmF2aWdhdG9yLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0lGcmFtZVdpbmRvdy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Jbk1lbW9yeVdlYlN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvSm9zZVV0aWwuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvSnNvblNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvTG9nLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL01ldGFkYXRhU2VydmljZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9PaWRjQ2xpZW50LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL09pZGNDbGllbnRTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Qb3B1cE5hdmlnYXRvci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Qb3B1cFdpbmRvdy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9SZWRpcmVjdE5hdmlnYXRvci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9SZXNwb25zZVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9TZXNzaW9uTW9uaXRvci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9TaWduaW5SZXF1ZXN0LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1NpZ25pblJlc3BvbnNlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1NpZ25pblN0YXRlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1NpZ25vdXRSZXF1ZXN0LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1NpZ25vdXRSZXNwb25zZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9TaWxlbnRSZW5ld1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvU3RhdGUuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvVGltZXIuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvVG9rZW5DbGllbnQuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvVG9rZW5SZXZvY2F0aW9uQ2xpZW50LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1VybFV0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvVXNlci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Vc2VySW5mb1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvVXNlck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvVXNlck1hbmFnZXJFdmVudHMuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvVXNlck1hbmFnZXJTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9XZWJTdG9yYWdlU3RhdGVTdG9yZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9yYW5kb20uanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi92ZXJzaW9uLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvY29yZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvZW5jLWJhc2U2NC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvZW5jLWhleC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMjU2LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEzODQuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTUxMi5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMveDY0LWNvcmUuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvaWdub3JlZHwvaG9tZS9ydW5uZXIvd29yay9pZGVudGl0eS1tb2RlbC1vaWRjLWNsaWVudC1qcy9pZGVudGl0eS1tb2RlbC1vaWRjLWNsaWVudC1qcy9ub2RlX21vZHVsZXMvY3J5cHRvLWpzfGNyeXB0byIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29pZGMtY2xpZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgVGltZXIgfSBmcm9tICcuL1RpbWVyLmpzJztcblxuY29uc3QgRGVmYXVsdEFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lID0gNjA7IC8vIHNlY29uZHNcblxuZXhwb3J0IGNsYXNzIEFjY2Vzc1Rva2VuRXZlbnRzIHtcblxuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSBEZWZhdWx0QWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUsXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJpbmdUaW1lciA9IG5ldyBUaW1lcihcIkFjY2VzcyB0b2tlbiBleHBpcmluZ1wiKSxcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmVkVGltZXIgPSBuZXcgVGltZXIoXCJBY2Nlc3MgdG9rZW4gZXhwaXJlZFwiKVxuICAgIH0gPSB7fSkge1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IGFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lO1xuXG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcgPSBhY2Nlc3NUb2tlbkV4cGlyaW5nVGltZXI7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJlZCA9IGFjY2Vzc1Rva2VuRXhwaXJlZFRpbWVyO1xuICAgIH1cblxuICAgIGxvYWQoY29udGFpbmVyKSB7XG4gICAgICAgIC8vIG9ubHkgcmVnaXN0ZXIgZXZlbnRzIGlmIHRoZXJlJ3MgYW4gYWNjZXNzIHRva2VuIGFuZCBpdCBoYXMgYW4gZXhwaXJhdGlvblxuICAgICAgICBpZiAoY29udGFpbmVyLmFjY2Vzc190b2tlbiAmJiBjb250YWluZXIuZXhwaXJlc19pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBjb250YWluZXIuZXhwaXJlc19pbjtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkFjY2Vzc1Rva2VuRXZlbnRzLmxvYWQ6IGFjY2VzcyB0b2tlbiBwcmVzZW50LCByZW1haW5pbmcgZHVyYXRpb246XCIsIGR1cmF0aW9uKTtcblxuICAgICAgICAgICAgaWYgKGR1cmF0aW9uID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgcmVnaXN0ZXIgZXhwaXJpbmcgaWYgd2Ugc3RpbGwgaGF2ZSB0aW1lXG4gICAgICAgICAgICAgICAgbGV0IGV4cGlyaW5nID0gZHVyYXRpb24gLSB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZTtcbiAgICAgICAgICAgICAgICBpZiAoZXhwaXJpbmcgPD0gMCl7XG4gICAgICAgICAgICAgICAgICAgIGV4cGlyaW5nID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiQWNjZXNzVG9rZW5FdmVudHMubG9hZDogcmVnaXN0ZXJpbmcgZXhwaXJpbmcgdGltZXIgaW46XCIsIGV4cGlyaW5nKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLmluaXQoZXhwaXJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiQWNjZXNzVG9rZW5FdmVudHMubG9hZDogY2FuY2VsaW5nIGV4aXN0aW5nIGV4cGlyaW5nIHRpbWVyIGJlY2FzZSB3ZSdyZSBwYXN0IGV4cGlyYXRpb24uXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcuY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIGl0J3MgbmVnYXRpdmUsIGl0IHdpbGwgc3RpbGwgZmlyZVxuICAgICAgICAgICAgbGV0IGV4cGlyZWQgPSBkdXJhdGlvbiArIDE7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJBY2Nlc3NUb2tlbkV2ZW50cy5sb2FkOiByZWdpc3RlcmluZyBleHBpcmVkIHRpbWVyIGluOlwiLCBleHBpcmVkKTtcbiAgICAgICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJlZC5pbml0KGV4cGlyZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZy5jYW5jZWwoKTtcbiAgICAgICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJlZC5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVubG9hZCgpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiQWNjZXNzVG9rZW5FdmVudHMudW5sb2FkOiBjYW5jZWxpbmcgZXhpc3RpbmcgYWNjZXNzIHRva2VuIHRpbWVyc1wiKTtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZy5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkLmNhbmNlbCgpO1xuICAgIH1cblxuICAgIGFkZEFjY2Vzc1Rva2VuRXhwaXJpbmcoY2IpIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZy5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlQWNjZXNzVG9rZW5FeHBpcmluZyhjYikge1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cblxuICAgIGFkZEFjY2Vzc1Rva2VuRXhwaXJlZChjYikge1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZUFjY2Vzc1Rva2VuRXhwaXJlZChjYikge1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5jb25zdCBEZWZhdWx0SW50ZXJ2YWwgPSAyMDAwO1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tTZXNzaW9uSUZyYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgY2xpZW50X2lkLCB1cmwsIGludGVydmFsLCBzdG9wT25FcnJvciA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2xpZW50X2lkID0gY2xpZW50X2lkO1xuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gaW50ZXJ2YWwgfHwgRGVmYXVsdEludGVydmFsO1xuICAgICAgICB0aGlzLl9zdG9wT25FcnJvciA9IHN0b3BPbkVycm9yO1xuXG4gICAgICAgIHZhciBpZHggPSB1cmwuaW5kZXhPZihcIi9cIiwgdXJsLmluZGV4T2YoXCIvL1wiKSArIDIpO1xuICAgICAgICB0aGlzLl9mcmFtZV9vcmlnaW4gPSB1cmwuc3Vic3RyKDAsIGlkeCk7XG5cbiAgICAgICAgdGhpcy5fZnJhbWUgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcblxuICAgICAgICAvLyBzaG90Z3VuIGFwcHJvYWNoXG4gICAgICAgIHRoaXMuX2ZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB0aGlzLl9mcmFtZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGhpcy5fZnJhbWUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLl9mcmFtZS53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuX2ZyYW1lLmhlaWdodCA9IDA7XG5cbiAgICAgICAgdGhpcy5fZnJhbWUuc3JjID0gdXJsO1xuICAgIH1cbiAgICBsb2FkKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2ZyYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kTWVzc2FnZUV2ZW50ID0gdGhpcy5fbWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuX2JvdW5kTWVzc2FnZUV2ZW50LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfbWVzc2FnZShlKSB7XG4gICAgICAgIGlmIChlLm9yaWdpbiA9PT0gdGhpcy5fZnJhbWVfb3JpZ2luICYmXG4gICAgICAgICAgICBlLnNvdXJjZSA9PT0gdGhpcy5fZnJhbWUuY29udGVudFdpbmRvd1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChlLmRhdGEgPT09IFwiZXJyb3JcIikge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkNoZWNrU2Vzc2lvbklGcmFtZTogZXJyb3IgbWVzc2FnZSBmcm9tIGNoZWNrIHNlc3Npb24gb3AgaWZyYW1lXCIpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdG9wT25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlLmRhdGEgPT09IFwiY2hhbmdlZFwiKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiQ2hlY2tTZXNzaW9uSUZyYW1lOiBjaGFuZ2VkIG1lc3NhZ2UgZnJvbSBjaGVjayBzZXNzaW9uIG9wIGlmcmFtZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiQ2hlY2tTZXNzaW9uSUZyYW1lOiBcIiArIGUuZGF0YSArIFwiIG1lc3NhZ2UgZnJvbSBjaGVjayBzZXNzaW9uIG9wIGlmcmFtZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGFydChzZXNzaW9uX3N0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZXNzaW9uX3N0YXRlICE9PSBzZXNzaW9uX3N0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJDaGVja1Nlc3Npb25JRnJhbWUuc3RhcnRcIik7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uX3N0YXRlID0gc2Vzc2lvbl9zdGF0ZTtcblxuICAgICAgICAgICAgbGV0IHNlbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSh0aGlzLl9jbGllbnRfaWQgKyBcIiBcIiArIHRoaXMuX3Nlc3Npb25fc3RhdGUsIHRoaXMuX2ZyYW1lX29yaWdpbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIG5vd1xuICAgICAgICAgICAgc2VuZCgpO1xuXG4gICAgICAgICAgICAvLyBhbmQgc2V0dXAgdGltZXJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gd2luZG93LnNldEludGVydmFsKHNlbmQsIHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuX3Nlc3Npb25fc3RhdGUgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl90aW1lcikge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiQ2hlY2tTZXNzaW9uSUZyYW1lLnN0b3BcIik7XG5cbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX3RpbWVyKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDbG9ja1NlcnZpY2Uge1xuICAgIGdldEVwb2NoVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShEYXRlLm5vdygpIC8gMTAwMCB8IDApO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IENvcmRvdmFQb3B1cFdpbmRvdyB9IGZyb20gJy4vQ29yZG92YVBvcHVwV2luZG93LmpzJztcblxuZXhwb3J0IGNsYXNzIENvcmRvdmFJRnJhbWVOYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZShwYXJhbXMpIHtcbiAgICAgICAgcGFyYW1zLnBvcHVwV2luZG93RmVhdHVyZXMgPSAnaGlkZGVuPXllcyc7XG4gICAgICAgIGxldCBwb3B1cCA9IG5ldyBDb3Jkb3ZhUG9wdXBXaW5kb3cocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwb3B1cCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgQ29yZG92YVBvcHVwV2luZG93IH0gZnJvbSAnLi9Db3Jkb3ZhUG9wdXBXaW5kb3cuanMnO1xuXG5leHBvcnQgY2xhc3MgQ29yZG92YVBvcHVwTmF2aWdhdG9yIHtcblxuICAgIHByZXBhcmUocGFyYW1zKSB7XG4gICAgICAgIGxldCBwb3B1cCA9IG5ldyBDb3Jkb3ZhUG9wdXBXaW5kb3cocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwb3B1cCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5jb25zdCBEZWZhdWx0UG9wdXBGZWF0dXJlcyA9ICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vLHpvb209bm8nO1xuY29uc3QgRGVmYXVsdFBvcHVwVGFyZ2V0ID0gXCJfYmxhbmtcIjtcblxuZXhwb3J0IGNsYXNzIENvcmRvdmFQb3B1cFdpbmRvdyB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZlYXR1cmVzID0gcGFyYW1zLnBvcHVwV2luZG93RmVhdHVyZXMgfHwgRGVmYXVsdFBvcHVwRmVhdHVyZXM7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gcGFyYW1zLnBvcHVwV2luZG93VGFyZ2V0IHx8IERlZmF1bHRQb3B1cFRhcmdldDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVkaXJlY3RfdXJpID0gcGFyYW1zLnN0YXJ0VXJsO1xuICAgICAgICBMb2cuZGVidWcoXCJDb3Jkb3ZhUG9wdXBXaW5kb3cuY3RvcjogcmVkaXJlY3RfdXJpOiBcIiArIHRoaXMucmVkaXJlY3RfdXJpKTtcbiAgICB9XG5cbiAgICBfaXNJbkFwcEJyb3dzZXJJbnN0YWxsZWQoY29yZG92YU1ldGFkYXRhKSB7XG4gICAgICAgIHJldHVybiBbXCJjb3Jkb3ZhLXBsdWdpbi1pbmFwcGJyb3dzZXJcIiwgXCJjb3Jkb3ZhLXBsdWdpbi1pbmFwcGJyb3dzZXIuaW5hcHBicm93c2VyXCIsIFwib3JnLmFwYWNoZS5jb3Jkb3ZhLmluYXBwYnJvd3NlclwiXS5zb21lKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gY29yZG92YU1ldGFkYXRhLmhhc093blByb3BlcnR5KG5hbWUpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIG5hdmlnYXRlKHBhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcyB8fCAhcGFyYW1zLnVybCkge1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJObyB1cmwgcHJvdmlkZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jb3Jkb3ZhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9yKFwiY29yZG92YSBpcyB1bmRlZmluZWRcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGNvcmRvdmFNZXRhZGF0YSA9IHdpbmRvdy5jb3Jkb3ZhLnJlcXVpcmUoXCJjb3Jkb3ZhL3BsdWdpbl9saXN0XCIpLm1ldGFkYXRhO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzSW5BcHBCcm93c2VySW5zdGFsbGVkKGNvcmRvdmFNZXRhZGF0YSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Vycm9yKFwiSW5BcHBCcm93c2VyIHBsdWdpbiBub3QgZm91bmRcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3BvcHVwID0gY29yZG92YS5JbkFwcEJyb3dzZXIub3BlbihwYXJhbXMudXJsLCB0aGlzLnRhcmdldCwgdGhpcy5mZWF0dXJlcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJDb3Jkb3ZhUG9wdXBXaW5kb3cubmF2aWdhdGU6IHBvcHVwIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX2V4aXRDYWxsYmFja0V2ZW50ID0gdGhpcy5fZXhpdENhbGxiYWNrLmJpbmQodGhpcyk7IFxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRTdGFydENhbGxiYWNrRXZlbnQgPSB0aGlzLl9sb2FkU3RhcnRDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJleGl0XCIsIHRoaXMuX2V4aXRDYWxsYmFja0V2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzdGFydFwiLCB0aGlzLl9sb2FkU3RhcnRDYWxsYmFja0V2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiRXJyb3Igb3BlbmluZyBwb3B1cCB3aW5kb3dcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXQgcHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuXG4gICAgX2xvYWRTdGFydENhbGxiYWNrKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC51cmwuaW5kZXhPZih0aGlzLnJlZGlyZWN0X3VyaSkgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3N1Y2Nlc3MoeyB1cmw6IGV2ZW50LnVybCB9KTtcbiAgICAgICAgfSAgICBcbiAgICB9XG4gICAgX2V4aXRDYWxsYmFjayhtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuX2Vycm9yKG1lc3NhZ2UpOyAgICBcbiAgICB9XG4gICAgXG4gICAgX3N1Y2Nlc3MoZGF0YSkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiQ29yZG92YVBvcHVwV2luZG93OiBTdWNjZXNzZnVsIHJlc3BvbnNlIGZyb20gY29yZG92YSBwb3B1cCB3aW5kb3dcIik7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUoZGF0YSk7XG4gICAgfVxuICAgIF9lcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcblxuICAgICAgICBMb2cuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuX3JlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgfVxuXG4gICAgX2NsZWFudXAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wb3B1cCl7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJDb3Jkb3ZhUG9wdXBXaW5kb3c6IGNsZWFuaW5nIHVwIHBvcHVwXCIpO1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4aXRcIiwgdGhpcy5fZXhpdENhbGxiYWNrRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RhcnRcIiwgdGhpcy5fbG9hZFN0YXJ0Q2FsbGJhY2tFdmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb3B1cCA9IG51bGw7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgRXJyb3JSZXNwb25zZSBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcih7ZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uLCBlcnJvcl91cmksIHN0YXRlLCBzZXNzaW9uX3N0YXRlfT17fVxuICAgICkge1xuICAgICAgICAgaWYgKCFlcnJvcil7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJObyBlcnJvciBwYXNzZWQgdG8gRXJyb3JSZXNwb25zZVwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVycm9yXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIoZXJyb3JfZGVzY3JpcHRpb24gfHwgZXJyb3IpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IFwiRXJyb3JSZXNwb25zZVwiO1xuXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5lcnJvcl9kZXNjcmlwdGlvbiA9IGVycm9yX2Rlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmVycm9yX3VyaSA9IGVycm9yX3VyaTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc2Vzc2lvbl9zdGF0ZSA9IHNlc3Npb25fc3RhdGU7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgRXZlbnQge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gW107XG4gICAgfVxuXG4gICAgYWRkSGFuZGxlcihjYikge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MucHVzaChjYik7XG4gICAgfVxuXG4gICAgcmVtb3ZlSGFuZGxlcihjYikge1xuICAgICAgICB2YXIgaWR4ID0gdGhpcy5fY2FsbGJhY2tzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0gPT09IGNiKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3Muc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByYWlzZSguLi5wYXJhbXMpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiRXZlbnQ6IFJhaXNpbmcgZXZlbnQ6IFwiICsgdGhpcy5fbmFtZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3NbaV0oLi4ucGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmNvbnN0IHRpbWVyID0ge1xuICAgIHNldEludGVydmFsOiBmdW5jdGlvbiAoY2IsIGR1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZXRJbnRlcnZhbChjYiwgZHVyYXRpb24pO1xuICAgIH0sXG4gICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbChoYW5kbGUpO1xuICAgIH1cbn07XG5cbmxldCB0ZXN0aW5nID0gZmFsc2U7XG5sZXQgcmVxdWVzdCA9IG51bGw7XG5cbmV4cG9ydCBjbGFzcyBHbG9iYWwge1xuXG4gICAgc3RhdGljIF90ZXN0aW5nKCkge1xuICAgICAgICB0ZXN0aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGxvY2F0aW9uKCkge1xuICAgICAgICBpZiAoIXRlc3RpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBpZiAoIXRlc3RpbmcgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHNlc3Npb25TdG9yYWdlKCkge1xuICAgICAgICBpZiAoIXRlc3RpbmcgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBzZXRYTUxIdHRwUmVxdWVzdChuZXdSZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3QgPSBuZXdSZXF1ZXN0O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgWE1MSHR0cFJlcXVlc3QoKSB7XG4gICAgICAgIGlmICghdGVzdGluZyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QgfHwgWE1MSHR0cFJlcXVlc3Q7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHRpbWVyKCkge1xuICAgICAgICBpZiAoIXRlc3RpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IElGcmFtZVdpbmRvdyB9IGZyb20gJy4vSUZyYW1lV2luZG93LmpzJztcblxuZXhwb3J0IGNsYXNzIElGcmFtZU5hdmlnYXRvciB7XG5cbiAgICBwcmVwYXJlKHBhcmFtcykge1xuICAgICAgICBsZXQgZnJhbWUgPSBuZXcgSUZyYW1lV2luZG93KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZnJhbWUpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKHVybCkge1xuICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVOYXZpZ2F0b3IuY2FsbGJhY2tcIik7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIElGcmFtZVdpbmRvdy5ub3RpZnlQYXJlbnQodXJsKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5jb25zdCBEZWZhdWx0VGltZW91dCA9IDEwMDAwO1xuXG5leHBvcnQgY2xhc3MgSUZyYW1lV2luZG93IHtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2JvdW5kTWVzc2FnZUV2ZW50ID0gdGhpcy5fbWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLl9mcmFtZSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuXG4gICAgICAgIC8vIHNob3RndW4gYXBwcm9hY2hcbiAgICAgICAgdGhpcy5fZnJhbWUuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHRoaXMuX2ZyYW1lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLl9mcmFtZS53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuX2ZyYW1lLmhlaWdodCA9IDA7XG5cbiAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZnJhbWUpO1xuICAgIH1cblxuICAgIG5hdmlnYXRlKHBhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcyB8fCAhcGFyYW1zLnVybCkge1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJObyB1cmwgcHJvdmlkZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdGltZW91dCA9IHBhcmFtcy5zaWxlbnRSZXF1ZXN0VGltZW91dCB8fCBEZWZhdWx0VGltZW91dDtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdy5uYXZpZ2F0ZTogVXNpbmcgdGltZW91dCBvZjpcIiwgdGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuX3RpbWVvdXQuYmluZCh0aGlzKSwgdGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZS5zcmMgPSBwYXJhbXMudXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXQgcHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuXG4gICAgX3N1Y2Nlc3MoZGF0YSkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93OiBTdWNjZXNzZnVsIHJlc3BvbnNlIGZyb20gZnJhbWUgd2luZG93XCIpO1xuICAgICAgICB0aGlzLl9yZXNvbHZlKGRhdGEpO1xuICAgIH1cbiAgICBfZXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG5cbiAgICAgICAgTG9nLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl9yZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgIH1cblxuICAgIF9jbGVhbnVwKCkge1xuICAgICAgICBpZiAodGhpcy5fZnJhbWUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdzogY2xlYW51cFwiKTtcblxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuX2JvdW5kTWVzc2FnZUV2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX2ZyYW1lKTtcblxuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RpbWVvdXQoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdy50aW1lb3V0XCIpO1xuICAgICAgICB0aGlzLl9lcnJvcihcIkZyYW1lIHdpbmRvdyB0aW1lZCBvdXRcIik7XG4gICAgfVxuXG4gICAgX21lc3NhZ2UoZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3cubWVzc2FnZVwiKTtcblxuICAgICAgICBpZiAodGhpcy5fdGltZXIgJiZcbiAgICAgICAgICAgIGUub3JpZ2luID09PSB0aGlzLl9vcmlnaW4gJiZcbiAgICAgICAgICAgIGUuc291cmNlID09PSB0aGlzLl9mcmFtZS5jb250ZW50V2luZG93ICYmXG4gICAgICAgICAgICAodHlwZW9mIGUuZGF0YSA9PT0gJ3N0cmluZycgJiYgKGUuZGF0YS5zdGFydHNXaXRoKCdodHRwOi8vJykgfHwgZS5kYXRhLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJykpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCB1cmwgPSBlLmRhdGE7XG4gICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3VjY2Vzcyh7IHVybDogdXJsIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJJbnZhbGlkIHJlc3BvbnNlIGZyb20gZnJhbWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgX29yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm90aWZ5UGFyZW50KHVybCkge1xuICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3cubm90aWZ5UGFyZW50XCIpO1xuICAgICAgICB1cmwgPSB1cmwgfHwgd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdy5ub3RpZnlQYXJlbnQ6IHBvc3RpbmcgdXJsIG1lc3NhZ2UgdG8gcGFyZW50XCIpO1xuICAgICAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh1cmwsIGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBJbk1lbW9yeVdlYlN0b3JhZ2V7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgIH1cblxuICAgIGdldEl0ZW0oa2V5KSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkluTWVtb3J5V2ViU3RvcmFnZS5nZXRJdGVtXCIsIGtleSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhW2tleV07XG4gICAgfVxuXG4gICAgc2V0SXRlbShrZXksIHZhbHVlKXtcbiAgICAgICAgTG9nLmRlYnVnKFwiSW5NZW1vcnlXZWJTdG9yYWdlLnNldEl0ZW1cIiwga2V5KTtcbiAgICAgICAgdGhpcy5fZGF0YVtrZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlSXRlbShrZXkpe1xuICAgICAgICBMb2cuZGVidWcoXCJJbk1lbW9yeVdlYlN0b3JhZ2UucmVtb3ZlSXRlbVwiLCBrZXkpO1xuICAgICAgICBkZWxldGUgdGhpcy5fZGF0YVtrZXldO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLl9kYXRhKS5sZW5ndGg7XG4gICAgfVxuXG4gICAga2V5KGluZGV4KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLl9kYXRhKVtpbmRleF07XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuLy8gSldUIHBhcnNpbmcgYW5kIHZhbGlkYXRpb24uXG4vLyAtIFNpZ25hdHVyZXMgYXJlIHZlcmlmaWVkIHdpdGggV2ViQ3J5cHRvIChjcnlwdG8uc3VidGxlKTogUlMvUFMvRVMgMjU2LzM4NC81MTIuXG4vLyAtIEhhc2hpbmcgKGF0X2hhc2ggLyBjX2hhc2ggLyBQS0NFKSB1c2VzIGNyeXB0by1qcy5cbi8vIC0gQmFzZTY0IGRlY29kaW5nIHVzZXMgYmFzZTY0LWpzLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgU0hBMjU2IGZyb20gJ2NyeXB0by1qcy9zaGEyNTYuanMnO1xuaW1wb3J0IFNIQTM4NCBmcm9tICdjcnlwdG8tanMvc2hhMzg0LmpzJztcbmltcG9ydCBTSEE1MTIgZnJvbSAnY3J5cHRvLWpzL3NoYTUxMi5qcyc7XG5pbXBvcnQgSGV4IGZyb20gJ2NyeXB0by1qcy9lbmMtaGV4LmpzJztcbmltcG9ydCBCYXNlNjQgZnJvbSAnY3J5cHRvLWpzL2VuYy1iYXNlNjQuanMnO1xuaW1wb3J0IHsgdG9CeXRlQXJyYXkgfSBmcm9tICdiYXNlNjQtanMnO1xuXG5jb25zdCBBbGxvd2VkU2lnbmluZ0FsZ3MgPSBbJ1JTMjU2JywgJ1JTMzg0JywgJ1JTNTEyJywgJ1BTMjU2JywgJ1BTMzg0JywgJ1BTNTEyJywgJ0VTMjU2JywgJ0VTMzg0JywgJ0VTNTEyJ107XG5cbi8vIE9ubHkgYXN5bW1ldHJpYyBzaWduYXR1cmVzIGZyb20gdGhlIGFsbG93bGlzdCBhcmUgYWNjZXB0ZWQuIFwibm9uZVwiICh1bnNpZ25lZCkgYW5kIEhTKlxuLy8gKHdoaWNoIHdvdWxkIHRyZWF0IHRoZSBwdWJsaWMga2V5IGFzIGFuIEhNQUMgc2VjcmV0KSBhcmUgcmVqZWN0ZWQgZXhwbGljaXRseSwgd2hhdGV2ZXJcbi8vIHRoZWlyIGNhc2UsIHNvIHRoaXMgZG9lcyBub3QgZGVwZW5kIG9uIHRoZSBhbGxvd2xpc3QgYWxvbmUuXG5mdW5jdGlvbiBhc3NlcnRBbGxvd2VkQWxnKGFsZykge1xuICAgIGlmICh0eXBlb2YgYWxnICE9PSAnc3RyaW5nJyB8fCAhYWxnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBvciBpbnZhbGlkIEpXVCBhbGcnKTtcbiAgICB9XG4gICAgaWYgKGFsZy50b0xvd2VyQ2FzZSgpID09PSAnbm9uZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnNpZ25lZCBKV1QgKGFsZyBcIm5vbmVcIikgaXMgbm90IGFsbG93ZWQnKTtcbiAgICB9XG4gICAgaWYgKEFsbG93ZWRTaWduaW5nQWxncy5pbmRleE9mKGFsZykgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV1QgYWxnOiAnICsgYWxnKTtcbiAgICB9XG4gICAgcmV0dXJuIGFsZztcbn1cblxuY29uc3QgSGFzaGVycyA9IHsgc2hhMjU2OiBTSEEyNTYsIHNoYTM4NDogU0hBMzg0LCBzaGE1MTI6IFNIQTUxMiB9O1xuXG5mdW5jdGlvbiBiNjRUb0J5dGVzKHMpIHtcbiAgICBzID0gcy5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgd2hpbGUgKHMubGVuZ3RoICUgNCkge1xuICAgICAgICBzICs9ICc9JztcbiAgICB9XG4gICAgcmV0dXJuIHRvQnl0ZUFycmF5KHMpO1xufVxuXG5mdW5jdGlvbiB1dGY4RGVjb2RlKGJ5dGVzKSB7XG4gICAgbGV0IGVzY2FwZWQgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVzY2FwZWQgKz0gJyUnICsgKCcwJyArIGJ5dGVzW2ldLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZWQpO1xufVxuXG5mdW5jdGlvbiBiNjR1VG9Kc29uKHMpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh1dGY4RGVjb2RlKGI2NFRvQnl0ZXMocykpKTtcbn1cblxuLy8gVGhlIEpXUyBzaWduaW5nIGlucHV0IGlzIGJhc2U2NHVybCB0ZXh0LCBpLmUuIHB1cmUgQVNDSUlcbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyhzKSB7XG4gICAgY29uc3Qgb3V0ID0gbmV3IFVpbnQ4QXJyYXkocy5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBvdXRbaV0gPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFN1YnRsZSgpIHtcbiAgICBjb25zdCBjID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jcnlwdG8pIHx8XG4gICAgICAgICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcy5jcnlwdG8pIHx8XG4gICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuY3J5cHRvKTtcbiAgICBpZiAoIWMgfHwgIWMuc3VidGxlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViQ3J5cHRvIChjcnlwdG8uc3VidGxlKSBpcyBub3QgYXZhaWxhYmxlOyBhIHNlY3VyZSBjb250ZXh0IChodHRwcykgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGMuc3VidGxlO1xufVxuXG4vLyBNaW5pbWFsIERFUiByZWFkZXI6IHJldHVybnMgdGFnLCBjb250ZW50IHN0YXJ0L2VuZCBhbmQgdGhlIGZ1bGwgZWxlbWVudCBlbmRcbmZ1bmN0aW9uIHJlYWRUbHYoYnl0ZXMsIG9mZnNldCkge1xuICAgIGNvbnN0IHRhZyA9IGJ5dGVzW29mZnNldF07XG4gICAgbGV0IGxlbiA9IGJ5dGVzW29mZnNldCArIDFdO1xuICAgIGxldCBzdGFydCA9IG9mZnNldCArIDI7XG4gICAgaWYgKGxlbiAmIDB4ODApIHtcbiAgICAgICAgY29uc3QgbiA9IGxlbiAmIDB4N2Y7XG4gICAgICAgIGlmIChuIDwgMSB8fCBuID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBERVIgbGVuZ3RoJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGxlbiA9IChsZW4gKiAyNTYpICsgYnl0ZXNbc3RhcnQgKyBpXTtcbiAgICAgICAgfVxuICAgICAgICBzdGFydCArPSBuO1xuICAgIH1cbiAgICBjb25zdCBlbmQgPSBzdGFydCArIGxlbjtcbiAgICBpZiAoZW5kID4gYnl0ZXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHJ1bmNhdGVkIERFUiBlbGVtZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiB7IHRhZywgc3RhcnQsIGVuZCB9O1xufVxuXG4vLyBFeHRyYWN0cyB0aGUgREVSIFN1YmplY3RQdWJsaWNLZXlJbmZvIGZyb20gYSBERVIgWC41MDkgY2VydGlmaWNhdGVcbmZ1bmN0aW9uIHNwa2lGcm9tQ2VydGlmaWNhdGUoZGVyKSB7XG4gICAgY29uc3QgY2VydCA9IHJlYWRUbHYoZGVyLCAwKTtcbiAgICBpZiAoY2VydC50YWcgIT09IDB4MzApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNlcnRpZmljYXRlJyk7XG4gICAgfVxuICAgIGNvbnN0IHRicyA9IHJlYWRUbHYoZGVyLCBjZXJ0LnN0YXJ0KTtcbiAgICBpZiAodGJzLnRhZyAhPT0gMHgzMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY2VydGlmaWNhdGUnKTtcbiAgICB9XG4gICAgbGV0IHBvcyA9IHRicy5zdGFydDtcbiAgICBsZXQgZWwgPSByZWFkVGx2KGRlciwgcG9zKTtcbiAgICBpZiAoZWwudGFnID09PSAweGEwKSB7IC8vIFswXSB2ZXJzaW9uXG4gICAgICAgIHBvcyA9IGVsLmVuZDtcbiAgICAgICAgZWwgPSByZWFkVGx2KGRlciwgcG9zKTtcbiAgICB9XG4gICAgLy8gc2VyaWFsTnVtYmVyLCBzaWduYXR1cmUsIGlzc3VlciwgdmFsaWRpdHksIHN1YmplY3RcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBwb3MgPSBlbC5lbmQ7XG4gICAgICAgIGVsID0gcmVhZFRsdihkZXIsIHBvcyk7XG4gICAgfVxuICAgIGlmIChlbC50YWcgIT09IDB4MzApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNlcnRpZmljYXRlOiBzdWJqZWN0UHVibGljS2V5SW5mbyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlci5zbGljZShwb3MsIGVsLmVuZCk7XG59XG5cbi8vIE5vcm1hbGl6ZXMgYSBKV0sgaW50byB3aGF0IFdlYkNyeXB0byBpbXBvcnRLZXkgYWNjZXB0cy5cbi8vIEV4dHJhIG1lbWJlcnMgKGFsZywgdXNlLCBrZXlfb3BzLCBraWQsIHg1dC4uLikgYXJlIGRyb3BwZWQgYmVjYXVzZSB0aGV5IGNhbiBtYWtlIGltcG9ydEtleSByZWplY3QuXG5mdW5jdGlvbiByZXNvbHZlS2V5KGtleSkge1xuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQga2V5IHR5cGU6ICcgKyBrZXkpO1xuICAgIH1cbiAgICBpZiAoa2V5Lmt0eSA9PT0gJ1JTQScpIHtcbiAgICAgICAgaWYgKGtleS5lICYmIGtleS5uKSB7XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdSU0EnLCBmb3JtYXQ6ICdqd2snLCBkYXRhOiB7IGt0eTogJ1JTQScsIG46IGtleS5uLCBlOiBrZXkuZSwgZXh0OiB0cnVlIH0gfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5Lng1YyAmJiBrZXkueDVjLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHsga3R5OiAnUlNBJywgZm9ybWF0OiAnc3BraScsIGRhdGE6IHNwa2lGcm9tQ2VydGlmaWNhdGUoYjY0VG9CeXRlcyhrZXkueDVjWzBdKSkgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JTQSBrZXkgbWlzc2luZyBrZXkgbWF0ZXJpYWwnKTtcbiAgICB9XG4gICAgaWYgKGtleS5rdHkgPT09ICdFQycpIHtcbiAgICAgICAgaWYgKGtleS5jcnYgJiYga2V5LnggJiYga2V5LnkpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ0VDJywgY3J2OiBrZXkuY3J2LCBmb3JtYXQ6ICdqd2snLCBkYXRhOiB7IGt0eTogJ0VDJywgY3J2OiBrZXkuY3J2LCB4OiBrZXkueCwgeToga2V5LnksIGV4dDogdHJ1ZSB9IH07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFQyBrZXkgbWlzc2luZyBrZXkgbWF0ZXJpYWwnKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBrZXkgdHlwZTogJyArIGtleS5rdHkpO1xufVxuXG4vLyBNYXBzIGEgSldTIGFsZyB0byBXZWJDcnlwdG8gaW1wb3J0L3ZlcmlmeSBwYXJhbWV0ZXJzXG5mdW5jdGlvbiBhbGdQYXJhbXMoYWxnKSB7XG4gICAgY29uc3QgYml0cyA9IGFsZy5zdWJzdHIoMik7XG4gICAgY29uc3QgaGFzaCA9IHsgbmFtZTogJ1NIQS0nICsgYml0cyB9O1xuICAgIHN3aXRjaCAoYWxnLnN1YnN0cigwLCAyKSkge1xuICAgICAgICBjYXNlICdSUyc6XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdSU0EnLCBpbXBvcnRBbGc6IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JywgaGFzaCB9LCB2ZXJpZnlBbGc6IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JyB9IH07XG4gICAgICAgIGNhc2UgJ1BTJzpcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ1JTQScsIGltcG9ydEFsZzogeyBuYW1lOiAnUlNBLVBTUycsIGhhc2ggfSwgdmVyaWZ5QWxnOiB7IG5hbWU6ICdSU0EtUFNTJywgc2FsdExlbmd0aDogcGFyc2VJbnQoYml0cywgMTApIC8gOCB9IH07XG4gICAgICAgIGNhc2UgJ0VTJzoge1xuICAgICAgICAgICAgY29uc3QgY3VydmUgPSB7ICcyNTYnOiAnUC0yNTYnLCAnMzg0JzogJ1AtMzg0JywgJzUxMic6ICdQLTUyMScgfVtiaXRzXTtcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ0VDJywgY3VydmUsIGltcG9ydEFsZzogeyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiBjdXJ2ZSB9LCB2ZXJpZnlBbGc6IHsgbmFtZTogJ0VDRFNBJywgaGFzaCB9IH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBhbGc6ICcgKyBhbGcpO1xufVxuXG5leHBvcnQgY2xhc3MgSm9zZVV0aWwge1xuXG4gICAgc3RhdGljIHBhcnNlSnd0KGp3dCkge1xuICAgICAgICBMb2cuZGVidWcoXCJKb3NlVXRpbC5wYXJzZUp3dFwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gand0LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgSldUJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhlYWRlcjogYjY0dVRvSnNvbihwYXJ0c1swXSksXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogYjY0dVRvSnNvbihwYXJ0c1sxXSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBpc0FsbG93ZWRTaWduaW5nQWxnKGFsZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXNzZXJ0QWxsb3dlZEFsZyhhbGcpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB2YWxpZGF0ZUp3dChqd3QsIGtleSwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3LCBub3csIHRpbWVJbnNlbnNpdGl2ZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJKb3NlVXRpbC52YWxpZGF0ZUp3dFwiKTtcblxuICAgICAgICAvLyBDaGVjayB0aGUgYWxnb3JpdGhtIGFuZCBzaWduYXR1cmUgcHJlc2VuY2UgYmVmb3JlIGFueXRoaW5nIGVsc2UsIHNvIGFuIHVuc2lnbmVkXG4gICAgICAgIC8vIG9yIGRvd25ncmFkZWQgdG9rZW4gaXMgcmVqZWN0ZWQgd2l0aG91dCBpdHMgY2xhaW1zIGV2ZXIgYmVpbmcgY29uc2lkZXJlZFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFydHMgPSB0eXBlb2Ygand0ID09PSAnc3RyaW5nJyA/IGp3dC5zcGxpdCgnLicpIDogW107XG4gICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzIHx8ICFwYXJ0c1syXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSldUIGlzIG5vdCBzaWduZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFsZyA9IGFzc2VydEFsbG93ZWRBbGcoYjY0dVRvSnNvbihwYXJ0c1swXSkuYWxnKTtcbiAgICAgICAgICAgIGlmIChrZXkgJiYga2V5LmFsZyAmJiBrZXkuYWxnICE9PSBhbGcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pXVCBhbGcgJyArIGFsZyArICcgZG9lcyBub3QgbWF0Y2gga2V5IGFsZyAnICsga2V5LmFsZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLnZhbGlkYXRlSnd0OiBcIiArIChlICYmIGUubWVzc2FnZSkpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcInNpZ25hdHVyZSB2YWxpZGF0aW9uIGZhaWxlZDogXCIgKyAoZSAmJiBlLm1lc3NhZ2UpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzb2x2ZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNvbHZlZCA9IHJlc29sdmVLZXkoa2V5KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwudmFsaWRhdGVKd3Q6IFwiICsgKGUgJiYgZS5tZXNzYWdlKSwga2V5KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBKb3NlVXRpbC52YWxpZGF0ZUp3dEF0dHJpYnV0ZXMoand0LCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXcsIG5vdywgdGltZUluc2Vuc2l0aXZlKS50aGVuKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEpvc2VVdGlsLl92ZXJpZnlTaWduYXR1cmUoand0LCByZXNvbHZlZCkudGhlbih2YWxpZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IHNpZ25hdHVyZSB2YWxpZGF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcInNpZ25hdHVyZSB2YWxpZGF0aW9uIGZhaWxlZFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgICAgICAgICAgfSwgZSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKGUgJiYgZS5tZXNzYWdlIHx8IGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzaWduYXR1cmUgdmFsaWRhdGlvbiBmYWlsZWRcIikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdmVyaWZ5U2lnbmF0dXJlKGp3dCwgcmVzb2x2ZWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gand0LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAvLyBjaGVja2VkIGFnYWluIGhlcmUgc28gdGhpcyBwYXRoIGlzIHNhZmUgb24gaXRzIG93blxuICAgICAgICAgICAgY29uc3QgYWxnID0gYXNzZXJ0QWxsb3dlZEFsZyhiNjR1VG9Kc29uKHBhcnRzWzBdKS5hbGcpO1xuICAgICAgICAgICAgaWYgKCFwYXJ0c1syXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSldUIGlzIG5vdCBzaWduZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHAgPSBhbGdQYXJhbXMoYWxnKTtcbiAgICAgICAgICAgIGlmIChwLmt0eSAhPT0gcmVzb2x2ZWQua3R5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXkgdHlwZSAnICsgcmVzb2x2ZWQua3R5ICsgJyBkb2VzIG5vdCBtYXRjaCBhbGcgJyArIGFsZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocC5jdXJ2ZSAmJiByZXNvbHZlZC5jcnYgJiYgcC5jdXJ2ZSAhPT0gcmVzb2x2ZWQuY3J2KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFQyBrZXkgY3VydmUgJyArIHJlc29sdmVkLmNydiArICcgZG9lcyBub3QgbWF0Y2ggYWxnICcgKyBhbGcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3VidGxlID0gZ2V0U3VidGxlKCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXNjaWlUb0J5dGVzKHBhcnRzWzBdICsgJy4nICsgcGFydHNbMV0pO1xuICAgICAgICAgICAgLy8gSldTIEVDRFNBIHNpZ25hdHVyZXMgYXJlIHJhdyByfHxzLCB3aGljaCBpcyB0aGUgZm9ybWF0IFdlYkNyeXB0byBleHBlY3RzXG4gICAgICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBiNjRUb0J5dGVzKHBhcnRzWzJdKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3VidGxlLmltcG9ydEtleShyZXNvbHZlZC5mb3JtYXQsIHJlc29sdmVkLmRhdGEsIHAuaW1wb3J0QWxnLCBmYWxzZSwgWyd2ZXJpZnknXSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oY3J5cHRvS2V5ID0+IHN1YnRsZS52ZXJpZnkocC52ZXJpZnlBbGcsIGNyeXB0b0tleSwgc2lnbmF0dXJlLCBkYXRhKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB2YWxpZGF0ZUp3dEF0dHJpYnV0ZXMoand0LCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXcsIG5vdywgdGltZUluc2Vuc2l0aXZlKSB7XG4gICAgICAgIGlmICghY2xvY2tTa2V3KSB7XG4gICAgICAgICAgICBjbG9ja1NrZXcgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFub3cpIHtcbiAgICAgICAgICAgIG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IEpvc2VVdGlsLnBhcnNlSnd0KGp3dCk7XG4gICAgICAgIGlmICghcGFyc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIEpXVFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHBhcnNlZC5wYXlsb2FkO1xuXG4gICAgICAgIGlmICghcGF5bG9hZC5pc3MpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogaXNzdWVyIHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaXNzdWVyIHdhcyBub3QgcHJvdmlkZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmlzcyAhPT0gaXNzdWVyKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IEludmFsaWQgaXNzdWVyIGluIHRva2VuXCIsIHBheWxvYWQuaXNzKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIGlzc3VlciBpbiB0b2tlbjogXCIgKyBwYXlsb2FkLmlzcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXlsb2FkLmF1ZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBhdWQgd2FzIG5vdCBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhdWQgd2FzIG5vdCBwcm92aWRlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsaWRBdWRpZW5jZSA9IHBheWxvYWQuYXVkID09PSBhdWRpZW5jZSB8fCAoQXJyYXkuaXNBcnJheShwYXlsb2FkLmF1ZCkgJiYgcGF5bG9hZC5hdWQuaW5kZXhPZihhdWRpZW5jZSkgPj0gMCk7XG4gICAgICAgIGlmICghdmFsaWRBdWRpZW5jZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBJbnZhbGlkIGF1ZGllbmNlIGluIHRva2VuXCIsIHBheWxvYWQuYXVkKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIGF1ZGllbmNlIGluIHRva2VuOiBcIiArIHBheWxvYWQuYXVkKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuYXpwICYmIHBheWxvYWQuYXpwICE9PSBhdWRpZW5jZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBJbnZhbGlkIGF6cCBpbiB0b2tlblwiLCBwYXlsb2FkLmF6cCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBhenAgaW4gdG9rZW46IFwiICsgcGF5bG9hZC5henApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGltZUluc2Vuc2l0aXZlKSB7XG4gICAgICAgICAgICBjb25zdCBsb3dlck5vdyA9IG5vdyArIGNsb2NrU2tldztcbiAgICAgICAgICAgIGNvbnN0IHVwcGVyTm93ID0gbm93IC0gY2xvY2tTa2V3O1xuXG4gICAgICAgICAgICBpZiAoIXBheWxvYWQuaWF0KSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBpYXQgd2FzIG5vdCBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaWF0IHdhcyBub3QgcHJvdmlkZWRcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxvd2VyTm93IDwgcGF5bG9hZC5pYXQpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IGlhdCBpcyBpbiB0aGUgZnV0dXJlXCIsIHBheWxvYWQuaWF0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaWF0IGlzIGluIHRoZSBmdXR1cmU6IFwiICsgcGF5bG9hZC5pYXQpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBheWxvYWQubmJmICYmIGxvd2VyTm93IDwgcGF5bG9hZC5uYmYpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IG5iZiBpcyBpbiB0aGUgZnV0dXJlXCIsIHBheWxvYWQubmJmKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwibmJmIGlzIGluIHRoZSBmdXR1cmU6IFwiICsgcGF5bG9hZC5uYmYpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmV4cCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogZXhwIHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImV4cCB3YXMgbm90IHByb3ZpZGVkXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXlsb2FkLmV4cCA8IHVwcGVyTm93KSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBleHAgaXMgaW4gdGhlIHBhc3RcIiwgcGF5bG9hZC5leHApO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJleHAgaXMgaW4gdGhlIHBhc3Q6XCIgKyBwYXlsb2FkLmV4cCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYXlsb2FkKTtcbiAgICB9XG5cbiAgICAvLyBVVEYtOCBpbnB1dCwgbG93ZXJjYXNlIGhleCBvdXRwdXRcbiAgICBzdGF0aWMgaGFzaFN0cmluZyh2YWx1ZSwgYWxnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBoYXNoZXIgPSBIYXNoZXJzW1N0cmluZyhhbGcpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15hLXowLTldL2csICcnKV07XG4gICAgICAgICAgICBpZiAoIWhhc2hlcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgaGFzaCBhbGc6ICcgKyBhbGcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhhc2hlcih2YWx1ZSkudG9TdHJpbmcoSGV4KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGhleFRvQmFzZTY0VXJsKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gQmFzZTY0LnN0cmluZ2lmeShIZXgucGFyc2UodmFsdWUpKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC89KyQvLCAnJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcblxuZXhwb3J0IGNsYXNzIEpzb25TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgYWRkaXRpb25hbENvbnRlbnRUeXBlcyA9IG51bGwsIFxuICAgICAgICBYTUxIdHRwUmVxdWVzdEN0b3IgPSBHbG9iYWwuWE1MSHR0cFJlcXVlc3QsIFxuICAgICAgICBqd3RIYW5kbGVyID0gbnVsbFxuICAgICkge1xuICAgICAgICBpZiAoYWRkaXRpb25hbENvbnRlbnRUeXBlcyAmJiBBcnJheS5pc0FycmF5KGFkZGl0aW9uYWxDb250ZW50VHlwZXMpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50VHlwZXMgPSBhZGRpdGlvbmFsQ29udGVudFR5cGVzLnNsaWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50VHlwZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZW50VHlwZXMucHVzaCgnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICBpZiAoand0SGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFR5cGVzLnB1c2goJ2FwcGxpY2F0aW9uL2p3dCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fWE1MSHR0cFJlcXVlc3QgPSBYTUxIdHRwUmVxdWVzdEN0b3I7XG4gICAgICAgIHRoaXMuX2p3dEhhbmRsZXIgPSBqd3RIYW5kbGVyO1xuICAgIH1cblxuICAgIGdldEpzb24odXJsLCB0b2tlbikge1xuICAgICAgICBpZiAoIXVybCl7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5nZXRKc29uOiBObyB1cmwgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXJsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UuZ2V0SnNvbiwgdXJsOiBcIiwgdXJsKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IHRoaXMuX1hNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXEub3BlbignR0VUJywgdXJsKTtcblxuICAgICAgICAgICAgdmFyIGFsbG93ZWRDb250ZW50VHlwZXMgPSB0aGlzLl9jb250ZW50VHlwZXM7XG4gICAgICAgICAgICB2YXIgand0SGFuZGxlciA9IHRoaXMuX2p3dEhhbmRsZXI7XG5cbiAgICAgICAgICAgIHJlcS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJKc29uU2VydmljZS5nZXRKc29uOiBIVFRQIHJlc3BvbnNlIHJlY2VpdmVkLCBzdGF0dXNcIiwgcmVxLnN0YXR1cyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxLnN0YXR1cyA9PT0gMjAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0gcmVxLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gYWxsb3dlZENvbnRlbnRUeXBlcy5maW5kKGl0ZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUuc3RhcnRzV2l0aChpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IFwiYXBwbGljYXRpb24vand0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqd3RIYW5kbGVyKHJlcSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5nZXRKc29uOiBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiSW52YWxpZCByZXNwb25zZSBDb250ZW50LVR5cGU6IFwiICsgY29udGVudFR5cGUgKyBcIiwgZnJvbSBVUkw6IFwiICsgdXJsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IocmVxLnN0YXR1c1RleHQgKyBcIiAoXCIgKyByZXEuc3RhdHVzICsgXCIpXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLmdldEpzb246IG5ldHdvcmsgZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJKc29uU2VydmljZS5nZXRKc29uOiB0b2tlbiBwYXNzZWQsIHNldHRpbmcgQXV0aG9yaXphdGlvbiBoZWFkZXJcIik7XG4gICAgICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXEuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwb3N0Rm9ybSh1cmwsIHBheWxvYWQsIGJhc2ljQXV0aCkge1xuICAgICAgICBpZiAoIXVybCl7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5wb3N0Rm9ybTogTm8gdXJsIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVybFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIkpzb25TZXJ2aWNlLnBvc3RGb3JtLCB1cmw6IFwiLCB1cmwpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHZhciByZXEgPSBuZXcgdGhpcy5fWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHJlcS5vcGVuKCdQT1NUJywgdXJsKTtcblxuICAgICAgICAgICAgdmFyIGFsbG93ZWRDb250ZW50VHlwZXMgPSB0aGlzLl9jb250ZW50VHlwZXM7XG5cbiAgICAgICAgICAgIHJlcS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJKc29uU2VydmljZS5wb3N0Rm9ybTogSFRUUCByZXNwb25zZSByZWNlaXZlZCwgc3RhdHVzXCIsIHJlcS5zdGF0dXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50VHlwZSA9IHJlcS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGFsbG93ZWRDb250ZW50VHlwZXMuZmluZChpdGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlLnN0YXJ0c1dpdGgoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IEVycm9yIHBhcnNpbmcgSlNPTiByZXNwb25zZVwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IoXCJJbnZhbGlkIHJlc3BvbnNlIENvbnRlbnQtVHlwZTogXCIgKyBjb250ZW50VHlwZSArIFwiLCBmcm9tIFVSTDogXCIgKyB1cmwpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXEuc3RhdHVzID09PSA0MDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSByZXEuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBhbGxvd2VkQ29udGVudFR5cGVzLmZpbmQoaXRlbT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZS5zdGFydHNXaXRoKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZCA9IEpTT04ucGFyc2UocmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkICYmIHBheWxvYWQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBFcnJvciBmcm9tIHNlcnZlcjogXCIsIHBheWxvYWQuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihwYXlsb2FkLmVycm9yKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IEVycm9yIHBhcnNpbmcgSlNPTiByZXNwb25zZVwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IocmVxLnN0YXR1c1RleHQgKyBcIiAoXCIgKyByZXEuc3RhdHVzICsgXCIpXCIpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IG5ldHdvcmsgZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgYm9keSA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGtleSBpbiBwYXlsb2FkKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXlsb2FkW2tleV07XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9keS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ICs9IFwiJlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYm9keSArPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgYm9keSArPSBcIj1cIjtcbiAgICAgICAgICAgICAgICAgICAgYm9keSArPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cbiAgICAgICAgICAgIGlmIChiYXNpY0F1dGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgXCJCYXNpYyBcIiArIGJ0b2EoYmFzaWNBdXRoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcS5zZW5kKGJvZHkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5sZXQgbm9wTG9nZ2VyID0ge1xuICAgIGRlYnVnKCl7fSxcbiAgICBpbmZvKCl7fSxcbiAgICB3YXJuKCl7fSxcbiAgICBlcnJvcigpe31cbn07XG5cbmNvbnN0IE5PTkUgPSAwO1xuY29uc3QgRVJST1IgPSAxO1xuY29uc3QgV0FSTiA9IDI7XG5jb25zdCBJTkZPID0gMztcbmNvbnN0IERFQlVHID0gNDtcblxubGV0IGxvZ2dlcjtcbmxldCBsZXZlbDtcblxuZXhwb3J0IGNsYXNzIExvZyB7XG4gICAgc3RhdGljIGdldCBOT05FKCkge3JldHVybiBOT05FfTtcbiAgICBzdGF0aWMgZ2V0IEVSUk9SKCkge3JldHVybiBFUlJPUn07XG4gICAgc3RhdGljIGdldCBXQVJOKCkge3JldHVybiBXQVJOfTtcbiAgICBzdGF0aWMgZ2V0IElORk8oKSB7cmV0dXJuIElORk99O1xuICAgIHN0YXRpYyBnZXQgREVCVUcoKSB7cmV0dXJuIERFQlVHfTtcbiAgICBcbiAgICBzdGF0aWMgcmVzZXQoKXtcbiAgICAgICAgbGV2ZWwgPSBJTkZPO1xuICAgICAgICBsb2dnZXIgPSBub3BMb2dnZXI7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBnZXQgbGV2ZWwoKXtcbiAgICAgICAgcmV0dXJuIGxldmVsO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IGxldmVsKHZhbHVlKXtcbiAgICAgICAgaWYgKE5PTkUgPD0gdmFsdWUgJiYgdmFsdWUgPD0gREVCVUcpe1xuICAgICAgICAgICAgbGV2ZWwgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbG9nIGxldmVsXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBnZXQgbG9nZ2VyKCl7XG4gICAgICAgIHJldHVybiBsb2dnZXI7XG4gICAgfVxuICAgIHN0YXRpYyBzZXQgbG9nZ2VyKHZhbHVlKXtcbiAgICAgICAgaWYgKCF2YWx1ZS5kZWJ1ZyAmJiB2YWx1ZS5pbmZvKSB7XG4gICAgICAgICAgICAvLyBqdXN0IHRvIHN0YXkgYmFja3dhcmRzIGNvbXBhdC4gY2FuIHJlbW92ZSBpbiAyLjBcbiAgICAgICAgICAgIHZhbHVlLmRlYnVnID0gdmFsdWUuaW5mbztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5kZWJ1ZyAmJiB2YWx1ZS5pbmZvICYmIHZhbHVlLndhcm4gJiYgdmFsdWUuZXJyb3Ipe1xuICAgICAgICAgICAgbG9nZ2VyID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvZ2dlclwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZGVidWcoLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBERUJVRyl7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcuYXBwbHkobG9nZ2VyLCBBcnJheS5mcm9tKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaW5mbyguLi5hcmdzKXtcbiAgICAgICAgaWYgKGxldmVsID49IElORk8pe1xuICAgICAgICAgICAgbG9nZ2VyLmluZm8uYXBwbHkobG9nZ2VyLCBBcnJheS5mcm9tKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgd2FybiguLi5hcmdzKXtcbiAgICAgICAgaWYgKGxldmVsID49IFdBUk4pe1xuICAgICAgICAgICAgbG9nZ2VyLndhcm4uYXBwbHkobG9nZ2VyLCBBcnJheS5mcm9tKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZXJyb3IoLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBFUlJPUil7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IuYXBwbHkobG9nZ2VyLCBBcnJheS5mcm9tKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTG9nLnJlc2V0KCk7XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBKc29uU2VydmljZSB9IGZyb20gJy4vSnNvblNlcnZpY2UuanMnO1xuXG5jb25zdCBPaWRjTWV0YWRhdGFVcmxQYXRoID0gJy53ZWxsLWtub3duL29wZW5pZC1jb25maWd1cmF0aW9uJztcblxuZXhwb3J0IGNsYXNzIE1ldGFkYXRhU2VydmljZSB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIEpzb25TZXJ2aWNlQ3RvciA9IEpzb25TZXJ2aWNlKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk1ldGFkYXRhU2VydmljZTogTm8gc2V0dGluZ3MgcGFzc2VkIHRvIE1ldGFkYXRhU2VydmljZVwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldHRpbmdzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgdGhpcy5fanNvblNlcnZpY2UgPSBuZXcgSnNvblNlcnZpY2VDdG9yKFsnYXBwbGljYXRpb24vandrLXNldCtqc29uJ10pO1xuICAgIH1cblxuICAgIGdldCBtZXRhZGF0YVVybCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tZXRhZGF0YVVybCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhVXJsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgPSB0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YVVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsID0gdGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21ldGFkYXRhVXJsICYmIHRoaXMuX21ldGFkYXRhVXJsLmluZGV4T2YoT2lkY01ldGFkYXRhVXJsUGF0aCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybFt0aGlzLl9tZXRhZGF0YVVybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YVVybCArPSAnLyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gT2lkY01ldGFkYXRhVXJsUGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFVcmw7XG4gICAgfVxuXG4gICAgcmVzZXRTaWduaW5nS2V5cygpIHtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSB0aGlzLl9zZXR0aW5ncyB8fCB7fVxuICAgICAgICB0aGlzLl9zZXR0aW5ncy5zaWduaW5nS2V5cyA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGdldE1ldGFkYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MubWV0YWRhdGEpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YTogUmV0dXJuaW5nIG1ldGFkYXRhIGZyb20gc2V0dGluZ3NcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tZXRhZGF0YVVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiTWV0YWRhdGFTZXJ2aWNlLmdldE1ldGFkYXRhOiBObyBhdXRob3JpdHkgb3IgbWV0YWRhdGFVcmwgY29uZmlndXJlZCBvbiBzZXR0aW5nc1wiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBhdXRob3JpdHkgb3IgbWV0YWRhdGFVcmwgY29uZmlndXJlZCBvbiBzZXR0aW5nc1wiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGE6IGdldHRpbmcgbWV0YWRhdGEgZnJvbVwiLCB0aGlzLm1ldGFkYXRhVXJsKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UuZ2V0SnNvbih0aGlzLm1ldGFkYXRhVXJsKVxuICAgICAgICAgICAgLnRoZW4obWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YToganNvbiByZWNlaXZlZFwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgc2VlZCA9IHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhU2VlZCB8fCB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHNlZWQsIG1ldGFkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MubWV0YWRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJc3N1ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiaXNzdWVyXCIpO1xuICAgIH1cblxuICAgIGdldEF1dGhvcml6YXRpb25FbmRwb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJhdXRob3JpemF0aW9uX2VuZHBvaW50XCIpO1xuICAgIH1cblxuICAgIGdldFVzZXJJbmZvRW5kcG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwidXNlcmluZm9fZW5kcG9pbnRcIik7XG4gICAgfVxuXG4gICAgZ2V0VG9rZW5FbmRwb2ludChvcHRpb25hbD10cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwidG9rZW5fZW5kcG9pbnRcIiwgb3B0aW9uYWwpO1xuICAgIH1cblxuICAgIGdldENoZWNrU2Vzc2lvbklmcmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJjaGVja19zZXNzaW9uX2lmcmFtZVwiLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRFbmRTZXNzaW9uRW5kcG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiZW5kX3Nlc3Npb25fZW5kcG9pbnRcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0UmV2b2NhdGlvbkVuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcInJldm9jYXRpb25fZW5kcG9pbnRcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0S2V5c0VuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcImp3a3NfdXJpXCIsIHRydWUpO1xuICAgIH1cblxuICAgIF9nZXRNZXRhZGF0YVByb3BlcnR5KG5hbWUsIG9wdGlvbmFsPWZhbHNlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5IGZvcjogXCIgKyBuYW1lKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNZXRhZGF0YSgpLnRoZW4obWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiTWV0YWRhdGFTZXJ2aWNlLmdldE1ldGFkYXRhUHJvcGVydHk6IG1ldGFkYXRhIHJlY2lldmVkXCIpO1xuXG4gICAgICAgICAgICBpZiAobWV0YWRhdGFbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy53YXJuKFwiTWV0YWRhdGFTZXJ2aWNlLmdldE1ldGFkYXRhUHJvcGVydHk6IE1ldGFkYXRhIGRvZXMgbm90IGNvbnRhaW4gb3B0aW9uYWwgcHJvcGVydHkgXCIgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5OiBNZXRhZGF0YSBkb2VzIG5vdCBjb250YWluIHByb3BlcnR5IFwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGFkYXRhIGRvZXMgbm90IGNvbnRhaW4gcHJvcGVydHkgXCIgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YVtuYW1lXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U2lnbmluZ0tleXMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaWduaW5nS2V5cykge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiTWV0YWRhdGFTZXJ2aWNlLmdldFNpZ25pbmdLZXlzOiBSZXR1cm5pbmcgc2lnbmluZ0tleXMgZnJvbSBzZXR0aW5nc1wiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJqd2tzX3VyaVwiKS50aGVuKGp3a3NfdXJpID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5czogandrc191cmkgcmVjZWl2ZWRcIiwgandrc191cmkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UuZ2V0SnNvbihqd2tzX3VyaSkudGhlbihrZXlTZXQgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5czoga2V5IHNldCByZWNlaXZlZFwiLCBrZXlTZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFrZXlTZXQua2V5cykge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXM6IE1pc3Npbmcga2V5cyBvbiBrZXlzZXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3Npbmcga2V5cyBvbiBrZXlzZXRcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMgPSBrZXlTZXQua2V5cztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudFNldHRpbmdzIH0gZnJvbSAnLi9PaWRjQ2xpZW50U2V0dGluZ3MuanMnO1xuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4vRXJyb3JSZXNwb25zZS5qcyc7XG5pbXBvcnQgeyBTaWduaW5SZXF1ZXN0IH0gZnJvbSAnLi9TaWduaW5SZXF1ZXN0LmpzJztcbmltcG9ydCB7IFNpZ25pblJlc3BvbnNlIH0gZnJvbSAnLi9TaWduaW5SZXNwb25zZS5qcyc7XG5pbXBvcnQgeyBTaWdub3V0UmVxdWVzdCB9IGZyb20gJy4vU2lnbm91dFJlcXVlc3QuanMnO1xuaW1wb3J0IHsgU2lnbm91dFJlc3BvbnNlIH0gZnJvbSAnLi9TaWdub3V0UmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgU2lnbmluU3RhdGUgfSBmcm9tICcuL1NpZ25pblN0YXRlLmpzJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi9TdGF0ZS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBPaWRjQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIGlmIChzZXR0aW5ncyBpbnN0YW5jZW9mIE9pZGNDbGllbnRTZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gbmV3IE9pZGNDbGllbnRTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgX3N0YXRlU3RvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnN0YXRlU3RvcmU7XG4gICAgfVxuICAgIGdldCBfdmFsaWRhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy52YWxpZGF0b3I7XG4gICAgfVxuICAgIGdldCBfbWV0YWRhdGFTZXJ2aWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5tZXRhZGF0YVNlcnZpY2U7XG4gICAgfVxuXG4gICAgZ2V0IHNldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3M7XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVNlcnZpY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2U7XG4gICAgfVxuXG4gICAgY3JlYXRlU2lnbmluUmVxdWVzdCh7XG4gICAgICAgIHJlc3BvbnNlX3R5cGUsIHNjb3BlLCByZWRpcmVjdF91cmksXG4gICAgICAgIC8vIGRhdGEgd2FzIG1lYW50IHRvIGJlIHRoZSBwbGFjZSBhIGNhbGxlciBjb3VsZCBpbmRpY2F0ZSB0aGUgZGF0YSB0b1xuICAgICAgICAvLyBoYXZlIHJvdW5kIHRyaXBwZWQsIGJ1dCBwZW9wbGUgd2VyZSBnZXR0aW5nIGNvbmZ1c2VkLCBzbyBpIGFkZGVkIHN0YXRlIChzaW5jZSB0aGF0IG1hdGNoZXMgdGhlIHNwZWMpXG4gICAgICAgIC8vIGFuZCBzbyBub3cgaWYgZGF0YSBpcyBub3QgcGFzc2VkLCBidXQgc3RhdGUgaXMgdGhlbiBzdGF0ZSB3aWxsIGJlIHVzZWRcbiAgICAgICAgZGF0YSwgc3RhdGUsIHByb21wdCwgZGlzcGxheSwgbWF4X2FnZSwgdWlfbG9jYWxlcywgaWRfdG9rZW5faGludCwgbG9naW5faGludCwgYWNyX3ZhbHVlcyxcbiAgICAgICAgcmVzb3VyY2UsIHJlcXVlc3QsIHJlcXVlc3RfdXJpLCByZXNwb25zZV9tb2RlLCBleHRyYVF1ZXJ5UGFyYW1zLCBleHRyYVRva2VuUGFyYW1zLCByZXF1ZXN0X3R5cGUsIHNraXBVc2VySW5mbyB9ID0ge30sXG4gICAgICAgIHN0YXRlU3RvcmVcbiAgICApIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5jcmVhdGVTaWduaW5SZXF1ZXN0XCIpO1xuXG4gICAgICAgIGxldCBjbGllbnRfaWQgPSB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgICAgIHJlc3BvbnNlX3R5cGUgPSByZXNwb25zZV90eXBlIHx8IHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX3R5cGU7XG4gICAgICAgIHNjb3BlID0gc2NvcGUgfHwgdGhpcy5fc2V0dGluZ3Muc2NvcGU7XG4gICAgICAgIHJlZGlyZWN0X3VyaSA9IHJlZGlyZWN0X3VyaSB8fCB0aGlzLl9zZXR0aW5ncy5yZWRpcmVjdF91cmk7XG5cbiAgICAgICAgLy8gaWRfdG9rZW5faGludCwgbG9naW5faGludCBhcmVuJ3QgYWxsb3dlZCBvbiBfc2V0dGluZ3NcbiAgICAgICAgcHJvbXB0ID0gcHJvbXB0IHx8IHRoaXMuX3NldHRpbmdzLnByb21wdDtcbiAgICAgICAgZGlzcGxheSA9IGRpc3BsYXkgfHwgdGhpcy5fc2V0dGluZ3MuZGlzcGxheTtcbiAgICAgICAgbWF4X2FnZSA9IG1heF9hZ2UgfHwgdGhpcy5fc2V0dGluZ3MubWF4X2FnZTtcbiAgICAgICAgdWlfbG9jYWxlcyA9IHVpX2xvY2FsZXMgfHwgdGhpcy5fc2V0dGluZ3MudWlfbG9jYWxlcztcbiAgICAgICAgYWNyX3ZhbHVlcyA9IGFjcl92YWx1ZXMgfHwgdGhpcy5fc2V0dGluZ3MuYWNyX3ZhbHVlcztcbiAgICAgICAgcmVzb3VyY2UgPSByZXNvdXJjZSB8fCB0aGlzLl9zZXR0aW5ncy5yZXNvdXJjZTtcbiAgICAgICAgcmVzcG9uc2VfbW9kZSA9IHJlc3BvbnNlX21vZGUgfHwgdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZTtcbiAgICAgICAgZXh0cmFRdWVyeVBhcmFtcyA9IGV4dHJhUXVlcnlQYXJhbXMgfHwgdGhpcy5fc2V0dGluZ3MuZXh0cmFRdWVyeVBhcmFtcztcbiAgICAgICAgZXh0cmFUb2tlblBhcmFtcyA9IGV4dHJhVG9rZW5QYXJhbXMgfHwgdGhpcy5fc2V0dGluZ3MuZXh0cmFUb2tlblBhcmFtcztcblxuICAgICAgICBsZXQgYXV0aG9yaXR5ID0gdGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5O1xuXG4gICAgICAgIGlmIChTaWduaW5SZXF1ZXN0LmlzQ29kZShyZXNwb25zZV90eXBlKSAmJiByZXNwb25zZV90eXBlICE9PSBcImNvZGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk9wZW5JRCBDb25uZWN0IGh5YnJpZCBmbG93IGlzIG5vdCBzdXBwb3J0ZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRBdXRob3JpemF0aW9uRW5kcG9pbnQoKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25pblJlcXVlc3Q6IFJlY2VpdmVkIGF1dGhvcml6YXRpb24gZW5kcG9pbnRcIiwgdXJsKTtcblxuICAgICAgICAgICAgbGV0IHNpZ25pblJlcXVlc3QgPSBuZXcgU2lnbmluUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIGNsaWVudF9pZCxcbiAgICAgICAgICAgICAgICByZWRpcmVjdF91cmksXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VfdHlwZSxcbiAgICAgICAgICAgICAgICBzY29wZSxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhIHx8IHN0YXRlLFxuICAgICAgICAgICAgICAgIGF1dGhvcml0eSxcbiAgICAgICAgICAgICAgICBwcm9tcHQsIGRpc3BsYXksIG1heF9hZ2UsIHVpX2xvY2FsZXMsIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQsIGFjcl92YWx1ZXMsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UsIHJlcXVlc3QsIHJlcXVlc3RfdXJpLCBleHRyYVF1ZXJ5UGFyYW1zLCBleHRyYVRva2VuUGFyYW1zLCByZXF1ZXN0X3R5cGUsIHJlc3BvbnNlX21vZGUsXG4gICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogdGhpcy5fc2V0dGluZ3MuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICBza2lwVXNlckluZm9cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc2lnbmluU3RhdGUgPSBzaWduaW5SZXF1ZXN0LnN0YXRlO1xuICAgICAgICAgICAgc3RhdGVTdG9yZSA9IHN0YXRlU3RvcmUgfHwgdGhpcy5fc3RhdGVTdG9yZTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlU3RvcmUuc2V0KHNpZ25pblN0YXRlLmlkLCBzaWduaW5TdGF0ZS50b1N0b3JhZ2VTdHJpbmcoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpZ25pblJlcXVlc3Q7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZFNpZ25pblJlc3BvbnNlU3RhdGUodXJsLCBzdGF0ZVN0b3JlLCByZW1vdmVTdGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucmVhZFNpZ25pblJlc3BvbnNlU3RhdGVcIik7XG5cbiAgICAgICAgbGV0IHVzZVF1ZXJ5ID0gdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZSA9PT0gXCJxdWVyeVwiIHx8IFxuICAgICAgICAgICAgKCF0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV9tb2RlICYmIFNpZ25pblJlcXVlc3QuaXNDb2RlKHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX3R5cGUpKTtcbiAgICAgICAgbGV0IGRlbGltaXRlciA9IHVzZVF1ZXJ5ID8gXCI/XCIgOiBcIiNcIjtcblxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBuZXcgU2lnbmluUmVzcG9uc2UodXJsLCBkZWxpbWl0ZXIpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2Uuc3RhdGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnQucmVhZFNpZ25pblJlc3BvbnNlU3RhdGU6IE5vIHN0YXRlIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHN0YXRlIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgdmFyIHN0YXRlQXBpID0gcmVtb3ZlU3RhdGUgPyBzdGF0ZVN0b3JlLnJlbW92ZS5iaW5kKHN0YXRlU3RvcmUpIDogc3RhdGVTdG9yZS5nZXQuYmluZChzdGF0ZVN0b3JlKTtcblxuICAgICAgICByZXR1cm4gc3RhdGVBcGkocmVzcG9uc2Uuc3RhdGUpLnRoZW4oc3RvcmVkU3RhdGVTdHJpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdG9yZWRTdGF0ZVN0cmluZykge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnQucmVhZFNpZ25pblJlc3BvbnNlU3RhdGU6IE5vIG1hdGNoaW5nIHN0YXRlIGZvdW5kIGluIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbWF0Y2hpbmcgc3RhdGUgZm91bmQgaW4gc3RvcmFnZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN0YXRlID0gU2lnbmluU3RhdGUuZnJvbVN0b3JhZ2VTdHJpbmcoc3RvcmVkU3RhdGVTdHJpbmcpO1xuICAgICAgICAgICAgcmV0dXJuIHtzdGF0ZSwgcmVzcG9uc2V9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9jZXNzU2lnbmluUmVzcG9uc2UodXJsLCBzdGF0ZVN0b3JlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucHJvY2Vzc1NpZ25pblJlc3BvbnNlXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRTaWduaW5SZXNwb25zZVN0YXRlKHVybCwgc3RhdGVTdG9yZSwgdHJ1ZSkudGhlbigoe3N0YXRlLCByZXNwb25zZX0pID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucHJvY2Vzc1NpZ25pblJlc3BvbnNlOiBSZWNlaXZlZCBzdGF0ZSBmcm9tIHN0b3JhZ2U7IHZhbGlkYXRpbmcgcmVzcG9uc2VcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2Uoc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlU2lnbm91dFJlcXVlc3Qoe2lkX3Rva2VuX2hpbnQsIGRhdGEsIHN0YXRlLCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmksIGV4dHJhUXVlcnlQYXJhbXMsIHJlcXVlc3RfdHlwZSB9ID0ge30sXG4gICAgICAgIHN0YXRlU3RvcmVcbiAgICApIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5jcmVhdGVTaWdub3V0UmVxdWVzdFwiKTtcblxuICAgICAgICBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgPSBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgfHwgdGhpcy5fc2V0dGluZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgICAgICBleHRyYVF1ZXJ5UGFyYW1zID0gZXh0cmFRdWVyeVBhcmFtcyB8fCB0aGlzLl9zZXR0aW5ncy5leHRyYVF1ZXJ5UGFyYW1zO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0RW5kU2Vzc2lvbkVuZHBvaW50KCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25vdXRSZXF1ZXN0OiBObyBlbmQgc2Vzc2lvbiBlbmRwb2ludCB1cmwgcmV0dXJuZWRcIik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gZW5kIHNlc3Npb24gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbm91dFJlcXVlc3Q6IFJlY2VpdmVkIGVuZCBzZXNzaW9uIGVuZHBvaW50XCIsIHVybCk7XG5cbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFNpZ25vdXRSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgaWRfdG9rZW5faGludCxcbiAgICAgICAgICAgICAgICBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmksXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSB8fCBzdGF0ZSxcbiAgICAgICAgICAgICAgICBleHRyYVF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RfdHlwZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBzaWdub3V0U3RhdGUgPSByZXF1ZXN0LnN0YXRlO1xuICAgICAgICAgICAgaWYgKHNpZ25vdXRTdGF0ZSkge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbm91dFJlcXVlc3Q6IFNpZ25vdXQgcmVxdWVzdCBoYXMgc3RhdGUgdG8gcGVyc2lzdFwiKTtcblxuICAgICAgICAgICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG4gICAgICAgICAgICAgICAgc3RhdGVTdG9yZS5zZXQoc2lnbm91dFN0YXRlLmlkLCBzaWdub3V0U3RhdGUudG9TdG9yYWdlU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlKHVybCwgc3RhdGVTdG9yZSwgcmVtb3ZlU3RhdGUgPSBmYWxzZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZVwiKTtcblxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBuZXcgU2lnbm91dFJlc3BvbnNlKHVybCk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uuc3RhdGUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlOiBObyBzdGF0ZSBpbiByZXNwb25zZVwiKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgTG9nLndhcm4oXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZTogUmVzcG9uc2Ugd2FzIGVycm9yOiBcIiwgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3JSZXNwb25zZShyZXNwb25zZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtzdGF0ZTogdW5kZWZpbmVkLCByZXNwb25zZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXRlS2V5ID0gcmVzcG9uc2Uuc3RhdGU7XG5cbiAgICAgICAgc3RhdGVTdG9yZSA9IHN0YXRlU3RvcmUgfHwgdGhpcy5fc3RhdGVTdG9yZTtcblxuICAgICAgICB2YXIgc3RhdGVBcGkgPSByZW1vdmVTdGF0ZSA/IHN0YXRlU3RvcmUucmVtb3ZlLmJpbmQoc3RhdGVTdG9yZSkgOiBzdGF0ZVN0b3JlLmdldC5iaW5kKHN0YXRlU3RvcmUpO1xuICAgICAgICByZXR1cm4gc3RhdGVBcGkoc3RhdGVLZXkpLnRoZW4oc3RvcmVkU3RhdGVTdHJpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdG9yZWRTdGF0ZVN0cmluZykge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnQucmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlOiBObyBtYXRjaGluZyBzdGF0ZSBmb3VuZCBpbiBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1hdGNoaW5nIHN0YXRlIGZvdW5kIGluIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IFN0YXRlLmZyb21TdG9yYWdlU3RyaW5nKHN0b3JlZFN0YXRlU3RyaW5nKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtzdGF0ZSwgcmVzcG9uc2V9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9jZXNzU2lnbm91dFJlc3BvbnNlKHVybCwgc3RhdGVTdG9yZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWdub3V0UmVzcG9uc2VcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlKHVybCwgc3RhdGVTdG9yZSwgdHJ1ZSkudGhlbigoe3N0YXRlLCByZXNwb25zZX0pID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucHJvY2Vzc1NpZ25vdXRSZXNwb25zZTogUmVjZWl2ZWQgc3RhdGUgZnJvbSBzdG9yYWdlOyB2YWxpZGF0aW5nIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3IudmFsaWRhdGVTaWdub3V0UmVzcG9uc2Uoc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQucHJvY2Vzc1NpZ25vdXRSZXNwb25zZTogTm8gc3RhdGUgZnJvbSBzdG9yYWdlOyBza2lwcGluZyB2YWxpZGF0aW5nIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJTdGFsZVN0YXRlKHN0YXRlU3RvcmUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5jbGVhclN0YWxlU3RhdGVcIik7XG5cbiAgICAgICAgc3RhdGVTdG9yZSA9IHN0YXRlU3RvcmUgfHwgdGhpcy5fc3RhdGVTdG9yZTtcblxuICAgICAgICByZXR1cm4gU3RhdGUuY2xlYXJTdGFsZVN0YXRlKHN0YXRlU3RvcmUsIHRoaXMuc2V0dGluZ3Muc3RhbGVTdGF0ZUFnZSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgQ2xvY2tTZXJ2aWNlIH0gZnJvbSAnLi9DbG9ja1NlcnZpY2UuanMnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZVN0YXRlU3RvcmUgfSBmcm9tICcuL1dlYlN0b3JhZ2VTdGF0ZVN0b3JlLmpzJztcbmltcG9ydCB7IFJlc3BvbnNlVmFsaWRhdG9yIH0gZnJvbSAnLi9SZXNwb25zZVZhbGlkYXRvci5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL01ldGFkYXRhU2VydmljZS5qcyc7XG5cbmNvbnN0IE9pZGNNZXRhZGF0YVVybFBhdGggPSAnLndlbGwta25vd24vb3BlbmlkLWNvbmZpZ3VyYXRpb24nO1xuXG5jb25zdCBEZWZhdWx0UmVzcG9uc2VUeXBlID0gXCJpZF90b2tlblwiO1xuY29uc3QgRGVmYXVsdFNjb3BlID0gXCJvcGVuaWRcIjtcbmNvbnN0IERlZmF1bHRDbGllbnRBdXRoZW50aWNhdGlvbiA9IFwiY2xpZW50X3NlY3JldF9wb3N0XCIgLy8gVGhlIGRlZmF1bHQgdmFsdWUgbXVzdCBiZSBjbGllbnRfc2VjcmV0X2Jhc2ljLCBhcyBleHBsYWluZWQgaW4gaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjQ2xpZW50QXV0aGVudGljYXRpb25cbmNvbnN0IERlZmF1bHRTdGFsZVN0YXRlQWdlID0gNjAgKiAxNTsgLy8gc2Vjb25kc1xuY29uc3QgRGVmYXVsdENsb2NrU2tld0luU2Vjb25kcyA9IDYwICogNTtcblxuZXhwb3J0IGNsYXNzIE9pZGNDbGllbnRTZXR0aW5ncyB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICAvLyBtZXRhZGF0YSByZWxhdGVkXG4gICAgICAgIGF1dGhvcml0eSwgbWV0YWRhdGFVcmwsIG1ldGFkYXRhLCBzaWduaW5nS2V5cywgbWV0YWRhdGFTZWVkLFxuICAgICAgICAvLyBjbGllbnQgcmVsYXRlZFxuICAgICAgICBjbGllbnRfaWQsIGNsaWVudF9zZWNyZXQsIHJlc3BvbnNlX3R5cGUgPSBEZWZhdWx0UmVzcG9uc2VUeXBlLCBzY29wZSA9IERlZmF1bHRTY29wZSxcbiAgICAgICAgcmVkaXJlY3RfdXJpLCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmksXG4gICAgICAgIGNsaWVudF9hdXRoZW50aWNhdGlvbiA9IERlZmF1bHRDbGllbnRBdXRoZW50aWNhdGlvbixcbiAgICAgICAgLy8gb3B0aW9uYWwgcHJvdG9jb2xcbiAgICAgICAgcHJvbXB0LCBkaXNwbGF5LCBtYXhfYWdlLCB1aV9sb2NhbGVzLCBhY3JfdmFsdWVzLCByZXNvdXJjZSwgcmVzcG9uc2VfbW9kZSxcbiAgICAgICAgLy8gYmVoYXZpb3IgZmxhZ3NcbiAgICAgICAgZmlsdGVyUHJvdG9jb2xDbGFpbXMgPSB0cnVlLCBsb2FkVXNlckluZm8gPSB0cnVlLFxuICAgICAgICBzdGFsZVN0YXRlQWdlID0gRGVmYXVsdFN0YWxlU3RhdGVBZ2UsIFxuICAgICAgICBjbG9ja1NrZXcgPSBEZWZhdWx0Q2xvY2tTa2V3SW5TZWNvbmRzLFxuICAgICAgICBjbG9ja1NlcnZpY2UgPSBuZXcgQ2xvY2tTZXJ2aWNlKCksXG4gICAgICAgIHVzZXJJbmZvSnd0SXNzdWVyID0gJ09QJyxcbiAgICAgICAgbWVyZ2VDbGFpbXMgPSBmYWxzZSxcbiAgICAgICAgLy8gb3RoZXIgYmVoYXZpb3JcbiAgICAgICAgc3RhdGVTdG9yZSA9IG5ldyBXZWJTdG9yYWdlU3RhdGVTdG9yZSgpLFxuICAgICAgICBSZXNwb25zZVZhbGlkYXRvckN0b3IgPSBSZXNwb25zZVZhbGlkYXRvcixcbiAgICAgICAgTWV0YWRhdGFTZXJ2aWNlQ3RvciA9IE1ldGFkYXRhU2VydmljZSxcbiAgICAgICAgLy8gZXh0cmEgcXVlcnkgcGFyYW1zXG4gICAgICAgIGV4dHJhUXVlcnlQYXJhbXMgPSB7fSxcbiAgICAgICAgZXh0cmFUb2tlblBhcmFtcyA9IHt9XG4gICAgfSA9IHt9KSB7XG5cbiAgICAgICAgdGhpcy5fYXV0aG9yaXR5ID0gYXV0aG9yaXR5O1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVVybCA9IG1ldGFkYXRhVXJsO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlZWQgPSBtZXRhZGF0YVNlZWQ7XG4gICAgICAgIHRoaXMuX3NpZ25pbmdLZXlzID0gc2lnbmluZ0tleXM7XG5cbiAgICAgICAgdGhpcy5fY2xpZW50X2lkID0gY2xpZW50X2lkO1xuICAgICAgICB0aGlzLl9jbGllbnRfc2VjcmV0ID0gY2xpZW50X3NlY3JldDtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VfdHlwZSA9IHJlc3BvbnNlX3R5cGU7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX3JlZGlyZWN0X3VyaSA9IHJlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgICAgICB0aGlzLl9jbGllbnRfYXV0aGVudGljYXRpb24gPSBjbGllbnRfYXV0aGVudGljYXRpb247XG5cbiAgICAgICAgdGhpcy5fcHJvbXB0ID0gcHJvbXB0O1xuICAgICAgICB0aGlzLl9kaXNwbGF5ID0gZGlzcGxheTtcbiAgICAgICAgdGhpcy5fbWF4X2FnZSA9IG1heF9hZ2U7XG4gICAgICAgIHRoaXMuX3VpX2xvY2FsZXMgPSB1aV9sb2NhbGVzO1xuICAgICAgICB0aGlzLl9hY3JfdmFsdWVzID0gYWNyX3ZhbHVlcztcbiAgICAgICAgdGhpcy5fcmVzb3VyY2UgPSByZXNvdXJjZTtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VfbW9kZSA9IHJlc3BvbnNlX21vZGU7XG5cbiAgICAgICAgdGhpcy5fZmlsdGVyUHJvdG9jb2xDbGFpbXMgPSAhIWZpbHRlclByb3RvY29sQ2xhaW1zO1xuICAgICAgICB0aGlzLl9sb2FkVXNlckluZm8gPSAhIWxvYWRVc2VySW5mbztcbiAgICAgICAgdGhpcy5fc3RhbGVTdGF0ZUFnZSA9IHN0YWxlU3RhdGVBZ2U7XG4gICAgICAgIHRoaXMuX2Nsb2NrU2tldyA9IGNsb2NrU2tldztcbiAgICAgICAgdGhpcy5fY2xvY2tTZXJ2aWNlID0gY2xvY2tTZXJ2aWNlO1xuICAgICAgICB0aGlzLl91c2VySW5mb0p3dElzc3VlciA9IHVzZXJJbmZvSnd0SXNzdWVyO1xuICAgICAgICB0aGlzLl9tZXJnZUNsYWltcyA9ICEhbWVyZ2VDbGFpbXM7XG5cbiAgICAgICAgdGhpcy5fc3RhdGVTdG9yZSA9IHN0YXRlU3RvcmU7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRvciA9IG5ldyBSZXNwb25zZVZhbGlkYXRvckN0b3IodGhpcyk7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZSA9IG5ldyBNZXRhZGF0YVNlcnZpY2VDdG9yKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2V4dHJhUXVlcnlQYXJhbXMgPSB0eXBlb2YgZXh0cmFRdWVyeVBhcmFtcyA9PT0gJ29iamVjdCcgPyBleHRyYVF1ZXJ5UGFyYW1zIDoge307XG4gICAgICAgIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXMgPSB0eXBlb2YgZXh0cmFUb2tlblBhcmFtcyA9PT0gJ29iamVjdCcgPyBleHRyYVRva2VuUGFyYW1zIDoge307XG4gICAgfVxuXG4gICAgLy8gY2xpZW50IGNvbmZpZ1xuICAgIGdldCBjbGllbnRfaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnRfaWQ7XG4gICAgfVxuICAgIHNldCBjbGllbnRfaWQodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jbGllbnRfaWQpIHtcbiAgICAgICAgICAgIC8vIG9uZS10aW1lIHNldCBvbmx5XG4gICAgICAgICAgICB0aGlzLl9jbGllbnRfaWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnRTZXR0aW5ncy5zZXRfY2xpZW50X2lkOiBjbGllbnRfaWQgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNsaWVudF9pZCBoYXMgYWxyZWFkeSBiZWVuIGFzc2lnbmVkLlwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBjbGllbnRfc2VjcmV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50X3NlY3JldDtcbiAgICB9XG4gICAgZ2V0IHJlc3BvbnNlX3R5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zZV90eXBlO1xuICAgIH1cbiAgICBnZXQgc2NvcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29wZTtcbiAgICB9XG4gICAgZ2V0IHJlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgZ2V0IHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgZ2V0IGNsaWVudF9hdXRoZW50aWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9hdXRoZW50aWNhdGlvbjtcbiAgICB9XG4gICAgXG5cbiAgICAvLyBvcHRpb25hbCBwcm90b2NvbCBwYXJhbXNcbiAgICBnZXQgcHJvbXB0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbXB0O1xuICAgIH1cbiAgICBnZXQgZGlzcGxheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXk7XG4gICAgfVxuICAgIGdldCBtYXhfYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4X2FnZTtcbiAgICB9XG4gICAgZ2V0IHVpX2xvY2FsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91aV9sb2NhbGVzO1xuICAgIH1cbiAgICBnZXQgYWNyX3ZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fjcl92YWx1ZXM7XG4gICAgfVxuICAgIGdldCByZXNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlO1xuICAgIH1cbiAgICBnZXQgcmVzcG9uc2VfbW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNlX21vZGU7XG4gICAgfVxuXG5cbiAgICAvLyBtZXRhZGF0YVxuICAgIGdldCBhdXRob3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRob3JpdHk7XG4gICAgfVxuICAgIHNldCBhdXRob3JpdHkodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hdXRob3JpdHkpIHtcbiAgICAgICAgICAgIC8vIG9uZS10aW1lIHNldCBvbmx5XG4gICAgICAgICAgICB0aGlzLl9hdXRob3JpdHkgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk9pZGNDbGllbnRTZXR0aW5ncy5zZXRfYXV0aG9yaXR5OiBhdXRob3JpdHkgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImF1dGhvcml0eSBoYXMgYWxyZWFkeSBiZWVuIGFzc2lnbmVkLlwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVVybCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tZXRhZGF0YVVybCkge1xuICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgPSB0aGlzLmF1dGhvcml0eTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX21ldGFkYXRhVXJsICYmIHRoaXMuX21ldGFkYXRhVXJsLmluZGV4T2YoT2lkY01ldGFkYXRhVXJsUGF0aCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21ldGFkYXRhVXJsW3RoaXMuX21ldGFkYXRhVXJsLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gJy8nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YVVybCArPSBPaWRjTWV0YWRhdGFVcmxQYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhVXJsO1xuICAgIH1cblxuICAgIC8vIHNldHRhYmxlL2NhY2hhYmxlIG1ldGFkYXRhIHZhbHVlc1xuICAgIGdldCBtZXRhZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhO1xuICAgIH1cbiAgICBzZXQgbWV0YWRhdGEodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IG1ldGFkYXRhU2VlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VlZDtcbiAgICB9XG4gICAgc2V0IG1ldGFkYXRhU2VlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgc2lnbmluZ0tleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5nS2V5cztcbiAgICB9XG4gICAgc2V0IHNpZ25pbmdLZXlzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3NpZ25pbmdLZXlzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gYmVoYXZpb3IgZmxhZ3NcbiAgICBnZXQgZmlsdGVyUHJvdG9jb2xDbGFpbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJQcm90b2NvbENsYWltcztcbiAgICB9XG4gICAgZ2V0IGxvYWRVc2VySW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VySW5mbztcbiAgICB9XG4gICAgZ2V0IHN0YWxlU3RhdGVBZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFsZVN0YXRlQWdlO1xuICAgIH1cbiAgICBnZXQgY2xvY2tTa2V3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvY2tTa2V3O1xuICAgIH1cbiAgICBnZXQgdXNlckluZm9Kd3RJc3N1ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VySW5mb0p3dElzc3VlcjtcbiAgICB9XG4gICAgZ2V0IG1lcmdlQ2xhaW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVyZ2VDbGFpbXM7XG4gICAgfVxuICAgIFxuICAgIGdldCBzdGF0ZVN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVTdG9yZTtcbiAgICB9XG4gICAgZ2V0IHZhbGlkYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvcjtcbiAgICB9XG4gICAgZ2V0IG1ldGFkYXRhU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZTtcbiAgICB9XG5cbiAgICAvLyBleHRyYSBxdWVyeSBwYXJhbXNcbiAgICBnZXQgZXh0cmFRdWVyeVBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dHJhUXVlcnlQYXJhbXM7XG4gICAgfVxuICAgIHNldCBleHRyYVF1ZXJ5UGFyYW1zKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKXtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhUXVlcnlQYXJhbXMgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhUXVlcnlQYXJhbXMgPSB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV4dHJhIHRva2VuIHBhcmFtc1xuICAgIGdldCBleHRyYVRva2VuUGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0cmFUb2tlblBhcmFtcztcbiAgICB9XG4gICAgc2V0IGV4dHJhVG9rZW5QYXJhbXModmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgdGhpcy5fZXh0cmFUb2tlblBhcmFtcyA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZXh0cmFUb2tlblBhcmFtcyA9IHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSB0aW1lXG4gICAgZ2V0RXBvY2hUaW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvY2tTZXJ2aWNlLmdldEVwb2NoVGltZSgpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFBvcHVwV2luZG93IH0gZnJvbSAnLi9Qb3B1cFdpbmRvdy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQb3B1cE5hdmlnYXRvciB7XG5cbiAgICBwcmVwYXJlKHBhcmFtcykge1xuICAgICAgICBsZXQgcG9wdXAgPSBuZXcgUG9wdXBXaW5kb3cocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwb3B1cCk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2sodXJsLCBrZWVwT3BlbiwgZGVsaW1pdGVyKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwTmF2aWdhdG9yLmNhbGxiYWNrXCIpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXIodXJsLCBrZWVwT3BlbiwgZGVsaW1pdGVyKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5cbmNvbnN0IENoZWNrRm9yUG9wdXBDbG9zZWRJbnRlcnZhbCA9IDUwMDtcbmNvbnN0IERlZmF1bHRQb3B1cEZlYXR1cmVzID0gJ2xvY2F0aW9uPW5vLHRvb2xiYXI9bm8sd2lkdGg9NTAwLGhlaWdodD01MDAsbGVmdD0xMDAsdG9wPTEwMDsnO1xuLy9jb25zdCBEZWZhdWx0UG9wdXBGZWF0dXJlcyA9ICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vLHdpZHRoPTUwMCxoZWlnaHQ9NTAwLGxlZnQ9MTAwLHRvcD0xMDA7cmVzaXphYmxlPXllcyc7XG5cbmNvbnN0IERlZmF1bHRQb3B1cFRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbmV4cG9ydCBjbGFzcyBQb3B1cFdpbmRvdyB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdGFyZ2V0ID0gcGFyYW1zLnBvcHVwV2luZG93VGFyZ2V0IHx8IERlZmF1bHRQb3B1cFRhcmdldDtcbiAgICAgICAgbGV0IGZlYXR1cmVzID0gcGFyYW1zLnBvcHVwV2luZG93RmVhdHVyZXMgfHwgRGVmYXVsdFBvcHVwRmVhdHVyZXM7XG5cbiAgICAgICAgdGhpcy5fcG9wdXAgPSB3aW5kb3cub3BlbignJywgdGFyZ2V0LCBmZWF0dXJlcyk7XG4gICAgICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUG9wdXBXaW5kb3cuY3RvcjogcG9wdXAgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0ZvclBvcHVwQ2xvc2VkVGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5fY2hlY2tGb3JQb3B1cENsb3NlZC5iaW5kKHRoaXMpLCBDaGVja0ZvclBvcHVwQ2xvc2VkSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICAgIH1cblxuICAgIG5hdmlnYXRlKHBhcmFtcykge1xuICAgICAgICBpZiAoIXRoaXMuX3BvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIlBvcHVwV2luZG93Lm5hdmlnYXRlOiBFcnJvciBvcGVuaW5nIHBvcHVwIHdpbmRvd1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghcGFyYW1zIHx8ICFwYXJhbXMudXJsKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIlBvcHVwV2luZG93Lm5hdmlnYXRlOiBubyB1cmwgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIk5vIHVybCBwcm92aWRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93Lm5hdmlnYXRlOiBTZXR0aW5nIFVSTCBpbiBwb3B1cFwiKTtcblxuICAgICAgICAgICAgdGhpcy5faWQgPSBwYXJhbXMuaWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbXCJwb3B1cENhbGxiYWNrX1wiICsgcGFyYW1zLmlkXSA9IHRoaXMuX2NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3BvcHVwLmZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC53aW5kb3cubG9jYXRpb24gPSBwYXJhbXMudXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZTtcbiAgICB9XG5cbiAgICBfc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93LmNhbGxiYWNrOiBTdWNjZXNzZnVsIHJlc3BvbnNlIGZyb20gcG9wdXAgd2luZG93XCIpO1xuXG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZShkYXRhKTtcbiAgICB9XG4gICAgX2Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgTG9nLmVycm9yKFwiUG9wdXBXaW5kb3cuZXJyb3I6IFwiLCBtZXNzYWdlKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgdGhpcy5fcmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoZmFsc2UpO1xuICAgIH1cblxuICAgIF9jbGVhbnVwKGtlZXBPcGVuKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93LmNsZWFudXBcIik7XG5cbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5fY2hlY2tGb3JQb3B1cENsb3NlZFRpbWVyKTtcbiAgICAgICAgdGhpcy5fY2hlY2tGb3JQb3B1cENsb3NlZFRpbWVyID0gbnVsbDtcblxuICAgICAgICBkZWxldGUgd2luZG93W1wicG9wdXBDYWxsYmFja19cIiArIHRoaXMuX2lkXTtcblxuICAgICAgICBpZiAodGhpcy5fcG9wdXAgJiYgIWtlZXBPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BvcHVwID0gbnVsbDtcbiAgICB9XG5cbiAgICBfY2hlY2tGb3JQb3B1cENsb3NlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb3B1cCB8fCB0aGlzLl9wb3B1cC5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiUG9wdXAgd2luZG93IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxsYmFjayh1cmwsIGtlZXBPcGVuKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoa2VlcE9wZW4pO1xuXG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93LmNhbGxiYWNrIHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICB0aGlzLl9zdWNjZXNzKHsgdXJsOiB1cmwgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jYWxsYmFjazogSW52YWxpZCByZXNwb25zZSBmcm9tIHBvcHVwXCIpO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJJbnZhbGlkIHJlc3BvbnNlIGZyb20gcG9wdXBcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbm90aWZ5T3BlbmVyKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcikge1xuICAgICAgICBpZiAod2luZG93Lm9wZW5lcikge1xuICAgICAgICAgICAgdXJsID0gdXJsIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gVXJsVXRpbGl0eS5wYXJzZVVybEZyYWdtZW50KHVybCwgZGVsaW1pdGVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gXCJwb3B1cENhbGxiYWNrX1wiICsgZGF0YS5zdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gd2luZG93Lm9wZW5lcltuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXI6IHBhc3NpbmcgdXJsIG1lc3NhZ2UgdG8gb3BlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodXJsLCBrZWVwT3Blbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cud2FybihcIlBvcHVwV2luZG93Lm5vdGlmeU9wZW5lcjogbm8gbWF0Y2hpbmcgY2FsbGJhY2sgZm91bmQgb24gb3BlbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cud2FybihcIlBvcHVwV2luZG93Lm5vdGlmeU9wZW5lcjogbm8gc3RhdGUgZm91bmQgaW4gcmVzcG9uc2UgdXJsXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy53YXJuKFwiUG9wdXBXaW5kb3cubm90aWZ5T3BlbmVyOiBubyB3aW5kb3cub3BlbmVyLiBDYW4ndCBjb21wbGV0ZSBub3RpZmljYXRpb24uXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgUmVkaXJlY3ROYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMgfHwgIXBhcmFtcy51cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlZGlyZWN0TmF2aWdhdG9yLm5hdmlnYXRlOiBObyB1cmwgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gdXJsIHByb3ZpZGVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMudXNlUmVwbGFjZVRvTmF2aWdhdGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHBhcmFtcy51cmwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gcGFyYW1zLnVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBnZXQgdXJsKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuaW1wb3J0IHsgVXNlckluZm9TZXJ2aWNlIH0gZnJvbSAnLi9Vc2VySW5mb1NlcnZpY2UuanMnO1xuaW1wb3J0IHsgVG9rZW5DbGllbnQgfSBmcm9tICcuL1Rva2VuQ2xpZW50LmpzJztcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL0Vycm9yUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgSm9zZVV0aWwgfSBmcm9tICcuL0pvc2VVdGlsLmpzJztcblxuLy8gS2V5cyB0aGF0IG11c3QgbmV2ZXIgYmUgY29waWVkIGZyb20gc2VydmVyIHJlc3BvbnNlcyBvbnRvIHBsYWluIG9iamVjdHNcbmNvbnN0IFVuc2FmZUtleXMgPSBbXCJfX3Byb3RvX19cIiwgXCJjb25zdHJ1Y3RvclwiLCBcInByb3RvdHlwZVwiXTtcblxuY29uc3QgUHJvdG9jb2xDbGFpbXMgPSBbXCJub25jZVwiLCBcImF0X2hhc2hcIiwgXCJpYXRcIiwgXCJuYmZcIiwgXCJleHBcIiwgXCJhdWRcIiwgXCJpc3NcIiwgXCJjX2hhc2hcIl07XG5cbmV4cG9ydCBjbGFzcyBSZXNwb25zZVZhbGlkYXRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgXG4gICAgICAgIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UsXG4gICAgICAgIFVzZXJJbmZvU2VydmljZUN0b3IgPSBVc2VySW5mb1NlcnZpY2UsIFxuICAgICAgICBqb3NlVXRpbCA9IEpvc2VVdGlsLFxuICAgICAgICBUb2tlbkNsaWVudEN0b3IgPSBUb2tlbkNsaWVudCkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5jdG9yOiBObyBzZXR0aW5ncyBwYXNzZWQgdG8gUmVzcG9uc2VWYWxpZGF0b3JcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZSA9IG5ldyBNZXRhZGF0YVNlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fdXNlckluZm9TZXJ2aWNlID0gbmV3IFVzZXJJbmZvU2VydmljZUN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl9qb3NlVXRpbCA9IGpvc2VVdGlsO1xuICAgICAgICB0aGlzLl90b2tlbkNsaWVudCA9IG5ldyBUb2tlbkNsaWVudEN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlU2lnbmluUmVzcG9uc2Uoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2VcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NTaWduaW5QYXJhbXMoc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2U6IHN0YXRlIHByb2Nlc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZVRva2VucyhzdGF0ZSwgcmVzcG9uc2UpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2U6IHRva2VucyB2YWxpZGF0ZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NDbGFpbXMoc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IudmFsaWRhdGVTaWduaW5SZXNwb25zZTogY2xhaW1zIHByb2Nlc3NlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhbGlkYXRlU2lnbm91dFJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoc3RhdGUuaWQgIT09IHJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25vdXRSZXNwb25zZTogU3RhdGUgZG9lcyBub3QgbWF0Y2hcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiU3RhdGUgZG9lcyBub3QgbWF0Y2hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IHRoYXQgd2Uga25vdyB0aGUgc3RhdGUgbWF0Y2hlcywgdGFrZSB0aGUgc3RvcmVkIGRhdGFcbiAgICAgICAgLy8gYW5kIHNldCBpdCBpbnRvIHRoZSByZXNwb25zZSBzbyBjYWxsZXJzIGNhbiBnZXQgdGhlaXIgc3RhdGVcbiAgICAgICAgLy8gdGhpcyBpcyBpbXBvcnRhbnQgZm9yIGJvdGggc3VjY2VzcyAmIGVycm9yIG91dGNvbWVzXG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbm91dFJlc3BvbnNlOiBzdGF0ZSB2YWxpZGF0ZWRcIik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXRlID0gc3RhdGUuZGF0YTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIExvZy53YXJuKFwiUmVzcG9uc2VWYWxpZGF0b3IudmFsaWRhdGVTaWdub3V0UmVzcG9uc2U6IFJlc3BvbnNlIHdhcyBlcnJvclwiLCByZXNwb25zZS5lcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIF9wcm9jZXNzU2lnbmluUGFyYW1zKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoc3RhdGUuaWQgIT09IHJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogU3RhdGUgZG9lcyBub3QgbWF0Y2hcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiU3RhdGUgZG9lcyBub3QgbWF0Y2hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGF0ZS5jbGllbnRfaWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBObyBjbGllbnRfaWQgb24gc3RhdGVcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gY2xpZW50X2lkIG9uIHN0YXRlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUuYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogTm8gYXV0aG9yaXR5IG9uIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGF1dGhvcml0eSBvbiBzdGF0ZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzIGFsbG93cyB0aGUgYXV0aG9yaXR5IHRvIGJlIGxvYWRlZCBmcm9tIHRoZSBzaWduaW4gc3RhdGVcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5hdXRob3JpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eSA9IHN0YXRlLmF1dGhvcml0eTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbnN1cmUgd2UncmUgdXNpbmcgdGhlIGNvcnJlY3QgYXV0aG9yaXR5IGlmIHRoZSBhdXRob3JpdHkgaXMgbm90IGxvYWRlZCBmcm9tIHNpZ25pbiBzdGF0ZVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZXR0aW5ncy5hdXRob3JpdHkgJiYgdGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5ICE9PSBzdGF0ZS5hdXRob3JpdHkpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBhdXRob3JpdHkgbWlzbWF0Y2ggb24gc2V0dGluZ3MgdnMuIHNpZ25pbiBzdGF0ZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhdXRob3JpdHkgbWlzbWF0Y2ggb24gc2V0dGluZ3MgdnMuIHNpZ25pbiBzdGF0ZVwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcyBhbGxvd3MgdGhlIGNsaWVudF9pZCB0byBiZSBsb2FkZWQgZnJvbSB0aGUgc2lnbmluIHN0YXRlXG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQgPSBzdGF0ZS5jbGllbnRfaWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5zdXJlIHdlJ3JlIHVzaW5nIHRoZSBjb3JyZWN0IGNsaWVudF9pZCBpZiB0aGUgY2xpZW50X2lkIGlzIG5vdCBsb2FkZWQgZnJvbSBzaWduaW4gc3RhdGVcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkICYmIHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCAhPT0gc3RhdGUuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogY2xpZW50X2lkIG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiY2xpZW50X2lkIG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IHRoYXQgd2Uga25vdyB0aGUgc3RhdGUgbWF0Y2hlcywgdGFrZSB0aGUgc3RvcmVkIGRhdGFcbiAgICAgICAgLy8gYW5kIHNldCBpdCBpbnRvIHRoZSByZXNwb25zZSBzbyBjYWxsZXJzIGNhbiBnZXQgdGhlaXIgc3RhdGVcbiAgICAgICAgLy8gdGhpcyBpcyBpbXBvcnRhbnQgZm9yIGJvdGggc3VjY2VzcyAmIGVycm9yIG91dGNvbWVzXG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBzdGF0ZSB2YWxpZGF0ZWRcIik7XG4gICAgICAgIHJlc3BvbnNlLnN0YXRlID0gc3RhdGUuZGF0YTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIExvZy53YXJuKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IFJlc3BvbnNlIHdhcyBlcnJvclwiLCByZXNwb25zZS5lcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5ub25jZSAmJiAhcmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBFeHBlY3RpbmcgaWRfdG9rZW4gaW4gcmVzcG9uc2VcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gaWRfdG9rZW4gaW4gcmVzcG9uc2VcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGF0ZS5ub25jZSAmJiByZXNwb25zZS5pZF90b2tlbikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IE5vdCBleHBlY3RpbmcgaWRfdG9rZW4gaW4gcmVzcG9uc2VcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5leHBlY3RlZCBpZF90b2tlbiBpbiByZXNwb25zZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUuY29kZV92ZXJpZmllciAmJiAhcmVzcG9uc2UuY29kZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IEV4cGVjdGluZyBjb2RlIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGNvZGUgaW4gcmVzcG9uc2VcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGF0ZS5jb2RlX3ZlcmlmaWVyICYmIHJlc3BvbnNlLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBOb3QgZXhwZWN0aW5nIGNvZGUgaW4gcmVzcG9uc2VcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5leHBlY3RlZCBjb2RlIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzcG9uc2Uuc2NvcGUpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gc2NvcGUgb24gdGhlIHJlc3BvbnNlLCB0aGVuIGFzc3VtZSBhbGwgc2NvcGVzIGdyYW50ZWQgKHBlci1zcGVjKSBhbmQgY29weSBvdmVyIHNjb3BlcyBmcm9tIG9yaWdpbmFsIHJlcXVlc3RcbiAgICAgICAgICAgIHJlc3BvbnNlLnNjb3BlID0gc3RhdGUuc2NvcGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBfcHJvY2Vzc0NsYWltcyhzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmlzT3BlbklkQ29ubmVjdCkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDbGFpbXM6IHJlc3BvbnNlIGlzIE9JREMsIHByb2Nlc3NpbmcgY2xhaW1zXCIpO1xuXG4gICAgICAgICAgICByZXNwb25zZS5wcm9maWxlID0gdGhpcy5fZmlsdGVyUHJvdG9jb2xDbGFpbXMocmVzcG9uc2UucHJvZmlsZSk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5za2lwVXNlckluZm8gIT09IHRydWUgJiYgdGhpcy5fc2V0dGluZ3MubG9hZFVzZXJJbmZvICYmIHJlc3BvbnNlLmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiBsb2FkaW5nIHVzZXIgaW5mb1wiKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VySW5mb1NlcnZpY2UuZ2V0Q2xhaW1zKHJlc3BvbnNlLmFjY2Vzc190b2tlbikudGhlbihjbGFpbXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogdXNlciBpbmZvIGNsYWltcyByZWNlaXZlZCBmcm9tIHVzZXIgaW5mbyBlbmRwb2ludFwiKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhaW1zLnN1YiAhPT0gcmVzcG9uc2UucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiBzdWIgZnJvbSB1c2VyIGluZm8gZW5kcG9pbnQgZG9lcyBub3QgbWF0Y2ggc3ViIGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcInN1YiBmcm9tIHVzZXIgaW5mbyBlbmRwb2ludCBkb2VzIG5vdCBtYXRjaCBzdWIgaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZSA9IHRoaXMuX21lcmdlQ2xhaW1zKHJlc3BvbnNlLnByb2ZpbGUsIGNsYWltcyk7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiB1c2VyIGluZm8gY2xhaW1zIHJlY2VpdmVkLCB1cGRhdGVkIHByb2ZpbGU6XCIsIHJlc3BvbnNlLnByb2ZpbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiBub3QgbG9hZGluZyB1c2VyIGluZm9cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogcmVzcG9uc2UgaXMgbm90IE9JREMsIG5vdCBwcm9jZXNzaW5nIGNsYWltc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIF9tZXJnZUNsYWltcyhjbGFpbXMxLCBjbGFpbXMyKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBjbGFpbXMxKTtcblxuICAgICAgICBmb3IgKGxldCBuYW1lIGluIGNsYWltczIpIHtcbiAgICAgICAgICAgIGlmIChVbnNhZmVLZXlzLmluZGV4T2YobmFtZSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IGNsYWltczJbbmFtZV07XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlcyA9IFt2YWx1ZXNdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdFtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHRbbmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbbmFtZV0uaW5kZXhPZih2YWx1ZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbbmFtZV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0W25hbWVdICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0aGlzLl9zZXR0aW5ncy5tZXJnZUNsYWltcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gdGhpcy5fbWVyZ2VDbGFpbXMocmVzdWx0W25hbWVdLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbbmFtZV0gPSBbcmVzdWx0W25hbWVdLCB2YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIF9maWx0ZXJQcm90b2NvbENsYWltcyhjbGFpbXMpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlclByb3RvY29sQ2xhaW1zLCBpbmNvbWluZyBjbGFpbXM6XCIsIGNsYWltcyk7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIGNsYWltcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLl9maWx0ZXJQcm90b2NvbENsYWltcykge1xuICAgICAgICAgICAgUHJvdG9jb2xDbGFpbXMuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICAgICAgICAgICBkZWxldGUgcmVzdWx0W3R5cGVdO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJQcm90b2NvbENsYWltczogcHJvdG9jb2wgY2xhaW1zIGZpbHRlcmVkXCIsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyUHJvdG9jb2xDbGFpbXM6IHByb3RvY29sIGNsYWltcyBub3QgZmlsdGVyZWRcIilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlVG9rZW5zKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UuY29kZSkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlVG9rZW5zOiBWYWxpZGF0aW5nIGNvZGVcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc0NvZGUoc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXNwb25zZS5pZF90b2tlbikge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZVRva2VuczogVmFsaWRhdGluZyBpZF90b2tlbiBhbmQgYWNjZXNzX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUlkVG9rZW5BbmRBY2Nlc3NUb2tlbihzdGF0ZSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVUb2tlbnM6IFZhbGlkYXRpbmcgaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVJZFRva2VuKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVUb2tlbnM6IE5vIGNvZGUgdG8gcHJvY2VzcyBvciBpZF90b2tlbiB0byB2YWxpZGF0ZVwiKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuXG4gICAgX3Byb2Nlc3NDb2RlKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGNsaWVudF9pZDogc3RhdGUuY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldDogc3RhdGUuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIGNvZGUgOiByZXNwb25zZS5jb2RlLFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiBzdGF0ZS5yZWRpcmVjdF91cmksXG4gICAgICAgICAgICBjb2RlX3ZlcmlmaWVyOiBzdGF0ZS5jb2RlX3ZlcmlmaWVyXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHN0YXRlLmV4dHJhVG9rZW5QYXJhbXMgJiYgdHlwZW9mKHN0YXRlLmV4dHJhVG9rZW5QYXJhbXMpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCBzdGF0ZS5leHRyYVRva2VuUGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZShyZXF1ZXN0KS50aGVuKHRva2VuUmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiB0b2tlblJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKFVuc2FmZUtleXMuaW5kZXhPZihrZXkpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVtrZXldID0gdG9rZW5SZXNwb25zZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmlkX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDb2RlOiB0b2tlbiByZXNwb25zZSBzdWNjZXNzZnVsLCBwcm9jZXNzaW5nIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NvZGU6IHRva2VuIHJlc3BvbnNlIHN1Y2Nlc3NmdWwsIHJldHVybmluZyByZXNwb25zZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVJZFRva2VuQXR0cmlidXRlcyhzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRJc3N1ZXIoKS50aGVuKGlzc3VlciA9PiB7XG5cbiAgICAgICAgICAgIGxldCBhdWRpZW5jZSA9IHN0YXRlLmNsaWVudF9pZDtcbiAgICAgICAgICAgIGxldCBjbG9ja1NrZXdJblNlY29uZHMgPSB0aGlzLl9zZXR0aW5ncy5jbG9ja1NrZXc7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuQXR0cmlidXRlczogVmFsaWRhaW5nIEpXVCBhdHRyaWJ1dGVzOyB1c2luZyBjbG9jayBza2V3IChpbiBzZWNvbmRzKSBvZjogXCIsIGNsb2NrU2tld0luU2Vjb25kcyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5nZXRFcG9jaFRpbWUoKS50aGVuKG5vdyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvc2VVdGlsLnZhbGlkYXRlSnd0QXR0cmlidXRlcyhyZXNwb25zZS5pZF90b2tlbiwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3SW5TZWNvbmRzLCBub3cpLnRoZW4ocGF5bG9hZCA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5ub25jZSAmJiBzdGF0ZS5ub25jZSAhPT0gcGF5bG9hZC5ub25jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXM6IEludmFsaWQgbm9uY2UgaW4gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBub25jZSBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXlsb2FkLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXM6IE5vIHN1YiBwcmVzZW50IGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHN1YiBwcmVzZW50IGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5wcm9maWxlID0gcGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZUlkVG9rZW5BbmRBY2Nlc3NUb2tlbihzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlSWRUb2tlbihzdGF0ZSwgcmVzcG9uc2UpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlQWNjZXNzVG9rZW4ocmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZ2V0U2lnbmluZ0tleUZvckp3dChqd3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5cygpLnRoZW4oa2V5cyA9PiB7XG4gICAgICAgICAgICBjb25zdCBraWQgPSBqd3QuaGVhZGVyLmtpZDtcbiAgICAgICAgICAgIGlmICgha2V5cykge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIHNpZ25pbmcga2V5cyBmcm9tIG1ldGFkYXRhXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzaWduaW5nIGtleXMgZnJvbSBtZXRhZGF0YVwiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IFJlY2VpdmVkIHNpZ25pbmcga2V5c1wiKTtcbiAgICAgICAgICAgIGxldCBrZXk7XG4gICAgICAgICAgICBpZiAoIWtpZCkge1xuICAgICAgICAgICAgICAgIGtleXMgPSB0aGlzLl9maWx0ZXJCeUFsZyhrZXlzLCBqd3QuaGVhZGVyLmFsZyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIGtpZCBmb3VuZCBpbiBpZF90b2tlbiBhbmQgbW9yZSB0aGFuIG9uZSBrZXkgZm91bmQgaW4gbWV0YWRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBraWQgZm91bmQgaW4gaWRfdG9rZW4gYW5kIG1vcmUgdGhhbiBvbmUga2V5IGZvdW5kIGluIG1ldGFkYXRhXCIpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBraWQgaXMgbWFuZGF0b3J5IG9ubHkgd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUga2V5cyBpbiB0aGUgcmVmZXJlbmNlZCBKV0sgU2V0IGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIHNlZSBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI1NpZ25pbmdcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5c1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtleSA9IGtleXMuZmlsdGVyKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXkua2lkID09PSBraWQ7XG4gICAgICAgICAgICAgICAgfSlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9nZXRTaWduaW5nS2V5Rm9ySnd0V2l0aFNpbmdsZVJldHJ5KGp3dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U2lnbmluZ0tleUZvckp3dChqd3QpLnRoZW4oa2V5ID0+IHtcbiAgICAgICAgICAgIC8vIFJlZnJlc2hpbmcgc2lnbmluZ0tleXMgaWYgbm8gc3VpdGFibGUgdmVyaWZpY2F0aW9uIGtleSBpcyBwcmVzZW50IGZvciBnaXZlbiBqd3QgaGVhZGVyLlxuICAgICAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdG8gdW5kZWZpbmVkLCB0byB0cmlnZ2VyIG5ldHdvcmsgY2FsbCB0byBqd2tzX3VyaS5cbiAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UucmVzZXRTaWduaW5nS2V5cygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTaWduaW5nS2V5Rm9ySnd0KGp3dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlSWRUb2tlbihzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFzdGF0ZS5ub25jZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogTm8gbm9uY2Ugb24gc3RhdGVcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gbm9uY2Ugb24gc3RhdGVcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGp3dCA9IHRoaXMuX2pvc2VVdGlsLnBhcnNlSnd0KHJlc3BvbnNlLmlkX3Rva2VuKTtcbiAgICAgICAgaWYgKCFqd3QgfHwgIWp3dC5oZWFkZXIgfHwgIWp3dC5wYXlsb2FkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBGYWlsZWQgdG8gcGFyc2UgaWRfdG9rZW5cIiwgand0KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLm5vbmNlICE9PSBqd3QucGF5bG9hZC5ub25jZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogSW52YWxpZCBub25jZSBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIG5vbmNlIGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0SXNzdWVyKCkudGhlbihpc3N1ZXIgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogUmVjZWl2ZWQgaXNzdWVyXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNpZ25pbmdLZXlGb3JKd3RXaXRoU2luZ2xlUmV0cnkoand0KS50aGVuKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogTm8ga2V5IG1hdGNoaW5nIGtpZCBvciBhbGcgZm91bmQgaW4gc2lnbmluZyBrZXlzXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8ga2V5IG1hdGNoaW5nIGtpZCBvciBhbGcgZm91bmQgaW4gc2lnbmluZyBrZXlzXCIpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgYXVkaWVuY2UgPSBzdGF0ZS5jbGllbnRfaWQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgY2xvY2tTa2V3SW5TZWNvbmRzID0gdGhpcy5fc2V0dGluZ3MuY2xvY2tTa2V3O1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IFZhbGlkYWluZyBKV1Q7IHVzaW5nIGNsb2NrIHNrZXcgKGluIHNlY29uZHMpIG9mOiBcIiwgY2xvY2tTa2V3SW5TZWNvbmRzKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb3NlVXRpbC52YWxpZGF0ZUp3dChyZXNwb25zZS5pZF90b2tlbiwga2V5LCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXdJblNlY29uZHMpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogSldUIHZhbGlkYXRpb24gc3VjY2Vzc2Z1bFwiKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWp3dC5wYXlsb2FkLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogTm8gc3ViIHByZXNlbnQgaW4gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gc3ViIHByZXNlbnQgaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZSA9IGp3dC5wYXlsb2FkO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZmlsdGVyQnlBbGcoa2V5cywgYWxnKXtcbiAgICAgICAgaWYgKCFKb3NlVXRpbC5pc0FsbG93ZWRTaWduaW5nQWxnKGFsZykpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJCeUFsZzogYWxnIG5vdCBhbGxvd2VkOiBcIiwgYWxnKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga3R5ID0gbnVsbDtcbiAgICAgICAgaWYgKGFsZy5zdGFydHNXaXRoKFwiUlNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiUlNBXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJQU1wiKSkge1xuICAgICAgICAgICAga3R5ID0gXCJSU0FcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGcuc3RhcnRzV2l0aChcIkVTXCIpKSB7XG4gICAgICAgICAgICBrdHkgPSBcIkVDXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyQnlBbGc6IGFsZyBub3Qgc3VwcG9ydGVkOiBcIiwgYWxnKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJCeUFsZzogTG9va2luZyBmb3Iga2V5cyB0aGF0IG1hdGNoIGt0eTogXCIsIGt0eSk7XG5cbiAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGtleSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2V5Lmt0eSA9PT0ga3R5O1xuICAgICAgICB9KTtcblxuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyQnlBbGc6IE51bWJlciBvZiBrZXlzIHRoYXQgbWF0Y2gga3R5OiBcIiwga3R5LCBrZXlzLmxlbmd0aCk7XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlQWNjZXNzVG9rZW4ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5wcm9maWxlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogTm8gcHJvZmlsZSBsb2FkZWQgZnJvbSBpZF90b2tlblwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBwcm9maWxlIGxvYWRlZCBmcm9tIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzcG9uc2UucHJvZmlsZS5hdF9oYXNoKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogTm8gYXRfaGFzaCBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBhdF9oYXNoIGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBObyBpZF90b2tlblwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgand0ID0gdGhpcy5fam9zZVV0aWwucGFyc2VKd3QocmVzcG9uc2UuaWRfdG9rZW4pO1xuICAgICAgICBpZiAoIWp3dCB8fCAhand0LmhlYWRlcikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IEZhaWxlZCB0byBwYXJzZSBpZF90b2tlblwiLCBqd3QpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFzaEFsZyA9IGp3dC5oZWFkZXIuYWxnO1xuICAgICAgICBpZiAoIWhhc2hBbGcgfHwgaGFzaEFsZy5sZW5ndGggIT09IDUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBVbnN1cHBvcnRlZCBhbGc6XCIsIGhhc2hBbGcpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIGFsZzogXCIgKyBoYXNoQWxnKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFzaEJpdHMgPSBoYXNoQWxnLnN1YnN0cigyLCAzKTtcbiAgICAgICAgaWYgKCFoYXNoQml0cykge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IFVuc3VwcG9ydGVkIGFsZzpcIiwgaGFzaEFsZywgaGFzaEJpdHMpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIGFsZzogXCIgKyBoYXNoQWxnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNoQml0cyA9IHBhcnNlSW50KGhhc2hCaXRzKTtcbiAgICAgICAgaWYgKGhhc2hCaXRzICE9PSAyNTYgJiYgaGFzaEJpdHMgIT09IDM4NCAmJiBoYXNoQml0cyAhPT0gNTEyKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogVW5zdXBwb3J0ZWQgYWxnOlwiLCBoYXNoQWxnLCBoYXNoQml0cyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgYWxnOiBcIiArIGhhc2hBbGcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzaGEgPSBcInNoYVwiICsgaGFzaEJpdHM7XG4gICAgICAgIHZhciBoYXNoID0gdGhpcy5fam9zZVV0aWwuaGFzaFN0cmluZyhyZXNwb25zZS5hY2Nlc3NfdG9rZW4sIHNoYSk7XG4gICAgICAgIGlmICghaGFzaCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IGFjY2Vzc190b2tlbiBoYXNoIGZhaWxlZDpcIiwgc2hhKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gdmFsaWRhdGUgYXRfaGFzaFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVmdCA9IGhhc2guc3Vic3RyKDAsIGhhc2gubGVuZ3RoIC8gMik7XG4gICAgICAgIHZhciBsZWZ0X2I2NHUgPSB0aGlzLl9qb3NlVXRpbC5oZXhUb0Jhc2U2NFVybChsZWZ0KTtcbiAgICAgICAgaWYgKGxlZnRfYjY0dSAhPT0gcmVzcG9uc2UucHJvZmlsZS5hdF9oYXNoKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogRmFpbGVkIHRvIHZhbGlkYXRlIGF0X2hhc2hcIiwgbGVmdF9iNjR1LCByZXNwb25zZS5wcm9maWxlLmF0X2hhc2gpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byB2YWxpZGF0ZSBhdF9oYXNoXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBzdWNjZXNzXCIpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IENoZWNrU2Vzc2lvbklGcmFtZSB9IGZyb20gJy4vQ2hlY2tTZXNzaW9uSUZyYW1lLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcblxuZXhwb3J0IGNsYXNzIFNlc3Npb25Nb25pdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHVzZXJNYW5hZ2VyLCBDaGVja1Nlc3Npb25JRnJhbWVDdG9yID0gQ2hlY2tTZXNzaW9uSUZyYW1lLCB0aW1lciA9IEdsb2JhbC50aW1lcikge1xuICAgICAgICBpZiAoIXVzZXJNYW5hZ2VyKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTZXNzaW9uTW9uaXRvci5jdG9yOiBObyB1c2VyIG1hbmFnZXIgcGFzc2VkIHRvIFNlc3Npb25Nb25pdG9yXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlck1hbmFnZXJcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91c2VyTWFuYWdlciA9IHVzZXJNYW5hZ2VyO1xuICAgICAgICB0aGlzLl9DaGVja1Nlc3Npb25JRnJhbWVDdG9yID0gQ2hlY2tTZXNzaW9uSUZyYW1lQ3RvcjtcbiAgICAgICAgdGhpcy5fdGltZXIgPSB0aW1lcjtcblxuICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuYWRkVXNlckxvYWRlZCh0aGlzLl9zdGFydC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLmFkZFVzZXJVbmxvYWRlZCh0aGlzLl9zdG9wLmJpbmQodGhpcykpO1xuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLl91c2VyTWFuYWdlci5nZXRVc2VyKCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIC8vIGRvaW5nIHRoaXMgbWFudWFsbHkgaGVyZSBzaW5jZSBjYWxsaW5nIGdldFVzZXIgXG4gICAgICAgICAgICAvLyBkb2Vzbid0IHRyaWdnZXIgbG9hZCBldmVudC5cbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnQodXNlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9zZXR0aW5ncy5tb25pdG9yQW5vbnltb3VzU2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1cygpLnRoZW4oc2Vzc2lvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0bXBVc2VyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbl9zdGF0ZSA6IHNlc3Npb24uc2Vzc2lvbl9zdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5zdWIgJiYgc2Vzc2lvbi5zaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFVzZXIucHJvZmlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWI6IHNlc3Npb24uc3ViLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZDogc2Vzc2lvbi5zaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnQodG1wVXNlcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2F0Y2ggdG8gc3VwcHJlc3MgZXJyb3JzIHNpbmNlIHdlJ3JlIGluIGEgY3RvclxuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJTZXNzaW9uTW9uaXRvciBjdG9yOiBlcnJvciBmcm9tIHF1ZXJ5U2Vzc2lvblN0YXR1czpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgLy8gY2F0Y2ggdG8gc3VwcHJlc3MgZXJyb3JzIHNpbmNlIHdlJ3JlIGluIGEgY3RvclxuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2Vzc2lvbk1vbml0b3IgY3RvcjogZXJyb3IgZnJvbSBnZXRVc2VyOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBnZXQgX3NldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck1hbmFnZXIuc2V0dGluZ3M7XG4gICAgfVxuICAgIGdldCBfbWV0YWRhdGFTZXJ2aWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck1hbmFnZXIubWV0YWRhdGFTZXJ2aWNlO1xuICAgIH1cbiAgICBnZXQgX2NsaWVudF9pZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZDtcbiAgICB9XG4gICAgZ2V0IF9jaGVja1Nlc3Npb25JbnRlcnZhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLmNoZWNrU2Vzc2lvbkludGVydmFsO1xuICAgIH1cbiAgICBnZXQgX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3Muc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3I7XG4gICAgfVxuXG4gICAgX3N0YXJ0KHVzZXIpIHtcbiAgICAgICAgbGV0IHNlc3Npb25fc3RhdGUgPSB1c2VyLnNlc3Npb25fc3RhdGU7XG5cbiAgICAgICAgaWYgKHNlc3Npb25fc3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh1c2VyLnByb2ZpbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWIgPSB1c2VyLnByb2ZpbGUuc3ViO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NpZCA9IHVzZXIucHJvZmlsZS5zaWQ7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX3N0YXJ0OiBzZXNzaW9uX3N0YXRlOlwiLCBzZXNzaW9uX3N0YXRlLCBcIiwgc3ViOlwiLCB0aGlzLl9zdWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NpZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fc3RhcnQ6IHNlc3Npb25fc3RhdGU6XCIsIHNlc3Npb25fc3RhdGUsIFwiLCBhbm9ueW1vdXMgdXNlclwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0Q2hlY2tTZXNzaW9uSWZyYW1lKCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fc3RhcnQ6IEluaXRpYWxpemluZyBjaGVjayBzZXNzaW9uIGlmcmFtZVwiKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xpZW50X2lkID0gdGhpcy5fY2xpZW50X2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGludGVydmFsID0gdGhpcy5fY2hlY2tTZXNzaW9uSW50ZXJ2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RvcE9uRXJyb3IgPSB0aGlzLl9zdG9wQ2hlY2tTZXNzaW9uT25FcnJvcjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lID0gbmV3IHRoaXMuX0NoZWNrU2Vzc2lvbklGcmFtZUN0b3IodGhpcy5fY2FsbGJhY2suYmluZCh0aGlzKSwgY2xpZW50X2lkLCB1cmwsIGludGVydmFsLCBzdG9wT25FcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZS5zdGFydChzZXNzaW9uX3N0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLndhcm4oXCJTZXNzaW9uTW9uaXRvci5fc3RhcnQ6IE5vIGNoZWNrIHNlc3Npb24gaWZyYW1lIGZvdW5kIGluIHRoZSBtZXRhZGF0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhdGNoIHRvIHN1cHByZXNzIGVycm9ycyBzaW5jZSB3ZSdyZSBpbiBub24tcHJvbWlzZSBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJTZXNzaW9uTW9uaXRvci5fc3RhcnQ6IEVycm9yIGZyb20gZ2V0Q2hlY2tTZXNzaW9uSWZyYW1lOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUuc3RhcnQoc2Vzc2lvbl9zdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc3RvcCgpIHtcbiAgICAgICAgdGhpcy5fc3ViID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9zaWQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZSkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX3N0b3BcIik7XG4gICAgICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUuc3RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLm1vbml0b3JBbm9ueW1vdXNTZXNzaW9uKSB7XG4gICAgICAgICAgICAvLyB1c2luZyBhIHRpbWVyIHRvIGRlbGF5IHJlLWluaXRpYWxpemF0aW9uIHRvIGF2b2lkIHJhY2UgY29uZGl0aW9ucyBkdXJpbmcgc2lnbm91dFxuICAgICAgICAgICAgbGV0IHRpbWVySGFuZGxlID0gdGhpcy5fdGltZXIuc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lci5jbGVhckludGVydmFsKHRpbWVySGFuZGxlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1cygpLnRoZW4oc2Vzc2lvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0bXBVc2VyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbl9zdGF0ZSA6IHNlc3Npb24uc2Vzc2lvbl9zdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5zdWIgJiYgc2Vzc2lvbi5zaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFVzZXIucHJvZmlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWI6IHNlc3Npb24uc3ViLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZDogc2Vzc2lvbi5zaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhcnQodG1wVXNlcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2F0Y2ggdG8gc3VwcHJlc3MgZXJyb3JzIHNpbmNlIHdlJ3JlIGluIGEgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiU2Vzc2lvbk1vbml0b3I6IGVycm9yIGZyb20gcXVlcnlTZXNzaW9uU3RhdHVzOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXMoKS50aGVuKHNlc3Npb24gPT4ge1xuICAgICAgICAgICAgdmFyIHJhaXNlRXZlbnQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLnN1YiA9PT0gdGhpcy5fc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhaXNlRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lLnN0YXJ0KHNlc3Npb24uc2Vzc2lvbl9zdGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uc2lkID09PSB0aGlzLl9zaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogU2FtZSBzdWIgc3RpbGwgbG9nZ2VkIGluIGF0IE9QLCByZXN0YXJ0aW5nIGNoZWNrIHNlc3Npb24gaWZyYW1lOyBzZXNzaW9uX3N0YXRlOlwiLCBzZXNzaW9uLnNlc3Npb25fc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBTYW1lIHN1YiBzdGlsbCBsb2dnZWQgaW4gYXQgT1AsIHNlc3Npb24gc3RhdGUgaGFzIGNoYW5nZWQsIHJlc3RhcnRpbmcgY2hlY2sgc2Vzc2lvbiBpZnJhbWU7IHNlc3Npb25fc3RhdGU6XCIsIHNlc3Npb24uc2Vzc2lvbl9zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuX3JhaXNlVXNlclNlc3Npb25DaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogRGlmZmVyZW50IHN1YmplY3Qgc2lnbmVkIGludG8gT1A6XCIsIHNlc3Npb24uc3ViKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IFN1YmplY3Qgbm8gbG9uZ2VyIHNpZ25lZCBpbnRvIE9QXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmFpc2VFdmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s7IHJhaXNpbmcgc2lnbmVkIG91dCBldmVudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLl9yYWlzZVVzZXJTaWduZWRPdXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOyByYWlzaW5nIHNpZ25lZCBpbiBldmVudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLl9yYWlzZVVzZXJTaWduZWRJbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdWIpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IEVycm9yIGNhbGxpbmcgcXVlcnlDdXJyZW50U2lnbmluU2Vzc2lvbjsgcmFpc2luZyBzaWduZWQgb3V0IGV2ZW50XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuX3JhaXNlVXNlclNpZ25lZE91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBVcmxVdGlsaXR5IH0gZnJvbSAnLi9VcmxVdGlsaXR5LmpzJztcbmltcG9ydCB7IFNpZ25pblN0YXRlIH0gZnJvbSAnLi9TaWduaW5TdGF0ZS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTaWduaW5SZXF1ZXN0IHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIC8vIG1hbmRhdG9yeVxuICAgICAgICB1cmwsIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpLCByZXNwb25zZV90eXBlLCBzY29wZSwgYXV0aG9yaXR5LFxuICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICBkYXRhLCBwcm9tcHQsIGRpc3BsYXksIG1heF9hZ2UsIHVpX2xvY2FsZXMsIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQsIGFjcl92YWx1ZXMsIHJlc291cmNlLCByZXNwb25zZV9tb2RlLFxuICAgICAgICByZXF1ZXN0LCByZXF1ZXN0X3VyaSwgZXh0cmFRdWVyeVBhcmFtcywgcmVxdWVzdF90eXBlLCBjbGllbnRfc2VjcmV0LCBleHRyYVRva2VuUGFyYW1zLCBza2lwVXNlckluZm9cbiAgICB9KSB7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIHVybCBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1cmxcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjbGllbnRfaWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gY2xpZW50X2lkIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNsaWVudF9pZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlZGlyZWN0X3VyaSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbmluUmVxdWVzdC5jdG9yOiBObyByZWRpcmVjdF91cmkgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmVkaXJlY3RfdXJpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzcG9uc2VfdHlwZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbmluUmVxdWVzdC5jdG9yOiBObyByZXNwb25zZV90eXBlIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInJlc3BvbnNlX3R5cGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzY29wZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbmluUmVxdWVzdC5jdG9yOiBObyBzY29wZSBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzY29wZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF1dGhvcml0eSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbmluUmVxdWVzdC5jdG9yOiBObyBhdXRob3JpdHkgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXV0aG9yaXR5XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9pZGMgPSBTaWduaW5SZXF1ZXN0LmlzT2lkYyhyZXNwb25zZV90eXBlKTtcbiAgICAgICAgbGV0IGNvZGUgPSBTaWduaW5SZXF1ZXN0LmlzQ29kZShyZXNwb25zZV90eXBlKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlX21vZGUpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlX21vZGUgPSBTaWduaW5SZXF1ZXN0LmlzQ29kZShyZXNwb25zZV90eXBlKSA/IFwicXVlcnlcIiA6IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IFNpZ25pblN0YXRlKHsgbm9uY2U6IG9pZGMsIFxuICAgICAgICAgICAgZGF0YSwgY2xpZW50X2lkLCBhdXRob3JpdHksIHJlZGlyZWN0X3VyaSwgXG4gICAgICAgICAgICBjb2RlX3ZlcmlmaWVyOiBjb2RlLCBcbiAgICAgICAgICAgIHJlcXVlc3RfdHlwZSwgcmVzcG9uc2VfbW9kZSxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQsIHNjb3BlLCBleHRyYVRva2VuUGFyYW1zLCBza2lwVXNlckluZm8gfSk7XG5cbiAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJjbGllbnRfaWRcIiwgY2xpZW50X2lkKTtcbiAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJyZWRpcmVjdF91cmlcIiwgcmVkaXJlY3RfdXJpKTtcbiAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJyZXNwb25zZV90eXBlXCIsIHJlc3BvbnNlX3R5cGUpO1xuICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInNjb3BlXCIsIHNjb3BlKTtcblxuICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInN0YXRlXCIsIHRoaXMuc3RhdGUuaWQpO1xuICAgICAgICBpZiAob2lkYykge1xuICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJub25jZVwiLCB0aGlzLnN0YXRlLm5vbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJjb2RlX2NoYWxsZW5nZVwiLCB0aGlzLnN0YXRlLmNvZGVfY2hhbGxlbmdlKTtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwiY29kZV9jaGFsbGVuZ2VfbWV0aG9kXCIsIFwiUzI1NlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvcHRpb25hbCA9IHsgcHJvbXB0LCBkaXNwbGF5LCBtYXhfYWdlLCB1aV9sb2NhbGVzLCBpZF90b2tlbl9oaW50LCBsb2dpbl9oaW50LCBhY3JfdmFsdWVzLCByZXNvdXJjZSwgcmVxdWVzdCwgcmVxdWVzdF91cmksIHJlc3BvbnNlX21vZGUgfTtcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gb3B0aW9uYWwpe1xuICAgICAgICAgICAgaWYgKG9wdGlvbmFsW2tleV0pIHtcbiAgICAgICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBrZXksIG9wdGlvbmFsW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBrZXkgaW4gZXh0cmFRdWVyeVBhcmFtcyl7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBrZXksIGV4dHJhUXVlcnlQYXJhbXNba2V5XSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc09pZGMocmVzcG9uc2VfdHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVzcG9uc2VfdHlwZS5zcGxpdCgvXFxzKy9nKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09IFwiaWRfdG9rZW5cIjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAhIShyZXN1bHRbMF0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc09BdXRoKHJlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3BvbnNlX3R5cGUuc3BsaXQoL1xccysvZykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtID09PSBcInRva2VuXCI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gISEocmVzdWx0WzBdKTtcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGlzQ29kZShyZXNwb25zZV90eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZXNwb25zZV90eXBlLnNwbGl0KC9cXHMrL2cpLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gXCJjb2RlXCI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gISEocmVzdWx0WzBdKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBVcmxVdGlsaXR5IH0gZnJvbSAnLi9VcmxVdGlsaXR5LmpzJztcblxuY29uc3QgT2lkY1Njb3BlID0gXCJvcGVuaWRcIjtcblxuZXhwb3J0IGNsYXNzIFNpZ25pblJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIGRlbGltaXRlciA9IFwiI1wiKSB7XG5cbiAgICAgICAgdmFyIHZhbHVlcyA9IFVybFV0aWxpdHkucGFyc2VVcmxGcmFnbWVudCh1cmwsIGRlbGltaXRlcik7XG5cbiAgICAgICAgdGhpcy5lcnJvciA9IHZhbHVlcy5lcnJvcjtcbiAgICAgICAgdGhpcy5lcnJvcl9kZXNjcmlwdGlvbiA9IHZhbHVlcy5lcnJvcl9kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5lcnJvcl91cmkgPSB2YWx1ZXMuZXJyb3JfdXJpO1xuXG4gICAgICAgIHRoaXMuY29kZSA9IHZhbHVlcy5jb2RlO1xuICAgICAgICB0aGlzLnN0YXRlID0gdmFsdWVzLnN0YXRlO1xuICAgICAgICB0aGlzLmlkX3Rva2VuID0gdmFsdWVzLmlkX3Rva2VuO1xuICAgICAgICB0aGlzLnNlc3Npb25fc3RhdGUgPSB2YWx1ZXMuc2Vzc2lvbl9zdGF0ZTtcbiAgICAgICAgdGhpcy5hY2Nlc3NfdG9rZW4gPSB2YWx1ZXMuYWNjZXNzX3Rva2VuO1xuICAgICAgICB0aGlzLnRva2VuX3R5cGUgPSB2YWx1ZXMudG9rZW5fdHlwZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHZhbHVlcy5zY29wZTtcbiAgICAgICAgdGhpcy5wcm9maWxlID0gdW5kZWZpbmVkOyAvLyB3aWxsIGJlIHNldCBmcm9tIFJlc3BvbnNlVmFsaWRhdG9yXG5cbiAgICAgICAgdGhpcy5leHBpcmVzX2luID0gdmFsdWVzLmV4cGlyZXNfaW47XG4gICAgfVxuXG4gICAgZ2V0IGV4cGlyZXNfaW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmV4cGlyZXNfYXQpIHtcbiAgICAgICAgICAgIGxldCBub3cgPSBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBpcmVzX2F0IC0gbm93O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHNldCBleHBpcmVzX2luKHZhbHVlKXtcbiAgICAgICAgbGV0IGV4cGlyZXNfaW4gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZXhwaXJlc19pbiA9PT0gJ251bWJlcicgJiYgZXhwaXJlc19pbiA+IDApIHtcbiAgICAgICAgICAgIGxldCBub3cgPSBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgICAgICB0aGlzLmV4cGlyZXNfYXQgPSBub3cgKyBleHBpcmVzX2luO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGV4cGlyZWQoKSB7XG4gICAgICAgIGxldCBleHBpcmVzX2luID0gdGhpcy5leHBpcmVzX2luO1xuICAgICAgICBpZiAoZXhwaXJlc19pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwaXJlc19pbiA8PSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHNjb3BlcygpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnNjb3BlIHx8IFwiXCIpLnNwbGl0KFwiIFwiKTtcbiAgICB9XG5cbiAgICBnZXQgaXNPcGVuSWRDb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZXMuaW5kZXhPZihPaWRjU2NvcGUpID49IDAgfHwgISF0aGlzLmlkX3Rva2VuO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi9TdGF0ZS5qcyc7XG5pbXBvcnQgeyBKb3NlVXRpbCB9IGZyb20gJy4vSm9zZVV0aWwuanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTaWduaW5TdGF0ZSBleHRlbmRzIFN0YXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih7bm9uY2UsIGF1dGhvcml0eSwgY2xpZW50X2lkLCByZWRpcmVjdF91cmksIGNvZGVfdmVyaWZpZXIsIHJlc3BvbnNlX21vZGUsIGNsaWVudF9zZWNyZXQsIHNjb3BlLCBleHRyYVRva2VuUGFyYW1zLCBza2lwVXNlckluZm99ID0ge30pIHtcbiAgICAgICAgc3VwZXIoYXJndW1lbnRzWzBdKTtcblxuICAgICAgICBpZiAobm9uY2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25vbmNlID0gcmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9uY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX25vbmNlID0gbm9uY2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29kZV92ZXJpZmllciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gcmFuZG9tKCkgcHJvZHVjZXMgMzIgbGVuZ3RoXG4gICAgICAgICAgICB0aGlzLl9jb2RlX3ZlcmlmaWVyID0gcmFuZG9tKCkgKyByYW5kb20oKSArIHJhbmRvbSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGVfdmVyaWZpZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvZGVfdmVyaWZpZXIgPSBjb2RlX3ZlcmlmaWVyO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5jb2RlX3ZlcmlmaWVyKSB7XG4gICAgICAgICAgICBsZXQgaGFzaCA9IEpvc2VVdGlsLmhhc2hTdHJpbmcodGhpcy5jb2RlX3ZlcmlmaWVyLCBcIlNIQTI1NlwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NvZGVfY2hhbGxlbmdlID0gSm9zZVV0aWwuaGV4VG9CYXNlNjRVcmwoaGFzaCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZWRpcmVjdF91cmkgPSByZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX2F1dGhvcml0eSA9IGF1dGhvcml0eTtcbiAgICAgICAgdGhpcy5fY2xpZW50X2lkID0gY2xpZW50X2lkO1xuICAgICAgICB0aGlzLl9yZXNwb25zZV9tb2RlID0gcmVzcG9uc2VfbW9kZTtcbiAgICAgICAgdGhpcy5fY2xpZW50X3NlY3JldCA9IGNsaWVudF9zZWNyZXQ7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXMgPSBleHRyYVRva2VuUGFyYW1zO1xuICAgICAgICB0aGlzLl9za2lwVXNlckluZm8gPSBza2lwVXNlckluZm87XG4gICAgfVxuXG4gICAgZ2V0IG5vbmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9uY2U7XG4gICAgfVxuICAgIGdldCBhdXRob3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRob3JpdHk7XG4gICAgfVxuICAgIGdldCBjbGllbnRfaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnRfaWQ7XG4gICAgfVxuICAgIGdldCByZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBjb2RlX3ZlcmlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29kZV92ZXJpZmllcjtcbiAgICB9XG4gICAgZ2V0IGNvZGVfY2hhbGxlbmdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29kZV9jaGFsbGVuZ2U7XG4gICAgfVxuICAgIGdldCByZXNwb25zZV9tb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcG9uc2VfbW9kZTtcbiAgICB9XG4gICAgZ2V0IGNsaWVudF9zZWNyZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnRfc2VjcmV0O1xuICAgIH1cbiAgICBnZXQgc2NvcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29wZTtcbiAgICB9XG4gICAgZ2V0IGV4dHJhVG9rZW5QYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHRyYVRva2VuUGFyYW1zO1xuICAgIH1cbiAgICBnZXQgc2tpcFVzZXJJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2tpcFVzZXJJbmZvO1xuICAgIH1cbiAgICBcbiAgICB0b1N0b3JhZ2VTdHJpbmcoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlNpZ25pblN0YXRlLnRvU3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgY3JlYXRlZDogdGhpcy5jcmVhdGVkLFxuICAgICAgICAgICAgcmVxdWVzdF90eXBlOiB0aGlzLnJlcXVlc3RfdHlwZSxcbiAgICAgICAgICAgIG5vbmNlOiB0aGlzLm5vbmNlLFxuICAgICAgICAgICAgY29kZV92ZXJpZmllcjogdGhpcy5jb2RlX3ZlcmlmaWVyLFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0X3VyaSxcbiAgICAgICAgICAgIGF1dGhvcml0eTogdGhpcy5hdXRob3JpdHksXG4gICAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50X2lkLFxuICAgICAgICAgICAgcmVzcG9uc2VfbW9kZTogdGhpcy5yZXNwb25zZV9tb2RlLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldDogdGhpcy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICAgICAgICBleHRyYVRva2VuUGFyYW1zIDogdGhpcy5leHRyYVRva2VuUGFyYW1zLFxuICAgICAgICAgICAgc2tpcFVzZXJJbmZvOiB0aGlzLnNraXBVc2VySW5mb1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbVN0b3JhZ2VTdHJpbmcoc3RvcmFnZVN0cmluZykge1xuICAgICAgICBMb2cuZGVidWcoXCJTaWduaW5TdGF0ZS5mcm9tU3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHN0b3JhZ2VTdHJpbmcpO1xuICAgICAgICByZXR1cm4gbmV3IFNpZ25pblN0YXRlKGRhdGEpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuL1N0YXRlLmpzJztcblxuZXhwb3J0IGNsYXNzIFNpZ25vdXRSZXF1ZXN0IHtcbiAgICBjb25zdHJ1Y3Rvcih7dXJsLCBpZF90b2tlbl9oaW50LCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmksIGRhdGEsIGV4dHJhUXVlcnlQYXJhbXMsIHJlcXVlc3RfdHlwZX0pIHtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25vdXRSZXF1ZXN0LmN0b3I6IE5vIHVybCBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1cmxcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaWRfdG9rZW5faGludCkge1xuICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJpZF90b2tlbl9oaW50XCIsIGlkX3Rva2VuX2hpbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSkge1xuICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJwb3N0X2xvZ291dF9yZWRpcmVjdF91cmlcIiwgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3IFN0YXRlKHsgZGF0YSwgcmVxdWVzdF90eXBlIH0pO1xuXG4gICAgICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJzdGF0ZVwiLCB0aGlzLnN0YXRlLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQga2V5IGluIGV4dHJhUXVlcnlQYXJhbXMpe1xuICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwga2V5LCBleHRyYVF1ZXJ5UGFyYW1zW2tleV0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBVcmxVdGlsaXR5IH0gZnJvbSAnLi9VcmxVdGlsaXR5LmpzJztcblxuZXhwb3J0IGNsYXNzIFNpZ25vdXRSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IodXJsKSB7XG5cbiAgICAgICAgdmFyIHZhbHVlcyA9IFVybFV0aWxpdHkucGFyc2VVcmxGcmFnbWVudCh1cmwsIFwiP1wiKTtcblxuICAgICAgICB0aGlzLmVycm9yID0gdmFsdWVzLmVycm9yO1xuICAgICAgICB0aGlzLmVycm9yX2Rlc2NyaXB0aW9uID0gdmFsdWVzLmVycm9yX2Rlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmVycm9yX3VyaSA9IHZhbHVlcy5lcnJvcl91cmk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHZhbHVlcy5zdGF0ZTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTaWxlbnRSZW5ld1NlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IodXNlck1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIgPSB1c2VyTWFuYWdlcjtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB0aGlzLl90b2tlbkV4cGlyaW5nLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuYWRkQWNjZXNzVG9rZW5FeHBpcmluZyh0aGlzLl9jYWxsYmFjayk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMgd2lsbCB0cmlnZ2VyIGxvYWRpbmcgb2YgdGhlIHVzZXIgc28gdGhlIGV4cGlyaW5nIGV2ZW50cyBjYW4gYmUgaW5pdGlhbGl6ZWRcbiAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmdldFVzZXIoKS50aGVuKHVzZXI9PntcbiAgICAgICAgICAgICAgICAvLyBkZWxpYmVyYXRlIG5vcFxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgLy8gY2F0Y2ggdG8gc3VwcHJlc3MgZXJyb3JzIHNpbmNlIHdlJ3JlIGluIGEgY3RvclxuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlNpbGVudFJlbmV3U2VydmljZS5zdGFydDogRXJyb3IgZnJvbSBnZXRVc2VyOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLnJlbW92ZUFjY2Vzc1Rva2VuRXhwaXJpbmcodGhpcy5fY2FsbGJhY2spO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3Rva2VuRXhwaXJpbmcoKSB7XG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLnNpZ25pblNpbGVudCgpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJTaWxlbnRSZW5ld1NlcnZpY2UuX3Rva2VuRXhwaXJpbmc6IFNpbGVudCB0b2tlbiByZW5ld2FsIHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWxlbnRSZW5ld1NlcnZpY2UuX3Rva2VuRXhwaXJpbmc6IEVycm9yIGZyb20gc2lnbmluU2lsZW50OlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuX3JhaXNlU2lsZW50UmVuZXdFcnJvcihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tLmpzJztcblxuZXhwb3J0IGNsYXNzIFN0YXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih7aWQsIGRhdGEsIGNyZWF0ZWQsIHJlcXVlc3RfdHlwZX0gPSB7fSkge1xuICAgICAgICB0aGlzLl9pZCA9IGlkIHx8IHJhbmRvbSgpO1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcblxuICAgICAgICBpZiAodHlwZW9mIGNyZWF0ZWQgPT09ICdudW1iZXInICYmIGNyZWF0ZWQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVkID0gY3JlYXRlZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZWQgPSBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVxdWVzdF90eXBlID0gIHJlcXVlc3RfdHlwZTtcbiAgICB9XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG4gICAgZ2V0IGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cbiAgICBnZXQgY3JlYXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZWQ7XG4gICAgfVxuICAgIGdldCByZXF1ZXN0X3R5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0X3R5cGU7XG4gICAgfVxuXG4gICAgdG9TdG9yYWdlU3RyaW5nKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS50b1N0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IHRoaXMuY3JlYXRlZCxcbiAgICAgICAgICAgIHJlcXVlc3RfdHlwZTogdGhpcy5yZXF1ZXN0X3R5cGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21TdG9yYWdlU3RyaW5nKHN0b3JhZ2VTdHJpbmcpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuZnJvbVN0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgIHJldHVybiBuZXcgU3RhdGUoSlNPTi5wYXJzZShzdG9yYWdlU3RyaW5nKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyU3RhbGVTdGF0ZShzdG9yYWdlLCBhZ2UpIHtcblxuICAgICAgICB2YXIgY3V0b2ZmID0gRGF0ZS5ub3coKSAvIDEwMDAgLSBhZ2U7XG5cbiAgICAgICAgcmV0dXJuIHN0b3JhZ2UuZ2V0QWxsS2V5cygpLnRoZW4oa2V5cyA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IGdvdCBrZXlzXCIsIGtleXMpO1xuXG4gICAgICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBwID0gc3RvcmFnZS5nZXQoa2V5KS50aGVuKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuZnJvbVN0b3JhZ2VTdHJpbmcoaXRlbSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLmNsZWFyU3RhbGVTdGF0ZTogZ290IGl0ZW0gZnJvbSBrZXk6IFwiLCBrZXksIHN0YXRlLmNyZWF0ZWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLmNyZWF0ZWQgPD0gY3V0b2ZmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IEVycm9yIHBhcnNpbmcgc3RhdGUgZm9yIGtleVwiLCBrZXksIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLmNsZWFyU3RhbGVTdGF0ZTogbm8gaXRlbSBpbiBzdG9yYWdlIGZvciBrZXk6IFwiLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLmNsZWFyU3RhbGVTdGF0ZTogcmVtb3ZlZCBpdGVtIGZvciBrZXk6IFwiLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JhZ2UucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLmNsZWFyU3RhbGVTdGF0ZTogd2FpdGluZyBvbiBwcm9taXNlIGNvdW50OlwiLCBwcm9taXNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL0V2ZW50LmpzJztcblxuY29uc3QgVGltZXJEdXJhdGlvbiA9IDU7IC8vIHNlY29uZHNcblxuZXhwb3J0IGNsYXNzIFRpbWVyIGV4dGVuZHMgRXZlbnQge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgdGltZXIgPSBHbG9iYWwudGltZXIsIG5vd0Z1bmMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gdGltZXI7XG5cbiAgICAgICAgaWYgKG5vd0Z1bmMpIHtcbiAgICAgICAgICAgIHRoaXMuX25vd0Z1bmMgPSBub3dGdW5jO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbm93RnVuYyA9ICgpID0+IERhdGUubm93KCkgLyAxMDAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG5vdygpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuX25vd0Z1bmMoKSk7XG4gICAgfVxuXG4gICAgaW5pdChkdXJhdGlvbikge1xuICAgICAgICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSAxO1xuICAgICAgICB9XG4gICAgICAgIGR1cmF0aW9uID0gcGFyc2VJbnQoZHVyYXRpb24pO1xuXG4gICAgICAgIHZhciBleHBpcmF0aW9uID0gdGhpcy5ub3cgKyBkdXJhdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuZXhwaXJhdGlvbiA9PT0gZXhwaXJhdGlvbiAmJiB0aGlzLl90aW1lckhhbmRsZSkge1xuICAgICAgICAgICAgLy8gbm8gbmVlZCB0byByZWluaXRpYWxpemUgdG8gc2FtZSBleHBpcmF0aW9uLCBzbyBiYWlsIG91dFxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVGltZXIuaW5pdCB0aW1lciBcIiArIHRoaXMuX25hbWUgKyBcIiBza2lwcGluZyBpbml0aWFsaXphdGlvbiBzaW5jZSBhbHJlYWR5IGluaXRpYWxpemVkIGZvciBleHBpcmF0aW9uOlwiLCB0aGlzLmV4cGlyYXRpb24pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcblxuICAgICAgICBMb2cuZGVidWcoXCJUaW1lci5pbml0IHRpbWVyIFwiICsgdGhpcy5fbmFtZSArIFwiIGZvciBkdXJhdGlvbjpcIiwgZHVyYXRpb24pO1xuICAgICAgICB0aGlzLl9leHBpcmF0aW9uID0gZXhwaXJhdGlvbjtcblxuICAgICAgICAvLyB3ZSdyZSB1c2luZyBhIGZhaXJseSBzaG9ydCB0aW1lciBhbmQgdGhlbiBjaGVja2luZyB0aGUgZXhwaXJhdGlvbiBpbiB0aGVcbiAgICAgICAgLy8gY2FsbGJhY2sgdG8gaGFuZGxlIHNjZW5hcmlvcyB3aGVyZSB0aGUgYnJvd3NlciBkZXZpY2Ugc2xlZXBzLCBhbmQgdGhlblxuICAgICAgICAvLyB0aGUgdGltZXJzIGVuZCB1cCBnZXR0aW5nIGRlbGF5ZWQuXG4gICAgICAgIHZhciB0aW1lckR1cmF0aW9uID0gVGltZXJEdXJhdGlvbjtcbiAgICAgICAgaWYgKGR1cmF0aW9uIDwgdGltZXJEdXJhdGlvbikge1xuICAgICAgICAgICAgdGltZXJEdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RpbWVySGFuZGxlID0gdGhpcy5fdGltZXIuc2V0SW50ZXJ2YWwodGhpcy5fY2FsbGJhY2suYmluZCh0aGlzKSwgdGltZXJEdXJhdGlvbiAqIDEwMDApO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZXhwaXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGlyYXRpb247XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5fdGltZXJIYW5kbGUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRpbWVyLmNhbmNlbDogXCIsIHRoaXMuX25hbWUpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIuY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lckhhbmRsZSk7XG4gICAgICAgICAgICB0aGlzLl90aW1lckhhbmRsZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsbGJhY2soKSB7XG4gICAgICAgIHZhciBkaWZmID0gdGhpcy5fZXhwaXJhdGlvbiAtIHRoaXMubm93O1xuICAgICAgICBMb2cuZGVidWcoXCJUaW1lci5jYWxsYmFjazsgXCIgKyB0aGlzLl9uYW1lICsgXCIgdGltZXIgZXhwaXJlcyBpbjpcIiwgZGlmZik7XG5cbiAgICAgICAgaWYgKHRoaXMuX2V4cGlyYXRpb24gPD0gdGhpcy5ub3cpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICBzdXBlci5yYWlzZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgSnNvblNlcnZpY2UgfSBmcm9tICcuL0pzb25TZXJ2aWNlLmpzJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vTWV0YWRhdGFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIFRva2VuQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgSnNvblNlcnZpY2VDdG9yID0gSnNvblNlcnZpY2UsIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UpIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuY3RvcjogTm8gc2V0dGluZ3MgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0dGluZ3NcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLl9qc29uU2VydmljZSA9IG5ldyBKc29uU2VydmljZUN0b3IoKTtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZXJ2aWNlID0gbmV3IE1ldGFkYXRhU2VydmljZUN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgIH1cblxuICAgIGV4Y2hhbmdlQ29kZShhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MuZ3JhbnRfdHlwZSA9IGFyZ3MuZ3JhbnRfdHlwZSB8fCBcImF1dGhvcml6YXRpb25fY29kZVwiO1xuICAgICAgICBhcmdzLmNsaWVudF9pZCA9IGFyZ3MuY2xpZW50X2lkIHx8IHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZDtcbiAgICAgICAgYXJncy5jbGllbnRfc2VjcmV0ID0gYXJncy5jbGllbnRfc2VjcmV0IHx8IHRoaXMuX3NldHRpbmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgIGFyZ3MucmVkaXJlY3RfdXJpID0gYXJncy5yZWRpcmVjdF91cmkgfHwgdGhpcy5fc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xuXG4gICAgICAgIHZhciBiYXNpY0F1dGggPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBjbGllbnRfYXV0aGVudGljYXRpb24gPSBhcmdzLl9jbGllbnRfYXV0aGVudGljYXRpb24gfHwgdGhpcy5fc2V0dGluZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbjtcbiAgICAgICAgZGVsZXRlIGFyZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbjtcblxuICAgICAgICBpZiAoIWFyZ3MuY29kZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiBObyBjb2RlIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIGNvZGUgaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJncy5yZWRpcmVjdF91cmkpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogTm8gcmVkaXJlY3RfdXJpIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIHJlZGlyZWN0X3VyaSBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLmNvZGVfdmVyaWZpZXIpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogTm8gY29kZV92ZXJpZmllciBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSBjb2RlX3ZlcmlmaWVyIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IE5vIGNsaWVudF9pZCBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSBjbGllbnRfaWQgaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJncy5jbGllbnRfc2VjcmV0ICYmIGNsaWVudF9hdXRoZW50aWNhdGlvbiA9PSBcImNsaWVudF9zZWNyZXRfYmFzaWNcIikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiBObyBjbGllbnRfc2VjcmV0IHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIGNsaWVudF9zZWNyZXQgaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VuZGluZyB0aGUgY2xpZW50IGNyZWRlbnRpYWxzIHVzaW5nIHRoZSBCYXNpYyBBdXRoIG1ldGhvZFxuICAgICAgICBpZihjbGllbnRfYXV0aGVudGljYXRpb24gPT0gXCJjbGllbnRfc2VjcmV0X2Jhc2ljXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2ljQXV0aCA9IGFyZ3MuY2xpZW50X2lkICsgJzonICsgYXJncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICAgICAgZGVsZXRlIGFyZ3MuY2xpZW50X2lkO1xuICAgICAgICAgICAgZGVsZXRlIGFyZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0VG9rZW5FbmRwb2ludChmYWxzZSkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiBSZWNlaXZlZCB0b2tlbiBlbmRwb2ludFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9qc29uU2VydmljZS5wb3N0Rm9ybSh1cmwsIGFyZ3MsIGJhc2ljQXV0aCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiByZXNwb25zZSByZWNlaXZlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhjaGFuZ2VSZWZyZXNoVG9rZW4oYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLmdyYW50X3R5cGUgPSBhcmdzLmdyYW50X3R5cGUgfHwgXCJyZWZyZXNoX3Rva2VuXCI7XG4gICAgICAgIGFyZ3MuY2xpZW50X2lkID0gYXJncy5jbGllbnRfaWQgfHwgdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuICAgICAgICBhcmdzLmNsaWVudF9zZWNyZXQgPSBhcmdzLmNsaWVudF9zZWNyZXQgfHwgdGhpcy5fc2V0dGluZ3MuY2xpZW50X3NlY3JldDtcblxuICAgICAgICB2YXIgYmFzaWNBdXRoID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgY2xpZW50X2F1dGhlbnRpY2F0aW9uID0gYXJncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uIHx8IHRoaXMuX3NldHRpbmdzLl9jbGllbnRfYXV0aGVudGljYXRpb247XG4gICAgICAgIGRlbGV0ZSBhcmdzLl9jbGllbnRfYXV0aGVudGljYXRpb247XG5cbiAgICAgICAgaWYgKCFhcmdzLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlUmVmcmVzaFRva2VuOiBObyByZWZyZXNoX3Rva2VuIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIHJlZnJlc2hfdG9rZW4gaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJncy5jbGllbnRfaWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlUmVmcmVzaFRva2VuOiBObyBjbGllbnRfaWQgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgY2xpZW50X2lkIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlbmRpbmcgdGhlIGNsaWVudCBjcmVkZW50aWFscyB1c2luZyB0aGUgQmFzaWMgQXV0aCBtZXRob2RcbiAgICAgICAgaWYoY2xpZW50X2F1dGhlbnRpY2F0aW9uID09IFwiY2xpZW50X3NlY3JldF9iYXNpY1wiKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNpY0F1dGggPSBhcmdzLmNsaWVudF9pZCArICc6JyArIGFyZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgICAgIGRlbGV0ZSBhcmdzLmNsaWVudF9pZDtcbiAgICAgICAgICAgIGRlbGV0ZSBhcmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFRva2VuRW5kcG9pbnQoZmFsc2UpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuQ2xpZW50LmV4Y2hhbmdlUmVmcmVzaFRva2VuOiBSZWNlaXZlZCB0b2tlbiBlbmRwb2ludFwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLnBvc3RGb3JtKHVybCwgYXJncywgYmFzaWNBdXRoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlbkNsaWVudC5leGNoYW5nZVJlZnJlc2hUb2tlbjogcmVzcG9uc2UgcmVjZWl2ZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vTWV0YWRhdGFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcblxuY29uc3QgQWNjZXNzVG9rZW5UeXBlSGludCA9IFwiYWNjZXNzX3Rva2VuXCI7XG5jb25zdCBSZWZyZXNoVG9rZW5UeXBlSGludCA9IFwicmVmcmVzaF90b2tlblwiO1xuXG5leHBvcnQgY2xhc3MgVG9rZW5SZXZvY2F0aW9uQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgWE1MSHR0cFJlcXVlc3RDdG9yID0gR2xvYmFsLlhNTEh0dHBSZXF1ZXN0LCBNZXRhZGF0YVNlcnZpY2VDdG9yID0gTWV0YWRhdGFTZXJ2aWNlKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5jdG9yOiBObyBzZXR0aW5ncyBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHNldHRpbmdzIHByb3ZpZGVkLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX1hNTEh0dHBSZXF1ZXN0Q3RvciA9IFhNTEh0dHBSZXF1ZXN0Q3RvcjtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZXJ2aWNlID0gbmV3IE1ldGFkYXRhU2VydmljZUN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgIH1cblxuICAgIHJldm9rZSh0b2tlbiwgcmVxdWlyZWQsIHR5cGUgPSBcImFjY2Vzc190b2tlblwiKSB7XG4gICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IE5vIHRva2VuIHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdG9rZW4gcHJvdmlkZWQuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgIT09IEFjY2Vzc1Rva2VuVHlwZUhpbnQgJiYgdHlwZSAhPSBSZWZyZXNoVG9rZW5UeXBlSGludCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZTogSW52YWxpZCB0b2tlbiB0eXBlXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB0b2tlbiB0eXBlLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0UmV2b2NhdGlvbkVuZHBvaW50KCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZTogUmV2b2NhdGlvbiBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZXZvY2F0aW9uIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbm90IHJlcXVpcmVkLCBzbyBkb24ndCBlcnJvciBhbmQganVzdCByZXR1cm5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IFJldm9raW5nIFwiICsgdHlwZSk7XG4gICAgICAgICAgICB2YXIgY2xpZW50X2lkID0gdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuICAgICAgICAgICAgdmFyIGNsaWVudF9zZWNyZXQgPSB0aGlzLl9zZXR0aW5ncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jldm9rZSh1cmwsIGNsaWVudF9pZCwgY2xpZW50X3NlY3JldCwgdG9rZW4sIHR5cGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfcmV2b2tlKHVybCwgY2xpZW50X2lkLCBjbGllbnRfc2VjcmV0LCB0b2tlbiwgdHlwZSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgdGhpcy5fWE1MSHR0cFJlcXVlc3RDdG9yKCk7XG4gICAgICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgdXJsKTtcblxuICAgICAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBIVFRQIHJlc3BvbnNlIHJlY2VpdmVkLCBzdGF0dXNcIiwgeGhyLnN0YXR1cyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcih4aHIuc3RhdHVzVGV4dCArIFwiIChcIiArIHhoci5zdGF0dXMgKyBcIilcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHsgXG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZTogTmV0d29yayBFcnJvci5cIilcbiAgICAgICAgICAgICAgICByZWplY3QoXCJOZXR3b3JrIEVycm9yXCIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGJvZHkgPSBcImNsaWVudF9pZD1cIiArIGVuY29kZVVSSUNvbXBvbmVudChjbGllbnRfaWQpO1xuICAgICAgICAgICAgaWYgKGNsaWVudF9zZWNyZXQpIHtcbiAgICAgICAgICAgICAgICBib2R5ICs9IFwiJmNsaWVudF9zZWNyZXQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoY2xpZW50X3NlY3JldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2R5ICs9IFwiJnRva2VuX3R5cGVfaGludD1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0eXBlKTtcbiAgICAgICAgICAgIGJvZHkgKz0gXCImdG9rZW49XCIgKyBlbmNvZGVVUklDb21wb25lbnQodG9rZW4pO1xuXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcbiAgICAgICAgICAgIHhoci5zZW5kKGJvZHkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBVcmxVdGlsaXR5IHtcbiAgICBzdGF0aWMgYWRkUXVlcnlQYXJhbSh1cmwsIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignPycpIDwgMCkge1xuICAgICAgICAgICAgdXJsICs9IFwiP1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVybFt1cmwubGVuZ3RoIC0gMV0gIT09IFwiP1wiKSB7XG4gICAgICAgICAgICB1cmwgKz0gXCImXCI7XG4gICAgICAgIH1cblxuICAgICAgICB1cmwgKz0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpO1xuICAgICAgICB1cmwgKz0gXCI9XCI7XG4gICAgICAgIHVybCArPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlVXJsRnJhZ21lbnQodmFsdWUsIGRlbGltaXRlciA9IFwiI1wiLCBnbG9iYWwgPSBHbG9iYWwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgdmFsdWUgPSBnbG9iYWwubG9jYXRpb24uaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpZHggPSB2YWx1ZS5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKGlkeCArIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlbGltaXRlciA9PT0gXCI/XCIpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlJ3JlIGRvaW5nIHF1ZXJ5LCB0aGVuIHN0cmlwIG9mZiBoYXNoIGZyYWdtZW50IGJlZm9yZSB3ZSBwYXJzZVxuICAgICAgICAgICAgaWR4ID0gdmFsdWUuaW5kZXhPZignIycpO1xuICAgICAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgaWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJhbXMgPSB7fSxcbiAgICAgICAgICAgIHJlZ2V4ID0gLyhbXiY9XSspPShbXiZdKikvZyxcbiAgICAgICAgICAgIG07XG5cbiAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICB3aGlsZSAobSA9IHJlZ2V4LmV4ZWModmFsdWUpKSB7XG4gICAgICAgICAgICB2YXIga2V5LCB2YWw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChtWzFdKTtcbiAgICAgICAgICAgICAgICB2YWwgPSBkZWNvZGVVUklDb21wb25lbnQobVsyXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVybFV0aWxpdHkucGFyc2VVcmxGcmFnbWVudDogcmVzcG9uc2UgY29udGFpbnMgbWFsZm9ybWVkIFVSTCBlbmNvZGluZ1wiLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiUmVzcG9uc2UgY29udGFpbnMgbWFsZm9ybWVkIFVSTCBlbmNvZGluZ1wiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG5ldmVyIGxldCBhIHJlc3BvbnNlIFVSTCB3cml0ZSB0byB0aGUgb2JqZWN0IHByb3RvdHlwZVxuICAgICAgICAgICAgaWYgKGtleSAhPT0gXCJfX3Byb3RvX19cIiAmJiBrZXkgIT09IFwiY29uc3RydWN0b3JcIiAmJiBrZXkgIT09IFwicHJvdG90eXBlXCIpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb3VudGVyKysgPiA1MCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVybFV0aWxpdHkucGFyc2VVcmxGcmFnbWVudDogcmVzcG9uc2UgZXhjZWVkZWQgZXhwZWN0ZWQgbnVtYmVyIG9mIHBhcmFtZXRlcnNcIiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlJlc3BvbnNlIGV4Y2VlZGVkIGV4cGVjdGVkIG51bWJlciBvZiBwYXJhbWV0ZXJzXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gICAgY29uc3RydWN0b3Ioe2lkX3Rva2VuLCBzZXNzaW9uX3N0YXRlLCBhY2Nlc3NfdG9rZW4sIHJlZnJlc2hfdG9rZW4sIHRva2VuX3R5cGUsIHNjb3BlLCBwcm9maWxlLCBleHBpcmVzX2F0LCBzdGF0ZX0pIHtcbiAgICAgICAgdGhpcy5pZF90b2tlbiA9IGlkX3Rva2VuO1xuICAgICAgICB0aGlzLnNlc3Npb25fc3RhdGUgPSBzZXNzaW9uX3N0YXRlO1xuICAgICAgICB0aGlzLmFjY2Vzc190b2tlbiA9IGFjY2Vzc190b2tlbjtcbiAgICAgICAgdGhpcy5yZWZyZXNoX3Rva2VuID0gcmVmcmVzaF90b2tlbjtcbiAgICAgICAgdGhpcy50b2tlbl90eXBlID0gdG9rZW5fdHlwZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLnByb2ZpbGUgPSBwcm9maWxlO1xuICAgICAgICB0aGlzLmV4cGlyZXNfYXQgPSBleHBpcmVzX2F0O1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IGV4cGlyZXNfaW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmV4cGlyZXNfYXQpIHtcbiAgICAgICAgICAgIGxldCBub3cgPSBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBpcmVzX2F0IC0gbm93O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHNldCBleHBpcmVzX2luKHZhbHVlKSB7XG4gICAgICAgIGxldCBleHBpcmVzX2luID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICBpZiAodHlwZW9mIGV4cGlyZXNfaW4gPT09ICdudW1iZXInICYmIGV4cGlyZXNfaW4gPiAwKSB7XG4gICAgICAgICAgICBsZXQgbm93ID0gcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgdGhpcy5leHBpcmVzX2F0ID0gbm93ICsgZXhwaXJlc19pbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBleHBpcmVkKCkge1xuICAgICAgICBsZXQgZXhwaXJlc19pbiA9IHRoaXMuZXhwaXJlc19pbjtcbiAgICAgICAgaWYgKGV4cGlyZXNfaW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cGlyZXNfaW4gPD0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBzY29wZXMoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5zY29wZSB8fCBcIlwiKS5zcGxpdChcIiBcIik7XG4gICAgfVxuXG4gICAgdG9TdG9yYWdlU3RyaW5nKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyLnRvU3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGlkX3Rva2VuOiB0aGlzLmlkX3Rva2VuLFxuICAgICAgICAgICAgc2Vzc2lvbl9zdGF0ZTogdGhpcy5zZXNzaW9uX3N0YXRlLFxuICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiB0aGlzLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMucmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgIHRva2VuX3R5cGU6IHRoaXMudG9rZW5fdHlwZSxcbiAgICAgICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgICAgICAgcHJvZmlsZTogdGhpcy5wcm9maWxlLFxuICAgICAgICAgICAgZXhwaXJlc19hdDogdGhpcy5leHBpcmVzX2F0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tU3RvcmFnZVN0cmluZyhzdG9yYWdlU3RyaW5nKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXIuZnJvbVN0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgIHJldHVybiBuZXcgVXNlcihKU09OLnBhcnNlKHN0b3JhZ2VTdHJpbmcpKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBKc29uU2VydmljZSB9IGZyb20gJy4vSnNvblNlcnZpY2UuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgSm9zZVV0aWwgfSBmcm9tICcuL0pvc2VVdGlsLmpzJztcblxuZXhwb3J0IGNsYXNzIFVzZXJJbmZvU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHNldHRpbmdzLCBcbiAgICAgICAgSnNvblNlcnZpY2VDdG9yID0gSnNvblNlcnZpY2UsIFxuICAgICAgICBNZXRhZGF0YVNlcnZpY2VDdG9yID0gTWV0YWRhdGFTZXJ2aWNlLCBcbiAgICAgICAgam9zZVV0aWwgPSBKb3NlVXRpbFxuICAgICkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuY3RvcjogTm8gc2V0dGluZ3MgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0dGluZ3NcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLl9qc29uU2VydmljZSA9IG5ldyBKc29uU2VydmljZUN0b3IodW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMuX2dldENsYWltc0Zyb21Kd3QuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZSA9IG5ldyBNZXRhZGF0YVNlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fam9zZVV0aWwgPSBqb3NlVXRpbDtcbiAgICB9XG5cbiAgICBnZXRDbGFpbXModG9rZW4pIHtcbiAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLmdldENsYWltczogTm8gdG9rZW4gcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgdG9rZW4gaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRVc2VySW5mb0VuZHBvaW50KCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLmdldENsYWltczogcmVjZWl2ZWQgdXNlcmluZm8gdXJsXCIsIHVybCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9qc29uU2VydmljZS5nZXRKc29uKHVybCwgdG9rZW4pLnRoZW4oY2xhaW1zID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuZ2V0Q2xhaW1zOiBjbGFpbXMgcmVjZWl2ZWRcIiwgY2xhaW1zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhaW1zO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9nZXRDbGFpbXNGcm9tSnd0KHJlcSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGp3dCA9IHRoaXMuX2pvc2VVdGlsLnBhcnNlSnd0KHJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgaWYgKCFqd3QgfHwgIWp3dC5oZWFkZXIgfHwgIWp3dC5wYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBGYWlsZWQgdG8gcGFyc2UgSldUXCIsIGp3dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBraWQgPSBqd3QuaGVhZGVyLmtpZDtcblxuICAgICAgICAgICAgbGV0IGlzc3VlclByb21pc2U7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX3NldHRpbmdzLnVzZXJJbmZvSnd0SXNzdWVyKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnT1AnOlxuICAgICAgICAgICAgICAgICAgICBpc3N1ZXJQcm9taXNlID0gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldElzc3VlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBTlknOlxuICAgICAgICAgICAgICAgICAgICBpc3N1ZXJQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGp3dC5wYXlsb2FkLmlzcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlzc3VlclByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodGhpcy5fc2V0dGluZ3MudXNlckluZm9Kd3RJc3N1ZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGlzc3VlclByb21pc2UudGhlbihpc3N1ZXIgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogUmVjZWl2ZWQgaXNzdWVyOlwiICsgaXNzdWVyKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXMoKS50aGVuKGtleXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogTm8gc2lnbmluZyBrZXlzIGZyb20gbWV0YWRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gc2lnbmluZyBrZXlzIGZyb20gbWV0YWRhdGFcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBSZWNlaXZlZCBzaWduaW5nIGtleXNcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgha2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzID0gdGhpcy5fZmlsdGVyQnlBbGcoa2V5cywgand0LmhlYWRlci5hbGcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBObyBraWQgZm91bmQgaW4gaWRfdG9rZW4gYW5kIG1vcmUgdGhhbiBvbmUga2V5IGZvdW5kIGluIG1ldGFkYXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBraWQgZm91bmQgaW4gaWRfdG9rZW4gYW5kIG1vcmUgdGhhbiBvbmUga2V5IGZvdW5kIGluIG1ldGFkYXRhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtpZCBpcyBtYW5kYXRvcnkgb25seSB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSBrZXlzIGluIHRoZSByZWZlcmVuY2VkIEpXSyBTZXQgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNTaWduaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5c1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXMuZmlsdGVyKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleS5raWQgPT09IGtpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogTm8ga2V5IG1hdGNoaW5nIGtpZCBvciBhbGcgZm91bmQgaW4gc2lnbmluZyBrZXlzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGtleSBtYXRjaGluZyBraWQgb3IgYWxnIGZvdW5kIGluIHNpZ25pbmcga2V5c1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgYXVkaWVuY2UgPSB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsb2NrU2tld0luU2Vjb25kcyA9IHRoaXMuX3NldHRpbmdzLmNsb2NrU2tldztcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBWYWxpZGFpbmcgSldUOyB1c2luZyBjbG9jayBza2V3IChpbiBzZWNvbmRzKSBvZjogXCIsIGNsb2NrU2tld0luU2Vjb25kcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvc2VVdGlsLnZhbGlkYXRlSnd0KHJlcS5yZXNwb25zZVRleHQsIGtleSwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3SW5TZWNvbmRzLCB1bmRlZmluZWQsIHRydWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBKV1QgdmFsaWRhdGlvbiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGp3dC5wYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IEVycm9yIHBhcnNpbmcgSldUIHJlc3BvbnNlXCIsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZmlsdGVyQnlBbGcoa2V5cywgYWxnKSB7XG4gICAgICAgIGlmICghSm9zZVV0aWwuaXNBbGxvd2VkU2lnbmluZ0FsZyhhbGcpKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2ZpbHRlckJ5QWxnOiBhbGcgbm90IGFsbG93ZWQ6IFwiLCBhbGcpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrdHkgPSBudWxsO1xuICAgICAgICBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJSU1wiKSkge1xuICAgICAgICAgICAga3R5ID0gXCJSU0FcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGcuc3RhcnRzV2l0aChcIlBTXCIpKSB7XG4gICAgICAgICAgICAvLyBSU0EtUFNTIGtleXMgYXJlIGt0eSBcIlJTQVwiIChSRkMgNzUxOClcbiAgICAgICAgICAgIGt0eSA9IFwiUlNBXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJFU1wiKSkge1xuICAgICAgICAgICAga3R5ID0gXCJFQ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLl9maWx0ZXJCeUFsZzogYWxnIG5vdCBzdXBwb3J0ZWQ6IFwiLCBhbGcpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLl9maWx0ZXJCeUFsZzogTG9va2luZyBmb3Iga2V5cyB0aGF0IG1hdGNoIGt0eTogXCIsIGt0eSk7XG5cbiAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGtleSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2V5Lmt0eSA9PT0ga3R5O1xuICAgICAgICB9KTtcblxuICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2ZpbHRlckJ5QWxnOiBOdW1iZXIgb2Yga2V5cyB0aGF0IG1hdGNoIGt0eTogXCIsIGt0eSwga2V5cy5sZW5ndGgpO1xuXG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnQgfSBmcm9tICcuL09pZGNDbGllbnQuanMnO1xuaW1wb3J0IHsgVXNlck1hbmFnZXJTZXR0aW5ncyB9IGZyb20gJy4vVXNlck1hbmFnZXJTZXR0aW5ncy5qcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi9Vc2VyLmpzJztcbmltcG9ydCB7IFVzZXJNYW5hZ2VyRXZlbnRzIH0gZnJvbSAnLi9Vc2VyTWFuYWdlckV2ZW50cy5qcyc7XG5pbXBvcnQgeyBTaWxlbnRSZW5ld1NlcnZpY2UgfSBmcm9tICcuL1NpbGVudFJlbmV3U2VydmljZS5qcyc7XG5pbXBvcnQgeyBTZXNzaW9uTW9uaXRvciB9IGZyb20gJy4vU2Vzc2lvbk1vbml0b3IuanMnO1xuaW1wb3J0IHsgU2lnbmluUmVxdWVzdCB9IGZyb20gXCIuL1NpZ25pblJlcXVlc3RcIjtcbmltcG9ydCB7IFRva2VuUmV2b2NhdGlvbkNsaWVudCB9IGZyb20gJy4vVG9rZW5SZXZvY2F0aW9uQ2xpZW50LmpzJztcbmltcG9ydCB7IFRva2VuQ2xpZW50IH0gZnJvbSAnLi9Ub2tlbkNsaWVudC5qcyc7XG5pbXBvcnQgeyBKb3NlVXRpbCB9IGZyb20gJy4vSm9zZVV0aWwuanMnO1xuXG5cbmV4cG9ydCBjbGFzcyBVc2VyTWFuYWdlciBleHRlbmRzIE9pZGNDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzID0ge30sXG4gICAgICAgIFNpbGVudFJlbmV3U2VydmljZUN0b3IgPSBTaWxlbnRSZW5ld1NlcnZpY2UsXG4gICAgICAgIFNlc3Npb25Nb25pdG9yQ3RvciA9IFNlc3Npb25Nb25pdG9yLFxuICAgICAgICBUb2tlblJldm9jYXRpb25DbGllbnRDdG9yID0gVG9rZW5SZXZvY2F0aW9uQ2xpZW50LFxuICAgICAgICBUb2tlbkNsaWVudEN0b3IgPSBUb2tlbkNsaWVudCxcbiAgICAgICAgam9zZVV0aWwgPSBKb3NlVXRpbFxuICAgICkge1xuXG4gICAgICAgIGlmICghKHNldHRpbmdzIGluc3RhbmNlb2YgVXNlck1hbmFnZXJTZXR0aW5ncykpIHtcbiAgICAgICAgICAgIHNldHRpbmdzID0gbmV3IFVzZXJNYW5hZ2VyU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKHNldHRpbmdzKTtcblxuICAgICAgICB0aGlzLl9ldmVudHMgPSBuZXcgVXNlck1hbmFnZXJFdmVudHMoc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl9zaWxlbnRSZW5ld1NlcnZpY2UgPSBuZXcgU2lsZW50UmVuZXdTZXJ2aWNlQ3Rvcih0aGlzKTtcblxuICAgICAgICAvLyBvcmRlciBpcyBpbXBvcnRhbnQgZm9yIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczsgdGhlc2Ugc2VydmljZXMgZGVwZW5kIHVwb24gdGhlIGV2ZW50cy5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0b21hdGljU2lsZW50UmVuZXcpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLmN0b3I6IGF1dG9tYXRpY1NpbGVudFJlbmV3IGlzIGNvbmZpZ3VyZWQsIHNldHRpbmcgdXAgc2lsZW50IHJlbmV3XCIpO1xuICAgICAgICAgICAgdGhpcy5zdGFydFNpbGVudFJlbmV3KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tb25pdG9yU2Vzc2lvbikge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuY3RvcjogbW9uaXRvclNlc3Npb24gaXMgY29uZmlndXJlZCwgc2V0dGluZyB1cCBzZXNzaW9uIG1vbml0b3JcIik7XG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uTW9uaXRvciA9IG5ldyBTZXNzaW9uTW9uaXRvckN0b3IodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90b2tlblJldm9jYXRpb25DbGllbnQgPSBuZXcgVG9rZW5SZXZvY2F0aW9uQ2xpZW50Q3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX3Rva2VuQ2xpZW50ID0gbmV3IFRva2VuQ2xpZW50Q3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX2pvc2VVdGlsID0gam9zZVV0aWw7XG4gICAgfVxuXG4gICAgZ2V0IF9yZWRpcmVjdE5hdmlnYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MucmVkaXJlY3ROYXZpZ2F0b3I7XG4gICAgfVxuICAgIGdldCBfcG9wdXBOYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnBvcHVwTmF2aWdhdG9yO1xuICAgIH1cbiAgICBnZXQgX2lmcmFtZU5hdmlnYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuaWZyYW1lTmF2aWdhdG9yO1xuICAgIH1cbiAgICBnZXQgX3VzZXJTdG9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudXNlclN0b3JlO1xuICAgIH1cblxuICAgIGdldCBldmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHM7XG4gICAgfVxuXG4gICAgZ2V0VXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VyKCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5nZXRVc2VyOiB1c2VyIGxvYWRlZFwiKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5sb2FkKHVzZXIsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5nZXRVc2VyOiB1c2VyIG5vdCBmb3VuZCBpbiBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVVzZXIobnVsbCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnJlbW92ZVVzZXI6IHVzZXIgcmVtb3ZlZCBmcm9tIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMudW5sb2FkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25pblJlZGlyZWN0KGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5yZXF1ZXN0X3R5cGUgPSBcInNpOnJcIjtcbiAgICAgICAgbGV0IG5hdlBhcmFtcyA9IHtcbiAgICAgICAgICAgIHVzZVJlcGxhY2VUb05hdmlnYXRlIDogYXJncy51c2VSZXBsYWNlVG9OYXZpZ2F0ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluU3RhcnQoYXJncywgdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3IsIG5hdlBhcmFtcykudGhlbigoKT0+e1xuICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5SZWRpcmVjdDogc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpZ25pblJlZGlyZWN0Q2FsbGJhY2sodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5FbmQodXJsIHx8IHRoaXMuX3JlZGlyZWN0TmF2aWdhdG9yLnVybCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyLnByb2ZpbGUgJiYgdXNlci5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUmVkaXJlY3RDYWxsYmFjazogc3VjY2Vzc2Z1bCwgc2lnbmVkIGluIHN1YjogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5SZWRpcmVjdENhbGxiYWNrOiBubyBzdWJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWduaW5Qb3B1cChhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MucmVxdWVzdF90eXBlID0gXCJzaTpwXCI7XG4gICAgICAgIGxldCB1cmwgPSBhcmdzLnJlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnBvcHVwX3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnJlZGlyZWN0X3VyaTtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLnNpZ25pblBvcHVwOiBObyBwb3B1cF9yZWRpcmVjdF91cmkgb3IgcmVkaXJlY3RfdXJpIGNvbmZpZ3VyZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gcG9wdXBfcmVkaXJlY3RfdXJpIG9yIHJlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyZ3MucmVkaXJlY3RfdXJpID0gdXJsO1xuICAgICAgICBhcmdzLmRpc3BsYXkgPSBcInBvcHVwXCI7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pbihhcmdzLCB0aGlzLl9wb3B1cE5hdmlnYXRvciwge1xuICAgICAgICAgICAgc3RhcnRVcmw6IHVybCxcbiAgICAgICAgICAgIHBvcHVwV2luZG93RmVhdHVyZXM6IGFyZ3MucG9wdXBXaW5kb3dGZWF0dXJlcyB8fCB0aGlzLnNldHRpbmdzLnBvcHVwV2luZG93RmVhdHVyZXMsXG4gICAgICAgICAgICBwb3B1cFdpbmRvd1RhcmdldDogYXJncy5wb3B1cFdpbmRvd1RhcmdldCB8fCB0aGlzLnNldHRpbmdzLnBvcHVwV2luZG93VGFyZ2V0XG4gICAgICAgIH0pLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyLnByb2ZpbGUgJiYgdXNlci5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblBvcHVwOiBzaWduaW5Qb3B1cCBzdWNjZXNzZnVsLCBzaWduZWQgaW4gc3ViOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblBvcHVwOiBubyBzdWJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpZ25pblBvcHVwQ2FsbGJhY2sodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5DYWxsYmFjayh1cmwsIHRoaXMuX3BvcHVwTmF2aWdhdG9yKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5wcm9maWxlICYmIHVzZXIucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cENhbGxiYWNrOiBzdWNjZXNzZnVsLCBzaWduZWQgaW4gc3ViOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblBvcHVwQ2FsbGJhY2s6IG5vIHN1YlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLnNpZ25pblBvcHVwQ2FsbGJhY2sgZXJyb3I6IFwiICsgZXJyICYmIGVyci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbmluU2lsZW50KGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgLy8gZmlyc3QgZGV0ZXJtaW5lIGlmIHdlIGhhdmUgYSByZWZyZXNoIHRva2VuLCBvciBuZWVkIHRvIHVzZSBpZnJhbWVcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VyKCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyICYmIHVzZXIucmVmcmVzaF90b2tlbikge1xuICAgICAgICAgICAgICAgIGFyZ3MucmVmcmVzaF90b2tlbiA9IHVzZXIucmVmcmVzaF90b2tlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlUmVmcmVzaFRva2VuKGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJncy5yZXF1ZXN0X3R5cGUgPSBcInNpOnNcIjtcbiAgICAgICAgICAgICAgICBhcmdzLmlkX3Rva2VuX2hpbnQgPSBhcmdzLmlkX3Rva2VuX2hpbnQgfHwgKHRoaXMuc2V0dGluZ3MuaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3ICYmIHVzZXIgJiYgdXNlci5pZF90b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIgJiYgdGhpcy5fc2V0dGluZ3MudmFsaWRhdGVTdWJPblNpbGVudFJlbmV3KSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudCwgc3ViamVjdCBwcmlvciB0byBzaWxlbnQgcmVuZXc6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgYXJncy5jdXJyZW50X3N1YiA9IHVzZXIucHJvZmlsZS5zdWI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5TaWxlbnRJZnJhbWUoYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF91c2VSZWZyZXNoVG9rZW4oYXJncyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlbkNsaWVudC5leGNoYW5nZVJlZnJlc2hUb2tlbihhcmdzKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl91c2VSZWZyZXNoVG9rZW46IE5vIHJlc3BvbnNlIHJldHVybmVkIGZyb20gdG9rZW4gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiTm8gcmVzcG9uc2UgcmV0dXJuZWQgZnJvbSB0b2tlbiBlbmRwb2ludFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcmVzdWx0LmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl91c2VSZWZyZXNoVG9rZW46IE5vIGFjY2VzcyB0b2tlbiByZXR1cm5lZCBmcm9tIHRva2VuIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIk5vIGFjY2VzcyB0b2tlbiByZXR1cm5lZCBmcm9tIHRva2VuIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpZFRva2VuVmFsaWRhdGlvbiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmlkX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZFRva2VuVmFsaWRhdGlvbiA9IHRoaXMuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbih1c2VyLnByb2ZpbGUsIHJlc3VsdC5pZF90b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWRUb2tlblZhbGlkYXRpb24udGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fdXNlUmVmcmVzaFRva2VuOiByZWZyZXNoIHRva2VuIHJlc3BvbnNlIHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmlkX3Rva2VuID0gcmVzdWx0LmlkX3Rva2VuIHx8IHVzZXIuaWRfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmFjY2Vzc190b2tlbiA9IHJlc3VsdC5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLnJlZnJlc2hfdG9rZW4gPSByZXN1bHQucmVmcmVzaF90b2tlbiB8fCB1c2VyLnJlZnJlc2hfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmV4cGlyZXNfaW4gPSByZXN1bHQuZXhwaXJlc19pbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVVc2VyKHVzZXIpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubG9hZCh1c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuKHByb2ZpbGUsIGlkX3Rva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0SXNzdWVyKCkudGhlbihpc3N1ZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZ2V0RXBvY2hUaW1lKCkudGhlbihub3cgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb3NlVXRpbC52YWxpZGF0ZUp3dEF0dHJpYnV0ZXMoaWRfdG9rZW4sIGlzc3VlciwgdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkLCB0aGlzLl9zZXR0aW5ncy5jbG9ja1NrZXcsIG5vdykudGhlbihwYXlsb2FkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuOiBGYWlsZWQgdG8gdmFsaWRhdGUgaWRfdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHZhbGlkYXRlIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5zdWIgIT09IHByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuOiBzdWIgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggY3VycmVudCBzdWJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwic3ViIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIGN1cnJlbnQgc3ViXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hdXRoX3RpbWUgJiYgcGF5bG9hZC5hdXRoX3RpbWUgIT09IHByb2ZpbGUuYXV0aF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuOiBhdXRoX3RpbWUgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggb3JpZ2luYWwgYXV0aF90aW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImF1dGhfdGltZSBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBvcmlnaW5hbCBhdXRoX3RpbWVcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmF6cCAmJiBwYXlsb2FkLmF6cCAhPT0gcHJvZmlsZS5henApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW46IGF6cCBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBvcmlnaW5hbCBhenBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXpwIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIG9yaWdpbmFsIGF6cFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmF6cCAmJiBwcm9maWxlLmF6cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbjogYXpwIG5vdCBpbiBpZF90b2tlbiwgYnV0IHByZXNlbnQgaW4gb3JpZ2luYWwgaWRfdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXpwIG5vdCBpbiBpZF90b2tlbiwgYnV0IHByZXNlbnQgaW4gb3JpZ2luYWwgaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIF9zaWduaW5TaWxlbnRJZnJhbWUoYXJncyA9IHt9KSB7XG4gICAgICAgIGxldCB1cmwgPSBhcmdzLnJlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnNpbGVudF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmk7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5zaWduaW5TaWxlbnQ6IE5vIHNpbGVudF9yZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzaWxlbnRfcmVkaXJlY3RfdXJpIGNvbmZpZ3VyZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5yZWRpcmVjdF91cmkgPSB1cmw7XG4gICAgICAgIGFyZ3MucHJvbXB0ID0gYXJncy5wcm9tcHQgfHwgXCJub25lXCI7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pbihhcmdzLCB0aGlzLl9pZnJhbWVOYXZpZ2F0b3IsIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsOiB1cmwsXG4gICAgICAgICAgICBzaWxlbnRSZXF1ZXN0VGltZW91dDogYXJncy5zaWxlbnRSZXF1ZXN0VGltZW91dCB8fCB0aGlzLnNldHRpbmdzLnNpbGVudFJlcXVlc3RUaW1lb3V0XG4gICAgICAgIH0pLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyLnByb2ZpbGUgJiYgdXNlci5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudDogc3VjY2Vzc2Z1bCwgc2lnbmVkIGluIHN1YjogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5TaWxlbnQ6IG5vIHN1YlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWduaW5TaWxlbnRDYWxsYmFjayh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pbkNhbGxiYWNrKHVybCwgdGhpcy5faWZyYW1lTmF2aWdhdG9yKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5wcm9maWxlICYmIHVzZXIucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5TaWxlbnRDYWxsYmFjazogc3VjY2Vzc2Z1bCwgc2lnbmVkIGluIHN1YjogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5TaWxlbnRDYWxsYmFjazogbm8gc3ViXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25pbkNhbGxiYWNrKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkU2lnbmluUmVzcG9uc2VTdGF0ZSh1cmwpLnRoZW4oKHtzdGF0ZSwgcmVzcG9uc2V9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUucmVxdWVzdF90eXBlID09PSBcInNpOnJcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25pblJlZGlyZWN0Q2FsbGJhY2sodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0ZS5yZXF1ZXN0X3R5cGUgPT09IFwic2k6cFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmluUG9wdXBDYWxsYmFjayh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlLnJlcXVlc3RfdHlwZSA9PT0gXCJzaTpzXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaWduaW5TaWxlbnRDYWxsYmFjayh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImludmFsaWQgcmVzcG9uc2VfdHlwZSBpbiBzdGF0ZVwiKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25vdXRDYWxsYmFjayh1cmwsIGtlZXBPcGVuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZSh1cmwpLnRoZW4oKHtzdGF0ZSwgcmVzcG9uc2V9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUucmVxdWVzdF90eXBlID09PSBcInNvOnJcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaWdub3V0UmVkaXJlY3RDYWxsYmFjayh1cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUucmVxdWVzdF90eXBlID09PSBcInNvOnBcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaWdub3V0UG9wdXBDYWxsYmFjayh1cmwsIGtlZXBPcGVuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImludmFsaWQgcmVzcG9uc2VfdHlwZSBpbiBzdGF0ZVwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHF1ZXJ5U2Vzc2lvblN0YXR1cyhhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MucmVxdWVzdF90eXBlID0gXCJzaTpzXCI7IC8vIHRoaXMgYWN0cyBsaWtlIGEgc2lnbmluIHNpbGVudFxuICAgICAgICBsZXQgdXJsID0gYXJncy5yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5zaWxlbnRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzOiBObyBzaWxlbnRfcmVkaXJlY3RfdXJpIGNvbmZpZ3VyZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gc2lsZW50X3JlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyZ3MucmVkaXJlY3RfdXJpID0gdXJsO1xuICAgICAgICBhcmdzLnByb21wdCA9IFwibm9uZVwiO1xuICAgICAgICBhcmdzLnJlc3BvbnNlX3R5cGUgPSBhcmdzLnJlc3BvbnNlX3R5cGUgfHwgdGhpcy5zZXR0aW5ncy5xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZTtcbiAgICAgICAgYXJncy5zY29wZSA9IGFyZ3Muc2NvcGUgfHwgXCJvcGVuaWRcIjtcbiAgICAgICAgYXJncy5za2lwVXNlckluZm8gPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5TdGFydChhcmdzLCB0aGlzLl9pZnJhbWVOYXZpZ2F0b3IsIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsOiB1cmwsXG4gICAgICAgICAgICBzaWxlbnRSZXF1ZXN0VGltZW91dDogYXJncy5zaWxlbnRSZXF1ZXN0VGltZW91dCB8fCB0aGlzLnNldHRpbmdzLnNpbGVudFJlcXVlc3RUaW1lb3V0XG4gICAgICAgIH0pLnRoZW4obmF2UmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1NpZ25pblJlc3BvbnNlKG5hdlJlc3BvbnNlLnVybCkudGhlbihzaWduaW5SZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzOiBnb3Qgc2lnbmluIHJlc3BvbnNlXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNpZ25pblJlc3BvbnNlLnNlc3Npb25fc3RhdGUgJiYgc2lnbmluUmVzcG9uc2UucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXM6IHF1ZXJ5U2Vzc2lvblN0YXR1cyBzdWNjZXNzIGZvciBzdWI6IFwiLCAgc2lnbmluUmVzcG9uc2UucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbl9zdGF0ZTogc2lnbmluUmVzcG9uc2Uuc2Vzc2lvbl9zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Yjogc2lnbmluUmVzcG9uc2UucHJvZmlsZS5zdWIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWQ6IHNpZ25pblJlc3BvbnNlLnByb2ZpbGUuc2lkXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcInF1ZXJ5U2Vzc2lvblN0YXR1cyBzdWNjZXNzZnVsLCB1c2VyIG5vdCBhdXRoZW50aWNhdGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyLnNlc3Npb25fc3RhdGUgJiYgdGhpcy5zZXR0aW5ncy5tb25pdG9yQW5vbnltb3VzU2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLm1lc3NhZ2UgPT0gXCJsb2dpbl9yZXF1aXJlZFwiIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPT0gXCJjb25zZW50X3JlcXVpcmVkXCIgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9PSBcImludGVyYWN0aW9uX3JlcXVpcmVkXCIgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9PSBcImFjY291bnRfc2VsZWN0aW9uX3JlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1czogcXVlcnlTZXNzaW9uU3RhdHVzIHN1Y2Nlc3MgZm9yIGFub255bW91cyB1c2VyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uX3N0YXRlOiBlcnIuc2Vzc2lvbl9zdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfc2lnbmluKGFyZ3MsIG5hdmlnYXRvciwgbmF2aWdhdG9yUGFyYW1zID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pblN0YXJ0KGFyZ3MsIG5hdmlnYXRvciwgbmF2aWdhdG9yUGFyYW1zKS50aGVuKG5hdlJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5FbmQobmF2UmVzcG9uc2UudXJsLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9zaWduaW5TdGFydChhcmdzLCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcyA9IHt9KSB7XG5cbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5wcmVwYXJlKG5hdmlnYXRvclBhcmFtcykudGhlbihoYW5kbGUgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pblN0YXJ0OiBnb3QgbmF2aWdhdG9yIHdpbmRvdyBoYW5kbGVcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNpZ25pblJlcXVlc3QoYXJncykudGhlbihzaWduaW5SZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluU3RhcnQ6IGdvdCBzaWduaW4gcmVxdWVzdFwiKTtcblxuICAgICAgICAgICAgICAgIG5hdmlnYXRvclBhcmFtcy51cmwgPSBzaWduaW5SZXF1ZXN0LnVybDtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3JQYXJhbXMuaWQgPSBzaWduaW5SZXF1ZXN0LnN0YXRlLmlkO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZS5uYXZpZ2F0ZShuYXZpZ2F0b3JQYXJhbXMpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlLmNsb3NlKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5TdGFydDogRXJyb3IgYWZ0ZXIgcHJlcGFyaW5nIG5hdmlnYXRvciwgY2xvc2luZyBuYXZpZ2F0b3Igd2luZG93XCIpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2lnbmluRW5kKHVybCwgYXJncyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NTaWduaW5SZXNwb25zZSh1cmwpLnRoZW4oc2lnbmluUmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pbkVuZDogZ290IHNpZ25pbiByZXNwb25zZVwiKTtcblxuICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcihzaWduaW5SZXNwb25zZSk7XG5cbiAgICAgICAgICAgIGlmIChhcmdzLmN1cnJlbnRfc3ViKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuY3VycmVudF9zdWIgIT09IHVzZXIucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pbkVuZDogY3VycmVudCB1c2VyIGRvZXMgbm90IG1hdGNoIHVzZXIgcmV0dXJuZWQgZnJvbSBzaWduaW4uIHN1YiBmcm9tIHNpZ25pbjogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwibG9naW5fcmVxdWlyZWRcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pbkVuZDogY3VycmVudCB1c2VyIG1hdGNoZXMgdXNlciByZXR1cm5lZCBmcm9tIHNpZ25pblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlVXNlcih1c2VyKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluRW5kOiB1c2VyIHN0b3JlZFwiKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5sb2FkKHVzZXIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9zaWduaW5DYWxsYmFjayh1cmwsIG5hdmlnYXRvcikge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluQ2FsbGJhY2tcIik7XG4gICAgICAgIGxldCB1c2VRdWVyeSA9IHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX21vZGUgPT09IFwicXVlcnlcIiB8fCAoIXRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX21vZGUgJiYgU2lnbmluUmVxdWVzdC5pc0NvZGUodGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfdHlwZSkpO1xuICAgICAgICBsZXQgZGVsaW1pdGVyID0gdXNlUXVlcnkgPyBcIj9cIiA6IFwiI1wiO1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmNhbGxiYWNrKHVybCwgdW5kZWZpbmVkLCBkZWxpbWl0ZXIpO1xuICAgIH1cblxuICAgIHNpZ25vdXRSZWRpcmVjdChhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MucmVxdWVzdF90eXBlID0gXCJzbzpyXCI7XG4gICAgICAgIGxldCBwb3N0TG9nb3V0UmVkaXJlY3RVcmkgPSBhcmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgaWYgKHBvc3RMb2dvdXRSZWRpcmVjdFVyaSl7XG4gICAgICAgICAgICBhcmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSA9IHBvc3RMb2dvdXRSZWRpcmVjdFVyaTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmF2UGFyYW1zID0ge1xuICAgICAgICAgICAgdXNlUmVwbGFjZVRvTmF2aWdhdGUgOiBhcmdzLnVzZVJlcGxhY2VUb05hdmlnYXRlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWdub3V0U3RhcnQoYXJncywgdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3IsIG5hdlBhcmFtcykudGhlbigoKT0+e1xuICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWdub3V0UmVkaXJlY3Q6IHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaWdub3V0UmVkaXJlY3RDYWxsYmFjayh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25vdXRFbmQodXJsIHx8IHRoaXMuX3JlZGlyZWN0TmF2aWdhdG9yLnVybCkudGhlbihyZXNwb25zZT0+e1xuICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWdub3V0UmVkaXJlY3RDYWxsYmFjazogc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbm91dFBvcHVwKGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5yZXF1ZXN0X3R5cGUgPSBcInNvOnBcIjtcbiAgICAgICAgbGV0IHVybCA9IGFyZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgICAgICBhcmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSA9IHVybDtcbiAgICAgICAgYXJncy5kaXNwbGF5ID0gXCJwb3B1cFwiO1xuICAgICAgICBpZiAoYXJncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkpe1xuICAgICAgICAgICAgLy8gd2UncmUgcHV0dGluZyBhIGR1bW15IGVudHJ5IGluIGhlcmUgYmVjYXVzZSB3ZVxuICAgICAgICAgICAgLy8gbmVlZCBhIHVuaXF1ZSBpZCBmcm9tIHRoZSBzdGF0ZSBmb3Igbm90aWZpY2F0aW9uXG4gICAgICAgICAgICAvLyB0byB0aGUgcGFyZW50IHdpbmRvdywgd2hpY2ggaXMgbmVjZXNzYXJ5IGlmIHdlXG4gICAgICAgICAgICAvLyBwbGFuIHRvIHJldHVybiBiYWNrIHRvIHRoZSBjbGllbnQgYWZ0ZXIgc2lnbm91dFxuICAgICAgICAgICAgLy8gYW5kIHNvIHdlIGNhbiBjbG9zZSB0aGUgcG9wdXAgYWZ0ZXIgc2lnbm91dFxuICAgICAgICAgICAgYXJncy5zdGF0ZSA9IGFyZ3Muc3RhdGUgfHwge307XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbm91dChhcmdzLCB0aGlzLl9wb3B1cE5hdmlnYXRvciwge1xuICAgICAgICAgICAgc3RhcnRVcmw6IHVybCxcbiAgICAgICAgICAgIHBvcHVwV2luZG93RmVhdHVyZXM6IGFyZ3MucG9wdXBXaW5kb3dGZWF0dXJlcyB8fCB0aGlzLnNldHRpbmdzLnBvcHVwV2luZG93RmVhdHVyZXMsXG4gICAgICAgICAgICBwb3B1cFdpbmRvd1RhcmdldDogYXJncy5wb3B1cFdpbmRvd1RhcmdldCB8fCB0aGlzLnNldHRpbmdzLnBvcHVwV2luZG93VGFyZ2V0XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWdub3V0UG9wdXA6IHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaWdub3V0UG9wdXBDYWxsYmFjayh1cmwsIGtlZXBPcGVuKSB7XG4gICAgICAgIGlmICh0eXBlb2Yoa2VlcE9wZW4pID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YodXJsKSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBrZWVwT3BlbiA9IHVybDtcbiAgICAgICAgICAgIHVybCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVsaW1pdGVyID0gJz8nO1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBOYXZpZ2F0b3IuY2FsbGJhY2sodXJsLCBrZWVwT3BlbiwgZGVsaW1pdGVyKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbm91dFBvcHVwQ2FsbGJhY2s6IHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9zaWdub3V0KGFyZ3MsIG5hdmlnYXRvciwgbmF2aWdhdG9yUGFyYW1zID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25vdXRTdGFydChhcmdzLCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcykudGhlbihuYXZSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2lnbm91dEVuZChuYXZSZXNwb25zZS51cmwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NpZ25vdXRTdGFydChhcmdzID0ge30sIG5hdmlnYXRvciwgbmF2aWdhdG9yUGFyYW1zID0ge30pIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5wcmVwYXJlKG5hdmlnYXRvclBhcmFtcykudGhlbihoYW5kbGUgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRTdGFydDogZ290IG5hdmlnYXRvciB3aW5kb3cgaGFuZGxlXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IGxvYWRlZCBjdXJyZW50IHVzZXIgZnJvbSBzdG9yYWdlXCIpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJldm9rZVByb21pc2UgPSB0aGlzLl9zZXR0aW5ncy5yZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dCA/IHRoaXMuX3Jldm9rZUludGVybmFsKHVzZXIpIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldm9rZVByb21pc2UudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkX3Rva2VuID0gYXJncy5pZF90b2tlbl9oaW50IHx8IHVzZXIgJiYgdXNlci5pZF90b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiBTZXR0aW5nIGlkX3Rva2VuIGludG8gc2lnbm91dCByZXF1ZXN0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5pZF90b2tlbl9oaW50ID0gaWRfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVVc2VyKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiB1c2VyIHJlbW92ZWQsIGNyZWF0aW5nIHNpZ25vdXQgcmVxdWVzdFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlU2lnbm91dFJlcXVlc3QoYXJncykudGhlbihzaWdub3V0UmVxdWVzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRTdGFydDogZ290IHNpZ25vdXQgcmVxdWVzdFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvclBhcmFtcy51cmwgPSBzaWdub3V0UmVxdWVzdC51cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ25vdXRSZXF1ZXN0LnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvclBhcmFtcy5pZCA9IHNpZ25vdXRSZXF1ZXN0LnN0YXRlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlLm5hdmlnYXRlKG5hdmlnYXRvclBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kbGUuY2xvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRTdGFydDogRXJyb3IgYWZ0ZXIgcHJlcGFyaW5nIG5hdmlnYXRvciwgY2xvc2luZyBuYXZpZ2F0b3Igd2luZG93XCIpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2lnbm91dEVuZCh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1NpZ25vdXRSZXNwb25zZSh1cmwpLnRoZW4oc2lnbm91dFJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0RW5kOiBnb3Qgc2lnbm91dCByZXNwb25zZVwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNpZ25vdXRSZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV2b2tlQWNjZXNzVG9rZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmV2b2tlSW50ZXJuYWwodXNlciwgdHJ1ZSkudGhlbihzdWNjZXNzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5yZXZva2VBY2Nlc3NUb2tlbjogcmVtb3ZpbmcgdG9rZW4gcHJvcGVydGllcyBmcm9tIHVzZXIgYW5kIHJlLXN0b3JpbmdcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgdXNlci5hY2Nlc3NfdG9rZW4gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB1c2VyLnJlZnJlc2hfdG9rZW4gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB1c2VyLmV4cGlyZXNfYXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB1c2VyLnRva2VuX3R5cGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlVXNlcih1c2VyKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnJldm9rZUFjY2Vzc1Rva2VuOiB1c2VyIHN0b3JlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5sb2FkKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkudGhlbigoKT0+e1xuICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5yZXZva2VBY2Nlc3NUb2tlbjogYWNjZXNzIHRva2VuIHJldm9rZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfcmV2b2tlSW50ZXJuYWwodXNlciwgcmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgIHZhciBhY2Nlc3NfdG9rZW4gPSB1c2VyLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgIHZhciByZWZyZXNoX3Rva2VuID0gdXNlci5yZWZyZXNoX3Rva2VuO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmV2b2tlQWNjZXNzVG9rZW5JbnRlcm5hbChhY2Nlc3NfdG9rZW4sIHJlcXVpcmVkKVxuICAgICAgICAgICAgICAgIC50aGVuKGF0U3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXZva2VSZWZyZXNoVG9rZW5JbnRlcm5hbChyZWZyZXNoX3Rva2VuLCByZXF1aXJlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJ0U3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhdFN1Y2Nlc3MgJiYgIXJ0U3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5yZXZva2VBY2Nlc3NUb2tlbjogbm8gbmVlZCB0byByZXZva2UgZHVlIHRvIG5vIHRva2VuKHMpLCBvciBKV1QgZm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXRTdWNjZXNzIHx8IHJ0U3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuXG4gICAgX3Jldm9rZUFjY2Vzc1Rva2VuSW50ZXJuYWwoYWNjZXNzX3Rva2VuLCByZXF1aXJlZCkge1xuICAgICAgICAvLyBjaGVjayBmb3IgSldUIHZzLiByZWZlcmVuY2UgdG9rZW5cbiAgICAgICAgaWYgKCFhY2Nlc3NfdG9rZW4gfHwgYWNjZXNzX3Rva2VuLmluZGV4T2YoJy4nKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlKGFjY2Vzc190b2tlbiwgcmVxdWlyZWQpLnRoZW4oKCkgPT4gdHJ1ZSk7XG4gICAgfVxuXG4gICAgX3Jldm9rZVJlZnJlc2hUb2tlbkludGVybmFsKHJlZnJlc2hfdG9rZW4sIHJlcXVpcmVkKSB7XG4gICAgICAgIGlmICghcmVmcmVzaF90b2tlbikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZShyZWZyZXNoX3Rva2VuLCByZXF1aXJlZCwgXCJyZWZyZXNoX3Rva2VuXCIpLnRoZW4oKCkgPT4gdHJ1ZSk7XG4gICAgfVxuXG4gICAgc3RhcnRTaWxlbnRSZW5ldygpIHtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdTZXJ2aWNlLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgc3RvcFNpbGVudFJlbmV3KCkge1xuICAgICAgICB0aGlzLl9zaWxlbnRSZW5ld1NlcnZpY2Uuc3RvcCgpO1xuICAgIH1cblxuICAgIGdldCBfdXNlclN0b3JlS2V5KCkge1xuICAgICAgICByZXR1cm4gYHVzZXI6JHt0aGlzLnNldHRpbmdzLmF1dGhvcml0eX06JHt0aGlzLnNldHRpbmdzLmNsaWVudF9pZH1gO1xuICAgIH1cblxuICAgIF9sb2FkVXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTdG9yZS5nZXQodGhpcy5fdXNlclN0b3JlS2V5KS50aGVuKHN0b3JhZ2VTdHJpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKHN0b3JhZ2VTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fbG9hZFVzZXI6IHVzZXIgc3RvcmFnZVN0cmluZyBsb2FkZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFVzZXIuZnJvbVN0b3JhZ2VTdHJpbmcoc3RvcmFnZVN0cmluZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9sb2FkVXNlcjogbm8gdXNlciBzdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0b3JlVXNlcih1c2VyKSB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5zdG9yZVVzZXI6IHN0b3JpbmcgdXNlclwiKTtcblxuICAgICAgICAgICAgdmFyIHN0b3JhZ2VTdHJpbmcgPSB1c2VyLnRvU3RvcmFnZVN0cmluZygpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTdG9yZS5zZXQodGhpcy5fdXNlclN0b3JlS2V5LCBzdG9yYWdlU3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcInN0b3JlVXNlci5zdG9yZVVzZXI6IHJlbW92aW5nIHVzZXJcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclN0b3JlLnJlbW92ZSh0aGlzLl91c2VyU3RvcmVLZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgQWNjZXNzVG9rZW5FdmVudHMgfSBmcm9tICcuL0FjY2Vzc1Rva2VuRXZlbnRzLmpzJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9FdmVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBVc2VyTWFuYWdlckV2ZW50cyBleHRlbmRzIEFjY2Vzc1Rva2VuRXZlbnRzIHtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XG4gICAgICAgIHN1cGVyKHNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fdXNlckxvYWRlZCA9IG5ldyBFdmVudChcIlVzZXIgbG9hZGVkXCIpO1xuICAgICAgICB0aGlzLl91c2VyVW5sb2FkZWQgPSBuZXcgRXZlbnQoXCJVc2VyIHVubG9hZGVkXCIpO1xuICAgICAgICB0aGlzLl9zaWxlbnRSZW5ld0Vycm9yID0gbmV3IEV2ZW50KFwiU2lsZW50IHJlbmV3IGVycm9yXCIpO1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkSW4gPSBuZXcgRXZlbnQoXCJVc2VyIHNpZ25lZCBpblwiKTtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZE91dCA9IG5ldyBFdmVudChcIlVzZXIgc2lnbmVkIG91dFwiKTtcbiAgICAgICAgdGhpcy5fdXNlclNlc3Npb25DaGFuZ2VkID0gbmV3IEV2ZW50KFwiVXNlciBzZXNzaW9uIGNoYW5nZWRcIik7XG4gICAgfVxuXG4gICAgbG9hZCh1c2VyLCByYWlzZUV2ZW50PXRydWUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXJFdmVudHMubG9hZFwiKTtcbiAgICAgICAgc3VwZXIubG9hZCh1c2VyKTtcbiAgICAgICAgaWYgKHJhaXNlRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJMb2FkZWQucmFpc2UodXNlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5sb2FkKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy51bmxvYWRcIik7XG4gICAgICAgIHN1cGVyLnVubG9hZCgpO1xuICAgICAgICB0aGlzLl91c2VyVW5sb2FkZWQucmFpc2UoKTtcbiAgICB9XG5cbiAgICBhZGRVc2VyTG9hZGVkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJMb2FkZWQuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZVVzZXJMb2FkZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlckxvYWRlZC5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG5cbiAgICBhZGRVc2VyVW5sb2FkZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclVubG9hZGVkLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVVc2VyVW5sb2FkZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclVubG9hZGVkLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cblxuICAgIGFkZFNpbGVudFJlbmV3RXJyb3IoY2IpIHtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdFcnJvci5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlU2lsZW50UmVuZXdFcnJvcihjYikge1xuICAgICAgICB0aGlzLl9zaWxlbnRSZW5ld0Vycm9yLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICBfcmFpc2VTaWxlbnRSZW5ld0Vycm9yKGUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXJFdmVudHMuX3JhaXNlU2lsZW50UmVuZXdFcnJvclwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl9zaWxlbnRSZW5ld0Vycm9yLnJhaXNlKGUpO1xuICAgIH1cblxuICAgIGFkZFVzZXJTaWduZWRJbihjYikge1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkSW4uYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZVVzZXJTaWduZWRJbihjYikge1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkSW4ucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuICAgIF9yYWlzZVVzZXJTaWduZWRJbigpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXJFdmVudHMuX3JhaXNlVXNlclNpZ25lZEluXCIpO1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkSW4ucmFpc2UoKTtcbiAgICB9XG5cbiAgICBhZGRVc2VyU2lnbmVkT3V0KGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRPdXQuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZVVzZXJTaWduZWRPdXQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZE91dC5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgX3JhaXNlVXNlclNpZ25lZE91dCgpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXJFdmVudHMuX3JhaXNlVXNlclNpZ25lZE91dFwiKTtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZE91dC5yYWlzZSgpO1xuICAgIH1cblxuICAgIGFkZFVzZXJTZXNzaW9uQ2hhbmdlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyU2Vzc2lvbkNoYW5nZWQuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZVVzZXJTZXNzaW9uQ2hhbmdlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyU2Vzc2lvbkNoYW5nZWQucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuICAgIF9yYWlzZVVzZXJTZXNzaW9uQ2hhbmdlZCgpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXJFdmVudHMuX3JhaXNlVXNlclNlc3Npb25DaGFuZ2VkXCIpO1xuICAgICAgICB0aGlzLl91c2VyU2Vzc2lvbkNoYW5nZWQucmFpc2UoKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBPaWRjQ2xpZW50U2V0dGluZ3MgfSBmcm9tICcuL09pZGNDbGllbnRTZXR0aW5ncy5qcyc7XG5pbXBvcnQgeyBSZWRpcmVjdE5hdmlnYXRvciB9IGZyb20gJy4vUmVkaXJlY3ROYXZpZ2F0b3IuanMnO1xuaW1wb3J0IHsgUG9wdXBOYXZpZ2F0b3IgfSBmcm9tICcuL1BvcHVwTmF2aWdhdG9yLmpzJztcbmltcG9ydCB7IElGcmFtZU5hdmlnYXRvciB9IGZyb20gJy4vSUZyYW1lTmF2aWdhdG9yLmpzJztcbmltcG9ydCB7IFdlYlN0b3JhZ2VTdGF0ZVN0b3JlIH0gZnJvbSAnLi9XZWJTdG9yYWdlU3RhdGVTdG9yZS5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBTaWduaW5SZXF1ZXN0IH0gZnJvbSAnLi9TaWduaW5SZXF1ZXN0LmpzJztcblxuY29uc3QgRGVmYXVsdEFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lID0gNjA7XG5jb25zdCBEZWZhdWx0Q2hlY2tTZXNzaW9uSW50ZXJ2YWwgPSAyMDAwO1xuXG5leHBvcnQgY2xhc3MgVXNlck1hbmFnZXJTZXR0aW5ncyBleHRlbmRzIE9pZGNDbGllbnRTZXR0aW5ncyB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICBwb3B1cF9yZWRpcmVjdF91cmksXG4gICAgICAgIHBvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSxcbiAgICAgICAgcG9wdXBXaW5kb3dGZWF0dXJlcyxcbiAgICAgICAgcG9wdXBXaW5kb3dUYXJnZXQsXG4gICAgICAgIHNpbGVudF9yZWRpcmVjdF91cmksXG4gICAgICAgIHNpbGVudFJlcXVlc3RUaW1lb3V0LFxuICAgICAgICBhdXRvbWF0aWNTaWxlbnRSZW5ldyA9IGZhbHNlLFxuICAgICAgICB2YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXcgPSBmYWxzZSxcbiAgICAgICAgaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3ID0gdHJ1ZSxcbiAgICAgICAgbW9uaXRvclNlc3Npb24gPSB0cnVlLFxuICAgICAgICBtb25pdG9yQW5vbnltb3VzU2Vzc2lvbiA9IGZhbHNlLFxuICAgICAgICBjaGVja1Nlc3Npb25JbnRlcnZhbCA9IERlZmF1bHRDaGVja1Nlc3Npb25JbnRlcnZhbCxcbiAgICAgICAgc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IgPSB0cnVlLFxuICAgICAgICBxdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSxcbiAgICAgICAgcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQgPSBmYWxzZSxcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSBEZWZhdWx0QWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUsXG4gICAgICAgIHJlZGlyZWN0TmF2aWdhdG9yID0gbmV3IFJlZGlyZWN0TmF2aWdhdG9yKCksXG4gICAgICAgIHBvcHVwTmF2aWdhdG9yID0gbmV3IFBvcHVwTmF2aWdhdG9yKCksXG4gICAgICAgIGlmcmFtZU5hdmlnYXRvciA9IG5ldyBJRnJhbWVOYXZpZ2F0b3IoKSxcbiAgICAgICAgdXNlclN0b3JlID0gbmV3IFdlYlN0b3JhZ2VTdGF0ZVN0b3JlKHsgc3RvcmU6IEdsb2JhbC5zZXNzaW9uU3RvcmFnZSB9KVxuICAgIH0gPSB7fSkge1xuICAgICAgICBzdXBlcihhcmd1bWVudHNbMF0pO1xuXG4gICAgICAgIHRoaXMuX3BvcHVwX3JlZGlyZWN0X3VyaSA9IHBvcHVwX3JlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fcG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gcG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgICAgICB0aGlzLl9wb3B1cFdpbmRvd0ZlYXR1cmVzID0gcG9wdXBXaW5kb3dGZWF0dXJlcztcbiAgICAgICAgdGhpcy5fcG9wdXBXaW5kb3dUYXJnZXQgPSBwb3B1cFdpbmRvd1RhcmdldDtcblxuICAgICAgICB0aGlzLl9zaWxlbnRfcmVkaXJlY3RfdXJpID0gc2lsZW50X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVxdWVzdFRpbWVvdXQgPSBzaWxlbnRSZXF1ZXN0VGltZW91dDtcbiAgICAgICAgdGhpcy5fYXV0b21hdGljU2lsZW50UmVuZXcgPSBhdXRvbWF0aWNTaWxlbnRSZW5ldztcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3ID0gdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3O1xuICAgICAgICB0aGlzLl9pbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXcgPSBpbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXc7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lID0gYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWU7XG5cbiAgICAgICAgdGhpcy5fbW9uaXRvclNlc3Npb24gPSBtb25pdG9yU2Vzc2lvbjtcbiAgICAgICAgdGhpcy5fbW9uaXRvckFub255bW91c1Nlc3Npb24gPSBtb25pdG9yQW5vbnltb3VzU2Vzc2lvbjtcbiAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSW50ZXJ2YWwgPSBjaGVja1Nlc3Npb25JbnRlcnZhbDtcbiAgICAgICAgdGhpcy5fc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IgPSBzdG9wQ2hlY2tTZXNzaW9uT25FcnJvcjtcbiAgICAgICAgaWYgKHF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSA9IHF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmIChhcmd1bWVudHNbMF0gJiYgYXJndW1lbnRzWzBdLnJlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlID0gU2lnbmluUmVxdWVzdC5pc09pZGMoYXJndW1lbnRzWzBdLnJlc3BvbnNlX3R5cGUpID8gXCJpZF90b2tlblwiIDogXCJjb2RlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSA9IFwiaWRfdG9rZW5cIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dCA9IHJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0O1xuXG4gICAgICAgIHRoaXMuX3JlZGlyZWN0TmF2aWdhdG9yID0gcmVkaXJlY3ROYXZpZ2F0b3I7XG4gICAgICAgIHRoaXMuX3BvcHVwTmF2aWdhdG9yID0gcG9wdXBOYXZpZ2F0b3I7XG4gICAgICAgIHRoaXMuX2lmcmFtZU5hdmlnYXRvciA9IGlmcmFtZU5hdmlnYXRvcjtcblxuICAgICAgICB0aGlzLl91c2VyU3RvcmUgPSB1c2VyU3RvcmU7XG4gICAgfVxuXG4gICAgZ2V0IHBvcHVwX3JlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwX3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgZ2V0IHBvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgZ2V0IHBvcHVwV2luZG93RmVhdHVyZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3B1cFdpbmRvd0ZlYXR1cmVzO1xuICAgIH1cbiAgICBnZXQgcG9wdXBXaW5kb3dUYXJnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3B1cFdpbmRvd1RhcmdldDtcbiAgICB9XG5cbiAgICBnZXQgc2lsZW50X3JlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpbGVudF9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgICBnZXQgc2lsZW50UmVxdWVzdFRpbWVvdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWxlbnRSZXF1ZXN0VGltZW91dDtcbiAgICB9XG4gICAgZ2V0IGF1dG9tYXRpY1NpbGVudFJlbmV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b21hdGljU2lsZW50UmVuZXc7XG4gICAgfVxuICAgIGdldCB2YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXc7XG4gICAgfVxuICAgIGdldCBpbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXc7XG4gICAgfVxuICAgIGdldCBhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lO1xuICAgIH1cblxuICAgIGdldCBtb25pdG9yU2Vzc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbml0b3JTZXNzaW9uO1xuICAgIH1cbiAgICBnZXQgbW9uaXRvckFub255bW91c1Nlc3Npb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb25pdG9yQW5vbnltb3VzU2Vzc2lvbjtcbiAgICB9XG4gICAgZ2V0IGNoZWNrU2Vzc2lvbkludGVydmFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tTZXNzaW9uSW50ZXJ2YWw7XG4gICAgfVxuICAgIGdldCBzdG9wQ2hlY2tTZXNzaW9uT25FcnJvcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3I7XG4gICAgfVxuICAgIGdldCBxdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGU7XG4gICAgfVxuICAgIGdldCByZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0O1xuICAgIH1cblxuICAgIGdldCByZWRpcmVjdE5hdmlnYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZGlyZWN0TmF2aWdhdG9yO1xuICAgIH1cbiAgICBnZXQgcG9wdXBOYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3B1cE5hdmlnYXRvcjtcbiAgICB9XG4gICAgZ2V0IGlmcmFtZU5hdmlnYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lmcmFtZU5hdmlnYXRvcjtcbiAgICB9XG5cbiAgICBnZXQgdXNlclN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclN0b3JlO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcblxuZXhwb3J0IGNsYXNzIFdlYlN0b3JhZ2VTdGF0ZVN0b3JlIHtcbiAgICBjb25zdHJ1Y3Rvcih7cHJlZml4ID0gXCJvaWRjLlwiLCBzdG9yZSA9IEdsb2JhbC5sb2NhbFN0b3JhZ2V9ID0ge30pIHtcbiAgICAgICAgdGhpcy5fc3RvcmUgPSBzdG9yZTtcbiAgICAgICAgdGhpcy5fcHJlZml4ID0gcHJlZml4O1xuICAgIH1cblxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIldlYlN0b3JhZ2VTdGF0ZVN0b3JlLnNldFwiLCBrZXkpO1xuXG4gICAgICAgIGtleSA9IHRoaXMuX3ByZWZpeCArIGtleTtcblxuICAgICAgICB0aGlzLl9zdG9yZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIldlYlN0b3JhZ2VTdGF0ZVN0b3JlLmdldFwiLCBrZXkpO1xuXG4gICAgICAgIGtleSA9IHRoaXMuX3ByZWZpeCArIGtleTtcblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX3N0b3JlLmdldEl0ZW0oa2V5KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGl0ZW0pO1xuICAgIH1cblxuICAgIHJlbW92ZShrZXkpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiV2ViU3RvcmFnZVN0YXRlU3RvcmUucmVtb3ZlXCIsIGtleSk7XG5cbiAgICAgICAga2V5ID0gdGhpcy5fcHJlZml4ICsga2V5O1xuXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5fc3RvcmUuZ2V0SXRlbShrZXkpO1xuICAgICAgICB0aGlzLl9zdG9yZS5yZW1vdmVJdGVtKGtleSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpdGVtKTtcbiAgICB9XG5cbiAgICBnZXRBbGxLZXlzKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJXZWJTdG9yYWdlU3RhdGVTdG9yZS5nZXRBbGxLZXlzXCIpO1xuXG4gICAgICAgIHZhciBrZXlzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX3N0b3JlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuX3N0b3JlLmtleShpbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZih0aGlzLl9wcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleS5zdWJzdHIodGhpcy5fcHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXlzKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEdlbmVyYXRlcyBhbiBSRkM0MTIyIHZlcnNpb24gNCBndWlkICh3aXRob3V0IGRhc2hlcykgZnJvbSBhIENTUFJORy5cbiAqXG4gKiBzdGF0ZSwgbm9uY2UgYW5kIHRoZSBQS0NFIGNvZGVfdmVyaWZpZXIgYXJlIGJ1aWx0IGZyb20gdGhpcyB2YWx1ZSwgc28gdGhlcmUgaXNcbiAqIGRlbGliZXJhdGVseSBubyBNYXRoLnJhbmRvbSBmYWxsYmFjazogd2l0aG91dCBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHRoaXMgdGhyb3dzLlxuICovXG5cbmZ1bmN0aW9uIGdldENyeXB0bygpIHtcbiAgICAvLyBSZXNvbHZlZCBvbiBldmVyeSBjYWxsIHNvIGEgcG9seWZpbGwgbG9hZGVkIGFmdGVyIHRoaXMgbW9kdWxlIGlzIHN0aWxsIHBpY2tlZCB1cFxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAod2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG8pKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0bztcbiAgICB9XG4gICAgLy8gd29ya2VycywgTm9kZSA+PSAxOSwgUmVhY3QgTmF0aXZlIHdpdGggYSBnZXRSYW5kb21WYWx1ZXMgcG9seWZpbGxcbiAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWxUaGlzLmNyeXB0bztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWN1cmVVdWlkKGNyeXB0bykge1xuICAgIGlmICghY3J5cHRvIHx8IHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNyeXB0by5nZXRSYW5kb21WYWx1ZXMgaXMgbm90IGF2YWlsYWJsZTsgc2VjdXJlIHJhbmRvbSBnZW5lcmF0aW9uIGlzIHJlcXVpcmVkIGZvciBPSURDXCIpO1xuICAgIH1cbiAgICByZXR1cm4gKFsxZTddKy0xZTMrLTRlMystOGUzKy0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLCBjID0+XG4gICAgICAgIChjIF4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAxNSA+PiBjIC8gNCkudG9TdHJpbmcoMTYpXG4gICAgKS5yZXBsYWNlKC8tL2csICcnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tKCkge1xuICAgIHJldHVybiBzZWN1cmVVdWlkKGdldENyeXB0bygpKTtcbn1cbiIsImNvbnN0IFZlcnNpb24gPSBcIjEuMTEuNVwiOyBleHBvcnQge1ZlcnNpb259OyIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdHJvb3QuQ3J5cHRvSlMgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXG5cdC8qZ2xvYmFscyB3aW5kb3csIGdsb2JhbCwgcmVxdWlyZSovXG5cblx0LyoqXG5cdCAqIENyeXB0b0pTIGNvcmUgY29tcG9uZW50cy5cblx0ICovXG5cdHZhciBDcnlwdG9KUyA9IENyeXB0b0pTIHx8IChmdW5jdGlvbiAoTWF0aCwgdW5kZWZpbmVkKSB7XG5cblx0ICAgIHZhciBjcnlwdG87XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSB3aW5kb3cgKEJyb3dzZXIpXG5cdCAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHdpbmRvdy5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gaW4gd2ViIHdvcmtlciAoQnJvd3Nlcilcblx0ICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBzZWxmLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIHdvcmtlclxuXHQgICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IGdsb2JhbFRoaXMuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgKGV4cGVyaW1lbnRhbCBJRSAxMSkgY3J5cHRvIGZyb20gd2luZG93IChCcm93c2VyKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lm1zQ3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gd2luZG93Lm1zQ3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gZ2xvYmFsIChOb2RlSlMpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gZ2xvYmFsLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBpbXBvcnQgdmlhIHJlcXVpcmUgKE5vZGVKUylcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cdCAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgfVxuXG5cdCAgICAvKlxuXHQgICAgICogQ3J5cHRvZ3JhcGhpY2FsbHkgc2VjdXJlIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yXG5cdCAgICAgKlxuXHQgICAgICogQXMgTWF0aC5yYW5kb20oKSBpcyBjcnlwdG9ncmFwaGljYWxseSBub3Qgc2FmZSB0byB1c2Vcblx0ICAgICAqL1xuXHQgICAgdmFyIGNyeXB0b1NlY3VyZVJhbmRvbUludCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoY3J5cHRvKSB7XG5cdCAgICAgICAgICAgIC8vIFVzZSBnZXRSYW5kb21WYWx1ZXMgbWV0aG9kIChCcm93c2VyKVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDEpKVswXTtcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFVzZSByYW5kb21CeXRlcyBtZXRob2QgKE5vZGVKUylcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8ucmFuZG9tQnl0ZXMgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyeXB0by5yYW5kb21CeXRlcyg0KS5yZWFkSW50MzJMRSgpO1xuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYXRpdmUgY3J5cHRvIG1vZHVsZSBjb3VsZCBub3QgYmUgdXNlZCB0byBnZXQgc2VjdXJlIHJhbmRvbSBudW1iZXIuJyk7XG5cdCAgICB9O1xuXG5cdCAgICAvKlxuXHQgICAgICogTG9jYWwgcG9seWZpbGwgb2YgT2JqZWN0LmNyZWF0ZVxuXG5cdCAgICAgKi9cblx0ICAgIHZhciBjcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gRigpIHt9XG5cblx0ICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICAgICAgICB2YXIgc3VidHlwZTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG9iajtcblxuXHQgICAgICAgICAgICBzdWJ0eXBlID0gbmV3IEYoKTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG51bGw7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQ3J5cHRvSlMgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExpYnJhcnkgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYiA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2Ugb2JqZWN0IGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2UgPSAoZnVuY3Rpb24gKCkge1xuXG5cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3ZlcnJpZGVzIFByb3BlcnRpZXMgdG8gY29weSBpbnRvIHRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJyxcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgICAgICBtZXRob2Q6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGV4dGVuZDogZnVuY3Rpb24gKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgLy8gU3Bhd25cblx0ICAgICAgICAgICAgICAgIHZhciBzdWJ0eXBlID0gY3JlYXRlKHRoaXMpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBBdWdtZW50XG5cdCAgICAgICAgICAgICAgICBpZiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5taXhJbihvdmVycmlkZXMpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBDcmVhdGUgZGVmYXVsdCBpbml0aWFsaXplclxuXHQgICAgICAgICAgICAgICAgaWYgKCFzdWJ0eXBlLmhhc093blByb3BlcnR5KCdpbml0JykgfHwgdGhpcy5pbml0ID09PSBzdWJ0eXBlLmluaXQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplcidzIHByb3RvdHlwZSBpcyB0aGUgc3VidHlwZSBvYmplY3Rcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdC5wcm90b3R5cGUgPSBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZWZlcmVuY2Ugc3VwZXJ0eXBlXG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlciA9IHRoaXM7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBFeHRlbmRzIHRoaXMgb2JqZWN0IGFuZCBydW5zIHRoZSBpbml0IG1ldGhvZC5cblx0ICAgICAgICAgICAgICogQXJndW1lbnRzIHRvIGNyZWF0ZSgpIHdpbGwgYmUgcGFzc2VkIHRvIGluaXQoKS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGluc3RhbmNlID0gTXlUeXBlLmNyZWF0ZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmV4dGVuZCgpO1xuXHQgICAgICAgICAgICAgICAgaW5zdGFuY2UuaW5pdC5hcHBseShpbnN0YW5jZSwgYXJndW1lbnRzKTtcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBhZGQgc29tZSBsb2dpYyB3aGVuIHlvdXIgb2JqZWN0cyBhcmUgY3JlYXRlZC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICAgICAgLy8gLi4uXG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENvcGllcyBwcm9wZXJ0aWVzIGludG8gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIHRvIG1peCBpbi5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIE15VHlwZS5taXhJbih7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZSdcblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgbWl4SW46IGZ1bmN0aW9uIChwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSUUgd29uJ3QgY29weSB0b1N0cmluZyB1c2luZyB0aGUgbG9vcCBhYm92ZVxuXHQgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3RvU3RyaW5nJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvU3RyaW5nID0gcHJvcGVydGllcy50b1N0cmluZztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNsb25lLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gaW5zdGFuY2UuY2xvbmUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0LnByb3RvdHlwZS5leHRlbmQodGhpcyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9O1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtBcnJheX0gd29yZHMgVGhlIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaWdCeXRlcyBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIChPcHRpb25hbCkgQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaWdCeXRlcyAoT3B0aW9uYWwpIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhlIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10sIDYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3b3Jkcywgc2lnQnl0ZXMpIHtcblx0ICAgICAgICAgICAgd29yZHMgPSB0aGlzLndvcmRzID0gd29yZHMgfHwgW107XG5cblx0ICAgICAgICAgICAgaWYgKHNpZ0J5dGVzICE9IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHdvcmRzLmxlbmd0aCAqIDQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgdGhpcyB3b3JkIGFycmF5IHRvIGEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyIChPcHRpb25hbCkgVGhlIGVuY29kaW5nIHN0cmF0ZWd5IHRvIHVzZS4gRGVmYXVsdDogQ3J5cHRvSlMuZW5jLkhleFxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5naWZpZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheSArICcnO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKCk7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoZW5jb2Rlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gKGVuY29kZXIgfHwgSGV4KS5zdHJpbmdpZnkodGhpcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmNhdGVuYXRlcyBhIHdvcmQgYXJyYXkgdG8gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgd29yZEFycmF5MS5jb25jYXQod29yZEFycmF5Mik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29uY2F0OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgdGhpc1dvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRXb3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoaXNTaWdCeXRlcyA9IHRoaXMuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0U2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAgdGhpcy5jbGFtcCgpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbmNhdFxuXHQgICAgICAgICAgICBpZiAodGhpc1NpZ0J5dGVzICUgNCkge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgYnl0ZSBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdEJ5dGUgPSAodGhhdFdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSB8PSB0aGF0Qnl0ZSA8PCAoMjQgLSAoKHRoaXNTaWdCeXRlcyArIGkpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIHdvcmQgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoYXRTaWdCeXRlczsgaiArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBqKSA+Pj4gMl0gPSB0aGF0V29yZHNbaiA+Pj4gMl07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyArPSB0aGF0U2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZW1vdmVzIGluc2lnbmlmaWNhbnQgYml0cy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgd29yZEFycmF5LmNsYW1wKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xhbXA6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHRoaXMuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXBcblx0ICAgICAgICAgICAgd29yZHNbc2lnQnl0ZXMgPj4+IDJdICY9IDB4ZmZmZmZmZmYgPDwgKDMyIC0gKHNpZ0J5dGVzICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgd29yZHMubGVuZ3RoID0gTWF0aC5jZWlsKHNpZ0J5dGVzIC8gNCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSB3b3JkQXJyYXkuY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLndvcmRzID0gdGhpcy53b3Jkcy5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSB3b3JkIGFycmF5IGZpbGxlZCB3aXRoIHJhbmRvbSBieXRlcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuQnl0ZXMgVGhlIG51bWJlciBvZiByYW5kb20gYnl0ZXMgdG8gZ2VuZXJhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSByYW5kb20gd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkucmFuZG9tKDE2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByYW5kb206IGZ1bmN0aW9uIChuQnl0ZXMpIHtcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgd29yZHMucHVzaChjcnlwdG9TZWN1cmVSYW5kb21JbnQoKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBuQnl0ZXMpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEVuY29kZXIgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEhleCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEhleCA9IENfZW5jLkhleCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoZXhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuSGV4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgaGV4Q2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlID4+PiA0KS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSAmIDB4MGYpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gaGV4Q2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgaGV4IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGV4U3RyIFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5IZXgucGFyc2UoaGV4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGhleFN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGV4U3RyTGVuZ3RoID0gaGV4U3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhleFN0ckxlbmd0aDsgaSArPSAyKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAzXSB8PSBwYXJzZUludChoZXhTdHIuc3Vic3RyKGksIDIpLCAxNikgPDwgKDI0IC0gKGkgJSA4KSAqIDQpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgaGV4U3RyTGVuZ3RoIC8gMik7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMYXRpbjEgZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBMYXRpbjEgPSBDX2VuYy5MYXRpbjEgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbGF0aW4xU3RyaW5nID0gQ3J5cHRvSlMuZW5jLkxhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMUNoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgbGF0aW4xQ2hhcnMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJpdGUpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBsYXRpbjFDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBMYXRpbjEgc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXRpbjFTdHIgVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkxhdGluMS5wYXJzZShsYXRpbjFTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAobGF0aW4xU3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFTdHJMZW5ndGggPSBsYXRpbjFTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF0aW4xU3RyTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDJdIHw9IChsYXRpbjFTdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYpIDw8ICgyNCAtIChpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGxhdGluMVN0ckxlbmd0aCk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBVVEYtOCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFV0ZjggPSBDX2VuYy5VdGY4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB1dGY4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLlV0Zjguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShMYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSkpKTtcblx0ICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgVVRGLTggZGF0YScpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgVVRGLTggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dGY4U3RyIFRoZSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UodXRmOFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uICh1dGY4U3RyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBMYXRpbjEucGFyc2UodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHV0ZjhTdHIpKSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBidWZmZXJlZCBibG9jayBhbGdvcml0aG0gdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogVGhlIHByb3BlcnR5IGJsb2NrU2l6ZSBtdXN0IGJlIGltcGxlbWVudGVkIGluIGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gX21pbkJ1ZmZlclNpemUgVGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBzaG91bGQgYmUga2VwdCB1bnByb2Nlc3NlZCBpbiB0aGUgYnVmZmVyLiBEZWZhdWx0OiAwXG5cdCAgICAgKi9cblx0ICAgIHZhciBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQ19saWIuQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBibG9jayBhbGdvcml0aG0ncyBkYXRhIGJ1ZmZlciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIEluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBuZXcgV29yZEFycmF5LmluaXQoKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyA9IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEFkZHMgbmV3IGRhdGEgdG8gdGhpcyBibG9jayBhbGdvcml0aG0ncyBidWZmZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYXBwZW5kLiBTdHJpbmdzIGFyZSBjb252ZXJ0ZWQgdG8gYSBXb3JkQXJyYXkgdXNpbmcgVVRGLTguXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCgnZGF0YScpO1xuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfYXBwZW5kOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBXb3JkQXJyYXksIGVsc2UgYXNzdW1lIFdvcmRBcnJheSBhbHJlYWR5XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgZGF0YSA9IFV0ZjgucGFyc2UoZGF0YSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YS5jb25jYXQoZGF0YSk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgKz0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUHJvY2Vzc2VzIGF2YWlsYWJsZSBkYXRhIGJsb2Nrcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIFRoaXMgbWV0aG9kIGludm9rZXMgX2RvUHJvY2Vzc0Jsb2NrKG9mZnNldCksIHdoaWNoIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBkb0ZsdXNoIFdoZXRoZXIgYWxsIGJsb2NrcyBhbmQgcGFydGlhbCBibG9ja3Mgc2hvdWxkIGJlIHByb2Nlc3NlZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHByb2Nlc3NlZCBkYXRhLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX3Byb2Nlc3M6IGZ1bmN0aW9uIChkb0ZsdXNoKSB7XG5cdCAgICAgICAgICAgIHZhciBwcm9jZXNzZWRXb3JkcztcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGRhdGFTaWdCeXRlcyA9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSB0aGlzLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBibG9ja3MgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CbG9ja3NSZWFkeSA9IGRhdGFTaWdCeXRlcyAvIGJsb2NrU2l6ZUJ5dGVzO1xuXHQgICAgICAgICAgICBpZiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgdXAgdG8gaW5jbHVkZSBwYXJ0aWFsIGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5jZWlsKG5CbG9ja3NSZWFkeSk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCBkb3duIHRvIGluY2x1ZGUgb25seSBmdWxsIGJsb2Nrcyxcblx0ICAgICAgICAgICAgICAgIC8vIGxlc3MgdGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBtdXN0IHJlbWFpbiBpbiB0aGUgYnVmZmVyXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLm1heCgobkJsb2Nrc1JlYWR5IHwgMCkgLSB0aGlzLl9taW5CdWZmZXJTaXplLCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvdW50IHdvcmRzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuV29yZHNSZWFkeSA9IG5CbG9ja3NSZWFkeSAqIGJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBieXRlcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJ5dGVzUmVhZHkgPSBNYXRoLm1pbihuV29yZHNSZWFkeSAqIDQsIGRhdGFTaWdCeXRlcyk7XG5cblx0ICAgICAgICAgICAgLy8gUHJvY2VzcyBibG9ja3Ncblx0ICAgICAgICAgICAgaWYgKG5Xb3Jkc1JlYWR5KSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBuV29yZHNSZWFkeTsgb2Zmc2V0ICs9IGJsb2NrU2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtYWxnb3JpdGhtIGxvZ2ljXG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9Qcm9jZXNzQmxvY2soZGF0YVdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgICAgICBwcm9jZXNzZWRXb3JkcyA9IGRhdGFXb3Jkcy5zcGxpY2UoMCwgbldvcmRzUmVhZHkpO1xuXHQgICAgICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyAtPSBuQnl0ZXNSZWFkeTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBwcm9jZXNzZWQgd29yZHNcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdChwcm9jZXNzZWRXb3JkcywgbkJ5dGVzUmVhZHkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5fZGF0YSA9IHRoaXMuX2RhdGEuY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9taW5CdWZmZXJTaXplOiAwXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBoYXNoZXIgdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJsb2NrU2l6ZSBUaGUgbnVtYmVyIG9mIDMyLWJpdCB3b3JkcyB0aGlzIGhhc2hlciBvcGVyYXRlcyBvbi4gRGVmYXVsdDogMTYgKDUxMiBiaXRzKVxuXHQgICAgICovXG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyID0gQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEJhc2UuZXh0ZW5kKCksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgaGFzaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoYXNoZXIgPSBDcnlwdG9KUy5hbGdvLlNIQTI1Ni5jcmVhdGUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICB0aGlzLmNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGhhc2hlciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gUmVzZXQgZGF0YSBidWZmZXJcblx0ICAgICAgICAgICAgQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5yZXNldC5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHRoaXMuX2RvUmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogVXBkYXRlcyB0aGlzIGhhc2hlciB3aXRoIGEgbWVzc2FnZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSBUaGUgbWVzc2FnZSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtIYXNoZXJ9IFRoaXMgaGFzaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7XG5cblx0ICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBoYXNoXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEZpbmFsaXplcyB0aGUgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKiBOb3RlIHRoYXQgdGhlIGZpbmFsaXplIG9wZXJhdGlvbiBpcyBlZmZlY3RpdmVseSBhIGRlc3RydWN0aXZlLCByZWFkLW9uY2Ugb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIChPcHRpb25hbCkgQSBmaW5hbCBtZXNzYWdlIHVwZGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEZpbmFsIG1lc3NhZ2UgdXBkYXRlXG5cdCAgICAgICAgICAgIGlmIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2RvRmluYWxpemUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiA1MTIvMzIsXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gYSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIGNyZWF0ZSBhIGhlbHBlciBmb3IuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHNob3J0Y3V0IGZ1bmN0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSGVscGVyOiBmdW5jdGlvbiAoaGFzaGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSwgY2ZnKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGhhc2hlci5pbml0KGNmZykuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gdXNlIGluIHRoaXMgSE1BQyBoZWxwZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHNob3J0Y3V0IGZ1bmN0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgSG1hY1NIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIbWFjSGVscGVyOiBmdW5jdGlvbiAoaGFzaGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSwga2V5KSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENfYWxnby5ITUFDLmluaXQoaGFzaGVyLCBrZXkpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFsZ29yaXRobSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ28gPSB7fTtcblxuXHQgICAgcmV0dXJuIEM7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmM7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZTY0IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZTY0ID0gQ19lbmMuQmFzZTY0ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGJhc2U2NFN0cmluZyA9IENyeXB0b0pTLmVuYy5CYXNlNjQuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDMpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMSA9ICh3b3Jkc1tpID4+PiAyXSAgICAgICA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAgICAgICAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTIgPSAod29yZHNbKGkgKyAxKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDEpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUzID0gKHdvcmRzWyhpICsgMikgPj4+IDJdID4+PiAoMjQgLSAoKGkgKyAyKSAlIDQpICogOCkpICYgMHhmZjtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZTEgPDwgMTYpIHwgKGJ5dGUyIDw8IDgpIHwgYnl0ZTM7XG5cblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyAoaiA8IDQpICYmIChpICsgaiAqIDAuNzUgPCBzaWdCeXRlcyk7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gobWFwLmNoYXJBdCgodHJpcGxldCA+Pj4gKDYgKiAoMyAtIGopKSkgJiAweDNmKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ0NoYXIgPSBtYXAuY2hhckF0KDY0KTtcblx0ICAgICAgICAgICAgaWYgKHBhZGRpbmdDaGFyKSB7XG5cdCAgICAgICAgICAgICAgICB3aGlsZSAoYmFzZTY0Q2hhcnMubGVuZ3RoICUgNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gocGFkZGluZ0NoYXIpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGJhc2U2NENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIEJhc2U2NCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2U2NFN0ciBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuQmFzZTY0LnBhcnNlKGJhc2U2NFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChiYXNlNjRTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRTdHJMZW5ndGggPSBiYXNlNjRTdHIubGVuZ3RoO1xuXHQgICAgICAgICAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHQgICAgICAgICAgICB2YXIgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXA7XG5cblx0ICAgICAgICAgICAgaWYgKCFyZXZlcnNlTWFwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXAgPSBbXTtcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1hcC5sZW5ndGg7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlTWFwW21hcC5jaGFyQ29kZUF0KGopXSA9IGo7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSWdub3JlIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdDaGFyID0gbWFwLmNoYXJBdCg2NCk7XG5cdCAgICAgICAgICAgIGlmIChwYWRkaW5nQ2hhcikge1xuXHQgICAgICAgICAgICAgICAgdmFyIHBhZGRpbmdJbmRleCA9IGJhc2U2NFN0ci5pbmRleE9mKHBhZGRpbmdDaGFyKTtcblx0ICAgICAgICAgICAgICAgIGlmIChwYWRkaW5nSW5kZXggIT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmFzZTY0U3RyTGVuZ3RoID0gcGFkZGluZ0luZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICByZXR1cm4gcGFyc2VMb29wKGJhc2U2NFN0ciwgYmFzZTY0U3RyTGVuZ3RoLCByZXZlcnNlTWFwKTtcblxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWFwOiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nXG5cdCAgICB9O1xuXG5cdCAgICBmdW5jdGlvbiBwYXJzZUxvb3AoYmFzZTY0U3RyLCBiYXNlNjRTdHJMZW5ndGgsIHJldmVyc2VNYXApIHtcblx0ICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgIHZhciBuQnl0ZXMgPSAwO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U2NFN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICBpZiAoaSAlIDQpIHtcblx0ICAgICAgICAgICAgICB2YXIgYml0czEgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkgLSAxKV0gPDwgKChpICUgNCkgKiAyKTtcblx0ICAgICAgICAgICAgICB2YXIgYml0czIgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkpXSA+Pj4gKDYgLSAoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHNDb21iaW5lZCA9IGJpdHMxIHwgYml0czI7XG5cdCAgICAgICAgICAgICAgd29yZHNbbkJ5dGVzID4+PiAyXSB8PSBiaXRzQ29tYmluZWQgPDwgKDI0IC0gKG5CeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgbkJ5dGVzKys7XG5cdCAgICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIFdvcmRBcnJheS5jcmVhdGUod29yZHMsIG5CeXRlcyk7XG5cdCAgICB9XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuZW5jLkJhc2U2NDtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0cmV0dXJuIENyeXB0b0pTLmVuYy5IZXg7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIEluaXRpYWxpemF0aW9uIGFuZCByb3VuZCBjb25zdGFudHMgdGFibGVzXG5cdCAgICB2YXIgSCA9IFtdO1xuXHQgICAgdmFyIEsgPSBbXTtcblxuXHQgICAgLy8gQ29tcHV0ZSBjb25zdGFudHNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gaXNQcmltZShuKSB7XG5cdCAgICAgICAgICAgIHZhciBzcXJ0TiA9IE1hdGguc3FydChuKTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgZmFjdG9yID0gMjsgZmFjdG9yIDw9IHNxcnROOyBmYWN0b3IrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKCEobiAlIGZhY3RvcikpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBmdW5jdGlvbiBnZXRGcmFjdGlvbmFsQml0cyhuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoKG4gLSAobiB8IDApKSAqIDB4MTAwMDAwMDAwKSB8IDA7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIG4gPSAyO1xuXHQgICAgICAgIHZhciBuUHJpbWUgPSAwO1xuXHQgICAgICAgIHdoaWxlIChuUHJpbWUgPCA2NCkge1xuXHQgICAgICAgICAgICBpZiAoaXNQcmltZShuKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKG5QcmltZSA8IDgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBIW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMikpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgS1tuUHJpbWVdID0gZ2V0RnJhY3Rpb25hbEJpdHMoTWF0aC5wb3cobiwgMSAvIDMpKTtcblxuXHQgICAgICAgICAgICAgICAgblByaW1lKys7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBuKys7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0XG5cdCAgICB2YXIgVyA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0yNTYgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEyNTYgPSBDX2FsZ28uU0hBMjU2ID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChILnNsaWNlKDApKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYSA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBiID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIGMgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgZCA9IEhbM107XG5cdCAgICAgICAgICAgIHZhciBlID0gSFs0XTtcblx0ICAgICAgICAgICAgdmFyIGYgPSBIWzVdO1xuXHQgICAgICAgICAgICB2YXIgZyA9IEhbNl07XG5cdCAgICAgICAgICAgIHZhciBoID0gSFs3XTtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRhdGlvblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmIChpIDwgMTYpIHtcblx0ICAgICAgICAgICAgICAgICAgICBXW2ldID0gTVtvZmZzZXQgKyBpXSB8IDA7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4ID0gV1tpIC0gMTVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTAgID0gKChnYW1tYTB4IDw8IDI1KSB8IChnYW1tYTB4ID4+PiA3KSkgIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWEweCA8PCAxNCkgfCAoZ2FtbWEweCA+Pj4gMTgpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMHggPj4+IDMpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXggPSBXW2kgLSAyXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExICA9ICgoZ2FtbWExeCA8PCAxNSkgfCAoZ2FtbWExeCA+Pj4gMTcpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMXggPDwgMTMpIHwgKGdhbW1hMXggPj4+IDE5KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnYW1tYTF4ID4+PiAxMCk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBXW2ldID0gZ2FtbWEwICsgV1tpIC0gN10gKyBnYW1tYTEgKyBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIHZhciBjaCAgPSAoZSAmIGYpIF4gKH5lICYgZyk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqID0gKGEgJiBiKSBeIChhICYgYykgXiAoYiAmIGMpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwID0gKChhIDw8IDMwKSB8IChhID4+PiAyKSkgXiAoKGEgPDwgMTkpIHwgKGEgPj4+IDEzKSkgXiAoKGEgPDwgMTApIHwgKGEgPj4+IDIyKSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExID0gKChlIDw8IDI2KSB8IChlID4+PiA2KSkgXiAoKGUgPDwgMjEpIHwgKGUgPj4+IDExKSkgXiAoKGUgPDwgNykgIHwgKGUgPj4+IDI1KSk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQyID0gc2lnbWEwICsgbWFqO1xuXG5cdCAgICAgICAgICAgICAgICBoID0gZztcblx0ICAgICAgICAgICAgICAgIGcgPSBmO1xuXHQgICAgICAgICAgICAgICAgZiA9IGU7XG5cdCAgICAgICAgICAgICAgICBlID0gKGQgKyB0MSkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZCA9IGM7XG5cdCAgICAgICAgICAgICAgICBjID0gYjtcblx0ICAgICAgICAgICAgICAgIGIgPSBhO1xuXHQgICAgICAgICAgICAgICAgYSA9ICh0MSArIHQyKSB8IDA7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNF0gPSAoSFs0XSArIGUpIHwgMDtcblx0ICAgICAgICAgICAgSFs1XSA9IChIWzVdICsgZikgfCAwO1xuXHQgICAgICAgICAgICBIWzZdID0gKEhbNl0gKyBnKSB8IDA7XG5cdCAgICAgICAgICAgIEhbN10gPSAoSFs3XSArIGgpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjU2KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEyNTYgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEEyNTYpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTI1NihtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEyNTYgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMjU2KTtcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBMjU2O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3g2NC1jb3JlXCIpLCByZXF1aXJlKFwiLi9zaGE1MTJcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4veDY0LWNvcmVcIiwgXCIuL3NoYTUxMlwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX3g2NCA9IEMueDY0O1xuXHQgICAgdmFyIFg2NFdvcmQgPSBDX3g2NC5Xb3JkO1xuXHQgICAgdmFyIFg2NFdvcmRBcnJheSA9IENfeDY0LldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgU0hBNTEyID0gQ19hbGdvLlNIQTUxMjtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMzg0IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMzg0ID0gQ19hbGdvLlNIQTM4NCA9IFNIQTUxMi5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgWDY0V29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweGNiYmI5ZDVkLCAweGMxMDU5ZWQ4KSwgbmV3IFg2NFdvcmQuaW5pdCgweDYyOWEyOTJhLCAweDM2N2NkNTA3KSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg5MTU5MDE1YSwgMHgzMDcwZGQxNyksIG5ldyBYNjRXb3JkLmluaXQoMHgxNTJmZWNkOCwgMHhmNzBlNTkzOSksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NjczMzI2NjcsIDB4ZmZjMDBiMzEpLCBuZXcgWDY0V29yZC5pbml0KDB4OGViNDRhODcsIDB4Njg1ODE1MTEpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweGRiMGMyZTBkLCAweDY0Zjk4ZmE3KSwgbmV3IFg2NFdvcmQuaW5pdCgweDQ3YjU0ODFkLCAweGJlZmE0ZmE0KVxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSBTSEE1MTIuX2RvRmluYWxpemUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICBoYXNoLnNpZ0J5dGVzIC09IDE2O1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMzg0KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEzODQod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEzODQgPSBTSEE1MTIuX2NyZWF0ZUhlbHBlcihTSEEzODQpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTM4NChtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEzODQgPSBTSEE1MTIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMzg0KTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEzODQ7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4veDY0LWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4veDY0LWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ194NjQgPSBDLng2NDtcblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZDtcblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICBmdW5jdGlvbiBYNjRXb3JkX2NyZWF0ZSgpIHtcblx0ICAgICAgICByZXR1cm4gWDY0V29yZC5jcmVhdGUuYXBwbHkoWDY0V29yZCwgYXJndW1lbnRzKTtcblx0ICAgIH1cblxuXHQgICAgLy8gQ29uc3RhbnRzXG5cdCAgICB2YXIgSyA9IFtcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDQyOGEyZjk4LCAweGQ3MjhhZTIyKSwgWDY0V29yZF9jcmVhdGUoMHg3MTM3NDQ5MSwgMHgyM2VmNjVjZCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiNWMwZmJjZiwgMHhlYzRkM2IyZiksIFg2NFdvcmRfY3JlYXRlKDB4ZTliNWRiYTUsIDB4ODE4OWRiYmMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Mzk1NmMyNWIsIDB4ZjM0OGI1MzgpLCBYNjRXb3JkX2NyZWF0ZSgweDU5ZjExMWYxLCAweGI2MDVkMDE5KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkyM2Y4MmE0LCAweGFmMTk0ZjliKSwgWDY0V29yZF9jcmVhdGUoMHhhYjFjNWVkNSwgMHhkYTZkODExOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkODA3YWE5OCwgMHhhMzAzMDI0MiksIFg2NFdvcmRfY3JlYXRlKDB4MTI4MzViMDEsIDB4NDU3MDZmYmUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MjQzMTg1YmUsIDB4NGVlNGIyOGMpLCBYNjRXb3JkX2NyZWF0ZSgweDU1MGM3ZGMzLCAweGQ1ZmZiNGUyKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDcyYmU1ZDc0LCAweGYyN2I4OTZmKSwgWDY0V29yZF9jcmVhdGUoMHg4MGRlYjFmZSwgMHgzYjE2OTZiMSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5YmRjMDZhNywgMHgyNWM3MTIzNSksIFg2NFdvcmRfY3JlYXRlKDB4YzE5YmYxNzQsIDB4Y2Y2OTI2OTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZTQ5YjY5YzEsIDB4OWVmMTRhZDIpLCBYNjRXb3JkX2NyZWF0ZSgweGVmYmU0Nzg2LCAweDM4NGYyNWUzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDBmYzE5ZGM2LCAweDhiOGNkNWI1KSwgWDY0V29yZF9jcmVhdGUoMHgyNDBjYTFjYywgMHg3N2FjOWM2NSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyZGU5MmM2ZiwgMHg1OTJiMDI3NSksIFg2NFdvcmRfY3JlYXRlKDB4NGE3NDg0YWEsIDB4NmVhNmU0ODMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NWNiMGE5ZGMsIDB4YmQ0MWZiZDQpLCBYNjRXb3JkX2NyZWF0ZSgweDc2Zjk4OGRhLCAweDgzMTE1M2I1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDk4M2U1MTUyLCAweGVlNjZkZmFiKSwgWDY0V29yZF9jcmVhdGUoMHhhODMxYzY2ZCwgMHgyZGI0MzIxMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiMDAzMjdjOCwgMHg5OGZiMjEzZiksIFg2NFdvcmRfY3JlYXRlKDB4YmY1OTdmYzcsIDB4YmVlZjBlZTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YzZlMDBiZjMsIDB4M2RhODhmYzIpLCBYNjRXb3JkX2NyZWF0ZSgweGQ1YTc5MTQ3LCAweDkzMGFhNzI1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDA2Y2E2MzUxLCAweGUwMDM4MjZmKSwgWDY0V29yZF9jcmVhdGUoMHgxNDI5Mjk2NywgMHgwYTBlNmU3MCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyN2I3MGE4NSwgMHg0NmQyMmZmYyksIFg2NFdvcmRfY3JlYXRlKDB4MmUxYjIxMzgsIDB4NWMyNmM5MjYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGQyYzZkZmMsIDB4NWFjNDJhZWQpLCBYNjRXb3JkX2NyZWF0ZSgweDUzMzgwZDEzLCAweDlkOTViM2RmKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDY1MGE3MzU0LCAweDhiYWY2M2RlKSwgWDY0V29yZF9jcmVhdGUoMHg3NjZhMGFiYiwgMHgzYzc3YjJhOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg4MWMyYzkyZSwgMHg0N2VkYWVlNiksIFg2NFdvcmRfY3JlYXRlKDB4OTI3MjJjODUsIDB4MTQ4MjM1M2IpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YTJiZmU4YTEsIDB4NGNmMTAzNjQpLCBYNjRXb3JkX2NyZWF0ZSgweGE4MWE2NjRiLCAweGJjNDIzMDAxKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGMyNGI4YjcwLCAweGQwZjg5NzkxKSwgWDY0V29yZF9jcmVhdGUoMHhjNzZjNTFhMywgMHgwNjU0YmUzMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkMTkyZTgxOSwgMHhkNmVmNTIxOCksIFg2NFdvcmRfY3JlYXRlKDB4ZDY5OTA2MjQsIDB4NTU2NWE5MTApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZjQwZTM1ODUsIDB4NTc3MTIwMmEpLCBYNjRXb3JkX2NyZWF0ZSgweDEwNmFhMDcwLCAweDMyYmJkMWI4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDE5YTRjMTE2LCAweGI4ZDJkMGM4KSwgWDY0V29yZF9jcmVhdGUoMHgxZTM3NmMwOCwgMHg1MTQxYWI1MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyNzQ4Nzc0YywgMHhkZjhlZWI5OSksIFg2NFdvcmRfY3JlYXRlKDB4MzRiMGJjYjUsIDB4ZTE5YjQ4YTgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MzkxYzBjYjMsIDB4YzVjOTVhNjMpLCBYNjRXb3JkX2NyZWF0ZSgweDRlZDhhYTRhLCAweGUzNDE4YWNiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDViOWNjYTRmLCAweDc3NjNlMzczKSwgWDY0V29yZF9jcmVhdGUoMHg2ODJlNmZmMywgMHhkNmIyYjhhMyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg3NDhmODJlZSwgMHg1ZGVmYjJmYyksIFg2NFdvcmRfY3JlYXRlKDB4NzhhNTYzNmYsIDB4NDMxNzJmNjApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ODRjODc4MTQsIDB4YTFmMGFiNzIpLCBYNjRXb3JkX2NyZWF0ZSgweDhjYzcwMjA4LCAweDFhNjQzOWVjKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkwYmVmZmZhLCAweDIzNjMxZTI4KSwgWDY0V29yZF9jcmVhdGUoMHhhNDUwNmNlYiwgMHhkZTgyYmRlOSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiZWY5YTNmNywgMHhiMmM2NzkxNSksIFg2NFdvcmRfY3JlYXRlKDB4YzY3MTc4ZjIsIDB4ZTM3MjUzMmIpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Y2EyNzNlY2UsIDB4ZWEyNjYxOWMpLCBYNjRXb3JkX2NyZWF0ZSgweGQxODZiOGM3LCAweDIxYzBjMjA3KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGVhZGE3ZGQ2LCAweGNkZTBlYjFlKSwgWDY0V29yZF9jcmVhdGUoMHhmNTdkNGY3ZiwgMHhlZTZlZDE3OCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgwNmYwNjdhYSwgMHg3MjE3NmZiYSksIFg2NFdvcmRfY3JlYXRlKDB4MGE2MzdkYzUsIDB4YTJjODk4YTYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MTEzZjk4MDQsIDB4YmVmOTBkYWUpLCBYNjRXb3JkX2NyZWF0ZSgweDFiNzEwYjM1LCAweDEzMWM0NzFiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI4ZGI3N2Y1LCAweDIzMDQ3ZDg0KSwgWDY0V29yZF9jcmVhdGUoMHgzMmNhYWI3YiwgMHg0MGM3MjQ5MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgzYzllYmUwYSwgMHgxNWM5YmViYyksIFg2NFdvcmRfY3JlYXRlKDB4NDMxZDY3YzQsIDB4OWMxMDBkNGMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGNjNWQ0YmUsIDB4Y2IzZTQyYjYpLCBYNjRXb3JkX2NyZWF0ZSgweDU5N2YyOTljLCAweGZjNjU3ZTJhKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDVmY2I2ZmFiLCAweDNhZDZmYWVjKSwgWDY0V29yZF9jcmVhdGUoMHg2YzQ0MTk4YywgMHg0YTQ3NTgxNylcblx0ICAgIF07XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdHNcblx0ICAgIHZhciBXID0gW107XG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICBXW2ldID0gWDY0V29yZF9jcmVhdGUoKTtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS01MTIgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEE1MTIgPSBDX2FsZ28uU0hBNTEyID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBYNjRXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NmEwOWU2NjcsIDB4ZjNiY2M5MDgpLCBuZXcgWDY0V29yZC5pbml0KDB4YmI2N2FlODUsIDB4ODRjYWE3M2IpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDNjNmVmMzcyLCAweGZlOTRmODJiKSwgbmV3IFg2NFdvcmQuaW5pdCgweGE1NGZmNTNhLCAweDVmMWQzNmYxKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg1MTBlNTI3ZiwgMHhhZGU2ODJkMSksIG5ldyBYNjRXb3JkLmluaXQoMHg5YjA1Njg4YywgMHgyYjNlNmMxZiksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4MWY4M2Q5YWIsIDB4ZmI0MWJkNmIpLCBuZXcgWDY0V29yZC5pbml0KDB4NWJlMGNkMTksIDB4MTM3ZTIxNzkpXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgSDAgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgSDEgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgSDIgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgSDMgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgSDQgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgSDUgPSBIWzVdO1xuXHQgICAgICAgICAgICB2YXIgSDYgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgSDcgPSBIWzddO1xuXG5cdCAgICAgICAgICAgIHZhciBIMGggPSBIMC5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDBsID0gSDAubG93O1xuXHQgICAgICAgICAgICB2YXIgSDFoID0gSDEuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgxbCA9IEgxLmxvdztcblx0ICAgICAgICAgICAgdmFyIEgyaCA9IEgyLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIMmwgPSBIMi5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIM2ggPSBIMy5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDNsID0gSDMubG93O1xuXHQgICAgICAgICAgICB2YXIgSDRoID0gSDQuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg0bCA9IEg0Lmxvdztcblx0ICAgICAgICAgICAgdmFyIEg1aCA9IEg1LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBINWwgPSBINS5sb3c7XG5cdCAgICAgICAgICAgIHZhciBINmggPSBINi5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDZsID0gSDYubG93O1xuXHQgICAgICAgICAgICB2YXIgSDdoID0gSDcuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg3bCA9IEg3LmxvdztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYWggPSBIMGg7XG5cdCAgICAgICAgICAgIHZhciBhbCA9IEgwbDtcblx0ICAgICAgICAgICAgdmFyIGJoID0gSDFoO1xuXHQgICAgICAgICAgICB2YXIgYmwgPSBIMWw7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IEgyaDtcblx0ICAgICAgICAgICAgdmFyIGNsID0gSDJsO1xuXHQgICAgICAgICAgICB2YXIgZGggPSBIM2g7XG5cdCAgICAgICAgICAgIHZhciBkbCA9IEgzbDtcblx0ICAgICAgICAgICAgdmFyIGVoID0gSDRoO1xuXHQgICAgICAgICAgICB2YXIgZWwgPSBINGw7XG5cdCAgICAgICAgICAgIHZhciBmaCA9IEg1aDtcblx0ICAgICAgICAgICAgdmFyIGZsID0gSDVsO1xuXHQgICAgICAgICAgICB2YXIgZ2ggPSBINmg7XG5cdCAgICAgICAgICAgIHZhciBnbCA9IEg2bDtcblx0ICAgICAgICAgICAgdmFyIGhoID0gSDdoO1xuXHQgICAgICAgICAgICB2YXIgaGwgPSBIN2w7XG5cblx0ICAgICAgICAgICAgLy8gUm91bmRzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIFdpbDtcblx0ICAgICAgICAgICAgICAgIHZhciBXaWg7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgV2kgPSBXW2ldO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBFeHRlbmQgbWVzc2FnZVxuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpLmhpZ2ggPSBNW29mZnNldCArIGkgKiAyXSAgICAgfCAwO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpbCA9IFdpLmxvdyAgPSBNW29mZnNldCArIGkgKiAyICsgMV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTBcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCAgPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHhoID0gZ2FtbWEweC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4bCA9IGdhbW1hMHgubG93O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTBoICA9ICgoZ2FtbWEweGggPj4+IDEpIHwgKGdhbW1hMHhsIDw8IDMxKSkgXiAoKGdhbW1hMHhoID4+PiA4KSB8IChnYW1tYTB4bCA8PCAyNCkpIF4gKGdhbW1hMHhoID4+PiA3KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwbCAgPSAoKGdhbW1hMHhsID4+PiAxKSB8IChnYW1tYTB4aCA8PCAzMSkpIF4gKChnYW1tYTB4bCA+Pj4gOCkgfCAoZ2FtbWEweGggPDwgMjQpKSBeICgoZ2FtbWEweGwgPj4+IDcpIHwgKGdhbW1hMHhoIDw8IDI1KSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTFcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCAgPSBXW2kgLSAyXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeGggPSBnYW1tYTF4LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXhsID0gZ2FtbWExeC5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMWggID0gKChnYW1tYTF4aCA+Pj4gMTkpIHwgKGdhbW1hMXhsIDw8IDEzKSkgXiAoKGdhbW1hMXhoIDw8IDMpIHwgKGdhbW1hMXhsID4+PiAyOSkpIF4gKGdhbW1hMXhoID4+PiA2KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExbCAgPSAoKGdhbW1hMXhsID4+PiAxOSkgfCAoZ2FtbWExeGggPDwgMTMpKSBeICgoZ2FtbWExeGwgPDwgMykgfCAoZ2FtbWExeGggPj4+IDI5KSkgXiAoKGdhbW1hMXhsID4+PiA2KSB8IChnYW1tYTF4aCA8PCAyNikpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpNyAgPSBXW2kgLSA3XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2k3aCA9IFdpNy5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTdsID0gV2k3LmxvdztcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTE2ICA9IFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2kxNmggPSBXaTE2LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpMTZsID0gV2kxNi5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBnYW1tYTBsICsgV2k3bDtcblx0ICAgICAgICAgICAgICAgICAgICBXaWggPSBnYW1tYTBoICsgV2k3aCArICgoV2lsID4+PiAwKSA8IChnYW1tYTBsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBXaWwgKyBnYW1tYTFsO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpaCArIGdhbW1hMWggKyAoKFdpbCA+Pj4gMCkgPCAoZ2FtbWExbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICAgICAgV2lsID0gV2lsICsgV2kxNmw7XG5cdCAgICAgICAgICAgICAgICAgICAgV2loID0gV2loICsgV2kxNmggKyAoKFdpbCA+Pj4gMCkgPCAoV2kxNmwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV2kuaGlnaCA9IFdpaDtcblx0ICAgICAgICAgICAgICAgICAgICBXaS5sb3cgID0gV2lsO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2hoICA9IChlaCAmIGZoKSBeICh+ZWggJiBnaCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgY2hsICA9IChlbCAmIGZsKSBeICh+ZWwgJiBnbCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqaCA9IChhaCAmIGJoKSBeIChhaCAmIGNoKSBeIChiaCAmIGNoKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWpsID0gKGFsICYgYmwpIF4gKGFsICYgY2wpIF4gKGJsICYgY2wpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwaCA9ICgoYWggPj4+IDI4KSB8IChhbCA8PCA0KSkgIF4gKChhaCA8PCAzMCkgIHwgKGFsID4+PiAyKSkgXiAoKGFoIDw8IDI1KSB8IChhbCA+Pj4gNykpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMGwgPSAoKGFsID4+PiAyOCkgfCAoYWggPDwgNCkpICBeICgoYWwgPDwgMzApICB8IChhaCA+Pj4gMikpIF4gKChhbCA8PCAyNSkgfCAoYWggPj4+IDcpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTFoID0gKChlaCA+Pj4gMTQpIHwgKGVsIDw8IDE4KSkgXiAoKGVoID4+PiAxOCkgfCAoZWwgPDwgMTQpKSBeICgoZWggPDwgMjMpIHwgKGVsID4+PiA5KSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExbCA9ICgoZWwgPj4+IDE0KSB8IChlaCA8PCAxOCkpIF4gKChlbCA+Pj4gMTgpIHwgKGVoIDw8IDE0KSkgXiAoKGVsIDw8IDIzKSB8IChlaCA+Pj4gOSkpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldXG5cdCAgICAgICAgICAgICAgICB2YXIgS2kgID0gS1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciBLaWggPSBLaS5oaWdoO1xuXHQgICAgICAgICAgICAgICAgdmFyIEtpbCA9IEtpLmxvdztcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IGhsICsgc2lnbWExbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSBoaCArIHNpZ21hMWggKyAoKHQxbCA+Pj4gMCkgPCAoaGwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IHQxbCArIGNobDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSB0MWggKyBjaGggKyAoKHQxbCA+Pj4gMCkgPCAoY2hsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSB0MWwgKyBLaWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gdDFoICsgS2loICsgKCh0MWwgPj4+IDApIDwgKEtpbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gdDFsICsgV2lsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IHQxaCArIFdpaCArICgodDFsID4+PiAwKSA8IChXaWwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MiA9IHNpZ21hMCArIG1halxuXHQgICAgICAgICAgICAgICAgdmFyIHQybCA9IHNpZ21hMGwgKyBtYWpsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQyaCA9IHNpZ21hMGggKyBtYWpoICsgKCh0MmwgPj4+IDApIDwgKHNpZ21hMGwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBVcGRhdGUgd29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgICAgIGhoID0gZ2g7XG5cdCAgICAgICAgICAgICAgICBobCA9IGdsO1xuXHQgICAgICAgICAgICAgICAgZ2ggPSBmaDtcblx0ICAgICAgICAgICAgICAgIGdsID0gZmw7XG5cdCAgICAgICAgICAgICAgICBmaCA9IGVoO1xuXHQgICAgICAgICAgICAgICAgZmwgPSBlbDtcblx0ICAgICAgICAgICAgICAgIGVsID0gKGRsICsgdDFsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBlaCA9IChkaCArIHQxaCArICgoZWwgPj4+IDApIDwgKGRsID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZGggPSBjaDtcblx0ICAgICAgICAgICAgICAgIGRsID0gY2w7XG5cdCAgICAgICAgICAgICAgICBjaCA9IGJoO1xuXHQgICAgICAgICAgICAgICAgY2wgPSBibDtcblx0ICAgICAgICAgICAgICAgIGJoID0gYWg7XG5cdCAgICAgICAgICAgICAgICBibCA9IGFsO1xuXHQgICAgICAgICAgICAgICAgYWwgPSAodDFsICsgdDJsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBhaCA9ICh0MWggKyB0MmggKyAoKGFsID4+PiAwKSA8ICh0MWwgPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIMGwgPSBIMC5sb3cgID0gKEgwbCArIGFsKTtcblx0ICAgICAgICAgICAgSDAuaGlnaCA9IChIMGggKyBhaCArICgoSDBsID4+PiAwKSA8IChhbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMWwgPSBIMS5sb3cgID0gKEgxbCArIGJsKTtcblx0ICAgICAgICAgICAgSDEuaGlnaCA9IChIMWggKyBiaCArICgoSDFsID4+PiAwKSA8IChibCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMmwgPSBIMi5sb3cgID0gKEgybCArIGNsKTtcblx0ICAgICAgICAgICAgSDIuaGlnaCA9IChIMmggKyBjaCArICgoSDJsID4+PiAwKSA8IChjbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIM2wgPSBIMy5sb3cgID0gKEgzbCArIGRsKTtcblx0ICAgICAgICAgICAgSDMuaGlnaCA9IChIM2ggKyBkaCArICgoSDNsID4+PiAwKSA8IChkbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINGwgPSBINC5sb3cgID0gKEg0bCArIGVsKTtcblx0ICAgICAgICAgICAgSDQuaGlnaCA9IChINGggKyBlaCArICgoSDRsID4+PiAwKSA8IChlbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINWwgPSBINS5sb3cgID0gKEg1bCArIGZsKTtcblx0ICAgICAgICAgICAgSDUuaGlnaCA9IChINWggKyBmaCArICgoSDVsID4+PiAwKSA8IChmbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINmwgPSBINi5sb3cgID0gKEg2bCArIGdsKTtcblx0ICAgICAgICAgICAgSDYuaGlnaCA9IChINmggKyBnaCArICgoSDZsID4+PiAwKSA8IChnbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIN2wgPSBINy5sb3cgID0gKEg3bCArIGhsKTtcblx0ICAgICAgICAgICAgSDcuaGlnaCA9IChIN2ggKyBoaCArICgoSDdsID4+PiAwKSA8IChobCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgaGFzaCB0byAzMi1iaXQgd29yZCBhcnJheSBiZWZvcmUgcmV0dXJuaW5nXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5faGFzaC50b1gzMigpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEwMjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBNTEyKCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEE1MTIod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEE1MTIpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTUxMihtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBNTEyKTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEE1MTI7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBYMzJXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogeDY0IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBIDY0LWJpdCB3b3JkLlxuXHQgICAgICovXG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIDY0LWJpdCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGhpZ2ggVGhlIGhpZ2ggMzIgYml0cy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbG93IFRoZSBsb3cgMzIgYml0cy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHg2NFdvcmQgPSBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgwMDAxMDIwMywgMHgwNDA1MDYwNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGhpZ2gsIGxvdykge1xuXHQgICAgICAgICAgICB0aGlzLmhpZ2ggPSBoaWdoO1xuXHQgICAgICAgICAgICB0aGlzLmxvdyA9IGxvdztcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIE5PVHMgdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIG5lZ2F0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbmVnYXRlZCA9IHg2NFdvcmQubm90KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gbm90OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gfnRoaXMuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IH50aGlzLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBBTkRzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gQU5EIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIEFORGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGFuZGVkID0geDY0V29yZC5hbmQoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIGFuZDogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggJiB3b3JkLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyAmIHdvcmQubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIE9ScyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIE9SIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIE9SaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgb3JlZCA9IHg2NFdvcmQub3IoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIG9yOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCB8IHdvcmQuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IHwgd29yZC5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgWE9ScyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIFhPUiB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBYT1JpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4b3JlZCA9IHg2NFdvcmQueG9yKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyB4b3I6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoIF4gd29yZC5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgXiB3b3JkLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogU2hpZnRzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIGxlZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgc2hpZnRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzaGlmdGVkID0geDY0V29yZC5zaGlmdEwoMjUpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHNoaWZ0TDogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gaWYgKG4gPCAzMikge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSAodGhpcy5oaWdoIDw8IG4pIHwgKHRoaXMubG93ID4+PiAoMzIgLSBuKSk7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgPDwgbjtcblx0ICAgICAgICAgICAgLy8gfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5sb3cgPDwgKG4gLSAzMik7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gMDtcblx0ICAgICAgICAgICAgLy8gfVxuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBTaGlmdHMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgcmlnaHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgc2hpZnRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzaGlmdGVkID0geDY0V29yZC5zaGlmdFIoNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gc2hpZnRSOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyBpZiAobiA8IDMyKSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gKHRoaXMubG93ID4+PiBuKSB8ICh0aGlzLmhpZ2ggPDwgKDMyIC0gbikpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggPj4+IG47XG5cdCAgICAgICAgICAgIC8vIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5oaWdoID4+PiAobiAtIDMyKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gMDtcblx0ICAgICAgICAgICAgLy8gfVxuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSb3RhdGVzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIGxlZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcm90YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHJvdGF0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcm90YXRlZCA9IHg2NFdvcmQucm90TCgyNSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gcm90TDogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2hpZnRMKG4pLm9yKHRoaXMuc2hpZnRSKDY0IC0gbikpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSb3RhdGVzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIHJpZ2h0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJvdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciByb3RhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHJvdGF0ZWQgPSB4NjRXb3JkLnJvdFIoNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gcm90UjogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2hpZnRSKG4pLm9yKHRoaXMuc2hpZnRMKDY0IC0gbikpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gYWRkIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIGFkZGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGFkZGVkID0geDY0V29yZC5hZGQoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIGFkZDogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9ICh0aGlzLmxvdyArIHdvcmQubG93KSB8IDA7XG5cdCAgICAgICAgICAgIC8vIHZhciBjYXJyeSA9IChsb3cgPj4+IDApIDwgKHRoaXMubG93ID4+PiAwKSA/IDEgOiAwO1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9ICh0aGlzLmhpZ2ggKyB3b3JkLmhpZ2ggKyBjYXJyeSkgfCAwO1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDY0LWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgQ3J5cHRvSlMueDY0LldvcmQgb2JqZWN0cy5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaWdCeXRlcyBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFg2NFdvcmRBcnJheSA9IENfeDY0LldvcmRBcnJheSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIChPcHRpb25hbCkgQW4gYXJyYXkgb2YgQ3J5cHRvSlMueDY0LldvcmQgb2JqZWN0cy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDAwMDEwMjAzLCAweDA0MDUwNjA3KSxcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDE4MTkxYTFiLCAweDFjMWQxZTFmKVxuXHQgICAgICAgICAqICAgICBdKTtcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMueDY0LldvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MDAwMTAyMDMsIDB4MDQwNTA2MDcpLFxuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MTgxOTFhMWIsIDB4MWMxZDFlMWYpXG5cdCAgICAgICAgICogICAgIF0sIDEwKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgNjQtYml0IHdvcmQgYXJyYXkgdG8gYSAzMi1iaXQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NyeXB0b0pTLmxpYi5Xb3JkQXJyYXl9IFRoaXMgd29yZCBhcnJheSdzIGRhdGEgYXMgYSAzMi1iaXQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHgzMldvcmRBcnJheSA9IHg2NFdvcmRBcnJheS50b1gzMigpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvWDMyOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgeDY0V29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgeDY0V29yZHNMZW5ndGggPSB4NjRXb3Jkcy5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgeDMyV29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4NjRXb3Jkc0xlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgeDY0V29yZCA9IHg2NFdvcmRzW2ldO1xuXHQgICAgICAgICAgICAgICAgeDMyV29yZHMucHVzaCh4NjRXb3JkLmhpZ2gpO1xuXHQgICAgICAgICAgICAgICAgeDMyV29yZHMucHVzaCh4NjRXb3JkLmxvdyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gWDMyV29yZEFycmF5LmNyZWF0ZSh4MzJXb3JkcywgdGhpcy5zaWdCeXRlcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmRBcnJheX0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSB4NjRXb3JkQXJyYXkuY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUgXCJ3b3Jkc1wiIGFycmF5XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IGNsb25lLndvcmRzID0gdGhpcy53b3Jkcy5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBlYWNoIFg2NFdvcmQgb2JqZWN0XG5cdCAgICAgICAgICAgIHZhciB3b3Jkc0xlbmd0aCA9IHdvcmRzLmxlbmd0aDtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkc0xlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpXSA9IHdvcmRzW2ldLmNsb25lKCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCIvKiAoaWdub3JlZCkgKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL3NyYy9Mb2cuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudCB9IGZyb20gJy4vc3JjL09pZGNDbGllbnQuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudFNldHRpbmdzIH0gZnJvbSAnLi9zcmMvT2lkY0NsaWVudFNldHRpbmdzLmpzJztcbmltcG9ydCB7IFdlYlN0b3JhZ2VTdGF0ZVN0b3JlIH0gZnJvbSAnLi9zcmMvV2ViU3RvcmFnZVN0YXRlU3RvcmUuanMnO1xuaW1wb3J0IHsgSW5NZW1vcnlXZWJTdG9yYWdlIH0gZnJvbSAnLi9zcmMvSW5NZW1vcnlXZWJTdG9yYWdlLmpzJztcbmltcG9ydCB7IFVzZXJNYW5hZ2VyIH0gZnJvbSAnLi9zcmMvVXNlck1hbmFnZXIuanMnO1xuaW1wb3J0IHsgQWNjZXNzVG9rZW5FdmVudHMgfSBmcm9tICcuL3NyYy9BY2Nlc3NUb2tlbkV2ZW50cy5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL3NyYy9NZXRhZGF0YVNlcnZpY2UuanMnO1xuaW1wb3J0IHsgQ29yZG92YVBvcHVwTmF2aWdhdG9yIH0gZnJvbSAnLi9zcmMvQ29yZG92YVBvcHVwTmF2aWdhdG9yLmpzJztcbmltcG9ydCB7IENvcmRvdmFJRnJhbWVOYXZpZ2F0b3IgfSBmcm9tICcuL3NyYy9Db3Jkb3ZhSUZyYW1lTmF2aWdhdG9yLmpzJztcbmltcG9ydCB7IENoZWNrU2Vzc2lvbklGcmFtZSB9IGZyb20gJy4vc3JjL0NoZWNrU2Vzc2lvbklGcmFtZS5qcyc7XG5pbXBvcnQgeyBUb2tlblJldm9jYXRpb25DbGllbnQgfSBmcm9tICcuL3NyYy9Ub2tlblJldm9jYXRpb25DbGllbnQuanMnO1xuaW1wb3J0IHsgU2Vzc2lvbk1vbml0b3IgfSBmcm9tICcuL3NyYy9TZXNzaW9uTW9uaXRvci5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL3NyYy9HbG9iYWwuanMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vc3JjL1VzZXIuanMnO1xuXG5pbXBvcnQgeyBWZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFZlcnNpb24sXG4gICAgTG9nLFxuICAgIE9pZGNDbGllbnQsXG4gICAgT2lkY0NsaWVudFNldHRpbmdzLFxuICAgIFdlYlN0b3JhZ2VTdGF0ZVN0b3JlLFxuICAgIEluTWVtb3J5V2ViU3RvcmFnZSxcbiAgICBVc2VyTWFuYWdlcixcbiAgICBBY2Nlc3NUb2tlbkV2ZW50cyxcbiAgICBNZXRhZGF0YVNlcnZpY2UsXG4gICAgQ29yZG92YVBvcHVwTmF2aWdhdG9yLFxuICAgIENvcmRvdmFJRnJhbWVOYXZpZ2F0b3IsXG4gICAgQ2hlY2tTZXNzaW9uSUZyYW1lLFxuICAgIFRva2VuUmV2b2NhdGlvbkNsaWVudCxcbiAgICBTZXNzaW9uTW9uaXRvcixcbiAgICBHbG9iYWwsXG4gICAgVXNlclxufTtcbiJdLCJuYW1lcyI6WyJMb2ciLCJUaW1lciIsIkRlZmF1bHRBY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSIsIkFjY2Vzc1Rva2VuRXZlbnRzIiwiX3JlZiIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9yZWYkYWNjZXNzVG9rZW5FeHBpciIsImFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lIiwiX3JlZiRhY2Nlc3NUb2tlbkV4cGlyMiIsImFjY2Vzc1Rva2VuRXhwaXJpbmdUaW1lciIsIl9yZWYkYWNjZXNzVG9rZW5FeHBpcjMiLCJhY2Nlc3NUb2tlbkV4cGlyZWRUaW1lciIsIl9hY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSIsIl9hY2Nlc3NUb2tlbkV4cGlyaW5nIiwiX2FjY2Vzc1Rva2VuRXhwaXJlZCIsIl9wcm90byIsInByb3RvdHlwZSIsImxvYWQiLCJjb250YWluZXIiLCJhY2Nlc3NfdG9rZW4iLCJleHBpcmVzX2luIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImV4cGlyaW5nIiwiaW5pdCIsImNhbmNlbCIsImV4cGlyZWQiLCJ1bmxvYWQiLCJhZGRBY2Nlc3NUb2tlbkV4cGlyaW5nIiwiY2IiLCJhZGRIYW5kbGVyIiwicmVtb3ZlQWNjZXNzVG9rZW5FeHBpcmluZyIsInJlbW92ZUhhbmRsZXIiLCJhZGRBY2Nlc3NUb2tlbkV4cGlyZWQiLCJyZW1vdmVBY2Nlc3NUb2tlbkV4cGlyZWQiLCJEZWZhdWx0SW50ZXJ2YWwiLCJDaGVja1Nlc3Npb25JRnJhbWUiLCJjYWxsYmFjayIsImNsaWVudF9pZCIsInVybCIsImludGVydmFsIiwic3RvcE9uRXJyb3IiLCJfY2FsbGJhY2siLCJfY2xpZW50X2lkIiwiX3VybCIsIl9pbnRlcnZhbCIsIl9zdG9wT25FcnJvciIsImlkeCIsImluZGV4T2YiLCJfZnJhbWVfb3JpZ2luIiwic3Vic3RyIiwiX2ZyYW1lIiwid2luZG93IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwicG9zaXRpb24iLCJkaXNwbGF5Iiwid2lkdGgiLCJoZWlnaHQiLCJzcmMiLCJfdGhpcyIsIlByb21pc2UiLCJyZXNvbHZlIiwib25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiX2JvdW5kTWVzc2FnZUV2ZW50IiwiX21lc3NhZ2UiLCJiaW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJvcmlnaW4iLCJzb3VyY2UiLCJjb250ZW50V2luZG93IiwiZGF0YSIsImVycm9yIiwic3RvcCIsInN0YXJ0Iiwic2Vzc2lvbl9zdGF0ZSIsIl90aGlzMiIsIl9zZXNzaW9uX3N0YXRlIiwic2VuZCIsInBvc3RNZXNzYWdlIiwiX3RpbWVyIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiQ2xvY2tTZXJ2aWNlIiwiZ2V0RXBvY2hUaW1lIiwiRGF0ZSIsIm5vdyIsIkNvcmRvdmFQb3B1cFdpbmRvdyIsIkNvcmRvdmFJRnJhbWVOYXZpZ2F0b3IiLCJwcmVwYXJlIiwicGFyYW1zIiwicG9wdXBXaW5kb3dGZWF0dXJlcyIsInBvcHVwIiwiQ29yZG92YVBvcHVwTmF2aWdhdG9yIiwiRGVmYXVsdFBvcHVwRmVhdHVyZXMiLCJEZWZhdWx0UG9wdXBUYXJnZXQiLCJfcHJvbWlzZSIsInJlamVjdCIsIl9yZXNvbHZlIiwiX3JlamVjdCIsImZlYXR1cmVzIiwidGFyZ2V0IiwicG9wdXBXaW5kb3dUYXJnZXQiLCJyZWRpcmVjdF91cmkiLCJzdGFydFVybCIsIl9pc0luQXBwQnJvd3Nlckluc3RhbGxlZCIsImNvcmRvdmFNZXRhZGF0YSIsInNvbWUiLCJuYW1lIiwiaGFzT3duUHJvcGVydHkiLCJuYXZpZ2F0ZSIsIl9lcnJvciIsImNvcmRvdmEiLCJyZXF1aXJlIiwibWV0YWRhdGEiLCJfcG9wdXAiLCJJbkFwcEJyb3dzZXIiLCJvcGVuIiwiX2V4aXRDYWxsYmFja0V2ZW50IiwiX2V4aXRDYWxsYmFjayIsIl9sb2FkU3RhcnRDYWxsYmFja0V2ZW50IiwiX2xvYWRTdGFydENhbGxiYWNrIiwicHJvbWlzZSIsImV2ZW50IiwiX3N1Y2Nlc3MiLCJtZXNzYWdlIiwiX2NsZWFudXAiLCJFcnJvciIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9jcmVhdGVDbGFzcyIsImtleSIsImdldCIsIkVycm9yUmVzcG9uc2UiLCJfRXJyb3IiLCJlcnJvcl9kZXNjcmlwdGlvbiIsImVycm9yX3VyaSIsInN0YXRlIiwiY2FsbCIsIl9pbmhlcml0c0xvb3NlIiwiX3dyYXBOYXRpdmVTdXBlciIsIkV2ZW50IiwiX25hbWUiLCJfY2FsbGJhY2tzIiwicHVzaCIsImZpbmRJbmRleCIsIml0ZW0iLCJzcGxpY2UiLCJyYWlzZSIsImkiLCJfdGhpcyRfY2FsbGJhY2tzIiwiYXBwbHkiLCJ0aW1lciIsIl9zZXRJbnRlcnZhbCIsIl94IiwiX3gyIiwidG9TdHJpbmciLCJfY2xlYXJJbnRlcnZhbCIsIl94MyIsImhhbmRsZSIsInRlc3RpbmciLCJyZXF1ZXN0IiwiR2xvYmFsIiwiX3Rlc3RpbmciLCJzZXRYTUxIdHRwUmVxdWVzdCIsIm5ld1JlcXVlc3QiLCJsb2NhdGlvbiIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiWE1MSHR0cFJlcXVlc3QiLCJJRnJhbWVXaW5kb3ciLCJJRnJhbWVOYXZpZ2F0b3IiLCJmcmFtZSIsIm5vdGlmeVBhcmVudCIsIkRlZmF1bHRUaW1lb3V0IiwidGltZW91dCIsInNpbGVudFJlcXVlc3RUaW1lb3V0Iiwic2V0VGltZW91dCIsIl90aW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiLCJfb3JpZ2luIiwic3RhcnRzV2l0aCIsImhyZWYiLCJwYXJlbnQiLCJwcm90b2NvbCIsImhvc3QiLCJJbk1lbW9yeVdlYlN0b3JhZ2UiLCJfZGF0YSIsImdldEl0ZW0iLCJzZXRJdGVtIiwidmFsdWUiLCJyZW1vdmVJdGVtIiwiaW5kZXgiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiU0hBMjU2IiwiU0hBMzg0IiwiU0hBNTEyIiwiSGV4IiwiQmFzZTY0IiwidG9CeXRlQXJyYXkiLCJBbGxvd2VkU2lnbmluZ0FsZ3MiLCJhc3NlcnRBbGxvd2VkQWxnIiwiYWxnIiwidG9Mb3dlckNhc2UiLCJIYXNoZXJzIiwic2hhMjU2Iiwic2hhMzg0Iiwic2hhNTEyIiwiYjY0VG9CeXRlcyIsInMiLCJyZXBsYWNlIiwidXRmOERlY29kZSIsImJ5dGVzIiwiZXNjYXBlZCIsInNsaWNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiYjY0dVRvSnNvbiIsIkpTT04iLCJwYXJzZSIsImFzY2lpVG9CeXRlcyIsIm91dCIsIlVpbnQ4QXJyYXkiLCJjaGFyQ29kZUF0IiwiZ2V0U3VidGxlIiwiYyIsImNyeXB0byIsImdsb2JhbFRoaXMiLCJnbG9iYWwiLCJzdWJ0bGUiLCJyZWFkVGx2Iiwib2Zmc2V0IiwidGFnIiwibGVuIiwibiIsImVuZCIsInNwa2lGcm9tQ2VydGlmaWNhdGUiLCJkZXIiLCJjZXJ0IiwidGJzIiwicG9zIiwiZWwiLCJyZXNvbHZlS2V5Iiwia3R5IiwiZm9ybWF0IiwiZXh0IiwieDVjIiwiY3J2IiwieCIsInkiLCJhbGdQYXJhbXMiLCJiaXRzIiwiaGFzaCIsImltcG9ydEFsZyIsInZlcmlmeUFsZyIsInNhbHRMZW5ndGgiLCJwYXJzZUludCIsImN1cnZlIiwibmFtZWRDdXJ2ZSIsIkpvc2VVdGlsIiwicGFyc2VKd3QiLCJqd3QiLCJwYXJ0cyIsInNwbGl0IiwiaGVhZGVyIiwicGF5bG9hZCIsImlzQWxsb3dlZFNpZ25pbmdBbGciLCJ2YWxpZGF0ZUp3dCIsImlzc3VlciIsImF1ZGllbmNlIiwiY2xvY2tTa2V3IiwidGltZUluc2Vuc2l0aXZlIiwicmVzb2x2ZWQiLCJ2YWxpZGF0ZUp3dEF0dHJpYnV0ZXMiLCJ0aGVuIiwiX3ZlcmlmeVNpZ25hdHVyZSIsInZhbGlkIiwicCIsInNpZ25hdHVyZSIsImltcG9ydEtleSIsImNyeXB0b0tleSIsInZlcmlmeSIsInBhcnNlZCIsImlzcyIsImF1ZCIsInZhbGlkQXVkaWVuY2UiLCJBcnJheSIsImlzQXJyYXkiLCJhenAiLCJsb3dlck5vdyIsInVwcGVyTm93IiwiaWF0IiwibmJmIiwiZXhwIiwiaGFzaFN0cmluZyIsImhhc2hlciIsIlN0cmluZyIsImhleFRvQmFzZTY0VXJsIiwic3RyaW5naWZ5IiwiSnNvblNlcnZpY2UiLCJhZGRpdGlvbmFsQ29udGVudFR5cGVzIiwiWE1MSHR0cFJlcXVlc3RDdG9yIiwiand0SGFuZGxlciIsIl9jb250ZW50VHlwZXMiLCJfWE1MSHR0cFJlcXVlc3QiLCJfand0SGFuZGxlciIsImdldEpzb24iLCJ0b2tlbiIsInJlcSIsImFsbG93ZWRDb250ZW50VHlwZXMiLCJzdGF0dXMiLCJjb250ZW50VHlwZSIsImdldFJlc3BvbnNlSGVhZGVyIiwiZm91bmQiLCJmaW5kIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsIm9uZXJyb3IiLCJzZXRSZXF1ZXN0SGVhZGVyIiwicG9zdEZvcm0iLCJiYXNpY0F1dGgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJidG9hIiwibm9wTG9nZ2VyIiwiaW5mbyIsIndhcm4iLCJOT05FIiwiRVJST1IiLCJXQVJOIiwiSU5GTyIsIkRFQlVHIiwibG9nZ2VyIiwibGV2ZWwiLCJyZXNldCIsIl9sZW4iLCJhcmdzIiwiX2tleSIsImZyb20iLCJfbGVuMiIsIl9rZXkyIiwiX2xlbjMiLCJfa2V5MyIsIl9sZW40IiwiX2tleTQiLCJzZXQiLCJPaWRjTWV0YWRhdGFVcmxQYXRoIiwiTWV0YWRhdGFTZXJ2aWNlIiwic2V0dGluZ3MiLCJKc29uU2VydmljZUN0b3IiLCJfc2V0dGluZ3MiLCJfanNvblNlcnZpY2UiLCJyZXNldFNpZ25pbmdLZXlzIiwic2lnbmluZ0tleXMiLCJnZXRNZXRhZGF0YSIsIm1ldGFkYXRhVXJsIiwic2VlZCIsIm1ldGFkYXRhU2VlZCIsImFzc2lnbiIsImdldElzc3VlciIsIl9nZXRNZXRhZGF0YVByb3BlcnR5IiwiZ2V0QXV0aG9yaXphdGlvbkVuZHBvaW50IiwiZ2V0VXNlckluZm9FbmRwb2ludCIsImdldFRva2VuRW5kcG9pbnQiLCJvcHRpb25hbCIsImdldENoZWNrU2Vzc2lvbklmcmFtZSIsImdldEVuZFNlc3Npb25FbmRwb2ludCIsImdldFJldm9jYXRpb25FbmRwb2ludCIsImdldEtleXNFbmRwb2ludCIsImdldFNpZ25pbmdLZXlzIiwiandrc191cmkiLCJrZXlTZXQiLCJrZXlzIiwiX21ldGFkYXRhVXJsIiwiYXV0aG9yaXR5IiwiT2lkY0NsaWVudFNldHRpbmdzIiwiU2lnbmluUmVxdWVzdCIsIlNpZ25pblJlc3BvbnNlIiwiU2lnbm91dFJlcXVlc3QiLCJTaWdub3V0UmVzcG9uc2UiLCJTaWduaW5TdGF0ZSIsIlN0YXRlIiwiT2lkY0NsaWVudCIsImNyZWF0ZVNpZ25pblJlcXVlc3QiLCJyZXNwb25zZV90eXBlIiwic2NvcGUiLCJwcm9tcHQiLCJtYXhfYWdlIiwidWlfbG9jYWxlcyIsImlkX3Rva2VuX2hpbnQiLCJsb2dpbl9oaW50IiwiYWNyX3ZhbHVlcyIsInJlc291cmNlIiwicmVxdWVzdF91cmkiLCJyZXNwb25zZV9tb2RlIiwiZXh0cmFRdWVyeVBhcmFtcyIsImV4dHJhVG9rZW5QYXJhbXMiLCJyZXF1ZXN0X3R5cGUiLCJza2lwVXNlckluZm8iLCJzdGF0ZVN0b3JlIiwiaXNDb2RlIiwiX21ldGFkYXRhU2VydmljZSIsInNpZ25pblJlcXVlc3QiLCJjbGllbnRfc2VjcmV0Iiwic2lnbmluU3RhdGUiLCJfc3RhdGVTdG9yZSIsImlkIiwidG9TdG9yYWdlU3RyaW5nIiwicmVhZFNpZ25pblJlc3BvbnNlU3RhdGUiLCJyZW1vdmVTdGF0ZSIsInVzZVF1ZXJ5IiwiZGVsaW1pdGVyIiwicmVzcG9uc2UiLCJzdGF0ZUFwaSIsInJlbW92ZSIsInN0b3JlZFN0YXRlU3RyaW5nIiwiZnJvbVN0b3JhZ2VTdHJpbmciLCJwcm9jZXNzU2lnbmluUmVzcG9uc2UiLCJfcmVmMiIsIl92YWxpZGF0b3IiLCJ2YWxpZGF0ZVNpZ25pblJlc3BvbnNlIiwiY3JlYXRlU2lnbm91dFJlcXVlc3QiLCJfdGhpczMiLCJfcmVmMyIsInBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsInNpZ25vdXRTdGF0ZSIsInJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZSIsInN0YXRlS2V5IiwicHJvY2Vzc1NpZ25vdXRSZXNwb25zZSIsIl90aGlzNCIsIl9yZWY0IiwidmFsaWRhdGVTaWdub3V0UmVzcG9uc2UiLCJjbGVhclN0YWxlU3RhdGUiLCJzdGFsZVN0YXRlQWdlIiwidmFsaWRhdG9yIiwibWV0YWRhdGFTZXJ2aWNlIiwiV2ViU3RvcmFnZVN0YXRlU3RvcmUiLCJSZXNwb25zZVZhbGlkYXRvciIsIkRlZmF1bHRSZXNwb25zZVR5cGUiLCJEZWZhdWx0U2NvcGUiLCJEZWZhdWx0Q2xpZW50QXV0aGVudGljYXRpb24iLCJEZWZhdWx0U3RhbGVTdGF0ZUFnZSIsIkRlZmF1bHRDbG9ja1NrZXdJblNlY29uZHMiLCJfcmVmJHJlc3BvbnNlX3R5cGUiLCJfcmVmJHNjb3BlIiwiX3JlZiRjbGllbnRfYXV0aGVudGljIiwiY2xpZW50X2F1dGhlbnRpY2F0aW9uIiwiX3JlZiRmaWx0ZXJQcm90b2NvbENsIiwiZmlsdGVyUHJvdG9jb2xDbGFpbXMiLCJfcmVmJGxvYWRVc2VySW5mbyIsImxvYWRVc2VySW5mbyIsIl9yZWYkc3RhbGVTdGF0ZUFnZSIsIl9yZWYkY2xvY2tTa2V3IiwiX3JlZiRjbG9ja1NlcnZpY2UiLCJjbG9ja1NlcnZpY2UiLCJfcmVmJHVzZXJJbmZvSnd0SXNzdWUiLCJ1c2VySW5mb0p3dElzc3VlciIsIl9yZWYkbWVyZ2VDbGFpbXMiLCJtZXJnZUNsYWltcyIsIl9yZWYkc3RhdGVTdG9yZSIsIl9yZWYkUmVzcG9uc2VWYWxpZGF0byIsIlJlc3BvbnNlVmFsaWRhdG9yQ3RvciIsIl9yZWYkTWV0YWRhdGFTZXJ2aWNlQyIsIk1ldGFkYXRhU2VydmljZUN0b3IiLCJfcmVmJGV4dHJhUXVlcnlQYXJhbXMiLCJfcmVmJGV4dHJhVG9rZW5QYXJhbXMiLCJfYXV0aG9yaXR5IiwiX21ldGFkYXRhIiwiX21ldGFkYXRhU2VlZCIsIl9zaWduaW5nS2V5cyIsIl9jbGllbnRfc2VjcmV0IiwiX3Jlc3BvbnNlX3R5cGUiLCJfc2NvcGUiLCJfcmVkaXJlY3RfdXJpIiwiX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsIl9jbGllbnRfYXV0aGVudGljYXRpb24iLCJfcHJvbXB0IiwiX2Rpc3BsYXkiLCJfbWF4X2FnZSIsIl91aV9sb2NhbGVzIiwiX2Fjcl92YWx1ZXMiLCJfcmVzb3VyY2UiLCJfcmVzcG9uc2VfbW9kZSIsIl9maWx0ZXJQcm90b2NvbENsYWltcyIsIl9sb2FkVXNlckluZm8iLCJfc3RhbGVTdGF0ZUFnZSIsIl9jbG9ja1NrZXciLCJfY2xvY2tTZXJ2aWNlIiwiX3VzZXJJbmZvSnd0SXNzdWVyIiwiX21lcmdlQ2xhaW1zIiwiX2V4dHJhUXVlcnlQYXJhbXMiLCJfdHlwZW9mIiwiX2V4dHJhVG9rZW5QYXJhbXMiLCJQb3B1cFdpbmRvdyIsIlBvcHVwTmF2aWdhdG9yIiwia2VlcE9wZW4iLCJub3RpZnlPcGVuZXIiLCJVcmxVdGlsaXR5IiwiQ2hlY2tGb3JQb3B1cENsb3NlZEludGVydmFsIiwiX2NoZWNrRm9yUG9wdXBDbG9zZWRUaW1lciIsIl9jaGVja0ZvclBvcHVwQ2xvc2VkIiwiX2lkIiwiZm9jdXMiLCJjbG9zZWQiLCJvcGVuZXIiLCJwYXJzZVVybEZyYWdtZW50IiwiUmVkaXJlY3ROYXZpZ2F0b3IiLCJ1c2VSZXBsYWNlVG9OYXZpZ2F0ZSIsIlVzZXJJbmZvU2VydmljZSIsIlRva2VuQ2xpZW50IiwiVW5zYWZlS2V5cyIsIlByb3RvY29sQ2xhaW1zIiwiVXNlckluZm9TZXJ2aWNlQ3RvciIsImpvc2VVdGlsIiwiVG9rZW5DbGllbnRDdG9yIiwiX3VzZXJJbmZvU2VydmljZSIsIl9qb3NlVXRpbCIsIl90b2tlbkNsaWVudCIsIl9wcm9jZXNzU2lnbmluUGFyYW1zIiwiX3ZhbGlkYXRlVG9rZW5zIiwiX3Byb2Nlc3NDbGFpbXMiLCJub25jZSIsImlkX3Rva2VuIiwiY29kZV92ZXJpZmllciIsImNvZGUiLCJpc09wZW5JZENvbm5lY3QiLCJwcm9maWxlIiwiZ2V0Q2xhaW1zIiwiY2xhaW1zIiwic3ViIiwiY2xhaW1zMSIsImNsYWltczIiLCJyZXN1bHQiLCJ2YWx1ZXMiLCJmb3JFYWNoIiwidHlwZSIsIl9wcm9jZXNzQ29kZSIsIl92YWxpZGF0ZUlkVG9rZW5BbmRBY2Nlc3NUb2tlbiIsIl92YWxpZGF0ZUlkVG9rZW4iLCJleGNoYW5nZUNvZGUiLCJ0b2tlblJlc3BvbnNlIiwiX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXMiLCJjbG9ja1NrZXdJblNlY29uZHMiLCJfdGhpczUiLCJfdmFsaWRhdGVBY2Nlc3NUb2tlbiIsIl9nZXRTaWduaW5nS2V5Rm9ySnd0IiwiX3RoaXM2Iiwia2lkIiwiX2ZpbHRlckJ5QWxnIiwiZmlsdGVyIiwiX2dldFNpZ25pbmdLZXlGb3JKd3RXaXRoU2luZ2xlUmV0cnkiLCJfdGhpczciLCJfdGhpczgiLCJhdF9oYXNoIiwiaGFzaEFsZyIsImhhc2hCaXRzIiwic2hhIiwibGVmdCIsImxlZnRfYjY0dSIsIlNlc3Npb25Nb25pdG9yIiwidXNlck1hbmFnZXIiLCJDaGVja1Nlc3Npb25JRnJhbWVDdG9yIiwiX3VzZXJNYW5hZ2VyIiwiX0NoZWNrU2Vzc2lvbklGcmFtZUN0b3IiLCJldmVudHMiLCJhZGRVc2VyTG9hZGVkIiwiX3N0YXJ0IiwiYWRkVXNlclVubG9hZGVkIiwiX3N0b3AiLCJnZXRVc2VyIiwidXNlciIsIm1vbml0b3JBbm9ueW1vdXNTZXNzaW9uIiwicXVlcnlTZXNzaW9uU3RhdHVzIiwic2Vzc2lvbiIsInRtcFVzZXIiLCJzaWQiLCJjYXRjaCIsImVyciIsIl9zdWIiLCJfc2lkIiwiX2NoZWNrU2Vzc2lvbklGcmFtZSIsIl9jaGVja1Nlc3Npb25JbnRlcnZhbCIsIl9zdG9wQ2hlY2tTZXNzaW9uT25FcnJvciIsInRpbWVySGFuZGxlIiwicmFpc2VFdmVudCIsIl9yYWlzZVVzZXJTZXNzaW9uQ2hhbmdlZCIsIl9yYWlzZVVzZXJTaWduZWRPdXQiLCJfcmFpc2VVc2VyU2lnbmVkSW4iLCJjaGVja1Nlc3Npb25JbnRlcnZhbCIsInN0b3BDaGVja1Nlc3Npb25PbkVycm9yIiwib2lkYyIsImlzT2lkYyIsImFkZFF1ZXJ5UGFyYW0iLCJjb2RlX2NoYWxsZW5nZSIsImlzT0F1dGgiLCJPaWRjU2NvcGUiLCJ0b2tlbl90eXBlIiwiZXhwaXJlc19hdCIsInNjb3BlcyIsInJhbmRvbSIsIl9TdGF0ZSIsIl9ub25jZSIsIl9jb2RlX3ZlcmlmaWVyIiwiX2NvZGVfY2hhbGxlbmdlIiwiX3NraXBVc2VySW5mbyIsImNyZWF0ZWQiLCJzdG9yYWdlU3RyaW5nIiwiU2lsZW50UmVuZXdTZXJ2aWNlIiwiX3Rva2VuRXhwaXJpbmciLCJzaWduaW5TaWxlbnQiLCJfcmFpc2VTaWxlbnRSZW5ld0Vycm9yIiwiX2NyZWF0ZWQiLCJfcmVxdWVzdF90eXBlIiwic3RvcmFnZSIsImFnZSIsImN1dG9mZiIsImdldEFsbEtleXMiLCJwcm9taXNlcyIsIl9sb29wIiwiYWxsIiwiVGltZXJEdXJhdGlvbiIsIl9FdmVudCIsIm5vd0Z1bmMiLCJfbm93RnVuYyIsImV4cGlyYXRpb24iLCJfdGltZXJIYW5kbGUiLCJfZXhwaXJhdGlvbiIsInRpbWVyRHVyYXRpb24iLCJkaWZmIiwiZ3JhbnRfdHlwZSIsImV4Y2hhbmdlUmVmcmVzaFRva2VuIiwicmVmcmVzaF90b2tlbiIsIkFjY2Vzc1Rva2VuVHlwZUhpbnQiLCJSZWZyZXNoVG9rZW5UeXBlSGludCIsIlRva2VuUmV2b2NhdGlvbkNsaWVudCIsIl9YTUxIdHRwUmVxdWVzdEN0b3IiLCJyZXZva2UiLCJyZXF1aXJlZCIsIl9yZXZva2UiLCJ4aHIiLCJsYXN0SW5kZXhPZiIsInJlZ2V4IiwibSIsImNvdW50ZXIiLCJleGVjIiwidmFsIiwicHJvcCIsIlVzZXIiLCJfZ2V0Q2xhaW1zRnJvbUp3dCIsImlzc3VlclByb21pc2UiLCJVc2VyTWFuYWdlclNldHRpbmdzIiwiVXNlck1hbmFnZXJFdmVudHMiLCJVc2VyTWFuYWdlciIsIl9PaWRjQ2xpZW50IiwiU2lsZW50UmVuZXdTZXJ2aWNlQ3RvciIsIlNlc3Npb25Nb25pdG9yQ3RvciIsIlRva2VuUmV2b2NhdGlvbkNsaWVudEN0b3IiLCJfZXZlbnRzIiwiX3NpbGVudFJlbmV3U2VydmljZSIsImF1dG9tYXRpY1NpbGVudFJlbmV3Iiwic3RhcnRTaWxlbnRSZW5ldyIsIm1vbml0b3JTZXNzaW9uIiwiX3Nlc3Npb25Nb25pdG9yIiwiX3Rva2VuUmV2b2NhdGlvbkNsaWVudCIsIl9sb2FkVXNlciIsInJlbW92ZVVzZXIiLCJzdG9yZVVzZXIiLCJzaWduaW5SZWRpcmVjdCIsIm5hdlBhcmFtcyIsIl9zaWduaW5TdGFydCIsIl9yZWRpcmVjdE5hdmlnYXRvciIsInNpZ25pblJlZGlyZWN0Q2FsbGJhY2siLCJfc2lnbmluRW5kIiwic2lnbmluUG9wdXAiLCJwb3B1cF9yZWRpcmVjdF91cmkiLCJfc2lnbmluIiwiX3BvcHVwTmF2aWdhdG9yIiwic2lnbmluUG9wdXBDYWxsYmFjayIsIl9zaWduaW5DYWxsYmFjayIsIl91c2VSZWZyZXNoVG9rZW4iLCJpbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXciLCJ2YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXciLCJjdXJyZW50X3N1YiIsIl9zaWduaW5TaWxlbnRJZnJhbWUiLCJpZFRva2VuVmFsaWRhdGlvbiIsIl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW4iLCJhdXRoX3RpbWUiLCJzaWxlbnRfcmVkaXJlY3RfdXJpIiwiX2lmcmFtZU5hdmlnYXRvciIsInNpZ25pblNpbGVudENhbGxiYWNrIiwic2lnbmluQ2FsbGJhY2siLCJzaWdub3V0Q2FsbGJhY2siLCJzaWdub3V0UmVkaXJlY3RDYWxsYmFjayIsInNpZ25vdXRQb3B1cENhbGxiYWNrIiwiX3RoaXM5IiwicXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUiLCJuYXZSZXNwb25zZSIsInNpZ25pblJlc3BvbnNlIiwibmF2aWdhdG9yIiwiX3RoaXMwIiwibmF2aWdhdG9yUGFyYW1zIiwiX3RoaXMxIiwiX3RoaXMxMCIsInNpZ25vdXRSZWRpcmVjdCIsInBvc3RMb2dvdXRSZWRpcmVjdFVyaSIsIl9zaWdub3V0U3RhcnQiLCJfc2lnbm91dEVuZCIsInNpZ25vdXRQb3B1cCIsInBvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsIl9zaWdub3V0IiwiX3RoaXMxMSIsIl90aGlzMTIiLCJyZXZva2VQcm9taXNlIiwicmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQiLCJfcmV2b2tlSW50ZXJuYWwiLCJzaWdub3V0UmVxdWVzdCIsInNpZ25vdXRSZXNwb25zZSIsInJldm9rZUFjY2Vzc1Rva2VuIiwiX3RoaXMxMyIsInN1Y2Nlc3MiLCJfdGhpczE0IiwiX3Jldm9rZUFjY2Vzc1Rva2VuSW50ZXJuYWwiLCJhdFN1Y2Nlc3MiLCJfcmV2b2tlUmVmcmVzaFRva2VuSW50ZXJuYWwiLCJydFN1Y2Nlc3MiLCJzdG9wU2lsZW50UmVuZXciLCJfdXNlclN0b3JlIiwiX3VzZXJTdG9yZUtleSIsInJlZGlyZWN0TmF2aWdhdG9yIiwicG9wdXBOYXZpZ2F0b3IiLCJpZnJhbWVOYXZpZ2F0b3IiLCJ1c2VyU3RvcmUiLCJjb25jYXQiLCJfQWNjZXNzVG9rZW5FdmVudHMiLCJfdXNlckxvYWRlZCIsIl91c2VyVW5sb2FkZWQiLCJfc2lsZW50UmVuZXdFcnJvciIsIl91c2VyU2lnbmVkSW4iLCJfdXNlclNpZ25lZE91dCIsIl91c2VyU2Vzc2lvbkNoYW5nZWQiLCJyZW1vdmVVc2VyTG9hZGVkIiwicmVtb3ZlVXNlclVubG9hZGVkIiwiYWRkU2lsZW50UmVuZXdFcnJvciIsInJlbW92ZVNpbGVudFJlbmV3RXJyb3IiLCJhZGRVc2VyU2lnbmVkSW4iLCJyZW1vdmVVc2VyU2lnbmVkSW4iLCJhZGRVc2VyU2lnbmVkT3V0IiwicmVtb3ZlVXNlclNpZ25lZE91dCIsImFkZFVzZXJTZXNzaW9uQ2hhbmdlZCIsInJlbW92ZVVzZXJTZXNzaW9uQ2hhbmdlZCIsIkRlZmF1bHRDaGVja1Nlc3Npb25JbnRlcnZhbCIsIl9PaWRjQ2xpZW50U2V0dGluZ3MiLCJfcmVmJGF1dG9tYXRpY1NpbGVudFIiLCJfcmVmJHZhbGlkYXRlU3ViT25TaWwiLCJfcmVmJGluY2x1ZGVJZFRva2VuSW4iLCJfcmVmJG1vbml0b3JTZXNzaW9uIiwiX3JlZiRtb25pdG9yQW5vbnltb3VzIiwiX3JlZiRjaGVja1Nlc3Npb25JbnRlIiwiX3JlZiRzdG9wQ2hlY2tTZXNzaW9uIiwiX3JlZiRyZXZva2VBY2Nlc3NUb2tlIiwiX3JlZiRyZWRpcmVjdE5hdmlnYXRvIiwiX3JlZiRwb3B1cE5hdmlnYXRvciIsIl9yZWYkaWZyYW1lTmF2aWdhdG9yIiwiX3JlZiR1c2VyU3RvcmUiLCJzdG9yZSIsIl9wb3B1cF9yZWRpcmVjdF91cmkiLCJfcG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIiwiX3BvcHVwV2luZG93RmVhdHVyZXMiLCJfcG9wdXBXaW5kb3dUYXJnZXQiLCJfc2lsZW50X3JlZGlyZWN0X3VyaSIsIl9zaWxlbnRSZXF1ZXN0VGltZW91dCIsIl9hdXRvbWF0aWNTaWxlbnRSZW5ldyIsIl92YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXciLCJfaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3IiwiX21vbml0b3JTZXNzaW9uIiwiX21vbml0b3JBbm9ueW1vdXNTZXNzaW9uIiwiX3F1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlIiwiX3Jldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0IiwiX3JlZiRwcmVmaXgiLCJwcmVmaXgiLCJfcmVmJHN0b3JlIiwiX3N0b3JlIiwiX3ByZWZpeCIsImdldENyeXB0byIsIm1zQ3J5cHRvIiwic2VjdXJlVXVpZCIsImdldFJhbmRvbVZhbHVlcyIsIlZlcnNpb24iXSwic291cmNlUm9vdCI6IiJ9