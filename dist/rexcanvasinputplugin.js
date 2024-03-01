(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcanvasinputplugin = factory());
})(this, (function () { 'use strict';

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
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
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
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
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
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
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);
        var desc;
        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            return false;
          }
          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }
        return true;
      };
    }
    return set(target, property, value, receiver);
  }
  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new TypeError('failed to set property');
    }
    return value;
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
    drawFrame: function drawFrame(key, frame, dx, dy, dWidth, dHeight, sxOffset, syOffset, sWidth, sHeight) {
      var textureFrame = this.scene.sys.textures.getFrame(key, frame);
      if (!textureFrame) {
        return this;
      }
      var frameWidth = textureFrame.cutWidth,
        frameHeight = textureFrame.cutHeight;
      if (dx === undefined) {
        dx = 0;
      }
      if (dy === undefined) {
        dy = 0;
      }
      if (dWidth === undefined) {
        dWidth = frameWidth;
      }
      if (dHeight === undefined) {
        dHeight = frameHeight;
      }
      if (sxOffset === undefined) {
        sxOffset = 0;
      }
      if (syOffset === undefined) {
        syOffset = 0;
      }
      if (sWidth === undefined) {
        sWidth = frameWidth;
      }
      if (sHeight === undefined) {
        sHeight = frameHeight;
      }
      var sx = textureFrame.cutX + sxOffset;
      var sy = textureFrame.cutY + syOffset;
      this.context.drawImage(textureFrame.source.image,
      // image
      sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      this.dirty = true;
      return this;
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
    var textures = scene.sys.textures;
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
    var destCtx = destCanvas.getContext('2d', {
      willReadFrequently: true
    });
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
      if (this.renderer && this.renderer.gl) {
        this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
        if (typeof WEBGL_DEBUG === "undefined" ? "undefined" : _typeof(WEBGL_DEBUG)) {
          this.frame.glTexture.spectorMetadata = {
            textureKey: 'Canvas Game Object'
          };
        }
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
      var textureFrame = this.scene.sys.textures.getFrame(key, frame);
      if (!textureFrame) {
        return this;
      }
      if (this.width !== textureFrame.cutWidth || this.height !== textureFrame.cutHeight) {
        this.setSize(textureFrame.cutWidth, textureFrame.cutHeight);
      } else {
        this.clear();
      }
      this.drawFrame(key, frame);
      this.dirty = true;
      return this;
    }
  };

  var MinVersion = 60;
  var IsChecked = false;
  var CheckP3Version = function CheckP3Version(minVersion) {
    if (IsChecked) {
      return;
    }
    if (minVersion === undefined) {
      minVersion = MinVersion;
    }
    var currentVersion = parseInt(Phaser.VERSION.match(/\.(\d+)\./)[1]);
    if (currentVersion < minVersion) {
      console.error("Minimum supported version : 3.".concat(minVersion));
    }
    IsChecked = true;
  };

  CheckP3Version();
  var CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;
  var GameObject$1 = Phaser.GameObjects.GameObject;
  var UUID = Phaser.Utils.String.UUID;
  var Canvas = /*#__PURE__*/function (_GameObject) {
    _inherits(Canvas, _GameObject);
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
      _this = _callSuper(this, Canvas, [scene, 'rexCanvas']);
      _this.renderer = scene.sys.game.renderer;
      _this.resolution = 1;
      _this._width = width;
      _this._height = height;
      width = Math.max(Math.ceil(width * _this.resolution), 1);
      height = Math.max(Math.ceil(height * _this.resolution), 1);
      _this.canvas = CanvasPool$1.create(_assertThisInitialized(_this), width, height);
      _this.context = _this.canvas.getContext('2d', {
        willReadFrequently: true
      });
      _this.dirty = false;
      _this.setPosition(x, y);
      _this.setOrigin(0.5, 0.5);
      _this.initPipeline();
      _this.initPostPipeline(true);
      _this._crop = _this.resetCropObject();

      //  Create a Texture for this Text object
      _this._textureKey = UUID();
      _this.texture = scene.sys.textures.addCanvas(_this._textureKey, _this.canvas);

      //  Get the frame
      _this.frame = _this.texture.get();

      //  Set the resolution
      _this.frame.source.resolution = _this.resolution;
      if (_this.renderer && _this.renderer.gl) {
        //  Clear the default 1x1 glTexture, as we override it later
        _this.renderer.deleteTexture(_this.frame.source.glTexture);
        _this.frame.source.glTexture = null;
      }
      _this.dirty = true;
      return _this;
    }
    _createClass(Canvas, [{
      key: "preDestroy",
      value: function preDestroy() {
        CanvasPool$1.remove(this.canvas);
        this.canvas = null;
        this.context = null;
        var texture = this.texture;
        if (texture) {
          texture.destroy();
        }
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
      key: "setCanvasSize",
      value: function setCanvasSize(width, height) {
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

      // setSize might be override
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.setCanvasSize(width, height);
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
  }(GameObject$1);
  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Canvas, [Components.Alpha, Components.BlendMode, Components.Crop, Components.Depth, Components.Flip, Components.GetBounds, Components.Mask, Components.Origin, Components.Pipeline, Components.PostPipeline, Components.ScrollFactor, Components.Tint, Components.Transform, Components.Visible, Render, CanvasMethods, TextureMethods]);

  var GetValue$g = Phaser.Utils.Objects.GetValue;
  var GetPadding$1 = function GetPadding(padding, key) {
    if (key === undefined) {
      return padding;
    }
    return padding[key];
  };
  var SetPadding$1 = function SetPadding(padding, key, value) {
    if (padding === undefined) {
      padding = {};
    }
    if (key === undefined) {
      key = 0;
    }
    var keyType = _typeof(key);
    if (keyType === 'string') {
      padding[key] = value;
    } else if (keyType === 'number') {
      padding.left = key;
      padding.right = key;
      padding.top = key;
      padding.bottom = key;
    } else {
      padding.left = GetValue$g(key, 'left', 0);
      padding.right = GetValue$g(key, 'right', 0);
      padding.top = GetValue$g(key, 'top', 0);
      padding.bottom = GetValue$g(key, 'bottom', 0);
    }
    return padding;
  };

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
  var GetValue$f = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue;

      //  Use for loop here so we can break early
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
    if (_typeof(obj) !== 'object' || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }
    return obj;
  };

  var DataMethods = {
    enableData: function enableData() {
      if (this.data === undefined) {
        this.data = {};
      }
      return this;
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
    getData: function getData(key, defaultValue) {
      this.enableData();
      return key === undefined ? this.data : GetValue$f(this.data, key, defaultValue);
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
    }
  };

  var Base = /*#__PURE__*/function () {
    function Base(parent, type) {
      _classCallCheck(this, Base);
      this.setParent(parent);
      this.type = type;
      this.renderable = false;
      this.reset().setActive();
    }
    _createClass(Base, [{
      key: "destroy",
      value: function destroy() {
        this.parent.removeChild(this);
      }
    }, {
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
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        return this;
      }

      // Override
    }, {
      key: "onFree",
      value: function onFree() {
        this.reset().setParent();
      }

      // Override
    }, {
      key: "reset",
      value: function reset() {
        return this;
      }

      // Override
    }, {
      key: "render",
      value: function render() {}

      // Override
    }, {
      key: "contains",
      value: function contains(x, y) {
        return false;
      }
    }]);
    return Base;
  }();
  Object.assign(Base.prototype, DataMethods);

  var RenderMethods = {
    // Override
    renderContent: function renderContent() {},
    // Override
    render: function render() {
      if (!this.willRender) {
        return this;
      }
      var context = this.context;
      context.save();
      context.globalAlpha = this.alpha;
      if (this.toLocalPosition) {
        var x = this.drawX,
          y = this.drawY;
        if (this.autoRound) {
          x = Math.round(x);
          y = Math.round(y);
        }
        context.translate(x, y);
        context.scale(this.scaleX, this.scaleY);
        context.rotate(this.rotation);
      }
      if (this.drawBelowCallback) {
        this.drawBelowCallback(this);
      }
      this.renderContent();
      if (this.drawAboveCallback) {
        this.drawAboveCallback(this);
      }
      context.restore();
      return this;
    }
  };

  var RotateAround$1 = Phaser.Math.RotateAround;
  var CanvasPositionToBobPosition = function CanvasPositionToBobPosition(canvasX, canvasY, bob, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      if (globPoint$1 === undefined) {
        globPoint$1 = {};
      }
      out = globPoint$1;
    }
    out.x = (canvasX - bob.drawX) / bob.scaleX;
    out.y = (canvasY - bob.drawY) / bob.scaleY;
    if (bob.rotation !== 0) {
      RotateAround$1(out, 0, 0, -bob.rotation);
    }
    return out;
  };
  var globPoint$1;

  var Rectangle = Phaser.Geom.Rectangle;
  var Contains = function Contains(canvasX, canvasY) {
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
    return GetBobBounds(this).contains(bobPosition.x, bobPosition.y);
  };
  var GetBobBounds = function GetBobBounds(bob) {
    if (bobBounds === undefined) {
      bobBounds = new Rectangle();
    }
    var x = bob.drawTLX,
      y = bob.drawTLY;
    bobBounds.setTo(x, y, bob.drawTRX - x, bob.drawBLY - y);
    return bobBounds;
  };
  var bobBounds;

  var RotateAround = Phaser.Math.RotateAround;
  var BobPositionToCanvasPosition = function BobPositionToCanvasPosition(bob, bobX, bobY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      if (globPoint === undefined) {
        globPoint = {};
      }
      out = globPoint;
    }
    out.x = bobX;
    out.y = bobY;
    if (bob.rotation !== 0) {
      RotateAround(out, 0, 0, bob.rotation);
    }
    out.x = out.x * bob.scaleX + bob.drawX;
    out.y = out.y * bob.scaleY + bob.drawY;
    return out;
  };
  var globPoint;

  var TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
  var GameObjectLocalXYToWorldXY = function GameObjectLocalXYToWorldXY(gameObject, localX, localY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globOut;
    }
    var px = localX - gameObject.width * gameObject.originX;
    var py = localY - gameObject.height * gameObject.originY;
    if (tempMatrix === undefined) {
      tempMatrix = new TransformMatrix();
      parentMatrix = new TransformMatrix();
    }
    if (gameObject.parentContainer) {
      gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
    } else {
      tempMatrix.applyITRS(gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY);
    }
    tempMatrix.transformPoint(px, py, out);
    return out;
  };
  var tempMatrix, parentMatrix;
  var globOut = {};

  var BobPositionToWorldPosition = function BobPositionToWorldPosition(dynamicText, bob, bobX, bobY, out) {
    var localXY = BobPositionToCanvasPosition(bob, bobX, bobY, true);
    var worldXY = GameObjectLocalXYToWorldXY(dynamicText, localXY.x, localXY.y, out);
    return worldXY;
  };

  var GetBobWorldPosition = function GetBobWorldPosition(dynamicText, bob, offsetX, offsetY, out) {
    if (typeof offsetX !== 'number') {
      out = offsetX;
      offsetX = 0;
      offsetY = 0;
    }
    var bobX = bob.drawCenterX + offsetX;
    var bobY = bob.drawCenterY + offsetY;
    return BobPositionToWorldPosition(dynamicText, bob, bobX, bobY, out);
  };

  var GetWorldPosition = function GetWorldPosition(offsetX, offsetY, out) {
    return GetBobWorldPosition(this.parent, this, offsetX, offsetY, out);
  };

  var Methods$2 = {
    contains: Contains,
    getWorldPosition: GetWorldPosition
  };
  Object.assign(Methods$2, RenderMethods);

  var DegToRad$1 = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var GetValue$e = Phaser.Utils.Objects.GetValue;
  var RenderBase = /*#__PURE__*/function (_Base) {
    _inherits(RenderBase, _Base);
    function RenderBase(parent, type) {
      var _this;
      _classCallCheck(this, RenderBase);
      _this = _callSuper(this, RenderBase, [parent, type]);
      _this.renderable = true;
      _this.scrollFactorX = 1;
      _this.scrollFactorY = 1;
      _this.toLocalPosition = true;
      _this.originX = 0;
      _this.offsetX = 0; // Override
      _this.offsetY = 0; // Override
      return _this;
    }
    _createClass(RenderBase, [{
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
      key: "setInitialPosition",
      value: function setInitialPosition(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
      }
    }, {
      key: "setScrollFactorX",
      value: function setScrollFactorX(x) {
        this.scrollFactorX = x;
        return this;
      }
    }, {
      key: "setScrollFactorY",
      value: function setScrollFactorY(y) {
        this.scrollFactorY = y;
        return this;
      }
    }, {
      key: "setScrollFactor",
      value: function setScrollFactor(x, y) {
        if (y === undefined) {
          y = x;
        }
        this.scrollFactorX = x;
        this.scrollFactorY = y;
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
      }

      // Override
    }, {
      key: "width",
      get: function get() {
        return 0;
      }

      // Override
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
      }

      // Override
    }, {
      key: "height",
      get: function get() {
        return 0;
      }

      // Override
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
      key: "setOrigin",
      value: function setOrigin(x) {
        this.originX = x;
        return this;
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        this.align = align;
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
        }

        // ScaleX, ScaleY
        var width = GetValue$e(o, 'width', undefined);
        var height = GetValue$e(o, 'height', undefined);
        var scaleX = GetValue$e(o, 'scaleX', undefined);
        var scaleY = GetValue$e(o, 'scaleY', undefined);
        if (width !== undefined) {
          if (height === undefined && scaleY === undefined) {
            this.setWidth(width, true);
          } else {
            this.setWidth(width);
          }
        } else if (scaleX !== undefined) {
          this.setScaleX(scaleX);
        }
        if (height !== undefined) {
          if (width === undefined && scaleX === undefined) {
            this.setHeight(height, true);
          } else {
            this.setHeight(height);
          }
        } else if (scaleY !== undefined) {
          this.setScaleY(scaleY);
        }
        if (o.hasOwnProperty('leftSpace')) {
          this.setLeftSpace(o.leftSpace);
        }
        if (o.hasOwnProperty('rightSpace')) {
          this.setRightSpace(o.rightSpace);
        }
        if (o.hasOwnProperty('align')) {
          this.setAlign(o.align);
        }
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
      }
    }, {
      key: "reset",
      value: function reset() {
        this.setVisible().setAlpha(1).setPosition(0, 0).setRotation(0).setScale(1, 1).setLeftSpace(0).setRightSpace(0).setOrigin(0).setAlign().setDrawBelowCallback().setDrawAboveCallback();
        return this;
      }

      // Override
    }, {
      key: "willRender",
      get: function get() {
        return this.visible && this.alpha > 0;
      }
    }, {
      key: "drawX",
      get: function get() {
        var x = this.x + this.leftSpace + this.offsetX - this.originX * this.width;
        return this.parent._textOX * this.scrollFactorX + x;
      }
    }, {
      key: "drawY",
      get: function get() {
        var y = this.y + this.offsetY;
        return this.parent._textOY * this.scrollFactorY + y;
      }

      // Override
    }, {
      key: "drawTLX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawCenterX",
      get: function get() {
        return (this.drawTRX + this.drawTLX) / 2;
      }
    }, {
      key: "drawCenterY",
      get: function get() {
        return (this.drawBLY + this.drawTLY) / 2;
      }
    }]);
    return RenderBase;
  }(Base);
  Object.assign(RenderBase.prototype, Methods$2);

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

  var GetProperty = function GetProperty(name, config, defaultConfig) {
    if (config.hasOwnProperty(name)) {
      return config[name];
    } else {
      return defaultConfig[name];
    }
  };

  var GetValue$d = Phaser.Utils.Objects.GetValue;
  var RoundRectangle = /*#__PURE__*/function () {
    function RoundRectangle(x, y, width, height, radiusConfig) {
      _classCallCheck(this, RoundRectangle);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = x;
      }
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = 0;
      }
      if (radiusConfig === undefined) {
        radiusConfig = 0;
      }
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
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "setRadius",
      value: function setRadius(value) {
        if (value === undefined) {
          value = 0;
        }
        this.radius = value;
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
        return Math.max(radius.tl.x, radius.tl.y, radius.tr.x, radius.tr.y, radius.bl.x, radius.bl.y, radius.br.x, radius.br.y);
      },
      set: function set(value) {
        var defaultRadiusX, defaultRadiusY;
        if (typeof value === 'number') {
          defaultRadiusX = value;
          defaultRadiusY = value;
        } else {
          defaultRadiusX = GetValue$d(value, 'x', 0);
          defaultRadiusY = GetValue$d(value, 'y', 0);
        }
        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue$d(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue$d(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue$d(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue$d(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
      }
    }, {
      key: "radiusTL",
      get: function get() {
        var radius = this.cornerRadius.tl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tl, value);
      }
    }, {
      key: "radiusTR",
      get: function get() {
        var radius = this.cornerRadius.tr;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tr, value);
      }
    }, {
      key: "radiusBL",
      get: function get() {
        var radius = this.cornerRadius.bl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.bl, value);
      }
    }, {
      key: "radiusBR",
      get: function get() {
        var radius = this.cornerRadius.br;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.br, value);
      }
    }]);
    return RoundRectangle;
  }();
  var GetRadius = function GetRadius(radius, defaultRadiusX, defaultRadiusY) {
    if (radius === undefined) {
      radius = {
        x: defaultRadiusX,
        y: defaultRadiusY
      };
    } else if (typeof radius === 'number') {
      radius = {
        x: radius,
        y: radius
      };
    }
    SetConvex(radius);
    return radius;
  };
  var SetRadius = function SetRadius(radius, value) {
    if (typeof value === 'number') {
      radius.x = value;
      radius.y = value;
    } else {
      radius.x = GetValue$d(value, 'x', 0);
      radius.y = GetValue$d(value, 'y', 0);
    }
    SetConvex(radius);
  };
  var SetConvex = function SetConvex(radius) {
    radius.convex = radius.x >= 0 || radius.y >= 0;
    radius.x = Math.abs(radius.x);
    radius.y = Math.abs(radius.y);
  };

  var DegToRad = Phaser.Math.DegToRad;
  var AddRoundRectanglePath = function AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration) {
    var geom = new RoundRectangle(x, y, width, height, radiusConfig),
      minWidth = geom.minWidth,
      minHeight = geom.minHeight,
      scaleRX = width >= minWidth ? 1 : width / minWidth,
      scaleRY = height >= minHeight ? 1 : height / minHeight;
    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;
    var startX, startY;
    context.save();
    context.beginPath();
    context.translate(x, y);

    // Top-left
    radius = cornerRadius.tl;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = radiusX;
        centerY = radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 270, false, iteration);
      } else {
        centerX = 0;
        centerY = 0;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 0, true, iteration);
      }
      startX = 0;
      startY = radiusY;
    } else {
      context.lineTo(0, 0);
      startX = 0;
      startY = 0;
    }

    // Top-right
    radius = cornerRadius.tr;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = width - radiusX;
        centerY = radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 360, false, iteration);
      } else {
        centerX = width;
        centerY = 0;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 90, true, iteration);
      }
    } else {
      context.lineTo(width, 0);
    }

    // Bottom-right
    radius = cornerRadius.br;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = width - radiusX;
        centerY = height - radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 0, 90, false, iteration);
      } else {
        centerX = width;
        centerY = height;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 180, true, iteration);
      }
    } else {
      context.lineTo(width, height);
    }

    // Bottom-left
    radius = cornerRadius.bl;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = radiusX;
        centerY = height - radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 180, false, iteration);
      } else {
        centerX = 0;
        centerY = height;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 360, 270, true, iteration);
      }
    } else {
      context.lineTo(0, height);
    }
    context.lineTo(startX, startY);
    context.closePath();
    context.restore();
  };
  var IsConvexArc = function IsConvexArc(radius) {
    return !radius.hasOwnProperty('convex') ||
    // radius does not have convex property
    radius.convex;
  };
  var IsArcCorner = function IsArcCorner(radius) {
    return radius.x > 0 && radius.y > 0;
  };
  var ArcTo = function ArcTo(context, centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }
    startAngle = DegToRad(startAngle);
    endAngle = DegToRad(endAngle);
    if (iteration == null) {
      // undefined, or null
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle, antiClockWise);
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
    width = Math.max(1, width - strokeLineWidth); // Min width is 1
    height = Math.max(1, height - strokeLineWidth); // Min height is 1
    DrawRoundRectangle(canvasObject.canvas, canvasObject.context, x, x, width, height, radius, color, strokeColor, strokeLineWidth, color2, isHorizontalGradient, iteration);
  };

  var GetValue$c = Phaser.Utils.Objects.GetValue;
  var Background = /*#__PURE__*/function (_RenderBase) {
    _inherits(Background, _RenderBase);
    function Background(parent, config) {
      var _this;
      _classCallCheck(this, Background);
      _this = _callSuper(this, Background, [parent, 'background']);
      _this.setScrollFactor(0);
      _this.setColor(GetValue$c(config, 'color', null), GetValue$c(config, 'color2', null), GetValue$c(config, 'horizontalGradient', true));
      _this.setStroke(GetValue$c(config, 'stroke', null), GetValue$c(config, 'strokeThickness', 2));
      _this.setCornerRadius(GetValue$c(config, 'cornerRadius', 0), GetValue$c(config, 'cornerIteration', null));
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
        if (color != null) {
          if (lineWidth === undefined) {
            lineWidth = 2;
          }
        }
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
      key: "modifyStyle",
      value: function modifyStyle(o) {
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color, GetProperty('color2', o, this), GetProperty('horizontalGradient', o, this));
        }
        if (o.hasOwnProperty('stroke')) {
          this.setStroke(o.stroke, GetProperty('strokeThickness', o, this));
        }
        if (o.hasOwnProperty('cornerRadius')) {
          this.setCornerRadius(o.cornerRadius, GetProperty('cornerIteration', o, this));
        }
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        _get(_getPrototypeOf(Background.prototype), "modifyPorperties", this).call(this, o);
        this.modifyStyle(o);
        return this;
      }
    }, {
      key: "setCornerRadius",
      value: function setCornerRadius(radius, iteration) {
        this.cornerRadius = radius;
        this.cornerIteration = iteration;
        return this;
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        DrawRoundRectangleBackground(this.parent, this.color, this.stroke, this.strokeThickness, this.cornerRadius, this.color2, this.horizontalGradient, this.cornerIteration);
      }
    }]);
    return Background;
  }(RenderBase);

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var InnerBounds = /*#__PURE__*/function (_RenderBase) {
    _inherits(InnerBounds, _RenderBase);
    function InnerBounds(parent, config) {
      var _this;
      _classCallCheck(this, InnerBounds);
      _this = _callSuper(this, InnerBounds, [parent, 'innerbounds']);
      _this.setScrollFactor(0);
      _this.setColor(GetValue$b(config, 'color', null), GetValue$b(config, 'color2', null), GetValue$b(config, 'horizontalGradient', true));
      _this.setStroke(GetValue$b(config, 'stroke', null), GetValue$b(config, 'strokeThickness', 2));
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
        if (color != null) {
          if (lineWidth === undefined) {
            lineWidth = 2;
          }
        }
        this.stroke = color;
        this.strokeThickness = lineWidth;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        _get(_getPrototypeOf(InnerBounds.prototype), "modifyPorperties", this).call(this, o);
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color, GetValue$b(o, 'color2', null), GetValue$b(o, 'horizontalGradient', true));
        }
        if (o.hasOwnProperty('stroke')) {
          this.setStroke(o.stroke, GetValue$b(o, 'strokeThickness', 2));
        }
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
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
  }(RenderBase);

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var TextStyle = /*#__PURE__*/function () {
    function TextStyle(parent, config) {
      _classCallCheck(this, TextStyle);
      this.parent = parent;
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
          offsetY: this.offsetY,
          leftSpace: this.leftSpace,
          rightSpace: this.rightSpace,
          backgroundHeight: this.backgroundHeight,
          backgroundBottomY: this.backgroundBottomY,
          align: this.align
        };
      }
    }, {
      key: "set",
      value: function set(o) {
        this.setBold(GetValue$a(o, 'bold', false));
        this.setItalic(GetValue$a(o, 'italic', false));
        this.setFontSize(GetValue$a(o, 'fontSize', '16px'));
        this.setFontFamily(GetValue$a(o, 'fontFamily', 'Courier'));
        this.setColor(GetValue$a(o, 'color', '#fff'));
        this.setStrokeStyle(GetValue$a(o, 'stroke', null), GetValue$a(o, 'strokeThickness', 0));
        this.setShadow(GetValue$a(o, 'shadowColor', null), GetValue$a(o, 'shadowOffsetX', 0), GetValue$a(o, 'shadowOffsetY', 0), GetValue$a(o, 'shadowBlur', 0));
        this.setOffset(GetValue$a(o, 'offsetX', 0), GetValue$a(o, 'offsetY', 0));
        this.setSpace(GetValue$a(o, 'leftSpace', 0), GetValue$a(o, 'rightSpace', 0));
        this.setAlign(GetValue$a(o, 'align', undefined));
        this.setBackgroundColor(GetValue$a(o, 'backgroundColor', null));
        this.setBackgroundHeight(GetValue$a(o, 'backgroundHeight', undefined));
        this.setBackgroundBottomY(GetValue$a(o, 'backgroundBottomY', undefined));
        return this;
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
        if (o.hasOwnProperty('leftSpace')) {
          this.setLeftSpace(o.leftSpace);
        }
        if (o.hasOwnProperty('rightSpace')) {
          this.setRightSpace(o.rightSpace);
        }
        if (o.hasOwnProperty('align')) {
          this.setAlign(o.align);
        }
        if (o.hasOwnProperty('backgroundColor')) {
          this.setBackgroundColor(o.backgroundColor);
        }
        if (o.hasOwnProperty('backgroundHeight')) {
          this.setBackgroundHeight(o.backgroundHeight);
        }
        if (o.hasOwnProperty('backgroundBottomY')) {
          this.setBackgroundBottomY(o.backgroundBottomY);
        }
        return this;
      }
    }, {
      key: "setUpdateTextFlag",
      value: function setUpdateTextFlag() {
        if (this.parent) {
          this.parent.updateTextFlag = true;
        }
        return this;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new TextStyle(null, this.toJSON());
      }
    }, {
      key: "copyFrom",
      value: function copyFrom(sourceTextStyle) {
        this.set(sourceTextStyle.toJSON());
        return this;
      }
    }, {
      key: "copyTo",
      value: function copyTo(targetTextStyle) {
        targetTextStyle.set(this.toJSON());
        return this;
      }
    }, {
      key: "setBold",
      value: function setBold(value) {
        if (value === undefined) {
          value = true;
        }
        this.bold = value;
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "setItalic",
      value: function setItalic(value) {
        if (value === undefined) {
          value = true;
        }
        this.italic = value;
        this.setUpdateTextFlag();
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
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        this.setUpdateTextFlag();
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
      key: "setBackgroundColor",
      value: function setBackgroundColor(color) {
        this.backgroundColor = GetStyle(color);
        return this;
      }
    }, {
      key: "hasBackgroundColor",
      get: function get() {
        return this.backgroundColor != null;
      }
    }, {
      key: "setBackgroundHeight",
      value: function setBackgroundHeight(height) {
        this.backgroundHeight = height;
        return this;
      }
    }, {
      key: "setBackgroundBottomY",
      value: function setBackgroundBottomY(y) {
        this.backgroundBottomY = y;
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
      key: "setLeftSpace",
      value: function setLeftSpace(space) {
        if (space === undefined) {
          space = 0;
        }
        this.leftSpace = space;
        return this;
      }
    }, {
      key: "setRightSpace",
      value: function setRightSpace(space) {
        if (space === undefined) {
          space = 0;
        }
        this.rightSpace = space;
        return this;
      }
    }, {
      key: "setSpace",
      value: function setSpace(leftSpace, rightSpace) {
        this.setLeftSpace(leftSpace).setRightSpace(rightSpace);
        return this;
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        this.align = align;
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

  var SetFixedSize = function SetFixedSize(width, height) {
    if (width === undefined) {
      width = 0;
    }
    if (height === undefined) {
      height = 0;
    }
    if (this.fixedWidth === width && this.fixedHeight === height) {
      return this;
    }
    this.fixedWidth = width;
    this.fixedHeight = height;
    this.dirty = true; // -> this.updateTexture();

    this.setCanvasSize(width > 0 ? width : this.width, height > 0 ? height : this.height);
    return this;
  };

  var SetPadding = function SetPadding(key, value) {
    var padding = this.padding;
    var paddingLeft = padding.left,
      paddingRight = padding.right,
      paddingTop = padding.top,
      paddingBottom = padding.bottom;
    SetPadding$1(padding, key, value);
    this.dirty = this.dirty || paddingLeft != padding.left || paddingRight != padding.right || paddingTop != padding.top || paddingBottom != padding.bottom;
    return this;
  };

  var GetPadding = function GetPadding(key) {
    return GetPadding$1(this.padding, key);
  };

  var ModifyTextStyle = function ModifyTextStyle(style) {
    this.textStyle.modify(style);
    return this;
  };

  var ModifyDefaultTextStyle = function ModifyDefaultTextStyle(style) {
    this.defaultTextStyle.modify(style);
    return this;
  };

  var ResetTextStyle = function ResetTextStyle() {
    this.textStyle.copyFrom(this.defaultTextStyle);
    return this;
  };

  var SetTestString = function SetTestString(testString) {
    this.testString = testString;
    return this;
  };

  var RemoveItem$2 = Phaser.Utils.Array.Remove;
  var RemoveChild = function RemoveChild(child) {
    this.poolManager.free(child);
    RemoveItem$2(this.children, child);
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
  };

  var RemoveChildren = function RemoveChildren() {
    this.poolManager.freeMultiple(this.children);
    this.children.length = 0;
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
  };

  var RemoveItem$1 = Phaser.Utils.Array.Remove;
  var PopChild = function PopChild(child) {
    RemoveItem$1(this.children, child);
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
  };

  var ClearContent = function ClearContent() {
    this.setText();
    return this;
  };

  // const RemoveItem = Phaser.Utils.Array.Remove;

  var AddChild = function AddChild(child, index) {
    var areChildren = Array.isArray(child);

    // Remove existed child(s)
    // RemoveItem(this.children, child);

    if (index === undefined || index === this.children.length) {
      if (areChildren) {
        var _this$children;
        (_this$children = this.children).push.apply(_this$children, _toConsumableArray(child));
      } else {
        this.children.push(child);
      }
    } else {
      if (areChildren) {
        var _this$children2;
        (_this$children2 = this.children).splice.apply(_this$children2, [index, 0].concat(_toConsumableArray(child)));
      } else {
        this.children.splice(index, 0, child);
      }
    }
    this.lastAppendedChildren.length = 0;
    if (areChildren) {
      var _this$lastAppendedChi;
      (_this$lastAppendedChi = this.lastAppendedChildren).push.apply(_this$lastAppendedChi, _toConsumableArray(child));
    } else {
      this.lastAppendedChildren.push(child);
    }
    return this;
  };

  var CharTypeName = 'text';
  var ImageTypeName = 'image';
  var DrawerTypeName = 'drawer';
  var SpaceTypeName = 'space';
  var CmdTypeName = 'command';
  var IsNewLineChar = function IsNewLineChar(bob) {
    return bob.type === CharTypeName && bob.text === '\n';
  };
  var IsPageBreakChar = function IsPageBreakChar(bob) {
    return bob.type === CharTypeName && bob.text === '\f';
  };
  var IsChar = function IsChar(bob) {
    return bob.type === CharTypeName;
  };

  var CharData = /*#__PURE__*/function (_RenderBase) {
    _inherits(CharData, _RenderBase);
    function CharData(parent, text, style) {
      var _this;
      _classCallCheck(this, CharData);
      _this = _callSuper(this, CharData, [parent, CharTypeName]);
      _this.updateTextFlag = false;
      _this.style = new TextStyle(_assertThisInitialized(_this), style);
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
      set: function set(value) {
        if (this.style) {
          this.style.offsetX = value;
        }
      }
    }, {
      key: "offsetY",
      get: function get() {
        return this.style.offsetY;
      },
      set: function set(value) {
        if (this.style) {
          this.style.offsetY = value;
        }
      }
    }, {
      key: "leftSpace",
      get: function get() {
        return this.style.leftSpace * this.scaleX;
      },
      set: function set(value) {
        if (this.style) {
          this.style.leftSpace = value;
        }
        _set(_getPrototypeOf(CharData.prototype), "leftSpace", value, this, true);
      }
    }, {
      key: "rightSpace",
      get: function get() {
        return this.style.rightSpace * this.scaleX;
      },
      set: function set(value) {
        if (this.style) {
          this.style.rightSpace = value;
        }
        _set(_getPrototypeOf(CharData.prototype), "rightSpace", value, this, true);
      }
    }, {
      key: "align",
      get: function get() {
        return this.style.align;
      },
      set: function set(value) {
        if (this.style) {
          this.style.align = value;
        }
      }
    }, {
      key: "modifyStyle",
      value: function modifyStyle(style) {
        this.setDirty(true);
        this.style.modify(style);
        if (this.updateTextFlag) {
          this.updateTextSize();
        }
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
        var text = this.text;
        // Is new-line, page-break, or empty character
        if (text === '\n' || text === '\f' || text === '') {
          this.clearTextSize();
        } else {
          var metrics = this.style.getTextMetrics(this.context, this.text);
          this.textWidth = metrics.width;
          var ascent, descent;
          if ('actualBoundingBoxAscent' in metrics) {
            ascent = metrics.actualBoundingBoxAscent;
            descent = metrics.actualBoundingBoxDescent;
          } else {
            ascent = 0;
            descent = 0;
          }
          this.textHeight = ascent + descent;
          this.ascent = ascent;
          this.descent = descent;
        }
        this.updateTextFlag = false;
        return this;
      }
    }, {
      key: "clearTextSize",
      value: function clearTextSize() {
        this.textWidth = 0;
        this.textHeight = 0;
        this.ascent = 0;
        this.descent = 0;
        return this;
      }
    }, {
      key: "copyTextSize",
      value: function copyTextSize(child) {
        this.textWidth = child.textWidth;
        this.textHeight = child.textHeight;
        this.ascent = child.ascent;
        this.descent = child.descent;
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
      key: "willRender",
      get: function get() {
        if (this.textWidth === 0) {
          return false;
        }
        return _get(_getPrototypeOf(CharData.prototype), "willRender", this);
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var context = this.context;
        var textStyle = this.style;
        if (textStyle.hasBackgroundColor) {
          context.fillStyle = textStyle.backgroundColor;
          var x = this.drawTLX;
          var width = this.drawTRX - x;
          var bottomY = textStyle.backgroundBottomY;
          if (bottomY == null) {
            bottomY = this.drawBLY;
          }
          var height = textStyle.backgroundHeight;
          if (height == null) {
            height = bottomY - this.drawTLY;
          }
          var y = bottomY - height;
          context.fillRect(x, y, width, height);
        }
        var hasFill = textStyle.hasFill,
          hasStroke = textStyle.hasStroke;
        if (!hasFill && !hasStroke) {
          return;
        }
        textStyle.syncFont(context).syncStyle(context);
        // textBaseline = 'alphabetic'

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
      key: "drawTLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return -this.ascent;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return this.descent;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return this.textWidth + this.rightSpace;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return -this.ascent;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return this.textWidth + this.rightSpace;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return this.descent;
      }
    }]);
    return CharData;
  }(RenderBase);

  var CreateCharChild = function CreateCharChild(text, style) {
    if (style) {
      this.textStyle.modify(style);
    }
    var child = this.poolManager.allocate(CharTypeName);
    if (child === null) {
      child = new CharData(this,
      // parent
      text,
      // text
      this.textStyle) // style
      ;
    } else {
      child.setParent(this).setActive().modifyStyle(this.textStyle).setText(text);
    }
    return child;
  };

  var CreateCharChildren = function CreateCharChildren(text, style) {
    if (style) {
      this.textStyle.modify(style);
    }
    var children = [];
    for (var i = 0, cnt = text.length; i < cnt; i++) {
      var _char = text.charAt(i);
      var child = this.poolManager.allocate(CharTypeName);
      if (child === null) {
        child = new CharData(this,
        // parent
        _char,
        // text
        this.textStyle) // style
        ;
      } else {
        child.setParent(this).setActive().modifyStyle(this.textStyle).setText(_char);
      }
      // child.modifyPorperties(properties);  // Warning: Will modify text-style twice

      children.push(child);
    }
    return children;
  };

  var AppendText = function AppendText(text, style) {
    var children = this.createCharChildren(text, style);
    this.addChild(children);
    return this;
  };

  var SetText$1 = function SetText(text, style) {
    if (text === undefined) {
      text = '';
    }
    this.removeChildren();
    AppendText.call(this, text, style); // this.appendText might be override

    this.dirty = true;
    return this;
  };

  var InsertText = function InsertText(index, text, style) {
    var children = this.createCharChildren(text, style);
    index = this.getCharChildIndex(index, true);
    this.addChild(children, index);
    return this;
  };

  var RemoveText = function RemoveText(index, length) {
    if (length === undefined) {
      length = 1;
    }
    for (var i = 0; i < length; i++) {
      var childIndex = this.getCharChildIndex(index, true);
      if (childIndex === undefined) {
        break;
      }
      this.removeChild(this.children[childIndex]);
    }
    return this;
  };

  var GetText = function GetText(activeOnly) {
    var text = '';
    this.forEachCharChild(function (child) {
      text += child.text;
    }, undefined, activeOnly);
    return text;
  };

  var CanvasPool = Phaser.Display.Canvas.CanvasPool;
  var DrawFrameToCanvas = function DrawFrameToCanvas(frame, canvas, x, y, width, height, color, autoRound) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (width === undefined) {
      width = frame.cutWidth;
    }
    if (height === undefined) {
      height = frame.cutHeight;
    }
    if (autoRound === undefined) {
      autoRound = false;
    }
    if (autoRound) {
      x = Math.round(x);
      y = Math.round(y);
    }
    var context = canvas.getContext('2d', {
      willReadFrequently: true
    });
    if (color) {
      // Draw image at tempCanvas

      // Get tempCanvas
      var tempCanvas = CanvasPool.create(null, width, height, Phaser.CANVAS, true);
      var tempContext = tempCanvas.getContext('2d', {
        willReadFrequently: true
      });
      tempContext.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight, 0, 0, width, height);

      // Tint-fill
      tempContext.globalCompositeOperation = 'source-in';
      tempContext.fillStyle = color;
      tempContext.fillRect(0, 0, width, height);

      // Draw tempCanvas at context
      context.drawImage(tempCanvas, 0, 0, width, height, x, y, width, height);

      // Release tempCanvas
      CanvasPool.remove(tempCanvas);
    } else {
      context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight, x, y, width, height);
    }
  };

  Phaser.Display.Canvas.CanvasPool;
  var ImageData = /*#__PURE__*/function (_RenderBase) {
    _inherits(ImageData, _RenderBase);
    function ImageData(parent, key, frame) {
      var _this;
      _classCallCheck(this, ImageData);
      _this = _callSuper(this, ImageData, [parent, ImageTypeName]);
      _this.setTexture(key, frame);
      _this.color = undefined;
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
        this.frameObj = this.scene.sys.textures.getFrame(key, frame);
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
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color);
        }
        _get(_getPrototypeOf(ImageData.prototype), "modifyPorperties", this).call(this, o);
        return this;
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        DrawFrameToCanvas(this.frameObj, this.canvas, 0, 0, this.frameWidth, this.frameHeight, this.color, false);
      }
    }, {
      key: "drawTLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return this.frameHeight;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return this.frameWidth + this.rightSpace;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return this.frameWidth + this.rightSpace;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return this.frameHeight;
      }
    }]);
    return ImageData;
  }(RenderBase);

  var CreateImageChild = function CreateImageChild(key, frame, properties) {
    var child = this.poolManager.allocate(ImageTypeName);
    if (child === null) {
      child = new ImageData(this,
      // parent
      key, frame);
    } else {
      child.setParent(this).setActive().setTexture(key, frame);
    }
    child.modifyPorperties(properties);
    return child;
  };

  var AppendImage = function AppendImage(key, frame, properties) {
    var child = this.createImageChild(key, frame, properties);
    this.addChild(child);
    return this;
  };

  var Drawer = /*#__PURE__*/function (_RenderBase) {
    _inherits(Drawer, _RenderBase);
    function Drawer(parent, renderCallback, width, height) {
      var _this;
      _classCallCheck(this, Drawer);
      _this = _callSuper(this, Drawer, [parent, DrawerTypeName]);
      _this.setRenderCallback(renderCallback);
      _this.setDrawerSize(width, height);
      return _this;
    }
    _createClass(Drawer, [{
      key: "setRenderCallback",
      value: function setRenderCallback(callback) {
        if (callback) {
          this.renderContent = callback.bind(this);
        } else {
          delete this.renderContent;
        }
        return this;
      }
    }, {
      key: "setDrawerSize",
      value: function setDrawerSize(width, height) {
        // Whole canvas
        if (width === true) {
          this.toLocalPosition = false;
          width = undefined;
          height = undefined;
        } else {
          this.toLocalPosition = true;
        }
        if (width === undefined) {
          width = 0;
        }
        if (height === undefined) {
          height = width;
        }
        this.drawerWidth = width;
        this.drawerHeight = height;
        return this;
      }
    }, {
      key: "onFree",
      value: function onFree() {
        _get(_getPrototypeOf(Drawer.prototype), "onFree", this).call(this);
        this.setRenderCallback();
      }
    }, {
      key: "width",
      get: function get() {
        return this.drawerWidth * this.scaleX;
      },
      set: function set(value) {
        this.setDirty(this.width !== value);
        this.scaleX = this.drawerWidth > 0 ? value / this.drawerWidth : 1;
      }
    }, {
      key: "height",
      get: function get() {
        return this.drawerHeight * this.scaleY;
      },
      set: function set(value) {
        this.setDirty(this.height !== value);
        this.scaleY = this.drawerHeight > 0 ? value / this.drawerHeight : 1;
      }
    }, {
      key: "offsetY",
      get: function get() {
        return -this.height;
      },
      set: function set(value) {}
    }, {
      key: "drawTLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return this.drawerHeight;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return this.drawerWidth + this.rightSpace;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return this.drawerWidth + this.rightSpace;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return this.drawerHeight;
      }
    }]);
    return Drawer;
  }(RenderBase);

  var CreateDrawerChild = function CreateDrawerChild(renderCallback, width, height) {
    var child = this.poolManager.allocate(DrawerTypeName);
    if (child === null) {
      child = new Drawer(this,
      // parent
      renderCallback, width, height);
    } else {
      child.setParent(this).setActive().setRenderCallback(renderCallback).setDrawerSize(width, height);
    }
    return child;
  };

  var AppendDrawer = function AppendDrawer(renderCallback, width, height) {
    var child = this.createDrawerChild(renderCallback, width, height);
    this.addChild(child);
    return this;
  };

  var Space = /*#__PURE__*/function (_RenderBase) {
    _inherits(Space, _RenderBase);
    function Space(parent, width) {
      var _this;
      _classCallCheck(this, Space);
      _this = _callSuper(this, Space, [parent, SpaceTypeName]);
      _this.setSpaceWidth(width);
      return _this;
    }
    _createClass(Space, [{
      key: "width",
      get: function get() {
        return this.spaceWidth * this.scaleX;
      },
      set: function set(value) {
        if (this.spaceWidth > 0) {
          this.scaleX = value / this.spaceWidth;
        } else {
          this.scaleX = 1;
        }
      }
    }, {
      key: "setSpaceWidth",
      value: function setSpaceWidth(width) {
        this.spaceWidth = width;
        return this;
      }
    }]);
    return Space;
  }(RenderBase);

  var CreateSpaceChild = function CreateSpaceChild(width) {
    var child = this.poolManager.allocate(SpaceTypeName);
    if (child === null) {
      child = new Space(this,
      // parent
      width);
    } else {
      child.setParent(this).setActive().setSpaceWidth(width);
    }
    return child;
  };

  var AppendSpace = function AppendSpace(width) {
    var child = this.createSpaceChild(width);
    this.addChild(child);
    return this;
  };

  var Command = /*#__PURE__*/function (_Base) {
    _inherits(Command, _Base);
    function Command(parent, name, callback, param, scope) {
      var _this;
      _classCallCheck(this, Command);
      _this = _callSuper(this, Command, [parent, CmdTypeName]);
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
      key: "onFree",
      value: function onFree() {
        _get(_getPrototypeOf(Command.prototype), "onFree", this).call(this);
        this.setName().setCallback().setParameter();
      }
    }]);
    return Command;
  }(Base);

  var CreateCommandChild = function CreateCommandChild(name, callback, param, scope) {
    var child = this.poolManager.allocate(CmdTypeName);
    if (child === null) {
      child = new Command(this,
      // parent
      name, callback, param, scope);
    } else {
      child.setParent(this).setActive().setName(name).setCallback(callback, scope).setParameter(param);
    }
    return child;
  };

  var AppendCommand = function AppendCommand(name, callback, param, scope) {
    var child = this.createCommandChild(name, callback, param, scope);
    this.addChild(child);
    return this;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * This is a slightly modified version of jQuery.isPlainObject.
   * A plain object is an object whose internal class property is [object Object].
   *
   * @function Phaser.Utils.Objects.IsPlainObject
   * @since 3.0.0
   *
   * @param {object} obj - The object to inspect.
   *
   * @return {boolean} `true` if the object is plain, otherwise `false`.
   */
  var IsPlainObject$2 = function IsPlainObject(obj) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (_typeof(obj) !== 'object' || obj.nodeType || obj === obj.window) {
      return false;
    }

    // Support: Firefox <20
    // The try/catch suppresses exceptions thrown when attempting to access
    // the "constructor" property of certain host objects, ie. |window.location|
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try {
      if (obj.constructor && !{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
    } catch (e) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  };

  var DeepClone = function DeepClone(inObject) {
    var outObject;
    var value;
    var key;
    if (inObject == null || _typeof(inObject) !== 'object') {
      //  inObject is not an object
      return inObject;
    }

    //  Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
    if (IsPlainObject$2(inObject)) {
      for (key in inObject) {
        value = inObject[key];

        //  Recursively (deep) copy for nested objects, including arrays
        outObject[key] = DeepClone(value);
      }
    } else {
      outObject = inObject;
    }
    return outObject;
  };

  var SetWrapConfig = function SetWrapConfig(config) {
    if (config === undefined) {
      config = {};
    } else if (_typeof(config) === 'object') {
      config = DeepClone(config);
    }
    this.wrapConfig = config;
    return this;
  };

  var CreateWrapResultData = function CreateWrapResultData(config) {
    var data = {
      callback: undefined,
      start: 0,
      // Next start index
      isLastPage: false,
      // Is last page
      maxLines: undefined,
      padding: undefined,
      letterSpacing: undefined,
      hAlign: undefined,
      vAlign: undefined,
      children: [],
      // Wrap result
      lines: [],
      // Wrap result in lines

      // WordWrap
      maxLineWidth: 0,
      linesHeight: 0,
      lineHeight: undefined,
      // VerticalWrap
      maxLineHeight: 0,
      linesWidth: 0,
      lineWidth: undefined
    };
    return Object.assign(data, config);
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
      // Can't render (command child), put into output directly
      if (!child.renderable) {
        word.push(child);
        currentIndex++;
        continue;
      }
      var text = child.type === CharTypeName ? child.text : null;
      if (text !== null && text !== ' ' && text !== '\n' && text !== '\f') {
        word.push(child);
        wordWidth += child.outerWidth;
        currentIndex++;
        // Continue
      } else {
        // Get image child, a space, a new-line, or page-break
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

  var GetChildrenAlign = function GetChildrenAlign(children) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (child.align !== undefined) {
        return child.align;
      }
    }
    return undefined;
  };

  var OffsetChildren = function OffsetChildren(children, offsetX, offsetY) {
    if (offsetX === 0 && offsetY === 0) {
      return;
    }
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.renderable) {
        continue;
      }
      child.x += offsetX;
      child.y += offsetY;
    }
  };

  var AlignLines$1 = function AlignLines(result, width, height) {
    var hAlign = result.hAlign,
      vAlign = result.vAlign;
    var offsetX, offsetY;
    var linesHeight = result.linesHeight;
    switch (vAlign) {
      case 1: // center
      case 'center':
        offsetY = (height - linesHeight) / 2;
        break;
      case 2: // bottom
      case 'bottom':
        offsetY = height - linesHeight;
        break;
      default:
        offsetY = 0;
        break;
    }
    var lines = result.lines;
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
      var line = lines[li];
      var lineWidth = line.width,
        children = line.children;
      var lineHAlign = GetChildrenAlign(children);
      if (lineHAlign === undefined) {
        lineHAlign = hAlign;
      }
      switch (lineHAlign) {
        case 1: // center
        case 'center':
          offsetX = (width - lineWidth) / 2;
          break;
        case 2: // right
        case 'right':
          offsetX = width - lineWidth;
          break;
        default:
          offsetX = 0;
          break;
      }
      OffsetChildren(children, offsetX, offsetY);
    }
  };

  var GetDefaultTextHeight = function GetDefaultTextHeight() {
    var metrics = this.defaultTextStyle.getTextMetrics(this.context, this.testString);
    var ascent, descent;
    if ('actualBoundingBoxAscent' in metrics) {
      ascent = metrics.actualBoundingBoxAscent;
      descent = metrics.actualBoundingBoxDescent;
    } else {
      ascent = 0;
      descent = 0;
    }
    Result.ascent = ascent;
    Result.descent = descent;
    Result.height = ascent + descent;
    return Result;
  };
  var Result = {};

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var RunWordWrap$1 = function RunWordWrap(config) {
    // Parse parameters
    var startIndex = GetValue$9(config, 'start', 0);
    SetPadding$1(this.wrapPadding, GetValue$9(config, 'padding', 0));
    var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
    var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

    // Get lineHeight, maxLines
    var lineHeight = GetValue$9(config, 'lineHeight');
    var ascent = GetValue$9(config, 'ascent', lineHeight);
    var maxLines;
    if (lineHeight === undefined) {
      // Calculate lineHeight
      var useDefaultTextHeight = GetValue$9(config, 'useDefaultTextHeight', false);
      maxLines = GetValue$9(config, 'maxLines', 0);
      if (this.fixedHeight > 0 && !useDefaultTextHeight) {
        var innerHeight = this.fixedHeight - paddingVertical;
        if (maxLines > 0) {
          // Calculate lineHeight via maxLines, in fixedHeight mode
          lineHeight = innerHeight / maxLines;
        } else {
          var textHeightResult = GetDefaultTextHeight.call(this);
          lineHeight = textHeightResult.height;
          ascent = textHeightResult.ascent;
          // Calculate maxLines via (ascent, lineHeight), in fixedHeight mode
          maxLines = Math.floor((innerHeight - ascent) / lineHeight);
        }
      } else {
        var textHeightResult = GetDefaultTextHeight.call(this);
        lineHeight = textHeightResult.height;
        ascent = textHeightResult.ascent;
      }
    } else {
      // Calculate maxLines
      if (this.fixedHeight > 0) {
        // Calculate maxLines via lineHeight, in fixedHeight mode
        maxLines = GetValue$9(config, 'maxLines');
        if (maxLines === undefined) {
          var innerHeight = this.fixedHeight - paddingVertical;
          maxLines = Math.floor(innerHeight / lineHeight);
        }
      } else {
        maxLines = GetValue$9(config, 'maxLines', 0); // Default is show all lines
      }
    }

    // If ascent is undefined, assign to lineHeight
    if (ascent === undefined) {
      ascent = lineHeight;
    }
    var showAllLines = maxLines === 0;

    // Get wrapWidth
    var wrapWidth = GetValue$9(config, 'wrapWidth', undefined);
    if (wrapWidth === undefined) {
      if (this.fixedWidth > 0) {
        wrapWidth = this.fixedWidth - paddingHorizontal;
      } else {
        wrapWidth = Infinity; // No word-wrap
      }
    }
    var letterSpacing = GetValue$9(config, 'letterSpacing', 0);
    var hAlign = GetValue$9(config, 'hAlign', 0);
    var vAlign = GetValue$9(config, 'vAlign', 0);
    var charWrap = GetValue$9(config, 'charWrap', false);
    var result = CreateWrapResultData({
      // Override properties
      callback: 'runWordWrap',
      start: startIndex,
      // Next start index
      padding: this.wrapPadding,
      letterSpacing: letterSpacing,
      maxLines: maxLines,
      hAlign: hAlign,
      vAlign: vAlign,
      // Specific properties
      ascent: ascent,
      lineHeight: lineHeight,
      wrapWidth: wrapWidth,
      charWrap: charWrap
    });

    // Set all children to inactive
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      children[i].setActive(false);
    }

    // Layout children
    wrapWidth += letterSpacing;
    var startX = this.padding.left + this.wrapPadding.left,
      startY = this.padding.top + this.wrapPadding.top + ascent,
      // Start(baseline) from ascent, not 0
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
    var isPageBreakChar = false;
    while (childIndex < lastChildIndex) {
      wordResult = GetWord(children, childIndex, charWrap, wordResult);
      var word = wordResult.word;
      var charCnt = word.length;
      var wordWidth = wordResult.width + charCnt * letterSpacing;
      childIndex += charCnt;
      // Next line
      var isNewLineChar = IsNewLineChar(word[0]);
      isPageBreakChar = IsPageBreakChar(word[0]);
      var isControlChar = isNewLineChar || isPageBreakChar;
      if (remainderWidth < wordWidth || isControlChar) {
        // Add to result
        if (isControlChar) {
          var _char = word[0];
          _char.setActive().setPosition(x, y);
          resultChildren.push(_char);
          lastLine.push(_char);
        }

        // Move cursor
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
        var isPageEnd = isPageBreakChar || !showAllLines && resultLines.length === maxLines; // Exceed maxLines
        if (isPageEnd) {
          break;
        } else if (isControlChar) {
          // Already add to result
          continue;
        }
      }
      remainderWidth -= wordWidth;
      lastLineWidth += wordWidth;
      for (var i = 0, cnt = word.length; i < cnt; i++) {
        var child = word[i];
        child.setActive();
        resultChildren.push(child);
        lastLine.push(child);
        if (child.renderable) {
          child.setPosition(x, y);
          x += child.outerWidth + letterSpacing;
        }
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
    result.isLastPage = !isPageBreakChar && result.start === lastChildIndex;
    result.maxLineWidth = maxLineWidth;
    result.linesHeight = resultLines.length * lineHeight;

    // Calculate size of game object
    var width = this.fixedWidth > 0 ? this.fixedWidth : result.maxLineWidth + paddingHorizontal;
    var height = this.fixedHeight > 0 ? this.fixedHeight : result.linesHeight + paddingVertical;

    // Size might be changed after wrapping
    var innerWidth = width - paddingHorizontal;
    var innerHeight = height - paddingVertical;
    AlignLines$1(result, innerWidth, innerHeight);

    // Resize
    this.setCanvasSize(width, height);

    // Set initial position
    for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
      var child = resultChildren[i];
      if (!child.renderable) {
        continue;
      }
      child.x0 = child.x;
      child.y0 = child.y;
    }
    return result;
  };

  var Merge$1 = Phaser.Utils.Objects.Merge;
  var RunWordWrap = function RunWordWrap(config) {
    if (config === undefined) {
      config = {};
    }
    return RunWordWrap$1.call(this, Merge$1(config, this.wrapConfig));
  };

  var AlignLines = function AlignLines(result, width, height) {
    var hAlign = result.hAlign,
      vAlign = result.vAlign;
    var offsetX, offsetY;
    var rtl = result.rtl;
    var lines = result.lines,
      lineWidth = result.lineWidth,
      linesWidth = result.linesWidth;
    switch (hAlign) {
      case 1: // center
      case 'center':
        offsetX = (width - linesWidth) / 2;
        break;
      case 2: // right
      case 'right':
        offsetX = width - linesWidth;
        break;
      default:
        // left
        offsetX = 0;
        break;
    }
    if (rtl) {
      offsetX += lineWidth;
    }
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
      var line = lines[rtl ? lcnt - li - 1 : li];
      var children = line.children;
      var lineHeight = line.height;
      var lineVAlign = GetChildrenAlign(children);
      if (lineVAlign === undefined) {
        lineVAlign = vAlign;
      }
      switch (lineVAlign) {
        case 1: // center
        case 'center':
          offsetY = (height - lineHeight) / 2;
          break;
        case 2: // bottom
        case 'bottom':
          offsetY = height - lineHeight;
          break;
        default:
          // top
          offsetY = 0;
          break;
      }
      OffsetChildren(children, offsetX, offsetY);
      offsetX += lineWidth;
    }
  };

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var RunVerticalWrap$1 = function RunVerticalWrap(config) {
    // Parse parameters
    var startIndex = GetValue$8(config, 'start', 0);
    SetPadding$1(this.wrapPadding, GetValue$8(config, 'padding', 0));
    var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
    var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
    var lineWidth = GetValue$8(config, 'lineWidth', undefined);
    var maxLines;
    if (lineWidth === undefined) {
      // Calculate lineWidth via maxLines, in fixedWidth mode
      maxLines = GetValue$8(config, 'maxLines', 0);
      if (this.fixedWidth > 0) {
        var innerWidth = this.fixedWidth - paddingHorizontal;
        lineWidth = innerWidth / maxLines;
      } else {
        lineWidth = 0;
      }
    } else {
      if (this.fixedWidth > 0) {
        // Calculate maxLines via lineWidth, in fixedWidth mode
        maxLines = GetValue$8(config, 'maxLines', undefined);
        if (maxLines === undefined) {
          var innerWidth = this.fixedWidth - paddingHorizontal;
          maxLines = Math.floor(innerWidth / lineWidth) + 1;
        }
      } else {
        maxLines = GetValue$8(config, 'maxLines', 0); // Default is show all lines
      }
    }
    var showAllLines = maxLines === 0;

    // Get fixedCharacterHeight
    var fixedCharacterHeight = GetValue$8(config, 'fixedCharacterHeight', undefined);
    if (fixedCharacterHeight === undefined) {
      var charPerLine = GetValue$8(config, 'charPerLine', undefined);
      if (charPerLine !== undefined) {
        var innerHeight = this.fixedHeight - paddingVertical;
        fixedCharacterHeight = Math.floor(innerHeight / charPerLine);
      }
    }

    // Get wrapHeight
    var wrapHeight = GetValue$8(config, 'wrapHeight', undefined);
    if (wrapHeight === undefined) {
      if (this.fixedHeight > 0) {
        wrapHeight = this.fixedHeight - paddingVertical;
      } else {
        wrapHeight = Infinity; // No word-wrap
      }
    }
    var letterSpacing = GetValue$8(config, 'letterSpacing', 0);
    var rtl = GetValue$8(config, 'rtl', true);
    var hAlign = GetValue$8(config, 'hAlign', rtl ? 2 : 0);
    var vAlign = GetValue$8(config, 'vAlign', 0);
    var result = CreateWrapResultData({
      // Override properties
      callback: 'runVerticalWrap',
      start: startIndex,
      // Next start index
      padding: this.wrapPadding,
      letterSpacing: letterSpacing,
      maxLines: maxLines,
      hAlign: hAlign,
      vAlign: vAlign,
      // Specific properties
      lineWidth: lineWidth,
      fixedCharacterHeight: fixedCharacterHeight,
      wrapHeight: wrapHeight,
      rtl: rtl
    });

    // Set all children to active
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      children[i].setActive(false);
    }

    // Layout children
    wrapHeight += letterSpacing;
    var startX = this.padding.left + this.wrapPadding.left,
      // Reset x of each character in AlignLines method
      startY = this.padding.top + this.wrapPadding.top,
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
      var child = children[childIndex];
      childIndex++;
      if (!child.renderable) {
        child.setActive();
        resultChildren.push(child);
        lastLine.push(child);
        continue;
      }
      var childHeight = (fixedCharacterHeight !== undefined ? fixedCharacterHeight : child.height) + letterSpacing;
      // Next line
      var isNewLineChar = IsNewLineChar(child);
      var isPageBreakChar = IsPageBreakChar(child);
      var isControlChar = isNewLineChar || isPageBreakChar;
      if (remainderHeight < childHeight || isControlChar) {
        // Add to result
        if (isNewLineChar) {
          child.setActive().setPosition(x, y).setOrigin(0.5);
          resultChildren.push(child);
          lastLine.push(child);
        }

        // Move cursor
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
        var isPageEnd = isPageBreakChar || !showAllLines && resultLines.length === maxLines; // Exceed maxLines
        if (isPageEnd) {
          break;
        } else if (isControlChar) {
          // Already add to result                
          continue;
        }
      }
      remainderHeight -= childHeight;
      lastLineHeight += childHeight;
      child.setActive().setPosition(x, y).setOrigin(0.5);
      resultChildren.push(child);
      lastLine.push(child);
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
    result.linesWidth = resultLines.length * lineWidth;

    // Calculate size of game object
    var width = this.fixedWidth > 0 ? this.fixedWidth : result.linesWidth + paddingHorizontal;
    var height = this.fixedHeight > 0 ? this.fixedHeight : result.maxLineHeight + paddingVertical;

    // Size might be changed after wrapping
    var innerWidth = width - paddingHorizontal;
    var innerHeight = height - paddingVertical;
    AlignLines(result, innerWidth, innerHeight);

    // Resize
    this.setCanvasSize(width, height);

    // Set initial position
    for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
      var child = resultChildren[i];
      if (!child.renderable) {
        continue;
      }
      child.x0 = child.x;
      child.y0 = child.y;
    }
    return result;
  };

  var Merge = Phaser.Utils.Objects.Merge;
  var RunVerticalWrap = function RunVerticalWrap(config) {
    if (config === undefined) {
      config = {};
    }
    return RunVerticalWrap$1.call(this, Merge(config, this.wrapConfig));
  };

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var RunWrap = function RunWrap(config) {
    var wrapCallback = GetValue$7(this.wrapConfig, 'callback');
    if (!wrapCallback) {
      wrapCallback = GetValue$7(config, 'callback', this.runWordWrap);
    }
    if (typeof wrapCallback === 'string') {
      wrapCallback = this[wrapCallback];
    }
    return wrapCallback.call(this, config);
  };

  var SetAlignMethods = {
    setVAlign: function setVAlign(align) {
      this.wrapConfig.vAlign = align;
      return this;
    },
    setHAlign: function setHAlign(align) {
      this.wrapConfig.hAlign = align;
      return this;
    }
  };

  var SetTextOXYMethods$1 = {
    setTextOX: function setTextOX(ox) {
      if (ox === this._textOX) {
        return this;
      }
      this._textOX = ox;
      return this;
    },
    setTextOY: function setTextOY(oy) {
      if (oy === this._textOY) {
        return this;
      }
      this._textOY = oy;
      return this;
    },
    setTextOXY: function setTextOXY(ox, oy) {
      if (ox === this._textOX && oy === this._textOY) {
        return;
      }
      this._textOX = ox;
      this._textOY = oy;
      return this;
    },
    addTextOX: function addTextOX(incX) {
      this.setTextOX(this._textOX + incX);
      return this;
    },
    addTextOY: function addTextOY(incY) {
      this.setTextOY(this._textOY + incY);
      return this;
    },
    addTextOXY: function addTextOXY(incX, incY) {
      this.setTextOXY(this._textOX + incX, this._textOY + incY);
      return this;
    }
  };

  var RenderContent = function RenderContent() {
    this.clear();
    this.setCanvasSize(this.width, this.height);
    if (this.background.active) {
      this.background.render();
    }
    var child;
    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
      child = this.children[i];
      if (child.active) {
        child.render();
      }
    }
    if (this.innerBounds.active) {
      this.innerBounds.render();
    }
  };

  var ForEachChild = function ForEachChild(callback, scope, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    var childIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      var isBreak;
      if (scope) {
        isBreak = callback.call(this, child, childIndex, children);
      } else {
        isBreak = callback(child, childIndex, children);
      }
      childIndex++;
      if (isBreak) {
        break;
      }
    }
    return this;
  };

  var ForEachRenderableChild = function ForEachRenderableChild(callback, scope, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    var childIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (child.renderable && !child.removed) {
        var isBreak;
        if (scope) {
          isBreak = callback.call(this, child, childIndex, children);
        } else {
          isBreak = callback(child, childIndex, children);
        }
        childIndex++;
        if (isBreak) {
          break;
        }
      }
    }
    return this;
  };

  var ForEachCharChild = function ForEachCharChild(callback, scope, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    var charIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        var isBreak;
        if (scope) {
          isBreak = callback.call(this, child, charIndex, children);
        } else {
          isBreak = callback(child, charIndex, children);
        }
        charIndex++;
        if (isBreak) {
          break;
        }
      }
    }
    return this;
  };

  var GetChildren = function GetChildren() {
    return this.children;
  };

  var GetAll = Phaser.Utils.Array.GetAll;
  var GetActiveChildren = function GetActiveChildren() {
    return GetAll(this.children, 'active', true);
  };

  var GetCharChildren = function GetCharChildren(activeOnly, out) {
    if (out === undefined) {
      out = [];
    }
    this.forEachCharChild(function (child) {
      out.push(child);
    }, undefined, activeOnly);
    return out;
  };

  var GetLastAppendedChildren = function GetLastAppendedChildren() {
    return this.lastAppendedChildren;
  };

  var GetBobCenterPosition = function GetBobCenterPosition(bob, offsetX, offsetY, out) {
    if (typeof offsetX !== 'number') {
      out = offsetX;
      offsetX = 0;
      offsetY = 0;
    }
    var bobX = bob.drawCenterX + offsetX;
    var bobY = bob.drawCenterY + offsetY;
    return BobPositionToCanvasPosition(bob, bobX, bobY, out);
  };

  var GetDistance = Phaser.Math.Distance.BetweenPointsSquared;
  var GetNearestChild = function GetNearestChild(canvasX, canvasY) {
    var pointA = {
      x: canvasX,
      y: canvasY
    };
    var minDistance = Infinity;
    var nearestChild = null;
    this.forEachRenderableChild(function (child) {
      var distance = GetDistance(pointA, GetBobCenterPosition(child, true));
      if (minDistance > distance) {
        minDistance = distance;
        nearestChild = child;
      }
    });
    return nearestChild;
  };

  var GetCharWorldPosition = function GetCharWorldPosition(child, offsetX, offsetY, out) {
    if (typeof child === 'number') {
      child = this.getCharChild(child, true);
    }
    return GetBobWorldPosition(this, child, offsetX, offsetY, out);
  };

  var SetToMinSize = function SetToMinSize() {
    var children = this.children;
    var maxX = 0,
      maxY = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.renderable || !child.active || !child.visible) {
        continue;
      }
      var x0 = child.x0 !== undefined ? child.x0 : child.x;
      var y0 = child.y0 !== undefined ? child.y0 : child.y;
      maxX = Math.max(maxX, x0);
      maxY = Math.max(maxY, y0);
    }
    var width = maxX + this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
    var height = maxY + this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;

    // Ignore fixedWidth, and fixedHeight
    if (this.width !== width || this.height !== height) {
      this.dirty = true;
      this.setCanvasSize(width, height);
    }
    return this;
  };

  var GetCharChildIndex = function GetCharChildIndex(charIndex, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        if (charIndex === 0) {
          return i;
        } else {
          charIndex--;
        }
      }
    }
    return undefined;
  };

  var GetCharChild = function GetCharChild(charIndex, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        if (charIndex === 0) {
          return child;
        } else {
          charIndex--;
        }
      }
    }
    return undefined;
  };

  var GetCharIndex = function GetCharIndex(childIndex, activeOnly) {
    if (typeof childIndex !== 'number') {
      childIndex = this.children.indexOf(childIndex);
      if (childIndex < 0) {
        return null;
      }
    }
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    if (childIndex >= children.length) {
      childIndex = children.length;
    }
    var charIndex = 0;
    for (var i = 0; i < childIndex; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        charIndex++;
      }
    }
    return charIndex;
  };

  var SetChildrenInteractiveEnable = function SetChildrenInteractiveEnable(enable) {
    if (enable === undefined) {
      enable = true;
    }
    if (this.childrenInteractiveEnable !== enable) {
      this.lastOverChild = null;
    }
    this.childrenInteractiveEnable = enable;
    return this;
  };

  var GetFirstChildContains = function GetFirstChildContains(children, x, y) {
    var children = children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.active || !child.renderable) {
        continue;
      }
      if (child.contains(x, y)) {
        return child;
      }
    }
    return null;
  };

  var SetChildrenInteractive = function SetChildrenInteractive() {
    this.on('pointerdown', OnPointerDown, this).on('pointerdown', OnPointerUp, this).on('pointermove', OnPointOverOut, this).on('pointerover', OnPointOverOut, this).on('pointerout', function (pointer, event) {
      OnPointOverOut.call(this, pointer, null, null, event);
    }, this);
    return this;
  };
  var OnPointerDown = function OnPointerDown(pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
      return;
    }
    var child = GetFirstChildContains(this.children, localX, localY);
    if (!child) {
      return;
    }
    this.emit('child.pointerdown', child, pointer, localX, localY, event);
  };
  var OnPointerUp = function OnPointerUp(pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
      return;
    }
    var child = GetFirstChildContains(this.children, localX, localY);
    if (!child) {
      return;
    }
    this.emit('child.pointerup', child, pointer, localX, localY, event);
  };
  var OnPointOverOut = function OnPointOverOut(pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
      return;
    }
    if (localX === null) {
      // Case of pointerout
      if (this.lastOverChild !== null) {
        this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
        this.lastOverChild = null;
      }
      return;
    }
    var child = GetFirstChildContains(this.children, localX, localY);
    if (child === this.lastOverChild) {
      return;
    }
    if (this.lastOverChild !== null) {
      this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
    }
    if (child !== null) {
      this.emit('child.pointerover', child, pointer, localX, localY, event);
    }
    this.lastOverChild = child;
  };

  var GameObject = Phaser.GameObjects.GameObject;
  var SetInteractive = function SetInteractive(hitArea, hitAreaCallback, dropZone) {
    var isInteractived = !!this.input;
    GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);
    if (!isInteractived) {
      SetChildrenInteractive.call(this);
    }
    return this;
  };

  var BringToTop = Phaser.Utils.Array.BringToTop;
  var SendToBack = Phaser.Utils.Array.SendToBack;
  var MoveUp = Phaser.Utils.Array.MoveUp;
  var MoveDown = Phaser.Utils.Array.MoveDown;
  var MoveAbove = Phaser.Utils.Array.MoveAbove;
  var MoveBelow = Phaser.Utils.Array.MoveBelow;
  var MoveChildMethods = {
    moveChildToFist: function moveChildToFist(child) {
      SendToBack(this.children, child);
      return this;
    },
    moveChildToLast: function moveChildToLast(child) {
      BringToTop(this.children, child);
      return this;
    },
    movechildUp: function movechildUp(child) {
      MoveUp(this.children, child);
      return this;
    },
    movechildDown: function movechildDown(child) {
      MoveDown(this.children, child);
      return this;
    },
    movechildAbove: function movechildAbove(child, baseChild) {
      MoveAbove(this.children, child, baseChild);
      return this;
    },
    movechildBelow: function movechildBelow(child, baseChild) {
      MoveBelow(this.children, child, baseChild);
      return this;
    }
  };

  var BackgroundMethods = {
    setBackgroundColor: function setBackgroundColor(color, color2, isHorizontalGradient) {
      this.background.setColor(color, color2, isHorizontalGradient);
      return this;
    },
    setBackgroundStroke: function setBackgroundStroke(color, lineWidth) {
      this.background.setStroke(color, lineWidth);
      return this;
    },
    setBackgroundCornerRadius: function setBackgroundCornerRadius(radius, iteration) {
      this.background.setCornerRadius(radius, iteration);
      return this;
    }
  };

  var InnerBoundsMethods = {
    setInnerBoundsColor: function setInnerBoundsColor(color, color2, isHorizontalGradient) {
      this.innerBounds.setColor(color, color2, isHorizontalGradient);
      return this;
    },
    setInnerBoundsStroke: function setInnerBoundsStroke(color, lineWidth) {
      this.innerBounds.setStroke(color, lineWidth);
      return this;
    }
  };

  var Methods$1 = {
    setFixedSize: SetFixedSize,
    setPadding: SetPadding,
    getPadding: GetPadding,
    modifyTextStyle: ModifyTextStyle,
    modifyDefaultTextStyle: ModifyDefaultTextStyle,
    resetTextStyle: ResetTextStyle,
    setTestString: SetTestString,
    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    popChild: PopChild,
    clearContent: ClearContent,
    addChild: AddChild,
    createCharChild: CreateCharChild,
    createCharChildren: CreateCharChildren,
    setText: SetText$1,
    appendText: AppendText,
    insertText: InsertText,
    removeText: RemoveText,
    getText: GetText,
    createImageChild: CreateImageChild,
    appendImage: AppendImage,
    createDrawerChild: CreateDrawerChild,
    appendDrawer: AppendDrawer,
    createSpaceChild: CreateSpaceChild,
    appendSpace: AppendSpace,
    createCommandChild: CreateCommandChild,
    appendCommand: AppendCommand,
    setWrapConfig: SetWrapConfig,
    runWordWrap: RunWordWrap,
    runVerticalWrap: RunVerticalWrap,
    runWrap: RunWrap,
    renderContent: RenderContent,
    forEachChild: ForEachChild,
    forEachRenderableChild: ForEachRenderableChild,
    forEachCharChild: ForEachCharChild,
    getChildren: GetChildren,
    getActiveChildren: GetActiveChildren,
    getCharChildren: GetCharChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getNearestChild: GetNearestChild,
    getCharWorldPosition: GetCharWorldPosition,
    setToMinSize: SetToMinSize,
    getCharChildIndex: GetCharChildIndex,
    getCharChild: GetCharChild,
    getCharIndex: GetCharIndex,
    setChildrenInteractiveEnable: SetChildrenInteractiveEnable,
    setInteractive: SetInteractive
  };
  Object.assign(Methods$1, MoveChildMethods, BackgroundMethods, InnerBoundsMethods, SetAlignMethods, SetTextOXYMethods$1);

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
  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var DynamicText = /*#__PURE__*/function (_Canvas) {
    _inherits(DynamicText, _Canvas);
    function DynamicText(scene, x, y, fixedWidth, fixedHeight, config) {
      var _this;
      _classCallCheck(this, DynamicText);
      if (IsPlainObject$1(x)) {
        config = x;
        x = GetValue$6(config, 'x', 0);
        y = GetValue$6(config, 'y', 0);
        fixedWidth = GetValue$6(config, 'width', 0);
        fixedHeight = GetValue$6(config, 'height', 0);
      } else if (IsPlainObject$1(fixedWidth)) {
        config = fixedWidth;
        fixedWidth = GetValue$6(config, 'width', 0);
        fixedHeight = GetValue$6(config, 'height', 0);
      }
      var width = fixedWidth === 0 ? 1 : fixedWidth;
      var height = fixedHeight === 0 ? 1 : fixedHeight;
      _this = _callSuper(this, DynamicText, [scene, x, y, width, height]);
      _this.type = 'rexDynamicText';
      _this.autoRound = true;
      _this.padding = SetPadding$1();
      _this.wrapPadding = SetPadding$1();
      var textStyleConfig = GetValue$6(config, 'style', undefined);
      _this.defaultTextStyle = new TextStyle(null, textStyleConfig);
      _this.textStyle = _this.defaultTextStyle.clone();
      _this.setTestString(GetValue$6(config, 'testString', '|MÉqgy'));
      _this._textOX = 0;
      _this._textOY = 0;
      _this.background = new Background(_assertThisInitialized(_this), GetValue$6(config, 'background', undefined));
      _this.innerBounds = new InnerBounds(_assertThisInitialized(_this), GetValue$6(config, 'innerBounds', undefined));
      _this.children = [];
      _this.lastAppendedChildren = [];
      _this.lastOverChild = null;
      _this.poolManager = new PoolManager(config);
      _this.setFixedSize(fixedWidth, fixedHeight);
      _this.setPadding(GetValue$6(config, 'padding', 0));
      _this.setWrapConfig(GetValue$6(config, 'wrap', undefined));
      _this.setChildrenInteractiveEnable(GetValue$6(config, 'childrenInteractive', false));
      var text = GetValue$6(config, 'text', undefined);
      if (text) {
        _this.setText(text);
      }
      return _this;
    }
    _createClass(DynamicText, [{
      key: "updateTexture",
      value: function updateTexture() {
        this.renderContent();
        _get(_getPrototypeOf(DynamicText.prototype), "updateTexture", this).call(this);
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return this.getText(true);
      },
      set: function set(value) {
        this.setText(value);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.setFixedSize(width, height);
        return this;
      }
    }, {
      key: "textOX",
      get: function get() {
        return this._textOX;
      },
      set: function set(value) {
        this.setTextOX(value);
      }
    }, {
      key: "textOY",
      get: function get() {
        return this._textOY;
      },
      set: function set(value) {
        this.setTextOY(value);
      }
    }]);
    return DynamicText;
  }(Canvas);
  Object.assign(DynamicText.prototype, Methods$1);

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
    } else {
      return null;
    }
  };

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var GetGame = function GetGame(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsGame(object)) {
      return object;
    } else if (IsGame(object.game)) {
      return object.game;
    } else if (IsSceneObject(object)) {
      // object = scene object
      return object.sys.game;
    } else if (IsSceneObject(object.scene)) {
      // object = game object
      return object.scene.sys.game;
    }
  };

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$5(config, 'eventEmitter', true));

      // Register callback of parent destroy event, also see `shutdown` method
      if (this.parent) {
        if (this.parent === this.scene) {
          // parent is a scene
          this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent === this.game) {
          // parent is game
          this.game.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent.once) {
          // parent is game object or something else
          this.parent.once('destroy', this.onParentDestroy, this);
        }

        // bob object does not have event emitter
      }
    }
    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // parent might not be shutdown yet
        if (this.parent) {
          if (this.parent === this.scene) {
            // parent is a scene
            this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent === this.game) {
            // parent is game
            this.game.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent.once) {
            // parent is game object or something else
            this.parent.off('destroy', this.onParentDestroy, this);
          }

          // bob object does not have event emitter
        }
        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.game = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onEnvDestroy",
      value: function onEnvDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent; // gameObject, scene, or game

        this.scene = GetSceneObject(parent);
        this.game = GetGame(parent);
        return this;
      }
    }]);
    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var ElementProperties = {
    maxLength: ['maxLength', undefined],
    minLength: ['minLength', undefined],
    readOnly: ['readOnly', false]
  };
  var StyleProperties = {
    direction: ['direction', undefined]
  };

  var CopyProperty = function CopyProperty(from, to, key) {
    if (typeof key === 'string') {
      if (from.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    } else {
      var keys = key;
      if (Array.isArray(keys)) {
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
          CopyProperty(from, to, keys[i]);
        }
      } else {
        for (var key in keys) {
          CopyProperty(from, to, key);
        }
      }
    }
  };

  var CopyElementConfig = function CopyElementConfig(from) {
    if (from === undefined) {
      from = {};
    }
    var to = {};
    CopyProperty(from, to, 'inputType');
    CopyProperty(from, to, 'type');
    CopyProperty(from, to, 'style');
    CopyProperty(from, to, StyleProperties);
    CopyProperty(from, to, ElementProperties);
    return to;
  };

  var IsPointerInHitArea = function IsPointerInHitArea(gameObject, pointer, preTest, postTest) {
    if (pointer) {
      if (preTest && !preTest(gameObject, pointer)) {
        return false;
      }
      if (!HitTest(gameObject, pointer)) {
        return false;
      }
      if (postTest && !postTest(gameObject, pointer)) {
        return false;
      }
      return true;
    } else {
      var inputManager = gameObject.scene.input.manager;
      var pointersTotal = inputManager.pointersTotal;
      var pointers = inputManager.pointers,
        pointer;
      for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];
        if (preTest && !preTest(gameObject, pointer)) {
          continue;
        }
        if (!HitTest(gameObject, pointer)) {
          continue;
        }
        if (postTest && !postTest(gameObject, pointer)) {
          continue;
        }
        return true;
      }
      return false;
    }
  };
  var HitTest = function HitTest(gameObject, pointer) {
    var scene = gameObject.scene;
    var cameras = scene.input.cameras.getCamerasBelowPointer(pointer);
    var inputManager = scene.input.manager;
    var gameObjects = [gameObject];
    for (var i = 0, len = cameras.length; i < len; i++) {
      inputManager.hitTest(pointer, gameObjects, cameras[i], HitTestResult);
      if (HitTestResult.length > 0) {
        HitTestResult.length = 0;
        return true;
      }
    }
    HitTestResult.length = 0;
    return false;
  };
  var HitTestResult = [];

  var LastOpenedEditor = undefined;
  var SetLastOpenedEditor = function SetLastOpenedEditor(editor) {
    if (editor === LastOpenedEditor) {
      return;
    }
    if (LastOpenedEditor !== undefined) {
      LastOpenedEditor.close();
    }
    LastOpenedEditor = editor;
  };
  var CloseLastOpenEditor = function CloseLastOpenEditor(editor) {
    if (editor !== LastOpenedEditor) {
      return;
    }

    // Don't call `LastOpenedEditor.close()`
    LastOpenedEditor = undefined;
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var SetProperties = function SetProperties(properties, config, out) {
    if (out === undefined) {
      out = {};
    }
    var property, value;
    for (var key in properties) {
      property = properties[key]; // [propName, defaultValue]
      value = GetValue$4(config, key, property[1]);
      if (value !== undefined) {
        out[property[0]] = value;
      }
    }
    return out;
  };

  var StopPropagationTouchEvents = function StopPropagationTouchEvents(element) {
    // Don't propagate touch/mouse events to parent(game canvas)
    element.addEventListener('touchstart', callback, false);
    element.addEventListener('touchmove', callback, false);
    element.addEventListener('touchend', callback, false);
    element.addEventListener('mousedown', callback, false);
    element.addEventListener('mouseup', callback, false);
    element.addEventListener('mousemove', callback, false);
  };
  var callback = function callback(e) {
    e.stopPropagation();
  };

  var EnterClose = function EnterClose() {
    this.close();
    this.emit('keydown-ENTER', this.parent, this);
    return this;
  };

  var OnOpen = function OnOpen() {
    this.isOpened = true;
    this.initText();
    if (this.enterCloseEnable) {
      this.scene.input.keyboard.once('keydown-ENTER', EnterClose, this);
    }

    // There is no cursor-position-change event, 
    // so updating cursor position every tick
    this.scene.sys.events.on('postupdate', this.updateText, this);
    this.scene.input.on('pointerdown', this.onClickOutside, this);
    if (this.onOpenCallback) {
      this.onOpenCallback(this.parent, this);
    }
    this.emit('open', this);
  };

  var RemoveElement = function RemoveElement(element) {
    if (!element) {
      return;
    }
    var parentElement = element.parentElement;
    if (parentElement) {
      parentElement.removeChild(element);
    }
  };

  var OnClose = function OnClose() {
    this.isOpened = false;
    this.updateText();
    this.scene.sys.events.off('postupdate', this.updateText, this);
    this.scene.input.off('pointerdown', this.onClickOutside, this);
    if (this.onCloseCallback) {
      this.onCloseCallback(this.parent, this);
    }

    // Remove input text element when closing editor
    RemoveElement(this.node);
    this.node = undefined;
    this.emit('close', this);
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var CreateElement = function CreateElement(parent, config) {
    var element;
    var textType = GetValue$3(config, 'inputType', undefined);
    if (textType === undefined) {
      textType = GetValue$3(config, 'type', 'text');
    }
    if (textType === 'textarea') {
      element = document.createElement('textarea');
      element.style.resize = 'none';
    } else {
      element = document.createElement('input');
      element.type = textType;
    }
    var style = GetValue$3(config, 'style', undefined);
    // Apply other style properties
    var elementStyle = element.style;
    SetProperties(StyleProperties, style, elementStyle);
    // Set style
    elementStyle.position = 'absolute';
    elementStyle.opacity = 0;
    elementStyle.pointerEvents = 'none';
    elementStyle.zIndex = 0;
    // hide native blue text cursor on iOS
    elementStyle.transform = 'scale(0)';
    SetProperties(ElementProperties, config, element);

    // Don't propagate touch/mouse events to parent(game canvas)
    StopPropagationTouchEvents(element);

    // Attach element to fullscreenTarget in full screen mode
    var scaleManager = parent.scene.sys.scale;
    var parentElement = scaleManager.isFullscreen ? scaleManager.fullscreenTarget : document.body;
    parentElement.appendChild(element);

    // open() -> 'focus' -> OnOpen
    element.addEventListener('focus', function (e) {
      OnOpen.call(parent);
    });

    // close() -> 'blur' -> OnClose
    element.addEventListener('blur', function (e) {
      OnClose.call(parent);
    });
    return element;
  };

  var Open = function Open() {
    // Already opened
    if (this.isOpened) {
      return this;
    }
    // Read only
    if (this.readOnly) {
      return this;
    }
    SetLastOpenedEditor(this);
    if (!this.node) {
      // Create input text element when opening editor
      this.node = CreateElement(this, this.nodeConfig);
      // Register 'focus', 'blur' events
    }
    this.setFocus();

    // 'focus' event -> OnOpen

    return this;
  };

  var Close = function Close() {
    // Already closed
    if (!this.isOpened) {
      return this;
    }
    CloseLastOpenEditor(this);
    this.setBlur();

    // 'blur' event -> OnOpen

    return this;
  };

  var Methods = {
    open: Open,
    close: Close
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var HiddenTextEditBase = /*#__PURE__*/function (_ComponentBase) {
    _inherits(HiddenTextEditBase, _ComponentBase);
    function HiddenTextEditBase(gameObject, config) {
      var _this;
      _classCallCheck(this, HiddenTextEditBase);
      _this = _callSuper(this, HiddenTextEditBase, [gameObject]);
      // this.parent = gameObject;

      var textType = GetValue$2(config, 'inputType', undefined);
      if (textType === undefined) {
        textType = GetValue$2(config, 'type', 'text');
      }
      _this.setEnterCloseEnable(GetValue$2(config, 'enterClose', textType !== 'textarea'));
      var onOpen = GetValue$2(config, 'onOpen', undefined);
      if (!onOpen) {
        onOpen = GetValue$2(config, 'onFocus', undefined);
      }
      _this.onOpenCallback = onOpen;
      var onClose = GetValue$2(config, 'onClose', undefined);
      if (!onClose) {
        onClose = GetValue$2(config, 'onBlur', undefined);
      }
      _this.onCloseCallback = onClose;
      _this.onUpdateCallback = GetValue$2(config, 'onUpdate', undefined);
      _this.isOpened = false;
      gameObject.on('pointerdown', function () {
        this.open();
      }, _assertThisInitialized(_this)).setInteractive();
      _this.nodeConfig = CopyElementConfig(config);
      // Create/remove input text element when opening/closing editor
      _this.node = undefined;
      return _this;
    }
    _createClass(HiddenTextEditBase, [{
      key: "destroy",
      value: function destroy() {
        // this.parent.off('pointerdown', this.open, this);

        this.close();
        _get(_getPrototypeOf(HiddenTextEditBase.prototype), "destroy", this).call(this);
      }
    }, {
      key: "onClickOutside",
      value: function onClickOutside(pointer) {
        if (!IsPointerInHitArea(this.parent, pointer)) {
          this.close();
        }
      }
    }, {
      key: "setEnterCloseEnable",
      value: function setEnterCloseEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.enterCloseEnable = enable;
        return this;
      }

      // Override
    }, {
      key: "initText",
      value: function initText() {}

      // Override, invoking under 'postupdate' event of scene
    }, {
      key: "updateText",
      value: function updateText() {}

      // Copy from InputText class
    }, {
      key: "text",
      get: function get() {
        if (!this.node) {
          return '';
        }
        return this.node.value;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.value = value;
      }
    }, {
      key: "setText",
      value: function setText(value) {
        // Override
        this.text = value;
        return this;
      }
    }, {
      key: "maxLength",
      get: function get() {
        return this.nodeConfig.maxLength;
      },
      set: function set(value) {
        this.nodeConfig.maxLength = value;
        if (this.node) {
          this.node.maxLength = value;
        }
      }
    }, {
      key: "setMaxLength",
      value: function setMaxLength(value) {
        this.maxLength = value;
        return this;
      }
    }, {
      key: "minLength",
      get: function get() {
        return this.nodeConfig.minLength;
      },
      set: function set(value) {
        this.nodeConfig.minLength = value;
        if (this.node) {
          this.node.minLength = value;
        }
      }
    }, {
      key: "setMinLength",
      value: function setMinLength(value) {
        this.minLength = value;
        return this;
      }
    }, {
      key: "placeholder",
      get: function get() {
        return this.node.placeholder;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.placeholder = value;
      }
    }, {
      key: "setPlaceholder",
      value: function setPlaceholder(value) {
        this.placeholder = value;
        return this;
      }
    }, {
      key: "selectText",
      value: function selectText(selectionStart, selectionEnd) {
        if (!this.node) {
          return this;
        }
        if (selectionStart === undefined) {
          this.node.select();
        } else {
          this.node.setSelectionRange(selectionStart, selectionEnd);
        }
        return this;
      }
    }, {
      key: "selectAll",
      value: function selectAll() {
        this.selectText();
        return this;
      }
    }, {
      key: "selectionStart",
      get: function get() {
        if (!this.node) {
          return 0;
        }
        return this.node.selectionStart;
      }
    }, {
      key: "selectionEnd",
      get: function get() {
        if (!this.node) {
          return 0;
        }
        return this.node.selectionEnd;
      }
    }, {
      key: "selectedText",
      get: function get() {
        if (!this.node) {
          return '';
        }
        var node = this.node;
        return node.value.substring(node.selectionStart, node.selectionEnd);
      }
    }, {
      key: "cursorPosition",
      get: function get() {
        if (!this.node) {
          return 0;
        }
        return this.node.selectionStart;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.setSelectionRange(value, value);
      }
    }, {
      key: "setCursorPosition",
      value: function setCursorPosition(value) {
        if (value === undefined) {
          value = this.text.length;
        } else if (value < 0) {
          value = this.text.length + value;
        }
        this.cursorPosition = value;
        return this;
      }
    }, {
      key: "tooltip",
      get: function get() {
        if (!this.node) {
          return '';
        }
        return this.node.title;
      },
      set: function set(value) {
        if (!this.node) {
          return this;
        }
        this.node.title = value;
      }
    }, {
      key: "setTooltip",
      value: function setTooltip(value) {
        this.tooltip = value;
        return this;
      }
    }, {
      key: "setTextChangedCallback",
      value: function setTextChangedCallback(callback) {
        this.onTextChanged = callback;
        return this;
      }
    }, {
      key: "readOnly",
      get: function get() {
        return this.nodeConfig.readOnly;
      },
      set: function set(value) {
        this.nodeConfig.readOnly = value;
        if (this.node) {
          this.node.readOnly = value;
        }
      }
    }, {
      key: "setReadOnly",
      value: function setReadOnly(value) {
        if (value === undefined) {
          value = true;
        }
        this.readOnly = value;
        return this;
      }
    }, {
      key: "spellCheck",
      get: function get() {
        if (!this.node) {
          return '';
        }
        return this.node.spellcheck;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.spellcheck = value;
      }
    }, {
      key: "setSpellCheck",
      value: function setSpellCheck(value) {
        this.spellCheck = value;
        return this;
      }
    }, {
      key: "fontColor",
      get: function get() {
        if (!this.node) {
          return undefined;
        }
        return this.node.style.color;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.style.color = value;
      }
    }, {
      key: "setFontColor",
      value: function setFontColor(value) {
        this.fontColor = value;
        return this;
      }
    }, {
      key: "setStyle",
      value: function setStyle(key, value) {
        if (!this.node) {
          return this;
        }
        this.node.style[key] = value;
        return this;
      }
    }, {
      key: "getStyle",
      value: function getStyle(key) {
        if (!this.node) {
          return undefined;
        }
        return this.node.style[key];
      }
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom() {
        if (!this.node) {
          return this;
        }
        this.node.scrollTop = this.node.scrollHeight;
        return this;
      }
    }, {
      key: "setEnabled",
      value: function setEnabled(enabled) {
        if (!this.node) {
          return this;
        }
        if (enabled === undefined) {
          enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
      }
    }, {
      key: "setBlur",
      value: function setBlur() {
        if (!this.node) {
          return this;
        }
        this.node.blur();
        return this;
      }
    }, {
      key: "setFocus",
      value: function setFocus() {
        if (!this.node) {
          return this;
        }
        this.node.focus();
        return this;
      }
    }, {
      key: "isFocused",
      get: function get() {
        return this.isOpened;
      }
    }]);
    return HiddenTextEditBase;
  }(ComponentBase);
  Object.assign(HiddenTextEditBase.prototype, Methods);

  var NumberInputUpdateCallback = function NumberInputUpdateCallback(text, textObject, hiddenInputText) {
    text = text.replace(' ', '');
    var previousText = hiddenInputText.previousText;
    if (text === previousText) {
      return text;
    }
    if (isNaN(text)) {
      // Enter a NaN character, back to previous text
      hiddenInputText.emit('nan', text, hiddenInputText);
      text = previousText;
      var cursorPosition = hiddenInputText.cursorPosition - 1;
      hiddenInputText.setText(text);
      hiddenInputText.setCursorPosition(cursorPosition);
    } else {
      // New number text, update previous texr
      hiddenInputText.previousText = text;
    }
    return text;
  };

  var SelectRange = function SelectRange(hiddenTextEdit) {
    var textObject = hiddenTextEdit.parent;
    // var text = textObject.text;
    var selectionStart = hiddenTextEdit.isOpened ? hiddenTextEdit.selectionStart : null;
    var selectionEnd = hiddenTextEdit.isOpened ? hiddenTextEdit.selectionEnd : null;
    var prevSelectionStart = hiddenTextEdit.prevSelectionStart;
    var prevSelectionEnd = hiddenTextEdit.prevSelectionEnd;
    if (prevSelectionStart === selectionStart && prevSelectionEnd === selectionEnd) {
      return;
    }
    var min, max;
    if (prevSelectionStart === null) {
      min = selectionStart;
      max = selectionEnd;
    } else if (selectionStart === null) {
      min = prevSelectionStart;
      max = prevSelectionEnd;
    } else {
      min = Math.min(prevSelectionStart, selectionStart);
      max = Math.max(prevSelectionEnd, selectionEnd);
    }
    for (var i = min; i < max; i++) {
      var inPrevSelectionRange;
      if (prevSelectionStart === null) {
        inPrevSelectionRange = false;
      } else {
        inPrevSelectionRange = i >= prevSelectionStart && i < prevSelectionEnd;
      }
      var inSelectionRange;
      if (selectionStart === null) {
        inSelectionRange = false;
      } else {
        inSelectionRange = i >= selectionStart && i < selectionEnd;
      }
      if (inPrevSelectionRange === inSelectionRange) {
        continue;
      }
      var child = textObject.getCharChild(i);
      if (child) {
        var eventName = inPrevSelectionRange ? 'cursorout' : 'cursorin';
        textObject.emit(eventName, child, i, textObject);
      }
    }
    hiddenTextEdit.prevSelectionStart = selectionStart;
    hiddenTextEdit.prevSelectionEnd = selectionEnd;
  };

  var ScrollToBob = function ScrollToBob(bob) {
    var textObject = bob.parent;
    var textObjectLeftX = 0,
      textObjectRightX = textObject.width,
      textObjectTopY = 0,
      textObjectBottomY = textObject.height;
    var childX = bob.drawX,
      childY = bob.drawY;
    var childLeftX = childX + bob.drawTLX,
      childRightX = childX + bob.drawTRX,
      childTopY = childY + bob.drawTLY,
      childBottomY = childY + bob.drawBLY;
    var dx;
    if (childLeftX < textObjectLeftX) {
      dx = textObjectLeftX - childLeftX;
    } else if (childRightX > textObjectRightX) {
      dx = textObjectRightX - childRightX;
    } else {
      dx = 0;
    }
    var dy;
    if (childTopY < textObjectTopY) {
      dy = textObjectTopY - childTopY;
    } else if (childBottomY > textObjectBottomY) {
      dy = textObjectBottomY - childBottomY;
    } else {
      dy = 0;
    }
    textObject._textOX += dx;
    textObject._textOY += dy;
  };

  var MoveCursor = function MoveCursor(hiddenTextEdit) {
    var textObject = hiddenTextEdit.parent;
    var text = textObject.text;
    var cursorPosition = hiddenTextEdit.cursorPosition;
    if (hiddenTextEdit.prevCursorPosition === cursorPosition) {
      return;
    }
    if (hiddenTextEdit.prevCursorPosition !== null) {
      if (hiddenTextEdit.prevCursorPosition > text.length) {
        hiddenTextEdit.prevCursorPosition = null;
      }
    }
    if (hiddenTextEdit.prevCursorPosition !== null) {
      var child = textObject.getCharChild(hiddenTextEdit.prevCursorPosition);
      if (child) {
        // Rollback size of new line child
        if (child.text === '\n') {
          child.clearTextSize();
        }
        textObject.emit('cursorout', child, hiddenTextEdit.prevCursorPosition, textObject);
      }
    }
    if (cursorPosition != null) {
      var child = textObject.getCharChild(cursorPosition);
      if (child) {
        // Display new line child
        if (child.text === '\n') {
          child.copyTextSize(textObject.lastInsertCursor);
        }
        ScrollToBob(child);
        textObject.emit('cursorin', child, cursorPosition, textObject);
      }
    }
    textObject.emit('movecursor', cursorPosition, hiddenTextEdit.prevCursorPosition, textObject);
    hiddenTextEdit.prevCursorPosition = cursorPosition;
  };

  var ClearSelectRange = function ClearSelectRange(hiddenTextEdit) {
    var prevSelectionStart = hiddenTextEdit.prevSelectionStart;
    if (prevSelectionStart === null) {
      return;
    }
    var prevSelectionEnd = hiddenTextEdit.prevSelectionEnd;
    var textObject = hiddenTextEdit.parent;
    for (var i = prevSelectionStart; i < prevSelectionEnd; i++) {
      var child = textObject.getCharChild(i);
      if (child) {
        textObject.emit('cursorout', child, i, textObject);
      }
    }
    hiddenTextEdit.prevSelectionStart = null;
    hiddenTextEdit.prevSelectionEnd = null;
  };

  var ClearCursor = function ClearCursor(hiddenTextEdit) {
    var prevCursorPosition = hiddenTextEdit.prevCursorPosition;
    if (prevCursorPosition === null) {
      return;
    }
    var textObject = hiddenTextEdit.parent;
    var child = textObject.getCharChild(prevCursorPosition);
    if (child) {
      textObject.emit('cursorout', child, prevCursorPosition, textObject);
    }
    hiddenTextEdit.prevCursorPosition = null;
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var HiddenTextEdit = /*#__PURE__*/function (_HiddenTextEditBase) {
    _inherits(HiddenTextEdit, _HiddenTextEditBase);
    function HiddenTextEdit(gameObject, config) {
      var _this;
      _classCallCheck(this, HiddenTextEdit);
      _this = _callSuper(this, HiddenTextEdit, [gameObject, config]);
      // this.parent = gameObject;

      _this.setSelectAllWhenFocusEnable(GetValue$1(config, 'selectAll', false));
      _this.cursorMoveStartIndex = null;
      _this.prevCursorPosition = null;
      _this.prevSelectionStart = null;
      _this.prevSelectionEnd = null;
      _this.firstClickAfterOpen = false;
      gameObject
      // Open editor by 'pointerdown' event
      // Then set cursor position to nearest char
      .on('pointerdown', function (pointer, localX, localY, event) {
        var child = gameObject.getNearestChild(localX, localY);
        var charIndex = gameObject.getCharIndex(child);
        if (!this.selectAllWhenFocus || !this.firstClickAfterOpen) {
          this.setCursorPosition(charIndex);
        }
        this.cursorMoveStartIndex = charIndex;
        this.firstClickAfterOpen = false;
      }, _assertThisInitialized(_this)).on('pointermove', function (pointer, localX, localY, event) {
        if (!pointer.isDown) {
          return;
        }
        var child = gameObject.getNearestChild(localX, localY);
        var charIndex = gameObject.getCharIndex(child);
        if (this.cursorMoveStartIndex < charIndex) {
          this.selectText(this.cursorMoveStartIndex, charIndex + 1);
        } else {
          this.selectText(charIndex, this.cursorMoveStartIndex + 1);
        }
      }, _assertThisInitialized(_this));
      _this.on('open', function () {
        if (this.selectAllWhenFocus) {
          this.selectAll();
        }
        this.firstClickAfterOpen = true;
        gameObject.emit('open');
      }, _assertThisInitialized(_this)).on('close', function () {
        // Route 'close' event
        gameObject.emit('close');
      }).on('keydown-ENTER', function () {
        // Route 'keydown-ENTER' event
        gameObject.emit('keydown-ENTER');
      });
      return _this;
    }
    _createClass(HiddenTextEdit, [{
      key: "initText",
      value: function initText() {
        var textObject = this.parent;
        this.prevCursorPosition = null;
        this.setText(textObject.text);
        return this;
      }
    }, {
      key: "updateText",
      value: function updateText() {
        var textObject = this.parent;
        var text = this.text;
        if (this.onUpdateCallback) {
          var newText = this.onUpdateCallback(text, textObject, this);
          if (newText != null) {
            text = newText;
          }
        }
        if (textObject.text !== text) {
          textObject.setText(text);
        }
        if (this.isOpened) {
          if (this.selectionStart !== this.selectionEnd) {
            ClearCursor(this);
            SelectRange(this);
          } else {
            ClearSelectRange(this);
            MoveCursor(this);
          }
        } else {
          ClearSelectRange(this);
          ClearCursor(this);
        }
        return this;
      }
    }, {
      key: "setNumberInput",
      value: function setNumberInput() {
        this.onUpdateCallback = NumberInputUpdateCallback;
        return this;
      }
    }, {
      key: "setSelectAllWhenFocusEnable",
      value: function setSelectAllWhenFocusEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.selectAllWhenFocus = enable;
        return this;
      }
    }]);
    return HiddenTextEdit;
  }(HiddenTextEditBase);

  var GetValue = Phaser.Utils.Objects.GetValue;
  var PropertiesList = ['inputType', 'onOpen', 'onFocus', 'onClose', 'onBlur', 'onUpdate', 'enterClose', 'readOnly', 'maxLength', 'minLength', 'selectAll'];
  var CreateHiddenTextEdit = function CreateHiddenTextEdit(parent, parentConfig) {
    var config = GetValue(parentConfig, 'edit');
    if (config === undefined) {
      config = {};
    }
    CopyProperty(parentConfig, config, PropertiesList);
    return new HiddenTextEdit(parent, config);
  };

  var HasValue = function HasValue(source, key) {
    if (!source || typeof source === 'number') {
      return false;
    } else if (source.hasOwnProperty(key)) {
      return true;
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;

      //  Use for loop here so we can break early
      for (var i = 0; i < keys.length; i++) {
        if (parent.hasOwnProperty(keys[i])) {
          parent = parent[keys[i]];
        } else {
          //  Can't go any further
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

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
  var SetValue = function SetValue(target, keys, value, delimiter) {
    if (delimiter === undefined) {
      delimiter = '.';
    }

    // no object
    if (_typeof(target) !== 'object') {
      return;
    }

    // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      }
      // set target to another object
      else if (_typeof(value) === 'object') {
        target = value;
      }
    } else {
      if (typeof keys === 'string') {
        keys = keys.split(delimiter);
      }
      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }
    return target;
  };

  var InjectDefaultConfig = function InjectDefaultConfig(config) {
    var isSingleLineMode = !config.textArea;
    if (!HasValue(config, 'wrap.vAlign')) {
      var defaultValue = isSingleLineMode ? 'center' : 'top';
      SetValue(config, 'wrap.vAlign', defaultValue);
    }
    if (!HasValue(config, 'wrap.charWrap')) {
      SetValue(config, 'wrap.charWrap', true);
    }
    if (!HasValue(config, 'wrap.maxLines')) {
      var defaultValue = isSingleLineMode ? 1 : undefined;
      SetValue(config, 'wrap.maxLines', defaultValue);
    }
    if (isSingleLineMode) {
      SetValue(config, 'wrap.wrapWidth', Infinity);
    }
    if (!HasValue(config, 'wrap.useDefaultTextHeight')) {
      SetValue(config, 'wrap.useDefaultTextHeight', true);
    }
    if (!config.edit) {
      config.edit = {};
    }
    if (!HasValue(config.edit, 'inputType')) {
      var defaultValue = isSingleLineMode ? 'text' : 'textarea';
      SetValue(config.edit, 'inputType', defaultValue);
    }
    return config;
  };

  var ExtractByPrefix = function ExtractByPrefix(obj, prefix, delimiter, out) {
    if (delimiter === undefined) {
      delimiter = '.';
    }
    if (out === undefined) {
      out = {};
    }
    if (!obj) {
      return out;
    }
    if (prefix in obj) {
      return Object.assign(out, obj[prefix]);
    }
    prefix += delimiter;
    for (var key in obj) {
      if (!key.startsWith(prefix)) {
        continue;
      }
      out[key.replace(prefix, '')] = obj[key];
    }
    return out;
  };

  var IsEmpty = function IsEmpty(source) {
    for (var k in source) {
      return false;
    }
    return true;
  };

  var GetPartialData = function GetPartialData(obj, keys, out) {
    if (out === undefined) {
      out = {};
    }
    if (Array.isArray(keys)) {
      var key;
      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        out[key] = obj[key];
      }
    } else {
      for (var key in keys) {
        out[key] = obj[key];
      }
    }
    return out;
  };

  var IsKeyValueEqual = function IsKeyValueEqual(objA, objB) {
    for (var key in objA) {
      if (!(key in objB)) {
        return false;
      }
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
    for (var key in objB) {
      if (!(key in objA)) {
        return false;
      }
    }
    return true;
  };

  var RegisterCursorStyle = function RegisterCursorStyle(cursorStyle) {
    if (IsEmpty(cursorStyle)) {
      return;
    }
    this.setCursorStyle(cursorStyle).on('cursorin', function (child) {
      var cursorStyle = this.cursorStyle;
      var styleSave = GetPartialData(child.style, cursorStyle);
      if (IsKeyValueEqual(cursorStyle, styleSave)) {
        return;
      }
      child.styleSave = styleSave;
      child.modifyStyle(cursorStyle);
    }, this).on('cursorout', function (child) {
      if (!child.styleSave) {
        return;
      }
      child.modifyStyle(child.styleSave);
      child.styleSave = undefined;
    }, this);
  };

  var RegisterFocusStyle = function RegisterFocusStyle(focusStyle) {
    if (IsEmpty(focusStyle)) {
      return;
    }
    this.setFocusStyle(focusStyle).on('open', function () {
      var child = this.background;
      var focusStyle = this.focusStyle;
      var styleSave = GetPartialData(child, focusStyle);
      if (IsKeyValueEqual(focusStyle, styleSave)) {
        return;
      }
      child.styleSave = styleSave;
      child.modifyStyle(focusStyle);
    }, this).on('close', function () {
      var child = this.background;
      if (!child.styleSave) {
        return;
      }
      child.modifyStyle(child.styleSave);
      child.styleSave = undefined;
    }, this);
  };

  var CreateInsertCursorChild = function CreateInsertCursorChild(textObject) {
    var child = textObject.createCharChild('|'); // Use '|' to update render size
    child.text = ''; // Render empty string ''

    return child;
  };

  function Diff() {}
  Diff.prototype = {
    diff: function diff(oldString, newString) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = options.callback;
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      this.options = options;
      var self = this;
      function done(value) {
        if (callback) {
          setTimeout(function () {
            callback(undefined, value);
          }, 0);
          return true;
        } else {
          return value;
        }
      }

      // Allow subclasses to massage the input prior to running
      oldString = this.castInput(oldString);
      newString = this.castInput(newString);
      oldString = this.removeEmpty(this.tokenize(oldString));
      newString = this.removeEmpty(this.tokenize(newString));
      var newLen = newString.length,
        oldLen = oldString.length;
      var editLength = 1;
      var maxEditLength = newLen + oldLen;
      if (options.maxEditLength) {
        maxEditLength = Math.min(maxEditLength, options.maxEditLength);
      }
      var bestPath = [{
        newPos: -1,
        components: []
      }];

      // Seed editLength = 0, i.e. the content starts with the same values
      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
        // Identity per the equality and tokenizer
        return done([{
          value: this.join(newString),
          count: newString.length
        }]);
      }

      // Main worker method. checks all permutations of a given edit length for acceptance.
      function execEditLength() {
        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
          var basePath = void 0;
          var addPath = bestPath[diagonalPath - 1],
            removePath = bestPath[diagonalPath + 1],
            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
          if (addPath) {
            // No one else is going to attempt to use this value, clear it
            bestPath[diagonalPath - 1] = undefined;
          }
          var canAdd = addPath && addPath.newPos + 1 < newLen,
            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
          if (!canAdd && !canRemove) {
            // If this path is a terminal then prune
            bestPath[diagonalPath] = undefined;
            continue;
          }

          // Select the diagonal that we want to branch from. We select the prior
          // path whose position in the new string is the farthest from the origin
          // and does not pass the bounds of the diff graph
          if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
            basePath = clonePath(removePath);
            self.pushComponent(basePath.components, undefined, true);
          } else {
            basePath = addPath; // No need to clone, we've pulled it from the list
            basePath.newPos++;
            self.pushComponent(basePath.components, true, undefined);
          }
          _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);

          // If we have hit the end of both strings, then we are done
          if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
            return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
          } else {
            // Otherwise track this path as a potential candidate and continue.
            bestPath[diagonalPath] = basePath;
          }
        }
        editLength++;
      }

      // Performs the length of edit iteration. Is a bit fugly as this has to support the
      // sync and async mode which is never fun. Loops over execEditLength until a value
      // is produced, or until the edit length exceeds options.maxEditLength (if given),
      // in which case it will return undefined.
      if (callback) {
        (function exec() {
          setTimeout(function () {
            if (editLength > maxEditLength) {
              return callback();
            }
            if (!execEditLength()) {
              exec();
            }
          }, 0);
        })();
      } else {
        while (editLength <= maxEditLength) {
          var ret = execEditLength();
          if (ret) {
            return ret;
          }
        }
      }
    },
    pushComponent: function pushComponent(components, added, removed) {
      var last = components[components.length - 1];
      if (last && last.added === added && last.removed === removed) {
        // We need to clone here as the component clone operation is just
        // as shallow array clone
        components[components.length - 1] = {
          count: last.count + 1,
          added: added,
          removed: removed
        };
      } else {
        components.push({
          count: 1,
          added: added,
          removed: removed
        });
      }
    },
    extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
      var newLen = newString.length,
        oldLen = oldString.length,
        newPos = basePath.newPos,
        oldPos = newPos - diagonalPath,
        commonCount = 0;
      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
        newPos++;
        oldPos++;
        commonCount++;
      }
      if (commonCount) {
        basePath.components.push({
          count: commonCount
        });
      }
      basePath.newPos = newPos;
      return oldPos;
    },
    equals: function equals(left, right) {
      if (this.options.comparator) {
        return this.options.comparator(left, right);
      } else {
        return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
      }
    },
    removeEmpty: function removeEmpty(array) {
      var ret = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i]) {
          ret.push(array[i]);
        }
      }
      return ret;
    },
    castInput: function castInput(value) {
      return value;
    },
    tokenize: function tokenize(value) {
      return value.split('');
    },
    join: function join(chars) {
      return chars.join('');
    }
  };
  function buildValues(diff, components, newString, oldString, useLongestToken) {
    var componentPos = 0,
      componentLen = components.length,
      newPos = 0,
      oldPos = 0;
    for (; componentPos < componentLen; componentPos++) {
      var component = components[componentPos];
      if (!component.removed) {
        if (!component.added && useLongestToken) {
          var value = newString.slice(newPos, newPos + component.count);
          value = value.map(function (value, i) {
            var oldValue = oldString[oldPos + i];
            return oldValue.length > value.length ? oldValue : value;
          });
          component.value = diff.join(value);
        } else {
          component.value = diff.join(newString.slice(newPos, newPos + component.count));
        }
        newPos += component.count;

        // Common case
        if (!component.added) {
          oldPos += component.count;
        }
      } else {
        component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
        oldPos += component.count;

        // Reverse add and remove so removes are output first to match common convention
        // The diffing algorithm is tied to add then remove output and this is the simplest
        // route to get the desired output with minimal overhead.
        if (componentPos && components[componentPos - 1].added) {
          var tmp = components[componentPos - 1];
          components[componentPos - 1] = components[componentPos];
          components[componentPos] = tmp;
        }
      }
    }

    // Special case handle for when one terminal is ignored (i.e. whitespace).
    // For this case we merge the terminal into the prior string and drop the change.
    // This is only available for string mode.
    var lastComponent = components[componentLen - 1];
    if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
      components[componentLen - 2].value += lastComponent.value;
      components.pop();
    }
    return components;
  }
  function clonePath(path) {
    return {
      newPos: path.newPos,
      components: path.components.slice(0)
    };
  }

  var characterDiff = new Diff();
  function diffChars(oldStr, newStr, options) {
    return characterDiff.diff(oldStr, newStr, options);
  }

  // Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
  //
  // Ranges and exceptions:
  // Latin-1 Supplement, 0080–00FF
  //  - U+00D7  × Multiplication sign
  //  - U+00F7  ÷ Division sign
  // Latin Extended-A, 0100–017F
  // Latin Extended-B, 0180–024F
  // IPA Extensions, 0250–02AF
  // Spacing Modifier Letters, 02B0–02FF
  //  - U+02C7  ˇ &#711;  Caron
  //  - U+02D8  ˘ &#728;  Breve
  //  - U+02D9  ˙ &#729;  Dot Above
  //  - U+02DA  ˚ &#730;  Ring Above
  //  - U+02DB  ˛ &#731;  Ogonek
  //  - U+02DC  ˜ &#732;  Small Tilde
  //  - U+02DD  ˝ &#733;  Double Acute Accent
  // Latin Extended Additional, 1E00–1EFF
  var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
  var reWhitespace = /\S/;
  var wordDiff = new Diff();
  wordDiff.equals = function (left, right) {
    if (this.options.ignoreCase) {
      left = left.toLowerCase();
      right = right.toLowerCase();
    }
    return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
  };
  wordDiff.tokenize = function (value) {
    // All whitespace symbols except newline group into one token, each newline - in separate token
    var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);

    // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.
    for (var i = 0; i < tokens.length - 1; i++) {
      // If we have an empty string in the next field and we have only word chars before and after, merge
      if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
        tokens[i] += tokens[i + 2];
        tokens.splice(i + 1, 2);
        i--;
      }
    }
    return tokens;
  };

  var lineDiff = new Diff();
  lineDiff.tokenize = function (value) {
    var retLines = [],
      linesAndNewlines = value.split(/(\n|\r\n)/);

    // Ignore the final empty token that occurs if the string ends with a new line
    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
      linesAndNewlines.pop();
    }

    // Merge the content and line separators into single tokens
    for (var i = 0; i < linesAndNewlines.length; i++) {
      var line = linesAndNewlines[i];
      if (i % 2 && !this.options.newlineIsToken) {
        retLines[retLines.length - 1] += line;
      } else {
        if (this.options.ignoreWhitespace) {
          line = line.trim();
        }
        retLines.push(line);
      }
    }
    return retLines;
  };

  var sentenceDiff = new Diff();
  sentenceDiff.tokenize = function (value) {
    return value.split(/(\S.+?[.!?])(?=\s+|$)/);
  };

  var cssDiff = new Diff();
  cssDiff.tokenize = function (value) {
    return value.split(/([{}:;,]|\s+)/);
  };

  var objectPrototypeToString = Object.prototype.toString;
  var jsonDiff = new Diff();
  // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
  jsonDiff.useLongestToken = true;
  jsonDiff.tokenize = lineDiff.tokenize;
  jsonDiff.castInput = function (value) {
    var _this$options = this.options,
      undefinedReplacement = _this$options.undefinedReplacement,
      _this$options$stringi = _this$options.stringifyReplacer,
      stringifyReplacer = _this$options$stringi === void 0 ? function (k, v) {
        return typeof v === 'undefined' ? undefinedReplacement : v;
      } : _this$options$stringi;
    return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
  };
  jsonDiff.equals = function (left, right) {
    return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
  };

  // This function handles the presence of circular references by bailing out when encountering an
  // object that is already on the "stack" of items being processed. Accepts an optional replacer
  function canonicalize(obj, stack, replacementStack, replacer, key) {
    stack = stack || [];
    replacementStack = replacementStack || [];
    if (replacer) {
      obj = replacer(key, obj);
    }
    var i;
    for (i = 0; i < stack.length; i += 1) {
      if (stack[i] === obj) {
        return replacementStack[i];
      }
    }
    var canonicalizedObj;
    if ('[object Array]' === objectPrototypeToString.call(obj)) {
      stack.push(obj);
      canonicalizedObj = new Array(obj.length);
      replacementStack.push(canonicalizedObj);
      for (i = 0; i < obj.length; i += 1) {
        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
      }
      stack.pop();
      replacementStack.pop();
      return canonicalizedObj;
    }
    if (obj && obj.toJSON) {
      obj = obj.toJSON();
    }
    if (_typeof(obj) === 'object' && obj !== null) {
      stack.push(obj);
      canonicalizedObj = {};
      replacementStack.push(canonicalizedObj);
      var sortedKeys = [],
        _key;
      for (_key in obj) {
        /* istanbul ignore else */
        if (obj.hasOwnProperty(_key)) {
          sortedKeys.push(_key);
        }
      }
      sortedKeys.sort();
      for (i = 0; i < sortedKeys.length; i += 1) {
        _key = sortedKeys[i];
        canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
      }
      stack.pop();
      replacementStack.pop();
    } else {
      canonicalizedObj = obj;
    }
    return canonicalizedObj;
  }

  var arrayDiff = new Diff();
  arrayDiff.tokenize = function (value) {
    return value.slice();
  };
  arrayDiff.join = arrayDiff.removeEmpty = function (value) {
    return value;
  };

  var RemoveItem = Phaser.Utils.Array.Remove;
  var SetText = function SetText(textObject, newText) {
    var text = textObject.text;
    if (newText === text) {
      return;
    }
    if (text == null) {
      text = '';
    }

    // textObject.setText(newText);

    // Remove lastInsertCursor directly 
    RemoveItem(textObject.children, textObject.lastInsertCursor);
    if (newText === '') {
      textObject.removeChildren();
    } else {
      var results = diffChars(text, newText);
      var charIndex = 0;
      for (var i = 0, cnt = results.length; i < cnt; i++) {
        var result = results[i];
        if (result.removed) {
          // Remove character at charIndex
          textObject.removeText(charIndex, result.count);
        } else if (result.added) {
          textObject.insertText(charIndex, result.value);
          charIndex += result.count;
        } else {
          charIndex += result.count;
        }
      }
    }

    // Push back lastInsertCursor directly
    textObject.children.push(textObject.lastInsertCursor);
    textObject.runWrap();
    textObject.emit('textchange', newText, textObject);
  };

  var SetTextOXYMethods = {
    setTextOYByPercentage: function setTextOYByPercentage(percentage) {
      this.setTextOY(-this.textVisibleHeight * percentage);
      return this;
    },
    getTextOYPercentage: function getTextOYPercentage() {
      var textVisibleHeight = this.textVisibleHeight;
      if (textVisibleHeight === 0) {
        return 0;
      }
      return this._textOY / -textVisibleHeight;
    },
    setTextOXByPercentage: function setTextOXByPercentage(percentage) {
      this.setTextOX(-this.textVisibleWidth * percentage);
      return this;
    },
    getTextOXPercentage: function getTextOXPercentage() {
      var textVisibleWidth = this.textVisibleWidth;
      if (textVisibleWidth === 0) {
        return 0;
      }
      return this._textOX / -textVisibleWidth;
    }
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var CanvasInput = /*#__PURE__*/function (_DynamicText) {
    _inherits(CanvasInput, _DynamicText);
    function CanvasInput(scene, x, y, fixedWidth, fixedHeight, config) {
      var _this;
      _classCallCheck(this, CanvasInput);
      if (IsPlainObject(x)) {
        config = x;
      } else if (IsPlainObject(fixedWidth)) {
        config = fixedWidth;
      }
      if (config === undefined) {
        config = {};
      }
      InjectDefaultConfig(config);

      // Set text later
      var text = config.text;
      if (text) {
        delete config.text;
      }
      var focusStyle = ExtractByPrefix(config.background, 'focus');
      var cursorStyle = ExtractByPrefix(config.style, 'cursor');
      _this = _callSuper(this, CanvasInput, [scene, x, y, fixedWidth, fixedHeight, config]);
      _this.type = 'rexCanvasInput';

      // readonly
      _this.contentWidth = undefined;
      _this.contentHeight = undefined;
      _this.lineHeight = undefined;
      _this.linesCount = undefined;
      _this._text;
      _this.textEdit = CreateHiddenTextEdit(_assertThisInitialized(_this), config);
      if (config.focusStyle) {
        Object.assign(focusStyle, config.focusStyle);
      }
      RegisterFocusStyle.call(_assertThisInitialized(_this), focusStyle);
      if (config.cursorStyle) {
        Object.assign(cursorStyle, config.cursorStyle);
      }
      RegisterCursorStyle.call(_assertThisInitialized(_this), cursorStyle);
      var addCharCallback = config.onAddChar;
      if (addCharCallback) {
        _this.on('addchar', addCharCallback);
      }
      var cursorOutCallback = config.onCursorOut;
      if (cursorOutCallback) {
        _this.on('cursorout', cursorOutCallback);
      }
      var cursorInCallback = config.onCursorIn;
      if (cursorInCallback) {
        _this.on('cursorin', cursorInCallback);
      }
      var moveCursorCallback = config.onMoveCursor;
      if (moveCursorCallback) {
        _this.on('movecursor', moveCursorCallback);
      }
      _this.setParseTextCallback(config.parseTextCallback);
      _this.lastInsertCursor = CreateInsertCursorChild(_assertThisInitialized(_this));
      if (!text) {
        text = '';
      }
      _this.setText(text);
      return _this;
    }
    _createClass(CanvasInput, [{
      key: "addChild",
      value: function addChild(child, index) {
        _get(_getPrototypeOf(CanvasInput.prototype), "addChild", this).call(this, child, index);
        if (Array.isArray(child)) {
          var children = child;
          for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (IsChar(child)) {
              this.emit('addchar', child, index + i, this);
            }
          }
        } else {
          if (IsChar(child)) {
            this.emit('addchar', child, index, this);
          }
        }
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        if (value == null) {
          value = '';
        } else {
          value = value.toString();
        }
        if (this._text === value) {
          return;
        }
        SetText(this, value);
        this._text = value;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        this.text = text;
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(text) {
        this.setText(this.text + text);
        return this;
      }
    }, {
      key: "runWrap",
      value: function runWrap(config) {
        var result = _get(_getPrototypeOf(CanvasInput.prototype), "runWrap", this).call(this, config);
        // Save content size
        this.contentWidth = result.maxLineWidth;
        this.contentHeight = result.linesHeight;
        this.lineHeight = result.lineHeight;
        this.linesCount = result.lines.length;
        return result;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        if (this.width === width && this.height === height) {
          return this;
        }
        _get(_getPrototypeOf(CanvasInput.prototype), "setSize", this).call(this, width, height);

        // Run wrap again since fixedWidth and fixedHeight are changed
        this.runWrap();
        return this;
      }
    }, {
      key: "displayText",
      get: function get() {
        return this.text;
      },
      set: function set(value) {
        this.text = value;
      }
    }, {
      key: "setDisplayText",
      value: function setDisplayText(value) {
        this.displayText = value;
        return this;
      }
    }, {
      key: "inputText",
      get: function get() {
        return this.textEdit.text;
      },
      set: function set(value) {
        this.textEdit.text = value;
      }
    }, {
      key: "setInputText",
      value: function setInputText(value) {
        this.inputText = value;
        return this;
      }
    }, {
      key: "setParseTextCallback",
      value: function setParseTextCallback(callback) {
        if (!callback) {
          callback = DefaultParseTextCallback;
        }
        this.parseTextCallback = callback;
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this.parseTextCallback(this.text);
      },
      set: function set(value) {
        this.setText(value);
      }
    }, {
      key: "getValue",
      value: function getValue() {
        return this.value;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "readOnly",
      get: function get() {
        return this.textEdit.readOnly;
      },
      set: function set(value) {
        this.textEdit.readOnly = value;
      }
    }, {
      key: "setReadOnly",
      value: function setReadOnly(value) {
        this.textEdit.setReadOnly(value);
        return this;
      }
    }, {
      key: "open",
      value: function open(onCloseCallback) {
        if (onCloseCallback) {
          this.textEdit.once('close', onCloseCallback);
        }
        this.textEdit.open();
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        this.textEdit.close();
        return this;
      }
    }, {
      key: "isOpened",
      get: function get() {
        return this.textEdit.isOpened;
      }
    }, {
      key: "setFocusStyle",
      value: function setFocusStyle(style) {
        this.focusStyle = style;
        return this;
      }
    }, {
      key: "setCursorStyle",
      value: function setCursorStyle(style) {
        this.cursorStyle = style;
        return this;
      }
    }, {
      key: "setNumberInput",
      value: function setNumberInput() {
        this.textEdit.setNumberInput().setSelectAllWhenFocusEnable();
        this.parseTextCallback = Number;
        return this;
      }
    }, {
      key: "maxLength",
      get: function get() {
        return this.textEdit.maxLength;
      },
      set: function set(value) {
        this.textEdit.maxLength = value;
      }
    }, {
      key: "setMaxLength",
      value: function setMaxLength(value) {
        this.maxLength = value;
        return this;
      }
    }, {
      key: "minLength",
      get: function get() {
        return this.textEdit.minLength;
      },
      set: function set(value) {
        this.textEdit.minLength = value;
      }
    }, {
      key: "setMinLength",
      value: function setMinLength(value) {
        this.minLength = value;
        return this;
      }
    }, {
      key: "topTextOY",
      get: function get() {
        return 0;
      }
    }, {
      key: "bottomTextOY",
      get: function get() {
        return -this.tableVisibleHeight;
      }
    }, {
      key: "leftTextOX",
      get: function get() {
        return 0;
      }
    }, {
      key: "rightTextOX",
      get: function get() {
        return -this.textVisibleWidth;
      }
    }, {
      key: "textVisibleHeight",
      get: function get() {
        var h = this.contentHeight - this.height;
        if (h < 0) {
          h = 0;
        }
        return h;
      }
    }, {
      key: "textVisibleWidth",
      get: function get() {
        var w = this.contentWidth - this.width;
        if (w < 0) {
          w = 0;
        }
        return w;
      }
    }, {
      key: "t",
      get: function get() {
        return this.getTextOYPercentage();
      },
      set: function set(value) {
        this.setTextOYByPercentage(value).updateTexture();
      }
    }, {
      key: "s",
      get: function get() {
        return this.getTextOXPercentage();
      },
      set: function set(value) {
        this.setTextOXByPercentage(value).updateTexture();
      }
    }]);
    return CanvasInput;
  }(DynamicText);
  var DefaultParseTextCallback = function DefaultParseTextCallback(text) {
    return text;
  };
  Object.assign(CanvasInput.prototype, SetTextOXYMethods);

  function CanvasInputFactory (x, y, width, height, config) {
    var gameObject = new CanvasInput(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function CanvasInputCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    var gameObject = new CanvasInput(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
  }

  var CanvasInputPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(CanvasInputPlugin, _Phaser$Plugins$BaseP);
    function CanvasInputPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, CanvasInputPlugin);
      _this = _callSuper(this, CanvasInputPlugin, [pluginManager]);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexCanvasInput', CanvasInputFactory, CanvasInputCreator);
      return _this;
    }
    _createClass(CanvasInputPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return CanvasInputPlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.CanvasInput', CanvasInput);

  return CanvasInputPlugin;

}));
