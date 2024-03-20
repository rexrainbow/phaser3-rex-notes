(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexboardplugin = factory());
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
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
  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);
        var desc;
        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            return false;
          }
          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }
        return true;
      };
    }
    return set(target, property, value, receiver);
  }
  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new TypeError('failed to set property');
    }
    return value;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var ObjectFactory = /*#__PURE__*/function () {
    function ObjectFactory(scene) {
      _classCallCheck(this, ObjectFactory);
      this.scene = scene;
      this.displayList = scene.sys.displayList;
      this.updateList = scene.sys.updateList;
      scene.sys.events.once('destroy', this.destroy, this);
    }
    _createClass(ObjectFactory, [{
      key: "destroy",
      value: function destroy() {
        this.scene = null;
        this.displayList = null;
        this.updateList = null;
      }
    }], [{
      key: "register",
      value: function register(type, callback) {
        ObjectFactory.prototype[type] = callback;
      }
    }]);
    return ObjectFactory;
  }();

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
  var GetValue$c = function GetValue(source, key, defaultValue) {
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

  var Bank = /*#__PURE__*/function () {
    function Bank(config) {
      _classCallCheck(this, Bank);
      this.nextId = GetValue$c(config, 'start', 1); // start index
      this.uidKey = GetValue$c(config, 'uidKey', '$uid');
      this.autoRemove = GetValue$c(config, 'remove', true);
      this.refs = {};
      this.count = 0;
    }
    _createClass(Bank, [{
      key: "add",
      value: function add(gameObject, uid) {
        var refs = this.refs;
        var uidKey = this.uidKey;
        if (uidKey) {
          var uid = gameObject[uidKey];
          if (uid != null) {
            return this;
          }
        }
        if (uid == null) {
          do {
            uid = this.nextId;
            this.nextId++;
          } while (refs.hasOwnProperty(uid));
        }
        if (!refs.hasOwnProperty(uid)) {
          refs[uid] = gameObject;
          this.count++;
          if (uidKey) {
            gameObject[uidKey] = uid;
          }
          if (this.autoRemove && gameObject.on) {
            gameObject.once('destroy', function () {
              this.remove(uid);
            }, this);
          }
        } else {
          uid = null;
        }
        if (uidKey) {
          return this;
        } else {
          return uid;
        }
      }
    }, {
      key: "addMultiple",
      value: function addMultiple(objects) {
        for (var i = 0, cnt = objects.length; i < cnt; i++) {
          this.add(objects[i]);
        }
        return this;
      }
    }, {
      key: "get",
      value: function get(uid) {
        return this.refs[uid];
      }
    }, {
      key: "has",
      value: function has(uid) {
        return this.refs.hasOwnProperty(uid);
      }
    }, {
      key: "remove",
      value: function remove(uid) {
        var refs = this.refs;
        if (refs.hasOwnProperty(uid)) {
          if (this.uidKey) {
            var gameObject = refs[uid];
            gameObject[this.uidKey] = undefined;
          }
          delete refs[uid];
          this.count--;
        }
        return this;
      }
    }, {
      key: "forEach",
      value: function forEach(callback, scope) {
        var refs = this.refs,
          gameObject;
        for (var uid in refs) {
          gameObject = refs[uid];
          if (scope) {
            callback.call(scope, gameObject, uid);
          } else {
            callback(gameObject, uid);
          }
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        this.forEach(function (gameObject) {
          this.remove(gameObject);
        }, this);
      }
    }]);
    return Bank;
  }();

  var ChessBank = new Bank({
    uidKey: '$uid',
    remove: false // remove uid manually
  });

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

  var GetTileDirection = function GetTileDirection(tileX, tileY) {
    var board = this.board;
    if (board === null) {
      return null;
    }
    globTileXY$i.x = tileX;
    globTileXY$i.y = tileY;
    return board.getNeighborTileDirection(this.tileXYZ, globTileXY$i);
  };
  var globTileXY$i = {
    x: 0,
    y: 0
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * This is a slightly modified version of jQuery.isPlainObject.
   * A plain object is an object whose internal class property is [object Object].
   *
   * @function Phaser.Utils.Objects.IsPlainObject
   * @since 3.0.0
   *
   * @param {object} obj - The object to inspect.
   *
   * @return {boolean} `true` if the object is plain, otherwise `false`.
   */
  var IsPlainObject = function IsPlainObject(obj) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (_typeof(obj) !== 'object' || obj.nodeType || obj === obj.window) {
      return false;
    }

    // Support: Firefox <20
    // The try/catch suppresses exceptions thrown when attempting to access
    // the "constructor" property of certain host objects, ie. |window.location|
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try {
      if (obj.constructor && !{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
    } catch (e) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  };

  var uidKey$1 = ChessBank.uidKey;
  var Chess = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Chess, _ComponentBase);
    function Chess(parent, uid) {
      var _this;
      _classCallCheck(this, Chess);
      _this = _callSuper(this, Chess, [parent, {
        eventEmitter: false
      }]);
      // this.parent

      ChessBank.add(_assertThisInitialized(_this), uid); // uid is stored in `this.$uid`
      _this.board = null;
      _this.blocker = false;
      return _this;
    }
    _createClass(Chess, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        if (this.board) {
          this.board.removeChess(this[uidKey$1]);
        }
        ChessBank.remove(this[uidKey$1]);
        this.board = null;
        _get(_getPrototypeOf(Chess.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setBoard",
      value: function setBoard(board) {
        this.board = board;
        return this;
      }
    }, {
      key: "tileXYZ",
      get: function get() {
        if (this.board == null) {
          return null;
        }
        return this.board.chessToTileXYZ(this[uidKey$1]);
      }
    }, {
      key: "setTileZ",
      value: function setTileZ(tileZ) {
        if (this.board == null) {
          return this;
        }
        this.board.setChessTileZ(this.parent, tileZ);
        return this;
      }
    }, {
      key: "setBlocker",
      value: function setBlocker(value) {
        if (value === undefined) {
          value = true;
        }
        this.blocker = value;
        return this;
      }
    }, {
      key: "setBlockEdge",
      value: function setBlockEdge(direction, value) {
        if (this.blocker === false) {
          this.blocker = {};
        }
        var blocker = this.blocker;
        if (IsPlainObject(direction)) {
          var blockEdges = direction;
          for (direction in blockEdges) {
            blocker[direction] = blockEdges[direction];
          }
        } else {
          if (value === undefined) {
            value = true;
          }
          blocker[direction] = value;
        }
        return this;
      }
    }, {
      key: "getBlockEdge",
      value: function getBlockEdge(direction) {
        var blocker = this.blocker;
        if (blocker === false) {
          return false;
        }
        if (!blocker.hasOwnProperty(direction)) {
          return false;
        } else {
          return blocker[direction];
        }
      }
    }]);
    return Chess;
  }(ComponentBase);
  var methods$7 = {
    getTileDirection: GetTileDirection
  };
  Object.assign(Chess.prototype, methods$7);

  var IsUID = function IsUID(object) {
    var type = _typeof(object);
    return type === 'number' || type === 'string';
  };

  var GetChessData = function GetChessData(gameObject) {
    // game object or uid
    if (IsUID(gameObject)) {
      // uid
      return ChessBank.get(gameObject);
    } else {
      // game object
      if (!gameObject.hasOwnProperty('rexChess')) {
        gameObject.rexChess = new Chess(gameObject);
      }
      return gameObject.rexChess;
    }
  };

  var uidKey = ChessBank.uidKey;
  var GetChessUID = function GetChessUID(gameObject) {
    // Game object or uid
    var uid;
    if (IsUID(gameObject)) {
      uid = gameObject;
    } else {
      uid = GetChessData(gameObject)[uidKey];
    }
    return uid;
  };

  var SetBoardWidth = function SetBoardWidth(width) {
    if (this.infinityMode) {
      return this;
    }
    if (this.width === undefined || this.width <= width) {
      this.width = width;
      return this;
    }

    // this.width > width : collapse
    var tileX, tileY, tileZ, tileZToUIDs;
    for (tileX = width; tileX < this.width; tileX++) {
      for (tileY = 0; tileY < this.height; tileY++) {
        tileZToUIDs = this.boardData.getUID(tileX, tileY);
        for (tileZ in tileZToUIDs) {
          this.RemoveChess(false, tileX, tileY, tileZ);
        }
      }
    }
    this.width = width;
    return this;
  };

  var SetBoardHeight = function SetBoardHeight(height) {
    if (this.infinityMode) {
      return this;
    }
    if (this.height === undefined || this.height <= height) {
      this.height = height;
      return this;
    }

    // this.height > height : collapse
    var tileX, tileY, tileZ, tileZToUIDs;
    for (tileY = height; tileY < this.height; tileY++) {
      for (tileX = 0; tileX < this.width; tileX++) {
        tileZToUIDs = this.boardData.getUID(tileX, tileY);
        for (tileZ in tileZToUIDs) {
          this.RemoveChess(false, tileX, tileY, tileZ);
        }
      }
    }
    this.height = height;
    return this;
  };

  var TileXYZToKey = function TileXYZToKey(tileX, tileY, tileZ, separator) {
    if (separator === undefined) {
      separator = ',';
    }
    return "".concat(tileX).concat(separator).concat(tileY).concat(separator).concat(tileZ);
  };

  var TileXYToKey = function TileXYToKey(tileX, tileY, separator) {
    if (separator === undefined) {
      separator = ',';
    }
    return "".concat(tileX).concat(separator).concat(tileY);
  };

  var KeyToTileXYZ = function KeyToTileXYZ(key, out, separator) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXYZ$1;
    }
    if (separator === undefined) {
      separator = ',';
    }
    var items = key.split(separator);
    out.x = items[0];
    out.y = items[1];
    out.z = items[2];
    return out;
  };
  var globTileXYZ$1 = {};

  var TileXYToWorldX = function TileXYToWorldX(tileX, tileY) {
    // console.warn('Use board.tileXYToWorldXY instead of (board.tileXYToWorldX, board.tileXYToWorldY)');
    return this.tileXYToWorldXY(tileX, tileY, true).x;
  };

  var TileXYToWorldY = function TileXYToWorldY(tileX, tileY) {
    // console.warn('Use board.tileXYToWorldXY instead of (board.tileXYToWorldX, board.tileXYToWorldY)');
    return this.tileXYToWorldXY(tileX, tileY, true).y;
  };

  var TileXYToWorldXY = function TileXYToWorldXY(tileX, tileY, out) {
    return this.grid.getWorldXY(tileX, tileY, out);
  };

  var TileXYArrayToWorldXYArray = function TileXYArrayToWorldXYArray(tileXYArray, out) {
    if (out === undefined) {
      out = [];
    }
    var tileXY;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
      tileXY = tileXYArray[i];
      out.push(this.tileXYToWorldXY(tileXY.x, tileXY.y));
    }
    return out;
  };

  var WorldXYToTileX = function WorldXYToTileX(worldX, worldY) {
    // console.warn('Use board.worldXYToTileXY instead of (board.worldXYToTileX, board.worldXYToTileY)');
    return this.worldXYToTileXY(worldX, worldY, true).x;
  };

  var WorldXYToTileY = function WorldXYToTileY(worldX, worldY) {
    // console.warn('Use board.worldXYToTileXY instead of (board.worldXYToTileX, board.worldXYToTileY)');
    return this.worldXYToTileXY(worldX, worldY, true).y;
  };

  var WorldXYToTileXY = function WorldXYToTileXY(worldX, worldY, out) {
    return this.grid.getTileXY(worldX, worldY, out);
  };

  var WorldXYToChessArray = function WorldXYToChessArray(worldX, worldY, out) {
    var tileXY = this.worldXYToTileXY(worldX, worldY, true);
    return this.tileXYToChessArray(tileXY.x, tileXY.y, out);
  };

  var WorldXYToChess = function WorldXYToChess(worldX, worldY, tileZ) {
    var tileXY = this.worldXYToTileXY(worldX, worldY, true);
    if (tileZ !== undefined) {
      return this.tileXYZToChess(tileXY.x, tileXY.y, tileZ);
    } else {
      var tileZToUIDs = this.boardData.getUID(tileXY.x, tileXY.y);
      if (tileZToUIDs == null) {
        return null;
      }
      for (var tileZ in tileZToUIDs) {
        return this.uidToChess(tileZToUIDs[tileZ]);
      }
    }
  };

  var WorldXYSnapToGrid = function WorldXYSnapToGrid(worldX, worldY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globWorldXY$4;
    }
    this.worldXYToTileXY(worldX, worldY, out);
    this.tileXYToWorldXY(out.x, out.y, out);
    return out;
  };
  var globWorldXY$4 = {};

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Find the angle of a segment from (x1, y1) -> (x2, y2).
   *
   * @function Phaser.Math.Angle.Between
   * @since 3.0.0
   *
   * @param {number} x1 - The x coordinate of the first point.
   * @param {number} y1 - The y coordinate of the first point.
   * @param {number} x2 - The x coordinate of the second point.
   * @param {number} y2 - The y coordinate of the second point.
   *
   * @return {number} The angle in radians.
   */
  var Between$1 = function Between(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  };

  var AngleBetween$2 = function AngleBetween(tileA, tileB) {
    tileA = this.chessToTileXYZ(tileA);
    tileB = this.chessToTileXYZ(tileB);
    var out = this.tileXYToWorldXY(tileA.x, tileA.y, true);
    var x0 = out.x;
    var y0 = out.y;
    out = this.tileXYToWorldXY(tileB.x, tileB.y, true);
    var x1 = out.x;
    var y1 = out.y;
    return Between$1(x0, y0, x1, y1); // -PI~PI
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Normalize an angle to the [0, 2pi] range.
   *
   * @function Phaser.Math.Angle.Normalize
   * @since 3.0.0
   *
   * @param {number} angle - The angle to normalize, in radians.
   *
   * @return {number} The normalized angle, in radians.
   */
  var Normalize = function Normalize(angle) {
    angle = angle % (2 * Math.PI);
    if (angle >= 0) {
      return angle;
    } else {
      return angle + 2 * Math.PI;
    }
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Check whether the given values are fuzzily equal.
   *
   * Two numbers are fuzzily equal if their difference is less than `epsilon`.
   *
   * @function Phaser.Math.Fuzzy.Equal
   * @since 3.0.0
   *
   * @param {number} a - The first value.
   * @param {number} b - The second value.
   * @param {number} [epsilon=0.0001] - The epsilon.
   *
   * @return {boolean} `true` if the values are fuzzily equal, otherwise `false`.
   */
  var Equal = function Equal(a, b, epsilon) {
    if (epsilon === undefined) {
      epsilon = 0.0001;
    }
    return Math.abs(a - b) < epsilon;
  };

  var IsAngleInCone = function IsAngleInCone(chessA, chessB, face, cone) {
    var tileXYA = this.chessToTileXYZ(chessA);
    var tileXYB = this.chessToTileXYZ(chessB);
    var targetAngle = this.angleBetween(tileXYA, tileXYB); // -PI~PI
    targetAngle = Normalize(targetAngle); // 0~2PI
    var deltaAngle = Math.abs(targetAngle - face);
    deltaAngle = Math.min(deltaAngle, PI2 - deltaAngle);
    var halfCone = cone / 2;
    return Equal(deltaAngle, halfCone) || deltaAngle < halfCone;
  };
  var PI2 = Math.PI * 2;

  var AngleToward = function AngleToward(tileXY, direction) {
    if (tileXY === undefined) {
      tileXY = zeroTileXY;
    }
    // Save wrapMode, infinityMode and clear them
    var wrapModeSave = this.wrapMode;
    var infinityModeSave = this.infinityMode;
    this.wrapMode = false;
    this.infinityMode = true;

    // Get neighborTileXY
    var neighborTileXY = this.getNeighborTileXY(tileXY, direction, true);

    // Restore wrapMode, infinityMode and clear them
    this.wrapMode = wrapModeSave;
    this.infinityMode = infinityModeSave;
    return this.angleBetween(tileXY, neighborTileXY); // -PI~PI
  };
  var zeroTileXY = {
    x: 0,
    y: 0
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
  var RadToDeg$2 = function RadToDeg(radians) {
    return radians * RAD_TO_DEG;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */

  /**
   * Gets the shortest angle between `angle1` and `angle2`.
   *
   * Both angles must be in the range -180 to 180, which is the same clamped
   * range that `sprite.angle` uses, so you can pass in two sprite angles to
   * this method and get the shortest angle back between the two of them.
   *
   * The angle returned will be in the same range. If the returned angle is
   * greater than 0 then it's a counter-clockwise rotation, if < 0 then it's
   * a clockwise rotation.
   *
   * TODO: Wrap the angles in this function?
   *
   * @function Phaser.Math.Angle.ShortestBetween
   * @since 3.0.0
   *
   * @param {number} angle1 - The first angle in the range -180 to 180.
   * @param {number} angle2 - The second angle in the range -180 to 180.
   *
   * @return {number} The shortest angle, in degrees. If greater than zero it's a counter-clockwise rotation.
   */
  var ShortestBetween = function ShortestBetween(angle1, angle2) {
    var difference = angle2 - angle1;
    if (difference === 0) {
      return 0;
    }
    var times = Math.floor((difference - -180) / 360);
    return difference - times * 360;
  };

  var AngleSnapToDirection = function AngleSnapToDirection(tileXY, angle) {
    angle = RadToDeg$2(angle); // -180~180
    var directions = this.grid.allDirections;
    var neighborAngle, deltaAngle;
    var minDeltaAngle = Infinity,
      direction = undefined;
    for (var i = 0, cnt = directions.length; i < cnt; i++) {
      neighborAngle = RadToDeg$2(this.angleToward(tileXY, directions[i])); // -PI~PI -> -180~180
      deltaAngle = Math.abs(ShortestBetween(angle, neighborAngle));
      if (deltaAngle < minDeltaAngle) {
        minDeltaAngle = deltaAngle;
        direction = i;
      }
    }
    return direction;
  };

  var IsOverlappingPoint = function IsOverlappingPoint(worldX, worldY, tileZ) {
    if (this.infinityMode && tileZ === undefined) {
      return true;
    }
    var out = this.worldXYToTileXY(worldX, worldY, true);
    return this.contains(out.x, out.y, tileZ);
  };

  var GridAlign = function GridAlign(gameObject, tileX, tileY) {
    if (gameObject === undefined) {
      var chess = this.getAllChess();
      for (var i = 0, cnt = chess.length; i < cnt; i++) {
        this.gridAlign(chess[i]);
      }
    } else {
      if (IsUID(gameObject)) {
        gameObject = this.uidToChess(gameObject);
      }
      if (tileX === undefined) {
        var tileXYZ = this.chessToTileXYZ(gameObject);
        tileX = tileXYZ.x;
        tileY = tileXYZ.y;
      }
      this.tileXYToWorldXY(tileX, tileY, gameObject);
    }
    return this;
  };

  var GetGridPoints$2 = function GetGridPoints(tileX, tileY, points) {
    if (tileX && typeof tileX !== 'number') {
      points = tileY;
      var tileXY = this.chessToTileXYZ(tileX); // tileX is a Chess or TileXY
      tileX = tileXY.x;
      tileY = tileXY.y;
    }
    return this.grid.getGridPoints(tileX, tileY, points);
  };

  var GetGridBounds = function GetGridBounds(tileX, tileY, out) {
    if (tileX && typeof tileX !== 'number') {
      out = tileY;
      var tileXY = this.chessToTileXYZ(tileX); // tileX is a Chess or TileXY
      tileX = tileXY.x;
      tileY = tileXY.y;
    }
    return this.grid.getBounds(tileX, tileY, out);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */

  //  Taken from klasse by mattdesl https://github.com/mattdesl/klasse

  function hasGetterOrSetter(def) {
    return !!def.get && typeof def.get === 'function' || !!def.set && typeof def.set === 'function';
  }
  function getProperty(definition, k, isClassDescriptor) {
    //  This may be a lightweight object, OR it might be a property that was defined previously.

    //  For simple class descriptors we can just assume its NOT previously defined.
    var def = isClassDescriptor ? definition[k] : Object.getOwnPropertyDescriptor(definition, k);
    if (!isClassDescriptor && def.value && _typeof(def.value) === 'object') {
      def = def.value;
    }

    //  This might be a regular property, or it may be a getter/setter the user defined in a class.
    if (def && hasGetterOrSetter(def)) {
      if (typeof def.enumerable === 'undefined') {
        def.enumerable = true;
      }
      if (typeof def.configurable === 'undefined') {
        def.configurable = true;
      }
      return def;
    } else {
      return false;
    }
  }
  function hasNonConfigurable(obj, k) {
    var prop = Object.getOwnPropertyDescriptor(obj, k);
    if (!prop) {
      return false;
    }
    if (prop.value && _typeof(prop.value) === 'object') {
      prop = prop.value;
    }
    if (prop.configurable === false) {
      return true;
    }
    return false;
  }

  /**
   * Extends the given `myClass` object's prototype with the properties of `definition`.
   *
   * @function extend
   * @param {Object} ctor The constructor object to mix into.
   * @param {Object} definition A dictionary of functions for the class.
   * @param {boolean} isClassDescriptor Is the definition a class descriptor?
   * @param {Object} [extend] The parent constructor object.
   */
  function extend(ctor, definition, isClassDescriptor, extend) {
    for (var k in definition) {
      if (!definition.hasOwnProperty(k)) {
        continue;
      }
      var def = getProperty(definition, k, isClassDescriptor);
      if (def !== false) {
        //  If Extends is used, we will check its prototype to see if the final variable exists.

        var parent = extend || ctor;
        if (hasNonConfigurable(parent.prototype, k)) {
          //  Just skip the final property
          if (Class.ignoreFinals) {
            continue;
          }

          //  We cannot re-define a property that is configurable=false.
          //  So we will consider them final and throw an error. This is by
          //  default so it is clear to the developer what is happening.
          //  You can set ignoreFinals to true if you need to extend a class
          //  which has configurable=false; it will simply not re-define final properties.
          throw new Error('cannot override final property \'' + k + '\', set Class.ignoreFinals = true to skip');
        }
        Object.defineProperty(ctor.prototype, k, def);
      } else {
        ctor.prototype[k] = definition[k];
      }
    }
  }

  /**
   * Applies the given `mixins` to the prototype of `myClass`.
   *
   * @function mixin
   * @param {Object} myClass The constructor object to mix into.
   * @param {Object|Array<Object>} mixins The mixins to apply to the constructor.
   */
  function mixin(myClass, mixins) {
    if (!mixins) {
      return;
    }
    if (!Array.isArray(mixins)) {
      mixins = [mixins];
    }
    for (var i = 0; i < mixins.length; i++) {
      extend(myClass, mixins[i].prototype || mixins[i]);
    }
  }

  /**
   * Creates a new class with the given descriptor.
   * The constructor, defined by the name `initialize`,
   * is an optional function. If unspecified, an anonymous
   * function will be used which calls the parent class (if
   * one exists).
   *
   * You can also use `Extends` and `Mixins` to provide subclassing
   * and inheritance.
   *
   * @class Phaser.Class
   * @constructor
   * @param {Object} definition a dictionary of functions for the class
   * @example
   *
   *      var MyClass = new Phaser.Class({
   *
   *          initialize: function() {
   *              this.foo = 2.0;
   *          },
   *
   *          bar: function() {
   *              return this.foo + 5;
   *          }
   *      });
   */
  function Class(definition) {
    if (!definition) {
      definition = {};
    }

    //  The variable name here dictates what we see in Chrome debugger
    var initialize;
    var Extends;
    if (definition.initialize) {
      if (typeof definition.initialize !== 'function') {
        throw new Error('initialize must be a function');
      }
      initialize = definition.initialize;

      //  Usually we should avoid 'delete' in V8 at all costs.
      //  However, its unlikely to make any performance difference
      //  here since we only call this on class creation (i.e. not object creation).
      delete definition.initialize;
    } else if (definition.Extends) {
      var base = definition.Extends;
      initialize = function initialize() {
        base.apply(this, arguments);
      };
    } else {
      initialize = function initialize() {};
    }
    if (definition.Extends) {
      initialize.prototype = Object.create(definition.Extends.prototype);
      initialize.prototype.constructor = initialize;

      //  For getOwnPropertyDescriptor to work, we need to act directly on the Extends (or Mixin)

      Extends = definition.Extends;
      delete definition.Extends;
    } else {
      initialize.prototype.constructor = initialize;
    }

    //  Grab the mixins, if they are specified...
    var mixins = null;
    if (definition.Mixins) {
      mixins = definition.Mixins;
      delete definition.Mixins;
    }

    //  First, mixin if we can.
    mixin(initialize, mixins);

    //  Now we grab the actual definition which defines the overrides.
    extend(initialize, definition, true, Extends);
    return initialize;
  }
  Class.extend = extend;
  Class.mixin = mixin;
  Class.ignoreFinals = false;

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */

  /**
   * Checks if a given point is inside a Rectangle's bounds.
   *
   * @function Phaser.Geom.Rectangle.Contains
   * @since 3.0.0
   *
   * @param {Phaser.Geom.Rectangle} rect - The Rectangle to check.
   * @param {number} x - The X coordinate of the point to check.
   * @param {number} y - The Y coordinate of the point to check.
   *
   * @return {boolean} `true` if the point is within the Rectangle's bounds, otherwise `false`.
   */
  var Contains$1 = function Contains(rect, x, y) {
    if (rect.width <= 0 || rect.height <= 0) {
      return false;
    }
    return rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */

  /**
   * Calculates the perimeter of a Rectangle.
   *
   * @function Phaser.Geom.Rectangle.Perimeter
   * @since 3.0.0
   *
   * @param {Phaser.Geom.Rectangle} rect - The Rectangle to use.
   *
   * @return {number} The perimeter of the Rectangle, equal to `(width * 2) + (height * 2)`.
   */
  var Perimeter = function Perimeter(rect) {
    return 2 * (rect.width + rect.height);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * @classdesc
   * Defines a Point in 2D space, with an x and y component.
   *
   * @class Point
   * @memberof Phaser.Geom
   * @constructor
   * @since 3.0.0
   *
   * @param {number} [x=0] - The x coordinate of this Point.
   * @param {number} [y=x] - The y coordinate of this Point.
   */
  var Point = new Class({
    initialize: function Point(x, y) {
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = x;
      }

      /**
       * The x coordinate of this Point.
       *
       * @name Phaser.Geom.Point#x
       * @type {number}
       * @default 0
       * @since 3.0.0
       */
      this.x = x;

      /**
       * The y coordinate of this Point.
       *
       * @name Phaser.Geom.Point#y
       * @type {number}
       * @default 0
       * @since 3.0.0
       */
      this.y = y;
    },
    /**
     * Set the x and y coordinates of the point to the given values.
     *
     * @method Phaser.Geom.Point#setTo
     * @since 3.0.0
     *
     * @param {number} [x=0] - The x coordinate of this Point.
     * @param {number} [y=x] - The y coordinate of this Point.
     *
     * @return {Phaser.Geom.Point} This Point object.
     */
    setTo: function setTo(x, y) {
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = x;
      }
      this.x = x;
      this.y = y;
      return this;
    }
  });

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * Position is a value between 0 and 1 where 0 = the top-left of the rectangle and 0.5 = the bottom right.
   *
   * @function Phaser.Geom.Rectangle.GetPoint
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [out,$return]
   *
   * @param {Phaser.Geom.Rectangle} rectangle - [description]
   * @param {number} position - [description]
   * @param {(Phaser.Geom.Point|object)} [out] - [description]
   *
   * @return {Phaser.Geom.Point} [description]
   */
  var GetPoint$1 = function GetPoint(rectangle, position, out) {
    if (out === undefined) {
      out = new Point();
    }
    if (position <= 0 || position >= 1) {
      out.x = rectangle.x;
      out.y = rectangle.y;
      return out;
    }
    var p = Perimeter(rectangle) * position;
    if (position > 0.5) {
      p -= rectangle.width + rectangle.height;
      if (p <= rectangle.width) {
        //  Face 3
        out.x = rectangle.right - p;
        out.y = rectangle.bottom;
      } else {
        //  Face 4
        out.x = rectangle.x;
        out.y = rectangle.bottom - (p - rectangle.width);
      }
    } else if (p <= rectangle.width) {
      //  Face 1
      out.x = rectangle.x + p;
      out.y = rectangle.y;
    } else {
      //  Face 2
      out.x = rectangle.right;
      out.y = rectangle.y + (p - rectangle.width);
    }
    return out;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  //  Return an array of points from the perimeter of the rectangle
  //  each spaced out based on the quantity or step required

  /**
   * Return an array of points from the perimeter of the rectangle, each spaced out based on the quantity or step required.
   *
   * @function Phaser.Geom.Rectangle.GetPoints
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point[]} O - [out,$return]
   *
   * @param {Phaser.Geom.Rectangle} rectangle - The Rectangle object to get the points from.
   * @param {number} step - Step between points. Used to calculate the number of points to return when quantity is falsy. Ignored if quantity is positive.
   * @param {integer} quantity - The number of evenly spaced points from the rectangles perimeter to return. If falsy, step param will be used to calculate the number of points.
   * @param {(array|Phaser.Geom.Point[])} [out] - An optional array to store the points in.
   *
   * @return {(array|Phaser.Geom.Point[])} An array of Points from the perimeter of the rectangle.
   */
  var GetPoints$1 = function GetPoints(rectangle, quantity, stepRate, out) {
    if (out === undefined) {
      out = [];
    }

    //  If quantity is a falsey value (false, null, 0, undefined, etc) then we calculate it based on the stepRate instead.
    if (!quantity) {
      quantity = Perimeter(rectangle) / stepRate;
    }
    for (var i = 0; i < quantity; i++) {
      var position = i / quantity;
      out.push(GetPoint$1(rectangle, position));
    }
    return out;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * Get a point on a line that's a given percentage along its length.
   *
   * @function Phaser.Geom.Line.GetPoint
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [out,$return]
   *
   * @param {Phaser.Geom.Line} line - The line.
   * @param {number} position - A value between 0 and 1, where 0 is the start, 0.5 is the middle and 1 is the end of the line.
   * @param {(Phaser.Geom.Point|object)} [out] - An optional point, or point-like object, to store the coordinates of the point on the line.
   *
   * @return {(Phaser.Geom.Point|object)} The point on the line.
   */
  var GetPoint = function GetPoint(line, position, out) {
    if (out === undefined) {
      out = new Point();
    }
    out.x = line.x1 + (line.x2 - line.x1) * position;
    out.y = line.y1 + (line.y2 - line.y1) * position;
    return out;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */

  /**
   * Calculate the length of the given line.
   *
   * @function Phaser.Geom.Line.Length
   * @since 3.0.0
   *
   * @param {Phaser.Geom.Line} line - The line to calculate the length of.
   *
   * @return {number} The length of the line.
   */
  var Length = function Length(line) {
    return Math.sqrt((line.x2 - line.x1) * (line.x2 - line.x1) + (line.y2 - line.y1) * (line.y2 - line.y1));
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * Get a number of points along a line's length.
   *
   * Provide a `quantity` to get an exact number of points along the line.
   *
   * Provide a `stepRate` to ensure a specific distance between each point on the line. Set `quantity` to `0` when
   * providing a `stepRate`.
   *
   * @function Phaser.Geom.Line.GetPoints
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point[]} O - [out,$return]
   *
   * @param {Phaser.Geom.Line} line - The line.
   * @param {integer} quantity - The number of points to place on the line. Set to `0` to use `stepRate` instead.
   * @param {number} [stepRate] - The distance between each point on the line. When set, `quantity` is implied and should be set to `0`.
   * @param {(array|Phaser.Geom.Point[])} [out] - An optional array of Points, or point-like objects, to store the coordinates of the points on the line.
   *
   * @return {(array|Phaser.Geom.Point[])} An array of Points, or point-like objects, containing the coordinates of the points on the line.
   */
  var GetPoints = function GetPoints(line, quantity, stepRate, out) {
    if (out === undefined) {
      out = [];
    }

    //  If quantity is a falsey value (false, null, 0, undefined, etc) then we calculate it based on the stepRate instead.
    if (!quantity) {
      quantity = Length(line) / stepRate;
    }
    var x1 = line.x1;
    var y1 = line.y1;
    var x2 = line.x2;
    var y2 = line.y2;
    for (var i = 0; i < quantity; i++) {
      var position = i / quantity;
      var x = x1 + (x2 - x1) * position;
      var y = y1 + (y2 - y1) * position;
      out.push(new Point(x, y));
    }
    return out;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * Returns a random point on a given Line.
   *
   * @function Phaser.Geom.Line.Random
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [out,$return]
   *
   * @param {Phaser.Geom.Line} line - The Line to calculate the random Point on.
   * @param {(Phaser.Geom.Point|object)} [out] - An instance of a Point to be modified.
   *
   * @return {(Phaser.Geom.Point|object)} A random Point on the Line.
   */
  var Random$1 = function Random(line, out) {
    if (out === undefined) {
      out = new Point();
    }
    var t = Math.random();
    out.x = line.x1 + t * (line.x2 - line.x1);
    out.y = line.y1 + t * (line.y2 - line.y1);
    return out;
  };

  /**
   * @classdesc
   * A representation of a vector in 2D space.
   *
   * A two-component vector.
   *
   * @class Vector2
   * @memberof Phaser.Math
   * @constructor
   * @since 3.0.0
   *
   * @param {number|Phaser.Types.Math.Vector2Like} [x] - The x component, or an object with `x` and `y` properties.
   * @param {number} [y] - The y component.
   */
  var Vector2$1 = new Class({
    initialize: function Vector2(x, y) {
      /**
       * The x component of this Vector.
       *
       * @name Phaser.Math.Vector2#x
       * @type {number}
       * @default 0
       * @since 3.0.0
       */
      this.x = 0;

      /**
       * The y component of this Vector.
       *
       * @name Phaser.Math.Vector2#y
       * @type {number}
       * @default 0
       * @since 3.0.0
       */
      this.y = 0;
      if (_typeof(x) === 'object') {
        this.x = x.x || 0;
        this.y = x.y || 0;
      } else {
        if (y === undefined) {
          y = x;
        }
        this.x = x || 0;
        this.y = y || 0;
      }
    },
    /**
     * Make a clone of this Vector2.
     *
     * @method Phaser.Math.Vector2#clone
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} A clone of this Vector2.
     */
    clone: function clone() {
      return new Vector2$1(this.x, this.y);
    },
    /**
     * Copy the components of a given Vector into this Vector.
     *
     * @method Phaser.Math.Vector2#copy
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to copy the components from.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    copy: function copy(src) {
      this.x = src.x || 0;
      this.y = src.y || 0;
      return this;
    },
    /**
     * Set the component values of this Vector from a given Vector2Like object.
     *
     * @method Phaser.Math.Vector2#setFromObject
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} obj - The object containing the component values to set for this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setFromObject: function setFromObject(obj) {
      this.x = obj.x || 0;
      this.y = obj.y || 0;
      return this;
    },
    /**
     * Set the `x` and `y` components of the this Vector to the given `x` and `y` values.
     *
     * @method Phaser.Math.Vector2#set
     * @since 3.0.0
     *
     * @param {number} x - The x value to set for this Vector.
     * @param {number} [y=x] - The y value to set for this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    set: function set(x, y) {
      if (y === undefined) {
        y = x;
      }
      this.x = x;
      this.y = y;
      return this;
    },
    /**
     * This method is an alias for `Vector2.set`.
     *
     * @method Phaser.Math.Vector2#setTo
     * @since 3.4.0
     *
     * @param {number} x - The x value to set for this Vector.
     * @param {number} [y=x] - The y value to set for this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setTo: function setTo(x, y) {
      return this.set(x, y);
    },
    /**
     * Sets the `x` and `y` values of this object from a given polar coordinate.
     *
     * @method Phaser.Math.Vector2#setToPolar
     * @since 3.0.0
     *
     * @param {number} azimuth - The angular coordinate, in radians.
     * @param {number} [radius=1] - The radial coordinate (length).
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setToPolar: function setToPolar(azimuth, radius) {
      if (radius == null) {
        radius = 1;
      }
      this.x = Math.cos(azimuth) * radius;
      this.y = Math.sin(azimuth) * radius;
      return this;
    },
    /**
     * Check whether this Vector is equal to a given Vector.
     *
     * Performs a strict equality check against each Vector's components.
     *
     * @method Phaser.Math.Vector2#equals
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} v - The vector to compare with this Vector.
     *
     * @return {boolean} Whether the given Vector is equal to this Vector.
     */
    equals: function equals(v) {
      return this.x === v.x && this.y === v.y;
    },
    /**
     * Calculate the angle between this Vector and the positive x-axis, in radians.
     *
     * @method Phaser.Math.Vector2#angle
     * @since 3.0.0
     *
     * @return {number} The angle between this Vector, and the positive x-axis, given in radians.
     */
    angle: function angle() {
      // computes the angle in radians with respect to the positive x-axis

      var angle = Math.atan2(this.y, this.x);
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      return angle;
    },
    /**
     * Add a given Vector to this Vector. Addition is component-wise.
     *
     * @method Phaser.Math.Vector2#add
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to add to this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    add: function add(src) {
      this.x += src.x;
      this.y += src.y;
      return this;
    },
    /**
     * Subtract the given Vector from this Vector. Subtraction is component-wise.
     *
     * @method Phaser.Math.Vector2#subtract
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to subtract from this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    subtract: function subtract(src) {
      this.x -= src.x;
      this.y -= src.y;
      return this;
    },
    /**
     * Perform a component-wise multiplication between this Vector and the given Vector.
     *
     * Multiplies this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector2#multiply
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to multiply this Vector by.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    multiply: function multiply(src) {
      this.x *= src.x;
      this.y *= src.y;
      return this;
    },
    /**
     * Scale this Vector by the given value.
     *
     * @method Phaser.Math.Vector2#scale
     * @since 3.0.0
     *
     * @param {number} value - The value to scale this Vector by.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    scale: function scale(value) {
      if (isFinite(value)) {
        this.x *= value;
        this.y *= value;
      } else {
        this.x = 0;
        this.y = 0;
      }
      return this;
    },
    /**
     * Perform a component-wise division between this Vector and the given Vector.
     *
     * Divides this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector2#divide
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to divide this Vector by.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    divide: function divide(src) {
      this.x /= src.x;
      this.y /= src.y;
      return this;
    },
    /**
     * Negate the `x` and `y` components of this Vector.
     *
     * @method Phaser.Math.Vector2#negate
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    negate: function negate() {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    },
    /**
     * Calculate the distance between this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector2#distance
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector.
     */
    distance: function distance(src) {
      var dx = src.x - this.x;
      var dy = src.y - this.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    /**
     * Calculate the distance between this Vector and the given Vector, squared.
     *
     * @method Phaser.Math.Vector2#distanceSq
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector, squared.
     */
    distanceSq: function distanceSq(src) {
      var dx = src.x - this.x;
      var dy = src.y - this.y;
      return dx * dx + dy * dy;
    },
    /**
     * Calculate the length (or magnitude) of this Vector.
     *
     * @method Phaser.Math.Vector2#length
     * @since 3.0.0
     *
     * @return {number} The length of this Vector.
     */
    length: function length() {
      var x = this.x;
      var y = this.y;
      return Math.sqrt(x * x + y * y);
    },
    /**
     * Calculate the length of this Vector squared.
     *
     * @method Phaser.Math.Vector2#lengthSq
     * @since 3.0.0
     *
     * @return {number} The length of this Vector, squared.
     */
    lengthSq: function lengthSq() {
      var x = this.x;
      var y = this.y;
      return x * x + y * y;
    },
    /**
     * Normalize this Vector.
     *
     * Makes the vector a unit length vector (magnitude of 1) in the same direction.
     *
     * @method Phaser.Math.Vector2#normalize
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    normalize: function normalize() {
      var x = this.x;
      var y = this.y;
      var len = x * x + y * y;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        this.x = x * len;
        this.y = y * len;
      }
      return this;
    },
    /**
     * Right-hand normalize (make unit length) this Vector.
     *
     * @method Phaser.Math.Vector2#normalizeRightHand
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    normalizeRightHand: function normalizeRightHand() {
      var x = this.x;
      this.x = this.y * -1;
      this.y = x;
      return this;
    },
    /**
     * Calculate the dot product of this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector2#dot
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector2 to dot product with this Vector2.
     *
     * @return {number} The dot product of this Vector and the given Vector.
     */
    dot: function dot(src) {
      return this.x * src.x + this.y * src.y;
    },
    /**
     * Calculate the cross product of this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector2#cross
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector2 to cross with this Vector2.
     *
     * @return {number} The cross product of this Vector and the given Vector.
     */
    cross: function cross(src) {
      return this.x * src.y - this.y * src.x;
    },
    /**
     * Linearly interpolate between this Vector and the given Vector.
     *
     * Interpolates this Vector towards the given Vector.
     *
     * @method Phaser.Math.Vector2#lerp
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector2} src - The Vector2 to interpolate towards.
     * @param {number} [t=0] - The interpolation percentage, between 0 and 1.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    lerp: function lerp(src, t) {
      if (t === undefined) {
        t = 0;
      }
      var ax = this.x;
      var ay = this.y;
      this.x = ax + t * (src.x - ax);
      this.y = ay + t * (src.y - ay);
      return this;
    },
    /**
     * Transform this Vector with the given Matrix.
     *
     * @method Phaser.Math.Vector2#transformMat3
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix3} mat - The Matrix3 to transform this Vector2 with.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    transformMat3: function transformMat3(mat) {
      var x = this.x;
      var y = this.y;
      var m = mat.val;
      this.x = m[0] * x + m[3] * y + m[6];
      this.y = m[1] * x + m[4] * y + m[7];
      return this;
    },
    /**
     * Transform this Vector with the given Matrix.
     *
     * @method Phaser.Math.Vector2#transformMat4
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix4} mat - The Matrix4 to transform this Vector2 with.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    transformMat4: function transformMat4(mat) {
      var x = this.x;
      var y = this.y;
      var m = mat.val;
      this.x = m[0] * x + m[4] * y + m[12];
      this.y = m[1] * x + m[5] * y + m[13];
      return this;
    },
    /**
     * Make this Vector the zero vector (0, 0).
     *
     * @method Phaser.Math.Vector2#reset
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    reset: function reset() {
      this.x = 0;
      this.y = 0;
      return this;
    }
  });

  /**
   * A static zero Vector2 for use by reference.
   * 
   * This constant is meant for comparison operations and should not be modified directly.
   *
   * @constant
   * @name Phaser.Math.Vector2.ZERO
   * @type {Phaser.Math.Vector2}
   * @since 3.1.0
   */
  Vector2$1.ZERO = new Vector2$1();

  /**
   * A static right Vector2 for use by reference.
   * 
   * This constant is meant for comparison operations and should not be modified directly.
   *
   * @constant
   * @name Phaser.Math.Vector2.RIGHT
   * @type {Phaser.Math.Vector2}
   * @since 3.16.0
   */
  Vector2$1.RIGHT = new Vector2$1(1, 0);

  /**
   * A static left Vector2 for use by reference.
   * 
   * This constant is meant for comparison operations and should not be modified directly.
   *
   * @constant
   * @name Phaser.Math.Vector2.LEFT
   * @type {Phaser.Math.Vector2}
   * @since 3.16.0
   */
  Vector2$1.LEFT = new Vector2$1(-1, 0);

  /**
   * A static up Vector2 for use by reference.
   * 
   * This constant is meant for comparison operations and should not be modified directly.
   *
   * @constant
   * @name Phaser.Math.Vector2.UP
   * @type {Phaser.Math.Vector2}
   * @since 3.16.0
   */
  Vector2$1.UP = new Vector2$1(0, -1);

  /**
   * A static down Vector2 for use by reference.
   * 
   * This constant is meant for comparison operations and should not be modified directly.
   *
   * @constant
   * @name Phaser.Math.Vector2.DOWN
   * @type {Phaser.Math.Vector2}
   * @since 3.16.0
   */
  Vector2$1.DOWN = new Vector2$1(0, 1);

  /**
   * A static one Vector2 for use by reference.
   * 
   * This constant is meant for comparison operations and should not be modified directly.
   *
   * @constant
   * @name Phaser.Math.Vector2.ONE
   * @type {Phaser.Math.Vector2}
   * @since 3.16.0
   */
  Vector2$1.ONE = new Vector2$1(1, 1);

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * @classdesc
   * Defines a Line segment, a part of a line between two endpoints.
   *
   * @class Line
   * @memberof Phaser.Geom
   * @constructor
   * @since 3.0.0
   *
   * @param {number} [x1=0] - The x coordinate of the lines starting point.
   * @param {number} [y1=0] - The y coordinate of the lines starting point.
   * @param {number} [x2=0] - The x coordinate of the lines ending point.
   * @param {number} [y2=0] - The y coordinate of the lines ending point.
   */
  var Line = new Class({
    initialize: function Line(x1, y1, x2, y2) {
      if (x1 === undefined) {
        x1 = 0;
      }
      if (y1 === undefined) {
        y1 = 0;
      }
      if (x2 === undefined) {
        x2 = 0;
      }
      if (y2 === undefined) {
        y2 = 0;
      }

      /**
       * The x coordinate of the lines starting point.
       *
       * @name Phaser.Geom.Line#x1
       * @type {number}
       * @since 3.0.0
       */
      this.x1 = x1;

      /**
       * The y coordinate of the lines starting point.
       *
       * @name Phaser.Geom.Line#y1
       * @type {number}
       * @since 3.0.0
       */
      this.y1 = y1;

      /**
       * The x coordinate of the lines ending point.
       *
       * @name Phaser.Geom.Line#x2
       * @type {number}
       * @since 3.0.0
       */
      this.x2 = x2;

      /**
       * The y coordinate of the lines ending point.
       *
       * @name Phaser.Geom.Line#y2
       * @type {number}
       * @since 3.0.0
       */
      this.y2 = y2;
    },
    /**
     * Get a point on a line that's a given percentage along its length.
     *
     * @method Phaser.Geom.Line#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [output,$return]
     *
     * @param {number} position - A value between 0 and 1, where 0 is the start, 0.5 is the middle and 1 is the end of the line.
     * @param {(Phaser.Geom.Point|object)} [output] - An optional point, or point-like object, to store the coordinates of the point on the line.
     *
     * @return {(Phaser.Geom.Point|object)} A Point, or point-like object, containing the coordinates of the point on the line.
     */
    getPoint: function getPoint(position, output) {
      return GetPoint(this, position, output);
    },
    /**
     * Get a number of points along a line's length.
     *
     * Provide a `quantity` to get an exact number of points along the line.
     *
     * Provide a `stepRate` to ensure a specific distance between each point on the line. Set `quantity` to `0` when
     * providing a `stepRate`.
     *
     * @method Phaser.Geom.Line#getPoints
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [output,$return]
     *
     * @param {integer} quantity - The number of points to place on the line. Set to `0` to use `stepRate` instead.
     * @param {integer} [stepRate] - The distance between each point on the line. When set, `quantity` is implied and should be set to `0`.
     * @param {(array|Phaser.Geom.Point[])} [output] - An optional array of Points, or point-like objects, to store the coordinates of the points on the line.
     *
     * @return {(array|Phaser.Geom.Point[])} An array of Points, or point-like objects, containing the coordinates of the points on the line.
     */
    getPoints: function getPoints(quantity, stepRate, output) {
      return GetPoints(this, quantity, stepRate, output);
    },
    /**
     * Get a random Point on the Line.
     *
     * @method Phaser.Geom.Line#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {(Phaser.Geom.Point|object)} [point] - An instance of a Point to be modified.
     *
     * @return {Phaser.Geom.Point} A random Point on the Line.
     */
    getRandomPoint: function getRandomPoint(point) {
      return Random$1(this, point);
    },
    /**
     * Set new coordinates for the line endpoints.
     *
     * @method Phaser.Geom.Line#setTo
     * @since 3.0.0
     *
     * @param {number} [x1=0] - The x coordinate of the lines starting point.
     * @param {number} [y1=0] - The y coordinate of the lines starting point.
     * @param {number} [x2=0] - The x coordinate of the lines ending point.
     * @param {number} [y2=0] - The y coordinate of the lines ending point.
     *
     * @return {Phaser.Geom.Line} This Line object.
     */
    setTo: function setTo(x1, y1, x2, y2) {
      if (x1 === undefined) {
        x1 = 0;
      }
      if (y1 === undefined) {
        y1 = 0;
      }
      if (x2 === undefined) {
        x2 = 0;
      }
      if (y2 === undefined) {
        y2 = 0;
      }
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      return this;
    },
    /**
     * Returns a Vector2 object that corresponds to the start of this Line.
     *
     * @method Phaser.Geom.Line#getPointA
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [vec2,$return]
     *
     * @param {Phaser.Math.Vector2} [vec2] - A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
     *
     * @return {Phaser.Math.Vector2} A Vector2 object that corresponds to the start of this Line.
     */
    getPointA: function getPointA(vec2) {
      if (vec2 === undefined) {
        vec2 = new Vector2$1();
      }
      vec2.set(this.x1, this.y1);
      return vec2;
    },
    /**
     * Returns a Vector2 object that corresponds to the end of this Line.
     *
     * @method Phaser.Geom.Line#getPointB
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [vec2,$return]
     *
     * @param {Phaser.Math.Vector2} [vec2] - A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
     *
     * @return {Phaser.Math.Vector2} A Vector2 object that corresponds to the end of this Line.
     */
    getPointB: function getPointB(vec2) {
      if (vec2 === undefined) {
        vec2 = new Vector2$1();
      }
      vec2.set(this.x2, this.y2);
      return vec2;
    },
    /**
     * The left position of the Line.
     *
     * @name Phaser.Geom.Line#left
     * @type {number}
     * @since 3.0.0
     */
    left: {
      get: function get() {
        return Math.min(this.x1, this.x2);
      },
      set: function set(value) {
        if (this.x1 <= this.x2) {
          this.x1 = value;
        } else {
          this.x2 = value;
        }
      }
    },
    /**
     * The right position of the Line.
     *
     * @name Phaser.Geom.Line#right
     * @type {number}
     * @since 3.0.0
     */
    right: {
      get: function get() {
        return Math.max(this.x1, this.x2);
      },
      set: function set(value) {
        if (this.x1 > this.x2) {
          this.x1 = value;
        } else {
          this.x2 = value;
        }
      }
    },
    /**
     * The top position of the Line.
     *
     * @name Phaser.Geom.Line#top
     * @type {number}
     * @since 3.0.0
     */
    top: {
      get: function get() {
        return Math.min(this.y1, this.y2);
      },
      set: function set(value) {
        if (this.y1 <= this.y2) {
          this.y1 = value;
        } else {
          this.y2 = value;
        }
      }
    },
    /**
     * The bottom position of the Line.
     *
     * @name Phaser.Geom.Line#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {
      get: function get() {
        return Math.max(this.y1, this.y2);
      },
      set: function set(value) {
        if (this.y1 > this.y2) {
          this.y1 = value;
        } else {
          this.y2 = value;
        }
      }
    }
  });

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * Returns a random point within a Rectangle.
   *
   * @function Phaser.Geom.Rectangle.Random
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Point} O - [out,$return]
   *
   * @param {Phaser.Geom.Rectangle} rect - The Rectangle to return a point from.
   * @param {Phaser.Geom.Point} out - The object to update with the point's coordinates.
   *
   * @return {Phaser.Geom.Point} The modified `out` object, or a new Point if none was provided.
   */
  var Random = function Random(rect, out) {
    if (out === undefined) {
      out = new Point();
    }
    out.x = rect.x + Math.random() * rect.width;
    out.y = rect.y + Math.random() * rect.height;
    return out;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * @classdesc
   * Encapsulates a 2D rectangle defined by its corner point in the top-left and its extends in x (width) and y (height)
   *
   * @class Rectangle
   * @memberof Phaser.Geom
   * @constructor
   * @since 3.0.0
   *
   * @param {number} [x=0] - The X coordinate of the top left corner of the Rectangle.
   * @param {number} [y=0] - The Y coordinate of the top left corner of the Rectangle.
   * @param {number} [width=0] - The width of the Rectangle.
   * @param {number} [height=0] - The height of the Rectangle.
   */
  var Rectangle$2 = new Class({
    initialize: function Rectangle(x, y, width, height) {
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = 0;
      }

      /**
       * The X coordinate of the top left corner of the Rectangle.
       *
       * @name Phaser.Geom.Rectangle#x
       * @type {number}
       * @default 0
       * @since 3.0.0
       */
      this.x = x;

      /**
       * The Y coordinate of the top left corner of the Rectangle.
       *
       * @name Phaser.Geom.Rectangle#y
       * @type {number}
       * @default 0
       * @since 3.0.0
       */
      this.y = y;

      /**
       * The width of the Rectangle, i.e. the distance between its left side (defined by `x`) and its right side.
       *
       * @name Phaser.Geom.Rectangle#width
       * @type {number}
       * @default 0
       * @since 3.0.0
       */
      this.width = width;

      /**
       * The height of the Rectangle, i.e. the distance between its top side (defined by `y`) and its bottom side.
       *
       * @name Phaser.Geom.Rectangle#height
       * @type {number}
       * @default 0
       * @since 3.0.0
       */
      this.height = height;
    },
    /**
     * Checks if the given point is inside the Rectangle's bounds.
     *
     * @method Phaser.Geom.Rectangle#contains
     * @since 3.0.0
     *
     * @param {number} x - The X coordinate of the point to check.
     * @param {number} y - The Y coordinate of the point to check.
     *
     * @return {boolean} `true` if the point is within the Rectangle's bounds, otherwise `false`.
     */
    contains: function contains(x, y) {
      return Contains$1(this, x, y);
    },
    /**
     * Calculates the coordinates of a point at a certain `position` on the Rectangle's perimeter.
     * 
     * The `position` is a fraction between 0 and 1 which defines how far into the perimeter the point is.
     * 
     * A value of 0 or 1 returns the point at the top left corner of the rectangle, while a value of 0.5 returns the point at the bottom right corner of the rectangle. Values between 0 and 0.5 are on the top or the right side and values between 0.5 and 1 are on the bottom or the left side.
     *
     * @method Phaser.Geom.Rectangle#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [output,$return]
     *
     * @param {number} position - The normalized distance into the Rectangle's perimeter to return.
     * @param {(Phaser.Geom.Point|object)} [output] - An object to update with the `x` and `y` coordinates of the point.
     *
     * @return {(Phaser.Geom.Point|object)} The updated `output` object, or a new Point if no `output` object was given.
     */
    getPoint: function getPoint(position, output) {
      return GetPoint$1(this, position, output);
    },
    /**
     * Returns an array of points from the perimeter of the Rectangle, each spaced out based on the quantity or step required.
     *
     * @method Phaser.Geom.Rectangle#getPoints
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point[]} O - [output,$return]
     *
     * @param {integer} quantity - The number of points to return. Set to `false` or 0 to return an arbitrary number of points (`perimeter / stepRate`) evenly spaced around the Rectangle based on the `stepRate`.
     * @param {number} [stepRate] - If `quantity` is 0, determines the normalized distance between each returned point.
     * @param {(array|Phaser.Geom.Point[])} [output] - An array to which to append the points.
     *
     * @return {(array|Phaser.Geom.Point[])} The modified `output` array, or a new array if none was provided.
     */
    getPoints: function getPoints(quantity, stepRate, output) {
      return GetPoints$1(this, quantity, stepRate, output);
    },
    /**
     * Returns a random point within the Rectangle's bounds.
     *
     * @method Phaser.Geom.Rectangle#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {Phaser.Geom.Point} [point] - The object in which to store the `x` and `y` coordinates of the point.
     *
     * @return {Phaser.Geom.Point} The updated `point`, or a new Point if none was provided.
     */
    getRandomPoint: function getRandomPoint(point) {
      return Random(this, point);
    },
    /**
     * Sets the position, width, and height of the Rectangle.
     *
     * @method Phaser.Geom.Rectangle#setTo
     * @since 3.0.0
     *
     * @param {number} x - The X coordinate of the top left corner of the Rectangle.
     * @param {number} y - The Y coordinate of the top left corner of the Rectangle.
     * @param {number} width - The width of the Rectangle.
     * @param {number} height - The height of the Rectangle.
     *
     * @return {Phaser.Geom.Rectangle} This Rectangle object.
     */
    setTo: function setTo(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      return this;
    },
    /**
     * Resets the position, width, and height of the Rectangle to 0.
     *
     * @method Phaser.Geom.Rectangle#setEmpty
     * @since 3.0.0
     *
     * @return {Phaser.Geom.Rectangle} This Rectangle object.
     */
    setEmpty: function setEmpty() {
      return this.setTo(0, 0, 0, 0);
    },
    /**
     * Sets the position of the Rectangle.
     *
     * @method Phaser.Geom.Rectangle#setPosition
     * @since 3.0.0
     *
     * @param {number} x - The X coordinate of the top left corner of the Rectangle.
     * @param {number} [y=x] - The Y coordinate of the top left corner of the Rectangle.
     *
     * @return {Phaser.Geom.Rectangle} This Rectangle object.
     */
    setPosition: function setPosition(x, y) {
      if (y === undefined) {
        y = x;
      }
      this.x = x;
      this.y = y;
      return this;
    },
    /**
     * Sets the width and height of the Rectangle.
     *
     * @method Phaser.Geom.Rectangle#setSize
     * @since 3.0.0
     *
     * @param {number} width - The width to set the Rectangle to.
     * @param {number} [height=width] - The height to set the Rectangle to.
     *
     * @return {Phaser.Geom.Rectangle} This Rectangle object.
     */
    setSize: function setSize(width, height) {
      if (height === undefined) {
        height = width;
      }
      this.width = width;
      this.height = height;
      return this;
    },
    /**
     * Determines if the Rectangle is empty. A Rectangle is empty if its width or height is less than or equal to 0.
     *
     * @method Phaser.Geom.Rectangle#isEmpty
     * @since 3.0.0
     *
     * @return {boolean} `true` if the Rectangle is empty. A Rectangle object is empty if its width or height is less than or equal to 0.
     */
    isEmpty: function isEmpty() {
      return this.width <= 0 || this.height <= 0;
    },
    /**
     * Returns a Line object that corresponds to the top of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineA
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the top of this Rectangle.
     */
    getLineA: function getLineA(line) {
      if (line === undefined) {
        line = new Line();
      }
      line.setTo(this.x, this.y, this.right, this.y);
      return line;
    },
    /**
     * Returns a Line object that corresponds to the right of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineB
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the right of this Rectangle.
     */
    getLineB: function getLineB(line) {
      if (line === undefined) {
        line = new Line();
      }
      line.setTo(this.right, this.y, this.right, this.bottom);
      return line;
    },
    /**
     * Returns a Line object that corresponds to the bottom of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineC
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the bottom of this Rectangle.
     */
    getLineC: function getLineC(line) {
      if (line === undefined) {
        line = new Line();
      }
      line.setTo(this.right, this.bottom, this.x, this.bottom);
      return line;
    },
    /**
     * Returns a Line object that corresponds to the left of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineD
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the left of this Rectangle.
     */
    getLineD: function getLineD(line) {
      if (line === undefined) {
        line = new Line();
      }
      line.setTo(this.x, this.bottom, this.x, this.y);
      return line;
    },
    /**
     * The x coordinate of the left of the Rectangle.
     * Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
     *
     * @name Phaser.Geom.Rectangle#left
     * @type {number}
     * @since 3.0.0
     */
    left: {
      get: function get() {
        return this.x;
      },
      set: function set(value) {
        if (value >= this.right) {
          this.width = 0;
        } else {
          this.width = this.right - value;
        }
        this.x = value;
      }
    },
    /**
     * The sum of the x and width properties.
     * Changing the right property of a Rectangle object has no effect on the x, y and height properties, however it does affect the width property.
     *
     * @name Phaser.Geom.Rectangle#right
     * @type {number}
     * @since 3.0.0
     */
    right: {
      get: function get() {
        return this.x + this.width;
      },
      set: function set(value) {
        if (value <= this.x) {
          this.width = 0;
        } else {
          this.width = value - this.x;
        }
      }
    },
    /**
     * The y coordinate of the top of the Rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties.
     * However it does affect the height property, whereas changing the y value does not affect the height property.
     *
     * @name Phaser.Geom.Rectangle#top
     * @type {number}
     * @since 3.0.0
     */
    top: {
      get: function get() {
        return this.y;
      },
      set: function set(value) {
        if (value >= this.bottom) {
          this.height = 0;
        } else {
          this.height = this.bottom - value;
        }
        this.y = value;
      }
    },
    /**
     * The sum of the y and height properties.
     * Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
     *
     * @name Phaser.Geom.Rectangle#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {
      get: function get() {
        return this.y + this.height;
      },
      set: function set(value) {
        if (value <= this.y) {
          this.height = 0;
        } else {
          this.height = value - this.y;
        }
      }
    },
    /**
     * The x coordinate of the center of the Rectangle.
     *
     * @name Phaser.Geom.Rectangle#centerX
     * @type {number}
     * @since 3.0.0
     */
    centerX: {
      get: function get() {
        return this.x + this.width / 2;
      },
      set: function set(value) {
        this.x = value - this.width / 2;
      }
    },
    /**
     * The y coordinate of the center of the Rectangle.
     *
     * @name Phaser.Geom.Rectangle#centerY
     * @type {number}
     * @since 3.0.0
     */
    centerY: {
      get: function get() {
        return this.y + this.height / 2;
      },
      set: function set(value) {
        this.y = value - this.height / 2;
      }
    }
  });

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * Creates a new Rectangle or repositions and/or resizes an existing Rectangle so that it encompasses the two given Rectangles, i.e. calculates their union.
   *
   * @function Phaser.Geom.Rectangle.Union
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Rectangle} O - [out,$return]
   *
   * @param {Phaser.Geom.Rectangle} rectA - The first Rectangle to use.
   * @param {Phaser.Geom.Rectangle} rectB - The second Rectangle to use.
   * @param {Phaser.Geom.Rectangle} [out] - The Rectangle to store the union in.
   *
   * @return {Phaser.Geom.Rectangle} The modified `out` Rectangle, or a new Rectangle if none was provided.
   */
  var Union$1 = function Union(rectA, rectB, out) {
    if (out === undefined) {
      out = new Rectangle$2();
    }

    //  Cache vars so we can use one of the input rects as the output rect
    var x = Math.min(rectA.x, rectB.x);
    var y = Math.min(rectA.y, rectB.y);
    var w = Math.max(rectA.right, rectB.right) - x;
    var h = Math.max(rectA.bottom, rectB.bottom) - y;
    return out.setTo(x, y, w, h);
  };

  var GetBoardBounds = function GetBoardBounds(out) {
    if (out === undefined) {
      out = new Rectangle$2();
    } else if (out === true) {
      out = globalBounds$2;
    }
    var isFirstTile = true;
    this.forEachTileXY(function (tileXY, board) {
      var tileBounds = board.getGridBounds(tileXY.x, tileXY.y, true);
      if (isFirstTile) {
        out.setTo(tileBounds.x, tileBounds.y, tileBounds.width, tileBounds.height);
        isFirstTile = false;
      } else {
        out = Union$1(out, tileBounds, out);
      }
    });
    return out;
  };
  var globalBounds$2 = new Rectangle$2();

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Calculate the distance between two sets of coordinates (points).
   *
   * @function Phaser.Math.Distance.Between
   * @since 3.0.0
   *
   * @param {number} x1 - The x coordinate of the first point.
   * @param {number} y1 - The y coordinate of the first point.
   * @param {number} x2 - The x coordinate of the second point.
   * @param {number} y2 - The y coordinate of the second point.
   *
   * @return {number} The distance between each point.
   */
  var DistanceBetween$3 = function DistanceBetween(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Calculates a linear (interpolation) value over t.
   *
   * @function Phaser.Math.Linear
   * @since 3.0.0
   *
   * @param {number} p0 - The first point.
   * @param {number} p1 - The second point.
   * @param {number} t - The percentage between p0 and p1 to return, represented as a number between 0 and 1.
   *
   * @return {number} The step t% of the way between p0 and p1.
   */
  var Linear = function Linear(p0, p1, t) {
    return (p1 - p0) * t + p0;
  };

  var AreTileXYEqual = function AreTileXYEqual(tileA, tileB) {
    return tileA && tileB && tileA.x === tileB.x && tileA.y === tileB.y;
  };

  var LineToTileXYArray = function LineToTileXYArray(startX, startY, endX, endY, out) {
    if (typeof startX !== 'number') {
      var line = startX;
      out = startY;
      startX = line.x1;
      startY = line.y1;
      endX = line.x2;
      endY = line.y2;
    }
    if (out === undefined) {
      out = [];
    }
    var totalDistance = DistanceBetween$3(startX, startY, endX, endY);
    var gridSize = Math.min(this.grid.cellWidth, this.grid.cellHeight);
    var quantity = Math.ceil(totalDistance / (gridSize / 4)),
      t;
    var worldX, worldY;
    var preTileXY, tileXY;
    for (var i = 0; i <= quantity; i++) {
      t = i / quantity;
      worldX = Linear(startX, endX, t);
      worldY = Linear(startY, endY, t);
      tileXY = this.worldXYToTileXY(worldX, worldY);
      if (!this.contains(tileXY.x, tileXY.y)) {
        continue;
      }
      if (preTileXY && AreTileXYEqual(preTileXY, tileXY)) {
        continue;
      }
      out.push(tileXY);
      preTileXY = tileXY;
    }
    return out;
  };

  var CircleToTileXYArray = function CircleToTileXYArray(circle, testMode, out) {
    return this.shapeToTileXYArray(circle, testMode, out);
  };

  var EllipseToTileXYArray = function EllipseToTileXYArray(ellipse, testMode, out) {
    return this.shapeToTileXYArray(ellipse, testMode, out);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * Calculates the bounding AABB rectangle of a polygon.
   *
   * @function Phaser.Geom.Polygon.GetAABB
   * @since 3.0.0
   *
   * @generic {Phaser.Geom.Rectangle} O - [out,$return]
   *
   * @param {Phaser.Geom.Polygon} polygon - The polygon that should be calculated.
   * @param {(Phaser.Geom.Rectangle|object)} [out] - The rectangle or object that has x, y, width, and height properties to store the result. Optional.
   *
   * @return {(Phaser.Geom.Rectangle|object)} The resulting rectangle or object that is passed in with position and dimensions of the polygon's AABB.
   */
  var GetAABB = function GetAABB(polygon, out) {
    if (out === undefined) {
      out = new Rectangle$2();
    }
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -minX;
    var maxY = -minY;
    var p;
    for (var i = 0; i < polygon.points.length; i++) {
      p = polygon.points[i];
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }
    out.x = minX;
    out.y = minY;
    out.width = maxX - minX;
    out.height = maxY - minY;
    return out;
  };

  var PolygonToTileXYArray = function PolygonToTileXYArray(polygon, testMode, out) {
    if (Array.isArray(testMode)) {
      out = testMode;
      testMode = undefined;
    }
    globSearchRectangle = GetAABB(polygon, globSearchRectangle);
    var config = {
      testMode: testMode,
      searchRectangle: globSearchRectangle
    };
    return this.shapeToTileXYArray(polygon, config, out);
  };
  var globSearchRectangle;

  var RectangleToTileXYArray = function RectangleToTileXYArray(rectangle, testMode, out) {
    return this.shapeToTileXYArray(rectangle, testMode, out);
  };

  var TriangleToTileXYArray = function TriangleToTileXYArray(triangle, testMode, out) {
    return this.shapeToTileXYArray(triangle, testMode, out);
  };

  var ShapeToTileXYArray = function ShapeToTileXYArray(shape, config, out) {
    if (typeof config === 'number') {
      config = {
        testMode: config
      };
    }
    if (Array.isArray(config)) {
      out = config;
      config = undefined;
    }
    if (out === undefined) {
      out = [];
    }
    this.forEachTileXYInShape(shape, function (tileXY) {
      out.push({
        x: tileXY.x,
        y: tileXY.y
      });
    }, undefined, config);
    return out;
  };

  var ForEachTileXYInShape = function ForEachTileXYInShape(shape, callback, scope, config) {
    var testMode = GetValue$c(config, 'testMode', 0);
    var searchRectangle = GetValue$c(config, 'searchRectangle', shape);
    GetValue$c(config, 'order', 0);
    if (scope) {
      callback = callback.bind(scope);
    }
    globLeftToptileXY = this.worldXYToTileXY(searchRectangle.left, searchRectangle.top, globLeftToptileXY);
    globRightBottomTileXY = this.worldXYToTileXY(searchRectangle.right, searchRectangle.bottom, globRightBottomTileXY);
    var left = globLeftToptileXY.x - 1,
      top = globLeftToptileXY.y - 1,
      right = globRightBottomTileXY.x + 1,
      bottom = globRightBottomTileXY.y + 1;
    this.forEachTileXY(function (tileXY, board) {
      if (IsInShape(board, shape, tileXY.x, tileXY.y, testMode)) {
        return callback(tileXY, board);
      }
    }, this, {
      left: left,
      right: right,
      top: top,
      bottom: bottom
    });
    return this;
  };
  var IsInShape = function IsInShape(board, shape, x, y, testMode) {
    var targetWorldXY = board.tileXYToWorldXY(x, y, true);
    if (shape.contains(targetWorldXY.x, targetWorldXY.y)) {
      return true;
    }
    switch (testMode) {
      case 1:
        // Test grid bounds (a rectangle)
        var rect = board.getGridBounds(x, y, true);
        return OverlapRectangle(shape, rect);
      case 2:
        // Test grid points
        var points = board.getGridPoints(x, y, true);
        return ContainsAnyPoint(shape, points);
      default:
        return false;
    }
  };
  var OverlapRectangle = function OverlapRectangle(shape, rectangle) {
    var top = rectangle.top,
      bottom = rectangle.bottom,
      left = rectangle.left,
      right = rectangle.right;
    if (shape.contains(left, top)) {
      return true;
    }
    if (shape.contains(left, bottom)) {
      return true;
    }
    if (shape.contains(right, top)) {
      return true;
    }
    if (shape.contains(right, bottom)) {
      return true;
    }
    return false;
  };
  var ContainsAnyPoint = function ContainsAnyPoint(shape, points) {
    for (var i = 0, cnt = points.length; i < cnt; i++) {
      var point = points[i];
      if (shape.contains(point.x, point.y)) {
        return true;
      }
    }
    return false;
  };
  var globLeftToptileXY, globRightBottomTileXY;

  var UidToChess = function UidToChess(uid) {
    if (uid == null) {
      return null;
    } else {
      if (!this.boardData.exists(uid)) {
        return null;
      }
      return ChessBank.get(uid).parent;
    }
  };

  var AddChess$1 = function AddChess(gameObject, tileX, tileY, tileZ, align) {
    if (!this.contains(tileX, tileY)) {
      return this;
    }
    if (align === undefined) {
      align = true;
    }
    var curTileXYZ = this.chessToTileXYZ(gameObject);
    if (tileZ === undefined) {
      if (curTileXYZ) {
        tileZ = curTileXYZ.z;
      } else {
        tileZ = 0;
      }
    }
    if (curTileXYZ && curTileXYZ.x === tileX && curTileXYZ.y === tileY && curTileXYZ.z === tileZ) {
      // Move to current position
      return this;
    }
    var occupiedChess = this.tileXYZToChess(tileX, tileY, tileZ);
    if (occupiedChess) {
      this.emit('kickout', gameObject, occupiedChess, curTileXYZ);
    }
    this.removeChess(gameObject);
    if (occupiedChess) {
      this.removeChess(occupiedChess, tileX, tileY, tileZ);
    }
    this.boardData.addUID(this.getChessUID(gameObject), tileX, tileY, tileZ);
    if (this.isBoard) {
      this.getChessData(gameObject).setBoard(this);
    }
    if (align) {
      this.gridAlign(gameObject, tileX, tileY);
    }
    return this;
  };

  var SetChessTileZ = function SetChessTileZ(chess, tileZ, align) {
    if (align === undefined) {
      align = false;
    }
    var tileXYZ = this.chessToTileXYZ(chess);
    if (tileXYZ) {
      this.moveChess(chess, tileXYZ.x, tileXYZ.y, tileZ, align);
    }
    return this;
  };

  var RemoveChess$1 = function RemoveChess(gameObject, tileX, tileY, tileZ, destroy, fromBoardRemove) {
    if (destroy === undefined) {
      destroy = false;
    }
    if (fromBoardRemove === undefined) {
      fromBoardRemove = false;
    }
    if (gameObject) {
      var tileXYZ = this.chessToTileXYZ(gameObject);
      if (tileXYZ) {
        tileX = tileXYZ.x;
        tileY = tileXYZ.y;
        tileZ = tileXYZ.z;
      } else {
        // chess is not in this board
        return this;
      }
    } else {
      gameObject = this.tileXYZToChess(tileX, tileY, tileZ);
      if (!gameObject) {
        // chess is not in this board
        return this;
      }
    }
    if (!fromBoardRemove) {
      this.boardData.removeUID(tileX, tileY, tileZ);
    }
    if (this.isBoard) {
      this.getChessData(gameObject).setBoard(null);
    }
    if (destroy && gameObject.destroy) {
      gameObject.destroy();
    }
    return this;
  };

  var RemoveAllChess$1 = function RemoveAllChess(destroy, fromBoardRemove) {
    var chess = this.getAllChess();
    for (var i = 0, cnt = chess.length; i < cnt; i++) {
      this.removeChess(chess[i], undefined, undefined, undefined, destroy, fromBoardRemove);
    }
    return this;
  };

  var SwapChess = function SwapChess(gameObjectA, gameObjectB, align) {
    if (align === undefined) {
      align = true;
    }
    var tileXYZA = this.chessToTileXYZ(gameObjectA);
    var tileXYZB = this.chessToTileXYZ(gameObjectB);
    if (tileXYZA == null || tileXYZB == null) {
      return this;
    }
    this.removeChess(gameObjectA);
    this.removeChess(gameObjectB);
    this.addChess(gameObjectA, tileXYZB.x, tileXYZB.y, tileXYZB.z, align);
    this.addChess(gameObjectB, tileXYZA.x, tileXYZA.y, tileXYZA.z, align);
    return this;
  };

  var GetAllChess = function GetAllChess(out) {
    if (out === undefined) {
      out = [];
    }
    var uids = this.boardData.UIDToXYZ;
    for (var uid in uids) {
      out.push(this.uidToChess(uid));
    }
    return out;
  };

  var Contains = function Contains(tileX, tileY, tileZ) {
    var result;
    if (this.infinityMode) {
      result = true;
    } else {
      result = tileX >= 0 && tileX < this.width && tileY >= 0 && tileY < this.height;
    }
    if (result && tileZ !== undefined) {
      result = this.boardData.contains(tileX, tileY, tileZ);
    }
    return result;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */

  /**
   * Force a value within the boundaries by clamping it to the range `min`, `max`.
   *
   * @function Phaser.Math.Clamp
   * @since 3.0.0
   *
   * @param {number} value - The value to be clamped.
   * @param {number} min - The minimum bounds.
   * @param {number} max - The maximum bounds.
   *
   * @return {number} The clamped value.
   */
  var Clamp = function Clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  };

  var ForEachTileXY = function ForEachTileXY(callback, scope, config) {
    if (typeof config === 'number') {
      config = {
        order: config
      };
    }
    var lastX = this.width - 1,
      lastY = this.height - 1;
    var order = GetValue$c(config, 'order', 0);
    var left = GetValue$c(config, 'left', 0);
    var right = GetValue$c(config, 'right', lastX);
    var top = GetValue$c(config, 'top', 0);
    var bottom = GetValue$c(config, 'bottom', lastY);
    if (!this.infinityMode) {
      left = Clamp(left, 0, lastX);
      top = Clamp(top, 0, lastY);
      right = Clamp(right, 0, lastX);
      bottom = Clamp(bottom, 0, lastY);
    }
    switch (order) {
      case 0:
        // x+,y+
        var isBreak;
        for (var y = top; y <= bottom; y++) {
          for (var x = left; x <= right; x++) {
            globTileXY$h.x = x;
            globTileXY$h.y = y;
            if (scope) {
              isBreak = callback.call(scope, globTileXY$h, this);
            } else {
              isBreak = callback(globTileXY$h, this);
            }
            if (isBreak) {
              break;
            }
          }
        }
        break;
      case 1:
        // x-,y+
        var isBreak;
        for (var y = top; y <= bottom; y++) {
          for (var x = right; x >= left; x--) {
            globTileXY$h.x = x;
            globTileXY$h.y = y;
            if (scope) {
              isBreak = callback.call(scope, globTileXY$h, this);
            } else {
              isBreak = callback(globTileXY$h, this);
            }
            if (isBreak) {
              break;
            }
          }
        }
        break;
      case 2:
        // y+,x+
        var isBreak;
        for (var x = left; x <= right; x++) {
          for (var y = top; y <= bottom; y++) {
            globTileXY$h.x = x;
            globTileXY$h.y = y;
            if (scope) {
              isBreak = callback.call(scope, globTileXY$h, this);
            } else {
              isBreak = callback(globTileXY$h, this);
            }
            if (isBreak) {
              break;
            }
          }
        }
        break;
      case 3:
        // y-,x+
        var isBreak;
        for (var x = left; x <= right; x++) {
          for (var y = bottom; y >= top; y--) {
            globTileXY$h.x = x;
            globTileXY$h.y = y;
            if (scope) {
              isBreak = callback.call(scope, globTileXY$h, this);
            } else {
              isBreak = callback(globTileXY$h, this);
            }
            if (isBreak) {
              break;
            }
          }
        }
    }
    return this;
  };
  var globTileXY$h = {
    x: 0,
    y: 0
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Wrap the given `value` between `min` and `max.
   *
   * @function Phaser.Math.Wrap
   * @since 3.0.0
   *
   * @param {number} value - The value to wrap.
   * @param {number} min - The minimum value.
   * @param {number} max - The maximum value.
   *
   * @return {number} The wrapped value.
   */
  var Wrap = function Wrap(value, min, max) {
    var range = max - min;
    return min + ((value - min) % range + range) % range;
  };

  var GetWrapTileXY = function GetWrapTileXY(tileX, tileY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$g;
    }
    if (this.wrapMode) {
      tileX = Wrap(tileX, 0, this.width);
    } else if (!this.infinityMode && (tileX < 0 || tileX >= this.width)) {
      tileX = null;
    }
    if (this.wrapMode) {
      tileY = Wrap(tileY, 0, this.height);
    } else if (!this.infinityMode && (tileY < 0 || tileY >= this.height)) {
      tileY = null;
    }
    out.x = tileX;
    out.y = tileY;
    return out;
  };
  var globTileXY$g = {};

  var TileXYZToChess = function TileXYZToChess(tileX, tileY, tileZ) {
    var uid = this.boardData.getUID(tileX, tileY, tileZ);
    return this.uidToChess(uid);
  };

  var TileXYToChessArray = function TileXYToChessArray(tileX, tileY, out) {
    if (out === undefined) {
      out = [];
    }
    var tileZToUIDs = this.boardData.getUID(tileX, tileY);
    if (tileZToUIDs == null) {
      return out;
    }
    for (var tileZ in tileZToUIDs) {
      out.push(this.uidToChess(tileZToUIDs[tileZ]));
    }
    return out;
  };

  var TileZToChessArray = function TileZToChessArray(tileZ, out) {
    if (out === undefined) {
      out = [];
    }
    var uids = this.boardData.UIDToXYZ;
    var tileXYZ;
    for (var uid in uids) {
      tileXYZ = uids[uid];
      if (tileXYZ.z !== tileZ) {
        continue;
      }
      out.push(this.uidToChess(uid));
    }
    return out;
  };

  var TileXYArrayToChessArray = function TileXYArrayToChessArray(tileXYArray, tileZ, out) {
    if (Array.isArray(tileZ)) {
      out = tileZ;
      tileZ = undefined;
    }
    if (out === undefined) {
      out = [];
    }
    var tileZMode = tileZ != null;
    var tileXY;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
      tileXY = tileXYArray[i];
      if (tileZMode) {
        out.push(this.tileXYZToChess(tileXY.x, tileXY.y, tileZ));
      } else {
        this.tileXYToChessArray(tileXY.x, tileXY.y, out);
      }
    }
    return out;
  };

  var IsChess = function IsChess(chess) {
    if (IsUID(chess)) {
      // Number or string
      return false;
    } else {
      return chess && !!chess.rexChess;
    }
  };

  var IsTileXYZ = function IsTileXYZ(obj) {
    return obj && (IsPlainObject(obj) || obj.isTileXYZ);
  };

  var ChessToTileXYZ = function ChessToTileXYZ(chess) {
    if (!chess) {
      return null;
    }

    // chess: chess object, UID, or tileXYZ
    if (IsUID(chess) || IsChess(chess)) {
      // UID, or game object
      var uid = GetChessUID(chess);
      return this.boardData.getXYZ(uid);
    } else if (IsTileXYZ(chess)) {
      // {x, y}, or {x, y, z}
      return chess;
    } else {
      return null;
    }
  };

  var GetOppositeDirection$2 = function GetOppositeDirection(tileX, tileY, direction) {
    if (tileX && typeof tileX !== 'number') {
      direction = tileY;
      var chess = tileX;
      var tileXY = this.chessToTileXYZ(chess);
      tileX = tileXY.x;
      tileY = tileXY.y;
    }
    return this.grid.getOppositeDirection(tileX, tileY, direction);
  };

  var GetDistance$2 = function GetDistance(tileA, tileB, roughMode) {
    tileA = this.chessToTileXYZ(tileA);
    tileB = this.chessToTileXYZ(tileB);
    return this.grid.getDistance(tileA, tileB, roughMode);
  };

  var DirectionBetween$2 = function DirectionBetween(chessA, chessB, round) {
    if (round === undefined) {
      round = true;
    }
    var tileA = this.chessToTileXYZ(chessA);
    var tileB = this.chessToTileXYZ(chessB);
    return this.grid.directionBetween(tileA, tileB, round);
  };

  var IsDirectionInCone = function IsDirectionInCone(chessA, chessB, face, cone) {
    var tileXYA = this.chessToTileXYZ(chessA);
    var tileXYB = this.chessToTileXYZ(chessB);
    var savedDirections = this.grid.directions; // Save directions
    this.grid.setDirectionMode(this.sides);
    var direction = this.grid.directionBetween(tileXYA, tileXYB, false);
    this.grid.setDirectionMode(savedDirections); // Restore directions

    var deltaDirection = Math.abs(direction - face);
    deltaDirection = Math.min(deltaDirection, this.grid.directions - deltaDirection);
    return deltaDirection <= cone / 2;
  };

  var Offset$3 = function Offset(tileXY, OffsetTileX, OffsetTileY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$f;
    }
    if (OffsetTileX === 0 && OffsetTileY === 0) {
      out.x = tileXY.x;
      out.y = tileXY.y;
    } else {
      this.grid.offset(tileXY, OffsetTileX, OffsetTileY, out);
    }
    return out;
  };
  var globTileXY$f = {};

  var Mirror$4 = function Mirror(tileXY, mode, originTileXY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$e;
    }
    if (originTileXY !== undefined) {
      this.offset(tileXY, -originTileXY.x, -originTileXY.y, out);
    } else {
      out.x = tileXY.x;
      out.y = tileXY.y;
    }
    this.grid.mirror(out, mode, out);
    if (originTileXY !== undefined) {
      this.offset(out, originTileXY.x, originTileXY.y, out);
    }
    return out;
  };
  var globTileXY$e = {};

  var Rotate$4 = function Rotate(tileXY, direction, originTileXY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$d;
    }
    if (originTileXY !== undefined) {
      this.offset(tileXY, -originTileXY.x, -originTileXY.y, out);
    } else {
      out.x = tileXY.x;
      out.y = tileXY.y;
    }
    this.grid.rotate(out, direction, out);
    if (originTileXY !== undefined) {
      this.offset(out, originTileXY.x, originTileXY.y, out);
    }
    return out;
  };
  var globTileXY$d = {};

  // Offset tileXYArray to (0,0), and set board size to fit tileXYArray
  var Fit = function Fit(tileXYArray) {
    // Get minimum tileX, tileY
    var minX = Infinity;
    var minY = Infinity;
    var tileXY;
    for (var i in tileXYArray) {
      tileXY = tileXYArray[i];
      minX = Math.min(minX, tileXY.x);
      minY = Math.min(minY, tileXY.y);
    }
    // Offset tileXYArray to (0,0)
    if (minX !== 0 || minY !== 0) {
      for (var i in tileXYArray) {
        tileXY = tileXYArray[i];
        this.offset(tileXY, -minX, -minY, tileXY);
      }
    }

    // Get maximun tileX, tileY
    var maxX = -Infinity;
    var maxY = -Infinity;
    for (var i in tileXYArray) {
      tileXY = tileXYArray[i];
      maxX = Math.max(maxX, tileXY.x);
      maxY = Math.max(maxY, tileXY.y);
    }
    // Set board size
    this.setBoardWidth(maxX + 1);
    this.setBoardHeight(maxY + 1);
    return tileXYArray;
  };

  var IsEmptyTileXYZ = function IsEmptyTileXYZ(tileX, tileY, tileZ) {
    // TileXY is inside board, and TileXYZ has no chess
    return this.contains(tileX, tileY) && !this.contains(tileX, tileY, tileZ);
  };

  var GetEmptyTileXYArray = function GetEmptyTileXYArray(tileZ, out) {
    if (tileZ === undefined) {
      tileZ = 0;
    }
    if (out === undefined) {
      out = [];
    }
    for (var tileY = 0; tileY < this.height; tileY++) {
      for (var tileX = 0; tileX < this.width; tileX++) {
        if (this.isEmptyTileXYZ(tileX, tileY, tileZ)) {
          out.push({
            x: tileX,
            y: tileY
          });
        }
      }
    }
    return out;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Compute a random integer between the `min` and `max` values, inclusive.
   *
   * @function Phaser.Math.Between
   * @since 3.0.0
   *
   * @param {integer} min - The minimum value.
   * @param {integer} max - The maximum value.
   *
   * @return {integer} The random integer.
   */
  var Between = function Between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Returns a Random element from the array.
   *
   * @function Phaser.Utils.Array.GetRandom
   * @since 3.0.0
   *
   * @param {array} array - The array to select the random entry from.
   * @param {integer} [startIndex=0] - An optional start index.
   * @param {integer} [length=array.length] - An optional length, the total number of elements (from the startIndex) to choose from.
   *
   * @return {*} A random element from the array, or `null` if no element could be found in the range given.
   */
  var GetRandom = function GetRandom(array, startIndex, length) {
    if (startIndex === undefined) {
      startIndex = 0;
    }
    if (length === undefined) {
      length = array.length;
    }
    var randomIndex = startIndex + Math.floor(Math.random() * length);
    return array[randomIndex] === undefined ? null : array[randomIndex];
  };

  var GetRandomEmptyTileXY = function GetRandomEmptyTileXY(tileZ, out) {
    if (tileZ === undefined) {
      tileZ = 0;
    }
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$c;
    }
    var tileX, tileY;
    var isOccupied = true;
    var tryCount = 20;
    while (isOccupied && tryCount > 0) {
      tileX = Between(0, this.width - 1);
      tileY = Between(0, this.height - 1);
      isOccupied = this.tileXYZToChess(tileX, tileY, tileZ) !== null;
      tryCount--;
    }
    if (!isOccupied) {
      out.x = tileX;
      out.y = tileY;
      return out;
    } else {
      globTileXYArray$3 = this.getEmptyTileXYArray(tileZ, globTileXYArray$3);
      if (globTileXYArray$3.length === 0) {
        return null;
      } else {
        var tileXY = GetRandom(globTileXYArray$3);
        out.x = tileXY.x;
        out.y = tileXY.y;
        globTileXYArray$3.length = 0;
        return out;
      }
    }
  };
  var globTileXYArray$3 = [];
  var globTileXY$c = {};

  var GetEmptyTileXYArrayInRange = function GetEmptyTileXYArrayInRange(centerTileXY, radius, tileZ, out) {
    if (radius === undefined) {
      radius = 1;
    }
    if (tileZ === undefined) {
      tileZ = 0;
    }
    if (out === undefined) {
      out = [];
    }
    centerTileXY = this.chessToTileXYZ(centerTileXY);
    this.grid.ringToTileXYArray(centerTileXY, radius, globTileXYArray$2);
    var tileXY;
    for (var i = 0, cnt = globTileXYArray$2.length; i < cnt; i++) {
      tileXY = globTileXYArray$2[i];
      if (this.isEmptyTileXYZ(tileXY.x, tileXY.y, tileZ)) {
        out.push(tileXY);
      }
    }
    globTileXYArray$2.length = 0;
    return out;
  };
  var globTileXYArray$2 = [];

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Shuffles the contents of the given array using the Fisher-Yates implementation.
   *
   * The original array is modified directly and returned.
   *
   * @function Phaser.Utils.Array.Shuffle
   * @since 3.0.0
   *
   * @param {array} array - The array to shuffle. This array is modified in place.
   *
   * @return {array} The shuffled array.
   */
  var Shuffle = function Shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var GetRandomEmptyTileXYInRange = function GetRandomEmptyTileXYInRange(centerTileXY, radius, tileZ, out) {
    if (radius === undefined) {
      radius = 1;
    }
    if (tileZ === undefined) {
      tileZ = 0;
    }
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$b;
    }
    centerTileXY = this.chessToTileXYZ(centerTileXY);
    this.grid.ringToTileXYArray(centerTileXY, radius, globTileXYArray$1);
    Shuffle(globTileXYArray$1);
    var tileXY;
    for (var i = 0, cnt = globTileXYArray$1.length; i < cnt; i++) {
      tileXY = globTileXYArray$1[i];
      if (this.isEmptyTileXYZ(tileXY.x, tileXY.y, tileZ)) {
        out.x = tileXY.x;
        out.y = tileXY.y;
        globTileXYArray$1.length = 0;
        return out;
      }
    }
    globTileXYArray$1.length = 0;
    return null;
  };
  var globTileXYArray$1 = [];
  var globTileXY$b = {};

  var GetTileXYAtDirection = function GetTileXYAtDirection(chess, directions, distance, out) {
    var srcTileXY = this.chessToTileXYZ(chess);
    if (!srcTileXY) {
      return null;
    }
    if (typeof directions === 'string') {
      if (directions.indexOf(',') === -1) {
        directions = parseInt(directions);
      } else {
        directions = directions.split(',');
      }
    }
    var isNumberDirection = typeof directions === 'number';
    var isNumberDistance = typeof distance === 'number';
    if (isNumberDirection && isNumberDistance) {
      // Return a single tileXY
      out = this.grid.getTileXYAtDirection(srcTileXY.x, srcTileXY.y, directions, distance, out); // directions is a number, distance is a number, return a singl tileXY
      this.getWrapTileXY(out.x, out.y, out);
      if (out.x == null || out.y == null) {
        out = null;
      } else {
        out.direction = directions;
      }
    } else {
      // Return an array of tileXY
      if (out === undefined) {
        out = [];
      }
      if (directions == null) {
        directions = this.grid.allDirections;
      }
      var resultTileXY;
      if (isNumberDirection) {
        // directions is a number, distance is an object or list
        if (IsPlainObject(distance)) {
          var endIdx = GetValue$c(distance, 'end', 1);
          var startIdx = GetValue$c(distance, 'start', endIdx > 0 ? 1 : -1);
          var step = GetValue$c(distance, 'step', endIdx >= startIdx ? 1 : -1);
          if (startIdx === endIdx) {
            resultTileXY = this.getTileXYAtDirection(srcTileXY, directions, endIdx); // Return a single tileXY
            if (resultTileXY !== null) {
              out.push(resultTileXY);
            }
          } else if (startIdx < endIdx) {
            for (var i = startIdx; i <= endIdx; i += step) {
              resultTileXY = this.getTileXYAtDirection(srcTileXY, directions, i); // Return a single tileXY
              if (resultTileXY !== null) {
                out.push(resultTileXY);
              }
            }
          } else {
            for (var i = startIdx; i >= endIdx; i += step) {
              resultTileXY = this.getTileXYAtDirection(srcTileXY, directions, i); // Return a single tileXY
              if (resultTileXY !== null) {
                out.push(resultTileXY);
              }
            }
          }
        } else {
          // Is array
          for (var i = 0, cnt = distance.length; i < cnt; i++) {
            resultTileXY = this.getTileXYAtDirection(srcTileXY, directions, distance[i]);
            if (resultTileXY !== null) {
              out.push(resultTileXY);
            }
          }
        }
      } else {
        // directions is a list
        for (var i = 0, cnt = directions.length; i < cnt; i++) {
          if (isNumberDistance) {
            // return a single tileXY
            resultTileXY = this.getTileXYAtDirection(srcTileXY, directions[i], distance);
            if (resultTileXY !== null) {
              out.push(resultTileXY);
            }
          } else {
            // append an array of tileXY
            this.getTileXYAtDirection(srcTileXY, directions[i], distance, out);
          }
        }
      }
    }
    return out;
  };

  var GetNeighborTileXY$2 = function GetNeighborTileXY(srcTileXY, directions, out) {
    return this.getTileXYAtDirection(srcTileXY, directions, 1, out);
  };

  var GetNeighborTileXYAtAngle = function GetNeighborTileXYAtAngle(srcTileXY, angle, out) {
    var direction = this.angleSnapToDirection(srcTileXY, angle);
    return this.getTileXYAtDirection(srcTileXY, direction, 1, out);
  };

  var GetNeighborChess = function GetNeighborChess(tileXYZ, directions, neighborTileZ, out) {
    var tileXYZ = this.chessToTileXYZ(tileXYZ);
    if (tileXYZ === null) {
      return null;
    }
    if (neighborTileZ == null) {
      neighborTileZ = tileXYZ.z;
    }
    var typeOfDirection = _typeof(directions);
    if (typeOfDirection === 'number' || typeOfDirection === 'string' && directions.indexOf(',') === -1) {
      // 1 direction
      var dir = directions;
      var neighborTileXY = this.getNeighborTileXY(tileXYZ, dir, true);
      if (neighborTileXY === null) {
        return null;
      }
      return this.tileXYZToChess(neighborTileXY.x, neighborTileXY.y, neighborTileZ);
    } else {
      // directions array
      if (out === undefined) {
        out = [];
      }
      this.getNeighborTileXY(tileXYZ, directions, globTileXYArray);
      var neighborChess;
      for (var i = 0, cnt = globTileXYArray.length; i < cnt; i++) {
        neighborChess = this.tileXYZToChess(globTileXYArray[i].x, globTileXYArray[i].y, neighborTileZ);
        if (neighborChess == null) {
          continue;
        }
        out.push(neighborChess);
      }
      globTileXYArray.length = 0;
      return out;
    }
  };
  var globTileXYArray = [];

  var GetNeighborTileDirection$2 = function GetNeighborTileDirection(srcTileXY, neighborTileXY) {
    if (srcTileXY === null || neighborTileXY === null) {
      return null;
    }
    srcTileXY = this.chessToTileXYZ(srcTileXY);
    neighborTileXY = this.chessToTileXYZ(neighborTileXY);
    if (AreTileXYEqual(srcTileXY, neighborTileXY)) {
      return null;
    }
    var direction = this.grid.getNeighborTileDirection(srcTileXY, neighborTileXY);
    if (this.wrapMode && direction === null) {
      globNeighborTileXYArray = this.getNeighborTileXY(srcTileXY, null, globNeighborTileXYArray);
      for (var i = 0, cnt = globNeighborTileXYArray.length; i < cnt; i++) {
        if (AreTileXYEqual(neighborTileXY, globNeighborTileXYArray[i])) {
          direction = i;
          break;
        }
      }
      globNeighborTileXYArray.length = 0;
    }
    return direction;
  };
  var globNeighborTileXYArray = [];

  var GetNeighborChessDirection = function GetNeighborChessDirection(chess, neighborChess) {
    var srcTileXYZ = this.chessToTileXYZ(chess);
    var neighborTileXYZ = this.chessToTileXYZ(neighborChess);
    return this.getNeighborTileDirection(srcTileXYZ, neighborTileXYZ);
  };

  var AreNeighbors = function AreNeighbors(chessA, chessB) {
    return this.getNeighborChessDirection(chessA, chessB) !== null;
  };

  var MapNeighbors = function MapNeighbors(chess, distance, callback, scope) {
    if (typeof distance !== 'number') {
      scope = callback;
      callback = distance;
      distance = 1;
    }
    var tileXYArray = this.getTileXYAtDirection(chess, undefined, distance);
    // Array of {x,y,direction}
    return tileXYArray.map(callback, scope);
  };

  var RingToTileXYArray$2 = function RingToTileXYArray(centerTileXY, radius, out) {
    if (out === undefined) {
      out = [];
    }
    centerTileXY = this.chessToTileXYZ(centerTileXY);
    this.grid.ringToTileXYArray(centerTileXY, radius, globTileArray$1);
    var tileXY;
    for (var i = 0, cnt = globTileArray$1.length; i < cnt; i++) {
      tileXY = globTileArray$1[i];
      if (this.contains(tileXY.x, tileXY.y)) {
        out.push(tileXY);
      }
    }
    globTileArray$1.length = 0;
    return out;
  };
  var globTileArray$1 = [];

  var RingToChessArray = function RingToChessArray(centerTileXY, radius, tileZ, out) {
    if (Array.isArray(tileZ)) {
      out = tileZ;
      tileZ = undefined;
    }
    if (out === undefined) {
      out = [];
    }
    centerTileXY = this.chessToTileXYZ(centerTileXY);
    this.grid.ringToTileXYArray(centerTileXY, radius, globTileArray);
    var tileXY, chess;
    for (var i = 0, cnt = globTileArray.length; i < cnt; i++) {
      tileXY = globTileArray[i];
      chess = this.tileXYZToChess(tileXY.x, tileXY.y, tileZ);
      if (chess) {
        out.push(chess);
      }
    }
    globTileArray.length = 0;
    return out;
  };
  var globTileArray = [];

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var FilledRingToTileXYArray = function FilledRingToTileXYArray(centerTileXY, radius, nearToFar, out) {
    if (IsArray(nearToFar)) {
      out = nearToFar;
      nearToFar = undefined;
    }
    if (nearToFar === undefined) {
      nearToFar = true;
    }
    if (out === undefined) {
      out = [];
    }
    centerTileXY = this.chessToTileXYZ(centerTileXY);
    var level;
    for (var i = 0; i <= radius; i++) {
      level = nearToFar ? i : radius - i;
      this.ringToTileXYArray(centerTileXY, level, out);
    }
    return out;
  };

  var FilledRingToChessArray = function FilledRingToChessArray(centerTileXY, radius, tileZ, nearToFar, out) {
    if (IsArray(nearToFar)) {
      out = nearToFar;
      nearToFar = undefined;
    }
    if (nearToFar === undefined) {
      nearToFar = true;
    }
    if (out === undefined) {
      out = [];
    }
    centerTileXY = this.chessToTileXYZ(centerTileXY);
    var level;
    for (var i = 0; i <= radius; i++) {
      level = nearToFar ? i : radius - i;
      this.ringToChessArray(centerTileXY, level, tileZ, out);
    }
    return out;
  };

  var HasBlocker = function HasBlocker(tileX, tileY, tileZ) {
    if (tileX && typeof tileX !== 'number') {
      var tileXYZ = this.chessToTileXYZ(tileX); // tileX is a Chess or TileXY
      tileX = tileXYZ.x;
      tileY = tileXYZ.y;
      tileZ = tileXYZ.z;
    }
    var chess, blocker;
    if (tileZ === undefined) {
      // any chess at (tileX, tileY) has blocker
      chess = this.tileXYToChessArray(tileX, tileY, globChessArray$5);
      for (var i = 0, cnt = chess.length; i < cnt; i++) {
        blocker = this.getChessData(chess[i]).blocker;
        if (blocker === true) {
          globChessArray$5.length = 0;
          return true;
        }
      }
      globChessArray$5.length = 0;
      return false;
    } else {
      // chess at (tileX, tileY, tileZ) has blocker
      var chess = this.tileXYZToChess(tileX, tileY, tileZ);
      if (chess === null) {
        return false;
      }
      blocker = this.getChessData(chess).blocker;
      return blocker === true;
    }
  };
  var globChessArray$5 = [];

  var HasEdgeBlocker = function HasEdgeBlocker(tileX, tileY, tileZ, direction) {
    var chess;
    if (tileZ === undefined) {
      // any chess at (tileX, tileY) has blocker
      chess = this.tileXYToChessArray(tileX, tileY, globChessArray$4);
      for (var i = 0, cnt = chess.length; i < cnt; i++) {
        if (isEdgeBlocker(this.getChessData(chess[i]).blocker)) {
          globChessArray$4.length = 0;
          return true;
        }
      }
      globChessArray$4.length = 0;
      return false;
    } else {
      // chess at (tileX, tileY, tileZ) has blocker
      var chess = this.tileXYZToChess(tileX, tileY, tileZ);
      if (chess === null) {
        return false;
      }
      return isEdgeBlocker(this.getChessData(chess).blocker);
    }
  };
  var isEdgeBlocker = function isEdgeBlocker(blocker, direction) {
    if (blocker === false || blocker === true) {
      return blocker;
    } else {
      return blocker[direction] === true;
    }
  };
  var globChessArray$4 = [];

  var GetBoard = function GetBoard(chess) {
    if (!chess) {
      return undefined;
    } else if (chess.rexChess) {
      // Chess game object
      return chess.rexChess.board;
    } else if (chess.mainBoard) {
      // Mini-board
      return chess.mainBoard;
    } else {
      return undefined;
    }
  };

  var LogicMethods = _defineProperty(_defineProperty({
    getChessData: GetChessData,
    getChessUID: GetChessUID,
    setBoardWidth: SetBoardWidth,
    setBoardHeight: SetBoardHeight,
    tileXYZToKey: TileXYZToKey,
    tileXYToKey: TileXYToKey,
    keyToTileXYZ: KeyToTileXYZ,
    tileXYToWorldX: TileXYToWorldX,
    tileXYToWorldY: TileXYToWorldY,
    tileXYToWorldXY: TileXYToWorldXY,
    tileXYArrayToWorldXYArray: TileXYArrayToWorldXYArray,
    worldXYToTileX: WorldXYToTileX,
    worldXYToTileY: WorldXYToTileY,
    worldXYToTileXY: WorldXYToTileXY,
    worldXYToChessArray: WorldXYToChessArray,
    worldXYToChess: WorldXYToChess,
    worldXYSnapToGrid: WorldXYSnapToGrid,
    angleBetween: AngleBetween$2,
    isAngleInCone: IsAngleInCone,
    angleToward: AngleToward,
    angleSnapToDirection: AngleSnapToDirection,
    isOverlappingPoint: IsOverlappingPoint,
    gridAlign: GridAlign,
    getGridPoints: GetGridPoints$2,
    getGridBounds: GetGridBounds,
    getBoardBounds: GetBoardBounds,
    lineToTileXYArray: LineToTileXYArray,
    circleToTileXYArray: CircleToTileXYArray,
    ellipseToTileXYArray: EllipseToTileXYArray,
    polygonToTileXYArray: PolygonToTileXYArray,
    rectangleToTileXYArray: RectangleToTileXYArray,
    triangleToTileXYArray: TriangleToTileXYArray,
    shapeToTileXYArray: ShapeToTileXYArray,
    forEachTileXYInShape: ForEachTileXYInShape,
    uidToChess: UidToChess,
    addChess: AddChess$1,
    removeChess: RemoveChess$1,
    removeAllChess: RemoveAllChess$1,
    swapChess: SwapChess,
    moveChess: AddChess$1,
    setChessTileZ: SetChessTileZ,
    getAllChess: GetAllChess,
    contains: Contains,
    forEachTileXY: ForEachTileXY,
    getWrapTileXY: GetWrapTileXY,
    tileXYZToChess: TileXYZToChess,
    tileXYToChessArray: TileXYToChessArray,
    tileZToChessArray: TileZToChessArray,
    tileXYArrayToChessArray: TileXYArrayToChessArray,
    chessToTileXYZ: ChessToTileXYZ,
    offset: Offset$3,
    mirror: Mirror$4,
    rotate: Rotate$4,
    getOppositeDirection: GetOppositeDirection$2,
    getDistance: GetDistance$2,
    directionBetween: DirectionBetween$2,
    isDirectionInCone: IsDirectionInCone,
    fit: Fit,
    isEmptyTileXYZ: IsEmptyTileXYZ,
    getEmptyTileXYArray: GetEmptyTileXYArray,
    getRandomEmptyTileXY: GetRandomEmptyTileXY,
    getEmptyTileXYArrayInRange: GetEmptyTileXYArrayInRange,
    getRandomEmptyTileXYInRange: GetRandomEmptyTileXYInRange,
    getTileXYAtDirection: GetTileXYAtDirection,
    getNeighborTileXY: GetNeighborTileXY$2,
    getNeighborTileXYAtAngle: GetNeighborTileXYAtAngle,
    getNeighborChess: GetNeighborChess,
    getNeighborTileDirection: GetNeighborTileDirection$2,
    getNeighborChessDirection: GetNeighborChessDirection,
    areNeighbors: AreNeighbors,
    mapNeighbors: MapNeighbors,
    ringToTileXYArray: RingToTileXYArray$2,
    ringToChessArray: RingToChessArray,
    filledRingToTileXYArray: FilledRingToTileXYArray,
    filledRingToChessArray: FilledRingToChessArray,
    hasBlocker: HasBlocker,
    hasEdgeBlocker: HasEdgeBlocker
  }, "getGridPoints", GetGridPoints$2), "chessToBoard", GetBoard);

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

  var IsEmpty = function IsEmpty(source) {
    for (var k in source) {
      return false;
    }
    return true;
  };

  var BoardData = /*#__PURE__*/function () {
    function BoardData() {
      _classCallCheck(this, BoardData);
      this.XYZToUID = {}; // [x][y][z] : uid
      this.UIDToXYZ = {}; // uid : xyz
      this.clear();
    }
    _createClass(BoardData, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        this.XYZToUID = undefined;
        this.UIDToXYZ = undefined;
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        Clear(this.UIDToXYZ);
        Clear(this.XYZToUID);
        this.chessCount = 0;
        this.clearBounds();
        return this;
      }
    }, {
      key: "clearBounds",
      value: function clearBounds() {
        this._xMax = undefined;
        this._xMin = undefined;
        this._yMax = undefined;
        this._yMin = undefined;
        return this;
      }
    }, {
      key: "addUID",
      value: function addUID(uid, x, y, z) {
        if (!this.XYZToUID.hasOwnProperty(x)) {
          this.XYZToUID[x] = {};
        }
        var tmpx = this.XYZToUID[x];
        if (!tmpx.hasOwnProperty(y)) {
          tmpx[y] = {};
        }
        var tmpy = tmpx[y];
        tmpy[z] = uid;
        this.UIDToXYZ[uid] = {
          x: x,
          y: y,
          z: z
        };
        this.chessCount++;
        this.clearBounds();
        return this;
      }
    }, {
      key: "getUID",
      value: function getUID(x, y, z) {
        // (x,y,z) -> uid
        // (x,y) -> zHash = {z:uid}
        var tmp = this.XYZToUID[x];
        if (tmp) {
          tmp = tmp[y];
          if (tmp) {
            if (z !== undefined) {
              tmp = tmp[z];
            }
          }
        }
        return tmp;
      }
    }, {
      key: "removeUID",
      value: function removeUID(x, y, z) {
        if (!this.XYZToUID.hasOwnProperty(x)) {
          return this;
        }
        var tmpx = this.XYZToUID[x];
        if (!tmpx.hasOwnProperty(y)) {
          return this;
        }
        var tmpy = tmpx[y];
        if (!tmpy.hasOwnProperty(z)) {
          return this;
        }
        var uid = tmpy[z];
        delete tmpy[z];
        delete this.UIDToXYZ[uid];
        if (IsEmpty(tmpy)) {
          delete tmpx[y];
        }
        if (IsEmpty(tmpx)) {
          delete this.XYZToUID[x];
        }
        this.chessCount--;
        this.clearBounds();
        return this;
      }
    }, {
      key: "exists",
      value: function exists(uid) {
        return this.UIDToXYZ.hasOwnProperty(uid);
      }
    }, {
      key: "contains",
      value: function contains(x, y, z) {
        return this.getUID(x, y, z) != null;
      }
    }, {
      key: "getXYZ",
      value: function getXYZ(uid) {
        if (this.exists(uid)) {
          return this.UIDToXYZ[uid];
        }
        return null;
      }
    }, {
      key: "xMax",
      get: function get() {
        if (this._xMax === undefined) {
          this._xMax = -Infinity;
          var UIDToXYZ = this.UIDToXYZ,
            x;
          for (var uid in UIDToXYZ) {
            x = UIDToXYZ[uid].x;
            if (this._xMax < x) {
              this._xMax = x;
            }
          }
        }
        return this._xMax;
      }
    }, {
      key: "xMin",
      get: function get() {
        if (this._xMin === undefined) {
          this._xMin = Infinity;
          var UIDToXYZ = this.UIDToXYZ,
            x;
          for (var uid in UIDToXYZ) {
            x = UIDToXYZ[uid].x;
            if (this._xMin > x) {
              this._xMin = x;
            }
          }
        }
        return this._xMin;
      }
    }, {
      key: "yMax",
      get: function get() {
        if (this._yMax === undefined) {
          this._yMax = -Infinity;
          var UIDToXYZ = this.UIDToXYZ,
            y;
          for (var uid in UIDToXYZ) {
            y = UIDToXYZ[uid].y;
            if (this._yMax < y) {
              this._yMax = y;
            }
          }
        }
        return this._yMax;
      }
    }, {
      key: "yMin",
      get: function get() {
        if (this._yMin === undefined) {
          this._yMin = Infinity;
          var UIDToXYZ = this.UIDToXYZ,
            y;
          for (var uid in UIDToXYZ) {
            y = UIDToXYZ[uid].y;
            if (this._yMin > y) {
              this._yMin = y;
            }
          }
        }
        return this._yMin;
      }
    }]);
    return BoardData;
  }();

  var GetWorldX$2 = function GetWorldX(tileX, tileY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globWorldXY$3;
    }
    var worldX, worldY;
    switch (this.mode) {
      case 0:
        // orthogonal
        worldX = tileX * this.width;
        worldY = tileY * this.height;
        break;
      case 1:
        // isometric
        worldX = (tileX - tileY) * this._halfWidth;
        worldY = (tileX + tileY) * this._halfHeight;
        break;
    }
    worldX += this.x;
    worldY += this.y;
    out.x = worldX;
    out.y = worldY;
    return out;
  };
  var globWorldXY$3 = {};

  var GetWorldX$1 = function GetWorldX(tileX, tileY) {
    return this.getWorldXY(tileX, tileY, true).x;
  };

  var GetWorldY$1 = function GetWorldY(tileX, tileY) {
    return this.getWorldXY(tileX, tileY, true).y;
  };

  var GetTileXY$1 = function GetTileXY(worldX, worldY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$a;
    }
    worldX -= this.x;
    worldY -= this.y;
    var tmpx = worldX / this.width;
    var tmpy = worldY / this.height;
    switch (this.mode) {
      case 0:
        // orthogonal
        out.x = Math.round(tmpx);
        out.y = Math.round(tmpy);
        break;
      case 1:
        // isometric            
        out.x = Math.round(+tmpx + tmpy);
        out.y = Math.round(-tmpx + tmpy);
        break;
    }
    return out;
  };
  var globTileXY$a = {};

  var GetTileX$1 = function GetTileX(worldX, worldY) {
    return this.getTileXY(worldX, worldY, true).x;
  };

  var GetTileY$1 = function GetTileY(worldX, worldY) {
    return this.getTileXY(worldX, worldY, true).y;
  };

  var Quad = /*#__PURE__*/function () {
    function Quad(config) {
      _classCallCheck(this, Quad);
      this.resetFromJSON(config);
    }
    _createClass(Quad, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setType(GetValue$c(o, 'type', 0));
        this.setDirectionMode(GetValue$c(o, 'dir', 4));
        this.setOriginPosition(GetValue$c(o, 'x', 0), GetValue$c(o, 'y', 0));
        this.setCellSize(GetValue$c(o, 'cellWidth', 0), GetValue$c(o, 'cellHeight', 0));
      }
    }, {
      key: "setType",
      value: function setType(type) {
        if (typeof type === 'string') {
          type = ORIENTATIONTYPE[type];
        }
        this.mode = type; // orthogonal, isometric, or staggered
        return this;
      }
    }, {
      key: "setDirectionMode",
      value: function setDirectionMode(mode) {
        if (typeof mode === 'string') {
          mode = DIRMODE$1[mode];
        }
        this.directions = mode;
        return this;
      }
    }, {
      key: "setOriginPosition",
      value: function setOriginPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this._width = value;
        this._halfWidth = value / 2;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this._height = value;
        this._halfHeight = value / 2;
      }
    }, {
      key: "setCellSize",
      value: function setCellSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "cellWidth",
      get: function get() {
        return this.width;
      },
      set: function set(value) {
        this.width = value;
      }
    }, {
      key: "cellHeight",
      get: function get() {
        return this.height;
      },
      set: function set(value) {
        this.height = value;
      }
    }]);
    return Quad;
  }();
  var methods$6 = {
    getWorldXY: GetWorldX$2,
    getWorldX: GetWorldX$1,
    getWorldY: GetWorldY$1,
    getTileXY: GetTileXY$1,
    getTileX: GetTileX$1,
    getTileY: GetTileY$1
  };
  Object.assign(Quad.prototype, methods$6);
  var ORIENTATIONTYPE = {
    'orthogonal': 0,
    'isometric': 1,
    'staggered': 2
  };
  var DIRMODE$1 = {
    '4dir': 4,
    '8dir': 8
  };

  var SaveOrigin = function SaveOrigin() {
    this._savedOriginX = this.x;
    this._savedOriginY = this.y;
    return this;
  };

  var RestoreOrigin = function RestoreOrigin() {
    this.x = this._savedOriginX;
    this.y = this._savedOriginY;
    return this;
  };

  // orthogonal or isometric
  var OrthogonalMap = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]];
  var IsometricMap = OrthogonalMap;

  var GetTileXAtDirection$1 = function GetTileXAtDirection(tileX, tileY, direction, distance, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$9;
    }
    var deltaTileX, deltaTileY;
    switch (this.mode) {
      case 0:
        // orthogonal
        deltaTileX = OrthogonalMap[direction][0];
        deltaTileY = OrthogonalMap[direction][1];
        break;
      case 1:
        // isometric
        deltaTileX = IsometricMap[direction][0];
        deltaTileY = IsometricMap[direction][1];
        break;
    }
    out.x = tileX + distance * deltaTileX;
    out.y = tileY + distance * deltaTileY;
    return out;
  };
  var globTileXY$9 = {};

  var GetNeighborTileXY$1 = function GetNeighborTileXY(tileX, tileY, direction, out) {
    return GetTileXAtDirection$1.call(this, tileX, tileY, direction, 1, out);
  };

  // Not included in Base Gird object.
  // Delta tileXY to direction

  var ReverseDirMap$1 = function ReverseDirMap(dirMap) {
    var out = {},
      entry,
      x,
      y;
    for (var dir in dirMap) {
      entry = dirMap[dir]; // [x, y]
      x = entry[0];
      y = entry[1];
      if (!out.hasOwnProperty(x)) {
        out[x] = {};
      }
      out[x][y] = parseInt(dir);
    }
    return out;
  };
  var OrthogonalMapOut = ReverseDirMap$1(OrthogonalMap);
  var IsometricMapOut = OrthogonalMapOut;

  var GetNeighborTileDirection$1 = function GetNeighborTileDirection(srcTileXY, neighborTileXY) {
    var deltaTileXYToDirMap;
    switch (this.mode) {
      case 0:
        // orthogonal
        deltaTileXYToDirMap = OrthogonalMapOut;
        break;
      case 1:
        // isometric
        deltaTileXYToDirMap = IsometricMapOut;
        break;
    }
    var deltaTileX = neighborTileXY.x - srcTileXY.x;
    var deltaTileY = neighborTileXY.y - srcTileXY.y;
    if (deltaTileXYToDirMap.hasOwnProperty(deltaTileX)) {
      var xEntry = deltaTileXYToDirMap[deltaTileX];
      if (xEntry.hasOwnProperty(deltaTileY)) {
        return xEntry[deltaTileY];
      }
    }
    return null;
  };

  var GetOppositeDirection$1 = function GetOppositeDirection(tileX, tileY, direction) {
    return oppositeDirectionMap[direction];
  };
  var oppositeDirectionMap = {
    0: 2,
    // Left
    1: 3,
    // Down
    2: 0,
    // Right
    3: 1,
    // Up
    4: 6,
    // Left-down
    5: 7,
    // Down-right
    6: 4,
    // Right-up
    7: 5 // Up-left
  };

  var Offset$2 = function Offset(srcTile, offsetTileX, offsetTileY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$8;
    }
    var newTileX = srcTile.x + offsetTileX;
    var newTileY = srcTile.y + offsetTileY;
    // TODO: staggered?
    out.x = newTileX;
    out.y = newTileY;
    return out;
  };
  var globTileXY$8 = {};

  var Mirror$3 = function Mirror(src, mode, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$7;
    }
    out.x = mode & 1 ? -src.x : src.x;
    out.y = mode & 2 ? -src.y : src.y;
    return out;
  };
  var globTileXY$7 = {};

  var Rotate$3 = function Rotate(src, dir, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$6;
    }
    dir = Wrap(dir, 0, 3);
    var newTileX;
    var newTileY;
    switch (dir) {
      case 1:
        newTileX = -src.y;
        newTileY = src.x;
        break;
      case 2:
        newTileX = -src.x;
        newTileY = -src.y;
        break;
      case 3:
        newTileX = src.y;
        newTileY = -src.x;
        break;
      default:
        newTileX = src.x;
        newTileY = src.y;
        break;
    }
    // TODO: staggered?
    out.x = newTileX;
    out.y = newTileY;
    return out;
  };
  var globTileXY$6 = {};

  var GetDistance$1 = function GetDistance(tileA, tileB, roughMode) {
    var dx = tileB.x - tileA.x;
    var dy = tileB.y - tileA.y;
    var dist;
    if (roughMode) {
      dist = Math.abs(dx) + Math.abs(dy);
    } else {
      dist = Math.sqrt(dx * dx + dy * dy);
    }
    return dist;
  };

  var DirectionBetween$1 = function DirectionBetween(tileA, tileB, round) {
    if (round === undefined) {
      round = true;
    }
    var direction;
    switch (this.mode) {
      case 0: // orthogonal
      case 1:
        // isometric
        if (tileA.y === tileB.y) {
          direction = tileB.x >= tileA.x ? 0 : 2;
        } else if (tileA.x === tileB.x) {
          direction = tileB.y >= tileA.y ? 1 : 3;
        } else if (this.directions === 4) {
          var angle = RadToDeg$2(Between$1(tileA.x, tileA.y, tileB.x, tileB.y)); // -180~180
          if (angle < 0) {
            angle += 360;
          }
          direction = angle / 90;
          if (round) {
            direction = Math.round(direction);
          }
        } else {
          // this.directions === 8
          var dx = tileB.x - tileA.x;
          var dy = tileB.y - tileA.y;
          if (dx === dy) {
            direction = dx > 0 ? 4 : 6;
          } else if (dx === -dy) {
            direction = dx > 0 ? 7 : 5;
          } else {
            var angle = RadToDeg$2(Math.atan2(dy, dx));
            if (angle < 0) {
              angle += 360;
            }
            var steps = angle / 45;
            if (round) {
              steps = Math.round(steps);
            }
            if (steps >= 0 && steps < 1) {
              direction = steps; // (steps - 0) + 0
            } else if (steps >= 1 && steps < 2) {
              direction = steps + 3; // (steps - 1) + 4
            } else if (steps >= 2 && steps < 3) {
              direction = steps - 1; // (steps - 2) + 1
            } else if (steps >= 3 && steps < 4) {
              direction = steps + 2; // (steps - 3) + 5
            } else if (steps >= 4 && steps < 5) {
              direction = steps - 2; // (steps - 4) + 2
            } else if (steps >= 5 && steps < 6) {
              direction = steps + 1; // (steps - 5) + 6
            } else if (steps >= 6 && steps < 7) {
              direction = steps - 3; // (steps - 6) + 3
            } else {
              // if ((steps >= 7) && (steps < 8))
              direction = steps; // (steps - 7) + 7
            }
          }
        }
        break;
    }
    if (direction === this.directions) {
      direction = 0;
    }
    return direction;
  };

  var DirectionNormalize = function DirectionNormalize(direction) {
    return Wrap(direction, 0, this.directions);
  };

  var InitPoints = function InitPoints(count) {
    var points = [];
    for (var i = 0; i < count; i++) {
      points.push({
        x: 0,
        y: 0
      });
    }
    return points;
  };

  var SetPoints$1 = function SetPoints(x, y, width, height, type, points) {
    if (points === undefined) {
      points = InitPoints(4);
    }
    var halfW = width / 2;
    var halfH = height / 2;
    if (type === 0) {
      // rectangle
      // top-right
      points[0].x = x + halfW;
      points[0].y = y - halfH;
      // bottom-right
      points[1].x = x + halfW;
      points[1].y = y + halfH;
      // bottom-left
      points[2].x = x - halfW;
      points[2].y = y + halfH;
      // top-left
      points[3].x = x - halfW;
      points[3].y = y - halfH;
    } else {
      // rhombus
      // 0
      points[0].x = x + halfW;
      points[0].y = y;
      // 90
      points[1].x = x;
      points[1].y = y + halfH;
      // 180
      points[2].x = x - halfW;
      points[2].y = y;
      // 270
      points[3].x = x;
      points[3].y = y - halfH;
    }
    return points;
  };

  var GetGridPoints$1 = function GetGridPoints(tileX, tileY, points) {
    if (points === undefined) {
      points = InitPoints(4);
    } else if (points === true) {
      points = globPoints$1;
    }
    if (tileX === undefined) {
      globWorldXY$2.x = 0;
      globWorldXY$2.y = 0;
    } else {
      this.getWorldXY(tileX, tileY, globWorldXY$2);
    }
    var quadType = this.mode === 0 ? 0 : 1;
    SetPoints$1(globWorldXY$2.x, globWorldXY$2.y, this.width, this.height, quadType, points);
    return points;
  };
  var globWorldXY$2 = {};
  var globPoints$1 = InitPoints(4);

  var GetBounds$3 = function GetBounds(tileX, tileY, out) {
    if (out === undefined) {
      out = new Rectangle$2();
    } else if (out === true) {
      out = globalBounds$1;
    }
    var worldXY = this.getWorldXY(tileX, tileY, true);
    out.x = worldXY.x - this.width * 0.5;
    out.y = worldXY.y - this.height * 0.5;
    out.width = this.width;
    out.height = this.height;
    return out;
  };
  var globalBounds$1 = new Rectangle$2();

  var RingToTileXYArray$1 = function RingToTileXYArray(centerTileXY, radius, out) {
    if (out === undefined) {
      out = [];
    }
    var i, j;
    // Top-right to bottom-right
    i = radius;
    for (j = -radius; j <= radius; j++) {
      out.push(Offset$2(centerTileXY, i, j));
    }
    // Bottom-right to bottom-left
    j = radius;
    for (i = radius - 1; i >= -radius; i--) {
      out.push(Offset$2(centerTileXY, i, j));
    }
    // Bottom-left to top-left
    i = -radius;
    for (j = radius - 1; j >= -radius; j--) {
      out.push(Offset$2(centerTileXY, i, j));
    }
    // Top-left to top-right
    j = -radius;
    for (i = -radius + 1; i <= radius - 1; i++) {
      out.push(Offset$2(centerTileXY, i, j));
    }
    return out;
  };

  var QuadGrid = /*#__PURE__*/function (_Quad) {
    _inherits(QuadGrid, _Quad);
    function QuadGrid(config) {
      var _this;
      _classCallCheck(this, QuadGrid);
      _this = _callSuper(this, QuadGrid, [config]);
      _this.sides = 4;
      return _this;
    }

    // resetFromJSON(o) {
    //     super.resetFromJSON(o);
    // }

    // Direction of neighbors
    _createClass(QuadGrid, [{
      key: "allDirections",
      get: function get() {
        return this.directions === 4 ? ALLDIR4 : ALLDIR8;
      }

      // Board-match
    }, {
      key: "halfDirections",
      get: function get() {
        return this.directions === 4 ? HALFDIR4 : HALFDIR8;
      }

      // setOriginPosition
      // setCellSize
      // setType
      // getWorldXY
      // getTileXY
      // getGridPolygon        
    }]);
    return QuadGrid;
  }(Quad);
  var ALLDIR4 = [0, 1, 2, 3];
  var ALLDIR8 = [0, 1, 2, 3, 4, 5, 6, 7];
  var HALFDIR4 = [0, 1];
  var HALFDIR8 = [0, 1, 4, 5];
  var methods$5 = {
    saveOrigin: SaveOrigin,
    restoreOrigin: RestoreOrigin,
    getTileXYAtDirection: GetTileXAtDirection$1,
    getNeighborTileXY: GetNeighborTileXY$1,
    getNeighborTileDirection: GetNeighborTileDirection$1,
    getOppositeDirection: GetOppositeDirection$1,
    offset: Offset$2,
    mirror: Mirror$3,
    rotate: Rotate$3,
    getDistance: GetDistance$1,
    directionBetween: DirectionBetween$1,
    directionNormalize: DirectionNormalize,
    getGridPoints: GetGridPoints$1,
    getBounds: GetBounds$3,
    ringToTileXYArray: RingToTileXYArray$1
  };
  Object.assign(QuadGrid.prototype, methods$5);

  var SQRT3$1 = Math.sqrt(3);
  var Width = function Width(hexagon) {
    return hexagon.type === 0 ? 2 * hexagon.size : SQRT3$1 * hexagon.size;
  };

  var SQRT3 = Math.sqrt(3);
  var Height = function Height(hexagon) {
    return hexagon.type === 0 ? SQRT3 * hexagon.size : 2 * hexagon.size;
  };

  var CONST$3 = {
    ODD_R: 0,
    EVEN_R: 1,
    ODD_Q: 2,
    EVEN_Q: 3
  };

  var ODD_R$7 = CONST$3.ODD_R;
  var EVEN_R$7 = CONST$3.EVEN_R;
  var ODD_Q$6 = CONST$3.ODD_Q;
  var EVEN_Q$6 = CONST$3.EVEN_Q;
  var GetWorldXY = function GetWorldXY(tileX, tileY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globWorldXY$1;
    }
    var worldX = tileX * this.width;
    var worldY = tileY * this.height;
    switch (this.mode) {
      case ODD_R$7:
        if (tileY & 1) {
          worldX += this._halfWidth;
        }
        worldY *= 0.75;
        break;
      case EVEN_R$7:
        if (tileY & 1) {
          worldX -= this._halfWidth;
        }
        worldY *= 0.75;
        break;
      case ODD_Q$6:
        worldX *= 0.75;
        if (tileX & 1) {
          worldY += this._halfHeight;
        }
        break;
      case EVEN_Q$6:
        worldX *= 0.75;
        if (tileX & 1) {
          worldY -= this._halfHeight;
        }
        break;
    }
    worldX += this.x;
    worldY += this.y;
    out.x = worldX;
    out.y = worldY;
    return out;
  };
  var globWorldXY$1 = {};

  var GetWorldX = function GetWorldX(tileX, tileY) {
    return this.getWorldXY(tileX, tileY, true).x;
  };

  var GetWorldY = function GetWorldY(tileX, tileY) {
    return this.getWorldXY(tileX, tileY, true).y;
  };

  var ODD_R$6 = CONST$3.ODD_R;
  var EVEN_R$6 = CONST$3.EVEN_R;
  var ODD_Q$5 = CONST$3.ODD_Q;
  var EVEN_Q$5 = CONST$3.EVEN_Q;
  var cr2cube = function cr2cube(mode, col, row, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globCube$1;
    }
    switch (mode) {
      case ODD_R$6:
        out.x = col - (row - (row & 1)) / 2;
        out.z = row;
        break;
      case EVEN_R$6:
        out.x = col - (row + (row & 1)) / 2;
        out.z = row;
        break;
      case ODD_Q$5:
        out.x = col;
        out.z = row - (col - (col & 1)) / 2;
        break;
      case EVEN_Q$5:
        out.x = col;
        out.z = row - (col + (col & 1)) / 2;
        break;
    }
    out.y = -out.x - out.z;
    return out;
  };
  var roundcube = function roundcube(x, y, z, out) {
    if (typeof x !== 'number') {
      out = x;
      x = out.x;
      y = out.y;
      z = out.z;
    }
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globCube$1;
    }
    var rx = Math.round(x);
    var ry = Math.round(y);
    var rz = Math.round(z);
    var dx = Math.abs(rx - x);
    var dy = Math.abs(ry - y);
    var dz = Math.abs(rz - z);
    if (dx > dy && dx > dz) {
      rx = -ry - rz;
    } else if (dy > dz) {
      ry = -rx - rz;
    } else {
      rz = -rx - ry;
    }
    out.x = rx;
    out.y = ry;
    out.z = rz;
    return out;
  };
  var cube2cr = function cube2cr(mode, x, y, z, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globCR;
    }
    switch (mode) {
      case ODD_R$6:
        out.x = x + (z - (z & 1)) / 2;
        out.y = z;
        break;
      case EVEN_R$6:
        out.x = x + (z + (z & 1)) / 2;
        out.y = z;
        break;
      case ODD_Q$5:
        out.x = x;
        out.y = z + (x - (x & 1)) / 2;
        break;
      case EVEN_Q$5:
        out.x = x;
        out.y = z + (x + (x & 1)) / 2;
        break;
    }
    return out;
  };
  var qr2cube = function qr2cube(q, r, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globCube$1;
    }
    out.x = q;
    out.y = -q - r;
    out.z = r;
    return out;
  };
  var globCube$1 = {};
  var globCR = {};

  var ODD_R$5 = CONST$3.ODD_R;
  var EVEN_R$5 = CONST$3.EVEN_R;
  var ODD_Q$4 = CONST$3.ODD_Q;
  var EVEN_Q$4 = CONST$3.EVEN_Q;
  var C4DIV3 = 4 / 3;
  var C2DIV3 = 2 / 3;
  var GetTileXY = function GetTileXY(worldX, worldY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$5;
    }
    worldX -= this.x;
    worldY -= this.y;
    var q, r;
    switch (this.mode) {
      case ODD_R$5:
      case EVEN_R$5:
        r = worldY * C4DIV3 / this.height;
        q = worldX / this.width - C2DIV3 * (worldY / this.height);
        break;
      case ODD_Q$4:
      case EVEN_Q$4:
        r = worldY / this.height - C2DIV3 * (worldX / this.width);
        q = worldX * C4DIV3 / this.width;
        break;
    }
    var cube = qr2cube(q, r, globCube);
    roundcube(cube);
    cube2cr(this.mode, cube.x, cube.y, cube.z, out);
    return out;
  };
  var globCube = {};
  var globTileXY$5 = {};

  var GetTileX = function GetTileX(worldX, worldY) {
    return this.getTileXY(worldX, worldY, true).x;
  };

  var GetTileY = function GetTileY(worldX, worldY) {
    return this.getTileXY(worldX, worldY, true).y;
  };

  var ODD_R$4 = CONST$3.ODD_R;
  var EVEN_R$4 = CONST$3.EVEN_R;
  var ODD_Q$3 = CONST$3.ODD_Q;
  var EVEN_Q$3 = CONST$3.EVEN_Q;
  var Hexagon = /*#__PURE__*/function () {
    function Hexagon(config) {
      _classCallCheck(this, Hexagon);
      this.resetFromJSON(config);
    }
    _createClass(Hexagon, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setType(GetValue$c(o, 'staggeraxis', 1), GetValue$c(o, 'staggerindex', 1));
        this.setDirectionMode();
        this.setOriginPosition(GetValue$c(o, 'x', 0), GetValue$c(o, 'y', 0));
        var size = GetValue$c(o, 'size', undefined);
        if (size !== undefined) {
          this.setCellRadius(size);
        } else {
          this.setCellSize(GetValue$c(o, 'cellWidth', 0), GetValue$c(o, 'cellHeight', 0));
        }
      }
    }, {
      key: "setType",
      value: function setType(staggeraxis, staggerindex) {
        if (typeof staggeraxis === 'string') {
          staggeraxis = STAGGERAXIS[staggeraxis];
        }
        if (typeof staggerindex === 'string') {
          staggerindex = STAGGERINDEX[staggerindex];
        }
        this.staggeraxis = staggeraxis; // 0|y(flat), or 1|x(pointy)
        this.staggerindex = staggerindex; // even, or odd

        if (staggeraxis === 0) {
          // flat
          this.mode = staggerindex === 0 ? EVEN_Q$3 : ODD_Q$3;
        } else {
          // pointy
          this.mode = staggerindex === 0 ? EVEN_R$4 : ODD_R$4;
        }
        return this;
      }
    }, {
      key: "setDirectionMode",
      value: function setDirectionMode() {
        this.directions = 6;
        return this;
      }
    }, {
      key: "setOriginPosition",
      value: function setOriginPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this._width = value;
        this._halfWidth = value / 2;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this._height = value;
        this._halfHeight = value / 2;
      }
    }, {
      key: "setCellSize",
      value: function setCellSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "setCellRadius",
      value: function setCellRadius(size) {
        this.size = size;
        var hexagon = {
          size: this.size,
          type: this.staggeraxis
        };
        var cellWidth = Width(hexagon);
        var cellHeight = Height(hexagon);
        this.setCellSize(cellWidth, cellHeight);
        return this;
      }
    }, {
      key: "cellWidth",
      get: function get() {
        return this.width;
      },
      set: function set(value) {
        this.width = value;
      }
    }, {
      key: "cellHeight",
      get: function get() {
        return this.height;
      },
      set: function set(value) {
        this.height = value;
      }
    }]);
    return Hexagon;
  }();
  var methods$4 = {
    getWorldXY: GetWorldXY,
    getWorldX: GetWorldX,
    getWorldY: GetWorldY,
    getTileXY: GetTileXY,
    getTileX: GetTileX,
    getTileY: GetTileY
  };
  Object.assign(Hexagon.prototype, methods$4);
  var STAGGERAXIS = {
    'y': 0,
    'x': 1
  };
  var STAGGERINDEX = {
    'even': 0,
    'odd': 1
  };

  // Not included in Base Gird object.
  // Direction to delta tileXY

  var ODD_R$3 = [[[+1, 0], [0, +1], [-1, +1], [-1, 0], [-1, -1], [0, -1]], [[+1, 0], [+1, +1], [0, +1], [-1, 0], [0, -1], [+1, -1]]];
  var EVEN_R$3 = [[[+1, 0], [+1, +1], [0, +1], [-1, 0], [0, -1], [+1, -1]], [[+1, 0], [0, +1], [-1, +1], [-1, 0], [-1, -1], [0, -1]]];
  var ODD_Q$2 = [[[+1, 0], [0, +1], [-1, 0], [-1, -1], [0, -1], [+1, -1]], [[+1, +1], [0, +1], [-1, +1], [-1, 0], [0, -1], [+1, 0]]];
  var EVEN_Q$2 = [[[+1, +1], [0, +1], [-1, +1], [-1, 0], [0, -1], [+1, 0]], [[+1, 0], [0, +1], [-1, 0], [-1, -1], [0, -1], [+1, -1]]];
  var Neighbors$1 = [ODD_R$3, EVEN_R$3, ODD_Q$2, EVEN_Q$2];

  var ODD_R$2 = CONST$3.ODD_R;
  var EVEN_R$2 = CONST$3.EVEN_R;
  var ODD_Q$1 = CONST$3.ODD_Q;
  var EVEN_Q$1 = CONST$3.EVEN_Q;
  var GetParity = function GetParity(mode, tileX, tileY) {
    var parity;
    switch (mode) {
      case ODD_R$2:
      case EVEN_R$2:
        parity = tileY & 1;
        break;
      case ODD_Q$1:
      case EVEN_Q$1:
        parity = tileX & 1;
        break;
    }
    return parity;
  };

  var GetTileXAtDirection = function GetTileXAtDirection(tileX, tileY, direction, distance, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$4;
    }
    if (distance === 1) {
      // Neighbor
      var parity = GetParity(this.mode, tileX, tileY);
      out.x = tileX + Neighbors$1[this.mode][parity][direction][0];
      out.y = tileY + Neighbors$1[this.mode][parity][direction][1];
    } else if (distance === 0) {
      out.x = tileX;
      out.y = tileY;
    } else {
      var cubeXYZ = cr2cube(this.mode, tileX, tileY, true);
      var newCubeX, newCubeY, newCubeZ;
      switch (direction) {
        case 1:
          newCubeX = cubeXYZ.x;
          newCubeY = cubeXYZ.y - distance;
          newCubeZ = cubeXYZ.z + distance;
          break;
        case 2:
          newCubeX = cubeXYZ.x - distance;
          newCubeY = cubeXYZ.y;
          newCubeZ = cubeXYZ.z + distance;
          break;
        case 3:
          newCubeX = cubeXYZ.x - distance;
          newCubeY = cubeXYZ.y + distance;
          newCubeZ = cubeXYZ.z;
          break;
        case 4:
          newCubeX = cubeXYZ.x;
          newCubeY = cubeXYZ.y + distance;
          newCubeZ = cubeXYZ.z - distance;
          break;
        case 5:
          newCubeX = cubeXYZ.x + distance;
          newCubeY = cubeXYZ.y;
          newCubeZ = cubeXYZ.z - distance;
          break;
        default:
          newCubeX = cubeXYZ.x + distance;
          newCubeY = cubeXYZ.y - distance;
          newCubeZ = cubeXYZ.z;
          break;
      }
      cube2cr(this.mode, newCubeX, newCubeY, newCubeZ, out);
    }
    return out;
  };
  var globTileXY$4 = {};

  var GetNeighborTileXY = function GetNeighborTileXY(tileX, tileY, direction, out) {
    return GetTileXAtDirection.call(this, tileX, tileY, direction, 1, out);
  };

  // Not included in Base Gird object.
  // Delta tileXY to direction

  var ReverseDirMap = function ReverseDirMap(dirMap) {
    var out = {},
      entry,
      x,
      y;
    for (var dir in dirMap) {
      entry = dirMap[dir]; // [x, y]
      x = entry[0];
      y = entry[1];
      if (!out.hasOwnProperty(x)) {
        out[x] = {};
      }
      out[x][y] = parseInt(dir);
    }
    return out;
  };
  var Neighbors = [[ReverseDirMap(Neighbors$1[0][0]), ReverseDirMap(Neighbors$1[0][1])], [ReverseDirMap(Neighbors$1[1][0]), ReverseDirMap(Neighbors$1[1][1])], [ReverseDirMap(Neighbors$1[2][0]), ReverseDirMap(Neighbors$1[2][1])], [ReverseDirMap(Neighbors$1[3][0]), ReverseDirMap(Neighbors$1[3][1])]];

  var GetNeighborTileDirection = function GetNeighborTileDirection(srcTileXY, neighborTileXY) {
    var parity = GetParity(this.mode, srcTileXY.x, srcTileXY.y);
    var deltaTileXYToDirMap = Neighbors[this.mode][parity];
    var deltaTileX = neighborTileXY.x - srcTileXY.x;
    var deltaTileY = neighborTileXY.y - srcTileXY.y;
    if (deltaTileXYToDirMap.hasOwnProperty(deltaTileX)) {
      var xEntry = deltaTileXYToDirMap[deltaTileX];
      if (xEntry.hasOwnProperty(deltaTileY)) {
        return xEntry[deltaTileY];
      }
    }
    return null;
  };

  var GetOppositeDirection = function GetOppositeDirection(tileX, tileY, direction) {
    return (direction + 3) % 6;
  };

  var ODD_R$1 = CONST$3.ODD_R;
  var EVEN_R$1 = CONST$3.EVEN_R;
  var ODD_Q = CONST$3.ODD_Q;
  var EVEN_Q = CONST$3.EVEN_Q;
  var Offset$1 = function Offset(src, offsetX, offsetY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$3;
    }
    var newX = src.x + offsetX;
    var newY = src.y + offsetY;
    switch (this.mode) {
      case ODD_R$1:
        if ((offsetY & 1) !== 0) {
          if ((newY & 1) === 0) {
            newX += 1;
          }
        }
        break;
      case EVEN_R$1:
        if ((offsetY & 1) !== 0) {
          if ((newY & 1) === 0) {
            newX -= 1;
          }
        }
        break;
      case ODD_Q:
        if ((offsetX & 1) !== 0) {
          if ((newX & 1) == 0) {
            newY += 1;
          }
        }
        break;
      case EVEN_Q:
        if ((offsetX & 1) !== 0) {
          if ((newX & 1) == 0) {
            newY -= 1;
          }
        }
        break;
    }
    out.x = newX;
    out.y = newY;
    return out;
  };
  var globTileXY$3 = {};

  var ODD_R = CONST$3.ODD_R;
  var EVEN_R = CONST$3.EVEN_R;
  var Mirror$2 = function Mirror(src, mode, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$2;
    }
    var cubeXYZ = cr2cube(this.mode, src.x, src.y, true);
    var isRMode = this.mode === ODD_R || this.mode === EVEN_R;
    var newCubeX, newCubeY, newCubeZ;
    if (mode & 1) {
      // Mirror x
      if (isRMode) {
        newCubeX = cubeXYZ.y;
        newCubeY = cubeXYZ.x;
        newCubeZ = cubeXYZ.z;
      } else {
        newCubeX = -cubeXYZ.x;
        newCubeY = -cubeXYZ.z;
        newCubeZ = -cubeXYZ.y;
      }
      cubeXYZ.x = newCubeX;
      cubeXYZ.y = newCubeY;
      cubeXYZ.z = newCubeZ;
    }
    if (mode & 2) {
      // Mirror y
      if (isRMode) {
        newCubeX = -cubeXYZ.y;
        newCubeY = -cubeXYZ.x;
        newCubeZ = -cubeXYZ.z;
      } else {
        newCubeX = cubeXYZ.x;
        newCubeY = cubeXYZ.z;
        newCubeZ = cubeXYZ.y;
      }
    }
    cube2cr(this.mode, newCubeX, newCubeY, newCubeZ, out);
    return out;
  };
  var globTileXY$2 = {};

  var Rotate$2 = function Rotate(src, dir, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$1;
    }
    dir = Wrap(dir, 0, 5);
    var cubeXYZ = cr2cube(this.mode, src.x, src.y, true);
    var newCubeX, newCubeY, newCubeZ;
    switch (dir) {
      case 1:
        newCubeX = -cubeXYZ.z;
        newCubeY = -cubeXYZ.x;
        newCubeZ = -cubeXYZ.y;
        break;
      case 2:
        newCubeX = cubeXYZ.y;
        newCubeY = cubeXYZ.z;
        newCubeZ = cubeXYZ.x;
        break;
      case 3:
        newCubeX = -cubeXYZ.x;
        newCubeY = -cubeXYZ.y;
        newCubeZ = -cubeXYZ.z;
        break;
      case 4:
        newCubeX = cubeXYZ.z;
        newCubeY = cubeXYZ.x;
        newCubeZ = cubeXYZ.y;
        break;
      case 5:
        newCubeX = -cubeXYZ.y;
        newCubeY = -cubeXYZ.z;
        newCubeZ = -cubeXYZ.x;
        break;
      default:
        newCubeX = cubeXYZ.x;
        newCubeY = cubeXYZ.y;
        newCubeZ = cubeXYZ.z;
        break;
    }
    cube2cr(this.mode, newCubeX, newCubeY, newCubeZ, out);
    return out;
  };
  var globTileXY$1 = {};

  var GetDistance = function GetDistance(tileA, tileB, roughMode) {
    cr2cube(this.mode, tileA.x, tileA.y, globCubeA$1);
    cr2cube(this.mode, tileB.x, tileB.y, globCubeB$1);
    var dx = globCubeB$1.x - globCubeA$1.x;
    var dy = globCubeB$1.y - globCubeA$1.y;
    var dz = globCubeB$1.z - globCubeA$1.z;
    return (Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) / 2;
  };
  var globCubeA$1 = {};
  var globCubeB$1 = {};

  var DirectionBetween = function DirectionBetween(tileA, tileB, round) {
    if (round === undefined) {
      round = true;
    }
    var direction;
    cr2cube(this.mode, tileA.x, tileA.y, globCubeA);
    cr2cube(this.mode, tileB.x, tileB.y, globCubeB);
    var dx = globCubeB.x - globCubeA.x;
    var dy = globCubeB.y - globCubeA.y;
    var dz = globCubeB.z - globCubeA.z;
    if (dz === 0) {
      direction = dx > 0 ? 0 : 3;
    } else if (dx === 0) {
      direction = dz > 0 ? 1 : 4;
    } else if (dy === 0) {
      direction = dz > 0 ? 2 : 5;
    } else if (dx > 0 && dy < 0 && dz > 0) {
      // 0~1
      direction = 0 + dz / -dy;
    } else if (dx < 0 && dy < 0 && dz > 0) {
      // 1~2
      direction = 1 + -dy / dz;
    } else if (dx < 0 && dy > 0 && dz > 0) {
      // 2~3
      direction = 2 + dy / -dx;
    } else if (dx < 0 && dy > 0 && dz < 0) {
      // 3~4
      direction = 3 + -dz / dy;
    } else if (dx > 0 && dy > 0 && dz < 0) {
      // 4~5
      direction = 4 + dx / -dz;
    } else {
      // ((dx > 0) && (dy < 0) && (dz < 0)) // 5~0
      direction = 5 + -dy / dx;
    }
    if (round) {
      direction = Math.round(direction);
    }
    return direction;
  };
  var globCubeA = {};
  var globCubeB = {};

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  var DEG_TO_RAD = Math.PI / 180;

  /**
   * Convert the given angle from degrees, to the equivalent angle in radians.
   *
   * @function Phaser.Math.DegToRad
   * @since 3.0.0
   *
   * @param {integer} degrees - The angle (in degrees) to convert to radians.
   *
   * @return {number} The given angle converted to radians.
   */
  var DegToRad$2 = function DegToRad(degrees) {
    return degrees * DEG_TO_RAD;
  };

  var SetPoints = function SetPoints(x, y, size, type, points) {
    if (points === undefined) {
      points = InitPoints(6);
    }
    if (size === undefined) ; else if (typeof size === 'number') {
      var angleOffset = type === 0 ? 0 : -30;
      var angleDeg, angleRad;
      for (var i = 0; i < 6; i++) {
        angleDeg = 60 * i + angleOffset;
        angleRad = DegToRad$2(angleDeg);
        points[i].x = x + size * Math.cos(angleRad);
        points[i].y = y + size * Math.sin(angleRad);
      }
    } else {
      var config = size;
      var w = config.width;
      var h = config.height;
      var halfW = w / 2;
      var quarterW = w / 4;
      var halfH = h / 2;
      var quarterH = h / 4;
      if (type === 0) {
        points[0].x = x + halfW;
        points[0].y = y;
        points[1].x = x + quarterW;
        points[1].y = y + halfH;
        points[2].x = x - quarterW;
        points[2].y = y + halfH;
        points[3].x = x - halfW;
        points[3].y = y;
        points[4].x = x - quarterW;
        points[4].y = y - halfH;
        points[5].x = x + quarterW;
        points[5].y = y - halfH;
      } else {
        points[0].x = x + halfW;
        points[0].y = y - quarterH;
        points[1].x = x + halfW;
        points[1].y = y + quarterH;
        points[2].x = x;
        points[2].y = y + halfH;
        points[3].x = x - halfW;
        points[3].y = y + quarterH;
        points[4].x = x - halfW;
        points[4].y = y - quarterH;
        points[5].x = x;
        points[5].y = y - halfH;
      }
    }
    return points;
  };

  var GetGridPoints = function GetGridPoints(tileX, tileY, points) {
    if (points === undefined) {
      points = InitPoints(6);
    } else if (points === true) {
      points = globPoints;
    }
    if (tileX === undefined) {
      globWorldXY.x = 0;
      globWorldXY.y = 0;
    } else {
      this.getWorldXY(tileX, tileY, globWorldXY);
    }
    var size;
    if (this.size !== undefined) {
      size = this.size;
    } else {
      size = globSize;
      size.width = this.width;
      size.height = this.height;
    }
    SetPoints(globWorldXY.x, globWorldXY.y, size, this.staggeraxis, points);
    return points;
  };
  var globPoints = InitPoints(6);
  var globWorldXY = {};
  var globSize = {};

  var GetBounds$2 = function GetBounds(tileX, tileY, out) {
    if (out === undefined) {
      out = new Rectangle$2();
    } else if (out === true) {
      out = globalBounds;
    }
    var worldXY = this.getWorldXY(tileX, tileY, true);
    out.x = worldXY.x - this.width * 0.5;
    out.y = worldXY.y - this.height * 0.5;
    out.width = this.width;
    out.height = this.height;
    return out;
  };
  var globalBounds = new Rectangle$2();

  var RingToTileXYArray = function RingToTileXYArray(centerTileXY, radius, out) {
    if (out === undefined) {
      out = [];
    }
    var centerCube = cr2cube(this.mode, centerTileXY.x, centerTileXY.y, true);
    var cx = centerCube.x,
      cy = centerCube.y,
      cz = centerCube.z;
    var i, j, k;
    k = radius;
    for (i = 0; i >= -radius; i--) {
      j = -i - k;
      out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }
    i = -radius;
    for (j = 1; j <= radius; j++) {
      k = -i - j;
      out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }
    j = radius;
    for (k = -1; k >= -radius; k--) {
      i = -j - k;
      out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }
    k = -radius;
    for (i = 1; i <= radius; i++) {
      j = -i - k;
      out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }
    i = radius;
    for (j = -1; j >= -radius; j--) {
      k = -i - j;
      out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }
    j = -radius;
    for (k = 1; k <= radius - 1; k++) {
      i = -j - k;
      out.push(cube2cr(this.mode, cx + i, cy + j, cz + k));
    }
    return out;
  };

  var HexagonGrid = /*#__PURE__*/function (_Hexagon) {
    _inherits(HexagonGrid, _Hexagon);
    function HexagonGrid(config) {
      var _this;
      _classCallCheck(this, HexagonGrid);
      _this = _callSuper(this, HexagonGrid, [config]);
      _this.sides = 6;
      return _this;
    }

    // resetFromJSON(o) {
    //     super.resetFromJSON(o);
    // }

    // Direction of neighbors
    _createClass(HexagonGrid, [{
      key: "allDirections",
      get: function get() {
        return ALLDIR;
      }

      // Board-match
    }, {
      key: "halfDirections",
      get: function get() {
        return HALFDIR;
      }

      // setOriginPosition
      // setCellSize
      // setType
      // getWorldXY
      // getTileXY
    }]);
    return HexagonGrid;
  }(Hexagon);
  var ALLDIR = [0, 1, 2, 3, 4, 5];
  var HALFDIR = [0, 1, 2];
  var methods$3 = {
    saveOrigin: SaveOrigin,
    restoreOrigin: RestoreOrigin,
    getTileXYAtDirection: GetTileXAtDirection,
    getNeighborTileXY: GetNeighborTileXY,
    getNeighborTileDirection: GetNeighborTileDirection,
    getOppositeDirection: GetOppositeDirection,
    offset: Offset$1,
    mirror: Mirror$2,
    rotate: Rotate$2,
    getDistance: GetDistance,
    directionBetween: DirectionBetween,
    directionNormalize: DirectionNormalize,
    getGridPoints: GetGridPoints,
    getBounds: GetBounds$2,
    ringToTileXYArray: RingToTileXYArray
  };
  Object.assign(HexagonGrid.prototype, methods$3);

  var DefaultGrids = {
    quadGrid: QuadGrid,
    hexagonGrid: HexagonGrid
  };

  var Board$1 = /*#__PURE__*/function (_EE) {
    _inherits(Board, _EE);
    function Board(scene, config) {
      var _this;
      _classCallCheck(this, Board);
      // scene: scene instance, or undefined
      _this = _callSuper(this, Board);
      _this.isShutdown = false;
      _this.scene = scene;
      _this.boardData = new BoardData();
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Board, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isBoard = GetValue$c(o, 'isBoard', true); // false: in Miniboard
        this.setGrid(GetValue$c(o, 'grid', undefined));
        this.setWrapMode(GetValue$c(o, 'wrap', false));
        this.setInfinityMode(GetValue$c(o, 'infinity', false));
        this.setBoardWidth(GetValue$c(o, 'width', 0));
        this.setBoardHeight(GetValue$c(o, 'height', 0));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        if (this.scene && this.isBoard) {
          this.scene.sys.events.once('shutdown', this.destroy, this);
        }
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        if (this.isShutdown) {
          return;
        }
        if (this.scene && this.isBoard) {
          this.scene.sys.events.off('shutdown', this.destroy, this);
        }
        if (this.isBoard) {
          this.removeAllChess(!fromScene, true);
        }
        _get(_getPrototypeOf(Board.prototype), "shutdown", this).call(this);
        this.boardData.shutdown(fromScene);
        this.scene = undefined;
        this.boardData = undefined;
        this.isShutdown = true;
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        if (this.isShutdown) {
          return;
        }
        this.emit('destroy', this, fromScene);
        this.shutdown(fromScene);
      }
    }, {
      key: "setGrid",
      value: function setGrid(grid) {
        if (IsPlainObject(grid)) {
          var config = grid;
          var gridType = GetValue$c(config, 'gridType', 'quadGrid');
          var grid = new DefaultGrids[gridType](config);
        }
        this.grid = grid;
        return this;
      }
    }, {
      key: "setWrapMode",
      value: function setWrapMode(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.wrapMode = enable;
        return this;
      }
    }, {
      key: "setInfinityMode",
      value: function setInfinityMode(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.infinityMode = enable;
        return this;
      }
    }, {
      key: "setBoardSize",
      value: function setBoardSize(width, height) {
        this.setBoardWidth(width);
        this.setBoardHeight(height);
        return this;
      }
    }, {
      key: "exists",
      value: function exists(gameObject) {
        // game object or uid
        return this.boardData.exists(this.getChessUID(gameObject));
      }
    }, {
      key: "chessCount",
      get: function get() {
        return this.boardData.chessCount;
      }
    }, {
      key: "clear",
      value: function clear(destroy) {
        if (destroy === undefined) {
          destroy = true;
        }
        this.removeAllChess(destroy, true);
        this.boardData.clear();
        return this;
      }
    }], [{
      key: "GetBoard",
      value: function GetBoard$1(chess) {
        return GetBoard(chess);
      }
    }]);
    return Board;
  }(EventEmitter);
  Object.assign(Board$1.prototype, LogicMethods);

  var Zone$1 = Phaser.GameObjects.Zone;
  var TouchZone = /*#__PURE__*/function (_Zone) {
    _inherits(TouchZone, _Zone);
    function TouchZone(scene) {
      var _this;
      _classCallCheck(this, TouchZone);
      _this = _callSuper(this, TouchZone, [scene, 0, 0, 1, 1]);
      scene.add.existing(_assertThisInitialized(_this)); // Add to scene
      _this.setScrollFactor(0);
      _this.setInteractive({
        hitArea: {},
        hitAreaCallback: function hitAreaCallback() {
          return true;
        }
      });
      return _this;
    }
    return _createClass(TouchZone);
  }(Zone$1);

  var RENDER_MASK = Phaser.GameObjects.GameObject.RENDER_MASK;
  var InputCandidate = function InputCandidate(gameObject) {
    if (gameObject.renderFlags !== RENDER_MASK) {
      return false;
    }
    var visible = true;
    var parent = gameObject.parentContainer;
    if (parent) {
      do {
        if (parent.renderFlags !== RENDER_MASK) {
          visible = false;
          break;
        }
        parent = parent.parentContainer;
      } while (parent);
    }
    return visible;
  };

  var EmitChessEvent = function EmitChessEvent(boardEventName, chessEventName, board, tileX, tileY, pointer) {
    if (tileX == null || tileY == null) {
      return;
    }
    var boardEventCallback = typeof boardEventName !== 'string' ? boardEventName : undefined;
    var chessEventCallback = typeof chessEventName !== 'string' ? chessEventName : undefined;
    var gameObjects = board.tileXYToChessArray(tileX, tileY, globChessArray$3);
    // Fire events
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      gameObject = gameObjects[i];
      if (!InputCandidate(gameObject)) {
        continue;
      }
      if (gameObject.emit) {
        if (!chessEventCallback) {
          gameObject.emit(chessEventName, pointer);
        } else {
          chessEventCallback(gameObject);
        }
      }
      if (!boardEventCallback) {
        board.emit(boardEventName, pointer, gameObject);
      } else {
        boardEventCallback(gameObject);
      }
    }
    globChessArray$3.length = 0;
  };
  var globChessArray$3 = [];

  var OnPointerDown$1 = function OnPointerDown(pointer) {
    if (!this.enable) {
      return;
    }
    if (!pointer.isDown) {
      return;
    }
    var board = this.board;
    if (this.pointer === null) {
      // Catch new touch pointer
      this.pointer = pointer;
    }
    // Get touched tileX, tileY
    var out = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    var tileX = out.x,
      tileY = out.y;
    this.prevTilePosition.x = this.tilePosition.x;
    this.prevTilePosition.y = this.tilePosition.y;
    this.tilePosition.x = tileX;
    this.tilePosition.y = tileY;
    if (!board.contains(tileX, tileY)) {
      return;
    }
    board.emit('tiledown', pointer, this.tilePosition);
    board.emit('tileover', pointer, this.tilePosition);
    var boardEventCallback = function boardEventCallback(gameObject) {
      board.emit('gameobjectdown', pointer, gameObject);
      board.emit('gameobjectover', pointer, gameObject);
    };
    var chessEventCallback = function chessEventCallback(gameObject) {
      gameObject.emit('board.pointerdown', pointer);
      gameObject.emit('board.pointerover', pointer);
    };
    EmitChessEvent(boardEventCallback, chessEventCallback, board, tileX, tileY, pointer);
  };

  var OnPointerUp$1 = function OnPointerUp(pointer) {
    if (!this.enable) {
      return;
    }
    var board = this.board;
    // Get touched tileX, tileY
    var out = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    var tileX = out.x,
      tileY = out.y;
    this.prevTilePosition.x = this.tilePosition.x;
    this.prevTilePosition.y = this.tilePosition.y;
    this.tilePosition.x = tileX;
    this.tilePosition.y = tileY;
    if (!board.contains(tileX, tileY)) {
      return;
    }
    board.emit('tileup', pointer, this.tilePosition);
    board.emit('tileout', pointer, this.prevTilePosition);
    var boardEventCallback = function boardEventCallback(gameObject) {
      board.emit('gameobjectup', pointer, gameObject);
      board.emit('gameobjectout', pointer, gameObject);
    };
    var chessEventCallback = function chessEventCallback(gameObject) {
      gameObject.emit('board.pointerup', pointer);
      gameObject.emit('board.pointerout', pointer);
    };
    EmitChessEvent(boardEventCallback, chessEventCallback, board, tileX, tileY, pointer);
    if (this.pointer === pointer) {
      // Release touch pointer
      this.pointer = null;
    }
  };

  var OnPointerMove$1 = function OnPointerMove(pointer) {
    if (!this.enable) {
      return;
    }
    var board = this.board;
    // Get touched tileX, tileY
    var out = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    if (AreTileXYEqual(this.tilePosition, out)) {
      // Tile position dose not change
      return;
    }
    this.prevTilePosition.x = this.tilePosition.x;
    this.prevTilePosition.y = this.tilePosition.y;
    // prevTilePosition might be undefined at beginning
    if (this.prevTilePosition.x != null && this.prevTilePosition.y != null) {
      board.emit('tileout', pointer, this.prevTilePosition);
    }
    var tileX = out.x,
      tileY = out.y;
    this.tilePosition.x = tileX;
    this.tilePosition.y = tileY;
    if (!board.contains(tileX, tileY)) {
      // Move outside
      EmitChessEvent('gameobjectout', 'board.pointerout', board, this.prevTilePosition.x, this.prevTilePosition.y, pointer);
      if (this.pointer === pointer) {
        // Release touch pointer
        this.pointer = null;
      }
      return;
    }
    if (this.pointer === null) {
      // Catch new touch pointer
      this.pointer = pointer;
    }
    board.emit('tilemove', pointer, this.tilePosition);
    board.emit('tileover', pointer, this.tilePosition);
    EmitChessEvent('gameobjectout', 'board.pointerout', board, this.prevTilePosition.x, this.prevTilePosition.y, pointer);
    var boardEventCallback = function boardEventCallback(gameObject) {
      board.emit('gameobjectmove', pointer, gameObject);
      board.emit('gameobjectover', pointer, gameObject);
    };
    var chessEventCallback = function chessEventCallback(gameObject) {
      gameObject.emit('board.pointermove', pointer);
      gameObject.emit('board.pointerover', pointer);
    };
    EmitChessEvent(boardEventCallback, chessEventCallback, board, tileX, tileY, pointer);
  };

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _callSuper(this, TickTask, [parent, config]);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$a(config, 'tickingMode', 1));
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

  var Rectangle$1 = Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround$2 = Phaser.Math.RotateAround;
  var GetBounds$1 = function GetBounds(gameObject, output) {
    if (output === undefined) {
      output = new Rectangle$1();
    } else if (output === true) {
      if (GlobRect$1 === undefined) {
        GlobRect$1 = new Rectangle$1();
      }
      output = GlobRect$1;
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
  var GlobRect$1 = undefined;
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
      RotateAround$2(output, gameObject.x, gameObject.y, gameObject.rotation);
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
    var boundsRect = GetBounds$1(gameObject, true);
    if (!boundsRect.contains(x, y)) {
      return false;
    }
    if (postTest && !postTest(gameObject, x, y)) {
      return false;
    }
    return true;
  };

  var GetPointerWorldXY = function GetPointerWorldXY(pointer, mainCamera, out) {
    var camera = pointer.camera;
    if (!camera) {
      return null;
    }
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globalOut;
    }
    if (camera === mainCamera) {
      out.x = pointer.worldX;
      out.y = pointer.worldY;
    } else {
      camera.getWorldPoint(pointer.x, pointer.y, out);
    }
    return out;
  };
  var globalOut = {};

  var IsPointerInBounds = function IsPointerInBounds(gameObject, pointer, preTest, postTest) {
    var mainCamera = gameObject.scene.sys.cameras.main,
      worldXY;
    if (pointer) {
      worldXY = GetPointerWorldXY(pointer, mainCamera, true);
      if (!worldXY) {
        return false;
      }
      return IsPointInBounds(gameObject, worldXY.x, worldXY.y, preTest, postTest);
    } else {
      var inputManager = gameObject.scene.input.manager;
      var pointersTotal = inputManager.pointersTotal;
      var pointers = inputManager.pointers;
      for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];
        worldXY = GetPointerWorldXY(pointer, mainCamera, true);
        if (!worldXY) {
          continue;
        }
        if (IsPointInBounds(gameObject, worldXY.x, worldXY.y, preTest, postTest)) {
          return true;
        }
      }
      return false;
    }
  };

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var OnePointerTracer = /*#__PURE__*/function (_TickTask) {
    _inherits(OnePointerTracer, _TickTask);
    function OnePointerTracer(gameObject, config) {
      var _this;
      _classCallCheck(this, OnePointerTracer);
      var scene = GetSceneObject(gameObject);
      if (scene === gameObject) {
        gameObject = undefined;
      }
      _this = _callSuper(this, OnePointerTracer, [scene, config]);
      _this.gameObject = gameObject;
      if (gameObject) {
        gameObject.setInteractive(GetValue$9(config, 'inputConfig', undefined));
      }
      _this._enable = undefined;
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(OnePointerTracer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$9(o, 'enable', true));
        this.setDetectBounds();
        if (this.gameObject === undefined) {
          this.setDetectBounds(GetValue$9(o, 'bounds', undefined));
        } else {
          this.setDetectBounds();
        }
        this.tracerState = TOUCH0;
        // this.recongizedState = new stateClass(this);
        this.pointer = undefined;
        this.lastPointer = undefined; // Last catched pointer
        this.movedState = false;
        this.isTouchingAnyObject = false;
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "boot", this).call(this);
        if (this.gameObject) {
          this.gameObject.on('pointerdown', this.onPointerDown, this);
        } else {
          this.scene.input.on('pointerdown', this.onPointerDown, this);
        }
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('gameout', this.dragCancel, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        if (!this.scene) {
          return;
        }
        if (this.gameObject) ; else {
          this.scene.input.off('pointerdown', this.onPointerDown, this);
        }
        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.scene.input.off('gameout', this.dragCancel, this);
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.gameObject = undefined;
        this.bounds = undefined;
        this.pointer = undefined;
        this.lastPointer = undefined; // Last catched pointer
        this.movedState = false;
        _get(_getPrototypeOf(OnePointerTracer.prototype), "shutdown", this).call(this, fromScene);
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
          this.dragCancel();
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
      key: "setDetectBounds",
      value: function setDetectBounds(bounds) {
        this.bounds = bounds;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "onPointerDown",
      value: function onPointerDown(pointer, gameObjects) {
        if (!this.enable) {
          return;
        }
        if (this.pointer !== undefined) {
          return;
        }
        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
          return;
        }
        if (this.pointer === pointer) {
          return;
        }
        this.pointer = pointer;
        this.lastPointer = pointer;
        this.movedState = false;
        this.tracerState = TOUCH1;
        if (this.gameObject === undefined) {
          this.isTouchingAnyObject = gameObjects.length > 0;
        }
        this.onDragStart();
      }
    }, {
      key: "onPointerUp",
      value: function onPointerUp(pointer) {
        if (!this.enable) {
          return;
        }
        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
          return;
        }
        if (this.pointer !== pointer) {
          return;
        }
        this.pointer = undefined;
        this.movedState = false;
        this.tracerState = TOUCH0;
        this.onDragEnd();
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer) {
        if (!this.enable) {
          return;
        }
        if (pointer.isDown) {
          var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
          var isCatchedPointer = this.pointer === pointer;
          if (!isCatchedPointer && isInsideBounds) ; else if (isCatchedPointer && !isInsideBounds) {
            // Pointer moves out of bounds
            this.onPointerUp(pointer);
          } else {
            // Pointer drags in bounds
            if (!this.movedState) {
              this.movedState = pointer.x !== pointer.downX || pointer.y !== pointer.downY;
            }
            if (this.movedState) {
              this.onDrag();
            }
          }
        }
      }
    }, {
      key: "dragCancel",
      value: function dragCancel() {
        if (this.tracerState === TOUCH1) {
          this.onDragEnd();
        }
        this.pointer = undefined;
        this.tracerState = TOUCH0;
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.emit('dragstart', this);
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.emit('dragend', this);
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        this.emit('drag', this);
      }

      // onLastPointerMove() { }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {}
    }, {
      key: "postUpdate",
      value: function postUpdate(time, delta) {}
    }, {
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "startTicking", this).call(this);
        this.scene.sys.events.on('preupdate', this.preUpdate, this);
        this.scene.sys.events.on('postupdate', this.postUpdate, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "stopTicking", this).call(this);
        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('preupdate', this.preUpdate, this);
          this.scene.sys.events.off('postupdate', this.postUpdate, this);
        }
      }
    }, {
      key: "setRecongizedStateObject",
      value: function setRecongizedStateObject(stateObject) {
        this.recongizedState = stateObject;
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this.recongizedState.state;
      },
      set: function set(newState) {
        this.recongizedState.state = newState;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.state = IDLE$3;
        return this;
      }
    }, {
      key: "isPointerInGameObject",
      value: function isPointerInGameObject(gameObject, preTest, postTest) {
        var pointer = this.pointer;
        if (!pointer) {
          return false;
        }
        return IsPointerInBounds(gameObject, pointer, preTest, postTest);
      }
    }]);
    return OnePointerTracer;
  }(TickTask);
  var TOUCH0 = 0;
  var TOUCH1 = 1;
  var IDLE$3 = 'IDLE';

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
      var states = GetValue$c(config, 'states', undefined);
      if (states) {
        this.addStates(states);
      }

      // Attach extend members
      var extend = GetValue$c(config, 'extend', undefined);
      if (extend) {
        for (var name in extend) {
          if (!this.hasOwnProperty(name) || this[name] === undefined) {
            this[name] = extend[name];
          }
        }
      }

      // Event emitter
      var eventEmitter = GetValue$c(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue$c(config, 'EventEmitterClass', undefined);
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
        this.setEnable(GetValue$c(o, 'enable', true));
        this.start(GetValue$c(o, 'start', undefined));
        var init = GetValue$c(o, 'init', undefined);
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
        this._scene = GetValue$c(o, 'scene', undefined);
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

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var DistanceBetween$2 = Phaser.Math.Distance.Between;
  var Tap = /*#__PURE__*/function (_OnePointerTracer) {
    _inherits(Tap, _OnePointerTracer);
    function Tap(gameObject, config) {
      var _this;
      _classCallCheck(this, Tap);
      _this = _callSuper(this, Tap, [gameObject, config]);
      var self = _assertThisInitialized(_this);
      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.stop();
              self.tapsCount = 0;
              self.x = 0;
              self.y = 0;
              self.worldX = 0;
              self.worldY = 0;
            },
            exit: function exit() {
              var pointer = self.lastPointer;
              self.x = pointer.x;
              self.y = pointer.y;
              self.worldX = pointer.worldX;
              self.worldY = pointer.worldY;
            }
          },
          BEGIN: {
            enter: function enter() {
              self.start();
              self.tapsCount = 0;
              self.emit('tappingstart', self, self.gameObject, self.lastPointer);
            }
          },
          RECOGNIZED: {
            enter: function enter() {
              self.start();
              self.emit('tap', self, self.gameObject, self.lastPointer);
              self.emit("".concat(self.tapsCount, "tap"), self, self.gameObject, self.lastPointer);
            }
          }
        },
        init: function init() {
          this.state = IDLE$2;
        },
        eventEmitter: false
      };
      _this.setRecongizedStateObject(new FSM(stateConfig));
      return _this;
    }
    _createClass(Tap, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Tap.prototype), "resetFromJSON", this).call(this, o);
        this.setHoldTime(GetValue$8(o, 'time', 250)); // min-hold-time of Press is 251
        this.setTapInterval(GetValue$8(o, 'tapInterval', 200));
        this.setDragThreshold(GetValue$8(o, 'threshold', 9));
        this.setTapOffset(GetValue$8(o, 'tapOffset', 10));
        var taps = GetValue$8(o, 'taps', undefined);
        if (taps !== undefined) {
          this.setTaps(taps);
        } else {
          this.setMaxTaps(GetValue$8(o, 'maxTaps', undefined));
          this.setMinTaps(GetValue$8(o, 'minTaps', undefined));
        }
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        switch (this.state) {
          case IDLE$2:
            this.state = BEGIN$2;
            break;
          case BEGIN$2:
            var pointer = this.lastPointer;
            var tapsOffset = DistanceBetween$2(pointer.upX, pointer.upY, pointer.x, pointer.y);
            if (tapsOffset > this.tapOffset) {
              // Can't recognize next level, restart here
              this.state = RECOGNIZED$2;
              this.state = BEGIN$2;
            }
            break;
          case RECOGNIZED$2:
            this.state = BEGIN$2;
            break;
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        if (this.state === BEGIN$2) {
          this.tapsCount++; // Try recognize next level
          this.emit('tapping', this, this.gameObject, this.lastPointer);
          if (this.maxTaps !== undefined && this.tapsCount === this.maxTaps) {
            // Reach to maxTaps, stop here                
            this.state = RECOGNIZED$2;
          }
        }
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        if (this.state === IDLE$2) {
          return;
        }
        if (this.pointer.getDistance() > this.dragThreshold) {
          // Cancel
          this.state = IDLE$2;
        }
      }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }
        if (this.state === BEGIN$2) {
          var pointer = this.lastPointer;
          if (pointer.isDown) {
            var holdTime = time - pointer.downTime;
            if (holdTime > this.holdTime) {
              this.state = IDLE$2;
            }
          } else {
            // isUp
            var releasedTime = time - pointer.upTime;
            if (releasedTime > this.tapInterval) {
              if (this.minTaps === undefined || this.tapsCount >= this.minTaps) {
                this.state = RECOGNIZED$2;
              } else {
                this.state = IDLE$2;
              }
            }
          }
        }
      }
    }, {
      key: "postUpdate",
      value: function postUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }
        // Clear RECOGNIZED after update()
        if (this.state === RECOGNIZED$2) {
          this.state = IDLE$2;
        }
      }
    }, {
      key: "isTapped",
      get: function get() {
        return this.state === RECOGNIZED$2;
      }
    }, {
      key: "setHoldTime",
      value: function setHoldTime(time) {
        this.holdTime = time; // ms
        return this;
      }
    }, {
      key: "setTapInterval",
      value: function setTapInterval(time) {
        this.tapInterval = time; // ms
        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }, {
      key: "setTapOffset",
      value: function setTapOffset(distance) {
        this.tapOffset = distance;
        return this;
      }
    }, {
      key: "setMaxTaps",
      value: function setMaxTaps(taps) {
        this.maxTaps = taps;
        return this;
      }
    }, {
      key: "setMinTaps",
      value: function setMinTaps(taps) {
        this.minTaps = taps;
        return this;
      }
    }, {
      key: "setTaps",
      value: function setTaps(minTaps, maxTaps) {
        if (maxTaps === undefined) {
          maxTaps = minTaps;
        }
        this.setMinTaps(minTaps).setMaxTaps(maxTaps);
        return this;
      }
    }]);
    return Tap;
  }(OnePointerTracer);
  var IDLE$2 = 'IDLE';
  var BEGIN$2 = 'BEGIN';
  var RECOGNIZED$2 = 'RECOGNIZED';

  var InstallTap = function InstallTap() {
    var touchZone = this.touchZone ? this.touchZone : this.board.scene;
    var tap = new Tap(touchZone);
    tap.on('tap', OnTap, this);
    return tap;
  };
  var OnTap = function OnTap(tap) {
    var board = this.board;
    // Get touched tileX, tileY
    var tileXY = board.worldXYToTileXY(tap.worldX, tap.worldY);
    var tileX = tileXY.x,
      tileY = tileXY.y;
    if (!board.contains(tileX, tileY)) {
      return;
    }
    board.emit('tiletap', tap, tileXY);
    board.emit("tile".concat(tap.tapsCount, "tap"), tap, tileXY);
    var boardEventCallback = function boardEventCallback(gameObject) {
      board.emit('gameobjecttap', tap, gameObject);
      board.emit("gameobject".concat(tap.tapsCount, "tap"), tap, gameObject);
    };
    var chessEventCallback = function chessEventCallback(gameObject) {
      gameObject.emit('board.tap', tap);
      gameObject.emit("board.".concat(tap.tapsCount, "tap"), tap);
    };
    EmitChessEvent(boardEventCallback, chessEventCallback, board, tileX, tileY, tap);
  };

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var Press = /*#__PURE__*/function (_OnePointerTracer) {
    _inherits(Press, _OnePointerTracer);
    function Press(gameObject, config) {
      var _this;
      _classCallCheck(this, Press);
      _this = _callSuper(this, Press, [gameObject, config]);
      var self = _assertThisInitialized(_this);
      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.x = 0;
              self.y = 0;
              self.worldX = 0;
              self.worldY = 0;
            },
            exit: function exit() {
              var pointer = self.lastPointer;
              self.x = pointer.x;
              self.y = pointer.y;
              self.worldX = pointer.worldX;
              self.worldY = pointer.worldY;
            }
          },
          BEGIN: {
            enter: function enter() {
              self.start();
            },
            exit: function exit() {
              self.stop();
            }
          },
          RECOGNIZED: {
            enter: function enter() {
              self.emit('pressstart', self, self.gameObject, self.lastPointer);
            },
            exit: function exit() {
              self.emit('pressend', self, self.gameObject, self.lastPointer);
            }
          }
        },
        init: function init() {
          this.state = IDLE$1;
        },
        eventEmitter: false
      };
      _this.setRecongizedStateObject(new FSM(stateConfig));
      return _this;
    }
    _createClass(Press, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Press.prototype), "resetFromJSON", this).call(this, o);
        this.setDragThreshold(GetValue$7(o, 'threshold', 9));
        this.setHoldTime(GetValue$7(o, 'time', 251));
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.state = BEGIN$1;
        if (this.holdTime === 0) {
          this.state = RECOGNIZED$1;
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.state = IDLE$1;
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        if (this.state === IDLE$1) {
          return;
        }
        if (this.pointer.getDistance() > this.dragThreshold) {
          this.state = IDLE$1;
        }
      }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }
        if (this.state === BEGIN$1) {
          var holdTime = time - this.pointer.downTime;
          if (holdTime >= this.holdTime) {
            this.state = RECOGNIZED$1;
          }
        }
      }
    }, {
      key: "isPressed",
      get: function get() {
        return this.state === RECOGNIZED$1;
      }
    }, {
      key: "setHoldTime",
      value: function setHoldTime(time) {
        this.holdTime = time; // ms
        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }]);
    return Press;
  }(OnePointerTracer);
  var IDLE$1 = 'IDLE';
  var BEGIN$1 = 'BEGIN';
  var RECOGNIZED$1 = 'RECOGNIZED';

  var InstallPress = function InstallPress() {
    var touchZone = this.touchZone ? this.touchZone : this.board.scene;
    var press = new Press(touchZone);
    press.on('pressstart', OnPressStart, this).on('pressend', OnPressEnd, this);
    return press;
  };
  var OnPressStart = function OnPressStart(press) {
    var board = this.board;
    // Get touched tileX, tileY
    var tileXY = board.worldXYToTileXY(press.worldX, press.worldY);
    var tileX = tileXY.x,
      tileY = tileXY.y;
    if (!board.contains(tileX, tileY)) {
      return;
    }
    board.emit('tilepressstart', press, tileXY);
    EmitChessEvent('gameobjectpressstart', 'board.pressstart', board, tileX, tileY, press);
  };
  var OnPressEnd = function OnPressEnd(press) {
    var board = this.board;
    // Get touched tileX, tileY
    var tileXY = board.worldXYToTileXY(press.worldX, press.worldY);
    var tileX = tileXY.x,
      tileY = tileXY.y;
    if (!board.contains(tileX, tileY)) {
      return;
    }
    board.emit('tilepressend', press, tileXY);
    EmitChessEvent('gameobjectpressend', 'board.pressend', board, tileX, tileY, press);
  };

  var GetTickDelta = function GetTickDelta(game) {
    return GetGame(game).loop.delta;
  };

  var DistanceBetween$1 = Phaser.Math.Distance.Between;
  var AngleBetween$1 = Phaser.Math.Angle.Between;
  var VelocityMethods = {
    getDt: function getDt() {
      var dt = GetTickDelta(this.scene);
      return dt;
    },
    getVelocity: function getVelocity() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = DistanceBetween$1(p0.x, p0.y, p1.x, p1.y);
      var velocity = d / (this.getDt() * 0.001);
      return velocity;
    },
    getVelocityX: function getVelocityX() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = Math.abs(p1.x - p0.x);
      var velocity = d / (this.getDt() * 0.001);
      return velocity;
    },
    getVelocityY: function getVelocityY() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = Math.abs(p1.y - p0.y);
      var velocity = d / (this.getDt() * 0.001);
      return velocity;
    },
    getVelocityAngle: function getVelocityAngle() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var angle = AngleBetween$1(p0.x, p0.y, p1.x, p1.y);
      return angle;
    }
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

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var RadToDeg$1 = Phaser.Math.RadToDeg;
  var Swipe = /*#__PURE__*/function (_OnePointerTracer) {
    _inherits(Swipe, _OnePointerTracer);
    function Swipe(gameObject, config) {
      var _this;
      _classCallCheck(this, Swipe);
      _this = _callSuper(this, Swipe, [gameObject, config]);
      var self = _assertThisInitialized(_this);
      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.x = 0;
              self.y = 0;
              self.worldX = 0;
              self.worldY = 0;
            },
            exit: function exit() {
              var pointer = self.lastPointer;
              self.x = pointer.x;
              self.y = pointer.y;
              self.worldX = pointer.worldX;
              self.worldY = pointer.worldY;
            }
          },
          BEGIN: {
            enter: function enter() {
              self.validDrag = false;
            }
          },
          RECOGNIZED: {
            enter: function enter() {
              self.start();
              self.updateDirectionStates();
              self.emit('swipe', self, self.gameObject, self.lastPointer);
            },
            exit: function exit() {
              self.stop();
              self.clearDirectionStates();
            }
          }
        },
        init: function init() {
          this.state = IDLE;
        },
        eventEmitter: false
      };
      _this.setRecongizedStateObject(new FSM(stateConfig));
      _this.clearDirectionStates();
      return _this;
    }
    _createClass(Swipe, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Swipe.prototype), "resetFromJSON", this).call(this, o);
        this.setDragThreshold(GetValue$6(o, 'threshold', 10));
        this.setVelocityThreshold(GetValue$6(o, 'velocityThreshold', 1000));
        this.setDirectionMode(GetValue$6(o, 'dir', '8dir'));
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.state = BEGIN;
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.state = IDLE;
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        if (this.state === BEGIN) {
          if (!this.validDrag) {
            this.validDrag = this.dragThreshold === 0 || this.pointer.getDistance() >= this.dragThreshold;
          }
          if (this.validDrag && this.dragVelocity > this.velocityThreshold) {
            this.state = RECOGNIZED;
          }
        }
      }
    }, {
      key: "postUpdate",
      value: function postUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }
        // Clear RECOGNIZED after update()
        if (this.state === RECOGNIZED) {
          this.state = IDLE;
        }
      }
    }, {
      key: "isSwiped",
      get: function get() {
        return this.state === RECOGNIZED;
      }
    }, {
      key: "dragVelocity",
      get: function get() {
        var velocity;
        switch (this.dirMode) {
          case 0:
            velocity = this.getVelocityY();
            break;
          // up & down
          case 1:
            velocity = this.getVelocityX();
            break;
          // left & right
          default:
            velocity = this.getVelocity();
            break;
          // 4 dir, 8 dir
        }
        return velocity;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }, {
      key: "setVelocityThreshold",
      value: function setVelocityThreshold(velocity) {
        this.velocityThreshold = velocity;
        return this;
      }
    }, {
      key: "setDirectionMode",
      value: function setDirectionMode(m) {
        if (typeof m === 'string') {
          m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
      }
    }, {
      key: "updateDirectionStates",
      value: function updateDirectionStates() {
        var angle = RadToDeg$1(this.getVelocityAngle());
        AngleToDirections(angle, this.dirMode, this);
        return this;
      }
    }, {
      key: "clearDirectionStates",
      value: function clearDirectionStates() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        return this;
      }
    }]);
    return Swipe;
  }(OnePointerTracer);
  Object.assign(Swipe.prototype, VelocityMethods);
  var IDLE = 'IDLE';
  var BEGIN = 'BEGIN';
  var RECOGNIZED = 'RECOGNIZED';

  var InstallSwipe = function InstallSwipe() {
    var touchZone = this.touchZone ? this.touchZone : this.board.scene;
    var swipe = new Swipe(touchZone);
    swipe.on('swipe', OnSwipe, this);
    return swipe;
  };
  var OnSwipe = function OnSwipe(swipe) {
    var board = this.board;
    // Get touched tileX, tileY
    var tileXY = board.worldXYToTileXY(swipe.worldX, swipe.worldY);
    var tileX = tileXY.x,
      tileY = tileXY.y;
    if (!board.contains(tileX, tileY)) {
      return;
    }
    swipe.direction = board.angleSnapToDirection(tileXY, swipe.getVelocityAngle());
    board.emit('tileswipe', swipe, tileXY);
    EmitChessEvent('gameobjectswipe', 'board.swipe', board, tileX, tileY, swipe);
  };

  var Input = /*#__PURE__*/function () {
    function Input(board, config) {
      _classCallCheck(this, Input);
      var enable = GetValue$c(config, 'enable', true);
      var useTouchZone = GetValue$c(config, 'useTouchZone', true);
      var scene = board.scene;
      this.board = board;
      this.touchZone = undefined;
      this._enable = true;
      this.pointer = null;
      this.tilePosition = {
        x: undefined,
        y: undefined
      };
      this.prevTilePosition = {
        x: undefined,
        y: undefined
      };
      if (useTouchZone) {
        var touchZone = new TouchZone(scene);
        touchZone.on('pointerdown', OnPointerDown$1, this);
        touchZone.on('pointerup', OnPointerUp$1, this);
        touchZone.on('pointermove', OnPointerMove$1, this);
        this.touchZone = touchZone;
      } else {
        scene.input.on('pointerdown', OnPointerDown$1, this);
        scene.input.on('pointerup', OnPointerUp$1, this);
        scene.input.on('pointermove', OnPointerMove$1, this);
      }
      this.tap = InstallTap.call(this);
      this.press = InstallPress.call(this);
      this.swipe = InstallSwipe.call(this);
      board.once('destroy', this.onBoardDestroy, this);
      this.setEnable(enable);
    }
    _createClass(Input, [{
      key: "destroy",
      value: function destroy(fromScene) {
        this.tap.destroy(fromScene);
        this.press.destroy(fromScene);
        this.swipe.destroy(fromScene);
        if (this.touchZone) {
          this.touchZone.destroy(fromScene);
          this.touchZone = undefined;
        } else {
          var scene = this.board.scene;
          if (scene) {
            scene.input.off('pointerdown', OnPointerDown$1, this);
            scene.input.off('pointerup', OnPointerUp$1, this);
            scene.input.off('pointermove', OnPointerMove$1, this);
          }
        }
        this.board = undefined;

        // board.off('destroy', this.onBoardDestroy, this);
      }
    }, {
      key: "onBoardDestroy",
      value: function onBoardDestroy(parent, fromScene) {
        this.destroy(fromScene);
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
          this.pointer = null;
        }
        this._enable = e;
        if (this.touchZone) {
          if (e) {
            this.touchZone.setInteractive();
          } else {
            this.touchZone.disableInteractive();
          }
        }
        this.tap.setEnable(e);
        this.press.setEnable(e);
        this.swipe.setEnable(e);
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
    }]);
    return Input;
  }();

  var SetInteractive$1 = function SetInteractive(config) {
    // Input
    if (!this.input) {
      this.input = new Input(this, config);
    } else {
      var enable = config === false ? false : true;
      this.input.setEnable(enable);
    }
    return this;
  };

  var ForEachCullTileXY = function ForEachCullTileXY(callback, scope, config) {
    if (typeof config === 'number') {
      config = {
        order: config
      };
    }
    if (config === undefined) {
      config = {};
    }
    var order = GetValue$c(config, 'order', 0);
    var camera = GetValue$c(config, 'camera', this.scene.cameras.main);
    var paddingX = GetValue$c(config, 'paddingX', 1);
    var paddingY = GetValue$c(config, 'paddingY', 1);
    if (ViewportBounds === undefined) {
      ViewportBounds = new Rectangle$2();
    }
    ViewportBounds.width = (camera.width + paddingX * 2) / camera.zoomX;
    ViewportBounds.height = (camera.height + paddingY * 2) / camera.zoomY;
    ViewportBounds.centerX = camera.centerX + camera.scrollX;
    ViewportBounds.centerY = camera.centerY + camera.scrollY;
    this.forEachTileXYInShape(ViewportBounds, callback, scope, {
      order: order,
      testMode: 1
    });
    return this;
  };
  var ViewportBounds;

  var Board = /*#__PURE__*/function (_LogicBoard) {
    _inherits(Board, _LogicBoard);
    function Board() {
      _classCallCheck(this, Board);
      return _callSuper(this, Board, arguments);
    }
    _createClass(Board, [{
      key: "touchZone",
      get: function get() {
        if (this.input) {
          return this.input.touchZone;
        } else {
          return null;
        }
      }
    }, {
      key: "getTouchZone",
      value: function getTouchZone() {
        return this.touchZone;
      }
    }]);
    return Board;
  }(Board$1);
  var methods$2 = {
    setInteractive: SetInteractive$1,
    forEachCullTileXY: ForEachCullTileXY
  };
  Object.assign(Board.prototype, methods$2);

  var IsInValidKey = function IsInValidKey(keys) {
    return keys == null || keys === '' || keys.length === 0;
  };
  var GetEntry = function GetEntry(target, keys, defaultEntry) {
    var entry = target;
    if (IsInValidKey(keys)) ; else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }
      var key;
      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        if (entry[key] == null || _typeof(entry[key]) !== 'object') {
          var newEntry;
          if (i === cnt - 1) {
            if (defaultEntry === undefined) {
              newEntry = {};
            } else {
              newEntry = defaultEntry;
            }
          } else {
            newEntry = {};
          }
          entry[key] = newEntry;
        }
        entry = entry[key];
      }
    }
    return entry;
  };
  var SetValue = function SetValue(target, keys, value, delimiter) {
    if (delimiter === undefined) {
      delimiter = '.';
    }

    // no object
    if (_typeof(target) !== 'object') {
      return;
    }

    // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      }
      // set target to another object
      else if (_typeof(value) === 'object') {
        target = value;
      }
    } else {
      if (typeof keys === 'string') {
        keys = keys.split(delimiter);
      }
      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }
    return target;
  };

  ObjectFactory.register('board', function (config) {
    return new Board(this.scene, config);
  });
  SetValue(window, 'RexPlugins.Board.Board', Board);

  ObjectFactory.register('hexagonGrid', function (config) {
    return new HexagonGrid(config);
  });

  ObjectFactory.register('quadGrid', function (config) {
    return new QuadGrid(config);
  });

  var IsMiniBoardObject = function IsMiniBoardObject(object) {
    return object.type === 'rexMiniBoard';
  };

  var Base$1 = Phaser.GameObjects.Polygon;
  var Shape = /*#__PURE__*/function (_Base) {
    _inherits(Shape, _Base);
    function Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard) {
      var _this;
      _classCallCheck(this, Shape);
      if (addToBoard === undefined) {
        addToBoard = true;
      }

      // Chess-Container
      var isMiniBoard = IsMiniBoardObject(board),
        miniBoard;
      if (isMiniBoard) {
        miniBoard = board;
        board = miniBoard.board;
      }
      var scene = board.scene;
      var worldX, worldY;
      if (addToBoard) {
        worldX = 0;
        worldY = 0;
      } else {
        worldX = tileX;
        worldY = tileY;
      }
      var points = board.getGridPoints(undefined, undefined, true);
      ShiftToO(points);
      _this = _callSuper(this, Shape, [scene, worldX, worldY, points, fillColor, fillAlpha]);
      if (addToBoard) {
        if (isMiniBoard) {
          // Chess-Container
          miniBoard.addChess(_assertThisInitialized(_this), tileX, tileY, tileZ);
        } else {
          board.addChess(_assertThisInitialized(_this), tileX, tileY, tileZ, true);
        }
      } else {
        GetChessData(_assertThisInitialized(_this));
      }
      return _this;
    }
    return _createClass(Shape);
  }(Base$1);
  var ShiftToO = function ShiftToO(points) {
    var minX = Infinity;
    var minY = Infinity;
    var point;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
      point = points[i];
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
    }
    if (minX === 0 && minY === 0) {
      return points;
    }
    for (var i = 0, cnt = points.length; i < cnt; i++) {
      point = points[i];
      point.x -= minX;
      point.y -= minY;
    }
    return points;
  };

  ObjectFactory.register('shape', function (board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard) {
    var gameObject = new Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard);
    board.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Board.Shape', Shape);

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

  var CanMoveToTile$1 = function CanMoveToTile(tileX, tileY, direction) {
    var board = this.chessData.board;
    // Chess is not in a board
    if (board == null) {
      return false;
    }
    var myTileXYZ = this.chessData.tileXYZ;
    var myTileX = myTileXYZ.x,
      myTileY = myTileXYZ.y,
      myTileZ = myTileXYZ.z;

    // Move to current position
    if (tileX === myTileX && tileY === myTileY) {
      return true;
    }

    // Target position is not in board
    if (!board.contains(tileX, tileY)) {
      return false;
    }

    // Blocker test
    if (this.blockerTest) {
      if (board.hasBlocker(tileX, tileY)) {
        return false;
      }
    }

    // Edge-blocker test
    if (this.edgeBlockerTest) ;

    // Custom moveable test
    if (this.moveableTestCallback) {
      if (direction === undefined) {
        direction = this.chessData.getTileDirection(tileX, tileY);
      }
      targetTileXY$3.x = tileX;
      targetTileXY$3.y = tileY;
      targetTileXY$3.z = myTileZ;
      if (this.moveableTestScope) {
        var moveable = this.moveableTestCallback.call(this.moveableTestScope, myTileXYZ, targetTileXY$3, direction, board);
      } else {
        var moveable = this.moveableTestCallback(myTileXYZ, targetTileXY$3, direction, board);
      }
      if (!moveable) {
        return false;
      }
    }

    // Sneak mode, change tileZ in MoveToTile method
    // if (this.sneakMode) {
    // }

    // Occupied test
    if (this.occupiedTest && !this.sneakMode) {
      var occupiedChess = board.tileXYZToChess(tileX, tileY, myTileZ);
      if (occupiedChess) {
        this.emit('occupy', occupiedChess, this.parent, this);
        // Try to move occupiedChess away in this event
        // Still ooccupied?
        if (board.contains(tileX, tileY, myTileZ)) {
          return false;
        }
      }
    }
    return true;
  };
  var targetTileXY$3 = {
    x: 0,
    y: 0,
    z: 0
  };

  var GetSneakTileZ = function GetSneakTileZ(moveTo, tileX, tileY, tileZ) {
    var board = moveTo.chessData.board;
    var sneakTileZ = tileZ.toString();
    do {
      sneakTileZ += '.';
    } while (board.contains(tileX, tileY, sneakTileZ));
    return sneakTileZ;
  };

  var MoveToTile$1 = function MoveToTile(tileX, tileY, direction) {
    var board = this.chessData.board;
    if (board === null) {
      // chess is not in a board
      this.lastMoveResult = false;
      return this;
    }
    if (tileX != null && typeof tileX !== 'number') {
      var config = tileX;
      tileX = GetValue$c(config, 'x', undefined);
      tileY = GetValue$c(config, 'y', undefined);
      direction = GetValue$c(config, 'direction', undefined);
    }
    var myTileXYZ = this.chessData.tileXYZ;
    if (direction !== undefined && tileX == null || tileY == null) {
      // Get neighbor tile position if direction is not undefined
      var targetTileXY = board.getNeighborTileXY(myTileXYZ, direction, true);
      if (targetTileXY !== null) {
        tileX = targetTileXY.x;
        tileY = targetTileXY.y;
      } else {
        tileX = null;
        tileY = null;
      }
    }

    // invalid tile position
    if (tileX == null || tileY == null) {
      this.lastMoveResult = false;
      return this;
    }
    if (direction === undefined) {
      globTileXYZ.x = tileX;
      globTileXYZ.y = tileY;
      direction = board.getNeighborTileDirection(myTileXYZ, globTileXYZ);
    }
    if (!this.canMoveTo(tileX, tileY, direction)) {
      this.lastMoveResult = false;
      return this;
    }
    this.destinationTileX = tileX;
    this.destinationTileY = tileY;
    this.destinationDirection = direction;
    if (board.wrapMode && direction !== null) {
      board.grid.getNeighborTileXY(myTileXYZ.x, myTileXYZ.y, direction, neighborTileXY);
      // wrap mode && neighbor
      if (neighborTileXY.x === tileX && neighborTileXY.y === tileY) {
        // not a wrapped neighbor
        var out = board.tileXYToWorldXY(tileX, tileY, true);
        this.moveAlongLine(undefined, undefined, out.x, out.y);
      } else {
        // wrapped neighbor
        // line 0
        var out = board.tileXYToWorldXY(neighborTileXY.x, neighborTileXY.y, true);
        var originNeighborWorldX = out.x;
        var originNeighborWorldY = out.y;
        out = board.tileXYToWorldXY(myTileXYZ.x, myTileXYZ.y, true);
        var startX = out.x;
        var startY = out.y;
        var endX = (startX + originNeighborWorldX) / 2;
        var endY = (startY + originNeighborWorldY) / 2;
        this.moveAlongLine(undefined, undefined, endX, endY);
        // line 1
        var oppositeDirection = board.getOppositeDirection(tileX, tileY, direction);
        board.grid.getNeighborTileXY(tileX, tileY, oppositeDirection, neighborTileXY);
        out = board.tileXYToWorldXY(neighborTileXY.x, neighborTileXY.y, true);
        originNeighborWorldX = out.x;
        originNeighborWorldY = out.y;
        out = board.tileXYToWorldXY(tileX, tileY, true);
        endX = out.x;
        endY = out.y;
        startX = (originNeighborWorldX + endX) / 2;
        startY = (originNeighborWorldY + endY) / 2;
        this.addMoveLine(startX, startY, endX, endY);
      }
    } else {
      var out = board.tileXYToWorldXY(tileX, tileY, true);
      this.moveAlongLine(undefined, undefined, out.x, out.y);
    }
    var tileZ = myTileXYZ.z;
    if (this.sneakMode) {
      if (this.tileZSave === undefined) {
        if (board.contains(tileX, tileY, tileZ)) {
          // Sneak
          this.tileZSave = tileZ;
          tileZ = GetSneakTileZ(this, tileX, tileY, this.tileZSave);
        }
      } else {
        if (board.contains(tileX, tileY, this.tileZSave)) {
          // Sneak
          tileZ = GetSneakTileZ(this, tileX, tileY, this.tileZSave);
        } else {
          // Go back
          tileZ = this.tileZSave;
          this.tileZSave = undefined;
        }
      }
    }
    board.moveChess(this.parent, tileX, tileY, tileZ, false);
    this.isRunning = true;
    this.lastMoveResult = true;
    return this;
  };
  var globTileXYZ = {};
  var neighborTileXY = {};

  var MoveToward$1 = function MoveToward(direction) {
    this.moveTo(undefined, undefined, direction);
    return this;
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

  var MoveToRandomNeighbor$1 = function MoveToRandomNeighbor() {
    var board = this.chessData.board;
    if (board === null) {
      // chess is not in a board
      this.lastMoveResult = false;
      return this;
    }
    var directions = board.grid.allDirections;
    if (globDirections$1.length !== directions.length) {
      Clone(directions, globDirections$1);
    }
    Shuffle(globDirections$1);
    for (var i = 0, cnt = globDirections$1.length; i < cnt; i++) {
      this.moveToward(globDirections$1[i]);
      if (this.lastMoveResult) {
        return this;
      }
    }
    return this;
  };
  var globDirections$1 = [];

  var MoveAway = function MoveAway(tileX, tileY, moveAwayMode) {
    var board = this.chessData.board;
    if (board === null) {
      // chess is not in a board
      this.lastMoveResult = false;
      return this;
    }
    if (typeof tileX !== 'number') {
      var config = tileX;
      tileX = config.x;
      tileY = config.y;
    }
    targetTileXY$2.x = tileX;
    targetTileXY$2.y = tileY;
    if (moveAwayMode === undefined) {
      moveAwayMode = true;
    }
    var myTileXYZ = this.chessData.tileXYZ;
    var directions = board.grid.allDirections;

    // Get tileXY and distance of each neighbor, and current tile position
    for (var i = 0, cnt = directions.length + 1; i < cnt; i++) {
      var chessInfo = globChessInfo[i];
      if (!chessInfo) {
        chessInfo = {};
        globChessInfo.push(chessInfo);
      }
      if (i < cnt - 1) {
        // Neighbors
        var out = board.getNeighborTileXY(myTileXYZ, i, chessInfo);
        if (out === null) {
          // Invalid neighbor tile position
          chessInfo.x = undefined;
          chessInfo.y = undefined;
          chessInfo.distance = undefined;
        } else {
          chessInfo.distance = board.getDistance(chessInfo, targetTileXY$2, true);
        }
      } else {
        // Current tile
        chessInfo.direction = undefined;
        chessInfo.x = myTileXYZ.x;
        chessInfo.y = myTileXYZ.y;
        chessInfo.distance = board.getDistance(chessInfo, targetTileXY$2, true);
      }
    }
    globChessInfo.length = directions.length + 1;

    // Sort chess info
    var previousDirection = this.destinationDirection;
    globChessInfo.sort(function (infoA, infoB) {
      var distanceA = infoA.distance,
        distanceB = infoB.distance;
      // Invalid tile position
      if (distanceA === undefined) {
        return 1;
      }
      if (distanceB === undefined) {
        return -1;
      }
      if (distanceA > distanceB) {
        return moveAwayMode ? -1 : 1;
      }
      if (distanceA < distanceB) {
        return moveAwayMode ? 1 : -1;
      }

      // Equal-to case
      var directionA = infoA.direction,
        directionB = infoB.direction;
      // Diagonal
      if (directionA === previousDirection) {
        return 1;
      }
      if (directionB === previousDirection) {
        return -1;
      }
      // Current tile position
      if (directionA === undefined) {
        return 1;
      }
      if (directionB === undefined) {
        return -1;
      }
      return 0;
    });

    // Try move to neighbor, or current tile position
    for (var i = 0, cnt = globChessInfo.length; i < cnt; i++) {
      chessInfo = globChessInfo[i];
      if (chessInfo.distance === null) {
        // Invalid tile position
        return this;
      }
      this.moveTo(chessInfo);
      if (this.lastMoveResult) {
        return this;
      }
    }
    return this;
  };
  var targetTileXY$2 = {
    x: 0,
    y: 0
  };
  var globChessInfo = [];

  var MoveCloser = function MoveCloser(tileX, tileY) {
    this.moveAway(tileX, tileY, false);
    return this;
  };

  var Methods$5 = {
    canMoveTo: CanMoveToTile$1,
    moveTo: MoveToTile$1,
    moveToward: MoveToward$1,
    moveToRandomNeighbor: MoveToRandomNeighbor$1,
    moveAway: MoveAway,
    moveCloser: MoveCloser
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var DistanceBetween = Phaser.Math.Distance.Between;
  var Lerp = Phaser.Math.Linear;
  var AngleBetween = Phaser.Math.Angle.Between;
  var MoveTo$2 = /*#__PURE__*/function (_TickTask) {
    _inherits(MoveTo, _TickTask);
    function MoveTo(gameObject, config) {
      var _this;
      _classCallCheck(this, MoveTo);
      _this = _callSuper(this, MoveTo, [gameObject, config]);
      // this.parent = gameObject;

      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(MoveTo, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isRunning = GetValue$4(o, 'isRunning', false);
        this.setEnable(GetValue$4(o, 'enable', true));
        this.timeScale = GetValue$4(o, 'timeScale', 1);
        this.setSpeed(GetValue$4(o, 'speed', 400));
        this.setRotateToTarget(GetValue$4(o, 'rotateToTarget', false));
        this.targetX = GetValue$4(o, 'targetX', 0);
        this.targetY = GetValue$4(o, 'targetY', 0);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          isRunning: this.isRunning,
          enable: this.enable,
          timeScale: this.timeScale,
          speed: this.speed,
          rotateToTarget: this.rotateToTarget,
          targetX: this.targetX,
          targetY: this.targetY,
          tickingMode: this.tickingMode
        };
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
      key: "setSpeed",
      value: function setSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "setRotateToTarget",
      value: function setRotateToTarget(rotateToTarget) {
        this.rotateToTarget = rotateToTarget;
        return this;
      }
    }, {
      key: "moveTo",
      value: function moveTo(x, y) {
        if (typeof x !== 'number') {
          var config = x;
          x = config.x;
          y = config.y;
        }
        this.targetX = x;
        this.targetY = y;
        _get(_getPrototypeOf(MoveTo.prototype), "start", this).call(this);
        this.emit('start', this.parent, this);
        return this;
      }
    }, {
      key: "moveFrom",
      value: function moveFrom(x, y) {
        if (typeof x !== 'number') {
          var config = x;
          x = config.x;
          y = config.y;
        }
        var gameObject = this.parent;
        var targetX = gameObject.x;
        var targetY = gameObject.y;
        gameObject.setPosition(x, y);
        this.moveTo(targetX, targetY);
        return this;
      }
    }, {
      key: "moveToward",
      value: function moveToward(angle, distance) {
        var gameObject = this.parent;
        var targetX = gameObject.x + Math.cos(angle) * distance;
        var targetY = gameObject.y + Math.sin(angle) * distance;
        this.moveTo(targetX, targetY);
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable) {
          return this;
        }
        var gameObject = this.parent;
        if (!gameObject.active) {
          return this;
        }
        var curX = gameObject.x,
          curY = gameObject.y;
        var targetX = this.targetX,
          targetY = this.targetY;
        if (curX === targetX && curY === targetY) {
          this.complete();
          return this;
        }
        if (this.speed === 0 || delta === 0 || this.timeScale === 0) {
          return this;
        }
        var dt = delta * this.timeScale / 1000;
        var movingDist = this.speed * dt;
        var distToTarget = DistanceBetween(curX, curY, targetX, targetY);
        var newX, newY;
        if (movingDist < distToTarget) {
          var t = movingDist / distToTarget;
          newX = Lerp(curX, targetX, t);
          newY = Lerp(curY, targetY, t);
        } else {
          newX = targetX;
          newY = targetY;
        }
        gameObject.setPosition(newX, newY);
        if (this.rotateToTarget) {
          gameObject.rotation = AngleBetween(curX, curY, newX, newY);
        }
        return this;
      }
    }]);
    return MoveTo;
  }(SceneUpdateTickTask);

  var MoveTo$1 = /*#__PURE__*/function (_TickTask) {
    _inherits(MoveTo, _TickTask);
    function MoveTo(gameObject, config) {
      var _this;
      _classCallCheck(this, MoveTo);
      _this = _callSuper(this, MoveTo, [gameObject, config]);
      // this.parent = gameObject;

      _this.chessData = GetChessData(gameObject);
      _this.scene = gameObject.scene;
      _this.moveToTask = new MoveTo$2(gameObject, {
        tickingMode: 0
      });
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(MoveTo, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isRunning = GetValue$c(o, 'isRunning', false);
        this.setEnable(GetValue$c(o, 'enable', true));
        this.timeScale = GetValue$c(o, 'timeScale', 1);
        this.setSpeed(GetValue$c(o, 'speed', 400));
        this.setRotateToTarget(GetValue$c(o, 'rotateToTarget', false));
        this.setOccupiedTest(GetValue$c(o, 'occupiedTest', false));
        this.setBlockerTest(GetValue$c(o, 'blockerTest', false));
        this.setEdgeBlockerTest(GetValue$c(o, 'edgeBlockerTest', false));
        this.setMoveableTestCallback(GetValue$c(o, 'moveableTest', undefined), GetValue$c(o, 'moveableTestScope', undefined));
        this.setSneakEnable(GetValue$c(o, 'sneak', false));
        this.destinationTileX = GetValue$c(o, 'destinationTileX', null);
        this.destinationTileY = GetValue$c(o, 'destinationTileY', null);
        this.destinationDirection = GetValue$c(o, 'destinationDirection', null);
        this.lastMoveResult = GetValue$c(o, 'lastMoveResult', undefined);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          isRunning: this.isRunning,
          enable: this.enable,
          timeScale: this.timeScale,
          speed: this.speed,
          occupiedTest: this.occupiedTest,
          blockerTest: this.blockerTest,
          edgeBlockerTest: this.edgeBlockerTest,
          moveableTest: this.moveableTestCallback,
          moveableTestScope: this.moveableTestScope,
          rotateToTarget: this.rotateToTarget,
          destinationTileX: this.destinationTileX,
          destinationTileY: this.destinationTileY,
          destinationDirection: this.destinationDirection,
          lastMoveResult: this.lastMoveResult,
          tickingMode: this.tickingMode
        };
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        this.moveToTask.shutdown(fromScene);
        _get(_getPrototypeOf(MoveTo.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this.moveToTask.enable;
      },
      set: function set(value) {
        this.moveToTask.setEnable(value);
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
      key: "timeScale",
      get: function get() {
        return this.moveToTask.timeScale;
      },
      set: function set(value) {
        this.moveToTask.timeScale = value;
      }
    }, {
      key: "speed",
      get: function get() {
        return this.moveToTask.speed;
      },
      set: function set(value) {
        this.moveToTask.setSpeed(value);
      }
    }, {
      key: "setSpeed",
      value: function setSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "rotateToTarget",
      get: function get() {
        return this.moveToTask.rotateToTarget;
      },
      set: function set(value) {
        this.moveToTask.setRotateToTarget(value);
      }
    }, {
      key: "setRotateToTarget",
      value: function setRotateToTarget(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.rotateToTarget = enable;
        return this;
      }
    }, {
      key: "setOccupiedTest",
      value: function setOccupiedTest(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.occupiedTest = enable;
        return this;
      }
    }, {
      key: "setBlockerTest",
      value: function setBlockerTest(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.blockerTest = enable;
        return this;
      }
    }, {
      key: "setEdgeBlockerTest",
      value: function setEdgeBlockerTest(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.edgeBlockerTest = enable;
        return this;
      }
    }, {
      key: "setMoveableTestCallback",
      value: function setMoveableTestCallback(callback, scope) {
        this.moveableTestCallback = callback;
        this.moveableTestScope = scope;
        return this;
      }
    }, {
      key: "setSneakEnable",
      value: function setSneakEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.sneakMode = enable;
        this.tileZSave = undefined;
        return this;
      }
    }, {
      key: "moveAlongLine",
      value: function moveAlongLine(startX, startY, endX, endY) {
        if (startX !== undefined) {
          this.parent.x = startX;
        }
        if (startY !== undefined) {
          this.parent.y = startY;
        }
        this.moveToTask.moveTo(endX, endY);
        return this;
      }
    }, {
      key: "addMoveLine",
      value: function addMoveLine(startX, startY, endX, endY) {
        if (!this.moveToTask.hasOwnProperty('nextlines')) {
          this.moveToTask.nextlines = [];
        }
        this.moveToTask.nextlines.push([startX, startY, endX, endY]);
        return this;
      }
    }, {
      key: "moveNextLine",
      value: function moveNextLine() {
        var nextlines = this.moveToTask.nextlines;
        if (!nextlines) {
          return false;
        }
        if (nextlines.length === 0) {
          return false;
        }
        // has next line
        this.moveAlongLine.apply(this, nextlines[0]);
        nextlines.length = 0;
        return true;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable) {
          return this;
        }
        var moveToTask = this.moveToTask;
        moveToTask.update(time, delta);
        if (!moveToTask.isRunning) {
          if (!this.moveNextLine()) {
            this.complete();
          }
          return this;
        }
        return this;
      }
    }]);
    return MoveTo;
  }(SceneUpdateTickTask);
  Object.assign(MoveTo$1.prototype, Methods$5);

  var CanMoveToTile = function CanMoveToTile(tileX, tileY, direction) {
    var miniBoard = this.parent;
    var mainBoard = miniBoard.mainBoard;
    // Not on a mainBoard
    if (mainBoard == null) {
      return false;
    }
    myTileXYZ.x = miniBoard.tileX;
    myTileXYZ.y = miniBoard.tileY;
    targetTileXYZ.x = tileX;
    targetTileXYZ.y = tileY;
    // Move to current position
    if (targetTileXYZ.x === myTileXYZ.x && targetTileXYZ.y === myTileXYZ.y) {
      return true;
    }
    miniBoard.pullOutFromMainBoard();
    // Can not put on main board
    if (!miniBoard.canPutOnMainBoard(mainBoard, targetTileXYZ.x, targetTileXYZ.y)) {
      miniBoard.putBack();
      return false;
    }

    // Custom moveable test
    if (this.moveableTestCallback) {
      if (direction === undefined) {
        direction = mainBoard.getNeighborTileDirection(myTileXYZ, targetTileXYZ);
      }
      if (this.moveableTestScope) {
        var moveable = this.moveableTestCallback.call(this.moveableTestScope, myTileXYZ, targetTileXYZ, direction, mainBoard);
      } else {
        var moveable = this.moveableTestCallback(myTileXYZ, targetTileXYZ, direction, mainBoard);
      }
      if (!moveable) {
        miniBoard.putBack();
        return false;
      }
    }
    miniBoard.putBack();
    return true;
  };
  var myTileXYZ = {
    x: 0,
    y: 0,
    z: 0
  };
  var targetTileXYZ = {
    x: 0,
    y: 0,
    z: 0
  };

  var MoveToTile = function MoveToTile(tileX, tileY, direction) {
    var miniBoard = this.parent;
    var mainBoard = miniBoard.mainBoard;
    // Not on a mainBoard
    if (mainBoard == null) {
      this.lastMoveResult = false;
      return this;
    }
    if (tileX != null && typeof tileX !== 'number') {
      var config = tileX;
      tileX = GetValue$c(config, 'x', undefined);
      tileY = GetValue$c(config, 'y', undefined);
      direction = GetValue$c(config, 'direction', undefined);
    }
    myTileXY.x = miniBoard.tileX;
    myTileXY.y = miniBoard.tileY;
    if (direction !== undefined && tileX == null || tileY == null) {
      // Get neighbor tile position if direction is not undefined
      var out = mainBoard.getNeighborTileXY(myTileXY, direction, true);
      if (out !== null) {
        tileX = out.x;
        tileY = out.y;
      } else {
        tileX = null;
        tileY = null;
      }
    }

    // invalid tile position
    if (tileX == null || tileY == null) {
      this.lastMoveResult = false;
      return this;
    }
    if (direction === undefined) {
      targetTileXY$1.x = tileX;
      targetTileXY$1.y = tileY;
      direction = board.getNeighborTileDirection(myTileXY, targetTileXY$1);
    }
    if (!this.canMoveTo(tileX, tileY, direction)) {
      this.lastMoveResult = false;
      return this;
    }
    this.destinationTileX = tileX;
    this.destinationTileY = tileY;
    this.destinationDirection = direction;

    // Not support wrap mode
    var out = mainBoard.tileXYToWorldXY(tileX, tileY, true);
    this.moveToTask.moveTo(out.x, out.y);
    miniBoard.putOnMainBoard(mainBoard, tileX, tileY, false);
    this.isRunning = true;
    this.lastMoveResult = true;
    return this;
  };
  var myTileXY = {};
  var targetTileXY$1 = {};

  var MoveToward = function MoveToward(direction) {
    this.moveTo(undefined, undefined, direction);
    return this;
  };

  var MoveToRandomNeighbor = function MoveToRandomNeighbor() {
    var miniBoard = this.parent;
    var mainBoard = miniBoard.mainBoard;
    // Not on a mainBoard
    if (mainBoard == null) {
      this.lastMoveResult = false;
      return this;
    }
    var directions = mainBoard.grid.allDirections;
    if (globDirections.length !== directions.length) {
      Clone(directions, globDirections);
    }
    Shuffle(globDirections);
    for (var i = 0, cnt = globDirections.length; i < cnt; i++) {
      this.moveToward(globDirections[i]);
      if (this.lastMoveResult) {
        return this;
      }
    }
    return this;
  };
  var globDirections = [];

  var MoveTo = /*#__PURE__*/function (_TickTask) {
    _inherits(MoveTo, _TickTask);
    function MoveTo(miniBoard, config) {
      var _this;
      _classCallCheck(this, MoveTo);
      _this = _callSuper(this, MoveTo, [miniBoard, config]);
      // this.parent = miniBoard;

      _this.moveToTask = new MoveTo$2(miniBoard, {
        tickingMode: 0
      });
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(MoveTo, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isRunning = GetValue$c(o, 'isRunning', false);
        this.setEnable(GetValue$c(o, 'enable', true));
        this.timeScale = GetValue$c(o, 'timeScale', 1);
        this.setSpeed(GetValue$c(o, 'speed', 400));
        this.destinationTileX = GetValue$c(o, 'destinationTileX', null);
        this.destinationTileY = GetValue$c(o, 'destinationTileY', null);
        this.destinationDirection = GetValue$c(o, 'destinationDirection', null);
        this.lastMoveResult = GetValue$c(o, 'lastMoveResult', undefined);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          isRunning: this.isRunning,
          enable: this.enable,
          timeScale: this.timeScale,
          speed: this.speed,
          moveableTest: this.moveableTestCallback,
          moveableTestScope: this.moveableTestScope,
          destinationTileX: this.destinationTileX,
          destinationTileY: this.destinationTileY,
          destinationDirection: this.destinationDirection,
          lastMoveResult: this.lastMoveResult,
          tickingMode: this.tickingMode
        };
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.moveToTask.shutdown(fromScene);
        _get(_getPrototypeOf(MoveTo.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this.moveToTask.enable;
      },
      set: function set(value) {
        this.moveToTask.setEnable(value);
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
      key: "timeScale",
      get: function get() {
        return this.moveToTask.timeScale;
      },
      set: function set(value) {
        this.moveToTask.timeScale = value;
      }
    }, {
      key: "speed",
      get: function get() {
        return this.moveToTask.speed;
      },
      set: function set(value) {
        this.moveToTask.setSpeed(value);
      }
    }, {
      key: "setSpeed",
      value: function setSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "moveAlongLine",
      value: function moveAlongLine(startX, startY, endX, endY) {
        if (startX !== undefined) {
          this.parent.x = startX;
        }
        if (startY !== undefined) {
          this.parent.y = startY;
        }
        this.moveToTask.moveTo(endX, endY);
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable) {
          return this;
        }
        var moveToTask = this.moveToTask;
        moveToTask.update(time, delta);
        if (!moveToTask.isRunning) {
          this.complete();
          return this;
        }
        return this;
      }
    }]);
    return MoveTo;
  }(SceneUpdateTickTask);
  var methods$1 = {
    canMoveTo: CanMoveToTile,
    moveTo: MoveToTile,
    moveToward: MoveToward,
    moveToRandomNeighbor: MoveToRandomNeighbor
  };
  Object.assign(MoveTo.prototype, methods$1);

  ObjectFactory.register('moveTo', function (gameObject, config) {
    var klass = IsMiniBoardObject(gameObject) ? MoveTo : MoveTo$1;
    return new klass(gameObject, config);
  });
  SetValue(window, 'RexPlugins.Board.MoveTo', MoveTo$1);
  SetValue(window, 'RexPlugins.Board.MiniBoardMoveTo', MoveTo);

  var MatchBoard = function MatchBoard(pattern, callback, scope, getFirst) {
    // pattern: pattern list or repeat count
    var board = this.board,
      grid = board.grid;
    var directions = grid.halfDirections,
      dir,
      dirMask = this.dirMask;
    var width = board.width,
      height = board.height;
    var result, isBreak;
    for (var i = 0, cnt = directions.length; i < cnt; i++) {
      dir = directions[i];
      if (dirMask[dir] === false) {
        continue;
      }
      for (var tileY = 0; tileY < height; tileY++) {
        for (var tileX = 0; tileX < width; tileX++) {
          result = this.matchAtDir(pattern, tileX, tileY, dir);
          if (result === false) {
            continue;
          }
          if (callback) {
            if (scope) {
              isBreak = callback.call(scope, result, board);
            } else {
              isBreak = callback(result, board);
            }
          }
          if (getFirst) {
            return result;
          }
          if (isBreak) {
            break;
          }
        }
        if (isBreak) {
          break;
        }
      }
    }
    return this;
  };

  var MatchAtDir = function MatchAtDir(pattern, startTileX, startTileY, direction) {
    // pattern: pattern list or repeat count
    var matchNMode = typeof pattern === 'number';
    var patternLength;
    if (matchNMode) {
      patternLength = pattern;
      pattern = null;
    } else {
      patternLength = pattern.length;
    }
    var symbol,
      wildcard = this.wildcard;
    var curTileXY;
    var board = this.board;
    var matchedTileXY = result.tileXY;
    matchedTileXY.length = 0;
    for (var i = 0; i < patternLength; i++) {
      if (curTileXY === undefined) {
        curTileXY = {
          x: startTileX,
          y: startTileY
        };
      } else {
        // get next tileXY 
        curTileXY = board.getNeighborTileXY(curTileXY, direction, curTileXY);
        if (curTileXY === null) {
          return false;
        }
      }
      symbol = this.getSymbol(curTileXY.x, curTileXY.y);
      if (symbol == null) {
        return false;
      }
      if (symbol !== wildcard) {
        if (matchNMode) {
          if (pattern === null) {
            pattern = symbol;
          } else if (pattern !== symbol) {
            return false;
          }
        } else if (pattern[i] !== symbol) {
          // pattern list mode
          return false;
        }
      }
      matchedTileXY.push({
        x: curTileXY.x,
        y: curTileXY.y
      });
    }
    result.direction = direction;
    result.pattern = pattern;
    return result;
  };
  var result = {
    tileXY: [],
    direction: undefined,
    pattern: undefined
  };

  var Group = function Group(startTileX, startTileY, out) {
    if (out === undefined) {
      out = [];
    }
    var board = this.board;
    var wildcard = this.wildcard;
    var targetSymbol = this.getSymbol(startTileX, startTileY);
    if (targetSymbol == null || targetSymbol === wildcard) {
      return out;
    }
    if (globalQueue === undefined) {
      globalQueue = new Queue();
    }
    var curTileXY, symbol;
    globalQueue.push(startTileX, startTileY);
    while (globalQueue.length) {
      curTileXY = globalQueue.pop();
      symbol = this.getSymbol(curTileXY.x, curTileXY.y);
      if (symbol === targetSymbol || symbol === wildcard) {
        out.push(curTileXY);
        globalQueue.push(board.getNeighborTileXY(curTileXY));
      }
    }
    globalQueue.clear();
    return out;
  };
  var Queue = /*#__PURE__*/function () {
    function Queue() {
      _classCallCheck(this, Queue);
      this.data = [];
      this.visited = {};
    }
    _createClass(Queue, [{
      key: "push",
      value: function push(x, y) {
        if (IsArray(x)) {
          var xyArray = x;
          for (var i = 0, cnt = xyArray.length; i < cnt; i++) {
            this.push(xyArray[i]);
          }
          return this;
        }
        if (IsPlainObject(x)) {
          var xy = x;
          x = xy.x;
          y = xy.y;
        }
        var key = "".concat(x, ",").concat(y);
        if (this.visited.hasOwnProperty(key)) {
          return this;
        }
        this.data.push({
          x: x,
          y: y
        });
        this.visited[key] = true;
        return this;
      }
    }, {
      key: "pop",
      value: function pop() {
        return this.data.pop();
      }
    }, {
      key: "length",
      get: function get() {
        return this.data.length;
      }
    }, {
      key: "clear",
      value: function clear() {
        Clear(this.data);
        Clear(this.visited);
        return this;
      }
    }]);
    return Queue;
  }();
  var globalQueue;

  var Methods$4 = {
    match: MatchBoard,
    matchAtDir: MatchAtDir,
    group: Group
  };

  var IsFunction = function IsFunction(obj) {
    return obj && typeof obj === 'function';
  };

  var Match = /*#__PURE__*/function () {
    function Match(config) {
      _classCallCheck(this, Match);
      this.symbols = []; // tileX+(tileY*board.width)
      this.dirMask = {};
      this.resetFromJSON(config);
      this.boot();
    }
    _createClass(Match, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setBoard(GetValue$c(o, 'board', undefined));
        this.setWildcard(GetValue$c(o, 'wildcard', undefined));
        var dirMask = GetValue$c(o, 'dirMask', undefined);
        if (dirMask !== undefined) {
          this.setDirMask(dirMask);
        }
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {}
    }, {
      key: "shutdown",
      value: function shutdown() {
        this.board = undefined;
        this.symbols = undefined;
        this.dirMask = undefined;
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
        return this;
      }
    }, {
      key: "setBoard",
      value: function setBoard(board) {
        this.board = board;
        if (board) {
          this.clearSymbols();
        }
        return this;
      }
    }, {
      key: "setDirMask",
      value: function setDirMask(dir, value) {
        if (IsPlainObject(dir)) {
          var dirMask = dir;
          for (dir in dirMask) {
            this.dirMask[dir] = dirMask[dir];
          }
        } else {
          this.dirMask[dir] = value;
        }
        return this;
      }
    }, {
      key: "setDirectionMode",
      value: function setDirectionMode(mode) {
        this.board.grid.setDirectionMode(mode);
        return this;
      }
    }, {
      key: "clearSymbols",
      value: function clearSymbols() {
        this.refreshSymbols(null);
        return this;
      }
    }, {
      key: "setSymbol",
      value: function setSymbol(tileX, tileY, symbol) {
        var board = this.board;
        if (!board.contains(tileX, tileY)) {
          return this;
        }
        this.symbols[this.tileXYToKey(tileX, tileY)] = symbol;
        return this;
      }
    }, {
      key: "getSymbol",
      value: function getSymbol(tileX, tileY) {
        return this.symbols[this.tileXYToKey(tileX, tileY)];
      }
    }, {
      key: "forEach",
      value: function forEach(callback, scope) {
        var board = this.board;
        var tileXY, symbol;
        var isBreak;
        for (var i = 0, cnt = this.symbols.length; i < cnt; i++) {
          symbol = this.symbols[i];
          tileXY = this.keyToTileXY(i);
          if (scope) {
            isBreak = callback.call(scope, tileXY, symbol, board);
          } else {
            isBreak = callback(tileXY, symbol, board);
          }
          if (isBreak) {
            break;
          }
        }
        return this;
      }
    }, {
      key: "refreshSymbols",
      value: function refreshSymbols(callback, scope) {
        var board = this.board;
        var width = board.width,
          height = board.height;
        this.symbols.length = width * height;
        var symbol, tileXY;
        if (IsFunction(callback)) {
          // Get symbol by callback
          for (var i = 0, cnt = this.symbols.length; i < cnt; i++) {
            tileXY = this.keyToTileXY(i, true);
            if (scope) {
              symbol = callback.call(scope, tileXY, board);
            } else {
              symbol = callback(tileXY, board);
            }
            this.symbols[i] = symbol;
          }
        } else {
          // Fill a given symbol
          symbol = callback;
          for (var i = 0, cnt = this.symbols.length; i < cnt; i++) {
            this.symbols[i] = symbol;
          }
        }
        return this;
      }
    }, {
      key: "setWildcard",
      value: function setWildcard(symbol) {
        this.wildcard = symbol;
        return this;
      }
    }, {
      key: "tileXYToKey",
      value: function tileXYToKey(tileX, tileY) {
        return tileX + tileY * this.board.width;
      }
    }, {
      key: "keyToTileXY",
      value: function keyToTileXY(key, out) {
        if (out === undefined) {
          out = {};
        } else if (out === true) {
          out = globTileXY;
        }
        var width = this.board.width;
        out.x = key % width;
        out.y = Math.floor(key / width);
        return out;
      }
    }, {
      key: "anyMatch",
      value: function anyMatch(pattern) {
        return this.match(pattern, null, null, true);
      }
    }]);
    return Match;
  }();
  var globTileXY = {
    x: 0,
    y: 0
  };
  Object.assign(Match.prototype, Methods$4);

  ObjectFactory.register('match', function (config) {
    return new Match(config);
  });
  SetValue(window, 'RexPlugins.Board.Match', Match);

  var Stack = /*#__PURE__*/function () {
    function Stack() {
      _classCallCheck(this, Stack);
      this.items = [];
    }
    _createClass(Stack, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.items = undefined;
      }
    }, {
      key: "pop",
      value: function pop() {
        return this.items.length > 0 ? this.items.pop() : null;
      }
    }, {
      key: "push",
      value: function push(l) {
        this.items.push(l);
        return this;
      }
    }, {
      key: "pushMultiple",
      value: function pushMultiple(arr) {
        this.items.push.apply(this.items, arr);
        arr.length = 0;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items.length = 0;
        return this;
      }
    }]);
    return Stack;
  }();

  var Node = /*#__PURE__*/function () {
    function Node() {
      _classCallCheck(this, Node);
      this.preNodes = [];
      this.manager = undefined;
    }
    _createClass(Node, [{
      key: "reset",
      value: function reset(manager) {
        this.manager = manager;
        // overwrite
        this.sn = undefined; // for sorting by created order        
        this.key = undefined;
        this.x = undefined;
        this.y = undefined;
        this.isTileXYZ = true;
        // overwrite

        this._px = undefined;
        this._py = undefined;
        this.cost = undefined; // cost cache
        this.f = 0;
        this.g = 0; // path cost
        this.h = 0;
        this.closerH = 0;
        this.visited = false;
        this.closed = false;
        this.preNodes.length = 0;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.preNodes.length = 0;
        this.manager = undefined;
      }
    }, {
      key: "heuristic",
      value: function heuristic(endNode, pathMode, baseNode) {
        if (pathMode === null) {
          return 0;
        }
        var h,
          dist = this.board.getDistance(endNode, this, true) * this.pathFinder.weight;
        if (pathMode === 1 && baseNode !== undefined) {
          var deltaAngle = endNode.angleTo(baseNode) - this.angleTo(baseNode);
          h = dist + Math.abs(deltaAngle);
        } else if (pathMode === 2) {
          h = dist + Math.random();
        } else {
          h = dist;
        }
        return h;
      }
    }, {
      key: "getNeighborNodes",
      value: function getNeighborNodes() {
        var neighborsTileXY = this.board.getNeighborTileXY(this);
        if (this.pathFinder.shuffleNeighbors) {
          Shuffle(neighborsTileXY);
        }
        var node,
          neighborNodes = [];
        for (var i = 0, cnt = neighborsTileXY.length; i < cnt; i++) {
          node = this.manager.getNode(neighborsTileXY[i], true);
          neighborNodes.push(node);
        }
        return neighborNodes;
      }
    }, {
      key: "getCost",
      value: function getCost(preNode) {
        if (this.pathFinder.cacheCost) {
          if (this.cost === undefined) {
            this.cost = this.pathFinder.getCost(this, preNode);
          }
        } else {
          this.cost = this.pathFinder.getCost(this, preNode);
        }
        return this.cost;
      }
    }, {
      key: "angleTo",
      value: function angleTo(endNode) {
        return Between$1(this.worldX, this.worldY, endNode.worldX, endNode.worldY);
      }
    }, {
      key: "pathFinder",
      get: function get() {
        return this.manager.pathFinder;
      }
    }, {
      key: "board",
      get: function get() {
        return this.manager.pathFinder.board;
      }
    }, {
      key: "worldX",
      get: function get() {
        if (this._px === undefined) {
          this._px = this.board.tileXYToWorldX(this.x, this.y);
        }
        return this._px;
      }
    }, {
      key: "worldY",
      get: function get() {
        if (this._py === undefined) {
          this._py = this.board.tileXYToWorldY(this.x, this.y);
        }
        return this._py;
      }
    }, {
      key: "pathCost",
      get: function get() {
        return this.g;
      }
    }]);
    return Node;
  }();

  // global object
  var NodesPool = new Stack(); // recycle dead nodes
  // global object
  var NodeCache = /*#__PURE__*/function () {
    function NodeCache(pathFinder) {
      _classCallCheck(this, NodeCache);
      this.sn = 0;
      this.pool = NodesPool;
      this.nodes = {}; // {tileXYKey:node}
      this.pathFinder = pathFinder;
      this.closestNode = null;
    }
    _createClass(NodeCache, [{
      key: "destroy",
      value: function destroy() {
        this.freeAllNodes();
        this.pathFinder = null;
        this.pool = undefined;
        return this;
      }
    }, {
      key: "getNode",
      value: function getNode(tileX, tileY, createNewNode) {
        var key;
        switch (_typeof(tileX)) {
          case 'number':
            // (tileX, tileY, createNewNode)
            key = TileXYToKey(tileX, tileY);
            break;
          case 'string':
            // (key, createNewNode)
            key = tileX;
            createNewNode = tileY;
            break;
          default:
            // (tileXY, createNewNode)
            var tileXY = tileX;
            createNewNode = tileY;
            tileX = tileXY.x;
            tileY = tileXY.y;
            key = TileXYToKey(tileX, tileY);
            break;
        }
        if (createNewNode === undefined) {
          createNewNode = false;
        }
        this.sn++;
        if (!this.nodes.hasOwnProperty(key)) {
          if (!createNewNode) {
            return null;
          }
          var node = this.pool.pop();
          if (node === null) {
            node = new Node();
          }
          node.reset(this);
          node.sn = this.sn;
          node.key = key;
          node.x = tileX;
          node.y = tileY;
          this.nodes[key] = node;
        }
        return this.nodes[key];
      }
    }, {
      key: "freeAllNodes",
      value: function freeAllNodes() {
        this.closestNode = null;
        var nodes = this.nodes,
          pool = this.pool;
        var node;
        for (var key in nodes) {
          node = nodes[key];
          node.destroy();
          pool.push(node);
          delete nodes[key];
        }
        this.sn = 0;
        return this;
      }
    }, {
      key: "getAllNodes",
      value: function getAllNodes() {
        return this.nodes;
      }
    }]);
    return NodeCache;
  }();

  var BinaryHeap = /*#__PURE__*/function () {
    function BinaryHeap(scoreFunction) {
      _classCallCheck(this, BinaryHeap);
      this.content = [];
      this.scoreFunction = scoreFunction;
    }
    _createClass(BinaryHeap, [{
      key: "clear",
      value: function clear() {
        this.content.length = 0;
      }
    }, {
      key: "push",
      value: function push(element) {
        // Add the new element to the end of the array.
        this.content.push(element);

        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
      }
    }, {
      key: "pop",
      value: function pop() {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
          this.content[0] = end;
          this.bubbleUp(0);
        }
        return result;
      }
    }, {
      key: "remove",
      value: function remove(node) {
        var i = this.content.indexOf(node);

        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();
        if (i !== this.content.length - 1) {
          this.content[i] = end;
          if (this.scoreFunction(end) < this.scoreFunction(node)) {
            this.sinkDown(i);
          } else {
            this.bubbleUp(i);
          }
        }
      }
    }, {
      key: "size",
      value: function size() {
        return this.content.length;
      }
    }, {
      key: "rescoreElement",
      value: function rescoreElement(node) {
        this.sinkDown(this.content.indexOf(node));
      }
    }, {
      key: "sinkDown",
      value: function sinkDown(n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];

        // When at 0, an element can not sink any further.
        while (n > 0) {
          // Compute the parent element's index, and fetch it.
          var parentN = (n + 1 >> 1) - 1,
            parent = this.content[parentN];
          // Swap the elements if the parent is greater.
          if (this.scoreFunction(element) < this.scoreFunction(parent)) {
            this.content[parentN] = element;
            this.content[n] = parent;
            // Update 'n' to continue at the new position.
            n = parentN;
          }
          // Found a parent that is less, no need to sink any further.
          else {
            break;
          }
        }
      }
    }, {
      key: "bubbleUp",
      value: function bubbleUp(n) {
        // Look up the target element and its score.
        var length = this.content.length,
          element = this.content[n],
          elemScore = this.scoreFunction(element);
        while (true) {
          // Compute the indices of the child elements.
          var child2N = n + 1 << 1,
            child1N = child2N - 1;
          // This is used to store the new position of the element, if any.
          var swap = null,
            child1Score;
          // If the first child exists (is inside the array)...
          if (child1N < length) {
            // Look it up and compute its score.
            var child1 = this.content[child1N];
            child1Score = this.scoreFunction(child1);

            // If the score is less than our element's, we need to swap.
            if (child1Score < elemScore) {
              swap = child1N;
            }
          }

          // Do the same checks for the other child.
          if (child2N < length) {
            var child2 = this.content[child2N],
              child2Score = this.scoreFunction(child2);
            if (child2Score < (swap === null ? elemScore : child1Score)) {
              swap = child2N;
            }
          }

          // If the element needs to be moved, swap it, and continue.
          if (swap !== null) {
            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
          }
          // Otherwise, we are done.
          else {
            break;
          }
        }
      }
    }]);
    return BinaryHeap;
  }();

  var CONST$2 = {
    // a* search mode
    AREA_MODE: 16,
    PATH_MODE: 0,
    // path mode
    'random': 0,
    'diagonal': 1,
    'straight': 2,
    'line': 3,
    'A*': 10,
    'A*-random': 11,
    'A*-line': 12,
    // special cost
    'BLOCKER': null,
    // special moving point
    'INFINITY': undefined
  };

  /* 

  javascript-astar 0.3.0
  http://github.com/bgrins/javascript-astar
  Freely distributable under the MIT License.
  Implements the astar search algorithm in javascript using a Binary Heap.
  Includes Binary Heap (with modifications) from Marijn Haverbeke.
  http://eloquentjavascript.net/appendix2.html

  */

  var PATH_MODE$1 = CONST$2.PATH_MODE;
  var ASTAR$1 = CONST$2['A*'];
  var ASTAR_LINE$1 = CONST$2['A*-line'];
  var ASTAR_RANDOM$1 = CONST$2['A*-random'];
  var BLOCKER$5 = CONST$2.BLOCKER;
  var INFINITY$6 = CONST$2.INFINITY;

  // global object
  var gOpenHeap = new BinaryHeap(function (node) {
    return node.f;
  });
  // global object

  var AStarSerach = function AStarSerach(startTileXYZ, endTileXY, movingPoints, mode) {
    if (this.nodeManager === undefined) {
      this.nodeManager = new NodeCache(this);
    }
    var nodeManager = this.nodeManager;
    nodeManager.freeAllNodes();

    // const isAreaSearch = (mode === AREA_MODE);
    var isPathSearch = mode === PATH_MODE$1;
    var isAStarMode = this.pathMode === ASTAR$1 || this.pathMode === ASTAR_LINE$1 || this.pathMode === ASTAR_RANDOM$1;
    var astarHeuristicEnable = isPathSearch && isAStarMode;
    var shortestPathEnable = isPathSearch && !isAStarMode;
    var astarHeuristicMode = !astarHeuristicEnable ? null : this.pathMode == ASTAR$1 ? 0 : this.pathMode == ASTAR_LINE$1 ? 1 : this.pathMode == ASTAR_RANDOM$1 ? 2 : null;
    var end = endTileXY !== null ? nodeManager.getNode(endTileXY.x, endTileXY.y, true) : null;
    var start = nodeManager.getNode(startTileXYZ.x, startTileXYZ.y, true);
    start.h = start.heuristic(end, astarHeuristicMode);

    // NEAREST NODE
    var closestNode;
    if (isPathSearch) {
      closestNode = start;
      closestNode.closerH = closestNode.h || closestNode.heuristic(end, 0);
    }
    // NEAREST NODE

    gOpenHeap.push(start);
    while (gOpenHeap.size() > 0) {
      // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
      var curNode = gOpenHeap.pop();

      // End case -- result has been found, return the traced path.
      if (isPathSearch && curNode === end) {
        closestNode = end;
        break;
      }

      // Normal case -- move curNode from open to closed, process each of its neighbors.
      curNode.closed = true;

      // Find all neighbors for the current node.
      var neighbors = curNode.getNeighborNodes();
      var neighbor, neighborCost, isNeighborMoreCloser;
      for (var i = 0, cnt = neighbors.length; i < cnt; ++i) {
        neighbor = neighbors[i];
        neighborCost = neighbor.getCost(curNode);
        if (neighbor.closed || neighborCost === BLOCKER$5) {
          // Not a valid node to process, skip to next neighbor.
          //log("("+neighbor.x+","+neighbor.y+") is closed");
          continue;
        }

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        var gScore = curNode.g + neighborCost,
          beenVisited = neighbor.visited;

        //log("("+curNode.x+","+curNode.y+") -> ("+neighbor.x+","+neighbor.y+")="+neighborCost+" ,acc="+gScore);
        if (movingPoints != INFINITY$6 && gScore > movingPoints) {
          //log("("+neighbor.x+","+neighbor.y+") out of range");
          continue;
        }
        if (!beenVisited || gScore < neighbor.g) {
          // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
          neighbor.visited = true;
          neighbor.preNodes.length = 0;
          neighbor.preNodes.push(curNode);
          neighbor.h = neighbor.h || neighbor.heuristic(end, astarHeuristicMode, start);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;

          // NEAREST NODE
          if (isPathSearch) {
            neighbor.closerH = neighbor.h || neighbor.heuristic(end, 0);
            isNeighborMoreCloser = neighbor.closerH < closestNode.closerH || neighbor.closerH === closestNode.closerH && neighbor.g < closestNode.g;
            if (isNeighborMoreCloser) {
              closestNode = neighbor;
            }
          }
          // NEAREST NODE

          if (!beenVisited) {
            // Pushing to heap will put it in proper place based on the 'f' value.
            gOpenHeap.push(neighbor);
            //log("push ("+neighbor.x+","+neighbor.y+") ")
          } else {
            // Already seen the node, but since it has been rescored we need to reorder it in the heap
            gOpenHeap.rescoreElement(neighbor);
            //log("reorder ("+neighbor.x+","+neighbor.y+") ")
          }
        } else if (shortestPathEnable && gScore == neighbor.g) {
          neighbor.preNodes.push(curNode);

          //if (neighbor.preNodes.indexOf(curNode) == -1)                    
          //    neighbor.preNodes.push(curNode);                    
          //else                    
          //    debugger;                 

          //log("drop ("+neighbor.x+","+neighbor.y+") ")                
        } else ;
      }
    }
    nodeManager.closestNode = isPathSearch ? closestNode : null;
    gOpenHeap.clear();
    return this;
  };

  var BLOCKER$4 = CONST$2.BLOCKER;
  var GetCost$2 = function GetCost(curNode, preNode) {
    // Occupied test
    if (this.occupiedTest) {
      if (this.board.contains(curNode.x, curNode.y, this.chessData.tileXYZ.z)) {
        return BLOCKER$4;
      }
    }
    // Blocker test
    if (this.blockerTest) {
      if (this.board.hasBlocker(curNode.x, curNode.y)) {
        return BLOCKER$4;
      }
    }
    // Edge-blocker test
    if (this.edgeBlockerTest) ;
    if (typeof this.costCallback === 'number') {
      return this.costCallback;
    } else {
      var cost;
      if (this.costCallbackScope) {
        cost = this.costCallback.call(this.costCallbackScope, curNode, preNode, this);
      } else {
        cost = this.costCallback(curNode, preNode, this);
      }
      if (cost === undefined) {
        cost = BLOCKER$4;
      }
      return cost;
    }
  };

  var AREA_MODE = CONST$2.AREA_MODE;
  var INFINITY$5 = CONST$2.INFINITY; // undefined

  var FindArea = function FindArea(movingPoints, out) {
    if (out === undefined) {
      out = [];
    }
    if (this.board === null) {
      // chess is not in board
      return out;
    }
    if (movingPoints !== INFINITY$5 && movingPoints <= 0) {
      return out;
    }
    var startTileXYZ = this.chessData.tileXYZ,
      startTileX = startTileXYZ.x,
      startTileY = startTileXYZ.y;
    this.aStarSearch(startTileXYZ, null, movingPoints, AREA_MODE);
    // output : this.nodeManager.getAllNodes()
    var nodes = this.nodeManager.getAllNodes(),
      node,
      nodesList = [];
    for (var key in nodes) {
      node = nodes[key];
      // not include start node
      if (node.x === startTileX && node.y === startTileY) {
        continue;
      }
      // not include open node
      if (!node.closed) {
        continue;
      }
      nodesList.push(node);
    }
    // sort by sn (creating order)
    nodesList.sort(function (nodeA, nodeB) {
      var snA = nodeA.sn;
      var snB = nodeB.sn;
      return snA > snB ? 1 : snA < snB ? -1 : 0;
    });
    for (var i = 0, cnt = nodesList.length; i < cnt; i++) {
      node = nodesList[i];
      out.push({
        x: node.x,
        y: node.y,
        cost: node.g
      });
    }
    return out;
  };

  var RANDOM = CONST$2['random'];
  var DIAGONAL = CONST$2['diagonal'];
  var STRAIGN = CONST$2['straight'];
  var LINE = CONST$2['line'];
  var ASTAR = CONST$2['A*'];
  var ASTAR_LINE = CONST$2['A*-line'];
  var ASTAR_RANDOM = CONST$2['A*-random'];
  var GetNodePath = function GetNodePath(startNode, endNode, pathMode) {
    var board = startNode.board;
    var curDir, preNodeDir; // DIAGONAL, STRAIGN
    var targetAngle; // LINE

    var curNode = endNode,
      preNode,
      preNodeKeysCnt;
    var path = [];
    while (curNode.preNodes.length > 0) {
      path.push(curNode);
      preNodeKeysCnt = curNode.preNodes.length;
      switch (pathMode) {
        case ASTAR:
        case ASTAR_LINE:
        case ASTAR_RANDOM:
          preNode = curNode.preNodes[0];
          curNode = preNode;
          break;
        case RANDOM:
          preNode = preNodeKeysCnt === 1 ? curNode.preNodes[0] : curNode.preNodes[Between(0, preNodeKeysCnt - 1)];
          curNode = preNode;
          break;
        case DIAGONAL:
          for (var i = 0; i < preNodeKeysCnt; i++) {
            preNode = curNode.preNodes[i];
            preNodeDir = board.getNeighborTileDirection(curNode, preNode);
            if (preNodeDir !== curDir) {
              curDir = preNodeDir;
              break;
            }
          }
          curNode = preNode;
          break;
        case STRAIGN:
          for (i = 0; i < preNodeKeysCnt; i++) {
            preNode = curNode.preNodes[i];
            preNodeDir = board.getNeighborTileDirection(curNode, preNode);
            if (preNodeDir === curDir) {
              break;
            }
          }
          curDir = preNodeDir;
          curNode = preNode;
          break;
        case LINE:
          if (targetAngle === undefined) {
            targetAngle = endNode.angleTo(startNode);
          }
          if (preNodeKeysCnt === 1) {
            preNode = curNode.preNodes[0];
            curNode = preNode;
            targetAngle = endNode.angleTo(curNode);
          } else {
            preNode = curNode.preNodes[0];
            var deltaAngle = Math.abs(endNode.angleTo(preNode) - targetAngle);
            var preNodeB, deltaAngleB;
            for (var i = 1; i < preNodeKeysCnt; i++) {
              preNodeB = curNode.preNodes[i];
              deltaAngleB = Math.abs(endNode.angleTo(preNodeB) - targetAngle);
              if (deltaAngleB < deltaAngle) {
                preNode = preNodeB;
              }
            }
            curNode = preNode;
          }
          break;
      }
    }
    return path.reverse();
  };

  var GetPath$1 = function GetPath(endTileXY, out) {
    if (out === undefined) {
      out = [];
    }
    if (this.board === undefined) {
      return out;
    }
    var nodeManager = this.nodeManager;
    if (nodeManager === undefined) {
      return out;
    }
    var startNode = nodeManager.getNode(this.chessData.tileXYZ, false);
    var endNode = nodeManager.getNode(endTileXY, false);
    if (startNode === null || endNode === null) {
      return out;
    }
    var nodes = GetNodePath(startNode, endNode, this.pathMode);
    var node;
    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
      node = nodes[i];
      out.push({
        x: node.x,
        y: node.y,
        cost: node.g
      });
    }
    return out;
  };

  var PATH_MODE = CONST$2.PATH_MODE;
  var INFINITY$4 = CONST$2.INFINITY; // undefined

  var FindPath = function FindPath(endTileXY, movingPoints, isClosest, out) {
    if (isClosest === undefined) {
      isClosest = true;
    }
    if (out === undefined) {
      out = [];
    }
    if (this.board === null) {
      // chess is not in board
      return out;
    }
    if (movingPoints !== INFINITY$4 && movingPoints <= 0) {
      return out;
    }
    var startTileXYZ = this.chessData.tileXYZ;
    this.aStarSearch(startTileXYZ, endTileXY, movingPoints, PATH_MODE);
    var nodeManager = this.nodeManager;
    var endNode = isClosest ? nodeManager.closestNode : nodeManager.getNode(endTileXY);
    if (endNode === null) {
      return out;
    }
    return this.getPath(endNode, out);
  };

  var TileXYToCost = function TileXYToCost(tileX, tileY, pathCost) {
    if (this.nodeManager === undefined) {
      return null;
    }
    var node = this.nodeManager.getNode(tileX, tileY);
    if (node === null) {
      return null;
    }
    if (pathCost === undefined) {
      pathCost = true;
    }
    return pathCost ? node.g : node.cost;
  };

  var Methods$3 = {
    aStarSearch: AStarSerach,
    getCost: GetCost$2,
    findArea: FindArea,
    getPath: GetPath$1,
    findPath: FindPath,
    tileXYToCost: TileXYToCost
  };

  var BLOCKER$3 = CONST$2.BLOCKER;
  var INFINITY$3 = CONST$2.INFINITY;
  var PathFinder = /*#__PURE__*/function (_ComponentBase) {
    _inherits(PathFinder, _ComponentBase);
    function PathFinder(gameObject, config) {
      var _this;
      _classCallCheck(this, PathFinder);
      if (IsPlainObject(gameObject)) {
        config = gameObject;
        gameObject = undefined;
      }
      _this = _callSuper(this, PathFinder, [gameObject, {
        eventEmitter: false
      }]);
      _this.setChess(gameObject);
      _this.nodeManager = undefined;
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(PathFinder, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        var costCallback = GetValue$c(o, 'costCallback', undefined);
        var costCallbackScope = GetValue$c(o, 'costCallbackScope', undefined);
        if (costCallback === undefined) {
          costCallback = GetValue$c(o, 'cost', 1);
        }
        this.setOccupiedTest(GetValue$c(o, 'occupiedTest', false));
        this.setBlockerTest(GetValue$c(o, 'blockerTest', false));
        this.setEdgeBlockerTest(GetValue$c(o, 'edgeBlockerTest', false));
        this.setCostFunction(costCallback, costCallbackScope);
        this.setPathMode(GetValue$c(o, 'pathMode', 0));
        this.setCacheCostMode(GetValue$c(o, 'cacheCost', true));
        this.setWeight(GetValue$c(o, 'weight', 10));
        this.setShuffleNeighborsMode(GetValue$c(o, 'shuffleNeighbors', false));
        return this;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        if (this.nodeManager !== undefined) {
          this.nodeManager.destroy();
        }
        this.chessData = undefined;
        _get(_getPrototypeOf(PathFinder.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "gameObject",
      get: function get() {
        return this.parent;
      }
    }, {
      key: "setChess",
      value: function setChess(gameObject) {
        if (gameObject) {
          this.chessData = GetChessData(gameObject);
          if (this.parent !== gameObject) {
            // Remove attatched event from previous gameObject
            if (this.parent && this.parent.once) {
              this.parent.off('destroy', this.onParentDestroy, this);
            }
            // Attach event
            this.setParent(gameObject);
            if (this.parent && this.parent.once) {
              this.parent.once('destroy', this.onParentDestroy, this);
            }
          }
        } else {
          this.setParent();
          this.chessData = undefined;
        }
        return this;
      }
    }, {
      key: "setCostFunction",
      value: function setCostFunction(callback, scope) {
        this.costCallback = callback;
        this.costCallbackScope = scope;
        return this;
      }
    }, {
      key: "setPathMode",
      value: function setPathMode(mode) {
        if (typeof mode === 'string') {
          mode = CONST$2[mode];
        }
        this.pathMode = mode;
        return this;
      }
    }, {
      key: "setCacheCostMode",
      value: function setCacheCostMode(value) {
        if (value === undefined) {
          value = true;
        }
        this.cacheCost = value;
        return this;
      }
    }, {
      key: "setOccupiedTest",
      value: function setOccupiedTest(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.occupiedTest = enable;
        return this;
      }
    }, {
      key: "setBlockerTest",
      value: function setBlockerTest(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.blockerTest = enable;
        return this;
      }
    }, {
      key: "setEdgeBlockerTest",
      value: function setEdgeBlockerTest(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.edgeBlockerTest = enable;
        return this;
      }
    }, {
      key: "setWeight",
      value: function setWeight(value) {
        this.weight = value;
        return this;
      }
    }, {
      key: "setShuffleNeighborsMode",
      value: function setShuffleNeighborsMode(value) {
        if (value === undefined) {
          value = true;
        }
        this.shuffleNeighbors = value;
        return this;
      }
    }, {
      key: "BLOCKER",
      get: function get() {
        return BLOCKER$3;
      }
    }, {
      key: "INFINITY",
      get: function get() {
        return INFINITY$3;
      }
    }, {
      key: "board",
      get: function get() {
        return this.chessData.board;
      }
    }]);
    return PathFinder;
  }(ComponentBase);
  Object.assign(PathFinder.prototype, Methods$3);

  ObjectFactory.register('pathFinder', function (gameObject, config) {
    return new PathFinder(gameObject, config);
  });
  SetValue(window, 'RexPlugins.Board.PathFinder', PathFinder);

  var PreTest = function PreTest(tileXYArray, visiblePoints) {
    if (this.occupiedTest || this.blockerTest || this.edgeBlockerTest) {
      var myTileZ = this.chessData.tileXYZ.z;
      var tileXY;
      for (var i = 1, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        // Occupied test
        if (this.occupiedTest) {
          if (this.board.contains(tileXY.x, tileXY.y, myTileZ)) {
            return false;
          }
        }
        // Blocker test
        if (this.blockerTest) {
          if (this.board.hasBlocker(tileXY.x, tileXY.y)) {
            return false;
          }
        }
        // Edge-blocker test
        if (this.edgeBlockerTest) ;
      }
    }
    if (this.preTestCallback) {
      if (this.preTestCallbackScope) {
        return this.preTestCallback.call(this.preTestCallbackScope, tileXYArray, visiblePoints, this);
      } else {
        return this.preTestCallback(tileXYArray, visiblePoints, this);
      }
    }
    return true;
  };

  var GetCost$1 = function GetCost(curTileXY, tileXYArray) {
    if (typeof this.costCallback === 'number') {
      return this.costCallback;
    }
    if (this.costCallbackScope) {
      return this.costCallback.call(this.costCallbackScope, curTileXY, this, tileXYArray);
    } else {
      return this.costCallback(curTileXY, this, tileXYArray);
    }
  };

  var IsInCone = function IsInCone(targetTileXY) {
    if (this.cone === undefined) {
      return true;
    }
    var board = this.board;
    var myTileXYZ = this.chessData.tileXYZ;
    if (this.coneMode === 0) {
      // Direction
      return board.isDirectionInCone(myTileXYZ, targetTileXY, this.face, this.cone);
    } else {
      // Angle
      return board.isAngleInCone(myTileXYZ, targetTileXY, this.faceAngle, this.coneRad);
    }
  };

  var CONST$1 = {
    // special cost
    'BLOCKER': null,
    // special moving point
    'INFINITY': undefined
  };

  var BLOCKER$2 = CONST$1.BLOCKER;
  var INFINITY$2 = CONST$1.INFINITY;
  var IsPathVisible = function IsPathVisible(tileXYArray, visiblePoints) {
    if (this.preTest(tileXYArray, visiblePoints) === false) {
      return false;
    }
    if (this.costCallback === undefined) {
      return true;
    }
    var myTileXYZ = this.chessData.tileXYZ;
    var tileXY,
      cost,
      behindBlocker = false;
    for (var i = 1, cnt = tileXYArray.length; i < cnt; i++) {
      tileXY = tileXYArray[i];
      if (AreTileXYEqual(myTileXYZ, tileXY)) {
        continue;
      }
      if (behindBlocker) {
        return false;
      }
      cost = this.getCost(tileXY, tileXYArray);
      if (cost === BLOCKER$2) {
        behindBlocker = true;
        continue;
      }
      if (visiblePoints !== INFINITY$2) {
        visiblePoints -= cost;
        if (visiblePoints < 0) {
          return false;
        }
      }
    }
    return true;
  };

  var AreTileXYArrayEqual = function AreTileXYArrayEqual(tileArrayA, tileArrayB) {
    if (tileArrayA.length !== tileArrayB.length) {
      return false;
    } else {
      for (var i = 0, cnt = tileArrayA.length; i < cnt; i++) {
        if (!AreTileXYEqual(tileArrayA[i], tileArrayB[i])) {
          return false;
        }
      }
      return true;
    }
  };

  var INFINITY$1 = CONST$1.INFINITY;
  var LINEOFFSET = 0.001;
  var IsInLOS = function IsInLOS(chess, visiblePoints, originTileXY) {
    // chess: chess object or tileXY
    if (visiblePoints !== INFINITY$1 && visiblePoints <= 0) {
      return false;
    }
    var board = this.board;
    var targetTileXY = board.chessToTileXYZ(chess);
    if (!this.isInCone(targetTileXY)) {
      return false;
    }
    if (originTileXY === undefined) {
      originTileXY = this.chessData.tileXYZ;
    }
    if (this.debugLog) {
      console.log('Visible test from (' + originTileXY.x + ',' + originTileXY.y + ') to (' + targetTileXY.x + ',' + targetTileXY.y + ')');
    }
    if (!globTileXYArray0) {
      globTileXYArray0 = [];
      globTileXYArray1 = [];
    }
    var out = board.tileXYToWorldXY(originTileXY.x, originTileXY.y, true);
    var startX = out.x,
      startY = out.y;
    out = board.tileXYToWorldXY(targetTileXY.x, targetTileXY.y, true);
    var endX = out.x,
      endY = out.y;
    var lineAngle = Between$1(startX, startY, endX, endY),
      offsetX,
      offsetY,
      isVisivle;

    // Shift a small distance
    lineAngle += Math.PI / 2;
    offsetX = LINEOFFSET * Math.cos(lineAngle);
    offsetY = LINEOFFSET * Math.sin(lineAngle);
    var x0 = startX + offsetX,
      y0 = startY + offsetY,
      x1 = endX + offsetX,
      y1 = endY + offsetY;
    board.lineToTileXYArray(x0, y0, x1, y1, globTileXYArray0);
    if (this.debugLog) {
      console.log('Line 0: ' + JSON.stringify(globTileXYArray0));
    }
    isVisivle = this.isPathVisible(globTileXYArray0, visiblePoints);
    if (isVisivle) {
      globTileXYArray0.length = 0;
      DrawLine(this.debugGraphics, this.debugVisibleLineColor, startX, startY, endX, endY);
      return true;
    }

    // Shift a small distance
    lineAngle += Math.PI;
    offsetX = LINEOFFSET * Math.cos(lineAngle);
    offsetY = LINEOFFSET * Math.sin(lineAngle);
    var x0 = startX + offsetX,
      y0 = startY + offsetY,
      x1 = endX + offsetX,
      y1 = endY + offsetY;
    board.lineToTileXYArray(x0, y0, x1, y1, globTileXYArray1);
    if (this.debugLog) {
      console.log('Line 1: ' + JSON.stringify(globTileXYArray1));
    }
    // No need do visible checking if path is the same as previous one
    if (!AreTileXYArrayEqual(globTileXYArray0, globTileXYArray1)) {
      isVisivle = this.isPathVisible(globTileXYArray1, visiblePoints);
    }
    globTileXYArray0.length = 0;
    globTileXYArray1.length = 0;
    DrawLine(this.debugGraphics, isVisivle ? this.debugVisibleLineColor : this.debugInvisibleLineColor, startX, startY, endX, endY);
    return isVisivle;
  };
  var DrawLine = function DrawLine(graphics, color, startX, startY, endX, endY) {
    if (graphics && color !== undefined) {
      graphics.lineStyle(1, color, 1).lineBetween(startX, startY, endX, endY);
    }
  };
  var globTileXYArray0, globTileXYArray1;

  var LOS = function LOS(chessArray, visiblePoints, originTileXY, out) {
    // chessArray: array of chess object or tileXY
    if (!IsArray(chessArray)) {
      var chess = chessArray;
      return this.isInLOS(chess, visiblePoints, originTileXY);
    } else {
      if (IsPlainObject(visiblePoints)) {
        out = originTileXY;
        originTileXY = visiblePoints;
        visiblePoints = undefined;
      } else if (IsArray(visiblePoints)) {
        out = visiblePoints;
        visiblePoints = undefined;
        originTileXY = undefined;
      }
      if (IsArray(originTileXY)) {
        out = originTileXY;
        originTileXY = undefined;
      }
      if (out === undefined) {
        out = [];
      }
      var chess;
      for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
        chess = chessArray[i];
        if (!this.isInLOS(chess, visiblePoints, originTileXY)) {
          continue;
        }
        out.push(chess);
      }
      return out;
    }
  };

  var FindFOV = function FindFOV(visiblePoints, originTileXY, out) {
    if (IsPlainObject(visiblePoints)) {
      out = originTileXY;
      originTileXY = visiblePoints;
      visiblePoints = undefined;
    } else if (IsArray(visiblePoints)) {
      out = visiblePoints;
      originTileXY = undefined;
      visiblePoints = undefined;
    }
    if (IsArray(originTileXY)) {
      out = originTileXY;
      originTileXY = undefined;
    }
    if (out === undefined) {
      out = [];
    }
    var board = this.board;
    var myTileXYZ = this.chessData.tileXYZ,
      targetTileXY;
    var isAnyVisible, hasAnyTestingTileXY;
    var radius = 1;
    while (true) {
      isAnyVisible = false;
      hasAnyTestingTileXY = false;
      board.ringToTileXYArray(myTileXYZ, radius, globRing);
      for (var i = 0, cnt = globRing.length; i < cnt; i++) {
        targetTileXY = globRing[i];
        if (!board.contains(targetTileXY.x, targetTileXY.y)) {
          continue;
        }
        hasAnyTestingTileXY = true;
        if (this.isInLOS(targetTileXY, visiblePoints, originTileXY)) {
          isAnyVisible = true;
          out.push(targetTileXY);
        }
      }
      radius++;
      globRing.length = 0;
      if (!this.perspectiveEnable && !isAnyVisible) {
        if (!isAnyVisible) {
          break;
        }
      } else {
        if (!hasAnyTestingTileXY) {
          break;
        }
      }
    }
    return out;
  };
  var globRing = [];

  var Methods$2 = {
    preTest: PreTest,
    getCost: GetCost$1,
    isInCone: IsInCone,
    isPathVisible: IsPathVisible,
    isInLOS: IsInLOS,
    LOS: LOS,
    findFOV: FindFOV
  };

  var BLOCKER$1 = CONST$1.BLOCKER;
  var INFINITY = CONST$1.INFINITY;
  var FieldOfView = /*#__PURE__*/function (_ComponentBase) {
    _inherits(FieldOfView, _ComponentBase);
    function FieldOfView(gameObject, config) {
      var _this;
      _classCallCheck(this, FieldOfView);
      if (IsPlainObject(gameObject)) {
        config = gameObject;
        gameObject = undefined;
      }
      _this = _callSuper(this, FieldOfView, [gameObject, {
        eventEmitter: false
      }]);
      // No event emitter
      // this.parent = gameObject;

      _this.setChess(gameObject);
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(FieldOfView, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        // Pre-test
        var occupiedTest = GetValue$c(o, 'occupiedTest', false);
        var blockerTest = GetValue$c(o, 'blockerTest', false);
        var edgeBlockerTest = GetValue$c(o, 'edgeBlockerTest', false); // Unsupport now
        var preTestCallback = GetValue$c(o, 'preTestCallback', undefined);
        var preTestCallbackScope = GetValue$c(o, 'preTestCallbackScope', undefined);
        // Cost of each tile
        var costCallback = GetValue$c(o, 'costCallback', undefined);
        var costCallbackScope = GetValue$c(o, 'costCallbackScope', undefined);
        if (costCallback === undefined) {
          costCallback = GetValue$c(o, 'cost', undefined);
        }
        this.setFace(GetValue$c(o, 'face', 0));
        this.setConeMode(GetValue$c(o, 'coneMode', 0));
        this.setCone(GetValue$c(o, 'cone', undefined));
        this.setOccupiedTest(occupiedTest);
        this.setBlockerTest(blockerTest);
        this.setEdgeBlockerTest(edgeBlockerTest);
        this.setPreTestFunction(preTestCallback, preTestCallbackScope);
        this.setCostFunction(costCallback, costCallbackScope);
        this.setPerspectiveEnable(GetValue$c(o, 'perspective', false));
        this.setDebugGraphics(GetValue$c(o, 'debug.graphics', undefined));
        this.setDebugLineColor(GetValue$c(o, 'debug.visibleLineColor', 0x00ff00), GetValue$c(o, 'debug.invisibleLineColor', 0xff0000));
        this.setDebugLog(GetValue$c(o, 'debug.log', false));
        return this;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.debugGraphics = undefined;
        this.chessData = undefined;
        _get(_getPrototypeOf(FieldOfView.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setChess",
      value: function setChess(gameObject) {
        if (gameObject) {
          this.chessData = GetChessData(gameObject);
          if (this.parent !== gameObject) {
            // Remove attatched event from previous gameObject
            if (this.parent && this.parent.once) {
              this.parent.off('destroy', this.onParentDestroy, this);
            }
            // Attach event
            this.setParent(gameObject);
            if (this.parent && this.parent.once) {
              this.parent.once('destroy', this.onParentDestroy, this);
            }
          }
        } else {
          this.setParent();
          this.chessData = undefined;
        }
        return this;
      }
    }, {
      key: "face",
      get: function get() {
        return this._face;
      },
      set: function set(direction) {
        if (!this.chessData) {
          if (this._face === undefined) {
            this._face = 0;
          }
          return;
        }
        direction = this.board.grid.directionNormalize(direction);
        this._face = direction;
        if (this.coneMode === 0) ; else {
          // Angle
          var angle = this.board.angleToward(this.chessData.tileXYZ, direction); // -PI~PI
          this.faceAngle = Normalize(angle); // 0~2PI
        }
      }
    }, {
      key: "setFace",
      value: function setFace(direction) {
        this.face = direction;
        return this;
      }
    }, {
      key: "cone",
      get: function get() {
        return this._cone;
      },
      set: function set(value) {
        this._cone = value;
        if (value !== undefined) {
          if (this.coneMode === 0) ; else {
            // Angle
            this.coneRad = DegToRad$2(value);
          }
        }
      }
    }, {
      key: "setConeMode",
      value: function setConeMode(mode) {
        if (typeof mode === 'string') {
          mode = CONEMODE[mode];
        }
        this.coneMode = mode;
        return this;
      }
    }, {
      key: "setCone",
      value: function setCone(value) {
        this.cone = value;
        return this;
      }
    }, {
      key: "setOccupiedTest",
      value: function setOccupiedTest(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.occupiedTest = enable;
        return this;
      }
    }, {
      key: "setBlockerTest",
      value: function setBlockerTest(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.blockerTest = enable;
        return this;
      }
    }, {
      key: "setEdgeBlockerTest",
      value: function setEdgeBlockerTest(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.edgeBlockerTest = enable;
        return this;
      }
    }, {
      key: "setCostFunction",
      value: function setCostFunction(callback, scope) {
        this.costCallback = callback;
        this.costCallbackScope = scope;
        return this;
      }
    }, {
      key: "setPreTestFunction",
      value: function setPreTestFunction(callback, scope) {
        this.preTestCallback = callback;
        this.preTestCallbackScope = scope;
        return this;
      }
    }, {
      key: "setPerspectiveEnable",
      value: function setPerspectiveEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.perspectiveEnable = enable;
        return this;
      }
    }, {
      key: "setDebugGraphics",
      value: function setDebugGraphics(graphics) {
        this.debugGraphics = graphics;
        return this;
      }
    }, {
      key: "setDebugLineColor",
      value: function setDebugLineColor(visibleLineColor, invisibleLineColor) {
        this.debugVisibleLineColor = visibleLineColor;
        this.debugInvisibleLineColor = invisibleLineColor;
        return this;
      }
    }, {
      key: "setDebugLog",
      value: function setDebugLog(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }
        this.debugLog = enabled;
        return this;
      }
    }, {
      key: "clearDebugGraphics",
      value: function clearDebugGraphics() {
        if (this.debugGraphics) {
          this.debugGraphics.clear();
        }
        return this;
      }
    }, {
      key: "BLOCKER",
      get: function get() {
        return BLOCKER$1;
      }
    }, {
      key: "INFINITY",
      get: function get() {
        return INFINITY;
      }
    }, {
      key: "board",
      get: function get() {
        return this.chessData.board;
      }
    }]);
    return FieldOfView;
  }(ComponentBase);
  var CONEMODE = {
    direction: 0,
    angle: 1
  };
  Object.assign(FieldOfView.prototype, Methods$2);

  ObjectFactory.register('fieldOfView', function (gameObject, config) {
    return new FieldOfView(gameObject, config);
  });
  SetValue(window, 'RexPlugins.Board.FieldOfView', FieldOfView);

  var CreateTileData = function CreateTileData(x, y, direction) {
    return {
      x: x,
      y: y,
      direction: direction
    };
  };

  var CONST = {
    // special cost
    'BLOCKER': null,
    'STOP': -1
  };

  var STOP$1 = CONST.STOP;
  var GetPath = function GetPath(movingPoints, out) {
    if (out === undefined) {
      out = [];
    }
    if (this.board === null) {
      // chess is not in board
      return out;
    }
    var curTileXYZ = this.chessData.tileXYZ,
      curTileData = CreateTileData(curTileXYZ.x, curTileXYZ.y, this.face),
      nextTileData;
    var cost;
    while (movingPoints > 0) {
      nextTileData = this.getNextTile(curTileData, this.preTileXY);
      if (nextTileData === null) {
        break;
      }
      cost = nextTileData.cost;
      if (cost === STOP$1) {
        cost = movingPoints;
      }
      if (movingPoints >= cost) {
        out.push(nextTileData);
      }
      movingPoints -= cost;
      this.preTileXY = curTileData;
      curTileData = nextTileData;
    }

    // remove cost = 0 at tail
    for (var i = out.length - 1; i >= 0; i--) {
      if (out[i].cost === 0) {
        out.length = i;
      } else {
        break;
      }
    }
    return out;
  };

  var GetNextTile = function GetNextTile(curTileData, preTileData) {
    var board = this.board;
    var directions = board.grid.allDirections;
    var forwardTileData = null,
      backwardTileData = null;
    var neighborTileXArray = []; // forward and other neighbors, exclude backward
    var neighborTileXY,
      neighborTileData = null,
      cost;
    for (var i = 0, cnt = directions.length; i < cnt; i++) {
      neighborTileXY = board.getNeighborTileXY(curTileData, directions[i], true);
      if (neighborTileXY === null) {
        continue;
      }
      if (!board.contains(neighborTileXY.x, neighborTileXY.y, this.pathTileZ)) {
        continue;
      }
      neighborTileData = CreateTileData(neighborTileXY.x, neighborTileXY.y, directions[i]);
      cost = this.getCost(neighborTileData, curTileData);
      if (typeof cost !== 'number') {
        // Invalid cost, remove this tileData
        continue;
      }
      neighborTileData.cost = cost;
      if (directions[i] === curTileData.direction) {
        forwardTileData = neighborTileData;
      }
      if (preTileData !== undefined && AreTileXYEqual(neighborTileXY, preTileData)) {
        backwardTileData = neighborTileData;
      } else {
        neighborTileXArray.push(neighborTileData);
      }
    }
    var nextTileData;
    if (backwardTileData === null && neighborTileXArray.length === 0) {
      // no valid neighbor
      nextTileData = null;
    } else if (backwardTileData === null && neighborTileXArray.length === 1) {
      // 1 neighbor
      nextTileData = neighborTileXArray[0];
    } else if (backwardTileData !== null && neighborTileXArray.length === 0) {
      // 1 backward neighbor
      nextTileData = backwardTileData;
    } else {
      // 2 or more neighobrs
      switch (this.pickMode) {
        case 1:
          // random all
          if (backwardTileData !== null) {
            neighborTileXArray.push(backwardTileData);
          }
          nextTileData = GetRandom(neighborTileXArray);
          break;
        default:
          // case 0: forward first
          if (forwardTileData !== null) {
            nextTileData = forwardTileData;
          } else {
            nextTileData = GetRandom(neighborTileXArray);
          }
          break;
      }
    }
    return nextTileData;
  };

  var GetCost = function GetCost(curTileXY, preTileXY) {
    if (typeof this.costCallback === 'number') {
      return this.costCallback;
    }
    if (this.costCallbackScope) {
      return this.costCallback.call(this.costCallbackScope, curTileXY, preTileXY, this);
    } else {
      return this.costCallback(curTileXY, preTileXY, this);
    }
  };

  var Methods$1 = {
    getPath: GetPath,
    getNextTile: GetNextTile,
    getCost: GetCost
  };

  var BLOCKER = CONST.BLOCKER;
  var STOP = CONST.STOP;
  var Monopoly = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Monopoly, _ComponentBase);
    function Monopoly(gameObject, config) {
      var _this;
      _classCallCheck(this, Monopoly);
      _this = _callSuper(this, Monopoly, [gameObject, {
        eventEmitter: false
      }]);
      // No event emitter
      // this.parent = gameObject;

      _this.chessData = GetChessData(gameObject);
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(Monopoly, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.preTileXY = GetValue$c(o, 'preTileXY', undefined);
        var costCallback = GetValue$c(o, 'costCallback', undefined);
        var costCallbackScope = GetValue$c(o, 'costCallbackScope', undefined);
        if (costCallback === undefined) {
          costCallback = GetValue$c(o, 'cost', 1);
        }
        this.setFace(GetValue$c(o, 'face', 0));
        this.setPathMode(GetValue$c(o, 'pathMode', 0));
        this.setPathTileZ(GetValue$c(o, 'pathTileZ', 0));
        this.setCostFunction(costCallback, costCallbackScope);
        return this;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.chessData = undefined;
        _get(_getPrototypeOf(Monopoly.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setFace",
      value: function setFace(direction) {
        direction = this.board.grid.directionNormalize(direction);
        this.face = direction;
        return this;
      }
    }, {
      key: "setPathMode",
      value: function setPathMode(mode) {
        if (typeof mode === 'string') {
          mode = PATHMODE[mode];
        }
        this.pathMode = mode;
        return this;
      }
    }, {
      key: "setCostFunction",
      value: function setCostFunction(callback, scope) {
        this.costCallback = callback;
        this.costCallbackScope = scope;
        return this;
      }
    }, {
      key: "setPathTileZ",
      value: function setPathTileZ(value) {
        if (value === undefined) {
          value = true;
        }
        this.pathTileZ = value;
        return this;
      }
    }, {
      key: "BLOCKER",
      get: function get() {
        return BLOCKER;
      }
    }, {
      key: "STOP",
      get: function get() {
        return STOP;
      }
    }, {
      key: "board",
      get: function get() {
        return this.chessData.board;
      }
    }]);
    return Monopoly;
  }(ComponentBase);
  Object.assign(Monopoly.prototype, Methods$1);
  var PATHMODE = {
    'forward': 0,
    'random': 1
  };

  ObjectFactory.register('monopoly', function (gameObject, config) {
    return new Monopoly(gameObject, config);
  });
  SetValue(window, 'RexPlugins.Board.Monopoly', Monopoly);

  var MinVersion = 60;
  var IsChecked = false;
  var CheckP3Version = function CheckP3Version(minVersion) {
    if (IsChecked) {
      return;
    }
    if (minVersion === undefined) {
      minVersion = MinVersion;
    }
    var currentVersion = parseInt(Phaser.VERSION.match(/\.(\d+)\./)[1]);
    if (currentVersion < minVersion) {
      console.error("Minimum supported version : 3.".concat(minVersion));
    }
    IsChecked = true;
  };

  CheckP3Version();
  var Zone = Phaser.GameObjects.Zone;
  var AddItem = Phaser.Utils.Array.Add;
  var RemoveItem = Phaser.Utils.Array.Remove;
  var Base = /*#__PURE__*/function (_Zone) {
    _inherits(Base, _Zone);
    function Base(scene, x, y, width, height) {
      var _this;
      _classCallCheck(this, Base);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 1;
      }
      if (height === undefined) {
        height = 1;
      }
      _this = _callSuper(this, Base, [scene, x, y, width, height]);
      _this.children = [];
      return _this;
    }
    _createClass(Base, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        if (fromScene) {
          // Stop scene
          var child;
          for (var i = this.children.length - 1; i >= 0; i--) {
            child = this.children[i];
            if (!child.parentContainer &&
            // Not in container
            !child.displayList // Not in scene, neither in layer
            ) {
              // Destroy child which is not in scene, container, or layer manually
              child.destroy(fromScene);
            }
          }
        }

        // Destroy/remove children
        this.clear(!fromScene);
        _get(_getPrototypeOf(Base.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "contains",
      value: function contains(gameObject) {
        return this.children.indexOf(gameObject) !== -1;
      }
    }, {
      key: "add",
      value: function add(gameObjects) {
        var parent = this;
        AddItem(this.children, gameObjects, 0,
        // Callback of item added
        function (gameObject) {
          gameObject.once('destroy', parent.onChildDestroy, parent);
        }, this);
        return this;
      }
    }, {
      key: "remove",
      value: function remove(gameObjects, destroyChild) {
        var parent = this;
        RemoveItem(this.children, gameObjects,
        // Callback of item removed
        function (gameObject) {
          gameObject.off('destroy', parent.onChildDestroy, parent);
          if (destroyChild) {
            gameObject.destroy();
          }
        });
        return this;
      }
    }, {
      key: "onChildDestroy",
      value: function onChildDestroy(child, fromScene) {
        // Only remove reference
        this.remove(child, false);
      }
    }, {
      key: "clear",
      value: function clear(destroyChild) {
        var parent = this;
        var gameObject;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
          gameObject = this.children[i];
          gameObject.off('destroy', parent.onChildDestroy, parent);
          if (destroyChild) {
            gameObject.destroy();
          }
        }
        this.children.length = 0;
        return this;
      }
    }]);
    return Base;
  }(Zone);
  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Base, [Components.Alpha, Components.Flip]);

  var GetParent = function GetParent(gameObject, name) {
    var parent;
    if (name === undefined) {
      if (gameObject.hasOwnProperty('rexContainer')) {
        parent = gameObject.rexContainer.parent;
      }
    } else {
      parent = GetParent(gameObject);
      while (parent) {
        if (parent.name === name) {
          break;
        }
        parent = GetParent(parent);
      }
    }
    return parent;
  };
  var GetTopmostParent = function GetTopmostParent(gameObject) {
    var parent = GetParent(gameObject);
    while (parent) {
      gameObject = parent;
      parent = GetParent(parent);
    }
    return gameObject;
  };

  var DegToRad$1 = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var GetLocalState = function GetLocalState(gameObject) {
    if (!gameObject.hasOwnProperty('rexContainer')) {
      var rexContainer = {
        parent: null,
        self: null,
        layer: null,
        x: 0,
        y: 0,
        syncPosition: true,
        rotation: 0,
        syncRotation: true,
        scaleX: 0,
        scaleY: 0,
        syncScale: true,
        alpha: 0,
        syncAlpha: true,
        syncScrollFactor: true,
        syncCameraFilter: true,
        syncDisplayList: true,
        visible: true,
        active: true
      };
      Object.defineProperty(rexContainer, 'angle', {
        get: function get() {
          return RadToDeg(this.rotation);
        },
        set: function set(value) {
          this.rotation = DegToRad$1(value);
        }
      });
      Object.defineProperty(rexContainer, 'displayWidth', {
        get: function get() {
          return gameObject.width * this.scaleX;
        },
        set: function set(width) {
          this.scaleX = width / gameObject.width;
        }
      });
      Object.defineProperty(rexContainer, 'displayHeight', {
        get: function get() {
          return gameObject.height * this.scaleY;
        },
        set: function set(height) {
          this.scaleY = height / gameObject.height;
        }
      });
      gameObject.rexContainer = rexContainer;
    }
    return gameObject.rexContainer;
  };

  var Parent = {
    setParent: function setParent(gameObject, parent) {
      if (parent === undefined) {
        parent = this;
      }
      var localState = GetLocalState(gameObject);
      if (parent) {
        // Add to parent
        localState.parent = parent;
        localState.self = gameObject;
      } else {
        // Remove from parent
        localState.parent = null;
        localState.self = null;
      }
      return this;
    },
    getParent: function getParent(gameObject, name) {
      if (typeof gameObject === 'string') {
        name = gameObject;
        gameObject = undefined;
      }
      if (gameObject === undefined) {
        gameObject = this;
      }
      return GetParent(gameObject, name);
    },
    getTopmostParent: function getTopmostParent(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }
      return GetTopmostParent(gameObject);
    }
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var BaseAdd = Base.prototype.add;
  var Add = function Add(gameObject, config) {
    this.setParent(gameObject);
    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config);
    this.resetChildState(gameObject) // Reset local state of child
    .updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject) // Apply parent's mask to child
    .updateCameraFilter(gameObject); // Apply parent's cameraFilter to child

    BaseAdd.call(this, gameObject);
    SyncDisplayList.call(this, gameObject, state);
    return this;
  };
  var AddLocal = function AddLocal(gameObject, config) {
    this.setParent(gameObject);

    // Set local state from child directly
    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config);
    // Position
    state.x = gameObject.x;
    state.y = gameObject.y;
    state.rotation = gameObject.rotation;
    state.scaleX = gameObject.scaleX;
    state.scaleY = gameObject.scaleY;
    // Alpha
    state.alpha = gameObject.alpha;
    // Visible
    state.visible = gameObject.visible;
    // Active
    state.active = gameObject.active;
    this.updateChildPosition(gameObject).updateChildAlpha(gameObject).updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject); // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
    SyncDisplayList.call(this, gameObject, state);
    return this;
  };
  var SetupSyncFlags = function SetupSyncFlags(state, config) {
    if (config === undefined) {
      config = true;
    }
    if (typeof config === 'boolean') {
      state.syncPosition = config;
      state.syncRotation = config;
      state.syncScale = config;
      state.syncAlpha = config;
      state.syncScrollFactor = config;
      state.syncCameraFilter = config;
      state.syncDisplayList = config;
    } else {
      state.syncPosition = GetValue$3(config, 'syncPosition', true);
      state.syncRotation = GetValue$3(config, 'syncRotation', true);
      state.syncScale = GetValue$3(config, 'syncScale', true);
      state.syncAlpha = GetValue$3(config, 'syncAlpha', true);
      state.syncScrollFactor = GetValue$3(config, 'syncScrollFactor', true);
      state.syncCameraFilter = GetValue$3(config, 'syncCameraFilter', true);
      state.syncDisplayList = GetValue$3(config, 'syncDisplayList', true);
    }
  };
  var SyncDisplayList = function SyncDisplayList(gameObject, state) {
    this.addToParentContainer(gameObject); // Sync parent's container to child

    if (state.syncDisplayList) {
      this.addToPatentLayer(gameObject); // Sync parent's layer to child
    }
    this.addToRenderLayer(gameObject); // Sync parent's render-layer
  };
  var AddChild = {
    // Can override this method
    add: function add(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        Add.call(this, gameObject);
      }
      return this;
    },
    // Don't override this method
    pin: function pin(gameObject, config) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject, config);
      } else {
        Add.call(this, gameObject, config);
      }
      return this;
    },
    addMultiple: function addMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Add.call(this, gameObjects[i]);
      }
      return this;
    },
    addLocal: function addLocal(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        AddLocal.call(this, gameObject);
      }
      return this;
    },
    // Don't override this method
    pinLocal: function pinLocal(gameObject, config) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject, config);
      } else {
        AddLocal.call(this, gameObject, config);
      }
      return this;
    },
    addLocalMultiple: function addLocalMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        AddLocal.call(this, gameObjects[i]);
      }
      return this;
    }
  };

  var BaseRemove = Base.prototype.remove;
  var BaseClear = Base.prototype.clear;
  var RemoveChild = {
    // Can override this method
    remove: function remove(gameObject, destroyChild) {
      if (GetParent(gameObject) !== this) {
        return this;
      }
      this.setParent(gameObject, null);
      if (!destroyChild) {
        this.removeFromRenderLayer(gameObject);
      }
      BaseRemove.call(this, gameObject, destroyChild);
      return this;
    },
    // Don't override this method
    unpin: function unpin(gameObject, destroyChild) {
      if (GetParent(gameObject) !== this) {
        return this;
      }
      this.setParent(gameObject, null);
      if (!destroyChild) {
        this.removeFromRenderLayer(gameObject);
      }
      BaseRemove.call(this, gameObject, destroyChild);
      return this;
    },
    clear: function clear(destroyChild) {
      var children = this.children;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        this.setParent(child, null);
        if (!destroyChild) {
          this.removeFromRenderLayer(child);
        }
      }
      BaseClear.call(this, destroyChild);
      return this;
    }
  };

  var ChildState = {
    getLocalState: function getLocalState(gameObject) {
      return GetLocalState(gameObject);
    },
    resetChildState: function resetChildState(gameObject) {
      this.resetChildPositionState(gameObject).resetChildVisibleState(gameObject).resetChildAlphaState(gameObject).resetChildActiveState(gameObject);
      return this;
    },
    resetChildrenState: function resetChildrenState(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.resetChildState(gameObjects[i]);
      }
      return this;
    },
    syncProperties: function syncProperties() {
      this.syncPosition().syncVisible().syncAlpha().syncActive().syncScrollFactor().syncMask();
      return this;
    }
  };

  var RotateAround$1 = Phaser.Math.RotateAround;
  var Transform = {
    worldToLocal: function worldToLocal(point) {
      // Transform
      point.x -= this.x;
      point.y -= this.y;
      // Rotate
      RotateAround$1(point, 0, 0, -this.rotation);
      // Scale
      point.x /= this.scaleX;
      point.y /= this.scaleY;
      return point;
    },
    localToWorld: function localToWorld(point) {
      // Scale
      point.x *= this.scaleX;
      point.y *= this.scaleY;
      // Rotate
      RotateAround$1(point, 0, 0, this.rotation);
      // Transform
      point.x += this.x;
      point.y += this.y;
      return point;
    }
  };

  var GetScale = function GetScale(a, b) {
    if (a === b) {
      return 1;
    } else {
      return a / b;
    }
  };

  var Position = {
    updateChildPosition: function updateChildPosition(child) {
      if (child.isRexContainerLite) {
        child.syncChildrenEnable = false;
      }
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncPosition) {
        child.x = state.x;
        child.y = state.y;
        parent.localToWorld(child);
      }
      if (state.syncRotation) {
        child.rotation = state.rotation + parent.rotation;
      }
      if (state.syncScale) {
        child.scaleX = state.scaleX * parent.scaleX;
        child.scaleY = state.scaleY * parent.scaleY;
      }
      if (child.isRexContainerLite) {
        child.syncChildrenEnable = true;
        child.syncPosition();
      }
      return this;
    },
    syncPosition: function syncPosition() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildPosition, this);
      }
      return this;
    },
    resetChildPositionState: function resetChildPositionState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.x = child.x;
      state.y = child.y;
      parent.worldToLocal(state);
      state.scaleX = GetScale(child.scaleX, parent.scaleX);
      state.scaleY = GetScale(child.scaleY, parent.scaleY);
      state.rotation = child.rotation - parent.rotation;
      return this;
    },
    setChildPosition: function setChildPosition(child, x, y) {
      child.x = x;
      child.y = y;
      this.resetChildPositionState(child);
      return this;
    },
    setChildLocalPosition: function setChildLocalPosition(child, x, y) {
      var state = GetLocalState(child);
      state.x = x;
      state.y = y;
      this.updateChildPosition(child);
      return this;
    },
    resetLocalPositionState: function resetLocalPositionState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildPositionState(this);
      }
      return this;
    }
  };

  var DegToRad = Phaser.Math.DegToRad;
  var Rotation = {
    updateChildRotation: function updateChildRotation(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncRotation) {
        child.rotation = parent.rotation + state.rotation;
      }
      return this;
    },
    syncRotation: function syncRotation() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildRotation, this);
      }
      return this;
    },
    resetChildRotationState: function resetChildRotationState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.rotation = child.rotation - parent.rotation;
      return this;
    },
    setChildRotation: function setChildRotation(child, rotation) {
      child.rotation = rotation;
      this.resetChildRotationState(child);
      return this;
    },
    setChildAngle: function setChildAngle(child, angle) {
      child.angle = angle;
      this.resetChildRotationState(child);
      return this;
    },
    setChildLocalRotation: function setChildLocalRotation(child, rotation) {
      var state = GetLocalState(child);
      state.rotation = rotation;
      this.updateChildRotation(child);
      return this;
    },
    setChildLocalAngle: function setChildLocalAngle(child, angle) {
      var state = GetLocalState(child);
      state.rotation = DegToRad(angle);
      this.updateChildRotation(child);
      return this;
    },
    resetLocalRotationState: function resetLocalRotationState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildRotationState(this);
      }
      return this;
    }
  };

  var Scale = {
    updateChildScale: function updateChildScale(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncScale) {
        child.scaleX = parent.scaleX * state.scaleX;
        child.scaleY = parent.scaleY * state.scaleY;
      }
      return this;
    },
    syncScale: function syncScale() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildScale, this);
      }
      return this;
    },
    resetChildScaleState: function resetChildScaleState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.scaleX = GetScale(child.scaleX, parent.scaleX);
      state.scaleY = GetScale(child.scaleY, parent.scaleY);
      return this;
    },
    setChildScale: function setChildScale(child, scaleX, scaleY) {
      if (scaleY === undefined) {
        scaleY = scaleX;
      }
      child.scaleX = scaleX;
      child.scaleY = scaleY;
      this.resetChildScaleState(child);
      return this;
    },
    setChildLocalScale: function setChildLocalScale(child, scaleX, scaleY) {
      if (scaleY === undefined) {
        scaleY = scaleX;
      }
      var state = GetLocalState(child);
      state.scaleX = scaleX;
      state.scaleY = scaleY;
      this.updateChildScale(child);
      return this;
    },
    setChildDisplaySize: function setChildDisplaySize(child, width, height) {
      child.setDisplaySize(width, height);
      this.resetChildScaleState(child);
      return this;
    },
    resetLocalScaleState: function resetLocalScaleState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildScaleState(this);
      }
      return this;
    }
  };

  /*

  Visible in localState:

    - visible: original visible of child
    - maskVisible: invisible by parent mask, see MaskChildren.js
        - undefined (not in masking) : Equal to mask visible
        - true (mask visible) : Inside, or across parent's visible area
        - false (maske invisible) : Out of parent's visible area

  Visible result of child = (parent visible) && (child visible) && (mask visible)
  */

  var Visible = {
    updateChildVisible: function updateChildVisible(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      var maskVisible = localState.hasOwnProperty('maskVisible') ? localState.maskVisible : true;
      var parentVisible = parent ? parent.visible : true;
      child.visible = parentVisible && localState.visible && maskVisible;
      return this;
    },
    syncVisible: function syncVisible() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildVisible, this);
      }
      return this;
    },
    resetChildVisibleState: function resetChildVisibleState(child) {
      var localState = GetLocalState(child);
      // Delete maskVisible property
      if (localState.hasOwnProperty('maskVisible')) {
        delete localState.maskVisible;
      }
      localState.visible = child.visible;
      return this;
    },
    setChildVisible: function setChildVisible(child, visible) {
      // Visible of child will be affect by parent's visible, and mask visible
      this.setChildLocalVisible(child, visible);
      return this;
    },
    // Internal method
    setChildLocalVisible: function setChildLocalVisible(child, visible) {
      if (visible === undefined) {
        visible = true;
      }
      var localState = GetLocalState(child);
      localState.visible = visible;
      this.updateChildVisible(child);
      return this;
    },
    // Internal method
    setChildMaskVisible: function setChildMaskVisible(child, visible) {
      if (visible === undefined) {
        visible = true;
      }
      var localState = GetLocalState(child);
      localState.maskVisible = visible;
      this.updateChildVisible(child);
      return this;
    },
    resetLocalVisibleState: function resetLocalVisibleState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildVisibleState(this);
      }
      return this;
    }
  };

  var Alpha = {
    updateChildAlpha: function updateChildAlpha(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncAlpha) {
        child.alpha = parent.alpha * state.alpha;
      }
      return this;
    },
    syncAlpha: function syncAlpha() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildAlpha, this);
      }
      return this;
    },
    resetChildAlphaState: function resetChildAlphaState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.alpha = GetScale(child.alpha, parent.alpha);
      return this;
    },
    setChildAlpha: function setChildAlpha(child, alpha) {
      child.alpha = alpha;
      this.resetChildAlphaState(child);
      return this;
    },
    setChildLocalAlpha: function setChildLocalAlpha(child, alpha) {
      var state = GetLocalState(child);
      state.alpha = alpha;
      this.updateChildAlpha(child);
      return this;
    },
    resetLocalAlphaState: function resetLocalAlphaState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildAlphaState(this);
      }
      return this;
    }
  };

  var Active = {
    updateChildActive: function updateChildActive(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      child.active = parent.active && localState.active;
      return this;
    },
    syncActive: function syncActive() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildActive, this);
      }
      return this;
    },
    resetChildActiveState: function resetChildActiveState(child) {
      var localState = GetLocalState(child);
      localState.active = child.active;
      return this;
    },
    setChildActive: function setChildActive(child, active) {
      child.active = active;
      this.resetChildActiveState(child);
      return this;
    },
    setChildLocalActive: function setChildLocalActive(child, active) {
      if (active === undefined) {
        active = true;
      }
      var localState = GetLocalState(child);
      localState.active = active;
      this.updateChildActive(child);
      return this;
    },
    resetLocalActiveState: function resetLocalActiveState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildActiveState(this);
      }
      return this;
    }
  };

  var ScrollFactor = {
    updateChildScrollFactor: function updateChildScrollFactor(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncScrollFactor) {
        child.scrollFactorX = parent.scrollFactorX;
        child.scrollFactorY = parent.scrollFactorY;
      }
      return this;
    },
    syncScrollFactor: function syncScrollFactor() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildScrollFactor, this);
      }
      return this;
    }
  };

  var CameraFilter = {
    updateCameraFilter: function updateCameraFilter(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncCameraFilter) {
        child.cameraFilter = parent.cameraFilter;
      }
      return this;
    },
    syncCameraFilter: function syncCameraFilter() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateCameraFilter, this);
      }
      return this;
    }
  };

  var Mask = {
    updateChildMask: function updateChildMask(child) {
      // Don't propagate null mask to clear children's mask
      if (this.mask == null) {
        return this;
      }
      var maskGameObject = this.mask.hasOwnProperty('geometryMask') ? this.mask.geometryMask : this.mask.bitmapMask;
      if (maskGameObject !== child) {
        child.mask = this.mask;
      }
      return this;
    },
    syncMask: function syncMask() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildMask, this);
      }
      return this;
    },
    setMask: function setMask(mask) {
      this.mask = mask;
      return this;
    },
    clearMask: function clearMask(destroyMask) {
      if (destroyMask === undefined) {
        destroyMask = false;
      }
      var self = this;

      // Clear current mask
      this._mask = null;
      this.setChildMaskVisible(this);
      // Also set maskVisible to `true`

      this.children.forEach(function (child) {
        // Clear child's mask
        if (child.clearMask) {
          child.clearMask(false);
        }
        if (!child.hasOwnProperty('isRexContainerLite')) {
          self.setChildMaskVisible(child);
          // Set child's maskVisible to `true`
        }
      });
      if (destroyMask && this.mask) {
        this.mask.destroy();
      }
      return this;
    }
  };

  var SortGameObjectsByDepth = function SortGameObjectsByDepth(gameObjects, descending) {
    if (gameObjects.length <= 1) {
      return gameObjects;
    }
    if (descending === undefined) {
      descending = false;
    }
    var itemList;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];
      if (gameObject.displayList) {
        // Inside a scene or a layer
        itemList = gameObject.displayList; // displayList
      } else if (gameObject.parentContainer) {
        // Inside a container
        itemList = gameObject.parentContainer.list; // array
      }
      if (itemList) {
        break;
      }
    }
    if (!itemList) {
      itemList = gameObject.scene.sys.displayList; // displayList
      // ??
    }
    if (itemList.depthSort) {
      // Is a displayList object
      itemList.depthSort();
      itemList = itemList.list;
      // itemList is an array now
    }

    // itemList is an array
    if (descending) {
      gameObjects.sort(function (childA, childB) {
        return itemList.indexOf(childB) - itemList.indexOf(childA);
      });
    } else {
      gameObjects.sort(function (childA, childB) {
        return itemList.indexOf(childA) - itemList.indexOf(childB);
      });
    }
    return gameObjects;
  };

  var FilterDisplayGameObjects = function FilterDisplayGameObjects(gameObjects) {
    return gameObjects.filter(function (gameObject) {
      if (gameObject.displayList) {
        // Inside a scene or a layer
        return true;
      } else if (gameObject.parentContainer) {
        // Inside a container
        return true;
      }
    });
  };

  var Depth = {
    setDepth: function setDepth(value, containerOnly) {
      this.depth = value;
      if (!containerOnly && this.children) {
        var children = this.getAllChildren();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
          children[i].depth = value;
        }
      }
      return this;
    },
    swapDepth: function swapDepth(containerB) {
      var depthA = this.depth;
      var depthB = containerB.depth;
      this.setDepth(depthB);
      containerB.setDepth(depthA);
      return this;
    },
    incDepth: function incDepth(inc) {
      this.depth += inc;
      if (this.children) {
        var children = this.getAllChildren();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
          children[i].depth += inc;
        }
      }
      return this;
    },
    bringToTop: function bringToTop() {
      var displayList = this.displayList;
      if (!displayList) {
        return this;
      }
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, false);
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (displayList.exists(child)) {
          displayList.bringToTop(child);
        }
      }
      return this;
    },
    bringMeToTop: function bringMeToTop() {
      return this.bringToTop();
    },
    sendToBack: function sendToBack() {
      var displayList = this.displayList;
      if (!displayList) {
        return this;
      }
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, true);
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (displayList.exists(child)) {
          displayList.sendToBack(child);
        }
      }
      return this;
    },
    sendMeToBack: function sendMeToBack() {
      return this.sendToBack();
    },
    moveDepthBelow: function moveDepthBelow(gameObject) {
      var displayList = this.displayList;
      if (!displayList) {
        return this;
      }
      if (gameObject.displayList !== displayList) {
        // Do nothing if not at the same display list
        return this;
      }
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, false);
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (displayList.exists(child)) {
          displayList.moveBelow(gameObject, child);
          break;
        }
      }
      return this;
    },
    moveMyDepthBelow: function moveMyDepthBelow(gameObject) {
      return this.moveDepthBelow(gameObject);
    },
    moveDepthAbove: function moveDepthAbove(gameObject) {
      var displayList = this.displayList;
      if (!displayList) {
        return this;
      }
      if (gameObject.displayList !== displayList) {
        // Do nothing if not at the same display list
        return this;
      }
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, true);
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (displayList.exists(child)) {
          displayList.moveAbove(gameObject, child);
          break;
        }
      }
      return this;
    },
    moveMyDepthAbove: function moveMyDepthAbove(gameObject) {
      return this.moveDepthAbove(gameObject);
    },
    bringChildToTop: function bringChildToTop(child) {
      var gameObjects;
      if (child.isRexContainerLite) {
        gameObjects = child.getAllChildren([child]);
        gameObjects = FilterDisplayGameObjects(gameObjects);
        gameObjects = SortGameObjectsByDepth(gameObjects, false);
      } else {
        gameObjects = [child];
      }
      var children = this.getAllChildren([this]);
      children = FilterDisplayGameObjects(children);
      children = SortGameObjectsByDepth(children, false);
      var topChild = children[children.length - 1];
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        var gameObject = gameObjects[i];
        if (topChild === gameObject || topChild.displayList !== gameObject.displayList) {
          continue;
        }
        topChild.displayList.moveAbove(gameObject, topChild);
        topChild = gameObject;
      }
      return this;
    },
    sendChildToBack: function sendChildToBack(child) {
      var gameObjects;
      if (child.isRexContainerLite) {
        gameObjects = child.getAllChildren([child]);
        gameObjects = FilterDisplayGameObjects(gameObjects);
        gameObjects = SortGameObjectsByDepth(gameObjects, false);
      } else {
        gameObjects = [child];
      }
      var children = this.getAllChildren([this]);
      children = FilterDisplayGameObjects(children);
      children = SortGameObjectsByDepth(children, false);
      var bottomChild = children[0];
      for (var i = gameObjects.length - 1; i >= 0; i--) {
        var gameObject = gameObjects[i];
        if (bottomChild === gameObject || bottomChild.displayList !== gameObject.displayList) {
          continue;
        }
        bottomChild.displayList.moveBelow(gameObject, bottomChild);
        bottomChild = gameObject;
      }
      return this;
    }
  };

  var DepthFirstSearch = function DepthFirstSearch(root, callback) {
    var skip = callback(root);
    if (!skip && root.isRexContainerLite) {
      var children = root.children;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        DepthFirstSearch(children[i], callback);
      }
    }
  };
  var BreadthFirstSearch = function BreadthFirstSearch(root, callback) {
    var queue = [root];
    while (queue.length > 0) {
      var current = queue.shift();
      var skip = callback(current);
      if (!skip && current.isRexContainerLite) {
        queue.push.apply(queue, _toConsumableArray(current.children));
      }
    }
  };

  var ArrayUtils = Phaser.Utils.Array;
  var Children = {
    getChildren: function getChildren(out) {
      if (!out) {
        out = this.children; // Return internal children array
      } else {
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
          out.push(this.children[i]);
        }
        // Copy children
      }
      return out;
    },
    getAllChildren: function getAllChildren(out) {
      if (out === undefined) {
        out = [];
      }
      var root = this;
      BreadthFirstSearch(root, function (child) {
        // Don't add root
        if (child === root) {
          return;
        }
        out.push(child);
      });
      return out;
    },
    getAllVisibleChildren: function getAllVisibleChildren(out) {
      if (out === undefined) {
        out = [];
      }
      var root = this;
      BreadthFirstSearch(root, function (child) {
        // Don't add root
        if (child === root) {
          return;
        }
        // Don't add invisible child
        if (!child.visible) {
          return true;
        }
        out.push(child);
      });
      return out;
    },
    bfs: function bfs(callback, root) {
      if (root === undefined) {
        root = this;
      }
      BreadthFirstSearch(root, callback);
      return this;
    },
    dfs: function dfs(callback, root) {
      if (root === undefined) {
        root = this;
      }
      DepthFirstSearch(root, callback);
      return this;
    },
    contains: function contains(gameObject) {
      // Override Base.contains method
      var parent = GetParent(gameObject);
      if (!parent) {
        return false;
      } else if (parent === this) {
        return true;
      } else {
        return this.contains(parent);
      }
    },
    getByName: function getByName(name, recursive) {
      if (!recursive) {
        return ArrayUtils.GetFirst(this.children, 'name', name); // object, or null if not found
      } else {
        // recursive
        // Breadth-first search
        var queue = [this];
        var parent, child;
        while (queue.length) {
          parent = queue.shift();
          for (var i = 0, cnt = parent.children.length; i < cnt; i++) {
            child = parent.children[i];
            if (child.name === name) {
              return child;
            } else if (child.isRexContainerLite) {
              queue.push(child);
            }
          }
        }
        return null;
      }
    },
    getRandom: function getRandom(startIndex, length) {
      return ArrayUtils.GetRandom(this.children, startIndex, length);
    },
    getFirst: function getFirst(property, value, startIndex, endIndex) {
      return ArrayUtils.GetFirstElement(this.children, property, value, startIndex, endIndex);
    },
    getAll: function getAll(property, value, startIndex, endIndex) {
      return ArrayUtils.GetAll(this.children, property, value, startIndex, endIndex);
    },
    count: function count(property, value, startIndex, endIndex) {
      return ArrayUtils.CountAllMatching(this.children, property, value, startIndex, endIndex);
    },
    swap: function swap(child1, child2) {
      ArrayUtils.Swap(this.children, child1, child2);
      return this;
    },
    setAll: function setAll(property, value, startIndex, endIndex) {
      ArrayUtils.SetAll(this.children, property, value, startIndex, endIndex);
      return this;
    }
  };

  var GetLocalStates = function GetLocalStates(gameObjects) {
    var localStates = [];
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];
      if (!gameObject.hasOwnProperty('rexContainer')) {
        continue;
      }
      localStates.push(gameObject.rexContainer);
    }
    return localStates;
  };
  var GetScene = function GetScene(gameObjects) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var scene = gameObjects[i].scene;
      if (scene) {
        return scene;
      }
    }
    return null;
  };
  var UpdateChild = function UpdateChild(tween, key, target) {
    if (!target.parent) {
      // target object was removed, so remove this tween too
      tween.remove();
      return;
    }
    var parent = target.parent;
    var child = target.self;
    switch (key) {
      case 'x':
      case 'y':
        parent.updateChildPosition(child);
        break;
      case 'angle':
      case 'rotation':
        parent.updateChildRotation(child);
        break;
      case 'scaleX':
      case 'scaleY':
      case 'displayWidth':
      case 'displayHeight':
        parent.updateChildScale(child);
        break;
      case 'alpha':
        parent.updateChildAlpha(child);
        break;
      default:
        parent.updateChildPosition(child);
        parent.updateChildRotation(child);
        parent.updateChildScale(child);
        parent.updateChildAlpha(child);
        break;
    }
  };
  var Tween = {
    tweenChild: function tweenChild(tweenConfig) {
      var targets = tweenConfig.targets;
      if (!Array.isArray(targets)) {
        targets = [targets];
      }
      var scene = this.scene || GetScene(targets);
      if (!scene) {
        return;
      }

      // Map child game objects to local states
      tweenConfig.targets = GetLocalStates(targets);
      var tween = scene.tweens.add(tweenConfig);

      // Update child game object in 'update' event
      tween.on('update', UpdateChild);
      return tween;
    },
    tweenSelf: function tweenSelf(tweenConfig) {
      tweenConfig.targets = [this];
      return this.tweenChild(tweenConfig);
    },
    createTweenChildConfig: function createTweenChildConfig(tweenConfig) {
      var targets = tweenConfig.targets;
      if (targets) {
        if (!Array.isArray(targets)) {
          targets = [targets];
        }
        // Map child game objects to local states
        tweenConfig.targets = GetLocalStates(targets);
      }
      var onUpdate = tweenConfig.onUpdate;
      tweenConfig.onUpdate = function (tween, target) {
        if (onUpdate) {
          onUpdate(tween, target);
        }
        UpdateChild(tween, undefined, target);
      };
      return tweenConfig;
    },
    tween: function tween(tweenConfig) {
      var scene = this.scene;
      if (!tweenConfig.targets) {
        tweenConfig.targets = this;
      }
      return scene.tweens.add(tweenConfig);
    }
  };

  var ContainerClass = Phaser.GameObjects.Container;
  var IsContainerGameObject = function IsContainerGameObject(gameObject) {
    return gameObject instanceof ContainerClass;
  };

  var LayerClass = Phaser.GameObjects.Layer;
  var IsLayerGameObject = function IsLayerGameObject(gameObject) {
    return gameObject instanceof LayerClass;
  };

  var GetValidChildren = function GetValidChildren(parent) {
    var children = parent.getAllChildren([parent]);
    children = children.filter(function (gameObject) {
      return !!gameObject.displayList ||
      // At scene's displayList or at a layer
      !!gameObject.parentContainer; // At a container
    });
    return children;
  };
  var AddToContainer = function AddToContainer(p3Container) {
    var gameObjects = GetValidChildren(this);
    // This containerLite parent should be considered.
    if (gameObjects.indexOf(this) === -1) {
      gameObjects.push(this);
    }
    SortGameObjectsByDepth(gameObjects);
    p3Container.add(gameObjects);
  };
  var RemoveFromContainer = function RemoveFromContainer(p3Container, descending, addToScene) {
    if (!this.scene) {
      // Destroyed
      return;
    }
    var gameObjects = GetValidChildren(this);
    SortGameObjectsByDepth(gameObjects, descending);
    p3Container.remove(gameObjects);
    if (addToScene) {
      gameObjects.forEach(function (gameObject) {
        gameObject.addToDisplayList();
      });
    }
  };
  var P3Container = {
    addToContainer: function addToContainer(p3Container) {
      if (!IsContainerGameObject(p3Container)) {
        return this;
      }
      this._setParentContainerFlag = true;
      AddToContainer.call(this, p3Container);
      this._setParentContainerFlag = false;
      return this;
    },
    addToLayer: function addToLayer(layer) {
      if (!IsLayerGameObject(layer)) {
        return this;
      }
      AddToContainer.call(this, layer);
      return this;
    },
    removeFromContainer: function removeFromContainer() {
      if (!this.parentContainer) {
        return this;
      }
      this._setParentContainerFlag = true;
      RemoveFromContainer.call(this, this.parentContainer, true, false);
      this._setParentContainerFlag = false;
      return this;
    },
    removeFromLayer: function removeFromLayer(addToScene) {
      if (addToScene === undefined) {
        addToScene = true;
      }
      if (!IsLayerGameObject(this.displayList)) {
        return this;
      }
      RemoveFromContainer.call(this, this.displayList, false, addToScene);
      return this;
    },
    getParentContainer: function getParentContainer() {
      if (this.parentContainer) {
        return this.parentContainer;
      }

      // One of parent container has a layer
      var parent = this.getParent();
      while (parent) {
        var p3Container = parent.parentContainer;
        if (p3Container) {
          return p3Container;
        }
        parent = parent.getParent();
      }
      return null;
    },
    addToParentContainer: function addToParentContainer(gameObject) {
      // Do nothing if gameObject is not in any displayList
      if (!gameObject.displayList) {
        return this;
      }
      var p3Container = this.getParentContainer();
      if (!p3Container) {
        return this;
      }
      if (gameObject.isRexContainerLite) {
        // Add containerLite and its children
        gameObject.addToContainer(p3Container);
      } else {
        // Add gameObject directly
        p3Container.add(gameObject);
      }
      return this;
    },
    addToPatentLayer: function addToPatentLayer(gameObject) {
      // Do nothing if gameObject is not in any displayList
      if (!gameObject.displayList) {
        return this;
      }

      // At the same display list
      var parentLayer = this.displayList;
      if (parentLayer === gameObject.displayList) {
        return this;
      }
      if (IsLayerGameObject(parentLayer)) {
        if (gameObject.isRexContainerLite) {
          // Add containerLite and its children
          gameObject.addToLayer(parentLayer);
        } else {
          // Add gameObject directly
          parentLayer.add(gameObject);
        }
      }
      return this;
    }
  };

  var RenderLayer = {
    hasLayer: function hasLayer() {
      return !!this.privateRenderLayer;
    },
    enableLayer: function enableLayer() {
      if (this.hasLayer()) {
        return this;
      }
      var layer = this.scene.add.layer();
      // layer.name = (this.name) ? `${this.name}.privateLayer` : 'privateLayer';

      this.moveDepthBelow(layer);
      this.addToLayer(layer);
      this.privateRenderLayer = layer;
      return this;
    },
    getLayer: function getLayer() {
      if (!this.hasLayer()) {
        this.enableLayer();
      }
      return this.privateRenderLayer;
    },
    getRenderLayer: function getRenderLayer() {
      // This containerLite has a layer
      if (this.hasLayer()) {
        return this.privateRenderLayer;
      }

      // One of parent container has a layer
      var parent = this.getParent();
      while (parent) {
        var layer = parent.privateRenderLayer;
        if (layer) {
          return layer;
        }
        parent = parent.getParent();
      }
      return null;
    },
    // Internal method for adding child
    addToRenderLayer: function addToRenderLayer(gameObject) {
      // Don't add to layer if gameObject is not in any displayList
      if (!gameObject.displayList) {
        return this;
      }

      // Move gameObject from scene to layer
      var layer = this.getRenderLayer();
      if (!layer) {
        return this;
      }
      if (layer === gameObject.displayList) {
        return this;
      }
      if (gameObject.isRexContainerLite) {
        // Add containerLite and its children
        gameObject.addToLayer(layer);
      } else {
        // Add gameObject directly
        layer.add(gameObject);
      }
      var state = GetLocalState(gameObject);
      state.layer = layer;
      return this;
    },
    // Internal method for removing child
    removeFromRenderLayer: function removeFromRenderLayer(gameObject) {
      // Move gameObject from layer to scene
      var state = GetLocalState(gameObject);
      var layer = state.layer;
      if (!layer) {
        return this;
      }
      if (gameObject.isRexContainerLite) {
        // Remove containerLite and its children
        gameObject.removeFromLayer(true);
      } else {
        // Remove gameObject directly
        layer.remove(gameObject);
      }
      state.layer = null;
      return this;
    }
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var Union = Phaser.Geom.Rectangle.Union;
  var GetBoundsOfGameObjects = function GetBoundsOfGameObjects(gameObjects, out) {
    if (out === undefined) {
      out = new Rectangle();
    } else if (out === true) {
      if (GlobRect === undefined) {
        GlobRect = new Rectangle();
      }
      out = GlobRect;
    }
    out.setTo(0, 0, 0, 0);
    var gameObject;
    var firstClone = true;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      gameObject = gameObjects[i];
      if (!gameObject.getBounds) {
        continue;
      }
      var boundsRect = GetBounds$1(gameObject, true);
      if (firstClone) {
        out.setTo(boundsRect.x, boundsRect.y, boundsRect.width, boundsRect.height);
        firstClone = false;
      } else {
        Union(boundsRect, out, out);
      }
    }
    return out;
  };
  var GlobRect;

  var GameObjectClass = Phaser.GameObjects.GameObject;
  var IsGameObject = function IsGameObject(object) {
    return object instanceof GameObjectClass;
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var Snapshot = function Snapshot(config) {
    if (!config) {
      return;
    }
    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture; // renderTexture, or dynamicTexture
    var saveTexture = config.saveTexture;
    var x = GetValue$2(config, 'x', undefined);
    var y = GetValue$2(config, 'y', undefined);
    var width = GetValue$2(config, 'width', undefined);
    var height = GetValue$2(config, 'height', undefined);
    var originX = GetValue$2(config, 'originX', 0);
    var originY = GetValue$2(config, 'originY', 0);
    var padding = GetValue$2(config, 'padding', 0);
    var scrollX, scrollY;
    if (width === undefined || height === undefined || x === undefined || y === undefined) {
      // Union bounds of gameObjects
      var bounds = GetBoundsOfGameObjects(gameObjects, true);
      var isCenterOrigin = x !== undefined && y !== undefined;
      if (isCenterOrigin) {
        width = Math.max(x - bounds.left, bounds.right - x) * 2;
        height = Math.max(y - bounds.top, bounds.bottom - y) * 2;
        originX = 0.5;
        originY = 0.5;
      } else {
        x = bounds.x;
        y = bounds.y;
        width = bounds.width;
        height = bounds.height;
        originX = 0;
        originY = 0;
      }
      scrollX = bounds.x;
      scrollY = bounds.y;
    } else {
      scrollX = x + (0 - originX) * width;
      scrollY = y + (0 - originY) * height;
    }
    scrollX -= padding;
    scrollY -= padding;
    width += padding * 2;
    height += padding * 2;
    var scene = gameObjects[0].scene;
    var textureManager = scene.sys.textures;

    // Snapshot on dynamicTexture directly
    if (saveTexture && !renderTexture) {
      renderTexture = textureManager.addDynamicTexture(saveTexture, width, height);
    }

    // Return a renderTexture
    if (!renderTexture) {
      renderTexture = scene.add.renderTexture(0, 0, width, height);
    }
    if (renderTexture.setPosition) {
      renderTexture.setPosition(x, y);
    }
    if (renderTexture.width !== width || renderTexture.height !== height) {
      renderTexture.setSize(width, height);
    }
    if (renderTexture.setOrigin) {
      renderTexture.setOrigin(originX, originY);
    }
    renderTexture.camera.setScroll(scrollX, scrollY);

    // Draw gameObjects
    gameObjects = SortGameObjectsByDepth(Clone(gameObjects));
    renderTexture.draw(gameObjects);

    // Save render result to texture
    if (saveTexture) {
      if (IsGameObject(renderTexture)) {
        renderTexture.saveTexture(saveTexture);
      } else if (renderTexture.key !== saveTexture) {
        textureManager.renameTexture(renderTexture.key, key);
      }
    }
    return renderTexture;
  };

  var RenderTexture = {
    snapshot: function snapshot(config) {
      // Save scale
      var scaleXSave = this.scaleX;
      var scaleYSave = this.scaleY;
      var scale1 = scaleXSave === 1 && scaleYSave === 1;
      if (!scale1) {
        this.setScale(1);
      }

      // Snapshot with scale = 1
      if (config === undefined) {
        config = {};
      }
      config.gameObjects = this.getAllVisibleChildren();
      config.x = this.x;
      config.y = this.y;
      config.originX = this.originX;
      config.originY = this.originY;
      var rt = Snapshot(config);
      var isValidRT = !!rt.scene;

      // Restore scale
      if (!scale1) {
        this.setScale(scaleXSave, scaleYSave);
        if (isValidRT) {
          rt.setScale(scaleXSave, scaleYSave);
        }
      }
      return isValidRT ? rt : this;
    }
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var DrawBounds$1 = function DrawBounds(gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
    if (typeof config === 'number') {
      strokeColor = config;
    } else {
      strokeColor = GetValue$1(config, 'color');
      lineWidth = GetValue$1(config, 'lineWidth');
      fillColor = GetValue$1(config, 'fillColor');
      fillAlpha = GetValue$1(config, 'fillAlpha', 1);
      padding = GetValue$1(config, 'padding', 0);
    }
    if (Array.isArray(gameObjects)) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Draw(gameObjects[i], graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
      }
    } else {
      Draw(gameObjects, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
    }
  };
  var Draw = function Draw(gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding) {
    var canDrawBound = gameObject.getBounds || gameObject.width !== undefined && gameObject.height !== undefined;
    if (!canDrawBound) {
      return;
    }
    if (strokeColor === undefined) {
      strokeColor = 0xffffff;
    }
    if (lineWidth === undefined) {
      lineWidth = 1;
    }
    if (fillColor === undefined) {
      fillColor = null;
    }
    if (fillAlpha === undefined) {
      fillAlpha = 1;
    }
    if (padding === undefined) {
      padding = 0;
    }
    var p0 = GetTopLeft(gameObject, Points[0]);
    p0.x -= padding;
    p0.y -= padding;
    var p1 = GetTopRight(gameObject, Points[1]);
    p1.x += padding;
    p1.y -= padding;
    var p2 = GetBottomRight(gameObject, Points[2]);
    p2.x += padding;
    p2.y += padding;
    var p3 = GetBottomLeft(gameObject, Points[3]);
    p3.x -= padding;
    p3.y += padding;
    if (fillColor !== null) {
      graphics.fillStyle(fillColor, fillAlpha).fillPoints(Points, true, true);
    }
    if (strokeColor !== null) {
      graphics.lineStyle(lineWidth, strokeColor).strokePoints(Points, true, true);
    }
  };
  var Points = [{
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }];

  var GetValue = Phaser.Utils.Objects.GetValue;
  var DrawBounds = function DrawBounds(graphics, config) {
    var drawContainer = GetValue(config, 'drawContainer', true);
    var gameObjects = GetValue(config, 'children');
    if (gameObjects === undefined) {
      gameObjects = this.getAllVisibleChildren([this]);
    }
    if (!drawContainer) {
      gameObjects = gameObjects.filter(function (gameObject) {
        return !gameObject.isRexContainerLite;
      });
    }
    DrawBounds$1(gameObjects, graphics, config);
    return this;
  };

  var RotateAround = Phaser.Math.RotateAround;
  var ChangeOrigin$1 = function ChangeOrigin(gameObject, originX, originY) {
    if (originY === undefined) {
      originY = originX;
    }
    var deltaXY = {
      x: (originX - gameObject.originX) * gameObject.displayWidth,
      y: (originY - gameObject.originY) * gameObject.displayHeight
    };
    RotateAround(deltaXY, 0, 0, gameObject.rotation);
    gameObject.originX = originX;
    gameObject.originY = originY;
    gameObject.x = gameObject.x + deltaXY.x;
    gameObject.y = gameObject.y + deltaXY.y;
    return gameObject;
  };

  var ChangeOrigin = function ChangeOrigin(originX, originY) {
    this.syncChildrenEnable = false;
    ChangeOrigin$1(this, originX, originY);
    this.syncChildrenEnable = true;
    var children = this.getAllChildren();
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      this.resetChildPositionState(children[i]);
    }
    return this;
  };

  var methods = {
    changeOrigin: ChangeOrigin,
    drawBounds: DrawBounds
  };
  Object.assign(methods, Parent, AddChild, RemoveChild, ChildState, Transform, Position, Rotation, Scale, Visible, Alpha, Active, ScrollFactor, CameraFilter, Mask, Depth, Children, Tween, P3Container, RenderLayer, RenderTexture);

  var ContainerLite = /*#__PURE__*/function (_Base) {
    _inherits(ContainerLite, _Base);
    function ContainerLite(scene, x, y, width, height, children) {
      var _this;
      _classCallCheck(this, ContainerLite);
      if (Array.isArray(width)) {
        children = width;
        width = undefined;
        height = undefined;
      }
      _this = _callSuper(this, ContainerLite, [scene, x, y, width, height]);
      _this.type = 'rexContainerLite';
      _this.isRexContainerLite = true;
      _this.syncChildrenEnable = true;
      _this._active = true;
      _this._mask = null;
      _this._scrollFactorX = 1;
      _this._scrollFactorY = 1;
      _this._cameraFilter = 0;
      _this.privateRenderLayer = undefined;
      if (children) {
        _this.add(children);
      }
      return _this;
    }
    _createClass(ContainerLite, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        this.syncChildrenEnable = false; // Don't sync properties changing anymore
        _get(_getPrototypeOf(ContainerLite.prototype), "destroy", this).call(this, fromScene);
        if (this.privateRenderLayer) {
          this.privateRenderLayer.list.length = 0; // Remove all children without trigger callback
          this.privateRenderLayer.destroy();
        }
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        if (this._x === value) {
          return;
        }
        this._x = value;
        this.syncPosition();
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        if (this._y === value) {
          return;
        }
        this._y = value;
        this.syncPosition();
      }

      // Override
    }, {
      key: "rotation",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "rotation", this);
      },
      set: function set(value) {
        if (this.rotation === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "rotation", value, this, true);
        this.syncPosition();
      }

      // Override
    }, {
      key: "scaleX",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "scaleX", this);
      },
      set: function set(value) {
        if (this.scaleX === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "scaleX", value, this, true);
        this.syncPosition();
      }

      // Override
    }, {
      key: "scaleY",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "scaleY", this);
      },
      set: function set(value) {
        if (this.scaleY === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "scaleY", value, this, true);
        this.syncPosition();
      }

      // Override
    }, {
      key: "scale",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "scale", this);
      },
      set: function set(value) {
        if (this.scale === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "scale", value, this, true);
        this.syncPosition();
      }

      // Override
    }, {
      key: "visible",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "visible", this);
      },
      set: function set(value) {
        if (_get(_getPrototypeOf(ContainerLite.prototype), "visible", this) === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "visible", value, this, true);
        this.syncVisible();
      }

      // Override
    }, {
      key: "alpha",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "alpha", this);
      },
      set: function set(value) {
        if (_get(_getPrototypeOf(ContainerLite.prototype), "alpha", this) === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "alpha", value, this, true);
        this.syncAlpha();
      }

      // Override
    }, {
      key: "active",
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        if (this._active === value) {
          return;
        }
        this._active = value;
        this.syncActive();
      }

      // Override
    }, {
      key: "mask",
      get: function get() {
        return this._mask;
      },
      set: function set(mask) {
        if (this._mask === mask) {
          return;
        }
        this._mask = mask;
        this.syncMask();
      }

      // Override
    }, {
      key: "scrollFactorX",
      get: function get() {
        return this._scrollFactorX;
      },
      set: function set(value) {
        if (this._scrollFactorX === value) {
          return;
        }
        this._scrollFactorX = value;
        this.syncScrollFactor();
      }
    }, {
      key: "scrollFactorY",
      get: function get() {
        return this._scrollFactorY;
      },
      set: function set(value) {
        if (this._scrollFactorY === value) {
          return;
        }
        this._scrollFactorY = value;
        this.syncScrollFactor();
      }
    }, {
      key: "cameraFilter",
      get: function get() {
        return this._cameraFilter;
      },
      set: function set(value) {
        if (this._cameraFilter === value) {
          return;
        }
        this._cameraFilter = value;
        this.syncCameraFilter();
      }

      // Compatiable with container plugin
    }, {
      key: "list",
      get: function get() {
        return this.children;
      }
    }, {
      key: "parentContainer",
      get:
      // For p3-container
      function get() {
        return this._parentContainer;
      },
      set: function set(value) {
        // Initialize
        if (!this._parentContainer && !value) {
          this._parentContainer = value;
          return;
        }

        // Set this._parentContainer only,
        // if under AddToContainer, or RemoveFromContainer methods
        if (this.setParentContainerFlag) {
          this._parentContainer = value;
          return;
        }
        // else if (!this.setParentContainerFlag)

        // Add itself and all children to container,
        // Or remove itseld and all children from container
        if (this._parentContainer && !value) {
          // Remove from container
          this.removeFromContainer();
          this._parentContainer = value;
        } else if (value) {
          // Add to container
          this._parentContainer = value;
          this.addToContainer(value);
        } else {
          this._parentContainer = value;
        }
      }
    }, {
      key: "setParentContainerFlag",
      get: function get() {
        if (this._setParentContainerFlag) {
          return true;
        }
        var parent = GetParent(this);
        return parent ? parent.setParentContainerFlag : false;
      }
    }], [{
      key: "GetParent",
      value: function GetParent$1(child) {
        return GetParent(child);
      }
    }]);
    return ContainerLite;
  }(Base);
  Object.assign(ContainerLite.prototype, methods);

  var AddChess = function AddChess(gameObject, tileX, tileY, tileZ) {
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);

    // Add chess to borad
    this.board.addChess(gameObject, tileX, tileY, tileZ, true);
    // Add chess to container
    if (IsUID(gameObject)) {
      gameObject = this.board.uidToChess(gameObject);
    }
    this.add(gameObject);
    grid.restoreOrigin();
    return this;
  };

  var RemoveChess = function RemoveChess(gameObject, tileX, tileY, tileZ, destroy) {
    this.board.removeChess(gameObject, tileX, tileY, tileZ, destroy);
    return this;
  };

  var RemoveAllChess = function RemoveAllChess(destroy) {
    this.board.removeAllChess(destroy);
    return this;
  };

  var SetMainBoard = function SetMainBoard(mainBoard, tileX, tileY) {
    this.mainBoardRef.set(mainBoard, tileX, tileY);
    if (mainBoard) {
      this.lastMainBoardRef.set(mainBoard, tileX, tileY);
    }
    return this;
  };

  var CanPutOnMainBoard = function CanPutOnMainBoard(mainBoard, tileX, tileY, chessTileXYMap) {
    if (!mainBoard) {
      return false;
    }
    if (chessTileXYMap === undefined) {
      chessTileXYMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    var chessTileXYZ, mappedTileXY, isOccupied;
    for (var uid in chessTileXYMap) {
      chessTileXYZ = chessTileXYMap[uid];
      mappedTileXY = mainBoard.offset(chessTileXYZ, tileX, tileY, true);
      if (!mainBoard.contains(mappedTileXY.x, mappedTileXY.y)) {
        return false;
      }
      if (this.putTestCallback) {
        // Custom test function
        targetTileXY.x = mappedTileXY.x;
        targetTileXY.y = mappedTileXY.x;
        targetTileXY.z = chessTileXYZ.z;
        var chess = this.board.uidToChess(uid);
        if (this.putTestCallbackScpe) {
          isOccupied = this.putTestCallback.call(this.putTestCallbackScpe, targetTileXY, mainBoard, chess);
        } else {
          isOccupied = this.putTestCallback(targetTileXY, mainBoard, chess);
        }
      } else {
        // Default test function
        isOccupied = mainBoard.contains(mappedTileXY.x, mappedTileXY.y, chessTileXYZ.z);
      }
      if (isOccupied) {
        return false;
      }
    }
    return true;
  };
  var targetTileXY = {
    x: 0,
    y: 0,
    z: 0
  };

  var PutOnMainBoard = function PutOnMainBoard(mainBoard, tileX, tileY, align) {
    if (!mainBoard) {
      return this;
    }
    if (tileX === undefined) {
      var out = mainBoard.worldXYToTileXY(this.x, this.y, true);
      tileX = out.x;
      tileY = out.y;
    }
    if (align === undefined) {
      align = true;
    }
    this.pullOutFromMainBoard();
    if (!this.canPutOnMainBoard(mainBoard, tileX, tileY)) {
      return this;
    }
    this.setMainBoard(mainBoard, tileX, tileY);
    var tileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    var chessTileXYZ, mappedTileXY;
    for (var uid in tileXYZMap) {
      chessTileXYZ = tileXYZMap[uid];
      uid = parseInt(uid);
      mappedTileXY = mainBoard.offset(chessTileXYZ, tileX, tileY, true);
      mainBoard.addChess(uid, mappedTileXY.x, mappedTileXY.y, chessTileXYZ.z, false);
    }
    if (align) {
      this.alignToMainBoard(mainBoard, tileX, tileY);
    }
    return this;
  };

  var PullOutFromMainBoard = function PullOutFromMainBoard() {
    var mainBoard = this.mainBoard;
    if (mainBoard === null) {
      return this;
    }
    var tileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    for (var uid in tileXYZMap) {
      mainBoard.removeChess(parseInt(uid));
    }
    this.setMainBoard(null);
    return this;
  };

  var PutBack = function PutBack() {
    var mainBoard = this.lastMainBoardRef.mainBoard;
    var tileX = this.lastMainBoardRef.tileX;
    var tileY = this.lastMainBoardRef.tileY;
    this.putOnMainBoard(mainBoard, tileX, tileY, false);
    return this;
  };

  var IsOverlapping = function IsOverlapping(mainBoard, tileZ) {
    if (!mainBoard) {
      return false;
    }
    var gameObject;
    for (var uid in this.tileXYZMap) {
      gameObject = this.board.uidToChess(uid);
      if (mainBoard.isOverlappingPoint(gameObject.x, gameObject.y, tileZ)) {
        return true;
      }
    }
    return false;
  };

  var AlignToMainBoard = function AlignToMainBoard(mainBoard, tileX, tileY) {
    if (!mainBoard) {
      return this;
    }
    if (tileX === undefined) {
      var out = mainBoard.worldXYToTileXY(this.x, this.y, true);
      tileX = out.x;
      tileY = out.y;
    }
    mainBoard.gridAlign(this, tileX, tileY);
    return this;
  };

  var OnPointerDown = function OnPointerDown(pointer) {
    if (!this.input.enable) {
      return;
    }
    if (!pointer.isDown) {
      return;
    }
    if (this.input.pointer === null) {
      // Catch new touch pointer
      this.input.pointer = pointer;
    }
    var hitChess = OnTouchTileStart.call(this, pointer);
    if (hitChess) {
      OnDragStart.call(this, pointer);
    }
  };
  var OnTouchTileStart = function OnTouchTileStart(pointer) {
    // Get touched tileX, tileY
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);
    var out = this.board.worldXYToTileXY(pointer.x, pointer.y, true);
    var tileX = out.x,
      tileY = out.y;
    grid.restoreOrigin();
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;

    // Get touched chess
    var gameObjects = this.board.tileXYToChessArray(tileX, tileY, globChessArray$2);
    var hitChess = gameObjects.length > 0;
    if (hitChess) {
      // Fire events
      var gameObject;
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
          gameObject.emit('miniboard.pointerdown', pointer);
        }
        this.emit('gameobjectdown', pointer, gameObject);
      }
      this.emit('pointerdown', pointer, this);
    }
    globChessArray$2.length = 0;
    return hitChess;
  };
  var OnDragStart = function OnDragStart(pointer) {
    var dragData = this.input.drag;
    // Drag by another pointer
    if (dragData.state === 1) {
      return;
    }
    var dragPosition = dragData.position;
    dragPosition.x = pointer.x - this.x;
    dragPosition.y = pointer.y - this.y;
    dragData.state = 1;
    this.emit('dragstart', pointer, dragPosition.x, dragPosition.y);
  };
  var globChessArray$2 = [];

  var DragEnd = function DragEnd(pointer) {
    var dragData = this.input.drag;
    // Not dragging
    if (dragData.state === 0) {
      return;
    }
    if (pointer === undefined) {
      pointer = this.input.pointer;
    }
    var dragPosition = dragData.position;
    var dragX = pointer.x - dragPosition.x;
    var dragY = pointer.y - dragPosition.y;
    dragData.state = 0;
    this.emit('dragend', pointer, dragX, dragY);
    return this;
  };

  var OnPointerUp = function OnPointerUp(pointer) {
    if (!this.input.enable) {
      return;
    }
    OnTouchTileEnd.call(this, pointer);
    DragEnd.call(this, pointer);
    if (this.input.pointer === pointer) {
      // Release touch pointer
      this.input.pointer = null;
    }
  };
  var OnTouchTileEnd = function OnTouchTileEnd(pointer) {
    // Get touched tileX, tileY
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);
    var out = this.board.worldXYToTileXY(pointer.x, pointer.y, true);
    var tileX = out.x,
      tileY = out.y;
    grid.restoreOrigin();
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;

    // Get touched chess
    var gameObjects = this.board.tileXYToChessArray(tileX, tileY, globChessArray$1);
    var hitChess = gameObjects.length > 0;
    if (hitChess) {
      // Fire events
      var gameObject;
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
          gameObject.emit('miniboard.pointerup', pointer);
        }
        this.emit('gameobjectup', pointer, gameObject);
      }
      this.emit('pointerup', pointer, this);
    }
    globChessArray$1.length = 0;
    return hitChess;
  };
  var globChessArray$1 = [];

  var OnPointerMove = function OnPointerMove(pointer) {
    if (!this.input.enable) {
      return;
    }
    OnTouchTileMove.call(this, pointer);
    OnDrag.call(this, pointer);
  };
  var OnTouchTileMove = function OnTouchTileMove(pointer) {
    // Get touched tileX, tileY
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);
    var out = this.board.worldXYToTileXY(pointer.x, pointer.y, true);
    var tileX = out.x,
      tileY = out.y;
    grid.restoreOrigin();
    if (this.input.tilePosition.x === tileX && this.input.tilePosition.y === tileY) {
      // Tile position dose not change
      return;
    }
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;

    // Get touched chess
    var gameObjects = this.board.tileXYToChessArray(tileX, tileY, globChessArray);
    var hitChess = gameObjects.length > 0;
    if (hitChess) {
      // Fire events
      var gameObject;
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
          gameObject.emit('miniboard.pointermove', pointer);
        }
        this.emit('gameobjectmove', pointer, gameObject);
      }
      this.emit('pointermove', pointer, this);
    } else {
      // Move outside
      if (this.input.pointer === pointer) {
        // Release touch pointer
        this.input.pointer = null;
      }
    }
    globChessArray.length = 0;

    // Not dragging
    if (this.input.drag.state === 0) {
      if (this.input.pointer === pointer) {
        if (!hitChess) {
          this.input.pointer = null; // Release touch pointer
        }
      } else if (this.input.pointer === null) {
        this.input.pointer = pointer; // Catch new touch pointer
      }
    }
  };
  var OnDrag = function OnDrag(pointer) {
    var dragData = this.input.drag;
    // Not dragging
    if (dragData.state === 0) {
      return;
    }
    var dragPosition = dragData.position;
    var dragX = pointer.x - dragPosition.x;
    var dragY = pointer.y - dragPosition.y;
    this.emit('drag', pointer, dragX, dragY);
  };
  var globChessArray = [];

  var SetInteractive = function SetInteractive(enable) {
    if (enable === undefined) {
      enable = true;
    }
    if (!this.input) {
      this.input = {
        enable: true,
        tilePosition: {
          x: undefined,
          y: undefined
        },
        pointer: undefined,
        drag: {
          enable: false,
          state: 0,
          position: {
            x: undefined,
            y: undefined
          }
        }
      };
      this.scene.input.on('pointerdown', OnPointerDown, this);
      this.scene.input.on('pointerup', OnPointerUp, this);
      this.scene.input.on('pointermove', OnPointerMove, this);
      this.once('destroy', function () {
        if (this.scene) {
          this.scene.input.off('pointerdown', OnPointerDown, this);
          this.scene.input.off('pointerup', OnPointerUp, this);
          this.scene.input.off('pointermove', OnPointerMove, this);
        }
      }, this);
    }
    this.input.enable = enable;
    if (!enable) {
      this.input.pointer = null;
    }
    return this;
  };

  var SetDraggable = function SetDraggable(enable) {
    if (enable === undefined) {
      enable = true;
    }
    this.setInteractive();
    this.input.drag.enable = enable;
    if (!enable) {
      this.input.drag.state = 0;
    }
    return this;
  };

  var Mirror$1 = function Mirror(mode, chessTileXYZMap, out) {
    if (mode === undefined) {
      mode = 1;
    } else if (typeof mode === 'string') {
      mode = MODE[mode];
    }
    if (chessTileXYZMap === undefined) {
      chessTileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    if (out === undefined) {
      out = {};
    }
    var chessTileXYZ, newTileXYZ;
    for (var uid in chessTileXYZMap) {
      chessTileXYZ = chessTileXYZMap[uid];
      newTileXYZ = this.board.mirror(chessTileXYZ, mode);
      newTileXYZ.z = chessTileXYZ.z;
      out[uid] = newTileXYZ;
    }
    return out; // {uid:{x,y,z}}
  };
  var MODE = {
    x: 1,
    y: 2,
    'x&y': 3
  };

  var CanMirror = function CanMirror(mode) {
    if (this.mainBoard === null) {
      return true;
    }
    var newTileXYZMap = Mirror$1.call(this, mode);
    return this.canPutOnMainBoard(this.mainBoard, tileX, tileY, newTileXYZMap);
  };

  var ResetChessTileXYZ = function ResetChessTileXYZ(newTileXYZMap) {
    this.removeAllChess();
    var newTileXYZ;
    for (var uid in newTileXYZMap) {
      newTileXYZ = newTileXYZMap[uid];
      uid = parseInt(uid);
      this.addChess(uid, newTileXYZ.x, newTileXYZ.y, newTileXYZ.z, false);
    }
    return this;
  };

  var Mirror = function Mirror(mode) {
    var isOnMainBoard = this.mainBoard != null;
    if (isOnMainBoard) {
      this.pullOutFromMainBoard();
    }
    var newTileXYZMap = Mirror$1.call(this, mode);
    if (isOnMainBoard) {
      var mainBoard = this.lastMainBoardRef.mainBoard;
      var tileX = this.lastMainBoardRef.tileX;
      var tileY = this.lastMainBoardRef.tileY;
      this.lastTransferResult = this.canPutOnMainBoard(mainBoard, tileX, tileY, newTileXYZMap);
      if (this.lastTransferResult) {
        ResetChessTileXYZ.call(this, newTileXYZMap);
      }
      this.putBack();
    } else {
      this.lastTransferResult = true;
      ResetChessTileXYZ.call(this, newTileXYZMap);
    }
    return this;
  };

  var Rotate$1 = function Rotate(direction, chessTileXYZMap, out) {
    if (direction === undefined) {
      direction = 0;
    }
    if (chessTileXYZMap === undefined) {
      chessTileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    if (out === undefined) {
      out = {};
    }
    var chessTileXYZ, newTileXYZ;
    for (var uid in chessTileXYZMap) {
      chessTileXYZ = chessTileXYZMap[uid];
      newTileXYZ = this.board.rotate(chessTileXYZ, direction);
      newTileXYZ.z = chessTileXYZ.z;
      out[uid] = newTileXYZ;
    }
    return out; // {uid:{x,y,z}}
  };

  var CanRotate = function CanRotate(direction) {
    if (this.mainBoard === null) {
      return true;
    }
    var newTileXYZMap = Rotate$1.call(this, direction);
    return this.canPutOnMainBoard(this.mainBoard, tileX, tileY, newTileXYZMap);
  };

  var Rotate = function Rotate(direction) {
    if (direction === 0) {
      return this;
    }
    var isOnMainBoard = this.mainBoard != null;
    if (isOnMainBoard) {
      this.pullOutFromMainBoard();
    }
    var newTileXYZMap = Rotate$1.call(this, direction);
    if (isOnMainBoard) {
      var mainBoard = this.lastMainBoardRef.mainBoard;
      var tileX = this.lastMainBoardRef.tileX;
      var tileY = this.lastMainBoardRef.tileY;
      this.lastTransferResult = this.canPutOnMainBoard(mainBoard, tileX, tileY, newTileXYZMap);
      if (this.lastTransferResult) {
        ResetChessTileXYZ.call(this, newTileXYZMap);
      }
      this.putBack();
    } else {
      this.lastTransferResult = true;
      ResetChessTileXYZ.call(this, newTileXYZMap);
    }
    if (this.lastTransferResult) {
      this.setFace(this.face + direction);
    }
    return this;
  };

  var CanRotateTo = function CanRotateTo(direction) {
    direction -= this.face;
    return this.canRotate(direction);
  };

  var RotateTo = function RotateTo(direction) {
    direction -= this.face;
    this.rotate(direction);
    return this;
  };

  var GetMinMaxTileXY = function GetMinMaxTileXY(chessTileXYZMap, out) {
    if (chessTileXYZMap === undefined) {
      chessTileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globResult;
    }
    var minX = Infinity,
      maxX = -Infinity;
    var minY = Infinity,
      maxY = -Infinity;
    var chessTileXYZ;
    for (var uid in this.tileXYZMap) {
      chessTileXYZ = this.tileXYZMap[uid];
      if (chessTileXYZ.x < minX) {
        minX = chessTileXYZ.x;
      }
      if (chessTileXYZ.x > maxX) {
        maxX = chessTileXYZ.x;
      }
      if (chessTileXYZ.y < minY) {
        minY = chessTileXYZ.y;
      }
      if (chessTileXYZ.y > maxY) {
        maxY = chessTileXYZ.y;
      }
    }
    out.minX = minX;
    out.minY = minY;
    out.maxX = maxX;
    out.maxY = maxY;
    return out;
  };
  var globResult = {};

  var Offset = function Offset(tileX, tileY, chessTileXYZMap, out) {
    if (chessTileXYZMap === undefined) {
      chessTileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    }
    if (out === undefined) {
      out = {};
    }
    var chessTileXYZ, newTileXYZ;
    for (var uid in chessTileXYZMap) {
      chessTileXYZ = chessTileXYZMap[uid];
      newTileXYZ = this.board.offset(chessTileXYZ, tileX, tileY);
      newTileXYZ.z = chessTileXYZ.z;
      out[uid] = newTileXYZ;
    }
    return out; // {uid:{x,y,z}}
  };

  var SetOrigin = function SetOrigin(originX, originY) {
    switch (originX) {
      case 'center':
        originX = 0.5;
        originY = 0.5;
        break;
      case 'top-left':
      case 'left-top':
        originX = 0;
        originY = 0;
        break;
    }
    if (originX === undefined) {
      originX = 0.5;
    }
    if (originY === undefined) {
      originY = originX;
    }
    var minMaxTileXY = GetMinMaxTileXY.call(this, undefined, true);
    var offsetX = -Math.floor(Linear(minMaxTileXY.minX, minMaxTileXY.maxX, originX));
    var offsetY = -Math.floor(Linear(minMaxTileXY.minY, minMaxTileXY.maxY, originY));
    if (offsetX !== 0 || offsetY !== 0) {
      var newTileXYZMap = Offset.call(this, offsetX, offsetY);
      ResetChessTileXYZ.call(this, newTileXYZMap);
      var worldOffsetXY = this.board.tileXYToWorldXY(offsetX, offsetY);
      var world0 = this.board.tileXYToWorldXY(0, 0);
      this.setPosition(this.x + (world0.x - worldOffsetXY.x), this.y + (world0.y - worldOffsetXY.y));
    }
    return this;
  };

  var Methods = {
    addChess: AddChess,
    removeChess: RemoveChess,
    removeAllChess: RemoveAllChess,
    pullOutFromMainBoard: PullOutFromMainBoard,
    canPutOnMainBoard: CanPutOnMainBoard,
    putOnMainBoard: PutOnMainBoard,
    putBack: PutBack,
    isOverlapping: IsOverlapping,
    alignToMainBoard: AlignToMainBoard,
    setInteractive: SetInteractive,
    setDraggable: SetDraggable,
    dragEnd: DragEnd,
    setMainBoard: SetMainBoard,
    canMirror: CanMirror,
    mirror: Mirror,
    canRotate: CanRotate,
    rotate: Rotate,
    canRotateTo: CanRotateTo,
    rotateTo: RotateTo,
    setOrigin: SetOrigin
  };

  var MainBoardReference = /*#__PURE__*/function () {
    function MainBoardReference(miniBoard) {
      _classCallCheck(this, MainBoardReference);
      this.miniBoard = miniBoard;
      this.set(null);
    }
    _createClass(MainBoardReference, [{
      key: "set",
      value: function set(mainBoard, tileX, tileY) {
        if (!mainBoard) {
          mainBoard = null;
          tileX = null;
          tileY = null;
        }
        this.mainBoard = mainBoard;
        this.tileX = tileX;
        this.tileY = tileY;
      }
    }]);
    return MainBoardReference;
  }();

  var MiniBoard = /*#__PURE__*/function (_Container) {
    _inherits(MiniBoard, _Container);
    function MiniBoard(scene, x, y, config) {
      var _this;
      _classCallCheck(this, MiniBoard);
      _this = _callSuper(this, MiniBoard, [scene, x, y, 0, 0]);
      _this.type = 'rexMiniBoard';
      var boardConfig = {
        isBoard: false,
        grid: GetValue$c(config, 'grid', undefined),
        infinity: true,
        wrap: false
      };
      _this.board = new Board$1(scene, boardConfig);
      _this.mainBoardRef = new MainBoardReference();
      _this.lastMainBoardRef = new MainBoardReference();
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(MiniBoard, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setFace(GetValue$c(o, 'face', 0));
        var dragEnable = GetValue$c(o, 'draggable', undefined);
        if (dragEnable !== undefined) {
          this.setDraggable(dragEnable);
        }
        this.setPutTestCallback(GetValue$c(o, 'putTestCallback', undefined), GetValue$c(o, 'putTestCallbackScpe', undefined));
        this.lastTransferResult = GetValue$c(o, 'lastTransferResult', undefined);
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        if (!this.scene) {
          return;
        }
        this.clear(!fromScene);
        this.board.shutdown(fromScene);
        this.board = undefined;
        this.setPutTestCallback(undefined, undefined);
        _get(_getPrototypeOf(MiniBoard.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "setFace",
      value: function setFace(direction) {
        this.face = this.board.grid.directionNormalize(direction);
        return this;
      }
    }, {
      key: "mainBoard",
      get: function get() {
        return this.mainBoardRef.mainBoard;
      }
    }, {
      key: "tileX",
      get: function get() {
        return this.mainBoardRef.tileX;
      }
    }, {
      key: "tileY",
      get: function get() {
        return this.mainBoardRef.tileY;
      }
    }, {
      key: "grid",
      get: function get() {
        return this.board.grid;
      }
    }, {
      key: "tileXYZMap",
      get: function get() {
        return this.board.boardData.UIDToXYZ; // {uid:{x,y,z}}
      }
    }, {
      key: "setPutTestCallback",
      value: function setPutTestCallback(callback, scope) {
        this.putTestCallback = callback;
        this.putTestCallbackScpe = scope;
        return this;
      }
    }]);
    return MiniBoard;
  }(ContainerLite);
  Object.assign(MiniBoard.prototype, Methods);

  ObjectFactory.register('miniBoard', function (x, y, config) {
    var gameObject = new MiniBoard(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Board.MiniBoard', MiniBoard);

  var GetHexagonMap = function GetHexagonMap(board, radius, out) {
    if (out === undefined) {
      out = [];
    }
    var mode = board.grid.mode;
    var r1, r2;
    for (var q = -radius; q <= radius; q++) {
      r1 = Math.max(-radius, -q - radius);
      r2 = Math.min(radius, -q + radius);
      for (var r = r1; r <= r2; r++) {
        out.push(cube2cr(mode, q, r, -q - r));
      }
    }
    return out;
  };

  var GetTriangleMap = function GetTriangleMap(board, type, height, out) {
    if (out === undefined) {
      out = [];
    }
    var mode = board.grid.mode;
    var rStart, rEnd;
    for (var q = 0; q <= height; q++) {
      if (type === 1) {
        rStart = height - q;
        rEnd = height;
      } else {
        rStart = 0;
        rEnd = height - q;
      }
      for (var r = rStart; r <= rEnd; r++) {
        out.push(cube2cr(mode, q, r, -q - r));
      }
    }
    return out;
  };

  var GetParallelogramMap = function GetParallelogramMap(board, type, width, height, out) {
    if (out === undefined) {
      out = [];
    }
    var mode = board.grid.mode;
    switch (type) {
      case 1:
        for (var s = 0; s <= width; s++) {
          for (var q = 0; q <= height; q++) {
            out.push(cube2cr(mode, q, -q - s, s));
          }
        }
        break;
      case 2:
        for (var r = 0; r <= width; r++) {
          for (var s = 0; s <= height; s++) {
            out.push(cube2cr(mode, -r - s, r, s));
          }
        }
        break;
      default:
        // case 0
        for (var q = 0; q <= width; q++) {
          for (var r = 0; r <= height; r++) {
            out.push(cube2cr(mode, q, r, -q - r));
          }
        }
        break;
    }
    return out;
  };

  var HexagonMap = {
    hexagon: GetHexagonMap,
    triangle: GetTriangleMap,
    parallelogram: GetParallelogramMap
  };

  var Pad = Phaser.Utils.String.Pad;
  var GetStyle = function GetStyle(style, canvas, context) {
    if (style == null) {
      return style;
    }
    switch (_typeof(style)) {
      case 'string':
        return style;
      case 'number':
        return "#".concat(Pad(Math.floor(style).toString(16), 6, '0', 1));
      case 'function':
        return style(canvas, context);
      case 'object':
        if (style.hasOwnProperty('r')) {
          if (style.hasOwnProperty('a')) {
            // rgba
            return "rgba(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ",").concat(style.a, ")");
          } else {
            // rgb
            return "rgb(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ")");
          }
        } else if (style.hasOwnProperty('h')) {
          if (style.hasOwnProperty('a')) {
            // hsla
            return "hsla(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ",").concat(style.a, ")");
          } else {
            // hsl
            return "hsl(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ")");
          }
        } else {
          return style; // Not a valid input
        }
      default:
        return style;
    }
  };

  var AddPolygonPath = function AddPolygonPath(context, points) {
    context.save();
    context.beginPath();
    var point = points[0];
    context.moveTo(point.x, point.y);
    for (var i = 1, cnt = points.length; i < cnt; i++) {
      point = points[i];
      context.lineTo(point.x, point.y);
    }
    context.closePath();
    context.restore();
  };

  var DrawPolygon = function DrawPolygon(canvas, context, points, fillStyle, strokeStyle, lineWidth, lineJoin) {
    if (lineJoin === undefined) {
      lineJoin = 'round';
    }
    AddPolygonPath(context, points);
    context.lineJoin = lineJoin;
    if (fillStyle != null) {
      context.fillStyle = fillStyle;
      context.fill();
    }
    if (strokeStyle != null) {
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;
      context.stroke();
    }
  };

  var CreatePolygonTexture = function CreatePolygonTexture(scene, key, points, fillStyle, strokeStyle, lineWidth, expandSize, lineJoin) {
    if (fillStyle === undefined && strokeStyle === undefined) {
      fillStyle = 0xffffff;
    }
    if (strokeStyle === undefined) {
      lineWidth = 0;
    } else if (lineWidth === undefined) {
      lineWidth = 2;
    }
    if (lineJoin === undefined) {
      lineJoin = 'round';
    }
    if (expandSize === undefined) {
      expandSize = false;
    }
    globBounds = GetBounds(points, globBounds);
    OffsetPoints(points, -globBounds.left, -globBounds.top);
    var width = globBounds.right - globBounds.left;
    var height = globBounds.bottom - globBounds.top;
    if (!expandSize) {
      IndentPoints(points, globBounds, lineWidth);
    } else {
      width += lineWidth;
      height += lineWidth;
      OffsetPoints(points, lineWidth / 2);
    }
    var texture = scene.sys.textures.createCanvas(key, Math.ceil(width), Math.ceil(height));
    var canvas = texture.getCanvas();
    var context = texture.getContext();
    DrawPolygon(canvas, context, points, GetStyle(fillStyle, canvas, context), GetStyle(strokeStyle, canvas, context), lineWidth, lineJoin);
    texture.refresh();
  };
  var GetBounds = function GetBounds(points, out) {
    if (out === undefined) {
      out = {};
    }
    var left = Infinity,
      top = Infinity,
      right = -Infinity,
      bottom = -Infinity;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
      var p = points[i],
        px = p.x,
        py = p.y;
      left = Math.min(left, px);
      top = Math.min(top, py);
      right = Math.max(right, px);
      bottom = Math.max(bottom, py);
    }
    out.left = left;
    out.top = top;
    out.right = right;
    out.bottom = bottom;
    return out;
  };
  var IndentPoints = function IndentPoints(points, bounds, lineWidth) {
    if (lineWidth === 0) {
      return points;
    }
    var width = bounds.right - bounds.left;
    var height = bounds.bottom - bounds.top;
    var halfW = width / 2;
    var halfH = height / 2;
    var halfLW = lineWidth / 2;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
      var p = points[i];
      p.x = Indent(p.x, halfW, halfLW);
      p.y = Indent(p.y, halfH, halfLW);
    }
    return points;
  };
  var Indent = function Indent(value, halfBound, offset) {
    if (value < halfBound) {
      return value + offset;
    } else if (value > halfBound) {
      return value - offset;
    } else {
      return value;
    }
  };
  var OffsetPoints = function OffsetPoints(points, x, y) {
    if (y === undefined) {
      y = x;
    }
    if (x === 0 && y === 0) {
      return points;
    }
    for (var i = 0, cnt = points.length; i < cnt; i++) {
      var p = points[i];
      p.x += x;
      p.y += y;
    }
    return points;
  };
  var globBounds;

  var CreateTileTexture = function CreateTileTexture(board, key, fillStyle, strokeStyle, lineWidth, overlapGrid, lineJoin) {
    if (typeof overlapGrid === 'string') {
      lineJoin = overlapGrid;
      overlapGrid = undefined;
    }
    if (overlapGrid === undefined) {
      overlapGrid = true;
    }
    if (lineJoin === undefined) {
      lineJoin = 'miter';
    }
    CreatePolygonTexture(board.scene, key, board.getGridPoints(0, 0, true), fillStyle, strokeStyle, lineWidth, overlapGrid, lineJoin);
  };

  var CreateBoard = function CreateBoard(tilemap) {
    var board = new Board(tilemap.scene, {
      grid: CreateGridConfig(tilemap),
      width: tilemap.width,
      height: tilemap.height
    });
    return board;
  };
  var CreateGridConfig = function CreateGridConfig(tilemap) {
    var grid = {
      cellWidth: tilemap.tileWidth,
      cellHeight: tilemap.tileHeight
    };
    switch (tilemap.orientation) {
      case 0:
        // ORTHOGONAL
        grid.gridType = 'quadGrid';
        grid.type = 'orthogonal';
        break;
      case 1:
        // ISOMETRIC
        grid.gridType = 'quadGrid';
        grid.type = 'isometric';
        break;
      case 3:
        // HEXAGONAL
        grid.gridType = 'hexagonGrid';
        grid.staggeraxis = 'y';
        grid.staggerindex = 'odd';
        break;
      default:
        // ORTHOGONAL
        grid.gridType = 'quadGrid';
        grid.type = 'orthogonal';
        break;
    }
    var layer = tilemap.layers[0];
    if (layer) {
      grid.x = layer.x;
      grid.y = layer.y;
    }
    return grid;
  };

  var AddLayers = function AddLayers(board, tilemap, layers) {
    if (layers === undefined) {
      layers = tilemap.layers;
    } else if (!Array.isArray(layers)) {
      layers = [layers];
    }
    for (var i = 0, cnt = layers.length; i < cnt; i++) {
      var layer = layers[i];
      if (typeof layer === 'string') {
        layer = tilemap.getLayer(layer);
      }
      if (IsGameObject(layer)) {
        layer = layer.layer;
      }
      AddLayer(board, layer);
    }
  };
  var AddLayer = function AddLayer(board, layer) {
    var tileZ = layer.name;
    var layerData = layer.data;
    for (var y = 0, ycnt = layerData.length; y < ycnt; y++) {
      var layerRow = layerData[y];
      for (var x = 0, xcnt = layerRow.length; x < xcnt; x++) {
        var tile = layerRow[x];
        board.addChess(tile, x, y, tileZ, false);
      }
    }
  };

  var CreateBoardFromTilemap = function CreateBoardFromTilemap(tilemap, layers) {
    var board = CreateBoard(tilemap);
    AddLayers(board, tilemap, layers);
    return board;
  };

  var BoardPlugin = /*#__PURE__*/function (_Phaser$Plugins$Scene) {
    _inherits(BoardPlugin, _Phaser$Plugins$Scene);
    function BoardPlugin(scene, pluginManager) {
      var _this;
      _classCallCheck(this, BoardPlugin);
      _this = _callSuper(this, BoardPlugin, [scene, pluginManager]);
      _this.add = new ObjectFactory(scene);

      // Helper functions
      _this.hexagonMap = HexagonMap;
      _this.createTileTexture = CreateTileTexture;
      _this.createBoardFromTilemap = CreateBoardFromTilemap;
      return _this;
    }
    _createClass(BoardPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.scene.sys.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return BoardPlugin;
  }(Phaser.Plugins.ScenePlugin);

  return BoardPlugin;

}));
