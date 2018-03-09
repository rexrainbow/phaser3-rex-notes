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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/*!*************************!*\
  !*** external "phaser" ***!
  \*************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 16:
/*!******************************************!*\
  !*** multi ./plugins/dragdrop-plugin.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./plugins/dragdrop-plugin.js */17);


/***/ }),

/***/ 17:
/*!************************************!*\
  !*** ./plugins/dragdrop-plugin.js ***!
  \************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dragdrop_DragDropPlugin_js__ = __webpack_require__(/*! ./dragdrop/DragDropPlugin.js */ 18);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__dragdrop_DragDropPlugin_js__["a" /* default */]);

/***/ }),

/***/ 18:
/*!********************************************!*\
  !*** ./plugins/dragdrop/DragDropPlugin.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);



//import GetEventEmmiter from './../utils/system/GetEventEmmiter.js';

const GetFastValue = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Utils.Objects.GetFastValue;

class DragDropPlugin {
    constructor(gameobject, config) {
        this.gameobject = gameobject;
        this.scene = gameobject.scene;
        this.boot();

        this.enable = null;
        this.isDragging = false;
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.setEnable(GetFastValue(o, "enable", true));
        this.setAxisMode(GetFastValue(o, "axis", 0));
        this.setAxisRotation(GetFastValue(o, "rotation", 0));
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            enable: this.enable,
            isDragging: this.isDragging,
            axis: this.axisMode,
            rotation: this.axisRotation
        };
    }

    boot() {
        //var eventEmitter = GetEventEmmiter(this.gameobject);
        //if (eventEmitter) {
        //    eventEmitter.on('shutdown', this.shutdown, this);
        //    eventEmitter.on('destroy', this.destroy, this);
        //}                

        this.init();
    }

    init() {
        this.gameobject.on('drag', this.onDraggingStart, this);
        this.gameobject.on('drag', this.onDragging, this);
        this.gameobject.on('drop', this.onDrop, this);
    }

    shutdown() {
        // gameobject event 'drag' will be removed when this gameobject destroyed
    }

    destroy() {
        this.shutdown();
    }

    setEnable(e) {
        if (this.enable === null) {
            this.gameobject.setInteractive(); // only need setInteractive once
        }

        e = !!e;
        if (this.enable === e) {
            return this;
        }

        this.enable = e;
        this.scene.input.setDraggable(this.gameobject, e);
        return this;
    }

    setAxisMode(m) {
        if (typeof (m) === 'string') {
            m = AXISMODE[m];
        }
        this.axisMode = m;
        return this;
    }

    setAxisRotation(a) {
        this.axisRotation = a;
        return this;
    }

    forceDropping() {
        this.isDragging = false;
    }

    onDraggingStart(pointer, dragX, dragY) {
        this.isDragging = true;
    }

    onDragging(pointer, dragX, dragY) {
        if (!this.isDragging) {
            return;
        }

        var gameobject = this.gameobject;
        if (this.axisMode === 0) {
            gameobject.x = dragX;
            gameobject.y = dragY;
        } else if (this.axisRotation === 0) {
            if (this.axisMode === 1) {
                gameobject.x = dragX;
            } else if (this.axisMode === 2) {
                gameobject.y = dragY;
            }
        } else {
            P0.x = gameobject.x;
            P0.y = gameobject.y;
            P1.x = dragX;
            P1.y = dragY;
            rotatePoint(P1, P0, -this.axisRotation);

            if (this.axisMode === 1) {
                P1.y = P0.y;
            } else if (this.axisMode === 2) {
                P1.x = P0.x;
            }
            rotatePoint(P1, P0, this.axisRotation);
            gameobject.x = P1.x;
            gameobject.y = P1.y;
        }

    }

    onDrop (pointer, target) {
        this.isDragging = false;
    }
}

var P0 = {};
var P1 = {};
var rotatePoint = function (p1, p0, rad) {
    var dx = p1.x - p0.x;
    var dy = p1.y - p0.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var newRad = Math.atan2(dy, dx) + rad;
    p1.x = p0.x + (dist * Math.cos(newRad));
    p1.y = p0.y + (dist * Math.sin(newRad));
    return p1;
}

/** @private */
const AXISMODE = {
    'both': 0,
    'h&v': 0,
    'horizontal': 1,
    'h': 1,
    'vertical': 2,
    'v': 2
};


/* harmony default export */ __webpack_exports__["a"] = (DragDropPlugin);

/***/ })

/******/ });
});