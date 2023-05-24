(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexmarkedeventsheetsplugin = factory());
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var f = n.default;
  	if (typeof f == "function") {
  		var a = function a () {
  			if (this instanceof a) {
  				var args = [null];
  				args.push.apply(args, arguments);
  				var Ctor = Function.bind.apply(f, args);
  				return new Ctor();
  			}
  			return f.apply(this, arguments);
  		};
  		a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
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
  var EventEmitter$2 = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

  var IDLE$1 = 0;
  var SUCCESS$1 = 1;
  var FAILURE = 2;
  var RUNNING$1 = 3;
  var PENDING = 4;
  var ABORT = 5;
  var ERROR$1 = 9;
  var TREE = 'tree';
  var COMPOSITE = 'composite';
  var DECORATOR = 'decorator';
  var ACTION = 'action';
  var SERVICE = 'service';
  var TREE_STATE = '$state';
  var CURRENT_TIME = '$currentTime';

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2020 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */

  /**
   * Creates and returns an RFC4122 version 4 compliant UUID.
   * 
   * The string is in the form: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` where each `x` is replaced with a random
   * hexadecimal digit from 0 to f, and `y` is replaced with a random hexadecimal digit from 8 to b.
   *
   * @function Phaser.Utils.String.UUID
   * @since 3.12.0
   *
   * @return {string} The UUID string.
   */
  var HasBuiltRandomUUID = window.crypto && window.crypto.randomUUID;
  var UUID = function UUID() {
    if (HasBuiltRandomUUID) {
      return window.crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  var sn = null;
  var snPrefix = '#';
  var SetSerialNumber = function SetSerialNumber(value) {
    if (value === undefined) {
      value = null;
    }
    sn = value;
  };
  var SetSerialNumberPrefix = function SetSerialNumberPrefix(prefix) {
    snPrefix = prefix;
  };
  var GetSerialNumber = function GetSerialNumber() {
    return sn;
  };
  var CreateID = function CreateID() {
    if (sn === null) {
      return UUID();
    }
    sn += 1;
    return "".concat(snPrefix).concat(sn);
  };

  var BreadthFirstSearch = function BreadthFirstSearch(root, callback, scope) {
    var queue = [root];
    while (queue.length > 0) {
      var current = queue.shift();
      var skip = callback.call(scope, current);
      if (skip) {
        continue;
      }
      switch (current.category) {
        case COMPOSITE:
          queue.push.apply(queue, _toConsumableArray(current.children));
          var services = current.services;
          if (services) {
            queue.push.apply(queue, _toConsumableArray(services));
          }
          break;
        case DECORATOR:
          queue.push(current.child);
          break;
        case ACTION:
          var services = current.services;
          if (services) {
            queue.push.apply(queue, _toConsumableArray(services));
          }
          break;
      }
    }
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

  var DeepClone = function DeepClone(inObject) {
    var outObject;
    var value;
    var key;
    if (inObject == null || _typeof(inObject) !== 'object') {
      //  inObject is not an object
      return inObject;
    }

    //  Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
    if (IsPlainObject(inObject)) {
      for (key in inObject) {
        value = inObject[key];

        //  Recursively (deep) copy for nested objects, including arrays
        outObject[key] = DeepClone(value);
      }
    } else {
      outObject = inObject;
    }
    return outObject;
  };

  var Dump = function Dump() {
    var data = {
      sn: GetSerialNumber(),
      id: this.id,
      title: this.title,
      description: this.description,
      root: this.root ? this.root.id : null,
      properties: DeepClone(this.properties),
      nodes: []
    };
    if (!this.root) {
      return data;
    }
    var nodes = [];
    BreadthFirstSearch(this.root, function (child) {
      nodes.push(child);
    });
    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
      var node = nodes[i];
      var spec = {
        id: node.id,
        name: node.name,
        title: node.title,
        description: node.description,
        properties: DeepClone(node.properties)
      };
      switch (node.category) {
        case COMPOSITE:
          spec.children = node.children.map(function (child) {
            return child.id;
          });
          if (node.services) {
            spec.services = node.services.map(function (child) {
              return child.id;
            });
          }
          break;
        case DECORATOR:
          if (node.child) {
            spec.child = node.child.id;
          }
          break;
        case ACTION:
          if (node.services) {
            spec.services = node.services.map(function (child) {
              return child.id;
            });
          }
          break;
      }
      data.nodes.push(spec);
    }
    return data;
  };

  var BaseExpression = /*#__PURE__*/function () {
    function BaseExpression() {
      _classCallCheck(this, BaseExpression);
    }
    _createClass(BaseExpression, [{
      key: "setExpressionHandler",
      value: function setExpressionHandler(callback) {
        this.expressionHandler = callback;
        return this;
      }
    }, {
      key: "eval",
      value: function _eval(context) {
        return this.expressionHandler(context);
      }
    }]);
    return BaseExpression;
  }();

  var global$1 = (typeof global !== "undefined" ? global :
              typeof self !== "undefined" ? self :
              typeof window !== "undefined" ? window : {});

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global$1.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
  }
  if (typeof global$1.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  var title = 'browser';
  var platform = 'browser';
  var browser = true;
  var env = {};
  var argv = [];
  var version = ''; // empty string to avoid regexp issues
  var versions = {};
  var release = {};
  var config = {};

  function noop() {}

  var on = noop;
  var addListener = noop;
  var once = noop;
  var off = noop;
  var removeListener = noop;
  var removeAllListeners = noop;
  var emit = noop;

  function binding(name) {
      throw new Error('process.binding is not supported');
  }

  function cwd () { return '/' }
  function chdir (dir) {
      throw new Error('process.chdir is not supported');
  }function umask() { return 0; }

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp){
    var clocktime = performanceNow.call(performance)*1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor((clocktime%1)*1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds<0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds,nanoseconds]
  }

  var startTime = new Date();
  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var process = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
  };

  function commonjsRequire(path) {
  	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }

  var parser$2 = {};

  var empty = {};

  var empty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: empty
  });

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(empty$1);

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..');
      }
    }

    return parts;
  }

  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1);
  };

  // path.resolve([from ...], to)
  // posix version
  function resolve() {
    var resolvedPath = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? arguments[i] : '/';

      // Skip empty and invalid entries
      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
      return !!p;
    }), !resolvedAbsolute).join('/');

    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
  }
  // path.normalize(path)
  // posix version
  function normalize(path) {
    var isPathAbsolute = isAbsolute(path),
        trailingSlash = substr(path, -1) === '/';

    // Normalize the path
    path = normalizeArray(filter(path.split('/'), function(p) {
      return !!p;
    }), !isPathAbsolute).join('/');

    if (!path && !isPathAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }

    return (isPathAbsolute ? '/' : '') + path;
  }
  // posix version
  function isAbsolute(path) {
    return path.charAt(0) === '/';
  }

  // posix version
  function join() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return normalize(filter(paths, function(p, index) {
      if (typeof p !== 'string') {
        throw new TypeError('Arguments to path.join must be strings');
      }
      return p;
    }).join('/'));
  }


  // path.relative(from, to)
  // posix version
  function relative(from, to) {
    from = resolve(from).substr(1);
    to = resolve(to).substr(1);

    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
  }

  var sep = '/';
  var delimiter = ':';

  function dirname(path) {
    var result = splitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  }

  function basename(path, ext) {
    var f = splitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }
    return f;
  }


  function extname(path) {
    return splitPath(path)[3];
  }
  var path = {
    extname: extname,
    basename: basename,
    dirname: dirname,
    sep: sep,
    delimiter: delimiter,
    relative: relative,
    join: join,
    isAbsolute: isAbsolute,
    normalize: normalize,
    resolve: resolve
  };
  function filter (xs, f) {
      if (xs.filter) return xs.filter(f);
      var res = [];
      for (var i = 0; i < xs.length; i++) {
          if (f(xs[i], i, xs)) res.push(xs[i]);
      }
      return res;
  }

  // String.prototype.substr - negative index don't work in IE8
  var substr = 'ab'.substr(-1) === 'b' ?
      function (str, start, len) { return str.substr(start, len) } :
      function (str, start, len) {
          if (start < 0) start = str.length + start;
          return str.substr(start, len);
      }
  ;

  var path$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    basename: basename,
    default: path,
    delimiter: delimiter,
    dirname: dirname,
    extname: extname,
    isAbsolute: isAbsolute,
    join: join,
    normalize: normalize,
    relative: relative,
    resolve: resolve,
    sep: sep
  });

  var require$$1 = /*@__PURE__*/getAugmentedNamespace(path$1);

  (function (exports) {
    /*
      Returns a Parser object of the following structure:
    	  Parser: {
        yy: {}
      }
    	  Parser.prototype: {
        yy: {},
        trace: function(),
        symbols_: {associative list: name ==> number},
        terminals_: {associative list: number ==> name},
        productions_: [...],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
        table: [...],
        defaultActions: {...},
        parseError: function(str, hash),
        parse: function(input),
    	    lexer: {
            EOF: 1,
            parseError: function(str, hash),
            setInput: function(input),
            input: function(),
            unput: function(str),
            more: function(),
            less: function(n),
            pastInput: function(),
            upcomingInput: function(),
            showPosition: function(),
            test_match: function(regex_match_array, rule_index),
            next: function(),
            lex: function(),
            begin: function(condition),
            popState: function(),
            _currentRules: function(),
            topState: function(),
            pushState: function(condition),
    	        options: {
                ranges: boolean           (optional: true ==> token location info will include a .range[] member)
                flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
                backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
            },
    	        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
            rules: [...],
            conditions: {associative list: name ==> set},
        }
      }
    
      token location info (@$, _$, etc.): {
        first_line: n,
        last_line: n,
        first_column: n,
        last_column: n,
        range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
      }
    
      the parseError function receives a 'hash' object with these members for lexer and parser errors: {
        text:        (matched text)
        token:       (the produced terminal token, if any)
        line:        (yylineno)
      }
      while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
        loc:         (yylloc)
        expected:    (string describing the set of expected tokens)
        recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
      }
    */
    var parser = function () {
      var o = function o(k, v, _o, l) {
          for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v);
          return _o;
        },
        $V0 = [1, 11],
        $V1 = [1, 3],
        $V2 = [1, 4],
        $V3 = [1, 5],
        $V4 = [1, 6],
        $V5 = [1, 8],
        $V6 = [1, 9],
        $V7 = [1, 10],
        $V8 = [1, 13],
        $V9 = [1, 14],
        $Va = [1, 15],
        $Vb = [1, 16],
        $Vc = [1, 17],
        $Vd = [1, 18],
        $Ve = [1, 19],
        $Vf = [1, 20],
        $Vg = [1, 21],
        $Vh = [1, 22],
        $Vi = [1, 23],
        $Vj = [1, 24],
        $Vk = [1, 25],
        $Vl = [1, 26],
        $Vm = [5, 7, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 30],
        $Vn = [5, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30],
        $Vo = [5, 7, 12, 13, 14, 19, 20, 21, 22, 23, 24, 25, 26, 28, 30],
        $Vp = [5, 7, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 28, 30],
        $Vq = [5, 7, 12, 19, 20, 21, 22, 23, 24, 25, 26, 28, 30],
        $Vr = [5, 7, 12, 25, 26, 28, 30],
        $Vs = [7, 28];
      var parser = {
        trace: function trace() {},
        yy: {},
        symbols_: {
          "error": 2,
          "expressions": 3,
          "e": 4,
          "EOF": 5,
          "expression_list": 6,
          ",": 7,
          "dot_name": 8,
          ".": 9,
          "NAME": 10,
          "[": 11,
          "]": 12,
          "+": 13,
          "-": 14,
          "*": 15,
          "/": 16,
          "%": 17,
          "^": 18,
          ">": 19,
          "<": 20,
          "==": 21,
          "!=": 22,
          ">=": 23,
          "<=": 24,
          "||": 25,
          "&&": 26,
          "(": 27,
          ")": 28,
          "?": 29,
          ":": 30,
          "true": 31,
          "false": 32,
          "QUOTED_STRING": 33,
          "NUMBER": 34,
          "HEXNUMBER": 35,
          "$accept": 0,
          "$end": 1
        },
        terminals_: {
          2: "error",
          5: "EOF",
          7: ",",
          9: ".",
          10: "NAME",
          11: "[",
          12: "]",
          13: "+",
          14: "-",
          15: "*",
          16: "/",
          17: "%",
          18: "^",
          19: ">",
          20: "<",
          21: "==",
          22: "!=",
          23: ">=",
          24: "<=",
          25: "||",
          26: "&&",
          27: "(",
          28: ")",
          29: "?",
          30: ":",
          31: "true",
          32: "false",
          33: "QUOTED_STRING",
          34: "NUMBER",
          35: "HEXNUMBER"
        },
        productions_: [0, [3, 2], [6, 3], [6, 1], [8, 3], [8, 4], [8, 1], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 2], [4, 3], [4, 7], [4, 1], [4, 1], [4, 1], [4, 3], [4, 4], [4, 1], [4, 1], [4, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
          /* this == yyval */

          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              var result = $$[$0 - 1];
              if (typeof result === 'function') {
                return result;
              } else {
                return function (ctx) {
                  return result;
                };
              }
            case 2:
            case 4:
              this.$ = $$[$0 - 2].concat([$$[$0]]);
              break;
            case 3:
            case 6:
              this.$ = [$$[$0]];
              break;
            case 5:
              this.$ = $$[$0 - 3].concat([$$[$0 - 1]]);
              break;
            case 7:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_add', [$$[$0 - 2], $$[$0]]);
              };
              break;
            case 8:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_subtract', [$$[$0 - 2], $$[$0]]);
              };
              break;
            case 9:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_multiply', [$$[$0 - 2], $$[$0]]);
              };
              break;
            case 10:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_divide', [$$[$0 - 2], $$[$0]]);
              };
              break;
            case 11:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_mod', [$$[$0 - 2], $$[$0]]);
              };
              break;
            case 12:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_pow', [$$[$0 - 2], $$[$0]]);
              };
              break;
            case 13:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_greaterThen', [$$[$0 - 2], $$[$0]]) == true;
              };
              break;
            case 14:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_lessThen', [$$[$0 - 2], $$[$0]]) == true;
              };
              break;
            case 15:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_equalTo', [$$[$0 - 2], $$[$0]]) == true;
              };
              break;
            case 16:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_equalTo', [$$[$0 - 2], $$[$0]]) == false;
              };
              break;
            case 17:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_lessThen', [$$[$0 - 2], $$[$0]]) == false;
              };
              break;
            case 18:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_greaterThen', [$$[$0 - 2], $$[$0]]) == false;
              };
              break;
            case 19:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_or', [$$[$0 - 2], $$[$0]]) == true;
              };
              break;
            case 20:
              this.$ = function (ctx) {
                return runBuildInMethod(yy.parser, ctx, '_and', [$$[$0 - 2], $$[$0]]) == true;
              };
              break;
            case 21:
              this.$ = function (ctx) {
                return -runFn($$[$0], ctx);
              };
              break;
            case 22:
              this.$ = function (ctx) {
                return runFn($$[$0 - 1], ctx);
              };
              break;
            case 23:
              this.$ = function (ctx) {
                return runFn($$[$0 - 5], ctx) ? runFn($$[$0 - 2], ctx) : runFn($$[$0], ctx);
              };
              break;
            case 24:
              this.$ = true;
              break;
            case 25:
              this.$ = false;
              break;
            case 26:
              this.$ = function (ctx) {
                return yy.parser.getDotProperty(ctx, mapArgs($$[$0], ctx), 0);
              };
              break;
            case 27:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, mapArgs($$[$0 - 2], ctx), undefined, true);
              };
              break;
            case 28:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, mapArgs($$[$0 - 3], ctx), $$[$0 - 1], true);
              };
              break;
            case 29:
              this.$ = yytext.slice(1, -1);
              break;
            case 30:
              this.$ = Number(yytext);
              break;
            case 31:
              this.$ = parseInt(yytext, 16);
              break;
          }
        },
        table: [{
          3: 1,
          4: 2,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          1: [3]
        }, {
          5: [1, 12],
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd,
          19: $Ve,
          20: $Vf,
          21: $Vg,
          22: $Vh,
          23: $Vi,
          24: $Vj,
          25: $Vk,
          26: $Vl
        }, {
          4: 27,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 28,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, o($Vm, [2, 24]), o($Vm, [2, 25]), o($Vm, [2, 26], {
          9: [1, 30],
          11: [1, 31],
          27: [1, 29]
        }), o($Vm, [2, 29]), o($Vm, [2, 30]), o($Vm, [2, 31]), o($Vn, [2, 6]), {
          1: [2, 1]
        }, {
          4: 32,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 33,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 34,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 35,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 36,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 37,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 38,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 39,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 40,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 41,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 42,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 43,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 44,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          4: 45,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, o($Vm, [2, 21]), {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd,
          19: $Ve,
          20: $Vf,
          21: $Vg,
          22: $Vh,
          23: $Vi,
          24: $Vj,
          25: $Vk,
          26: $Vl,
          28: [1, 46]
        }, {
          4: 49,
          6: 48,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          28: [1, 47],
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, {
          10: [1, 50]
        }, {
          4: 51,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, o($Vo, [2, 7], {
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd
        }), o($Vo, [2, 8], {
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd
        }), o($Vp, [2, 9], {
          18: $Vd
        }), o($Vp, [2, 10], {
          18: $Vd
        }), o([5, 7, 12, 13, 14, 17, 19, 20, 21, 22, 23, 24, 25, 26, 28, 30], [2, 11], {
          15: $Va,
          16: $Vb,
          18: $Vd
        }), o($Vm, [2, 12]), o($Vq, [2, 13], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd
        }), o($Vq, [2, 14], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd
        }), o($Vq, [2, 15], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd
        }), o($Vq, [2, 16], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd
        }), o($Vq, [2, 17], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd
        }), o($Vq, [2, 18], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd
        }), o($Vr, [2, 19], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd,
          19: $Ve,
          20: $Vf,
          21: $Vg,
          22: $Vh,
          23: $Vi,
          24: $Vj
        }), o($Vr, [2, 20], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd,
          19: $Ve,
          20: $Vf,
          21: $Vg,
          22: $Vh,
          23: $Vi,
          24: $Vj
        }), o($Vm, [2, 22], {
          29: [1, 52]
        }), o($Vm, [2, 27]), {
          7: [1, 54],
          28: [1, 53]
        }, o($Vs, [2, 3], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd,
          19: $Ve,
          20: $Vf,
          21: $Vg,
          22: $Vh,
          23: $Vi,
          24: $Vj,
          25: $Vk,
          26: $Vl
        }), o($Vn, [2, 4]), {
          12: [1, 55],
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd,
          19: $Ve,
          20: $Vf,
          21: $Vg,
          22: $Vh,
          23: $Vi,
          24: $Vj,
          25: $Vk,
          26: $Vl
        }, {
          4: 56,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, o($Vm, [2, 28]), {
          4: 57,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, o($Vn, [2, 5]), {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd,
          19: $Ve,
          20: $Vf,
          21: $Vg,
          22: $Vh,
          23: $Vi,
          24: $Vj,
          25: $Vk,
          26: $Vl,
          30: [1, 58]
        }, o($Vs, [2, 2], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd,
          19: $Ve,
          20: $Vf,
          21: $Vg,
          22: $Vh,
          23: $Vi,
          24: $Vj,
          25: $Vk,
          26: $Vl
        }), {
          4: 59,
          8: 7,
          10: $V0,
          14: $V1,
          27: $V2,
          31: $V3,
          32: $V4,
          33: $V5,
          34: $V6,
          35: $V7
        }, o([5, 7, 12, 28, 30], [2, 23], {
          13: $V8,
          14: $V9,
          15: $Va,
          16: $Vb,
          17: $Vc,
          18: $Vd,
          19: $Ve,
          20: $Vf,
          21: $Vg,
          22: $Vh,
          23: $Vi,
          24: $Vj,
          25: $Vk,
          26: $Vl
        })],
        defaultActions: {
          12: [2, 1]
        },
        parseError: function parseError(str, hash) {
          if (hash.recoverable) {
            this.trace(str);
          } else {
            var error = new Error(str);
            error.hash = hash;
            throw error;
          }
        },
        parse: function parse(input) {
          var self = this,
            stack = [0],
            vstack = [null],
            lstack = [],
            table = this.table,
            yytext = '',
            yylineno = 0,
            yyleng = 0,
            TERROR = 2,
            EOF = 1;
          var args = lstack.slice.call(arguments, 1);
          var lexer = Object.create(this.lexer);
          var sharedState = {
            yy: {}
          };
          for (var k in this.yy) {
            if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
              sharedState.yy[k] = this.yy[k];
            }
          }
          lexer.setInput(input, sharedState.yy);
          sharedState.yy.lexer = lexer;
          sharedState.yy.parser = this;
          if (typeof lexer.yylloc == 'undefined') {
            lexer.yylloc = {};
          }
          var yyloc = lexer.yylloc;
          lstack.push(yyloc);
          var ranges = lexer.options && lexer.options.ranges;
          if (typeof sharedState.yy.parseError === 'function') {
            this.parseError = sharedState.yy.parseError;
          } else {
            this.parseError = Object.getPrototypeOf(this).parseError;
          }
          var lex = function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
              token = self.symbols_[token] || token;
            }
            return token;
          };
          var symbol,
            state,
            action,
            r,
            yyval = {},
            p,
            len,
            newState,
            expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state];
            } else {
              if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
              }
              action = table[state] && table[state][symbol];
            }
            if (typeof action === 'undefined' || !action.length || !action[0]) {
              var errStr = '';
              expected = [];
              for (p in table[state]) {
                if (this.terminals_[p] && p > TERROR) {
                  expected.push('\'' + this.terminals_[p] + '\'');
                }
              }
              if (lexer.showPosition) {
                errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
              } else {
                errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
              }
              this.parseError(errStr, {
                text: lexer.match,
                token: this.terminals_[symbol] || symbol,
                line: lexer.yylineno,
                loc: yyloc,
                expected: expected
              });
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                {
                  yyleng = lexer.yyleng;
                  yytext = lexer.yytext;
                  yylineno = lexer.yylineno;
                  yyloc = lexer.yylloc;
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {
                  first_line: lstack[lstack.length - (len || 1)].first_line,
                  last_line: lstack[lstack.length - 1].last_line,
                  first_column: lstack[lstack.length - (len || 1)].first_column,
                  last_column: lstack[lstack.length - 1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                if (typeof r !== 'undefined') {
                  return r;
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true;
            }
          }
          return true;
        }
      };
      function runFn(arg, ctx) {
        return typeof arg === 'function' ? arg(ctx) : arg;
      }
      function mapArgs(args, ctx) {
        if (args) {
          args = args.map(function (arg) {
            return runFn(arg, ctx);
          });
        }
        return args;
      }
      function runBuildInMethod(self, ctx, name, args) {
        var callback = self[name];
        return callback.apply(self, mapArgs(args, ctx));
      }
      function runMethod(self, ctx, name, args, dotMode) {
        var names;
        if (typeof name === 'string') {
          if (dotMode) {
            names = name.split('.');
          } else {
            names = [name];
          }
        } else {
          names = name;
        }
        var callback, scope;
        if (names.length > 1) {
          var callbackName = names.pop();
          scope = self.getDotProperty(ctx, names);
          callback = scope[callbackName];
        } else {
          callback = self.getProperty(ctx, name);
          scope = self;
        }
        if (callback == null) {
          callback = self.getProperty(ctx, 'defaultHandler');
          scope = self;
        }
        return callback.apply(scope, mapArgs(args, ctx));
      }
      /* generated by jison-lex 0.3.4 */
      var lexer = function () {
        var lexer = {
          EOF: 1,
          parseError: function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
            } else {
              throw new Error(str);
            }
          },
          // resets the lexer, sets new input
          setInput: function setInput(input, yy) {
            this.yy = yy || this.yy || {};
            this._input = input;
            this._more = this._backtrack = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = '';
            this.conditionStack = ['INITIAL'];
            this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0
            };
            if (this.options.ranges) {
              this.yylloc.range = [0, 0];
            }
            this.offset = 0;
            return this;
          },
          // consumes and returns one char from the input
          input: function input() {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
            } else {
              this.yylloc.last_column++;
            }
            if (this.options.ranges) {
              this.yylloc.range[1]++;
            }
            this._input = this._input.slice(1);
            return ch;
          },
          // unshifts one char (or a string) into the input
          unput: function unput(ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len);
            //this.yyleng -= len;
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1) {
              this.yylineno -= lines.length - 1;
            }
            var r = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
            }
            this.yyleng = this.yytext.length;
            return this;
          },
          // When called from action, caches matched text and appends it on next action
          more: function more() {
            this._more = true;
            return this;
          },
          // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
          reject: function reject() {
            if (this.options.backtrack_lexer) {
              this._backtrack = true;
            } else {
              return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            }
            return this;
          },
          // retain first n characters of the match
          less: function less(n) {
            this.unput(this.match.slice(n));
          },
          // displays already matched input, i.e. for error messages
          pastInput: function pastInput() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
          },
          // displays upcoming input, i.e. for error messages
          upcomingInput: function upcomingInput() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length);
            }
            return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
          },
          // displays the character position where the lexing error occurred, i.e. for error messages
          showPosition: function showPosition() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
          },
          // test the lexed token: return FALSE when not a match, otherwise return token
          test_match: function test_match(match, indexed_rule) {
            var token, lines, backup;
            if (this.options.backtrack_lexer) {
              // save context
              backup = {
                yylineno: this.yylineno,
                yylloc: {
                  first_line: this.yylloc.first_line,
                  last_line: this.last_line,
                  first_column: this.yylloc.first_column,
                  last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
              };
              if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
              }
            }
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno += lines.length;
            }
            this.yylloc = {
              first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
            };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._backtrack = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input) {
              this.done = false;
            }
            if (token) {
              return token;
            } else if (this._backtrack) {
              // recover context
              for (var k in backup) {
                this[k] = backup[k];
              }
              return false; // rule action called reject() implying the next rule should be tested instead.
            }

            return false;
          },
          // return next match in input
          next: function next() {
            if (this.done) {
              return this.EOF;
            }
            if (!this._input) {
              this.done = true;
            }
            var token, match, tempMatch, index;
            if (!this._more) {
              this.yytext = '';
              this.match = '';
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                  token = this.test_match(tempMatch, rules[i]);
                  if (token !== false) {
                    return token;
                  } else if (this._backtrack) {
                    match = false;
                    continue; // rule action called reject() implying a rule MISmatch.
                  } else {
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                  }
                } else if (!this.options.flex) {
                  break;
                }
              }
            }
            if (match) {
              token = this.test_match(match, rules[index]);
              if (token !== false) {
                return token;
              }
              // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
              return false;
            }
            if (this._input === "") {
              return this.EOF;
            } else {
              return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            }
          },
          // return next match that has a token
          lex: function lex() {
            var r = this.next();
            if (r) {
              return r;
            } else {
              return this.lex();
            }
          },
          // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
          begin: function begin(condition) {
            this.conditionStack.push(condition);
          },
          // pop the previously active lexer condition state off the condition stack
          popState: function popState() {
            var n = this.conditionStack.length - 1;
            if (n > 0) {
              return this.conditionStack.pop();
            } else {
              return this.conditionStack[0];
            }
          },
          // produce the lexer rule set which is active for the currently active lexer condition state
          _currentRules: function _currentRules() {
            if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
              return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            } else {
              return this.conditions["INITIAL"].rules;
            }
          },
          // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
          topState: function topState(n) {
            n = this.conditionStack.length - 1 - Math.abs(n || 0);
            if (n >= 0) {
              return this.conditionStack[n];
            } else {
              return "INITIAL";
            }
          },
          // alias for begin(condition)
          pushState: function pushState(condition) {
            this.begin(condition);
          },
          // return the number of states currently on the stack
          stateStackSize: function stateStackSize() {
            return this.conditionStack.length;
          },
          options: {},
          performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
            switch ($avoiding_name_collisions) {
              case 0:
                /* skip whitespace */
                break;
              case 1:
                return 34;
              case 2:
                return 35;
              case 3:
                return 15;
              case 4:
                return 16;
              case 5:
                return 14;
              case 6:
                return 13;
              case 7:
                return 18;
              case 8:
                return 17;
              case 9:
                return ">=";
              case 10:
                return "<=";
              case 11:
                return 19;
              case 12:
                return 20;
              case 13:
                return "==";
              case 14:
                return "!=";
              case 15:
                return "||";
              case 16:
                return "&&";
              case 17:
                return "?";
              case 18:
                return ":";
              case 19:
                return 27;
              case 20:
                return 28;
              case 21:
                return 11;
              case 22:
                return 12;
              case 23:
                return 7;
              case 24:
                return 9;
              case 25:
                return 31;
              case 26:
                return 32;
              case 27:
                return 10;
              case 28:
                return 33;
              case 29:
                return 5;
              case 30:
                return 'INVALID';
            }
          },
          rules: [/^(?:\s+)/, /^(?:[0-9]+(\.[0-9]+)?\b)/, /^(?:\b0x[0-9A-Fa-f]+\b)/, /^(?:\*)/, /^(?:\/)/, /^(?:-)/, /^(?:\+)/, /^(?:\^)/, /^(?:%)/, /^(?:>=)/, /^(?:<=)/, /^(?:>)/, /^(?:<)/, /^(?:==)/, /^(?:!=)/, /^(?:\|\|)/, /^(?:&&)/, /^(?:\?)/, /^(?::)/, /^(?:\()/, /^(?:\))/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?:\.)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:[^\s\*\/\-\+\^\%\>\=\<\!\|\&\?\:\(\)\[\]\,\.]+)/, /^(?:"(\\.|[^\"\\])*"|'(\\.|[^\'\\])*')/, /^(?:$)/, /^(?:.)/],
          conditions: {
            "INITIAL": {
              "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
              "inclusive": true
            }
          }
        };
        return lexer;
      }();
      parser.lexer = lexer;
      function Parser() {
        this.yy = {};
      }
      Parser.prototype = parser;
      parser.Parser = Parser;
      return new Parser();
    }();
    if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
      exports.parser = parser;
      exports.Parser = parser.Parser;
      exports.parse = function () {
        return parser.parse.apply(parser, arguments);
      };
      exports.main = function commonjsMain(args) {
        if (!args[1]) {
          console.log('Usage: ' + args[0] + ' FILE');
          process.exit(1);
        }
        var source = require$$0.readFileSync(require$$1.normalize(args[1]), "utf8");
        return exports.parser.parse(source);
      };
    }
  })(parser$2);
  var parser$1 = /*@__PURE__*/getDefaultExportFromCjs(parser$2);

  var GetProperty = function GetProperty(context, key, defaultValue, dotMode) {
    if (dotMode === undefined) {
      dotMode = true;
    }
    if (!context || typeof context === 'number' || typeof context === 'string') {
      return defaultValue;
    } else if (key in context) {
      return context[key];
    } else if (dotMode && (Array.isArray(key) || key.indexOf('.') !== -1)) {
      var keys = Array.isArray(key) ? key : key.split('.');
      var value = context;
      //  Use for loop here so we can break early
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key in value) {
          value = value[key];
        } else {
          value = defaultValue;
          break;
        }
      }
      return value;
    } else {
      return defaultValue;
    }
  };

  var FormulaParser = /*#__PURE__*/function (_parser$Parser) {
    _inherits(FormulaParser, _parser$Parser);
    var _super = _createSuper(FormulaParser);
    function FormulaParser() {
      _classCallCheck(this, FormulaParser);
      return _super.apply(this, arguments);
    }
    _createClass(FormulaParser, [{
      key: "getProperty",
      value: function getProperty(context, name, defaultValue) {
        var value = GetProperty(context, name, undefined, false);
        if (value !== undefined) {
          return value;
        }
        return GetProperty(this, name, defaultValue, false);
      }
    }, {
      key: "getDotProperty",
      value: function getDotProperty(context, name, defaultValue) {
        var value = GetProperty(context, name, undefined, true);
        if (value !== undefined) {
          return value;
        }
        return GetProperty(this, name, defaultValue, true);
      }
    }, {
      key: "_add",
      value: function _add(a, b) {
        return a + b;
      }
    }, {
      key: "_subtract",
      value: function _subtract(a, b) {
        return a - b;
      }
    }, {
      key: "_multiply",
      value: function _multiply(a, b) {
        return a * b;
      }
    }, {
      key: "_divide",
      value: function _divide(a, b) {
        return a / b;
      }
    }, {
      key: "_mod",
      value: function _mod(a, b) {
        return a % b;
      }
    }, {
      key: "_pow",
      value: function _pow(a, b) {
        return Math.pow(a, b);
      }
    }, {
      key: "_greaterThen",
      value: function _greaterThen(a, b) {
        return a > b;
      }
    }, {
      key: "_lessThen",
      value: function _lessThen(a, b) {
        return a < b;
      }
    }, {
      key: "_equalTo",
      value: function _equalTo(a, b) {
        return a == b;
      }
    }, {
      key: "_or",
      value: function _or(a, b) {
        return a || b;
      }
    }, {
      key: "_and",
      value: function _and(a, b) {
        return a && b;
      }
    }, {
      key: "defaultHandler",
      value: function defaultHandler(name, args) {
        return 0;
      }
    }, {
      key: "compile",
      value: function compile(input) {
        return this.parse(input);
      }
    }, {
      key: "exec",
      value: function exec(input, data) {
        if (typeof input === 'string') {
          input = this.compile(input);
        }
        return input(data);
      }
    }], [{
      key: "GetProperty",
      value: function GetProperty$1(context, key, defaultValue, dotMode) {
        return GetProperty(context, key, defaultValue, dotMode);
      }
    }]);
    return FormulaParser;
  }(parser$1.Parser);

  var parser = new FormulaParser();
  var Compile$1 = function Compile(expression) {
    return parser.compile(expression);
  };

  var Expression = /*#__PURE__*/function (_BaseExpression) {
    _inherits(Expression, _BaseExpression);
    var _super = _createSuper(Expression);
    function Expression(expression) {
      var _this;
      _classCallCheck(this, Expression);
      _this = _super.call(this);
      var callback;
      if (typeof expression === 'number') {
        callback = function callback() {
          return expression;
        };
      } else {
        callback = Compile$1(expression);
      }
      _this.setExpressionHandler(callback);
      return _this;
    }
    return _createClass(Expression);
  }(BaseExpression);

  var BooleanExpression = /*#__PURE__*/function (_Expression) {
    _inherits(BooleanExpression, _Expression);
    var _super = _createSuper(BooleanExpression);
    function BooleanExpression() {
      _classCallCheck(this, BooleanExpression);
      return _super.apply(this, arguments);
    }
    _createClass(BooleanExpression, [{
      key: "eval",
      value: function _eval(context) {
        return !!_get(_getPrototypeOf(BooleanExpression.prototype), "eval", this).call(this, context);
      }
    }]);
    return BooleanExpression;
  }(Expression);

  var StringTemplate = /*#__PURE__*/function () {
    function StringTemplate(config) {
      _classCallCheck(this, StringTemplate);
      if (config === undefined) {
        config = {};
      }
      // Brackets and generate regex
      var delimiters = config.delimiters;
      if (delimiters === undefined) {
        delimiters = ['{{', '}}'];
      }
      this.setDelimiters(delimiters[0], delimiters[1]);
      var expressionParser = config.expressionParser;
      if (expressionParser === undefined) {
        expressionParser = new FormulaParser();
      }
      this.setExpressionParser(expressionParser);
    }
    _createClass(StringTemplate, [{
      key: "setDelimiters",
      value: function setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
          delimiterRight = delimiterLeft[1];
          delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;
        this.reDelimiter = RegExp("".concat(delimiterLeft, "|").concat(delimiterRight), 'gi');
        this.reSplit = RegExp("".concat(delimiterLeft, ".*?").concat(delimiterRight), 'gi');
        return this;
      }
    }, {
      key: "setExpressionParser",
      value: function setExpressionParser(expressionParser) {
        this.expressionParser = expressionParser;
        return this;
      }
    }, {
      key: "compile",
      value: function compile(content, config) {
        // Store previous setting
        // Override current setting        
        var delimiterLeftSave, delimiterRightSave;
        var expressionParserSave;
        if (config) {
          var delimiters = config.delimiters;
          if (delimiters) {
            delimiterLeftSave = this.delimiterLeft;
            delimiterRightSave = this.delimiterRight;
            this.setDelimiters(delimiters[0], delimiters[1]);
          }
          var expressionParser = config.expressionParser;
          if (expressionParser) {
            expressionParserSave = this.expressionParser;
            this.setExpressionParser(expressionParser);
          }
        }

        // Parse context
        var reDelimiter = this.reDelimiter;
        var reSplit = this.reSplit;
        var expressionParser = this.expressionParser;
        var result = [];
        var charIdx = 0;
        while (true) {
          var regexResult = reSplit.exec(content);
          if (!regexResult) {
            break;
          }
          var match = regexResult[0];
          var matchEnd = reSplit.lastIndex;
          var matchStart = matchEnd - match.length;
          if (charIdx < matchStart) {
            result.push(content.substring(charIdx, matchStart));
          }
          var s = content.substring(matchStart, matchEnd).replace(reDelimiter, '');
          result.push(expressionParser.compile(s));
          charIdx = matchEnd;
        }
        var totalLen = content.length;
        if (charIdx < totalLen) {
          // Push remainder string
          result.push(content.substring(charIdx, totalLen));
        }

        // Restore previous setting
        if (delimiterLeftSave) {
          this.setDelimiters(delimiterLeftSave, delimiterRightSave);
        }
        if (expressionParserSave) {
          this.setExpressionParser(expressionParserSave);
        }

        // Return render callback
        return function (view) {
          return result.map(function (item) {
            if (typeof item === 'function') {
              item = item(view);
            }
            return item;
          }).join('');
        };
      }
    }, {
      key: "render",
      value: function render(content, view, config) {
        var f;
        if (typeof content === 'string') {
          f = this.compile(content, config);
        } else {
          f = content;
        }
        return f(view);
      }
    }]);
    return StringTemplate;
  }();

  var stringTemplate = new StringTemplate();
  var Compile = function Compile(content, config) {
    return stringTemplate.compile(content, config);
  };

  var StringTemplateExpression = /*#__PURE__*/function (_BaseExpression) {
    _inherits(StringTemplateExpression, _BaseExpression);
    var _super = _createSuper(StringTemplateExpression);
    function StringTemplateExpression(expression) {
      var _this;
      _classCallCheck(this, StringTemplateExpression);
      _this = _super.call(this);
      var callback = Compile(expression);
      _this.setExpressionHandler(callback);
      return _this;
    }
    return _createClass(StringTemplateExpression);
  }(BaseExpression);

  var BaseNode = /*#__PURE__*/function () {
    function BaseNode() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref.id,
        category = _ref.category,
        name = _ref.name,
        title = _ref.title,
        description = _ref.description,
        properties = _ref.properties;
      _classCallCheck(this, BaseNode);
      if (id === undefined) {
        id = CreateID();
      }
      this.parent = null;
      this.id = id;
      this.category = category || '';
      this.name = name || '';
      this.title = title || this.name;
      this.description = description || '';
      this.properties = properties || {};
    }
    _createClass(BaseNode, [{
      key: "setTitle",
      value: function setTitle(title) {
        this.title = title;
        return this;
      }
    }, {
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "setDescription",
      value: function setDescription(description) {
        this.description = description;
        return this;
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent;
        return this;
      }
    }, {
      key: "getParent",
      value: function getParent() {
        return this.parent;
      }
    }, {
      key: "getTree",
      value: function getTree(tick) {
        if (tick) {
          return tick.tree;
        } else {
          var parent = this.parent;
          while (parent) {
            if (parent.category === TREE) {
              return parent;
            }
            parent = parent.parent;
          }
          return null;
        }
      }
    }, {
      key: "addExpression",
      value: function addExpression(expression) {
        return new Expression(expression);
      }
    }, {
      key: "addBooleanExpression",
      value: function addBooleanExpression(expression) {
        return new BooleanExpression(expression);
      }
    }, {
      key: "addStringTemplateExpression",
      value: function addStringTemplateExpression(expression) {
        // TODO: Use mustache or handlebars ?
        return new StringTemplateExpression(expression);
      }
    }, {
      key: "_execute",
      value: function _execute(tick) {
        // ENTER
        this._enter(tick);

        // OPEN
        if (!this.getOpenState(tick)) {
          this._open(tick);
        }

        // TICK
        var status = this._tick(tick);

        // CLOSE
        if (status === SUCCESS$1 || status === FAILURE || status === ABORT || status === ERROR$1) {
          this._close(tick);
        }

        // EXIT
        this._exit(tick);
        return status;
      }
    }, {
      key: "_enter",
      value: function _enter(tick) {
        tick._enterNode(this);
        this.enter(tick);
      }
    }, {
      key: "_open",
      value: function _open(tick) {
        tick._openNode(this);
        this.setOpenState(tick, true);
        this.open(tick);
      }
    }, {
      key: "_tick",
      value: function _tick(tick) {
        tick._tickNode(this);
        return this.tick(tick);
      }
    }, {
      key: "_close",
      value: function _close(tick) {
        tick._closeNode(this);
        this.setOpenState(tick, false);
        this.close(tick);
        // Children will be closed before parent, otherwise abort children
        this.abortChildren(tick);
      }
    }, {
      key: "_exit",
      value: function _exit(tick) {
        tick._exitNode(this);
        this.exit(tick);
      }
    }, {
      key: "_abort",
      value: function _abort(tick) {
        this._close(tick);
        this.abort(tick);
      }
    }, {
      key: "enter",
      value: function enter(tick) {}
    }, {
      key: "open",
      value: function open(tick) {}
    }, {
      key: "tick",
      value: function tick(_tick2) {}
    }, {
      key: "close",
      value: function close(tick) {}
    }, {
      key: "exit",
      value: function exit(tick) {}
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {}
    }, {
      key: "abort",
      value: function abort(tick) {}

      // open state of this node
    }, {
      key: "getNodeMemory",
      value: function getNodeMemory(tick) {
        return tick.getNodeMemory(this.id);
      }
    }, {
      key: "getOpenState",
      value: function getOpenState(tick) {
        return this.getNodeMemory(tick).$isOpen;
      }
    }, {
      key: "setOpenState",
      value: function setOpenState(tick, state) {
        if (state === undefined) {
          state = true;
        }
        this.getNodeMemory(tick).$isOpen = state;
        return this;
      }

      // Return state value
    }, {
      key: "SUCCESS",
      get: function get() {
        return SUCCESS$1;
      }
    }, {
      key: "FAILURE",
      get: function get() {
        return FAILURE;
      }
    }, {
      key: "RUNNING",
      get: function get() {
        return RUNNING$1;
      }
    }, {
      key: "PENDING",
      get: function get() {
        return PENDING;
      }
    }, {
      key: "ERROR",
      get: function get() {
        return ERROR$1;
      }
    }]);
    return BaseNode;
  }();

  var Action = /*#__PURE__*/function (_BaseNode) {
    _inherits(Action, _BaseNode);
    var _super = _createSuper(Action);
    function Action() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Action' : _ref$name,
        title = _ref.title,
        properties = _ref.properties,
        services = _ref.services;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Action);
      _this = _super.call(this, {
        category: ACTION,
        name: name,
        title: title,
        properties: properties
      });
      if (services) {
        for (var i = 0, cnt = services.length; i < cnt; i++) {
          _this.addService(services[i], nodePool);
        }
      }
      return _this;
    }
    _createClass(Action, [{
      key: "addService",
      value: function addService(node, nodePool) {
        if (typeof node === 'string') {
          // Node ID
          node = nodePool[node];
        }
        if (this.services === undefined) {
          this.services = [];
        }
        if (this.services.indexOf(node) === -1) {
          this.services.push(node);
          node.setParent(this);
        }
        return this;
      }
    }, {
      key: "_tick",
      value: function _tick(tick) {
        tick._tickNode(this);
        if (this.services) {
          for (var i = 0, cnt = this.services.length; i < cnt; i++) {
            this.services[i]._tick(tick);
          }
        }
        return this.tick(tick);
      }
    }]);
    return Action;
  }(BaseNode);

  var Composite = /*#__PURE__*/function (_BaseNode) {
    _inherits(Composite, _BaseNode);
    var _super = _createSuper(Composite);
    function Composite() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Composite' : _ref$name,
        title = _ref.title,
        properties = _ref.properties,
        services = _ref.services;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Composite);
      _this = _super.call(this, {
        category: COMPOSITE,
        name: name,
        title: title,
        properties: properties
      });
      _this.children = [];
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        _this.addChild(children[i], nodePool);
      }
      if (services) {
        for (var i = 0, cnt = services.length; i < cnt; i++) {
          _this.addService(services[i], nodePool);
        }
      }
      return _this;
    }
    _createClass(Composite, [{
      key: "insertChild",
      value: function insertChild(node, nodePool, index) {
        if (typeof node === 'string') {
          // Node ID
          node = nodePool[node];
        }
        if (this.children.indexOf(node) === -1) {
          if (index < 0) {
            index = this.children.length + index;
          }
          if (index === undefined || index >= this.children.length) {
            this.children.push(node);
          } else {
            this.children.splice(index, 0, node);
          }
          node.setParent(this);
        }
        return this;
      }
    }, {
      key: "addChild",
      value: function addChild(node, nodePool) {
        this.insertChild(node, nodePool);
        return this;
      }
    }, {
      key: "addService",
      value: function addService(node, nodePool) {
        if (typeof node === 'string') {
          // Node ID
          node = nodePool[node];
        }
        if (this.services === undefined) {
          this.services = [];
        }
        if (this.services.indexOf(node) === -1) {
          this.services.push(node);
          node.setParent(this);
        }
        return this;
      }
    }, {
      key: "_tick",
      value: function _tick(tick) {
        tick._tickNode(this);
        if (this.services) {
          for (var i = 0, cnt = this.services.length; i < cnt; i++) {
            this.services[i]._tick(tick);
          }
        }
        return this.tick(tick);
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
          var childNode = this.children[i];
          if (childNode.getOpenState(tick)) {
            childNode._abort(tick);
          }
        }
      }
    }]);
    return Composite;
  }(BaseNode);

  var Decorator = /*#__PURE__*/function (_BaseNode) {
    _inherits(Decorator, _BaseNode);
    var _super = _createSuper(Decorator);
    function Decorator() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Decorator' : _ref$name,
        title = _ref.title,
        properties = _ref.properties;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Decorator);
      _this = _super.call(this, {
        category: DECORATOR,
        name: name,
        title: title,
        properties: properties
      });
      _this.child = null;
      if (child) {
        _this.addChild(child, nodePool);
      }
      return _this;
    }
    _createClass(Decorator, [{
      key: "addChild",
      value: function addChild(node, nodePool) {
        if (typeof node === 'string') {
          // Node ID
          node = nodePool[node];
        }
        this.child = node;
        node.setParent(this);
        return this;
      }
    }, {
      key: "isChildRunning",
      value: function isChildRunning(tick) {
        return this.child.getOpenState(tick);
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        if (this.isChildRunning(tick)) {
          this.child._abort(tick);
        }
      }
    }, {
      key: "openChild",
      value: function openChild(tick) {
        this.child.setOpenState(tick, true);
        return this;
      }
    }]);
    return Decorator;
  }(BaseNode);

  var Service = /*#__PURE__*/function (_BaseNode) {
    _inherits(Service, _BaseNode);
    var _super = _createSuper(Service);
    function Service() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$interval = _ref.interval,
        interval = _ref$interval === void 0 ? 0 : _ref$interval,
        _ref$randomDeviation = _ref.randomDeviation,
        randomDeviation = _ref$randomDeviation === void 0 ? 0 : _ref$randomDeviation,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Service' : _ref$name,
        title = _ref.title,
        properties = _ref.properties;
      _classCallCheck(this, Service);
      if (properties === undefined) {
        properties = {};
      }
      properties.interval = interval;
      properties.randomDeviation = randomDeviation;
      _this = _super.call(this, {
        category: SERVICE,
        name: name,
        title: title,
        properties: properties
      });
      _this.intervalExpression = _this.addExpression(interval);
      _this.randomDeviationExpression = _this.addExpression(randomDeviation);
      return _this;
    }
    _createClass(Service, [{
      key: "_tick",
      value: function _tick(tick) {
        if (this.canTick(tick)) {
          this.tick(tick);
        }
      }
    }, {
      key: "canTick",
      value: function canTick(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var currTime = tick.currentTime;
        var lastEndTime = nodeMemory.$lastEndTime;
        var interval = nodeMemory.$interval;
        var canTick = lastEndTime === undefined || currTime - lastEndTime >= interval;
        if (canTick) {
          nodeMemory.$lastEndTime = currTime;
          var interval = tick.evalExpression(this.intervalExpression);
          var randomDeviation = tick.evalExpression(this.randomDeviationExpression);
          if (randomDeviation > 0) {
            interval += (0.5 - Math.random()) * randomDeviation;
          }
          nodeMemory.$interval = interval;
        }
        return canTick;
      }
    }]);
    return Service;
  }(BaseNode);

  var Succeeder = /*#__PURE__*/function (_Action) {
    _inherits(Succeeder, _Action);
    var _super = _createSuper(Succeeder);
    function Succeeder() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Succeeder' : _ref$name;
      _classCallCheck(this, Succeeder);
      return _super.call(this, {
        services: services,
        title: title,
        name: name
      });
    }
    _createClass(Succeeder, [{
      key: "tick",
      value: function tick(_tick) {
        return SUCCESS$1;
      }
    }]);
    return Succeeder;
  }(Action);

  var Failer = /*#__PURE__*/function (_Action) {
    _inherits(Failer, _Action);
    var _super = _createSuper(Failer);
    function Failer() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Failer' : _ref$name;
      _classCallCheck(this, Failer);
      return _super.call(this, {
        services: services,
        title: title,
        name: name
      });
    }
    _createClass(Failer, [{
      key: "tick",
      value: function tick(_tick) {
        return FAILURE;
      }
    }]);
    return Failer;
  }(Action);

  var Runner = /*#__PURE__*/function (_Action) {
    _inherits(Runner, _Action);
    var _super = _createSuper(Runner);
    function Runner() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Runner' : _ref$name;
      _classCallCheck(this, Runner);
      return _super.call(this, {
        services: services,
        title: title,
        name: name
      });
    }
    _createClass(Runner, [{
      key: "tick",
      value: function tick(_tick) {
        return RUNNING$1;
      }
    }]);
    return Runner;
  }(Action);

  var Error$1 = /*#__PURE__*/function (_Action) {
    _inherits(Error, _Action);
    var _super = _createSuper(Error);
    function Error() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Error' : _ref$name;
      _classCallCheck(this, Error);
      return _super.call(this, {
        services: services,
        title: title,
        name: name
      });
    }
    _createClass(Error, [{
      key: "tick",
      value: function tick(_tick) {
        return ERROR$1;
      }
    }]);
    return Error;
  }(Action);

  var Wait = /*#__PURE__*/function (_Action) {
    _inherits(Wait, _Action);
    var _super = _createSuper(Wait);
    function Wait() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? 0 : _ref$duration,
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Wait' : _ref$name;
      _classCallCheck(this, Wait);
      _this = _super.call(this, {
        title: title,
        name: name,
        properties: {
          duration: duration
        },
        services: services
      });
      _this.durationExpression = _this.addExpression(duration);
      return _this;
    }
    _createClass(Wait, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = tick.evalExpression(this.durationExpression);
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        var nodeMemory = this.getNodeMemory(_tick);
        var currTime = _tick.currentTime;
        var startTime = nodeMemory.$startTime;
        var duration = nodeMemory.$duration;
        if (currTime - startTime < duration) {
          return RUNNING$1;
        }
        return SUCCESS$1;
      }
    }]);
    return Wait;
  }(Action);

  var Abort = /*#__PURE__*/function (_Action) {
    _inherits(Abort, _Action);
    var _super = _createSuper(Abort);
    function Abort() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Abort' : _ref$name;
      _classCallCheck(this, Abort);
      return _super.call(this, {
        services: services,
        title: title,
        name: name
      });
    }
    _createClass(Abort, [{
      key: "tick",
      value: function tick(_tick) {
        return ABORT;
      }
    }]);
    return Abort;
  }(Action);

  var Selector = /*#__PURE__*/function (_Composite) {
    _inherits(Selector, _Composite);
    var _super = _createSuper(Selector);
    function Selector() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Selector' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Selector);
      return _super.call(this, {
        children: children,
        services: services,
        title: title,
        name: name
      }, nodePool);
    }
    _createClass(Selector, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1; // No running child
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (this.children.length === 0) {
          return ERROR$1;
        }
        var nodeMemory = this.getNodeMemory(_tick);
        var childIndex = nodeMemory.$runningChild;
        var status;
        if (childIndex < 0) {
          for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            status = this.children[i]._execute(_tick);
            if (status === RUNNING$1 || status === SUCCESS$1 || status === ABORT) {
              childIndex = i;
              break;
            }
          }
        } else {
          var child = this.children[childIndex];
          status = child._execute(_tick);
        }
        nodeMemory.$runningChild = status === RUNNING$1 ? childIndex : -1;
        return status;
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child) {
          child._abort(tick);
          nodeMemory.$runningChild = -1;
        }
      }
    }]);
    return Selector;
  }(Composite);

  var Sequence = /*#__PURE__*/function (_Composite) {
    _inherits(Sequence, _Composite);
    var _super = _createSuper(Sequence);
    function Sequence() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Sequence' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Sequence);
      return _super.call(this, {
        children: children,
        services: services,
        title: title,
        name: name
      }, nodePool);
    }
    _createClass(Sequence, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = 0;
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (this.children.length === 0) {
          return ERROR$1;
        }
        var nodeMemory = this.getNodeMemory(_tick);
        var childIndex = nodeMemory.$runningChild;
        var status;
        for (var i = childIndex, cnt = this.children.length; i < cnt; i++) {
          status = this.children[i]._execute(_tick);
          if (status === RUNNING$1 || status === FAILURE || status === ABORT) {
            break;
          }
        }
        nodeMemory.$runningChild = status === RUNNING$1 ? i : -1;
        return status;
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child) {
          child._abort(tick);
          nodeMemory.$runningChild = -1;
        }
      }
    }]);
    return Sequence;
  }(Composite);

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

  var Parallel = /*#__PURE__*/function (_Composite) {
    _inherits(Parallel, _Composite);
    var _super = _createSuper(Parallel);
    function Parallel() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$finishMode = _ref.finishMode,
        finishMode = _ref$finishMode === void 0 ? 0 : _ref$finishMode,
        _ref$returnSuccess = _ref.returnSuccess,
        returnSuccess = _ref$returnSuccess === void 0 ? true : _ref$returnSuccess,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Parallel' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Parallel);
      _this = _super.call(this, {
        children: children,
        services: services,
        title: title,
        name: name,
        properties: {
          finishMode: finishMode,
          returnSuccess: returnSuccess
        }
      }, nodePool);
      _this.finishMode = finishMode;
      _this.returnSuccess = returnSuccess;
      return _this;
    }
    _createClass(Parallel, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChildren = this.children.map(function (child, index) {
          return index;
        });
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (this.children.length === 0) {
          return ERROR$1;
        }
        var nodeMemory = this.getNodeMemory(_tick);
        var childIndexes = nodeMemory.$runningChildren;
        var statusMap = {};
        var hasAnyFinishStatus = false;
        var hasAnyPendingStatus = false;
        var hasAnyRunningStatus = false;
        var hasAnyAbortStatus = false;
        var hasAnyErrorStatus = false;
        for (var i = 0, cnt = childIndexes.length; i < cnt; i++) {
          var childIndex = childIndexes[i];
          var status = this.children[childIndex]._execute(_tick);
          statusMap[childIndex] = status;
          if (childIndex === 0) {
            nodeMemory.$mainTaskStatus = status;
          }
          switch (status) {
            case SUCCESS$1:
            case FAILURE:
              hasAnyFinishStatus = true;
              break;
            case RUNNING$1:
              hasAnyRunningStatus = true;
              break;
            case PENDING:
              hasAnyPendingStatus = true;
              break;
            case ABORT:
              hasAnyAbortStatus = true;
              break;
            case ERROR$1:
              hasAnyErrorStatus = true;
              break;
          }
        }

        // Clear none-running child
        if (hasAnyFinishStatus) {
          for (var childIndex in statusMap) {
            var status = statusMap[childIndex];
            if (status === SUCCESS$1 || status === FAILURE) {
              Remove(childIndexes, parseInt(childIndex));
            }
          }
        }
        if (this.finishMode === 0) {
          return nodeMemory.$mainTaskStatus;
        } else {
          if (hasAnyErrorStatus) {
            return ERROR$1;
          } else if (hasAnyAbortStatus) {
            return ABORT;
          } else if (hasAnyPendingStatus) {
            return PENDING;
          } else if (hasAnyRunningStatus) {
            return RUNNING$1;
          } else if (this.returnSuccess) {
            return SUCCESS$1;
          } else {
            return nodeMemory.$mainTaskStatus;
          }
        }
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var childIndexes = nodeMemory.$runningChildren;
        for (var i = 0, cnt = childIndexes.length; i < cnt; i++) {
          var childIndex = childIndexes[i];
          this.children[childIndex]._abort(tick);
        }
        nodeMemory.$runningChildren.length = 0;
      }
    }]);
    return Parallel;
  }(Composite);

  var IfSelector = /*#__PURE__*/function (_Composite) {
    _inherits(IfSelector, _Composite);
    var _super = _createSuper(IfSelector);
    function IfSelector() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$expression = _ref.expression,
        expression = _ref$expression === void 0 ? 'true' : _ref$expression,
        _ref$returnPending = _ref.returnPending,
        returnPending = _ref$returnPending === void 0 ? false : _ref$returnPending,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'IfSelector' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, IfSelector);
      _this = _super.call(this, {
        children: children,
        services: services,
        title: title,
        name: name,
        properties: {
          expression: expression,
          returnPending: returnPending
        }
      }, nodePool);
      _this.expression = _this.addBooleanExpression(expression);
      _this.returnPending = returnPending;
      return _this;
    }
    _createClass(IfSelector, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1; // No running child
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (this.children.length === 0) {
          return ERROR$1;
        }
        var nodeMemory = this.getNodeMemory(_tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
          childIndex = _tick.evalExpression(this.expression) ? 0 : 1;
          if (this.returnPending) {
            nodeMemory.$runningChild = childIndex;
            return PENDING;
          }
        }
        var child = this.children[childIndex];
        var status = child._execute(_tick);
        nodeMemory.$runningChild = status === RUNNING$1 ? childIndex : -1;
        return status;
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child) {
          child._abort(tick);
          nodeMemory.$runningChild = -1;
        }
      }
    }]);
    return IfSelector;
  }(Composite);

  var SwitchSelector = /*#__PURE__*/function (_Composite) {
    _inherits(SwitchSelector, _Composite);
    var _super = _createSuper(SwitchSelector);
    function SwitchSelector() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$expression = _ref.expression,
        expression = _ref$expression === void 0 ? null : _ref$expression,
        _ref$keys = _ref.keys,
        keys = _ref$keys === void 0 ? undefined : _ref$keys,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? {} : _ref$children,
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'SwitchSelector' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, SwitchSelector);
      if (keys === undefined) {
        keys = Object.keys(children);
        children = Object.values(children);
      }
      _this = _super.call(this, {
        children: children,
        services: services,
        title: title,
        name: name,
        properties: {
          expression: expression,
          keys: keys
        }
      }, nodePool);
      _this.expression = _this.addExpression(expression);
      _this.keys = keys; // Index of children
      return _this;
    }
    _createClass(SwitchSelector, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1; // No running child
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (this.children.length === 0) {
          return ERROR$1;
        }
        var nodeMemory = this.getNodeMemory(_tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
          var key = _tick.evalExpression(this.expression);
          childIndex = this.keys.indexOf(key);
          if (childIndex === -1) {
            childIndex = this.keys.indexOf('default');
          }
          if (childIndex === -1) {
            return ERROR$1;
          }
        }
        var child = this.children[childIndex];
        var status = child._execute(_tick);
        nodeMemory.$runningChild = status === RUNNING$1 ? childIndex : -1;
        return status;
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child) {
          child._abort(tick);
          nodeMemory.$runningChild = -1;
        }
      }
    }]);
    return SwitchSelector;
  }(Composite);

  var WeightSelector = /*#__PURE__*/function (_Composite) {
    _inherits(WeightSelector, _Composite);
    var _super = _createSuper(WeightSelector);
    function WeightSelector() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$expression = _ref.expression,
        expression = _ref$expression === void 0 ? null : _ref$expression,
        _ref$weights = _ref.weights,
        weights = _ref$weights === void 0 ? undefined : _ref$weights,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'WeightSelector' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, WeightSelector);
      if (weights === undefined) {
        weights = [];
        var totalWeight = 0;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
          var child = children[i];
          var weight;
          if (child instanceof BaseNode || typeof child === 'string') {
            weight = 1;
          } else {
            weight = child.weight;
            children[i] = child.node;
          }
          weights.push(weight);
          totalWeight += weight;
        }
        for (var i = 0, cnt = weights.length; i < cnt; i++) {
          weights[i] /= totalWeight;
        }
      }
      _this = _super.call(this, {
        children: children,
        services: services,
        title: title,
        name: name,
        properties: {
          expression: expression,
          weights: weights
        }
      }, nodePool);
      _this.expression = expression ? _this.addExpression(expression) : null;
      _this.weights = weights;
      return _this;
    }
    _createClass(WeightSelector, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1; // No running child
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (this.children.length === 0) {
          return ERROR$1;
        }
        var nodeMemory = this.getNodeMemory(_tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
          var value = this.expression ? _tick.evalExpression(this.expression) : Math.random();
          // console.log(value);
          for (var i = 0, cnt = this.weights.length; i < cnt; i++) {
            value -= this.weights[i];
            if (value < 0) {
              childIndex = i;
              break;
            }
          }
        }
        var child = this.children[childIndex];
        var status = child._execute(_tick);
        nodeMemory.$runningChild = status === RUNNING$1 ? childIndex : -1;
        return status;
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child) {
          child._abort(tick);
          nodeMemory.$runningChild = -1;
        }
      }
    }]);
    return WeightSelector;
  }(Composite);

  var RandomSelector = /*#__PURE__*/function (_Composite) {
    _inherits(RandomSelector, _Composite);
    var _super = _createSuper(RandomSelector);
    function RandomSelector() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'RandomSelector' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, RandomSelector);
      return _super.call(this, {
        children: children,
        services: services,
        title: title,
        name: name
      }, nodePool);
    }
    _createClass(RandomSelector, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1; // No running child
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (this.children.length === 0) {
          return ERROR;
        }
        var nodeMemory = this.getNodeMemory(_tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
          childIndex = Math.floor(Math.random() * this.children.length);
        }
        var child = this.children[childIndex];
        var status = child._execute(_tick);
        nodeMemory.$runningChild = status === RUNNING ? childIndex : -1;
        return status;
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child) {
          child._abort(tick);
          nodeMemory.$runningChild = -1;
        }
      }
    }]);
    return RandomSelector;
  }(Composite);

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

  var ShuffleSelector = /*#__PURE__*/function (_Composite) {
    _inherits(ShuffleSelector, _Composite);
    var _super = _createSuper(ShuffleSelector);
    function ShuffleSelector() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        services = _ref.services,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'ShuffleSelector' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, ShuffleSelector);
      return _super.call(this, {
        children: children,
        services: services,
        title: title,
        name: name
      }, nodePool);
    }
    _createClass(ShuffleSelector, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = 0;
        if (!nodeMemory.$children) {
          nodeMemory.$children = this.children.map(function (child, index) {
            return index;
          });
        }
        Shuffle(nodeMemory.$children);
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (this.children.length === 0) {
          return ERROR$1;
        }
        var nodeMemory = this.getNodeMemory(_tick);
        var childIndex = nodeMemory.$runningChild;
        var children = nodeMemory.$children;
        var status;
        for (var i = childIndex, cnt = children.length; i < cnt; i++) {
          status = this.children[children[i]]._execute(_tick);
          if (status === RUNNING$1 || status === SUCCESS$1 || status === ABORT) {
            break;
          }
        }
        nodeMemory.$runningChild = status === RUNNING$1 ? i : -1;
        return status;
      }
    }, {
      key: "abortChildren",
      value: function abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child) {
          child._abort(tick);
          nodeMemory.$runningChild = -1;
        }
      }
    }]);
    return ShuffleSelector;
  }(Composite);

  var Bypass = /*#__PURE__*/function (_Decorator) {
    _inherits(Bypass, _Decorator);
    var _super = _createSuper(Bypass);
    function Bypass() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Bypass' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Bypass);
      return _super.call(this, {
        child: child,
        title: title,
        name: name
      }, nodePool);
    }
    _createClass(Bypass, [{
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }

        // Won't abort child
        var status = this.child._execute(_tick);
        return status;
      }
    }]);
    return Bypass;
  }(Decorator);

  var ForceSuccess = /*#__PURE__*/function (_Decorator) {
    _inherits(ForceSuccess, _Decorator);
    var _super = _createSuper(ForceSuccess);
    function ForceSuccess() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'ForceSuccess' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, ForceSuccess);
      return _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {}
      }, nodePool);
    }
    _createClass(ForceSuccess, [{
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }
        var status = this.child._execute(_tick);
        if (status === FAILURE) {
          return SUCCESS$1;
        }
        return status;
      }
    }]);
    return ForceSuccess;
  }(Decorator);

  var ForceFailure = /*#__PURE__*/function (_Decorator) {
    _inherits(ForceFailure, _Decorator);
    var _super = _createSuper(ForceFailure);
    function ForceFailure() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'ForceFailure' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, ForceFailure);
      return _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {}
      }, nodePool);
    }
    _createClass(ForceFailure, [{
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }
        var status = this.child._execute(_tick);
        if (status === SUCCESS$1) {
          return FAILURE;
        }
        return status;
      }
    }]);
    return ForceFailure;
  }(Decorator);

  var Invert = /*#__PURE__*/function (_Decorator) {
    _inherits(Invert, _Decorator);
    var _super = _createSuper(Invert);
    function Invert() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Invert' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Invert);
      return _super.call(this, {
        child: child,
        title: title,
        name: name
      }, nodePool);
    }
    _createClass(Invert, [{
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }
        var status = this.child._execute(_tick);
        if (status === SUCCESS$1) {
          status = FAILURE;
        } else if (status === FAILURE) {
          status = SUCCESS$1;
        }
        return status;
      }
    }]);
    return Invert;
  }(Decorator);

  var TimeLimit = /*#__PURE__*/function (_Decorator) {
    _inherits(TimeLimit, _Decorator);
    var _super = _createSuper(TimeLimit);
    function TimeLimit() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? 0 : _ref$duration,
        _ref$returnSuccess = _ref.returnSuccess,
        returnSuccess = _ref$returnSuccess === void 0 ? true : _ref$returnSuccess,
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'TimeLimit' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, TimeLimit);
      _this = _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {
          duration: duration,
          returnSuccess: returnSuccess
        }
      }, nodePool);
      _this.durationExpression = _this.addExpression(duration);
      _this.returnSuccess = returnSuccess;
      return _this;
    }
    _createClass(TimeLimit, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = tick.evalExpression(this.durationExpression);
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }

        // Abort child when timeout
        var nodeMemory = this.getNodeMemory(_tick);
        var currTime = _tick.currentTime;
        var startTime = nodeMemory.$startTime;
        var duration = nodeMemory.$duration;
        if (currTime - startTime >= duration) {
          return this.returnSuccess ? SUCCESS : FAILURE;
        }
        var status = this.child._execute(_tick);
        return status;
      }
    }]);
    return TimeLimit;
  }(Decorator);

  var Cooldown = /*#__PURE__*/function (_Decorator) {
    _inherits(Cooldown, _Decorator);
    var _super = _createSuper(Cooldown);
    function Cooldown() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? 0 : _ref$duration,
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Cooldown' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Cooldown);
      _this = _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {
          duration: duration
        }
      }, nodePool);
      _this.durationExpression = _this.addExpression(duration);
      return _this;
    }
    _createClass(Cooldown, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$cooldownTime = tick.evalExpression(this.durationExpression);
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }

        // Won't abort child
        var nodeMemory = this.getNodeMemory(_tick);
        var currTime = _tick.currentTime;
        var lastEndTime = nodeMemory.$lastEndTime;
        var cooldownTime = nodeMemory.$cooldownTime;

        // Open child after cooldown timeout
        if (lastEndTime !== undefined && currTime - lastEndTime < cooldownTime) {
          return FAILURE;
        }
        var status = this.child._execute(_tick);
        if (status === SUCCESS$1 || status === FAILURE || status === ABORT) {
          nodeMemory.$lastEndTime = currTime;
        }
        return status;
      }
    }]);
    return Cooldown;
  }(Decorator);

  var Repeat = /*#__PURE__*/function (_Decorator) {
    _inherits(Repeat, _Decorator);
    var _super = _createSuper(Repeat);
    function Repeat() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$maxLoop = _ref.maxLoop,
        maxLoop = _ref$maxLoop === void 0 ? -1 : _ref$maxLoop,
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Repeat' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Repeat);
      _this = _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {
          maxLoop: maxLoop
        }
      }, nodePool);
      _this.maxLoopExpression = _this.addExpression(maxLoop);
      return _this;
    }
    _createClass(Repeat, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
        nodeMemory.$i = 0;
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }
        var nodeMemory = this.getNodeMemory(_tick);
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;
        var status = SUCCESS$1;

        // Open child before exceed maxLoop
        // Execute child many times in a tick
        while (maxLoop < 0 || i < maxLoop) {
          status = this.child._execute(_tick);
          if (status === SUCCESS$1 || status === FAILURE) {
            i++;
          } else {
            break;
          }
        }
        nodeMemory.$i = i;
        return status;
      }
    }]);
    return Repeat;
  }(Decorator);

  var RepeatUntilFailure = /*#__PURE__*/function (_Decorator) {
    _inherits(RepeatUntilFailure, _Decorator);
    var _super = _createSuper(RepeatUntilFailure);
    function RepeatUntilFailure() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$maxLoop = _ref.maxLoop,
        maxLoop = _ref$maxLoop === void 0 ? -1 : _ref$maxLoop,
        _ref$returnSuccess = _ref.returnSuccess,
        returnSuccess = _ref$returnSuccess === void 0 ? false : _ref$returnSuccess,
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'RepeatUntilFailure' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, RepeatUntilFailure);
      _this = _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {
          returnSuccess: returnSuccess,
          maxLoop: maxLoop
        }
      }, nodePool);
      _this.maxLoopExpression = _this.addExpression(maxLoop);
      _this.returnSuccess = returnSuccess;
      return _this;
    }
    _createClass(RepeatUntilFailure, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
        nodeMemory.$i = 0;
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }

        // Won't abort child
        var nodeMemory = this.getNodeMemory(_tick);
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;
        var status = ERROR$1;

        // Open child before exceed maxLoop
        // Execute child many times in a tick
        while (maxLoop < 0 || i < maxLoop) {
          status = this.child._execute(_tick);
          if (status === SUCCESS$1) {
            i++;
          } else {
            break;
          }
        }
        nodeMemory.$i = i;
        if (status === this.FAILURE && this.returnSuccess) {
          status = SUCCESS$1;
        }
        return status;
      }
    }]);
    return RepeatUntilFailure;
  }(Decorator);

  var RepeatUntilSuccess = /*#__PURE__*/function (_Decorator) {
    _inherits(RepeatUntilSuccess, _Decorator);
    var _super = _createSuper(RepeatUntilSuccess);
    function RepeatUntilSuccess() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$maxLoop = _ref.maxLoop,
        maxLoop = _ref$maxLoop === void 0 ? -1 : _ref$maxLoop,
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'RepeatUntilSuccess' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, RepeatUntilSuccess);
      _this = _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {
          maxLoop: maxLoop
        }
      }, nodePool);
      _this.maxLoopExpression = _this.addExpression(maxLoop);
      return _this;
    }
    _createClass(RepeatUntilSuccess, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
        nodeMemory.$i = 0;
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }

        // Won't abort child
        var nodeMemory = this.getNodeMemory(_tick);
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;
        var status = ERROR$1;

        // Open child before exceed maxLoop
        // Execute child many times in a tick
        while (maxLoop < 0 || i < maxLoop) {
          status = this.child._execute(_tick);
          if (status === FAILURE) {
            i++;
          } else {
            break;
          }
        }
        nodeMemory.$i = i;
        return status;
      }
    }]);
    return RepeatUntilSuccess;
  }(Decorator);

  var Limiter = /*#__PURE__*/function (_Decorator) {
    _inherits(Limiter, _Decorator);
    var _super = _createSuper(Limiter);
    function Limiter() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$maxLoop = _ref.maxLoop,
        maxLoop = _ref$maxLoop === void 0 ? 1 : _ref$maxLoop,
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'Limiter' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, Limiter);
      _this = _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {
          maxLoop: maxLoop
        }
      }, nodePool);
      _this.maxLoopExpression = _this.addExpression(maxLoop);
      return _this;
    }
    _createClass(Limiter, [{
      key: "open",
      value: function open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
        nodeMemory.$i = 0;
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }

        // Won't abort child
        var nodeMemory = this.getNodeMemory(_tick);
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;

        // Open child before exceed maxLoop
        // Execute child 1 time in a tick
        if (i >= maxLoop) {
          return FAILURE;
        }
        var status = this.child._execute(_tick);
        if (status === SUCCESS$1 || status === FAILURE) {
          nodeMemory.$i = i + 1;
        }
        return status;
      }
    }]);
    return Limiter;
  }(Decorator);

  var If = /*#__PURE__*/function (_Decorator) {
    _inherits(If, _Decorator);
    var _super = _createSuper(If);
    function If() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$expression = _ref.expression,
        expression = _ref$expression === void 0 ? 'true' : _ref$expression,
        _ref$returnPending = _ref.returnPending,
        returnPending = _ref$returnPending === void 0 ? false : _ref$returnPending,
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'If' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, If);
      _this = _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {
          expression: expression,
          returnPending: returnPending
        }
      }, nodePool);
      _this.expression = _this.addBooleanExpression(expression);
      _this.returnPending = returnPending;
      return _this;
    }
    _createClass(If, [{
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }

        // child is not running
        if (!this.isChildRunning(_tick)) {
          // Return FAILURE to run next node
          if (!_tick.evalExpression(this.expression)) {
            return FAILURE;
          } else if (this.returnPending) {
            this.openChild(); // Open child but not run it now
            return PENDING;
          }
        }
        var status = this.child._execute(_tick);
        return status;
      }
    }]);
    return If;
  }(Decorator);

  var ContinueIf = /*#__PURE__*/function (_Decorator) {
    _inherits(ContinueIf, _Decorator);
    var _super = _createSuper(ContinueIf);
    function ContinueIf() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$expression = _ref.expression,
        expression = _ref$expression === void 0 ? 'true' : _ref$expression,
        _ref$returnSuccess = _ref.returnSuccess,
        returnSuccess = _ref$returnSuccess === void 0 ? true : _ref$returnSuccess,
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'ContinueIf' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, ContinueIf);
      _this = _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {
          expression: expression,
          returnSuccess: returnSuccess
        }
      }, nodePool);
      _this.expression = _this.addBooleanExpression(expression);
      _this.returnSuccess = returnSuccess;
      return _this;
    }
    _createClass(ContinueIf, [{
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }

        // child is running
        if (this.isChildRunning(_tick)) {
          // Abort child if eval result is false
          if (!_tick.evalExpression(this.expression)) {
            return this.returnSuccess ? SUCCESS$1 : FAILURE;
          }
        }
        var status = this.child._execute(_tick);
        return status;
      }
    }]);
    return ContinueIf;
  }(Decorator);

  var AbortIf = /*#__PURE__*/function (_Decorator) {
    _inherits(AbortIf, _Decorator);
    var _super = _createSuper(AbortIf);
    function AbortIf() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$expression = _ref.expression,
        expression = _ref$expression === void 0 ? 'true' : _ref$expression,
        _ref$returnSuccess = _ref.returnSuccess,
        returnSuccess = _ref$returnSuccess === void 0 ? true : _ref$returnSuccess,
        _ref$child = _ref.child,
        child = _ref$child === void 0 ? null : _ref$child,
        title = _ref.title,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'AbortIf' : _ref$name;
      var nodePool = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, AbortIf);
      _this = _super.call(this, {
        child: child,
        title: title,
        name: name,
        properties: {
          expression: expression,
          returnSuccess: returnSuccess
        }
      }, nodePool);
      _this.expression = _this.addBooleanExpression(expression);
      _this.returnSuccess = returnSuccess;
      return _this;
    }
    _createClass(AbortIf, [{
      key: "tick",
      value: function tick(_tick) {
        if (!this.child) {
          return ERROR$1;
        }

        // child is running
        if (this.isChildRunning(_tick)) {
          // Abort child if eval result is true
          if (_tick.evalExpression(this.expression)) {
            return this.returnSuccess ? SUCCESS$1 : FAILURE;
          }
        }
        var status = this.child._execute(_tick);
        return status;
      }
    }]);
    return AbortIf;
  }(Decorator);

  var Nodes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Abort: Abort,
    AbortIf: AbortIf,
    Action: Action,
    BaseNode: BaseNode,
    Bypass: Bypass,
    Composite: Composite,
    ContinueIf: ContinueIf,
    Cooldown: Cooldown,
    Decorator: Decorator,
    Error: Error$1,
    Failer: Failer,
    ForceFailure: ForceFailure,
    ForceSuccess: ForceSuccess,
    If: If,
    IfSelector: IfSelector,
    Invert: Invert,
    Limiter: Limiter,
    Parallel: Parallel,
    RandomSelector: RandomSelector,
    Repeat: Repeat,
    RepeatUntilFailure: RepeatUntilFailure,
    RepeatUntilSuccess: RepeatUntilSuccess,
    Runner: Runner,
    Selector: Selector,
    Sequence: Sequence,
    Service: Service,
    ShuffleSelector: ShuffleSelector,
    Succeeder: Succeeder,
    SwitchSelector: SwitchSelector,
    TimeLimit: TimeLimit,
    Wait: Wait,
    WeightSelector: WeightSelector
  });

  var Load = function Load(data, names) {
    var sn = data.sn;
    if (sn != null) {
      SetSerialNumber(Math.max(GetSerialNumber(), sn));
    }
    names = names || {};
    this.title = data.title || this.title;
    this.description = data.description || this.description;
    this.properties = data.properties || this.properties;
    var nodeData = data.nodes;
    var nodes = {};
    for (var i = nodeData.length - 1; i >= 0; i--) {
      // Create nodes from bottom to top
      var spec = nodeData[i],
        className = spec.name;
      var Cls;
      if (className in names) {
        // Look for the name in custom nodes
        Cls = names[className];
      } else if (className in Nodes) {
        // Look for the name in default nodes
        Cls = Nodes[className];
      } else {
        // Invalid node name
        throw new EvalError("BehaviorTree.load: Invalid node name \"".concat(className, "\"."));
      }
      var config = {};
      if (spec.hasOwnProperty('children')) {
        config.children = spec.children;
      }
      if (spec.hasOwnProperty('child')) {
        config.child = spec.child;
      }
      if (spec.hasOwnProperty('services')) {
        config.services = spec.services;
      }
      config = Object.assign(config, spec.properties);
      var node = new Cls(config, nodes);
      node.id = spec.id || node.id;
      node.title = spec.title || node.title;
      node.description = spec.description || node.description;
      node.properties = spec.properties || node.properties;
      nodes[node.id] = node;
    }
    this.root = nodes[data.root];
    return this;
  };

  var Tick = /*#__PURE__*/function () {
    function Tick() {
      _classCallCheck(this, Tick);
      // set by BehaviorTree

      this.tree = null;
      this.blackboard = null;
      this.target = null;

      // updated during the tick signal

      this._openNodes = []; // Open nodes of current tick

      this._nodeCount = 0;
      this._currentNode = null;
    }

    // Set members
    _createClass(Tick, [{
      key: "setTree",
      value: function setTree(tree) {
        this.tree = tree;
        return this;
      }
    }, {
      key: "setBlackBoard",
      value: function setBlackBoard(blackboard) {
        this.blackboard = blackboard;
        return this;
      }
    }, {
      key: "setTarget",
      value: function setTarget(target) {
        this.target = target;
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this._openNodes.length = 0;
        this._nodeCount = 0;
        return this;
      }
    }, {
      key: "getGlobalMemory",
      value: function getGlobalMemory() {
        return this.blackboard.getGlobalMemory();
      }
    }, {
      key: "getTreeMemory",
      value: function getTreeMemory() {
        return this.blackboard.getTreeMemory(this.tree.id);
      }
    }, {
      key: "getNodeMemory",
      value: function getNodeMemory(nodeID) {
        return this.blackboard.getNodeMemory(this.tree.id, nodeID);
      }
    }, {
      key: "currentTime",
      get: function get() {
        if (this.blackboard.has(CURRENT_TIME)) {
          // Inject current-time through blackboard
          return this.blackboard.get(CURRENT_TIME);
        } else {
          return new Date().getTime();
        }
      }
    }, {
      key: "evalExpression",
      value: function evalExpression(expression) {
        return expression.eval(this.blackboard.getGlobalMemory());
      }
    }, {
      key: "_enterNode",
      value: function _enterNode(node) {
        this._nodeCount++;
        this._openNodes.push(node);
        this._currentNode = node;
      }
    }, {
      key: "_openNode",
      value: function _openNode(node) {
        this._currentNode = node;
      }
    }, {
      key: "_tickNode",
      value: function _tickNode(node) {
        this._currentNode = node;
      }
    }, {
      key: "_closeNode",
      value: function _closeNode(node) {
        Remove(this._openNodes, node);
        this._currentNode = node;
      }
    }, {
      key: "_exitNode",
      value: function _exitNode(node) {
        this._currentNode = node;
      }
    }]);
    return Tick;
  }();

  var BehaviorTree = /*#__PURE__*/function () {
    function BehaviorTree() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref.id,
        title = _ref.title,
        description = _ref.description,
        properties = _ref.properties,
        _ref$root = _ref.root,
        root = _ref$root === void 0 ? null : _ref$root;
      _classCallCheck(this, BehaviorTree);
      if (id === undefined) {
        id = CreateID();
      }
      this.id = id;
      this.category = TREE;
      this.title = title || '';
      this.description = description || '';
      this.properties = properties || {};
      this._root = root;
      this.ticker = new Tick();
    }
    _createClass(BehaviorTree, [{
      key: "setTitle",
      value: function setTitle(title) {
        this.title = title;
        return this;
      }
    }, {
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "setDescription",
      value: function setDescription(description) {
        this.description = description;
        return this;
      }
    }, {
      key: "setRoot",
      value: function setRoot(node) {
        this.root = node;
        return this;
      }
    }, {
      key: "getRoot",
      value: function getRoot() {
        return this.root;
      }
    }, {
      key: "root",
      get: function get() {
        return this._root;
      },
      set: function set(node) {
        if (node) {
          this._root = node;
          node.setParent(this);
        } else {
          if (this._root) {
            this._root.setParent(null);
          }
          this._root = null;
        }
      }
    }, {
      key: "forEachNode",
      value: function forEachNode(callback, scope) {
        BreadthFirstSearch(this.root, callback, scope);
        return this;
      }
    }, {
      key: "getAllNodes",
      value: function getAllNodes(out) {
        if (out === undefined) {
          out = [];
        }
        this.forEachNode(function (node) {
          out.push(node);
        });
        return out;
      }
    }, {
      key: "getChildrenNodes",
      value: function getChildrenNodes(parent, out) {
        if (parent === undefined) {
          parent = this.root;
        }
        if (out === undefined) {
          out = [];
        }
        BreadthFirstSearch(parent, function (node) {
          out.push(node);
        });
        return out;
      }
    }, {
      key: "tick",
      value: function tick(blackboard, target) {
        if (!blackboard) {
          throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
        }
        var ticker = this.ticker;
        ticker.setBlackBoard(blackboard).setTree(this).setTarget(target).reset();

        /* TICK NODE */
        var state = this.root._execute(ticker);

        /* POPULATE BLACKBOARD */
        // blackboard.set('$openNodes', ticker._openNodes.slice(0), this.id);
        // blackboard.set('$nodeCount', ticker._nodeCount, this.id);
        blackboard.set(TREE_STATE, state, this.id);
        return state;
      }
    }, {
      key: "abort",
      value: function abort(blackboard, target) {
        if (!blackboard) {
          throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
        }
        var ticker = this.ticker;
        ticker.setBlackBoard(blackboard).setTree(this).setTarget(target).reset();

        /* ABORT NODE */
        this.root.abortChildren(ticker);

        /* POPULATE BLACKBOARD */
        blackboard.set(TREE_STATE, IDLE$1, this.id);
        return IDLE$1;
      }
    }, {
      key: "getState",
      value: function getState(blackboard) {
        return blackboard.get(TREE_STATE, this.id);
      }
    }, {
      key: "resetState",
      value: function resetState(blackboard) {
        blackboard.set(TREE_STATE, IDLE$1, this.id);
        return this;
      }
    }], [{
      key: "setStartIDValue",
      value: function setStartIDValue(value) {
        SetSerialNumber(value);
      }
    }, {
      key: "getSerialNumber",
      value: function getSerialNumber() {
        return GetSerialNumber();
      }
    }, {
      key: "setSerialIDPrefix",
      value: function setSerialIDPrefix(prefix) {
        SetSerialNumberPrefix(prefix);
      }
    }]);
    return BehaviorTree;
  }();
  var Methods$4 = {
    dump: Dump,
    load: Load
  };
  Object.assign(BehaviorTree.prototype, Methods$4);

  var Blackboard$1 = /*#__PURE__*/function () {
    function Blackboard() {
      _classCallCheck(this, Blackboard);
      this._baseMemory = {};
      this._treeMemory = {};

      // Global memory : this._baseMemory
      // Tree memory : this._treeMemory[treeID]
      // Node memory : this._treeMemory[treeID].nodeMemory[nodeID]
    }
    _createClass(Blackboard, [{
      key: "_getTreeMemory",
      value: function _getTreeMemory(treeID) {
        if (!this._treeMemory[treeID]) {
          this._treeMemory[treeID] = {
            'nodeMemory': {}
          };
        }
        return this._treeMemory[treeID];
      }
    }, {
      key: "_getNodeMemory",
      value: function _getNodeMemory(treeMemory, nodeID) {
        var memory = treeMemory.nodeMemory;
        if (!memory[nodeID]) {
          memory[nodeID] = {};
        }
        return memory[nodeID];
      }
    }, {
      key: "_getMemory",
      value: function _getMemory(treeID, nodeID) {
        var memory;
        if (treeID !== undefined) {
          memory = this._getTreeMemory(treeID);
          if (nodeID !== undefined) {
            memory = this._getNodeMemory(memory, nodeID);
          }
        } else {
          memory = this._baseMemory;
        }
        return memory;
      }
    }, {
      key: "set",
      value: function set(key, value, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);
        memory[key] = value;
        return this;
      }
    }, {
      key: "setData",
      value: function setData(key, value, treeID, nodeID) {
        return this.set(key, value, treeID, nodeID);
      }
    }, {
      key: "get",
      value: function get(key, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);
        return memory[key];
      }
    }, {
      key: "getData",
      value: function getData(key, treeID, nodeID) {
        return this.get(key, treeID, nodeID);
      }
    }, {
      key: "has",
      value: function has(key, treeID, nodeID) {
        var memory;
        if (treeID !== undefined) {
          memory = this._treeMemory[treeID];
          if (memory && nodeID !== undefined) {
            memory = treeMemory.nodeMemory[nodeID];
          }
        } else {
          memory = this._baseMemory;
        }
        if (memory) {
          return memory.hasOwnProperty(key);
        } else {
          return false;
        }
      }
    }, {
      key: "hasData",
      value: function hasData(key, treeID, nodeID) {
        return this.has(key, treeID, nodeID);
      }
    }, {
      key: "inc",
      value: function inc(key, _inc, treeID, nodeID) {
        var value;
        if (this.has(key, treeID, nodeID)) {
          value = 0;
        } else {
          value = this.get(key, treeID, nodeID);
        }
        value += _inc;
        this.set(key, value, treeID, nodeID);
        return this;
      }
    }, {
      key: "incData",
      value: function incData(key, inc, treeID, nodeID) {
        return this.inc(key, inc, treeID, nodeID);
      }
    }, {
      key: "toggle",
      value: function toggle(key, treeID, nodeID) {
        var value;
        if (this.has(key, treeID, nodeID)) {
          value = false;
        } else {
          value = this.get(key, treeID, nodeID);
        }
        value = !value;
        this.set(key, value, treeID, nodeID);
        return this;
      }
    }, {
      key: "toggleData",
      value: function toggleData(key, treeID, nodeID) {
        return this.toggle(key, treeID, nodeID);
      }
    }, {
      key: "removeTree",
      value: function removeTree(treeID) {
        if (this._treeMemory[treeID]) {
          delete this._treeMemory[treeID];
        }
        return this;
      }
    }, {
      key: "removeTreeData",
      value: function removeTreeData(treeID) {
        return this.removeTree(treeID);
      }
    }, {
      key: "removeNode",
      value: function removeNode(treeID, nodeID) {
        var treeMemory = this._treeMemory[treeID];
        if (treeMemory && treeMemory.nodeMemory[nodeID]) {
          delete treeMemory.nodeMemory[nodeID];
        }
        return this;
      }
    }, {
      key: "removeNodeData",
      value: function removeNodeData(treeID, nodeID) {
        return this.removeNode(treeID, nodeID);
      }
    }, {
      key: "getGlobalMemory",
      value: function getGlobalMemory() {
        return this._baseMemory;
      }
    }, {
      key: "getTreeMemory",
      value: function getTreeMemory(treeID) {
        return this._getTreeMemory(treeID);
      }
    }, {
      key: "getNodeMemory",
      value: function getNodeMemory(treeID, nodeID) {
        return this._getNodeMemory(this._getTreeMemory(treeID), nodeID);
      }
    }, {
      key: "dump",
      value: function dump() {
        return {
          base: DeepClone(this._baseMemory),
          tree: DeepClone(this._treeMemory)
        };
      }
    }, {
      key: "load",
      value: function load(data) {
        this._baseMemory = DeepClone(data.base);
        this._treeMemory = DeepClone(data.tree);
        return this;
      }
    }]);
    return Blackboard;
  }();

  var Blackboard = /*#__PURE__*/function (_Base) {
    _inherits(Blackboard, _Base);
    var _super = _createSuper(Blackboard);
    function Blackboard() {
      _classCallCheck(this, Blackboard);
      return _super.apply(this, arguments);
    }
    _createClass(Blackboard, [{
      key: "getTreeState",
      value: function getTreeState(treeID) {
        return this.get(TREE_STATE, treeID);
      }
    }, {
      key: "setTreeState",
      value: function setTreeState(treeID, state) {
        this.set(TREE_STATE, state, treeID);
        return this;
      }
    }, {
      key: "setCurrentTime",
      value: function setCurrentTime(time) {
        this.set(CURRENT_TIME, time);
      }
    }]);
    return Blackboard;
  }(Blackboard$1);

  var IsEventEmitter = function IsEventEmitter(obj) {
    if (obj && _typeof(obj) === 'object') {
      return !!obj.on;
    }
    return false;
  };

  var TaskAction = /*#__PURE__*/function (_Action) {
    _inherits(TaskAction, _Action);
    var _super = _createSuper(TaskAction);
    function TaskAction(config) {
      var _this;
      _classCallCheck(this, TaskAction);
      // config: {name, parameters:{...} }        
      _this = _super.call(this, {
        name: 'TaskAction',
        title: config.name,
        properties: config
      });
      _this.isRunning = false;
      return _this;
    }
    _createClass(TaskAction, [{
      key: "open",
      value: function open(tick) {
        this.isRunning = false;
        var taskData = this.properties;
        var taskName = taskData.name;
        if (!taskName) {
          return;
        }
        var treeManager = tick.blackboard.treeManager;
        var taskParameters = DeepClone(taskData.parameters);
        var commandExecutor = tick.target;
        var eventEmitter;
        var handler = commandExecutor[taskName];
        if (handler) {
          eventEmitter = handler.call(commandExecutor, taskParameters, treeManager);
        } else {
          handler = commandExecutor.defaultHandler;
          if (handler) {
            eventEmitter = handler.call(commandExecutor, taskName, taskParameters, treeManager);
          }
        }
        if (IsEventEmitter(eventEmitter)) {
          this.isRunning = true;
          eventEmitter.once('complete', this.onTaskComplete, this);
          this.continueCallback = treeManager["continue"].bind(treeManager);
          this.continueEE = eventEmitter;
        }
      }
    }, {
      key: "onTaskComplete",
      value: function onTaskComplete() {
        this.isRunning = false;
        this.continueEE = undefined;
        this.continueCallback();
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        return this.isRunning ? this.RUNNING : this.SUCCESS;
      }
    }, {
      key: "close",
      value: function close(tick) {}
    }, {
      key: "abort",
      value: function abort(tick) {
        if (this.continueEE) {
          this.continueEE.off('complete', this.onTaskComplete, this);
          this.continueEE = undefined;
        }
      }
    }]);
    return TaskAction;
  }(Action);

  var CustomNodeMapping = {
    TaskAction: TaskAction
  };

  var TreeMethods = {
    // Override it
    addEventSheet: function addEventSheet(s, config) {},
    addTree: function addTree(tree) {
      this.trees.push(tree);
      return this;
    },
    getTreeState: function getTreeState(tree) {
      var treeID = typeof tree === 'string' ? tree : tree.id;
      return this.blackboard.getTreeState(treeID);
    },
    clearAllEventSheets: function clearAllEventSheets() {
      this.trees.forEach(function (tree) {
        this.blackboard.removeTreeData(tree.id);
      }, this);
      this.trees.length = 0;
      this.pendingTrees.length = 0;
      return this;
    },
    getEventSheetTitleList: function getEventSheetTitleList(out) {
      if (out === undefined) {
        out = [];
      }
      this.trees.forEach(function (tree) {
        out.push(tree.title);
      });
      return out;
    },
    removeEventSheet: function removeEventSheet(title) {
      var removedTrees = [];
      this.trees.forEach(function (tree) {
        if (!tree.title === title) {
          return;
        }
        var status = this.getTreeState(tree);
        if (status === RUNNING$1) {
          // Can't remove RUNNING tree
          return;
        }
        removedTrees.push(tree);
        this.blackboard.removeTreeData(tree.id);
      }, this);
      if (removedTrees.length > 0) {
        Remove(this.trees, removedTrees);
        Remove(this.pendingTrees, removedTrees);
      }
      return this;
    },
    dumpTrees: function dumpTrees() {
      return this.trees.map(function (tree) {
        return tree.dump();
      });
    },
    loadTrees: function loadTrees(data) {
      data.forEach(function (treeData) {
        var tree = new BehaviorTree({
          id: treeData.id,
          title: treeData.title,
          properties: DeepClone(treeData.properties)
        });
        tree.load(treeData, CustomNodeMapping);
        this.trees.push(tree);
      }, this);
      return this;
    }
  };

  var DataMethods$2 = {
    setData: function setData(key, value) {
      this.blackboard.setData(key, value);
      return this;
    },
    hasData: function hasData(key) {
      return this.blackboard.hasData(key);
    },
    incData: function incData(key, inc) {
      this.blackboard.incData(key, inc);
      return this;
    },
    toggleData: function toggleData(key) {
      this.blackboard.toggleData(key);
      return this;
    },
    getData: function getData(key) {
      return this.blackboard.getData(key);
    }
  };

  var StateMethods = {
    dumpState: function dumpState(includeTree) {
      if (includeTree === undefined) {
        includeTree = false;
      }
      var state = {
        blackboard: this.blackboard.dump(),
        isRunning: this.isRunning,
        pendingTrees: this.pendingTrees.map(function (tree) {
          return tree.id;
        })
      };
      if (includeTree) {
        state.trees = this.dumpTrees();
      }
      return state;
    },
    loadState: function loadState(state) {
      this.stop();
      if (state.trees) {
        this.trees.length = 0;
        this.loadTrees(state.trees);
      }
      this.blackboard.load(state.blackboard);
      this.isRunning = state.isRunning;
      var pendingTrees = this.pendingTrees;
      pendingTrees.length = 0;
      this.trees.forEach(function (tree) {
        if (state.pendingTrees.indexOf(tree.id) > -1) {
          pendingTrees.push(tree);
        }
      });
      if (this.isRunning) {
        this["continue"]();
      }
      return this;
    }
  };

  /*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  /**
   * Safe way of detecting whether or not the given thing is a primitive and
   * whether it has the given property
   */
  function primitiveHasOwnProperty (primitive, propName) {
    return (
      primitive != null
      && typeof primitive !== 'object'
      && primitive.hasOwnProperty
      && primitive.hasOwnProperty(propName)
    );
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   *
   * Tokens for partials also contain two more elements: 1) a string value of
   * indendation prior to that tag and 2) the index of that tag on that line -
   * eg a value of 2 indicates the partial is the third tag on this line.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];
    var lineHasNonSpace = false;
    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?
    var indentation = '';  // Tracks indentation for tags that use it
    var tagIndex = 0;      // Stores a count of number of tags encountered on a line

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
            indentation += chr;
          } else {
            nonSpace = true;
            lineHasNonSpace = true;
            indentation += ' ';
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
            indentation = '';
            tagIndex = 0;
            lineHasNonSpace = false;
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      if (type == '>') {
        token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
      } else {
        token = [ type, value, start, scanner.pos ];
      }
      tagIndex++;
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    stripSpace();

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, intermediateValue, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          intermediateValue = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           *
           * In the case where dot notation is used, we consider the lookup
           * to be successful even if the last "object" in the path is
           * not actually an object but a primitive (e.g., a string, or an
           * integer), because it is sometimes useful to access a property
           * of an autoboxed primitive, such as the length of a string.
           **/
          while (intermediateValue != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = (
                hasProperty(intermediateValue, names[index])
                || primitiveHasOwnProperty(intermediateValue, names[index])
              );

            intermediateValue = intermediateValue[names[index++]];
          }
        } else {
          intermediateValue = context.view[name];

          /**
           * Only checking against `hasProperty`, which always returns `false` if
           * `context.view` is not an object. Deliberately omitting the check
           * against `primitiveHasOwnProperty` if dot notation is not used.
           *
           * Consider this example:
           * ```
           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
           * ```
           *
           * If we were to check also against `primitiveHasOwnProperty`, as we do
           * in the dot notation case, then render call would return:
           *
           * "The length of a football field is 9."
           *
           * rather than the expected:
           *
           * "The length of a football field is 100 yards."
           **/
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) {
          value = intermediateValue;
          break;
        }

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.templateCache = {
      _cache: {},
      set: function set (key, value) {
        this._cache[key] = value;
      },
      get: function get (key) {
        return this._cache[key];
      },
      clear: function clear () {
        this._cache = {};
      }
    };
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    if (typeof this.templateCache !== 'undefined') {
      this.templateCache.clear();
    }
  };

  /**
   * Parses and caches the given `template` according to the given `tags` or
   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.templateCache;
    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
    var isCacheEnabled = typeof cache !== 'undefined';
    var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

    if (tokens == undefined) {
      tokens = parseTemplate(template, tags);
      isCacheEnabled && cache.set(cacheKey, tokens);
    }
    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   *
   * If the optional `config` argument is given here, then it should be an
   * object with a `tags` attribute or an `escape` attribute or both.
   * If an array is passed, then it will be interpreted the same way as
   * a `tags` attribute on a `config` object.
   *
   * The `tags` attribute of a `config` object must be an array with two
   * string values: the opening and closing tags used in the template (e.g.
   * [ "<%", "%>" ]). The default is to mustache.tags.
   *
   * The `escape` attribute of a `config` object must be a function which
   * accepts a string as input and outputs a safely escaped string.
   * If an `escape` function is not provided, then an HTML-safe string
   * escaping function is used as the default.
   */
  Writer.prototype.render = function render (template, view, partials, config) {
    var tags = this.getConfigTags(config);
    var tokens = this.parse(template, tags);
    var context = (view instanceof Context) ? view : new Context(view, undefined);
    return this.renderTokens(tokens, context, partials, template, config);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context, config);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials, config);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate, config);
  };

  Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
    var filteredIndentation = indentation.replace(/[^ \t]/g, '');
    var partialByNl = partial.split('\n');
    for (var i = 0; i < partialByNl.length; i++) {
      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
        partialByNl[i] = filteredIndentation + partialByNl[i];
      }
    }
    return partialByNl.join('\n');
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
    if (!partials) return;
    var tags = this.getConfigTags(config);

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) {
      var lineHasNonSpace = token[6];
      var tagIndex = token[5];
      var indentation = token[4];
      var indentedValue = value;
      if (tagIndex == 0 && indentation) {
        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
      }
      var tokens = this.parse(indentedValue, tags);
      return this.renderTokens(tokens, context, partials, indentedValue, config);
    }
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context, config) {
    var escape = this.getConfigEscape(config) || mustache.escape;
    var value = context.lookup(token[1]);
    if (value != null)
      return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  Writer.prototype.getConfigTags = function getConfigTags (config) {
    if (isArray(config)) {
      return config;
    }
    else if (config && typeof config === 'object') {
      return config.tags;
    }
    else {
      return undefined;
    }
  };

  Writer.prototype.getConfigEscape = function getConfigEscape (config) {
    if (config && typeof config === 'object' && !isArray(config)) {
      return config.escape;
    }
    else {
      return undefined;
    }
  };

  var mustache = {
    name: 'mustache.js',
    version: '4.2.0',
    tags: [ '{{', '}}' ],
    clearCache: undefined,
    escape: undefined,
    parse: undefined,
    render: undefined,
    Scanner: undefined,
    Context: undefined,
    Writer: undefined,
    /**
     * Allows a user to override the default caching strategy, by providing an
     * object with set, get and clear methods. This can also be used to disable
     * the cache by setting it to the literal `undefined`.
     */
    set templateCache (cache) {
      defaultWriter.templateCache = cache;
    },
    /**
     * Gets the default or overridden caching object from the default writer.
     */
    get templateCache () {
      return defaultWriter.templateCache;
    }
  };

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view`, `partials`, and `config`
   * using the default writer.
   */
  mustache.render = function render (template, view, partials, config) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials, config);
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  var ValueConvertMethods = {
    evalExpression: function evalExpression(expression) {
      if (typeof expression === 'number') {
        return expression;
      }
      return Compile$1(expression)(this.memory);
    },
    renderString: function renderString(template) {
      return mustache.render(template, this.memory);
    }
  };

  var RunMethods = {
    start: function start() {
      if (this.isRunning) {
        return this;
      }
      this.isRunning = true;
      var trees = this.trees;
      var pendingTrees = this.pendingTrees;
      var blackboard = this.blackboard;
      var commandExecutor = this.commandExecutor;
      pendingTrees.length = 0;

      // Run parallel tree, will return pending, or failure
      for (var i = 0, cnt = trees.length; i < cnt; i++) {
        var tree = trees[i];
        tree.resetState(blackboard);
        if (tree.isParallel) {
          var status = tree.tick(blackboard, commandExecutor);
          if (status === PENDING) {
            pendingTrees.push(tree);
          }
        } else {
          pendingTrees.push(tree);
        }
      }
      this["continue"]();
      return this;
    },
    "continue": function _continue() {
      if (!this.isRunning) {
        return this;
      }
      var trees = this.pendingTrees;
      var closedTrees = this.closedTrees;
      var blackboard = this.blackboard;
      var commandExecutor = this.commandExecutor;
      closedTrees.length = 0;
      for (var i = 0, cnt = trees.length; i < cnt; i++) {
        var tree = trees[i];
        var status = blackboard.getTreeState(tree.id);
        if (status === IDLE$1) {
          // Will goto PENDING, or FAILURE/ERROR state
          status = tree.tick(blackboard, commandExecutor);
        }
        var eventConditionPassed = tree.eventConditionPassed;
        if (status === PENDING) {
          if (eventConditionPassed) {
            this.emit('eventsheet.enter', tree.title, this);
          } else {
            this.emit('eventsheet.catch', tree.title, this);
          }
        }
        if (!this.isRunning) {
          // Can break here
          break;
        }

        // Will goto RUNNING, or SUCCESS/FAILURE/ERROR state
        status = tree.tick(blackboard, commandExecutor);
        if (status === RUNNING$1) {
          break;
        } else {
          closedTrees.push(tree);
          if (eventConditionPassed) {
            this.emit('eventsheet.exit', tree.title, this);
          }
        }
        if (!this.isRunning) {
          // Can break here
          break;
        }
      }
      if (closedTrees.length > 0) {
        Remove(trees, closedTrees);
      }
      if (trees.length === 0) {
        this.isRunning = false;
        this.emit('complete', this);
      }
      return this;
    },
    stop: function stop() {
      this.isRunning = false;
      var blackboard = this.blackboard;
      var commandExecutor = this.commandExecutor;
      this.pendingTrees.forEach(function (tree) {
        tree.abort(blackboard, commandExecutor);
      });
      this.pendingTrees.length = 0;
      return this;
    },
    getContinueCallback: function getContinueCallback() {
      var self = this;
      return function () {
        self["continue"]();
      };
    }
  };

  BehaviorTree.setStartIDValue(0);
  var EventSheetTrees = /*#__PURE__*/function (_EventEmitter) {
    _inherits(EventSheetTrees, _EventEmitter);
    var _super = _createSuper(EventSheetTrees);
    function EventSheetTrees() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        commandExecutor = _ref.commandExecutor,
        _ref$parallel = _ref.parallel,
        parallel = _ref$parallel === void 0 ? false : _ref$parallel;
      _classCallCheck(this, EventSheetTrees);
      _this = _super.call(this);
      _this.setCommandExecutor(commandExecutor);
      _this.parallel = parallel;
      _this.blackboard = new Blackboard();
      _this.blackboard.treeManager = _assertThisInitialized(_this); // For TaskAction

      _this.trees = [];
      _this.pendingTrees = [];
      _this.closedTrees = []; // Temporary tree array

      _this.isRunning = false;
      _this._threadKey = null;
      return _this;
    }
    _createClass(EventSheetTrees, [{
      key: "memory",
      get: function get() {
        return this.blackboard.getGlobalMemory();
      }
    }, {
      key: "setCommandExecutor",
      value: function setCommandExecutor(commandExecutor) {
        this.commandExecutor = commandExecutor;
        return this;
      }
    }]);
    return EventSheetTrees;
  }(EventEmitter$2);
  Object.assign(EventSheetTrees.prototype, TreeMethods, DataMethods$2, StateMethods, ValueConvertMethods, RunMethods);

  var EventBehaviorTree = /*#__PURE__*/function (_BehaviorTree) {
    _inherits(EventBehaviorTree, _BehaviorTree);
    var _super = _createSuper(EventBehaviorTree);
    function EventBehaviorTree(config) {
      var _this;
      _classCallCheck(this, EventBehaviorTree);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, config);
      var _config = config,
        _config$parallel = _config.parallel,
        parallel = _config$parallel === void 0 ? false : _config$parallel;
      _this.properties.parallel = parallel;
      var _config2 = config,
        _config2$condition = _config2.condition,
        condition = _config2$condition === void 0 ? 'true' : _config2$condition;
      var root = new IfSelector({
        title: _this.title,
        expression: condition,
        returnPending: true // Always return PENDING instead of RUNNING, or SUCCESS
      });

      _this.setRoot(root);
      return _this;
    }
    _createClass(EventBehaviorTree, [{
      key: "isParallel",
      get: function get() {
        return this.properties.parallel;
      }
    }, {
      key: "eventConditionPassed",
      get: function get() {
        var nodeMemory = this.root.getNodeMemory(this.ticker);
        return nodeMemory.$runningChild === 0;
      }
    }]);
    return EventBehaviorTree;
  }(BehaviorTree);

  var marked_min = {exports: {}};

  (function (module, exports) {
    !function (e, t) {
      t(exports) ;
    }(commonjsGlobal, function (r) {

      function i(e, t) {
        for (var u = 0; u < t.length; u++) {
          var n = t[u];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, function (e) {
            e = function (e, t) {
              if ("object" != _typeof(e) || null === e) return e;
              var u = e[Symbol.toPrimitive];
              if (void 0 === u) return ("string" === t ? String : Number)(e);
              u = u.call(e, t || "default");
              if ("object" != _typeof(u)) return u;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }(e, "string");
            return "symbol" == _typeof(e) ? e : String(e);
          }(n.key), n);
        }
      }
      function d() {
        return (d = Object.assign ? Object.assign.bind() : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var u,
              n = arguments[t];
            for (u in n) Object.prototype.hasOwnProperty.call(n, u) && (e[u] = n[u]);
          }
          return e;
        }).apply(this, arguments);
      }
      function s(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var u = 0, n = new Array(t); u < t; u++) n[u] = e[u];
        return n;
      }
      function D(e, t) {
        var u,
          n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (n) return (n = n.call(e)).next.bind(n);
        if (Array.isArray(e) || (n = function (e, t) {
          var u;
          if (e) return "string" == typeof e ? s(e, t) : "Map" === (u = "Object" === (u = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : u) || "Set" === u ? Array.from(e) : "Arguments" === u || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u) ? s(e, t) : void 0;
        }(e)) || t && e && "number" == typeof e.length) return n && (e = n), u = 0, function () {
          return u >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[u++]
          };
        };
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function e() {
        return {
          async: !1,
          baseUrl: null,
          breaks: !1,
          extensions: null,
          gfm: !0,
          headerIds: !0,
          headerPrefix: "",
          highlight: null,
          hooks: null,
          langPrefix: "language-",
          mangle: !0,
          pedantic: !1,
          renderer: null,
          sanitize: !1,
          sanitizer: null,
          silent: !1,
          smartypants: !1,
          tokenizer: null,
          walkTokens: null,
          xhtml: !1
        };
      }
      r.defaults = e();
      function u(e) {
        return t[e];
      }
      var n = /[&<>"']/,
        a = new RegExp(n.source, "g"),
        o = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        l = new RegExp(o.source, "g"),
        t = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
      function A(e, t) {
        if (t) {
          if (n.test(e)) return e.replace(a, u);
        } else if (o.test(e)) return e.replace(l, u);
        return e;
      }
      var c = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
      function m(e) {
        return e.replace(c, function (e, t) {
          return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "";
        });
      }
      var p = /(^|[^\[])\^/g;
      function h(u, e) {
        u = "string" == typeof u ? u : u.source, e = e || "";
        var n = {
          replace: function replace(e, t) {
            return t = (t = t.source || t).replace(p, "$1"), u = u.replace(e, t), n;
          },
          getRegex: function getRegex() {
            return new RegExp(u, e);
          }
        };
        return n;
      }
      var j = /[^\w:]/g,
        Z = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
      function f(e, t, u) {
        if (e) {
          try {
            n = decodeURIComponent(m(u)).replace(j, "").toLowerCase();
          } catch (e) {
            return null;
          }
          if (0 === n.indexOf("javascript:") || 0 === n.indexOf("vbscript:") || 0 === n.indexOf("data:")) return null;
        }
        var n;
        t && !Z.test(u) && (e = u, g[" " + (n = t)] || (O.test(n) ? g[" " + n] = n + "/" : g[" " + n] = C(n, "/", !0)), t = -1 === (n = g[" " + n]).indexOf(":"), u = "//" === e.substring(0, 2) ? t ? e : n.replace(q, "$1") + e : "/" === e.charAt(0) ? t ? e : n.replace(P, "$1") + e : n + e);
        try {
          u = encodeURI(u).replace(/%25/g, "%");
        } catch (e) {
          return null;
        }
        return u;
      }
      var g = {},
        O = /^[^:]+:\/*[^/]*$/,
        q = /^([^:]+:)[\s\S]*$/,
        P = /^([^:]+:\/*[^/]*)[\s\S]*$/;
      var F = {
        exec: function exec() {}
      };
      function k(e, t) {
        var u = e.replace(/\|/g, function (e, t, u) {
            for (var n = !1, r = t; 0 <= --r && "\\" === u[r];) n = !n;
            return n ? "|" : " |";
          }).split(/ \|/),
          n = 0;
        if (u[0].trim() || u.shift(), 0 < u.length && !u[u.length - 1].trim() && u.pop(), u.length > t) u.splice(t);else for (; u.length < t;) u.push("");
        for (; n < u.length; n++) u[n] = u[n].trim().replace(/\\\|/g, "|");
        return u;
      }
      function C(e, t, u) {
        var n = e.length;
        if (0 === n) return "";
        for (var r = 0; r < n;) {
          var i = e.charAt(n - r - 1);
          if ((i !== t || u) && (i === t || !u)) break;
          r++;
        }
        return e.slice(0, n - r);
      }
      function E(e, t) {
        if (t < 1) return "";
        for (var u = ""; 1 < t;) 1 & t && (u += e), t >>= 1, e += e;
        return u + e;
      }
      function x(e, t, u, n) {
        var r = t.href,
          t = t.title ? A(t.title) : null,
          i = e[1].replace(/\\([\[\]])/g, "$1");
        return "!" !== e[0].charAt(0) ? (n.state.inLink = !0, e = {
          type: "link",
          raw: u,
          href: r,
          title: t,
          text: i,
          tokens: n.inlineTokens(i)
        }, n.state.inLink = !1, e) : {
          type: "image",
          raw: u,
          href: r,
          title: t,
          text: A(i)
        };
      }
      var b = function () {
          function e(e) {
            this.options = e || r.defaults;
          }
          var t = e.prototype;
          return t.space = function (e) {
            e = this.rules.block.newline.exec(e);
            if (e && 0 < e[0].length) return {
              type: "space",
              raw: e[0]
            };
          }, t.code = function (e) {
            var t,
              e = this.rules.block.code.exec(e);
            if (e) return t = e[0].replace(/^ {1,4}/gm, ""), {
              type: "code",
              raw: e[0],
              codeBlockStyle: "indented",
              text: this.options.pedantic ? t : C(t, "\n")
            };
          }, t.fences = function (e) {
            var t,
              u,
              n,
              r,
              e = this.rules.block.fences.exec(e);
            if (e) return t = e[0], u = t, n = e[3] || "", u = null === (u = t.match(/^(\s+)(?:```)/)) ? n : (r = u[1], n.split("\n").map(function (e) {
              var t = e.match(/^\s+/);
              return null !== t && t[0].length >= r.length ? e.slice(r.length) : e;
            }).join("\n")), {
              type: "code",
              raw: t,
              lang: e[2] && e[2].trim().replace(this.rules.inline._escapes, "$1"),
              text: u
            };
          }, t.heading = function (e) {
            var t,
              u,
              e = this.rules.block.heading.exec(e);
            if (e) return t = e[2].trim(), /#$/.test(t) && (u = C(t, "#"), !this.options.pedantic && u && !/ $/.test(u) || (t = u.trim())), {
              type: "heading",
              raw: e[0],
              depth: e[1].length,
              text: t,
              tokens: this.lexer.inline(t)
            };
          }, t.hr = function (e) {
            e = this.rules.block.hr.exec(e);
            if (e) return {
              type: "hr",
              raw: e[0]
            };
          }, t.blockquote = function (e) {
            var t,
              u,
              n,
              e = this.rules.block.blockquote.exec(e);
            if (e) return t = e[0].replace(/^ *>[ \t]?/gm, ""), u = this.lexer.state.top, this.lexer.state.top = !0, n = this.lexer.blockTokens(t), this.lexer.state.top = u, {
              type: "blockquote",
              raw: e[0],
              tokens: n,
              text: t
            };
          }, t.list = function (e) {
            var t = this.rules.block.list.exec(e);
            if (t) {
              var u,
                n,
                r,
                i,
                s,
                a,
                o,
                l,
                D,
                c,
                p,
                h = 1 < (g = t[1].trim()).length,
                f = {
                  type: "list",
                  raw: "",
                  ordered: h,
                  start: h ? +g.slice(0, -1) : "",
                  loose: !1,
                  items: []
                },
                g = h ? "\\d{1,9}\\" + g.slice(-1) : "\\" + g;
              this.options.pedantic && (g = h ? g : "[*+-]");
              for (var F = new RegExp("^( {0,3}" + g + ")((?:[\t ][^\\n]*)?(?:\\n|$))"); e && (p = !1, t = F.exec(e)) && !this.rules.block.hr.test(e);) {
                if (u = t[0], e = e.substring(u.length), o = t[2].split("\n", 1)[0].replace(/^\t+/, function (e) {
                  return " ".repeat(3 * e.length);
                }), l = e.split("\n", 1)[0], this.options.pedantic ? (i = 2, c = o.trimLeft()) : (i = t[2].search(/[^ ]/), c = o.slice(i = 4 < i ? 1 : i), i += t[1].length), s = !1, !o && /^ *$/.test(l) && (u += l + "\n", e = e.substring(l.length + 1), p = !0), !p) for (var d = new RegExp("^ {0," + Math.min(3, i - 1) + "}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))"), A = new RegExp("^ {0," + Math.min(3, i - 1) + "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"), k = new RegExp("^ {0," + Math.min(3, i - 1) + "}(?:```|~~~)"), C = new RegExp("^ {0," + Math.min(3, i - 1) + "}#"); e && (l = D = e.split("\n", 1)[0], this.options.pedantic && (l = l.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), !k.test(l)) && !C.test(l) && !d.test(l) && !A.test(e);) {
                  if (l.search(/[^ ]/) >= i || !l.trim()) c += "\n" + l.slice(i);else {
                    if (s) break;
                    if (4 <= o.search(/[^ ]/)) break;
                    if (k.test(o)) break;
                    if (C.test(o)) break;
                    if (A.test(o)) break;
                    c += "\n" + l;
                  }
                  s || l.trim() || (s = !0), u += D + "\n", e = e.substring(D.length + 1), o = l.slice(i);
                }
                f.loose || (a ? f.loose = !0 : /\n *\n *$/.test(u) && (a = !0)), this.options.gfm && (n = /^\[[ xX]\] /.exec(c)) && (r = "[ ] " !== n[0], c = c.replace(/^\[[ xX]\] +/, "")), f.items.push({
                  type: "list_item",
                  raw: u,
                  task: !!n,
                  checked: r,
                  loose: !1,
                  text: c
                }), f.raw += u;
              }
              f.items[f.items.length - 1].raw = u.trimRight(), f.items[f.items.length - 1].text = c.trimRight(), f.raw = f.raw.trimRight();
              for (var E, m = f.items.length, x = 0; x < m; x++) this.lexer.state.top = !1, f.items[x].tokens = this.lexer.blockTokens(f.items[x].text, []), f.loose || (E = 0 < (E = f.items[x].tokens.filter(function (e) {
                return "space" === e.type;
              })).length && E.some(function (e) {
                return /\n.*\n/.test(e.raw);
              }), f.loose = E);
              if (f.loose) for (x = 0; x < m; x++) f.items[x].loose = !0;
              return f;
            }
          }, t.html = function (e) {
            var t,
              e = this.rules.block.html.exec(e);
            if (e) return t = {
              type: "html",
              block: !0,
              raw: e[0],
              pre: !this.options.sanitizer && ("pre" === e[1] || "script" === e[1] || "style" === e[1]),
              text: e[0]
            }, this.options.sanitize && (e = this.options.sanitizer ? this.options.sanitizer(e[0]) : A(e[0]), t.type = "paragraph", t.text = e, t.tokens = this.lexer.inline(e)), t;
          }, t.def = function (e) {
            var t,
              u,
              n,
              e = this.rules.block.def.exec(e);
            if (e) return t = e[1].toLowerCase().replace(/\s+/g, " "), u = e[2] ? e[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "", n = e[3] && e[3].substring(1, e[3].length - 1).replace(this.rules.inline._escapes, "$1"), {
              type: "def",
              tag: t,
              raw: e[0],
              href: u,
              title: n
            };
          }, t.table = function (e) {
            e = this.rules.block.table.exec(e);
            if (e) {
              var t = {
                type: "table",
                header: k(e[1]).map(function (e) {
                  return {
                    text: e
                  };
                }),
                align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                rows: e[3] && e[3].trim() ? e[3].replace(/\n[ \t]*$/, "").split("\n") : []
              };
              if (t.header.length === t.align.length) {
                t.raw = e[0];
                for (var u, n, r, i = t.align.length, s = 0; s < i; s++) /^ *-+: *$/.test(t.align[s]) ? t.align[s] = "right" : /^ *:-+: *$/.test(t.align[s]) ? t.align[s] = "center" : /^ *:-+ *$/.test(t.align[s]) ? t.align[s] = "left" : t.align[s] = null;
                for (i = t.rows.length, s = 0; s < i; s++) t.rows[s] = k(t.rows[s], t.header.length).map(function (e) {
                  return {
                    text: e
                  };
                });
                for (i = t.header.length, u = 0; u < i; u++) t.header[u].tokens = this.lexer.inline(t.header[u].text);
                for (i = t.rows.length, u = 0; u < i; u++) for (r = t.rows[u], n = 0; n < r.length; n++) r[n].tokens = this.lexer.inline(r[n].text);
                return t;
              }
            }
          }, t.lheading = function (e) {
            e = this.rules.block.lheading.exec(e);
            if (e) return {
              type: "heading",
              raw: e[0],
              depth: "=" === e[2].charAt(0) ? 1 : 2,
              text: e[1],
              tokens: this.lexer.inline(e[1])
            };
          }, t.paragraph = function (e) {
            var t,
              e = this.rules.block.paragraph.exec(e);
            if (e) return t = "\n" === e[1].charAt(e[1].length - 1) ? e[1].slice(0, -1) : e[1], {
              type: "paragraph",
              raw: e[0],
              text: t,
              tokens: this.lexer.inline(t)
            };
          }, t.text = function (e) {
            e = this.rules.block.text.exec(e);
            if (e) return {
              type: "text",
              raw: e[0],
              text: e[0],
              tokens: this.lexer.inline(e[0])
            };
          }, t.escape = function (e) {
            e = this.rules.inline.escape.exec(e);
            if (e) return {
              type: "escape",
              raw: e[0],
              text: A(e[1])
            };
          }, t.tag = function (e) {
            e = this.rules.inline.tag.exec(e);
            if (e) return !this.lexer.state.inLink && /^<a /i.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) && (this.lexer.state.inRawBlock = !1), {
              type: this.options.sanitize ? "text" : "html",
              raw: e[0],
              inLink: this.lexer.state.inLink,
              inRawBlock: this.lexer.state.inRawBlock,
              block: !1,
              text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : A(e[0]) : e[0]
            };
          }, t.link = function (e) {
            e = this.rules.inline.link.exec(e);
            if (e) {
              var t = e[2].trim();
              if (!this.options.pedantic && /^</.test(t)) {
                if (!/>$/.test(t)) return;
                var u = C(t.slice(0, -1), "\\");
                if ((t.length - u.length) % 2 == 0) return;
              } else {
                u = function (e, t) {
                  if (-1 !== e.indexOf(t[1])) for (var u = e.length, n = 0, r = 0; r < u; r++) if ("\\" === e[r]) r++;else if (e[r] === t[0]) n++;else if (e[r] === t[1] && --n < 0) return r;
                  return -1;
                }(e[2], "()");
                -1 < u && (r = (0 === e[0].indexOf("!") ? 5 : 4) + e[1].length + u, e[2] = e[2].substring(0, u), e[0] = e[0].substring(0, r).trim(), e[3] = "");
              }
              var n,
                u = e[2],
                r = "";
              return this.options.pedantic ? (n = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(u)) && (u = n[1], r = n[3]) : r = e[3] ? e[3].slice(1, -1) : "", u = u.trim(), x(e, {
                href: (u = /^</.test(u) ? this.options.pedantic && !/>$/.test(t) ? u.slice(1) : u.slice(1, -1) : u) && u.replace(this.rules.inline._escapes, "$1"),
                title: r && r.replace(this.rules.inline._escapes, "$1")
              }, e[0], this.lexer);
            }
          }, t.reflink = function (e, t) {
            var u;
            if (u = (u = this.rules.inline.reflink.exec(e)) || this.rules.inline.nolink.exec(e)) return (e = t[(e = (u[2] || u[1]).replace(/\s+/g, " ")).toLowerCase()]) ? x(u, e, u[0], this.lexer) : {
              type: "text",
              raw: t = u[0].charAt(0),
              text: t
            };
          }, t.emStrong = function (e, t, u) {
            void 0 === u && (u = "");
            var n = this.rules.inline.emStrong.lDelim.exec(e);
            if (n && (!n[3] || !u.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/))) {
              var r = n[1] || n[2] || "";
              if (!r || "" === u || this.rules.inline.punctuation.exec(u)) {
                var i = n[0].length - 1,
                  s = i,
                  a = 0,
                  o = "*" === n[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
                for (o.lastIndex = 0, t = t.slice(-1 * e.length + i); null != (n = o.exec(t));) {
                  var l,
                    D = n[1] || n[2] || n[3] || n[4] || n[5] || n[6];
                  if (D) if (l = D.length, n[3] || n[4]) s += l;else if ((n[5] || n[6]) && i % 3 && !((i + l) % 3)) a += l;else if (!(0 < (s -= l))) return l = Math.min(l, l + s + a), D = e.slice(0, i + n.index + (n[0].length - D.length) + l), Math.min(i, l) % 2 ? (l = D.slice(1, -1), {
                    type: "em",
                    raw: D,
                    text: l,
                    tokens: this.lexer.inlineTokens(l)
                  }) : (l = D.slice(2, -2), {
                    type: "strong",
                    raw: D,
                    text: l,
                    tokens: this.lexer.inlineTokens(l)
                  });
                }
              }
            }
          }, t.codespan = function (e) {
            var t,
              u,
              n,
              e = this.rules.inline.code.exec(e);
            if (e) return n = e[2].replace(/\n/g, " "), t = /[^ ]/.test(n), u = /^ /.test(n) && / $/.test(n), n = A(n = t && u ? n.substring(1, n.length - 1) : n, !0), {
              type: "codespan",
              raw: e[0],
              text: n
            };
          }, t.br = function (e) {
            e = this.rules.inline.br.exec(e);
            if (e) return {
              type: "br",
              raw: e[0]
            };
          }, t.del = function (e) {
            e = this.rules.inline.del.exec(e);
            if (e) return {
              type: "del",
              raw: e[0],
              text: e[2],
              tokens: this.lexer.inlineTokens(e[2])
            };
          }, t.autolink = function (e, t) {
            var u,
              e = this.rules.inline.autolink.exec(e);
            if (e) return t = "@" === e[2] ? "mailto:" + (u = A(this.options.mangle ? t(e[1]) : e[1])) : u = A(e[1]), {
              type: "link",
              raw: e[0],
              text: u,
              href: t,
              tokens: [{
                type: "text",
                raw: u,
                text: u
              }]
            };
          }, t.url = function (e, t) {
            var u, n, r, i;
            if (u = this.rules.inline.url.exec(e)) {
              if ("@" === u[2]) r = "mailto:" + (n = A(this.options.mangle ? t(u[0]) : u[0]));else {
                for (; i = u[0], u[0] = this.rules.inline._backpedal.exec(u[0])[0], i !== u[0];);
                n = A(u[0]), r = "www." === u[1] ? "http://" + u[0] : u[0];
              }
              return {
                type: "link",
                raw: u[0],
                text: n,
                href: r,
                tokens: [{
                  type: "text",
                  raw: n,
                  text: n
                }]
              };
            }
          }, t.inlineText = function (e, t) {
            e = this.rules.inline.text.exec(e);
            if (e) return t = this.lexer.state.inRawBlock ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : A(e[0]) : e[0] : A(this.options.smartypants ? t(e[0]) : e[0]), {
              type: "text",
              raw: e[0],
              text: t
            };
          }, e;
        }(),
        B = {
          newline: /^(?: *(?:\n|$))+/,
          code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
          fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
          hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
          heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
          blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
          list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
          html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
          def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
          table: F,
          lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
          _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
          text: /^[^\n]+/,
          _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
          _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
        },
        w = (B.def = h(B.def).replace("label", B._label).replace("title", B._title).getRegex(), B.bullet = /(?:[*+-]|\d{1,9}[.)])/, B.listItemStart = h(/^( *)(bull) */).replace("bull", B.bullet).getRegex(), B.list = h(B.list).replace(/bull/g, B.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + B.def.source + ")").getRegex(), B._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", B._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, B.html = h(B.html, "i").replace("comment", B._comment).replace("tag", B._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), B.paragraph = h(B._paragraph).replace("hr", B.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", B._tag).getRegex(), B.blockquote = h(B.blockquote).replace("paragraph", B.paragraph).getRegex(), B.normal = d({}, B), B.gfm = d({}, B.normal, {
          table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
        }), B.gfm.table = h(B.gfm.table).replace("hr", B.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", B._tag).getRegex(), B.gfm.paragraph = h(B._paragraph).replace("hr", B.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", B.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", B._tag).getRegex(), B.pedantic = d({}, B.normal, {
          html: h("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", B._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
          def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
          heading: /^(#{1,6})(.*)(?:\n+|$)/,
          fences: F,
          lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
          paragraph: h(B.normal._paragraph).replace("hr", B.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", B.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
        }), {
          escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
          autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
          url: F,
          tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
          link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
          reflink: /^!?\[(label)\]\[(ref)\]/,
          nolink: /^!?\[(ref)\](?:\[\])?/,
          reflinkSearch: "reflink|nolink(?!\\()",
          emStrong: {
            lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
            rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
            rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
          },
          code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
          br: /^( {2,}|\\)\n(?!\s*$)/,
          del: F,
          text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
          punctuation: /^([\spunctuation])/
        });
      function L(e) {
        return e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
      }
      function v(e) {
        for (var t, u = "", n = e.length, r = 0; r < n; r++) t = e.charCodeAt(r), u += "&#" + (t = .5 < Math.random() ? "x" + t.toString(16) : t) + ";";
        return u;
      }
      w._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~", w.punctuation = h(w.punctuation).replace(/punctuation/g, w._punctuation).getRegex(), w.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g, w.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g, w._comment = h(B._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(), w.emStrong.lDelim = h(w.emStrong.lDelim).replace(/punct/g, w._punctuation).getRegex(), w.emStrong.rDelimAst = h(w.emStrong.rDelimAst, "g").replace(/punct/g, w._punctuation).getRegex(), w.emStrong.rDelimUnd = h(w.emStrong.rDelimUnd, "g").replace(/punct/g, w._punctuation).getRegex(), w._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, w._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, w._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, w.autolink = h(w.autolink).replace("scheme", w._scheme).replace("email", w._email).getRegex(), w._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, w.tag = h(w.tag).replace("comment", w._comment).replace("attribute", w._attribute).getRegex(), w._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, w._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, w._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, w.link = h(w.link).replace("label", w._label).replace("href", w._href).replace("title", w._title).getRegex(), w.reflink = h(w.reflink).replace("label", w._label).replace("ref", B._label).getRegex(), w.nolink = h(w.nolink).replace("ref", B._label).getRegex(), w.reflinkSearch = h(w.reflinkSearch, "g").replace("reflink", w.reflink).replace("nolink", w.nolink).getRegex(), w.normal = d({}, w), w.pedantic = d({}, w.normal, {
        strong: {
          start: /^__|\*\*/,
          middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
          endAst: /\*\*(?!\*)/g,
          endUnd: /__(?!_)/g
        },
        em: {
          start: /^_|\*/,
          middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
          endAst: /\*(?!\*)/g,
          endUnd: /_(?!_)/g
        },
        link: h(/^!?\[(label)\]\((.*?)\)/).replace("label", w._label).getRegex(),
        reflink: h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", w._label).getRegex()
      }), w.gfm = d({}, w.normal, {
        escape: h(w.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
      }), w.gfm.url = h(w.gfm.url, "i").replace("email", w.gfm._extended_email).getRegex(), w.breaks = d({}, w.gfm, {
        br: h(w.br).replace("{2,}", "*").getRegex(),
        text: h(w.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
      });
      var y = function () {
          function u(e) {
            this.tokens = [], this.tokens.links = Object.create(null), this.options = e || r.defaults, this.options.tokenizer = this.options.tokenizer || new b(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, (this.tokenizer.lexer = this).inlineQueue = [], this.state = {
              inLink: !1,
              inRawBlock: !1,
              top: !0
            };
            e = {
              block: B.normal,
              inline: w.normal
            };
            this.options.pedantic ? (e.block = B.pedantic, e.inline = w.pedantic) : this.options.gfm && (e.block = B.gfm, this.options.breaks ? e.inline = w.breaks : e.inline = w.gfm), this.tokenizer.rules = e;
          }
          u.lex = function (e, t) {
            return new u(t).lex(e);
          }, u.lexInline = function (e, t) {
            return new u(t).inlineTokens(e);
          };
          var e,
            t,
            n = u.prototype;
          return n.lex = function (e) {
            var t;
            for (e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens); t = this.inlineQueue.shift();) this.inlineTokens(t.src, t.tokens);
            return this.tokens;
          }, n.blockTokens = function (r, i) {
            var s,
              a,
              o,
              l,
              D = this;
            for (void 0 === i && (i = []), r = this.options.pedantic ? r.replace(/\t/g, "    ").replace(/^ +$/gm, "") : r.replace(/^( *)(\t+)/gm, function (e, t, u) {
              return t + "    ".repeat(u.length);
            }); r;) {
              var e = function () {
                if (D.options.extensions && D.options.extensions.block && D.options.extensions.block.some(function (e) {
                  return !!(s = e.call({
                    lexer: D
                  }, r, i)) && (r = r.substring(s.raw.length), i.push(s), !0);
                })) return "continue";
                if (s = D.tokenizer.space(r)) return r = r.substring(s.raw.length), 1 === s.raw.length && 0 < i.length ? i[i.length - 1].raw += "\n" : i.push(s), "continue";
                if (s = D.tokenizer.code(r)) return r = r.substring(s.raw.length), !(a = i[i.length - 1]) || "paragraph" !== a.type && "text" !== a.type ? i.push(s) : (a.raw += "\n" + s.raw, a.text += "\n" + s.text, D.inlineQueue[D.inlineQueue.length - 1].src = a.text), "continue";
                if (s = D.tokenizer.fences(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = D.tokenizer.heading(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = D.tokenizer.hr(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = D.tokenizer.blockquote(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = D.tokenizer.list(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = D.tokenizer.html(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = D.tokenizer.def(r)) return r = r.substring(s.raw.length), !(a = i[i.length - 1]) || "paragraph" !== a.type && "text" !== a.type ? D.tokens.links[s.tag] || (D.tokens.links[s.tag] = {
                  href: s.href,
                  title: s.title
                }) : (a.raw += "\n" + s.raw, a.text += "\n" + s.raw, D.inlineQueue[D.inlineQueue.length - 1].src = a.text), "continue";
                if (s = D.tokenizer.table(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = D.tokenizer.lheading(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                var t, u, n;
                if (o = r, D.options.extensions && D.options.extensions.startBlock && (t = 1 / 0, u = r.slice(1), D.options.extensions.startBlock.forEach(function (e) {
                  "number" == typeof (n = e.call({
                    lexer: this
                  }, u)) && 0 <= n && (t = Math.min(t, n));
                }), t < 1 / 0) && 0 <= t && (o = r.substring(0, t + 1)), D.state.top && (s = D.tokenizer.paragraph(o))) return a = i[i.length - 1], l && "paragraph" === a.type ? (a.raw += "\n" + s.raw, a.text += "\n" + s.text, D.inlineQueue.pop(), D.inlineQueue[D.inlineQueue.length - 1].src = a.text) : i.push(s), l = o.length !== r.length, r = r.substring(s.raw.length), "continue";
                if (s = D.tokenizer.text(r)) return r = r.substring(s.raw.length), (a = i[i.length - 1]) && "text" === a.type ? (a.raw += "\n" + s.raw, a.text += "\n" + s.text, D.inlineQueue.pop(), D.inlineQueue[D.inlineQueue.length - 1].src = a.text) : i.push(s), "continue";
                if (r) {
                  var e = "Infinite loop on byte: " + r.charCodeAt(0);
                  if (D.options.silent) return console.error(e), "break";
                  throw new Error(e);
                }
              }();
              if ("continue" !== e && "break" === e) break;
            }
            return this.state.top = !0, i;
          }, n.inline = function (e, t) {
            return this.inlineQueue.push({
              src: e,
              tokens: t = void 0 === t ? [] : t
            }), t;
          }, n.inlineTokens = function (r, i) {
            var s,
              a,
              o,
              e,
              l,
              D,
              c = this,
              p = (void 0 === i && (i = []), r);
            if (this.tokens.links) {
              var t = Object.keys(this.tokens.links);
              if (0 < t.length) for (; null != (e = this.tokenizer.rules.inline.reflinkSearch.exec(p));) t.includes(e[0].slice(e[0].lastIndexOf("[") + 1, -1)) && (p = p.slice(0, e.index) + "[" + E("a", e[0].length - 2) + "]" + p.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
            }
            for (; null != (e = this.tokenizer.rules.inline.blockSkip.exec(p));) p = p.slice(0, e.index) + "[" + E("a", e[0].length - 2) + "]" + p.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            for (; null != (e = this.tokenizer.rules.inline.escapedEmSt.exec(p));) p = p.slice(0, e.index + e[0].length - 2) + "++" + p.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex), this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
            for (; r;) {
              var u = function () {
                if (l || (D = ""), l = !1, c.options.extensions && c.options.extensions.inline && c.options.extensions.inline.some(function (e) {
                  return !!(s = e.call({
                    lexer: c
                  }, r, i)) && (r = r.substring(s.raw.length), i.push(s), !0);
                })) return "continue";
                if (s = c.tokenizer.escape(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = c.tokenizer.tag(r)) return r = r.substring(s.raw.length), (a = i[i.length - 1]) && "text" === s.type && "text" === a.type ? (a.raw += s.raw, a.text += s.text) : i.push(s), "continue";
                if (s = c.tokenizer.link(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = c.tokenizer.reflink(r, c.tokens.links)) return r = r.substring(s.raw.length), (a = i[i.length - 1]) && "text" === s.type && "text" === a.type ? (a.raw += s.raw, a.text += s.text) : i.push(s), "continue";
                if (s = c.tokenizer.emStrong(r, p, D)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = c.tokenizer.codespan(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = c.tokenizer.br(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = c.tokenizer.del(r)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (s = c.tokenizer.autolink(r, v)) return r = r.substring(s.raw.length), i.push(s), "continue";
                if (!c.state.inLink && (s = c.tokenizer.url(r, v))) return r = r.substring(s.raw.length), i.push(s), "continue";
                var t, u, n;
                if (o = r, c.options.extensions && c.options.extensions.startInline && (t = 1 / 0, u = r.slice(1), c.options.extensions.startInline.forEach(function (e) {
                  "number" == typeof (n = e.call({
                    lexer: this
                  }, u)) && 0 <= n && (t = Math.min(t, n));
                }), t < 1 / 0) && 0 <= t && (o = r.substring(0, t + 1)), s = c.tokenizer.inlineText(o, L)) return r = r.substring(s.raw.length), "_" !== s.raw.slice(-1) && (D = s.raw.slice(-1)), l = !0, (a = i[i.length - 1]) && "text" === a.type ? (a.raw += s.raw, a.text += s.text) : i.push(s), "continue";
                if (r) {
                  var e = "Infinite loop on byte: " + r.charCodeAt(0);
                  if (c.options.silent) return console.error(e), "break";
                  throw new Error(e);
                }
              }();
              if ("continue" !== u && "break" === u) break;
            }
            return i;
          }, n = u, t = [{
            key: "rules",
            get: function get() {
              return {
                block: B,
                inline: w
              };
            }
          }], (e = null) && i(n.prototype, e), t && i(n, t), Object.defineProperty(n, "prototype", {
            writable: !1
          }), u;
        }(),
        _ = function () {
          function e(e) {
            this.options = e || r.defaults;
          }
          var t = e.prototype;
          return t.code = function (e, t, u) {
            var n,
              t = (t || "").match(/\S*/)[0];
            return this.options.highlight && null != (n = this.options.highlight(e, t)) && n !== e && (u = !0, e = n), e = e.replace(/\n$/, "") + "\n", t ? '<pre><code class="' + this.options.langPrefix + A(t) + '">' + (u ? e : A(e, !0)) + "</code></pre>\n" : "<pre><code>" + (u ? e : A(e, !0)) + "</code></pre>\n";
          }, t.blockquote = function (e) {
            return "<blockquote>\n" + e + "</blockquote>\n";
          }, t.html = function (e, t) {
            return e;
          }, t.heading = function (e, t, u, n) {
            return this.options.headerIds ? "<h" + t + ' id="' + (this.options.headerPrefix + n.slug(u)) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n";
          }, t.hr = function () {
            return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
          }, t.list = function (e, t, u) {
            var n = t ? "ol" : "ul";
            return "<" + n + (t && 1 !== u ? ' start="' + u + '"' : "") + ">\n" + e + "</" + n + ">\n";
          }, t.listitem = function (e) {
            return "<li>" + e + "</li>\n";
          }, t.checkbox = function (e) {
            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
          }, t.paragraph = function (e) {
            return "<p>" + e + "</p>\n";
          }, t.table = function (e, t) {
            return "<table>\n<thead>\n" + e + "</thead>\n" + (t = t && "<tbody>" + t + "</tbody>") + "</table>\n";
          }, t.tablerow = function (e) {
            return "<tr>\n" + e + "</tr>\n";
          }, t.tablecell = function (e, t) {
            var u = t.header ? "th" : "td";
            return (t.align ? "<" + u + ' align="' + t.align + '">' : "<" + u + ">") + e + "</" + u + ">\n";
          }, t.strong = function (e) {
            return "<strong>" + e + "</strong>";
          }, t.em = function (e) {
            return "<em>" + e + "</em>";
          }, t.codespan = function (e) {
            return "<code>" + e + "</code>";
          }, t.br = function () {
            return this.options.xhtml ? "<br/>" : "<br>";
          }, t.del = function (e) {
            return "<del>" + e + "</del>";
          }, t.link = function (e, t, u) {
            return null === (e = f(this.options.sanitize, this.options.baseUrl, e)) ? u : (e = '<a href="' + e + '"', t && (e += ' title="' + t + '"'), e + ">" + u + "</a>");
          }, t.image = function (e, t, u) {
            return null === (e = f(this.options.sanitize, this.options.baseUrl, e)) ? u : (e = '<img src="' + e + '" alt="' + u + '"', t && (e += ' title="' + t + '"'), e + (this.options.xhtml ? "/>" : ">"));
          }, t.text = function (e) {
            return e;
          }, e;
        }(),
        z = function () {
          function e() {}
          var t = e.prototype;
          return t.strong = function (e) {
            return e;
          }, t.em = function (e) {
            return e;
          }, t.codespan = function (e) {
            return e;
          }, t.del = function (e) {
            return e;
          }, t.html = function (e) {
            return e;
          }, t.text = function (e) {
            return e;
          }, t.link = function (e, t, u) {
            return "" + u;
          }, t.image = function (e, t, u) {
            return "" + u;
          }, t.br = function () {
            return "";
          }, e;
        }(),
        $ = function () {
          function e() {
            this.seen = {};
          }
          var t = e.prototype;
          return t.serialize = function (e) {
            return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
          }, t.getNextSafeSlug = function (e, t) {
            var u = e,
              n = 0;
            if (this.seen.hasOwnProperty(u)) for (n = this.seen[e]; u = e + "-" + ++n, this.seen.hasOwnProperty(u););
            return t || (this.seen[e] = n, this.seen[u] = 0), u;
          }, t.slug = function (e, t) {
            void 0 === t && (t = {});
            e = this.serialize(e);
            return this.getNextSafeSlug(e, t.dryrun);
          }, e;
        }(),
        S = function () {
          function u(e) {
            this.options = e || r.defaults, this.options.renderer = this.options.renderer || new _(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new z(), this.slugger = new $();
          }
          u.parse = function (e, t) {
            return new u(t).parse(e);
          }, u.parseInline = function (e, t) {
            return new u(t).parseInline(e);
          };
          var e = u.prototype;
          return e.parse = function (e, t) {
            void 0 === t && (t = !0);
            for (var u, n, r, i, s, a, o, l, D, c, p, h, f, g, F, d, A = "", k = e.length, C = 0; C < k; C++) if (l = e[C], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[l.type] && (!1 !== (d = this.options.extensions.renderers[l.type].call({
              parser: this
            }, l)) || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(l.type))) A += d || "";else switch (l.type) {
              case "space":
                continue;
              case "hr":
                A += this.renderer.hr();
                continue;
              case "heading":
                A += this.renderer.heading(this.parseInline(l.tokens), l.depth, m(this.parseInline(l.tokens, this.textRenderer)), this.slugger);
                continue;
              case "code":
                A += this.renderer.code(l.text, l.lang, l.escaped);
                continue;
              case "table":
                for (a = D = "", r = l.header.length, u = 0; u < r; u++) a += this.renderer.tablecell(this.parseInline(l.header[u].tokens), {
                  header: !0,
                  align: l.align[u]
                });
                for (D += this.renderer.tablerow(a), o = "", r = l.rows.length, u = 0; u < r; u++) {
                  for (a = "", i = (s = l.rows[u]).length, n = 0; n < i; n++) a += this.renderer.tablecell(this.parseInline(s[n].tokens), {
                    header: !1,
                    align: l.align[n]
                  });
                  o += this.renderer.tablerow(a);
                }
                A += this.renderer.table(D, o);
                continue;
              case "blockquote":
                o = this.parse(l.tokens), A += this.renderer.blockquote(o);
                continue;
              case "list":
                for (D = l.ordered, E = l.start, c = l.loose, r = l.items.length, o = "", u = 0; u < r; u++) f = (h = l.items[u]).checked, g = h.task, p = "", h.task && (F = this.renderer.checkbox(f), c ? 0 < h.tokens.length && "paragraph" === h.tokens[0].type ? (h.tokens[0].text = F + " " + h.tokens[0].text, h.tokens[0].tokens && 0 < h.tokens[0].tokens.length && "text" === h.tokens[0].tokens[0].type && (h.tokens[0].tokens[0].text = F + " " + h.tokens[0].tokens[0].text)) : h.tokens.unshift({
                  type: "text",
                  text: F
                }) : p += F), p += this.parse(h.tokens, c), o += this.renderer.listitem(p, g, f);
                A += this.renderer.list(o, D, E);
                continue;
              case "html":
                A += this.renderer.html(l.text, l.block);
                continue;
              case "paragraph":
                A += this.renderer.paragraph(this.parseInline(l.tokens));
                continue;
              case "text":
                for (o = l.tokens ? this.parseInline(l.tokens) : l.text; C + 1 < k && "text" === e[C + 1].type;) o += "\n" + ((l = e[++C]).tokens ? this.parseInline(l.tokens) : l.text);
                A += t ? this.renderer.paragraph(o) : o;
                continue;
              default:
                var E = 'Token with "' + l.type + '" type was not found.';
                if (this.options.silent) return void console.error(E);
                throw new Error(E);
            }
            return A;
          }, e.parseInline = function (e, t) {
            t = t || this.renderer;
            for (var u, n, r = "", i = e.length, s = 0; s < i; s++) if (u = e[s], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[u.type] && (!1 !== (n = this.options.extensions.renderers[u.type].call({
              parser: this
            }, u)) || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(u.type))) r += n || "";else switch (u.type) {
              case "escape":
                r += t.text(u.text);
                break;
              case "html":
                r += t.html(u.text);
                break;
              case "link":
                r += t.link(u.href, u.title, this.parseInline(u.tokens, t));
                break;
              case "image":
                r += t.image(u.href, u.title, u.text);
                break;
              case "strong":
                r += t.strong(this.parseInline(u.tokens, t));
                break;
              case "em":
                r += t.em(this.parseInline(u.tokens, t));
                break;
              case "codespan":
                r += t.codespan(u.text);
                break;
              case "br":
                r += t.br();
                break;
              case "del":
                r += t.del(this.parseInline(u.tokens, t));
                break;
              case "text":
                r += t.text(u.text);
                break;
              default:
                var a = 'Token with "' + u.type + '" type was not found.';
                if (this.options.silent) return void console.error(a);
                throw new Error(a);
            }
            return r;
          }, u;
        }(),
        T = function () {
          function e(e) {
            this.options = e || r.defaults;
          }
          var t = e.prototype;
          return t.preprocess = function (e) {
            return e;
          }, t.postprocess = function (e) {
            return e;
          }, e;
        }();
      function R(g, F) {
        return function (e, u, n) {
          "function" == typeof u && (n = u, u = null);
          var r,
            i,
            s,
            t,
            a = d({}, u),
            o = (u = d({}, I.defaults, a), r = u.silent, i = u.async, s = n, function (e) {
              var t;
              if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", r) return t = "<p>An error occurred:</p><pre>" + A(e.message + "", !0) + "</pre>", i ? Promise.resolve(t) : s ? void s(null, t) : t;
              if (i) return Promise.reject(e);
              if (!s) throw e;
              s(e);
            });
          if (null == e) return o(new Error("marked(): input parameter is undefined or null"));
          if ("string" != typeof e) return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
          if (a = n, (t = u) && !t.silent && (a && console.warn("marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async"), (t.sanitize || t.sanitizer) && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"), !t.highlight && "language-" === t.langPrefix || console.warn("marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight."), t.mangle && console.warn("marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`."), t.baseUrl && console.warn("marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url."), t.smartypants && console.warn("marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants."), t.xhtml && console.warn("marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml."), t.headerIds || t.headerPrefix) && console.warn("marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`."), u.hooks && (u.hooks.options = u), n) {
            var l,
              D = u.highlight;
            try {
              u.hooks && (e = u.hooks.preprocess(e)), l = g(e, u);
            } catch (e) {
              return o(e);
            }
            var c,
              p = function p(t) {
                var e;
                if (!t) try {
                  u.walkTokens && I.walkTokens(l, u.walkTokens), e = F(l, u), u.hooks && (e = u.hooks.postprocess(e));
                } catch (e) {
                  t = e;
                }
                return u.highlight = D, t ? o(t) : n(null, e);
              };
            return !D || D.length < 3 ? p() : (delete u.highlight, l.length ? (c = 0, I.walkTokens(l, function (u) {
              "code" === u.type && (c++, setTimeout(function () {
                D(u.text, u.lang, function (e, t) {
                  if (e) return p(e);
                  null != t && t !== u.text && (u.text = t, u.escaped = !0), 0 === --c && p();
                });
              }, 0));
            }), void (0 === c && p())) : p());
          }
          if (u.async) return Promise.resolve(u.hooks ? u.hooks.preprocess(e) : e).then(function (e) {
            return g(e, u);
          }).then(function (e) {
            return u.walkTokens ? Promise.all(I.walkTokens(e, u.walkTokens)).then(function () {
              return e;
            }) : e;
          }).then(function (e) {
            return F(e, u);
          }).then(function (e) {
            return u.hooks ? u.hooks.postprocess(e) : e;
          })["catch"](o);
          try {
            u.hooks && (e = u.hooks.preprocess(e));
            var h = g(e, u),
              f = (u.walkTokens && I.walkTokens(h, u.walkTokens), F(h, u));
            return f = u.hooks ? u.hooks.postprocess(f) : f;
          } catch (e) {
            return o(e);
          }
        };
      }
      function I(e, t, u) {
        return R(y.lex, S.parse)(e, t, u);
      }
      T.passThroughHooks = new Set(["preprocess", "postprocess"]), I.options = I.setOptions = function (e) {
        return I.defaults = d({}, I.defaults, e), e = I.defaults, r.defaults = e, I;
      }, I.getDefaults = e, I.defaults = r.defaults, I.use = function () {
        for (var D = I.defaults.extensions || {
            renderers: {},
            childTokens: {}
          }, e = arguments.length, t = new Array(e), u = 0; u < e; u++) t[u] = arguments[u];
        t.forEach(function (s) {
          var u,
            e = d({}, s);
          if (e.async = I.defaults.async || e.async || !1, s.extensions && (s.extensions.forEach(function (r) {
            if (!r.name) throw new Error("extension name required");
            var i;
            if (r.renderer && (i = D.renderers[r.name], D.renderers[r.name] = i ? function () {
              for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) t[u] = arguments[u];
              var n = r.renderer.apply(this, t);
              return n = !1 === n ? i.apply(this, t) : n;
            } : r.renderer), r.tokenizer) {
              if (!r.level || "block" !== r.level && "inline" !== r.level) throw new Error("extension level must be 'block' or 'inline'");
              D[r.level] ? D[r.level].unshift(r.tokenizer) : D[r.level] = [r.tokenizer], r.start && ("block" === r.level ? D.startBlock ? D.startBlock.push(r.start) : D.startBlock = [r.start] : "inline" === r.level && (D.startInline ? D.startInline.push(r.start) : D.startInline = [r.start]));
            }
            r.childTokens && (D.childTokens[r.name] = r.childTokens);
          }), e.extensions = D), s.renderer) {
            var t,
              a = I.defaults.renderer || new _();
            for (t in s.renderer) !function (r) {
              var i = a[r];
              a[r] = function () {
                for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) t[u] = arguments[u];
                var n = s.renderer[r].apply(a, t);
                return n = !1 === n ? i.apply(a, t) : n;
              };
            }(t);
            e.renderer = a;
          }
          if (s.tokenizer) {
            var n,
              o = I.defaults.tokenizer || new b();
            for (n in s.tokenizer) !function (r) {
              var i = o[r];
              o[r] = function () {
                for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) t[u] = arguments[u];
                var n = s.tokenizer[r].apply(o, t);
                return n = !1 === n ? i.apply(o, t) : n;
              };
            }(n);
            e.tokenizer = o;
          }
          if (s.hooks) {
            var r,
              l = I.defaults.hooks || new T();
            for (r in s.hooks) !function (r) {
              var i = l[r];
              T.passThroughHooks.has(r) ? l[r] = function (e) {
                return I.defaults.async ? Promise.resolve(s.hooks[r].call(l, e)).then(function (e) {
                  return i.call(l, e);
                }) : (e = s.hooks[r].call(l, e), i.call(l, e));
              } : l[r] = function () {
                for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) t[u] = arguments[u];
                var n = s.hooks[r].apply(l, t);
                return n = !1 === n ? i.apply(l, t) : n;
              };
            }(r);
            e.hooks = l;
          }
          s.walkTokens && (u = I.defaults.walkTokens, e.walkTokens = function (e) {
            var t = [];
            return t.push(s.walkTokens.call(this, e)), t = u ? t.concat(u.call(this, e)) : t;
          }), I.setOptions(e);
        });
      }, I.walkTokens = function (e, a) {
        for (var o, l = [], t = D(e); !(o = t()).done;) !function () {
          var t = o.value;
          switch (l = l.concat(a.call(I, t)), t.type) {
            case "table":
              for (var e = D(t.header); !(u = e()).done;) {
                var u = u.value;
                l = l.concat(I.walkTokens(u.tokens, a));
              }
              for (var n, r = D(t.rows); !(n = r()).done;) for (var i = D(n.value); !(s = i()).done;) {
                var s = s.value;
                l = l.concat(I.walkTokens(s.tokens, a));
              }
              break;
            case "list":
              l = l.concat(I.walkTokens(t.items, a));
              break;
            default:
              I.defaults.extensions && I.defaults.extensions.childTokens && I.defaults.extensions.childTokens[t.type] ? I.defaults.extensions.childTokens[t.type].forEach(function (e) {
                l = l.concat(I.walkTokens(t[e], a));
              }) : t.tokens && (l = l.concat(I.walkTokens(t.tokens, a)));
          }
        }();
        return l;
      }, I.parseInline = R(y.lexInline, S.parseInline), I.Parser = S, I.parser = S.parse, I.Renderer = _, I.TextRenderer = z, I.Lexer = y, I.lexer = y.lex, I.Tokenizer = b, I.Slugger = $, I.Hooks = T;
      var F = (I.parse = I).options,
        U = I.setOptions,
        Q = I.use,
        M = I.walkTokens,
        N = I.parseInline,
        H = I,
        X = S.parse,
        G = y.lex;
      r.Hooks = T, r.Lexer = y, r.Parser = S, r.Renderer = _, r.Slugger = $, r.TextRenderer = z, r.Tokenizer = b, r.getDefaults = e, r.lexer = G, r.marked = I, r.options = F, r.parse = H, r.parseInline = N, r.parser = X, r.setOptions = U, r.use = Q, r.walkTokens = M;
    });
  })(marked_min, marked_min.exports);
  var marked_minExports = marked_min.exports;
  var marked = /*@__PURE__*/getDefaultExportFromCjs(marked_minExports);

  var GetHeadingTree = function GetHeadingTree(text) {
    var items = marked.lexer(text);
    var tree = null;
    var parents = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      switch (item.type) {
        case 'heading':
          var level = item.depth - 1;
          // First node
          if (tree === null) {
            if (level === 0) {
              var node = CreateNewNode(item.text);
              parents.push(node);
              tree = node;
            }
            // Ignore items if tree is null
          } else {
            if (level <= parents.length) {
              var node = CreateNewNode(item.text);
              parents.length = level;
              var lastNode = parents[parents.length - 1];
              lastNode.children.push(node);
              parents.push(node);
            }
            // Ignore items if out of parents
          }

          break;
        case 'paragraph':
        case 'code':
          if (parents.length === 0) {
            continue;
          }
          // Append raw to last-node
          var lastNode = parents[parents.length - 1];
          var node = {
            text: item.text
          };
          if (item.lang) {
            node.block = item.lang;
          }
          lastNode.paragraphs.push(node);
          break;

        // Ignore other kinds of items
      }
    }

    return tree;
  };
  var CreateNewNode = function CreateNewNode(title) {
    return {
      title: title,
      paragraphs: [],
      children: []
    };
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
      if (s === 'false') {
        s = false;
      } else if (s === 'true') {
        s = true;
      }
    }
    return s;
  };

  var ParseProperty = function ParseProperty(s, out) {
    var index = s.indexOf('=');
    if (index === -1) {
      out[s] = true;
    } else {
      var name = s.substring(0, index);
      var expression = s.substring(index + 1);
      out[name] = TypeConvert(expression);
    }
    return out;
  };

  var GetTreeConfig = function GetTreeConfig(paragraphs) {
    var config = {};
    paragraphs.forEach(function (paragraph) {
      var lines = paragraph.text.split('\n');
      lines.forEach(function (line) {
        ParseProperty(line, config);
      });
    });
    return config;
  };

  var GetNodeType = function GetNodeType(node, typeNames) {
    var title = node.title.toLowerCase();
    for (var i = 0, cnt = typeNames.length; i < cnt; i++) {
      var typeName = typeNames[i];
      if (title.indexOf("[".concat(typeName, "]")) > -1) {
        return typeName;
      }
    }
    return '';
  };

  var STATE_CONDITION = 1;
  var STATE_TASK = 2;
  var STATE_CATCH = 3;
  var TypeNames$1 = ['condition', 'catch'];
  var ParseNodes = function ParseNodes(nodes) {
    var conditionNodes = [];
    var mainTaskNodes = [];
    var catchNodes = [];
    var state = STATE_CONDITION;
    var nextNodeType = GetNodeType(nodes[0], TypeNames$1);
    for (var i = 0, cnt = nodes.length; i < cnt; i++) {
      var node = nodes[i];
      if (state === STATE_CONDITION) {
        if (nextNodeType === '') {
          state = STATE_TASK;
        } else if (nextNodeType === 'catch') {
          state = STATE_CATCH;
        }
      } else if (state === STATE_TASK) {
        if (nextNodeType === 'catch') {
          state = STATE_CATCH;
        }
      }
      switch (state) {
        case STATE_CONDITION:
          conditionNodes.push(node);
          break;
        case STATE_TASK:
          mainTaskNodes.push(node);
          break;
        case STATE_CATCH:
          catchNodes.push(node);
          break;
      }
      if (i + 1 < cnt) {
        nextNodeType = GetNodeType(nodes[i + 1], TypeNames$1);
      }
    }
    return {
      conditionNodes: conditionNodes,
      mainTaskNodes: mainTaskNodes,
      catchNodes: catchNodes
    };
  };

  var GetConditionExpression = function GetConditionExpression(nodes) {
    if (!Array.isArray(nodes)) {
      return GetANDExpression(nodes);
    }
    var expression;
    switch (nodes.length) {
      case 0:
        expression = 'true';
        break;
      case 1:
        expression = GetANDExpression(nodes[0]);
        break;
      default:
        expression = nodes.map(function (node) {
          return "(".concat(GetANDExpression(node), ")");
        }).join(' || ');
        break;
    }
    return expression;
  };
  var GetANDExpression = function GetANDExpression(node) {
    var paragraphs = node.paragraphs;
    var lines = [];
    for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
      var paragraph = paragraphs[i];
      if (paragraph.hasOwnProperty('block')) {
        continue;
      }
      lines.push.apply(lines, _toConsumableArray(paragraph.text.split('\n')));
    }
    var expression;
    switch (lines.length) {
      case 0:
        expression = 'true';
        break;
      case 1:
        expression = lines[0];
        break;
      default:
        expression = lines.map(function (line) {
          return "(".concat(line, ")");
        }).join(' && ');
        break;
    }
    return expression;
  };

  var TaskSequence = /*#__PURE__*/function (_Sequence) {
    _inherits(TaskSequence, _Sequence);
    var _super = _createSuper(TaskSequence);
    function TaskSequence() {
      _classCallCheck(this, TaskSequence);
      return _super.apply(this, arguments);
    }
    _createClass(TaskSequence, [{
      key: "open",
      value: function open(tick) {
        _get(_getPrototypeOf(TaskSequence.prototype), "open", this).call(this, tick);
        var treeManager = tick.blackboard.treeManager;
        treeManager.emit('label.enter', this.title, treeManager);
      }
    }, {
      key: "tick",
      value: function tick(_tick) {
        var status = _get(_getPrototypeOf(TaskSequence.prototype), "tick", this).call(this, _tick);
        // Turn FAILURE by SUCCESS
        if (status === FAILURE) {
          status = SUCCESS$1;
        }
        return status;
      }
    }, {
      key: "close",
      value: function close(tick) {
        _get(_getPrototypeOf(TaskSequence.prototype), "close", this).call(this, tick);
        var treeManager = tick.blackboard.treeManager;
        treeManager.emit('label.exit', this.title, treeManager);
      }
    }]);
    return TaskSequence;
  }(Sequence);

  var TypeNames = ['if', 'else', 'while'];
  var CreateTaskSequence = function CreateTaskSequence(node, config) {
    if (Array.isArray(node)) {
      var nodes = node;
      if (nodes.length === 1) {
        return CreateTaskSequence(nodes[0], config);
      } else {
        var sequence = new Sequence({
          title: '[root]'
        });
        var lastIfSelector;
        for (var i = 0, cnt = nodes.length; i < cnt; i++) {
          var node = nodes[i];
          var child = CreateTaskSequence(node, config);
          // Construct if-branch selector
          switch (child.title) {
            case '[if]':
              sequence.addChild(child);
              lastIfSelector = child;
              break;
            case '[else]':
              if (lastIfSelector) {
                lastIfSelector.insertChild(child, null, -1);
              } else {
                // No [If] heading before this [else] heading
                console.warn("Can't find [If] heading before '".concat(node.title, "'"));
              }
              break;
            default:
              // Normal tasks
              sequence.addChild(child);
              lastIfSelector = null;
              break;
          }
        }
        return sequence;
      }
    } else {
      var nodeType = GetNodeType(node, TypeNames);
      switch (nodeType) {
        case 'if':
          var selector = new Selector({
            title: '[if]'
          });
          var ifDecorator = new If({
            expression: GetConditionExpression(node)
          });
          ifDecorator.addChild(CreateTaskSequence(node.children, config));
          selector.addChild(ifDecorator);
          var succeeder = new Succeeder();
          selector.addChild(succeeder);
          return selector;
        case 'else':
          var ifDecorator = new If({
            title: '[else]',
            expression: GetConditionExpression(node)
          });
          ifDecorator.addChild(CreateTaskSequence(node.children, config));
          return ifDecorator;
        case 'while':
          var whileDecorator = new RepeatUntilFailure({
            title: '[while]',
            returnSuccess: true
          });
          var ifDecorator = new If({
            title: '[while]',
            expression: GetConditionExpression(node)
          });
          ifDecorator.addChild(CreateTaskSequence(node.children, config));
          whileDecorator.addChild(ifDecorator);
          return whileDecorator;
        default:
          var sequence = new TaskSequence({
            title: node.title
          });
          var paragraphs = node.paragraphs; // paragraphs -> TaskAction[]
          for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
            var commandData = GetCommandData(paragraphs[i], config);
            if (!commandData) {
              continue;
            }
            var commandType = commandData.type;
            delete commandData.type;
            var actionNode;
            switch (commandType) {
              case 'exit':
                actionNode = new Abort({
                  title: '[exit]'
                });
                break;
              case 'break':
                actionNode = new Failer({
                  title: '[break]'
                });
                break;
              default:
                actionNode = new TaskAction(commandData);
                break;
            }
            sequence.addChild(actionNode);
          }
          return sequence;
      }
    }
  };
  var GetCommandData = function GetCommandData(paragraph, config) {
    var commandData;
    if (paragraph.hasOwnProperty('block')) {
      commandData = ParseCommandString(paragraph.block, ',', config);
      commandData.parameters.text = paragraph.text;
    } else {
      commandData = ParseCommandString(paragraph.text, '\n', config);
    }
    return commandData;
  };
  var ParseCommandString = function ParseCommandString(commandString, delimiter) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$lineReturn = _ref.lineReturn,
      lineReturn = _ref$lineReturn === void 0 ? '\\' : _ref$lineReturn,
      _ref$commentLineStart = _ref.commentLineStart,
      commentLineStart = _ref$commentLineStart === void 0 ? '\/\/' : _ref$commentLineStart;
    var lines = commandString.split(delimiter);
    if (delimiter === '\n') {
      // Discard comment lines
      lines = lines.filter(function (line) {
        return !line.trimLeft().startsWith(commentLineStart);
      });
      if (lines.length === 0) {
        return null;
      } else if (lines.length === 1) {
        var line = lines[0];
        if (IsExitCommand(line)) {
          return {
            type: 'exit'
          };
        } else if (IsBreakLabelCommand(line)) {
          return {
            type: 'break'
          };
        } else if (line.indexOf(',') !== -1) {
          lines = commandString.split(',');
        }
      }
    }
    var commandData = {
      type: 'task',
      name: TrimString(lines[0], lineReturn),
      parameters: {}
    };
    var parameters = commandData.parameters;
    for (var i = 1, cnt = lines.length; i < cnt; i++) {
      ParseProperty(TrimString(lines[i], lineReturn), parameters);
    }
    return commandData;
  };
  var TrimString = function TrimString(s, lineReturn) {
    if (lineReturn && s.at(-1) === lineReturn) {
      s = s.substring(0, s.length - 1);
    }
    return s.trimLeft();
  };
  var IsExitCommand = function IsExitCommand(s) {
    return s.trim().toLowerCase() === '[exit]';
  };
  var IsBreakLabelCommand = function IsBreakLabelCommand(s) {
    return s.trim().toLowerCase() === '[break]';
  };

  var Marked2Tree = function Marked2Tree(markedString) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$lineReturn = _ref.lineReturn,
      lineReturn = _ref$lineReturn === void 0 ? '\\' : _ref$lineReturn,
      _ref$commentLineStart = _ref.commentLineStart,
      commentLineStart = _ref$commentLineStart === void 0 ? '\/\/' : _ref$commentLineStart,
      _ref$parallel = _ref.parallel,
      parallel = _ref$parallel === void 0 ? false : _ref$parallel;
    return function (parallel) {
      var headingTree = GetHeadingTree(markedString);
      var treeConfig = GetTreeConfig(headingTree.paragraphs);
      var _ParseNodes = ParseNodes(headingTree.children),
        conditionNodes = _ParseNodes.conditionNodes,
        mainTaskNodes = _ParseNodes.mainTaskNodes,
        catchNodes = _ParseNodes.catchNodes;
      var _treeConfig$parallel = treeConfig.parallel,
        parallel = _treeConfig$parallel === void 0 ? parallel : _treeConfig$parallel;
      var taskSequenceConfig = {
        lineReturn: lineReturn,
        commentLineStart: commentLineStart
      };
      var tree = new EventBehaviorTree({
        title: headingTree.title,
        parallel: parallel,
        condition: GetConditionExpression(conditionNodes)
      });
      var rootNode = tree.root;
      rootNode.addChild(CreateTaskSequence(mainTaskNodes, taskSequenceConfig));
      var forceFailure = new ForceFailure();
      if (catchNodes.length > 0) {
        forceFailure.addChild(CreateTaskSequence(catchNodes[0], taskSequenceConfig));
      } else {
        forceFailure.addChild(new Succeeder());
      }
      rootNode.addChild(forceFailure);
      return tree;
    }(parallel);
  };

  var MarkedEventSheets = /*#__PURE__*/function (_EventSheetTrees) {
    _inherits(MarkedEventSheets, _EventSheetTrees);
    var _super = _createSuper(MarkedEventSheets);
    function MarkedEventSheets() {
      _classCallCheck(this, MarkedEventSheets);
      return _super.apply(this, arguments);
    }
    _createClass(MarkedEventSheets, [{
      key: "addEventSheet",
      value: function addEventSheet(markedString) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$lineReturn = _ref.lineReturn,
          lineReturn = _ref$lineReturn === void 0 ? '\\' : _ref$lineReturn,
          _ref$commentLineStart = _ref.commentLineStart,
          commentLineStart = _ref$commentLineStart === void 0 ? '\/\/' : _ref$commentLineStart,
          _ref$parallel = _ref.parallel,
          parallel = _ref$parallel === void 0 ? this.parallel : _ref$parallel;
        var tree = Marked2Tree(markedString, {
          lineReturn: lineReturn,
          commentLineStart: commentLineStart,
          parallel: parallel
        });
        this.addTree(tree);
        return this;
      }
    }]);
    return MarkedEventSheets;
  }(EventSheetTrees);

  var EventEmitterMethods = {
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

  var PropertyMethods$1 = {
    hasProperty: function hasProperty(property) {
      var gameObject = this.gameObject;
      if (gameObject.hasOwnProperty(property)) {
        return true;
      } else {
        var value = gameObject[property];
        return value !== undefined;
      }
    },
    getProperty: function getProperty(property) {
      return this.gameObject[property];
    },
    setProperty: function setProperty(property, value) {
      this.gameObject[property] = value;
      return this;
    },
    easeProperty: function easeProperty(property, value, duration, ease, repeat, isYoyo, _onComplete) {
      var tweenTasks = this.tweens;
      var tweenTask = tweenTasks[property];
      if (tweenTask) {
        tweenTask.remove();
      }
      var gameObject = this.gameObject;
      var config = {
        targets: gameObject,
        duration: duration,
        ease: ease,
        repeat: repeat,
        yoyo: isYoyo,
        onComplete: function onComplete() {
          tweenTasks[property].remove();
          tweenTasks[property] = null;
          if (_onComplete) {
            _onComplete(gameObject, property);
          }
        },
        onCompleteScope: this
      };
      config[property] = value;
      tweenTask = this.scene.tweens.add(config);
      tweenTask.timeScale = this.timeScale;
      tweenTasks[property] = tweenTask;
      return this;
    }
  };

  var CallMethods$1 = {
    hasMethod: function hasMethod(methodName) {
      return typeof this.gameObject[methodName] === 'function';
    },
    call: function call(methodName) {
      if (!this.hasMethod(methodName)) {
        return this;
      }
      var gameObject = this.gameObject;
      for (var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        parameters[_key - 1] = arguments[_key];
      }
      gameObject[methodName].apply(gameObject, parameters);
      return this;
    }
  };

  var DataMethods$1 = {
    hasData: function hasData(dataKey) {
      var gameObject = this.gameObject;
      return gameObject.data ? gameObject.data.has(dataKey) : false;
    },
    getData: function getData(dataKey) {
      return this.gameObject.getData(dataKey);
    },
    setData: function setData(dataKey, value) {
      this.gameObject.setData(dataKey, value);
      return this;
    }
  };

  var BobBase = /*#__PURE__*/function () {
    function BobBase(GOManager, gameObject, name) {
      _classCallCheck(this, BobBase);
      this.GOManager = GOManager;
      this.tweens = {};
      this.setGO(gameObject, name);
    }
    _createClass(BobBase, [{
      key: "scene",
      get: function get() {
        return this.GOManager.scene;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this.GOManager.timeScale;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.freeGO();
        this.GOManager = undefined;
      }
    }, {
      key: "freeTweens",
      value: function freeTweens() {
        var tweenTasks = this.tweens,
          tweenTask;
        for (var propName in tweenTasks) {
          tweenTask = tweenTasks[propName];
          if (tweenTask) {
            tweenTask.remove();
          }
          tweenTasks[propName] = null;
        }
        return this;
      }
    }, {
      key: "freeGO",
      value: function freeGO() {
        this.freeTweens();
        this.gameObject.destroy();
        this.gameObject = undefined;
        return this;
      }
    }, {
      key: "setGO",
      value: function setGO(gameObject, name) {
        gameObject.setName(name);
        this.gameObject = gameObject;
        this.name = name;
        this.freeTweens();
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        var tweenTasks = this.tweens;
        for (var key in tweenTasks) {
          var tweenTask = tweenTasks[key];
          if (tweenTask) {
            tweenTask.timeScale = timeScale;
          }
        }
        return this;
      }
    }]);
    return BobBase;
  }();
  Object.assign(BobBase.prototype, PropertyMethods$1, CallMethods$1, DataMethods$1);

  var IsEmpty = function IsEmpty(source) {
    for (var k in source) {
      return false;
    }
    return true;
  };

  var FadeMode = {
    tint: 0,
    alpha: 1
  };
  var FadeMethods = {
    setGOFadeMode: function setGOFadeMode(fadeMode) {
      if (typeof fadeMode === 'string') {
        fadeMode = FadeMode[fadeMode];
      }
      this.fadeMode = fadeMode;
      return this;
    },
    setGOFadeTime: function setGOFadeTime(time) {
      this.fadeTime = time;
      return this;
    },
    hasTintFadeEffect: function hasTintFadeEffect(gameObject) {
      return (this.fadeMode === undefined || this.fadeMode === 0) && this.fadeTime > 0 && gameObject.setTint !== undefined;
    },
    hasAlphaFadeEffect: function hasAlphaFadeEffect(gameObject) {
      return (this.fadeMode === undefined || this.fadeMode === 1) && this.fadeTime > 0 && gameObject.setAlpha !== undefined;
    },
    fadeBob: function fadeBob(bob, fromValue, toValue, onComplete) {
      var gameObject = bob.gameObject;
      if (this.hasTintFadeEffect(gameObject)) {
        if (fromValue !== undefined) {
          bob.setProperty('tintGray', 255 * fromValue);
        }
        bob.easeProperty('tintGray',
        // property
        Math.floor(255 * toValue),
        // to value
        this.fadeTime,
        // duration
        'Linear',
        // ease
        0,
        // repeat
        false,
        // yoyo
        onComplete // onComplete
        );
      } else if (this.hasAlphaFadeEffect(gameObject)) {
        if (fromValue !== undefined) {
          bob.setProperty('alpha', fromValue);
        }
        bob.easeProperty('alpha',
        // property
        toValue,
        // to value
        this.fadeTime,
        // duration
        'Linear',
        // ease
        0,
        // repeat
        false,
        // yoyo
        onComplete // onComplete
        );
      } else {
        if (onComplete) {
          onComplete(gameObject);
        }
      }
      return this;
    }
  };

  var GetR = function GetR(colorInt) {
    return colorInt >> 16 & 0xff;
  };
  var GetG = function GetG(colorInt) {
    return colorInt >> 8 & 0xff;
  };
  var GetB = function GetB(colorInt) {
    return colorInt & 0xff;
  };

  var MaskR = ~(0xff << 16) & 0xffffff;
  var MaskG = ~(0xff << 8) & 0xffffff;
  var MaskB = ~0xff & 0xffffff;
  var SetR = function SetR(colorInt, r) {
    return (r & 0xff) << 16 | colorInt & MaskR;
  };
  var SetG = function SetG(colorInt, g) {
    return (g & 0xff) << 8 | colorInt & MaskG;
  };
  var SetB = function SetB(colorInt, b) {
    return b & 0xff | colorInt & MaskB;
  };
  var SetRGB = function SetRGB(colorInt, r, g, b) {
    return (r & 0xff) << 16 | (g & 0xff) << 8 | b & 0xff;
  };

  var AddTintRGBProperties = function AddTintRGBProperties(gameObject, tintRGB) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('tintR')) {
      return gameObject;
    }
    if (tintRGB === undefined) {
      tintRGB = 0xffffff;
    }
    var tintR = GetR(tintRGB);
    var tintG = GetG(tintRGB);
    var tintB = GetB(tintRGB);

    // Override tint property
    Object.defineProperty(gameObject, 'tint', {
      get: function get() {
        return tintRGB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xffffff;
        if (gameObject.setTint) {
          gameObject.setTint(value);
        }
        if (tintRGB !== value) {
          tintRGB = value;
          tintR = GetR(tintRGB);
          tintG = GetG(tintRGB);
          tintB = GetB(tintRGB);
          // gameObject.emit('_tintchange', value, tintR, tintG, tintB);
        }
      }
    });

    Object.defineProperty(gameObject, 'tintR', {
      get: function get() {
        return tintR;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;
        if (tintR !== value) {
          tintR = value;
          gameObject.tint = SetR(tintRGB, value);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintG', {
      get: function get() {
        return tintG;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;
        if (tintG !== value) {
          tintG = value;
          gameObject.tint = SetG(tintRGB, value);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintB', {
      get: function get() {
        return tintB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;
        if (tintB !== value) {
          tintB = value;
          gameObject.tint = SetB(tintRGB, value);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintGray', {
      get: function get() {
        return Math.floor((tintR + tintG + tintB) / 3);
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;
        if (tintR !== value || tintG !== value || tintB !== value) {
          tintR = value;
          tintG = value;
          tintB = value;
          gameObject.tint = SetRGB(tintRGB, value, value, value);
        }
      }
    });
    gameObject.tint = tintRGB;
    return gameObject;
  };

  var EventEmitter$1 = Phaser.Events.EventEmitter;
  var MonitorViewport = function MonitorViewport(viewport) {
    if (viewport.events) {
      return viewport;
    }
    var events = new EventEmitter$1();
    var x = viewport.x;
    Object.defineProperty(viewport, 'x', {
      get: function get() {
        return x;
      },
      set: function set(value) {
        if (x !== value) {
          x = value;
          events.emit('update', viewport);
        }
      }
    });
    var y = viewport.y;
    Object.defineProperty(viewport, 'y', {
      get: function get() {
        return y;
      },
      set: function set(value) {
        if (y !== value) {
          y = value;
          events.emit('update', viewport);
        }
      }
    });
    var width = viewport.width;
    Object.defineProperty(viewport, 'width', {
      get: function get() {
        return width;
      },
      set: function set(value) {
        if (width !== value) {
          width = value;
          events.emit('update', viewport);
        }
      }
    });
    var height = viewport.height;
    Object.defineProperty(viewport, 'height', {
      get: function get() {
        return height;
      },
      set: function set(value) {
        if (height !== value) {
          height = value;
          events.emit('update', viewport);
        }
      }
    });
    viewport.events = events;
    return viewport;
  };

  var VPXYToXY = function VPXYToXY(vpx, vpy, vpxOffset, vpyOffset, viewport, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = GlobXY;
    }
    if (typeof vpxOffset !== 'number') {
      vpxOffset = 0;
      vpyOffset = 0;
    }
    out.x = viewport.x + viewport.width * vpx + vpxOffset;
    out.y = viewport.y + viewport.height * vpy + vpyOffset;
    return out;
  };
  var GlobXY = {};

  var AddViewportCoordinateProperties = function AddViewportCoordinateProperties(gameObject, viewport, vpx, vpy, vpxOffset, vpyOffset, transformCallback) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('vp')) {
      return gameObject;
    }
    if (typeof vpx === 'function') {
      transformCallback = vpx;
      vpx = undefined;
    }
    if (typeof vpxOffset === 'function') {
      transformCallback = vpxOffset;
      vpxOffset = undefined;
    }
    if (vpx === undefined) {
      vpx = 0.5;
    }
    if (vpy === undefined) {
      vpy = 0.5;
    }
    if (vpxOffset === undefined) {
      vpxOffset = 0;
    }
    if (vpyOffset === undefined) {
      vpyOffset = 0;
    }
    if (transformCallback === undefined) {
      transformCallback = VPXYToXY;
    }
    MonitorViewport(viewport);
    var events = viewport.events;
    gameObject.vp = viewport;

    // Set position of game object when view-port changed.
    var Transform = function Transform() {
      transformCallback(vpx, vpy, vpxOffset, vpyOffset, viewport, gameObject);
    };
    events.on('update', Transform);
    gameObject.once('destroy', function () {
      events.off('update', Transform);
      gameObject.vp = undefined;
    });
    Object.defineProperty(gameObject, 'vpx', {
      get: function get() {
        return vpx;
      },
      set: function set(value) {
        if (vpx !== value) {
          vpx = value;
          Transform();
        }
      }
    });
    Object.defineProperty(gameObject, 'vpy', {
      get: function get() {
        return vpy;
      },
      set: function set(value) {
        if (vpy !== value) {
          vpy = value;
          Transform();
        }
      }
    });
    Object.defineProperty(gameObject, 'vpxOffset', {
      get: function get() {
        return vpxOffset;
      },
      set: function set(value) {
        if (vpxOffset !== value) {
          vpxOffset = value;
          Transform();
        }
      }
    });
    Object.defineProperty(gameObject, 'vpyOffset', {
      get: function get() {
        return vpyOffset;
      },
      set: function set(value) {
        if (vpyOffset !== value) {
          vpyOffset = value;
          Transform();
        }
      }
    });
    Transform();
  };

  var RemoveItem$2 = Phaser.Utils.Array.Remove;
  var AddMethods = {
    has: function has(name) {
      return this.bobs.hasOwnProperty(name);
    },
    exists: function exists(name) {
      return this.bobs.hasOwnProperty(name);
    },
    get: function get(name) {
      return this.bobs[name];
    },
    getGO: function getGO(name) {
      var bob = this.get(name);
      return bob ? bob.gameObject : null;
    },
    addGO: function addGO(name, gameObject) {
      this.remove(name, true);
      if (this.hasTintFadeEffect(gameObject)) {
        AddTintRGBProperties(gameObject);
      }
      if (this.viewportCoordinateEnable) {
        AddViewportCoordinateProperties(gameObject, this.viewport);
      }
      gameObject.once('destroy', function () {
        RemoveItem$2(this.removedGOs, gameObject);
        if (this.isEmpty) {
          this.emit('empty');
        }
      }, this);
      var bob = new this.BobClass(this, gameObject, name);
      this.bobs[name] = bob;
      return this;
    },
    add: function add(name) {
      var callback = this.createGameObjectCallback;
      var scope = this.createGameObjectScope;
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var gameObject = callback.call.apply(callback, [scope, this.scene].concat(args));
      this.addGO(name, gameObject);
      var bob = this.get(name);
      this.fadeBob(bob, 0, 1);
      return this;
    },
    forEachGO: function forEachGO(callback, scope) {
      for (var name in this.bobs) {
        var gameObject = this.bobs[name].gameObject;
        var stopLoop;
        if (scope) {
          stopLoop = callback.call(scope, gameObject, name, this);
        } else {
          stopLoop = callback(gameObject, name, this);
        }
        if (stopLoop) {
          break;
        }
      }
      return this;
    }
  };

  var RemoveMethods = {
    remove: function remove(name, ignoreFade) {
      if (!this.has(name)) {
        return this;
      }
      var bob = this.get(name);
      delete this.bobs[name];
      this.removedGOs.push(bob.gameObject);
      if (!ignoreFade) {
        this.fadeBob(bob,
        // bob
        undefined,
        // fromValue
        0,
        // toValue
        function () {
          // onComplete
          bob.destroy();
        });
      } else {
        bob.destroy();
      }
      return this;
    },
    removeAll: function removeAll() {
      var bobs = this.bobs;
      for (var name in bobs) {
        this.remove(name);
      }
      return this;
    },
    clear: function clear(destroyChild) {
      if (destroyChild === undefined) {
        destroyChild = true;
      }
      var bobs = this.bobs;
      for (var name in bobs) {
        if (destroyChild) {
          bobs[name].destroy();
        }
        delete bobs[name];
      }
      this.removedGOs.length = 0;
      return this;
    }
  };

  var PropertyMethods = {
    hasProperty: function hasProperty(name, property) {
      if (!this.has(name)) {
        return false;
      }
      return this.get(name).hasProperty(property);
    },
    getProperty: function getProperty(name, property) {
      if (!this.has(name)) {
        return undefined;
      }
      return this.get(name).getProperty(property);
    },
    isNumberProperty: function isNumberProperty(name, property) {
      var value = this.getProperty(name, property);
      return typeof value === 'number';
    },
    setProperty: function setProperty(name, property, value) {
      if (!this.has(name)) {
        return this;
      }
      if (this.symbols && typeof value === 'string' && this.isNumberProperty(name, property)) {
        if (value in this.symbols) {
          value = this.symbols[value];
        } else {
          console.warn("Can't find symbol ".concat(value));
        }
      }
      this.get(name).setProperty(property, value);
      return this;
    },
    easeProperty: function easeProperty(name, property, value, duration, ease, repeat, isYoyo, onComplete) {
      if (!this.has(name)) {
        return this;
      }
      if (duration === undefined) {
        duration = 1000;
      }
      if (ease === undefined) {
        ease = 'Linear';
      }
      if (repeat === undefined) {
        repeat = 0;
      }
      if (isYoyo === undefined) {
        isYoyo = false;
      }
      if (this.symbols && typeof value === 'string' && this.isNumberProperty(name, property)) {
        if (value in this.symbols) {
          value = this.symbols[value];
        } else {
          console.warn("Can't find symbol ".concat(value));
        }
      }
      this.get(name).easeProperty(property, value, duration, ease, repeat, isYoyo, onComplete);
      return this;
    },
    hasTweenTask: function hasTweenTask(name, property) {
      if (!this.has(name)) {
        return false;
      }
      var tweenTasks = this.get(name).tweens;
      return tweenTasks.hasOwnProperty(property);
    },
    getTweenTask: function getTweenTask(name, property) {
      if (!this.has(name)) {
        return null;
      }
      var tweenTasks = this.get(name).tweens;
      var tweenTask = tweenTasks[property];
      return tweenTask ? tweenTask : null;
    }
  };

  var CallMethods = {
    hasMethod: function hasMethod(name, methodName) {
      if (!this.has(name)) {
        return false;
      }
      return this.get(name).hasMethod(methodName);
    },
    call: function call(name, methodName) {
      var _this$get;
      if (!this.has(name)) {
        return this;
      }
      for (var _len = arguments.length, parameters = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        parameters[_key - 2] = arguments[_key];
      }
      (_this$get = this.get(name)).call.apply(_this$get, [methodName].concat(parameters));
      return this;
    }
  };

  var DataMethods = {
    hasData: function hasData(name, dataKey) {
      if (!this.has(name)) {
        return false;
      }
      return this.get(name).hasData(dataKey);
    },
    getData: function getData(name, dataKey) {
      if (!this.has(name)) {
        return undefined;
      }
      return this.get(name).getData(dataKey);
    },
    setData: function setData(name, dataKey, value) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).setData(dataKey, value);
      return this;
    }
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

  Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround = Phaser.Math.RotateAround;
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
      RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
    }
    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }
    return output;
  };

  var GetValue$d = Phaser.Utils.Objects.GetValue;
  var DrawBounds = function DrawBounds(gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
    if (typeof config === 'number') {
      strokeColor = config;
    } else {
      strokeColor = GetValue$d(config, 'color');
      lineWidth = GetValue$d(config, 'lineWidth');
      fillColor = GetValue$d(config, 'fillColor');
      fillAlpha = GetValue$d(config, 'fillAlpha', 1);
      padding = GetValue$d(config, 'padding', 0);
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

  var DrawGameObjectsBounds = function DrawGameObjectsBounds(graphics, config) {
    this.forEachGO(function (gameObject) {
      if (gameObject.drawBounds) {
        gameObject.drawBounds(graphics, config);
      } else {
        DrawBounds(gameObject, graphics, config);
      }
    });
    return this;
  };

  var Methods$3 = {
    drawGameObjectsBounds: DrawGameObjectsBounds
  };
  Object.assign(Methods$3, FadeMethods, AddMethods, RemoveMethods, PropertyMethods, CallMethods, DataMethods);

  var CameraClass = Phaser.Cameras.Scene2D.BaseCamera;
  var IsCameraObject = function IsCameraObject(object) {
    return object instanceof CameraClass;
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var GetViewport = function GetViewport(scene, camera, out) {
    if (!IsCameraObject(camera)) {
      out = camera;
      camera = undefined;
    }
    if (out === undefined) {
      out = new Rectangle();
    } else if (out === true) {
      out = globRect;
    }
    if (camera) {
      return scene.scale.getViewPort(camera, out);
    } else {
      return scene.scale.getViewPort(out);
    }
  };
  var globRect = new Rectangle();

  var GetValue$c = Phaser.Utils.Objects.GetValue;
  var GOManager = /*#__PURE__*/function () {
    function GOManager(scene, config) {
      _classCallCheck(this, GOManager);
      this.scene = scene;
      this.BobClass = GetValue$c(config, 'BobClass', BobBase);
      this.setCreateGameObjectCallback(GetValue$c(config, 'createGameObject'), GetValue$c(config, 'createGameObjectScope'));
      this.setEventEmitter(GetValue$c(config, 'eventEmitter', undefined));
      var fadeConfig = GetValue$c(config, 'fade', 500);
      if (typeof fadeConfig === 'number') {
        this.setGOFadeMode();
        this.setGOFadeTime(fadeConfig);
      } else {
        this.setGOFadeMode(GetValue$c(fadeConfig, 'mode'));
        this.setGOFadeTime(GetValue$c(fadeConfig, 'time', 500));
      }
      var viewportCoordinateConfig = GetValue$c(config, 'viewportCoordinate', false);
      if (viewportCoordinateConfig !== false) {
        this.setViewportCoordinateEnable(GetValue$c(config, 'enable', true));
        this.setViewport(GetValue$c(viewportCoordinateConfig, 'viewport'));
      } else {
        this.setViewportCoordinateEnable(false);
      }
      this.setSymbols(GetValue$c(config, 'symbols'));
      this.bobs = {};
      this.removedGOs = [];
      this._timeScale = 1;
    }
    _createClass(GOManager, [{
      key: "destroy",
      value: function destroy(fromScene) {
        this.clear(!fromScene);
        this.createGameObjectCallback = undefined;
        this.viewport = undefined;
        this.scene = undefined;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this._timeScale;
      },
      set: function set(timeScale) {
        if (this._timeScale === timeScale) {
          return;
        }
        this._timeScale = timeScale;
        var bobs = this.bobs;
        for (var name in bobs) {
          bobs[name].setTimeScale(timeScale);
        }
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setCreateGameObjectCallback",
      value: function setCreateGameObjectCallback(callback, scope) {
        this.createGameObjectCallback = callback;
        this.createGameObjectScope = scope;
        return this;
      }
    }, {
      key: "setViewportCoordinateEnable",
      value: function setViewportCoordinateEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.viewportCoordinateEnable = enable;
        return this;
      }
    }, {
      key: "setViewport",
      value: function setViewport(viewport) {
        if (viewport === undefined) {
          viewport = GetViewport(this.scene, this.scene.cameras.main);
        }
        this.viewport = viewport;
        return this;
      }
    }, {
      key: "setSymbols",
      value: function setSymbols(symbols) {
        this.symbols = symbols;
        return this;
      }
    }, {
      key: "isEmpty",
      get: function get() {
        return IsEmpty(this.bobs) && this.removedGOs.length === 0;
      }
    }]);
    return GOManager;
  }();
  Object.assign(GOManager.prototype, EventEmitterMethods, Methods$3);

  var SortGameObjectsByDepth = function SortGameObjectsByDepth(gameObjects, descending) {
    if (gameObjects.length <= 1) {
      return gameObjects;
    }
    if (descending === undefined) {
      descending = false;
    }
    var scene = gameObjects[0].scene;
    var displayList = scene.sys.displayList;
    displayList.depthSort();
    if (descending) {
      gameObjects.sort(function (childA, childB) {
        return displayList.getIndex(childB) - displayList.getIndex(childA);
      });
    } else {
      gameObjects.sort(function (childA, childB) {
        return displayList.getIndex(childA) - displayList.getIndex(childB);
      });
    }
    return gameObjects;
  };

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var LayerManager = /*#__PURE__*/function (_GOManager) {
    _inherits(LayerManager, _GOManager);
    var _super = _createSuper(LayerManager);
    function LayerManager(scene, config) {
      var _this;
      _classCallCheck(this, LayerManager);
      if (config === undefined) {
        config = {};
      } else if (Array.isArray(config)) {
        config = {
          layers: config
        };
      }
      if (!config.hasOwnProperty('fade')) {
        config.fade = 0;
      }
      config.viewportCoordinate = false;
      _this = _super.call(this, scene, config);
      var initLayers = GetValue$b(config, 'layers');
      if (initLayers) {
        for (var i = 0, cnt = initLayers.length; i < cnt; i++) {
          _this.add(initLayers[i]);
        }
      }
      return _this;
    }
    _createClass(LayerManager, [{
      key: "setCreateGameObjectCallback",
      value: function setCreateGameObjectCallback(callback, scope) {
        if (!callback) {
          callback = CreateLayer;
        }
        _get(_getPrototypeOf(LayerManager.prototype), "setCreateGameObjectCallback", this).call(this, callback, scope);
        return this;
      }

      // Override
    }, {
      key: "addGO",
      value: function addGO(name, gameObject) {
        _get(_getPrototypeOf(LayerManager.prototype), "addGO", this).call(this, name, gameObject);
        gameObject.name = name;
        return this;
      }

      // New methods
    }, {
      key: "getLayer",
      value: function getLayer(name) {
        return this.getGO(name);
      }
    }, {
      key: "getLayers",
      value: function getLayers(out) {
        if (out === undefined) {
          out = [];
        }
        this.forEachGO(function (gameObject) {
          out.push(gameObject);
        });
        SortGameObjectsByDepth(out, false);
        return out;
      }
    }, {
      key: "addToLayer",
      value: function addToLayer(name, gameObject) {
        var layer = this.getGO(name);
        if (!layer) {
          console.warn("Can't get layer \"".concat(name, "\""));
          return;
        }
        if (gameObject.isRexContainerLite) {
          gameObject.addToLayer(layer);
        } else {
          layer.add(gameObject);
        }
        return this;
      }
    }]);
    return LayerManager;
  }(GOManager);
  var CreateLayer = function CreateLayer(scene, depth) {
    var layer = scene.add.layer();
    if (depth !== undefined) {
      layer.setDepth(depth);
    }
    return layer;
  };

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetSoundManager = function GetSoundManager(game) {
    if (IsSceneObject(game)) {
      return game.sys.sound;
    }
    return game.sound;
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

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$a(config, 'eventEmitter', true));

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

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    var _super = _createSuper(TickTask);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _super.call(this, parent, config);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$9(config, 'tickingMode', 1));
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

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);
    var _super = _createSuper(SceneUpdateTickTask);
    function SceneUpdateTickTask(parent, config) {
      var _this;
      _classCallCheck(this, SceneUpdateTickTask);
      _this = _super.call(this, parent, config);

      // scene update : update, preupdate, postupdate, prerender, render
      // game update : step, poststep, 

      // If this.scene is not available, use game's 'step' event
      var defaultEventName = _this.scene ? 'update' : 'step';
      _this.tickEventName = GetValue$8(config, 'tickEventName', defaultEventName);
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

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var Clamp$1 = Phaser.Math.Clamp;
  var Timer$1 = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$7(o, 'state', IDLE);
        this.timeScale = GetValue$7(o, 'timeScale', 1);
        this.delay = GetValue$7(o, 'delay', 0);
        this.repeat = GetValue$7(o, 'repeat', 0);
        this.repeatCounter = GetValue$7(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$7(o, 'repeatDelay', 0);
        this.duration = GetValue$7(o, 'duration', 0);
        this.nowTime = GetValue$7(o, 'nowTime', 0);
        this.justRestart = GetValue$7(o, 'justRestart', false);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          state: this.state,
          timeScale: this.timeScale,
          delay: this.delay,
          repeat: this.repeat,
          repeatCounter: this.repeatCounter,
          repeatDelay: this.repeatDelay,
          duration: this.duration,
          nowTime: this.nowTime,
          justRestart: this.justRestart
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(delay) {
        if (delay === undefined) {
          delay = 0;
        }
        this.delay = delay;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      }
    }, {
      key: "setRepeatInfinity",
      value: function setRepeatInfinity() {
        this.repeat = -1;
        return this;
      }
    }, {
      key: "setRepeatDelay",
      value: function setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        this.nowTime = this.delay > 0 ? -this.delay : 0;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.repeatCounter = 0;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.state = IDLE;
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.state === IDLE || this.state === DONE || delta === 0 || this.timeScale === 0) {
          return;
        }
        this.nowTime += delta * this.timeScale;
        this.justRestart = false;
        if (this.nowTime >= this.duration) {
          if (this.repeat === -1 || this.repeatCounter < this.repeat) {
            this.repeatCounter++;
            this.justRestart = true;
            this.nowTime -= this.duration;
            if (this.repeatDelay > 0) {
              this.nowTime -= this.repeatDelay;
              this.state = REPEATDELAY;
            }
          } else {
            this.nowTime = this.duration;
            this.state = DONE;
          }
        } else if (this.nowTime >= 0) {
          this.state = COUNTDOWN;
        }
      }
    }, {
      key: "t",
      get: function get() {
        var t;
        switch (this.state) {
          case IDLE:
          case DELAY:
          case REPEATDELAY:
            t = 0;
            break;
          case COUNTDOWN:
            t = this.nowTime / this.duration;
            break;
          case DONE:
            t = 1;
            break;
        }
        return Clamp$1(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp$1(value, -1, 1);
        if (value < 0) {
          this.state = DELAY;
          this.nowTime = -this.delay * value;
        } else {
          this.state = COUNTDOWN;
          this.nowTime = this.duration * value;
          if (value === 1 && this.repeat !== 0) {
            this.repeatCounter++;
          }
        }
      }
    }, {
      key: "setT",
      value: function setT(t) {
        this.t = t;
        return this;
      }
    }, {
      key: "isIdle",
      get: function get() {
        return this.state === IDLE;
      }
    }, {
      key: "isDelay",
      get: function get() {
        return this.state === DELAY;
      }
    }, {
      key: "isCountDown",
      get: function get() {
        return this.state === COUNTDOWN;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.state === DELAY || this.state === COUNTDOWN;
      }
    }, {
      key: "isDone",
      get: function get() {
        return this.state === DONE;
      }
    }, {
      key: "isOddIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 1;
      }
    }, {
      key: "isEvenIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 0;
      }
    }]);
    return Timer;
  }();
  var IDLE = 0;
  var DELAY = 1;
  var COUNTDOWN = 2;
  var REPEATDELAY = 3;
  var DONE = -1;

  var TimerTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(TimerTickTask, _TickTask);
    var _super = _createSuper(TimerTickTask);
    function TimerTickTask(parent, config) {
      var _this;
      _classCallCheck(this, TimerTickTask);
      _this = _super.call(this, parent, config);
      _this.timer = new Timer$1();
      // boot() later 
      return _this;
    }

    // override
    _createClass(TimerTickTask, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        _get(_getPrototypeOf(TimerTickTask.prototype), "shutdown", this).call(this, fromScene);
        this.timer.destroy();
        this.timer = undefined;
      }
    }, {
      key: "start",
      value: function start() {
        this.timer.start();
        _get(_getPrototypeOf(TimerTickTask.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.timer.stop();
        _get(_getPrototypeOf(TimerTickTask.prototype), "stop", this).call(this);
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.timer.stop();
        _get(_getPrototypeOf(TimerTickTask.prototype), "complete", this).call(this);
        return this;
      }
    }]);
    return TimerTickTask;
  }(SceneUpdateTickTask);

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
  var EaseValueTaskBase = /*#__PURE__*/function (_TimerTask) {
    _inherits(EaseValueTaskBase, _TimerTask);
    var _super = _createSuper(EaseValueTaskBase);
    function EaseValueTaskBase() {
      _classCallCheck(this, EaseValueTaskBase);
      return _super.apply(this, arguments);
    }
    _createClass(EaseValueTaskBase, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$6(o, 'timer'));
        this.setEnable(GetValue$6(o, 'enable', true));
        this.setTarget(GetValue$6(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
        this.setEase(GetValue$6(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$6(o, 'repeat', 0));
        return this;
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
      key: "setTarget",
      value: function setTarget(target) {
        if (target === undefined) {
          target = this.parent;
        }
        this.target = target;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(time) {
        this.delay = time;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(time) {
        this.duration = time;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
      }
    }, {
      key: "setRepeatDelay",
      value: function setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(ease) {
        if (ease === undefined) {
          ease = 'Linear';
        }
        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
      }

      // Override
    }, {
      key: "start",
      value: function start() {
        // Ignore start if timer is running, i.e. in DELAY, o RUN state
        if (this.timer.isRunning) {
          return this;
        }
        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.timer.stop();
        this.start.apply(this, arguments);
        return this;
      }
    }, {
      key: "stop",
      value: function stop(toEnd) {
        if (toEnd === undefined) {
          toEnd = false;
        }
        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "stop", this).call(this);
        if (toEnd) {
          this.timer.setT(1);
          this.updateGameObject(this.target, this.timer);
          this.complete();
        }
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable || !this.parent.active) {
          return this;
        }
        var target = this.target,
          timer = this.timer;
        timer.update(time, delta);

        // isDelay, isCountDown, isDone
        if (!timer.isDelay) {
          this.updateGameObject(target, timer);
        }
        this.emit('update', target, this);
        if (timer.isDone) {
          this.complete();
        }
        return this;
      }

      // Override
    }, {
      key: "updateGameObject",
      value: function updateGameObject(target, timer) {}
    }]);
    return EaseValueTaskBase;
  }(TimerTickTask);

  var SoundObjectClass = Phaser.Sound.BaseSound;
  var IsSoundObject = function IsSoundObject(object) {
    return object instanceof SoundObjectClass;
  };

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear = Phaser.Math.Linear;
  var Fade = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Fade, _EaseValueTaskBase);
    var _super = _createSuper(Fade);
    function Fade(scene, sound, config) {
      var _this;
      _classCallCheck(this, Fade);
      if (IsSoundObject(scene)) {
        config = sound;
        sound = scene;
        scene = undefined;
      }
      sound.active = true;
      sound.scene = scene;
      sound.game = sound.manager.game;
      _this = _super.call(this, sound, config);
      // this.parent = parent
      // this.timer

      _this.volume = {};
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(Fade, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Fade.prototype), "resetFromJSON", this).call(this, o);
        this.setMode(GetValue$5(o, 'mode', 0));
        this.setEnable(GetValue$5(o, 'enable', true));
        this.setVolumeRange(GetAdvancedValue(o, 'volume.start', this.parent.volume), GetAdvancedValue(o, 'volume.end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE[m];
        }
        this.mode = m;
        return this;
      }
    }, {
      key: "setVolumeRange",
      value: function setVolumeRange(start, end) {
        this.volume.start = start;
        this.volume.end = end;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }
        this.parent.setVolume(this.volume.start);
        this.timer.setDelay(this.delay).setDuration(this.duration);
        _get(_getPrototypeOf(Fade.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(parent, timer) {
        parent.volume = Linear(this.volume.start, this.volume.end, timer.t);
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Fade.prototype), "complete", this).call(this);
        switch (this.mode) {
          case 1:
            this.parent.stop();
            break;
          case 2:
            this.parent.destroy();
            break;
        }
        return this;
      }
    }]);
    return Fade;
  }(EaseValueTaskBase);
  var MODE = {
    stop: 1,
    destroy: 2
  };

  var FadeIn = function FadeIn(scene, sound, duration, endVolume, startVolume) {
    if (IsSoundObject(scene)) {
      startVolume = endVolume;
      endVolume = duration;
      duration = sound;
      sound = scene;
      scene = undefined;
    }
    if (endVolume === undefined) {
      endVolume = 1;
    }
    if (startVolume === undefined) {
      startVolume = 0;
    }
    var config = {
      mode: 0,
      volume: {
        start: startVolume,
        end: endVolume
      },
      duration: duration
    };

    // create sound instance by key
    if (typeof sound === 'string') {
      sound = scene.sys.sound.add(sound);
    }
    var fade;
    if (sound.hasOwnProperty('_fade')) {
      fade = sound._fade;
      fade.stop().resetFromJSON(config);
    } else {
      fade = new Fade(scene, sound, config);
      sound._fade = fade;
    }
    fade.start();
    if (!sound.isPlaying) {
      sound.setVolume(startVolume).play();
    }
    return sound;
  };

  var FadeOut = function FadeOut(scene, sound, duration, destroy) {
    if (IsSoundObject(scene)) {
      destroy = duration;
      duration = sound;
      sound = scene;
      scene = undefined;
    }
    if (destroy === undefined) {
      destroy = true;
    }
    var config = {
      mode: destroy ? 2 : 1,
      // 1: stop, 2: destroy
      volume: {
        start: sound.volume,
        end: 0
      },
      duration: duration
    };
    var fade;
    if (sound.hasOwnProperty('_fade')) {
      fade = sound._fade;
      fade.stop().resetFromJSON(config);
    } else {
      fade = new Fade(scene, sound, config);
      sound._fade = fade;
    }
    fade.start();
    if (!sound.isPlaying) {
      sound.play();
    }
    return sound;
  };

  var BackgroundMusicMethods$1 = {
    setBackgroundMusicLoopValue: function setBackgroundMusicLoopValue(value) {
      this.backgroundMusicLoopValue = value;
      return this;
    },
    setBackgroundMusicFadeTime: function setBackgroundMusicFadeTime(time) {
      this.backgroundMusicFadeTime = time;
      return this;
    },
    getBackgroundMusic: function getBackgroundMusic() {
      return this.backgroundMusic;
    },
    // Internal method
    setCurrentBackgroundMusic: function setCurrentBackgroundMusic(music) {
      this.backgroundMusic = music;
      if (music) {
        music.setLoop(this.backgroundMusicLoopValue);
        music.once('complete', function () {
          if (this.backgroundMusic === music) {
            this.backgroundMusic.destroy();
            this.backgroundMusic = undefined;
          }
        }, this).once('destroy', function () {
          if (this.backgroundMusic === music) {
            this.backgroundMusic = undefined;
          }
        }, this);
        if (!music.isPlaying) {
          music.play();
        }
      }
      return this;
    },
    playBackgroundMusic: function playBackgroundMusic(key) {
      // Don't re-play the same background music
      if (this.backgroundMusic && this.backgroundMusic.key === key) {
        return this;
      }
      this.stopBackgroundMusic(); // Stop previous background music

      this.setCurrentBackgroundMusic(this.sound.add(key));
      if (this.backgroundMusicFadeTime > 0) {
        this.fadeInBackgroundMusic(this.backgroundMusicFadeTime);
      }
      return this;
    },
    pauseBackgroundMusic: function pauseBackgroundMusic() {
      if (this.backgroundMusic) {
        this.backgroundMusic.pause();
      }
      return this;
    },
    resumeBackgroundMusic: function resumeBackgroundMusic() {
      if (this.backgroundMusic) {
        this.backgroundMusic.resume();
      }
      return this;
    },
    stopBackgroundMusic: function stopBackgroundMusic() {
      if (this.backgroundMusic) {
        if (this.backgroundMusicFadeTime > 0) {
          this.fadeOutBackgroundMusic(this.backgroundMusicFadeTime, true);
        } else {
          this.backgroundMusic.stop();
          this.backgroundMusic.destroy();
          this.backgroundMusic = undefined;
        }
      }
      return this;
    },
    fadeInBackgroundMusic: function fadeInBackgroundMusic(time) {
      if (this.backgroundMusic) {
        FadeIn(this.backgroundMusic, time, this.backgroundMusicVolume, 0);
      }
      return this;
    },
    fadeOutBackgroundMusic: function fadeOutBackgroundMusic(time, isStopped) {
      if (this.backgroundMusic) {
        FadeOut(this.backgroundMusic, time, isStopped);
      }
      return this;
    },
    crossFadeBackgroundMusic: function crossFadeBackgroundMusic(key, time) {
      var backgroundMusicFadeTimeSave = this.backgroundMusicFadeTime;
      this.backgroundMusicFadeTime = 0;
      this.fadeOutBackgroundMusic(time, true).playBackgroundMusic(key).fadeInBackgroundMusic(time);
      this.backgroundMusicFadeTime = backgroundMusicFadeTimeSave;
      return this;
    },
    setBackgroundMusicVolume: function setBackgroundMusicVolume(volume) {
      this.backgroundMusicVolume = volume;
      return this;
    },
    setBackgroundMusicMute: function setBackgroundMusicMute(mute) {
      if (mute === undefined) {
        mute = true;
      }
      if (this.backgroundMusic) {
        this.backgroundMusic.setMute(mute);
      }
      return this;
    }
  };

  var BackgroundMusic2Methods$1 = {
    setBackgroundMusic2LoopValue: function setBackgroundMusic2LoopValue(value) {
      this.backgroundMusic2LoopValue = value;
      return this;
    },
    setBackgroundMusic2FadeTime: function setBackgroundMusic2FadeTime(time) {
      this.backgroundMusic2FadeTime = time;
      return this;
    },
    getBackgroundMusic2: function getBackgroundMusic2() {
      return this.backgroundMusic2;
    },
    // Internal method
    setCurrentBackgroundMusic2: function setCurrentBackgroundMusic2(music) {
      this.backgroundMusic2 = music;
      if (music) {
        music.setLoop(this.backgroundMusic2LoopValue);
        music.once('complete', function () {
          if (this.backgroundMusic2 === music) {
            this.backgroundMusic2.destroy();
            this.backgroundMusic2 = undefined;
          }
        }, this).once('destroy', function () {
          if (this.backgroundMusic2 === music) {
            this.backgroundMusic2 = undefined;
          }
        }, this);
        if (!music.isPlaying) {
          music.play();
        }
      }
      return this;
    },
    playBackgroundMusic2: function playBackgroundMusic2(key) {
      // Don't re-play the same background music
      if (this.backgroundMusic2 && this.backgroundMusic2.key === key) {
        return this;
      }
      this.stopBackgroundMusic2(); // Stop previous background music

      this.setCurrentBackgroundMusic2(this.sound.add(key));
      if (this.backgroundMusic2FadeTime > 0) {
        this.fadeInBackgroundMusic2(this.backgroundMusic2FadeTime);
      }
      return this;
    },
    pauseBackgroundMusic2: function pauseBackgroundMusic2() {
      if (this.backgroundMusic2) {
        this.backgroundMusic2.pause();
      }
      return this;
    },
    resumeBackgroundMusic2: function resumeBackgroundMusic2() {
      if (this.backgroundMusic2) {
        this.backgroundMusic2.resume();
      }
      return this;
    },
    stopBackgroundMusic2: function stopBackgroundMusic2() {
      if (this.backgroundMusic2) {
        if (this.backgroundMusic2FadeTime > 0) {
          this.fadeOutBackgroundMusic2(this.backgroundMusic2FadeTime, true);
        } else {
          this.backgroundMusic2.stop();
          this.backgroundMusic2.destroy();
          this.backgroundMusic2 = undefined;
        }
      }
      return this;
    },
    fadeInBackgroundMusic2: function fadeInBackgroundMusic2(time) {
      if (this.backgroundMusic2) {
        FadeIn(this.backgroundMusic2, time, this.backgroundMusic2Volume, 0);
      }
      return this;
    },
    fadeOutBackgroundMusic2: function fadeOutBackgroundMusic2(time, isStopped) {
      if (this.backgroundMusic2) {
        FadeOut(this.backgroundMusic2, time, isStopped);
      }
      return this;
    },
    crossFadeBackgroundMusic2: function crossFadeBackgroundMusic2(key, time) {
      var backgroundMusic2FadeTimeSave = this.backgroundMusic2FadeTime;
      this.backgroundMusic2FadeTime = 0;
      this.fadeOutBackgroundMusic2(time, true).playBackgroundMusic2(key).fadeInBackgroundMusic2(time);
      this.backgroundMusic2FadeTime = backgroundMusic2FadeTimeSave;
      return this;
    },
    setBackgroundMusic2Volume: function setBackgroundMusic2Volume(volume) {
      this.backgroundMusic2Volume = volume;
      return this;
    },
    setBackgroundMusic2Mute: function setBackgroundMusic2Mute(mute) {
      if (mute === undefined) {
        mute = true;
      }
      if (this.backgroundMusic2) {
        this.backgroundMusic2.setMute(mute);
      }
      return this;
    }
  };

  var RemoveItem$1 = Phaser.Utils.Array.Remove;
  var SoundEffectsMethods$1 = {
    getSoundEffects: function getSoundEffects() {
      return this.soundEffects;
    },
    getLastSoundEffect: function getLastSoundEffect() {
      return this.soundEffects[this.soundEffects.length - 1];
    },
    playSoundEffect: function playSoundEffect(key) {
      var soundEffect = this.sound.add(key);
      soundEffect.setVolume(this.soundEffectsVolume);
      this.soundEffects.push(soundEffect);
      soundEffect.once('complete', function () {
        soundEffect.destroy();

        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem$1(this.soundEffects, soundEffect);
      }, this).once('destroy', function () {
        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem$1(this.soundEffects, soundEffect);
      }, this).play();
      return this;
    },
    fadeInSoundEffect: function fadeInSoundEffect(time) {
      var soundEffect = this.getLastSoundEffect();
      if (soundEffect) {
        FadeIn(soundEffect, time, this.soundEffectsVolume, 0);
      }
      return this;
    },
    fadeOutSoundEffect: function fadeOutSoundEffect(time, isStopped) {
      var soundEffect = this.getLastSoundEffect();
      if (soundEffect) {
        FadeOut(soundEffect, time, isStopped);
      }
      return this;
    },
    fadeOutAllSoundEffects: function fadeOutAllSoundEffects(time, isStopped) {
      for (var i = this.soundEffects.length - 1; i >= 0; i--) {
        FadeOut(this.soundEffects[i], time, isStopped);
      }
      return this;
    },
    setSoundEffectVolume: function setSoundEffectVolume(volume, lastSoundEffect) {
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      if (lastSoundEffect) {
        // Set volume of last sound effect
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
          soundEffect.setVolume(volume);
        }
      } else {
        // Set volume of all sound effects
        this.soundEffectsVolume = volume;
      }
      return this;
    },
    setSoundEffectMute: function setSoundEffectMute(mute, lastSoundEffect) {
      if (mute === undefined) {
        mute = true;
      }
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      if (lastSoundEffect) {
        // Set volume of last sound effect
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
          soundEffect.setMute(mute);
        }
      } else {
        // Set volume of all sound effects
        this.soundEffectsMute = mute;
      }
      return this;
    }
  };

  var RemoveItem = Phaser.Utils.Array.Remove;
  var SoundEffects2Methods$1 = {
    getSoundEffects2: function getSoundEffects2() {
      return this.soundEffects2;
    },
    getLastSoundEffect2: function getLastSoundEffect2() {
      return this.soundEffects2[this.soundEffects2.length - 1];
    },
    playSoundEffect2: function playSoundEffect2(key) {
      var soundEffect = this.sound.add(key);
      soundEffect.setVolume(this.soundEffects2Volume);
      this.soundEffects2.push(soundEffect);
      soundEffect.once('complete', function () {
        soundEffect.destroy();

        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem(this.soundEffects2, soundEffect);
      }, this).once('destroy', function () {
        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem(this.soundEffects2, soundEffect);
      }, this).play();
      return this;
    },
    fadeInSoundEffect2: function fadeInSoundEffect2(time) {
      var soundEffect = this.getLastSoundEffect2();
      if (soundEffect) {
        FadeIn(soundEffect, time, this.soundEffects2Volume, 0);
      }
      return this;
    },
    fadeOutSoundEffect2: function fadeOutSoundEffect2(time, isStopped) {
      var soundEffect = this.getLastSoundEffect2();
      if (soundEffect) {
        FadeOut(soundEffect, time, isStopped);
      }
      return this;
    },
    fadeOutAllSoundEffects2: function fadeOutAllSoundEffects2(time, isStopped) {
      for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
        FadeOut(this.soundEffects2[i], time, isStopped);
      }
      return this;
    },
    setSoundEffect2Volume: function setSoundEffect2Volume(volume, lastSoundEffect) {
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      if (lastSoundEffect) {
        // Set volume of last sound effect
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect) {
          soundEffect.setVolume(volume);
        }
      } else {
        // Set volume of all sound effects
        this.soundEffects2Volume = volume;
      }
      return this;
    },
    setSoundEffect2Mute: function setSoundEffect2Mute(mute, lastSoundEffect) {
      if (mute === undefined) {
        mute = true;
      }
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      if (lastSoundEffect) {
        // Set volume of last sound effect
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect) {
          soundEffect.setMute(mute);
        }
      } else {
        // Set volume of all sound effects
        this.soundEffects2Mute = mute;
      }
      return this;
    }
  };

  var Methods$2 = {};
  Object.assign(Methods$2, BackgroundMusicMethods$1, BackgroundMusic2Methods$1, SoundEffectsMethods$1, SoundEffects2Methods$1);

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var SoundManager = /*#__PURE__*/function () {
    function SoundManager(game, config) {
      _classCallCheck(this, SoundManager);
      this.sound = GetSoundManager(game);

      // Background music will be (fade out)destroyed when play next one.
      this.backgroundMusic = undefined;
      this._backgroundMusicVolume = GetValue$4(config, 'bgm.volume', 1);
      this.setBackgroundMusicLoopValue(GetValue$4(config, 'bgm.loop', true));
      this.setBackgroundMusicFadeTime(GetValue$4(config, 'bgm.fade', 500));
      this.backgroundMusic2 = undefined;
      this._backgroundMusic2Volume = GetValue$4(config, 'bgm2.volume', 1);
      this.setBackgroundMusic2LoopValue(GetValue$4(config, 'bgm2.loop', true));
      this.setBackgroundMusic2FadeTime(GetValue$4(config, 'bgm2.fade', 500));

      // Sound effect will be destroyed when completed
      this.soundEffects = [];
      this._soundEffectsVolume = GetValue$4(config, 'soundEffect.volume', 1);
      this.soundEffects2 = [];
      this._soundEffects2Volume = GetValue$4(config, 'soundEffect2.volume', 1);
      var initialBackgroundMusic = GetValue$4(config, 'bgm.initial', undefined);
      if (initialBackgroundMusic) {
        this.setCurrentBackgroundMusic(initialBackgroundMusic);
      }
      var initialBackgroundMusic2 = GetValue$4(config, 'bgm2.initial', undefined);
      if (initialBackgroundMusic2) {
        this.setCurrentBackgroundMusic2(initialBackgroundMusic2);
      }
    }
    _createClass(SoundManager, [{
      key: "destroy",
      value: function destroy() {
        if (this.backgroundMusic) {
          this.backgroundMusic.destroy();
        }
        this.backgroundMusic = undefined;
        if (this.backgroundMusic2) {
          this.backgroundMusic2.destroy();
        }
        this.backgroundMusic2 = undefined;
        if (this.soundEffects.length) {
          for (var i = this.soundEffects.length - 1; i >= 0; i--) {
            this.soundEffects[i].destroy();
          }
        }
        this.soundEffects.length = 0;
        if (this.soundEffects2.length) {
          for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
            this.soundEffects2[i].destroy();
          }
        }
        this.soundEffects2.length = 0;
        this.sound = undefined;
        return this;
      }
    }, {
      key: "backgroundMusicVolume",
      get: function get() {
        return this._backgroundMusicVolume;
      },
      set: function set(value) {
        this._backgroundMusicVolume = value;
        if (this.backgroundMusic) {
          this.backgroundMusic.setVolume(value);
        }
      }
    }, {
      key: "backgroundMusic2Volume",
      get: function get() {
        return this._backgroundMusic2Volume;
      },
      set: function set(value) {
        this._backgroundMusic2Volume = value;
        if (this.backgroundMusic2) {
          this.backgroundMusic2.setVolume(value);
        }
      }
    }, {
      key: "soundEffectsVolume",
      get: function get() {
        return this._soundEffectsVolume;
      },
      set: function set(value) {
        this._soundEffectsVolume = value;
        var soundEffects = this.soundEffects;
        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
          soundEffects[i].setVolume(value);
        }
      }
    }, {
      key: "soundEffectsMute",
      get: function get() {
        return this._soundEffectsMute;
      },
      set: function set(value) {
        this._soundEffectsMute = value;
        var soundEffects = this.soundEffects;
        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
          soundEffects[i].setMute(value);
        }
      }
    }, {
      key: "soundEffects2Volume",
      get: function get() {
        return this._soundEffects2Volume;
      },
      set: function set(value) {
        this._soundEffects2Volume = value;
        var soundEffects = this.soundEffects2;
        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
          soundEffects[i].setVolume(value);
        }
      }
    }, {
      key: "soundEffects2Mute",
      get: function get() {
        return this._soundEffects2Mute;
      },
      set: function set(value) {
        this._soundEffects2Mute = value;
        var soundEffects = this.soundEffects;
        for (var i = 0, cnt = soundEffects2.length; i < cnt; i++) {
          soundEffects[i].setMute(value);
        }
      }
    }]);
    return SoundManager;
  }();
  Object.assign(SoundManager.prototype, Methods$2);

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var BaseClock = /*#__PURE__*/function (_TickTask) {
    _inherits(BaseClock, _TickTask);
    var _super = _createSuper(BaseClock);
    function BaseClock(parent, config) {
      var _this;
      _classCallCheck(this, BaseClock);
      _this = _super.call(this, parent, config);
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(BaseClock, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isRunning = GetValue$3(o, 'isRunning', false);
        this.timeScale = GetValue$3(o, 'timeScale', 1);
        this.now = GetValue$3(o, 'now', 0);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          isRunning: this.isRunning,
          timeScale: this.timeScale,
          now: this.now,
          tickingMode: this.tickingMode
        };
      }

      // Override
      // startTicking() { }

      // Override
      // stopTicking() {}
    }, {
      key: "start",
      value: function start(startAt) {
        if (startAt === undefined) {
          startAt = 0;
        }
        this.delta = 0;
        this.now = startAt;
        _get(_getPrototypeOf(BaseClock.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.now = time;
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(value) {
        this.timeScale = value;
        return this;
      }
    }, {
      key: "tick",
      value: function tick(delta) {
        delta *= this.timeScale;
        this.now += delta;
        this.delta = delta;
        this.emit('update', this.now, this.delta);
        return this;
      }
    }]);
    return BaseClock;
  }(TickTask);

  var Clock = /*#__PURE__*/function (_BaseClock) {
    _inherits(Clock, _BaseClock);
    var _super = _createSuper(Clock);
    function Clock() {
      _classCallCheck(this, Clock);
      return _super.apply(this, arguments);
    }
    _createClass(Clock, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(Clock.prototype), "startTicking", this).call(this);
        this.scene.sys.events.on('update', this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(Clock.prototype), "stopTicking", this).call(this);
        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('update', this.update, this);
        }
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || this.timeScale === 0) {
          return this;
        }
        this.tick(delta);
        return this;
      }
    }]);
    return Clock;
  }(BaseClock);

  var Yoyo = function Yoyo(t, threshold) {
    if (threshold === undefined) {
      threshold = 0.5;
    }
    if (t <= threshold) {
      t = t / threshold;
    } else {
      t = 1 - (t - threshold) / (1 - threshold);
    }
    return t;
  };

  var Clamp = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(timeline, config) {
      _classCallCheck(this, Timer);
      this.setTimeline(timeline).reset(config);
    }
    _createClass(Timer, [{
      key: "setTimeline",
      value: function setTimeline(timeline) {
        this.timeline = timeline;
        return this;
      }
    }, {
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "setCallbacks",
      value: function setCallbacks(target, onStart, onProgress, onComplete) {
        this.target = target;
        this.onStart = onStart;
        this.onProgress = onProgress;
        this.onComplete = onComplete;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration, yoyo) {
        if (yoyo === undefined) {
          yoyo = false;
        }
        this.duration = duration;
        this.remainder = duration;
        this.t = 0;
        this.yoyo = yoyo;
        return this;
      }
    }, {
      key: "setPaused",
      value: function setPaused(state) {
        this.isPaused = state;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.isPaused = true;
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this.isPaused = false;
        return this;
      }
    }, {
      key: "setRemoved",
      value: function setRemoved(state) {
        this.removed = state;
        return this;
      }
    }, {
      key: "remove",
      value: function remove() {
        this.removed = true;
        return this;
      }
    }, {
      key: "seek",
      value: function seek(t) {
        this.remainder = this.duration * (1 - t);
        return this;
      }
    }, {
      key: "reset",
      value: function reset(o) {
        this.setName(o.name).setDuration(o.duration, o.yoyo).setCallbacks(o.target, o.onStart, o.onProgress, o.onComplete).setPaused(false).setRemoved(false);
        return this;
      }
    }, {
      key: "onFree",
      value: function onFree() {
        this.setTimeline().setCallbacks();
      }
    }, {
      key: "getProgress",
      value: function getProgress() {
        var value = 1 - this.remainder / this.duration;
        value = Clamp(value, 0, 1);
        if (this.yoyo) {
          value = Yoyo(value);
        }
        return value;
      }
    }, {
      key: "setProgress",
      value: function setProgress(value) {
        value = Clamp(value, 0, 1);
        this.remainder = this.duration * (1 - value);
      }
    }, {
      key: "runCallback",
      value: function runCallback(callback) {
        if (!callback) {
          return;
        }
        callback(this.target, this.t, this);
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.removed) {
          return true;
        } else if (this.isPaused) {
          return false;
        }
        this.remainder -= delta;
        this.t = this.getProgress();
        this.runCallback(this.onProgress);
        var isCompleted = this.remainder <= 0;
        if (isCompleted) {
          this.runCallback(this.onComplete);
        }
        return isCompleted;
      }
    }]);
    return Timer;
  }();

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

  var TimerPool$1 = /*#__PURE__*/function (_Pool) {
    _inherits(TimerPool, _Pool);
    var _super = _createSuper(TimerPool);
    function TimerPool() {
      _classCallCheck(this, TimerPool);
      return _super.apply(this, arguments);
    }
    _createClass(TimerPool, [{
      key: "allocate",
      value: function allocate() {
        return this.pop();
      }
    }, {
      key: "free",
      value: function free(timer) {
        timer.onFree();
        this.push(timer);
      }
    }, {
      key: "freeMultiple",
      value: function freeMultiple(arr) {
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
          this.free(arr[i]);
        }
        return this;
      }
    }]);
    return TimerPool;
  }(Stack);

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var TimerPool = new TimerPool$1();
  var Timeline = /*#__PURE__*/function (_Clock) {
    _inherits(Timeline, _Clock);
    var _super = _createSuper(Timeline);
    function Timeline(parent, config) {
      var _this;
      _classCallCheck(this, Timeline);
      _this = _super.call(this, parent, config);
      _this.addedTimers = [];
      _this.timers = [];
      _this.timerPool = GetValue$2(config, 'pool', TimerPool);
      return _this;
    }
    _createClass(Timeline, [{
      key: "shutdown",
      value: function shutdown() {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.timerPool.freeMultiple(this.addedTimers).freeMultiple(this.timers);
        this.timerPool = undefined;
        this.addedTimers = undefined;
        this.timers = undefined;
        _get(_getPrototypeOf(Timeline.prototype), "shutdown", this).call(this);
      }
    }, {
      key: "addTimer",
      value: function addTimer(config) {
        var timer = this.timerPool.allocate();
        if (!timer) {
          timer = new Timer(this, config);
        } else {
          timer.setTimeline(this).reset(config);
        }
        this.addedTimers.push(timer);
        timer.runCallback(timer.onStart);
        if (!this.isRunning) {
          this.start();
        }
        return timer;
      }
    }, {
      key: "delayCall",
      value: function delayCall(delay, callback, args, scope) {
        var timer = this.addTimer({
          duration: delay,
          onComplete: function onComplete(target, t, timer) {
            if (args === undefined) {
              args = [];
            }
            args.push(timer);
            callback.apply(scope, args);
          }
        });
        return timer;
      }
    }, {
      key: "delayEvent",
      value: function delayEvent(delay, eventName) {
        this.removeDelayEvent(eventName);
        // Clear existed event

        var timer = this.delayCall(delay, function () {
          this.removeDelayEvent(eventName); // Clear this timer
          this.emit(eventName);
        }, [], this);
        this.once("_remove.".concat(eventName), function () {
          timer.remove();
          timer = undefined;
        });
        return this;
      }
    }, {
      key: "removeDelayEvent",
      value: function removeDelayEvent(eventName) {
        this.emit("_remove.".concat(eventName));
        return this;
      }
    }, {
      key: "getTimers",
      value: function getTimers(name) {
        var timers = [];
        var timerQueues = [this.addedTimers, this.timers];
        for (var ti = 0, tcnt = timerQueues.length; ti < tcnt; ti++) {
          var timerQueue = timerQueues[ti];
          for (var i = 0, cnt = timerQueue.length; i < cnt; i++) {
            var timer = timerQueue[i];
            if (timer.name === name) {
              timers.push(timer);
            }
          }
        }
        return timers;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        var _this$timers;
        _get(_getPrototypeOf(Timeline.prototype), "update", this).call(this, time, delta);
        if (!this.isRunning) {
          return;
        }
        (_this$timers = this.timers).push.apply(_this$timers, _toConsumableArray(this.addedTimers));
        this.addedTimers.length = 0;
        var pendingTimers = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
          var timer = this.timers[i];
          var isStopped = timer.update(this.now, this.delta);
          if (isStopped) {
            this.timerPool.free(timer); // Free timer
          } else {
            pendingTimers.push(timer); // Add to timer queue
          }
        }

        this.timers = pendingTimers;
        if (this.timers.length === 0 && this.addedTimers.length === 0) {
          this.complete(); // Emit 'complete' event
        }
      }
    }]);
    return Timeline;
  }(Clock);

  var WaitCompleteEvent = '_wait.complete';
  var RemoveWaitEvents = '_remove.wait';

  var WaitTimeMethods = {
    waitTime: function waitTime(duration) {
      var timeline = this.parent.timeline;
      timeline.delayEvent(duration, 'delay');

      // Clear delay event on timeline manually
      this.parent.once(RemoveWaitEvents, function () {
        timeline.removeDelayEvent('delay');
      });
      return this.waitEvent(timeline, 'delay');
    }
  };

  var Split = function Split(s, delimiter) {
    var regexString = "(?<!\\\\)\\".concat(delimiter);
    var escapeString = "\\".concat(delimiter);
    return s.split(new RegExp(regexString, 'g')).map(function (s) {
      return s.replace(escapeString, delimiter);
    });
  };

  var WaitInputMethods = {
    setClickTarget: function setClickTarget(target) {
      this.clickTarget = target;
      if (!target) {
        this.clickEE = null;
      } else if (IsSceneObject(target)) {
        this.clickEE = target.input;
      } else {
        // Assume that target is a gameObject
        this.clickEE = target.setInteractive();
      }
    },
    waitClick: function waitClick() {
      if (!this.clickEE) {
        return this.waitTime(0);
      }
      return this.waitEvent(this.clickEE, 'pointerdown');
    },
    waitKeyDown: function waitKeyDown(key) {
      var eventEmitter = this.scene.input.keyboard;
      if (typeof key === 'string') {
        if (key.indexOf('|') === -1) {
          return this.waitEvent(eventEmitter, "keydown-".concat(key.toUpperCase()));
        } else {
          var keys = Split(key, '|');
          for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.waitEvent(eventEmitter, "keydown-".concat(key.toUpperCase()));
          }
          return this.parent;
        }
      } else {
        return this.waitEvent(eventEmitter, 'keydown');
      }
    }
  };

  var WaitGameObjectMethods = {
    waitGameObjectTweenComplete: function waitGameObjectTweenComplete(goType, name, property) {
      var tweenTask = this.parent.getGameObjectTweenTask(goType, name, property);
      if (tweenTask) {
        return this.waitEvent(tweenTask, 'complete');
      }
      return this.waitTime(0);
    },
    waitGameObjectDataFlag: function waitGameObjectDataFlag(goType, name, dataKey, trueFlag) {
      var gameObject = this.parent.getGameObject(goType, name);
      if (!gameObject) {
        return this.waitTime(0);
      }
      if (gameObject.getData(dataKey) === trueFlag) {
        return this.waitTime(0);
      }
      var eventName = "changedata-".concat(dataKey);
      var callback = function callback(gameObject, value, previousValue) {
        value = !!value;
        if (value === trueFlag) {
          gameObject.emit('_dataFlagMatch');
        }
      };
      gameObject.on(eventName, callback);
      // Clear changedata event on gameobject manually
      this.parent.once(RemoveWaitEvents, function () {
        gameObject.off(eventName, callback);
      });
      return this.waitEvent(gameObject, '_dataFlagMatch');
    },
    waitGameObjectDestroy: function waitGameObjectDestroy(goType, name) {
      var gameObject = this.parent.getGameObject(goType, name);
      if (!gameObject) {
        return this.waitTime(0);
      }
      return this.waitEvent(gameObject, 'destroy');
    },
    waitGameObjectManagerEmpty: function waitGameObjectManagerEmpty(goType) {
      if (goType) {
        var gameObjectManager = this.parent.getGameObjectManager(goType);
        if (!gameObjectManager) {
          return this.waitTime(0);
        }
        return this.waitEvent(gameObjectManager, 'empty');
      } else {
        var gameObjectManagers = this.parent.gameObjectManagers;
        var hasAnyWaitEvent = false;
        for (var name in gameObjectManagers) {
          hasAnyWaitEvent = true;
          this.waitEvent(gameObjectManagers[name], 'empty');
        }
        if (!hasAnyWaitEvent) {
          return this.waitTime(0);
        }
        return this.parent;
      }
    }
  };

  var WaitCameraMethods = {
    setCameraTarget: function setCameraTarget(camera) {
      this.cameraTarget = camera;
      return this;
    },
    waitCameraEffectComplete: function waitCameraEffectComplete(effectName) {
      var camera = this.cameraTarget;
      if (!camera) {
        return this.waitTime(0);
      }
      var effect, completeEventName;
      switch (effectName) {
        case 'camera.fadein':
          effect = camera.fadeEffect;
          completeEventName = 'camerafadeincomplete';
          break;
        case 'camera.fadeout':
          effect = camera.fadeEffect;
          completeEventName = 'camerafadeoutcomplete';
          break;
        case 'camera.flash':
          effect = camera.flashEffect;
          completeEventName = 'cameraflashcomplete';
          break;
        case 'camera.shake':
          effect = camera.shakeEffect;
          completeEventName = 'camerashakecomplete';
          break;
        case 'camera.zoom':
          effect = camera.zoomEffect;
          completeEventName = 'camerazoomcomplete';
          break;
        case 'camera.rotate':
          effect = camera.rotateToEffect;
          completeEventName = 'camerarotatecomplete';
          break;
        case 'camera.scroll':
          effect = camera.panEffect;
          completeEventName = 'camerapancomplete';
          break;
      }
      if (!effect.isRunning) {
        return this.waitTime(0);
      }
      return this.waitEvent(camera, completeEventName);
    }
  };

  var WaitMusicMethods = {
    waitSoundEffectComplete: function waitSoundEffectComplete() {
      if (!this.parent.soundManager) {
        return this.waitTime(0);
      }
      var music = this.parent.soundManager.getLastSoundEffect();
      if (!music) {
        return this.waitTime(0);
      }
      return this.waitEvent(music, 'complete');
    },
    waitSoundEffect2Complete: function waitSoundEffect2Complete() {
      if (!this.parent.soundManager) {
        return this.waitTime(0);
      }
      var music = this.parent.soundManager.getLastSoundEffect2();
      if (!music) {
        return this.waitTime(0);
      }
      return this.waitEvent(music, 'complete');
    },
    waitBackgroundMusicComplete: function waitBackgroundMusicComplete() {
      if (!this.parent.soundManager) {
        return this.waitTime(0);
      }
      var music = this.parent.soundManager.getBackgroundMusic();
      if (!music) {
        return this.waitTime(0);
      }
      return this.waitEvent(music, 'complete');
    },
    waitBackgroundMusic2Complete: function waitBackgroundMusic2Complete() {
      if (!this.parent.soundManager) {
        return this.waitTime(0);
      }
      var music = this.parent.soundManager.getBackgroundMusic2();
      if (!music) {
        return this.waitTime(0);
      }
      return this.waitEvent(music, 'complete');
    }
  };

  var WaitAny = function WaitAny(config) {
    if (!config) {
      return this.waitTime(0);
    }
    var hasAnyWaitEvent = false;
    for (var name in config) {
      switch (name) {
        case 'time':
          hasAnyWaitEvent = true;
          this.waitTime(config.time);
          break;
        case 'click':
          hasAnyWaitEvent = true;
          this.waitClick(config.key);
          break;
        case 'key':
          hasAnyWaitEvent = true;
          this.waitKeyDown(config.key);
          break;
        case 'bgm':
          hasAnyWaitEvent = true;
          this.waitBackgroundMusicComplete();
          break;
        case 'bgm2':
          hasAnyWaitEvent = true;
          this.waitBackgroundMusic2Complete();
          break;
        case 'se':
          hasAnyWaitEvent = true;
          this.waitSoundEffectComplete();
          break;
        case 'se2':
          hasAnyWaitEvent = true;
          this.waitSoundEffect2Complete();
          break;
        case 'camera':
          hasAnyWaitEvent = true;
          this.waitCameraEffectComplete("camera.".concat(config.camera.toLowerCase()));
          break;
        default:
          var names = name.split('.');
          if (names.length === 2) {
            var gameObjectName = names[0];
            var propName = names[1];
            var gameObjectManager = this.parent.getGameObjectManager(undefined, gameObjectName);
            if (!gameObjectManager) {
              continue;
            }
            if (propName === 'destroy') {
              return this.waitGameObjectDestroy(undefined, gameObjectName);
            }
            var value = gameObjectManager.getProperty(gameObjectName, propName);
            if (typeof value === 'number') {
              hasAnyWaitEvent = true;
              this.waitGameObjectTweenComplete(undefined, gameObjectName, propName);
              continue;
            }
            var dataKey = propName;
            var matchFalseFlag = dataKey.startsWith('!');
            if (matchFalseFlag) {
              dataKey = dataKey.substring(1);
            }
            if (gameObjectManager.hasData(gameObjectName, propName)) {
              hasAnyWaitEvent = true;
              this.waitGameObjectDataFlag(undefined, gameObjectName, dataKey, !matchFalseFlag);
            }
          }
          break;
      }
    }
    if (!hasAnyWaitEvent) {
      this.waitTime(0);
    }
    return this.parent;
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
  var GetValue$1 = function GetValue(source, key, defaultValue) {
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

  var PreUpdateDelayCall = function PreUpdateDelayCall(gameObject, delay, callback, scope, args) {
    // Invoke callback under scene's 'preupdate' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function () {
      scene.sys.events.once('preupdate', function () {
        callback.call(scope, args);
      });
    });
    return timer;
  };

  var WaitEventManager = /*#__PURE__*/function () {
    function WaitEventManager(parent, config) {
      _classCallCheck(this, WaitEventManager);
      this.parent = parent;
      this.waitCompleteEventName = GetValue$1(config, 'completeEventName', WaitCompleteEvent);
      this.setClickTarget(GetValue$1(config, 'clickTarget', this.scene));
      this.setCameraTarget(GetValue$1(config, 'camera', this.scene.cameras.main));
      this.waitId = 0;
    }
    _createClass(WaitEventManager, [{
      key: "clickTarget",
      get: function get() {
        return this.parent.clickTarget;
      },
      set: function set(value) {
        this.parent.clickTarget = value;
      }
    }, {
      key: "cameraTarget",
      get: function get() {
        return this.parent.cameraTarget;
      },
      set: function set(value) {
        this.parent.cameraTarget = value;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.removeWaitEvents();
        this.clearWaitCompleteCallbacks();
        this.setClickTarget();
        this.setCameraTarget();
      }
    }, {
      key: "scene",
      get: function get() {
        return this.parent.managersScene;
      }
    }, {
      key: "waitEvent",
      value: function waitEvent(eventEmitter, eventName, completeNextTick) {
        var callback = this.getWaitCompleteTriggerCallback(completeNextTick);
        eventEmitter.once(eventName, callback, this);
        this.parent.once(RemoveWaitEvents, function () {
          eventEmitter.off(eventName, callback, this);
        });
        return this.parent;
      }
    }, {
      key: "getWaitCompleteTriggerCallback",
      value: function getWaitCompleteTriggerCallback(completeNextTick) {
        if (completeNextTick === undefined) {
          completeNextTick = true;
        }
        var waitId = this.waitId;
        var self = this;
        var completeCallback = function completeCallback() {
          if (waitId < self.waitId) {
            return;
          }
          self.waitId++;
          self.removeWaitEvents();
          self.parent.emit(self.waitCompleteEventName);
        };
        if (completeNextTick) {
          var completeCallbackNextTick = function completeCallbackNextTick() {
            PreUpdateDelayCall(self.parent, 0, completeCallback);
          };
          return completeCallbackNextTick;
        } else {
          return completeCallback;
        }
      }
    }, {
      key: "removeWaitEvents",
      value: function removeWaitEvents() {
        this.parent.emit(RemoveWaitEvents);
        return this;
      }
    }, {
      key: "addWaitCompleteCallback",
      value: function addWaitCompleteCallback(callback, scope) {
        this.parent.on(this.waitCompleteEventName, callback, scope);
        return this;
      }
    }, {
      key: "clearWaitCompleteCallbacks",
      value: function clearWaitCompleteCallbacks() {
        this.parent.off(this.waitCompleteEventName);
        return this;
      }
    }]);
    return WaitEventManager;
  }();
  var Methods$1 = {
    waitAny: WaitAny
  };
  Object.assign(WaitEventManager.prototype, WaitTimeMethods, WaitInputMethods, WaitGameObjectMethods, WaitCameraMethods, WaitMusicMethods, Methods$1);

  var GetValue = Phaser.Utils.Objects.GetValue;
  var InitManagers = function InitManagers(scene, config) {
    this.clickTarget = undefined;
    this.cameraTarget = undefined;
    this.managersScene = scene;
    this.gameObjectManagers = {};
    var layerManagerConfig = GetValue(config, 'layers', false);
    if (layerManagerConfig !== false) {
      this.gameObjectManagers.layer = new LayerManager(scene, layerManagerConfig);
    }
    var soundManagerConfig = GetValue(config, 'sounds');
    if (soundManagerConfig !== false) {
      this.soundManager = new SoundManager(scene, soundManagerConfig);
    }
    this.timeline = new Timeline(this);
    this.waitEventManager = new WaitEventManager(this, config);
    return this;
  };

  var SetTimeScale = function SetTimeScale(value) {
    this.timeline.timeScale = value;
    for (var name in this.gameObjectManagers) {
      this.gameObjectManagers[name].setTimeScale(value);
    }
    return this;
  };

  var GetTimeScale = function GetTimeScale() {
    return this.timeline.timeScale;
  };

  var DestroyManagers = function DestroyManagers(fromScene) {
    this.waitEventManager.destroy();
    this.waitEventManager = undefined;
    for (var name in this.gameObjectManagers) {
      this.gameObjectManagers[name].destroy(fromScene);
      delete this.gameObjectManagers[name];
    }
    if (this.soundManager) {
      this.soundManager.destroy();
      this.soundManager = undefined;
    }
    if (this.timeline) {
      this.timeline.destroy();
      this.timeline = undefined;
    }
    this.clickTarget = undefined;
    this.cameraTarget = undefined;
    this.managersScene = undefined;
  };

  var GameObjectManagerMethods = {
    addGameObjectManager: function addGameObjectManager(config, GameObjectManagerClass) {
      if (config === undefined) {
        config = {};
      }
      if (GameObjectManagerClass === undefined) {
        GameObjectManagerClass = GOManager;
      }
      if (!config.createGameObjectScope) {
        config.createGameObjectScope = this;
      }
      var gameobjectManager = new GameObjectManagerClass(this.managersScene, config);
      this.gameObjectManagers[config.name] = gameobjectManager;
      return this;
    },
    getGameObjectManager: function getGameObjectManager(managerName, gameObjectName) {
      if (managerName) {
        var manager = this.gameObjectManagers[managerName];
        return manager;
      } else {
        for (var managerName in this.gameObjectManagers) {
          var manager = this.gameObjectManagers[managerName];
          if (manager.has(gameObjectName)) {
            return manager;
          }
        }
      }
    },
    getGameObjectManagerNames: function getGameObjectManagerNames() {
      var names = [];
      for (var name in this.gameObjectManagers) {
        names.push(name);
      }
      return names;
    },
    getGameObjectManagerName: function getGameObjectManagerName(gameObjectName) {
      for (var managerName in this.gameObjectManagers) {
        if (this.gameObjectManagers[managerName].has(gameObjectName)) {
          return managerName;
        }
      }
    },
    hasGameObjectMananger: function hasGameObjectMananger(managerName) {
      return managerName in this.gameObjectManagers;
    }
  };

  var GameObjectMethods$1 = {
    createGameObject: function createGameObject(goType, name) {
      var _this$getGameObjectMa;
      for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        params[_key - 2] = arguments[_key];
      }
      (_this$getGameObjectMa = this.getGameObjectManager(goType, name)).add.apply(_this$getGameObjectMa, [name].concat(params));
      return this;
    },
    destroyGameObject: function destroyGameObject(goType, name) {
      var gameObjectManager = this.getGameObjectManager(goType, name);
      if (name === undefined) {
        gameObjectManager.removeAll();
      } else {
        gameObjectManager.remove(name);
      }
      return this;
    },
    hasGameObject: function hasGameObject(goType, name) {
      return !!this.getGameObjectManager(goType, name);
    },
    callGameObjectMethod: function callGameObjectMethod(goType, name, methodName) {
      var _this$getGameObjectMa2;
      for (var _len2 = arguments.length, params = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        params[_key2 - 3] = arguments[_key2];
      }
      (_this$getGameObjectMa2 = this.getGameObjectManager(goType, name)).call.apply(_this$getGameObjectMa2, [name, methodName].concat(params));
      return this;
    },
    setGameObjectProperty: function setGameObjectProperty(goType, name, prop, value) {
      this.getGameObjectManager(goType, name).setProperty(name, prop, value);
      return this;
    },
    easeGameObjectProperty: function easeGameObjectProperty(goType, name, prop, value, duration, ease, repeat, isYoyo) {
      this.getGameObjectManager(goType, name).easeProperty(name, prop, value, duration, ease, repeat, isYoyo);
      return this;
    },
    getGameObjectTweenTask: function getGameObjectTweenTask(goType, name, property) {
      return this.getGameObjectManager(goType, name).getTweenTask(name, property);
    },
    getGameObject: function getGameObject(goType, name, out) {
      var gameobjectManager = this.getGameObjectManager(goType, name);
      if (typeof name === 'string') {
        return gameobjectManager.getGO(name);
      } else {
        var names = name;
        if (names === undefined) {
          names = gameobjectManager.bobs;
        }
        if (out === undefined) {
          out = {};
        }
        for (name in names) {
          out[name] = gameobjectManager.getGO(name);
        }
        return out;
      }
    },
    addGameObject: function addGameObject(goType, name, gameObject) {
      var gameobjectManager = this.getGameObjectManager(goType, name);
      if (typeof name === 'string') {
        gameobjectManager.addGO(name, gameObject);
      } else {
        var names = name;
        for (name in names) {
          gameobjectManager.addGO(name, names[name]);
        }
      }
      return this;
    },
    drawGameObjectsBounds: function drawGameObjectsBounds(goTypes, graphics, config) {
      if (goTypes instanceof Phaser.GameObjects.Graphics) {
        config = graphics;
        graphics = goTypes;
        goTypes = undefined;
      }
      if (goTypes === undefined) {
        goTypes = this.getGameObjectManagerNames();
      }
      if (!Array.isArray(goTypes)) {
        goTypes = [goTypes];
      }
      for (var i = 0, cnt = goTypes.length; i < cnt; i++) {
        this.getGameObjectManager(goTypes[i]).drawGameObjectsBounds(graphics, config);
      }
      return this;
    }
  };

  var Extend = function Extend(BaseClass) {
    var Managers = /*#__PURE__*/function (_BaseClass) {
      _inherits(Managers, _BaseClass);
      var _super = _createSuper(Managers);
      function Managers() {
        _classCallCheck(this, Managers);
        return _super.apply(this, arguments);
      }
      return _createClass(Managers);
    }(BaseClass);
    var Methods = {
      initManagers: InitManagers,
      setTimeScale: SetTimeScale,
      getTimeScale: GetTimeScale,
      destroyManagers: DestroyManagers
    };
    Object.assign(Managers.prototype, Methods, GameObjectManagerMethods, GameObjectMethods$1);
    return Managers;
  };

  var EventEmitter = Phaser.Events.EventEmitter;
  var Managers = /*#__PURE__*/function (_Extend) {
    _inherits(Managers, _Extend);
    var _super = _createSuper(Managers);
    function Managers(scene, config) {
      var _this;
      _classCallCheck(this, Managers);
      if (config === undefined) {
        config = {};
      }
      config.completeEventName = 'complete';
      if (!config.hasOwnProperty('layers')) {
        config.layers = undefined;
      }
      _this = _super.call(this);
      _this.scene = scene;
      _this.initManagers(scene, config);
      return _this;
    }
    _createClass(Managers, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }
        this.destroyManagers(fromScene);
        this.scene = undefined;
        _get(_getPrototypeOf(Managers.prototype), "destroy", this).call(this);
      }
    }]);
    return Managers;
  }(Extend(EventEmitter));

  var AddCommand = function AddCommand(name, callback, scope) {
    if (scope === undefined) {
      scope = this;
    }
    if (scope) {
      callback = callback.bind(scope);
    }
    this[name] = callback;
    return this;
  };

  var TreeManagerMethods = {
    // TODO: More commands
    set: function set(config, manager) {
      for (var name in config) {
        // TODO: string variable does not have to eval
        var value = manager.evalExpression(config[name]);
        manager.setData(name, value);
      }
    }
  };

  var WaitMethods = {
    clearWaitEventFlag: function clearWaitEventFlag() {
      this.hasAnyWaitEvent = false;
      return this;
    },
    setWaitEventFlag: function setWaitEventFlag() {
      this.hasAnyWaitEvent = true;
      return this;
    },
    waitEvent: function waitEvent(eventEmitter, eventName) {
      this.sys.waitEventManager.waitEvent(eventEmitter, eventName);
      this.setWaitEventFlag();
      return this;
    },
    wait: function wait(config, manager) {
      var time = config.time;
      if (time !== undefined) {
        config.time = manager.evalExpression(time);
      }
      return this.sys.waitEventManager.waitAny(config);
    },
    click: function click(config, manager) {
      return this.wait({
        click: true
      }, manager);
    }
  };

  var GameObjectMethods = {
    addGameObjectManager: function addGameObjectManager(config) {
      // Register GameObjectManager
      var sys = this.sys;
      sys.addGameObjectManager(config);
      var name = config.name,
        defaultLayer = config.defaultLayer,
        _config$commands = config.commands,
        commands = _config$commands === void 0 ? {} : _config$commands;

      // Add custom commands
      sys.getGameObjectManager(name).commands = commands;

      // Add createGameObject command        
      var goType = name;
      var createGameObjectCallback = function createGameObjectCallback(config, manager) {
        var name = config.name,
          _config$layer = config.layer,
          layer = _config$layer === void 0 ? defaultLayer : _config$layer;
        delete config.name;
        delete config.layer;
        sys.createGameObject(goType, name, config);
        // Execute next command

        if (layer) {
          var layerManager = sys.getGameObjectManager('layer');
          if (layerManager) {
            var gameObject = sys.getGameObject(goType, name);
            layerManager.addToLayer(layer, gameObject);
          }
        }
      };
      this.addCommand(goType, createGameObjectCallback, null);
      return this;
    },
    _setGOProperty: function _setGOProperty(config, manager) {
      var name = config.name;
      delete config.name;
      var goType = this.sys.getGameObjectManagerName(name);
      if (!goType) {
        return;
      }
      for (var prop in config) {
        var value = manager.evalExpression(config[prop]);
        this.sys.setGameObjectProperty(goType, name, prop, value);
      }
      // Execute next command
    },
    _easeGOProperty: function _easeGOProperty(config, manager) {
      var name = config.name,
        duration = config.duration,
        ease = config.ease,
        repeat = config.repeat,
        yoyo = config.yoyo,
        _config$wait = config.wait,
        wait = _config$wait === void 0 ? true : _config$wait;
      delete config.name;
      delete config.duration;
      delete config.ease;
      delete config.repeat;
      delete config.yoyo;
      delete config.wait;
      var goType = this.sys.getGameObjectManagerName(name);
      if (!goType) {
        return;
      }
      var waitProperty;
      for (var prop in config) {
        var value = manager.evalExpression(config[prop]);
        this.sys.easeGameObjectProperty(goType, name, prop, value, duration, ease, repeat, yoyo);
        waitProperty = prop;
      }
      if (wait && waitProperty) {
        return this.sys.waitEventManager.waitGameObjectTweenComplete(goType, name, waitProperty);
      }

      // Execute next command
    },
    _destroyGO: function _destroyGO() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        _ref$wait = _ref.wait,
        wait = _ref$wait === void 0 ? false : _ref$wait;
      var goType = this.sys.getGameObjectManagerName(name);
      if (!goType) {
        return;
      }
      this.sys.destroyGameObject(goType, name);
      if (wait) {
        return this.sys.waitEventManager.waitGameObjectDestroy(goType, name);
      }
    },
    _runGOMethod: function _runGOMethod(config, manager) {
      var _this$sys;
      var goType = this.sys.getGameObjectManagerName(name);
      if (!goType) {
        return;
      }
      (_this$sys = this.sys).callGameObjectMethod.apply(_this$sys, [goType, config.name, config.methodName].concat(_toConsumableArray(config.parameters)));
      // Execute next command
    }
  };

  var BackgroundMusicMethods = {
    bgm: function bgm() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$volume = _ref.volume,
        volume = _ref$volume === void 0 ? 1 : _ref$volume;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setBackgroundMusicVolume(volume);
    },
    'bgm.play': function bgmPlay() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        key = _ref2.key,
        loop = _ref2.loop,
        volume = _ref2.volume,
        _ref2$fadeIn = _ref2.fadeIn,
        fadeIn = _ref2$fadeIn === void 0 ? 0 : _ref2$fadeIn,
        _ref2$wait = _ref2.wait,
        wait = _ref2$wait === void 0 ? false : _ref2$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      if (!key) {
        return;
      }
      if (loop !== undefined) {
        soundManager.setBackgroundMusicLoopValue(loop);
      }
      soundManager.playBackgroundMusic(key);
      if (volume !== undefined) {
        soundManager.setBackgroundMusicVolume(volume);
      }
      if (fadeIn > 0) {
        soundManager.fadeInBackgroundMusic(fadeIn);
      }
      if (wait) {
        return this.wait({
          bgm: true
        });
      }
    },
    'bgm.cross': function bgmCross(_ref3, manager) {
      var key = _ref3.key,
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === void 0 ? 500 : _ref3$duration,
        _ref3$wait = _ref3.wait,
        wait = _ref3$wait === void 0 ? false : _ref3$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      if (!key) {
        return;
      }
      soundManager.crossFadeBackgroundMusic(key, duration);
      if (wait) {
        return this.wait({
          bgm: true
        });
      }
    },
    'bgm.stop': function bgmStop(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.stopBackgroundMusic();
    },
    'bgm.fadeOut': function bgmFadeOut(_ref4, manager) {
      var _ref4$duration = _ref4.duration,
        duration = _ref4$duration === void 0 ? 500 : _ref4$duration,
        _ref4$stop = _ref4.stop,
        stop = _ref4$stop === void 0 ? true : _ref4$stop,
        _ref4$wait = _ref4.wait,
        wait = _ref4$wait === void 0 ? false : _ref4$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.fadeOutBackgroundMusic2(duration, stop);
      if (wait) {
        return this.wait({
          bgm: true
        });
      }
    },
    'bgm.fadeIn': function bgmFadeIn(_ref5, manager) {
      var _ref5$duration = _ref5.duration,
        duration = _ref5$duration === void 0 ? 500 : _ref5$duration;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.fadeInBackgroundMusic(duration);
    },
    'bgm.pause': function bgmPause(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.pauseBackgroundMusic();
    },
    'bgm.resume': function bgmResume(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.resumeBackgroundMusic();
    },
    'bgm.mute': function bgmMute(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setBackgroundMusicMute(true);
    },
    'bgm.unmute': function bgmUnmute(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setBackgroundMusicMute(false);
    }
  };

  var BackgroundMusic2Methods = {
    bgm2: function bgm2() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$volume = _ref.volume,
        volume = _ref$volume === void 0 ? 1 : _ref$volume;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setBackgroundMusic2Volume(volume);
    },
    'bgm2.play': function bgm2Play() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        key = _ref2.key,
        loop = _ref2.loop,
        volume = _ref2.volume,
        _ref2$fadeIn = _ref2.fadeIn,
        fadeIn = _ref2$fadeIn === void 0 ? 0 : _ref2$fadeIn,
        _ref2$wait = _ref2.wait,
        wait = _ref2$wait === void 0 ? false : _ref2$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      if (!key) {
        return;
      }
      if (loop !== undefined) {
        soundManager.setBackgroundMusic2LoopValue(loop);
      }
      soundManager.playBackgroundMusic2(key);
      if (volume !== undefined) {
        soundManager.setBackgroundMusic2Volume(volume);
      }
      if (fadeIn > 0) {
        soundManager.fadeInBackgroundMusic2(fadeIn);
      }
      if (wait) {
        return this.wait({
          bgm: true
        });
      }
    },
    'bgm2.cross': function bgm2Cross(_ref3, manager) {
      var key = _ref3.key,
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === void 0 ? 500 : _ref3$duration,
        _ref3$wait = _ref3.wait,
        wait = _ref3$wait === void 0 ? false : _ref3$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      if (!key) {
        return;
      }
      soundManager.crossFadeBackgroundMusic2(key, duration);
      if (wait) {
        return this.wait({
          bgm: true
        });
      }
    },
    'bgm2.stop': function bgm2Stop(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.stopBackgroundMusic2();
    },
    'bgm2.fadeOut': function bgm2FadeOut(_ref4, manager) {
      var _ref4$duration = _ref4.duration,
        duration = _ref4$duration === void 0 ? 500 : _ref4$duration,
        _ref4$stop = _ref4.stop,
        stop = _ref4$stop === void 0 ? true : _ref4$stop,
        _ref4$wait = _ref4.wait,
        wait = _ref4$wait === void 0 ? false : _ref4$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.fadeOutBackgroundMusic2(duration, stop);
      if (wait) {
        return this.wait({
          bgm: true
        });
      }
    },
    'bgm2.fadeIn': function bgm2FadeIn(_ref5, manager) {
      var _ref5$duration = _ref5.duration,
        duration = _ref5$duration === void 0 ? 500 : _ref5$duration;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.fadeInBackgroundMusic2(duration);
    },
    'bgm2.pause': function bgm2Pause(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.pauseBackgroundMusic2();
    },
    'bgm2.resume': function bgm2Resume(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.resumeBackgroundMusic2();
    },
    'bgm2.mute': function bgm2Mute(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setBackgroundMusic2Mute(true);
    },
    'bgm2.unmute': function bgm2Unmute(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setBackgroundMusic2Mute(false);
    }
  };

  var SoundEffectsMethods = {
    se: function se() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$volume = _ref.volume,
        volume = _ref$volume === void 0 ? 1 : _ref$volume;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setSoundEffectVolume(volume);
    },
    'se.play': function sePlay() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        key = _ref2.key,
        volume = _ref2.volume,
        _ref2$fadeIn = _ref2.fadeIn,
        fadeIn = _ref2$fadeIn === void 0 ? 0 : _ref2$fadeIn,
        _ref2$wait = _ref2.wait,
        wait = _ref2$wait === void 0 ? false : _ref2$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      if (!key) {
        return;
      }
      soundManager.playSoundEffect(key);
      if (volume !== undefined) {
        soundManager.setSoundEffectVolume(volume);
      }
      if (fadeIn > 0) {
        soundManager.fadeInSoundEffect(fadeIn);
      }
      if (wait) {
        return this.wait({
          se: true
        });
      }
    },
    'se.fadeOut': function seFadeOut(_ref3, manager) {
      var _ref3$duration = _ref3.duration,
        duration = _ref3$duration === void 0 ? 500 : _ref3$duration,
        _ref3$stop = _ref3.stop,
        stop = _ref3$stop === void 0 ? true : _ref3$stop,
        _ref3$wait = _ref3.wait,
        wait = _ref3$wait === void 0 ? false : _ref3$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.fadeOutSoundEffect(duration, stop);
      if (wait) {
        return this.wait({
          bgm: true
        });
      }
    },
    'se.volume': function seVolume() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$value = _ref4.value,
        value = _ref4$value === void 0 ? 1 : _ref4$value;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setSoundEffectVolume(value);
    },
    'se.mute': function seMute(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setSoundEffectMute(true);
    },
    'se.unmute': function seUnmute(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setSoundEffectMute(false);
    }
  };

  var SoundEffects2Methods = {
    se2: function se2() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$volume = _ref.volume,
        volume = _ref$volume === void 0 ? 1 : _ref$volume;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setSoundEffect2Volume(volume);
    },
    'se2.play': function se2Play() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        key = _ref2.key,
        volume = _ref2.volume,
        _ref2$fadeIn = _ref2.fadeIn,
        fadeIn = _ref2$fadeIn === void 0 ? 0 : _ref2$fadeIn,
        _ref2$wait = _ref2.wait,
        wait = _ref2$wait === void 0 ? false : _ref2$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      if (!key) {
        return;
      }
      soundManager.playSoundEffect2(key);
      if (volume !== undefined) {
        soundManager.setSoundEffect2Volume(volume);
      }
      if (fadeIn > 0) {
        soundManager.fadeInSoundEffect2(fadeIn);
      }
      if (wait) {
        return this.wait({
          se: true
        });
      }
    },
    'se2.fadeOut': function se2FadeOut(_ref3, manager) {
      var _ref3$duration = _ref3.duration,
        duration = _ref3$duration === void 0 ? 500 : _ref3$duration,
        _ref3$stop = _ref3.stop,
        stop = _ref3$stop === void 0 ? true : _ref3$stop,
        _ref3$wait = _ref3.wait,
        wait = _ref3$wait === void 0 ? false : _ref3$wait;
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.fadeOutSoundEffect2(duration, stop);
      if (wait) {
        return this.wait({
          bgm: true
        });
      }
    },
    'se2.mute': function se2Mute(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setSoundEffect2Mute(true);
    },
    'se2.unmute': function se2Unmute(config, manager) {
      var soundManager = this.sys.soundManager;
      if (!soundManager) {
        return;
      }
      soundManager.setSoundEffect2Mute(false);
    }
  };

  var CameraMethods = {
    camera: function camera() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        x = _ref.x,
        y = _ref.y,
        rotate = _ref.rotate,
        zoom = _ref.zoom;
      var camera = this.sys.cameraTarget;
      if (!camera) {
        return;
      }
      if (x !== undefined || y !== undefined) {
        camera.setScroll(x, y);
      }
      if (rotate !== undefined) {
        camera.setRotation(rotate);
      }
      if (zoom !== undefined) {
        camera.setZoom(zoom);
      }
    },
    'camera.fadeIn': function cameraFadeIn() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$duration = _ref2.duration,
        duration = _ref2$duration === void 0 ? 1000 : _ref2$duration,
        red = _ref2.red,
        green = _ref2.green,
        blue = _ref2.blue,
        _ref2$wait = _ref2.wait,
        wait = _ref2$wait === void 0 ? false : _ref2$wait;
      var camera = this.sys.cameraTarget;
      if (!camera) {
        return;
      }
      camera.fadeIn(duration, red, green, blue);
      if (wait) {
        return this.wait({
          camera: 'fadeIn'
        });
      }
    },
    'camera.fadeOut': function cameraFadeOut() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$duration = _ref3.duration,
        duration = _ref3$duration === void 0 ? 1000 : _ref3$duration,
        red = _ref3.red,
        green = _ref3.green,
        blue = _ref3.blue,
        _ref3$wait = _ref3.wait,
        wait = _ref3$wait === void 0 ? false : _ref3$wait;
      var camera = this.sys.cameraTarget;
      if (!camera) {
        return;
      }
      camera.fadeOut(duration, red, green, blue);
      if (wait) {
        return this.wait({
          camera: 'fadeOut'
        });
      }
    },
    'camera.flash': function cameraFlash() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$duration = _ref4.duration,
        duration = _ref4$duration === void 0 ? 1000 : _ref4$duration,
        red = _ref4.red,
        green = _ref4.green,
        blue = _ref4.blue,
        _ref4$wait = _ref4.wait,
        wait = _ref4$wait === void 0 ? false : _ref4$wait;
      var camera = this.sys.cameraTarget;
      if (!camera) {
        return;
      }
      camera.flash(duration, red, green, blue);
      if (wait) {
        return this.wait({
          camera: 'flash'
        });
      }
    },
    'camera.shake': function cameraShake() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref5$duration = _ref5.duration,
        duration = _ref5$duration === void 0 ? 1000 : _ref5$duration,
        intensity = _ref5.intensity,
        _ref5$wait = _ref5.wait,
        wait = _ref5$wait === void 0 ? false : _ref5$wait;
      var camera = this.sys.cameraTarget;
      if (!camera) {
        return;
      }
      camera.shake(duration, intensity);
      if (wait) {
        return this.wait({
          camera: 'shake'
        });
      }
    },
    'camera.zoomTo': function cameraZoomTo() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        zoom = _ref6.zoom,
        _ref6$duration = _ref6.duration,
        duration = _ref6$duration === void 0 ? 1000 : _ref6$duration,
        _ref6$wait = _ref6.wait,
        wait = _ref6$wait === void 0 ? false : _ref6$wait;
      var camera = this.sys.cameraTarget;
      if (!camera) {
        return;
      }
      camera.zoomTo(zoom, duration);
      if (wait) {
        return this.wait({
          camera: 'zoom'
        });
      }
    },
    'camera.rotateTo': function cameraRotateTo() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        rotate = _ref7.rotate,
        duration = _ref7.duration,
        ease = _ref7.ease,
        _ref7$wait = _ref7.wait,
        wait = _ref7$wait === void 0 ? false : _ref7$wait;
      var camera = this.sys.cameraTarget;
      if (!camera) {
        return;
      }
      camera.rotateTo(rotate, false, duration, ease);
      if (wait) {
        return this.wait({
          camera: 'rotate'
        });
      }
    },
    'camera.scrollTo': function cameraScrollTo() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        x = _ref8.x,
        y = _ref8.y,
        _ref8$duration = _ref8.duration,
        duration = _ref8$duration === void 0 ? 1000 : _ref8$duration,
        ease = _ref8.ease,
        _ref8$wait = _ref8.wait,
        wait = _ref8$wait === void 0 ? false : _ref8$wait;
      var camera = this.sys.cameraTarget;
      if (!camera) {
        return;
      }
      var xSave = camera.scrollX;
      var ySave = camera.scrollY;
      camera.setScroll(x, y);
      x += camera.centerX;
      y += camera.centerY;
      camera.setScroll(xSave, ySave);

      // x,y in pan() is the centerX, centerY
      camera.pan(x, y, duration, ease);
      if (wait) {
        return this.wait({
          camera: 'scroll'
        });
      }
    }
  };

  var StringToValues = function StringToValues(text, valueConverter) {
    if (text == null) {
      return [];
    }
    if (valueConverter === undefined) {
      valueConverter = TypeConvert;
    }
    var values = text.split(',');
    for (var i = 0, cnt = values.length; i < cnt; i++) {
      values[i] = valueConverter(values[i]);
    }
    return values;
  };

  var DefaultHandler = function DefaultHandler(name, config, manager) {
    var tokens = name.split('.');
    var gameObjectName = tokens[0];
    config.name = gameObjectName;
    switch (tokens.length) {
      case 1:
        if (!this.sys.hasGameObject(undefined, gameObjectName)) {
          // TODO
          console.warn("CommandExecutor: '".concat(gameObjectName, "' does not exist"));
          return;
        }
        return this._setGOProperty(config, manager);
      case 2:
        if (!this.sys.hasGameObject(undefined, gameObjectName)) {
          // TODO
          console.warn("CommandExecutor: '".concat(gameObjectName, "' does not exist"));
          return;
        }
        var commandName = tokens[1];
        switch (tokens[1]) {
          case 'to':
            return this._easeGOProperty(config, manager);
          case 'yoyo':
            config.yoyo = true;
            return this._easeGOProperty(config, manager);
          case 'destroy':
            return this._destroyGO(config, manager);
          default:
            var gameObjectManager = this.sys.getGameObjectManager(undefined, gameObjectName);
            if (gameObjectManager) {
              var command = gameObjectManager.commands[commandName];
              if (command) {
                var gameObject = gameObjectManager.getGO(gameObjectName);
                this.clearWaitEventFlag();
                command(gameObject, config, this);
                return this.hasAnyWaitEvent ? this.sys : undefined;
              }
            }
            var parameters;
            for (var key in config) {
              parameters = config[key];
              break;
            }
            config.methodName = commandName;
            config.parameters = parameters ? StringToValues(parameters) : [];
            return this._runGOMethod(config, manager);
        }
    }
  };

  var Methods = {
    addCommand: AddCommand,
    defaultHandler: DefaultHandler
  };
  Object.assign(Methods, TreeManagerMethods, WaitMethods, GameObjectMethods, BackgroundMusicMethods, BackgroundMusic2Methods, SoundEffectsMethods, SoundEffects2Methods, CameraMethods);

  var CommandExecutor = /*#__PURE__*/function () {
    function CommandExecutor(scene, config) {
      _classCallCheck(this, CommandExecutor);
      this.sys = new Managers(scene, config);
    }
    _createClass(CommandExecutor, [{
      key: "destroy",
      value: function destroy(fromScene) {
        this.sys.destroy(fromScene);
      }
    }]);
    return CommandExecutor;
  }();
  Object.assign(CommandExecutor.prototype, Methods);

  var MarkedEventSheetsPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(MarkedEventSheetsPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(MarkedEventSheetsPlugin);
    function MarkedEventSheetsPlugin(pluginManager) {
      _classCallCheck(this, MarkedEventSheetsPlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(MarkedEventSheetsPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(config) {
        return new MarkedEventSheets(config);
      }
    }, {
      key: "addCommandExecutor",
      value: function addCommandExecutor(scene, config) {
        return new CommandExecutor(scene, config);
      }
    }]);
    return MarkedEventSheetsPlugin;
  }(Phaser.Plugins.BasePlugin);

  return MarkedEventSheetsPlugin;

}));
