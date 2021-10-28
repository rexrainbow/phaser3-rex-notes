(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbitmapzoneplugin = factory());
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

  var GetRandom = Phaser.Utils.Array.GetRandom;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var BitmapZone = /*#__PURE__*/function () {
    function BitmapZone(canvasObject, config) {
      _classCallCheck(this, BitmapZone);

      this.data = [];
      this.setSource(canvasObject, config);
    }

    _createClass(BitmapZone, [{
      key: "setSource",
      value: function setSource(canvasObject, config) {
        var canvas = canvasObject.canvas;
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var width = GetValue(config, 'width', canvas.width - x);
        var height = GetValue(config, 'height', canvas.height - y);
        var context = canvas.getContext('2d');
        var imgData = context.getImageData(x, y, width, height).data;
        var data = this.data;
        data.length = 0;

        for (var i = 0, cnt = imgData.length / 4; i < cnt; i++) {
          if (imgData[i * 4 + 3] > 0) {
            data.push(i);
          }
        }

        this.width = width;
        this.height = height;
        var scaleX = GetValue(config, 'scaleX', canvasObject);
        var scaleY = GetValue(config, 'scaleY', undefined);
        this.setScale(scaleX, scaleY);
        var offsetX = GetValue(config, 'offsetX', canvasObject);
        var offsetY = GetValue(config, 'offsetY', undefined);
        this.setOffset(offsetX, offsetY);
        return this;
      }
    }, {
      key: "setOffset",
      value: function setOffset(offsetX, offsetY) {
        if (typeof offsetX !== 'number') {
          var canvasObject = offsetX;
          offsetX = -(canvasObject.originX * canvasObject.displayWidth);
          offsetY = -(canvasObject.originY * canvasObject.displayHeight);
        }

        this.offsetX = offsetX;
        this.offsetY = offsetY;
        return this;
      }
    }, {
      key: "setScale",
      value: function setScale(scaleX, scaleY) {
        if (typeof scaleX !== 'number') {
          var canvasObject = scaleX;
          scaleX = canvasObject.scaleX;
          scaleY = canvasObject.scaleY;
        }

        if (scaleY === undefined) {
          scaleY = scaleX;
        }

        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
      }
    }, {
      key: "getRandomPoint",
      value: function getRandomPoint(out) {
        if (out === undefined) {
          out = {};
        }

        if (this.data.length > 0) {
          var index = GetRandom(this.data);
          var x = index % this.width;
          var y = (index - x) / this.width;
          out.x = x * this.scaleX;
          out.y = y * this.scaleY;
        } else {
          out.x = 0;
          out.y = 0;
        }

        out.x += this.offsetX;
        out.y += this.offsetY;
        return out;
      }
    }]);

    return BitmapZone;
  }();

  var BitmapZonePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(BitmapZonePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(BitmapZonePlugin);

    function BitmapZonePlugin(pluginManager) {
      _classCallCheck(this, BitmapZonePlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(BitmapZonePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(source, config) {
        return new BitmapZone(source, config);
      }
    }]);

    return BitmapZonePlugin;
  }(Phaser.Plugins.BasePlugin);

  return BitmapZonePlugin;

})));
