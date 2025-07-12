(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcsvscenariologic = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

	var papaparse_min = {exports: {}};

	/* @license
	Papa Parse
	v5.5.2
	https://github.com/mholt/PapaParse
	License: MIT
	*/

	(function (module, exports) {
		((e,t)=>{module.exports=t();})(commonjsGlobal,function r(){var n="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n?n:{};var d,s=!n.document&&!!n.postMessage,a=n.IS_PAPA_WORKER||!1,o={},h=0,v={};function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new i(t),(this._handle.streamer=this)._config=t;}.call(this,e),this.parseChunk=function(t,e){var i=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<i){let e=this._config.newline;e||(r=this._config.quoteChar||'"',e=this._handle.guessLineEndings(t,r)),t=[...t.split(e).slice(i)].join(e);}this.isFirstChunk&&U(this._config.beforeFirstChunk)&&void 0!==(r=this._config.beforeFirstChunk(t))&&(t=r),this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+t,r=(this._partialLine="",this._handle.parse(i,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){t=r.meta.cursor,i=(this._finished||(this._partialLine=i.substring(t-this._baseIndex),this._baseIndex=t),r&&r.data&&(this._rowCount+=r.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview);if(a)n.postMessage({results:r,workerId:v.WORKER_ID,finished:i});else if(U(this._config.chunk)&&!e){if(this._config.chunk(r,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=r=void 0;}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(r.data),this._completeResults.errors=this._completeResults.errors.concat(r.errors),this._completeResults.meta=r.meta),this._completed||!i||!U(this._config.complete)||r&&r.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),i||r&&r.meta.paused||this._nextChunk(),r}this._halted=!0;},this._sendError=function(e){U(this._config.error)?this._config.error(e):a&&this._config.error&&n.postMessage({workerId:v.WORKER_ID,error:e,finished:!1});};}function f(e){var r;(e=e||{}).chunkSize||(e.chunkSize=v.RemoteChunkSize),u.call(this,e),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded();}:function(){this._readChunk();},this.stream=function(e){this._input=e,this._nextChunk();},this._readChunk=function(){if(this._finished)this._chunkLoaded();else {if(r=new XMLHttpRequest,this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),s||(r.onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)),r.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var e,t=this._config.downloadRequestHeaders;for(e in t)r.setRequestHeader(e,t[e]);}var i;this._config.chunkSize&&(i=this._start+this._config.chunkSize-1,r.setRequestHeader("Range","bytes="+this._start+"-"+i));try{r.send(this._config.downloadRequestBody);}catch(e){this._chunkError(e.message);}s&&0===r.status&&this._chunkError();}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._start+=this._config.chunkSize||r.responseText.length,this._finished=!this._config.chunkSize||this._start>=(e=>null!==(e=e.getResponseHeader("Content-Range"))?parseInt(e.substring(e.lastIndexOf("/")+1)):-1)(r),this.parseChunk(r.responseText)));},this._chunkError=function(e){e=r.statusText||e;this._sendError(new Error(e));};}function l(e){(e=e||{}).chunkSize||(e.chunkSize=v.LocalChunkSize),u.call(this,e);var i,r,n="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,n?((i=new FileReader).onload=y(this._chunkLoaded,this),i.onerror=y(this._chunkError,this)):i=new FileReaderSync,this._nextChunk();},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk();},this._readChunk=function(){var e=this._input,t=(this._config.chunkSize&&(t=Math.min(this._start+this._config.chunkSize,this._input.size),e=r.call(e,this._start,t)),i.readAsText(e,this._config.encoding));n||this._chunkLoaded({target:{result:t}});},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result);},this._chunkError=function(){this._sendError(i.error);};}function c(e){var i;u.call(this,e=e||{}),this.stream=function(e){return i=e,this._nextChunk()},this._nextChunk=function(){var e,t;if(!this._finished)return e=this._config.chunkSize,i=e?(t=i.substring(0,e),i.substring(e)):(t=i,""),this._finished=!i,this.parseChunk(t)};}function p(e){u.call(this,e=e||{});var t=[],i=!0,r=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause();},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume();},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError);},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0);},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0;},this._streamData=y(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()));}catch(e){this._streamError(e);}},this),this._streamError=y(function(e){this._streamCleanUp(),this._sendError(e);},this),this._streamEnd=y(function(){this._streamCleanUp(),r=!0,this._streamData("");},this),this._streamCleanUp=y(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError);},this);}function i(m){var n,s,a,t,o=Math.pow(2,53),h=-o,u=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,d=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,i=this,r=0,f=0,l=!1,e=!1,c=[],p={data:[],errors:[],meta:{}};function y(e){return "greedy"===m.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){if(p&&a&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+v.DefaultDelimiter+"'"),a=!1),m.skipEmptyLines&&(p.data=p.data.filter(function(e){return !y(e)})),_()){if(p)if(Array.isArray(p.data[0])){for(var e=0;_()&&e<p.data.length;e++)p.data[e].forEach(t);p.data.splice(0,1);}else p.data.forEach(t);function t(e,t){U(m.transformHeader)&&(e=m.transformHeader(e,t)),c.push(e);}}function i(e,t){for(var i=m.header?{}:[],r=0;r<e.length;r++){var n=r,s=e[r],s=((e,t)=>(e=>(m.dynamicTypingFunction&&void 0===m.dynamicTyping[e]&&(m.dynamicTyping[e]=m.dynamicTypingFunction(e)),!0===(m.dynamicTyping[e]||m.dynamicTyping)))(e)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&((e=>{if(u.test(e)){e=parseFloat(e);if(h<e&&e<o)return 1}})(t)?parseFloat(t):d.test(t)?new Date(t):""===t?null:t):t)(n=m.header?r>=c.length?"__parsed_extra":c[r]:n,s=m.transform?m.transform(s,n):s);"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s;}return m.header&&(r>c.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+c.length+" fields but parsed "+r,f+t):r<c.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+c.length+" fields but parsed "+r,f+t)),i}var r;p&&(m.header||m.dynamicTyping||m.transform)&&(r=1,!p.data.length||Array.isArray(p.data[0])?(p.data=p.data.map(i),r=p.data.length):p.data=i(p.data,0),m.header&&p.meta&&(p.meta.fields=c),f+=r);}function _(){return m.header&&0===c.length}function k(e,t,i,r){e={type:e,code:t,message:i};void 0!==r&&(e.row=r),p.errors.push(e);}U(m.step)&&(t=m.step,m.step=function(e){p=e,_()?g():(g(),0!==p.data.length&&(r+=e.data.length,m.preview&&r>m.preview?s.abort():(p.data=p.data[0],t(p,i))));}),this.parse=function(e,t,i){var r=m.quoteChar||'"',r=(m.newline||(m.newline=this.guessLineEndings(e,r)),a=!1,m.delimiter?U(m.delimiter)&&(m.delimiter=m.delimiter(e),p.meta.delimiter=m.delimiter):((r=((e,t,i,r,n)=>{var s,a,o,h;n=n||[",","\t","|",";",v.RECORD_SEP,v.UNIT_SEP];for(var u=0;u<n.length;u++){for(var d,f=n[u],l=0,c=0,p=0,g=(o=void 0,new E({comments:r,delimiter:f,newline:t,preview:10}).parse(e)),_=0;_<g.data.length;_++)i&&y(g.data[_])?p++:(d=g.data[_].length,c+=d,void 0===o?o=d:0<d&&(l+=Math.abs(d-o),o=d));0<g.data.length&&(c/=g.data.length-p),(void 0===a||l<=a)&&(void 0===h||h<c)&&1.99<c&&(a=l,s=f,h=c);}return {successful:!!(m.delimiter=s),bestDelimiter:s}})(e,m.newline,m.skipEmptyLines,m.comments,m.delimitersToGuess)).successful?m.delimiter=r.bestDelimiter:(a=!0,m.delimiter=v.DefaultDelimiter),p.meta.delimiter=m.delimiter),w(m));return m.preview&&m.header&&r.preview++,n=e,s=new E(r),p=s.parse(n,t,i),g(),l?{meta:{paused:!0}}:p||{meta:{paused:!1}}},this.paused=function(){return l},this.pause=function(){l=!0,s.abort(),n=U(m.chunk)?"":n.substring(s.getCharIndex());},this.resume=function(){i.streamer._halted?(l=!1,i.streamer.parseChunk(n,!0)):setTimeout(i.resume,3);},this.aborted=function(){return e},this.abort=function(){e=!0,s.abort(),p.meta.aborted=!0,U(m.complete)&&m.complete(p),n="";},this.guessLineEndings=function(e,t){e=e.substring(0,1048576);var t=new RegExp(P(t)+"([^]*?)"+P(t),"gm"),i=(e=e.replace(t,"")).split("\r"),t=e.split("\n"),e=1<t.length&&t[0].length<i[0].length;if(1===i.length||e)return "\n";for(var r=0,n=0;n<i.length;n++)"\n"===i[n][0]&&r++;return r>=i.length/2?"\r\n":"\r"};}function P(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function E(C){var S=(C=C||{}).delimiter,O=C.newline,x=C.comments,I=C.step,A=C.preview,T=C.fastMode,D=null,L=!1,F=null==C.quoteChar?'"':C.quoteChar,j=F;if(void 0!==C.escapeChar&&(j=C.escapeChar),("string"!=typeof S||-1<v.BAD_DELIMITERS.indexOf(S))&&(S=","),x===S)throw new Error("Comment character same as delimiter");!0===x?x="#":("string"!=typeof x||-1<v.BAD_DELIMITERS.indexOf(x))&&(x=!1),"\n"!==O&&"\r"!==O&&"\r\n"!==O&&(O="\n");var z=0,M=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw new Error("Input must be a string");var n=i.length,e=S.length,s=O.length,a=x.length,o=U(I),h=[],u=[],d=[],f=z=0;if(!i)return b();if(T||!1!==T&&-1===i.indexOf(F)){for(var l=i.split(O),c=0;c<l.length;c++){if(d=l[c],z+=d.length,c!==l.length-1)z+=O.length;else if(r)return b();if(!x||d.substring(0,a)!==x){if(o){if(h=[],k(d.split(S)),R(),M)return b()}else k(d.split(S));if(A&&A<=c)return h=h.slice(0,A),b(!0)}}return b()}for(var p=i.indexOf(S,z),g=i.indexOf(O,z),_=new RegExp(P(j)+P(F),"g"),m=i.indexOf(F,z);;)if(i[z]===F)for(m=z,z++;;){if(-1===(m=i.indexOf(F,m+1)))return r||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:z}),E();if(m===n-1)return E(i.substring(z,m).replace(_,F));if(F===j&&i[m+1]===j)m++;else if(F===j||0===m||i[m-1]!==j){-1!==p&&p<m+1&&(p=i.indexOf(S,m+1));var y=v(-1===(g=-1!==g&&g<m+1?i.indexOf(O,m+1):g)?p:Math.min(p,g));if(i.substr(m+1+y,e)===S){d.push(i.substring(z,m).replace(_,F)),i[z=m+1+y+e]!==F&&(m=i.indexOf(F,z)),p=i.indexOf(S,z),g=i.indexOf(O,z);break}y=v(g);if(i.substring(m+1+y,m+1+y+s)===O){if(d.push(i.substring(z,m).replace(_,F)),w(m+1+y+s),p=i.indexOf(S,z),m=i.indexOf(F,z),o&&(R(),M))return b();if(A&&h.length>=A)return b(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:z}),m++;}}else if(x&&0===d.length&&i.substring(z,z+a)===x){if(-1===g)return b();z=g+s,g=i.indexOf(O,z),p=i.indexOf(S,z);}else if(-1!==p&&(p<g||-1===g))d.push(i.substring(z,p)),z=p+e,p=i.indexOf(S,z);else {if(-1===g)break;if(d.push(i.substring(z,g)),w(g+s),o&&(R(),M))return b();if(A&&h.length>=A)return b(!0)}return E();function k(e){h.push(e),f=z;}function v(e){var t=0;return t=-1!==e&&(e=i.substring(m+1,e))&&""===e.trim()?e.length:t}function E(e){return r||(void 0===e&&(e=i.substring(z)),d.push(e),z=n,k(d),o&&R()),b()}function w(e){z=e,k(d),d=[],g=i.indexOf(O,z);}function b(e){if(C.header&&!t&&h.length&&!L){var s=h[0],a={},o=new Set(s);let n=!1;for(let r=0;r<s.length;r++){let i=s[r];if(a[i=U(C.transformHeader)?C.transformHeader(i,r):i]){let e,t=a[i];for(;e=i+"_"+t,t++,o.has(e););o.add(e),s[r]=e,a[i]++,n=!0,(D=null===D?{}:D)[e]=i;}else a[i]=1,s[r]=i;o.add(i);}n&&console.warn("Duplicate headers found and renamed."),L=!0;}return {data:h,errors:u,meta:{delimiter:S,linebreak:O,aborted:M,truncated:!!e,cursor:f+(t||0),renamedHeaders:D}}}function R(){I(b()),h=[],u=[];}},this.abort=function(){M=!0;},this.getCharIndex=function(){return z};}function g(e){var t=e.data,i=o[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}});},pause:m,resume:m};if(U(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results;}else U(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results);}t.finished&&!r&&_(t.workerId,t.results);}function _(e,t){var i=o[e];U(i.userComplete)&&i.userComplete(t),i.terminate(),delete o[e];}function m(){throw new Error("Not implemented.")}function w(e){if("object"!=typeof e||null===e)return e;var t,i=Array.isArray(e)?[]:{};for(t in e)i[t]=w(e[t]);return i}function y(e,t){return function(){e.apply(t,arguments);}}function U(e){return "function"==typeof e}return v.parse=function(e,t){var i=(t=t||{}).dynamicTyping||!1;U(i)&&(t.dynamicTypingFunction=i,i={});if(t.dynamicTyping=i,t.transform=!!U(t.transform)&&t.transform,!t.worker||!v.WORKERS_SUPPORTED)return i=null,v.NODE_STREAM_INPUT,"string"==typeof e?(e=(e=>65279!==e.charCodeAt(0)?e:e.slice(1))(e),i=new(t.download?f:c)(t)):!0===e.readable&&U(e.read)&&U(e.on)?i=new p(t):(n.File&&e instanceof File||e instanceof Object)&&(i=new l(t)),i.stream(e);(i=(()=>{var e;return !!v.WORKERS_SUPPORTED&&(e=(()=>{var e=n.URL||n.webkitURL||null,t=r.toString();return v.BLOB_URL||(v.BLOB_URL=e.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",t,")();"],{type:"text/javascript"})))})(),(e=new n.Worker(e)).onmessage=g,e.id=h++,o[e.id]=e)})()).userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=U(t.step),t.chunk=U(t.chunk),t.complete=U(t.complete),t.error=U(t.error),delete t.worker,i.postMessage({input:e,config:t,workerId:i.id});},v.unparse=function(e,t){var n=!1,_=!0,m=",",y="\r\n",s='"',a=s+s,i=!1,r=null,o=!1,h=((()=>{if("object"==typeof t){if("string"!=typeof t.delimiter||v.BAD_DELIMITERS.filter(function(e){return -1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter),"boolean"!=typeof t.quotes&&"function"!=typeof t.quotes&&!Array.isArray(t.quotes)||(n=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(i=t.skipEmptyLines),"string"==typeof t.newline&&(y=t.newline),"string"==typeof t.quoteChar&&(s=t.quoteChar),"boolean"==typeof t.header&&(_=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");r=t.columns;}void 0!==t.escapeChar&&(a=t.escapeChar+s),t.escapeFormulae instanceof RegExp?o=t.escapeFormulae:"boolean"==typeof t.escapeFormulae&&t.escapeFormulae&&(o=/^[=+\-@\t\r].*$/);}})(),new RegExp(P(s),"g"));"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return u(null,e,i);if("object"==typeof e[0])return u(r||Object.keys(e[0]),e,i)}else if("object"==typeof e)return "string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||r),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),u(e.fields||[],e.data||[],i);throw new Error("Unable to serialize unrecognized input");function u(e,t,i){var r="",n=("string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t)),Array.isArray(e)&&0<e.length),s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(r+=m),r+=k(e[a],a);0<t.length&&(r+=y);}for(var o=0;o<t.length;o++){var h=(n?e:t[o]).length,u=!1,d=n?0===Object.keys(t[o]).length:0===t[o].length;if(i&&!n&&(u="greedy"===i?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===i&&n){for(var f=[],l=0;l<h;l++){var c=s?e[l]:l;f.push(t[o][c]);}u=""===f.join("").trim();}if(!u){for(var p=0;p<h;p++){0<p&&!d&&(r+=m);var g=n&&s?e[p]:p;r+=k(t[o][g],p);}o<t.length-1&&(!i||0<h&&!d)&&(r+=y);}}return r}function k(e,t){var i,r;return null==e?"":e.constructor===Date?JSON.stringify(e).slice(1,25):(r=!1,o&&"string"==typeof e&&o.test(e)&&(e="'"+e,r=!0),i=e.toString().replace(h,a),(r=r||!0===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||((e,t)=>{for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return !0;return !1})(i,v.BAD_DELIMITERS)||-1<i.indexOf(m)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?s+i+s:i)}},v.RECORD_SEP=String.fromCharCode(30),v.UNIT_SEP=String.fromCharCode(31),v.BYTE_ORDER_MARK="\ufeff",v.BAD_DELIMITERS=["\r","\n",'"',v.BYTE_ORDER_MARK],v.WORKERS_SUPPORTED=!s&&!!n.Worker,v.NODE_STREAM_INPUT=1,v.LocalChunkSize=10485760,v.RemoteChunkSize=5242880,v.DefaultDelimiter=",",v.Parser=E,v.ParserHandle=i,v.NetworkStreamer=f,v.FileStreamer=l,v.StringStreamer=c,v.ReadableStreamStreamer=p,n.jQuery&&((d=n.jQuery).fn.parse=function(o){var i=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&n.FileReader)||!this.files||0===this.files.length)return !0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},i)});}),e(),this;function e(){if(0===h.length)U(o.complete)&&o.complete();else {var e,t,i,r,n=h[0];if(U(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,i=n.inputElem,r=s.reason,void(U(o.error)&&o.error({name:e},t,i,r));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config));}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){U(a)&&a(e,n.file,n.inputElem),u();},v.parse(n.file,n.instanceConfig);}}function u(){h.splice(0,1),e();}}),a&&(n.onmessage=function(e){e=e.data;void 0===v.WORKER_ID&&e&&(v.WORKER_ID=e.workerId);"string"==typeof e.input?n.postMessage({workerId:v.WORKER_ID,results:v.parse(e.input,e.config),finished:!0}):(n.File&&e.input instanceof File||e.input instanceof Object)&&(e=v.parse(e.input,e.config))&&n.postMessage({workerId:v.WORKER_ID,results:e,finished:!0});}),(f.prototype=Object.create(u.prototype)).constructor=f,(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(c.prototype)).constructor=c,(p.prototype=Object.create(u.prototype)).constructor=p,v}); 
	} (papaparse_min));

	var papaparse_minExports = papaparse_min.exports;
	var CSVParser = /*@__PURE__*/getDefaultExportFromCjs(papaparse_minExports);

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

	class InstMem {
	    constructor(scenario) {
	        this.scenario = scenario;

	        this.queue = [];
	        this.currentIdx = -1;
	        this.nextIdx = 0;
	    }

	    resetFromJSON(o) {
	        var queue = GetValue(o, 'queue', undefined);
	        if (queue === undefined) {
	            Clear(this.queue);
	        } else {
	            Clone(queue, this.queue);
	        }

	        this.currentIdx = GetValue(o, 'curIdx', -1);
	        this.nextIdx = GetValue(o, 'nextIdx', 0);
	        return this;
	    }

	    clear() {
	        this.currentIdx = -1;
	        this.nextIdx = 0;
	        this.queue.length = 0;
	        return this;
	    }

	    append(item) {
	        this.queue.push(item);
	        return this;
	    }

	    setNextIndex(index) {
	        if (index === undefined) {
	            index = this.currentIdx + 1;
	        }
	        this.nextIdx = index;
	        return this;
	    }

	    get(index) {
	        if (index === undefined) {
	            index = this.nextIdx;
	        }
	        this.currentIdx = index;
	        return this.queue[index];
	    }

	    get length() {
	        return this.queue.length;
	    }
	}

	class BaseCmd {
	    constructor(scenario, type) {
	        this.scenario = scenario;
	        this.type = type;
	    }

	    resetFromJSON(o) {}

	    toJSON() {
	        return {};
	    }

	    parse(inst, index) {
	        return inst;
	    }

	    run(inst) {}
	}

	var Copy = function (dest, src, startIdx, endIdx) {
	    if (startIdx === undefined) {
	        startIdx = 0;
	    }    if (endIdx === undefined) {
	        endIdx = src.length;
	    }
	    dest.length = endIdx - startIdx;
	    for (var i = 0, len = dest.length; i < len; i++) {
	        dest[i] = src[i + startIdx];
	    }
	    return dest;
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

	var IsArray = function(obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	};

	var RunCommands = function (queue, scope, config) {
	    var reverse = GetValue(config, 'reverse', false);

	    var retVal;
	    if (IsArray(queue[0])) {
	        if (!reverse) {
	            for (var i = 0, len = queue.length; i < len; i++) {
	                retVal = RunCommands(queue[i], scope, config);
	            }
	        } else {
	            for (var len = queue.length, i = len - 1; i >= 0; i--) {
	                retVal = RunCommands(queue[i], scope, config);
	            }
	        }
	    } else {
	        retVal = RunCommand(queue, scope, config);
	    }

	    return retVal;
	};

	var RunCommand = function (cmd, scope, config) {
	    var argsConvert = GetValue(config, 'argsConvert', undefined);
	    var argsConvertScope = GetValue(config, 'argsConvertScope', undefined);

	    var fnName = cmd[0];

	    ARGS = Copy(ARGS, cmd, 1);
	    if (argsConvert) {
	        // convert string to floating number, boolean, null, or string        
	        if (argsConvert === true) {
	            argsConvert = TypeConvert;
	            argsConvertScope = undefined;
	        }
	        for (var i = 0, len = ARGS.length; i < len; i++) {
	            if (argsConvertScope) {
	                ARGS[i] = argsConvert.call(argsConvertScope, ARGS[i], cmd);
	            } else {
	                ARGS[i] = argsConvert(ARGS[i], cmd);
	            }
	        }
	    }

	    var fn;
	    if (typeof (fnName) === 'string') {
	        fn = scope[fnName];
	        if (fn == null) {
	            fn = GetValue(scope, fnName, null);
	        }
	    } else {
	        fn = fnName;
	    }

	    var retValue = fn.apply(scope, ARGS);
	    return retValue;
	};
	var ARGS = []; // reuse this array

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

	class CustomCmd extends BaseCmd {
	    constructor(scenario) {
	        super(scenario, '-');
	        this.task = undefined;
	        this.lastMethodName = undefined;
	    }

	    resetFromJSON(o) {
	        if (this.task) {
	            this.task.off('complete', this.resume, this);
	            this.task = undefined;
	        }
	    }

	    parse(inst, index) {
	        var cmd = SpliceOne(inst, 0);

	        var scenario = this.scenario;
	        var argsConvert = scenario.argsConvert;
	        var argsConvertScope = scenario.argsConvertScope;
	        if (argsConvert) {
	            if (argsConvert === true) {
	                argsConvert = TypeConvert;
	                argsConvertScope = undefined;
	            }
	            for (var i = 1, len = inst.length; i < len; i++) {
	                if (argsConvertScope) {
	                    inst[i] = argsConvert.call(argsConvertScope, inst[i], inst);
	                } else {
	                    inst[i] = argsConvert(inst[i], inst);
	                }
	            }
	        }

	        inst = [cmd, inst];
	        return inst;
	    }

	    run(inst) {
	        if (!this.validate(inst)) {
	            this.scenario.error(`Command '${GetFunctionName(inst)}' is not found in scope`);
	            return;
	        }

	        var command = inst[1];
	        this.lastMethodName = command[0];
	        var task = RunCommands(command, this.scenario.scope);
	        if (task && (typeof (task.once) === 'function')) {
	            task.once('complete', this.resume, this);
	            this.pause();
	            this.task = task;
	        } else {
	            this.task = undefined;
	        }
	    }

	    validate(inst) {
	        var fnName = GetFunctionName(inst);
	        if (fnName === null) {
	            return false;
	        }

	        var scope = this.scenario.scope;
	        var fn = scope[fnName];
	        if (fn == null) {
	            fn = GetValue(scope, fnName, null);
	        }
	        return !!fn;
	    }

	    pause() {
	        this.scenario.pause();
	    }

	    resume() {
	        this.task = undefined;
	        var scenario = this.scenario;
	        scenario.resume();
	        scenario.runNextCmd();
	    }
	}

	var GetFunctionName = function (inst) {
	    var command = inst[1];
	    if (!command) {
	        return null;
	    }

	    var fnName = command[0];
	    if (!fnName) {
	        return null;
	    }

	    return fnName;
	};

	class WaitCmd extends BaseCmd {
	    constructor(scenario) {
	        super(scenario, 'wait');
	    }

	    parse(inst, index) {
	        inst.length = 2;
	        var eventName = this.getEventName(inst);
	        if (!isNaN(eventName)) {
	            inst[1] = parseFloat(eventName);
	        }
	        return inst;
	    }

	    run(inst) {
	        var eventName = this.getEventName(inst);
	        if (typeof (eventName) === 'number') {
	            this.waitTime(eventName);
	        } else {
	            this.waitEvent(eventName);
	        }
	    }

	    waitTime(delayTime) {
	        if (delayTime > this.scenario.offset) {
	            delayTime -= this.scenario.offset;
	            this.scenario.offset = 0;
	            if (this.scenario.isDebugMode) {
	                this.scenario.log('#WAIT: ' + delayTime);
	            }
	            this.scenario.wait(delayTime);
	        } else {
	            this.scenario.offset -= delayTime;
	        }
	    }

	    waitEvent(eventName) {
	        if (this.scenario.isDebugMode) {
	            this.scenario.log('#WAIT: ' + eventName);
	        }
	        this.scenario.wait(eventName);
	    }

	    getEventName(inst) {
	        var eventName = inst[1];
	        if (eventName == null) {
	            eventName = '';
	            inst[1] = eventName;
	        }
	        return eventName;
	    }
	}

	class LabelCmd extends BaseCmd {
	    constructor(scenario) {
	        super(scenario, 'label');

	        this.labels = {};
	        this.prevLabel = '';
	        this.lastLabel = '';
	    }

	    resetFromJSON(o) {
	        this.prevLabel = GetValue(o, 'preLabel', '');
	        this.lastLabel = GetValue(o, 'lastLabel', '');
	        var labels = GetValue(o, 'labels', undefined);
	        if (labels === undefined) {
	            Clear(this.labels);
	        } else {
	            Clone(labels, this.labels);
	        }
	    }

	    toJSON() {
	        return {
	            preLabel: this.prevLabel,
	            lastLabel: this.lastLabel,
	            labels: this.labels
	        };
	    }

	    parse(inst, index) {
	        inst.length = 2;
	        var label = this.getLabel(inst);
	        this.addLabel(label, index);
	        return inst;
	    }

	    run(inst) {
	        var label = this.getLabel(inst);
	        if (this.scenario.isDebugMode) {
	            this.scenario.log('#LABEL: ' + label);
	        }

	        this.prevLabel = this.lastLabel;
	        this.lastLabel = label;
	        //this.scenario.resetClock(); // TODO
	        var scenario = this.scenario;
	        scenario.emit('labelchange', this.lastLabel, this.prevLabel, scenario.scope, scenario);
	    }

	    getLabel(inst) {
	        var label = inst[1];
	        if (label == null) {
	            label = '';
	            inst[1] = label;
	        }
	        return label;
	    }

	    addLabel(name, index) {
	        this.labels[name] = index;
	    }

	    getIndex(name) {
	        if ((name === '') || !this.hasLabel(name)) {
	            return 0;
	        }
	        return this.labels[name];
	    }

	    hasLabel(name) {
	        return this.labels.hasOwnProperty(name);
	    }
	}

	class ExitCmd extends BaseCmd {
	    constructor(scenario) {
	        super(scenario, 'exit');
	    }

	    parse(inst, index) {
	        inst.length = 1;
	        return inst;
	    }

	    run(inst) {
	        this.scenario.log('#EXIT');
	        this.scenario.complete();         
	    }
	}

	class GotoCmd extends BaseCmd {
	    constructor(scenario) {
	        super(scenario, 'goto');
	    }

	    parse(inst, index) {
	        inst.length = 2;
	        return inst;
	    }

	    run(inst) {
	        var label = this.getLabel(inst);
	        if (this.scenario.isDebugMode) {
	            this.scenario.log('#GOTO label: ' + label);
	        }
	        this.scenario.goto(label);
	    }

	    getLabel(inst) {
	        var label = inst[1];
	        if (label == null) {
	            label = '';
	            inst[1] = label;
	        }
	        return label;
	    }
	}

	class IfCmd extends BaseCmd {
	    constructor(scenario) {
	        super(scenario, 'if');
	    }

	    parse(inst, index) {
	        inst.length = 4;
	        var cond = '(' + this.getCond(inst) + ')';
	        inst[1] = new Function('return ' + cond);
	        return inst;
	    }

	    run(inst) {
	        var condFn = this.getCond(inst);
	        var result = condFn.call(this.scenario.scope);
	        var nextLabel = (result)? this.getTrueLabel(inst) : this.getFalseLabel(inst);
	        if (nextLabel !== '') {
	            if (this.scenario.isDebugMode) {
	                this.scenario.log('#IF ' + result + '- GOTO label: ' + nextLabel);
	            }
	            this.scenario.goto(nextLabel);
	        }
	    }

	    getCond(inst) {
	        var cond = inst[1];
	        if ((cond == null) || (cond === '')) {
	            cond = 'true';
	            inst[1] = cond;
	        }
	        return cond;
	    }

	    getTrueLabel(inst) {
	        var label = inst[2];
	        if (label == null) {
	            label = '';
	            inst[2] = label;
	        }
	        return label;
	    }

	    getFalseLabel(inst) {
	        var label = inst[3];
	        if (label == null) {
	            label = '';
	            inst[3] = label;
	        }
	        return label;
	    }
	}

	class CmdHandlers {
	    constructor(scenario) {
	        this.cmds = {
	            '-': new CustomCmd(scenario),
	            'wait': new WaitCmd(scenario),
	            'label': new LabelCmd(scenario),
	            'exit': new ExitCmd(scenario),
	            'goto': new GotoCmd(scenario),
	            'if': new IfCmd(scenario)
	        };
	    }

	    resetFromJSON(o) {
	        for (var name in this.cmds) {
	            this.cmds[name].resetFromJSON(GetValue(o, name, undefined));
	        }
	        return this;
	    }

	    toJSON() {
	        var ret = {};
	        for (var name in this.cmds) {
	            ret[name] = this.cmds[name].toJSON();
	        }
	        return ret;
	    }

	    get(name) {
	        return this.cmds[name];
	    }

	    isValidCmdName(name) {
	        return this.cmds.hasOwnProperty(name);
	    }
	}

	var WaitEvent = function (eventEmitter, eventName) {
	    return new Promise(function (resolve, reject) {
	        eventEmitter.once(eventName, function () {
	            resolve();
	        });
	    });
	};

	var WaitComplete = function (eventEmitter) {
	    return WaitEvent(eventEmitter, 'complete');
	};

	class Timer {
	    constructor(parent) {
	        this.parent = parent;
	        this.timeScale = 1;
	        this.paused = false;
	        this.deltaT = 10;

	        this.timerId = null;
	        this.timeoutCallback = null;
	        this.time = 0;
	        this.remainingTime = 0;
	    }

	    destroy() {
	        this.stop();
	        return this;
	    }

	    start(time, timeoutCallback) {
	        this.time = time;
	        this.remainingTime = time;
	        this.timeoutCallback = timeoutCallback;

	        var self = this;
	        this.timerId = setInterval(function () {
	            if (!self.paused) {
	                self.remainingTime -= self.deltaT * self.timeScale;
	                if (self.remainingTime <= 0) {
	                    self.stop();
	                    if (self.timeoutCallback) {
	                        var timeoutCallback = self.timeoutCallback;
	                        self.timeoutCallback = null;
	                        timeoutCallback();
	                    }
	                }
	            }
	        }, self.deltaT);

	        return this;
	    }

	    stop() {
	        clearInterval(this.timerId);
	        this.timerId = null;
	        return this;
	    }

	    pause() {
	        this.paused = true;
	        return this;
	    }

	    resume() {
	        this.paused = false;
	        return this;
	    }

	    setTimeScale(value) {
	        this.timeScale = value;
	        return this;
	    }
	}

	class CSVScenarioLogic {
	    constructor(parent, config) {
	        if (parent === undefined) {
	            parent = {};
	        }

	        this.parent = parent;

	        // Event emitter
	        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

	        this.timer = this.createTimer(parent, config);
	        this._timeScale = 1;
	        this.instMem = new InstMem(this);
	        this.cmdHandlers = new CmdHandlers(this);
	        this.resetFromJSON(config);
	        this.boot(parent, config);
	    }

	    // Override
	    boot(parent, config) {
	        return this;
	    }

	    // Override
	    createTimer(parent, config) {
	        return new Timer(parent);
	    }

	    resetFromJSON(o) {
	        this._inRunCmdLoop = false;
	        this.isRunning = GetValue(o, 'state', false);
	        this.isPaused = GetValue(o, 'pause', false);
	        this.waitEvent = GetValue(o, 'wait', undefined);
	        this.scope = GetValue(o, 'scope', undefined);
	        this.timeUnit = GetValue(o, 'timeUnit', 0);
	        this.cmdPrefix = GetValue(o, 'prefix', DEFAULT_PREFIX);
	        this.argsConvert = GetValue(o, 'argsConvert', true);
	        this.argsConvertScope = GetValue(o, 'argsConvertScope', undefined);
	        this.cmdHandlers.resetFromJSON(GetValue(o, 'handlers', undefined));
	        this.instMem.resetFromJSON(GetValue(o, 'instMem', undefined));
	        this.delimiter = GetValue(o, 'delimiter', ',');
	        this.translateCommandNameCallback = GetValue(o, 'translateCommandNameCallback', undefined);
	        return this;
	    }

	    toJSON() {
	        return {
	            state: this.isRunning,
	            pause: this.isPaused,
	            wait: this.waitEvent,
	            scope: this.scope,
	            timeUnit: this.timeUnit,
	            prefix: this.cmdPrefix,
	            argsConvert: this.argsConvert,
	            argsConvertScope: this.argsConvertScope,
	            handlers: this.cmdHandlers.toJSON(),
	            instMem: this.instMem.toJSON(),
	            delimiter: this.delimiter
	        };
	    }

	    shutdown() {
	        if (!this.parent) {
	            return
	        }

	        this.destroyEventEmitter();
	        this.clear();
	        this.timer.destroy();
	        this.parent = undefined;
	    }

	    destroy() {
	        this.shutdown();
	    }

	    load(strCmd, scope, config) {
	        this.clear();

	        this.timeUnit = GetValue(config, 'timeUnit', this.timeUnit);
	        if (typeof (this.timeUnit) === 'string') {
	            this.timeUnit = TIMEUNITMODE[this.timeUnit];
	        }
	        this.cmdPrefix = GetValue(config, 'prefix', this.cmdPrefix);
	        if (typeof (this.cmdPrefix) === 'string') {
	            this.cmdPrefix = new RegExp(this.cmdPrefix);
	        }
	        this.argsConvert = GetValue(config, 'argsConvert', this.argsConvert);
	        this.argsConvertScope = GetValue(config, 'argsConvertScope', this.argsConvertScope);
	        this.scope = scope;

	        this.delimiter = GetValue(config, 'delimiter', this.delimiter);
	        this.translateCommandNameCallback = GetValue(config, 'translateCommandNameCallback', this.translateCommandNameCallback);

	        this.append(strCmd);
	        return this;
	    }

	    clear() {
	        this.stop();
	        this.instMem.resetFromJSON();
	        this.cmdHandlers.resetFromJSON();
	    }

	    start(config) {
	        this.stop();
	        var label = GetValue(config, 'label', '');
	        this.offset = GetValue(config, 'offset', 0);
	        if (this.isDebugMode) {
	            this.log('Start at Label: ' + label);
	        }

	        var result = this.goto(label);
	        if (!result) {
	            return false;
	        }

	        this.isRunning = true;
	        this.runNextCmd();
	        return true;
	    }

	    play(config) {
	        this.start(config);
	        return this;
	    }

	    playPromise(config) {
	        var promise = WaitComplete(this);
	        this.start(config);
	        return promise;
	    }

	    getIndex(label) {
	        var index = this.getCmdHandler('label').getIndex(label);
	        if (index == null) {
	            this.error(`Label: ${label} is not found`);
	        }
	        return index;
	    }

	    goto(label) {
	        var index;
	        if (typeof (label) === 'string') {
	            index = this.getIndex(label);
	        } else {
	            index = label;
	        }
	        if (index == null) {
	            return false;
	        }
	        this.instMem.setNextIndex(index);
	        return true;
	    }

	    get timeScale() {
	        return this._timeScale;
	    }

	    set timeScale(value) {
	        this._timeScale = value;
	        this.timer.setTimeScale(value);
	    }

	    setTimeScale(timeScale) {
	        this.timeScale = timeScale;
	        return this;
	    }

	    wait(eventName) {
	        this.waitEvent = eventName;
	        if (typeof (eventName) === 'number') {
	            var delay = eventName;
	            if (this.timeUnit === 1) {
	                delay *= 1000;
	            }

	            var self = this;
	            this.timer.start(
	                delay,
	                function () { self.continue(eventName); }
	            );

	        } else {
	            this.emit(`wait.${eventName}`, this);
	        }

	        this.emit('wait', eventName, this);
	        return this;
	    }

	    stop() {
	        if (!this.isRunning) {
	            return this;
	        }

	        this.isRunning = false;
	        this.isPaused = false;

	        // clear wait event
	        this.waitEvent = undefined;
	        this.timer.stop();

	        return this;
	    }

	    complete() {
	        this.emit('complete', this.scope, this);
	        this.stop();
	        return this;
	    }

	    append(csvString) {
	        var arr = CSVParser.parse(csvString, {
	            delimiter: this.delimiter
	        }).data;
	        this.parse(arr);
	        return this;
	    }

	    pause() {
	        if (!this.isRunning) {
	            return this;
	        }
	        if (this.isPaused) {
	            return this;
	        }

	        this.isPaused = true;
	        this.timer.pause();
	        return this;
	    }

	    resume() {
	        if (!this.isRunning) {
	            return this;
	        }
	        if (!this.isPaused) {
	            return this;
	        }

	        this.isPaused = false;
	        this.timer.resume();
	        return this;
	    }

	    continue(eventName) {
	        if ((!this.isRunning) ||
	            this.isPaused ||
	            (this.waitEvent === undefined)) {
	            return this;
	        }

	        if ((eventName === true) || (eventName === this.waitEvent)) {
	            this.waitEvent = undefined;
	            this.runNextCmd();
	        }
	        return this;
	    }

	    get lastLabel() {
	        return this.cmdHandlers.cmds.label.lastLabel;
	    }

	    get previousLabel() {
	        return this.cmdHandlers.cmds.label.prevLabel;
	    }

	    get lastCustomCommandName() {
	        return this.cmdHandlers.cmds['-'].lastMethodName;
	    }

	    getCmdHandler(name) {
	        if (typeof (name) !== 'string') {
	            name = name[0];
	        }
	        return this.cmdHandlers.get(name);
	    }

	    parse(arr) {
	        var item, name, prefix = this.cmdPrefix;
	        for (var i = 0, len = arr.length; i < len; i++) {
	            item = arr[i];
	            name = item[0];
	            if (name === '-') {
	                this.appendCustomCommand(item);

	            } else if (!isNaN(name)) {
	                var time = parseFloat(name);
	                if (time > 0) {
	                    // insert 'wait' command
	                    this.appendCommand(['wait', time]);
	                }
	                this.appendCustomCommand(item);

	            } else if (prefix.test(name)) {
	                var innerMatch = name.match(prefix);
	                item[0] = innerMatch[1].toLowerCase();
	                var isValid = this.appendCommand(item);

	                if (!isValid) {
	                    this.error(`Line ${i}: ${JSON.stringify(item)} is not a valid command`);
	                }

	            } else {
	                // insert 'wait' command
	                this.appendCommand(['wait', name]);
	                item[0] = '-';
	                this.appendCommand(item);
	            }
	        }

	        return this;
	    }

	    appendCommand(inst) {
	        var handler = this.getCmdHandler(inst);
	        if (handler == null) {
	            return false;
	        }
	        inst = handler.parse(inst, this.instMem.length);
	        if (inst) {
	            this.instMem.append(inst);
	        }
	        return true;
	    }

	    appendCustomCommand(inst) {
	        inst[0] = '-';
	        if (this.translateCommandNameCallback) {
	            inst[1] = this.translateCommandNameCallback(inst[1]);
	        }
	        return this.appendCommand(inst);
	    }

	    runNextCmd() {
	        if (this._inRunCmdLoop) { // prevent re-entry
	            return;
	        }

	        var instMem = this.instMem;
	        var inst;
	        this._inRunCmdLoop = true;
	        while (
	            this.isRunning &&
	            (!this.isPaused) &&
	            (this.waitEvent === undefined)
	        ) {
	            inst = instMem.get();
	            instMem.setNextIndex();
	            if (inst == null) {
	                this.complete();
	                break;
	            }
	            this.getCmdHandler(inst).run(inst);
	        }
	        this._inRunCmdLoop = false;
	        return this;
	    }

	    log(msg) {
	        this.emit('log', msg, this.scope, this);
	        return this;
	    }

	    get isDebugMode() {
	        return (this.listenerCount('log') > 0);
	    }

	    error(msg) {
	        this.emit('error', msg, this.scope, this);
	        return this;
	    }
	}

	Object.assign(
	    CSVScenarioLogic.prototype,
	    EventEmitterMethods
	);

	const TIMEUNITMODE = {
	    ms: 0,
	    s: 1,
	    sec: 1
	};
	const DEFAULT_PREFIX = /^#([a-zA-Z]+)/;

	return CSVScenarioLogic;

}));
