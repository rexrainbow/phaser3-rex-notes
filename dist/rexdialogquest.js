(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('phaser')) :
    typeof define === 'function' && define.amd ? define(['phaser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdialogquest = factory(global.Phaser));
})(this, (function (phaser) { 'use strict';

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
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

    var GetValue$1 = function (source, key, defaultValue, altSource) {
        var isValidSource = source && (typeof source === 'object' || typeof source === 'function');
        var isValidAltSource = altSource && (typeof altSource === 'object' || typeof altSource === 'function');

        if (!isValidSource && !isValidAltSource) {
            return defaultValue;
        }

        var keyPath = String(key);

        // Shortcut:
        // If obj[keyPath] can be read (including prototype chain), return it directly.
        // This also supports literal keys like "a.b".
        if (isValidSource && (keyPath in source)) {
            return source[keyPath];
        }
        if (isValidAltSource && (keyPath in altSource)) {
            return altSource[keyPath];
        }

        // If there is no dot, we already know it's missing.
        if (keyPath.indexOf('.') === -1) {
            return defaultValue;
        }

        var keys = keyPath.split('.');

        // 1) Try source path first
        if (isValidSource) {
            var sourceResult = WalkPath(source, keys, defaultValue);
            if (sourceResult.found) {
                return sourceResult.value;
            }
        }

        // 2) Then try altSource path
        if (isValidAltSource) {
            var altSourceResult = WalkPath(altSource, keys, defaultValue);
            if (altSourceResult.found) {
                return altSourceResult.value;
            }
        }

        return defaultValue;
    };


    var WalkPath = function (source, keys, defaultValue) {
        var parent = source;
        var value = defaultValue;

        var found;
        for (var index = 0, cnt = keys.length; index < cnt; index++) {
            var partKey = keys[index];

            if (parent && (typeof parent === 'object' || typeof parent === 'function')) {
                found = (partKey in parent);
            } else {
                found = false;
            }

            if (!found) {
                WalkPathResult.found = false;
                return WalkPathResult;
            }

            value = parent[partKey];
            parent = value;
        }

        WalkPathResult.found = true;
        WalkPathResult.value = value;
        return WalkPathResult;
    };

    var WalkPathResult = {};

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

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

    var ParseCSV = function (csvString, config) {
        var delimiter = GetValue$1(config, 'delimiter', ',');
        var arr = CSVParser.parse(csvString, {
            header: true,
            delimiter: delimiter,
        }).data;

        var questionType = GetValue$1(config, 'types.question', 'q');
        var optionType = GetValue$1(config, 'types.option', '');
        var convertFn = GetValue$1(config, 'convert', true);
        if (convertFn === true) {
            convertFn = TypeConvert;
        }

        var items = [];
        var rowObj, rowType,
            item, option;
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
            rowObj = arr[i];
            rowType = rowObj.type;
            delete rowObj.type;

            if (rowType === questionType) {
                item = rowObj;
                if (item.key === '') {
                    delete item.key;
                }

                convert(item, convertFn);

                item.options = [];
                items.push(item);
            } else if (rowType === optionType) {
                if (item) {
                    option = rowObj;
                    if (option.key === '') {
                        delete option.key;
                    }

                    convert(option, convertFn);
                    item.options.push(option);
                }
            }
        }

        return items;
    };

    var convert = function (item, convertFn) {
        if (!convertFn) {
            return item;
        }

        for (var key in item) {
            item[key] = convertFn(item[key], key);
        }
        return item;
    };

    /*! js-yaml 4.2.0 https://github.com/nodeca/js-yaml @license MIT */
    //#region \0rolldown/runtime.js
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
    var __copyProps = (to, from, except, desc) => {
    	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
    		key = keys[i];
    		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
    			get: ((k) => from[k]).bind(null, key),
    			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    		});
    	}
    	return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    	value: mod,
    	enumerable: true
    }) : target, mod));
    //#endregion
    //#region lib/common.js
    var require_common = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	function isNothing(subject) {
    		return typeof subject === "undefined" || subject === null;
    	}
    	function isObject(subject) {
    		return typeof subject === "object" && subject !== null;
    	}
    	function toArray(sequence) {
    		if (Array.isArray(sequence)) return sequence;
    		else if (isNothing(sequence)) return [];
    		return [sequence];
    	}
    	function extend(target, source) {
    		if (source) {
    			const sourceKeys = Object.keys(source);
    			for (let index = 0, length = sourceKeys.length; index < length; index += 1) {
    				const key = sourceKeys[index];
    				target[key] = source[key];
    			}
    		}
    		return target;
    	}
    	function repeat(string, count) {
    		let result = "";
    		for (let cycle = 0; cycle < count; cycle += 1) result += string;
    		return result;
    	}
    	function isNegativeZero(number) {
    		return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    	}
    	module.exports.isNothing = isNothing;
    	module.exports.isObject = isObject;
    	module.exports.toArray = toArray;
    	module.exports.repeat = repeat;
    	module.exports.isNegativeZero = isNegativeZero;
    	module.exports.extend = extend;
    }));
    //#endregion
    //#region lib/exception.js
    var require_exception = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	function formatError(exception, compact) {
    		let where = "";
    		const message = exception.reason || "(unknown reason)";
    		if (!exception.mark) return message;
    		if (exception.mark.name) where += "in \"" + exception.mark.name + "\" ";
    		where += "(" + (exception.mark.line + 1) + ":" + (exception.mark.column + 1) + ")";
    		if (!compact && exception.mark.snippet) where += "\n\n" + exception.mark.snippet;
    		return message + " " + where;
    	}
    	function YAMLException(reason, mark) {
    		Error.call(this);
    		this.name = "YAMLException";
    		this.reason = reason;
    		this.mark = mark;
    		this.message = formatError(this, false);
    		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    		else this.stack = (/* @__PURE__ */ new Error()).stack || "";
    	}
    	YAMLException.prototype = Object.create(Error.prototype);
    	YAMLException.prototype.constructor = YAMLException;
    	YAMLException.prototype.toString = function toString(compact) {
    		return this.name + ": " + formatError(this, compact);
    	};
    	module.exports = YAMLException;
    }));
    //#endregion
    //#region lib/snippet.js
    var require_snippet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var common = require_common();
    	function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    		let head = "";
    		let tail = "";
    		const maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    		if (position - lineStart > maxHalfLength) {
    			head = " ... ";
    			lineStart = position - maxHalfLength + head.length;
    		}
    		if (lineEnd - position > maxHalfLength) {
    			tail = " ...";
    			lineEnd = position + maxHalfLength - tail.length;
    		}
    		return {
    			str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
    			pos: position - lineStart + head.length
    		};
    	}
    	function padStart(string, max) {
    		return common.repeat(" ", max - string.length) + string;
    	}
    	function makeSnippet(mark, options) {
    		options = Object.create(options || null);
    		if (!mark.buffer) return null;
    		if (!options.maxLength) options.maxLength = 79;
    		if (typeof options.indent !== "number") options.indent = 1;
    		if (typeof options.linesBefore !== "number") options.linesBefore = 3;
    		if (typeof options.linesAfter !== "number") options.linesAfter = 2;
    		const re = /\r?\n|\r|\0/g;
    		const lineStarts = [0];
    		const lineEnds = [];
    		let match;
    		let foundLineNo = -1;
    		while (match = re.exec(mark.buffer)) {
    			lineEnds.push(match.index);
    			lineStarts.push(match.index + match[0].length);
    			if (mark.position <= match.index && foundLineNo < 0) foundLineNo = lineStarts.length - 2;
    		}
    		if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
    		let result = "";
    		const lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    		const maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
    		for (let i = 1; i <= options.linesBefore; i++) {
    			if (foundLineNo - i < 0) break;
    			const line = getLine(mark.buffer, lineStarts[foundLineNo - i], lineEnds[foundLineNo - i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]), maxLineLength);
    			result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
    		}
    		const line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    		result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    		result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
    		for (let i = 1; i <= options.linesAfter; i++) {
    			if (foundLineNo + i >= lineEnds.length) break;
    			const line = getLine(mark.buffer, lineStarts[foundLineNo + i], lineEnds[foundLineNo + i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]), maxLineLength);
    			result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    		}
    		return result.replace(/\n$/, "");
    	}
    	module.exports = makeSnippet;
    }));
    //#endregion
    //#region lib/type.js
    var require_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var YAMLException = require_exception();
    	var TYPE_CONSTRUCTOR_OPTIONS = [
    		"kind",
    		"multi",
    		"resolve",
    		"construct",
    		"instanceOf",
    		"predicate",
    		"represent",
    		"representName",
    		"defaultStyle",
    		"styleAliases"
    	];
    	var YAML_NODE_KINDS = [
    		"scalar",
    		"sequence",
    		"mapping"
    	];
    	function compileStyleAliases(map) {
    		const result = {};
    		if (map !== null) Object.keys(map).forEach(function(style) {
    			map[style].forEach(function(alias) {
    				result[String(alias)] = style;
    			});
    		});
    		return result;
    	}
    	function Type(tag, options) {
    		options = options || {};
    		Object.keys(options).forEach(function(name) {
    			if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) throw new YAMLException("Unknown option \"" + name + "\" is met in definition of \"" + tag + "\" YAML type.");
    		});
    		this.options = options;
    		this.tag = tag;
    		this.kind = options["kind"] || null;
    		this.resolve = options["resolve"] || function() {
    			return true;
    		};
    		this.construct = options["construct"] || function(data) {
    			return data;
    		};
    		this.instanceOf = options["instanceOf"] || null;
    		this.predicate = options["predicate"] || null;
    		this.represent = options["represent"] || null;
    		this.representName = options["representName"] || null;
    		this.defaultStyle = options["defaultStyle"] || null;
    		this.multi = options["multi"] || false;
    		this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
    		if (YAML_NODE_KINDS.indexOf(this.kind) === -1) throw new YAMLException("Unknown kind \"" + this.kind + "\" is specified for \"" + tag + "\" YAML type.");
    	}
    	module.exports = Type;
    }));
    //#endregion
    //#region lib/schema.js
    var require_schema = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var YAMLException = require_exception();
    	var Type = require_type();
    	function compileList(schema, name) {
    		const result = [];
    		schema[name].forEach(function(currentType) {
    			let newIndex = result.length;
    			result.forEach(function(previousType, previousIndex) {
    				if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) newIndex = previousIndex;
    			});
    			result[newIndex] = currentType;
    		});
    		return result;
    	}
    	function compileMap() {
    		const result = {
    			scalar: {},
    			sequence: {},
    			mapping: {},
    			fallback: {},
    			multi: {
    				scalar: [],
    				sequence: [],
    				mapping: [],
    				fallback: []
    			}
    		};
    		function collectType(type) {
    			if (type.multi) {
    				result.multi[type.kind].push(type);
    				result.multi["fallback"].push(type);
    			} else result[type.kind][type.tag] = result["fallback"][type.tag] = type;
    		}
    		for (let index = 0, length = arguments.length; index < length; index += 1) arguments[index].forEach(collectType);
    		return result;
    	}
    	function Schema(definition) {
    		return this.extend(definition);
    	}
    	Schema.prototype.extend = function extend(definition) {
    		let implicit = [];
    		let explicit = [];
    		if (definition instanceof Type) explicit.push(definition);
    		else if (Array.isArray(definition)) explicit = explicit.concat(definition);
    		else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    			if (definition.implicit) implicit = implicit.concat(definition.implicit);
    			if (definition.explicit) explicit = explicit.concat(definition.explicit);
    		} else throw new YAMLException("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    		implicit.forEach(function(type) {
    			if (!(type instanceof Type)) throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    			if (type.loadKind && type.loadKind !== "scalar") throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    			if (type.multi) throw new YAMLException("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    		});
    		explicit.forEach(function(type) {
    			if (!(type instanceof Type)) throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    		});
    		const result = Object.create(Schema.prototype);
    		result.implicit = (this.implicit || []).concat(implicit);
    		result.explicit = (this.explicit || []).concat(explicit);
    		result.compiledImplicit = compileList(result, "implicit");
    		result.compiledExplicit = compileList(result, "explicit");
    		result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
    		return result;
    	};
    	module.exports = Schema;
    }));
    //#endregion
    //#region lib/type/str.js
    var require_str = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	module.exports = new (require_type())("tag:yaml.org,2002:str", {
    		kind: "scalar",
    		construct: function(data) {
    			return data !== null ? data : "";
    		}
    	});
    }));
    //#endregion
    //#region lib/type/seq.js
    var require_seq = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	module.exports = new (require_type())("tag:yaml.org,2002:seq", {
    		kind: "sequence",
    		construct: function(data) {
    			return data !== null ? data : [];
    		}
    	});
    }));
    //#endregion
    //#region lib/type/map.js
    var require_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	module.exports = new (require_type())("tag:yaml.org,2002:map", {
    		kind: "mapping",
    		construct: function(data) {
    			return data !== null ? data : {};
    		}
    	});
    }));
    //#endregion
    //#region lib/schema/failsafe.js
    var require_failsafe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	module.exports = new (require_schema())({ explicit: [
    		require_str(),
    		require_seq(),
    		require_map()
    	] });
    }));
    //#endregion
    //#region lib/type/null.js
    var require_null = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var Type = require_type();
    	function resolveYamlNull(data) {
    		if (data === null) return true;
    		const max = data.length;
    		return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    	}
    	function constructYamlNull() {
    		return null;
    	}
    	function isNull(object) {
    		return object === null;
    	}
    	module.exports = new Type("tag:yaml.org,2002:null", {
    		kind: "scalar",
    		resolve: resolveYamlNull,
    		construct: constructYamlNull,
    		predicate: isNull,
    		represent: {
    			canonical: function() {
    				return "~";
    			},
    			lowercase: function() {
    				return "null";
    			},
    			uppercase: function() {
    				return "NULL";
    			},
    			camelcase: function() {
    				return "Null";
    			},
    			empty: function() {
    				return "";
    			}
    		},
    		defaultStyle: "lowercase"
    	});
    }));
    //#endregion
    //#region lib/type/bool.js
    var require_bool = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var Type = require_type();
    	function resolveYamlBoolean(data) {
    		if (data === null) return false;
    		const max = data.length;
    		return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    	}
    	function constructYamlBoolean(data) {
    		return data === "true" || data === "True" || data === "TRUE";
    	}
    	function isBoolean(object) {
    		return Object.prototype.toString.call(object) === "[object Boolean]";
    	}
    	module.exports = new Type("tag:yaml.org,2002:bool", {
    		kind: "scalar",
    		resolve: resolveYamlBoolean,
    		construct: constructYamlBoolean,
    		predicate: isBoolean,
    		represent: {
    			lowercase: function(object) {
    				return object ? "true" : "false";
    			},
    			uppercase: function(object) {
    				return object ? "TRUE" : "FALSE";
    			},
    			camelcase: function(object) {
    				return object ? "True" : "False";
    			}
    		},
    		defaultStyle: "lowercase"
    	});
    }));
    //#endregion
    //#region lib/type/int.js
    var require_int = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var common = require_common();
    	var Type = require_type();
    	function isHexCode(c) {
    		return c >= 48 && c <= 57 || c >= 65 && c <= 70 || c >= 97 && c <= 102;
    	}
    	function isOctCode(c) {
    		return c >= 48 && c <= 55;
    	}
    	function isDecCode(c) {
    		return c >= 48 && c <= 57;
    	}
    	function resolveYamlInteger(data) {
    		if (data === null) return false;
    		const max = data.length;
    		let index = 0;
    		let hasDigits = false;
    		if (!max) return false;
    		let ch = data[index];
    		if (ch === "-" || ch === "+") ch = data[++index];
    		if (ch === "0") {
    			if (index + 1 === max) return true;
    			ch = data[++index];
    			if (ch === "b") {
    				index++;
    				for (; index < max; index++) {
    					ch = data[index];
    					if (ch !== "0" && ch !== "1") return false;
    					hasDigits = true;
    				}
    				return hasDigits && Number.isFinite(parseYamlInteger(data));
    			}
    			if (ch === "x") {
    				index++;
    				for (; index < max; index++) {
    					if (!isHexCode(data.charCodeAt(index))) return false;
    					hasDigits = true;
    				}
    				return hasDigits && Number.isFinite(parseYamlInteger(data));
    			}
    			if (ch === "o") {
    				index++;
    				for (; index < max; index++) {
    					if (!isOctCode(data.charCodeAt(index))) return false;
    					hasDigits = true;
    				}
    				return hasDigits && Number.isFinite(parseYamlInteger(data));
    			}
    		}
    		for (; index < max; index++) {
    			if (!isDecCode(data.charCodeAt(index))) return false;
    			hasDigits = true;
    		}
    		if (!hasDigits) return false;
    		return Number.isFinite(parseYamlInteger(data));
    	}
    	function parseYamlInteger(data) {
    		let value = data;
    		let sign = 1;
    		let ch = value[0];
    		if (ch === "-" || ch === "+") {
    			if (ch === "-") sign = -1;
    			value = value.slice(1);
    			ch = value[0];
    		}
    		if (value === "0") return 0;
    		if (ch === "0") {
    			if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    			if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
    			if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
    		}
    		return sign * parseInt(value, 10);
    	}
    	function constructYamlInteger(data) {
    		return parseYamlInteger(data);
    	}
    	function isInteger(object) {
    		return Object.prototype.toString.call(object) === "[object Number]" && object % 1 === 0 && !common.isNegativeZero(object);
    	}
    	module.exports = new Type("tag:yaml.org,2002:int", {
    		kind: "scalar",
    		resolve: resolveYamlInteger,
    		construct: constructYamlInteger,
    		predicate: isInteger,
    		represent: {
    			binary: function(obj) {
    				return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    			},
    			octal: function(obj) {
    				return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    			},
    			decimal: function(obj) {
    				return obj.toString(10);
    			},
    			hexadecimal: function(obj) {
    				return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    			}
    		},
    		defaultStyle: "decimal",
    		styleAliases: {
    			binary: [2, "bin"],
    			octal: [8, "oct"],
    			decimal: [10, "dec"],
    			hexadecimal: [16, "hex"]
    		}
    	});
    }));
    //#endregion
    //#region lib/type/float.js
    var require_float = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var common = require_common();
    	var Type = require_type();
    	var YAML_FLOAT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
    	var YAML_FLOAT_SPECIAL_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
    	function resolveYamlFloat(data) {
    		if (data === null) return false;
    		if (!YAML_FLOAT_PATTERN.test(data)) return false;
    		if (Number.isFinite(parseFloat(data, 10))) return true;
    		return YAML_FLOAT_SPECIAL_PATTERN.test(data);
    	}
    	function constructYamlFloat(data) {
    		let value = data.toLowerCase();
    		const sign = value[0] === "-" ? -1 : 1;
    		if ("+-".indexOf(value[0]) >= 0) value = value.slice(1);
    		if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    		else if (value === ".nan") return NaN;
    		return sign * parseFloat(value, 10);
    	}
    	var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    	function representYamlFloat(object, style) {
    		if (isNaN(object)) switch (style) {
    			case "lowercase": return ".nan";
    			case "uppercase": return ".NAN";
    			case "camelcase": return ".NaN";
    		}
    		else if (Number.POSITIVE_INFINITY === object) switch (style) {
    			case "lowercase": return ".inf";
    			case "uppercase": return ".INF";
    			case "camelcase": return ".Inf";
    		}
    		else if (Number.NEGATIVE_INFINITY === object) switch (style) {
    			case "lowercase": return "-.inf";
    			case "uppercase": return "-.INF";
    			case "camelcase": return "-.Inf";
    		}
    		else if (common.isNegativeZero(object)) return "-0.0";
    		const res = object.toString(10);
    		return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    	}
    	function isFloat(object) {
    		return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    	}
    	module.exports = new Type("tag:yaml.org,2002:float", {
    		kind: "scalar",
    		resolve: resolveYamlFloat,
    		construct: constructYamlFloat,
    		predicate: isFloat,
    		represent: representYamlFloat,
    		defaultStyle: "lowercase"
    	});
    }));
    //#endregion
    //#region lib/schema/json.js
    var require_json = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	module.exports = require_failsafe().extend({ implicit: [
    		require_null(),
    		require_bool(),
    		require_int(),
    		require_float()
    	] });
    }));
    //#endregion
    //#region lib/schema/core.js
    var require_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	module.exports = require_json();
    }));
    //#endregion
    //#region lib/type/timestamp.js
    var require_timestamp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var Type = require_type();
    	var YAML_DATE_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
    	var YAML_TIMESTAMP_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
    	function resolveYamlTimestamp(data) {
    		if (data === null) return false;
    		if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    		if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    		return false;
    	}
    	function constructYamlTimestamp(data) {
    		let fraction = 0;
    		let delta = null;
    		let match = YAML_DATE_REGEXP.exec(data);
    		if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
    		if (match === null) throw new Error("Date resolve error");
    		const year = +match[1];
    		const month = +match[2] - 1;
    		const day = +match[3];
    		if (!match[4]) return new Date(Date.UTC(year, month, day));
    		const hour = +match[4];
    		const minute = +match[5];
    		const second = +match[6];
    		if (match[7]) {
    			fraction = match[7].slice(0, 3);
    			while (fraction.length < 3) fraction += "0";
    			fraction = +fraction;
    		}
    		if (match[9]) {
    			const tzHour = +match[10];
    			const tzMinute = +(match[11] || 0);
    			delta = (tzHour * 60 + tzMinute) * 6e4;
    			if (match[9] === "-") delta = -delta;
    		}
    		const date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    		if (delta) date.setTime(date.getTime() - delta);
    		return date;
    	}
    	function representYamlTimestamp(object) {
    		return object.toISOString();
    	}
    	module.exports = new Type("tag:yaml.org,2002:timestamp", {
    		kind: "scalar",
    		resolve: resolveYamlTimestamp,
    		construct: constructYamlTimestamp,
    		instanceOf: Date,
    		represent: representYamlTimestamp
    	});
    }));
    //#endregion
    //#region lib/type/merge.js
    var require_merge = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var Type = require_type();
    	function resolveYamlMerge(data) {
    		return data === "<<" || data === null;
    	}
    	module.exports = new Type("tag:yaml.org,2002:merge", {
    		kind: "scalar",
    		resolve: resolveYamlMerge
    	});
    }));
    //#endregion
    //#region lib/type/binary.js
    var require_binary = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var Type = require_type();
    	var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    	function resolveYamlBinary(data) {
    		if (data === null) return false;
    		let bitlen = 0;
    		const max = data.length;
    		const map = BASE64_MAP;
    		for (let idx = 0; idx < max; idx++) {
    			const code = map.indexOf(data.charAt(idx));
    			if (code > 64) continue;
    			if (code < 0) return false;
    			bitlen += 6;
    		}
    		return bitlen % 8 === 0;
    	}
    	function constructYamlBinary(data) {
    		const input = data.replace(/[\r\n=]/g, "");
    		const max = input.length;
    		const map = BASE64_MAP;
    		let bits = 0;
    		const result = [];
    		for (let idx = 0; idx < max; idx++) {
    			if (idx % 4 === 0 && idx) {
    				result.push(bits >> 16 & 255);
    				result.push(bits >> 8 & 255);
    				result.push(bits & 255);
    			}
    			bits = bits << 6 | map.indexOf(input.charAt(idx));
    		}
    		const tailbits = max % 4 * 6;
    		if (tailbits === 0) {
    			result.push(bits >> 16 & 255);
    			result.push(bits >> 8 & 255);
    			result.push(bits & 255);
    		} else if (tailbits === 18) {
    			result.push(bits >> 10 & 255);
    			result.push(bits >> 2 & 255);
    		} else if (tailbits === 12) result.push(bits >> 4 & 255);
    		return new Uint8Array(result);
    	}
    	function representYamlBinary(object) {
    		let result = "";
    		let bits = 0;
    		const max = object.length;
    		const map = BASE64_MAP;
    		for (let idx = 0; idx < max; idx++) {
    			if (idx % 3 === 0 && idx) {
    				result += map[bits >> 18 & 63];
    				result += map[bits >> 12 & 63];
    				result += map[bits >> 6 & 63];
    				result += map[bits & 63];
    			}
    			bits = (bits << 8) + object[idx];
    		}
    		const tail = max % 3;
    		if (tail === 0) {
    			result += map[bits >> 18 & 63];
    			result += map[bits >> 12 & 63];
    			result += map[bits >> 6 & 63];
    			result += map[bits & 63];
    		} else if (tail === 2) {
    			result += map[bits >> 10 & 63];
    			result += map[bits >> 4 & 63];
    			result += map[bits << 2 & 63];
    			result += map[64];
    		} else if (tail === 1) {
    			result += map[bits >> 2 & 63];
    			result += map[bits << 4 & 63];
    			result += map[64];
    			result += map[64];
    		}
    		return result;
    	}
    	function isBinary(obj) {
    		return Object.prototype.toString.call(obj) === "[object Uint8Array]";
    	}
    	module.exports = new Type("tag:yaml.org,2002:binary", {
    		kind: "scalar",
    		resolve: resolveYamlBinary,
    		construct: constructYamlBinary,
    		predicate: isBinary,
    		represent: representYamlBinary
    	});
    }));
    //#endregion
    //#region lib/type/omap.js
    var require_omap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var Type = require_type();
    	var _hasOwnProperty = Object.prototype.hasOwnProperty;
    	var _toString = Object.prototype.toString;
    	function resolveYamlOmap(data) {
    		if (data === null) return true;
    		const objectKeys = [];
    		const object = data;
    		for (let index = 0, length = object.length; index < length; index += 1) {
    			const pair = object[index];
    			let pairHasKey = false;
    			if (_toString.call(pair) !== "[object Object]") return false;
    			let pairKey;
    			for (pairKey in pair) if (_hasOwnProperty.call(pair, pairKey)) if (!pairHasKey) pairHasKey = true;
    			else return false;
    			if (!pairHasKey) return false;
    			if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    			else return false;
    		}
    		return true;
    	}
    	function constructYamlOmap(data) {
    		return data !== null ? data : [];
    	}
    	module.exports = new Type("tag:yaml.org,2002:omap", {
    		kind: "sequence",
    		resolve: resolveYamlOmap,
    		construct: constructYamlOmap
    	});
    }));
    //#endregion
    //#region lib/type/pairs.js
    var require_pairs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var Type = require_type();
    	var _toString = Object.prototype.toString;
    	function resolveYamlPairs(data) {
    		if (data === null) return true;
    		const object = data;
    		const result = new Array(object.length);
    		for (let index = 0, length = object.length; index < length; index += 1) {
    			const pair = object[index];
    			if (_toString.call(pair) !== "[object Object]") return false;
    			const keys = Object.keys(pair);
    			if (keys.length !== 1) return false;
    			result[index] = [keys[0], pair[keys[0]]];
    		}
    		return true;
    	}
    	function constructYamlPairs(data) {
    		if (data === null) return [];
    		const object = data;
    		const result = new Array(object.length);
    		for (let index = 0, length = object.length; index < length; index += 1) {
    			const pair = object[index];
    			const keys = Object.keys(pair);
    			result[index] = [keys[0], pair[keys[0]]];
    		}
    		return result;
    	}
    	module.exports = new Type("tag:yaml.org,2002:pairs", {
    		kind: "sequence",
    		resolve: resolveYamlPairs,
    		construct: constructYamlPairs
    	});
    }));
    //#endregion
    //#region lib/type/set.js
    var require_set = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var Type = require_type();
    	var _hasOwnProperty = Object.prototype.hasOwnProperty;
    	function resolveYamlSet(data) {
    		if (data === null) return true;
    		const object = data;
    		for (const key in object) if (_hasOwnProperty.call(object, key)) {
    			if (object[key] !== null) return false;
    		}
    		return true;
    	}
    	function constructYamlSet(data) {
    		return data !== null ? data : {};
    	}
    	module.exports = new Type("tag:yaml.org,2002:set", {
    		kind: "mapping",
    		resolve: resolveYamlSet,
    		construct: constructYamlSet
    	});
    }));
    //#endregion
    //#region lib/schema/default.js
    var require_default = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	module.exports = require_core().extend({
    		implicit: [require_timestamp(), require_merge()],
    		explicit: [
    			require_binary(),
    			require_omap(),
    			require_pairs(),
    			require_set()
    		]
    	});
    }));
    //#endregion
    //#region lib/loader.js
    var require_loader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var common = require_common();
    	var YAMLException = require_exception();
    	var makeSnippet = require_snippet();
    	var DEFAULT_SCHEMA = require_default();
    	var _hasOwnProperty = Object.prototype.hasOwnProperty;
    	var CONTEXT_FLOW_IN = 1;
    	var CONTEXT_FLOW_OUT = 2;
    	var CONTEXT_BLOCK_IN = 3;
    	var CONTEXT_BLOCK_OUT = 4;
    	var CHOMPING_CLIP = 1;
    	var CHOMPING_STRIP = 2;
    	var CHOMPING_KEEP = 3;
    	var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    	var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    	var PATTERN_FLOW_INDICATORS = /[,\[\]{}]/;
    	var PATTERN_TAG_HANDLE = /^(?:!|!!|![0-9A-Za-z-]+!)$/;
    	var PATTERN_TAG_URI = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
    	function _class(obj) {
    		return Object.prototype.toString.call(obj);
    	}
    	function isEol(c) {
    		return c === 10 || c === 13;
    	}
    	function isWhiteSpace(c) {
    		return c === 9 || c === 32;
    	}
    	function isWsOrEol(c) {
    		return c === 9 || c === 32 || c === 10 || c === 13;
    	}
    	function isFlowIndicator(c) {
    		return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    	}
    	function fromHexCode(c) {
    		if (c >= 48 && c <= 57) return c - 48;
    		const lc = c | 32;
    		if (lc >= 97 && lc <= 102) return lc - 97 + 10;
    		return -1;
    	}
    	function escapedHexLen(c) {
    		if (c === 120) return 2;
    		if (c === 117) return 4;
    		if (c === 85) return 8;
    		return 0;
    	}
    	function fromDecimalCode(c) {
    		if (c >= 48 && c <= 57) return c - 48;
    		return -1;
    	}
    	function simpleEscapeSequence(c) {
    		switch (c) {
    			case 48: return "\0";
    			case 97: return "\x07";
    			case 98: return "\b";
    			case 116: return "	";
    			case 9: return "	";
    			case 110: return "\n";
    			case 118: return "\v";
    			case 102: return "\f";
    			case 114: return "\r";
    			case 101: return "\x1B";
    			case 32: return " ";
    			case 34: return "\"";
    			case 47: return "/";
    			case 92: return "\\";
    			case 78: return "";
    			case 95: return "\xA0";
    			case 76: return "\u2028";
    			case 80: return "\u2029";
    			default: return "";
    		}
    	}
    	function charFromCodepoint(c) {
    		if (c <= 65535) return String.fromCharCode(c);
    		return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
    	}
    	function setProperty(object, key, value) {
    		if (key === "__proto__") Object.defineProperty(object, key, {
    			configurable: true,
    			enumerable: true,
    			writable: true,
    			value
    		});
    		else object[key] = value;
    	}
    	var simpleEscapeCheck = new Array(256);
    	var simpleEscapeMap = new Array(256);
    	for (let i = 0; i < 256; i++) {
    		simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    		simpleEscapeMap[i] = simpleEscapeSequence(i);
    	}
    	function State(input, options) {
    		this.input = input;
    		this.filename = options["filename"] || null;
    		this.schema = options["schema"] || DEFAULT_SCHEMA;
    		this.onWarning = options["onWarning"] || null;
    		this.legacy = options["legacy"] || false;
    		this.json = options["json"] || false;
    		this.listener = options["listener"] || null;
    		this.maxDepth = typeof options["maxDepth"] === "number" ? options["maxDepth"] : 100;
    		this.maxMergeSeqLength = typeof options["maxMergeSeqLength"] === "number" ? options["maxMergeSeqLength"] : 20;
    		this.implicitTypes = this.schema.compiledImplicit;
    		this.typeMap = this.schema.compiledTypeMap;
    		this.length = input.length;
    		this.position = 0;
    		this.line = 0;
    		this.lineStart = 0;
    		this.lineIndent = 0;
    		this.depth = 0;
    		this.firstTabInLine = -1;
    		this.documents = [];
    		this.anchorMapTransactions = [];
    	}
    	function generateError(state, message) {
    		const mark = {
    			name: state.filename,
    			buffer: state.input.slice(0, -1),
    			position: state.position,
    			line: state.line,
    			column: state.position - state.lineStart
    		};
    		mark.snippet = makeSnippet(mark);
    		return new YAMLException(message, mark);
    	}
    	function throwError(state, message) {
    		throw generateError(state, message);
    	}
    	function throwWarning(state, message) {
    		if (state.onWarning) state.onWarning.call(null, generateError(state, message));
    	}
    	function storeAnchor(state, name, value) {
    		const transactions = state.anchorMapTransactions;
    		if (transactions.length !== 0) {
    			const transaction = transactions[transactions.length - 1];
    			if (!_hasOwnProperty.call(transaction, name)) transaction[name] = {
    				existed: _hasOwnProperty.call(state.anchorMap, name),
    				value: state.anchorMap[name]
    			};
    		}
    		state.anchorMap[name] = value;
    	}
    	function beginAnchorTransaction(state) {
    		state.anchorMapTransactions.push(Object.create(null));
    	}
    	function commitAnchorTransaction(state) {
    		const transaction = state.anchorMapTransactions.pop();
    		const transactions = state.anchorMapTransactions;
    		if (transactions.length === 0) return;
    		const parent = transactions[transactions.length - 1];
    		const names = Object.keys(transaction);
    		for (let index = 0, length = names.length; index < length; index += 1) {
    			const name = names[index];
    			if (!_hasOwnProperty.call(parent, name)) parent[name] = transaction[name];
    		}
    	}
    	function rollbackAnchorTransaction(state) {
    		const transaction = state.anchorMapTransactions.pop();
    		const names = Object.keys(transaction);
    		for (let index = names.length - 1; index >= 0; index -= 1) {
    			const entry = transaction[names[index]];
    			if (entry.existed) state.anchorMap[names[index]] = entry.value;
    			else delete state.anchorMap[names[index]];
    		}
    	}
    	function snapshotState(state) {
    		return {
    			position: state.position,
    			line: state.line,
    			lineStart: state.lineStart,
    			lineIndent: state.lineIndent,
    			firstTabInLine: state.firstTabInLine,
    			tag: state.tag,
    			anchor: state.anchor,
    			kind: state.kind,
    			result: state.result
    		};
    	}
    	function restoreState(state, snapshot) {
    		state.position = snapshot.position;
    		state.line = snapshot.line;
    		state.lineStart = snapshot.lineStart;
    		state.lineIndent = snapshot.lineIndent;
    		state.firstTabInLine = snapshot.firstTabInLine;
    		state.tag = snapshot.tag;
    		state.anchor = snapshot.anchor;
    		state.kind = snapshot.kind;
    		state.result = snapshot.result;
    	}
    	var directiveHandlers = {
    		YAML: function handleYamlDirective(state, name, args) {
    			if (state.version !== null) throwError(state, "duplication of %YAML directive");
    			if (args.length !== 1) throwError(state, "YAML directive accepts exactly one argument");
    			const match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    			if (match === null) throwError(state, "ill-formed argument of the YAML directive");
    			const major = parseInt(match[1], 10);
    			const minor = parseInt(match[2], 10);
    			if (major !== 1) throwError(state, "unacceptable YAML version of the document");
    			state.version = args[0];
    			state.checkLineBreaks = minor < 2;
    			if (minor !== 1 && minor !== 2) throwWarning(state, "unsupported YAML version of the document");
    		},
    		TAG: function handleTagDirective(state, name, args) {
    			let prefix;
    			if (args.length !== 2) throwError(state, "TAG directive accepts exactly two arguments");
    			const handle = args[0];
    			prefix = args[1];
    			if (!PATTERN_TAG_HANDLE.test(handle)) throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    			if (_hasOwnProperty.call(state.tagMap, handle)) throwError(state, "there is a previously declared suffix for \"" + handle + "\" tag handle");
    			if (!PATTERN_TAG_URI.test(prefix)) throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    			try {
    				prefix = decodeURIComponent(prefix);
    			} catch (err) {
    				throwError(state, "tag prefix is malformed: " + prefix);
    			}
    			state.tagMap[handle] = prefix;
    		}
    	};
    	function captureSegment(state, start, end, checkJson) {
    		if (start < end) {
    			const _result = state.input.slice(start, end);
    			if (checkJson) for (let _position = 0, _length = _result.length; _position < _length; _position += 1) {
    				const _character = _result.charCodeAt(_position);
    				if (!(_character === 9 || _character >= 32 && _character <= 1114111)) throwError(state, "expected valid JSON character");
    			}
    			else if (PATTERN_NON_PRINTABLE.test(_result)) throwError(state, "the stream contains non-printable characters");
    			state.result += _result;
    		}
    	}
    	function mergeMappings(state, destination, source, overridableKeys) {
    		if (!common.isObject(source)) throwError(state, "cannot merge mappings; the provided source object is unacceptable");
    		const sourceKeys = Object.keys(source);
    		for (let index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    			const key = sourceKeys[index];
    			if (!_hasOwnProperty.call(destination, key)) {
    				setProperty(destination, key, source[key]);
    				overridableKeys[key] = true;
    			}
    		}
    	}
    	function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
    		if (Array.isArray(keyNode)) {
    			keyNode = Array.prototype.slice.call(keyNode);
    			for (let index = 0, quantity = keyNode.length; index < quantity; index += 1) {
    				if (Array.isArray(keyNode[index])) throwError(state, "nested arrays are not supported inside keys");
    				if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") keyNode[index] = "[object Object]";
    			}
    		}
    		if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") keyNode = "[object Object]";
    		keyNode = String(keyNode);
    		if (_result === null) _result = {};
    		if (keyTag === "tag:yaml.org,2002:merge") if (Array.isArray(valueNode)) {
    			if (valueNode.length > state.maxMergeSeqLength) throwError(state, "merge sequence length exceeded maxMergeSeqLength (" + state.maxMergeSeqLength + ")");
    			const seen = /* @__PURE__ */ new Set();
    			for (let index = 0, quantity = valueNode.length; index < quantity; index += 1) {
    				const src = valueNode[index];
    				if (seen.has(src)) continue;
    				seen.add(src);
    				mergeMappings(state, _result, src, overridableKeys);
    			}
    		} else mergeMappings(state, _result, valueNode, overridableKeys);
    		else {
    			if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
    				state.line = startLine || state.line;
    				state.lineStart = startLineStart || state.lineStart;
    				state.position = startPos || state.position;
    				throwError(state, "duplicated mapping key");
    			}
    			setProperty(_result, keyNode, valueNode);
    			delete overridableKeys[keyNode];
    		}
    		return _result;
    	}
    	function readLineBreak(state) {
    		const ch = state.input.charCodeAt(state.position);
    		if (ch === 10) state.position++;
    		else if (ch === 13) {
    			state.position++;
    			if (state.input.charCodeAt(state.position) === 10) state.position++;
    		} else throwError(state, "a line break is expected");
    		state.line += 1;
    		state.lineStart = state.position;
    		state.firstTabInLine = -1;
    	}
    	function skipSeparationSpace(state, allowComments, checkIndent) {
    		let lineBreaks = 0;
    		let ch = state.input.charCodeAt(state.position);
    		while (ch !== 0) {
    			while (isWhiteSpace(ch)) {
    				if (ch === 9 && state.firstTabInLine === -1) state.firstTabInLine = state.position;
    				ch = state.input.charCodeAt(++state.position);
    			}
    			if (allowComments && ch === 35) do
    				ch = state.input.charCodeAt(++state.position);
    			while (ch !== 10 && ch !== 13 && ch !== 0);
    			if (isEol(ch)) {
    				readLineBreak(state);
    				ch = state.input.charCodeAt(state.position);
    				lineBreaks++;
    				state.lineIndent = 0;
    				while (ch === 32) {
    					state.lineIndent++;
    					ch = state.input.charCodeAt(++state.position);
    				}
    			} else break;
    		}
    		if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) throwWarning(state, "deficient indentation");
    		return lineBreaks;
    	}
    	function testDocumentSeparator(state) {
    		let _position = state.position;
    		let ch = state.input.charCodeAt(_position);
    		if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    			_position += 3;
    			ch = state.input.charCodeAt(_position);
    			if (ch === 0 || isWsOrEol(ch)) return true;
    		}
    		return false;
    	}
    	function writeFoldedLines(state, count) {
    		if (count === 1) state.result += " ";
    		else if (count > 1) state.result += common.repeat("\n", count - 1);
    	}
    	function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    		let captureStart;
    		let captureEnd;
    		let hasPendingContent;
    		let _line;
    		let _lineStart;
    		let _lineIndent;
    		const _kind = state.kind;
    		const _result = state.result;
    		let ch = state.input.charCodeAt(state.position);
    		if (isWsOrEol(ch) || isFlowIndicator(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) return false;
    		if (ch === 63 || ch === 45) {
    			const following = state.input.charCodeAt(state.position + 1);
    			if (isWsOrEol(following) || withinFlowCollection && isFlowIndicator(following)) return false;
    		}
    		state.kind = "scalar";
    		state.result = "";
    		captureStart = captureEnd = state.position;
    		hasPendingContent = false;
    		while (ch !== 0) {
    			if (ch === 58) {
    				const following = state.input.charCodeAt(state.position + 1);
    				if (isWsOrEol(following) || withinFlowCollection && isFlowIndicator(following)) break;
    			} else if (ch === 35) {
    				if (isWsOrEol(state.input.charCodeAt(state.position - 1))) break;
    			} else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && isFlowIndicator(ch)) break;
    			else if (isEol(ch)) {
    				_line = state.line;
    				_lineStart = state.lineStart;
    				_lineIndent = state.lineIndent;
    				skipSeparationSpace(state, false, -1);
    				if (state.lineIndent >= nodeIndent) {
    					hasPendingContent = true;
    					ch = state.input.charCodeAt(state.position);
    					continue;
    				} else {
    					state.position = captureEnd;
    					state.line = _line;
    					state.lineStart = _lineStart;
    					state.lineIndent = _lineIndent;
    					break;
    				}
    			}
    			if (hasPendingContent) {
    				captureSegment(state, captureStart, captureEnd, false);
    				writeFoldedLines(state, state.line - _line);
    				captureStart = captureEnd = state.position;
    				hasPendingContent = false;
    			}
    			if (!isWhiteSpace(ch)) captureEnd = state.position + 1;
    			ch = state.input.charCodeAt(++state.position);
    		}
    		captureSegment(state, captureStart, captureEnd, false);
    		if (state.result) return true;
    		state.kind = _kind;
    		state.result = _result;
    		return false;
    	}
    	function readSingleQuotedScalar(state, nodeIndent) {
    		let captureStart;
    		let captureEnd;
    		let ch = state.input.charCodeAt(state.position);
    		if (ch !== 39) return false;
    		state.kind = "scalar";
    		state.result = "";
    		state.position++;
    		captureStart = captureEnd = state.position;
    		while ((ch = state.input.charCodeAt(state.position)) !== 0) if (ch === 39) {
    			captureSegment(state, captureStart, state.position, true);
    			ch = state.input.charCodeAt(++state.position);
    			if (ch === 39) {
    				captureStart = state.position;
    				state.position++;
    				captureEnd = state.position;
    			} else return true;
    		} else if (isEol(ch)) {
    			captureSegment(state, captureStart, captureEnd, true);
    			writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
    			captureStart = captureEnd = state.position;
    		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a single quoted scalar");
    		else {
    			state.position++;
    			if (!isWhiteSpace(ch)) captureEnd = state.position;
    		}
    		throwError(state, "unexpected end of the stream within a single quoted scalar");
    	}
    	function readDoubleQuotedScalar(state, nodeIndent) {
    		let captureStart;
    		let captureEnd;
    		let tmp;
    		let ch = state.input.charCodeAt(state.position);
    		if (ch !== 34) return false;
    		state.kind = "scalar";
    		state.result = "";
    		state.position++;
    		captureStart = captureEnd = state.position;
    		while ((ch = state.input.charCodeAt(state.position)) !== 0) if (ch === 34) {
    			captureSegment(state, captureStart, state.position, true);
    			state.position++;
    			return true;
    		} else if (ch === 92) {
    			captureSegment(state, captureStart, state.position, true);
    			ch = state.input.charCodeAt(++state.position);
    			if (isEol(ch)) skipSeparationSpace(state, false, nodeIndent);
    			else if (ch < 256 && simpleEscapeCheck[ch]) {
    				state.result += simpleEscapeMap[ch];
    				state.position++;
    			} else if ((tmp = escapedHexLen(ch)) > 0) {
    				let hexLength = tmp;
    				let hexResult = 0;
    				for (; hexLength > 0; hexLength--) {
    					ch = state.input.charCodeAt(++state.position);
    					if ((tmp = fromHexCode(ch)) >= 0) hexResult = (hexResult << 4) + tmp;
    					else throwError(state, "expected hexadecimal character");
    				}
    				state.result += charFromCodepoint(hexResult);
    				state.position++;
    			} else throwError(state, "unknown escape sequence");
    			captureStart = captureEnd = state.position;
    		} else if (isEol(ch)) {
    			captureSegment(state, captureStart, captureEnd, true);
    			writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
    			captureStart = captureEnd = state.position;
    		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a double quoted scalar");
    		else {
    			state.position++;
    			if (!isWhiteSpace(ch)) captureEnd = state.position;
    		}
    		throwError(state, "unexpected end of the stream within a double quoted scalar");
    	}
    	function readFlowCollection(state, nodeIndent) {
    		let readNext = true;
    		let _line;
    		let _lineStart;
    		let _pos;
    		const _tag = state.tag;
    		let _result;
    		const _anchor = state.anchor;
    		let terminator;
    		let isPair;
    		let isExplicitPair;
    		let isMapping;
    		const overridableKeys = Object.create(null);
    		let keyNode;
    		let keyTag;
    		let valueNode;
    		let ch = state.input.charCodeAt(state.position);
    		if (ch === 91) {
    			terminator = 93;
    			isMapping = false;
    			_result = [];
    		} else if (ch === 123) {
    			terminator = 125;
    			isMapping = true;
    			_result = {};
    		} else return false;
    		if (state.anchor !== null) storeAnchor(state, state.anchor, _result);
    		ch = state.input.charCodeAt(++state.position);
    		while (ch !== 0) {
    			skipSeparationSpace(state, true, nodeIndent);
    			ch = state.input.charCodeAt(state.position);
    			if (ch === terminator) {
    				state.position++;
    				state.tag = _tag;
    				state.anchor = _anchor;
    				state.kind = isMapping ? "mapping" : "sequence";
    				state.result = _result;
    				return true;
    			} else if (!readNext) throwError(state, "missed comma between flow collection entries");
    			else if (ch === 44) throwError(state, "expected the node content, but found ','");
    			keyTag = keyNode = valueNode = null;
    			isPair = isExplicitPair = false;
    			if (ch === 63) {
    				if (isWsOrEol(state.input.charCodeAt(state.position + 1))) {
    					isPair = isExplicitPair = true;
    					state.position++;
    					skipSeparationSpace(state, true, nodeIndent);
    				}
    			}
    			_line = state.line;
    			_lineStart = state.lineStart;
    			_pos = state.position;
    			composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    			keyTag = state.tag;
    			keyNode = state.result;
    			skipSeparationSpace(state, true, nodeIndent);
    			ch = state.input.charCodeAt(state.position);
    			if ((isExplicitPair || state.line === _line) && ch === 58) {
    				isPair = true;
    				ch = state.input.charCodeAt(++state.position);
    				skipSeparationSpace(state, true, nodeIndent);
    				composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    				valueNode = state.result;
    			}
    			if (isMapping) storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    			else if (isPair) _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    			else _result.push(keyNode);
    			skipSeparationSpace(state, true, nodeIndent);
    			ch = state.input.charCodeAt(state.position);
    			if (ch === 44) {
    				readNext = true;
    				ch = state.input.charCodeAt(++state.position);
    			} else readNext = false;
    		}
    		throwError(state, "unexpected end of the stream within a flow collection");
    	}
    	function readBlockScalar(state, nodeIndent) {
    		let folding;
    		let chomping = CHOMPING_CLIP;
    		let didReadContent = false;
    		let detectedIndent = false;
    		let textIndent = nodeIndent;
    		let emptyLines = 0;
    		let atMoreIndented = false;
    		let tmp;
    		let ch = state.input.charCodeAt(state.position);
    		if (ch === 124) folding = false;
    		else if (ch === 62) folding = true;
    		else return false;
    		state.kind = "scalar";
    		state.result = "";
    		while (ch !== 0) {
    			ch = state.input.charCodeAt(++state.position);
    			if (ch === 43 || ch === 45) if (CHOMPING_CLIP === chomping) chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
    			else throwError(state, "repeat of a chomping mode identifier");
    			else if ((tmp = fromDecimalCode(ch)) >= 0) if (tmp === 0) throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
    			else if (!detectedIndent) {
    				textIndent = nodeIndent + tmp - 1;
    				detectedIndent = true;
    			} else throwError(state, "repeat of an indentation width identifier");
    			else break;
    		}
    		if (isWhiteSpace(ch)) {
    			do
    				ch = state.input.charCodeAt(++state.position);
    			while (isWhiteSpace(ch));
    			if (ch === 35) do
    				ch = state.input.charCodeAt(++state.position);
    			while (!isEol(ch) && ch !== 0);
    		}
    		while (ch !== 0) {
    			readLineBreak(state);
    			state.lineIndent = 0;
    			ch = state.input.charCodeAt(state.position);
    			while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
    				state.lineIndent++;
    				ch = state.input.charCodeAt(++state.position);
    			}
    			if (!detectedIndent && state.lineIndent > textIndent) textIndent = state.lineIndent;
    			if (isEol(ch)) {
    				emptyLines++;
    				continue;
    			}
    			if (!detectedIndent && textIndent === 0) throwError(state, "missing indentation for block scalar");
    			if (state.lineIndent < textIndent) {
    				if (chomping === CHOMPING_KEEP) state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    				else if (chomping === CHOMPING_CLIP) {
    					if (didReadContent) state.result += "\n";
    				}
    				break;
    			}
    			if (folding) if (isWhiteSpace(ch)) {
    				atMoreIndented = true;
    				state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    			} else if (atMoreIndented) {
    				atMoreIndented = false;
    				state.result += common.repeat("\n", emptyLines + 1);
    			} else if (emptyLines === 0) {
    				if (didReadContent) state.result += " ";
    			} else state.result += common.repeat("\n", emptyLines);
    			else state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    			didReadContent = true;
    			detectedIndent = true;
    			emptyLines = 0;
    			const captureStart = state.position;
    			while (!isEol(ch) && ch !== 0) ch = state.input.charCodeAt(++state.position);
    			captureSegment(state, captureStart, state.position, false);
    		}
    		return true;
    	}
    	function readBlockSequence(state, nodeIndent) {
    		const _tag = state.tag;
    		const _anchor = state.anchor;
    		const _result = [];
    		let detected = false;
    		if (state.firstTabInLine !== -1) return false;
    		if (state.anchor !== null) storeAnchor(state, state.anchor, _result);
    		let ch = state.input.charCodeAt(state.position);
    		while (ch !== 0) {
    			if (state.firstTabInLine !== -1) {
    				state.position = state.firstTabInLine;
    				throwError(state, "tab characters must not be used in indentation");
    			}
    			if (ch !== 45) break;
    			if (!isWsOrEol(state.input.charCodeAt(state.position + 1))) break;
    			detected = true;
    			state.position++;
    			if (skipSeparationSpace(state, true, -1)) {
    				if (state.lineIndent <= nodeIndent) {
    					_result.push(null);
    					ch = state.input.charCodeAt(state.position);
    					continue;
    				}
    			}
    			const _line = state.line;
    			composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    			_result.push(state.result);
    			skipSeparationSpace(state, true, -1);
    			ch = state.input.charCodeAt(state.position);
    			if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) throwError(state, "bad indentation of a sequence entry");
    			else if (state.lineIndent < nodeIndent) break;
    		}
    		if (detected) {
    			state.tag = _tag;
    			state.anchor = _anchor;
    			state.kind = "sequence";
    			state.result = _result;
    			return true;
    		}
    		return false;
    	}
    	function readBlockMapping(state, nodeIndent, flowIndent) {
    		let allowCompact;
    		let _keyLine;
    		let _keyLineStart;
    		let _keyPos;
    		const _tag = state.tag;
    		const _anchor = state.anchor;
    		const _result = {};
    		const overridableKeys = Object.create(null);
    		let keyTag = null;
    		let keyNode = null;
    		let valueNode = null;
    		let atExplicitKey = false;
    		let detected = false;
    		if (state.firstTabInLine !== -1) return false;
    		if (state.anchor !== null) storeAnchor(state, state.anchor, _result);
    		let ch = state.input.charCodeAt(state.position);
    		while (ch !== 0) {
    			if (!atExplicitKey && state.firstTabInLine !== -1) {
    				state.position = state.firstTabInLine;
    				throwError(state, "tab characters must not be used in indentation");
    			}
    			const following = state.input.charCodeAt(state.position + 1);
    			const _line = state.line;
    			if ((ch === 63 || ch === 58) && isWsOrEol(following)) {
    				if (ch === 63) {
    					if (atExplicitKey) {
    						storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    						keyTag = keyNode = valueNode = null;
    					}
    					detected = true;
    					atExplicitKey = true;
    					allowCompact = true;
    				} else if (atExplicitKey) {
    					atExplicitKey = false;
    					allowCompact = true;
    				} else throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
    				state.position += 1;
    				ch = following;
    			} else {
    				_keyLine = state.line;
    				_keyLineStart = state.lineStart;
    				_keyPos = state.position;
    				if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) break;
    				if (state.line === _line) {
    					ch = state.input.charCodeAt(state.position);
    					while (isWhiteSpace(ch)) ch = state.input.charCodeAt(++state.position);
    					if (ch === 58) {
    						ch = state.input.charCodeAt(++state.position);
    						if (!isWsOrEol(ch)) throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
    						if (atExplicitKey) {
    							storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    							keyTag = keyNode = valueNode = null;
    						}
    						detected = true;
    						atExplicitKey = false;
    						allowCompact = false;
    						keyTag = state.tag;
    						keyNode = state.result;
    					} else if (detected) throwError(state, "can not read an implicit mapping pair; a colon is missed");
    					else {
    						state.tag = _tag;
    						state.anchor = _anchor;
    						return true;
    					}
    				} else if (detected) throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
    				else {
    					state.tag = _tag;
    					state.anchor = _anchor;
    					return true;
    				}
    			}
    			if (state.line === _line || state.lineIndent > nodeIndent) {
    				if (atExplicitKey) {
    					_keyLine = state.line;
    					_keyLineStart = state.lineStart;
    					_keyPos = state.position;
    				}
    				if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) if (atExplicitKey) keyNode = state.result;
    				else valueNode = state.result;
    				if (!atExplicitKey) {
    					storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
    					keyTag = keyNode = valueNode = null;
    				}
    				skipSeparationSpace(state, true, -1);
    				ch = state.input.charCodeAt(state.position);
    			}
    			if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) throwError(state, "bad indentation of a mapping entry");
    			else if (state.lineIndent < nodeIndent) break;
    		}
    		if (atExplicitKey) storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    		if (detected) {
    			state.tag = _tag;
    			state.anchor = _anchor;
    			state.kind = "mapping";
    			state.result = _result;
    		}
    		return detected;
    	}
    	function readTagProperty(state) {
    		let isVerbatim = false;
    		let isNamed = false;
    		let tagHandle;
    		let tagName;
    		let ch = state.input.charCodeAt(state.position);
    		if (ch !== 33) return false;
    		if (state.tag !== null) throwError(state, "duplication of a tag property");
    		ch = state.input.charCodeAt(++state.position);
    		if (ch === 60) {
    			isVerbatim = true;
    			ch = state.input.charCodeAt(++state.position);
    		} else if (ch === 33) {
    			isNamed = true;
    			tagHandle = "!!";
    			ch = state.input.charCodeAt(++state.position);
    		} else tagHandle = "!";
    		let _position = state.position;
    		if (isVerbatim) {
    			do
    				ch = state.input.charCodeAt(++state.position);
    			while (ch !== 0 && ch !== 62);
    			if (state.position < state.length) {
    				tagName = state.input.slice(_position, state.position);
    				ch = state.input.charCodeAt(++state.position);
    			} else throwError(state, "unexpected end of the stream within a verbatim tag");
    		} else {
    			while (ch !== 0 && !isWsOrEol(ch)) {
    				if (ch === 33) if (!isNamed) {
    					tagHandle = state.input.slice(_position - 1, state.position + 1);
    					if (!PATTERN_TAG_HANDLE.test(tagHandle)) throwError(state, "named tag handle cannot contain such characters");
    					isNamed = true;
    					_position = state.position + 1;
    				} else throwError(state, "tag suffix cannot contain exclamation marks");
    				ch = state.input.charCodeAt(++state.position);
    			}
    			tagName = state.input.slice(_position, state.position);
    			if (PATTERN_FLOW_INDICATORS.test(tagName)) throwError(state, "tag suffix cannot contain flow indicator characters");
    		}
    		if (tagName && !PATTERN_TAG_URI.test(tagName)) throwError(state, "tag name cannot contain such characters: " + tagName);
    		try {
    			tagName = decodeURIComponent(tagName);
    		} catch (err) {
    			throwError(state, "tag name is malformed: " + tagName);
    		}
    		if (isVerbatim) state.tag = tagName;
    		else if (_hasOwnProperty.call(state.tagMap, tagHandle)) state.tag = state.tagMap[tagHandle] + tagName;
    		else if (tagHandle === "!") state.tag = "!" + tagName;
    		else if (tagHandle === "!!") state.tag = "tag:yaml.org,2002:" + tagName;
    		else throwError(state, "undeclared tag handle \"" + tagHandle + "\"");
    		return true;
    	}
    	function readAnchorProperty(state) {
    		let ch = state.input.charCodeAt(state.position);
    		if (ch !== 38) return false;
    		if (state.anchor !== null) throwError(state, "duplication of an anchor property");
    		ch = state.input.charCodeAt(++state.position);
    		const _position = state.position;
    		while (ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)) ch = state.input.charCodeAt(++state.position);
    		if (state.position === _position) throwError(state, "name of an anchor node must contain at least one character");
    		state.anchor = state.input.slice(_position, state.position);
    		return true;
    	}
    	function readAlias(state) {
    		let ch = state.input.charCodeAt(state.position);
    		if (ch !== 42) return false;
    		ch = state.input.charCodeAt(++state.position);
    		const _position = state.position;
    		while (ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)) ch = state.input.charCodeAt(++state.position);
    		if (state.position === _position) throwError(state, "name of an alias node must contain at least one character");
    		const alias = state.input.slice(_position, state.position);
    		if (!_hasOwnProperty.call(state.anchorMap, alias)) throwError(state, "unidentified alias \"" + alias + "\"");
    		state.result = state.anchorMap[alias];
    		skipSeparationSpace(state, true, -1);
    		return true;
    	}
    	function tryReadBlockMappingFromProperty(state, propertyStart, nodeIndent, flowIndent) {
    		const fallbackState = snapshotState(state);
    		beginAnchorTransaction(state);
    		restoreState(state, propertyStart);
    		state.tag = null;
    		state.anchor = null;
    		state.kind = null;
    		state.result = null;
    		if (readBlockMapping(state, nodeIndent, flowIndent) && state.kind === "mapping") {
    			commitAnchorTransaction(state);
    			return true;
    		}
    		rollbackAnchorTransaction(state);
    		restoreState(state, fallbackState);
    		return false;
    	}
    	function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    		let allowBlockScalars;
    		let allowBlockCollections;
    		let indentStatus = 1;
    		let atNewLine = false;
    		let hasContent = false;
    		let propertyStart = null;
    		let type;
    		let flowIndent;
    		let blockIndent;
    		if (state.depth >= state.maxDepth) throwError(state, "nesting exceeded maxDepth (" + state.maxDepth + ")");
    		state.depth += 1;
    		if (state.listener !== null) state.listener("open", state);
    		state.tag = null;
    		state.anchor = null;
    		state.kind = null;
    		state.result = null;
    		const allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    		if (allowToSeek) {
    			if (skipSeparationSpace(state, true, -1)) {
    				atNewLine = true;
    				if (state.lineIndent > parentIndent) indentStatus = 1;
    				else if (state.lineIndent === parentIndent) indentStatus = 0;
    				else if (state.lineIndent < parentIndent) indentStatus = -1;
    			}
    		}
    		if (indentStatus === 1) while (true) {
    			const ch = state.input.charCodeAt(state.position);
    			const propertyState = snapshotState(state);
    			if (atNewLine && (ch === 33 && state.tag !== null || ch === 38 && state.anchor !== null)) break;
    			if (!readTagProperty(state) && !readAnchorProperty(state)) break;
    			if (propertyStart === null) propertyStart = propertyState;
    			if (skipSeparationSpace(state, true, -1)) {
    				atNewLine = true;
    				allowBlockCollections = allowBlockStyles;
    				if (state.lineIndent > parentIndent) indentStatus = 1;
    				else if (state.lineIndent === parentIndent) indentStatus = 0;
    				else if (state.lineIndent < parentIndent) indentStatus = -1;
    			} else allowBlockCollections = false;
    		}
    		if (allowBlockCollections) allowBlockCollections = atNewLine || allowCompact;
    		if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    			if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) flowIndent = parentIndent;
    			else flowIndent = parentIndent + 1;
    			blockIndent = state.position - state.lineStart;
    			if (indentStatus === 1) if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) hasContent = true;
    			else {
    				const ch = state.input.charCodeAt(state.position);
    				if (propertyStart !== null && allowBlockStyles && !allowBlockCollections && ch !== 124 && ch !== 62 && tryReadBlockMappingFromProperty(state, propertyStart, propertyStart.position - propertyStart.lineStart, flowIndent)) hasContent = true;
    				else if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) hasContent = true;
    				else if (readAlias(state)) {
    					hasContent = true;
    					if (state.tag !== null || state.anchor !== null) throwError(state, "alias node should not have any properties");
    				} else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
    					hasContent = true;
    					if (state.tag === null) state.tag = "?";
    				}
    				if (state.anchor !== null) storeAnchor(state, state.anchor, state.result);
    			}
    			else if (indentStatus === 0) hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    		}
    		if (state.tag === null) {
    			if (state.anchor !== null) storeAnchor(state, state.anchor, state.result);
    		} else if (state.tag === "?") {
    			if (state.result !== null && state.kind !== "scalar") throwError(state, "unacceptable node kind for !<?> tag; it should be \"scalar\", not \"" + state.kind + "\"");
    			for (let typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
    				type = state.implicitTypes[typeIndex];
    				if (type.resolve(state.result)) {
    					state.result = type.construct(state.result);
    					state.tag = type.tag;
    					if (state.anchor !== null) storeAnchor(state, state.anchor, state.result);
    					break;
    				}
    			}
    		} else if (state.tag !== "!") {
    			if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) type = state.typeMap[state.kind || "fallback"][state.tag];
    			else {
    				type = null;
    				const typeList = state.typeMap.multi[state.kind || "fallback"];
    				for (let typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
    					type = typeList[typeIndex];
    					break;
    				}
    			}
    			if (!type) throwError(state, "unknown tag !<" + state.tag + ">");
    			if (state.result !== null && type.kind !== state.kind) throwError(state, "unacceptable node kind for !<" + state.tag + "> tag; it should be \"" + type.kind + "\", not \"" + state.kind + "\"");
    			if (!type.resolve(state.result, state.tag)) throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    			else {
    				state.result = type.construct(state.result, state.tag);
    				if (state.anchor !== null) storeAnchor(state, state.anchor, state.result);
    			}
    		}
    		if (state.listener !== null) state.listener("close", state);
    		state.depth -= 1;
    		return state.tag !== null || state.anchor !== null || hasContent;
    	}
    	function readDocument(state) {
    		const documentStart = state.position;
    		let hasDirectives = false;
    		let ch;
    		state.version = null;
    		state.checkLineBreaks = state.legacy;
    		state.tagMap = Object.create(null);
    		state.anchorMap = Object.create(null);
    		while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    			skipSeparationSpace(state, true, -1);
    			ch = state.input.charCodeAt(state.position);
    			if (state.lineIndent > 0 || ch !== 37) break;
    			hasDirectives = true;
    			ch = state.input.charCodeAt(++state.position);
    			let _position = state.position;
    			while (ch !== 0 && !isWsOrEol(ch)) ch = state.input.charCodeAt(++state.position);
    			const directiveName = state.input.slice(_position, state.position);
    			const directiveArgs = [];
    			if (directiveName.length < 1) throwError(state, "directive name must not be less than one character in length");
    			while (ch !== 0) {
    				while (isWhiteSpace(ch)) ch = state.input.charCodeAt(++state.position);
    				if (ch === 35) {
    					do
    						ch = state.input.charCodeAt(++state.position);
    					while (ch !== 0 && !isEol(ch));
    					break;
    				}
    				if (isEol(ch)) break;
    				_position = state.position;
    				while (ch !== 0 && !isWsOrEol(ch)) ch = state.input.charCodeAt(++state.position);
    				directiveArgs.push(state.input.slice(_position, state.position));
    			}
    			if (ch !== 0) readLineBreak(state);
    			if (_hasOwnProperty.call(directiveHandlers, directiveName)) directiveHandlers[directiveName](state, directiveName, directiveArgs);
    			else throwWarning(state, "unknown document directive \"" + directiveName + "\"");
    		}
    		skipSeparationSpace(state, true, -1);
    		if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    			state.position += 3;
    			skipSeparationSpace(state, true, -1);
    		} else if (hasDirectives) throwError(state, "directives end mark is expected");
    		composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    		skipSeparationSpace(state, true, -1);
    		if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) throwWarning(state, "non-ASCII line breaks are interpreted as content");
    		state.documents.push(state.result);
    		if (state.position === state.lineStart && testDocumentSeparator(state)) {
    			if (state.input.charCodeAt(state.position) === 46) {
    				state.position += 3;
    				skipSeparationSpace(state, true, -1);
    			}
    			return;
    		}
    		if (state.position < state.length - 1) throwError(state, "end of the stream or a document separator is expected");
    	}
    	function loadDocuments(input, options) {
    		input = String(input);
    		options = options || {};
    		if (input.length !== 0) {
    			if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) input += "\n";
    			if (input.charCodeAt(0) === 65279) input = input.slice(1);
    		}
    		const state = new State(input, options);
    		const nullpos = input.indexOf("\0");
    		if (nullpos !== -1) {
    			state.position = nullpos;
    			throwError(state, "null byte is not allowed in input");
    		}
    		state.input += "\0";
    		while (state.input.charCodeAt(state.position) === 32) {
    			state.lineIndent += 1;
    			state.position += 1;
    		}
    		while (state.position < state.length - 1) readDocument(state);
    		return state.documents;
    	}
    	function loadAll(input, iterator, options) {
    		if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    			options = iterator;
    			iterator = null;
    		}
    		const documents = loadDocuments(input, options);
    		if (typeof iterator !== "function") return documents;
    		for (let index = 0, length = documents.length; index < length; index += 1) iterator(documents[index]);
    	}
    	function load(input, options) {
    		const documents = loadDocuments(input, options);
    		if (documents.length === 0) return;
    		else if (documents.length === 1) return documents[0];
    		throw new YAMLException("expected a single document in the stream, but found more");
    	}
    	module.exports.loadAll = loadAll;
    	module.exports.load = load;
    }));
    //#endregion
    //#region lib/dumper.js
    var require_dumper = /* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var common = require_common();
    	var YAMLException = require_exception();
    	var DEFAULT_SCHEMA = require_default();
    	var _toString = Object.prototype.toString;
    	var _hasOwnProperty = Object.prototype.hasOwnProperty;
    	var CHAR_BOM = 65279;
    	var CHAR_TAB = 9;
    	var CHAR_LINE_FEED = 10;
    	var CHAR_CARRIAGE_RETURN = 13;
    	var CHAR_SPACE = 32;
    	var CHAR_EXCLAMATION = 33;
    	var CHAR_DOUBLE_QUOTE = 34;
    	var CHAR_SHARP = 35;
    	var CHAR_PERCENT = 37;
    	var CHAR_AMPERSAND = 38;
    	var CHAR_SINGLE_QUOTE = 39;
    	var CHAR_ASTERISK = 42;
    	var CHAR_COMMA = 44;
    	var CHAR_MINUS = 45;
    	var CHAR_COLON = 58;
    	var CHAR_EQUALS = 61;
    	var CHAR_GREATER_THAN = 62;
    	var CHAR_QUESTION = 63;
    	var CHAR_COMMERCIAL_AT = 64;
    	var CHAR_LEFT_SQUARE_BRACKET = 91;
    	var CHAR_RIGHT_SQUARE_BRACKET = 93;
    	var CHAR_GRAVE_ACCENT = 96;
    	var CHAR_LEFT_CURLY_BRACKET = 123;
    	var CHAR_VERTICAL_LINE = 124;
    	var CHAR_RIGHT_CURLY_BRACKET = 125;
    	var ESCAPE_SEQUENCES = {};
    	ESCAPE_SEQUENCES[0] = "\\0";
    	ESCAPE_SEQUENCES[7] = "\\a";
    	ESCAPE_SEQUENCES[8] = "\\b";
    	ESCAPE_SEQUENCES[9] = "\\t";
    	ESCAPE_SEQUENCES[10] = "\\n";
    	ESCAPE_SEQUENCES[11] = "\\v";
    	ESCAPE_SEQUENCES[12] = "\\f";
    	ESCAPE_SEQUENCES[13] = "\\r";
    	ESCAPE_SEQUENCES[27] = "\\e";
    	ESCAPE_SEQUENCES[34] = "\\\"";
    	ESCAPE_SEQUENCES[92] = "\\\\";
    	ESCAPE_SEQUENCES[133] = "\\N";
    	ESCAPE_SEQUENCES[160] = "\\_";
    	ESCAPE_SEQUENCES[8232] = "\\L";
    	ESCAPE_SEQUENCES[8233] = "\\P";
    	var DEPRECATED_BOOLEANS_SYNTAX = [
    		"y",
    		"Y",
    		"yes",
    		"Yes",
    		"YES",
    		"on",
    		"On",
    		"ON",
    		"n",
    		"N",
    		"no",
    		"No",
    		"NO",
    		"off",
    		"Off",
    		"OFF"
    	];
    	var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    	function compileStyleMap(schema, map) {
    		if (map === null) return {};
    		const result = {};
    		const keys = Object.keys(map);
    		for (let index = 0, length = keys.length; index < length; index += 1) {
    			let tag = keys[index];
    			let style = String(map[tag]);
    			if (tag.slice(0, 2) === "!!") tag = "tag:yaml.org,2002:" + tag.slice(2);
    			const type = schema.compiledTypeMap["fallback"][tag];
    			if (type && _hasOwnProperty.call(type.styleAliases, style)) style = type.styleAliases[style];
    			result[tag] = style;
    		}
    		return result;
    	}
    	function encodeHex(character) {
    		let handle;
    		let length;
    		const string = character.toString(16).toUpperCase();
    		if (character <= 255) {
    			handle = "x";
    			length = 2;
    		} else if (character <= 65535) {
    			handle = "u";
    			length = 4;
    		} else if (character <= 4294967295) {
    			handle = "U";
    			length = 8;
    		} else throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
    		return "\\" + handle + common.repeat("0", length - string.length) + string;
    	}
    	var QUOTING_TYPE_SINGLE = 1;
    	var QUOTING_TYPE_DOUBLE = 2;
    	function State(options) {
    		this.schema = options["schema"] || DEFAULT_SCHEMA;
    		this.indent = Math.max(1, options["indent"] || 2);
    		this.noArrayIndent = options["noArrayIndent"] || false;
    		this.skipInvalid = options["skipInvalid"] || false;
    		this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
    		this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
    		this.sortKeys = options["sortKeys"] || false;
    		this.lineWidth = options["lineWidth"] || 80;
    		this.noRefs = options["noRefs"] || false;
    		this.noCompatMode = options["noCompatMode"] || false;
    		this.condenseFlow = options["condenseFlow"] || false;
    		this.quotingType = options["quotingType"] === "\"" ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    		this.forceQuotes = options["forceQuotes"] || false;
    		this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
    		this.implicitTypes = this.schema.compiledImplicit;
    		this.explicitTypes = this.schema.compiledExplicit;
    		this.tag = null;
    		this.result = "";
    		this.duplicates = [];
    		this.usedDuplicates = null;
    	}
    	function indentString(string, spaces) {
    		const ind = common.repeat(" ", spaces);
    		let position = 0;
    		let result = "";
    		const length = string.length;
    		while (position < length) {
    			let line;
    			const next = string.indexOf("\n", position);
    			if (next === -1) {
    				line = string.slice(position);
    				position = length;
    			} else {
    				line = string.slice(position, next + 1);
    				position = next + 1;
    			}
    			if (line.length && line !== "\n") result += ind;
    			result += line;
    		}
    		return result;
    	}
    	function generateNextLine(state, level) {
    		return "\n" + common.repeat(" ", state.indent * level);
    	}
    	function testImplicitResolving(state, str) {
    		for (let index = 0, length = state.implicitTypes.length; index < length; index += 1) if (state.implicitTypes[index].resolve(str)) return true;
    		return false;
    	}
    	function isWhitespace(c) {
    		return c === CHAR_SPACE || c === CHAR_TAB;
    	}
    	function isPrintable(c) {
    		return c >= 32 && c <= 126 || c >= 161 && c <= 55295 && c !== 8232 && c !== 8233 || c >= 57344 && c <= 65533 && c !== CHAR_BOM || c >= 65536 && c <= 1114111;
    	}
    	function isNsCharOrWhitespace(c) {
    		return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    	}
    	function isPlainSafe(c, prev, inblock) {
    		const cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    		const cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    		return (inblock ? cIsNsCharOrWhitespace : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar;
    	}
    	function isPlainSafeFirst(c) {
    		return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    	}
    	function isPlainSafeLast(c) {
    		return !isWhitespace(c) && c !== CHAR_COLON;
    	}
    	function codePointAt(string, pos) {
    		const first = string.charCodeAt(pos);
    		let second;
    		if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    			second = string.charCodeAt(pos + 1);
    			if (second >= 56320 && second <= 57343) return (first - 55296) * 1024 + second - 56320 + 65536;
    		}
    		return first;
    	}
    	function needIndentIndicator(string) {
    		return /^\n* /.test(string);
    	}
    	var STYLE_PLAIN = 1;
    	var STYLE_SINGLE = 2;
    	var STYLE_LITERAL = 3;
    	var STYLE_FOLDED = 4;
    	var STYLE_DOUBLE = 5;
    	function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    		let i;
    		let char = 0;
    		let prevChar = null;
    		let hasLineBreak = false;
    		let hasFoldableLine = false;
    		const shouldTrackWidth = lineWidth !== -1;
    		let previousLineBreak = -1;
    		let plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
    		if (singleLineOnly || forceQuotes) for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    			char = codePointAt(string, i);
    			if (!isPrintable(char)) return STYLE_DOUBLE;
    			plain = plain && isPlainSafe(char, prevChar, inblock);
    			prevChar = char;
    		}
    		else {
    			for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    				char = codePointAt(string, i);
    				if (char === CHAR_LINE_FEED) {
    					hasLineBreak = true;
    					if (shouldTrackWidth) {
    						hasFoldableLine = hasFoldableLine || i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
    						previousLineBreak = i;
    					}
    				} else if (!isPrintable(char)) return STYLE_DOUBLE;
    				plain = plain && isPlainSafe(char, prevChar, inblock);
    				prevChar = char;
    			}
    			hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
    		}
    		if (!hasLineBreak && !hasFoldableLine) {
    			if (plain && !forceQuotes && !testAmbiguousType(string)) return STYLE_PLAIN;
    			return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    		}
    		if (indentPerLevel > 9 && needIndentIndicator(string)) return STYLE_DOUBLE;
    		if (!forceQuotes) return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    		return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    	}
    	function writeScalar(state, string, level, iskey, inblock) {
    		state.dump = function() {
    			if (string.length === 0) return state.quotingType === QUOTING_TYPE_DOUBLE ? "\"\"" : "''";
    			if (!state.noCompatMode) {
    				if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) return state.quotingType === QUOTING_TYPE_DOUBLE ? "\"" + string + "\"" : "'" + string + "'";
    			}
    			const indent = state.indent * Math.max(1, level);
    			const lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    			const singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    			function testAmbiguity(string) {
    				return testImplicitResolving(state, string);
    			}
    			switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {
    				case STYLE_PLAIN: return string;
    				case STYLE_SINGLE: return "'" + string.replace(/'/g, "''") + "'";
    				case STYLE_LITERAL: return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
    				case STYLE_FOLDED: return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
    				case STYLE_DOUBLE: return "\"" + escapeString(string) + "\"";
    				default: throw new YAMLException("impossible error: invalid scalar style");
    			}
    		}();
    	}
    	function blockHeader(string, indentPerLevel) {
    		const indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
    		const clip = string[string.length - 1] === "\n";
    		return indentIndicator + (clip && (string[string.length - 2] === "\n" || string === "\n") ? "+" : clip ? "" : "-") + "\n";
    	}
    	function dropEndingNewline(string) {
    		return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    	}
    	function foldString(string, width) {
    		const lineRe = /(\n+)([^\n]*)/g;
    		let result = function() {
    			let nextLF = string.indexOf("\n");
    			nextLF = nextLF !== -1 ? nextLF : string.length;
    			lineRe.lastIndex = nextLF;
    			return foldLine(string.slice(0, nextLF), width);
    		}();
    		let prevMoreIndented = string[0] === "\n" || string[0] === " ";
    		let moreIndented;
    		let match;
    		while (match = lineRe.exec(string)) {
    			const prefix = match[1];
    			const line = match[2];
    			moreIndented = line[0] === " ";
    			result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    			prevMoreIndented = moreIndented;
    		}
    		return result;
    	}
    	function foldLine(line, width) {
    		if (line === "" || line[0] === " ") return line;
    		const breakRe = / [^ ]/g;
    		let match;
    		let start = 0;
    		let end;
    		let curr = 0;
    		let next = 0;
    		let result = "";
    		while (match = breakRe.exec(line)) {
    			next = match.index;
    			if (next - start > width) {
    				end = curr > start ? curr : next;
    				result += "\n" + line.slice(start, end);
    				start = end + 1;
    			}
    			curr = next;
    		}
    		result += "\n";
    		if (line.length - start > width && curr > start) result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
    		else result += line.slice(start);
    		return result.slice(1);
    	}
    	function escapeString(string) {
    		let result = "";
    		let char = 0;
    		for (let i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    			char = codePointAt(string, i);
    			const escapeSeq = ESCAPE_SEQUENCES[char];
    			if (!escapeSeq && isPrintable(char)) {
    				result += string[i];
    				if (char >= 65536) result += string[i + 1];
    			} else result += escapeSeq || encodeHex(char);
    		}
    		return result;
    	}
    	function writeFlowSequence(state, level, object) {
    		let _result = "";
    		const _tag = state.tag;
    		for (let index = 0, length = object.length; index < length; index += 1) {
    			let value = object[index];
    			if (state.replacer) value = state.replacer.call(object, String(index), value);
    			if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
    				if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
    				_result += state.dump;
    			}
    		}
    		state.tag = _tag;
    		state.dump = "[" + _result + "]";
    	}
    	function writeBlockSequence(state, level, object, compact) {
    		let _result = "";
    		const _tag = state.tag;
    		for (let index = 0, length = object.length; index < length; index += 1) {
    			let value = object[index];
    			if (state.replacer) value = state.replacer.call(object, String(index), value);
    			if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
    				if (!compact || _result !== "") _result += generateNextLine(state, level);
    				if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) _result += "-";
    				else _result += "- ";
    				_result += state.dump;
    			}
    		}
    		state.tag = _tag;
    		state.dump = _result || "[]";
    	}
    	function writeFlowMapping(state, level, object) {
    		let _result = "";
    		const _tag = state.tag;
    		const objectKeyList = Object.keys(object);
    		for (let index = 0, length = objectKeyList.length; index < length; index += 1) {
    			let pairBuffer = "";
    			if (_result !== "") pairBuffer += ", ";
    			if (state.condenseFlow) pairBuffer += "\"";
    			const objectKey = objectKeyList[index];
    			let objectValue = object[objectKey];
    			if (state.replacer) objectValue = state.replacer.call(object, objectKey, objectValue);
    			if (!writeNode(state, level, objectKey, false, false)) continue;
    			if (state.dump.length > 1024) pairBuffer += "? ";
    			pairBuffer += state.dump + (state.condenseFlow ? "\"" : "") + ":" + (state.condenseFlow ? "" : " ");
    			if (!writeNode(state, level, objectValue, false, false)) continue;
    			pairBuffer += state.dump;
    			_result += pairBuffer;
    		}
    		state.tag = _tag;
    		state.dump = "{" + _result + "}";
    	}
    	function writeBlockMapping(state, level, object, compact) {
    		let _result = "";
    		const _tag = state.tag;
    		const objectKeyList = Object.keys(object);
    		if (state.sortKeys === true) objectKeyList.sort();
    		else if (typeof state.sortKeys === "function") objectKeyList.sort(state.sortKeys);
    		else if (state.sortKeys) throw new YAMLException("sortKeys must be a boolean or a function");
    		for (let index = 0, length = objectKeyList.length; index < length; index += 1) {
    			let pairBuffer = "";
    			if (!compact || _result !== "") pairBuffer += generateNextLine(state, level);
    			const objectKey = objectKeyList[index];
    			let objectValue = object[objectKey];
    			if (state.replacer) objectValue = state.replacer.call(object, objectKey, objectValue);
    			if (!writeNode(state, level + 1, objectKey, true, true, true)) continue;
    			const explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    			if (explicitPair) if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) pairBuffer += "?";
    			else pairBuffer += "? ";
    			pairBuffer += state.dump;
    			if (explicitPair) pairBuffer += generateNextLine(state, level);
    			if (!writeNode(state, level + 1, objectValue, true, explicitPair)) continue;
    			if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) pairBuffer += ":";
    			else pairBuffer += ": ";
    			pairBuffer += state.dump;
    			_result += pairBuffer;
    		}
    		state.tag = _tag;
    		state.dump = _result || "{}";
    	}
    	function detectType(state, object, explicit) {
    		const typeList = explicit ? state.explicitTypes : state.implicitTypes;
    		for (let index = 0, length = typeList.length; index < length; index += 1) {
    			const type = typeList[index];
    			if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
    				if (explicit) if (type.multi && type.representName) state.tag = type.representName(object);
    				else state.tag = type.tag;
    				else state.tag = "?";
    				if (type.represent) {
    					const style = state.styleMap[type.tag] || type.defaultStyle;
    					let _result;
    					if (_toString.call(type.represent) === "[object Function]") _result = type.represent(object, style);
    					else if (_hasOwnProperty.call(type.represent, style)) _result = type.represent[style](object, style);
    					else throw new YAMLException("!<" + type.tag + "> tag resolver accepts not \"" + style + "\" style");
    					state.dump = _result;
    				}
    				return true;
    			}
    		}
    		return false;
    	}
    	function writeNode(state, level, object, block, compact, iskey, isblockseq) {
    		state.tag = null;
    		state.dump = object;
    		if (!detectType(state, object, false)) detectType(state, object, true);
    		const type = _toString.call(state.dump);
    		const inblock = block;
    		if (block) block = state.flowLevel < 0 || state.flowLevel > level;
    		const objectOrArray = type === "[object Object]" || type === "[object Array]";
    		let duplicateIndex;
    		let duplicate;
    		if (objectOrArray) {
    			duplicateIndex = state.duplicates.indexOf(object);
    			duplicate = duplicateIndex !== -1;
    		}
    		if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) compact = false;
    		if (duplicate && state.usedDuplicates[duplicateIndex]) state.dump = "*ref_" + duplicateIndex;
    		else {
    			if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) state.usedDuplicates[duplicateIndex] = true;
    			if (type === "[object Object]") if (block && Object.keys(state.dump).length !== 0) {
    				writeBlockMapping(state, level, state.dump, compact);
    				if (duplicate) state.dump = "&ref_" + duplicateIndex + state.dump;
    			} else {
    				writeFlowMapping(state, level, state.dump);
    				if (duplicate) state.dump = "&ref_" + duplicateIndex + " " + state.dump;
    			}
    			else if (type === "[object Array]") if (block && state.dump.length !== 0) {
    				if (state.noArrayIndent && !isblockseq && level > 0) writeBlockSequence(state, level - 1, state.dump, compact);
    				else writeBlockSequence(state, level, state.dump, compact);
    				if (duplicate) state.dump = "&ref_" + duplicateIndex + state.dump;
    			} else {
    				writeFlowSequence(state, level, state.dump);
    				if (duplicate) state.dump = "&ref_" + duplicateIndex + " " + state.dump;
    			}
    			else if (type === "[object String]") {
    				if (state.tag !== "?") writeScalar(state, state.dump, level, iskey, inblock);
    			} else if (type === "[object Undefined]") return false;
    			else {
    				if (state.skipInvalid) return false;
    				throw new YAMLException("unacceptable kind of an object to dump " + type);
    			}
    			if (state.tag !== null && state.tag !== "?") {
    				let tagStr = encodeURI(state.tag[0] === "!" ? state.tag.slice(1) : state.tag).replace(/!/g, "%21");
    				if (state.tag[0] === "!") tagStr = "!" + tagStr;
    				else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") tagStr = "!!" + tagStr.slice(18);
    				else tagStr = "!<" + tagStr + ">";
    				state.dump = tagStr + " " + state.dump;
    			}
    		}
    		return true;
    	}
    	function getDuplicateReferences(object, state) {
    		const objects = [];
    		const duplicatesIndexes = [];
    		inspectNode(object, objects, duplicatesIndexes);
    		const length = duplicatesIndexes.length;
    		for (let index = 0; index < length; index += 1) state.duplicates.push(objects[duplicatesIndexes[index]]);
    		state.usedDuplicates = new Array(length);
    	}
    	function inspectNode(object, objects, duplicatesIndexes) {
    		if (object !== null && typeof object === "object") {
    			const index = objects.indexOf(object);
    			if (index !== -1) {
    				if (duplicatesIndexes.indexOf(index) === -1) duplicatesIndexes.push(index);
    			} else {
    				objects.push(object);
    				if (Array.isArray(object)) for (let i = 0, length = object.length; i < length; i += 1) inspectNode(object[i], objects, duplicatesIndexes);
    				else {
    					const objectKeyList = Object.keys(object);
    					for (let i = 0, length = objectKeyList.length; i < length; i += 1) inspectNode(object[objectKeyList[i]], objects, duplicatesIndexes);
    				}
    			}
    		}
    	}
    	function dump(input, options) {
    		options = options || {};
    		const state = new State(options);
    		if (!state.noRefs) getDuplicateReferences(input, state);
    		let value = input;
    		if (state.replacer) value = state.replacer.call({ "": value }, "", value);
    		if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
    		return "";
    	}
    	module.exports.dump = dump;
    }));
    //#endregion
    //#region lib/index_vite_proxy.tmp.mjs
    var import_js_yaml = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
    	var loader = require_loader();
    	var dumper = require_dumper();
    	function renamed(from, to) {
    		return function() {
    			throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
    		};
    	}
    	module.exports.Type = require_type();
    	module.exports.Schema = require_schema();
    	module.exports.FAILSAFE_SCHEMA = require_failsafe();
    	module.exports.JSON_SCHEMA = require_json();
    	module.exports.CORE_SCHEMA = require_core();
    	module.exports.DEFAULT_SCHEMA = require_default();
    	module.exports.load = loader.load;
    	module.exports.loadAll = loader.loadAll;
    	module.exports.dump = dumper.dump;
    	module.exports.YAMLException = require_exception();
    	module.exports.types = {
    		binary: require_binary(),
    		float: require_float(),
    		map: require_map(),
    		null: require_null(),
    		pairs: require_pairs(),
    		set: require_set(),
    		timestamp: require_timestamp(),
    		bool: require_bool(),
    		int: require_int(),
    		merge: require_merge(),
    		omap: require_omap(),
    		seq: require_seq(),
    		str: require_str()
    	};
    	module.exports.safeLoad = renamed("safeLoad", "load");
    	module.exports.safeLoadAll = renamed("safeLoadAll", "loadAll");
    	module.exports.safeDump = renamed("safeDump", "dump");
    })))(), 1);
    import_js_yaml.default;
    var index_vite_proxy_tmp_default = import_js_yaml.default;

    var ParseYaml = function (yamlString, config) {
        var items = [];
        if (Array.isArray(yamlString)) {
            yamlString.forEach(function (s) {
                try {
                    items.push(index_vite_proxy_tmp_default.load(s, config));
                } catch (e) {
                    console.log(e);
                }
            });

        } else {
            try {
                index_vite_proxy_tmp_default.loadAll(yamlString, function (item) {
                    items.push(item);
                }, config);
            } catch (e) {
                console.log(e);
            }
        }

        return items;
    };

    var ParseInputData = function (inputData, config) {
        if (typeof (config) === 'string') {
            config = { format: config };
        }

        var inputType;
        if (typeof (inputData) === 'string') {
            inputType = GetValue$1(config, 'format', 'csv');
        } else {
            inputType = GetValue$1(config, 'format', undefined);
        }

        switch (inputType) {
            case 'csv':
                inputData = ParseCSV(inputData, config);
                break;

            case 'yaml':
                inputData = ParseYaml(inputData, config);
                break;

            case 'json':
                inputData = JSON.parse(inputData);
                break;
        }

        return inputData;
    };

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
    var Remove = function (array, item, callback, context)
    {
        if (context === undefined) { context = array; }

        var index;

        //  Fast path to avoid array mutation and iteration
        if (!Array.isArray(item))
        {
            index = array.indexOf(item);

            if (index !== -1)
            {
                SpliceOne(array, index);

                if (callback)
                {
                    callback.call(context, item);
                }

                return item;
            }
            else
            {
                return null;
            }
        }

        //  If we got this far, we have an array of items to remove

        var itemLength = item.length - 1;

        while (itemLength >= 0)
        {
            var entry = item[itemLength];

            index = array.indexOf(entry);

            if (index !== -1)
            {
                SpliceOne(array, index);

                if (callback)
                {
                    callback.call(context, entry);
                }
            }
            else
            {
                //  Item wasn't found in the array, so remove it from our return results
                item.pop();
            }

            itemLength--;
        }

        return item;
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

    var AddQuestion = function (question) {
        Polyfills.call(this, question);

        // Remove duplicated question
        var key = question.key;
        if (this.questionMap.hasOwnProperty(key)) {
            this.remove(key);
        }

        // Add question
        this.questions.push(question);
        this.questionMap[key] = question;

        return this;
    };

    var Polyfills = function (question) {
        var options = question.options;
        if (options) {
            // Apply key via serial number        
            for (var i = 0, cnt = options.length; i < cnt; i++) {
                var option = options[i];
                if (!option.hasOwnProperty('key')) {
                    option.key = `_${i}`;
                }
            }
        }

        if (!question.hasOwnProperty('key')) {
            // Apply key via serial numbers
            question.key = `_${this.questions.length}`;
        }
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

    var DataMethods$2 = {
        enableData() {
            if (this.data === undefined) {
                this.data = {};
            }
            return this;
        },

        setData(key, value) {
            this.enableData();
            if (arguments.length === 1) {
                var data = key;
                for (key in data) {
                    this.data[key] = data[key];
                }
            } else {
                this.data[key] = value;
            }
            return this;
        },

        getData(key, defaultValue) {
            this.enableData();
            return (key === undefined) ? this.data : GetValue$1(this.data, key, defaultValue);
        },

        incData(key, inc, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) + inc);
            return this;
        },

        mulData(key, mul, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) * mul);
            return this;
        },

        clearData() {
            if (this.data) {
                Clear(this.data);
            }
            return this;
        },
    };

    class Quest {
        constructor(questionsManager, config) {
            // Event emitter
            this.setEventEmitter(GetValue$1(config, 'eventEmitter', undefined));

            this.questionsManager = questionsManager;
            this.questionKeys = [];

            this.resetFromJSON(config);
            this.start();
        }

        resetFromJSON(o) {
            this.setShuffleQuestionsEnable(GetValue$1(o, 'shuffleQuestions', false));
            this.setShuffleOptionsEnable(GetValue$1(o, 'shuffleOptions', false));
            return this;
        }

        shutdown() {
            this.destroyEventEmitter();
            this.questionsManager = undefined;
        }

        destroy() {
            this.shutdown();
        }

        setShuffleQuestionsEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.shuffleQuestionsEnable = enabled;
            return this;
        }

        setShuffleOptionsEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.shuffleOptionsEnable = enabled;
            return this;
        }

        start() {
            // Reload keys
            this.questionKeys.length = 0;
            this.questionsManager.getKeys(this.questionKeys);
            if (this.shuffleQuestionsEnable) {
                Shuffle(this.questionKeys);
            }

            this.nextIndex = -1;
            this.nextKey = undefined;
            return this;
        }

        setNextKey(key) {
            if (key === undefined) {
                this.nextIndex++;
                this.nextKey = this.questionKeys[this.nextIndex];
            } else if (this.questionsManager.has(key)) {
                this.nextKey = key;
                this.nextIndex = this.questionKeys.indexOf(key);
            } else ;
            return this;
        }

        getQuestion() {
            var question = this.questionsManager.get(this.nextKey);
            if (this.shuffleOptionsEnable) {
                var options = question.options;
                if (options) {
                    Shuffle(options);
                }
            }
            this.emit('quest', question, this.questionsManager, this);
            return question;
        }

        getNextQuestion(key) {
            return this.setNextKey(key).getQuestion();
        }

        isLastQuestion() {
            return this.nextIndex === (this.questionKeys.length - 1);
        }

        getOption(question, optionKey) {
            if (optionKey === undefined) {
                optionKey = question;
                question = this.questionsManager.get(this.nextKey);
            }
            return this.questionsManager.getOption(question, optionKey);
        }
    }

    Object.assign(
        Quest.prototype,
        EventEmitterMethods,
        DataMethods$2
    );

    var QuestMethods$1 = {
        newQuest(config) {
            var quest = new Quest(this, config);
            return quest;
        },

        startQuest(config) {
            if (this._quest) {
                this._quest
                    .resetFromJSON(config)
                    .start();
            } else {
                if (!IsPlainObject(config)) {
                    config = {};
                }
                if (!config.hasOwnProperty('eventEmitter')) {
                    config.eventEmitter = this;
                }
                this._quest = this.newQuest(config);
            }
            return this;
        },

        restartQuest() {
            this._quest.start();
            return this;
        },

        getNextQuestion(key) {
            return this._quest.getNextQuestion(key);
        },

        isLastQuestion() {
            return this._quest.isLastQuestion();
        },

    };

    var DataMethods$1 = {
        getData(key, defaultValue) {
            return this._quest.getData(key, defaultValue);
        },

        setData(key, value) {
            this._quest.setData(key, value);
            return this;
        },

        incData(key, inc, defaultValue) {
            this._quest.incData(key, inc, defaultValue);
            return this;
        },

        mulData(key, mul, defaultValue) {
            this._quest.mulData(key, mul, defaultValue);
            return this;
        },

        clearData() {
            this._quest.clearData();
            return this;
        },
    };

    class QuestionManager {
        constructor(config) {
            // Event emitter. Create a private event emitter for private quest task object.
            this.setEventEmitter(GetValue$1(config, 'eventEmitter', undefined));

            this.questions = [];
            this.questionMap = {};
            this._quest = undefined;

            var questions = GetValue$1(config, 'questions', undefined);
            if (questions) {
                this.add(questions, config);
            }
            var questConfig = GetValue$1(config, 'quest', undefined);
            if (questConfig) {
                this.startQuest(questConfig);
            }
        }

        shutdown() {
            this.destroyEventEmitter();
            if (this._quest) {
                this._quest.destroy();
                this._quest = undefined;
            }
        }

        destroy() {
            this.shutdown();
        }

        add(question, config) {
            question = ParseInputData(question, config);

            if (Array.isArray(question)) {
                var questions = question;
                for (var i = 0, cnt = questions.length; i < cnt; i++) {
                    AddQuestion.call(this, questions[i]);
                }
            } else {
                AddQuestion.call(this, question);
            }

            return this;
        }

        remove(key) {
            if (this.questionMap.hasOwnProperty(key)) {
                Remove(this.questions, this.questionMap[key]);
                delete this.questionMap[key];
            }
            return this;
        }

        removeAll() {
            this.questions.length = 0;
            Clear(this.questionMap);
        }

        has(key) {
            return this.questionMap.hasOwnProperty(key);
        }

        get(key) {
            return this.questionMap[key];
        }

        getKeys(out) {
            if (out === undefined) {
                out = [];
            }
            for (var i = 0, cnt = this.questions.length; i < cnt; i++) {
                out.push(this.questions[i].key);
            }
            return out;
        }

        getOption(question, optionKey) {
            if (typeof (question) === 'string') {
                question = this.get(question);
            }
            if (!question) {
                return null;
            }
            var options = question.options;
            if (options) {
                var option;
                for (var i = 0, cnt = options.length; i < cnt; i++) {
                    option = options[i];
                    if (option.key === optionKey) {
                        return option;
                    }
                }
            }
            return null;
        }
    }

    Object.assign(
        QuestionManager.prototype,
        EventEmitterMethods,
        QuestMethods$1,
        DataMethods$1
    );

    var QuestMethods = {
        start(key) {
            this.questionManager
                .restartQuest()
                .getNextQuestion(key);
            return this;
        },

        next(key) {
            this.questionManager
                .getNextQuestion(key);
            return this;
        },

        isLast() {
            return this.questionManager.isLastQuestion();
        },

        removeAll() {
            this.questionManager.removeAll();
            return this;
        },

        add(questions, config) {
            this.questionManager.add(questions, config);
            return this;
        }
    };

    var DataMethods = {
        getData(key, defaultValue) {
            return this.questionManager.getData(key, defaultValue);
        },

        setData(key, value) {
            this.questionManager.setData(key, value);
            return this;
        },

        incData(key, inc, defaultValue) {
            this.questionManager.incData(key, inc, defaultValue);
            return this;
        },

        mulData(key, mul, defaultValue) {
            this.questionManager.mulData(key, mul, defaultValue);
            return this;
        },

        clearData() {
            this.questionManager.clearData();
            return this;
        },
    };

    const EE = phaser.Events.EventEmitter;
    const GetValue = phaser.Utils.Objects.GetValue;

    class DialogQuest extends EE {
        constructor(config) {
            super();

            if (config === undefined) {
                config = {};
            }
            if (!config.quest) {
                config.quest = true;
            }

            this.dialog = GetValue(config, 'dialog', undefined);
            this.questionManager = new QuestionManager(config);

            // Attach events
            this.questionManager
                .on('quest', function (question) {
                    var choices = this.dialog.getElement('choices');
                    var options = question.options, option;
                    for (var i = 0, cnt = choices.length; i < cnt; i++) {
                        option = options[i];
                        if (option) {
                            this.dialog.showChoice(i);
                            this.emit('update-choice', choices[i], option, this);
                        } else {
                            this.dialog.hideChoice(i);
                        }
                    }
                    this.emit('update-dialog', this.dialog, question, this);
                }, this);

            this.dialog
                .on('button.click', function (button, groupName, index) {
                    var eventName = 'click-' + ((groupName === 'choices') ? 'choice' : 'action');
                    this.emit(eventName, button, this.dialog, this);
                }, this);
        }
    }

    Object.assign(
        DialogQuest.prototype,
        QuestMethods,
        DataMethods
    );

    return DialogQuest;

}));
