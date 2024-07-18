(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexfsmplugin = factory());
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

	var EventEmitterMethods = {
	    setEventEmitter(eventEmitter, EventEmitterClass) {
	        if (EventEmitterClass === undefined) {
	            EventEmitterClass = EventEmitter;
	        }
	        this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
	        this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
	        return this;
	    },

	    destroyEventEmitter() {
	        if (this._eventEmitter && this._privateEE) {
	            this._eventEmitter.shutdown();
	        }
	        return this;
	    },

	    getEventEmitter() {
	        return this._eventEmitter;
	    },

	    on: function () {
	        if (this._eventEmitter) {
	            this._eventEmitter.on.apply(this._eventEmitter, arguments);
	        }
	        return this;
	    },

	    once: function () {
	        if (this._eventEmitter) {
	            this._eventEmitter.once.apply(this._eventEmitter, arguments);
	        }
	        return this;
	    },

	    off: function () {
	        if (this._eventEmitter) {
	            this._eventEmitter.off.apply(this._eventEmitter, arguments);
	        }
	        return this;
	    },

	    emit: function (event) {
	        if (this._eventEmitter && event) {
	            this._eventEmitter.emit.apply(this._eventEmitter, arguments);
	        }
	        return this;
	    },

	    addListener: function () {
	        if (this._eventEmitter) {
	            this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
	        }
	        return this;
	    },

	    removeListener: function () {
	        if (this._eventEmitter) {
	            this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
	        }
	        return this;
	    },

	    removeAllListeners: function () {
	        if (this._eventEmitter) {
	            this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
	        }
	        return this;
	    },

	    listenerCount: function () {
	        if (this._eventEmitter) {
	            return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
	        }
	        return 0;
	    },

	    listeners: function () {
	        if (this._eventEmitter) {
	            return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
	        }
	        return [];
	    },

	    eventNames: function () {
	        if (this._eventEmitter) {
	            return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
	        }
	        return [];
	    },
	};

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

	const StateProperties$1 = ['next', 'exit', 'enter'];

	let FSM$1 = class FSM {
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
	    constructor(config) {
	        // Attach get-next-state function
	        var states = GetValue(config, 'states', undefined);
	        if (states) {
	            this.addStates(states);
	        }

	        // Attach extend members
	        var extend = GetValue(config, 'extend', undefined);
	        if (extend) {
	            for (var name in extend) {
	                if (!this.hasOwnProperty(name) || this[name] === undefined) {
	                    this[name] = extend[name];
	                }
	            }
	        }

	        // Event emitter
	        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
	        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
	        this.setEventEmitter(eventEmitter, EventEmitterClass);

	        this._stateLock = false;
	        this.resetFromJSON(config);
	    }

	    shutdown() {
	        this.destroyEventEmitter();
	    }

	    destroy() {
	        this.shutdown();
	    }

	    resetFromJSON(o) {
	        this.setEnable(GetValue(o, 'enable', true));
	        this.start(GetValue(o, 'start', undefined));
	        var init = GetValue(o, 'init', undefined);
	        if (init) {
	            init.call(this);
	        }

	        return this;
	    }

	    toJSON() {
	        return {
	            curState: this.state,
	            prevState: this.prevState,

	            enable: this.enable,
	            start: this._start
	        };
	    }

	    setEnable(e) {
	        if (e === undefined) {
	            e = true;
	        }
	        this.enable = e;
	        return this;
	    }

	    toggleEnable() {
	        this.setEnable(!this.enable);
	        return this;
	    }

	    set state(newState) {
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

	    get state() {
	        return this._state;
	    }

	    get prevState() {
	        return this._prevState;
	    }

	    start(state) {
	        this._start = state;
	        this._prevState = undefined;
	        this._state = state; // Won't fire statechange events
	        return this;
	    }

	    goto(nextState) {
	        if (nextState != null) {
	            this.state = nextState;
	        }
	        return this;
	    }

	    next() {
	        var nextState;
	        var getNextState = this['next_' + this.state];
	        if (getNextState) {
	            if (typeof (getNextState) === 'string') {
	                nextState = getNextState;
	            } else {
	                nextState = getNextState.call(this);
	            }
	        }

	        this.goto(nextState);
	        return this;
	    }

	    get stateProperties() {
	        return StateProperties$1;
	    }

	    addState(name, state) {
	        if (typeof (name) !== 'string') {
	            state = name;
	            name = state.name;
	        }

	        var stateProperties = this.stateProperties;
	        for (var i = 0, cnt = stateProperties.length; i < cnt; i++) {
	            var propertyName = stateProperties[i];
	            var propertyValue = state[propertyName];
	            if (propertyValue) {
	                this[`${propertyName}_${name}`] = propertyValue;
	            }
	        }

	        return this;
	    }

	    addStates(states) {
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

	    runMethod(methodName, a1, a2, a3, a4, a5) {
	        var fn = this[methodName + '_' + this.state];
	        if (!fn) {
	            return undefined;
	        }

	        // Copy from eventemitter3
	        var len = arguments.length;
	        switch (len) {
	            case 1: return fn.call(this);
	            case 2: return fn.call(this, a1);
	            case 3: return fn.call(this, a1, a2);
	            case 4: return fn.call(this, a1, a2, a3);
	            case 5: return fn.call(this, a1, a2, a3, a4);
	            case 6: return fn.call(this, a1, a2, a3, a4, a5);
	        }
	        var args = new Array(len - 1);
	        for (var i = 1; i < len; i++) {
	            args[i - 1] = arguments[i];
	        }
	        return fn.apply(this, args);
	    }
	};

	Object.assign(
	    FSM$1.prototype,
	    EventEmitterMethods,
	);

	var HasListener = function (eventEmitter, eventName, fn, context, once) {
	    if (once === undefined) {
	        once = false;
	    }

	    var listeners = eventEmitter._events[eventName];
	    if (!listeners) {
	        return false;
	    }

	    for (var i = 0, cnt = listeners.length; i < cnt; i++) {
	        var listener = listeners[i];
	        if ((listener.fn === fn) &&
	            (listener.context === context) &&
	            (listener.once === once)
	        ) {
	            return true;
	        }
	    }

	    return false;

	};

	const StateProperties = ['next', 'exit', 'enter', 'update', 'preupdate', 'postupdate'];

	class FSM extends FSM$1 {
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
	    shutdown() {
	        this.stopUpdate();
	        this.stopPreUpdate();
	        this.stopPostUpdate();
	        this._scene = undefined;

	        super.shutdown();
	    }

	    resetFromJSON(o) {
	        super.resetFromJSON(o);
	        this._scene = GetValue(o, 'scene', undefined);
	        return this;
	    }

	    get stateProperties() {
	        return StateProperties;
	    }

	    update(time, delta) {
	        this.runMethod('update', time, delta);
	    }

	    preupdate(time, delta) {
	        this.runMethod('preupdate', time, delta);
	    }

	    postupdate(time, delta) {
	        this.runMethod('postupdate', time, delta);
	    }

	    startUpdate(scene) {
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

	    stopUpdate() {
	        if (!this._scene) {
	            return this;
	        }

	        this._scene.sys.events.off('update', this.update, this);
	        return this;
	    }

	    startPreUpdate(scene) {
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

	    stopPreUpdate() {
	        if (!this._scene) {
	            return this;
	        }

	        this._scene.sys.events.off('preupdate', this.preupdate, this);
	        return this;
	    }

	    startPostUpdate(scene) {
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

	    stopPostUpdate() {
	        if (!this._scene) {
	            return this;
	        }

	        this._scene.sys.events.off('postupdate', this.postupdate, this);
	        return this;
	    }
	}

	var IsInValidKey = function (keys) {
	    return (keys == null) || (keys === '') || (keys.length === 0);
	};

	var GetEntry = function (target, keys, defaultEntry) {
	    var entry = target;
	    if (IsInValidKey(keys)) ; else {
	        if (typeof (keys) === 'string') {
	            keys = keys.split('.');
	        }

	        var key;
	        for (var i = 0, cnt = keys.length; i < cnt; i++) {
	            key = keys[i];
	            if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
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

	var SetValue = function (target, keys, value, delimiter) {
	    if (delimiter === undefined) {
	        delimiter = '.';
	    }

	    // no object
	    if (typeof (target) !== 'object') {
	        return;
	    }

	    // invalid key
	    else if (IsInValidKey(keys)) {
	        // don't erase target
	        if (value == null) {
	            return;
	        }
	        // set target to another object
	        else if (typeof (value) === 'object') {
	            target = value;
	        }
	    } else {
	        if (typeof (keys) === 'string') {
	            keys = keys.split(delimiter);
	        }

	        var lastKey = keys.pop();
	        var entry = GetEntry(target, keys);
	        entry[lastKey] = value;
	    }

	    return target;
	};

	class FSMPlugin extends Phaser.Plugins.BasePlugin {

	    constructor(pluginManager) {
	        super(pluginManager);
	    }

	    start() {
	        var eventEmitter = this.game.events;
	        eventEmitter.on('destroy', this.destroy, this);
	    }

	    add(config) {
	        return new FSM(config);
	    }

	}

	SetValue(window, 'RexPlugins.FSM', FSM);

	return FSMPlugin;

}));
