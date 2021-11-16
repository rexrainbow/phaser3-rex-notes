(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextextplayerplugin = factory());
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
  var GetValue$W = function GetValue(source, key, defaultValue) {
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
      return key === undefined ? this.data : GetValue$W(this.data, key, defaultValue);
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

  var DegToRad$2 = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var GetValue$V = Phaser.Utils.Objects.GetValue;

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
        this.rotation = DegToRad$2(value);
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


        var width = GetValue$V(o, 'width', undefined);
        var height = GetValue$V(o, 'height', undefined);
        var scaleX = GetValue$V(o, 'scaleX', undefined);
        var scaleY = GetValue$V(o, 'scaleY', undefined);

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

  var GetValue$U = Phaser.Utils.Objects.GetValue;

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
          defaultRadiusX = GetValue$U(config, 'x', 0);
          defaultRadiusY = GetValue$U(config, 'y', 0);
        }

        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue$U(config, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue$U(config, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue$U(config, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue$U(config, 'br', undefined), defaultRadiusX, defaultRadiusY);
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

  var DegToRad$1 = Phaser.Math.DegToRad;
  var Rad0 = DegToRad$1(0);
  var Rad90 = DegToRad$1(90);
  var Rad180 = DegToRad$1(180);
  var Rad270 = DegToRad$1(270);

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

  var GetValue$T = Phaser.Utils.Objects.GetValue;

  var Background = /*#__PURE__*/function (_Base) {
    _inherits(Background, _Base);

    var _super = _createSuper(Background);

    function Background(parent, config) {
      var _this;

      _classCallCheck(this, Background);

      _this = _super.call(this, parent, 'background');

      _this.setColor(GetValue$T(config, 'color', null), GetValue$T(config, 'color2', null), GetValue$T(config, 'horizontalGradient', true));

      _this.setStroke(GetValue$T(config, 'stroke', null), GetValue$T(config, 'strokeThickness', 2));

      _this.setCornerRadius(GetValue$T(config, 'cornerRadius', 0), GetValue$T(config, 'cornerIteration', null));

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

  var GetValue$S = Phaser.Utils.Objects.GetValue;

  var InnerBounds = /*#__PURE__*/function (_Base) {
    _inherits(InnerBounds, _Base);

    var _super = _createSuper(InnerBounds);

    function InnerBounds(parent, config) {
      var _this;

      _classCallCheck(this, InnerBounds);

      _this = _super.call(this, parent, 'background');

      _this.setColor(GetValue$S(config, 'color', null), GetValue$S(config, 'color2', null), GetValue$S(config, 'horizontalGradient', true));

      _this.setStroke(GetValue$S(config, 'stroke', null), GetValue$S(config, 'strokeThickness', 2));

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

  var GetValue$R = Phaser.Utils.Objects.GetValue;

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
        this.setBold(GetValue$R(o, 'bold', false));
        this.setItalic(GetValue$R(o, 'italic', false));
        this.setFontSize(GetValue$R(o, 'fontSize', '16px'));
        this.setFontFamily(GetValue$R(o, 'fontFamily', 'Courier'));
        this.setColor(GetValue$R(o, 'color', '#fff'));
        this.setStrokeStyle(GetValue$R(o, 'stroke', null), GetValue$R(o, 'strokeThickness', 0));
        this.setShadow(GetValue$R(o, 'shadowColor', null), GetValue$R(o, 'shadowOffsetX', 0), GetValue$R(o, 'shadowOffsetY', 0), GetValue$R(o, 'shadowBlur', 0));
        this.setOffset(GetValue$R(o, 'offsetX', 0), GetValue$R(o, 'offsetY', 0));
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

  var GetValue$Q = Phaser.Utils.Objects.GetValue;

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
      padding.left = GetValue$Q(key, 'left', 0);
      padding.right = GetValue$Q(key, 'right', 0);
      padding.top = GetValue$Q(key, 'top', 0);
      padding.bottom = GetValue$Q(key, 'bottom', 0);
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

  var IsCommand = function IsCommand(bob) {
    return bob.type === CmdTypeName;
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

  var AppendCommand$3 = function AppendCommand(name, callback, param, scope) {
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

  var GetValue$P = Phaser.Utils.Objects.GetValue;

  var RunWordWrap$1 = function RunWordWrap(config) {
    // Parse parameters
    var startIndex = GetValue$P(config, 'start', 0);
    var extraTopPadding = GetValue$P(config, 'padding.top', 0);
    var extraBottomPadding = GetValue$P(config, 'padding.bottom', 0); // Add extra space below last line
    // Get lineHeight, maxLines

    var lineHeight = GetValue$P(config, 'lineHeight', undefined);
    var maxLines;

    if (lineHeight === undefined) {
      // Calculate lineHeight via maxLines, in fixedHeight mode
      maxLines = GetValue$P(config, 'maxLines', 0);

      if (this.fixedHeight > 0) {
        var innerHeight = this.fixedHeight - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
        lineHeight = innerHeight / maxLines;
      } else {
        lineHeight = 0;
      }
    } else {
      if (this.fixedHeight > 0) {
        // Calculate maxLines via lineHeight, in fixedHeight mode
        maxLines = GetValue$P(config, 'maxLines', undefined);

        if (maxLines === undefined) {
          var innerHeight = this.fixedHeight - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
          maxLines = Math.floor(innerHeight / lineHeight);
        }
      } else {
        maxLines = GetValue$P(config, 'maxLines', 0); // Default is show all lines
      }
    }

    var showAllLines = maxLines === 0; // Get wrapWidth

    var wrapWidth = GetValue$P(config, 'wrapWidth', undefined);

    if (wrapWidth === undefined) {
      if (this.fixedWidth > 0) {
        wrapWidth = this.fixedWidth - this.padding.left - this.padding.right;
      } else {
        wrapWidth = Infinity; // No word-wrap
      }
    }

    var letterSpacing = GetValue$P(config, 'letterSpacing', 0);
    var hAlign = GetValue$P(config, 'hAlign', 0);
    var vAlign = GetValue$P(config, 'vAlign', 0);
    var charWrap = GetValue$P(config, 'charWrap', false);
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

  var GetValue$O = Phaser.Utils.Objects.GetValue;

  var RunVerticalWrap$1 = function RunVerticalWrap(config) {
    // Parse parameters
    var startIndex = GetValue$O(config, 'start', 0);
    var extraTopPadding = GetValue$O(config, 'padding.top', 0);
    var extraBottomPadding = GetValue$O(config, 'padding.bottom', 0); // Add extra space below last character

    var extraLeftPadding = GetValue$O(config, 'padding.left', 0);
    var extraRightPadding = GetValue$O(config, 'padding.right', 0);
    var lineWidth = GetValue$O(config, 'lineWidth', undefined);
    var maxLines;

    if (lineWidth === undefined) {
      // Calculate lineWidth via maxLines, in fixedWidth mode
      maxLines = GetValue$O(config, 'maxLines', 0);

      if (this.fixedWidth > 0) {
        var innerWidth = this.fixedWidth - this.padding.left - this.padding.right - extraLeftPadding - extraRightPadding;
        lineWidth = innerWidth / maxLines;
      } else {
        lineWidth = 0;
      }
    } else {
      if (this.fixedWidth > 0) {
        // Calculate maxLines via lineWidth, in fixedWidth mode
        maxLines = GetValue$O(config, 'maxLines', undefined);

        if (maxLines === undefined) {
          var innerWidth = this.fixedWidth - this.padding.left - this.padding.right;
          maxLines = Math.floor(innerWidth / lineWidth);
        }
      } else {
        maxLines = GetValue$O(config, 'maxLines', 0); // Default is show all lines
      }
    }

    var showAllLines = maxLines === 0; // Get fixedChildHeight

    var fixedChildHeight = GetValue$O(config, 'fixedChildHeight', undefined);

    if (fixedChildHeight === undefined) {
      var charPerLine = GetValue$O(config, 'charPerLine', undefined);

      if (charPerLine !== undefined) {
        var innerHeight = this.fixedHeight - this.padding.top - this.padding.bottom - extraTopPadding - extraBottomPadding;
        fixedChildHeight = Math.floor(innerHeight / charPerLine);
      }
    } // Get wrapHeight


    var wrapHeight = GetValue$O(config, 'wrapHeight', undefined);

    if (wrapHeight === undefined) {
      if (this.fixedHeight > 0) {
        wrapHeight = this.fixedHeight - this.padding.top - this.padding.bottom;
      } else {
        wrapHeight = Infinity; // No word-wrap
      }
    }

    var letterSpacing = GetValue$O(config, 'letterSpacing', 0);
    var rtl = GetValue$O(config, 'rtl', true);
    var hAlign = GetValue$O(config, 'hAlign', rtl ? 2 : 0);
    var vAlign = GetValue$O(config, 'vAlign', 0);
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

  var Methods$2 = {
    setPadding: SetPadding,
    getPadding: GetPadding,
    modifyTextStyle: ModifyTextStyle,
    removeChildren: RemoveChildren,
    clearContent: ClearContent,
    setText: SetText,
    appendText: AppendText,
    appendImage: AppendImage,
    appendCommand: AppendCommand$3,
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

  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$N = Phaser.Utils.Objects.GetValue;

  var DynamicText = /*#__PURE__*/function (_Canvas) {
    _inherits(DynamicText, _Canvas);

    var _super = _createSuper(DynamicText);

    function DynamicText(scene, x, y, fixedWidth, fixedHeight, config) {
      var _this;

      _classCallCheck(this, DynamicText);

      if (IsPlainObject$1(x)) {
        config = x;
        x = GetValue$N(config, 'x', 0);
        y = GetValue$N(config, 'y', 0);
        fixedWidth = GetValue$N(config, 'width', 0);
        fixedHeight = GetValue$N(config, 'height', 0);
      } else if (IsPlainObject$1(fixedWidth)) {
        config = fixedWidth;
        fixedWidth = GetValue$N(config, 'width', 0);
        fixedHeight = GetValue$N(config, 'height', 0);
      }

      var width = fixedWidth === 0 ? 1 : fixedWidth;
      var height = fixedHeight === 0 ? 1 : fixedHeight;
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexDynamicText';
      _this.autoRound = true;
      _this.padding = {};
      _this.textStyle = new TextStyle(GetValue$N(config, 'style', undefined));
      _this.background = new Background(_assertThisInitialized(_this), GetValue$N(config, 'background', undefined));
      _this.innerBounds = new InnerBounds(_assertThisInitialized(_this), GetValue$N(config, 'innerBounds', undefined));
      _this.children = [];
      _this.lastAppendedChildren = [];
      _this.poolManager = new PoolManager(config);

      _this.setFixedSize(fixedWidth, fixedHeight);

      _this.setPadding(GetValue$N(config, 'padding', 0));

      _this.setWrapConfig(GetValue$N(config, 'wrap', undefined));

      var text = GetValue$N(config, 'text', undefined);

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

  Object.assign(DynamicText.prototype, Methods$2);

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
      }

      this._privateEE = eventEmitter === true || eventEmitter === undefined;
      this._eventEmitter = this._privateEE ? new EventEmitterClass() : eventEmitter;
      return this;
    },
    destroyEventEmitter: function destroyEventEmitter() {
      if (this._eventEmitter && this._privateEE) {
        this._eventEmitter.shutdown();
      }

      return this;
    },
    getEventEmitter: function getEventEmitter() {
      return this._eventEmitter;
    },
    on: function on() {
      if (this._eventEmitter) {
        this._eventEmitter.on.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    once: function once() {
      if (this._eventEmitter) {
        this._eventEmitter.once.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    off: function off() {
      if (this._eventEmitter) {
        this._eventEmitter.off.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    emit: function emit(event) {
      if (this._eventEmitter && event) {
        this._eventEmitter.emit.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    addListener: function addListener() {
      if (this._eventEmitter) {
        this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    removeListener: function removeListener() {
      if (this._eventEmitter) {
        this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    removeAllListeners: function removeAllListeners() {
      if (this._eventEmitter) {
        this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    listenerCount: function listenerCount() {
      if (this._eventEmitter) {
        return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
      }

      return 0;
    },
    listeners: function listeners() {
      if (this._eventEmitter) {
        return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
      }

      return [];
    },
    eventNames: function eventNames() {
      if (this._eventEmitter) {
        return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
      }

      return [];
    }
  };

  // https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js
  var EscapeRegex = function EscapeRegex(s) {
    return s.replace(re0, '\\$&').replace(re1, '\\x2d');
  };

  var re0 = /[|\\{}()[\]^$+*?.]/g;
  var re1 = /-/g;

  var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

  var convert = function convert(s) {
    if (typeof s !== 'string') {
      return s;
    }

    if (s === '') {
      s = null;
    } else if (FLOAT.test(s)) {
      s = parseFloat(s);
    } else {
      if (s === 'false') {
        s = false;
      } else if (s === 'true') {
        s = true;
      }
    }

    return s;
  };

  var ParseValue = function ParseValue(text, valueConverter) {
    if (text == null) {
      return [];
    }

    var values = text.split(',');

    for (var i = 0, cnt = values.length; i < cnt; i++) {
      values[i] = valueConverter(values[i]);
    }

    return values;
  };

  var DefaultTagExpression = "[a-z0-9-_.]+";
  var DefaultValueExpression = "[ #a-z-_.0-9,|&]+";

  var BypassValueConverter = function BypassValueConverter(s) {
    return s;
  };

  var BracketParser = /*#__PURE__*/function () {
    function BracketParser(config) {
      _classCallCheck(this, BracketParser);

      // Event emitter
      this.setEventEmitter(GetValue$W(config, 'eventEmitter', undefined)); // Parameters for regex

      this.setTagExpression(GetValue$W(config, 'regex.tag', DefaultTagExpression));
      this.setValueExpression(GetValue$W(config, 'regex.value', DefaultValueExpression)); // Value convert

      this.setValueConverter(GetValue$W(config, 'valueConvert', true)); // Brackets and generate regex

      var delimiters = GetValue$W(config, 'delimiters', '<>');
      this.setDelimiters(delimiters[0], delimiters[1]);
      this.isRunning = false;
      this.isPaused = false;
      this.skipEventFlag = false;
      this.lastTagStart = null;
      this.lastTagEnd = null;
      this.lastContent = null;
    }

    _createClass(BracketParser, [{
      key: "shutdown",
      value: function shutdown() {
        this.destroyEventEmitter();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "setTagExpression",
      value: function setTagExpression(express) {
        this.tagExpression = express;
        return this;
      }
    }, {
      key: "setValueExpression",
      value: function setValueExpression(express) {
        this.valueExpression = express;
        return this;
      }
    }, {
      key: "setValueConverter",
      value: function setValueConverter(converter) {
        if (converter === true) {
          converter = convert;
        } else if (!converter) {
          converter = BypassValueConverter;
        }

        this.valueConverter = converter;
        return this;
      }
    }, {
      key: "setDelimiters",
      value: function setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
          delimiterRight = delimiterLeft[1];
          delimiterLeft = delimiterLeft[0];
        }

        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;
        delimiterLeft = EscapeRegex(delimiterLeft);
        delimiterRight = EscapeRegex(delimiterRight);
        var tagOn = "".concat(delimiterLeft, "(").concat(this.tagExpression, ")(=(").concat(this.valueExpression, "))?").concat(delimiterRight);
        var tagOff = "".concat(delimiterLeft, "/(").concat(this.tagExpression, ")").concat(delimiterRight);
        this.reTagOn = RegExp(tagOn, 'i');
        this.reTagOff = RegExp(tagOff, 'i');
        this.reSplit = RegExp("".concat(tagOn, "|").concat(tagOff), 'gi');
        return this;
      }
    }, {
      key: "setSource",
      value: function setSource(source) {
        this.source = source;
        return this;
      }
    }, {
      key: "resetIndex",
      value: function resetIndex(index) {
        if (index === undefined) {
          index = 0;
        }

        this.progressIndex = index;
        this.reSplit.lastIndex = index;
        this.lastTagStart = null;
        this.lastTagEnd = null;
        this.lastContent = null;
        return this;
      }
    }, {
      key: "start",
      value: function start(source) {
        this.setSource(source).restart();
        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.resetIndex().next();
      }
    }, {
      key: "next",
      value: function next() {
        if (this.isPaused) {
          this.onResume();
        }

        var text = this.source,
            lastIndex = text.length;

        if (this.reSplit.lastIndex === 0) {
          this.onStart();
        }

        while (!this.isPaused) {
          var regexResult = this.reSplit.exec(text);

          if (!regexResult) {
            if (this.progressIndex < lastIndex) {
              this.onContent(text.substring(this.progressIndex, lastIndex));
            }

            this.onComplete();
            return;
          }

          var match = regexResult[0];
          var matchStart = this.reSplit.lastIndex - match.length;

          if (this.progressIndex < matchStart) {
            this.onContent(text.substring(this.progressIndex, matchStart));
          }

          if (this.reTagOff.test(match)) {
            this.onTagEnd(match);
          } else {
            this.onTagStart(match);
          }

          this.progressIndex = this.reSplit.lastIndex;
        }
      }
    }, {
      key: "skipEvent",
      value: function skipEvent() {
        this.skipEventFlag = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        if (!this.isPaused) {
          this.onPause();
        }

        return this;
      }
    }, {
      key: "onContent",
      value: function onContent(content) {
        this.emit('content', content);
        this.lastContent = content;
      }
    }, {
      key: "onTagStart",
      value: function onTagStart(tagContent) {
        var regexResult = tagContent.match(this.reTagOn);
        var tag = regexResult[1];
        var values = ParseValue(regexResult[3], this.valueConverter);
        this.skipEventFlag = false;
        this.emit.apply(this, ["+".concat(tag)].concat(_toConsumableArray(values)));

        if (!this.skipEventFlag) {
          this.emit.apply(this, ['+', tag].concat(_toConsumableArray(values)));
        }

        this.lastTagStart = tag;
      }
    }, {
      key: "onTagEnd",
      value: function onTagEnd(tagContent) {
        var tag = tagContent.match(this.reTagOff)[1];
        this.skipEventFlag = false;
        this.emit("-".concat(tag));

        if (!this.skipEventFlag) {
          this.emit('-', tag);
        }

        this.lastTagEnd = tag;
      }
    }, {
      key: "onStart",
      value: function onStart() {
        this.isRunning = true;
        this.emit('start', this);
      }
    }, {
      key: "onComplete",
      value: function onComplete() {
        this.isRunning = false;
        this.emit('complete', this);
        this.resetIndex();
      }
    }, {
      key: "onPause",
      value: function onPause() {
        this.isPaused = true;
        this.emit('pause', this);
      }
    }, {
      key: "onResume",
      value: function onResume() {
        this.isPaused = false;
        this.emit('resume', this);
      }
    }]);

    return BracketParser;
  }();

  Object.assign(BracketParser.prototype, EventEmitterMethods);

  var GetValue$M = Phaser.Utils.Objects.GetValue;

  var OnParseColorTag = function OnParseColorTag(textPlayer, parser, config) {
    var tagName = GetValue$M(config, 'tags.color', 'color');
    var defaultColor;
    parser.on('start', function () {
      defaultColor = textPlayer.textStyle.color;
    }).on("+".concat(tagName), function (color) {
      textPlayer.textStyle.setColor(color);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setColor(defaultColor);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setColor(defaultColor);
    });
  };

  var GetValue$L = Phaser.Utils.Objects.GetValue;

  var OnParseStrokeColorTag = function OnParseStrokeColorTag(textPlayer, parser, config) {
    var tagName = GetValue$L(config, 'tags.stroke', 'stroke');
    var defaultStroke;
    parser.on('start', function () {
      defaultStroke = textPlayer.textStyle.stroke;
      textPlayer.textStyle.setStrokeStyle(null);
    }).on("+".concat(tagName), function (color) {
      if (color === undefined) {
        color = defaultStroke;
      }

      textPlayer.textStyle.setStrokeStyle(color);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setStrokeStyle(null);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setStrokeStyle(defaultStroke);
    });
  };

  var GetValue$K = Phaser.Utils.Objects.GetValue;

  var OnParseBoldTag$1 = function OnParseBoldTag(textPlayer, parser, config) {
    var tagName = GetValue$K(config, 'tags.b', 'b');
    parser.on('start', function () {
      textPlayer.textStyle.setBold(false);
    }).on("+".concat(tagName), function () {
      textPlayer.textStyle.setBold(true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setBold(false);
      parser.skipEvent();
    });
  };

  var GetValue$J = Phaser.Utils.Objects.GetValue;

  var OnParseItalicTag = function OnParseItalicTag(textPlayer, parser, config) {
    var tagName = GetValue$J(config, 'tags.i', 'i');
    parser.on('start', function () {
      textPlayer.textStyle.setItalic(false);
    }).on("+".concat(tagName), function () {
      textPlayer.textStyle.setItalic(true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setItalic(false);
      parser.skipEvent();
    });
  };

  var GetValue$I = Phaser.Utils.Objects.GetValue;

  var OnParseFontSizeTag = function OnParseFontSizeTag(textPlayer, parser, config) {
    var tagName = GetValue$I(config, 'tags.size', 'size');
    var defaultFontSize;
    parser.on('start', function () {
      defaultFontSize = textPlayer.textStyle.fontSize;
    }).on("+".concat(tagName), function (fontSize) {
      textPlayer.textStyle.setFontSize(fontSize);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setFontSize(defaultFontSize);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setFontSize(defaultFontSize);
    });
  };

  var GetValue$H = Phaser.Utils.Objects.GetValue;

  var OnParseOffsetYTag = function OnParseOffsetYTag(textPlayer, parser, config) {
    var tagName = GetValue$H(config, 'tags.y', 'y');
    var defaultOffsetY;
    parser.on('start', function () {
      defaultOffsetY = textPlayer.textStyle.offsetY;
      textPlayer.textStyle.setOffsetY(0);
    }).on("+".concat(tagName), function (y) {
      if (y === undefined) {
        y = defaultOffsetY;
      }

      textPlayer.textStyle.setOffsetY(y);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setOffsetY(0);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setOffsetY(0);
    });
  };

  var GetValue$G = Phaser.Utils.Objects.GetValue;

  var OnParseShadowColorTag = function OnParseShadowColorTag(textPlayer, parser, config) {
    var tagName = GetValue$G(config, 'tags.shadow', 'shadow');
    var defaultShadowColor;
    parser.on('start', function () {
      defaultShadowColor = textPlayer.textStyle.shadowColor;
      textPlayer.textStyle.setShadowColor(null);
    }).on("+".concat(tagName), function (color) {
      if (color === undefined) {
        color = defaultShadowColor;
      }

      textPlayer.textStyle.setShadowColor(color);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setShadowColor(null);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setShadowColor(defaultShadowColor);
    });
  };

  var GetValue$F = Phaser.Utils.Objects.GetValue;

  var OnParseImageTag = function OnParseImageTag(textPlayer, parser, config) {
    var tagName = GetValue$F(config, 'tags.img', 'img');
    parser.on("+".concat(tagName), function (name) {
      var imgData = textPlayer.imageManager.get(name);
      AppendImage.call(textPlayer, imgData.key, imgData.frame, {
        width: imgData.width,
        hieght: imgData.height,
        leftSpace: imgData.left,
        rightSpace: imgData.right
      });
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var GetValue$E = Phaser.Utils.Objects.GetValue;

  var OnParseTypingSpeedTag = function OnParseTypingSpeedTag(textPlayer, parser, config) {
    var tagName = GetValue$E(config, 'tags.speed', 'speed');
    var defaultSpeed;
    parser.on('start', function () {
      defaultSpeed = textPlayer.typeWriter.speed;
    }).on("+".concat(tagName), function (speed) {
      AppendCommand$2(textPlayer, speed);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      AppendCommand$2(textPlayer, defaultSpeed);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.typeWriter.speed = defaultSpeed;
    });
  };

  var SetSpeed = function SetSpeed(speed) {
    this.typeWriter.setSpeed(speed); // this: textPlayer
  };

  var AppendCommand$2 = function AppendCommand(textPlayer, speed) {
    AppendCommand$3.call(textPlayer, 'speed', // name
    SetSpeed, // callback
    speed, // params
    textPlayer // scope
    );
  };

  var GetValue$D = Phaser.Utils.Objects.GetValue;

  var OnParsePlaySoundEffectTag = function OnParsePlaySoundEffectTag(textPlayer, parser, config) {
    var tagName = GetValue$D(config, 'tags.se', 'se');
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      AppendCommand$3.call(textPlayer, 'se', // name
      PlaySoundEffect, // callback
      [name, fadeInTime], // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var PlaySoundEffect = function PlaySoundEffect(params) {
    if (this.skipSoundEffect) {
      return;
    }

    var name = params[0];
    var fadeInTime = params[1];
    this.soundManager.playSoundEffect(name); // this: textPlayer

    if (fadeInTime) {
      this.soundManager.fadeInSoundEffect(fadeInTime);
    }
  };

  var GetValue$C = Phaser.Utils.Objects.GetValue;

  var OnParseFadeInSoundEffectTag = function OnParseFadeInSoundEffectTag(textPlayer, parser, config) {
    var tagName = GetValue$C(config, 'tags.se.fadein', 'se.fadein');
    parser.on("+".concat(tagName), function (time) {
      AppendCommand$3.call(textPlayer, 'se.fadein', // name
      FadeInSoundEffect, // callback
      time, // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var FadeInSoundEffect = function FadeInSoundEffect(time) {
    // this: textPlayer
    this.soundManager.fadeInSoundEffect(time);
  };

  var GetValue$B = Phaser.Utils.Objects.GetValue;

  var OnParseFadeOutSoundEffectTag = function OnParseFadeOutSoundEffectTag(textPlayer, parser, config) {
    var tagName = GetValue$B(config, 'tags.se.fadeout', 'se.fadeout');
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      AppendCommand$3.call(textPlayer, 'se.fadeout', // name
      FadeOutSoundEffect, // callback
      [time, isStopped], // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var FadeOutSoundEffect = function FadeOutSoundEffect(params) {
    var _this$soundManager;

    // this: textPlayer
    (_this$soundManager = this.soundManager).fadeOutSoundEffect.apply(_this$soundManager, _toConsumableArray(params));
  };

  var GetValue$A = Phaser.Utils.Objects.GetValue;

  var OnParseSetSoundEffectVolumeTag = function OnParseSetSoundEffectVolumeTag(textPlayer, parser, config) {
    var tagName = GetValue$A(config, 'tags.se.volume', 'se.volume');
    parser.on("+".concat(tagName), function (name) {
      AppendCommand$3.call(textPlayer, 'se.volume', // name
      SetSoundEffectVolume, // callback
      name, // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var SetSoundEffectVolume = function SetSoundEffectVolume(name) {
    // this: textPlayer
    this.soundManager.setSoundEffectVolume(name);
  };

  var GetValue$z = Phaser.Utils.Objects.GetValue;

  var OnParsePlayBackgroundMusicTag = function OnParsePlayBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = GetValue$z(config, 'tags.bgm', 'bgm');
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      AppendCommand$3.call(textPlayer, 'bgm', // name
      PlayBackgroundMusic, // callback
      [name, fadeInTime], // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, 'bgm.stop', // name
      StopBackgroundMusic, // callback
      undefined, // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var PlayBackgroundMusic = function PlayBackgroundMusic(params) {
    var name = params[0];
    var fadeInTime = params[1]; // this: textPlayer

    this.soundManager.playBackgroundMusic(name);

    if (fadeInTime) {
      this.soundManager.fadeInBackgroundMusic(fadeInTime);
    }
  };

  var StopBackgroundMusic = function StopBackgroundMusic() {
    // this: textPlayer
    this.soundManager.stopBackgroundMusic();
  };

  var GetValue$y = Phaser.Utils.Objects.GetValue;

  var OnParseFadeInBackgroundMusicTag = function OnParseFadeInBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = GetValue$y(config, 'tags.bgm.fadein', 'bgm.fadein');
    parser.on("+".concat(tagName), function (time) {
      AppendCommand$3.call(textPlayer, 'bgm.fadein', // name
      FadeInBackgroundMusic, // callback
      time, // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var FadeInBackgroundMusic = function FadeInBackgroundMusic(time) {
    // this: textPlayer
    this.soundManager.fadeInBackgroundMusic(time);
  };

  var GetValue$x = Phaser.Utils.Objects.GetValue;

  var OnParseFadeOutBackgroundMusicTag = function OnParseFadeOutBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = GetValue$x(config, 'tags.bgm.fadeout', 'bgm.fadeout');
    parser.on("+".concat(tagName), function (time, isStopped) {
      AppendCommand$3.call(textPlayer, 'bgm.fadeout', // name
      FadeOutBackgroundMusic, // callback
      [time, isStopped], // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var FadeOutBackgroundMusic = function FadeOutBackgroundMusic(params) {
    var _this$soundManager;

    // this: textPlayer
    (_this$soundManager = this.soundManager).fadeOutBackgroundMusic.apply(_this$soundManager, _toConsumableArray(params));
  };

  var GetValue$w = Phaser.Utils.Objects.GetValue;

  var OnParseCrossFadeBackgroundMusicTag = function OnParseCrossFadeBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = GetValue$w(config, 'tags.bgm.cross', 'bgm.cross');
    parser.on("+".concat(tagName), function (name, fadeTime) {
      AppendCommand$3.call(textPlayer, 'bgm.cross', // name
      CrossFadeBackgroundMusic, // callback
      [name, fadeTime], // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var CrossFadeBackgroundMusic = function CrossFadeBackgroundMusic(params) {
    var _this$soundManager;

    // this: textPlayer
    (_this$soundManager = this.soundManager).crossFadeBackgroundMusic.apply(_this$soundManager, _toConsumableArray(params));
  };

  var GetValue$v = Phaser.Utils.Objects.GetValue;

  var OnParsePauseBackgroundMusicTag = function OnParsePauseBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = GetValue$v(config, 'tags.bgm.pause', 'bgm.pause');
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, 'bgm.pause', // name
      PauseBackgroundMusic, // callback
      undefined, // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, 'bgm.resume', // name
      ResumeBackgroundMusic, // callback
      undefined, // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var PauseBackgroundMusic = function PauseBackgroundMusic() {
    // this: textPlayer
    this.soundManager.pauseBackgroundMusic();
  };

  var ResumeBackgroundMusic = function ResumeBackgroundMusic() {
    // this: textPlayer
    this.soundManager.resumeBackgroundMusic();
  };

  var GetValue$u = Phaser.Utils.Objects.GetValue;

  var OnParseFadeInCameraTag = function OnParseFadeInCameraTag(textPlayer, parser, config) {
    var tagName = GetValue$u(config, 'tags.camera.fadein', 'camera.fadein');
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      AppendCommand$3.call(textPlayer, 'camera.fadein', // name
      PlayFadeInEffect, // callback
      [duration, red, green, blue], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var PlayFadeInEffect = function PlayFadeInEffect(params) {
    var _this$camera;

    // this: textPlayer
    (_this$camera = this.camera).fadeIn.apply(_this$camera, _toConsumableArray(params));
  };

  var GetValue$t = Phaser.Utils.Objects.GetValue;

  var OnParseFadeOutCameraTag = function OnParseFadeOutCameraTag(textPlayer, parser, config) {
    var tagName = GetValue$t(config, 'tags.camera.fadeout', 'camera.fadeout');
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      AppendCommand$3.call(textPlayer, 'camera.fadeout', // name
      PlayFadeOutEffect, // callback
      [duration, red, green, blue], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var PlayFadeOutEffect = function PlayFadeOutEffect(params) {
    var _this$camera;

    // this: textPlayer
    (_this$camera = this.camera).fadeOut.apply(_this$camera, _toConsumableArray(params));
  };

  var GetValue$s = Phaser.Utils.Objects.GetValue;

  var OnParseShakeCameraTag = function OnParseShakeCameraTag(textPlayer, parser, config) {
    var tagName = GetValue$s(config, 'tags.camera.shake', 'camera.shake');
    parser.on("+".concat(tagName), function (duration, intensity) {
      AppendCommand$3.call(textPlayer, 'camera.shake', // name
      PlayShakeEffect, // callback
      [duration, intensity], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var PlayShakeEffect = function PlayShakeEffect(params) {
    var _this$camera;

    // this: textPlayer
    (_this$camera = this.camera).shake.apply(_this$camera, _toConsumableArray(params));
  };

  var GetValue$r = Phaser.Utils.Objects.GetValue;

  var OnParseFlashCameraTag = function OnParseFlashCameraTag(textPlayer, parser, config) {
    var tagName = GetValue$r(config, 'tags.camera.flash', 'camera.flash');
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      AppendCommand$3.call(textPlayer, 'camera.flash', // name
      PlayFlashEffect, // callback
      [duration, red, green, blue], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var PlayFlashEffect = function PlayFlashEffect(params) {
    var _this$camera;

    // this: textPlayer
    (_this$camera = this.camera).flash.apply(_this$camera, _toConsumableArray(params));
  };

  var GetValue$q = Phaser.Utils.Objects.GetValue;

  var OnParseZoomCameraTag = function OnParseZoomCameraTag(textPlayer, parser, config) {
    var tagName = GetValue$q(config, 'tags.camera.zoom', 'camera.zoom');
    parser.on("+".concat(tagName), function (value) {
      AppendCommand$3.call(textPlayer, 'camera.zoom', // name
      Zoom, // callback
      value, // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      AppendCommand$3.call(textPlayer, 'camera.zoom.to', // name
      ZoomTo, // callback
      [value, duration, ease], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var Zoom = function Zoom(value) {
    // this: textPlayer
    this.camera.setZoom(value);
  };

  var ZoomTo = function ZoomTo(params) {
    var _this$camera;

    // this: textPlayer
    (_this$camera = this.camera).zoomTo.apply(_this$camera, _toConsumableArray(params));
  };

  var GetValue$p = Phaser.Utils.Objects.GetValue;
  var DegToRad = Phaser.Math.DegToRad;

  var OnParseRotateCameraTag = function OnParseRotateCameraTag(textPlayer, parser, config) {
    var tagName = GetValue$p(config, 'tags.camera.rotate', 'camera.rotate');
    parser.on("+".concat(tagName), function (value) {
      value = DegToRad(value);
      AppendCommand$3.call(textPlayer, 'camera.rotate', // name
      Rotate, // callback
      value, // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      value = DegToRad(value);
      AppendCommand$3.call(textPlayer, 'camera.rotate.to', // name
      RotateTo, // callback
      [value, duration, ease], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var Rotate = function Rotate(value) {
    // this: textPlayer
    this.camera.setRotation(value);
  };

  var RotateTo = function RotateTo(params) {
    var value = params[0];
    var duration = params[1];
    var ease = params[2]; // this: textPlayer

    this.camera.rotateTo(value, false, duration, ease);
  };

  var GetValue$o = Phaser.Utils.Objects.GetValue;

  var OnParseScrollCameraTag = function OnParseScrollCameraTag(textPlayer, parser, config) {
    var tagName = GetValue$o(config, 'tags.camera.scroll', 'camera.scroll');
    parser.on("+".concat(tagName), function (x, y) {
      AppendCommand$3.call(textPlayer, 'camera.scroll', // name
      Scroll, // callback
      [x, y], // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (x, y, duration, ease) {
      AppendCommand$3.call(textPlayer, 'camera.scroll.to', // name
      ScrollTo, // callback
      [x, y, duration, ease], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var Scroll = function Scroll(params) {
    var _this$camera;

    // this: textPlayer
    (_this$camera = this.camera).setScroll.apply(_this$camera, _toConsumableArray(params));
  };

  var ScrollTo = function ScrollTo(params) {
    var x = params[0];
    var y = params[1];
    var duration = params[2];
    var ease = params[3]; // this: textPlayer

    var camera = this.camera;
    var xSave = camera.scrollX;
    var ySave = camera.scrollY;
    camera.setScroll(x, y);
    x += camera.centerX;
    y += camera.centerY;
    camera.setScroll(xSave, ySave); // x,y in pan() is the centerX, centerY

    camera.pan(x, y, duration, ease);
  };

  var GetValue$n = Phaser.Utils.Objects.GetValue;

  var OnParseWaitTag = function OnParseWaitTag(textPlayer, parser, config) {
    var tagWait = GetValue$n(config, 'tags.wait', 'wait');
    var tagClick = GetValue$n(config, 'tags.click', 'click');
    parser.on("+".concat(tagWait), function (name) {
      AppendCommand$1(textPlayer, name);
      parser.skipEvent();
    }).on("-".concat(tagWait), function () {
      parser.skipEvent();
    }).on("+".concat(tagClick), function () {
      // Equal to [wait=click]
      AppendCommand$1(textPlayer, 'click');
      parser.skipEvent();
    }).on("-".concat(tagClick), function () {
      // Equal to [/wait]
      parser.skipEvent();
    });
  };

  var Wait$1 = function Wait(name) {
    this.typeWriter.wait(name); // this: textPlayer
  };

  var AppendCommand$1 = function AppendCommand(textPlayer, name) {
    AppendCommand$3.call(textPlayer, 'wait', // name
    Wait$1, // callback
    name, // params
    textPlayer // scope
    );
  };

  var GetValue$m = Phaser.Utils.Objects.GetValue;

  var IsAddSpriteTag = function IsAddSpriteTag(tags, prefix) {
    // sprite.name
    return tags.length === 2 && tags[0] === prefix;
  };

  var OnParseAddSpriteTag = function OnParseAddSpriteTag(textPlayer, parser, config) {
    var prefix = GetValue$m(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name=key,frame], or [sprite.name]


      var tags = tag.split('.');

      if (IsAddSpriteTag(tags, prefix)) {
        var name = tags[1];

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        AppendCommand$3.call(textPlayer, 'sprite.add', // name
        AddSprite, // callback
        [name].concat(args), // params
        textPlayer // scope
        );
      } else {
        return;
      }

      parser.skipEvent();
    }).on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [/sprite.name]


      var tags = tag.split('.');

      if (IsAddSpriteTag(tags, prefix)) {
        var name = tags[1];
        AppendCommand$3.call(textPlayer, 'sprite.remove', // name
        RemoveSprite, // callback
        name, // params
        textPlayer // scope
        );
      } else {
        return;
      }

      parser.skipEvent();
    });
  };

  var AddSprite = function AddSprite(params) {
    var _this$spriteManager;

    // this: textPlayer
    (_this$spriteManager = this.spriteManager).add.apply(_this$spriteManager, _toConsumableArray(params));
  };

  var RemoveSprite = function RemoveSprite(name) {
    // this: textPlayer
    this.spriteManager.remove(name);
  };

  var GetValue$l = Phaser.Utils.Objects.GetValue;

  var OnParseRemoveAllSpritesTag = function OnParseRemoveAllSpritesTag(textPlayer, parser, config) {
    var prefix = GetValue$l(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [/sprite]


      if (tag === prefix) {
        AppendCommand$3.call(textPlayer, 'sprite.removeall', // name
        RemoveAllSprites, // callback
        undefined, // params
        textPlayer // scope
        );
      } else {
        return;
      }

      parser.skipEvent();
    });
  };

  var RemoveAllSprites = function RemoveAllSprites() {
    // this: textPlayer
    this.spriteManager.removeAll();
  };

  var GetValue$k = Phaser.Utils.Objects.GetValue;

  var IsSetTextureTag = function IsSetTextureTag(tags, prefix) {
    // sprite.name.texture
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'texture';
  };

  var OnParseSetTextureTag = function OnParseSetTextureTag(textPlayer, parser, config) {
    var prefix = GetValue$k(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag, textureKey, frameKey) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.texture=key,frame]


      var tags = tag.split('.');

      if (IsSetTextureTag(tags, prefix)) {
        var name = tags[1];
        AppendCommand$3.call(textPlayer, 'sprite.texture', // name
        SetTexture, // callback
        [name, textureKey, frameKey], // params
        textPlayer // scope
        );
      } else {
        return;
      }

      parser.skipEvent();
    });
  };

  var SetTexture = function SetTexture(params) {
    var _this$spriteManager;

    // this: textPlayer
    (_this$spriteManager = this.spriteManager).setTexture.apply(_this$spriteManager, _toConsumableArray(params));
  };

  var GetValue$j = Phaser.Utils.Objects.GetValue;

  var IsPlayAnimationTag = function IsPlayAnimationTag(tags, prefix) {
    // sprite.name.play 
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'play';
  };

  var IsStopAnimationTag = function IsStopAnimationTag(tags, prefix) {
    // sprite.name.stop 
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'stop';
  };

  var OnParsePlayAnimationTag = function OnParsePlayAnimationTag(textPlayer, parser, config) {
    var prefix = GetValue$j(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.play=key], or [sprite.name.play=key0,key1,...]


      var tags = tag.split('.');
      var name;

      if (IsPlayAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      var keys = Array.prototype.slice.call(arguments, 1);
      AppendCommand$3.call(textPlayer, 'sprite.play', // name
      PlayAnimation, // callback
      [name, keys], // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.stop]


      var tags = tag.split('.');
      var name;

      if (IsStopAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      AppendCommand$3.call(textPlayer, 'sprite.stop', // name
      StopAnimation, // callback
      name, // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [/sprite.name.play]


      var tags = tag.split('.');
      var name;

      if (IsPlayAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      AppendCommand$3.call(textPlayer, 'sprite.stop', // name
      StopAnimation, // callback
      name, // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var PlayAnimation = function PlayAnimation(params) {
    var name = params[0];
    var keys = params[1];
    var key = keys.shift(); // this: textPlayer

    this.spriteManager.playAnimation(name, key);

    if (keys.length > 0) {
      this.spriteManager.chainAnimation(name, keys);
    }
  };

  var StopAnimation = function StopAnimation(name) {
    // this: textPlayer
    this.spriteManager.stopAnimation(name);
  };

  var GetValue$i = Phaser.Utils.Objects.GetValue;

  var IsChainAnimationTag = function IsChainAnimationTag(tags, prefix) {
    // sprite.name.chain 
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'chain';
  };

  var OnParseChainAnimationTag = function OnParseChainAnimationTag(textPlayer, parser, config) {
    var prefix = GetValue$i(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.chain=key]


      var tags = tag.split('.');
      var name;

      if (IsChainAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      var keys = Array.prototype.slice.call(arguments, 1);
      AppendCommand$3.call(textPlayer, 'sprite.chain', // name
      ChainAnimation, // callback
      [name, keys], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var ChainAnimation = function ChainAnimation(params) {
    var _this$spriteManager;

    // this: textPlayer
    (_this$spriteManager = this.spriteManager).chainAnimation.apply(_this$spriteManager, _toConsumableArray(params));
  };

  var GetValue$h = Phaser.Utils.Objects.GetValue;

  var IsPauseAnimationTag = function IsPauseAnimationTag(tags, prefix) {
    // sprite.name.pause 
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'pause';
  };

  var OnParsePauseAnimationTag = function OnParsePauseAnimationTag(textPlayer, parser, config) {
    var prefix = GetValue$h(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.chain=key]


      var tags = tag.split('.');
      var name;

      if (IsPauseAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      AppendCommand$3.call(textPlayer, 'sprite.pause', // name
      PauseAnimation, // callback
      name, // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var PauseAnimation = function PauseAnimation(name) {
    // this: textPlayer
    this.spriteManager.pauseAnimation(name);
  };

  var GetValue$g = Phaser.Utils.Objects.GetValue;

  var IsSetPropertyTag = function IsSetPropertyTag(tags, prefix) {
    // sprite.name.prop
    return tags.length === 3 && tags[0] === prefix;
  };

  var OnParseSetSpritePropertyTag = function OnParseSetSpritePropertyTag(textPlayer, parser, config) {
    var prefix = GetValue$g(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on("+", function (tag, value) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.prop=value]


      var tags = tag.split('.');
      var name, property;

      if (IsSetPropertyTag(tags, prefix)) {
        name = tags[1];
        property = tags[2];
      } else {
        return;
      }

      AppendCommand$3.call(textPlayer, 'sprite.set', // name
      SetProperty, // callback
      [name, property, value], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var SetProperty = function SetProperty(params) {
    var _this$spriteManager;

    // this: textPlayer
    (_this$spriteManager = this.spriteManager).setProperty.apply(_this$spriteManager, _toConsumableArray(params));
  };

  var GetValue$f = Phaser.Utils.Objects.GetValue;
  var EaseMode = {
    to: true,
    yoyo: true
  };

  var IsEasePropertyTag = function IsEasePropertyTag(tags, prefix) {
    // sprite.name.prop.to, or sprite.name.prop.yoyo
    return tags.length === 4 && tags[0] === prefix && EaseMode[tags[3]];
  };

  var OnParseEaseSpritePropertyTag = function OnParseEaseSpritePropertyTag(textPlayer, parser, config) {
    var prefix = GetValue$f(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on("+", function (tag, value, duration, ease) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.prop.to=value,duration,ease]


      var tags = tag.split('.');
      var name, property, isYoyo;

      if (IsEasePropertyTag(tags, prefix)) {
        name = tags[1];
        property = tags[2];
        isYoyo = tags[3] === 'yoyo';
      } else {
        return;
      }

      AppendCommand$3.call(textPlayer, 'sprite.ease', // name
      EaseProperty, // callback
      [name, property, value, duration, ease, isYoyo], // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };

  var EaseProperty = function EaseProperty(params) {
    var _this$spriteManager;

    // this: textPlayer
    (_this$spriteManager = this.spriteManager).easeProperty.apply(_this$spriteManager, _toConsumableArray(params));
  };

  var OnParseCustomTag = function OnParseCustomTag(textPlayer, parser, config) {
    parser.on('start', function () {
      textPlayer.emit('parser.start', parser);
    }).on('+', function (tagName) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      var startTag = "+".concat(tagName);

      for (var _len = arguments.length, value = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        value[_key - 1] = arguments[_key];
      }

      textPlayer.emit.apply(textPlayer, ["parser.".concat(startTag), parser].concat(value));
      AppendCommand(textPlayer, startTag, value);
    }).on('-', function (tagName) {
      if (parser.skipEventFlag) {
        return;
      }

      var endTag = "-".concat(tagName);
      textPlayer.emit("parser.".concat(endTag), parser);
      AppendCommand(textPlayer, endTag);
    }).on('complete', function () {
      textPlayer.emit('parser.complete', parser);
    });
  };

  var FireEvent = function FireEvent(param, tagName) {
    var eventName = "tag.".concat(tagName); // this: textPlayer

    if (param == null) {
      this.emit(eventName);
    } else {
      this.emit.apply(this, [eventName].concat(_toConsumableArray(param)));
    }
  };

  var AppendCommand = function AppendCommand(textPlayer, name, param) {
    AppendCommand$3.call(textPlayer, name, // name
    FireEvent, // callback
    param, // params
    textPlayer // scope
    );
  };

  var GetValue$e = Phaser.Utils.Objects.GetValue;

  var OnParseBoldTag = function OnParseBoldTag(textPlayer, parser, config) {
    var tagName = GetValue$e(config, 'tags.r', 'r');
    parser.on("+".concat(tagName), function () {
      AppendText.call(textPlayer, '\n');
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseContent = function OnParseContent(textPlayer, parser, config) {
    parser.on('content', function (content) {
      AppendText.call(textPlayer, content);
    });
  };

  var ParseCallbacks = [OnParseColorTag, OnParseStrokeColorTag, OnParseBoldTag$1, OnParseItalicTag, OnParseFontSizeTag, OnParseOffsetYTag, OnParseShadowColorTag, OnParseImageTag, OnParseTypingSpeedTag, OnParsePlaySoundEffectTag, OnParseFadeInSoundEffectTag, OnParseFadeOutSoundEffectTag, OnParseSetSoundEffectVolumeTag, OnParsePlayBackgroundMusicTag, OnParseFadeInBackgroundMusicTag, OnParseFadeOutBackgroundMusicTag, OnParseCrossFadeBackgroundMusicTag, OnParsePauseBackgroundMusicTag, OnParseFadeInCameraTag, OnParseFadeOutCameraTag, OnParseShakeCameraTag, OnParseFlashCameraTag, OnParseZoomCameraTag, OnParseRotateCameraTag, OnParseScrollCameraTag, OnParseWaitTag, OnParseAddSpriteTag, OnParseRemoveAllSpritesTag, OnParseSetTextureTag, OnParsePlayAnimationTag, OnParseChainAnimationTag, OnParsePauseAnimationTag, OnParseSetSpritePropertyTag, OnParseEaseSpritePropertyTag, // Add ParseSetSpritePropertyTag later    
  OnParseCustomTag, OnParseBoldTag, OnParseContent];

  var AddParseCallbacks = function AddParseCallbacks(textPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
      ParseCallbacks[i](textPlayer, parser, config);
    }
  };

  /*
  Skip line
  - An empty line, only has space
  - A comment line, start with commentLineStart ('//')
  */
  var PreProcess = function PreProcess(parser, source) {
    var comentLineStart = parser.commentLineStart;
    var lines = source.split('\n');

    for (var i = 0, cnt = lines.length; i < cnt; i++) {
      var line = lines[i];

      if (line === '') ; else if (line.trim().length === 0) {
        // An empty line, only has space
        lines[i] = '';
      } else if (comentLineStart && line.startsWith(comentLineStart)) {
        // A comment line, start with commentLineStart ('//')
        lines[i] = '';
      }
    } // Use [r] to put \n


    return lines.join('');
  };

  var GetValue$d = Phaser.Utils.Objects.GetValue;

  var Parser = /*#__PURE__*/function (_BracketParser) {
    _inherits(Parser, _BracketParser);

    var _super = _createSuper(Parser);

    function Parser(textPlayer, config) {
      var _this;

      _classCallCheck(this, Parser);

      if (config === undefined) {
        config = {};
      }

      if (!config.hasOwnProperty('delimiters')) {
        config.delimiters = '[]';
      }

      _this = _super.call(this, config);
      AddParseCallbacks(textPlayer, _assertThisInitialized(_this), config);

      _this.setCommentLineStartSymbol(GetValue$d(config, 'comment', '//'));

      return _this;
    }

    _createClass(Parser, [{
      key: "setCommentLineStartSymbol",
      value: function setCommentLineStartSymbol(symbol) {
        this.commentLineStart = symbol;
        return this;
      }
    }, {
      key: "start",
      value: function start(source) {
        _get(_getPrototypeOf(Parser.prototype), "start", this).call(this, PreProcess(this, source));

        return this;
      }
    }]);

    return Parser;
  }(BracketParser);

  var WaitEvent = function WaitEvent(eventEmitter, eventName) {
    return new Promise(function (resolve, reject) {
      eventEmitter.once(eventName, function () {
        resolve();
      });
    });
  };

  var WaitComplete = function WaitComplete(eventEmitter) {
    return WaitEvent(eventEmitter, 'complete');
  };

  var Start = function Start(children) {
    this.children = children;
    this.index = 0;
    this.isPageTyping = true;

    if (this.onTypeStart) {
      this.onTypeStart(children);
    }

    this.typing();
    return WaitComplete(this); // Promise
  };

  var TypingDelayTimerType = 'delay';
  var TypingAnimationTimerType = 'anim';

  var Typing = function Typing(offsetTime) {
    if (offsetTime === undefined) {
      offsetTime = 0;
    }

    var delay = 0;
    this.inTypingProcessLoop = true;

    while (this.inTypingProcessLoop) {
      var child = this.getNextChild();

      if (!child) {
        if (this.timeline.isRunning) {
          // Wait until last animationConfig is end
          this.timeline.once('complete', function () {
            this.isPageTyping = false;
            this.emit('complete');
          }, this);
        } else {
          this.isPageTyping = false;
          this.emit('complete');
        }

        break; // Leave this typing loop
      }

      if (IsTypeable(child)) {
        // Typing this char
        var animationConfig = this.animationConfig;

        if (animationConfig.duration > 0) {
          var animationTimer = this.timeline.addTimer({
            name: TypingAnimationTimerType,
            target: child,
            duration: animationConfig.duration,
            yoyo: animationConfig.yoyo,
            onStart: animationConfig.onStart,
            onProgress: animationConfig.onProgress,
            onComplete: animationConfig.onComplete
          });

          if (this.skipTypingAnimation) {
            animationTimer.seek(1);
          }
        } else {
          // No animationConfig, only invoke onStart callback
          if (animationConfig.onStart) {
            animationConfig.onStart(child, 0);
          }
        }

        this.textPlayer.emit('typing', child);
        delay += this.speed + offsetTime;
        offsetTime = 0;
        var isLastChild = this.index === this.children.length; // this.index: Point to next child

        if (delay > 0 && !isLastChild) {
          // Process next character later
          this.typingTimer = this.timeline.addTimer({
            name: TypingDelayTimerType,
            target: this,
            duration: delay,
            onComplete: function onComplete(target, t, timer) {
              target.typingTimer = undefined;
              Typing.call(target, timer.remainder);
            }
          });
          break; // Leave this typing loop                
        } // Process next child

      } else if (IsCommand(child)) {
        child.exec(); // Process next child
      }
    }

    this.inTypingProcessLoop = false;
  };

  var Pause$1 = function Pause() {
    // Pause typing timer and animation progresses
    this.timeline.pause();
    return this;
  };

  var Resume$1 = function Resume() {
    // Resume typing timer and animation progresses
    this.timeline.resume();
    return this;
  };

  var PauseTyping = function PauseTyping() {
    // Already in typingPaused state
    if (this.isTypingPaused) {
      return this;
    }

    if (this.typingTimer) {
      // Pause when typing timer is counting
      this.typingTimer.pause();
      this.isTypingPaused = true;
    } else if (this.inTypingProcessLoop) {
      // Pause in loop of typing(), by tag
      this.inTypingProcessLoop = false;
      this.isTypingPaused = true;
    }

    return this;
  };

  var ResumeTyping = function ResumeTyping(offsetTime) {
    // Already not in typingPaused state
    if (!this.isTypingPaused) {
      return this;
    }

    if (offsetTime === undefined) {
      offsetTime = 0;
    }

    if (this.typingTimer) {
      // Pause when typing timer is paused
      this.isTypingPaused = false;
      this.typingTimer.resume();
      this.typingTimer.remainder += offsetTime;
    } else if (this.isTypingPaused) {
      // Resume paused by tag
      this.isTypingPaused = false;
      this.typing(offsetTime);
    }

    return this;
  };

  // Internal events
  var RemoveWaitEvents = '_remove.wait';
  var StopPlayEvent = '_remove.play';
  var ClearEvents$1 = [RemoveWaitEvents, StopPlayEvent];

  var GetWrapCallback = function GetWrapCallback(textPlayer, callback, args, scope, removeFrom) {
    return function () {
      textPlayer.emit(RemoveWaitEvents, removeFrom); // Remove all wait events

      callback.apply(scope, args);
    };
  };

  var WaitCallback = function WaitCallback(textPlayer, postfixName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'custom');
    var eventName = postfixName ? "wait.".concat(postfixName) : 'wait';
    textPlayer.emit(eventName, wrapCallback);
  };

  var DelayCall = function DelayCall(textPlayer, delay, callback, args, scope) {
    return textPlayer.typeWriter.timeline.delayCall(delay, callback, args, scope);
  };

  var WaitTime = function WaitTime(textPlayer, time, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'time');
    var timer; // Remove all wait events

    textPlayer.once(RemoveWaitEvents, function () {
      if (timer) {
        timer.remove();
        timer = undefined;
      }
    });
    timer = DelayCall(textPlayer, time, wrapCallback);
    textPlayer.emit('wait.time', time);
  };

  var WaitClick = function WaitClick(textPlayer, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'click');
    var clickEE = textPlayer.clickEE; // Remove all wait events

    textPlayer.once(RemoveWaitEvents, function () {
      clickEE.off('pointerdown', wrapCallback, textPlayer);
    });
    clickEE.once('pointerdown', wrapCallback, textPlayer);
    textPlayer.emit('wait.click');
  };

  var WaitMusic = function WaitMusic(textPlayer, music, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'music');

    if (music) {
      // Remove all wait events
      textPlayer.once(RemoveWaitEvents, function () {
        music.off('complete', wrapCallback, textPlayer);
      });
      music.once('complete', wrapCallback, textPlayer);
    }

    textPlayer.emit('wait.music', music);

    if (!music) {
      wrapCallback();
    }
  };

  var IsWaitCameraEffect = function IsWaitCameraEffect(name) {
    switch (name) {
      case 'camera.fadein':
      case 'camera.fadeout':
      case 'camera.flash':
      case 'camera.shake':
      case 'camera.zoom':
      case 'camera.rotate':
      case 'camera.scroll':
        return true;

      default:
        return false;
    }
  };

  var WaitCameraEffect = function WaitCameraEffect(textPlayer, effectName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, "camera.".concat(effectName));
    var camera = textPlayer.camera;
    var effect, completeEventName;

    switch (effectName) {
      case 'camera.fadein':
        effect = camera.fadeEffect;
        completeEventName = 'camerafadeincomplete';
        break;

      case 'camera.fadeout':
        effect = camera.fadeEffect;
        completeEventName = 'camerafadeoutcomplete';
        break;

      case 'camera.flash':
        effect = camera.flashEffect;
        completeEventName = 'cameraflashcomplete';
        break;

      case 'camera.shake':
        effect = camera.shakeEffect;
        completeEventName = 'camerashakecomplete';
        break;

      case 'camera.zoom':
        effect = camera.zoomEffect;
        completeEventName = 'camerazoomcomplete';
        break;

      case 'camera.rotate':
        effect = camera.rotateToEffect;
        completeEventName = 'camerarotatecomplete';
        break;

      case 'camera.scroll':
        effect = camera.panEffect;
        completeEventName = 'camerapancomplete';
        break;
    }

    if (!effect.isRunning) {
      textPlayer.emit('wait.camera', effectName);
      wrapCallback();
    } else {
      // Remove all wait events
      textPlayer.once(RemoveWaitEvents, function (removeFrom) {
        camera.off(completeEventName, wrapCallback, textPlayer);
      });
      camera.once(completeEventName, wrapCallback, textPlayer);
      textPlayer.emit('wait.camera', effectName);
    }
  };

  var WaitKey = function WaitKey(textPlayer, keyName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, 'keydown');
    var eventName = "keydown-".concat(keyName.toUpperCase());
    var keyboard = textPlayer.scene.input.keyboard; // Remove all wait events

    textPlayer.once(RemoveWaitEvents, function () {
      keyboard.off(eventName, wrapCallback, textPlayer);
    });
    keyboard.once(eventName, wrapCallback, textPlayer);
    textPlayer.emit('wait.keydown', keyName);
  };

  var IsWaitSprite = function IsWaitSprite(name) {
    // sprite, sprite.name, sprite.name.prop
    var names = name.split('.');
    return names[0] === 'sprite' && names.length <= 3;
  };

  var WaitSprite = function WaitSprite(textPlayer, tag, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope);
    var tags = tag.split('.');
    var spriteManager = textPlayer.spriteManager;

    switch (tags.length) {
      case 1:
        // sprite: wait all sprites has beeen destroyed
        if (spriteManager.isEmpty) {
          textPlayer.emit('wait.sprite');
          wrapCallback();
        } else {
          // Remove all wait events
          textPlayer.once(RemoveWaitEvents, function (removeFrom) {
            spriteManager.off('empty', wrapCallback, textPlayer);
          });
          spriteManager.once('empty', wrapCallback, textPlayer);
          textPlayer.emit('wait.sprite');
        }

        break;

      case 2:
        // sprite.name: wait sprite.name has been destroyed
        var name = tags[1];

        if (spriteManager.has(name)) {
          var spriteData = textPlayer.spriteManager.get(name);
          var sprite = spriteData.sprite; // Remove all wait events

          textPlayer.once(RemoveWaitEvents, function () {
            sprite.off('destroy', wrapCallback, textPlayer);
          });
          sprite.once('destroy', wrapCallback, textPlayer);
          textPlayer.emit('wait.sprite', name);
        } else {
          textPlayer.emit('wait.sprite', name);
          wrapCallback();
        }

        break;

      case 3:
        // sprite.name.prop: wait ease sprite.name.prop has been completed
        var name = tags[1];
        var prop = tags[2];
        var task = textPlayer.spriteManager.getTweenTask(name, prop);

        if (task) {
          // Remove all wait events
          textPlayer.once(RemoveWaitEvents, function () {
            task.off('complete', wrapCallback, textPlayer);
          });
          task.once('complete', wrapCallback, textPlayer);
          textPlayer.emit('wait.sprite', name, prop);
        } else {
          textPlayer.emit('wait.sprite', name, prop);
          wrapCallback();
        }

        break;
    }
  };

  var KeyCodes = Phaser.Input.Keyboard.KeyCodes;

  var WaitMultiple = function WaitMultiple(textPlayer, names, callback, args, scope) {
    if (typeof names === 'string' && names.length > 1 && names.indexOf('|') !== -1) {
      names = names.split('|');
    } else {
      names = [names];
    }

    for (var i = 0, cnt = names.length; i < cnt; i++) {
      var name = names[i];

      if (name == null || name === 'wait') {
        // Wait event
        WaitCallback(textPlayer, undefined, callback, args, scope);
      } else if (typeof name === 'number' || !isNaN(name)) {
        // A number, or a number string
        WaitTime(textPlayer, parseFloat(name), callback, args, scope);
      } else if (name === 'click') {
        // 'click'
        WaitClick(textPlayer, callback, args, scope);
      } else if (name === 'se') {
        var music = textPlayer.soundManager.getLastSoundEffect();
        WaitMusic(textPlayer, music, callback, args, scope);
      } else if (name === 'bgm') {
        var music = textPlayer.soundManager.getBackgroundMusic();
        WaitMusic(textPlayer, music, callback, args, scope);
      } else if (KeyCodes.hasOwnProperty(name.toUpperCase())) {
        WaitKey(textPlayer, name, callback, args, scope);
      } else if (IsWaitCameraEffect(name)) {
        WaitCameraEffect(textPlayer, name, callback, args, scope);
      } else if (IsWaitSprite(name)) {
        WaitSprite(textPlayer, name, callback, args, scope);
      } else {
        WaitCallback(textPlayer, name, callback, args, scope);
      }
    }
  };

  var Wait = function Wait(name) {
    // Already in typingPaused state, or ignore any wait
    if (this.ignoreWait) {
      return this;
    }

    this.pauseTyping();
    WaitMultiple(this.textPlayer, name, this.resumeTyping, [], this);
    return this;
  };

  var SetTimeScale$1 = function SetTimeScale(value) {
    this.timeline.setTimeScale(value);
    return this;
  };

  var SetIgnoreWait$1 = function SetIgnoreWait(value) {
    if (value === undefined) {
      value = true;
    }

    this.ignoreWait = value;
    return this;
  };

  var SetSkipTypingAnimation = function SetSkipTypingAnimation(value) {
    if (value === undefined) {
      value = true;
    }

    this.skipTypingAnimation = value;

    if (value) {
      // Skip current playing typing-animation
      var timers = this.timeline.getTimers(TypingAnimationTimerType);

      for (var i = 0, cnt = timers.length; i < cnt; i++) {
        timers[i].seek(1);
      }
    }

    return this;
  };

  var SetSkipSoundEffect = function SetSkipSoundEffect(value) {
    if (value === undefined) {
      value = true;
    }

    this.skipSoundEffect = value;

    if (value) {
      var soundManager = this.textPlayer._soundManager;

      if (soundManager) {
        soundManager.fadeOutAllSoundEffects(100, true);
      }
    }

    return this;
  };

  var SkipCurrentTypingDelay = function SkipCurrentTypingDelay() {
    if (this.typingTimer) {
      this.typingTimer.seek(1);
    }

    return this;
  };

  var Methods$1 = {
    start: Start,
    typing: Typing,
    pause: Pause$1,
    resume: Resume$1,
    pauseTyping: PauseTyping,
    resumeTyping: ResumeTyping,
    wait: Wait,
    setTimeScale: SetTimeScale$1,
    setIgnoreWait: SetIgnoreWait$1,
    setSkipTypingAnimation: SetSkipTypingAnimation,
    setSkipSoundEffect: SetSkipSoundEffect,
    skipCurrentTypingDelay: SkipCurrentTypingDelay
  };

  var SceneClass = Phaser.Scene;

  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetSceneObject = function GetSceneObject(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsSceneObject(object)) {
      // object = scene
      return object;
    } else if (object.scene && IsSceneObject(object.scene)) {
      // object = game object
      return object.scene;
    } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) {
      // parent = bob object
      return object.parent.scene;
    }
  };

  var GetValue$c = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue$c(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

      if (this.parent && this.parent === this.scene) {
        // parent is a scene
        this.scene.events.once('shutdown', this.onSceneDestroy, this);
      } else if (this.parent && this.parent.once) {
        // bob object does not have event emitter
        this.parent.once('destroy', this.onParentDestroy, this);
      }
    }

    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // parent might not be shutdown yet


        if (this.parent && this.parent === this.scene) {
          // parent is a scene
          this.scene.events.off('shutdown', this.onSceneDestroy, this);
        } else if (this.parent && this.parent.once) {
          // bob object does not have event emitter
          this.parent.off('destroy', this.onParentDestroy, this);
        }

        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onSceneDestroy",
      value: function onSceneDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }]);

    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var GetValue$b = Phaser.Utils.Objects.GetValue;

  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);

    var _super = _createSuper(TickTask);

    function TickTask(parent, config) {
      var _this;

      _classCallCheck(this, TickTask);

      _this = _super.call(this, parent, config);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;

      _this.setTickingMode(GetValue$b(config, 'tickingMode', 1)); // boot() later


      return _this;
    } // override


    _createClass(TickTask, [{
      key: "boot",
      value: function boot() {
        if (this.tickingMode === 2 && !this.tickingState) {
          this.startTicking();
        }
      } // override

    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.stop();

        if (this.tickingState) {
          this.stopTicking();
        }

        _get(_getPrototypeOf(TickTask.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTickingMode",
      value: function setTickingMode(mode) {
        if (typeof mode === 'string') {
          mode = TICKINGMODE[mode];
        }

        this.tickingMode = mode;
      } // override

    }, {
      key: "startTicking",
      value: function startTicking() {
        this.tickingState = true;
      } // override

    }, {
      key: "stopTicking",
      value: function stopTicking() {
        this.tickingState = false;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this._isRunning;
      },
      set: function set(value) {
        if (this._isRunning === value) {
          return;
        }

        this._isRunning = value;

        if (this.tickingMode === 1 && value != this.tickingState) {
          if (value) {
            this.startTicking();
          } else {
            this.stopTicking();
          }
        }
      }
    }, {
      key: "start",
      value: function start() {
        this.isPaused = false;
        this.isRunning = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        // Only can ba paused in running state
        if (this.isRunning) {
          this.isPaused = true;
          this.isRunning = false;
        }

        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        // Only can ba resumed in paused state (paused from running state)
        if (this.isPaused) {
          this.isRunning = true;
        }

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.isPaused = false;
        this.isRunning = false;
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.isPaused = false;
        this.isRunning = false;
        this.emit('complete', this.parent, this);
      }
    }]);

    return TickTask;
  }(ComponentBase);

  var TICKINGMODE = {
    'no': 0,
    'lazy': 1,
    'always': 2
  };

  var GetValue$a = Phaser.Utils.Objects.GetValue;

  var BaseClock = /*#__PURE__*/function (_TickTask) {
    _inherits(BaseClock, _TickTask);

    var _super = _createSuper(BaseClock);

    function BaseClock(parent, config) {
      var _this;

      _classCallCheck(this, BaseClock);

      _this = _super.call(this, parent, config);

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(BaseClock, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isRunning = GetValue$a(o, 'isRunning', false);
        this.timeScale = GetValue$a(o, 'timeScale', 1);
        this.now = GetValue$a(o, 'now', 0);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          isRunning: this.isRunning,
          timeScale: this.timeScale,
          now: this.now,
          tickingMode: this.tickingMode
        };
      } // Override
      // startTicking() { }
      // Override
      // stopTicking() {}

    }, {
      key: "start",
      value: function start(startAt) {
        if (startAt === undefined) {
          startAt = 0;
        }

        this.delta = 0;
        this.now = startAt;

        _get(_getPrototypeOf(BaseClock.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.now = time;
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(value) {
        this.timeScale = value;
        return this;
      }
    }, {
      key: "tick",
      value: function tick(delta) {
        delta *= this.timeScale;
        this.now += delta;
        this.delta = delta;
        this.emit('update', this.now, this.delta);
        return this;
      }
    }]);

    return BaseClock;
  }(TickTask);

  var Clock = /*#__PURE__*/function (_BaseClock) {
    _inherits(Clock, _BaseClock);

    var _super = _createSuper(Clock);

    function Clock() {
      _classCallCheck(this, Clock);

      return _super.apply(this, arguments);
    }

    _createClass(Clock, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(Clock.prototype), "startTicking", this).call(this);

        this.scene.events.on('update', this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(Clock.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.events.off('update', this.update, this);
        }
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || this.timeScale === 0) {
          return this;
        }

        this.tick(delta);
        return this;
      }
    }]);

    return Clock;
  }(BaseClock);

  var Yoyo = function Yoyo(t, threshold) {
    if (threshold === undefined) {
      threshold = 0.5;
    }

    if (t <= threshold) {
      t = t / threshold;
    } else {
      t = 1 - (t - threshold) / (1 - threshold);
    }

    return t;
  };

  var Clamp$1 = Phaser.Math.Clamp;

  var Timer$1 = /*#__PURE__*/function () {
    function Timer(timeline, config) {
      _classCallCheck(this, Timer);

      this.setTimeline(timeline).reset(config);
    }

    _createClass(Timer, [{
      key: "setTimeline",
      value: function setTimeline(timeline) {
        this.timeline = timeline;
        return this;
      }
    }, {
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "setCallbacks",
      value: function setCallbacks(target, onStart, onProgress, onComplete) {
        this.target = target;
        this.onStart = onStart;
        this.onProgress = onProgress;
        this.onComplete = onComplete;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration, yoyo) {
        if (yoyo === undefined) {
          yoyo = false;
        }

        this.duration = duration;
        this.remainder = duration;
        this.t = 0;
        this.yoyo = yoyo;
        return this;
      }
    }, {
      key: "setPaused",
      value: function setPaused(state) {
        this.isPaused = state;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.isPaused = true;
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this.isPaused = false;
        return this;
      }
    }, {
      key: "setRemoved",
      value: function setRemoved(state) {
        this.removed = state;
        return this;
      }
    }, {
      key: "remove",
      value: function remove() {
        this.removed = true;
        return this;
      }
    }, {
      key: "seek",
      value: function seek(t) {
        this.remainder = this.duration * (1 - t);
        return this;
      }
    }, {
      key: "reset",
      value: function reset(o) {
        this.setName(o.name).setDuration(o.duration, o.yoyo).setCallbacks(o.target, o.onStart, o.onProgress, o.onComplete).setPaused(false).setRemoved(false);
        return this;
      }
    }, {
      key: "onFree",
      value: function onFree() {
        this.setTimeline().setCallbacks();
      }
    }, {
      key: "getProgress",
      value: function getProgress() {
        var value = 1 - this.remainder / this.duration;
        value = Clamp$1(value, 0, 1);

        if (this.yoyo) {
          value = Yoyo(value);
        }

        return value;
      }
    }, {
      key: "setProgress",
      value: function setProgress(value) {
        value = Clamp$1(value, 0, 1);
        this.remainder = this.duration * (1 - value);
      }
    }, {
      key: "runCallback",
      value: function runCallback(callback) {
        if (!callback) {
          return;
        }

        callback(this.target, this.t, this);
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.removed) {
          return true;
        } else if (this.isPaused) {
          return false;
        }

        this.remainder -= delta;
        this.t = this.getProgress();
        this.runCallback(this.onProgress);
        var isCompleted = this.remainder <= 0;

        if (isCompleted) {
          this.runCallback(this.onComplete);
        }

        return isCompleted;
      }
    }]);

    return Timer;
  }();

  var TimerPool$1 = /*#__PURE__*/function (_Pool) {
    _inherits(TimerPool, _Pool);

    var _super = _createSuper(TimerPool);

    function TimerPool() {
      _classCallCheck(this, TimerPool);

      return _super.apply(this, arguments);
    }

    _createClass(TimerPool, [{
      key: "allocate",
      value: function allocate() {
        return this.pop();
      }
    }, {
      key: "free",
      value: function free(timer) {
        timer.onFree();
        this.push(timer);
      }
    }, {
      key: "freeMultiple",
      value: function freeMultiple(arr) {
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
          this.free(arr[i]);
        }

        return this;
      }
    }]);

    return TimerPool;
  }(Stack);

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var TimerPool = new TimerPool$1();

  var Timeline = /*#__PURE__*/function (_Clock) {
    _inherits(Timeline, _Clock);

    var _super = _createSuper(Timeline);

    function Timeline(parent, config) {
      var _this;

      _classCallCheck(this, Timeline);

      _this = _super.call(this, parent, config);
      _this.addedTimers = [];
      _this.timers = [];
      _this.timerPool = GetValue$9(config, 'pool', TimerPool);
      return _this;
    }

    _createClass(Timeline, [{
      key: "shutdown",
      value: function shutdown() {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.timerPool.freeMultiple(this.addedTimers).freeMultiple(this.timers);
        this.timerPool = undefined;
        this.addedTimers = undefined;
        this.timers = undefined;

        _get(_getPrototypeOf(Timeline.prototype), "shutdown", this).call(this);
      }
    }, {
      key: "addTimer",
      value: function addTimer(config) {
        var timer = this.timerPool.allocate();

        if (!timer) {
          timer = new Timer$1(this, config);
        } else {
          timer.setTimeline(this).reset(config);
        }

        this.addedTimers.push(timer);
        timer.runCallback(timer.onStart);

        if (!this.isRunning) {
          this.start();
        }

        return timer;
      }
    }, {
      key: "delayCall",
      value: function delayCall(delay, callback, args, scope) {
        var timer = this.addTimer({
          duration: delay,
          onComplete: function onComplete(target, t, timer) {
            if (args === undefined) {
              args = [];
            }

            args.push(timer);
            callback.apply(scope, args);
          }
        });
        return timer;
      }
    }, {
      key: "getTimers",
      value: function getTimers(name) {
        var timers = [];
        var timerQueues = [this.addedTimers, this.timers];

        for (var ti = 0, tcnt = timerQueues.length; ti < tcnt; ti++) {
          var timerQueue = timerQueues[ti];

          for (var i = 0, cnt = timerQueue.length; i < cnt; i++) {
            var timer = timerQueue[i];

            if (timer.name === name) {
              timers.push(timer);
            }
          }
        }

        return timers;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        var _this$timers;

        _get(_getPrototypeOf(Timeline.prototype), "update", this).call(this, time, delta);

        (_this$timers = this.timers).push.apply(_this$timers, _toConsumableArray(this.addedTimers));

        this.addedTimers.length = 0;
        var pendingTimers = [];

        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
          var timer = this.timers[i];
          var isStopped = timer.update(this.now, this.delta);

          if (isStopped) {
            this.timerPool.free(timer); // Free timer
          } else {
            pendingTimers.push(timer); // Add to timer queue
          }
        }

        this.timers = pendingTimers;

        if (this.timers.length === 0 && this.addedTimers.length === 0) {
          this.complete(); // Emit 'complete' event
        }
      }
    }]);

    return Timeline;
  }(Clock);

  var GetValue$8 = Phaser.Utils.Objects.GetValue;

  var TypeWriter = /*#__PURE__*/function () {
    function TypeWriter(textPlayer, config) {
      _classCallCheck(this, TypeWriter);

      this.setEventEmitter();
      this.textPlayer = textPlayer;
      this.isPageTyping = false;
      this.timeline = new Timeline(textPlayer);
      this.typingTimer = undefined; // Typing delay

      this.pauseTypingTimer = undefined; // Wait time

      this.inTypingProcessLoop = false; // Used in this.typing()

      this.isTypingPaused = false; // Used in this.wait(), this.pauseTyping(), this.resumeTyping()

      this.setIgnoreWait(false);
      this.setSkipTypingAnimation(false);
      this.setTypingStartCallback(GetValue$8(config, 'onTypingStart', SetChildrenInvisible));
      this.setSpeed(GetValue$8(config, 'speed', 250));
      this.setAnimationConfig(GetValue$8(config, 'animation', undefined));
    }

    _createClass(TypeWriter, [{
      key: "destroy",
      value: function destroy() {
        this.destroyEventEmitter();
        this.textPlayer = undefined;
        this.timeline.destroy();
        this.timeline = undefined;
        this.typingTimer = undefined;
        this.pauseTypingTimer = undefined;
        this.onTypeStart = undefined;
        this.animationConfig = undefined;
      }
    }, {
      key: "setSpeed",
      value: function setSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "setTypingStartCallback",
      value: function setTypingStartCallback(callback) {
        this.onTypeStart = callback;
        return this;
      }
    }, {
      key: "setAnimationConfig",
      value: function setAnimationConfig(config) {
        if (config === undefined) {
          config = {};
        } else if (config === false) {
          config = {
            duration: 0
          };
        }

        if (!config.hasOwnProperty('duration')) {
          // Apply default duration
          config.duration = 1000;
        }

        if (!config.hasOwnProperty('onStart')) {
          // Apply default onStart callback
          config.onStart = SetChildVisible;
        }

        this.animationConfig = config;
        return this;
      }
    }, {
      key: "getNextChild",
      value: function getNextChild() {
        var child = this.children[this.index];
        this.index = Math.min(this.index + 1, this.children.length); // Point to next child

        return child;
      }
    }]);

    return TypeWriter;
  }();

  var SetChildVisible = function SetChildVisible(child) {
    child.setVisible();
  };

  var SetChildrenInvisible = function SetChildrenInvisible(children) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      children[i].setVisible(false);
    }
  };

  Object.assign(TypeWriter.prototype, EventEmitterMethods, Methods$1);

  var GetValue$7 = Phaser.Utils.Objects.GetValue;

  var AddImage$1 = function AddImage(key, config) {
    if (config === undefined) {
      config = {
        key: key
      };
    }

    if (!config.hasOwnProperty('key')) {
      config.key = key;
    }

    var textureKey = config.key,
        frameKey = config.frame;
    var width = config.width,
        height = config.height;

    if (width === undefined || height === undefined) {
      var frame = this.textureManager.getFrame(textureKey, frameKey);
      var frameWidth = frame ? frame.cutWidth : 0;
      var frameHeight = frame ? frame.cutHeight : 0;

      if (width === undefined && height === undefined) {
        width = frameWidth;
        height = frameHeight;
      } else if (width === undefined) {
        width = frameWidth * (height / frameHeight);
      } else if (height === undefined) {
        height = frameHeight * (width / frameWidth);
      }
    }

    this.images[key] = {
      key: textureKey,
      frame: frameKey,
      width: width,
      height: height,
      y: GetValue$7(config, 'y', 0),
      left: GetValue$7(config, 'left', 0),
      right: GetValue$7(config, 'right', 0)
    };
  };

  var DrawImage = function DrawImage(key, context, x, y, autoRound) {
    var imgData = this.get(key);
    x += imgData.left;
    y += imgData.y;

    if (autoRound) {
      x = Math.round(x);
      y = Math.round(y);
    }

    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);
    context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight, x, y, imgData.width, imgData.height);
  };

  var ImageManager = /*#__PURE__*/function () {
    function ImageManager(scene) {
      _classCallCheck(this, ImageManager);

      this.textureManager = scene.textures;
      this.images = {};
    }

    _createClass(ImageManager, [{
      key: "destroy",
      value: function destroy() {
        this.textureManager = undefined;
        this.images = undefined;
      }
    }, {
      key: "add",
      value: function add(key, config) {
        if (typeof key === 'string') {
          AddImage$1.call(this, key, config);
        } else if (Array.isArray(key)) {
          var data = key;

          for (var i = 0, cnt = data.length; i < cnt; i++) {
            AddImage$1.call(this, data[i]);
          }
        } else {
          var data = key;

          for (var key in data) {
            AddImage$1.call(this, key, data[key]);
          }
        }

        return this;
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.images.hasOwnProperty(key);
      }
    }, {
      key: "remove",
      value: function remove(key) {
        if (this.has(key)) {
          delete this.images[key];
        }

        return this;
      }
    }, {
      key: "get",
      value: function get(key) {
        if (!this.has(key)) {
          if (this.textureManager.exists(key)) {
            this.add(key);
          }
        }

        return this.images[key];
      }
    }, {
      key: "getOuterWidth",
      value: function getOuterWidth(key) {
        var data = this.get(key);
        return data ? data.width + data.left + data.right : 0;
      }
    }, {
      key: "getFrame",
      value: function getFrame(key) {
        var data = this.get(key);
        return data ? this.textureManager.getFrame(data.key, data.frame) : undefined;
      }
    }, {
      key: "hasTexture",
      value: function hasTexture(key) {
        return !!this.getFrame(key);
      }
    }]);

    return ImageManager;
  }();

  var methods = {
    draw: DrawImage
  };
  Object.assign(ImageManager.prototype, methods);

  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);

    var _super = _createSuper(SceneUpdateTickTask);

    function SceneUpdateTickTask() {
      _classCallCheck(this, SceneUpdateTickTask);

      return _super.apply(this, arguments);
    }

    _createClass(SceneUpdateTickTask, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "startTicking", this).call(this);

        this.scene.events.on('update', this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.events.off('update', this.update, this);
        }
      } // update(time, delta) {
      //     
      // }

    }]);

    return SceneUpdateTickTask;
  }(TickTask);

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;

  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);

      this.resetFromJSON(config);
    }

    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$6(o, 'state', IDLE);
        this.timeScale = GetValue$6(o, 'timeScale', 1);
        this.delay = GetValue$6(o, 'delay', 0);
        this.repeat = GetValue$6(o, 'repeat', 0);
        this.repeatCounter = GetValue$6(o, 'repeatCounter', 0);
        this.duration = GetValue$6(o, 'duration', 0);
        this.nowTime = GetValue$6(o, 'nowTime', 0);
        this.justRestart = GetValue$6(o, 'justRestart', false);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          state: this.state,
          timeScale: this.timeScale,
          delay: this.delay,
          repeat: this.repeat,
          repeatCounter: this.repeatCounter,
          duration: this.duration,
          nowTime: this.nowTime,
          justRestart: this.justRestart
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(delay) {
        if (delay === undefined) {
          delay = 0;
        }

        this.delay = delay;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      }
    }, {
      key: "setRepeatInfinity",
      value: function setRepeatInfinity() {
        this.repeat = -1;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        this.nowTime = this.delay > 0 ? -this.delay : 0;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.repeatCounter = 0;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.state = IDLE;
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.state === IDLE || this.state === DONE || delta === 0 || this.timeScale === 0) {
          return;
        }

        this.nowTime += delta * this.timeScale;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.justRestart = false;

        if (this.nowTime >= this.duration) {
          if (this.repeat === -1 || this.repeatCounter < this.repeat) {
            this.repeatCounter++;
            this.justRestart = true;
            this.nowTime -= this.duration;
          } else {
            this.nowTime = this.duration;
            this.state = DONE;
          }
        }
      }
    }, {
      key: "t",
      get: function get() {
        var t;

        switch (this.state) {
          case IDLE:
          case DELAY:
            t = 0;
            break;

          case COUNTDOWN:
            t = this.nowTime / this.duration;
            break;

          case DONE:
            t = 1;
            break;
        }

        return Clamp(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp(value, -1, 1);

        if (value < 0) {
          this.state = DELAY;
          this.nowTime = -this.delay * value;
        } else {
          this.state = COUNTDOWN;
          this.nowTime = this.duration * value;

          if (value === 1 && this.repeat !== 0) {
            this.repeatCounter++;
          }
        }
      }
    }, {
      key: "isIdle",
      get: function get() {
        return this.state === IDLE;
      }
    }, {
      key: "isDelay",
      get: function get() {
        return this.state === DELAY;
      }
    }, {
      key: "isCountDown",
      get: function get() {
        return this.state === COUNTDOWN;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.state === DELAY || this.state === COUNTDOWN;
      }
    }, {
      key: "isDone",
      get: function get() {
        return this.state === DONE;
      }
    }, {
      key: "isOddIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 1;
      }
    }, {
      key: "isEvenIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 0;
      }
    }]);

    return Timer;
  }();

  var IDLE = 0;
  var DELAY = 1;
  var COUNTDOWN = 2;
  var DONE = -1;

  var TimerTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(TimerTickTask, _TickTask);

    var _super = _createSuper(TimerTickTask);

    function TimerTickTask(parent, config) {
      var _this;

      _classCallCheck(this, TimerTickTask);

      _this = _super.call(this, parent, config);
      _this.timer = new Timer(); // boot() later 

      return _this;
    } // override


    _createClass(TimerTickTask, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        _get(_getPrototypeOf(TimerTickTask.prototype), "shutdown", this).call(this, fromScene);

        this.timer.destroy();
        this.timer = undefined;
      }
    }, {
      key: "start",
      value: function start() {
        this.timer.start();

        _get(_getPrototypeOf(TimerTickTask.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.timer.stop();

        _get(_getPrototypeOf(TimerTickTask.prototype), "stop", this).call(this);

        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.timer.stop();

        _get(_getPrototypeOf(TimerTickTask.prototype), "complete", this).call(this);

        return this;
      }
    }]);

    return TimerTickTask;
  }(SceneUpdateTickTask);

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

  var EaseValueTaskBase = /*#__PURE__*/function (_TickTask) {
    _inherits(EaseValueTaskBase, _TickTask);

    var _super = _createSuper(EaseValueTaskBase);

    function EaseValueTaskBase() {
      _classCallCheck(this, EaseValueTaskBase);

      return _super.apply(this, arguments);
    }

    _createClass(EaseValueTaskBase, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$5(o, 'timer'));
        this.setEnable(GetValue$5(o, 'enable', true));
        this.setDelay(GetAdvancedValue$2(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$2(o, 'duration', 1000));
        this.setEase(GetValue$5(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$5(o, 'repeat', 0));
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e == undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(time) {
        this.delay = time;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(time) {
        this.duration = time;
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(ease) {
        if (ease === undefined) {
          ease = 'Linear';
        }

        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      } // Override

    }, {
      key: "start",
      value: function start() {
        // Ignore start if timer is running, i.e. in DELAY, o RUN state
        if (this.timer.isRunning) {
          return this;
        }

        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.timer.stop();
        this.start.apply(this, arguments);
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable) {
          return this;
        }

        var gameObject = this.parent;

        if (!gameObject.active) {
          return this;
        }

        var timer = this.timer;
        timer.update(time, delta); // isDelay, isCountDown, isDone

        if (!timer.isDelay) {
          this.updateGameObject(gameObject, timer);
        }

        this.emit('update', gameObject, this);

        if (timer.isDone) {
          this.complete();
        }

        return this;
      } // Override

    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {}
    }]);

    return EaseValueTaskBase;
  }(TimerTickTask);

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear = Phaser.Math.Linear;

  var Fade = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Fade, _EaseValueTaskBase);

    var _super = _createSuper(Fade);

    function Fade(scene, sound, config) {
      var _this;

      _classCallCheck(this, Fade);

      sound.scene = scene;
      sound.active = true;
      _this = _super.call(this, sound, config); // this.parent = sound
      // this.timer

      _this.volume = {};

      _this.resetFromJSON(config);

      return _this;
    }

    _createClass(Fade, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Fade.prototype), "resetFromJSON", this).call(this, o);

        this.setMode(GetValue$4(o, 'mode', 0));
        this.setEnable(GetValue$4(o, 'enable', true));
        this.setVolumeRange(GetAdvancedValue$1(o, 'volume.start', this.parent.volume), GetAdvancedValue$1(o, 'volume.end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE[m];
        }

        this.mode = m;
        return this;
      }
    }, {
      key: "setVolumeRange",
      value: function setVolumeRange(start, end) {
        this.volume.start = start;
        this.volume.end = end;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }

        this.parent.setVolume(this.volume.start);
        this.timer.setDelay(this.delay).setDuration(this.duration);

        _get(_getPrototypeOf(Fade.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(sound, timer) {
        sound.volume = Linear(this.volume.start, this.volume.end, timer.t);
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Fade.prototype), "complete", this).call(this);

        switch (this.mode) {
          case 1:
            this.parent.stop();
            break;

          case 2:
            this.parent.destroy();
            break;
        }

        return this;
      }
    }]);

    return Fade;
  }(EaseValueTaskBase);

  var MODE = {
    stop: 1,
    destroy: 2
  };

  var FadeIn = function FadeIn(scene, sound, duration, endVolume, startVolume) {
    if (endVolume === undefined) {
      endVolume = 1;
    }

    if (startVolume === undefined) {
      startVolume = 0;
    }

    var config = {
      mode: 0,
      volume: {
        start: startVolume,
        end: endVolume
      },
      duration: duration
    }; // create sound instance by key

    if (typeof sound === 'string') {
      sound = scene.sound.add(sound);
    }

    var fade;

    if (sound.hasOwnProperty('_fade')) {
      fade = sound._fade;
      fade.stop().resetFromJSON(config);
    } else {
      fade = new Fade(scene, sound, config);
      sound._fade = fade;
    }

    fade.start();

    if (!sound.isPlaying) {
      sound.setVolume(startVolume).play();
    }

    return sound;
  };

  var FadeOut = function FadeOut(scene, sound, duration, destroy) {
    if (destroy === undefined) {
      destroy = true;
    }

    var config = {
      mode: destroy ? 2 : 1,
      // 1: stop, 2: destroy
      volume: {
        start: sound.volume,
        end: 0
      },
      duration: duration
    };
    var fade;

    if (sound.hasOwnProperty('_fade')) {
      fade = sound._fade;
      fade.stop().resetFromJSON(config);
    } else {
      fade = new Fade(scene, sound, config);
      sound._fade = fade;
    }

    fade.start();

    if (!sound.isPlaying) {
      sound.play();
    }

    return sound;
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var RemoveItem$1 = Phaser.Utils.Array.Remove;

  var SoundManager = /*#__PURE__*/function () {
    function SoundManager(scene, config) {
      _classCallCheck(this, SoundManager);

      this.scene = scene; // Sound effect will be destroyed when completed

      this.soundEffects = []; // Background music will be (fade out)destroyed when play next one.

      this.backgroundMusic = undefined;
      this.setBackgroundMusicLoopValue(GetValue$3(config, 'bgm.loop', true));
      this.setBackgroundMusicFadeTime(GetValue$3(config, 'bgm.fade', 500));
      var initialBackgroundMusic = GetValue$3(config, 'bgm.initial', undefined);

      if (initialBackgroundMusic) {
        this.setCurrentBackgroundMusic(initialBackgroundMusic);
      }
    }

    _createClass(SoundManager, [{
      key: "destroy",
      value: function destroy(fromScene) {
        if (this.soundEffects.length && !fromScene) {
          for (var i = this.soundEffects.length - 1; i >= 0; i--) {
            this.soundEffects[i].destroy();
          }
        }

        this.soundEffects.length = 0;

        if (this.backgroundMusic && !fromScene) {
          this.backgroundMusic.destroy();
        }

        this.backgroundMusic = undefined;
        this.scene = undefined;
      }
    }, {
      key: "setBackgroundMusicLoopValue",
      value: function setBackgroundMusicLoopValue(value) {
        this.backgroundMusicLoopValue = value;
        return this;
      }
    }, {
      key: "setBackgroundMusicFadeTime",
      value: function setBackgroundMusicFadeTime(time) {
        this.backgroundMusicFadeTime = time;
        return this;
      }
    }, {
      key: "getSoundEffects",
      value: function getSoundEffects() {
        return this.soundEffects;
      }
    }, {
      key: "getLastSoundEffect",
      value: function getLastSoundEffect() {
        return this.soundEffects[this.soundEffects.length - 1];
      }
    }, {
      key: "getBackgroundMusic",
      value: function getBackgroundMusic() {
        return this.backgroundMusic;
      }
    }, {
      key: "playSoundEffect",
      value: function playSoundEffect(key) {
        var soundEffect = this.scene.sound.add(key);
        this.soundEffects.push(soundEffect);
        soundEffect.once('complete', function () {
          soundEffect.destroy(); // SoundManager has been destroyed

          if (!this.scene) {
            return;
          }

          RemoveItem$1(this.soundEffects, soundEffect);
        }, this).once('destroy', function () {
          // SoundManager has been destroyed
          if (!this.scene) {
            return;
          }

          RemoveItem$1(this.soundEffects, soundEffect);
        }, this).play();
        return this;
      }
    }, {
      key: "setSoundEffectVolume",
      value: function setSoundEffectVolume(volume) {
        var soundEffect = this.getLastSoundEffect();

        if (soundEffect) {
          soundEffect.setVolume(volume);
        }

        return this;
      }
    }, {
      key: "fadeInSoundEffect",
      value: function fadeInSoundEffect(time) {
        var soundEffect = this.getLastSoundEffect();

        if (soundEffect) {
          FadeIn(this.scene, soundEffect, time);
        }

        return this;
      }
    }, {
      key: "fadeOutSoundEffect",
      value: function fadeOutSoundEffect(time, isStopped) {
        var soundEffect = this.getLastSoundEffect();

        if (soundEffect) {
          FadeOut(this.scene, soundEffect, time, isStopped);
        }

        return this;
      }
    }, {
      key: "fadeOutAllSoundEffects",
      value: function fadeOutAllSoundEffects(time, isStopped) {
        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
          FadeOut(this.scene, this.soundEffects[i], time, isStopped);
        }

        return this;
      }
    }, {
      key: "setCurrentBackgroundMusic",
      value: function setCurrentBackgroundMusic(music) {
        this.backgroundMusic = music;

        if (music) {
          music.setLoop(this.backgroundMusicLoopValue);
          music.once('complete', function () {
            this.backgroundMusic.destroy();
            this.backgroundMusic = undefined;
          }, this).once('destroy', function () {
            this.backgroundMusic = undefined;
          }, this);

          if (!music.isPlaying) {
            music.play();
          }
        }
      }
    }, {
      key: "playBackgroundMusic",
      value: function playBackgroundMusic(key) {
        // Don't re-play the same background music
        if (this.backgroundMusic && this.backgroundMusic.key === key) {
          return this;
        }

        this.stopBackgroundMusic(); // Stop previous background music

        this.setCurrentBackgroundMusic(this.scene.sound.add(key));

        if (this.backgroundMusicFadeTime > 0) {
          this.fadeInBackgroundMusic(this.backgroundMusicFadeTime);
        }

        return this;
      }
    }, {
      key: "pauseBackgroundMusic",
      value: function pauseBackgroundMusic() {
        if (this.backgroundMusic) {
          this.backgroundMusic.pause();
        }

        return this;
      }
    }, {
      key: "resumeBackgroundMusic",
      value: function resumeBackgroundMusic() {
        if (this.backgroundMusic) {
          this.backgroundMusic.resume();
        }

        return this;
      }
    }, {
      key: "stopBackgroundMusic",
      value: function stopBackgroundMusic() {
        if (this.backgroundMusic) {
          if (this.backgroundMusicFadeTime > 0) {
            this.fadeOutBackgroundMusic(this.backgroundMusicFadeTime, true);
          } else {
            this.backgroundMusic.stop();
            this.backgroundMusic.destroy();
            this.backgroundMusic = undefined;
          }
        }

        return this;
      }
    }, {
      key: "fadeInBackgroundMusic",
      value: function fadeInBackgroundMusic(time) {
        if (this.backgroundMusic) {
          FadeIn(this.scene, this.backgroundMusic, time);
        }

        return this;
      }
    }, {
      key: "fadeOutBackgroundMusic",
      value: function fadeOutBackgroundMusic(time, isStopped) {
        if (this.backgroundMusic) {
          FadeOut(this.scene, this.backgroundMusic, time, isStopped);
        }

        return this;
      }
    }, {
      key: "crossFadeBackgroundMusic",
      value: function crossFadeBackgroundMusic(key, time) {
        var backgroundMusicFadeTimeSave = this.backgroundMusicFadeTime;
        this.backgroundMusicFadeTime = 0;
        this.fadeOutBackgroundMusic(time, true).playBackgroundMusic(key).fadeInBackgroundMusic(time);
        this.backgroundMusicFadeTime = backgroundMusicFadeTimeSave;
        return this;
      }
    }]);

    return SoundManager;
  }();

  var SpriteData = /*#__PURE__*/function () {
    function SpriteData(spriteManager, sprite, name) {
      _classCallCheck(this, SpriteData);

      this.spriteManager = spriteManager;
      this.sprite = sprite.setName(name);
      this.tweens = {};
      this.name = name;
    }

    _createClass(SpriteData, [{
      key: "scene",
      get: function get() {
        return this.spriteManager.scene;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.freeSprite().freeTweens();
        this.spriteManager = undefined;
      }
    }, {
      key: "freeSprite",
      value: function freeSprite() {
        this.sprite.destroy();
        this.sprite = undefined;
        return this;
      }
    }, {
      key: "freeTweens",
      value: function freeTweens() {
        var tweenTasks = this.tweens;

        for (var propName in tweenTasks) {
          tweenTasks[propName].remove();
          delete tweenTasks[propName];
        }

        return this;
      }
    }, {
      key: "setProperty",
      value: function setProperty(property, value) {
        this.sprite[property] = value;
        return this;
      }
    }, {
      key: "easeProperty",
      value: function easeProperty(property, value, duration, ease, isYoyo, _onComplete) {
        var tweenTasks = this.tweens;

        if (tweenTasks.hasOwnProperty(property)) {
          tweenTasks[property].remove();
        }

        var config = {
          targets: this.sprite,
          duration: duration,
          ease: ease,
          yoyo: isYoyo,
          onComplete: function onComplete() {
            tweenTasks[property].remove();
            delete tweenTasks[property];

            if (_onComplete) {
              _onComplete();
            }
          },
          onCompleteScope: this
        };
        config[property] = value;
        tweenTasks[property] = this.scene.tweens.add(config);
        return this;
      }
    }, {
      key: "setTexture",
      value: function setTexture(textureKey, frameKey) {
        this.sprite.setTexture(textureKey, frameKey);
        return this;
      }
    }, {
      key: "playAnimation",
      value: function playAnimation(key) {
        this.sprite.play(key);
        return this;
      }
    }, {
      key: "stopAnimation",
      value: function stopAnimation() {
        this.sprite.stop();
        return this;
      }
    }, {
      key: "chainAnimation",
      value: function chainAnimation(keys) {
        this.sprite.chain(keys);
        return this;
      }
    }, {
      key: "pauseAnimation",
      value: function pauseAnimation() {
        this.sprite.anims.pause();
        return this;
      }
    }]);

    return SpriteData;
  }();

  var GetR = function GetR(colorInt) {
    return colorInt >> 16 & 0xff;
  };

  var GetG = function GetG(colorInt) {
    return colorInt >> 8 & 0xff;
  };

  var GetB = function GetB(colorInt) {
    return colorInt & 0xff;
  };

  var MaskR = ~(0xff << 16) & 0xffffff;
  var MaskG = ~(0xff << 8) & 0xffffff;
  var MaskB = ~0xff & 0xffffff;

  var SetR = function SetR(colorInt, r) {
    return (r & 0xff) << 16 | colorInt & MaskR;
  };

  var SetG = function SetG(colorInt, g) {
    return (g & 0xff) << 8 | colorInt & MaskG;
  };

  var SetB = function SetB(colorInt, b) {
    return b & 0xff | colorInt & MaskB;
  };

  var SetRGB = function SetRGB(colorInt, r, g, b) {
    return (r & 0xff) << 16 | (g & 0xff) << 8 | b & 0xff;
  };

  var AddTintRGBProperties = function AddTintRGBProperties(gameObject, colorRGB) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('tintR')) {
      return gameObject;
    }

    if (colorRGB === undefined) {
      colorRGB = 0xffffff;
    } // Override tint property


    Object.defineProperty(gameObject, 'tint', {
      get: function get() {
        return gameObject._tintRGB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xffffff;
        gameObject.setTint(value);

        if (gameObject._tintRGB !== value) {
          gameObject._tintRGB = value;
          gameObject._tintR = GetR(value);
          gameObject._tintG = GetG(value);
          gameObject._tintB = GetB(value); // gameObject.emit('_tintchange', value, gameObject._tintR, gameObject._tintG, gameObject._tintB);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintR', {
      get: function get() {
        return gameObject._tintR;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (gameObject._tintR !== value) {
          gameObject._tintR = value;
          gameObject._tintRGB = SetR(gameObject._tintRGB, value);
          gameObject.tint = gameObject._tintRGB;
        }
      }
    });
    Object.defineProperty(gameObject, 'tintG', {
      get: function get() {
        return gameObject._tintG;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (gameObject._tintG !== value) {
          gameObject._tintG = value;
          gameObject._tintRGB = SetG(gameObject._tintRGB, value);
          gameObject.tint = gameObject._tintRGB;
        }
      }
    });
    Object.defineProperty(gameObject, 'tintB', {
      get: function get() {
        return gameObject._tintB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (gameObject._tintB !== value) {
          gameObject._tintB = value;
          gameObject._tintRGB = SetB(gameObject._tintRGB, value);
          gameObject.tint = gameObject._tintRGB;
        }
      }
    });
    Object.defineProperty(gameObject, 'tintGray', {
      get: function get() {
        return Math.floor((gameObject._tintR + gameObject._tintG + gameObject._tintB) / 3);
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (gameObject._tintR !== value || gameObject._tintG !== value || gameObject._tintB !== value) {
          gameObject._tintR = value;
          gameObject._tintG = value;
          gameObject._tintB = value;
          gameObject._tintRGB = SetRGB(gameObject._tintRGB, value, value, value);
          gameObject.tint = gameObject._tintRGB;
        }
      }
    });
    gameObject.tint = colorRGB;
    return gameObject;
  };

  var IsEmpty = function IsEmpty(source) {
    for (var k in source) {
      return false;
    }

    return true;
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var RemoveItem = Phaser.Utils.Array.Remove;

  var SpriteManager = /*#__PURE__*/function () {
    function SpriteManager(scene, config) {
      _classCallCheck(this, SpriteManager);

      this.scene = scene;
      this.setEventEmitter(GetValue$2(config, 'eventEmitter', undefined));
      this.setCreateCallback(GetValue$2(config, 'createCallback', 'sprite'));
      this.setSpriteFadeTime(GetValue$2(config, 'fade', 500));
      this.sprites = {};
      this.removedSprites = [];
    }

    _createClass(SpriteManager, [{
      key: "destroy",
      value: function destroy(fromScene) {
        this.clear(!fromScene);
        this.createCallback = undefined;
        this.scene = undefined;
      }
    }, {
      key: "setCreateCallback",
      value: function setCreateCallback(callback) {
        if (callback === 'sprite') {
          this.createCallback = function (scene, textureKey, frameName) {
            return scene.add.sprite(0, 0, textureKey, frameName);
          };
        } else if (callback === 'image') {
          this.createCallback = function (scene, textureKey, frameName) {
            return scene.add.image(0, 0, textureKey, frameName);
          };
        } else {
          this.createCallback = callback;
        }

        return this;
      }
    }, {
      key: "setSpriteFadeTime",
      value: function setSpriteFadeTime(time) {
        this.fadeTime = time;
        return this;
      }
    }, {
      key: "has",
      value: function has(name) {
        return this.sprites.hasOwnProperty(name);
      }
    }, {
      key: "get",
      value: function get(name) {
        return this.sprites[name];
      }
    }, {
      key: "getTweenTask",
      value: function getTweenTask(name, prop) {
        if (this.has(name)) {
          var tweenTasks = this.get(name).tweens;

          if (tweenTasks.hasOwnProperty(prop)) {
            return tweenTasks[prop];
          }
        }

        return null;
      }
    }, {
      key: "isEmpty",
      get: function get() {
        return IsEmpty(this.sprites) && this.removedSprites.length === 0;
      }
    }, {
      key: "clear",
      value: function clear(destroyChild) {
        if (destroyChild === undefined) {
          destroyChild = true;
        }

        for (var name in this.sprites) {
          if (destroyChild) {
            this.sprites[name].destroy();
          }

          delete this.sprites[name];
        }

        this.removedSprites.length = 0;
        return this;
      }
    }, {
      key: "add",
      value: function add(name, textureKey, frameName) {
        this.remove(name);
        var sprite;

        if (arguments.length === 3) {
          sprite = this.createCallback(this.scene, textureKey, frameName);
        } else {
          var args = Array.prototype.slice.call(arguments, 1);
          sprite = this.createCallback.apply(this, [this.scene].concat(_toConsumableArray(args)));
        }

        if (this.fadeTime > 0) {
          AddTintRGBProperties(sprite);
        }

        sprite.once('destroy', function () {
          RemoveItem(this.removedSprites, sprite);

          if (this.isEmpty) {
            this.emit('empty');
          }
        }, this);
        var spriteData = new SpriteData(this, sprite, name);
        this.sprites[name] = spriteData;

        if (this.fadeTime > 0) {
          spriteData.setProperty('tintGray', 0).easeProperty('tintGray', 255, this.fadeTime);
        }

        return this;
      }
    }, {
      key: "setProperty",
      value: function setProperty(name, property, value) {
        if (!this.has(name)) {
          return this;
        }

        this.get(name).setProperty(property, value);
        return this;
      }
    }, {
      key: "easeProperty",
      value: function easeProperty(name, property, value, duration, ease, isYoyo, onComplete) {
        if (!this.has(name)) {
          return this;
        }

        if (duration === undefined) {
          duration = 1000;
        }

        if (ease === undefined) {
          ease = 'Linear';
        }

        this.get(name).easeProperty(property, value, duration, ease, isYoyo, onComplete);
        return this;
      }
    }, {
      key: "remove",
      value: function remove(name) {
        if (!this.has(name)) {
          return this;
        }

        var spriteData = this.get(name);
        delete this.sprites[name];
        this.removedSprites.push(spriteData.sprite);

        if (this.fadeTime > 0) {
          spriteData.easeProperty('tintGray', // property
          0, // to value
          this.fadeTime, // duration
          'Linear', // ease 
          false, // yoyo
          function () {
            // onComplete
            spriteData.destroy();
          });
        } else {
          spriteData.destroy();
        }

        return this;
      }
    }, {
      key: "removeAll",
      value: function removeAll() {
        for (var name in this.sprites) {
          this.remove(name);
        }

        return this;
      }
    }, {
      key: "setTexture",
      value: function setTexture(name, textureKey, frameKey) {
        if (!this.has(name)) {
          return this;
        }

        this.get(name).setTexture(textureKey, frameKey);
        return this;
      }
    }, {
      key: "playAnimation",
      value: function playAnimation(name, key) {
        if (!this.has(name)) {
          this.add(name);
        }

        this.get(name).playAnimation(key);
        return this;
      }
    }, {
      key: "stopAnimation",
      value: function stopAnimation(name) {
        if (!this.has(name)) {
          return this;
        }

        this.get(name).stopAnimation();
        return this;
      }
    }, {
      key: "chainAnimation",
      value: function chainAnimation(name, keys) {
        if (!this.has(name)) {
          return this;
        }

        this.get(name).chainAnimation(keys);
        return this;
      }
    }, {
      key: "pauseAnimation",
      value: function pauseAnimation(name) {
        if (!this.has(name)) {
          return this;
        }

        this.get(name).pauseAnimation();
        return this;
      }
    }]);

    return SpriteManager;
  }();

  Object.assign(SpriteManager.prototype, EventEmitterMethods);

  var SetClickTarget = function SetClickTarget(target) {
    if (IsSceneObject(target)) {
      this.clickEE = target.input;
    } else {
      // Assume that target is a game object
      this.clickEE = target.setInteractive();
    }

    return this;
  };

  var SetTargetCamera = function SetTargetCamera(camera) {
    this.camera = camera;
    return this;
  };

  var SetNextPageInput = function SetNextPageInput(input) {
    var textPlayer = this;

    if (!input) {
      this.nextPageInput = null;
    } else if (typeof input === 'function') {
      this.nextPageInput = function (callback, args, scope) {
        var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope);
        input.call(textPlayer, wrapCallback);
      };
    } else {
      this.nextPageInput = function (callback, args, scope) {
        WaitMultiple(textPlayer, input, callback, args, scope);
      };
    }
  };

  var AddImage = function AddImage(key, config) {
    this.imageManager.add(key, config);
    return this;
  };

  var Play = function Play(content) {
    if (this.isPlaying) {
      return this;
    }

    this.removeChildren();
    this.parser.start(content); // Parse bbcode-content

    this.isPlaying = true;
    this.once('complete', function () {
      this.isPlaying = false;
    }, this);
    this.lastWrapResult = undefined;
    this.typingNextPage();
    return this;
  };

  var PlayPromise = function PlayPromise(content) {
    var promise = WaitComplete(this);
    this.play(content);
    return promise;
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var TypingNextPage = function TypingNextPage() {
    if (!this.isPlaying || this.isPageTyping) {
      return this;
    }

    var wrapCallback = GetValue$1(this.wrapConfig, 'callback', this.runWordWrap);

    if (typeof wrapCallback === 'string') {
      wrapCallback = this[wrapCallback];
    }

    var result = wrapCallback.call(this, this.lastWrapResult);
    this.lastWrapResult = result;
    this.emit('page.start');

    var OnTypingPageComplete = function OnTypingPageComplete() {
      this.emit(StopPlayEvent); // Clear registed StopPlayEvent

      if (result.isLastPage) {
        this.emit('complete');
      } else {
        this.emit('page.complete');

        if (this.nextPageInput) {
          this.nextPageInput(TypingNextPage, [], this);
        }
      }
    }; // Remove event when typing pages has been canceled


    this.once(StopPlayEvent, function () {
      this.typeWriter.off('complete', OnTypingPageComplete, this);
    });
    this.typeWriter.once('complete', OnTypingPageComplete, this).start(result.children);
  };

  var Pause = function Pause() {
    // Pause typing timer and animation progresses
    this.typeWriter.pause();
    return this;
  };

  var Resume = function Resume() {
    // Resume typing timer and animation progresses
    this.typeWriter.resume();
    return this;
  };

  var SetTimeScale = function SetTimeScale(value) {
    this.typeWriter.setTimeScale(value);
    return this;
  };

  var SetIgnoreWait = function SetIgnoreWait(value) {
    this.typeWriter.setIgnoreWait(value);
    return this;
  };

  var ShowPage = function ShowPage() {
    // Only can work after playing, and before processing last child
    if (!this.isPlaying || !this.isPageTyping) {
      return this;
    } // Save parameters


    var typingSpeedSave = this.typeWriter.speed;
    var ignoreWaitSave = this.typeWriter.ignoreWait;
    var skipTypingAnimationSave = this.typeWriter.skipTypingAnimation;
    var skipSoundEffectSave = this.typeWriter.skipSoundEffect;
    this.typeWriter.once('complete', function () {
      // Recover parameters
      this.typeWriter.setSpeed(typingSpeedSave).setIgnoreWait(ignoreWaitSave).setSkipTypingAnimation(skipTypingAnimationSave).setSkipSoundEffect(skipSoundEffectSave);
    }, this).setSpeed(0).skipCurrentTypingDelay().setIgnoreWait(true).setSkipTypingAnimation(true).setSkipSoundEffect(true);
    return this;
  };

  var Methods = {
    setClickTarget: SetClickTarget,
    setTargetCamera: SetTargetCamera,
    setNextPageInput: SetNextPageInput,
    addImage: AddImage,
    play: Play,
    playPromise: PlayPromise,
    typingNextPage: TypingNextPage,
    pause: Pause,
    resume: Resume,
    setTimeScale: SetTimeScale,
    setIgnoreWait: SetIgnoreWait,
    showPage: ShowPage
  };

  var ClearEvents = function ClearEvents(textPlayer) {
    for (var i = 0, cnt = ClearEvents$1.length; i < cnt; i++) {
      textPlayer.emit(ClearEvents$1[i]);
    }
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var TextPlayer = /*#__PURE__*/function (_DynamicText) {
    _inherits(TextPlayer, _DynamicText);

    var _super = _createSuper(TextPlayer);

    function TextPlayer(scene, x, y, fixedWidth, fixedHeight, config) {
      var _this;

      _classCallCheck(this, TextPlayer);

      if (IsPlainObject(x)) {
        config = x;
      } else if (IsPlainObject(fixedWidth)) {
        config = fixedWidth;
      }

      if (config === undefined) {
        config = {};
      } // Don't set text in DynamicText's constructor


      var content = config.text;
      delete config.text;
      _this = _super.call(this, scene, x, y, fixedWidth, fixedHeight, config);
      _this.type = 'rexTextPlayer';
      _this.parser = new Parser(_assertThisInitialized(_this), GetValue(config, 'parser', undefined));
      _this.typeWriter = new TypeWriter(_assertThisInitialized(_this), GetValue(config, 'typing', undefined));
      _this._imageManager = undefined;
      var imageData = GetValue(config, 'images', undefined);

      if (imageData) {
        _this.addImage(imageData);
      }

      _this._soundManager = undefined;
      var soundManagerConfig = GetValue(config, 'sounds', undefined);

      if (soundManagerConfig) {
        _this._soundManager = new SoundManager(_this.scene, soundManagerConfig);
      }

      _this.setTargetCamera(GetValue(config, 'camera', _this.scene.cameras.main));

      _this._spriteManager = undefined;
      var spriteManagerConfig = GetValue(config, 'sprites', undefined);

      if (spriteManagerConfig) {
        _this._spriteManager = new SpriteManager(_this.scene, spriteManagerConfig);
      }

      _this.setClickTarget(GetValue(config, 'clickTarget', _assertThisInitialized(_this))); // this.clickEE


      _this.setNextPageInput(GetValue(config, 'nextPageInput', null));

      _this.isPlaying = false;

      if (content) {
        _this.play(content);
      }

      return _this;
    }

    _createClass(TextPlayer, [{
      key: "imageManager",
      get: function get() {
        if (this._imageManager === undefined) {
          this._imageManager = new ImageManager(this.scene);
        }

        return this._imageManager;
      }
    }, {
      key: "soundManager",
      get: function get() {
        if (this._soundManager === undefined) {
          this._soundManager = new SoundManager(this.scene);
        }

        return this._soundManager;
      }
    }, {
      key: "spriteManager",
      get: function get() {
        if (this._spriteManager === undefined) {
          this._spriteManager = new SpriteManager(this.scene);
        }

        return this._spriteManager;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        ClearEvents(this);
        this.parser.destroy();
        this.parser = undefined;
        this.typeWriter.destroy(fromScene);
        this.typeWriter = undefined;

        if (this._imageManager) {
          this._imageManager.destroy(fromScene);
        }

        this._imageManager = undefined;

        if (this._soundManager) {
          this._soundManager.destroy(fromScene);
        }

        this._soundManager = undefined;
        this.camera = undefined;

        if (this._spriteManager) {
          this._spriteManager.destroy(fromScene);
        }

        this._spriteManager = undefined;
        this.clickEE = undefined;

        _get(_getPrototypeOf(TextPlayer.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "isPageTyping",
      get: function get() {
        return this.typeWriter.isPageTyping;
      }
    }]);

    return TextPlayer;
  }(DynamicText);

  Object.assign(TextPlayer.prototype, Methods);

  function Factory (x, y, width, height, config) {
    var gameObject = new TextPlayer(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function Creator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }

    if (addToScene !== undefined) {
      config.add = addToScene;
    }

    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    var gameObject = new TextPlayer(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
  }

  var IsInValidKey = function IsInValidKey(keys) {
    return keys == null || keys === '' || keys.length === 0;
  };

  var GetEntry = function GetEntry(target, keys, defaultEntry) {
    var entry = target;

    if (IsInValidKey(keys)) ; else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }

      var key;

      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];

        if (entry[key] == null || _typeof(entry[key]) !== 'object') {
          var newEntry;

          if (i === cnt - 1) {
            if (defaultEntry === undefined) {
              newEntry = {};
            } else {
              newEntry = defaultEntry;
            }
          } else {
            newEntry = {};
          }

          entry[key] = newEntry;
        }

        entry = entry[key];
      }
    }

    return entry;
  };

  var SetValue = function SetValue(target, keys, value) {
    // no object
    if (_typeof(target) !== 'object') {
      return;
    } // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      } // set target to another object
      else if (_typeof(value) === 'object') {
        target = value;
      }
    } else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }

      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }

    return target;
  };

  var DynamicTextPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(DynamicTextPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(DynamicTextPlugin);

    function DynamicTextPlugin(pluginManager) {
      var _this;

      _classCallCheck(this, DynamicTextPlugin);

      _this = _super.call(this, pluginManager); //  Register our new Game Object type

      pluginManager.registerGameObject('rexTextPlayer', Factory, Creator);
      return _this;
    }

    _createClass(DynamicTextPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);

    return DynamicTextPlugin;
  }(Phaser.Plugins.BasePlugin);

  SetValue(window, 'RexPlugins.GameObjects.TextPlayer', TextPlayer);

  return DynamicTextPlugin;

})));
