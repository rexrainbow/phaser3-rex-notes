(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdynamictext = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  // copy from Phaser.GameObjects.Text
  var Utils = Phaser.Renderer.WebGL.Utils;

  var WebGLRenderer = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateTexture();
      src.dirty = false;
    }

    if (src.width === 0 || src.height === 0) {
      return;
    }

    camera.addToRenderList(src);
    var frame = src.frame;
    var width = frame.width;
    var height = frame.height;
    var getTint = Utils.getTintAppendFloatAlpha;
    var pipeline = renderer.pipelines.set(src.pipeline, src);
    var textureUnit = pipeline.setTexture2D(frame.glTexture, src);
    renderer.pipelines.preBatch(src);
    pipeline.batchTexture(src, frame.glTexture, width, height, src.x, src.y, width / src.resolution, height / src.resolution, src.scaleX, src.scaleY, src.rotation, src.flipX, src.flipY, src.scrollFactorX, src.scrollFactorY, src.displayOriginX, src.displayOriginY, 0, 0, width, height, getTint(src.tintTopLeft, camera.alpha * src._alphaTL), getTint(src.tintTopRight, camera.alpha * src._alphaTR), getTint(src.tintBottomLeft, camera.alpha * src._alphaBL), getTint(src.tintBottomRight, camera.alpha * src._alphaBR), src.tintFill, 0, 0, camera, parentMatrix, false, textureUnit);
    renderer.pipelines.postBatch(src);
  };

  // copy from Phaser.GameObjects.Text
  var CanvasRenderer = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateTexture();
      src.dirty = false;
    }

    if (src.width === 0 || src.height === 0) {
      return;
    }

    camera.addToRenderList(src);
    renderer.batchSprite(src, src.frame, camera, parentMatrix);
  };

  var Render = {
    renderWebGL: WebGLRenderer,
    renderCanvas: CanvasRenderer
  };

  var Color = Phaser.Display.Color;
  var CanvasMethods = {
    clear: function clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    },
    fill: function fill(color) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    },
    loadFromURL: function loadFromURL(url, callback) {
      var self = this;
      var img = new Image();

      img.onload = function () {
        if (self.width !== img.width || self.height !== img.height) {
          self.resize(img.width, img.height);
        } else {
          self.clear();
        }

        self.context.drawImage(img, 0, 0);
        self.updateTexture();

        if (callback) {
          callback();
        }

        img.onload = null;
        img.src = '';
        img.remove();
      };

      img.src = url;
      return this;
    },
    loadFromURLPromise: function loadFromURLPromise(url) {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.loadFromURL(url, resolve);
      });
    },
    getDataURL: function getDataURL(type, encoderOptions) {
      return this.canvas.toDataURL(type, encoderOptions);
    },
    getPixel: function getPixel(x, y, out) {
      if (out === undefined) {
        out = new Color();
      }

      var rgb = this.context.getImageData(x, y, 1, 1);
      out.setTo(rgb.data[0], rgb.data[1], rgb.data[2], rgb.data[3]);
      return out;
    },
    setPixel: function setPixel(x, y, r, g, b, a) {
      if (typeof r !== 'number') {
        var color = r;
        r = color.red;
        g = color.green;
        b = color.blue;
        a = color.alpha;
      }

      if (a === undefined) {
        a = r !== 0 || g !== 0 || b !== 0 ? 255 : 0;
      }

      var imgData = this.context.createImageData(1, 1);
      imgData.data[0] = r;
      imgData.data[1] = g;
      imgData.data[2] = b;
      imgData.data[3] = a;
      this.context.putImageData(imgData, x, y);
      this.dirty = true;
      return this;
    }
  };

  var CopyCanvasToTexture = function CopyCanvasToTexture(scene, srcCanvas, key, x, y, width, height) {
    var textures = scene.textures;
    var renderer = scene.renderer;

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

    var texture;

    if (textures.exists(key)) {
      texture = textures.get(key);
    } else {
      texture = textures.createCanvas(key, width, height);
    }

    var destCanvas = texture.getSourceImage();

    if (destCanvas.width !== width) {
      destCanvas.width = width;
    }

    if (destCanvas.height !== height) {
      destCanvas.height = height;
    }

    var destCtx = destCanvas.getContext('2d');
    destCtx.clearRect(0, 0, width, height);
    destCtx.drawImage(srcCanvas, x, y, width, height);

    if (renderer.gl && texture) {
      renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
    }
  };

  var TextureMethods = {
    updateTexture: function updateTexture(callback, scope) {
      if (callback) {
        if (scope) {
          callback.call(scope, this.canvas, this.context);
        } else {
          callback(this.canvas, this.context);
        }
      }

      if (this.canvas.width !== this.frame.width || this.canvas.height !== this.frame.height) {
        this.frame.setSize(this.canvas.width, this.canvas.height);
      }

      if (this.renderer.gl) {
        this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
        this.frame.glTexture = this.frame.source.glTexture;
      }

      this.dirty = false;
      var input = this.input;

      if (input && !input.customHitArea) {
        input.hitArea.width = this.width;
        input.hitArea.height = this.height;
      }

      return this;
    },
    generateTexture: function generateTexture(key, x, y, width, height) {
      var srcCanvas = this.canvas;

      if (width === undefined) {
        width = srcCanvas.width;
      } else {
        width *= this.resolution;
      }

      if (height === undefined) {
        height = srcCanvas.height;
      } else {
        height *= this.resolution;
      }

      CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);
      return this;
    },
    loadTexture: function loadTexture(key, frame) {
      var textureFrame = this.scene.textures.getFrame(key, frame);

      if (!textureFrame) {
        return this;
      }

      if (this.width !== textureFrame.cutWidth || this.height !== textureFrame.cutHeight) {
        this.resize(textureFrame.cutWidth, textureFrame.cutHeight);
      } else {
        this.clear();
      }

      this.context.drawImage(textureFrame.source.image, textureFrame.cutX, textureFrame.cutY, textureFrame.cutWidth, textureFrame.cutHeight, 0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    }
  };

  var CanvasPool = Phaser.Display.Canvas.CanvasPool;
  var GameObject = Phaser.GameObjects.GameObject;

  var Canvas = /*#__PURE__*/function (_GameObject) {
    _inherits(Canvas, _GameObject);

    var _super = _createSuper(Canvas);

    function Canvas(scene, x, y, width, height) {
      var _this;

      _classCallCheck(this, Canvas);

      if (x === undefined) {
        x = 0;
      }

      if (y === undefined) {
        y = 0;
      }

      if (width === undefined) {
        width = 1;
      }

      if (height === undefined) {
        height = 1;
      }

      _this = _super.call(this, scene, 'rexCanvas');
      _this.renderer = scene.sys.game.renderer;
      _this.resolution = 1;
      _this._width = width;
      _this._height = height;
      width = Math.max(Math.ceil(width * _this.resolution), 1);
      height = Math.max(Math.ceil(height * _this.resolution), 1);
      _this.canvas = CanvasPool.create(_assertThisInitialized(_this), width, height);
      _this.context = _this.canvas.getContext('2d');
      _this.dirty = false;

      _this.setPosition(x, y);

      _this.setOrigin(0.5, 0.5);

      _this.initPipeline();

      _this._crop = _this.resetCropObject(); //  Create a Texture for this Text object

      _this.texture = scene.sys.textures.addCanvas(null, _this.canvas, true); //  Get the frame

      _this.frame = _this.texture.get(); //  Set the resolution

      _this.frame.source.resolution = _this.resolution;

      if (_this.renderer && _this.renderer.gl) {
        //  Clear the default 1x1 glTexture, as we override it later
        _this.renderer.deleteTexture(_this.frame.source.glTexture);

        _this.frame.source.glTexture = null;
      }

      _this.dirty = true;
      scene.sys.game.events.on('contextrestored', _this.onContextRestored, _assertThisInitialized(_this));
      return _this;
    }

    _createClass(Canvas, [{
      key: "onContextRestored",
      value: function onContextRestored() {
        this.dirty = true;
      }
    }, {
      key: "preDestroy",
      value: function preDestroy() {
        this.scene.sys.game.events.off('contextrestored', this.onContextRestored, this);
        CanvasPool.remove(this.canvas);
        this.texture.destroy();
        this.canvas = null;
        this.context = null;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.setSize(value, this._height);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.setSize(this._width, value);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        if (this._width === width && this._height === height) {
          return this;
        }

        this._width = width;
        this._height = height;
        this.updateDisplayOrigin();
        width = Math.max(Math.ceil(width * this.resolution), 1);
        height = Math.max(Math.ceil(height * this.resolution), 1);
        this.canvas.width = width;
        this.canvas.height = height;
        this.frame.setSize(width, height);
        this.dirty = true;
        return this;
      }
    }, {
      key: "displayWidth",
      get: function get() {
        return this.scaleX * this._width;
      },
      set: function set(value) {
        this.scaleX = value / this._width;
      }
    }, {
      key: "displayHeight",
      get: function get() {
        return this.scaleY * this._height;
      },
      set: function set(value) {
        this.scaleY = value / this._height;
      }
    }, {
      key: "setDisplaySize",
      value: function setDisplaySize(width, height) {
        this.displayWidth = width;
        this.displayHeight = height;
        return this;
      }
    }, {
      key: "getCanvas",
      value: function getCanvas(readOnly) {
        if (!readOnly) {
          this.dirty = true;
        }

        return this.canvas;
      }
    }, {
      key: "getContext",
      value: function getContext(readOnly) {
        if (!readOnly) {
          this.dirty = true;
        }

        return this.context;
      }
    }, {
      key: "needRedraw",
      value: function needRedraw() {
        this.dirty = true;
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }]);

    return Canvas;
  }(GameObject);

  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Canvas, [Components.Alpha, Components.BlendMode, Components.Crop, Components.Depth, Components.Flip, Components.GetBounds, Components.Mask, Components.Origin, Components.Pipeline, Components.ScrollFactor, Components.Tint, Components.Transform, Components.Visible, Render, CanvasMethods, TextureMethods]);

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */
  //  Source object
  //  The key as a string, or an array of keys, i.e. 'banner', or 'banner.hideBanner'
  //  The default value to use if the key doesn't exist

  /**
   * Retrieves a value from an object.
   *
   * @function Phaser.Utils.Objects.GetValue
   * @since 3.0.0
   *
   * @param {object} source - The object to retrieve the value from.
   * @param {string} key - The name of the property to retrieve from the object. If a property is nested, the names of its preceding properties should be separated by a dot (`.`) - `banner.hideBanner` would return the value of the `hideBanner` property from the object stored in the `banner` property of the `source` object.
   * @param {*} defaultValue - The value to return if the `key` isn't found in the `source` object.
   *
   * @return {*} The value of the requested key.
   */
  var GetValue$9 = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue; //  Use for loop here so we can break early

      for (var i = 0; i < keys.length; i++) {
        if (parent.hasOwnProperty(keys[i])) {
          //  Yes it has a key property, let's carry on down
          value = parent[keys[i]];
          parent = parent[keys[i]];
        } else {
          //  Can't go any further, so reset to default
          value = defaultValue;
          break;
        }
      }

      return value;
    } else {
      return defaultValue;
    }
  };

  var Clear = function Clear(obj) {
    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }
  };

  /**
   * Shallow Object Clone. Will not out nested objects.
   * @param {object} obj JSON object
   * @param {object} ret JSON object to return, set null to return a new object
   * @returns {object} this object
   */

  var Clone = function Clone(obj, out) {
    var objIsArray = Array.isArray(obj);

    if (out === undefined) {
      out = objIsArray ? [] : {};
    } else {
      Clear(out);
    }

    if (objIsArray) {
      out.length = obj.length;

      for (var i = 0, cnt = obj.length; i < cnt; i++) {
        out[i] = obj[i];
      }
    } else {
      for (var key in obj) {
        out[key] = obj[key];
      }
    }

    return out;
  };

  var DataMethods = {
    enableData: function enableData() {
      if (this.data === undefined) {
        this.data = {};
      }

      return this;
    },
    getData: function getData(key, defaultValue) {
      this.enableData();
      return key === undefined ? this.data : GetValue$9(this.data, key, defaultValue);
    },
    setData: function setData(key, value) {
      this.enableData();

      if (arguments.length === 1) {
        var data = key;

        for (key in data) {
          this.data[key] = data[key];
        }
      } else {
        this.data[key] = value;
      }

      return this;
    },
    incData: function incData(key, inc, defaultValue) {
      if (defaultValue === undefined) {
        defaultValue = 0;
      }

      this.enableData();
      this.setData(key, this.getData(key, defaultValue) + inc);
      return this;
    },
    mulData: function mulData(key, mul, defaultValue) {
      if (defaultValue === undefined) {
        defaultValue = 0;
      }

      this.enableData();
      this.setData(key, this.getData(key, defaultValue) * mul);
      return this;
    },
    clearData: function clearData() {
      if (this.data) {
        Clear(this.data);
      }

      return this;
    },
    resetData: function resetData(data) {
      this.clearData();

      if (data) {
        this.enableData();

        for (var key in data) {
          this.data[key] = data[key];
        }
      }

      return this;
    },
    cloneData: function cloneData() {
      if (this.data) {
        return Clone(this.data);
      } else {
        return {};
      }
    }
  };

  var DegToRad$1 = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var GetValue$8 = Phaser.Utils.Objects.GetValue;

  var Base = /*#__PURE__*/function () {
    function Base(parent, type) {
      _classCallCheck(this, Base);

      this.setParent(parent);
      this.type = type;
      this.setActive().setVisible().setAlpha(1).setPosition(0, 0).setRotation(0).setScale(1, 1).setLeftSpace(0).setRightSpace(0).setOrigin(0).setDrawBelowCallback().setDrawAboveCallback();
      this.originX = 0;
      this.offsetX = 0; // Override

      this.offsetY = 0; // Override
    }

    _createClass(Base, [{
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent;
        return this;
      }
    }, {
      key: "scene",
      get: function get() {
        return this.parent.scene;
      }
    }, {
      key: "canvas",
      get: function get() {
        return this.parent ? this.parent.canvas : null;
      }
    }, {
      key: "context",
      get: function get() {
        return this.parent ? this.parent.context : null;
      }
    }, {
      key: "setDirty",
      value: function setDirty(dirty) {
        if (dirty && this.parent) {
          this.parent.dirty = true;
        }

        return this;
      }
    }, {
      key: "active",
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        this.setDirty(this._active != value);
        this._active = value;
      }
    }, {
      key: "setActive",
      value: function setActive(active) {
        if (active === undefined) {
          active = true;
        }

        this.active = active;
        return this;
      }
    }, {
      key: "visible",
      get: function get() {
        return this._visible;
      },
      set: function set(value) {
        this.setDirty(this._visible != value);
        this._visible = value;
      }
    }, {
      key: "setVisible",
      value: function setVisible(visible) {
        if (visible === undefined) {
          visible = true;
        }

        this.visible = visible;
        return this;
      }
    }, {
      key: "alpha",
      get: function get() {
        return this._alpha;
      },
      set: function set(value) {
        this.setDirty(this._alpha != value);
        this._alpha = value;
      }
    }, {
      key: "setAlpha",
      value: function setAlpha(alpha) {
        this.alpha = alpha;
        return this;
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.setDirty(this._x != value);
        this._x = value;
      }
    }, {
      key: "setX",
      value: function setX(x) {
        this.x = x;
        return this;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.setDirty(this._y != value);
        this._y = value;
      }
    }, {
      key: "setY",
      value: function setY(y) {
        this.y = y;
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "rotation",
      get: function get() {
        return this._rotation;
      },
      set: function set(value) {
        this.setDirty(this._rotation != value);
        this._rotation = value;
      }
    }, {
      key: "setRotation",
      value: function setRotation(rotation) {
        this.rotation = rotation;
        return this;
      }
    }, {
      key: "angle",
      get: function get() {
        return RadToDeg(this._rotation);
      },
      set: function set(value) {
        this.rotation = DegToRad$1(value);
      }
    }, {
      key: "setAngle",
      value: function setAngle(angle) {
        this.angle = angle;
        return this;
      }
    }, {
      key: "scaleX",
      get: function get() {
        return this._scaleX;
      },
      set: function set(value) {
        this.setDirty(this._scaleX !== value);
        this._scaleX = value;
      }
    }, {
      key: "setScaleX",
      value: function setScaleX(scaleX) {
        this.scaleX = scaleX;
        return this;
      } // Override

    }, {
      key: "width",
      get: function get() {
        return 0;
      } // Override
      ,
      set: function set(value) {}
    }, {
      key: "setWidth",
      value: function setWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }

        this.width = width;

        if (keepAspectRatio) {
          this.scaleY = this.scaleX;
        }

        return this;
      }
    }, {
      key: "leftSpace",
      get: function get() {
        return this._leftSpace;
      },
      set: function set(value) {
        this.setDirty(this._leftSpace !== value);
        this._leftSpace = value;
      }
    }, {
      key: "setLeftSpace",
      value: function setLeftSpace(value) {
        this.leftSpace = value;
        return this;
      }
    }, {
      key: "rightSpace",
      get: function get() {
        return this._rightSpace;
      },
      set: function set(value) {
        this.setDirty(this._rightSpace !== value);
        this._rightSpace = value;
      }
    }, {
      key: "setRightSpace",
      value: function setRightSpace(value) {
        this.rightSpace = value;
        return this;
      }
    }, {
      key: "outerWidth",
      get: function get() {
        return this.width + this.leftSpace + this.rightSpace;
      }
    }, {
      key: "scaleY",
      get: function get() {
        return this._scaleY;
      },
      set: function set(value) {
        this.setDirty(this._scaleY !== value);
        this._scaleY = value;
      }
    }, {
      key: "setScaleY",
      value: function setScaleY(scaleY) {
        this.scaleY = scaleY;
        return this;
      } // Override

    }, {
      key: "height",
      get: function get() {
        return 0;
      } // Override
      ,
      set: function set(value) {}
    }, {
      key: "setHeight",
      value: function setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }

        this.height = height;

        if (keepAspectRatio) {
          this.scaleX = this.scaleY;
        }

        return this;
      }
    }, {
      key: "setScale",
      value: function setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
          scaleY = scaleX;
        }

        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (!o) {
          return this;
        }

        if (o.hasOwnProperty('x')) {
          this.setX(o.x);
        }

        if (o.hasOwnProperty('y')) {
          this.setY(o.y);
        }

        if (o.hasOwnProperty('rotation')) {
          this.setRotation(o.rotation);
        } else if (o.hasOwnProperty('angle')) {
          this.setAngle(o.angle);
        }

        if (o.hasOwnProperty('alpha')) {
          this.setAlpha(o.alpha);
        } // ScaleX, ScaleY


        var width = GetValue$8(o, 'width', undefined);
        var height = GetValue$8(o, 'height', undefined);
        var scaleX = GetValue$8(o, 'scaleX', undefined);
        var scaleY = GetValue$8(o, 'scaleY', undefined);

        if (width !== undefined) {
          if (height === undefined && scaleY === undefined) {
            this.setWidth(width, true);
          } else {
            this.setWidth(width);
          }
        }

        if (height !== undefined) {
          if (width === undefined && scaleX === undefined) {
            this.setHeight(height, true);
          } else {
            this.setHeight(height);
          }
        }

        if (scaleX !== undefined && width === undefined) {
          this.setScaleX(scaleX);
        }

        if (scaleY !== undefined && height === undefined) {
          this.setScaleY(scaleY);
        }

        if (o.hasOwnProperty('leftSpace')) {
          this.setLeftSpace(o.leftSpace);
        }

        if (o.hasOwnProperty('rightSpace')) {
          this.setLeftSpace(o.rightSpace);
        }

        return this;
      }
    }, {
      key: "setOrigin",
      value: function setOrigin(x) {
        this.originX = x;
        return this;
      }
    }, {
      key: "setDrawBelowCallback",
      value: function setDrawBelowCallback(callback) {
        this.drawBelowCallback = callback;
        return this;
      }
    }, {
      key: "setDrawAboveCallback",
      value: function setDrawAboveCallback(callback) {
        this.drawAboveCallback = callback;
        return this;
      } // Override

    }, {
      key: "onFree",
      value: function onFree() {
        this.setParent().setVisible().setAlpha(1).setPosition(0, 0).setRotation(0).setScale(1, 1).setLeftSpace(0).setRightSpace(0).setOrigin(0).setDrawBelowCallback().setDrawAboveCallback();
      } // Override

    }, {
      key: "drawContent",
      value: function drawContent() {} // Override

    }, {
      key: "draw",
      value: function draw() {
        var context = this.context;
        context.save();
        var x = this.x + this.leftSpace + this.offsetX - this.originX * this.width,
            y = this.y + this.offsetY;

        if (this.autoRound) {
          x = Math.round(x);
          y = Math.round(y);
        }

        context.translate(x, y);
        context.globalAlpha = this.alpha;
        context.scale(this.scaleX, this.scaleY);
        context.rotate(this.rotation);

        if (this.drawBelowCallback) {
          this.drawBelowCallback.call(this);
        }

        this.drawContent();

        if (this.drawAboveCallback) {
          this.drawAboveCallback.call(this);
        }

        context.restore();
      }
    }]);

    return Base;
  }();

  Object.assign(Base.prototype, DataMethods);

  var Pad = Phaser.Utils.String.Pad;

  var GetStyle = function GetStyle(style, canvas, context) {
    if (style == null) {
      return style;
    }

    switch (_typeof(style)) {
      case 'string':
        return style;

      case 'number':
        return "#".concat(Pad(Math.floor(style).toString(16), 6, '0', 1));

      case 'function':
        return style(canvas, context);

      case 'object':
        if (style.hasOwnProperty('r')) {
          if (style.hasOwnProperty('a')) {
            // rgba
            return "rgba(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ",").concat(style.a, ")");
          } else {
            // rgb
            return "rgb(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ")");
          }
        } else if (style.hasOwnProperty('h')) {
          if (style.hasOwnProperty('a')) {
            // hsla
            return "hsla(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ",").concat(style.a, ")");
          } else {
            // hsl
            return "hsl(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ")");
          }
        } else {
          return style; // Not a valid input
        }

      default:
        return style;
    }
  };

  var GetValue$7 = Phaser.Utils.Objects.GetValue;

  var RoundRectangle = /*#__PURE__*/function () {
    function RoundRectangle(x, y, width, height, radiusConfig) {
      _classCallCheck(this, RoundRectangle);

      this.cornerRadius = {};
      this._width = 0;
      this._height = 0;
      this.setTo(x, y, width, height, radiusConfig);
    }

    _createClass(RoundRectangle, [{
      key: "setTo",
      value: function setTo(x, y, width, height, radiusConfig) {
        this.setPosition(x, y);
        this.setRadius(radiusConfig);
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        if (x === undefined) {
          x = 0;
        }

        if (y === undefined) {
          y = x;
        }

        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "setRadius",
      value: function setRadius(config) {
        if (config === undefined) {
          config = 0;
        }

        var defaultRadiusX, defaultRadiusY;

        if (typeof config === 'number') {
          defaultRadiusX = config;
          defaultRadiusY = config;
        } else {
          defaultRadiusX = GetValue$7(config, 'x', 0);
          defaultRadiusY = GetValue$7(config, 'y', 0);
        }

        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue$7(config, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue$7(config, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue$7(config, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue$7(config, 'br', undefined), defaultRadiusX, defaultRadiusY);
        return this;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "minWidth",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
      }
    }, {
      key: "minHeight",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }

        this._width = Math.max(value, this.minWidth);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }

        this._height = Math.max(value, this.minHeight);
      }
    }, {
      key: "radius",
      get: function get() {
        var radius = this.cornerRadius;
        var max = Math.max(radius.tl.x, radius.tl.y, radius.tr.x, radius.tr.y, radius.bl.x, radius.bl.y, radius.br.x, radius.br.y);
        return max;
      }
    }]);

    return RoundRectangle;
  }();

  var GetRadius = function GetRadius(radius, defaultRadiusX, defaultRadiusY) {
    if (radius === undefined) {
      return {
        x: defaultRadiusX,
        y: defaultRadiusY
      };
    } else if (typeof radius === 'number') {
      return {
        x: radius,
        y: radius
      };
    } else {
      return radius;
    }
  };

  var DegToRad = Phaser.Math.DegToRad;
  var Rad0 = DegToRad(0);
  var Rad90 = DegToRad(90);
  var Rad180 = DegToRad(180);
  var Rad270 = DegToRad(270);

  var AddRoundRectanglePath = function AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration) {
    var geom = new RoundRectangle(x, y, width, height, radiusConfig),
        minWidth = geom.minWidth,
        minHeight = geom.minHeight,
        scaleRX = width >= minWidth ? 1 : width / minWidth,
        scaleRY = height >= minHeight ? 1 : height / minHeight;
    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;
    context.save();
    context.beginPath();
    context.translate(x, y); // Bottom-right

    radius = cornerRadius.br;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = height - radiusY;
    context.moveTo(width, centerY);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad0, Rad90, iteration);
    } else {
      context.lineTo(width, height);
      context.lineTo(centerX, height);
    } // Bottom-left


    radius = cornerRadius.bl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = height - radiusY;
    context.lineTo(radiusX, height);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad90, Rad180, iteration);
    } else {
      context.lineTo(0, height);
      context.lineTo(0, centerY);
    } // Top-left


    radius = cornerRadius.tl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = radiusY;
    context.lineTo(0, centerY);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad180, Rad270, iteration);
    } else {
      context.lineTo(0, 0);
      context.lineTo(centerX, 0);
    } // Top-right


    radius = cornerRadius.tr;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = radiusY;
    context.lineTo(centerX, 0);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad270, Rad0, iteration);
    } else {
      context.lineTo(width, 0);
      context.lineTo(width, centerY);
    }

    context.closePath();
    context.restore();
  };

  var ArcTo = function ArcTo(context, centerX, centerY, radiusX, radiusY, startAngle, endAngle, iteration) {
    if (iteration == null) {
      // undefined, or null
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle);
    } else {
      iteration += 1;
      var x, y, angle;
      var step = (endAngle - startAngle) / iteration;

      for (var i = 0; i <= iteration; i++) {
        angle = startAngle + step * i;
        x = centerX + radiusX * Math.cos(angle);
        y = centerY + radiusY * Math.sin(angle);
        context.lineTo(x, y);
      }
    }
  };

  var DrawRoundRectangle = function DrawRoundRectangle(canvas, context, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient, iteration) {
    AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration);

    if (fillStyle != null) {
      if (fillColor2 != null) {
        var grd;

        if (isHorizontalGradient) {
          grd = context.createLinearGradient(0, 0, width, 0);
        } else {
          grd = context.createLinearGradient(0, 0, 0, height);
        }

        grd.addColorStop(0, fillStyle);
        grd.addColorStop(1, fillColor2);
        fillStyle = grd;
      }

      context.fillStyle = fillStyle;
      context.fill();
    }

    if (strokeStyle != null && lineWidth > 0) {
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;
      context.stroke();
    }
  };

  var DrawRoundRectangleBackground = function DrawRoundRectangleBackground(canvasObject, color, strokeColor, strokeLineWidth, radius, color2, isHorizontalGradient, iteration) {
    if (color == null && strokeColor == null) {
      return;
    }

    var width = canvasObject.canvas.width,
        height = canvasObject.canvas.height;

    if (strokeColor == null) {
      strokeLineWidth = 0;
    }

    var x = strokeLineWidth / 2;
    width -= strokeLineWidth;
    height -= strokeLineWidth;
    DrawRoundRectangle(canvasObject.canvas, canvasObject.context, x, x, width, height, radius, color, strokeColor, strokeLineWidth, color2, isHorizontalGradient, iteration);
  };

  var GetValue$6 = Phaser.Utils.Objects.GetValue;

  var Background = /*#__PURE__*/function (_Base) {
    _inherits(Background, _Base);

    var _super = _createSuper(Background);

    function Background(parent, config) {
      var _this;

      _classCallCheck(this, Background);

      _this = _super.call(this, parent, 'background');

      _this.setColor(GetValue$6(config, 'color', null), GetValue$6(config, 'color2', null), GetValue$6(config, 'horizontalGradient', true));

      _this.setStroke(GetValue$6(config, 'stroke', null), GetValue$6(config, 'strokeThickness', 2));

      _this.setCornerRadius(GetValue$6(config, 'cornerRadius', 0), GetValue$6(config, 'cornerIteration', null));

      return _this;
    }

    _createClass(Background, [{
      key: "color",
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color != value);
        this._color = value;
      }
    }, {
      key: "color2",
      get: function get() {
        return this._color2;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color2 != value);
        this._color2 = value;
      }
    }, {
      key: "horizontalGradient",
      get: function get() {
        return this._horizontalGradient;
      },
      set: function set(value) {
        this.setDirty(this._horizontalGradient != value);
        this._horizontalGradient = value;
      }
    }, {
      key: "setColor",
      value: function setColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
          isHorizontalGradient = true;
        }

        this.color = color;
        this.color2 = color2;
        this.horizontalGradient = isHorizontalGradient;
        return this;
      }
    }, {
      key: "stroke",
      get: function get() {
        return this._stroke;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._stroke != value);
        this._stroke = value;
      }
    }, {
      key: "strokeThickness",
      get: function get() {
        return this._strokeThickness;
      },
      set: function set(value) {
        this.setDirty(this._strokeThickness != value);
        this._strokeThickness = value;
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, lineWidth) {
        this.stroke = color;
        this.strokeThickness = lineWidth;
        return this;
      }
    }, {
      key: "cornerRadius",
      get: function get() {
        return this._cornerRadius;
      },
      set: function set(value) {
        this.setDirty(this._cornerRadius != value);
        this._cornerRadius = value;
      }
    }, {
      key: "cornerIteration",
      get: function get() {
        return this._cornerIteration;
      },
      set: function set(value) {
        this.setDirty(this._cornerIteration != value);
        this._cornerIteration = value;
      }
    }, {
      key: "setCornerRadius",
      value: function setCornerRadius(radius, iteration) {
        this.cornerRadius = radius;
        this.cornerIteration = iteration;
        return this;
      }
    }, {
      key: "drawContent",
      value: function drawContent() {
        DrawRoundRectangleBackground(this.parent, this.color, this.stroke, this.strokeThickness, this.cornerRadius, this.color2, this.horizontalGradient, this.cornerIteration);
      }
    }]);

    return Background;
  }(Base);

  var GetValue$5 = Phaser.Utils.Objects.GetValue;

  var InnerBounds = /*#__PURE__*/function (_Base) {
    _inherits(InnerBounds, _Base);

    var _super = _createSuper(InnerBounds);

    function InnerBounds(parent, config) {
      var _this;

      _classCallCheck(this, InnerBounds);

      _this = _super.call(this, parent, 'background');

      _this.setColor(GetValue$5(config, 'color', null), GetValue$5(config, 'color2', null), GetValue$5(config, 'horizontalGradient', true));

      _this.setStroke(GetValue$5(config, 'stroke', null), GetValue$5(config, 'strokeThickness', 2));

      return _this;
    }

    _createClass(InnerBounds, [{
      key: "color",
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color != value);
        this._color = value;
      }
    }, {
      key: "color2",
      get: function get() {
        return this._color2;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color2 != value);
        this._color2 = value;
      }
    }, {
      key: "horizontalGradient",
      get: function get() {
        return this._horizontalGradient;
      },
      set: function set(value) {
        this.setDirty(this._horizontalGradient != value);
        this._horizontalGradient = value;
      }
    }, {
      key: "setColor",
      value: function setColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
          isHorizontalGradient = true;
        }

        this.color = color;
        this.color2 = color2;
        this.horizontalGradient = isHorizontalGradient;
        return this;
      }
    }, {
      key: "stroke",
      get: function get() {
        return this._stroke;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._stroke != value);
        this._stroke = value;
      }
    }, {
      key: "strokeThickness",
      get: function get() {
        return this._strokeThickness;
      },
      set: function set(value) {
        this.setDirty(this._strokeThickness != value);
        this._strokeThickness = value;
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, lineWidth) {
        this.stroke = color;
        this.strokeThickness = lineWidth;
        return this;
      }
    }, {
      key: "drawContent",
      value: function drawContent() {
        var padding = this.parent.padding;
        var x = padding.left,
            y = padding.top,
            width = this.parent.width - padding.left - padding.right,
            height = this.parent.height - padding.top - padding.bottom;
        var context = this.context;

        if (this.color != null) {
          var fillStyle;

          if (this.color2 != null) {
            var grd;

            if (this.horizontalGradient) {
              grd = context.createLinearGradient(0, 0, width, 0);
            } else {
              grd = context.createLinearGradient(0, 0, 0, height);
            }

            grd.addColorStop(0, this.color);
            grd.addColorStop(1, this.color2);
            fillStyle = grd;
          } else {
            fillStyle = this.color;
          }

          context.fillStyle = fillStyle;
          context.fillRect(x, y, width, height);
        }

        if (this.stroke != null && this.strokeThickness > 0) {
          context.strokeStyle = this.stroke;
          context.lineWidth = this.strokeThickness;
          context.strokeRect(x, y, width, height);
        }
      }
    }]);

    return InnerBounds;
  }(Base);

  var GetProperty = function GetProperty(name, config, defaultConfig) {
    if (config.hasOwnProperty(name)) {
      return config[name];
    } else {
      return defaultConfig[name];
    }
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;

  var TextStyle = /*#__PURE__*/function () {
    function TextStyle(config) {
      _classCallCheck(this, TextStyle);

      this.set(config);
    }

    _createClass(TextStyle, [{
      key: "toJSON",
      value: function toJSON() {
        return {
          bold: this.bold,
          italic: this.italic,
          fontSize: this.fontSize,
          fontFamily: this.fontFamily,
          color: this.color,
          stroke: this.stroke,
          strokeThickness: this.strokeThickness,
          shaodwColor: this.shadowColor,
          shadowBlur: this.shadowBlur,
          shadowOffsetX: this.shadowOffsetX,
          shadowOffsetY: this.shadowOffsetY,
          offsetX: this.offsetX,
          offsetY: this.offsetY
        };
      }
    }, {
      key: "set",
      value: function set(o) {
        this.setBold(GetValue$4(o, 'bold', false));
        this.setItalic(GetValue$4(o, 'italic', false));
        this.setFontSize(GetValue$4(o, 'fontSize', '16px'));
        this.setFontFamily(GetValue$4(o, 'fontFamily', 'Courier'));
        this.setColor(GetValue$4(o, 'color', '#fff'));
        this.setStrokeStyle(GetValue$4(o, 'stroke', null), GetValue$4(o, 'strokeThickness', 0));
        this.setShadow(GetValue$4(o, 'shadowColor', null), GetValue$4(o, 'shadowOffsetX', 0), GetValue$4(o, 'shadowOffsetY', 0), GetValue$4(o, 'shadowBlur', 0));
        this.setOffset(GetValue$4(o, 'offsetX', 0), GetValue$4(o, 'offsetY', 0));
      }
    }, {
      key: "modify",
      value: function modify(o) {
        if (o.hasOwnProperty('bold')) {
          this.setBold(o.bold);
        }

        if (o.hasOwnProperty('italic')) {
          this.setItalic(o.italic);
        }

        if (o.hasOwnProperty('fontSize')) {
          this.setFontSize(o.fontSize);
        }

        if (o.hasOwnProperty('fontFamily')) {
          this.setFontFamily(o.fontFamily);
        }

        if (o.hasOwnProperty('color')) {
          this.setColor(o.color);
        }

        if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
          this.setStrokeStyle(GetProperty('stroke', o, this), GetProperty('strokeThickness', o, this));
        }

        if (o.hasOwnProperty('shadowColor')) {
          this.setShadowColor(o.shadowColor);
        }

        if (o.hasOwnProperty('shadowOffsetX') || o.hasOwnProperty('shadowOffsetY')) {
          this.setShadowOffset(GetProperty('shadowOffsetX', o, this), GetProperty('shadowOffsetY', o, this));
        }

        if (o.hasOwnProperty('shadowBlur')) {
          this.setShadowBlur(o.shaodwBlur);
        }

        if (o.hasOwnProperty('offsetX')) {
          this.setOffsetX(o.offsetX);
        }

        if (o.hasOwnProperty('offsetY')) {
          this.setOffsetY(o.offsetY);
        }

        return this;
      }
    }, {
      key: "setBold",
      value: function setBold(value) {
        if (value === undefined) {
          value = true;
        }

        this.bold = value;
        return this;
      }
    }, {
      key: "setItalic",
      value: function setItalic(value) {
        if (value === undefined) {
          value = true;
        }

        this.italic = value;
        return this;
      }
    }, {
      key: "fontStyle",
      get: function get() {
        if (this.bold && this.italic) {
          return 'bold italic';
        } else if (this.bold) {
          return 'bold';
        } else if (this.italic) {
          return 'italic';
        } else {
          return '';
        }
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(fontSize) {
        if (typeof fontSize === 'number') {
          fontSize = "".concat(fontSize, "px");
        }

        this.fontSize = fontSize;
        return this;
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        return this;
      }
    }, {
      key: "font",
      get: function get() {
        return "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = GetStyle(color);
        return this;
      }
    }, {
      key: "hasFill",
      get: function get() {
        return this.color != null;
      }
    }, {
      key: "setStrokeStyle",
      value: function setStrokeStyle(stroke, strokeThickness) {
        this.stroke = GetStyle(stroke);

        if (strokeThickness !== undefined) {
          this.strokeThickness = strokeThickness;
        }

        return this;
      }
    }, {
      key: "setStrokeThickness",
      value: function setStrokeThickness(strokeThickness) {
        this.strokeThickness = strokeThickness;
        return this;
      }
    }, {
      key: "hasStroke",
      get: function get() {
        return this.stroke != null && this.strokeThickness > 0;
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(color) {
        this.shadowColor = GetStyle(color);
        return this;
      }
    }, {
      key: "setShadowOffset",
      value: function setShadowOffset(offsetX, offsetY) {
        if (offsetX === undefined) {
          offsetX = 0;
        }

        if (offsetY === undefined) {
          offsetY = 0;
        }

        this.shadowOffsetX = offsetX;
        this.shadowOffsetY = offsetY;
        return this;
      }
    }, {
      key: "setShadowBlur",
      value: function setShadowBlur(blur) {
        if (blur === undefined) {
          blur = 0;
        }

        this.shaodwBlur = blur;
        return this;
      }
    }, {
      key: "setShadow",
      value: function setShadow(color, offsetX, offsetY, blur) {
        this.setShadowColor(color).setShadowOffset(offsetX, offsetY).setShadowBlur(blur);
        return this;
      }
    }, {
      key: "setOffsetX",
      value: function setOffsetX(offsetX) {
        if (offsetX === undefined) {
          offsetX = 0;
        }

        this.offsetX = offsetX;
        return this;
      }
    }, {
      key: "setOffsetY",
      value: function setOffsetY(offsetY) {
        if (offsetY === undefined) {
          offsetY = 0;
        }

        this.offsetY = offsetY;
        return this;
      }
    }, {
      key: "setOffset",
      value: function setOffset(offsetX, offsetY) {
        this.setOffsetX(offsetX).setOffsetY(offsetY);
        return this;
      }
    }, {
      key: "syncFont",
      value: function syncFont(context) {
        context.font = this.font;
        return this;
      }
    }, {
      key: "syncStyle",
      value: function syncStyle(context) {
        context.textBaseline = 'alphabetic';
        var hasFill = this.hasFill;
        var hasStroke = this.hasStroke;
        context.fillStyle = hasFill ? this.color : '#000';
        context.strokeStyle = hasStroke ? this.stroke : '#000';
        context.lineWidth = hasStroke ? this.strokeThickness : 0;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        return this;
      }
    }, {
      key: "syncShadow",
      value: function syncShadow(context) {
        if (context.shadowColor != null) {
          context.shadowColor = this.shadowColor;
          context.shadowOffsetX = this.shadowOffsetX;
          context.shadowOffsetY = this.shadowOffsetY;
          context.shadowBlur = this.shadowBlur;
        } else {
          context.shadowColor = 0;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowBlur = 0;
        }
      }
    }, {
      key: "getTextMetrics",
      value: function getTextMetrics(context, text) {
        this.syncFont(context).syncStyle(context);
        return context.measureText(text);
      }
    }]);

    return TextStyle;
  }();

  var GetValue$3 = Phaser.Utils.Objects.GetValue;

  var GetPadding$1 = function GetPadding(padding, key) {
    if (key === undefined) {
      return padding;
    }

    return padding[key];
  };

  var SetPadding$1 = function SetPadding(padding, key, value) {
    var keyType = _typeof(key);

    if (keyType === 'string') {
      padding[key] = value;
    } else if (keyType === 'number') {
      padding.left = key;
      padding.right = key;
      padding.top = key;
      padding.bottom = key;
    } else {
      padding.left = GetValue$3(key, 'left', 0);
      padding.right = GetValue$3(key, 'right', 0);
      padding.top = GetValue$3(key, 'top', 0);
      padding.bottom = GetValue$3(key, 'bottom', 0);
    }
  };

  var SetPadding = function SetPadding(key, value) {
    var padding = this.padding;
    var paddingLeft = padding.left,
        paddingRight = padding.right,
        paddingTop = padding.top,
        paddingBottom = padding.bottom;
    SetPadding$1(this.padding, key, value);
    this.dirty = this.dirty || paddingLeft != this.padding.left || paddingRight != this.padding.right || paddingTop != this.padding.top || paddingBottom != this.padding.bottom;
    return this;
  };

  var GetPadding = function GetPadding(key) {
    return GetPadding$1(this.padding, key);
  };

  var ModifyTextStyle = function ModifyTextStyle(style) {
    this.textStyle.modify(style);
    return this;
  };

  var RemoveChildren = function RemoveChildren() {
    this.poolManager.freeMultiple(this.children);
    this.children.length = 0;
    this.lastAppendedChildren.length = 0;
    this.dirty = true;
    return this;
  };

  var ClearContent = function ClearContent() {
    this.setText();
    return this;
  };

  var CharTypeName = 'text';
  var ImageTypeName = 'image';
  var CmdTypeName = 'command';

  var IsTypeable = function IsTypeable(bob) {
    var bobType = bob.type;
    return bobType === CharTypeName || bobType === ImageTypeName;
  };

  var IsNewLineChar = function IsNewLineChar(bob) {
    return bob.type === CharTypeName && bob.text === '\n';
  };

  var CharData = /*#__PURE__*/function (_Base) {
    _inherits(CharData, _Base);

    var _super = _createSuper(CharData);

    function CharData(parent, text, style) {
      var _this;

      _classCallCheck(this, CharData);

      _this = _super.call(this, parent, CharTypeName);
      _this.style = new TextStyle(style);

      _this.setText(text);

      return _this;
    }

    _createClass(CharData, [{
      key: "autoRound",
      get: function get() {
        return this.parent.autoRound;
      }
    }, {
      key: "offsetX",
      get: function get() {
        return this.style.offsetX;
      },
      set: function set(value) {}
    }, {
      key: "offsetY",
      get: function get() {
        return this.style.offsetY;
      },
      set: function set(value) {}
    }, {
      key: "modifyStyle",
      value: function modifyStyle(style) {
        this.setDirty(true);
        this.style.modify(style);
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (!o) {
          return this;
        }

        this.modifyStyle(o);

        _get(_getPrototypeOf(CharData.prototype), "modifyPorperties", this).call(this, o);

        return this;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        this.setDirty(this.text != text);
        this.text = text;
        this.updateTextSize();
        return this;
      }
    }, {
      key: "updateTextSize",
      value: function updateTextSize() {
        if (this.text === '\n' || this.text === '') {
          this.textWidth = 0;
          this.textHeight = 0;
        } else {
          var metrics = this.style.getTextMetrics(this.context, this.text);
          this.textWidth = metrics.width;
          var ascent, descent;

          if (metrics.hasOwnProperty('actualBoundingBoxAscent')) {
            ascent = metrics.actualBoundingBoxAscent;
            descent = metrics.actualBoundingBoxDescent;
          } else {
            ascent = 0;
            descent = 0;
          }

          this.textHeight = ascent + descent;
        }

        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this.textWidth * this.scaleX;
      },
      set: function set(value) {
        if (this.textWidth > 0) {
          this.scaleX = value / this.textWidth;
        } else {
          this.scaleX = 1;
        }
      }
    }, {
      key: "height",
      get: function get() {
        return this.textHeight * this.scaleY;
      },
      set: function set(value) {
        if (this.textHeight > 0) {
          this.scaleY = value / this.textHeight;
        } else {
          this.scaleY = 1;
        }
      }
    }, {
      key: "drawContent",
      value: function drawContent() {
        var textStyle = this.style;
        var hasFill = textStyle.hasFill,
            hasStroke = textStyle.hasStroke;

        if (!hasFill && !hasStroke) {
          return;
        }

        var context = this.context;
        textStyle.syncFont(context).syncStyle(context);

        if (hasStroke) {
          textStyle.syncShadow(context);
          context.strokeText(this.text, 0, 0);
        }

        if (hasFill) {
          textStyle.syncShadow(context);
          context.fillText(this.text, 0, 0);
        }
      }
    }, {
      key: "draw",
      value: function draw() {
        if (!this.visible || this.text === '' || this.text === '\n') {
          return this;
        }

        _get(_getPrototypeOf(CharData.prototype), "draw", this).call(this);
      }
    }]);

    return CharData;
  }(Base);

  var AppendText = function AppendText(text, style) {
    if (style) {
      this.textStyle.modify(style);
    }

    this.lastAppendedChildren.length = 0;

    for (var i = 0, cnt = text.length; i < cnt; i++) {
      var _char = text.charAt(i);

      var bob = this.poolManager.allocate(CharTypeName);

      if (bob === null) {
        bob = new CharData(this, // parent
        _char, // text
        this.textStyle);
      } else {
        bob.setParent(this).setActive().modifyStyle(this.textStyle).setText(_char);
      } // bob.modifyPorperties(properties);  // Warning: Will modify text-style twice


      this.children.push(bob);
      this.lastAppendedChildren.push(bob);
    }

    return this;
  };

  var SetText = function SetText(text, style) {
    if (text === undefined) {
      text = '';
    }

    this.removeChildren();
    AppendText.call(this, text, style); // this.appendText might be override

    this.dirty = true;
    return this;
  };

  var ImageData = /*#__PURE__*/function (_Base) {
    _inherits(ImageData, _Base);

    var _super = _createSuper(ImageData);

    function ImageData(parent, key, frame) {
      var _this;

      _classCallCheck(this, ImageData);

      _this = _super.call(this, parent, ImageTypeName);

      _this.setTexture(key, frame);

      return _this;
    }

    _createClass(ImageData, [{
      key: "frameWidth",
      get: function get() {
        return this.frameObj ? this.frameObj.cutWidth : 0;
      }
    }, {
      key: "frameHeight",
      get: function get() {
        return this.frameObj ? this.frameObj.cutHeight : 0;
      }
    }, {
      key: "offsetY",
      get: function get() {
        return -this.height;
      },
      set: function set(value) {}
    }, {
      key: "key",
      get: function get() {
        return this._key;
      },
      set: function set(value) {
        this.setDirty(this._key != value);
        this._key = value;
      }
    }, {
      key: "frame",
      get: function get() {
        return this._frame;
      },
      set: function set(value) {
        this.setDirty(this._frame != value);
        this._frame = value;
      }
    }, {
      key: "setTexture",
      value: function setTexture(key, frame) {
        this.key = key;
        this.frame = frame;
        this.frameObj = this.scene.textures.getFrame(key, frame);
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this.frameWidth * this.scaleX;
      },
      set: function set(value) {
        this.setDirty(this.width !== value);
        this.scaleX = value / this.frameWidth;
      }
    }, {
      key: "height",
      get: function get() {
        return this.frameHeight * this.scaleY;
      },
      set: function set(value) {
        this.setDirty(this.height !== value);
        this.scaleY = value / this.frameHeight;
      }
    }, {
      key: "setHeight",
      value: function setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }

        this.height = height;

        if (keepAspectRatio) {
          this.scaleX = this.scaleY;
        }

        return this;
      }
    }, {
      key: "drawContent",
      value: function drawContent() {
        var context = this.context;
        var frame = this.frameObj;
        context.drawImage(frame.source.image, // image
        frame.cutX, frame.cutY, // sx, sy
        frame.cutWidth, frame.cutHeight // sWidth, sHeight
        );
      }
    }, {
      key: "draw",
      value: function draw() {
        if (!this.visible) {
          return this;
        }

        _get(_getPrototypeOf(ImageData.prototype), "draw", this).call(this);
      }
    }]);

    return ImageData;
  }(Base);

  var AppendImage = function AppendImage(key, frame, properties) {
    var bob = this.poolManager.allocate(ImageTypeName);

    if (bob === null) {
      bob = new ImageData(this, // parent
      key, frame);
    } else {
      bob.setParent(this).setActive().setTexture(key, frame);
    }

    bob.modifyPorperties(properties);
    this.lastAppendedChildren.length = 0;
    this.children.push(bob);
    this.lastAppendedChildren.push(bob);
    return this;
  };

  var Command = /*#__PURE__*/function (_Base) {
    _inherits(Command, _Base);

    var _super = _createSuper(Command);

    function Command(parent, name, callback, param, scope) {
      var _this;

      _classCallCheck(this, Command);

      _this = _super.call(this, parent, CmdTypeName);

      _this.setName(name).setParameter(param).setCallback(callback, scope);

      return _this;
    }

    _createClass(Command, [{
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "setParameter",
      value: function setParameter(param) {
        this.param = param;
        return this;
      }
    }, {
      key: "setCallback",
      value: function setCallback(callback, scope) {
        this.callback = callback;
        this.scope = scope;
        return this;
      }
    }, {
      key: "exec",
      value: function exec() {
        var result;

        if (this.scope) {
          result = this.callback.call(this.scope, this.param, this.name);
        } else {
          result = this.callback(this.param, this.name);
        }

        return result;
      }
    }, {
      key: "draw",
      value: function draw() {}
    }, {
      key: "onFree",
      value: function onFree() {
        _get(_getPrototypeOf(Command.prototype), "onFree", this).call(this);

        this.setName().setCallback().setParameter();
      }
    }]);

    return Command;
  }(Base);

  var AppendCommand = function AppendCommand(name, callback, param, scope) {
    var bob = this.poolManager.allocate(CmdTypeName);

    if (bob === null) {
      bob = new Command(this, // parent
      name, callback, param, scope);
    } else {
      bob.setParent(this).setActive().setName(name).setCallback(callback, scope).setParameter(param);
    }

    this.lastAppendedChildren.length = 0;
    this.children.push(bob);
    this.lastAppendedChildren.push(bob);
    return this;
  };

  var SetWrapConfig = function SetWrapConfig(config) {
    this.wrapConfig = config;
    return this;
  };

  var MergeConfig = function MergeConfig(config, defaultConfig) {
    if (!defaultConfig) {
      return config;
    }

    if (config == null) {
      config = {};
    }

    for (var key in defaultConfig) {
      if (!config.hasOwnProperty(key)) {
        config[key] = defaultConfig[key];
      }
    }

    return config;
  };

  var GetWord = function GetWord(children, startIndex, charMode, result) {
    if (result === undefined) {
      result = {
        word: [],
        width: 0
      };
    }

    result.word.length = 0;
    var endIndex = children.length;
    var currentIndex = startIndex;
    var word = result.word,
        wordWidth = 0;

    while (currentIndex < endIndex) {
      var child = children[currentIndex];

      if (child.type === CharTypeName && child.text !== ' ' && child.text !== '\n') {
        word.push(child);
        wordWidth += child.outerWidth;
        currentIndex++; // Continue
      } else {
        // Get non-text child, a space, or a new-line
        if (currentIndex === startIndex) {
          // Single child
          word.push(child);
          wordWidth += child.outerWidth;
        }

        break;
      }

      if (charMode) {
        // Word only contains 1 character
        break;
      }
    }

    result.width = wordWidth;
    return result;
  };

  var HAlign = {
    left: 0,
    center: 1,
    right: 2
  };
  var VAlign = {
    top: 0,
    center: 1,
    bottom: 2
  };

  var AlignLines$1 = function AlignLines(result, width, height) {
    var hAlign = result.hAlign,
        vAlign = result.vAlign;

    if (typeof hAlign === 'string') {
      hAlign = HAlign[hAlign];
      result.hAlign = hAlign;
    }

    if (typeof vAlign === 'string') {
      vAlign = VAlign[vAlign];
      result.vAlign = vAlign;
    }

    if (hAlign !== 0) {
      // left align does not have offset
      var lines = result.lines;

      for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var line = lines[li];
        var lineWidth = line.width,
            children = line.children;
        var xOffset;

        switch (hAlign) {
          case 1:
            // center
            xOffset = (width - lineWidth) / 2;
            break;

          case 2:
            // right
            xOffset = width - lineWidth;
            break;
        }

        for (var ci = 0, ccnt = children.length; ci < ccnt; ci++) {
          var child = children[ci];
          child.x += xOffset;
        }
      }
    }

    if (vAlign !== 0) {
      // top align does not have offset
      var linesHeight = result.linesHeight;
      var yOffset;

      switch (vAlign) {
        case 1:
          // center
          yOffset = (height - linesHeight) / 2;
          break;

        case 2:
          // bottom
          yOffset = height - linesHeight;
          break;
      }

      var children = result.children;

      for (var ci = 0, ccnt = children.length; ci < ccnt; ci++) {
        var child = children[ci];
        child.y += yOffset;
      }
    }
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;

  var RunWordWrap$1 = function RunWordWrap(config) {
    // Parse parameters
    var startIndex = GetValue$2(config, 'start', 0);
    var extraTopPadding = GetValue$2(config, 'padding.top', 0);
    var extraBottomPadding = GetValue$2(config, 'padding.bottom', 0); // Add extra space below last line
    // Get lineHeight, maxLines

    var lineHeight = GetValue$2(config, 'lineHeight', undefined);
    var maxLines;

    if (lineHeight === undefined) {
      // Calculate lineHeight via maxLines, in fixedHeight mode
      maxLines = GetValue$2(config, 'maxLines', 0);

      if (this.fixedHeight > 0) {
        var innerHeight = this.fixedHeight - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
        lineHeight = innerHeight / maxLines;
      } else {
        lineHeight = 0;
      }
    } else {
      if (this.fixedHeight > 0) {
        // Calculate maxLines via lineHeight, in fixedHeight mode
        maxLines = GetValue$2(config, 'maxLines', undefined);

        if (maxLines === undefined) {
          var innerHeight = this.fixedHeight - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
          maxLines = Math.floor(innerHeight / lineHeight);
        }
      } else {
        maxLines = GetValue$2(config, 'maxLines', 0); // Default is show all lines
      }
    }

    var showAllLines = maxLines === 0; // Get wrapWidth

    var wrapWidth = GetValue$2(config, 'wrapWidth', undefined);

    if (wrapWidth === undefined) {
      if (this.fixedWidth > 0) {
        wrapWidth = this.fixedWidth - this.padding.left - this.padding.right;
      } else {
        wrapWidth = Infinity; // No word-wrap
      }
    }

    var letterSpacing = GetValue$2(config, 'letterSpacing', 0);
    var hAlign = GetValue$2(config, 'hAlign', 0);
    var vAlign = GetValue$2(config, 'vAlign', 0);
    var charWrap = GetValue$2(config, 'charWrap', false);
    var result = {
      start: startIndex,
      // Next start index
      isLastPage: false,
      // Is last page
      padding: {
        top: extraTopPadding,
        bottom: extraBottomPadding
      },
      lineHeight: lineHeight,
      maxLines: maxLines,
      wrapWidth: wrapWidth,
      letterSpacing: letterSpacing,
      hAlign: hAlign,
      vAlign: vAlign,
      charWrap: charWrap,
      children: [],
      // Word-wrap result
      lines: [],
      // Word-wrap result in lines
      maxLineWidth: 0,
      linesHeight: 0
    }; // Set all children to active

    var children = this.children;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      children[i].setActive(false);
    } // Layout children


    wrapWidth += letterSpacing;
    var startX = this.padding.left,
        startY = this.padding.top + lineHeight + extraTopPadding,
        // Start(baseline) from 1st lineHeight, not 0
    x = startX,
        y = startY;
    var remainderWidth = wrapWidth,
        childIndex = startIndex,
        lastChildIndex = children.length;
    var resultChildren = result.children;
    var resultLines = result.lines,
        lastLine = [],
        lastLineWidth = 0,
        maxLineWidth = 0;
    var wordResult;

    while (childIndex < lastChildIndex) {
      // Append non-typeable child directly
      var child = children[childIndex];

      if (!IsTypeable(child)) {
        childIndex++;
        child.setActive();
        resultChildren.push(child);
        lastLine.push(child);
        continue;
      }

      wordResult = GetWord(children, childIndex, charWrap, wordResult);
      var word = wordResult.word;
      var charCnt = word.length;
      var wordWidth = wordResult.width + charCnt * letterSpacing;
      childIndex += charCnt; // Next line

      var isNewLineChar = IsNewLineChar(word[0]);

      if (remainderWidth < wordWidth || isNewLineChar) {
        // Add to result
        if (isNewLineChar) {
          var _char = word[0];

          _char.setActive().setPosition(x, y);

          resultChildren.push(_char);
          lastLine.push(_char);
        } // Move cursor


        x = startX;
        y += lineHeight;
        remainderWidth = wrapWidth;
        resultLines.push({
          children: lastLine,
          width: lastLineWidth
        });
        maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
        lastLineWidth = 0;
        lastLine = [];

        if (!showAllLines && resultLines.length === maxLines) {
          // Exceed maxLines
          break;
        } else if (isNewLineChar) {
          // Already add to result                
          continue;
        }
      }

      remainderWidth -= wordWidth;
      lastLineWidth += wordWidth;

      for (var i = 0, cnt = word.length; i < cnt; i++) {
        var _char = word[i];

        _char.setActive().setPosition(x, y);

        resultChildren.push(_char);
        lastLine.push(_char);
        x += _char.outerWidth + letterSpacing;
      }
    }

    if (lastLine.length > 0) {
      resultLines.push({
        children: lastLine,
        width: lastLineWidth
      });
      maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
    }

    result.start += resultChildren.length;
    result.isLastPage = result.start === lastChildIndex;
    result.maxLineWidth = maxLineWidth;
    result.linesHeight = resultLines.length * lineHeight + extraTopPadding + extraBottomPadding; // Calculate size of game object

    var width = this.fixedWidth > 0 ? this.fixedWidth : result.maxLineWidth + this.padding.left + this.padding.right;
    var height = this.fixedHeight > 0 ? this.fixedHeight : result.linesHeight + this.padding.top + this.padding.bottom; // Size might be changed after wrapping

    var innerWidth = width - this.padding.left - this.padding.right;
    var innerHeight = height - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
    AlignLines$1(result, innerWidth, innerHeight); // Resize

    this.setSize(width, height);
    return result;
  };

  var RunWordWrap = function RunWordWrap(config) {
    config = MergeConfig(config, this.wrapConfig);
    return RunWordWrap$1.call(this, config);
  };

  var AlignLines = function AlignLines(result, width, height) {
    var hAlign = result.hAlign,
        vAlign = result.vAlign;

    if (typeof hAlign === 'string') {
      hAlign = HAlign[hAlign];
      result.hAlign = hAlign;
    }

    if (typeof vAlign === 'string') {
      vAlign = VAlign[vAlign];
      result.vAlign = vAlign;
    }

    var rtl = result.rtl;
    var lines = result.lines,
        lineWidth = result.lineWidth,
        linesWidth = result.linesWidth;
    var xOffset;

    switch (hAlign) {
      case 0:
        // left
        xOffset = 0;
        break;

      case 1:
        // center
        xOffset = (width - linesWidth) / 2;
        break;

      case 2:
        // right
        xOffset = width - linesWidth;
        break;
    }

    if (rtl) {
      xOffset += lineWidth;
    }

    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
      var line = lines[rtl ? lcnt - li - 1 : li];
      var children = line.children;
      var lineHeight = line.height;
      var yOffset;

      switch (vAlign) {
        case 0:
          // top
          yOffset = 0;
          break;

        case 1:
          // center
          yOffset = (height - lineHeight) / 2;
          break;

        case 2:
          // bottom
          yOffset = height - lineHeight;
          break;
      }

      for (var ci = 0, ccnt = children.length; ci < ccnt; ci++) {
        var child = children[ci];
        child.x += xOffset;
        child.y += yOffset;
      }

      xOffset += lineWidth;
    }
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var RunVerticalWrap$1 = function RunVerticalWrap(config) {
    // Parse parameters
    var startIndex = GetValue$1(config, 'start', 0);
    var extraTopPadding = GetValue$1(config, 'padding.top', 0);
    var extraBottomPadding = GetValue$1(config, 'padding.bottom', 0); // Add extra space below last character

    var extraLeftPadding = GetValue$1(config, 'padding.left', 0);
    var extraRightPadding = GetValue$1(config, 'padding.right', 0);
    var lineWidth = GetValue$1(config, 'lineWidth', undefined);
    var maxLines;

    if (lineWidth === undefined) {
      // Calculate lineWidth via maxLines, in fixedWidth mode
      maxLines = GetValue$1(config, 'maxLines', 0);

      if (this.fixedWidth > 0) {
        var innerWidth = this.fixedWidth - this.padding.left - this.padding.right - extraLeftPadding - extraRightPadding;
        lineWidth = innerWidth / maxLines;
      } else {
        lineWidth = 0;
      }
    } else {
      if (this.fixedWidth > 0) {
        // Calculate maxLines via lineWidth, in fixedWidth mode
        maxLines = GetValue$1(config, 'maxLines', undefined);

        if (maxLines === undefined) {
          var innerWidth = this.fixedWidth - this.padding.left - this.padding.right;
          maxLines = Math.floor(innerWidth / lineWidth);
        }
      } else {
        maxLines = GetValue$1(config, 'maxLines', 0); // Default is show all lines
      }
    }

    var showAllLines = maxLines === 0; // Get fixedChildHeight

    var fixedChildHeight = GetValue$1(config, 'fixedChildHeight', undefined);

    if (fixedChildHeight === undefined) {
      var charPerLine = GetValue$1(config, 'charPerLine', undefined);

      if (charPerLine !== undefined) {
        var innerHeight = this.fixedHeight - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
        fixedChildHeight = Math.floor(innerHeight / charPerLine);
      }
    } // Get wrapHeight


    var wrapHeight = GetValue$1(config, 'wrapHeight', undefined);

    if (wrapHeight === undefined) {
      if (this.fixedHeight > 0) {
        wrapHeight = this.fixedHeight - this.padding.top - this.padding.bottom;
      } else {
        wrapHeight = Infinity; // No word-wrap
      }
    }

    var letterSpacing = GetValue$1(config, 'letterSpacing', 0);
    var rtl = GetValue$1(config, 'rtl', true);
    var hAlign = GetValue$1(config, 'hAlign', rtl ? 2 : 0);
    var vAlign = GetValue$1(config, 'vAlign', 0);
    var result = {
      start: startIndex,
      // Next start index
      isLastPage: false,
      // Is last page
      padding: {
        top: extraTopPadding,
        bottom: extraBottomPadding,
        left: extraLeftPadding,
        right: extraRightPadding
      },
      lineWidth: lineWidth,
      maxLines: maxLines,
      fixedChildHeight: fixedChildHeight,
      wrapHeight: wrapHeight,
      letterSpacing: letterSpacing,
      hAlign: hAlign,
      vAlign: vAlign,
      rtl: rtl,
      children: [],
      // Word-wrap result
      lines: [],
      // Word-wrap result in lines
      maxLineHeight: 0,
      linesWidth: 0
    }; // Set all children to active

    var children = this.children;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      children[i].setActive(false);
    } // Layout children


    wrapHeight += letterSpacing;
    var startX = this.padding.left + extraLeftPadding,
        // Reset x of each character in AlignLines method
    startY = this.padding.top + extraTopPadding,
        x = startX,
        y = startY;
    var remainderHeight = wrapHeight,
        childIndex = startIndex,
        lastChildIndex = children.length;
    var resultChildren = result.children;
    var resultLines = result.lines,
        lastLine = [],
        lastLineHeight = 0,
        maxLineHeight = 0;

    while (childIndex < lastChildIndex) {
      // Append non-typeable child directly
      var _char = children[childIndex];
      childIndex++;

      if (!IsTypeable(_char)) {
        _char.setActive();

        resultChildren.push(_char);
        lastLine.push(_char);
        continue;
      }

      var childHeight = (fixedChildHeight !== undefined ? fixedChildHeight : _char.height) + letterSpacing; // Next line

      var isNewLineChar = IsNewLineChar(_char);

      if (remainderHeight < childHeight || isNewLineChar) {
        // Add to result
        if (isNewLineChar) {
          _char.setActive().setPosition(x, y).setOrigin(0.5);

          resultChildren.push(_char);
          lastLine.push(_char);
        } // Move cursor


        x = startX;
        y = startY;
        remainderHeight = wrapHeight;
        resultLines.push({
          children: lastLine,
          height: lastLineHeight
        });
        maxLineHeight = Math.max(maxLineHeight, lastLineHeight);
        lastLineHeight = 0;
        lastLine = [];

        if (!showAllLines && resultLines.length === maxLines) {
          // Exceed maxLines
          break;
        } else if (isNewLineChar) {
          // Already add to result                
          continue;
        }
      }

      remainderHeight -= childHeight;
      lastLineHeight += childHeight;

      _char.setActive().setPosition(x, y).setOrigin(0.5);

      resultChildren.push(_char);
      lastLine.push(_char);
      y += childHeight;
    }

    if (lastLine.length > 0) {
      resultLines.push({
        children: lastLine,
        height: lastLineHeight
      });
      maxLineHeight = Math.max(maxLineHeight, lastLineHeight);
    }

    result.start += resultChildren.length;
    result.isLastPage = result.start === lastChildIndex;
    result.maxLineHeight = maxLineHeight;
    result.linesWidth = resultLines.length * lineWidth + extraLeftPadding + extraRightPadding; // Calculate size of game object

    var width = this.fixedWidth > 0 ? this.fixedWidth : result.linesWidth + this.padding.left + this.padding.right;
    var height = this.fixedHeight > 0 ? this.fixedHeight : result.maxLineHeight + this.padding.top + this.padding.bottom; // Size might be changed after wrapping

    var innerWidth = width - this.padding.left - this.padding.right - extraLeftPadding - extraRightPadding;
    var innerHeight = height - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
    AlignLines(result, innerWidth, innerHeight); // Resize

    this.setSize(width, height);
    return result;
  };

  var RunVerticalWrap = function RunVerticalWrap(config) {
    config = MergeConfig(config, this.wrapConfig);
    return RunVerticalWrap$1.call(this, config);
  };

  var DrawContent = function DrawContent() {
    var width = this.fixedWidth > 0 ? this.fixedWidth : this.width;
    var height = this.fixedHeight > 0 ? this.fixedHeight : this.height;
    this.setSize(width, height);

    if (this.background.active) {
      this.background.draw();
    }

    var child;

    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
      child = this.children[i];

      if (child.active) {
        child.draw();
      }
    }

    if (this.innerBounds.active) {
      this.innerBounds.draw();
    }
  };

  var GetChildren = function GetChildren() {
    return this.children;
  };

  var GetLastAppendedChildren = function GetLastAppendedChildren() {
    return this.lastAppendedChildren;
  };

  var GetAll = Phaser.Utils.Array.GetAll;

  var GetActiveChildren = function GetActiveChildren() {
    return GetAll(this.children, 'active', true);
  };

  var Methods = {
    setPadding: SetPadding,
    getPadding: GetPadding,
    modifyTextStyle: ModifyTextStyle,
    removeChildren: RemoveChildren,
    clearContent: ClearContent,
    setText: SetText,
    appendText: AppendText,
    appendImage: AppendImage,
    appendCommand: AppendCommand,
    setWrapConfig: SetWrapConfig,
    runWordWrap: RunWordWrap,
    runVerticalWrap: RunVerticalWrap,
    drawContent: DrawContent,
    getChildren: GetChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getActiveChildren: GetActiveChildren
  };

  var Stack = /*#__PURE__*/function () {
    function Stack() {
      _classCallCheck(this, Stack);

      this.items = [];
    }

    _createClass(Stack, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.items = undefined;
      }
    }, {
      key: "pop",
      value: function pop() {
        return this.items.length > 0 ? this.items.pop() : null;
      }
    }, {
      key: "push",
      value: function push(l) {
        this.items.push(l);
        return this;
      }
    }, {
      key: "pushMultiple",
      value: function pushMultiple(arr) {
        this.items.push.apply(this.items, arr);
        arr.length = 0;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items.length = 0;
        return this;
      }
    }]);

    return Stack;
  }();

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var Pools = {};

  var PoolManager = /*#__PURE__*/function () {
    function PoolManager(config) {
      _classCallCheck(this, PoolManager);

      this.pools = GetFastValue(config, 'pools', Pools);
    }

    _createClass(PoolManager, [{
      key: "free",
      value: function free(bob) {
        if (!this.pools) {
          return this;
        }

        var bobType = bob.type;

        if (!this.pools.hasOwnProperty(bobType)) {
          this.pools[bobType] = new Stack();
        }

        this.pools[bobType].push(bob);
        bob.onFree();
        return this;
      }
    }, {
      key: "freeMultiple",
      value: function freeMultiple(arr) {
        if (!this.pools) {
          return this;
        }

        for (var i = 0, cnt = arr.length; i < cnt; i++) {
          this.free(arr[i]);
        }

        return this;
      }
    }, {
      key: "allocate",
      value: function allocate(bobType) {
        if (!this.pools || !this.pools.hasOwnProperty(bobType)) {
          return null;
        }

        return this.pools[bobType].pop();
      }
    }]);

    return PoolManager;
  }();

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var DynamicText = /*#__PURE__*/function (_Canvas) {
    _inherits(DynamicText, _Canvas);

    var _super = _createSuper(DynamicText);

    function DynamicText(scene, x, y, fixedWidth, fixedHeight, config) {
      var _this;

      _classCallCheck(this, DynamicText);

      if (IsPlainObject(x)) {
        config = x;
        x = GetValue(config, 'x', 0);
        y = GetValue(config, 'y', 0);
        fixedWidth = GetValue(config, 'width', 0);
        fixedHeight = GetValue(config, 'height', 0);
      } else if (IsPlainObject(fixedWidth)) {
        config = fixedWidth;
        fixedWidth = GetValue(config, 'width', 0);
        fixedHeight = GetValue(config, 'height', 0);
      }

      var width = fixedWidth === 0 ? 1 : fixedWidth;
      var height = fixedHeight === 0 ? 1 : fixedHeight;
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexDynamicText';
      _this.autoRound = true;
      _this.padding = {};
      _this.textStyle = new TextStyle(GetValue(config, 'style', undefined));
      _this.background = new Background(_assertThisInitialized(_this), GetValue(config, 'background', undefined));
      _this.innerBounds = new InnerBounds(_assertThisInitialized(_this), GetValue(config, 'innerBounds', undefined));
      _this.children = [];
      _this.lastAppendedChildren = [];
      _this.poolManager = new PoolManager(config);

      _this.setFixedSize(fixedWidth, fixedHeight);

      _this.setPadding(GetValue(config, 'padding', 0));

      _this.setWrapConfig(GetValue(config, 'wrap', undefined));

      var text = GetValue(config, 'text', undefined);

      if (text) {
        _this.setText(text);
      }

      return _this;
    }

    _createClass(DynamicText, [{
      key: "setFixedSize",
      value: function setFixedSize(width, height) {
        if (width === undefined) {
          width = 0;
        }

        if (height === undefined) {
          height = 0;
        }

        if (width > 0 && height > 0) {
          if (this.fixedWidth !== width || this.fixedHeight !== height) {
            this.dirty = true;
          }
        } else {
          this.dirty = true;
        }

        this.fixedWidth = width;
        this.fixedHeight = height;
        return this;
      }
    }, {
      key: "updateTexture",
      value: function updateTexture() {
        this.clear();
        this.drawContent();

        _get(_getPrototypeOf(DynamicText.prototype), "updateTexture", this).call(this);

        return this;
      }
    }]);

    return DynamicText;
  }(Canvas);

  Object.assign(DynamicText.prototype, Methods);

  return DynamicText;

})));
