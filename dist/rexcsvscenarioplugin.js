(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcsvscenarioplugin = factory());
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
	v5.4.1
	https://github.com/mholt/PapaParse
	License: MIT
	*/

	(function (module, exports) {
		!function(e,t){module.exports=t();}(commonjsGlobal,function s(){var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=f.IS_PAPA_WORKER||!1,a={},u=0,b={parse:function(e,t){var r=(t=t||{}).dynamicTyping||!1;J(r)&&(t.dynamicTypingFunction=r,r={});if(t.dynamicTyping=r,t.transform=!!J(t.transform)&&t.transform,t.worker&&b.WORKERS_SUPPORTED){var i=function(){if(!b.WORKERS_SUPPORTED)return !1;var e=(r=f.URL||f.webkitURL||null,i=s.toString(),b.BLOB_URL||(b.BLOB_URL=r.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",i,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var r,i;return t.onmessage=_,t.id=u++,a[t.id]=t}();return i.userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=J(t.step),t.chunk=J(t.chunk),t.complete=J(t.complete),t.error=J(t.error),delete t.worker,void i.postMessage({input:e,config:t,workerId:i.id})}var n=null;b.NODE_STREAM_INPUT,"string"==typeof e?(e=function(e){if(65279===e.charCodeAt(0))return e.slice(1);return e}(e),n=t.download?new l(t):new p(t)):!0===e.readable&&J(e.read)&&J(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var n=!1,_=!0,m=",",y="\r\n",s='"',a=s+s,r=!1,i=null,o=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return -1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(r=t.skipEmptyLines);"string"==typeof t.newline&&(y=t.newline);"string"==typeof t.quoteChar&&(s=t.quoteChar);"boolean"==typeof t.header&&(_=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");i=t.columns;}void 0!==t.escapeChar&&(a=t.escapeChar+s);("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(o=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/);}();var u=new RegExp(Q(s),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return h(null,e,r);if("object"==typeof e[0])return h(i||Object.keys(e[0]),e,r)}else if("object"==typeof e)return "string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||i),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),h(e.fields||[],e.data||[],r);throw new Error("Unable to serialize unrecognized input");function h(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(i+=m),i+=v(e[a],a);0<t.length&&(i+=y);}for(var o=0;o<t.length;o++){var u=n?e.length:t[o].length,h=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(r&&!n&&(h="greedy"===r?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===r&&n){for(var d=[],l=0;l<u;l++){var c=s?e[l]:l;d.push(t[o][c]);}h=""===d.join("").trim();}if(!h){for(var p=0;p<u;p++){0<p&&!f&&(i+=m);var g=n&&s?e[p]:p;i+=v(t[o][g],p);}o<t.length-1&&(!r||0<u&&!f)&&(i+=y);}}return i}function v(e,t){if(null==e)return "";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var r=!1;o&&"string"==typeof e&&o.test(e)&&(e="'"+e,r=!0);var i=e.toString().replace(u,a);return (r=r||!0===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return !0;return !1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(m)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!n&&!!f.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=E,b.ParserHandle=r,b.NetworkStreamer=l,b.FileStreamer=c,b.StringStreamer=p,b.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var r=o.config||{},u=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return !0;for(var t=0;t<this.files.length;t++)u.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},r)});}),e(),this;function e(){if(0!==u.length){var e,t,r,i,n=u[0];if(J(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,r=n.inputElem,i=s.reason,void(J(o.error)&&o.error({name:e},t,r,i));if("skip"===s.action)return void h();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config));}else if("skip"===s)return void h()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){J(a)&&a(e,n.file,n.inputElem),h();},b.parse(n.file,n.instanceConfig);}else J(o.complete)&&o.complete();}function h(){u.splice(0,1),e();}};}function h(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new r(t),(this._handle.streamer=this)._config=t;}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&J(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r);}this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(J(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0;}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!J(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0;},this._sendError=function(e){J(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:b.WORKER_ID,error:e,finished:!1});};}function l(e){var i;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),h.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded();}:function(){this._readChunk();},this.stream=function(e){this._input=e,this._nextChunk();},this._readChunk=function(){if(this._finished)this._chunkLoaded();else {if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),n||(i.onload=v(this._chunkLoaded,this),i.onerror=v(this._chunkError,this)),i.open(this._config.downloadRequestBody?"POST":"GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)i.setRequestHeader(t,e[t]);}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r);}try{i.send(this._config.downloadRequestBody);}catch(e){this._chunkError(e.message);}n&&0===i.status&&this._chunkError();}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:i.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return -1;return parseInt(t.substring(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)));},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t));};}function c(e){var i,n;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),h.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=v(this._chunkLoaded,this),i.onerror=v(this._chunkError,this)):i=new FileReaderSync,this._nextChunk();},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk();},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t);}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}});},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result);},this._chunkError=function(){this._sendError(i.error);};}function p(e){var r;h.call(this,e=e||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,t=this._config.chunkSize;return t?(e=r.substring(0,t),r=r.substring(t)):(e=r,r=""),this._finished=!r,this.parseChunk(e)}};}function g(e){h.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause();},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume();},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError);},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0);},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0;},this._streamData=v(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()));}catch(e){this._streamError(e);}},this),this._streamError=v(function(e){this._streamCleanUp(),this._sendError(e);},this),this._streamEnd=v(function(){this._streamCleanUp(),i=!0,this._streamData("");},this),this._streamCleanUp=v(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError);},this);}function r(m){var a,o,u,i=Math.pow(2,53),n=-i,s=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,h=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,t=this,r=0,f=0,d=!1,e=!1,l=[],c={data:[],errors:[],meta:{}};if(J(m.step)){var p=m.step;m.step=function(e){if(c=e,_())g();else {if(g(),0===c.data.length)return;r+=e.data.length,m.preview&&r>m.preview?o.abort():(c.data=c.data[0],p(c,t));}};}function y(e){return "greedy"===m.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){return c&&u&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),u=!1),m.skipEmptyLines&&(c.data=c.data.filter(function(e){return !y(e)})),_()&&function(){if(!c)return;function e(e,t){J(m.transformHeader)&&(e=m.transformHeader(e,t)),l.push(e);}if(Array.isArray(c.data[0])){for(var t=0;_()&&t<c.data.length;t++)c.data[t].forEach(e);c.data.splice(0,1);}else c.data.forEach(e);}(),function(){if(!c||!m.header&&!m.dynamicTyping&&!m.transform)return c;function e(e,t){var r,i=m.header?{}:[];for(r=0;r<e.length;r++){var n=r,s=e[r];m.header&&(n=r>=l.length?"__parsed_extra":l[r]),m.transform&&(s=m.transform(s,n)),s=v(n,s),"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s;}return m.header&&(r>l.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+r,f+t):r<l.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+r,f+t)),i}var t=1;!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(e),t=c.data.length):c.data=e(c.data,0);m.header&&c.meta&&(c.meta.fields=l);return f+=t,c}()}function _(){return m.header&&0===l.length}function v(e,t){return r=e,m.dynamicTypingFunction&&void 0===m.dynamicTyping[r]&&(m.dynamicTyping[r]=m.dynamicTypingFunction(r)),!0===(m.dynamicTyping[r]||m.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<i)return !0}return !1}(t)?parseFloat(t):h.test(t)?new Date(t):""===t?null:t):t;var r;}function k(e,t,r,i){var n={type:e,code:t,message:r};void 0!==i&&(n.row=i),c.errors.push(n);}this.parse=function(e,t,r){var i=m.quoteChar||'"';if(m.newline||(m.newline=function(e,t){e=e.substring(0,1048576);var r=new RegExp(Q(t)+"([^]*?)"+Q(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return "\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(e,i)),u=!1,m.delimiter)J(m.delimiter)&&(m.delimiter=m.delimiter(e),c.meta.delimiter=m.delimiter);else {var n=function(e,t,r,i,n){var s,a,o,u;n=n||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var h=0;h<n.length;h++){var f=n[h],d=0,l=0,c=0;o=void 0;for(var p=new E({comments:i,delimiter:f,newline:t,preview:10}).parse(e),g=0;g<p.data.length;g++)if(r&&y(p.data[g]))c++;else {var _=p.data[g].length;l+=_,void 0!==o?0<_&&(d+=Math.abs(_-o),o=_):o=_;}0<p.data.length&&(l/=p.data.length-c),(void 0===a||d<=a)&&(void 0===u||u<l)&&1.99<l&&(a=d,s=f,u=l);}return {successful:!!(m.delimiter=s),bestDelimiter:s}}(e,m.newline,m.skipEmptyLines,m.comments,m.delimitersToGuess);n.successful?m.delimiter=n.bestDelimiter:(u=!0,m.delimiter=b.DefaultDelimiter),c.meta.delimiter=m.delimiter;}var s=w(m);return m.preview&&m.header&&s.preview++,a=e,o=new E(s),c=o.parse(a,t,r),g(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,o.abort(),a=J(m.chunk)?"":a.substring(o.getCharIndex());},this.resume=function(){t.streamer._halted?(d=!1,t.streamer.parseChunk(a,!0)):setTimeout(t.resume,3);},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),c.meta.aborted=!0,J(m.complete)&&m.complete(c),a="";};}function Q(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function E(j){var z,M=(j=j||{}).delimiter,P=j.newline,U=j.comments,q=j.step,N=j.preview,B=j.fastMode,K=z=void 0===j.quoteChar||null===j.quoteChar?'"':j.quoteChar;if(void 0!==j.escapeChar&&(K=j.escapeChar),("string"!=typeof M||-1<b.BAD_DELIMITERS.indexOf(M))&&(M=","),U===M)throw new Error("Comment character same as delimiter");!0===U?U="#":("string"!=typeof U||-1<b.BAD_DELIMITERS.indexOf(U))&&(U=!1),"\n"!==P&&"\r"!==P&&"\r\n"!==P&&(P="\n");var W=0,H=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw new Error("Input must be a string");var n=i.length,e=M.length,s=P.length,a=U.length,o=J(q),u=[],h=[],f=[],d=W=0;if(!i)return L();if(j.header&&!t){var l=i.split(P)[0].split(M),c=[],p={},g=!1;for(var _ in l){var m=l[_];J(j.transformHeader)&&(m=j.transformHeader(m,_));var y=m,v=p[m]||0;for(0<v&&(g=!0,y=m+"_"+v),p[m]=v+1;c.includes(y);)y=y+"_"+v;c.push(y);}if(g){var k=i.split(P);k[0]=c.join(M),i=k.join(P);}}if(B||!1!==B&&-1===i.indexOf(z)){for(var b=i.split(P),E=0;E<b.length;E++){if(f=b[E],W+=f.length,E!==b.length-1)W+=P.length;else if(r)return L();if(!U||f.substring(0,a)!==U){if(o){if(u=[],I(f.split(M)),F(),H)return L()}else I(f.split(M));if(N&&N<=E)return u=u.slice(0,N),L(!0)}}return L()}for(var w=i.indexOf(M,W),R=i.indexOf(P,W),C=new RegExp(Q(K)+Q(z),"g"),S=i.indexOf(z,W);;)if(i[W]!==z)if(U&&0===f.length&&i.substring(W,W+a)===U){if(-1===R)return L();W=R+s,R=i.indexOf(P,W),w=i.indexOf(M,W);}else if(-1!==w&&(w<R||-1===R))f.push(i.substring(W,w)),W=w+e,w=i.indexOf(M,W);else {if(-1===R)break;if(f.push(i.substring(W,R)),D(R+s),o&&(F(),H))return L();if(N&&u.length>=N)return L(!0)}else for(S=W,W++;;){if(-1===(S=i.indexOf(z,S+1)))return r||h.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:u.length,index:W}),T();if(S===n-1)return T(i.substring(W,S).replace(C,z));if(z!==K||i[S+1]!==K){if(z===K||0===S||i[S-1]!==K){-1!==w&&w<S+1&&(w=i.indexOf(M,S+1)),-1!==R&&R<S+1&&(R=i.indexOf(P,S+1));var O=A(-1===R?w:Math.min(w,R));if(i.substr(S+1+O,e)===M){f.push(i.substring(W,S).replace(C,z)),i[W=S+1+O+e]!==z&&(S=i.indexOf(z,W)),w=i.indexOf(M,W),R=i.indexOf(P,W);break}var x=A(R);if(i.substring(S+1+x,S+1+x+s)===P){if(f.push(i.substring(W,S).replace(C,z)),D(S+1+x+s),w=i.indexOf(M,W),S=i.indexOf(z,W),o&&(F(),H))return L();if(N&&u.length>=N)return L(!0);break}h.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:u.length,index:W}),S++;}}else S++;}return T();function I(e){u.push(e),d=W;}function A(e){var t=0;if(-1!==e){var r=i.substring(S+1,e);r&&""===r.trim()&&(t=r.length);}return t}function T(e){return r||(void 0===e&&(e=i.substring(W)),f.push(e),W=n,I(f),o&&F()),L()}function D(e){W=e,I(f),f=[],R=i.indexOf(P,W);}function L(e){return {data:u,errors:h,meta:{delimiter:M,linebreak:P,aborted:H,truncated:!!e,cursor:d+(t||0)}}}function F(){q(L()),u=[],h=[];}},this.abort=function(){H=!0;},this.getCharIndex=function(){return W};}function _(e){var t=e.data,r=a[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,m(t.workerId,{data:[],errors:[],meta:{aborted:!0}});},pause:y,resume:y};if(J(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results;}else J(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results);}t.finished&&!i&&m(t.workerId,t.results);}function m(e,t){var r=a[e];J(r.userComplete)&&r.userComplete(t),r.terminate(),delete a[e];}function y(){throw new Error("Not implemented.")}function w(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=w(e[r]);return t}function v(e,t){return function(){e.apply(t,arguments);}}function J(e){return "function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var r=b.parse(t.input,t.config);r&&f.postMessage({workerId:b.WORKER_ID,results:r,finished:!0});}}),(l.prototype=Object.create(h.prototype)).constructor=l,(c.prototype=Object.create(h.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(h.prototype)).constructor=g,b}); 
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

	let Timer$1 = class Timer {
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
	};

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
	        return new Timer$1(parent);
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

	class Timer {
	    constructor(scene) {
	        this.scene = scene;
	        this.timeScale = 1;
	        this.timer = null;
	    }

	    destroy() {
	        this.stop();
	        return this;
	    }

	    start(delay, timeoutCallback) {
	        if (this.timer) {
	            this.timer.remove();
	            this.timer = undefined;
	        }

	        this.timer = this.scene.time.delayedCall(delay, timeoutCallback);
	        this.timer.timeScale = this.timeScale;
	        return this;
	    }

	    stop() {
	        if (this.timer) {
	            this.timer.remove();
	            this.timer = undefined;
	        }
	        return this;
	    }

	    pause() {
	        if (this.timer) {
	            this.timer.paused = true;
	        }
	        return this;
	    }

	    resume() {
	        if (this.timer) {
	            this.timer.paused = false;
	        }
	        return this;
	    }

	    setTimeScale(value) {
	        this.timeScale = value;
	        if (this.timer) {
	            this.timer.timeScale = value;
	        }
	        return this;
	    }
	}

	class CSVScenario extends CSVScenarioLogic {
	    constructor(scene, config) {
	        super(scene, config);
	        // this.parent = scene
	    }

	    boot(scene, config) {
	        scene.sys.events.once('shutdown', this.destroy, this);
	        super.boot(scene, config);
	        return this;
	    }

	    createTimer(scene, config) {
	        return new Timer(scene);
	    }
	}

	class CSVScenarioPlugin extends Phaser.Plugins.BasePlugin {
	    constructor(pluginManager) {
	        super(pluginManager);
	    }

	    start() {
	        var eventEmitter = this.game.events;
	        eventEmitter.on('destroy', this.destroy, this);
	    }

	    add(scene, config) {
	        return new CSVScenario(scene, config);
	    }
	}

	return CSVScenarioPlugin;

}));
