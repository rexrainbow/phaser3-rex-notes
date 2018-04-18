(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************************!*\
  !*** ./plugins/canvas-plugin.js ***!
  \**********************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_CanvasPlugin_js__ = __webpack_require__(/*! ./canvas/CanvasPlugin.js */ 1);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__canvas_CanvasPlugin_js__["a" /* default */]);

/***/ }),
/* 1 */
/*!****************************************!*\
  !*** ./plugins/canvas/CanvasPlugin.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasRender_js__ = __webpack_require__(/*! ./CanvasRender.js */ 2);
// copy from Phaser.GameObjects.Text



const CanvasPool = Phaser.Display.Canvas.Pool;
const Components = Phaser.GameObjects.Components;
const GameObject = Phaser.GameObjects.GameObject;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

var Canvas = new Phaser.Class({

    Extends: GameObject,

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Origin,
        Components.Pipeline,
        Components.ScaleMode,
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        __WEBPACK_IMPORTED_MODULE_0__CanvasRender_js__["a" /* default */]
    ],

    initialize:

        function Canvas(scene, x, y, width, height) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 256;
            }
            if (height === undefined) {
                height = 256;
            }

            GameObject.call(this, scene, 'Canvas');

            this.resolution = 1; // TODO
            this.canvas = CanvasPool.create(this, width, height);
            this.context = this.canvas.getContext('2d');
            this.canvasTexture = null;
            this.dirty = true;

            this.setPosition(x, y);
            this.setSize(width, height);
            this.setOrigin();
            this.initPipeline('TextureTintPipeline');

            if (scene.sys.game.config.renderType === Phaser.WEBGL) {
                scene.sys.game.renderer.onContextRestored(function () {
                    this.canvasTexture = null;
                    this.dirty = true;
                }, this);
            }
        },

    getCanvas: function (readOnly) {
        if (!readOnly) {
            this.dirty = true;
        }
        return this.canvas;
    },

    needRedraw: function () {
        this.dirty = true;
    },

    clear: function () {
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return this;
    },

    fill: function (color) {
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return this;
    },

    preDestroy: function () {
        CanvasPool.remove(this.canvas);
    },

    generateTexture: function (key, x, y, width, height) {
        var srcCanvas = this.canvas;
        var sys = this.scene.sys;
        var texture;

        if (x === undefined) {
            x = 0;
        }

        if (y === undefined) {
            y = 0;
        }

        if (width === undefined) {
            width = srcCanvas.width;
        }

        if (height === undefined) {
            height = srcCanvas.height;
        }


        if (sys.textures.exists(key)) {
            texture = sys.textures.get(key);
        } else {
            texture = sys.textures.createCanvas(key, srcCanvas.width, srcCanvas.height);
        }

        var destCanvas = texture.getSourceImage();
        if (destCanvas.width !== width) {
            destCanvas.width = width;
        }
        if (destCanvas.height !== height) {
            destCanvas.height = height;
        }

        var destCtx = destCanvas.getContext('2d');
        destCtx.clearRect(0, 0, width, height)
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (sys.game.renderer.gl && texture) {
            texture.source[0].glTexture = sys.game.renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
        }

        return this;
    },

    loadTexture: function (key, resize) {
        var sys = this.scene.sys;
        if (!sys.textures.exists(key)) {
            return this;
        }

        if (resize === undefined) {
            resize = true;
        }
        var srcCanvas = sys.textures.get(key).getSourceImage();
        var srcCtx = srcCanvas.getContext('2d');
        var destCanvas = this.canvas;
        if (destCanvas.width !== srcCanvas.width) {
            destCanvas.width = srcCanvas.width;
        }
        if (destCanvas.height !== srcCanvas.height) {
            destCanvas.height = srcCanvas.height;
        }
        destCtx.clearRect(0, 0, destCanvas.width, destCanvas.height);
        destCtx.drawImage(srcCanvas, 0, 0, destCanvas.width, destCanvas.height);
        this.dirty = true;

        if (resize) {
            this.setSize(destCanvas.width, destCanvas.height);
        }
        return this;
    }

});

Phaser.GameObjects.GameObjectFactory.register('rexCanvas', function (x, y, width, height) {
    return this.displayList.add(new Canvas(this.scene, x, y, width, height));
});

Phaser.GameObjects.GameObjectCreator.register('rexCanvas', function (config) {
    var width = GetAdvancedValue(config, 'width', 256);
    var height = GetAdvancedValue(config, 'height', 256);
    var canvas = new Canvas(this.scene, 0, 0, width, height)
    BuildGameObject(this.scene, canvas, config);
    var fillColor = GetAdvancedValue(config, 'fill', null);
    canvas.fill(fillColor);
    return canvas;
});

/* harmony default export */ __webpack_exports__["a"] = (Canvas);

/***/ }),
/* 2 */
/*!****************************************!*\
  !*** ./plugins/canvas/CanvasRender.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasWebGLRenderer_js__ = __webpack_require__(/*! ./CanvasWebGLRenderer.js */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CanvasCanvasRenderer_js__ = __webpack_require__(/*! ./CanvasCanvasRenderer.js */ 4);
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */




const NOOP = Phaser.Utils.NOOP;
var renderWebGL = NOOP;
var renderCanvas = NOOP;

if (WEBGL_RENDERER) {
    renderWebGL = __WEBPACK_IMPORTED_MODULE_0__CanvasWebGLRenderer_js__["a" /* default */];
}

if (CANVAS_RENDERER) {
    renderCanvas = __WEBPACK_IMPORTED_MODULE_1__CanvasCanvasRenderer_js__["a" /* default */];
}

/* harmony default export */ __webpack_exports__["a"] = ({

    renderWebGL: renderWebGL,
    renderCanvas: renderCanvas

});

/***/ }),
/* 3 */
/*!***********************************************!*\
  !*** ./plugins/canvas/CanvasWebGLRenderer.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// copy from Phaser.GameObjects.Text

const GameObject = Phaser.GameObjects.GameObject;

var WebGLRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix) {
    if (GameObject.RENDER_MASK !== src.renderFlags || (src.cameraFilter > 0 && (src.cameraFilter & camera._id))) {
        return;
    }

    if (src.dirty) {
        src.canvasTexture = renderer.canvasToTexture(src.canvas, src.canvasTexture, true, src.scaleMode);
        src.dirty = false;
    }

    this.pipeline.batchText(this, camera, parentMatrix);
};

/* harmony default export */ __webpack_exports__["a"] = (WebGLRenderer);

/***/ }),
/* 4 */
/*!************************************************!*\
  !*** ./plugins/canvas/CanvasCanvasRenderer.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// copy from Phaser.GameObjects.Text

const GameObject = Phaser.GameObjects.GameObject;

var CanvasRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix) {
    if (GameObject.RENDER_MASK !== src.renderFlags || (src.cameraFilter > 0 && (src.cameraFilter & camera._id))) {
        return;
    }

    var ctx = renderer.currentContext;

    // var resolution = src.resolution;

    //  Blend Mode
    if (renderer.currentBlendMode !== src.blendMode) {
        renderer.currentBlendMode = src.blendMode;
        ctx.globalCompositeOperation = renderer.blendModes[src.blendMode];
    }

    //  Alpha
    if (renderer.currentAlpha !== src.alpha) {
        renderer.currentAlpha = src.alpha;
        ctx.globalAlpha = src.alpha;
    }

    //  Smoothing
    if (renderer.currentScaleMode !== src.scaleMode) {
        renderer.currentScaleMode = src.scaleMode;
    }

    var canvas = src.canvas;

    ctx.save();

    if (parentMatrix !== undefined) {
        var matrix = parentMatrix.matrix;
        ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    }


    var tx = src.x - camera.scrollX * src.scrollFactorX;
    var ty = src.y - camera.scrollY * src.scrollFactorY;

    if (renderer.config.roundPixels) {
        tx |= 0;
        ty |= 0;
    }

    ctx.translate(tx, ty);

    ctx.rotate(src.rotation);

    ctx.scale(src.scaleX, src.scaleY);

    ctx.translate(canvas.width * (src.flipX ? 1 : 0), canvas.height * (src.flipY ? 1 : 0));

    ctx.scale(src.flipX ? -1 : 1, src.flipY ? -1 : 1);

    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, -src.displayOriginX, -src.displayOriginY, canvas.width, canvas.height);

    ctx.restore();
};

/* harmony default export */ __webpack_exports__["a"] = (CanvasRenderer);

/***/ })
/******/ ]);
});