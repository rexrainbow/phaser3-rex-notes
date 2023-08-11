(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexvirtualjoystickplugin = factory());
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

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  var RAD_TO_DEG = 180 / Math.PI;

  /**
   * Convert the given angle in radians, to the equivalent angle in degrees.
   *
   * @function Phaser.Math.RadToDeg
   * @since 3.0.0
   *
   * @param {number} radians - The angle in radians to convert ot degrees.
   *
   * @return {integer} The given angle converted to degrees.
   */
  var RadToDeg = function RadToDeg(radians) {
    return radians * RAD_TO_DEG;
  };

  var DIRMODE = {
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
  };

  var AngleToDirections = function AngleToDirections(angle, dirMode, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globOut;
    }
    out.left = false;
    out.right = false;
    out.up = false;
    out.down = false;
    angle = (angle + 360) % 360;
    switch (dirMode) {
      case 0:
        // up & down
        if (angle < 180) {
          out.down = true;
        } else {
          out.up = true;
        }
        break;
      case 1:
        // left & right
        if (angle > 90 && angle <= 270) {
          out.left = true;
        } else {
          out.right = true;
        }
        break;
      case 2:
        // 4 dir
        if (angle > 45 && angle <= 135) {
          out.down = true;
        } else if (angle > 135 && angle <= 225) {
          out.left = true;
        } else if (angle > 225 && angle <= 315) {
          out.up = true;
        } else {
          out.right = true;
        }
        break;
      case 3:
        // 8 dir
        if (angle > 22.5 && angle <= 67.5) {
          out.down = true;
          out.right = true;
        } else if (angle > 67.5 && angle <= 112.5) {
          out.down = true;
        } else if (angle > 112.5 && angle <= 157.5) {
          out.down = true;
          out.left = true;
        } else if (angle > 157.5 && angle <= 202.5) {
          out.left = true;
        } else if (angle > 202.5 && angle <= 247.5) {
          out.left = true;
          out.up = true;
        } else if (angle > 247.5 && angle <= 292.5) {
          out.up = true;
        } else if (angle > 292.5 && angle <= 337.5) {
          out.up = true;
          out.right = true;
        } else {
          out.right = true;
        }
        break;
    }
    return out;
  };
  var globOut = {};

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var GetDist = Phaser.Math.Distance.Between;
  var GetAngle = Phaser.Math.Angle.Between;
  var VectorToCursorKeys = /*#__PURE__*/function (_CursorKeys) {
    _inherits(VectorToCursorKeys, _CursorKeys);
    var _super = _createSuper(VectorToCursorKeys);
    function VectorToCursorKeys(scene, config) {
      var _this;
      _classCallCheck(this, VectorToCursorKeys);
      _this = _super.call(this, scene);
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(VectorToCursorKeys, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        if (this.start == undefined) {
          this.start = {
            x: 0,
            y: 0
          };
        }
        if (this.end == undefined) {
          this.end = {
            x: 0,
            y: 0
          };
        }
        this._enable = undefined;
        this.setEnable(GetValue$2(o, 'enable', true));
        this.setMode(GetValue$2(o, 'dir', '8dir'));
        this.setDistanceThreshold(GetValue$2(o, 'forceMin', 16));
        var startX = GetValue$2(o, "start.x", null);
        var startY = GetValue$2(o, "start.y", null);
        var endX = GetValue$2(o, "end.x", null);
        var endY = GetValue$2(o, "end.y", null);
        this.setVector(startX, startY, endX, endY);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          enable: this.enable,
          dir: this.dirMode,
          forceMin: this.forceMin,
          start: {
            x: this.start.x,
            y: this.start.y
          },
          end: {
            x: this.end.x,
            y: this.end.y
          }
        };
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }
        if (!e) {
          this.clearVector();
        }
        this._enable = e;
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "setDistanceThreshold",
      value: function setDistanceThreshold(d) {
        if (d < 0) {
          d = 0;
        }
        this.forceMin = d;
        return this;
      }
    }, {
      key: "clearVector",
      value: function clearVector() {
        this.start.x = 0;
        this.start.y = 0;
        this.end.x = 0;
        this.end.y = 0;
        this.clearAllKeysState();
        return this;
      }
    }, {
      key: "setVector",
      value: function setVector(x0, y0, x1, y1) {
        if (!this.enable) {
          // Do nothing
          return this;
        }
        if (x0 === null) {
          // Clear all keys' state
          this.clearVector();
          return this;
        }

        // (0,0) -> (x0, y0)
        if (x1 === undefined) {
          x1 = x0;
          x0 = 0;
          y1 = y0;
          y0 = 0;
        }
        this.start.x = x0;
        this.start.y = y0;
        this.end.x = x1;
        this.end.y = y1;
        if (this.forceMin > 0 && this.force < this.forceMin) {
          // No key pressed
          this.clearVector();
          return this;
        }

        // Update keys' state
        this.noKeyDown = true;
        var dirStates = AngleToDirections(this.angle, this.dirMode, true);
        for (var dir in dirStates) {
          this.setKeyState(dir, dirStates[dir]);
        }
        return this;
      }
    }, {
      key: "forceX",
      get: function get() {
        return this.end.x - this.start.x;
      }
    }, {
      key: "forceY",
      get: function get() {
        return this.end.y - this.start.y;
      }
    }, {
      key: "force",
      get: function get() {
        return GetDist(this.start.x, this.start.y, this.end.x, this.end.y);
      }
    }, {
      key: "rotation",
      get: function get() {
        return GetAngle(this.start.x, this.start.y, this.end.x, this.end.y);
      }
    }, {
      key: "angle",
      get: function get() {
        return RadToDeg(this.rotation); // -180 ~ 180
      }
    }, {
      key: "octant",
      get: function get() {
        var octant = 0;
        if (this.rightKeyDown) {
          octant = this.downKeyDown ? 45 : 0;
        } else if (this.downKeyDown) {
          octant = this.leftKeyDown ? 135 : 90;
        } else if (this.leftKeyDown) {
          octant = this.upKeyDown ? 225 : 180;
        } else if (this.upKeyDown) {
          octant = this.rightKeyDown ? 315 : 270;
        }
        return octant;
      }
    }]);
    return VectorToCursorKeys;
  }(CursorKeys);

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var eventemitter3 = {exports: {}};

  (function (module) {

  	var has = Object.prototype.hasOwnProperty
  	  , prefix = '~';

  	/**
  	 * Constructor to create a storage for our `EE` objects.
  	 * An `Events` instance is a plain object whose properties are event names.
  	 *
  	 * @constructor
  	 * @private
  	 */
  	function Events() {}

  	//
  	// We try to not inherit from `Object.prototype`. In some engines creating an
  	// instance in this way is faster than calling `Object.create(null)` directly.
  	// If `Object.create(null)` is not supported we prefix the event names with a
  	// character to make sure that the built-in object properties are not
  	// overridden or used as an attack vector.
  	//
  	if (Object.create) {
  	  Events.prototype = Object.create(null);

  	  //
  	  // This hack is needed because the `__proto__` property is still inherited in
  	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  	  //
  	  if (!new Events().__proto__) prefix = false;
  	}

  	/**
  	 * Representation of a single event listener.
  	 *
  	 * @param {Function} fn The listener function.
  	 * @param {*} context The context to invoke the listener with.
  	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
  	 * @constructor
  	 * @private
  	 */
  	function EE(fn, context, once) {
  	  this.fn = fn;
  	  this.context = context;
  	  this.once = once || false;
  	}

  	/**
  	 * Add a listener for a given event.
  	 *
  	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} context The context to invoke the listener with.
  	 * @param {Boolean} once Specify if the listener is a one-time listener.
  	 * @returns {EventEmitter}
  	 * @private
  	 */
  	function addListener(emitter, event, fn, context, once) {
  	  if (typeof fn !== 'function') {
  	    throw new TypeError('The listener must be a function');
  	  }

  	  var listener = new EE(fn, context || emitter, once)
  	    , evt = prefix ? prefix + event : event;

  	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  	  else emitter._events[evt] = [emitter._events[evt], listener];

  	  return emitter;
  	}

  	/**
  	 * Clear event by name.
  	 *
  	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
  	 * @param {(String|Symbol)} evt The Event name.
  	 * @private
  	 */
  	function clearEvent(emitter, evt) {
  	  if (--emitter._eventsCount === 0) emitter._events = new Events();
  	  else delete emitter._events[evt];
  	}

  	/**
  	 * Minimal `EventEmitter` interface that is molded against the Node.js
  	 * `EventEmitter` interface.
  	 *
  	 * @constructor
  	 * @public
  	 */
  	function EventEmitter() {
  	  this._events = new Events();
  	  this._eventsCount = 0;
  	}

  	/**
  	 * Return an array listing the events for which the emitter has registered
  	 * listeners.
  	 *
  	 * @returns {Array}
  	 * @public
  	 */
  	EventEmitter.prototype.eventNames = function eventNames() {
  	  var names = []
  	    , events
  	    , name;

  	  if (this._eventsCount === 0) return names;

  	  for (name in (events = this._events)) {
  	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  	  }

  	  if (Object.getOwnPropertySymbols) {
  	    return names.concat(Object.getOwnPropertySymbols(events));
  	  }

  	  return names;
  	};

  	/**
  	 * Return the listeners registered for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Array} The registered listeners.
  	 * @public
  	 */
  	EventEmitter.prototype.listeners = function listeners(event) {
  	  var evt = prefix ? prefix + event : event
  	    , handlers = this._events[evt];

  	  if (!handlers) return [];
  	  if (handlers.fn) return [handlers.fn];

  	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
  	    ee[i] = handlers[i].fn;
  	  }

  	  return ee;
  	};

  	/**
  	 * Return the number of listeners listening to a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Number} The number of listeners.
  	 * @public
  	 */
  	EventEmitter.prototype.listenerCount = function listenerCount(event) {
  	  var evt = prefix ? prefix + event : event
  	    , listeners = this._events[evt];

  	  if (!listeners) return 0;
  	  if (listeners.fn) return 1;
  	  return listeners.length;
  	};

  	/**
  	 * Calls each of the listeners registered for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Boolean} `true` if the event had listeners, else `false`.
  	 * @public
  	 */
  	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  	  var evt = prefix ? prefix + event : event;

  	  if (!this._events[evt]) return false;

  	  var listeners = this._events[evt]
  	    , len = arguments.length
  	    , args
  	    , i;

  	  if (listeners.fn) {
  	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

  	    switch (len) {
  	      case 1: return listeners.fn.call(listeners.context), true;
  	      case 2: return listeners.fn.call(listeners.context, a1), true;
  	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
  	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
  	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
  	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
  	    }

  	    for (i = 1, args = new Array(len -1); i < len; i++) {
  	      args[i - 1] = arguments[i];
  	    }

  	    listeners.fn.apply(listeners.context, args);
  	  } else {
  	    var length = listeners.length
  	      , j;

  	    for (i = 0; i < length; i++) {
  	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

  	      switch (len) {
  	        case 1: listeners[i].fn.call(listeners[i].context); break;
  	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
  	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
  	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
  	        default:
  	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
  	            args[j - 1] = arguments[j];
  	          }

  	          listeners[i].fn.apply(listeners[i].context, args);
  	      }
  	    }
  	  }

  	  return true;
  	};

  	/**
  	 * Add a listener for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} [context=this] The context to invoke the listener with.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.on = function on(event, fn, context) {
  	  return addListener(this, event, fn, context, false);
  	};

  	/**
  	 * Add a one-time listener for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} [context=this] The context to invoke the listener with.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.once = function once(event, fn, context) {
  	  return addListener(this, event, fn, context, true);
  	};

  	/**
  	 * Remove the listeners of a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn Only remove the listeners that match this function.
  	 * @param {*} context Only remove the listeners that have this context.
  	 * @param {Boolean} once Only remove one-time listeners.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  	  var evt = prefix ? prefix + event : event;

  	  if (!this._events[evt]) return this;
  	  if (!fn) {
  	    clearEvent(this, evt);
  	    return this;
  	  }

  	  var listeners = this._events[evt];

  	  if (listeners.fn) {
  	    if (
  	      listeners.fn === fn &&
  	      (!once || listeners.once) &&
  	      (!context || listeners.context === context)
  	    ) {
  	      clearEvent(this, evt);
  	    }
  	  } else {
  	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
  	      if (
  	        listeners[i].fn !== fn ||
  	        (once && !listeners[i].once) ||
  	        (context && listeners[i].context !== context)
  	      ) {
  	        events.push(listeners[i]);
  	      }
  	    }

  	    //
  	    // Reset the array, or remove it completely if we have no more listeners.
  	    //
  	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
  	    else clearEvent(this, evt);
  	  }

  	  return this;
  	};

  	/**
  	 * Remove all listeners, or those of the specified event.
  	 *
  	 * @param {(String|Symbol)} [event] The event name.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  	  var evt;

  	  if (event) {
  	    evt = prefix ? prefix + event : event;
  	    if (this._events[evt]) clearEvent(this, evt);
  	  } else {
  	    this._events = new Events();
  	    this._eventsCount = 0;
  	  }

  	  return this;
  	};

  	//
  	// Alias methods names because people roll like that.
  	//
  	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  	//
  	// Expose the prefix.
  	//
  	EventEmitter.prefixed = prefix;

  	//
  	// Allow `EventEmitter` to be imported as module namespace.
  	//
  	EventEmitter.EventEmitter = EventEmitter;

  	//
  	// Expose the module.
  	//
  	{
  	  module.exports = EventEmitter;
  	} 
  } (eventemitter3));

  var eventemitter3Exports = eventemitter3.exports;
  var DefaultEventEmitter = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = DefaultEventEmitter;
      }
      this._privateEE = eventEmitter === true || eventEmitter === undefined;
      this._eventEmitter = this._privateEE ? new EventEmitterClass() : eventEmitter;
      return this;
    },
    destroyEventEmitter: function destroyEventEmitter() {
      if (this._eventEmitter && this._privateEE) {
        this._eventEmitter.removeAllListeners();
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

  var ScreenXYToWorldXY = function ScreenXYToWorldXY(screenX, screenY, camera, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globalOut;
    }
    camera.getWorldPoint(screenX, screenY, out);
    return out;
  };
  var globalOut = {};

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var CircleClass = Phaser.Geom.Circle;
  var CircleContains = Phaser.Geom.Circle.Contains;
  var TouchCursor = /*#__PURE__*/function (_VectorToCursorKeys) {
    _inherits(TouchCursor, _VectorToCursorKeys);
    var _super = _createSuper(TouchCursor);
    function TouchCursor(gameObject, config) {
      var _this;
      _classCallCheck(this, TouchCursor);
      var scene = gameObject.scene;
      _this = _super.call(this, scene, config);
      //this.resetFromJSON(config); // this function had been called in super(config)

      // Event emitter
      var eventEmitter = GetValue$1(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue$1(config, 'EventEmitterClass', undefined);
      _this.setEventEmitter(eventEmitter, EventEmitterClass);
      _this.scene = scene;
      _this.mainCamera = scene.sys.cameras.main;
      _this.pointer = undefined;
      _this.gameObject = gameObject;
      _this.radius = GetValue$1(config, 'radius', 100);
      gameObject.setInteractive(new CircleClass(gameObject.displayOriginX, gameObject.displayOriginY, _this.radius), CircleContains);
      _this.boot();
      return _this;
    }
    _createClass(TouchCursor, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(TouchCursor.prototype), "resetFromJSON", this).call(this, o);
        this.pointer = undefined;
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var o = _get(_getPrototypeOf(TouchCursor.prototype), "toJSON", this).call(this);
        o.radius = this.radius;
        return o;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.gameObject.on('pointerdown', this.onKeyDownStart, this);
        this.gameObject.on('pointerover', this.onKeyDownStart, this);
        this.scene.input.on('pointermove', this.onKeyDown, this);
        this.scene.input.on('pointerup', this.onKeyUp, this);
        this.gameObject.once('destroy', this.onParentDestroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        if (!this.scene) {
          return;
        }

        // gameObject events will be removed when this gameObject destroyed 
        // this.gameObject.off('pointerdown', this.onKeyDownStart, this);
        // this.gameObject.off('pointerover', this.onKeyDownStart, this);

        this.scene.input.off('pointermove', this.onKeyDown, this);
        this.scene.input.off('pointerup', this.onKeyUp, this);
        this.destroyEventEmitter();
        this.scene = undefined;
        this.mainCamera = undefined;
        this.pointer = undefined;
        this.gameObject = undefined;
        _get(_getPrototypeOf(TouchCursor.prototype), "shutdown", this).call(this);
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }, {
      key: "onKeyDownStart",
      value: function onKeyDownStart(pointer) {
        if (!pointer.isDown || this.pointer !== undefined) {
          return;
        }
        this.pointer = pointer;
        this.onKeyDown(pointer);
        this.emit('pointerdown', pointer);
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(pointer) {
        if (this.pointer !== pointer) {
          return;
        }
        var camera = pointer.camera;
        if (!camera) {
          // Pointer is outside of any camera, no worldX/worldY available
          return;
        }

        // Vector of world position
        var gameObject = this.gameObject;
        var worldXY = this.end;

        // Note: pointer.worldX, pointer.worldY might not be the world position of this camera,
        // if this camera is not main-camera
        if (camera !== this.mainCamera) {
          worldXY = ScreenXYToWorldXY(pointer.x, pointer.y, camera, worldXY);
        } else {
          worldXY.x = pointer.worldX;
          worldXY.y = pointer.worldY;
        }
        var startX = gameObject.x;
        var startY = gameObject.y;
        if (gameObject.scrollFactorX === 0) {
          startX += camera.scrollX;
        }
        if (gameObject.scrollFactorY === 0) {
          startY += camera.scrollY;
        }
        this.setVector(startX, startY, worldXY.x, worldXY.y);
        this.emit('update');
      }
    }, {
      key: "onKeyUp",
      value: function onKeyUp(pointer) {
        if (this.pointer !== pointer) {
          return;
        }
        this.pointer = undefined;
        this.clearVector();
        this.emit('update');
        this.emit('pointerup', pointer);
      }
    }, {
      key: "forceUpdate",
      value: function forceUpdate() {
        var pointer = this.pointer;
        if (!pointer || !pointer.isDown) {
          return this;
        }
        this.onKeyDown(pointer);
        return this;
      }
    }]);
    return TouchCursor;
  }(VectorToCursorKeys);
  Object.assign(TouchCursor.prototype, EventEmitterMethods);

  var GetValue = Phaser.Utils.Objects.GetValue;
  var VirtualJoyStick = /*#__PURE__*/function () {
    function VirtualJoyStick(scene, config) {
      _classCallCheck(this, VirtualJoyStick);
      if (config === undefined) {
        config = {};
      }

      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      config.eventEmitter = this.getEventEmitter();
      this.scene = scene;
      this.base = undefined;
      this.thumb = undefined;
      this.touchCursor = undefined;
      this.setRadius(GetValue(config, 'radius', 100));
      this.addBase(GetValue(config, 'base', undefined), config);
      this.addThumb(GetValue(config, 'thumb', undefined));
      var x = GetValue(config, 'x', 0);
      var y = GetValue(config, 'y', 0);
      this.base.setPosition(x, y);
      this.thumb.setPosition(x, y);
      if (GetValue(config, 'fixed', true)) {
        this.setScrollFactor(0);
      }
      this.boot();
    }
    _createClass(VirtualJoyStick, [{
      key: "destroy",
      value: function destroy() {
        this.destroyEventEmitter();
        this.base.destroy(); // Also destroy touchCursor behavior
        this.thumb.destroy();
        this.scene = undefined;
        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
      }
    }, {
      key: "createCursorKeys",
      value: function createCursorKeys() {
        return this.touchCursor.createCursorKeys();
      }
    }, {
      key: "forceX",
      get: function get() {
        return this.touchCursor.forceX;
      }
    }, {
      key: "forceY",
      get: function get() {
        return this.touchCursor.forceY;
      }
    }, {
      key: "force",
      get: function get() {
        return this.touchCursor.force;
      }
    }, {
      key: "rotation",
      get: function get() {
        return this.touchCursor.rotation;
      }
    }, {
      key: "angle",
      get: function get() {
        return this.touchCursor.angle; // -180 ~ 180
      }
    }, {
      key: "up",
      get: function get() {
        return this.touchCursor.upKeyDown;
      }
    }, {
      key: "down",
      get: function get() {
        return this.touchCursor.downKeyDown;
      }
    }, {
      key: "left",
      get: function get() {
        return this.touchCursor.leftKeyDown;
      }
    }, {
      key: "right",
      get: function get() {
        return this.touchCursor.rightKeyDown;
      }
    }, {
      key: "noKey",
      get: function get() {
        return this.touchCursor.noKeyDown;
      }
    }, {
      key: "pointerX",
      get: function get() {
        return this.touchCursor.end.x;
      }
    }, {
      key: "pointerY",
      get: function get() {
        return this.touchCursor.end.y;
      }
    }, {
      key: "pointer",
      get: function get() {
        return this.touchCursor.pointer;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        if (this.x === x && this.y === y) {
          return this;
        }
        this.x = x;
        this.y = y;
        this.forceUpdateThumb();
        return this;
      }
    }, {
      key: "x",
      get: function get() {
        return this.base.x;
      },
      set: function set(value) {
        if (this.x === value) {
          return;
        }
        this.base.x = value;
        this.thumb.x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this.base.y;
      },
      set: function set(value) {
        if (this.y === value) {
          return;
        }
        this.base.y = value;
        this.thumb.y = value;
      }
    }, {
      key: "setVisible",
      value: function setVisible(visible) {
        this.visible = visible;
        return this;
      }
    }, {
      key: "toggleVisible",
      value: function toggleVisible() {
        this.visible = !this.visible;
        return this;
      }
    }, {
      key: "visible",
      get: function get() {
        return this.base.visible;
      },
      set: function set(visible) {
        this.base.visible = visible;
        this.thumb.visible = visible;
      }
    }, {
      key: "enable",
      get: function get() {
        return this.touchCursor.enable;
      },
      set: function set(value) {
        this.touchCursor.setEnable(value);
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "setRadius",
      value: function setRadius(radius) {
        this.radius = radius;
        return this;
      }
    }, {
      key: "addBase",
      value: function addBase(gameObject, config) {
        if (this.base) {
          this.base.destroy();
          // Also destroy touchCursor behavior
        }

        if (gameObject === undefined) {
          gameObject = this.scene.add.circle(0, 0, this.radius).setStrokeStyle(3, 0x0000ff);
        }
        if (config === undefined) {
          config = {};
        }
        config.eventEmitter = this.getEventEmitter();
        this.touchCursor = new TouchCursor(gameObject, config);
        this.base = gameObject;
        return this;
      }
    }, {
      key: "addThumb",
      value: function addThumb(gameObject) {
        if (this.thumb) {
          this.thumb.destroy();
        }
        if (gameObject === undefined) {
          gameObject = this.scene.add.circle(0, 0, 40).setStrokeStyle(3, 0x00ff00);
        }
        this.thumb = gameObject;
        return this;
      }
    }, {
      key: "setScrollFactor",
      value: function setScrollFactor(scrollFactor) {
        this.base.setScrollFactor(scrollFactor);
        this.thumb.setScrollFactor(scrollFactor);
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.on('update', this.update, this);
      }

      // Internal method
    }, {
      key: "update",
      value: function update() {
        var touchCursor = this.touchCursor;
        // Start from (0,0)
        var dx, dy;
        var dirMode = touchCursor.dirMode;
        if (touchCursor.anyKeyDown) {
          if (touchCursor.force > this.radius) {
            // Exceed radius
            var rad = touchCursor.rotation;

            // NOT 'up&down'
            dx = dirMode !== 0 ? Math.cos(rad) * this.radius : 0;
            // NOT 'left&right'
            dy = dirMode !== 1 ? Math.sin(rad) * this.radius : 0;
          } else {
            // NOT 'up&down'
            dx = dirMode !== 0 ? touchCursor.forceX : 0;
            // NOT 'left&right'
            dy = dirMode !== 1 ? touchCursor.forceY : 0;
          }
        } else {
          dx = 0;
          dy = 0;
        }
        this.thumb.x = this.base.x + dx;
        this.thumb.y = this.base.y + dy;
        return this;
      }
    }, {
      key: "forceUpdateThumb",
      value: function forceUpdateThumb() {
        this.touchCursor.forceUpdate();
        return this;
      }
    }]);
    return VirtualJoyStick;
  }();
  Object.assign(VirtualJoyStick.prototype, EventEmitterMethods);

  var VirtualJoyStickPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(VirtualJoyStickPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(VirtualJoyStickPlugin);
    function VirtualJoyStickPlugin(pluginManager) {
      _classCallCheck(this, VirtualJoyStickPlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(VirtualJoyStickPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, config) {
        return new VirtualJoyStick(scene, config);
      }
    }]);
    return VirtualJoyStickPlugin;
  }(Phaser.Plugins.BasePlugin);

  return VirtualJoyStickPlugin;

}));
