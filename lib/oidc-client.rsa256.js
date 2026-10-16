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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVE7QUFDakM7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixRQUFRO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O1VBQ0E7VUFDQTtVQUNBLEdBQUc7VUFDSDtVQUNBO1VBQ0EsQ0FBQyxJOzs7VUNQRCw4Q0FBOEMsMEQ7OztVQ0E5QztVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTs7QUFFbUM7QUFDYztBQUNnQjtBQUNJO0FBQ0o7QUFDZDtBQUNZO0FBQ0o7QUFDWTtBQUNFO0FBQ1I7QUFDTTtBQUNkO0FBQ2hCO0FBQ0o7QUFFRTtBQUV2QywrREFBZTtFQUNYQSxPQUFPLEVBQVBBLGlEQUFPO0VBQ1AxeEIsR0FBRyxFQUFIQSw0Q0FBRztFQUNIcVksVUFBVSxFQUFWQSwwREFBVTtFQUNWUCxrQkFBa0IsRUFBbEJBLDBFQUFrQjtFQUNsQjZELG9CQUFvQixFQUFwQkEsOEVBQW9CO0VBQ3BCelAsa0JBQWtCLEVBQWxCQSwwRUFBa0I7RUFDbEJpZCxXQUFXLEVBQVhBLDREQUFXO0VBQ1hocEIsaUJBQWlCLEVBQWpCQSx3RUFBaUI7RUFDakIrVixlQUFlLEVBQWZBLG9FQUFlO0VBQ2Y5UCxxQkFBcUIsRUFBckJBLGdGQUFxQjtFQUNyQkwsc0JBQXNCLEVBQXRCQSxrRkFBc0I7RUFDdEJ6RCxrQkFBa0IsRUFBbEJBLDJFQUFrQjtFQUNsQjJsQixxQkFBcUIsRUFBckJBLGlGQUFxQjtFQUNyQjNFLGNBQWMsRUFBZEEsbUVBQWM7RUFDZDdZLE1BQU0sRUFBTkEsbURBQU07RUFDTnFlLElBQUksRUFBSkEsK0NBQUlBO0FBQ1IsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0FjY2Vzc1Rva2VuRXZlbnRzLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0NoZWNrU2Vzc2lvbklGcmFtZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9DbG9ja1NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvQ29yZG92YUlGcmFtZU5hdmlnYXRvci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Db3Jkb3ZhUG9wdXBOYXZpZ2F0b3IuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvQ29yZG92YVBvcHVwV2luZG93LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0Vycm9yUmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvRXZlbnQuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvR2xvYmFsLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0lGcmFtZU5hdmlnYXRvci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9JRnJhbWVXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvSW5NZW1vcnlXZWJTdG9yYWdlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0pvc2VVdGlsLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0pzb25TZXJ2aWNlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0xvZy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9NZXRhZGF0YVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvT2lkY0NsaWVudC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9PaWRjQ2xpZW50U2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvUG9wdXBOYXZpZ2F0b3IuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvUG9wdXBXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvUmVkaXJlY3ROYXZpZ2F0b3IuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvUmVzcG9uc2VWYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvU2Vzc2lvbk1vbml0b3IuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvU2lnbmluUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9TaWduaW5SZXNwb25zZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9TaWduaW5TdGF0ZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9TaWdub3V0UmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9TaWdub3V0UmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvU2lsZW50UmVuZXdTZXJ2aWNlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1N0YXRlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1RpbWVyLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1Rva2VuQ2xpZW50LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1Rva2VuUmV2b2NhdGlvbkNsaWVudC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9VcmxVdGlsaXR5LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1VzZXIuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvVXNlckluZm9TZXJ2aWNlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1VzZXJNYW5hZ2VyLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1VzZXJNYW5hZ2VyRXZlbnRzLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1VzZXJNYW5hZ2VyU2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvV2ViU3RvcmFnZVN0YXRlU3RvcmUuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvcmFuZG9tLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2NvcmUuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2VuYy1iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2VuYy1oZXguanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMzg0LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGE1MTIuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3g2NC1jb3JlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50L2lnbm9yZWR8L2hvbWUvcnVubmVyL3dvcmsvaWRlbnRpdHktbW9kZWwtb2lkYy1jbGllbnQtanMvaWRlbnRpdHktbW9kZWwtb2lkYy1jbGllbnQtanMvbm9kZV9tb2R1bGVzL2NyeXB0by1qc3xjcnlwdG8iLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29pZGMtY2xpZW50L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSAnLi9UaW1lci5qcyc7XG5cbmNvbnN0IERlZmF1bHRBY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IDYwOyAvLyBzZWNvbmRzXG5cbmV4cG9ydCBjbGFzcyBBY2Nlc3NUb2tlbkV2ZW50cyB7XG5cbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lID0gRGVmYXVsdEFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyaW5nVGltZXIgPSBuZXcgVGltZXIoXCJBY2Nlc3MgdG9rZW4gZXhwaXJpbmdcIiksXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlZFRpbWVyID0gbmV3IFRpbWVyKFwiQWNjZXNzIHRva2VuIGV4cGlyZWRcIilcbiAgICB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSBhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZTtcblxuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nID0gYWNjZXNzVG9rZW5FeHBpcmluZ1RpbWVyO1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQgPSBhY2Nlc3NUb2tlbkV4cGlyZWRUaW1lcjtcbiAgICB9XG5cbiAgICBsb2FkKGNvbnRhaW5lcikge1xuICAgICAgICAvLyBvbmx5IHJlZ2lzdGVyIGV2ZW50cyBpZiB0aGVyZSdzIGFuIGFjY2VzcyB0b2tlbiBhbmQgaXQgaGFzIGFuIGV4cGlyYXRpb25cbiAgICAgICAgaWYgKGNvbnRhaW5lci5hY2Nlc3NfdG9rZW4gJiYgY29udGFpbmVyLmV4cGlyZXNfaW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gY29udGFpbmVyLmV4cGlyZXNfaW47XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJBY2Nlc3NUb2tlbkV2ZW50cy5sb2FkOiBhY2Nlc3MgdG9rZW4gcHJlc2VudCwgcmVtYWluaW5nIGR1cmF0aW9uOlwiLCBkdXJhdGlvbik7XG5cbiAgICAgICAgICAgIGlmIChkdXJhdGlvbiA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHJlZ2lzdGVyIGV4cGlyaW5nIGlmIHdlIHN0aWxsIGhhdmUgdGltZVxuICAgICAgICAgICAgICAgIGxldCBleHBpcmluZyA9IGR1cmF0aW9uIC0gdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWU7XG4gICAgICAgICAgICAgICAgaWYgKGV4cGlyaW5nIDw9IDApe1xuICAgICAgICAgICAgICAgICAgICBleHBpcmluZyA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkFjY2Vzc1Rva2VuRXZlbnRzLmxvYWQ6IHJlZ2lzdGVyaW5nIGV4cGlyaW5nIHRpbWVyIGluOlwiLCBleHBpcmluZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZy5pbml0KGV4cGlyaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkFjY2Vzc1Rva2VuRXZlbnRzLmxvYWQ6IGNhbmNlbGluZyBleGlzdGluZyBleHBpcmluZyB0aW1lciBiZWNhc2Ugd2UncmUgcGFzdCBleHBpcmF0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBpdCdzIG5lZ2F0aXZlLCBpdCB3aWxsIHN0aWxsIGZpcmVcbiAgICAgICAgICAgIGxldCBleHBpcmVkID0gZHVyYXRpb24gKyAxO1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiQWNjZXNzVG9rZW5FdmVudHMubG9hZDogcmVnaXN0ZXJpbmcgZXhwaXJlZCB0aW1lciBpbjpcIiwgZXhwaXJlZCk7XG4gICAgICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQuaW5pdChleHBpcmVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcuY2FuY2VsKCk7XG4gICAgICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQuY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxvYWQoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkFjY2Vzc1Rva2VuRXZlbnRzLnVubG9hZDogY2FuY2VsaW5nIGV4aXN0aW5nIGFjY2VzcyB0b2tlbiB0aW1lcnNcIik7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJlZC5jYW5jZWwoKTtcbiAgICB9XG5cbiAgICBhZGRBY2Nlc3NUb2tlbkV4cGlyaW5nKGNiKSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZUFjY2Vzc1Rva2VuRXhwaXJpbmcoY2IpIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZy5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG5cbiAgICBhZGRBY2Nlc3NUb2tlbkV4cGlyZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVBY2Nlc3NUb2tlbkV4cGlyZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuY29uc3QgRGVmYXVsdEludGVydmFsID0gMjAwMDtcblxuZXhwb3J0IGNsYXNzIENoZWNrU2Vzc2lvbklGcmFtZSB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2ssIGNsaWVudF9pZCwgdXJsLCBpbnRlcnZhbCwgc3RvcE9uRXJyb3IgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2NsaWVudF9pZCA9IGNsaWVudF9pZDtcbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IGludGVydmFsIHx8IERlZmF1bHRJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5fc3RvcE9uRXJyb3IgPSBzdG9wT25FcnJvcjtcblxuICAgICAgICB2YXIgaWR4ID0gdXJsLmluZGV4T2YoXCIvXCIsIHVybC5pbmRleE9mKFwiLy9cIikgKyAyKTtcbiAgICAgICAgdGhpcy5fZnJhbWVfb3JpZ2luID0gdXJsLnN1YnN0cigwLCBpZHgpO1xuXG4gICAgICAgIHRoaXMuX2ZyYW1lID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG5cbiAgICAgICAgLy8gc2hvdGd1biBhcHByb2FjaFxuICAgICAgICB0aGlzLl9mcmFtZS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGhpcy5fZnJhbWUuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMuX2ZyYW1lLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5fZnJhbWUud2lkdGggPSAwO1xuICAgICAgICB0aGlzLl9mcmFtZS5oZWlnaHQgPSAwO1xuXG4gICAgICAgIHRoaXMuX2ZyYW1lLnNyYyA9IHVybDtcbiAgICB9XG4gICAgbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9mcmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCA9IHRoaXMuX21lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX21lc3NhZ2UoZSkge1xuICAgICAgICBpZiAoZS5vcmlnaW4gPT09IHRoaXMuX2ZyYW1lX29yaWdpbiAmJlxuICAgICAgICAgICAgZS5zb3VyY2UgPT09IHRoaXMuX2ZyYW1lLmNvbnRlbnRXaW5kb3dcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoZS5kYXRhID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJDaGVja1Nlc3Npb25JRnJhbWU6IGVycm9yIG1lc3NhZ2UgZnJvbSBjaGVjayBzZXNzaW9uIG9wIGlmcmFtZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RvcE9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZS5kYXRhID09PSBcImNoYW5nZWRcIikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNoZWNrU2Vzc2lvbklGcmFtZTogY2hhbmdlZCBtZXNzYWdlIGZyb20gY2hlY2sgc2Vzc2lvbiBvcCBpZnJhbWVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNoZWNrU2Vzc2lvbklGcmFtZTogXCIgKyBlLmRhdGEgKyBcIiBtZXNzYWdlIGZyb20gY2hlY2sgc2Vzc2lvbiBvcCBpZnJhbWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnQoc2Vzc2lvbl9zdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5fc2Vzc2lvbl9zdGF0ZSAhPT0gc2Vzc2lvbl9zdGF0ZSkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiQ2hlY2tTZXNzaW9uSUZyYW1lLnN0YXJ0XCIpO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcblxuICAgICAgICAgICAgdGhpcy5fc2Vzc2lvbl9zdGF0ZSA9IHNlc3Npb25fc3RhdGU7XG5cbiAgICAgICAgICAgIGxldCBzZW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UodGhpcy5fY2xpZW50X2lkICsgXCIgXCIgKyB0aGlzLl9zZXNzaW9uX3N0YXRlLCB0aGlzLl9mcmFtZV9vcmlnaW4pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdHJpZ2dlciBub3dcbiAgICAgICAgICAgIHNlbmQoKTtcblxuICAgICAgICAgICAgLy8gYW5kIHNldHVwIHRpbWVyXG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbChzZW5kLCB0aGlzLl9pbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLl9zZXNzaW9uX3N0YXRlID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5fdGltZXIpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNoZWNrU2Vzc2lvbklGcmFtZS5zdG9wXCIpO1xuXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQ2xvY2tTZXJ2aWNlIHtcbiAgICBnZXRFcG9jaFRpbWUoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoRGF0ZS5ub3coKSAvIDEwMDAgfCAwKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBDb3Jkb3ZhUG9wdXBXaW5kb3cgfSBmcm9tICcuL0NvcmRvdmFQb3B1cFdpbmRvdy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yIHtcblxuICAgIHByZXBhcmUocGFyYW1zKSB7XG4gICAgICAgIHBhcmFtcy5wb3B1cFdpbmRvd0ZlYXR1cmVzID0gJ2hpZGRlbj15ZXMnO1xuICAgICAgICBsZXQgcG9wdXAgPSBuZXcgQ29yZG92YVBvcHVwV2luZG93KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocG9wdXApO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IENvcmRvdmFQb3B1cFdpbmRvdyB9IGZyb20gJy4vQ29yZG92YVBvcHVwV2luZG93LmpzJztcblxuZXhwb3J0IGNsYXNzIENvcmRvdmFQb3B1cE5hdmlnYXRvciB7XG5cbiAgICBwcmVwYXJlKHBhcmFtcykge1xuICAgICAgICBsZXQgcG9wdXAgPSBuZXcgQ29yZG92YVBvcHVwV2luZG93KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocG9wdXApO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuY29uc3QgRGVmYXVsdFBvcHVwRmVhdHVyZXMgPSAnbG9jYXRpb249bm8sdG9vbGJhcj1ubyx6b29tPW5vJztcbmNvbnN0IERlZmF1bHRQb3B1cFRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbmV4cG9ydCBjbGFzcyBDb3Jkb3ZhUG9wdXBXaW5kb3cge1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mZWF0dXJlcyA9IHBhcmFtcy5wb3B1cFdpbmRvd0ZlYXR1cmVzIHx8IERlZmF1bHRQb3B1cEZlYXR1cmVzO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHBhcmFtcy5wb3B1cFdpbmRvd1RhcmdldCB8fCBEZWZhdWx0UG9wdXBUYXJnZXQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlZGlyZWN0X3VyaSA9IHBhcmFtcy5zdGFydFVybDtcbiAgICAgICAgTG9nLmRlYnVnKFwiQ29yZG92YVBvcHVwV2luZG93LmN0b3I6IHJlZGlyZWN0X3VyaTogXCIgKyB0aGlzLnJlZGlyZWN0X3VyaSk7XG4gICAgfVxuXG4gICAgX2lzSW5BcHBCcm93c2VySW5zdGFsbGVkKGNvcmRvdmFNZXRhZGF0YSkge1xuICAgICAgICByZXR1cm4gW1wiY29yZG92YS1wbHVnaW4taW5hcHBicm93c2VyXCIsIFwiY29yZG92YS1wbHVnaW4taW5hcHBicm93c2VyLmluYXBwYnJvd3NlclwiLCBcIm9yZy5hcGFjaGUuY29yZG92YS5pbmFwcGJyb3dzZXJcIl0uc29tZShmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvcmRvdmFNZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShuYW1lKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBuYXZpZ2F0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMgfHwgIXBhcmFtcy51cmwpIHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiTm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY29yZG92YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lcnJvcihcImNvcmRvdmEgaXMgdW5kZWZpbmVkXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBjb3Jkb3ZhTWV0YWRhdGEgPSB3aW5kb3cuY29yZG92YS5yZXF1aXJlKFwiY29yZG92YS9wbHVnaW5fbGlzdFwiKS5tZXRhZGF0YTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0luQXBwQnJvd3Nlckluc3RhbGxlZChjb3Jkb3ZhTWV0YWRhdGEpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lcnJvcihcIkluQXBwQnJvd3NlciBwbHVnaW4gbm90IGZvdW5kXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wb3B1cCA9IGNvcmRvdmEuSW5BcHBCcm93c2VyLm9wZW4ocGFyYW1zLnVybCwgdGhpcy50YXJnZXQsIHRoaXMuZmVhdHVyZXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BvcHVwKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiQ29yZG92YVBvcHVwV2luZG93Lm5hdmlnYXRlOiBwb3B1cCBzdWNjZXNzZnVsbHkgY3JlYXRlZFwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl9leGl0Q2FsbGJhY2tFdmVudCA9IHRoaXMuX2V4aXRDYWxsYmFjay5iaW5kKHRoaXMpOyBcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkU3RhcnRDYWxsYmFja0V2ZW50ID0gdGhpcy5fbG9hZFN0YXJ0Q2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwiZXhpdFwiLCB0aGlzLl9leGl0Q2FsbGJhY2tFdmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RhcnRcIiwgdGhpcy5fbG9hZFN0YXJ0Q2FsbGJhY2tFdmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvcihcIkVycm9yIG9wZW5pbmcgcG9wdXAgd2luZG93XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0IHByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICAgIH1cblxuICAgIF9sb2FkU3RhcnRDYWxsYmFjayhldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudXJsLmluZGV4T2YodGhpcy5yZWRpcmVjdF91cmkpID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWNjZXNzKHsgdXJsOiBldmVudC51cmwgfSk7XG4gICAgICAgIH0gICAgXG4gICAgfVxuICAgIF9leGl0Q2FsbGJhY2sobWVzc2FnZSkge1xuICAgICAgICB0aGlzLl9lcnJvcihtZXNzYWdlKTsgICAgXG4gICAgfVxuICAgIFxuICAgIF9zdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIkNvcmRvdmFQb3B1cFdpbmRvdzogU3VjY2Vzc2Z1bCByZXNwb25zZSBmcm9tIGNvcmRvdmEgcG9wdXAgd2luZG93XCIpO1xuICAgICAgICB0aGlzLl9yZXNvbHZlKGRhdGEpO1xuICAgIH1cbiAgICBfZXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG5cbiAgICAgICAgTG9nLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl9yZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgIH1cblxuICAgIF9jbGVhbnVwKCkge1xuICAgICAgICBpZiAodGhpcy5fcG9wdXApe1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiQ29yZG92YVBvcHVwV2luZG93OiBjbGVhbmluZyB1cCBwb3B1cFwiKTtcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJleGl0XCIsIHRoaXMuX2V4aXRDYWxsYmFja0V2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsIHRoaXMuX2xvYWRTdGFydENhbGxiYWNrRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcG9wdXAgPSBudWxsO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIEVycm9yUmVzcG9uc2UgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3Ioe2Vycm9yLCBlcnJvcl9kZXNjcmlwdGlvbiwgZXJyb3JfdXJpLCBzdGF0ZSwgc2Vzc2lvbl9zdGF0ZX09e31cbiAgICApIHtcbiAgICAgICAgIGlmICghZXJyb3Ipe1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiTm8gZXJyb3IgcGFzc2VkIHRvIEVycm9yUmVzcG9uc2VcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlcnJvclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyKGVycm9yX2Rlc2NyaXB0aW9uIHx8IGVycm9yKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBcIkVycm9yUmVzcG9uc2VcIjtcblxuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuZXJyb3JfZGVzY3JpcHRpb24gPSBlcnJvcl9kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5lcnJvcl91cmkgPSBlcnJvcl91cmk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnNlc3Npb25fc3RhdGUgPSBzZXNzaW9uX3N0YXRlO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIEV2ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IFtdO1xuICAgIH1cblxuICAgIGFkZEhhbmRsZXIoY2IpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goY2IpO1xuICAgIH1cblxuICAgIHJlbW92ZUhhbmRsZXIoY2IpIHtcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMuX2NhbGxiYWNrcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtID09PSBjYik7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmFpc2UoLi4ucGFyYW1zKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkV2ZW50OiBSYWlzaW5nIGV2ZW50OiBcIiArIHRoaXMuX25hbWUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzW2ldKC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5jb25zdCB0aW1lciA9IHtcbiAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24gKGNiLCBkdXJhdGlvbikge1xuICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoY2IsIGR1cmF0aW9uKTtcbiAgICB9LFxuICAgIGNsZWFySW50ZXJ2YWw6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaGFuZGxlKTtcbiAgICB9XG59O1xuXG5sZXQgdGVzdGluZyA9IGZhbHNlO1xubGV0IHJlcXVlc3QgPSBudWxsO1xuXG5leHBvcnQgY2xhc3MgR2xvYmFsIHtcblxuICAgIHN0YXRpYyBfdGVzdGluZygpIHtcbiAgICAgICAgdGVzdGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzZXNzaW9uU3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0WE1MSHR0cFJlcXVlc3QobmV3UmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0ID0gbmV3UmVxdWVzdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IFhNTEh0dHBSZXF1ZXN0KCkge1xuICAgICAgICBpZiAoIXRlc3RpbmcgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0IHx8IFhNTEh0dHBSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB0aW1lcigpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBJRnJhbWVXaW5kb3cgfSBmcm9tICcuL0lGcmFtZVdpbmRvdy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBJRnJhbWVOYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZShwYXJhbXMpIHtcbiAgICAgICAgbGV0IGZyYW1lID0gbmV3IElGcmFtZVdpbmRvdyhwYXJhbXMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZyYW1lKTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayh1cmwpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lTmF2aWdhdG9yLmNhbGxiYWNrXCIpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBJRnJhbWVXaW5kb3cubm90aWZ5UGFyZW50KHVybCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuY29uc3QgRGVmYXVsdFRpbWVvdXQgPSAxMDAwMDtcblxuZXhwb3J0IGNsYXNzIElGcmFtZVdpbmRvdyB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCA9IHRoaXMuX21lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuX2JvdW5kTWVzc2FnZUV2ZW50LCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5fZnJhbWUgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcblxuICAgICAgICAvLyBzaG90Z3VuIGFwcHJvYWNoXG4gICAgICAgIHRoaXMuX2ZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB0aGlzLl9mcmFtZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGhpcy5fZnJhbWUud2lkdGggPSAwO1xuICAgICAgICB0aGlzLl9mcmFtZS5oZWlnaHQgPSAwO1xuXG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2ZyYW1lKTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMgfHwgIXBhcmFtcy51cmwpIHtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiTm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRpbWVvdXQgPSBwYXJhbXMuc2lsZW50UmVxdWVzdFRpbWVvdXQgfHwgRGVmYXVsdFRpbWVvdXQ7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3cubmF2aWdhdGU6IFVzaW5nIHRpbWVvdXQgb2Y6XCIsIHRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCh0aGlzLl90aW1lb3V0LmJpbmQodGhpcyksIHRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUuc3JjID0gcGFyYW1zLnVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0IHByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICAgIH1cblxuICAgIF9zdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdzogU3VjY2Vzc2Z1bCByZXNwb25zZSBmcm9tIGZyYW1lIHdpbmRvd1wiKTtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZShkYXRhKTtcbiAgICB9XG4gICAgX2Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgICAgIExvZy5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fcmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICB9XG5cbiAgICBfY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZyYW1lKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3c6IGNsZWFudXBcIik7XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLl9mcmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kTWVzc2FnZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90aW1lb3V0KCkge1xuICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3cudGltZW91dFwiKTtcbiAgICAgICAgdGhpcy5fZXJyb3IoXCJGcmFtZSB3aW5kb3cgdGltZWQgb3V0XCIpO1xuICAgIH1cblxuICAgIF9tZXNzYWdlKGUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93Lm1lc3NhZ2VcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyICYmXG4gICAgICAgICAgICBlLm9yaWdpbiA9PT0gdGhpcy5fb3JpZ2luICYmXG4gICAgICAgICAgICBlLnNvdXJjZSA9PT0gdGhpcy5fZnJhbWUuY29udGVudFdpbmRvdyAmJlxuICAgICAgICAgICAgKHR5cGVvZiBlLmRhdGEgPT09ICdzdHJpbmcnICYmIChlLmRhdGEuc3RhcnRzV2l0aCgnaHR0cDovLycpIHx8IGUuZGF0YS5zdGFydHNXaXRoKCdodHRwczovLycpKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgdXJsID0gZS5kYXRhO1xuICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1Y2Nlc3MoeyB1cmw6IHVybCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiSW52YWxpZCByZXNwb25zZSBmcm9tIGZyYW1lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IF9vcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdGlmeVBhcmVudCh1cmwpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93Lm5vdGlmeVBhcmVudFwiKTtcbiAgICAgICAgdXJsID0gdXJsIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3cubm90aWZ5UGFyZW50OiBwb3N0aW5nIHVybCBtZXNzYWdlIHRvIHBhcmVudFwiKTtcbiAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UodXJsLCBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3QpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgSW5NZW1vcnlXZWJTdG9yYWdle1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG5cbiAgICBnZXRJdGVtKGtleSkge1xuICAgICAgICBMb2cuZGVidWcoXCJJbk1lbW9yeVdlYlN0b3JhZ2UuZ2V0SXRlbVwiLCBrZXkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtrZXldO1xuICAgIH1cblxuICAgIHNldEl0ZW0oa2V5LCB2YWx1ZSl7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkluTWVtb3J5V2ViU3RvcmFnZS5zZXRJdGVtXCIsIGtleSk7XG4gICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlbW92ZUl0ZW0oa2V5KXtcbiAgICAgICAgTG9nLmRlYnVnKFwiSW5NZW1vcnlXZWJTdG9yYWdlLnJlbW92ZUl0ZW1cIiwga2V5KTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2RhdGFba2V5XTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5fZGF0YSkubGVuZ3RoO1xuICAgIH1cblxuICAgIGtleShpbmRleCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5fZGF0YSlbaW5kZXhdO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbi8vIEpXVCBwYXJzaW5nIGFuZCB2YWxpZGF0aW9uLlxuLy8gLSBTaWduYXR1cmVzIGFyZSB2ZXJpZmllZCB3aXRoIFdlYkNyeXB0byAoY3J5cHRvLnN1YnRsZSk6IFJTL1BTL0VTIDI1Ni8zODQvNTEyLlxuLy8gLSBIYXNoaW5nIChhdF9oYXNoIC8gY19oYXNoIC8gUEtDRSkgdXNlcyBjcnlwdG8tanMuXG4vLyAtIEJhc2U2NCBkZWNvZGluZyB1c2VzIGJhc2U2NC1qcy5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IFNIQTI1NiBmcm9tICdjcnlwdG8tanMvc2hhMjU2LmpzJztcbmltcG9ydCBTSEEzODQgZnJvbSAnY3J5cHRvLWpzL3NoYTM4NC5qcyc7XG5pbXBvcnQgU0hBNTEyIGZyb20gJ2NyeXB0by1qcy9zaGE1MTIuanMnO1xuaW1wb3J0IEhleCBmcm9tICdjcnlwdG8tanMvZW5jLWhleC5qcyc7XG5pbXBvcnQgQmFzZTY0IGZyb20gJ2NyeXB0by1qcy9lbmMtYmFzZTY0LmpzJztcbmltcG9ydCB7IHRvQnl0ZUFycmF5IH0gZnJvbSAnYmFzZTY0LWpzJztcblxuY29uc3QgQWxsb3dlZFNpZ25pbmdBbGdzID0gWydSUzI1NicsICdSUzM4NCcsICdSUzUxMicsICdQUzI1NicsICdQUzM4NCcsICdQUzUxMicsICdFUzI1NicsICdFUzM4NCcsICdFUzUxMiddO1xuXG4vLyBPbmx5IGFzeW1tZXRyaWMgc2lnbmF0dXJlcyBmcm9tIHRoZSBhbGxvd2xpc3QgYXJlIGFjY2VwdGVkLiBcIm5vbmVcIiAodW5zaWduZWQpIGFuZCBIUypcbi8vICh3aGljaCB3b3VsZCB0cmVhdCB0aGUgcHVibGljIGtleSBhcyBhbiBITUFDIHNlY3JldCkgYXJlIHJlamVjdGVkIGV4cGxpY2l0bHksIHdoYXRldmVyXG4vLyB0aGVpciBjYXNlLCBzbyB0aGlzIGRvZXMgbm90IGRlcGVuZCBvbiB0aGUgYWxsb3dsaXN0IGFsb25lLlxuZnVuY3Rpb24gYXNzZXJ0QWxsb3dlZEFsZyhhbGcpIHtcbiAgICBpZiAodHlwZW9mIGFsZyAhPT0gJ3N0cmluZycgfHwgIWFsZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgb3IgaW52YWxpZCBKV1QgYWxnJyk7XG4gICAgfVxuICAgIGlmIChhbGcudG9Mb3dlckNhc2UoKSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zaWduZWQgSldUIChhbGcgXCJub25lXCIpIGlzIG5vdCBhbGxvd2VkJyk7XG4gICAgfVxuICAgIGlmIChBbGxvd2VkU2lnbmluZ0FsZ3MuaW5kZXhPZihhbGcpIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldUIGFsZzogJyArIGFsZyk7XG4gICAgfVxuICAgIHJldHVybiBhbGc7XG59XG5cbmNvbnN0IEhhc2hlcnMgPSB7IHNoYTI1NjogU0hBMjU2LCBzaGEzODQ6IFNIQTM4NCwgc2hhNTEyOiBTSEE1MTIgfTtcblxuZnVuY3Rpb24gYjY0VG9CeXRlcyhzKSB7XG4gICAgcyA9IHMucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIHdoaWxlIChzLmxlbmd0aCAlIDQpIHtcbiAgICAgICAgcyArPSAnPSc7XG4gICAgfVxuICAgIHJldHVybiB0b0J5dGVBcnJheShzKTtcbn1cblxuZnVuY3Rpb24gdXRmOERlY29kZShieXRlcykge1xuICAgIGxldCBlc2NhcGVkID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBlc2NhcGVkICs9ICclJyArICgnMCcgKyBieXRlc1tpXS50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGVkKTtcbn1cblxuZnVuY3Rpb24gYjY0dVRvSnNvbihzKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodXRmOERlY29kZShiNjRUb0J5dGVzKHMpKSk7XG59XG5cbi8vIFRoZSBKV1Mgc2lnbmluZyBpbnB1dCBpcyBiYXNlNjR1cmwgdGV4dCwgaS5lLiBwdXJlIEFTQ0lJXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMocykge1xuICAgIGNvbnN0IG91dCA9IG5ldyBVaW50OEFycmF5KHMubGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb3V0W2ldID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBnZXRTdWJ0bGUoKSB7XG4gICAgY29uc3QgYyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY3J5cHRvKSB8fFxuICAgICAgICAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbFRoaXMuY3J5cHRvKSB8fFxuICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLmNyeXB0byk7XG4gICAgaWYgKCFjIHx8ICFjLnN1YnRsZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkNyeXB0byAoY3J5cHRvLnN1YnRsZSkgaXMgbm90IGF2YWlsYWJsZTsgYSBzZWN1cmUgY29udGV4dCAoaHR0cHMpIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuICAgIHJldHVybiBjLnN1YnRsZTtcbn1cblxuLy8gTWluaW1hbCBERVIgcmVhZGVyOiByZXR1cm5zIHRhZywgY29udGVudCBzdGFydC9lbmQgYW5kIHRoZSBmdWxsIGVsZW1lbnQgZW5kXG5mdW5jdGlvbiByZWFkVGx2KGJ5dGVzLCBvZmZzZXQpIHtcbiAgICBjb25zdCB0YWcgPSBieXRlc1tvZmZzZXRdO1xuICAgIGxldCBsZW4gPSBieXRlc1tvZmZzZXQgKyAxXTtcbiAgICBsZXQgc3RhcnQgPSBvZmZzZXQgKyAyO1xuICAgIGlmIChsZW4gJiAweDgwKSB7XG4gICAgICAgIGNvbnN0IG4gPSBsZW4gJiAweDdmO1xuICAgICAgICBpZiAobiA8IDEgfHwgbiA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgREVSIGxlbmd0aCcpO1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZW4gPSAobGVuICogMjU2KSArIGJ5dGVzW3N0YXJ0ICsgaV07XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgKz0gbjtcbiAgICB9XG4gICAgY29uc3QgZW5kID0gc3RhcnQgKyBsZW47XG4gICAgaWYgKGVuZCA+IGJ5dGVzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RydW5jYXRlZCBERVIgZWxlbWVudCcpO1xuICAgIH1cbiAgICByZXR1cm4geyB0YWcsIHN0YXJ0LCBlbmQgfTtcbn1cblxuLy8gRXh0cmFjdHMgdGhlIERFUiBTdWJqZWN0UHVibGljS2V5SW5mbyBmcm9tIGEgREVSIFguNTA5IGNlcnRpZmljYXRlXG5mdW5jdGlvbiBzcGtpRnJvbUNlcnRpZmljYXRlKGRlcikge1xuICAgIGNvbnN0IGNlcnQgPSByZWFkVGx2KGRlciwgMCk7XG4gICAgaWYgKGNlcnQudGFnICE9PSAweDMwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjZXJ0aWZpY2F0ZScpO1xuICAgIH1cbiAgICBjb25zdCB0YnMgPSByZWFkVGx2KGRlciwgY2VydC5zdGFydCk7XG4gICAgaWYgKHRicy50YWcgIT09IDB4MzApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNlcnRpZmljYXRlJyk7XG4gICAgfVxuICAgIGxldCBwb3MgPSB0YnMuc3RhcnQ7XG4gICAgbGV0IGVsID0gcmVhZFRsdihkZXIsIHBvcyk7XG4gICAgaWYgKGVsLnRhZyA9PT0gMHhhMCkgeyAvLyBbMF0gdmVyc2lvblxuICAgICAgICBwb3MgPSBlbC5lbmQ7XG4gICAgICAgIGVsID0gcmVhZFRsdihkZXIsIHBvcyk7XG4gICAgfVxuICAgIC8vIHNlcmlhbE51bWJlciwgc2lnbmF0dXJlLCBpc3N1ZXIsIHZhbGlkaXR5LCBzdWJqZWN0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgcG9zID0gZWwuZW5kO1xuICAgICAgICBlbCA9IHJlYWRUbHYoZGVyLCBwb3MpO1xuICAgIH1cbiAgICBpZiAoZWwudGFnICE9PSAweDMwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjZXJ0aWZpY2F0ZTogc3ViamVjdFB1YmxpY0tleUluZm8gbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIHJldHVybiBkZXIuc2xpY2UocG9zLCBlbC5lbmQpO1xufVxuXG4vLyBOb3JtYWxpemVzIGEgSldLIGludG8gd2hhdCBXZWJDcnlwdG8gaW1wb3J0S2V5IGFjY2VwdHMuXG4vLyBFeHRyYSBtZW1iZXJzIChhbGcsIHVzZSwga2V5X29wcywga2lkLCB4NXQuLi4pIGFyZSBkcm9wcGVkIGJlY2F1c2UgdGhleSBjYW4gbWFrZSBpbXBvcnRLZXkgcmVqZWN0LlxuZnVuY3Rpb24gcmVzb2x2ZUtleShrZXkpIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGtleSB0eXBlOiAnICsga2V5KTtcbiAgICB9XG4gICAgaWYgKGtleS5rdHkgPT09ICdSU0EnKSB7XG4gICAgICAgIGlmIChrZXkuZSAmJiBrZXkubikge1xuICAgICAgICAgICAgcmV0dXJuIHsga3R5OiAnUlNBJywgZm9ybWF0OiAnandrJywgZGF0YTogeyBrdHk6ICdSU0EnLCBuOiBrZXkubiwgZToga2V5LmUsIGV4dDogdHJ1ZSB9IH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleS54NWMgJiYga2V5Lng1Yy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ1JTQScsIGZvcm1hdDogJ3Nwa2knLCBkYXRhOiBzcGtpRnJvbUNlcnRpZmljYXRlKGI2NFRvQnl0ZXMoa2V5Lng1Y1swXSkpIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSU0Ega2V5IG1pc3Npbmcga2V5IG1hdGVyaWFsJyk7XG4gICAgfVxuICAgIGlmIChrZXkua3R5ID09PSAnRUMnKSB7XG4gICAgICAgIGlmIChrZXkuY3J2ICYmIGtleS54ICYmIGtleS55KSB7XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdFQycsIGNydjoga2V5LmNydiwgZm9ybWF0OiAnandrJywgZGF0YTogeyBrdHk6ICdFQycsIGNydjoga2V5LmNydiwgeDoga2V5LngsIHk6IGtleS55LCBleHQ6IHRydWUgfSB9O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRUMga2V5IG1pc3Npbmcga2V5IG1hdGVyaWFsJyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQga2V5IHR5cGU6ICcgKyBrZXkua3R5KTtcbn1cblxuLy8gTWFwcyBhIEpXUyBhbGcgdG8gV2ViQ3J5cHRvIGltcG9ydC92ZXJpZnkgcGFyYW1ldGVyc1xuZnVuY3Rpb24gYWxnUGFyYW1zKGFsZykge1xuICAgIGNvbnN0IGJpdHMgPSBhbGcuc3Vic3RyKDIpO1xuICAgIGNvbnN0IGhhc2ggPSB7IG5hbWU6ICdTSEEtJyArIGJpdHMgfTtcbiAgICBzd2l0Y2ggKGFsZy5zdWJzdHIoMCwgMikpIHtcbiAgICAgICAgY2FzZSAnUlMnOlxuICAgICAgICAgICAgcmV0dXJuIHsga3R5OiAnUlNBJywgaW1wb3J0QWxnOiB7IG5hbWU6ICdSU0FTU0EtUEtDUzEtdjFfNScsIGhhc2ggfSwgdmVyaWZ5QWxnOiB7IG5hbWU6ICdSU0FTU0EtUEtDUzEtdjFfNScgfSB9O1xuICAgICAgICBjYXNlICdQUyc6XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdSU0EnLCBpbXBvcnRBbGc6IHsgbmFtZTogJ1JTQS1QU1MnLCBoYXNoIH0sIHZlcmlmeUFsZzogeyBuYW1lOiAnUlNBLVBTUycsIHNhbHRMZW5ndGg6IHBhcnNlSW50KGJpdHMsIDEwKSAvIDggfSB9O1xuICAgICAgICBjYXNlICdFUyc6IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnZlID0geyAnMjU2JzogJ1AtMjU2JywgJzM4NCc6ICdQLTM4NCcsICc1MTInOiAnUC01MjEnIH1bYml0c107XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdFQycsIGN1cnZlLCBpbXBvcnRBbGc6IHsgbmFtZTogJ0VDRFNBJywgbmFtZWRDdXJ2ZTogY3VydmUgfSwgdmVyaWZ5QWxnOiB7IG5hbWU6ICdFQ0RTQScsIGhhc2ggfSB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgYWxnOiAnICsgYWxnKTtcbn1cblxuZXhwb3J0IGNsYXNzIEpvc2VVdGlsIHtcblxuICAgIHN0YXRpYyBwYXJzZUp3dChqd3QpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSm9zZVV0aWwucGFyc2VKd3RcIik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IGp3dC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIEpXVCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6IGI2NHVUb0pzb24ocGFydHNbMF0pLFxuICAgICAgICAgICAgICAgIHBheWxvYWQ6IGI2NHVUb0pzb24ocGFydHNbMV0pXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgaXNBbGxvd2VkU2lnbmluZ0FsZyhhbGcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGFzc2VydEFsbG93ZWRBbGcoYWxnKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdmFsaWRhdGVKd3Qoand0LCBrZXksIGlzc3VlciwgYXVkaWVuY2UsIGNsb2NrU2tldywgbm93LCB0aW1lSW5zZW5zaXRpdmUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSm9zZVV0aWwudmFsaWRhdGVKd3RcIik7XG5cbiAgICAgICAgLy8gQ2hlY2sgdGhlIGFsZ29yaXRobSBhbmQgc2lnbmF0dXJlIHByZXNlbmNlIGJlZm9yZSBhbnl0aGluZyBlbHNlLCBzbyBhbiB1bnNpZ25lZFxuICAgICAgICAvLyBvciBkb3duZ3JhZGVkIHRva2VuIGlzIHJlamVjdGVkIHdpdGhvdXQgaXRzIGNsYWltcyBldmVyIGJlaW5nIGNvbnNpZGVyZWRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gdHlwZW9mIGp3dCA9PT0gJ3N0cmluZycgPyBqd3Quc3BsaXQoJy4nKSA6IFtdO1xuICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMyB8fCAhcGFydHNbMl0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pXVCBpcyBub3Qgc2lnbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhbGcgPSBhc3NlcnRBbGxvd2VkQWxnKGI2NHVUb0pzb24ocGFydHNbMF0pLmFsZyk7XG4gICAgICAgICAgICBpZiAoa2V5ICYmIGtleS5hbGcgJiYga2V5LmFsZyAhPT0gYWxnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdKV1QgYWxnICcgKyBhbGcgKyAnIGRvZXMgbm90IG1hdGNoIGtleSBhbGcgJyArIGtleS5hbGcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC52YWxpZGF0ZUp3dDogXCIgKyAoZSAmJiBlLm1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzaWduYXR1cmUgdmFsaWRhdGlvbiBmYWlsZWQ6IFwiICsgKGUgJiYgZS5tZXNzYWdlKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc29sdmVkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzb2x2ZWQgPSByZXNvbHZlS2V5KGtleSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLnZhbGlkYXRlSnd0OiBcIiArIChlICYmIGUubWVzc2FnZSksIGtleSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gSm9zZVV0aWwudmFsaWRhdGVKd3RBdHRyaWJ1dGVzKGp3dCwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3LCBub3csIHRpbWVJbnNlbnNpdGl2ZSkudGhlbihwYXlsb2FkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBKb3NlVXRpbC5fdmVyaWZ5U2lnbmF0dXJlKGp3dCwgcmVzb2x2ZWQpLnRoZW4odmFsaWQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBzaWduYXR1cmUgdmFsaWRhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzaWduYXR1cmUgdmFsaWRhdGlvbiBmYWlsZWRcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICAgICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihlICYmIGUubWVzc2FnZSB8fCBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwic2lnbmF0dXJlIHZhbGlkYXRpb24gZmFpbGVkXCIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX3ZlcmlmeVNpZ25hdHVyZShqd3QsIHJlc29sdmVkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IGp3dC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgLy8gY2hlY2tlZCBhZ2FpbiBoZXJlIHNvIHRoaXMgcGF0aCBpcyBzYWZlIG9uIGl0cyBvd25cbiAgICAgICAgICAgIGNvbnN0IGFsZyA9IGFzc2VydEFsbG93ZWRBbGcoYjY0dVRvSnNvbihwYXJ0c1swXSkuYWxnKTtcbiAgICAgICAgICAgIGlmICghcGFydHNbMl0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pXVCBpcyBub3Qgc2lnbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwID0gYWxnUGFyYW1zKGFsZyk7XG4gICAgICAgICAgICBpZiAocC5rdHkgIT09IHJlc29sdmVkLmt0eSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignS2V5IHR5cGUgJyArIHJlc29sdmVkLmt0eSArICcgZG9lcyBub3QgbWF0Y2ggYWxnICcgKyBhbGcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHAuY3VydmUgJiYgcmVzb2x2ZWQuY3J2ICYmIHAuY3VydmUgIT09IHJlc29sdmVkLmNydikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRUMga2V5IGN1cnZlICcgKyByZXNvbHZlZC5jcnYgKyAnIGRvZXMgbm90IG1hdGNoIGFsZyAnICsgYWxnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN1YnRsZSA9IGdldFN1YnRsZSgpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGFzY2lpVG9CeXRlcyhwYXJ0c1swXSArICcuJyArIHBhcnRzWzFdKTtcbiAgICAgICAgICAgIC8vIEpXUyBFQ0RTQSBzaWduYXR1cmVzIGFyZSByYXcgcnx8cywgd2hpY2ggaXMgdGhlIGZvcm1hdCBXZWJDcnlwdG8gZXhwZWN0c1xuICAgICAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYjY0VG9CeXRlcyhwYXJ0c1syXSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHN1YnRsZS5pbXBvcnRLZXkocmVzb2x2ZWQuZm9ybWF0LCByZXNvbHZlZC5kYXRhLCBwLmltcG9ydEFsZywgZmFsc2UsIFsndmVyaWZ5J10pKVxuICAgICAgICAgICAgICAgIC50aGVuKGNyeXB0b0tleSA9PiBzdWJ0bGUudmVyaWZ5KHAudmVyaWZ5QWxnLCBjcnlwdG9LZXksIHNpZ25hdHVyZSwgZGF0YSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdmFsaWRhdGVKd3RBdHRyaWJ1dGVzKGp3dCwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3LCBub3csIHRpbWVJbnNlbnNpdGl2ZSkge1xuICAgICAgICBpZiAoIWNsb2NrU2tldykge1xuICAgICAgICAgICAgY2xvY2tTa2V3ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbm93KSB7XG4gICAgICAgICAgICBub3cgPSBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJzZWQgPSBKb3NlVXRpbC5wYXJzZUp3dChqd3QpO1xuICAgICAgICBpZiAoIXBhcnNlZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBKV1RcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBwYXJzZWQucGF5bG9hZDtcblxuICAgICAgICBpZiAoIXBheWxvYWQuaXNzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IGlzc3VlciB3YXMgbm90IHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImlzc3VlciB3YXMgbm90IHByb3ZpZGVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5pc3MgIT09IGlzc3Vlcikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBJbnZhbGlkIGlzc3VlciBpbiB0b2tlblwiLCBwYXlsb2FkLmlzcyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBpc3N1ZXIgaW4gdG9rZW46IFwiICsgcGF5bG9hZC5pc3MpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGF5bG9hZC5hdWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogYXVkIHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXVkIHdhcyBub3QgcHJvdmlkZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbGlkQXVkaWVuY2UgPSBwYXlsb2FkLmF1ZCA9PT0gYXVkaWVuY2UgfHwgKEFycmF5LmlzQXJyYXkocGF5bG9hZC5hdWQpICYmIHBheWxvYWQuYXVkLmluZGV4T2YoYXVkaWVuY2UpID49IDApO1xuICAgICAgICBpZiAoIXZhbGlkQXVkaWVuY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogSW52YWxpZCBhdWRpZW5jZSBpbiB0b2tlblwiLCBwYXlsb2FkLmF1ZCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBhdWRpZW5jZSBpbiB0b2tlbjogXCIgKyBwYXlsb2FkLmF1ZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmF6cCAmJiBwYXlsb2FkLmF6cCAhPT0gYXVkaWVuY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogSW52YWxpZCBhenAgaW4gdG9rZW5cIiwgcGF5bG9hZC5henApO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgYXpwIGluIHRva2VuOiBcIiArIHBheWxvYWQuYXpwKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRpbWVJbnNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgY29uc3QgbG93ZXJOb3cgPSBub3cgKyBjbG9ja1NrZXc7XG4gICAgICAgICAgICBjb25zdCB1cHBlck5vdyA9IG5vdyAtIGNsb2NrU2tldztcblxuICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmlhdCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogaWF0IHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImlhdCB3YXMgbm90IHByb3ZpZGVkXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsb3dlck5vdyA8IHBheWxvYWQuaWF0KSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBpYXQgaXMgaW4gdGhlIGZ1dHVyZVwiLCBwYXlsb2FkLmlhdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImlhdCBpcyBpbiB0aGUgZnV0dXJlOiBcIiArIHBheWxvYWQuaWF0KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXlsb2FkLm5iZiAmJiBsb3dlck5vdyA8IHBheWxvYWQubmJmKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBuYmYgaXMgaW4gdGhlIGZ1dHVyZVwiLCBwYXlsb2FkLm5iZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIm5iZiBpcyBpbiB0aGUgZnV0dXJlOiBcIiArIHBheWxvYWQubmJmKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcGF5bG9hZC5leHApIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IGV4cCB3YXMgbm90IHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJleHAgd2FzIG5vdCBwcm92aWRlZFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5leHAgPCB1cHBlck5vdykge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogZXhwIGlzIGluIHRoZSBwYXN0XCIsIHBheWxvYWQuZXhwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiZXhwIGlzIGluIHRoZSBwYXN0OlwiICsgcGF5bG9hZC5leHApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocGF5bG9hZCk7XG4gICAgfVxuXG4gICAgLy8gVVRGLTggaW5wdXQsIGxvd2VyY2FzZSBoZXggb3V0cHV0XG4gICAgc3RhdGljIGhhc2hTdHJpbmcodmFsdWUsIGFsZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaGFzaGVyID0gSGFzaGVyc1tTdHJpbmcoYWxnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCAnJyldO1xuICAgICAgICAgICAgaWYgKCFoYXNoZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGhhc2ggYWxnOiAnICsgYWxnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoYXNoZXIodmFsdWUpLnRvU3RyaW5nKEhleCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBoZXhUb0Jhc2U2NFVybCh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEJhc2U2NC5zdHJpbmdpZnkoSGV4LnBhcnNlKHZhbHVlKSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICdfJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvPSskLywgJycpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBKc29uU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGFkZGl0aW9uYWxDb250ZW50VHlwZXMgPSBudWxsLCBcbiAgICAgICAgWE1MSHR0cFJlcXVlc3RDdG9yID0gR2xvYmFsLlhNTEh0dHBSZXF1ZXN0LCBcbiAgICAgICAgand0SGFuZGxlciA9IG51bGxcbiAgICApIHtcbiAgICAgICAgaWYgKGFkZGl0aW9uYWxDb250ZW50VHlwZXMgJiYgQXJyYXkuaXNBcnJheShhZGRpdGlvbmFsQ29udGVudFR5cGVzKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFR5cGVzID0gYWRkaXRpb25hbENvbnRlbnRUeXBlcy5zbGljZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFR5cGVzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29udGVudFR5cGVzLnB1c2goJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgaWYgKGp3dEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRUeXBlcy5wdXNoKCdhcHBsaWNhdGlvbi9qd3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX1hNTEh0dHBSZXF1ZXN0ID0gWE1MSHR0cFJlcXVlc3RDdG9yO1xuICAgICAgICB0aGlzLl9qd3RIYW5kbGVyID0gand0SGFuZGxlcjtcbiAgICB9XG5cbiAgICBnZXRKc29uKHVybCwgdG9rZW4pIHtcbiAgICAgICAgaWYgKCF1cmwpe1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogTm8gdXJsIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVybFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIkpzb25TZXJ2aWNlLmdldEpzb24sIHVybDogXCIsIHVybCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgdmFyIHJlcSA9IG5ldyB0aGlzLl9YTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybCk7XG5cbiAgICAgICAgICAgIHZhciBhbGxvd2VkQ29udGVudFR5cGVzID0gdGhpcy5fY29udGVudFR5cGVzO1xuICAgICAgICAgICAgdmFyIGp3dEhhbmRsZXIgPSB0aGlzLl9qd3RIYW5kbGVyO1xuXG4gICAgICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogSFRUUCByZXNwb25zZSByZWNlaXZlZCwgc3RhdHVzXCIsIHJlcS5zdGF0dXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50VHlwZSA9IHJlcS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGFsbG93ZWRDb250ZW50VHlwZXMuZmluZChpdGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlLnN0YXJ0c1dpdGgoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSBcImFwcGxpY2F0aW9uL2p3dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgand0SGFuZGxlcihyZXEpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogRXJyb3IgcGFyc2luZyBKU09OIHJlc3BvbnNlXCIsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIkludmFsaWQgcmVzcG9uc2UgQ29udGVudC1UeXBlOiBcIiArIGNvbnRlbnRUeXBlICsgXCIsIGZyb20gVVJMOiBcIiArIHVybCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKHJlcS5zdGF0dXNUZXh0ICsgXCIgKFwiICsgcmVxLnN0YXR1cyArIFwiKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5nZXRKc29uOiBuZXR3b3JrIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogdG9rZW4gcGFzc2VkLCBzZXR0aW5nIEF1dGhvcml6YXRpb24gaGVhZGVyXCIpO1xuICAgICAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcG9zdEZvcm0odXJsLCBwYXlsb2FkLCBiYXNpY0F1dGgpIHtcbiAgICAgICAgaWYgKCF1cmwpe1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IE5vIHVybCBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1cmxcIik7XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJKc29uU2VydmljZS5wb3N0Rm9ybSwgdXJsOiBcIiwgdXJsKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IHRoaXMuX1hNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXEub3BlbignUE9TVCcsIHVybCk7XG5cbiAgICAgICAgICAgIHZhciBhbGxvd2VkQ29udGVudFR5cGVzID0gdGhpcy5fY29udGVudFR5cGVzO1xuXG4gICAgICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IEhUVFAgcmVzcG9uc2UgcmVjZWl2ZWQsIHN0YXR1c1wiLCByZXEuc3RhdHVzKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXEuc3RhdHVzID09PSAyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSByZXEuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBhbGxvd2VkQ29udGVudFR5cGVzLmZpbmQoaXRlbT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZS5zdGFydHNXaXRoKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVxLnJlc3BvbnNlVGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiSW52YWxpZCByZXNwb25zZSBDb250ZW50LVR5cGU6IFwiICsgY29udGVudFR5cGUgKyBcIiwgZnJvbSBVUkw6IFwiICsgdXJsKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxLnN0YXR1cyA9PT0gNDAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0gcmVxLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gYWxsb3dlZENvbnRlbnRUeXBlcy5maW5kKGl0ZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUuc3RhcnRzV2l0aChpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWQgPSBKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZCAmJiBwYXlsb2FkLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5wb3N0Rm9ybTogRXJyb3IgZnJvbSBzZXJ2ZXI6IFwiLCBwYXlsb2FkLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocGF5bG9hZC5lcnJvcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKHJlcS5zdGF0dXNUZXh0ICsgXCIgKFwiICsgcmVxLnN0YXR1cyArIFwiKVwiKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBuZXR3b3JrIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IGJvZHkgPSBcIlwiO1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gcGF5bG9hZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcGF5bG9hZFtrZXldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSArPSBcIiZcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgKz0gXCI9XCI7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXG4gICAgICAgICAgICBpZiAoYmFzaWNBdXRoICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIFwiQmFzaWMgXCIgKyBidG9hKGJhc2ljQXV0aCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXEuc2VuZChib2R5KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxubGV0IG5vcExvZ2dlciA9IHtcbiAgICBkZWJ1Zygpe30sXG4gICAgaW5mbygpe30sXG4gICAgd2Fybigpe30sXG4gICAgZXJyb3IoKXt9XG59O1xuXG5jb25zdCBOT05FID0gMDtcbmNvbnN0IEVSUk9SID0gMTtcbmNvbnN0IFdBUk4gPSAyO1xuY29uc3QgSU5GTyA9IDM7XG5jb25zdCBERUJVRyA9IDQ7XG5cbmxldCBsb2dnZXI7XG5sZXQgbGV2ZWw7XG5cbmV4cG9ydCBjbGFzcyBMb2cge1xuICAgIHN0YXRpYyBnZXQgTk9ORSgpIHtyZXR1cm4gTk9ORX07XG4gICAgc3RhdGljIGdldCBFUlJPUigpIHtyZXR1cm4gRVJST1J9O1xuICAgIHN0YXRpYyBnZXQgV0FSTigpIHtyZXR1cm4gV0FSTn07XG4gICAgc3RhdGljIGdldCBJTkZPKCkge3JldHVybiBJTkZPfTtcbiAgICBzdGF0aWMgZ2V0IERFQlVHKCkge3JldHVybiBERUJVR307XG4gICAgXG4gICAgc3RhdGljIHJlc2V0KCl7XG4gICAgICAgIGxldmVsID0gSU5GTztcbiAgICAgICAgbG9nZ2VyID0gbm9wTG9nZ2VyO1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IGxldmVsKCl7XG4gICAgICAgIHJldHVybiBsZXZlbDtcbiAgICB9XG4gICAgc3RhdGljIHNldCBsZXZlbCh2YWx1ZSl7XG4gICAgICAgIGlmIChOT05FIDw9IHZhbHVlICYmIHZhbHVlIDw9IERFQlVHKXtcbiAgICAgICAgICAgIGxldmVsID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvZyBsZXZlbFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IGxvZ2dlcigpe1xuICAgICAgICByZXR1cm4gbG9nZ2VyO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IGxvZ2dlcih2YWx1ZSl7XG4gICAgICAgIGlmICghdmFsdWUuZGVidWcgJiYgdmFsdWUuaW5mbykge1xuICAgICAgICAgICAgLy8ganVzdCB0byBzdGF5IGJhY2t3YXJkcyBjb21wYXQuIGNhbiByZW1vdmUgaW4gMi4wXG4gICAgICAgICAgICB2YWx1ZS5kZWJ1ZyA9IHZhbHVlLmluZm87XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUuZGVidWcgJiYgdmFsdWUuaW5mbyAmJiB2YWx1ZS53YXJuICYmIHZhbHVlLmVycm9yKXtcbiAgICAgICAgICAgIGxvZ2dlciA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2dnZXJcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGRlYnVnKC4uLmFyZ3Mpe1xuICAgICAgICBpZiAobGV2ZWwgPj0gREVCVUcpe1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGluZm8oLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBJTkZPKXtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHdhcm4oLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBXQVJOKXtcbiAgICAgICAgICAgIGxvZ2dlci53YXJuLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGVycm9yKC4uLmFyZ3Mpe1xuICAgICAgICBpZiAobGV2ZWwgPj0gRVJST1Ipe1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkxvZy5yZXNldCgpO1xuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgSnNvblNlcnZpY2UgfSBmcm9tICcuL0pzb25TZXJ2aWNlLmpzJztcblxuY29uc3QgT2lkY01ldGFkYXRhVXJsUGF0aCA9ICcud2VsbC1rbm93bi9vcGVuaWQtY29uZmlndXJhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBNZXRhZGF0YVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBKc29uU2VydmljZUN0b3IgPSBKc29uU2VydmljZSkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJNZXRhZGF0YVNlcnZpY2U6IE5vIHNldHRpbmdzIHBhc3NlZCB0byBNZXRhZGF0YVNlcnZpY2VcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX2pzb25TZXJ2aWNlID0gbmV3IEpzb25TZXJ2aWNlQ3RvcihbJ2FwcGxpY2F0aW9uL2p3ay1zZXQranNvbiddKTtcbiAgICB9XG5cbiAgICBnZXQgbWV0YWRhdGFVcmwoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbWV0YWRhdGFVcmwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YVVybCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsID0gdGhpcy5fc2V0dGluZ3MubWV0YWRhdGFVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YVVybCA9IHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybCAmJiB0aGlzLl9tZXRhZGF0YVVybC5pbmRleE9mKE9pZGNNZXRhZGF0YVVybFBhdGgpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWV0YWRhdGFVcmxbdGhpcy5fbWV0YWRhdGFVcmwubGVuZ3RoIC0gMV0gIT09ICcvJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gJy8nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsICs9IE9pZGNNZXRhZGF0YVVybFBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhVXJsO1xuICAgIH1cblxuICAgIHJlc2V0U2lnbmluZ0tleXMoKSB7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gdGhpcy5fc2V0dGluZ3MgfHwge31cbiAgICAgICAgdGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMgPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBnZXRNZXRhZGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGE6IFJldHVybmluZyBtZXRhZGF0YSBmcm9tIHNldHRpbmdzXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubWV0YWRhdGFVcmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YTogTm8gYXV0aG9yaXR5IG9yIG1ldGFkYXRhVXJsIGNvbmZpZ3VyZWQgb24gc2V0dGluZ3NcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gYXV0aG9yaXR5IG9yIG1ldGFkYXRhVXJsIGNvbmZpZ3VyZWQgb24gc2V0dGluZ3NcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiTWV0YWRhdGFTZXJ2aWNlLmdldE1ldGFkYXRhOiBnZXR0aW5nIG1ldGFkYXRhIGZyb21cIiwgdGhpcy5tZXRhZGF0YVVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLmdldEpzb24odGhpcy5tZXRhZGF0YVVybClcbiAgICAgICAgICAgIC50aGVuKG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGE6IGpzb24gcmVjZWl2ZWRcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHNlZWQgPSB0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YVNlZWQgfHwge307XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MubWV0YWRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzZWVkLCBtZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SXNzdWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcImlzc3VlclwiKTtcbiAgICB9XG5cbiAgICBnZXRBdXRob3JpemF0aW9uRW5kcG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiYXV0aG9yaXphdGlvbl9lbmRwb2ludFwiKTtcbiAgICB9XG5cbiAgICBnZXRVc2VySW5mb0VuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcInVzZXJpbmZvX2VuZHBvaW50XCIpO1xuICAgIH1cblxuICAgIGdldFRva2VuRW5kcG9pbnQob3B0aW9uYWw9dHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcInRva2VuX2VuZHBvaW50XCIsIG9wdGlvbmFsKTtcbiAgICB9XG5cbiAgICBnZXRDaGVja1Nlc3Npb25JZnJhbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiY2hlY2tfc2Vzc2lvbl9pZnJhbWVcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0RW5kU2Vzc2lvbkVuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcImVuZF9zZXNzaW9uX2VuZHBvaW50XCIsIHRydWUpO1xuICAgIH1cblxuICAgIGdldFJldm9jYXRpb25FbmRwb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJyZXZvY2F0aW9uX2VuZHBvaW50XCIsIHRydWUpO1xuICAgIH1cblxuICAgIGdldEtleXNFbmRwb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJqd2tzX3VyaVwiLCB0cnVlKTtcbiAgICB9XG5cbiAgICBfZ2V0TWV0YWRhdGFQcm9wZXJ0eShuYW1lLCBvcHRpb25hbD1mYWxzZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGFQcm9wZXJ0eSBmb3I6IFwiICsgbmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0YWRhdGEoKS50aGVuKG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5OiBtZXRhZGF0YSByZWNpZXZlZFwiKTtcblxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhW25hbWVdID09PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25hbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cud2FybihcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5OiBNZXRhZGF0YSBkb2VzIG5vdCBjb250YWluIG9wdGlvbmFsIHByb3BlcnR5IFwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGFQcm9wZXJ0eTogTWV0YWRhdGEgZG9lcyBub3QgY29udGFpbiBwcm9wZXJ0eSBcIiArIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRhZGF0YSBkb2VzIG5vdCBjb250YWluIHByb3BlcnR5IFwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFbbmFtZV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFNpZ25pbmdLZXlzKCkge1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5czogUmV0dXJuaW5nIHNpZ25pbmdLZXlzIGZyb20gc2V0dGluZ3NcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3NldHRpbmdzLnNpZ25pbmdLZXlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiandrc191cmlcIikudGhlbihqd2tzX3VyaSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXM6IGp3a3NfdXJpIHJlY2VpdmVkXCIsIGp3a3NfdXJpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLmdldEpzb24oandrc191cmkpLnRoZW4oa2V5U2V0ID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXM6IGtleSBzZXQgcmVjZWl2ZWRcIiwga2V5U2V0KTtcblxuICAgICAgICAgICAgICAgIGlmICgha2V5U2V0LmtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiTWV0YWRhdGFTZXJ2aWNlLmdldFNpZ25pbmdLZXlzOiBNaXNzaW5nIGtleXMgb24ga2V5c2V0XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGtleXMgb24ga2V5c2V0XCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzLnNpZ25pbmdLZXlzID0ga2V5U2V0LmtleXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLnNpZ25pbmdLZXlzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnRTZXR0aW5ncyB9IGZyb20gJy4vT2lkY0NsaWVudFNldHRpbmdzLmpzJztcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL0Vycm9yUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgU2lnbmluUmVxdWVzdCB9IGZyb20gJy4vU2lnbmluUmVxdWVzdC5qcyc7XG5pbXBvcnQgeyBTaWduaW5SZXNwb25zZSB9IGZyb20gJy4vU2lnbmluUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgU2lnbm91dFJlcXVlc3QgfSBmcm9tICcuL1NpZ25vdXRSZXF1ZXN0LmpzJztcbmltcG9ydCB7IFNpZ25vdXRSZXNwb25zZSB9IGZyb20gJy4vU2lnbm91dFJlc3BvbnNlLmpzJztcbmltcG9ydCB7IFNpZ25pblN0YXRlIH0gZnJvbSAnLi9TaWduaW5TdGF0ZS5qcyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vU3RhdGUuanMnO1xuXG5leHBvcnQgY2xhc3MgT2lkY0NsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MgPSB7fSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MgaW5zdGFuY2VvZiBPaWRjQ2xpZW50U2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IG5ldyBPaWRjQ2xpZW50U2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IF9zdGF0ZVN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zdGF0ZVN0b3JlO1xuICAgIH1cbiAgICBnZXQgX3ZhbGlkYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudmFsaWRhdG9yO1xuICAgIH1cbiAgICBnZXQgX21ldGFkYXRhU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MubWV0YWRhdGFTZXJ2aWNlO1xuICAgIH1cblxuICAgIGdldCBzZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzO1xuICAgIH1cbiAgICBnZXQgbWV0YWRhdGFTZXJ2aWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlO1xuICAgIH1cblxuICAgIGNyZWF0ZVNpZ25pblJlcXVlc3Qoe1xuICAgICAgICByZXNwb25zZV90eXBlLCBzY29wZSwgcmVkaXJlY3RfdXJpLFxuICAgICAgICAvLyBkYXRhIHdhcyBtZWFudCB0byBiZSB0aGUgcGxhY2UgYSBjYWxsZXIgY291bGQgaW5kaWNhdGUgdGhlIGRhdGEgdG9cbiAgICAgICAgLy8gaGF2ZSByb3VuZCB0cmlwcGVkLCBidXQgcGVvcGxlIHdlcmUgZ2V0dGluZyBjb25mdXNlZCwgc28gaSBhZGRlZCBzdGF0ZSAoc2luY2UgdGhhdCBtYXRjaGVzIHRoZSBzcGVjKVxuICAgICAgICAvLyBhbmQgc28gbm93IGlmIGRhdGEgaXMgbm90IHBhc3NlZCwgYnV0IHN0YXRlIGlzIHRoZW4gc3RhdGUgd2lsbCBiZSB1c2VkXG4gICAgICAgIGRhdGEsIHN0YXRlLCBwcm9tcHQsIGRpc3BsYXksIG1heF9hZ2UsIHVpX2xvY2FsZXMsIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQsIGFjcl92YWx1ZXMsXG4gICAgICAgIHJlc291cmNlLCByZXF1ZXN0LCByZXF1ZXN0X3VyaSwgcmVzcG9uc2VfbW9kZSwgZXh0cmFRdWVyeVBhcmFtcywgZXh0cmFUb2tlblBhcmFtcywgcmVxdWVzdF90eXBlLCBza2lwVXNlckluZm8gfSA9IHt9LFxuICAgICAgICBzdGF0ZVN0b3JlXG4gICAgKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbmluUmVxdWVzdFwiKTtcblxuICAgICAgICBsZXQgY2xpZW50X2lkID0gdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuICAgICAgICByZXNwb25zZV90eXBlID0gcmVzcG9uc2VfdHlwZSB8fCB0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV90eXBlO1xuICAgICAgICBzY29wZSA9IHNjb3BlIHx8IHRoaXMuX3NldHRpbmdzLnNjb3BlO1xuICAgICAgICByZWRpcmVjdF91cmkgPSByZWRpcmVjdF91cmkgfHwgdGhpcy5fc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xuXG4gICAgICAgIC8vIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQgYXJlbid0IGFsbG93ZWQgb24gX3NldHRpbmdzXG4gICAgICAgIHByb21wdCA9IHByb21wdCB8fCB0aGlzLl9zZXR0aW5ncy5wcm9tcHQ7XG4gICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5IHx8IHRoaXMuX3NldHRpbmdzLmRpc3BsYXk7XG4gICAgICAgIG1heF9hZ2UgPSBtYXhfYWdlIHx8IHRoaXMuX3NldHRpbmdzLm1heF9hZ2U7XG4gICAgICAgIHVpX2xvY2FsZXMgPSB1aV9sb2NhbGVzIHx8IHRoaXMuX3NldHRpbmdzLnVpX2xvY2FsZXM7XG4gICAgICAgIGFjcl92YWx1ZXMgPSBhY3JfdmFsdWVzIHx8IHRoaXMuX3NldHRpbmdzLmFjcl92YWx1ZXM7XG4gICAgICAgIHJlc291cmNlID0gcmVzb3VyY2UgfHwgdGhpcy5fc2V0dGluZ3MucmVzb3VyY2U7XG4gICAgICAgIHJlc3BvbnNlX21vZGUgPSByZXNwb25zZV9tb2RlIHx8IHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX21vZGU7XG4gICAgICAgIGV4dHJhUXVlcnlQYXJhbXMgPSBleHRyYVF1ZXJ5UGFyYW1zIHx8IHRoaXMuX3NldHRpbmdzLmV4dHJhUXVlcnlQYXJhbXM7XG4gICAgICAgIGV4dHJhVG9rZW5QYXJhbXMgPSBleHRyYVRva2VuUGFyYW1zIHx8IHRoaXMuX3NldHRpbmdzLmV4dHJhVG9rZW5QYXJhbXM7XG5cbiAgICAgICAgbGV0IGF1dGhvcml0eSA9IHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eTtcblxuICAgICAgICBpZiAoU2lnbmluUmVxdWVzdC5pc0NvZGUocmVzcG9uc2VfdHlwZSkgJiYgcmVzcG9uc2VfdHlwZSAhPT0gXCJjb2RlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJPcGVuSUQgQ29ubmVjdCBoeWJyaWQgZmxvdyBpcyBub3Qgc3VwcG9ydGVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0QXV0aG9yaXphdGlvbkVuZHBvaW50KCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5jcmVhdGVTaWduaW5SZXF1ZXN0OiBSZWNlaXZlZCBhdXRob3JpemF0aW9uIGVuZHBvaW50XCIsIHVybCk7XG5cbiAgICAgICAgICAgIGxldCBzaWduaW5SZXF1ZXN0ID0gbmV3IFNpZ25pblJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlX3R5cGUsXG4gICAgICAgICAgICAgICAgc2NvcGUsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSB8fCBzdGF0ZSxcbiAgICAgICAgICAgICAgICBhdXRob3JpdHksXG4gICAgICAgICAgICAgICAgcHJvbXB0LCBkaXNwbGF5LCBtYXhfYWdlLCB1aV9sb2NhbGVzLCBpZF90b2tlbl9oaW50LCBsb2dpbl9oaW50LCBhY3JfdmFsdWVzLFxuICAgICAgICAgICAgICAgIHJlc291cmNlLCByZXF1ZXN0LCByZXF1ZXN0X3VyaSwgZXh0cmFRdWVyeVBhcmFtcywgZXh0cmFUb2tlblBhcmFtcywgcmVxdWVzdF90eXBlLCByZXNwb25zZV9tb2RlLFxuICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHRoaXMuX3NldHRpbmdzLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgc2tpcFVzZXJJbmZvXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHNpZ25pblN0YXRlID0gc2lnbmluUmVxdWVzdC5zdGF0ZTtcbiAgICAgICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVN0b3JlLnNldChzaWduaW5TdGF0ZS5pZCwgc2lnbmluU3RhdGUudG9TdG9yYWdlU3RyaW5nKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaWduaW5SZXF1ZXN0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWRTaWduaW5SZXNwb25zZVN0YXRlKHVybCwgc3RhdGVTdG9yZSwgcmVtb3ZlU3RhdGUgPSBmYWxzZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnJlYWRTaWduaW5SZXNwb25zZVN0YXRlXCIpO1xuXG4gICAgICAgIGxldCB1c2VRdWVyeSA9IHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX21vZGUgPT09IFwicXVlcnlcIiB8fCBcbiAgICAgICAgICAgICghdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZSAmJiBTaWduaW5SZXF1ZXN0LmlzQ29kZSh0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV90eXBlKSk7XG4gICAgICAgIGxldCBkZWxpbWl0ZXIgPSB1c2VRdWVyeSA/IFwiP1wiIDogXCIjXCI7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gbmV3IFNpZ25pblJlc3BvbnNlKHVybCwgZGVsaW1pdGVyKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LnJlYWRTaWduaW5SZXNwb25zZVN0YXRlOiBObyBzdGF0ZSBpbiByZXNwb25zZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzdGF0ZSBpbiByZXNwb25zZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZVN0b3JlID0gc3RhdGVTdG9yZSB8fCB0aGlzLl9zdGF0ZVN0b3JlO1xuXG4gICAgICAgIHZhciBzdGF0ZUFwaSA9IHJlbW92ZVN0YXRlID8gc3RhdGVTdG9yZS5yZW1vdmUuYmluZChzdGF0ZVN0b3JlKSA6IHN0YXRlU3RvcmUuZ2V0LmJpbmQoc3RhdGVTdG9yZSk7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlQXBpKHJlc3BvbnNlLnN0YXRlKS50aGVuKHN0b3JlZFN0YXRlU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGlmICghc3RvcmVkU3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LnJlYWRTaWduaW5SZXNwb25zZVN0YXRlOiBObyBtYXRjaGluZyBzdGF0ZSBmb3VuZCBpbiBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1hdGNoaW5nIHN0YXRlIGZvdW5kIGluIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IFNpZ25pblN0YXRlLmZyb21TdG9yYWdlU3RyaW5nKHN0b3JlZFN0YXRlU3RyaW5nKTtcbiAgICAgICAgICAgIHJldHVybiB7c3RhdGUsIHJlc3BvbnNlfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1NpZ25pblJlc3BvbnNlKHVybCwgc3RhdGVTdG9yZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWduaW5SZXNwb25zZVwiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkU2lnbmluUmVzcG9uc2VTdGF0ZSh1cmwsIHN0YXRlU3RvcmUsIHRydWUpLnRoZW4oKHtzdGF0ZSwgcmVzcG9uc2V9KSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWduaW5SZXNwb25zZTogUmVjZWl2ZWQgc3RhdGUgZnJvbSBzdG9yYWdlOyB2YWxpZGF0aW5nIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVNpZ25vdXRSZXF1ZXN0KHtpZF90b2tlbl9oaW50LCBkYXRhLCBzdGF0ZSwgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLCBleHRyYVF1ZXJ5UGFyYW1zLCByZXF1ZXN0X3R5cGUgfSA9IHt9LFxuICAgICAgICBzdGF0ZVN0b3JlXG4gICAgKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbm91dFJlcXVlc3RcIik7XG5cbiAgICAgICAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuX3NldHRpbmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgZXh0cmFRdWVyeVBhcmFtcyA9IGV4dHJhUXVlcnlQYXJhbXMgfHwgdGhpcy5fc2V0dGluZ3MuZXh0cmFRdWVyeVBhcmFtcztcblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldEVuZFNlc3Npb25FbmRwb2ludCgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiT2lkY0NsaWVudC5jcmVhdGVTaWdub3V0UmVxdWVzdDogTm8gZW5kIHNlc3Npb24gZW5kcG9pbnQgdXJsIHJldHVybmVkXCIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGVuZCBzZXNzaW9uIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25vdXRSZXF1ZXN0OiBSZWNlaXZlZCBlbmQgc2Vzc2lvbiBlbmRwb2ludFwiLCB1cmwpO1xuXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBTaWdub3V0UmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIGlkX3Rva2VuX2hpbnQsXG4gICAgICAgICAgICAgICAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEgfHwgc3RhdGUsXG4gICAgICAgICAgICAgICAgZXh0cmFRdWVyeVBhcmFtcyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0X3R5cGVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc2lnbm91dFN0YXRlID0gcmVxdWVzdC5zdGF0ZTtcbiAgICAgICAgICAgIGlmIChzaWdub3V0U3RhdGUpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25vdXRSZXF1ZXN0OiBTaWdub3V0IHJlcXVlc3QgaGFzIHN0YXRlIHRvIHBlcnNpc3RcIik7XG5cbiAgICAgICAgICAgICAgICBzdGF0ZVN0b3JlID0gc3RhdGVTdG9yZSB8fCB0aGlzLl9zdGF0ZVN0b3JlO1xuICAgICAgICAgICAgICAgIHN0YXRlU3RvcmUuc2V0KHNpZ25vdXRTdGF0ZS5pZCwgc2lnbm91dFN0YXRlLnRvU3RvcmFnZVN0cmluZygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZSh1cmwsIHN0YXRlU3RvcmUsIHJlbW92ZVN0YXRlID0gZmFsc2UpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5yZWFkU2lnbm91dFJlc3BvbnNlU3RhdGVcIik7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gbmV3IFNpZ25vdXRSZXNwb25zZSh1cmwpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZTogTm8gc3RhdGUgaW4gcmVzcG9uc2VcIik7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgICAgIExvZy53YXJuKFwiT2lkY0NsaWVudC5yZWFkU2lnbm91dFJlc3BvbnNlU3RhdGU6IFJlc3BvbnNlIHdhcyBlcnJvcjogXCIsIHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7c3RhdGU6IHVuZGVmaW5lZCwgcmVzcG9uc2V9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGF0ZUtleSA9IHJlc3BvbnNlLnN0YXRlO1xuXG4gICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgdmFyIHN0YXRlQXBpID0gcmVtb3ZlU3RhdGUgPyBzdGF0ZVN0b3JlLnJlbW92ZS5iaW5kKHN0YXRlU3RvcmUpIDogc3RhdGVTdG9yZS5nZXQuYmluZChzdGF0ZVN0b3JlKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlQXBpKHN0YXRlS2V5KS50aGVuKHN0b3JlZFN0YXRlU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGlmICghc3RvcmVkU3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZTogTm8gbWF0Y2hpbmcgc3RhdGUgZm91bmQgaW4gc3RvcmFnZVwiKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYXRjaGluZyBzdGF0ZSBmb3VuZCBpbiBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBTdGF0ZS5mcm9tU3RvcmFnZVN0cmluZyhzdG9yZWRTdGF0ZVN0cmluZyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7c3RhdGUsIHJlc3BvbnNlfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1NpZ25vdXRSZXNwb25zZSh1cmwsIHN0YXRlU3RvcmUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5wcm9jZXNzU2lnbm91dFJlc3BvbnNlXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZSh1cmwsIHN0YXRlU3RvcmUsIHRydWUpLnRoZW4oKHtzdGF0ZSwgcmVzcG9uc2V9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWdub3V0UmVzcG9uc2U6IFJlY2VpdmVkIHN0YXRlIGZyb20gc3RvcmFnZTsgdmFsaWRhdGluZyByZXNwb25zZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yLnZhbGlkYXRlU2lnbm91dFJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWdub3V0UmVzcG9uc2U6IE5vIHN0YXRlIGZyb20gc3RvcmFnZTsgc2tpcHBpbmcgdmFsaWRhdGluZyByZXNwb25zZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyU3RhbGVTdGF0ZShzdGF0ZVN0b3JlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY2xlYXJTdGFsZVN0YXRlXCIpO1xuXG4gICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgcmV0dXJuIFN0YXRlLmNsZWFyU3RhbGVTdGF0ZShzdGF0ZVN0b3JlLCB0aGlzLnNldHRpbmdzLnN0YWxlU3RhdGVBZ2UpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IENsb2NrU2VydmljZSB9IGZyb20gJy4vQ2xvY2tTZXJ2aWNlLmpzJztcbmltcG9ydCB7IFdlYlN0b3JhZ2VTdGF0ZVN0b3JlIH0gZnJvbSAnLi9XZWJTdG9yYWdlU3RhdGVTdG9yZS5qcyc7XG5pbXBvcnQgeyBSZXNwb25zZVZhbGlkYXRvciB9IGZyb20gJy4vUmVzcG9uc2VWYWxpZGF0b3IuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuXG5jb25zdCBPaWRjTWV0YWRhdGFVcmxQYXRoID0gJy53ZWxsLWtub3duL29wZW5pZC1jb25maWd1cmF0aW9uJztcblxuY29uc3QgRGVmYXVsdFJlc3BvbnNlVHlwZSA9IFwiaWRfdG9rZW5cIjtcbmNvbnN0IERlZmF1bHRTY29wZSA9IFwib3BlbmlkXCI7XG5jb25zdCBEZWZhdWx0Q2xpZW50QXV0aGVudGljYXRpb24gPSBcImNsaWVudF9zZWNyZXRfcG9zdFwiIC8vIFRoZSBkZWZhdWx0IHZhbHVlIG11c3QgYmUgY2xpZW50X3NlY3JldF9iYXNpYywgYXMgZXhwbGFpbmVkIGluIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI0NsaWVudEF1dGhlbnRpY2F0aW9uXG5jb25zdCBEZWZhdWx0U3RhbGVTdGF0ZUFnZSA9IDYwICogMTU7IC8vIHNlY29uZHNcbmNvbnN0IERlZmF1bHRDbG9ja1NrZXdJblNlY29uZHMgPSA2MCAqIDU7XG5cbmV4cG9ydCBjbGFzcyBPaWRjQ2xpZW50U2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgLy8gbWV0YWRhdGEgcmVsYXRlZFxuICAgICAgICBhdXRob3JpdHksIG1ldGFkYXRhVXJsLCBtZXRhZGF0YSwgc2lnbmluZ0tleXMsIG1ldGFkYXRhU2VlZCxcbiAgICAgICAgLy8gY2xpZW50IHJlbGF0ZWRcbiAgICAgICAgY2xpZW50X2lkLCBjbGllbnRfc2VjcmV0LCByZXNwb25zZV90eXBlID0gRGVmYXVsdFJlc3BvbnNlVHlwZSwgc2NvcGUgPSBEZWZhdWx0U2NvcGUsXG4gICAgICAgIHJlZGlyZWN0X3VyaSwgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLFxuICAgICAgICBjbGllbnRfYXV0aGVudGljYXRpb24gPSBEZWZhdWx0Q2xpZW50QXV0aGVudGljYXRpb24sXG4gICAgICAgIC8vIG9wdGlvbmFsIHByb3RvY29sXG4gICAgICAgIHByb21wdCwgZGlzcGxheSwgbWF4X2FnZSwgdWlfbG9jYWxlcywgYWNyX3ZhbHVlcywgcmVzb3VyY2UsIHJlc3BvbnNlX21vZGUsXG4gICAgICAgIC8vIGJlaGF2aW9yIGZsYWdzXG4gICAgICAgIGZpbHRlclByb3RvY29sQ2xhaW1zID0gdHJ1ZSwgbG9hZFVzZXJJbmZvID0gdHJ1ZSxcbiAgICAgICAgc3RhbGVTdGF0ZUFnZSA9IERlZmF1bHRTdGFsZVN0YXRlQWdlLCBcbiAgICAgICAgY2xvY2tTa2V3ID0gRGVmYXVsdENsb2NrU2tld0luU2Vjb25kcyxcbiAgICAgICAgY2xvY2tTZXJ2aWNlID0gbmV3IENsb2NrU2VydmljZSgpLFxuICAgICAgICB1c2VySW5mb0p3dElzc3VlciA9ICdPUCcsXG4gICAgICAgIG1lcmdlQ2xhaW1zID0gZmFsc2UsXG4gICAgICAgIC8vIG90aGVyIGJlaGF2aW9yXG4gICAgICAgIHN0YXRlU3RvcmUgPSBuZXcgV2ViU3RvcmFnZVN0YXRlU3RvcmUoKSxcbiAgICAgICAgUmVzcG9uc2VWYWxpZGF0b3JDdG9yID0gUmVzcG9uc2VWYWxpZGF0b3IsXG4gICAgICAgIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UsXG4gICAgICAgIC8vIGV4dHJhIHF1ZXJ5IHBhcmFtc1xuICAgICAgICBleHRyYVF1ZXJ5UGFyYW1zID0ge30sXG4gICAgICAgIGV4dHJhVG9rZW5QYXJhbXMgPSB7fVxuICAgIH0gPSB7fSkge1xuXG4gICAgICAgIHRoaXMuX2F1dGhvcml0eSA9IGF1dGhvcml0eTtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgPSBtZXRhZGF0YVVybDtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZWVkID0gbWV0YWRhdGFTZWVkO1xuICAgICAgICB0aGlzLl9zaWduaW5nS2V5cyA9IHNpZ25pbmdLZXlzO1xuXG4gICAgICAgIHRoaXMuX2NsaWVudF9pZCA9IGNsaWVudF9pZDtcbiAgICAgICAgdGhpcy5fY2xpZW50X3NlY3JldCA9IGNsaWVudF9zZWNyZXQ7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlX3R5cGUgPSByZXNwb25zZV90eXBlO1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9yZWRpcmVjdF91cmkgPSByZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSA9IHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uID0gY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuXG4gICAgICAgIHRoaXMuX3Byb21wdCA9IHByb21wdDtcbiAgICAgICAgdGhpcy5fZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgICAgIHRoaXMuX21heF9hZ2UgPSBtYXhfYWdlO1xuICAgICAgICB0aGlzLl91aV9sb2NhbGVzID0gdWlfbG9jYWxlcztcbiAgICAgICAgdGhpcy5fYWNyX3ZhbHVlcyA9IGFjcl92YWx1ZXM7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlID0gcmVzb3VyY2U7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlX21vZGUgPSByZXNwb25zZV9tb2RlO1xuXG4gICAgICAgIHRoaXMuX2ZpbHRlclByb3RvY29sQ2xhaW1zID0gISFmaWx0ZXJQcm90b2NvbENsYWltcztcbiAgICAgICAgdGhpcy5fbG9hZFVzZXJJbmZvID0gISFsb2FkVXNlckluZm87XG4gICAgICAgIHRoaXMuX3N0YWxlU3RhdGVBZ2UgPSBzdGFsZVN0YXRlQWdlO1xuICAgICAgICB0aGlzLl9jbG9ja1NrZXcgPSBjbG9ja1NrZXc7XG4gICAgICAgIHRoaXMuX2Nsb2NrU2VydmljZSA9IGNsb2NrU2VydmljZTtcbiAgICAgICAgdGhpcy5fdXNlckluZm9Kd3RJc3N1ZXIgPSB1c2VySW5mb0p3dElzc3VlcjtcbiAgICAgICAgdGhpcy5fbWVyZ2VDbGFpbXMgPSAhIW1lcmdlQ2xhaW1zO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlO1xuICAgICAgICB0aGlzLl92YWxpZGF0b3IgPSBuZXcgUmVzcG9uc2VWYWxpZGF0b3JDdG9yKHRoaXMpO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzKTtcblxuICAgICAgICB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zID0gdHlwZW9mIGV4dHJhUXVlcnlQYXJhbXMgPT09ICdvYmplY3QnID8gZXh0cmFRdWVyeVBhcmFtcyA6IHt9O1xuICAgICAgICB0aGlzLl9leHRyYVRva2VuUGFyYW1zID0gdHlwZW9mIGV4dHJhVG9rZW5QYXJhbXMgPT09ICdvYmplY3QnID8gZXh0cmFUb2tlblBhcmFtcyA6IHt9O1xuICAgIH1cblxuICAgIC8vIGNsaWVudCBjb25maWdcbiAgICBnZXQgY2xpZW50X2lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50X2lkO1xuICAgIH1cbiAgICBzZXQgY2xpZW50X2lkKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2xpZW50X2lkKSB7XG4gICAgICAgICAgICAvLyBvbmUtdGltZSBzZXQgb25seVxuICAgICAgICAgICAgdGhpcy5fY2xpZW50X2lkID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50U2V0dGluZ3Muc2V0X2NsaWVudF9pZDogY2xpZW50X2lkIGhhcyBhbHJlYWR5IGJlZW4gYXNzaWduZWQuXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGllbnRfaWQgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgY2xpZW50X3NlY3JldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9zZWNyZXQ7XG4gICAgfVxuICAgIGdldCByZXNwb25zZV90eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcG9uc2VfdHlwZTtcbiAgICB9XG4gICAgZ2V0IHNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcGU7XG4gICAgfVxuICAgIGdldCByZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBjbGllbnRfYXV0aGVudGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnRfYXV0aGVudGljYXRpb247XG4gICAgfVxuICAgIFxuXG4gICAgLy8gb3B0aW9uYWwgcHJvdG9jb2wgcGFyYW1zXG4gICAgZ2V0IHByb21wdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21wdDtcbiAgICB9XG4gICAgZ2V0IGRpc3BsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5O1xuICAgIH1cbiAgICBnZXQgbWF4X2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heF9hZ2U7XG4gICAgfVxuICAgIGdldCB1aV9sb2NhbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdWlfbG9jYWxlcztcbiAgICB9XG4gICAgZ2V0IGFjcl92YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3JfdmFsdWVzO1xuICAgIH1cbiAgICBnZXQgcmVzb3VyY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZTtcbiAgICB9XG4gICAgZ2V0IHJlc3BvbnNlX21vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zZV9tb2RlO1xuICAgIH1cblxuXG4gICAgLy8gbWV0YWRhdGFcbiAgICBnZXQgYXV0aG9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0aG9yaXR5O1xuICAgIH1cbiAgICBzZXQgYXV0aG9yaXR5KHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5fYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICAvLyBvbmUtdGltZSBzZXQgb25seVxuICAgICAgICAgICAgdGhpcy5fYXV0aG9yaXR5ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50U2V0dGluZ3Muc2V0X2F1dGhvcml0eTogYXV0aG9yaXR5IGhhcyBhbHJlYWR5IGJlZW4gYXNzaWduZWQuXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdXRob3JpdHkgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbWV0YWRhdGFVcmwoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbWV0YWRhdGFVcmwpIHtcbiAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsID0gdGhpcy5hdXRob3JpdHk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybCAmJiB0aGlzLl9tZXRhZGF0YVVybC5pbmRleE9mKE9pZGNNZXRhZGF0YVVybFBhdGgpIDwgMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybFt0aGlzLl9tZXRhZGF0YVVybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsICs9ICcvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gT2lkY01ldGFkYXRhVXJsUGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVVybDtcbiAgICB9XG5cbiAgICAvLyBzZXR0YWJsZS9jYWNoYWJsZSBtZXRhZGF0YSB2YWx1ZXNcbiAgICBnZXQgbWV0YWRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YTtcbiAgICB9XG4gICAgc2V0IG1ldGFkYXRhKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVNlZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlZWQ7XG4gICAgfVxuICAgIHNldCBtZXRhZGF0YVNlZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZWVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNpZ25pbmdLZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluZ0tleXM7XG4gICAgfVxuICAgIHNldCBzaWduaW5nS2V5cyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zaWduaW5nS2V5cyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGJlaGF2aW9yIGZsYWdzXG4gICAgZ2V0IGZpbHRlclByb3RvY29sQ2xhaW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyUHJvdG9jb2xDbGFpbXM7XG4gICAgfVxuICAgIGdldCBsb2FkVXNlckluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlckluZm87XG4gICAgfVxuICAgIGdldCBzdGFsZVN0YXRlQWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhbGVTdGF0ZUFnZTtcbiAgICB9XG4gICAgZ2V0IGNsb2NrU2tldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb2NrU2tldztcbiAgICB9XG4gICAgZ2V0IHVzZXJJbmZvSnd0SXNzdWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlckluZm9Kd3RJc3N1ZXI7XG4gICAgfVxuICAgIGdldCBtZXJnZUNsYWltcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlQ2xhaW1zO1xuICAgIH1cbiAgICBcbiAgICBnZXQgc3RhdGVTdG9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlU3RvcmU7XG4gICAgfVxuICAgIGdldCB2YWxpZGF0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3I7XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVNlcnZpY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2U7XG4gICAgfVxuXG4gICAgLy8gZXh0cmEgcXVlcnkgcGFyYW1zXG4gICAgZ2V0IGV4dHJhUXVlcnlQYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zO1xuICAgIH1cbiAgICBzZXQgZXh0cmFRdWVyeVBhcmFtcyh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBleHRyYSB0b2tlbiBwYXJhbXNcbiAgICBnZXQgZXh0cmFUb2tlblBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXM7XG4gICAgfVxuICAgIHNldCBleHRyYVRva2VuUGFyYW1zKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKXtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXMgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXMgPSB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdldCB0aGUgdGltZVxuICAgIGdldEVwb2NoVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb2NrU2VydmljZS5nZXRFcG9jaFRpbWUoKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBQb3B1cFdpbmRvdyB9IGZyb20gJy4vUG9wdXBXaW5kb3cuanMnO1xuXG5leHBvcnQgY2xhc3MgUG9wdXBOYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZShwYXJhbXMpIHtcbiAgICAgICAgbGV0IHBvcHVwID0gbmV3IFBvcHVwV2luZG93KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocG9wdXApO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcikge1xuICAgICAgICBMb2cuZGVidWcoXCJQb3B1cE5hdmlnYXRvci5jYWxsYmFja1wiKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUG9wdXBXaW5kb3cubm90aWZ5T3BlbmVyKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuXG5jb25zdCBDaGVja0ZvclBvcHVwQ2xvc2VkSW50ZXJ2YWwgPSA1MDA7XG5jb25zdCBEZWZhdWx0UG9wdXBGZWF0dXJlcyA9ICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vLHdpZHRoPTUwMCxoZWlnaHQ9NTAwLGxlZnQ9MTAwLHRvcD0xMDA7Jztcbi8vY29uc3QgRGVmYXVsdFBvcHVwRmVhdHVyZXMgPSAnbG9jYXRpb249bm8sdG9vbGJhcj1ubyx3aWR0aD01MDAsaGVpZ2h0PTUwMCxsZWZ0PTEwMCx0b3A9MTAwO3Jlc2l6YWJsZT15ZXMnO1xuXG5jb25zdCBEZWZhdWx0UG9wdXBUYXJnZXQgPSBcIl9ibGFua1wiO1xuXG5leHBvcnQgY2xhc3MgUG9wdXBXaW5kb3cge1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHRhcmdldCA9IHBhcmFtcy5wb3B1cFdpbmRvd1RhcmdldCB8fCBEZWZhdWx0UG9wdXBUYXJnZXQ7XG4gICAgICAgIGxldCBmZWF0dXJlcyA9IHBhcmFtcy5wb3B1cFdpbmRvd0ZlYXR1cmVzIHx8IERlZmF1bHRQb3B1cEZlYXR1cmVzO1xuXG4gICAgICAgIHRoaXMuX3BvcHVwID0gd2luZG93Lm9wZW4oJycsIHRhcmdldCwgZmVhdHVyZXMpO1xuICAgICAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93LmN0b3I6IHBvcHVwIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tGb3JQb3B1cENsb3NlZFRpbWVyID0gd2luZG93LnNldEludGVydmFsKHRoaXMuX2NoZWNrRm9yUG9wdXBDbG9zZWQuYmluZCh0aGlzKSwgQ2hlY2tGb3JQb3B1cENsb3NlZEludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb3B1cCkge1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogRXJyb3Igb3BlbmluZyBwb3B1cCB3aW5kb3dcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXBhcmFtcyB8fCAhcGFyYW1zLnVybCkge1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogbm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJObyB1cmwgcHJvdmlkZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogU2V0dGluZyBVUkwgaW4gcG9wdXBcIik7XG5cbiAgICAgICAgICAgIHRoaXMuX2lkID0gcGFyYW1zLmlkO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93W1wicG9wdXBDYWxsYmFja19cIiArIHBhcmFtcy5pZF0gPSB0aGlzLl9jYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAud2luZG93LmxvY2F0aW9uID0gcGFyYW1zLnVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2U7XG4gICAgfVxuXG4gICAgX3N1Y2Nlc3MoZGF0YSkge1xuICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jYWxsYmFjazogU3VjY2Vzc2Z1bCByZXNwb25zZSBmcm9tIHBvcHVwIHdpbmRvd1wiKTtcblxuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUoZGF0YSk7XG4gICAgfVxuICAgIF9lcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIExvZy5lcnJvcihcIlBvcHVwV2luZG93LmVycm9yOiBcIiwgbWVzc2FnZSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuX3JlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKGZhbHNlKTtcbiAgICB9XG5cbiAgICBfY2xlYW51cChrZWVwT3Blbikge1xuICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jbGVhbnVwXCIpO1xuXG4gICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2NoZWNrRm9yUG9wdXBDbG9zZWRUaW1lcik7XG4gICAgICAgIHRoaXMuX2NoZWNrRm9yUG9wdXBDbG9zZWRUaW1lciA9IG51bGw7XG5cbiAgICAgICAgZGVsZXRlIHdpbmRvd1tcInBvcHVwQ2FsbGJhY2tfXCIgKyB0aGlzLl9pZF07XG5cbiAgICAgICAgaWYgKHRoaXMuX3BvcHVwICYmICFrZWVwT3Blbikge1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb3B1cCA9IG51bGw7XG4gICAgfVxuXG4gICAgX2NoZWNrRm9yUG9wdXBDbG9zZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcG9wdXAgfHwgdGhpcy5fcG9wdXAuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIlBvcHVwIHdpbmRvdyBjbG9zZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsbGJhY2sodXJsLCBrZWVwT3Blbikge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKGtlZXBPcGVuKTtcblxuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jYWxsYmFjayBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgdGhpcy5fc3VjY2Vzcyh7IHVybDogdXJsIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUG9wdXBXaW5kb3cuY2FsbGJhY2s6IEludmFsaWQgcmVzcG9uc2UgZnJvbSBwb3B1cFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiSW52YWxpZCByZXNwb25zZSBmcm9tIHBvcHVwXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdGlmeU9wZW5lcih1cmwsIGtlZXBPcGVuLCBkZWxpbWl0ZXIpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcbiAgICAgICAgICAgIHVybCA9IHVybCB8fCB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IFVybFV0aWxpdHkucGFyc2VVcmxGcmFnbWVudCh1cmwsIGRlbGltaXRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFwicG9wdXBDYWxsYmFja19cIiArIGRhdGEuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHdpbmRvdy5vcGVuZXJbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUG9wdXBXaW5kb3cubm90aWZ5T3BlbmVyOiBwYXNzaW5nIHVybCBtZXNzYWdlIHRvIG9wZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVybCwga2VlcE9wZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLndhcm4oXCJQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXI6IG5vIG1hdGNoaW5nIGNhbGxiYWNrIGZvdW5kIG9uIG9wZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLndhcm4oXCJQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXI6IG5vIHN0YXRlIGZvdW5kIGluIHJlc3BvbnNlIHVybFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cud2FybihcIlBvcHVwV2luZG93Lm5vdGlmeU9wZW5lcjogbm8gd2luZG93Lm9wZW5lci4gQ2FuJ3QgY29tcGxldGUgbm90aWZpY2F0aW9uLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0TmF2aWdhdG9yIHtcblxuICAgIHByZXBhcmUoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgfVxuXG4gICAgbmF2aWdhdGUocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMudXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZWRpcmVjdE5hdmlnYXRvci5uYXZpZ2F0ZTogTm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHVybCBwcm92aWRlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnVzZVJlcGxhY2VUb05hdmlnYXRlKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShwYXJhbXMudXJsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHBhcmFtcy51cmw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHVybCgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vTWV0YWRhdGFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IFVzZXJJbmZvU2VydmljZSB9IGZyb20gJy4vVXNlckluZm9TZXJ2aWNlLmpzJztcbmltcG9ydCB7IFRva2VuQ2xpZW50IH0gZnJvbSAnLi9Ub2tlbkNsaWVudC5qcyc7XG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9FcnJvclJlc3BvbnNlLmpzJztcbmltcG9ydCB7IEpvc2VVdGlsIH0gZnJvbSAnLi9Kb3NlVXRpbC5qcyc7XG5cbi8vIEtleXMgdGhhdCBtdXN0IG5ldmVyIGJlIGNvcGllZCBmcm9tIHNlcnZlciByZXNwb25zZXMgb250byBwbGFpbiBvYmplY3RzXG5jb25zdCBVbnNhZmVLZXlzID0gW1wiX19wcm90b19fXCIsIFwiY29uc3RydWN0b3JcIiwgXCJwcm90b3R5cGVcIl07XG5cbmNvbnN0IFByb3RvY29sQ2xhaW1zID0gW1wibm9uY2VcIiwgXCJhdF9oYXNoXCIsIFwiaWF0XCIsIFwibmJmXCIsIFwiZXhwXCIsIFwiYXVkXCIsIFwiaXNzXCIsIFwiY19oYXNoXCJdO1xuXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VWYWxpZGF0b3Ige1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIFxuICAgICAgICBNZXRhZGF0YVNlcnZpY2VDdG9yID0gTWV0YWRhdGFTZXJ2aWNlLFxuICAgICAgICBVc2VySW5mb1NlcnZpY2VDdG9yID0gVXNlckluZm9TZXJ2aWNlLCBcbiAgICAgICAgam9zZVV0aWwgPSBKb3NlVXRpbCxcbiAgICAgICAgVG9rZW5DbGllbnRDdG9yID0gVG9rZW5DbGllbnQpIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuY3RvcjogTm8gc2V0dGluZ3MgcGFzc2VkIHRvIFJlc3BvbnNlVmFsaWRhdG9yXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0dGluZ3NcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX3VzZXJJbmZvU2VydmljZSA9IG5ldyBVc2VySW5mb1NlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fam9zZVV0aWwgPSBqb3NlVXRpbDtcbiAgICAgICAgdGhpcy5fdG9rZW5DbGllbnQgPSBuZXcgVG9rZW5DbGllbnRDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVNpZ25pblJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzU2lnbmluUGFyYW1zKHN0YXRlLCByZXNwb25zZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlOiBzdGF0ZSBwcm9jZXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVUb2tlbnMoc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlOiB0b2tlbnMgdmFsaWRhdGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzQ2xhaW1zKHN0YXRlLCByZXNwb25zZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2U6IGNsYWltcyBwcm9jZXNzZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVNpZ25vdXRSZXNwb25zZShzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHN0YXRlLmlkICE9PSByZXNwb25zZS5zdGF0ZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IudmFsaWRhdGVTaWdub3V0UmVzcG9uc2U6IFN0YXRlIGRvZXMgbm90IG1hdGNoXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlN0YXRlIGRvZXMgbm90IG1hdGNoXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyB0aGF0IHdlIGtub3cgdGhlIHN0YXRlIG1hdGNoZXMsIHRha2UgdGhlIHN0b3JlZCBkYXRhXG4gICAgICAgIC8vIGFuZCBzZXQgaXQgaW50byB0aGUgcmVzcG9uc2Ugc28gY2FsbGVycyBjYW4gZ2V0IHRoZWlyIHN0YXRlXG4gICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGZvciBib3RoIHN1Y2Nlc3MgJiBlcnJvciBvdXRjb21lc1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25vdXRSZXNwb25zZTogc3RhdGUgdmFsaWRhdGVkXCIpO1xuICAgICAgICByZXNwb25zZS5zdGF0ZSA9IHN0YXRlLmRhdGE7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICBMb2cud2FybihcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbm91dFJlc3BvbnNlOiBSZXNwb25zZSB3YXMgZXJyb3JcIiwgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBfcHJvY2Vzc1NpZ25pblBhcmFtcyhzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHN0YXRlLmlkICE9PSByZXNwb25zZS5zdGF0ZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IFN0YXRlIGRvZXMgbm90IG1hdGNoXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlN0YXRlIGRvZXMgbm90IG1hdGNoXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogTm8gY2xpZW50X2lkIG9uIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGNsaWVudF9pZCBvbiBzdGF0ZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN0YXRlLmF1dGhvcml0eSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IE5vIGF1dGhvcml0eSBvbiBzdGF0ZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBhdXRob3JpdHkgb24gc3RhdGVcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcyBhbGxvd3MgdGhlIGF1dGhvcml0eSB0byBiZSBsb2FkZWQgZnJvbSB0aGUgc2lnbmluIHN0YXRlXG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncy5hdXRob3JpdHkgPSBzdGF0ZS5hdXRob3JpdHk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5zdXJlIHdlJ3JlIHVzaW5nIHRoZSBjb3JyZWN0IGF1dGhvcml0eSBpZiB0aGUgYXV0aG9yaXR5IGlzIG5vdCBsb2FkZWQgZnJvbSBzaWduaW4gc3RhdGVcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5ICYmIHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eSAhPT0gc3RhdGUuYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogYXV0aG9yaXR5IG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXV0aG9yaXR5IG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMgYWxsb3dzIHRoZSBjbGllbnRfaWQgdG8gYmUgbG9hZGVkIGZyb20gdGhlIHNpZ25pbiBzdGF0ZVxuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkID0gc3RhdGUuY2xpZW50X2lkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVuc3VyZSB3ZSdyZSB1c2luZyB0aGUgY29ycmVjdCBjbGllbnRfaWQgaWYgdGhlIGNsaWVudF9pZCBpcyBub3QgbG9hZGVkIGZyb20gc2lnbmluIHN0YXRlXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCAmJiB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQgIT09IHN0YXRlLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IGNsaWVudF9pZCBtaXNtYXRjaCBvbiBzZXR0aW5ncyB2cy4gc2lnbmluIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImNsaWVudF9pZCBtaXNtYXRjaCBvbiBzZXR0aW5ncyB2cy4gc2lnbmluIHN0YXRlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyB0aGF0IHdlIGtub3cgdGhlIHN0YXRlIG1hdGNoZXMsIHRha2UgdGhlIHN0b3JlZCBkYXRhXG4gICAgICAgIC8vIGFuZCBzZXQgaXQgaW50byB0aGUgcmVzcG9uc2Ugc28gY2FsbGVycyBjYW4gZ2V0IHRoZWlyIHN0YXRlXG4gICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGZvciBib3RoIHN1Y2Nlc3MgJiBlcnJvciBvdXRjb21lc1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogc3RhdGUgdmFsaWRhdGVkXCIpO1xuICAgICAgICByZXNwb25zZS5zdGF0ZSA9IHN0YXRlLmRhdGE7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICBMb2cud2FybihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBSZXNwb25zZSB3YXMgZXJyb3JcIiwgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUubm9uY2UgJiYgIXJlc3BvbnNlLmlkX3Rva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogRXhwZWN0aW5nIGlkX3Rva2VuIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGlkX3Rva2VuIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUubm9uY2UgJiYgcmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBOb3QgZXhwZWN0aW5nIGlkX3Rva2VuIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgaWRfdG9rZW4gaW4gcmVzcG9uc2VcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmNvZGVfdmVyaWZpZXIgJiYgIXJlc3BvbnNlLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBFeHBlY3RpbmcgY29kZSBpbiByZXNwb25zZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBjb2RlIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUuY29kZV92ZXJpZmllciAmJiByZXNwb25zZS5jb2RlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogTm90IGV4cGVjdGluZyBjb2RlIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgY29kZSBpbiByZXNwb25zZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlc3BvbnNlLnNjb3BlKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGVyZSdzIG5vIHNjb3BlIG9uIHRoZSByZXNwb25zZSwgdGhlbiBhc3N1bWUgYWxsIHNjb3BlcyBncmFudGVkIChwZXItc3BlYykgYW5kIGNvcHkgb3ZlciBzY29wZXMgZnJvbSBvcmlnaW5hbCByZXF1ZXN0XG4gICAgICAgICAgICByZXNwb25zZS5zY29wZSA9IHN0YXRlLnNjb3BlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuXG4gICAgX3Byb2Nlc3NDbGFpbXMoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5pc09wZW5JZENvbm5lY3QpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiByZXNwb25zZSBpcyBPSURDLCBwcm9jZXNzaW5nIGNsYWltc1wiKTtcblxuICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZSA9IHRoaXMuX2ZpbHRlclByb3RvY29sQ2xhaW1zKHJlc3BvbnNlLnByb2ZpbGUpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdGUuc2tpcFVzZXJJbmZvICE9PSB0cnVlICYmIHRoaXMuX3NldHRpbmdzLmxvYWRVc2VySW5mbyAmJiByZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogbG9hZGluZyB1c2VyIGluZm9cIik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlckluZm9TZXJ2aWNlLmdldENsYWltcyhyZXNwb25zZS5hY2Nlc3NfdG9rZW4pLnRoZW4oY2xhaW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDbGFpbXM6IHVzZXIgaW5mbyBjbGFpbXMgcmVjZWl2ZWQgZnJvbSB1c2VyIGluZm8gZW5kcG9pbnRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYWltcy5zdWIgIT09IHJlc3BvbnNlLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogc3ViIGZyb20gdXNlciBpbmZvIGVuZHBvaW50IGRvZXMgbm90IG1hdGNoIHN1YiBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzdWIgZnJvbSB1c2VyIGluZm8gZW5kcG9pbnQgZG9lcyBub3QgbWF0Y2ggc3ViIGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnByb2ZpbGUgPSB0aGlzLl9tZXJnZUNsYWltcyhyZXNwb25zZS5wcm9maWxlLCBjbGFpbXMpO1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogdXNlciBpbmZvIGNsYWltcyByZWNlaXZlZCwgdXBkYXRlZCBwcm9maWxlOlwiLCByZXNwb25zZS5wcm9maWxlKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogbm90IGxvYWRpbmcgdXNlciBpbmZvXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDbGFpbXM6IHJlc3BvbnNlIGlzIG5vdCBPSURDLCBub3QgcHJvY2Vzc2luZyBjbGFpbXNcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBfbWVyZ2VDbGFpbXMoY2xhaW1zMSwgY2xhaW1zMikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgY2xhaW1zMSk7XG5cbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBjbGFpbXMyKSB7XG4gICAgICAgICAgICBpZiAoVW5zYWZlS2V5cy5pbmRleE9mKG5hbWUpID49IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBjbGFpbXMyW25hbWVdO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHRbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0W25hbWVdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0W25hbWVdLmluZGV4T2YodmFsdWUpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdFtuYW1lXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdGhpcy5fc2V0dGluZ3MubWVyZ2VDbGFpbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtuYW1lXSA9IHRoaXMuX21lcmdlQ2xhaW1zKHJlc3VsdFtuYW1lXSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gW3Jlc3VsdFtuYW1lXSwgdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBfZmlsdGVyUHJvdG9jb2xDbGFpbXMoY2xhaW1zKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJQcm90b2NvbENsYWltcywgaW5jb21pbmcgY2xhaW1zOlwiLCBjbGFpbXMpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBjbGFpbXMpO1xuXG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5fZmlsdGVyUHJvdG9jb2xDbGFpbXMpIHtcbiAgICAgICAgICAgIFByb3RvY29sQ2xhaW1zLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlc3VsdFt0eXBlXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyUHJvdG9jb2xDbGFpbXM6IHByb3RvY29sIGNsYWltcyBmaWx0ZXJlZFwiLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlclByb3RvY29sQ2xhaW1zOiBwcm90b2NvbCBjbGFpbXMgbm90IGZpbHRlcmVkXCIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIF92YWxpZGF0ZVRva2VucyhzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZVRva2VuczogVmFsaWRhdGluZyBjb2RlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NDb2RlKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVUb2tlbnM6IFZhbGlkYXRpbmcgaWRfdG9rZW4gYW5kIGFjY2Vzc190b2tlblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVJZFRva2VuQW5kQWNjZXNzVG9rZW4oc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlVG9rZW5zOiBWYWxpZGF0aW5nIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlSWRUb2tlbihzdGF0ZSwgcmVzcG9uc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlVG9rZW5zOiBObyBjb2RlIHRvIHByb2Nlc3Mgb3IgaWRfdG9rZW4gdG8gdmFsaWRhdGVcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIF9wcm9jZXNzQ29kZShzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBjbGllbnRfaWQ6IHN0YXRlLmNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHN0YXRlLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICBjb2RlIDogcmVzcG9uc2UuY29kZSxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogc3RhdGUucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgY29kZV92ZXJpZmllcjogc3RhdGUuY29kZV92ZXJpZmllclxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdGF0ZS5leHRyYVRva2VuUGFyYW1zICYmIHR5cGVvZihzdGF0ZS5leHRyYVRva2VuUGFyYW1zKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVxdWVzdCwgc3RhdGUuZXh0cmFUb2tlblBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlbkNsaWVudC5leGNoYW5nZUNvZGUocmVxdWVzdCkudGhlbih0b2tlblJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gdG9rZW5SZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmIChVbnNhZmVLZXlzLmluZGV4T2Yoa2V5KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Vba2V5XSA9IHRva2VuUmVzcG9uc2Vba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5pZF90b2tlbikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ29kZTogdG9rZW4gcmVzcG9uc2Ugc3VjY2Vzc2Z1bCwgcHJvY2Vzc2luZyBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVJZFRva2VuQXR0cmlidXRlcyhzdGF0ZSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDb2RlOiB0b2tlbiByZXNwb25zZSBzdWNjZXNzZnVsLCByZXR1cm5pbmcgcmVzcG9uc2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXMoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0SXNzdWVyKCkudGhlbihpc3N1ZXIgPT4ge1xuXG4gICAgICAgICAgICBsZXQgYXVkaWVuY2UgPSBzdGF0ZS5jbGllbnRfaWQ7XG4gICAgICAgICAgICBsZXQgY2xvY2tTa2V3SW5TZWNvbmRzID0gdGhpcy5fc2V0dGluZ3MuY2xvY2tTa2V3O1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXM6IFZhbGlkYWluZyBKV1QgYXR0cmlidXRlczsgdXNpbmcgY2xvY2sgc2tldyAoaW4gc2Vjb25kcykgb2Y6IFwiLCBjbG9ja1NrZXdJblNlY29uZHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MuZ2V0RXBvY2hUaW1lKCkudGhlbihub3cgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb3NlVXRpbC52YWxpZGF0ZUp3dEF0dHJpYnV0ZXMocmVzcG9uc2UuaWRfdG9rZW4sIGlzc3VlciwgYXVkaWVuY2UsIGNsb2NrU2tld0luU2Vjb25kcywgbm93KS50aGVuKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUubm9uY2UgJiYgc3RhdGUubm9uY2UgIT09IHBheWxvYWQubm9uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzOiBJbnZhbGlkIG5vbmNlIGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgbm9uY2UgaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGF5bG9hZC5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzOiBObyBzdWIgcHJlc2VudCBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzdWIgcHJlc2VudCBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZSA9IHBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVJZFRva2VuQW5kQWNjZXNzVG9rZW4oc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUlkVG9rZW4oc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUFjY2Vzc1Rva2VuKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2dldFNpZ25pbmdLZXlGb3JKd3Qoand0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXMoKS50aGVuKGtleXMgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2lkID0gand0LmhlYWRlci5raWQ7XG4gICAgICAgICAgICBpZiAoIWtleXMpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBObyBzaWduaW5nIGtleXMgZnJvbSBtZXRhZGF0YVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gc2lnbmluZyBrZXlzIGZyb20gbWV0YWRhdGFcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBSZWNlaXZlZCBzaWduaW5nIGtleXNcIik7XG4gICAgICAgICAgICBsZXQga2V5O1xuICAgICAgICAgICAgaWYgKCFraWQpIHtcbiAgICAgICAgICAgICAgICBrZXlzID0gdGhpcy5fZmlsdGVyQnlBbGcoa2V5cywgand0LmhlYWRlci5hbGcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBObyBraWQgZm91bmQgaW4gaWRfdG9rZW4gYW5kIG1vcmUgdGhhbiBvbmUga2V5IGZvdW5kIGluIG1ldGFkYXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8ga2lkIGZvdW5kIGluIGlkX3Rva2VuIGFuZCBtb3JlIHRoYW4gb25lIGtleSBmb3VuZCBpbiBtZXRhZGF0YVwiKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8ga2lkIGlzIG1hbmRhdG9yeSBvbmx5IHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIGtleXMgaW4gdGhlIHJlZmVyZW5jZWQgSldLIFNldCBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNTaWduaW5nXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBrZXlzLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5LmtpZCA9PT0ga2lkO1xuICAgICAgICAgICAgICAgIH0pWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZ2V0U2lnbmluZ0tleUZvckp3dFdpdGhTaW5nbGVSZXRyeShqd3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNpZ25pbmdLZXlGb3JKd3Qoand0KS50aGVuKGtleSA9PiB7XG4gICAgICAgICAgICAvLyBSZWZyZXNoaW5nIHNpZ25pbmdLZXlzIGlmIG5vIHN1aXRhYmxlIHZlcmlmaWNhdGlvbiBrZXkgaXMgcHJlc2VudCBmb3IgZ2l2ZW4gand0IGhlYWRlci5cbiAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRvIHVuZGVmaW5lZCwgdG8gdHJpZ2dlciBuZXR3b3JrIGNhbGwgdG8gandrc191cmkuXG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLnJlc2V0U2lnbmluZ0tleXMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U2lnbmluZ0tleUZvckp3dChqd3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZUlkVG9rZW4oc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghc3RhdGUubm9uY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIG5vbmNlIG9uIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIG5vbmNlIG9uIHN0YXRlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBqd3QgPSB0aGlzLl9qb3NlVXRpbC5wYXJzZUp3dChyZXNwb25zZS5pZF90b2tlbik7XG4gICAgICAgIGlmICghand0IHx8ICFqd3QuaGVhZGVyIHx8ICFqd3QucGF5bG9hZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIsIGp3dCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5ub25jZSAhPT0gand0LnBheWxvYWQubm9uY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IEludmFsaWQgbm9uY2UgaW4gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBub25jZSBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldElzc3VlcigpLnRoZW4oaXNzdWVyID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IFJlY2VpdmVkIGlzc3VlclwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTaWduaW5nS2V5Rm9ySnd0V2l0aFNpbmdsZVJldHJ5KGp3dCkudGhlbihrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIGtleSBtYXRjaGluZyBraWQgb3IgYWxnIGZvdW5kIGluIHNpZ25pbmcga2V5c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGtleSBtYXRjaGluZyBraWQgb3IgYWxnIGZvdW5kIGluIHNpZ25pbmcga2V5c1wiKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGF1ZGllbmNlID0gc3RhdGUuY2xpZW50X2lkO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNsb2NrU2tld0luU2Vjb25kcyA9IHRoaXMuX3NldHRpbmdzLmNsb2NrU2tldztcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBWYWxpZGFpbmcgSldUOyB1c2luZyBjbG9jayBza2V3IChpbiBzZWNvbmRzKSBvZjogXCIsIGNsb2NrU2tld0luU2Vjb25kcyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fam9zZVV0aWwudmFsaWRhdGVKd3QocmVzcG9uc2UuaWRfdG9rZW4sIGtleSwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3SW5TZWNvbmRzKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IEpXVCB2YWxpZGF0aW9uIHN1Y2Nlc3NmdWxcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFqd3QucGF5bG9hZC5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIHN1YiBwcmVzZW50IGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHN1YiBwcmVzZW50IGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnByb2ZpbGUgPSBqd3QucGF5bG9hZDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2ZpbHRlckJ5QWxnKGtleXMsIGFsZyl7XG4gICAgICAgIGlmICghSm9zZVV0aWwuaXNBbGxvd2VkU2lnbmluZ0FsZyhhbGcpKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyQnlBbGc6IGFsZyBub3QgYWxsb3dlZDogXCIsIGFsZyk7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGt0eSA9IG51bGw7XG4gICAgICAgIGlmIChhbGcuc3RhcnRzV2l0aChcIlJTXCIpKSB7XG4gICAgICAgICAgICBrdHkgPSBcIlJTQVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsZy5zdGFydHNXaXRoKFwiUFNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiUlNBXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJFU1wiKSkge1xuICAgICAgICAgICAga3R5ID0gXCJFQ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlckJ5QWxnOiBhbGcgbm90IHN1cHBvcnRlZDogXCIsIGFsZyk7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyQnlBbGc6IExvb2tpbmcgZm9yIGtleXMgdGhhdCBtYXRjaCBrdHk6IFwiLCBrdHkpO1xuXG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtleS5rdHkgPT09IGt0eTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlckJ5QWxnOiBOdW1iZXIgb2Yga2V5cyB0aGF0IG1hdGNoIGt0eTogXCIsIGt0eSwga2V5cy5sZW5ndGgpO1xuXG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZUFjY2Vzc1Rva2VuKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UucHJvZmlsZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IE5vIHByb2ZpbGUgbG9hZGVkIGZyb20gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gcHJvZmlsZSBsb2FkZWQgZnJvbSBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlc3BvbnNlLnByb2ZpbGUuYXRfaGFzaCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IE5vIGF0X2hhc2ggaW4gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gYXRfaGFzaCBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlc3BvbnNlLmlkX3Rva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogTm8gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGp3dCA9IHRoaXMuX2pvc2VVdGlsLnBhcnNlSnd0KHJlc3BvbnNlLmlkX3Rva2VuKTtcbiAgICAgICAgaWYgKCFqd3QgfHwgIWp3dC5oZWFkZXIpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBGYWlsZWQgdG8gcGFyc2UgaWRfdG9rZW5cIiwgand0KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc2hBbGcgPSBqd3QuaGVhZGVyLmFsZztcbiAgICAgICAgaWYgKCFoYXNoQWxnIHx8IGhhc2hBbGcubGVuZ3RoICE9PSA1KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogVW5zdXBwb3J0ZWQgYWxnOlwiLCBoYXNoQWxnKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBhbGc6IFwiICsgaGFzaEFsZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc2hCaXRzID0gaGFzaEFsZy5zdWJzdHIoMiwgMyk7XG4gICAgICAgIGlmICghaGFzaEJpdHMpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBVbnN1cHBvcnRlZCBhbGc6XCIsIGhhc2hBbGcsIGhhc2hCaXRzKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBhbGc6IFwiICsgaGFzaEFsZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFzaEJpdHMgPSBwYXJzZUludChoYXNoQml0cyk7XG4gICAgICAgIGlmIChoYXNoQml0cyAhPT0gMjU2ICYmIGhhc2hCaXRzICE9PSAzODQgJiYgaGFzaEJpdHMgIT09IDUxMikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IFVuc3VwcG9ydGVkIGFsZzpcIiwgaGFzaEFsZywgaGFzaEJpdHMpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIGFsZzogXCIgKyBoYXNoQWxnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hhID0gXCJzaGFcIiArIGhhc2hCaXRzO1xuICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2pvc2VVdGlsLmhhc2hTdHJpbmcocmVzcG9uc2UuYWNjZXNzX3Rva2VuLCBzaGEpO1xuICAgICAgICBpZiAoIWhhc2gpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBhY2Nlc3NfdG9rZW4gaGFzaCBmYWlsZWQ6XCIsIHNoYSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHZhbGlkYXRlIGF0X2hhc2hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlZnQgPSBoYXNoLnN1YnN0cigwLCBoYXNoLmxlbmd0aCAvIDIpO1xuICAgICAgICB2YXIgbGVmdF9iNjR1ID0gdGhpcy5fam9zZVV0aWwuaGV4VG9CYXNlNjRVcmwobGVmdCk7XG4gICAgICAgIGlmIChsZWZ0X2I2NHUgIT09IHJlc3BvbnNlLnByb2ZpbGUuYXRfaGFzaCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IEZhaWxlZCB0byB2YWxpZGF0ZSBhdF9oYXNoXCIsIGxlZnRfYjY0dSwgcmVzcG9uc2UucHJvZmlsZS5hdF9oYXNoKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gdmFsaWRhdGUgYXRfaGFzaFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogc3VjY2Vzc1wiKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBDaGVja1Nlc3Npb25JRnJhbWUgfSBmcm9tICcuL0NoZWNrU2Vzc2lvbklGcmFtZS5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTZXNzaW9uTW9uaXRvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1c2VyTWFuYWdlciwgQ2hlY2tTZXNzaW9uSUZyYW1lQ3RvciA9IENoZWNrU2Vzc2lvbklGcmFtZSwgdGltZXIgPSBHbG9iYWwudGltZXIpIHtcbiAgICAgICAgaWYgKCF1c2VyTWFuYWdlcikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2Vzc2lvbk1vbml0b3IuY3RvcjogTm8gdXNlciBtYW5hZ2VyIHBhc3NlZCB0byBTZXNzaW9uTW9uaXRvclwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXJNYW5hZ2VyXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIgPSB1c2VyTWFuYWdlcjtcbiAgICAgICAgdGhpcy5fQ2hlY2tTZXNzaW9uSUZyYW1lQ3RvciA9IENoZWNrU2Vzc2lvbklGcmFtZUN0b3I7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gdGltZXI7XG5cbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLmFkZFVzZXJMb2FkZWQodGhpcy5fc3RhcnQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5hZGRVc2VyVW5sb2FkZWQodGhpcy5fc3RvcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5fdXNlck1hbmFnZXIuZ2V0VXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAvLyBkb2luZyB0aGlzIG1hbnVhbGx5IGhlcmUgc2luY2UgY2FsbGluZyBnZXRVc2VyIFxuICAgICAgICAgICAgLy8gZG9lc24ndCB0cmlnZ2VyIGxvYWQgZXZlbnQuXG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0KHVzZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2V0dGluZ3MubW9uaXRvckFub255bW91c1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXMoKS50aGVuKHNlc3Npb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wVXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25fc3RhdGUgOiBzZXNzaW9uLnNlc3Npb25fc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uc3ViICYmIHNlc3Npb24uc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBVc2VyLnByb2ZpbGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViOiBzZXNzaW9uLnN1YixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWQ6IHNlc3Npb24uc2lkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0KHRtcFVzZXIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhdGNoIHRvIHN1cHByZXNzIGVycm9ycyBzaW5jZSB3ZSdyZSBpbiBhIGN0b3JcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiU2Vzc2lvbk1vbml0b3IgY3RvcjogZXJyb3IgZnJvbSBxdWVyeVNlc3Npb25TdGF0dXM6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIC8vIGNhdGNoIHRvIHN1cHByZXNzIGVycm9ycyBzaW5jZSB3ZSdyZSBpbiBhIGN0b3JcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yIGN0b3I6IGVycm9yIGZyb20gZ2V0VXNlcjpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZ2V0IF9zZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJNYW5hZ2VyLnNldHRpbmdzO1xuICAgIH1cbiAgICBnZXQgX21ldGFkYXRhU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJNYW5hZ2VyLm1ldGFkYXRhU2VydmljZTtcbiAgICB9XG4gICAgZ2V0IF9jbGllbnRfaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgfVxuICAgIGdldCBfY2hlY2tTZXNzaW9uSW50ZXJ2YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5jaGVja1Nlc3Npb25JbnRlcnZhbDtcbiAgICB9XG4gICAgZ2V0IF9zdG9wQ2hlY2tTZXNzaW9uT25FcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLnN0b3BDaGVja1Nlc3Npb25PbkVycm9yO1xuICAgIH1cblxuICAgIF9zdGFydCh1c2VyKSB7XG4gICAgICAgIGxldCBzZXNzaW9uX3N0YXRlID0gdXNlci5zZXNzaW9uX3N0YXRlO1xuXG4gICAgICAgIGlmIChzZXNzaW9uX3N0YXRlKSB7XG4gICAgICAgICAgICBpZiAodXNlci5wcm9maWxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViID0gdXNlci5wcm9maWxlLnN1YjtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaWQgPSB1c2VyLnByb2ZpbGUuc2lkO1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogc2Vzc2lvbl9zdGF0ZTpcIiwgc2Vzc2lvbl9zdGF0ZSwgXCIsIHN1YjpcIiwgdGhpcy5fc3ViKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX3N0YXJ0OiBzZXNzaW9uX3N0YXRlOlwiLCBzZXNzaW9uX3N0YXRlLCBcIiwgYW5vbnltb3VzIHVzZXJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldENoZWNrU2Vzc2lvbklmcmFtZSgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX3N0YXJ0OiBJbml0aWFsaXppbmcgY2hlY2sgc2Vzc2lvbiBpZnJhbWVcIilcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaWVudF9pZCA9IHRoaXMuX2NsaWVudF9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IHRoaXMuX2NoZWNrU2Vzc2lvbkludGVydmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0b3BPbkVycm9yID0gdGhpcy5fc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3I7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZSA9IG5ldyB0aGlzLl9DaGVja1Nlc3Npb25JRnJhbWVDdG9yKHRoaXMuX2NhbGxiYWNrLmJpbmQodGhpcyksIGNsaWVudF9pZCwgdXJsLCBpbnRlcnZhbCwgc3RvcE9uRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUuc3RhcnQoc2Vzc2lvbl9zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy53YXJuKFwiU2Vzc2lvbk1vbml0b3IuX3N0YXJ0OiBObyBjaGVjayBzZXNzaW9uIGlmcmFtZSBmb3VuZCBpbiB0aGUgbWV0YWRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gbm9uLXByb21pc2UgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiU2Vzc2lvbk1vbml0b3IuX3N0YXJ0OiBFcnJvciBmcm9tIGdldENoZWNrU2Vzc2lvbklmcmFtZTpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lLnN0YXJ0KHNlc3Npb25fc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3N0b3AoKSB7XG4gICAgICAgIHRoaXMuX3N1YiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fc2lkID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9zdG9wXCIpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lLnN0b3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5tb25pdG9yQW5vbnltb3VzU2Vzc2lvbikge1xuICAgICAgICAgICAgLy8gdXNpbmcgYSB0aW1lciB0byBkZWxheSByZS1pbml0aWFsaXphdGlvbiB0byBhdm9pZCByYWNlIGNvbmRpdGlvbnMgZHVyaW5nIHNpZ25vdXRcbiAgICAgICAgICAgIGxldCB0aW1lckhhbmRsZSA9IHRoaXMuX3RpbWVyLnNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXIuY2xlYXJJbnRlcnZhbCh0aW1lckhhbmRsZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXMoKS50aGVuKHNlc3Npb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wVXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25fc3RhdGUgOiBzZXNzaW9uLnNlc3Npb25fc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uc3ViICYmIHNlc3Npb24uc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBVc2VyLnByb2ZpbGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViOiBzZXNzaW9uLnN1YixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWQ6IHNlc3Npb24uc2lkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0KHRtcFVzZXIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhdGNoIHRvIHN1cHByZXNzIGVycm9ycyBzaW5jZSB3ZSdyZSBpbiBhIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yOiBlcnJvciBmcm9tIHF1ZXJ5U2Vzc2lvblN0YXR1czpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzKCkudGhlbihzZXNzaW9uID0+IHtcbiAgICAgICAgICAgIHZhciByYWlzZUV2ZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5zdWIgPT09IHRoaXMuX3N1Yikge1xuICAgICAgICAgICAgICAgICAgICByYWlzZUV2ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZS5zdGFydChzZXNzaW9uLnNlc3Npb25fc3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLnNpZCA9PT0gdGhpcy5fc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IFNhbWUgc3ViIHN0aWxsIGxvZ2dlZCBpbiBhdCBPUCwgcmVzdGFydGluZyBjaGVjayBzZXNzaW9uIGlmcmFtZTsgc2Vzc2lvbl9zdGF0ZTpcIiwgc2Vzc2lvbi5zZXNzaW9uX3N0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogU2FtZSBzdWIgc3RpbGwgbG9nZ2VkIGluIGF0IE9QLCBzZXNzaW9uIHN0YXRlIGhhcyBjaGFuZ2VkLCByZXN0YXJ0aW5nIGNoZWNrIHNlc3Npb24gaWZyYW1lOyBzZXNzaW9uX3N0YXRlOlwiLCBzZXNzaW9uLnNlc3Npb25fc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLl9yYWlzZVVzZXJTZXNzaW9uQ2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IERpZmZlcmVudCBzdWJqZWN0IHNpZ25lZCBpbnRvIE9QOlwiLCBzZXNzaW9uLnN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBTdWJqZWN0IG5vIGxvbmdlciBzaWduZWQgaW50byBPUFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJhaXNlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOyByYWlzaW5nIHNpZ25lZCBvdXQgZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkT3V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IFNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazsgcmFpc2luZyBzaWduZWQgaW4gZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkSW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3ViKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBFcnJvciBjYWxsaW5nIHF1ZXJ5Q3VycmVudFNpZ25pblNlc3Npb247IHJhaXNpbmcgc2lnbmVkIG91dCBldmVudFwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLl9yYWlzZVVzZXJTaWduZWRPdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5pbXBvcnQgeyBTaWduaW5TdGF0ZSB9IGZyb20gJy4vU2lnbmluU3RhdGUuanMnO1xuXG5leHBvcnQgY2xhc3MgU2lnbmluUmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICAvLyBtYW5kYXRvcnlcbiAgICAgICAgdXJsLCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaSwgcmVzcG9uc2VfdHlwZSwgc2NvcGUsIGF1dGhvcml0eSxcbiAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgZGF0YSwgcHJvbXB0LCBkaXNwbGF5LCBtYXhfYWdlLCB1aV9sb2NhbGVzLCBpZF90b2tlbl9oaW50LCBsb2dpbl9oaW50LCBhY3JfdmFsdWVzLCByZXNvdXJjZSwgcmVzcG9uc2VfbW9kZSxcbiAgICAgICAgcmVxdWVzdCwgcmVxdWVzdF91cmksIGV4dHJhUXVlcnlQYXJhbXMsIHJlcXVlc3RfdHlwZSwgY2xpZW50X3NlY3JldCwgZXh0cmFUb2tlblBhcmFtcywgc2tpcFVzZXJJbmZvXG4gICAgfSkge1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbmluUmVxdWVzdC5jdG9yOiBObyB1cmwgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXJsXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIGNsaWVudF9pZCBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGllbnRfaWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZWRpcmVjdF91cmkpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gcmVkaXJlY3RfdXJpIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInJlZGlyZWN0X3VyaVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gcmVzcG9uc2VfdHlwZSBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZXNwb25zZV90eXBlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gc2NvcGUgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2NvcGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhdXRob3JpdHkpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gYXV0aG9yaXR5IHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImF1dGhvcml0eVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvaWRjID0gU2lnbmluUmVxdWVzdC5pc09pZGMocmVzcG9uc2VfdHlwZSk7XG4gICAgICAgIGxldCBjb2RlID0gU2lnbmluUmVxdWVzdC5pc0NvZGUocmVzcG9uc2VfdHlwZSk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZV9tb2RlKSB7XG4gICAgICAgICAgICByZXNwb25zZV9tb2RlID0gU2lnbmluUmVxdWVzdC5pc0NvZGUocmVzcG9uc2VfdHlwZSkgPyBcInF1ZXJ5XCIgOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBTaWduaW5TdGF0ZSh7IG5vbmNlOiBvaWRjLCBcbiAgICAgICAgICAgIGRhdGEsIGNsaWVudF9pZCwgYXV0aG9yaXR5LCByZWRpcmVjdF91cmksIFxuICAgICAgICAgICAgY29kZV92ZXJpZmllcjogY29kZSwgXG4gICAgICAgICAgICByZXF1ZXN0X3R5cGUsIHJlc3BvbnNlX21vZGUsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0LCBzY29wZSwgZXh0cmFUb2tlblBhcmFtcywgc2tpcFVzZXJJbmZvIH0pO1xuXG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwiY2xpZW50X2lkXCIsIGNsaWVudF9pZCk7XG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwicmVkaXJlY3RfdXJpXCIsIHJlZGlyZWN0X3VyaSk7XG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwicmVzcG9uc2VfdHlwZVwiLCByZXNwb25zZV90eXBlKTtcbiAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJzY29wZVwiLCBzY29wZSk7XG5cbiAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJzdGF0ZVwiLCB0aGlzLnN0YXRlLmlkKTtcbiAgICAgICAgaWYgKG9pZGMpIHtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwibm9uY2VcIiwgdGhpcy5zdGF0ZS5ub25jZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwiY29kZV9jaGFsbGVuZ2VcIiwgdGhpcy5zdGF0ZS5jb2RlX2NoYWxsZW5nZSk7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcImNvZGVfY2hhbGxlbmdlX21ldGhvZFwiLCBcIlMyNTZcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3B0aW9uYWwgPSB7IHByb21wdCwgZGlzcGxheSwgbWF4X2FnZSwgdWlfbG9jYWxlcywgaWRfdG9rZW5faGludCwgbG9naW5faGludCwgYWNyX3ZhbHVlcywgcmVzb3VyY2UsIHJlcXVlc3QsIHJlcXVlc3RfdXJpLCByZXNwb25zZV9tb2RlIH07XG4gICAgICAgIGZvcihsZXQga2V5IGluIG9wdGlvbmFsKXtcbiAgICAgICAgICAgIGlmIChvcHRpb25hbFtrZXldKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwga2V5LCBvcHRpb25hbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQga2V5IGluIGV4dHJhUXVlcnlQYXJhbXMpe1xuICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwga2V5LCBleHRyYVF1ZXJ5UGFyYW1zW2tleV0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNPaWRjKHJlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3BvbnNlX3R5cGUuc3BsaXQoL1xccysvZykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtID09PSBcImlkX3Rva2VuXCI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gISEocmVzdWx0WzBdKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNPQXV0aChyZXNwb25zZV90eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZXNwb25zZV90eXBlLnNwbGl0KC9cXHMrL2cpLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gXCJ0b2tlblwiO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICEhKHJlc3VsdFswXSk7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBpc0NvZGUocmVzcG9uc2VfdHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVzcG9uc2VfdHlwZS5zcGxpdCgvXFxzKy9nKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09IFwiY29kZVwiO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICEhKHJlc3VsdFswXSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5cbmNvbnN0IE9pZGNTY29wZSA9IFwib3BlbmlkXCI7XG5cbmV4cG9ydCBjbGFzcyBTaWduaW5SZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IodXJsLCBkZWxpbWl0ZXIgPSBcIiNcIikge1xuXG4gICAgICAgIHZhciB2YWx1ZXMgPSBVcmxVdGlsaXR5LnBhcnNlVXJsRnJhZ21lbnQodXJsLCBkZWxpbWl0ZXIpO1xuXG4gICAgICAgIHRoaXMuZXJyb3IgPSB2YWx1ZXMuZXJyb3I7XG4gICAgICAgIHRoaXMuZXJyb3JfZGVzY3JpcHRpb24gPSB2YWx1ZXMuZXJyb3JfZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZXJyb3JfdXJpID0gdmFsdWVzLmVycm9yX3VyaTtcblxuICAgICAgICB0aGlzLmNvZGUgPSB2YWx1ZXMuY29kZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHZhbHVlcy5zdGF0ZTtcbiAgICAgICAgdGhpcy5pZF90b2tlbiA9IHZhbHVlcy5pZF90b2tlbjtcbiAgICAgICAgdGhpcy5zZXNzaW9uX3N0YXRlID0gdmFsdWVzLnNlc3Npb25fc3RhdGU7XG4gICAgICAgIHRoaXMuYWNjZXNzX3Rva2VuID0gdmFsdWVzLmFjY2Vzc190b2tlbjtcbiAgICAgICAgdGhpcy50b2tlbl90eXBlID0gdmFsdWVzLnRva2VuX3R5cGU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSB2YWx1ZXMuc2NvcGU7XG4gICAgICAgIHRoaXMucHJvZmlsZSA9IHVuZGVmaW5lZDsgLy8gd2lsbCBiZSBzZXQgZnJvbSBSZXNwb25zZVZhbGlkYXRvclxuXG4gICAgICAgIHRoaXMuZXhwaXJlc19pbiA9IHZhbHVlcy5leHBpcmVzX2luO1xuICAgIH1cblxuICAgIGdldCBleHBpcmVzX2luKCkge1xuICAgICAgICBpZiAodGhpcy5leHBpcmVzX2F0KSB7XG4gICAgICAgICAgICBsZXQgbm93ID0gcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwaXJlc19hdCAtIG5vdztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBzZXQgZXhwaXJlc19pbih2YWx1ZSl7XG4gICAgICAgIGxldCBleHBpcmVzX2luID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICBpZiAodHlwZW9mIGV4cGlyZXNfaW4gPT09ICdudW1iZXInICYmIGV4cGlyZXNfaW4gPiAwKSB7XG4gICAgICAgICAgICBsZXQgbm93ID0gcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgdGhpcy5leHBpcmVzX2F0ID0gbm93ICsgZXhwaXJlc19pbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBleHBpcmVkKCkge1xuICAgICAgICBsZXQgZXhwaXJlc19pbiA9IHRoaXMuZXhwaXJlc19pbjtcbiAgICAgICAgaWYgKGV4cGlyZXNfaW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cGlyZXNfaW4gPD0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBzY29wZXMoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5zY29wZSB8fCBcIlwiKS5zcGxpdChcIiBcIik7XG4gICAgfVxuXG4gICAgZ2V0IGlzT3BlbklkQ29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGVzLmluZGV4T2YoT2lkY1Njb3BlKSA+PSAwIHx8ICEhdGhpcy5pZF90b2tlbjtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vU3RhdGUuanMnO1xuaW1wb3J0IHsgSm9zZVV0aWwgfSBmcm9tICcuL0pvc2VVdGlsLmpzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20uanMnO1xuXG5leHBvcnQgY2xhc3MgU2lnbmluU3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gICAgY29uc3RydWN0b3Ioe25vbmNlLCBhdXRob3JpdHksIGNsaWVudF9pZCwgcmVkaXJlY3RfdXJpLCBjb2RlX3ZlcmlmaWVyLCByZXNwb25zZV9tb2RlLCBjbGllbnRfc2VjcmV0LCBzY29wZSwgZXh0cmFUb2tlblBhcmFtcywgc2tpcFVzZXJJbmZvfSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGFyZ3VtZW50c1swXSk7XG5cbiAgICAgICAgaWYgKG5vbmNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLl9ub25jZSA9IHJhbmRvbSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9ub25jZSA9IG5vbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGVfdmVyaWZpZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHJhbmRvbSgpIHByb2R1Y2VzIDMyIGxlbmd0aFxuICAgICAgICAgICAgdGhpcy5fY29kZV92ZXJpZmllciA9IHJhbmRvbSgpICsgcmFuZG9tKCkgKyByYW5kb20oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2RlX3ZlcmlmaWVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2RlX3ZlcmlmaWVyID0gY29kZV92ZXJpZmllcjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY29kZV92ZXJpZmllcikge1xuICAgICAgICAgICAgbGV0IGhhc2ggPSBKb3NlVXRpbC5oYXNoU3RyaW5nKHRoaXMuY29kZV92ZXJpZmllciwgXCJTSEEyNTZcIik7XG4gICAgICAgICAgICB0aGlzLl9jb2RlX2NoYWxsZW5nZSA9IEpvc2VVdGlsLmhleFRvQmFzZTY0VXJsKGhhc2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVkaXJlY3RfdXJpID0gcmVkaXJlY3RfdXJpO1xuICAgICAgICB0aGlzLl9hdXRob3JpdHkgPSBhdXRob3JpdHk7XG4gICAgICAgIHRoaXMuX2NsaWVudF9pZCA9IGNsaWVudF9pZDtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VfbW9kZSA9IHJlc3BvbnNlX21vZGU7XG4gICAgICAgIHRoaXMuX2NsaWVudF9zZWNyZXQgPSBjbGllbnRfc2VjcmV0O1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9leHRyYVRva2VuUGFyYW1zID0gZXh0cmFUb2tlblBhcmFtcztcbiAgICAgICAgdGhpcy5fc2tpcFVzZXJJbmZvID0gc2tpcFVzZXJJbmZvO1xuICAgIH1cblxuICAgIGdldCBub25jZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vbmNlO1xuICAgIH1cbiAgICBnZXQgYXV0aG9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0aG9yaXR5O1xuICAgIH1cbiAgICBnZXQgY2xpZW50X2lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50X2lkO1xuICAgIH1cbiAgICBnZXQgcmVkaXJlY3RfdXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkaXJlY3RfdXJpO1xuICAgIH1cbiAgICBnZXQgY29kZV92ZXJpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGVfdmVyaWZpZXI7XG4gICAgfVxuICAgIGdldCBjb2RlX2NoYWxsZW5nZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGVfY2hhbGxlbmdlO1xuICAgIH1cbiAgICBnZXQgcmVzcG9uc2VfbW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNlX21vZGU7XG4gICAgfVxuICAgIGdldCBjbGllbnRfc2VjcmV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50X3NlY3JldDtcbiAgICB9XG4gICAgZ2V0IHNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcGU7XG4gICAgfVxuICAgIGdldCBleHRyYVRva2VuUGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0cmFUb2tlblBhcmFtcztcbiAgICB9XG4gICAgZ2V0IHNraXBVc2VySW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NraXBVc2VySW5mbztcbiAgICB9XG4gICAgXG4gICAgdG9TdG9yYWdlU3RyaW5nKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJTaWduaW5TdGF0ZS50b1N0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IHRoaXMuY3JlYXRlZCxcbiAgICAgICAgICAgIHJlcXVlc3RfdHlwZTogdGhpcy5yZXF1ZXN0X3R5cGUsXG4gICAgICAgICAgICBub25jZTogdGhpcy5ub25jZSxcbiAgICAgICAgICAgIGNvZGVfdmVyaWZpZXI6IHRoaXMuY29kZV92ZXJpZmllcixcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdF91cmksXG4gICAgICAgICAgICBhdXRob3JpdHk6IHRoaXMuYXV0aG9yaXR5LFxuICAgICAgICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudF9pZCxcbiAgICAgICAgICAgIHJlc3BvbnNlX21vZGU6IHRoaXMucmVzcG9uc2VfbW9kZSxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHRoaXMuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgICAgICAgZXh0cmFUb2tlblBhcmFtcyA6IHRoaXMuZXh0cmFUb2tlblBhcmFtcyxcbiAgICAgICAgICAgIHNraXBVc2VySW5mbzogdGhpcy5za2lwVXNlckluZm9cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21TdG9yYWdlU3RyaW5nKHN0b3JhZ2VTdHJpbmcpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiU2lnbmluU3RhdGUuZnJvbVN0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShzdG9yYWdlU3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTaWduaW5TdGF0ZShkYXRhKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBVcmxVdGlsaXR5IH0gZnJvbSAnLi9VcmxVdGlsaXR5LmpzJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi9TdGF0ZS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTaWdub3V0UmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3Ioe3VybCwgaWRfdG9rZW5faGludCwgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLCBkYXRhLCBleHRyYVF1ZXJ5UGFyYW1zLCByZXF1ZXN0X3R5cGV9KSB7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWdub3V0UmVxdWVzdC5jdG9yOiBObyB1cmwgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXJsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlkX3Rva2VuX2hpbnQpIHtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwiaWRfdG9rZW5faGludFwiLCBpZF90b2tlbl9oaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkpIHtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwicG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpXCIsIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBTdGF0ZSh7IGRhdGEsIHJlcXVlc3RfdHlwZSB9KTtcblxuICAgICAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwic3RhdGVcIiwgdGhpcy5zdGF0ZS5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGtleSBpbiBleHRyYVF1ZXJ5UGFyYW1zKXtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIGtleSwgZXh0cmFRdWVyeVBhcmFtc1trZXldKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTaWdub3V0UmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKHVybCkge1xuXG4gICAgICAgIHZhciB2YWx1ZXMgPSBVcmxVdGlsaXR5LnBhcnNlVXJsRnJhZ21lbnQodXJsLCBcIj9cIik7XG5cbiAgICAgICAgdGhpcy5lcnJvciA9IHZhbHVlcy5lcnJvcjtcbiAgICAgICAgdGhpcy5lcnJvcl9kZXNjcmlwdGlvbiA9IHZhbHVlcy5lcnJvcl9kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5lcnJvcl91cmkgPSB2YWx1ZXMuZXJyb3JfdXJpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB2YWx1ZXMuc3RhdGU7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgU2lsZW50UmVuZXdTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHVzZXJNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyID0gdXNlck1hbmFnZXI7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdGhpcy5fdG9rZW5FeHBpcmluZy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLmFkZEFjY2Vzc1Rva2VuRXhwaXJpbmcodGhpcy5fY2FsbGJhY2spO1xuXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgdHJpZ2dlciBsb2FkaW5nIG9mIHRoZSB1c2VyIHNvIHRoZSBleHBpcmluZyBldmVudHMgY2FuIGJlIGluaXRpYWxpemVkXG4gICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5nZXRVc2VyKCkudGhlbih1c2VyPT57XG4gICAgICAgICAgICAgICAgLy8gZGVsaWJlcmF0ZSBub3BcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgIC8vIGNhdGNoIHRvIHN1cHByZXNzIGVycm9ycyBzaW5jZSB3ZSdyZSBpbiBhIGN0b3JcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWxlbnRSZW5ld1NlcnZpY2Uuc3RhcnQ6IEVycm9yIGZyb20gZ2V0VXNlcjpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5yZW1vdmVBY2Nlc3NUb2tlbkV4cGlyaW5nKHRoaXMuX2NhbGxiYWNrKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90b2tlbkV4cGlyaW5nKCkge1xuICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5zaWduaW5TaWxlbnQoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2lsZW50UmVuZXdTZXJ2aWNlLl90b2tlbkV4cGlyaW5nOiBTaWxlbnQgdG9rZW4gcmVuZXdhbCBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lsZW50UmVuZXdTZXJ2aWNlLl90b2tlbkV4cGlyaW5nOiBFcnJvciBmcm9tIHNpZ25pblNpbGVudDpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZXZlbnRzLl9yYWlzZVNpbGVudFJlbmV3RXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTdGF0ZSB7XG4gICAgY29uc3RydWN0b3Ioe2lkLCBkYXRhLCBjcmVhdGVkLCByZXF1ZXN0X3R5cGV9ID0ge30pIHtcbiAgICAgICAgdGhpcy5faWQgPSBpZCB8fCByYW5kb20oKTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjcmVhdGVkID09PSAnbnVtYmVyJyAmJiBjcmVhdGVkID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlZCA9IGNyZWF0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVkID0gcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlcXVlc3RfdHlwZSA9ICByZXF1ZXN0X3R5cGU7XG4gICAgfVxuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG4gICAgZ2V0IGNyZWF0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVkO1xuICAgIH1cbiAgICBnZXQgcmVxdWVzdF90eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdF90eXBlO1xuICAgIH1cblxuICAgIHRvU3RvcmFnZVN0cmluZygpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUudG9TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBjcmVhdGVkOiB0aGlzLmNyZWF0ZWQsXG4gICAgICAgICAgICByZXF1ZXN0X3R5cGU6IHRoaXMucmVxdWVzdF90eXBlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tU3RvcmFnZVN0cmluZyhzdG9yYWdlU3RyaW5nKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLmZyb21TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gbmV3IFN0YXRlKEpTT04ucGFyc2Uoc3RvcmFnZVN0cmluZykpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhclN0YWxlU3RhdGUoc3RvcmFnZSwgYWdlKSB7XG5cbiAgICAgICAgdmFyIGN1dG9mZiA9IERhdGUubm93KCkgLyAxMDAwIC0gYWdlO1xuXG4gICAgICAgIHJldHVybiBzdG9yYWdlLmdldEFsbEtleXMoKS50aGVuKGtleXMgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiBnb3Qga2V5c1wiLCBrZXlzKTtcblxuICAgICAgICAgICAgdmFyIHByb21pc2VzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHN0b3JhZ2UuZ2V0KGtleSkudGhlbihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbW92ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmZyb21TdG9yYWdlU3RyaW5nKGl0ZW0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IGdvdCBpdGVtIGZyb20ga2V5OiBcIiwga2V5LCBzdGF0ZS5jcmVhdGVkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5jcmVhdGVkIDw9IGN1dG9mZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiBFcnJvciBwYXJzaW5nIHN0YXRlIGZvciBrZXlcIiwga2V5LCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IG5vIGl0ZW0gaW4gc3RvcmFnZSBmb3Iga2V5OiBcIiwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IHJlbW92ZWQgaXRlbSBmb3Iga2V5OiBcIiwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG9yYWdlLnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5jbGVhclN0YWxlU3RhdGU6IHdhaXRpbmcgb24gcHJvbWlzZSBjb3VudDpcIiwgcHJvbWlzZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9FdmVudC5qcyc7XG5cbmNvbnN0IFRpbWVyRHVyYXRpb24gPSA1OyAvLyBzZWNvbmRzXG5cbmV4cG9ydCBjbGFzcyBUaW1lciBleHRlbmRzIEV2ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRpbWVyID0gR2xvYmFsLnRpbWVyLCBub3dGdW5jID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB0aGlzLl90aW1lciA9IHRpbWVyO1xuXG4gICAgICAgIGlmIChub3dGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLl9ub3dGdW5jID0gbm93RnVuYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX25vd0Z1bmMgPSAoKSA9PiBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBub3coKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLl9ub3dGdW5jKCkpO1xuICAgIH1cblxuICAgIGluaXQoZHVyYXRpb24pIHtcbiAgICAgICAgaWYgKGR1cmF0aW9uIDw9IDApIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gMTtcbiAgICAgICAgfVxuICAgICAgICBkdXJhdGlvbiA9IHBhcnNlSW50KGR1cmF0aW9uKTtcblxuICAgICAgICB2YXIgZXhwaXJhdGlvbiA9IHRoaXMubm93ICsgZHVyYXRpb247XG4gICAgICAgIGlmICh0aGlzLmV4cGlyYXRpb24gPT09IGV4cGlyYXRpb24gJiYgdGhpcy5fdGltZXJIYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIG5vIG5lZWQgdG8gcmVpbml0aWFsaXplIHRvIHNhbWUgZXhwaXJhdGlvbiwgc28gYmFpbCBvdXRcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRpbWVyLmluaXQgdGltZXIgXCIgKyB0aGlzLl9uYW1lICsgXCIgc2tpcHBpbmcgaW5pdGlhbGl6YXRpb24gc2luY2UgYWxyZWFkeSBpbml0aWFsaXplZCBmb3IgZXhwaXJhdGlvbjpcIiwgdGhpcy5leHBpcmF0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiVGltZXIuaW5pdCB0aW1lciBcIiArIHRoaXMuX25hbWUgKyBcIiBmb3IgZHVyYXRpb246XCIsIGR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5fZXhwaXJhdGlvbiA9IGV4cGlyYXRpb247XG5cbiAgICAgICAgLy8gd2UncmUgdXNpbmcgYSBmYWlybHkgc2hvcnQgdGltZXIgYW5kIHRoZW4gY2hlY2tpbmcgdGhlIGV4cGlyYXRpb24gaW4gdGhlXG4gICAgICAgIC8vIGNhbGxiYWNrIHRvIGhhbmRsZSBzY2VuYXJpb3Mgd2hlcmUgdGhlIGJyb3dzZXIgZGV2aWNlIHNsZWVwcywgYW5kIHRoZW5cbiAgICAgICAgLy8gdGhlIHRpbWVycyBlbmQgdXAgZ2V0dGluZyBkZWxheWVkLlxuICAgICAgICB2YXIgdGltZXJEdXJhdGlvbiA9IFRpbWVyRHVyYXRpb247XG4gICAgICAgIGlmIChkdXJhdGlvbiA8IHRpbWVyRHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRpbWVyRHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aW1lckhhbmRsZSA9IHRoaXMuX3RpbWVyLnNldEludGVydmFsKHRoaXMuX2NhbGxiYWNrLmJpbmQodGhpcyksIHRpbWVyRHVyYXRpb24gKiAxMDAwKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGV4cGlyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHBpcmF0aW9uO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVySGFuZGxlKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUaW1lci5jYW5jZWw6IFwiLCB0aGlzLl9uYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyLmNsZWFySW50ZXJ2YWwodGhpcy5fdGltZXJIYW5kbGUpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXJIYW5kbGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NhbGxiYWNrKCkge1xuICAgICAgICB2YXIgZGlmZiA9IHRoaXMuX2V4cGlyYXRpb24gLSB0aGlzLm5vdztcbiAgICAgICAgTG9nLmRlYnVnKFwiVGltZXIuY2FsbGJhY2s7IFwiICsgdGhpcy5fbmFtZSArIFwiIHRpbWVyIGV4cGlyZXMgaW46XCIsIGRpZmYpO1xuXG4gICAgICAgIGlmICh0aGlzLl9leHBpcmF0aW9uIDw9IHRoaXMubm93KSB7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgc3VwZXIucmFpc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IEpzb25TZXJ2aWNlIH0gZnJvbSAnLi9Kc29uU2VydmljZS5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL01ldGFkYXRhU2VydmljZS5qcyc7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUb2tlbkNsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIEpzb25TZXJ2aWNlQ3RvciA9IEpzb25TZXJ2aWNlLCBNZXRhZGF0YVNlcnZpY2VDdG9yID0gTWV0YWRhdGFTZXJ2aWNlKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmN0b3I6IE5vIHNldHRpbmdzIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldHRpbmdzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgdGhpcy5fanNvblNlcnZpY2UgPSBuZXcgSnNvblNlcnZpY2VDdG9yKCk7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZSA9IG5ldyBNZXRhZGF0YVNlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICB9XG5cbiAgICBleGNoYW5nZUNvZGUoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLmdyYW50X3R5cGUgPSBhcmdzLmdyYW50X3R5cGUgfHwgXCJhdXRob3JpemF0aW9uX2NvZGVcIjtcbiAgICAgICAgYXJncy5jbGllbnRfaWQgPSBhcmdzLmNsaWVudF9pZCB8fCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgICAgIGFyZ3MuY2xpZW50X3NlY3JldCA9IGFyZ3MuY2xpZW50X3NlY3JldCB8fCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICBhcmdzLnJlZGlyZWN0X3VyaSA9IGFyZ3MucmVkaXJlY3RfdXJpIHx8IHRoaXMuX3NldHRpbmdzLnJlZGlyZWN0X3VyaTtcblxuICAgICAgICB2YXIgYmFzaWNBdXRoID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgY2xpZW50X2F1dGhlbnRpY2F0aW9uID0gYXJncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uIHx8IHRoaXMuX3NldHRpbmdzLl9jbGllbnRfYXV0aGVudGljYXRpb247XG4gICAgICAgIGRlbGV0ZSBhcmdzLl9jbGllbnRfYXV0aGVudGljYXRpb247XG5cbiAgICAgICAgaWYgKCFhcmdzLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogTm8gY29kZSBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSBjb2RlIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MucmVkaXJlY3RfdXJpKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IE5vIHJlZGlyZWN0X3VyaSBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSByZWRpcmVjdF91cmkgaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJncy5jb2RlX3ZlcmlmaWVyKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IE5vIGNvZGVfdmVyaWZpZXIgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgY29kZV92ZXJpZmllciBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiBObyBjbGllbnRfaWQgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgY2xpZW50X2lkIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MuY2xpZW50X3NlY3JldCAmJiBjbGllbnRfYXV0aGVudGljYXRpb24gPT0gXCJjbGllbnRfc2VjcmV0X2Jhc2ljXCIpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogTm8gY2xpZW50X3NlY3JldCBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSBjbGllbnRfc2VjcmV0IGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlbmRpbmcgdGhlIGNsaWVudCBjcmVkZW50aWFscyB1c2luZyB0aGUgQmFzaWMgQXV0aCBtZXRob2RcbiAgICAgICAgaWYoY2xpZW50X2F1dGhlbnRpY2F0aW9uID09IFwiY2xpZW50X3NlY3JldF9iYXNpY1wiKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNpY0F1dGggPSBhcmdzLmNsaWVudF9pZCArICc6JyArIGFyZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgICAgIGRlbGV0ZSBhcmdzLmNsaWVudF9pZDtcbiAgICAgICAgICAgIGRlbGV0ZSBhcmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFRva2VuRW5kcG9pbnQoZmFsc2UpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogUmVjZWl2ZWQgdG9rZW4gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UucG9zdEZvcm0odXJsLCBhcmdzLCBiYXNpY0F1dGgpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogcmVzcG9uc2UgcmVjZWl2ZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4Y2hhbmdlUmVmcmVzaFRva2VuKGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5ncmFudF90eXBlID0gYXJncy5ncmFudF90eXBlIHx8IFwicmVmcmVzaF90b2tlblwiO1xuICAgICAgICBhcmdzLmNsaWVudF9pZCA9IGFyZ3MuY2xpZW50X2lkIHx8IHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZDtcbiAgICAgICAgYXJncy5jbGllbnRfc2VjcmV0ID0gYXJncy5jbGllbnRfc2VjcmV0IHx8IHRoaXMuX3NldHRpbmdzLmNsaWVudF9zZWNyZXQ7XG5cbiAgICAgICAgdmFyIGJhc2ljQXV0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGNsaWVudF9hdXRoZW50aWNhdGlvbiA9IGFyZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbiB8fCB0aGlzLl9zZXR0aW5ncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuICAgICAgICBkZWxldGUgYXJncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuXG4gICAgICAgIGlmICghYXJncy5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZVJlZnJlc2hUb2tlbjogTm8gcmVmcmVzaF90b2tlbiBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSByZWZyZXNoX3Rva2VuIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZVJlZnJlc2hUb2tlbjogTm8gY2xpZW50X2lkIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIGNsaWVudF9pZCBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZW5kaW5nIHRoZSBjbGllbnQgY3JlZGVudGlhbHMgdXNpbmcgdGhlIEJhc2ljIEF1dGggbWV0aG9kXG4gICAgICAgIGlmKGNsaWVudF9hdXRoZW50aWNhdGlvbiA9PSBcImNsaWVudF9zZWNyZXRfYmFzaWNcIilcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzaWNBdXRoID0gYXJncy5jbGllbnRfaWQgKyAnOicgKyBhcmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgICAgICBkZWxldGUgYXJncy5jbGllbnRfaWQ7XG4gICAgICAgICAgICBkZWxldGUgYXJncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRUb2tlbkVuZHBvaW50KGZhbHNlKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlbkNsaWVudC5leGNoYW5nZVJlZnJlc2hUb2tlbjogUmVjZWl2ZWQgdG9rZW4gZW5kcG9pbnRcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9qc29uU2VydmljZS5wb3N0Rm9ybSh1cmwsIGFyZ3MsIGJhc2ljQXV0aCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW46IHJlc3BvbnNlIHJlY2VpdmVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL01ldGFkYXRhU2VydmljZS5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmNvbnN0IEFjY2Vzc1Rva2VuVHlwZUhpbnQgPSBcImFjY2Vzc190b2tlblwiO1xuY29uc3QgUmVmcmVzaFRva2VuVHlwZUhpbnQgPSBcInJlZnJlc2hfdG9rZW5cIjtcblxuZXhwb3J0IGNsYXNzIFRva2VuUmV2b2NhdGlvbkNsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIFhNTEh0dHBSZXF1ZXN0Q3RvciA9IEdsb2JhbC5YTUxIdHRwUmVxdWVzdCwgTWV0YWRhdGFTZXJ2aWNlQ3RvciA9IE1ldGFkYXRhU2VydmljZSkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlblJldm9jYXRpb25DbGllbnQuY3RvcjogTm8gc2V0dGluZ3MgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzZXR0aW5ncyBwcm92aWRlZC5cIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLl9YTUxIdHRwUmVxdWVzdEN0b3IgPSBYTUxIdHRwUmVxdWVzdEN0b3I7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZSA9IG5ldyBNZXRhZGF0YVNlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICB9XG5cbiAgICByZXZva2UodG9rZW4sIHJlcXVpcmVkLCB0eXBlID0gXCJhY2Nlc3NfdG9rZW5cIikge1xuICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBObyB0b2tlbiBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRva2VuIHByb3ZpZGVkLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlICE9PSBBY2Nlc3NUb2tlblR5cGVIaW50ICYmIHR5cGUgIT0gUmVmcmVzaFRva2VuVHlwZUhpbnQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IEludmFsaWQgdG9rZW4gdHlwZVwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdG9rZW4gdHlwZS5cIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFJldm9jYXRpb25FbmRwb2ludCgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IFJldm9jYXRpb24gbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmV2b2NhdGlvbiBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG5vdCByZXF1aXJlZCwgc28gZG9uJ3QgZXJyb3IgYW5kIGp1c3QgcmV0dXJuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBSZXZva2luZyBcIiArIHR5cGUpO1xuICAgICAgICAgICAgdmFyIGNsaWVudF9pZCA9IHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZDtcbiAgICAgICAgICAgIHZhciBjbGllbnRfc2VjcmV0ID0gdGhpcy5fc2V0dGluZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXZva2UodXJsLCBjbGllbnRfaWQsIGNsaWVudF9zZWNyZXQsIHRva2VuLCB0eXBlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3Jldm9rZSh1cmwsIGNsaWVudF9pZCwgY2xpZW50X3NlY3JldCwgdG9rZW4sIHR5cGUpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IHRoaXMuX1hNTEh0dHBSZXF1ZXN0Q3RvcigpO1xuICAgICAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIHVybCk7XG5cbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZTogSFRUUCByZXNwb25zZSByZWNlaXZlZCwgc3RhdHVzXCIsIHhoci5zdGF0dXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IoeGhyLnN0YXR1c1RleHQgKyBcIiAoXCIgKyB4aHIuc3RhdHVzICsgXCIpXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7IFxuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IE5ldHdvcmsgRXJyb3IuXCIpXG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiTmV0d29yayBFcnJvclwiKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBib2R5ID0gXCJjbGllbnRfaWQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoY2xpZW50X2lkKTtcbiAgICAgICAgICAgIGlmIChjbGllbnRfc2VjcmV0KSB7XG4gICAgICAgICAgICAgICAgYm9keSArPSBcIiZjbGllbnRfc2VjcmV0PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNsaWVudF9zZWNyZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keSArPSBcIiZ0b2tlbl90eXBlX2hpbnQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodHlwZSk7XG4gICAgICAgICAgICBib2R5ICs9IFwiJnRva2VuPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHRva2VuKTtcblxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG4gICAgICAgICAgICB4aHIuc2VuZChib2R5KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuXG5leHBvcnQgY2xhc3MgVXJsVXRpbGl0eSB7XG4gICAgc3RhdGljIGFkZFF1ZXJ5UGFyYW0odXJsLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICBpZiAodXJsLmluZGV4T2YoJz8nKSA8IDApIHtcbiAgICAgICAgICAgIHVybCArPSBcIj9cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cmxbdXJsLmxlbmd0aCAtIDFdICE9PSBcIj9cIikge1xuICAgICAgICAgICAgdXJsICs9IFwiJlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsICs9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKTtcbiAgICAgICAgdXJsICs9IFwiPVwiO1xuICAgICAgICB1cmwgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZVVybEZyYWdtZW50KHZhbHVlLCBkZWxpbWl0ZXIgPSBcIiNcIiwgZ2xvYmFsID0gR2xvYmFsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIHZhbHVlID0gZ2xvYmFsLmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaWR4ID0gdmFsdWUubGFzdEluZGV4T2YoZGVsaW1pdGVyKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cihpZHggKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWxpbWl0ZXIgPT09IFwiP1wiKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSdyZSBkb2luZyBxdWVyeSwgdGhlbiBzdHJpcCBvZmYgaGFzaCBmcmFnbWVudCBiZWZvcmUgd2UgcGFyc2VcbiAgICAgICAgICAgIGlkeCA9IHZhbHVlLmluZGV4T2YoJyMnKTtcbiAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKDAsIGlkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFyYW1zID0ge30sXG4gICAgICAgICAgICByZWdleCA9IC8oW14mPV0rKT0oW14mXSopL2csXG4gICAgICAgICAgICBtO1xuXG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgd2hpbGUgKG0gPSByZWdleC5leGVjKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQobVsxXSk7XG4gICAgICAgICAgICAgICAgdmFsID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMl0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVcmxVdGlsaXR5LnBhcnNlVXJsRnJhZ21lbnQ6IHJlc3BvbnNlIGNvbnRhaW5zIG1hbGZvcm1lZCBVUkwgZW5jb2RpbmdcIiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlJlc3BvbnNlIGNvbnRhaW5zIG1hbGZvcm1lZCBVUkwgZW5jb2RpbmdcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBuZXZlciBsZXQgYSByZXNwb25zZSBVUkwgd3JpdGUgdG8gdGhlIG9iamVjdCBwcm90b3R5cGVcbiAgICAgICAgICAgIGlmIChrZXkgIT09IFwiX19wcm90b19fXCIgJiYga2V5ICE9PSBcImNvbnN0cnVjdG9yXCIgJiYga2V5ICE9PSBcInByb3RvdHlwZVwiKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY291bnRlcisrID4gNTApIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVcmxVdGlsaXR5LnBhcnNlVXJsRnJhZ21lbnQ6IHJlc3BvbnNlIGV4Y2VlZGVkIGV4cGVjdGVkIG51bWJlciBvZiBwYXJhbWV0ZXJzXCIsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJSZXNwb25zZSBleGNlZWRlZCBleHBlY3RlZCBudW1iZXIgb2YgcGFyYW1ldGVyc1wiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIFVzZXIge1xuICAgIGNvbnN0cnVjdG9yKHtpZF90b2tlbiwgc2Vzc2lvbl9zdGF0ZSwgYWNjZXNzX3Rva2VuLCByZWZyZXNoX3Rva2VuLCB0b2tlbl90eXBlLCBzY29wZSwgcHJvZmlsZSwgZXhwaXJlc19hdCwgc3RhdGV9KSB7XG4gICAgICAgIHRoaXMuaWRfdG9rZW4gPSBpZF90b2tlbjtcbiAgICAgICAgdGhpcy5zZXNzaW9uX3N0YXRlID0gc2Vzc2lvbl9zdGF0ZTtcbiAgICAgICAgdGhpcy5hY2Nlc3NfdG9rZW4gPSBhY2Nlc3NfdG9rZW47XG4gICAgICAgIHRoaXMucmVmcmVzaF90b2tlbiA9IHJlZnJlc2hfdG9rZW47XG4gICAgICAgIHRoaXMudG9rZW5fdHlwZSA9IHRva2VuX3R5cGU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5wcm9maWxlID0gcHJvZmlsZTtcbiAgICAgICAgdGhpcy5leHBpcmVzX2F0ID0gZXhwaXJlc19hdDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxuICAgIGdldCBleHBpcmVzX2luKCkge1xuICAgICAgICBpZiAodGhpcy5leHBpcmVzX2F0KSB7XG4gICAgICAgICAgICBsZXQgbm93ID0gcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwaXJlc19hdCAtIG5vdztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBzZXQgZXhwaXJlc19pbih2YWx1ZSkge1xuICAgICAgICBsZXQgZXhwaXJlc19pbiA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBleHBpcmVzX2luID09PSAnbnVtYmVyJyAmJiBleHBpcmVzX2luID4gMCkge1xuICAgICAgICAgICAgbGV0IG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMuZXhwaXJlc19hdCA9IG5vdyArIGV4cGlyZXNfaW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZXhwaXJlZCgpIHtcbiAgICAgICAgbGV0IGV4cGlyZXNfaW4gPSB0aGlzLmV4cGlyZXNfaW47XG4gICAgICAgIGlmIChleHBpcmVzX2luICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBleHBpcmVzX2luIDw9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgc2NvcGVzKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2NvcGUgfHwgXCJcIikuc3BsaXQoXCIgXCIpO1xuICAgIH1cblxuICAgIHRvU3RvcmFnZVN0cmluZygpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlci50b1N0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZF90b2tlbjogdGhpcy5pZF90b2tlbixcbiAgICAgICAgICAgIHNlc3Npb25fc3RhdGU6IHRoaXMuc2Vzc2lvbl9zdGF0ZSxcbiAgICAgICAgICAgIGFjY2Vzc190b2tlbjogdGhpcy5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICB0b2tlbl90eXBlOiB0aGlzLnRva2VuX3R5cGUsXG4gICAgICAgICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgICAgICAgIHByb2ZpbGU6IHRoaXMucHJvZmlsZSxcbiAgICAgICAgICAgIGV4cGlyZXNfYXQ6IHRoaXMuZXhwaXJlc19hdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbVN0b3JhZ2VTdHJpbmcoc3RvcmFnZVN0cmluZykge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyLmZyb21TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gbmV3IFVzZXIoSlNPTi5wYXJzZShzdG9yYWdlU3RyaW5nKSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgSnNvblNlcnZpY2UgfSBmcm9tICcuL0pzb25TZXJ2aWNlLmpzJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vTWV0YWRhdGFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEpvc2VVdGlsIH0gZnJvbSAnLi9Kb3NlVXRpbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBVc2VySW5mb1NlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBzZXR0aW5ncywgXG4gICAgICAgIEpzb25TZXJ2aWNlQ3RvciA9IEpzb25TZXJ2aWNlLCBcbiAgICAgICAgTWV0YWRhdGFTZXJ2aWNlQ3RvciA9IE1ldGFkYXRhU2VydmljZSwgXG4gICAgICAgIGpvc2VVdGlsID0gSm9zZVV0aWxcbiAgICApIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLmN0b3I6IE5vIHNldHRpbmdzIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldHRpbmdzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgdGhpcy5fanNvblNlcnZpY2UgPSBuZXcgSnNvblNlcnZpY2VDdG9yKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzLl9nZXRDbGFpbXNGcm9tSnd0LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX2pvc2VVdGlsID0gam9zZVV0aWw7XG4gICAgfVxuXG4gICAgZ2V0Q2xhaW1zKHRva2VuKSB7XG4gICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5nZXRDbGFpbXM6IE5vIHRva2VuIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIHRva2VuIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0VXNlckluZm9FbmRwb2ludCgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5nZXRDbGFpbXM6IHJlY2VpdmVkIHVzZXJpbmZvIHVybFwiLCB1cmwpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UuZ2V0SnNvbih1cmwsIHRva2VuKS50aGVuKGNsYWltcyA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLmdldENsYWltczogY2xhaW1zIHJlY2VpdmVkXCIsIGNsYWltcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYWltcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZ2V0Q2xhaW1zRnJvbUp3dChyZXEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBqd3QgPSB0aGlzLl9qb3NlVXRpbC5wYXJzZUp3dChyZXEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGlmICghand0IHx8ICFqd3QuaGVhZGVyIHx8ICFqd3QucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogRmFpbGVkIHRvIHBhcnNlIEpXVFwiLCBqd3QpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIga2lkID0gand0LmhlYWRlci5raWQ7XG5cbiAgICAgICAgICAgIGxldCBpc3N1ZXJQcm9taXNlO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9zZXR0aW5ncy51c2VySW5mb0p3dElzc3Vlcikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ09QJzpcbiAgICAgICAgICAgICAgICAgICAgaXNzdWVyUHJvbWlzZSA9IHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRJc3N1ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQU5ZJzpcbiAgICAgICAgICAgICAgICAgICAgaXNzdWVyUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShqd3QucGF5bG9hZC5pc3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpc3N1ZXJQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3NldHRpbmdzLnVzZXJJbmZvSnd0SXNzdWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpc3N1ZXJQcm9taXNlLnRoZW4oaXNzdWVyID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IFJlY2VpdmVkIGlzc3VlcjpcIiArIGlzc3Vlcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFNpZ25pbmdLZXlzKCkudGhlbihrZXlzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IE5vIHNpZ25pbmcga2V5cyBmcm9tIG1ldGFkYXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHNpZ25pbmcga2V5cyBmcm9tIG1ldGFkYXRhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogUmVjZWl2ZWQgc2lnbmluZyBrZXlzXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWtpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cyA9IHRoaXMuX2ZpbHRlckJ5QWxnKGtleXMsIGp3dC5oZWFkZXIuYWxnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogTm8ga2lkIGZvdW5kIGluIGlkX3Rva2VuIGFuZCBtb3JlIHRoYW4gb25lIGtleSBmb3VuZCBpbiBtZXRhZGF0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8ga2lkIGZvdW5kIGluIGlkX3Rva2VuIGFuZCBtb3JlIHRoYW4gb25lIGtleSBmb3VuZCBpbiBtZXRhZGF0YVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraWQgaXMgbWFuZGF0b3J5IG9ubHkgd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUga2V5cyBpbiB0aGUgcmVmZXJlbmNlZCBKV0sgU2V0IGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VlIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjU2lnbmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlzLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXkua2lkID09PSBraWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IE5vIGtleSBtYXRjaGluZyBraWQgb3IgYWxnIGZvdW5kIGluIHNpZ25pbmcga2V5c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBrZXkgbWF0Y2hpbmcga2lkIG9yIGFsZyBmb3VuZCBpbiBzaWduaW5nIGtleXNcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGF1ZGllbmNlID0gdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9ja1NrZXdJblNlY29uZHMgPSB0aGlzLl9zZXR0aW5ncy5jbG9ja1NrZXc7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogVmFsaWRhaW5nIEpXVDsgdXNpbmcgY2xvY2sgc2tldyAoaW4gc2Vjb25kcykgb2Y6IFwiLCBjbG9ja1NrZXdJblNlY29uZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb3NlVXRpbC52YWxpZGF0ZUp3dChyZXEucmVzcG9uc2VUZXh0LCBrZXksIGlzc3VlciwgYXVkaWVuY2UsIGNsb2NrU2tld0luU2Vjb25kcywgdW5kZWZpbmVkLCB0cnVlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogSldUIHZhbGlkYXRpb24gc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqd3QucGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBFcnJvciBwYXJzaW5nIEpXVCByZXNwb25zZVwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2ZpbHRlckJ5QWxnKGtleXMsIGFsZykge1xuICAgICAgICBpZiAoIUpvc2VVdGlsLmlzQWxsb3dlZFNpZ25pbmdBbGcoYWxnKSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLl9maWx0ZXJCeUFsZzogYWxnIG5vdCBhbGxvd2VkOiBcIiwgYWxnKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga3R5ID0gbnVsbDtcbiAgICAgICAgaWYgKGFsZy5zdGFydHNXaXRoKFwiUlNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiUlNBXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJQU1wiKSkge1xuICAgICAgICAgICAgLy8gUlNBLVBTUyBrZXlzIGFyZSBrdHkgXCJSU0FcIiAoUkZDIDc1MTgpXG4gICAgICAgICAgICBrdHkgPSBcIlJTQVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsZy5zdGFydHNXaXRoKFwiRVNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiRUNcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZmlsdGVyQnlBbGc6IGFsZyBub3Qgc3VwcG9ydGVkOiBcIiwgYWxnKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZmlsdGVyQnlBbGc6IExvb2tpbmcgZm9yIGtleXMgdGhhdCBtYXRjaCBrdHk6IFwiLCBrdHkpO1xuXG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtleS5rdHkgPT09IGt0eTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLl9maWx0ZXJCeUFsZzogTnVtYmVyIG9mIGtleXMgdGhhdCBtYXRjaCBrdHk6IFwiLCBrdHksIGtleXMubGVuZ3RoKTtcblxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBPaWRjQ2xpZW50IH0gZnJvbSAnLi9PaWRjQ2xpZW50LmpzJztcbmltcG9ydCB7IFVzZXJNYW5hZ2VyU2V0dGluZ3MgfSBmcm9tICcuL1VzZXJNYW5hZ2VyU2V0dGluZ3MuanMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vVXNlci5qcyc7XG5pbXBvcnQgeyBVc2VyTWFuYWdlckV2ZW50cyB9IGZyb20gJy4vVXNlck1hbmFnZXJFdmVudHMuanMnO1xuaW1wb3J0IHsgU2lsZW50UmVuZXdTZXJ2aWNlIH0gZnJvbSAnLi9TaWxlbnRSZW5ld1NlcnZpY2UuanMnO1xuaW1wb3J0IHsgU2Vzc2lvbk1vbml0b3IgfSBmcm9tICcuL1Nlc3Npb25Nb25pdG9yLmpzJztcbmltcG9ydCB7IFNpZ25pblJlcXVlc3QgfSBmcm9tIFwiLi9TaWduaW5SZXF1ZXN0XCI7XG5pbXBvcnQgeyBUb2tlblJldm9jYXRpb25DbGllbnQgfSBmcm9tICcuL1Rva2VuUmV2b2NhdGlvbkNsaWVudC5qcyc7XG5pbXBvcnQgeyBUb2tlbkNsaWVudCB9IGZyb20gJy4vVG9rZW5DbGllbnQuanMnO1xuaW1wb3J0IHsgSm9zZVV0aWwgfSBmcm9tICcuL0pvc2VVdGlsLmpzJztcblxuXG5leHBvcnQgY2xhc3MgVXNlck1hbmFnZXIgZXh0ZW5kcyBPaWRjQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncyA9IHt9LFxuICAgICAgICBTaWxlbnRSZW5ld1NlcnZpY2VDdG9yID0gU2lsZW50UmVuZXdTZXJ2aWNlLFxuICAgICAgICBTZXNzaW9uTW9uaXRvckN0b3IgPSBTZXNzaW9uTW9uaXRvcixcbiAgICAgICAgVG9rZW5SZXZvY2F0aW9uQ2xpZW50Q3RvciA9IFRva2VuUmV2b2NhdGlvbkNsaWVudCxcbiAgICAgICAgVG9rZW5DbGllbnRDdG9yID0gVG9rZW5DbGllbnQsXG4gICAgICAgIGpvc2VVdGlsID0gSm9zZVV0aWxcbiAgICApIHtcblxuICAgICAgICBpZiAoIShzZXR0aW5ncyBpbnN0YW5jZW9mIFVzZXJNYW5hZ2VyU2V0dGluZ3MpKSB7XG4gICAgICAgICAgICBzZXR0aW5ncyA9IG5ldyBVc2VyTWFuYWdlclNldHRpbmdzKHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcihzZXR0aW5ncyk7XG5cbiAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IFVzZXJNYW5hZ2VyRXZlbnRzKHNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdTZXJ2aWNlID0gbmV3IFNpbGVudFJlbmV3U2VydmljZUN0b3IodGhpcyk7XG5cbiAgICAgICAgLy8gb3JkZXIgaXMgaW1wb3J0YW50IGZvciB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM7IHRoZXNlIHNlcnZpY2VzIGRlcGVuZCB1cG9uIHRoZSBldmVudHMuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG9tYXRpY1NpbGVudFJlbmV3KSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5jdG9yOiBhdXRvbWF0aWNTaWxlbnRSZW5ldyBpcyBjb25maWd1cmVkLCBzZXR0aW5nIHVwIHNpbGVudCByZW5ld1wiKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTaWxlbnRSZW5ldygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubW9uaXRvclNlc3Npb24pIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLmN0b3I6IG1vbml0b3JTZXNzaW9uIGlzIGNvbmZpZ3VyZWQsIHNldHRpbmcgdXAgc2Vzc2lvbiBtb25pdG9yXCIpO1xuICAgICAgICAgICAgdGhpcy5fc2Vzc2lvbk1vbml0b3IgPSBuZXcgU2Vzc2lvbk1vbml0b3JDdG9yKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdG9rZW5SZXZvY2F0aW9uQ2xpZW50ID0gbmV3IFRva2VuUmV2b2NhdGlvbkNsaWVudEN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl90b2tlbkNsaWVudCA9IG5ldyBUb2tlbkNsaWVudEN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl9qb3NlVXRpbCA9IGpvc2VVdGlsO1xuICAgIH1cblxuICAgIGdldCBfcmVkaXJlY3ROYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnJlZGlyZWN0TmF2aWdhdG9yO1xuICAgIH1cbiAgICBnZXQgX3BvcHVwTmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5wb3B1cE5hdmlnYXRvcjtcbiAgICB9XG4gICAgZ2V0IF9pZnJhbWVOYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmlmcmFtZU5hdmlnYXRvcjtcbiAgICB9XG4gICAgZ2V0IF91c2VyU3RvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnVzZXJTdG9yZTtcbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIGdldFVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuZ2V0VXNlcjogdXNlciBsb2FkZWRcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubG9hZCh1c2VyLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuZ2V0VXNlcjogdXNlciBub3QgZm91bmQgaW4gc3RvcmFnZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVVc2VyKG51bGwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5yZW1vdmVVc2VyOiB1c2VyIHJlbW92ZWQgZnJvbSBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnVubG9hZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWduaW5SZWRpcmVjdChhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MucmVxdWVzdF90eXBlID0gXCJzaTpyXCI7XG4gICAgICAgIGxldCBuYXZQYXJhbXMgPSB7XG4gICAgICAgICAgICB1c2VSZXBsYWNlVG9OYXZpZ2F0ZSA6IGFyZ3MudXNlUmVwbGFjZVRvTmF2aWdhdGVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pblN0YXJ0KGFyZ3MsIHRoaXMuX3JlZGlyZWN0TmF2aWdhdG9yLCBuYXZQYXJhbXMpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUmVkaXJlY3Q6IHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaWduaW5SZWRpcmVjdENhbGxiYWNrKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluRW5kKHVybCB8fCB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvci51cmwpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlci5wcm9maWxlICYmIHVzZXIucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblJlZGlyZWN0Q2FsbGJhY2s6IHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUmVkaXJlY3RDYWxsYmFjazogbm8gc3ViXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbmluUG9wdXAoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic2k6cFwiO1xuICAgICAgICBsZXQgdXJsID0gYXJncy5yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmk7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cDogTm8gcG9wdXBfcmVkaXJlY3RfdXJpIG9yIHJlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHBvcHVwX3JlZGlyZWN0X3VyaSBvciByZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzLnJlZGlyZWN0X3VyaSA9IHVybDtcbiAgICAgICAgYXJncy5kaXNwbGF5ID0gXCJwb3B1cFwiO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW4oYXJncywgdGhpcy5fcG9wdXBOYXZpZ2F0b3IsIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsOiB1cmwsXG4gICAgICAgICAgICBwb3B1cFdpbmRvd0ZlYXR1cmVzOiBhcmdzLnBvcHVwV2luZG93RmVhdHVyZXMgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cFdpbmRvd0ZlYXR1cmVzLFxuICAgICAgICAgICAgcG9wdXBXaW5kb3dUYXJnZXQ6IGFyZ3MucG9wdXBXaW5kb3dUYXJnZXQgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cFdpbmRvd1RhcmdldFxuICAgICAgICB9KS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5wcm9maWxlICYmIHVzZXIucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cDogc2lnbmluUG9wdXAgc3VjY2Vzc2Z1bCwgc2lnbmVkIGluIHN1YjogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cDogbm8gc3ViXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaWduaW5Qb3B1cENhbGxiYWNrKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluQ2FsbGJhY2sodXJsLCB0aGlzLl9wb3B1cE5hdmlnYXRvcikudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXBDYWxsYmFjazogc3VjY2Vzc2Z1bCwgc2lnbmVkIGluIHN1YjogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cENhbGxiYWNrOiBubyBzdWJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5zaWduaW5Qb3B1cENhbGxiYWNrIGVycm9yOiBcIiArIGVyciAmJiBlcnIubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25pblNpbGVudChhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIC8vIGZpcnN0IGRldGVybWluZSBpZiB3ZSBoYXZlIGEgcmVmcmVzaCB0b2tlbiwgb3IgbmVlZCB0byB1c2UgaWZyYW1lXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlciAmJiB1c2VyLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBhcmdzLnJlZnJlc2hfdG9rZW4gPSB1c2VyLnJlZnJlc2hfdG9rZW47XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZVJlZnJlc2hUb2tlbihhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFyZ3MucmVxdWVzdF90eXBlID0gXCJzaTpzXCI7XG4gICAgICAgICAgICAgICAgYXJncy5pZF90b2tlbl9oaW50ID0gYXJncy5pZF90b2tlbl9oaW50IHx8ICh0aGlzLnNldHRpbmdzLmluY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyAmJiB1c2VyICYmIHVzZXIuaWRfdG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyICYmIHRoaXMuX3NldHRpbmdzLnZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldykge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5zaWduaW5TaWxlbnQsIHN1YmplY3QgcHJpb3IgdG8gc2lsZW50IHJlbmV3OiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY3VycmVudF9zdWIgPSB1c2VyLnByb2ZpbGUuc3ViO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluU2lsZW50SWZyYW1lKGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdXNlUmVmcmVzaFRva2VuKGFyZ3MgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW4oYXJncykudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdXNlUmVmcmVzaFRva2VuOiBObyByZXNwb25zZSByZXR1cm5lZCBmcm9tIHRva2VuIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIk5vIHJlc3BvbnNlIHJldHVybmVkIGZyb20gdG9rZW4gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdXNlUmVmcmVzaFRva2VuOiBObyBhY2Nlc3MgdG9rZW4gcmV0dXJuZWQgZnJvbSB0b2tlbiBlbmRwb2ludFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJObyBhY2Nlc3MgdG9rZW4gcmV0dXJuZWQgZnJvbSB0b2tlbiBlbmRwb2ludFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VyKCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaWRUb2tlblZhbGlkYXRpb24gPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pZF90b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRUb2tlblZhbGlkYXRpb24gPSB0aGlzLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW4odXNlci5wcm9maWxlLCByZXN1bHQuaWRfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkVG9rZW5WYWxpZGF0aW9uLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3VzZVJlZnJlc2hUb2tlbjogcmVmcmVzaCB0b2tlbiByZXNwb25zZSBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5pZF90b2tlbiA9IHJlc3VsdC5pZF90b2tlbiB8fCB1c2VyLmlkX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5hY2Nlc3NfdG9rZW4gPSByZXN1bHQuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5yZWZyZXNoX3Rva2VuID0gcmVzdWx0LnJlZnJlc2hfdG9rZW4gfHwgdXNlci5yZWZyZXNoX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5leHBpcmVzX2luID0gcmVzdWx0LmV4cGlyZXNfaW47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlVXNlcih1c2VyKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLmxvYWQodXNlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbihwcm9maWxlLCBpZF90b2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldElzc3VlcigpLnRoZW4oaXNzdWVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmdldEVwb2NoVGltZSgpLnRoZW4obm93ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fam9zZVV0aWwudmFsaWRhdGVKd3RBdHRyaWJ1dGVzKGlkX3Rva2VuLCBpc3N1ZXIsIHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCwgdGhpcy5fc2V0dGluZ3MuY2xvY2tTa2V3LCBub3cpLnRoZW4ocGF5bG9hZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcGF5bG9hZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbjogRmFpbGVkIHRvIHZhbGlkYXRlIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byB2YWxpZGF0ZSBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuc3ViICE9PSBwcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbjogc3ViIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIGN1cnJlbnQgc3ViXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcInN1YiBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBjdXJyZW50IHN1YlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXV0aF90aW1lICYmIHBheWxvYWQuYXV0aF90aW1lICE9PSBwcm9maWxlLmF1dGhfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbjogYXV0aF90aW1lIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIG9yaWdpbmFsIGF1dGhfdGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhdXRoX3RpbWUgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggb3JpZ2luYWwgYXV0aF90aW1lXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5henAgJiYgcGF5bG9hZC5henAgIT09IHByb2ZpbGUuYXpwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuOiBhenAgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggb3JpZ2luYWwgYXpwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImF6cCBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBvcmlnaW5hbCBhenBcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghcGF5bG9hZC5henAgJiYgcHJvZmlsZS5henApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW46IGF6cCBub3QgaW4gaWRfdG9rZW4sIGJ1dCBwcmVzZW50IGluIG9yaWdpbmFsIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImF6cCBub3QgaW4gaWRfdG9rZW4sIGJ1dCBwcmVzZW50IGluIG9yaWdpbmFsIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBfc2lnbmluU2lsZW50SWZyYW1lKGFyZ3MgPSB7fSkge1xuICAgICAgICBsZXQgdXJsID0gYXJncy5yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5zaWxlbnRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50OiBObyBzaWxlbnRfcmVkaXJlY3RfdXJpIGNvbmZpZ3VyZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gc2lsZW50X3JlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyZ3MucmVkaXJlY3RfdXJpID0gdXJsO1xuICAgICAgICBhcmdzLnByb21wdCA9IGFyZ3MucHJvbXB0IHx8IFwibm9uZVwiO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW4oYXJncywgdGhpcy5faWZyYW1lTmF2aWdhdG9yLCB7XG4gICAgICAgICAgICBzdGFydFVybDogdXJsLFxuICAgICAgICAgICAgc2lsZW50UmVxdWVzdFRpbWVvdXQ6IGFyZ3Muc2lsZW50UmVxdWVzdFRpbWVvdXQgfHwgdGhpcy5zZXR0aW5ncy5zaWxlbnRSZXF1ZXN0VGltZW91dFxuICAgICAgICB9KS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5wcm9maWxlICYmIHVzZXIucHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5TaWxlbnQ6IHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50OiBubyBzdWJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbmluU2lsZW50Q2FsbGJhY2sodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5DYWxsYmFjayh1cmwsIHRoaXMuX2lmcmFtZU5hdmlnYXRvcikudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50Q2FsbGJhY2s6IHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50Q2FsbGJhY2s6IG5vIHN1YlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWduaW5DYWxsYmFjayh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFNpZ25pblJlc3BvbnNlU3RhdGUodXJsKS50aGVuKCh7c3RhdGUsIHJlc3BvbnNlfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0YXRlLnJlcXVlc3RfdHlwZSA9PT0gXCJzaTpyXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaWduaW5SZWRpcmVjdENhbGxiYWNrKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUucmVxdWVzdF90eXBlID09PSBcInNpOnBcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25pblBvcHVwQ2FsbGJhY2sodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0ZS5yZXF1ZXN0X3R5cGUgPT09IFwic2k6c1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmluU2lsZW50Q2FsbGJhY2sodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJpbnZhbGlkIHJlc3BvbnNlX3R5cGUgaW4gc3RhdGVcIikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWdub3V0Q2FsbGJhY2sodXJsLCBrZWVwT3Blbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkU2lnbm91dFJlc3BvbnNlU3RhdGUodXJsKS50aGVuKCh7c3RhdGUsIHJlc3BvbnNlfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnJlcXVlc3RfdHlwZSA9PT0gXCJzbzpyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbm91dFJlZGlyZWN0Q2FsbGJhY2sodXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnJlcXVlc3RfdHlwZSA9PT0gXCJzbzpwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbm91dFBvcHVwQ2FsbGJhY2sodXJsLCBrZWVwT3Blbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJpbnZhbGlkIHJlc3BvbnNlX3R5cGUgaW4gc3RhdGVcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBxdWVyeVNlc3Npb25TdGF0dXMoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic2k6c1wiOyAvLyB0aGlzIGFjdHMgbGlrZSBhIHNpZ25pbiBzaWxlbnRcbiAgICAgICAgbGV0IHVybCA9IGFyZ3MucmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3Muc2lsZW50X3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnJlZGlyZWN0X3VyaTtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1czogTm8gc2lsZW50X3JlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHNpbGVudF9yZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzLnJlZGlyZWN0X3VyaSA9IHVybDtcbiAgICAgICAgYXJncy5wcm9tcHQgPSBcIm5vbmVcIjtcbiAgICAgICAgYXJncy5yZXNwb25zZV90eXBlID0gYXJncy5yZXNwb25zZV90eXBlIHx8IHRoaXMuc2V0dGluZ3MucXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGU7XG4gICAgICAgIGFyZ3Muc2NvcGUgPSBhcmdzLnNjb3BlIHx8IFwib3BlbmlkXCI7XG4gICAgICAgIGFyZ3Muc2tpcFVzZXJJbmZvID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluU3RhcnQoYXJncywgdGhpcy5faWZyYW1lTmF2aWdhdG9yLCB7XG4gICAgICAgICAgICBzdGFydFVybDogdXJsLFxuICAgICAgICAgICAgc2lsZW50UmVxdWVzdFRpbWVvdXQ6IGFyZ3Muc2lsZW50UmVxdWVzdFRpbWVvdXQgfHwgdGhpcy5zZXR0aW5ncy5zaWxlbnRSZXF1ZXN0VGltZW91dFxuICAgICAgICB9KS50aGVuKG5hdlJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NTaWduaW5SZXNwb25zZShuYXZSZXNwb25zZS51cmwpLnRoZW4oc2lnbmluUmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1czogZ290IHNpZ25pbiByZXNwb25zZVwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChzaWduaW5SZXNwb25zZS5zZXNzaW9uX3N0YXRlICYmIHNpZ25pblJlc3BvbnNlLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzOiBxdWVyeVNlc3Npb25TdGF0dXMgc3VjY2VzcyBmb3Igc3ViOiBcIiwgIHNpZ25pblJlc3BvbnNlLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25fc3RhdGU6IHNpZ25pblJlc3BvbnNlLnNlc3Npb25fc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWI6IHNpZ25pblJlc3BvbnNlLnByb2ZpbGUuc3ViLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2lkOiBzaWduaW5SZXNwb25zZS5wcm9maWxlLnNpZFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJxdWVyeVNlc3Npb25TdGF0dXMgc3VjY2Vzc2Z1bCwgdXNlciBub3QgYXV0aGVudGljYXRlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVyci5zZXNzaW9uX3N0YXRlICYmIHRoaXMuc2V0dGluZ3MubW9uaXRvckFub255bW91c1Nlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5tZXNzYWdlID09IFwibG9naW5fcmVxdWlyZWRcIiB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID09IFwiY29uc2VudF9yZXF1aXJlZFwiIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPT0gXCJpbnRlcmFjdGlvbl9yZXF1aXJlZFwiIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPT0gXCJhY2NvdW50X3NlbGVjdGlvbl9yZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXM6IHF1ZXJ5U2Vzc2lvblN0YXR1cyBzdWNjZXNzIGZvciBhbm9ueW1vdXMgdXNlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbl9zdGF0ZTogZXJyLnNlc3Npb25fc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3NpZ25pbihhcmdzLCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5TdGFydChhcmdzLCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcykudGhlbihuYXZSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluRW5kKG5hdlJlc3BvbnNlLnVybCwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2lnbmluU3RhcnQoYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMgPSB7fSkge1xuXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IucHJlcGFyZShuYXZpZ2F0b3JQYXJhbXMpLnRoZW4oaGFuZGxlID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5TdGFydDogZ290IG5hdmlnYXRvciB3aW5kb3cgaGFuZGxlXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTaWduaW5SZXF1ZXN0KGFyZ3MpLnRoZW4oc2lnbmluUmVxdWVzdCA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pblN0YXJ0OiBnb3Qgc2lnbmluIHJlcXVlc3RcIik7XG5cbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3JQYXJhbXMudXJsID0gc2lnbmluUmVxdWVzdC51cmw7XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yUGFyYW1zLmlkID0gc2lnbmluUmVxdWVzdC5zdGF0ZS5pZDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUubmF2aWdhdGUobmF2aWdhdG9yUGFyYW1zKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZS5jbG9zZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluU3RhcnQ6IEVycm9yIGFmdGVyIHByZXBhcmluZyBuYXZpZ2F0b3IsIGNsb3NpbmcgbmF2aWdhdG9yIHdpbmRvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NpZ25pbkVuZCh1cmwsIGFyZ3MgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzU2lnbmluUmVzcG9uc2UodXJsKS50aGVuKHNpZ25pblJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5FbmQ6IGdvdCBzaWduaW4gcmVzcG9uc2VcIik7XG5cbiAgICAgICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIoc2lnbmluUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBpZiAoYXJncy5jdXJyZW50X3N1Yikge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmN1cnJlbnRfc3ViICE9PSB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5FbmQ6IGN1cnJlbnQgdXNlciBkb2VzIG5vdCBtYXRjaCB1c2VyIHJldHVybmVkIGZyb20gc2lnbmluLiBzdWIgZnJvbSBzaWduaW46IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImxvZ2luX3JlcXVpcmVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5FbmQ6IGN1cnJlbnQgdXNlciBtYXRjaGVzIHVzZXIgcmV0dXJuZWQgZnJvbSBzaWduaW5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVVzZXIodXNlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pbkVuZDogdXNlciBzdG9yZWRcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubG9hZCh1c2VyKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2lnbmluQ2FsbGJhY2sodXJsLCBuYXZpZ2F0b3IpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pbkNhbGxiYWNrXCIpO1xuICAgICAgICBsZXQgdXNlUXVlcnkgPSB0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV9tb2RlID09PSBcInF1ZXJ5XCIgfHwgKCF0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV9tb2RlICYmIFNpZ25pblJlcXVlc3QuaXNDb2RlKHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX3R5cGUpKTtcbiAgICAgICAgbGV0IGRlbGltaXRlciA9IHVzZVF1ZXJ5ID8gXCI/XCIgOiBcIiNcIjtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5jYWxsYmFjayh1cmwsIHVuZGVmaW5lZCwgZGVsaW1pdGVyKTtcbiAgICB9XG5cbiAgICBzaWdub3V0UmVkaXJlY3QoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic286clwiO1xuICAgICAgICBsZXQgcG9zdExvZ291dFJlZGlyZWN0VXJpID0gYXJncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgICAgIGlmIChwb3N0TG9nb3V0UmVkaXJlY3RVcmkpe1xuICAgICAgICAgICAgYXJncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgPSBwb3N0TG9nb3V0UmVkaXJlY3RVcmk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5hdlBhcmFtcyA9IHtcbiAgICAgICAgICAgIHVzZVJlcGxhY2VUb05hdmlnYXRlIDogYXJncy51c2VSZXBsYWNlVG9OYXZpZ2F0ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbm91dFN0YXJ0KGFyZ3MsIHRoaXMuX3JlZGlyZWN0TmF2aWdhdG9yLCBuYXZQYXJhbXMpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbm91dFJlZGlyZWN0OiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2lnbm91dFJlZGlyZWN0Q2FsbGJhY2sodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWdub3V0RW5kKHVybCB8fCB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvci51cmwpLnRoZW4ocmVzcG9uc2U9PntcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbm91dFJlZGlyZWN0Q2FsbGJhY2s6IHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25vdXRQb3B1cChhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MucmVxdWVzdF90eXBlID0gXCJzbzpwXCI7XG4gICAgICAgIGxldCB1cmwgPSBhcmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnBvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgYXJncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgPSB1cmw7XG4gICAgICAgIGFyZ3MuZGlzcGxheSA9IFwicG9wdXBcIjtcbiAgICAgICAgaWYgKGFyZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpKXtcbiAgICAgICAgICAgIC8vIHdlJ3JlIHB1dHRpbmcgYSBkdW1teSBlbnRyeSBpbiBoZXJlIGJlY2F1c2Ugd2VcbiAgICAgICAgICAgIC8vIG5lZWQgYSB1bmlxdWUgaWQgZnJvbSB0aGUgc3RhdGUgZm9yIG5vdGlmaWNhdGlvblxuICAgICAgICAgICAgLy8gdG8gdGhlIHBhcmVudCB3aW5kb3csIHdoaWNoIGlzIG5lY2Vzc2FyeSBpZiB3ZVxuICAgICAgICAgICAgLy8gcGxhbiB0byByZXR1cm4gYmFjayB0byB0aGUgY2xpZW50IGFmdGVyIHNpZ25vdXRcbiAgICAgICAgICAgIC8vIGFuZCBzbyB3ZSBjYW4gY2xvc2UgdGhlIHBvcHVwIGFmdGVyIHNpZ25vdXRcbiAgICAgICAgICAgIGFyZ3Muc3RhdGUgPSBhcmdzLnN0YXRlIHx8IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25vdXQoYXJncywgdGhpcy5fcG9wdXBOYXZpZ2F0b3IsIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsOiB1cmwsXG4gICAgICAgICAgICBwb3B1cFdpbmRvd0ZlYXR1cmVzOiBhcmdzLnBvcHVwV2luZG93RmVhdHVyZXMgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cFdpbmRvd0ZlYXR1cmVzLFxuICAgICAgICAgICAgcG9wdXBXaW5kb3dUYXJnZXQ6IGFyZ3MucG9wdXBXaW5kb3dUYXJnZXQgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cFdpbmRvd1RhcmdldFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbm91dFBvcHVwOiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2lnbm91dFBvcHVwQ2FsbGJhY2sodXJsLCBrZWVwT3Blbikge1xuICAgICAgICBpZiAodHlwZW9mKGtlZXBPcGVuKSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mKHVybCkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAga2VlcE9wZW4gPSB1cmw7XG4gICAgICAgICAgICB1cmwgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRlbGltaXRlciA9ICc/JztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwTmF2aWdhdG9yLmNhbGxiYWNrKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25vdXRQb3B1cENhbGxiYWNrOiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfc2lnbm91dChhcmdzLCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWdub3V0U3RhcnQoYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMpLnRoZW4obmF2UmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25vdXRFbmQobmF2UmVzcG9uc2UudXJsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9zaWdub3V0U3RhcnQoYXJncyA9IHt9LCBuYXZpZ2F0b3IsIG5hdmlnYXRvclBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IucHJlcGFyZShuYXZpZ2F0b3JQYXJhbXMpLnRoZW4oaGFuZGxlID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IGdvdCBuYXZpZ2F0b3Igd2luZG93IGhhbmRsZVwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VyKCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiBsb2FkZWQgY3VycmVudCB1c2VyIGZyb20gc3RvcmFnZVwiKTtcblxuICAgICAgICAgICAgICAgIHZhciByZXZva2VQcm9taXNlID0gdGhpcy5fc2V0dGluZ3MucmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQgPyB0aGlzLl9yZXZva2VJbnRlcm5hbCh1c2VyKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXZva2VQcm9taXNlLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZF90b2tlbiA9IGFyZ3MuaWRfdG9rZW5faGludCB8fCB1c2VyICYmIHVzZXIuaWRfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZF90b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRTdGFydDogU2V0dGluZyBpZF90b2tlbiBpbnRvIHNpZ25vdXQgcmVxdWVzdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuaWRfdG9rZW5faGludCA9IGlkX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlVXNlcigpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRTdGFydDogdXNlciByZW1vdmVkLCBjcmVhdGluZyBzaWdub3V0IHJlcXVlc3RcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNpZ25vdXRSZXF1ZXN0KGFyZ3MpLnRoZW4oc2lnbm91dFJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IGdvdCBzaWdub3V0IHJlcXVlc3RcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3JQYXJhbXMudXJsID0gc2lnbm91dFJlcXVlc3QudXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaWdub3V0UmVxdWVzdC5zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3JQYXJhbXMuaWQgPSBzaWdub3V0UmVxdWVzdC5zdGF0ZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZS5uYXZpZ2F0ZShuYXZpZ2F0b3JQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlLmNsb3NlKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IEVycm9yIGFmdGVyIHByZXBhcmluZyBuYXZpZ2F0b3IsIGNsb3NpbmcgbmF2aWdhdG9yIHdpbmRvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NpZ25vdXRFbmQodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NTaWdub3V0UmVzcG9uc2UodXJsKS50aGVuKHNpZ25vdXRSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dEVuZDogZ290IHNpZ25vdXQgcmVzcG9uc2VcIik7XG5cbiAgICAgICAgICAgIHJldHVybiBzaWdub3V0UmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldm9rZUFjY2Vzc1Rva2VuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jldm9rZUludGVybmFsKHVzZXIsIHRydWUpLnRoZW4oc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIucmV2b2tlQWNjZXNzVG9rZW46IHJlbW92aW5nIHRva2VuIHByb3BlcnRpZXMgZnJvbSB1c2VyIGFuZCByZS1zdG9yaW5nXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHVzZXIuYWNjZXNzX3Rva2VuID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlci5yZWZyZXNoX3Rva2VuID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlci5leHBpcmVzX2F0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdXNlci50b2tlbl90eXBlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVVzZXIodXNlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5yZXZva2VBY2Nlc3NUb2tlbjogdXNlciBzdG9yZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubG9hZCh1c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIucmV2b2tlQWNjZXNzVG9rZW46IGFjY2VzcyB0b2tlbiByZXZva2VkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3Jldm9rZUludGVybmFsKHVzZXIsIHJlcXVpcmVkKSB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICB2YXIgYWNjZXNzX3Rva2VuID0gdXNlci5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICB2YXIgcmVmcmVzaF90b2tlbiA9IHVzZXIucmVmcmVzaF90b2tlbjtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jldm9rZUFjY2Vzc1Rva2VuSW50ZXJuYWwoYWNjZXNzX3Rva2VuLCByZXF1aXJlZClcbiAgICAgICAgICAgICAgICAudGhlbihhdFN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmV2b2tlUmVmcmVzaFRva2VuSW50ZXJuYWwocmVmcmVzaF90b2tlbiwgcmVxdWlyZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihydFN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXRTdWNjZXNzICYmICFydFN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIucmV2b2tlQWNjZXNzVG9rZW46IG5vIG5lZWQgdG8gcmV2b2tlIGR1ZSB0byBubyB0b2tlbihzKSwgb3IgSldUIGZvcm1hdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF0U3VjY2VzcyB8fCBydFN1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cblxuICAgIF9yZXZva2VBY2Nlc3NUb2tlbkludGVybmFsKGFjY2Vzc190b2tlbiwgcmVxdWlyZWQpIHtcbiAgICAgICAgLy8gY2hlY2sgZm9yIEpXVCB2cy4gcmVmZXJlbmNlIHRva2VuXG4gICAgICAgIGlmICghYWNjZXNzX3Rva2VuIHx8IGFjY2Vzc190b2tlbi5pbmRleE9mKCcuJykgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fdG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZShhY2Nlc3NfdG9rZW4sIHJlcXVpcmVkKS50aGVuKCgpID0+IHRydWUpO1xuICAgIH1cblxuICAgIF9yZXZva2VSZWZyZXNoVG9rZW5JbnRlcm5hbChyZWZyZXNoX3Rva2VuLCByZXF1aXJlZCkge1xuICAgICAgICBpZiAoIXJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2UocmVmcmVzaF90b2tlbiwgcmVxdWlyZWQsIFwicmVmcmVzaF90b2tlblwiKS50aGVuKCgpID0+IHRydWUpO1xuICAgIH1cblxuICAgIHN0YXJ0U2lsZW50UmVuZXcoKSB7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3U2VydmljZS5zdGFydCgpO1xuICAgIH1cblxuICAgIHN0b3BTaWxlbnRSZW5ldygpIHtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdTZXJ2aWNlLnN0b3AoKTtcbiAgICB9XG5cbiAgICBnZXQgX3VzZXJTdG9yZUtleSgpIHtcbiAgICAgICAgcmV0dXJuIGB1c2VyOiR7dGhpcy5zZXR0aW5ncy5hdXRob3JpdHl9OiR7dGhpcy5zZXR0aW5ncy5jbGllbnRfaWR9YDtcbiAgICB9XG5cbiAgICBfbG9hZFVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyU3RvcmUuZ2V0KHRoaXMuX3VzZXJTdG9yZUtleSkudGhlbihzdG9yYWdlU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGlmIChzdG9yYWdlU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX2xvYWRVc2VyOiB1c2VyIHN0b3JhZ2VTdHJpbmcgbG9hZGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBVc2VyLmZyb21TdG9yYWdlU3RyaW5nKHN0b3JhZ2VTdHJpbmcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fbG9hZFVzZXI6IG5vIHVzZXIgc3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdG9yZVVzZXIodXNlcikge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuc3RvcmVVc2VyOiBzdG9yaW5nIHVzZXJcIik7XG5cbiAgICAgICAgICAgIHZhciBzdG9yYWdlU3RyaW5nID0gdXNlci50b1N0b3JhZ2VTdHJpbmcoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyU3RvcmUuc2V0KHRoaXMuX3VzZXJTdG9yZUtleSwgc3RvcmFnZVN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJzdG9yZVVzZXIuc3RvcmVVc2VyOiByZW1vdmluZyB1c2VyXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTdG9yZS5yZW1vdmUodGhpcy5fdXNlclN0b3JlS2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEFjY2Vzc1Rva2VuRXZlbnRzIH0gZnJvbSAnLi9BY2Nlc3NUb2tlbkV2ZW50cy5qcyc7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vRXZlbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgVXNlck1hbmFnZXJFdmVudHMgZXh0ZW5kcyBBY2Nlc3NUb2tlbkV2ZW50cyB7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuICAgICAgICBzdXBlcihzZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX3VzZXJMb2FkZWQgPSBuZXcgRXZlbnQoXCJVc2VyIGxvYWRlZFwiKTtcbiAgICAgICAgdGhpcy5fdXNlclVubG9hZGVkID0gbmV3IEV2ZW50KFwiVXNlciB1bmxvYWRlZFwiKTtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdFcnJvciA9IG5ldyBFdmVudChcIlNpbGVudCByZW5ldyBlcnJvclwiKTtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZEluID0gbmV3IEV2ZW50KFwiVXNlciBzaWduZWQgaW5cIik7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRPdXQgPSBuZXcgRXZlbnQoXCJVc2VyIHNpZ25lZCBvdXRcIik7XG4gICAgICAgIHRoaXMuX3VzZXJTZXNzaW9uQ2hhbmdlZCA9IG5ldyBFdmVudChcIlVzZXIgc2Vzc2lvbiBjaGFuZ2VkXCIpO1xuICAgIH1cblxuICAgIGxvYWQodXNlciwgcmFpc2VFdmVudD10cnVlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLmxvYWRcIik7XG4gICAgICAgIHN1cGVyLmxvYWQodXNlcik7XG4gICAgICAgIGlmIChyYWlzZUV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyTG9hZGVkLnJhaXNlKHVzZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVubG9hZCgpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXJFdmVudHMudW5sb2FkXCIpO1xuICAgICAgICBzdXBlci51bmxvYWQoKTtcbiAgICAgICAgdGhpcy5fdXNlclVubG9hZGVkLnJhaXNlKCk7XG4gICAgfVxuXG4gICAgYWRkVXNlckxvYWRlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyTG9hZGVkLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVVc2VyTG9hZGVkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJMb2FkZWQucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuXG4gICAgYWRkVXNlclVubG9hZGVkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJVbmxvYWRlZC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlclVubG9hZGVkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJVbmxvYWRlZC5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG5cbiAgICBhZGRTaWxlbnRSZW5ld0Vycm9yKGNiKSB7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3RXJyb3IuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZVNpbGVudFJlbmV3RXJyb3IoY2IpIHtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdFcnJvci5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgX3JhaXNlU2lsZW50UmVuZXdFcnJvcihlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLl9yYWlzZVNpbGVudFJlbmV3RXJyb3JcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fc2lsZW50UmVuZXdFcnJvci5yYWlzZShlKTtcbiAgICB9XG5cbiAgICBhZGRVc2VyU2lnbmVkSW4oY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZEluLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVVc2VyU2lnbmVkSW4oY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZEluLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICBfcmFpc2VVc2VyU2lnbmVkSW4oKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLl9yYWlzZVVzZXJTaWduZWRJblwiKTtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZEluLnJhaXNlKCk7XG4gICAgfVxuXG4gICAgYWRkVXNlclNpZ25lZE91dChjYikge1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkT3V0LmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVVc2VyU2lnbmVkT3V0KGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRPdXQucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuICAgIF9yYWlzZVVzZXJTaWduZWRPdXQoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLl9yYWlzZVVzZXJTaWduZWRPdXRcIik7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRPdXQucmFpc2UoKTtcbiAgICB9XG5cbiAgICBhZGRVc2VyU2Vzc2lvbkNoYW5nZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNlc3Npb25DaGFuZ2VkLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVVc2VyU2Vzc2lvbkNoYW5nZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNlc3Npb25DaGFuZ2VkLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICBfcmFpc2VVc2VyU2Vzc2lvbkNoYW5nZWQoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLl9yYWlzZVVzZXJTZXNzaW9uQ2hhbmdlZFwiKTtcbiAgICAgICAgdGhpcy5fdXNlclNlc3Npb25DaGFuZ2VkLnJhaXNlKCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudFNldHRpbmdzIH0gZnJvbSAnLi9PaWRjQ2xpZW50U2V0dGluZ3MuanMnO1xuaW1wb3J0IHsgUmVkaXJlY3ROYXZpZ2F0b3IgfSBmcm9tICcuL1JlZGlyZWN0TmF2aWdhdG9yLmpzJztcbmltcG9ydCB7IFBvcHVwTmF2aWdhdG9yIH0gZnJvbSAnLi9Qb3B1cE5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBJRnJhbWVOYXZpZ2F0b3IgfSBmcm9tICcuL0lGcmFtZU5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBXZWJTdG9yYWdlU3RhdGVTdG9yZSB9IGZyb20gJy4vV2ViU3RvcmFnZVN0YXRlU3RvcmUuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0IHsgU2lnbmluUmVxdWVzdCB9IGZyb20gJy4vU2lnbmluUmVxdWVzdC5qcyc7XG5cbmNvbnN0IERlZmF1bHRBY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IDYwO1xuY29uc3QgRGVmYXVsdENoZWNrU2Vzc2lvbkludGVydmFsID0gMjAwMDtcblxuZXhwb3J0IGNsYXNzIFVzZXJNYW5hZ2VyU2V0dGluZ3MgZXh0ZW5kcyBPaWRjQ2xpZW50U2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgcG9wdXBfcmVkaXJlY3RfdXJpLFxuICAgICAgICBwb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmksXG4gICAgICAgIHBvcHVwV2luZG93RmVhdHVyZXMsXG4gICAgICAgIHBvcHVwV2luZG93VGFyZ2V0LFxuICAgICAgICBzaWxlbnRfcmVkaXJlY3RfdXJpLFxuICAgICAgICBzaWxlbnRSZXF1ZXN0VGltZW91dCxcbiAgICAgICAgYXV0b21hdGljU2lsZW50UmVuZXcgPSBmYWxzZSxcbiAgICAgICAgdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3ID0gZmFsc2UsXG4gICAgICAgIGluY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyA9IHRydWUsXG4gICAgICAgIG1vbml0b3JTZXNzaW9uID0gdHJ1ZSxcbiAgICAgICAgbW9uaXRvckFub255bW91c1Nlc3Npb24gPSBmYWxzZSxcbiAgICAgICAgY2hlY2tTZXNzaW9uSW50ZXJ2YWwgPSBEZWZhdWx0Q2hlY2tTZXNzaW9uSW50ZXJ2YWwsXG4gICAgICAgIHN0b3BDaGVja1Nlc3Npb25PbkVycm9yID0gdHJ1ZSxcbiAgICAgICAgcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUsXG4gICAgICAgIHJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0ID0gZmFsc2UsXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lID0gRGVmYXVsdEFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lLFxuICAgICAgICByZWRpcmVjdE5hdmlnYXRvciA9IG5ldyBSZWRpcmVjdE5hdmlnYXRvcigpLFxuICAgICAgICBwb3B1cE5hdmlnYXRvciA9IG5ldyBQb3B1cE5hdmlnYXRvcigpLFxuICAgICAgICBpZnJhbWVOYXZpZ2F0b3IgPSBuZXcgSUZyYW1lTmF2aWdhdG9yKCksXG4gICAgICAgIHVzZXJTdG9yZSA9IG5ldyBXZWJTdG9yYWdlU3RhdGVTdG9yZSh7IHN0b3JlOiBHbG9iYWwuc2Vzc2lvblN0b3JhZ2UgfSlcbiAgICB9ID0ge30pIHtcbiAgICAgICAgc3VwZXIoYXJndW1lbnRzWzBdKTtcblxuICAgICAgICB0aGlzLl9wb3B1cF9yZWRpcmVjdF91cmkgPSBwb3B1cF9yZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX3BvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSA9IHBvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fcG9wdXBXaW5kb3dGZWF0dXJlcyA9IHBvcHVwV2luZG93RmVhdHVyZXM7XG4gICAgICAgIHRoaXMuX3BvcHVwV2luZG93VGFyZ2V0ID0gcG9wdXBXaW5kb3dUYXJnZXQ7XG5cbiAgICAgICAgdGhpcy5fc2lsZW50X3JlZGlyZWN0X3VyaSA9IHNpbGVudF9yZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlcXVlc3RUaW1lb3V0ID0gc2lsZW50UmVxdWVzdFRpbWVvdXQ7XG4gICAgICAgIHRoaXMuX2F1dG9tYXRpY1NpbGVudFJlbmV3ID0gYXV0b21hdGljU2lsZW50UmVuZXc7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldyA9IHZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldztcbiAgICAgICAgdGhpcy5faW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3ID0gaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3O1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IGFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lO1xuXG4gICAgICAgIHRoaXMuX21vbml0b3JTZXNzaW9uID0gbW9uaXRvclNlc3Npb247XG4gICAgICAgIHRoaXMuX21vbml0b3JBbm9ueW1vdXNTZXNzaW9uID0gbW9uaXRvckFub255bW91c1Nlc3Npb247XG4gICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbkludGVydmFsID0gY2hlY2tTZXNzaW9uSW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yID0gc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3I7XG4gICAgICAgIGlmIChxdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUgPSBxdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAoYXJndW1lbnRzWzBdICYmIGFyZ3VtZW50c1swXS5yZXNwb25zZV90eXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSA9IFNpZ25pblJlcXVlc3QuaXNPaWRjKGFyZ3VtZW50c1swXS5yZXNwb25zZV90eXBlKSA/IFwiaWRfdG9rZW5cIiA6IFwiY29kZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUgPSBcImlkX3Rva2VuXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQgPSByZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dDtcblxuICAgICAgICB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvciA9IHJlZGlyZWN0TmF2aWdhdG9yO1xuICAgICAgICB0aGlzLl9wb3B1cE5hdmlnYXRvciA9IHBvcHVwTmF2aWdhdG9yO1xuICAgICAgICB0aGlzLl9pZnJhbWVOYXZpZ2F0b3IgPSBpZnJhbWVOYXZpZ2F0b3I7XG5cbiAgICAgICAgdGhpcy5fdXNlclN0b3JlID0gdXNlclN0b3JlO1xuICAgIH1cblxuICAgIGdldCBwb3B1cF9yZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3B1cF9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBwb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBwb3B1cFdpbmRvd0ZlYXR1cmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBXaW5kb3dGZWF0dXJlcztcbiAgICB9XG4gICAgZ2V0IHBvcHVwV2luZG93VGFyZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBXaW5kb3dUYXJnZXQ7XG4gICAgfVxuXG4gICAgZ2V0IHNpbGVudF9yZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWxlbnRfcmVkaXJlY3RfdXJpO1xuICAgIH1cbiAgICAgZ2V0IHNpbGVudFJlcXVlc3RUaW1lb3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lsZW50UmVxdWVzdFRpbWVvdXQ7XG4gICAgfVxuICAgIGdldCBhdXRvbWF0aWNTaWxlbnRSZW5ldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9tYXRpY1NpbGVudFJlbmV3O1xuICAgIH1cbiAgICBnZXQgdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3O1xuICAgIH1cbiAgICBnZXQgaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3O1xuICAgIH1cbiAgICBnZXQgYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZTtcbiAgICB9XG5cbiAgICBnZXQgbW9uaXRvclNlc3Npb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb25pdG9yU2Vzc2lvbjtcbiAgICB9XG4gICAgZ2V0IG1vbml0b3JBbm9ueW1vdXNTZXNzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvckFub255bW91c1Nlc3Npb247XG4gICAgfVxuICAgIGdldCBjaGVja1Nlc3Npb25JbnRlcnZhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrU2Vzc2lvbkludGVydmFsO1xuICAgIH1cbiAgICBnZXQgc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yO1xuICAgIH1cbiAgICBnZXQgcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlO1xuICAgIH1cbiAgICBnZXQgcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dDtcbiAgICB9XG5cbiAgICBnZXQgcmVkaXJlY3ROYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvcjtcbiAgICB9XG4gICAgZ2V0IHBvcHVwTmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBOYXZpZ2F0b3I7XG4gICAgfVxuICAgIGdldCBpZnJhbWVOYXZpZ2F0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZnJhbWVOYXZpZ2F0b3I7XG4gICAgfVxuXG4gICAgZ2V0IHVzZXJTdG9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTdG9yZTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBXZWJTdG9yYWdlU3RhdGVTdG9yZSB7XG4gICAgY29uc3RydWN0b3Ioe3ByZWZpeCA9IFwib2lkYy5cIiwgc3RvcmUgPSBHbG9iYWwubG9jYWxTdG9yYWdlfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XG4gICAgICAgIHRoaXMuX3ByZWZpeCA9IHByZWZpeDtcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJXZWJTdG9yYWdlU3RhdGVTdG9yZS5zZXRcIiwga2V5KTtcblxuICAgICAgICBrZXkgPSB0aGlzLl9wcmVmaXggKyBrZXk7XG5cbiAgICAgICAgdGhpcy5fc3RvcmUuc2V0SXRlbShrZXksIHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBMb2cuZGVidWcoXCJXZWJTdG9yYWdlU3RhdGVTdG9yZS5nZXRcIiwga2V5KTtcblxuICAgICAgICBrZXkgPSB0aGlzLl9wcmVmaXggKyBrZXk7XG5cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9zdG9yZS5nZXRJdGVtKGtleSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpdGVtKTtcbiAgICB9XG5cbiAgICByZW1vdmUoa2V5KSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIldlYlN0b3JhZ2VTdGF0ZVN0b3JlLnJlbW92ZVwiLCBrZXkpO1xuXG4gICAgICAgIGtleSA9IHRoaXMuX3ByZWZpeCArIGtleTtcblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX3N0b3JlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgdGhpcy5fc3RvcmUucmVtb3ZlSXRlbShrZXkpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaXRlbSk7XG4gICAgfVxuXG4gICAgZ2V0QWxsS2V5cygpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiV2ViU3RvcmFnZVN0YXRlU3RvcmUuZ2V0QWxsS2V5c1wiKTtcblxuICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9zdG9yZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLl9zdG9yZS5rZXkoaW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAoa2V5LmluZGV4T2YodGhpcy5fcHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkuc3Vic3RyKHRoaXMuX3ByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5cyk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgYW4gUkZDNDEyMiB2ZXJzaW9uIDQgZ3VpZCAod2l0aG91dCBkYXNoZXMpIGZyb20gYSBDU1BSTkcuXG4gKlxuICogc3RhdGUsIG5vbmNlIGFuZCB0aGUgUEtDRSBjb2RlX3ZlcmlmaWVyIGFyZSBidWlsdCBmcm9tIHRoaXMgdmFsdWUsIHNvIHRoZXJlIGlzXG4gKiBkZWxpYmVyYXRlbHkgbm8gTWF0aC5yYW5kb20gZmFsbGJhY2s6IHdpdGhvdXQgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB0aGlzIHRocm93cy5cbiAqL1xuXG5mdW5jdGlvbiBnZXRDcnlwdG8oKSB7XG4gICAgLy8gUmVzb2x2ZWQgb24gZXZlcnkgY2FsbCBzbyBhIHBvbHlmaWxsIGxvYWRlZCBhZnRlciB0aGlzIG1vZHVsZSBpcyBzdGlsbCBwaWNrZWQgdXBcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKSkge1xuICAgICAgICByZXR1cm4gd2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG87XG4gICAgfVxuICAgIC8vIHdvcmtlcnMsIE5vZGUgPj0gMTksIFJlYWN0IE5hdGl2ZSB3aXRoIGEgZ2V0UmFuZG9tVmFsdWVzIHBvbHlmaWxsXG4gICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzLmNyeXB0bykge1xuICAgICAgICByZXR1cm4gZ2xvYmFsVGhpcy5jcnlwdG87XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VjdXJlVXVpZChjcnlwdG8pIHtcbiAgICBpZiAoIWNyeXB0byB8fCB0eXBlb2YgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIGlzIG5vdCBhdmFpbGFibGU7IHNlY3VyZSByYW5kb20gZ2VuZXJhdGlvbiBpcyByZXF1aXJlZCBmb3IgT0lEQ1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZywgYyA9PlxuICAgICAgICAoYyBeIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgMTUgPj4gYyAvIDQpLnRvU3RyaW5nKDE2KVxuICAgICkucmVwbGFjZSgvLS9nLCAnJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbSgpIHtcbiAgICByZXR1cm4gc2VjdXJlVXVpZChnZXRDcnlwdG8oKSk7XG59XG4iLCJjb25zdCBWZXJzaW9uID0gXCIxLjExLjVcIjsgZXhwb3J0IHtWZXJzaW9ufTsiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKmdsb2JhbHMgd2luZG93LCBnbG9iYWwsIHJlcXVpcmUqL1xuXG5cdC8qKlxuXHQgKiBDcnlwdG9KUyBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHR2YXIgQ3J5cHRvSlMgPSBDcnlwdG9KUyB8fCAoZnVuY3Rpb24gKE1hdGgsIHVuZGVmaW5lZCkge1xuXG5cdCAgICB2YXIgY3J5cHRvO1xuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gd2luZG93IChCcm93c2VyKVxuXHQgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSB3aW5kb3cuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGluIHdlYiB3b3JrZXIgKEJyb3dzZXIpXG5cdCAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gc2VsZi5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSB3b3JrZXJcblx0ICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBnbG9iYWxUaGlzLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIChleHBlcmltZW50YWwgSUUgMTEpIGNyeXB0byBmcm9tIHdpbmRvdyAoQnJvd3Nlcilcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5tc0NyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHdpbmRvdy5tc0NyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIGdsb2JhbCAoTm9kZUpTKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IGdsb2JhbC5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gaW1wb3J0IHZpYSByZXF1aXJlIChOb2RlSlMpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXHQgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgIH1cblxuXHQgICAgLypcblx0ICAgICAqIENyeXB0b2dyYXBoaWNhbGx5IHNlY3VyZSBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvclxuXHQgICAgICpcblx0ICAgICAqIEFzIE1hdGgucmFuZG9tKCkgaXMgY3J5cHRvZ3JhcGhpY2FsbHkgbm90IHNhZmUgdG8gdXNlXG5cdCAgICAgKi9cblx0ICAgIHZhciBjcnlwdG9TZWN1cmVSYW5kb21JbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKGNyeXB0bykge1xuXHQgICAgICAgICAgICAvLyBVc2UgZ2V0UmFuZG9tVmFsdWVzIG1ldGhvZCAoQnJvd3Nlcilcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSgxKSlbMF07XG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBVc2UgcmFuZG9tQnl0ZXMgbWV0aG9kIChOb2RlSlMpXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvLnJhbmRvbUJ5dGVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoNCkucmVhZEludDMyTEUoKTtcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHRocm93IG5ldyBFcnJvcignTmF0aXZlIGNyeXB0byBtb2R1bGUgY291bGQgbm90IGJlIHVzZWQgdG8gZ2V0IHNlY3VyZSByYW5kb20gbnVtYmVyLicpO1xuXHQgICAgfTtcblxuXHQgICAgLypcblx0ICAgICAqIExvY2FsIHBvbHlmaWxsIG9mIE9iamVjdC5jcmVhdGVcblxuXHQgICAgICovXG5cdCAgICB2YXIgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuXG5cdCAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcblx0ICAgICAgICAgICAgdmFyIHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvYmo7XG5cblx0ICAgICAgICAgICAgc3VidHlwZSA9IG5ldyBGKCk7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBudWxsO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIENyeXB0b0pTIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMaWJyYXJ5IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfbGliID0gQy5saWIgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBCYXNlIG9iamVjdCBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlID0gKGZ1bmN0aW9uICgpIHtcblxuXG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyBQcm9wZXJ0aWVzIHRvIGNvcHkgaW50byB0aGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZScsXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICAgICAgbWV0aG9kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBleHRlbmQ6IGZ1bmN0aW9uIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNwYXduXG5cdCAgICAgICAgICAgICAgICB2YXIgc3VidHlwZSA9IGNyZWF0ZSh0aGlzKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQXVnbWVudFxuXHQgICAgICAgICAgICAgICAgaWYgKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUubWl4SW4ob3ZlcnJpZGVzKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGRlZmF1bHQgaW5pdGlhbGl6ZXJcblx0ICAgICAgICAgICAgICAgIGlmICghc3VidHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5pdCcpIHx8IHRoaXMuaW5pdCA9PT0gc3VidHlwZS5pbml0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZXIncyBwcm90b3R5cGUgaXMgdGhlIHN1YnR5cGUgb2JqZWN0XG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQucHJvdG90eXBlID0gc3VidHlwZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVmZXJlbmNlIHN1cGVydHlwZVxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIgPSB0aGlzO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogRXh0ZW5kcyB0aGlzIG9iamVjdCBhbmQgcnVucyB0aGUgaW5pdCBtZXRob2QuXG5cdCAgICAgICAgICAgICAqIEFyZ3VtZW50cyB0byBjcmVhdGUoKSB3aWxsIGJlIHBhc3NlZCB0byBpbml0KCkuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBpbnN0YW5jZSA9IE15VHlwZS5jcmVhdGUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5leHRlbmQoKTtcblx0ICAgICAgICAgICAgICAgIGluc3RhbmNlLmluaXQuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG9iamVjdC5cblx0ICAgICAgICAgICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gYWRkIHNvbWUgbG9naWMgd2hlbiB5b3VyIG9iamVjdHMgYXJlIGNyZWF0ZWQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgICAgIC8vIC4uLlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDb3BpZXMgcHJvcGVydGllcyBpbnRvIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0byBtaXggaW4uXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBNeVR5cGUubWl4SW4oe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnXG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIG1peEluOiBmdW5jdGlvbiAocHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIElFIHdvbid0IGNvcHkgdG9TdHJpbmcgdXNpbmcgdGhlIGxvb3AgYWJvdmVcblx0ICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd0b1N0cmluZycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b1N0cmluZyA9IHByb3BlcnRpZXMudG9TdHJpbmc7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGluc3RhbmNlLmNsb25lKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10pO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddLCA2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgd29yZCBhcnJheSB0byBhIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlciAoT3B0aW9uYWwpIFRoZSBlbmNvZGluZyBzdHJhdGVneSB0byB1c2UuIERlZmF1bHQ6IENyeXB0b0pTLmVuYy5IZXhcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZ2lmaWVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkgKyAnJztcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZygpO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKGVuY29kZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChlbmNvZGVyIHx8IEhleCkuc3RyaW5naWZ5KHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25jYXRlbmF0ZXMgYSB3b3JkIGFycmF5IHRvIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheTEuY29uY2F0KHdvcmRBcnJheTIpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbmNhdDogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHRoaXNXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0V29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGlzU2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHRoaXMuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb25jYXRcblx0ICAgICAgICAgICAgaWYgKHRoaXNTaWdCeXRlcyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIGJ5dGUgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoYXRTaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXRCeXRlID0gKHRoYXRXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBpKSA+Pj4gMl0gfD0gdGhhdEJ5dGUgPDwgKDI0IC0gKCh0aGlzU2lnQnl0ZXMgKyBpKSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSB3b3JkIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGF0U2lnQnl0ZXM7IGogKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaikgPj4+IDJdID0gdGhhdFdvcmRzW2ogPj4+IDJdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgKz0gdGhhdFNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVtb3ZlcyBpbnNpZ25pZmljYW50IGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsYW1wOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wXG5cdCAgICAgICAgICAgIHdvcmRzW3NpZ0J5dGVzID4+PiAyXSAmPSAweGZmZmZmZmZmIDw8ICgzMiAtIChzaWdCeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIHdvcmRzLmxlbmd0aCA9IE1hdGguY2VpbChzaWdCeXRlcyAvIDQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gd29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgd29yZCBhcnJheSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbkJ5dGVzIFRoZSBudW1iZXIgb2YgcmFuZG9tIGJ5dGVzIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcmFuZG9tIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbSgxNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmFuZG9tOiBmdW5jdGlvbiAobkJ5dGVzKSB7XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbkJ5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goY3J5cHRvU2VjdXJlUmFuZG9tSW50KCkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbkJ5dGVzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBFbmNvZGVyIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBIZXggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGV4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLkhleC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGhleENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgJiAweDBmKS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhleENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleFN0ciBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChoZXhTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhleFN0ckxlbmd0aCA9IGhleFN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZXhTdHJMZW5ndGg7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gM10gfD0gcGFyc2VJbnQoaGV4U3RyLnN1YnN0cihpLCAyKSwgMTYpIDw8ICgyNCAtIChpICUgOCkgKiA0KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGhleFN0ckxlbmd0aCAvIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGF0aW4xIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgTGF0aW4xID0gQ19lbmMuTGF0aW4xID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGxhdGluMVN0cmluZyA9IENyeXB0b0pTLmVuYy5MYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGxhdGluMUNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiaXRlKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbGF0aW4xQ2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgTGF0aW4xIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF0aW4xU3RyIFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5MYXRpbjEucGFyc2UobGF0aW4xU3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGxhdGluMVN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xU3RyTGVuZ3RoID0gbGF0aW4xU3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGluMVN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSAobGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBsYXRpbjFTdHJMZW5ndGgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmOCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmOFN0cmluZyA9IENyeXB0b0pTLmVuYy5VdGY4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpKSk7XG5cdCAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIFVURi04IGRhdGEnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi04IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmOFN0ciBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHV0ZjhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmOFN0cikge1xuXHQgICAgICAgICAgICByZXR1cm4gTGF0aW4xLnBhcnNlKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh1dGY4U3RyKSkpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYnVmZmVyZWQgYmxvY2sgYWxnb3JpdGhtIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIFRoZSBwcm9wZXJ0eSBibG9ja1NpemUgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbiBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9taW5CdWZmZXJTaXplIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgc2hvdWxkIGJlIGtlcHQgdW5wcm9jZXNzZWQgaW4gdGhlIGJ1ZmZlci4gRGVmYXVsdDogMFxuXHQgICAgICovXG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgZGF0YSBidWZmZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFdvcmRBcnJheS5pbml0KCk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIG5ldyBkYXRhIHRvIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgYnVmZmVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGFwcGVuZC4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvIGEgV29yZEFycmF5IHVzaW5nIFVURi04LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEgPSBVdGY4LnBhcnNlKGRhdGEpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEuY29uY2F0KGRhdGEpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzICs9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFByb2Nlc3NlcyBhdmFpbGFibGUgZGF0YSBibG9ja3MuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIF9kb1Byb2Nlc3NCbG9jayhvZmZzZXQpLCB3aGljaCBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9GbHVzaCBXaGV0aGVyIGFsbCBibG9ja3MgYW5kIHBhcnRpYWwgYmxvY2tzIHNob3VsZCBiZSBwcm9jZXNzZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwcm9jZXNzZWQgZGF0YS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCk7XG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcyghISdmbHVzaCcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wcm9jZXNzOiBmdW5jdGlvbiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkV29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgcHJvY2Vzc2VkV29yZHMgPSBkYXRhV29yZHMuc3BsaWNlKDAsIG5Xb3Jkc1JlYWR5KTtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gbkJ5dGVzUmVhZHk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQocHJvY2Vzc2VkV29yZHMsIG5CeXRlc1JlYWR5KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2RhdGEgPSB0aGlzLl9kYXRhLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWluQnVmZmVyU2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgaGFzaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBoYXNoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDE2ICg1MTIgYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlciA9IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCgpLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaGVyID0gQ3J5cHRvSlMuYWxnby5TSEEyNTYuY3JlYXRlKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBoYXNoZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGRhdGEgYnVmZmVyXG5cdCAgICAgICAgICAgIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB0aGlzLl9kb1Jlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBoYXNoZXIgd2l0aCBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgVGhlIG1lc3NhZ2UgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7SGFzaGVyfSBUaGlzIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaGFzaFxuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBtZXNzYWdlIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9kb0ZpbmFsaXplKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNTEyLzMyLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIGEgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIFNIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGNmZykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBoYXNoZXIuaW5pdChjZmcpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZSBpbiB0aGlzIEhNQUMgaGVscGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEhtYWNTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSG1hY0hlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDX2FsZ28uSE1BQy5pbml0KGhhc2hlciwga2V5KS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbGdvcml0aG0gbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvID0ge307XG5cblx0ICAgIHJldHVybiBDO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2U2NCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2U2NCA9IENfZW5jLkJhc2U2NCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBCYXNlNjQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBiYXNlNjRTdHJpbmcgPSBDcnlwdG9KUy5lbmMuQmFzZTY0LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAgd29yZEFycmF5LmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgYmFzZTY0Q2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSArPSAzKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTEgPSAod29yZHNbaSA+Pj4gMl0gICAgICAgPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgICAgICAgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUyID0gKHdvcmRzWyhpICsgMSkgPj4+IDJdID4+PiAoMjQgLSAoKGkgKyAxKSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMyA9ICh3b3Jkc1soaSArIDIpID4+PiAyXSA+Pj4gKDI0IC0gKChpICsgMikgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0cmlwbGV0ID0gKGJ5dGUxIDw8IDE2KSB8IChieXRlMiA8PCA4KSB8IGJ5dGUzO1xuXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgKGogPCA0KSAmJiAoaSArIGogKiAwLjc1IDwgc2lnQnl0ZXMpOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBiYXNlNjRDaGFycy5wdXNoKG1hcC5jaGFyQXQoKHRyaXBsZXQgPj4+ICg2ICogKDMgLSBqKSkpICYgMHgzZikpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdDaGFyID0gbWFwLmNoYXJBdCg2NCk7XG5cdCAgICAgICAgICAgIGlmIChwYWRkaW5nQ2hhcikge1xuXHQgICAgICAgICAgICAgICAgd2hpbGUgKGJhc2U2NENoYXJzLmxlbmd0aCAlIDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBiYXNlNjRDaGFycy5wdXNoKHBhZGRpbmdDaGFyKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBiYXNlNjRDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBCYXNlNjQgc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlNjRTdHIgVGhlIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkJhc2U2NC5wYXJzZShiYXNlNjRTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoYmFzZTY0U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgYmFzZTY0U3RyTGVuZ3RoID0gYmFzZTY0U3RyLmxlbmd0aDtcblx0ICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblx0ICAgICAgICAgICAgdmFyIHJldmVyc2VNYXAgPSB0aGlzLl9yZXZlcnNlTWFwO1xuXG5cdCAgICAgICAgICAgIGlmICghcmV2ZXJzZU1hcCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldmVyc2VNYXAgPSB0aGlzLl9yZXZlcnNlTWFwID0gW107XG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtYXAubGVuZ3RoOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZU1hcFttYXAuY2hhckNvZGVBdChqKV0gPSBqO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIElnbm9yZSBwYWRkaW5nXG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nQ2hhciA9IG1hcC5jaGFyQXQoNjQpO1xuXHQgICAgICAgICAgICBpZiAocGFkZGluZ0NoYXIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBwYWRkaW5nSW5kZXggPSBiYXNlNjRTdHIuaW5kZXhPZihwYWRkaW5nQ2hhcik7XG5cdCAgICAgICAgICAgICAgICBpZiAocGFkZGluZ0luZGV4ICE9PSAtMSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NFN0ckxlbmd0aCA9IHBhZGRpbmdJbmRleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgcmV0dXJuIHBhcnNlTG9vcChiYXNlNjRTdHIsIGJhc2U2NFN0ckxlbmd0aCwgcmV2ZXJzZU1hcCk7XG5cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21hcDogJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89J1xuXHQgICAgfTtcblxuXHQgICAgZnVuY3Rpb24gcGFyc2VMb29wKGJhc2U2NFN0ciwgYmFzZTY0U3RyTGVuZ3RoLCByZXZlcnNlTWFwKSB7XG5cdCAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICB2YXIgbkJ5dGVzID0gMDtcblx0ICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXNlNjRTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgaWYgKGkgJSA0KSB7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHMxID0gcmV2ZXJzZU1hcFtiYXNlNjRTdHIuY2hhckNvZGVBdChpIC0gMSldIDw8ICgoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHMyID0gcmV2ZXJzZU1hcFtiYXNlNjRTdHIuY2hhckNvZGVBdChpKV0gPj4+ICg2IC0gKGkgJSA0KSAqIDIpO1xuXHQgICAgICAgICAgICAgIHZhciBiaXRzQ29tYmluZWQgPSBiaXRzMSB8IGJpdHMyO1xuXHQgICAgICAgICAgICAgIHdvcmRzW25CeXRlcyA+Pj4gMl0gfD0gYml0c0NvbWJpbmVkIDw8ICgyNCAtIChuQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgIG5CeXRlcysrO1xuXHQgICAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiBXb3JkQXJyYXkuY3JlYXRlKHdvcmRzLCBuQnl0ZXMpO1xuXHQgICAgfVxuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLmVuYy5CYXNlNjQ7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdHJldHVybiBDcnlwdG9KUy5lbmMuSGV4O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBJbml0aWFsaXphdGlvbiBhbmQgcm91bmQgY29uc3RhbnRzIHRhYmxlc1xuXHQgICAgdmFyIEggPSBbXTtcblx0ICAgIHZhciBLID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgY29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIGlzUHJpbWUobikge1xuXHQgICAgICAgICAgICB2YXIgc3FydE4gPSBNYXRoLnNxcnQobik7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGZhY3RvciA9IDI7IGZhY3RvciA8PSBzcXJ0TjsgZmFjdG9yKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmICghKG4gJSBmYWN0b3IpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZnVuY3Rpb24gZ2V0RnJhY3Rpb25hbEJpdHMobikge1xuXHQgICAgICAgICAgICByZXR1cm4gKChuIC0gKG4gfCAwKSkgKiAweDEwMDAwMDAwMCkgfCAwO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBuID0gMjtcblx0ICAgICAgICB2YXIgblByaW1lID0gMDtcblx0ICAgICAgICB3aGlsZSAoblByaW1lIDwgNjQpIHtcblx0ICAgICAgICAgICAgaWYgKGlzUHJpbWUobikpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChuUHJpbWUgPCA4KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgSFtuUHJpbWVdID0gZ2V0RnJhY3Rpb25hbEJpdHMoTWF0aC5wb3cobiwgMSAvIDIpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIEtbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAzKSk7XG5cblx0ICAgICAgICAgICAgICAgIG5QcmltZSsrO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgbisrO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdFxuXHQgICAgdmFyIFcgPSBbXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMjU2IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMjU2ID0gQ19hbGdvLlNIQTI1NiA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoSC5zbGljZSgwKSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgZSA9IEhbNF07XG5cdCAgICAgICAgICAgIHZhciBmID0gSFs1XTtcblx0ICAgICAgICAgICAgdmFyIGcgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgaCA9IEhbN107XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IE1bb2Zmc2V0ICsgaV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCA9IFdbaSAtIDE1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwICA9ICgoZ2FtbWEweCA8PCAyNSkgfCAoZ2FtbWEweCA+Pj4gNykpICBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMHggPDwgMTQpIHwgKGdhbW1hMHggPj4+IDE4KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnYW1tYTB4ID4+PiAzKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4ID0gV1tpIC0gMl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMSAgPSAoKGdhbW1hMXggPDwgMTUpIHwgKGdhbW1hMXggPj4+IDE3KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTF4IDw8IDEzKSB8IChnYW1tYTF4ID4+PiAxOSkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWExeCA+Pj4gMTApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2ggID0gKGUgJiBmKSBeICh+ZSAmIGcpO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1haiA9IChhICYgYikgXiAoYSAmIGMpIF4gKGIgJiBjKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMCA9ICgoYSA8PCAzMCkgfCAoYSA+Pj4gMikpIF4gKChhIDw8IDE5KSB8IChhID4+PiAxMykpIF4gKChhIDw8IDEwKSB8IChhID4+PiAyMikpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMSA9ICgoZSA8PCAyNikgfCAoZSA+Pj4gNikpIF4gKChlIDw8IDIxKSB8IChlID4+PiAxMSkpIF4gKChlIDw8IDcpICB8IChlID4+PiAyNSkpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MiA9IHNpZ21hMCArIG1hajtcblxuXHQgICAgICAgICAgICAgICAgaCA9IGc7XG5cdCAgICAgICAgICAgICAgICBnID0gZjtcblx0ICAgICAgICAgICAgICAgIGYgPSBlO1xuXHQgICAgICAgICAgICAgICAgZSA9IChkICsgdDEpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGQgPSBjO1xuXHQgICAgICAgICAgICAgICAgYyA9IGI7XG5cdCAgICAgICAgICAgICAgICBiID0gYTtcblx0ICAgICAgICAgICAgICAgIGEgPSAodDEgKyB0MikgfCAwO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgICAgICBIWzRdID0gKEhbNF0gKyBlKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNV0gPSAoSFs1XSArIGYpIHwgMDtcblx0ICAgICAgICAgICAgSFs2XSA9IChIWzZdICsgZykgfCAwO1xuXHQgICAgICAgICAgICBIWzddID0gKEhbN10gKyBoKSB8IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTVdID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1NignbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjU2KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBMjU2KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEyNTYobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTI1Nik7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTI1NjtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi94NjQtY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhNTEyXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3g2NC1jb3JlXCIsIFwiLi9zaGE1MTJcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ194NjQgPSBDLng2NDtcblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZDtcblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXHQgICAgdmFyIFNIQTUxMiA9IENfYWxnby5TSEE1MTI7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTM4NCBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTM4NCA9IENfYWxnby5TSEEzODQgPSBTSEE1MTIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFg2NFdvcmRBcnJheS5pbml0KFtcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHhjYmJiOWQ1ZCwgMHhjMTA1OWVkOCksIG5ldyBYNjRXb3JkLmluaXQoMHg2MjlhMjkyYSwgMHgzNjdjZDUwNyksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4OTE1OTAxNWEsIDB4MzA3MGRkMTcpLCBuZXcgWDY0V29yZC5pbml0KDB4MTUyZmVjZDgsIDB4ZjcwZTU5MzkpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDY3MzMyNjY3LCAweGZmYzAwYjMxKSwgbmV3IFg2NFdvcmQuaW5pdCgweDhlYjQ0YTg3LCAweDY4NTgxNTExKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHhkYjBjMmUwZCwgMHg2NGY5OGZhNyksIG5ldyBYNjRXb3JkLmluaXQoMHg0N2I1NDgxZCwgMHhiZWZhNGZhNClcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gU0hBNTEyLl9kb0ZpbmFsaXplLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgaGFzaC5zaWdCeXRlcyAtPSAxNjtcblxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTM4NCgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMzg0KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBMzg0ID0gU0hBNTEyLl9jcmVhdGVIZWxwZXIoU0hBMzg0KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEzODQobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBMzg0ID0gU0hBNTEyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTM4NCk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBMzg0O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3g2NC1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3g2NC1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQ7XG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQ7XG5cdCAgICB2YXIgWDY0V29yZEFycmF5ID0gQ194NjQuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgZnVuY3Rpb24gWDY0V29yZF9jcmVhdGUoKSB7XG5cdCAgICAgICAgcmV0dXJuIFg2NFdvcmQuY3JlYXRlLmFwcGx5KFg2NFdvcmQsIGFyZ3VtZW50cyk7XG5cdCAgICB9XG5cblx0ICAgIC8vIENvbnN0YW50c1xuXHQgICAgdmFyIEsgPSBbXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg0MjhhMmY5OCwgMHhkNzI4YWUyMiksIFg2NFdvcmRfY3JlYXRlKDB4NzEzNzQ0OTEsIDB4MjNlZjY1Y2QpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YjVjMGZiY2YsIDB4ZWM0ZDNiMmYpLCBYNjRXb3JkX2NyZWF0ZSgweGU5YjVkYmE1LCAweDgxODlkYmJjKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDM5NTZjMjViLCAweGYzNDhiNTM4KSwgWDY0V29yZF9jcmVhdGUoMHg1OWYxMTFmMSwgMHhiNjA1ZDAxOSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5MjNmODJhNCwgMHhhZjE5NGY5YiksIFg2NFdvcmRfY3JlYXRlKDB4YWIxYzVlZDUsIDB4ZGE2ZDgxMTgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZDgwN2FhOTgsIDB4YTMwMzAyNDIpLCBYNjRXb3JkX2NyZWF0ZSgweDEyODM1YjAxLCAweDQ1NzA2ZmJlKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI0MzE4NWJlLCAweDRlZTRiMjhjKSwgWDY0V29yZF9jcmVhdGUoMHg1NTBjN2RjMywgMHhkNWZmYjRlMiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg3MmJlNWQ3NCwgMHhmMjdiODk2ZiksIFg2NFdvcmRfY3JlYXRlKDB4ODBkZWIxZmUsIDB4M2IxNjk2YjEpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4OWJkYzA2YTcsIDB4MjVjNzEyMzUpLCBYNjRXb3JkX2NyZWF0ZSgweGMxOWJmMTc0LCAweGNmNjkyNjk0KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGU0OWI2OWMxLCAweDllZjE0YWQyKSwgWDY0V29yZF9jcmVhdGUoMHhlZmJlNDc4NiwgMHgzODRmMjVlMyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgwZmMxOWRjNiwgMHg4YjhjZDViNSksIFg2NFdvcmRfY3JlYXRlKDB4MjQwY2ExY2MsIDB4NzdhYzljNjUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MmRlOTJjNmYsIDB4NTkyYjAyNzUpLCBYNjRXb3JkX2NyZWF0ZSgweDRhNzQ4NGFhLCAweDZlYTZlNDgzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDVjYjBhOWRjLCAweGJkNDFmYmQ0KSwgWDY0V29yZF9jcmVhdGUoMHg3NmY5ODhkYSwgMHg4MzExNTNiNSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5ODNlNTE1MiwgMHhlZTY2ZGZhYiksIFg2NFdvcmRfY3JlYXRlKDB4YTgzMWM2NmQsIDB4MmRiNDMyMTApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YjAwMzI3YzgsIDB4OThmYjIxM2YpLCBYNjRXb3JkX2NyZWF0ZSgweGJmNTk3ZmM3LCAweGJlZWYwZWU0KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGM2ZTAwYmYzLCAweDNkYTg4ZmMyKSwgWDY0V29yZF9jcmVhdGUoMHhkNWE3OTE0NywgMHg5MzBhYTcyNSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgwNmNhNjM1MSwgMHhlMDAzODI2ZiksIFg2NFdvcmRfY3JlYXRlKDB4MTQyOTI5NjcsIDB4MGEwZTZlNzApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MjdiNzBhODUsIDB4NDZkMjJmZmMpLCBYNjRXb3JkX2NyZWF0ZSgweDJlMWIyMTM4LCAweDVjMjZjOTI2KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDRkMmM2ZGZjLCAweDVhYzQyYWVkKSwgWDY0V29yZF9jcmVhdGUoMHg1MzM4MGQxMywgMHg5ZDk1YjNkZiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg2NTBhNzM1NCwgMHg4YmFmNjNkZSksIFg2NFdvcmRfY3JlYXRlKDB4NzY2YTBhYmIsIDB4M2M3N2IyYTgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ODFjMmM5MmUsIDB4NDdlZGFlZTYpLCBYNjRXb3JkX2NyZWF0ZSgweDkyNzIyYzg1LCAweDE0ODIzNTNiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGEyYmZlOGExLCAweDRjZjEwMzY0KSwgWDY0V29yZF9jcmVhdGUoMHhhODFhNjY0YiwgMHhiYzQyMzAwMSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhjMjRiOGI3MCwgMHhkMGY4OTc5MSksIFg2NFdvcmRfY3JlYXRlKDB4Yzc2YzUxYTMsIDB4MDY1NGJlMzApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZDE5MmU4MTksIDB4ZDZlZjUyMTgpLCBYNjRXb3JkX2NyZWF0ZSgweGQ2OTkwNjI0LCAweDU1NjVhOTEwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGY0MGUzNTg1LCAweDU3NzEyMDJhKSwgWDY0V29yZF9jcmVhdGUoMHgxMDZhYTA3MCwgMHgzMmJiZDFiOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgxOWE0YzExNiwgMHhiOGQyZDBjOCksIFg2NFdvcmRfY3JlYXRlKDB4MWUzNzZjMDgsIDB4NTE0MWFiNTMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Mjc0ODc3NGMsIDB4ZGY4ZWViOTkpLCBYNjRXb3JkX2NyZWF0ZSgweDM0YjBiY2I1LCAweGUxOWI0OGE4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDM5MWMwY2IzLCAweGM1Yzk1YTYzKSwgWDY0V29yZF9jcmVhdGUoMHg0ZWQ4YWE0YSwgMHhlMzQxOGFjYiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg1YjljY2E0ZiwgMHg3NzYzZTM3MyksIFg2NFdvcmRfY3JlYXRlKDB4NjgyZTZmZjMsIDB4ZDZiMmI4YTMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NzQ4ZjgyZWUsIDB4NWRlZmIyZmMpLCBYNjRXb3JkX2NyZWF0ZSgweDc4YTU2MzZmLCAweDQzMTcyZjYwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDg0Yzg3ODE0LCAweGExZjBhYjcyKSwgWDY0V29yZF9jcmVhdGUoMHg4Y2M3MDIwOCwgMHgxYTY0MzllYyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5MGJlZmZmYSwgMHgyMzYzMWUyOCksIFg2NFdvcmRfY3JlYXRlKDB4YTQ1MDZjZWIsIDB4ZGU4MmJkZTkpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YmVmOWEzZjcsIDB4YjJjNjc5MTUpLCBYNjRXb3JkX2NyZWF0ZSgweGM2NzE3OGYyLCAweGUzNzI1MzJiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGNhMjczZWNlLCAweGVhMjY2MTljKSwgWDY0V29yZF9jcmVhdGUoMHhkMTg2YjhjNywgMHgyMWMwYzIwNyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhlYWRhN2RkNiwgMHhjZGUwZWIxZSksIFg2NFdvcmRfY3JlYXRlKDB4ZjU3ZDRmN2YsIDB4ZWU2ZWQxNzgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MDZmMDY3YWEsIDB4NzIxNzZmYmEpLCBYNjRXb3JkX2NyZWF0ZSgweDBhNjM3ZGM1LCAweGEyYzg5OGE2KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDExM2Y5ODA0LCAweGJlZjkwZGFlKSwgWDY0V29yZF9jcmVhdGUoMHgxYjcxMGIzNSwgMHgxMzFjNDcxYiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyOGRiNzdmNSwgMHgyMzA0N2Q4NCksIFg2NFdvcmRfY3JlYXRlKDB4MzJjYWFiN2IsIDB4NDBjNzI0OTMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4M2M5ZWJlMGEsIDB4MTVjOWJlYmMpLCBYNjRXb3JkX2NyZWF0ZSgweDQzMWQ2N2M0LCAweDljMTAwZDRjKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDRjYzVkNGJlLCAweGNiM2U0MmI2KSwgWDY0V29yZF9jcmVhdGUoMHg1OTdmMjk5YywgMHhmYzY1N2UyYSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg1ZmNiNmZhYiwgMHgzYWQ2ZmFlYyksIFg2NFdvcmRfY3JlYXRlKDB4NmM0NDE5OGMsIDB4NGE0NzU4MTcpXG5cdCAgICBdO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3RzXG5cdCAgICB2YXIgVyA9IFtdO1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDgwOyBpKyspIHtcblx0ICAgICAgICAgICAgV1tpXSA9IFg2NFdvcmRfY3JlYXRlKCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtNTEyIGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBNTEyID0gQ19hbGdvLlNIQTUxMiA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgWDY0V29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDZhMDllNjY3LCAweGYzYmNjOTA4KSwgbmV3IFg2NFdvcmQuaW5pdCgweGJiNjdhZTg1LCAweDg0Y2FhNzNiKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHgzYzZlZjM3MiwgMHhmZTk0ZjgyYiksIG5ldyBYNjRXb3JkLmluaXQoMHhhNTRmZjUzYSwgMHg1ZjFkMzZmMSksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NTEwZTUyN2YsIDB4YWRlNjgyZDEpLCBuZXcgWDY0V29yZC5pbml0KDB4OWIwNTY4OGMsIDB4MmIzZTZjMWYpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDFmODNkOWFiLCAweGZiNDFiZDZiKSwgbmV3IFg2NFdvcmQuaW5pdCgweDViZTBjZDE5LCAweDEzN2UyMTc5KVxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIEgwID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIEgxID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIEgyID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIEgzID0gSFszXTtcblx0ICAgICAgICAgICAgdmFyIEg0ID0gSFs0XTtcblx0ICAgICAgICAgICAgdmFyIEg1ID0gSFs1XTtcblx0ICAgICAgICAgICAgdmFyIEg2ID0gSFs2XTtcblx0ICAgICAgICAgICAgdmFyIEg3ID0gSFs3XTtcblxuXHQgICAgICAgICAgICB2YXIgSDBoID0gSDAuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgwbCA9IEgwLmxvdztcblx0ICAgICAgICAgICAgdmFyIEgxaCA9IEgxLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIMWwgPSBIMS5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIMmggPSBIMi5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDJsID0gSDIubG93O1xuXHQgICAgICAgICAgICB2YXIgSDNoID0gSDMuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgzbCA9IEgzLmxvdztcblx0ICAgICAgICAgICAgdmFyIEg0aCA9IEg0LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBINGwgPSBINC5sb3c7XG5cdCAgICAgICAgICAgIHZhciBINWggPSBINS5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDVsID0gSDUubG93O1xuXHQgICAgICAgICAgICB2YXIgSDZoID0gSDYuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg2bCA9IEg2Lmxvdztcblx0ICAgICAgICAgICAgdmFyIEg3aCA9IEg3LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIN2wgPSBINy5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGFoID0gSDBoO1xuXHQgICAgICAgICAgICB2YXIgYWwgPSBIMGw7XG5cdCAgICAgICAgICAgIHZhciBiaCA9IEgxaDtcblx0ICAgICAgICAgICAgdmFyIGJsID0gSDFsO1xuXHQgICAgICAgICAgICB2YXIgY2ggPSBIMmg7XG5cdCAgICAgICAgICAgIHZhciBjbCA9IEgybDtcblx0ICAgICAgICAgICAgdmFyIGRoID0gSDNoO1xuXHQgICAgICAgICAgICB2YXIgZGwgPSBIM2w7XG5cdCAgICAgICAgICAgIHZhciBlaCA9IEg0aDtcblx0ICAgICAgICAgICAgdmFyIGVsID0gSDRsO1xuXHQgICAgICAgICAgICB2YXIgZmggPSBINWg7XG5cdCAgICAgICAgICAgIHZhciBmbCA9IEg1bDtcblx0ICAgICAgICAgICAgdmFyIGdoID0gSDZoO1xuXHQgICAgICAgICAgICB2YXIgZ2wgPSBINmw7XG5cdCAgICAgICAgICAgIHZhciBoaCA9IEg3aDtcblx0ICAgICAgICAgICAgdmFyIGhsID0gSDdsO1xuXG5cdCAgICAgICAgICAgIC8vIFJvdW5kc1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDgwOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBXaWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgV2loO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICAgICAgdmFyIFdpID0gV1tpXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gRXh0ZW5kIG1lc3NhZ2Vcblx0ICAgICAgICAgICAgICAgIGlmIChpIDwgMTYpIHtcblx0ICAgICAgICAgICAgICAgICAgICBXaWggPSBXaS5oaWdoID0gTVtvZmZzZXQgKyBpICogMl0gICAgIHwgMDtcblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBXaS5sb3cgID0gTVtvZmZzZXQgKyBpICogMiArIDFdIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gR2FtbWEwXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHggID0gV1tpIC0gMTVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4aCA9IGdhbW1hMHguaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweGwgPSBnYW1tYTB4Lmxvdztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwaCAgPSAoKGdhbW1hMHhoID4+PiAxKSB8IChnYW1tYTB4bCA8PCAzMSkpIF4gKChnYW1tYTB4aCA+Pj4gOCkgfCAoZ2FtbWEweGwgPDwgMjQpKSBeIChnYW1tYTB4aCA+Pj4gNyk7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMGwgID0gKChnYW1tYTB4bCA+Pj4gMSkgfCAoZ2FtbWEweGggPDwgMzEpKSBeICgoZ2FtbWEweGwgPj4+IDgpIHwgKGdhbW1hMHhoIDw8IDI0KSkgXiAoKGdhbW1hMHhsID4+PiA3KSB8IChnYW1tYTB4aCA8PCAyNSkpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gR2FtbWExXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXggID0gV1tpIC0gMl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXhoID0gZ2FtbWExeC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4bCA9IGdhbW1hMXgubG93O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTFoICA9ICgoZ2FtbWExeGggPj4+IDE5KSB8IChnYW1tYTF4bCA8PCAxMykpIF4gKChnYW1tYTF4aCA8PCAzKSB8IChnYW1tYTF4bCA+Pj4gMjkpKSBeIChnYW1tYTF4aCA+Pj4gNik7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMWwgID0gKChnYW1tYTF4bCA+Pj4gMTkpIHwgKGdhbW1hMXhoIDw8IDEzKSkgXiAoKGdhbW1hMXhsIDw8IDMpIHwgKGdhbW1hMXhoID4+PiAyOSkpIF4gKChnYW1tYTF4bCA+Pj4gNikgfCAoZ2FtbWExeGggPDwgMjYpKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XVxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTcgID0gV1tpIC0gN107XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpN2ggPSBXaTcuaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2k3bCA9IFdpNy5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2kxNiAgPSBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpMTZoID0gV2kxNi5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTE2bCA9IFdpMTYubG93O1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV2lsID0gZ2FtbWEwbCArIFdpN2w7XG5cdCAgICAgICAgICAgICAgICAgICAgV2loID0gZ2FtbWEwaCArIFdpN2ggKyAoKFdpbCA+Pj4gMCkgPCAoZ2FtbWEwbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICAgICAgV2lsID0gV2lsICsgZ2FtbWExbDtcblx0ICAgICAgICAgICAgICAgICAgICBXaWggPSBXaWggKyBnYW1tYTFoICsgKChXaWwgPj4+IDApIDwgKGdhbW1hMWwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpbCA9IFdpbCArIFdpMTZsO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpaCArIFdpMTZoICsgKChXaWwgPj4+IDApIDwgKFdpMTZsID4+PiAwKSA/IDEgOiAwKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIFdpLmhpZ2ggPSBXaWg7XG5cdCAgICAgICAgICAgICAgICAgICAgV2kubG93ICA9IFdpbDtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIGNoaCAgPSAoZWggJiBmaCkgXiAofmVoICYgZ2gpO1xuXHQgICAgICAgICAgICAgICAgdmFyIGNobCAgPSAoZWwgJiBmbCkgXiAofmVsICYgZ2wpO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1hamggPSAoYWggJiBiaCkgXiAoYWggJiBjaCkgXiAoYmggJiBjaCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqbCA9IChhbCAmIGJsKSBeIChhbCAmIGNsKSBeIChibCAmIGNsKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMGggPSAoKGFoID4+PiAyOCkgfCAoYWwgPDwgNCkpICBeICgoYWggPDwgMzApICB8IChhbCA+Pj4gMikpIF4gKChhaCA8PCAyNSkgfCAoYWwgPj4+IDcpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTBsID0gKChhbCA+Pj4gMjgpIHwgKGFoIDw8IDQpKSAgXiAoKGFsIDw8IDMwKSAgfCAoYWggPj4+IDIpKSBeICgoYWwgPDwgMjUpIHwgKGFoID4+PiA3KSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExaCA9ICgoZWggPj4+IDE0KSB8IChlbCA8PCAxOCkpIF4gKChlaCA+Pj4gMTgpIHwgKGVsIDw8IDE0KSkgXiAoKGVoIDw8IDIzKSB8IChlbCA+Pj4gOSkpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMWwgPSAoKGVsID4+PiAxNCkgfCAoZWggPDwgMTgpKSBeICgoZWwgPj4+IDE4KSB8IChlaCA8PCAxNCkpIF4gKChlbCA8PCAyMykgfCAoZWggPj4+IDkpKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXVxuXHQgICAgICAgICAgICAgICAgdmFyIEtpICA9IEtbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgS2loID0gS2kuaGlnaDtcblx0ICAgICAgICAgICAgICAgIHZhciBLaWwgPSBLaS5sb3c7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSBobCArIHNpZ21hMWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gaGggKyBzaWdtYTFoICsgKCh0MWwgPj4+IDApIDwgKGhsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSB0MWwgKyBjaGw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gdDFoICsgY2hoICsgKCh0MWwgPj4+IDApIDwgKGNobCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gdDFsICsgS2lsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IHQxaCArIEtpaCArICgodDFsID4+PiAwKSA8IChLaWwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IHQxbCArIFdpbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSB0MWggKyBXaWggKyAoKHQxbCA+Pj4gMCkgPCAoV2lsID4+PiAwKSA/IDEgOiAwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gdDIgPSBzaWdtYTAgKyBtYWpcblx0ICAgICAgICAgICAgICAgIHZhciB0MmwgPSBzaWdtYTBsICsgbWFqbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MmggPSBzaWdtYTBoICsgbWFqaCArICgodDJsID4+PiAwKSA8IChzaWdtYTBsID4+PiAwKSA/IDEgOiAwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgICAgICBoaCA9IGdoO1xuXHQgICAgICAgICAgICAgICAgaGwgPSBnbDtcblx0ICAgICAgICAgICAgICAgIGdoID0gZmg7XG5cdCAgICAgICAgICAgICAgICBnbCA9IGZsO1xuXHQgICAgICAgICAgICAgICAgZmggPSBlaDtcblx0ICAgICAgICAgICAgICAgIGZsID0gZWw7XG5cdCAgICAgICAgICAgICAgICBlbCA9IChkbCArIHQxbCkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZWggPSAoZGggKyB0MWggKyAoKGVsID4+PiAwKSA8IChkbCA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGRoID0gY2g7XG5cdCAgICAgICAgICAgICAgICBkbCA9IGNsO1xuXHQgICAgICAgICAgICAgICAgY2ggPSBiaDtcblx0ICAgICAgICAgICAgICAgIGNsID0gYmw7XG5cdCAgICAgICAgICAgICAgICBiaCA9IGFoO1xuXHQgICAgICAgICAgICAgICAgYmwgPSBhbDtcblx0ICAgICAgICAgICAgICAgIGFsID0gKHQxbCArIHQybCkgfCAwO1xuXHQgICAgICAgICAgICAgICAgYWggPSAodDFoICsgdDJoICsgKChhbCA+Pj4gMCkgPCAodDFsID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSDBsID0gSDAubG93ICA9IChIMGwgKyBhbCk7XG5cdCAgICAgICAgICAgIEgwLmhpZ2ggPSAoSDBoICsgYWggKyAoKEgwbCA+Pj4gMCkgPCAoYWwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDFsID0gSDEubG93ICA9IChIMWwgKyBibCk7XG5cdCAgICAgICAgICAgIEgxLmhpZ2ggPSAoSDFoICsgYmggKyAoKEgxbCA+Pj4gMCkgPCAoYmwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDJsID0gSDIubG93ICA9IChIMmwgKyBjbCk7XG5cdCAgICAgICAgICAgIEgyLmhpZ2ggPSAoSDJoICsgY2ggKyAoKEgybCA+Pj4gMCkgPCAoY2wgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDNsID0gSDMubG93ICA9IChIM2wgKyBkbCk7XG5cdCAgICAgICAgICAgIEgzLmhpZ2ggPSAoSDNoICsgZGggKyAoKEgzbCA+Pj4gMCkgPCAoZGwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDRsID0gSDQubG93ICA9IChINGwgKyBlbCk7XG5cdCAgICAgICAgICAgIEg0LmhpZ2ggPSAoSDRoICsgZWggKyAoKEg0bCA+Pj4gMCkgPCAoZWwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDVsID0gSDUubG93ICA9IChINWwgKyBmbCk7XG5cdCAgICAgICAgICAgIEg1LmhpZ2ggPSAoSDVoICsgZmggKyAoKEg1bCA+Pj4gMCkgPCAoZmwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDZsID0gSDYubG93ICA9IChINmwgKyBnbCk7XG5cdCAgICAgICAgICAgIEg2LmhpZ2ggPSAoSDZoICsgZ2ggKyAoKEg2bCA+Pj4gMCkgPCAoZ2wgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDdsID0gSDcubG93ICA9IChIN2wgKyBobCk7XG5cdCAgICAgICAgICAgIEg3LmhpZ2ggPSAoSDdoICsgaGggKyAoKEg3bCA+Pj4gMCkgPCAoaGwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgMTI4KSA+Pj4gMTApIDw8IDUpICsgMzBdID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgMTI4KSA+Pj4gMTApIDw8IDUpICsgMzFdID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IGhhc2ggdG8gMzItYml0IHdvcmQgYXJyYXkgYmVmb3JlIHJldHVybmluZ1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2hhc2gudG9YMzIoKTtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiAxMDI0LzMyXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTUxMignbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBNTEyKHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBNTEyID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBNTEyKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEE1MTIobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBNTEyID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTUxMik7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBNTEyO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKHVuZGVmaW5lZCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgWDMyV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXG5cdCAgICAvKipcblx0ICAgICAqIHg2NCBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX3g2NCA9IEMueDY0ID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQSA2NC1iaXQgd29yZC5cblx0ICAgICAqL1xuXHQgICAgdmFyIFg2NFdvcmQgPSBDX3g2NC5Xb3JkID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCA2NC1iaXQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoaWdoIFRoZSBoaWdoIDMyIGJpdHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGxvdyBUaGUgbG93IDMyIGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4NjRXb3JkID0gQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MDAwMTAyMDMsIDB4MDQwNTA2MDcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChoaWdoLCBsb3cpIHtcblx0ICAgICAgICAgICAgdGhpcy5oaWdoID0gaGlnaDtcblx0ICAgICAgICAgICAgdGhpcy5sb3cgPSBsb3c7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBOT1RzIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBuZWdhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG5lZ2F0ZWQgPSB4NjRXb3JkLm5vdCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIG5vdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IH50aGlzLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB+dGhpcy5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgQU5EcyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIEFORCB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBBTkRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBhbmRlZCA9IHg2NFdvcmQuYW5kKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBhbmQ6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoICYgd29yZC5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgJiB3b3JkLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBPUnMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBPUiB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBPUmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG9yZWQgPSB4NjRXb3JkLm9yKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBvcjogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggfCB3b3JkLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyB8IHdvcmQubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIFhPUnMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBYT1Igd2l0aCB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgWE9SaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgeG9yZWQgPSB4NjRXb3JkLnhvcihhbm90aGVyWDY0V29yZCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8geG9yOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCBeIHdvcmQuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IF4gd29yZC5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFNoaWZ0cyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSBsZWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHNoaWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHNoaWZ0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc2hpZnRlZCA9IHg2NFdvcmQuc2hpZnRMKDI1KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBzaGlmdEw6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIGlmIChuIDwgMzIpIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gKHRoaXMuaGlnaCA8PCBuKSB8ICh0aGlzLmxvdyA+Pj4gKDMyIC0gbikpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IDw8IG47XG5cdCAgICAgICAgICAgIC8vIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMubG93IDw8IChuIC0gMzIpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9IDA7XG5cdCAgICAgICAgICAgIC8vIH1cblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogU2hpZnRzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIHJpZ2h0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHNoaWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHNoaWZ0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc2hpZnRlZCA9IHg2NFdvcmQuc2hpZnRSKDcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHNoaWZ0UjogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gaWYgKG4gPCAzMikge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9ICh0aGlzLmxvdyA+Pj4gbikgfCAodGhpcy5oaWdoIDw8ICgzMiAtIG4pKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoID4+PiBuO1xuXHQgICAgICAgICAgICAvLyB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMuaGlnaCA+Pj4gKG4gLSAzMik7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IDA7XG5cdCAgICAgICAgICAgIC8vIH1cblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUm90YXRlcyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSBsZWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJvdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciByb3RhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHJvdGF0ZWQgPSB4NjRXb3JkLnJvdEwoMjUpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHJvdEw6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLnNoaWZ0TChuKS5vcih0aGlzLnNoaWZ0Uig2NCAtIG4pKTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUm90YXRlcyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSByaWdodC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByb3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgcm90YXRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciByb3RhdGVkID0geDY0V29yZC5yb3RSKDcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHJvdFI6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLnNoaWZ0UihuKS5vcih0aGlzLnNoaWZ0TCg2NCAtIG4pKTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIGFkZCB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBhZGRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBhZGRlZCA9IHg2NFdvcmQuYWRkKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBhZGQ6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSAodGhpcy5sb3cgKyB3b3JkLmxvdykgfCAwO1xuXHQgICAgICAgICAgICAvLyB2YXIgY2FycnkgPSAobG93ID4+PiAwKSA8ICh0aGlzLmxvdyA+Pj4gMCkgPyAxIDogMDtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSAodGhpcy5oaWdoICsgd29yZC5oaWdoICsgY2FycnkpIHwgMDtcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbiBhcnJheSBvZiA2NC1iaXQgd29yZHMuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtBcnJheX0gd29yZHMgVGhlIGFycmF5IG9mIENyeXB0b0pTLng2NC5Xb3JkIG9iamVjdHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIENyeXB0b0pTLng2NC5Xb3JkIG9iamVjdHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy54NjQuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy54NjQuV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgwMDAxMDIwMywgMHgwNDA1MDYwNyksXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgxODE5MWExYiwgMHgxYzFkMWUxZilcblx0ICAgICAgICAgKiAgICAgXSk7XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDAwMDEwMjAzLCAweDA0MDUwNjA3KSxcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDE4MTkxYTFiLCAweDFjMWQxZTFmKVxuXHQgICAgICAgICAqICAgICBdLCAxMCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogODtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIDY0LWJpdCB3b3JkIGFycmF5IHRvIGEgMzItYml0IHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDcnlwdG9KUy5saWIuV29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkncyBkYXRhIGFzIGEgMzItYml0IHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4MzJXb3JkQXJyYXkgPSB4NjRXb3JkQXJyYXkudG9YMzIoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1gzMjogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHg2NFdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHg2NFdvcmRzTGVuZ3RoID0geDY0V29yZHMubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHgzMldvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeDY0V29yZHNMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIHg2NFdvcmQgPSB4NjRXb3Jkc1tpXTtcblx0ICAgICAgICAgICAgICAgIHgzMldvcmRzLnB1c2goeDY0V29yZC5oaWdoKTtcblx0ICAgICAgICAgICAgICAgIHgzMldvcmRzLnB1c2goeDY0V29yZC5sb3cpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIFgzMldvcmRBcnJheS5jcmVhdGUoeDMyV29yZHMsIHRoaXMuc2lnQnl0ZXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0geDY0V29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIENsb25lIFwid29yZHNcIiBhcnJheVxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUgZWFjaCBYNjRXb3JkIG9iamVjdFxuXHQgICAgICAgICAgICB2YXIgd29yZHNMZW5ndGggPSB3b3Jkcy5sZW5ndGg7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHNMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaV0gPSB3b3Jkc1tpXS5jbG9uZSgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTO1xuXG59KSk7IiwiLyogKGlnbm9yZWQpICovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9zcmMvTG9nLmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnQgfSBmcm9tICcuL3NyYy9PaWRjQ2xpZW50LmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnRTZXR0aW5ncyB9IGZyb20gJy4vc3JjL09pZGNDbGllbnRTZXR0aW5ncy5qcyc7XG5pbXBvcnQgeyBXZWJTdG9yYWdlU3RhdGVTdG9yZSB9IGZyb20gJy4vc3JjL1dlYlN0b3JhZ2VTdGF0ZVN0b3JlLmpzJztcbmltcG9ydCB7IEluTWVtb3J5V2ViU3RvcmFnZSB9IGZyb20gJy4vc3JjL0luTWVtb3J5V2ViU3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBVc2VyTWFuYWdlciB9IGZyb20gJy4vc3JjL1VzZXJNYW5hZ2VyLmpzJztcbmltcG9ydCB7IEFjY2Vzc1Rva2VuRXZlbnRzIH0gZnJvbSAnLi9zcmMvQWNjZXNzVG9rZW5FdmVudHMuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvTWV0YWRhdGFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IENvcmRvdmFQb3B1cE5hdmlnYXRvciB9IGZyb20gJy4vc3JjL0NvcmRvdmFQb3B1cE5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yIH0gZnJvbSAnLi9zcmMvQ29yZG92YUlGcmFtZU5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBDaGVja1Nlc3Npb25JRnJhbWUgfSBmcm9tICcuL3NyYy9DaGVja1Nlc3Npb25JRnJhbWUuanMnO1xuaW1wb3J0IHsgVG9rZW5SZXZvY2F0aW9uQ2xpZW50IH0gZnJvbSAnLi9zcmMvVG9rZW5SZXZvY2F0aW9uQ2xpZW50LmpzJztcbmltcG9ydCB7IFNlc3Npb25Nb25pdG9yIH0gZnJvbSAnLi9zcmMvU2Vzc2lvbk1vbml0b3IuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9zcmMvR2xvYmFsLmpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3NyYy9Vc2VyLmpzJztcblxuaW1wb3J0IHsgVmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbi5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBWZXJzaW9uLFxuICAgIExvZyxcbiAgICBPaWRjQ2xpZW50LFxuICAgIE9pZGNDbGllbnRTZXR0aW5ncyxcbiAgICBXZWJTdG9yYWdlU3RhdGVTdG9yZSxcbiAgICBJbk1lbW9yeVdlYlN0b3JhZ2UsXG4gICAgVXNlck1hbmFnZXIsXG4gICAgQWNjZXNzVG9rZW5FdmVudHMsXG4gICAgTWV0YWRhdGFTZXJ2aWNlLFxuICAgIENvcmRvdmFQb3B1cE5hdmlnYXRvcixcbiAgICBDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yLFxuICAgIENoZWNrU2Vzc2lvbklGcmFtZSxcbiAgICBUb2tlblJldm9jYXRpb25DbGllbnQsXG4gICAgU2Vzc2lvbk1vbml0b3IsXG4gICAgR2xvYmFsLFxuICAgIFVzZXJcbn07XG4iXSwibmFtZXMiOlsiTG9nIiwiVGltZXIiLCJEZWZhdWx0QWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUiLCJBY2Nlc3NUb2tlbkV2ZW50cyIsIl9yZWYiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJfcmVmJGFjY2Vzc1Rva2VuRXhwaXIiLCJhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSIsIl9yZWYkYWNjZXNzVG9rZW5FeHBpcjIiLCJhY2Nlc3NUb2tlbkV4cGlyaW5nVGltZXIiLCJfcmVmJGFjY2Vzc1Rva2VuRXhwaXIzIiwiYWNjZXNzVG9rZW5FeHBpcmVkVGltZXIiLCJfYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUiLCJfYWNjZXNzVG9rZW5FeHBpcmluZyIsIl9hY2Nlc3NUb2tlbkV4cGlyZWQiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJsb2FkIiwiY29udGFpbmVyIiwiYWNjZXNzX3Rva2VuIiwiZXhwaXJlc19pbiIsImR1cmF0aW9uIiwiZGVidWciLCJleHBpcmluZyIsImluaXQiLCJjYW5jZWwiLCJleHBpcmVkIiwidW5sb2FkIiwiYWRkQWNjZXNzVG9rZW5FeHBpcmluZyIsImNiIiwiYWRkSGFuZGxlciIsInJlbW92ZUFjY2Vzc1Rva2VuRXhwaXJpbmciLCJyZW1vdmVIYW5kbGVyIiwiYWRkQWNjZXNzVG9rZW5FeHBpcmVkIiwicmVtb3ZlQWNjZXNzVG9rZW5FeHBpcmVkIiwiRGVmYXVsdEludGVydmFsIiwiQ2hlY2tTZXNzaW9uSUZyYW1lIiwiY2FsbGJhY2siLCJjbGllbnRfaWQiLCJ1cmwiLCJpbnRlcnZhbCIsInN0b3BPbkVycm9yIiwiX2NhbGxiYWNrIiwiX2NsaWVudF9pZCIsIl91cmwiLCJfaW50ZXJ2YWwiLCJfc3RvcE9uRXJyb3IiLCJpZHgiLCJpbmRleE9mIiwiX2ZyYW1lX29yaWdpbiIsInN1YnN0ciIsIl9mcmFtZSIsIndpbmRvdyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwidmlzaWJpbGl0eSIsInBvc2l0aW9uIiwiZGlzcGxheSIsIndpZHRoIiwiaGVpZ2h0Iiwic3JjIiwiX3RoaXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9ubG9hZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIl9ib3VuZE1lc3NhZ2VFdmVudCIsIl9tZXNzYWdlIiwiYmluZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwib3JpZ2luIiwic291cmNlIiwiY29udGVudFdpbmRvdyIsImRhdGEiLCJlcnJvciIsInN0b3AiLCJzdGFydCIsInNlc3Npb25fc3RhdGUiLCJfdGhpczIiLCJfc2Vzc2lvbl9zdGF0ZSIsInNlbmQiLCJwb3N0TWVzc2FnZSIsIl90aW1lciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIkNsb2NrU2VydmljZSIsImdldEVwb2NoVGltZSIsIkRhdGUiLCJub3ciLCJDb3Jkb3ZhUG9wdXBXaW5kb3ciLCJDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yIiwicHJlcGFyZSIsInBhcmFtcyIsInBvcHVwV2luZG93RmVhdHVyZXMiLCJwb3B1cCIsIkNvcmRvdmFQb3B1cE5hdmlnYXRvciIsIkRlZmF1bHRQb3B1cEZlYXR1cmVzIiwiRGVmYXVsdFBvcHVwVGFyZ2V0IiwiX3Byb21pc2UiLCJyZWplY3QiLCJfcmVzb2x2ZSIsIl9yZWplY3QiLCJmZWF0dXJlcyIsInRhcmdldCIsInBvcHVwV2luZG93VGFyZ2V0IiwicmVkaXJlY3RfdXJpIiwic3RhcnRVcmwiLCJfaXNJbkFwcEJyb3dzZXJJbnN0YWxsZWQiLCJjb3Jkb3ZhTWV0YWRhdGEiLCJzb21lIiwibmFtZSIsImhhc093blByb3BlcnR5IiwibmF2aWdhdGUiLCJfZXJyb3IiLCJjb3Jkb3ZhIiwicmVxdWlyZSIsIm1ldGFkYXRhIiwiX3BvcHVwIiwiSW5BcHBCcm93c2VyIiwib3BlbiIsIl9leGl0Q2FsbGJhY2tFdmVudCIsIl9leGl0Q2FsbGJhY2siLCJfbG9hZFN0YXJ0Q2FsbGJhY2tFdmVudCIsIl9sb2FkU3RhcnRDYWxsYmFjayIsInByb21pc2UiLCJldmVudCIsIl9zdWNjZXNzIiwibWVzc2FnZSIsIl9jbGVhbnVwIiwiRXJyb3IiLCJjbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJnZXQiLCJFcnJvclJlc3BvbnNlIiwiX0Vycm9yIiwiZXJyb3JfZGVzY3JpcHRpb24iLCJlcnJvcl91cmkiLCJzdGF0ZSIsImNhbGwiLCJfaW5oZXJpdHNMb29zZSIsIl93cmFwTmF0aXZlU3VwZXIiLCJFdmVudCIsIl9uYW1lIiwiX2NhbGxiYWNrcyIsInB1c2giLCJmaW5kSW5kZXgiLCJpdGVtIiwic3BsaWNlIiwicmFpc2UiLCJpIiwiX3RoaXMkX2NhbGxiYWNrcyIsImFwcGx5IiwidGltZXIiLCJfc2V0SW50ZXJ2YWwiLCJfeCIsIl94MiIsInRvU3RyaW5nIiwiX2NsZWFySW50ZXJ2YWwiLCJfeDMiLCJoYW5kbGUiLCJ0ZXN0aW5nIiwicmVxdWVzdCIsIkdsb2JhbCIsIl90ZXN0aW5nIiwic2V0WE1MSHR0cFJlcXVlc3QiLCJuZXdSZXF1ZXN0IiwibG9jYXRpb24iLCJsb2NhbFN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsIlhNTEh0dHBSZXF1ZXN0IiwiSUZyYW1lV2luZG93IiwiSUZyYW1lTmF2aWdhdG9yIiwiZnJhbWUiLCJub3RpZnlQYXJlbnQiLCJEZWZhdWx0VGltZW91dCIsInRpbWVvdXQiLCJzaWxlbnRSZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJfdGltZW91dCIsImNsZWFyVGltZW91dCIsInJlbW92ZUNoaWxkIiwiX29yaWdpbiIsInN0YXJ0c1dpdGgiLCJocmVmIiwicGFyZW50IiwicHJvdG9jb2wiLCJob3N0IiwiSW5NZW1vcnlXZWJTdG9yYWdlIiwiX2RhdGEiLCJnZXRJdGVtIiwic2V0SXRlbSIsInZhbHVlIiwicmVtb3ZlSXRlbSIsImluZGV4IiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIlNIQTI1NiIsIlNIQTM4NCIsIlNIQTUxMiIsIkhleCIsIkJhc2U2NCIsInRvQnl0ZUFycmF5IiwiQWxsb3dlZFNpZ25pbmdBbGdzIiwiYXNzZXJ0QWxsb3dlZEFsZyIsImFsZyIsInRvTG93ZXJDYXNlIiwiSGFzaGVycyIsInNoYTI1NiIsInNoYTM4NCIsInNoYTUxMiIsImI2NFRvQnl0ZXMiLCJzIiwicmVwbGFjZSIsInV0ZjhEZWNvZGUiLCJieXRlcyIsImVzY2FwZWQiLCJzbGljZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImI2NHVUb0pzb24iLCJKU09OIiwicGFyc2UiLCJhc2NpaVRvQnl0ZXMiLCJvdXQiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsImdldFN1YnRsZSIsImMiLCJjcnlwdG8iLCJnbG9iYWxUaGlzIiwiZ2xvYmFsIiwic3VidGxlIiwicmVhZFRsdiIsIm9mZnNldCIsInRhZyIsImxlbiIsIm4iLCJlbmQiLCJzcGtpRnJvbUNlcnRpZmljYXRlIiwiZGVyIiwiY2VydCIsInRicyIsInBvcyIsImVsIiwicmVzb2x2ZUtleSIsImt0eSIsImZvcm1hdCIsImV4dCIsIng1YyIsImNydiIsIngiLCJ5IiwiYWxnUGFyYW1zIiwiYml0cyIsImhhc2giLCJpbXBvcnRBbGciLCJ2ZXJpZnlBbGciLCJzYWx0TGVuZ3RoIiwicGFyc2VJbnQiLCJjdXJ2ZSIsIm5hbWVkQ3VydmUiLCJKb3NlVXRpbCIsInBhcnNlSnd0Iiwiand0IiwicGFydHMiLCJzcGxpdCIsImhlYWRlciIsInBheWxvYWQiLCJpc0FsbG93ZWRTaWduaW5nQWxnIiwidmFsaWRhdGVKd3QiLCJpc3N1ZXIiLCJhdWRpZW5jZSIsImNsb2NrU2tldyIsInRpbWVJbnNlbnNpdGl2ZSIsInJlc29sdmVkIiwidmFsaWRhdGVKd3RBdHRyaWJ1dGVzIiwidGhlbiIsIl92ZXJpZnlTaWduYXR1cmUiLCJ2YWxpZCIsInAiLCJzaWduYXR1cmUiLCJpbXBvcnRLZXkiLCJjcnlwdG9LZXkiLCJ2ZXJpZnkiLCJwYXJzZWQiLCJpc3MiLCJhdWQiLCJ2YWxpZEF1ZGllbmNlIiwiQXJyYXkiLCJpc0FycmF5IiwiYXpwIiwibG93ZXJOb3ciLCJ1cHBlck5vdyIsImlhdCIsIm5iZiIsImV4cCIsImhhc2hTdHJpbmciLCJoYXNoZXIiLCJTdHJpbmciLCJoZXhUb0Jhc2U2NFVybCIsInN0cmluZ2lmeSIsIkpzb25TZXJ2aWNlIiwiYWRkaXRpb25hbENvbnRlbnRUeXBlcyIsIlhNTEh0dHBSZXF1ZXN0Q3RvciIsImp3dEhhbmRsZXIiLCJfY29udGVudFR5cGVzIiwiX1hNTEh0dHBSZXF1ZXN0IiwiX2p3dEhhbmRsZXIiLCJnZXRKc29uIiwidG9rZW4iLCJyZXEiLCJhbGxvd2VkQ29udGVudFR5cGVzIiwic3RhdHVzIiwiY29udGVudFR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsImZvdW5kIiwiZmluZCIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJvbmVycm9yIiwic2V0UmVxdWVzdEhlYWRlciIsInBvc3RGb3JtIiwiYmFzaWNBdXRoIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiYnRvYSIsIm5vcExvZ2dlciIsImluZm8iLCJ3YXJuIiwiTk9ORSIsIkVSUk9SIiwiV0FSTiIsIklORk8iLCJERUJVRyIsImxvZ2dlciIsImxldmVsIiwicmVzZXQiLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJmcm9tIiwiX2xlbjIiLCJfa2V5MiIsIl9sZW4zIiwiX2tleTMiLCJfbGVuNCIsIl9rZXk0Iiwic2V0IiwiT2lkY01ldGFkYXRhVXJsUGF0aCIsIk1ldGFkYXRhU2VydmljZSIsInNldHRpbmdzIiwiSnNvblNlcnZpY2VDdG9yIiwiX3NldHRpbmdzIiwiX2pzb25TZXJ2aWNlIiwicmVzZXRTaWduaW5nS2V5cyIsInNpZ25pbmdLZXlzIiwiZ2V0TWV0YWRhdGEiLCJtZXRhZGF0YVVybCIsInNlZWQiLCJtZXRhZGF0YVNlZWQiLCJhc3NpZ24iLCJnZXRJc3N1ZXIiLCJfZ2V0TWV0YWRhdGFQcm9wZXJ0eSIsImdldEF1dGhvcml6YXRpb25FbmRwb2ludCIsImdldFVzZXJJbmZvRW5kcG9pbnQiLCJnZXRUb2tlbkVuZHBvaW50Iiwib3B0aW9uYWwiLCJnZXRDaGVja1Nlc3Npb25JZnJhbWUiLCJnZXRFbmRTZXNzaW9uRW5kcG9pbnQiLCJnZXRSZXZvY2F0aW9uRW5kcG9pbnQiLCJnZXRLZXlzRW5kcG9pbnQiLCJnZXRTaWduaW5nS2V5cyIsImp3a3NfdXJpIiwia2V5U2V0Iiwia2V5cyIsIl9tZXRhZGF0YVVybCIsImF1dGhvcml0eSIsIk9pZGNDbGllbnRTZXR0aW5ncyIsIlNpZ25pblJlcXVlc3QiLCJTaWduaW5SZXNwb25zZSIsIlNpZ25vdXRSZXF1ZXN0IiwiU2lnbm91dFJlc3BvbnNlIiwiU2lnbmluU3RhdGUiLCJTdGF0ZSIsIk9pZGNDbGllbnQiLCJjcmVhdGVTaWduaW5SZXF1ZXN0IiwicmVzcG9uc2VfdHlwZSIsInNjb3BlIiwicHJvbXB0IiwibWF4X2FnZSIsInVpX2xvY2FsZXMiLCJpZF90b2tlbl9oaW50IiwibG9naW5faGludCIsImFjcl92YWx1ZXMiLCJyZXNvdXJjZSIsInJlcXVlc3RfdXJpIiwicmVzcG9uc2VfbW9kZSIsImV4dHJhUXVlcnlQYXJhbXMiLCJleHRyYVRva2VuUGFyYW1zIiwicmVxdWVzdF90eXBlIiwic2tpcFVzZXJJbmZvIiwic3RhdGVTdG9yZSIsImlzQ29kZSIsIl9tZXRhZGF0YVNlcnZpY2UiLCJzaWduaW5SZXF1ZXN0IiwiY2xpZW50X3NlY3JldCIsInNpZ25pblN0YXRlIiwiX3N0YXRlU3RvcmUiLCJpZCIsInRvU3RvcmFnZVN0cmluZyIsInJlYWRTaWduaW5SZXNwb25zZVN0YXRlIiwicmVtb3ZlU3RhdGUiLCJ1c2VRdWVyeSIsImRlbGltaXRlciIsInJlc3BvbnNlIiwic3RhdGVBcGkiLCJyZW1vdmUiLCJzdG9yZWRTdGF0ZVN0cmluZyIsImZyb21TdG9yYWdlU3RyaW5nIiwicHJvY2Vzc1NpZ25pblJlc3BvbnNlIiwiX3JlZjIiLCJfdmFsaWRhdG9yIiwidmFsaWRhdGVTaWduaW5SZXNwb25zZSIsImNyZWF0ZVNpZ25vdXRSZXF1ZXN0IiwiX3RoaXMzIiwiX3JlZjMiLCJwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkiLCJzaWdub3V0U3RhdGUiLCJyZWFkU2lnbm91dFJlc3BvbnNlU3RhdGUiLCJzdGF0ZUtleSIsInByb2Nlc3NTaWdub3V0UmVzcG9uc2UiLCJfdGhpczQiLCJfcmVmNCIsInZhbGlkYXRlU2lnbm91dFJlc3BvbnNlIiwiY2xlYXJTdGFsZVN0YXRlIiwic3RhbGVTdGF0ZUFnZSIsInZhbGlkYXRvciIsIm1ldGFkYXRhU2VydmljZSIsIldlYlN0b3JhZ2VTdGF0ZVN0b3JlIiwiUmVzcG9uc2VWYWxpZGF0b3IiLCJEZWZhdWx0UmVzcG9uc2VUeXBlIiwiRGVmYXVsdFNjb3BlIiwiRGVmYXVsdENsaWVudEF1dGhlbnRpY2F0aW9uIiwiRGVmYXVsdFN0YWxlU3RhdGVBZ2UiLCJEZWZhdWx0Q2xvY2tTa2V3SW5TZWNvbmRzIiwiX3JlZiRyZXNwb25zZV90eXBlIiwiX3JlZiRzY29wZSIsIl9yZWYkY2xpZW50X2F1dGhlbnRpYyIsImNsaWVudF9hdXRoZW50aWNhdGlvbiIsIl9yZWYkZmlsdGVyUHJvdG9jb2xDbCIsImZpbHRlclByb3RvY29sQ2xhaW1zIiwiX3JlZiRsb2FkVXNlckluZm8iLCJsb2FkVXNlckluZm8iLCJfcmVmJHN0YWxlU3RhdGVBZ2UiLCJfcmVmJGNsb2NrU2tldyIsIl9yZWYkY2xvY2tTZXJ2aWNlIiwiY2xvY2tTZXJ2aWNlIiwiX3JlZiR1c2VySW5mb0p3dElzc3VlIiwidXNlckluZm9Kd3RJc3N1ZXIiLCJfcmVmJG1lcmdlQ2xhaW1zIiwibWVyZ2VDbGFpbXMiLCJfcmVmJHN0YXRlU3RvcmUiLCJfcmVmJFJlc3BvbnNlVmFsaWRhdG8iLCJSZXNwb25zZVZhbGlkYXRvckN0b3IiLCJfcmVmJE1ldGFkYXRhU2VydmljZUMiLCJNZXRhZGF0YVNlcnZpY2VDdG9yIiwiX3JlZiRleHRyYVF1ZXJ5UGFyYW1zIiwiX3JlZiRleHRyYVRva2VuUGFyYW1zIiwiX2F1dGhvcml0eSIsIl9tZXRhZGF0YSIsIl9tZXRhZGF0YVNlZWQiLCJfc2lnbmluZ0tleXMiLCJfY2xpZW50X3NlY3JldCIsIl9yZXNwb25zZV90eXBlIiwiX3Njb3BlIiwiX3JlZGlyZWN0X3VyaSIsIl9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkiLCJfY2xpZW50X2F1dGhlbnRpY2F0aW9uIiwiX3Byb21wdCIsIl9kaXNwbGF5IiwiX21heF9hZ2UiLCJfdWlfbG9jYWxlcyIsIl9hY3JfdmFsdWVzIiwiX3Jlc291cmNlIiwiX3Jlc3BvbnNlX21vZGUiLCJfZmlsdGVyUHJvdG9jb2xDbGFpbXMiLCJfbG9hZFVzZXJJbmZvIiwiX3N0YWxlU3RhdGVBZ2UiLCJfY2xvY2tTa2V3IiwiX2Nsb2NrU2VydmljZSIsIl91c2VySW5mb0p3dElzc3VlciIsIl9tZXJnZUNsYWltcyIsIl9leHRyYVF1ZXJ5UGFyYW1zIiwiX3R5cGVvZiIsIl9leHRyYVRva2VuUGFyYW1zIiwiUG9wdXBXaW5kb3ciLCJQb3B1cE5hdmlnYXRvciIsImtlZXBPcGVuIiwibm90aWZ5T3BlbmVyIiwiVXJsVXRpbGl0eSIsIkNoZWNrRm9yUG9wdXBDbG9zZWRJbnRlcnZhbCIsIl9jaGVja0ZvclBvcHVwQ2xvc2VkVGltZXIiLCJfY2hlY2tGb3JQb3B1cENsb3NlZCIsIl9pZCIsImZvY3VzIiwiY2xvc2VkIiwib3BlbmVyIiwicGFyc2VVcmxGcmFnbWVudCIsIlJlZGlyZWN0TmF2aWdhdG9yIiwidXNlUmVwbGFjZVRvTmF2aWdhdGUiLCJVc2VySW5mb1NlcnZpY2UiLCJUb2tlbkNsaWVudCIsIlVuc2FmZUtleXMiLCJQcm90b2NvbENsYWltcyIsIlVzZXJJbmZvU2VydmljZUN0b3IiLCJqb3NlVXRpbCIsIlRva2VuQ2xpZW50Q3RvciIsIl91c2VySW5mb1NlcnZpY2UiLCJfam9zZVV0aWwiLCJfdG9rZW5DbGllbnQiLCJfcHJvY2Vzc1NpZ25pblBhcmFtcyIsIl92YWxpZGF0ZVRva2VucyIsIl9wcm9jZXNzQ2xhaW1zIiwibm9uY2UiLCJpZF90b2tlbiIsImNvZGVfdmVyaWZpZXIiLCJjb2RlIiwiaXNPcGVuSWRDb25uZWN0IiwicHJvZmlsZSIsImdldENsYWltcyIsImNsYWltcyIsInN1YiIsImNsYWltczEiLCJjbGFpbXMyIiwicmVzdWx0IiwidmFsdWVzIiwiZm9yRWFjaCIsInR5cGUiLCJfcHJvY2Vzc0NvZGUiLCJfdmFsaWRhdGVJZFRva2VuQW5kQWNjZXNzVG9rZW4iLCJfdmFsaWRhdGVJZFRva2VuIiwiZXhjaGFuZ2VDb2RlIiwidG9rZW5SZXNwb25zZSIsIl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzIiwiY2xvY2tTa2V3SW5TZWNvbmRzIiwiX3RoaXM1IiwiX3ZhbGlkYXRlQWNjZXNzVG9rZW4iLCJfZ2V0U2lnbmluZ0tleUZvckp3dCIsIl90aGlzNiIsImtpZCIsIl9maWx0ZXJCeUFsZyIsImZpbHRlciIsIl9nZXRTaWduaW5nS2V5Rm9ySnd0V2l0aFNpbmdsZVJldHJ5IiwiX3RoaXM3IiwiX3RoaXM4IiwiYXRfaGFzaCIsImhhc2hBbGciLCJoYXNoQml0cyIsInNoYSIsImxlZnQiLCJsZWZ0X2I2NHUiLCJTZXNzaW9uTW9uaXRvciIsInVzZXJNYW5hZ2VyIiwiQ2hlY2tTZXNzaW9uSUZyYW1lQ3RvciIsIl91c2VyTWFuYWdlciIsIl9DaGVja1Nlc3Npb25JRnJhbWVDdG9yIiwiZXZlbnRzIiwiYWRkVXNlckxvYWRlZCIsIl9zdGFydCIsImFkZFVzZXJVbmxvYWRlZCIsIl9zdG9wIiwiZ2V0VXNlciIsInVzZXIiLCJtb25pdG9yQW5vbnltb3VzU2Vzc2lvbiIsInF1ZXJ5U2Vzc2lvblN0YXR1cyIsInNlc3Npb24iLCJ0bXBVc2VyIiwic2lkIiwiY2F0Y2giLCJlcnIiLCJfc3ViIiwiX3NpZCIsIl9jaGVja1Nlc3Npb25JRnJhbWUiLCJfY2hlY2tTZXNzaW9uSW50ZXJ2YWwiLCJfc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IiLCJ0aW1lckhhbmRsZSIsInJhaXNlRXZlbnQiLCJfcmFpc2VVc2VyU2Vzc2lvbkNoYW5nZWQiLCJfcmFpc2VVc2VyU2lnbmVkT3V0IiwiX3JhaXNlVXNlclNpZ25lZEluIiwiY2hlY2tTZXNzaW9uSW50ZXJ2YWwiLCJzdG9wQ2hlY2tTZXNzaW9uT25FcnJvciIsIm9pZGMiLCJpc09pZGMiLCJhZGRRdWVyeVBhcmFtIiwiY29kZV9jaGFsbGVuZ2UiLCJpc09BdXRoIiwiT2lkY1Njb3BlIiwidG9rZW5fdHlwZSIsImV4cGlyZXNfYXQiLCJzY29wZXMiLCJyYW5kb20iLCJfU3RhdGUiLCJfbm9uY2UiLCJfY29kZV92ZXJpZmllciIsIl9jb2RlX2NoYWxsZW5nZSIsIl9za2lwVXNlckluZm8iLCJjcmVhdGVkIiwic3RvcmFnZVN0cmluZyIsIlNpbGVudFJlbmV3U2VydmljZSIsIl90b2tlbkV4cGlyaW5nIiwic2lnbmluU2lsZW50IiwiX3JhaXNlU2lsZW50UmVuZXdFcnJvciIsIl9jcmVhdGVkIiwiX3JlcXVlc3RfdHlwZSIsInN0b3JhZ2UiLCJhZ2UiLCJjdXRvZmYiLCJnZXRBbGxLZXlzIiwicHJvbWlzZXMiLCJfbG9vcCIsImFsbCIsIlRpbWVyRHVyYXRpb24iLCJfRXZlbnQiLCJub3dGdW5jIiwiX25vd0Z1bmMiLCJleHBpcmF0aW9uIiwiX3RpbWVySGFuZGxlIiwiX2V4cGlyYXRpb24iLCJ0aW1lckR1cmF0aW9uIiwiZGlmZiIsImdyYW50X3R5cGUiLCJleGNoYW5nZVJlZnJlc2hUb2tlbiIsInJlZnJlc2hfdG9rZW4iLCJBY2Nlc3NUb2tlblR5cGVIaW50IiwiUmVmcmVzaFRva2VuVHlwZUhpbnQiLCJUb2tlblJldm9jYXRpb25DbGllbnQiLCJfWE1MSHR0cFJlcXVlc3RDdG9yIiwicmV2b2tlIiwicmVxdWlyZWQiLCJfcmV2b2tlIiwieGhyIiwibGFzdEluZGV4T2YiLCJyZWdleCIsIm0iLCJjb3VudGVyIiwiZXhlYyIsInZhbCIsInByb3AiLCJVc2VyIiwiX2dldENsYWltc0Zyb21Kd3QiLCJpc3N1ZXJQcm9taXNlIiwiVXNlck1hbmFnZXJTZXR0aW5ncyIsIlVzZXJNYW5hZ2VyRXZlbnRzIiwiVXNlck1hbmFnZXIiLCJfT2lkY0NsaWVudCIsIlNpbGVudFJlbmV3U2VydmljZUN0b3IiLCJTZXNzaW9uTW9uaXRvckN0b3IiLCJUb2tlblJldm9jYXRpb25DbGllbnRDdG9yIiwiX2V2ZW50cyIsIl9zaWxlbnRSZW5ld1NlcnZpY2UiLCJhdXRvbWF0aWNTaWxlbnRSZW5ldyIsInN0YXJ0U2lsZW50UmVuZXciLCJtb25pdG9yU2Vzc2lvbiIsIl9zZXNzaW9uTW9uaXRvciIsIl90b2tlblJldm9jYXRpb25DbGllbnQiLCJfbG9hZFVzZXIiLCJyZW1vdmVVc2VyIiwic3RvcmVVc2VyIiwic2lnbmluUmVkaXJlY3QiLCJuYXZQYXJhbXMiLCJfc2lnbmluU3RhcnQiLCJfcmVkaXJlY3ROYXZpZ2F0b3IiLCJzaWduaW5SZWRpcmVjdENhbGxiYWNrIiwiX3NpZ25pbkVuZCIsInNpZ25pblBvcHVwIiwicG9wdXBfcmVkaXJlY3RfdXJpIiwiX3NpZ25pbiIsIl9wb3B1cE5hdmlnYXRvciIsInNpZ25pblBvcHVwQ2FsbGJhY2siLCJfc2lnbmluQ2FsbGJhY2siLCJfdXNlUmVmcmVzaFRva2VuIiwiaW5jbHVkZUlkVG9rZW5JblNpbGVudFJlbmV3IiwidmFsaWRhdGVTdWJPblNpbGVudFJlbmV3IiwiY3VycmVudF9zdWIiLCJfc2lnbmluU2lsZW50SWZyYW1lIiwiaWRUb2tlblZhbGlkYXRpb24iLCJfdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuIiwiYXV0aF90aW1lIiwic2lsZW50X3JlZGlyZWN0X3VyaSIsIl9pZnJhbWVOYXZpZ2F0b3IiLCJzaWduaW5TaWxlbnRDYWxsYmFjayIsInNpZ25pbkNhbGxiYWNrIiwic2lnbm91dENhbGxiYWNrIiwic2lnbm91dFJlZGlyZWN0Q2FsbGJhY2siLCJzaWdub3V0UG9wdXBDYWxsYmFjayIsIl90aGlzOSIsInF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlIiwibmF2UmVzcG9uc2UiLCJzaWduaW5SZXNwb25zZSIsIm5hdmlnYXRvciIsIl90aGlzMCIsIm5hdmlnYXRvclBhcmFtcyIsIl90aGlzMSIsIl90aGlzMTAiLCJzaWdub3V0UmVkaXJlY3QiLCJwb3N0TG9nb3V0UmVkaXJlY3RVcmkiLCJfc2lnbm91dFN0YXJ0IiwiX3NpZ25vdXRFbmQiLCJzaWdub3V0UG9wdXAiLCJwb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkiLCJfc2lnbm91dCIsIl90aGlzMTEiLCJfdGhpczEyIiwicmV2b2tlUHJvbWlzZSIsInJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0IiwiX3Jldm9rZUludGVybmFsIiwic2lnbm91dFJlcXVlc3QiLCJzaWdub3V0UmVzcG9uc2UiLCJyZXZva2VBY2Nlc3NUb2tlbiIsIl90aGlzMTMiLCJzdWNjZXNzIiwiX3RoaXMxNCIsIl9yZXZva2VBY2Nlc3NUb2tlbkludGVybmFsIiwiYXRTdWNjZXNzIiwiX3Jldm9rZVJlZnJlc2hUb2tlbkludGVybmFsIiwicnRTdWNjZXNzIiwic3RvcFNpbGVudFJlbmV3IiwiX3VzZXJTdG9yZSIsIl91c2VyU3RvcmVLZXkiLCJyZWRpcmVjdE5hdmlnYXRvciIsInBvcHVwTmF2aWdhdG9yIiwiaWZyYW1lTmF2aWdhdG9yIiwidXNlclN0b3JlIiwiY29uY2F0IiwiX0FjY2Vzc1Rva2VuRXZlbnRzIiwiX3VzZXJMb2FkZWQiLCJfdXNlclVubG9hZGVkIiwiX3NpbGVudFJlbmV3RXJyb3IiLCJfdXNlclNpZ25lZEluIiwiX3VzZXJTaWduZWRPdXQiLCJfdXNlclNlc3Npb25DaGFuZ2VkIiwicmVtb3ZlVXNlckxvYWRlZCIsInJlbW92ZVVzZXJVbmxvYWRlZCIsImFkZFNpbGVudFJlbmV3RXJyb3IiLCJyZW1vdmVTaWxlbnRSZW5ld0Vycm9yIiwiYWRkVXNlclNpZ25lZEluIiwicmVtb3ZlVXNlclNpZ25lZEluIiwiYWRkVXNlclNpZ25lZE91dCIsInJlbW92ZVVzZXJTaWduZWRPdXQiLCJhZGRVc2VyU2Vzc2lvbkNoYW5nZWQiLCJyZW1vdmVVc2VyU2Vzc2lvbkNoYW5nZWQiLCJEZWZhdWx0Q2hlY2tTZXNzaW9uSW50ZXJ2YWwiLCJfT2lkY0NsaWVudFNldHRpbmdzIiwiX3JlZiRhdXRvbWF0aWNTaWxlbnRSIiwiX3JlZiR2YWxpZGF0ZVN1Yk9uU2lsIiwiX3JlZiRpbmNsdWRlSWRUb2tlbkluIiwiX3JlZiRtb25pdG9yU2Vzc2lvbiIsIl9yZWYkbW9uaXRvckFub255bW91cyIsIl9yZWYkY2hlY2tTZXNzaW9uSW50ZSIsIl9yZWYkc3RvcENoZWNrU2Vzc2lvbiIsIl9yZWYkcmV2b2tlQWNjZXNzVG9rZSIsIl9yZWYkcmVkaXJlY3ROYXZpZ2F0byIsIl9yZWYkcG9wdXBOYXZpZ2F0b3IiLCJfcmVmJGlmcmFtZU5hdmlnYXRvciIsIl9yZWYkdXNlclN0b3JlIiwic3RvcmUiLCJfcG9wdXBfcmVkaXJlY3RfdXJpIiwiX3BvcHVwX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsIl9wb3B1cFdpbmRvd0ZlYXR1cmVzIiwiX3BvcHVwV2luZG93VGFyZ2V0IiwiX3NpbGVudF9yZWRpcmVjdF91cmkiLCJfc2lsZW50UmVxdWVzdFRpbWVvdXQiLCJfYXV0b21hdGljU2lsZW50UmVuZXciLCJfdmFsaWRhdGVTdWJPblNpbGVudFJlbmV3IiwiX2luY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyIsIl9tb25pdG9yU2Vzc2lvbiIsIl9tb25pdG9yQW5vbnltb3VzU2Vzc2lvbiIsIl9xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSIsIl9yZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dCIsIl9yZWYkcHJlZml4IiwicHJlZml4IiwiX3JlZiRzdG9yZSIsIl9zdG9yZSIsIl9wcmVmaXgiLCJnZXRDcnlwdG8iLCJtc0NyeXB0byIsInNlY3VyZVV1aWQiLCJnZXRSYW5kb21WYWx1ZXMiLCJWZXJzaW9uIl0sInNvdXJjZVJvb3QiOiIifQ==