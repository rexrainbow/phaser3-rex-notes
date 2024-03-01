(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcutjigsawimageplugin = factory());
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

  var RandomPieceEdges = function RandomPieceEdges(columns, rows) {
    var edges = [];
    for (var c = 0; c < columns; c++) {
      edges.push(new Array(rows));
    }
    var left, right, top, bottom;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < columns; c++) {
        // left
        if (c === 0) {
          left = 0;
        } else {
          var neighborEdge = edges[c - 1][r].right;
          left = neighborEdge === 1 ? 2 : 1;
        }

        // top
        if (r === 0) {
          top = 0;
        } else {
          var neighborEdge = edges[c][r - 1].bottom;
          top = neighborEdge === 1 ? 2 : 1;
        }

        // right
        if (c === columns - 1) {
          right = 0;
        } else {
          right = Math.random() > 0.5 ? 2 : 1;
        }

        // bottom
        if (r === rows - 1) {
          bottom = 0;
        } else {
          bottom = Math.random() > 0.5 ? 2 : 1;
        }
        edges[c][r] = {
          left: left,
          right: right,
          top: top,
          bottom: bottom
        };
      }
    }
    return edges;
  };

  var DegToRad = Phaser.Math.DegToRad;
  var RAD0 = DegToRad(0);
  var RAD90 = DegToRad(90);
  var RAD180 = DegToRad(180);
  var RAD270 = DegToRad(270);
  var RAD360 = DegToRad(360);
  var DefaultDrawShapeCallback = function DefaultDrawShapeCallback(
  // graphics for dynamic texture
  // context for canvas texture
  graphics, width, height, edgeWidth, edgeHeight, edgeMode) {
    var centerX = width / 2,
      centerY = height / 2;
    var leftX = edgeWidth,
      rightX = width - edgeWidth,
      topY = edgeHeight,
      bottomY = height - edgeHeight;
    graphics.clear();
    graphics.beginPath();
    graphics.moveTo(leftX, topY);
    switch (edgeMode.top) {
      case 1:
        graphics.lineTo(centerX - edgeHeight, topY);
        graphics.arc(centerX, topY, edgeHeight, RAD180, RAD360, false);
        break;
      case 2:
        graphics.lineTo(centerX - edgeHeight, topY);
        graphics.arc(centerX, topY, edgeHeight, RAD180, RAD360, true);
        break;
    }
    graphics.lineTo(rightX, topY);
    switch (edgeMode.right) {
      case 1:
        graphics.arc(rightX, centerY, edgeWidth, RAD270, RAD90, false);
        break;
      case 2:
        graphics.arc(rightX, centerY, edgeWidth, RAD270, RAD90, true);
        break;
    }
    graphics.lineTo(rightX, bottomY);
    switch (edgeMode.bottom) {
      case 1:
        graphics.arc(centerX, bottomY, edgeHeight, RAD0, RAD180, false);
        break;
      case 2:
        graphics.arc(centerX, bottomY, edgeHeight, RAD0, RAD180, true);
        break;
    }
    graphics.lineTo(leftX, bottomY);
    switch (edgeMode.left) {
      case 1:
        graphics.arc(leftX, centerY, edgeWidth, RAD90, RAD270, false);
        break;
      case 2:
        graphics.arc(leftX, centerY, edgeWidth, RAD90, RAD270, true);
        break;
    }
    graphics.lineTo(leftX, topY);
    graphics.closePath();
    graphics.fillPath();
  };

  var JigsawPieceBase = function JigsawPieceBase(GOClass) {
    var BassClass = /*#__PURE__*/function (_GOClass) {
      _inherits(BassClass, _GOClass);
      function BassClass() {
        _classCallCheck(this, BassClass);
        return _callSuper(this, BassClass, arguments);
      }
      _createClass(BassClass, [{
        key: "init",
        value: function init(config) {
          this.setBaseKey(config.key);
          this.setDrawShapeCallback(config.drawShapeCallback);
          var edgeWidth = config.edgeWidth;
          if (edgeWidth === undefined) {
            edgeWidth = Math.floor(config.width / 7);
          }
          this.edgeWidth = edgeWidth;
          var edgeHeight = config.edgeHeight;
          if (edgeHeight === undefined) {
            edgeHeight = Math.floor(config.height / 7);
          }
          this.edgeHeight = edgeHeight;
          return this;
        }
      }, {
        key: "setBaseKey",
        value: function setBaseKey(key) {
          this.sourceKey = key;
          return this;
        }
      }, {
        key: "setDrawShapeCallback",
        value: function setDrawShapeCallback(callback) {
          this.drawShapeCallback = callback;
          return this;
        }

        // Override
      }, {
        key: "drawPiece",
        value: function drawPiece(_ref) {
          _ref.scrollX;
            _ref.scrollY;
            _ref.edgeMode;
        }
      }]);
      return BassClass;
    }(GOClass);
    return BassClass;
  };

  var ConvertEdgeMode = function ConvertEdgeMode(edgeMode) {
    if (typeof edgeMode === 'string') {
      edgeMode = edgeMode.split('').map(function (x) {
        return parseInt(x);
      });
      edgeMode = {
        right: edgeMode[0],
        bottom: edgeMode[1],
        left: edgeMode[2],
        top: edgeMode[3]
      };
    }
    return edgeMode;
  };

  var RenderTexture = Phaser.GameObjects.RenderTexture;
  var JigsawPieceRenderTexurue = /*#__PURE__*/function (_JigsawPieceBase) {
    _inherits(JigsawPieceRenderTexurue, _JigsawPieceBase);
    function JigsawPieceRenderTexurue(scene, config) {
      var _this;
      _classCallCheck(this, JigsawPieceRenderTexurue);
      if (!config.drawShapeCallback) {
        config.drawShapeCallback = DefaultDrawShapeCallback;
      }
      _this = _callSuper(this, JigsawPieceRenderTexurue, [scene, 0, 0, config.width, config.height]);
      _this.init(config);
      var maskGraphics = scene.make.graphics({
        add: false
      });
      _this.setMask(maskGraphics.createGeometryMask());
      _this.maskGraphics = maskGraphics;
      return _this;
    }
    _createClass(JigsawPieceRenderTexurue, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        _get(_getPrototypeOf(JigsawPieceRenderTexurue.prototype), "destroy", this).call(this, fromScene);
        this.maskGraphics.destroy();
        this.maskGraphics = undefined;
      }
    }, {
      key: "drawPiece",
      value: function drawPiece(_ref) {
        var scrollX = _ref.scrollX,
          scrollY = _ref.scrollY,
          edgeMode = _ref.edgeMode;
        // Convert string to plain object
        edgeMode = ConvertEdgeMode(edgeMode);
        this.clear();
        this.camera.setScroll(scrollX, scrollY);
        this.stamp(this.sourceKey, undefined, 0, 0, {
          originX: 0,
          originY: 0
        });
        this.camera.setScroll(0, 0);
        this.maskGraphics.clear();
        this.drawShapeCallback(this.maskGraphics, this.width, this.height, this.edgeWidth, this.edgeHeight, edgeMode);
        return this;
      }
    }]);
    return JigsawPieceRenderTexurue;
  }(JigsawPieceBase(RenderTexture));

  var DrawCanvasPieceCallback = function DrawCanvasPieceCallback(image, context, sx, sy, width, height, edgeWidth, edgeHeight, edgeMode, drawShapeCallback) {
    edgeMode = ConvertEdgeMode(edgeMode);

    // Already translate to dx, dy

    // context.save();

    context.clearRect(0, 0, width, height);
    drawShapeCallback(context, width, height, edgeWidth, edgeHeight, edgeMode);
    context.clip();
    context.drawImage(image,
    // image
    sx, sy, width, height, 0, 0, width, height);

    // context.restore();
  };

  var NOOP = function NOOP() {
    //  NOOP
  };

  var DefaultGetFrameNameCallback = function DefaultGetFrameNameCallback(c, r) {
    return "".concat(c, ",").concat(r);
  };
  var GenerateFrames = function GenerateFrames(scene, _ref) {
    var sourceKey = _ref.sourceKey,
      destinationKey = _ref.destinationKey,
      columns = _ref.columns,
      rows = _ref.rows,
      _ref$framePadding = _ref.framePadding,
      framePadding = _ref$framePadding === void 0 ? 1 : _ref$framePadding,
      edgeWidth = _ref.edgeWidth,
      edgeHeight = _ref.edgeHeight,
      edges = _ref.edges,
      _ref$drawShapeCallbac = _ref.drawShapeCallback,
      drawShapeCallback = _ref$drawShapeCallbac === void 0 ? DefaultDrawShapeCallback : _ref$drawShapeCallbac,
      _ref$useDynamicTextur = _ref.useDynamicTexture,
      useDynamicTexture = _ref$useDynamicTextur === void 0 ? true : _ref$useDynamicTextur,
      _ref$getFrameNameCall = _ref.getFrameNameCallback,
      getFrameNameCallback = _ref$getFrameNameCall === void 0 ? DefaultGetFrameNameCallback : _ref$getFrameNameCall;
    var textureManager = scene.sys.textures;
    var sourceFrame = textureManager.getFrame(sourceKey, '__BASE');
    var sourceFrameWidth = sourceFrame.cutWidth,
      sourceFrameHeight = sourceFrame.height;
    if (edgeWidth === undefined) {
      edgeWidth = Math.floor(sourceFrameWidth / columns / 7);
    }
    if (edgeHeight === undefined) {
      edgeHeight = Math.floor(sourceFrameHeight / rows / 7);
    }
    if (edges === undefined) {
      edges = RandomPieceEdges(columns, rows);
    }
    if (destinationKey === undefined) {
      destinationKey = "".concat(sourceKey, "_pieces");
    }
    var frameWidth = sourceFrameWidth / columns + 2 * edgeWidth;
    var frameHeight = sourceFrameHeight / rows + 2 * edgeHeight;
    if (textureManager.exists(destinationKey)) {
      textureManager.remove(destinationKey);
    }
    var frameManager = new FrameManager(scene, {
      key: destinationKey,
      cellWidth: frameWidth,
      cellHeight: frameHeight,
      cellPadding: framePadding,
      columns: columns,
      rows: rows,
      useDynamicTexture: useDynamicTexture,
      fillColor: 0x888888
    });
    var sample, sourceImage;
    if (useDynamicTexture) {
      // Use dynamic-texture
      sample = new JigsawPieceRenderTexurue(scene, {
        width: frameWidth,
        height: frameHeight,
        edgeWidth: edgeWidth,
        edgeHeight: edgeHeight,
        key: sourceKey,
        drawShapeCallback: drawShapeCallback
      });
    } else {
      // Use canvas-texture
      sourceImage = sourceFrame.source.image;
      // Align interface of canvas-context with graphics
      frameManager.context.clear = NOOP;
      frameManager.context.fillPath = NOOP;
    }
    var startX = -edgeWidth,
      startY = -edgeHeight;
    var scrollX = startX,
      scrollY = startY;
    var frameName, edgeMode;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < columns; c++) {
        frameName = getFrameNameCallback(c, r);
        edgeMode = edges[c][r];
        if (useDynamicTexture) {
          // Use dynamic-texture
          sample.drawPiece({
            scrollX: scrollX,
            scrollY: scrollY,
            edgeMode: edgeMode
          });
          frameManager.paste(frameName, sample);
        } else {
          // Use canvas-texture
          frameManager.draw(frameName, function (canvas, context, frameSize) {
            DrawCanvasPieceCallback(sourceImage, context, scrollX, scrollY, frameWidth, frameHeight, edgeWidth, edgeHeight, edgeMode, drawShapeCallback);
          });
        }
        scrollX += frameWidth - edgeWidth * 2;
      }
      scrollX = startX;
      scrollY += frameHeight - edgeHeight * 2;
    }
    frameManager.updateTexture();
    if (useDynamicTexture) {
      // Use dynamic-texture
      sample.destroy();
    } else {
      // Use canvas-texture
      sourceImage = null;
      delete frameManager.context.clear;
      delete frameManager.context.fillPath;
    }
    frameManager.destroy();
    return {
      sourceKey: sourceKey,
      destinationKey: destinationKey,
      columns: columns,
      rows: rows,
      sourceFrameWidth: sourceFrameWidth,
      sourceFrameHeight: sourceFrameHeight,
      frameWidth: frameWidth,
      frameHeight: frameHeight,
      edgeWidth: edgeWidth,
      edgeHeight: edgeHeight,
      getFrameNameCallback: getFrameNameCallback
    };
  };

  var DefaultImageClass = Phaser.GameObjects.Image;
  var RotateAround = Phaser.Math.RotateAround;
  var CreatePieces = function CreatePieces(gameObject, _ref) {
    var piecesKey = _ref.piecesKey,
      columns = _ref.columns,
      rows = _ref.rows,
      edgeWidth = _ref.edgeWidth,
      edgeHeight = _ref.edgeHeight,
      drawShapeCallback = _ref.drawShapeCallback,
      edges = _ref.edges,
      _ref$useDynamicTextur = _ref.useDynamicTexture,
      useDynamicTexture = _ref$useDynamicTextur === void 0 ? true : _ref$useDynamicTextur,
      createImageCallback = _ref.createImageCallback,
      _ref$ImageClass = _ref.ImageClass,
      ImageClass = _ref$ImageClass === void 0 ? DefaultImageClass : _ref$ImageClass,
      objectPool = _ref.objectPool,
      _ref$add = _ref.add,
      add = _ref$add === void 0 ? true : _ref$add,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? add : _ref$align,
      _ref$originX = _ref.originX,
      originX = _ref$originX === void 0 ? 0.5 : _ref$originX,
      _ref$originY = _ref.originY,
      originY = _ref$originY === void 0 ? 0.5 : _ref$originY;
    var scene = gameObject.scene;
    var sourceKey = gameObject.texture.key;
    var topLeft = gameObject.getTopLeft();
    var topLeftX = topLeft.x;
    var topLeftY = topLeft.y;
    var scaleX = gameObject.scaleX;
    var scaleY = gameObject.scaleY;
    var rotation = gameObject.rotation;
    var result = GenerateFrames(scene, {
      sourceKey: sourceKey,
      destinationKey: piecesKey,
      columns: columns,
      rows: rows,
      edgeWidth: edgeWidth,
      edgeHeight: edgeHeight,
      edges: edges,
      drawShapeCallback: drawShapeCallback,
      useDynamicTexture: useDynamicTexture
    });
    piecesKey = result.destinationKey;
    var getFrameNameCallback = result.getFrameNameCallback;
    var frameWidth = result.frameWidth,
      frameHeight = result.frameHeight;
    var pieceWidth = (frameWidth - edgeWidth * 2) * scaleX,
      pieceHeight = (frameHeight - edgeHeight * 2) * scaleY;
    var pieceDisplayOriginX = originX * frameWidth * scaleX,
      pieceDisplayOriginY = originY * frameHeight * scaleY;
    if (!createImageCallback) {
      createImageCallback = function createImageCallback(scene, key, frame) {
        return new ImageClass(scene, 0, 0, key, frame);
      };
    }
    var pieceGameObjects = [];
    topLeftX -= edgeWidth;
    topLeftY -= edgeHeight;
    var pieceTopLeftX = topLeftX,
      pieceTopLeftY = topLeftY;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < columns; c++) {
        var pieceGameObject;
        var frameName = getFrameNameCallback(c, r);
        if (objectPool && objectPool.length > 0) {
          pieceGameObject = objectPool.pop().setTexture(piecesKey, frameName);
        } else {
          pieceGameObject = createImageCallback(scene, piecesKey, frameName);
        }
        if (add) {
          scene.add.existing(pieceGameObject);
        }
        if (align) {
          var pieceX = pieceTopLeftX + pieceDisplayOriginX;
          var pieceY = pieceTopLeftY + pieceDisplayOriginY;
          pieceGameObject.setOrigin(originX, originY).setPosition(pieceX, pieceY).setScale(scaleX, scaleY).setRotation(rotation);
          RotateAround(pieceGameObject, topLeftX, topLeftY, rotation);
        }
        pieceTopLeftX += pieceWidth;
        pieceGameObjects.push(pieceGameObject);
      }
      pieceTopLeftX = topLeftX;
      pieceTopLeftY += pieceHeight;
    }
    return pieceGameObjects;
  };

  var CutJigsawImagePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(CutJigsawImagePlugin, _Phaser$Plugins$BaseP);
    function CutJigsawImagePlugin(pluginManager) {
      _classCallCheck(this, CutJigsawImagePlugin);
      return _callSuper(this, CutJigsawImagePlugin, [pluginManager]);
    }
    _createClass(CutJigsawImagePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "gridCut",
      value: function gridCut(gameObject, config) {
        return CreatePieces(gameObject, config);
      }
    }]);
    return CutJigsawImagePlugin;
  }(Phaser.Plugins.BasePlugin);

  return CutJigsawImagePlugin;

}));
