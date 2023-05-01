(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexrandomplaceplugin = factory());
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

  var CameraClass = Phaser.Cameras.Scene2D.BaseCamera;
  var IsCameraObject = function IsCameraObject(object) {
    return object instanceof CameraClass;
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var GetViewport = function GetViewport(scene, camera, out) {
    if (!IsCameraObject(camera)) {
      out = camera;
      camera = undefined;
    }
    if (out === undefined) {
      out = new Rectangle();
    } else if (out === true) {
      out = globRect;
    }
    if (camera) {
      return scene.scale.getViewPort(camera, out);
    } else {
      return scene.scale.getViewPort(out);
    }
  };
  var globRect = new Rectangle();

  var GetValue = Phaser.Utils.Objects.GetValue;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var Circle = Phaser.Geom.Circle;
  var CircleToCircle = Phaser.Geom.Intersects.CircleToCircle;
  var RandomPlace = function RandomPlace(items, options) {
    if (items.length === 0) {
      return items;
    }
    var getPositionCallback = GetValue(options, 'getPositionCallback', undefined);
    if (getPositionCallback === undefined) {
      var area = GetValue(options, 'area', undefined);
      if (area === undefined) {
        var item0 = items[0],
          gameObject;
        if (IsPlainObject(item0)) {
          gameObject = item0.gameObject;
        } else {
          gameObject = item0;
        }
        area = GetViewport(gameObject.scene);
      }
      getPositionCallback = area.getRandomPoint.bind(area);
    }
    var defaultRadius = GetValue(options, 'radius', 0);
    var item, gameObject, radius;
    var collisionCircles = [];
    for (var i = 0, cnt = items.length; i < cnt; i++) {
      item = items[i];
      if (IsPlainObject(item)) {
        gameObject = GetValue(item, 'gameObject', undefined);
        radius = GetValue(item, 'radius', defaultRadius);
      } else {
        gameObject = item;
        radius = defaultRadius;
      }
      if (!gameObject) {
        continue;
      }
      if (radius <= 0) {
        getPositionCallback(gameObject);
      } else {
        var circle = new Circle(0, 0, radius);
        var isOverlapping;
        do {
          getPositionCallback(circle);
          isOverlapping = false;
          for (var ci = 0, ccnt = collisionCircles.length; ci < ccnt; ci++) {
            isOverlapping = CircleToCircle(circle, collisionCircles[ci]);
            if (isOverlapping) {
              break;
            }
          }
        } while (isOverlapping);
        collisionCircles.push(circle);
        gameObject.setPosition(circle.x, circle.y);
      }
    }
    return items;
  };

  var RandomPlacePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(RandomPlacePlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(RandomPlacePlugin);
    function RandomPlacePlugin(pluginManager) {
      _classCallCheck(this, RandomPlacePlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(RandomPlacePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "randomPlace",
      value: function randomPlace(items, options) {
        return RandomPlace(items, options);
      }
    }]);
    return RandomPlacePlugin;
  }(Phaser.Plugins.BasePlugin);

  return RandomPlacePlugin;

}));
