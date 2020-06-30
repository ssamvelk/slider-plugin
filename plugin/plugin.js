/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./blocks/plugin/Plugin.ts","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./blocks/model/Model.ts":
/*!*******************************!*\
  !*** ./blocks/model/Model.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils_1 = __webpack_require__(/*! ../utils/Utils */ "./blocks/utils/Utils.ts");

var Model = /*#__PURE__*/function () {
  function Model(options) {
    _classCallCheck(this, Model);

    this.min = options.min || 0;
    this.max = options.max || 100;
    this.step = options.step || 1;

    if (this.min >= this.max) {
      this.max = this.min + this.step;
    }

    this.type = options.type || 'single';
    this.direction = options.direction || 'horizontal';
    this.value = options.value || (this.type === 'range' ? [0, 100] : 0);
    this.tooltip = options.tooltip || false;
    this.scale = {
      init: Utils_1.chechScaleInit(options.scale),
      num: options.scale instanceof Object && options.scale.num ? options.scale.num : 7,
      type: options.scale instanceof Object && options.scale.type ? options.scale.type : 'usual'
    };
    this.setValue(this.value, this.type);
  }

  _createClass(Model, [{
    key: "getType",
    value: function getType() {
      return this.type;
    }
  }, {
    key: "getStep",
    value: function getStep() {
      return this.step;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }, {
    key: "setValue",
    value: function setValue(value, type) {
      var localValue = Utils_1.checkValue(value, this.min, this.max, this.step, this.type);

      if (type === 'single') {
        this.value = localValue;
      } else if (type === 'range') {
        this.value = localValue;
      }
    }
  }, {
    key: "changeDirection",
    value: function changeDirection() {
      if (this.direction === 'horizontal') this.direction = 'vertical';else if (this.direction === 'vertical') this.direction = 'horizontal';
    }
  }, {
    key: "changeType",
    value: function changeType(type) {
      if (type === this.type) {
        return false;
      }

      this.type = type;
      var localValue;

      if (this.type === 'single') {
        var _this$value = _slicedToArray(this.value, 1);

        localValue = _this$value[0];
        this.value = localValue;
      } else if (this.type === 'range') {
        localValue = [this.value, this.value];
        this.value = localValue;
      }

      this.setValue(this.value, this.type);
      return true;
    }
  }, {
    key: "changeStep",
    value: function changeStep(step) {
      var localStep = step;
      if (localStep < 0.01) localStep = 0.01;
      if (localStep > this.max - this.min) localStep = this.max - this.min;
      this.step = localStep;
      this.setValue(this.value, this.type);
    }
  }, {
    key: "changeScale",
    value: function changeScale(options) {
      this.scale.init = options.init;
      if (options.type) this.scale.type = options.type;
      if (options.num) this.scale.num = options.num;
    }
  }]);

  return Model;
}();

exports.default = Model;

/***/ }),

/***/ "./blocks/plugin/Plugin.ts":
/*!*********************************!*\
  !*** ./blocks/plugin/Plugin.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Presenter_1 = __importDefault(__webpack_require__(/*! ../presenter/Presenter */ "./blocks/presenter/Presenter.ts"));

var jQuery = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");

var $ = jQuery;

$.fn.sliderPlugin = function (options) {
  var localRoot;

  if (this[0] && this[0].id) {
    localRoot = this[0].attributes.getNamedItem('id').value;
  }

  var localOptions = $.extend(options, {
    root: localRoot
  });
  var presenter = new Presenter_1.default(localOptions);
  return {
    getValue: presenter.getValue.bind(presenter),
    getType: presenter.getType.bind(presenter),
    getStep: presenter.getStep.bind(presenter),
    getScale: presenter.getScale.bind(presenter),
    getDirection: presenter.getDirection.bind(presenter),
    getTooltip: presenter.getTooltip.bind(presenter),
    setValue: presenter.changeValue.bind(presenter),
    changeType: presenter.changeType.bind(presenter),
    changeTooltip: presenter.changeTooltip.bind(presenter),
    changeDirection: presenter.changeDirection.bind(presenter),
    changeStep: presenter.changeStep.bind(presenter),
    changeScale: presenter.changeScale.bind(presenter),
    addObserver: presenter.addObserver.bind(presenter)
  };
};

exports.default = $;

/***/ }),

/***/ "./blocks/presenter/Presenter.ts":
/*!***************************************!*\
  !*** ./blocks/presenter/Presenter.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View_1 = __importDefault(__webpack_require__(/*! ../view/View */ "./blocks/view/View.ts"));

var Model_1 = __importDefault(__webpack_require__(/*! ../model/Model */ "./blocks/model/Model.ts"));

var Presenter = /*#__PURE__*/function () {
  function Presenter(options) {
    _classCallCheck(this, Presenter);

    this.view = new View_1.default(options);
    this.model = new Model_1.default(options);
    this.addObserver(this);
  }

  _createClass(Presenter, [{
    key: "update",
    value: function update(action, parameters) {
      if (action === 'userMoveSlider') this.changeValue(parameters);
    }
  }, {
    key: "changeDirection",
    value: function changeDirection() {
      this.model.changeDirection();
      this.view.changeDirection();
    }
  }, {
    key: "changeType",
    value: function changeType(type) {
      this.model.changeType(type);
      this.view.changeType(type);
    }
  }, {
    key: "changeValue",
    value: function changeValue(value) {
      this.model.setValue(value, this.model.type);
      this.view.changeValue(value);
    }
  }, {
    key: "changeStep",
    value: function changeStep(step) {
      this.model.changeStep(step);
      this.view.changeStep(step);
    }
  }, {
    key: "changeScale",
    value: function changeScale(options) {
      this.model.changeScale(options);
      this.view.changeScale(options);
    }
  }, {
    key: "changeTooltip",
    value: function changeTooltip(tooltip) {
      this.model.tooltip = tooltip;
      this.view.changeTooltip(this.model.tooltip);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.model.value;
    }
  }, {
    key: "getType",
    value: function getType() {
      return this.model.type;
    }
  }, {
    key: "getStep",
    value: function getStep() {
      return this.model.step;
    }
  }, {
    key: "getScale",
    value: function getScale() {
      return this.model.scale;
    }
  }, {
    key: "getDirection",
    value: function getDirection() {
      return this.model.direction;
    }
  }, {
    key: "getTooltip",
    value: function getTooltip() {
      return this.model.tooltip;
    }
  }, {
    key: "addObserver",
    value: function addObserver(observer) {
      this.view.addObservers(observer);
    }
  }]);

  return Presenter;
}();

exports.default = Presenter;

/***/ }),

/***/ "./blocks/utils/Observable.ts":
/*!************************************!*\
  !*** ./blocks/utils/Observable.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Observable = /*#__PURE__*/function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this.observers = [];
  }

  _createClass(Observable, [{
    key: "subscribe",
    value: function subscribe(observer) {
      this.observers.push(observer);
    }
  }, {
    key: "trigger",
    value: function trigger(action, parameters) {
      this.observers.forEach(function (observer) {
        return observer.update(action, parameters);
      });
    }
  }]);

  return Observable;
}();

exports.default = Observable;

/***/ }),

/***/ "./blocks/utils/Utils.ts":
/*!*******************************!*\
  !*** ./blocks/utils/Utils.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chechScaleInit = exports.roundValue = exports.checkValue = exports.stepСheck = void 0;

var roundValue = function roundValue(value) {
  var localValue = value.toString().includes('.') ? +value.toFixed(2) : value;
  return localValue;
};

exports.roundValue = roundValue;

var stepСheck = function stepСheck(value, min, max, step) {
  if (value <= min) return min;
  if (value > max) return stepСheck(max, min, max, step);

  if ((value - min) % step !== 0) {
    return min + Number(((value - min) / step).toFixed()) * step <= max ? roundValue(min + Number(((value - min) / step).toFixed()) * step) : roundValue(min + Number(((value - min) / step).toFixed()) * step - step);
  }

  return roundValue(value);
};

exports.stepСheck = stepСheck;

var checkValue = function checkValue(value, min, max, step, type) {
  var newLocal = value;

  if (type === 'single') {
    if (newLocal <= min) {
      newLocal = min;
      return newLocal;
    }

    if (newLocal > max) {
      newLocal = max;
    }

    newLocal = stepСheck(newLocal, min, max, step);
    return newLocal;
  }

  if (type === 'range' && value instanceof Array === true) {
    var newLocal2 = value;

    if (newLocal2[0] <= min) {
      newLocal2[0] = min;
      if (newLocal2[1] <= min) newLocal2[1] = newLocal2[0] + step;
    }

    if (newLocal2[1] >= max) {
      newLocal2[1] = stepСheck(max, min, max, step);
      if (newLocal2[0] >= newLocal2[1]) newLocal2[0] = newLocal2[1] - step;
    }

    newLocal2[0] = stepСheck(newLocal2[0], min, max, step);
    newLocal2[1] = stepСheck(newLocal2[1], min, max, step);

    if (newLocal2[0] >= newLocal2[1]) {
      if (newLocal2[0] <= stepСheck(max, min, max, step) - step) {
        newLocal2[1] = newLocal2[0] + step;
      } else if (newLocal2[0] > stepСheck(max, min, max, step) - step) {
        newLocal2[0] = stepСheck(max, min, max, step) - step;
        newLocal2[1] = stepСheck(max, min, max, step);
      }
    }

    return newLocal2;
  }
};

exports.checkValue = checkValue;

var chechScaleInit = function chechScaleInit(scale) {
  if (scale && typeof scale === 'boolean') {
    return scale;
  }

  if (scale && scale instanceof Object) {
    if (scale.init) {
      return scale.init;
    }

    return false;
  }

  return false;
};

exports.chechScaleInit = chechScaleInit;

/***/ }),

/***/ "./blocks/view/View.ts":
/*!*****************************!*\
  !*** ./blocks/view/View.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils_1 = __webpack_require__(/*! ../utils/Utils */ "./blocks/utils/Utils.ts");

var Observable_1 = __importDefault(__webpack_require__(/*! ../utils/Observable */ "./blocks/utils/Observable.ts"));

var View = /*#__PURE__*/function () {
  function View(options) {
    _classCallCheck(this, View);

    this.viewValues = {
      min: options.min || 0,
      max: options.max || 100,
      step: options.step || 1,
      type: options.type || 'single',
      value: options.value || (options.type === 'range' ? [0, 100] : 0),
      direction: options.direction || 'horizontal',
      tooltip: options.tooltip || false,
      scale: {
        init: Utils_1.chechScaleInit(options.scale),
        num: options.scale instanceof Object && options.scale.num ? options.scale.num : 7,
        type: options.scale instanceof Object && options.scale.type ? options.scale.type : 'usual'
      }
    };
    this.observebale = new Observable_1.default();
    this.init(options);
    this.initStyles(options.type, options.direction);
    this.setValue(this.viewValues.value, this.viewValues.type);
    this.bindEventListeners();
  }

  _createClass(View, [{
    key: "init",
    value: function init(opt) {
      if (!this.root) {
        this.root = document.getElementById(opt.root) || document.body;
      }

      (this.wrap = document.createElement('div')).classList.add('slider__wrp');

      if (this.root === document.body) {
        this.root.insertBefore(this.wrap, document.querySelector('script'));
      } else {
        this.root.appendChild(this.wrap);
      }

      (this.sliderLine = document.createElement('div')).classList.add('slider__line');
      this.wrap.appendChild(this.sliderLine);
      (this.selectSegment = document.createElement('div')).classList.add('slider__select');

      if (this.viewValues.type === 'single') {
        this.sliderLine.appendChild(this.selectSegment);
        (this.handle = document.createElement('div')).classList.add('slider__handle');
        this.sliderLine.appendChild(this.handle);
      } else if (this.viewValues.type === 'range') {
        (this.handleMin = document.createElement('div')).classList.add('slider__handle');
        this.sliderLine.appendChild(this.handleMin);
        this.sliderLine.appendChild(this.selectSegment);
        (this.handleMax = document.createElement('div')).classList.add('slider__handle');
        this.sliderLine.appendChild(this.handleMax);
      }

      if (this.viewValues.tooltip) {
        this.initTooltip();
      }

      if (this.viewValues.scale.init) {
        this.initScale(this.viewValues.scale);
      }
    }
  }, {
    key: "initStyles",
    value: function initStyles() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'single';
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'horizontal';

      if (direction === 'horizontal') {
        this.wrap.classList.add('slider__wrp_horizontal');
        this.sliderLine.classList.add('slider__line_horizontal');
        this.selectSegment.classList.add('slider__select_horizontal');

        if (type === 'single') {
          if (this.handle) {
            this.handle.classList.add('slider__handle_horizontal');
            this.handle.tabIndex = 1;
          }
        } else if (type === 'range') {
          if (this.handleMin) {
            this.handleMin.classList.add('slider__handle_horizontal');
            this.handleMin.tabIndex = 1;
          }

          if (this.handleMax) {
            this.handleMax.classList.add('slider__handle_horizontal');
            this.handleMax.tabIndex = 1;
          }
        }
      } else if (direction === 'vertical') {
        this.wrap.classList.add('slider__wrp_vertical');
        this.sliderLine.classList.add('slider__line_vertical');
        this.selectSegment.classList.add('slider__select_vertical');

        if (type === 'single') {
          if (this.handle) {
            this.handle.classList.add('slider__handle_vertical');
            this.handle.tabIndex = 1;
          }
        } else if (type === 'range') {
          if (this.handleMin) {
            this.handleMin.classList.add('slider__handle_vertical');
            this.handleMin.tabIndex = 1;
          }

          if (this.handleMax) {
            this.handleMax.classList.add('slider__handle_vertical');
            this.handleMax.tabIndex = 1;
          }
        }
      }
    }
  }, {
    key: "initScale",
    value: function initScale(opt) {
      var _this = this;

      (this.scale = document.createElement('div')).classList.add('slider__scale');
      var ul = document.createElement('ul');
      ul.classList.add('slider__scale-list');
      var dirLocalValue = this.viewValues.direction;
      if (dirLocalValue === 'horizontal') ul.classList.add('slider__scale-list_horizontal');else if (dirLocalValue === 'vertical') ul.classList.add('slider__scale-list_vertical');
      var localNumValue = opt.num || 7;

      for (var i = 0; i < localNumValue; i += 1) {
        var li = document.createElement('li');
        li.classList.add('slider__scale-item');
        li.classList.add("slider__scale-item_".concat(dirLocalValue));

        if (this.viewValues.scale.type === 'numeric') {
          li.classList.add('slider__scale-item_numeric');

          if (this.viewValues.step < 1 && this.viewValues.max - this.viewValues.min <= 1) {
            li.innerHTML = ((this.viewValues.max - this.viewValues.min) / (localNumValue - 1) * i + this.viewValues.min).toFixed(2).toString();
          } else li.innerHTML = ((this.viewValues.max - this.viewValues.min) / (localNumValue - 1) * i + this.viewValues.min).toFixed().toString();
        }

        li.id = "slider__scale-item".concat(i + 1);
        ul.appendChild(li);
      }

      this.initScaleStyles();
      this.scale.appendChild(ul);
      this.wrap.appendChild(this.scale);

      if (this.viewValues.scale.init) {
        this.scale.addEventListener('mousedown', function (e) {
          if (e.target.classList.contains('slider__scale-item')) {
            var localValue;

            if (_this.viewValues.type === 'single') {
              if (_this.viewValues.direction === 'horizontal') {
                localValue = _this.invertCoordinate(e.clientX).inValue;
              } else if (_this.viewValues.direction === 'vertical') {
                localValue = _this.invertCoordinate(e.clientY).inValue;
              }

              _this.setValue(localValue, 'single');
            } else if (_this.viewValues.type === 'range') {
              if (_this.viewValues.direction === 'horizontal') {
                localValue = _this.invertCoordinate(e.clientX).inValue;
              } else if (_this.viewValues.direction === 'vertical') {
                localValue = _this.invertCoordinate(e.clientY).inValue;
              }

              if (localValue <= _this.viewValues.value[1]) {
                _this.setValue([localValue, _this.viewValues.value[1]], 'range');
              } else {
                _this.setValue([_this.viewValues.value[0], localValue], 'range');
              }
            }

            _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
          }
        });
      }
    }
  }, {
    key: "initTooltip",
    value: function initTooltip() {
      if (this.viewValues.type === 'single') {
        if (this.viewValues.tooltip) {
          (this.tooltip = document.createElement('div')).classList.add('slider__tooltip');
          this.handle.appendChild(this.tooltip);

          if (this.viewValues.direction === 'horizontal') {
            this.tooltip.classList.add('slider__tooltip_horizontal');
          } else if (this.viewValues.direction === 'vertical') {
            this.tooltip.classList.add('slider__tooltip_vertical');
          }

          this.tooltip.innerHTML = this.viewValues.value.toString();
        }
      } else if (this.viewValues.type === 'range') {
        if (this.viewValues.tooltip) {
          (this.tooltipMin = document.createElement('div')).classList.add('slider__tooltip');
          this.handleMin.appendChild(this.tooltipMin);
          (this.tooltipMax = document.createElement('div')).classList.add('slider__tooltip');
          this.handleMax.appendChild(this.tooltipMax);

          if (this.viewValues.direction === 'horizontal') {
            this.tooltipMin.classList.add('slider__tooltip_horizontal');
            this.tooltipMax.classList.add('slider__tooltip_horizontal');
          } else if (this.viewValues.direction === 'vertical') {
            this.tooltipMin.classList.add('slider__tooltip_vertical');
            this.tooltipMax.classList.add('slider__tooltip_vertical');
          }

          this.tooltipMin.innerHTML = this.viewValues.value[0].toString();
          this.tooltipMax.innerHTML = this.viewValues.value[1].toString();
        }
      }
    }
  }, {
    key: "initScaleStyles",
    value: function initScaleStyles() {
      if (this.scale) {
        if (this.viewValues.direction === 'horizontal') this.scale.classList.add('slider__scale_horizontal');
        if (this.viewValues.direction === 'vertical') this.scale.classList.add('slider__scale_vertical');
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value, type) {
      var localValue = this.checkValue(value);

      if (this.viewValues.direction === 'horizontal') {
        if (type === 'single') {
          this.viewValues.value = localValue;
          this.selectSegment.style.width = "calc(".concat(this.invertToPersent(this.viewValues.value), "%)");
          this.handle.style.left = "calc(".concat(this.invertToPersent(this.viewValues.value), "% - 15px)");
          if (this.tooltip) this.tooltip.innerHTML = this.viewValues.value.toString();
        } else if (type === 'range') {
          this.viewValues.value = localValue;
          this.handleMin.style.left = "calc(".concat(this.invertToPersent(this.viewValues.value[0]), "% - 15px)");
          this.selectSegment.style.width = "calc(".concat(this.invertToPersent(this.viewValues.value[1]) - this.invertToPersent(this.viewValues.value[0]), "%)");
          this.selectSegment.style.left = "calc(".concat(this.invertToPersent(this.viewValues.value[0]), "%)");
          this.handleMax.style.left = "calc(".concat(this.invertToPersent(this.viewValues.value[1]), "% - 15px)");
          if (this.tooltipMin) this.tooltipMin.innerHTML = this.viewValues.value[0].toString();
          if (this.tooltipMax) this.tooltipMax.innerHTML = this.viewValues.value[1].toString();
        }
      } else if (this.viewValues.direction === 'vertical') {
        if (type === 'single') {
          this.viewValues.value = localValue;
          this.selectSegment.style.height = "calc(".concat(this.invertToPersent(this.viewValues.value), "%)");
          this.handle.style.top = "calc(".concat(this.invertToPersent(this.viewValues.value), "% - 15px)");
          if (this.tooltip) this.tooltip.innerHTML = this.viewValues.value.toString();
        } else if (type === 'range') {
          this.viewValues.value = localValue;
          this.handleMin.style.top = "calc(".concat(this.invertToPersent(this.viewValues.value[0]), "% - 15px)");
          this.selectSegment.style.height = "calc(".concat(this.invertToPersent(this.viewValues.value[1]) - this.invertToPersent(this.viewValues.value[0]), "%)");
          this.selectSegment.style.top = "calc(".concat(this.invertToPersent(this.viewValues.value[0]), "%)");
          this.handleMax.style.top = "calc(".concat(this.invertToPersent(this.viewValues.value[1]), "% - 15px)");
          if (this.tooltipMin) this.tooltipMin.innerHTML = this.viewValues.value[0].toString();
          if (this.tooltipMax) this.tooltipMax.innerHTML = this.viewValues.value[1].toString();
        }
      }
    }
  }, {
    key: "clearRoot",
    value: function clearRoot() {
      this.wrap.remove();
    }
  }, {
    key: "clearScale",
    value: function clearScale() {
      var _a;

      (_a = this.scale) === null || _a === void 0 ? void 0 : _a.remove();
    }
  }, {
    key: "clearTooltip",
    value: function clearTooltip() {
      var _a, _b, _c;

      (_a = this.tooltip) === null || _a === void 0 ? void 0 : _a.remove();
      (_b = this.tooltipMin) === null || _b === void 0 ? void 0 : _b.remove();
      (_c = this.tooltipMax) === null || _c === void 0 ? void 0 : _c.remove();
    }
  }, {
    key: "invertToPersent",
    value: function invertToPersent(value) {
      return (value - this.viewValues.min) / (this.viewValues.max - this.viewValues.min) * 100;
    }
  }, {
    key: "invertCoordinate",
    value: function invertCoordinate(value) {
      var localPersentValue = 0;

      if (this.viewValues.direction === 'horizontal') {
        localPersentValue = Number(((value - this.sliderLine.getBoundingClientRect().left) / this.sliderLine.getBoundingClientRect().width * 100).toFixed(2));
      } else if (this.viewValues.direction === 'vertical') {
        localPersentValue = Number(((value - this.sliderLine.getBoundingClientRect().top) / this.sliderLine.getBoundingClientRect().height * 100).toFixed(2));
      }

      if (localPersentValue < 0) localPersentValue = 0;
      if (localPersentValue > 100) localPersentValue = 100;
      var localValue = Number(localPersentValue) / 100 * (this.viewValues.max - this.viewValues.min) + this.viewValues.min;
      return {
        inPersent: Number(localPersentValue.toFixed()),
        inValue: Number(localValue.toFixed(2))
      };
    }
  }, {
    key: "step\u0421heck",
    value: function stepHeck(value) {
      return Utils_1.stepСheck(value, this.viewValues.min, this.viewValues.max, this.viewValues.step);
    }
  }, {
    key: "checkValue",
    value: function checkValue(value) {
      return Utils_1.checkValue(value, this.viewValues.min, this.viewValues.max, this.viewValues.step, this.viewValues.type);
    }
  }, {
    key: "bindEventListeners",
    value: function bindEventListeners() {
      var _this2 = this;

      var MousePositionOnSlider = 0;

      var onMouseMoveHandle = function onMouseMoveHandle(e) {
        e.preventDefault();

        if (_this2.viewValues.direction === 'horizontal') {
          MousePositionOnSlider = _this2.invertCoordinate(e.clientX).inValue;
        } else if (_this2.viewValues.direction === 'vertical') {
          MousePositionOnSlider = _this2.invertCoordinate(e.clientY).inValue;
        }

        MousePositionOnSlider = _this2.stepСheck(MousePositionOnSlider);

        _this2.setValue(MousePositionOnSlider, 'single');

        _this2.viewValues.value = MousePositionOnSlider;

        _this2.observebale.trigger('userMoveSlider', _this2.viewValues.value);
      };

      var onMouseMoveHandleMin = function onMouseMoveHandleMin(e) {
        e.preventDefault();
        var _ref = [_this2.viewValues.value[1]],
            localMax = _ref[0];

        if (_this2.viewValues.direction === 'horizontal') {
          MousePositionOnSlider = _this2.invertCoordinate(e.clientX).inValue;
          MousePositionOnSlider = _this2.stepСheck(MousePositionOnSlider);
        } else if (_this2.viewValues.direction === 'vertical') {
          MousePositionOnSlider = _this2.invertCoordinate(e.clientY).inValue;
          MousePositionOnSlider = _this2.stepСheck(MousePositionOnSlider);
        }

        _this2.setValue([MousePositionOnSlider, localMax], 'range');

        _this2.observebale.trigger('userMoveSlider', _this2.viewValues.value);
      };

      var onMouseMoveHandleMax = function onMouseMoveHandleMax(e) {
        e.preventDefault();
        var _ref2 = [_this2.viewValues.value[0]],
            localMin = _ref2[0];

        if (_this2.viewValues.direction === 'horizontal') {
          MousePositionOnSlider = _this2.invertCoordinate(e.clientX).inValue;
          MousePositionOnSlider = _this2.stepСheck(MousePositionOnSlider);
        } else if (_this2.viewValues.direction === 'vertical') {
          MousePositionOnSlider = _this2.invertCoordinate(e.clientY).inValue;
          MousePositionOnSlider = _this2.stepСheck(MousePositionOnSlider);
        }

        if (MousePositionOnSlider <= localMin) {
          _this2.setValue([localMin - _this2.viewValues.step, MousePositionOnSlider], 'range');
        } else _this2.setValue([localMin, MousePositionOnSlider], 'range');

        _this2.observebale.trigger('userMoveSlider', _this2.viewValues.value);
      };

      var onMouseUp = function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMoveHandle);
        document.removeEventListener('mousemove', onMouseMoveHandleMin);
        document.removeEventListener('mousemove', onMouseMoveHandleMax);
      };

      var onFocusHandle = function onFocusHandle(e) {
        e.preventDefault();

        if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
          _this2.setValue(_this2.viewValues.value - _this2.viewValues.step, 'single');

          _this2.observebale.trigger('userMoveSlider', _this2.viewValues.value);
        }

        if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
          _this2.setValue(_this2.viewValues.value + _this2.viewValues.step, 'single');

          _this2.observebale.trigger('userMoveSlider', _this2.viewValues.value);
        }
      };

      var onFocusHandleMin = function onFocusHandleMin(e) {
        e.preventDefault();

        if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
          _this2.setValue([_this2.viewValues.value[0] + _this2.viewValues.step, _this2.viewValues.value[1]], 'range');

          _this2.observebale.trigger('userMoveSlider', _this2.viewValues.value);
        }

        if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
          _this2.setValue([_this2.viewValues.value[0] - _this2.viewValues.step, _this2.viewValues.value[1]], 'range');

          _this2.observebale.trigger('userMoveSlider', _this2.viewValues.value);
        }
      };

      var onFocusHandleMax = function onFocusHandleMax(e) {
        e.preventDefault();

        if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
          _this2.setValue([_this2.viewValues.value[0], _this2.viewValues.value[1] + _this2.viewValues.step], 'range');

          _this2.observebale.trigger('userMoveSlider', _this2.viewValues.value);
        }

        if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
          if (_this2.viewValues.value[1] - _this2.viewValues.value[0] === _this2.viewValues.step) {
            _this2.setValue([_this2.viewValues.value[0] - _this2.viewValues.step, _this2.viewValues.value[1] - _this2.viewValues.step], 'range');

            return;
          }

          _this2.setValue([_this2.viewValues.value[0], _this2.viewValues.value[1] - _this2.viewValues.step], 'range');

          _this2.observebale.trigger('userMoveSlider', _this2.viewValues.value);
        }
      };

      var onBlurHandle = function onBlurHandle() {
        var _a, _b, _c;

        if (_this2.viewValues.type === 'single') {
          (_a = _this2.handle) === null || _a === void 0 ? void 0 : _a.removeEventListener('keydown', onFocusHandle);
        } else if (_this2.viewValues.type === 'range') {
          (_b = _this2.handleMin) === null || _b === void 0 ? void 0 : _b.removeEventListener('keydown', onFocusHandleMin);
          (_c = _this2.handleMax) === null || _c === void 0 ? void 0 : _c.removeEventListener('keydown', onFocusHandleMax);
        }
      };

      if (this.viewValues.type === 'single') {
        this.handle.addEventListener('mousedown', function (e) {
          if (e.button === 0) {
            document.addEventListener('mousemove', onMouseMoveHandle);
            document.addEventListener('mouseup', onMouseUp);
          }
        });
        this.handle.addEventListener('focus', function () {
          _this2.handle.addEventListener('keydown', onFocusHandle);
        });
        this.handle.addEventListener('blur', onBlurHandle);
      } else if (this.viewValues.type === 'range') {
        this.handleMin.addEventListener('mousedown', function (e) {
          if (e.button === 0) {
            document.addEventListener('mousemove', onMouseMoveHandleMin);
            document.addEventListener('mouseup', onMouseUp);
          }
        });
        this.handleMin.addEventListener('focus', function () {
          _this2.handleMin.addEventListener('keydown', onFocusHandleMin);
        });
        this.handleMin.addEventListener('blur', onBlurHandle);
        this.handleMax.addEventListener('mousedown', function (e) {
          if (e.button === 0) {
            document.addEventListener('mousemove', onMouseMoveHandleMax);
            document.addEventListener('mouseup', onMouseUp);
          }
        });
        this.handleMax.addEventListener('focus', function () {
          _this2.handleMax.addEventListener('keydown', onFocusHandleMax);
        });
        this.handleMax.addEventListener('blur', onBlurHandle);
      }
    }
  }, {
    key: "changeDirection",
    value: function changeDirection() {
      if (this.viewValues.direction === 'horizontal') this.viewValues.direction = 'vertical';else if (this.viewValues.direction === 'vertical') this.viewValues.direction = 'horizontal';
      this.clearRoot();
      this.init(this.viewValues);
      this.initStyles(this.viewValues.type, this.viewValues.direction);
      this.setValue(this.viewValues.value, this.viewValues.type);
      this.bindEventListeners();
    }
  }, {
    key: "changeType",
    value: function changeType(type, value) {
      if (type === this.viewValues.type) {
        console.log('Нельзя поменять тип слайдера на тот же самый, который установлен');
        return false;
      }

      this.viewValues.type = type;
      var localValue;

      if (value) {
        if (this.viewValues.type === 'single') {
          if (typeof value === 'number') {
            this.viewValues.value = value;
          } else {
            console.log('Введенное значение должно быть числом');
            return false;
          }
        } else if (this.viewValues.type === 'range') {
          if (Array.isArray(value) && value.length === 2) {
            this.viewValues.value = value;
          } else {
            console.log('Введенное значение должно быть массивом из 2х чисел');
            return false;
          }
        }
      } else if (!value) {
        if (this.viewValues.type === 'single') {
          var _this$viewValues$valu = _slicedToArray(this.viewValues.value, 1);

          localValue = _this$viewValues$valu[0];
          this.viewValues.value = localValue;
        } else if (this.viewValues.type === 'range') {
          localValue = [this.viewValues.value, this.viewValues.value];
          this.viewValues.value = localValue;
        }
      }

      this.clearRoot();
      this.init(this.viewValues);
      this.initStyles(this.viewValues.type, this.viewValues.direction);
      this.setValue(this.viewValues.value, this.viewValues.type);
      this.bindEventListeners();
      return true;
    }
  }, {
    key: "changeValue",
    value: function changeValue(value) {
      if (this.viewValues.type === 'single' && typeof value !== 'number') {
        return new Error('введите корректное значение, а именно number');
      }

      if (this.viewValues.type === 'range' && !Array.isArray(value) || this.viewValues.type === 'range' && Array.isArray(value) && value.length !== 2) {
        return new Error('введите корректное значение, а именно [number, number]');
      }

      this.setValue(value, this.viewValues.type);
      return this.viewValues.value;
    }
  }, {
    key: "changeStep",
    value: function changeStep(step) {
      var localStep = step;
      if (localStep < 0.01) localStep = 0.01;
      if (localStep > this.viewValues.max - this.viewValues.min) localStep = this.viewValues.max - this.viewValues.min;
      this.viewValues.step = step;
      this.setValue(this.viewValues.value, this.viewValues.type);
    }
  }, {
    key: "changeScale",
    value: function changeScale(options) {
      this.viewValues.scale.init = options.init;
      if (options.type) this.viewValues.scale.type = options.type;
      if (options.num) this.viewValues.scale.num = options.num;
      if (this.viewValues.scale.init === false) this.clearScale();else if (this.viewValues.scale.init === true) {
        this.clearScale();
        this.initScale(this.viewValues.scale);
      }
    }
  }, {
    key: "changeTooltip",
    value: function changeTooltip(tooltip) {
      if (this.viewValues.tooltip === tooltip) return;

      if (tooltip === false) {
        this.viewValues.tooltip = false;
        this.clearTooltip();
      } else if (tooltip === true) {
        this.viewValues.tooltip = true;
        this.initTooltip();
      }
    }
  }, {
    key: "getValues",
    value: function getValues() {
      return this.viewValues;
    }
  }, {
    key: "addObservers",
    value: function addObservers(observer) {
      this.observebale.subscribe(observer);
    }
  }]);

  return View;
}();

exports.default = View;

/***/ })

/******/ });