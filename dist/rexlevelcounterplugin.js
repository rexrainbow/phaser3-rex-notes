(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlevelcounterplugin = factory());
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

	var IsFunction = function (obj) {    
	    return obj && (typeof(obj) === 'function');
	};

	class LevelCounter extends EventEmitter {
	    constructor(config) {
	        super();

	        this.setTable(GetValue(config, 'table'));
	        this.setMaxLevel(GetValue(config, 'maxLevel'));

	        var exp = GetValue(config, 'exp', 0);
	        var level = GetValue(config, 'level', undefined);
	        if ((level !== undefined) && !this.checkLevel(level, exp)) {
	            console.error(`Level ${level} and Exp ${exp} are mismatch`);
	            level = undefined;
	        }
	        this.resetExp(exp, level);
	    }

	    // Configuration
	    setTable(table) {
	        this.levelTable = table;
	        this.isLevelMapFunction = IsFunction(table);
	        return this;
	    }

	    setMaxLevel(maxLevel) {
	        if (maxLevel === undefined) {
	            if (Array.isArray(this.levelTable)) {
	                maxLevel = this.levelTable.length - 1;
	            } else {
	                maxLevel = -1;
	            }
	        }

	        var maxExp;
	        if (maxLevel !== -1) {
	            maxExp = this.getExp(maxLevel);
	        } else {
	            maxExp = -1;
	        }

	        this.hasMaxLevel = (maxLevel !== -1);
	        this.maxLevel = maxLevel;
	        this.maxExp = maxExp;
	        return this;
	    }

	    resetExp(exp, level) {
	        if (this.hasMaxLevel && (exp > this.maxExp)) {
	            exp = this.maxExp;
	        }
	        if (level === undefined) {
	            level = this.getLevel(exp);
	        }
	        this._exp = exp;
	        this._level = level;
	        this._requiredExp = this.getRequiredExpToNextLevel(level, exp);
	        // Won't fire `levelup` event
	        return this;
	    }

	    get exp() {
	        return this._exp;
	    }

	    set exp(exp) {
	        if (this.hasMaxLevel && (exp > this.maxExp)) {
	            exp = this.maxExp;
	        }

	        if (exp < this._exp) {
	            this.resetExp(exp);
	            return;
	        }
	        if (exp === this._exp) {
	            return;
	        }

	        var level = this.getLevel(exp, this._level);

	        // Emit levelup event
	        var prevLevel = this._level;
	        var fromExp = this._exp,
	            toExp;
	        while (1) {
	            var levelStartExp = this.getExp(prevLevel);
	            var levelEndExp = this.getExp(prevLevel + 1);
	            toExp = Math.min(levelEndExp, exp);
	            this.emit('levelup', prevLevel, fromExp, toExp, levelStartExp, levelEndExp);

	            if ((prevLevel === level) && (toExp === exp)) {
	                break;
	            }

	            prevLevel++;
	            fromExp = levelEndExp;
	        }

	        this.resetExp(exp, level);
	    }

	    get level() {
	        return this._level;
	    }

	    set level(value) {
	        if (this.hasMaxLevel && (value > this.maxLevel)) {
	            this.exp = this.maxExp;
	        } else {
	            this.exp = this.getExp(value);
	        }
	    }

	    get requiredExp() {
	        return this._requiredExp;
	    }

	    getExp(level) {
	        if (level === undefined) {
	            return this._exp;
	        }

	        if (this.isLevelMapFunction) {
	            return this.levelTable(level);
	        } else {
	            if (this.hasMaxLevel && (level > this.maxLevel)) {
	                level = this.maxLevel;
	            }
	            return this.levelTable[level];
	        }
	    }

	    getLevel(exp, level) {
	        if (exp === undefined) {
	            return this._level;
	        }

	        if (level === undefined) {
	            level = 0;
	        }

	        while (1) {
	            var nextLevelExp = this.getExp(level + 1);
	            if (nextLevelExp > exp) {
	                break;
	            }

	            level++;

	            if (this.hasMaxLevel && (nextLevelExp === this.maxExp)) {
	                break;
	            }
	        }

	        return level;
	    }

	    getRequiredExpToNextLevel(level, exp) {
	        if (level === undefined) {
	            level = this.level;
	        }
	        if (exp === undefined) {
	            exp = this.exp;
	        }
	        return this.getExp(level + 1) - exp;
	    }

	    checkLevel(level, exp) {
	        return (exp >= this.getExp(level)) && (exp < this.getExp(level + 1));
	    }

	    gainExp(incExp, callback, scope) {
	        if (callback) {
	            this.on('levelup', callback, scope);
	        }

	        this.exp += incExp;

	        if (callback) {
	            this.off('levelup', callback, scope);
	        }
	        return this;
	    }

	    setExp(exp, callback, scope) {
	        if (callback) {
	            this.on('levelup', callback, scope);
	        }

	        this.exp = exp;

	        if (callback) {
	            this.off('levelup', callback, scope);
	        }
	        return this;
	    }

	    setLevel(level, callback, scope) {
	        if (callback) {
	            this.on('levelup', callback, scope);
	        }

	        this.level = level;

	        if (callback) {
	            this.off('levelup', callback, scope);
	        }
	        return this;
	    }
	}

	class LevelCounterPlugin extends Phaser.Plugins.BasePlugin {
	    constructor(pluginManager) {
	        super(pluginManager);
	    }

	    start() {
	        var eventEmitter = this.game.events;
	        eventEmitter.on('destroy', this.destroy, this);
	    }

	    add(config) {
	        return new LevelCounter(config);
	    }
	}

	return LevelCounterPlugin;

}));
