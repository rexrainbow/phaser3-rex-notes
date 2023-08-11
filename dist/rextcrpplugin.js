(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextcrpplugin = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$5(config, 'eventEmitter', true));

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

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    var _super = _createSuper(TickTask);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _super.call(this, parent, config);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$4(config, 'tickingMode', 1));
      // boot() later
      return _this;
    }

    // override
    _createClass(TickTask, [{
      key: "boot",
      value: function boot() {
        if (this.tickingMode === 2 && !this.tickingState) {
          this.startTicking();
        }
      }

      // override
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.stop();
        if (this.tickingState) {
          this.stopTicking();
        }
        _get(_getPrototypeOf(TickTask.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTickingMode",
      value: function setTickingMode(mode) {
        if (typeof mode === 'string') {
          mode = TICKINGMODE[mode];
        }
        this.tickingMode = mode;
      }

      // override
    }, {
      key: "startTicking",
      value: function startTicking() {
        this.tickingState = true;
      }

      // override
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        this.tickingState = false;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this._isRunning;
      },
      set: function set(value) {
        if (this._isRunning === value) {
          return;
        }
        this._isRunning = value;
        if (this.tickingMode === 1 && value != this.tickingState) {
          if (value) {
            this.startTicking();
          } else {
            this.stopTicking();
          }
        }
      }
    }, {
      key: "start",
      value: function start() {
        this.isPaused = false;
        this.isRunning = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        // Only can ba paused in running state
        if (this.isRunning) {
          this.isPaused = true;
          this.isRunning = false;
        }
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        // Only can ba resumed in paused state (paused from running state)
        if (this.isPaused) {
          this.isRunning = true;
        }
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.isPaused = false;
        this.isRunning = false;
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.isPaused = false;
        this.isRunning = false;
        this.emit('complete', this.parent, this);
      }
    }]);
    return TickTask;
  }(ComponentBase);
  var TICKINGMODE = {
    'no': 0,
    'lazy': 1,
    'always': 2
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var BaseClock = /*#__PURE__*/function (_TickTask) {
    _inherits(BaseClock, _TickTask);
    var _super = _createSuper(BaseClock);
    function BaseClock(parent, config) {
      var _this;
      _classCallCheck(this, BaseClock);
      _this = _super.call(this, parent, config);
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(BaseClock, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isRunning = GetValue$3(o, 'isRunning', false);
        this.timeScale = GetValue$3(o, 'timeScale', 1);
        this.now = GetValue$3(o, 'now', 0);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          isRunning: this.isRunning,
          timeScale: this.timeScale,
          now: this.now,
          tickingMode: this.tickingMode
        };
      }

      // Override
      // startTicking() { }

      // Override
      // stopTicking() {}
    }, {
      key: "start",
      value: function start(startAt) {
        if (startAt === undefined) {
          startAt = 0;
        }
        this.delta = 0;
        this.now = startAt;
        _get(_getPrototypeOf(BaseClock.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.now = time;
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(value) {
        this.timeScale = value;
        return this;
      }
    }, {
      key: "tick",
      value: function tick(delta) {
        delta *= this.timeScale;
        this.now += delta;
        this.delta = delta;
        this.emit('update', this.now, this.delta);
        return this;
      }
    }]);
    return BaseClock;
  }(TickTask);

  var Clock = /*#__PURE__*/function (_BaseClock) {
    _inherits(Clock, _BaseClock);
    var _super = _createSuper(Clock);
    function Clock() {
      _classCallCheck(this, Clock);
      return _super.apply(this, arguments);
    }
    _createClass(Clock, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(Clock.prototype), "startTicking", this).call(this);
        this.scene.sys.events.on('update', this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(Clock.prototype), "stopTicking", this).call(this);
        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('update', this.update, this);
        }
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || this.timeScale === 0) {
          return this;
        }
        this.tick(delta);
        return this;
      }
    }]);
    return Clock;
  }(BaseClock);

  var Clear = function Clear(obj) {
    if (_typeof(obj) !== 'object' || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }
    return obj;
  };

  /**
   * Shallow Object Clone. Will not out nested objects.
   * @param {object} obj JSON object
   * @param {object} ret JSON object to return, set null to return a new object
   * @returns {object} this object
   */
  var Clone = function Clone(obj, out) {
    var objIsArray = Array.isArray(obj);
    if (out === undefined) {
      out = objIsArray ? [] : {};
    } else {
      Clear(out);
    }
    if (objIsArray) {
      out.length = obj.length;
      for (var i = 0, cnt = obj.length; i < cnt; i++) {
        out[i] = obj[i];
      }
    } else {
      for (var key in obj) {
        out[key] = obj[key];
      }
    }
    return out;
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var Recorder$1 = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Recorder, _ComponentBase);
    var _super = _createSuper(Recorder);
    function Recorder(parent, config) {
      var _this;
      _classCallCheck(this, Recorder);
      _this = _super.call(this, parent, config);
      var clock = GetValue$2(config, 'clock', undefined);
      if (!clock) {
        clock = new Clock(parent);
      }
      _this.clock = clock;
      _this.resetFromJSON(config); // This function had been called in super(config)
      return _this;
    }
    _createClass(Recorder, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.clock.resetFromJSON(GetValue$2(o, 'clock', undefined));
        this.commands = GetValue$2(o, 'commands', []); // [[time, cmd], [time, cmd], ...]
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          clock: this.clock.toJSON(),
          commands: this.commands
        };
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.commands = undefined;
        this.clock.shutdown(fromScene);
        _get(_getPrototypeOf(Recorder.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "start",
      value: function start(startAt) {
        this.clear();
        this.clock.start(startAt);
        this.emit('start', this.parent, this);
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.clock.pause();
        this.emit('pause', this.parent, this);
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this.clock.resume();
        this.emit('resume', this.parent, this);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.clock.stop();
        this.emit('stop', this.parent, this);
        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.clock.seek(time);
        return this;
      }
    }, {
      key: "isRecording",
      get: function get() {
        return this.clock.isRunning;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this.clock.timeScale;
      },
      set: function set(timeScale) {
        this.clock.timeScale = timeScale;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "now",
      get: function get() {
        return this.clock.now;
      }
    }, {
      key: "addCommand",
      value: function addCommand(command, offset) {
        if (!this.isRecording) {
          return this;
        }
        if (offset === undefined) {
          offset = 0;
        }
        var time = this.clock.now + offset;
        this.commands.push([time, command]);
        return this;
      }
    }, {
      key: "getCommands",
      value: function getCommands(isRef) {
        if (isRef === undefined) {
          isRef = false;
        }
        var commands;
        if (isRef) {
          commands = this.commands;
        } else {
          commands = Clone(this.commands);
        }
        return commands;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.commands.length = 0;
        return this;
      }
    }]);
    return Recorder;
  }(ComponentBase);

  var Copy = function Copy(dest, src, startIdx, endIdx) {
    if (startIdx === undefined) {
      startIdx = 0;
    }
    if (endIdx === undefined) {
      endIdx = src.length;
    }
    dest.length = endIdx - startIdx;
    for (var i = 0, len = dest.length; i < len; i++) {
      dest[i] = src[i + startIdx];
    }
    return dest;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  //  Source object
  //  The key as a string, or an array of keys, i.e. 'banner', or 'banner.hideBanner'
  //  The default value to use if the key doesn't exist

  /**
   * Retrieves a value from an object.
   *
   * @function Phaser.Utils.Objects.GetValue
   * @since 3.0.0
   *
   * @param {object} source - The object to retrieve the value from.
   * @param {string} key - The name of the property to retrieve from the object. If a property is nested, the names of its preceding properties should be separated by a dot (`.`) - `banner.hideBanner` would return the value of the `hideBanner` property from the object stored in the `banner` property of the `source` object.
   * @param {*} defaultValue - The value to return if the `key` isn't found in the `source` object.
   *
   * @return {*} The value of the requested key.
   */
  var GetValue$1 = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue;

      //  Use for loop here so we can break early
      for (var i = 0; i < keys.length; i++) {
        if (parent.hasOwnProperty(keys[i])) {
          //  Yes it has a key property, let's carry on down
          value = parent[keys[i]];
          parent = parent[keys[i]];
        } else {
          //  Can't go any further, so reset to default
          value = defaultValue;
          break;
        }
      }
      return value;
    } else {
      return defaultValue;
    }
  };

  var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
  var HEX = /^0x[0-9A-F]+$/i;
  var TypeConvert = function TypeConvert(s) {
    if (typeof s !== 'string') {
      return s;
    }
    if (s === '') {
      s = null;
    } else if (FLOAT.test(s)) {
      s = parseFloat(s);
    } else if (HEX.test(s)) {
      s = parseInt(s, 16);
    } else {
      switch (s) {
        case 'false':
          s = false;
          break;
        case 'true':
          s = true;
          break;
        case 'null':
          s = null;
          break;
        case 'undefined':
          s = undefined;
          break;
      }
    }
    return s;
  };

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var RunCommands = function RunCommands(queue, scope, config) {
    var reverse = GetValue$1(config, 'reverse', false);
    var retVal;
    if (IsArray(queue[0])) {
      if (!reverse) {
        for (var i = 0, len = queue.length; i < len; i++) {
          retVal = RunCommands(queue[i], scope, config);
        }
      } else {
        for (var len = queue.length, i = len - 1; i >= 0; i--) {
          retVal = RunCommands(queue[i], scope, config);
        }
      }
    } else {
      retVal = RunCommand(queue, scope, config);
    }
    return retVal;
  };
  var RunCommand = function RunCommand(cmd, scope, config) {
    var argsConvert = GetValue$1(config, 'argsConvert', undefined);
    var argsConvertScope = GetValue$1(config, 'argsConvertScope', undefined);
    var fnName = cmd[0];
    ARGS = Copy(ARGS, cmd, 1);
    if (argsConvert) {
      // convert string to floating number, boolean, null, or string        
      if (argsConvert === true) {
        argsConvert = TypeConvert;
        argsConvertScope = undefined;
      }
      for (var i = 0, len = ARGS.length; i < len; i++) {
        if (argsConvertScope) {
          ARGS[i] = argsConvert.call(argsConvertScope, ARGS[i], cmd);
        } else {
          ARGS[i] = argsConvert(ARGS[i], cmd);
        }
      }
    }
    var fn;
    if (typeof fnName === 'string') {
      fn = scope[fnName];
      if (fn == null) {
        fn = GetValue$1(scope, fnName, null);
      }
    } else {
      fn = fnName;
    }
    var retValue = fn.apply(scope, ARGS);
    return retValue;
  };
  var ARGS = []; // reuse this array

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Player$1 = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Player, _ComponentBase);
    var _super = _createSuper(Player);
    function Player(parent, config) {
      var _this;
      _classCallCheck(this, Player);
      _this = _super.call(this, parent, config);
      var clock = GetValue(config, 'clock', undefined);
      if (!clock) {
        clock = new Clock(parent);
      }
      _this.clock = clock;
      _this.clock.on('update', _this.update, _assertThisInitialized(_this));
      _this.resetFromJSON(config); // this function had been called in super(config)
      return _this;
    }
    _createClass(Player, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.clock.resetFromJSON(GetValue(o, 'clock', undefined));
        this.state = GetValue(o, 'state', 0); // 0=idle, 1=run, 2=completed
        this.commands = GetValue(o, 'commands', []); // [[time, cmds], [time, cmds], ...]
        this.scope = GetValue(o, 'scope', undefined);
        this.setTimeUnit(GetValue(o, 'timeUnit', 0));
        this.setDtMode(GetValue(o, 'dtMode', 0));
        this.index = GetValue(o, 'index', 0);
        this.nextTime = GetValue(o, 'nextTime', 0);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          clock: this.clock.toJSON(),
          state: this.state,
          commands: this.commands,
          scope: this.scope,
          timeUnit: this.timeUnit,
          dtMode: this.dtMode,
          index: this.index,
          nextTime: this.nextTime
        };
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.clock.shutdown(fromScene);
        this.commands = undefined;
        _get(_getPrototypeOf(Player.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "load",
      value: function load(commands, scope, config) {
        this.stop();
        var timeUnit = GetValue(config, 'timeUnit', undefined);
        if (timeUnit !== undefined) {
          this.setTimeUnit(timeUnit);
        }
        var dtMode = GetValue(config, 'dtMode', undefined);
        if (dtMode !== undefined) {
          this.setDtMode(dtMode);
        }
        commands = commands.filter(function (item) {
          var dt = item[0];
          return !isNaN(dt);
        }).map(function (item) {
          var dt = item[0];
          if (typeof dt === 'string') {
            item[0] = parseFloat(item[0]);
          }
          return item;
        });
        if (this.dtMode === 0) {
          commands.sort(function (itemA, itemB) {
            var dtA = itemA[0],
              dtB = itemB[0];
            return dtA > dtB ? 1 : dtA < dtB ? -1 : 0;
          });
        }
        this.commands = commands;
        this.scope = scope;
        return this;
      }
    }, {
      key: "start",
      value: function start(startAt) {
        if (startAt === undefined) {
          startAt = 0;
        }
        this.stop();
        this.index = 0;
        this.state = 1;
        this.nextTime = this.getNextDt(0);
        this.clock.start(startAt);
        this.update(startAt);
        this.emit('start', this.parent, this);
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.clock.pause();
        this.emit('pause', this.parent, this);
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this.clock.resume();
        this.emit('resume', this.parent, this);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.clock.stop();
        this.state = 0;
        this.emit('stop', this.parent, this);
        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.clock.seek(time);
        return this;
      }
    }, {
      key: "seekToNext",
      value: function seekToNext() {
        this.seek(this.nextTime);
        return this;
      }
    }, {
      key: "isPlaying",
      get: function get() {
        return this.clock.isRunning;
      }
    }, {
      key: "completed",
      get: function get() {
        return this.state === 2;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this.clock.timeScale;
      },
      set: function set(timeScale) {
        this.clock.timeScale = timeScale;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "now",
      get: function get() {
        return this.clock.now;
      }
    }, {
      key: "update",
      value: function update(now) {
        if (this.nextTime > now) {
          return this;
        }
        var lastCommandIndex = this.commands.length - 1;
        while (1) {
          // Execute a command
          var item = this.commands[this.index];
          var command = item[1];
          if (!IsArray(command)) {
            // [dt, fnName, param0, param1, ...]
            command = Copy(CMD, item, 1);
          }
          RunCommands(command, this.scope);
          this.emit('runcommand', command, this.scope);
          // Execute a command

          if (this.index === lastCommandIndex) {
            this.complete();
            return this;
          } else {
            // Get next time
            this.index++; // Point to next command
            this.nextTime = this.getNextDt(this.nextTime);
            if (this.nextTime > now) {
              return this;
            }
            // Get next time
          }
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        this.clock.stop();
        this.state = 2;
        this.emit('complete', this.parent, this);
      }
    }, {
      key: "getNextDt",
      value: function getNextDt(currentDt) {
        var time = this.commands[this.index][0];
        if (this.timeUnit === 1) {
          // Second mode
          time = time * 1000;
        }
        if (this.dtMode === 1) {
          time += currentDt;
        }
        return time;
      }
    }, {
      key: "setDtMode",
      value: function setDtMode(dtMode) {
        if (typeof dtMode === 'string') {
          dtMode = DTMODE[dtMode];
        }
        this.dtMode = dtMode;
        return this;
      }
    }, {
      key: "setTimeUnit",
      value: function setTimeUnit(timeUnit) {
        if (typeof timeUnit === 'string') {
          timeUnit = TIMEUNITMODE[timeUnit];
        }
        this.timeUnit = timeUnit;
        return this;
      }
    }]);
    return Player;
  }(ComponentBase);
  var CMD = []; // reuse this array

  var TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1
  };
  var DTMODE = {
    abs: 0,
    absolute: 0,
    inc: 1,
    increment: 1
  };

  var TCRP = {
    Recorder: Recorder$1,
    Player: Player$1,
    RunCommands: RunCommands
  };

  var Recorder = TCRP.Recorder;
  var Player = TCRP.Player;
  var TCRPPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TCRPPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(TCRPPlugin);
    function TCRPPlugin(pluginManager) {
      _classCallCheck(this, TCRPPlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(TCRPPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "addRecorder",
      value: function addRecorder(parent, config) {
        return new Recorder(parent, config);
      }
    }, {
      key: "addPlayer",
      value: function addPlayer(parent, config) {
        return new Player(parent, config);
      }
    }]);
    return TCRPPlugin;
  }(Phaser.Plugins.BasePlugin);
  var methods = {
    runCommands: TCRP.RunCommands
  };
  Object.assign(TCRPPlugin.prototype, methods);

  return TCRPPlugin;

}));
