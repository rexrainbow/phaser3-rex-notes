(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgraphplugin = factory());
})(this, (function () { 'use strict';

    class ObjectFactory {
        constructor(scene) {
            this.scene = scene;
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

    var GetEdgeData = function (gameObejct, createIfNotExisted) {
        if (createIfNotExisted === undefined) {
            createIfNotExisted = false;
        }

        // uid or game object
        var uid = this.getObjUID(gameObejct);
        if (createIfNotExisted && !this.edges.hasOwnProperty(uid)) {
            this.edges[uid] = {};
        }
        return this.edges[uid];
    };

    var IsEdge = function (gameObejct) {
        // uid or game object
        var uid = this.getObjUID(gameObejct);
        return this.edges.hasOwnProperty(uid);
    };

    var GetValue$1 = function (source, key, defaultValue) {
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
            this.nextId = GetValue$1(config, 'start', 1); // start index
            this.uidKey = GetValue$1(config, 'uidKey', '$uid');
            this.autoRemove = GetValue$1(config, 'remove', true);
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

    var ObjBank = new Bank({
        uidKey: '$uid',
        remove: false, // remove uid manually
    });

    var EventEmitterMethods = {
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

    const GetValue = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue(config, 'eventEmitter', true));

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
        EventEmitterMethods
    );

    const uidKey$1 = ObjBank.uidKey;

    class GraphItemData extends ComponentBase {
        constructor(parent, uid) {
            super(parent, { eventEmitter: false });

            ObjBank.add(this, uid); // uid is stored in `this.$uid`
            this.graph = null;
            this.type = undefined;
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            if (this.graph) {
                this.graph.remove(this[uidKey$1]);
            }
            ObjBank.remove(this[uidKey$1]);
            this.setGraph(null);

            super.shutdown(fromScene);
        }

        setGraph(graph) {
            this.graph = graph;
            if (!graph) {
                this.setType(undefined);
            }
            return this;
        }

        setType(type) {
            if (typeof (type) === 'string') {
                type = OBJTYPE[type];
            }
            this.type = type;
            return this;
        }

        get isVertex() {
            return ((!!this.graph) && (this.type === 0));
        }

        get isEdge() {
            return ((!!this.graph) && (this.type === 1));
        }
    }

    var methods = {
    };
    Object.assign(
        GraphItemData.prototype,
        methods
    );

    const OBJTYPE = {
        vertex: 0,
        edge: 1,
    };

    var IsUID = function (object) {
        var type = typeof (object);
        return (type === 'number') || (type === 'string');
    };

    var GetGraphItem = function (gameObject) {
        // game object or uid
        if (IsUID(gameObject)) {
            // uid
            return ObjBank.get(gameObject);
        } else {
            // game object
            if (!gameObject.hasOwnProperty('rexGraphItem')) {
                gameObject.rexGraphItem = new GraphItemData(gameObject);
            }
            return gameObject.rexGraphItem;
        }
    };

    const DIRAtoB = 1;
    const DIRBtoA = 2;
    const DIRMODE = {
        '->': DIRAtoB,
        '<-': DIRBtoA,
        '<->': (DIRAtoB | DIRBtoA),
    };

    var AddEdge = function (edgeGO, vAGO, vBGO, dir) {
        if (this.isEdge(edgeGO)) {
            return this;
        }

        if (dir === undefined) {
            dir = 3;
        }

        // Configure edge
        var edgeUid = this.getObjUID(edgeGO);
        var edge = this.getEdgeData(edgeUid, true);
        edge.dir = dir;
        edge.vA = this.getObjUID(vAGO);
        edge.vB = this.getObjUID(vBGO);
        GetGraphItem(edgeGO).setGraph(this);
        this.edgeCount++;

        // Configure vertice
        this.addVertex(vAGO).addVertex(vBGO);
        var vA = this.getVertexData(vAGO, true);
        var vB = this.getVertexData(vBGO, true);
        if (typeof (dir) === 'string') {
            dir = DIRMODE(dir);
        }
        if (dir & DIRAtoB) {
            vA[edgeUid] = edge.vB;
        }
        if (dir & DIRBtoA) {
            vB[edgeUid] = edge.vA;
        }
        return this;
    };

    var RemoveEdge = function (gameObejct, destroy) {
        if (this.isEdge(gameObejct)) {
            return this;
        }

        if (destroy === undefined) {
            destroy = false;
        }

        var uid = this.getObjUID(gameObejct);
        // Remove edge
        delete this.edges[uid];
        this.edgeCount--;
        // Clear reference of graph
        GetGraphItem(gameObejct).setGraph(null);
        if (destroy && gameObejct.destroy) {
            gameObject.destroy();
        }
        return this;
    };

    var UidToObj = function (uid) {
        if (uid == null) {
            return null;
        } else {
            return ObjBank.get(uid).parent;
        }
    };

    var GetAllEdges = function (out) {
        if (out === undefined) {
            out = [];
        }

        var edgeGO;
        for (var edgeUid in this.edges) {
            edgeGO = UidToObj(edgeUid);
            if (edgeGO) {
                out.push(edgeGO);
            }
        }
        return out;
    };

    var GetEdgesOfVertex = function (vertexGameObject, out) {
        if (out === undefined) {
            out = [];
        }

        var vertex = this.getVertexData(vertexGameObject);
        if (!vertex) {
            return out;
        }

        var edgeGO;
        for (var edgeUid in vertex) {
            edgeGO = UidToObj(edgeUid);
            if (edgeGO) {
                out.push(edgeGO);
            }
        }
        return out;
    };

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
    var DistanceBetween = function (x1, y1, x2, y2)
    {
        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    };

    var GetEdgeLength = function (gameObejct) {
        var edge = this.getEdgeData(gameObejct);
        if (!edge) {
            return 0;
        }
        var vAGO = UidToObj(edge.vA);
        var vBGO = UidToObj(edge.vB);
        if ((!vAGO) || (!vBGO)) {
            return 0;
        }

        return DistanceBetween(vAGO.x, vAGO.y, vBGO.x, vBGO.y);
    };

    var IsInLoop = function (vertexGO) {
        if (!this.isVertex(vertexGO)) {
            return false;
        }

        var startVUid = this.getObjUID(vertexGO);
        var queue = [[startVUid, null]];
        var node, curVUid, edgeUID, edges, nextVUid;
        var addedEdgesUid = {};
        while (queue.length > 0) {
            node = queue.pop();
            curVUid = node[0];
            edgeUID = node[1];
            if ((curVUid === startVUid) && (edgeUID !== null)) {
                return true;
            }

            if (edgeUID !== null) {
                addedEdgesUid[edgeUID] = true;
            }
            edges = this.getVertexData(curVUid);
            for (edgeUID in edges) {
                if (addedEdgesUid.hasOwnProperty(edgeUID)) {
                    continue;
                }

                nextVUid = edges[edgeUID];
                queue.push([nextVUid, edgeUID]);
            }
        }
        return false;
    };

    var GetVertexData = function (gameObejct, createIfNotExisted) {
        if (createIfNotExisted === undefined) {
            createIfNotExisted = false;
        }

        // uid or game object
        var uid = this.getObjUID(gameObejct);
        if (createIfNotExisted && !this.vertices.hasOwnProperty(uid)) {
            this.vertices[uid] = {};
        }
        return this.vertices[uid];
    };

    var IsVertex = function (gameObejct) {
        // uid or game object
        var uid = this.getObjUID(gameObejct);
        return this.vertices.hasOwnProperty(uid);
    };

    var AddVertex = function (gameObejct) {
        if (this.isVertex(gameObejct)) {
            return this;
        }

        this.getVertexData(gameObejct, true);
        GetGraphItem(gameObejct).setGraph(this);
        this.vertexCount++;
        return this;
    };

    var AddVertices = function (gameObjects) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.addVertex(gameObjects[i]);
        }
        return this;
    };

    var RemoveVertex = function (gameObejct, destroy, removeEdge) {
        if (!this.isVertex(gameObejct)) {
            return this;
        }
        
        if (destroy === undefined) {
            destroy = false;
        }
        if (removeEdge === undefined) {
            removeEdge = true;
        }

        var uid = this.getObjUID(gameObejct);
        // Remove connected edges
        if (removeEdge) {
            var vertex = this.getVertexData(uid);
            for (var edgeUid in vertex) {
                this.removeEdge(edgeUid, destroy);
            }
        }
        // Remove vertex
        delete this.vertices[uid];
        this.vertexCount--;
        // Clear reference of graph
        GetGraphItem(gameObejct).setGraph(null);
        if (destroy && gameObejct.destroy) {
            gameObject.destroy();
        }

        return this;
    };

    var RemoveAllVertices = function (destroy) {
        for (var vertexUid in this.vertices) {
            this.removeVertex(vertexUid, destroy);
        }
        return this;
    };

    var GetAllVertices = function (out) {
        if (out === undefined) {
            out = [];
        }

        var vGO;
        for (var vUid in this.vertices) {
            vGO = UidToObj(vUid);
            if (vGO) {
                out.push(vGO);
            }
        }
        return out;
    };

    var GetVerticesOfEdge = function (edgeGameObject, out) {
        if (out === undefined) {
            out = [];
        }

        // uid or game object
        var edge = this.getEdgeData(edgeGameObject);
        if (!edge) {
            return out;
        }

        var vGO;
        vGO = UidToObj(edge.vA);
        if (vGO) {
            out.push(vGO);
        }
        vGO = UidToObj(edge.vB);
        if (vGO) {
            out.push(vGO);
        }
        return out;
    };

    var GetOppositeVertex = function (vertexGameObject, edgeGameObject) {
        // uid or game object
        var vertex = this.getVertexData(vertexGameObject);
        if (!vertex) {
            return undefined;
        }

        var edgeUid = this.getObjUID(edgeGameObject);
        if (!edgeUid) {
            return undefined;
        }

        return UidToObj(vertex[edgeUid]);
    };

    var GetAllConnectedVertices = function (vertexGO, out, travelMode) {
        if (out === undefined) {
            out = [];
        }
        if (typeof (travelMode) === 'string') {
            travelMode = TRAVELMODE[travelMode];
        }
        if (travelMode === undefined) {
            travelMode = 0;
        }

        if (!this.isVertex(vertexGO)) {
            return out;
        }

        var startVUid = this.getObjUID(vertexGO);
        var isBFS = (travelMode === 0);
        var queue = [startVUid];
        var curVUid, edges, nextVUid;
        var addedVerticesUid = {};
        while (queue.length > 0) {
            curVUid = (isBFS) ? queue.shift() : queue.pop();
            // Already added
            if (addedVerticesUid.hasOwnProperty(curVUid)) {
                continue;
            }

            addedVerticesUid[curVUid] = true;
            if (curVUid !== startVUid) {
                out.push(UidToObj(curVUid)); // Add vertex into out
            }

            // Add new neighbors into queue
            edges = this.getVertexData(curVUid);
            for (var edgeUid in edges) {
                nextVUid = this.getOppositeVertex(curVUid, edgeUid);
                if (!addedVerticesUid.hasOwnProperty(nextVUid)) {
                    queue.push(nextVUid);
                }
            }
        }

        return out;
    };

    const TRAVELMODE = {
        'breadth-first': 0,
        'bfs': 0,
        'depth-first': 1,
        'dfs': 1,
    };

    var GetNeighborVertices = function (vAGO, out) {
        if (out === undefined) {
            out = [];
        }

        var vertex = this.getVertexData(vAGO),
            vBGO;
        if (vertex) {
            for (var edgeUid in vertex) {
                vBGO = UidToObj(vertex[edgeUid]);
                if (vBGO) {
                    out.push(vBGO);
                }
            }
        }
        return out;
    };

    var AreNeighborVertices = function (vertexGOA, vertexGOB) {
        var vUidA = this.getObjUID(vertexGOA),
            vUidB = this.getObjUID(vertexGOB);
        if ((vUidA != null) && (vUidB != null)) {
            var vertexA = this.getVertexData(vertexGOA);
            vUidB = parseInt(vUidB);
            for (var edgeUid in vertexA) {
                if (vertexA[edgeUid] === vUidB) {
                    return true;
                }
            }
        }
        return false;
    };

    var Methods = {
        getEdgeData: GetEdgeData,
        isEdge: IsEdge,
        addEdge: AddEdge,
        removeEdge: RemoveEdge,
        getAllEdges: GetAllEdges,
        getEdgesOfVertex: GetEdgesOfVertex,
        getEdgeLength: GetEdgeLength,
        isInLoop: IsInLoop,

        getVertexData: GetVertexData,
        isVertex: IsVertex,
        addVertex: AddVertex,
        addVertices: AddVertices,
        removeVertex: RemoveVertex,
        removeAllVertices: RemoveAllVertices,
        getAllVertices: GetAllVertices,
        getVerticesOfEdge: GetVerticesOfEdge,
        getOppositeVertex: GetOppositeVertex,
        getAllConnectedVertices: GetAllConnectedVertices,

        getNeighborVertices: GetNeighborVertices,
        areNeighborVertices: AreNeighborVertices,
    };

    const uidKey = ObjBank.uidKey;
    var GetObjUID = function (gameObject) {
        // Game object or uid
        var uid;
        if (IsUID(gameObject)) {
            uid = gameObject;
        } else {
            uid = GetGraphItem(gameObject)[uidKey];
        }
        return uid;
    };

    class Graph extends EventEmitter {
        constructor(scene) {
            // scene: scene instance, or undefined
            super();

            this.isShutdown = false;
            this.scene = scene;
            this.vertices = {}; // {vertex: {edge:vertexUidB, ...} }
            this.edges = {}; // {edge: {vA:vertex, vB:vertex, dir:1,2,3} }
            this.vertexCount = 0;
            this.edgeCount = 0;

            this.boot();
        }

        boot() {
            if (this.scene) {
                this.scene.sys.events.once('shutdown', this.destroy, this);
            }
        }

        shutdown(fromScene) {
            if (this.isShutdown) {
                return;
            }

            if (this.scene) {
                this.scene.sys.events.off('shutdown', this.destroy, this);
            }

            this.clear();
            super.shutdown();

            this.scene = undefined;
            this.vertices = undefined;
            this.edges = undefined;
            this.vertexCount = 0;
            this.edgeCount = 0;
            this.isShutdown = true;
            return this;
        }

        destroy(fromScene) {
            if (this.isShutdown) {
                return;
            }

            this.emit('destroy');
            this.shutdown(fromScene);
        }

        exists(gameObject) {
            return this.isEdge(gameObject) || this.isVertex(gameObject);
        }

        remove(gameObject) {
            if (this.isEdge(gameObject)) {
                this.removeEdge(gameObject);
            } else if (this.isVertex(gameObject)) {
                this.removeVertex(gameObject);
            }
            return this;
        }

        clear(destroy) {
            if (destroy === undefined) {
                destroy = true;
            }
            this.removeAllVertices(destroy);
            return this;
        }

        getObjUID(gameObject) {
            return GetObjUID(gameObject);
        }
    }

    Object.assign(
        Graph.prototype,
        Methods
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

    ObjectFactory.register('graph', function (config) {
        return new Graph(this.scene, config);
    });

    SetValue(window, 'RexPlugins.Graph.Graph', Graph);

    class GraphPlugin extends Phaser.Plugins.ScenePlugin {
        constructor(scene, pluginManager) {
            super(scene, pluginManager);

            this.add = new ObjectFactory(scene);
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

    return GraphPlugin;

}));
