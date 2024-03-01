(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcanvasdataplugin = factory());
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

  var Linear = Phaser.Math.Linear;
  var InterpolateColor32 = function InterpolateColor32(color0, color1, t) {
    var r0 = color0 >> 16 & 0xff;
    var g0 = color0 >> 8 & 0xff;
    var b0 = color0 & 0xff;
    var a0 = color0 >> 24 & 0xff;
    var r1 = color1 >> 16 & 0xff;
    var g1 = color1 >> 8 & 0xff;
    var b1 = color1 & 0xff;
    var a1 = color1 >> 24 & 0xff;
    var r = Linear(r0, r1, t);
    var g = Linear(g0, g1, t);
    var b = Linear(b0, b1, t);
    var a = Linear(a0, a1, t);
    return a << 24 | r << 16 | g << 8 | b;
  };

  var Color = Phaser.Display.Color;
  var Color32Methods = {
    rgbaToColor32: function rgbaToColor32(r, g, b, a) {
      return a << 24 | r << 16 | g << 8 | b;
    },
    color32ToColorInt: function color32ToColorInt(color32) {
      return color32 & 0xffffff;
    },
    color32ToAlpha: function color32ToAlpha(color32) {
      return color32 >>> 24;
    },
    color32ToColorObject: function color32ToColorObject(color32, out) {
      var r = color32 >> 16 & 0xff;
      var g = color32 >> 8 & 0xff;
      var b = color32 & 0xff;
      var a = color32 >> 24 & 0xff;
      if (out === undefined) {
        out = new Color(r, b, g, a);
      } else {
        out.setTo(r, b, g, a);
      }
      return out;
    },
    interpolateColor32: InterpolateColor32
  };

  var CanvasData = /*#__PURE__*/function () {
    function CanvasData(BufferClass, width, height) {
      _classCallCheck(this, CanvasData);
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = width;
      }
      this.width = width;
      this.height = height;
      this.buffer = new BufferClass(width * height);
    }
    _createClass(CanvasData, [{
      key: "destroy",
      value: function destroy() {
        this.buffer.destroy();
        this.buffer = undefined;
      }
    }, {
      key: "getOffset",
      value: function getOffset(x, y) {
        return y * this.width + x;
      }
    }, {
      key: "get",
      value: function get(x, y) {
        var offset;
        if (arguments.length === 2) {
          offset = this.getOffset(x, y);
        } else {
          offset = x;
        }
        return this.buffer.get(offset);
      }
    }, {
      key: "set",
      value: function set(x, y, value) {
        var offset;
        if (arguments.length === 3) {
          offset = this.getOffset(x, y);
        } else {
          offset = x;
          value = y;
        }
        this.buffer.set(offset, value);
        return this;
      }
    }, {
      key: "fill",
      value: function fill(canvas, x, y, width, height, callback, scope) {
        if (typeof canvas === 'number') {
          var value = canvas;
          this.buffer.fill(value);
        } else {
          if (x === undefined) {
            x = 0;
          }
          if (y === undefined) {
            y = 0;
          }
          if (width === undefined) {
            width = canvas.width - x;
          }
          if (height === undefined) {
            height = canvas.height - y;
          }
          this.resize(width, height);
          var context = canvas.getContext('2d', {
            willReadFrequently: true
          });
          var imgData = context.getImageData(x, y, width, height).data;
          var pixels = imgData.length,
            imgDataIndex;
          var value;
          for (var i = 0, cnt = pixels / 4; i < cnt; i++) {
            imgDataIndex = i * 4;
            if (scope) {
              value = callback.call(scope, imgData, imgDataIndex);
            } else {
              value = callback(imgData, imgDataIndex);
            }
            this.set(i, value);
          }
        }
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.fill(0);
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        if (this.width === width && this.height === height) {
          return this;
        }
        this.width = width;
        this.height = height;
        this.buffer.resize(width * height);
        return this;
      }
    }, {
      key: "forEach",
      value: function forEach(callback, scope, skipZero) {
        if (skipZero === undefined) {
          skipZero = false;
        }
        var value;
        for (var y = 0, h = this.height; y < h; y++) {
          for (var x = 0, w = this.width; x < w; x++) {
            value = this.get(x, y);
            if (skipZero && (value === 0 || value === false)) {
              continue;
            }
            if (scope) {
              callback.call(scope, value, x, y, this);
            } else {
              callback(value, x, y, this);
            }
          }
        }
        return this;
      }
    }, {
      key: "forEachNonZero",
      value: function forEachNonZero(callback, scope) {
        this.forEach(callback, scope, true);
        return this;
      }
    }]);
    return CanvasData;
  }();
  Object.assign(CanvasData.prototype, Color32Methods);

  var CanvasToData = function CanvasToData(canvas, x, y, width, height, BufferClass, fillCallback, fillCallbackScope, out) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (width === undefined) {
      width = canvas.width - x;
    }
    if (height === undefined) {
      height = canvas.height - y;
    }
    if (out === undefined) {
      out = new CanvasData(BufferClass, width, height);
    }
    out.fill(canvas, x, y, width, height, fillCallback, fillCallbackScope);
    return out;
  };

  var COLS = 8;
  var SHIFT = 3;
  var BooleanBuffer = /*#__PURE__*/function () {
    function BooleanBuffer(size) {
      _classCallCheck(this, BooleanBuffer);
      this.resize(size);
    }
    _createClass(BooleanBuffer, [{
      key: "destroy",
      value: function destroy() {
        this._rows = undefined;
        this._buf = undefined;
        this._bin = undefined;
      }
    }, {
      key: "get",
      value: function get(offset) {
        var row = offset >> SHIFT;
        var col = offset % COLS;
        var bit = 1 << col;
        return (this._bin[row] & bit) > 0;
      }
    }, {
      key: "set",
      value: function set(offset, value) {
        var row = offset >> SHIFT;
        var col = offset % COLS;
        var bit = 1 << col;
        if (value) {
          this._bin[row] |= bit;
        } else {
          bit = 255 ^ bit;
          this._bin[row] &= bit;
        }
        return this;
      }
    }, {
      key: "fill",
      value: function fill(value) {
        value = value ? 255 : 0;
        for (var i = 0, cnt = this._rows; i < cnt; i++) {
          this._bin[i] = value;
        }
        return this;
      }
    }, {
      key: "resize",
      value: function resize(size) {
        var rows = (size >> SHIFT) + 1;
        if (rows !== this._rows) {
          this._rows = rows;
          this._buf = new ArrayBuffer(this._rows);
          this._bin = new Uint8Array(this._buf);
        }
        return this;
      }
    }]);
    return BooleanBuffer;
  }();

  var FillCallback$1 = function FillCallback(imgData, imgDataIndex) {
    return imgData[imgDataIndex + 3] > 0;
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var CanvasObjectToBitmap = function CanvasObjectToBitmap(canvasObject, config, out) {
    if (config instanceof CanvasData) {
      out = config;
      config = undefined;
    }
    var x = GetValue$1(config, 'x', undefined);
    var y = GetValue$1(config, 'y', undefined);
    var width = GetValue$1(config, 'width', undefined);
    var height = GetValue$1(config, 'height', undefined);
    return CanvasToData(canvasObject.canvas,
    // canvas
    x, y, width, height,
    // x, y, width, height
    BooleanBuffer, FillCallback$1, undefined,
    // BufferClass, fillCallback, fillCallbackScope
    out);
  };

  var FourBytesBuffer = /*#__PURE__*/function () {
    function FourBytesBuffer(size) {
      _classCallCheck(this, FourBytesBuffer);
      this.resize(size);
    }
    _createClass(FourBytesBuffer, [{
      key: "destroy",
      value: function destroy() {
        this._rows = undefined;
        this._buf = undefined;
        this._colors = undefined;
      }
    }, {
      key: "get",
      value: function get(offset) {
        return this._colors[offset];
      }
    }, {
      key: "set",
      value: function set(offset, value) {
        this._colors[offset] = value;
        return this;
      }
    }, {
      key: "fill",
      value: function fill(value) {
        for (var i = 0, cnt = this._rows; i < cnt; i++) {
          this._colors[i] = value;
        }
        return this;
      }
    }, {
      key: "resize",
      value: function resize(size) {
        if (size !== this._rows) {
          this._rows = size;
          this._buf = new ArrayBuffer(this._rows * 4);
          this._colors = new Uint32Array(this._buf);
        }
        return this;
      }
    }]);
    return FourBytesBuffer;
  }();

  var FillCallback = function FillCallback(imgData, imgDataIndex) {
    return imgData[imgDataIndex + 3] << 24 | imgData[imgDataIndex + 0] << 16 | imgData[imgDataIndex + 1] << 8 | imgData[imgDataIndex + 2];
  };

  var GameObjectClass = Phaser.GameObjects.GameObject;
  var IsGameObject = function IsGameObject(object) {
    return object instanceof GameObjectClass;
  };

  var CopyFrameToCanvas = function CopyFrameToCanvas(frame, canvas) {
    canvas.width = frame.cutWidth;
    canvas.height = frame.cutHeight;
    var context = canvas.getContext('2d', {
      willReadFrequently: true
    });
    context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight);
    return canvas;
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;
  var TextureTColorMap = function TextureTColorMap(key, frameName, config, out) {
    var frame;
    if (typeof key === 'string') {
      if (typeof frameName !== 'string') {
        out = config;
        config = frameName;
        frameName = undefined;
      }
      frame = this.textureManager.getFrame(key, frameName);
    } else {
      frame = IsGameObject(key) ? key.frame : key;
      out = config;
      config = frameName;
    }
    if (config instanceof CanvasData) {
      out = config;
      config = undefined;
    }
    var hasDefaultCanvas = this._tmpCanvas !== undefined;
    var canvas = hasDefaultCanvas ? this._tmpCanvas : CanvasPool$1.create2D(this, undefined, undefined, undefined, true);
    var x = GetValue(config, 'x', undefined);
    var y = GetValue(config, 'y', undefined);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);
    out = CanvasToData(CopyFrameToCanvas(frame, canvas),
    // canvas
    x, y, width, height,
    // x, y, width, height
    FourBytesBuffer, FillCallback, undefined,
    // BufferClass, fillCallback, fillCallbackScope
    out);
    if (!hasDefaultCanvas) {
      CanvasPool$1.remove(canvas);
    } else {
      canvas.width = 1;
      canvas.height = 1;
    }
    return out;
  };

  var Methods = {
    textObjectToBitmap: CanvasObjectToBitmap,
    canvasObjectToBitmap: CanvasObjectToBitmap,
    textureTColorMap: TextureTColorMap
  };

  var CanvasPool = Phaser.Display.Canvas.CanvasPool;
  var CanvasDataPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(CanvasDataPlugin, _Phaser$Plugins$BaseP);
    function CanvasDataPlugin(pluginManager) {
      _classCallCheck(this, CanvasDataPlugin);
      return _callSuper(this, CanvasDataPlugin, [pluginManager]);
    }
    _createClass(CanvasDataPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
        this._tmpCanvas = CanvasPool.create2D(this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        CanvasPool.remove(this._tmpCanvas);
        this._tmpCanvas = undefined;
        _get(_getPrototypeOf(CanvasDataPlugin.prototype), "destroy", this).call(this);
      }
    }, {
      key: "textureManager",
      get: function get() {
        return this.game.textures;
      }
    }]);
    return CanvasDataPlugin;
  }(Phaser.Plugins.BasePlugin);
  Object.assign(CanvasDataPlugin.prototype, Methods);

  return CanvasDataPlugin;

}));
