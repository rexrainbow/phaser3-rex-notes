(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbejeweled = factory());
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

  var BaseState = /*#__PURE__*/function (_FSM) {
    _inherits(BaseState, _FSM);
    function BaseState(bejeweled, config) {
      var _this;
      _classCallCheck(this, BaseState);
      _this = _callSuper(this, BaseState, [config]);
      _this.bejeweled = bejeweled; // Bejeweled
      _this.board = bejeweled.board; // Bejeweled.board
      _this.waitEvents = bejeweled.waitEvents; // Bejeweled.waitEvents
      return _this;
    }
    _createClass(BaseState, [{
      key: "shutdown",
      value: function shutdown() {
        _get(_getPrototypeOf(BaseState.prototype), "shutdown", this).call(this);
        this.bejeweled = undefined;
        this.board = undefined;
        this.waitEvents = undefined;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
        return this;
      }
    }, {
      key: "next",
      value: function next() {
        // Wait until all events are completed
        if (this.waitEvents.noWaitEvent) {
          // Go to next state
          _get(_getPrototypeOf(BaseState.prototype), "next", this).call(this);
        } else {
          // Try again later
          this.waitEvents.setCompleteCallback(this.next, this);
        }
      }
    }]);
    return BaseState;
  }(FSM);

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _callSuper(this, TickTask, [parent, config]);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$9(config, 'tickingMode', 1));
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

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
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
      _this.tickEventName = GetValue$8(config, 'tickEventName', defaultEventName);
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

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$7(o, 'state', IDLE);
        this.timeScale = GetValue$7(o, 'timeScale', 1);
        this.delay = GetValue$7(o, 'delay', 0);
        this.repeat = GetValue$7(o, 'repeat', 0);
        this.repeatCounter = GetValue$7(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$7(o, 'repeatDelay', 0);
        this.duration = GetValue$7(o, 'duration', 0);
        this.nowTime = GetValue$7(o, 'nowTime', 0);
        this.justRestart = GetValue$7(o, 'justRestart', false);
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

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
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
        this.timer.resetFromJSON(GetValue$6(o, 'timer'));
        this.setEnable(GetValue$6(o, 'enable', true));
        this.setTarget(GetValue$6(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
        this.setEase(GetValue$6(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$6(o, 'repeat', 0));
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

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
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
        this.setMode(GetValue$5(o, 'mode', 0));
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

  /* 
  1. Fade-out-destroy chess
  */

  var EliminateChess = function EliminateChess(chessArray, board, bejeweled) {
    var duration = 500; //ms
    for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
      var fade = FadeOutDestroy(chessArray[i], duration);
      bejeweled.waitEvent(fade, 'complete');
    }
  };

  /* 
  1. Falling down all chess
  */

  var FallingAllChess = function FallingAllChess(board, bejeweled) {
    var tileZ = bejeweled.getChessTileZ(),
      chess,
      moveTo;
    for (var tileY = board.height - 1; tileY >= 0; tileY--) {
      // bottom to top
      for (var tileX = 0, cnt = board.width; tileX < cnt; tileX++) {
        // left to right
        chess = board.tileXYZToChess(tileX, tileY, tileZ);
        if (chess === null) {
          continue;
        }
        moveTo = bejeweled.getChessMoveTo(chess);
        do {
          moveTo.moveToward(1);
        } while (moveTo.lastMoveResult);
        if (moveTo.isRunning) {
          bejeweled.waitEvent(moveTo, 'complete');
        }
      }
    }
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var SetStruct$2 = Phaser.Structs.Set;
  var State$1 = /*#__PURE__*/function (_BaseState) {
    _inherits(State, _BaseState);
    function State(bejeweled, config) {
      var _this;
      _classCallCheck(this, State);
      _this = _callSuper(this, State, [bejeweled, config]);
      // this.bejeweled = bejeweled;            // Bejeweled
      // this.board = bejeweled.board;       // Bejeweled.board

      _this.totalMatchedLinesCount = 0;
      _this.eliminatedChessArray;

      // Actions
      // Eliminating action
      _this.eliminatingAction = GetValue$4(config, 'eliminatingAction', EliminateChess);
      // on falling chess
      _this.fallingAction = GetValue$4(config, 'fallingAction', FallingAllChess);
      var debug = GetValue$4(config, 'debug', false);
      if (debug) {
        _this.on('statechange', _this.printState, _assertThisInitialized(_this));
      }
      return _this;
    }
    _createClass(State, [{
      key: "shutdown",
      value: function shutdown() {
        _get(_getPrototypeOf(State.prototype), "shutdown", this).call(this);
        this.eliminatedChessArray = undefined;
        // Actions
        this.eliminatingAction = undefined;
        this.fallingAction = undefined;
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
        return this;
      }

      // START
    }, {
      key: "enter_START",
      value: function enter_START() {
        this.totalMatchedLinesCount = 0;
        this.bejeweled.emit('match-start', this.board.board, this.bejeweled);
        this.next();
      }
    }, {
      key: "next_START",
      value: function next_START() {
        return 'MATCH3';
      }
      // START

      // MATCH3
    }, {
      key: "enter_MATCH3",
      value: function enter_MATCH3() {
        var matchedLines = this.board.getAllMatch();
        this.bejeweled.emit('match', matchedLines, this.board.board, this.bejeweled);
        var matchedLinesCount = matchedLines.length;
        this.totalMatchedLinesCount += matchedLinesCount;
        switch (matchedLinesCount) {
          case 0:
            this.eliminatedChessArray = [];
            break;
          case 1:
            this.eliminatedChessArray = matchedLines[0].entries;
            break;
          default:
            // Put all chess to a set
            var newSet = new SetStruct$2();
            for (var i = 0; i < matchedLinesCount; i++) {
              matchedLines[i].entries.forEach(function (value) {
                newSet.set(value);
              });
            }
            this.eliminatedChessArray = newSet.entries;
            break;
        }
        this.next();
      }
    }, {
      key: "next_MATCH3",
      value: function next_MATCH3() {
        var nextState;
        if (this.eliminatedChessArray.length === 0) {
          nextState = 'END';
        } else {
          nextState = 'ELIMINATING';
        }
        return nextState;
      }
      // MATCH3

      // ELIMINATING
    }, {
      key: "enter_ELIMINATING",
      value: function enter_ELIMINATING() {
        var board = this.board.board,
          chessArray = this.eliminatedChessArray;
        this.bejeweled.emit('eliminate', chessArray, board, this.bejeweled);
        this.eliminatingAction(chessArray, board, this.bejeweled);

        // Remove eliminated chess
        chessArray.forEach(board.removeChess, board);

        // To next state when all completed
        this.next();
      }
    }, {
      key: "next_ELIMINATING",
      value: function next_ELIMINATING() {
        return 'FALLING';
      }
    }, {
      key: "exit_ELIMINATING",
      value: function exit_ELIMINATING() {
        this.eliminatedChessArray = undefined;
      }
      // ELIMINATING

      // FALLING
    }, {
      key: "enter_FALLING",
      value: function enter_FALLING() {
        var board = this.board.board;
        this.bejeweled.emit('fall', board, this.bejeweled);
        this.fallingAction(board, this.bejeweled);

        // To next state when all completed
        this.next();
      }
    }, {
      key: "next_FALLING",
      value: function next_FALLING() {
        return 'FILL';
      }
      // FALLING

      // FILL
    }, {
      key: "enter_FILL",
      value: function enter_FILL() {
        this.board.fill(true); // Fill upper board only

        this.bejeweled.emit('fill', this.board.board, this.bejeweled);
        this.next();
      }
    }, {
      key: "next_FILL",
      value: function next_FILL() {
        return 'MATCH3';
      }
      // FILL

      // END
    }, {
      key: "enter_END",
      value: function enter_END() {
        this.bejeweled.emit('match-end', this.board.board, this.bejeweled);
        this.emit('complete');
      }
      // END
    }, {
      key: "printState",
      value: function printState() {
        console.log('Match state: ' + this.prevState + ' -> ' + this.state);
      }
    }]);
    return State;
  }(BaseState);

  /* 
  Do nothing
  */

  var SelectChess = function SelectChess(chess, board, bejeweled) {
    // Do nothing
  };

  var SwapChess = function SwapChess(chess1, chess2, board, bejeweled) {
    var tileXYZ1 = board.chessToTileXYZ(chess1);
    var tileXYZ2 = board.chessToTileXYZ(chess2);
    var tileX1 = tileXYZ1.x,
      tileY1 = tileXYZ1.y,
      tileX2 = tileXYZ2.x,
      tileY2 = tileXYZ2.y,
      tileZ = tileXYZ1.z;

    // TileZ of chess1 and chess2 are the same, change tileZ of chess2 to a different value
    board.setChessTileZ(chess2, "#".concat(tileZ));

    // Move chess1 to tileXYZ2, chess2 to tileXYZ1
    var moveTo1 = bejeweled.getChessMoveTo(chess1);
    var moveTo2 = bejeweled.getChessMoveTo(chess2);
    moveTo1.moveTo(tileX2, tileY2);
    moveTo2.moveTo(tileX1, tileY1);

    // Change tileZ of chess2 back
    board.setChessTileZ(chess2, tileZ);
    if (moveTo1.isRunning) {
      bejeweled.waitEvent(moveTo1, 'complete');
    }
    if (moveTo2.isRunning) {
      bejeweled.waitEvent(moveTo2, 'complete');
    }
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var State = /*#__PURE__*/function (_BaseState) {
    _inherits(State, _BaseState);
    function State(bejeweled, config) {
      var _this;
      _classCallCheck(this, State);
      _this = _callSuper(this, State, [bejeweled, config]);
      // this.bejeweled = bejeweled;      // Bejeweled
      // this.board = bejeweled.board; // Bejeweled.board

      _this.selectedChess1;
      _this.selectedChess2;
      _this.matchState = new State$1(bejeweled, config); // sub-state

      // Actions
      // select1 action
      _this.select1Action = GetValue$3(config, 'select1Action', SelectChess);
      // select2 action
      _this.select2Action = GetValue$3(config, 'select2Action', _this.select1Action);
      // Swap action
      _this.swapAction = GetValue$3(config, 'swapAction', SwapChess);
      // UndoSwap action
      _this.undoSwapAction = GetValue$3(config, 'undoSwapAction', _this.swapAction);
      var debug = GetValue$3(config, 'debug', false);
      if (debug) {
        _this.on('statechange', _this.printState, _assertThisInitialized(_this));
      }
      return _this;
    }
    _createClass(State, [{
      key: "shutdown",
      value: function shutdown() {
        _get(_getPrototypeOf(State.prototype), "shutdown", this).call(this);
        this.matchState.shutdown();
        this.matchState = undefined;
        this.selectedChess1 = undefined;
        this.selectedChess2 = undefined;
        return this;
      }

      // START
    }, {
      key: "enter_START",
      value: function enter_START() {
        this.board.init(); // Fill background tiles
        this.next();
      }
    }, {
      key: "next_START",
      value: function next_START() {
        return 'RESET';
      }
      // START

      // RESET
    }, {
      key: "enter_RESET",
      value: function enter_RESET() {
        this.board.reset(); // Refill chess
        this.next();
      }
    }, {
      key: "next_RESET",
      value: function next_RESET() {
        return 'PRETEST';
      }
      // RESET

      // PRETEST
    }, {
      key: "enter_PRETEST",
      value: function enter_PRETEST() {
        this.next();
      }
    }, {
      key: "next_PRETEST",
      value: function next_PRETEST() {
        var nextState;
        if (this.board.preTest()) {
          nextState = 'SELECT1START';
        } else {
          nextState = 'RESET';
        }
        return nextState;
      }
      // PRETEST

      // SELECT1START
    }, {
      key: "enter_SELECT1",
      value:
      // SELECT1START

      // SELECT1
      function enter_SELECT1() {
        var board = this.board.board,
          chess = this.selectedChess1;
        this.bejeweled.emit('select1', chess, board, this.bejeweled);
        this.select1Action(chess, board, this.bejeweled);

        // To next state when all completed
        this.next();
      }
    }, {
      key: "selectChess1",
      value: function selectChess1(chess) {
        if (this.state === 'SELECT1START') {
          this.selectedChess1 = chess;
          this.next();
        }
        return this;
      }
    }, {
      key: "next_SELECT1START",
      value: function next_SELECT1START() {
        var nextState;
        if (this.selectedChess1) {
          nextState = 'SELECT1';
        }
        return nextState;
      }
    }, {
      key: "next_SELECT1",
      value: function next_SELECT1() {
        return 'SELECT2START';
      }
      // SELECT1

      // SELECT2START
    }, {
      key: "enter_SELECT2START",
      value: function enter_SELECT2START() {
        this.bejeweled.emit('select2-start', this.board.board, this.bejeweled);
      }
    }, {
      key: "selectChess2",
      value: function selectChess2(chess) {
        if (this.state === 'SELECT2START') {
          this.selectedChess2 = chess;
          this.next();
        }
        return this;
      }
    }, {
      key: "next_SELECT2START",
      value: function next_SELECT2START() {
        var nextState;
        if (this.selectedChess2 && this.board.board.areNeighbors(this.selectedChess1, this.selectedChess2)) {
          nextState = 'SELECT2';
        } else {
          nextState = 'SELECT1START';
        }
        return nextState;
      }
      // SELECT2START

      // SELECT2
    }, {
      key: "enter_SELECT2",
      value: function enter_SELECT2() {
        var board = this.board.board,
          chess = this.selectedChess2;
        this.bejeweled.emit('select2', chess, board, this.bejeweled);
        this.select2Action(chess, board, this.bejeweled);

        // To next state when all completed
        this.next();
      }
    }, {
      key: "next_SELECT2",
      value: function next_SELECT2() {
        return 'SWAP';
      }
      // SELECT2

      // SWAP
    }, {
      key: "enter_SWAP",
      value: function enter_SWAP() {
        var board = this.board.board,
          chess1 = this.selectedChess1,
          chess2 = this.selectedChess2;
        this.bejeweled.emit('swap', chess1, chess2, board, this.bejeweled);
        this.swapAction(chess1, chess2, board, this.bejeweled);

        // To next state when all completed
        this.next();
      }
    }, {
      key: "next_SWAP",
      value: function next_SWAP() {
        return 'MATCH3';
      }
      // SWAP

      // MATCH3
    }, {
      key: "enter_MATCH3",
      value: function enter_MATCH3() {
        this.matchState.once('complete', this.next, this)["goto"]('START');
      }
    }, {
      key: "next_MATCH3",
      value: function next_MATCH3() {
        var nextState;
        if (this.matchState.totalMatchedLinesCount === 0) {
          nextState = 'UNDOSWAP';
        } else {
          nextState = 'PRETEST';
        }
        return nextState;
      }
      // MATCH3

      // UNDO_SWAP
    }, {
      key: "enter_UNDOSWAP",
      value: function enter_UNDOSWAP() {
        var board = this.board.board,
          chess1 = this.selectedChess1,
          chess2 = this.selectedChess2;
        this.bejeweled.emit('undo-swap', chess1, chess2, board, this.bejeweled);
        this.undoSwapAction(chess1, chess2, board, this.bejeweled);

        // To next state when all completed
        this.next();
      }
    }, {
      key: "next_UNDOSWAP",
      value: function next_UNDOSWAP() {
        return 'SELECT1START';
      }
      // UNDO_SWAP

      // debug
    }, {
      key: "printState",
      value: function printState() {
        console.log('Main state: ' + this.prevState + ' -> ' + this.state);
      }
    }]);
    return State;
  }(BaseState);

  /* 
  1. Fill background tiles
  */
  var Init = function Init() {
    // TODO: assign symobls of board via callback
    return this;
  };

  /* 
  1. Destroy all chess
  2. Fill chess
  3. Break match3
  */

  var Reset = function Reset() {
    // Destroy all chess
    this.board.removeAllChess();
    // Fill chess (with initial symbol map)
    this.fill(this.initSymbolsMap);
    // Break match3
    this.breakMatch3();
  };

  var GetRandom$1 = Phaser.Utils.Array.GetRandom;
  var RandomSymbol = function RandomSymbol(board, tileX, tileY, callback, scope, excluded) {
    var symbol;
    if (Array.isArray(callback)) {
      // pick random symbol from symbol array
      var symbols = callback;
      // excluded: undefined or a symbol array
      if (excluded !== undefined) {
        for (var i = 0, cnt = symbols.length; i < cnt; i++) {
          symbol = symbols[i];
          if (excluded.indexOf(symbol) !== -1) {
            continue;
          }
          tmpSymbolArray.push(symbol);
        }
        symbol = GetRandom$1(tmpSymbolArray);
        tmpSymbolArray.length = 0;
      } else {
        symbol = GetRandom$1(symbols);
      }
    } else if (typeof obj === 'function') {
      // symbols from return of callback
      if (scope) {
        symbol = callback.call(scope, board, tileX, tileY, excluded);
      } else {
        symbol = callback(board, tileX, tileY, excluded);
      }
    } else {
      // symbol value
      symbol = callback;
    }
    return symbol;
  };
  var tmpSymbolArray = [];

  var CreateChess = function CreateChess(tileX, tileY, symbols) {
    this.scene;
      var board = this.board,
      scope = this.chessCallbackScope;

    // Get symbol
    var symbol = RandomSymbol(board, tileX, tileY, symbols, scope);
    // Create game object
    var gameObject;
    if (scope) {
      gameObject = this.chessCreateCallback.call(scope, board);
    } else {
      gameObject = this.chessCreateCallback(board);
    }
    // Set symbol, it also fires 'changedata_symbol' event
    gameObject.setData('symbol', symbol);
    // Add to board
    board.addChess(gameObject, tileX, tileY, this.chessTileZ, true);
    // behaviors
    gameObject.rexMoveTo = this.rexBoard.add.moveTo(gameObject, this.chessMoveTo);
    if (this.layer) {
      // Move chess gameObject from scene to layer
      this.layer.add(gameObject);
    }
  };

  /*
  1. Fill empty grids
  */

  var Fill = function Fill(map) {
    var upperBoard = false;
    if (typeof map === 'boolean') {
      upperBoard = map;
      map = undefined;
    }
    var symbol;
    var board = this.board,
      symbols = this.candidateSymbols;
    var height = this.board.height;
    if (upperBoard) {
      height /= 2;
    }
    for (var tileY = 0; tileY < height; tileY++) {
      for (var tileX = 0, width = this.board.width; tileX < width; tileX++) {
        if (board.contains(tileX, tileY, this.chessTileZ)) {
          // not empty                
          continue;
        }
        if (map !== undefined) {
          symbol = map[tileX][tileY];
          if (symbol !== '?') {
            symbols = symbol;
          }
        }
        this.createChess(tileX, tileY, symbols);
      }
    }
  };

  var RefreshSymbolCache = function RefreshSymbolCache() {
    this.match.refreshSymbols(function (tileXY, board) {
      // Return null in upper board
      if (tileXY.y < board.height / 2) {
        return null;
      }
      var chess = board.tileXYZToChess(tileXY.x, tileXY.y, this.chessTileZ);
      if (chess == null) {
        return null;
      }
      return chess.getData('symbol');
    }, this);
  };

  var GetMatchN = function GetMatchN(n, callback, scope) {
    this.match.match(n, callback, scope);
    return this;
  };

  /*
  1. Pick each match3 line
  2. Pick a random chess in this match3 line
  3. Change symbol to a different value of all neighbors
  */

  var GetRandom = Phaser.Utils.Array.GetRandom;
  var BreakMatch3 = function BreakMatch3() {
    var tileZ = this.chessTileZ,
      scope = this.chessCallbackScope,
      symbols = this.candidateSymbols;
    RefreshSymbolCache.call(this); // only refresh symbol cache once
    GetMatchN.call(this, 3, function (result, board) {
      // Pick a random chess in this match3 line
      var tileXY = GetRandom(result.tileXY);
      var chess = board.tileXYZToChess(tileXY.x, tileXY.y, tileZ);
      var neighborChess = board.getNeighborChess(chess, null);
      // collect symbols of all neighbors
      var excluded = [];
      for (var i = 0, cnt = neighborChess.length; i < cnt; i++) {
        excluded.push(neighborChess[i].getData('symbol'));
      }
      var newSymbol = RandomSymbol(board, tileXY.x, tileXY.y, symbols, scope, excluded);
      if (newSymbol != null) {
        // Change symbol to a different value of all neighbors.
        // It also fires 'changedata_symbol' event.
        chess.setData('symbol', newSymbol);
      }
    });
  };

  var AnyMatch = function AnyMatch(n) {
    return this.match.anyMatch(n);
  };

  /*
  1. Test if there has any matched line after chess swapping
  */

  var PreTest = function PreTest() {
    var match = this.match;
    var directions = this.board.grid.halfDirections;
    var tileB;
    RefreshSymbolCache.call(this); // only refresh symbol cache once
    for (var tileY = this.board.height / 2, rowCnt = this.board.height; tileY < rowCnt; tileY++) {
      for (var tileX = 0, colCnt = this.board.width; tileX < colCnt; tileX++) {
        tileA.x = tileX;
        tileA.y = tileY;
        for (var dir = 0, dirCnt = directions.length; dir < dirCnt; dir++) {
          tileB = this.board.getNeighborTileXY(tileA, dir);
          // swap symbol
          swapSymbols(match, tileA, tileB);
          // any match?
          this.preTestResult = AnyMatch.call(this, 3);
          // swap symbol back
          swapSymbols(match, tileA, tileB);
          if (this.preTestResult) {
            return true;
          }
        }
      }
    }
    return false;
  };
  var swapSymbols = function swapSymbols(match, tileA, tileB) {
    var symbolA = match.getSymbol(tileA.x, tileA.y);
    var symbolB = match.getSymbol(tileB.x, tileB.y);
    match.setSymbol(tileA.x, tileA.y, symbolB);
    match.setSymbol(tileB.x, tileB.y, symbolA);
  };
  var tileA = {
    x: 0,
    y: 0
  };

  var SetStruct$1 = Phaser.Structs.Set;
  var GetAllMatch = function GetAllMatch() {
    RefreshSymbolCache.call(this); // only refresh symbol cache once
    // Get match5, match4, match3
    var self = this;
    var matchLines = [];
    for (var n = 5; n >= 3; n--) {
      GetMatchN.call(this, n, function (result, board) {
        var newSet = new SetStruct$1(board.tileXYArrayToChessArray(result.tileXY, self.chessTileZ));
        for (var i = 0, cnt = matchLines.length; i < cnt; i++) {
          if (subSetTest(matchLines[i], newSet)) {
            return; // not a new set
          }
        }
        matchLines.push(newSet);
      });
    }
    return matchLines;
  };
  var subSetTest = function subSetTest(setA, setB) {
    // Return true if setB is a subset of setA
    var itemsA = setA.entries;
    for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
      if (!setB.contains(itemsA[i])) {
        return false;
      }
    }
    return true;
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var Board = /*#__PURE__*/function () {
    function Board(bejeweled, config) {
      _classCallCheck(this, Board);
      var scene = bejeweled.scene;
      this.scene = scene;
      this.rexBoard = bejeweled.rexBoard;
      this.board = this.rexBoard.add.board(GetValue$2(config, 'board', undefined));
      this.match = this.rexBoard.add.match(GetValue$2(config, 'match', undefined));
      this.match.setBoard(this.board);
      this.initSymbolsMap = GetValue$2(config, 'initMap', undefined); // 2d array
      // configuration of chess
      this.chessTileZ = GetValue$2(config, 'chess.tileZ', 1);
      this.candidateSymbols = GetValue$2(config, 'chess.symbols', undefined);
      this.chessCallbackScope = GetValue$2(config, 'chess.scope', undefined);
      this.chessCreateCallback = GetValue$2(config, 'chess.create', undefined);
      this.chessMoveTo = GetValue$2(config, 'chess.moveTo', {});
      this.chessMoveTo.occupiedTest = true;

      // Mask & layer
      this.rowMaskGameObject = undefined;
      this.rowMask = undefined;
      this.layer = undefined;
      if (GetValue$2(config, 'mask', false)) {
        this.resetBoardMask();
      }
      if (GetValue$2(config, 'layer', false)) {
        this.enableBoardLayer();
      }
    }
    _createClass(Board, [{
      key: "shutdown",
      value: function shutdown() {
        this.match.destroy();
        this.board.destroy();
        if (this.rowMaskGameObject) {
          this.layer.setMask();
          this.rowMaskGameObject.destroy();
          this.rowMask.destroy();
        }
        if (this.layer) {
          this.layer.destroy();
        }
        this.board = undefined;
        this.match = undefined;
        this.initSymbolsMap = undefined;
        this.candidateSymbols = undefined;
        this.chessCallbackScope = undefined;
        this.chessCreateCallback = undefined;
        this.chessMoveTo = undefined;
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
        return this;
      }
    }, {
      key: "setBoardWidth",
      value: function setBoardWidth(width) {
        this.board.setBoardWidth(width);
        return this;
      }
    }, {
      key: "setBoardHeight",
      value: function setBoardHeight(height) {
        this.board.setBoardHeight(height);
        return this;
      }
    }, {
      key: "setInitSymbolsMap",
      value: function setInitSymbolsMap(map) {
        this.initSymbolsMap = map; // 2d array
        return this;
      }
    }, {
      key: "enableBoardLayer",
      value: function enableBoardLayer() {
        if (!this.layer) {
          this.layer = this.scene.add.layer();
        }
        return this;
      }
    }, {
      key: "resetBoardMask",
      value: function resetBoardMask() {
        if (!this.rowMaskGameObject) {
          this.rowMaskGameObject = this.scene.make.graphics().setVisible(false);
          this.rowMask = this.rowMaskGameObject.createGeometryMask().setInvertAlpha();
          this.enableBoardLayer();
          this.layer.setMask(this.rowMask);
        }

        // Rectangle of upper rows
        var board = this.board;
        var grid = board.grid;
        var x = grid.x - grid.width / 2;
        var y = grid.y - grid.height / 2;
        var width = board.width * grid.width;
        var height = board.height / 2 * grid.height;
        this.rowMaskGameObject.fillRect(x, y, width, height);
        return this;
      }
    }, {
      key: "worldXYToChess",
      value: function worldXYToChess(worldX, worldY) {
        return this.board.worldXYToChess(worldX, worldY, this.chessTileZ);
      }
    }, {
      key: "tileXYToChess",
      value: function tileXYToChess(tileX, tileY) {
        return this.board.tileXYZToChess(tileX, tileY, this.chessTileZ);
      }
    }, {
      key: "getNeighborChessAtAngle",
      value: function getNeighborChessAtAngle(chess, angle) {
        var direction = this.board.angleSnapToDirection(chess, angle);
        return this.getNeighborChessAtDirection(chess, direction);
      }
    }, {
      key: "getNeighborChessAtDirection",
      value: function getNeighborChessAtDirection(chess, direction) {
        var neighborTileXY = this.board.getNeighborTileXY(chess, direction);
        var neighborChess = neighborTileXY ? this.board.tileXYZToChess(neighborTileXY.x, neighborTileXY.y, this.chessTileZ) : null;
        return neighborChess;
      }
    }]);
    return Board;
  }();
  var methods = {
    init: Init,
    reset: Reset,
    createChess: CreateChess,
    fill: Fill,
    breakMatch3: BreakMatch3,
    preTest: PreTest,
    getAllMatch: GetAllMatch
  };
  Object.assign(Board.prototype, methods);

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var Input = /*#__PURE__*/function () {
    function Input(bejeweled, config) {
      _classCallCheck(this, Input);
      this.bejeweled = bejeweled; // Bejeweled
      this.scene = bejeweled.scene; // Bejeweled.scene

      this.setEnable(GetValue$1(config, 'input.enable', true));
      this.boot();
    }
    _createClass(Input, [{
      key: "boot",
      value: function boot() {
        // Touch control
        this.scene.input.on('pointerdown', this.selectChess1, this).on('pointermove', this.selectChess2, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        this.scene.input.off('pointerdown', this.selectChess1, this).off('pointermove', this.selectChess2, this);
        this.bejeweled = undefined;
        this.scene = undefined;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }
        this.enable = enabled;
        return this;
      }
    }, {
      key: "selectChess1",
      value: function selectChess1(pointer) {
        if (!this.enable) {
          return this;
        }
        var chess = this.bejeweled.worldXYToChess(pointer.worldX, pointer.worldY);
        if (chess) {
          this.bejeweled.selectChess1(chess);
        }
      }
    }, {
      key: "selectChess2",
      value: function selectChess2(pointer) {
        if (!this.enable) {
          return this;
        }
        if (!pointer.isDown) {
          return;
        }
        var chess = this.bejeweled.worldXYToChess(pointer.worldX, pointer.worldY);
        if (chess && chess !== this.bejeweled.getSelectedChess1()) {
          this.bejeweled.selectChess2(chess);
        }
      }
    }]);
    return Input;
  }();

  var SetStruct = Phaser.Structs.Set;
  var WaitEvents = /*#__PURE__*/function () {
    function WaitEvents(completeCallback, scope) {
      _classCallCheck(this, WaitEvents);
      this.setCompleteCallback(completeCallback, scope);
      this.events = new SetStruct();
    }
    _createClass(WaitEvents, [{
      key: "shutdown",
      value: function shutdown() {
        this.setCompleteCallback(undefined, undefined);
        this.events.clear();
        this.event = undefined;
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
        return this;
      }
    }, {
      key: "setCompleteCallback",
      value: function setCompleteCallback(callback, scope) {
        this.completeCallback = callback;
        this.scope = scope;
        return this;
      }
    }, {
      key: "waitCallback",
      value: function waitCallback() {
        var self = this;
        var callback = function callback() {
          self.remove(callback);
        };
        this.events.set(callback);
        return callback;
      }
    }, {
      key: "waitEvent",
      value: function waitEvent(eventEmitter, eventName) {
        eventEmitter.once(eventName, this.waitCallback());
        return this;
      }
    }, {
      key: "remove",
      value: function remove(callback) {
        this.events["delete"](callback);
        if (this.noWaitEvent) {
          if (this.scope) {
            this.completeCallback.call(this.scope);
          } else {
            this.completeCallback();
          }
        }
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.events.clear();
        return this;
      }
    }, {
      key: "noWaitEvent",
      get: function get() {
        return this.events.size === 0;
      }
    }]);
    return WaitEvents;
  }();

  var InputMethods = {
    getSelectedChess1: function getSelectedChess1() {
      return this.mainState.selectedChess1;
    },
    getSelectedChess2: function getSelectedChess2() {
      return this.mainState.selectedChess2;
    },
    selectChess1: function selectChess1(chess) {
      this.mainState.selectChess1(chess);
      return this;
    },
    selectChess2: function selectChess2(chess) {
      this.mainState.selectChess2(chess);
      return this;
    },
    setInputEnable: function setInputEnable(enable) {
      if (this.input) {
        this.input.setEnable(enable);
      }
      return this;
    }
  };

  var BoardMethods = {
    setBoardSize: function setBoardSize(width, height) {
      this.board.setBoardWidth(width).setBoardHeight(height);
      return this;
    },
    // Chess properties
    getChessMoveTo: function getChessMoveTo(chess) {
      return chess ? chess.rexMoveTo : undefined;
    },
    getChessTileZ: function getChessTileZ() {
      return this.board.chessTileZ;
    },
    worldXYToChess: function worldXYToChess(worldX, worldY) {
      return this.board.worldXYToChess(worldX, worldY);
    },
    tileXYToChess: function tileXYToChess(tileX, tileY) {
      return this.board.tileXYToChess(tileX, tileY);
    },
    getNeighborChessAtAngle: function getNeighborChessAtAngle(chess, angle) {
      return this.board.getNeighborChessAtAngle(chess, angle);
    },
    getNeighborChessAtDirection: function getNeighborChessAtDirection(chess, direction) {
      return this.board.getNeighborChessAtDirection(chess, direction);
    },
    // Expose board instance
    getBoard: function getBoard() {
      return this.board.board;
    },
    // Expose match instance
    getMatch: function getMatch() {
      return this.board.match;
    }
  };

  var WaitEventMethods = {
    waitEvent: function waitEvent(eventEmitter, eventName) {
      if (eventName === undefined) {
        eventName = 'complete';
      }
      this.waitEvents.waitEvent(eventEmitter, eventName);
      return this;
    },
    isWaitingEvent: function isWaitingEvent() {
      return !this.waitEvents.noWaitEvent;
    }
  };

  var DataManager = Phaser.Data.DataManager;
  var DataManagerMethods = {
    // this.data
    destroyDataManager: function destroyDataManager() {
      if (this.data) {
        this.data.destroy();
        this.data = undefined;
      }
    },
    setDataEnabled: function setDataEnabled() {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      return this;
    },
    setData: function setData(key, value) {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      this.data.set(key, value);
      return this;
    },
    incData: function incData(key, value) {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      this.data.inc(key, value);
      return this;
    },
    toggleData: function toggleData(key) {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      this.data.toggle(key);
      return this;
    },
    getData: function getData(key) {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      return this.data.get(key);
    }
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Bejeweled = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Bejeweled, _ComponentBase);
    function Bejeweled(scene, config) {
      var _this;
      _classCallCheck(this, Bejeweled);
      _this = _callSuper(this, Bejeweled, [scene, config]);
      // this.scene

      var rexBoardKey = GetValue(config, 'rexBoard', 'rexBoard');
      _this.rexBoard = scene[rexBoardKey];
      _this.board = new Board(_assertThisInitialized(_this), config);
      var defaultInput = GetValue(config, 'input', true);
      if (defaultInput) {
        _this.input = new Input(_assertThisInitialized(_this), config);
      } else {
        _this.input = undefined;
      }
      _this.waitEvents = new WaitEvents();
      _this.mainState = new State(_assertThisInitialized(_this), config);
      _this.boot();
      return _this;
    }
    _createClass(Bejeweled, [{
      key: "boot",
      value: function boot() {
        this.scene.events.once('shutdown', this.destroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        _get(_getPrototypeOf(Bejeweled.prototype), "shutdown", this).call(this, fromScene);
        if (this.input) {
          this.input.destroy();
        }
        this.board.destroy();
        this.mainState.destroy();
        this.waitEvents.destroy();
        this.destroyDataManager();
        this.board = undefined;
        this.mainState = undefined;
        this.input = undefined;
        this.waitEvents = undefined;
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.emit('destroy');
        _get(_getPrototypeOf(Bejeweled.prototype), "destroy", this).call(this, fromScene);
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        this.mainState["goto"]('START');
        return this;
      }
    }]);
    return Bejeweled;
  }(ComponentBase);
  Object.assign(Bejeweled.prototype, InputMethods, BoardMethods, WaitEventMethods, DataManagerMethods);

  return Bejeweled;

}));
