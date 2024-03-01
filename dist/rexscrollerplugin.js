(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexscrollerplugin = factory());
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

  var EventEmitterMethods$1 = {
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

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$4(config, 'eventEmitter', true));

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
  Object.assign(ComponentBase.prototype, EventEmitterMethods$1);

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
  var EE = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

  var EventEmitter = /*#__PURE__*/function (_EE) {
    _inherits(EventEmitter, _EE);
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);
      return _callSuper(this, EventEmitter, arguments);
    }
    _createClass(EventEmitter, [{
      key: "shutdown",
      value: function shutdown() {
        this.removeAllListeners();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.removeAllListeners();
      }
    }]);
    return EventEmitter;
  }(EE);

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = EventEmitter;
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
  var GetValue$3 = function GetValue(source, key, defaultValue) {
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

  var StateProperties$1 = ['next', 'exit', 'enter'];
  var FSM$1 = /*#__PURE__*/function () {
    /*
    var config = {
        start: 'A',   // default: undefined
        states: {
            A: {
                next: 'B',  // function() { return 'B'; }
                enter: function() {},
                exit: function() {},
            },
            // ...
        },        
        extend: {
            i: 0,
            name: 'abc'
            // ...
        },
        init: function() {},
        enable: true,
        eventEmitter: true,
    };
    */
    function FSM(config) {
      _classCallCheck(this, FSM);
      // Attach get-next-state function
      var states = GetValue$3(config, 'states', undefined);
      if (states) {
        this.addStates(states);
      }

      // Attach extend members
      var extend = GetValue$3(config, 'extend', undefined);
      if (extend) {
        for (var name in extend) {
          if (!this.hasOwnProperty(name) || this[name] === undefined) {
            this[name] = extend[name];
          }
        }
      }

      // Event emitter
      var eventEmitter = GetValue$3(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue$3(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this._stateLock = false;
      this.resetFromJSON(config);
    }
    _createClass(FSM, [{
      key: "shutdown",
      value: function shutdown() {
        this.destroyEventEmitter();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$3(o, 'enable', true));
        this.start(GetValue$3(o, 'start', undefined));
        var init = GetValue$3(o, 'init', undefined);
        if (init) {
          init.call(this);
        }
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          curState: this.state,
          prevState: this.prevState,
          enable: this.enable,
          start: this._start
        };
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
      key: "state",
      get: function get() {
        return this._state;
      },
      set: function set(newState) {
        if (!this.enable || this._stateLock) {
          return;
        }
        if (this._state === newState) {
          return;
        }
        this._prevState = this._state;
        this._state = newState;
        this._stateLock = true; // lock state

        this.emit('statechange', this);
        if (this._prevState != null) {
          var exitEventName = 'exit_' + this._prevState;
          var exitCallback = this[exitEventName];
          if (exitCallback) {
            exitCallback.call(this);
          }
          this.emit(exitEventName, this);
        }
        this._stateLock = false;
        if (this._state != null) {
          var enterEventName = 'enter_' + this._state;
          var enterCallback = this[enterEventName];
          if (enterCallback) {
            enterCallback.call(this);
          }
          this.emit(enterEventName, this);
        }
      }
    }, {
      key: "prevState",
      get: function get() {
        return this._prevState;
      }
    }, {
      key: "start",
      value: function start(state) {
        this._start = state;
        this._prevState = undefined;
        this._state = state; // Won't fire statechange events
        return this;
      }
    }, {
      key: "goto",
      value: function goto(nextState) {
        if (nextState != null) {
          this.state = nextState;
        }
        return this;
      }
    }, {
      key: "next",
      value: function next() {
        var nextState;
        var getNextState = this['next_' + this.state];
        if (getNextState) {
          if (typeof getNextState === 'string') {
            nextState = getNextState;
          } else {
            nextState = getNextState.call(this);
          }
        }
        this["goto"](nextState);
        return this;
      }
    }, {
      key: "stateProperties",
      get: function get() {
        return StateProperties$1;
      }
    }, {
      key: "addState",
      value: function addState(name, state) {
        if (typeof name !== 'string') {
          state = name;
          name = state.name;
        }
        var stateProperties = this.stateProperties;
        for (var i = 0, cnt = stateProperties.length; i < cnt; i++) {
          var propertyName = stateProperties[i];
          var propertyValue = state[propertyName];
          if (propertyValue) {
            this["".concat(propertyName, "_").concat(name)] = propertyValue;
          }
        }
        return this;
      }
    }, {
      key: "addStates",
      value: function addStates(states) {
        if (Array.isArray(states)) {
          for (var i = 0, cnt = states.length; i < cnt; i++) {
            this.addState(states[i]);
          }
        } else {
          for (var name in states) {
            this.addState(name, states[name]);
          }
        }
        return this;
      }
    }, {
      key: "runMethod",
      value: function runMethod(methodName, a1, a2, a3, a4, a5) {
        var fn = this[methodName + '_' + this.state];
        if (!fn) {
          return undefined;
        }

        // Copy from eventemitter3
        var len = arguments.length;
        switch (len) {
          case 1:
            return fn.call(this);
          case 2:
            return fn.call(this, a1);
          case 3:
            return fn.call(this, a1, a2);
          case 4:
            return fn.call(this, a1, a2, a3);
          case 5:
            return fn.call(this, a1, a2, a3, a4);
          case 6:
            return fn.call(this, a1, a2, a3, a4, a5);
        }
        var args = new Array(len - 1);
        for (var i = 1; i < len; i++) {
          args[i - 1] = arguments[i];
        }
        return fn.apply(this, args);
      }
    }]);
    return FSM;
  }();
  Object.assign(FSM$1.prototype, EventEmitterMethods);

  var HasListener = function HasListener(eventEmitter, eventName, fn, context, once) {
    if (once === undefined) {
      once = false;
    }
    var listeners = eventEmitter._events[eventName];
    if (!listeners) {
      return false;
    }
    for (var i = 0, cnt = listeners.length; i < cnt; i++) {
      var listener = listeners[i];
      if (listener.fn === fn && listener.context === context && listener.once === once) {
        return true;
      }
    }
    return false;
  };

  var StateProperties = ['next', 'exit', 'enter', 'update', 'preupdate', 'postupdate'];
  var FSM = /*#__PURE__*/function (_FSMBase) {
    _inherits(FSM, _FSMBase);
    function FSM() {
      _classCallCheck(this, FSM);
      return _callSuper(this, FSM, arguments);
    }
    _createClass(FSM, [{
      key: "shutdown",
      value:
      /*
      var config = {
          start: 'A',   // default: undefined
          states: {
              A: {
                  next: 'B',  // function() { return 'B'; }
                  enter: function() {},
                  exit: function() {},
                  update: function(time, delta) {},
                  preupdate: function(time, delta) {},
                  postupdate: function(time, delta) {},
              },
              // ...
          },        
          extend: {
              i: 0,
              name: 'abc'
              // ...
          },
          init: function() {},
          enable: true,
          scene: undefined,
          eventEmitter: true,
      };
      */
      function shutdown() {
        this.stopUpdate();
        this.stopPreUpdate();
        this.stopPostUpdate();
        this._scene = undefined;
        _get(_getPrototypeOf(FSM.prototype), "shutdown", this).call(this);
      }
    }, {
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(FSM.prototype), "resetFromJSON", this).call(this, o);
        this._scene = GetValue$3(o, 'scene', undefined);
        return this;
      }
    }, {
      key: "stateProperties",
      get: function get() {
        return StateProperties;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        this.runMethod('update', time, delta);
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        this.runMethod('preupdate', time, delta);
      }
    }, {
      key: "postupdate",
      value: function postupdate(time, delta) {
        this.runMethod('postupdate', time, delta);
      }
    }, {
      key: "startUpdate",
      value: function startUpdate(scene) {
        if (!scene) {
          scene = this._scene;
        }
        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'update', this.update, this)) {
          return this;
        }
        this._scene = scene;
        eventEmitter.on('update', this.update, this);
        return this;
      }
    }, {
      key: "stopUpdate",
      value: function stopUpdate() {
        if (!this._scene) {
          return this;
        }
        this._scene.sys.events.off('update', this.update, this);
        return this;
      }
    }, {
      key: "startPreUpdate",
      value: function startPreUpdate(scene) {
        if (!scene) {
          scene = this._scene;
        }
        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'preupdate', this.preupdate, this)) {
          return this;
        }
        this._scene = scene;
        eventEmitter.on('preupdate', this.preupdate, this);
        return this;
      }
    }, {
      key: "stopPreUpdate",
      value: function stopPreUpdate() {
        if (!this._scene) {
          return this;
        }
        this._scene.sys.events.off('preupdate', this.preupdate, this);
        return this;
      }
    }, {
      key: "startPostUpdate",
      value: function startPostUpdate(scene) {
        if (!scene) {
          scene = this._scene;
        }
        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'postupdate', this.postupdate, this)) {
          return this;
        }
        this._scene = scene;
        eventEmitter.on('postupdate', this.postupdate, this);
        return this;
      }
    }, {
      key: "stopPostUpdate",
      value: function stopPostUpdate() {
        if (!this._scene) {
          return this;
        }
        this._scene.sys.events.off('postupdate', this.postupdate, this);
        return this;
      }
    }]);
    return FSM;
  }(FSM$1);

  var State = /*#__PURE__*/function (_FSM) {
    _inherits(State, _FSM);
    function State(parent, config) {
      var _this;
      _classCallCheck(this, State);
      _this = _callSuper(this, State, [config]);
      _this.parent = parent;
      _this.init();
      return _this;
    }
    _createClass(State, [{
      key: "init",
      value: function init() {
        this.start('IDLE');
      }

      // IDLE -> DRAGBEGIN|DRAG
    }, {
      key: "next_IDLE",
      value: function next_IDLE() {
        var nextState,
          parent = this.parent,
          dragState = parent.dragState;
        if (dragState.isDown) {
          nextState = parent.dragThreshold === 0 ? 'DRAG' : 'DRAGBEGIN';
        }
        return nextState;
      }
    }, {
      key: "update_IDLE",
      value: function update_IDLE(time, delta) {
        this.next();
      }
      // IDLE

      // DRAGBEGIN -> DRAG|IDLE
    }, {
      key: "next_DRAGBEGIN",
      value: function next_DRAGBEGIN() {
        var nextState,
          parent = this.parent,
          dragState = parent.dragState;
        if (dragState.isDown) {
          nextState = dragState.pointer.getDistance() >= parent.dragThreshold ? 'DRAG' : 'DRAGBEGIN';
        } else {
          // dragState.isUp
          nextState = 'IDLE';
        }
        return nextState;
      }
    }, {
      key: "update_DRAGBEGIN",
      value: function update_DRAGBEGIN(time, delta) {
        this.next();
      }
      // DRAGBEGIN

      // DRAG -> BACK|SLIDE|IDLE
    }, {
      key: "next_DRAG",
      value: function next_DRAG() {
        var nextState,
          parent = this.parent,
          dragState = parent.dragState;
        if (dragState.isUp) {
          if (parent.outOfBounds) {
            nextState = 'BACK';
          } else if (parent.slidingEnable) {
            nextState = 'SLIDE';
          } else {
            nextState = 'IDLE';
          }
        }
        return nextState;
      }
    }, {
      key: "update_DRAG",
      value: function update_DRAG(time, delta) {
        var parent = this.parent,
          dragState = parent.dragState;
        if (dragState.justMoved) {
          parent.dragging();
        }
        this.next();
      }
    }, {
      key: "enter_DRAG",
      value: function enter_DRAG() {
        this.parent.onDragStart();
      }
    }, {
      key: "exit_DRAG",
      value: function exit_DRAG() {
        this.parent.onDragEnd();
      }
      // DRAG    

      // SLIDE -> DRAG|IDLE
    }, {
      key: "next_SLIDE",
      value: function next_SLIDE() {
        var nextState,
          parent = this.parent,
          dragState = parent.dragState;
        if (dragState.isDown) {
          nextState = 'DRAG';
        } else if (!parent.isSliding) {
          nextState = 'IDLE';
        }
        return nextState;
      }
    }, {
      key: "enter_SLIDE",
      value: function enter_SLIDE() {
        this.parent.onSliding();
      }
    }, {
      key: "exit_SLIDE",
      value: function exit_SLIDE() {
        this.parent.stop();
      }
    }, {
      key: "update_SLIDE",
      value: function update_SLIDE(time, delta) {
        this.parent.sliding(time, delta);
        this.next();
      }
      // SLIDE    

      // BACK -> DRAG|IDLE
    }, {
      key: "next_BACK",
      value: function next_BACK() {
        var nextState,
          parent = this.parent,
          dragState = parent.dragState;
        if (dragState.isDown) {
          nextState = 'DRAG';
        } else if (!parent.isPullBack) {
          nextState = 'IDLE';
        }
        return nextState;
      }
    }, {
      key: "enter_BACK",
      value: function enter_BACK() {
        this.parent.onPullBack();
      }
    }, {
      key: "exit_BACK",
      value: function exit_BACK() {
        this.parent.stop();
      }
    }, {
      key: "update_BACK",
      value: function update_BACK(time, delta) {
        this.parent.pullBack(time, delta);
        this.next();
      }
      // BACK
    }]);
    return State;
  }(FSM);

  var GetTickDelta = function GetTickDelta(game) {
    return GetGame(game).loop.delta;
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var DistanceBetween = Phaser.Math.Distance.Between;
  var DragSpeed = /*#__PURE__*/function (_ComponentBase) {
    _inherits(DragSpeed, _ComponentBase);
    function DragSpeed(gameObject, config) {
      var _this;
      _classCallCheck(this, DragSpeed);
      _this = _callSuper(this, DragSpeed, [gameObject, config]);
      // this.parent = gameObject;

      _this._enable = undefined;
      gameObject.setInteractive(GetValue$2(config, "inputConfig", undefined));
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(DragSpeed, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.isInTouched = false;
        this.holdStartTime = undefined;
        this.x = undefined;
        this.y = undefined;
        this.preX = undefined;
        this.preY = undefined;
        this.localX = undefined;
        this.localY = undefined;
        this.justMoved = false;
        this.setEnable(GetValue$2(o, 'enable', true));
        this.holdThreshold = GetValue$2(o, 'holdThreshold', 50); // ms
        this.pointerOutReleaseEnable = GetValue$2(o, 'pointerOutRelease', true);
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        // Drag start only when pointer down
        this.parent.on('pointerdown', this.onPointIn, this);
        // this.parent.on('pointerover', this.onPointIn, this);

        this.parent.on('pointerup', this.onPointOut, this);
        if (this.pointerOutReleaseEnable) {
          this.parent.on('pointerout', this.onPointOut, this);
        }
        this.parent.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.on('preupdate', this.preupdate, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // GameObject events will be removed when this gameObject destroyed 
        // this.parent.off('pointerdown', this.onPointIn, this);
        // this.parent.off('pointerup', this.onPointOut, this);
        // this.parent.off('pointerout', this.onPointOut, this);
        // this.parent.off('pointermove', this.onPointerMove, this);

        this.scene.sys.events.off('preupdate', this.preupdate, this);
        this.pointer = undefined;
        _get(_getPrototypeOf(DragSpeed.prototype), "shutdown", this).call(this, fromScene);
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
          this.isInTouched = false;
          this.pointer = undefined;
        }
        this._enable = e;
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
      key: "setPointerOutReleaseEnable",
      value: function setPointerOutReleaseEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.pointerOutReleaseEnable = enable;
        return this;
      }
    }, {
      key: "isDown",
      get: function get() {
        return this.pointer && this.pointer.isDown;
      }
    }, {
      key: "isUp",
      get: function get() {
        return !this.isDown;
      }
    }, {
      key: "dx",
      get: function get() {
        return this.x - this.preX;
      }
    }, {
      key: "dy",
      get: function get() {
        return this.y - this.preY;
      }
    }, {
      key: "dt",
      get: function get() {
        var delta = GetTickDelta(this.scene);
        return delta;
      }
    }, {
      key: "speed",
      get: function get() {
        if (this.x === this.preX && this.y === this.preY) {
          return 0;
        }
        var d = DistanceBetween(this.preX, this.preY, this.x, this.y);
        var speed = d / (this.dt * 0.001);
        return speed;
      }
    }, {
      key: "speedX",
      get: function get() {
        return this.dx / (this.dt * 0.001);
      }
    }, {
      key: "speedY",
      get: function get() {
        return this.dy / (this.dt * 0.001);
      }

      // internal
    }, {
      key: "onPointIn",
      value: function onPointIn(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== undefined) {
          return;
        }
        this.pointer = pointer;
        this.localX = localX;
        this.localY = localY;
      }
    }, {
      key: "onPointOut",
      value: function onPointOut(pointer) {
        if (!this.enable || this.pointer !== pointer) {
          return;
        }
        this.pointer = undefined;
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== pointer) {
          return;
        }
        this.localX = localX;
        this.localY = localY;
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        if (!this.enable) {
          return;
        }
        var pointer = this.pointer;
        this.justMoved = false;
        if (pointer && !this.isInTouched) {
          // Touch start
          this.x = pointer.worldX;
          this.y = pointer.worldY;
          this.preX = pointer.worldX;
          this.preY = pointer.worldY;
          this.isInTouched = true;
          this.holdStartTime = undefined;
          this.emit('touchstart', pointer, this.localX, this.localY);
        } else if (pointer && this.isInTouched) {
          // In touch
          if (this.x === pointer.x && this.y === pointer.y) {
            // Hold
            if (this.holdStartTime === undefined) {
              this.holdStartTime = time;
            } else if (time - this.holdStartTime > this.holdThreshold) {
              this.preX = this.x;
              this.preY = this.y;
            }
          } else {
            // Move
            this.preX = this.x;
            this.preY = this.y;
            this.x = pointer.worldX;
            this.y = pointer.worldY;
            this.holdStartTime = undefined;
            this.justMoved = true;
            this.emit('touchmove', pointer, this.localX, this.localY);
          }
        } else if (!pointer && this.isInTouched) {
          // Touch end
          this.isInTouched = false;
          this.holdStartTime = undefined;
          this.emit('touchend', pointer);
        }
      }
    }]);
    return DragSpeed;
  }(ComponentBase);

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var Movement = /*#__PURE__*/function () {
    function Movement(config) {
      _classCallCheck(this, Movement);
      this.resetFromJSON(config);
    }
    _createClass(Movement, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setValue(GetValue$1(o, 'value', 0));
        this.setSpeed(GetValue$1(o, 'speed', 0));
        this.setAcceleration(GetValue$1(o, 'acceleration', 0));
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.setValue(0);
        this.setSpeed(0);
        this.setAcceleration(0);
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "setSpeed",
      value: function setSpeed(speed) {
        // speed == 0 : stop
        // speed  > 0 : move
        this.speed = speed;
        return this;
      }
    }, {
      key: "setAcceleration",
      value: function setAcceleration(acc) {
        // acc == 0 : constant speed
        // acc  > 0 : acceleration
        // acc  < 0 : deceleration
        this.acceleration = acc;
        return this;
      }
    }, {
      key: "updateSpeed",
      value: function updateSpeed(delta) {
        // delta in sec
        if (this.acceleration !== 0) {
          this.speed += this.acceleration * delta;
          if (this.speed < 0) {
            this.speed = 0;
          }
        }
        return this;
      }
    }, {
      key: "getDeltaValue",
      value: function getDeltaValue(delta) {
        // delta in sec
        this.updateSpeed(delta);
        if (this.speed <= 0) {
          return 0;
        }
        return this.speed * delta;
      }
    }, {
      key: "update",
      value: function update(delta) {
        // delta in sec
        this.updateSpeed(delta);
        if (this.speed > 0) {
          this.value += this.getDeltaValue(delta);
        }
        return this;
      }
    }, {
      key: "isMoving",
      get: function get() {
        return this.speed > 0;
      }
    }]);
    return Movement;
  }();

  var SlowDown = /*#__PURE__*/function () {
    function SlowDown() {
      _classCallCheck(this, SlowDown);
      this.value;
      this.dir; // true:+, false:-
      this.movement = new Movement();
    }
    _createClass(SlowDown, [{
      key: "init",
      value: function init(start, dir, speed, dec, end) {
        this.value = start;
        this.end = end;
        if (end !== undefined) {
          this.dir = start < end;
        } else {
          this.dir = dir;
        }
        this.movement.setSpeed(speed).setAcceleration(-dec);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.movement.reset();
      }
    }, {
      key: "update",
      value: function update(delta) {
        // delta in sec
        var d = this.movement.getDeltaValue(delta);
        if (!this.dir) {
          d = -d;
        }
        if (this.end === undefined) {
          this.value += d;
        } else {
          if (d === 0) {
            this.value = this.end;
          } else {
            this.value += d;
            if (this.dir) {
              // +
              if (this.value > this.end) {
                this.value = this.end;
              }
            } else {
              // -
              if (this.value < this.end) {
                this.value = this.end;
              }
            }
          }
        }
        return this;
      }
    }, {
      key: "isMoving",
      get: function get() {
        return this.movement.isMoving;
      }
    }]);
    return SlowDown;
  }();

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  var Scroller = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Scroller, _ComponentBase);
    function Scroller(gameObject, config) {
      var _this;
      _classCallCheck(this, Scroller);
      _this = _callSuper(this, Scroller, [gameObject, config]);
      // this.parent = gameObject;

      var enable = GetValue(config, 'enable', true);
      _this._state = new State(_assertThisInitialized(_this), {
        enable: enable,
        eventEmitter: false
      });
      var drapSpeedConfig = {
        inputConfig: GetValue(config, 'inputConfig', undefined),
        enable: enable,
        pointerOutRelease: GetValue(config, 'pointerOutRelease', true),
        eventEmitter: false
      };
      _this.dragState = new DragSpeed(gameObject, drapSpeedConfig);
      _this._enable = undefined;
      _this._value = undefined;
      _this._slowDown = new SlowDown();
      var callback = GetValue(config, 'valuechangeCallback', null);
      if (callback !== null) {
        var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
        _this.on('valuechange', callback, scope);
      }
      callback = GetValue(config, 'overmaxCallback', null);
      if (callback !== null) {
        var scope = GetValue(config, 'overmaxCallbackScope', undefined);
        _this.on('overmax', callback, scope);
      }
      callback = GetValue(config, 'overminCallback', null);
      if (callback !== null) {
        var scope = GetValue(config, 'overminCallbackScope', undefined);
        _this.on('overmin', callback, scope);
      }
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Scroller, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setOrientationMode(GetValue(o, 'orientation', 0));
        this.setDragThreshold(GetValue(o, 'threshold', 10));
        this.setSlidingDeceleration(GetValue(o, 'slidingDeceleration', 5000));
        this.setBackDeceleration(GetValue(o, 'backDeceleration', 2000));
        var dragRate = GetValue(o, 'dragRate', 1);
        dragRate = dragRate * (GetValue(o, 'dragReverse', false) ? -1 : 1);
        this.setDragRate(dragRate);
        var bounds = GetValue(o, 'bounds', undefined);
        if (bounds) {
          this.setBounds(bounds);
        } else {
          this.setBounds(GetValue(o, 'max', 0), GetValue(o, 'min', 0));
        }
        this.setValue(GetValue(o, 'value', this.maxValue || 0));
        this.setEnable(GetValue(o, "enable", true));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.scene.sys.events.on('preupdate', this._state.update, this._state);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.scene.sys.events.off('preupdate', this._state.update, this._state);
        this._state.destroy(fromScene);
        this.dragState.destroy(fromScene);
        this._state = undefined;
        this.dragState = undefined;
        _get(_getPrototypeOf(Scroller.prototype), "shutdown", this).call(this, fromScene);
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
        this._enable = e;
        this._state.setEnable(e);
        this.dragState.setEnable(e);
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
      key: "setOrientationMode",
      value: function setOrientationMode(m) {
        if (typeof m === 'string') {
          m = ORIENTATIONMODE[m];
        }
        this.orientationMode = m;
        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }, {
      key: "setSlidingDeceleration",
      value: function setSlidingDeceleration(dec) {
        this.slidingDeceleration = dec;
        return this;
      }
    }, {
      key: "setBackDeceleration",
      value: function setBackDeceleration(dec) {
        this.backDeceleration = dec;
        return this;
      }
    }, {
      key: "setDragRate",
      value: function setDragRate(ratio) {
        this.dragRate = ratio;
        return this;
      }
    }, {
      key: "setBounds",
      value: function setBounds(value0, value1) {
        if (Array.isArray(value0)) {
          var bounds = value0;
          value0 = bounds[0];
          value1 = bounds[1];
        }
        if (value0 < value1) {
          this.minValue = value0;
          this.maxValue = value1;
        } else {
          this.minValue = value1;
          this.maxValue = value0;
        }
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (value === this._value) {
          return;
        }
        var oldValue = this._value;
        var isOverMax = this.overMax(value);
        var isOverMin = this.overMin(value);
        if (isOverMax) {
          this.emit('overmax', value, oldValue);
        }
        if (isOverMin) {
          this.emit('overmin', value, oldValue);
        }
        if (!this.backEnable) {
          if (isOverMax) {
            value = this.maxValue;
          }
          if (isOverMin) {
            value = this.minValue;
          }
        }
        this._value = value;
        this.emit('valuechange', value, oldValue);
      }
    }, {
      key: "setValue",
      value: function setValue(value, clamp) {
        if (clamp === undefined) {
          clamp = false;
        }
        if (clamp) {
          value = Clamp(value, this.minValue, this.maxValue);
        }
        this.value = value;
        return this;
      }
    }, {
      key: "addValue",
      value: function addValue(inc, clamp) {
        this.setValue(this.value + inc, clamp);
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this._state.state;
      }
    }, {
      key: "isDragging",
      get: function get() {
        return this.dragState.isInTouched;
      }
    }, {
      key: "outOfMaxBound",
      get: function get() {
        return this.overMax(this.value);
      }
    }, {
      key: "outOfMinBound",
      get: function get() {
        return this.overMin(this.value);
      }
    }, {
      key: "outOfBounds",
      get: function get() {
        return this.outOfMinBound || this.outOfMaxBound;
      }

      // internal
    }, {
      key: "overMax",
      value: function overMax(value) {
        return this.maxValue != null && value > this.maxValue;
      }
    }, {
      key: "overMin",
      value: function overMin(value) {
        return this.minValue != null && value < this.minValue;
      }
    }, {
      key: "backEnable",
      get: function get() {
        return typeof this.backDeceleration === 'number';
      }
    }, {
      key: "isPullBack",
      get: function get() {
        return this._slowDown.isMoving;
      }
    }, {
      key: "slidingEnable",
      get: function get() {
        return typeof this.slidingDeceleration === 'number';
      }
    }, {
      key: "isSliding",
      get: function get() {
        return this._slowDown.isMoving;
      }
    }, {
      key: "dragDelta",
      get: function get() {
        var delta;
        if (this.orientationMode === 0) {
          // y
          delta = this.dragState.dy;
        } else if (this.orientationMode === 1) {
          // x
          delta = this.dragState.dx;
        } else {
          delta = 0;
        }
        delta *= this.dragRate;
        return delta;
      }
    }, {
      key: "dragSpeed",
      get: function get() {
        var speed;
        if (this.orientationMode === 0) {
          // y
          speed = this.dragState.speedY;
        } else if (this.orientationMode === 1) {
          // x
          speed = this.dragState.speedX;
        } else {
          speed = 0;
        }
        speed *= this.dragRate;
        return speed;
      }

      // enter_DRAG
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.emit('dragstart');
      }

      // exit_DRAG
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.emit('dragend');
      }

      // everyTick_DRAG
    }, {
      key: "dragging",
      value: function dragging() {
        this.value += this.dragDelta;
      }

      // enter_SLIDE 
    }, {
      key: "onSliding",
      value: function onSliding() {
        var start = this.value;
        var speed = this.dragSpeed;
        if (speed === 0) {
          this._slowDown.stop();
          this._state.next();
          return;
        }
        var dec = this.slidingDeceleration;
        this._slowDown.init(start, speed > 0, Math.abs(speed), dec);
      }

      // everyTick_SLIDE
    }, {
      key: "sliding",
      value: function sliding(time, delta) {
        delta *= 0.001;
        var newValue = this._slowDown.update(delta).value;
        if (this.overMax(newValue)) {
          this.value = this.maxValue;
          this._slowDown.stop();
        } else if (this.overMin(newValue)) {
          this.value = this.minValue;
          this._slowDown.stop();
        } else {
          this.value = newValue;
        }
      }

      // enter_BACK
    }, {
      key: "onPullBack",
      value: function onPullBack() {
        var start = this.value;
        var end = this.outOfMinBound ? this.minValue : this.maxValue;
        var dist = Math.abs(end - start);
        var dec = this.backDeceleration;
        var speed = Math.sqrt(2 * dec * dist);
        this._slowDown.init(start, undefined, speed, dec, end);
      }

      // everyTick_BACK
    }, {
      key: "pullBack",
      value: function pullBack(time, delta) {
        delta *= 0.001;
        this.value = this._slowDown.update(delta).value;
        if (!this._slowDown.isMoving) {
          this._state.next();
        }
      }

      // exit_SLIDE, exit_BACK
    }, {
      key: "stop",
      value: function stop() {
        this._slowDown.stop();
      }
    }]);
    return Scroller;
  }(ComponentBase);
  var ORIENTATIONMODE = {
    y: 0,
    v: 0,
    vertical: 0,
    x: 1,
    h: 1,
    horizontal: 1
  };

  var ScrollerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(ScrollerPlugin, _Phaser$Plugins$BaseP);
    function ScrollerPlugin(pluginManager) {
      _classCallCheck(this, ScrollerPlugin);
      return _callSuper(this, ScrollerPlugin, [pluginManager]);
    }
    _createClass(ScrollerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new Scroller(gameObject, config);
      }
    }]);
    return ScrollerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return ScrollerPlugin;

}));
