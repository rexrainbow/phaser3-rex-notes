(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbuildarcadeobjectplugin = factory());
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

  var Components = Phaser.Physics.Arcade.Components;

  var BuildArcadeObject = function BuildArcadeObject(gameObject, isStatic) {
    if (!Array.isArray(gameObject)) {
      Build(gameObject, isStatic);
    } else {
      var gameObjects = gameObject;

      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Build(gameObjects[i], isStatic);
      }
    }

    return gameObject;
  };

  var Build = function Build(gameObject, isStatic) {
    if (!gameObject.body) {
      if (isStatic === undefined) {
        isStatic = false;
      }

      gameObject.scene.physics.add.existing(gameObject, isStatic);
    }

    Object.assign(gameObject, Components.Acceleration, Components.Angular, Components.Bounce, Components.Debug, Components.Drag, Components.Enable, Components.Friction, Components.Gravity, Components.Immovable, Components.Mass, Components.Size, Components.Velocity);
    return gameObject;
  };

  var BuildArcadeObjectPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(BuildArcadeObjectPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(BuildArcadeObjectPlugin);

    function BuildArcadeObjectPlugin(pluginManager) {
      _classCallCheck(this, BuildArcadeObjectPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(BuildArcadeObjectPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "build",
      value: function build(gameObject, isStatic) {
        return BuildArcadeObject(gameObject, isStatic);
      }
    }]);

    return BuildArcadeObjectPlugin;
  }(Phaser.Plugins.BasePlugin);

  return BuildArcadeObjectPlugin;

})));
