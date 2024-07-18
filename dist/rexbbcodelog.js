(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbbcodelog = factory());
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

	var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
	var HEX = /^0x[0-9A-F]+$/i;

	var TypeConvert = function (s) {
	    if (typeof (s) !== 'string') {
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
	            case 'false': s = false; break;
	            case 'true': s = true; break;
	            case 'null': s = null; break;
	            case 'undefined': s = undefined; break;
	        }
	    }

	    return s;
	};

	// https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js

	var EscapeRegex = function (s) {
	    return s
	        .replace(re0, '\\$&')
	        .replace(re1, '\\x2d');
	};

	var re0 = /[|\\{}()[\]^$+*?.]/g;
	var re1 = /-/g;

	// This class might be used standalone

	let BracketParser$1 = class BracketParser {
	    constructor(config) {
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

	    shutdown() {
	        this.destroyEventEmitter();
	    }

	    destroy() {
	        this.shutdown();
	    }

	    setMultipleLinesTagEnable(enable) {
	        if (enable === undefined) {
	            enable = true;
	        }
	        this.multipleLinesTagEnable = enable;
	        return this;
	    }

	    // Override
	    setDelimiters(delimiterLeft, delimiterRight) {
	        if (delimiterRight === undefined) {
	            delimiterRight = delimiterLeft[1];
	            delimiterLeft = delimiterLeft[0];
	        }
	        this.delimiterLeft = delimiterLeft;
	        this.delimiterRight = delimiterRight;

	        delimiterLeft = EscapeRegex(this.delimiterLeft);
	        delimiterRight = EscapeRegex(this.delimiterRight);

	        var flag = (this.multipleLinesTagEnable) ? 'gs' : 'gi';
	        this.reSplit = RegExp(`${delimiterLeft}(.+?)${delimiterRight}`, flag);

	        return this;
	    }

	    setTranslateTagNameCallback(callback) {
	        this.translateTagNameCallback = callback;
	        return this;
	    }

	    setValueConverter(converter) {
	        if (converter === true) {
	            converter = TypeConvert;
	        } else if (!converter) {
	            converter = BypassValueConverter;
	        }
	        this.valueConverter = converter;
	        return this;
	    }

	    setLoopEnable(enable) {
	        if (enable === undefined) {
	            enable = true;
	        }
	        this.loopEnable = enable;
	        return this;
	    }

	    setSource(source) {
	        this.source = source;
	        return this;
	    }

	    resetIndex(index) {
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

	    start(source) {
	        this
	            .setSource(source)
	            .restart();
	        return this;
	    }

	    restart() {
	        this
	            .resetIndex()
	            .next();
	    }

	    next() {
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

	    skipEvent() {
	        this.skipEventFlag = true;
	        return this;
	    }

	    pause() {
	        if (!this.isPaused) {
	            this.onPause();
	        }
	        return this;
	    }

	    pauseUntilEvent(eventEmitter, eventName) {
	        if (this.isPaused) {
	            return this;
	        }

	        this.pause();
	        eventEmitter.once(eventName, function () {
	            this.next();
	        }, this);
	        return this;
	    }

	    onContent(content) {
	        this.skipEventFlag = false;
	        this.emit('content', content);
	        this.lastContent = content;
	    }

	    // Override
	    onTag(tagContent) {

	    }

	    onStart() {
	        this.isRunning = true;
	        this.emit('start', this);
	    }

	    onComplete() {
	        this.isRunning = false;
	        this.justCompleted = true;
	        this.emit('complete', this);
	        if (this.loopEnable) {
	            this.resetIndex();
	        }
	    }

	    onPause() {
	        this.isPaused = true;
	        this.emit('pause', this);
	    }

	    onResume() {
	        this.isPaused = false;
	        this.emit('resume', this);
	    }

	};

	const BypassValueConverter = function (s) { return s; };

	Object.assign(
	    BracketParser$1.prototype,
	    EventEmitterMethods,
	);

	var StringToValues = function (text, valueConverter, delimiter) {
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

	class BracketParser extends BracketParser$1 {
	    constructor(config) {
	        if (config === undefined) {
	            config = {};
	        }

	        if (!config.hasOwnProperty('multipleLinesTag')) {
	            config.multipleLinesTag = false;
	        }

	        super(config);

	        // Parameters for regex
	        this.setTagExpression(GetValue(config, 'regex.tag', undefined));
	        this.setValueExpression(GetValue(config, 'regex.value', undefined));
	        // Brackets and generate regex
	        var delimiters = GetValue(config, 'delimiters', '<>');
	        this.setDelimiters(delimiters[0], delimiters[1]);
	    }

	    setTagExpression(express) {
	        if (!express) {
	            express = DefaultTokenExpression;
	        }
	        this.tagExpression = express;
	        return this;
	    }

	    setValueExpression(express) {
	        if (!express) {
	            express = DefaultTokenExpression;
	        }
	        this.valueExpression = express;
	        return this;
	    }

	    setDelimiters(delimiterLeft, delimiterRight) {
	        super.setDelimiters(delimiterLeft, delimiterRight);

	        var tag = `(${this.tagExpression})(=(${this.valueExpression}))?`;
	        this.reTag = RegExp(tag, 'i');

	        if ((this.tagExpression !== DefaultTokenExpression) || (this.valueExpression !== DefaultTokenExpression)) {
	            var startTagExpression = `${this.tagExpression}(=${this.valueExpression})?`;
	            var endTagExpression = `/${this.tagExpression}`;

	            delimiterLeft = EscapeRegex(this.delimiterLeft);
	            delimiterRight = EscapeRegex(this.delimiterRight);

	            var flag = (this.multipleLinesTagEnable) ? 'gs' : 'gi';
	            this.reSplit = RegExp(`${delimiterLeft}((${startTagExpression})|(${endTagExpression}))${delimiterRight}`, flag);
	        }

	        return this;
	    }

	    onTag(tagContent) {
	        var regexResult = tagContent.match(this.reTag);
	        var tagName = regexResult[1];
	       
	        var isEndTag = (tagName.charAt(0) === '/');
	        if (isEndTag) {
	            tagName = tagName.substring(1, tagName.length);
	        }

	        if (this.translateTagNameCallback) {
	            tagName = this.translateTagNameCallback(tagName);
	        }

	        this.skipEventFlag = false;
	        if (!isEndTag) {
	            var values = StringToValues(regexResult[3], this.valueConverter);
	            this.emit(`+${tagName}`, ...values);
	            if (!this.skipEventFlag) {
	                this.emit('+', tagName, ...values);
	            }
	            this.lastTagStart = tagName;
	        } else {
	            this.emit(`-${tagName}`);
	            if (!this.skipEventFlag) {
	                this.emit('-', tagName);
	            }
	            this.lastTagEnd = tagName;
	        }
	    }
	}

	const DefaultTokenExpression = `[^=]+`;

	var OnParseColorTag = function (parser) {
	    parser
	        .on('+color', function (color) {
	            parser.addStyle('color', color);
	            parser.skipEvent();
	        })
	        .on('-color', function () {
	            parser.removeStyle('color');
	            parser.skipEvent();
	        });
	};

	var OnParseBackgroundColorTag = function (parser) {
	    parser
	        .on('+bgcolor', function (color) {
	            parser.addStyle('background-color', color);
	            parser.skipEvent();
	        })
	        .on('-bgcolor', function () {
	            parser.removeStyle('background-color');
	            parser.skipEvent();
	        });
	};

	var ParseBoldTag = function (parser) {
	    parser
	        .on('+b', function () {
	            parser.addStyle('font-weight', 'bold');
	            parser.skipEvent();
	        })
	        .on('-b', function () {
	            parser.removeStyle('font-weight');
	            parser.skipEvent();
	        });
	};

	var OnParseItalicTag = function (parser) {
	    parser
	        .on('+i', function () {
	            parser.addStyle('font-style', 'italic');
	            parser.skipEvent();
	        })
	        .on('-i', function () {
	            parser.removeStyle('font-style');
	            parser.skipEvent();
	        });
	};

	var OnParseSizeTag = function (parser) {
	    parser
	        .on('+size', function (size) {
	            if (typeof (size) === 'number') {
	                size = `${size}px`;
	            }
	            parser.addStyle('font-size', size);
	            parser.skipEvent();
	        })
	        .on('-size', function () {
	            parser.removeStyle('font-size');
	            parser.skipEvent();
	        });
	};

	var OnParseUnderlineTag = function (parser) {
	    parser
	        .on('+u', function () {
	            parser.addStyle('text-decoration', 'underline');
	            parser.skipEvent();
	        })
	        .on('-u', function () {
	            parser.removeStyle('text-decoration');
	            parser.skipEvent();
	        });
	};

	var OnParseShadowTag = function (parser) {
	    parser
	        .on('+shadow', function (color) {
	            parser.addStyle('text-shadow', `1px 1px 3px ${color}`);
	            parser.skipEvent();
	        })
	        .on('-shadow', function () {
	            parser.removeStyle('text-shadow');
	            parser.skipEvent();
	        });
	};

	var OnParseRoundBlockTag = function (parser) {
	    parser
	        .on('+round', function (radius, padding) {
	            if (radius === undefined) {
	                radius = 3;
	            }
	            if (padding === undefined) {
	                padding = radius;
	            }

	            if (typeof (radius) === 'number') {
	                radius = `${radius}px`;
	            }
	            if (typeof (padding) === 'number') {
	                padding = `${padding}px`;
	            }

	            parser.addStyle('display', 'inline-block');
	            parser.addStyle('border-radius', radius);
	            parser.addStyle('padding', padding);
	            parser.skipEvent();
	        })
	        .on('-round', function () {
	            parser.removeStyle('display');
	            parser.removeStyle('border-radius');
	            parser.removeStyle('padding');
	            parser.skipEvent();
	        });
	};

	var OnParseFontFamilyTag = function (parser) {
	    parser
	        .on('+family', function (family) {
	            parser.addStyle('font-family', family);
	            parser.skipEvent();
	        })
	        .on('-family', function () {
	            parser.removeStyle('font-family');
	            parser.skipEvent();
	        });
	};

	var ParseContent = function (parser) {
	    parser
	        .on('content', function (content) {
	            parser.addContent(content);
	            parser.skipEvent();
	        })
	        .on('+', function () {
	            parser.addContent(parser.lastTagSource);
	            parser.skipEvent();
	        })
	        .on('-', function () {
	            parser.addContent(parser.lastTagSource);
	            parser.skipEvent();
	        });
	};

	var ParseHandlers = [
	    OnParseColorTag,
	    OnParseBackgroundColorTag,
	    ParseBoldTag,
	    OnParseItalicTag,
	    OnParseSizeTag,
	    OnParseUnderlineTag,
	    OnParseShadowTag,
	    OnParseRoundBlockTag,
	    OnParseFontFamilyTag,
	    ParseContent
	];

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

	class Parser extends BracketParser {
	    constructor(config) {
	        super(config);

	        this.segments = [];
	        this.lastPropFlags = {};

	        for (var i = 0, cnt = ParseHandlers.length; i < cnt; i++) {
	            ParseHandlers[i](this);
	        }
	    }

	    clearBuffers() {
	        this.segments.length = 0;
	        this.lastPropFlags = {};
	        return this;
	    }

	    addStyle(name, value) {
	        this.lastPropFlags[name] = value;
	        return this;
	    }

	    removeStyle(name) {
	        delete this.lastPropFlags[name];
	        return this;
	    }

	    addContent(content) {
	        this.segments.push(Clone(this.lastPropFlags));
	        this.segments.push(content);
	        return this;
	    }

	    parse(s) {
	        this.start(s);

	        var result = [];
	        for (var i = 0, cnt = this.segments.length; i < cnt; i++) {
	            var text = this.segments[i];
	            if (typeof (text) !== 'string') {
	                continue;
	            }

	            var propFlags = this.segments[i - 1];
	            if (typeof (propFlags) === 'object') {
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
	}

	var PropToStyle = function (propFlags) {
	    var styles = [];
	    for (var propName in propFlags) {
	        styles.push(`${propName}:${propFlags[propName]}`);
	    }

	    return styles.join(';');
	};

	class BBCodeLog {
	    constructor({
	        delimiters = '[]',
	        enable = true
	    } = {}) {

	        this.parser = new Parser({
	            delimiters: delimiters
	        });

	        this.enable = enable;
	    }

	    setEnable(enable = true) {
	        this.enable = enable;
	        return this;
	    }

	    log(s, logType = 'log') {
	        if (!this.enable) {
	            return this;
	        }

	        if (typeof (s) == 'string') {
	            var inputs = [];
	            var modifiers = [];
	            this.parser.parse(s).forEach(function (item) {
	                inputs.push(`%c${item.value}`);
	                modifiers.push(item.css);
	            });

	            console[logType].call(console, inputs.join(''), ...modifiers);

	        } else {
	            console[logType](s);

	        }

	        return this;
	    }
	}

	return BBCodeLog;

}));
