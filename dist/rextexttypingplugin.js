(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextexttypingplugin = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
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
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
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
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
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
  var DefaultEventEmitter = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = DefaultEventEmitter;
      }
      this._privateEE = eventEmitter === true || eventEmitter === undefined;
      this._eventEmitter = this._privateEE ? new EventEmitterClass() : eventEmitter;
      return this;
    },
    destroyEventEmitter: function destroyEventEmitter() {
      if (this._eventEmitter && this._privateEE) {
        this._eventEmitter.removeAllListeners();
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

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$1(config, 'eventEmitter', true));

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
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var TextKlass = Phaser.GameObjects.Text;
  var IsTextGameObject = function IsTextGameObject(gameObject) {
    return gameObject instanceof TextKlass;
  };

  var BitmapTextKlass = Phaser.GameObjects.BitmapText;
  var IsBitmapTextGameObject = function IsBitmapTextGameObject(gameObject) {
    return gameObject instanceof BitmapTextKlass;
  };

  var TextType = 0;
  var TagTextType = 1;
  var BitmapTextType = 2;
  var GetTextObjectType = function GetTextObjectType(textObject) {
    var textObjectType;
    if (IsBitmapTextGameObject(textObject)) {
      textObjectType = BitmapTextType;
    } else if (IsTextGameObject(textObject)) {
      textObjectType = TextType;
    } else {
      textObjectType = TagTextType;
    }
    return textObjectType;
  };

  var GetWrapText = function GetWrapText(textObject, text) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
      case TextType:
        textObject.style.syncFont(textObject.canvas, textObject.context);
        text = textObject.runWordWrap(text);
        break;
      case TagTextType:
        text = textObject.getText(text, undefined, undefined, true);
        break;
      case BitmapTextType:
        text = textObject.setText(text).getTextBounds().wrappedText;
        break;
    }
    return text;
  };

  var SetNoWrapText = function SetNoWrapText(textObject, text) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
      case TextType:
        // Store wrap properties
        var style = textObject.style;
        var wordWrapWidth = style.wordWrapWidth;
        var wordWrapCallback = style.wordWrapCallback;
        // Disable wrap
        style.wordWrapWidth = 0;
        style.wordWrapCallback = undefined;
        // Set text
        textObject.setText(text);
        // Restore wrap
        style.wordWrapWidth = wordWrapWidth;
        style.wordWrapCallback = wordWrapCallback;
        break;
      case TagTextType:
        // Store wrap properties
        var style = textObject.style;
        var wrapMode = style.wrapMode;
        // Disable wrap
        style.wrapMode = 0;
        // Set text
        textObject.setText(text);
        // Restore wrap
        style.wrapMode = wrapMode;
        break;
      case BitmapTextType:
        // Store wrap properties
        var maxWidth = textObject._maxWidth;
        // Disable wrap
        textObject._maxWidth = 0;
        // Set text
        textObject.setText(text);
        // Restore wrap
        textObject._maxWidth = maxWidth;
        break;
    }
  };

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var TextTyping = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TextTyping, _ComponentBase);
    var _super = _createSuper(TextTyping);
    function TextTyping(gameObject, config) {
      var _this;
      _classCallCheck(this, TextTyping);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;

      _this.timer = null;
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(TextTyping, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setTextWrapEnable(GetValue(o, 'wrap', false));
        this.setTypeMode(GetValue(o, 'typeMode', 0));
        this.setTypingSpeed(GetValue(o, 'speed', 333));
        this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
        this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);
        this.setTypingContent(GetFastValue(o, 'text', ''));
        this.typingIdx = GetFastValue(o, 'typingIdx', 0);
        this.insertIdx = null;
        this.insertChar = null;
        var elapsed = GetFastValue(o, 'elapsed', null);
        if (elapsed !== null) {
          this.start(undefined, undefined, this.typingIdx, elapsed);
        }
        return this;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.freeTimer();
        _get(_getPrototypeOf(TextTyping.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTypeMode",
      value: function setTypeMode(m) {
        if (typeof m === 'string') {
          m = TYPEMODE[m];
        }
        this.typeMode = m;
        return this;
      }
    }, {
      key: "setTypeSpeed",
      value: function setTypeSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "setTypingSpeed",
      value: function setTypingSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "setTextWrapEnable",
      value: function setTextWrapEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.textWrapEnable = enable;
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        var text = TransferText(value);
        if (this.textWrapEnable) {
          text = GetWrapText(this.parent, text);
        }
        this._text = text;
      }
    }, {
      key: "isTyping",
      get: function get() {
        return this.getTimer() !== null;
      }
    }, {
      key: "isLastChar",
      get: function get() {
        return this.typingIdx === this.textLen;
      }
    }, {
      key: "start",
      value: function start(text, speed, startIdx, timerStartAt) {
        if (text !== undefined) {
          this.setTypingContent(text);
        }
        if (speed !== undefined) {
          this.speed = speed;
        }
        if (startIdx === undefined) {
          startIdx = 0;
        }
        this.typingIdx = startIdx + 1;
        if (this.speed === 0) {
          this.stop(true);
        } else {
          this.setText('');
          this.startTimer(timerStartAt);
        }
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(text) {
        var newText = this.text.concat(TransferText(text));
        if (this.isTyping) {
          this.setTypingContent(newText);
        } else {
          this.start(newText, undefined, this.textLen);
        }
        return this;
      }
    }, {
      key: "stop",
      value: function stop(showAllText) {
        var timer = this.getTimer();
        if (timer) {
          this.freeTimer();
        }
        if (showAllText) {
          // Fire 'type' event for remainder characters until lastChar
          while (!this.isLastChar) {
            this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);
            this.emit('typechar', this.insertChar);
            this.typingIdx++;
          }
          // Display all characters on text game object
          this.setText(this.text);
          this.emit('type');
          this.emit('complete', this, this.parent);
        }
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        var timer = this.getTimer();
        if (timer) {
          timer.paused = true;
        }
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        var timer = this.getTimer();
        if (timer) {
          timer.paused = false;
        }
        return this;
      }
    }, {
      key: "setTypingContent",
      value: function setTypingContent(text) {
        this.text = text;
        this.textLen = this.getTextLength(this.text);
        return this;
      }
    }, {
      key: "onTyping",
      value: function onTyping() {
        var newText = this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);
        this.setText(newText);
        this.emit('typechar', this.insertChar);
        this.emit('type');
        if (this.isLastChar) {
          this.freeTimer();
          this.emit('complete', this, this.parent);
        } else {
          this.timer.delay = this.speed; // delay of next typing            
          this.typingIdx++;
        }
      }
    }, {
      key: "getTypingString",
      value: function getTypingString(text, typeIdx, textLen, typeMode) {
        var result;
        if (typeMode === 0) {
          //left-to-right
          var startIdx = 0;
          var endIdx = typeIdx;
          this.insertIdx = endIdx;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 1) {
          //right-to-left
          var endIdx = textLen;
          var startIdx = endIdx - typeIdx;
          this.insertIdx = 0;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 2) {
          //middle-to-sides
          var midIdx = textLen / 2;
          var startIdx = Math.floor(midIdx - typeIdx / 2);
          var endIdx = startIdx + typeIdx;
          this.insertIdx = typeIdx % 2 ? typeIdx : 0;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 3) {
          //sides-to-middle
          var lowerLen = Math.floor(typeIdx / 2);
          var lowerResult;
          if (lowerLen > 0) {
            var endIdx = textLen;
            var startIdx = endIdx - lowerLen;
            lowerResult = this.getSubString(text, startIdx, endIdx);
          } else {
            lowerResult = "";
          }
          var upperLen = typeIdx - lowerLen;
          var upperResult;
          if (upperLen > 0) {
            var startIdx = 0;
            var endIdx = startIdx + upperLen;
            this.insertIdx = endIdx;
            upperResult = this.getSubString(text, startIdx, endIdx);
          } else {
            upperResult = "";
            this.insertIdx = 0;
          }
          result = upperResult + lowerResult;
        }
        this.insertChar = result.charAt(this.insertIdx - 1);
        return result;
      }
    }, {
      key: "startTimer",
      value: function startTimer(timerStartAt) {
        if (this.timer) {
          this.freeTimer();
        }
        var startAt;
        if (timerStartAt === undefined) {
          startAt = 0;
        } else {
          this.speed;
          startAt = timerStartAt;
        }
        this.timer = this.scene.time.addEvent({
          delay: 0.0001,
          startAt: startAt,
          loop: true,
          callback: this.onTyping,
          callbackScope: this
        });
        // Note: Throw error message if delay is 0 with repeat/loop

        return this;
      }
    }, {
      key: "getTimer",
      value: function getTimer() {
        return this.timer;
      }
    }, {
      key: "freeTimer",
      value: function freeTimer() {
        if (this.timer) {
          this.timer.remove();
          this.timer = null;
        }
        return this;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        if (this.setTextCallback) {
          if (this.setTextCallbackScope) {
            text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIdx);
          } else {
            text = this.setTextCallback(text, this.isLastChar, this.insertIdx);
          }
        }
        if (this.textWrapEnable) {
          SetNoWrapText(this.parent, text);
        } else {
          this.parent.setText(text);
        }
      }
    }, {
      key: "getTextLength",
      value: function getTextLength(text) {
        var gameObject = this.parent;
        var len;
        if (gameObject.getPlainText) {
          len = gameObject.getPlainText(text).length;
        } else {
          len = text.length;
        }
        return len;
      }
    }, {
      key: "getSubString",
      value: function getSubString(text, startIdx, endIdx) {
        var gameObject = this.parent;
        var result;
        if (gameObject.getSubString) {
          result = gameObject.getSubString(text, startIdx, endIdx);
        } else {
          result = text.slice(startIdx, endIdx);
        }
        return result;
      }
    }]);
    return TextTyping;
  }(ComponentBase);
  var TransferText = function TransferText(text) {
    if (Array.isArray(text)) {
      text = text.join('\n');
    } else if (typeof text === 'number') {
      text = text.toString();
    }
    return text;
  };
  var TYPEMODE = {
    'left-to-right': 0,
    'right-to-left': 1,
    'middle-to-sides': 2,
    'sides-to-middle': 3
  };

  var TextTypingPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TextTypingPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(TextTypingPlugin);
    function TextTypingPlugin(pluginManager) {
      _classCallCheck(this, TextTypingPlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(TextTypingPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new TextTyping(gameObject, config);
      }
    }]);
    return TextTypingPlugin;
  }(Phaser.Plugins.BasePlugin);

  return TextTypingPlugin;

}));
