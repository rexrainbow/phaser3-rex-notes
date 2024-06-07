(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexkeyshubplugin = factory());
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

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
      }
      this._privateEE = eventEmitter === true || eventEmitter === undefined;
      this._eventEmitter = this._privateEE ? new EventEmitterClass() : eventEmitter;
      return this;
    },
    destroyEventEmitter: function destroyEventEmitter() {
      if (this._eventEmitter && this._privateEE) {
        this._eventEmitter.shutdown();
      }
      return this;
    },
    getEventEmitter: function getEventEmitter() {
      return this._eventEmitter;
    },
    on: function on() {
      if (this._eventEmitter) {
        this._eventEmitter.on.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    once: function once() {
      if (this._eventEmitter) {
        this._eventEmitter.once.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    off: function off() {
      if (this._eventEmitter) {
        this._eventEmitter.off.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    emit: function emit(event) {
      if (this._eventEmitter && event) {
        this._eventEmitter.emit.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    addListener: function addListener() {
      if (this._eventEmitter) {
        this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    removeListener: function removeListener() {
      if (this._eventEmitter) {
        this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    removeAllListeners: function removeAllListeners() {
      if (this._eventEmitter) {
        this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    listenerCount: function listenerCount() {
      if (this._eventEmitter) {
        return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
      }
      return 0;
    },
    listeners: function listeners() {
      if (this._eventEmitter) {
        return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
      }
      return [];
    },
    eventNames: function eventNames() {
      if (this._eventEmitter) {
        return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
      }
      return [];
    }
  };

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetSceneObject = function GetSceneObject(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsSceneObject(object)) {
      // object = scene
      return object;
    } else if (object.scene && IsSceneObject(object.scene)) {
      // object = game object
      return object.scene;
    } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) {
      // parent = bob object
      return object.parent.scene;
    } else {
      return null;
    }
  };

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
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

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$1(config, 'eventEmitter', true));

      // Register callback of parent destroy event, also see `shutdown` method
      if (this.parent) {
        if (this.parent === this.scene) {
          // parent is a scene
          this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent === this.game) {
          // parent is game
          this.game.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent.once) {
          // parent is game object or something else
          this.parent.once('destroy', this.onParentDestroy, this);
        }

        // bob object does not have event emitter
      }
    }
    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // parent might not be shutdown yet
        if (this.parent) {
          if (this.parent === this.scene) {
            // parent is a scene
            this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent === this.game) {
            // parent is game
            this.game.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent.once) {
            // parent is game object or something else
            this.parent.off('destroy', this.onParentDestroy, this);
          }

          // bob object does not have event emitter
        }
        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.game = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onEnvDestroy",
      value: function onEnvDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent; // gameObject, scene, or game

        this.scene = GetSceneObject(parent);
        this.game = GetGame(parent);
        return this;
      }
    }]);
    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  // KeyCodes : Key (string) to KeyCode (number)
  var KeyCodes$1 = Phaser.Input.Keyboard.KeyCodes;
  var KeyMap = {};
  for (var key in KeyCodes$1) {
    KeyMap[KeyCodes$1[key]] = key;
  }

  var Key = Phaser.Input.Keyboard.Key;
  var AddItem = Phaser.Utils.Array.Add;
  var RemoveItem = Phaser.Utils.Array.Remove;
  var KeyHub = /*#__PURE__*/function (_Key) {
    _inherits(KeyHub, _Key);
    function KeyHub(parent, keyCode) {
      var _this;
      _classCallCheck(this, KeyHub);
      _this = _callSuper(this, KeyHub, [parent, keyCode]);
      _this.ports = [];
      return _this;
    }
    _createClass(KeyHub, [{
      key: "destroy",
      value: function destroy() {
        this.unplugAllKeyObject();
        this.ports = undefined;
        _get(_getPrototypeOf(KeyHub.prototype), "destroy", this).call(this);
      }
    }, {
      key: "plugKeyObject",
      value: function plugKeyObject(keyObject) {
        if (keyObject.refKeyHub) {
          keyObject.refKeyHub.unplugKeyObject(keyObject);
        }
        AddItem(this.ports, keyObject, 0, function (keyObject) {
          keyObject.on('down', this.update, this).on('up', this.update, this);
          keyObject.refKeyHub = this;
          this.update(FakeEvent);
          this.plugin.emit('plug', this.key, keyObject);
        }, this);
        return this;
      }
    }, {
      key: "unplugKeyObject",
      value: function unplugKeyObject(keyObject) {
        if (keyObject.refKeyHub !== this) {
          return this;
        }
        RemoveItem(this.ports, keyObject, function (keyObject) {
          keyObject.off('down', this.update, this).off('up', this.update, this);
          keyObject.refKeyHub = undefined;
          this.update(FakeEvent);
          this.plugin.emit('unplug', this.key, keyObject);
        }, this);
        return this;
      }
    }, {
      key: "unplugAllKeyObject",
      value: function unplugAllKeyObject() {
        for (var i = 0, cnt = this.ports; i < cnt; i++) {
          var keyObject = this.ports[i];
          keyObject.off('down', this.update, this).off('up', this.update, this);
          keyObject.refKeyHub = undefined;
        }
        this.ports.length = 0;
        this.update(FakeEvent);
        return this;
      }
    }, {
      key: "getKeyObjects",
      value: function getKeyObjects() {
        return this.ports;
      }
    }, {
      key: "update",
      value: function update(event) {
        //  Override the default functions (it's too late for the browser to use them anyway, so we may as well)
        if (event.cancelled === undefined) {
          //  Event allowed to flow across all handlers in this Scene, and any other Scene in the Scene list
          event.cancelled = 0;

          //  Won't reach any more local (Scene level) handlers
          event.stopImmediatePropagation = function () {
            event.cancelled = 1;
          };

          //  Won't reach any more handlers in any Scene further down the Scene list
          event.stopPropagation = function () {
            event.cancelled = -1;
          };
        }
        if (event.cancelled === -1) {
          //  This event has been stopped from broadcasting to any other Scene, so abort.
          event.cancelled = 0;
          return;
        }
        var isDown = false;
        for (var i = 0, cnt = this.ports.length; i < cnt; i++) {
          if (this.ports[i].isDown) {
            isDown = true;
            break;
          }
        }
        if (this.isDown !== isDown) {
          event = FakeEvent;
          event.timeStamp = Date.now();
          event.keyCode = this.keyCode;
          if (isDown) {
            this.onDown(event);
          } else {
            this.onUp(event);
          }
          if (!event.cancelled) {
            var eventName = (isDown ? 'keydown-' : 'keyup-') + KeyMap[this.keyCode];
            this.plugin.emit(eventName, event);
          }
          if (!event.cancelled) {
            var eventName = isDown ? 'keydown' : 'keyup';
            this.plugin.emit(eventName, event);
          }
        }
        event.cancelled = 0;
      }
    }]);
    return KeyHub;
  }(Key);
  var FakeEvent = {
    timeStamp: 0,
    keyCode: 0,
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    metaKey: false,
    location: 0
  };

  var EventKeyCodeToP3Key = function EventKeyCodeToP3Key(event) {
    var code = event.code.toUpperCase();
    if (code in KeyCodeMap) {
      return KeyCodeMap[code];
    }
    if (code.startsWith('KEY')) {
      code = code.substring('KEY'.length);
      return code;
    }
    if (code.startsWith('ARROW')) {
      code = code.substring('ARROW'.length);
      return code;
    }
    if (code.startsWith('DIGIT')) {
      code = code.substring('DIGIT'.length);
      code = KeyCodeMap[code];
      return code;
    }
    if (code.startsWith('NUMPAD')) {
      code = code.substring('NUMPAD'.length);
      if (code in KeyCodeMap) {
        code = KeyCodeMap[code];
      }
      return "NUMPAD_".concat(code);
    }
    if (code.startsWith('SHIFT')) {
      return 'SHIFT';
    }
    if (code.startsWith('CONTROL')) {
      return 'CTRL';
    }
    if (code.startsWith('ALT')) {
      return 'ALT';
    }
    return code;
  };
  var KeyCodeMap = {
    '0': 'ZERO',
    '1': 'ONE',
    '2': 'TWO',
    '3': 'THREE',
    '4': 'FOUR',
    '5': 'FIVE',
    '6': 'SIX',
    '7': 'SEVEN',
    '8': 'EIGHT',
    '9': 'NINE',
    'CAPSLOCK': 'CAPS_LOCK',
    'ESCAPE': 'ESC',
    'PAGEUP': 'PAGE_UP',
    'PAGEDOWN': 'PAGE_DOWN',
    'QUOTE': 'QUOTES',
    'BACKQUOTE': 'BACKTICK',
    'BRACKETLEFT': 'OPEN_BRACKET',
    'BRACKETRIGHT': 'CLOSED_BRACKET',
    'SEMICOLON': 'COLON',
    'SLASH': 'FORWARD_SLASH',
    'BACKSLASH': 'BACK_SLASH'
  };

  var DefineKeyMethods = {
    defineKeyStart: function defineKeyStart(key) {
      this.defineKeyStop();
      this.defineTargetKey = key;
      this.emit('definekey.start', key);
      return this;
    },
    defineKeyStop: function defineKeyStop(keyObject) {
      if (!this.defineTargetKey) {
        return this;
      }
      this.plugKeyObject(keyObject, this.defineTargetKey);
      var defineTargetKey = this.defineTargetKey;
      this.defineTargetKey = null;
      this.emit('definekey.complete', defineTargetKey, keyObject);
      return this;
    },
    defineKeyCancel: function defineKeyCancel() {
      if (!this.defineTargetKey) {
        return this;
      }
      this.defineTargetKey = null;
      this.emit('definekey.complete');
      return this;
    },
    listenFromKeyboard: function listenFromKeyboard() {
      var self = this;
      var keyboardManager = this.scene.input.keyboard;
      var onKeyPress = function onKeyPress(event) {
        var key = EventKeyCodeToP3Key(event);
        var keyObject = keyboardManager.addKey(key);
        self.defineKeyStop(keyObject);
      };
      keyboardManager.once('keydown', onKeyPress);
      self.once('definekey.complete', function () {
        keyboardManager.off('keydown', onKeyPress);
      });
      return this;
    }
  };

  var methods = {};
  Object.assign(methods, DefineKeyMethods);

  var GetValue = Phaser.Utils.Objects.GetValue;
  var KeyCodes = Phaser.Input.Keyboard.KeyCodes;
  var KeysHub = /*#__PURE__*/function (_ComponentBase) {
    _inherits(KeysHub, _ComponentBase);
    function KeysHub(scene, config) {
      var _this;
      _classCallCheck(this, KeysHub);
      if (config === undefined) {
        config = {};
      }
      _this = _callSuper(this, KeysHub, [scene, config]);
      // this.scene

      _this.keys = {}; // Dictionary of keyHubs
      _this.singleMode = GetValue(config, 'singleMode', false);
      return _this;
    }
    _createClass(KeysHub, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        for (var key in this.keys) {
          this.keys[key].destroy();
        }
        this.keys = undefined;
        _get(_getPrototypeOf(KeysHub.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "plugKeyObject",
      value: function plugKeyObject(keyObject, key) {
        if (!keyObject) {
          // Unplug/clear that keyHub
          if (key) {
            var keyHub = this.addKey(key);
            keyHub.unplugAllKeyObject();
          }
          return this;
        }
        if (!keyObject.hasOwnProperty('key')) {
          keyObject.key = KeyMap[keyObject.keyCode];
        }
        if (!key) {
          key = keyObject.key;
        }
        var keyHub = this.addKey(key);
        if (this.singleMode) {
          keyHub.unplugAllKeyObject();
        }
        keyHub.plugKeyObject(keyObject);
        return this;
      }
    }, {
      key: "plugKeyObjects",
      value: function plugKeyObjects(keys) {
        if (Array.isArray(keys)) {
          for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.plugKeyObject(keys[i]);
          }
        } else {
          for (var key in keys) {
            this.plugKeyObject(keys[key], key);
          }
        }
        return this;
      }
    }, {
      key: "unplugKeyObject",
      value: function unplugKeyObject(keyObject) {
        var refKeyHub = keyObject.refKeyHub;
        if (refKeyHub) {
          refKeyHub.unplugKeyObject(keyObject);
        }
        return this;
      }
    }, {
      key: "unplugKeyObjects",
      value: function unplugKeyObjects(keys) {
        if (Array.isArray(keys)) {
          for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.unplugKeyObjects(keys[i]);
          }
        } else {
          for (var key in keys) {
            this.unplugKeyObjects(keys[key]);
          }
        }
        return this;
      }
    }, {
      key: "addKey",
      value: function addKey(key) {
        var keyCode;
        if (typeof key === 'string') {
          keyCode = KeyCodes[key.toUpperCase()];
        } else {
          keyCode = key;
          key = KeyMap[keyCode];
        }
        if (!this.keys.hasOwnProperty(keyCode)) {
          var keysHub = new KeyHub(this, keyCode);
          this.keys[keyCode] = keysHub;
          keysHub.key = key;
        }
        return this.keys[keyCode];
      }
    }, {
      key: "addKeys",
      value: function addKeys(keys) {
        var output = {};
        if (typeof keys === 'string') {
          keys = keys.split(',');
          for (var i = 0, cnt = keys.length; i < cnt; i++) {
            var key = keys[i].trim();
            if (key) {
              output[key] = this.addKey(key);
            }
          }
        } else {
          for (var key in keys) {
            output[key] = this.addKey(keys[key]);
          }
        }
        return output;
      }
    }, {
      key: "createCursorKeys",
      value: function createCursorKeys() {
        return this.addKeys({
          up: KeyCodes.UP,
          down: KeyCodes.DOWN,
          left: KeyCodes.LEFT,
          right: KeyCodes.RIGHT,
          space: KeyCodes.SPACE,
          shift: KeyCodes.SHIFT
        });
      }
    }, {
      key: "getKeyObjects",
      value: function getKeyObjects(key) {
        if (key === undefined) {
          var output = {};
          for (var keyCode in this.keys) {
            var keysHub = this.keys[keyCode];
            var keyObjects = keysHub.getKeyObjects();
            if (this.singleMode) {
              output[keysHub.key] = keyObjects[0];
            } else {
              output[keysHub.key] = keyObjects;
            }
          }
          return output;
        } else {
          var keyObjects = this.addKey(key).getKeyObjects();
          if (this.singleMode) {
            return keyObjects[0];
          } else {
            return keyObjects;
          }
        }
      }
    }]);
    return KeysHub;
  }(ComponentBase);
  Object.assign(KeysHub.prototype, methods);

  var KeysHubPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(KeysHubPlugin, _Phaser$Plugins$BaseP);
    function KeysHubPlugin(pluginManager) {
      _classCallCheck(this, KeysHubPlugin);
      return _callSuper(this, KeysHubPlugin, [pluginManager]);
    }
    _createClass(KeysHubPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, config) {
        return new KeysHub(scene, config);
      }
    }]);
    return KeysHubPlugin;
  }(Phaser.Plugins.BasePlugin);

  return KeysHubPlugin;

}));
