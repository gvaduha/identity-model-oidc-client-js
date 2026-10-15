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
  JoseUtil.validateJwt = function validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive) {
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.debug("JoseUtil.validateJwt");
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
    var kty = null;
    if (alg.startsWith("RS")) {
      kty = "RSA";
    } else if (alg.startsWith("PS")) {
      kty = "PS";
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
/* harmony export */   "default": function() { return /* binding */ random; }
/* harmony export */ });
/* harmony import */ var _Log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log.js */ "./src/Log.js");


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
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
}
function _uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ Math.random() * 16 >> c / 4).toString(16);
  });
}
var warned = false;
function random() {
  var hasRandomValues = !!crypto && typeof crypto.getRandomValues === 'function';
  if (!hasRandomValues && !warned) {
    warned = true;
    // state, nonce and PKCE code_verifier are built from this value
    _Log_js__WEBPACK_IMPORTED_MODULE_0__.Log.warn("random: crypto.getRandomValues is not available; falling back to Math.random, which is not cryptographically secure");
  }
  var uuid = hasRandomValues ? _cryptoUuidv4 : _uuidv4;
  return uuid().replace(/-/g, '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtB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O0FBQ007QUFDZDtBQUNoQjtBQUNKO0FBRUU7QUFFdkMsK0RBQWU7RUFDWEEsT0FBTyxFQUFQQSxpREFBTztFQUNQN3hCLEdBQUcsRUFBSEEsNENBQUc7RUFDSG1ZLFVBQVUsRUFBVkEsMERBQVU7RUFDVlAsa0JBQWtCLEVBQWxCQSwwRUFBa0I7RUFDbEI2RCxvQkFBb0IsRUFBcEJBLDhFQUFvQjtFQUNwQnZQLGtCQUFrQixFQUFsQkEsMEVBQWtCO0VBQ2xCK2MsV0FBVyxFQUFYQSw0REFBVztFQUNYOW9CLGlCQUFpQixFQUFqQkEsd0VBQWlCO0VBQ2pCNlYsZUFBZSxFQUFmQSxvRUFBZTtFQUNmNVAscUJBQXFCLEVBQXJCQSxnRkFBcUI7RUFDckJMLHNCQUFzQixFQUF0QkEsa0ZBQXNCO0VBQ3RCekQsa0JBQWtCLEVBQWxCQSwyRUFBa0I7RUFDbEJ5bEIscUJBQXFCLEVBQXJCQSxpRkFBcUI7RUFDckIzRSxjQUFjLEVBQWRBLG1FQUFjO0VBQ2QzWSxNQUFNLEVBQU5BLG1EQUFNO0VBQ05tZSxJQUFJLEVBQUpBLCtDQUFJQTtBQUNSLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL29pZGMtY2xpZW50L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9BY2Nlc3NUb2tlbkV2ZW50cy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9DaGVja1Nlc3Npb25JRnJhbWUuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvQ2xvY2tTZXJ2aWNlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0NvcmRvdmFJRnJhbWVOYXZpZ2F0b3IuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvQ29yZG92YVBvcHVwTmF2aWdhdG9yLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0NvcmRvdmFQb3B1cFdpbmRvdy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9FcnJvclJlc3BvbnNlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0V2ZW50LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9JRnJhbWVOYXZpZ2F0b3IuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvSUZyYW1lV2luZG93LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL0luTWVtb3J5V2ViU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Kb3NlVXRpbC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Kc29uU2VydmljZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Mb2cuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvTWV0YWRhdGFTZXJ2aWNlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL09pZGNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvT2lkY0NsaWVudFNldHRpbmdzLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1BvcHVwTmF2aWdhdG9yLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1BvcHVwV2luZG93LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1JlZGlyZWN0TmF2aWdhdG9yLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1Jlc3BvbnNlVmFsaWRhdG9yLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1Nlc3Npb25Nb25pdG9yLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1NpZ25pblJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvU2lnbmluUmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvU2lnbmluU3RhdGUuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvU2lnbm91dFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvU2lnbm91dFJlc3BvbnNlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1NpbGVudFJlbmV3U2VydmljZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9TdGF0ZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9UaW1lci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Ub2tlbkNsaWVudC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Ub2tlblJldm9jYXRpb25DbGllbnQuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9zcmMvVXJsVXRpbGl0eS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Vc2VyLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1VzZXJJbmZvU2VydmljZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Vc2VyTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Vc2VyTWFuYWdlckV2ZW50cy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3NyYy9Vc2VyTWFuYWdlclNldHRpbmdzLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL1dlYlN0b3JhZ2VTdGF0ZVN0b3JlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vc3JjL3JhbmRvbS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9jb3JlLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9lbmMtYmFzZTY0LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9lbmMtaGV4LmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEyNTYuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTM4NC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhNTEyLmpzIiwid2VicGFjazovL29pZGMtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy94NjQtY29yZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC9pZ25vcmVkfC9ob21lL3J1bm5lci93b3JrL2lkZW50aXR5LW1vZGVsLW9pZGMtY2xpZW50LWpzL2lkZW50aXR5LW1vZGVsLW9pZGMtY2xpZW50LWpzL25vZGVfbW9kdWxlcy9jcnlwdG8tanN8Y3J5cHRvIiwid2VicGFjazovL29pZGMtY2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29pZGMtY2xpZW50L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL29pZGMtY2xpZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL29pZGMtY2xpZW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2lkYy1jbGllbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vaWRjLWNsaWVudC8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJy4vVGltZXIuanMnO1xuXG5jb25zdCBEZWZhdWx0QWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSA2MDsgLy8gc2Vjb25kc1xuXG5leHBvcnQgY2xhc3MgQWNjZXNzVG9rZW5FdmVudHMge1xuXG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IERlZmF1bHRBY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSxcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmluZ1RpbWVyID0gbmV3IFRpbWVyKFwiQWNjZXNzIHRva2VuIGV4cGlyaW5nXCIpLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZWRUaW1lciA9IG5ldyBUaW1lcihcIkFjY2VzcyB0b2tlbiBleHBpcmVkXCIpXG4gICAgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lID0gYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWU7XG5cbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZyA9IGFjY2Vzc1Rva2VuRXhwaXJpbmdUaW1lcjtcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkID0gYWNjZXNzVG9rZW5FeHBpcmVkVGltZXI7XG4gICAgfVxuXG4gICAgbG9hZChjb250YWluZXIpIHtcbiAgICAgICAgLy8gb25seSByZWdpc3RlciBldmVudHMgaWYgdGhlcmUncyBhbiBhY2Nlc3MgdG9rZW4gYW5kIGl0IGhhcyBhbiBleHBpcmF0aW9uXG4gICAgICAgIGlmIChjb250YWluZXIuYWNjZXNzX3Rva2VuICYmIGNvbnRhaW5lci5leHBpcmVzX2luICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGNvbnRhaW5lci5leHBpcmVzX2luO1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiQWNjZXNzVG9rZW5FdmVudHMubG9hZDogYWNjZXNzIHRva2VuIHByZXNlbnQsIHJlbWFpbmluZyBkdXJhdGlvbjpcIiwgZHVyYXRpb24pO1xuXG4gICAgICAgICAgICBpZiAoZHVyYXRpb24gPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSByZWdpc3RlciBleHBpcmluZyBpZiB3ZSBzdGlsbCBoYXZlIHRpbWVcbiAgICAgICAgICAgICAgICBsZXQgZXhwaXJpbmcgPSBkdXJhdGlvbiAtIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lO1xuICAgICAgICAgICAgICAgIGlmIChleHBpcmluZyA8PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJpbmcgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJBY2Nlc3NUb2tlbkV2ZW50cy5sb2FkOiByZWdpc3RlcmluZyBleHBpcmluZyB0aW1lciBpbjpcIiwgZXhwaXJpbmcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcuaW5pdChleHBpcmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJBY2Nlc3NUb2tlbkV2ZW50cy5sb2FkOiBjYW5jZWxpbmcgZXhpc3RpbmcgZXhwaXJpbmcgdGltZXIgYmVjYXNlIHdlJ3JlIHBhc3QgZXhwaXJhdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZy5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgaXQncyBuZWdhdGl2ZSwgaXQgd2lsbCBzdGlsbCBmaXJlXG4gICAgICAgICAgICBsZXQgZXhwaXJlZCA9IGR1cmF0aW9uICsgMTtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkFjY2Vzc1Rva2VuRXZlbnRzLmxvYWQ6IHJlZ2lzdGVyaW5nIGV4cGlyZWQgdGltZXIgaW46XCIsIGV4cGlyZWQpO1xuICAgICAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkLmluaXQoZXhwaXJlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLmNhbmNlbCgpO1xuICAgICAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmVkLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5sb2FkKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJBY2Nlc3NUb2tlbkV2ZW50cy51bmxvYWQ6IGNhbmNlbGluZyBleGlzdGluZyBhY2Nlc3MgdG9rZW4gdGltZXJzXCIpO1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyZWQuY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgYWRkQWNjZXNzVG9rZW5FeHBpcmluZyhjYikge1xuICAgICAgICB0aGlzLl9hY2Nlc3NUb2tlbkV4cGlyaW5nLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVBY2Nlc3NUb2tlbkV4cGlyaW5nKGNiKSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJpbmcucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuXG4gICAgYWRkQWNjZXNzVG9rZW5FeHBpcmVkKGNiKSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJlZC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlQWNjZXNzVG9rZW5FeHBpcmVkKGNiKSB7XG4gICAgICAgIHRoaXMuX2FjY2Vzc1Rva2VuRXhwaXJlZC5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmNvbnN0IERlZmF1bHRJbnRlcnZhbCA9IDIwMDA7XG5cbmV4cG9ydCBjbGFzcyBDaGVja1Nlc3Npb25JRnJhbWUge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCBjbGllbnRfaWQsIHVybCwgaW50ZXJ2YWwsIHN0b3BPbkVycm9yID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLl9jbGllbnRfaWQgPSBjbGllbnRfaWQ7XG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCBEZWZhdWx0SW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuX3N0b3BPbkVycm9yID0gc3RvcE9uRXJyb3I7XG5cbiAgICAgICAgdmFyIGlkeCA9IHVybC5pbmRleE9mKFwiL1wiLCB1cmwuaW5kZXhPZihcIi8vXCIpICsgMik7XG4gICAgICAgIHRoaXMuX2ZyYW1lX29yaWdpbiA9IHVybC5zdWJzdHIoMCwgaWR4KTtcblxuICAgICAgICB0aGlzLl9mcmFtZSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuXG4gICAgICAgIC8vIHNob3RndW4gYXBwcm9hY2hcbiAgICAgICAgdGhpcy5fZnJhbWUuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHRoaXMuX2ZyYW1lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLl9mcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuX2ZyYW1lLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5fZnJhbWUuaGVpZ2h0ID0gMDtcblxuICAgICAgICB0aGlzLl9mcmFtZS5zcmMgPSB1cmw7XG4gICAgfVxuICAgIGxvYWQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZnJhbWUpO1xuICAgICAgICAgICAgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQgPSB0aGlzLl9tZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9tZXNzYWdlKGUpIHtcbiAgICAgICAgaWYgKGUub3JpZ2luID09PSB0aGlzLl9mcmFtZV9vcmlnaW4gJiZcbiAgICAgICAgICAgIGUuc291cmNlID09PSB0aGlzLl9mcmFtZS5jb250ZW50V2luZG93XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGUuZGF0YSA9PT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiQ2hlY2tTZXNzaW9uSUZyYW1lOiBlcnJvciBtZXNzYWdlIGZyb20gY2hlY2sgc2Vzc2lvbiBvcCBpZnJhbWVcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0b3BPbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGUuZGF0YSA9PT0gXCJjaGFuZ2VkXCIpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJDaGVja1Nlc3Npb25JRnJhbWU6IGNoYW5nZWQgbWVzc2FnZSBmcm9tIGNoZWNrIHNlc3Npb24gb3AgaWZyYW1lXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJDaGVja1Nlc3Npb25JRnJhbWU6IFwiICsgZS5kYXRhICsgXCIgbWVzc2FnZSBmcm9tIGNoZWNrIHNlc3Npb24gb3AgaWZyYW1lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0KHNlc3Npb25fc3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Nlc3Npb25fc3RhdGUgIT09IHNlc3Npb25fc3RhdGUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNoZWNrU2Vzc2lvbklGcmFtZS5zdGFydFwiKTtcblxuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25fc3RhdGUgPSBzZXNzaW9uX3N0YXRlO1xuXG4gICAgICAgICAgICBsZXQgc2VuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKHRoaXMuX2NsaWVudF9pZCArIFwiIFwiICsgdGhpcy5fc2Vzc2lvbl9zdGF0ZSwgdGhpcy5fZnJhbWVfb3JpZ2luKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgbm93XG4gICAgICAgICAgICBzZW5kKCk7XG5cbiAgICAgICAgICAgIC8vIGFuZCBzZXR1cCB0aW1lclxuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoc2VuZCwgdGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5fc2Vzc2lvbl9zdGF0ZSA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJDaGVja1Nlc3Npb25JRnJhbWUuc3RvcFwiKTtcblxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5fdGltZXIpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENsb2NrU2VydmljZSB7XG4gICAgZ2V0RXBvY2hUaW1lKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKERhdGUubm93KCkgLyAxMDAwIHwgMCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgQ29yZG92YVBvcHVwV2luZG93IH0gZnJvbSAnLi9Db3Jkb3ZhUG9wdXBXaW5kb3cuanMnO1xuXG5leHBvcnQgY2xhc3MgQ29yZG92YUlGcmFtZU5hdmlnYXRvciB7XG5cbiAgICBwcmVwYXJlKHBhcmFtcykge1xuICAgICAgICBwYXJhbXMucG9wdXBXaW5kb3dGZWF0dXJlcyA9ICdoaWRkZW49eWVzJztcbiAgICAgICAgbGV0IHBvcHVwID0gbmV3IENvcmRvdmFQb3B1cFdpbmRvdyhwYXJhbXMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBvcHVwKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBDb3Jkb3ZhUG9wdXBXaW5kb3cgfSBmcm9tICcuL0NvcmRvdmFQb3B1cFdpbmRvdy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDb3Jkb3ZhUG9wdXBOYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZShwYXJhbXMpIHtcbiAgICAgICAgbGV0IHBvcHVwID0gbmV3IENvcmRvdmFQb3B1cFdpbmRvdyhwYXJhbXMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBvcHVwKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmNvbnN0IERlZmF1bHRQb3B1cEZlYXR1cmVzID0gJ2xvY2F0aW9uPW5vLHRvb2xiYXI9bm8sem9vbT1ubyc7XG5jb25zdCBEZWZhdWx0UG9wdXBUYXJnZXQgPSBcIl9ibGFua1wiO1xuXG5leHBvcnQgY2xhc3MgQ29yZG92YVBvcHVwV2luZG93IHtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZmVhdHVyZXMgPSBwYXJhbXMucG9wdXBXaW5kb3dGZWF0dXJlcyB8fCBEZWZhdWx0UG9wdXBGZWF0dXJlcztcbiAgICAgICAgdGhpcy50YXJnZXQgPSBwYXJhbXMucG9wdXBXaW5kb3dUYXJnZXQgfHwgRGVmYXVsdFBvcHVwVGFyZ2V0O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWRpcmVjdF91cmkgPSBwYXJhbXMuc3RhcnRVcmw7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkNvcmRvdmFQb3B1cFdpbmRvdy5jdG9yOiByZWRpcmVjdF91cmk6IFwiICsgdGhpcy5yZWRpcmVjdF91cmkpO1xuICAgIH1cblxuICAgIF9pc0luQXBwQnJvd3Nlckluc3RhbGxlZChjb3Jkb3ZhTWV0YWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIFtcImNvcmRvdmEtcGx1Z2luLWluYXBwYnJvd3NlclwiLCBcImNvcmRvdmEtcGx1Z2luLWluYXBwYnJvd3Nlci5pbmFwcGJyb3dzZXJcIiwgXCJvcmcuYXBhY2hlLmNvcmRvdmEuaW5hcHBicm93c2VyXCJdLnNvbWUoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb3Jkb3ZhTWV0YWRhdGEuaGFzT3duUHJvcGVydHkobmFtZSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgbmF2aWdhdGUocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMudXJsKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIk5vIHVybCBwcm92aWRlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghd2luZG93LmNvcmRvdmEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXJyb3IoXCJjb3Jkb3ZhIGlzIHVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgY29yZG92YU1ldGFkYXRhID0gd2luZG93LmNvcmRvdmEucmVxdWlyZShcImNvcmRvdmEvcGx1Z2luX2xpc3RcIikubWV0YWRhdGE7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNJbkFwcEJyb3dzZXJJbnN0YWxsZWQoY29yZG92YU1ldGFkYXRhKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXJyb3IoXCJJbkFwcEJyb3dzZXIgcGx1Z2luIG5vdCBmb3VuZFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcG9wdXAgPSBjb3Jkb3ZhLkluQXBwQnJvd3Nlci5vcGVuKHBhcmFtcy51cmwsIHRoaXMudGFyZ2V0LCB0aGlzLmZlYXR1cmVzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNvcmRvdmFQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogcG9wdXAgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5fZXhpdENhbGxiYWNrRXZlbnQgPSB0aGlzLl9leGl0Q2FsbGJhY2suYmluZCh0aGlzKTsgXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFN0YXJ0Q2FsbGJhY2tFdmVudCA9IHRoaXMuX2xvYWRTdGFydENhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcImV4aXRcIiwgdGhpcy5fZXhpdENhbGxiYWNrRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsIHRoaXMuX2xvYWRTdGFydENhbGxiYWNrRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJFcnJvciBvcGVuaW5nIHBvcHVwIHdpbmRvd1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldCBwcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG5cbiAgICBfbG9hZFN0YXJ0Q2FsbGJhY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnVybC5pbmRleE9mKHRoaXMucmVkaXJlY3RfdXJpKSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3VjY2Vzcyh7IHVybDogZXZlbnQudXJsIH0pO1xuICAgICAgICB9ICAgIFxuICAgIH1cbiAgICBfZXhpdENhbGxiYWNrKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5fZXJyb3IobWVzc2FnZSk7ICAgIFxuICAgIH1cbiAgICBcbiAgICBfc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcblxuICAgICAgICBMb2cuZGVidWcoXCJDb3Jkb3ZhUG9wdXBXaW5kb3c6IFN1Y2Nlc3NmdWwgcmVzcG9uc2UgZnJvbSBjb3Jkb3ZhIHBvcHVwIHdpbmRvd1wiKTtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZShkYXRhKTtcbiAgICB9XG4gICAgX2Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgICAgIExvZy5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fcmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICB9XG5cbiAgICBfY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BvcHVwKXtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIkNvcmRvdmFQb3B1cFdpbmRvdzogY2xlYW5pbmcgdXAgcG9wdXBcIik7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhpdFwiLCB0aGlzLl9leGl0Q2FsbGJhY2tFdmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRzdGFydFwiLCB0aGlzLl9sb2FkU3RhcnRDYWxsYmFja0V2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BvcHVwID0gbnVsbDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBFcnJvclJlc3BvbnNlIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHtlcnJvciwgZXJyb3JfZGVzY3JpcHRpb24sIGVycm9yX3VyaSwgc3RhdGUsIHNlc3Npb25fc3RhdGV9PXt9XG4gICAgKSB7XG4gICAgICAgICBpZiAoIWVycm9yKXtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk5vIGVycm9yIHBhc3NlZCB0byBFcnJvclJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXJyb3JcIik7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlcihlcnJvcl9kZXNjcmlwdGlvbiB8fCBlcnJvcik7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gXCJFcnJvclJlc3BvbnNlXCI7XG5cbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLmVycm9yX2Rlc2NyaXB0aW9uID0gZXJyb3JfZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZXJyb3JfdXJpID0gZXJyb3JfdXJpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zZXNzaW9uX3N0YXRlID0gc2Vzc2lvbl9zdGF0ZTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBFdmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRIYW5kbGVyKGNiKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICB9XG5cbiAgICByZW1vdmVIYW5kbGVyKGNiKSB7XG4gICAgICAgIHZhciBpZHggPSB0aGlzLl9jYWxsYmFja3MuZmluZEluZGV4KGl0ZW0gPT4gaXRlbSA9PT0gY2IpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJhaXNlKC4uLnBhcmFtcykge1xuICAgICAgICBMb2cuZGVidWcoXCJFdmVudDogUmFpc2luZyBldmVudDogXCIgKyB0aGlzLl9uYW1lKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1tpXSguLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuY29uc3QgdGltZXIgPSB7XG4gICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uIChjYiwgZHVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHNldEludGVydmFsKGNiLCBkdXJhdGlvbik7XG4gICAgfSxcbiAgICBjbGVhckludGVydmFsOiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHJldHVybiBjbGVhckludGVydmFsKGhhbmRsZSk7XG4gICAgfVxufTtcblxubGV0IHRlc3RpbmcgPSBmYWxzZTtcbmxldCByZXF1ZXN0ID0gbnVsbDtcblxuZXhwb3J0IGNsYXNzIEdsb2JhbCB7XG5cbiAgICBzdGF0aWMgX3Rlc3RpbmcoKSB7XG4gICAgICAgIHRlc3RpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbG9jYXRpb24oKSB7XG4gICAgICAgIGlmICghdGVzdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsb2NhbFN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICghdGVzdGluZyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgc2Vzc2lvblN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICghdGVzdGluZyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFhNTEh0dHBSZXF1ZXN0KG5ld1JlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdCA9IG5ld1JlcXVlc3Q7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBYTUxIdHRwUmVxdWVzdCgpIHtcbiAgICAgICAgaWYgKCF0ZXN0aW5nICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCB8fCBYTUxIdHRwUmVxdWVzdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgdGltZXIoKSB7XG4gICAgICAgIGlmICghdGVzdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVyO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgSUZyYW1lV2luZG93IH0gZnJvbSAnLi9JRnJhbWVXaW5kb3cuanMnO1xuXG5leHBvcnQgY2xhc3MgSUZyYW1lTmF2aWdhdG9yIHtcblxuICAgIHByZXBhcmUocGFyYW1zKSB7XG4gICAgICAgIGxldCBmcmFtZSA9IG5ldyBJRnJhbWVXaW5kb3cocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmcmFtZSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2sodXJsKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZU5hdmlnYXRvci5jYWxsYmFja1wiKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgSUZyYW1lV2luZG93Lm5vdGlmeVBhcmVudCh1cmwpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmNvbnN0IERlZmF1bHRUaW1lb3V0ID0gMTAwMDA7XG5cbmV4cG9ydCBjbGFzcyBJRnJhbWVXaW5kb3cge1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQgPSB0aGlzLl9tZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuX2ZyYW1lID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG5cbiAgICAgICAgLy8gc2hvdGd1biBhcHByb2FjaFxuICAgICAgICB0aGlzLl9mcmFtZS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGhpcy5fZnJhbWUuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMuX2ZyYW1lLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5fZnJhbWUuaGVpZ2h0ID0gMDtcblxuICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9mcmFtZSk7XG4gICAgfVxuXG4gICAgbmF2aWdhdGUocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMudXJsKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIk5vIHVybCBwcm92aWRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0aW1lb3V0ID0gcGFyYW1zLnNpbGVudFJlcXVlc3RUaW1lb3V0IHx8IERlZmF1bHRUaW1lb3V0O1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93Lm5hdmlnYXRlOiBVc2luZyB0aW1lb3V0IG9mOlwiLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gd2luZG93LnNldFRpbWVvdXQodGhpcy5fdGltZW91dC5iaW5kKHRoaXMpLCB0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lLnNyYyA9IHBhcmFtcy51cmw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlO1xuICAgIH1cblxuICAgIGdldCBwcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG5cbiAgICBfc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcblxuICAgICAgICBMb2cuZGVidWcoXCJJRnJhbWVXaW5kb3c6IFN1Y2Nlc3NmdWwgcmVzcG9uc2UgZnJvbSBmcmFtZSB3aW5kb3dcIik7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUoZGF0YSk7XG4gICAgfVxuICAgIF9lcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcblxuICAgICAgICBMb2cuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuX3JlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgfVxuXG4gICAgX2NsZWFudXAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9mcmFtZSkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93OiBjbGVhbnVwXCIpO1xuXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5fYm91bmRNZXNzYWdlRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fZnJhbWUpO1xuXG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9ib3VuZE1lc3NhZ2VFdmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdGltZW91dCgpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93LnRpbWVvdXRcIik7XG4gICAgICAgIHRoaXMuX2Vycm9yKFwiRnJhbWUgd2luZG93IHRpbWVkIG91dFwiKTtcbiAgICB9XG5cbiAgICBfbWVzc2FnZShlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdy5tZXNzYWdlXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLl90aW1lciAmJlxuICAgICAgICAgICAgZS5vcmlnaW4gPT09IHRoaXMuX29yaWdpbiAmJlxuICAgICAgICAgICAgZS5zb3VyY2UgPT09IHRoaXMuX2ZyYW1lLmNvbnRlbnRXaW5kb3cgJiZcbiAgICAgICAgICAgICh0eXBlb2YgZS5kYXRhID09PSAnc3RyaW5nJyAmJiAoZS5kYXRhLnN0YXJ0c1dpdGgoJ2h0dHA6Ly8nKSB8fCBlLmRhdGEuc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKSkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgbGV0IHVybCA9IGUuZGF0YTtcbiAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWNjZXNzKHsgdXJsOiB1cmwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvcihcIkludmFsaWQgcmVzcG9uc2UgZnJvbSBmcmFtZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBfb3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICAgIH1cblxuICAgIHN0YXRpYyBub3RpZnlQYXJlbnQodXJsKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIklGcmFtZVdpbmRvdy5ub3RpZnlQYXJlbnRcIik7XG4gICAgICAgIHVybCA9IHVybCB8fCB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiSUZyYW1lV2luZG93Lm5vdGlmeVBhcmVudDogcG9zdGluZyB1cmwgbWVzc2FnZSB0byBwYXJlbnRcIik7XG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHVybCwgbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIEluTWVtb3J5V2ViU3RvcmFnZXtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuXG4gICAgZ2V0SXRlbShrZXkpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiSW5NZW1vcnlXZWJTdG9yYWdlLmdldEl0ZW1cIiwga2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFba2V5XTtcbiAgICB9XG5cbiAgICBzZXRJdGVtKGtleSwgdmFsdWUpe1xuICAgICAgICBMb2cuZGVidWcoXCJJbk1lbW9yeVdlYlN0b3JhZ2Uuc2V0SXRlbVwiLCBrZXkpO1xuICAgICAgICB0aGlzLl9kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGtleSl7XG4gICAgICAgIExvZy5kZWJ1ZyhcIkluTWVtb3J5V2ViU3RvcmFnZS5yZW1vdmVJdGVtXCIsIGtleSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhW2tleV07XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX2RhdGEpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBrZXkoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX2RhdGEpW2luZGV4XTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG4vLyBKV1QgcGFyc2luZyBhbmQgdmFsaWRhdGlvbi5cbi8vIC0gU2lnbmF0dXJlcyBhcmUgdmVyaWZpZWQgd2l0aCBXZWJDcnlwdG8gKGNyeXB0by5zdWJ0bGUpOiBSUy9QUy9FUyAyNTYvMzg0LzUxMi5cbi8vIC0gSGFzaGluZyAoYXRfaGFzaCAvIGNfaGFzaCAvIFBLQ0UpIHVzZXMgY3J5cHRvLWpzLlxuLy8gLSBCYXNlNjQgZGVjb2RpbmcgdXNlcyBiYXNlNjQtanMuXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCBTSEEyNTYgZnJvbSAnY3J5cHRvLWpzL3NoYTI1Ni5qcyc7XG5pbXBvcnQgU0hBMzg0IGZyb20gJ2NyeXB0by1qcy9zaGEzODQuanMnO1xuaW1wb3J0IFNIQTUxMiBmcm9tICdjcnlwdG8tanMvc2hhNTEyLmpzJztcbmltcG9ydCBIZXggZnJvbSAnY3J5cHRvLWpzL2VuYy1oZXguanMnO1xuaW1wb3J0IEJhc2U2NCBmcm9tICdjcnlwdG8tanMvZW5jLWJhc2U2NC5qcyc7XG5pbXBvcnQgeyB0b0J5dGVBcnJheSB9IGZyb20gJ2Jhc2U2NC1qcyc7XG5cbmNvbnN0IEFsbG93ZWRTaWduaW5nQWxncyA9IFsnUlMyNTYnLCAnUlMzODQnLCAnUlM1MTInLCAnUFMyNTYnLCAnUFMzODQnLCAnUFM1MTInLCAnRVMyNTYnLCAnRVMzODQnLCAnRVM1MTInXTtcblxuY29uc3QgSGFzaGVycyA9IHsgc2hhMjU2OiBTSEEyNTYsIHNoYTM4NDogU0hBMzg0LCBzaGE1MTI6IFNIQTUxMiB9O1xuXG5mdW5jdGlvbiBiNjRUb0J5dGVzKHMpIHtcbiAgICBzID0gcy5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgd2hpbGUgKHMubGVuZ3RoICUgNCkge1xuICAgICAgICBzICs9ICc9JztcbiAgICB9XG4gICAgcmV0dXJuIHRvQnl0ZUFycmF5KHMpO1xufVxuXG5mdW5jdGlvbiB1dGY4RGVjb2RlKGJ5dGVzKSB7XG4gICAgbGV0IGVzY2FwZWQgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVzY2FwZWQgKz0gJyUnICsgKCcwJyArIGJ5dGVzW2ldLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZWQpO1xufVxuXG5mdW5jdGlvbiBiNjR1VG9Kc29uKHMpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh1dGY4RGVjb2RlKGI2NFRvQnl0ZXMocykpKTtcbn1cblxuLy8gVGhlIEpXUyBzaWduaW5nIGlucHV0IGlzIGJhc2U2NHVybCB0ZXh0LCBpLmUuIHB1cmUgQVNDSUlcbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyhzKSB7XG4gICAgY29uc3Qgb3V0ID0gbmV3IFVpbnQ4QXJyYXkocy5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBvdXRbaV0gPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFN1YnRsZSgpIHtcbiAgICBjb25zdCBjID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jcnlwdG8pIHx8XG4gICAgICAgICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcy5jcnlwdG8pIHx8XG4gICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuY3J5cHRvKTtcbiAgICBpZiAoIWMgfHwgIWMuc3VidGxlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViQ3J5cHRvIChjcnlwdG8uc3VidGxlKSBpcyBub3QgYXZhaWxhYmxlOyBhIHNlY3VyZSBjb250ZXh0IChodHRwcykgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGMuc3VidGxlO1xufVxuXG4vLyBNaW5pbWFsIERFUiByZWFkZXI6IHJldHVybnMgdGFnLCBjb250ZW50IHN0YXJ0L2VuZCBhbmQgdGhlIGZ1bGwgZWxlbWVudCBlbmRcbmZ1bmN0aW9uIHJlYWRUbHYoYnl0ZXMsIG9mZnNldCkge1xuICAgIGNvbnN0IHRhZyA9IGJ5dGVzW29mZnNldF07XG4gICAgbGV0IGxlbiA9IGJ5dGVzW29mZnNldCArIDFdO1xuICAgIGxldCBzdGFydCA9IG9mZnNldCArIDI7XG4gICAgaWYgKGxlbiAmIDB4ODApIHtcbiAgICAgICAgY29uc3QgbiA9IGxlbiAmIDB4N2Y7XG4gICAgICAgIGlmIChuIDwgMSB8fCBuID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBERVIgbGVuZ3RoJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGxlbiA9IChsZW4gKiAyNTYpICsgYnl0ZXNbc3RhcnQgKyBpXTtcbiAgICAgICAgfVxuICAgICAgICBzdGFydCArPSBuO1xuICAgIH1cbiAgICBjb25zdCBlbmQgPSBzdGFydCArIGxlbjtcbiAgICBpZiAoZW5kID4gYnl0ZXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHJ1bmNhdGVkIERFUiBlbGVtZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiB7IHRhZywgc3RhcnQsIGVuZCB9O1xufVxuXG4vLyBFeHRyYWN0cyB0aGUgREVSIFN1YmplY3RQdWJsaWNLZXlJbmZvIGZyb20gYSBERVIgWC41MDkgY2VydGlmaWNhdGVcbmZ1bmN0aW9uIHNwa2lGcm9tQ2VydGlmaWNhdGUoZGVyKSB7XG4gICAgY29uc3QgY2VydCA9IHJlYWRUbHYoZGVyLCAwKTtcbiAgICBpZiAoY2VydC50YWcgIT09IDB4MzApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNlcnRpZmljYXRlJyk7XG4gICAgfVxuICAgIGNvbnN0IHRicyA9IHJlYWRUbHYoZGVyLCBjZXJ0LnN0YXJ0KTtcbiAgICBpZiAodGJzLnRhZyAhPT0gMHgzMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY2VydGlmaWNhdGUnKTtcbiAgICB9XG4gICAgbGV0IHBvcyA9IHRicy5zdGFydDtcbiAgICBsZXQgZWwgPSByZWFkVGx2KGRlciwgcG9zKTtcbiAgICBpZiAoZWwudGFnID09PSAweGEwKSB7IC8vIFswXSB2ZXJzaW9uXG4gICAgICAgIHBvcyA9IGVsLmVuZDtcbiAgICAgICAgZWwgPSByZWFkVGx2KGRlciwgcG9zKTtcbiAgICB9XG4gICAgLy8gc2VyaWFsTnVtYmVyLCBzaWduYXR1cmUsIGlzc3VlciwgdmFsaWRpdHksIHN1YmplY3RcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBwb3MgPSBlbC5lbmQ7XG4gICAgICAgIGVsID0gcmVhZFRsdihkZXIsIHBvcyk7XG4gICAgfVxuICAgIGlmIChlbC50YWcgIT09IDB4MzApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNlcnRpZmljYXRlOiBzdWJqZWN0UHVibGljS2V5SW5mbyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlci5zbGljZShwb3MsIGVsLmVuZCk7XG59XG5cbi8vIE5vcm1hbGl6ZXMgYSBKV0sgaW50byB3aGF0IFdlYkNyeXB0byBpbXBvcnRLZXkgYWNjZXB0cy5cbi8vIEV4dHJhIG1lbWJlcnMgKGFsZywgdXNlLCBrZXlfb3BzLCBraWQsIHg1dC4uLikgYXJlIGRyb3BwZWQgYmVjYXVzZSB0aGV5IGNhbiBtYWtlIGltcG9ydEtleSByZWplY3QuXG5mdW5jdGlvbiByZXNvbHZlS2V5KGtleSkge1xuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQga2V5IHR5cGU6ICcgKyBrZXkpO1xuICAgIH1cbiAgICBpZiAoa2V5Lmt0eSA9PT0gJ1JTQScpIHtcbiAgICAgICAgaWYgKGtleS5lICYmIGtleS5uKSB7XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdSU0EnLCBmb3JtYXQ6ICdqd2snLCBkYXRhOiB7IGt0eTogJ1JTQScsIG46IGtleS5uLCBlOiBrZXkuZSwgZXh0OiB0cnVlIH0gfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5Lng1YyAmJiBrZXkueDVjLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHsga3R5OiAnUlNBJywgZm9ybWF0OiAnc3BraScsIGRhdGE6IHNwa2lGcm9tQ2VydGlmaWNhdGUoYjY0VG9CeXRlcyhrZXkueDVjWzBdKSkgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JTQSBrZXkgbWlzc2luZyBrZXkgbWF0ZXJpYWwnKTtcbiAgICB9XG4gICAgaWYgKGtleS5rdHkgPT09ICdFQycpIHtcbiAgICAgICAgaWYgKGtleS5jcnYgJiYga2V5LnggJiYga2V5LnkpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ0VDJywgY3J2OiBrZXkuY3J2LCBmb3JtYXQ6ICdqd2snLCBkYXRhOiB7IGt0eTogJ0VDJywgY3J2OiBrZXkuY3J2LCB4OiBrZXkueCwgeToga2V5LnksIGV4dDogdHJ1ZSB9IH07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFQyBrZXkgbWlzc2luZyBrZXkgbWF0ZXJpYWwnKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBrZXkgdHlwZTogJyArIGtleS5rdHkpO1xufVxuXG4vLyBNYXBzIGEgSldTIGFsZyB0byBXZWJDcnlwdG8gaW1wb3J0L3ZlcmlmeSBwYXJhbWV0ZXJzXG5mdW5jdGlvbiBhbGdQYXJhbXMoYWxnKSB7XG4gICAgY29uc3QgYml0cyA9IGFsZy5zdWJzdHIoMik7XG4gICAgY29uc3QgaGFzaCA9IHsgbmFtZTogJ1NIQS0nICsgYml0cyB9O1xuICAgIHN3aXRjaCAoYWxnLnN1YnN0cigwLCAyKSkge1xuICAgICAgICBjYXNlICdSUyc6XG4gICAgICAgICAgICByZXR1cm4geyBrdHk6ICdSU0EnLCBpbXBvcnRBbGc6IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JywgaGFzaCB9LCB2ZXJpZnlBbGc6IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JyB9IH07XG4gICAgICAgIGNhc2UgJ1BTJzpcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ1JTQScsIGltcG9ydEFsZzogeyBuYW1lOiAnUlNBLVBTUycsIGhhc2ggfSwgdmVyaWZ5QWxnOiB7IG5hbWU6ICdSU0EtUFNTJywgc2FsdExlbmd0aDogcGFyc2VJbnQoYml0cywgMTApIC8gOCB9IH07XG4gICAgICAgIGNhc2UgJ0VTJzoge1xuICAgICAgICAgICAgY29uc3QgY3VydmUgPSB7ICcyNTYnOiAnUC0yNTYnLCAnMzg0JzogJ1AtMzg0JywgJzUxMic6ICdQLTUyMScgfVtiaXRzXTtcbiAgICAgICAgICAgIHJldHVybiB7IGt0eTogJ0VDJywgY3VydmUsIGltcG9ydEFsZzogeyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiBjdXJ2ZSB9LCB2ZXJpZnlBbGc6IHsgbmFtZTogJ0VDRFNBJywgaGFzaCB9IH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBhbGc6ICcgKyBhbGcpO1xufVxuXG5leHBvcnQgY2xhc3MgSm9zZVV0aWwge1xuXG4gICAgc3RhdGljIHBhcnNlSnd0KGp3dCkge1xuICAgICAgICBMb2cuZGVidWcoXCJKb3NlVXRpbC5wYXJzZUp3dFwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gand0LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgSldUJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhlYWRlcjogYjY0dVRvSnNvbihwYXJ0c1swXSksXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogYjY0dVRvSnNvbihwYXJ0c1sxXSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB2YWxpZGF0ZUp3dChqd3QsIGtleSwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3LCBub3csIHRpbWVJbnNlbnNpdGl2ZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJKb3NlVXRpbC52YWxpZGF0ZUp3dFwiKTtcblxuICAgICAgICBsZXQgcmVzb2x2ZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNvbHZlZCA9IHJlc29sdmVLZXkoa2V5KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwudmFsaWRhdGVKd3Q6IFwiICsgKGUgJiYgZS5tZXNzYWdlKSwga2V5KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBKb3NlVXRpbC52YWxpZGF0ZUp3dEF0dHJpYnV0ZXMoand0LCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXcsIG5vdywgdGltZUluc2Vuc2l0aXZlKS50aGVuKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEpvc2VVdGlsLl92ZXJpZnlTaWduYXR1cmUoand0LCByZXNvbHZlZCkudGhlbih2YWxpZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IHNpZ25hdHVyZSB2YWxpZGF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcInNpZ25hdHVyZSB2YWxpZGF0aW9uIGZhaWxlZFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgICAgICAgICAgfSwgZSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKGUgJiYgZS5tZXNzYWdlIHx8IGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzaWduYXR1cmUgdmFsaWRhdGlvbiBmYWlsZWRcIikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdmVyaWZ5U2lnbmF0dXJlKGp3dCwgcmVzb2x2ZWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gand0LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBjb25zdCBhbGcgPSBiNjR1VG9Kc29uKHBhcnRzWzBdKS5hbGc7XG4gICAgICAgICAgICBpZiAoQWxsb3dlZFNpZ25pbmdBbGdzLmluZGV4T2YoYWxnKSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FsZyBub3QgYWxsb3dlZDogJyArIGFsZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwID0gYWxnUGFyYW1zKGFsZyk7XG4gICAgICAgICAgICBpZiAocC5rdHkgIT09IHJlc29sdmVkLmt0eSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignS2V5IHR5cGUgJyArIHJlc29sdmVkLmt0eSArICcgZG9lcyBub3QgbWF0Y2ggYWxnICcgKyBhbGcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHAuY3VydmUgJiYgcmVzb2x2ZWQuY3J2ICYmIHAuY3VydmUgIT09IHJlc29sdmVkLmNydikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRUMga2V5IGN1cnZlICcgKyByZXNvbHZlZC5jcnYgKyAnIGRvZXMgbm90IG1hdGNoIGFsZyAnICsgYWxnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN1YnRsZSA9IGdldFN1YnRsZSgpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGFzY2lpVG9CeXRlcyhwYXJ0c1swXSArICcuJyArIHBhcnRzWzFdKTtcbiAgICAgICAgICAgIC8vIEpXUyBFQ0RTQSBzaWduYXR1cmVzIGFyZSByYXcgcnx8cywgd2hpY2ggaXMgdGhlIGZvcm1hdCBXZWJDcnlwdG8gZXhwZWN0c1xuICAgICAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYjY0VG9CeXRlcyhwYXJ0c1syXSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHN1YnRsZS5pbXBvcnRLZXkocmVzb2x2ZWQuZm9ybWF0LCByZXNvbHZlZC5kYXRhLCBwLmltcG9ydEFsZywgZmFsc2UsIFsndmVyaWZ5J10pKVxuICAgICAgICAgICAgICAgIC50aGVuKGNyeXB0b0tleSA9PiBzdWJ0bGUudmVyaWZ5KHAudmVyaWZ5QWxnLCBjcnlwdG9LZXksIHNpZ25hdHVyZSwgZGF0YSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdmFsaWRhdGVKd3RBdHRyaWJ1dGVzKGp3dCwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3LCBub3csIHRpbWVJbnNlbnNpdGl2ZSkge1xuICAgICAgICBpZiAoIWNsb2NrU2tldykge1xuICAgICAgICAgICAgY2xvY2tTa2V3ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbm93KSB7XG4gICAgICAgICAgICBub3cgPSBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJzZWQgPSBKb3NlVXRpbC5wYXJzZUp3dChqd3QpO1xuICAgICAgICBpZiAoIXBhcnNlZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSBKV1RcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBwYXJzZWQucGF5bG9hZDtcblxuICAgICAgICBpZiAoIXBheWxvYWQuaXNzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IGlzc3VlciB3YXMgbm90IHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImlzc3VlciB3YXMgbm90IHByb3ZpZGVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5pc3MgIT09IGlzc3Vlcikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBJbnZhbGlkIGlzc3VlciBpbiB0b2tlblwiLCBwYXlsb2FkLmlzcyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBpc3N1ZXIgaW4gdG9rZW46IFwiICsgcGF5bG9hZC5pc3MpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGF5bG9hZC5hdWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogYXVkIHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXVkIHdhcyBub3QgcHJvdmlkZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbGlkQXVkaWVuY2UgPSBwYXlsb2FkLmF1ZCA9PT0gYXVkaWVuY2UgfHwgKEFycmF5LmlzQXJyYXkocGF5bG9hZC5hdWQpICYmIHBheWxvYWQuYXVkLmluZGV4T2YoYXVkaWVuY2UpID49IDApO1xuICAgICAgICBpZiAoIXZhbGlkQXVkaWVuY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogSW52YWxpZCBhdWRpZW5jZSBpbiB0b2tlblwiLCBwYXlsb2FkLmF1ZCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBhdWRpZW5jZSBpbiB0b2tlbjogXCIgKyBwYXlsb2FkLmF1ZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmF6cCAmJiBwYXlsb2FkLmF6cCAhPT0gYXVkaWVuY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogSW52YWxpZCBhenAgaW4gdG9rZW5cIiwgcGF5bG9hZC5henApO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgYXpwIGluIHRva2VuOiBcIiArIHBheWxvYWQuYXpwKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRpbWVJbnNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgY29uc3QgbG93ZXJOb3cgPSBub3cgKyBjbG9ja1NrZXc7XG4gICAgICAgICAgICBjb25zdCB1cHBlck5vdyA9IG5vdyAtIGNsb2NrU2tldztcblxuICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmlhdCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogaWF0IHdhcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImlhdCB3YXMgbm90IHByb3ZpZGVkXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsb3dlck5vdyA8IHBheWxvYWQuaWF0KSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBpYXQgaXMgaW4gdGhlIGZ1dHVyZVwiLCBwYXlsb2FkLmlhdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImlhdCBpcyBpbiB0aGUgZnV0dXJlOiBcIiArIHBheWxvYWQuaWF0KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXlsb2FkLm5iZiAmJiBsb3dlck5vdyA8IHBheWxvYWQubmJmKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSm9zZVV0aWwuX3ZhbGlkYXRlSnd0OiBuYmYgaXMgaW4gdGhlIGZ1dHVyZVwiLCBwYXlsb2FkLm5iZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIm5iZiBpcyBpbiB0aGUgZnV0dXJlOiBcIiArIHBheWxvYWQubmJmKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcGF5bG9hZC5leHApIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKb3NlVXRpbC5fdmFsaWRhdGVKd3Q6IGV4cCB3YXMgbm90IHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJleHAgd2FzIG5vdCBwcm92aWRlZFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5leHAgPCB1cHBlck5vdykge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpvc2VVdGlsLl92YWxpZGF0ZUp3dDogZXhwIGlzIGluIHRoZSBwYXN0XCIsIHBheWxvYWQuZXhwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiZXhwIGlzIGluIHRoZSBwYXN0OlwiICsgcGF5bG9hZC5leHApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocGF5bG9hZCk7XG4gICAgfVxuXG4gICAgLy8gVVRGLTggaW5wdXQsIGxvd2VyY2FzZSBoZXggb3V0cHV0XG4gICAgc3RhdGljIGhhc2hTdHJpbmcodmFsdWUsIGFsZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaGFzaGVyID0gSGFzaGVyc1tTdHJpbmcoYWxnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCAnJyldO1xuICAgICAgICAgICAgaWYgKCFoYXNoZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGhhc2ggYWxnOiAnICsgYWxnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoYXNoZXIodmFsdWUpLnRvU3RyaW5nKEhleCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBoZXhUb0Jhc2U2NFVybCh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEJhc2U2NC5zdHJpbmdpZnkoSGV4LnBhcnNlKHZhbHVlKSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICdfJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvPSskLywgJycpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBKc29uU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGFkZGl0aW9uYWxDb250ZW50VHlwZXMgPSBudWxsLCBcbiAgICAgICAgWE1MSHR0cFJlcXVlc3RDdG9yID0gR2xvYmFsLlhNTEh0dHBSZXF1ZXN0LCBcbiAgICAgICAgand0SGFuZGxlciA9IG51bGxcbiAgICApIHtcbiAgICAgICAgaWYgKGFkZGl0aW9uYWxDb250ZW50VHlwZXMgJiYgQXJyYXkuaXNBcnJheShhZGRpdGlvbmFsQ29udGVudFR5cGVzKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFR5cGVzID0gYWRkaXRpb25hbENvbnRlbnRUeXBlcy5zbGljZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFR5cGVzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29udGVudFR5cGVzLnB1c2goJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgaWYgKGp3dEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRUeXBlcy5wdXNoKCdhcHBsaWNhdGlvbi9qd3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX1hNTEh0dHBSZXF1ZXN0ID0gWE1MSHR0cFJlcXVlc3RDdG9yO1xuICAgICAgICB0aGlzLl9qd3RIYW5kbGVyID0gand0SGFuZGxlcjtcbiAgICB9XG5cbiAgICBnZXRKc29uKHVybCwgdG9rZW4pIHtcbiAgICAgICAgaWYgKCF1cmwpe1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogTm8gdXJsIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVybFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIExvZy5kZWJ1ZyhcIkpzb25TZXJ2aWNlLmdldEpzb24sIHVybDogXCIsIHVybCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgdmFyIHJlcSA9IG5ldyB0aGlzLl9YTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybCk7XG5cbiAgICAgICAgICAgIHZhciBhbGxvd2VkQ29udGVudFR5cGVzID0gdGhpcy5fY29udGVudFR5cGVzO1xuICAgICAgICAgICAgdmFyIGp3dEhhbmRsZXIgPSB0aGlzLl9qd3RIYW5kbGVyO1xuXG4gICAgICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogSFRUUCByZXNwb25zZSByZWNlaXZlZCwgc3RhdHVzXCIsIHJlcS5zdGF0dXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcS5zdGF0dXMgPT09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50VHlwZSA9IHJlcS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGFsbG93ZWRDb250ZW50VHlwZXMuZmluZChpdGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlLnN0YXJ0c1dpdGgoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSBcImFwcGxpY2F0aW9uL2p3dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgand0SGFuZGxlcihyZXEpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogRXJyb3IgcGFyc2luZyBKU09OIHJlc3BvbnNlXCIsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIkludmFsaWQgcmVzcG9uc2UgQ29udGVudC1UeXBlOiBcIiArIGNvbnRlbnRUeXBlICsgXCIsIGZyb20gVVJMOiBcIiArIHVybCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKHJlcS5zdGF0dXNUZXh0ICsgXCIgKFwiICsgcmVxLnN0YXR1cyArIFwiKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5nZXRKc29uOiBuZXR3b3JrIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UuZ2V0SnNvbjogdG9rZW4gcGFzc2VkLCBzZXR0aW5nIEF1dGhvcml6YXRpb24gaGVhZGVyXCIpO1xuICAgICAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcG9zdEZvcm0odXJsLCBwYXlsb2FkLCBiYXNpY0F1dGgpIHtcbiAgICAgICAgaWYgKCF1cmwpe1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IE5vIHVybCBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1cmxcIik7XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJKc29uU2VydmljZS5wb3N0Rm9ybSwgdXJsOiBcIiwgdXJsKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgcmVxID0gbmV3IHRoaXMuX1hNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXEub3BlbignUE9TVCcsIHVybCk7XG5cbiAgICAgICAgICAgIHZhciBhbGxvd2VkQ29udGVudFR5cGVzID0gdGhpcy5fY29udGVudFR5cGVzO1xuXG4gICAgICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiSnNvblNlcnZpY2UucG9zdEZvcm06IEhUVFAgcmVzcG9uc2UgcmVjZWl2ZWQsIHN0YXR1c1wiLCByZXEuc3RhdHVzKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXEuc3RhdHVzID09PSAyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSByZXEuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBhbGxvd2VkQ29udGVudFR5cGVzLmZpbmQoaXRlbT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZS5zdGFydHNXaXRoKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVxLnJlc3BvbnNlVGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKFwiSW52YWxpZCByZXNwb25zZSBDb250ZW50LVR5cGU6IFwiICsgY29udGVudFR5cGUgKyBcIiwgZnJvbSBVUkw6IFwiICsgdXJsKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxLnN0YXR1cyA9PT0gNDAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0gcmVxLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gYWxsb3dlZENvbnRlbnRUeXBlcy5maW5kKGl0ZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUuc3RhcnRzV2l0aChpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWQgPSBKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZCAmJiBwYXlsb2FkLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJKc29uU2VydmljZS5wb3N0Rm9ybTogRXJyb3IgZnJvbSBzZXJ2ZXI6IFwiLCBwYXlsb2FkLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocGF5bG9hZC5lcnJvcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBFcnJvciBwYXJzaW5nIEpTT04gcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKHJlcS5zdGF0dXNUZXh0ICsgXCIgKFwiICsgcmVxLnN0YXR1cyArIFwiKVwiKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkpzb25TZXJ2aWNlLnBvc3RGb3JtOiBuZXR3b3JrIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IGJvZHkgPSBcIlwiO1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gcGF5bG9hZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcGF5bG9hZFtrZXldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSArPSBcIiZcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgKz0gXCI9XCI7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXG4gICAgICAgICAgICBpZiAoYmFzaWNBdXRoICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIFwiQmFzaWMgXCIgKyBidG9hKGJhc2ljQXV0aCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXEuc2VuZChib2R5KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxubGV0IG5vcExvZ2dlciA9IHtcbiAgICBkZWJ1Zygpe30sXG4gICAgaW5mbygpe30sXG4gICAgd2Fybigpe30sXG4gICAgZXJyb3IoKXt9XG59O1xuXG5jb25zdCBOT05FID0gMDtcbmNvbnN0IEVSUk9SID0gMTtcbmNvbnN0IFdBUk4gPSAyO1xuY29uc3QgSU5GTyA9IDM7XG5jb25zdCBERUJVRyA9IDQ7XG5cbmxldCBsb2dnZXI7XG5sZXQgbGV2ZWw7XG5cbmV4cG9ydCBjbGFzcyBMb2cge1xuICAgIHN0YXRpYyBnZXQgTk9ORSgpIHtyZXR1cm4gTk9ORX07XG4gICAgc3RhdGljIGdldCBFUlJPUigpIHtyZXR1cm4gRVJST1J9O1xuICAgIHN0YXRpYyBnZXQgV0FSTigpIHtyZXR1cm4gV0FSTn07XG4gICAgc3RhdGljIGdldCBJTkZPKCkge3JldHVybiBJTkZPfTtcbiAgICBzdGF0aWMgZ2V0IERFQlVHKCkge3JldHVybiBERUJVR307XG4gICAgXG4gICAgc3RhdGljIHJlc2V0KCl7XG4gICAgICAgIGxldmVsID0gSU5GTztcbiAgICAgICAgbG9nZ2VyID0gbm9wTG9nZ2VyO1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IGxldmVsKCl7XG4gICAgICAgIHJldHVybiBsZXZlbDtcbiAgICB9XG4gICAgc3RhdGljIHNldCBsZXZlbCh2YWx1ZSl7XG4gICAgICAgIGlmIChOT05FIDw9IHZhbHVlICYmIHZhbHVlIDw9IERFQlVHKXtcbiAgICAgICAgICAgIGxldmVsID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvZyBsZXZlbFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IGxvZ2dlcigpe1xuICAgICAgICByZXR1cm4gbG9nZ2VyO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IGxvZ2dlcih2YWx1ZSl7XG4gICAgICAgIGlmICghdmFsdWUuZGVidWcgJiYgdmFsdWUuaW5mbykge1xuICAgICAgICAgICAgLy8ganVzdCB0byBzdGF5IGJhY2t3YXJkcyBjb21wYXQuIGNhbiByZW1vdmUgaW4gMi4wXG4gICAgICAgICAgICB2YWx1ZS5kZWJ1ZyA9IHZhbHVlLmluZm87XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUuZGVidWcgJiYgdmFsdWUuaW5mbyAmJiB2YWx1ZS53YXJuICYmIHZhbHVlLmVycm9yKXtcbiAgICAgICAgICAgIGxvZ2dlciA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2dnZXJcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc3RhdGljIGRlYnVnKC4uLmFyZ3Mpe1xuICAgICAgICBpZiAobGV2ZWwgPj0gREVCVUcpe1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGluZm8oLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBJTkZPKXtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHdhcm4oLi4uYXJncyl7XG4gICAgICAgIGlmIChsZXZlbCA+PSBXQVJOKXtcbiAgICAgICAgICAgIGxvZ2dlci53YXJuLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGVycm9yKC4uLmFyZ3Mpe1xuICAgICAgICBpZiAobGV2ZWwgPj0gRVJST1Ipe1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yLmFwcGx5KGxvZ2dlciwgQXJyYXkuZnJvbShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkxvZy5yZXNldCgpO1xuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgSnNvblNlcnZpY2UgfSBmcm9tICcuL0pzb25TZXJ2aWNlLmpzJztcblxuY29uc3QgT2lkY01ldGFkYXRhVXJsUGF0aCA9ICcud2VsbC1rbm93bi9vcGVuaWQtY29uZmlndXJhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBNZXRhZGF0YVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBKc29uU2VydmljZUN0b3IgPSBKc29uU2VydmljZSkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJNZXRhZGF0YVNlcnZpY2U6IE5vIHNldHRpbmdzIHBhc3NlZCB0byBNZXRhZGF0YVNlcnZpY2VcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX2pzb25TZXJ2aWNlID0gbmV3IEpzb25TZXJ2aWNlQ3RvcihbJ2FwcGxpY2F0aW9uL2p3ay1zZXQranNvbiddKTtcbiAgICB9XG5cbiAgICBnZXQgbWV0YWRhdGFVcmwoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbWV0YWRhdGFVcmwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YVVybCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsID0gdGhpcy5fc2V0dGluZ3MubWV0YWRhdGFVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YVVybCA9IHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybCAmJiB0aGlzLl9tZXRhZGF0YVVybC5pbmRleE9mKE9pZGNNZXRhZGF0YVVybFBhdGgpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWV0YWRhdGFVcmxbdGhpcy5fbWV0YWRhdGFVcmwubGVuZ3RoIC0gMV0gIT09ICcvJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gJy8nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsICs9IE9pZGNNZXRhZGF0YVVybFBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhVXJsO1xuICAgIH1cblxuICAgIHJlc2V0U2lnbmluZ0tleXMoKSB7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gdGhpcy5fc2V0dGluZ3MgfHwge31cbiAgICAgICAgdGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMgPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBnZXRNZXRhZGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGE6IFJldHVybmluZyBtZXRhZGF0YSBmcm9tIHNldHRpbmdzXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubWV0YWRhdGFVcmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YTogTm8gYXV0aG9yaXR5IG9yIG1ldGFkYXRhVXJsIGNvbmZpZ3VyZWQgb24gc2V0dGluZ3NcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gYXV0aG9yaXR5IG9yIG1ldGFkYXRhVXJsIGNvbmZpZ3VyZWQgb24gc2V0dGluZ3NcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiTWV0YWRhdGFTZXJ2aWNlLmdldE1ldGFkYXRhOiBnZXR0aW5nIG1ldGFkYXRhIGZyb21cIiwgdGhpcy5tZXRhZGF0YVVybCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLmdldEpzb24odGhpcy5tZXRhZGF0YVVybClcbiAgICAgICAgICAgIC50aGVuKG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGE6IGpzb24gcmVjZWl2ZWRcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHNlZWQgPSB0aGlzLl9zZXR0aW5ncy5tZXRhZGF0YVNlZWQgfHwge307XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MubWV0YWRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzZWVkLCBtZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLm1ldGFkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SXNzdWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcImlzc3VlclwiKTtcbiAgICB9XG5cbiAgICBnZXRBdXRob3JpemF0aW9uRW5kcG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiYXV0aG9yaXphdGlvbl9lbmRwb2ludFwiKTtcbiAgICB9XG5cbiAgICBnZXRVc2VySW5mb0VuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcInVzZXJpbmZvX2VuZHBvaW50XCIpO1xuICAgIH1cblxuICAgIGdldFRva2VuRW5kcG9pbnQob3B0aW9uYWw9dHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcInRva2VuX2VuZHBvaW50XCIsIG9wdGlvbmFsKTtcbiAgICB9XG5cbiAgICBnZXRDaGVja1Nlc3Npb25JZnJhbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiY2hlY2tfc2Vzc2lvbl9pZnJhbWVcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0RW5kU2Vzc2lvbkVuZHBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YWRhdGFQcm9wZXJ0eShcImVuZF9zZXNzaW9uX2VuZHBvaW50XCIsIHRydWUpO1xuICAgIH1cblxuICAgIGdldFJldm9jYXRpb25FbmRwb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJyZXZvY2F0aW9uX2VuZHBvaW50XCIsIHRydWUpO1xuICAgIH1cblxuICAgIGdldEtleXNFbmRwb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1ldGFkYXRhUHJvcGVydHkoXCJqd2tzX3VyaVwiLCB0cnVlKTtcbiAgICB9XG5cbiAgICBfZ2V0TWV0YWRhdGFQcm9wZXJ0eShuYW1lLCBvcHRpb25hbD1mYWxzZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGFQcm9wZXJ0eSBmb3I6IFwiICsgbmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0YWRhdGEoKS50aGVuKG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5OiBtZXRhZGF0YSByZWNpZXZlZFwiKTtcblxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhW25hbWVdID09PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25hbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cud2FybihcIk1ldGFkYXRhU2VydmljZS5nZXRNZXRhZGF0YVByb3BlcnR5OiBNZXRhZGF0YSBkb2VzIG5vdCBjb250YWluIG9wdGlvbmFsIHByb3BlcnR5IFwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0TWV0YWRhdGFQcm9wZXJ0eTogTWV0YWRhdGEgZG9lcyBub3QgY29udGFpbiBwcm9wZXJ0eSBcIiArIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRhZGF0YSBkb2VzIG5vdCBjb250YWluIHByb3BlcnR5IFwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFbbmFtZV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFNpZ25pbmdLZXlzKCkge1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2lnbmluZ0tleXMpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIk1ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5czogUmV0dXJuaW5nIHNpZ25pbmdLZXlzIGZyb20gc2V0dGluZ3NcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3NldHRpbmdzLnNpZ25pbmdLZXlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNZXRhZGF0YVByb3BlcnR5KFwiandrc191cmlcIikudGhlbihqd2tzX3VyaSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXM6IGp3a3NfdXJpIHJlY2VpdmVkXCIsIGp3a3NfdXJpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLmdldEpzb24oandrc191cmkpLnRoZW4oa2V5U2V0ID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJNZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXM6IGtleSBzZXQgcmVjZWl2ZWRcIiwga2V5U2V0KTtcblxuICAgICAgICAgICAgICAgIGlmICgha2V5U2V0LmtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiTWV0YWRhdGFTZXJ2aWNlLmdldFNpZ25pbmdLZXlzOiBNaXNzaW5nIGtleXMgb24ga2V5c2V0XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGtleXMgb24ga2V5c2V0XCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzLnNpZ25pbmdLZXlzID0ga2V5U2V0LmtleXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLnNpZ25pbmdLZXlzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnRTZXR0aW5ncyB9IGZyb20gJy4vT2lkY0NsaWVudFNldHRpbmdzLmpzJztcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuL0Vycm9yUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgU2lnbmluUmVxdWVzdCB9IGZyb20gJy4vU2lnbmluUmVxdWVzdC5qcyc7XG5pbXBvcnQgeyBTaWduaW5SZXNwb25zZSB9IGZyb20gJy4vU2lnbmluUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgU2lnbm91dFJlcXVlc3QgfSBmcm9tICcuL1NpZ25vdXRSZXF1ZXN0LmpzJztcbmltcG9ydCB7IFNpZ25vdXRSZXNwb25zZSB9IGZyb20gJy4vU2lnbm91dFJlc3BvbnNlLmpzJztcbmltcG9ydCB7IFNpZ25pblN0YXRlIH0gZnJvbSAnLi9TaWduaW5TdGF0ZS5qcyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vU3RhdGUuanMnO1xuXG5leHBvcnQgY2xhc3MgT2lkY0NsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MgPSB7fSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MgaW5zdGFuY2VvZiBPaWRjQ2xpZW50U2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IG5ldyBPaWRjQ2xpZW50U2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IF9zdGF0ZVN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zdGF0ZVN0b3JlO1xuICAgIH1cbiAgICBnZXQgX3ZhbGlkYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudmFsaWRhdG9yO1xuICAgIH1cbiAgICBnZXQgX21ldGFkYXRhU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MubWV0YWRhdGFTZXJ2aWNlO1xuICAgIH1cblxuICAgIGdldCBzZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzO1xuICAgIH1cbiAgICBnZXQgbWV0YWRhdGFTZXJ2aWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlO1xuICAgIH1cblxuICAgIGNyZWF0ZVNpZ25pblJlcXVlc3Qoe1xuICAgICAgICByZXNwb25zZV90eXBlLCBzY29wZSwgcmVkaXJlY3RfdXJpLFxuICAgICAgICAvLyBkYXRhIHdhcyBtZWFudCB0byBiZSB0aGUgcGxhY2UgYSBjYWxsZXIgY291bGQgaW5kaWNhdGUgdGhlIGRhdGEgdG9cbiAgICAgICAgLy8gaGF2ZSByb3VuZCB0cmlwcGVkLCBidXQgcGVvcGxlIHdlcmUgZ2V0dGluZyBjb25mdXNlZCwgc28gaSBhZGRlZCBzdGF0ZSAoc2luY2UgdGhhdCBtYXRjaGVzIHRoZSBzcGVjKVxuICAgICAgICAvLyBhbmQgc28gbm93IGlmIGRhdGEgaXMgbm90IHBhc3NlZCwgYnV0IHN0YXRlIGlzIHRoZW4gc3RhdGUgd2lsbCBiZSB1c2VkXG4gICAgICAgIGRhdGEsIHN0YXRlLCBwcm9tcHQsIGRpc3BsYXksIG1heF9hZ2UsIHVpX2xvY2FsZXMsIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQsIGFjcl92YWx1ZXMsXG4gICAgICAgIHJlc291cmNlLCByZXF1ZXN0LCByZXF1ZXN0X3VyaSwgcmVzcG9uc2VfbW9kZSwgZXh0cmFRdWVyeVBhcmFtcywgZXh0cmFUb2tlblBhcmFtcywgcmVxdWVzdF90eXBlLCBza2lwVXNlckluZm8gfSA9IHt9LFxuICAgICAgICBzdGF0ZVN0b3JlXG4gICAgKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbmluUmVxdWVzdFwiKTtcblxuICAgICAgICBsZXQgY2xpZW50X2lkID0gdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuICAgICAgICByZXNwb25zZV90eXBlID0gcmVzcG9uc2VfdHlwZSB8fCB0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV90eXBlO1xuICAgICAgICBzY29wZSA9IHNjb3BlIHx8IHRoaXMuX3NldHRpbmdzLnNjb3BlO1xuICAgICAgICByZWRpcmVjdF91cmkgPSByZWRpcmVjdF91cmkgfHwgdGhpcy5fc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xuXG4gICAgICAgIC8vIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQgYXJlbid0IGFsbG93ZWQgb24gX3NldHRpbmdzXG4gICAgICAgIHByb21wdCA9IHByb21wdCB8fCB0aGlzLl9zZXR0aW5ncy5wcm9tcHQ7XG4gICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5IHx8IHRoaXMuX3NldHRpbmdzLmRpc3BsYXk7XG4gICAgICAgIG1heF9hZ2UgPSBtYXhfYWdlIHx8IHRoaXMuX3NldHRpbmdzLm1heF9hZ2U7XG4gICAgICAgIHVpX2xvY2FsZXMgPSB1aV9sb2NhbGVzIHx8IHRoaXMuX3NldHRpbmdzLnVpX2xvY2FsZXM7XG4gICAgICAgIGFjcl92YWx1ZXMgPSBhY3JfdmFsdWVzIHx8IHRoaXMuX3NldHRpbmdzLmFjcl92YWx1ZXM7XG4gICAgICAgIHJlc291cmNlID0gcmVzb3VyY2UgfHwgdGhpcy5fc2V0dGluZ3MucmVzb3VyY2U7XG4gICAgICAgIHJlc3BvbnNlX21vZGUgPSByZXNwb25zZV9tb2RlIHx8IHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX21vZGU7XG4gICAgICAgIGV4dHJhUXVlcnlQYXJhbXMgPSBleHRyYVF1ZXJ5UGFyYW1zIHx8IHRoaXMuX3NldHRpbmdzLmV4dHJhUXVlcnlQYXJhbXM7XG4gICAgICAgIGV4dHJhVG9rZW5QYXJhbXMgPSBleHRyYVRva2VuUGFyYW1zIHx8IHRoaXMuX3NldHRpbmdzLmV4dHJhVG9rZW5QYXJhbXM7XG5cbiAgICAgICAgbGV0IGF1dGhvcml0eSA9IHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eTtcblxuICAgICAgICBpZiAoU2lnbmluUmVxdWVzdC5pc0NvZGUocmVzcG9uc2VfdHlwZSkgJiYgcmVzcG9uc2VfdHlwZSAhPT0gXCJjb2RlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJPcGVuSUQgQ29ubmVjdCBoeWJyaWQgZmxvdyBpcyBub3Qgc3VwcG9ydGVkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0QXV0aG9yaXphdGlvbkVuZHBvaW50KCkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5jcmVhdGVTaWduaW5SZXF1ZXN0OiBSZWNlaXZlZCBhdXRob3JpemF0aW9uIGVuZHBvaW50XCIsIHVybCk7XG5cbiAgICAgICAgICAgIGxldCBzaWduaW5SZXF1ZXN0ID0gbmV3IFNpZ25pblJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBjbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlX3R5cGUsXG4gICAgICAgICAgICAgICAgc2NvcGUsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSB8fCBzdGF0ZSxcbiAgICAgICAgICAgICAgICBhdXRob3JpdHksXG4gICAgICAgICAgICAgICAgcHJvbXB0LCBkaXNwbGF5LCBtYXhfYWdlLCB1aV9sb2NhbGVzLCBpZF90b2tlbl9oaW50LCBsb2dpbl9oaW50LCBhY3JfdmFsdWVzLFxuICAgICAgICAgICAgICAgIHJlc291cmNlLCByZXF1ZXN0LCByZXF1ZXN0X3VyaSwgZXh0cmFRdWVyeVBhcmFtcywgZXh0cmFUb2tlblBhcmFtcywgcmVxdWVzdF90eXBlLCByZXNwb25zZV9tb2RlLFxuICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHRoaXMuX3NldHRpbmdzLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgc2tpcFVzZXJJbmZvXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHNpZ25pblN0YXRlID0gc2lnbmluUmVxdWVzdC5zdGF0ZTtcbiAgICAgICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVN0b3JlLnNldChzaWduaW5TdGF0ZS5pZCwgc2lnbmluU3RhdGUudG9TdG9yYWdlU3RyaW5nKCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaWduaW5SZXF1ZXN0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWRTaWduaW5SZXNwb25zZVN0YXRlKHVybCwgc3RhdGVTdG9yZSwgcmVtb3ZlU3RhdGUgPSBmYWxzZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnJlYWRTaWduaW5SZXNwb25zZVN0YXRlXCIpO1xuXG4gICAgICAgIGxldCB1c2VRdWVyeSA9IHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlX21vZGUgPT09IFwicXVlcnlcIiB8fCBcbiAgICAgICAgICAgICghdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZSAmJiBTaWduaW5SZXF1ZXN0LmlzQ29kZSh0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV90eXBlKSk7XG4gICAgICAgIGxldCBkZWxpbWl0ZXIgPSB1c2VRdWVyeSA/IFwiP1wiIDogXCIjXCI7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gbmV3IFNpZ25pblJlc3BvbnNlKHVybCwgZGVsaW1pdGVyKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LnJlYWRTaWduaW5SZXNwb25zZVN0YXRlOiBObyBzdGF0ZSBpbiByZXNwb25zZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzdGF0ZSBpbiByZXNwb25zZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZVN0b3JlID0gc3RhdGVTdG9yZSB8fCB0aGlzLl9zdGF0ZVN0b3JlO1xuXG4gICAgICAgIHZhciBzdGF0ZUFwaSA9IHJlbW92ZVN0YXRlID8gc3RhdGVTdG9yZS5yZW1vdmUuYmluZChzdGF0ZVN0b3JlKSA6IHN0YXRlU3RvcmUuZ2V0LmJpbmQoc3RhdGVTdG9yZSk7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlQXBpKHJlc3BvbnNlLnN0YXRlKS50aGVuKHN0b3JlZFN0YXRlU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGlmICghc3RvcmVkU3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LnJlYWRTaWduaW5SZXNwb25zZVN0YXRlOiBObyBtYXRjaGluZyBzdGF0ZSBmb3VuZCBpbiBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1hdGNoaW5nIHN0YXRlIGZvdW5kIGluIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IFNpZ25pblN0YXRlLmZyb21TdG9yYWdlU3RyaW5nKHN0b3JlZFN0YXRlU3RyaW5nKTtcbiAgICAgICAgICAgIHJldHVybiB7c3RhdGUsIHJlc3BvbnNlfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1NpZ25pblJlc3BvbnNlKHVybCwgc3RhdGVTdG9yZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWduaW5SZXNwb25zZVwiKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkU2lnbmluUmVzcG9uc2VTdGF0ZSh1cmwsIHN0YXRlU3RvcmUsIHRydWUpLnRoZW4oKHtzdGF0ZSwgcmVzcG9uc2V9KSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWduaW5SZXNwb25zZTogUmVjZWl2ZWQgc3RhdGUgZnJvbSBzdG9yYWdlOyB2YWxpZGF0aW5nIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVNpZ25vdXRSZXF1ZXN0KHtpZF90b2tlbl9oaW50LCBkYXRhLCBzdGF0ZSwgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLCBleHRyYVF1ZXJ5UGFyYW1zLCByZXF1ZXN0X3R5cGUgfSA9IHt9LFxuICAgICAgICBzdGF0ZVN0b3JlXG4gICAgKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY3JlYXRlU2lnbm91dFJlcXVlc3RcIik7XG5cbiAgICAgICAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuX3NldHRpbmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgZXh0cmFRdWVyeVBhcmFtcyA9IGV4dHJhUXVlcnlQYXJhbXMgfHwgdGhpcy5fc2V0dGluZ3MuZXh0cmFRdWVyeVBhcmFtcztcblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldEVuZFNlc3Npb25FbmRwb2ludCgpLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiT2lkY0NsaWVudC5jcmVhdGVTaWdub3V0UmVxdWVzdDogTm8gZW5kIHNlc3Npb24gZW5kcG9pbnQgdXJsIHJldHVybmVkXCIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGVuZCBzZXNzaW9uIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25vdXRSZXF1ZXN0OiBSZWNlaXZlZCBlbmQgc2Vzc2lvbiBlbmRwb2ludFwiLCB1cmwpO1xuXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBTaWdub3V0UmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIGlkX3Rva2VuX2hpbnQsXG4gICAgICAgICAgICAgICAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEgfHwgc3RhdGUsXG4gICAgICAgICAgICAgICAgZXh0cmFRdWVyeVBhcmFtcyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0X3R5cGVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc2lnbm91dFN0YXRlID0gcmVxdWVzdC5zdGF0ZTtcbiAgICAgICAgICAgIGlmIChzaWdub3V0U3RhdGUpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LmNyZWF0ZVNpZ25vdXRSZXF1ZXN0OiBTaWdub3V0IHJlcXVlc3QgaGFzIHN0YXRlIHRvIHBlcnNpc3RcIik7XG5cbiAgICAgICAgICAgICAgICBzdGF0ZVN0b3JlID0gc3RhdGVTdG9yZSB8fCB0aGlzLl9zdGF0ZVN0b3JlO1xuICAgICAgICAgICAgICAgIHN0YXRlU3RvcmUuc2V0KHNpZ25vdXRTdGF0ZS5pZCwgc2lnbm91dFN0YXRlLnRvU3RvcmFnZVN0cmluZygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZSh1cmwsIHN0YXRlU3RvcmUsIHJlbW92ZVN0YXRlID0gZmFsc2UpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5yZWFkU2lnbm91dFJlc3BvbnNlU3RhdGVcIik7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gbmV3IFNpZ25vdXRSZXNwb25zZSh1cmwpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLnN0YXRlKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZTogTm8gc3RhdGUgaW4gcmVzcG9uc2VcIik7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgICAgIExvZy53YXJuKFwiT2lkY0NsaWVudC5yZWFkU2lnbm91dFJlc3BvbnNlU3RhdGU6IFJlc3BvbnNlIHdhcyBlcnJvcjogXCIsIHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7c3RhdGU6IHVuZGVmaW5lZCwgcmVzcG9uc2V9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGF0ZUtleSA9IHJlc3BvbnNlLnN0YXRlO1xuXG4gICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgdmFyIHN0YXRlQXBpID0gcmVtb3ZlU3RhdGUgPyBzdGF0ZVN0b3JlLnJlbW92ZS5iaW5kKHN0YXRlU3RvcmUpIDogc3RhdGVTdG9yZS5nZXQuYmluZChzdGF0ZVN0b3JlKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlQXBpKHN0YXRlS2V5KS50aGVuKHN0b3JlZFN0YXRlU3RyaW5nID0+IHtcbiAgICAgICAgICAgIGlmICghc3RvcmVkU3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50LnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZTogTm8gbWF0Y2hpbmcgc3RhdGUgZm91bmQgaW4gc3RvcmFnZVwiKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYXRjaGluZyBzdGF0ZSBmb3VuZCBpbiBzdG9yYWdlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBTdGF0ZS5mcm9tU3RvcmFnZVN0cmluZyhzdG9yZWRTdGF0ZVN0cmluZyk7XG5cbiAgICAgICAgICAgIHJldHVybiB7c3RhdGUsIHJlc3BvbnNlfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1NpZ25vdXRSZXNwb25zZSh1cmwsIHN0YXRlU3RvcmUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiT2lkY0NsaWVudC5wcm9jZXNzU2lnbm91dFJlc3BvbnNlXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRTaWdub3V0UmVzcG9uc2VTdGF0ZSh1cmwsIHN0YXRlU3RvcmUsIHRydWUpLnRoZW4oKHtzdGF0ZSwgcmVzcG9uc2V9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWdub3V0UmVzcG9uc2U6IFJlY2VpdmVkIHN0YXRlIGZyb20gc3RvcmFnZTsgdmFsaWRhdGluZyByZXNwb25zZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yLnZhbGlkYXRlU2lnbm91dFJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJPaWRjQ2xpZW50LnByb2Nlc3NTaWdub3V0UmVzcG9uc2U6IE5vIHN0YXRlIGZyb20gc3RvcmFnZTsgc2tpcHBpbmcgdmFsaWRhdGluZyByZXNwb25zZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyU3RhbGVTdGF0ZShzdGF0ZVN0b3JlKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIk9pZGNDbGllbnQuY2xlYXJTdGFsZVN0YXRlXCIpO1xuXG4gICAgICAgIHN0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlIHx8IHRoaXMuX3N0YXRlU3RvcmU7XG5cbiAgICAgICAgcmV0dXJuIFN0YXRlLmNsZWFyU3RhbGVTdGF0ZShzdGF0ZVN0b3JlLCB0aGlzLnNldHRpbmdzLnN0YWxlU3RhdGVBZ2UpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IENsb2NrU2VydmljZSB9IGZyb20gJy4vQ2xvY2tTZXJ2aWNlLmpzJztcbmltcG9ydCB7IFdlYlN0b3JhZ2VTdGF0ZVN0b3JlIH0gZnJvbSAnLi9XZWJTdG9yYWdlU3RhdGVTdG9yZS5qcyc7XG5pbXBvcnQgeyBSZXNwb25zZVZhbGlkYXRvciB9IGZyb20gJy4vUmVzcG9uc2VWYWxpZGF0b3IuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuXG5jb25zdCBPaWRjTWV0YWRhdGFVcmxQYXRoID0gJy53ZWxsLWtub3duL29wZW5pZC1jb25maWd1cmF0aW9uJztcblxuY29uc3QgRGVmYXVsdFJlc3BvbnNlVHlwZSA9IFwiaWRfdG9rZW5cIjtcbmNvbnN0IERlZmF1bHRTY29wZSA9IFwib3BlbmlkXCI7XG5jb25zdCBEZWZhdWx0Q2xpZW50QXV0aGVudGljYXRpb24gPSBcImNsaWVudF9zZWNyZXRfcG9zdFwiIC8vIFRoZSBkZWZhdWx0IHZhbHVlIG11c3QgYmUgY2xpZW50X3NlY3JldF9iYXNpYywgYXMgZXhwbGFpbmVkIGluIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI0NsaWVudEF1dGhlbnRpY2F0aW9uXG5jb25zdCBEZWZhdWx0U3RhbGVTdGF0ZUFnZSA9IDYwICogMTU7IC8vIHNlY29uZHNcbmNvbnN0IERlZmF1bHRDbG9ja1NrZXdJblNlY29uZHMgPSA2MCAqIDU7XG5cbmV4cG9ydCBjbGFzcyBPaWRjQ2xpZW50U2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgLy8gbWV0YWRhdGEgcmVsYXRlZFxuICAgICAgICBhdXRob3JpdHksIG1ldGFkYXRhVXJsLCBtZXRhZGF0YSwgc2lnbmluZ0tleXMsIG1ldGFkYXRhU2VlZCxcbiAgICAgICAgLy8gY2xpZW50IHJlbGF0ZWRcbiAgICAgICAgY2xpZW50X2lkLCBjbGllbnRfc2VjcmV0LCByZXNwb25zZV90eXBlID0gRGVmYXVsdFJlc3BvbnNlVHlwZSwgc2NvcGUgPSBEZWZhdWx0U2NvcGUsXG4gICAgICAgIHJlZGlyZWN0X3VyaSwgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLFxuICAgICAgICBjbGllbnRfYXV0aGVudGljYXRpb24gPSBEZWZhdWx0Q2xpZW50QXV0aGVudGljYXRpb24sXG4gICAgICAgIC8vIG9wdGlvbmFsIHByb3RvY29sXG4gICAgICAgIHByb21wdCwgZGlzcGxheSwgbWF4X2FnZSwgdWlfbG9jYWxlcywgYWNyX3ZhbHVlcywgcmVzb3VyY2UsIHJlc3BvbnNlX21vZGUsXG4gICAgICAgIC8vIGJlaGF2aW9yIGZsYWdzXG4gICAgICAgIGZpbHRlclByb3RvY29sQ2xhaW1zID0gdHJ1ZSwgbG9hZFVzZXJJbmZvID0gdHJ1ZSxcbiAgICAgICAgc3RhbGVTdGF0ZUFnZSA9IERlZmF1bHRTdGFsZVN0YXRlQWdlLCBcbiAgICAgICAgY2xvY2tTa2V3ID0gRGVmYXVsdENsb2NrU2tld0luU2Vjb25kcyxcbiAgICAgICAgY2xvY2tTZXJ2aWNlID0gbmV3IENsb2NrU2VydmljZSgpLFxuICAgICAgICB1c2VySW5mb0p3dElzc3VlciA9ICdPUCcsXG4gICAgICAgIG1lcmdlQ2xhaW1zID0gZmFsc2UsXG4gICAgICAgIC8vIG90aGVyIGJlaGF2aW9yXG4gICAgICAgIHN0YXRlU3RvcmUgPSBuZXcgV2ViU3RvcmFnZVN0YXRlU3RvcmUoKSxcbiAgICAgICAgUmVzcG9uc2VWYWxpZGF0b3JDdG9yID0gUmVzcG9uc2VWYWxpZGF0b3IsXG4gICAgICAgIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UsXG4gICAgICAgIC8vIGV4dHJhIHF1ZXJ5IHBhcmFtc1xuICAgICAgICBleHRyYVF1ZXJ5UGFyYW1zID0ge30sXG4gICAgICAgIGV4dHJhVG9rZW5QYXJhbXMgPSB7fVxuICAgIH0gPSB7fSkge1xuXG4gICAgICAgIHRoaXMuX2F1dGhvcml0eSA9IGF1dGhvcml0eTtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgPSBtZXRhZGF0YVVybDtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZWVkID0gbWV0YWRhdGFTZWVkO1xuICAgICAgICB0aGlzLl9zaWduaW5nS2V5cyA9IHNpZ25pbmdLZXlzO1xuXG4gICAgICAgIHRoaXMuX2NsaWVudF9pZCA9IGNsaWVudF9pZDtcbiAgICAgICAgdGhpcy5fY2xpZW50X3NlY3JldCA9IGNsaWVudF9zZWNyZXQ7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlX3R5cGUgPSByZXNwb25zZV90eXBlO1xuICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLl9yZWRpcmVjdF91cmkgPSByZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSA9IHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uID0gY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuXG4gICAgICAgIHRoaXMuX3Byb21wdCA9IHByb21wdDtcbiAgICAgICAgdGhpcy5fZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgICAgIHRoaXMuX21heF9hZ2UgPSBtYXhfYWdlO1xuICAgICAgICB0aGlzLl91aV9sb2NhbGVzID0gdWlfbG9jYWxlcztcbiAgICAgICAgdGhpcy5fYWNyX3ZhbHVlcyA9IGFjcl92YWx1ZXM7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlID0gcmVzb3VyY2U7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlX21vZGUgPSByZXNwb25zZV9tb2RlO1xuXG4gICAgICAgIHRoaXMuX2ZpbHRlclByb3RvY29sQ2xhaW1zID0gISFmaWx0ZXJQcm90b2NvbENsYWltcztcbiAgICAgICAgdGhpcy5fbG9hZFVzZXJJbmZvID0gISFsb2FkVXNlckluZm87XG4gICAgICAgIHRoaXMuX3N0YWxlU3RhdGVBZ2UgPSBzdGFsZVN0YXRlQWdlO1xuICAgICAgICB0aGlzLl9jbG9ja1NrZXcgPSBjbG9ja1NrZXc7XG4gICAgICAgIHRoaXMuX2Nsb2NrU2VydmljZSA9IGNsb2NrU2VydmljZTtcbiAgICAgICAgdGhpcy5fdXNlckluZm9Kd3RJc3N1ZXIgPSB1c2VySW5mb0p3dElzc3VlcjtcbiAgICAgICAgdGhpcy5fbWVyZ2VDbGFpbXMgPSAhIW1lcmdlQ2xhaW1zO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlU3RvcmUgPSBzdGF0ZVN0b3JlO1xuICAgICAgICB0aGlzLl92YWxpZGF0b3IgPSBuZXcgUmVzcG9uc2VWYWxpZGF0b3JDdG9yKHRoaXMpO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzKTtcblxuICAgICAgICB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zID0gdHlwZW9mIGV4dHJhUXVlcnlQYXJhbXMgPT09ICdvYmplY3QnID8gZXh0cmFRdWVyeVBhcmFtcyA6IHt9O1xuICAgICAgICB0aGlzLl9leHRyYVRva2VuUGFyYW1zID0gdHlwZW9mIGV4dHJhVG9rZW5QYXJhbXMgPT09ICdvYmplY3QnID8gZXh0cmFUb2tlblBhcmFtcyA6IHt9O1xuICAgIH1cblxuICAgIC8vIGNsaWVudCBjb25maWdcbiAgICBnZXQgY2xpZW50X2lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50X2lkO1xuICAgIH1cbiAgICBzZXQgY2xpZW50X2lkKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2xpZW50X2lkKSB7XG4gICAgICAgICAgICAvLyBvbmUtdGltZSBzZXQgb25seVxuICAgICAgICAgICAgdGhpcy5fY2xpZW50X2lkID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50U2V0dGluZ3Muc2V0X2NsaWVudF9pZDogY2xpZW50X2lkIGhhcyBhbHJlYWR5IGJlZW4gYXNzaWduZWQuXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGllbnRfaWQgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgY2xpZW50X3NlY3JldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9zZWNyZXQ7XG4gICAgfVxuICAgIGdldCByZXNwb25zZV90eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcG9uc2VfdHlwZTtcbiAgICB9XG4gICAgZ2V0IHNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcGU7XG4gICAgfVxuICAgIGdldCByZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgfVxuICAgIGdldCBjbGllbnRfYXV0aGVudGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGllbnRfYXV0aGVudGljYXRpb247XG4gICAgfVxuICAgIFxuXG4gICAgLy8gb3B0aW9uYWwgcHJvdG9jb2wgcGFyYW1zXG4gICAgZ2V0IHByb21wdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21wdDtcbiAgICB9XG4gICAgZ2V0IGRpc3BsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5O1xuICAgIH1cbiAgICBnZXQgbWF4X2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heF9hZ2U7XG4gICAgfVxuICAgIGdldCB1aV9sb2NhbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdWlfbG9jYWxlcztcbiAgICB9XG4gICAgZ2V0IGFjcl92YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3JfdmFsdWVzO1xuICAgIH1cbiAgICBnZXQgcmVzb3VyY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZTtcbiAgICB9XG4gICAgZ2V0IHJlc3BvbnNlX21vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zZV9tb2RlO1xuICAgIH1cblxuXG4gICAgLy8gbWV0YWRhdGFcbiAgICBnZXQgYXV0aG9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0aG9yaXR5O1xuICAgIH1cbiAgICBzZXQgYXV0aG9yaXR5KHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5fYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICAvLyBvbmUtdGltZSBzZXQgb25seVxuICAgICAgICAgICAgdGhpcy5fYXV0aG9yaXR5ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJPaWRjQ2xpZW50U2V0dGluZ3Muc2V0X2F1dGhvcml0eTogYXV0aG9yaXR5IGhhcyBhbHJlYWR5IGJlZW4gYXNzaWduZWQuXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdXRob3JpdHkgaGFzIGFscmVhZHkgYmVlbiBhc3NpZ25lZC5cIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbWV0YWRhdGFVcmwoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbWV0YWRhdGFVcmwpIHtcbiAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsID0gdGhpcy5hdXRob3JpdHk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybCAmJiB0aGlzLl9tZXRhZGF0YVVybC5pbmRleE9mKE9pZGNNZXRhZGF0YVVybFBhdGgpIDwgMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhZGF0YVVybFt0aGlzLl9tZXRhZGF0YVVybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhVXJsICs9ICcvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFVcmwgKz0gT2lkY01ldGFkYXRhVXJsUGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVVybDtcbiAgICB9XG5cbiAgICAvLyBzZXR0YWJsZS9jYWNoYWJsZSBtZXRhZGF0YSB2YWx1ZXNcbiAgICBnZXQgbWV0YWRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YTtcbiAgICB9XG4gICAgc2V0IG1ldGFkYXRhKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVNlZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlZWQ7XG4gICAgfVxuICAgIHNldCBtZXRhZGF0YVNlZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZWVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNpZ25pbmdLZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluZ0tleXM7XG4gICAgfVxuICAgIHNldCBzaWduaW5nS2V5cyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zaWduaW5nS2V5cyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGJlaGF2aW9yIGZsYWdzXG4gICAgZ2V0IGZpbHRlclByb3RvY29sQ2xhaW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyUHJvdG9jb2xDbGFpbXM7XG4gICAgfVxuICAgIGdldCBsb2FkVXNlckluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlckluZm87XG4gICAgfVxuICAgIGdldCBzdGFsZVN0YXRlQWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhbGVTdGF0ZUFnZTtcbiAgICB9XG4gICAgZ2V0IGNsb2NrU2tldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb2NrU2tldztcbiAgICB9XG4gICAgZ2V0IHVzZXJJbmZvSnd0SXNzdWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlckluZm9Kd3RJc3N1ZXI7XG4gICAgfVxuICAgIGdldCBtZXJnZUNsYWltcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlQ2xhaW1zO1xuICAgIH1cbiAgICBcbiAgICBnZXQgc3RhdGVTdG9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlU3RvcmU7XG4gICAgfVxuICAgIGdldCB2YWxpZGF0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3I7XG4gICAgfVxuICAgIGdldCBtZXRhZGF0YVNlcnZpY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2U7XG4gICAgfVxuXG4gICAgLy8gZXh0cmEgcXVlcnkgcGFyYW1zXG4gICAgZ2V0IGV4dHJhUXVlcnlQYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zO1xuICAgIH1cbiAgICBzZXQgZXh0cmFRdWVyeVBhcmFtcyh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9leHRyYVF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBleHRyYSB0b2tlbiBwYXJhbXNcbiAgICBnZXQgZXh0cmFUb2tlblBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXM7XG4gICAgfVxuICAgIHNldCBleHRyYVRva2VuUGFyYW1zKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKXtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXMgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXMgPSB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdldCB0aGUgdGltZVxuICAgIGdldEVwb2NoVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb2NrU2VydmljZS5nZXRFcG9jaFRpbWUoKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBQb3B1cFdpbmRvdyB9IGZyb20gJy4vUG9wdXBXaW5kb3cuanMnO1xuXG5leHBvcnQgY2xhc3MgUG9wdXBOYXZpZ2F0b3Ige1xuXG4gICAgcHJlcGFyZShwYXJhbXMpIHtcbiAgICAgICAgbGV0IHBvcHVwID0gbmV3IFBvcHVwV2luZG93KHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocG9wdXApO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcikge1xuICAgICAgICBMb2cuZGVidWcoXCJQb3B1cE5hdmlnYXRvci5jYWxsYmFja1wiKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUG9wdXBXaW5kb3cubm90aWZ5T3BlbmVyKHVybCwga2VlcE9wZW4sIGRlbGltaXRlcik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuXG5jb25zdCBDaGVja0ZvclBvcHVwQ2xvc2VkSW50ZXJ2YWwgPSA1MDA7XG5jb25zdCBEZWZhdWx0UG9wdXBGZWF0dXJlcyA9ICdsb2NhdGlvbj1ubyx0b29sYmFyPW5vLHdpZHRoPTUwMCxoZWlnaHQ9NTAwLGxlZnQ9MTAwLHRvcD0xMDA7Jztcbi8vY29uc3QgRGVmYXVsdFBvcHVwRmVhdHVyZXMgPSAnbG9jYXRpb249bm8sdG9vbGJhcj1ubyx3aWR0aD01MDAsaGVpZ2h0PTUwMCxsZWZ0PTEwMCx0b3A9MTAwO3Jlc2l6YWJsZT15ZXMnO1xuXG5jb25zdCBEZWZhdWx0UG9wdXBUYXJnZXQgPSBcIl9ibGFua1wiO1xuXG5leHBvcnQgY2xhc3MgUG9wdXBXaW5kb3cge1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHRhcmdldCA9IHBhcmFtcy5wb3B1cFdpbmRvd1RhcmdldCB8fCBEZWZhdWx0UG9wdXBUYXJnZXQ7XG4gICAgICAgIGxldCBmZWF0dXJlcyA9IHBhcmFtcy5wb3B1cFdpbmRvd0ZlYXR1cmVzIHx8IERlZmF1bHRQb3B1cEZlYXR1cmVzO1xuXG4gICAgICAgIHRoaXMuX3BvcHVwID0gd2luZG93Lm9wZW4oJycsIHRhcmdldCwgZmVhdHVyZXMpO1xuICAgICAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlBvcHVwV2luZG93LmN0b3I6IHBvcHVwIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tGb3JQb3B1cENsb3NlZFRpbWVyID0gd2luZG93LnNldEludGVydmFsKHRoaXMuX2NoZWNrRm9yUG9wdXBDbG9zZWQuYmluZCh0aGlzKSwgQ2hlY2tGb3JQb3B1cENsb3NlZEludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb3B1cCkge1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogRXJyb3Igb3BlbmluZyBwb3B1cCB3aW5kb3dcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXBhcmFtcyB8fCAhcGFyYW1zLnVybCkge1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogbm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoXCJObyB1cmwgcHJvdmlkZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5uYXZpZ2F0ZTogU2V0dGluZyBVUkwgaW4gcG9wdXBcIik7XG5cbiAgICAgICAgICAgIHRoaXMuX2lkID0gcGFyYW1zLmlkO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93W1wicG9wdXBDYWxsYmFja19cIiArIHBhcmFtcy5pZF0gPSB0aGlzLl9jYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAud2luZG93LmxvY2F0aW9uID0gcGFyYW1zLnVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2U7XG4gICAgfVxuXG4gICAgX3N1Y2Nlc3MoZGF0YSkge1xuICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jYWxsYmFjazogU3VjY2Vzc2Z1bCByZXNwb25zZSBmcm9tIHBvcHVwIHdpbmRvd1wiKTtcblxuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUoZGF0YSk7XG4gICAgfVxuICAgIF9lcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIExvZy5lcnJvcihcIlBvcHVwV2luZG93LmVycm9yOiBcIiwgbWVzc2FnZSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuX3JlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKGZhbHNlKTtcbiAgICB9XG5cbiAgICBfY2xlYW51cChrZWVwT3Blbikge1xuICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jbGVhbnVwXCIpO1xuXG4gICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX2NoZWNrRm9yUG9wdXBDbG9zZWRUaW1lcik7XG4gICAgICAgIHRoaXMuX2NoZWNrRm9yUG9wdXBDbG9zZWRUaW1lciA9IG51bGw7XG5cbiAgICAgICAgZGVsZXRlIHdpbmRvd1tcInBvcHVwQ2FsbGJhY2tfXCIgKyB0aGlzLl9pZF07XG5cbiAgICAgICAgaWYgKHRoaXMuX3BvcHVwICYmICFrZWVwT3Blbikge1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb3B1cCA9IG51bGw7XG4gICAgfVxuXG4gICAgX2NoZWNrRm9yUG9wdXBDbG9zZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcG9wdXAgfHwgdGhpcy5fcG9wdXAuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihcIlBvcHVwIHdpbmRvdyBjbG9zZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsbGJhY2sodXJsLCBrZWVwT3Blbikge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKGtlZXBPcGVuKTtcblxuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJQb3B1cFdpbmRvdy5jYWxsYmFjayBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgdGhpcy5fc3VjY2Vzcyh7IHVybDogdXJsIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUG9wdXBXaW5kb3cuY2FsbGJhY2s6IEludmFsaWQgcmVzcG9uc2UgZnJvbSBwb3B1cFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKFwiSW52YWxpZCByZXNwb25zZSBmcm9tIHBvcHVwXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdGlmeU9wZW5lcih1cmwsIGtlZXBPcGVuLCBkZWxpbWl0ZXIpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcbiAgICAgICAgICAgIHVybCA9IHVybCB8fCB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IFVybFV0aWxpdHkucGFyc2VVcmxGcmFnbWVudCh1cmwsIGRlbGltaXRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFwicG9wdXBDYWxsYmFja19cIiArIGRhdGEuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHdpbmRvdy5vcGVuZXJbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUG9wdXBXaW5kb3cubm90aWZ5T3BlbmVyOiBwYXNzaW5nIHVybCBtZXNzYWdlIHRvIG9wZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVybCwga2VlcE9wZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLndhcm4oXCJQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXI6IG5vIG1hdGNoaW5nIGNhbGxiYWNrIGZvdW5kIG9uIG9wZW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLndhcm4oXCJQb3B1cFdpbmRvdy5ub3RpZnlPcGVuZXI6IG5vIHN0YXRlIGZvdW5kIGluIHJlc3BvbnNlIHVybFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cud2FybihcIlBvcHVwV2luZG93Lm5vdGlmeU9wZW5lcjogbm8gd2luZG93Lm9wZW5lci4gQ2FuJ3QgY29tcGxldGUgbm90aWZpY2F0aW9uLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0TmF2aWdhdG9yIHtcblxuICAgIHByZXBhcmUoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgfVxuXG4gICAgbmF2aWdhdGUocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMudXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZWRpcmVjdE5hdmlnYXRvci5uYXZpZ2F0ZTogTm8gdXJsIHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHVybCBwcm92aWRlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnVzZVJlcGxhY2VUb05hdmlnYXRlKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShwYXJhbXMudXJsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHBhcmFtcy51cmw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHVybCgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vTWV0YWRhdGFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IFVzZXJJbmZvU2VydmljZSB9IGZyb20gJy4vVXNlckluZm9TZXJ2aWNlLmpzJztcbmltcG9ydCB7IFRva2VuQ2xpZW50IH0gZnJvbSAnLi9Ub2tlbkNsaWVudC5qcyc7XG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi9FcnJvclJlc3BvbnNlLmpzJztcbmltcG9ydCB7IEpvc2VVdGlsIH0gZnJvbSAnLi9Kb3NlVXRpbC5qcyc7XG5cbi8vIEtleXMgdGhhdCBtdXN0IG5ldmVyIGJlIGNvcGllZCBmcm9tIHNlcnZlciByZXNwb25zZXMgb250byBwbGFpbiBvYmplY3RzXG5jb25zdCBVbnNhZmVLZXlzID0gW1wiX19wcm90b19fXCIsIFwiY29uc3RydWN0b3JcIiwgXCJwcm90b3R5cGVcIl07XG5cbmNvbnN0IFByb3RvY29sQ2xhaW1zID0gW1wibm9uY2VcIiwgXCJhdF9oYXNoXCIsIFwiaWF0XCIsIFwibmJmXCIsIFwiZXhwXCIsIFwiYXVkXCIsIFwiaXNzXCIsIFwiY19oYXNoXCJdO1xuXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VWYWxpZGF0b3Ige1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIFxuICAgICAgICBNZXRhZGF0YVNlcnZpY2VDdG9yID0gTWV0YWRhdGFTZXJ2aWNlLFxuICAgICAgICBVc2VySW5mb1NlcnZpY2VDdG9yID0gVXNlckluZm9TZXJ2aWNlLCBcbiAgICAgICAgam9zZVV0aWwgPSBKb3NlVXRpbCxcbiAgICAgICAgVG9rZW5DbGllbnRDdG9yID0gVG9rZW5DbGllbnQpIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuY3RvcjogTm8gc2V0dGluZ3MgcGFzc2VkIHRvIFJlc3BvbnNlVmFsaWRhdG9yXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0dGluZ3NcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX3VzZXJJbmZvU2VydmljZSA9IG5ldyBVc2VySW5mb1NlcnZpY2VDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fam9zZVV0aWwgPSBqb3NlVXRpbDtcbiAgICAgICAgdGhpcy5fdG9rZW5DbGllbnQgPSBuZXcgVG9rZW5DbGllbnRDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVNpZ25pblJlc3BvbnNlKHN0YXRlLCByZXNwb25zZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlXCIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzU2lnbmluUGFyYW1zKHN0YXRlLCByZXNwb25zZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlOiBzdGF0ZSBwcm9jZXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVUb2tlbnMoc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25pblJlc3BvbnNlOiB0b2tlbnMgdmFsaWRhdGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzQ2xhaW1zKHN0YXRlLCByZXNwb25zZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbmluUmVzcG9uc2U6IGNsYWltcyBwcm9jZXNzZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVNpZ25vdXRSZXNwb25zZShzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHN0YXRlLmlkICE9PSByZXNwb25zZS5zdGF0ZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IudmFsaWRhdGVTaWdub3V0UmVzcG9uc2U6IFN0YXRlIGRvZXMgbm90IG1hdGNoXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlN0YXRlIGRvZXMgbm90IG1hdGNoXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyB0aGF0IHdlIGtub3cgdGhlIHN0YXRlIG1hdGNoZXMsIHRha2UgdGhlIHN0b3JlZCBkYXRhXG4gICAgICAgIC8vIGFuZCBzZXQgaXQgaW50byB0aGUgcmVzcG9uc2Ugc28gY2FsbGVycyBjYW4gZ2V0IHRoZWlyIHN0YXRlXG4gICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGZvciBib3RoIHN1Y2Nlc3MgJiBlcnJvciBvdXRjb21lc1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci52YWxpZGF0ZVNpZ25vdXRSZXNwb25zZTogc3RhdGUgdmFsaWRhdGVkXCIpO1xuICAgICAgICByZXNwb25zZS5zdGF0ZSA9IHN0YXRlLmRhdGE7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICBMb2cud2FybihcIlJlc3BvbnNlVmFsaWRhdG9yLnZhbGlkYXRlU2lnbm91dFJlc3BvbnNlOiBSZXNwb25zZSB3YXMgZXJyb3JcIiwgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBfcHJvY2Vzc1NpZ25pblBhcmFtcyhzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHN0YXRlLmlkICE9PSByZXNwb25zZS5zdGF0ZSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IFN0YXRlIGRvZXMgbm90IG1hdGNoXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlN0YXRlIGRvZXMgbm90IG1hdGNoXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUuY2xpZW50X2lkKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogTm8gY2xpZW50X2lkIG9uIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGNsaWVudF9pZCBvbiBzdGF0ZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN0YXRlLmF1dGhvcml0eSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IE5vIGF1dGhvcml0eSBvbiBzdGF0ZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBhdXRob3JpdHkgb24gc3RhdGVcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcyBhbGxvd3MgdGhlIGF1dGhvcml0eSB0byBiZSBsb2FkZWQgZnJvbSB0aGUgc2lnbmluIHN0YXRlXG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncy5hdXRob3JpdHkgPSBzdGF0ZS5hdXRob3JpdHk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5zdXJlIHdlJ3JlIHVzaW5nIHRoZSBjb3JyZWN0IGF1dGhvcml0eSBpZiB0aGUgYXV0aG9yaXR5IGlzIG5vdCBsb2FkZWQgZnJvbSBzaWduaW4gc3RhdGVcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2V0dGluZ3MuYXV0aG9yaXR5ICYmIHRoaXMuX3NldHRpbmdzLmF1dGhvcml0eSAhPT0gc3RhdGUuYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogYXV0aG9yaXR5IG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXV0aG9yaXR5IG1pc21hdGNoIG9uIHNldHRpbmdzIHZzLiBzaWduaW4gc3RhdGVcIikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMgYWxsb3dzIHRoZSBjbGllbnRfaWQgdG8gYmUgbG9hZGVkIGZyb20gdGhlIHNpZ25pbiBzdGF0ZVxuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkID0gc3RhdGUuY2xpZW50X2lkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVuc3VyZSB3ZSdyZSB1c2luZyB0aGUgY29ycmVjdCBjbGllbnRfaWQgaWYgdGhlIGNsaWVudF9pZCBpcyBub3QgbG9hZGVkIGZyb20gc2lnbmluIHN0YXRlXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZCAmJiB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQgIT09IHN0YXRlLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NTaWduaW5QYXJhbXM6IGNsaWVudF9pZCBtaXNtYXRjaCBvbiBzZXR0aW5ncyB2cy4gc2lnbmluIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcImNsaWVudF9pZCBtaXNtYXRjaCBvbiBzZXR0aW5ncyB2cy4gc2lnbmluIHN0YXRlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyB0aGF0IHdlIGtub3cgdGhlIHN0YXRlIG1hdGNoZXMsIHRha2UgdGhlIHN0b3JlZCBkYXRhXG4gICAgICAgIC8vIGFuZCBzZXQgaXQgaW50byB0aGUgcmVzcG9uc2Ugc28gY2FsbGVycyBjYW4gZ2V0IHRoZWlyIHN0YXRlXG4gICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGZvciBib3RoIHN1Y2Nlc3MgJiBlcnJvciBvdXRjb21lc1xuICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogc3RhdGUgdmFsaWRhdGVkXCIpO1xuICAgICAgICByZXNwb25zZS5zdGF0ZSA9IHN0YXRlLmRhdGE7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICBMb2cud2FybihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBSZXNwb25zZSB3YXMgZXJyb3JcIiwgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUubm9uY2UgJiYgIXJlc3BvbnNlLmlkX3Rva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogRXhwZWN0aW5nIGlkX3Rva2VuIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGlkX3Rva2VuIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUubm9uY2UgJiYgcmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBOb3QgZXhwZWN0aW5nIGlkX3Rva2VuIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgaWRfdG9rZW4gaW4gcmVzcG9uc2VcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmNvZGVfdmVyaWZpZXIgJiYgIXJlc3BvbnNlLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzU2lnbmluUGFyYW1zOiBFeHBlY3RpbmcgY29kZSBpbiByZXNwb25zZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBjb2RlIGluIHJlc3BvbnNlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhdGUuY29kZV92ZXJpZmllciAmJiByZXNwb25zZS5jb2RlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc1NpZ25pblBhcmFtczogTm90IGV4cGVjdGluZyBjb2RlIGluIHJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgY29kZSBpbiByZXNwb25zZVwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlc3BvbnNlLnNjb3BlKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGVyZSdzIG5vIHNjb3BlIG9uIHRoZSByZXNwb25zZSwgdGhlbiBhc3N1bWUgYWxsIHNjb3BlcyBncmFudGVkIChwZXItc3BlYykgYW5kIGNvcHkgb3ZlciBzY29wZXMgZnJvbSBvcmlnaW5hbCByZXF1ZXN0XG4gICAgICAgICAgICByZXNwb25zZS5zY29wZSA9IHN0YXRlLnNjb3BlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuXG4gICAgX3Byb2Nlc3NDbGFpbXMoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5pc09wZW5JZENvbm5lY3QpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ2xhaW1zOiByZXNwb25zZSBpcyBPSURDLCBwcm9jZXNzaW5nIGNsYWltc1wiKTtcblxuICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZSA9IHRoaXMuX2ZpbHRlclByb3RvY29sQ2xhaW1zKHJlc3BvbnNlLnByb2ZpbGUpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdGUuc2tpcFVzZXJJbmZvICE9PSB0cnVlICYmIHRoaXMuX3NldHRpbmdzLmxvYWRVc2VySW5mbyAmJiByZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogbG9hZGluZyB1c2VyIGluZm9cIik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlckluZm9TZXJ2aWNlLmdldENsYWltcyhyZXNwb25zZS5hY2Nlc3NfdG9rZW4pLnRoZW4oY2xhaW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDbGFpbXM6IHVzZXIgaW5mbyBjbGFpbXMgcmVjZWl2ZWQgZnJvbSB1c2VyIGluZm8gZW5kcG9pbnRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYWltcy5zdWIgIT09IHJlc3BvbnNlLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogc3ViIGZyb20gdXNlciBpbmZvIGVuZHBvaW50IGRvZXMgbm90IG1hdGNoIHN1YiBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzdWIgZnJvbSB1c2VyIGluZm8gZW5kcG9pbnQgZG9lcyBub3QgbWF0Y2ggc3ViIGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnByb2ZpbGUgPSB0aGlzLl9tZXJnZUNsYWltcyhyZXNwb25zZS5wcm9maWxlLCBjbGFpbXMpO1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogdXNlciBpbmZvIGNsYWltcyByZWNlaXZlZCwgdXBkYXRlZCBwcm9maWxlOlwiLCByZXNwb25zZS5wcm9maWxlKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fcHJvY2Vzc0NsYWltczogbm90IGxvYWRpbmcgdXNlciBpbmZvXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDbGFpbXM6IHJlc3BvbnNlIGlzIG5vdCBPSURDLCBub3QgcHJvY2Vzc2luZyBjbGFpbXNcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBfbWVyZ2VDbGFpbXMoY2xhaW1zMSwgY2xhaW1zMikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgY2xhaW1zMSk7XG5cbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBjbGFpbXMyKSB7XG4gICAgICAgICAgICBpZiAoVW5zYWZlS2V5cy5pbmRleE9mKG5hbWUpID49IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBjbGFpbXMyW25hbWVdO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHRbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0W25hbWVdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0W25hbWVdLmluZGV4T2YodmFsdWUpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdFtuYW1lXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdGhpcy5fc2V0dGluZ3MubWVyZ2VDbGFpbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtuYW1lXSA9IHRoaXMuX21lcmdlQ2xhaW1zKHJlc3VsdFtuYW1lXSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gW3Jlc3VsdFtuYW1lXSwgdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBfZmlsdGVyUHJvdG9jb2xDbGFpbXMoY2xhaW1zKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJQcm90b2NvbENsYWltcywgaW5jb21pbmcgY2xhaW1zOlwiLCBjbGFpbXMpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBjbGFpbXMpO1xuXG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5fZmlsdGVyUHJvdG9jb2xDbGFpbXMpIHtcbiAgICAgICAgICAgIFByb3RvY29sQ2xhaW1zLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlc3VsdFt0eXBlXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fZmlsdGVyUHJvdG9jb2xDbGFpbXM6IHByb3RvY29sIGNsYWltcyBmaWx0ZXJlZFwiLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlclByb3RvY29sQ2xhaW1zOiBwcm90b2NvbCBjbGFpbXMgbm90IGZpbHRlcmVkXCIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIF92YWxpZGF0ZVRva2VucyhzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNvZGUpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZVRva2VuczogVmFsaWRhdGluZyBjb2RlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NDb2RlKHN0YXRlLCByZXNwb25zZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzcG9uc2UuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVUb2tlbnM6IFZhbGlkYXRpbmcgaWRfdG9rZW4gYW5kIGFjY2Vzc190b2tlblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVJZFRva2VuQW5kQWNjZXNzVG9rZW4oc3RhdGUsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlVG9rZW5zOiBWYWxpZGF0aW5nIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlSWRUb2tlbihzdGF0ZSwgcmVzcG9uc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlVG9rZW5zOiBObyBjb2RlIHRvIHByb2Nlc3Mgb3IgaWRfdG9rZW4gdG8gdmFsaWRhdGVcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIF9wcm9jZXNzQ29kZShzdGF0ZSwgcmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBjbGllbnRfaWQ6IHN0YXRlLmNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHN0YXRlLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICBjb2RlIDogcmVzcG9uc2UuY29kZSxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogc3RhdGUucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgY29kZV92ZXJpZmllcjogc3RhdGUuY29kZV92ZXJpZmllclxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdGF0ZS5leHRyYVRva2VuUGFyYW1zICYmIHR5cGVvZihzdGF0ZS5leHRyYVRva2VuUGFyYW1zKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVxdWVzdCwgc3RhdGUuZXh0cmFUb2tlblBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlbkNsaWVudC5leGNoYW5nZUNvZGUocmVxdWVzdCkudGhlbih0b2tlblJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gdG9rZW5SZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmIChVbnNhZmVLZXlzLmluZGV4T2Yoa2V5KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Vba2V5XSA9IHRva2VuUmVzcG9uc2Vba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5pZF90b2tlbikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9wcm9jZXNzQ29kZTogdG9rZW4gcmVzcG9uc2Ugc3VjY2Vzc2Z1bCwgcHJvY2Vzc2luZyBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGVJZFRva2VuQXR0cmlidXRlcyhzdGF0ZSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3Byb2Nlc3NDb2RlOiB0b2tlbiByZXNwb25zZSBzdWNjZXNzZnVsLCByZXR1cm5pbmcgcmVzcG9uc2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXMoc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0SXNzdWVyKCkudGhlbihpc3N1ZXIgPT4ge1xuXG4gICAgICAgICAgICBsZXQgYXVkaWVuY2UgPSBzdGF0ZS5jbGllbnRfaWQ7XG4gICAgICAgICAgICBsZXQgY2xvY2tTa2V3SW5TZWNvbmRzID0gdGhpcy5fc2V0dGluZ3MuY2xvY2tTa2V3O1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbkF0dHJpYnV0ZXM6IFZhbGlkYWluZyBKV1QgYXR0cmlidXRlczsgdXNpbmcgY2xvY2sgc2tldyAoaW4gc2Vjb25kcykgb2Y6IFwiLCBjbG9ja1NrZXdJblNlY29uZHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MuZ2V0RXBvY2hUaW1lKCkudGhlbihub3cgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb3NlVXRpbC52YWxpZGF0ZUp3dEF0dHJpYnV0ZXMocmVzcG9uc2UuaWRfdG9rZW4sIGlzc3VlciwgYXVkaWVuY2UsIGNsb2NrU2tld0luU2Vjb25kcywgbm93KS50aGVuKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUubm9uY2UgJiYgc3RhdGUubm9uY2UgIT09IHBheWxvYWQubm9uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzOiBJbnZhbGlkIG5vbmNlIGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkludmFsaWQgbm9uY2UgaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGF5bG9hZC5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW5BdHRyaWJ1dGVzOiBObyBzdWIgcHJlc2VudCBpbiBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzdWIgcHJlc2VudCBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucHJvZmlsZSA9IHBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVJZFRva2VuQW5kQWNjZXNzVG9rZW4oc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUlkVG9rZW4oc3RhdGUsIHJlc3BvbnNlKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUFjY2Vzc1Rva2VuKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2dldFNpZ25pbmdLZXlGb3JKd3Qoand0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0U2lnbmluZ0tleXMoKS50aGVuKGtleXMgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2lkID0gand0LmhlYWRlci5raWQ7XG4gICAgICAgICAgICBpZiAoIWtleXMpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBObyBzaWduaW5nIGtleXMgZnJvbSBtZXRhZGF0YVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gc2lnbmluZyBrZXlzIGZyb20gbWV0YWRhdGFcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBSZWNlaXZlZCBzaWduaW5nIGtleXNcIik7XG4gICAgICAgICAgICBsZXQga2V5O1xuICAgICAgICAgICAgaWYgKCFraWQpIHtcbiAgICAgICAgICAgICAgICBrZXlzID0gdGhpcy5fZmlsdGVyQnlBbGcoa2V5cywgand0LmhlYWRlci5hbGcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBObyBraWQgZm91bmQgaW4gaWRfdG9rZW4gYW5kIG1vcmUgdGhhbiBvbmUga2V5IGZvdW5kIGluIG1ldGFkYXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8ga2lkIGZvdW5kIGluIGlkX3Rva2VuIGFuZCBtb3JlIHRoYW4gb25lIGtleSBmb3VuZCBpbiBtZXRhZGF0YVwiKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8ga2lkIGlzIG1hbmRhdG9yeSBvbmx5IHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIGtleXMgaW4gdGhlIHJlZmVyZW5jZWQgSldLIFNldCBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNTaWduaW5nXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBrZXlzLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5LmtpZCA9PT0ga2lkO1xuICAgICAgICAgICAgICAgIH0pWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZ2V0U2lnbmluZ0tleUZvckp3dFdpdGhTaW5nbGVSZXRyeShqd3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNpZ25pbmdLZXlGb3JKd3Qoand0KS50aGVuKGtleSA9PiB7XG4gICAgICAgICAgICAvLyBSZWZyZXNoaW5nIHNpZ25pbmdLZXlzIGlmIG5vIHN1aXRhYmxlIHZlcmlmaWNhdGlvbiBrZXkgaXMgcHJlc2VudCBmb3IgZ2l2ZW4gand0IGhlYWRlci5cbiAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRvIHVuZGVmaW5lZCwgdG8gdHJpZ2dlciBuZXR3b3JrIGNhbGwgdG8gandrc191cmkuXG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLnJlc2V0U2lnbmluZ0tleXMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U2lnbmluZ0tleUZvckp3dChqd3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZUlkVG9rZW4oc3RhdGUsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghc3RhdGUubm9uY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIG5vbmNlIG9uIHN0YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIG5vbmNlIG9uIHN0YXRlXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBqd3QgPSB0aGlzLl9qb3NlVXRpbC5wYXJzZUp3dChyZXNwb25zZS5pZF90b2tlbik7XG4gICAgICAgIGlmICghand0IHx8ICFqd3QuaGVhZGVyIHx8ICFqd3QucGF5bG9hZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlSWRUb2tlbjogRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIsIGp3dCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5ub25jZSAhPT0gand0LnBheWxvYWQubm9uY2UpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IEludmFsaWQgbm9uY2UgaW4gaWRfdG9rZW5cIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBub25jZSBpbiBpZF90b2tlblwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldElzc3VlcigpLnRoZW4oaXNzdWVyID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IFJlY2VpdmVkIGlzc3VlclwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTaWduaW5nS2V5Rm9ySnd0V2l0aFNpbmdsZVJldHJ5KGp3dCkudGhlbihrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIGtleSBtYXRjaGluZyBraWQgb3IgYWxnIGZvdW5kIGluIHNpZ25pbmcga2V5c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGtleSBtYXRjaGluZyBraWQgb3IgYWxnIGZvdW5kIGluIHNpZ25pbmcga2V5c1wiKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGF1ZGllbmNlID0gc3RhdGUuY2xpZW50X2lkO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNsb2NrU2tld0luU2Vjb25kcyA9IHRoaXMuX3NldHRpbmdzLmNsb2NrU2tldztcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVJZFRva2VuOiBWYWxpZGFpbmcgSldUOyB1c2luZyBjbG9jayBza2V3IChpbiBzZWNvbmRzKSBvZjogXCIsIGNsb2NrU2tld0luU2Vjb25kcyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fam9zZVV0aWwudmFsaWRhdGVKd3QocmVzcG9uc2UuaWRfdG9rZW4sIGtleSwgaXNzdWVyLCBhdWRpZW5jZSwgY2xvY2tTa2V3SW5TZWNvbmRzKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IEpXVCB2YWxpZGF0aW9uIHN1Y2Nlc3NmdWxcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFqd3QucGF5bG9hZC5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUlkVG9rZW46IE5vIHN1YiBwcmVzZW50IGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHN1YiBwcmVzZW50IGluIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnByb2ZpbGUgPSBqd3QucGF5bG9hZDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2ZpbHRlckJ5QWxnKGtleXMsIGFsZyl7XG4gICAgICAgIHZhciBrdHkgPSBudWxsO1xuICAgICAgICBpZiAoYWxnLnN0YXJ0c1dpdGgoXCJSU1wiKSkge1xuICAgICAgICAgICAga3R5ID0gXCJSU0FcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGcuc3RhcnRzV2l0aChcIlBTXCIpKSB7XG4gICAgICAgICAgICBrdHkgPSBcIlJTQVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsZy5zdGFydHNXaXRoKFwiRVNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiRUNcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJCeUFsZzogYWxnIG5vdCBzdXBwb3J0ZWQ6IFwiLCBhbGcpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX2ZpbHRlckJ5QWxnOiBMb29raW5nIGZvciBrZXlzIHRoYXQgbWF0Y2gga3R5OiBcIiwga3R5KTtcblxuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoa2V5ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrZXkua3R5ID09PSBrdHk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlJlc3BvbnNlVmFsaWRhdG9yLl9maWx0ZXJCeUFsZzogTnVtYmVyIG9mIGtleXMgdGhhdCBtYXRjaCBrdHk6IFwiLCBrdHksIGtleXMubGVuZ3RoKTtcblxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVBY2Nlc3NUb2tlbihyZXNwb25zZSkge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLnByb2ZpbGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBObyBwcm9maWxlIGxvYWRlZCBmcm9tIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHByb2ZpbGUgbG9hZGVkIGZyb20gaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5wcm9maWxlLmF0X2hhc2gpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBObyBhdF9oYXNoIGluIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGF0X2hhc2ggaW4gaWRfdG9rZW5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5pZF90b2tlbikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IE5vIGlkX3Rva2VuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBqd3QgPSB0aGlzLl9qb3NlVXRpbC5wYXJzZUp3dChyZXNwb25zZS5pZF90b2tlbik7XG4gICAgICAgIGlmICghand0IHx8ICFqd3QuaGVhZGVyKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIsIGp3dCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYXNoQWxnID0gand0LmhlYWRlci5hbGc7XG4gICAgICAgIGlmICghaGFzaEFsZyB8fCBoYXNoQWxnLmxlbmd0aCAhPT0gNSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IFVuc3VwcG9ydGVkIGFsZzpcIiwgaGFzaEFsZyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgYWxnOiBcIiArIGhhc2hBbGcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYXNoQml0cyA9IGhhc2hBbGcuc3Vic3RyKDIsIDMpO1xuICAgICAgICBpZiAoIWhhc2hCaXRzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogVW5zdXBwb3J0ZWQgYWxnOlwiLCBoYXNoQWxnLCBoYXNoQml0cyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgYWxnOiBcIiArIGhhc2hBbGcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc2hCaXRzID0gcGFyc2VJbnQoaGFzaEJpdHMpO1xuICAgICAgICBpZiAoaGFzaEJpdHMgIT09IDI1NiAmJiBoYXNoQml0cyAhPT0gMzg0ICYmIGhhc2hCaXRzICE9PSA1MTIpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBVbnN1cHBvcnRlZCBhbGc6XCIsIGhhc2hBbGcsIGhhc2hCaXRzKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBhbGc6IFwiICsgaGFzaEFsZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNoYSA9IFwic2hhXCIgKyBoYXNoQml0cztcbiAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9qb3NlVXRpbC5oYXNoU3RyaW5nKHJlc3BvbnNlLmFjY2Vzc190b2tlbiwgc2hhKTtcbiAgICAgICAgaWYgKCFoYXNoKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJSZXNwb25zZVZhbGlkYXRvci5fdmFsaWRhdGVBY2Nlc3NUb2tlbjogYWNjZXNzX3Rva2VuIGhhc2ggZmFpbGVkOlwiLCBzaGEpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkZhaWxlZCB0byB2YWxpZGF0ZSBhdF9oYXNoXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsZWZ0ID0gaGFzaC5zdWJzdHIoMCwgaGFzaC5sZW5ndGggLyAyKTtcbiAgICAgICAgdmFyIGxlZnRfYjY0dSA9IHRoaXMuX2pvc2VVdGlsLmhleFRvQmFzZTY0VXJsKGxlZnQpO1xuICAgICAgICBpZiAobGVmdF9iNjR1ICE9PSByZXNwb25zZS5wcm9maWxlLmF0X2hhc2gpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlJlc3BvbnNlVmFsaWRhdG9yLl92YWxpZGF0ZUFjY2Vzc1Rva2VuOiBGYWlsZWQgdG8gdmFsaWRhdGUgYXRfaGFzaFwiLCBsZWZ0X2I2NHUsIHJlc3BvbnNlLnByb2ZpbGUuYXRfaGFzaCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHZhbGlkYXRlIGF0X2hhc2hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9nLmRlYnVnKFwiUmVzcG9uc2VWYWxpZGF0b3IuX3ZhbGlkYXRlQWNjZXNzVG9rZW46IHN1Y2Nlc3NcIik7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgQ2hlY2tTZXNzaW9uSUZyYW1lIH0gZnJvbSAnLi9DaGVja1Nlc3Npb25JRnJhbWUuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuXG5leHBvcnQgY2xhc3MgU2Vzc2lvbk1vbml0b3Ige1xuXG4gICAgY29uc3RydWN0b3IodXNlck1hbmFnZXIsIENoZWNrU2Vzc2lvbklGcmFtZUN0b3IgPSBDaGVja1Nlc3Npb25JRnJhbWUsIHRpbWVyID0gR2xvYmFsLnRpbWVyKSB7XG4gICAgICAgIGlmICghdXNlck1hbmFnZXIpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yLmN0b3I6IE5vIHVzZXIgbWFuYWdlciBwYXNzZWQgdG8gU2Vzc2lvbk1vbml0b3JcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyTWFuYWdlclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyID0gdXNlck1hbmFnZXI7XG4gICAgICAgIHRoaXMuX0NoZWNrU2Vzc2lvbklGcmFtZUN0b3IgPSBDaGVja1Nlc3Npb25JRnJhbWVDdG9yO1xuICAgICAgICB0aGlzLl90aW1lciA9IHRpbWVyO1xuXG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5hZGRVc2VyTG9hZGVkKHRoaXMuX3N0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuYWRkVXNlclVubG9hZGVkKHRoaXMuX3N0b3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3VzZXJNYW5hZ2VyLmdldFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgLy8gZG9pbmcgdGhpcyBtYW51YWxseSBoZXJlIHNpbmNlIGNhbGxpbmcgZ2V0VXNlciBcbiAgICAgICAgICAgIC8vIGRvZXNuJ3QgdHJpZ2dlciBsb2FkIGV2ZW50LlxuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCh1c2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NldHRpbmdzLm1vbml0b3JBbm9ueW1vdXNTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzKCkudGhlbihzZXNzaW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcFVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uX3N0YXRlIDogc2Vzc2lvbi5zZXNzaW9uX3N0YXRlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLnN1YiAmJiBzZXNzaW9uLnNpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wVXNlci5wcm9maWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Yjogc2Vzc2lvbi5zdWIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkOiBzZXNzaW9uLnNpZFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCh0bXBVc2VyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gYSBjdG9yXG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yIGN0b3I6IGVycm9yIGZyb20gcXVlcnlTZXNzaW9uU3RhdHVzOlwiLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gYSBjdG9yXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTZXNzaW9uTW9uaXRvciBjdG9yOiBlcnJvciBmcm9tIGdldFVzZXI6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGdldCBfc2V0dGluZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyTWFuYWdlci5zZXR0aW5ncztcbiAgICB9XG4gICAgZ2V0IF9tZXRhZGF0YVNlcnZpY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyTWFuYWdlci5tZXRhZGF0YVNlcnZpY2U7XG4gICAgfVxuICAgIGdldCBfY2xpZW50X2lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuICAgIH1cbiAgICBnZXQgX2NoZWNrU2Vzc2lvbkludGVydmFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MuY2hlY2tTZXNzaW9uSW50ZXJ2YWw7XG4gICAgfVxuICAgIGdldCBfc3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncy5zdG9wQ2hlY2tTZXNzaW9uT25FcnJvcjtcbiAgICB9XG5cbiAgICBfc3RhcnQodXNlcikge1xuICAgICAgICBsZXQgc2Vzc2lvbl9zdGF0ZSA9IHVzZXIuc2Vzc2lvbl9zdGF0ZTtcblxuICAgICAgICBpZiAoc2Vzc2lvbl9zdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YiA9IHVzZXIucHJvZmlsZS5zdWI7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2lkID0gdXNlci5wcm9maWxlLnNpZDtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fc3RhcnQ6IHNlc3Npb25fc3RhdGU6XCIsIHNlc3Npb25fc3RhdGUsIFwiLCBzdWI6XCIsIHRoaXMuX3N1Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2lkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogc2Vzc2lvbl9zdGF0ZTpcIiwgc2Vzc2lvbl9zdGF0ZSwgXCIsIGFub255bW91cyB1c2VyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRDaGVja1Nlc3Npb25JZnJhbWUoKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogSW5pdGlhbGl6aW5nIGNoZWNrIHNlc3Npb24gaWZyYW1lXCIpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGllbnRfaWQgPSB0aGlzLl9jbGllbnRfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSB0aGlzLl9jaGVja1Nlc3Npb25JbnRlcnZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdG9wT25FcnJvciA9IHRoaXMuX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUgPSBuZXcgdGhpcy5fQ2hlY2tTZXNzaW9uSUZyYW1lQ3Rvcih0aGlzLl9jYWxsYmFjay5iaW5kKHRoaXMpLCBjbGllbnRfaWQsIHVybCwgaW50ZXJ2YWwsIHN0b3BPbkVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZS5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lLnN0YXJ0KHNlc3Npb25fc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cud2FybihcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogTm8gY2hlY2sgc2Vzc2lvbiBpZnJhbWUgZm91bmQgaW4gdGhlIG1ldGFkYXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2F0Y2ggdG8gc3VwcHJlc3MgZXJyb3JzIHNpbmNlIHdlJ3JlIGluIG5vbi1wcm9taXNlIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlNlc3Npb25Nb25pdG9yLl9zdGFydDogRXJyb3IgZnJvbSBnZXRDaGVja1Nlc3Npb25JZnJhbWU6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZS5zdGFydChzZXNzaW9uX3N0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zdG9wKCkge1xuICAgICAgICB0aGlzLl9zdWIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3NpZCA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodGhpcy5fY2hlY2tTZXNzaW9uSUZyYW1lKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fc3RvcFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vzc2lvbklGcmFtZS5zdG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MubW9uaXRvckFub255bW91c1Nlc3Npb24pIHtcbiAgICAgICAgICAgIC8vIHVzaW5nIGEgdGltZXIgdG8gZGVsYXkgcmUtaW5pdGlhbGl6YXRpb24gdG8gYXZvaWQgcmFjZSBjb25kaXRpb25zIGR1cmluZyBzaWdub3V0XG4gICAgICAgICAgICBsZXQgdGltZXJIYW5kbGUgPSB0aGlzLl90aW1lci5zZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyLmNsZWFySW50ZXJ2YWwodGltZXJIYW5kbGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzKCkudGhlbihzZXNzaW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcFVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uX3N0YXRlIDogc2Vzc2lvbi5zZXNzaW9uX3N0YXRlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLnN1YiAmJiBzZXNzaW9uLnNpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wVXNlci5wcm9maWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Yjogc2Vzc2lvbi5zdWIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkOiBzZXNzaW9uLnNpZFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCh0bXBVc2VyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gYSBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJTZXNzaW9uTW9uaXRvcjogZXJyb3IgZnJvbSBxdWVyeVNlc3Npb25TdGF0dXM6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1cygpLnRoZW4oc2Vzc2lvbiA9PiB7XG4gICAgICAgICAgICB2YXIgcmFpc2VFdmVudCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChzZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uc3ViID09PSB0aGlzLl9zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFpc2VFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JRnJhbWUuc3RhcnQoc2Vzc2lvbi5zZXNzaW9uX3N0YXRlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5zaWQgPT09IHRoaXMuX3NpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBTYW1lIHN1YiBzdGlsbCBsb2dnZWQgaW4gYXQgT1AsIHJlc3RhcnRpbmcgY2hlY2sgc2Vzc2lvbiBpZnJhbWU7IHNlc3Npb25fc3RhdGU6XCIsIHNlc3Npb24uc2Vzc2lvbl9zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IFNhbWUgc3ViIHN0aWxsIGxvZ2dlZCBpbiBhdCBPUCwgc2Vzc2lvbiBzdGF0ZSBoYXMgY2hhbmdlZCwgcmVzdGFydGluZyBjaGVjayBzZXNzaW9uIGlmcmFtZTsgc2Vzc2lvbl9zdGF0ZTpcIiwgc2Vzc2lvbi5zZXNzaW9uX3N0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VVc2VyU2Vzc2lvbkNoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBEaWZmZXJlbnQgc3ViamVjdCBzaWduZWQgaW50byBPUDpcIiwgc2Vzc2lvbi5zdWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogU3ViamVjdCBubyBsb25nZXIgc2lnbmVkIGludG8gT1BcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyYWlzZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s6IFNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazsgcmFpc2luZyBzaWduZWQgb3V0IGV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuX3JhaXNlVXNlclNpZ25lZE91dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU2Vzc2lvbk1vbml0b3IuX2NhbGxiYWNrOiBTZXNzaW9uTW9uaXRvci5fY2FsbGJhY2s7IHJhaXNpbmcgc2lnbmVkIGluIGV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMuX3JhaXNlVXNlclNpZ25lZEluKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N1Yikge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNlc3Npb25Nb25pdG9yLl9jYWxsYmFjazogRXJyb3IgY2FsbGluZyBxdWVyeUN1cnJlbnRTaWduaW5TZXNzaW9uOyByYWlzaW5nIHNpZ25lZCBvdXQgZXZlbnRcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkT3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuaW1wb3J0IHsgU2lnbmluU3RhdGUgfSBmcm9tICcuL1NpZ25pblN0YXRlLmpzJztcblxuZXhwb3J0IGNsYXNzIFNpZ25pblJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgLy8gbWFuZGF0b3J5XG4gICAgICAgIHVybCwgY2xpZW50X2lkLCByZWRpcmVjdF91cmksIHJlc3BvbnNlX3R5cGUsIHNjb3BlLCBhdXRob3JpdHksXG4gICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgIGRhdGEsIHByb21wdCwgZGlzcGxheSwgbWF4X2FnZSwgdWlfbG9jYWxlcywgaWRfdG9rZW5faGludCwgbG9naW5faGludCwgYWNyX3ZhbHVlcywgcmVzb3VyY2UsIHJlc3BvbnNlX21vZGUsXG4gICAgICAgIHJlcXVlc3QsIHJlcXVlc3RfdXJpLCBleHRyYVF1ZXJ5UGFyYW1zLCByZXF1ZXN0X3R5cGUsIGNsaWVudF9zZWNyZXQsIGV4dHJhVG9rZW5QYXJhbXMsIHNraXBVc2VySW5mb1xuICAgIH0pIHtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpZ25pblJlcXVlc3QuY3RvcjogTm8gdXJsIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVybFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNsaWVudF9pZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbmluUmVxdWVzdC5jdG9yOiBObyBjbGllbnRfaWQgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2xpZW50X2lkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVkaXJlY3RfdXJpKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIHJlZGlyZWN0X3VyaSBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZWRpcmVjdF91cmlcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXNwb25zZV90eXBlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIHJlc3BvbnNlX3R5cGUgcGFzc2VkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmVzcG9uc2VfdHlwZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNjb3BlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIHNjb3BlIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNjb3BlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXV0aG9yaXR5KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTaWduaW5SZXF1ZXN0LmN0b3I6IE5vIGF1dGhvcml0eSBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdXRob3JpdHlcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb2lkYyA9IFNpZ25pblJlcXVlc3QuaXNPaWRjKHJlc3BvbnNlX3R5cGUpO1xuICAgICAgICBsZXQgY29kZSA9IFNpZ25pblJlcXVlc3QuaXNDb2RlKHJlc3BvbnNlX3R5cGUpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2VfbW9kZSkge1xuICAgICAgICAgICAgcmVzcG9uc2VfbW9kZSA9IFNpZ25pblJlcXVlc3QuaXNDb2RlKHJlc3BvbnNlX3R5cGUpID8gXCJxdWVyeVwiIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgU2lnbmluU3RhdGUoeyBub25jZTogb2lkYywgXG4gICAgICAgICAgICBkYXRhLCBjbGllbnRfaWQsIGF1dGhvcml0eSwgcmVkaXJlY3RfdXJpLCBcbiAgICAgICAgICAgIGNvZGVfdmVyaWZpZXI6IGNvZGUsIFxuICAgICAgICAgICAgcmVxdWVzdF90eXBlLCByZXNwb25zZV9tb2RlLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldCwgc2NvcGUsIGV4dHJhVG9rZW5QYXJhbXMsIHNraXBVc2VySW5mbyB9KTtcblxuICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcImNsaWVudF9pZFwiLCBjbGllbnRfaWQpO1xuICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInJlZGlyZWN0X3VyaVwiLCByZWRpcmVjdF91cmkpO1xuICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInJlc3BvbnNlX3R5cGVcIiwgcmVzcG9uc2VfdHlwZSk7XG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwic2NvcGVcIiwgc2NvcGUpO1xuXG4gICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIFwic3RhdGVcIiwgdGhpcy5zdGF0ZS5pZCk7XG4gICAgICAgIGlmIChvaWRjKSB7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcIm5vbmNlXCIsIHRoaXMuc3RhdGUubm9uY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcImNvZGVfY2hhbGxlbmdlXCIsIHRoaXMuc3RhdGUuY29kZV9jaGFsbGVuZ2UpO1xuICAgICAgICAgICAgdXJsID0gVXJsVXRpbGl0eS5hZGRRdWVyeVBhcmFtKHVybCwgXCJjb2RlX2NoYWxsZW5nZV9tZXRob2RcIiwgXCJTMjU2XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9wdGlvbmFsID0geyBwcm9tcHQsIGRpc3BsYXksIG1heF9hZ2UsIHVpX2xvY2FsZXMsIGlkX3Rva2VuX2hpbnQsIGxvZ2luX2hpbnQsIGFjcl92YWx1ZXMsIHJlc291cmNlLCByZXF1ZXN0LCByZXF1ZXN0X3VyaSwgcmVzcG9uc2VfbW9kZSB9O1xuICAgICAgICBmb3IobGV0IGtleSBpbiBvcHRpb25hbCl7XG4gICAgICAgICAgICBpZiAob3B0aW9uYWxba2V5XSkge1xuICAgICAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIGtleSwgb3B0aW9uYWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGtleSBpbiBleHRyYVF1ZXJ5UGFyYW1zKXtcbiAgICAgICAgICAgIHVybCA9IFVybFV0aWxpdHkuYWRkUXVlcnlQYXJhbSh1cmwsIGtleSwgZXh0cmFRdWVyeVBhcmFtc1trZXldKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzT2lkYyhyZXNwb25zZV90eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZXNwb25zZV90eXBlLnNwbGl0KC9cXHMrL2cpLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gXCJpZF90b2tlblwiO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICEhKHJlc3VsdFswXSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzT0F1dGgocmVzcG9uc2VfdHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVzcG9uc2VfdHlwZS5zcGxpdCgvXFxzKy9nKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09IFwidG9rZW5cIjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAhIShyZXN1bHRbMF0pO1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgaXNDb2RlKHJlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3BvbnNlX3R5cGUuc3BsaXQoL1xccysvZykuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtID09PSBcImNvZGVcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAhIShyZXN1bHRbMF0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuXG5jb25zdCBPaWRjU2NvcGUgPSBcIm9wZW5pZFwiO1xuXG5leHBvcnQgY2xhc3MgU2lnbmluUmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgZGVsaW1pdGVyID0gXCIjXCIpIHtcblxuICAgICAgICB2YXIgdmFsdWVzID0gVXJsVXRpbGl0eS5wYXJzZVVybEZyYWdtZW50KHVybCwgZGVsaW1pdGVyKTtcblxuICAgICAgICB0aGlzLmVycm9yID0gdmFsdWVzLmVycm9yO1xuICAgICAgICB0aGlzLmVycm9yX2Rlc2NyaXB0aW9uID0gdmFsdWVzLmVycm9yX2Rlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmVycm9yX3VyaSA9IHZhbHVlcy5lcnJvcl91cmk7XG5cbiAgICAgICAgdGhpcy5jb2RlID0gdmFsdWVzLmNvZGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB2YWx1ZXMuc3RhdGU7XG4gICAgICAgIHRoaXMuaWRfdG9rZW4gPSB2YWx1ZXMuaWRfdG9rZW47XG4gICAgICAgIHRoaXMuc2Vzc2lvbl9zdGF0ZSA9IHZhbHVlcy5zZXNzaW9uX3N0YXRlO1xuICAgICAgICB0aGlzLmFjY2Vzc190b2tlbiA9IHZhbHVlcy5hY2Nlc3NfdG9rZW47XG4gICAgICAgIHRoaXMudG9rZW5fdHlwZSA9IHZhbHVlcy50b2tlbl90eXBlO1xuICAgICAgICB0aGlzLnNjb3BlID0gdmFsdWVzLnNjb3BlO1xuICAgICAgICB0aGlzLnByb2ZpbGUgPSB1bmRlZmluZWQ7IC8vIHdpbGwgYmUgc2V0IGZyb20gUmVzcG9uc2VWYWxpZGF0b3JcblxuICAgICAgICB0aGlzLmV4cGlyZXNfaW4gPSB2YWx1ZXMuZXhwaXJlc19pbjtcbiAgICB9XG5cbiAgICBnZXQgZXhwaXJlc19pbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgbGV0IG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGlyZXNfYXQgLSBub3c7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc2V0IGV4cGlyZXNfaW4odmFsdWUpe1xuICAgICAgICBsZXQgZXhwaXJlc19pbiA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBleHBpcmVzX2luID09PSAnbnVtYmVyJyAmJiBleHBpcmVzX2luID4gMCkge1xuICAgICAgICAgICAgbGV0IG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMuZXhwaXJlc19hdCA9IG5vdyArIGV4cGlyZXNfaW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZXhwaXJlZCgpIHtcbiAgICAgICAgbGV0IGV4cGlyZXNfaW4gPSB0aGlzLmV4cGlyZXNfaW47XG4gICAgICAgIGlmIChleHBpcmVzX2luICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBleHBpcmVzX2luIDw9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgc2NvcGVzKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2NvcGUgfHwgXCJcIikuc3BsaXQoXCIgXCIpO1xuICAgIH1cblxuICAgIGdldCBpc09wZW5JZENvbm5lY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Blcy5pbmRleE9mKE9pZGNTY29wZSkgPj0gMCB8fCAhIXRoaXMuaWRfdG9rZW47XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuL1N0YXRlLmpzJztcbmltcG9ydCB7IEpvc2VVdGlsIH0gZnJvbSAnLi9Kb3NlVXRpbC5qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tLmpzJztcblxuZXhwb3J0IGNsYXNzIFNpZ25pblN0YXRlIGV4dGVuZHMgU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKHtub25jZSwgYXV0aG9yaXR5LCBjbGllbnRfaWQsIHJlZGlyZWN0X3VyaSwgY29kZV92ZXJpZmllciwgcmVzcG9uc2VfbW9kZSwgY2xpZW50X3NlY3JldCwgc2NvcGUsIGV4dHJhVG9rZW5QYXJhbXMsIHNraXBVc2VySW5mb30gPSB7fSkge1xuICAgICAgICBzdXBlcihhcmd1bWVudHNbMF0pO1xuXG4gICAgICAgIGlmIChub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbm9uY2UgPSByYW5kb20oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub25jZSkge1xuICAgICAgICAgICAgdGhpcy5fbm9uY2UgPSBub25jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2RlX3ZlcmlmaWVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyByYW5kb20oKSBwcm9kdWNlcyAzMiBsZW5ndGhcbiAgICAgICAgICAgIHRoaXMuX2NvZGVfdmVyaWZpZXIgPSByYW5kb20oKSArIHJhbmRvbSgpICsgcmFuZG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29kZV92ZXJpZmllcikge1xuICAgICAgICAgICAgdGhpcy5fY29kZV92ZXJpZmllciA9IGNvZGVfdmVyaWZpZXI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmNvZGVfdmVyaWZpZXIpIHtcbiAgICAgICAgICAgIGxldCBoYXNoID0gSm9zZVV0aWwuaGFzaFN0cmluZyh0aGlzLmNvZGVfdmVyaWZpZXIsIFwiU0hBMjU2XCIpO1xuICAgICAgICAgICAgdGhpcy5fY29kZV9jaGFsbGVuZ2UgPSBKb3NlVXRpbC5oZXhUb0Jhc2U2NFVybChoYXNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlZGlyZWN0X3VyaSA9IHJlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5fYXV0aG9yaXR5ID0gYXV0aG9yaXR5O1xuICAgICAgICB0aGlzLl9jbGllbnRfaWQgPSBjbGllbnRfaWQ7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlX21vZGUgPSByZXNwb25zZV9tb2RlO1xuICAgICAgICB0aGlzLl9jbGllbnRfc2VjcmV0ID0gY2xpZW50X3NlY3JldDtcbiAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5fZXh0cmFUb2tlblBhcmFtcyA9IGV4dHJhVG9rZW5QYXJhbXM7XG4gICAgICAgIHRoaXMuX3NraXBVc2VySW5mbyA9IHNraXBVc2VySW5mbztcbiAgICB9XG5cbiAgICBnZXQgbm9uY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub25jZTtcbiAgICB9XG4gICAgZ2V0IGF1dGhvcml0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dGhvcml0eTtcbiAgICB9XG4gICAgZ2V0IGNsaWVudF9pZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9pZDtcbiAgICB9XG4gICAgZ2V0IHJlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgZ2V0IGNvZGVfdmVyaWZpZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2RlX3ZlcmlmaWVyO1xuICAgIH1cbiAgICBnZXQgY29kZV9jaGFsbGVuZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2RlX2NoYWxsZW5nZTtcbiAgICB9XG4gICAgZ2V0IHJlc3BvbnNlX21vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zZV9tb2RlO1xuICAgIH1cbiAgICBnZXQgY2xpZW50X3NlY3JldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9zZWNyZXQ7XG4gICAgfVxuICAgIGdldCBzY29wZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3BlO1xuICAgIH1cbiAgICBnZXQgZXh0cmFUb2tlblBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dHJhVG9rZW5QYXJhbXM7XG4gICAgfVxuICAgIGdldCBza2lwVXNlckluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9za2lwVXNlckluZm87XG4gICAgfVxuICAgIFxuICAgIHRvU3RvcmFnZVN0cmluZygpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiU2lnbmluU3RhdGUudG9TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBjcmVhdGVkOiB0aGlzLmNyZWF0ZWQsXG4gICAgICAgICAgICByZXF1ZXN0X3R5cGU6IHRoaXMucmVxdWVzdF90eXBlLFxuICAgICAgICAgICAgbm9uY2U6IHRoaXMubm9uY2UsXG4gICAgICAgICAgICBjb2RlX3ZlcmlmaWVyOiB0aGlzLmNvZGVfdmVyaWZpZXIsXG4gICAgICAgICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgYXV0aG9yaXR5OiB0aGlzLmF1dGhvcml0eSxcbiAgICAgICAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRfaWQsXG4gICAgICAgICAgICByZXNwb25zZV9tb2RlOiB0aGlzLnJlc3BvbnNlX21vZGUsXG4gICAgICAgICAgICBjbGllbnRfc2VjcmV0OiB0aGlzLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgICAgICAgIGV4dHJhVG9rZW5QYXJhbXMgOiB0aGlzLmV4dHJhVG9rZW5QYXJhbXMsXG4gICAgICAgICAgICBza2lwVXNlckluZm86IHRoaXMuc2tpcFVzZXJJbmZvXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tU3RvcmFnZVN0cmluZyhzdG9yYWdlU3RyaW5nKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlNpZ25pblN0YXRlLmZyb21TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cmluZyk7XG4gICAgICAgIHJldHVybiBuZXcgU2lnbmluU3RhdGUoZGF0YSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgVXJsVXRpbGl0eSB9IGZyb20gJy4vVXJsVXRpbGl0eS5qcyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vU3RhdGUuanMnO1xuXG5leHBvcnQgY2xhc3MgU2lnbm91dFJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKHt1cmwsIGlkX3Rva2VuX2hpbnQsIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSwgZGF0YSwgZXh0cmFRdWVyeVBhcmFtcywgcmVxdWVzdF90eXBlfSkge1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lnbm91dFJlcXVlc3QuY3RvcjogTm8gdXJsIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVybFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpZF90b2tlbl9oaW50KSB7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcImlkX3Rva2VuX2hpbnRcIiwgaWRfdG9rZW5faGludCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpKSB7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaVwiLCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgU3RhdGUoeyBkYXRhLCByZXF1ZXN0X3R5cGUgfSk7XG5cbiAgICAgICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBcInN0YXRlXCIsIHRoaXMuc3RhdGUuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBrZXkgaW4gZXh0cmFRdWVyeVBhcmFtcyl7XG4gICAgICAgICAgICB1cmwgPSBVcmxVdGlsaXR5LmFkZFF1ZXJ5UGFyYW0odXJsLCBrZXksIGV4dHJhUXVlcnlQYXJhbXNba2V5XSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IFVybFV0aWxpdHkgfSBmcm9tICcuL1VybFV0aWxpdHkuanMnO1xuXG5leHBvcnQgY2xhc3MgU2lnbm91dFJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcblxuICAgICAgICB2YXIgdmFsdWVzID0gVXJsVXRpbGl0eS5wYXJzZVVybEZyYWdtZW50KHVybCwgXCI/XCIpO1xuXG4gICAgICAgIHRoaXMuZXJyb3IgPSB2YWx1ZXMuZXJyb3I7XG4gICAgICAgIHRoaXMuZXJyb3JfZGVzY3JpcHRpb24gPSB2YWx1ZXMuZXJyb3JfZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZXJyb3JfdXJpID0gdmFsdWVzLmVycm9yX3VyaTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gdmFsdWVzLnN0YXRlO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuZXhwb3J0IGNsYXNzIFNpbGVudFJlbmV3U2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1c2VyTWFuYWdlcikge1xuICAgICAgICB0aGlzLl91c2VyTWFuYWdlciA9IHVzZXJNYW5hZ2VyO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHRoaXMuX3Rva2VuRXhwaXJpbmcuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5hZGRBY2Nlc3NUb2tlbkV4cGlyaW5nKHRoaXMuX2NhbGxiYWNrKTtcblxuICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHRyaWdnZXIgbG9hZGluZyBvZiB0aGUgdXNlciBzbyB0aGUgZXhwaXJpbmcgZXZlbnRzIGNhbiBiZSBpbml0aWFsaXplZFxuICAgICAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuZ2V0VXNlcigpLnRoZW4odXNlcj0+e1xuICAgICAgICAgICAgICAgIC8vIGRlbGliZXJhdGUgbm9wXG4gICAgICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgICAgICAvLyBjYXRjaCB0byBzdXBwcmVzcyBlcnJvcnMgc2luY2Ugd2UncmUgaW4gYSBjdG9yXG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiU2lsZW50UmVuZXdTZXJ2aWNlLnN0YXJ0OiBFcnJvciBmcm9tIGdldFVzZXI6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyTWFuYWdlci5ldmVudHMucmVtb3ZlQWNjZXNzVG9rZW5FeHBpcmluZyh0aGlzLl9jYWxsYmFjayk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdG9rZW5FeHBpcmluZygpIHtcbiAgICAgICAgdGhpcy5fdXNlck1hbmFnZXIuc2lnbmluU2lsZW50KCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlNpbGVudFJlbmV3U2VydmljZS5fdG9rZW5FeHBpcmluZzogU2lsZW50IHRva2VuIHJlbmV3YWwgc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNpbGVudFJlbmV3U2VydmljZS5fdG9rZW5FeHBpcmluZzogRXJyb3IgZnJvbSBzaWduaW5TaWxlbnQ6XCIsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJNYW5hZ2VyLmV2ZW50cy5fcmFpc2VTaWxlbnRSZW5ld0Vycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20uanMnO1xuXG5leHBvcnQgY2xhc3MgU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKHtpZCwgZGF0YSwgY3JlYXRlZCwgcmVxdWVzdF90eXBlfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2lkID0gaWQgfHwgcmFuZG9tKCk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY3JlYXRlZCA9PT0gJ251bWJlcicgJiYgY3JlYXRlZCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZWQgPSBjcmVhdGVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlZCA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXF1ZXN0X3R5cGUgPSAgcmVxdWVzdF90eXBlO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cbiAgICBnZXQgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxuICAgIGdldCBjcmVhdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlZDtcbiAgICB9XG4gICAgZ2V0IHJlcXVlc3RfdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RfdHlwZTtcbiAgICB9XG5cbiAgICB0b1N0b3JhZ2VTdHJpbmcoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLnRvU3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgY3JlYXRlZDogdGhpcy5jcmVhdGVkLFxuICAgICAgICAgICAgcmVxdWVzdF90eXBlOiB0aGlzLnJlcXVlc3RfdHlwZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbVN0b3JhZ2VTdHJpbmcoc3RvcmFnZVN0cmluZykge1xuICAgICAgICBMb2cuZGVidWcoXCJTdGF0ZS5mcm9tU3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZShKU09OLnBhcnNlKHN0b3JhZ2VTdHJpbmcpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXJTdGFsZVN0YXRlKHN0b3JhZ2UsIGFnZSkge1xuXG4gICAgICAgIHZhciBjdXRvZmYgPSBEYXRlLm5vdygpIC8gMTAwMCAtIGFnZTtcblxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRBbGxLZXlzKCkudGhlbihrZXlzID0+IHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlN0YXRlLmNsZWFyU3RhbGVTdGF0ZTogZ290IGtleXNcIiwga2V5cyk7XG5cbiAgICAgICAgICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBzdG9yYWdlLmdldChrZXkpLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1vdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5mcm9tU3RvcmFnZVN0cmluZyhpdGVtKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiBnb3QgaXRlbSBmcm9tIGtleTogXCIsIGtleSwgc3RhdGUuY3JlYXRlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuY3JlYXRlZCA8PSBjdXRvZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlN0YXRlLmNsZWFyU3RhbGVTdGF0ZTogRXJyb3IgcGFyc2luZyBzdGF0ZSBmb3Iga2V5XCIsIGtleSwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiBubyBpdGVtIGluIHN0b3JhZ2UgZm9yIGtleTogXCIsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiByZW1vdmVkIGl0ZW0gZm9yIGtleTogXCIsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmFnZS5yZW1vdmUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiU3RhdGUuY2xlYXJTdGFsZVN0YXRlOiB3YWl0aW5nIG9uIHByb21pc2UgY291bnQ6XCIsIHByb21pc2VzLmxlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vRXZlbnQuanMnO1xuXG5jb25zdCBUaW1lckR1cmF0aW9uID0gNTsgLy8gc2Vjb25kc1xuXG5leHBvcnQgY2xhc3MgVGltZXIgZXh0ZW5kcyBFdmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB0aW1lciA9IEdsb2JhbC50aW1lciwgbm93RnVuYyA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihuYW1lKTtcbiAgICAgICAgdGhpcy5fdGltZXIgPSB0aW1lcjtcblxuICAgICAgICBpZiAobm93RnVuYykge1xuICAgICAgICAgICAgdGhpcy5fbm93RnVuYyA9IG5vd0Z1bmM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9ub3dGdW5jID0gKCkgPT4gRGF0ZS5ub3coKSAvIDEwMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbm93KCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5fbm93RnVuYygpKTtcbiAgICB9XG5cbiAgICBpbml0KGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChkdXJhdGlvbiA8PSAwKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZHVyYXRpb24gPSBwYXJzZUludChkdXJhdGlvbik7XG5cbiAgICAgICAgdmFyIGV4cGlyYXRpb24gPSB0aGlzLm5vdyArIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGhpcy5leHBpcmF0aW9uID09PSBleHBpcmF0aW9uICYmIHRoaXMuX3RpbWVySGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBubyBuZWVkIHRvIHJlaW5pdGlhbGl6ZSB0byBzYW1lIGV4cGlyYXRpb24sIHNvIGJhaWwgb3V0XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUaW1lci5pbml0IHRpbWVyIFwiICsgdGhpcy5fbmFtZSArIFwiIHNraXBwaW5nIGluaXRpYWxpemF0aW9uIHNpbmNlIGFscmVhZHkgaW5pdGlhbGl6ZWQgZm9yIGV4cGlyYXRpb246XCIsIHRoaXMuZXhwaXJhdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbmNlbCgpO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlRpbWVyLmluaXQgdGltZXIgXCIgKyB0aGlzLl9uYW1lICsgXCIgZm9yIGR1cmF0aW9uOlwiLCBkdXJhdGlvbik7XG4gICAgICAgIHRoaXMuX2V4cGlyYXRpb24gPSBleHBpcmF0aW9uO1xuXG4gICAgICAgIC8vIHdlJ3JlIHVzaW5nIGEgZmFpcmx5IHNob3J0IHRpbWVyIGFuZCB0aGVuIGNoZWNraW5nIHRoZSBleHBpcmF0aW9uIGluIHRoZVxuICAgICAgICAvLyBjYWxsYmFjayB0byBoYW5kbGUgc2NlbmFyaW9zIHdoZXJlIHRoZSBicm93c2VyIGRldmljZSBzbGVlcHMsIGFuZCB0aGVuXG4gICAgICAgIC8vIHRoZSB0aW1lcnMgZW5kIHVwIGdldHRpbmcgZGVsYXllZC5cbiAgICAgICAgdmFyIHRpbWVyRHVyYXRpb24gPSBUaW1lckR1cmF0aW9uO1xuICAgICAgICBpZiAoZHVyYXRpb24gPCB0aW1lckR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aW1lckR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdGltZXJIYW5kbGUgPSB0aGlzLl90aW1lci5zZXRJbnRlcnZhbCh0aGlzLl9jYWxsYmFjay5iaW5kKHRoaXMpLCB0aW1lckR1cmF0aW9uICogMTAwMCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBleHBpcmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwaXJhdGlvbjtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLl90aW1lckhhbmRsZSkge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVGltZXIuY2FuY2VsOiBcIiwgdGhpcy5fbmFtZSk7XG4gICAgICAgICAgICB0aGlzLl90aW1lci5jbGVhckludGVydmFsKHRoaXMuX3RpbWVySGFuZGxlKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVySGFuZGxlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxsYmFjaygpIHtcbiAgICAgICAgdmFyIGRpZmYgPSB0aGlzLl9leHBpcmF0aW9uIC0gdGhpcy5ub3c7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlRpbWVyLmNhbGxiYWNrOyBcIiArIHRoaXMuX25hbWUgKyBcIiB0aW1lciBleHBpcmVzIGluOlwiLCBkaWZmKTtcblxuICAgICAgICBpZiAodGhpcy5fZXhwaXJhdGlvbiA8PSB0aGlzLm5vdykge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgIHN1cGVyLnJhaXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBKc29uU2VydmljZSB9IGZyb20gJy4vSnNvblNlcnZpY2UuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuXG5leHBvcnQgY2xhc3MgVG9rZW5DbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBKc29uU2VydmljZUN0b3IgPSBKc29uU2VydmljZSwgTWV0YWRhdGFTZXJ2aWNlQ3RvciA9IE1ldGFkYXRhU2VydmljZSkge1xuICAgICAgICBpZiAoIXNldHRpbmdzKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5jdG9yOiBObyBzZXR0aW5ncyBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX2pzb25TZXJ2aWNlID0gbmV3IEpzb25TZXJ2aWNlQ3RvcigpO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgZXhjaGFuZ2VDb2RlKGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5ncmFudF90eXBlID0gYXJncy5ncmFudF90eXBlIHx8IFwiYXV0aG9yaXphdGlvbl9jb2RlXCI7XG4gICAgICAgIGFyZ3MuY2xpZW50X2lkID0gYXJncy5jbGllbnRfaWQgfHwgdGhpcy5fc2V0dGluZ3MuY2xpZW50X2lkO1xuICAgICAgICBhcmdzLmNsaWVudF9zZWNyZXQgPSBhcmdzLmNsaWVudF9zZWNyZXQgfHwgdGhpcy5fc2V0dGluZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgYXJncy5yZWRpcmVjdF91cmkgPSBhcmdzLnJlZGlyZWN0X3VyaSB8fCB0aGlzLl9zZXR0aW5ncy5yZWRpcmVjdF91cmk7XG5cbiAgICAgICAgdmFyIGJhc2ljQXV0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGNsaWVudF9hdXRoZW50aWNhdGlvbiA9IGFyZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbiB8fCB0aGlzLl9zZXR0aW5ncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuICAgICAgICBkZWxldGUgYXJncy5fY2xpZW50X2F1dGhlbnRpY2F0aW9uO1xuXG4gICAgICAgIGlmICghYXJncy5jb2RlKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IE5vIGNvZGUgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgY29kZSBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLnJlZGlyZWN0X3VyaSkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiBObyByZWRpcmVjdF91cmkgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgcmVkaXJlY3RfdXJpIGlzIHJlcXVpcmVkXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MuY29kZV92ZXJpZmllcikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VDb2RlOiBObyBjb2RlX3ZlcmlmaWVyIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIGNvZGVfdmVyaWZpZXIgaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJncy5jbGllbnRfaWQpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlRva2VuQ2xpZW50LmV4Y2hhbmdlQ29kZTogTm8gY2xpZW50X2lkIHBhc3NlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJBIGNsaWVudF9pZCBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLmNsaWVudF9zZWNyZXQgJiYgY2xpZW50X2F1dGhlbnRpY2F0aW9uID09IFwiY2xpZW50X3NlY3JldF9iYXNpY1wiKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IE5vIGNsaWVudF9zZWNyZXQgcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgY2xpZW50X3NlY3JldCBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZW5kaW5nIHRoZSBjbGllbnQgY3JlZGVudGlhbHMgdXNpbmcgdGhlIEJhc2ljIEF1dGggbWV0aG9kXG4gICAgICAgIGlmKGNsaWVudF9hdXRoZW50aWNhdGlvbiA9PSBcImNsaWVudF9zZWNyZXRfYmFzaWNcIilcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzaWNBdXRoID0gYXJncy5jbGllbnRfaWQgKyAnOicgKyBhcmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgICAgICBkZWxldGUgYXJncy5jbGllbnRfaWQ7XG4gICAgICAgICAgICBkZWxldGUgYXJncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRUb2tlbkVuZHBvaW50KGZhbHNlKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IFJlY2VpdmVkIHRva2VuIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLnBvc3RGb3JtKHVybCwgYXJncywgYmFzaWNBdXRoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlbkNsaWVudC5leGNoYW5nZUNvZGU6IHJlc3BvbnNlIHJlY2VpdmVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleGNoYW5nZVJlZnJlc2hUb2tlbihhcmdzID0ge30pIHtcbiAgICAgICAgYXJncyA9IE9iamVjdC5hc3NpZ24oe30sIGFyZ3MpO1xuXG4gICAgICAgIGFyZ3MuZ3JhbnRfdHlwZSA9IGFyZ3MuZ3JhbnRfdHlwZSB8fCBcInJlZnJlc2hfdG9rZW5cIjtcbiAgICAgICAgYXJncy5jbGllbnRfaWQgPSBhcmdzLmNsaWVudF9pZCB8fCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgICAgIGFyZ3MuY2xpZW50X3NlY3JldCA9IGFyZ3MuY2xpZW50X3NlY3JldCB8fCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfc2VjcmV0O1xuXG4gICAgICAgIHZhciBiYXNpY0F1dGggPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBjbGllbnRfYXV0aGVudGljYXRpb24gPSBhcmdzLl9jbGllbnRfYXV0aGVudGljYXRpb24gfHwgdGhpcy5fc2V0dGluZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbjtcbiAgICAgICAgZGVsZXRlIGFyZ3MuX2NsaWVudF9hdXRoZW50aWNhdGlvbjtcblxuICAgICAgICBpZiAoIWFyZ3MucmVmcmVzaF90b2tlbikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW46IE5vIHJlZnJlc2hfdG9rZW4gcGFzc2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkEgcmVmcmVzaF90b2tlbiBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLmNsaWVudF9pZCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW46IE5vIGNsaWVudF9pZCBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSBjbGllbnRfaWQgaXMgcmVxdWlyZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VuZGluZyB0aGUgY2xpZW50IGNyZWRlbnRpYWxzIHVzaW5nIHRoZSBCYXNpYyBBdXRoIG1ldGhvZFxuICAgICAgICBpZihjbGllbnRfYXV0aGVudGljYXRpb24gPT0gXCJjbGllbnRfc2VjcmV0X2Jhc2ljXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2ljQXV0aCA9IGFyZ3MuY2xpZW50X2lkICsgJzonICsgYXJncy5jbGllbnRfc2VjcmV0O1xuICAgICAgICAgICAgZGVsZXRlIGFyZ3MuY2xpZW50X2lkO1xuICAgICAgICAgICAgZGVsZXRlIGFyZ3MuY2xpZW50X3NlY3JldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0VG9rZW5FbmRwb2ludChmYWxzZSkudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5DbGllbnQuZXhjaGFuZ2VSZWZyZXNoVG9rZW46IFJlY2VpdmVkIHRva2VuIGVuZHBvaW50XCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fanNvblNlcnZpY2UucG9zdEZvcm0odXJsLCBhcmdzLCBiYXNpY0F1dGgpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuQ2xpZW50LmV4Y2hhbmdlUmVmcmVzaFRva2VuOiByZXNwb25zZSByZWNlaXZlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9NZXRhZGF0YVNlcnZpY2UuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuXG5jb25zdCBBY2Nlc3NUb2tlblR5cGVIaW50ID0gXCJhY2Nlc3NfdG9rZW5cIjtcbmNvbnN0IFJlZnJlc2hUb2tlblR5cGVIaW50ID0gXCJyZWZyZXNoX3Rva2VuXCI7XG5cbmV4cG9ydCBjbGFzcyBUb2tlblJldm9jYXRpb25DbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBYTUxIdHRwUmVxdWVzdEN0b3IgPSBHbG9iYWwuWE1MSHR0cFJlcXVlc3QsIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UpIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LmN0b3I6IE5vIHNldHRpbmdzIHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc2V0dGluZ3MgcHJvdmlkZWQuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgdGhpcy5fWE1MSHR0cFJlcXVlc3RDdG9yID0gWE1MSHR0cFJlcXVlc3RDdG9yO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlQ3Rvcih0aGlzLl9zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgcmV2b2tlKHRva2VuLCByZXF1aXJlZCwgdHlwZSA9IFwiYWNjZXNzX3Rva2VuXCIpIHtcbiAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZTogTm8gdG9rZW4gcHJvdmlkZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB0b2tlbiBwcm92aWRlZC5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSAhPT0gQWNjZXNzVG9rZW5UeXBlSGludCAmJiB0eXBlICE9IFJlZnJlc2hUb2tlblR5cGVIaW50KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBJbnZhbGlkIHRva2VuIHR5cGVcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHRva2VuIHR5cGUuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRSZXZvY2F0aW9uRW5kcG9pbnQoKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBSZXZvY2F0aW9uIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJldm9jYXRpb24gbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBub3QgcmVxdWlyZWQsIHNvIGRvbid0IGVycm9yIGFuZCBqdXN0IHJldHVyblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50LnJldm9rZTogUmV2b2tpbmcgXCIgKyB0eXBlKTtcbiAgICAgICAgICAgIHZhciBjbGllbnRfaWQgPSB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQ7XG4gICAgICAgICAgICB2YXIgY2xpZW50X3NlY3JldCA9IHRoaXMuX3NldHRpbmdzLmNsaWVudF9zZWNyZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmV2b2tlKHVybCwgY2xpZW50X2lkLCBjbGllbnRfc2VjcmV0LCB0b2tlbiwgdHlwZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9yZXZva2UodXJsLCBjbGllbnRfaWQsIGNsaWVudF9zZWNyZXQsIHRva2VuLCB0eXBlKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgdmFyIHhociA9IG5ldyB0aGlzLl9YTUxIdHRwUmVxdWVzdEN0b3IoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwpO1xuXG4gICAgICAgICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlRva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2U6IEhUVFAgcmVzcG9uc2UgcmVjZWl2ZWQsIHN0YXR1c1wiLCB4aHIuc3RhdHVzKTtcblxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEVycm9yKHhoci5zdGF0dXNUZXh0ICsgXCIgKFwiICsgeGhyLnN0YXR1cyArIFwiKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4geyBcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJUb2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlOiBOZXR3b3JrIEVycm9yLlwiKVxuICAgICAgICAgICAgICAgIHJlamVjdChcIk5ldHdvcmsgRXJyb3JcIik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYm9keSA9IFwiY2xpZW50X2lkPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNsaWVudF9pZCk7XG4gICAgICAgICAgICBpZiAoY2xpZW50X3NlY3JldCkge1xuICAgICAgICAgICAgICAgIGJvZHkgKz0gXCImY2xpZW50X3NlY3JldD1cIiArIGVuY29kZVVSSUNvbXBvbmVudChjbGllbnRfc2VjcmV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHkgKz0gXCImdG9rZW5fdHlwZV9oaW50PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHR5cGUpO1xuICAgICAgICAgICAgYm9keSArPSBcIiZ0b2tlbj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbik7XG5cbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcblxuZXhwb3J0IGNsYXNzIFVybFV0aWxpdHkge1xuICAgIHN0YXRpYyBhZGRRdWVyeVBhcmFtKHVybCwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHVybC5pbmRleE9mKCc/JykgPCAwKSB7XG4gICAgICAgICAgICB1cmwgKz0gXCI/XCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJsW3VybC5sZW5ndGggLSAxXSAhPT0gXCI/XCIpIHtcbiAgICAgICAgICAgIHVybCArPSBcIiZcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybCArPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSk7XG4gICAgICAgIHVybCArPSBcIj1cIjtcbiAgICAgICAgdXJsICs9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VVcmxGcmFnbWVudCh2YWx1ZSwgZGVsaW1pdGVyID0gXCIjXCIsIGdsb2JhbCA9IEdsb2JhbCkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICB2YWx1ZSA9IGdsb2JhbC5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlkeCA9IHZhbHVlLmxhc3RJbmRleE9mKGRlbGltaXRlcik7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoaWR4ICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVsaW1pdGVyID09PSBcIj9cIikge1xuICAgICAgICAgICAgLy8gaWYgd2UncmUgZG9pbmcgcXVlcnksIHRoZW4gc3RyaXAgb2ZmIGhhc2ggZnJhZ21lbnQgYmVmb3JlIHdlIHBhcnNlXG4gICAgICAgICAgICBpZHggPSB2YWx1ZS5pbmRleE9mKCcjJyk7XG4gICAgICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCBpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9LFxuICAgICAgICAgICAgcmVnZXggPSAvKFteJj1dKyk9KFteJl0qKS9nLFxuICAgICAgICAgICAgbTtcblxuICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChtID0gcmVnZXguZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhciBrZXksIHZhbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMV0pO1xuICAgICAgICAgICAgICAgIHZhbCA9IGRlY29kZVVSSUNvbXBvbmVudChtWzJdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXJsVXRpbGl0eS5wYXJzZVVybEZyYWdtZW50OiByZXNwb25zZSBjb250YWlucyBtYWxmb3JtZWQgVVJMIGVuY29kaW5nXCIsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJSZXNwb25zZSBjb250YWlucyBtYWxmb3JtZWQgVVJMIGVuY29kaW5nXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbmV2ZXIgbGV0IGEgcmVzcG9uc2UgVVJMIHdyaXRlIHRvIHRoZSBvYmplY3QgcHJvdG90eXBlXG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBcIl9fcHJvdG9fX1wiICYmIGtleSAhPT0gXCJjb25zdHJ1Y3RvclwiICYmIGtleSAhPT0gXCJwcm90b3R5cGVcIikge1xuICAgICAgICAgICAgICAgIHBhcmFtc1trZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvdW50ZXIrKyA+IDUwKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXJsVXRpbGl0eS5wYXJzZVVybEZyYWdtZW50OiByZXNwb25zZSBleGNlZWRlZCBleHBlY3RlZCBudW1iZXIgb2YgcGFyYW1ldGVyc1wiLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiUmVzcG9uc2UgZXhjZWVkZWQgZXhwZWN0ZWQgbnVtYmVyIG9mIHBhcmFtZXRlcnNcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcih7aWRfdG9rZW4sIHNlc3Npb25fc3RhdGUsIGFjY2Vzc190b2tlbiwgcmVmcmVzaF90b2tlbiwgdG9rZW5fdHlwZSwgc2NvcGUsIHByb2ZpbGUsIGV4cGlyZXNfYXQsIHN0YXRlfSkge1xuICAgICAgICB0aGlzLmlkX3Rva2VuID0gaWRfdG9rZW47XG4gICAgICAgIHRoaXMuc2Vzc2lvbl9zdGF0ZSA9IHNlc3Npb25fc3RhdGU7XG4gICAgICAgIHRoaXMuYWNjZXNzX3Rva2VuID0gYWNjZXNzX3Rva2VuO1xuICAgICAgICB0aGlzLnJlZnJlc2hfdG9rZW4gPSByZWZyZXNoX3Rva2VuO1xuICAgICAgICB0aGlzLnRva2VuX3R5cGUgPSB0b2tlbl90eXBlO1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMucHJvZmlsZSA9IHByb2ZpbGU7XG4gICAgICAgIHRoaXMuZXhwaXJlc19hdCA9IGV4cGlyZXNfYXQ7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgZXhwaXJlc19pbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgbGV0IG5vdyA9IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGlyZXNfYXQgLSBub3c7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc2V0IGV4cGlyZXNfaW4odmFsdWUpIHtcbiAgICAgICAgbGV0IGV4cGlyZXNfaW4gPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZXhwaXJlc19pbiA9PT0gJ251bWJlcicgJiYgZXhwaXJlc19pbiA+IDApIHtcbiAgICAgICAgICAgIGxldCBub3cgPSBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgICAgICB0aGlzLmV4cGlyZXNfYXQgPSBub3cgKyBleHBpcmVzX2luO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGV4cGlyZWQoKSB7XG4gICAgICAgIGxldCBleHBpcmVzX2luID0gdGhpcy5leHBpcmVzX2luO1xuICAgICAgICBpZiAoZXhwaXJlc19pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwaXJlc19pbiA8PSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHNjb3BlcygpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnNjb3BlIHx8IFwiXCIpLnNwbGl0KFwiIFwiKTtcbiAgICB9XG5cbiAgICB0b1N0b3JhZ2VTdHJpbmcoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXIudG9TdG9yYWdlU3RyaW5nXCIpO1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgaWRfdG9rZW46IHRoaXMuaWRfdG9rZW4sXG4gICAgICAgICAgICBzZXNzaW9uX3N0YXRlOiB0aGlzLnNlc3Npb25fc3RhdGUsXG4gICAgICAgICAgICBhY2Nlc3NfdG9rZW46IHRoaXMuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgdG9rZW5fdHlwZTogdGhpcy50b2tlbl90eXBlLFxuICAgICAgICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICAgICAgICBwcm9maWxlOiB0aGlzLnByb2ZpbGUsXG4gICAgICAgICAgICBleHBpcmVzX2F0OiB0aGlzLmV4cGlyZXNfYXRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21TdG9yYWdlU3RyaW5nKHN0b3JhZ2VTdHJpbmcpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiVXNlci5mcm9tU3RvcmFnZVN0cmluZ1wiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBVc2VyKEpTT04ucGFyc2Uoc3RvcmFnZVN0cmluZykpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IEpzb25TZXJ2aWNlIH0gZnJvbSAnLi9Kc29uU2VydmljZS5qcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL01ldGFkYXRhU2VydmljZS5qcyc7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBKb3NlVXRpbCB9IGZyb20gJy4vSm9zZVV0aWwuanMnO1xuXG5leHBvcnQgY2xhc3MgVXNlckluZm9TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgc2V0dGluZ3MsIFxuICAgICAgICBKc29uU2VydmljZUN0b3IgPSBKc29uU2VydmljZSwgXG4gICAgICAgIE1ldGFkYXRhU2VydmljZUN0b3IgPSBNZXRhZGF0YVNlcnZpY2UsIFxuICAgICAgICBqb3NlVXRpbCA9IEpvc2VVdGlsXG4gICAgKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5jdG9yOiBObyBzZXR0aW5ncyBwYXNzZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuX2pzb25TZXJ2aWNlID0gbmV3IEpzb25TZXJ2aWNlQ3Rvcih1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcy5fZ2V0Q2xhaW1zRnJvbUp3dC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFTZXJ2aWNlID0gbmV3IE1ldGFkYXRhU2VydmljZUN0b3IodGhpcy5fc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl9qb3NlVXRpbCA9IGpvc2VVdGlsO1xuICAgIH1cblxuICAgIGdldENsYWltcyh0b2tlbikge1xuICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuZ2V0Q2xhaW1zOiBObyB0b2tlbiBwYXNzZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQSB0b2tlbiBpcyByZXF1aXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGFTZXJ2aWNlLmdldFVzZXJJbmZvRW5kcG9pbnQoKS50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuZ2V0Q2xhaW1zOiByZWNlaXZlZCB1c2VyaW5mbyB1cmxcIiwgdXJsKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pzb25TZXJ2aWNlLmdldEpzb24odXJsLCB0b2tlbikudGhlbihjbGFpbXMgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5nZXRDbGFpbXM6IGNsYWltcyByZWNlaXZlZFwiLCBjbGFpbXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2dldENsYWltc0Zyb21Kd3QocmVxKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgand0ID0gdGhpcy5fam9zZVV0aWwucGFyc2VKd3QocmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBpZiAoIWp3dCB8fCAhand0LmhlYWRlciB8fCAhand0LnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IEZhaWxlZCB0byBwYXJzZSBKV1RcIiwgand0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIGlkX3Rva2VuXCIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGtpZCA9IGp3dC5oZWFkZXIua2lkO1xuXG4gICAgICAgICAgICBsZXQgaXNzdWVyUHJvbWlzZTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fc2V0dGluZ3MudXNlckluZm9Kd3RJc3N1ZXIpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdPUCc6XG4gICAgICAgICAgICAgICAgICAgIGlzc3VlclByb21pc2UgPSB0aGlzLl9tZXRhZGF0YVNlcnZpY2UuZ2V0SXNzdWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0FOWSc6XG4gICAgICAgICAgICAgICAgICAgIGlzc3VlclByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoand0LnBheWxvYWQuaXNzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaXNzdWVyUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9zZXR0aW5ncy51c2VySW5mb0p3dElzc3Vlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaXNzdWVyUHJvbWlzZS50aGVuKGlzc3VlciA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBSZWNlaXZlZCBpc3N1ZXI6XCIgKyBpc3N1ZXIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRTaWduaW5nS2V5cygpLnRoZW4oa2V5cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgha2V5cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBObyBzaWduaW5nIGtleXMgZnJvbSBtZXRhZGF0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzaWduaW5nIGtleXMgZnJvbSBtZXRhZGF0YVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IFJlY2VpdmVkIHNpZ25pbmcga2V5c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFraWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgPSB0aGlzLl9maWx0ZXJCeUFsZyhrZXlzLCBqd3QuaGVhZGVyLmFsZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IE5vIGtpZCBmb3VuZCBpbiBpZF90b2tlbiBhbmQgbW9yZSB0aGFuIG9uZSBrZXkgZm91bmQgaW4gbWV0YWRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIGtpZCBmb3VuZCBpbiBpZF90b2tlbiBhbmQgbW9yZSB0aGFuIG9uZSBrZXkgZm91bmQgaW4gbWV0YWRhdGFcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga2lkIGlzIG1hbmRhdG9yeSBvbmx5IHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIGtleXMgaW4gdGhlIHJlZmVyZW5jZWQgSldLIFNldCBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlZSBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI1NpZ25pbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5cy5maWx0ZXIoa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5LmtpZCA9PT0ga2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlckluZm9TZXJ2aWNlLl9nZXRDbGFpbXNGcm9tSnd0OiBObyBrZXkgbWF0Y2hpbmcga2lkIG9yIGFsZyBmb3VuZCBpbiBzaWduaW5nIGtleXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8ga2V5IG1hdGNoaW5nIGtpZCBvciBhbGcgZm91bmQgaW4gc2lnbmluZyBrZXlzXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBhdWRpZW5jZSA9IHRoaXMuX3NldHRpbmdzLmNsaWVudF9pZDtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xvY2tTa2V3SW5TZWNvbmRzID0gdGhpcy5fc2V0dGluZ3MuY2xvY2tTa2V3O1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IFZhbGlkYWluZyBKV1Q7IHVzaW5nIGNsb2NrIHNrZXcgKGluIHNlY29uZHMpIG9mOiBcIiwgY2xvY2tTa2V3SW5TZWNvbmRzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fam9zZVV0aWwudmFsaWRhdGVKd3QocmVxLnJlc3BvbnNlVGV4dCwga2V5LCBpc3N1ZXIsIGF1ZGllbmNlLCBjbG9ja1NrZXdJblNlY29uZHMsIHVuZGVmaW5lZCwgdHJ1ZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2dldENsYWltc0Zyb21Kd3Q6IEpXVCB2YWxpZGF0aW9uIHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gand0LnBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJJbmZvU2VydmljZS5fZ2V0Q2xhaW1zRnJvbUp3dDogRXJyb3IgcGFyc2luZyBKV1QgcmVzcG9uc2VcIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9maWx0ZXJCeUFsZyhrZXlzLCBhbGcpIHtcbiAgICAgICAgdmFyIGt0eSA9IG51bGw7XG4gICAgICAgIGlmIChhbGcuc3RhcnRzV2l0aChcIlJTXCIpKSB7XG4gICAgICAgICAgICBrdHkgPSBcIlJTQVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsZy5zdGFydHNXaXRoKFwiUFNcIikpIHtcbiAgICAgICAgICAgIGt0eSA9IFwiUFNcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGcuc3RhcnRzV2l0aChcIkVTXCIpKSB7XG4gICAgICAgICAgICBrdHkgPSBcIkVDXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2ZpbHRlckJ5QWxnOiBhbGcgbm90IHN1cHBvcnRlZDogXCIsIGFsZyk7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBMb2cuZGVidWcoXCJVc2VySW5mb1NlcnZpY2UuX2ZpbHRlckJ5QWxnOiBMb29raW5nIGZvciBrZXlzIHRoYXQgbWF0Y2gga3R5OiBcIiwga3R5KTtcblxuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoa2V5ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrZXkua3R5ID09PSBrdHk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJJbmZvU2VydmljZS5fZmlsdGVyQnlBbGc6IE51bWJlciBvZiBrZXlzIHRoYXQgbWF0Y2gga3R5OiBcIiwga3R5LCBrZXlzLmxlbmd0aCk7XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgT2lkY0NsaWVudCB9IGZyb20gJy4vT2lkY0NsaWVudC5qcyc7XG5pbXBvcnQgeyBVc2VyTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi9Vc2VyTWFuYWdlclNldHRpbmdzLmpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL1VzZXIuanMnO1xuaW1wb3J0IHsgVXNlck1hbmFnZXJFdmVudHMgfSBmcm9tICcuL1VzZXJNYW5hZ2VyRXZlbnRzLmpzJztcbmltcG9ydCB7IFNpbGVudFJlbmV3U2VydmljZSB9IGZyb20gJy4vU2lsZW50UmVuZXdTZXJ2aWNlLmpzJztcbmltcG9ydCB7IFNlc3Npb25Nb25pdG9yIH0gZnJvbSAnLi9TZXNzaW9uTW9uaXRvci5qcyc7XG5pbXBvcnQgeyBTaWduaW5SZXF1ZXN0IH0gZnJvbSBcIi4vU2lnbmluUmVxdWVzdFwiO1xuaW1wb3J0IHsgVG9rZW5SZXZvY2F0aW9uQ2xpZW50IH0gZnJvbSAnLi9Ub2tlblJldm9jYXRpb25DbGllbnQuanMnO1xuaW1wb3J0IHsgVG9rZW5DbGllbnQgfSBmcm9tICcuL1Rva2VuQ2xpZW50LmpzJztcbmltcG9ydCB7IEpvc2VVdGlsIH0gZnJvbSAnLi9Kb3NlVXRpbC5qcyc7XG5cblxuZXhwb3J0IGNsYXNzIFVzZXJNYW5hZ2VyIGV4dGVuZHMgT2lkY0NsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MgPSB7fSxcbiAgICAgICAgU2lsZW50UmVuZXdTZXJ2aWNlQ3RvciA9IFNpbGVudFJlbmV3U2VydmljZSxcbiAgICAgICAgU2Vzc2lvbk1vbml0b3JDdG9yID0gU2Vzc2lvbk1vbml0b3IsXG4gICAgICAgIFRva2VuUmV2b2NhdGlvbkNsaWVudEN0b3IgPSBUb2tlblJldm9jYXRpb25DbGllbnQsXG4gICAgICAgIFRva2VuQ2xpZW50Q3RvciA9IFRva2VuQ2xpZW50LFxuICAgICAgICBqb3NlVXRpbCA9IEpvc2VVdGlsXG4gICAgKSB7XG5cbiAgICAgICAgaWYgKCEoc2V0dGluZ3MgaW5zdGFuY2VvZiBVc2VyTWFuYWdlclNldHRpbmdzKSkge1xuICAgICAgICAgICAgc2V0dGluZ3MgPSBuZXcgVXNlck1hbmFnZXJTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoc2V0dGluZ3MpO1xuXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBVc2VyTWFuYWdlckV2ZW50cyhzZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3U2VydmljZSA9IG5ldyBTaWxlbnRSZW5ld1NlcnZpY2VDdG9yKHRoaXMpO1xuXG4gICAgICAgIC8vIG9yZGVyIGlzIGltcG9ydGFudCBmb3IgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOyB0aGVzZSBzZXJ2aWNlcyBkZXBlbmQgdXBvbiB0aGUgZXZlbnRzLlxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvbWF0aWNTaWxlbnRSZW5ldykge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuY3RvcjogYXV0b21hdGljU2lsZW50UmVuZXcgaXMgY29uZmlndXJlZCwgc2V0dGluZyB1cCBzaWxlbnQgcmVuZXdcIik7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2lsZW50UmVuZXcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1vbml0b3JTZXNzaW9uKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5jdG9yOiBtb25pdG9yU2Vzc2lvbiBpcyBjb25maWd1cmVkLCBzZXR0aW5nIHVwIHNlc3Npb24gbW9uaXRvclwiKTtcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25Nb25pdG9yID0gbmV3IFNlc3Npb25Nb25pdG9yQ3Rvcih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Rva2VuUmV2b2NhdGlvbkNsaWVudCA9IG5ldyBUb2tlblJldm9jYXRpb25DbGllbnRDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fdG9rZW5DbGllbnQgPSBuZXcgVG9rZW5DbGllbnRDdG9yKHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5fam9zZVV0aWwgPSBqb3NlVXRpbDtcbiAgICB9XG5cbiAgICBnZXQgX3JlZGlyZWN0TmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5yZWRpcmVjdE5hdmlnYXRvcjtcbiAgICB9XG4gICAgZ2V0IF9wb3B1cE5hdmlnYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MucG9wdXBOYXZpZ2F0b3I7XG4gICAgfVxuICAgIGdldCBfaWZyYW1lTmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5pZnJhbWVOYXZpZ2F0b3I7XG4gICAgfVxuICAgIGdldCBfdXNlclN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy51c2VyU3RvcmU7XG4gICAgfVxuXG4gICAgZ2V0IGV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cztcbiAgICB9XG5cbiAgICBnZXRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLmdldFVzZXI6IHVzZXIgbG9hZGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLmxvYWQodXNlciwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLmdldFVzZXI6IHVzZXIgbm90IGZvdW5kIGluIHN0b3JhZ2VcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZVVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlVXNlcihudWxsKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIucmVtb3ZlVXNlcjogdXNlciByZW1vdmVkIGZyb20gc3RvcmFnZVwiKTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy51bmxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbmluUmVkaXJlY3QoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic2k6clwiO1xuICAgICAgICBsZXQgbmF2UGFyYW1zID0ge1xuICAgICAgICAgICAgdXNlUmVwbGFjZVRvTmF2aWdhdGUgOiBhcmdzLnVzZVJlcGxhY2VUb05hdmlnYXRlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWduaW5TdGFydChhcmdzLCB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvciwgbmF2UGFyYW1zKS50aGVuKCgpPT57XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblJlZGlyZWN0OiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2lnbmluUmVkaXJlY3RDYWxsYmFjayh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pbkVuZCh1cmwgfHwgdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3IudXJsKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWduaW5SZWRpcmVjdENhbGxiYWNrOiBzdWNjZXNzZnVsLCBzaWduZWQgaW4gc3ViOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblJlZGlyZWN0Q2FsbGJhY2s6IG5vIHN1YlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25pblBvcHVwKGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5yZXF1ZXN0X3R5cGUgPSBcInNpOnBcIjtcbiAgICAgICAgbGV0IHVybCA9IGFyZ3MucmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucG9wdXBfcmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXA6IE5vIHBvcHVwX3JlZGlyZWN0X3VyaSBvciByZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBwb3B1cF9yZWRpcmVjdF91cmkgb3IgcmVkaXJlY3RfdXJpIGNvbmZpZ3VyZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5yZWRpcmVjdF91cmkgPSB1cmw7XG4gICAgICAgIGFyZ3MuZGlzcGxheSA9IFwicG9wdXBcIjtcblxuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluKGFyZ3MsIHRoaXMuX3BvcHVwTmF2aWdhdG9yLCB7XG4gICAgICAgICAgICBzdGFydFVybDogdXJsLFxuICAgICAgICAgICAgcG9wdXBXaW5kb3dGZWF0dXJlczogYXJncy5wb3B1cFdpbmRvd0ZlYXR1cmVzIHx8IHRoaXMuc2V0dGluZ3MucG9wdXBXaW5kb3dGZWF0dXJlcyxcbiAgICAgICAgICAgIHBvcHVwV2luZG93VGFyZ2V0OiBhcmdzLnBvcHVwV2luZG93VGFyZ2V0IHx8IHRoaXMuc2V0dGluZ3MucG9wdXBXaW5kb3dUYXJnZXRcbiAgICAgICAgfSkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXA6IHNpZ25pblBvcHVwIHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXA6IG5vIHN1YlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2lnbmluUG9wdXBDYWxsYmFjayh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pbkNhbGxiYWNrKHVybCwgdGhpcy5fcG9wdXBOYXZpZ2F0b3IpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyLnByb2ZpbGUgJiYgdXNlci5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblBvcHVwQ2FsbGJhY2s6IHN1Y2Nlc3NmdWwsIHNpZ25lZCBpbiBzdWI6IFwiLCB1c2VyLnByb2ZpbGUuc3ViKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXBDYWxsYmFjazogbm8gc3ViXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuc2lnbmluUG9wdXBDYWxsYmFjayBlcnJvcjogXCIgKyBlcnIgJiYgZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWduaW5TaWxlbnQoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICAvLyBmaXJzdCBkZXRlcm1pbmUgaWYgd2UgaGF2ZSBhIHJlZnJlc2ggdG9rZW4sIG9yIG5lZWQgdG8gdXNlIGlmcmFtZVxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIgJiYgdXNlci5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgYXJncy5yZWZyZXNoX3Rva2VuID0gdXNlci5yZWZyZXNoX3Rva2VuO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VSZWZyZXNoVG9rZW4oYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic2k6c1wiO1xuICAgICAgICAgICAgICAgIGFyZ3MuaWRfdG9rZW5faGludCA9IGFyZ3MuaWRfdG9rZW5faGludCB8fCAodGhpcy5zZXR0aW5ncy5pbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXcgJiYgdXNlciAmJiB1c2VyLmlkX3Rva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAodXNlciAmJiB0aGlzLl9zZXR0aW5ncy52YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50LCBzdWJqZWN0IHByaW9yIHRvIHNpbGVudCByZW5ldzogXCIsIHVzZXIucHJvZmlsZS5zdWIpO1xuICAgICAgICAgICAgICAgICAgICBhcmdzLmN1cnJlbnRfc3ViID0gdXNlci5wcm9maWxlLnN1YjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pblNpbGVudElmcmFtZShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3VzZVJlZnJlc2hUb2tlbihhcmdzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rva2VuQ2xpZW50LmV4Y2hhbmdlUmVmcmVzaFRva2VuKGFyZ3MpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3VzZVJlZnJlc2hUb2tlbjogTm8gcmVzcG9uc2UgcmV0dXJuZWQgZnJvbSB0b2tlbiBlbmRwb2ludFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJObyByZXNwb25zZSByZXR1cm5lZCBmcm9tIHRva2VuIGVuZHBvaW50XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3VzZVJlZnJlc2hUb2tlbjogTm8gYWNjZXNzIHRva2VuIHJldHVybmVkIGZyb20gdG9rZW4gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiTm8gYWNjZXNzIHRva2VuIHJldHVybmVkIGZyb20gdG9rZW4gZW5kcG9pbnRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkVG9rZW5WYWxpZGF0aW9uID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaWRfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkVG9rZW5WYWxpZGF0aW9uID0gdGhpcy5fdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuKHVzZXIucHJvZmlsZSwgcmVzdWx0LmlkX3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpZFRva2VuVmFsaWRhdGlvbi50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl91c2VSZWZyZXNoVG9rZW46IHJlZnJlc2ggdG9rZW4gcmVzcG9uc2Ugc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuaWRfdG9rZW4gPSByZXN1bHQuaWRfdG9rZW4gfHwgdXNlci5pZF90b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuYWNjZXNzX3Rva2VuID0gcmVzdWx0LmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIucmVmcmVzaF90b2tlbiA9IHJlc3VsdC5yZWZyZXNoX3Rva2VuIHx8IHVzZXIucmVmcmVzaF90b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuZXhwaXJlc19pbiA9IHJlc3VsdC5leHBpcmVzX2luO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZVVzZXIodXNlcikudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5sb2FkKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW4ocHJvZmlsZSwgaWRfdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGFkYXRhU2VydmljZS5nZXRJc3N1ZXIoKS50aGVuKGlzc3VlciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5nZXRFcG9jaFRpbWUoKS50aGVuKG5vdyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvc2VVdGlsLnZhbGlkYXRlSnd0QXR0cmlidXRlcyhpZF90b2tlbiwgaXNzdWVyLCB0aGlzLl9zZXR0aW5ncy5jbGllbnRfaWQsIHRoaXMuX3NldHRpbmdzLmNsb2NrU2tldywgbm93KS50aGVuKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW46IEZhaWxlZCB0byB2YWxpZGF0ZSBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJGYWlsZWQgdG8gdmFsaWRhdGUgaWRfdG9rZW5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLnN1YiAhPT0gcHJvZmlsZS5zdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW46IHN1YiBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBjdXJyZW50IHN1YlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJzdWIgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggY3VycmVudCBzdWJcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmF1dGhfdGltZSAmJiBwYXlsb2FkLmF1dGhfdGltZSAhPT0gcHJvZmlsZS5hdXRoX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLl92YWxpZGF0ZUlkVG9rZW5Gcm9tVG9rZW5SZWZyZXNoVG9rZW46IGF1dGhfdGltZSBpbiBpZF90b2tlbiBkb2VzIG5vdCBtYXRjaCBvcmlnaW5hbCBhdXRoX3RpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiYXV0aF90aW1lIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIG9yaWdpbmFsIGF1dGhfdGltZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXpwICYmIHBheWxvYWQuYXpwICE9PSBwcm9maWxlLmF6cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiVXNlck1hbmFnZXIuX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbjogYXpwIGluIGlkX3Rva2VuIGRvZXMgbm90IG1hdGNoIG9yaWdpbmFsIGF6cFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhenAgaW4gaWRfdG9rZW4gZG9lcyBub3QgbWF0Y2ggb3JpZ2luYWwgYXpwXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBheWxvYWQuYXpwICYmIHByb2ZpbGUuYXpwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5fdmFsaWRhdGVJZFRva2VuRnJvbVRva2VuUmVmcmVzaFRva2VuOiBhenAgbm90IGluIGlkX3Rva2VuLCBidXQgcHJlc2VudCBpbiBvcmlnaW5hbCBpZF90b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJhenAgbm90IGluIGlkX3Rva2VuLCBidXQgcHJlc2VudCBpbiBvcmlnaW5hbCBpZF90b2tlblwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgX3NpZ25pblNpbGVudElmcmFtZShhcmdzID0ge30pIHtcbiAgICAgICAgbGV0IHVybCA9IGFyZ3MucmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3Muc2lsZW50X3JlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnJlZGlyZWN0X3VyaTtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudDogTm8gc2lsZW50X3JlZGlyZWN0X3VyaSBjb25maWd1cmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHNpbGVudF9yZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzLnJlZGlyZWN0X3VyaSA9IHVybDtcbiAgICAgICAgYXJncy5wcm9tcHQgPSBhcmdzLnByb21wdCB8fCBcIm5vbmVcIjtcblxuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluKGFyZ3MsIHRoaXMuX2lmcmFtZU5hdmlnYXRvciwge1xuICAgICAgICAgICAgc3RhcnRVcmw6IHVybCxcbiAgICAgICAgICAgIHNpbGVudFJlcXVlc3RUaW1lb3V0OiBhcmdzLnNpbGVudFJlcXVlc3RUaW1lb3V0IHx8IHRoaXMuc2V0dGluZ3Muc2lsZW50UmVxdWVzdFRpbWVvdXRcbiAgICAgICAgfSkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucHJvZmlsZSAmJiB1c2VyLnByb2ZpbGUuc3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIuc2lnbmluU2lsZW50OiBzdWNjZXNzZnVsLCBzaWduZWQgaW4gc3ViOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudDogbm8gc3ViXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25pblNpbGVudENhbGxiYWNrKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluQ2FsbGJhY2sodXJsLCB0aGlzLl9pZnJhbWVOYXZpZ2F0b3IpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyLnByb2ZpbGUgJiYgdXNlci5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudENhbGxiYWNrOiBzdWNjZXNzZnVsLCBzaWduZWQgaW4gc3ViOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25pblNpbGVudENhbGxiYWNrOiBubyBzdWJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbmluQ2FsbGJhY2sodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRTaWduaW5SZXNwb25zZVN0YXRlKHVybCkudGhlbigoe3N0YXRlLCByZXNwb25zZX0pID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5yZXF1ZXN0X3R5cGUgPT09IFwic2k6clwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmluUmVkaXJlY3RDYWxsYmFjayh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlLnJlcXVlc3RfdHlwZSA9PT0gXCJzaTpwXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaWduaW5Qb3B1cENhbGxiYWNrKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUucmVxdWVzdF90eXBlID09PSBcInNpOnNcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25pblNpbGVudENhbGxiYWNrKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaW52YWxpZCByZXNwb25zZV90eXBlIGluIHN0YXRlXCIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbm91dENhbGxiYWNrKHVybCwga2VlcE9wZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlKHVybCkudGhlbigoe3N0YXRlLCByZXNwb25zZX0pID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZXF1ZXN0X3R5cGUgPT09IFwic286clwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25vdXRSZWRpcmVjdENhbGxiYWNrKHVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZXF1ZXN0X3R5cGUgPT09IFwic286cFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25vdXRQb3B1cENhbGxiYWNrKHVybCwga2VlcE9wZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiaW52YWxpZCByZXNwb25zZV90eXBlIGluIHN0YXRlXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcXVlcnlTZXNzaW9uU3RhdHVzKGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5yZXF1ZXN0X3R5cGUgPSBcInNpOnNcIjsgLy8gdGhpcyBhY3RzIGxpa2UgYSBzaWduaW4gc2lsZW50XG4gICAgICAgIGxldCB1cmwgPSBhcmdzLnJlZGlyZWN0X3VyaSB8fCB0aGlzLnNldHRpbmdzLnNpbGVudF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmk7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJVc2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXM6IE5vIHNpbGVudF9yZWRpcmVjdF91cmkgY29uZmlndXJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBzaWxlbnRfcmVkaXJlY3RfdXJpIGNvbmZpZ3VyZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5yZWRpcmVjdF91cmkgPSB1cmw7XG4gICAgICAgIGFyZ3MucHJvbXB0ID0gXCJub25lXCI7XG4gICAgICAgIGFyZ3MucmVzcG9uc2VfdHlwZSA9IGFyZ3MucmVzcG9uc2VfdHlwZSB8fCB0aGlzLnNldHRpbmdzLnF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlO1xuICAgICAgICBhcmdzLnNjb3BlID0gYXJncy5zY29wZSB8fCBcIm9wZW5pZFwiO1xuICAgICAgICBhcmdzLnNraXBVc2VySW5mbyA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pblN0YXJ0KGFyZ3MsIHRoaXMuX2lmcmFtZU5hdmlnYXRvciwge1xuICAgICAgICAgICAgc3RhcnRVcmw6IHVybCxcbiAgICAgICAgICAgIHNpbGVudFJlcXVlc3RUaW1lb3V0OiBhcmdzLnNpbGVudFJlcXVlc3RUaW1lb3V0IHx8IHRoaXMuc2V0dGluZ3Muc2lsZW50UmVxdWVzdFRpbWVvdXRcbiAgICAgICAgfSkudGhlbihuYXZSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzU2lnbmluUmVzcG9uc2UobmF2UmVzcG9uc2UudXJsKS50aGVuKHNpZ25pblJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5xdWVyeVNlc3Npb25TdGF0dXM6IGdvdCBzaWduaW4gcmVzcG9uc2VcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2lnbmluUmVzcG9uc2Uuc2Vzc2lvbl9zdGF0ZSAmJiBzaWduaW5SZXNwb25zZS5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnF1ZXJ5U2Vzc2lvblN0YXR1czogcXVlcnlTZXNzaW9uU3RhdHVzIHN1Y2Nlc3MgZm9yIHN1YjogXCIsICBzaWduaW5SZXNwb25zZS5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uX3N0YXRlOiBzaWduaW5SZXNwb25zZS5zZXNzaW9uX3N0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViOiBzaWduaW5SZXNwb25zZS5wcm9maWxlLnN1YixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZDogc2lnbmluUmVzcG9uc2UucHJvZmlsZS5zaWRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwicXVlcnlTZXNzaW9uU3RhdHVzIHN1Y2Nlc3NmdWwsIHVzZXIgbm90IGF1dGhlbnRpY2F0ZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIuc2Vzc2lvbl9zdGF0ZSAmJiB0aGlzLnNldHRpbmdzLm1vbml0b3JBbm9ueW1vdXNTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIubWVzc2FnZSA9PSBcImxvZ2luX3JlcXVpcmVkXCIgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9PSBcImNvbnNlbnRfcmVxdWlyZWRcIiB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID09IFwiaW50ZXJhY3Rpb25fcmVxdWlyZWRcIiB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID09IFwiYWNjb3VudF9zZWxlY3Rpb25fcmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiVXNlck1hbmFnZXIucXVlcnlTZXNzaW9uU3RhdHVzOiBxdWVyeVNlc3Npb25TdGF0dXMgc3VjY2VzcyBmb3IgYW5vbnltb3VzIHVzZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25fc3RhdGU6IGVyci5zZXNzaW9uX3N0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9zaWduaW4oYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbmluU3RhcnQoYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMpLnRoZW4obmF2UmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25pbkVuZChuYXZSZXNwb25zZS51cmwsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NpZ25pblN0YXJ0KGFyZ3MsIG5hdmlnYXRvciwgbmF2aWdhdG9yUGFyYW1zID0ge30pIHtcblxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnByZXBhcmUobmF2aWdhdG9yUGFyYW1zKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluU3RhcnQ6IGdvdCBuYXZpZ2F0b3Igd2luZG93IGhhbmRsZVwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlU2lnbmluUmVxdWVzdChhcmdzKS50aGVuKHNpZ25pblJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5TdGFydDogZ290IHNpZ25pbiByZXF1ZXN0XCIpO1xuXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yUGFyYW1zLnVybCA9IHNpZ25pblJlcXVlc3QudXJsO1xuICAgICAgICAgICAgICAgIG5hdmlnYXRvclBhcmFtcy5pZCA9IHNpZ25pblJlcXVlc3Quc3RhdGUuaWQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlLm5hdmlnYXRlKG5hdmlnYXRvclBhcmFtcyk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kbGUuY2xvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25pblN0YXJ0OiBFcnJvciBhZnRlciBwcmVwYXJpbmcgbmF2aWdhdG9yLCBjbG9zaW5nIG5hdmlnYXRvciB3aW5kb3dcIik7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9zaWduaW5FbmQodXJsLCBhcmdzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1NpZ25pblJlc3BvbnNlKHVybCkudGhlbihzaWduaW5SZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluRW5kOiBnb3Qgc2lnbmluIHJlc3BvbnNlXCIpO1xuXG4gICAgICAgICAgICBsZXQgdXNlciA9IG5ldyBVc2VyKHNpZ25pblJlc3BvbnNlKTtcblxuICAgICAgICAgICAgaWYgKGFyZ3MuY3VycmVudF9zdWIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5jdXJyZW50X3N1YiAhPT0gdXNlci5wcm9maWxlLnN1Yikge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluRW5kOiBjdXJyZW50IHVzZXIgZG9lcyBub3QgbWF0Y2ggdXNlciByZXR1cm5lZCBmcm9tIHNpZ25pbi4gc3ViIGZyb20gc2lnbmluOiBcIiwgdXNlci5wcm9maWxlLnN1Yik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJsb2dpbl9yZXF1aXJlZFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbmluRW5kOiBjdXJyZW50IHVzZXIgbWF0Y2hlcyB1c2VyIHJldHVybmVkIGZyb20gc2lnbmluXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVVc2VyKHVzZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5FbmQ6IHVzZXIgc3RvcmVkXCIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLmxvYWQodXNlcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NpZ25pbkNhbGxiYWNrKHVybCwgbmF2aWdhdG9yKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWduaW5DYWxsYmFja1wiKTtcbiAgICAgICAgbGV0IHVzZVF1ZXJ5ID0gdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZSA9PT0gXCJxdWVyeVwiIHx8ICghdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VfbW9kZSAmJiBTaWduaW5SZXF1ZXN0LmlzQ29kZSh0aGlzLl9zZXR0aW5ncy5yZXNwb25zZV90eXBlKSk7XG4gICAgICAgIGxldCBkZWxpbWl0ZXIgPSB1c2VRdWVyeSA/IFwiP1wiIDogXCIjXCI7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuY2FsbGJhY2sodXJsLCB1bmRlZmluZWQsIGRlbGltaXRlcik7XG4gICAgfVxuXG4gICAgc2lnbm91dFJlZGlyZWN0KGFyZ3MgPSB7fSkge1xuICAgICAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAgICAgYXJncy5yZXF1ZXN0X3R5cGUgPSBcInNvOnJcIjtcbiAgICAgICAgbGV0IHBvc3RMb2dvdXRSZWRpcmVjdFVyaSA9IGFyZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIHx8IHRoaXMuc2V0dGluZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgICAgICBpZiAocG9zdExvZ291dFJlZGlyZWN0VXJpKXtcbiAgICAgICAgICAgIGFyZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gcG9zdExvZ291dFJlZGlyZWN0VXJpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuYXZQYXJhbXMgPSB7XG4gICAgICAgICAgICB1c2VSZXBsYWNlVG9OYXZpZ2F0ZSA6IGFyZ3MudXNlUmVwbGFjZVRvTmF2aWdhdGVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZ25vdXRTdGFydChhcmdzLCB0aGlzLl9yZWRpcmVjdE5hdmlnYXRvciwgbmF2UGFyYW1zKS50aGVuKCgpPT57XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25vdXRSZWRpcmVjdDogc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpZ25vdXRSZWRpcmVjdENhbGxiYWNrKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbm91dEVuZCh1cmwgfHwgdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3IudXJsKS50aGVuKHJlc3BvbnNlPT57XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25vdXRSZWRpcmVjdENhbGxiYWNrOiBzdWNjZXNzZnVsXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaWdub3V0UG9wdXAoYXJncyA9IHt9KSB7XG4gICAgICAgIGFyZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBhcmdzKTtcblxuICAgICAgICBhcmdzLnJlcXVlc3RfdHlwZSA9IFwic286cFwiO1xuICAgICAgICBsZXQgdXJsID0gYXJncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5wb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgfHwgdGhpcy5zZXR0aW5ncy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgICAgIGFyZ3MucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpID0gdXJsO1xuICAgICAgICBhcmdzLmRpc3BsYXkgPSBcInBvcHVwXCI7XG4gICAgICAgIGlmIChhcmdzLnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSl7XG4gICAgICAgICAgICAvLyB3ZSdyZSBwdXR0aW5nIGEgZHVtbXkgZW50cnkgaW4gaGVyZSBiZWNhdXNlIHdlXG4gICAgICAgICAgICAvLyBuZWVkIGEgdW5pcXVlIGlkIGZyb20gdGhlIHN0YXRlIGZvciBub3RpZmljYXRpb25cbiAgICAgICAgICAgIC8vIHRvIHRoZSBwYXJlbnQgd2luZG93LCB3aGljaCBpcyBuZWNlc3NhcnkgaWYgd2VcbiAgICAgICAgICAgIC8vIHBsYW4gdG8gcmV0dXJuIGJhY2sgdG8gdGhlIGNsaWVudCBhZnRlciBzaWdub3V0XG4gICAgICAgICAgICAvLyBhbmQgc28gd2UgY2FuIGNsb3NlIHRoZSBwb3B1cCBhZnRlciBzaWdub3V0XG4gICAgICAgICAgICBhcmdzLnN0YXRlID0gYXJncy5zdGF0ZSB8fCB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWdub3V0KGFyZ3MsIHRoaXMuX3BvcHVwTmF2aWdhdG9yLCB7XG4gICAgICAgICAgICBzdGFydFVybDogdXJsLFxuICAgICAgICAgICAgcG9wdXBXaW5kb3dGZWF0dXJlczogYXJncy5wb3B1cFdpbmRvd0ZlYXR1cmVzIHx8IHRoaXMuc2V0dGluZ3MucG9wdXBXaW5kb3dGZWF0dXJlcyxcbiAgICAgICAgICAgIHBvcHVwV2luZG93VGFyZ2V0OiBhcmdzLnBvcHVwV2luZG93VGFyZ2V0IHx8IHRoaXMuc2V0dGluZ3MucG9wdXBXaW5kb3dUYXJnZXRcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnNpZ25vdXRQb3B1cDogc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpZ25vdXRQb3B1cENhbGxiYWNrKHVybCwga2VlcE9wZW4pIHtcbiAgICAgICAgaWYgKHR5cGVvZihrZWVwT3BlbikgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZih1cmwpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGtlZXBPcGVuID0gdXJsO1xuICAgICAgICAgICAgdXJsID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkZWxpbWl0ZXIgPSAnPyc7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3B1cE5hdmlnYXRvci5jYWxsYmFjayh1cmwsIGtlZXBPcGVuLCBkZWxpbWl0ZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTG9nLmluZm8oXCJVc2VyTWFuYWdlci5zaWdub3V0UG9wdXBDYWxsYmFjazogc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3NpZ25vdXQoYXJncywgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lnbm91dFN0YXJ0KGFyZ3MsIG5hdmlnYXRvciwgbmF2aWdhdG9yUGFyYW1zKS50aGVuKG5hdlJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaWdub3V0RW5kKG5hdlJlc3BvbnNlLnVybCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2lnbm91dFN0YXJ0KGFyZ3MgPSB7fSwgbmF2aWdhdG9yLCBuYXZpZ2F0b3JQYXJhbXMgPSB7fSkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnByZXBhcmUobmF2aWdhdG9yUGFyYW1zKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiBnb3QgbmF2aWdhdG9yIHdpbmRvdyBoYW5kbGVcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkVXNlcigpLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRTdGFydDogbG9hZGVkIGN1cnJlbnQgdXNlciBmcm9tIHN0b3JhZ2VcIik7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmV2b2tlUHJvbWlzZSA9IHRoaXMuX3NldHRpbmdzLnJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0ID8gdGhpcy5fcmV2b2tlSW50ZXJuYWwodXNlcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV2b2tlUHJvbWlzZS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaWRfdG9rZW4gPSBhcmdzLmlkX3Rva2VuX2hpbnQgfHwgdXNlciAmJiB1c2VyLmlkX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWRfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IFNldHRpbmcgaWRfdG9rZW4gaW50byBzaWdub3V0IHJlcXVlc3RcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLmlkX3Rva2VuX2hpbnQgPSBpZF90b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVVzZXIoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9zaWdub3V0U3RhcnQ6IHVzZXIgcmVtb3ZlZCwgY3JlYXRpbmcgc2lnbm91dCByZXF1ZXN0XCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTaWdub3V0UmVxdWVzdChhcmdzKS50aGVuKHNpZ25vdXRSZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiBnb3Qgc2lnbm91dCByZXF1ZXN0XCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yUGFyYW1zLnVybCA9IHNpZ25vdXRSZXF1ZXN0LnVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2lnbm91dFJlcXVlc3Quc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yUGFyYW1zLmlkID0gc2lnbm91dFJlcXVlc3Quc3RhdGUuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUubmF2aWdhdGUobmF2aWdhdG9yUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZS5jbG9zZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlci5fc2lnbm91dFN0YXJ0OiBFcnJvciBhZnRlciBwcmVwYXJpbmcgbmF2aWdhdG9yLCBjbG9zaW5nIG5hdmlnYXRvciB3aW5kb3dcIik7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9zaWdub3V0RW5kKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzU2lnbm91dFJlc3BvbnNlKHVybCkudGhlbihzaWdub3V0UmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX3NpZ25vdXRFbmQ6IGdvdCBzaWdub3V0IHJlc3BvbnNlXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2lnbm91dFJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXZva2VBY2Nlc3NUb2tlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRVc2VyKCkudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXZva2VJbnRlcm5hbCh1c2VyLCB0cnVlKS50aGVuKHN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnJldm9rZUFjY2Vzc1Rva2VuOiByZW1vdmluZyB0b2tlbiBwcm9wZXJ0aWVzIGZyb20gdXNlciBhbmQgcmUtc3RvcmluZ1wiKTtcblxuICAgICAgICAgICAgICAgICAgICB1c2VyLmFjY2Vzc190b2tlbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIucmVmcmVzaF90b2tlbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIuZXhwaXJlc19hdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIudG9rZW5fdHlwZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVVc2VyKHVzZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIucmV2b2tlQWNjZXNzVG9rZW46IHVzZXIgc3RvcmVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLmxvYWQodXNlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICBMb2cuaW5mbyhcIlVzZXJNYW5hZ2VyLnJldm9rZUFjY2Vzc1Rva2VuOiBhY2Nlc3MgdG9rZW4gcmV2b2tlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9yZXZva2VJbnRlcm5hbCh1c2VyLCByZXF1aXJlZCkge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgdmFyIGFjY2Vzc190b2tlbiA9IHVzZXIuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgdmFyIHJlZnJlc2hfdG9rZW4gPSB1c2VyLnJlZnJlc2hfdG9rZW47XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXZva2VBY2Nlc3NUb2tlbkludGVybmFsKGFjY2Vzc190b2tlbiwgcmVxdWlyZWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oYXRTdWNjZXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jldm9rZVJlZnJlc2hUb2tlbkludGVybmFsKHJlZnJlc2hfdG9rZW4sIHJlcXVpcmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocnRTdWNjZXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF0U3VjY2VzcyAmJiAhcnRTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnJldm9rZUFjY2Vzc1Rva2VuOiBubyBuZWVkIHRvIHJldm9rZSBkdWUgdG8gbm8gdG9rZW4ocyksIG9yIEpXVCBmb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdFN1Y2Nlc3MgfHwgcnRTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBfcmV2b2tlQWNjZXNzVG9rZW5JbnRlcm5hbChhY2Nlc3NfdG9rZW4sIHJlcXVpcmVkKSB7XG4gICAgICAgIC8vIGNoZWNrIGZvciBKV1QgdnMuIHJlZmVyZW5jZSB0b2tlblxuICAgICAgICBpZiAoIWFjY2Vzc190b2tlbiB8fCBhY2Nlc3NfdG9rZW4uaW5kZXhPZignLicpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rva2VuUmV2b2NhdGlvbkNsaWVudC5yZXZva2UoYWNjZXNzX3Rva2VuLCByZXF1aXJlZCkudGhlbigoKSA9PiB0cnVlKTtcbiAgICB9XG5cbiAgICBfcmV2b2tlUmVmcmVzaFRva2VuSW50ZXJuYWwocmVmcmVzaF90b2tlbiwgcmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKCFyZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl90b2tlblJldm9jYXRpb25DbGllbnQucmV2b2tlKHJlZnJlc2hfdG9rZW4sIHJlcXVpcmVkLCBcInJlZnJlc2hfdG9rZW5cIikudGhlbigoKSA9PiB0cnVlKTtcbiAgICB9XG5cbiAgICBzdGFydFNpbGVudFJlbmV3KCkge1xuICAgICAgICB0aGlzLl9zaWxlbnRSZW5ld1NlcnZpY2Uuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBzdG9wU2lsZW50UmVuZXcoKSB7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3U2VydmljZS5zdG9wKCk7XG4gICAgfVxuXG4gICAgZ2V0IF91c2VyU3RvcmVLZXkoKSB7XG4gICAgICAgIHJldHVybiBgdXNlcjoke3RoaXMuc2V0dGluZ3MuYXV0aG9yaXR5fToke3RoaXMuc2V0dGluZ3MuY2xpZW50X2lkfWA7XG4gICAgfVxuXG4gICAgX2xvYWRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclN0b3JlLmdldCh0aGlzLl91c2VyU3RvcmVLZXkpLnRoZW4oc3RvcmFnZVN0cmluZyA9PiB7XG4gICAgICAgICAgICBpZiAoc3RvcmFnZVN0cmluZykge1xuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLl9sb2FkVXNlcjogdXNlciBzdG9yYWdlU3RyaW5nIGxvYWRlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXNlci5mcm9tU3RvcmFnZVN0cmluZyhzdG9yYWdlU3RyaW5nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nLmRlYnVnKFwiVXNlck1hbmFnZXIuX2xvYWRVc2VyOiBubyB1c2VyIHN0b3JhZ2VTdHJpbmdcIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcmVVc2VyKHVzZXIpIHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyLnN0b3JlVXNlcjogc3RvcmluZyB1c2VyXCIpO1xuXG4gICAgICAgICAgICB2YXIgc3RvcmFnZVN0cmluZyA9IHVzZXIudG9TdG9yYWdlU3RyaW5nKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclN0b3JlLnNldCh0aGlzLl91c2VyU3RvcmVLZXksIHN0b3JhZ2VTdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTG9nLmRlYnVnKFwic3RvcmVVc2VyLnN0b3JlVXNlcjogcmVtb3ZpbmcgdXNlclwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyU3RvcmUucmVtb3ZlKHRoaXMuX3VzZXJTdG9yZUtleSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIEJyb2NrIEFsbGVuICYgRG9taW5pY2sgQmFpZXIuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL0xvZy5qcyc7XG5pbXBvcnQgeyBBY2Nlc3NUb2tlbkV2ZW50cyB9IGZyb20gJy4vQWNjZXNzVG9rZW5FdmVudHMuanMnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL0V2ZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFVzZXJNYW5hZ2VyRXZlbnRzIGV4dGVuZHMgQWNjZXNzVG9rZW5FdmVudHMge1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcbiAgICAgICAgc3VwZXIoc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLl91c2VyTG9hZGVkID0gbmV3IEV2ZW50KFwiVXNlciBsb2FkZWRcIik7XG4gICAgICAgIHRoaXMuX3VzZXJVbmxvYWRlZCA9IG5ldyBFdmVudChcIlVzZXIgdW5sb2FkZWRcIik7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3RXJyb3IgPSBuZXcgRXZlbnQoXCJTaWxlbnQgcmVuZXcgZXJyb3JcIik7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRJbiA9IG5ldyBFdmVudChcIlVzZXIgc2lnbmVkIGluXCIpO1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkT3V0ID0gbmV3IEV2ZW50KFwiVXNlciBzaWduZWQgb3V0XCIpO1xuICAgICAgICB0aGlzLl91c2VyU2Vzc2lvbkNoYW5nZWQgPSBuZXcgRXZlbnQoXCJVc2VyIHNlc3Npb24gY2hhbmdlZFwiKTtcbiAgICB9XG5cbiAgICBsb2FkKHVzZXIsIHJhaXNlRXZlbnQ9dHJ1ZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5sb2FkXCIpO1xuICAgICAgICBzdXBlci5sb2FkKHVzZXIpO1xuICAgICAgICBpZiAocmFpc2VFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5fdXNlckxvYWRlZC5yYWlzZSh1c2VyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bmxvYWQoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIlVzZXJNYW5hZ2VyRXZlbnRzLnVubG9hZFwiKTtcbiAgICAgICAgc3VwZXIudW5sb2FkKCk7XG4gICAgICAgIHRoaXMuX3VzZXJVbmxvYWRlZC5yYWlzZSgpO1xuICAgIH1cblxuICAgIGFkZFVzZXJMb2FkZWQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlckxvYWRlZC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlckxvYWRlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyTG9hZGVkLnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cblxuICAgIGFkZFVzZXJVbmxvYWRlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyVW5sb2FkZWQuYWRkSGFuZGxlcihjYik7XG4gICAgfVxuICAgIHJlbW92ZVVzZXJVbmxvYWRlZChjYikge1xuICAgICAgICB0aGlzLl91c2VyVW5sb2FkZWQucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuXG4gICAgYWRkU2lsZW50UmVuZXdFcnJvcihjYikge1xuICAgICAgICB0aGlzLl9zaWxlbnRSZW5ld0Vycm9yLmFkZEhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICByZW1vdmVTaWxlbnRSZW5ld0Vycm9yKGNiKSB7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3RXJyb3IucmVtb3ZlSGFuZGxlcihjYik7XG4gICAgfVxuICAgIF9yYWlzZVNpbGVudFJlbmV3RXJyb3IoZSkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5fcmFpc2VTaWxlbnRSZW5ld0Vycm9yXCIsIGUubWVzc2FnZSk7XG4gICAgICAgIHRoaXMuX3NpbGVudFJlbmV3RXJyb3IucmFpc2UoZSk7XG4gICAgfVxuXG4gICAgYWRkVXNlclNpZ25lZEluKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRJbi5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlclNpZ25lZEluKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRJbi5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgX3JhaXNlVXNlclNpZ25lZEluKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkSW5cIik7XG4gICAgICAgIHRoaXMuX3VzZXJTaWduZWRJbi5yYWlzZSgpO1xuICAgIH1cblxuICAgIGFkZFVzZXJTaWduZWRPdXQoY2IpIHtcbiAgICAgICAgdGhpcy5fdXNlclNpZ25lZE91dC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlclNpZ25lZE91dChjYikge1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkT3V0LnJlbW92ZUhhbmRsZXIoY2IpO1xuICAgIH1cbiAgICBfcmFpc2VVc2VyU2lnbmVkT3V0KCkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5fcmFpc2VVc2VyU2lnbmVkT3V0XCIpO1xuICAgICAgICB0aGlzLl91c2VyU2lnbmVkT3V0LnJhaXNlKCk7XG4gICAgfVxuXG4gICAgYWRkVXNlclNlc3Npb25DaGFuZ2VkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTZXNzaW9uQ2hhbmdlZC5hZGRIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgcmVtb3ZlVXNlclNlc3Npb25DaGFuZ2VkKGNiKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTZXNzaW9uQ2hhbmdlZC5yZW1vdmVIYW5kbGVyKGNiKTtcbiAgICB9XG4gICAgX3JhaXNlVXNlclNlc3Npb25DaGFuZ2VkKCkge1xuICAgICAgICBMb2cuZGVidWcoXCJVc2VyTWFuYWdlckV2ZW50cy5fcmFpc2VVc2VyU2Vzc2lvbkNoYW5nZWRcIik7XG4gICAgICAgIHRoaXMuX3VzZXJTZXNzaW9uQ2hhbmdlZC5yYWlzZSgpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgQnJvY2sgQWxsZW4gJiBEb21pbmljayBCYWllci4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnRTZXR0aW5ncyB9IGZyb20gJy4vT2lkY0NsaWVudFNldHRpbmdzLmpzJztcbmltcG9ydCB7IFJlZGlyZWN0TmF2aWdhdG9yIH0gZnJvbSAnLi9SZWRpcmVjdE5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBQb3B1cE5hdmlnYXRvciB9IGZyb20gJy4vUG9wdXBOYXZpZ2F0b3IuanMnO1xuaW1wb3J0IHsgSUZyYW1lTmF2aWdhdG9yIH0gZnJvbSAnLi9JRnJhbWVOYXZpZ2F0b3IuanMnO1xuaW1wb3J0IHsgV2ViU3RvcmFnZVN0YXRlU3RvcmUgfSBmcm9tICcuL1dlYlN0b3JhZ2VTdGF0ZVN0b3JlLmpzJztcbmltcG9ydCB7IEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IFNpZ25pblJlcXVlc3QgfSBmcm9tICcuL1NpZ25pblJlcXVlc3QuanMnO1xuXG5jb25zdCBEZWZhdWx0QWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSA2MDtcbmNvbnN0IERlZmF1bHRDaGVja1Nlc3Npb25JbnRlcnZhbCA9IDIwMDA7XG5cbmV4cG9ydCBjbGFzcyBVc2VyTWFuYWdlclNldHRpbmdzIGV4dGVuZHMgT2lkY0NsaWVudFNldHRpbmdzIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIHBvcHVwX3JlZGlyZWN0X3VyaSxcbiAgICAgICAgcG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLFxuICAgICAgICBwb3B1cFdpbmRvd0ZlYXR1cmVzLFxuICAgICAgICBwb3B1cFdpbmRvd1RhcmdldCxcbiAgICAgICAgc2lsZW50X3JlZGlyZWN0X3VyaSxcbiAgICAgICAgc2lsZW50UmVxdWVzdFRpbWVvdXQsXG4gICAgICAgIGF1dG9tYXRpY1NpbGVudFJlbmV3ID0gZmFsc2UsXG4gICAgICAgIHZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldyA9IGZhbHNlLFxuICAgICAgICBpbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXcgPSB0cnVlLFxuICAgICAgICBtb25pdG9yU2Vzc2lvbiA9IHRydWUsXG4gICAgICAgIG1vbml0b3JBbm9ueW1vdXNTZXNzaW9uID0gZmFsc2UsXG4gICAgICAgIGNoZWNrU2Vzc2lvbkludGVydmFsID0gRGVmYXVsdENoZWNrU2Vzc2lvbkludGVydmFsLFxuICAgICAgICBzdG9wQ2hlY2tTZXNzaW9uT25FcnJvciA9IHRydWUsXG4gICAgICAgIHF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlLFxuICAgICAgICByZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dCA9IGZhbHNlLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSA9IERlZmF1bHRBY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSxcbiAgICAgICAgcmVkaXJlY3ROYXZpZ2F0b3IgPSBuZXcgUmVkaXJlY3ROYXZpZ2F0b3IoKSxcbiAgICAgICAgcG9wdXBOYXZpZ2F0b3IgPSBuZXcgUG9wdXBOYXZpZ2F0b3IoKSxcbiAgICAgICAgaWZyYW1lTmF2aWdhdG9yID0gbmV3IElGcmFtZU5hdmlnYXRvcigpLFxuICAgICAgICB1c2VyU3RvcmUgPSBuZXcgV2ViU3RvcmFnZVN0YXRlU3RvcmUoeyBzdG9yZTogR2xvYmFsLnNlc3Npb25TdG9yYWdlIH0pXG4gICAgfSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGFyZ3VtZW50c1swXSk7XG5cbiAgICAgICAgdGhpcy5fcG9wdXBfcmVkaXJlY3RfdXJpID0gcG9wdXBfcmVkaXJlY3RfdXJpO1xuICAgICAgICB0aGlzLl9wb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgPSBwb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuX3BvcHVwV2luZG93RmVhdHVyZXMgPSBwb3B1cFdpbmRvd0ZlYXR1cmVzO1xuICAgICAgICB0aGlzLl9wb3B1cFdpbmRvd1RhcmdldCA9IHBvcHVwV2luZG93VGFyZ2V0O1xuXG4gICAgICAgIHRoaXMuX3NpbGVudF9yZWRpcmVjdF91cmkgPSBzaWxlbnRfcmVkaXJlY3RfdXJpO1xuICAgICAgICB0aGlzLl9zaWxlbnRSZXF1ZXN0VGltZW91dCA9IHNpbGVudFJlcXVlc3RUaW1lb3V0O1xuICAgICAgICB0aGlzLl9hdXRvbWF0aWNTaWxlbnRSZW5ldyA9IGF1dG9tYXRpY1NpbGVudFJlbmV3O1xuICAgICAgICB0aGlzLl92YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXcgPSB2YWxpZGF0ZVN1Yk9uU2lsZW50UmVuZXc7XG4gICAgICAgIHRoaXMuX2luY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyA9IGluY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldztcbiAgICAgICAgdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUgPSBhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZTtcblxuICAgICAgICB0aGlzLl9tb25pdG9yU2Vzc2lvbiA9IG1vbml0b3JTZXNzaW9uO1xuICAgICAgICB0aGlzLl9tb25pdG9yQW5vbnltb3VzU2Vzc2lvbiA9IG1vbml0b3JBbm9ueW1vdXNTZXNzaW9uO1xuICAgICAgICB0aGlzLl9jaGVja1Nlc3Npb25JbnRlcnZhbCA9IGNoZWNrU2Vzc2lvbkludGVydmFsO1xuICAgICAgICB0aGlzLl9zdG9wQ2hlY2tTZXNzaW9uT25FcnJvciA9IHN0b3BDaGVja1Nlc3Npb25PbkVycm9yO1xuICAgICAgICBpZiAocXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlID0gcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGU7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKGFyZ3VtZW50c1swXSAmJiBhcmd1bWVudHNbMF0ucmVzcG9uc2VfdHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUgPSBTaWduaW5SZXF1ZXN0LmlzT2lkYyhhcmd1bWVudHNbMF0ucmVzcG9uc2VfdHlwZSkgPyBcImlkX3Rva2VuXCIgOiBcImNvZGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlID0gXCJpZF90b2tlblwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0ID0gcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQ7XG5cbiAgICAgICAgdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3IgPSByZWRpcmVjdE5hdmlnYXRvcjtcbiAgICAgICAgdGhpcy5fcG9wdXBOYXZpZ2F0b3IgPSBwb3B1cE5hdmlnYXRvcjtcbiAgICAgICAgdGhpcy5faWZyYW1lTmF2aWdhdG9yID0gaWZyYW1lTmF2aWdhdG9yO1xuXG4gICAgICAgIHRoaXMuX3VzZXJTdG9yZSA9IHVzZXJTdG9yZTtcbiAgICB9XG5cbiAgICBnZXQgcG9wdXBfcmVkaXJlY3RfdXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBfcmVkaXJlY3RfdXJpO1xuICAgIH1cbiAgICBnZXQgcG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpO1xuICAgIH1cbiAgICBnZXQgcG9wdXBXaW5kb3dGZWF0dXJlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwV2luZG93RmVhdHVyZXM7XG4gICAgfVxuICAgIGdldCBwb3B1cFdpbmRvd1RhcmdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwV2luZG93VGFyZ2V0O1xuICAgIH1cblxuICAgIGdldCBzaWxlbnRfcmVkaXJlY3RfdXJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lsZW50X3JlZGlyZWN0X3VyaTtcbiAgICB9XG4gICAgIGdldCBzaWxlbnRSZXF1ZXN0VGltZW91dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpbGVudFJlcXVlc3RUaW1lb3V0O1xuICAgIH1cbiAgICBnZXQgYXV0b21hdGljU2lsZW50UmVuZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvbWF0aWNTaWxlbnRSZW5ldztcbiAgICB9XG4gICAgZ2V0IHZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldztcbiAgICB9XG4gICAgZ2V0IGluY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldztcbiAgICB9XG4gICAgZ2V0IGFjY2Vzc1Rva2VuRXhwaXJpbmdOb3RpZmljYXRpb25UaW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWU7XG4gICAgfVxuXG4gICAgZ2V0IG1vbml0b3JTZXNzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9uaXRvclNlc3Npb247XG4gICAgfVxuICAgIGdldCBtb25pdG9yQW5vbnltb3VzU2Vzc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbml0b3JBbm9ueW1vdXNTZXNzaW9uO1xuICAgIH1cbiAgICBnZXQgY2hlY2tTZXNzaW9uSW50ZXJ2YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja1Nlc3Npb25JbnRlcnZhbDtcbiAgICB9XG4gICAgZ2V0IHN0b3BDaGVja1Nlc3Npb25PbkVycm9yKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9wQ2hlY2tTZXNzaW9uT25FcnJvcjtcbiAgICB9XG4gICAgZ2V0IHF1ZXJ5X3N0YXR1c19yZXNwb25zZV90eXBlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZTtcbiAgICB9XG4gICAgZ2V0IHJldm9rZUFjY2Vzc1Rva2VuT25TaWdub3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQ7XG4gICAgfVxuXG4gICAgZ2V0IHJlZGlyZWN0TmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkaXJlY3ROYXZpZ2F0b3I7XG4gICAgfVxuICAgIGdldCBwb3B1cE5hdmlnYXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVwTmF2aWdhdG9yO1xuICAgIH1cbiAgICBnZXQgaWZyYW1lTmF2aWdhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWZyYW1lTmF2aWdhdG9yO1xuICAgIH1cblxuICAgIGdldCB1c2VyU3RvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyU3RvcmU7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9Mb2cuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuXG5leHBvcnQgY2xhc3MgV2ViU3RvcmFnZVN0YXRlU3RvcmUge1xuICAgIGNvbnN0cnVjdG9yKHtwcmVmaXggPSBcIm9pZGMuXCIsIHN0b3JlID0gR2xvYmFsLmxvY2FsU3RvcmFnZX0gPSB7fSkge1xuICAgICAgICB0aGlzLl9zdG9yZSA9IHN0b3JlO1xuICAgICAgICB0aGlzLl9wcmVmaXggPSBwcmVmaXg7XG4gICAgfVxuXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiV2ViU3RvcmFnZVN0YXRlU3RvcmUuc2V0XCIsIGtleSk7XG5cbiAgICAgICAga2V5ID0gdGhpcy5fcHJlZml4ICsga2V5O1xuXG4gICAgICAgIHRoaXMuX3N0b3JlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgTG9nLmRlYnVnKFwiV2ViU3RvcmFnZVN0YXRlU3RvcmUuZ2V0XCIsIGtleSk7XG5cbiAgICAgICAga2V5ID0gdGhpcy5fcHJlZml4ICsga2V5O1xuXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5fc3RvcmUuZ2V0SXRlbShrZXkpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaXRlbSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGtleSkge1xuICAgICAgICBMb2cuZGVidWcoXCJXZWJTdG9yYWdlU3RhdGVTdG9yZS5yZW1vdmVcIiwga2V5KTtcblxuICAgICAgICBrZXkgPSB0aGlzLl9wcmVmaXggKyBrZXk7XG5cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9zdG9yZS5nZXRJdGVtKGtleSk7XG4gICAgICAgIHRoaXMuX3N0b3JlLnJlbW92ZUl0ZW0oa2V5KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGl0ZW0pO1xuICAgIH1cblxuICAgIGdldEFsbEtleXMoKSB7XG4gICAgICAgIExvZy5kZWJ1ZyhcIldlYlN0b3JhZ2VTdGF0ZVN0b3JlLmdldEFsbEtleXNcIik7XG5cbiAgICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fc3RvcmUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5fc3RvcmUua2V5KGluZGV4KTtcblxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuX3ByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5LnN1YnN0cih0aGlzLl9wcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IExvZyB9IGZyb20gJy4vTG9nLmpzJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgUkZDNDEyMiB2ZXJzaW9uIDQgZ3VpZCAoKVxuICovXG5cbmZ1bmN0aW9uIGdldENyeXB0bygpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvKSkge1xuICAgICAgICByZXR1cm4gd2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG87XG4gICAgfVxuICAgIC8vIHdvcmtlcnMsIE5vZGUgPj0gMTksIFJlYWN0IE5hdGl2ZSB3aXRoIGEgZ2V0UmFuZG9tVmFsdWVzIHBvbHlmaWxsXG4gICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzLmNyeXB0bykge1xuICAgICAgICByZXR1cm4gZ2xvYmFsVGhpcy5jcnlwdG87XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG52YXIgY3J5cHRvID0gZ2V0Q3J5cHRvKCk7XG5cbmZ1bmN0aW9uIF9jcnlwdG9VdWlkdjQoKSB7XG4gIHJldHVybiAoWzFlN10rLTFlMystNGUzKy04ZTMrLTFlMTEpLnJlcGxhY2UoL1swMThdL2csIGMgPT5cbiAgICAoYyBeIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgMTUgPj4gYyAvIDQpLnRvU3RyaW5nKDE2KVxuICApXG59XG5cbmZ1bmN0aW9uIF91dWlkdjQoKSB7XG4gICAgcmV0dXJuIChbMWU3XSstMWUzKy00ZTMrLThlMystMWUxMSkucmVwbGFjZSgvWzAxOF0vZywgYyA9PlxuICAgIChjIF4gTWF0aC5yYW5kb20oKSAqIDE2ID4+IGMgLyA0KS50b1N0cmluZygxNilcbiAgKVxufVxuXG52YXIgd2FybmVkID0gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbSgpIHtcbiAgdmFyIGhhc1JhbmRvbVZhbHVlcyA9ICEhY3J5cHRvICYmIHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIWhhc1JhbmRvbVZhbHVlcyAmJiAhd2FybmVkKSB7XG4gICAgd2FybmVkID0gdHJ1ZTtcbiAgICAvLyBzdGF0ZSwgbm9uY2UgYW5kIFBLQ0UgY29kZV92ZXJpZmllciBhcmUgYnVpbHQgZnJvbSB0aGlzIHZhbHVlXG4gICAgTG9nLndhcm4oXCJyYW5kb206IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgaXMgbm90IGF2YWlsYWJsZTsgZmFsbGluZyBiYWNrIHRvIE1hdGgucmFuZG9tLCB3aGljaCBpcyBub3QgY3J5cHRvZ3JhcGhpY2FsbHkgc2VjdXJlXCIpO1xuICB9XG4gIHZhciB1dWlkID0gaGFzUmFuZG9tVmFsdWVzID8gX2NyeXB0b1V1aWR2NCA6IF91dWlkdjQ7XG4gIHJldHVybiB1dWlkKCkucmVwbGFjZSgvLS9nLCAnJyk7XG59XG4iLCJjb25zdCBWZXJzaW9uID0gXCIxLjExLjVcIjsgZXhwb3J0IHtWZXJzaW9ufTsiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKmdsb2JhbHMgd2luZG93LCBnbG9iYWwsIHJlcXVpcmUqL1xuXG5cdC8qKlxuXHQgKiBDcnlwdG9KUyBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHR2YXIgQ3J5cHRvSlMgPSBDcnlwdG9KUyB8fCAoZnVuY3Rpb24gKE1hdGgsIHVuZGVmaW5lZCkge1xuXG5cdCAgICB2YXIgY3J5cHRvO1xuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gd2luZG93IChCcm93c2VyKVxuXHQgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSB3aW5kb3cuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGluIHdlYiB3b3JrZXIgKEJyb3dzZXIpXG5cdCAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gc2VsZi5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSB3b3JrZXJcblx0ICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBnbG9iYWxUaGlzLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIChleHBlcmltZW50YWwgSUUgMTEpIGNyeXB0byBmcm9tIHdpbmRvdyAoQnJvd3Nlcilcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5tc0NyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHdpbmRvdy5tc0NyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIGdsb2JhbCAoTm9kZUpTKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IGdsb2JhbC5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gaW1wb3J0IHZpYSByZXF1aXJlIChOb2RlSlMpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXHQgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgIH1cblxuXHQgICAgLypcblx0ICAgICAqIENyeXB0b2dyYXBoaWNhbGx5IHNlY3VyZSBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvclxuXHQgICAgICpcblx0ICAgICAqIEFzIE1hdGgucmFuZG9tKCkgaXMgY3J5cHRvZ3JhcGhpY2FsbHkgbm90IHNhZmUgdG8gdXNlXG5cdCAgICAgKi9cblx0ICAgIHZhciBjcnlwdG9TZWN1cmVSYW5kb21JbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKGNyeXB0bykge1xuXHQgICAgICAgICAgICAvLyBVc2UgZ2V0UmFuZG9tVmFsdWVzIG1ldGhvZCAoQnJvd3Nlcilcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSgxKSlbMF07XG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBVc2UgcmFuZG9tQnl0ZXMgbWV0aG9kIChOb2RlSlMpXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvLnJhbmRvbUJ5dGVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoNCkucmVhZEludDMyTEUoKTtcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHRocm93IG5ldyBFcnJvcignTmF0aXZlIGNyeXB0byBtb2R1bGUgY291bGQgbm90IGJlIHVzZWQgdG8gZ2V0IHNlY3VyZSByYW5kb20gbnVtYmVyLicpO1xuXHQgICAgfTtcblxuXHQgICAgLypcblx0ICAgICAqIExvY2FsIHBvbHlmaWxsIG9mIE9iamVjdC5jcmVhdGVcblxuXHQgICAgICovXG5cdCAgICB2YXIgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuXG5cdCAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcblx0ICAgICAgICAgICAgdmFyIHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvYmo7XG5cblx0ICAgICAgICAgICAgc3VidHlwZSA9IG5ldyBGKCk7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBudWxsO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIENyeXB0b0pTIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMaWJyYXJ5IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfbGliID0gQy5saWIgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBCYXNlIG9iamVjdCBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlID0gKGZ1bmN0aW9uICgpIHtcblxuXG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyBQcm9wZXJ0aWVzIHRvIGNvcHkgaW50byB0aGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZScsXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICAgICAgbWV0aG9kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBleHRlbmQ6IGZ1bmN0aW9uIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNwYXduXG5cdCAgICAgICAgICAgICAgICB2YXIgc3VidHlwZSA9IGNyZWF0ZSh0aGlzKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQXVnbWVudFxuXHQgICAgICAgICAgICAgICAgaWYgKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUubWl4SW4ob3ZlcnJpZGVzKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGRlZmF1bHQgaW5pdGlhbGl6ZXJcblx0ICAgICAgICAgICAgICAgIGlmICghc3VidHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5pdCcpIHx8IHRoaXMuaW5pdCA9PT0gc3VidHlwZS5pbml0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZXIncyBwcm90b3R5cGUgaXMgdGhlIHN1YnR5cGUgb2JqZWN0XG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQucHJvdG90eXBlID0gc3VidHlwZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVmZXJlbmNlIHN1cGVydHlwZVxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIgPSB0aGlzO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogRXh0ZW5kcyB0aGlzIG9iamVjdCBhbmQgcnVucyB0aGUgaW5pdCBtZXRob2QuXG5cdCAgICAgICAgICAgICAqIEFyZ3VtZW50cyB0byBjcmVhdGUoKSB3aWxsIGJlIHBhc3NlZCB0byBpbml0KCkuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBpbnN0YW5jZSA9IE15VHlwZS5jcmVhdGUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5leHRlbmQoKTtcblx0ICAgICAgICAgICAgICAgIGluc3RhbmNlLmluaXQuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG9iamVjdC5cblx0ICAgICAgICAgICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gYWRkIHNvbWUgbG9naWMgd2hlbiB5b3VyIG9iamVjdHMgYXJlIGNyZWF0ZWQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgICAgIC8vIC4uLlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDb3BpZXMgcHJvcGVydGllcyBpbnRvIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0byBtaXggaW4uXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBNeVR5cGUubWl4SW4oe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnXG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIG1peEluOiBmdW5jdGlvbiAocHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIElFIHdvbid0IGNvcHkgdG9TdHJpbmcgdXNpbmcgdGhlIGxvb3AgYWJvdmVcblx0ICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd0b1N0cmluZycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b1N0cmluZyA9IHByb3BlcnRpZXMudG9TdHJpbmc7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGluc3RhbmNlLmNsb25lKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10pO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddLCA2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgd29yZCBhcnJheSB0byBhIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlciAoT3B0aW9uYWwpIFRoZSBlbmNvZGluZyBzdHJhdGVneSB0byB1c2UuIERlZmF1bHQ6IENyeXB0b0pTLmVuYy5IZXhcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZ2lmaWVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkgKyAnJztcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZygpO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKGVuY29kZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChlbmNvZGVyIHx8IEhleCkuc3RyaW5naWZ5KHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25jYXRlbmF0ZXMgYSB3b3JkIGFycmF5IHRvIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheTEuY29uY2F0KHdvcmRBcnJheTIpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbmNhdDogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHRoaXNXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0V29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGlzU2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHRoaXMuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb25jYXRcblx0ICAgICAgICAgICAgaWYgKHRoaXNTaWdCeXRlcyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIGJ5dGUgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoYXRTaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXRCeXRlID0gKHRoYXRXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBpKSA+Pj4gMl0gfD0gdGhhdEJ5dGUgPDwgKDI0IC0gKCh0aGlzU2lnQnl0ZXMgKyBpKSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSB3b3JkIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGF0U2lnQnl0ZXM7IGogKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaikgPj4+IDJdID0gdGhhdFdvcmRzW2ogPj4+IDJdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgKz0gdGhhdFNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVtb3ZlcyBpbnNpZ25pZmljYW50IGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsYW1wOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wXG5cdCAgICAgICAgICAgIHdvcmRzW3NpZ0J5dGVzID4+PiAyXSAmPSAweGZmZmZmZmZmIDw8ICgzMiAtIChzaWdCeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIHdvcmRzLmxlbmd0aCA9IE1hdGguY2VpbChzaWdCeXRlcyAvIDQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gd29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgd29yZCBhcnJheSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbkJ5dGVzIFRoZSBudW1iZXIgb2YgcmFuZG9tIGJ5dGVzIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcmFuZG9tIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbSgxNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmFuZG9tOiBmdW5jdGlvbiAobkJ5dGVzKSB7XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbkJ5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goY3J5cHRvU2VjdXJlUmFuZG9tSW50KCkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbkJ5dGVzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBFbmNvZGVyIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBIZXggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGV4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLkhleC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGhleENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgJiAweDBmKS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhleENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleFN0ciBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChoZXhTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhleFN0ckxlbmd0aCA9IGhleFN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZXhTdHJMZW5ndGg7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gM10gfD0gcGFyc2VJbnQoaGV4U3RyLnN1YnN0cihpLCAyKSwgMTYpIDw8ICgyNCAtIChpICUgOCkgKiA0KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGhleFN0ckxlbmd0aCAvIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGF0aW4xIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgTGF0aW4xID0gQ19lbmMuTGF0aW4xID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGxhdGluMVN0cmluZyA9IENyeXB0b0pTLmVuYy5MYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGxhdGluMUNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiaXRlKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbGF0aW4xQ2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgTGF0aW4xIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF0aW4xU3RyIFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5MYXRpbjEucGFyc2UobGF0aW4xU3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGxhdGluMVN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xU3RyTGVuZ3RoID0gbGF0aW4xU3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGluMVN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSAobGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBsYXRpbjFTdHJMZW5ndGgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmOCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmOFN0cmluZyA9IENyeXB0b0pTLmVuYy5VdGY4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpKSk7XG5cdCAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIFVURi04IGRhdGEnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi04IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmOFN0ciBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHV0ZjhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmOFN0cikge1xuXHQgICAgICAgICAgICByZXR1cm4gTGF0aW4xLnBhcnNlKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh1dGY4U3RyKSkpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYnVmZmVyZWQgYmxvY2sgYWxnb3JpdGhtIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIFRoZSBwcm9wZXJ0eSBibG9ja1NpemUgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbiBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9taW5CdWZmZXJTaXplIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgc2hvdWxkIGJlIGtlcHQgdW5wcm9jZXNzZWQgaW4gdGhlIGJ1ZmZlci4gRGVmYXVsdDogMFxuXHQgICAgICovXG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgZGF0YSBidWZmZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFdvcmRBcnJheS5pbml0KCk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIG5ldyBkYXRhIHRvIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgYnVmZmVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGFwcGVuZC4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvIGEgV29yZEFycmF5IHVzaW5nIFVURi04LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEgPSBVdGY4LnBhcnNlKGRhdGEpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEuY29uY2F0KGRhdGEpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzICs9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFByb2Nlc3NlcyBhdmFpbGFibGUgZGF0YSBibG9ja3MuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIF9kb1Byb2Nlc3NCbG9jayhvZmZzZXQpLCB3aGljaCBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9GbHVzaCBXaGV0aGVyIGFsbCBibG9ja3MgYW5kIHBhcnRpYWwgYmxvY2tzIHNob3VsZCBiZSBwcm9jZXNzZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwcm9jZXNzZWQgZGF0YS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCk7XG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcyghISdmbHVzaCcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wcm9jZXNzOiBmdW5jdGlvbiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkV29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgcHJvY2Vzc2VkV29yZHMgPSBkYXRhV29yZHMuc3BsaWNlKDAsIG5Xb3Jkc1JlYWR5KTtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gbkJ5dGVzUmVhZHk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQocHJvY2Vzc2VkV29yZHMsIG5CeXRlc1JlYWR5KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2RhdGEgPSB0aGlzLl9kYXRhLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWluQnVmZmVyU2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgaGFzaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBoYXNoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDE2ICg1MTIgYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlciA9IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCgpLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaGVyID0gQ3J5cHRvSlMuYWxnby5TSEEyNTYuY3JlYXRlKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBoYXNoZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGRhdGEgYnVmZmVyXG5cdCAgICAgICAgICAgIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB0aGlzLl9kb1Jlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBoYXNoZXIgd2l0aCBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgVGhlIG1lc3NhZ2UgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7SGFzaGVyfSBUaGlzIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaGFzaFxuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBtZXNzYWdlIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9kb0ZpbmFsaXplKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNTEyLzMyLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIGEgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIFNIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGNmZykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBoYXNoZXIuaW5pdChjZmcpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZSBpbiB0aGlzIEhNQUMgaGVscGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEhtYWNTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSG1hY0hlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDX2FsZ28uSE1BQy5pbml0KGhhc2hlciwga2V5KS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbGdvcml0aG0gbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvID0ge307XG5cblx0ICAgIHJldHVybiBDO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2U2NCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2U2NCA9IENfZW5jLkJhc2U2NCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBCYXNlNjQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBiYXNlNjRTdHJpbmcgPSBDcnlwdG9KUy5lbmMuQmFzZTY0LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAgd29yZEFycmF5LmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgYmFzZTY0Q2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSArPSAzKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTEgPSAod29yZHNbaSA+Pj4gMl0gICAgICAgPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgICAgICAgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUyID0gKHdvcmRzWyhpICsgMSkgPj4+IDJdID4+PiAoMjQgLSAoKGkgKyAxKSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMyA9ICh3b3Jkc1soaSArIDIpID4+PiAyXSA+Pj4gKDI0IC0gKChpICsgMikgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0cmlwbGV0ID0gKGJ5dGUxIDw8IDE2KSB8IChieXRlMiA8PCA4KSB8IGJ5dGUzO1xuXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgKGogPCA0KSAmJiAoaSArIGogKiAwLjc1IDwgc2lnQnl0ZXMpOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBiYXNlNjRDaGFycy5wdXNoKG1hcC5jaGFyQXQoKHRyaXBsZXQgPj4+ICg2ICogKDMgLSBqKSkpICYgMHgzZikpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdDaGFyID0gbWFwLmNoYXJBdCg2NCk7XG5cdCAgICAgICAgICAgIGlmIChwYWRkaW5nQ2hhcikge1xuXHQgICAgICAgICAgICAgICAgd2hpbGUgKGJhc2U2NENoYXJzLmxlbmd0aCAlIDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBiYXNlNjRDaGFycy5wdXNoKHBhZGRpbmdDaGFyKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBiYXNlNjRDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBCYXNlNjQgc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlNjRTdHIgVGhlIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkJhc2U2NC5wYXJzZShiYXNlNjRTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoYmFzZTY0U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgYmFzZTY0U3RyTGVuZ3RoID0gYmFzZTY0U3RyLmxlbmd0aDtcblx0ICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblx0ICAgICAgICAgICAgdmFyIHJldmVyc2VNYXAgPSB0aGlzLl9yZXZlcnNlTWFwO1xuXG5cdCAgICAgICAgICAgIGlmICghcmV2ZXJzZU1hcCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldmVyc2VNYXAgPSB0aGlzLl9yZXZlcnNlTWFwID0gW107XG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtYXAubGVuZ3RoOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZU1hcFttYXAuY2hhckNvZGVBdChqKV0gPSBqO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIElnbm9yZSBwYWRkaW5nXG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nQ2hhciA9IG1hcC5jaGFyQXQoNjQpO1xuXHQgICAgICAgICAgICBpZiAocGFkZGluZ0NoYXIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBwYWRkaW5nSW5kZXggPSBiYXNlNjRTdHIuaW5kZXhPZihwYWRkaW5nQ2hhcik7XG5cdCAgICAgICAgICAgICAgICBpZiAocGFkZGluZ0luZGV4ICE9PSAtMSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NFN0ckxlbmd0aCA9IHBhZGRpbmdJbmRleDtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgcmV0dXJuIHBhcnNlTG9vcChiYXNlNjRTdHIsIGJhc2U2NFN0ckxlbmd0aCwgcmV2ZXJzZU1hcCk7XG5cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21hcDogJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89J1xuXHQgICAgfTtcblxuXHQgICAgZnVuY3Rpb24gcGFyc2VMb29wKGJhc2U2NFN0ciwgYmFzZTY0U3RyTGVuZ3RoLCByZXZlcnNlTWFwKSB7XG5cdCAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICB2YXIgbkJ5dGVzID0gMDtcblx0ICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXNlNjRTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgaWYgKGkgJSA0KSB7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHMxID0gcmV2ZXJzZU1hcFtiYXNlNjRTdHIuY2hhckNvZGVBdChpIC0gMSldIDw8ICgoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHMyID0gcmV2ZXJzZU1hcFtiYXNlNjRTdHIuY2hhckNvZGVBdChpKV0gPj4+ICg2IC0gKGkgJSA0KSAqIDIpO1xuXHQgICAgICAgICAgICAgIHZhciBiaXRzQ29tYmluZWQgPSBiaXRzMSB8IGJpdHMyO1xuXHQgICAgICAgICAgICAgIHdvcmRzW25CeXRlcyA+Pj4gMl0gfD0gYml0c0NvbWJpbmVkIDw8ICgyNCAtIChuQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgIG5CeXRlcysrO1xuXHQgICAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiBXb3JkQXJyYXkuY3JlYXRlKHdvcmRzLCBuQnl0ZXMpO1xuXHQgICAgfVxuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLmVuYy5CYXNlNjQ7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdHJldHVybiBDcnlwdG9KUy5lbmMuSGV4O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBJbml0aWFsaXphdGlvbiBhbmQgcm91bmQgY29uc3RhbnRzIHRhYmxlc1xuXHQgICAgdmFyIEggPSBbXTtcblx0ICAgIHZhciBLID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgY29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIGlzUHJpbWUobikge1xuXHQgICAgICAgICAgICB2YXIgc3FydE4gPSBNYXRoLnNxcnQobik7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGZhY3RvciA9IDI7IGZhY3RvciA8PSBzcXJ0TjsgZmFjdG9yKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmICghKG4gJSBmYWN0b3IpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZnVuY3Rpb24gZ2V0RnJhY3Rpb25hbEJpdHMobikge1xuXHQgICAgICAgICAgICByZXR1cm4gKChuIC0gKG4gfCAwKSkgKiAweDEwMDAwMDAwMCkgfCAwO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBuID0gMjtcblx0ICAgICAgICB2YXIgblByaW1lID0gMDtcblx0ICAgICAgICB3aGlsZSAoblByaW1lIDwgNjQpIHtcblx0ICAgICAgICAgICAgaWYgKGlzUHJpbWUobikpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChuUHJpbWUgPCA4KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgSFtuUHJpbWVdID0gZ2V0RnJhY3Rpb25hbEJpdHMoTWF0aC5wb3cobiwgMSAvIDIpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIEtbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAzKSk7XG5cblx0ICAgICAgICAgICAgICAgIG5QcmltZSsrO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgbisrO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdFxuXHQgICAgdmFyIFcgPSBbXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMjU2IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMjU2ID0gQ19hbGdvLlNIQTI1NiA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoSC5zbGljZSgwKSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgZSA9IEhbNF07XG5cdCAgICAgICAgICAgIHZhciBmID0gSFs1XTtcblx0ICAgICAgICAgICAgdmFyIGcgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgaCA9IEhbN107XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IE1bb2Zmc2V0ICsgaV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCA9IFdbaSAtIDE1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwICA9ICgoZ2FtbWEweCA8PCAyNSkgfCAoZ2FtbWEweCA+Pj4gNykpICBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMHggPDwgMTQpIHwgKGdhbW1hMHggPj4+IDE4KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnYW1tYTB4ID4+PiAzKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4ID0gV1tpIC0gMl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMSAgPSAoKGdhbW1hMXggPDwgMTUpIHwgKGdhbW1hMXggPj4+IDE3KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTF4IDw8IDEzKSB8IChnYW1tYTF4ID4+PiAxOSkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWExeCA+Pj4gMTApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2ggID0gKGUgJiBmKSBeICh+ZSAmIGcpO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1haiA9IChhICYgYikgXiAoYSAmIGMpIF4gKGIgJiBjKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMCA9ICgoYSA8PCAzMCkgfCAoYSA+Pj4gMikpIF4gKChhIDw8IDE5KSB8IChhID4+PiAxMykpIF4gKChhIDw8IDEwKSB8IChhID4+PiAyMikpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMSA9ICgoZSA8PCAyNikgfCAoZSA+Pj4gNikpIF4gKChlIDw8IDIxKSB8IChlID4+PiAxMSkpIF4gKChlIDw8IDcpICB8IChlID4+PiAyNSkpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MiA9IHNpZ21hMCArIG1hajtcblxuXHQgICAgICAgICAgICAgICAgaCA9IGc7XG5cdCAgICAgICAgICAgICAgICBnID0gZjtcblx0ICAgICAgICAgICAgICAgIGYgPSBlO1xuXHQgICAgICAgICAgICAgICAgZSA9IChkICsgdDEpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGQgPSBjO1xuXHQgICAgICAgICAgICAgICAgYyA9IGI7XG5cdCAgICAgICAgICAgICAgICBiID0gYTtcblx0ICAgICAgICAgICAgICAgIGEgPSAodDEgKyB0MikgfCAwO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgICAgICBIWzRdID0gKEhbNF0gKyBlKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNV0gPSAoSFs1XSArIGYpIHwgMDtcblx0ICAgICAgICAgICAgSFs2XSA9IChIWzZdICsgZykgfCAwO1xuXHQgICAgICAgICAgICBIWzddID0gKEhbN10gKyBoKSB8IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTVdID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1NignbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjU2KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBMjU2KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEyNTYobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTI1Nik7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTI1NjtcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi94NjQtY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhNTEyXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3g2NC1jb3JlXCIsIFwiLi9zaGE1MTJcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ194NjQgPSBDLng2NDtcblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZDtcblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXHQgICAgdmFyIFNIQTUxMiA9IENfYWxnby5TSEE1MTI7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTM4NCBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTM4NCA9IENfYWxnby5TSEEzODQgPSBTSEE1MTIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFg2NFdvcmRBcnJheS5pbml0KFtcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHhjYmJiOWQ1ZCwgMHhjMTA1OWVkOCksIG5ldyBYNjRXb3JkLmluaXQoMHg2MjlhMjkyYSwgMHgzNjdjZDUwNyksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4OTE1OTAxNWEsIDB4MzA3MGRkMTcpLCBuZXcgWDY0V29yZC5pbml0KDB4MTUyZmVjZDgsIDB4ZjcwZTU5MzkpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDY3MzMyNjY3LCAweGZmYzAwYjMxKSwgbmV3IFg2NFdvcmQuaW5pdCgweDhlYjQ0YTg3LCAweDY4NTgxNTExKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHhkYjBjMmUwZCwgMHg2NGY5OGZhNyksIG5ldyBYNjRXb3JkLmluaXQoMHg0N2I1NDgxZCwgMHhiZWZhNGZhNClcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gU0hBNTEyLl9kb0ZpbmFsaXplLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgaGFzaC5zaWdCeXRlcyAtPSAxNjtcblxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTM4NCgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMzg0KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBMzg0ID0gU0hBNTEyLl9jcmVhdGVIZWxwZXIoU0hBMzg0KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEzODQobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBMzg0ID0gU0hBNTEyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTM4NCk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBMzg0O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3g2NC1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3g2NC1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQ7XG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQ7XG5cdCAgICB2YXIgWDY0V29yZEFycmF5ID0gQ194NjQuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgZnVuY3Rpb24gWDY0V29yZF9jcmVhdGUoKSB7XG5cdCAgICAgICAgcmV0dXJuIFg2NFdvcmQuY3JlYXRlLmFwcGx5KFg2NFdvcmQsIGFyZ3VtZW50cyk7XG5cdCAgICB9XG5cblx0ICAgIC8vIENvbnN0YW50c1xuXHQgICAgdmFyIEsgPSBbXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg0MjhhMmY5OCwgMHhkNzI4YWUyMiksIFg2NFdvcmRfY3JlYXRlKDB4NzEzNzQ0OTEsIDB4MjNlZjY1Y2QpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YjVjMGZiY2YsIDB4ZWM0ZDNiMmYpLCBYNjRXb3JkX2NyZWF0ZSgweGU5YjVkYmE1LCAweDgxODlkYmJjKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDM5NTZjMjViLCAweGYzNDhiNTM4KSwgWDY0V29yZF9jcmVhdGUoMHg1OWYxMTFmMSwgMHhiNjA1ZDAxOSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5MjNmODJhNCwgMHhhZjE5NGY5YiksIFg2NFdvcmRfY3JlYXRlKDB4YWIxYzVlZDUsIDB4ZGE2ZDgxMTgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZDgwN2FhOTgsIDB4YTMwMzAyNDIpLCBYNjRXb3JkX2NyZWF0ZSgweDEyODM1YjAxLCAweDQ1NzA2ZmJlKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI0MzE4NWJlLCAweDRlZTRiMjhjKSwgWDY0V29yZF9jcmVhdGUoMHg1NTBjN2RjMywgMHhkNWZmYjRlMiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg3MmJlNWQ3NCwgMHhmMjdiODk2ZiksIFg2NFdvcmRfY3JlYXRlKDB4ODBkZWIxZmUsIDB4M2IxNjk2YjEpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4OWJkYzA2YTcsIDB4MjVjNzEyMzUpLCBYNjRXb3JkX2NyZWF0ZSgweGMxOWJmMTc0LCAweGNmNjkyNjk0KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGU0OWI2OWMxLCAweDllZjE0YWQyKSwgWDY0V29yZF9jcmVhdGUoMHhlZmJlNDc4NiwgMHgzODRmMjVlMyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgwZmMxOWRjNiwgMHg4YjhjZDViNSksIFg2NFdvcmRfY3JlYXRlKDB4MjQwY2ExY2MsIDB4NzdhYzljNjUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MmRlOTJjNmYsIDB4NTkyYjAyNzUpLCBYNjRXb3JkX2NyZWF0ZSgweDRhNzQ4NGFhLCAweDZlYTZlNDgzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDVjYjBhOWRjLCAweGJkNDFmYmQ0KSwgWDY0V29yZF9jcmVhdGUoMHg3NmY5ODhkYSwgMHg4MzExNTNiNSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5ODNlNTE1MiwgMHhlZTY2ZGZhYiksIFg2NFdvcmRfY3JlYXRlKDB4YTgzMWM2NmQsIDB4MmRiNDMyMTApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YjAwMzI3YzgsIDB4OThmYjIxM2YpLCBYNjRXb3JkX2NyZWF0ZSgweGJmNTk3ZmM3LCAweGJlZWYwZWU0KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGM2ZTAwYmYzLCAweDNkYTg4ZmMyKSwgWDY0V29yZF9jcmVhdGUoMHhkNWE3OTE0NywgMHg5MzBhYTcyNSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgwNmNhNjM1MSwgMHhlMDAzODI2ZiksIFg2NFdvcmRfY3JlYXRlKDB4MTQyOTI5NjcsIDB4MGEwZTZlNzApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MjdiNzBhODUsIDB4NDZkMjJmZmMpLCBYNjRXb3JkX2NyZWF0ZSgweDJlMWIyMTM4LCAweDVjMjZjOTI2KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDRkMmM2ZGZjLCAweDVhYzQyYWVkKSwgWDY0V29yZF9jcmVhdGUoMHg1MzM4MGQxMywgMHg5ZDk1YjNkZiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg2NTBhNzM1NCwgMHg4YmFmNjNkZSksIFg2NFdvcmRfY3JlYXRlKDB4NzY2YTBhYmIsIDB4M2M3N2IyYTgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ODFjMmM5MmUsIDB4NDdlZGFlZTYpLCBYNjRXb3JkX2NyZWF0ZSgweDkyNzIyYzg1LCAweDE0ODIzNTNiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGEyYmZlOGExLCAweDRjZjEwMzY0KSwgWDY0V29yZF9jcmVhdGUoMHhhODFhNjY0YiwgMHhiYzQyMzAwMSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhjMjRiOGI3MCwgMHhkMGY4OTc5MSksIFg2NFdvcmRfY3JlYXRlKDB4Yzc2YzUxYTMsIDB4MDY1NGJlMzApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZDE5MmU4MTksIDB4ZDZlZjUyMTgpLCBYNjRXb3JkX2NyZWF0ZSgweGQ2OTkwNjI0LCAweDU1NjVhOTEwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGY0MGUzNTg1LCAweDU3NzEyMDJhKSwgWDY0V29yZF9jcmVhdGUoMHgxMDZhYTA3MCwgMHgzMmJiZDFiOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgxOWE0YzExNiwgMHhiOGQyZDBjOCksIFg2NFdvcmRfY3JlYXRlKDB4MWUzNzZjMDgsIDB4NTE0MWFiNTMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Mjc0ODc3NGMsIDB4ZGY4ZWViOTkpLCBYNjRXb3JkX2NyZWF0ZSgweDM0YjBiY2I1LCAweGUxOWI0OGE4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDM5MWMwY2IzLCAweGM1Yzk1YTYzKSwgWDY0V29yZF9jcmVhdGUoMHg0ZWQ4YWE0YSwgMHhlMzQxOGFjYiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg1YjljY2E0ZiwgMHg3NzYzZTM3MyksIFg2NFdvcmRfY3JlYXRlKDB4NjgyZTZmZjMsIDB4ZDZiMmI4YTMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NzQ4ZjgyZWUsIDB4NWRlZmIyZmMpLCBYNjRXb3JkX2NyZWF0ZSgweDc4YTU2MzZmLCAweDQzMTcyZjYwKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDg0Yzg3ODE0LCAweGExZjBhYjcyKSwgWDY0V29yZF9jcmVhdGUoMHg4Y2M3MDIwOCwgMHgxYTY0MzllYyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5MGJlZmZmYSwgMHgyMzYzMWUyOCksIFg2NFdvcmRfY3JlYXRlKDB4YTQ1MDZjZWIsIDB4ZGU4MmJkZTkpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YmVmOWEzZjcsIDB4YjJjNjc5MTUpLCBYNjRXb3JkX2NyZWF0ZSgweGM2NzE3OGYyLCAweGUzNzI1MzJiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGNhMjczZWNlLCAweGVhMjY2MTljKSwgWDY0V29yZF9jcmVhdGUoMHhkMTg2YjhjNywgMHgyMWMwYzIwNyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhlYWRhN2RkNiwgMHhjZGUwZWIxZSksIFg2NFdvcmRfY3JlYXRlKDB4ZjU3ZDRmN2YsIDB4ZWU2ZWQxNzgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MDZmMDY3YWEsIDB4NzIxNzZmYmEpLCBYNjRXb3JkX2NyZWF0ZSgweDBhNjM3ZGM1LCAweGEyYzg5OGE2KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDExM2Y5ODA0LCAweGJlZjkwZGFlKSwgWDY0V29yZF9jcmVhdGUoMHgxYjcxMGIzNSwgMHgxMzFjNDcxYiksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyOGRiNzdmNSwgMHgyMzA0N2Q4NCksIFg2NFdvcmRfY3JlYXRlKDB4MzJjYWFiN2IsIDB4NDBjNzI0OTMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4M2M5ZWJlMGEsIDB4MTVjOWJlYmMpLCBYNjRXb3JkX2NyZWF0ZSgweDQzMWQ2N2M0LCAweDljMTAwZDRjKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDRjYzVkNGJlLCAweGNiM2U0MmI2KSwgWDY0V29yZF9jcmVhdGUoMHg1OTdmMjk5YywgMHhmYzY1N2UyYSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg1ZmNiNmZhYiwgMHgzYWQ2ZmFlYyksIFg2NFdvcmRfY3JlYXRlKDB4NmM0NDE5OGMsIDB4NGE0NzU4MTcpXG5cdCAgICBdO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3RzXG5cdCAgICB2YXIgVyA9IFtdO1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDgwOyBpKyspIHtcblx0ICAgICAgICAgICAgV1tpXSA9IFg2NFdvcmRfY3JlYXRlKCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtNTEyIGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBNTEyID0gQ19hbGdvLlNIQTUxMiA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgWDY0V29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDZhMDllNjY3LCAweGYzYmNjOTA4KSwgbmV3IFg2NFdvcmQuaW5pdCgweGJiNjdhZTg1LCAweDg0Y2FhNzNiKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHgzYzZlZjM3MiwgMHhmZTk0ZjgyYiksIG5ldyBYNjRXb3JkLmluaXQoMHhhNTRmZjUzYSwgMHg1ZjFkMzZmMSksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NTEwZTUyN2YsIDB4YWRlNjgyZDEpLCBuZXcgWDY0V29yZC5pbml0KDB4OWIwNTY4OGMsIDB4MmIzZTZjMWYpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDFmODNkOWFiLCAweGZiNDFiZDZiKSwgbmV3IFg2NFdvcmQuaW5pdCgweDViZTBjZDE5LCAweDEzN2UyMTc5KVxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIEgwID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIEgxID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIEgyID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIEgzID0gSFszXTtcblx0ICAgICAgICAgICAgdmFyIEg0ID0gSFs0XTtcblx0ICAgICAgICAgICAgdmFyIEg1ID0gSFs1XTtcblx0ICAgICAgICAgICAgdmFyIEg2ID0gSFs2XTtcblx0ICAgICAgICAgICAgdmFyIEg3ID0gSFs3XTtcblxuXHQgICAgICAgICAgICB2YXIgSDBoID0gSDAuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgwbCA9IEgwLmxvdztcblx0ICAgICAgICAgICAgdmFyIEgxaCA9IEgxLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIMWwgPSBIMS5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIMmggPSBIMi5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDJsID0gSDIubG93O1xuXHQgICAgICAgICAgICB2YXIgSDNoID0gSDMuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgzbCA9IEgzLmxvdztcblx0ICAgICAgICAgICAgdmFyIEg0aCA9IEg0LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBINGwgPSBINC5sb3c7XG5cdCAgICAgICAgICAgIHZhciBINWggPSBINS5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDVsID0gSDUubG93O1xuXHQgICAgICAgICAgICB2YXIgSDZoID0gSDYuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg2bCA9IEg2Lmxvdztcblx0ICAgICAgICAgICAgdmFyIEg3aCA9IEg3LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIN2wgPSBINy5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGFoID0gSDBoO1xuXHQgICAgICAgICAgICB2YXIgYWwgPSBIMGw7XG5cdCAgICAgICAgICAgIHZhciBiaCA9IEgxaDtcblx0ICAgICAgICAgICAgdmFyIGJsID0gSDFsO1xuXHQgICAgICAgICAgICB2YXIgY2ggPSBIMmg7XG5cdCAgICAgICAgICAgIHZhciBjbCA9IEgybDtcblx0ICAgICAgICAgICAgdmFyIGRoID0gSDNoO1xuXHQgICAgICAgICAgICB2YXIgZGwgPSBIM2w7XG5cdCAgICAgICAgICAgIHZhciBlaCA9IEg0aDtcblx0ICAgICAgICAgICAgdmFyIGVsID0gSDRsO1xuXHQgICAgICAgICAgICB2YXIgZmggPSBINWg7XG5cdCAgICAgICAgICAgIHZhciBmbCA9IEg1bDtcblx0ICAgICAgICAgICAgdmFyIGdoID0gSDZoO1xuXHQgICAgICAgICAgICB2YXIgZ2wgPSBINmw7XG5cdCAgICAgICAgICAgIHZhciBoaCA9IEg3aDtcblx0ICAgICAgICAgICAgdmFyIGhsID0gSDdsO1xuXG5cdCAgICAgICAgICAgIC8vIFJvdW5kc1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDgwOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBXaWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgV2loO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICAgICAgdmFyIFdpID0gV1tpXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gRXh0ZW5kIG1lc3NhZ2Vcblx0ICAgICAgICAgICAgICAgIGlmIChpIDwgMTYpIHtcblx0ICAgICAgICAgICAgICAgICAgICBXaWggPSBXaS5oaWdoID0gTVtvZmZzZXQgKyBpICogMl0gICAgIHwgMDtcblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBXaS5sb3cgID0gTVtvZmZzZXQgKyBpICogMiArIDFdIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gR2FtbWEwXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHggID0gV1tpIC0gMTVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4aCA9IGdhbW1hMHguaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweGwgPSBnYW1tYTB4Lmxvdztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwaCAgPSAoKGdhbW1hMHhoID4+PiAxKSB8IChnYW1tYTB4bCA8PCAzMSkpIF4gKChnYW1tYTB4aCA+Pj4gOCkgfCAoZ2FtbWEweGwgPDwgMjQpKSBeIChnYW1tYTB4aCA+Pj4gNyk7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMGwgID0gKChnYW1tYTB4bCA+Pj4gMSkgfCAoZ2FtbWEweGggPDwgMzEpKSBeICgoZ2FtbWEweGwgPj4+IDgpIHwgKGdhbW1hMHhoIDw8IDI0KSkgXiAoKGdhbW1hMHhsID4+PiA3KSB8IChnYW1tYTB4aCA8PCAyNSkpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gR2FtbWExXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXggID0gV1tpIC0gMl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXhoID0gZ2FtbWExeC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4bCA9IGdhbW1hMXgubG93O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTFoICA9ICgoZ2FtbWExeGggPj4+IDE5KSB8IChnYW1tYTF4bCA8PCAxMykpIF4gKChnYW1tYTF4aCA8PCAzKSB8IChnYW1tYTF4bCA+Pj4gMjkpKSBeIChnYW1tYTF4aCA+Pj4gNik7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMWwgID0gKChnYW1tYTF4bCA+Pj4gMTkpIHwgKGdhbW1hMXhoIDw8IDEzKSkgXiAoKGdhbW1hMXhsIDw8IDMpIHwgKGdhbW1hMXhoID4+PiAyOSkpIF4gKChnYW1tYTF4bCA+Pj4gNikgfCAoZ2FtbWExeGggPDwgMjYpKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XVxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTcgID0gV1tpIC0gN107XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpN2ggPSBXaTcuaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2k3bCA9IFdpNy5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2kxNiAgPSBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpMTZoID0gV2kxNi5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTE2bCA9IFdpMTYubG93O1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV2lsID0gZ2FtbWEwbCArIFdpN2w7XG5cdCAgICAgICAgICAgICAgICAgICAgV2loID0gZ2FtbWEwaCArIFdpN2ggKyAoKFdpbCA+Pj4gMCkgPCAoZ2FtbWEwbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICAgICAgV2lsID0gV2lsICsgZ2FtbWExbDtcblx0ICAgICAgICAgICAgICAgICAgICBXaWggPSBXaWggKyBnYW1tYTFoICsgKChXaWwgPj4+IDApIDwgKGdhbW1hMWwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpbCA9IFdpbCArIFdpMTZsO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpaCArIFdpMTZoICsgKChXaWwgPj4+IDApIDwgKFdpMTZsID4+PiAwKSA/IDEgOiAwKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIFdpLmhpZ2ggPSBXaWg7XG5cdCAgICAgICAgICAgICAgICAgICAgV2kubG93ICA9IFdpbDtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIGNoaCAgPSAoZWggJiBmaCkgXiAofmVoICYgZ2gpO1xuXHQgICAgICAgICAgICAgICAgdmFyIGNobCAgPSAoZWwgJiBmbCkgXiAofmVsICYgZ2wpO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1hamggPSAoYWggJiBiaCkgXiAoYWggJiBjaCkgXiAoYmggJiBjaCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqbCA9IChhbCAmIGJsKSBeIChhbCAmIGNsKSBeIChibCAmIGNsKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMGggPSAoKGFoID4+PiAyOCkgfCAoYWwgPDwgNCkpICBeICgoYWggPDwgMzApICB8IChhbCA+Pj4gMikpIF4gKChhaCA8PCAyNSkgfCAoYWwgPj4+IDcpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTBsID0gKChhbCA+Pj4gMjgpIHwgKGFoIDw8IDQpKSAgXiAoKGFsIDw8IDMwKSAgfCAoYWggPj4+IDIpKSBeICgoYWwgPDwgMjUpIHwgKGFoID4+PiA3KSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExaCA9ICgoZWggPj4+IDE0KSB8IChlbCA8PCAxOCkpIF4gKChlaCA+Pj4gMTgpIHwgKGVsIDw8IDE0KSkgXiAoKGVoIDw8IDIzKSB8IChlbCA+Pj4gOSkpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMWwgPSAoKGVsID4+PiAxNCkgfCAoZWggPDwgMTgpKSBeICgoZWwgPj4+IDE4KSB8IChlaCA8PCAxNCkpIF4gKChlbCA8PCAyMykgfCAoZWggPj4+IDkpKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXVxuXHQgICAgICAgICAgICAgICAgdmFyIEtpICA9IEtbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgS2loID0gS2kuaGlnaDtcblx0ICAgICAgICAgICAgICAgIHZhciBLaWwgPSBLaS5sb3c7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSBobCArIHNpZ21hMWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gaGggKyBzaWdtYTFoICsgKCh0MWwgPj4+IDApIDwgKGhsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSB0MWwgKyBjaGw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gdDFoICsgY2hoICsgKCh0MWwgPj4+IDApIDwgKGNobCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gdDFsICsgS2lsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IHQxaCArIEtpaCArICgodDFsID4+PiAwKSA8IChLaWwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IHQxbCArIFdpbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSB0MWggKyBXaWggKyAoKHQxbCA+Pj4gMCkgPCAoV2lsID4+PiAwKSA/IDEgOiAwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gdDIgPSBzaWdtYTAgKyBtYWpcblx0ICAgICAgICAgICAgICAgIHZhciB0MmwgPSBzaWdtYTBsICsgbWFqbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MmggPSBzaWdtYTBoICsgbWFqaCArICgodDJsID4+PiAwKSA8IChzaWdtYTBsID4+PiAwKSA/IDEgOiAwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgICAgICBoaCA9IGdoO1xuXHQgICAgICAgICAgICAgICAgaGwgPSBnbDtcblx0ICAgICAgICAgICAgICAgIGdoID0gZmg7XG5cdCAgICAgICAgICAgICAgICBnbCA9IGZsO1xuXHQgICAgICAgICAgICAgICAgZmggPSBlaDtcblx0ICAgICAgICAgICAgICAgIGZsID0gZWw7XG5cdCAgICAgICAgICAgICAgICBlbCA9IChkbCArIHQxbCkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZWggPSAoZGggKyB0MWggKyAoKGVsID4+PiAwKSA8IChkbCA+Pj4gMCkgPyAxIDogMCkpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGRoID0gY2g7XG5cdCAgICAgICAgICAgICAgICBkbCA9IGNsO1xuXHQgICAgICAgICAgICAgICAgY2ggPSBiaDtcblx0ICAgICAgICAgICAgICAgIGNsID0gYmw7XG5cdCAgICAgICAgICAgICAgICBiaCA9IGFoO1xuXHQgICAgICAgICAgICAgICAgYmwgPSBhbDtcblx0ICAgICAgICAgICAgICAgIGFsID0gKHQxbCArIHQybCkgfCAwO1xuXHQgICAgICAgICAgICAgICAgYWggPSAodDFoICsgdDJoICsgKChhbCA+Pj4gMCkgPCAodDFsID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSDBsID0gSDAubG93ICA9IChIMGwgKyBhbCk7XG5cdCAgICAgICAgICAgIEgwLmhpZ2ggPSAoSDBoICsgYWggKyAoKEgwbCA+Pj4gMCkgPCAoYWwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDFsID0gSDEubG93ICA9IChIMWwgKyBibCk7XG5cdCAgICAgICAgICAgIEgxLmhpZ2ggPSAoSDFoICsgYmggKyAoKEgxbCA+Pj4gMCkgPCAoYmwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDJsID0gSDIubG93ICA9IChIMmwgKyBjbCk7XG5cdCAgICAgICAgICAgIEgyLmhpZ2ggPSAoSDJoICsgY2ggKyAoKEgybCA+Pj4gMCkgPCAoY2wgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDNsID0gSDMubG93ICA9IChIM2wgKyBkbCk7XG5cdCAgICAgICAgICAgIEgzLmhpZ2ggPSAoSDNoICsgZGggKyAoKEgzbCA+Pj4gMCkgPCAoZGwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDRsID0gSDQubG93ICA9IChINGwgKyBlbCk7XG5cdCAgICAgICAgICAgIEg0LmhpZ2ggPSAoSDRoICsgZWggKyAoKEg0bCA+Pj4gMCkgPCAoZWwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDVsID0gSDUubG93ICA9IChINWwgKyBmbCk7XG5cdCAgICAgICAgICAgIEg1LmhpZ2ggPSAoSDVoICsgZmggKyAoKEg1bCA+Pj4gMCkgPCAoZmwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDZsID0gSDYubG93ICA9IChINmwgKyBnbCk7XG5cdCAgICAgICAgICAgIEg2LmhpZ2ggPSAoSDZoICsgZ2ggKyAoKEg2bCA+Pj4gMCkgPCAoZ2wgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICAgICAgSDdsID0gSDcubG93ICA9IChIN2wgKyBobCk7XG5cdCAgICAgICAgICAgIEg3LmhpZ2ggPSAoSDdoICsgaGggKyAoKEg3bCA+Pj4gMCkgPCAoaGwgPj4+IDApID8gMSA6IDApKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgMTI4KSA+Pj4gMTApIDw8IDUpICsgMzBdID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgMTI4KSA+Pj4gMTApIDw8IDUpICsgMzFdID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IGhhc2ggdG8gMzItYml0IHdvcmQgYXJyYXkgYmVmb3JlIHJldHVybmluZ1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2hhc2gudG9YMzIoKTtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiAxMDI0LzMyXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTUxMignbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBNTEyKHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBNTEyID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBNTEyKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEE1MTIobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBNTEyID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTUxMik7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBNTEyO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKHVuZGVmaW5lZCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgWDMyV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXG5cdCAgICAvKipcblx0ICAgICAqIHg2NCBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX3g2NCA9IEMueDY0ID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQSA2NC1iaXQgd29yZC5cblx0ICAgICAqL1xuXHQgICAgdmFyIFg2NFdvcmQgPSBDX3g2NC5Xb3JkID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCA2NC1iaXQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoaWdoIFRoZSBoaWdoIDMyIGJpdHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGxvdyBUaGUgbG93IDMyIGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4NjRXb3JkID0gQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MDAwMTAyMDMsIDB4MDQwNTA2MDcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChoaWdoLCBsb3cpIHtcblx0ICAgICAgICAgICAgdGhpcy5oaWdoID0gaGlnaDtcblx0ICAgICAgICAgICAgdGhpcy5sb3cgPSBsb3c7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBOT1RzIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBuZWdhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG5lZ2F0ZWQgPSB4NjRXb3JkLm5vdCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIG5vdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IH50aGlzLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB+dGhpcy5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgQU5EcyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIEFORCB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBBTkRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBhbmRlZCA9IHg2NFdvcmQuYW5kKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBhbmQ6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoICYgd29yZC5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgJiB3b3JkLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBPUnMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBPUiB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBPUmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG9yZWQgPSB4NjRXb3JkLm9yKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBvcjogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggfCB3b3JkLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyB8IHdvcmQubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIFhPUnMgdGhpcyB3b3JkIHdpdGggdGhlIHBhc3NlZCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtYNjRXb3JkfSB3b3JkIFRoZSB4NjQtV29yZCB0byBYT1Igd2l0aCB0aGlzIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgWE9SaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgeG9yZWQgPSB4NjRXb3JkLnhvcihhbm90aGVyWDY0V29yZCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8geG9yOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCBeIHdvcmQuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IF4gd29yZC5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFNoaWZ0cyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSBsZWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHNoaWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHNoaWZ0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc2hpZnRlZCA9IHg2NFdvcmQuc2hpZnRMKDI1KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBzaGlmdEw6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIGlmIChuIDwgMzIpIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gKHRoaXMuaGlnaCA8PCBuKSB8ICh0aGlzLmxvdyA+Pj4gKDMyIC0gbikpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IDw8IG47XG5cdCAgICAgICAgICAgIC8vIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMubG93IDw8IChuIC0gMzIpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9IDA7XG5cdCAgICAgICAgICAgIC8vIH1cblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogU2hpZnRzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIHJpZ2h0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHNoaWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHNoaWZ0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc2hpZnRlZCA9IHg2NFdvcmQuc2hpZnRSKDcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHNoaWZ0UjogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gaWYgKG4gPCAzMikge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9ICh0aGlzLmxvdyA+Pj4gbikgfCAodGhpcy5oaWdoIDw8ICgzMiAtIG4pKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoID4+PiBuO1xuXHQgICAgICAgICAgICAvLyB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMuaGlnaCA+Pj4gKG4gLSAzMik7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IDA7XG5cdCAgICAgICAgICAgIC8vIH1cblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUm90YXRlcyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSBsZWZ0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJvdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciByb3RhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHJvdGF0ZWQgPSB4NjRXb3JkLnJvdEwoMjUpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHJvdEw6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLnNoaWZ0TChuKS5vcih0aGlzLnNoaWZ0Uig2NCAtIG4pKTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUm90YXRlcyB0aGlzIHdvcmQgbiBiaXRzIHRvIHRoZSByaWdodC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByb3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgcm90YXRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciByb3RhdGVkID0geDY0V29yZC5yb3RSKDcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHJvdFI6IGZ1bmN0aW9uIChuKSB7XG5cdCAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLnNoaWZ0UihuKS5vcih0aGlzLnNoaWZ0TCg2NCAtIG4pKTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIGFkZCB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBhZGRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBhZGRlZCA9IHg2NFdvcmQuYWRkKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyBhZGQ6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSAodGhpcy5sb3cgKyB3b3JkLmxvdykgfCAwO1xuXHQgICAgICAgICAgICAvLyB2YXIgY2FycnkgPSAobG93ID4+PiAwKSA8ICh0aGlzLmxvdyA+Pj4gMCkgPyAxIDogMDtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSAodGhpcy5oaWdoICsgd29yZC5oaWdoICsgY2FycnkpIHwgMDtcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbiBhcnJheSBvZiA2NC1iaXQgd29yZHMuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtBcnJheX0gd29yZHMgVGhlIGFycmF5IG9mIENyeXB0b0pTLng2NC5Xb3JkIG9iamVjdHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIENyeXB0b0pTLng2NC5Xb3JkIG9iamVjdHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy54NjQuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy54NjQuV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgwMDAxMDIwMywgMHgwNDA1MDYwNyksXG5cdCAgICAgICAgICogICAgICAgICBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgxODE5MWExYiwgMHgxYzFkMWUxZilcblx0ICAgICAgICAgKiAgICAgXSk7XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDAwMDEwMjAzLCAweDA0MDUwNjA3KSxcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDE4MTkxYTFiLCAweDFjMWQxZTFmKVxuXHQgICAgICAgICAqICAgICBdLCAxMCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogODtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIDY0LWJpdCB3b3JkIGFycmF5IHRvIGEgMzItYml0IHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDcnlwdG9KUy5saWIuV29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkncyBkYXRhIGFzIGEgMzItYml0IHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4MzJXb3JkQXJyYXkgPSB4NjRXb3JkQXJyYXkudG9YMzIoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1gzMjogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHg2NFdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHg2NFdvcmRzTGVuZ3RoID0geDY0V29yZHMubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHgzMldvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeDY0V29yZHNMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIHg2NFdvcmQgPSB4NjRXb3Jkc1tpXTtcblx0ICAgICAgICAgICAgICAgIHgzMldvcmRzLnB1c2goeDY0V29yZC5oaWdoKTtcblx0ICAgICAgICAgICAgICAgIHgzMldvcmRzLnB1c2goeDY0V29yZC5sb3cpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIFgzMldvcmRBcnJheS5jcmVhdGUoeDMyV29yZHMsIHRoaXMuc2lnQnl0ZXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0geDY0V29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIENsb25lIFwid29yZHNcIiBhcnJheVxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUgZWFjaCBYNjRXb3JkIG9iamVjdFxuXHQgICAgICAgICAgICB2YXIgd29yZHNMZW5ndGggPSB3b3Jkcy5sZW5ndGg7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHNMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaV0gPSB3b3Jkc1tpXS5jbG9uZSgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTO1xuXG59KSk7IiwiLyogKGlnbm9yZWQpICovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQ29weXJpZ2h0IChjKSBCcm9jayBBbGxlbiAmIERvbWluaWNrIEJhaWVyLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cblxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9zcmMvTG9nLmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnQgfSBmcm9tICcuL3NyYy9PaWRjQ2xpZW50LmpzJztcbmltcG9ydCB7IE9pZGNDbGllbnRTZXR0aW5ncyB9IGZyb20gJy4vc3JjL09pZGNDbGllbnRTZXR0aW5ncy5qcyc7XG5pbXBvcnQgeyBXZWJTdG9yYWdlU3RhdGVTdG9yZSB9IGZyb20gJy4vc3JjL1dlYlN0b3JhZ2VTdGF0ZVN0b3JlLmpzJztcbmltcG9ydCB7IEluTWVtb3J5V2ViU3RvcmFnZSB9IGZyb20gJy4vc3JjL0luTWVtb3J5V2ViU3RvcmFnZS5qcyc7XG5pbXBvcnQgeyBVc2VyTWFuYWdlciB9IGZyb20gJy4vc3JjL1VzZXJNYW5hZ2VyLmpzJztcbmltcG9ydCB7IEFjY2Vzc1Rva2VuRXZlbnRzIH0gZnJvbSAnLi9zcmMvQWNjZXNzVG9rZW5FdmVudHMuanMnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvTWV0YWRhdGFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IENvcmRvdmFQb3B1cE5hdmlnYXRvciB9IGZyb20gJy4vc3JjL0NvcmRvdmFQb3B1cE5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yIH0gZnJvbSAnLi9zcmMvQ29yZG92YUlGcmFtZU5hdmlnYXRvci5qcyc7XG5pbXBvcnQgeyBDaGVja1Nlc3Npb25JRnJhbWUgfSBmcm9tICcuL3NyYy9DaGVja1Nlc3Npb25JRnJhbWUuanMnO1xuaW1wb3J0IHsgVG9rZW5SZXZvY2F0aW9uQ2xpZW50IH0gZnJvbSAnLi9zcmMvVG9rZW5SZXZvY2F0aW9uQ2xpZW50LmpzJztcbmltcG9ydCB7IFNlc3Npb25Nb25pdG9yIH0gZnJvbSAnLi9zcmMvU2Vzc2lvbk1vbml0b3IuanMnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnLi9zcmMvR2xvYmFsLmpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3NyYy9Vc2VyLmpzJztcblxuaW1wb3J0IHsgVmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbi5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBWZXJzaW9uLFxuICAgIExvZyxcbiAgICBPaWRjQ2xpZW50LFxuICAgIE9pZGNDbGllbnRTZXR0aW5ncyxcbiAgICBXZWJTdG9yYWdlU3RhdGVTdG9yZSxcbiAgICBJbk1lbW9yeVdlYlN0b3JhZ2UsXG4gICAgVXNlck1hbmFnZXIsXG4gICAgQWNjZXNzVG9rZW5FdmVudHMsXG4gICAgTWV0YWRhdGFTZXJ2aWNlLFxuICAgIENvcmRvdmFQb3B1cE5hdmlnYXRvcixcbiAgICBDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yLFxuICAgIENoZWNrU2Vzc2lvbklGcmFtZSxcbiAgICBUb2tlblJldm9jYXRpb25DbGllbnQsXG4gICAgU2Vzc2lvbk1vbml0b3IsXG4gICAgR2xvYmFsLFxuICAgIFVzZXJcbn07XG4iXSwibmFtZXMiOlsiTG9nIiwiVGltZXIiLCJEZWZhdWx0QWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUiLCJBY2Nlc3NUb2tlbkV2ZW50cyIsIl9yZWYiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJfcmVmJGFjY2Vzc1Rva2VuRXhwaXIiLCJhY2Nlc3NUb2tlbkV4cGlyaW5nTm90aWZpY2F0aW9uVGltZSIsIl9yZWYkYWNjZXNzVG9rZW5FeHBpcjIiLCJhY2Nlc3NUb2tlbkV4cGlyaW5nVGltZXIiLCJfcmVmJGFjY2Vzc1Rva2VuRXhwaXIzIiwiYWNjZXNzVG9rZW5FeHBpcmVkVGltZXIiLCJfYWNjZXNzVG9rZW5FeHBpcmluZ05vdGlmaWNhdGlvblRpbWUiLCJfYWNjZXNzVG9rZW5FeHBpcmluZyIsIl9hY2Nlc3NUb2tlbkV4cGlyZWQiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJsb2FkIiwiY29udGFpbmVyIiwiYWNjZXNzX3Rva2VuIiwiZXhwaXJlc19pbiIsImR1cmF0aW9uIiwiZGVidWciLCJleHBpcmluZyIsImluaXQiLCJjYW5jZWwiLCJleHBpcmVkIiwidW5sb2FkIiwiYWRkQWNjZXNzVG9rZW5FeHBpcmluZyIsImNiIiwiYWRkSGFuZGxlciIsInJlbW92ZUFjY2Vzc1Rva2VuRXhwaXJpbmciLCJyZW1vdmVIYW5kbGVyIiwiYWRkQWNjZXNzVG9rZW5FeHBpcmVkIiwicmVtb3ZlQWNjZXNzVG9rZW5FeHBpcmVkIiwiRGVmYXVsdEludGVydmFsIiwiQ2hlY2tTZXNzaW9uSUZyYW1lIiwiY2FsbGJhY2siLCJjbGllbnRfaWQiLCJ1cmwiLCJpbnRlcnZhbCIsInN0b3BPbkVycm9yIiwiX2NhbGxiYWNrIiwiX2NsaWVudF9pZCIsIl91cmwiLCJfaW50ZXJ2YWwiLCJfc3RvcE9uRXJyb3IiLCJpZHgiLCJpbmRleE9mIiwiX2ZyYW1lX29yaWdpbiIsInN1YnN0ciIsIl9mcmFtZSIsIndpbmRvdyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwidmlzaWJpbGl0eSIsInBvc2l0aW9uIiwiZGlzcGxheSIsIndpZHRoIiwiaGVpZ2h0Iiwic3JjIiwiX3RoaXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9ubG9hZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIl9ib3VuZE1lc3NhZ2VFdmVudCIsIl9tZXNzYWdlIiwiYmluZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwib3JpZ2luIiwic291cmNlIiwiY29udGVudFdpbmRvdyIsImRhdGEiLCJlcnJvciIsInN0b3AiLCJzdGFydCIsInNlc3Npb25fc3RhdGUiLCJfdGhpczIiLCJfc2Vzc2lvbl9zdGF0ZSIsInNlbmQiLCJwb3N0TWVzc2FnZSIsIl90aW1lciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIkNsb2NrU2VydmljZSIsImdldEVwb2NoVGltZSIsIkRhdGUiLCJub3ciLCJDb3Jkb3ZhUG9wdXBXaW5kb3ciLCJDb3Jkb3ZhSUZyYW1lTmF2aWdhdG9yIiwicHJlcGFyZSIsInBhcmFtcyIsInBvcHVwV2luZG93RmVhdHVyZXMiLCJwb3B1cCIsIkNvcmRvdmFQb3B1cE5hdmlnYXRvciIsIkRlZmF1bHRQb3B1cEZlYXR1cmVzIiwiRGVmYXVsdFBvcHVwVGFyZ2V0IiwiX3Byb21pc2UiLCJyZWplY3QiLCJfcmVzb2x2ZSIsIl9yZWplY3QiLCJmZWF0dXJlcyIsInRhcmdldCIsInBvcHVwV2luZG93VGFyZ2V0IiwicmVkaXJlY3RfdXJpIiwic3RhcnRVcmwiLCJfaXNJbkFwcEJyb3dzZXJJbnN0YWxsZWQiLCJjb3Jkb3ZhTWV0YWRhdGEiLCJzb21lIiwibmFtZSIsImhhc093blByb3BlcnR5IiwibmF2aWdhdGUiLCJfZXJyb3IiLCJjb3Jkb3ZhIiwicmVxdWlyZSIsIm1ldGFkYXRhIiwiX3BvcHVwIiwiSW5BcHBCcm93c2VyIiwib3BlbiIsIl9leGl0Q2FsbGJhY2tFdmVudCIsIl9leGl0Q2FsbGJhY2siLCJfbG9hZFN0YXJ0Q2FsbGJhY2tFdmVudCIsIl9sb2FkU3RhcnRDYWxsYmFjayIsInByb21pc2UiLCJldmVudCIsIl9zdWNjZXNzIiwibWVzc2FnZSIsIl9jbGVhbnVwIiwiRXJyb3IiLCJjbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJnZXQiLCJFcnJvclJlc3BvbnNlIiwiX0Vycm9yIiwiZXJyb3JfZGVzY3JpcHRpb24iLCJlcnJvcl91cmkiLCJzdGF0ZSIsImNhbGwiLCJfaW5oZXJpdHNMb29zZSIsIl93cmFwTmF0aXZlU3VwZXIiLCJFdmVudCIsIl9uYW1lIiwiX2NhbGxiYWNrcyIsInB1c2giLCJmaW5kSW5kZXgiLCJpdGVtIiwic3BsaWNlIiwicmFpc2UiLCJpIiwiX3RoaXMkX2NhbGxiYWNrcyIsImFwcGx5IiwidGltZXIiLCJfc2V0SW50ZXJ2YWwiLCJfeCIsIl94MiIsInRvU3RyaW5nIiwiX2NsZWFySW50ZXJ2YWwiLCJfeDMiLCJoYW5kbGUiLCJ0ZXN0aW5nIiwicmVxdWVzdCIsIkdsb2JhbCIsIl90ZXN0aW5nIiwic2V0WE1MSHR0cFJlcXVlc3QiLCJuZXdSZXF1ZXN0IiwibG9jYXRpb24iLCJsb2NhbFN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsIlhNTEh0dHBSZXF1ZXN0IiwiSUZyYW1lV2luZG93IiwiSUZyYW1lTmF2aWdhdG9yIiwiZnJhbWUiLCJub3RpZnlQYXJlbnQiLCJEZWZhdWx0VGltZW91dCIsInRpbWVvdXQiLCJzaWxlbnRSZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJfdGltZW91dCIsImNsZWFyVGltZW91dCIsInJlbW92ZUNoaWxkIiwiX29yaWdpbiIsInN0YXJ0c1dpdGgiLCJocmVmIiwicGFyZW50IiwicHJvdG9jb2wiLCJob3N0IiwiSW5NZW1vcnlXZWJTdG9yYWdlIiwiX2RhdGEiLCJnZXRJdGVtIiwic2V0SXRlbSIsInZhbHVlIiwicmVtb3ZlSXRlbSIsImluZGV4IiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIlNIQTI1NiIsIlNIQTM4NCIsIlNIQTUxMiIsIkhleCIsIkJhc2U2NCIsInRvQnl0ZUFycmF5IiwiQWxsb3dlZFNpZ25pbmdBbGdzIiwiSGFzaGVycyIsInNoYTI1NiIsInNoYTM4NCIsInNoYTUxMiIsImI2NFRvQnl0ZXMiLCJzIiwicmVwbGFjZSIsInV0ZjhEZWNvZGUiLCJieXRlcyIsImVzY2FwZWQiLCJzbGljZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImI2NHVUb0pzb24iLCJKU09OIiwicGFyc2UiLCJhc2NpaVRvQnl0ZXMiLCJvdXQiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsImdldFN1YnRsZSIsImMiLCJjcnlwdG8iLCJnbG9iYWxUaGlzIiwiZ2xvYmFsIiwic3VidGxlIiwicmVhZFRsdiIsIm9mZnNldCIsInRhZyIsImxlbiIsIm4iLCJlbmQiLCJzcGtpRnJvbUNlcnRpZmljYXRlIiwiZGVyIiwiY2VydCIsInRicyIsInBvcyIsImVsIiwicmVzb2x2ZUtleSIsImt0eSIsImZvcm1hdCIsImV4dCIsIng1YyIsImNydiIsIngiLCJ5IiwiYWxnUGFyYW1zIiwiYWxnIiwiYml0cyIsImhhc2giLCJpbXBvcnRBbGciLCJ2ZXJpZnlBbGciLCJzYWx0TGVuZ3RoIiwicGFyc2VJbnQiLCJjdXJ2ZSIsIm5hbWVkQ3VydmUiLCJKb3NlVXRpbCIsInBhcnNlSnd0Iiwiand0IiwicGFydHMiLCJzcGxpdCIsImhlYWRlciIsInBheWxvYWQiLCJ2YWxpZGF0ZUp3dCIsImlzc3VlciIsImF1ZGllbmNlIiwiY2xvY2tTa2V3IiwidGltZUluc2Vuc2l0aXZlIiwicmVzb2x2ZWQiLCJ2YWxpZGF0ZUp3dEF0dHJpYnV0ZXMiLCJ0aGVuIiwiX3ZlcmlmeVNpZ25hdHVyZSIsInZhbGlkIiwicCIsInNpZ25hdHVyZSIsImltcG9ydEtleSIsImNyeXB0b0tleSIsInZlcmlmeSIsInBhcnNlZCIsImlzcyIsImF1ZCIsInZhbGlkQXVkaWVuY2UiLCJBcnJheSIsImlzQXJyYXkiLCJhenAiLCJsb3dlck5vdyIsInVwcGVyTm93IiwiaWF0IiwibmJmIiwiZXhwIiwiaGFzaFN0cmluZyIsImhhc2hlciIsIlN0cmluZyIsInRvTG93ZXJDYXNlIiwiaGV4VG9CYXNlNjRVcmwiLCJzdHJpbmdpZnkiLCJKc29uU2VydmljZSIsImFkZGl0aW9uYWxDb250ZW50VHlwZXMiLCJYTUxIdHRwUmVxdWVzdEN0b3IiLCJqd3RIYW5kbGVyIiwiX2NvbnRlbnRUeXBlcyIsIl9YTUxIdHRwUmVxdWVzdCIsIl9qd3RIYW5kbGVyIiwiZ2V0SnNvbiIsInRva2VuIiwicmVxIiwiYWxsb3dlZENvbnRlbnRUeXBlcyIsInN0YXR1cyIsImNvbnRlbnRUeXBlIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJmb3VuZCIsImZpbmQiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0Iiwib25lcnJvciIsInNldFJlcXVlc3RIZWFkZXIiLCJwb3N0Rm9ybSIsImJhc2ljQXV0aCIsImVuY29kZVVSSUNvbXBvbmVudCIsImJ0b2EiLCJub3BMb2dnZXIiLCJpbmZvIiwid2FybiIsIk5PTkUiLCJFUlJPUiIsIldBUk4iLCJJTkZPIiwiREVCVUciLCJsb2dnZXIiLCJsZXZlbCIsInJlc2V0IiwiX2xlbiIsImFyZ3MiLCJfa2V5IiwiZnJvbSIsIl9sZW4yIiwiX2tleTIiLCJfbGVuMyIsIl9rZXkzIiwiX2xlbjQiLCJfa2V5NCIsInNldCIsIk9pZGNNZXRhZGF0YVVybFBhdGgiLCJNZXRhZGF0YVNlcnZpY2UiLCJzZXR0aW5ncyIsIkpzb25TZXJ2aWNlQ3RvciIsIl9zZXR0aW5ncyIsIl9qc29uU2VydmljZSIsInJlc2V0U2lnbmluZ0tleXMiLCJzaWduaW5nS2V5cyIsImdldE1ldGFkYXRhIiwibWV0YWRhdGFVcmwiLCJzZWVkIiwibWV0YWRhdGFTZWVkIiwiYXNzaWduIiwiZ2V0SXNzdWVyIiwiX2dldE1ldGFkYXRhUHJvcGVydHkiLCJnZXRBdXRob3JpemF0aW9uRW5kcG9pbnQiLCJnZXRVc2VySW5mb0VuZHBvaW50IiwiZ2V0VG9rZW5FbmRwb2ludCIsIm9wdGlvbmFsIiwiZ2V0Q2hlY2tTZXNzaW9uSWZyYW1lIiwiZ2V0RW5kU2Vzc2lvbkVuZHBvaW50IiwiZ2V0UmV2b2NhdGlvbkVuZHBvaW50IiwiZ2V0S2V5c0VuZHBvaW50IiwiZ2V0U2lnbmluZ0tleXMiLCJqd2tzX3VyaSIsImtleVNldCIsImtleXMiLCJfbWV0YWRhdGFVcmwiLCJhdXRob3JpdHkiLCJPaWRjQ2xpZW50U2V0dGluZ3MiLCJTaWduaW5SZXF1ZXN0IiwiU2lnbmluUmVzcG9uc2UiLCJTaWdub3V0UmVxdWVzdCIsIlNpZ25vdXRSZXNwb25zZSIsIlNpZ25pblN0YXRlIiwiU3RhdGUiLCJPaWRjQ2xpZW50IiwiY3JlYXRlU2lnbmluUmVxdWVzdCIsInJlc3BvbnNlX3R5cGUiLCJzY29wZSIsInByb21wdCIsIm1heF9hZ2UiLCJ1aV9sb2NhbGVzIiwiaWRfdG9rZW5faGludCIsImxvZ2luX2hpbnQiLCJhY3JfdmFsdWVzIiwicmVzb3VyY2UiLCJyZXF1ZXN0X3VyaSIsInJlc3BvbnNlX21vZGUiLCJleHRyYVF1ZXJ5UGFyYW1zIiwiZXh0cmFUb2tlblBhcmFtcyIsInJlcXVlc3RfdHlwZSIsInNraXBVc2VySW5mbyIsInN0YXRlU3RvcmUiLCJpc0NvZGUiLCJfbWV0YWRhdGFTZXJ2aWNlIiwic2lnbmluUmVxdWVzdCIsImNsaWVudF9zZWNyZXQiLCJzaWduaW5TdGF0ZSIsIl9zdGF0ZVN0b3JlIiwiaWQiLCJ0b1N0b3JhZ2VTdHJpbmciLCJyZWFkU2lnbmluUmVzcG9uc2VTdGF0ZSIsInJlbW92ZVN0YXRlIiwidXNlUXVlcnkiLCJkZWxpbWl0ZXIiLCJyZXNwb25zZSIsInN0YXRlQXBpIiwicmVtb3ZlIiwic3RvcmVkU3RhdGVTdHJpbmciLCJmcm9tU3RvcmFnZVN0cmluZyIsInByb2Nlc3NTaWduaW5SZXNwb25zZSIsIl9yZWYyIiwiX3ZhbGlkYXRvciIsInZhbGlkYXRlU2lnbmluUmVzcG9uc2UiLCJjcmVhdGVTaWdub3V0UmVxdWVzdCIsIl90aGlzMyIsIl9yZWYzIiwicG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIiwic2lnbm91dFN0YXRlIiwicmVhZFNpZ25vdXRSZXNwb25zZVN0YXRlIiwic3RhdGVLZXkiLCJwcm9jZXNzU2lnbm91dFJlc3BvbnNlIiwiX3RoaXM0IiwiX3JlZjQiLCJ2YWxpZGF0ZVNpZ25vdXRSZXNwb25zZSIsImNsZWFyU3RhbGVTdGF0ZSIsInN0YWxlU3RhdGVBZ2UiLCJ2YWxpZGF0b3IiLCJtZXRhZGF0YVNlcnZpY2UiLCJXZWJTdG9yYWdlU3RhdGVTdG9yZSIsIlJlc3BvbnNlVmFsaWRhdG9yIiwiRGVmYXVsdFJlc3BvbnNlVHlwZSIsIkRlZmF1bHRTY29wZSIsIkRlZmF1bHRDbGllbnRBdXRoZW50aWNhdGlvbiIsIkRlZmF1bHRTdGFsZVN0YXRlQWdlIiwiRGVmYXVsdENsb2NrU2tld0luU2Vjb25kcyIsIl9yZWYkcmVzcG9uc2VfdHlwZSIsIl9yZWYkc2NvcGUiLCJfcmVmJGNsaWVudF9hdXRoZW50aWMiLCJjbGllbnRfYXV0aGVudGljYXRpb24iLCJfcmVmJGZpbHRlclByb3RvY29sQ2wiLCJmaWx0ZXJQcm90b2NvbENsYWltcyIsIl9yZWYkbG9hZFVzZXJJbmZvIiwibG9hZFVzZXJJbmZvIiwiX3JlZiRzdGFsZVN0YXRlQWdlIiwiX3JlZiRjbG9ja1NrZXciLCJfcmVmJGNsb2NrU2VydmljZSIsImNsb2NrU2VydmljZSIsIl9yZWYkdXNlckluZm9Kd3RJc3N1ZSIsInVzZXJJbmZvSnd0SXNzdWVyIiwiX3JlZiRtZXJnZUNsYWltcyIsIm1lcmdlQ2xhaW1zIiwiX3JlZiRzdGF0ZVN0b3JlIiwiX3JlZiRSZXNwb25zZVZhbGlkYXRvIiwiUmVzcG9uc2VWYWxpZGF0b3JDdG9yIiwiX3JlZiRNZXRhZGF0YVNlcnZpY2VDIiwiTWV0YWRhdGFTZXJ2aWNlQ3RvciIsIl9yZWYkZXh0cmFRdWVyeVBhcmFtcyIsIl9yZWYkZXh0cmFUb2tlblBhcmFtcyIsIl9hdXRob3JpdHkiLCJfbWV0YWRhdGEiLCJfbWV0YWRhdGFTZWVkIiwiX3NpZ25pbmdLZXlzIiwiX2NsaWVudF9zZWNyZXQiLCJfcmVzcG9uc2VfdHlwZSIsIl9zY29wZSIsIl9yZWRpcmVjdF91cmkiLCJfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIiwiX2NsaWVudF9hdXRoZW50aWNhdGlvbiIsIl9wcm9tcHQiLCJfZGlzcGxheSIsIl9tYXhfYWdlIiwiX3VpX2xvY2FsZXMiLCJfYWNyX3ZhbHVlcyIsIl9yZXNvdXJjZSIsIl9yZXNwb25zZV9tb2RlIiwiX2ZpbHRlclByb3RvY29sQ2xhaW1zIiwiX2xvYWRVc2VySW5mbyIsIl9zdGFsZVN0YXRlQWdlIiwiX2Nsb2NrU2tldyIsIl9jbG9ja1NlcnZpY2UiLCJfdXNlckluZm9Kd3RJc3N1ZXIiLCJfbWVyZ2VDbGFpbXMiLCJfZXh0cmFRdWVyeVBhcmFtcyIsIl90eXBlb2YiLCJfZXh0cmFUb2tlblBhcmFtcyIsIlBvcHVwV2luZG93IiwiUG9wdXBOYXZpZ2F0b3IiLCJrZWVwT3BlbiIsIm5vdGlmeU9wZW5lciIsIlVybFV0aWxpdHkiLCJDaGVja0ZvclBvcHVwQ2xvc2VkSW50ZXJ2YWwiLCJfY2hlY2tGb3JQb3B1cENsb3NlZFRpbWVyIiwiX2NoZWNrRm9yUG9wdXBDbG9zZWQiLCJfaWQiLCJmb2N1cyIsImNsb3NlZCIsIm9wZW5lciIsInBhcnNlVXJsRnJhZ21lbnQiLCJSZWRpcmVjdE5hdmlnYXRvciIsInVzZVJlcGxhY2VUb05hdmlnYXRlIiwiVXNlckluZm9TZXJ2aWNlIiwiVG9rZW5DbGllbnQiLCJVbnNhZmVLZXlzIiwiUHJvdG9jb2xDbGFpbXMiLCJVc2VySW5mb1NlcnZpY2VDdG9yIiwiam9zZVV0aWwiLCJUb2tlbkNsaWVudEN0b3IiLCJfdXNlckluZm9TZXJ2aWNlIiwiX2pvc2VVdGlsIiwiX3Rva2VuQ2xpZW50IiwiX3Byb2Nlc3NTaWduaW5QYXJhbXMiLCJfdmFsaWRhdGVUb2tlbnMiLCJfcHJvY2Vzc0NsYWltcyIsIm5vbmNlIiwiaWRfdG9rZW4iLCJjb2RlX3ZlcmlmaWVyIiwiY29kZSIsImlzT3BlbklkQ29ubmVjdCIsInByb2ZpbGUiLCJnZXRDbGFpbXMiLCJjbGFpbXMiLCJzdWIiLCJjbGFpbXMxIiwiY2xhaW1zMiIsInJlc3VsdCIsInZhbHVlcyIsImZvckVhY2giLCJ0eXBlIiwiX3Byb2Nlc3NDb2RlIiwiX3ZhbGlkYXRlSWRUb2tlbkFuZEFjY2Vzc1Rva2VuIiwiX3ZhbGlkYXRlSWRUb2tlbiIsImV4Y2hhbmdlQ29kZSIsInRva2VuUmVzcG9uc2UiLCJfdmFsaWRhdGVJZFRva2VuQXR0cmlidXRlcyIsImNsb2NrU2tld0luU2Vjb25kcyIsIl90aGlzNSIsIl92YWxpZGF0ZUFjY2Vzc1Rva2VuIiwiX2dldFNpZ25pbmdLZXlGb3JKd3QiLCJfdGhpczYiLCJraWQiLCJfZmlsdGVyQnlBbGciLCJmaWx0ZXIiLCJfZ2V0U2lnbmluZ0tleUZvckp3dFdpdGhTaW5nbGVSZXRyeSIsIl90aGlzNyIsIl90aGlzOCIsImF0X2hhc2giLCJoYXNoQWxnIiwiaGFzaEJpdHMiLCJzaGEiLCJsZWZ0IiwibGVmdF9iNjR1IiwiU2Vzc2lvbk1vbml0b3IiLCJ1c2VyTWFuYWdlciIsIkNoZWNrU2Vzc2lvbklGcmFtZUN0b3IiLCJfdXNlck1hbmFnZXIiLCJfQ2hlY2tTZXNzaW9uSUZyYW1lQ3RvciIsImV2ZW50cyIsImFkZFVzZXJMb2FkZWQiLCJfc3RhcnQiLCJhZGRVc2VyVW5sb2FkZWQiLCJfc3RvcCIsImdldFVzZXIiLCJ1c2VyIiwibW9uaXRvckFub255bW91c1Nlc3Npb24iLCJxdWVyeVNlc3Npb25TdGF0dXMiLCJzZXNzaW9uIiwidG1wVXNlciIsInNpZCIsImNhdGNoIiwiZXJyIiwiX3N1YiIsIl9zaWQiLCJfY2hlY2tTZXNzaW9uSUZyYW1lIiwiX2NoZWNrU2Vzc2lvbkludGVydmFsIiwiX3N0b3BDaGVja1Nlc3Npb25PbkVycm9yIiwidGltZXJIYW5kbGUiLCJyYWlzZUV2ZW50IiwiX3JhaXNlVXNlclNlc3Npb25DaGFuZ2VkIiwiX3JhaXNlVXNlclNpZ25lZE91dCIsIl9yYWlzZVVzZXJTaWduZWRJbiIsImNoZWNrU2Vzc2lvbkludGVydmFsIiwic3RvcENoZWNrU2Vzc2lvbk9uRXJyb3IiLCJvaWRjIiwiaXNPaWRjIiwiYWRkUXVlcnlQYXJhbSIsImNvZGVfY2hhbGxlbmdlIiwiaXNPQXV0aCIsIk9pZGNTY29wZSIsInRva2VuX3R5cGUiLCJleHBpcmVzX2F0Iiwic2NvcGVzIiwicmFuZG9tIiwiX1N0YXRlIiwiX25vbmNlIiwiX2NvZGVfdmVyaWZpZXIiLCJfY29kZV9jaGFsbGVuZ2UiLCJfc2tpcFVzZXJJbmZvIiwiY3JlYXRlZCIsInN0b3JhZ2VTdHJpbmciLCJTaWxlbnRSZW5ld1NlcnZpY2UiLCJfdG9rZW5FeHBpcmluZyIsInNpZ25pblNpbGVudCIsIl9yYWlzZVNpbGVudFJlbmV3RXJyb3IiLCJfY3JlYXRlZCIsIl9yZXF1ZXN0X3R5cGUiLCJzdG9yYWdlIiwiYWdlIiwiY3V0b2ZmIiwiZ2V0QWxsS2V5cyIsInByb21pc2VzIiwiX2xvb3AiLCJhbGwiLCJUaW1lckR1cmF0aW9uIiwiX0V2ZW50Iiwibm93RnVuYyIsIl9ub3dGdW5jIiwiZXhwaXJhdGlvbiIsIl90aW1lckhhbmRsZSIsIl9leHBpcmF0aW9uIiwidGltZXJEdXJhdGlvbiIsImRpZmYiLCJncmFudF90eXBlIiwiZXhjaGFuZ2VSZWZyZXNoVG9rZW4iLCJyZWZyZXNoX3Rva2VuIiwiQWNjZXNzVG9rZW5UeXBlSGludCIsIlJlZnJlc2hUb2tlblR5cGVIaW50IiwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50IiwiX1hNTEh0dHBSZXF1ZXN0Q3RvciIsInJldm9rZSIsInJlcXVpcmVkIiwiX3Jldm9rZSIsInhociIsImxhc3RJbmRleE9mIiwicmVnZXgiLCJtIiwiY291bnRlciIsImV4ZWMiLCJ2YWwiLCJwcm9wIiwiVXNlciIsIl9nZXRDbGFpbXNGcm9tSnd0IiwiaXNzdWVyUHJvbWlzZSIsIlVzZXJNYW5hZ2VyU2V0dGluZ3MiLCJVc2VyTWFuYWdlckV2ZW50cyIsIlVzZXJNYW5hZ2VyIiwiX09pZGNDbGllbnQiLCJTaWxlbnRSZW5ld1NlcnZpY2VDdG9yIiwiU2Vzc2lvbk1vbml0b3JDdG9yIiwiVG9rZW5SZXZvY2F0aW9uQ2xpZW50Q3RvciIsIl9ldmVudHMiLCJfc2lsZW50UmVuZXdTZXJ2aWNlIiwiYXV0b21hdGljU2lsZW50UmVuZXciLCJzdGFydFNpbGVudFJlbmV3IiwibW9uaXRvclNlc3Npb24iLCJfc2Vzc2lvbk1vbml0b3IiLCJfdG9rZW5SZXZvY2F0aW9uQ2xpZW50IiwiX2xvYWRVc2VyIiwicmVtb3ZlVXNlciIsInN0b3JlVXNlciIsInNpZ25pblJlZGlyZWN0IiwibmF2UGFyYW1zIiwiX3NpZ25pblN0YXJ0IiwiX3JlZGlyZWN0TmF2aWdhdG9yIiwic2lnbmluUmVkaXJlY3RDYWxsYmFjayIsIl9zaWduaW5FbmQiLCJzaWduaW5Qb3B1cCIsInBvcHVwX3JlZGlyZWN0X3VyaSIsIl9zaWduaW4iLCJfcG9wdXBOYXZpZ2F0b3IiLCJzaWduaW5Qb3B1cENhbGxiYWNrIiwiX3NpZ25pbkNhbGxiYWNrIiwiX3VzZVJlZnJlc2hUb2tlbiIsImluY2x1ZGVJZFRva2VuSW5TaWxlbnRSZW5ldyIsInZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldyIsImN1cnJlbnRfc3ViIiwiX3NpZ25pblNpbGVudElmcmFtZSIsImlkVG9rZW5WYWxpZGF0aW9uIiwiX3ZhbGlkYXRlSWRUb2tlbkZyb21Ub2tlblJlZnJlc2hUb2tlbiIsImF1dGhfdGltZSIsInNpbGVudF9yZWRpcmVjdF91cmkiLCJfaWZyYW1lTmF2aWdhdG9yIiwic2lnbmluU2lsZW50Q2FsbGJhY2siLCJzaWduaW5DYWxsYmFjayIsInNpZ25vdXRDYWxsYmFjayIsInNpZ25vdXRSZWRpcmVjdENhbGxiYWNrIiwic2lnbm91dFBvcHVwQ2FsbGJhY2siLCJfdGhpczkiLCJxdWVyeV9zdGF0dXNfcmVzcG9uc2VfdHlwZSIsIm5hdlJlc3BvbnNlIiwic2lnbmluUmVzcG9uc2UiLCJuYXZpZ2F0b3IiLCJfdGhpczAiLCJuYXZpZ2F0b3JQYXJhbXMiLCJfdGhpczEiLCJfdGhpczEwIiwic2lnbm91dFJlZGlyZWN0IiwicG9zdExvZ291dFJlZGlyZWN0VXJpIiwiX3NpZ25vdXRTdGFydCIsIl9zaWdub3V0RW5kIiwic2lnbm91dFBvcHVwIiwicG9wdXBfcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIiwiX3NpZ25vdXQiLCJfdGhpczExIiwiX3RoaXMxMiIsInJldm9rZVByb21pc2UiLCJyZXZva2VBY2Nlc3NUb2tlbk9uU2lnbm91dCIsIl9yZXZva2VJbnRlcm5hbCIsInNpZ25vdXRSZXF1ZXN0Iiwic2lnbm91dFJlc3BvbnNlIiwicmV2b2tlQWNjZXNzVG9rZW4iLCJfdGhpczEzIiwic3VjY2VzcyIsIl90aGlzMTQiLCJfcmV2b2tlQWNjZXNzVG9rZW5JbnRlcm5hbCIsImF0U3VjY2VzcyIsIl9yZXZva2VSZWZyZXNoVG9rZW5JbnRlcm5hbCIsInJ0U3VjY2VzcyIsInN0b3BTaWxlbnRSZW5ldyIsIl91c2VyU3RvcmUiLCJfdXNlclN0b3JlS2V5IiwicmVkaXJlY3ROYXZpZ2F0b3IiLCJwb3B1cE5hdmlnYXRvciIsImlmcmFtZU5hdmlnYXRvciIsInVzZXJTdG9yZSIsImNvbmNhdCIsIl9BY2Nlc3NUb2tlbkV2ZW50cyIsIl91c2VyTG9hZGVkIiwiX3VzZXJVbmxvYWRlZCIsIl9zaWxlbnRSZW5ld0Vycm9yIiwiX3VzZXJTaWduZWRJbiIsIl91c2VyU2lnbmVkT3V0IiwiX3VzZXJTZXNzaW9uQ2hhbmdlZCIsInJlbW92ZVVzZXJMb2FkZWQiLCJyZW1vdmVVc2VyVW5sb2FkZWQiLCJhZGRTaWxlbnRSZW5ld0Vycm9yIiwicmVtb3ZlU2lsZW50UmVuZXdFcnJvciIsImFkZFVzZXJTaWduZWRJbiIsInJlbW92ZVVzZXJTaWduZWRJbiIsImFkZFVzZXJTaWduZWRPdXQiLCJyZW1vdmVVc2VyU2lnbmVkT3V0IiwiYWRkVXNlclNlc3Npb25DaGFuZ2VkIiwicmVtb3ZlVXNlclNlc3Npb25DaGFuZ2VkIiwiRGVmYXVsdENoZWNrU2Vzc2lvbkludGVydmFsIiwiX09pZGNDbGllbnRTZXR0aW5ncyIsIl9yZWYkYXV0b21hdGljU2lsZW50UiIsIl9yZWYkdmFsaWRhdGVTdWJPblNpbCIsIl9yZWYkaW5jbHVkZUlkVG9rZW5JbiIsIl9yZWYkbW9uaXRvclNlc3Npb24iLCJfcmVmJG1vbml0b3JBbm9ueW1vdXMiLCJfcmVmJGNoZWNrU2Vzc2lvbkludGUiLCJfcmVmJHN0b3BDaGVja1Nlc3Npb24iLCJfcmVmJHJldm9rZUFjY2Vzc1Rva2UiLCJfcmVmJHJlZGlyZWN0TmF2aWdhdG8iLCJfcmVmJHBvcHVwTmF2aWdhdG9yIiwiX3JlZiRpZnJhbWVOYXZpZ2F0b3IiLCJfcmVmJHVzZXJTdG9yZSIsInN0b3JlIiwiX3BvcHVwX3JlZGlyZWN0X3VyaSIsIl9wb3B1cF9wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkiLCJfcG9wdXBXaW5kb3dGZWF0dXJlcyIsIl9wb3B1cFdpbmRvd1RhcmdldCIsIl9zaWxlbnRfcmVkaXJlY3RfdXJpIiwiX3NpbGVudFJlcXVlc3RUaW1lb3V0IiwiX2F1dG9tYXRpY1NpbGVudFJlbmV3IiwiX3ZhbGlkYXRlU3ViT25TaWxlbnRSZW5ldyIsIl9pbmNsdWRlSWRUb2tlbkluU2lsZW50UmVuZXciLCJfbW9uaXRvclNlc3Npb24iLCJfbW9uaXRvckFub255bW91c1Nlc3Npb24iLCJfcXVlcnlfc3RhdHVzX3Jlc3BvbnNlX3R5cGUiLCJfcmV2b2tlQWNjZXNzVG9rZW5PblNpZ25vdXQiLCJfcmVmJHByZWZpeCIsInByZWZpeCIsIl9yZWYkc3RvcmUiLCJfc3RvcmUiLCJfcHJlZml4IiwiZ2V0Q3J5cHRvIiwibXNDcnlwdG8iLCJfY3J5cHRvVXVpZHY0IiwiZ2V0UmFuZG9tVmFsdWVzIiwiX3V1aWR2NCIsIk1hdGgiLCJ3YXJuZWQiLCJoYXNSYW5kb21WYWx1ZXMiLCJ1dWlkIiwiVmVyc2lvbiJdLCJzb3VyY2VSb290IjoiIn0=