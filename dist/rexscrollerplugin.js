(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexscrollerplugin = factory());
})(this, (function () { 'use strict';

    var EventEmitterMethods$1 = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
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

        on() {
            if (this._eventEmitter) {
                this._eventEmitter.on.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        once() {
            if (this._eventEmitter) {
                this._eventEmitter.once.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        off() {
            if (this._eventEmitter) {
                this._eventEmitter.off.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        emit(event) {
            if (this._eventEmitter && event) {
                this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        addListener() {
            if (this._eventEmitter) {
                this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeListener() {
            if (this._eventEmitter) {
                this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeAllListeners() {
            if (this._eventEmitter) {
                this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        listenerCount() {
            if (this._eventEmitter) {
                return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
            }
            return 0;
        },

        listeners() {
            if (this._eventEmitter) {
                return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
            }
            return [];
        },

        eventNames() {
            if (this._eventEmitter) {
                return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
            }
            return [];
        },
    };

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetSceneObject = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsSceneObject(object)) { // object = scene
            return object;
        } else if (object.scene && IsSceneObject(object.scene)) { // object = game object
            return object.scene;
        } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) { // parent = bob object
            return object.parent.scene;
        } else {
            return null;
        }
    };

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    var GetGame = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsGame(object)) {
            return object;
        } else if (IsGame(object.game)) {
            return object.game;
        } else if (IsSceneObject(object)) { // object = scene object
            return object.sys.game;
        } else if (IsSceneObject(object.scene)) { // object = game object
            return object.scene.sys.game;
        }
    };

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$4(config, 'eventEmitter', true));

            // Register callback of parent destroy event, also see `shutdown` method
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.once('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }

        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // parent might not be shutdown yet
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
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

        destroy(fromScene) {
            this.shutdown(fromScene);
        }

        onEnvDestroy() {
            this.destroy(true);
        }

        onParentDestroy(parent, fromScene) {
            this.destroy(fromScene);
        }

        setParent(parent) {
            this.parent = parent;  // gameObject, scene, or game

            this.scene = GetSceneObject(parent);
            this.game = GetGame(parent);

            return this;
        }

    }
    Object.assign(
        ComponentBase.prototype,
        EventEmitterMethods$1
    );

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

    var GetValue$3 = function (source, key, defaultValue) {
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

        shutdown() {
            this.destroyEventEmitter();
        }

        destroy() {
            this.shutdown();
        }

        resetFromJSON(o) {
            this.setEnable(GetValue$3(o, 'enable', true));
            this.start(GetValue$3(o, 'start', undefined));
            var init = GetValue$3(o, 'init', undefined);
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
            this._scene = GetValue$3(o, 'scene', undefined);
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

    class State extends FSM {
        constructor(parent, config) {
            super(config);
            this.parent = parent;
            this.init();
        }

        init() {
            this.start('IDLE');
        }

        // IDLE -> DRAGBEGIN|DRAG
        next_IDLE() {
            var nextState,
                parent = this.parent,
                dragState = parent.dragState;
            if (dragState.isDown) {
                nextState = (parent.dragThreshold === 0) ? 'DRAG' : 'DRAGBEGIN';
            }
            return nextState;
        }
        update_IDLE(time, delta) {
            this.next();
        }
        // IDLE

        // DRAGBEGIN -> DRAG|IDLE
        next_DRAGBEGIN() {
            var nextState,
                parent = this.parent,
                dragState = parent.dragState;
            if (dragState.isDown) {
                nextState = (dragState.pointer.getDistance() >= parent.dragThreshold) ? 'DRAG' : 'DRAGBEGIN';
            } else { // dragState.isUp
                nextState = 'IDLE';
            }
            return nextState;
        }
        update_DRAGBEGIN(time, delta) {
            this.next();
        }
        // DRAGBEGIN

        // DRAG -> BACK|SLIDE|IDLE
        next_DRAG() {
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
        update_DRAG(time, delta) {
            var parent = this.parent,
                dragState = parent.dragState;
            if (dragState.justMoved) {
                parent.dragging();
            }
            this.next();
        }
        enter_DRAG() {
            this.parent.onDragStart();
        }
        exit_DRAG() {
            this.parent.onDragEnd();
        }
        // DRAG    

        // SLIDE -> DRAG|IDLE
        next_SLIDE() {
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
        enter_SLIDE() {
            this.parent.onSliding();
        }
        exit_SLIDE() {
            this.parent.stop();
        }
        update_SLIDE(time, delta) {
            this.parent.sliding(time, delta);
            this.next();
        }
        // SLIDE    

        // BACK -> DRAG|IDLE
        next_BACK() {
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
        enter_BACK() {
            this.parent.onPullBack();
        }
        exit_BACK() {
            this.parent.stop();
        }
        update_BACK(time, delta) {
            this.parent.pullBack(time, delta);
            this.next();
        }
        // BACK
    }

    var GetTickDelta = function (game) {
        return GetGame(game).loop.delta;
    };

    var GetDisplayWidth = function (gameObject) {
        if (gameObject.displayWidth !== undefined) {
            return gameObject.displayWidth;
        } else {
            return gameObject.width;
        }
    };

    var GetDisplayHeight = function (gameObject) {
        if (gameObject.displayHeight !== undefined) {
            return gameObject.displayHeight;
        } else {
            return gameObject.height;
        }
    };

    const Rectangle = Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround = Phaser.Math.RotateAround;
    const P3Container = Phaser.GameObjects.Container;

    var GetBounds = function (gameObject, output) {
        if (output === undefined) {
            output = new Rectangle();
        } else if (output === true) {
            if (GlobRect === undefined) {
                GlobRect = new Rectangle();
            }
            output = GlobRect;
        }

        if (gameObject.getBounds && !(gameObject instanceof P3Container)) {
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

            GetBottomLeft(gameObject, output);        parentMatrix.transformPoint(output.x, output.y, output);

            BLx = output.x;
            BLy = output.y;

            GetBottomRight(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            BRx = output.x;
            BRy = output.y;
        }
        else {
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

    var GetTopLeft = function (gameObject, output, includeParent) {
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

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetTopRight = function (gameObject, output, includeParent) {
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

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomLeft = function (gameObject, output, includeParent) {
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

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomRight = function (gameObject, output, includeParent) {
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

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GlobVector = undefined;

    var PrepareBoundsOutput = function (gameObject, output, includeParent) {
        if (includeParent === undefined) { includeParent = false; }

        if (gameObject.rotation !== 0) {
            RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    var IsPointInBounds = function (gameObject, x, y, preTest, postTest) {
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

    var GetPointerWorldXY = function (pointer, targetCamera, out) {
        var camera = pointer.camera;
        if (!camera) {
            return null;
        }

        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globalOut;
        }

        if (camera === targetCamera) {
            out.x = pointer.worldX;
            out.y = pointer.worldY;
        } else {
            camera.getWorldPoint(pointer.x, pointer.y, out);
        }

        return out;
    };

    var globalOut = {};

    var PointerTest = function (gameObject, pointer, mainTest, preTest, postTest) {
        var mainCamera = gameObject.scene.sys.cameras.main,
            worldXY;

        var useScreenXY = (gameObject.scrollFactorX === 0) && (gameObject.scrollFactorY === 0);

        if (pointer) {
            if (useScreenXY) {
                return mainTest(gameObject, pointer.x, pointer.y, preTest, postTest);

            } else {
                worldXY = GetPointerWorldXY(pointer, mainCamera, true);
                if (!worldXY) {
                    return false;
                }
                return mainTest(gameObject, worldXY.x, worldXY.y, preTest, postTest);

            }

        } else {
            var inputManager = gameObject.scene.input.manager;
            var pointersTotal = inputManager.pointersTotal;
            var pointers = inputManager.pointers;
            for (var i = 0; i < pointersTotal; i++) {
                pointer = pointers[i];

                if (useScreenXY) {
                    if (mainTest(gameObject, pointer.x, pointer.y, preTest, postTest)) {
                        return true;
                    }

                } else {
                    worldXY = GetPointerWorldXY(pointer, mainCamera, true);
                    if (!worldXY) {
                        continue;
                    }

                    if (mainTest(gameObject, worldXY.x, worldXY.y, preTest, postTest)) {
                        return true;
                    }

                }

            }
            return false;

        }};

    var IsPointerInBounds = function (gameObject, pointer, preTest, postTest) {
        return PointerTest(gameObject, pointer, IsPointInBounds, preTest, postTest)
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;
    const DistanceBetween = Phaser.Math.Distance.Between;

    class DragSpeed extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;

            this.rectBoundsInteractive = GetValue$2(config, 'rectBoundsInteractive', false);

            if (!this.rectBoundsInteractive) {
                gameObject.setInteractive(GetValue$2(config, "inputConfig", undefined));
            }

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
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

        boot() {
            var scene = this.scene;
            var gameObject = this.parent;

            if (!this.rectBoundsInteractive) {
                // Drag start only when pointer down
                gameObject.on('pointerdown', this.onPointIn, this);

                gameObject.on('pointerup', this.onPointOut, this);

                if (this.pointerOutReleaseEnable) {
                    gameObject.on('pointerout', this.onPointOut, this);
                }

                gameObject.on('pointermove', this.onPointerMove, this);

            } else {
                scene.input.on('pointerdown', this.onPointIn, this);

                scene.input.on('pointerup', this.onPointOut, this);

                scene.input.on('pointermove', this.onPointerMove, this);
            }

            scene.sys.events.on('preupdate', this.preupdate, this);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            var scene = this.scene;
            this.parent;

            if (!this.rectBoundsInteractive) ; else {
                scene.input.off('pointerdown', this.onPointIn, this);

                scene.input.off('pointerup', this.onPointOut, this);

                scene.input.off('pointermove', this.onPointerMove, this);
            }

            scene.sys.events.off('preupdate', this.preupdate, this);

            this.pointer = undefined;

            super.shutdown(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            if (!e) {
                this.isInTouched = false;
                this.pointer = undefined;
            }
            this._enable = e;
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

        setPointerOutReleaseEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.pointerOutReleaseEnable = enable;
            return this;
        }

        get isDown() {
            return this.pointer && this.pointer.isDown;
        }

        get isUp() {
            return !this.isDown;
        }

        get dx() {
            return this.x - this.preX;
        }

        get dy() {
            return this.y - this.preY;
        }

        get dt() {
            var delta = GetTickDelta(this.scene);
            return delta;
        }

        get speed() {
            if ((this.x === this.preX) && (this.y === this.preY)) {
                return 0;
            }
            var d = DistanceBetween(this.preX, this.preY, this.x, this.y);
            var speed = d / (this.dt * 0.001);
            return speed;
        }

        get speedX() {
            return this.dx / (this.dt * 0.001);
        }

        get speedY() {
            return this.dy / (this.dt * 0.001);
        }

        // internal
        onPointIn(pointer, localX, localY) {
            if ((!this.enable) ||
                (!pointer.isDown) ||
                (this.pointer !== undefined)) {
                return;
            }

            if (
                this.rectBoundsInteractive &&
                !IsPointerInBounds(this.parent, pointer)
            ) {
                return;
            }

            this.pointer = pointer;
            this.localX = localX;
            this.localY = localY;
        }

        onPointOut(pointer) {
            if ((!this.enable) ||
                (this.pointer !== pointer)) {
                return;
            }
            this.pointer = undefined;
        }

        onPointerMove(pointer, localX, localY) {
            if ((!this.enable) ||
                (!pointer.isDown) ||
                (this.pointer !== pointer)) {
                return;
            }

            if (
                this.rectBoundsInteractive &&
                this.pointerOutReleaseEnable &&
                !IsPointerInBounds(this.parent, pointer)
            ) {
                this.onPointOut(pointer);
                return;
            }

            this.localX = localX;
            this.localY = localY;
        }

        preupdate(time, delta) {
            if (!this.enable) {
                return;
            }

            var pointer = this.pointer;
            this.justMoved = false;
            if (pointer && (!this.isInTouched)) {
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
                if ((this.x === pointer.x) && (this.y === pointer.y)) {
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

            } else if ((!pointer) && this.isInTouched) {
                // Touch end
                this.isInTouched = false;
                this.holdStartTime = undefined;
                this.emit('touchend', pointer);

            }
        }
    }

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class Movement {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setValue(GetValue$1(o, 'value', 0));
            this.setSpeed(GetValue$1(o, 'speed', 0));
            this.setAcceleration(GetValue$1(o, 'acceleration', 0));
            return this;
        }

        reset() {
            this.setValue(0);
            this.setSpeed(0);
            this.setAcceleration(0);
        }

        setValue(value) {
            this.value = value;
            return this;
        }

        setSpeed(speed) {
            // speed == 0 : stop
            // speed  > 0 : move
            this.speed = speed;
            return this;        
        }

        setAcceleration(acc) {
            // acc == 0 : constant speed
            // acc  > 0 : acceleration
            // acc  < 0 : deceleration
            this.acceleration = acc;
            return this;
        }

        updateSpeed(delta) {
            // delta in sec
            if (this.acceleration !== 0) {
                this.speed += (this.acceleration * delta);
                if (this.speed < 0) {
                    this.speed = 0;
                }
            }
            return this;
        }

        getDeltaValue(delta) {
            // delta in sec
            this.updateSpeed(delta);
            if (this.speed <= 0) {
                return 0;
            }
            return (this.speed * delta);
        }

        update(delta) {
            // delta in sec
            this.updateSpeed(delta);
            if (this.speed > 0) {
                this.value += this.getDeltaValue(delta);
            }
            return this;
        }

        get isMoving() {
            return (this.speed > 0);
        }
    }

    class SlowDown {
        constructor() {
            this.value;
            this.dir; // true:+, false:-
            this.movement = new Movement();
        }

        init(start, dir, speed, dec, end) {
            this.value = start;
            this.end = end;
            if (end !== undefined) {
                this.dir = (start < end);
            } else {
                this.dir = dir;
            }

            this.movement
                .setSpeed(speed)
                .setAcceleration(-dec);
            return this;
        }

        stop() {
            this.movement.reset();
        }

        update(delta) {
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
                    if (this.dir) { // +
                        if (this.value > this.end) {
                            this.value = this.end;
                        }
                    } else { // -
                        if (this.value < this.end) {
                            this.value = this.end;
                        }
                    }
                }
            }
            return this;
        }

        get isMoving() {
            return this.movement.isMoving;
        }
    }

    const GetValue = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class Scroller extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            var enable = GetValue(config, 'enable', true);
            this._state = new State(this, {
                enable: enable,
                eventEmitter: false,
            });

            var drapSpeedConfig = {
                rectBoundsInteractive: GetValue(config, 'rectBoundsInteractive', false),
                inputConfig: GetValue(config, 'inputConfig', undefined),
                enable: enable,
                pointerOutRelease: GetValue(config, 'pointerOutRelease', true),
                eventEmitter: false,
            };
            this.dragState = new DragSpeed(gameObject, drapSpeedConfig);

            this._enable = undefined;
            this._value = undefined;
            this._slowDown = new SlowDown();

            var callback = GetValue(config, 'valuechangeCallback', null);
            if (callback !== null) {
                var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
                this.on('valuechange', callback, scope);
            }
            callback = GetValue(config, 'overmaxCallback', null);
            if (callback !== null) {
                var scope = GetValue(config, 'overmaxCallbackScope', undefined);
                this.on('overmax', callback, scope);
            }
            callback = GetValue(config, 'overminCallback', null);
            if (callback !== null) {
                var scope = GetValue(config, 'overminCallbackScope', undefined);
                this.on('overmin', callback, scope);
            }

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
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

        boot() {
            this.scene.sys.events.on('preupdate', this._state.update, this._state);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.scene.sys.events.off('preupdate', this._state.update, this._state);
            this._state.destroy(fromScene);
            this.dragState.destroy(fromScene);
            this._state = undefined;
            this.dragState = undefined;

            super.shutdown(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            this._enable = e;
            this._state.setEnable(e);
            this.dragState.setEnable(e);

            return this;
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

        setOrientationMode(m) {
            if (typeof (m) === 'string') {
                m = ORIENTATIONMODE[m];
            }
            this.orientationMode = m;
            return this;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

        setSlidingDeceleration(dec) {
            this.slidingDeceleration = dec;
            return this;
        }

        setBackDeceleration(dec) {
            this.backDeceleration = dec;
            return this;
        }

        setDragRate(ratio) {
            this.dragRate = ratio;
            return this;
        }

        setBounds(value0, value1) {
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

        get value() {
            return this._value;
        }

        set value(value) {
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

        setValue(value, clamp) {
            if (clamp === undefined) {
                clamp = false;
            }

            if (clamp) {
                value = Clamp(value, this.minValue, this.maxValue);
            }

            this.value = value;
            return this;
        }

        addValue(inc, clamp) {
            this.setValue(this.value + inc, clamp);
            return this;
        }

        get state() {
            return this._state.state;
        }

        get isDragging() {
            return this.dragState.isInTouched;
        }

        get outOfMaxBound() {
            return this.overMax(this.value);
        }

        get outOfMinBound() {
            return this.overMin(this.value);
        }

        get outOfBounds() {
            return this.outOfMinBound || this.outOfMaxBound;
        }

        // internal
        overMax(value) {
            return (this.maxValue != null) && (value > this.maxValue);
        }

        overMin(value) {
            return (this.minValue != null) && (value < this.minValue);
        }

        get backEnable() {
            return (typeof (this.backDeceleration) === 'number');
        }

        get isPullBack() {
            return this._slowDown.isMoving;
        }

        get slidingEnable() {
            return (typeof (this.slidingDeceleration) === 'number');
        }

        get isSliding() {
            return this._slowDown.isMoving;
        }

        get dragDelta() {
            var delta;
            if (this.orientationMode === 0) { // y
                delta = this.dragState.dy;
            } else if (this.orientationMode === 1) { // x
                delta = this.dragState.dx;
            } else {
                delta = 0;
            }
            delta *= this.dragRate;
            return delta;
        }

        get dragSpeed() {
            var speed;
            if (this.orientationMode === 0) { // y
                speed = this.dragState.speedY;
            } else if (this.orientationMode === 1) { // x
                speed = this.dragState.speedX;
            } else {
                speed = 0;
            }
            speed *= this.dragRate;
            return speed;
        }

        // enter_DRAG
        onDragStart() {
            this.emit('dragstart');
        }

        // exit_DRAG
        onDragEnd() {
            this.emit('dragend');
        }

        // everyTick_DRAG
        dragging() {
            this.value += this.dragDelta;
        }

        // enter_SLIDE 
        onSliding() {
            var start = this.value;
            var speed = this.dragSpeed;
            if (speed === 0) {
                this._slowDown.stop();
                this._state.next();
                return;
            }
            var dec = this.slidingDeceleration;
            this._slowDown.init(start, (speed > 0), Math.abs(speed), dec);
        }

        // everyTick_SLIDE
        sliding(time, delta) {
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
        onPullBack() {
            var start = this.value;
            var end = (this.outOfMinBound) ? this.minValue : this.maxValue;
            var dist = Math.abs(end - start);
            var dec = this.backDeceleration;
            var speed = Math.sqrt(2 * dec * dist);
            this._slowDown.init(start, undefined, speed, dec, end);
        }

        // everyTick_BACK
        pullBack(time, delta) {
            delta *= 0.001;
            this.value = this._slowDown.update(delta).value;

            if (!this._slowDown.isMoving) {
                this._state.next();
            }
        }

        // exit_SLIDE, exit_BACK
        stop() {
            this._slowDown.stop();
        }

    }

    const ORIENTATIONMODE = {
        y: 0,
        v: 0,
        vertical: 0,
        x: 1,
        h: 1,
        horizontal: 1,
    };

    class ScrollerPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new Scroller(gameObject, config);
        }

    }

    return ScrollerPlugin;

}));
