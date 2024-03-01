(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexrealtimetimersplugin = factory());
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

  var GetPeriodMS = function GetPeriodMS(period) {
    if (typeof period === 'number') {
      return period;
    }
    var config = period;
    var days = config.day || config.d || 0;
    var hours = config.hour || config.h || 0;
    var minutes = config.minute || config.m || 0;
    var seconds = config.second || config.s || 0;
    hours += days * 24;
    minutes += hours * 60;
    seconds += minutes * 60;
    period = seconds * 1000;
    return period;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Removes a single item from an array and returns it without creating gc, like the native splice does.
   * Based on code by Mike Reinstein.
   *
   * @function Phaser.Utils.Array.SpliceOne
   * @since 3.0.0
   *
   * @param {array} array - The array to splice from.
   * @param {integer} index - The index of the item which should be spliced.
   *
   * @return {*} The item which was spliced (removed).
   */
  var SpliceOne = function SpliceOne(array, index) {
    if (index >= array.length) {
      return;
    }
    var len = array.length - 1;
    var item = array[index];
    for (var i = index; i < len; i++) {
      array[i] = array[i + 1];
    }
    array.length = len;
    return item;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * Removes the given item, or array of items, from the array.
   * 
   * The array is modified in-place.
   * 
   * You can optionally specify a callback to be invoked for each item successfully removed from the array.
   *
   * @function Phaser.Utils.Array.Remove
   * @since 3.4.0
   *
   * @param {array} array - The array to be modified.
   * @param {*|Array.<*>} item - The item, or array of items, to be removed from the array.
   * @param {function} [callback] - A callback to be invoked for each item successfully removed from the array.
   * @param {object} [context] - The context in which the callback is invoked.
   *
   * @return {*|Array.<*>} The item, or array of items, that were successfully removed from the array.
   */
  var Remove = function Remove(array, item, callback, context) {
    if (context === undefined) {
      context = array;
    }
    var index;

    //  Fast path to avoid array mutation and iteration
    if (!Array.isArray(item)) {
      index = array.indexOf(item);
      if (index !== -1) {
        SpliceOne(array, index);
        if (callback) {
          callback.call(context, item);
        }
        return item;
      } else {
        return null;
      }
    }

    //  If we got this far, we have an array of items to remove

    var itemLength = item.length - 1;
    while (itemLength >= 0) {
      var entry = item[itemLength];
      index = array.indexOf(entry);
      if (index !== -1) {
        SpliceOne(array, index);
        if (callback) {
          callback.call(context, entry);
        }
      } else {
        //  Item wasn't found in the array, so remove it from our return results
        item.pop();
      }
      itemLength--;
    }
    return item;
  };

  var RealTimeTimers = /*#__PURE__*/function (_EventEmitter) {
    _inherits(RealTimeTimers, _EventEmitter);
    function RealTimeTimers(config) {
      var _this;
      _classCallCheck(this, RealTimeTimers);
      _this = _callSuper(this, RealTimeTimers);
      var getTimestampCallback = GetValue(config, 'getTimestampCallback');
      if (!getTimestampCallback) {
        _this.setStartTimestamp(GetValue(config, 'startTimestamp'));
        getTimestampCallback = GetCurrentTimestampFromStartCallback.bind(_assertThisInitialized(_this));
      }
      _this.setGetTimestampCallback(getTimestampCallback);
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(RealTimeTimers, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timers = GetValue(o, 'timers', []);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          timers: this.timers
        };
      }
    }, {
      key: "setStartTimestamp",
      value: function setStartTimestamp(timestamp) {
        if (timestamp === undefined) {
          timestamp = new Date().getTime();
        }
        this.startTimestamp = timestamp - window.performance.now();
        return this;
      }
    }, {
      key: "setGetTimestampCallback",
      value: function setGetTimestampCallback(callback) {
        this.getCurrentTimestampCallback = callback;
        return this;
      }
    }, {
      key: "addTimer",
      value: function addTimer(name, period, data, currentTimestamp) {
        if (currentTimestamp === undefined) {
          currentTimestamp = this.getCurrentTimestampCallback();
        }
        period = GetPeriodMS(period);
        var timer = {
          name: name,
          start: currentTimestamp,
          period: period,
          data: data
        };
        if (data !== undefined) {
          timer.data = data;
        }
        this._add(timer);
        return this;
      }
    }, {
      key: "incTimerPeriod",
      value: function incTimerPeriod(name, period) {
        period = GetPeriodMS(period);
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
          var timer = this.timers[i];
          if (timer.name === name) {
            timer.period += period;
          }
        }
        this.emitUpdateEvent();
        return this;
      }
    }, {
      key: "getExpiredTimers",
      value: function getExpiredTimers(currentTimestamp) {
        if (currentTimestamp === undefined) {
          currentTimestamp = this.getCurrentTimestampCallback();
        }
        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
          var timer = this.timers[i];
          if (currentTimestamp >= timer.start + timer.period) {
            result.push(timer);
          }
        }
        return result;
      }
    }, {
      key: "popExpiredTimers",
      value: function popExpiredTimers(currentTimestamp) {
        var result = this.getExpiredTimers(currentTimestamp);
        this._remove(result);
        return result;
      }
    }, {
      key: "getTimersProgress",
      value: function getTimersProgress(currentTimestamp) {
        if (currentTimestamp === undefined) {
          currentTimestamp = this.getCurrentTimestampCallback();
        }
        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
          var timer = this.timers[i];
          var elapsed = currentTimestamp - timer.start;
          var period = timer.period;
          elapsed = Math.min(elapsed, period);
          var progress = elapsed / period;
          result.push({
            name: timer.name,
            period: period,
            elapsed: elapsed,
            progress: progress,
            timer: timer
          });
        }
        return result;
      }
    }, {
      key: "getTimers",
      value: function getTimers(name) {
        if (name === undefined) {
          // Get all timers
          return this.timers.slice();
        }
        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
          var timer = this.timers[i];
          if (timer.name === name) {
            result.push(timer);
          }
        }
        return result;
      }
    }, {
      key: "removeTimers",
      value: function removeTimers(timers) {
        if (_typeof(timers) !== 'object') {
          // string or number
          timers = this.getTimers(timers);
        }
        if (!Array.isArray(timers)) {
          timers = [timers];
        }
        this._remove(timers);
        return this;
      }
    }, {
      key: "clearTimers",
      value: function clearTimers() {
        var timers = this.getTimers();
        timers.reverse();
        this.removeTimers(timers);
        return this;
      }
    }, {
      key: "length",
      get: function get() {
        return this.timers.length;
      }
    }, {
      key: "lastTimer",
      get: function get() {
        return this.timers[this.timers.length - 1];
      }
    }, {
      key: "emitUpdateEvent",
      value: function emitUpdateEvent() {
        this.emit('update', this.timers);
        return this;
      }

      // Internal
    }, {
      key: "_add",
      value: function _add(timer) {
        this.timers.push(timer);
        this.emit('add', timer, this.timers);
        this.emitUpdateEvent();
      }

      // Internal
    }, {
      key: "_remove",
      value: function _remove(timers) {
        Remove(this.timers, timers, function (timer) {
          this.emit('remove', timer, this.timers);
        }, this);
        this.emitUpdateEvent();
      }
    }]);
    return RealTimeTimers;
  }(EventEmitter);
  var GetCurrentTimestampFromStartCallback = function GetCurrentTimestampFromStartCallback() {
    return this.startTimestamp + window.performance.now();
  };

  var RealTimeTimersPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(RealTimeTimersPlugin, _Phaser$Plugins$BaseP);
    function RealTimeTimersPlugin(pluginManager) {
      _classCallCheck(this, RealTimeTimersPlugin);
      return _callSuper(this, RealTimeTimersPlugin, [pluginManager]);
    }
    _createClass(RealTimeTimersPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(config) {
        return new RealTimeTimers(config);
      }
    }]);
    return RealTimeTimersPlugin;
  }(Phaser.Plugins.BasePlugin);

  return RealTimeTimersPlugin;

}));
