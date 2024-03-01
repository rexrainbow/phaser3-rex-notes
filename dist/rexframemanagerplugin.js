(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexframemanagerplugin = factory());
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

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
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

  var GetWhiteFrame = function GetWhiteFrame(game) {
    return GetGame(game).textures.getFrame('__WHITE');
  };

  var DynamicTextureClearRectangle = function DynamicTextureClearRectangle(texture, x, y, width, height) {
    if (WhiteFrameWidth === undefined) {
      var whiteFrame = GetWhiteFrame(texture.manager.game);
      WhiteFrameWidth = whiteFrame.cutWidth;
      WhiteFrameHeight = whiteFrame.cutHeight;
    }
    texture.stamp('__WHITE', undefined, x, y, {
      scaleX: width / WhiteFrameWidth,
      scaleY: height / WhiteFrameHeight,
      originX: 0,
      originY: 0,
      erase: true
    });
    return texture;
  };
  var WhiteFrameWidth;
  var WhiteFrameHeight;

  var Draw = function Draw(frameName, callback, scope) {
    var index = this.getFrameIndex(frameName);
    if (index === -1) {
      index = this.getFrameIndex(undefined);
    }
    if (index === -1) {
      console.warn('Does not have free space.');
      return this;
    }
    var tl = this.getTopLeftPosition(index),
      outerX = tl.x,
      outerY = tl.y,
      cellPadding = this.cellPadding,
      innerX = outerX + cellPadding,
      innerY = outerY + cellPadding;
    ClearFrame.call(this, outerX, outerY, this.outerCellWidth, this.outerCellHeight);
    var frameSize = {
      width: this.cellWidth,
      height: this.cellHeight
    };
    var drawCallback = this.useDynamicTexture ? DrawDynamicTexture : DrawCanvasTexture;
    drawCallback.call(this, innerX, innerY, frameSize, callback, scope);
    // frameSize might be changed

    this.texture.add(frameName, 0, innerX, innerY, frameSize.width, frameSize.height);
    this.addFrameName(index, frameName);
    return this;
  };
  var ClearFrame = function ClearFrame(x, y, width, height) {
    if (this.useDynamicTexture) {
      DynamicTextureClearRectangle(this.texture, x, y, width, height);
    } else {
      this.context.clearRect(x, y, width, height);
    }
  };
  var DrawCanvasTexture = function DrawCanvasTexture(x, y, frameSize, callback, scope) {
    var context = this.context;
    context.save();
    context.translate(x, y);

    // Draw cell
    if (scope) {
      callback.call(scope, this.canvas, context, frameSize);
    } else {
      callback(this.canvas, context, frameSize);
    }
    // frameSize might be changed

    context.restore();
  };
  var DrawDynamicTexture = function DrawDynamicTexture(x, y, frameSize, callback, scope) {
    var texture = this.texture;

    // Draw cell
    texture.camera.setScroll(-x, -y);
    if (scope) {
      callback.call(scope, texture, frameSize);
    } else {
      callback(texture, frameSize);
    }
    texture.camera.setScroll(0, 0);
    // frameSize might be changed
  };

  var GetDisplayWidth = function GetDisplayWidth(gameObject) {
    if (gameObject.displayWidth !== undefined) {
      return gameObject.displayWidth;
    } else {
      return gameObject.width;
    }
  };
  var GetDisplayHeight = function GetDisplayHeight(gameObject) {
    if (gameObject.displayHeight !== undefined) {
      return gameObject.displayHeight;
    } else {
      return gameObject.height;
    }
  };

  var Paste = function Paste(frameName, gameObject) {
    var drawCallback;
    if (this.useDynamicTexture) {
      var srcWidth = GetDisplayWidth(gameObject),
        srcHeight = GetDisplayHeight(gameObject);
      var scale;
      if (srcWidth <= this.cellWidth && srcHeight <= this.cellHeight) {
        scale = 1;
      } else {
        // Scale down and keep ratio
        scale = Math.max(srcWidth / this.cellWidth, srcHeight / this.cellHeight);
      }
      drawCallback = function drawCallback(texture, frameSize) {
        var originXSave = gameObject.originX,
          originYSave = gameObject.originY;
        var scaleXSave = gameObject.scaleX,
          scaleYSave = gameObject.scaleY;
        gameObject.setOrigin(0, 0).setScale(scale, scale);
        texture.draw(gameObject);
        gameObject.setOrigin(originXSave, originYSave).setScale(scaleXSave, scaleYSave);
        frameSize.width = srcWidth / scale;
        frameSize.height = srcHeight / scale;
      };
    } else {
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
      drawCallback = function drawCallback(canvas, context, frameSize) {
        context.drawImage(srcCanvas, 0, 0, dWidth, dHeight);
        frameSize.width = dWidth;
        frameSize.height = dHeight;
      };
    }
    this.draw(frameName, drawCallback);
    return this;
  };

  var AddEmptyFrame = function AddEmptyFrame(frameName, width, height) {
    if (width === undefined) {
      width = this.cellWidth;
    }
    if (height === undefined) {
      height = this.cellHeight;
    }
    var drawCallback;
    if (this.useDynamicTexture) {
      drawCallback = function drawCallback(texture, frameSize) {
        frameSize.width = width;
        frameSize.height = height;
      };
    } else {
      drawCallback = function drawCallback(canvas, context, frameSize) {
        frameSize.width = width;
        frameSize.height = height;
      };
    }
    this.draw(frameName, drawCallback);
    return this;
  };

  var RemoveMethods = {
    // Remove a frame
    remove: function remove(frameName) {
      var index = this.getFrameIndex(frameName);
      if (index === -1) {
        return this;
      }
      this.addFrameName(index, undefined);
      this.texture.remove(frameName);

      // Don't clear canvas

      return this;
    },
    // Remove all frames
    clear: function clear() {
      for (var i, cnt = this.frameNames.length; i < cnt; i++) {
        var frameName = this.frameNames[i];
        if (frameName !== undefined) {
          this.addFrameName(index, undefined);
          this.texture.remove(frameName);
        }
      }
      return this;
    }
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
  Object.assign(methods, RemoveMethods);

  var CreateTexture = function CreateTexture(game, key, width, height, useDynamicTexture) {
    game = GetGame(game);
    if (useDynamicTexture === undefined) {
      useDynamicTexture = false;
    }
    var textureManager = game.textures;
    if (textureManager.exists(key)) {
      textureManager.remove(key);
    }
    var methodName = useDynamicTexture ? 'addDynamicTexture' : 'createCanvas';
    return textureManager[methodName](key, width, height);
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var FrameManager = /*#__PURE__*/function () {
    function FrameManager(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
      _classCallCheck(this, FrameManager);
      var columns, rows, cellPadding;
      if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key');
        width = GetValue(config, 'width');
        height = GetValue(config, 'height');
        cellWidth = GetValue(config, 'cellWidth');
        cellHeight = GetValue(config, 'cellHeight');
        cellPadding = GetValue(config, 'cellPadding', 0);
        columns = GetValue(config, 'columns');
        rows = GetValue(config, 'rows');
        fillColor = GetValue(config, 'fillColor');
        useDynamicTexture = GetValue(config, 'useDynamicTexture');
      } else {
        if (typeof fillColor === 'boolean') {
          useDynamicTexture = fillColor;
          fillColor = undefined;
        }
      }
      if (cellWidth === undefined) {
        cellWidth = 64;
      }
      if (cellHeight === undefined) {
        cellHeight = 64;
      }
      if (cellPadding === undefined) {
        cellPadding = 0;
      }
      this.cellWidth = cellWidth;
      this.cellHeight = cellHeight;
      this.cellPadding = cellPadding;
      if (columns) {
        width = this.outerCellWidth * columns;
      } else {
        if (width === undefined) {
          width = 4096;
        }
        columns = Math.floor(width / this.outerCellWidth);
      }
      if (rows) {
        height = this.outerCellWidth * rows;
      } else {
        if (height === undefined) {
          height = 4096;
        }
        rows = Math.floor(height / this.outerCellWidth);
      }
      if (useDynamicTexture === undefined) {
        useDynamicTexture = false;
      }
      var game = GetGame(scene);
      this.useDynamicTexture = useDynamicTexture;
      this.texture = CreateTexture(game, key, width, height, useDynamicTexture);
      this.canvas = useDynamicTexture ? undefined : this.texture.getCanvas();
      this.context = useDynamicTexture ? undefined : this.texture.getContext();
      this.bitmapFontCache = game.cache.bitmapFont;
      if (fillColor !== undefined) {
        if (useDynamicTexture) {
          this.texture.fill(fillColor);
        } else {
          var context = this.context;
          context.fillStyle = fillColor;
          context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
      this.key = key;
      this.width = width;
      this.height = height;
      this.columns = columns;
      this.rows = rows;
      this.totalCount = this.columns * this.rows;
      this.frameNames = Array(this.totalCount);
      for (var i = 0, cnt = this.frameNames.length; i < cnt; i++) {
        this.frameNames[i] = undefined;
      }
    }
    _createClass(FrameManager, [{
      key: "outerCellWidth",
      get: function get() {
        return this.cellWidth + this.cellPadding * 2;
      }
    }, {
      key: "outerCellHeight",
      get: function get() {
        return this.cellHeight + this.cellPadding * 2;
      }
    }, {
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
      key: "contains",
      value: function contains(frameName) {
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
        var columnIndex = frameIndex % this.columns;
        var rowIndex = Math.floor(frameIndex / this.columns);
        out.x = columnIndex * (this.cellWidth + this.cellPadding * 2);
        out.y = rowIndex * (this.cellHeight + this.cellPadding * 2);
        return out;
      }
    }, {
      key: "updateTexture",
      value: function updateTexture() {
        if (this.useDynamicTexture) ; else {
          this.texture.refresh();
        }
        return this;
      }
    }]);
    return FrameManager;
  }();
  Object.assign(FrameManager.prototype, methods);

  var FrameManagerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(FrameManagerPlugin, _Phaser$Plugins$BaseP);
    function FrameManagerPlugin(pluginManager) {
      _classCallCheck(this, FrameManagerPlugin);
      return _callSuper(this, FrameManagerPlugin, [pluginManager]);
    }
    _createClass(FrameManagerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
        return new FrameManager(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture);
      }
    }]);
    return FrameManagerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return FrameManagerPlugin;

}));
