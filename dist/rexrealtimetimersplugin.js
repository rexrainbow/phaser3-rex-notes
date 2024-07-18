(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexrealtimetimersplugin = factory());
})(this, (function () { 'use strict';

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

	class EventEmitter extends EE {
	    shutdown() {
	        this.removeAllListeners();
	    }
	    destroy() {
	        this.removeAllListeners();
	    }
	}

	var GetValue = function (source, key, defaultValue) {
	    if (!source || typeof source === 'number') {
	        return defaultValue;
	    }

	    if (typeof (key) === 'string') {
	        if (source.hasOwnProperty(key)) {
	            return source[key];
	        }
	        if (key.indexOf('.') !== -1) {
	            key = key.split('.');
	        } else {
	            return defaultValue;
	        }
	    }

	    var keys = key;
	    var parent = source;
	    var value = defaultValue;

	    //  Use for loop here so we can break early
	    for (var i = 0; i < keys.length; i++) {
	        key = keys[i];
	        if (parent.hasOwnProperty(key)) {
	            //  Yes it has a key property, let's carry on down
	            value = parent[key];

	            parent = value;
	        }
	        else {
	            //  Can't go any further, so reset to default
	            value = defaultValue;
	            break;
	        }
	    }

	    return value;
	};

	var GetPeriodMS = function (period) {
	    if (typeof (period) === 'number') {
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
	var SpliceOne = function (array, index)
	{
	    if (index >= array.length)
	    {
	        return;
	    }

	    var len = array.length - 1;

	    var item = array[index];

	    for (var i = index; i < len; i++)
	    {
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
	var Remove = function (array, item, callback, context)
	{
	    if (context === undefined) { context = array; }

	    var index;

	    //  Fast path to avoid array mutation and iteration
	    if (!Array.isArray(item))
	    {
	        index = array.indexOf(item);

	        if (index !== -1)
	        {
	            SpliceOne(array, index);

	            if (callback)
	            {
	                callback.call(context, item);
	            }

	            return item;
	        }
	        else
	        {
	            return null;
	        }
	    }

	    //  If we got this far, we have an array of items to remove

	    var itemLength = item.length - 1;

	    while (itemLength >= 0)
	    {
	        var entry = item[itemLength];

	        index = array.indexOf(entry);

	        if (index !== -1)
	        {
	            SpliceOne(array, index);

	            if (callback)
	            {
	                callback.call(context, entry);
	            }
	        }
	        else
	        {
	            //  Item wasn't found in the array, so remove it from our return results
	            item.pop();
	        }

	        itemLength--;
	    }

	    return item;
	};

	class RealTimeTimers extends EventEmitter {
	    constructor(config) {
	        super();

	        var getTimestampCallback = GetValue(config, 'getTimestampCallback');
	        if (!getTimestampCallback) {
	            this.setStartTimestamp(GetValue(config, 'startTimestamp'));
	            getTimestampCallback = GetCurrentTimestampFromStartCallback.bind(this);
	        }
	        this.setGetTimestampCallback(getTimestampCallback);

	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.timers = GetValue(o, 'timers', []);
	        return this;
	    }

	    toJSON() {
	        return {
	            timers: this.timers
	        }
	    }

	    setStartTimestamp(timestamp) {
	        if (timestamp === undefined) {
	            timestamp = new Date().getTime();
	        }
	        this.startTimestamp = timestamp - window.performance.now();
	        return this;
	    }

	    setGetTimestampCallback(callback) {
	        this.getCurrentTimestampCallback = callback;
	        return this;
	    }

	    addTimer(name, period, data, currentTimestamp) {
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

	    incTimerPeriod(name, period) {
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

	    getExpiredTimers(currentTimestamp) {
	        if (currentTimestamp === undefined) {
	            currentTimestamp = this.getCurrentTimestampCallback();
	        }

	        var result = [];
	        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
	            var timer = this.timers[i];
	            if (currentTimestamp >= (timer.start + timer.period)) {
	                result.push(timer);
	            }
	        }
	        return result;
	    }

	    popExpiredTimers(currentTimestamp) {
	        var result = this.getExpiredTimers(currentTimestamp);
	        this._remove(result);
	        return result;
	    }

	    getTimersProgress(currentTimestamp) {
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

	    getTimers(name) {
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

	    removeTimers(timers) {
	        if (typeof (timers) !== 'object') { // string or number
	            timers = this.getTimers(timers);
	        }
	        if (!Array.isArray(timers)) {
	            timers = [timers];
	        }
	        this._remove(timers);
	        return this;
	    }

	    clearTimers() {
	        var timers = this.getTimers();
	        timers.reverse();
	        this.removeTimers(timers);
	        return this;
	    }

	    get length() {
	        return this.timers.length;
	    }

	    get lastTimer() {
	        return this.timers[this.timers.length - 1];
	    }

	    emitUpdateEvent() {
	        this.emit('update', this.timers);
	        return this;
	    }

	    // Internal
	    _add(timer) {
	        this.timers.push(timer);

	        this.emit('add', timer, this.timers);
	        this.emitUpdateEvent();
	    }

	    // Internal
	    _remove(timers) {
	        Remove(this.timers, timers, function (timer) {
	            this.emit('remove', timer, this.timers);
	        }, this);
	        this.emitUpdateEvent();
	    }

	}

	var GetCurrentTimestampFromStartCallback = function () {
	    return this.startTimestamp + window.performance.now();
	};

	class RealTimeTimersPlugin extends Phaser.Plugins.BasePlugin {

	    constructor(pluginManager) {
	        super(pluginManager);
	    }

	    start() {
	        var eventEmitter = this.game.events;
	        eventEmitter.on('destroy', this.destroy, this);
	    }

	    add(config) {
	        return new RealTimeTimers(config);
	    }

	}

	return RealTimeTimersPlugin;

}));
