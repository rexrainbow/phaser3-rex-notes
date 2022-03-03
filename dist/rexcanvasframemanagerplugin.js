(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcanvasframemanagerplugin = factory());
}(this, (function () { 'use strict';

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

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var CanvasFrameManager = /*#__PURE__*/function () {
    function CanvasFrameManager(scene, key, width, height, cellWidth, cellHeight) {
      _classCallCheck(this, CanvasFrameManager);

      if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key');
        width = GetValue(config, 'width');
        height = GetValue(config, 'height');
        cellWidth = GetValue(config, 'cellWidth');
        cellHeight = GetValue(config, 'cellHeight');
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

      this.texture = scene.textures.createCanvas(key, width, height);
      this.canvas = this.texture.getCanvas();
      this.cellWidth = cellWidth;
      this.cellHeight = cellHeight;
      this.columnCount = Math.floor(width / cellWidth);
      this.rowCount = Math.floor(height / cellHeight);
      this.freeIndexes = [];

      for (var i = 0, cnt = this.columnCount * this.rowCount; i < cnt; i++) {
        this.freeIndexes.push(i);
      }

      this.frame2Index = {};
    }

    _createClass(CanvasFrameManager, [{
      key: "isFull",
      get: function get() {
        return this.freeIndexes.length === 0;
      }
    }, {
      key: "getFreeFrameIndex",
      value: function getFreeFrameIndex() {
        return this.freeIndexes.pop();
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
      key: "draw",
      value: function draw(frameName, callback, scope) {
        var index = this.getFreeFrameIndex();

        if (index === undefined) {
          console.warn('Does not have free space.');
          return this;
        }

        var tl = this.getTopLeftPosition(index);
        var frameSize = {
          width: this.cellWidth,
          height: this.cellHeight
        };
        var context = this.canvas.getContext('2d');
        context.save();
        context.translate(tl.x, tl.y);
        context.clearRect(0, 0, frameSize.width, frameSize.height);

        if (scope) {
          callback.call(scope, this.canvas, context, frameSize);
        } else {
          callback(this.canvas, context, frameSize);
        } // frameSize might be changed


        context.restore();
        this.texture.add(frameName, 0, tl.x, tl.y, frameSize.width, frameSize.height);
        this.frame2Index[frameName] = index;
        return this;
      }
    }, {
      key: "paste",
      value: function paste(frameName, gameObject) {
        var srcCanvas = gameObject.canvas;

        if (!srcCanvas) {
          console.warn("Can't get canvas of game object.");
          return this;
        }

        var srcWidth = srcCanvas.width,
            srcHeight = srcCanvas.height;
        this.draw(frameName, function (canvas, context, frameSize) {
          context.drawImage(srcCanvas, 0, 0, srcWidth, srcHeight);
          frameSize.width = srcWidth;
          frameSize.height = srcHeight;
        });
        return this;
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
        if (!this.frame2Index.hasOwnProperty(frameName)) {
          return this;
        }

        var index = this.frame2Index[frameName];
        this.freeIndexes.push(index);
        delete this.frame2Index[frameName];
        this.texture.remove(frameName); // Don't clear canvas

        return this;
      }
    }]);

    return CanvasFrameManager;
  }();

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
      value: function add(scene, key, width, height, cellWidth, cellHeight) {
        return new CanvasFrameManager(scene, key, width, height, cellWidth, cellHeight);
      }
    }]);

    return CanvasFrameManagerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return CanvasFrameManagerPlugin;

})));
