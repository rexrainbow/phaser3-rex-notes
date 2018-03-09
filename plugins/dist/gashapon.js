(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("phaser"));
	else if(typeof define === 'function' && define.amd)
		define(["phaser"], factory);
	else if(typeof exports === 'object')
		exports["rexPlugins"] = factory(require("phaser"));
	else
		root["rexPlugins"] = factory(root["phaser"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** external "phaser" ***!
  \*************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/*!*************************************************!*\
  !*** ./plugins/utils/system/GetEventEmmiter.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_IsFunction_js__ = __webpack_require__(/*! ./../object/IsFunction.js */ 2);



/**
 * Return event emmiter from scene, or gameobject
 * @returns {object} parent scene, or gameobject
 */
var GetEventEmmiter = function (parent) {
    if (parent == null) {
        return null;
    } else if (Object(__WEBPACK_IMPORTED_MODULE_0__object_IsFunction_js__["a" /* default */])(parent.on)) {  // gameobject.on
        return parent;
    } else if (parent.systems && parent.systems.events &&
        Object(__WEBPACK_IMPORTED_MODULE_0__object_IsFunction_js__["a" /* default */])(parent.systems.events.on)) {  // scene.systems.events.on
        return parent.systems.events;
    } else {
        return null;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (GetEventEmmiter);

/***/ }),
/* 2 */
/*!********************************************!*\
  !*** ./plugins/utils/object/IsFunction.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


var IsFunction = function (obj) {    
    return obj && (typeof(obj) === 'function');
};

/* harmony default export */ __webpack_exports__["a"] = (IsFunction);

/***/ }),
/* 3 */,
/* 4 */
/*!***************************************!*\
  !*** ./plugins/utils/object/Clean.js ***!
  \***************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_IsArray_js__ = __webpack_require__(/*! ./../array/IsArray.js */ 5);



var Clean = function (obj) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__array_IsArray_js__["a" /* default */])(obj)) {
        obj.length = 0;
    } else {
        for (var key in obj) {
            delete obj[key];
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Clean);

/***/ }),
/* 5 */
/*!****************************************!*\
  !*** ./plugins/utils/array/IsArray.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


var IsArray = function (obj)
{
    return Object.prototype.toString.call(obj) === '[object Array]';
};
/* harmony default export */ __webpack_exports__["a"] = (IsArray);

/***/ }),
/* 6 */
/*!******************************************!*\
  !*** multi ./plugins/gashapon-plugin.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./plugins/gashapon-plugin.js */7);


/***/ }),
/* 7 */
/*!************************************!*\
  !*** ./plugins/gashapon-plugin.js ***!
  \************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gashapon_GashaponPlugin_js__ = __webpack_require__(/*! ./gashapon/GashaponPlugin.js */ 8);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__gashapon_GashaponPlugin_js__["a" /* default */]);

/***/ }),
/* 8 */
/*!********************************************!*\
  !*** ./plugins/gashapon/GashaponPlugin.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Gashapon_js__ = __webpack_require__(/*! ./Gashapon.js */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_system_GetEventEmmiter_js__ = __webpack_require__(/*! ./../utils/system/GetEventEmmiter.js */ 1);





class GashaponPlugin extends __WEBPACK_IMPORTED_MODULE_0__Gashapon_js__["a" /* default */] {
    constructor(parent, config) {
        super(config);
        
        this.parent = parent;
        this.boot();
    }

    boot() {
        var eventEmitter = Object(__WEBPACK_IMPORTED_MODULE_1__utils_system_GetEventEmmiter_js__["a" /* default */])(this.parent);
        if (eventEmitter) {
            eventEmitter.on('shutdown', this.shutdown, this);
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        __WEBPACK_IMPORTED_MODULE_0__Gashapon_js__["a" /* default */].destroy.apply(this);
    }

    destroy() {
        this.shutdown();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (GashaponPlugin);

/***/ }),
/* 9 */
/*!**************************************!*\
  !*** ./plugins/gashapon/Gashapon.js ***!
  \**************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_object_Clone_js__ = __webpack_require__(/*! ./../utils/object/Clone.js */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Object_IsEmpty_js__ = __webpack_require__(/*! ./../utils/Object/IsEmpty.js */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_object_Clean_js__ = __webpack_require__(/*! ./../utils/object/Clean.js */ 4);







const GetFastValue = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Utils.Objects.GetFastValue;
const GetValue = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Utils.Objects.GetValue;
/**
 * Create Gashapon object with configuration
 * @class
 * @classdesc Gashapon in shuffle or random mode
 */
class Gashapon {
    constructor(config) {
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        // configuration
        if (this.cfg == undefined) {
            this.cfg = {};
        }
        if (this.items == undefined) {
            this.items = {};
        }
        if (this.remain == undefined) {
            this.remain = {};
        }
        if (this._list == undefined) {
            this._list = [];
        }
        if (this.customRnd == undefined) {
            this.customRnd = [null, null];
        }        

        this.setMode(GetFastValue(o, 'mode', 0));
        this.setReload(GetFastValue(o, 'reload', true));

        // data

        this.items = Object(__WEBPACK_IMPORTED_MODULE_1__utils_object_Clone_js__["a" /* default */])(GetFastValue(o, 'items', {}), this.items);
        this.remain = Object(__WEBPACK_IMPORTED_MODULE_1__utils_object_Clone_js__["a" /* default */])(GetFastValue(o, 'remain', {}), this.remain);
        this._list.length = 0;

        // result
        this.result = GetFastValue(o, 'result', null);

        // flags
        this._restartFlag = true; // force restart to rebuild this._list

        // custom function to return random real number between 0 and 1
        this.customRnd[0] = GetValue(o, 'rnd.fn', null);
        this.customRnd[1] = GetValue(o, 'rnd.ctx', null);

        // initialize
        if (this._restartFlag) {
            this.startGen();
        }

        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            // configuration
            mode: this.cfg.mode,
            reload: this.cfg.reload,

            // data
            items: Object(__WEBPACK_IMPORTED_MODULE_1__utils_object_Clone_js__["a" /* default */])(this.items),
            remain: Object(__WEBPACK_IMPORTED_MODULE_1__utils_object_Clone_js__["a" /* default */])(this.remain),

            // result
            result: this.result,

            // flags
            restart: true, // force restart to rebuild this._list

            // custom function to return random real number between 0 and 1
            rnd: Object(__WEBPACK_IMPORTED_MODULE_1__utils_object_Clone_js__["a" /* default */])(this.customRnd)
        };
    };

    /**
     * Restart generator
     * @returns {object} this object
     */
    startGen() {
        var name;
        // clean remain items
        for (name in this.remain) {
            if (!this.items.hasOwnProperty(name)) {
                delete this.remain[name];
            }
        }
        // init remain items
        for (name in this.items) {
            var count = this.items[name];
            if (count > 0)
                this.remain[name] = count;
        }

        if (this.cfg.mode === 1) { // random mode
            this.resetItemList(this.remain);
        }
        this._restartFlag = false;

        return this;
    }


    /**
     * Set mode
     * @param {number|string} m 'shuffle'(0) or 'random'(1)
     * @returns {object} this object
     */
    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this._restartFlag = (this.cfg.mode !== m);
        this.cfg.mode = m;
        return this;
    }

    /**
     * Set reload mode
     * @param {boolean} isReload reload items when empty
     * @returns {object} this object
     */
    setReload(isReload) {
        this.cfg.reload = !!isReload;
        return this;
    }

    /**
     * Set item
     * @param {string} name item name
     * @param {number} count item count
     * @returns {object} this object
     */
    setItem(name, count) {
        this._restartFlag = (this.items[name] !== count);
        this.items[name] = count;
        return this;
    }

    /**
     * Remove item
     * @param {string} name item name
     * @returns {object} this object
     */
    removeItem(name) {
        if (this.items.hasOwnProperty(name)) {
            delete this.items[name];
            this._restartFlag = true;
        }
        return this;
    }

    /**
     * Remove all items
     * @returns {object} this object
     */
    removeAllItems() {
        for (var name in this.items) {
            delete this.items[name];
        }
        this._restartFlag = true;
        return this;
    }

    /**
     * Return clone items
     * @returns {object} Cloned items
     */
    getItems() {
        return Object(__WEBPACK_IMPORTED_MODULE_1__utils_object_Clone_js__["a" /* default */])(this.items);
    }

    /**
     * Return clone remaining items
     * @returns {object} Cloned remaining items
     */
    getRemain() {
        return Object(__WEBPACK_IMPORTED_MODULE_1__utils_object_Clone_js__["a" /* default */])(this.remain);
    }

    /**
     * Return amount of an item
     * @param {string} name item name
     * @returns {number} Amount of an item
     */
    getItemCount(name) {
        return this.items[name] || 0;
    }

    /**
     * Return amount of a remaining item
     * @param {string} name remaining item name
     * @returns {number} Amount of a remaining item
     */
    getRemainCount(name) {
        return this.remain[name] || 0;
    }

    /**
     * Passes all items to the given callback
     * @param {function} callback the function to call
     * @param {object} [scope] value to use as `this` when executing callback.
     * @param {...*} [arguments] additional arguments that will be passed to the callback, after item name, and amount.
     * @returns {object} this object
     */
    eachItem(callback, scope) {
        var args = [null, undefined];

        for (var i = 2, len = arguments.length; i < len; i++) {
            args.push(arguments[i]);
        }

        for (var name in this.items) {
            args[0] = name;
            args[1] = this.items[name];

            callback.apply(scope, args);
        }

        return this;
    }

    /**
     * Passes all remaining items to the given callback
     * @param {function} callback the function to call
     * @param {object} [scope] value to use as `this` when executing callback.
     * @param {...*} [arguments] additional arguments that will be passed to the callback, after item name, and amount.
     * @returns {object} this object
     */
    eachRemain(callback, scope) {
        var args = [null, undefined];

        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        for (var name in this.remain) {
            args[1] = name;
            args[2] = this.remain[name];

            callback.apply(scope, args);
        }

        return this;
    }

    /**
     * Add item without changing remaining items
     * @param {string} name item name
     * @param {number} count item count
     * @returns {object} this object
     */
    addItem(name, count) {
        if (!this.items.hasOwnProperty(name)) {
            this.items[name] = 0;
        }
        this.items[name] += count;

        if (this._restartFlag)
            return;

        if (this.cfg.mode === 0) { // shuffle mode
            this.addRemainItem(name, count);
        } else { // random mode
            this.resetItemList(this.remain);
        }
        return this;
    }

    /**
     * Add remaining items without max items
     * @param {string} name item name
     * @param {number} count item count
     * @returns {object} this object
     */
    putItemBack(name, count) {
        if (this.cfg.mode === 1) // random mode
            return;

        if (!this.items.hasOwnProperty(name))
            return;

        if ((this.cfg.mode === 2) && this.restartGenFlg)
            return;

        // generator had started  
        if (!this.remain.hasOwnProperty(name))
            this.remain[name] = 0;

        this.addShadowPattern(name, count, this.items[name]);
        return this;
    };

    /**
     * Return a random item
     * @returns {string} item name
     */
    next(name) {
        var result = null;
        if (this._restartFlag) {
            this.startGen();
        }

        if (name == null) {
            if (this.cfg.mode === 0) { // shuffle mode
                this.resetItemList(this.remain);
                result = this.getRndItem(this._list);
                this.addRemainItem(result, -1);
            } else { // random mode
                result = this.getRndItem(this._list);
            }

        } else { // force pick
            if (!this.remain.hasOwnProperty(name)) {
                result = null; // can not pick that result
            } else {
                if (this.cfg.mode === 0) {
                    this.addRemainItem(name, -1);
                }
                result = name;
            }
        }

        this.result = result;
        return result;
    }

    /**
     * Set custom random generator
     * @param {function} callback the function to call
     * @param {object} scope value to use as `this` when executing callback
     * @returns {object} this object
     */
    setRandomGen(callback, scope) {
        this.customRnd[0] = callback;
        this.customRnd[1] = scope;
        return this;
    }

    /**
     * Release all resources and references
     * @returns {object} this object
     */
    destroy() {
        // configuration
        this.cfg.mode = undefined;
        this.cfg.reload = undefined;

        // data
        Object(__WEBPACK_IMPORTED_MODULE_3__utils_object_Clean_js__["a" /* default */])(this.items);
        Object(__WEBPACK_IMPORTED_MODULE_3__utils_object_Clean_js__["a" /* default */])(this.remain);
        Object(__WEBPACK_IMPORTED_MODULE_3__utils_object_Clean_js__["a" /* default */])(this._list);

        // result
        this.result = null;

        // flags
        this._restartFlag = false;

        // custom function to return random real number between 0 and 1
        this.customRnd[0] = null;
        this.customRnd[1] = null;

        return this;
    }

    /** @private */
    resetItemList(items) {
        // clean list
        this._list.length = 0;
        var name, count, totalCount = 0;
        // get total count
        for (name in items) {
            count = items[name];
            if (count > 0)
                totalCount += count;
        }
        // set percentage
        for (name in items) {
            count = items[name];
            if (count > 0) {
                this._list.push([
                    name,
                    count / totalCount
                ]);
            }
        }
        return this;
    }

    /** @private */
    addRemainItem(name, inc, maxCount) {
        if ((name == null) || (inc === 0))
            return this;

        if (!this.remain.hasOwnProperty(name))
            this.remain[name] = 0;

        this.remain[name] += inc;
        if ((maxCount != null) && (this.remain[name] > maxCount))
            this.remain[name] = maxCount

        if (this.remain[name] <= 0)
            delete this.remain[name];

        if ((this.cfg.mode === 0) && this.cfg.reload && Object(__WEBPACK_IMPORTED_MODULE_2__utils_Object_IsEmpty_js__["a" /* default */])(this.remain))
            this._restartFlag = true;

        return this;
    }

    /** @private */
    getRndValue() {
        var value;
        if (this.customRnd[0]) {
            value = this.customRnd[0].call(this.customRnd[1]);
        } else {
            value = Math.random();
        }
        return value;
    }

    /** @private */
    getRndItem(list) {
        var value = this.getRndValue();
        var result = null,
            i, cnt = list.length,
            item
        for (i = 0; i < cnt; i++) {
            item = list[i];
            value -= item[1];
            if (value < 0) {
                result = item[0];
                break;
            }
        }
        return result;
    }

}

/** @private */
const MODE = {
    shuffle: 0,
    random: 1
};

/* harmony default export */ __webpack_exports__["a"] = (Gashapon);

/***/ }),
/* 10 */
/*!***************************************!*\
  !*** ./plugins/utils/object/Clone.js ***!
  \***************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Clean_js__ = __webpack_require__(/*! ./Clean.js */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array_IsArray_js__ = __webpack_require__(/*! ./../array/IsArray.js */ 5);





/**
 * Shallow Object Clone. Will not clone nested objects.
 * @param {object} obj JSON object
 * @param {object} ret JSON object to return, set null to return a new object
 * @returns {object} this object
 */
var Clone = function (obj, ret) {
    var clone;

    if (ret != null) {
        clone = ret;
        Object(__WEBPACK_IMPORTED_MODULE_0__Clean_js__["a" /* default */])(clone);
    } else {
        clone = (Object(__WEBPACK_IMPORTED_MODULE_1__array_IsArray_js__["a" /* default */])(obj)) ? [] : {};
    }

    for (var key in obj) {
        if (Object(__WEBPACK_IMPORTED_MODULE_1__array_IsArray_js__["a" /* default */])(obj[key])) {
            clone[key] = obj[key].slice(0);
        }
        else {
            clone[key] = obj[key];
        }
    }

    return clone;
};

/* harmony default export */ __webpack_exports__["a"] = (Clone);


/***/ }),
/* 11 */
/*!*****************************************!*\
  !*** ./plugins/utils/Object/IsEmpty.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


var IsEmpty = function (source) {
    for (var k in source) {
        return false;
    }
    return true;
};

/* harmony default export */ __webpack_exports__["a"] = (IsEmpty);

/***/ })
/******/ ]);
});