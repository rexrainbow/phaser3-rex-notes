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
        for (var i = 0, cnt = this.ports.length; i < cnt; i++) {
          this.ports[i].off('down', this.update, this).off('up', this.update, this);
        }
        this.ports = undefined;
        _get(_getPrototypeOf(KeyHub.prototype), "destroy", this).call(this);
      }
    }, {
      key: "plug",
      value: function plug(key) {
        AddItem(this.ports, key, 0, function (key) {
          key.on('down', this.update, this).on('up', this.update, this);
          this.update(FakeEvent);
        }, this);
        return this;
      }
    }, {
      key: "unplug",
      value: function unplug(key) {
        RemoveItem(this.ports, key, function (key) {
          key.off('down', this.update, this).off('up', this.update, this);
          this.update(FakeEvent);
        }, this);
        return this;
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

  var GetValue = Phaser.Utils.Objects.GetValue;
  var KeyCodes = Phaser.Input.Keyboard.KeyCodes;
  var KeysHub = /*#__PURE__*/function () {
    function KeysHub(scene, config) {
      _classCallCheck(this, KeysHub);
      if (config === undefined) {
        config = {};
      }

      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      config.eventEmitter = this.getEventEmitter();
      this.scene = scene;
      this.keys = {};
    }
    _createClass(KeysHub, [{
      key: "destroy",
      value: function destroy() {
        this.destroyEventEmitter();
        for (var keyCode in this.keys) {
          this.keys[keyCode].destroy();
        }
        this.keys = undefined;
      }
    }, {
      key: "plugKey",
      value: function plugKey(key, keyCode) {
        if (keyCode === undefined) {
          keyCode = key.keyCode;
        }
        this.addKey(keyCode).plug(key);
        return this;
      }
    }, {
      key: "plugKeys",
      value: function plugKeys(keys) {
        if (Array.isArray(keys)) {
          for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.plugKey(keys[i]);
          }
        } else {
          for (var keyCode in keys) {
            this.plugKey(keys[keyCode], keyCode);
          }
        }
        return this;
      }
    }, {
      key: "unplug",
      value: function unplug(keys) {
        if (Array.isArray(keys)) {
          for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.unplugKey(keys[i]);
          }
        } else {
          for (var keyCode in keys) {
            this.unplugKey(keys[keyCode]);
          }
        }
        return this;
      }
    }, {
      key: "addKey",
      value: function addKey(keyCode) {
        if (typeof keyCode === 'string') {
          keyCode = KeyCodes[keyCode.toUpperCase()];
        }
        if (!this.keys.hasOwnProperty(keyCode)) {
          this.keys[keyCode] = new KeyHub(this, keyCode);
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
            var currentKey = keys[i].trim();
            if (currentKey) {
              output[currentKey] = this.addKey(currentKey);
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
    }]);
    return KeysHub;
  }();
  Object.assign(KeysHub.prototype, EventEmitterMethods);

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
