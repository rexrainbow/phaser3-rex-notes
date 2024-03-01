(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcirclemaskimage = factory());
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
  var CanvasPool = Phaser.Display.Canvas.CanvasPool;
  var GameObject = Phaser.GameObjects.GameObject;
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
      _this.canvas = CanvasPool.create(_assertThisInitialized(_this), width, height);
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
        CanvasPool.remove(this.canvas);
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
  }(GameObject);
  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Canvas, [Components.Alpha, Components.BlendMode, Components.Crop, Components.Depth, Components.Flip, Components.GetBounds, Components.Mask, Components.Origin, Components.Pipeline, Components.PostPipeline, Components.ScrollFactor, Components.Tint, Components.Transform, Components.Visible, Render, CanvasMethods, TextureMethods]);

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
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
          defaultRadiusX = GetValue$1(value, 'x', 0);
          defaultRadiusY = GetValue$1(value, 'y', 0);
        }
        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue$1(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue$1(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue$1(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue$1(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
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
      radius.x = GetValue$1(value, 'x', 0);
      radius.y = GetValue$1(value, 'y', 0);
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

  var GetValue = Phaser.Utils.Objects.GetValue;
  var CircleMaskImage = /*#__PURE__*/function (_Canvas) {
    _inherits(CircleMaskImage, _Canvas);
    function CircleMaskImage(scene, x, y, key, frame, config) {
      var _this;
      _classCallCheck(this, CircleMaskImage);
      _this = _callSuper(this, CircleMaskImage, [scene, x, y]);
      _this.type = 'rexCircleMaskImage';
      _this.setTexture(key, frame, config);
      return _this;
    }
    _createClass(CircleMaskImage, [{
      key: "setTexture",
      value: function setTexture(key, frame, config) {
        if (_typeof(frame) === 'object') {
          config = frame;
          frame = undefined;
        }
        if (typeof config === 'string') {
          config = {
            maskType: config
          };
        }
        var maskType = GetValue(config, 'maskType', 0);
        var backgroundColor = GetValue(config, 'backgroundColor', undefined);
        var strokeColor = GetValue(config, 'strokeColor', undefined);
        var defaultStrokeWidth = strokeColor != null ? 10 : 0;
        var strokeWidth = GetValue(config, 'strokeWidth', defaultStrokeWidth);
        if (maskType === undefined) {
          maskType = 0;
        } else if (typeof maskType === 'string') {
          maskType = MASKTYPE[maskType];
        }
        this._textureKey = key;
        this._frameName = frame;
        if (maskType === null) {
          this.loadTexture(key, frame);
          this.dirty = true;
          return this;
        }
        var textureFrame = this.scene.sys.textures.getFrame(key, frame);
        if (!textureFrame) {
          return this;
        }
        // Resize to frame size
        if (textureFrame.cutWidth !== this.width || textureFrame.cutHeight !== this.height) {
          this.setCanvasSize(textureFrame.cutWidth, textureFrame.cutHeight);
        } else {
          this.clear();
        }
        var canvas = this.canvas,
          ctx = this.context;
        var width = canvas.width,
          height = canvas.height;

        // Fill background
        if (backgroundColor != null) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, width, height);
        }
        ctx.save();
        ctx.beginPath();

        // Build clip path 
        var halfStrokeLineWidth = strokeWidth / 2;
        switch (maskType) {
          case 1:
            // ellipse
            var centerX = Math.floor(width / 2);
            var centerY = Math.floor(height / 2);
            var radiusX = centerX - halfStrokeLineWidth;
            var radiusY = centerY - halfStrokeLineWidth;
            ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            break;
          case 2:
            var radiusConfig = GetValue(config, 'radius', 0);
            var iteration = GetValue(config, 'iteration', undefined);
            AddRoundRectanglePath(ctx, halfStrokeLineWidth, halfStrokeLineWidth, width - strokeWidth, height - strokeWidth, radiusConfig, iteration);
            break;
          default:
            // circle
            var centerX = Math.floor(width / 2);
            var centerY = Math.floor(height / 2);
            var radius = Math.min(centerX, centerY) - halfStrokeLineWidth;
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            break;
        }

        // Draw stroke line
        if (strokeColor != null) {
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = strokeWidth;
          ctx.stroke();
        }

        // Clip frame image
        ctx.clip();
        this.loadTexture(key, frame);
        ctx.restore();
        this.dirty = true;
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        // Don't draw content again.
        this.setDisplaySize(width, height);
        return this;
      }
    }]);
    return CircleMaskImage;
  }(Canvas);
  var MASKTYPE = {
    circle: 0,
    ellipse: 1,
    roundRectangle: 2
  };

  return CircleMaskImage;

}));
