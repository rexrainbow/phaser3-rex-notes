(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexmodalplugin = factory());
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

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$b(config, 'eventEmitter', true));

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
  var GetValue$a = function GetValue(source, key, defaultValue) {
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
      var states = GetValue$a(config, 'states', undefined);
      if (states) {
        this.addStates(states);
      }

      // Attach extend members
      var extend = GetValue$a(config, 'extend', undefined);
      if (extend) {
        for (var name in extend) {
          if (!this.hasOwnProperty(name) || this[name] === undefined) {
            this[name] = extend[name];
          }
        }
      }

      // Event emitter
      var eventEmitter = GetValue$a(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue$a(config, 'EventEmitterClass', undefined);
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
        this.setEnable(GetValue$a(o, 'enable', true));
        this.start(GetValue$a(o, 'start', undefined));
        var init = GetValue$a(o, 'init', undefined);
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
        this._scene = GetValue$a(o, 'scene', undefined);
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

  /*
  graph TD

  IDLE --> |"requestOpen()"| TRANS_OPNE["TRAN_OPEN<br>runTransitionInCallback()"]
  TRANS_OPNE --> |transitInTime| OPEN
  OPEN --> |"requestClose()"| TRANS_CLOSE["TRANS_CLOSE<br>runTransitionOutCallback()"]
  TRANS_CLOSE --> |transitOutTime| CLOSE
  CLOSE --> |"requestOpen()"| TRANS_OPNE
  */
  var State = /*#__PURE__*/function (_FSM) {
    _inherits(State, _FSM);
    function State(parent, config) {
      var _this;
      _classCallCheck(this, State);
      _this = _callSuper(this, State, [config]);
      _this.parent = parent;
      var initState = config.initState || 'IDLE';
      _this.start(initState);
      return _this;
    }
    _createClass(State, [{
      key: "init",
      value: function init() {
        this.start('IDLE');
      }

      // IDLE -> TRANS_OPNE
    }, {
      key: "next_IDLE",
      value: function next_IDLE() {
        return 'TRANS_OPNE';
      }
      // IDLE

      // TRANS_OPNE -> OPEN
    }, {
      key: "next_TRANS_OPNE",
      value: function next_TRANS_OPNE() {
        return 'OPEN';
      }
    }, {
      key: "enter_TRANS_OPNE",
      value: function enter_TRANS_OPNE() {
        var transitionBehavior = this.parent;
        if (transitionBehavior.transitInTime > 0) {
          var delay = transitionBehavior.runTransitionInCallback();
          transitionBehavior.delayCall(delay, this.next, this);
        } else {
          this.next();
        }
      }
    }, {
      key: "exit_TRANS_OPNE",
      value: function exit_TRANS_OPNE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
      }
      // TRANS_OPNE

      // OPEN -> TRANS_CLOSE
    }, {
      key: "next_OPEN",
      value: function next_OPEN() {
        return 'TRANS_CLOSE';
      }
    }, {
      key: "enter_OPEN",
      value: function enter_OPEN() {
        var transitionBehavior = this.parent;
        transitionBehavior.onOpen();
      }
    }, {
      key: "exit_OPEN",
      value: function exit_OPEN() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
      }
      // OPEN

      // TRANS_CLOSE -> CLOSE
    }, {
      key: "next_TRANS_CLOSE",
      value: function next_TRANS_CLOSE() {
        return 'CLOSE';
      }
    }, {
      key: "enter_TRANS_CLOSE",
      value: function enter_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        if (transitionBehavior.transitOutTime > 0) {
          var delay = transitionBehavior.runTransitionOutCallback();
          transitionBehavior.delayCall(delay, this.next, this);
        } else {
          this.next();
        }
      }
    }, {
      key: "exit_TRANS_CLOSE",
      value: function exit_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
      }
      // TRANS_CLOSE

      // CLOSE -> TRANS_OPNE
    }, {
      key: "next_CLOSE",
      value: function next_CLOSE() {
        return 'TRANS_OPNE';
      }
    }, {
      key: "enter_CLOSE",
      value: function enter_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.onClose();
      }
    }, {
      key: "exit_CLOSE",
      value: function exit_CLOSE() {}
      // CLOSE
    }, {
      key: "canOpen",
      value: function canOpen() {
        return this.state === 'IDLE' || this.state === 'CLOSE';
      }
    }, {
      key: "canClose",
      value: function canClose() {
        return this.state === 'IDLE' || this.state === 'OPEN';
      }
    }]);
    return State;
  }(FSM);

  var PostStepDelayCall = function PostStepDelayCall(gameObject, delay, callback, scope, args) {
    // Invoke callback under game's 'poststep' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function () {
      scene.game.events.once('poststep', function () {
        callback.call(scope, args);
      });
    });
    return timer;
  };

  var DelayCallMethods = {
    delayCall: function delayCall(delay, callback, scope) {
      // Invoke callback under scene's 'postupdate' event
      this.delayCallTimer = PostStepDelayCall(this, delay, callback, scope);
      return this;
    },
    removeDelayCall: function removeDelayCall() {
      if (this.delayCallTimer) {
        this.delayCallTimer.remove(false);
        this.delayCallTimer = undefined;
      }
      return this;
    }
  };

  var NOOP = function NOOP() {
    //  NOOP
  };

  var ConfigurationMethods = {
    setTransitInTime: function setTransitInTime(time) {
      this.transitInTime = time;
      return this;
    },
    setTransitOutTime: function setTransitOutTime(time) {
      this.transitOutTime = time;
      return this;
    },
    setTransitInCallback: function setTransitInCallback(callback) {
      if (!callback) {
        callback = NOOP;
      }
      this.transitInCallback = callback;
      // callback = function(gameObject, duration) {}
      return this;
    },
    setTransitOutCallback: function setTransitOutCallback(callback) {
      if (!callback) {
        callback = NOOP;
      }
      this.transitOutCallback = callback;
      // callback = function(gameObject, duration) {}
      return this;
    }
  };

  var OpenMethods = {
    // Override
    runTransitionInCallback: function runTransitionInCallback() {
      this.transitInCallback(this.parent, this.transitInTime);
      return this.transitInTime;
    },
    // Override
    onOpen: function onOpen() {},
    requestOpen: function requestOpen(openEventData, duration) {
      if (!this._state.canOpen()) {
        return this;
      }
      this.openEventData = arguments.length > 0 ? openEventData : this.parent;
      var transitionTimeSave = this.transitInTime;
      if (duration !== undefined) {
        this.transitInTime = duration;
      }
      this._state["goto"]('TRANS_OPNE');
      this.transitInTime = transitionTimeSave;
      return this;
    }
  };

  var CloseMethods = {
    // Override
    runTransitionOutCallback: function runTransitionOutCallback() {
      this.transitOutCallback(this.parent, this.transitOutTime);
      return this.transitOutTime;
    },
    // Override
    onClose: function onClose() {
      // Destroy parent and this behavior
      if (this.oneShotMode) {
        this.parent.destroy();
        // Will invoke `this.destroy()`
      }
    },
    requestClose: function requestClose(closeEventData, duration) {
      if (!this._state.canClose) {
        return this;
      }
      this.closeEventData = arguments.length > 0 ? closeEventData : this.parent;
      var transitionTimeSave = this.transitOutTime;
      if (duration !== undefined) {
        this.transitOutTime = duration;
      }
      this._state["goto"]('TRANS_CLOSE');
      this.transitOutTime = transitionTimeSave;
      return this;
    }
  };

  var methods = {};
  Object.assign(methods, DelayCallMethods, ConfigurationMethods, OpenMethods, CloseMethods);

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var OpenCloseTransition = /*#__PURE__*/function (_ComponentBase) {
    _inherits(OpenCloseTransition, _ComponentBase);
    function OpenCloseTransition(gameObject, config) {
      var _this;
      _classCallCheck(this, OpenCloseTransition);
      _this = _callSuper(this, OpenCloseTransition, [gameObject, config]);
      // this.parent = gameObject;
      // this.scene

      _this.setTransitInTime(GetValue$9(config, 'duration.in', 200));
      _this.setTransitOutTime(GetValue$9(config, 'duration.out', 200));
      _this.setTransitInCallback(GetValue$9(config, 'transitIn'));
      _this.setTransitOutCallback(GetValue$9(config, 'transitOut'));
      _this.oneShotMode = GetValue$9(config, 'destroy', false);
      _this.delayCallTimer = undefined;
      _this._state = new State(_assertThisInitialized(_this), {
        eventEmitter: false,
        initState: GetValue$9(config, 'initState', 'IDLE')
      });
      _this.openEventData = undefined;
      _this.closeEventData = undefined;
      return _this;
    }
    _createClass(OpenCloseTransition, [{
      key: "state",
      get: function get() {
        return this._state.state;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.transitInCallback = undefined;
        this.transitOutCallback = undefined;
        this.openEventData = undefined;
        this.closeEventData = undefined;
        this.removeDelayCall();
        _get(_getPrototypeOf(OpenCloseTransition.prototype), "shutdown", this).call(this, fromScene);
      }
    }]);
    return OpenCloseTransition;
  }(ComponentBase);
  Object.assign(OpenCloseTransition.prototype, methods);

  var GetFirstRenderCamera = function GetFirstRenderCamera(scene, gameObject) {
    var cameras = scene.sys.cameras.cameras;
    var camera, cameraFilter, isCameraIgnore;
    for (var i = 0, cnt = cameras.length; i < cnt; i++) {
      camera = cameras[i];
      cameraFilter = gameObject.cameraFilter;
      isCameraIgnore = cameraFilter !== 0 && cameraFilter & camera.id;
      if (!isCameraIgnore) {
        return camera;
      }
    }
    return null;
  };

  var FullWindow = /*#__PURE__*/function (_ComponentBase) {
    _inherits(FullWindow, _ComponentBase);
    function FullWindow(gameObject, config) {
      var _this;
      _classCallCheck(this, FullWindow);
      _this = _callSuper(this, FullWindow, [gameObject]);
      // this.parent = gameObject;

      gameObject.setOrigin(0.5).setScrollFactor(0);
      _this.targetCamera = undefined;
      _this.boot();
      return _this;
    }
    _createClass(FullWindow, [{
      key: "boot",
      value: function boot() {
        this.scene.sys.events.on('prerender', this.resize, this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (!this.scene) {
          return;
        }
        this.scene.sys.events.off('prerender', this.resize, this);
        _get(_getPrototypeOf(FullWindow.prototype), "destroy", this).call(this);
      }
    }, {
      key: "getTargetCamera",
      value: function getTargetCamera() {
        var gameObject = this.parent;
        if (this.targetCamera) {
          var isCameraIgnore = gameObject.cameraFilter !== 0 && gameObject.cameraFilter & this.targetCamera.id;
          if (isCameraIgnore) {
            this.targetCamera = undefined;
          }
        }
        if (!this.targetCamera) {
          this.targetCamera = GetFirstRenderCamera(this.scene, gameObject);
        }
        return this.targetCamera;
      }
    }, {
      key: "resize",
      value: function resize() {
        var camera = this.getTargetCamera();
        if (!camera) {
          return;
        }
        var scene = this.scene;
        var gameObject = this.parent;
        var gameSize = scene.sys.scale.gameSize;
        var gameWidth = gameSize.width,
          gameHeight = gameSize.height,
          scale = 1 / camera.zoom;

        // Origin is fixed to (0.5,0.5)
        var x = gameWidth / 2,
          y = gameHeight / 2;
        var width = gameWidth * scale,
          height = gameHeight * scale;
        if (gameObject.x !== x || gameObject.y !== y) {
          gameObject.setPosition(x, y);
        }
        if (gameObject.width !== width || gameObject.height !== height) {
          gameObject.setSize(width, height);
        }
      }
    }]);
    return FullWindow;
  }(ComponentBase);

  var Rectangle$1 = Phaser.GameObjects.Rectangle;
  var FullWindowRectangle = /*#__PURE__*/function (_Rectangle) {
    _inherits(FullWindowRectangle, _Rectangle);
    function FullWindowRectangle(scene, color, alpha) {
      var _this;
      _classCallCheck(this, FullWindowRectangle);
      _this = _callSuper(this, FullWindowRectangle, [scene, 0, 0, 2, 2, color, 1]);
      _this.fullWindow = new FullWindow(_assertThisInitialized(_this));
      _this.setAlpha(alpha);
      return _this;
    }
    _createClass(FullWindowRectangle, [{
      key: "tint",
      get: function get() {
        return this.fillColor;
      },
      set: function set(value) {
        this.setFillStyle(value, this.fillAlpha);
      }
    }]);
    return FullWindowRectangle;
  }(Rectangle$1);

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var TouchEventStop = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TouchEventStop, _ComponentBase);
    function TouchEventStop(gameObject, config) {
      var _this;
      _classCallCheck(this, TouchEventStop);
      _this = _callSuper(this, TouchEventStop, [gameObject, {
        eventEmitter: false
      }]);
      // No event emitter
      // this.parent = gameObject;

      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(TouchEventStop, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setHitAreaMode(GetValue$8(o, 'hitAreaMode', 0));
        this.setEnable(GetValue$8(o, 'enable', true));
        this.setStopMode(GetValue$8(o, 'stopAllLevels', true));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.parent.on('pointerdown', function (pointer, localX, localY, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this).on('pointerup', function (pointer, localX, localY, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this).on('pointermove', function (pointer, localX, localY, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this).on('pointerover', function (pointer, localX, localY, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this).on('pointerout', function (pointer, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this);
      }
    }, {
      key: "setHitAreaMode",
      value: function setHitAreaMode(mode) {
        if (typeof mode === 'string') {
          mode = HitAreaMode[mode];
        }
        var gameObject = this.parent;
        if (gameObject.input) {
          gameObject.removeInteractive();
        }
        if (mode === 0) {
          gameObject.setInteractive();
        } else {
          gameObject.setInteractive({
            hitArea: {},
            hitAreaCallback: function hitAreaCallback() {
              return true;
            }
          });
        }
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        if (e) {
          this.parent.setInteractive();
        } else {
          this.parent.disableInteractive();
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "setStopMode",
      value: function setStopMode(allLevels) {
        if (allLevels === undefined) {
          allLevels = true;
        }
        this.stopAllLevels = allLevels;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }]);
    return TouchEventStop;
  }(ComponentBase);
  var HitAreaMode = {
    "default": 0,
    fullWindow: 1
  };

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var Cover = /*#__PURE__*/function (_FullWindowRectangle) {
    _inherits(Cover, _FullWindowRectangle);
    function Cover(scene, config) {
      var _this;
      _classCallCheck(this, Cover);
      var fillColor = GetValue$7(config, 'color', 0x0);
      var fillAlpha = GetValue$7(config, 'alpha', 0.8);
      _this = _callSuper(this, Cover, [scene, fillColor, fillAlpha]);
      _this.touchEventStop = new TouchEventStop(_assertThisInitialized(_this), {
        hitAreaMode: 1
      });
      return _this;
    }
    return _createClass(Cover);
  }(FullWindowRectangle);

  var CreateCover = function CreateCover(gameObject, config) {
    var scene = gameObject.scene;
    var cover = new Cover(scene, config);
    scene.add.existing(cover);

    // Put cover behind game object
    if (gameObject.isRexContainerLite) {
      gameObject.pin(cover, {
        syncPosition: false,
        syncRotation: false,
        syncScale: false,
        syncAlpha: false,
        syncScrollFactor: false
      });
      gameObject.moveDepthBelow(cover);
    } else {
      scene.children.moveBelow(cover, gameObject);
    }
    return cover;
  };

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _callSuper(this, TickTask, [parent, config]);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$6(config, 'tickingMode', 1));
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

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);
    function SceneUpdateTickTask(parent, config) {
      var _this;
      _classCallCheck(this, SceneUpdateTickTask);
      _this = _callSuper(this, SceneUpdateTickTask, [parent, config]);

      // scene update : update, preupdate, postupdate, prerender, render
      // game update : step, poststep, 

      // If this.scene is not available, use game's 'step' event
      var defaultEventName = _this.scene ? 'update' : 'step';
      _this.tickEventName = GetValue$5(config, 'tickEventName', defaultEventName);
      _this.isSceneTicker = !IsGameUpdateEvent(_this.tickEventName);
      return _this;
    }
    _createClass(SceneUpdateTickTask, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "startTicking", this).call(this);
        if (this.isSceneTicker) {
          this.scene.sys.events.on(this.tickEventName, this.update, this);
        } else {
          this.game.events.on(this.tickEventName, this.update, this);
        }
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "stopTicking", this).call(this);
        if (this.isSceneTicker && this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off(this.tickEventName, this.update, this);
        } else if (this.game) {
          this.game.events.off(this.tickEventName, this.update, this);
        }
      }

      // update(time, delta) {
      //     
      // }
    }]);
    return SceneUpdateTickTask;
  }(TickTask);
  var IsGameUpdateEvent = function IsGameUpdateEvent(eventName) {
    return eventName === 'step' || eventName === 'poststep';
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$4(o, 'state', IDLE);
        this.timeScale = GetValue$4(o, 'timeScale', 1);
        this.delay = GetValue$4(o, 'delay', 0);
        this.repeat = GetValue$4(o, 'repeat', 0);
        this.repeatCounter = GetValue$4(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$4(o, 'repeatDelay', 0);
        this.duration = GetValue$4(o, 'duration', 0);
        this.nowTime = GetValue$4(o, 'nowTime', 0);
        this.justRestart = GetValue$4(o, 'justRestart', false);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          state: this.state,
          timeScale: this.timeScale,
          delay: this.delay,
          repeat: this.repeat,
          repeatCounter: this.repeatCounter,
          repeatDelay: this.repeatDelay,
          duration: this.duration,
          nowTime: this.nowTime,
          justRestart: this.justRestart
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(delay) {
        if (delay === undefined) {
          delay = 0;
        }
        this.delay = delay;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      }
    }, {
      key: "setRepeatInfinity",
      value: function setRepeatInfinity() {
        this.repeat = -1;
        return this;
      }
    }, {
      key: "setRepeatDelay",
      value: function setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        this.nowTime = this.delay > 0 ? -this.delay : 0;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.repeatCounter = 0;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.state = IDLE;
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.state === IDLE || this.state === DONE || delta === 0 || this.timeScale === 0) {
          return;
        }
        this.nowTime += delta * this.timeScale;
        this.justRestart = false;
        if (this.nowTime >= this.duration) {
          if (this.repeat === -1 || this.repeatCounter < this.repeat) {
            this.repeatCounter++;
            this.justRestart = true;
            this.nowTime -= this.duration;
            if (this.repeatDelay > 0) {
              this.nowTime -= this.repeatDelay;
              this.state = REPEATDELAY;
            }
          } else {
            this.nowTime = this.duration;
            this.state = DONE;
          }
        } else if (this.nowTime >= 0) {
          this.state = COUNTDOWN;
        }
      }
    }, {
      key: "t",
      get: function get() {
        var t;
        switch (this.state) {
          case IDLE:
          case DELAY:
          case REPEATDELAY:
            t = 0;
            break;
          case COUNTDOWN:
            t = this.nowTime / this.duration;
            break;
          case DONE:
            t = 1;
            break;
        }
        return Clamp(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp(value, -1, 1);
        if (value < 0) {
          this.state = DELAY;
          this.nowTime = -this.delay * value;
        } else {
          this.state = COUNTDOWN;
          this.nowTime = this.duration * value;
          if (value === 1 && this.repeat !== 0) {
            this.repeatCounter++;
          }
        }
      }
    }, {
      key: "setT",
      value: function setT(t) {
        this.t = t;
        return this;
      }
    }, {
      key: "isIdle",
      get: function get() {
        return this.state === IDLE;
      }
    }, {
      key: "isDelay",
      get: function get() {
        return this.state === DELAY;
      }
    }, {
      key: "isCountDown",
      get: function get() {
        return this.state === COUNTDOWN;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.state === DELAY || this.state === COUNTDOWN;
      }
    }, {
      key: "isDone",
      get: function get() {
        return this.state === DONE;
      }
    }, {
      key: "isOddIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 1;
      }
    }, {
      key: "isEvenIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 0;
      }
    }]);
    return Timer;
  }();
  var IDLE = 0;
  var DELAY = 1;
  var COUNTDOWN = 2;
  var REPEATDELAY = 3;
  var DONE = -1;

  var TimerTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(TimerTickTask, _TickTask);
    function TimerTickTask(parent, config) {
      var _this;
      _classCallCheck(this, TimerTickTask);
      _this = _callSuper(this, TimerTickTask, [parent, config]);
      _this.timer = new Timer();
      // boot() later 
      return _this;
    }

    // override
    _createClass(TimerTickTask, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        _get(_getPrototypeOf(TimerTickTask.prototype), "shutdown", this).call(this, fromScene);
        this.timer.destroy();
        this.timer = undefined;
      }
    }, {
      key: "start",
      value: function start() {
        this.timer.start();
        _get(_getPrototypeOf(TimerTickTask.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.timer.stop();
        _get(_getPrototypeOf(TimerTickTask.prototype), "stop", this).call(this);
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.timer.stop();
        _get(_getPrototypeOf(TimerTickTask.prototype), "complete", this).call(this);
        return this;
      }
    }]);
    return TimerTickTask;
  }(SceneUpdateTickTask);

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
  var EaseValueTaskBase = /*#__PURE__*/function (_TimerTask) {
    _inherits(EaseValueTaskBase, _TimerTask);
    function EaseValueTaskBase() {
      _classCallCheck(this, EaseValueTaskBase);
      return _callSuper(this, EaseValueTaskBase, arguments);
    }
    _createClass(EaseValueTaskBase, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$3(o, 'timer'));
        this.setEnable(GetValue$3(o, 'enable', true));
        this.setTarget(GetValue$3(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$2(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$2(o, 'duration', 1000));
        this.setEase(GetValue$3(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$3(o, 'repeat', 0));
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e == undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "setTarget",
      value: function setTarget(target) {
        if (target === undefined) {
          target = this.parent;
        }
        this.target = target;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(time) {
        this.delay = time;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(time) {
        this.duration = time;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
      }
    }, {
      key: "setRepeatDelay",
      value: function setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(ease) {
        if (ease === undefined) {
          ease = 'Linear';
        }
        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
      }

      // Override
    }, {
      key: "start",
      value: function start() {
        // Ignore start if timer is running, i.e. in DELAY, o RUN state
        if (this.timer.isRunning) {
          return this;
        }
        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.timer.stop();
        this.start.apply(this, arguments);
        return this;
      }
    }, {
      key: "stop",
      value: function stop(toEnd) {
        if (toEnd === undefined) {
          toEnd = false;
        }
        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "stop", this).call(this);
        if (toEnd) {
          this.timer.setT(1);
          this.updateGameObject(this.target, this.timer);
          this.complete();
        }
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable || !this.parent.active) {
          return this;
        }
        var target = this.target,
          timer = this.timer;
        timer.update(time, delta);

        // isDelay, isCountDown, isDone
        if (!timer.isDelay) {
          this.updateGameObject(target, timer);
        }
        this.emit('update', target, this);
        if (timer.isDone) {
          this.complete();
        }
        return this;
      }

      // Override
    }, {
      key: "updateGameObject",
      value: function updateGameObject(target, timer) {}
    }]);
    return EaseValueTaskBase;
  }(TimerTickTask);

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$1 = Phaser.Math.Linear;
  var Scale = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Scale, _EaseValueTaskBase);
    function Scale(gameObject, config) {
      var _this;
      _classCallCheck(this, Scale);
      _this = _callSuper(this, Scale, [gameObject, config]);
      // this.parent = gameObject;
      // this.timer

      _this.scaleStart = {};
      _this.scaleEnd = {};
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Scale, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Scale.prototype), "resetFromJSON", this).call(this, o);
        this.setMode(GetValue$2(o, 'mode', 0));
        this.setScaleRange(GetAdvancedValue$1(o, 'start', undefined), GetAdvancedValue$1(o, 'end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE$1[m];
        }
        this.mode = m;
        return this;
      }
    }, {
      key: "setScaleRange",
      value: function setScaleRange(start, end) {
        if (typeof start === 'number') {
          this.startX = start;
          this.startY = start;
        } else {
          this.startX = GetAdvancedValue$1(start, 'x', this.parent.scaleX);
          this.startY = GetAdvancedValue$1(start, 'y', this.parent.scaleY);
        }
        if (typeof end === 'number') {
          this.endX = end;
          this.endY = end;
        } else {
          this.endX = GetAdvancedValue$1(end, 'x', undefined);
          this.endY = GetAdvancedValue$1(end, 'y', undefined);
        }
        this.hasScaleX = this.startX !== undefined && this.endX !== undefined;
        this.hasScaleY = this.startY !== undefined && this.endY !== undefined;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }
        var gameObject = this.parent;
        if (this.hasScaleX) {
          gameObject.scaleX = this.startX;
        }
        if (this.hasScaleY) {
          gameObject.scaleY = this.startY;
        }
        var repeat = this.repeat;
        if (this.mode === 2) {
          // Yoyo
          if (repeat !== -1) {
            repeat = (repeat + 1) * 2 - 1;
          }
        }
        this.timer.setDelay(this.delay).setDuration(this.duration).setRepeat(repeat);
        _get(_getPrototypeOf(Scale.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = timer.t;
        if (timer.isOddIteration) {
          // Yoyo
          t = 1 - t;
        }
        t = this.easeFn(t);
        if (this.hasScaleX) {
          gameObject.scaleX = Linear$1(this.startX, this.endX, t);
        }
        if (this.hasScaleY) {
          gameObject.scaleY = Linear$1(this.startY, this.endY, t);
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Scale.prototype), "complete", this).call(this);
        if (this.mode === 1) {
          this.parent.destroy();
          // Will also destroy this behavior
        }
        return this;
      }
    }]);
    return Scale;
  }(EaseValueTaskBase);
  var MODE$1 = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var PopUp = function PopUp(gameObject, duration, orientation, ease, scale) {
    if (ease === undefined) {
      ease = 'Cubic';
    }

    // Ease scale from 0 to current scale
    var start, end;
    switch (orientation) {
      case 0:
      case 'x':
        start = {
          x: 0
        };
        end = {
          x: gameObject.scaleX
        };
        break;
      case 1:
      case 'y':
        start = {
          y: 0
        };
        end = {
          y: gameObject.scaleY
        };
        break;
      default:
        start = 0;
        end = gameObject.scale;
        break;
    }
    var config = {
      mode: 0,
      start: start,
      end: end,
      duration: duration,
      ease: ease
    };
    if (scale === undefined) {
      scale = new Scale(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }
    scale.restart();
    return scale;
  };

  var ScaleDownDestroy = function ScaleDownDestroy(gameObject, duration, orientation, ease, destroyMode, scale) {
    if (ease === undefined) {
      ease = 'Linear';
    }

    // Ease from current scale to 0
    if (destroyMode instanceof Scale) {
      scale = destroyMode;
      destroyMode = undefined;
    }
    if (destroyMode === undefined) {
      destroyMode = true;
    }
    var config = {};
    config.mode = destroyMode ? 1 : 0;
    switch (orientation) {
      case 0:
      case 'x':
        config.end = {
          x: 0
        };
        break;
      case 1:
      case 'y':
        config.end = {
          y: 0
        };
        break;
      default:
        config.end = 0;
        break;
    }
    config.duration = duration;
    config.ease = ease;
    if (scale === undefined) {
      scale = new Scale(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }
    scale.restart();
    return scale;
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear = Phaser.Math.Linear;
  var Fade = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Fade, _EaseValueTaskBase);
    function Fade(gameObject, config) {
      var _this;
      _classCallCheck(this, Fade);
      _this = _callSuper(this, Fade, [gameObject, config]);
      // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Fade, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Fade.prototype), "resetFromJSON", this).call(this, o);
        this.setMode(GetValue$1(o, 'mode', 0));
        this.setAlphaRange(GetAdvancedValue(o, 'start', this.parent.alpha), GetAdvancedValue(o, 'end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE[m];
        }
        this.mode = m;
        return this;
      }
    }, {
      key: "setAlphaRange",
      value: function setAlphaRange(start, end) {
        this.alphaStart = start;
        this.alphaEnd = end;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }
        var gameObject = this.parent;
        gameObject.setAlpha(this.alphaStart);
        this.timer.setDelay(this.delay).setDuration(this.duration).setRepeat(this.mode === 2 ? -1 : 0);
        _get(_getPrototypeOf(Fade.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = timer.t;
        if (timer.isOddIteration) {
          // Yoyo
          t = 1 - t;
        }
        gameObject.alpha = Linear(this.alphaStart, this.alphaEnd, t);
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Fade.prototype), "complete", this).call(this);
        if (this.mode === 1) {
          this.parent.destroy();
          // Will also destroy this behavior
        }
        return this;
      }
    }]);
    return Fade;
  }(EaseValueTaskBase);
  var MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var FadeIn = function FadeIn(gameObject, duration, alpha, fade) {
    var startAlpha, endAlpha;
    if (IsPlainObject(alpha)) {
      startAlpha = alpha.start;
      endAlpha = alpha.end;
    } else {
      endAlpha = alpha;
    }
    if (startAlpha === undefined) {
      startAlpha = 0;
    }
    if (endAlpha === undefined) {
      endAlpha = 1;
    }
    var config = {
      mode: 0,
      start: startAlpha,
      end: endAlpha,
      duration: duration
    };
    if (fade === undefined) {
      fade = new Fade(gameObject, config);
    } else {
      fade.resetFromJSON(config);
    }
    fade.restart();
    return fade;
  };

  var FadeOutDestroy = function FadeOutDestroy(gameObject, duration, destroyMode, fade) {
    if (destroyMode instanceof Fade) {
      fade = destroyMode;
      destroyMode = undefined;
    }
    if (destroyMode === undefined) {
      destroyMode = true;
    }
    var config = {
      mode: destroyMode ? 1 : 0,
      end: 0,
      duration: duration
    };
    if (fade === undefined) {
      fade = new Fade(gameObject, config);
    } else {
      fade.resetFromJSON(config);
    }
    fade.restart();
    return fade;
  };

  var DefaultTransitCallbacks = {
    popUp: function popUp(gameObject, duration) {
      if (gameObject._modalScaleSave !== undefined) {
        gameObject.scaleX = gameObject._modalScaleSave;
        gameObject.scaleY = gameObject._modalScaleSave;
      } else {
        gameObject._modalScaleSave = gameObject.scaleX;
      }
      PopUp(gameObject, duration);
    },
    scaleDown: function scaleDown(gameObject, duration) {
      // Don't destroy here
      ScaleDownDestroy(gameObject, duration, undefined, undefined, false);
    },
    fadeIn: function fadeIn(gameObject, duration) {
      if (gameObject._modalAlphaSave !== undefined) {
        gameObject.alpha = gameObject._modalAlphaSave;
      } else {
        gameObject._modalAlphaSave = gameObject.alpha;
      }
      FadeIn(gameObject, duration);
    },
    fadeOut: function fadeOut(gameObject, duration) {
      // Don't destroy here
      FadeOutDestroy(gameObject, duration, false);
    }
  };

  var DefaultCoverTransitInCallback = function DefaultCoverTransitInCallback(cover, duration) {
    if (cover._modalAlphaSave !== undefined) {
      cover.alpha = cover._modalAlphaSave;
    } else {
      cover._modalAlphaSave = cover.alpha;
    }
    FadeIn(cover, duration, cover.alpha);
  };
  var DefaultCoverTransitOutCallback = function DefaultCoverTransitOutCallback(cover, duration) {
    FadeOutDestroy(cover, duration, false);
  };

  var GetDisplayWidth = function GetDisplayWidth(gameObject) {
    if (gameObject.displayWidth !== undefined) {
      return gameObject.displayWidth;
    } else {
      return gameObject.width;
    }
  };
  var GetDisplayHeight = function GetDisplayHeight(gameObject) {
    if (gameObject.displayHeight !== undefined) {
      return gameObject.displayHeight;
    } else {
      return gameObject.height;
    }
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround = Phaser.Math.RotateAround;
  var GetBounds = function GetBounds(gameObject, output) {
    if (output === undefined) {
      output = new Rectangle();
    } else if (output === true) {
      if (GlobRect === undefined) {
        GlobRect = new Rectangle();
      }
      output = GlobRect;
    }
    if (gameObject.getBounds) {
      return gameObject.getBounds(output);
    }

    //  We can use the output object to temporarily store the x/y coords in:

    var TLx, TLy, TRx, TRy, BLx, BLy, BRx, BRy;

    // Instead of doing a check if parent container is
    // defined per corner we only do it once.
    if (gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      GetTopLeft(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      TLx = output.x;
      TLy = output.y;
      GetTopRight(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      TRx = output.x;
      TRy = output.y;
      GetBottomLeft(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      BLx = output.x;
      BLy = output.y;
      GetBottomRight(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      BRx = output.x;
      BRy = output.y;
    } else {
      GetTopLeft(gameObject, output);
      TLx = output.x;
      TLy = output.y;
      GetTopRight(gameObject, output);
      TRx = output.x;
      TRy = output.y;
      GetBottomLeft(gameObject, output);
      BLx = output.x;
      BLy = output.y;
      GetBottomRight(gameObject, output);
      BRx = output.x;
      BRy = output.y;
    }
    output.x = Math.min(TLx, TRx, BLx, BRx);
    output.y = Math.min(TLy, TRy, BLy, BRy);
    output.width = Math.max(TLx, TRx, BLx, BRx) - output.x;
    output.height = Math.max(TLy, TRy, BLy, BRy) - output.y;
    return output;
  };
  var GlobRect = undefined;
  var GetTopLeft = function GetTopLeft(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getTopLeft) {
      return gameObject.getTopLeft(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX;
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY;
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetTopRight = function GetTopRight(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getTopRight) {
      return gameObject.getTopRight(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX + GetDisplayWidth(gameObject);
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY;
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetBottomLeft = function GetBottomLeft(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getBottomLeft) {
      return gameObject.getBottomLeft(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX;
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY + GetDisplayHeight(gameObject);
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetBottomRight = function GetBottomRight(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getBottomRight) {
      return gameObject.getBottomRight(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX + GetDisplayWidth(gameObject);
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY + GetDisplayHeight(gameObject);
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GlobVector = undefined;
  var PrepareBoundsOutput = function PrepareBoundsOutput(gameObject, output, includeParent) {
    if (includeParent === undefined) {
      includeParent = false;
    }
    if (gameObject.rotation !== 0) {
      RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
    }
    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }
    return output;
  };

  var IsPointInBounds = function IsPointInBounds(gameObject, x, y, preTest, postTest) {
    // Can't get bounds
    if (!gameObject) {
      return false;
    }
    if (preTest && !preTest(gameObject, x, y)) {
      return false;
    }
    var boundsRect = GetBounds(gameObject, true);
    if (!boundsRect.contains(x, y)) {
      return false;
    }
    if (postTest && !postTest(gameObject, x, y)) {
      return false;
    }
    return true;
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Modal$1 = /*#__PURE__*/function (_OpenCloseTransition) {
    _inherits(Modal, _OpenCloseTransition);
    function Modal(gameObject, config) {
      var _this;
      _classCallCheck(this, Modal);
      if (config === undefined) {
        config = {};
      }
      if (config.transitIn == null) {
        config.transitIn = TransitionMode.popUp;
      }
      if (config.transitOut == null) {
        config.transitOut = TransitionMode.scaleDown;
      }
      config.destroy = GetValue(config, 'destroy', true);
      _this = _callSuper(this, Modal, [gameObject, config]);
      // this.parent = gameObject;
      // this.scene

      // Cover : key of modal, to block touch input        
      var coverConfig = GetValue(config, 'cover');
      _this.cover = coverConfig !== false ? CreateCover(gameObject, coverConfig) : undefined;
      if (_this.cover) {
        _this.setCoverTransitInCallback(GetValue(coverConfig, 'transitIn', DefaultCoverTransitInCallback));
        _this.setCoverTransitOutCallback(GetValue(coverConfig, 'transitOut', DefaultCoverTransitOutCallback));
      }

      // Close conditions:
      var touchOutsideClose = GetValue(config, 'touchOutsideClose', false);
      var timeOutDuration = GetValue(config, 'duration.hold', -1);
      var timeOutClose = GetValue(config, 'timeOutClose', timeOutDuration >= 0);
      var anyTouchClose = GetValue(config, 'anyTouchClose', false);
      var manualClose = GetValue(config, 'manualClose', false);
      if (manualClose) {
        touchOutsideClose = false;
        anyTouchClose = false;
        timeOutClose = false;
      }
      if (anyTouchClose) {
        touchOutsideClose = false;
      }
      if (timeOutClose) {
        _this.setDisplayTime(timeOutDuration);
      } else {
        _this.setDisplayTime(-1);
      }

      // Registet touch-close event after opened
      if (anyTouchClose) {
        _this.once('open', _this.anyTouchClose, _assertThisInitialized(_this));
      } else if (touchOutsideClose) {
        _this.once('open', _this.touchOutsideClose, _assertThisInitialized(_this));
      }
      if (GetValue(config, 'openOnStart', true)) {
        // Run this.requestOpen() next tick
        // User can register events before this.requestOpen()
        _this.delayCall(0, _this.requestOpen, _assertThisInitialized(_this));
      }
      return _this;
    }
    _createClass(Modal, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // Registered in touchOutsideClose(), or anyTouchClose()
        if (!this.cover) {
          this.scene.input.off('pointerup', this.touchCloseCallback, this);
        }
        if (this.cover && !fromScene) {
          this.cover.destroy();
          this.cover = undefined;
        }
        _get(_getPrototypeOf(Modal.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "touchOutsideClose",
      value: function touchOutsideClose() {
        if (this.cover) {
          this.cover.on('pointerup', this.touchCloseCallback, this);
        } else {
          this.scene.input.on('pointerup', this.touchCloseCallback, this);
        }
        this.clickOutsideTest = true;
        return this;
      }
    }, {
      key: "anyTouchClose",
      value: function anyTouchClose() {
        if (this.cover) {
          this.cover.once('pointerup', this.touchCloseCallback, this);
        } else {
          this.scene.input.once('pointerup', this.touchCloseCallback, this);
        }
        return this;
      }
    }, {
      key: "touchCloseCallback",
      value: function touchCloseCallback(pointer) {
        if (this.clickOutsideTest && IsPointInBounds(this.parent, pointer.worldX, pointer.worldY)) {
          return;
        }
        this.requestClose();
      }
    }, {
      key: "runTransitionInCallback",
      value: function runTransitionInCallback() {
        var duration = _get(_getPrototypeOf(Modal.prototype), "runTransitionInCallback", this).call(this);
        var cover = this.cover;
        if (cover && this.coverTransitInCallback) {
          this.coverTransitInCallback(cover, duration);
        }
        return duration;
      }
    }, {
      key: "runTransitionOutCallback",
      value: function runTransitionOutCallback() {
        var duration = _get(_getPrototypeOf(Modal.prototype), "runTransitionOutCallback", this).call(this);
        var cover = this.cover;
        if (cover && this.coverTransitOutCallback) {
          this.coverTransitOutCallback(cover, duration);
        }
        return duration;
      }
    }, {
      key: "onOpen",
      value: function onOpen() {
        var duration = this.displayTime;
        if (duration >= 0) {
          this.delayCall(duration, this.requestClose,
          // callback
          this // scope
          );
        }
        this.emit('open', this.parent, this);
        _get(_getPrototypeOf(Modal.prototype), "onOpen", this).call(this);
      }
    }, {
      key: "onClose",
      value: function onClose() {
        this.emit('close', this.closeEventData);
        _get(_getPrototypeOf(Modal.prototype), "onClose", this).call(this);
      }
    }, {
      key: "setDisplayTime",
      value: function setDisplayTime(time) {
        this.displayTime = time;
        return this;
      }
    }, {
      key: "setTransitInCallback",
      value: function setTransitInCallback(callback) {
        if (typeof callback === 'string') {
          callback = TransitionMode[callback];
        }
        switch (callback) {
          case TransitionMode.popUp:
            callback = DefaultTransitCallbacks.popUp;
            break;
          case TransitionMode.fadeIn:
            callback = DefaultTransitCallbacks.fadeIn;
            break;
        }
        _get(_getPrototypeOf(Modal.prototype), "setTransitInCallback", this).call(this, callback);
        // callback = function(gameObject, duration) {}
        return this;
      }
    }, {
      key: "setTransitOutCallback",
      value: function setTransitOutCallback(callback) {
        if (typeof callback === 'string') {
          callback = TransitionMode[callback];
        }
        switch (callback) {
          case TransitionMode.scaleDown:
            callback = DefaultTransitCallbacks.scaleDown;
            break;
          case TransitionMode.fadeOut:
            callback = DefaultTransitCallbacks.fadeOut;
            break;
        }
        _get(_getPrototypeOf(Modal.prototype), "setTransitOutCallback", this).call(this, callback);
        // callback = function(gameObject, duration) {}
        return this;
      }
    }, {
      key: "setCoverTransitInCallback",
      value: function setCoverTransitInCallback(callback) {
        this.coverTransitInCallback = callback;
        return this;
      }
    }, {
      key: "setCoverTransitOutCallback",
      value: function setCoverTransitOutCallback(callback) {
        this.coverTransitOutCallback = callback;
        return this;
      }
    }]);
    return Modal;
  }(OpenCloseTransition);
  var TransitionMode = {
    popUp: 0,
    fadeIn: 1,
    scaleDown: 0,
    fadeOut: 1
  };

  var Modal = function Modal(gameObject, config) {
    var modalBehavior = new Modal$1(gameObject, config);

    // Route modal's 'open', 'close' event
    modalBehavior.on('open', function () {
      gameObject.emit('modal.open', modalBehavior);
    });
    modalBehavior.on('close', function (closeEventData) {
      gameObject.emit('modal.close', closeEventData, modalBehavior);
    });

    // Reigster 'modal.requestClose' event for invoking modalBehavior.requestClose() method
    gameObject.on('modal.requestClose', modalBehavior.requestClose, modalBehavior);
    /*
    It is not necessary to turn off gameObject's 'modal.requestClose' event because that :
      - If `config.destroy` is `undefined` (or `true), gameObject and modalBehavior will be destroyed
    - If `config.destroy` is `false` (for reusing dialog), keeping gameObject and modalBehavior 
    */

    return modalBehavior;
  };
  var ModalPromise = function ModalPromise(gameObject, config) {
    var modalBehavior = Modal(gameObject, config);
    return new Promise(function (resolve, reject) {
      modalBehavior.once('close', function (closeEventData) {
        resolve(closeEventData);
      });
    });
  };
  var ModalClose = function ModalClose(gameObject, closeEventData) {
    gameObject.emit('modal.requestClose', closeEventData);
  };

  var ModalPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(ModalPlugin, _Phaser$Plugins$BaseP);
    function ModalPlugin(pluginManager) {
      _classCallCheck(this, ModalPlugin);
      return _callSuper(this, ModalPlugin, [pluginManager]);
    }
    _createClass(ModalPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new Modal$1(gameObject, config);
      }
    }, {
      key: "modal",
      value: function modal(gameObject, config) {
        return Modal(gameObject, config);
      }
    }, {
      key: "promise",
      value: function promise(gameObject, config) {
        return ModalPromise(gameObject, config);
      }
    }, {
      key: "close",
      value: function close(gameObject, closeEventData) {
        return ModalClose(gameObject, closeEventData);
      }
    }]);
    return ModalPlugin;
  }(Phaser.Plugins.BasePlugin);

  return ModalPlugin;

}));
