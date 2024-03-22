(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbbcodelog = factory());
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
  var GetValue = function GetValue(source, key, defaultValue) {
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

  // https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js

  var EscapeRegex = function EscapeRegex(s) {
    return s.replace(re0, '\\$&').replace(re1, '\\x2d');
  };
  var re0 = /[|\\{}()[\]^$+*?.]/g;
  var re1 = /-/g;

  var BracketParser$1 = /*#__PURE__*/function () {
    function BracketParser(config) {
      _classCallCheck(this, BracketParser);
      // Event emitter
      this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

      // Value convert
      this.setValueConverter(GetValue(config, 'valueConvert', true));
      // Loop
      this.setLoopEnable(GetValue(config, 'loop', false));

      // Brackets and generate regex
      this.setMultipleLinesTagEnable(GetValue(config, 'multipleLinesTag', false));
      var delimiters = GetValue(config, 'delimiters', '<>');
      this.setDelimiters(delimiters[0], delimiters[1]);

      // Translate tagName callback
      this.setTranslateTagNameCallback(GetValue(config, 'translateTagNameCallback'));
      this.isRunning = false;
      this.isPaused = false;
      this.skipEventFlag = false;
      this.justCompleted = false;
      this.lastTagStart = null;
      this.lastTagEnd = null;
      this.lastContent = null;
    }
    _createClass(BracketParser, [{
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
      key: "setMultipleLinesTagEnable",
      value: function setMultipleLinesTagEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.multipleLinesTagEnable = enable;
        return this;
      }

      // Override
    }, {
      key: "setDelimiters",
      value: function setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
          delimiterRight = delimiterLeft[1];
          delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;
        delimiterLeft = EscapeRegex(this.delimiterLeft);
        delimiterRight = EscapeRegex(this.delimiterRight);
        var flag = this.multipleLinesTagEnable ? 'gs' : 'gi';
        this.reSplit = RegExp("".concat(delimiterLeft, "(.+?)").concat(delimiterRight), flag);
        return this;
      }
    }, {
      key: "setTranslateTagNameCallback",
      value: function setTranslateTagNameCallback(callback) {
        this.translateTagNameCallback = callback;
        return this;
      }
    }, {
      key: "setValueConverter",
      value: function setValueConverter(converter) {
        if (converter === true) {
          converter = TypeConvert;
        } else if (!converter) {
          converter = BypassValueConverter;
        }
        this.valueConverter = converter;
        return this;
      }
    }, {
      key: "setLoopEnable",
      value: function setLoopEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.loopEnable = enable;
        return this;
      }
    }, {
      key: "setSource",
      value: function setSource(source) {
        this.source = source;
        return this;
      }
    }, {
      key: "resetIndex",
      value: function resetIndex(index) {
        if (index === undefined) {
          index = 0;
        }
        this.progressIndex = index;
        this.reSplit.lastIndex = index;
        this.lastTagStart = null;
        this.lastTagEnd = null;
        this.lastContent = null;
        this.justCompleted = false;
        this.isRunning = false;
        return this;
      }
    }, {
      key: "start",
      value: function start(source) {
        this.setSource(source).restart();
        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.resetIndex().next();
      }
    }, {
      key: "next",
      value: function next() {
        if (this.isPaused) {
          this.onResume();
        }

        // Don't re-enter this method
        if (this.isRunning) {
          return this;
        }
        this.isRunning = true;
        if (this.justCompleted) {
          this.isRunning = false;
          return this;
        }
        if (this.reSplit.lastIndex === 0) {
          this.onStart();
        }
        var text = this.source,
          lastIndex = text.length;
        this.reSplit.lastIndex = this.progressIndex;
        while (true) {
          var regexResult = this.reSplit.exec(text);
          // No tag found, complete
          if (!regexResult) {
            if (this.progressIndex < lastIndex) {
              this.onContent(text.substring(this.progressIndex, lastIndex));
              // Might pause here
              if (this.isPaused) {
                this.progressIndex = lastIndex;
                break;
              }
            }
            this.onComplete();
            this.isRunning = false;
            return;
          }
          var matchEnd = this.reSplit.lastIndex;
          var matchStart = matchEnd - regexResult[0].length;

          // Process content between previous tag and current tag            
          if (this.progressIndex < matchStart) {
            this.onContent(text.substring(this.progressIndex, matchStart));
            // Might pause here
            if (this.isPaused) {
              this.progressIndex = matchStart;
              break;
            }
          }

          // Process current tag
          this.lastTagSource = regexResult[0];
          this.onTag(regexResult[1]);
          this.lastTagSource = undefined;
          this.progressIndex = matchEnd;
          // Might pause here
          if (this.isPaused) {
            break;
          }
        }
        this.isRunning = false;
        return this;
      }
    }, {
      key: "skipEvent",
      value: function skipEvent() {
        this.skipEventFlag = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        if (!this.isPaused) {
          this.onPause();
        }
        return this;
      }
    }, {
      key: "pauseUntilEvent",
      value: function pauseUntilEvent(eventEmitter, eventName) {
        if (this.isPaused) {
          return this;
        }
        this.pause();
        eventEmitter.once(eventName, function () {
          this.next();
        }, this);
        return this;
      }
    }, {
      key: "onContent",
      value: function onContent(content) {
        this.skipEventFlag = false;
        this.emit('content', content);
        this.lastContent = content;
      }

      // Override
    }, {
      key: "onTag",
      value: function onTag(tagContent) {}
    }, {
      key: "onStart",
      value: function onStart() {
        this.isRunning = true;
        this.emit('start', this);
      }
    }, {
      key: "onComplete",
      value: function onComplete() {
        this.isRunning = false;
        this.justCompleted = true;
        this.emit('complete', this);
        if (this.loopEnable) {
          this.resetIndex();
        }
      }
    }, {
      key: "onPause",
      value: function onPause() {
        this.isPaused = true;
        this.emit('pause', this);
      }
    }, {
      key: "onResume",
      value: function onResume() {
        this.isPaused = false;
        this.emit('resume', this);
      }
    }]);
    return BracketParser;
  }();
  var BypassValueConverter = function BypassValueConverter(s) {
    return s;
  };
  Object.assign(BracketParser$1.prototype, EventEmitterMethods);

  var StringToValues = function StringToValues(text, valueConverter, delimiter) {
    if (text == null) {
      return [];
    }
    if (valueConverter === undefined) {
      valueConverter = TypeConvert;
    }
    if (delimiter === undefined) {
      delimiter = ',';
    }
    var values = text.split(delimiter);
    for (var i = 0, cnt = values.length; i < cnt; i++) {
      values[i] = valueConverter(values[i]);
    }
    return values;
  };

  var BracketParser = /*#__PURE__*/function (_BracketParserBase) {
    _inherits(BracketParser, _BracketParserBase);
    function BracketParser(config) {
      var _this;
      _classCallCheck(this, BracketParser);
      if (config === undefined) {
        config = {};
      }
      if (!config.hasOwnProperty('multipleLinesTag')) {
        config.multipleLinesTag = false;
      }
      _this = _callSuper(this, BracketParser, [config]);

      // Parameters for regex
      _this.setTagExpression(GetValue(config, 'regex.tag', undefined));
      _this.setValueExpression(GetValue(config, 'regex.value', undefined));
      // Brackets and generate regex
      var delimiters = GetValue(config, 'delimiters', '<>');
      _this.setDelimiters(delimiters[0], delimiters[1]);
      return _this;
    }
    _createClass(BracketParser, [{
      key: "setTagExpression",
      value: function setTagExpression(express) {
        if (!express) {
          express = DefaultTokenExpression;
        }
        this.tagExpression = express;
        return this;
      }
    }, {
      key: "setValueExpression",
      value: function setValueExpression(express) {
        if (!express) {
          express = DefaultTokenExpression;
        }
        this.valueExpression = express;
        return this;
      }
    }, {
      key: "setDelimiters",
      value: function setDelimiters(delimiterLeft, delimiterRight) {
        _get(_getPrototypeOf(BracketParser.prototype), "setDelimiters", this).call(this, delimiterLeft, delimiterRight);
        var tag = "(".concat(this.tagExpression, ")(=(").concat(this.valueExpression, "))?");
        this.reTag = RegExp(tag, 'i');
        if (this.tagExpression !== DefaultTokenExpression || this.valueExpression !== DefaultTokenExpression) {
          var startTagExpression = "".concat(this.tagExpression, "(=").concat(this.valueExpression, ")?");
          var endTagExpression = "/".concat(this.tagExpression);
          delimiterLeft = EscapeRegex(this.delimiterLeft);
          delimiterRight = EscapeRegex(this.delimiterRight);
          var flag = this.multipleLinesTagEnable ? 'gs' : 'gi';
          this.reSplit = RegExp("".concat(delimiterLeft, "((").concat(startTagExpression, ")|(").concat(endTagExpression, "))").concat(delimiterRight), flag);
        }
        return this;
      }
    }, {
      key: "onTag",
      value: function onTag(tagContent) {
        var regexResult = tagContent.match(this.reTag);
        var tagName = regexResult[1];
        var isEndTag = tagName.charAt(0) === '/';
        if (isEndTag) {
          tagName = tagName.substring(1, tagName.length);
        }
        if (this.translateTagNameCallback) {
          tagName = this.translateTagNameCallback(tagName);
        }
        this.skipEventFlag = false;
        if (!isEndTag) {
          var values = StringToValues(regexResult[3], this.valueConverter);
          this.emit.apply(this, ["+".concat(tagName)].concat(_toConsumableArray(values)));
          if (!this.skipEventFlag) {
            this.emit.apply(this, ['+', tagName].concat(_toConsumableArray(values)));
          }
          this.lastTagStart = tagName;
        } else {
          this.emit("-".concat(tagName));
          if (!this.skipEventFlag) {
            this.emit('-', tagName);
          }
          this.lastTagEnd = tagName;
        }
      }
    }]);
    return BracketParser;
  }(BracketParser$1);
  var DefaultTokenExpression = "[^=]+";

  var OnParseColorTag = function OnParseColorTag(parser) {
    parser.on('+color', function (color) {
      parser.addStyle('color', color);
      parser.skipEvent();
    }).on('-color', function () {
      parser.removeStyle('color');
      parser.skipEvent();
    });
  };

  var OnParseBackgroundColorTag = function OnParseBackgroundColorTag(parser) {
    parser.on('+bgcolor', function (color) {
      parser.addStyle('background-color', color);
      parser.skipEvent();
    }).on('-bgcolor', function () {
      parser.removeStyle('background-color');
      parser.skipEvent();
    });
  };

  var ParseBoldTag = function ParseBoldTag(parser) {
    parser.on('+b', function () {
      parser.addStyle('font-weight', 'bold');
      parser.skipEvent();
    }).on('-b', function () {
      parser.removeStyle('font-weight');
      parser.skipEvent();
    });
  };

  var OnParseItalicTag = function OnParseItalicTag(parser) {
    parser.on('+i', function () {
      parser.addStyle('font-style', 'italic');
      parser.skipEvent();
    }).on('-i', function () {
      parser.removeStyle('font-style');
      parser.skipEvent();
    });
  };

  var OnParseSizeTag = function OnParseSizeTag(parser) {
    parser.on('+size', function (size) {
      if (typeof size === 'number') {
        size = "".concat(size, "px");
      }
      parser.addStyle('font-size', size);
      parser.skipEvent();
    }).on('-size', function () {
      parser.removeStyle('font-size');
      parser.skipEvent();
    });
  };

  var OnParseUnderlineTag = function OnParseUnderlineTag(parser) {
    parser.on('+u', function () {
      parser.addStyle('text-decoration', 'underline');
      parser.skipEvent();
    }).on('-u', function () {
      parser.removeStyle('text-decoration');
      parser.skipEvent();
    });
  };

  var OnParseShadowTag = function OnParseShadowTag(parser) {
    parser.on('+shadow', function (color) {
      parser.addStyle('text-shadow', "1px 1px 3px ".concat(color));
      parser.skipEvent();
    }).on('-shadow', function () {
      parser.removeStyle('text-shadow');
      parser.skipEvent();
    });
  };

  var OnParseRoundBlockTag = function OnParseRoundBlockTag(parser) {
    parser.on('+round', function (radius, padding) {
      if (radius === undefined) {
        radius = 3;
      }
      if (padding === undefined) {
        padding = radius;
      }
      if (typeof radius === 'number') {
        radius = "".concat(radius, "px");
      }
      if (typeof padding === 'number') {
        padding = "".concat(padding, "px");
      }
      parser.addStyle('display', 'inline-block');
      parser.addStyle('border-radius', radius);
      parser.addStyle('padding', padding);
      parser.skipEvent();
    }).on('-round', function () {
      parser.removeStyle('display');
      parser.removeStyle('border-radius');
      parser.removeStyle('padding');
      parser.skipEvent();
    });
  };

  var OnParseFontFamilyTag = function OnParseFontFamilyTag(parser) {
    parser.on('+family', function (family) {
      parser.addStyle('font-family', family);
      parser.skipEvent();
    }).on('-family', function () {
      parser.removeStyle('font-family');
      parser.skipEvent();
    });
  };

  var ParseContent = function ParseContent(parser) {
    parser.on('content', function (content) {
      parser.addContent(content);
      parser.skipEvent();
    }).on('+', function () {
      parser.addContent(parser.lastTagSource);
      parser.skipEvent();
    }).on('-', function () {
      parser.addContent(parser.lastTagSource);
      parser.skipEvent();
    });
  };

  var ParseHandlers = [OnParseColorTag, OnParseBackgroundColorTag, ParseBoldTag, OnParseItalicTag, OnParseSizeTag, OnParseUnderlineTag, OnParseShadowTag, OnParseRoundBlockTag, OnParseFontFamilyTag, ParseContent];

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

  var Parser = /*#__PURE__*/function (_BracketParser) {
    _inherits(Parser, _BracketParser);
    function Parser(config) {
      var _this;
      _classCallCheck(this, Parser);
      _this = _callSuper(this, Parser, [config]);
      _this.segments = [];
      _this.lastPropFlags = {};
      for (var i = 0, cnt = ParseHandlers.length; i < cnt; i++) {
        ParseHandlers[i](_assertThisInitialized(_this));
      }
      return _this;
    }
    _createClass(Parser, [{
      key: "clearBuffers",
      value: function clearBuffers() {
        this.segments.length = 0;
        this.lastPropFlags = {};
        return this;
      }
    }, {
      key: "addStyle",
      value: function addStyle(name, value) {
        this.lastPropFlags[name] = value;
        return this;
      }
    }, {
      key: "removeStyle",
      value: function removeStyle(name) {
        delete this.lastPropFlags[name];
        return this;
      }
    }, {
      key: "addContent",
      value: function addContent(content) {
        this.segments.push(Clone(this.lastPropFlags));
        this.segments.push(content);
        return this;
      }
    }, {
      key: "parse",
      value: function parse(s) {
        this.start(s);
        var result = [];
        for (var i = 0, cnt = this.segments.length; i < cnt; i++) {
          var text = this.segments[i];
          if (typeof text !== 'string') {
            continue;
          }
          var propFlags = this.segments[i - 1];
          if (_typeof(propFlags) === 'object') {
            result.push({
              value: text,
              css: PropToStyle(propFlags)
            });
          } else {
            result.push({
              value: text,
              css: null
            });
          }
        }
        this.clearBuffers();
        return result;
      }
    }]);
    return Parser;
  }(BracketParser);
  var PropToStyle = function PropToStyle(propFlags) {
    var styles = [];
    for (var propName in propFlags) {
      styles.push("".concat(propName, ":").concat(propFlags[propName]));
    }
    return styles.join(';');
  };

  var BBCodeLog = /*#__PURE__*/function () {
    function BBCodeLog() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$delimiters = _ref.delimiters,
        delimiters = _ref$delimiters === void 0 ? '[]' : _ref$delimiters,
        _ref$enable = _ref.enable,
        enable = _ref$enable === void 0 ? true : _ref$enable;
      _classCallCheck(this, BBCodeLog);
      this.parser = new Parser({
        delimiters: delimiters
      });
      this.enable = enable;
    }
    _createClass(BBCodeLog, [{
      key: "setEnable",
      value: function setEnable() {
        var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this.enable = enable;
        return this;
      }
    }, {
      key: "log",
      value: function log(s) {
        var logType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
        if (!this.enable) {
          return this;
        }
        if (typeof s == 'string') {
          var _console$logType;
          var inputs = [];
          var modifiers = [];
          this.parser.parse(s).forEach(function (item) {
            inputs.push("%c".concat(item.value));
            modifiers.push(item.css);
          });
          (_console$logType = console[logType]).call.apply(_console$logType, [console, inputs.join('')].concat(modifiers));
        } else {
          console[logType](s);
        }
        return this;
      }
    }]);
    return BBCodeLog;
  }();

  return BBCodeLog;

}));
