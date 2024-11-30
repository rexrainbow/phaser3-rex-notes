(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexboardplugin = factory());
})(this, (function () { 'use strict';

    class ObjectFactory {
        constructor(scene) {
            this.scene = scene;

            scene.sys.events.once('destroy', this.destroy, this);
        }

        destroy() {
            this.scene = null;
        }

        static register(type, callback) {
            ObjectFactory.prototype[type] = callback;
        }
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

    class EventEmitter extends EE {
        shutdown() {
            this.removeAllListeners();
        }
        destroy() {
            this.removeAllListeners();
        }
    }

    var GetValue$c = function (source, key, defaultValue) {
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

    class Bank {
        constructor(config) {
            this.nextId = GetValue$c(config, 'start', 1); // start index
            this.uidKey = GetValue$c(config, 'uidKey', '$uid');
            this.autoRemove = GetValue$c(config, 'remove', true);
            this.refs = {};
            this.count = 0;
        }

        add(gameObject, uid) {
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
                } while (refs.hasOwnProperty(uid))
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

        addMultiple(objects) {
            for (var i = 0, cnt = objects.length; i < cnt; i++) {
                this.add(objects[i]);
            }
            return this;
        }

        get(uid) {
            return this.refs[uid];
        }

        has(uid) {
            return this.refs.hasOwnProperty(uid);
        }

        remove(uid) {
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

        forEach(callback, scope) {
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

        clear() {
            this.forEach(function (gameObject) {
                this.remove(gameObject);
            }, this);
        }
    }

    var ChessBank = new Bank({
        uidKey: '$uid',
        remove: false, // remove uid manually
    });

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

    const GetValue$b = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$b(config, 'eventEmitter', true));

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

    var GetTileDirection = function(tileX, tileY) {
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

    var IsPlainObject = function (obj)
    {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (typeof(obj) !== 'object' || obj.nodeType || obj === obj.window)
        {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try
        {
            if (obj.constructor && !({}).hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'))
            {
                return false;
            }
        }
        catch (e)
        {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    };

    const uidKey$1 = ChessBank.uidKey;

    class Chess extends ComponentBase {
        constructor(parent, uid) {
            super(parent, { eventEmitter: false });
            // this.parent

            ChessBank.add(this, uid); // uid is stored in `this.$uid`
            this.board = null;
            this.blocker = false;
        }


        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            if (this.board) {
                this.board.removeChess(this[uidKey$1]);
            }
            ChessBank.remove(this[uidKey$1]);
            this.board = null;

            super.shutdown(fromScene);
        }

        setBoard(board) {
            this.board = board;
            return this;
        }

        get tileXYZ() {
            if (this.board == null) {
                return null;
            }
            return this.board.chessToTileXYZ(this[uidKey$1]);
        }

        setTileZ(tileZ) {
            if (this.board == null) {
                return this;
            }
            this.board.setChessTileZ(this.parent, tileZ);
            return this;
        }

        setBlocker(value) {
            if (value === undefined) {
                value = true;
            }
            this.blocker = value;
            return this;
        }

        setBlockEdge(direction, value) {
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

        getBlockEdge(direction) {
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
    }

    var methods$7 = {
        getTileDirection: GetTileDirection
    };
    Object.assign(
        Chess.prototype,
        methods$7
    );

    var IsUID = function (object) {
        var type = typeof (object);
        return (type === 'number') || (type === 'string');
    };

    var GetChessData = function (gameObject) {
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

    const uidKey = ChessBank.uidKey;
    var GetChessUID = function (gameObject) {
        // Game object or uid
        var uid;
        if (IsUID(gameObject)) {
            uid = gameObject;
        } else {
            uid = GetChessData(gameObject)[uidKey];
        }
        return uid;
    };

    var SetBoardWidth = function (width) {
        if (this.infinityMode) {
            return this;
        }
        if ((this.width === undefined) || (this.width <= width)) {
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

    var SetBoardHeight = function (height) {
        if (this.infinityMode) {
            return this;
        }
        if ((this.height === undefined) || (this.height <= height)) {
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

    var TileXYZToKey = function (tileX, tileY, tileZ, separator) {
        if (separator === undefined) {
            separator = ',';
        }
        return `${tileX}${separator}${tileY}${separator}${tileZ}`;
    };

    var TileXYToKey = function (tileX, tileY, separator) {
        if (separator === undefined) {
            separator = ',';
        }
        return `${tileX}${separator}${tileY}`;
    };

    var KeyToTileXYZ = function (key, out, separator) {
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

    var TileXYToWorldX = function (tileX, tileY) {
        // console.warn('Use board.tileXYToWorldXY instead of (board.tileXYToWorldX, board.tileXYToWorldY)');
        return this.tileXYToWorldXY(tileX, tileY, true).x;
    };

    var TileXYToWorldY = function (tileX, tileY) {
        // console.warn('Use board.tileXYToWorldXY instead of (board.tileXYToWorldX, board.tileXYToWorldY)');
        return this.tileXYToWorldXY(tileX, tileY, true).y;
    };

    var TileXYToWorldXY = function (tileX, tileY, out) {
        return this.grid.getWorldXY(tileX, tileY, out);
    };

    var TileXYArrayToWorldXYArray = function (tileXYArray, out) {
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

    var WorldXYToTileX = function (worldX, worldY) {
        // console.warn('Use board.worldXYToTileXY instead of (board.worldXYToTileX, board.worldXYToTileY)');
        return this.worldXYToTileXY(worldX, worldY, true).x;
    };

    var WorldXYToTileY = function (worldX, worldY) {
        // console.warn('Use board.worldXYToTileXY instead of (board.worldXYToTileX, board.worldXYToTileY)');
        return this.worldXYToTileXY(worldX, worldY, true).y;
    };

    var WorldXYToTileXY = function (worldX, worldY, out) {
        return this.grid.getTileXY(worldX, worldY, out);
    };

    var WorldXYToChessArray = function (worldX, worldY, out) {
        var tileXY = this.worldXYToTileXY(worldX, worldY, true);
        return this.tileXYToChessArray(tileXY.x, tileXY.y, out)
    };

    var WorldXYToChess$1 = function (worldX, worldY, tileZ) {
        var tileXY = this.worldXYToTileXY(worldX, worldY, true);
        if (tileZ !== undefined) {
            return this.tileXYZToChess(tileXY.x, tileXY.y, tileZ)
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

    var WorldXYSnapToGrid = function (worldX, worldY, out) {
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
    var Between$1 = function (x1, y1, x2, y2)
    {
        return Math.atan2(y2 - y1, x2 - x1);
    };

    var AngleBetween$2 = function (tileA, tileB) {
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
    var Normalize = function (angle)
    {
        angle = angle % (2 * Math.PI);

        if (angle >= 0)
        {
            return angle;
        }
        else
        {
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
    var Equal = function (a, b, epsilon)
    {
        if (epsilon === undefined) { epsilon = 0.0001; }

        return Math.abs(a - b) < epsilon;
    };

    var IsAngleInCone = function (chessA, chessB, face, cone) {
        var tileXYA = this.chessToTileXYZ(chessA);
        var tileXYB = this.chessToTileXYZ(chessB);
        var targetAngle = this.angleBetween(tileXYA, tileXYB); // -PI~PI
        targetAngle = Normalize(targetAngle); // 0~2PI
        var deltaAngle = Math.abs(targetAngle - face);
        deltaAngle = Math.min(deltaAngle, PI2 - deltaAngle);
        var halfCone = cone / 2;
        return Equal(deltaAngle, halfCone) || (deltaAngle < halfCone);
    };
    const PI2 = Math.PI * 2;

    var AngleToward = function (tileXY, direction) {
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

    var zeroTileXY = { x: 0, y: 0 };

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
    var RadToDeg$2 = function (radians)
    {
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
    var ShortestBetween = function (angle1, angle2)
    {
        var difference = angle2 - angle1;

        if (difference === 0)
        {
            return 0;
        }

        var times = Math.floor((difference - (-180)) / 360);

        return difference - (times * 360);

    };

    var AngleSnapToDirection = function (tileXY, angle) {
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

    var IsOverlappingPoint = function (worldX, worldY, tileZ) {
        if (this.infinityMode && (tileZ === undefined)) {
            return true;
        }

        var out = this.worldXYToTileXY(worldX, worldY, true);
        return this.contains(out.x, out.y, tileZ);
    };

    var GridAlign = function (gameObject, tileX, tileY) {
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

    var GetGridPoints$2 = function (tileX, tileY, points) {
        if (tileX && (typeof (tileX) !== 'number')) {
            points = tileY;
            var tileXY = this.chessToTileXYZ(tileX);  // tileX is a Chess or TileXY
            tileX = tileXY.x;
            tileY = tileXY.y;
        }
        return this.grid.getGridPoints(tileX, tileY, points);
    };

    var GetGridBounds = function (tileX, tileY, out) {
        if (tileX && (typeof (tileX) !== 'number')) {
            out = tileY;
            var tileXY = this.chessToTileXYZ(tileX);  // tileX is a Chess or TileXY
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

    function hasGetterOrSetter (def)
    {
        return (!!def.get && typeof def.get === 'function') || (!!def.set && typeof def.set === 'function');
    }

    function getProperty (definition, k, isClassDescriptor)
    {
        //  This may be a lightweight object, OR it might be a property that was defined previously.

        //  For simple class descriptors we can just assume its NOT previously defined.
        var def = (isClassDescriptor) ? definition[k] : Object.getOwnPropertyDescriptor(definition, k);

        if (!isClassDescriptor && def.value && typeof def.value === 'object')
        {
            def = def.value;
        }

        //  This might be a regular property, or it may be a getter/setter the user defined in a class.
        if (def && hasGetterOrSetter(def))
        {
            if (typeof def.enumerable === 'undefined')
            {
                def.enumerable = true;
            }

            if (typeof def.configurable === 'undefined')
            {
                def.configurable = true;
            }

            return def;
        }
        else
        {
            return false;
        }
    }

    function hasNonConfigurable (obj, k)
    {
        var prop = Object.getOwnPropertyDescriptor(obj, k);

        if (!prop)
        {
            return false;
        }

        if (prop.value && typeof prop.value === 'object')
        {
            prop = prop.value;
        }

        if (prop.configurable === false)
        {
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
    function extend (ctor, definition, isClassDescriptor, extend)
    {
        for (var k in definition)
        {
            if (!definition.hasOwnProperty(k))
            {
                continue;
            }

            var def = getProperty(definition, k, isClassDescriptor);

            if (def !== false)
            {
                //  If Extends is used, we will check its prototype to see if the final variable exists.

                var parent = extend || ctor;

                if (hasNonConfigurable(parent.prototype, k))
                {
                    //  Just skip the final property
                    if (Class.ignoreFinals)
                    {
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
            }
            else
            {
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
    function mixin (myClass, mixins)
    {
        if (!mixins)
        {
            return;
        }

        if (!Array.isArray(mixins))
        {
            mixins = [ mixins ];
        }

        for (var i = 0; i < mixins.length; i++)
        {
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
    function Class (definition)
    {
        if (!definition)
        {
            definition = {};
        }

        //  The variable name here dictates what we see in Chrome debugger
        var initialize;
        var Extends;

        if (definition.initialize)
        {
            if (typeof definition.initialize !== 'function')
            {
                throw new Error('initialize must be a function');
            }

            initialize = definition.initialize;

            //  Usually we should avoid 'delete' in V8 at all costs.
            //  However, its unlikely to make any performance difference
            //  here since we only call this on class creation (i.e. not object creation).
            delete definition.initialize;
        }
        else if (definition.Extends)
        {
            var base = definition.Extends;

            initialize = function ()
            {
                base.apply(this, arguments);
            };
        }
        else
        {
            initialize = function () {};
        }

        if (definition.Extends)
        {
            initialize.prototype = Object.create(definition.Extends.prototype);
            initialize.prototype.constructor = initialize;

            //  For getOwnPropertyDescriptor to work, we need to act directly on the Extends (or Mixin)

            Extends = definition.Extends;

            delete definition.Extends;
        }
        else
        {
            initialize.prototype.constructor = initialize;
        }

        //  Grab the mixins, if they are specified...
        var mixins = null;

        if (definition.Mixins)
        {
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
    var Contains$1 = function (rect, x, y)
    {
        if (rect.width <= 0 || rect.height <= 0)
        {
            return false;
        }

        return (rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y);
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
    var Perimeter = function (rect)
    {
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

        initialize:

            function Point(x, y) {
                if (x === undefined) { x = 0; }
                if (y === undefined) { y = x; }

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
        setTo: function (x, y) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = x; }

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
    var GetPoint$1 = function (rectangle, position, out) {
        if (out === undefined) { out = new Point(); }

        if (position <= 0 || position >= 1) {
            out.x = rectangle.x;
            out.y = rectangle.y;

            return out;
        }

        var p = Perimeter(rectangle) * position;

        if (position > 0.5) {
            p -= (rectangle.width + rectangle.height);

            if (p <= rectangle.width) {
                //  Face 3
                out.x = rectangle.right - p;
                out.y = rectangle.bottom;
            }
            else {
                //  Face 4
                out.x = rectangle.x;
                out.y = rectangle.bottom - (p - rectangle.width);
            }
        }
        else if (p <= rectangle.width) {
            //  Face 1
            out.x = rectangle.x + p;
            out.y = rectangle.y;
        }
        else {
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
    var GetPoints$1 = function (rectangle, quantity, stepRate, out) {
        if (out === undefined) { out = []; }

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
    var GetPoint = function (line, position, out) {
        if (out === undefined) { out = new Point(); }

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
    var Length = function (line)
    {
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
    var GetPoints = function (line, quantity, stepRate, out) {
        if (out === undefined) { out = []; }

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
    var Random$1 = function (line, out) {
        if (out === undefined) { out = new Point(); }

        var t = Math.random();

        out.x = line.x1 + t * (line.x2 - line.x1);
        out.y = line.y1 + t * (line.y2 - line.y1);

        return out;
    };

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2019 Photon Storm Ltd.
     * @license      {@link https://opensource.org/licenses/MIT|MIT License}
     */


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

        initialize:

            function Vector2(x, y) {
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

                if (typeof x === 'object') {
                    this.x = x.x || 0;
                    this.y = x.y || 0;
                }
                else {
                    if (y === undefined) { y = x; }

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
        clone: function () {
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
        copy: function (src) {
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
        setFromObject: function (obj) {
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
        set: function (x, y) {
            if (y === undefined) { y = x; }

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
        setTo: function (x, y) {
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
        setToPolar: function (azimuth, radius) {
            if (radius == null) { radius = 1; }

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
        equals: function (v) {
            return ((this.x === v.x) && (this.y === v.y));
        },

        /**
         * Calculate the angle between this Vector and the positive x-axis, in radians.
         *
         * @method Phaser.Math.Vector2#angle
         * @since 3.0.0
         *
         * @return {number} The angle between this Vector, and the positive x-axis, given in radians.
         */
        angle: function () {
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
        add: function (src) {
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
        subtract: function (src) {
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
        multiply: function (src) {
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
        scale: function (value) {
            if (isFinite(value)) {
                this.x *= value;
                this.y *= value;
            }
            else {
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
        divide: function (src) {
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
        negate: function () {
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
        distance: function (src) {
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
        distanceSq: function (src) {
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
        length: function () {
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
        lengthSq: function () {
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
        normalize: function () {
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
        normalizeRightHand: function () {
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
        dot: function (src) {
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
        cross: function (src) {
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
        lerp: function (src, t) {
            if (t === undefined) { t = 0; }

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
        transformMat3: function (mat) {
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
        transformMat4: function (mat) {
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
        reset: function () {
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

        initialize:

            function Line(x1, y1, x2, y2) {
                if (x1 === undefined) { x1 = 0; }
                if (y1 === undefined) { y1 = 0; }
                if (x2 === undefined) { x2 = 0; }
                if (y2 === undefined) { y2 = 0; }

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
        getPoint: function (position, output) {
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
        getPoints: function (quantity, stepRate, output) {
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
        getRandomPoint: function (point) {
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
        setTo: function (x1, y1, x2, y2) {
            if (x1 === undefined) { x1 = 0; }
            if (y1 === undefined) { y1 = 0; }
            if (x2 === undefined) { x2 = 0; }
            if (y2 === undefined) { y2 = 0; }

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
        getPointA: function (vec2) {
            if (vec2 === undefined) { vec2 = new Vector2$1(); }

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
        getPointB: function (vec2) {
            if (vec2 === undefined) { vec2 = new Vector2$1(); }

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

            get: function () {
                return Math.min(this.x1, this.x2);
            },

            set: function (value) {
                if (this.x1 <= this.x2) {
                    this.x1 = value;
                }
                else {
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

            get: function () {
                return Math.max(this.x1, this.x2);
            },

            set: function (value) {
                if (this.x1 > this.x2) {
                    this.x1 = value;
                }
                else {
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

            get: function () {
                return Math.min(this.y1, this.y2);
            },

            set: function (value) {
                if (this.y1 <= this.y2) {
                    this.y1 = value;
                }
                else {
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

            get: function () {
                return Math.max(this.y1, this.y2);
            },

            set: function (value) {
                if (this.y1 > this.y2) {
                    this.y1 = value;
                }
                else {
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
    var Random = function (rect, out) {
        if (out === undefined) { out = new Point(); }

        out.x = rect.x + (Math.random() * rect.width);
        out.y = rect.y + (Math.random() * rect.height);

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
    var Rectangle$3 = new Class({

        initialize:

            function Rectangle(x, y, width, height) {
                if (x === undefined) { x = 0; }
                if (y === undefined) { y = 0; }
                if (width === undefined) { width = 0; }
                if (height === undefined) { height = 0; }

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
        contains: function (x, y) {
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
        getPoint: function (position, output) {
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
        getPoints: function (quantity, stepRate, output) {
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
        getRandomPoint: function (point) {
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
        setTo: function (x, y, width, height) {
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
        setEmpty: function () {
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
        setPosition: function (x, y) {
            if (y === undefined) { y = x; }

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
        setSize: function (width, height) {
            if (height === undefined) { height = width; }

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
        isEmpty: function () {
            return (this.width <= 0 || this.height <= 0);
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
        getLineA: function (line) {
            if (line === undefined) { line = new Line(); }

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
        getLineB: function (line) {
            if (line === undefined) { line = new Line(); }

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
        getLineC: function (line) {
            if (line === undefined) { line = new Line(); }

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
        getLineD: function (line) {
            if (line === undefined) { line = new Line(); }

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

            get: function () {
                return this.x;
            },

            set: function (value) {
                if (value >= this.right) {
                    this.width = 0;
                }
                else {
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

            get: function () {
                return this.x + this.width;
            },

            set: function (value) {
                if (value <= this.x) {
                    this.width = 0;
                }
                else {
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

            get: function () {
                return this.y;
            },

            set: function (value) {
                if (value >= this.bottom) {
                    this.height = 0;
                }
                else {
                    this.height = (this.bottom - value);
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

            get: function () {
                return this.y + this.height;
            },

            set: function (value) {
                if (value <= this.y) {
                    this.height = 0;
                }
                else {
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

            get: function () {
                return this.x + (this.width / 2);
            },

            set: function (value) {
                this.x = value - (this.width / 2);
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

            get: function () {
                return this.y + (this.height / 2);
            },

            set: function (value) {
                this.y = value - (this.height / 2);
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
    var Union$1 = function (rectA, rectB, out) {
        if (out === undefined) { out = new Rectangle$3(); }

        //  Cache vars so we can use one of the input rects as the output rect
        var x = Math.min(rectA.x, rectB.x);
        var y = Math.min(rectA.y, rectB.y);
        var w = Math.max(rectA.right, rectB.right) - x;
        var h = Math.max(rectA.bottom, rectB.bottom) - y;

        return out.setTo(x, y, w, h);
    };

    var GetBoardBounds = function (out) {
        if (out === undefined) {
            out = new Rectangle$3();
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

    var globalBounds$2 = new Rectangle$3();

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
    var DistanceBetween$3 = function (x1, y1, x2, y2)
    {
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
    var Linear = function (p0, p1, t)
    {
        return (p1 - p0) * t + p0;
    };

    var AreTileXYEqual = function (tileA, tileB) {
        return tileA && tileB && (tileA.x === tileB.x) && (tileA.y === tileB.y);
    };

    var LineToTileXYArray = function (startX, startY, endX, endY, out) {
        if (typeof (startX) !== 'number') {
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

    var CircleToTileXYArray = function (circle, testMode, out) {
        return this.shapeToTileXYArray(circle, testMode, out);
    };

    var EllipseToTileXYArray = function (ellipse, testMode, out) {
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
    var GetAABB = function (polygon, out) {
        if (out === undefined) { out = new Rectangle$3(); }

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

    var PolygonToTileXYArray = function (polygon, testMode, out) {
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

    var RectangleToTileXYArray = function (rectangle, testMode, out) {
        return this.shapeToTileXYArray(rectangle, testMode, out);
    };

    var TriangleToTileXYArray = function (triangle, testMode, out) {
        return this.shapeToTileXYArray(triangle, testMode, out);
    };

    var ShapeToTileXYArray = function (shape, config, out) {
        if (typeof (config) === 'number') {
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

        this.forEachTileXYInShape(
            shape,
            function (tileXY) {
                out.push({ x: tileXY.x, y: tileXY.y });
            },
            undefined,
            config
        );

        return out;
    };

    var ForEachTileXYInShape = function (shape, callback, scope, config) {
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

        this.forEachTileXY(
            function (tileXY, board) {
                if (IsInShape(board, shape, tileXY.x, tileXY.y, testMode)) {
                    return callback(tileXY, board);
                }
            },
            this,
            {
                left: left,
                right: right,
                top: top,
                bottom: bottom
            }
        );

        return this;
    };

    var IsInShape = function (board, shape, x, y, testMode) {
        var targetWorldXY = board.tileXYToWorldXY(x, y, true);
        if (shape.contains(targetWorldXY.x, targetWorldXY.y)) {
            return true;
        }

        switch (testMode) {
            case 1:  // Test grid bounds (a rectangle)
                var rect = board.getGridBounds(x, y, true);
                return OverlapRectangle(shape, rect);

            case 2:  // Test grid points
                var points = board.getGridPoints(x, y, true);
                return ContainsAnyPoint(shape, points);

            default:
                return false;
        }
    };

    var OverlapRectangle = function (shape, rectangle) {
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

    var ContainsAnyPoint = function (shape, points) {
        for (var i = 0, cnt = points.length; i < cnt; i++) {
            var point = points[i];
            if (shape.contains(point.x, point.y)) {
                return true;
            }
        }
        return false;
    };

    var globLeftToptileXY, globRightBottomTileXY;

    var UidToChess = function (uid) {
        if (uid == null) {
            return null;
        } else {
            if (!this.boardData.exists(uid)) {
                return null;
            }
            return ChessBank.get(uid).parent;
        }
    };

    var AddChess$1 = function (gameObject, tileX, tileY, tileZ, align) {
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
        if (curTileXYZ &&
            (curTileXYZ.x === tileX) && (curTileXYZ.y === tileY) && (curTileXYZ.z === tileZ)) {
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

    var SetChessTileZ = function (chess, tileZ, align) {
        if (align === undefined) {
            align = false;
        }
        var tileXYZ = this.chessToTileXYZ(chess);
        if (tileXYZ) {
            this.moveChess(chess, tileXYZ.x, tileXYZ.y, tileZ, align);
        }
        return this;
    };

    var RemoveChess$1 = function (gameObject, tileX, tileY, tileZ, destroy, fromBoardRemove) {
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

    var RemoveAllChess$1 = function (destroy, fromBoardRemove) {
        var chess = this.getAllChess();
        for (var i = 0, cnt = chess.length; i < cnt; i++) {
            this.removeChess(chess[i], undefined, undefined, undefined, destroy, fromBoardRemove);
        }
        return this;
    };

    var SwapChess = function (gameObjectA, gameObjectB, align) {
        if (align === undefined) {
            align = true;
        }

        var tileXYZA = this.chessToTileXYZ(gameObjectA);
        var tileXYZB = this.chessToTileXYZ(gameObjectB);
        if ((tileXYZA == null) || (tileXYZB == null)) {
            return this;
        }
        this.removeChess(gameObjectA);
        this.removeChess(gameObjectB);
        this.addChess(gameObjectA, tileXYZB.x, tileXYZB.y, tileXYZB.z, align);
        this.addChess(gameObjectB, tileXYZA.x, tileXYZA.y, tileXYZA.z, align);
        return this;
    };

    var GetAllChess$1 = function (out) {
        if (out === undefined) {
            out = [];
        }
        var uids = this.boardData.UIDToXYZ;
        for (var uid in uids) {
            out.push(this.uidToChess(uid));
        }
        return out;
    };

    var Contains = function (tileX, tileY, tileZ) {
        var result;
        if (this.infinityMode) {
            result = true;
        } else {
            result = (tileX >= 0) && (tileX < this.width) && (tileY >= 0) && (tileY < this.height);
        }
        if (result && (tileZ !== undefined)) {
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
    var Clamp = function (value, min, max)
    {
        return Math.max(min, Math.min(max, value));
    };

    var ForEachTileXY = function (callback, scope, config) {
        if (typeof (config) === 'number') {
            config = {
                order: config
            };
        }

        var order = GetValue$c(config, 'order', 0);

        var top, bottom, left, right;
        if (this.infinityMode && (this.width === undefined)) {
            var bounds = this.boardData.getBounds();
            left = bounds.left;
            right = bounds.right;
            top = bounds.top;
            bottom = bounds.bottom;
        } else {
            var lastX = this.width - 1,
                lastY = this.height - 1;
            left = Clamp(GetValue$c(config, 'left', 0), 0, lastX);
            right = Clamp(GetValue$c(config, 'right', lastX), 0, lastX);
            top = Clamp(GetValue$c(config, 'top', 0), 0, lastY);
            bottom = Clamp(GetValue$c(config, 'bottom', lastY), 0, lastY);
        }

        switch (order) {
            case 0: // x+,y+
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

            case 1: // x-,y+
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

            case 2: // y+,x+
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

            case 3: // y-,x+
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
    var Wrap = function (value, min, max)
    {
        var range = max - min;

        return (min + ((((value - min) % range) + range) % range));
    };

    var GetWrapTileXY = function (tileX, tileY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globTileXY$g;
        }

        if (this.wrapMode) {
            tileX = Wrap(tileX, 0, this.width);
        } else if ((!this.infinityMode) &&
            ((tileX < 0) || (tileX >= this.width))) {
            tileX = null;
        }
        if (this.wrapMode) {
            tileY = Wrap(tileY, 0, this.height);
        } else if ((!this.infinityMode) &&
            ((tileY < 0) || (tileY >= this.height))) {
            tileY = null;
        }
        out.x = tileX;
        out.y = tileY;
        return out;
    };

    var globTileXY$g = {};

    var TileXYZToChess = function (tileX, tileY, tileZ) {
        var uid = this.boardData.getUID(tileX, tileY, tileZ);
        return this.uidToChess(uid);
    };

    var TileXYToChessArray = function (tileX, tileY, out) {
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

    var TileZToChessArray = function (tileZ, out) {
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

    var TileXYArrayToChessArray = function (tileXYArray, tileZ, out) {
        if (Array.isArray(tileZ)) {
            out = tileZ;
            tileZ = undefined;
        }
        if (out === undefined) {
            out = [];
        }
        var tileZMode = (tileZ != null);
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

    var IsChess = function (chess) {
        if (IsUID(chess)) { // Number or string
            return false;
        } else {
            return chess && (!!chess.rexChess);
        }
    };

    var IsTileXYZ = function (obj) {
        return (obj) &&
            (IsPlainObject(obj) || obj.isTileXYZ);
    };

    var ChessToTileXYZ = function (chess) {
        if (!chess) {
            return null;
        }

        // chess: chess object, UID, or tileXYZ
        if (IsUID(chess) || IsChess(chess)) { // UID, or game object
            var uid = GetChessUID(chess);
            return this.boardData.getXYZ(uid);
        } else if (IsTileXYZ(chess)) { // {x, y}, or {x, y, z}
            return chess;
        } else {
            return null;
        }
    };

    var GetOppositeDirection$2 = function (tileX, tileY, direction) {
        if (tileX && (typeof (tileX) !== 'number')) {
            direction = tileY;
            var chess = tileX;
            var tileXY = this.chessToTileXYZ(chess);
            tileX = tileXY.x;
            tileY = tileXY.y;
        }
        return this.grid.getOppositeDirection(tileX, tileY, direction);
    };

    var GetDistance$2 = function (tileA, tileB, roughMode) {
        tileA = this.chessToTileXYZ(tileA);
        tileB = this.chessToTileXYZ(tileB);
        return this.grid.getDistance(tileA, tileB, roughMode);
    };

    var DirectionBetween$2 = function (chessA, chessB, round) {
        if (round === undefined) {
            round = true;
        }
        var tileA = this.chessToTileXYZ(chessA);
        var tileB = this.chessToTileXYZ(chessB);
        return this.grid.directionBetween(tileA, tileB, round);
    };

    var IsDirectionInCone = function (chessA, chessB, face, cone) {
        var tileXYA = this.chessToTileXYZ(chessA);
        var tileXYB = this.chessToTileXYZ(chessB);

        var savedDirections = this.grid.directions;  // Save directions
        this.grid.setDirectionMode(this.sides);
        var direction = this.grid.directionBetween(tileXYA, tileXYB, false);
        this.grid.setDirectionMode(savedDirections);  // Restore directions

        var deltaDirection = Math.abs(direction - face);
        deltaDirection = Math.min(deltaDirection, this.grid.directions - deltaDirection);
        return (deltaDirection <= (cone / 2));
    };

    var Offset$3 = function (tileXY, OffsetTileX, OffsetTileY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globTileXY$f;
        }

        if ((OffsetTileX === 0) && (OffsetTileY === 0)) {
            out.x = tileXY.x;
            out.y = tileXY.y;
        } else {
            this.grid.offset(tileXY, OffsetTileX, OffsetTileY, out);
        }
        return out;
    };

    var globTileXY$f = {};

    var Mirror$4 = function (tileXY, mode, originTileXY, out) {
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

    var Rotate$4 = function (tileXY, direction, originTileXY, out) {
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
    var Fit = function (tileXYArray) {
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
        if ((minX !== 0) || (minY !== 0)) {
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

    var IsEmptyTileXYZ = function (tileX, tileY, tileZ) {
        // TileXY is inside board, and TileXYZ has no chess
        return this.contains(tileX, tileY) && !this.contains(tileX, tileY, tileZ);
    };

    var GetEmptyTileXYArray = function (tileZ, out) {
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
    var Between = function (min, max)
    {
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
    var GetRandom = function (array, startIndex, length)
    {
        if (startIndex === undefined) { startIndex = 0; }
        if (length === undefined) { length = array.length; }

        var randomIndex = startIndex + Math.floor(Math.random() * length);

        return (array[randomIndex] === undefined) ? null : array[randomIndex];
    };

    var GetRandomEmptyTileXY = function (tileZ, out) {
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
        while (isOccupied && (tryCount > 0)) {
            tileX = Between(0, this.width - 1);
            tileY = Between(0, this.height - 1);
            isOccupied = (this.tileXYZToChess(tileX, tileY, tileZ) !== null);
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

    var GetEmptyTileXYArrayInRange = function (centerTileXY, radius, tileZ, out) {
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
    var Shuffle = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    };

    var GetRandomEmptyTileXYInRange = function (centerTileXY, radius, tileZ, out) {
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

    var GetTileXYAtDirection = function (chess, directions, distance, out) {
        var srcTileXY = this.chessToTileXYZ(chess);
        if (!srcTileXY) {
            return null;
        }

        if (typeof (directions) === 'string') {
            if (directions.indexOf(',') === -1) {
                directions = parseInt(directions);
            } else {
                directions = directions.split(',');
            }
        }

        var isNumberDirection = (typeof (directions) === 'number');
        var isNumberDistance = (typeof (distance) === 'number');
        if (isNumberDirection && isNumberDistance) {
            // Return a single tileXY
            out = this.grid.getTileXYAtDirection(srcTileXY.x, srcTileXY.y, directions, distance, out);  // directions is a number, distance is a number, return a singl tileXY
            this.getWrapTileXY(out.x, out.y, out);
            if ((out.x == null) || (out.y == null)) {
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
            if (isNumberDirection) {  // directions is a number, distance is an object or list
                if (IsPlainObject(distance)) {
                    var endIdx = GetValue$c(distance, 'end', 1);
                    var startIdx = GetValue$c(distance, 'start', (endIdx > 0) ? 1 : -1);
                    var step = GetValue$c(distance, 'step', ((endIdx >= startIdx) ? 1 : -1));
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
                } else { // Is array
                    for (var i = 0, cnt = distance.length; i < cnt; i++) {
                        resultTileXY = this.getTileXYAtDirection(srcTileXY, directions, distance[i]);
                        if (resultTileXY !== null) {
                            out.push(resultTileXY);
                        }
                    }
                }
            } else { // directions is a list
                for (var i = 0, cnt = directions.length; i < cnt; i++) {
                    if (isNumberDistance) { // return a single tileXY
                        resultTileXY = this.getTileXYAtDirection(srcTileXY, directions[i], distance);
                        if (resultTileXY !== null) {
                            out.push(resultTileXY);
                        }
                    } else { // append an array of tileXY
                        this.getTileXYAtDirection(srcTileXY, directions[i], distance, out);
                    }

                }
            }
        }

        return out;
    };

    var GetNeighborTileXY$2 = function (srcTileXY, directions, out) {
        return this.getTileXYAtDirection(srcTileXY, directions, 1, out);
    };

    var GetNeighborTileXYAtAngle = function (srcTileXY, angle, out) {
        var direction = this.angleSnapToDirection(srcTileXY, angle);
        return this.getTileXYAtDirection(srcTileXY, direction, 1, out);
    };

    var GetNeighborChess = function (tileXYZ, directions, neighborTileZ, out) {
        var tileXYZ = this.chessToTileXYZ(tileXYZ);
        if (tileXYZ === null) {
            return null;
        }

        if (neighborTileZ == null) {
            neighborTileZ = tileXYZ.z;
        }

        var typeOfDirection = typeof (directions);
        if (
            (typeOfDirection === 'number') ||
            ((typeOfDirection === 'string') && (directions.indexOf(',') === -1))
        ) {
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

    var GetNeighborTileDirection$2 = function (srcTileXY, neighborTileXY) {
        if ((srcTileXY === null) || (neighborTileXY === null)) {
            return null;
        }

        srcTileXY = this.chessToTileXYZ(srcTileXY);
        neighborTileXY = this.chessToTileXYZ(neighborTileXY);

        if (AreTileXYEqual(srcTileXY, neighborTileXY)) {
            return null;
        }

        var direction = this.grid.getNeighborTileDirection(srcTileXY, neighborTileXY);
        if (this.wrapMode && (direction === null)) {
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

    var GetNeighborChessDirection = function (chess, neighborChess) {
        var srcTileXYZ = this.chessToTileXYZ(chess);
        var neighborTileXYZ = this.chessToTileXYZ(neighborChess);
        return this.getNeighborTileDirection(srcTileXYZ, neighborTileXYZ);
    };

    var AreNeighbors = function(chessA, chessB) {
        return (this.getNeighborChessDirection(chessA, chessB) !== null);
    };

    var MapNeighbors = function (chess, distance, callback, scope) {
        if (typeof (distance) !== 'number') {
            scope = callback;
            callback = distance;
            distance = 1;
        }

        var tileXYArray = this.getTileXYAtDirection(chess, undefined, distance);
        // Array of {x,y,direction}
        return tileXYArray.map(callback, scope);
    };

    var RingToTileXYArray$2 = function (centerTileXY, radius, out) {
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

    var RingToChessArray = function (centerTileXY, radius, tileZ, out) {
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

    var IsArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var FilledRingToTileXYArray = function (centerTileXY, radius, nearToFar, out) {
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
            level = (nearToFar) ? i : (radius - i);
            this.ringToTileXYArray(centerTileXY, level, out);
        }
        return out;
    };

    var FilledRingToChessArray = function (centerTileXY, radius, tileZ, nearToFar, out) {
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
            level = (nearToFar) ? i : (radius - i);
            this.ringToChessArray(centerTileXY, level, tileZ, out);
        }
        return out;
    };

    var HasBlocker = function (tileX, tileY, tileZ) {
        if (tileX && (typeof (tileX) !== 'number')) {
            var tileXYZ = this.chessToTileXYZ(tileX);  // tileX is a Chess or TileXY
            tileX = tileXYZ.x;
            tileY = tileXYZ.y;
            tileZ = tileXYZ.z;
        }

        var chess, blocker;
        if (tileZ === undefined) {
            // any chess at (tileX, tileY) has blocker
            chess = this.tileXYToChessArray(tileX, tileY, globChessArray$4);
            for (var i = 0, cnt = chess.length; i < cnt; i++) {
                blocker = this.getChessData(chess[i]).blocker;
                if (blocker === true) {
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
            blocker = this.getChessData(chess).blocker;
            return (blocker === true);

        }
    };
    var globChessArray$4 = [];

    var HasEdgeBlocker = function (tileX, tileY, tileZ, direction) {
        var chess;
        if (tileZ === undefined) {
            // any chess at (tileX, tileY) has blocker
            chess = this.tileXYToChessArray(tileX, tileY, globChessArray$3);
            for (var i = 0, cnt = chess.length; i < cnt; i++) {
                if (isEdgeBlocker(this.getChessData(chess[i]).blocker)) {
                    globChessArray$3.length = 0;
                    return true;
                }
            }
            globChessArray$3.length = 0;
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

    var isEdgeBlocker = function (blocker, direction) {
        if ((blocker === false) || (blocker === true)) {
            return blocker;
        } else {
            return (blocker[direction] === true);
        }
    };

    var globChessArray$3 = [];

    var GetBoard = function (chess) {
        if (!chess) {
            return undefined;
        } else if (chess.rexChess) {  // Chess game object
            return chess.rexChess.board;
        } else if (chess.mainBoard) { // Mini-board
            return chess.mainBoard;
        } else {
            return undefined;
        }
    };

    var LogicMethods = {
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
        worldXYToChess: WorldXYToChess$1,
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
        getAllChess: GetAllChess$1,

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
        hasEdgeBlocker: HasEdgeBlocker,

        getGridPoints: GetGridPoints$2,

        chessToBoard: GetBoard,
    };

    var Clear = function (obj) {
        if ((typeof (obj) !== 'object') || (obj === null)) {
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

    var IsEmpty = function (source) {
        for (var k in source) {
            return false;
        }
        return true;
    };

    class BoardData {
        constructor() {
            this.XYZToUID = {}; // [x][y][z] : uid
            this.UIDToXYZ = {}; // uid : xyz
            this.clear();
        }

        shutdown(fromScene) {
            this.XYZToUID = undefined;
            this.UIDToXYZ = undefined;
            return this;
        }

        destroy(fromScene) {
            this.shutdown(fromScene);
            return this;
        }

        clear() {
            Clear(this.UIDToXYZ);
            Clear(this.XYZToUID);
            this.chessCount = 0;
            this.clearBounds();
            return this;
        }

        clearBounds() {
            this._xMax = undefined;
            this._xMin = undefined;
            this._yMax = undefined;
            this._yMin = undefined;
            return this;
        }

        getBounds() {
            var xMin = Infinity,
                xMax = -Infinity,
                yMin = Infinity,
                yMax = -Infinity;

            var UIDToXYZ = this.UIDToXYZ,
                x;
            for (var uid in UIDToXYZ) {
                x = UIDToXYZ[uid].x;
                if (xMin > x) { xMin = x; }
                if (xMax < x) { xMax = x; }
                if (yMin > x) { yMin = x; }
                if (yMax < x) { yMax = x; }
            }

            return {
                left: xMin, right: xMax,
                top: yMin, bottom: yMax
            }
        }

        addUID(uid, x, y, z) {
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

        getUID(x, y, z) {
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

        removeUID(x, y, z) {
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

        exists(uid) {
            return this.UIDToXYZ.hasOwnProperty(uid);
        }

        contains(x, y, z) {
            return (this.getUID(x, y, z) != null);
        }

        getXYZ(uid) {
            if (this.exists(uid)) {
                return this.UIDToXYZ[uid];
            }
            return null;
        }

        get xMax() {
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

        get xMin() {
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

        get yMax() {
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

        get yMin() {
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
    }

    var GetWorldX$2 = function (tileX, tileY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globWorldXY$3;
        }

        var worldX, worldY;
        switch (this.mode) {
            case 0: // orthogonal
                worldX = tileX * this.width;
                worldY = tileY * this.height;
                break;
            case 1: // isometric
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

    var GetWorldX$1 = function (tileX, tileY) {
        return this.getWorldXY(tileX, tileY, true).x;
    };

    var GetWorldY$1 = function (tileX, tileY) {
        return this.getWorldXY(tileX, tileY, true).y;
    };

    var GetTileXY$1 = function (worldX, worldY, out) {
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
            case 0: // orthogonal
                out.x = Math.round(tmpx);
                out.y = Math.round(tmpy);
                break;
            case 1: // isometric            
                out.x = Math.round(+tmpx + tmpy);
                out.y = Math.round(-tmpx + tmpy);
                break;
        }
        return out;
    };

    var globTileXY$a = {};

    var GetTileX$1 = function (worldX, worldY) {
        return this.getTileXY(worldX, worldY, true).x;
    };

    var GetTileY$1 = function (worldX, worldY) {
        return this.getTileXY(worldX, worldY, true).y;
    };

    class Quad {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setType(GetValue$c(o, 'type', 0));
            this.setDirectionMode(GetValue$c(o, 'dir', 4));
            this.setOriginPosition(GetValue$c(o, 'x', 0), GetValue$c(o, 'y', 0));
            this.setCellSize(GetValue$c(o, 'cellWidth', 0), GetValue$c(o, 'cellHeight', 0));
        }

        setType(type) {
            if (typeof (type) === 'string') {
                type = ORIENTATIONTYPE[type];
            }
            this.mode = type; // orthogonal, isometric, or staggered
            return this;
        }

        setDirectionMode(mode) {
            if (typeof (mode) === 'string') {
                mode = DIRMODE$1[mode];
            }

            this.directions = mode;
            return this;
        }

        setOriginPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this._width = value;
            this._halfWidth = value / 2;
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this._height = value;
            this._halfHeight = value / 2;
        }

        setCellSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        get cellWidth() {
            return this.width;
        }

        set cellWidth(value) {
            this.width = value;
        }

        get cellHeight() {
            return this.height;
        }

        set cellHeight(value) {
            this.height = value;
        }
    }

    var methods$6 = {
        getWorldXY: GetWorldX$2,
        getWorldX: GetWorldX$1,
        getWorldY: GetWorldY$1,
        getTileXY: GetTileXY$1,
        getTileX: GetTileX$1,
        getTileY: GetTileY$1,
    };
    Object.assign(
        Quad.prototype,
        methods$6
    );

    const ORIENTATIONTYPE = {
        'orthogonal': 0,
        'isometric': 1,
        'staggered': 2
    };

    const DIRMODE$1 = {
        '4dir': 4,
        '8dir': 8
    };

    var SaveOrigin = function () {
        this._savedOriginX = this.x;
        this._savedOriginY = this.y;
        return this;
    };

    var RestoreOrigin = function () {
        this.x = this._savedOriginX;
        this.y = this._savedOriginY;
        return this;
    };

    // orthogonal or isometric
    const OrthogonalMap = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1]
    ];
    const IsometricMap = OrthogonalMap;

    var GetTileXAtDirection$1 = function (tileX, tileY, direction, distance, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globTileXY$9;
        }

        var deltaTileX, deltaTileY;
        switch (this.mode) {
            case 0: // orthogonal
                deltaTileX = OrthogonalMap[direction][0];
                deltaTileY = OrthogonalMap[direction][1];
                break;
            case 1: // isometric
                deltaTileX = IsometricMap[direction][0];
                deltaTileY = IsometricMap[direction][1];
                break;
        }

        out.x = tileX + (distance * deltaTileX);
        out.y = tileY + (distance * deltaTileY);

        return out;
    };

    var globTileXY$9 = {};

    var GetNeighborTileXY$1 = function (tileX, tileY, direction, out) {
        return GetTileXAtDirection$1.call(this, tileX, tileY, direction, 1, out);
    };

    // Not included in Base Gird object.
    // Delta tileXY to direction


    var ReverseDirMap$1 = function (dirMap) {
        var out = {},
            entry, x, y;
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

    const OrthogonalMapOut = ReverseDirMap$1(OrthogonalMap);
    const IsometricMapOut = OrthogonalMapOut;

    var GetNeighborTileDirection$1 = function (srcTileXY, neighborTileXY) {
        var deltaTileXYToDirMap;
        switch (this.mode) {
            case 0: // orthogonal
                deltaTileXYToDirMap = OrthogonalMapOut;
                break;
            case 1: // isometric
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

    var GetOppositeDirection$1 = function (tileX, tileY, direction) {
        return oppositeDirectionMap[direction];
    };
    const oppositeDirectionMap = {
        0: 2, // Left
        1: 3, // Down
        2: 0, // Right
        3: 1, // Up
        4: 6, // Left-down
        5: 7, // Down-right
        6: 4, // Right-up
        7: 5 // Up-left
    };

    var Offset$2 = function (srcTile, offsetTileX, offsetTileY, out) {
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

    var Mirror$3 = function (src, mode, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globTileXY$7;
        }

        out.x = (mode & 1) ? -src.x : src.x;
        out.y = (mode & 2) ? -src.y : src.y;
        return out;
    };

    var globTileXY$7 = {};

    var Rotate$3 = function (src, dir, out) {
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

    var GetDistance$1 = function (tileA, tileB, roughMode) {
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

    var DirectionBetween$1 = function (tileA, tileB, round) {
        if (round === undefined) {
            round = true;
        }

        var direction;
        switch (this.mode) {
            case 0: // orthogonal
            case 1: // isometric
                if (tileA.y === tileB.y) {
                    direction = (tileB.x >= tileA.x) ? 0 : 2;
                } else if (tileA.x === tileB.x) {
                    direction = (tileB.y >= tileA.y) ? 1 : 3;
                } else if (this.directions === 4) {
                    var angle = RadToDeg$2(Between$1(tileA.x, tileA.y, tileB.x, tileB.y)); // -180~180
                    if (angle < 0) {
                        angle += 360;
                    }
                    direction = angle / 90;
                    if (round) {
                        direction = Math.round(direction);
                    }
                } else { // this.directions === 8
                    var dx = tileB.x - tileA.x;
                    var dy = tileB.y - tileA.y;
                    if (dx === dy) {
                        direction = (dx > 0) ? 4 : 6;
                    } else if (dx === -dy) {
                        direction = (dx > 0) ? 7 : 5;
                    } else {
                        var angle = RadToDeg$2(Math.atan2(dy, dx));
                        if (angle < 0) {
                            angle += 360;
                        }
                        var steps = angle / 45;
                        if (round) {
                            steps = Math.round(steps);
                        }

                        if ((steps >= 0) && (steps < 1)) {
                            direction = steps;  // (steps - 0) + 0
                        } else if ((steps >= 1) && (steps < 2)) {
                            direction = (steps + 3);  // (steps - 1) + 4
                        } else if ((steps >= 2) && (steps < 3)) {
                            direction = (steps - 1);  // (steps - 2) + 1
                        } else if ((steps >= 3) && (steps < 4)) {
                            direction = (steps + 2);  // (steps - 3) + 5
                        } else if ((steps >= 4) && (steps < 5)) {
                            direction = (steps - 2);  // (steps - 4) + 2
                        } else if ((steps >= 5) && (steps < 6)) {
                            direction = (steps + 1);  // (steps - 5) + 6
                        } else if ((steps >= 6) && (steps < 7)) {
                            direction = (steps - 3);  // (steps - 6) + 3
                        } else {  // if ((steps >= 7) && (steps < 8))
                            direction = steps;  // (steps - 7) + 7
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

    var DirectionNormalize = function (direction) {
        return Wrap(direction, 0, this.directions);
    };

    var InitPoints = function (count) {
        var points = [];
        for (var i = 0; i < count; i++) {
            points.push({
                x: 0,
                y: 0
            });
        }
        return points;
    };

    var SetPoints$1 = function (x, y, width, height, type, points) {
        if (points === undefined) {
            points = InitPoints(4);
        }

        var halfW = width / 2;
        var halfH = height / 2;

        if (type === 0) { // rectangle
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
        } else { // rhombus
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

    var GetGridPoints$1 = function (tileX, tileY, points) {
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
        var quadType = (this.mode === 0) ? 0 : 1;
        SetPoints$1(globWorldXY$2.x, globWorldXY$2.y, this.width, this.height, quadType, points);
        return points;
    };

    var globWorldXY$2 = {};
    var globPoints$1 = InitPoints(4);

    var GetBounds$4 = function (tileX, tileY, out) {
        if (out === undefined) {
            out = new Rectangle$3;
        } else if (out === true) {
            out = globalBounds$1;
        }

        var worldXY = this.getWorldXY(tileX, tileY, true);
        out.x = worldXY.x - (this.width * 0.5);
        out.y = worldXY.y - (this.height * 0.5);
        out.width = this.width;
        out.height = this.height;

        return out;
    };

    var globalBounds$1 = new Rectangle$3();

    var RingToTileXYArray$1 = function (centerTileXY, radius, out) {
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

    class QuadGrid extends Quad {
        constructor(config) {
            super(config);
            this.sides = 4;
        }

        // resetFromJSON(o) {
        //     super.resetFromJSON(o);
        // }

        // Direction of neighbors
        get allDirections() {
            return (this.directions === 4) ? ALLDIR4 : ALLDIR8;
        }

        // Board-match
        get halfDirections() {
            return (this.directions === 4) ? HALFDIR4 : HALFDIR8;
        }

        // setOriginPosition
        // setCellSize
        // setType
        // getWorldXY
        // getTileXY
        // getGridPolygon        
    }

    const ALLDIR4 = [0, 1, 2, 3];
    const ALLDIR8 = [0, 1, 2, 3, 4, 5, 6, 7];
    const HALFDIR4 = [0, 1];
    const HALFDIR8 = [0, 1, 4, 5];

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
        getBounds: GetBounds$4,
        ringToTileXYArray: RingToTileXYArray$1,
    };
    Object.assign(
        QuadGrid.prototype,
        methods$5
    );

    const SQRT3$1 = Math.sqrt(3);

    var Width = function (hexagon) {
        return (hexagon.type === 0) ? (2 * hexagon.size) : (SQRT3$1 * hexagon.size);
    };

    const SQRT3 = Math.sqrt(3);

    var Height = function (hexagon) {
        return (hexagon.type === 0) ? (SQRT3 * hexagon.size) : (2 * hexagon.size);
    };

    var CONST$3 = {
        ODD_R: 0,
        EVEN_R: 1,
        ODD_Q: 2,
        EVEN_Q: 3
    };

    const ODD_R$7 = CONST$3.ODD_R;
    const EVEN_R$7 = CONST$3.EVEN_R;
    const ODD_Q$6 = CONST$3.ODD_Q;
    const EVEN_Q$6 = CONST$3.EVEN_Q;

    var GetWorldXY = function (tileX, tileY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globWorldXY$1;
        }

        var worldX = (tileX * this.width);
        var worldY = (tileY * this.height);
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

    var GetWorldX = function (tileX, tileY) {
        return this.getWorldXY(tileX, tileY, true).x;
    };

    var GetWorldY = function (tileX, tileY) {
        return this.getWorldXY(tileX, tileY, true).y;
    };

    const ODD_R$6 = CONST$3.ODD_R;
    const EVEN_R$6 = CONST$3.EVEN_R;
    const ODD_Q$5 = CONST$3.ODD_Q;
    const EVEN_Q$5 = CONST$3.EVEN_Q;

    var cr2cube = function (mode, col, row, out) {
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

    var roundcube = function (x, y, z, out) {
        if (typeof (x) !== 'number') {
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

        if ((dx > dy) && (dx > dz)) {
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

    var cube2cr = function (mode, x, y, z, out) {
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

    var qr2cube = function (q, r, out) {
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

    const ODD_R$5 = CONST$3.ODD_R;
    const EVEN_R$5 = CONST$3.EVEN_R;
    const ODD_Q$4 = CONST$3.ODD_Q;
    const EVEN_Q$4 = CONST$3.EVEN_Q;

    const C4DIV3 = (4 / 3);
    const C2DIV3 = (2 / 3);

    var GetTileXY = function (worldX, worldY, out) {
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
                r = (worldY * C4DIV3) / this.height;
                q = (worldX / this.width) - C2DIV3 * (worldY / this.height);
                break;

            case ODD_Q$4:
            case EVEN_Q$4:
                r = (worldY / this.height) - C2DIV3 * (worldX / this.width);
                q = (worldX * C4DIV3) / this.width;
                break;
        }

        var cube = qr2cube(q, r, globCube);
        roundcube(cube);
        cube2cr(this.mode, cube.x, cube.y, cube.z, out);
        return out;
    };

    var globCube = {};
    var globTileXY$5 = {};

    var GetTileX = function (worldX, worldY) {
        return this.getTileXY(worldX, worldY, true).x;
    };

    var GetTileY = function (worldX, worldY) {
        return this.getTileXY(worldX, worldY, true).y;
    };

    // https://www.redblobgames.com/grids/hexagons/


    const ODD_R$4 = CONST$3.ODD_R;
    const EVEN_R$4 = CONST$3.EVEN_R;
    const ODD_Q$3 = CONST$3.ODD_Q;
    const EVEN_Q$3 = CONST$3.EVEN_Q;

    class Hexagon {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
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

        setType(staggeraxis, staggerindex) {
            if (typeof (staggeraxis) === 'string') {
                staggeraxis = STAGGERAXIS[staggeraxis];
            }
            if (typeof (staggerindex) === 'string') {
                staggerindex = STAGGERINDEX[staggerindex];
            }
            this.staggeraxis = staggeraxis; // 0|y(flat), or 1|x(pointy)
            this.staggerindex = staggerindex; // even, or odd

            if (staggeraxis === 0) { // flat
                this.mode = (staggerindex === 0) ? EVEN_Q$3 : ODD_Q$3;
            } else { // pointy
                this.mode = (staggerindex === 0) ? EVEN_R$4 : ODD_R$4;
            }
            return this;
        }

        setDirectionMode() {
            this.directions = 6;
            return this;
        }

        setOriginPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this._width = value;
            this._halfWidth = value / 2;
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this._height = value;
            this._halfHeight = value / 2;
        }

        setCellSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        setCellRadius(size) {
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

        get cellWidth() {
            return this.width;
        }

        set cellWidth(value) {
            this.width = value;
        }

        get cellHeight() {
            return this.height;
        }

        set cellHeight(value) {
            this.height = value;
        }
    }

    var methods$4 = {
        getWorldXY: GetWorldXY,
        getWorldX: GetWorldX,
        getWorldY: GetWorldY,
        getTileXY: GetTileXY,
        getTileX: GetTileX,
        getTileY: GetTileY,
    };
    Object.assign(
        Hexagon.prototype,
        methods$4
    );

    const STAGGERAXIS = {
        'y': 0,
        'x': 1
    };

    const STAGGERINDEX = {
        'even': 0,
        'odd': 1
    };

    // Not included in Base Gird object.
    // Direction to delta tileXY

    const ODD_R$3 = [
        [
            [+1, 0],
            [0, +1],
            [-1, +1],
            [-1, 0],
            [-1, -1],
            [0, -1]
        ],
        [
            [+1, 0],
            [+1, +1],
            [0, +1],
            [-1, 0],
            [0, -1],
            [+1, -1]
        ]
    ];
    const EVEN_R$3 = [
        [
            [+1, 0],
            [+1, +1],
            [0, +1],
            [-1, 0],
            [0, -1],
            [+1, -1]
        ],
        [
            [+1, 0],
            [0, +1],
            [-1, +1],
            [-1, 0],
            [-1, -1],
            [0, -1]
        ]
    ];
    const ODD_Q$2 = [
        [
            [+1, 0],
            [0, +1],
            [-1, 0],
            [-1, -1],
            [0, -1],
            [+1, -1]
        ],
        [
            [+1, +1],
            [0, +1],
            [-1, +1],
            [-1, 0],
            [0, -1],
            [+1, 0]
        ]
    ];
    const EVEN_Q$2 = [
        [
            [+1, +1],
            [0, +1],
            [-1, +1],
            [-1, 0],
            [0, -1],
            [+1, 0]
        ],
        [
            [+1, 0],
            [0, +1],
            [-1, 0],
            [-1, -1],
            [0, -1],
            [+1, -1]
        ]
    ];
    const Neighbors$1 = [
        ODD_R$3,
        EVEN_R$3,
        ODD_Q$2,
        EVEN_Q$2
    ];

    const ODD_R$2 = CONST$3.ODD_R;
    const EVEN_R$2 = CONST$3.EVEN_R;
    const ODD_Q$1 = CONST$3.ODD_Q;
    const EVEN_Q$1 = CONST$3.EVEN_Q;

    var GetParity = function(mode, tileX, tileY) {
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

    var GetTileXAtDirection = function (tileX, tileY, direction, distance, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globTileXY$4;
        }

        if (distance === 1) { // Neighbor
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

    var GetNeighborTileXY = function (tileX, tileY, direction, out) {
        return GetTileXAtDirection.call(this, tileX, tileY, direction, 1, out);
    };

    // Not included in Base Gird object.
    // Delta tileXY to direction


    var ReverseDirMap = function (dirMap) {
        var out = {},
            entry, x, y;
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

    const Neighbors = [
        [
            ReverseDirMap(Neighbors$1[0][0]),
            ReverseDirMap(Neighbors$1[0][1])
        ],
        [
            ReverseDirMap(Neighbors$1[1][0]),
            ReverseDirMap(Neighbors$1[1][1])
        ],
        [
            ReverseDirMap(Neighbors$1[2][0]),
            ReverseDirMap(Neighbors$1[2][1])
        ],
        [
            ReverseDirMap(Neighbors$1[3][0]),
            ReverseDirMap(Neighbors$1[3][1])
        ]
    ];

    var GetNeighborTileDirection = function (srcTileXY, neighborTileXY) {
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

    var GetOppositeDirection = function (tileX, tileY, direction) {
        return (direction + 3) % 6;
    };

    const ODD_R$1 = CONST$3.ODD_R;
    const EVEN_R$1 = CONST$3.EVEN_R;
    const ODD_Q = CONST$3.ODD_Q;
    const EVEN_Q = CONST$3.EVEN_Q;

    var Offset$1 = function (src, offsetX, offsetY, out) {
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

    const ODD_R = CONST$3.ODD_R;
    const EVEN_R = CONST$3.EVEN_R;

    var Mirror$2 = function (src, mode, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globTileXY$2;
        }
        var cubeXYZ = cr2cube(this.mode, src.x, src.y, true);
        var isRMode = (this.mode === ODD_R) || (this.mode === EVEN_R);
        var newCubeX, newCubeY, newCubeZ;    
        if (mode & 1) { // Mirror x
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
        if (mode & 2) { // Mirror y
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

    var Rotate$2 = function (src, dir, out) {
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

    var GetDistance = function (tileA, tileB, roughMode) {
        cr2cube(this.mode, tileA.x, tileA.y, globCubeA$1);
        cr2cube(this.mode, tileB.x, tileB.y, globCubeB$1);
        var dx = globCubeB$1.x - globCubeA$1.x;
        var dy = globCubeB$1.y - globCubeA$1.y;
        var dz = globCubeB$1.z - globCubeA$1.z;
        return (Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) / 2;
    };

    var globCubeA$1 = {};
    var globCubeB$1 = {};

    var DirectionBetween = function (tileA, tileB, round) {
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
            direction = (dx > 0) ? 0 : 3;
        } else if (dx === 0) {
            direction = (dz > 0) ? 1 : 4;
        } else if (dy === 0) {
            direction = (dz > 0) ? 2 : 5;
        } else if ((dx > 0) && (dy < 0) && (dz > 0)) { // 0~1
            direction = 0 + (dz / (-dy));
        } else if ((dx < 0) && (dy < 0) && (dz > 0)) { // 1~2
            direction = 1 + ((-dy) / dz);
        } else if ((dx < 0) && (dy > 0) && (dz > 0)) { // 2~3
            direction = 2 + (dy / (-dx));
        } else if ((dx < 0) && (dy > 0) && (dz < 0)) { // 3~4
            direction = 3 + ((-dz) / dy);
        } else if ((dx > 0) && (dy > 0) && (dz < 0)) { // 4~5
            direction = 4 + (dx / (-dz));
        } else { // ((dx > 0) && (dy < 0) && (dz < 0)) // 5~0
            direction = 5 + ((-dy) / dx);
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

    const DEG_TO_RAD = Math.PI / 180;

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
    var DegToRad$2 = function (degrees)
    {
        return degrees * DEG_TO_RAD;
    };

    var SetPoints = function (x, y, size, type, points) {
        if (points === undefined) {
            points = InitPoints(6);
        }

        if (size === undefined) ; else if (typeof (size) === 'number') {
            var angleOffset = (type === 0) ? 0 : -30;
            var angleDeg, angleRad;
            for (var i = 0; i < 6; i++) {
                angleDeg = (60 * i) + angleOffset;
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

    var GetGridPoints = function (tileX, tileY, points) {
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

    var GetBounds$3 = function (tileX, tileY, out) {
        if (out === undefined) {
            out = new Rectangle$3;
        } else if (out === true) {
            out = globalBounds;
        }

        var worldXY = this.getWorldXY(tileX, tileY, true);
        out.x = worldXY.x - (this.width * 0.5);
        out.y = worldXY.y - (this.height * 0.5);
        out.width = this.width;
        out.height = this.height;

        return out;
    };

    var globalBounds = new Rectangle$3();

    var RingToTileXYArray = function (centerTileXY, radius, out) {
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

    class HexagonGrid extends Hexagon {
        constructor(config) {
            super(config);
            this.sides = 6;
        }

        // resetFromJSON(o) {
        //     super.resetFromJSON(o);
        // }

        // Direction of neighbors
        get allDirections() {
            return ALLDIR;
        }

        // Board-match
        get halfDirections() {
            return HALFDIR;
        }

        // setOriginPosition
        // setCellSize
        // setType
        // getWorldXY
        // getTileXY
    }

    const ALLDIR = [0, 1, 2, 3, 4, 5];
    const HALFDIR = [0, 1, 2];

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
        getBounds: GetBounds$3,
        ringToTileXYArray: RingToTileXYArray,
    };
    Object.assign(
        HexagonGrid.prototype,
        methods$3
    );

    var DefaultGrids = {
        quadGrid: QuadGrid,
        hexagonGrid: HexagonGrid
    };

    let Board$1 = class Board extends EventEmitter {
        constructor(scene, config) {
            if (IsPlainObject(scene) && (config === undefined)) {
                config = scene;
                scene = undefined;
            }

            // scene: scene instance, or undefined
            super();

            this.isShutdown = false;
            this.scene = scene;
            this.boardData = new BoardData();
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.isBoard = GetValue$c(o, 'isBoard', true);  // false: in Miniboard
            this.setGrid(GetValue$c(o, 'grid', undefined));
            this.setWrapMode(GetValue$c(o, 'wrap', false));
            this.setInfinityMode(GetValue$c(o, 'infinity', false));
            this.setBoardWidth(GetValue$c(o, 'width', 0));
            this.setBoardHeight(GetValue$c(o, 'height', 0));
            return this;
        }

        boot() {
        }

        shutdown(fromScene) {
            if (this.isShutdown) {
                return;
            }

            if (this.isBoard) {
                this.removeAllChess(!fromScene, true);
            }

            super.shutdown();
            this.boardData.shutdown(fromScene);

            this.scene = undefined;
            this.boardData = undefined;
            this.isShutdown = true;

            return this;
        }

        destroy(fromScene) {
            if (this.isShutdown) {
                return;
            }
            this.emit('destroy', this, fromScene);
            this.shutdown(fromScene);
        }

        setGrid(grid) {
            if (IsPlainObject(grid)) {
                var config = grid;
                var gridType = GetValue$c(config, 'gridType', 'quadGrid');
                var grid = new DefaultGrids[gridType](config);
            }
            this.grid = grid;
            return this;
        }

        setWrapMode(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.wrapMode = enable;
            return this;
        }

        setInfinityMode(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.infinityMode = enable;
            return this;
        }

        setBoardSize(width, height) {
            this.setBoardWidth(width);
            this.setBoardHeight(height);
            return this;
        }

        exists(gameObject) {
            // game object or uid
            return this.boardData.exists(this.getChessUID(gameObject));
        }

        get chessCount() {
            return this.boardData.chessCount;
        }

        clear(destroy) {
            if (destroy === undefined) {
                destroy = true;
            }
            this.removeAllChess(destroy, true);
            this.boardData.clear();
            return this;
        }

        static GetBoard(chess) {
            return GetBoard(chess);
        }
    };

    Object.assign(
        Board$1.prototype,
        LogicMethods
    );

    const Zone$1 = Phaser.GameObjects.Zone;

    class TouchZone extends Zone$1 {
        constructor(scene) {
            super(scene, 0, 0, 1, 1);
            scene.add.existing(this);  // Add to scene
            this.setScrollFactor(0);
            this.setInteractive({
                hitArea: {},
                hitAreaCallback: function () { return true; }
            });
        }
    }

    const RENDER_MASK = Phaser.GameObjects.GameObject.RENDER_MASK;

    var InputCandidate = function (gameObject) {
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

    var EmitChessEvent = function (boardEventName, chessEventName, board, tileX, tileY, pointer) {
        if ((tileX == null) || (tileY == null)) {
            return;
        }

        var boardEventCallback = (typeof (boardEventName) !== 'string') ? boardEventName : undefined;
        var chessEventCallback = (typeof (chessEventName) !== 'string') ? chessEventName : undefined;

        var gameObjects = board.tileXYToChessArray(tileX, tileY, globChessArray$2);
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
        globChessArray$2.length = 0;
    };

    var globChessArray$2 = [];

    var OnPointerDown = function (pointer) {
        if (!this.enable) {
            return;
        }
        if (!pointer.isDown) {
            return;
        }

        var board = this.board;
        if (this.pointer === null) { // Catch new touch pointer
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

        var boardEventCallback = function (gameObject) {
            board.emit('gameobjectdown', pointer, gameObject);
            board.emit('gameobjectover', pointer, gameObject);
        };
        var chessEventCallback = function (gameObject) {
            gameObject.emit('board.pointerdown', pointer);
            gameObject.emit('board.pointerover', pointer);
        };

        EmitChessEvent(
            boardEventCallback,
            chessEventCallback,
            board, tileX, tileY,
            pointer
        );
    };

    var OnPointerUp = function (pointer) {
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

        var boardEventCallback = function (gameObject) {
            board.emit('gameobjectup', pointer, gameObject);
            board.emit('gameobjectout', pointer, gameObject);
        };
        var chessEventCallback = function (gameObject) {
            gameObject.emit('board.pointerup', pointer);
            gameObject.emit('board.pointerout', pointer);
        };

        EmitChessEvent(
            boardEventCallback,
            chessEventCallback,
            board, tileX, tileY,
            pointer
        );

        if (this.pointer === pointer) { // Release touch pointer
            this.pointer = null;
        }
    };

    var OnPointerMove = function (pointer) {
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
        if ((this.prevTilePosition.x != null) && (this.prevTilePosition.y != null)) {
            board.emit('tileout', pointer, this.prevTilePosition);
        }

        var tileX = out.x,
            tileY = out.y;
        this.tilePosition.x = tileX;
        this.tilePosition.y = tileY;
        if (!board.contains(tileX, tileY)) {
            // Move outside
            EmitChessEvent(
                'gameobjectout',
                'board.pointerout',
                board, this.prevTilePosition.x, this.prevTilePosition.y,
                pointer
            );

            if (this.pointer === pointer) { // Release touch pointer
                this.pointer = null;
            }
            return;
        }

        if (this.pointer === null) { // Catch new touch pointer
            this.pointer = pointer;
        }

        board.emit('tilemove', pointer, this.tilePosition);
        board.emit('tileover', pointer, this.tilePosition);

        EmitChessEvent(
            'gameobjectout',
            'board.pointerout',
            board, this.prevTilePosition.x, this.prevTilePosition.y,
            pointer
        );

        var boardEventCallback = function (gameObject) {
            board.emit('gameobjectmove', pointer, gameObject);
            board.emit('gameobjectover', pointer, gameObject);
        };
        var chessEventCallback = function (gameObject) {
            gameObject.emit('board.pointermove', pointer);
            gameObject.emit('board.pointerover', pointer);
        };

        EmitChessEvent(
            boardEventCallback,
            chessEventCallback,
            board, tileX, tileY,
            pointer
        );
    };

    const GetValue$a = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$a(config, 'tickingMode', 1));
            // boot() later
        }

        // override
        boot() {
            if ((this.tickingMode === 2) && (!this.tickingState)) {
                this.startTicking();
            }
        }

        // override
        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.stop();
            if (this.tickingState) {
                this.stopTicking();
            }
            super.shutdown(fromScene);
        }

        setTickingMode(mode) {
            if (typeof (mode) === 'string') {
                mode = TICKINGMODE[mode];
            }
            this.tickingMode = mode;
        }

        // override
        startTicking() {
            this.tickingState = true;
        }

        // override
        stopTicking() {
            this.tickingState = false;
        }

        get isRunning() {
            return this._isRunning;
        }

        set isRunning(value) {
            if (this._isRunning === value) {
                return;
            }

            this._isRunning = value;
            if ((this.tickingMode === 1) && (value != this.tickingState)) {
                if (value) {
                    this.startTicking();
                } else {
                    this.stopTicking();
                }
            }
        }

        start() {
            this.isPaused = false;
            this.isRunning = true;
            return this;
        }

        pause() {
            // Only can ba paused in running state
            if (this.isRunning) {
                this.isPaused = true;
                this.isRunning = false;
            }
            return this;
        }

        resume() {
            // Only can ba resumed in paused state (paused from running state)
            if (this.isPaused) {
                this.isPaused = false;
                this.isRunning = true;
            }
            return this;
        }

        stop() {
            this.isPaused = false;
            this.isRunning = false;
            return this;
        }

        complete() {
            this.isPaused = false;
            this.isRunning = false;
            this.emit('complete', this.parent, this);
        }
    }

    const TICKINGMODE = {
        'no': 0,
        'lazy': 1,
        'always': 2
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

    const Rectangle$2 = Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround$1 = Phaser.Math.RotateAround;
    const P3Container$1 = Phaser.GameObjects.Container;

    var GetBounds$2 = function (gameObject, output) {
        if (output === undefined) {
            output = new Rectangle$2();
        } else if (output === true) {
            if (GlobRect$1 === undefined) {
                GlobRect$1 = new Rectangle$2();
            }
            output = GlobRect$1;
        }

        if (gameObject.getBounds && !(gameObject instanceof P3Container$1)) {
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

    var GlobRect$1 = undefined;

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
            RotateAround$1(output, gameObject.x, gameObject.y, gameObject.rotation);
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

        var boundsRect = GetBounds$2(gameObject, true);
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

    const GetValue$9 = Phaser.Utils.Objects.GetValue;

    class OnePointerTracer extends TickTask {
        constructor(gameObject, config) {
            var scene = GetSceneObject(gameObject);
            if (scene === gameObject) {
                gameObject = undefined;
            }
            super(scene, config);

            this.gameObject = gameObject;
            if (gameObject) {
                gameObject.setInteractive(GetValue$9(config, 'inputConfig', undefined));
            }
            this._enable = undefined;
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
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

        boot() {
            super.boot();
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

        shutdown(fromScene) {
            if (!this.scene) {
                return
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
                this.dragCancel();
            }
            this._enable = e;
            return this;
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        setDetectBounds(bounds) {
            this.bounds = bounds;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        onPointerDown(pointer, gameObjects) {
            if (!this.enable) {
                return;
            }

            if (this.pointer !== undefined) {
                return;
            }

            var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            if (!isInsideBounds) {
                return;
            }

            if (this.pointer === pointer) {
                return;
            }

            this.pointer = pointer;
            this.pointerCamera = pointer.camera;
            this.lastPointer = pointer;
            this.movedState = false;
            this.tracerState = TOUCH1;

            if (this.gameObject === undefined) {
                this.isTouchingAnyObject = (gameObjects.length > 0);
            }
            this.onDragStart();
        }

        onPointerUp(pointer) {
            if (!this.enable) {
                return;
            }

            var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            if (!isInsideBounds) {
                return;
            }

            if (this.pointer !== pointer) {
                return;
            }

            this.pointer = undefined;
            this.pointerCamera = undefined;
            this.movedState = false;
            this.tracerState = TOUCH0;
            this.onDragEnd();
        }

        onPointerMove(pointer) {
            if (!this.enable) {
                return;
            }

            if (pointer.isDown) {
                var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
                var isCatchedPointer = (this.pointer === pointer);
                if (!isCatchedPointer && isInsideBounds) ; else if (isCatchedPointer && !isInsideBounds) { // Pointer moves out of bounds
                    this.onPointerUp(pointer);
                } else { // Pointer drags in bounds
                    if (!this.movedState) {
                        this.movedState = (pointer.x !== pointer.downX) || (pointer.y !== pointer.downY);
                    }
                    if (this.movedState) {
                        this.onDrag();
                    }
                }
            }
        }

        dragCancel() {
            if (this.tracerState === TOUCH1) {
                this.onDragEnd();
            }
            this.pointer = undefined;
            this.tracerState = TOUCH0;
            return this;
        }

        onDragStart() {
            this.emit('dragstart', this);
        }

        onDragEnd() {
            this.emit('dragend', this);
        }

        onDrag() {
            this.emit('drag', this);
        }

        // onLastPointerMove() { }

        preUpdate(time, delta) { }

        postUpdate(time, delta) { }

        startTicking() {
            super.startTicking();
            this.scene.sys.events.on('preupdate', this.preUpdate, this);
            this.scene.sys.events.on('postupdate', this.postUpdate, this);
        }

        stopTicking() {
            super.stopTicking();
            if (this.scene) { // Scene might be destoryed
                this.scene.sys.events.off('preupdate', this.preUpdate, this);
                this.scene.sys.events.off('postupdate', this.postUpdate, this);
            }
        }

        setRecongizedStateObject(stateObject) {
            this.recongizedState = stateObject;
            return this;
        }

        get state() {
            return this.recongizedState.state;
        }

        set state(newState) {
            this.recongizedState.state = newState;
        }

        cancel() {
            this.state = IDLE$3;
            return this;
        }

        isPointerInGameObject(gameObject, preTest, postTest) {
            var pointer = this.lastPointer;
            if (!pointer) {
                return false;
            }

            return IsPointerInBounds(gameObject, pointer, preTest, postTest);
        }
    }

    const TOUCH0 = 0;
    const TOUCH1 = 1;

    const IDLE$3 = 'IDLE';

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

        shutdown() {
            this.destroyEventEmitter();
        }

        destroy() {
            this.shutdown();
        }

        resetFromJSON(o) {
            this.setEnable(GetValue$c(o, 'enable', true));
            this.start(GetValue$c(o, 'start', undefined));
            var init = GetValue$c(o, 'init', undefined);
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
            this._scene = GetValue$c(o, 'scene', undefined);
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

    const GetValue$8 = Phaser.Utils.Objects.GetValue;
    const DistanceBetween$2 = Phaser.Math.Distance.Between;

    class Tap extends OnePointerTracer {
        constructor(gameObject, config) {
            super(gameObject, config);

            var self = this;
            var stateConfig = {
                states: {
                    IDLE: {
                        enter: function () {
                            self.stop();
                            self.tapsCount = 0;
                            self.x = 0;
                            self.y = 0;
                            self.worldX = 0;
                            self.worldY = 0;
                            self.lastPointer = undefined;
                        },
                        exit: function () {
                            var pointer = self.lastPointer;
                            self.x = pointer.x;
                            self.y = pointer.y;
                            self.worldX = pointer.worldX;
                            self.worldY = pointer.worldY;
                        }
                    },
                    BEGIN: {
                        enter: function () {
                            self.start();
                            self.tapsCount = 0;
                            self.emit('tappingstart', self, self.gameObject, self.lastPointer);
                        },
                    },
                    RECOGNIZED: {
                        enter: function () {
                            self.start();
                            self.emit('tap', self, self.gameObject, self.lastPointer);
                            self.emit(`${self.tapsCount}tap`, self, self.gameObject, self.lastPointer);
                        },
                    }
                },
                init: function () {
                    this.state = IDLE$2;
                },
                eventEmitter: false,
            };
            this.setRecongizedStateObject(new FSM(stateConfig));
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
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

        onDragStart() {
            switch (this.state) {
                case IDLE$2:
                    this.state = BEGIN$2;
                    break;

                case BEGIN$2:
                    var pointer = this.lastPointer;
                    var tapsOffset = DistanceBetween$2(
                        pointer.upX,
                        pointer.upY,
                        pointer.x,
                        pointer.y);
                    if (tapsOffset > this.tapOffset) { // Can't recognize next level, restart here
                        this.state = RECOGNIZED$2;
                        this.state = BEGIN$2;
                    }
                    break;

                case RECOGNIZED$2:
                    this.state = BEGIN$2;
                    break;
            }
        }

        onDragEnd() {
            if (this.state === BEGIN$2) {
                this.tapsCount++; // Try recognize next level
                this.emit('tapping', this, this.gameObject, this.lastPointer);

                if ((this.maxTaps !== undefined) && (this.tapsCount === this.maxTaps)) { // Reach to maxTaps, stop here                
                    this.state = RECOGNIZED$2;
                }
            }
        }

        onDrag() {
            if (this.state === IDLE$2) {
                return;
            }

            if (this.pointer.getDistance() > this.dragThreshold) { // Cancel
                this.state = IDLE$2;
            }
        }

        preUpdate(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return;
            }
            if (this.state === BEGIN$2) {
                var pointer = this.lastPointer;
                if (pointer.isDown) {
                    var holdTime = time - pointer.downTime;
                    if (holdTime > this.holdTime) {
                        this.state = IDLE$2;
                    }
                } else { // isUp
                    var releasedTime = time - pointer.upTime;
                    if (releasedTime > this.tapInterval) {
                        if ((this.minTaps === undefined) || (this.tapsCount >= this.minTaps)) {
                            this.state = RECOGNIZED$2;
                        } else {
                            this.state = IDLE$2;
                        }
                    }
                }
            }
        }

        postUpdate(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return;
            }
            // Clear RECOGNIZED after update()
            if (this.state === RECOGNIZED$2) {
                this.state = IDLE$2;
            }
        }

        get isTapped() {
            return (this.state === RECOGNIZED$2);
        }

        setHoldTime(time) {
            this.holdTime = time; // ms
            return this;
        }

        setTapInterval(time) {
            this.tapInterval = time; // ms
            return this;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

        setTapOffset(distance) {
            this.tapOffset = distance;
            return this;
        }

        setMaxTaps(taps) {
            this.maxTaps = taps;
            return this;
        }

        setMinTaps(taps) {
            this.minTaps = taps;
            return this;
        }

        setTaps(minTaps, maxTaps) {
            if (maxTaps === undefined) {
                maxTaps = minTaps;
            }
            this.setMinTaps(minTaps).setMaxTaps(maxTaps);
            return this;
        }
    }

    const IDLE$2 = 'IDLE';
    const BEGIN$2 = 'BEGIN';
    const RECOGNIZED$2 = 'RECOGNIZED';

    var InstallTap = function () {
        var touchZone = (this.touchZone) ? this.touchZone : this.board.scene;
        var tap = new Tap(touchZone);
        tap.on('tap', OnTap, this);
        return tap;
    };

    var OnTap = function (tap) {
        var board = this.board;
        // Get touched tileX, tileY
        var tileXY = board.worldXYToTileXY(tap.worldX, tap.worldY);
        var tileX = tileXY.x,
            tileY = tileXY.y;
        if (!board.contains(tileX, tileY)) {
            return;
        }

        board.emit('tiletap', tap, tileXY);
        board.emit(`tile${tap.tapsCount}tap`, tap, tileXY);

        var boardEventCallback = function (gameObject) {
            board.emit('gameobjecttap', tap, gameObject);
            board.emit(`gameobject${tap.tapsCount}tap`, tap, gameObject);
        };
        var chessEventCallback = function (gameObject) {
            gameObject.emit('board.tap', tap);
            gameObject.emit(`board.${tap.tapsCount}tap`, tap);
        };
        EmitChessEvent(
            boardEventCallback,
            chessEventCallback,
            board, tileX, tileY, 
            tap
        );
    };

    const GetValue$7 = Phaser.Utils.Objects.GetValue;

    class Press extends OnePointerTracer {
        constructor(gameObject, config) {
            super(gameObject, config);

            var self = this;
            var stateConfig = {
                states: {
                    IDLE: {
                        enter: function () {
                            self.x = 0;
                            self.y = 0;
                            self.worldX = 0;
                            self.worldY = 0;
                            self.lastPointer = undefined;
                        },
                        exit: function () {
                            var pointer = self.lastPointer;
                            self.x = pointer.x;
                            self.y = pointer.y;
                            self.worldX = pointer.worldX;
                            self.worldY = pointer.worldY;
                        }
                    },
                    BEGIN: {
                        enter: function () {
                            self.start();
                        },
                        exit: function () {
                            self.stop();
                        }
                    },
                    RECOGNIZED: {
                        enter: function () {
                            self.emit('pressstart', self, self.gameObject, self.lastPointer);
                        },
                        exit: function () {
                            self.emit('pressend', self, self.gameObject, self.lastPointer);
                        }
                    }
                },
                init: function () {
                    this.state = IDLE$1;
                },
                eventEmitter: false,
            };
            this.setRecongizedStateObject(new FSM(stateConfig));
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this.setDragThreshold(GetValue$7(o, 'threshold', 9));
            this.setHoldTime(GetValue$7(o, 'time', 251));
            return this;
        }

        onDragStart() {
            this.state = BEGIN$1;
            if (this.holdTime === 0) {
                this.state = RECOGNIZED$1;
            }
        }

        onDragEnd() {
            this.state = IDLE$1;
        }

        onDrag() {
            if (this.state === IDLE$1) {
                return;
            }

            if (this.pointer.getDistance() > this.dragThreshold) {
                this.state = IDLE$1;
            }
        }

        preUpdate(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return;
            }
            if (this.state === BEGIN$1) {
                var holdTime = time - this.pointer.downTime;
                if (holdTime >= this.holdTime) {
                    this.state = RECOGNIZED$1;
                }
            }
        }

        get isPressed() {
            return (this.state === RECOGNIZED$1);
        }

        setHoldTime(time) {
            this.holdTime = time; // ms
            return this;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }
    }

    const IDLE$1 = 'IDLE';
    const BEGIN$1 = 'BEGIN';
    const RECOGNIZED$1 = 'RECOGNIZED';

    var InstallPress = function () {
        var touchZone = (this.touchZone) ? this.touchZone : this.board.scene;
        var press = new Press(touchZone);
        press
            .on('pressstart', OnPressStart, this)
            .on('pressend', OnPressEnd, this);

        return press;
    };

    var OnPressStart = function (press) {
        var board = this.board;
        // Get touched tileX, tileY
        var tileXY = board.worldXYToTileXY(press.worldX, press.worldY);
        var tileX = tileXY.x,
            tileY = tileXY.y;
        if (!board.contains(tileX, tileY)) {
            return;
        }

        board.emit('tilepressstart', press, tileXY);

        EmitChessEvent(
            'gameobjectpressstart',
            'board.pressstart',
            board, tileX, tileY,
            press
        );
    };

    var OnPressEnd = function (press) {
        var board = this.board;
        // Get touched tileX, tileY
        var tileXY = board.worldXYToTileXY(press.worldX, press.worldY);
        var tileX = tileXY.x,
            tileY = tileXY.y;
        if (!board.contains(tileX, tileY)) {
            return;
        }

        board.emit('tilepressend', press, tileXY);

        EmitChessEvent(
            'gameobjectpressend',
            'board.pressend',
            board, tileX, tileY,
            press
        );
    };

    var GetTickDelta = function (game) {
        return GetGame(game).loop.delta;
    };

    const DistanceBetween$1 = Phaser.Math.Distance.Between;
    const AngleBetween$1 = Phaser.Math.Angle.Between;

    var VelocityMethods = {
        getDt: function () {
            var dt = GetTickDelta(this.scene);
            return dt;
        },

        getVelocity: function () {
            var p1 = this.pointer.position;
            var p0 = this.pointer.prevPosition;
            var d = DistanceBetween$1(p0.x, p0.y, p1.x, p1.y);
            var velocity = d / (this.getDt() * 0.001);
            return velocity;
        },

        getVelocityX: function () {
            var p1 = this.pointer.position;
            var p0 = this.pointer.prevPosition;
            var d = Math.abs(p1.x - p0.x);
            var velocity = d / (this.getDt() * 0.001);
            return velocity;
        },

        getVelocityY: function () {
            var p1 = this.pointer.position;
            var p0 = this.pointer.prevPosition;
            var d = Math.abs(p1.y - p0.y);
            var velocity = d / (this.getDt() * 0.001);
            return velocity;
        },

        getVelocityAngle: function () {
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

    var AngleToDirections = function (angle, dirMode, out) {
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
            case 0: // up & down
                if (angle < 180) {
                    out.down = true;
                } else {
                    out.up = true;
                }
                break;

            case 1: // left & right
                if ((angle > 90) && (angle <= 270)) {
                    out.left = true;
                } else {
                    out.right = true;
                }
                break;

            case 2: // 4 dir
                if ((angle > 45) && (angle <= 135)) {
                    out.down = true;
                } else if ((angle > 135) && (angle <= 225)) {
                    out.left = true;
                } else if ((angle > 225) && (angle <= 315)) {
                    out.up = true;
                } else {
                    out.right = true;
                }
                break;

            case 3: // 8 dir
                if ((angle > 22.5) && (angle <= 67.5)) {
                    out.down = true;
                    out.right = true;
                } else if ((angle > 67.5) && (angle <= 112.5)) {
                    out.down = true;
                } else if ((angle > 112.5) && (angle <= 157.5)) {
                    out.down = true;
                    out.left = true;
                } else if ((angle > 157.5) && (angle <= 202.5)) {
                    out.left = true;
                } else if ((angle > 202.5) && (angle <= 247.5)) {
                    out.left = true;
                    out.up = true;
                } else if ((angle > 247.5) && (angle <= 292.5)) {
                    out.up = true;
                } else if ((angle > 292.5) && (angle <= 337.5)) {
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

    const GetValue$6 = Phaser.Utils.Objects.GetValue;
    const RadToDeg$1 = Phaser.Math.RadToDeg;

    class Swipe extends OnePointerTracer {
        constructor(gameObject, config) {
            super(gameObject, config);

            var self = this;
            var stateConfig = {
                states: {
                    IDLE: {
                        enter: function () {
                            self.x = 0;
                            self.y = 0;
                            self.worldX = 0;
                            self.worldY = 0;
                        },
                        exit: function () {
                            var pointer = self.lastPointer;
                            self.x = pointer.x;
                            self.y = pointer.y;
                            self.worldX = pointer.worldX;
                            self.worldY = pointer.worldY;
                        }
                    },
                    BEGIN: {
                        enter: function () {
                            self.validDrag = false;
                        }
                    },
                    RECOGNIZED: {
                        enter: function () {
                            self.start();
                            self.updateDirectionStates();
                            self.emit('swipe', self, self.gameObject, self.lastPointer);
                        },

                        exit: function () {
                            self.stop();
                            self.clearDirectionStates();
                        }
                    }
                },
                init: function () {
                    this.state = IDLE;
                },
                eventEmitter: false,
            };
            this.setRecongizedStateObject(new FSM(stateConfig));
            this.clearDirectionStates();
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this.setDragThreshold(GetValue$6(o, 'threshold', 10));
            this.setVelocityThreshold(GetValue$6(o, 'velocityThreshold', 1000));
            this.setDirectionMode(GetValue$6(o, 'dir', '8dir'));
            return this;
        }

        onDragStart() {
            this.state = BEGIN;
        }

        onDragEnd() {
            this.state = IDLE;
        }

        onDrag() {
            if (this.state === BEGIN) {
                if (!this.validDrag) {
                    this.validDrag = (this.dragThreshold === 0) || (this.pointer.getDistance() >= this.dragThreshold);
                }
                if (this.validDrag && (this.dragVelocity > this.velocityThreshold)) {
                    this.state = RECOGNIZED;
                }
            }
        }

        postUpdate(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return;
            }
            // Clear RECOGNIZED after update()
            if (this.state === RECOGNIZED) {
                this.state = IDLE;
            }
        }

        get isSwiped() {
            return (this.state === RECOGNIZED);
        }

        get dragVelocity() {
            var velocity;
            switch (this.dirMode) {
                case 0: velocity = this.getVelocityY(); break; // up & down
                case 1: velocity = this.getVelocityX(); break; // left & right
                default: velocity = this.getVelocity(); break; // 4 dir, 8 dir
            }
            return velocity;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

        setVelocityThreshold(velocity) {
            this.velocityThreshold = velocity;
            return this;
        }

        setDirectionMode(m) {
            if (typeof (m) === 'string') {
                m = DIRMODE[m];
            }
            this.dirMode = m;
            return this;
        }

        updateDirectionStates() {
            var angle = RadToDeg$1(this.getVelocityAngle());
            AngleToDirections(angle, this.dirMode, this);
            return this;
        }

        clearDirectionStates() {
            this.left = false;
            this.right = false;
            this.up = false;
            this.down = false;
            return this;
        }
    }

    Object.assign(
        Swipe.prototype,
        VelocityMethods
    );

    const IDLE = 'IDLE';
    const BEGIN = 'BEGIN';
    const RECOGNIZED = 'RECOGNIZED';

    var InstallSwipe = function () {
        var touchZone = (this.touchZone) ? this.touchZone : this.board.scene;
        var swipe = new Swipe(touchZone);
        swipe
            .on('swipe', OnSwipe, this);

        return swipe;
    };

    var OnSwipe = function (swipe) {
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

        EmitChessEvent(
            'gameobjectswipe',
            'board.swipe',
            board, tileX, tileY,
            swipe
        );
    };

    class Input {
        constructor(board, config) {
            var enable = GetValue$c(config, 'enable', true);
            var useTouchZone = GetValue$c(config, 'useTouchZone', true);

            var scene = board.scene;

            this.board = board;
            this.touchZone = undefined;
            this._enable = true;
            this.pointer = null;
            this.tilePosition = { x: undefined, y: undefined };
            this.prevTilePosition = { x: undefined, y: undefined };

            if (useTouchZone) {
                var touchZone = new TouchZone(scene);
                touchZone.on('pointerdown', OnPointerDown, this);
                touchZone.on('pointerup', OnPointerUp, this);
                touchZone.on('pointermove', OnPointerMove, this);
                this.touchZone = touchZone;

            } else {
                scene.input.on('pointerdown', OnPointerDown, this);
                scene.input.on('pointerup', OnPointerUp, this);
                scene.input.on('pointermove', OnPointerMove, this);

            }

            this.tap = InstallTap.call(this);
            this.press = InstallPress.call(this);
            this.swipe = InstallSwipe.call(this);

            board.once('destroy', this.onBoardDestroy, this);

            this.setEnable(enable);
        }

        destroy(fromScene) {
            this.tap.destroy(fromScene);
            this.press.destroy(fromScene);
            this.swipe.destroy(fromScene);

            if (this.touchZone) {
                this.touchZone.destroy(fromScene);
                this.touchZone = undefined;

            } else {
                var scene = this.board.scene;
                if (scene) {
                    scene.input.off('pointerdown', OnPointerDown, this);
                    scene.input.off('pointerup', OnPointerUp, this);
                    scene.input.off('pointermove', OnPointerMove, this);
                }

            }

            this.board = undefined;

            // board.off('destroy', this.onBoardDestroy, this);
        }

        onBoardDestroy(parent, fromScene) {
            this.destroy(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
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

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }
    }

    var SetInteractive$1 = function (config) {
        // Input
        if (!this.input) {
            this.input = new Input(this, config);
        } else {
            var enable = (config === false) ? false : true;
            this.input.setEnable(enable);
        }

        return this;
    };

    var ForEachCullTileXY = function (callback, scope, config) {
        if (typeof (config) === 'number') {
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
            ViewportBounds = new Rectangle$3();
        }
        ViewportBounds.width = (camera.width + paddingX * 2) / camera.zoomX;
        ViewportBounds.height = (camera.height + paddingY * 2) / camera.zoomY;
        ViewportBounds.centerX = camera.centerX + camera.scrollX;
        ViewportBounds.centerY = camera.centerY + camera.scrollY;

        this.forEachTileXYInShape(
            ViewportBounds,
            callback,
            scope,
            {
                order: order,
                testMode: 1
            }
        );

        return this;
    };

    var ViewportBounds;

    class Board extends Board$1 {
        boot() {
            super.boot();

            if (this.scene && this.isBoard) {
                this.scene.sys.events.once('shutdown', this.destroy, this);
            }
        }

        shutdown(fromScene) {
            if (this.isShutdown) {
                return;
            }

            if (this.scene && this.isBoard) {
                this.scene.sys.events.off('shutdown', this.destroy, this);
            }

            super.shutdown(fromScene);

            return this;
        }

        get touchZone() {
            if (this.input) {
                return this.input.touchZone;
            } else {
                return null;
            }
        }

        getTouchZone() {
            return this.touchZone;
        }
    }

    var methods$2 = {
        setInteractive: SetInteractive$1,
        forEachCullTileXY: ForEachCullTileXY,
    };
    Object.assign(
        Board.prototype,
        methods$2
    );

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

    var IsMiniBoardObject = function (object) {
        return (object.type === 'rexMiniBoard');
    };

    const Base$3 = Phaser.GameObjects.Polygon;
    class Shape extends Base$3 {
        constructor(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard) {
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
            super(scene, worldX, worldY, points, fillColor, fillAlpha);
            this.type = 'rexShapeChess';

            if (addToBoard) {
                if (isMiniBoard) { // Chess-Container
                    miniBoard.addChess(this, tileX, tileY, tileZ);
                } else {
                    board.addChess(this, tileX, tileY, tileZ, true);
                }
            } else {
                GetChessData(this);
            }
        }
    }

    var ShiftToO = function (points) {
        var minX = Infinity;
        var minY = Infinity;
        var point;
        for (var i = 0, cnt = points.length; i < cnt; i++) {
            point = points[i];
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
        }
        if ((minX === 0) && (minY === 0)) {
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

    const Base$2 = Phaser.GameObjects.Image;
    class Image extends Base$2 {
        constructor(board, tileX, tileY, tileZ, key, frame, addToBoard) {
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
            super(scene, worldX, worldY, key, frame);
            this.type = 'rexImageChess';

            if (addToBoard) {
                if (isMiniBoard) { // Chess-Container
                    miniBoard.addChess(this, tileX, tileY, tileZ);
                } else {
                    board.addChess(this, tileX, tileY, tileZ, true);
                }
            } else {
                GetChessData(this);
            }
        }
    }

    ObjectFactory.register('image', function (board, tileX, tileY, tileZ, key, frame, addToBoard) {
        var gameObject = new Image(board, tileX, tileY, tileZ, key, frame, addToBoard);
        board.scene.add.existing(gameObject);
        return gameObject;
    });

    SetValue(window, 'RexPlugins.Board.Image', Image);

    const Base$1 = Phaser.GameObjects.Sprite;
    class Sprite extends Base$1 {
        constructor(board, tileX, tileY, tileZ, key, frame, addToBoard) {
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
            super(scene, worldX, worldY, key, frame);
            this.type = 'rexSpriteChess';

            if (addToBoard) {
                if (isMiniBoard) { // Chess-Container
                    miniBoard.addChess(this, tileX, tileY, tileZ);
                } else {
                    board.addChess(this, tileX, tileY, tileZ, true);
                }
            } else {
                GetChessData(this);
            }
        }
    }

    ObjectFactory.register('sprite', function (board, tileX, tileY, tileZ, key, frame, addToBoard) {
        var gameObject = new Sprite(board, tileX, tileY, tileZ, key, frame, addToBoard);
        board.scene.add.existing(gameObject);
        return gameObject;
    });

    SetValue(window, 'RexPlugins.Board.Sprite', Sprite);

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$5(config, 'tickEventName', defaultEventName);
            this.isSceneTicker = !IsGameUpdateEvent(this.tickEventName);

        }

        startTicking() {
            super.startTicking();

            if (this.isSceneTicker) {
                this.scene.sys.events.on(this.tickEventName, this.update, this);
            } else {
                this.game.events.on(this.tickEventName, this.update, this);
            }

        }

        stopTicking() {
            super.stopTicking();

            if (this.isSceneTicker && this.scene) { // Scene might be destoryed
                this.scene.sys.events.off(this.tickEventName, this.update, this);
            } else if (this.game) {
                this.game.events.off(this.tickEventName, this.update, this);
            }
        }

        // update(time, delta) {
        //     
        // }

    }

    var IsGameUpdateEvent = function (eventName) {
        return (eventName === 'step') || (eventName === 'poststep');
    };

    var CanMoveToTile$1 = function (tileX, tileY, direction) {
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
        if ((tileX === myTileX) && (tileY === myTileY)) {
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

    var targetTileXY$3 = { x: 0, y: 0, z: 0, };

    var GetSneakTileZ = function (moveTo, tileX, tileY, tileZ) {
        var board = moveTo.chessData.board;
        var sneakTileZ = tileZ.toString();
        do {
            sneakTileZ += '.';
        } while (board.contains(tileX, tileY, sneakTileZ))
        return sneakTileZ;
    };

    var MoveToTile$1 = function (tileX, tileY, direction) {
        var board = this.chessData.board;
        if (board === null) { // chess is not in a board
            this.lastMoveResult = false;
            return this;
        }

        if ((tileX != null) && (typeof (tileX) !== 'number')) {
            var config = tileX;
            tileX = GetValue$c(config, 'x', undefined);
            tileY = GetValue$c(config, 'y', undefined);
            direction = GetValue$c(config, 'direction', undefined);
        }
        var myTileXYZ = this.chessData.tileXYZ;
        if ((direction !== undefined) &&
            (tileX == null) || (tileY == null)) {
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
        if ((tileX == null) || (tileY == null)) {
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

        if (board.wrapMode && (direction !== null)) {
            board.grid.getNeighborTileXY(myTileXYZ.x, myTileXYZ.y, direction, neighborTileXY);
            // wrap mode && neighbor
            if ((neighborTileXY.x === tileX) && (neighborTileXY.y === tileY)) {
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

    var MoveToward$1 = function (direction) {
        this.moveTo(undefined, undefined, direction);
        return this;
    };

    /**
     * Shallow Object Clone. Will not out nested objects.
     * @param {object} obj JSON object
     * @param {object} ret JSON object to return, set null to return a new object
     * @returns {object} this object
     */
    var Clone = function (obj, out) {
        var objIsArray = Array.isArray(obj);

        if (out === undefined) {
            out = (objIsArray) ? [] : {};
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

    var MoveToRandomNeighbor$1 = function () {
        var board = this.chessData.board;
        if (board === null) { // chess is not in a board
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

    var MoveAway = function (tileX, tileY, moveAwayMode) {
        var board = this.chessData.board;
        if (board === null) { // chess is not in a board
            this.lastMoveResult = false;
            return this;
        }

        if (typeof (tileX) !== 'number') {
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

            if (i < (cnt - 1)) {
                // Neighbors
                var out = board.getNeighborTileXY(myTileXYZ, i, chessInfo);
                if (out === null) { // Invalid neighbor tile position
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
                return (moveAwayMode) ? -1 : 1;
            }
            if (distanceA < distanceB) {
                return (moveAwayMode) ? 1 : -1;
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
            if (chessInfo.distance === null) { // Invalid tile position
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

    var MoveCloser = function(tileX, tileY) {
        this.moveAway(tileX, tileY, false);
        return this;
    };

    var Methods$5 = {
        canMoveTo: CanMoveToTile$1,
        moveTo: MoveToTile$1,
        moveToward: MoveToward$1,
        moveToRandomNeighbor: MoveToRandomNeighbor$1,
        moveAway: MoveAway,
        moveCloser: MoveCloser,
    };

    const GetValue$4 = Phaser.Utils.Objects.GetValue;
    const DistanceBetween = Phaser.Math.Distance.Between;
    const Lerp = Phaser.Math.Linear;
    const AngleBetween = Phaser.Math.Angle.Between;


    let MoveTo$2 = class MoveTo extends SceneUpdateTickTask {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.isRunning = GetValue$4(o, 'isRunning', false);
            this.setEnable(GetValue$4(o, 'enable', true));
            this.timeScale = GetValue$4(o, 'timeScale', 1);
            this.setSpeed(GetValue$4(o, 'speed', 400));
            this.setRotateToTarget(GetValue$4(o, 'rotateToTarget', false));
            this.targetX = GetValue$4(o, 'targetX', 0);
            this.targetY = GetValue$4(o, 'targetY', 0);
            return this;
        }

        toJSON() {
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

        setEnable(e) {
            if (e == undefined) {
                e = true;
            }
            this.enable = e;
            return this;
        }

        setSpeed(speed) {
            this.speed = speed;
            return this;
        }

        setRotateToTarget(rotateToTarget) {
            this.rotateToTarget = rotateToTarget;
            return this;
        }

        moveTo(x, y) {
            if (typeof (x) !== 'number') {
                var config = x;
                x = config.x;
                y = config.y;
            }

            this.targetX = x;
            this.targetY = y;
            super.start();
            this.emit('start', this.parent, this);
            return this;
        }

        moveFrom(x, y) {
            if (typeof (x) !== 'number') {
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

        moveToward(angle, distance) {
            var gameObject = this.parent;
            var targetX = gameObject.x + Math.cos(angle) * distance;
            var targetY = gameObject.y + Math.sin(angle) * distance;
            this.moveTo(targetX, targetY);
            return this;
        }

        update(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
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
            if ((curX === targetX) && (curY === targetY)) {
                this.complete();
                return this;
            }

            if ((this.speed === 0) || (delta === 0) || (this.timeScale === 0)) {
                return this;
            }

            var dt = (delta * this.timeScale) / 1000;
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
    };

    let MoveTo$1 = class MoveTo extends SceneUpdateTickTask {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.chessData = GetChessData(gameObject);
            this.scene = gameObject.scene;
            this.moveToTask = new MoveTo$2(gameObject, { tickingMode: 0 });

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
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

        toJSON() {
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

        shutdown(fromScene) {
            this.moveToTask.shutdown(fromScene);
            super.shutdown(fromScene);
        }

        set enable(value) {
            this.moveToTask.setEnable(value);
        }

        get enable() {
            return this.moveToTask.enable;
        }

        setEnable(e) {
            if (e == undefined) {
                e = true;
            }
            this.enable = e;
            return this;
        }

        get timeScale() {
            return this.moveToTask.timeScale;
        }

        set timeScale(value) {
            this.moveToTask.timeScale = value;
        }

        set speed(value) {
            this.moveToTask.setSpeed(value);
        }

        get speed() {
            return this.moveToTask.speed;
        }

        setSpeed(speed) {
            this.speed = speed;
            return this;
        }

        set rotateToTarget(value) {
            this.moveToTask.setRotateToTarget(value);
        }

        get rotateToTarget() {
            return this.moveToTask.rotateToTarget;
        }

        setRotateToTarget(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.rotateToTarget = enable;
            return this;
        }

        setOccupiedTest(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.occupiedTest = enable;
            return this;
        }

        setBlockerTest(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.blockerTest = enable;
            return this;
        }

        setEdgeBlockerTest(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.edgeBlockerTest = enable;
            return this;
        }

        setMoveableTestCallback(callback, scope) {
            this.moveableTestCallback = callback;
            this.moveableTestScope = scope;
            return this;
        }

        setSneakEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.sneakMode = enable;
            this.tileZSave = undefined;
            return this;
        }

        moveAlongLine(startX, startY, endX, endY) {
            if (startX !== undefined) {
                this.parent.x = startX;
            }
            if (startY !== undefined) {
                this.parent.y = startY;
            }
            this.moveToTask.moveTo(endX, endY);
            return this;
        };

        addMoveLine(startX, startY, endX, endY) {
            if (!this.moveToTask.hasOwnProperty('nextlines')) {
                this.moveToTask.nextlines = [];
            }
            this.moveToTask.nextlines.push(
                [startX, startY, endX, endY]
            );
            return this;
        };

        moveNextLine() {
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

        update(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
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
    };

    Object.assign(
        MoveTo$1.prototype,
        Methods$5
    );

    var CanMoveToTile = function (tileX, tileY, direction) {
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
        if ((targetTileXYZ.x === myTileXYZ.x) && (targetTileXYZ.y === myTileXYZ.y)) {
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

    var myTileXYZ = { x: 0, y: 0, z: 0 };
    var targetTileXYZ = { x: 0, y: 0, z: 0 };

    var MoveToTile = function (tileX, tileY, direction) {
        var miniBoard = this.parent;
        var mainBoard = miniBoard.mainBoard;
        // Not on a mainBoard
        if (mainBoard == null) {
            this.lastMoveResult = false;
            return this;
        }

        if ((tileX != null) && (typeof (tileX) !== 'number')) {
            var config = tileX;
            tileX = GetValue$c(config, 'x', undefined);
            tileY = GetValue$c(config, 'y', undefined);
            direction = GetValue$c(config, 'direction', undefined);
        }
        myTileXY.x = miniBoard.tileX;
        myTileXY.y = miniBoard.tileY;
        if ((direction !== undefined) &&
            (tileX == null) || (tileY == null)) {
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
        if ((tileX == null) || (tileY == null)) {
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

    var MoveToward = function (direction) {
        this.moveTo(undefined, undefined, direction);
        return this;
    };

    var MoveToRandomNeighbor = function () {
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

    class MoveTo extends SceneUpdateTickTask {
        constructor(miniBoard, config) {
            super(miniBoard, config);
            // this.parent = miniBoard;

            this.moveToTask = new MoveTo$2(miniBoard, { tickingMode: 0 });

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
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

        toJSON() {
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

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.moveToTask.shutdown(fromScene);
            super.shutdown(fromScene);
        }

        set enable(value) {
            this.moveToTask.setEnable(value);
        }

        get enable() {
            return this.moveToTask.enable;
        }

        setEnable(e) {
            if (e == undefined) {
                e = true;
            }
            this.enable = e;
            return this;
        }

        get timeScale() {
            return this.moveToTask.timeScale;
        }

        set timeScale(value) {
            this.moveToTask.timeScale = value;
        }

        set speed(value) {
            this.moveToTask.setSpeed(value);
        }

        get speed() {
            return this.moveToTask.speed;
        }

        setSpeed(speed) {
            this.speed = speed;
            return this;
        }

        moveAlongLine(startX, startY, endX, endY) {
            if (startX !== undefined) {
                this.parent.x = startX;
            }
            if (startY !== undefined) {
                this.parent.y = startY;
            }
            this.moveToTask.moveTo(endX, endY);
            return this;
        };

        update(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
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
    }

    var methods$1 = {
        canMoveTo: CanMoveToTile,
        moveTo: MoveToTile,
        moveToward: MoveToward,
        moveToRandomNeighbor: MoveToRandomNeighbor,
    };
    Object.assign(
        MoveTo.prototype,
        methods$1
    );

    ObjectFactory.register('moveTo', function (gameObject, config) {
        var klass = (IsMiniBoardObject(gameObject)) ? MoveTo : MoveTo$1;
        return new klass(gameObject, config);
    });

    SetValue(window, 'RexPlugins.Board.MoveTo', MoveTo$1);
    SetValue(window, 'RexPlugins.Board.MiniBoardMoveTo', MoveTo);

    var MatchBoard = function (pattern, callback, scope, getFirst) {
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

    var MatchAtDir = function (pattern, startTileX, startTileY, direction) {
        // pattern: pattern list or repeat count
        var matchNMode = typeof (pattern) === 'number';
        var patternLength;
        if (matchNMode) {
            patternLength = pattern;
            pattern = null;
        } else {
            patternLength = pattern.length;
        }

        var symbol, wildcard = this.wildcard;
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
                } else if (pattern[i] !== symbol) { // pattern list mode
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

    var Group = function (startTileX, startTileY, out) {
        if (out === undefined) {
            out = [];
        }

        var board = this.board;
        var wildcard = this.wildcard;
        var targetSymbol = this.getSymbol(startTileX, startTileY);
        if ((targetSymbol == null) || (targetSymbol === wildcard)) {
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
            if ((symbol === targetSymbol) || (symbol === wildcard)) {
                out.push(curTileXY);
                globalQueue.push(board.getNeighborTileXY(curTileXY));
            }
        }

        globalQueue.clear();
        return out;
    };

    class Queue {
        constructor() {
            this.data = [];
            this.visited = {};
        }

        push(x, y) {
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
            var key = `${x},${y}`;
            if (this.visited.hasOwnProperty(key)) {
                return this;
            }

            this.data.push({ x: x, y: y });
            this.visited[key] = true;
            return this;
        }

        pop() {
            return this.data.pop();
        }

        get length() {
            return this.data.length;
        }

        clear() {
            Clear(this.data);
            Clear(this.visited);
            return this;
        }
    }

    var globalQueue;

    var Methods$4 = {
        match: MatchBoard,
        matchAtDir: MatchAtDir,
        group: Group
    };

    var IsFunction = function (obj) {    
        return obj && (typeof(obj) === 'function');
    };

    class Match {
        constructor(config) {
            this.symbols = []; // tileX+(tileY*board.width)
            this.dirMask = {};
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setBoard(GetValue$c(o, 'board', undefined));
            this.setWildcard(GetValue$c(o, 'wildcard', undefined));

            var dirMask = GetValue$c(o, 'dirMask', undefined);
            if (dirMask !== undefined) {
                this.setDirMask(dirMask);
            }
            return this;
        }

        boot() { }

        shutdown() {
            this.board = undefined;
            this.symbols = undefined;
            this.dirMask = undefined;
            return this;
        }

        destroy() {
            this.shutdown();
            return this;
        }

        setBoard(board) {
            this.board = board;
            if (board) {
                this.clearSymbols();
            }
            return this;
        }

        setDirMask(dir, value) {
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

        setDirectionMode(mode) {
            this.board.grid.setDirectionMode(mode);
            return this;
        }

        clearSymbols() {
            this.refreshSymbols(null);
            return this;
        }

        setSymbol(tileX, tileY, symbol) {
            var board = this.board;
            if (!board.contains(tileX, tileY)) {
                return this;
            }

            this.symbols[this.tileXYToKey(tileX, tileY)] = symbol;
            return this;
        }

        getSymbol(tileX, tileY) {
            return this.symbols[this.tileXYToKey(tileX, tileY)];
        }

        forEach(callback, scope) {
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

        refreshSymbols(callback, scope) {
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

        setWildcard(symbol) {
            this.wildcard = symbol;
            return this;
        }

        tileXYToKey(tileX, tileY) {
            return tileX + (tileY * this.board.width);
        }

        keyToTileXY(key, out) {
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

        anyMatch(pattern) {
            return this.match(pattern, null, null, true);
        }
    }

    var globTileXY = {
        x: 0,
        y: 0
    };

    Object.assign(
        Match.prototype,
        Methods$4
    );

    ObjectFactory.register('match', function (config) {
        return new Match(config);
    });

    SetValue(window, 'RexPlugins.Board.Match', Match);

    class Stack {
        constructor() {
            this.items = [];
        }

        destroy() {
            this.clear();
            this.items = undefined;
        }

        pop() {
            return (this.items.length > 0) ? this.items.pop() : null;
        }

        push(l) {
            this.items.push(l);
            return this;
        }

        pushMultiple(arr) {
            this.items.push.apply(this.items, arr);
            arr.length = 0;
            return this;
        }

        clear() {
            this.items.length = 0;
            return this;
        }
    }

    class Node {
        constructor() {
            this.preNodes = [];
            this.manager = undefined;
        }

        reset(manager) {
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

        destroy() {
            this.preNodes.length = 0;
            this.manager = undefined;
        }

        heuristic(endNode, pathMode, baseNode) {
            if (pathMode === null) {
                return 0;
            }

            var h, dist = this.board.getDistance(endNode, this, true) * this.pathFinder.weight;

            if ((pathMode === 1) && (baseNode !== undefined)) {
                var deltaAngle = endNode.angleTo(baseNode) - this.angleTo(baseNode);
                h = dist + Math.abs(deltaAngle);
            } else if (pathMode === 2) {
                h = dist + Math.random();
            } else {
                h = dist;
            }

            return h;
        }

        getNeighborNodes() {
            var neighborsTileXY = this.board.getNeighborTileXY(this);
            if (this.pathFinder.shuffleNeighbors) {
                Shuffle(neighborsTileXY);
            }

            var node, neighborNodes = [];
            for (var i = 0, cnt = neighborsTileXY.length; i < cnt; i++) {
                node = this.manager.getNode(neighborsTileXY[i], true);
                neighborNodes.push(node);
            }
            return neighborNodes;
        }

        getCost(preNode) {
            if (this.pathFinder.cacheCost) {
                if (this.cost === undefined) {
                    this.cost = this.pathFinder.getCost(this, preNode);
                }
            } else {
                this.cost = this.pathFinder.getCost(this, preNode);
            }
            return this.cost;
        }

        angleTo(endNode) {
            return Between$1(this.worldX, this.worldY, endNode.worldX, endNode.worldY);
        }

        get pathFinder() {
            return this.manager.pathFinder;
        }

        get board() {
            return this.manager.pathFinder.board;
        }

        get worldX() {
            if (this._px === undefined) {
                this._px = this.board.tileXYToWorldX(this.x, this.y);
            }
            return this._px;
        }

        get worldY() {
            if (this._py === undefined) {
                this._py = this.board.tileXYToWorldY(this.x, this.y);
            }
            return this._py;
        }

        get pathCost() {
            return this.g;
        }
    }

    // global object
    var NodesPool = new Stack(); // recycle dead nodes
    // global object

    class NodeCache {
        constructor(pathFinder) {
            this.sn = 0;
            this.pool = NodesPool;
            this.nodes = {}; // {tileXYKey:node}
            this.pathFinder = pathFinder;
            this.closestNode = null;
        }

        destroy() {
            this.freeAllNodes();
            this.pathFinder = null;
            this.pool = undefined;
            return this;
        }

        getNode(tileX, tileY, createNewNode) {
            var key;
            switch (typeof (tileX)) {
                case 'number': // (tileX, tileY, createNewNode)
                    key = TileXYToKey(tileX, tileY);
                    break;
                case 'string': // (key, createNewNode)
                    key = tileX;
                    createNewNode = tileY;
                    break;
                default: // (tileXY, createNewNode)
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

        freeAllNodes() {
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

        getAllNodes() {
            return this.nodes;
        }
    }

    class BinaryHeap {
        constructor(scoreFunction) {
            this.content = [];
            this.scoreFunction = scoreFunction;
        }

        clear() {
            this.content.length = 0;
        }

        push(element) {
            // Add the new element to the end of the array.
            this.content.push(element);

            // Allow it to sink down.
            this.sinkDown(this.content.length - 1);
        }

        pop() {
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

        remove(node) {
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

        size() {
            return this.content.length;
        }

        rescoreElement(node) {
            this.sinkDown(this.content.indexOf(node));
        }

        sinkDown(n) {
            // Fetch the element that has to be sunk.
            var element = this.content[n];

            // When at 0, an element can not sink any further.
            while (n > 0) {

                // Compute the parent element's index, and fetch it.
                var parentN = ((n + 1) >> 1) - 1,
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

        bubbleUp(n) {
            // Look up the target element and its score.
            var length = this.content.length,
                element = this.content[n],
                elemScore = this.scoreFunction(element);

            while (true) {
                // Compute the indices of the child elements.
                var child2N = (n + 1) << 1,
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
    }

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
        'INFINITY': undefined,
    };

    /* 

    javascript-astar 0.3.0
    http://github.com/bgrins/javascript-astar
    Freely distributable under the MIT License.
    Implements the astar search algorithm in javascript using a Binary Heap.
    Includes Binary Heap (with modifications) from Marijn Haverbeke.
    http://eloquentjavascript.net/appendix2.html

    */

    const PATH_MODE$1 = CONST$2.PATH_MODE;

    const ASTAR$1 = CONST$2['A*'];
    const ASTAR_LINE$1 = CONST$2['A*-line'];
    const ASTAR_RANDOM$1 = CONST$2['A*-random'];

    const BLOCKER$5 = CONST$2.BLOCKER;
    const INFINITY$6 = CONST$2.INFINITY;

    // global object
    var gOpenHeap = new BinaryHeap(function (node) {
        return node.f;
    });
    // global object

    var AStarSerach = function (startTileXYZ, endTileXY, movingPoints, mode) {
        if (this.nodeManager === undefined) {
            this.nodeManager = new NodeCache(this);
        }
        var nodeManager = this.nodeManager;
        nodeManager.freeAllNodes();

        // const isAreaSearch = (mode === AREA_MODE);
        const isPathSearch = (mode === PATH_MODE$1);
        const isAStarMode = (this.pathMode === ASTAR$1) || (this.pathMode === ASTAR_LINE$1) || (this.pathMode === ASTAR_RANDOM$1);
        const astarHeuristicEnable = isPathSearch && isAStarMode;
        const shortestPathEnable = isPathSearch && (!isAStarMode);
        const astarHeuristicMode =
            (!astarHeuristicEnable) ? null :
                (this.pathMode == ASTAR$1) ? 0 :
                    (this.pathMode == ASTAR_LINE$1) ? 1 :
                        (this.pathMode == ASTAR_RANDOM$1) ? 2 :
                            null;

        var end = (endTileXY !== null) ? nodeManager.getNode(endTileXY.x, endTileXY.y, true) : null;
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
            if (isPathSearch && (curNode === end)) {
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
                if (neighbor.closed || (neighborCost === BLOCKER$5)) {
                    // Not a valid node to process, skip to next neighbor.
                    //log("("+neighbor.x+","+neighbor.y+") is closed");
                    continue;
                }

                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                var gScore = curNode.g + neighborCost,
                    beenVisited = neighbor.visited;

                //log("("+curNode.x+","+curNode.y+") -> ("+neighbor.x+","+neighbor.y+")="+neighborCost+" ,acc="+gScore);
                if ((movingPoints != INFINITY$6) && (gScore > movingPoints)) {
                    //log("("+neighbor.x+","+neighbor.y+") out of range");
                    continue;
                }

                if ((!beenVisited) || (gScore < neighbor.g)) {

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
                        isNeighborMoreCloser = (neighbor.closerH < closestNode.closerH) ||
                            ((neighbor.closerH === closestNode.closerH) && (neighbor.g < closestNode.g));

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
                } else if (shortestPathEnable && (gScore == neighbor.g)) {
                    neighbor.preNodes.push(curNode);

                    //if (neighbor.preNodes.indexOf(curNode) == -1)                    
                    //    neighbor.preNodes.push(curNode);                    
                    //else                    
                    //    debugger;                 

                    //log("drop ("+neighbor.x+","+neighbor.y+") ")                
                } else ;
            }

        }

        nodeManager.closestNode = (isPathSearch) ? closestNode : null;
        gOpenHeap.clear();
        return this;
    };

    const BLOCKER$4 = CONST$2.BLOCKER;

    var GetCost$2 = function (curNode, preNode) {
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

        if (typeof (this.costCallback) === 'number') {
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

    const AREA_MODE = CONST$2.AREA_MODE;
    const INFINITY$5 = CONST$2.INFINITY;  // undefined

    var FindArea = function (movingPoints, out) {
        if (out === undefined) {
            out = [];
        }
        if (this.board === null) { // chess is not in board
            return out;
        }
        if ((movingPoints !== INFINITY$5) && (movingPoints <= 0)) {
            return out;
        }

        var startTileXYZ = this.chessData.tileXYZ,
            startTileX = startTileXYZ.x,
            startTileY = startTileXYZ.y;
        this.aStarSearch(startTileXYZ, null, movingPoints, AREA_MODE);
        // output : this.nodeManager.getAllNodes()
        var nodes = this.nodeManager.getAllNodes(),
            node, nodesList = [];
        for (var key in nodes) {
            node = nodes[key];
            // not include start node
            if ((node.x === startTileX) && (node.y === startTileY)) {
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
            return (snA > snB) ? 1 :
                (snA < snB) ? -1 :
                0;
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

    const RANDOM = CONST$2['random'];
    const DIAGONAL = CONST$2['diagonal'];
    const STRAIGN = CONST$2['straight'];
    const LINE = CONST$2['line'];
    const ASTAR = CONST$2['A*'];
    const ASTAR_LINE = CONST$2['A*-line'];
    const ASTAR_RANDOM = CONST$2['A*-random'];


    var GetNodePath = function (startNode, endNode, pathMode) {
        var board = startNode.board;

        var curDir, preNodeDir; // DIAGONAL, STRAIGN
        var targetAngle; // LINE

        var curNode = endNode,
            preNode, preNodeKeysCnt;
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
                    preNode = (preNodeKeysCnt === 1) ? curNode.preNodes[0] : curNode.preNodes[Between(0, preNodeKeysCnt - 1)];
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

    var GetPath$1 = function (endTileXY, out) {
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
        if ((startNode === null) || (endNode === null)) {
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

    const PATH_MODE = CONST$2.PATH_MODE;
    const INFINITY$4 = CONST$2.INFINITY;  // undefined

    var FindPath = function (endTileXY, movingPoints, isClosest, out) {
        if (isClosest === undefined) {
            isClosest = true;
        }
        if (out === undefined) {
            out = [];
        }
        if (this.board === null) { // chess is not in board
            return out;
        }
        if ((movingPoints !== INFINITY$4) && (movingPoints <= 0)) {
            return out;
        }

        var startTileXYZ = this.chessData.tileXYZ;
        this.aStarSearch(startTileXYZ, endTileXY, movingPoints, PATH_MODE);
        var nodeManager = this.nodeManager;
        var endNode = (isClosest) ? nodeManager.closestNode : nodeManager.getNode(endTileXY);
        if (endNode === null) {
            return out;
        }
        return this.getPath(endNode, out);
    };

    var TileXYToCost = function (tileX, tileY, pathCost) {
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
        return (pathCost)? node.g:node.cost;
    };

    var Methods$3 = {
        aStarSearch: AStarSerach,
        getCost: GetCost$2,
        findArea: FindArea,
        getPath: GetPath$1,
        findPath: FindPath,
        tileXYToCost: TileXYToCost,
    };

    const BLOCKER$3 = CONST$2.BLOCKER;
    const INFINITY$3 = CONST$2.INFINITY;

    class PathFinder extends ComponentBase {
        constructor(gameObject, config) {
            if (IsPlainObject(gameObject)) {
                config = gameObject;
                gameObject = undefined;
            }
            super(gameObject, { eventEmitter: false });

            this.setChess(gameObject);
            this.nodeManager = undefined;
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
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

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            if (this.nodeManager !== undefined) {
                this.nodeManager.destroy();
            }
            this.chessData = undefined;

            super.shutdown(fromScene);
        }

        get gameObject() {
            return this.parent;
        }

        setChess(gameObject) {
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

        setCostFunction(callback, scope) {
            this.costCallback = callback;
            this.costCallbackScope = scope;
            return this;
        }

        setPathMode(mode) {
            if (typeof (mode) === 'string') {
                mode = CONST$2[mode];
            }
            this.pathMode = mode;
            return this;
        }

        setCacheCostMode(value) {
            if (value === undefined) {
                value = true;
            }
            this.cacheCost = value;
            return this;
        }

        setOccupiedTest(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.occupiedTest = enable;
            return this;
        }

        setBlockerTest(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.blockerTest = enable;
            return this;
        }

        setEdgeBlockerTest(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.edgeBlockerTest = enable;
            return this;
        }

        setWeight(value) {
            this.weight = value;
            return this;
        }

        setShuffleNeighborsMode(value) {
            if (value === undefined) {
                value = true;
            }
            this.shuffleNeighbors = value;
            return this;
        }

        get BLOCKER() {
            return BLOCKER$3;
        }

        get INFINITY() {
            return INFINITY$3;
        }

        get board() {
            return this.chessData.board;
        }
    }

    Object.assign(
        PathFinder.prototype,
        Methods$3
    );

    ObjectFactory.register('pathFinder', function (gameObject, config) {
        return new PathFinder(gameObject, config);
    });

    SetValue(window, 'RexPlugins.Board.PathFinder', PathFinder);

    var PreTest = function (tileXYArray, visiblePoints) {
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

    var GetCost$1 = function (curTileXY, tileXYArray) {
        if (typeof (this.costCallback) === 'number') {
            return this.costCallback;
        }
        if (this.costCallbackScope) {
            return this.costCallback.call(this.costCallbackScope, curTileXY, this, tileXYArray);
        } else {
            return this.costCallback(curTileXY, this, tileXYArray);
        }
    };

    var IsInCone = function (targetTileXY) {
        if (this.cone === undefined) {
            return true;
        }
        var board = this.board;
        var myTileXYZ = this.chessData.tileXYZ;
        if (this.coneMode === 0) { // Direction
            return board.isDirectionInCone(myTileXYZ, targetTileXY, this.face, this.cone);
        } else { // Angle
            return board.isAngleInCone(myTileXYZ, targetTileXY, this.faceAngle, this.coneRad);
        }
    };

    var CONST$1 = {
        // special cost
        'BLOCKER': null,

        // special moving point
        'INFINITY': undefined,
    };

    const BLOCKER$2 = CONST$1.BLOCKER;
    const INFINITY$2 = CONST$1.INFINITY;

    var IsPathVisible = function (tileXYArray, visiblePoints) {
        if (this.preTest(tileXYArray, visiblePoints) === false) {
            return false;
        }

        if (this.costCallback === undefined) {
            return true;
        }
        var myTileXYZ = this.chessData.tileXYZ;
        var tileXY, cost, behindBlocker = false;
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

    var AreTileXYArrayEqual = function (tileArrayA, tileArrayB) {
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

    const INFINITY$1 = CONST$1.INFINITY;
    const LINEOFFSET = 0.001;

    var IsInLOS = function (chess, visiblePoints, originTileXY) {
        // chess: chess object or tileXY
        if ((visiblePoints !== INFINITY$1) && (visiblePoints <= 0)) {
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
            offsetX, offsetY, isVisivle;

        // Shift a small distance
        lineAngle += (Math.PI / 2);
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
            DrawLine(
                this.debugGraphics,
                this.debugVisibleLineColor,
                startX, startY, endX, endY
            );
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
        DrawLine(
            this.debugGraphics,
            ((isVisivle) ? this.debugVisibleLineColor : this.debugInvisibleLineColor),
            startX, startY, endX, endY
        );
        return isVisivle;
    };

    var DrawLine = function (graphics, color, startX, startY, endX, endY) {
        if (graphics && (color !== undefined)) {
            graphics.lineStyle(1, color, 1).lineBetween(startX, startY, endX, endY);
        }
    };

    var globTileXYArray0,
        globTileXYArray1;

    var LOS = function (chessArray, visiblePoints, originTileXY, out) {
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

    var FindFOV = function (visiblePoints, originTileXY, out) {
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
        findFOV: FindFOV,
    };

    const BLOCKER$1 = CONST$1.BLOCKER;
    const INFINITY = CONST$1.INFINITY;

    class FieldOfView extends ComponentBase {
        constructor(gameObject, config) {
            if (IsPlainObject(gameObject)) {
                config = gameObject;
                gameObject = undefined;
            }

            super(gameObject, { eventEmitter: false });
            // No event emitter
            // this.parent = gameObject;

            this.setChess(gameObject);
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
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

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.debugGraphics = undefined;
            this.chessData = undefined;

            super.shutdown(fromScene);
        }

        setChess(gameObject) {
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

        get face() {
            return this._face;
        }

        set face(direction) {
            if (!this.chessData) {
                if (this._face === undefined) {
                    this._face = 0;
                }
                return;
            }

            direction = this.board.grid.directionNormalize(direction);
            this._face = direction;
            if (this.coneMode === 0) ; else { // Angle
                var angle = this.board.angleToward(this.chessData.tileXYZ, direction); // -PI~PI
                this.faceAngle = Normalize(angle); // 0~2PI
            }
        }

        setFace(direction) {
            this.face = direction;
            return this;
        }

        get cone() {
            return this._cone;
        }

        set cone(value) {
            this._cone = value;

            if (value !== undefined) {
                if (this.coneMode === 0) ; else { // Angle
                    this.coneRad = DegToRad$2(value);
                }
            }
        }

        setConeMode(mode) {
            if (typeof (mode) === 'string') {
                mode = CONEMODE[mode];
            }
            this.coneMode = mode;
            return this;
        }

        setCone(value) {
            this.cone = value;
            return this;
        }

        setOccupiedTest(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.occupiedTest = enable;
            return this;
        }

        setBlockerTest(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.blockerTest = enable;
            return this;
        }

        setEdgeBlockerTest(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.edgeBlockerTest = enable;
            return this;
        }

        setCostFunction(callback, scope) {
            this.costCallback = callback;
            this.costCallbackScope = scope;
            return this;
        }

        setPreTestFunction(callback, scope) {
            this.preTestCallback = callback;
            this.preTestCallbackScope = scope;
            return this;
        }

        setPerspectiveEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.perspectiveEnable = enable;
            return this;
        }

        setDebugGraphics(graphics) {
            this.debugGraphics = graphics;
            return this;
        }

        setDebugLineColor(visibleLineColor, invisibleLineColor) {
            this.debugVisibleLineColor = visibleLineColor;
            this.debugInvisibleLineColor = invisibleLineColor;
            return this;
        }

        setDebugLog(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.debugLog = enabled;
            return this;
        }

        clearDebugGraphics() {
            if (this.debugGraphics) {
                this.debugGraphics.clear();
            }
            return this;
        }

        get BLOCKER() {
            return BLOCKER$1;
        }

        get INFINITY() {
            return INFINITY;
        }

        get board() {
            return this.chessData.board;
        }
    }

    const CONEMODE = {
        direction: 0,
        angle: 1,
    };

    Object.assign(
        FieldOfView.prototype,
        Methods$2
    );

    ObjectFactory.register('fieldOfView', function (gameObject, config) {
        return new FieldOfView(gameObject, config);
    });

    SetValue(window, 'RexPlugins.Board.FieldOfView', FieldOfView);

    var CreateTileData = function (x, y, direction) {
        return { x: x, y: y, direction: direction };
    };

    var CONST = {
        // special cost
        'BLOCKER': null,
        'STOP': -1,
    };

    const STOP$1 = CONST.STOP;

    var GetPath = function (movingPoints, out) {
        if (out === undefined) {
            out = [];
        }
        if (this.board === null) { // chess is not in board
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

    var GetNextTile = function (curTileData, preTileData) {
        var board = this.board;
        var directions = board.grid.allDirections;
        var forwardTileData = null,
            backwardTileData = null;
        var neighborTileXArray = []; // forward and other neighbors, exclude backward
        var neighborTileXY, neighborTileData = null, cost;
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
            if (typeof (cost) !== 'number') { // Invalid cost, remove this tileData
                continue;
            }

            neighborTileData.cost = cost;

            if (directions[i] === curTileData.direction) {
                forwardTileData = neighborTileData;
            }
            if ((preTileData !== undefined) && (AreTileXYEqual(neighborTileXY, preTileData))) {
                backwardTileData = neighborTileData;
            } else {
                neighborTileXArray.push(neighborTileData);
            }
        }

        var nextTileData;
        if ((backwardTileData === null) && (neighborTileXArray.length === 0)) {
            // no valid neighbor
            nextTileData = null;
        } else if ((backwardTileData === null) && (neighborTileXArray.length === 1)) {
            // 1 neighbor
            nextTileData = neighborTileXArray[0];
        } else if ((backwardTileData !== null) && (neighborTileXArray.length === 0)) {
            // 1 backward neighbor
            nextTileData = backwardTileData;
        } else {
            // 2 or more neighobrs
            switch (this.pickMode) {
                case 1: // random all
                    if (backwardTileData !== null) {
                        neighborTileXArray.push(backwardTileData);
                    }
                    nextTileData = GetRandom(neighborTileXArray);
                    break;

                default: // case 0: forward first
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

    var GetCost = function (curTileXY, preTileXY) {
        if (typeof (this.costCallback) === 'number') {
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
        getCost: GetCost,
    };

    const BLOCKER = CONST.BLOCKER;
    const STOP = CONST.STOP;

    class Monopoly extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, { eventEmitter: false });
            // No event emitter
            // this.parent = gameObject;

            this.chessData = GetChessData(gameObject);
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
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

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.chessData = undefined;

            super.shutdown(fromScene);
        }

        setFace(direction) {
            direction = this.board.grid.directionNormalize(direction);
            this.face = direction;
            return this;
        }

        setPathMode(mode) {
            if (typeof (mode) === 'string') {
                mode = PATHMODE[mode];
            }
            this.pathMode = mode;
            return this;
        }

        setCostFunction(callback, scope) {
            this.costCallback = callback;
            this.costCallbackScope = scope;
            return this;
        }

        setPathTileZ(value) {
            if (value === undefined) {
                value = true;
            }
            this.pathTileZ = value;
            return this;
        }

        get BLOCKER() {
            return BLOCKER;
        }

        get STOP() {
            return STOP;
        }

        get board() {
            return this.chessData.board;
        }
    }

    Object.assign(
        Monopoly.prototype,
        Methods$1
    );

    const PATHMODE = {
        'forward': 0,
        'random': 1
    };

    ObjectFactory.register('monopoly', function (gameObject, config) {
        return new Monopoly(gameObject, config);
    });

    SetValue(window, 'RexPlugins.Board.Monopoly', Monopoly);

    const MinVersion = 60;

    var IsChecked = false;

    var CheckP3Version = function (minVersion) {
        if (IsChecked) {
            return;
        }

        if (minVersion === undefined) {
            minVersion = MinVersion;
        }
        var version = Phaser.VERSION.split('.');
        var mainVersion = parseInt(version[0]);
        if (mainVersion === 3) {
            var currentVersion = parseInt(version[1]);
            if (currentVersion < minVersion) {
                console.error(`Minimum supported version : ${mainVersion}.${currentVersion}`);
            }
        } else {
            console.error(`Can't supported version : ${mainVersion}`);
        }

        IsChecked = true;
    };

    CheckP3Version();

    const Zone = Phaser.GameObjects.Zone;
    const AddItem = Phaser.Utils.Array.Add;
    const RemoveItem = Phaser.Utils.Array.Remove;

    class Base extends Zone {
        constructor(scene, x, y, width, height) {
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
            super(scene, x, y, width, height);
            this.children = [];
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            if (fromScene) {
                // Stop scene
                var child;
                for (var i = this.children.length - 1; i >= 0; i--) {
                    child = this.children[i];
                    if (!child.parentContainer &&  // Not in container
                        !child.displayList         // Not in scene, neither in layer
                    ) {
                        // Destroy child which is not in scene, container, or layer manually
                        child.destroy(fromScene);
                    }
                }
            }

            // Destroy/remove children
            this.clear(!fromScene);
            super.destroy(fromScene);
        }

        contains(gameObject) {
            return (this.children.indexOf(gameObject) !== -1);
        }

        add(gameObjects) {
            var parent = this;
            AddItem(this.children, gameObjects, 0,
                // Callback of item added
                function (gameObject) {
                    gameObject.once('destroy', parent.onChildDestroy, parent);
                }, this);
            return this;
        }

        remove(gameObjects, destroyChild) {
            var parent = this;
            RemoveItem(this.children, gameObjects,
                // Callback of item removed
                function (gameObject) {
                    gameObject.off('destroy', parent.onChildDestroy, parent);
                    if (destroyChild) {
                        gameObject.destroy();
                    }
                }
            );
            return this;
        }

        onChildDestroy(child, fromScene) {
            // Only remove reference
            this.remove(child, false);
        }

        clear(destroyChild) {
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
    }

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Base,
        [
            Components.Alpha,
            Components.Flip
        ]
    );

    var GetParent = function (gameObject, name) {
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

    var GetTopmostParent = function (gameObject) {
        var parent = GetParent(gameObject);
        while (parent) {
            gameObject = parent;
            parent = GetParent(parent);
        }
        return gameObject;
    };

    const DegToRad$1 = Phaser.Math.DegToRad;
    const RadToDeg = Phaser.Math.RadToDeg;

    var GetLocalState = function (gameObject) {
        if (!gameObject.hasOwnProperty('rexContainer')) {
            var rexContainer = {
                parent: null, self: null, layer: null,
                x: 0, y: 0, syncPosition: true,
                rotation: 0, syncRotation: true,
                scaleX: 0, scaleY: 0, syncScale: true,
                alpha: 0, syncAlpha: true,
                syncScrollFactor: true,
                syncCameraFilter: true,
                syncDisplayList: true,
                visible: true,
                active: true,
            };

            Object.defineProperty(rexContainer, 'angle', {
                get: function () {
                    return RadToDeg(this.rotation);
                },
                set: function (value) {
                    this.rotation = DegToRad$1(value);
                }
            });
            Object.defineProperty(rexContainer, 'displayWidth', {
                get: function () {
                    return gameObject.width * this.scaleX;
                },
                set: function (width) {
                    this.scaleX = width / gameObject.width;
                }
            });
            Object.defineProperty(rexContainer, 'displayHeight', {
                get: function () {
                    return gameObject.height * this.scaleY;
                },
                set: function (height) {
                    this.scaleY = height / gameObject.height;
                }
            });

            gameObject.rexContainer = rexContainer;
        }
        return gameObject.rexContainer;
    };

    var Parent = {
        setParent(gameObject, parent) {
            if (parent === undefined) {
                parent = this;
            }
            var localState = GetLocalState(gameObject);
            if (parent) { // Add to parent
                localState.parent = parent;
                localState.self = gameObject;
            } else { // Remove from parent
                localState.parent = null;
                localState.self = null;
            }
            return this;
        },

        getParent(gameObject, name) {
            if (typeof (gameObject) === 'string') {
                name = gameObject;
                gameObject = undefined;
            }
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetParent(gameObject, name);
        },

        getTopmostParent(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetTopmostParent(gameObject);
        }
    };

    const GetValue$3 = Phaser.Utils.Objects.GetValue;
    const BaseAdd = Base.prototype.add;

    var Add = function (gameObject, config) {
        this.setParent(gameObject);

        var state = GetLocalState(gameObject);
        SetupSyncFlags(state, config);

        this
            .resetChildState(gameObject)           // Reset local state of child
            .updateChildVisible(gameObject)        // Apply parent's visible to child
            .updateChildActive(gameObject)         // Apply parent's active to child
            .updateChildScrollFactor(gameObject)   // Apply parent's scroll factor to child
            .updateChildMask(gameObject)           // Apply parent's mask to child
            .updateCameraFilter(gameObject);       // Apply parent's cameraFilter to child

        BaseAdd.call(this, gameObject);

        SyncDisplayList.call(this, gameObject, state);

        return this;
    };

    var AddLocal = function (gameObject, config) {
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

        this
            .updateChildPosition(gameObject)
            .updateChildAlpha(gameObject)
            .updateChildVisible(gameObject)        // Apply parent's visible to child
            .updateChildActive(gameObject)         // Apply parent's active to child
            .updateChildScrollFactor(gameObject)   // Apply parent's scroll factor to child
            .updateChildMask(gameObject);          // Apply parent's mask to child

        BaseAdd.call(this, gameObject);

        SyncDisplayList.call(this, gameObject, state);

        return this;
    };

    var SetupSyncFlags = function (state, config) {
        if (config === undefined) {
            config = true;
        }

        if (typeof (config) === 'boolean') {
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

    var SyncDisplayList = function (gameObject, state) {
        this.addToParentContainer(gameObject);     // Sync parent's container to child

        if (state.syncDisplayList) {
            this.addToPatentLayer(gameObject);     // Sync parent's layer to child
        }

        this.addToRenderLayer(gameObject);         // Sync parent's render-layer
    };

    var AddChild = {
        // Can override this method
        add(gameObject) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject);
            } else {
                Add.call(this, gameObject);
            }
            return this;
        },

        // Don't override this method
        pin(gameObject, config) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject, config);
            } else {
                Add.call(this, gameObject, config);
            }
            return this;
        },

        // Can override this method
        addMultiple(gameObjects) {
            var args = Array.from(arguments);
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                args[0] = gameObjects[i];
                this.add.apply(this, args);
            }
            return this;
        },

        addLocal(gameObject) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject);
            } else {
                AddLocal.call(this, gameObject);
            }
            return this;
        },

        // Don't override this method
        pinLocal(gameObject, config) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject, config);
            } else {
                AddLocal.call(this, gameObject, config);
            }
            return this;
        },

        addLocalMultiple(gameObjects) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                AddLocal.call(this, gameObjects[i]);
            }
            return this;
        }
    };

    const BaseRemove = Base.prototype.remove;
    const BaseClear = Base.prototype.clear;

    var RemoveChild = {
        // Can override this method
        remove(gameObject, destroyChild) {
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
        unpin(gameObject, destroyChild) {
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

        clear(destroyChild) {
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
        },
    };

    var ChildState = {
        getLocalState(gameObject) {
            return GetLocalState(gameObject);
        },

        resetChildState(gameObject) {
            this
                .resetChildPositionState(gameObject)
                .resetChildVisibleState(gameObject)
                .resetChildAlphaState(gameObject)
                .resetChildActiveState(gameObject);
            return this;
        },

        resetChildrenState(gameObjects) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.resetChildState(gameObjects[i]);
            }
            return this;
        },

        syncProperties() {
            this
                .syncPosition()
                .syncVisible()
                .syncAlpha()
                .syncActive()
                .syncScrollFactor()
                .syncMask();
            return this;
        }
    };

    var Transform = {
        worldToLocal(point) {
            // Transform
            point.x -= this.x;
            point.y -= this.y;

            // Rotate
            var c = Math.cos(-this.rotation);
            var s = Math.sin(-this.rotation);
            var tx = point.x;
            var ty = point.y;
            point.x = tx * c - ty * s;
            point.y = tx * s + ty * c;

            // Scale
            point.x /= this.scaleX;
            point.y /= this.scaleY;
            return point;
        },

        localToWorld(point) {
            // Scale
            point.x *= this.scaleX;
            point.y *= this.scaleY;

            // Rotate
            var c = Math.cos(this.rotation);
            var s = Math.sin(this.rotation);
            var tx = point.x;
            var ty = point.y;
            point.x = tx * c - ty * s;
            point.y = tx * s + ty * c;

            // Transform
            point.x += this.x;
            point.y += this.y;
            return point;
        }
    };

    var GetScale = function (a, b) {
        if (a === b) {
            return 1;
        } else {
            return a / b;
        }
    };

    var Position = {
        updateChildPosition(child) {
            if (child.isRexContainerLite) {
                child.syncChildrenEnable = false;
            }
            var localState = GetLocalState(child);
            var parent = localState.parent;

            if (localState.syncPosition) {
                child.x = localState.x;
                child.y = localState.y;
                parent.localToWorld(child);
            }

            if (localState.syncRotation) {
                child.rotation = localState.rotation + parent.rotation;
            }

            if (localState.syncScale) {
                child.scaleX = localState.scaleX * parent.scaleX;
                child.scaleY = localState.scaleY * parent.scaleY;
            }

            if (child.isRexContainerLite) {
                child.syncChildrenEnable = true;
                child.syncPosition();
            }
            return this;
        },

        syncPosition() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildPosition, this);
            }
            return this;
        },

        resetChildPositionState(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            localState.x = child.x;
            localState.y = child.y;
            parent.worldToLocal(localState);

            localState.scaleX = GetScale(child.scaleX, parent.scaleX);
            localState.scaleY = GetScale(child.scaleY, parent.scaleY);

            localState.rotation = child.rotation - parent.rotation;
            return this;
        },

        setChildPosition(child, x, y) {
            child.x = x;
            child.y = y;
            this.resetChildPositionState(child);
            return this;
        },

        setChildLocalPosition(child, x, y) {
            var localState = GetLocalState(child);
            localState.x = x;
            localState.y = y;
            this.updateChildPosition(child);
            return this;
        },

        resetLocalPositionState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildPositionState(this);
            }
            return this;
        },

        getChildLocalX(child) {
            var localState = GetLocalState(child);
            return localState.x;
        },

        getChildLocalY(child) {
            var localState = GetLocalState(child);
            return localState.y;
        },

    };

    const DegToRad = Phaser.Math.DegToRad;

    var Rotation = {
        updateChildRotation(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            if (localState.syncRotation) {
                child.rotation = parent.rotation + localState.rotation;
            }
            return this;
        },

        syncRotation() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildRotation, this);
            }
            return this;
        },

        resetChildRotationState(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            localState.rotation = child.rotation - parent.rotation;
            return this;
        },

        setChildRotation(child, rotation) {
            child.rotation = rotation;
            this.resetChildRotationState(child);
            return this;
        },

        setChildAngle(child, angle) {
            child.angle = angle;
            this.resetChildRotationState(child);
            return this;
        },

        setChildLocalRotation(child, rotation) {
            var localState = GetLocalState(child);
            localState.rotation = rotation;
            this.updateChildRotation(child);
            return this;
        },

        setChildLocalAngle(child, angle) {
            var localState = GetLocalState(child);
            localState.rotation = DegToRad(angle);
            this.updateChildRotation(child);
            return this;
        },

        resetLocalRotationState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildRotationState(this);
            }
            return this;
        },

        getChildLocalRotation(child) {
            var localState = GetLocalState(child);
            return localState.rotation;
        },

    };

    var Scale = {
        updateChildScale(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            if (state.syncScale) {
                child.scaleX = parent.scaleX * state.scaleX;
                child.scaleY = parent.scaleY * state.scaleY;
            }
            return this;
        },

        syncScale() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildScale, this);
            }
            return this;
        },

        resetChildScaleState(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            state.scaleX = GetScale(child.scaleX, parent.scaleX);
            state.scaleY = GetScale(child.scaleY, parent.scaleY);
            return this;
        },

        setChildScale(child, scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }
            child.scaleX = scaleX;
            child.scaleY = scaleY;
            this.resetChildScaleState(child);
            return this;
        },

        setChildLocalScale(child, scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }
            var state = GetLocalState(child);
            state.scaleX = scaleX;
            state.scaleY = scaleY;
            this.updateChildScale(child);
            return this;
        },

        setChildDisplaySize(child, width, height) {
            child.setDisplaySize(width, height);
            this.resetChildScaleState(child);
            return this;
        },

        resetLocalScaleState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildScaleState(this);
            }
            return this;
        },

        getChildLocalScaleX(child) {
            var localState = GetLocalState(child);
            return localState.scaleX;
        },

        getChildLocalScaleY(child) {
            var localState = GetLocalState(child);
            return localState.scaleY;
        },
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
        updateChildVisible(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            var maskVisible = (localState.hasOwnProperty('maskVisible')) ? localState.maskVisible : true;
            var parentVisible = (parent) ? parent.visible : true;
            child.visible = parentVisible && localState.visible && maskVisible;
            return this;
        },

        syncVisible() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildVisible, this);
            }
            return this;
        },

        resetChildVisibleState(child) {
            var localState = GetLocalState(child);
            // Delete maskVisible property
            if (localState.hasOwnProperty('maskVisible')) {
                delete localState.maskVisible;
            }
            localState.visible = child.visible;
            return this;
        },

        setChildVisible(child, visible) {
            // Visible of child will be affect by parent's visible, and mask visible
            this.setChildLocalVisible(child, visible);
            return this;
        },

        // Internal method
        setChildLocalVisible(child, visible) {
            if (visible === undefined) {
                visible = true;
            }
            var localState = GetLocalState(child);
            localState.visible = visible;
            this.updateChildVisible(child);
            return this;
        },

        // Internal method
        setChildMaskVisible(child, visible) {
            if (visible === undefined) {
                visible = true;
            }
            var localState = GetLocalState(child);
            localState.maskVisible = visible;
            this.updateChildVisible(child);
            return this;
        },

        resetLocalVisibleState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildVisibleState(this);
            }
            return this;
        },

        getChildLocalVisible(child) {
            var localState = GetLocalState(child);
            return localState.visible;
        },
    };

    var Alpha = {
        updateChildAlpha(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            if (state.syncAlpha) {
                child.alpha = parent.alpha * state.alpha;
            }
            return this;
        },

        syncAlpha() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildAlpha, this);
            }
            return this;
        },

        resetChildAlphaState(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            state.alpha = GetScale(child.alpha, parent.alpha);
            return this;
        },

        setChildAlpha(child, alpha) {
            child.alpha = alpha;
            this.resetChildAlphaState(child);
            return this;
        },

        setChildLocalAlpha(child, alpha) {
            var state = GetLocalState(child);
            state.alpha = alpha;
            this.updateChildAlpha(child);
            return this;
        },

        resetLocalAlphaState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildAlphaState(this);
            }
            return this;
        },

        getChildLocalAlpha(child) {
            var localState = GetLocalState(child);
            return localState.alpha;
        },
    };

    var Active = {
        updateChildActive(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            child.active = parent.active && localState.active;
            return this;
        },

        syncActive() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildActive, this);
            }
            return this;
        },

        resetChildActiveState(child) {
            var localState = GetLocalState(child);
            localState.active = child.active;
            return this;
        },

        setChildActive(child, active) {
            child.active = active;
            this.resetChildActiveState(child);
            return this;
        },

        setChildLocalActive(child, active) {
            if (active === undefined) {
                active = true;
            }
            var localState = GetLocalState(child);
            localState.active = active;
            this.updateChildActive(child);
            return this;
        },

        resetLocalActiveState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildActiveState(this);
            }
            return this;
        },

        getChildLocalActive(child) {
            var localState = GetLocalState(child);
            return localState.active;
        },
    };

    var ScrollFactor = {
        updateChildScrollFactor(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;

            if (localState.syncScrollFactor) {
                child.scrollFactorX = parent.scrollFactorX;
                child.scrollFactorY = parent.scrollFactorY;
            }

            return this;
        },

        syncScrollFactor() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildScrollFactor, this);
            }
            return this;
        },

    };

    var CameraFilter = {
        updateCameraFilter(child) {
            var state = GetLocalState(child);
            var parent = state.parent;

            if (state.syncCameraFilter) {
                child.cameraFilter = parent.cameraFilter;
            }

            return this;
        },

        syncCameraFilter() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateCameraFilter, this);
            }
            return this;
        },
    };

    var Mask = {
        updateChildMask(child) {
            // Don't propagate null mask to clear children's mask
            if (this.mask == null) {
                return this;
            }

            var maskGameObject = (this.mask.hasOwnProperty('geometryMask')) ? this.mask.geometryMask : this.mask.bitmapMask;
            if (maskGameObject !== child) {
                child.mask = this.mask;
            }
            return this;
        },

        syncMask() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildMask, this);
            }
            return this;
        },

        setMask(mask) {
            this.mask = mask;
            return this;
        },

        clearMask(destroyMask) {
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
        },
    };

    var SortGameObjectsByDepth = function (gameObjects, descending) {
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
            itemList = gameObject.scene.sys.displayList;  // displayList
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

    var FilterDisplayGameObjects = function (gameObjects) {
        return gameObjects.filter(function (gameObject) {
            if (gameObject.displayList) {
                // Inside a scene or a layer
                return true;
            } else if (gameObject.parentContainer) {
                // Inside a container
                return true;
            }
        })
    };

    var Depth = {
        setDepth(value, containerOnly) {
            this.depth = value;
            if (!containerOnly && this.children) {
                var children = this.getAllChildren();
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    children[i].depth = value;
                }
            }
            return this;
        },

        swapDepth(containerB) {
            var depthA = this.depth;
            var depthB = containerB.depth;
            this.setDepth(depthB);
            containerB.setDepth(depthA);
            return this;
        },

        incDepth(inc) {
            this.depth += inc;
            if (this.children) {
                var children = this.getAllChildren();
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    children[i].depth += inc;
                }
            }
            return this;
        },

        bringToTop() {
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

        bringMeToTop() {
            return this.bringToTop();
        },

        sendToBack() {
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

        sendMeToBack() {
            return this.sendToBack();
        },

        moveDepthBelow(gameObject) {
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

        moveMyDepthBelow(gameObject) {
            return this.moveDepthBelow(gameObject);
        },

        moveDepthAbove(gameObject) {
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

        moveMyDepthAbove(gameObject) {
            return this.moveDepthAbove(gameObject);
        },

        bringChildToTop(child) {
            var gameObjects;
            if ((child !== this) && child.isRexContainerLite) {
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
                if (topChild === gameObject) {
                    continue;
                }
                if ((gameObject !== this) && (topChild.displayList !== gameObject.displayList)) {
                    continue;
                }

                topChild.displayList.moveAbove(gameObject, topChild);
                topChild = gameObject;
            }

            return this;
        },

        sendChildToBack(child) {
            var gameObjects;
            if ((child !== this) && child.isRexContainerLite) {
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
                if (bottomChild === gameObject) {
                    continue;
                }
                if ((gameObject !== this) && (bottomChild.displayList !== gameObject.displayList)) {
                    continue;
                }

                bottomChild.displayList.moveBelow(gameObject, bottomChild);
                bottomChild = gameObject;
            }

            return this;
        },
    };

    var DepthFirstSearch = function (root, callback) {
        var skip = callback(root);
        if ((!skip) && root.isRexContainerLite) {
            var children = root.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                DepthFirstSearch(children[i], callback);
            }
        }
    };

    var BreadthFirstSearch = function (root, callback) {
        var queue = [root];
        while (queue.length > 0) {
            var current = queue.shift();
            var skip = callback(current);

            if ((!skip) && current.isRexContainerLite) {
                queue.push(...current.children);
            }
        }
    };

    const ArrayUtils = Phaser.Utils.Array;

    var Children = {
        getChildren(out) {
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

        getAllChildren(out) {
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

        getAllVisibleChildren(out) {
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

        bfs(callback, root) {
            if (root === undefined) {
                root = this;
            }
            BreadthFirstSearch(root, callback);
            return this;
        },

        dfs(callback, root) {
            if (root === undefined) {
                root = this;
            }
            DepthFirstSearch(root, callback);
            return this;
        },

        contains(gameObject) { // Override Base.contains method
            var parent = GetParent(gameObject);
            if (!parent) {
                return false;
            } else if (parent === this) {
                return true;
            } else {
                return this.contains(parent);
            }
        },

        getByName(name, recursive) {
            if (!recursive) {
                return ArrayUtils.GetFirst(this.children, 'name', name); // object, or null if not found

            } else { // recursive
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

        getRandom(startIndex, length) {
            return ArrayUtils.GetRandom(this.children, startIndex, length);
        },

        getFirst(property, value, startIndex, endIndex) {
            return ArrayUtils.GetFirstElement(this.children, property, value, startIndex, endIndex);
        },

        getAll(property, value, startIndex, endIndex) {
            return ArrayUtils.GetAll(this.children, property, value, startIndex, endIndex);
        },

        count(property, value, startIndex, endIndex) {
            return ArrayUtils.CountAllMatching(this.children, property, value, startIndex, endIndex);
        },

        swap(child1, child2) {
            ArrayUtils.Swap(this.children, child1, child2);
            return this;
        },

        setAll(property, value, startIndex, endIndex) {
            ArrayUtils.SetAll(this.children, property, value, startIndex, endIndex);
            return this;
        },
    };

    var GetLocalStates = function (gameObjects) {
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

    var GetScene = function (gameObjects) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var scene = gameObjects[i].scene;
            if (scene) {
                return scene;
            }
        }
        return null;
    };

    var UpdateChild = function (tween, key, target) {
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
        tweenChild(tweenConfig) {
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

        tweenSelf(tweenConfig) {
            tweenConfig.targets = [this];
            return this.tweenChild(tweenConfig);
        },

        createTweenChildConfig(tweenConfig) {
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

        tween(tweenConfig) {
            var scene = this.scene;
            if (!tweenConfig.targets) {
                tweenConfig.targets = this;
            }
            return scene.tweens.add(tweenConfig);
        },
    };

    const ContainerClass = Phaser.GameObjects.Container;

    var IsContainerGameObject = function (gameObject) {
        return (gameObject instanceof ContainerClass);
    };

    const LayerClass = Phaser.GameObjects.Layer;

    var IsLayerGameObject = function (gameObject) {
        return (gameObject instanceof LayerClass);
    };

    var GetValidChildren = function (parent) {
        var children = parent.getAllChildren([parent]);
        children = children.filter(function (gameObject) {
            return !!gameObject.displayList ||   // At scene's displayList or at a layer
                !!gameObject.parentContainer;  // At a container
        });
        return children;
    };

    var AddToContainer = function (p3Container) {
        var gameObjects = GetValidChildren(this);
        // This containerLite parent should be considered.
        if (gameObjects.indexOf(this) === -1) {
            gameObjects.push(this);
        }

        SortGameObjectsByDepth(gameObjects);

        p3Container.add(gameObjects);
    };

    var RemoveFromContainer = function (p3Container, descending, addToScene) {
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
        addToContainer(p3Container) {
            if (!IsContainerGameObject(p3Container)) {
                return this;
            }

            this._setParentContainerFlag = true;
            AddToContainer.call(this, p3Container);
            this._setParentContainerFlag = false;
            return this;
        },

        addToLayer(layer) {
            if (!IsLayerGameObject(layer)) {
                return this;
            }

            AddToContainer.call(this, layer);

            return this;
        },

        removeFromContainer() {
            if (!this.parentContainer) {
                return this;
            }

            this._setParentContainerFlag = true;
            RemoveFromContainer.call(this, this.parentContainer, true, false);
            this._setParentContainerFlag = false;
            return this;
        },

        removeFromLayer(addToScene) {
            if (addToScene === undefined) {
                addToScene = true;
            }

            if (!IsLayerGameObject(this.displayList)) {
                return this;
            }

            RemoveFromContainer.call(this, this.displayList, false, addToScene);

            return this;
        },

        getParentContainer() {
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

        addToParentContainer(gameObject) {
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

        addToPatentLayer(gameObject) {
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
        hasLayer() {
            return !!this.privateRenderLayer;
        },

        enableLayer() {
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

        getLayer() {
            if (!this.hasLayer()) {
                this.enableLayer();
            }

            return this.privateRenderLayer;
        },

        getRenderLayer() {
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
        addToRenderLayer(gameObject) {
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
        removeFromRenderLayer(gameObject) {
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
        },
    };

    const Rectangle$1 = Phaser.Geom.Rectangle;
    const Union = Phaser.Geom.Rectangle.Union;

    var GetBoundsOfGameObjects = function (gameObjects, out) {
        if (out === undefined) {
            out = new Rectangle$1();
        } else if (out === true) {
            if (GlobRect === undefined) {
                GlobRect = new Rectangle$1();
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

            var boundsRect = GetBounds$2(gameObject, true);

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

    const GameObjectClass = Phaser.GameObjects.GameObject;
    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass);
    };

    var GetValue$2 = Phaser.Utils.Objects.GetValue;

    var Snapshot = function (config) {
        if (!config) {
            return;
        }

        var gameObjects = config.gameObjects;
        var renderTexture = config.renderTexture;  // renderTexture, or dynamicTexture
        var saveTexture = config.saveTexture;
        var x = GetValue$2(config, 'x', undefined);
        var y = GetValue$2(config, 'y', undefined);
        var width = GetValue$2(config, 'width', undefined);
        var height = GetValue$2(config, 'height', undefined);
        var originX = GetValue$2(config, 'originX', 0);
        var originY = GetValue$2(config, 'originY', 0);
        var padding = GetValue$2(config, 'padding', 0);

        var scrollX, scrollY;
        if ((width === undefined) || (height === undefined) || (x === undefined) || (y === undefined)) {
            // Union bounds of gameObjects
            var bounds = GetBoundsOfGameObjects(gameObjects, true);
            var isCenterOrigin = (x !== undefined) && (y !== undefined);
            if (isCenterOrigin) {
                width = Math.max((x - bounds.left), (bounds.right - x)) * 2;
                height = Math.max((y - bounds.top), (bounds.bottom - y)) * 2;
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
            scrollX = x + ((0 - originX) * width);
            scrollY = y + ((0 - originY) * height);
        }

        scrollX -= padding;
        scrollY -= padding;
        width += (padding * 2);
        height += (padding * 2);

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

        if ((renderTexture.width !== width) || (renderTexture.height !== height)) {
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
        snapshot(config) {
            // Save scale
            var scaleXSave = this.scaleX;
            var scaleYSave = this.scaleY;
            var scale1 = (scaleXSave === 1) && (scaleYSave === 1);
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

            return (isValidRT) ? rt : this;
        }
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    var DrawBounds$1 = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
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

    var Draw = function (gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding) {
        var canDrawBound = gameObject.getBounds ||
            ((gameObject.width !== undefined) && (gameObject.height !== undefined));
        if (!canDrawBound) {
            return;
        }

        if (strokeColor === undefined) { strokeColor = 0xffffff; }
        if (lineWidth === undefined) { lineWidth = 1; }
        if (fillColor === undefined) { fillColor = null; }    if (fillAlpha === undefined) { fillAlpha = 1; }    if (padding === undefined) { padding = 0; }

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
            graphics
                .fillStyle(fillColor, fillAlpha)
                .fillPoints(Points, true, true);
        }
        if (strokeColor !== null) {
            graphics
                .lineStyle(lineWidth, strokeColor)
                .strokePoints(Points, true, true);
        }

    };

    var Points = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];

    const GetValue = Phaser.Utils.Objects.GetValue;

    var DrawBounds = function (graphics, config) {
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

    const RotateAround = Phaser.Math.RotateAround;

    var ChangeOrigin$1 = function (gameObject, originX, originY) {
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

    var ChangeOrigin = function (originX, originY) {
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
        drawBounds: DrawBounds,
    };

    Object.assign(
        methods,
        Parent,
        AddChild,
        RemoveChild,
        ChildState,
        Transform,
        Position,
        Rotation,
        Scale,
        Visible,
        Alpha,
        Active,
        ScrollFactor,
        CameraFilter,
        Mask,
        Depth,
        Children,
        Tween,
        P3Container,
        RenderLayer,
        RenderTexture,
    );

    class ContainerLite extends Base {
        constructor(scene, x, y, width, height, children) {
            if (Array.isArray(width)) {
                children = width;
                width = undefined;
                height = undefined;
            }
            super(scene, x, y, width, height);
            this.type = 'rexContainerLite';
            this.isRexContainerLite = true;
            this.syncChildrenEnable = true;

            this._active = true;
            this._mask = null;
            this._scrollFactorX = 1;
            this._scrollFactorY = 1;
            this._cameraFilter = 0;
            this.privateRenderLayer = undefined;

            if (children) {
                this.add(children);
            }
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            this.syncChildrenEnable = false; // Don't sync properties changing anymore
            super.destroy(fromScene);

            if (this.privateRenderLayer && this.privateRenderLayer.scene) {
                this.privateRenderLayer.list.length = 0;  // Remove all children without trigger callback
                this.privateRenderLayer.destroy();
            }
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }

        get x() {
            return this._x;
        }

        set x(value) {
            if (this._x === value) {
                return;
            }
            this._x = value;

            this.syncPosition();
        }

        get y() {
            return this._y;
        }

        set y(value) {
            if (this._y === value) {
                return;
            }
            this._y = value;

            this.syncPosition();
        }

        // Override
        get rotation() {
            return super.rotation;
        }

        set rotation(value) {
            if (this.rotation === value) {
                return;
            }
            super.rotation = value;

            this.syncPosition();
        }

        // Override
        get scaleX() {
            return super.scaleX;
        }

        set scaleX(value) {
            if (this.scaleX === value) {
                return;
            }
            super.scaleX = value;

            this.syncPosition();
        }

        // Override
        get scaleY() {
            return super.scaleY;
        }

        set scaleY(value) {
            if (this.scaleY === value) {
                return;
            }
            super.scaleY = value;

            this.syncPosition();
        }

        // Override
        get scale() {
            return super.scale;
        }

        set scale(value) {
            if (this.scale === value) {
                return;
            }
            super.scale = value;

            this.syncPosition();
        }

        // Override
        get visible() {
            return super.visible;
        }

        set visible(value) {
            if (super.visible === value) {
                return;
            }
            super.visible = value;

            this.syncVisible();
        }

        // Override
        get alpha() {
            return super.alpha;
        }

        set alpha(value) {
            if (super.alpha === value) {
                return;
            }
            super.alpha = value;

            this.syncAlpha();
        }

        // Override
        get active() {
            return this._active;
        }

        set active(value) {
            if (this._active === value) {
                return;
            }
            this._active = value;

            this.syncActive();
        }

        // Override
        get mask() {
            return this._mask;
        }
        set mask(mask) {
            if (this._mask === mask) {
                return;
            }
            this._mask = mask;

            this.syncMask();
        }

        // Override
        get scrollFactorX() {
            return this._scrollFactorX;
        }

        set scrollFactorX(value) {
            if (this._scrollFactorX === value) {
                return;
            }

            this._scrollFactorX = value;
            this.syncScrollFactor();
        }
        get scrollFactorY() {
            return this._scrollFactorY;
        }

        set scrollFactorY(value) {
            if (this._scrollFactorY === value) {
                return;
            }

            this._scrollFactorY = value;
            this.syncScrollFactor();
        }

        get cameraFilter() {
            return this._cameraFilter;
        }

        set cameraFilter(value) {
            if (this._cameraFilter === value) {
                return;
            }

            this._cameraFilter = value;
            this.syncCameraFilter();
        }

        // Compatiable with container plugin
        get list() {
            return this.children;
        }

        static GetParent(child) {
            return GetParent(child);
        }

        // For p3-container
        get parentContainer() {
            return this._parentContainer;
        }

        set parentContainer(value) {
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

        get setParentContainerFlag() {
            if (this._setParentContainerFlag) {
                return true;
            }
            var parent = GetParent(this);
            return (parent) ? parent.setParentContainerFlag : false;
        }

    }

    Object.assign(
        ContainerLite.prototype,
        methods
    );

    const SetSizeBase = Phaser.GameObjects.Components.Size.setSize;
    const SetOriginBase$1 = Phaser.GameObjects.Components.Origin.setOrigin;

    var SetSizeFromBounds = function () {
        var bounds = this.getBounds(true);

        SetSizeBase.call(this, bounds.width, bounds.height);

        var originX = (bounds.width === 0) ? 0.5 : (this.x - bounds.left) / bounds.width;
        var originY = (bounds.height === 0) ? 0.5 : (this.y - bounds.top) / bounds.height;
        SetOriginBase$1.call(this, originX, originY);

        this.updateDisplayOrigin();

        var input = this.input;
        if (input) {
            input.hitArea.width = this.width;
            input.hitArea.height = this.height;
        }

        return this;
    };

    var AddChess = function (gameObject, tileX, tileY, tileZ) {
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

        SetSizeFromBounds.call(this);

        return this;
    };

    var RemoveChess = function (gameObject, tileX, tileY, tileZ, destroy) {
        this.board.removeChess(gameObject, tileX, tileY, tileZ, destroy);
        SetSizeFromBounds.call(this);
        return this;
    };

    var RemoveAllChess = function (destroy) {
        this.board.removeAllChess(destroy);
        SetSizeFromBounds.call(this);
        return this;
    };

    var GetAllChess = function (out) {
        return this.board.getAllChess(out);
    };

    var WorldXYToChess = function (x, y, out) {
        var grid = this.grid;
        grid.saveOrigin();
        grid.setOriginPosition(this.x, this.y);
        var tileXY = this.board.worldXYToTileXY(x, y, true);
        var tileX = tileXY.x,
            tileY = tileXY.y;
        grid.restoreOrigin();

        var gameObjects = this.board.tileXYToChessArray(tileX, tileY, out);
        return gameObjects;
    };

    var SetMainBoard = function (mainBoard, tileX, tileY) {
        this.mainBoardRef.set(mainBoard, tileX, tileY);
        if (mainBoard) {
            this.lastMainBoardRef.set(mainBoard, tileX, tileY);
        }
        return this;
    };

    var CanPutOnMainBoard = function (mainBoard, tileX, tileY, chessTileXYMap) {
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

    var targetTileXY = { x: 0, y: 0, z: 0, };

    var PutOnMainBoard = function (mainBoard, tileX, tileY, align) {
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

    var PullOutFromMainBoard = function () {
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

    var PutBack = function () {
        var mainBoard = this.lastMainBoardRef.mainBoard;
        var tileX = this.lastMainBoardRef.tileX;
        var tileY = this.lastMainBoardRef.tileY;
        this.putOnMainBoard(mainBoard, tileX, tileY, false);
        return this;
    };

    var IsOverlapping = function (mainBoard, tileZ) {
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

    var AlignToMainBoard = function (mainBoard, tileX, tileY) {
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

    const RectangleContains = Phaser.Geom.Rectangle.Contains;

    var HitAreaCallback = function (shape, x, y, gameObject) {
        if (!RectangleContains(shape, x, y)) {
            return false;
        }

        return gameObject.isInTouching();
    };

    var RegisterPointerEvents = function () {
        this
            .on('pointerdown', function (pointer, localX, localY, event) {
                FireTileEvent.call(this, pointer, 'gameobjectdown', 'miniboard.pointerdown');
            }, this)
            .on('pointerup', function (pointer, localX, localY, event) {
                FireTileEvent.call(this, pointer, 'gameobjectup', 'miniboard.pointerup');
            }, this)
            .on('pointermove', function (pointer, localX, localY, event) {
                FireTileEvent.call(this, pointer, 'gameobjectmove', 'miniboard.pointermove');
            }, this);
    };

    var FireTileEvent = function (pointer, miniboardEvent, tileEvent) {
        var gameObjects = this.worldXYToChess(pointer.worldX, pointer.worldY, globChessArray$1);
        var gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            gameObject = gameObjects[i];
            if (gameObject.emit) {
                gameObject.emit(tileEvent, pointer);
            }
            this.emit(miniboardEvent, pointer, gameObject);
        }
        globChessArray$1.length = 0;
    };

    var globChessArray$1 = [];

    var RegisterDragEvents = function () {
        this.dragPointer = null;

        this
            .on('dragstart', function (pointer, dragX, dragY) {
                this.dragPointer = pointer;
            }, this)
            .on('dragend', function (pointer, dragX, dragY, dropped) {
                this.dragPointer = null;
            }, this);
    };

    const Rectangle = Phaser.Geom.Rectangle;
    const SetInteractiveBase = Phaser.GameObjects.GameObject.prototype.setInteractive;

    var SetInteractive = function (config) {

        if (config === undefined) {
            config = {};
        }
        config.hitArea = new Rectangle(0, 0, this.width, this.height);
        config.hitAreaCallback = HitAreaCallback;

        SetInteractiveBase.call(this, config);

        RegisterPointerEvents.call(this);
        RegisterDragEvents.call(this);

        return this;
    };

    var SetDraggable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.setInteractive({ draggable: true });
        this.input.draggable = enable;
        return this;
    };

    var DragEnd = function () {
        if (!this.dragPointer) {
            return;
        }
        this.scene.input.setDragState(this.dragPointer, 5);
        return this;
    };

    var IsInTouching = function (pointer) {
        if (!this.visible) {
            return false;
        }

        return PointerTest(this, pointer, MainTest);
    };

    var MainTest = function (miniboard, x, y) {
        miniboard.worldXYToChess(x, y, globChessArray);
        var isHit = (globChessArray.length > 0);
        globChessArray.length = 0;
        return isHit;
    };

    var globChessArray = [];

    var Mirror$1 = function (mode, chessTileXYZMap, out) {
        if (mode === undefined) {
            mode = 1;
        } else if (typeof (mode) === 'string') {
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

    const MODE = {
        x: 1,
        y: 2,
        'x&y': 3
    };

    var CanMirror = function(mode) {
        if (this.mainBoard === null) {
            return true;
        }
        var newTileXYZMap = Mirror$1.call(this, mode);
        return this.canPutOnMainBoard(this.mainBoard, tileX, tileY, newTileXYZMap);
    };

    var ResetChessTileXYZ = function(newTileXYZMap) {
        this.removeAllChess();
        var newTileXYZ;
        for(var uid in newTileXYZMap) {
            newTileXYZ = newTileXYZMap[uid];
            uid = parseInt(uid);
            this.addChess(uid, newTileXYZ.x, newTileXYZ.y, newTileXYZ.z, false);
        }
        return this;
    };

    var Mirror = function (mode) {
        var isOnMainBoard = (this.mainBoard != null);
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

    var Rotate$1 = function (direction, chessTileXYZMap, out) {
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

    var CanRotate = function (direction) {
        if (this.mainBoard === null) {
            return true;
        }
        var newTileXYZMap = Rotate$1.call(this, direction);
        return this.canPutOnMainBoard(this.mainBoard, tileX, tileY, newTileXYZMap);
    };

    var Rotate = function (direction) {
        if (direction === 0) {
            return this;
        }

        var isOnMainBoard = (this.mainBoard != null);
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

    var CanRotateTo = function(direction) {
        direction -= this.face;
        return this.canRotate(direction);
    };

    var RotateTo = function (direction) {
        direction -= this.face;
        this.rotate(direction);
        return this;
    };

    var GetBounds$1 = function (out) {
        var grid = this.grid;
        grid.saveOrigin();
        grid.setOriginPosition(this.x, this.y);

        out = this.board.getBoardBounds(out);

        grid.restoreOrigin();
        return out;
    };

    var Offset = function (tileX, tileY, chessTileXYZMap, out) {
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

    const SetOriginBase = Phaser.GameObjects.Components.Origin.setOrigin;

    var SetOrigin = function (originX, originY) {
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

        SetOriginBase.call(this, originX, originY);

        var bounds = this.getBounds(true);
        var offsetX = -Math.floor(Linear(bounds.left, bounds.right, originX));
        var offsetY = -Math.floor(Linear(bounds.top, bounds.bottom, originY));

        if ((offsetX !== 0) || (offsetY !== 0)) {
            var newTileXYZMap = Offset.call(this, offsetX, offsetY);
            ResetChessTileXYZ.call(this, newTileXYZMap);
            var worldOffsetXY = this.board.tileXYToWorldXY(offsetX, offsetY);
            var world0 = this.board.tileXYToWorldXY(0, 0);
            this.setPosition(
                (this.x + (world0.x - worldOffsetXY.x)),
                (this.y + (world0.y - worldOffsetXY.y))
            );
        }

        return this;
    };

    var Methods = {
        addChess: AddChess,
        removeChess: RemoveChess,
        removeAllChess: RemoveAllChess,
        getAllChess: GetAllChess,
        worldXYToChess: WorldXYToChess,

        pullOutFromMainBoard: PullOutFromMainBoard,
        canPutOnMainBoard: CanPutOnMainBoard,
        putOnMainBoard: PutOnMainBoard,
        putBack: PutBack,
        isOverlapping: IsOverlapping,
        alignToMainBoard: AlignToMainBoard,

        setInteractive: SetInteractive,
        setDraggable: SetDraggable,
        dragEnd: DragEnd,
        isInTouching: IsInTouching,

        setMainBoard: SetMainBoard,
        canMirror: CanMirror,
        mirror: Mirror,
        canRotate: CanRotate,
        rotate: Rotate,
        canRotateTo: CanRotateTo,
        rotateTo: RotateTo,
        getBounds: GetBounds$1,
        setOrigin: SetOrigin
    };

    class MainBoardReference {
        constructor(miniBoard) {
            this.miniBoard = miniBoard;
            this.set(null);
        }
        set(mainBoard, tileX, tileY) {
            if (!mainBoard) {
                mainBoard = null;
                tileX = null;
                tileY = null;
            }
            this.mainBoard = mainBoard;
            this.tileX = tileX;
            this.tileY = tileY;
        }
    }

    class MiniBoard extends ContainerLite {
        constructor(scene, x, y, config) {
            super(scene, x, y, 0, 0);
            this.type = 'rexMiniBoard';
            var boardConfig = {
                isBoard: false,
                grid: GetValue$c(config, 'grid', undefined),
                infinity: true,
                wrap: false
            };
            this.board = new Board$1(scene, boardConfig);
            this.mainBoardRef = new MainBoardReference();
            this.lastMainBoardRef = new MainBoardReference();

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setFace(GetValue$c(o, 'face', 0));
            var dragEnable = GetValue$c(o, 'draggable', undefined);
            if (dragEnable !== undefined) {
                this.setDraggable(dragEnable);
            }
            this.setPutTestCallback(GetValue$c(o, 'putTestCallback', undefined), GetValue$c(o, 'putTestCallbackScpe', undefined));       
            this.lastTransferResult = GetValue$c(o, 'lastTransferResult', undefined);
            return this;
        }

        destroy(fromScene) {
            if (!this.scene) {
                return
            }

            this.clear(!fromScene);
            this.board.shutdown(fromScene);
            this.board = undefined;
            this.setPutTestCallback(undefined, undefined);

            super.destroy(fromScene);
        }

        setFace(direction) {
            this.face = this.board.grid.directionNormalize(direction);
            return this;
        }

        get mainBoard() {
            return this.mainBoardRef.mainBoard;
        }

        get tileX() {
            return this.mainBoardRef.tileX;
        }

        get tileY() {
            return this.mainBoardRef.tileY;
        }

        get grid() {
            return this.board.grid;
        }

        get tileXYZMap() {
            return this.board.boardData.UIDToXYZ; // {uid:{x,y,z}}
        }

        setPutTestCallback(callback, scope) {
            this.putTestCallback = callback;
            this.putTestCallbackScpe = scope;
            return this;
        }
    }

    Object.assign(
        MiniBoard.prototype,
        Methods
    );

    ObjectFactory.register('miniBoard', function (x, y, config) {
        var gameObject = new MiniBoard(this.scene, x, y, config);
        this.scene.add.existing(gameObject);  
        return gameObject;
    });

    SetValue(window, 'RexPlugins.Board.MiniBoard', MiniBoard);

    var GetHexagonMap = function (board, radius, out) {
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

    var GetTriangleMap = function (board, type, height, out) {
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

    var GetParallelogramMap = function (board, type, width, height, out) {
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
            default: // case 0
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
        parallelogram: GetParallelogramMap,
    };

    const Pad = Phaser.Utils.String.Pad;
    var GetStyle = function (style, canvas, context) {
        if (style == null) {
            return style;
        }

        switch (typeof (style)) {
            case 'string': return style;
            case 'number': return `#${Pad(Math.floor(style).toString(16), 6, '0', 1)}`;
            case 'function': return style(canvas, context);
            case 'object':
                if (style.hasOwnProperty('r')) {
                    if (style.hasOwnProperty('a')) {  // rgba
                        return `rgba(${style.r},${style.g},${style.b},${style.a})`;
                    } else {  // rgb
                        return `rgb(${style.r},${style.g},${style.b})`;
                    }
                } else if (style.hasOwnProperty('h')) {
                    if (style.hasOwnProperty('a')) {  // hsla
                        return `hsla(${style.h},${style.s},${style.l},${style.a})`;
                    } else {  // hsl
                        return `hsl(${style.h},${style.s},${style.l})`;
                    }
                } else {
                    return style; // Not a valid input
                }
            default: return style;
        }
    };

    var AddPolygonPath = function (context, points) {
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

    var DrawPolygon = function (
        canvas, context,
        points,
        fillStyle,
        strokeStyle, lineWidth,
        lineJoin
    ) {

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

    var CreatePolygonTexture = function (
        scene,
        key,
        points,
        fillStyle,
        strokeStyle, lineWidth,
        expandSize,
        lineJoin
    ) {

        if ((fillStyle === undefined) && (strokeStyle === undefined)) {
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

        DrawPolygon(
            canvas, context,
            points,
            GetStyle(fillStyle, canvas, context),
            GetStyle(strokeStyle, canvas, context),
            lineWidth,
            lineJoin
        );

        texture.refresh();
    };

    var GetBounds = function (points, out) {
        if (out === undefined) {
            out = {};
        }

        var left = Infinity,
            top = Infinity,
            right = -Infinity,
            bottom = -Infinity;
        for (var i = 0, cnt = points.length; i < cnt; i++) {
            var p = points[i], px = p.x, py = p.y;
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

    var IndentPoints = function (points, bounds, lineWidth) {
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

    var Indent = function (value, halfBound, offset) {
        if (value < halfBound) {
            return (value + offset);
        } else if (value > halfBound) {
            return (value - offset);
        } else {
            return value;
        }
    };

    var OffsetPoints = function (points, x, y) {
        if (y === undefined) {
            y = x;
        }

        if ((x === 0) && (y === 0)) {
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

    var CreateTileTexture = function (board, key, fillStyle, strokeStyle, lineWidth, overlapGrid, lineJoin) {
        if (typeof (overlapGrid) === 'string') {
            lineJoin = overlapGrid;
            overlapGrid = undefined;
        }

        if (overlapGrid === undefined) {
            overlapGrid = true;
        }
        if (lineJoin === undefined) {
            lineJoin = 'miter';
        }

        CreatePolygonTexture(
            board.scene,
            key,
            board.getGridPoints(0, 0, true),
            fillStyle,
            strokeStyle, lineWidth,
            overlapGrid,
            lineJoin
        );
    };

    var CreateBoard = function (tilemap) {
        var board = new Board(tilemap.scene, {
            grid: CreateGridConfig(tilemap),
            width: tilemap.width,
            height: tilemap.height
        });

        return board;
    };

    var CreateGridConfig = function (tilemap) {
        var grid = {
            cellWidth: tilemap.tileWidth,
            cellHeight: tilemap.tileHeight,
        };

        switch (tilemap.orientation) {
            case 0:    // ORTHOGONAL
                grid.gridType = 'quadGrid';
                grid.type = 'orthogonal';
                break;

            case 1:    // ISOMETRIC
                grid.gridType = 'quadGrid';
                grid.type = 'isometric';
                break;

            case 3:    // HEXAGONAL
                grid.gridType = 'hexagonGrid';
                grid.staggeraxis = 'y';
                grid.staggerindex = 'odd';
                break;

            default:   // ORTHOGONAL
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

    var AddLayers = function (board, tilemap, layers) {
        if (layers === undefined) {
            layers = tilemap.layers;
        } else if (!Array.isArray(layers)) {
            layers = [layers];
        }

        for (var i = 0, cnt = layers.length; i < cnt; i++) {
            var layer = layers[i];
            if (typeof (layer) === 'string') {
                layer = tilemap.getLayer(layer);
            }
            if (IsGameObject(layer)) {
                layer = layer.layer;
            }

            AddLayer(board, layer);
        }
    };

    var AddLayer = function (board, layer) {
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

    var CreateBoardFromTilemap = function (tilemap, layers) {
        var board = CreateBoard(tilemap);
        AddLayers(board, tilemap, layers);
        return board;
    };

    class BoardPlugin extends Phaser.Plugins.ScenePlugin {
        constructor(scene, pluginManager) {
            super(scene, pluginManager);

            this.add = new ObjectFactory(scene);

            // Helper functions
            this.hexagonMap = HexagonMap;
            this.createTileTexture = CreateTileTexture;
            this.createBoardFromTilemap = CreateBoardFromTilemap;
        }

        boot() {
            var eventEmitter = this.scene.sys.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        destroy() {
            this.add.destroy();
            super.destroy();
        }
    }

    return BoardPlugin;

}));
