(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcsvscenarioplugin = factory());
}(this, (function () { 'use strict';

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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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
  var GetValue$4 = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue; //  Use for loop here so we can break early

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var papaparse_min = createCommonjsModule(function (module, exports) {
  /* @license
  Papa Parse
  v5.3.1
  https://github.com/mholt/PapaParse
  License: MIT
  */
  !function(e,t){module.exports=t();}(commonjsGlobal,function s(){var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=n&&/blob:/i.test((f.location||{}).protocol),a={},h=0,b={parse:function(e,t){var i=(t=t||{}).dynamicTyping||!1;M(i)&&(t.dynamicTypingFunction=i,i={});if(t.dynamicTyping=i,t.transform=!!M(t.transform)&&t.transform,t.worker&&b.WORKERS_SUPPORTED){var r=function(){if(!b.WORKERS_SUPPORTED)return !1;var e=(i=f.URL||f.webkitURL||null,r=s.toString(),b.BLOB_URL||(b.BLOB_URL=i.createObjectURL(new Blob(["(",r,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var i,r;return t.onmessage=_,t.id=h++,a[t.id]=t}();return r.userStep=t.step,r.userChunk=t.chunk,r.userComplete=t.complete,r.userError=t.error,t.step=M(t.step),t.chunk=M(t.chunk),t.complete=M(t.complete),t.error=M(t.error),delete t.worker,void r.postMessage({input:e,config:t,workerId:r.id})}var n=null;b.NODE_STREAM_INPUT,"string"==typeof e?n=t.download?new l(t):new p(t):!0===e.readable&&M(e.read)&&M(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var n=!1,_=!0,m=",",y="\r\n",s='"',a=s+s,i=!1,r=null,o=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return -1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(i=t.skipEmptyLines);"string"==typeof t.newline&&(y=t.newline);"string"==typeof t.quoteChar&&(s=t.quoteChar);"boolean"==typeof t.header&&(_=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");r=t.columns;}void 0!==t.escapeChar&&(a=t.escapeChar+s);"boolean"==typeof t.escapeFormulae&&(o=t.escapeFormulae);}();var h=new RegExp(j(s),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return u(null,e,i);if("object"==typeof e[0])return u(r||Object.keys(e[0]),e,i)}else if("object"==typeof e)return "string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),u(e.fields||[],e.data||[],i);throw new Error("Unable to serialize unrecognized input");function u(e,t,i){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(r+=m),r+=v(e[a],a);0<t.length&&(r+=y);}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(i&&!n&&(u="greedy"===i?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===i&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c]);}u=""===d.join("").trim();}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(r+=m);var g=n&&s?e[p]:p;r+=v(t[o][g],p);}o<t.length-1&&(!i||0<h&&!f)&&(r+=y);}}return r}function v(e,t){if(null==e)return "";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);!0===o&&"string"==typeof e&&null!==e.match(/^[=+\-@].*$/)&&(e="'"+e);var i=e.toString().replace(h,a),r="boolean"==typeof n&&n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return !0;return !1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(m)||" "===i.charAt(0)||" "===i.charAt(i.length-1);return r?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!n&&!!f.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=E,b.ParserHandle=i,b.NetworkStreamer=l,b.FileStreamer=c,b.StringStreamer=p,b.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var i=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return !0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},i)});}),e(),this;function e(){if(0!==h.length){var e,t,i,r,n=h[0];if(M(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,i=n.inputElem,r=s.reason,void(M(o.error)&&o.error({name:e},t,i,r));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config));}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){M(a)&&a(e,n.file,n.inputElem),u();},b.parse(n.file,n.instanceConfig);}else M(o.complete)&&o.complete();}function u(){h.splice(0,1),e();}};}function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new i(t),(this._handle.streamer=this)._config=t;}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&M(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);void 0!==i&&(e=i);}this.isFirstChunk=!1,this._halted=!1;var r=this._partialLine+e;this._partialLine="";var n=this._handle.parse(r,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=r.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(M(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0;}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!M(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0;},this._sendError=function(e){M(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:b.WORKER_ID,error:e,finished:!1});};}function l(e){var r;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),u.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded();}:function(){this._readChunk();},this.stream=function(e){this._input=e,this._nextChunk();},this._readChunk=function(){if(this._finished)this._chunkLoaded();else {if(r=new XMLHttpRequest,this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),n||(r.onload=v(this._chunkLoaded,this),r.onerror=v(this._chunkError,this)),r.open(this._config.downloadRequestBody?"POST":"GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)r.setRequestHeader(t,e[t]);}if(this._config.chunkSize){var i=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+i);}try{r.send(this._config.downloadRequestBody);}catch(e){this._chunkError(e.message);}n&&0===r.status&&this._chunkError();}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:r.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return -1;return parseInt(t.substring(t.lastIndexOf("/")+1))}(r),this.parseChunk(r.responseText)));},this._chunkError=function(e){var t=r.statusText||e;this._sendError(new Error(t));};}function c(e){var r,n;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),u.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((r=new FileReader).onload=v(this._chunkLoaded,this),r.onerror=v(this._chunkError,this)):r=new FileReaderSync,this._nextChunk();},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk();},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t);}var i=r.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:i}});},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result);},this._chunkError=function(){this._sendError(r.error);};}function p(e){var i;u.call(this,e=e||{}),this.stream=function(e){return i=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,t=this._config.chunkSize;return t?(e=i.substring(0,t),i=i.substring(t)):(e=i,i=""),this._finished=!i,this.parseChunk(e)}};}function g(e){u.call(this,e=e||{});var t=[],i=!0,r=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause();},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume();},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError);},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0);},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0;},this._streamData=v(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()));}catch(e){this._streamError(e);}},this),this._streamError=v(function(e){this._streamCleanUp(),this._sendError(e);},this),this._streamEnd=v(function(){this._streamCleanUp(),r=!0,this._streamData("");},this),this._streamCleanUp=v(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError);},this);}function i(m){var a,o,h,r=Math.pow(2,53),n=-r,s=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,u=/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,t=this,i=0,f=0,d=!1,e=!1,l=[],c={data:[],errors:[],meta:{}};if(M(m.step)){var p=m.step;m.step=function(e){if(c=e,_())g();else {if(g(),0===c.data.length)return;i+=e.data.length,m.preview&&i>m.preview?o.abort():(c.data=c.data[0],p(c,t));}};}function y(e){return "greedy"===m.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){if(c&&h&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),h=!1),m.skipEmptyLines)for(var e=0;e<c.data.length;e++)y(c.data[e])&&c.data.splice(e--,1);return _()&&function(){if(!c)return;function e(e,t){M(m.transformHeader)&&(e=m.transformHeader(e,t)),l.push(e);}if(Array.isArray(c.data[0])){for(var t=0;_()&&t<c.data.length;t++)c.data[t].forEach(e);c.data.splice(0,1);}else c.data.forEach(e);}(),function(){if(!c||!m.header&&!m.dynamicTyping&&!m.transform)return c;function e(e,t){var i,r=m.header?{}:[];for(i=0;i<e.length;i++){var n=i,s=e[i];m.header&&(n=i>=l.length?"__parsed_extra":l[i]),m.transform&&(s=m.transform(s,n)),s=v(n,s),"__parsed_extra"===n?(r[n]=r[n]||[],r[n].push(s)):r[n]=s;}return m.header&&(i>l.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+i,f+t):i<l.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+i,f+t)),r}var t=1;!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(e),t=c.data.length):c.data=e(c.data,0);m.header&&c.meta&&(c.meta.fields=l);return f+=t,c}()}function _(){return m.header&&0===l.length}function v(e,t){return i=e,m.dynamicTypingFunction&&void 0===m.dynamicTyping[i]&&(m.dynamicTyping[i]=m.dynamicTypingFunction(i)),!0===(m.dynamicTyping[i]||m.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<r)return !0}return !1}(t)?parseFloat(t):u.test(t)?new Date(t):""===t?null:t):t;var i;}function k(e,t,i,r){var n={type:e,code:t,message:i};void 0!==r&&(n.row=r),c.errors.push(n);}this.parse=function(e,t,i){var r=m.quoteChar||'"';if(m.newline||(m.newline=function(e,t){e=e.substring(0,1048576);var i=new RegExp(j(t)+"([^]*?)"+j(t),"gm"),r=(e=e.replace(i,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<r[0].length;if(1===r.length||s)return "\n";for(var a=0,o=0;o<r.length;o++)"\n"===r[o][0]&&a++;return a>=r.length/2?"\r\n":"\r"}(e,r)),h=!1,m.delimiter)M(m.delimiter)&&(m.delimiter=m.delimiter(e),c.meta.delimiter=m.delimiter);else {var n=function(e,t,i,r,n){var s,a,o,h;n=n||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var u=0;u<n.length;u++){var f=n[u],d=0,l=0,c=0;o=void 0;for(var p=new E({comments:r,delimiter:f,newline:t,preview:10}).parse(e),g=0;g<p.data.length;g++)if(i&&y(p.data[g]))c++;else {var _=p.data[g].length;l+=_,void 0!==o?0<_&&(d+=Math.abs(_-o),o=_):o=_;}0<p.data.length&&(l/=p.data.length-c),(void 0===a||d<=a)&&(void 0===h||h<l)&&1.99<l&&(a=d,s=f,h=l);}return {successful:!!(m.delimiter=s),bestDelimiter:s}}(e,m.newline,m.skipEmptyLines,m.comments,m.delimitersToGuess);n.successful?m.delimiter=n.bestDelimiter:(h=!0,m.delimiter=b.DefaultDelimiter),c.meta.delimiter=m.delimiter;}var s=w(m);return m.preview&&m.header&&s.preview++,a=e,o=new E(s),c=o.parse(a,t,i),g(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,o.abort(),a=M(m.chunk)?"":a.substring(o.getCharIndex());},this.resume=function(){t.streamer._halted?(d=!1,t.streamer.parseChunk(a,!0)):setTimeout(t.resume,3);},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),c.meta.aborted=!0,M(m.complete)&&m.complete(c),a="";};}function j(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function E(e){var S,O=(e=e||{}).delimiter,x=e.newline,I=e.comments,T=e.step,D=e.preview,A=e.fastMode,L=S=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(L=e.escapeChar),("string"!=typeof O||-1<b.BAD_DELIMITERS.indexOf(O))&&(O=","),I===O)throw new Error("Comment character same as delimiter");!0===I?I="#":("string"!=typeof I||-1<b.BAD_DELIMITERS.indexOf(I))&&(I=!1),"\n"!==x&&"\r"!==x&&"\r\n"!==x&&(x="\n");var F=0,z=!1;this.parse=function(r,t,i){if("string"!=typeof r)throw new Error("Input must be a string");var n=r.length,e=O.length,s=x.length,a=I.length,o=M(T),h=[],u=[],f=[],d=F=0;if(!r)return C();if(A||!1!==A&&-1===r.indexOf(S)){for(var l=r.split(x),c=0;c<l.length;c++){if(f=l[c],F+=f.length,c!==l.length-1)F+=x.length;else if(i)return C();if(!I||f.substring(0,a)!==I){if(o){if(h=[],k(f.split(O)),R(),z)return C()}else k(f.split(O));if(D&&D<=c)return h=h.slice(0,D),C(!0)}}return C()}for(var p=r.indexOf(O,F),g=r.indexOf(x,F),_=new RegExp(j(L)+j(S),"g"),m=r.indexOf(S,F);;)if(r[F]!==S)if(I&&0===f.length&&r.substring(F,F+a)===I){if(-1===g)return C();F=g+s,g=r.indexOf(x,F),p=r.indexOf(O,F);}else if(-1!==p&&(p<g||-1===g))f.push(r.substring(F,p)),F=p+e,p=r.indexOf(O,F);else {if(-1===g)break;if(f.push(r.substring(F,g)),w(g+s),o&&(R(),z))return C();if(D&&h.length>=D)return C(!0)}else for(m=F,F++;;){if(-1===(m=r.indexOf(S,m+1)))return i||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:F}),E();if(m===n-1)return E(r.substring(F,m).replace(_,S));if(S!==L||r[m+1]!==L){if(S===L||0===m||r[m-1]!==L){-1!==p&&p<m+1&&(p=r.indexOf(O,m+1)),-1!==g&&g<m+1&&(g=r.indexOf(x,m+1));var y=b(-1===g?p:Math.min(p,g));if(r[m+1+y]===O){f.push(r.substring(F,m).replace(_,S)),r[F=m+1+y+e]!==S&&(m=r.indexOf(S,F)),p=r.indexOf(O,F),g=r.indexOf(x,F);break}var v=b(g);if(r.substring(m+1+v,m+1+v+s)===x){if(f.push(r.substring(F,m).replace(_,S)),w(m+1+v+s),p=r.indexOf(O,F),m=r.indexOf(S,F),o&&(R(),z))return C();if(D&&h.length>=D)return C(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:F}),m++;}}else m++;}return E();function k(e){h.push(e),d=F;}function b(e){var t=0;if(-1!==e){var i=r.substring(m+1,e);i&&""===i.trim()&&(t=i.length);}return t}function E(e){return i||(void 0===e&&(e=r.substring(F)),f.push(e),F=n,k(f),o&&R()),C()}function w(e){F=e,k(f),f=[],g=r.indexOf(x,F);}function C(e){return {data:h,errors:u,meta:{delimiter:O,linebreak:x,aborted:z,truncated:!!e,cursor:d+(t||0)}}}function R(){T(C()),h=[],u=[];}},this.abort=function(){z=!0;},this.getCharIndex=function(){return F};}function _(e){var t=e.data,i=a[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){r=!0,m(t.workerId,{data:[],errors:[],meta:{aborted:!0}});},pause:y,resume:y};if(M(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results;}else M(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results);}t.finished&&!r&&m(t.workerId,t.results);}function m(e,t){var i=a[e];M(i.userComplete)&&i.userComplete(t),i.terminate(),delete a[e];}function y(){throw new Error("Not implemented.")}function w(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var i in e)t[i]=w(e[i]);return t}function v(e,t){return function(){e.apply(t,arguments);}}function M(e){return "function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var i=b.parse(t.input,t.config);i&&f.postMessage({workerId:b.WORKER_ID,results:i,finished:!0});}}),(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(u.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(u.prototype)).constructor=g,b});
  });

  var Clear = function Clear(obj) {
    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }
  };

  /**
   * Shallow Object Clone. Will not out nested objects.
   * @param {object} obj JSON object
   * @param {object} ret JSON object to return, set null to return a new object
   * @returns {object} this object
   */

  var Clone = function Clone(obj, out) {
    var objIsArray = Array.isArray(obj);

    if (out === undefined) {
      out = objIsArray ? [] : {};
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

  var GetValue$3 = Phaser.Utils.Objects.GetValue;

  var InstMem = /*#__PURE__*/function () {
    function InstMem(scenario) {
      _classCallCheck(this, InstMem);

      this.scenario = scenario;
      this.queue = [];
      this.currentIdx = -1;
      this.nextIdx = 0;
    }

    _createClass(InstMem, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        var queue = GetValue$3(o, 'queue', undefined);

        if (queue === undefined) {
          Clear(this.queue);
        } else {
          Clone(queue, this.queue);
        }

        this.currentIdx = GetValue$3(o, 'curIdx', -1);
        this.nextIdx = GetValue$3(o, 'nextIdx', 0);
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.currentIdx = -1;
        this.nextIdx = 0;
        this.queue.length = 0;
        return this;
      }
    }, {
      key: "append",
      value: function append(item) {
        this.queue.push(item);
        return this;
      }
    }, {
      key: "setNextIndex",
      value: function setNextIndex(index) {
        if (index === undefined) {
          index = this.currentIdx + 1;
        }

        this.nextIdx = index;
        return this;
      }
    }, {
      key: "get",
      value: function get(index) {
        if (index === undefined) {
          index = this.nextIdx;
        }

        this.currentIdx = index;
        return this.queue[index];
      }
    }, {
      key: "length",
      get: function get() {
        return this.queue.length;
      }
    }]);

    return InstMem;
  }();

  var BaseCmd = /*#__PURE__*/function () {
    function BaseCmd(scenario, type) {
      _classCallCheck(this, BaseCmd);

      this.scenario = scenario;
      this.type = type;
    }

    _createClass(BaseCmd, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {}
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {};
      }
    }, {
      key: "parse",
      value: function parse(inst, index) {
        return inst;
      }
    }, {
      key: "run",
      value: function run(inst) {}
    }]);

    return BaseCmd;
  }();

  var Copy = function Copy(dest, src, startIdx, endIdx) {
    if (startIdx === undefined) {
      startIdx = 0;
    }

    if (endIdx === undefined) {
      endIdx = src.length;
    }

    dest.length = endIdx - startIdx;

    for (var i = 0, len = dest.length; i < len; i++) {
      dest[i] = src[i + startIdx];
    }

    return dest;
  };

  var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

  var convert = function convert(s) {
    if (typeof s !== 'string') {
      return s;
    }

    if (s === '') {
      s = null;
    } else if (FLOAT.test(s)) {
      s = parseFloat(s);
    } else {
      if (s === 'false') {
        s = false;
      } else if (s === 'true') {
        s = true;
      }
    }

    return s;
  };

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;

  var RunCommands = function RunCommands(queue, scope, config) {
    var reverse = GetValue$2(config, 'reverse', false);
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

  var RunCommand = function RunCommand(cmd, scope, config) {
    var argsConvert = GetValue$2(config, 'argsConvert', undefined);
    var argsConvertScope = GetValue$2(config, 'argsConvertScope', undefined);
    var fnName = cmd[0];
    ARGS = Copy(ARGS, cmd, 1);

    if (argsConvert) {
      // convert string to floating number, boolean, null, or string        
      if (argsConvert === true) {
        argsConvert = convert;
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

    if (typeof fnName === 'string') {
      fn = scope[fnName];

      if (fn == null) {
        fn = GetValue$2(scope, fnName, null);
      }
    } else {
      fn = fnName;
    }

    var retValue = fn.apply(scope, ARGS);
    return retValue;
  };

  var ARGS = []; // reuse this array

  var SpliceOne = Phaser.Utils.Array.SpliceOne;

  var CustomCmd = /*#__PURE__*/function (_BaseCmd) {
    _inherits(CustomCmd, _BaseCmd);

    var _super = _createSuper(CustomCmd);

    function CustomCmd(scenario) {
      var _this;

      _classCallCheck(this, CustomCmd);

      _this = _super.call(this, scenario, '-');
      _this.task = undefined;
      return _this;
    }

    _createClass(CustomCmd, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        if (this.task) {
          this.task.off('complete', this.resume, this);
          this.task = undefined;
        }
      }
    }, {
      key: "parse",
      value: function parse(inst, index) {
        var cmd = SpliceOne(inst, 0);
        var scenario = this.scenario;
        var argsConvert = scenario.argsConvert;
        var argsConvertScope = scenario.argsConvertScope;

        if (argsConvert) {
          if (argsConvert === true) {
            argsConvert = convert;
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
    }, {
      key: "run",
      value: function run(inst) {
        var scenario = this.scenario;
        var task = RunCommands(inst[1], scenario.scope);

        if (task && typeof task.once === 'function') {
          task.once('complete', this.resume, this);
          this.pause();
          this.task = task;
        } else {
          this.task = undefined;
        }
      }
    }, {
      key: "pause",
      value: function pause() {
        this.scenario.pause();
      }
    }, {
      key: "resume",
      value: function resume() {
        this.task = undefined;
        var scenario = this.scenario;
        scenario.resume();
        scenario.runNextCmd();
      }
    }]);

    return CustomCmd;
  }(BaseCmd);

  var WaitCmd = /*#__PURE__*/function (_BaseCmd) {
    _inherits(WaitCmd, _BaseCmd);

    var _super = _createSuper(WaitCmd);

    function WaitCmd(scenario) {
      _classCallCheck(this, WaitCmd);

      return _super.call(this, scenario, 'wait');
    }

    _createClass(WaitCmd, [{
      key: "parse",
      value: function parse(inst, index) {
        inst.length = 2;
        var eventName = this.getEventName(inst);

        if (!isNaN(eventName)) {
          inst[1] = parseFloat(eventName);
        }

        return inst;
      }
    }, {
      key: "run",
      value: function run(inst) {
        var eventName = this.getEventName(inst);

        if (typeof eventName === 'number') {
          this.waitTime(eventName);
        } else {
          this.waitEvent(eventName);
        }
      }
    }, {
      key: "waitTime",
      value: function waitTime(delayTime) {
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
    }, {
      key: "waitEvent",
      value: function waitEvent(eventName) {
        if (this.scenario.isDebugMode) {
          this.scenario.log('#WAIT: ' + eventName);
        }

        this.scenario.wait(eventName);
      }
    }, {
      key: "getEventName",
      value: function getEventName(inst) {
        var eventName = inst[1];

        if (eventName == null) {
          eventName = '';
          inst[1] = eventName;
        }

        return eventName;
      }
    }]);

    return WaitCmd;
  }(BaseCmd);

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var LabelCmd = /*#__PURE__*/function (_BaseCmd) {
    _inherits(LabelCmd, _BaseCmd);

    var _super = _createSuper(LabelCmd);

    function LabelCmd(scenario) {
      var _this;

      _classCallCheck(this, LabelCmd);

      _this = _super.call(this, scenario, 'label');
      _this.labels = {};
      _this.prevLabel = '';
      _this.lastLabel = '';
      return _this;
    }

    _createClass(LabelCmd, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.prevLabel = GetValue$1(o, 'preLabel', '');
        this.lastLabel = GetValue$1(o, 'lastLabel', '');
        var labels = GetValue$1(o, 'labels', undefined);

        if (labels === undefined) {
          Clear(this.labels);
        } else {
          Clone(labels, this.labels);
        }
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          preLabel: this.prevLabel,
          lastLabel: this.lastLabel,
          labels: this.labels
        };
      }
    }, {
      key: "parse",
      value: function parse(inst, index) {
        inst.length = 2;
        var label = this.getLabel(inst);
        this.addLabel(label, index);
        return inst;
      }
    }, {
      key: "run",
      value: function run(inst) {
        var label = this.getLabel(inst);

        if (this.scenario.isDebugMode) {
          this.scenario.log('#LABEL: ' + label);
        }

        this.prevLabel = this.lastLabel;
        this.lastLabel = label; //this.scenario.resetClock(); // TODO

        var scenario = this.scenario;
        scenario.emit('labelchange', this.lastLabel, this.prevLabel, scenario.scope, scenario);
      }
    }, {
      key: "getLabel",
      value: function getLabel(inst) {
        var label = inst[1];

        if (label == null) {
          label = '';
          inst[1] = label;
        }

        return label;
      }
    }, {
      key: "addLabel",
      value: function addLabel(name, index) {
        this.labels[name] = index;
      }
    }, {
      key: "getIndex",
      value: function getIndex(name) {
        if (name === '' || !this.hasLabel(name)) {
          return 0;
        }

        return this.labels[name];
      }
    }, {
      key: "hasLabel",
      value: function hasLabel(name) {
        return this.labels.hasOwnProperty(name);
      }
    }]);

    return LabelCmd;
  }(BaseCmd);

  var ExitCmd = /*#__PURE__*/function (_BaseCmd) {
    _inherits(ExitCmd, _BaseCmd);

    var _super = _createSuper(ExitCmd);

    function ExitCmd(scenario) {
      _classCallCheck(this, ExitCmd);

      return _super.call(this, scenario, 'exit');
    }

    _createClass(ExitCmd, [{
      key: "parse",
      value: function parse(inst, index) {
        inst.length = 1;
        return inst;
      }
    }, {
      key: "run",
      value: function run(inst) {
        this.scenario.log('#EXIT');
        this.scenario.complete();
      }
    }]);

    return ExitCmd;
  }(BaseCmd);

  var GotoCmd = /*#__PURE__*/function (_BaseCmd) {
    _inherits(GotoCmd, _BaseCmd);

    var _super = _createSuper(GotoCmd);

    function GotoCmd(scenario) {
      _classCallCheck(this, GotoCmd);

      return _super.call(this, scenario, 'goto');
    }

    _createClass(GotoCmd, [{
      key: "parse",
      value: function parse(inst, index) {
        inst.length = 2;
        return inst;
      }
    }, {
      key: "run",
      value: function run(inst) {
        var label = this.getLabel(inst);

        if (this.scenario.isDebugMode) {
          this.scenario.log('#GOTO label: ' + label);
        }

        this.scenario["goto"](label);
      }
    }, {
      key: "getLabel",
      value: function getLabel(inst) {
        var label = inst[1];

        if (label == null) {
          label = '';
          inst[1] = label;
        }

        return label;
      }
    }]);

    return GotoCmd;
  }(BaseCmd);

  var IfCmd = /*#__PURE__*/function (_BaseCmd) {
    _inherits(IfCmd, _BaseCmd);

    var _super = _createSuper(IfCmd);

    function IfCmd(scenario) {
      _classCallCheck(this, IfCmd);

      return _super.call(this, scenario, 'if');
    }

    _createClass(IfCmd, [{
      key: "parse",
      value: function parse(inst, index) {
        inst.length = 4;
        var cond = '(' + this.getCond(inst) + ')';
        inst[1] = new Function('return ' + cond);
        return inst;
      }
    }, {
      key: "run",
      value: function run(inst) {
        var condFn = this.getCond(inst);
        var result = condFn.call(this.scenario.scope);
        var nextLabel = result ? this.getTrueLabel(inst) : this.getFalseLabel(inst);

        if (nextLabel !== '') {
          if (this.scenario.isDebugMode) {
            this.scenario.log('#IF ' + result + '- GOTO label: ' + nextLabel);
          }

          this.scenario["goto"](nextLabel);
        }
      }
    }, {
      key: "getCond",
      value: function getCond(inst) {
        var cond = inst[1];

        if (cond == null || cond === '') {
          cond = 'true';
          inst[1] = cond;
        }

        return cond;
      }
    }, {
      key: "getTrueLabel",
      value: function getTrueLabel(inst) {
        var label = inst[2];

        if (label == null) {
          label = '';
          inst[2] = label;
        }

        return label;
      }
    }, {
      key: "getFalseLabel",
      value: function getFalseLabel(inst) {
        var label = inst[3];

        if (label == null) {
          label = '';
          inst[3] = label;
        }

        return label;
      }
    }]);

    return IfCmd;
  }(BaseCmd);

  var GetValue = Phaser.Utils.Objects.GetValue;

  var CmdHandlers = /*#__PURE__*/function () {
    function CmdHandlers(scenario) {
      _classCallCheck(this, CmdHandlers);

      this.cmds = {
        '-': new CustomCmd(scenario),
        'wait': new WaitCmd(scenario),
        'label': new LabelCmd(scenario),
        'exit': new ExitCmd(scenario),
        'goto': new GotoCmd(scenario),
        'if': new IfCmd(scenario)
      };
    }

    _createClass(CmdHandlers, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        for (var name in this.cmds) {
          this.cmds[name].resetFromJSON(GetValue(o, name, undefined));
        }

        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var ret = {};

        for (var name in this.cmds) {
          ret[name] = this.cmds[name].toJSON();
        }

        return ret;
      }
    }, {
      key: "get",
      value: function get(name) {
        return this.cmds[name];
      }
    }, {
      key: "isValidCmdName",
      value: function isValidCmdName(name) {
        return this.cmds.hasOwnProperty(name);
      }
    }]);

    return CmdHandlers;
  }();

  var CSVScenario = /*#__PURE__*/function () {
    function CSVScenario(scene, config) {
      _classCallCheck(this, CSVScenario);

      // Event emitter
      this.setEventEmitter(GetValue$4(config, 'eventEmitter', undefined));
      this.scene = scene;
      this.timer = undefined;
      this.instMem = new InstMem(this);
      this.cmdHandlers = new CmdHandlers(this);
      this.resetFromJSON(config);
      this.boot();
    }

    _createClass(CSVScenario, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this._inRunCmdLoop = false;
        this.isRunning = GetValue$4(o, 'state', false);
        this.isPaused = GetValue$4(o, 'pause', false);
        this.waitEvent = GetValue$4(o, 'wait', undefined);
        this.scope = GetValue$4(o, 'scope', undefined);
        this.timeUnit = GetValue$4(o, 'timeUnit', 0);
        this.cmdPrefix = GetValue$4(o, 'prefix', DEFAULT_PREFIX);
        this.argsConvert = GetValue$4(o, 'argsConvert', true);
        this.argsConvertScope = GetValue$4(o, 'argsConvertScope', undefined);
        this.cmdHandlers.resetFromJSON(GetValue$4(o, 'handlers', undefined));
        this.instMem.resetFromJSON(GetValue$4(o, 'instMem', undefined));
        this.delimiter = GetValue$4(o, 'delimiter', ',');
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
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
    }, {
      key: "boot",
      value: function boot() {
        this.scene.events.once('shutdown', this.destroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        if (!this.scene) {
          return;
        }

        this.destroyEventEmitter();
        this.clear();
        this.scene.events.off('shutdown', this.destroy, this);
        this.scene = undefined;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "load",
      value: function load(strCmd, scope, config) {
        this.clear();
        this.timeUnit = GetValue$4(config, 'timeUnit', this.timeUnit);

        if (typeof this.timeUnit === 'string') {
          this.timeUnit = TIMEUNITMODE[this.timeUnit];
        }

        this.cmdPrefix = GetValue$4(config, 'prefix', this.cmdPrefix);

        if (typeof this.cmdPrefix === 'string') {
          this.cmdPrefix = new RegExp(this.cmdPrefix);
        }

        this.argsConvert = GetValue$4(config, 'argsConvert', this.argsConvert);
        this.argsConvertScope = GetValue$4(config, 'argsConvertScope', this.argsConvertScope);
        this.scope = scope;
        this.delimiter = GetValue$4(config, 'delimiter', this.delimiter);
        this.append(strCmd);
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.stop();
        this.instMem.resetFromJSON();
        this.cmdHandlers.resetFromJSON();
      }
    }, {
      key: "start",
      value: function start(config) {
        this.stop();
        var label = GetValue$4(config, 'label', '');
        this.offset = GetValue$4(config, 'offset', 0);

        if (this.isDebugMode) {
          this.log('Start at Label: ' + label);
        }

        var result = this["goto"](label);

        if (!result) {
          return false;
        }

        this.isRunning = true;
        this.runNextCmd();
        return true;
      }
    }, {
      key: "getIndex",
      value: function getIndex(label) {
        var index = this.getCmdHandler('label').getIndex(label);

        if (index == null) {
          this.error('Label: ' + label + ' is not found');
        }

        return index;
      }
    }, {
      key: "goto",
      value: function goto(label) {
        var index;

        if (typeof label === 'string') {
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
    }, {
      key: "wait",
      value: function wait(eventName) {
        this.waitEvent = eventName;

        if (typeof eventName === 'number') {
          var delay = eventName;

          if (this.timeUnit === 1) {
            delay *= 1000;
          }

          this.timer = this.scene.time.delayedCall(delay, this["continue"], [eventName], this);
        }

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (!this.isRunning) {
          return this;
        }

        this.isRunning = false;
        this.isPaused = false; // clear wait event

        this.waitEvent = undefined;

        if (this.timer) {
          this.timer.remove();
          this.timer = undefined;
        }

        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.emit('complete', this.scope, this);
        this.stop();
        return this;
      }
    }, {
      key: "append",
      value: function append(csvString) {
        var arr = papaparse_min.parse(csvString, {
          delimiter: this.delimiter
        }).data;
        this.parse(arr);
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        if (!this.isRunning) {
          return this;
        }

        if (this.isPaused) {
          return this;
        }

        this.isPaused = true;

        if (this.timer) {
          this.timer.paused = true;
        }

        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        if (!this.isRunning) {
          return this;
        }

        if (!this.isPaused) {
          return this;
        }

        this.isPaused = false;

        if (this.timer) {
          this.timer.paused = false;
        }

        return this;
      }
    }, {
      key: "continue",
      value: function _continue(eventName) {
        if (!this.isRunning || this.isPaused || this.waitEvent === undefined) {
          return this;
        }

        if (eventName === this.waitEvent) {
          this.timer = undefined;
          this.waitEvent = undefined;
          this.runNextCmd();
        }

        return this;
      }
    }, {
      key: "lastLabel",
      get: function get() {
        return this.cmdHandlers.labelCmd.lastLabel;
      }
    }, {
      key: "previousLabel",
      get: function get() {
        return this.cmdHandlers.labelCmd.preLabel;
      }
    }, {
      key: "getCmdHandler",
      value: function getCmdHandler(name) {
        if (typeof name !== 'string') {
          name = name[0];
        }

        return this.cmdHandlers.get(name);
      }
    }, {
      key: "parse",
      value: function parse(arr) {
        var item,
            name,
            prefix = this.cmdPrefix;

        for (var i = 0, len = arr.length; i < len; i++) {
          item = arr[i];
          name = item[0];

          if (name === '-') {
            this.appendCommand(item);
          } else if (!isNaN(name)) {
            var time = parseFloat(name);

            if (time > 0) {
              // insert 'wait' command
              this.appendCommand(['wait', time]);
            }

            item[0] = '-';
            this.appendCommand(item);
          } else if (prefix.test(name)) {
            var innerMatch = name.match(prefix);
            item[0] = innerMatch[1].toLowerCase();
            var isValid = this.appendCommand(item);

            if (!isValid) {
              this.error('Line ' + i + ': ' + JSON.stringify(item) + ' is not a valid command');
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
    }, {
      key: "appendCommand",
      value: function appendCommand(inst) {
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
    }, {
      key: "runNextCmd",
      value: function runNextCmd() {
        if (this._inRunCmdLoop) {
          // prevent re-entry
          return;
        }

        this.threadId;
        var instMem = this.instMem;
        var inst;
        this._inRunCmdLoop = true;

        while (this.isRunning && !this.isPaused && this.waitEvent === undefined) {
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
    }, {
      key: "log",
      value: function log(msg) {
        this.emit('log', msg, this.scope, this);
        return this;
      }
    }, {
      key: "isDebugMode",
      get: function get() {
        return this.listenerCount('log') > 0;
      }
    }, {
      key: "error",
      value: function error(msg) {
        this.emit('error', msg, this.scope, this);
        return this;
      }
    }]);

    return CSVScenario;
  }();

  Object.assign(CSVScenario.prototype, EventEmitterMethods);
  var TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1
  };
  var DEFAULT_PREFIX = /^#([a-zA-Z]+)/;

  var CSVScenarioPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(CSVScenarioPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(CSVScenarioPlugin);

    function CSVScenarioPlugin(pluginManager) {
      _classCallCheck(this, CSVScenarioPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(CSVScenarioPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, config) {
        return new CSVScenario(scene, config);
      }
    }]);

    return CSVScenarioPlugin;
  }(Phaser.Plugins.BasePlugin);

  return CSVScenarioPlugin;

})));
