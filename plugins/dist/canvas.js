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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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
/* 1 */,
/* 2 */,
/* 3 */
/*!********************************************!*\
  !*** ./plugins/utils/system/GameObject.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */



const Components = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.GameObjects.Components;
const DataManager = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Data.DataManager;
const EventEmitter = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.EventEmitter;

/**
 * @classdesc
 * The base class that all Game Objects extend.
 * You don't create GameObjects directly and they cannot be added to the display list.
 * Instead, use them as the base for your own custom classes.
 *
 * @class GameObject
 * @memberOf Phaser.GameObjects
 * @extends EventEmitter
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object belongs.
 * @param {string} type - A textual representation of the type of Game Object, i.e. `sprite`.
 */
var GameObject = new __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Class({

    Extends: EventEmitter,

    initialize:

    function GameObject (scene, type)
    {
        EventEmitter.call(this);

        /**
         * The Scene to which this Game Object belongs.
         * Game Objects can only belong to one Scene.
         *
         * @name Phaser.GameObjects.GameObject#scene
         * @type {Phaser.Scene}
         * @protected
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * A textual representation of this Game Object, i.e. `sprite`.
         * Used internally by Phaser but is available for your own custom classes to populate.
         *
         * @name Phaser.GameObjects.GameObject#type
         * @type {string}
         * @since 3.0.0
         */
        this.type = type;

        /**
         * The name of this Game Object.
         * Empty by default and never populated by Phaser, this is left for developers to use.
         *
         * @name Phaser.GameObjects.GameObject#name
         * @type {string}
         * @default ''
         * @since 3.0.0
         */
        this.name = '';

        /**
         * The active state of this Game Object.
         * A Game Object with an active state of `true` is processed by the Scenes UpdateList, if added to it.
         * An active object is one which is having its logic and internal systems updated.
         *
         * @name Phaser.GameObjects.GameObject#active
         * @type {boolean}
         * @default true
         * @since 3.0.0
         */
        this.active = true;

        /**
         * The Tab Index of the Game Object.
         * Reserved for future use by plugins and the Input Manager.
         *
         * @name Phaser.GameObjects.GameObject#tabIndex
         * @type {integer}
         * @default -1
         * @since 3.0.0
         */
        this.tabIndex = -1;

        /**
         * A Data Manager.
         * It allows you to store, query and get key/value paired information specific to this Game Object.
         * `null` by default. Automatically created if you use `getData` or `setData` or `setDataEnabled`.
         *
         * @name Phaser.GameObjects.GameObject#data
         * @type {Phaser.Data.DataManager}
         * @default null
         * @since 3.0.0
         */
        this.data = null;

        /**
         * The flags that are compared against `RENDER_MASK` to determine if this Game Object will render or not.
         * The bits are 0001 | 0010 | 0100 | 1000 set by the components Visible, Alpha, Transform and Texture respectively.
         * If those components are not used by your custom class then you can use this bitmask as you wish.
         *
         * @name Phaser.GameObjects.GameObject#renderFlags
         * @type {integer}
         * @default 15
         * @since 3.0.0
         */
        this.renderFlags = 15;

        /**
         * A bitmask that controls if this Game Object is drawn by a Camera or not.
         * Not usually set directly. Instead call `Camera.ignore`.
         *
         * @name Phaser.GameObjects.GameObject#cameraFilter
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.cameraFilter = 0;

        /**
         * If this Game Object is enabled for input then this property will contain an InteractiveObject instance.
         * Not usually set directly. Instead call `GameObject.setInteractive()`.
         *
         * @name Phaser.GameObjects.GameObject#input
         * @type {?Phaser.Input.InteractiveObject}
         * @default null
         * @since 3.0.0
         */
        this.input = null;

        /**
         * If this Game Object is enabled for physics then this property will contain a reference to a Physics Body.
         *
         * @name Phaser.GameObjects.GameObject#body
         * @type {?Phaser.Physics.Body}
         * @default null
         * @since 3.0.0
         */
        this.body = null;

        //  Tell the Scene to re-sort the children
        this.scene.sys.queueDepthSort();
    },

    /**
     * Sets the `active` property of this Game Object and returns this Game Object for further chaining.
     * A Game Object with its `active` property set to `true` will be updated by the Scenes UpdateList.
     *
     * @method Phaser.GameObjects.GameObject#setActive
     * @since 3.0.0
     *
     * @param {boolean} value - True if this Game Object should be set as active, false if not.
     * 
     * @return {Phaser.GameObjects.GameObject} This GameObject.
     */
    setActive: function (value)
    {
        this.active = value;

        return this;
    },

    /**
     * Sets the `name` property of this Game Object and returns this Game Object for further chaining.
     * The `name` property is not populated by Phaser and is presented for your own use.
     *
     * @method Phaser.GameObjects.GameObject#setName
     * @since 3.0.0
     *
     * @param {string} value - The name to be given to this Game Object.
     * 
     * @return {Phaser.GameObjects.GameObject} This GameObject.
     */
    setName: function (value)
    {
        this.name = value;

        return this;
    },

    /**
     * [description]
     *
     * @method Phaser.GameObjects.GameObject#setDataEnabled
     * @since 3.0.0
     *
     * @return {Phaser.GameObjects.GameObject} This GameObject.
     */
    setDataEnabled: function ()
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        return this;
    },

    /**
     * This is a quick chainable alias to the `DataProxy.set` method.
     * It allows you to set a key and value in this Game Objects data store.
     *
     * @method Phaser.GameObjects.GameObject#setData
     * @since 3.0.0
     *
     * @param {string} key - The key of the property to be stored.
     * @param {any} value - The value to store with the key. Can be a string, number, array or object.
     * 
     * @return {Phaser.GameObjects.GameObject} This GameObject.
     */
    setData: function (key, value)
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        this.data.set(key, value);

        return this;
    },

    /**
     * This is a quick alias to the `DataProxy.get` method to remain consistent with `setData`.
     *
     * @method Phaser.GameObjects.GameObject#getData
     * @since 3.0.0
     *
     * @param {string} key - The key of the property to be retrieved.
     * 
     * @return {any} The data, if present in the Data Store.
     */
    getData: function (key)
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        return this.data.get(key);
    },

    /**
     * Pass this Game Object to the Input Manager to enable it for Input.
     *
     * @method Phaser.GameObjects.GameObject#setInteractive
     * @since 3.0.0
     *
     * @param {any} [shape] - A geometric shape that defines the hit area for the Game Object. If not specified a Rectangle will be used.
     * @param {function} [callback] - A callback to be invoked when the Game Object is interacted with.
     * @param {boolean} [dropZone=false] - Should this Game Object be treated as a drop zone target?
     * 
     * @return {Phaser.GameObjects.GameObject} This GameObject.
     */
    setInteractive: function (shape, callback, dropZone)
    {
        this.scene.sys.input.enable(this, shape, callback, dropZone);

        return this;
    },

    /**
     * To be overridden by custom GameObjects. Allows base objects to be used in a Pool.
     *
     * @method Phaser.GameObjects.GameObject#update
     * @since 3.0.0
     */
    update: function ()
    {
    },

    /**
     * Returns a JSON representation of the Game Object.
     *
     * @method Phaser.GameObjects.GameObject#toJSON
     * @since 3.0.0
     *
     * @return {object} A JSON representation of the Game Object.
     */
    toJSON: function ()
    {
        return Components.ToJSON(this);
    },

    /**
     * Compares the renderMask with the renderFlags to see if this Game Object will render or not.
     *
     * @method Phaser.GameObjects.GameObject#willRender
     * @since 3.0.0
     *
     * @return {boolean} True if the Game Object should be rendered, otherwise false.
     */
    willRender: function ()
    {
        return (GameObject.RENDER_MASK === this.renderFlags);
    },

    /**
     * Destroys this Game Object removing it from the Display List and Update List and
     * severing all ties to parent resources.
     * 
     * Also removes itself from the Input Manager and Physics Manager if previously enabled.
     * 
     * Use this to remove a Game Object from your game if you don't ever plan to use it again.
     * As long as no reference to it exists within your own code it should become free for
     * garbage collection by the browser.
     * 
     * If you just want to temporarily disable an object then look at using the
     * Game Object Pool instead of destroying it, as destroyed objects cannot be resurrected.
     *
     * @method Phaser.GameObjects.GameObject#destroy
     * @since 3.0.0
     */
    destroy: function ()
    {
        //  This Game Object had already been destroyed
        if (!this.scene)
        {
            return;
        }

        if (this.preDestroy)
        {
            this.preDestroy.call(this);
        }

        var sys = this.scene.sys;

        sys.displayList.remove(this);
        sys.updateList.remove(this);

        if (this.input)
        {
            sys.input.clear(this);
            this.input = undefined;
        }

        if (this.data)
        {
            this.data.destroy();

            this.data = undefined;
        }

        if (this.body)
        {
            this.body.destroy();
            this.body = undefined;
        }

        //  Tell the Scene to re-sort the children
        sys.queueDepthSort();

        this.active = false;
        this.visible = false;

        this.scene = undefined;

        this.emit('destroy');
                
        this.removeAllListeners();
    }

});

/**
 * The bitmask that `GameObject.renderFlags` is compared against to determine if the Game Object will render or not.
 *
 * @constant {integer} RENDER_MASK
 * @memberOf Phaser.GameObjects.GameObject
 * @default
 */
GameObject.RENDER_MASK = 15;

/* harmony default export */ __webpack_exports__["a"] = (GameObject);


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/*!****************************************!*\
  !*** multi ./plugins/canvas-plugin.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./plugins/canvas-plugin.js */20);


/***/ }),
/* 20 */
/*!**********************************!*\
  !*** ./plugins/canvas-plugin.js ***!
  \**********************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_CanvasPlugin_js__ = __webpack_require__(/*! ./canvas/CanvasPlugin.js */ 21);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__canvas_CanvasPlugin_js__["a" /* default */]);

/***/ }),
/* 21 */
/*!****************************************!*\
  !*** ./plugins/canvas/CanvasPlugin.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Render_js__ = __webpack_require__(/*! ./Render.js */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_system_GameObject_js__ = __webpack_require__(/*! ./../utils/system/GameObject.js */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_system_BuildGameObject__ = __webpack_require__(/*! ./../utils/system/BuildGameObject */ 25);
// copy from Phaser.GameObjects.Text



 // TODO:
 // TODO:

const CanvasPool = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Display.Canvas.Pool;
const Components = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.GameObjects.Components;
// const GameObject = Phaser.GameObjects.GameObject;
const GetAdvancedValue = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Utils.GetAdvancedValue;

var Canvas = new __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Class({

    Extends: __WEBPACK_IMPORTED_MODULE_2__utils_system_GameObject_js__["a" /* default */],

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Origin,
        Components.Pipeline,
        Components.ScaleMode,
        Components.ScrollFactor,
        Components.Size,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        __WEBPACK_IMPORTED_MODULE_1__Render_js__["a" /* default */]
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

            __WEBPACK_IMPORTED_MODULE_2__utils_system_GameObject_js__["a" /* default */].call(this, scene, 'Canvas');

            this.setPosition(x, y);
            this.initPipeline('TextureTintPipeline');

            this.canvas = CanvasPool.create(this, width, height);
            this.context = this.canvas.getContext('2d');

            this.resolution = 1; // TODO

            this.width = width;
            this.height = height;
            this.canvasTexture = null;

            this.dirty = false;

            var self = this;
            scene.sys.game.renderer.onContextRestored(function () {
                self.canvasTexture = null;
                self.dirty = true;
            });
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
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (sys.game.renderer.gl && texture) {
            texture.source[0].glTexture = sys.game.renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
        }

        return this;
    }

});

__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.GameObjects.GameObjectFactory.register('rexCanvas', function (x, y, width, height) {
    return this.displayList.add(new Canvas(this.scene, x, y, width, height));
});

__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.GameObjects.GameObjectCreator.register('rexCanvas', function (config) {
    var width = GetAdvancedValue(config, 'width', 256);
    var height = GetAdvancedValue(config, 'height', 256);
    var canvas = new Canvas(this.scene, 0, 0, width, height)
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_system_BuildGameObject__["a" /* default */])(this.scene, canvas, config);
    return canvas;
});

/* harmony default export */ __webpack_exports__["a"] = (Canvas);

/***/ }),
/* 22 */
/*!**********************************!*\
  !*** ./plugins/canvas/Render.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__WebGLRenderer_js__ = __webpack_require__(/*! ./WebGLRenderer.js */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CanvasRenderer_js__ = __webpack_require__(/*! ./CanvasRenderer.js */ 24);
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */





const NOOP = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Utils.NOOP;
var renderWebGL = NOOP;
var renderCanvas = NOOP;

if (WEBGL_RENDERER)
{
    renderWebGL = __WEBPACK_IMPORTED_MODULE_1__WebGLRenderer_js__["a" /* default */];
}

if (CANVAS_RENDERER)
{
    renderCanvas = __WEBPACK_IMPORTED_MODULE_2__CanvasRenderer_js__["a" /* default */];
}

/* harmony default export */ __webpack_exports__["a"] = ({

    renderWebGL: renderWebGL,
    renderCanvas: renderCanvas

});


/***/ }),
/* 23 */
/*!*****************************************!*\
  !*** ./plugins/canvas/WebGLRenderer.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_system_GameObject_js__ = __webpack_require__(/*! ./../utils/system/GameObject.js */ 3);
// copy from Phaser.GameObjects.Text


  // TODO:

var WebGLRenderer = function (renderer, src, interpolationPercentage, camera)
{
    if (__WEBPACK_IMPORTED_MODULE_1__utils_system_GameObject_js__["a" /* default */].RENDER_MASK !== src.renderFlags || (src.cameraFilter > 0 && (src.cameraFilter & camera._id)))
    {
        return;
    }
    
    if (src.dirty)
    {
        src.canvasTexture = renderer.canvasToTexture(src.canvas, src.canvasTexture, true, src.scaleMode);
        src.dirty = false;
    }

    this.pipeline.batchText(this, camera);
};

/* harmony default export */ __webpack_exports__["a"] = (WebGLRenderer);

/***/ }),
/* 24 */
/*!******************************************!*\
  !*** ./plugins/canvas/CanvasRenderer.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_system_GameObject_js__ = __webpack_require__(/*! ./../utils/system/GameObject.js */ 3);
// copy from Phaser.GameObjects.Text


  // TODO:

var CanvasRenderer = function (renderer, src, interpolationPercentage, camera)
{
    if (__WEBPACK_IMPORTED_MODULE_1__utils_system_GameObject_js__["a" /* default */].RENDER_MASK !== src.renderFlags || (src.cameraFilter > 0 && (src.cameraFilter & camera._id)))
    {
        return;
    }
    
    var ctx = renderer.currentContext;

    // var resolution = src.resolution;

    //  Blend Mode
    if (renderer.currentBlendMode !== src.blendMode)
    {
        renderer.currentBlendMode = src.blendMode;
        ctx.globalCompositeOperation = renderer.blendModes[src.blendMode];
    }

    //  Alpha
    if (renderer.currentAlpha !== src.alpha)
    {
        renderer.currentAlpha = src.alpha;
        ctx.globalAlpha = src.alpha;
    }

    //  Smoothing
    if (renderer.currentScaleMode !== src.scaleMode)
    {
        renderer.currentScaleMode = src.scaleMode;
    }

    var canvas = src.canvas;

    ctx.save();

    var tx = src.x - camera.scrollX * src.scrollFactorX;
    var ty = src.y - camera.scrollY * src.scrollFactorY;

    if (renderer.config.roundPixels)
    {
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

/***/ }),
/* 25 */
/*!*************************************************!*\
  !*** ./plugins/utils/system/BuildGameObject.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */


const BlendModes = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Renderer.BlendModes;
const GetAdvancedValue = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Utils.GetAdvancedValue;
const ScaleModes = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Renderer.ScaleModes;

/**
 * Builds a Game Object using the provided configuration object.
 *
 * @function Phaser.Gameobjects.BuildGameObject
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - [description]
 * @param {Phaser.GameObjects.GameObject} gameObject - [description]
 * @param {object} config - [description]
 *
 * @return {Phaser.GameObjects.GameObject} The built Game Object.
 */
var BuildGameObject = function (scene, gameObject, config)
{
    //  Position

    gameObject.x = GetAdvancedValue(config, 'x', 0);
    gameObject.y = GetAdvancedValue(config, 'y', 0);
    gameObject.depth = GetAdvancedValue(config, 'depth', 0);

    //  Flip

    gameObject.flipX = GetAdvancedValue(config, 'flipX', false);
    gameObject.flipY = GetAdvancedValue(config, 'flipY', false);

    //  Scale
    //  Either: { scale: 2 } or { scale: { x: 2, y: 2 }}

    var scale = GetAdvancedValue(config, 'scale', null);

    if (typeof scale === 'number')
    {
        gameObject.setScale(scale);
    }
    else if (scale !== null)
    {
        gameObject.scaleX = GetAdvancedValue(scale, 'x', 1);
        gameObject.scaleY = GetAdvancedValue(scale, 'y', 1);
    }

    //  ScrollFactor
    //  Either: { scrollFactor: 2 } or { scrollFactor: { x: 2, y: 2 }}

    var scrollFactor = GetAdvancedValue(config, 'scrollFactor', null);

    if (typeof scrollFactor === 'number')
    {
        gameObject.setScrollFactor(scrollFactor);
    }
    else if (scrollFactor !== null)
    {
        gameObject.scrollFactorX = GetAdvancedValue(scrollFactor, 'x', 1);
        gameObject.scrollFactorY = GetAdvancedValue(scrollFactor, 'y', 1);
    }

    //  Rotation

    gameObject.rotation = GetAdvancedValue(config, 'rotation', 0);

    var angle = GetAdvancedValue(config, 'angle', null);

    if (angle !== null)
    {
        gameObject.angle = angle;
    }

    //  Alpha

    gameObject.alpha = GetAdvancedValue(config, 'alpha', 1);

    //  Origin
    //  Either: { origin: 0.5 } or { origin: { x: 0.5, y: 0.5 }}

    var origin = GetAdvancedValue(config, 'origin', null);

    if (typeof origin === 'number')
    {
        gameObject.setOrigin(origin);
    }
    else if (origin !== null)
    {
        var ox = GetAdvancedValue(origin, 'x', 0.5);
        var oy = GetAdvancedValue(origin, 'y', 0.5);

        gameObject.setOrigin(ox, oy);
    }

    //  ScaleMode

    gameObject.scaleMode = GetAdvancedValue(config, 'scaleMode', ScaleModes.DEFAULT);

    //  BlendMode

    gameObject.blendMode = GetAdvancedValue(config, 'blendMode', BlendModes.NORMAL);

    //  Visible

    gameObject.visible = GetAdvancedValue(config, 'visible', true);

    //  Add to Scene

    var add = GetAdvancedValue(config, 'add', true);

    if (add)
    {
        scene.sys.displayList.add(gameObject);
    }

    if (gameObject.preUpdate)
    {
        scene.sys.updateList.add(gameObject);
    }

    return gameObject;
};

/* harmony default export */ __webpack_exports__["a"] = (BuildGameObject);

/***/ })
/******/ ]);
});