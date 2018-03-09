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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/*!********************************************!*\
  !*** multi ./plugins/dragcursor-plugin.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./plugins/dragcursor-plugin.js */13);


/***/ }),
/* 13 */
/*!**************************************!*\
  !*** ./plugins/dragcursor-plugin.js ***!
  \**************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dragcursor_DragCursorPlugin_js__ = __webpack_require__(/*! ./dragcursor/DragCursorPlugin.js */ 14);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__dragcursor_DragCursorPlugin_js__["a" /* default */]);

/***/ }),
/* 14 */
/*!************************************************!*\
  !*** ./plugins/dragcursor/DragCursorPlugin.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_system_GetEventEmmiter_js__ = __webpack_require__(/*! ./../utils/system/GetEventEmmiter.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_input_VectorToCursorKeys_js__ = __webpack_require__(/*! ./../utils/input/VectorToCursorKeys.js */ 15);






const GetValue = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Utils.Objects.GetValue;

class DragCursorPlugin extends __WEBPACK_IMPORTED_MODULE_2__utils_input_VectorToCursorKeys_js__["a" /* default */] {
    constructor(parent, config) {
        super(config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        this.parent = parent;
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        super.resetFromJSON(o);

        this.pointerId = null;
        if (this.cfg.origin == undefined) {
            this.cfg.origin = {};
        }
        if (this.origin == undefined) {
            this.origin = {};
        }

        var ox = GetValue(o, 'origin.x', null);
        var oy = GetValue(o, 'origin.y', null);
        this.setOrigin(ox, oy);
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        var o = super.toJSON();
        o.origin = {
            x: this.cfg.origin.x,
            y: this.cfg.origin.y
        };

        return o;
    }

    boot() {
        var eventEmitter = Object(__WEBPACK_IMPORTED_MODULE_1__utils_system_GetEventEmmiter_js__["a" /* default */])(this.parent);
        if (eventEmitter) {
            eventEmitter.on('shutdown', this.shutdown, this);
            eventEmitter.on('destroy', this.destroy, this);
        }

        this.init();
    }

    init() {
        if (!this.parent || !this.parent.input) {
            return;
        }

        var self = this;
        var input = this.parent.input;
        if (input instanceof __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Input.InputPlugin) { // parent is scene      
            input.on('pointerdown', this.onDragStart, this);
            input.on('pointerup', this.onDrop, this);
            input.on('pointermove', this.onDragging, this);
        } else { // parent is gameobject
            // TODO
        }
    }

    setOrigin(x, y) {
        var o = this.cfg.origin;
        o.x = x;
        o.y = y;
        return this;
    }

    onDragStart(pointer) {
        if (this.pointerId !== null) {
            return;
        }
        this.pointerId = pointer.id;
        var defaultOriginMode = (this.cfg.origin.x !== null);
        this.origin.x = (defaultOriginMode) ? this.cfg.origin.x : pointer.x;
        this.origin.y = (defaultOriginMode) ? this.cfg.origin.y : pointer.y;
        this.setVector(this.origin.x, this.origin.y, pointer.x, pointer.y);
    }

    onDragging(pointer) {
        if ((this.pointerId !== pointer.id) || (!pointer.isDown)) {
            return;
        }
        this.setVector(this.origin.x, this.origin.y, pointer.x, pointer.y);
    }

    onDrop(pointer) {
        if (this.pointerId !== pointer.id) {
            return;
        }
        this.pointerId = null;
        this.origin.x = null;
        this.origin.y = null;
        this.cleanVector();
    }

    shutdown() {
        var input = this.parent.input;
        input.removeListener('pointerdown', this.onDragStart, this);
        input.removeListener('pointerup', this.onDragStart, this);
        input.removeListener('pointermove', this.onDragStart, this);
    }

    destroy() {
        this.shutdown();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (DragCursorPlugin);

/***/ }),
/* 15 */
/*!***************************************************!*\
  !*** ./plugins/utils/input/VectorToCursorKeys.js ***!
  \***************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);


const Key = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Input.Keyboard.Key;
const GetFastValue = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Utils.Objects.GetFastValue;
const GetValue = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Utils.Objects.GetValue;
const RadToDeg = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Math.RadToDeg;

class VectorToCursorKeys {
    constructor(config) {
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        if (this.cfg == undefined) {
            this.cfg = {};
        }
        if (this.start == undefined) {
            this.start = {};
        }
        if (this.end == undefined) {
            this.end = {};
        }
        if (this.cursorKeys == undefined) {
            this.cursorKeys = {
                up: new Key(),
                down: new Key(),
                left: new Key(),
                right: new Key()
            }
        }

        this.setEnable(GetFastValue(o, 'enable', true));
        this.setMode(GetFastValue(o, 'dir', '8dir'));
        this.setDistanceThreshold(GetFastValue(o, 'distanceMin', 16));

        var startX = GetValue(o, "start.x", null);
        var startY = GetValue(o, "start.y", null);
        var endX = GetValue(o, "end.x", null);
        var endY = GetValue(o, "end.y", null);
        if ((startX !== null) &&
            (startY !== null) &&
            (endX !== null) &&
            (endY !== null)) {
            this.setVector(startX, startY, endX, endY);
        } else {
            this.cleanVector();
        }
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            enable: this.cfg.enable,
            dir: this.cfg.dirMode,
            distanceMin: this.cfg.distanceMin,            

            start: {
                x: this.start.x,
                y: this.start.y
            },
            end: {
                x: this.end.x,
                y: this.end.y
            }
        };
    }

    /**
     * Set direction mode
     * @param {number|string} m 'up&down'(0), 'left&right'(1), '4dir'(2), or '8dir'(3)
     * @returns {object} this object
     */
    setMode(m) {
        if (typeof (m) === 'string') {
            m = DIRMODE[m];
        }
        this.cfg.dirMode = m;
        return this;
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        } else {
            e = !!e;
        }
        if (e === this.cfg.enable) {
            return;
        }
        if (e === false) {
            this.cleanVector();
        }
        this.cfg.enable = e;
    }

    setDistanceThreshold(d) {
        if (d < 0) {
            d = 0;
        }
        this.cfg.distanceMin = d;
        return this;
    }

    createCursorKeys() {
        return this.cursorKeys;
    }

    setKeyState(keyName, isDown) {
        var key = this.cursorKeys[keyName];

        if (!key.enabled) {
            return;
        }

        var isUp = !isDown;
        key.isDown = isDown;
        key.isUp = isUp;

        // TBD
        //key._justDown = isDown;
        //key._justUp = isUp;
        //if (isDown) {
        //    key.timeDown = (new Date()).now();
        //    key.duration = 0;
        //    key.repeats++;
        //}
        //if (isUp) {
        //    key.timeUp = (new Date()).now();
        //    key.duration = key.timeUp - key.timeDown;
        //    key.repeats = 0;
        //}
    }

    cleanVector() {
        this.start.x = null;
        this.start.y = null;
        this.end.x = null;
        this.end.y = null;
        for (var keyName in this.cursorKeys) {
            this.setKeyState(keyName, false);
        }

        return this;
    }

    setVector(x0, y0, x1, y1) {
        if (!this.cfg.enable) {
            return this;
        }
        this.cleanVector();
        if (x0 == null) {
            return this;
        }

        this.start.x = x0;
        this.start.y = y0;
        this.end.x = x1;
        this.end.y = y1;
        var dx = x1 - x0;
        var dy = y1 - y0;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var deg = RadToDeg(Math.atan2(dy, dx)); // -180 ~ 180
        deg = (360 + deg) % 360;

        if (dist < this.cfg.distanceMin) {
            return this;
        }
        switch (this.cfg.dirMode) {
            case 0: // up & down
                var keyName = (deg < 180) ? 'down' : 'up';
                this.setKeyState(keyName, true);
                break;
            case 1: // left & right
                var keyName = ((deg > 90) && (deg <= 270)) ? 'left' : 'right';
                this.setKeyState(keyName, true);
                break;
            case 2: // 4 dir
                var keyName =
                    ((deg > 45) && (deg <= 135)) ? 'down' :
                    ((deg > 135) && (deg <= 225)) ? 'left' :
                    ((deg > 225) && (deg <= 315)) ? 'up' :
                    'right';
                this.setKeyState(keyName, true);
                break;
            case 3: // 8 dir
                if ((deg > 22.5) && (deg <= 67.5)) {
                    this.setKeyState('down', true);
                    this.setKeyState('right', true);
                } else if ((deg > 67.5) && (deg <= 112.5)) {
                    this.setKeyState('down', true);
                } else if ((deg > 112.5) && (deg <= 157.5)) {
                    this.setKeyState('down', true);
                    this.setKeyState('left', true);
                } else if ((deg > 157.5) && (deg <= 202.5)) {
                    this.setKeyState('left', true);
                } else if ((deg > 202.5) && (deg <= 247.5)) {
                    this.setKeyState('left', true);
                    this.setKeyState('up', true);
                } else if ((deg > 247.5) && (deg <= 292.5)) {
                    this.setKeyState('up', true);
                } else if ((deg > 292.5) && (deg <= 337.5)) {
                    this.setKeyState('up', true);
                    this.setKeyState('right', true);
                } else {
                    this.setKeyState('right', true);
                }
                break;
        }

        return this;
    }
}

/** @private */
const DIRMODE = {
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
};

/* harmony default export */ __webpack_exports__["a"] = (VectorToCursorKeys);

/***/ })
/******/ ]);
});