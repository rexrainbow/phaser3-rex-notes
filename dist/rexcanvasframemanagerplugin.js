(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcanvasframemanagerplugin = factory());
})(this, (function () { 'use strict';

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
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var Draw = function Draw(frameName, callback, scope) {
    var index = this.getFrameIndex(frameName);
    if (index === -1) {
      index = this.getFrameIndex(undefined);
    }
    if (index === -1) {
      console.warn('Does not have free space.');
      return this;
    }
    var tl = this.getTopLeftPosition(index);
    var frameSize = {
      width: this.cellWidth,
      height: this.cellHeight
    };
    var context = this.context;
    context.save();
    context.translate(tl.x, tl.y);
    context.clearRect(0, 0, frameSize.width, frameSize.height);
    if (scope) {
      callback.call(scope, this.canvas, context, frameSize);
    } else {
      callback(this.canvas, context, frameSize);
    }
    // frameSize might be changed

    context.restore();
    this.texture.add(frameName, 0, tl.x, tl.y, frameSize.width, frameSize.height);
    this.addFrameName(index, frameName);
    return this;
  };

  var Paste = function Paste(frameName, gameObject) {
    var srcCanvas = gameObject.canvas;
    if (!srcCanvas) {
      console.warn("Can't get canvas of game object.");
      return this;
    }
    var srcWidth = srcCanvas.width,
      srcHeight = srcCanvas.height;
    var dWidth, dHeight;
    if (srcWidth <= this.cellWidth && srcHeight <= this.cellHeight) {
      dWidth = srcWidth;
      dHeight = srcHeight;
    } else {
      // Scale down and keep ratio
      var scale = Math.max(srcWidth / this.cellWidth, srcHeight / this.cellHeight);
      dWidth = srcWidth / scale;
      dHeight = srcHeight / scale;
    }
    this.draw(frameName, function (canvas, context, frameSize) {
      context.drawImage(srcCanvas, 0, 0, dWidth, dHeight);
      frameSize.width = dWidth;
      frameSize.height = dHeight;
    });
    return this;
  };

  var AddEmptyFrame = function AddEmptyFrame(frameName, width, height) {
    if (width === undefined) {
      width = this.cellWidth;
    }
    if (height === undefined) {
      height = this.cellHeight;
    }
    this.draw(frameName, function (canvas, context, frameSize) {
      frameSize.width = width;
      frameSize.height = height;
    });
    return this;
  };

  var AddToBitmapFont = function AddToBitmapFont() {
    var textureKey = this.texture.key;
    // Don't add a new font data, reuse current font data
    var cacheData = this.bitmapFontCache.get(textureKey);
    if (!cacheData) {
      cacheData = {
        data: {
          retroFont: true,
          font: textureKey,
          size: this.cellWidth,
          lineHeight: this.cellHeight,
          chars: {}
        },
        texture: textureKey,
        frame: null
      };
      this.bitmapFontCache.add(textureKey, cacheData);
    }
    var charData = cacheData.data.chars;
    var letters = this.frameNames;
    for (var i = 0, cnt = letters.length; i < cnt; i++) {
      var _char = letters[i];
      if (_char === undefined) {
        continue;
      }
      var frame = this.texture.get(_char);
      var x = frame.cutX,
        y = frame.cutY,
        width = frame.cutWidth,
        height = frame.cutHeight;
      charData[_char.charCodeAt(0)] = {
        x: x,
        y: y,
        width: width,
        height: height,
        centerX: x + width / 2,
        centerY: y + height / 2,
        xOffset: 0,
        yOffset: 0,
        xAdvance: width,
        data: {},
        kerning: {},
        u0: frame.u0,
        v0: frame.v0,
        u1: frame.u1,
        v1: frame.v1
      };
    }
    return this;
  };

  var methods = {
    draw: Draw,
    paste: Paste,
    addEmptyFrame: AddEmptyFrame,
    addToBitmapFont: AddToBitmapFont
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var CanvasFrameManager = /*#__PURE__*/function () {
    function CanvasFrameManager(scene, key, width, height, cellWidth, cellHeight, fillColor) {
      _classCallCheck(this, CanvasFrameManager);
      if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key');
        width = GetValue(config, 'width');
        height = GetValue(config, 'height');
        cellWidth = GetValue(config, 'cellWidth');
        cellHeight = GetValue(config, 'cellHeight');
        fillColor = GetValue(config, 'fillColor');
      }
      if (width === undefined) {
        width = 4096;
      }
      if (height === undefined) {
        height = 4096;
      }
      if (cellWidth === undefined) {
        cellWidth = 64;
      }
      if (cellHeight === undefined) {
        cellHeight = 64;
      }
      this.texture = scene.sys.textures.createCanvas(key, width, height);
      this.canvas = this.texture.getCanvas();
      this.context = this.texture.getContext();
      this.bitmapFontCache = scene.sys.cache.bitmapFont;
      if (fillColor !== undefined) {
        var context = this.context;
        context.fillStyle = fillColor;
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
      this.key = key;
      this.width = width;
      this.height = height;
      this.cellWidth = cellWidth;
      this.cellHeight = cellHeight;
      this.columnCount = Math.floor(width / cellWidth);
      this.rowCount = Math.floor(height / cellHeight);
      this.totalCount = this.columnCount * this.rowCount;
      this.frameNames = Array(this.totalCount);
      for (var i = 0, cnt = this.frameNames.length; i < cnt; i++) {
        this.frameNames[i] = undefined;
      }
    }
    _createClass(CanvasFrameManager, [{
      key: "destroy",
      value: function destroy() {
        this.texture = undefined;
        this.canvas = undefined;
        this.context = undefined;
        this.frameNames = undefined;
        this.bitmapFontCache = undefined;
      }
    }, {
      key: "getFrameIndex",
      value: function getFrameIndex(frameName) {
        return this.frameNames.indexOf(frameName);
      }
    }, {
      key: "hasFrameName",
      value: function hasFrameName(frameName) {
        return this.getFrameIndex(frameName) !== -1;
      }
    }, {
      key: "addFrameName",
      value: function addFrameName(index, frameName) {
        this.frameNames[index] = frameName;
        return this;
      }
    }, {
      key: "isFull",
      get: function get() {
        return this.getFrameIndex(undefined) === -1;
      }
    }, {
      key: "getTopLeftPosition",
      value: function getTopLeftPosition(frameIndex, out) {
        if (out === undefined) {
          out = {};
        }
        var columnIndex = frameIndex % this.columnCount;
        var rowIndex = Math.floor(frameIndex / this.rowCount);
        out.x = columnIndex * this.cellWidth;
        out.y = rowIndex * this.cellHeight;
        return out;
      }
    }, {
      key: "updateTexture",
      value: function updateTexture() {
        this.texture.refresh();
        return this;
      }
    }, {
      key: "remove",
      value: function remove(frameName) {
        var index = this.getFrameIndex(frameName);
        if (index === -1) {
          return this;
        }
        this.addFrameName(index, undefined);
        this.texture.remove(frameName);

        // Don't clear canvas

        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        for (var i, cnt = this.frameNames.length; i < cnt; i++) {
          var frameName = this.frameNames[i];
          if (frameName !== undefined) {
            this.addFrameName(index, undefined);
            this.texture.remove(frameName);
          }
        }
        return this;
      }
    }]);
    return CanvasFrameManager;
  }();
  Object.assign(CanvasFrameManager.prototype, methods);

  var CanvasFrameManagerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(CanvasFrameManagerPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(CanvasFrameManagerPlugin);
    function CanvasFrameManagerPlugin(pluginManager) {
      _classCallCheck(this, CanvasFrameManagerPlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(CanvasFrameManagerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, key, width, height, cellWidth, cellHeight, fillColor) {
        return new CanvasFrameManager(scene, key, width, height, cellWidth, cellHeight, fillColor);
      }
    }]);
    return CanvasFrameManagerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return CanvasFrameManagerPlugin;

}));
