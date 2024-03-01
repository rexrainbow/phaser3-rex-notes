(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexmousewheeltoupdownplugin = factory());
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

  var Key = Phaser.Input.Keyboard.Key;
  var KeyCodes = Phaser.Input.Keyboard.KeyCodes;
  var CursorKeys = /*#__PURE__*/function () {
    function CursorKeys(scene) {
      _classCallCheck(this, CursorKeys);
      // scene: scene instance, or undefined
      this.cursorKeys = {
        up: new Key(scene, KeyCodes.UP),
        down: new Key(scene, KeyCodes.DOWN),
        left: new Key(scene, KeyCodes.LEFT),
        right: new Key(scene, KeyCodes.RIGHT)
      };
      this.noKeyDown = true;
    }
    _createClass(CursorKeys, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        for (var key in this.cursorKeys) {
          this.cursorKeys[key].destroy();
        }
        this.cursorKeys = undefined;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        shutdown(fromScene);
      }
    }, {
      key: "createCursorKeys",
      value: function createCursorKeys() {
        return this.cursorKeys;
      }
    }, {
      key: "setKeyState",
      value: function setKeyState(keyName, isDown) {
        var key = this.cursorKeys[keyName];
        if (!key.enabled) {
          return this;
        }
        if (isDown) {
          this.noKeyDown = false;
        }
        if (key.isDown !== isDown) {
          FakeEvent.timeStamp = Date.now();
          FakeEvent.keyCode = key.keyCode;
          if (isDown) {
            key.onDown(FakeEvent);
          } else {
            key.onUp(FakeEvent);
          }
        }
        return this;
      }
    }, {
      key: "clearAllKeysState",
      value: function clearAllKeysState() {
        this.noKeyDown = true;
        for (var keyName in this.cursorKeys) {
          this.setKeyState(keyName, false);
        }
        return this;
      }
    }, {
      key: "getKeyState",
      value: function getKeyState(keyName) {
        return this.cursorKeys[keyName];
      }
    }, {
      key: "upKeyDown",
      get: function get() {
        return this.cursorKeys.up.isDown;
      }
    }, {
      key: "downKeyDown",
      get: function get() {
        return this.cursorKeys.down.isDown;
      }
    }, {
      key: "leftKeyDown",
      get: function get() {
        return this.cursorKeys.left.isDown;
      }
    }, {
      key: "rightKeyDown",
      get: function get() {
        return this.cursorKeys.right.isDown;
      }
    }, {
      key: "anyKeyDown",
      get: function get() {
        return !this.noKeyDown;
      }
    }]);
    return CursorKeys;
  }();
  var FakeEvent = {
    timeStamp: 0,
    keyCode: 0,
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    metaKey: false,
    location: 0
  };

  var MouseWheelToUpDown = /*#__PURE__*/function (_CursorKeys) {
    _inherits(MouseWheelToUpDown, _CursorKeys);
    function MouseWheelToUpDown(scene, config) {
      var _this;
      _classCallCheck(this, MouseWheelToUpDown);
      _this = _callSuper(this, MouseWheelToUpDown, [scene]);
      _this.scene = scene;
      _this.boot();
      return _this;
    }
    _createClass(MouseWheelToUpDown, [{
      key: "boot",
      value: function boot() {
        this.scene.input.on('wheel', this.onWheeling, this);
        this.scene.sys.events.on('postupdate', this.clearAllKeysState, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        if (!this.scene) {
          return;
        }
        this.scene.input.off('wheel', this.onWheeling, this);
        this.scene.sys.events.off('postupdate', this.clearAllKeysState, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.scene = undefined;
        _get(_getPrototypeOf(MouseWheelToUpDown.prototype), "shutdown", this).call(this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "onWheeling",
      value: function onWheeling(pointer, currentlyOver, dx, dy, dz, event) {
        this.setKeyState('up', dy < 0);
        this.setKeyState('down', dy > 0);
      }
    }, {
      key: "up",
      get: function get() {
        return this.upKeyDown;
      }
    }, {
      key: "down",
      get: function get() {
        return this.downKeyDown;
      }
    }, {
      key: "noKey",
      get: function get() {
        return this.noKeyDown;
      }
    }]);
    return MouseWheelToUpDown;
  }(CursorKeys);

  var MouseWheelToUpDownPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(MouseWheelToUpDownPlugin, _Phaser$Plugins$BaseP);
    function MouseWheelToUpDownPlugin(pluginManager) {
      _classCallCheck(this, MouseWheelToUpDownPlugin);
      return _callSuper(this, MouseWheelToUpDownPlugin, [pluginManager]);
    }
    _createClass(MouseWheelToUpDownPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, config) {
        return new MouseWheelToUpDown(scene, config);
      }
    }]);
    return MouseWheelToUpDownPlugin;
  }(Phaser.Plugins.BasePlugin);

  return MouseWheelToUpDownPlugin;

}));
