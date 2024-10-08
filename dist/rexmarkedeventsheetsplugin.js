(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexmarkedeventsheetsplugin = factory());
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

	let EventEmitter$2 = class EventEmitter extends EE {
	    shutdown() {
	        this.removeAllListeners();
	    }
	    destroy() {
	        this.removeAllListeners();
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

	const IDLE$1 = 0;
	const SUCCESS$1 = 1;
	const FAILURE = 2;
	const RUNNING$1 = 3;
	const ABORT = 5;
	const ERROR$1 = 9;

	const TREE = 'tree';
	const COMPOSITE = 'composite';
	const DECORATOR = 'decorator';
	const ACTION = 'action';
	const SERVICE = 'service';

	const TREE_STATE = '$state';

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
	const HasBuiltRandomUUID = (window.crypto && window.crypto.randomUUID);

	var UUID = function () {
	    if (HasBuiltRandomUUID) {
	        return window.crypto.randomUUID();
	    }

	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = Math.random() * 16 | 0;
	        var v = (c === 'x') ? r : (r & 0x3 | 0x8);

	        return v.toString(16);
	    });
	};

	var sn = null;
	var snPrefix = '#';

	var SetSerialNumber = function (value) {
	    if (value === undefined) {
	        value = null;
	    }

	    sn = value;
	};

	var SetSerialNumberPrefix = function (prefix) {
	    snPrefix = prefix;
	};

	var GetSerialNumber = function () {
	    return sn;
	};

	var CreateID = function () {
	    if (sn === null) {
	        return UUID();
	    }

	    sn += 1;
	    return `${snPrefix}${sn}`;
	};

	var DataMethods$4 = {

	    getTreeMemory(blackboard) {
	        return blackboard.getTreeMemory(this.id);
	    },

	    getData(blackboard, key) {
	        return blackboard.get(key, this.id);
	    },

	    setData(blackboard, key, value) {
	        blackboard.set(key, value, this.id);
	        return this;
	    },

	    getState(blackboard) {
	        return this.getData(blackboard, TREE_STATE);
	    },

	    resetState(blackboard) {
	        this.setData(blackboard, TREE_STATE, IDLE$1);
	        return this;
	    },

	};

	var BreadthFirstSearch = function (root, callback, scope) {
	    var queue = [root];
	    while (queue.length > 0) {
	        var current = queue.shift();
	        var skip = callback.call(scope, current);

	        if (skip) {
	            continue;
	        }

	        switch (current.category) {
	            case COMPOSITE:
	                queue.push(...current.children);

	                var services = current.services;
	                if (services) {
	                    queue.push(...services);
	                }
	                break;

	            case DECORATOR:
	                queue.push(current.child);
	                break;

	            case ACTION:
	                var services = current.services;
	                if (services) {
	                    queue.push(...services);
	                }
	                break;
	        }
	    }
	};

	function DeepClone(obj) {
	    if (obj === null || typeof obj !== 'object') {
	        // If obj is a primitive value or null, return it directly
	        return obj;
	    }

	    if (Array.isArray(obj)) {
	        // If obj is an array, create a new array and clone each element
	        return obj.map(item => DeepClone(item));
	    }

	    if (obj instanceof Date) {
	        // If obj is a Date object, create a new Date object with the same value
	        return new Date(obj);
	    }

	    if (obj instanceof RegExp) {
	        // If obj is a RegExp object, create a new RegExp object with the same pattern and flags
	        return new RegExp(obj);
	    }

	    if (Object.getPrototypeOf(obj) !== Object.prototype) {
	        // If obj is a custom object, return a reference to it
	        return obj;
	    }

	    // If obj is a plain object, create a new object and clone each property
	    const clonedObj = {};
	    for (let key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            clonedObj[key] = DeepClone(obj[key]);
	        }
	    }
	    return clonedObj;
	}

	var Dump = function () {
	    var data = {
	        sn: GetSerialNumber(),
	        id: this.id,
	        title: this.title,
	        description: this.description,
	        root: (this.root) ? this.root.id : null,
	        properties: DeepClone(this.properties),
	        nodes: [],
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
	                spec.children = node.children.map((child) => child.id);

	                if (node.services) {
	                    spec.services = node.services.map((child) => child.id);
	                }

	                break;

	            case DECORATOR:
	                if (node.child) {
	                    spec.child = node.child.id;
	                }

	                break;

	            case ACTION:
	                if (node.services) {
	                    spec.services = node.services.map((child) => child.id);
	                }

	                break;
	        }

	        data.nodes.push(spec);
	    }

	    return data;
	};

	class BaseExpression {
	    setExpressionHandler(callback) {
	        this.expressionHandler = callback;
	        return this;
	    }

	    eval(context) {
	        return this.expressionHandler(context);
	    }
	}

	function commonjsRequire(path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var parser$3 = {};

	/* parser generated by jison 0.4.18 */

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
		var parser = (function(){
		var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,11],$V1=[1,3],$V2=[1,4],$V3=[1,5],$V4=[1,6],$V5=[1,8],$V6=[1,9],$V7=[1,10],$V8=[1,13],$V9=[1,14],$Va=[1,15],$Vb=[1,16],$Vc=[1,17],$Vd=[1,18],$Ve=[1,19],$Vf=[1,20],$Vg=[1,21],$Vh=[1,22],$Vi=[1,23],$Vj=[1,24],$Vk=[1,25],$Vl=[1,26],$Vm=[5,7,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,30],$Vn=[5,7,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30],$Vo=[5,7,12,13,14,19,20,21,22,23,24,25,26,28,30],$Vp=[5,7,12,13,14,15,16,17,19,20,21,22,23,24,25,26,28,30],$Vq=[5,7,12,19,20,21,22,23,24,25,26,28,30],$Vr=[5,7,12,25,26,28,30],$Vs=[7,28];
		var parser = {trace: function trace () { },
		yy: {},
		symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"expression_list":6,",":7,"dot_name":8,".":9,"NAME":10,"[":11,"]":12,"+":13,"-":14,"*":15,"/":16,"%":17,"^":18,">":19,"<":20,"==":21,"!=":22,">=":23,"<=":24,"||":25,"&&":26,"(":27,")":28,"?":29,":":30,"true":31,"false":32,"QUOTED_STRING":33,"NUMBER":34,"HEXNUMBER":35,"$accept":0,"$end":1},
		terminals_: {2:"error",5:"EOF",7:",",9:".",10:"NAME",11:"[",12:"]",13:"+",14:"-",15:"*",16:"/",17:"%",18:"^",19:">",20:"<",21:"==",22:"!=",23:">=",24:"<=",25:"||",26:"&&",27:"(",28:")",29:"?",30:":",31:"true",32:"false",33:"QUOTED_STRING",34:"NUMBER",35:"HEXNUMBER"},
		productions_: [0,[3,2],[6,3],[6,1],[8,3],[8,4],[8,1],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,3],[4,7],[4,1],[4,1],[4,1],[4,3],[4,4],[4,1],[4,1],[4,1]],
		performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
		/* this == yyval */

		var $0 = $$.length - 1;
		switch (yystate) {
		case 1:

		            var result = $$[$0-1];
		            if (typeof(result) === 'function') {
		                return result;
		            } else {
		                return function(ctx) { return result; }
		            }
		case 2: case 4:
		 this.$ = $$[$0-2].concat([$$[$0]]); 
		break;
		case 3: case 6:
		 this.$ = [$$[$0]]; 
		break;
		case 5:
		 this.$ = $$[$0-3].concat([$$[$0-1]]); 
		break;
		case 7:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_add', [$$[$0-2], $$[$0]]); };
		        
		break;
		case 8:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_subtract', [$$[$0-2], $$[$0]]); };
		        
		break;
		case 9:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_multiply', [$$[$0-2], $$[$0]]); };
		        
		break;
		case 10:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_divide', [$$[$0-2], $$[$0]]); };
		        
		break;
		case 11:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_mod', [$$[$0-2], $$[$0]]); };
		        
		break;
		case 12:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_pow', [$$[$0-2], $$[$0]]); };
		        
		break;
		case 13:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_greaterThen', [$$[$0-2], $$[$0]]) == true; };
		        
		break;
		case 14:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_lessThen', [$$[$0-2], $$[$0]]) == true; };
		        
		break;
		case 15:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_equalTo', [$$[$0-2], $$[$0]]) == true; };
		        
		break;
		case 16:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_equalTo', [$$[$0-2], $$[$0]]) == false; };
		        
		break;
		case 17:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_lessThen', [$$[$0-2], $$[$0]]) == false; };
		        
		break;
		case 18:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_greaterThen', [$$[$0-2], $$[$0]]) == false; };
		        
		break;
		case 19:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_or', [$$[$0-2], $$[$0]]) == true; };
		        
		break;
		case 20:

		            this.$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_and', [$$[$0-2], $$[$0]]) == true; };
		        
		break;
		case 21:

		            this.$ = function(ctx) { return -runFn($$[$0], ctx); };
		        
		break;
		case 22:

		            this.$ = function(ctx) { return runFn($$[$0-1], ctx); };
		        
		break;
		case 23:

		            this.$ = function(ctx) { return runFn($$[$0-5], ctx)? runFn($$[$0-2], ctx) : runFn($$[$0], ctx); };
		        
		break;
		case 24:
		 this.$ = true; 
		break;
		case 25:
		 this.$ = false; 
		break;
		case 26:
		            
		            this.$ = function(ctx) {
		                return yy.parser.getDotProperty(ctx, mapArgs($$[$0], ctx), 0); 
		            };
		        
		break;
		case 27:

		            this.$ = function(ctx) { 
		                return runMethod(yy.parser, ctx, mapArgs($$[$0-2], ctx), undefined, true); 
		            };
		        
		break;
		case 28:

		            this.$ = function(ctx) { 
		                return runMethod(yy.parser, ctx, mapArgs($$[$0-3], ctx), $$[$0-1], true); 
		            };
		        
		break;
		case 29:
		 this.$ = yytext.slice(1,-1); 
		break;
		case 30:
		 this.$ = Number(yytext); 
		break;
		case 31:
		 this.$ = parseInt(yytext, 16); 
		break;
		}
		},
		table: [{3:1,4:2,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{1:[3]},{5:[1,12],13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd,19:$Ve,20:$Vf,21:$Vg,22:$Vh,23:$Vi,24:$Vj,25:$Vk,26:$Vl},{4:27,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:28,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},o($Vm,[2,24]),o($Vm,[2,25]),o($Vm,[2,26],{9:[1,30],11:[1,31],27:[1,29]}),o($Vm,[2,29]),o($Vm,[2,30]),o($Vm,[2,31]),o($Vn,[2,6]),{1:[2,1]},{4:32,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:33,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:34,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:35,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:36,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:37,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:38,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:39,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:40,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:41,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:42,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:43,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:44,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{4:45,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},o($Vm,[2,21]),{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd,19:$Ve,20:$Vf,21:$Vg,22:$Vh,23:$Vi,24:$Vj,25:$Vk,26:$Vl,28:[1,46]},{4:49,6:48,8:7,10:$V0,14:$V1,27:$V2,28:[1,47],31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},{10:[1,50]},{4:51,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},o($Vo,[2,7],{15:$Va,16:$Vb,17:$Vc,18:$Vd}),o($Vo,[2,8],{15:$Va,16:$Vb,17:$Vc,18:$Vd}),o($Vp,[2,9],{18:$Vd}),o($Vp,[2,10],{18:$Vd}),o([5,7,12,13,14,17,19,20,21,22,23,24,25,26,28,30],[2,11],{15:$Va,16:$Vb,18:$Vd}),o($Vm,[2,12]),o($Vq,[2,13],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd}),o($Vq,[2,14],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd}),o($Vq,[2,15],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd}),o($Vq,[2,16],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd}),o($Vq,[2,17],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd}),o($Vq,[2,18],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd}),o($Vr,[2,19],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd,19:$Ve,20:$Vf,21:$Vg,22:$Vh,23:$Vi,24:$Vj}),o($Vr,[2,20],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd,19:$Ve,20:$Vf,21:$Vg,22:$Vh,23:$Vi,24:$Vj}),o($Vm,[2,22],{29:[1,52]}),o($Vm,[2,27]),{7:[1,54],28:[1,53]},o($Vs,[2,3],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd,19:$Ve,20:$Vf,21:$Vg,22:$Vh,23:$Vi,24:$Vj,25:$Vk,26:$Vl}),o($Vn,[2,4]),{12:[1,55],13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd,19:$Ve,20:$Vf,21:$Vg,22:$Vh,23:$Vi,24:$Vj,25:$Vk,26:$Vl},{4:56,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},o($Vm,[2,28]),{4:57,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},o($Vn,[2,5]),{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd,19:$Ve,20:$Vf,21:$Vg,22:$Vh,23:$Vi,24:$Vj,25:$Vk,26:$Vl,30:[1,58]},o($Vs,[2,2],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd,19:$Ve,20:$Vf,21:$Vg,22:$Vh,23:$Vi,24:$Vj,25:$Vk,26:$Vl}),{4:59,8:7,10:$V0,14:$V1,27:$V2,31:$V3,32:$V4,33:$V5,34:$V6,35:$V7},o([5,7,12,28,30],[2,23],{13:$V8,14:$V9,15:$Va,16:$Vb,17:$Vc,18:$Vd,19:$Ve,20:$Vf,21:$Vg,22:$Vh,23:$Vi,24:$Vj,25:$Vk,26:$Vl})],
		defaultActions: {12:[2,1]},
		parseError: function parseError (str, hash) {
		    if (hash.recoverable) {
		        this.trace(str);
		    } else {
		        var error = new Error(str);
		        error.hash = hash;
		        throw error;
		    }
		},
		parse: function parse(input) {
		    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
		    var args = lstack.slice.call(arguments, 1);
		    var lexer = Object.create(this.lexer);
		    var sharedState = { yy: {} };
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
		    var lex = function () {
		            var token;
		            token = lexer.lex() || EOF;
		            if (typeof token !== 'number') {
		                token = self.symbols_[token] || token;
		            }
		            return token;
		        };
		    var symbol, state, action, r, yyval = {}, p, len, newState, expected;
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
		                yyval._$.range = [
		                    lstack[lstack.length - (len || 1)].range[0],
		                    lstack[lstack.length - 1].range[1]
		                ];
		            }
		            r = this.performAction.apply(yyval, [
		                yytext,
		                yyleng,
		                yylineno,
		                sharedState.yy,
		                action[1],
		                vstack,
		                lstack
		            ].concat(args));
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
		}};

		    function runFn(arg, ctx) {
		        return (typeof(arg) === 'function')? arg(ctx) : arg;
		    }

		    function mapArgs(args, ctx) {
		        if (args) {
		            args = args.map(function(arg){ return runFn(arg, ctx); });
		        }
		        return args;
		    }

		    function runBuildInMethod(self, ctx, name, args) {
		        var callback = self[name];
		        return callback.apply(self, mapArgs(args, ctx));
		    }

		    function runMethod(self, ctx, name, args, dotMode) {
		        var names;
		        if (typeof(name) === 'string') {
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
		var lexer = (function(){
		var lexer = ({

		EOF:1,

		parseError:function parseError(str, hash) {
		        if (this.yy.parser) {
		            this.yy.parser.parseError(str, hash);
		        } else {
		            throw new Error(str);
		        }
		    },

		// resets the lexer, sets new input
		setInput:function (input, yy) {
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
		            this.yylloc.range = [0,0];
		        }
		        this.offset = 0;
		        return this;
		    },

		// consumes and returns one char from the input
		input:function () {
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
		unput:function (ch) {
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
		            last_column: lines ?
		                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
		                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
		              this.yylloc.first_column - len
		        };

		        if (this.options.ranges) {
		            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
		        }
		        this.yyleng = this.yytext.length;
		        return this;
		    },

		// When called from action, caches matched text and appends it on next action
		more:function () {
		        this._more = true;
		        return this;
		    },

		// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
		reject:function () {
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
		less:function (n) {
		        this.unput(this.match.slice(n));
		    },

		// displays already matched input, i.e. for error messages
		pastInput:function () {
		        var past = this.matched.substr(0, this.matched.length - this.match.length);
		        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
		    },

		// displays upcoming input, i.e. for error messages
		upcomingInput:function () {
		        var next = this.match;
		        if (next.length < 20) {
		            next += this._input.substr(0, 20-next.length);
		        }
		        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
		    },

		// displays the character position where the lexing error occurred, i.e. for error messages
		showPosition:function () {
		        var pre = this.pastInput();
		        var c = new Array(pre.length + 1).join("-");
		        return pre + this.upcomingInput() + "\n" + c + "^";
		    },

		// test the lexed token: return FALSE when not a match, otherwise return token
		test_match:function(match, indexed_rule) {
		        var token,
		            lines,
		            backup;

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
		            last_column: lines ?
		                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
		                         this.yylloc.last_column + match[0].length
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
		next:function () {
		        if (this.done) {
		            return this.EOF;
		        }
		        if (!this._input) {
		            this.done = true;
		        }

		        var token,
		            match,
		            tempMatch,
		            index;
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
		lex:function lex () {
		        var r = this.next();
		        if (r) {
		            return r;
		        } else {
		            return this.lex();
		        }
		    },

		// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
		begin:function begin (condition) {
		        this.conditionStack.push(condition);
		    },

		// pop the previously active lexer condition state off the condition stack
		popState:function popState () {
		        var n = this.conditionStack.length - 1;
		        if (n > 0) {
		            return this.conditionStack.pop();
		        } else {
		            return this.conditionStack[0];
		        }
		    },

		// produce the lexer rule set which is active for the currently active lexer condition state
		_currentRules:function _currentRules () {
		        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
		            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
		        } else {
		            return this.conditions["INITIAL"].rules;
		        }
		    },

		// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
		topState:function topState (n) {
		        n = this.conditionStack.length - 1 - Math.abs(n || 0);
		        if (n >= 0) {
		            return this.conditionStack[n];
		        } else {
		            return "INITIAL";
		        }
		    },

		// alias for begin(condition)
		pushState:function pushState (condition) {
		        this.begin(condition);
		    },

		// return the number of states currently on the stack
		stateStackSize:function stateStackSize() {
		        return this.conditionStack.length;
		    },
		options: {},
		performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
		switch($avoiding_name_collisions) {
		case 0:/* skip whitespace */
		break;
		case 1:return 34
		case 2:return 35
		case 3:return 15
		case 4:return 16
		case 5:return 14
		case 6:return 13
		case 7:return 18
		case 8:return 17
		case 9:return ">="
		case 10:return "<="
		case 11:return 19
		case 12:return 20
		case 13:return "=="
		case 14:return "!="
		case 15:return "||"
		case 16:return "&&"
		case 17:return "?"
		case 18:return ":"
		case 19:return 27
		case 20:return 28
		case 21:return 11
		case 22:return 12
		case 23:return 7
		case 24:return 9
		case 25:return 31
		case 26:return 32
		case 27:return 10
		case 28:return 33
		case 29:return 5
		case 30:return 'INVALID'
		}
		},
		rules: [/^(?:\s+)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:\b0x[0-9A-Fa-f]+\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\^)/,/^(?:%)/,/^(?:>=)/,/^(?:<=)/,/^(?:>)/,/^(?:<)/,/^(?:==)/,/^(?:!=)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:\?)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:\.)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:[^\s\*\/\-\+\^\%\>\=\<\!\|\&\?\:\(\)\[\]\,\.\"\']+)/,/^(?:"(\\.|[^\"\\])*"|'(\\.|[^\'\\])*')/,/^(?:$)/,/^(?:.)/],
		conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],"inclusive":true}}
		});
		return lexer;
		})();
		parser.lexer = lexer;
		function Parser () {
		  this.yy = {};
		}
		Parser.prototype = parser;parser.Parser = Parser;
		return new Parser;
		})();


		if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
		exports.parser = parser;
		exports.Parser = parser.Parser;
		exports.parse = function () { return parser.parse.apply(parser, arguments); };
		} 
	} (parser$3));

	var parser$2 = /*@__PURE__*/getDefaultExportFromCjs(parser$3);

	var GetProperty = function (context, key, defaultValue, dotMode) {
	    if (dotMode === undefined) {
	        dotMode = true;
	    }

	    if (!context || typeof (context) === 'number' || typeof (context) === 'string') {
	        return defaultValue;
	    } else if (key in context) {
	        return context[key];
	    } else if (dotMode &&
	        ((Array.isArray(key) || (key.indexOf('.') !== -1)))
	    ) {
	        var keys = (Array.isArray(key)) ? key : key.split('.');
	        var value = context;
	        //  Use for loop here so we can break early
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (key in value) {
	                value = value[key];
	            }
	            else {
	                value = defaultValue;
	                break;
	            }
	        }

	        return value;
	    } else {
	        return defaultValue;
	    }
	};

	class FormulaParser extends parser$2.Parser {
	    getProperty(context, name, defaultValue) {
	        var value = GetProperty(context, name, undefined, false);
	        if (value !== undefined) {
	            return value;
	        }
	        return GetProperty(this, name, defaultValue, false);
	    }

	    getDotProperty(context, name, defaultValue) {
	        var value = GetProperty(context, name, undefined, true);
	        if (value !== undefined) {
	            return value;
	        }
	        return GetProperty(this, name, defaultValue, true);
	    }

	    static GetProperty(context, key, defaultValue, dotMode) {
	        return GetProperty(context, key, defaultValue, dotMode);
	    }

	    _add(a, b) {
	        return a + b;
	    }

	    _subtract(a, b) {
	        return a - b;
	    }

	    _multiply(a, b) {
	        return a * b;
	    }

	    _divide(a, b) {
	        return a / b;
	    }

	    _mod(a, b) {
	        return a % b;
	    }

	    _pow(a, b) {
	        return Math.pow(a, b);
	    }

	    _greaterThen(a, b) {
	        return a > b;
	    }

	    _lessThen(a, b) {
	        return a < b;
	    }

	    _equalTo(a, b) {
	        return a == b;
	    }

	    _or(a, b) {
	        return a || b;
	    }

	    _and(a, b) {
	        return a && b;
	    }

	    defaultHandler(name, args) {
	        return 0;
	    }

	    compile(input) {
	        return this.parse(input);
	    }

	    exec(input, data) {
	        if (typeof (input) === 'string') {
	            input = this.compile(input);
	        }
	        return input(data);
	    }
	}

	var parser$1 = new FormulaParser();
	var Compile$1 = function(expression) {
	    return parser$1.compile(expression);
	};

	class Expression extends BaseExpression {
	    constructor(expression) {
	        super();

	        var callback;
	        if (typeof (expression) === 'number') {
	            callback = function () {
	                return expression;
	            };
	        } else {
	            callback = Compile$1(expression);
	        }

	        this.setExpressionHandler(callback);
	    }
	}

	class BooleanExpression extends Expression {
	    eval(context) {
	        return !!super.eval(context);
	    }
	}

	class StringTemplate {
	    constructor(config) {
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

	    setDelimiters(delimiterLeft, delimiterRight) {
	        if (delimiterRight === undefined) {
	            delimiterRight = delimiterLeft[1];
	            delimiterLeft = delimiterLeft[0];
	        }
	        this.delimiterLeft = delimiterLeft;
	        this.delimiterRight = delimiterRight;

	        this.reDelimiter = RegExp(`${delimiterLeft}|${delimiterRight}`, 'gi');
	        this.reSplit = RegExp(`${delimiterLeft}.*?${delimiterRight}`, 'gi');
	        return this;
	    }

	    setExpressionParser(expressionParser) {
	        this.expressionParser = expressionParser;
	        return this;
	    }

	    compile(content, config) {
	        // Store previous setting
	        // Override current setting        
	        var delimiterLeftSave, delimiterRightSave;
	        var expressionParserSave;
	        if (config) {
	            if (config instanceof (FormulaParser)) {
	                var expressionParser = config;
	                if (expressionParser) {
	                    expressionParserSave = this.expressionParser;
	                    this.setExpressionParser(expressionParser);
	                }

	            } else {
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
	        if (charIdx < totalLen) { // Push remainder string
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
	                if (typeof (item) === 'function') {
	                    item = item(view);
	                }
	                return item;
	            }).join('');
	        };
	    }

	    render(content, view, config) {
	        var f;
	        if (typeof (content) === 'string') {
	            f = this.compile(content, config);
	        } else {
	            f = content;
	        }
	        return f(view);
	    }
	}

	var stringTemplate = new StringTemplate();
	var Compile = function (content, config) {
	    return stringTemplate.compile(content, config);
	};

	class StringTemplateExpression extends BaseExpression {
	    constructor(expression) {
	        super();

	        var callback = Compile(expression);
	        this.setExpressionHandler(callback);
	    }
	}

	class BaseNode {

	    constructor(
	        {
	            id,
	            category,
	            name,
	            title,
	            description,
	            properties
	        } = {}
	    ) {

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

	    destroy() {
	        this.parent = undefined;
	        this.properties = undefined;
	    }

	    setTitle(title) {
	        this.title = title;
	        return this;
	    }

	    setName(name) {
	        this.name = name;
	        return this;
	    }

	    setDescription(description) {
	        this.description = description;
	        return this;
	    }

	    setParent(parent) {
	        this.parent = parent;
	        return this;
	    }

	    getParent() {
	        return this.parent;
	    }

	    getTree(tick) {
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

	    addExpression(expression) {
	        return new Expression(expression);
	    }

	    addBooleanExpression(expression) {
	        return new BooleanExpression(expression);
	    }

	    addStringTemplateExpression(expression) {
	        // TODO: Use mustache or handlebars ?
	        return new StringTemplateExpression(expression);
	    }

	    _execute(tick) {
	        // ENTER
	        this._enter(tick);

	        // OPEN
	        if (!this.getOpenState(tick)) {
	            this._open(tick);
	        }

	        // TICK
	        var status = this._tick(tick);

	        // CLOSE
	        if ((status === SUCCESS$1) || (status === FAILURE) ||
	            (status === ABORT) || (status === ERROR$1)) {
	            this._close(tick);
	        }

	        // EXIT
	        this._exit(tick);

	        return status;
	    }

	    _enter(tick) {
	        tick._enterNode(this);
	        this.enter(tick);
	    }

	    _open(tick) {
	        tick._openNode(this);
	        this.setOpenState(tick, true);
	        this.open(tick);
	    }

	    _tick(tick) {
	        tick._tickNode(this);
	        return this.tick(tick);
	    }

	    _close(tick) {
	        tick._closeNode(this);
	        this.setOpenState(tick, false);
	        this.close(tick);
	        // Children will be closed before parent, otherwise abort children
	        this.abortChildren(tick);
	    }

	    _exit(tick) {
	        tick._exitNode(this);
	        this.exit(tick);
	    }

	    _abort(tick) {
	        this._close(tick);
	        this.abort(tick);
	    }

	    enter(tick) { }

	    open(tick) { }

	    tick(tick) { }

	    close(tick) { }

	    exit(tick) { }

	    abortChildren(tick) { }

	    abort(tick) { }

	    // open state of this node
	    getNodeMemory(tick) {
	        return tick.getNodeMemory(this.id);
	    }

	    getOpenState(tick) {
	        return this.getNodeMemory(tick).$isOpen;
	    }

	    setOpenState(tick, state) {
	        if (state === undefined) {
	            state = true;
	        }
	        this.getNodeMemory(tick).$isOpen = state;
	        return this;
	    }

	    // Return state value
	    get SUCCESS() {
	        return SUCCESS$1;
	    }

	    get FAILURE() {
	        return FAILURE;
	    }

	    get RUNNING() {
	        return RUNNING$1;
	    }

	    get ERROR() {
	        return ERROR$1;
	    }
	}

	class Action extends BaseNode {

	    constructor(
	        {
	            name = 'Action',
	            title,
	            properties,
	            services,
	        } = {},
	        nodePool
	    ) {

	        super({
	            category: ACTION,
	            name,
	            title,
	            properties,
	        });

	        if (services) {
	            for (var i = 0, cnt = services.length; i < cnt; i++) {
	                this.addService(services[i], nodePool);
	            }
	        }
	    }

	    destroy() {
	        if (this.services) {
	            for (var i = 0, cnt = this.services.length; i < cnt; i++) {
	                this.services[i].destroy();
	            }
	        }
	        this.services = undefined;

	        super.destroy();
	    }

	    addService(node, nodePool) {
	        if (typeof (node) === 'string') {  // Node ID
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

	    _tick(tick) {
	        tick._tickNode(this);

	        if (this.services) {
	            for (var i = 0, cnt = this.services.length; i < cnt; i++) {
	                this.services[i]._tick(tick);
	            }
	        }

	        return this.tick(tick);
	    }

	}

	class Composite extends BaseNode {

	    constructor(
	        {
	            children = [],
	            name = 'Composite',
	            title,
	            properties,
	            services,
	        } = {},
	        nodePool
	    ) {

	        super({
	            category: COMPOSITE,
	            name,
	            title,
	            properties,
	        });

	        this.children = [];
	        for (var i = 0, cnt = children.length; i < cnt; i++) {
	            this.addChild(children[i], nodePool);
	        }

	        if (services) {
	            for (var i = 0, cnt = services.length; i < cnt; i++) {
	                this.addService(services[i], nodePool);
	            }
	        }
	    }

	    destroy() {
	        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
	            this.children[i].destroy();
	        }

	        if (this.services) {
	            for (var i = 0, cnt = this.services.length; i < cnt; i++) {
	                this.services[i].destroy();
	            }
	        }

	        this.children = undefined;
	        this.services = undefined;

	        super.destroy();
	    }

	    insertChild(node, nodePool, index) {
	        if (typeof (node) === 'string') {  // Node ID
	            node = nodePool[node];
	        }

	        if (this.children.indexOf(node) === -1) {
	            if (index < 0) {
	                index = this.children.length + index;
	            }
	            if ((index === undefined) || (index >= this.children.length)) {
	                this.children.push(node);
	            } else {
	                this.children.splice(index, 0, node);
	            }

	            node.setParent(this);
	        }

	        return this;
	    }

	    addChild(node, nodePool,) {
	        this.insertChild(node, nodePool);
	        return this;
	    }

	    addService(node, nodePool) {
	        if (typeof (node) === 'string') {  // Node ID
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

	    _tick(tick) {
	        tick._tickNode(this);

	        if (this.services) {
	            for (var i = 0, cnt = this.services.length; i < cnt; i++) {
	                this.services[i]._tick(tick);
	            }
	        }

	        return this.tick(tick);
	    }

	    abortChildren(tick) {
	        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
	            var childNode = this.children[i];
	            if (childNode.getOpenState(tick)) {
	                childNode._abort(tick);
	            }
	        }
	    }

	}

	class Decorator extends BaseNode {

	    constructor(
	        {
	            child = null,
	            name = 'Decorator',
	            title,
	            properties
	        } = {},
	        nodePool
	    ) {

	        super({
	            category: DECORATOR,
	            name,
	            title,
	            properties,
	        });

	        this.child = null;
	        if (child) {
	            this.addChild(child, nodePool);
	        }
	    }

	    destroy() {
	        if (this.child) {
	            this.child.destroy();
	        }

	        this.child = undefined;

	        super.destroy();
	    }

	    addChild(node, nodePool) {
	        if (typeof (node) === 'string') {  // Node ID
	            node = nodePool[node];
	        }

	        this.child = node;
	        node.setParent(this);
	        return this;
	    }

	    isChildRunning(tick) {
	        return this.child.getOpenState(tick);
	    }

	    abortChildren(tick) {
	        if (this.isChildRunning(tick)) {
	            this.child._abort(tick);
	        }
	    }

	    openChild(tick) {
	        this.child.setOpenState(tick, true);
	        return this;
	    }
	}

	class Service extends BaseNode {

	    constructor(
	        {
	            interval = 0,
	            randomDeviation = 0,
	            name = 'Service',
	            title,
	            properties
	        } = {}
	    ) {

	        if (properties === undefined) {
	            properties = {};
	        }

	        properties.interval = interval;
	        properties.randomDeviation = randomDeviation;

	        super({
	            category: SERVICE,
	            name,
	            title,
	            properties,
	        });

	        this.intervalExpression = this.addExpression(interval);
	        this.randomDeviationExpression = this.addExpression(randomDeviation);

	    }

	    _tick(tick) {
	        if (this.canTick(tick)) {
	            this.tick(tick);
	        }
	    }

	    canTick(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var currTime = tick.currentTime;
	        var lastEndTime = nodeMemory.$lastEndTime;
	        var interval = nodeMemory.$interval;

	        var canTick = (lastEndTime === undefined) ||
	            ((currTime - lastEndTime) >= interval);

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

	}

	class Succeeder extends Action {

	    constructor({
	        services,
	        title,
	        name = 'Succeeder'
	    } = {}) {

	        super({
	            services,
	            title,
	            name,
	        });
	    }

	    tick(tick) {
	        return SUCCESS$1;
	    }
	}

	class Failer extends Action {

	    constructor({
	        services,
	        title,
	        name = 'Failer'
	    } = {}) {

	        super({
	            services,
	            title,
	            name,
	        });
	    }

	    tick(tick) {
	        return FAILURE;
	    }
	}

	class Runner extends Action {

	    constructor({
	        services,
	        title,
	        name = 'Runner'
	    } = {}) {

	        super({
	            services,
	            title,
	            name,
	        });
	    }

	    tick(tick) {
	        return RUNNING$1;
	    }
	}

	let Error$1 = class Error extends Action {

	    constructor({
	        services,
	        title,
	        name = 'Error',
	    } = {}) {

	        super({
	            services,
	            title,
	            name,
	        });
	    }

	    tick(tick) {
	        return ERROR$1;
	    }
	};

	class Wait extends Action {

	    constructor({
	        duration = 0,
	        services,
	        title,
	        name = 'Wait'
	    } = {}) {

	        super({
	            title,
	            name,
	            properties: {
	                duration
	            },
	            services,
	        });

	        this.durationExpression = this.addExpression(duration);
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);

	        nodeMemory.$startTime = tick.currentTime;
	        nodeMemory.$duration = tick.evalExpression(this.durationExpression);
	    }

	    tick(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var currTime = tick.currentTime;
	        var startTime = nodeMemory.$startTime;
	        var duration = nodeMemory.$duration;

	        if (duration > 0) {
	            if ((currTime - startTime) < duration) {
	                return RUNNING$1;
	            }

	        } else if (duration === 0) { // Wait 1 tick            
	            if (currTime === startTime) {
	                return RUNNING$1;
	            }
	        }

	        return SUCCESS$1;
	    }
	}

	class Abort extends Action {

	    constructor({
	        services,
	        title,
	        name = 'Abort',
	    } = {}) {

	        super({
	            services,
	            title,
	            name,
	        });
	    }

	    tick(tick) {
	        return ABORT;
	    }
	}

	class Selector extends Composite {
	    constructor(
	        {
	            children = [],
	            services,
	            title,
	            name = 'Selector'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                children,
	                services,
	                title,
	                name,
	            },
	            nodePool
	        );

	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$runningChild = -1;  // No running child
	    }

	    tick(tick) {
	        if (this.children.length === 0) {
	            return ERROR$1;
	        }

	        var nodeMemory = this.getNodeMemory(tick);
	        var childIndex = nodeMemory.$runningChild;
	        var status;
	        if (childIndex < 0) {
	            for (var i = 0, cnt = this.children.length; i < cnt; i++) {
	                status = this.children[i]._execute(tick);

	                if ((status === RUNNING$1) || (status === SUCCESS$1) || (status === ABORT)) {
	                    childIndex = i;
	                    break;
	                }
	            }
	        } else {
	            var child = this.children[childIndex];
	            status = child._execute(tick);
	        }

	        nodeMemory.$runningChild = (status === RUNNING$1) ? childIndex : -1;
	        return status;
	    }

	    abortChildren(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var child = this.children[nodeMemory.$runningChild];
	        if (child) {
	            child._abort(tick);
	            nodeMemory.$runningChild = -1;
	        }
	    }
	}

	class Sequence extends Composite {
	    constructor(
	        {
	            children = [],
	            services,
	            title,
	            name = 'Sequence'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                children,
	                services,
	                title,
	                name,
	            },
	            nodePool
	        );

	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$runningChild = 0;
	    }

	    tick(tick) {
	        if (this.children.length === 0) {
	            return ERROR$1;
	        }

	        var nodeMemory = this.getNodeMemory(tick);

	        var childIndex = nodeMemory.$runningChild;
	        var status;
	        for (var i = childIndex, cnt = this.children.length; i < cnt; i++) {
	            status = this.children[i]._execute(tick);

	            if ((status === RUNNING$1) || (status === FAILURE) || (status === ABORT)) {
	                break;
	            }
	        }

	        nodeMemory.$runningChild = (status === RUNNING$1) ? i : -1;
	        return status;
	    }

	    abortChildren(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var child = this.children[nodeMemory.$runningChild];
	        if (child) {
	            child._abort(tick);
	            nodeMemory.$runningChild = -1;
	        }
	    }
	}

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

	class Parallel extends Composite {
	    constructor(
	        {
	            finishMode = 0,
	            returnSuccess = true,
	            children = [],
	            services,
	            title,
	            name = 'Parallel'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                children,
	                services,
	                title,
	                name,
	                properties: {
	                    finishMode,
	                    returnSuccess
	                },
	            },
	            nodePool
	        );

	        this.finishMode = finishMode;
	        this.returnSuccess = returnSuccess;
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$runningChildren = this.children.map((child, index) => index);
	    }

	    tick(tick) {
	        if (this.children.length === 0) {
	            return ERROR$1;
	        }

	        var nodeMemory = this.getNodeMemory(tick);
	        var childIndexes = nodeMemory.$runningChildren;
	        var statusMap = {};
	        var hasAnyFinishStatus = false;
	        var hasAnyRunningStatus = false;
	        var hasAnyAbortStatus = false;
	        var hasAnyErrorStatus = false;
	        for (var i = 0, cnt = childIndexes.length; i < cnt; i++) {
	            var childIndex = childIndexes[i];
	            var status = this.children[childIndex]._execute(tick);
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
	                if ((status === SUCCESS$1) || (status === FAILURE)) {
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
	            } else if (hasAnyRunningStatus) {
	                return RUNNING$1;
	            } else if (this.returnSuccess) {
	                return SUCCESS$1;
	            } else {
	                return nodeMemory.$mainTaskStatus;
	            }
	        }
	    }

	    abortChildren(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var childIndexes = nodeMemory.$runningChildren;
	        for (var i = 0, cnt = childIndexes.length; i < cnt; i++) {
	            var childIndex = childIndexes[i];
	            this.children[childIndex]._abort(tick);
	        }
	        nodeMemory.$runningChildren.length = 0;
	    }
	}

	class IfSelector extends Composite {
	    constructor(
	        {
	            expression = 'true',
	            conditionEvalBreak = false,
	            children = [],
	            services,
	            title,
	            name = 'IfSelector'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                children: children,
	                services,
	                title,
	                name,
	                properties: {
	                    expression,
	                    conditionEvalBreak,
	                },
	            },
	            nodePool
	        );

	        this.expression = this.addBooleanExpression(expression);
	        this.conditionEvalBreak = conditionEvalBreak;
	        this.forceSelectChildIndex = undefined;
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$runningChild = -1;  // No running child
	    }

	    setSelectChildIndex(index) {
	        this.forceSelectChildIndex = index;
	        return this;
	    }

	    evalCondition(tick) {
	        if (this.forceSelectChildIndex !== undefined) {
	            return this.forceSelectChildIndex;
	        }

	        return tick.evalExpression(this.expression) ? 0 : 1;
	    }

	    tick(tick) {
	        if (this.children.length === 0) {
	            return ERROR$1;
	        }

	        var nodeMemory = this.getNodeMemory(tick);
	        var childIndex = nodeMemory.$runningChild;
	        if (childIndex < 0) {
	            childIndex = this.evalCondition(tick);
	            if (this.conditionEvalBreak) {
	                // Resolve runningChild index, but not run child now
	                nodeMemory.$runningChild = childIndex;
	                return RUNNING$1;
	            }
	        }

	        var child = this.children[childIndex];
	        var status = child._execute(tick);
	        nodeMemory.$runningChild = (status === RUNNING$1) ? childIndex : -1;

	        return status;
	    }

	    abortChildren(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var child = this.children[nodeMemory.$runningChild];
	        if (child) {
	            child._abort(tick);
	            nodeMemory.$runningChild = -1;
	        }
	    }
	}

	class SwitchSelector extends Composite {
	    constructor(
	        {
	            expression = null,
	            keys = undefined, // Or [key, ...]
	            conditionEvalBreak = false,
	            children = {},    // Or [child, ...]
	            services,
	            title,
	            name = 'SwitchSelector'
	        } = {},
	        nodePool
	    ) {

	        if (keys === undefined) {
	            keys = Object.keys(children);
	            children = Object.values(children);
	        }

	        super(
	            {
	                children: children,
	                services,
	                title,
	                name,
	                properties: {
	                    expression,
	                    keys,
	                    conditionEvalBreak,
	                },
	            },
	            nodePool
	        );

	        this.expression = this.addExpression(expression);
	        this.keys = keys;  // Index of children
	        this.conditionEvalBreak = conditionEvalBreak;
	        this.forceSelectChildIndex = undefined;
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$runningChild = -1;  // No running child
	    }

	    setSelectChildIndex(index) {
	        this.forceSelectChildIndex = index;
	        return this;
	    }

	    evalCondition(tick) {
	        if (this.forceSelectChildIndex !== undefined) {
	            if (typeof (this.forceSelectChildIndex) === 'number') {
	                return this.forceSelectChildIndex;
	            } else {
	                return this.keys.indexOf(this.forceSelectChildIndex);
	            }
	        }

	        var key = tick.evalExpression(this.expression);
	        return this.keys.indexOf(key);
	    }

	    tick(tick) {
	        if (this.children.length === 0) {
	            return ERROR$1;
	        }

	        var nodeMemory = this.getNodeMemory(tick);
	        var childIndex = nodeMemory.$runningChild;
	        if (childIndex < 0) {
	            childIndex = this.evalCondition(tick);
	            if (childIndex === -1) {
	                childIndex = this.keys.indexOf('default');
	            }
	            if (childIndex === -1) {
	                return ERROR$1;
	            }
	            if (this.conditionEvalBreak) {
	                // Resolve runningChild index, but not run child now
	                nodeMemory.$runningChild = childIndex;
	                return RUNNING$1;
	            }
	        }

	        var child = this.children[childIndex];
	        var status = child._execute(tick);
	        nodeMemory.$runningChild = (status === RUNNING$1) ? childIndex : -1;
	        return status;
	    }

	    abortChildren(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var child = this.children[nodeMemory.$runningChild];
	        if (child) {
	            child._abort(tick);
	            nodeMemory.$runningChild = -1;
	        }
	    }
	}

	class WeightSelector extends Composite {
	    constructor(
	        {
	            expression = null,
	            weights = undefined,    // Or [weight, ...]
	            conditionEvalBreak = false,
	            children = [],          // [node, ...], or [{weight, node}, ...]
	            services,
	            title,
	            name = 'WeightSelector'
	        } = {},
	        nodePool
	    ) {

	        if (weights === undefined) {
	            weights = [];

	            var totalWeight = 0;
	            for (var i = 0, cnt = children.length; i < cnt; i++) {
	                var child = children[i];
	                var weight;
	                if ((child instanceof BaseNode) || (typeof (child) === 'string')) {
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

	        super(
	            {
	                children: children,
	                services,
	                title,
	                name,
	                properties: {
	                    expression,
	                    weights,
	                    conditionEvalBreak,
	                },
	            },
	            nodePool
	        );

	        this.expression = (expression) ? this.addExpression(expression) : null;
	        this.weights = weights;
	        this.conditionEvalBreak = conditionEvalBreak;
	        this.forceSelectChildIndex = undefined;
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$runningChild = -1;  // No running child
	    }

	    setSelectChildIndex(index) {
	        if (this.forceSelectChildIndex !== undefined) {
	            return this.forceSelectChildIndex;
	        }

	        this.forceSelectChildIndex = index;
	        return this;
	    }

	    evalCondition(tick) {
	        if (this.forceSelectChildIndex !== undefined) {
	            return this.forceSelectChildIndex;
	        }

	        var value = (this.expression) ? tick.evalExpression(this.expression) : Math.random();
	        for (var i = 0, cnt = this.weights.length; i < cnt; i++) {
	            value -= this.weights[i];
	            if (value < 0) {
	                return i;
	            }
	        }
	    }

	    tick(tick) {
	        if (this.children.length === 0) {
	            return ERROR$1;
	        }

	        var nodeMemory = this.getNodeMemory(tick);
	        var childIndex = nodeMemory.$runningChild;
	        if (childIndex < 0) {
	            childIndex = this.evalCondition(tick);
	            if (childIndex === undefined) {
	                childIndex = this.children.length - 1;
	            }
	            if (this.conditionEvalBreak) {
	                // Resolve runningChild index, but not run child now
	                nodeMemory.$runningChild = childIndex;
	                return RUNNING$1;
	            }
	        }

	        var child = this.children[childIndex];
	        var status = child._execute(tick);
	        nodeMemory.$runningChild = (status === RUNNING$1) ? childIndex : -1;
	        return status;
	    }

	    abortChildren(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var child = this.children[nodeMemory.$runningChild];
	        if (child) {
	            child._abort(tick);
	            nodeMemory.$runningChild = -1;
	        }
	    }
	}

	class RandomSelector extends Composite {
	    constructor(
	        {
	            children = [],
	            services,
	            title,
	            name = 'RandomSelector'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                children,
	                services,
	                title,
	                name,
	            },
	            nodePool
	        );

	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$runningChild = -1;  // No running child
	    }

	    tick(tick) {
	        if (this.children.length === 0) {
	            return ERROR;
	        }

	        var nodeMemory = this.getNodeMemory(tick);
	        var childIndex = nodeMemory.$runningChild;
	        if (childIndex < 0) {
	            childIndex = Math.floor(Math.random() * this.children.length);
	        }

	        var child = this.children[childIndex];
	        var status = child._execute(tick);
	        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;
	        return status;
	    }

	    abortChildren(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var child = this.children[nodeMemory.$runningChild];
	        if (child) {
	            child._abort(tick);
	            nodeMemory.$runningChild = -1;
	        }
	    }
	}

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

	class ShuffleSelector extends Composite {
	    constructor(
	        {
	            children = [],
	            services,
	            title,
	            name = 'ShuffleSelector'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                children,
	                services,
	                title,
	                name,
	            },
	            nodePool
	        );

	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$runningChild = 0;

	        if (!nodeMemory.$children) {
	            nodeMemory.$children = this.children.map((child, index) => index);
	        }
	        Shuffle(nodeMemory.$children);
	    }

	    tick(tick) {
	        if (this.children.length === 0) {
	            return ERROR$1;
	        }

	        var nodeMemory = this.getNodeMemory(tick);

	        var childIndex = nodeMemory.$runningChild;
	        var children = nodeMemory.$children;
	        var status;
	        for (var i = childIndex, cnt = children.length; i < cnt; i++) {
	            status = this.children[children[i]]._execute(tick);

	            if ((status === RUNNING$1) || (status === SUCCESS$1) || (status === ABORT)) {
	                break;
	            }
	        }

	        nodeMemory.$runningChild = (status === RUNNING$1) ? i : -1;
	        return status;
	    }

	    abortChildren(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        var child = this.children[nodeMemory.$runningChild];
	        if (child) {
	            child._abort(tick);
	            nodeMemory.$runningChild = -1;
	        }
	    }
	}

	class Bypass extends Decorator {

	    constructor(
	        {
	            child = null,
	            title,
	            name = 'Bypass'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	            },
	            nodePool
	        );
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // Won't abort child
	        var status = this.child._execute(tick);

	        return status;
	    }
	}

	class ForceSuccess extends Decorator {

	    constructor(
	        {
	            child = null,
	            title,
	            name = 'ForceSuccess'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                },
	            },
	            nodePool
	        );
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        var status = this.child._execute(tick);

	        if (status === FAILURE) {
	            return SUCCESS$1;
	        }

	        return status;
	    }
	}

	class ForceFailure extends Decorator {

	    constructor(
	        {
	            child = null,
	            title,
	            name = 'ForceFailure'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                },
	            },
	            nodePool
	        );

	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        var status = this.child._execute(tick);

	        if (status === SUCCESS$1) {
	            return FAILURE;
	        }

	        return status;
	    }
	}

	class Invert extends Decorator {
	    constructor(
	        {
	            child = null,
	            title,
	            name = 'Invert'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	            },
	            nodePool
	        );
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        var status = this.child._execute(tick);

	        if (status === SUCCESS$1) {
	            status = FAILURE;
	        } else if (status === FAILURE) {
	            status = SUCCESS$1;
	        }

	        return status;
	    }
	}

	class TimeLimit extends Decorator {
	    constructor(
	        {
	            duration = 0,
	            returnSuccess = true,
	            child = null,
	            title,
	            name = 'TimeLimit'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                    duration,
	                    returnSuccess
	                },
	            },
	            nodePool
	        );

	        this.durationExpression = this.addExpression(duration);
	        this.returnSuccess = returnSuccess;
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$startTime = tick.currentTime;
	        nodeMemory.$duration = tick.evalExpression(this.durationExpression);
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // Abort child when timeout
	        var nodeMemory = this.getNodeMemory(tick);
	        var currTime = tick.currentTime;
	        var startTime = nodeMemory.$startTime;
	        var duration = nodeMemory.$duration;

	        if ((currTime - startTime) >= duration) {
	            return (this.returnSuccess) ? SUCCESS : FAILURE;
	        }

	        var status = this.child._execute(tick);

	        return status;
	    }
	}

	class Cooldown extends Decorator {
	    constructor(
	        {
	            duration = 0,
	            child = null,
	            title,
	            name = 'Cooldown'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                    duration
	                },
	            },
	            nodePool
	        );

	        this.durationExpression = this.addExpression(duration);
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$cooldownTime = tick.evalExpression(this.durationExpression);
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // Won't abort child
	        var nodeMemory = this.getNodeMemory(tick);
	        var currTime = tick.currentTime;
	        var lastEndTime = nodeMemory.$lastEndTime;
	        var cooldownTime = nodeMemory.$cooldownTime;

	        // Open child after cooldown timeout
	        if (
	            (lastEndTime !== undefined) &&
	            ((currTime - lastEndTime) < cooldownTime)
	        ) {
	            return FAILURE;
	        }

	        var status = this.child._execute(tick);

	        if ((status === SUCCESS$1) || (status === FAILURE) || (status === ABORT)) {
	            nodeMemory.$lastEndTime = currTime;
	        }

	        return status;
	    }
	}

	class Repeat extends Decorator {

	    constructor(
	        {
	            maxLoop = -1,
	            child = null,
	            title,
	            name = 'Repeat'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                    maxLoop
	                },
	            },
	            nodePool
	        );

	        this.maxLoopExpression = this.addExpression(maxLoop);
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
	        nodeMemory.$i = 0;
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        var nodeMemory = this.getNodeMemory(tick);
	        var maxLoop = nodeMemory.$maxLoop;
	        var i = nodeMemory.$i;
	        var status = SUCCESS$1;

	        // Open child before exceed maxLoop
	        // Execute child many times in a tick
	        while (maxLoop < 0 || i < maxLoop) {
	            status = this.child._execute(tick);

	            if ((status === SUCCESS$1) || (status === FAILURE)) {
	                i++;
	            } else {
	                break;
	            }
	        }

	        nodeMemory.$i = i;
	        return status;
	    }
	}

	class RepeatUntilFailure extends Decorator {

	    constructor(
	        {
	            maxLoop = -1,
	            returnSuccess = false,
	            child = null,
	            title,
	            name = 'RepeatUntilFailure',
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                    returnSuccess,
	                    maxLoop
	                },
	            },
	            nodePool
	        );

	        this.maxLoopExpression = this.addExpression(maxLoop);
	        this.returnSuccess = returnSuccess;
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
	        nodeMemory.$i = 0;
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // Won't abort child
	        var nodeMemory = this.getNodeMemory(tick);
	        var maxLoop = nodeMemory.$maxLoop;
	        var i = nodeMemory.$i;
	        var status = ERROR$1;

	        // Open child before exceed maxLoop
	        // Execute child many times in a tick
	        while ((maxLoop < 0) || (i < maxLoop)) {
	            status = this.child._execute(tick);

	            if (status === SUCCESS$1) {
	                i++;
	            } else {
	                break;
	            }
	        }

	        nodeMemory.$i = i;

	        if ((status === this.FAILURE) && this.returnSuccess) {
	            status = SUCCESS$1;
	        }

	        return status;
	    }
	}

	class RepeatUntilSuccess extends Decorator {

	    constructor(
	        {
	            maxLoop = -1,
	            child = null,
	            title,
	            name = 'RepeatUntilSuccess'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                    maxLoop
	                },
	            },
	            nodePool
	        );

	        this.maxLoopExpression = this.addExpression(maxLoop);
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
	        nodeMemory.$i = 0;
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // Won't abort child
	        var nodeMemory = this.getNodeMemory(tick);
	        var maxLoop = nodeMemory.$maxLoop;
	        var i = nodeMemory.$i;
	        var status = ERROR$1;

	        // Open child before exceed maxLoop
	        // Execute child many times in a tick
	        while (maxLoop < 0 || i < maxLoop) {
	            status = this.child._execute(tick);

	            if (status === FAILURE) {
	                i++;
	            } else {
	                break;
	            }
	        }

	        nodeMemory.$i = i;
	        return status;
	    }
	}

	class Limiter extends Decorator {

	    constructor(
	        {
	            maxLoop = 1,
	            child = null,
	            title,
	            name = 'Limiter'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                    maxLoop
	                },
	            },
	            nodePool
	        );

	        this.maxLoopExpression = this.addExpression(maxLoop);
	    }

	    open(tick) {
	        var nodeMemory = this.getNodeMemory(tick);
	        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
	        nodeMemory.$i = 0;
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // Won't abort child
	        var nodeMemory = this.getNodeMemory(tick);
	        var maxLoop = nodeMemory.$maxLoop;
	        var i = nodeMemory.$i;

	        // Open child before exceed maxLoop
	        // Execute child 1 time in a tick
	        if (i >= maxLoop) {
	            return FAILURE;
	        }

	        var status = this.child._execute(tick);
	        if ((status === SUCCESS$1) || (status === FAILURE)) {
	            nodeMemory.$i = i + 1;
	        }

	        return status;
	    }
	}

	class If extends Decorator {

	    constructor(
	        {
	            expression = 'true',
	            conditionEvalBreak = false,
	            child = null,
	            title,
	            name = 'If'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                    expression,
	                    conditionEvalBreak
	                },
	            },
	            nodePool
	        );

	        this.expression = this.addBooleanExpression(expression);
	        this.conditionEvalBreak = conditionEvalBreak;
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // child is not running
	        if (!this.isChildRunning(tick)) {
	            // Return FAILURE to run next node
	            if (!tick.evalExpression(this.expression)) {
	                return FAILURE;
	            } else if (this.conditionEvalBreak) {
	                // Open child but not run it now
	                this.openChild();
	                return RUNNING;
	            }
	        }

	        var status = this.child._execute(tick);

	        return status;
	    }
	}

	class ContinueIf extends Decorator {

	    constructor(
	        {
	            expression = 'true',
	            returnSuccess = true,
	            child = null,
	            title,
	            name = 'ContinueIf'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                    expression,
	                    returnSuccess,
	                },
	            },
	            nodePool
	        );

	        this.expression = this.addBooleanExpression(expression);
	        this.returnSuccess = returnSuccess;
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // child is running
	        if (this.isChildRunning(tick)) {
	            // Abort child if eval result is false
	            if (!tick.evalExpression(this.expression)) {
	                return (this.returnSuccess) ? SUCCESS$1 : FAILURE;
	            }
	        }

	        var status = this.child._execute(tick);

	        return status;
	    }
	}

	class AbortIf extends Decorator {

	    constructor(
	        {
	            expression = 'true',
	            returnSuccess = true,
	            child = null,
	            title,
	            name = 'AbortIf'
	        } = {},
	        nodePool
	    ) {

	        super(
	            {
	                child,
	                title,
	                name,
	                properties: {
	                    expression,
	                    returnSuccess,
	                },
	            },
	            nodePool
	        );

	        this.expression = this.addBooleanExpression(expression);
	        this.returnSuccess = returnSuccess;
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // child is running
	        if (this.isChildRunning(tick)) {
	            // Abort child if eval result is true
	            if (tick.evalExpression(this.expression)) {
	                return (this.returnSuccess) ? SUCCESS$1 : FAILURE;
	            }
	        }

	        var status = this.child._execute(tick);

	        return status;
	    }
	}

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

	var Load = function (data, names) {
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
	            throw new EvalError(`BehaviorTree.load: Invalid node name "${className}".`);
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

	        config = Object.assign(
	            config,
	            spec.properties,
	        );

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

	class Tick {

	    constructor() {
	        // set by BehaviorTree

	        this.tree = null;

	        this.blackboard = null;

	        this.target = null;

	        // updated during the tick signal

	        this._openNodes = [];  // Open nodes of current tick

	        this._nodeCount = 0;

	        this._currentNode = null;

	        this._currentTime = undefined;
	    }

	    destroy() {
	        this.tree = null;
	        this.blackboard = null;
	        this.target = null;
	        this._openNodes.length = 0;
	    }

	    // Set members
	    setTree(tree) {
	        this.tree = tree;
	        return this;
	    }

	    setBlackBoard(blackboard) {
	        this.blackboard = blackboard;
	        return this;
	    }

	    setTarget(target) {
	        this.target = target;
	        return this;
	    }

	    reset() {
	        this._openNodes.length = 0;
	        this._nodeCount = 0;
	        this._currentTime = undefined;
	        return this;
	    }

	    getGlobalMemory() {
	        return this.blackboard.getGlobalMemory();
	    }

	    getTreeMemory() {
	        return this.blackboard.getTreeMemory(this.tree.id);
	    }

	    getNodeMemory(nodeID) {
	        return this.blackboard.getNodeMemory(this.tree.id, nodeID);
	    }

	    get currentTime() {
	        if (this.blackboard.hasValidCurrentTime()) {
	            // Inject current-time through blackboard
	            return this.blackboard.getCurrentTime();
	        } else {
	            if (this._currentTime === undefined) {
	                this._currentTime = (new Date()).getTime();
	            }
	            return this._currentTime;
	        }
	    }

	    evalExpression(expression) {
	        return expression.eval(this.blackboard.getGlobalMemory());
	    }

	    _enterNode(node) {
	        this._nodeCount++;
	        this._openNodes.push(node);
	        this._currentNode = node;
	    }

	    _openNode(node) {
	        this._currentNode = node;
	    }

	    _tickNode(node) {
	        this._currentNode = node;
	    }

	    _closeNode(node) {
	        Remove(this._openNodes, node);
	        this._currentNode = node;
	    }

	    _exitNode(node) {
	        this._currentNode = node;
	    }
	}

	class BehaviorTree {

	    constructor(
	        {
	            id,
	            title,
	            description,
	            properties,
	            root = null
	        } = {}
	    ) {

	        if (id === undefined) {
	            id = CreateID();
	        }

	        this.id = id;

	        this.category = TREE;

	        this.title = title || '';

	        this.description = description || '';

	        this.properties = properties || {};

	        this._root = root;

	        this.ticker = (new Tick()).setTree(this);
	    }

	    destroy() {
	        this._root.destroy();
	        this.ticker.destroy();

	        this._root = undefined;
	        this.ticker = undefined;
	    }

	    setTitle(title) {
	        this.title = title;
	        return this;
	    }

	    setName(name) {
	        this.name = name;
	        return this;
	    }

	    setDescription(description) {
	        this.description = description;
	        return this;
	    }

	    setRoot(node) {
	        this.root = node;
	        return this;
	    }

	    getRoot() {
	        return this.root;
	    }

	    get root() {
	        return this._root;
	    }

	    set root(node) {
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

	    forEachNode(callback, scope) {
	        BreadthFirstSearch(this.root, callback, scope);
	        return this;
	    }

	    getAllNodes(out) {
	        if (out === undefined) {
	            out = [];
	        }
	        this.forEachNode(function (node) {
	            out.push(node);
	        });
	        return out;
	    }

	    getChildrenNodes(parent, out) {
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

	    tick(blackboard, target) {
	        if (!blackboard) {
	            throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
	        }

	        var ticker = this.ticker;
	        ticker
	            .setBlackBoard(blackboard)
	            .setTarget(target)
	            .reset();

	        /* TICK NODE */
	        var state = this.root._execute(ticker);

	        /* POPULATE BLACKBOARD */
	        // blackboard.set('$openNodes', ticker._openNodes.slice(0), this.id);
	        // blackboard.set('$nodeCount', ticker._nodeCount, this.id);
	        blackboard.set(TREE_STATE, state, this.id);

	        return state;
	    }

	    abort(blackboard, target) {
	        if (!blackboard) {
	            throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
	        }

	        var ticker = this.ticker;
	        ticker
	            .setBlackBoard(blackboard)
	            .setTarget(target)
	            .reset();

	        /* ABORT NODE */
	        this.root.abortChildren(ticker);

	        /* POPULATE BLACKBOARD */
	        blackboard.set(TREE_STATE, IDLE$1, this.id);

	        return IDLE$1;
	    }

	    static setStartIDValue(value) {
	        SetSerialNumber(value);
	    }

	    static getSerialNumber() {
	        return GetSerialNumber();
	    }

	    static setSerialIDPrefix(prefix) {
	        SetSerialNumberPrefix(prefix);
	    }
	}
	var Methods$5 = {
	    dump: Dump,
	    load: Load,
	};
	Object.assign(
	    BehaviorTree.prototype,
	    Methods$5,
	    DataMethods$4,
	);

	var IsInValidKey$1 = function (keys) {
	    return (keys == null) || (keys === '') || (keys.length === 0);
	};

	var GetEntry$1 = function (target, keys, defaultEntry) {
	    var entry = target;
	    if (IsInValidKey$1(keys)) ; else {
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
	    else if (IsInValidKey$1(keys)) {
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
	        var entry = GetEntry$1(target, keys);
	        entry[lastKey] = value;
	    }

	    return target;
	};

	var GetValue$h = function (source, key, defaultValue) {
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

	var HasValue = function (source, key) {
	    if (!source || typeof source === 'number') {
	        return false;
	    }
	    else if (source.hasOwnProperty(key)) {
	        return true;
	    }
	    else if (key.indexOf('.') !== -1) {
	        var keys = key.split('.');
	        var parent = source;

	        //  Use for loop here so we can break early
	        for (var i = 0; i < keys.length; i++) {
	            if (parent.hasOwnProperty(keys[i])) {
	                parent = parent[keys[i]];
	            }
	            else {
	                //  Can't go any further
	                return false;
	            }
	        }

	        return true;
	    }
	    else {
	        return false;
	    }
	};

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
	                return;
	            }

	            entry = entry[key];
	        }
	    }

	    return entry;
	};

	var RemoveKey = function (target, keys, delimiter) {
	    if (delimiter === undefined) {
	        delimiter = '.';
	    }

	    // no object
	    if (typeof (target) !== 'object') {
	        return;
	    }

	    // invalid key
	    else if (IsInValidKey(keys)) ; else {
	        if (typeof (keys) === 'string') {
	            keys = keys.split(delimiter);
	        }

	        var lastKey = keys.pop();
	        var entry = GetEntry(target, keys);
	        if (entry) {
	            delete entry[lastKey];
	        }
	    }

	    return target;
	};

	let Blackboard$1 = class Blackboard {

	    constructor() {
	        this._baseMemory = {};
	        this._treeMemory = {};

	        // Global memory : this._baseMemory
	        // Tree memory : this._treeMemory[treeID]
	        // Node memory : this._treeMemory[treeID].nodeMemory[nodeID]
	    }

	    destroy() {
	        this._baseMemory = undefined;
	        this._treeMemory = undefined;
	    }

	    _getTreeMemory(treeID) {
	        if (!this._treeMemory[treeID]) {
	            this._treeMemory[treeID] = {
	                'nodeMemory': {},
	            };
	        }
	        return this._treeMemory[treeID];
	    }

	    _getNodeMemory(treeMemory, nodeID) {
	        var memory = treeMemory.nodeMemory;
	        if (!memory[nodeID]) {
	            memory[nodeID] = {};
	        }

	        return memory[nodeID];
	    }

	    _getMemory(treeID, nodeID) {
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

	    set(key, value, treeID, nodeID) {
	        var memory = this._getMemory(treeID, nodeID);
	        SetValue(memory, key, value);
	        return this;
	    }

	    setData(key, value, treeID, nodeID) {
	        return this.set(key, value, treeID, nodeID);
	    }

	    get(key, treeID, nodeID) {
	        var memory = this._getMemory(treeID, nodeID);
	        return GetValue$h(memory, key);
	    }

	    getData(key, treeID, nodeID) {
	        return this.get(key, treeID, nodeID);
	    }

	    has(key, treeID, nodeID) {
	        var memory;
	        if (treeID !== undefined) {
	            memory = this._treeMemory[treeID];
	            if (memory && (nodeID !== undefined)) {
	                memory = treeMemory.nodeMemory[nodeID];
	            }
	        } else {
	            memory = this._baseMemory;
	        }

	        if (memory) {
	            return HasValue(memory, key);
	        } else {
	            return false;
	        }
	    }

	    hasData(key, treeID, nodeID) {
	        return this.has(key, treeID, nodeID);
	    }

	    inc(key, inc, treeID, nodeID, startValue) {
	        var newValue;
	        if (!this.has(key, treeID, nodeID)) {
	            if (startValue === undefined) {
	                startValue = 0;
	            }
	            newValue = startValue;
	        } else {
	            newValue = this.get(key, treeID, nodeID) + inc;
	        }
	        this.set(key, newValue, treeID, nodeID);
	        return this;
	    }

	    incData(key, inc, treeID, nodeID, startValue) {
	        return this.inc(key, inc, treeID, nodeID, startValue);
	    }

	    toggle(key, treeID, nodeID, startValue) {
	        var newValue;
	        if (!this.has(key, treeID, nodeID)) {
	            if (startValue === undefined) {
	                startValue = false;
	            }
	            newValue = startValue;
	        } else {
	            newValue = !this.get(key, treeID, nodeID);
	        }
	        this.set(key, newValue, treeID, nodeID);
	        return this;
	    }

	    toggleData(key, treeID, nodeID, startValue) {
	        return this.toggle(key, treeID, nodeID, startValue);
	    }

	    removeData(key, treeID, nodeID) {
	        var memory = this._getMemory(treeID, nodeID);
	        RemoveKey(memory, key);
	    }

	    removeTree(treeID) {
	        if (this._treeMemory[treeID]) {
	            delete this._treeMemory[treeID];
	        }
	        return this;
	    }

	    removeTreeData(treeID) {
	        return this.removeTree(treeID);
	    }

	    removeNode(treeID, nodeID) {
	        var treeMemory = this._treeMemory[treeID];

	        if (treeMemory && treeMemory.nodeMemory[nodeID]) {
	            delete treeMemory.nodeMemory[nodeID];
	        }
	        return this;
	    }

	    removeNodeData(treeID, nodeID) {
	        return this.removeNode(treeID, nodeID);
	    }

	    getGlobalMemory() {
	        return this._baseMemory;
	    }

	    getTreeMemory(treeID) {
	        return this._getTreeMemory(treeID);
	    }

	    getNodeMemory(treeID, nodeID) {
	        return this._getNodeMemory(this._getTreeMemory(treeID), nodeID);
	    }

	    dump() {
	        return {
	            base: DeepClone(this._baseMemory),
	            tree: DeepClone(this._treeMemory),
	        }
	    }

	    load(data) {
	        this._baseMemory = DeepClone(data.base);
	        this._treeMemory = DeepClone(data.tree);
	        return this;
	    }
	};

	class Blackboard extends Blackboard$1 {
	    constructor({
	        currentTimeKey = '$currentTime'
	    } = {}) {
	        super();

	        this.currentTimeKey = currentTimeKey;
	    }

	    getTreeState(treeID) {
	        return this.get(TREE_STATE, treeID);
	    }

	    setTreeState(treeID, state) {
	        this.set(TREE_STATE, state, treeID);
	        return this;
	    }

	    hasValidCurrentTime() {
	        return this.has(this.currentTimeKey)
	    }

	    setCurrentTime(time) {
	        this.set(this.currentTimeKey, time);
	        return this;
	    }

	    getCurrentTime() {
	        return this.get(this.currentTimeKey);
	    }

	    incCurrentTime(time) {
	        this.inc(this.currentTimeKey, time);
	        return this;
	    }


	}

	var PauseEventSheetMethods$1 = {
	    // Internal method
	    bindTaskActionNode(tick, node) {
	        if (!this.__bindTick) {
	            this.__bindTick = [];
	            this.__bindNode = [];
	        }

	        this.__bindTick.push(tick);
	        this.__bindNode.push(node);
	    },

	    // Internal method
	    unBindTaskAction() {
	        if (!this.__bindTick) {
	            return;
	        }

	        this.__bindTick.pop();
	        this.__bindNode.pop();
	    },

	    pauseEventSheet() {
	        var node = this.__bindNode[this.__bindNode.length - 1];
	        if (!node) {
	            return null;
	        }

	        var tick = this.__bindTick[this.__bindTick.length - 1];
	        return node.pauseEventSheet(tick);
	    },

	    pauseEventSheetUnitlEvent(eventEmitter, eventName) {
	        var node = this.__bindNode[this.__bindNode.length - 1];
	        if (!node) {
	            return null;
	        }

	        var tick = this.__bindTick[this.__bindTick.length - 1];
	        node.pauseEventSheetUnitlEvent(tick, eventEmitter, eventName);

	        return this;
	    }
	};

	var TreeMethods$1 = {
	    getTree(title) {
	        var trees = this.trees;
	        for (var i = 0, cnt = trees.length; i < cnt; i++) {
	            var eventsheet = trees[i];
	            if (eventsheet.title === title) {
	                return eventsheet;
	            }
	        }
	    },

	    getTreeState(eventsheet) {
	        var treeID = (typeof (eventsheet) === 'string') ? eventsheet : eventsheet.id;
	        return this.blackboard.getTreeState(treeID);
	    },

	    getEventSheetTitleList(out) {
	        if (out === undefined) {
	            out = [];
	        }
	        this.trees.forEach(function (eventsheet) {
	            out.push(eventsheet.title);
	        });
	        return out;
	    },
	};

	var AddTreeMethods$1 = {
	    addTree(eventsheet) {
	        this.trees.push(eventsheet);
	        return this;
	    },
	};

	var RemoveTreeMethods$1 = {
	    removeAllEventSheets() {
	        this.trees.forEach(function (eventsheet) {
	            this.blackboard.removeTreeData(eventsheet.id);
	        }, this);
	        this.trees.length = 0;
	        this.pendingTrees.length = 0;
	        return this;
	    },

	    removeEventSheet(title) {
	        var removedTrees = [];
	        this.trees.forEach(function (eventsheet) {
	            if (!eventsheet.title === title) {
	                return;
	            }
	            var status = this.getTreeState(eventsheet);
	            if (status === RUNNING) {
	                // Can't remove RUNNING eventsheet
	                return;
	            }

	            removedTrees.push(eventsheet);
	            this.blackboard.removeTreeData(eventsheet.id);
	        }, this);

	        if (removedTrees.length > 0) {
	            Remove(this.trees, removedTrees);
	            Remove(this.pendingTrees, removedTrees);
	        }

	        return this;
	    },
	};

	var TreeActiveStateMethods$1 = {
	    getTreeActiveState(title) {
	        var eventsheet = this.getTree(title);
	        if (!eventsheet) {
	            return null;
	        }

	        return eventsheet.active;
	    },

	    setTreeActiveState(title, active) {
	        var eventsheet = this.getTree(title);
	        if (eventsheet) {
	            eventsheet.setActive(active);
	        }

	        return this;
	    },
	};

	class TaskSequence extends Sequence {
	    open(tick) {
	        super.open(tick);

	        var blackboard = tick.blackboard;
	        var eventSheetManager = blackboard.eventSheetManager;
	        var eventsheet = tick.tree;
	        var eventSheetGroup = eventsheet.eventSheetGroup;
	        eventSheetManager.emit('label.enter', this.title, eventsheet.title, eventSheetGroup.name, eventSheetManager);

	    }

	    tick(tick) {
	        var status = super.tick(tick);
	        // Turn FAILURE by SUCCESS
	        if (status === FAILURE) {
	            status = SUCCESS$1;
	        }
	        return status;
	    }

	    close(tick) {
	        super.close(tick);

	        var blackboard = tick.blackboard;
	        var eventSheetManager = blackboard.eventSheetManager;
	        var eventsheet = tick.tree;
	        var eventSheetGroup = eventsheet.eventSheetGroup;
	        eventSheetManager.emit('label.exit', this.title, eventsheet.title, eventSheetGroup.name, eventSheetManager);
	    }
	}

	var PauseEventSheetMethods = {
	    // Called by commandExecutor -> eventSheetManager
	    pauseEventSheet(tick) {
	        // Pause eventSheetGroup, wait until eventEmitter fires resumeEventName
	        var eventSheetGroup = tick.tree.eventSheetGroup;

	        // Pause eventSheetGroup
	        this.isRunning = true;

	        var self = this;
	        var waitId = this.waitId;
	        var taskCompleteCallback = function () {
	            // Expired
	            if (waitId < self.waitId) {
	                return;
	            }
	            self.waitId++;

	            // Resume event sheet group
	            self.isRunning = false;
	            eventSheetGroup.continue();
	        };

	        return taskCompleteCallback;
	    },

	    pauseEventSheetUnitlEvent(tick, eventEmitter, eventName = 'complete') {
	        var resumeCallback = this.pauseEventSheet(tick);

	        var self = this;
	        var wrapResumeCallback = function () {
	            self.removeTaskCompleteCallback = undefined;
	            resumeCallback();
	        };

	        // Remove task-complete callback when aborting this node            
	        this.removeTaskCompleteCallback = function () {
	            eventEmitter.off(eventName, wrapResumeCallback);
	            self.removeTaskCompleteCallback = undefined;
	        };

	        eventEmitter.once(eventName, wrapResumeCallback);

	        return this;
	    }
	};

	var IsEventEmitter = function (obj) {
	    if (obj && typeof obj === 'object') {
	        return !!obj.on;
	    }
	    return false;
	};

	/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */

	var objectToString = Object.prototype.toString;
	var isArray$1 = Array.isArray || function isArrayPolyfill (object) {
	  return objectToString.call(object) === '[object Array]';
	};

	function isFunction$1 (object) {
	  return typeof object === 'function';
	}

	/**
	 * More correct typeof string handling array
	 * which normally returns typeof 'object'
	 */
	function typeStr (obj) {
	  return isArray$1(obj) ? 'array' : typeof obj;
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

	    if (!isArray$1(tagsToCompile) || tagsToCompile.length !== 2)
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

	  if (isFunction$1(value))
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

	  if (isArray$1(value)) {
	    for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
	      buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
	    }
	  } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
	    buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
	  } else if (isFunction$1(value)) {
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
	  if (!value || (isArray$1(value) && value.length === 0))
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

	  var value = isFunction$1(partials) ? partials(token[1]) : partials[token[1]];
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
	  if (isArray$1(config)) {
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
	  if (config && typeof config === 'object' && !isArray$1(config)) {
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

	class TaskAction extends Action {
	    constructor(config) {
	        // config: {name, parameters:{...} }        
	        super({
	            name: 'TaskAction',
	            title: config.name,
	            properties: config,
	        });

	        var sourceParameters = config.parameters;
	        var taskParameters = {};
	        for (var name in sourceParameters) {
	            taskParameters[name] = CompileExpression(sourceParameters[name]);
	        }
	        this.taskParameters = taskParameters;

	        this.isRunning = false;
	        this.waitId = 0;
	    }

	    open(tick) {
	        this.isRunning = false;

	        var taskData = this.properties;

	        var taskName = taskData.name;
	        if (!taskName) {
	            return;
	        }

	        var blackboard = tick.blackboard;
	        var eventSheetManager = blackboard.eventSheetManager;
	        var eventSheet = tick.tree;
	        var memory = eventSheetManager.memory;

	        var taskParameters = this.taskParameters;
	        var parametersCopy = {};
	        for (var name in taskParameters) {
	            var value = taskParameters[name];
	            if (typeof (value) === 'function') {
	                value = value(memory);
	            }
	            parametersCopy[name] = value;
	        }

	        eventSheetManager.bindTaskActionNode(tick, this);
	        // Invoke eventSheetManager.pauseEventSheet() to generate new resumeEventName

	        var commandExecutor = tick.target;
	        var eventEmitter;
	        var handler = commandExecutor[taskName];
	        if (handler) {
	            eventEmitter = handler.call(commandExecutor, parametersCopy, eventSheetManager, eventSheet);
	        } else {
	            handler = commandExecutor.defaultHandler;
	            if (handler) {
	                eventEmitter = handler.call(commandExecutor, taskName, parametersCopy, eventSheetManager, eventSheet);
	            }
	        }

	        eventSheetManager.unBindTaskAction(tick, this);

	        // Event-emitter mode
	        if (!this.isRunning && IsEventEmitter(eventEmitter)) {
	            this.pauseEventSheetUnitlEvent(tick, eventEmitter);
	        }
	    }

	    tick(tick) {
	        return (this.isRunning) ? this.RUNNING : this.SUCCESS;
	    }

	    close(tick) {
	    }

	    abort(tick) {
	        if (this.removeTaskCompleteCallback) {
	            this.removeTaskCompleteCallback();
	        }
	    }
	}

	var CompileExpression = function (s) {
	    if (typeof (s) === 'string') {
	        if (s.startsWith('#(') && s.endsWith(')')) {
	            // Eval string to get number/boolean
	            s = Compile$1(s.substring(2, s.length - 1));
	        } else if ((s.indexOf('{{') > -1) && (s.indexOf('}}') > -1)) {
	            // Might be a string template
	            var template = s;
	            s = function (data) {
	                return mustache.render(template, data);
	            };
	        }
	    }
	    return s;
	};

	Object.assign(
	    TaskAction.prototype,
	    PauseEventSheetMethods,
	);

	class ActivateAction extends Action {
	    constructor({
	        activateTreeTitle,
	        services,
	        title,
	        name = 'ActivateTree'
	    } = {}) {

	        super({
	            name,
	            title,
	            properties: {
	                activateTreeTitle
	            },
	            services,
	        });

	        this.activateTreeTitle = activateTreeTitle;
	    }

	    tick(tick) {
	        var eventsheet = this.getTree(tick);
	        if (!this.activateTreeTitle || (this.activateTreeTitle === '')) {
	            eventsheet.setActive(true);
	        } else {
	            eventsheet.eventSheetManager.setEventSheetActiveState(this.activateTreeTitle, eventsheet.groupName, true);
	        }
	        return this.SUCCESS;
	    }
	}

	class DeactivateAction extends Action {
	    constructor({
	        deactivateTreeTitle,
	        services,
	        title,
	        name = 'DeactivateTree'
	    } = {}) {

	        super({
	            name,
	            title,
	            properties: {
	                deactivateTreeTitle
	            },
	            services,
	        });

	        this.deactivateTreeTitle = deactivateTreeTitle;
	    }

	    tick(tick) {
	        var eventsheet = this.getTree(tick);
	        if (!this.deactivateTreeTitle || (this.deactivateTreeTitle === '')) {
	            eventsheet.setActive(false);
	        } else {
	            eventsheet.eventSheetManager.setEventSheetActiveState(this.deactivateTreeTitle, eventsheet.groupName, false);
	        }
	        return this.SUCCESS;
	    }
	}

	var CustomNodeMapping = {
	    TaskSequence: TaskSequence,
	    TaskAction: TaskAction,
	    ActivateAction: ActivateAction,
	    DeactivateAction: DeactivateAction,
	};

	var SaveLoadTreeMethods = {
	    dumpEventSheetGroup() {
	        return this.trees.map(function (eventsheet) {
	            return eventsheet.dump()
	        })
	    },

	    loadEventSheetGroup(data) {
	        data.forEach(function (treeData) {
	            var eventsheet = new BehaviorTree({
	                id: treeData.id,
	                title: treeData.title,
	                properties: DeepClone(treeData.properties),
	            });
	            eventsheet.load(treeData, CustomNodeMapping);
	            this.trees.push(eventsheet);
	        }, this);
	        return this;
	    },
	};

	var StateMethods$1 = {
	    dumpState(includeTree = false) {
	        var state = {
	            isRunning: this.isRunning,
	            pendingTrees: this.pendingTrees
	                .filter(function (eventsheet) {
	                    // roundComplete eventsheet will be removed from pendingTrees
	                    return !eventsheet.roundComplete;
	                })
	                .map(function (eventsheet) {
	                    return eventsheet.id;
	                })
	        };

	        if (includeTree) {
	            state.trees = this.dumpEventSheetGroup();
	        }

	        return state;
	    },

	    loadState(state) {
	        this.stop();

	        if (state.trees) {
	            this.trees.length = 0;
	            this.loadEventSheetGroup(state.trees);
	        }

	        this.isRunning = state.isRunning;

	        var pendingTrees = this.pendingTrees;
	        pendingTrees.length = 0;
	        this.trees.forEach(function (eventsheet) {
	            if (state.pendingTrees.indexOf(eventsheet.id) > -1) {
	                pendingTrees.push(eventsheet);
	            }
	        });

	        return this;
	    },
	};

	var OpenEventSheet = function (eventSheetManager, eventsheet) {
	    var blackboard = eventSheetManager.blackboard;
	    var commandExecutor = eventSheetManager.commandExecutor;
	    var result = eventsheet.start(blackboard, commandExecutor);

	    if (!result) {
	        return;
	    }

	    if (eventsheet.conditionPassed) {
	        eventSheetManager.emit('eventsheet.enter', eventsheet.title, this.name, eventSheetManager);
	    } else {
	        eventSheetManager.emit('eventsheet.catch', eventsheet.title, this.name, eventSheetManager);
	    }
	};

	var TickEventSheet = function (eventSheetManager, eventsheet) {
	    var blackboard = eventSheetManager.blackboard;
	    var commandExecutor = eventSheetManager.commandExecutor;
	    var status = eventsheet.tick(blackboard, commandExecutor);
	    return status;
	};

	var CloseEventSheet = function (eventSheetManager, eventsheet) {
	    if (eventsheet.conditionPassed) {
	        eventSheetManager.emit('eventsheet.exit', eventsheet.title, this.name, eventSheetManager);
	    }
	};

	var RunMethods$1 = {

	    /*
	    A round : 
	    
	    - Normal case : 
	        - Start from condition-eval, 
	        - End to eventsheet.roundComplete (SUCCESS/FAILURE/ERROR state)
	    - Cross rounds : 
	        - Start from condition-eval or RUNNING state, 
	        - End to eventsheet.roundComplete (RUNNING/SUCCESS/FAILURE/ERROR state)
	    */

	    start() {
	        /*
	        Start a round :
	        
	        - sequence : Add all trees to pendingTrees
	        - parallel : Open all event sheets(eventsheet), add them to pendingTrees

	        Then, invoke continue()
	        */

	        if (this.isRunning) {
	            return this;
	        }

	        this.isRunning = true;

	        var eventSheetManager = this.parent;
	        var trees = this.trees;
	        var pendingTrees = this.pendingTrees;
	        var blackboard = eventSheetManager.blackboard;

	        eventSheetManager.emit('start', this.name, eventSheetManager);

	        // pendingTrees.length = 0;

	        // Run parallel eventsheet, will return running, or failure
	        for (var i = 0, cnt = trees.length; i < cnt; i++) {
	            var eventsheet = trees[i];

	            if (!eventsheet.active) {
	                continue;
	            }

	            eventsheet.resetState(blackboard);
	            if (eventsheet.parallel) {
	                // Open all event sheets
	                OpenEventSheet.call(this, eventSheetManager, eventsheet);
	            }

	            pendingTrees.push(eventsheet);
	        }

	        this.continue();

	        return this;
	    },

	    continue() {
	        /*
	        Tick event sheets(eventsheet) until all trees are at SUCCESS/FAILURE/ERROR state

	        - Open (if not opened) and tick event sheet(eventsheet)        
	        - TaskAction's complete event will invoke this method to run remainder nodes
	        - Close(remove from pendingTrees) SUCCESS/FAILURE/ERROR event sheets(eventsheet)
	        - Complete this round if pendingTrees is empty. i.e. all trees are return SUCCESS/FAILURE/ERROR.
	        */

	        if (!this.isRunning) {
	            return this;
	        }

	        var eventSheetManager = this.parent;
	        var trees = this.pendingTrees;
	        var closedTrees = this.closedTrees;
	        var blackboard = eventSheetManager.blackboard;

	        closedTrees.length = 0;

	        for (var i = 0, cnt = trees.length; i < cnt; i++) {
	            var eventsheet = trees[i];

	            // Do nothing if event sheet has been opened
	            OpenEventSheet.call(this, eventSheetManager, eventsheet);

	            if (!this.isRunning) {
	                // Can break here
	                break;
	            }

	            // Will goto RUNNING, or SUCCESS/FAILURE/ERROR state
	            var status = TickEventSheet(eventSheetManager, eventsheet);

	            if (eventsheet.roundComplete) {
	                closedTrees.push(eventsheet);
	                CloseEventSheet.call(this, eventSheetManager, eventsheet);
	            } else if (status === RUNNING$1) {
	                // Stall command execution here
	                break;
	            }

	            if (!this.isRunning) {
	                // Can break here
	                break;
	            }

	        }

	        blackboard.eventSheetGroup = undefined;

	        if (closedTrees.length > 0) {
	            Remove(trees, closedTrees);
	        }

	        if (trees.length === 0) {
	            this.isRunning = false;
	            eventSheetManager.emit('complete', this.name, eventSheetManager);
	        }

	        return this;
	    },

	    startTree(title, ignoreCondition = true) {
	        // Run a single event sheet(eventsheet)

	        if (this.isRunning) {
	            return this;
	        }

	        var eventsheet = this.getTree(title);
	        if (!eventsheet) {
	            return this;
	        }

	        this.isRunning = true;

	        var eventSheetManager = this.parent;
	        var pendingTrees = this.pendingTrees;
	        var blackboard = eventSheetManager.blackboard;

	        pendingTrees.length = 0;

	        eventsheet.resetState(blackboard);

	        eventsheet.setConditionEnable(!ignoreCondition);

	        OpenEventSheet.call(this, eventSheetManager, eventsheet);

	        eventsheet.setConditionEnable(true);

	        pendingTrees.push(eventsheet);

	        this.continue();

	        return this;
	    }
	};

	var StopMethods$1 = {
	    stop() {
	        var eventSheetManager = this.parent;
	        var blackboard = eventSheetManager.blackboard;
	        var commandExecutor = eventSheetManager.commandExecutor;

	        var trees = this.pendingTrees;
	        for (var i = 0, cnt = trees.length; i < cnt; i++) {
	            var eventsheet = trees[i];
	            eventsheet.abort(blackboard, commandExecutor);
	            CloseEventSheet.call(this, eventSheetManager, eventsheet);
	        }
	        trees.length = 0;

	        this.isRunning = false;

	        return this;
	    },
	};

	var Methods$4 = {};

	Object.assign(
	    Methods$4,
	    TreeMethods$1,
	    AddTreeMethods$1,
	    RemoveTreeMethods$1,
	    TreeActiveStateMethods$1,
	    SaveLoadTreeMethods,
	    StateMethods$1,
	    RunMethods$1,
	    StopMethods$1,
	);

	class EventBehaviorTreeGroup {
	    constructor(parent, {
	        name = ''
	    } = {}) {
	        this.parent = parent;
	        this.name = name;

	        this.trees = [];
	        this.pendingTrees = [];
	        this.closedTrees = [];  // Temporary eventsheet array

	        this.isRunning = false;
	        this._threadKey = null;
	    }

	    destroy() {
	        this.stop();

	        this.pendingTrees.length = 0;
	        this.closedTrees.length = 0;
	        this.isRunning = false;

	        for (var i = 0, cnt = this.trees.length; i < cnt; i++) {
	            this.trees[i].destroy();
	        }
	    }
	}

	Object.assign(
	    EventBehaviorTreeGroup.prototype,
	    Methods$4,
	);

	var TreeMethods = {
	    hasTreeGroup(name) {
	        return this.treeGroups.hasOwnProperty(name);
	    },

	    getTreeGroup(name) {
	        if (!this.hasTreeGroup(name)) {
	            this.treeGroups[name] = new EventBehaviorTreeGroup(this, { name });
	        }
	        return this.treeGroups[name];
	    },

	    getTree(eventsheet, groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        return this.getTreeGroup(groupName).getTree(eventsheet);
	    },

	    getTreeState(eventsheet, groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        return this.getTreeGroup(groupName).getTreeState(eventsheet);
	    },

	    getEventSheetTitleList(out, groupName) {
	        if (out === undefined) {
	            out = [];
	        }
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        this.getTreeGroup(groupName).getEventSheetTitleList(out);
	        return out;
	    },
	};

	var AddTreeMethods = {
	    // Override it
	    addEventSheet(s, groupName, config) {
	        return this;
	    },

	    addTree(eventsheet, groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        this.getTreeGroup(groupName).addTree(eventsheet);
	        return this;
	    },

	};

	var RemoveTreeMethods = {
	    removeAllEventSheets(groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        this.getTreeGroup(groupName).removeAllEventSheets();
	        return this;
	    },

	    removeEventSheet(title, groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        this.getTreeGroup(groupName).removeEventSheet(title);
	        return this;
	    },
	};

	var TreeActiveStateMethods = {
	    getEventSheetActiveState(title, groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        return this.getTreeGroup(groupName).getTreeActiveState(title);
	    },

	    setEventSheetActiveState(title, groupName, active) {
	        if (typeof (groupName) === 'boolean') {
	            active = groupName;
	            groupName = undefined;
	        }
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        return this.getTreeGroup(groupName).setTreeActiveState(title, active);
	    },
	};

	var SaveLoadTreesMethods = {
	    dumpEventSheetGroup(groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        return this.getTreeGroup(groupName).dumpEventSheetGroup();
	    },

	    loadEventSheetGroup(data, groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        this.getTreeGroup(groupName).loadEventSheetGroup(data);
	        return this;
	    },
	};

	var DataMethods$3 = {
	    setData(key, value) {
	        var blackboard = this.blackboard;

	        if (typeof (key) === 'string') {
	            blackboard.setData(key, value);
	        } else {
	            var data = key;
	            for (key in data) {
	                value = data[key];
	                blackboard.setData(key, value);
	            }
	        }

	        return this;
	    },

	    incData(key, inc) {
	        var value;
	        if (this.hasData(key)) {
	            value = this.getData(key);
	        } else {
	            value = 0;
	        }
	        this.setData(value + inc);
	        return this;
	    },

	    toggleData(key) {
	        var value;
	        if (this.hasData(key)) {
	            value = this.getData(key);
	        } else {
	            value = false;
	        }
	        this.setData(!value);
	        return this;
	    },

	    hasData(key) {
	        return this.blackboard.hasData(key);
	    },

	    getData(key) {
	        return this.blackboard.getData(key);
	    },

	    removeData(key) {
	        this.blackboard.removeData(key);
	        return this;
	    },

	    addExpression(name, callback) {
	        this.setData(name, callback);
	        return this;
	    },

	    addExpressions(data) {
	        this.setData(data);
	        return this;
	    },
	};

	var StateMethods = {
	    dumpState(includeTree = false) {
	        var state = {
	            blackboard: this.blackboard.dump(),
	            treeGroups: {},
	        };
	        var treeGroups = state.treeGroups;
	        for (var name in this.treeGroups) {
	            treeGroups[name] = this.treeGroups[name].dumpState(includeTree);
	        }

	        return state;
	    },

	    loadState(state) {
	        if (!state) {
	            return this;
	        }

	        this.blackboard.load(state.blackboard);
	        var treeGroups = state.treeGroups;
	        for (var name in treeGroups) {
	            this.getTreeGroup(name).loadState(treeGroups[name]);
	        }

	        for (var name in treeGroups) {
	            this.getTreeGroup(name).continue();
	        }

	        return this;
	    },
	};

	var handlebars$1 = {exports: {}};

	var handlebars_runtime = {exports: {}};

	var base$1 = {};

	var utils = {};

	utils.__esModule = true;
	utils.extend = extend;
	utils.indexOf = indexOf;
	utils.escapeExpression = escapeExpression;
	utils.isEmpty = isEmpty;
	utils.createFrame = createFrame;
	utils.blockParams = blockParams;
	utils.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	utils.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  utils.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	utils.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	utils.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

	var exception = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;
		var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

		function Exception(message, node) {
		  var loc = node && node.loc,
		      line = undefined,
		      endLineNumber = undefined,
		      column = undefined,
		      endColumn = undefined;

		  if (loc) {
		    line = loc.start.line;
		    endLineNumber = loc.end.line;
		    column = loc.start.column;
		    endColumn = loc.end.column;

		    message += ' - ' + line + ':' + column;
		  }

		  var tmp = Error.prototype.constructor.call(this, message);

		  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
		  for (var idx = 0; idx < errorProps.length; idx++) {
		    this[errorProps[idx]] = tmp[errorProps[idx]];
		  }

		  /* istanbul ignore else */
		  if (Error.captureStackTrace) {
		    Error.captureStackTrace(this, Exception);
		  }

		  try {
		    if (loc) {
		      this.lineNumber = line;
		      this.endLineNumber = endLineNumber;

		      // Work around issue under safari where we can't directly set the column value
		      /* istanbul ignore next */
		      if (Object.defineProperty) {
		        Object.defineProperty(this, 'column', {
		          value: column,
		          enumerable: true
		        });
		        Object.defineProperty(this, 'endColumn', {
		          value: endColumn,
		          enumerable: true
		        });
		      } else {
		        this.column = column;
		        this.endColumn = endColumn;
		      }
		    }
		  } catch (nop) {
		    /* Ignore if the browser is very particular */
		  }
		}

		Exception.prototype = new Error();

		exports['default'] = Exception;
		module.exports = exports['default'];
		
	} (exception, exception.exports));

	var exceptionExports = exception.exports;

	var helpers$1 = {};

	var blockHelperMissing = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;

		var _utils = utils;

		exports['default'] = function (instance) {
		  instance.registerHelper('blockHelperMissing', function (context, options) {
		    var inverse = options.inverse,
		        fn = options.fn;

		    if (context === true) {
		      return fn(this);
		    } else if (context === false || context == null) {
		      return inverse(this);
		    } else if (_utils.isArray(context)) {
		      if (context.length > 0) {
		        if (options.ids) {
		          options.ids = [options.name];
		        }

		        return instance.helpers.each(context, options);
		      } else {
		        return inverse(this);
		      }
		    } else {
		      if (options.data && options.ids) {
		        var data = _utils.createFrame(options.data);
		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
		        options = { data: data };
		      }

		      return fn(context, options);
		    }
		  });
		};

		module.exports = exports['default'];
		
	} (blockHelperMissing, blockHelperMissing.exports));

	var blockHelperMissingExports = blockHelperMissing.exports;

	var each = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _utils = utils;

		var _exception = exceptionExports;

		var _exception2 = _interopRequireDefault(_exception);

		exports['default'] = function (instance) {
		  instance.registerHelper('each', function (context, options) {
		    if (!options) {
		      throw new _exception2['default']('Must pass iterator to #each');
		    }

		    var fn = options.fn,
		        inverse = options.inverse,
		        i = 0,
		        ret = '',
		        data = undefined,
		        contextPath = undefined;

		    if (options.data && options.ids) {
		      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
		    }

		    if (_utils.isFunction(context)) {
		      context = context.call(this);
		    }

		    if (options.data) {
		      data = _utils.createFrame(options.data);
		    }

		    function execIteration(field, index, last) {
		      if (data) {
		        data.key = field;
		        data.index = index;
		        data.first = index === 0;
		        data.last = !!last;

		        if (contextPath) {
		          data.contextPath = contextPath + field;
		        }
		      }

		      ret = ret + fn(context[field], {
		        data: data,
		        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
		      });
		    }

		    if (context && typeof context === 'object') {
		      if (_utils.isArray(context)) {
		        for (var j = context.length; i < j; i++) {
		          if (i in context) {
		            execIteration(i, i, i === context.length - 1);
		          }
		        }
		      } else if (typeof Symbol === 'function' && context[Symbol.iterator]) {
		        var newContext = [];
		        var iterator = context[Symbol.iterator]();
		        for (var it = iterator.next(); !it.done; it = iterator.next()) {
		          newContext.push(it.value);
		        }
		        context = newContext;
		        for (var j = context.length; i < j; i++) {
		          execIteration(i, i, i === context.length - 1);
		        }
		      } else {
		        (function () {
		          var priorKey = undefined;

		          Object.keys(context).forEach(function (key) {
		            // We're running the iterations one step out of sync so we can detect
		            // the last iteration without have to scan the object twice and create
		            // an itermediate keys array.
		            if (priorKey !== undefined) {
		              execIteration(priorKey, i - 1);
		            }
		            priorKey = key;
		            i++;
		          });
		          if (priorKey !== undefined) {
		            execIteration(priorKey, i - 1, true);
		          }
		        })();
		      }
		    }

		    if (i === 0) {
		      ret = inverse(this);
		    }

		    return ret;
		  });
		};

		module.exports = exports['default'];
		
	} (each, each.exports));

	var eachExports = each.exports;

	var helperMissing = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _exception = exceptionExports;

		var _exception2 = _interopRequireDefault(_exception);

		exports['default'] = function (instance) {
		  instance.registerHelper('helperMissing', function () /* [args, ]options */{
		    if (arguments.length === 1) {
		      // A missing field in a {{foo}} construct.
		      return undefined;
		    } else {
		      // Someone is actually trying to call something, blow up.
		      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
		    }
		  });
		};

		module.exports = exports['default'];
		
	} (helperMissing, helperMissing.exports));

	var helperMissingExports = helperMissing.exports;

	var _if = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _utils = utils;

		var _exception = exceptionExports;

		var _exception2 = _interopRequireDefault(_exception);

		exports['default'] = function (instance) {
		  instance.registerHelper('if', function (conditional, options) {
		    if (arguments.length != 2) {
		      throw new _exception2['default']('#if requires exactly one argument');
		    }
		    if (_utils.isFunction(conditional)) {
		      conditional = conditional.call(this);
		    }

		    // Default behavior is to render the positive path if the value is truthy and not empty.
		    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
		    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
		    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
		      return options.inverse(this);
		    } else {
		      return options.fn(this);
		    }
		  });

		  instance.registerHelper('unless', function (conditional, options) {
		    if (arguments.length != 2) {
		      throw new _exception2['default']('#unless requires exactly one argument');
		    }
		    return instance.helpers['if'].call(this, conditional, {
		      fn: options.inverse,
		      inverse: options.fn,
		      hash: options.hash
		    });
		  });
		};

		module.exports = exports['default'];
		
	} (_if, _if.exports));

	var _ifExports = _if.exports;

	var log$1 = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;

		exports['default'] = function (instance) {
		  instance.registerHelper('log', function () /* message, options */{
		    var args = [undefined],
		        options = arguments[arguments.length - 1];
		    for (var i = 0; i < arguments.length - 1; i++) {
		      args.push(arguments[i]);
		    }

		    var level = 1;
		    if (options.hash.level != null) {
		      level = options.hash.level;
		    } else if (options.data && options.data.level != null) {
		      level = options.data.level;
		    }
		    args[0] = level;

		    instance.log.apply(instance, args);
		  });
		};

		module.exports = exports['default'];
		
	} (log$1, log$1.exports));

	var logExports = log$1.exports;

	var lookup = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;

		exports['default'] = function (instance) {
		  instance.registerHelper('lookup', function (obj, field, options) {
		    if (!obj) {
		      // Note for 5.0: Change to "obj == null" in 5.0
		      return obj;
		    }
		    return options.lookupProperty(obj, field);
		  });
		};

		module.exports = exports['default'];
		
	} (lookup, lookup.exports));

	var lookupExports = lookup.exports;

	var _with = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _utils = utils;

		var _exception = exceptionExports;

		var _exception2 = _interopRequireDefault(_exception);

		exports['default'] = function (instance) {
		  instance.registerHelper('with', function (context, options) {
		    if (arguments.length != 2) {
		      throw new _exception2['default']('#with requires exactly one argument');
		    }
		    if (_utils.isFunction(context)) {
		      context = context.call(this);
		    }

		    var fn = options.fn;

		    if (!_utils.isEmpty(context)) {
		      var data = options.data;
		      if (options.data && options.ids) {
		        data = _utils.createFrame(options.data);
		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
		      }

		      return fn(context, {
		        data: data,
		        blockParams: _utils.blockParams([context], [data && data.contextPath])
		      });
		    } else {
		      return options.inverse(this);
		    }
		  });
		};

		module.exports = exports['default'];
		
	} (_with, _with.exports));

	var _withExports = _with.exports;

	helpers$1.__esModule = true;
	helpers$1.registerDefaultHelpers = registerDefaultHelpers;
	helpers$1.moveHelperToHooks = moveHelperToHooks;
	// istanbul ignore next

	function _interopRequireDefault$7(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _helpersBlockHelperMissing = blockHelperMissingExports;

	var _helpersBlockHelperMissing2 = _interopRequireDefault$7(_helpersBlockHelperMissing);

	var _helpersEach = eachExports;

	var _helpersEach2 = _interopRequireDefault$7(_helpersEach);

	var _helpersHelperMissing = helperMissingExports;

	var _helpersHelperMissing2 = _interopRequireDefault$7(_helpersHelperMissing);

	var _helpersIf = _ifExports;

	var _helpersIf2 = _interopRequireDefault$7(_helpersIf);

	var _helpersLog = logExports;

	var _helpersLog2 = _interopRequireDefault$7(_helpersLog);

	var _helpersLookup = lookupExports;

	var _helpersLookup2 = _interopRequireDefault$7(_helpersLookup);

	var _helpersWith = _withExports;

	var _helpersWith2 = _interopRequireDefault$7(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

	function moveHelperToHooks(instance, helperName, keepHelper) {
	  if (instance.helpers[helperName]) {
	    instance.hooks[helperName] = instance.helpers[helperName];
	    if (!keepHelper) {
	      delete instance.helpers[helperName];
	    }
	  }
	}

	var decorators = {};

	var inline = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;

		var _utils = utils;

		exports['default'] = function (instance) {
		  instance.registerDecorator('inline', function (fn, props, container, options) {
		    var ret = fn;
		    if (!props.partials) {
		      props.partials = {};
		      ret = function (context, options) {
		        // Create a new partials stack frame prior to exec.
		        var original = container.partials;
		        container.partials = _utils.extend({}, original, props.partials);
		        var ret = fn(context, options);
		        container.partials = original;
		        return ret;
		      };
		    }

		    props.partials[options.args[0]] = options.fn;

		    return ret;
		  });
		};

		module.exports = exports['default'];
		
	} (inline, inline.exports));

	var inlineExports = inline.exports;

	decorators.__esModule = true;
	decorators.registerDefaultDecorators = registerDefaultDecorators;
	// istanbul ignore next

	function _interopRequireDefault$6(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _decoratorsInline = inlineExports;

	var _decoratorsInline2 = _interopRequireDefault$6(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}

	var logger = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;

		var _utils = utils;

		var logger = {
		  methodMap: ['debug', 'info', 'warn', 'error'],
		  level: 'info',

		  // Maps a given level value to the `methodMap` indexes above.
		  lookupLevel: function lookupLevel(level) {
		    if (typeof level === 'string') {
		      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
		      if (levelMap >= 0) {
		        level = levelMap;
		      } else {
		        level = parseInt(level, 10);
		      }
		    }

		    return level;
		  },

		  // Can be overridden in the host environment
		  log: function log(level) {
		    level = logger.lookupLevel(level);

		    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
		      var method = logger.methodMap[level];
		      // eslint-disable-next-line no-console
		      if (!console[method]) {
		        method = 'log';
		      }

		      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        message[_key - 1] = arguments[_key];
		      }

		      console[method].apply(console, message); // eslint-disable-line no-console
		    }
		  }
		};

		exports['default'] = logger;
		module.exports = exports['default'];
		
	} (logger, logger.exports));

	var loggerExports = logger.exports;

	var protoAccess = {};

	var createNewLookupObject$1 = {};

	createNewLookupObject$1.__esModule = true;
	createNewLookupObject$1.createNewLookupObject = createNewLookupObject;

	var _utils$4 = utils;

	/**
	 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
	 * The resulting object can be used with "object[property]" to check if a property exists
	 * @param {...object} sources a varargs parameter of source objects that will be merged
	 * @returns {object}
	 */

	function createNewLookupObject() {
	  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	    sources[_key] = arguments[_key];
	  }

	  return _utils$4.extend.apply(undefined, [Object.create(null)].concat(sources));
	}

	protoAccess.__esModule = true;
	protoAccess.createProtoAccessControl = createProtoAccessControl;
	protoAccess.resultIsAllowed = resultIsAllowed;
	protoAccess.resetLoggedProperties = resetLoggedProperties;
	// istanbul ignore next

	function _interopRequireDefault$5(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createNewLookupObject = createNewLookupObject$1;

	var _logger$1 = loggerExports;

	var _logger2$1 = _interopRequireDefault$5(_logger$1);

	var loggedProperties = Object.create(null);

	function createProtoAccessControl(runtimeOptions) {
	  var defaultMethodWhiteList = Object.create(null);
	  defaultMethodWhiteList['constructor'] = false;
	  defaultMethodWhiteList['__defineGetter__'] = false;
	  defaultMethodWhiteList['__defineSetter__'] = false;
	  defaultMethodWhiteList['__lookupGetter__'] = false;

	  var defaultPropertyWhiteList = Object.create(null);
	  // eslint-disable-next-line no-proto
	  defaultPropertyWhiteList['__proto__'] = false;

	  return {
	    properties: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
	      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
	    },
	    methods: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
	      defaultValue: runtimeOptions.allowProtoMethodsByDefault
	    }
	  };
	}

	function resultIsAllowed(result, protoAccessControl, propertyName) {
	  if (typeof result === 'function') {
	    return checkWhiteList(protoAccessControl.methods, propertyName);
	  } else {
	    return checkWhiteList(protoAccessControl.properties, propertyName);
	  }
	}

	function checkWhiteList(protoAccessControlForType, propertyName) {
	  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
	    return protoAccessControlForType.whitelist[propertyName] === true;
	  }
	  if (protoAccessControlForType.defaultValue !== undefined) {
	    return protoAccessControlForType.defaultValue;
	  }
	  logUnexpecedPropertyAccessOnce(propertyName);
	  return false;
	}

	function logUnexpecedPropertyAccessOnce(propertyName) {
	  if (loggedProperties[propertyName] !== true) {
	    loggedProperties[propertyName] = true;
	    _logger2$1['default'].log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
	  }
	}

	function resetLoggedProperties() {
	  Object.keys(loggedProperties).forEach(function (propertyName) {
	    delete loggedProperties[propertyName];
	  });
	}

	base$1.__esModule = true;
	base$1.HandlebarsEnvironment = HandlebarsEnvironment;
	// istanbul ignore next

	function _interopRequireDefault$4(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils$3 = utils;

	var _exception$3 = exceptionExports;

	var _exception2$3 = _interopRequireDefault$4(_exception$3);

	var _helpers$2 = helpers$1;

	var _decorators = decorators;

	var _logger = loggerExports;

	var _logger2 = _interopRequireDefault$4(_logger);

	var _internalProtoAccess$1 = protoAccess;

	var VERSION = '4.7.8';
	base$1.VERSION = VERSION;
	var COMPILER_REVISION = 8;
	base$1.COMPILER_REVISION = COMPILER_REVISION;
	var LAST_COMPATIBLE_COMPILER_REVISION = 7;

	base$1.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0 <4.3.0',
	  8: '>= 4.3.0'
	};

	base$1.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers$2.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils$3.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2$3['default']('Arg not supported with multiple helpers');
	      }
	      _utils$3.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils$3.toString.call(name) === objectType) {
	      _utils$3.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2$3['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils$3.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2$3['default']('Arg not supported with multiple decorators');
	      }
	      _utils$3.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  },
	  /**
	   * Reset the memory of illegal property accesses that have already been logged.
	   * @deprecated should only be used in handlebars test-cases
	   */
	  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
	    _internalProtoAccess$1.resetLoggedProperties();
	  }
	};

	var log = _logger2['default'].log;

	base$1.log = log;
	base$1.createFrame = _utils$3.createFrame;
	base$1.logger = _logger2['default'];

	var safeString = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;
		function SafeString(string) {
		  this.string = string;
		}

		SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
		  return '' + this.string;
		};

		exports['default'] = SafeString;
		module.exports = exports['default'];
		
	} (safeString, safeString.exports));

	var safeStringExports = safeString.exports;

	var runtime = {};

	var wrapHelper$1 = {};

	wrapHelper$1.__esModule = true;
	wrapHelper$1.wrapHelper = wrapHelper;

	function wrapHelper(helper, transformOptionsFn) {
	  if (typeof helper !== 'function') {
	    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
	    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
	    return helper;
	  }
	  var wrapper = function wrapper() /* dynamic arguments */{
	    var options = arguments[arguments.length - 1];
	    arguments[arguments.length - 1] = transformOptionsFn(options);
	    return helper.apply(this, arguments);
	  };
	  return wrapper;
	}

	runtime.__esModule = true;
	runtime.checkRevision = checkRevision;
	runtime.template = template;
	runtime.wrapProgram = wrapProgram;
	runtime.resolvePartial = resolvePartial;
	runtime.invokePartial = invokePartial;
	runtime.noop = noop;
	// istanbul ignore next

	function _interopRequireDefault$3(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _interopRequireWildcard$1(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _utils$2 = utils;

	var Utils = _interopRequireWildcard$1(_utils$2);

	var _exception$2 = exceptionExports;

	var _exception2$2 = _interopRequireDefault$3(_exception$2);

	var _base = base$1;

	var _helpers$1 = helpers$1;

	var _internalWrapHelper = wrapHelper$1;

	var _internalProtoAccess = protoAccess;

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
	    return;
	  }

	  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
	    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	        compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	    throw new _exception2$2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	  } else {
	    // Use the embedded version info since the runtime doesn't know about this revision yet
	    throw new _exception2$2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2$2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2$2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as pseudo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
	  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }
	    partial = env.VM.resolvePartial.call(this, partial, context, options);

	    var extendedOptions = Utils.extend({}, options, {
	      hooks: this.hooks,
	      protoAccessControl: this.protoAccessControl
	    });

	    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, extendedOptions);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2$2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name, loc) {
	      if (!obj || !(name in obj)) {
	        throw new _exception2$2['default']('"' + name + '" not defined in ' + obj, {
	          loc: loc
	        });
	      }
	      return container.lookupProperty(obj, name);
	    },
	    lookupProperty: function lookupProperty(parent, propertyName) {
	      var result = parent[propertyName];
	      if (result == null) {
	        return result;
	      }
	      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
	        return result;
	      }

	      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
	        return result;
	      }
	      return undefined;
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        var result = depths[i] && container.lookupProperty(depths[i], name);
	        if (result != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    mergeIfNeeded: function mergeIfNeeded(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },
	    // An empty object to use as replacement for null-contexts
	    nullContext: Object.seal({}),

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }

	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }

	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
	      wrapHelpersToPassLookupProperty(mergedHelpers, container);
	      container.helpers = mergedHelpers;

	      if (templateSpec.usePartial) {
	        // Use mergeIfNeeded here to prevent compiling global partials multiple times
	        container.partials = container.mergeIfNeeded(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = Utils.extend({}, env.decorators, options.decorators);
	      }

	      container.hooks = {};
	      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);

	      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
	      _helpers$1.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
	      _helpers$1.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
	    } else {
	      container.protoAccessControl = options.protoAccessControl; // internal option
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	      container.hooks = options.hooks;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2$2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2$2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	/**
	 * This is currently part of the official API, therefore implementation details should not be changed.
	 */

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  // Use the current closure context to save the partial-block if this partial
	  var currentPartialBlock = options.data && options.data['partial-block'];
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    (function () {
	      options.data = _base.createFrame(options.data);
	      // Wrapper function to get access to currentPartialBlock from the closure
	      var fn = options.fn;
	      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        // Restore the partial-block from the closure for the execution of the block
	        // i.e. the part inside the block of the partial call.
	        options.data = _base.createFrame(options.data);
	        options.data['partial-block'] = currentPartialBlock;
	        return fn(context, options);
	      };
	      if (fn.partials) {
	        options.partials = Utils.extend({}, options.partials, fn.partials);
	      }
	    })();
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2$2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

	function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
	  Object.keys(mergedHelpers).forEach(function (helperName) {
	    var helper = mergedHelpers[helperName];
	    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
	  });
	}

	function passLookupPropertyOption(helper, container) {
	  var lookupProperty = container.lookupProperty;
	  return _internalWrapHelper.wrapHelper(helper, function (options) {
	    return Utils.extend({ lookupProperty: lookupProperty }, options);
	  });
	}

	var noConflict = {exports: {}};

	/* global globalThis */

	(function (module, exports) {

		exports.__esModule = true;

		exports['default'] = function (Handlebars) {
		  /* istanbul ignore next */
		  // https://mathiasbynens.be/notes/globalthis
		  (function () {
		    if (typeof globalThis === 'object') return;
		    Object.prototype.__defineGetter__('__magic__', function () {
		      return this;
		    });
		    __magic__.globalThis = __magic__; // eslint-disable-line no-undef
		    delete Object.prototype.__magic__;
		  })();

		  var $Handlebars = globalThis.Handlebars;

		  /* istanbul ignore next */
		  Handlebars.noConflict = function () {
		    if (globalThis.Handlebars === Handlebars) {
		      globalThis.Handlebars = $Handlebars;
		    }
		    return Handlebars;
		  };
		};

		module.exports = exports['default'];
		
	} (noConflict, noConflict.exports));

	var noConflictExports = noConflict.exports;

	(function (module, exports) {

		exports.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		// istanbul ignore next

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

		var _handlebarsBase = base$1;

		var base = _interopRequireWildcard(_handlebarsBase);

		// Each of these augment the Handlebars object. No need to setup here.
		// (This is done to easily share code between commonjs and browse envs)

		var _handlebarsSafeString = safeStringExports;

		var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

		var _handlebarsException = exceptionExports;

		var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

		var _handlebarsUtils = utils;

		var Utils = _interopRequireWildcard(_handlebarsUtils);

		var _handlebarsRuntime = runtime;

		var runtime$1 = _interopRequireWildcard(_handlebarsRuntime);

		var _handlebarsNoConflict = noConflictExports;

		var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

		// For compatibility and usage outside of module systems, make the Handlebars object a namespace
		function create() {
		  var hb = new base.HandlebarsEnvironment();

		  Utils.extend(hb, base);
		  hb.SafeString = _handlebarsSafeString2['default'];
		  hb.Exception = _handlebarsException2['default'];
		  hb.Utils = Utils;
		  hb.escapeExpression = Utils.escapeExpression;

		  hb.VM = runtime$1;
		  hb.template = function (spec) {
		    return runtime$1.template(spec, hb);
		  };

		  return hb;
		}

		var inst = create();
		inst.create = create;

		_handlebarsNoConflict2['default'](inst);

		inst['default'] = inst;

		exports['default'] = inst;
		module.exports = exports['default'];
		
	} (handlebars_runtime, handlebars_runtime.exports));

	var handlebars_runtimeExports = handlebars_runtime.exports;

	var ast = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;
		var AST = {
		  // Public API used to evaluate derived attributes regarding AST nodes
		  helpers: {
		    // a mustache is definitely a helper if:
		    // * it is an eligible helper, and
		    // * it has at least one parameter or hash segment
		    helperExpression: function helperExpression(node) {
		      return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
		    },

		    scopedId: function scopedId(path) {
		      return (/^\.|this\b/.test(path.original)
		      );
		    },

		    // an ID is simple if it only has one part, and that part is not
		    // `..` or `this`.
		    simpleId: function simpleId(path) {
		      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
		    }
		  }
		};

		// Must be exported as an object rather than the root of the module as the jison lexer
		// must modify the object to operate properly.
		exports['default'] = AST;
		module.exports = exports['default'];
		
	} (ast, ast.exports));

	var astExports = ast.exports;

	var base = {};

	var parser = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;
		var handlebars = (function () {
		    var parser = { trace: function trace() {},
		        yy: {},
		        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
		        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
		        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
		        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

		            var $0 = $$.length - 1;
		            switch (yystate) {
		                case 1:
		                    return $$[$0 - 1];
		                case 2:
		                    this.$ = yy.prepareProgram($$[$0]);
		                    break;
		                case 3:
		                    this.$ = $$[$0];
		                    break;
		                case 4:
		                    this.$ = $$[$0];
		                    break;
		                case 5:
		                    this.$ = $$[$0];
		                    break;
		                case 6:
		                    this.$ = $$[$0];
		                    break;
		                case 7:
		                    this.$ = $$[$0];
		                    break;
		                case 8:
		                    this.$ = $$[$0];
		                    break;
		                case 9:
		                    this.$ = {
		                        type: 'CommentStatement',
		                        value: yy.stripComment($$[$0]),
		                        strip: yy.stripFlags($$[$0], $$[$0]),
		                        loc: yy.locInfo(this._$)
		                    };

		                    break;
		                case 10:
		                    this.$ = {
		                        type: 'ContentStatement',
		                        original: $$[$0],
		                        value: $$[$0],
		                        loc: yy.locInfo(this._$)
		                    };

		                    break;
		                case 11:
		                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
		                    break;
		                case 12:
		                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
		                    break;
		                case 13:
		                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
		                    break;
		                case 14:
		                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
		                    break;
		                case 15:
		                    this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
		                    break;
		                case 16:
		                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
		                    break;
		                case 17:
		                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
		                    break;
		                case 18:
		                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
		                    break;
		                case 19:
		                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
		                        program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
		                    program.chained = true;

		                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

		                    break;
		                case 20:
		                    this.$ = $$[$0];
		                    break;
		                case 21:
		                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
		                    break;
		                case 22:
		                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
		                    break;
		                case 23:
		                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
		                    break;
		                case 24:
		                    this.$ = {
		                        type: 'PartialStatement',
		                        name: $$[$0 - 3],
		                        params: $$[$0 - 2],
		                        hash: $$[$0 - 1],
		                        indent: '',
		                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
		                        loc: yy.locInfo(this._$)
		                    };

		                    break;
		                case 25:
		                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
		                    break;
		                case 26:
		                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
		                    break;
		                case 27:
		                    this.$ = $$[$0];
		                    break;
		                case 28:
		                    this.$ = $$[$0];
		                    break;
		                case 29:
		                    this.$ = {
		                        type: 'SubExpression',
		                        path: $$[$0 - 3],
		                        params: $$[$0 - 2],
		                        hash: $$[$0 - 1],
		                        loc: yy.locInfo(this._$)
		                    };

		                    break;
		                case 30:
		                    this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
		                    break;
		                case 31:
		                    this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
		                    break;
		                case 32:
		                    this.$ = yy.id($$[$0 - 1]);
		                    break;
		                case 33:
		                    this.$ = $$[$0];
		                    break;
		                case 34:
		                    this.$ = $$[$0];
		                    break;
		                case 35:
		                    this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
		                    break;
		                case 36:
		                    this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
		                    break;
		                case 37:
		                    this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
		                    break;
		                case 38:
		                    this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
		                    break;
		                case 39:
		                    this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
		                    break;
		                case 40:
		                    this.$ = $$[$0];
		                    break;
		                case 41:
		                    this.$ = $$[$0];
		                    break;
		                case 42:
		                    this.$ = yy.preparePath(true, $$[$0], this._$);
		                    break;
		                case 43:
		                    this.$ = yy.preparePath(false, $$[$0], this._$);
		                    break;
		                case 44:
		                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
		                    break;
		                case 45:
		                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
		                    break;
		                case 46:
		                    this.$ = [];
		                    break;
		                case 47:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 48:
		                    this.$ = [];
		                    break;
		                case 49:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 50:
		                    this.$ = [];
		                    break;
		                case 51:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 58:
		                    this.$ = [];
		                    break;
		                case 59:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 64:
		                    this.$ = [];
		                    break;
		                case 65:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 70:
		                    this.$ = [];
		                    break;
		                case 71:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 78:
		                    this.$ = [];
		                    break;
		                case 79:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 82:
		                    this.$ = [];
		                    break;
		                case 83:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 86:
		                    this.$ = [];
		                    break;
		                case 87:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 90:
		                    this.$ = [];
		                    break;
		                case 91:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 94:
		                    this.$ = [];
		                    break;
		                case 95:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 98:
		                    this.$ = [$$[$0]];
		                    break;
		                case 99:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		                case 100:
		                    this.$ = [$$[$0]];
		                    break;
		                case 101:
		                    $$[$0 - 1].push($$[$0]);
		                    break;
		            }
		        },
		        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
		        defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
		        parseError: function parseError(str, hash) {
		            throw new Error(str);
		        },
		        parse: function parse(input) {
		            var self = this,
		                stack = [0],
		                vstack = [null],
		                lstack = [],
		                table = this.table,
		                yytext = "",
		                yylineno = 0,
		                yyleng = 0;
		            this.lexer.setInput(input);
		            this.lexer.yy = this.yy;
		            this.yy.lexer = this.lexer;
		            this.yy.parser = this;
		            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
		            var yyloc = this.lexer.yylloc;
		            lstack.push(yyloc);
		            var ranges = this.lexer.options && this.lexer.options.ranges;
		            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
		            function lex() {
		                var token;
		                token = self.lexer.lex() || 1;
		                if (typeof token !== "number") {
		                    token = self.symbols_[token] || token;
		                }
		                return token;
		            }
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
		                    if (symbol === null || typeof symbol == "undefined") {
		                        symbol = lex();
		                    }
		                    action = table[state] && table[state][symbol];
		                }
		                if (typeof action === "undefined" || !action.length || !action[0]) {
		                    var errStr = "";
		                    {
		                        expected = [];
		                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
		                            expected.push("'" + this.terminals_[p] + "'");
		                        }
		                        if (this.lexer.showPosition) {
		                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
		                        } else {
		                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
		                        }
		                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
		                    }
		                }
		                if (action[0] instanceof Array && action.length > 1) {
		                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
		                }
		                switch (action[0]) {
		                    case 1:
		                        stack.push(symbol);
		                        vstack.push(this.lexer.yytext);
		                        lstack.push(this.lexer.yylloc);
		                        stack.push(action[1]);
		                        symbol = null;
		                        {
		                            yyleng = this.lexer.yyleng;
		                            yytext = this.lexer.yytext;
		                            yylineno = this.lexer.yylineno;
		                            yyloc = this.lexer.yylloc;
		                        }
		                        break;
		                    case 2:
		                        len = this.productions_[action[1]][1];
		                        yyval.$ = vstack[vstack.length - len];
		                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
		                        if (ranges) {
		                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
		                        }
		                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
		                        if (typeof r !== "undefined") {
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
		    /* Jison generated lexer */
		    var lexer = (function () {
		        var lexer = { EOF: 1,
		            parseError: function parseError(str, hash) {
		                if (this.yy.parser) {
		                    this.yy.parser.parseError(str, hash);
		                } else {
		                    throw new Error(str);
		                }
		            },
		            setInput: function setInput(input) {
		                this._input = input;
		                this._more = this._less = this.done = false;
		                this.yylineno = this.yyleng = 0;
		                this.yytext = this.matched = this.match = '';
		                this.conditionStack = ['INITIAL'];
		                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
		                if (this.options.ranges) this.yylloc.range = [0, 0];
		                this.offset = 0;
		                return this;
		            },
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
		                if (this.options.ranges) this.yylloc.range[1]++;

		                this._input = this._input.slice(1);
		                return ch;
		            },
		            unput: function unput(ch) {
		                var len = ch.length;
		                var lines = ch.split(/(?:\r\n?|\n)/g);

		                this._input = ch + this._input;
		                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
		                //this.yyleng -= len;
		                this.offset -= len;
		                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
		                this.match = this.match.substr(0, this.match.length - 1);
		                this.matched = this.matched.substr(0, this.matched.length - 1);

		                if (lines.length - 1) this.yylineno -= lines.length - 1;
		                var r = this.yylloc.range;

		                this.yylloc = { first_line: this.yylloc.first_line,
		                    last_line: this.yylineno + 1,
		                    first_column: this.yylloc.first_column,
		                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
		                };

		                if (this.options.ranges) {
		                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
		                }
		                return this;
		            },
		            more: function more() {
		                this._more = true;
		                return this;
		            },
		            less: function less(n) {
		                this.unput(this.match.slice(n));
		            },
		            pastInput: function pastInput() {
		                var past = this.matched.substr(0, this.matched.length - this.match.length);
		                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
		            },
		            upcomingInput: function upcomingInput() {
		                var next = this.match;
		                if (next.length < 20) {
		                    next += this._input.substr(0, 20 - next.length);
		                }
		                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
		            },
		            showPosition: function showPosition() {
		                var pre = this.pastInput();
		                var c = new Array(pre.length + 1).join("-");
		                return pre + this.upcomingInput() + "\n" + c + "^";
		            },
		            next: function next() {
		                if (this.done) {
		                    return this.EOF;
		                }
		                if (!this._input) this.done = true;

		                var token, match, tempMatch, index, lines;
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
		                        if (!this.options.flex) break;
		                    }
		                }
		                if (match) {
		                    lines = match[0].match(/(?:\r\n?|\n).*/g);
		                    if (lines) this.yylineno += lines.length;
		                    this.yylloc = { first_line: this.yylloc.last_line,
		                        last_line: this.yylineno + 1,
		                        first_column: this.yylloc.last_column,
		                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
		                    this.yytext += match[0];
		                    this.match += match[0];
		                    this.matches = match;
		                    this.yyleng = this.yytext.length;
		                    if (this.options.ranges) {
		                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
		                    }
		                    this._more = false;
		                    this._input = this._input.slice(match[0].length);
		                    this.matched += match[0];
		                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
		                    if (this.done && this._input) this.done = false;
		                    if (token) return token;else return;
		                }
		                if (this._input === "") {
		                    return this.EOF;
		                } else {
		                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
		                }
		            },
		            lex: function lex() {
		                var r = this.next();
		                if (typeof r !== 'undefined') {
		                    return r;
		                } else {
		                    return this.lex();
		                }
		            },
		            begin: function begin(condition) {
		                this.conditionStack.push(condition);
		            },
		            popState: function popState() {
		                return this.conditionStack.pop();
		            },
		            _currentRules: function _currentRules() {
		                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
		            },
		            topState: function topState() {
		                return this.conditionStack[this.conditionStack.length - 2];
		            },
		            pushState: function begin(condition) {
		                this.begin(condition);
		            } };
		        lexer.options = {};
		        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

		            function strip(start, end) {
		                return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
		            }
		            switch ($avoiding_name_collisions) {
		                case 0:
		                    if (yy_.yytext.slice(-2) === "\\\\") {
		                        strip(0, 1);
		                        this.begin("mu");
		                    } else if (yy_.yytext.slice(-1) === "\\") {
		                        strip(0, 1);
		                        this.begin("emu");
		                    } else {
		                        this.begin("mu");
		                    }
		                    if (yy_.yytext) return 15;

		                    break;
		                case 1:
		                    return 15;
		                case 2:
		                    this.popState();
		                    return 15;
		                case 3:
		                    this.begin('raw');return 15;
		                case 4:
		                    this.popState();
		                    // Should be using `this.topState()` below, but it currently
		                    // returns the second top instead of the first top. Opened an
		                    // issue about it at https://github.com/zaach/jison/issues/291
		                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
		                        return 15;
		                    } else {
		                        strip(5, 9);
		                        return 'END_RAW_BLOCK';
		                    }
		                case 5:
		                    return 15;
		                case 6:
		                    this.popState();
		                    return 14;
		                case 7:
		                    return 65;
		                case 8:
		                    return 68;
		                case 9:
		                    return 19;
		                case 10:
		                    this.popState();
		                    this.begin('raw');
		                    return 23;
		                case 11:
		                    return 55;
		                case 12:
		                    return 60;
		                case 13:
		                    return 29;
		                case 14:
		                    return 47;
		                case 15:
		                    this.popState();return 44;
		                case 16:
		                    this.popState();return 44;
		                case 17:
		                    return 34;
		                case 18:
		                    return 39;
		                case 19:
		                    return 51;
		                case 20:
		                    return 48;
		                case 21:
		                    this.unput(yy_.yytext);
		                    this.popState();
		                    this.begin('com');

		                    break;
		                case 22:
		                    this.popState();
		                    return 14;
		                case 23:
		                    return 48;
		                case 24:
		                    return 73;
		                case 25:
		                    return 72;
		                case 26:
		                    return 72;
		                case 27:
		                    return 87;
		                case 28:
		                    // ignore whitespace
		                    break;
		                case 29:
		                    this.popState();return 54;
		                case 30:
		                    this.popState();return 33;
		                case 31:
		                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
		                case 32:
		                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
		                case 33:
		                    return 85;
		                case 34:
		                    return 82;
		                case 35:
		                    return 82;
		                case 36:
		                    return 83;
		                case 37:
		                    return 84;
		                case 38:
		                    return 81;
		                case 39:
		                    return 75;
		                case 40:
		                    return 77;
		                case 41:
		                    return 72;
		                case 42:
		                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
		                case 43:
		                    return 'INVALID';
		                case 44:
		                    return 5;
		            }
		        };
		        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
		        lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
		        return lexer;
		    })();
		    parser.lexer = lexer;
		    function Parser() {
		        this.yy = {};
		    }Parser.prototype = parser;parser.Parser = Parser;
		    return new Parser();
		})();exports["default"] = handlebars;
		module.exports = exports["default"];
		
	} (parser, parser.exports));

	var parserExports = parser.exports;

	var whitespaceControl = {exports: {}};

	var visitor = {exports: {}};

	(function (module, exports) {

		exports.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _exception = exceptionExports;

		var _exception2 = _interopRequireDefault(_exception);

		function Visitor() {
		  this.parents = [];
		}

		Visitor.prototype = {
		  constructor: Visitor,
		  mutating: false,

		  // Visits a given value. If mutating, will replace the value if necessary.
		  acceptKey: function acceptKey(node, name) {
		    var value = this.accept(node[name]);
		    if (this.mutating) {
		      // Hacky sanity check: This may have a few false positives for type for the helper
		      // methods but will generally do the right thing without a lot of overhead.
		      if (value && !Visitor.prototype[value.type]) {
		        throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
		      }
		      node[name] = value;
		    }
		  },

		  // Performs an accept operation with added sanity check to ensure
		  // required keys are not removed.
		  acceptRequired: function acceptRequired(node, name) {
		    this.acceptKey(node, name);

		    if (!node[name]) {
		      throw new _exception2['default'](node.type + ' requires ' + name);
		    }
		  },

		  // Traverses a given array. If mutating, empty respnses will be removed
		  // for child elements.
		  acceptArray: function acceptArray(array) {
		    for (var i = 0, l = array.length; i < l; i++) {
		      this.acceptKey(array, i);

		      if (!array[i]) {
		        array.splice(i, 1);
		        i--;
		        l--;
		      }
		    }
		  },

		  accept: function accept(object) {
		    if (!object) {
		      return;
		    }

		    /* istanbul ignore next: Sanity code */
		    if (!this[object.type]) {
		      throw new _exception2['default']('Unknown type: ' + object.type, object);
		    }

		    if (this.current) {
		      this.parents.unshift(this.current);
		    }
		    this.current = object;

		    var ret = this[object.type](object);

		    this.current = this.parents.shift();

		    if (!this.mutating || ret) {
		      return ret;
		    } else if (ret !== false) {
		      return object;
		    }
		  },

		  Program: function Program(program) {
		    this.acceptArray(program.body);
		  },

		  MustacheStatement: visitSubExpression,
		  Decorator: visitSubExpression,

		  BlockStatement: visitBlock,
		  DecoratorBlock: visitBlock,

		  PartialStatement: visitPartial,
		  PartialBlockStatement: function PartialBlockStatement(partial) {
		    visitPartial.call(this, partial);

		    this.acceptKey(partial, 'program');
		  },

		  ContentStatement: function ContentStatement() /* content */{},
		  CommentStatement: function CommentStatement() /* comment */{},

		  SubExpression: visitSubExpression,

		  PathExpression: function PathExpression() /* path */{},

		  StringLiteral: function StringLiteral() /* string */{},
		  NumberLiteral: function NumberLiteral() /* number */{},
		  BooleanLiteral: function BooleanLiteral() /* bool */{},
		  UndefinedLiteral: function UndefinedLiteral() /* literal */{},
		  NullLiteral: function NullLiteral() /* literal */{},

		  Hash: function Hash(hash) {
		    this.acceptArray(hash.pairs);
		  },
		  HashPair: function HashPair(pair) {
		    this.acceptRequired(pair, 'value');
		  }
		};

		function visitSubExpression(mustache) {
		  this.acceptRequired(mustache, 'path');
		  this.acceptArray(mustache.params);
		  this.acceptKey(mustache, 'hash');
		}
		function visitBlock(block) {
		  visitSubExpression.call(this, block);

		  this.acceptKey(block, 'program');
		  this.acceptKey(block, 'inverse');
		}
		function visitPartial(partial) {
		  this.acceptRequired(partial, 'name');
		  this.acceptArray(partial.params);
		  this.acceptKey(partial, 'hash');
		}

		exports['default'] = Visitor;
		module.exports = exports['default'];
		
	} (visitor, visitor.exports));

	var visitorExports = visitor.exports;

	(function (module, exports) {

		exports.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _visitor = visitorExports;

		var _visitor2 = _interopRequireDefault(_visitor);

		function WhitespaceControl() {
		  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		  this.options = options;
		}
		WhitespaceControl.prototype = new _visitor2['default']();

		WhitespaceControl.prototype.Program = function (program) {
		  var doStandalone = !this.options.ignoreStandalone;

		  var isRoot = !this.isRootSeen;
		  this.isRootSeen = true;

		  var body = program.body;
		  for (var i = 0, l = body.length; i < l; i++) {
		    var current = body[i],
		        strip = this.accept(current);

		    if (!strip) {
		      continue;
		    }

		    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
		        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
		        openStandalone = strip.openStandalone && _isPrevWhitespace,
		        closeStandalone = strip.closeStandalone && _isNextWhitespace,
		        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

		    if (strip.close) {
		      omitRight(body, i, true);
		    }
		    if (strip.open) {
		      omitLeft(body, i, true);
		    }

		    if (doStandalone && inlineStandalone) {
		      omitRight(body, i);

		      if (omitLeft(body, i)) {
		        // If we are on a standalone node, save the indent info for partials
		        if (current.type === 'PartialStatement') {
		          // Pull out the whitespace from the final line
		          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
		        }
		      }
		    }
		    if (doStandalone && openStandalone) {
		      omitRight((current.program || current.inverse).body);

		      // Strip out the previous content node if it's whitespace only
		      omitLeft(body, i);
		    }
		    if (doStandalone && closeStandalone) {
		      // Always strip the next node
		      omitRight(body, i);

		      omitLeft((current.inverse || current.program).body);
		    }
		  }

		  return program;
		};

		WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
		  this.accept(block.program);
		  this.accept(block.inverse);

		  // Find the inverse program that is involed with whitespace stripping.
		  var program = block.program || block.inverse,
		      inverse = block.program && block.inverse,
		      firstInverse = inverse,
		      lastInverse = inverse;

		  if (inverse && inverse.chained) {
		    firstInverse = inverse.body[0].program;

		    // Walk the inverse chain to find the last inverse that is actually in the chain.
		    while (lastInverse.chained) {
		      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
		    }
		  }

		  var strip = {
		    open: block.openStrip.open,
		    close: block.closeStrip.close,

		    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
		    // so our parent can determine if we actually are standalone
		    openStandalone: isNextWhitespace(program.body),
		    closeStandalone: isPrevWhitespace((firstInverse || program).body)
		  };

		  if (block.openStrip.close) {
		    omitRight(program.body, null, true);
		  }

		  if (inverse) {
		    var inverseStrip = block.inverseStrip;

		    if (inverseStrip.open) {
		      omitLeft(program.body, null, true);
		    }

		    if (inverseStrip.close) {
		      omitRight(firstInverse.body, null, true);
		    }
		    if (block.closeStrip.open) {
		      omitLeft(lastInverse.body, null, true);
		    }

		    // Find standalone else statments
		    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
		      omitLeft(program.body);
		      omitRight(firstInverse.body);
		    }
		  } else if (block.closeStrip.open) {
		    omitLeft(program.body, null, true);
		  }

		  return strip;
		};

		WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
		  return mustache.strip;
		};

		WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
		  /* istanbul ignore next */
		  var strip = node.strip || {};
		  return {
		    inlineStandalone: true,
		    open: strip.open,
		    close: strip.close
		  };
		};

		function isPrevWhitespace(body, i, isRoot) {
		  if (i === undefined) {
		    i = body.length;
		  }

		  // Nodes that end with newlines are considered whitespace (but are special
		  // cased for strip operations)
		  var prev = body[i - 1],
		      sibling = body[i - 2];
		  if (!prev) {
		    return isRoot;
		  }

		  if (prev.type === 'ContentStatement') {
		    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
		  }
		}
		function isNextWhitespace(body, i, isRoot) {
		  if (i === undefined) {
		    i = -1;
		  }

		  var next = body[i + 1],
		      sibling = body[i + 2];
		  if (!next) {
		    return isRoot;
		  }

		  if (next.type === 'ContentStatement') {
		    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
		  }
		}

		// Marks the node to the right of the position as omitted.
		// I.e. {{foo}}' ' will mark the ' ' node as omitted.
		//
		// If i is undefined, then the first child will be marked as such.
		//
		// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
		// content is met.
		function omitRight(body, i, multiple) {
		  var current = body[i == null ? 0 : i + 1];
		  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
		    return;
		  }

		  var original = current.value;
		  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
		  current.rightStripped = current.value !== original;
		}

		// Marks the node to the left of the position as omitted.
		// I.e. ' '{{foo}} will mark the ' ' node as omitted.
		//
		// If i is undefined then the last child will be marked as such.
		//
		// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
		// content is met.
		function omitLeft(body, i, multiple) {
		  var current = body[i == null ? body.length - 1 : i - 1];
		  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
		    return;
		  }

		  // We omit the last node if it's whitespace only and not preceded by a non-content node.
		  var original = current.value;
		  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
		  current.leftStripped = current.value !== original;
		  return current.leftStripped;
		}

		exports['default'] = WhitespaceControl;
		module.exports = exports['default'];
		
	} (whitespaceControl, whitespaceControl.exports));

	var whitespaceControlExports = whitespaceControl.exports;

	var helpers = {};

	helpers.__esModule = true;
	helpers.SourceLocation = SourceLocation;
	helpers.id = id;
	helpers.stripFlags = stripFlags;
	helpers.stripComment = stripComment;
	helpers.preparePath = preparePath;
	helpers.prepareMustache = prepareMustache;
	helpers.prepareRawBlock = prepareRawBlock;
	helpers.prepareBlock = prepareBlock;
	helpers.prepareProgram = prepareProgram;
	helpers.preparePartialBlock = preparePartialBlock;
	// istanbul ignore next

	function _interopRequireDefault$2(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _exception$1 = exceptionExports;

	var _exception2$1 = _interopRequireDefault$2(_exception$1);

	function validateClose(open, close) {
	  close = close.path ? close.path.original : close;

	  if (open.path.original !== close) {
	    var errorNode = { loc: open.path.loc };

	    throw new _exception2$1['default'](open.path.original + " doesn't match " + close, errorNode);
	  }
	}

	function SourceLocation(source, locInfo) {
	  this.source = source;
	  this.start = {
	    line: locInfo.first_line,
	    column: locInfo.first_column
	  };
	  this.end = {
	    line: locInfo.last_line,
	    column: locInfo.last_column
	  };
	}

	function id(token) {
	  if (/^\[.*\]$/.test(token)) {
	    return token.substring(1, token.length - 1);
	  } else {
	    return token;
	  }
	}

	function stripFlags(open, close) {
	  return {
	    open: open.charAt(2) === '~',
	    close: close.charAt(close.length - 3) === '~'
	  };
	}

	function stripComment(comment) {
	  return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
	}

	function preparePath(data, parts, loc) {
	  loc = this.locInfo(loc);

	  var original = data ? '@' : '',
	      dig = [],
	      depth = 0;

	  for (var i = 0, l = parts.length; i < l; i++) {
	    var part = parts[i].part,

	    // If we have [] syntax then we do not treat path references as operators,
	    // i.e. foo.[this] resolves to approximately context.foo['this']
	    isLiteral = parts[i].original !== part;
	    original += (parts[i].separator || '') + part;

	    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
	      if (dig.length > 0) {
	        throw new _exception2$1['default']('Invalid path: ' + original, { loc: loc });
	      } else if (part === '..') {
	        depth++;
	      }
	    } else {
	      dig.push(part);
	    }
	  }

	  return {
	    type: 'PathExpression',
	    data: data,
	    depth: depth,
	    parts: dig,
	    original: original,
	    loc: loc
	  };
	}

	function prepareMustache(path, params, hash, open, strip, locInfo) {
	  // Must use charAt to support IE pre-10
	  var escapeFlag = open.charAt(3) || open.charAt(2),
	      escaped = escapeFlag !== '{' && escapeFlag !== '&';

	  var decorator = /\*/.test(open);
	  return {
	    type: decorator ? 'Decorator' : 'MustacheStatement',
	    path: path,
	    params: params,
	    hash: hash,
	    escaped: escaped,
	    strip: strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareRawBlock(openRawBlock, contents, close, locInfo) {
	  validateClose(openRawBlock, close);

	  locInfo = this.locInfo(locInfo);
	  var program = {
	    type: 'Program',
	    body: contents,
	    strip: {},
	    loc: locInfo
	  };

	  return {
	    type: 'BlockStatement',
	    path: openRawBlock.path,
	    params: openRawBlock.params,
	    hash: openRawBlock.hash,
	    program: program,
	    openStrip: {},
	    inverseStrip: {},
	    closeStrip: {},
	    loc: locInfo
	  };
	}

	function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
	  if (close && close.path) {
	    validateClose(openBlock, close);
	  }

	  var decorator = /\*/.test(openBlock.open);

	  program.blockParams = openBlock.blockParams;

	  var inverse = undefined,
	      inverseStrip = undefined;

	  if (inverseAndProgram) {
	    if (decorator) {
	      throw new _exception2$1['default']('Unexpected inverse block on decorator', inverseAndProgram);
	    }

	    if (inverseAndProgram.chain) {
	      inverseAndProgram.program.body[0].closeStrip = close.strip;
	    }

	    inverseStrip = inverseAndProgram.strip;
	    inverse = inverseAndProgram.program;
	  }

	  if (inverted) {
	    inverted = inverse;
	    inverse = program;
	    program = inverted;
	  }

	  return {
	    type: decorator ? 'DecoratorBlock' : 'BlockStatement',
	    path: openBlock.path,
	    params: openBlock.params,
	    hash: openBlock.hash,
	    program: program,
	    inverse: inverse,
	    openStrip: openBlock.strip,
	    inverseStrip: inverseStrip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareProgram(statements, loc) {
	  if (!loc && statements.length) {
	    var firstLoc = statements[0].loc,
	        lastLoc = statements[statements.length - 1].loc;

	    /* istanbul ignore else */
	    if (firstLoc && lastLoc) {
	      loc = {
	        source: firstLoc.source,
	        start: {
	          line: firstLoc.start.line,
	          column: firstLoc.start.column
	        },
	        end: {
	          line: lastLoc.end.line,
	          column: lastLoc.end.column
	        }
	      };
	    }
	  }

	  return {
	    type: 'Program',
	    body: statements,
	    strip: {},
	    loc: loc
	  };
	}

	function preparePartialBlock(open, program, close, locInfo) {
	  validateClose(open, close);

	  return {
	    type: 'PartialBlockStatement',
	    name: open.path,
	    params: open.params,
	    hash: open.hash,
	    program: program,
	    openStrip: open.strip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	base.__esModule = true;
	base.parseWithoutProcessing = parseWithoutProcessing;
	base.parse = parse;
	// istanbul ignore next

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	// istanbul ignore next

	function _interopRequireDefault$1(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _parser = parserExports;

	var _parser2 = _interopRequireDefault$1(_parser);

	var _whitespaceControl = whitespaceControlExports;

	var _whitespaceControl2 = _interopRequireDefault$1(_whitespaceControl);

	var _helpers = helpers;

	var Helpers = _interopRequireWildcard(_helpers);

	var _utils$1 = utils;

	base.parser = _parser2['default'];

	var yy = {};
	_utils$1.extend(yy, Helpers);

	function parseWithoutProcessing(input, options) {
	  // Just return if an already-compiled AST was passed in.
	  if (input.type === 'Program') {
	    return input;
	  }

	  _parser2['default'].yy = yy;

	  // Altering the shared object here, but this is ok as parser is a sync operation
	  yy.locInfo = function (locInfo) {
	    return new yy.SourceLocation(options && options.srcName, locInfo);
	  };

	  var ast = _parser2['default'].parse(input);

	  return ast;
	}

	function parse(input, options) {
	  var ast = parseWithoutProcessing(input, options);
	  var strip = new _whitespaceControl2['default'](options);

	  return strip.accept(ast);
	}

	var compiler = {};

	/* eslint-disable new-cap */

	compiler.__esModule = true;
	compiler.Compiler = Compiler;
	compiler.precompile = precompile;
	compiler.compile = compile;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _exception = exceptionExports;

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = utils;

	var _ast = astExports;

	var _ast2 = _interopRequireDefault(_ast);

	var slice = [].slice;

	function Compiler() {}

	// the foundHelper register will disambiguate helper lookup from finding a
	// function in a context. This is necessary for mustache compatibility, which
	// requires that context functions in blocks are evaluated by blockHelperMissing,
	// and then proceed as if the resulting value was provided to blockHelperMissing.

	Compiler.prototype = {
	  compiler: Compiler,

	  equals: function equals(other) {
	    var len = this.opcodes.length;
	    if (other.opcodes.length !== len) {
	      return false;
	    }

	    for (var i = 0; i < len; i++) {
	      var opcode = this.opcodes[i],
	          otherOpcode = other.opcodes[i];
	      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
	        return false;
	      }
	    }

	    // We know that length is the same between the two arrays because they are directly tied
	    // to the opcode behavior above.
	    len = this.children.length;
	    for (var i = 0; i < len; i++) {
	      if (!this.children[i].equals(other.children[i])) {
	        return false;
	      }
	    }

	    return true;
	  },

	  guid: 0,

	  compile: function compile(program, options) {
	    this.sourceNode = [];
	    this.opcodes = [];
	    this.children = [];
	    this.options = options;
	    this.stringParams = options.stringParams;
	    this.trackIds = options.trackIds;

	    options.blockParams = options.blockParams || [];

	    options.knownHelpers = _utils.extend(Object.create(null), {
	      helperMissing: true,
	      blockHelperMissing: true,
	      each: true,
	      'if': true,
	      unless: true,
	      'with': true,
	      log: true,
	      lookup: true
	    }, options.knownHelpers);

	    return this.accept(program);
	  },

	  compileProgram: function compileProgram(program) {
	    var childCompiler = new this.compiler(),
	        // eslint-disable-line new-cap
	    result = childCompiler.compile(program, this.options),
	        guid = this.guid++;

	    this.usePartial = this.usePartial || result.usePartial;

	    this.children[guid] = result;
	    this.useDepths = this.useDepths || result.useDepths;

	    return guid;
	  },

	  accept: function accept(node) {
	    /* istanbul ignore next: Sanity code */
	    if (!this[node.type]) {
	      throw new _exception2['default']('Unknown type: ' + node.type, node);
	    }

	    this.sourceNode.unshift(node);
	    var ret = this[node.type](node);
	    this.sourceNode.shift();
	    return ret;
	  },

	  Program: function Program(program) {
	    this.options.blockParams.unshift(program.blockParams);

	    var body = program.body,
	        bodyLength = body.length;
	    for (var i = 0; i < bodyLength; i++) {
	      this.accept(body[i]);
	    }

	    this.options.blockParams.shift();

	    this.isSimple = bodyLength === 1;
	    this.blockParams = program.blockParams ? program.blockParams.length : 0;

	    return this;
	  },

	  BlockStatement: function BlockStatement(block) {
	    transformLiteralToPath(block);

	    var program = block.program,
	        inverse = block.inverse;

	    program = program && this.compileProgram(program);
	    inverse = inverse && this.compileProgram(inverse);

	    var type = this.classifySexpr(block);

	    if (type === 'helper') {
	      this.helperSexpr(block, program, inverse);
	    } else if (type === 'simple') {
	      this.simpleSexpr(block);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('blockValue', block.path.original);
	    } else {
	      this.ambiguousSexpr(block, program, inverse);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('ambiguousBlockValue');
	    }

	    this.opcode('append');
	  },

	  DecoratorBlock: function DecoratorBlock(decorator) {
	    var program = decorator.program && this.compileProgram(decorator.program);
	    var params = this.setupFullMustacheParams(decorator, program, undefined),
	        path = decorator.path;

	    this.useDecorators = true;
	    this.opcode('registerDecorator', params.length, path.original);
	  },

	  PartialStatement: function PartialStatement(partial) {
	    this.usePartial = true;

	    var program = partial.program;
	    if (program) {
	      program = this.compileProgram(partial.program);
	    }

	    var params = partial.params;
	    if (params.length > 1) {
	      throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
	    } else if (!params.length) {
	      if (this.options.explicitPartialContext) {
	        this.opcode('pushLiteral', 'undefined');
	      } else {
	        params.push({ type: 'PathExpression', parts: [], depth: 0 });
	      }
	    }

	    var partialName = partial.name.original,
	        isDynamic = partial.name.type === 'SubExpression';
	    if (isDynamic) {
	      this.accept(partial.name);
	    }

	    this.setupFullMustacheParams(partial, program, undefined, true);

	    var indent = partial.indent || '';
	    if (this.options.preventIndent && indent) {
	      this.opcode('appendContent', indent);
	      indent = '';
	    }

	    this.opcode('invokePartial', isDynamic, partialName, indent);
	    this.opcode('append');
	  },
	  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
	    this.PartialStatement(partialBlock);
	  },

	  MustacheStatement: function MustacheStatement(mustache) {
	    this.SubExpression(mustache);

	    if (mustache.escaped && !this.options.noEscape) {
	      this.opcode('appendEscaped');
	    } else {
	      this.opcode('append');
	    }
	  },
	  Decorator: function Decorator(decorator) {
	    this.DecoratorBlock(decorator);
	  },

	  ContentStatement: function ContentStatement(content) {
	    if (content.value) {
	      this.opcode('appendContent', content.value);
	    }
	  },

	  CommentStatement: function CommentStatement() {},

	  SubExpression: function SubExpression(sexpr) {
	    transformLiteralToPath(sexpr);
	    var type = this.classifySexpr(sexpr);

	    if (type === 'simple') {
	      this.simpleSexpr(sexpr);
	    } else if (type === 'helper') {
	      this.helperSexpr(sexpr);
	    } else {
	      this.ambiguousSexpr(sexpr);
	    }
	  },
	  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
	    var path = sexpr.path,
	        name = path.parts[0],
	        isBlock = program != null || inverse != null;

	    this.opcode('getContext', path.depth);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    path.strict = true;
	    this.accept(path);

	    this.opcode('invokeAmbiguous', name, isBlock);
	  },

	  simpleSexpr: function simpleSexpr(sexpr) {
	    var path = sexpr.path;
	    path.strict = true;
	    this.accept(path);
	    this.opcode('resolvePossibleLambda');
	  },

	  helperSexpr: function helperSexpr(sexpr, program, inverse) {
	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
	        path = sexpr.path,
	        name = path.parts[0];

	    if (this.options.knownHelpers[name]) {
	      this.opcode('invokeKnownHelper', params.length, name);
	    } else if (this.options.knownHelpersOnly) {
	      throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
	    } else {
	      path.strict = true;
	      path.falsy = true;

	      this.accept(path);
	      this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
	    }
	  },

	  PathExpression: function PathExpression(path) {
	    this.addDepth(path.depth);
	    this.opcode('getContext', path.depth);

	    var name = path.parts[0],
	        scoped = _ast2['default'].helpers.scopedId(path),
	        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

	    if (blockParamId) {
	      this.opcode('lookupBlockParam', blockParamId, path.parts);
	    } else if (!name) {
	      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
	      this.opcode('pushContext');
	    } else if (path.data) {
	      this.options.data = true;
	      this.opcode('lookupData', path.depth, path.parts, path.strict);
	    } else {
	      this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
	    }
	  },

	  StringLiteral: function StringLiteral(string) {
	    this.opcode('pushString', string.value);
	  },

	  NumberLiteral: function NumberLiteral(number) {
	    this.opcode('pushLiteral', number.value);
	  },

	  BooleanLiteral: function BooleanLiteral(bool) {
	    this.opcode('pushLiteral', bool.value);
	  },

	  UndefinedLiteral: function UndefinedLiteral() {
	    this.opcode('pushLiteral', 'undefined');
	  },

	  NullLiteral: function NullLiteral() {
	    this.opcode('pushLiteral', 'null');
	  },

	  Hash: function Hash(hash) {
	    var pairs = hash.pairs,
	        i = 0,
	        l = pairs.length;

	    this.opcode('pushHash');

	    for (; i < l; i++) {
	      this.pushParam(pairs[i].value);
	    }
	    while (i--) {
	      this.opcode('assignToHash', pairs[i].key);
	    }
	    this.opcode('popHash');
	  },

	  // HELPERS
	  opcode: function opcode(name) {
	    this.opcodes.push({
	      opcode: name,
	      args: slice.call(arguments, 1),
	      loc: this.sourceNode[0].loc
	    });
	  },

	  addDepth: function addDepth(depth) {
	    if (!depth) {
	      return;
	    }

	    this.useDepths = true;
	  },

	  classifySexpr: function classifySexpr(sexpr) {
	    var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

	    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	    var isEligible = !isBlockParam && (isHelper || isSimple);

	    // if ambiguous, we can possibly resolve the ambiguity now
	    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
	    if (isEligible && !isHelper) {
	      var _name = sexpr.path.parts[0],
	          options = this.options;
	      if (options.knownHelpers[_name]) {
	        isHelper = true;
	      } else if (options.knownHelpersOnly) {
	        isEligible = false;
	      }
	    }

	    if (isHelper) {
	      return 'helper';
	    } else if (isEligible) {
	      return 'ambiguous';
	    } else {
	      return 'simple';
	    }
	  },

	  pushParams: function pushParams(params) {
	    for (var i = 0, l = params.length; i < l; i++) {
	      this.pushParam(params[i]);
	    }
	  },

	  pushParam: function pushParam(val) {
	    var value = val.value != null ? val.value : val.original || '';

	    if (this.stringParams) {
	      if (value.replace) {
	        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
	      }

	      if (val.depth) {
	        this.addDepth(val.depth);
	      }
	      this.opcode('getContext', val.depth || 0);
	      this.opcode('pushStringParam', value, val.type);

	      if (val.type === 'SubExpression') {
	        // SubExpressions get evaluated and passed in
	        // in string params mode.
	        this.accept(val);
	      }
	    } else {
	      if (this.trackIds) {
	        var blockParamIndex = undefined;
	        if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
	          blockParamIndex = this.blockParamIndex(val.parts[0]);
	        }
	        if (blockParamIndex) {
	          var blockParamChild = val.parts.slice(1).join('.');
	          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
	        } else {
	          value = val.original || value;
	          if (value.replace) {
	            value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
	          }

	          this.opcode('pushId', val.type, value);
	        }
	      }
	      this.accept(val);
	    }
	  },

	  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
	    var params = sexpr.params;
	    this.pushParams(params);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    if (sexpr.hash) {
	      this.accept(sexpr.hash);
	    } else {
	      this.opcode('emptyHash', omitEmpty);
	    }

	    return params;
	  },

	  blockParamIndex: function blockParamIndex(name) {
	    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
	      var blockParams = this.options.blockParams[depth],
	          param = blockParams && _utils.indexOf(blockParams, name);
	      if (blockParams && param >= 0) {
	        return [depth, param];
	      }
	    }
	  }
	};

	function precompile(input, options, env) {
	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var ast = env.parse(input, options),
	      environment = new env.Compiler().compile(ast, options);
	  return new env.JavaScriptCompiler().compile(environment, options);
	}

	function compile(input, options, env) {
	  if (options === undefined) options = {};

	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
	  }

	  options = _utils.extend({}, options);
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var compiled = undefined;

	  function compileInput() {
	    var ast = env.parse(input, options),
	        environment = new env.Compiler().compile(ast, options),
	        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return env.template(templateSpec);
	  }

	  // Template is only compiled on first use and cached after that point.
	  function ret(context, execOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled.call(this, context, execOptions);
	  }
	  ret._setup = function (setupOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._setup(setupOptions);
	  };
	  ret._child = function (i, data, blockParams, depths) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._child(i, data, blockParams, depths);
	  };
	  return ret;
	}

	function argEquals(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
	    for (var i = 0; i < a.length; i++) {
	      if (!argEquals(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	function transformLiteralToPath(sexpr) {
	  if (!sexpr.path.parts) {
	    var literal = sexpr.path;
	    // Casting to string here to make false and 0 literal values play nicely with the rest
	    // of the system.
	    sexpr.path = {
	      type: 'PathExpression',
	      data: false,
	      depth: 0,
	      parts: [literal.original + ''],
	      original: literal.original + '',
	      loc: literal.loc
	    };
	  }
	}

	var javascriptCompiler = {exports: {}};

	var codeGen = {exports: {}};

	var sourceMap = {};

	var sourceMapGenerator = {};

	var base64Vlq = {};

	var base64 = {};

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredBase64;

	function requireBase64 () {
		if (hasRequiredBase64) return base64;
		hasRequiredBase64 = 1;
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

		/**
		 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
		 */
		base64.encode = function (number) {
		  if (0 <= number && number < intToCharMap.length) {
		    return intToCharMap[number];
		  }
		  throw new TypeError("Must be between 0 and 63: " + number);
		};

		/**
		 * Decode a single base 64 character code digit to an integer. Returns -1 on
		 * failure.
		 */
		base64.decode = function (charCode) {
		  var bigA = 65;     // 'A'
		  var bigZ = 90;     // 'Z'

		  var littleA = 97;  // 'a'
		  var littleZ = 122; // 'z'

		  var zero = 48;     // '0'
		  var nine = 57;     // '9'

		  var plus = 43;     // '+'
		  var slash = 47;    // '/'

		  var littleOffset = 26;
		  var numberOffset = 52;

		  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
		  if (bigA <= charCode && charCode <= bigZ) {
		    return (charCode - bigA);
		  }

		  // 26 - 51: abcdefghijklmnopqrstuvwxyz
		  if (littleA <= charCode && charCode <= littleZ) {
		    return (charCode - littleA + littleOffset);
		  }

		  // 52 - 61: 0123456789
		  if (zero <= charCode && charCode <= nine) {
		    return (charCode - zero + numberOffset);
		  }

		  // 62: +
		  if (charCode == plus) {
		    return 62;
		  }

		  // 63: /
		  if (charCode == slash) {
		    return 63;
		  }

		  // Invalid base64 digit.
		  return -1;
		};
		return base64;
	}

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredBase64Vlq;

	function requireBase64Vlq () {
		if (hasRequiredBase64Vlq) return base64Vlq;
		hasRequiredBase64Vlq = 1;
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 *
		 * Based on the Base 64 VLQ implementation in Closure Compiler:
		 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
		 *
		 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
		 * Redistribution and use in source and binary forms, with or without
		 * modification, are permitted provided that the following conditions are
		 * met:
		 *
		 *  * Redistributions of source code must retain the above copyright
		 *    notice, this list of conditions and the following disclaimer.
		 *  * Redistributions in binary form must reproduce the above
		 *    copyright notice, this list of conditions and the following
		 *    disclaimer in the documentation and/or other materials provided
		 *    with the distribution.
		 *  * Neither the name of Google Inc. nor the names of its
		 *    contributors may be used to endorse or promote products derived
		 *    from this software without specific prior written permission.
		 *
		 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
		 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
		 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
		 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
		 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
		 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
		 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
		 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
		 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
		 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		 */

		var base64 = requireBase64();

		// A single base 64 digit can contain 6 bits of data. For the base 64 variable
		// length quantities we use in the source map spec, the first bit is the sign,
		// the next four bits are the actual value, and the 6th bit is the
		// continuation bit. The continuation bit tells us whether there are more
		// digits in this value following this digit.
		//
		//   Continuation
		//   |    Sign
		//   |    |
		//   V    V
		//   101011

		var VLQ_BASE_SHIFT = 5;

		// binary: 100000
		var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

		// binary: 011111
		var VLQ_BASE_MASK = VLQ_BASE - 1;

		// binary: 100000
		var VLQ_CONTINUATION_BIT = VLQ_BASE;

		/**
		 * Converts from a two-complement value to a value where the sign bit is
		 * placed in the least significant bit.  For example, as decimals:
		 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
		 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
		 */
		function toVLQSigned(aValue) {
		  return aValue < 0
		    ? ((-aValue) << 1) + 1
		    : (aValue << 1) + 0;
		}

		/**
		 * Converts to a two-complement value from a value where the sign bit is
		 * placed in the least significant bit.  For example, as decimals:
		 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
		 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
		 */
		function fromVLQSigned(aValue) {
		  var isNegative = (aValue & 1) === 1;
		  var shifted = aValue >> 1;
		  return isNegative
		    ? -shifted
		    : shifted;
		}

		/**
		 * Returns the base 64 VLQ encoded value.
		 */
		base64Vlq.encode = function base64VLQ_encode(aValue) {
		  var encoded = "";
		  var digit;

		  var vlq = toVLQSigned(aValue);

		  do {
		    digit = vlq & VLQ_BASE_MASK;
		    vlq >>>= VLQ_BASE_SHIFT;
		    if (vlq > 0) {
		      // There are still more digits in this value, so we must make sure the
		      // continuation bit is marked.
		      digit |= VLQ_CONTINUATION_BIT;
		    }
		    encoded += base64.encode(digit);
		  } while (vlq > 0);

		  return encoded;
		};

		/**
		 * Decodes the next base 64 VLQ value from the given string and returns the
		 * value and the rest of the string via the out parameter.
		 */
		base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		  var strLen = aStr.length;
		  var result = 0;
		  var shift = 0;
		  var continuation, digit;

		  do {
		    if (aIndex >= strLen) {
		      throw new Error("Expected more digits in base 64 VLQ value.");
		    }

		    digit = base64.decode(aStr.charCodeAt(aIndex++));
		    if (digit === -1) {
		      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
		    }

		    continuation = !!(digit & VLQ_CONTINUATION_BIT);
		    digit &= VLQ_BASE_MASK;
		    result = result + (digit << shift);
		    shift += VLQ_BASE_SHIFT;
		  } while (continuation);

		  aOutParam.value = fromVLQSigned(result);
		  aOutParam.rest = aIndex;
		};
		return base64Vlq;
	}

	var util = {};

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return util;
		hasRequiredUtil = 1;
		(function (exports) {
			/*
			 * Copyright 2011 Mozilla Foundation and contributors
			 * Licensed under the New BSD license. See LICENSE or:
			 * http://opensource.org/licenses/BSD-3-Clause
			 */

			/**
			 * This is a helper function for getting values from parameter/options
			 * objects.
			 *
			 * @param args The object we are extracting values from
			 * @param name The name of the property we are getting.
			 * @param defaultValue An optional value to return if the property is missing
			 * from the object. If this is not specified and the property is missing, an
			 * error will be thrown.
			 */
			function getArg(aArgs, aName, aDefaultValue) {
			  if (aName in aArgs) {
			    return aArgs[aName];
			  } else if (arguments.length === 3) {
			    return aDefaultValue;
			  } else {
			    throw new Error('"' + aName + '" is a required argument.');
			  }
			}
			exports.getArg = getArg;

			var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
			var dataUrlRegexp = /^data:.+\,.+$/;

			function urlParse(aUrl) {
			  var match = aUrl.match(urlRegexp);
			  if (!match) {
			    return null;
			  }
			  return {
			    scheme: match[1],
			    auth: match[2],
			    host: match[3],
			    port: match[4],
			    path: match[5]
			  };
			}
			exports.urlParse = urlParse;

			function urlGenerate(aParsedUrl) {
			  var url = '';
			  if (aParsedUrl.scheme) {
			    url += aParsedUrl.scheme + ':';
			  }
			  url += '//';
			  if (aParsedUrl.auth) {
			    url += aParsedUrl.auth + '@';
			  }
			  if (aParsedUrl.host) {
			    url += aParsedUrl.host;
			  }
			  if (aParsedUrl.port) {
			    url += ":" + aParsedUrl.port;
			  }
			  if (aParsedUrl.path) {
			    url += aParsedUrl.path;
			  }
			  return url;
			}
			exports.urlGenerate = urlGenerate;

			/**
			 * Normalizes a path, or the path portion of a URL:
			 *
			 * - Replaces consecutive slashes with one slash.
			 * - Removes unnecessary '.' parts.
			 * - Removes unnecessary '<dir>/..' parts.
			 *
			 * Based on code in the Node.js 'path' core module.
			 *
			 * @param aPath The path or url to normalize.
			 */
			function normalize(aPath) {
			  var path = aPath;
			  var url = urlParse(aPath);
			  if (url) {
			    if (!url.path) {
			      return aPath;
			    }
			    path = url.path;
			  }
			  var isAbsolute = exports.isAbsolute(path);

			  var parts = path.split(/\/+/);
			  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
			    part = parts[i];
			    if (part === '.') {
			      parts.splice(i, 1);
			    } else if (part === '..') {
			      up++;
			    } else if (up > 0) {
			      if (part === '') {
			        // The first part is blank if the path is absolute. Trying to go
			        // above the root is a no-op. Therefore we can remove all '..' parts
			        // directly after the root.
			        parts.splice(i + 1, up);
			        up = 0;
			      } else {
			        parts.splice(i, 2);
			        up--;
			      }
			    }
			  }
			  path = parts.join('/');

			  if (path === '') {
			    path = isAbsolute ? '/' : '.';
			  }

			  if (url) {
			    url.path = path;
			    return urlGenerate(url);
			  }
			  return path;
			}
			exports.normalize = normalize;

			/**
			 * Joins two paths/URLs.
			 *
			 * @param aRoot The root path or URL.
			 * @param aPath The path or URL to be joined with the root.
			 *
			 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
			 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
			 *   first.
			 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
			 *   is updated with the result and aRoot is returned. Otherwise the result
			 *   is returned.
			 *   - If aPath is absolute, the result is aPath.
			 *   - Otherwise the two paths are joined with a slash.
			 * - Joining for example 'http://' and 'www.example.com' is also supported.
			 */
			function join(aRoot, aPath) {
			  if (aRoot === "") {
			    aRoot = ".";
			  }
			  if (aPath === "") {
			    aPath = ".";
			  }
			  var aPathUrl = urlParse(aPath);
			  var aRootUrl = urlParse(aRoot);
			  if (aRootUrl) {
			    aRoot = aRootUrl.path || '/';
			  }

			  // `join(foo, '//www.example.org')`
			  if (aPathUrl && !aPathUrl.scheme) {
			    if (aRootUrl) {
			      aPathUrl.scheme = aRootUrl.scheme;
			    }
			    return urlGenerate(aPathUrl);
			  }

			  if (aPathUrl || aPath.match(dataUrlRegexp)) {
			    return aPath;
			  }

			  // `join('http://', 'www.example.com')`
			  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
			    aRootUrl.host = aPath;
			    return urlGenerate(aRootUrl);
			  }

			  var joined = aPath.charAt(0) === '/'
			    ? aPath
			    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

			  if (aRootUrl) {
			    aRootUrl.path = joined;
			    return urlGenerate(aRootUrl);
			  }
			  return joined;
			}
			exports.join = join;

			exports.isAbsolute = function (aPath) {
			  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
			};

			/**
			 * Make a path relative to a URL or another path.
			 *
			 * @param aRoot The root path or URL.
			 * @param aPath The path or URL to be made relative to aRoot.
			 */
			function relative(aRoot, aPath) {
			  if (aRoot === "") {
			    aRoot = ".";
			  }

			  aRoot = aRoot.replace(/\/$/, '');

			  // It is possible for the path to be above the root. In this case, simply
			  // checking whether the root is a prefix of the path won't work. Instead, we
			  // need to remove components from the root one by one, until either we find
			  // a prefix that fits, or we run out of components to remove.
			  var level = 0;
			  while (aPath.indexOf(aRoot + '/') !== 0) {
			    var index = aRoot.lastIndexOf("/");
			    if (index < 0) {
			      return aPath;
			    }

			    // If the only part of the root that is left is the scheme (i.e. http://,
			    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
			    // have exhausted all components, so the path is not relative to the root.
			    aRoot = aRoot.slice(0, index);
			    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
			      return aPath;
			    }

			    ++level;
			  }

			  // Make sure we add a "../" for each component we removed from the root.
			  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
			}
			exports.relative = relative;

			var supportsNullProto = (function () {
			  var obj = Object.create(null);
			  return !('__proto__' in obj);
			}());

			function identity (s) {
			  return s;
			}

			/**
			 * Because behavior goes wacky when you set `__proto__` on objects, we
			 * have to prefix all the strings in our set with an arbitrary character.
			 *
			 * See https://github.com/mozilla/source-map/pull/31 and
			 * https://github.com/mozilla/source-map/issues/30
			 *
			 * @param String aStr
			 */
			function toSetString(aStr) {
			  if (isProtoString(aStr)) {
			    return '$' + aStr;
			  }

			  return aStr;
			}
			exports.toSetString = supportsNullProto ? identity : toSetString;

			function fromSetString(aStr) {
			  if (isProtoString(aStr)) {
			    return aStr.slice(1);
			  }

			  return aStr;
			}
			exports.fromSetString = supportsNullProto ? identity : fromSetString;

			function isProtoString(s) {
			  if (!s) {
			    return false;
			  }

			  var length = s.length;

			  if (length < 9 /* "__proto__".length */) {
			    return false;
			  }

			  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
			      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
			      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
			      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
			      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
			      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
			      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
			      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
			      s.charCodeAt(length - 9) !== 95  /* '_' */) {
			    return false;
			  }

			  for (var i = length - 10; i >= 0; i--) {
			    if (s.charCodeAt(i) !== 36 /* '$' */) {
			      return false;
			    }
			  }

			  return true;
			}

			/**
			 * Comparator between two mappings where the original positions are compared.
			 *
			 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
			 * mappings with the same original source/line/column, but different generated
			 * line and column the same. Useful when searching for a mapping with a
			 * stubbed out mapping.
			 */
			function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
			  var cmp = strcmp(mappingA.source, mappingB.source);
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = mappingA.originalLine - mappingB.originalLine;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = mappingA.originalColumn - mappingB.originalColumn;
			  if (cmp !== 0 || onlyCompareOriginal) {
			    return cmp;
			  }

			  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = mappingA.generatedLine - mappingB.generatedLine;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  return strcmp(mappingA.name, mappingB.name);
			}
			exports.compareByOriginalPositions = compareByOriginalPositions;

			/**
			 * Comparator between two mappings with deflated source and name indices where
			 * the generated positions are compared.
			 *
			 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
			 * mappings with the same generated line and column, but different
			 * source/name/original line and column the same. Useful when searching for a
			 * mapping with a stubbed out mapping.
			 */
			function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
			  var cmp = mappingA.generatedLine - mappingB.generatedLine;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
			  if (cmp !== 0 || onlyCompareGenerated) {
			    return cmp;
			  }

			  cmp = strcmp(mappingA.source, mappingB.source);
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = mappingA.originalLine - mappingB.originalLine;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = mappingA.originalColumn - mappingB.originalColumn;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  return strcmp(mappingA.name, mappingB.name);
			}
			exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

			function strcmp(aStr1, aStr2) {
			  if (aStr1 === aStr2) {
			    return 0;
			  }

			  if (aStr1 === null) {
			    return 1; // aStr2 !== null
			  }

			  if (aStr2 === null) {
			    return -1; // aStr1 !== null
			  }

			  if (aStr1 > aStr2) {
			    return 1;
			  }

			  return -1;
			}

			/**
			 * Comparator between two mappings with inflated source and name strings where
			 * the generated positions are compared.
			 */
			function compareByGeneratedPositionsInflated(mappingA, mappingB) {
			  var cmp = mappingA.generatedLine - mappingB.generatedLine;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = strcmp(mappingA.source, mappingB.source);
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = mappingA.originalLine - mappingB.originalLine;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  cmp = mappingA.originalColumn - mappingB.originalColumn;
			  if (cmp !== 0) {
			    return cmp;
			  }

			  return strcmp(mappingA.name, mappingB.name);
			}
			exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

			/**
			 * Strip any JSON XSSI avoidance prefix from the string (as documented
			 * in the source maps specification), and then parse the string as
			 * JSON.
			 */
			function parseSourceMapInput(str) {
			  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
			}
			exports.parseSourceMapInput = parseSourceMapInput;

			/**
			 * Compute the URL of a source given the the source root, the source's
			 * URL, and the source map's URL.
			 */
			function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
			  sourceURL = sourceURL || '';

			  if (sourceRoot) {
			    // This follows what Chrome does.
			    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
			      sourceRoot += '/';
			    }
			    // The spec says:
			    //   Line 4: An optional source root, useful for relocating source
			    //   files on a server or removing repeated values in the
			    //   “sources” entry.  This value is prepended to the individual
			    //   entries in the “source” field.
			    sourceURL = sourceRoot + sourceURL;
			  }

			  // Historically, SourceMapConsumer did not take the sourceMapURL as
			  // a parameter.  This mode is still somewhat supported, which is why
			  // this code block is conditional.  However, it's preferable to pass
			  // the source map URL to SourceMapConsumer, so that this function
			  // can implement the source URL resolution algorithm as outlined in
			  // the spec.  This block is basically the equivalent of:
			  //    new URL(sourceURL, sourceMapURL).toString()
			  // ... except it avoids using URL, which wasn't available in the
			  // older releases of node still supported by this library.
			  //
			  // The spec says:
			  //   If the sources are not absolute URLs after prepending of the
			  //   “sourceRoot”, the sources are resolved relative to the
			  //   SourceMap (like resolving script src in a html document).
			  if (sourceMapURL) {
			    var parsed = urlParse(sourceMapURL);
			    if (!parsed) {
			      throw new Error("sourceMapURL could not be parsed");
			    }
			    if (parsed.path) {
			      // Strip the last path component, but keep the "/".
			      var index = parsed.path.lastIndexOf('/');
			      if (index >= 0) {
			        parsed.path = parsed.path.substring(0, index + 1);
			      }
			    }
			    sourceURL = join(urlGenerate(parsed), sourceURL);
			  }

			  return normalize(sourceURL);
			}
			exports.computeSourceURL = computeSourceURL; 
		} (util));
		return util;
	}

	var arraySet = {};

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredArraySet;

	function requireArraySet () {
		if (hasRequiredArraySet) return arraySet;
		hasRequiredArraySet = 1;
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		var util = requireUtil();
		var has = Object.prototype.hasOwnProperty;
		var hasNativeMap = typeof Map !== "undefined";

		/**
		 * A data structure which is a combination of an array and a set. Adding a new
		 * member is O(1), testing for membership is O(1), and finding the index of an
		 * element is O(1). Removing elements from the set is not supported. Only
		 * strings are supported for membership.
		 */
		function ArraySet() {
		  this._array = [];
		  this._set = hasNativeMap ? new Map() : Object.create(null);
		}

		/**
		 * Static method for creating ArraySet instances from an existing array.
		 */
		ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		  var set = new ArraySet();
		  for (var i = 0, len = aArray.length; i < len; i++) {
		    set.add(aArray[i], aAllowDuplicates);
		  }
		  return set;
		};

		/**
		 * Return how many unique items are in this ArraySet. If duplicates have been
		 * added, than those do not count towards the size.
		 *
		 * @returns Number
		 */
		ArraySet.prototype.size = function ArraySet_size() {
		  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
		};

		/**
		 * Add the given string to this set.
		 *
		 * @param String aStr
		 */
		ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
		  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
		  var idx = this._array.length;
		  if (!isDuplicate || aAllowDuplicates) {
		    this._array.push(aStr);
		  }
		  if (!isDuplicate) {
		    if (hasNativeMap) {
		      this._set.set(aStr, idx);
		    } else {
		      this._set[sStr] = idx;
		    }
		  }
		};

		/**
		 * Is the given string a member of this set?
		 *
		 * @param String aStr
		 */
		ArraySet.prototype.has = function ArraySet_has(aStr) {
		  if (hasNativeMap) {
		    return this._set.has(aStr);
		  } else {
		    var sStr = util.toSetString(aStr);
		    return has.call(this._set, sStr);
		  }
		};

		/**
		 * What is the index of the given string in the array?
		 *
		 * @param String aStr
		 */
		ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		  if (hasNativeMap) {
		    var idx = this._set.get(aStr);
		    if (idx >= 0) {
		        return idx;
		    }
		  } else {
		    var sStr = util.toSetString(aStr);
		    if (has.call(this._set, sStr)) {
		      return this._set[sStr];
		    }
		  }

		  throw new Error('"' + aStr + '" is not in the set.');
		};

		/**
		 * What is the element at the given index?
		 *
		 * @param Number aIdx
		 */
		ArraySet.prototype.at = function ArraySet_at(aIdx) {
		  if (aIdx >= 0 && aIdx < this._array.length) {
		    return this._array[aIdx];
		  }
		  throw new Error('No element indexed by ' + aIdx);
		};

		/**
		 * Returns the array representation of this set (which has the proper indices
		 * indicated by indexOf). Note that this is a copy of the internal array used
		 * for storing the members so that no one can mess with internal state.
		 */
		ArraySet.prototype.toArray = function ArraySet_toArray() {
		  return this._array.slice();
		};

		arraySet.ArraySet = ArraySet;
		return arraySet;
	}

	var mappingList = {};

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredMappingList;

	function requireMappingList () {
		if (hasRequiredMappingList) return mappingList;
		hasRequiredMappingList = 1;
		/*
		 * Copyright 2014 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		var util = requireUtil();

		/**
		 * Determine whether mappingB is after mappingA with respect to generated
		 * position.
		 */
		function generatedPositionAfter(mappingA, mappingB) {
		  // Optimized for most common case
		  var lineA = mappingA.generatedLine;
		  var lineB = mappingB.generatedLine;
		  var columnA = mappingA.generatedColumn;
		  var columnB = mappingB.generatedColumn;
		  return lineB > lineA || lineB == lineA && columnB >= columnA ||
		         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
		}

		/**
		 * A data structure to provide a sorted view of accumulated mappings in a
		 * performance conscious manner. It trades a neglibable overhead in general
		 * case for a large speedup in case of mappings being added in order.
		 */
		function MappingList() {
		  this._array = [];
		  this._sorted = true;
		  // Serves as infimum
		  this._last = {generatedLine: -1, generatedColumn: 0};
		}

		/**
		 * Iterate through internal items. This method takes the same arguments that
		 * `Array.prototype.forEach` takes.
		 *
		 * NOTE: The order of the mappings is NOT guaranteed.
		 */
		MappingList.prototype.unsortedForEach =
		  function MappingList_forEach(aCallback, aThisArg) {
		    this._array.forEach(aCallback, aThisArg);
		  };

		/**
		 * Add the given source mapping.
		 *
		 * @param Object aMapping
		 */
		MappingList.prototype.add = function MappingList_add(aMapping) {
		  if (generatedPositionAfter(this._last, aMapping)) {
		    this._last = aMapping;
		    this._array.push(aMapping);
		  } else {
		    this._sorted = false;
		    this._array.push(aMapping);
		  }
		};

		/**
		 * Returns the flat, sorted array of mappings. The mappings are sorted by
		 * generated position.
		 *
		 * WARNING: This method returns internal data without copying, for
		 * performance. The return value must NOT be mutated, and should be treated as
		 * an immutable borrow. If you want to take ownership, you must make your own
		 * copy.
		 */
		MappingList.prototype.toArray = function MappingList_toArray() {
		  if (!this._sorted) {
		    this._array.sort(util.compareByGeneratedPositionsInflated);
		    this._sorted = true;
		  }
		  return this._array;
		};

		mappingList.MappingList = MappingList;
		return mappingList;
	}

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredSourceMapGenerator;

	function requireSourceMapGenerator () {
		if (hasRequiredSourceMapGenerator) return sourceMapGenerator;
		hasRequiredSourceMapGenerator = 1;
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		var base64VLQ = requireBase64Vlq();
		var util = requireUtil();
		var ArraySet = requireArraySet().ArraySet;
		var MappingList = requireMappingList().MappingList;

		/**
		 * An instance of the SourceMapGenerator represents a source map which is
		 * being built incrementally. You may pass an object with the following
		 * properties:
		 *
		 *   - file: The filename of the generated source.
		 *   - sourceRoot: A root for all relative URLs in this source map.
		 */
		function SourceMapGenerator(aArgs) {
		  if (!aArgs) {
		    aArgs = {};
		  }
		  this._file = util.getArg(aArgs, 'file', null);
		  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
		  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
		  this._sources = new ArraySet();
		  this._names = new ArraySet();
		  this._mappings = new MappingList();
		  this._sourcesContents = null;
		}

		SourceMapGenerator.prototype._version = 3;

		/**
		 * Creates a new SourceMapGenerator based on a SourceMapConsumer
		 *
		 * @param aSourceMapConsumer The SourceMap.
		 */
		SourceMapGenerator.fromSourceMap =
		  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
		    var sourceRoot = aSourceMapConsumer.sourceRoot;
		    var generator = new SourceMapGenerator({
		      file: aSourceMapConsumer.file,
		      sourceRoot: sourceRoot
		    });
		    aSourceMapConsumer.eachMapping(function (mapping) {
		      var newMapping = {
		        generated: {
		          line: mapping.generatedLine,
		          column: mapping.generatedColumn
		        }
		      };

		      if (mapping.source != null) {
		        newMapping.source = mapping.source;
		        if (sourceRoot != null) {
		          newMapping.source = util.relative(sourceRoot, newMapping.source);
		        }

		        newMapping.original = {
		          line: mapping.originalLine,
		          column: mapping.originalColumn
		        };

		        if (mapping.name != null) {
		          newMapping.name = mapping.name;
		        }
		      }

		      generator.addMapping(newMapping);
		    });
		    aSourceMapConsumer.sources.forEach(function (sourceFile) {
		      var sourceRelative = sourceFile;
		      if (sourceRoot !== null) {
		        sourceRelative = util.relative(sourceRoot, sourceFile);
		      }

		      if (!generator._sources.has(sourceRelative)) {
		        generator._sources.add(sourceRelative);
		      }

		      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
		      if (content != null) {
		        generator.setSourceContent(sourceFile, content);
		      }
		    });
		    return generator;
		  };

		/**
		 * Add a single mapping from original source line and column to the generated
		 * source's line and column for this source map being created. The mapping
		 * object should have the following properties:
		 *
		 *   - generated: An object with the generated line and column positions.
		 *   - original: An object with the original line and column positions.
		 *   - source: The original source file (relative to the sourceRoot).
		 *   - name: An optional original token name for this mapping.
		 */
		SourceMapGenerator.prototype.addMapping =
		  function SourceMapGenerator_addMapping(aArgs) {
		    var generated = util.getArg(aArgs, 'generated');
		    var original = util.getArg(aArgs, 'original', null);
		    var source = util.getArg(aArgs, 'source', null);
		    var name = util.getArg(aArgs, 'name', null);

		    if (!this._skipValidation) {
		      this._validateMapping(generated, original, source, name);
		    }

		    if (source != null) {
		      source = String(source);
		      if (!this._sources.has(source)) {
		        this._sources.add(source);
		      }
		    }

		    if (name != null) {
		      name = String(name);
		      if (!this._names.has(name)) {
		        this._names.add(name);
		      }
		    }

		    this._mappings.add({
		      generatedLine: generated.line,
		      generatedColumn: generated.column,
		      originalLine: original != null && original.line,
		      originalColumn: original != null && original.column,
		      source: source,
		      name: name
		    });
		  };

		/**
		 * Set the source content for a source file.
		 */
		SourceMapGenerator.prototype.setSourceContent =
		  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		    var source = aSourceFile;
		    if (this._sourceRoot != null) {
		      source = util.relative(this._sourceRoot, source);
		    }

		    if (aSourceContent != null) {
		      // Add the source content to the _sourcesContents map.
		      // Create a new _sourcesContents map if the property is null.
		      if (!this._sourcesContents) {
		        this._sourcesContents = Object.create(null);
		      }
		      this._sourcesContents[util.toSetString(source)] = aSourceContent;
		    } else if (this._sourcesContents) {
		      // Remove the source file from the _sourcesContents map.
		      // If the _sourcesContents map is empty, set the property to null.
		      delete this._sourcesContents[util.toSetString(source)];
		      if (Object.keys(this._sourcesContents).length === 0) {
		        this._sourcesContents = null;
		      }
		    }
		  };

		/**
		 * Applies the mappings of a sub-source-map for a specific source file to the
		 * source map being generated. Each mapping to the supplied source file is
		 * rewritten using the supplied source map. Note: The resolution for the
		 * resulting mappings is the minimium of this map and the supplied map.
		 *
		 * @param aSourceMapConsumer The source map to be applied.
		 * @param aSourceFile Optional. The filename of the source file.
		 *        If omitted, SourceMapConsumer's file property will be used.
		 * @param aSourceMapPath Optional. The dirname of the path to the source map
		 *        to be applied. If relative, it is relative to the SourceMapConsumer.
		 *        This parameter is needed when the two source maps aren't in the same
		 *        directory, and the source map to be applied contains relative source
		 *        paths. If so, those relative source paths need to be rewritten
		 *        relative to the SourceMapGenerator.
		 */
		SourceMapGenerator.prototype.applySourceMap =
		  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		    var sourceFile = aSourceFile;
		    // If aSourceFile is omitted, we will use the file property of the SourceMap
		    if (aSourceFile == null) {
		      if (aSourceMapConsumer.file == null) {
		        throw new Error(
		          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
		          'or the source map\'s "file" property. Both were omitted.'
		        );
		      }
		      sourceFile = aSourceMapConsumer.file;
		    }
		    var sourceRoot = this._sourceRoot;
		    // Make "sourceFile" relative if an absolute Url is passed.
		    if (sourceRoot != null) {
		      sourceFile = util.relative(sourceRoot, sourceFile);
		    }
		    // Applying the SourceMap can add and remove items from the sources and
		    // the names array.
		    var newSources = new ArraySet();
		    var newNames = new ArraySet();

		    // Find mappings for the "sourceFile"
		    this._mappings.unsortedForEach(function (mapping) {
		      if (mapping.source === sourceFile && mapping.originalLine != null) {
		        // Check if it can be mapped by the source map, then update the mapping.
		        var original = aSourceMapConsumer.originalPositionFor({
		          line: mapping.originalLine,
		          column: mapping.originalColumn
		        });
		        if (original.source != null) {
		          // Copy mapping
		          mapping.source = original.source;
		          if (aSourceMapPath != null) {
		            mapping.source = util.join(aSourceMapPath, mapping.source);
		          }
		          if (sourceRoot != null) {
		            mapping.source = util.relative(sourceRoot, mapping.source);
		          }
		          mapping.originalLine = original.line;
		          mapping.originalColumn = original.column;
		          if (original.name != null) {
		            mapping.name = original.name;
		          }
		        }
		      }

		      var source = mapping.source;
		      if (source != null && !newSources.has(source)) {
		        newSources.add(source);
		      }

		      var name = mapping.name;
		      if (name != null && !newNames.has(name)) {
		        newNames.add(name);
		      }

		    }, this);
		    this._sources = newSources;
		    this._names = newNames;

		    // Copy sourcesContents of applied map.
		    aSourceMapConsumer.sources.forEach(function (sourceFile) {
		      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
		      if (content != null) {
		        if (aSourceMapPath != null) {
		          sourceFile = util.join(aSourceMapPath, sourceFile);
		        }
		        if (sourceRoot != null) {
		          sourceFile = util.relative(sourceRoot, sourceFile);
		        }
		        this.setSourceContent(sourceFile, content);
		      }
		    }, this);
		  };

		/**
		 * A mapping can have one of the three levels of data:
		 *
		 *   1. Just the generated position.
		 *   2. The Generated position, original position, and original source.
		 *   3. Generated and original position, original source, as well as a name
		 *      token.
		 *
		 * To maintain consistency, we validate that any new mapping being added falls
		 * in to one of these categories.
		 */
		SourceMapGenerator.prototype._validateMapping =
		  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
		                                              aName) {
		    // When aOriginal is truthy but has empty values for .line and .column,
		    // it is most likely a programmer error. In this case we throw a very
		    // specific error message to try to guide them the right way.
		    // For example: https://github.com/Polymer/polymer-bundler/pull/519
		    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
		        throw new Error(
		            'original.line and original.column are not numbers -- you probably meant to omit ' +
		            'the original mapping entirely and only map the generated position. If so, pass ' +
		            'null for the original mapping instead of an object with empty or null values.'
		        );
		    }

		    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
		        && aGenerated.line > 0 && aGenerated.column >= 0
		        && !aOriginal && !aSource && !aName) {
		      // Case 1.
		      return;
		    }
		    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
		             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
		             && aGenerated.line > 0 && aGenerated.column >= 0
		             && aOriginal.line > 0 && aOriginal.column >= 0
		             && aSource) {
		      // Cases 2 and 3.
		      return;
		    }
		    else {
		      throw new Error('Invalid mapping: ' + JSON.stringify({
		        generated: aGenerated,
		        source: aSource,
		        original: aOriginal,
		        name: aName
		      }));
		    }
		  };

		/**
		 * Serialize the accumulated mappings in to the stream of base 64 VLQs
		 * specified by the source map format.
		 */
		SourceMapGenerator.prototype._serializeMappings =
		  function SourceMapGenerator_serializeMappings() {
		    var previousGeneratedColumn = 0;
		    var previousGeneratedLine = 1;
		    var previousOriginalColumn = 0;
		    var previousOriginalLine = 0;
		    var previousName = 0;
		    var previousSource = 0;
		    var result = '';
		    var next;
		    var mapping;
		    var nameIdx;
		    var sourceIdx;

		    var mappings = this._mappings.toArray();
		    for (var i = 0, len = mappings.length; i < len; i++) {
		      mapping = mappings[i];
		      next = '';

		      if (mapping.generatedLine !== previousGeneratedLine) {
		        previousGeneratedColumn = 0;
		        while (mapping.generatedLine !== previousGeneratedLine) {
		          next += ';';
		          previousGeneratedLine++;
		        }
		      }
		      else {
		        if (i > 0) {
		          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
		            continue;
		          }
		          next += ',';
		        }
		      }

		      next += base64VLQ.encode(mapping.generatedColumn
		                                 - previousGeneratedColumn);
		      previousGeneratedColumn = mapping.generatedColumn;

		      if (mapping.source != null) {
		        sourceIdx = this._sources.indexOf(mapping.source);
		        next += base64VLQ.encode(sourceIdx - previousSource);
		        previousSource = sourceIdx;

		        // lines are stored 0-based in SourceMap spec version 3
		        next += base64VLQ.encode(mapping.originalLine - 1
		                                   - previousOriginalLine);
		        previousOriginalLine = mapping.originalLine - 1;

		        next += base64VLQ.encode(mapping.originalColumn
		                                   - previousOriginalColumn);
		        previousOriginalColumn = mapping.originalColumn;

		        if (mapping.name != null) {
		          nameIdx = this._names.indexOf(mapping.name);
		          next += base64VLQ.encode(nameIdx - previousName);
		          previousName = nameIdx;
		        }
		      }

		      result += next;
		    }

		    return result;
		  };

		SourceMapGenerator.prototype._generateSourcesContent =
		  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		    return aSources.map(function (source) {
		      if (!this._sourcesContents) {
		        return null;
		      }
		      if (aSourceRoot != null) {
		        source = util.relative(aSourceRoot, source);
		      }
		      var key = util.toSetString(source);
		      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
		        ? this._sourcesContents[key]
		        : null;
		    }, this);
		  };

		/**
		 * Externalize the source map.
		 */
		SourceMapGenerator.prototype.toJSON =
		  function SourceMapGenerator_toJSON() {
		    var map = {
		      version: this._version,
		      sources: this._sources.toArray(),
		      names: this._names.toArray(),
		      mappings: this._serializeMappings()
		    };
		    if (this._file != null) {
		      map.file = this._file;
		    }
		    if (this._sourceRoot != null) {
		      map.sourceRoot = this._sourceRoot;
		    }
		    if (this._sourcesContents) {
		      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		    }

		    return map;
		  };

		/**
		 * Render the source map being generated to a string.
		 */
		SourceMapGenerator.prototype.toString =
		  function SourceMapGenerator_toString() {
		    return JSON.stringify(this.toJSON());
		  };

		sourceMapGenerator.SourceMapGenerator = SourceMapGenerator;
		return sourceMapGenerator;
	}

	var sourceMapConsumer = {};

	var binarySearch = {};

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredBinarySearch;

	function requireBinarySearch () {
		if (hasRequiredBinarySearch) return binarySearch;
		hasRequiredBinarySearch = 1;
		(function (exports) {
			/*
			 * Copyright 2011 Mozilla Foundation and contributors
			 * Licensed under the New BSD license. See LICENSE or:
			 * http://opensource.org/licenses/BSD-3-Clause
			 */

			exports.GREATEST_LOWER_BOUND = 1;
			exports.LEAST_UPPER_BOUND = 2;

			/**
			 * Recursive implementation of binary search.
			 *
			 * @param aLow Indices here and lower do not contain the needle.
			 * @param aHigh Indices here and higher do not contain the needle.
			 * @param aNeedle The element being searched for.
			 * @param aHaystack The non-empty array being searched.
			 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
			 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
			 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
			 *     closest element that is smaller than or greater than the one we are
			 *     searching for, respectively, if the exact element cannot be found.
			 */
			function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
			  // This function terminates when one of the following is true:
			  //
			  //   1. We find the exact element we are looking for.
			  //
			  //   2. We did not find the exact element, but we can return the index of
			  //      the next-closest element.
			  //
			  //   3. We did not find the exact element, and there is no next-closest
			  //      element than the one we are searching for, so we return -1.
			  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
			  var cmp = aCompare(aNeedle, aHaystack[mid], true);
			  if (cmp === 0) {
			    // Found the element we are looking for.
			    return mid;
			  }
			  else if (cmp > 0) {
			    // Our needle is greater than aHaystack[mid].
			    if (aHigh - mid > 1) {
			      // The element is in the upper half.
			      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
			    }

			    // The exact needle element was not found in this haystack. Determine if
			    // we are in termination case (3) or (2) and return the appropriate thing.
			    if (aBias == exports.LEAST_UPPER_BOUND) {
			      return aHigh < aHaystack.length ? aHigh : -1;
			    } else {
			      return mid;
			    }
			  }
			  else {
			    // Our needle is less than aHaystack[mid].
			    if (mid - aLow > 1) {
			      // The element is in the lower half.
			      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
			    }

			    // we are in termination case (3) or (2) and return the appropriate thing.
			    if (aBias == exports.LEAST_UPPER_BOUND) {
			      return mid;
			    } else {
			      return aLow < 0 ? -1 : aLow;
			    }
			  }
			}

			/**
			 * This is an implementation of binary search which will always try and return
			 * the index of the closest element if there is no exact hit. This is because
			 * mappings between original and generated line/col pairs are single points,
			 * and there is an implicit region between each of them, so a miss just means
			 * that you aren't on the very start of a region.
			 *
			 * @param aNeedle The element you are looking for.
			 * @param aHaystack The array that is being searched.
			 * @param aCompare A function which takes the needle and an element in the
			 *     array and returns -1, 0, or 1 depending on whether the needle is less
			 *     than, equal to, or greater than the element, respectively.
			 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
			 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
			 *     closest element that is smaller than or greater than the one we are
			 *     searching for, respectively, if the exact element cannot be found.
			 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
			 */
			exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
			  if (aHaystack.length === 0) {
			    return -1;
			  }

			  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
			                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
			  if (index < 0) {
			    return -1;
			  }

			  // We have found either the exact element, or the next-closest element than
			  // the one we are searching for. However, there may be more than one such
			  // element. Make sure we always return the smallest of these.
			  while (index - 1 >= 0) {
			    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
			      break;
			    }
			    --index;
			  }

			  return index;
			}; 
		} (binarySearch));
		return binarySearch;
	}

	var quickSort = {};

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredQuickSort;

	function requireQuickSort () {
		if (hasRequiredQuickSort) return quickSort;
		hasRequiredQuickSort = 1;
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		// It turns out that some (most?) JavaScript engines don't self-host
		// `Array.prototype.sort`. This makes sense because C++ will likely remain
		// faster than JS when doing raw CPU-intensive sorting. However, when using a
		// custom comparator function, calling back and forth between the VM's C++ and
		// JIT'd JS is rather slow *and* loses JIT type information, resulting in
		// worse generated code for the comparator function than would be optimal. In
		// fact, when sorting with a comparator, these costs outweigh the benefits of
		// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
		// a ~3500ms mean speed-up in `bench/bench.html`.

		/**
		 * Swap the elements indexed by `x` and `y` in the array `ary`.
		 *
		 * @param {Array} ary
		 *        The array.
		 * @param {Number} x
		 *        The index of the first item.
		 * @param {Number} y
		 *        The index of the second item.
		 */
		function swap(ary, x, y) {
		  var temp = ary[x];
		  ary[x] = ary[y];
		  ary[y] = temp;
		}

		/**
		 * Returns a random integer within the range `low .. high` inclusive.
		 *
		 * @param {Number} low
		 *        The lower bound on the range.
		 * @param {Number} high
		 *        The upper bound on the range.
		 */
		function randomIntInRange(low, high) {
		  return Math.round(low + (Math.random() * (high - low)));
		}

		/**
		 * The Quick Sort algorithm.
		 *
		 * @param {Array} ary
		 *        An array to sort.
		 * @param {function} comparator
		 *        Function to use to compare two items.
		 * @param {Number} p
		 *        Start index of the array
		 * @param {Number} r
		 *        End index of the array
		 */
		function doQuickSort(ary, comparator, p, r) {
		  // If our lower bound is less than our upper bound, we (1) partition the
		  // array into two pieces and (2) recurse on each half. If it is not, this is
		  // the empty array and our base case.

		  if (p < r) {
		    // (1) Partitioning.
		    //
		    // The partitioning chooses a pivot between `p` and `r` and moves all
		    // elements that are less than or equal to the pivot to the before it, and
		    // all the elements that are greater than it after it. The effect is that
		    // once partition is done, the pivot is in the exact place it will be when
		    // the array is put in sorted order, and it will not need to be moved
		    // again. This runs in O(n) time.

		    // Always choose a random pivot so that an input array which is reverse
		    // sorted does not cause O(n^2) running time.
		    var pivotIndex = randomIntInRange(p, r);
		    var i = p - 1;

		    swap(ary, pivotIndex, r);
		    var pivot = ary[r];

		    // Immediately after `j` is incremented in this loop, the following hold
		    // true:
		    //
		    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
		    //
		    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
		    for (var j = p; j < r; j++) {
		      if (comparator(ary[j], pivot) <= 0) {
		        i += 1;
		        swap(ary, i, j);
		      }
		    }

		    swap(ary, i + 1, j);
		    var q = i + 1;

		    // (2) Recurse on each half.

		    doQuickSort(ary, comparator, p, q - 1);
		    doQuickSort(ary, comparator, q + 1, r);
		  }
		}

		/**
		 * Sort the given array in-place with the given comparator function.
		 *
		 * @param {Array} ary
		 *        An array to sort.
		 * @param {function} comparator
		 *        Function to use to compare two items.
		 */
		quickSort.quickSort = function (ary, comparator) {
		  doQuickSort(ary, comparator, 0, ary.length - 1);
		};
		return quickSort;
	}

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredSourceMapConsumer;

	function requireSourceMapConsumer () {
		if (hasRequiredSourceMapConsumer) return sourceMapConsumer;
		hasRequiredSourceMapConsumer = 1;
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		var util = requireUtil();
		var binarySearch = requireBinarySearch();
		var ArraySet = requireArraySet().ArraySet;
		var base64VLQ = requireBase64Vlq();
		var quickSort = requireQuickSort().quickSort;

		function SourceMapConsumer(aSourceMap, aSourceMapURL) {
		  var sourceMap = aSourceMap;
		  if (typeof aSourceMap === 'string') {
		    sourceMap = util.parseSourceMapInput(aSourceMap);
		  }

		  return sourceMap.sections != null
		    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
		    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
		}

		SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
		  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
		};

		/**
		 * The version of the source mapping spec that we are consuming.
		 */
		SourceMapConsumer.prototype._version = 3;

		// `__generatedMappings` and `__originalMappings` are arrays that hold the
		// parsed mapping coordinates from the source map's "mappings" attribute. They
		// are lazily instantiated, accessed via the `_generatedMappings` and
		// `_originalMappings` getters respectively, and we only parse the mappings
		// and create these arrays once queried for a source location. We jump through
		// these hoops because there can be many thousands of mappings, and parsing
		// them is expensive, so we only want to do it if we must.
		//
		// Each object in the arrays is of the form:
		//
		//     {
		//       generatedLine: The line number in the generated code,
		//       generatedColumn: The column number in the generated code,
		//       source: The path to the original source file that generated this
		//               chunk of code,
		//       originalLine: The line number in the original source that
		//                     corresponds to this chunk of generated code,
		//       originalColumn: The column number in the original source that
		//                       corresponds to this chunk of generated code,
		//       name: The name of the original symbol which generated this chunk of
		//             code.
		//     }
		//
		// All properties except for `generatedLine` and `generatedColumn` can be
		// `null`.
		//
		// `_generatedMappings` is ordered by the generated positions.
		//
		// `_originalMappings` is ordered by the original positions.

		SourceMapConsumer.prototype.__generatedMappings = null;
		Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
		  configurable: true,
		  enumerable: true,
		  get: function () {
		    if (!this.__generatedMappings) {
		      this._parseMappings(this._mappings, this.sourceRoot);
		    }

		    return this.__generatedMappings;
		  }
		});

		SourceMapConsumer.prototype.__originalMappings = null;
		Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
		  configurable: true,
		  enumerable: true,
		  get: function () {
		    if (!this.__originalMappings) {
		      this._parseMappings(this._mappings, this.sourceRoot);
		    }

		    return this.__originalMappings;
		  }
		});

		SourceMapConsumer.prototype._charIsMappingSeparator =
		  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		    var c = aStr.charAt(index);
		    return c === ";" || c === ",";
		  };

		/**
		 * Parse the mappings in a string in to a data structure which we can easily
		 * query (the ordered arrays in the `this.__generatedMappings` and
		 * `this.__originalMappings` properties).
		 */
		SourceMapConsumer.prototype._parseMappings =
		  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		    throw new Error("Subclasses must implement _parseMappings");
		  };

		SourceMapConsumer.GENERATED_ORDER = 1;
		SourceMapConsumer.ORIGINAL_ORDER = 2;

		SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
		SourceMapConsumer.LEAST_UPPER_BOUND = 2;

		/**
		 * Iterate over each mapping between an original source/line/column and a
		 * generated line/column in this source map.
		 *
		 * @param Function aCallback
		 *        The function that is called with each mapping.
		 * @param Object aContext
		 *        Optional. If specified, this object will be the value of `this` every
		 *        time that `aCallback` is called.
		 * @param aOrder
		 *        Either `SourceMapConsumer.GENERATED_ORDER` or
		 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
		 *        iterate over the mappings sorted by the generated file's line/column
		 *        order or the original's source/line/column order, respectively. Defaults to
		 *        `SourceMapConsumer.GENERATED_ORDER`.
		 */
		SourceMapConsumer.prototype.eachMapping =
		  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		    var context = aContext || null;
		    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

		    var mappings;
		    switch (order) {
		    case SourceMapConsumer.GENERATED_ORDER:
		      mappings = this._generatedMappings;
		      break;
		    case SourceMapConsumer.ORIGINAL_ORDER:
		      mappings = this._originalMappings;
		      break;
		    default:
		      throw new Error("Unknown order of iteration.");
		    }

		    var sourceRoot = this.sourceRoot;
		    mappings.map(function (mapping) {
		      var source = mapping.source === null ? null : this._sources.at(mapping.source);
		      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
		      return {
		        source: source,
		        generatedLine: mapping.generatedLine,
		        generatedColumn: mapping.generatedColumn,
		        originalLine: mapping.originalLine,
		        originalColumn: mapping.originalColumn,
		        name: mapping.name === null ? null : this._names.at(mapping.name)
		      };
		    }, this).forEach(aCallback, context);
		  };

		/**
		 * Returns all generated line and column information for the original source,
		 * line, and column provided. If no column is provided, returns all mappings
		 * corresponding to a either the line we are searching for or the next
		 * closest line that has any mappings. Otherwise, returns all mappings
		 * corresponding to the given line and either the column we are searching for
		 * or the next closest column that has any offsets.
		 *
		 * The only argument is an object with the following properties:
		 *
		 *   - source: The filename of the original source.
		 *   - line: The line number in the original source.  The line number is 1-based.
		 *   - column: Optional. the column number in the original source.
		 *    The column number is 0-based.
		 *
		 * and an array of objects is returned, each with the following properties:
		 *
		 *   - line: The line number in the generated source, or null.  The
		 *    line number is 1-based.
		 *   - column: The column number in the generated source, or null.
		 *    The column number is 0-based.
		 */
		SourceMapConsumer.prototype.allGeneratedPositionsFor =
		  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		    var line = util.getArg(aArgs, 'line');

		    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
		    // returns the index of the closest mapping less than the needle. By
		    // setting needle.originalColumn to 0, we thus find the last mapping for
		    // the given line, provided such a mapping exists.
		    var needle = {
		      source: util.getArg(aArgs, 'source'),
		      originalLine: line,
		      originalColumn: util.getArg(aArgs, 'column', 0)
		    };

		    needle.source = this._findSourceIndex(needle.source);
		    if (needle.source < 0) {
		      return [];
		    }

		    var mappings = [];

		    var index = this._findMapping(needle,
		                                  this._originalMappings,
		                                  "originalLine",
		                                  "originalColumn",
		                                  util.compareByOriginalPositions,
		                                  binarySearch.LEAST_UPPER_BOUND);
		    if (index >= 0) {
		      var mapping = this._originalMappings[index];

		      if (aArgs.column === undefined) {
		        var originalLine = mapping.originalLine;

		        // Iterate until either we run out of mappings, or we run into
		        // a mapping for a different line than the one we found. Since
		        // mappings are sorted, this is guaranteed to find all mappings for
		        // the line we found.
		        while (mapping && mapping.originalLine === originalLine) {
		          mappings.push({
		            line: util.getArg(mapping, 'generatedLine', null),
		            column: util.getArg(mapping, 'generatedColumn', null),
		            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
		          });

		          mapping = this._originalMappings[++index];
		        }
		      } else {
		        var originalColumn = mapping.originalColumn;

		        // Iterate until either we run out of mappings, or we run into
		        // a mapping for a different line than the one we were searching for.
		        // Since mappings are sorted, this is guaranteed to find all mappings for
		        // the line we are searching for.
		        while (mapping &&
		               mapping.originalLine === line &&
		               mapping.originalColumn == originalColumn) {
		          mappings.push({
		            line: util.getArg(mapping, 'generatedLine', null),
		            column: util.getArg(mapping, 'generatedColumn', null),
		            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
		          });

		          mapping = this._originalMappings[++index];
		        }
		      }
		    }

		    return mappings;
		  };

		sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;

		/**
		 * A BasicSourceMapConsumer instance represents a parsed source map which we can
		 * query for information about the original file positions by giving it a file
		 * position in the generated source.
		 *
		 * The first parameter is the raw source map (either as a JSON string, or
		 * already parsed to an object). According to the spec, source maps have the
		 * following attributes:
		 *
		 *   - version: Which version of the source map spec this map is following.
		 *   - sources: An array of URLs to the original source files.
		 *   - names: An array of identifiers which can be referrenced by individual mappings.
		 *   - sourceRoot: Optional. The URL root from which all sources are relative.
		 *   - sourcesContent: Optional. An array of contents of the original source files.
		 *   - mappings: A string of base64 VLQs which contain the actual mappings.
		 *   - file: Optional. The generated file this source map is associated with.
		 *
		 * Here is an example source map, taken from the source map spec[0]:
		 *
		 *     {
		 *       version : 3,
		 *       file: "out.js",
		 *       sourceRoot : "",
		 *       sources: ["foo.js", "bar.js"],
		 *       names: ["src", "maps", "are", "fun"],
		 *       mappings: "AA,AB;;ABCDE;"
		 *     }
		 *
		 * The second parameter, if given, is a string whose value is the URL
		 * at which the source map was found.  This URL is used to compute the
		 * sources array.
		 *
		 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
		 */
		function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
		  var sourceMap = aSourceMap;
		  if (typeof aSourceMap === 'string') {
		    sourceMap = util.parseSourceMapInput(aSourceMap);
		  }

		  var version = util.getArg(sourceMap, 'version');
		  var sources = util.getArg(sourceMap, 'sources');
		  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
		  // requires the array) to play nice here.
		  var names = util.getArg(sourceMap, 'names', []);
		  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
		  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
		  var mappings = util.getArg(sourceMap, 'mappings');
		  var file = util.getArg(sourceMap, 'file', null);

		  // Once again, Sass deviates from the spec and supplies the version as a
		  // string rather than a number, so we use loose equality checking here.
		  if (version != this._version) {
		    throw new Error('Unsupported version: ' + version);
		  }

		  if (sourceRoot) {
		    sourceRoot = util.normalize(sourceRoot);
		  }

		  sources = sources
		    .map(String)
		    // Some source maps produce relative source paths like "./foo.js" instead of
		    // "foo.js".  Normalize these first so that future comparisons will succeed.
		    // See bugzil.la/1090768.
		    .map(util.normalize)
		    // Always ensure that absolute sources are internally stored relative to
		    // the source root, if the source root is absolute. Not doing this would
		    // be particularly problematic when the source root is a prefix of the
		    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
		    .map(function (source) {
		      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
		        ? util.relative(sourceRoot, source)
		        : source;
		    });

		  // Pass `true` below to allow duplicate names and sources. While source maps
		  // are intended to be compressed and deduplicated, the TypeScript compiler
		  // sometimes generates source maps with duplicates in them. See Github issue
		  // #72 and bugzil.la/889492.
		  this._names = ArraySet.fromArray(names.map(String), true);
		  this._sources = ArraySet.fromArray(sources, true);

		  this._absoluteSources = this._sources.toArray().map(function (s) {
		    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
		  });

		  this.sourceRoot = sourceRoot;
		  this.sourcesContent = sourcesContent;
		  this._mappings = mappings;
		  this._sourceMapURL = aSourceMapURL;
		  this.file = file;
		}

		BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
		BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

		/**
		 * Utility function to find the index of a source.  Returns -1 if not
		 * found.
		 */
		BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
		  var relativeSource = aSource;
		  if (this.sourceRoot != null) {
		    relativeSource = util.relative(this.sourceRoot, relativeSource);
		  }

		  if (this._sources.has(relativeSource)) {
		    return this._sources.indexOf(relativeSource);
		  }

		  // Maybe aSource is an absolute URL as returned by |sources|.  In
		  // this case we can't simply undo the transform.
		  var i;
		  for (i = 0; i < this._absoluteSources.length; ++i) {
		    if (this._absoluteSources[i] == aSource) {
		      return i;
		    }
		  }

		  return -1;
		};

		/**
		 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
		 *
		 * @param SourceMapGenerator aSourceMap
		 *        The source map that will be consumed.
		 * @param String aSourceMapURL
		 *        The URL at which the source map can be found (optional)
		 * @returns BasicSourceMapConsumer
		 */
		BasicSourceMapConsumer.fromSourceMap =
		  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
		    var smc = Object.create(BasicSourceMapConsumer.prototype);

		    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		    smc.sourceRoot = aSourceMap._sourceRoot;
		    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
		                                                            smc.sourceRoot);
		    smc.file = aSourceMap._file;
		    smc._sourceMapURL = aSourceMapURL;
		    smc._absoluteSources = smc._sources.toArray().map(function (s) {
		      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
		    });

		    // Because we are modifying the entries (by converting string sources and
		    // names to indices into the sources and names ArraySets), we have to make
		    // a copy of the entry or else bad things happen. Shared mutable state
		    // strikes again! See github issue #191.

		    var generatedMappings = aSourceMap._mappings.toArray().slice();
		    var destGeneratedMappings = smc.__generatedMappings = [];
		    var destOriginalMappings = smc.__originalMappings = [];

		    for (var i = 0, length = generatedMappings.length; i < length; i++) {
		      var srcMapping = generatedMappings[i];
		      var destMapping = new Mapping;
		      destMapping.generatedLine = srcMapping.generatedLine;
		      destMapping.generatedColumn = srcMapping.generatedColumn;

		      if (srcMapping.source) {
		        destMapping.source = sources.indexOf(srcMapping.source);
		        destMapping.originalLine = srcMapping.originalLine;
		        destMapping.originalColumn = srcMapping.originalColumn;

		        if (srcMapping.name) {
		          destMapping.name = names.indexOf(srcMapping.name);
		        }

		        destOriginalMappings.push(destMapping);
		      }

		      destGeneratedMappings.push(destMapping);
		    }

		    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

		    return smc;
		  };

		/**
		 * The version of the source mapping spec that we are consuming.
		 */
		BasicSourceMapConsumer.prototype._version = 3;

		/**
		 * The list of original sources.
		 */
		Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
		  get: function () {
		    return this._absoluteSources.slice();
		  }
		});

		/**
		 * Provide the JIT with a nice shape / hidden class.
		 */
		function Mapping() {
		  this.generatedLine = 0;
		  this.generatedColumn = 0;
		  this.source = null;
		  this.originalLine = null;
		  this.originalColumn = null;
		  this.name = null;
		}

		/**
		 * Parse the mappings in a string in to a data structure which we can easily
		 * query (the ordered arrays in the `this.__generatedMappings` and
		 * `this.__originalMappings` properties).
		 */
		BasicSourceMapConsumer.prototype._parseMappings =
		  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		    var generatedLine = 1;
		    var previousGeneratedColumn = 0;
		    var previousOriginalLine = 0;
		    var previousOriginalColumn = 0;
		    var previousSource = 0;
		    var previousName = 0;
		    var length = aStr.length;
		    var index = 0;
		    var cachedSegments = {};
		    var temp = {};
		    var originalMappings = [];
		    var generatedMappings = [];
		    var mapping, str, segment, end, value;

		    while (index < length) {
		      if (aStr.charAt(index) === ';') {
		        generatedLine++;
		        index++;
		        previousGeneratedColumn = 0;
		      }
		      else if (aStr.charAt(index) === ',') {
		        index++;
		      }
		      else {
		        mapping = new Mapping();
		        mapping.generatedLine = generatedLine;

		        // Because each offset is encoded relative to the previous one,
		        // many segments often have the same encoding. We can exploit this
		        // fact by caching the parsed variable length fields of each segment,
		        // allowing us to avoid a second parse if we encounter the same
		        // segment again.
		        for (end = index; end < length; end++) {
		          if (this._charIsMappingSeparator(aStr, end)) {
		            break;
		          }
		        }
		        str = aStr.slice(index, end);

		        segment = cachedSegments[str];
		        if (segment) {
		          index += str.length;
		        } else {
		          segment = [];
		          while (index < end) {
		            base64VLQ.decode(aStr, index, temp);
		            value = temp.value;
		            index = temp.rest;
		            segment.push(value);
		          }

		          if (segment.length === 2) {
		            throw new Error('Found a source, but no line and column');
		          }

		          if (segment.length === 3) {
		            throw new Error('Found a source and line, but no column');
		          }

		          cachedSegments[str] = segment;
		        }

		        // Generated column.
		        mapping.generatedColumn = previousGeneratedColumn + segment[0];
		        previousGeneratedColumn = mapping.generatedColumn;

		        if (segment.length > 1) {
		          // Original source.
		          mapping.source = previousSource + segment[1];
		          previousSource += segment[1];

		          // Original line.
		          mapping.originalLine = previousOriginalLine + segment[2];
		          previousOriginalLine = mapping.originalLine;
		          // Lines are stored 0-based
		          mapping.originalLine += 1;

		          // Original column.
		          mapping.originalColumn = previousOriginalColumn + segment[3];
		          previousOriginalColumn = mapping.originalColumn;

		          if (segment.length > 4) {
		            // Original name.
		            mapping.name = previousName + segment[4];
		            previousName += segment[4];
		          }
		        }

		        generatedMappings.push(mapping);
		        if (typeof mapping.originalLine === 'number') {
		          originalMappings.push(mapping);
		        }
		      }
		    }

		    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
		    this.__generatedMappings = generatedMappings;

		    quickSort(originalMappings, util.compareByOriginalPositions);
		    this.__originalMappings = originalMappings;
		  };

		/**
		 * Find the mapping that best matches the hypothetical "needle" mapping that
		 * we are searching for in the given "haystack" of mappings.
		 */
		BasicSourceMapConsumer.prototype._findMapping =
		  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
		                                         aColumnName, aComparator, aBias) {
		    // To return the position we are searching for, we must first find the
		    // mapping for the given position and then return the opposite position it
		    // points to. Because the mappings are sorted, we can use binary search to
		    // find the best mapping.

		    if (aNeedle[aLineName] <= 0) {
		      throw new TypeError('Line must be greater than or equal to 1, got '
		                          + aNeedle[aLineName]);
		    }
		    if (aNeedle[aColumnName] < 0) {
		      throw new TypeError('Column must be greater than or equal to 0, got '
		                          + aNeedle[aColumnName]);
		    }

		    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
		  };

		/**
		 * Compute the last column for each generated mapping. The last column is
		 * inclusive.
		 */
		BasicSourceMapConsumer.prototype.computeColumnSpans =
		  function SourceMapConsumer_computeColumnSpans() {
		    for (var index = 0; index < this._generatedMappings.length; ++index) {
		      var mapping = this._generatedMappings[index];

		      // Mappings do not contain a field for the last generated columnt. We
		      // can come up with an optimistic estimate, however, by assuming that
		      // mappings are contiguous (i.e. given two consecutive mappings, the
		      // first mapping ends where the second one starts).
		      if (index + 1 < this._generatedMappings.length) {
		        var nextMapping = this._generatedMappings[index + 1];

		        if (mapping.generatedLine === nextMapping.generatedLine) {
		          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
		          continue;
		        }
		      }

		      // The last mapping for each line spans the entire line.
		      mapping.lastGeneratedColumn = Infinity;
		    }
		  };

		/**
		 * Returns the original source, line, and column information for the generated
		 * source's line and column positions provided. The only argument is an object
		 * with the following properties:
		 *
		 *   - line: The line number in the generated source.  The line number
		 *     is 1-based.
		 *   - column: The column number in the generated source.  The column
		 *     number is 0-based.
		 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
		 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
		 *
		 * and an object is returned with the following properties:
		 *
		 *   - source: The original source file, or null.
		 *   - line: The line number in the original source, or null.  The
		 *     line number is 1-based.
		 *   - column: The column number in the original source, or null.  The
		 *     column number is 0-based.
		 *   - name: The original identifier, or null.
		 */
		BasicSourceMapConsumer.prototype.originalPositionFor =
		  function SourceMapConsumer_originalPositionFor(aArgs) {
		    var needle = {
		      generatedLine: util.getArg(aArgs, 'line'),
		      generatedColumn: util.getArg(aArgs, 'column')
		    };

		    var index = this._findMapping(
		      needle,
		      this._generatedMappings,
		      "generatedLine",
		      "generatedColumn",
		      util.compareByGeneratedPositionsDeflated,
		      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		    );

		    if (index >= 0) {
		      var mapping = this._generatedMappings[index];

		      if (mapping.generatedLine === needle.generatedLine) {
		        var source = util.getArg(mapping, 'source', null);
		        if (source !== null) {
		          source = this._sources.at(source);
		          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
		        }
		        var name = util.getArg(mapping, 'name', null);
		        if (name !== null) {
		          name = this._names.at(name);
		        }
		        return {
		          source: source,
		          line: util.getArg(mapping, 'originalLine', null),
		          column: util.getArg(mapping, 'originalColumn', null),
		          name: name
		        };
		      }
		    }

		    return {
		      source: null,
		      line: null,
		      column: null,
		      name: null
		    };
		  };

		/**
		 * Return true if we have the source content for every source in the source
		 * map, false otherwise.
		 */
		BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
		  function BasicSourceMapConsumer_hasContentsOfAllSources() {
		    if (!this.sourcesContent) {
		      return false;
		    }
		    return this.sourcesContent.length >= this._sources.size() &&
		      !this.sourcesContent.some(function (sc) { return sc == null; });
		  };

		/**
		 * Returns the original source content. The only argument is the url of the
		 * original source file. Returns null if no original source content is
		 * available.
		 */
		BasicSourceMapConsumer.prototype.sourceContentFor =
		  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		    if (!this.sourcesContent) {
		      return null;
		    }

		    var index = this._findSourceIndex(aSource);
		    if (index >= 0) {
		      return this.sourcesContent[index];
		    }

		    var relativeSource = aSource;
		    if (this.sourceRoot != null) {
		      relativeSource = util.relative(this.sourceRoot, relativeSource);
		    }

		    var url;
		    if (this.sourceRoot != null
		        && (url = util.urlParse(this.sourceRoot))) {
		      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
		      // many users. We can help them out when they expect file:// URIs to
		      // behave like it would if they were running a local HTTP server. See
		      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
		      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
		      if (url.scheme == "file"
		          && this._sources.has(fileUriAbsPath)) {
		        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
		      }

		      if ((!url.path || url.path == "/")
		          && this._sources.has("/" + relativeSource)) {
		        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
		      }
		    }

		    // This function is used recursively from
		    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
		    // don't want to throw if we can't find the source - we just want to
		    // return null, so we provide a flag to exit gracefully.
		    if (nullOnMissing) {
		      return null;
		    }
		    else {
		      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
		    }
		  };

		/**
		 * Returns the generated line and column information for the original source,
		 * line, and column positions provided. The only argument is an object with
		 * the following properties:
		 *
		 *   - source: The filename of the original source.
		 *   - line: The line number in the original source.  The line number
		 *     is 1-based.
		 *   - column: The column number in the original source.  The column
		 *     number is 0-based.
		 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
		 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
		 *     closest element that is smaller than or greater than the one we are
		 *     searching for, respectively, if the exact element cannot be found.
		 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
		 *
		 * and an object is returned with the following properties:
		 *
		 *   - line: The line number in the generated source, or null.  The
		 *     line number is 1-based.
		 *   - column: The column number in the generated source, or null.
		 *     The column number is 0-based.
		 */
		BasicSourceMapConsumer.prototype.generatedPositionFor =
		  function SourceMapConsumer_generatedPositionFor(aArgs) {
		    var source = util.getArg(aArgs, 'source');
		    source = this._findSourceIndex(source);
		    if (source < 0) {
		      return {
		        line: null,
		        column: null,
		        lastColumn: null
		      };
		    }

		    var needle = {
		      source: source,
		      originalLine: util.getArg(aArgs, 'line'),
		      originalColumn: util.getArg(aArgs, 'column')
		    };

		    var index = this._findMapping(
		      needle,
		      this._originalMappings,
		      "originalLine",
		      "originalColumn",
		      util.compareByOriginalPositions,
		      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		    );

		    if (index >= 0) {
		      var mapping = this._originalMappings[index];

		      if (mapping.source === needle.source) {
		        return {
		          line: util.getArg(mapping, 'generatedLine', null),
		          column: util.getArg(mapping, 'generatedColumn', null),
		          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
		        };
		      }
		    }

		    return {
		      line: null,
		      column: null,
		      lastColumn: null
		    };
		  };

		sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

		/**
		 * An IndexedSourceMapConsumer instance represents a parsed source map which
		 * we can query for information. It differs from BasicSourceMapConsumer in
		 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
		 * input.
		 *
		 * The first parameter is a raw source map (either as a JSON string, or already
		 * parsed to an object). According to the spec for indexed source maps, they
		 * have the following attributes:
		 *
		 *   - version: Which version of the source map spec this map is following.
		 *   - file: Optional. The generated file this source map is associated with.
		 *   - sections: A list of section definitions.
		 *
		 * Each value under the "sections" field has two fields:
		 *   - offset: The offset into the original specified at which this section
		 *       begins to apply, defined as an object with a "line" and "column"
		 *       field.
		 *   - map: A source map definition. This source map could also be indexed,
		 *       but doesn't have to be.
		 *
		 * Instead of the "map" field, it's also possible to have a "url" field
		 * specifying a URL to retrieve a source map from, but that's currently
		 * unsupported.
		 *
		 * Here's an example source map, taken from the source map spec[0], but
		 * modified to omit a section which uses the "url" field.
		 *
		 *  {
		 *    version : 3,
		 *    file: "app.js",
		 *    sections: [{
		 *      offset: {line:100, column:10},
		 *      map: {
		 *        version : 3,
		 *        file: "section.js",
		 *        sources: ["foo.js", "bar.js"],
		 *        names: ["src", "maps", "are", "fun"],
		 *        mappings: "AAAA,E;;ABCDE;"
		 *      }
		 *    }],
		 *  }
		 *
		 * The second parameter, if given, is a string whose value is the URL
		 * at which the source map was found.  This URL is used to compute the
		 * sources array.
		 *
		 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
		 */
		function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
		  var sourceMap = aSourceMap;
		  if (typeof aSourceMap === 'string') {
		    sourceMap = util.parseSourceMapInput(aSourceMap);
		  }

		  var version = util.getArg(sourceMap, 'version');
		  var sections = util.getArg(sourceMap, 'sections');

		  if (version != this._version) {
		    throw new Error('Unsupported version: ' + version);
		  }

		  this._sources = new ArraySet();
		  this._names = new ArraySet();

		  var lastOffset = {
		    line: -1,
		    column: 0
		  };
		  this._sections = sections.map(function (s) {
		    if (s.url) {
		      // The url field will require support for asynchronicity.
		      // See https://github.com/mozilla/source-map/issues/16
		      throw new Error('Support for url field in sections not implemented.');
		    }
		    var offset = util.getArg(s, 'offset');
		    var offsetLine = util.getArg(offset, 'line');
		    var offsetColumn = util.getArg(offset, 'column');

		    if (offsetLine < lastOffset.line ||
		        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
		      throw new Error('Section offsets must be ordered and non-overlapping.');
		    }
		    lastOffset = offset;

		    return {
		      generatedOffset: {
		        // The offset fields are 0-based, but we use 1-based indices when
		        // encoding/decoding from VLQ.
		        generatedLine: offsetLine + 1,
		        generatedColumn: offsetColumn + 1
		      },
		      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
		    }
		  });
		}

		IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
		IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

		/**
		 * The version of the source mapping spec that we are consuming.
		 */
		IndexedSourceMapConsumer.prototype._version = 3;

		/**
		 * The list of original sources.
		 */
		Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
		  get: function () {
		    var sources = [];
		    for (var i = 0; i < this._sections.length; i++) {
		      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
		        sources.push(this._sections[i].consumer.sources[j]);
		      }
		    }
		    return sources;
		  }
		});

		/**
		 * Returns the original source, line, and column information for the generated
		 * source's line and column positions provided. The only argument is an object
		 * with the following properties:
		 *
		 *   - line: The line number in the generated source.  The line number
		 *     is 1-based.
		 *   - column: The column number in the generated source.  The column
		 *     number is 0-based.
		 *
		 * and an object is returned with the following properties:
		 *
		 *   - source: The original source file, or null.
		 *   - line: The line number in the original source, or null.  The
		 *     line number is 1-based.
		 *   - column: The column number in the original source, or null.  The
		 *     column number is 0-based.
		 *   - name: The original identifier, or null.
		 */
		IndexedSourceMapConsumer.prototype.originalPositionFor =
		  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		    var needle = {
		      generatedLine: util.getArg(aArgs, 'line'),
		      generatedColumn: util.getArg(aArgs, 'column')
		    };

		    // Find the section containing the generated position we're trying to map
		    // to an original position.
		    var sectionIndex = binarySearch.search(needle, this._sections,
		      function(needle, section) {
		        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
		        if (cmp) {
		          return cmp;
		        }

		        return (needle.generatedColumn -
		                section.generatedOffset.generatedColumn);
		      });
		    var section = this._sections[sectionIndex];

		    if (!section) {
		      return {
		        source: null,
		        line: null,
		        column: null,
		        name: null
		      };
		    }

		    return section.consumer.originalPositionFor({
		      line: needle.generatedLine -
		        (section.generatedOffset.generatedLine - 1),
		      column: needle.generatedColumn -
		        (section.generatedOffset.generatedLine === needle.generatedLine
		         ? section.generatedOffset.generatedColumn - 1
		         : 0),
		      bias: aArgs.bias
		    });
		  };

		/**
		 * Return true if we have the source content for every source in the source
		 * map, false otherwise.
		 */
		IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
		  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		    return this._sections.every(function (s) {
		      return s.consumer.hasContentsOfAllSources();
		    });
		  };

		/**
		 * Returns the original source content. The only argument is the url of the
		 * original source file. Returns null if no original source content is
		 * available.
		 */
		IndexedSourceMapConsumer.prototype.sourceContentFor =
		  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		    for (var i = 0; i < this._sections.length; i++) {
		      var section = this._sections[i];

		      var content = section.consumer.sourceContentFor(aSource, true);
		      if (content) {
		        return content;
		      }
		    }
		    if (nullOnMissing) {
		      return null;
		    }
		    else {
		      throw new Error('"' + aSource + '" is not in the SourceMap.');
		    }
		  };

		/**
		 * Returns the generated line and column information for the original source,
		 * line, and column positions provided. The only argument is an object with
		 * the following properties:
		 *
		 *   - source: The filename of the original source.
		 *   - line: The line number in the original source.  The line number
		 *     is 1-based.
		 *   - column: The column number in the original source.  The column
		 *     number is 0-based.
		 *
		 * and an object is returned with the following properties:
		 *
		 *   - line: The line number in the generated source, or null.  The
		 *     line number is 1-based. 
		 *   - column: The column number in the generated source, or null.
		 *     The column number is 0-based.
		 */
		IndexedSourceMapConsumer.prototype.generatedPositionFor =
		  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		    for (var i = 0; i < this._sections.length; i++) {
		      var section = this._sections[i];

		      // Only consider this section if the requested source is in the list of
		      // sources of the consumer.
		      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
		        continue;
		      }
		      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
		      if (generatedPosition) {
		        var ret = {
		          line: generatedPosition.line +
		            (section.generatedOffset.generatedLine - 1),
		          column: generatedPosition.column +
		            (section.generatedOffset.generatedLine === generatedPosition.line
		             ? section.generatedOffset.generatedColumn - 1
		             : 0)
		        };
		        return ret;
		      }
		    }

		    return {
		      line: null,
		      column: null
		    };
		  };

		/**
		 * Parse the mappings in a string in to a data structure which we can easily
		 * query (the ordered arrays in the `this.__generatedMappings` and
		 * `this.__originalMappings` properties).
		 */
		IndexedSourceMapConsumer.prototype._parseMappings =
		  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		    this.__generatedMappings = [];
		    this.__originalMappings = [];
		    for (var i = 0; i < this._sections.length; i++) {
		      var section = this._sections[i];
		      var sectionMappings = section.consumer._generatedMappings;
		      for (var j = 0; j < sectionMappings.length; j++) {
		        var mapping = sectionMappings[j];

		        var source = section.consumer._sources.at(mapping.source);
		        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
		        this._sources.add(source);
		        source = this._sources.indexOf(source);

		        var name = null;
		        if (mapping.name) {
		          name = section.consumer._names.at(mapping.name);
		          this._names.add(name);
		          name = this._names.indexOf(name);
		        }

		        // The mappings coming from the consumer for the section have
		        // generated positions relative to the start of the section, so we
		        // need to offset them to be relative to the start of the concatenated
		        // generated file.
		        var adjustedMapping = {
		          source: source,
		          generatedLine: mapping.generatedLine +
		            (section.generatedOffset.generatedLine - 1),
		          generatedColumn: mapping.generatedColumn +
		            (section.generatedOffset.generatedLine === mapping.generatedLine
		            ? section.generatedOffset.generatedColumn - 1
		            : 0),
		          originalLine: mapping.originalLine,
		          originalColumn: mapping.originalColumn,
		          name: name
		        };

		        this.__generatedMappings.push(adjustedMapping);
		        if (typeof adjustedMapping.originalLine === 'number') {
		          this.__originalMappings.push(adjustedMapping);
		        }
		      }
		    }

		    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		    quickSort(this.__originalMappings, util.compareByOriginalPositions);
		  };

		sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
		return sourceMapConsumer;
	}

	var sourceNode = {};

	/* -*- Mode: js; js-indent-level: 2; -*- */

	var hasRequiredSourceNode;

	function requireSourceNode () {
		if (hasRequiredSourceNode) return sourceNode;
		hasRequiredSourceNode = 1;
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */

		var SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
		var util = requireUtil();

		// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
		// operating systems these days (capturing the result).
		var REGEX_NEWLINE = /(\r?\n)/;

		// Newline character code for charCodeAt() comparisons
		var NEWLINE_CODE = 10;

		// Private symbol for identifying `SourceNode`s when multiple versions of
		// the source-map library are loaded. This MUST NOT CHANGE across
		// versions!
		var isSourceNode = "$$$isSourceNode$$$";

		/**
		 * SourceNodes provide a way to abstract over interpolating/concatenating
		 * snippets of generated JavaScript source code while maintaining the line and
		 * column information associated with the original source code.
		 *
		 * @param aLine The original line number.
		 * @param aColumn The original column number.
		 * @param aSource The original source's filename.
		 * @param aChunks Optional. An array of strings which are snippets of
		 *        generated JS, or other SourceNodes.
		 * @param aName The original identifier.
		 */
		function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		  this.children = [];
		  this.sourceContents = {};
		  this.line = aLine == null ? null : aLine;
		  this.column = aColumn == null ? null : aColumn;
		  this.source = aSource == null ? null : aSource;
		  this.name = aName == null ? null : aName;
		  this[isSourceNode] = true;
		  if (aChunks != null) this.add(aChunks);
		}

		/**
		 * Creates a SourceNode from generated code and a SourceMapConsumer.
		 *
		 * @param aGeneratedCode The generated code
		 * @param aSourceMapConsumer The SourceMap for the generated code
		 * @param aRelativePath Optional. The path that relative sources in the
		 *        SourceMapConsumer should be relative to.
		 */
		SourceNode.fromStringWithSourceMap =
		  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		    // The SourceNode we want to fill with the generated code
		    // and the SourceMap
		    var node = new SourceNode();

		    // All even indices of this array are one line of the generated code,
		    // while all odd indices are the newlines between two adjacent lines
		    // (since `REGEX_NEWLINE` captures its match).
		    // Processed fragments are accessed by calling `shiftNextLine`.
		    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		    var remainingLinesIndex = 0;
		    var shiftNextLine = function() {
		      var lineContents = getNextLine();
		      // The last line of a file might not have a newline.
		      var newLine = getNextLine() || "";
		      return lineContents + newLine;

		      function getNextLine() {
		        return remainingLinesIndex < remainingLines.length ?
		            remainingLines[remainingLinesIndex++] : undefined;
		      }
		    };

		    // We need to remember the position of "remainingLines"
		    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

		    // The generate SourceNodes we need a code range.
		    // To extract it current and last mapping is used.
		    // Here we store the last mapping.
		    var lastMapping = null;

		    aSourceMapConsumer.eachMapping(function (mapping) {
		      if (lastMapping !== null) {
		        // We add the code from "lastMapping" to "mapping":
		        // First check if there is a new line in between.
		        if (lastGeneratedLine < mapping.generatedLine) {
		          // Associate first line with "lastMapping"
		          addMappingWithCode(lastMapping, shiftNextLine());
		          lastGeneratedLine++;
		          lastGeneratedColumn = 0;
		          // The remaining code is added without mapping
		        } else {
		          // There is no new line in between.
		          // Associate the code between "lastGeneratedColumn" and
		          // "mapping.generatedColumn" with "lastMapping"
		          var nextLine = remainingLines[remainingLinesIndex] || '';
		          var code = nextLine.substr(0, mapping.generatedColumn -
		                                        lastGeneratedColumn);
		          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
		                                              lastGeneratedColumn);
		          lastGeneratedColumn = mapping.generatedColumn;
		          addMappingWithCode(lastMapping, code);
		          // No more remaining code, continue
		          lastMapping = mapping;
		          return;
		        }
		      }
		      // We add the generated code until the first mapping
		      // to the SourceNode without any mapping.
		      // Each line is added as separate string.
		      while (lastGeneratedLine < mapping.generatedLine) {
		        node.add(shiftNextLine());
		        lastGeneratedLine++;
		      }
		      if (lastGeneratedColumn < mapping.generatedColumn) {
		        var nextLine = remainingLines[remainingLinesIndex] || '';
		        node.add(nextLine.substr(0, mapping.generatedColumn));
		        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
		        lastGeneratedColumn = mapping.generatedColumn;
		      }
		      lastMapping = mapping;
		    }, this);
		    // We have processed all mappings.
		    if (remainingLinesIndex < remainingLines.length) {
		      if (lastMapping) {
		        // Associate the remaining code in the current line with "lastMapping"
		        addMappingWithCode(lastMapping, shiftNextLine());
		      }
		      // and add the remaining lines without any mapping
		      node.add(remainingLines.splice(remainingLinesIndex).join(""));
		    }

		    // Copy sourcesContent into SourceNode
		    aSourceMapConsumer.sources.forEach(function (sourceFile) {
		      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
		      if (content != null) {
		        if (aRelativePath != null) {
		          sourceFile = util.join(aRelativePath, sourceFile);
		        }
		        node.setSourceContent(sourceFile, content);
		      }
		    });

		    return node;

		    function addMappingWithCode(mapping, code) {
		      if (mapping === null || mapping.source === undefined) {
		        node.add(code);
		      } else {
		        var source = aRelativePath
		          ? util.join(aRelativePath, mapping.source)
		          : mapping.source;
		        node.add(new SourceNode(mapping.originalLine,
		                                mapping.originalColumn,
		                                source,
		                                code,
		                                mapping.name));
		      }
		    }
		  };

		/**
		 * Add a chunk of generated JS to this source node.
		 *
		 * @param aChunk A string snippet of generated JS code, another instance of
		 *        SourceNode, or an array where each member is one of those things.
		 */
		SourceNode.prototype.add = function SourceNode_add(aChunk) {
		  if (Array.isArray(aChunk)) {
		    aChunk.forEach(function (chunk) {
		      this.add(chunk);
		    }, this);
		  }
		  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		    if (aChunk) {
		      this.children.push(aChunk);
		    }
		  }
		  else {
		    throw new TypeError(
		      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		    );
		  }
		  return this;
		};

		/**
		 * Add a chunk of generated JS to the beginning of this source node.
		 *
		 * @param aChunk A string snippet of generated JS code, another instance of
		 *        SourceNode, or an array where each member is one of those things.
		 */
		SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		  if (Array.isArray(aChunk)) {
		    for (var i = aChunk.length-1; i >= 0; i--) {
		      this.prepend(aChunk[i]);
		    }
		  }
		  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		    this.children.unshift(aChunk);
		  }
		  else {
		    throw new TypeError(
		      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		    );
		  }
		  return this;
		};

		/**
		 * Walk over the tree of JS snippets in this node and its children. The
		 * walking function is called once for each snippet of JS and is passed that
		 * snippet and the its original associated source's line/column location.
		 *
		 * @param aFn The traversal function.
		 */
		SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		  var chunk;
		  for (var i = 0, len = this.children.length; i < len; i++) {
		    chunk = this.children[i];
		    if (chunk[isSourceNode]) {
		      chunk.walk(aFn);
		    }
		    else {
		      if (chunk !== '') {
		        aFn(chunk, { source: this.source,
		                     line: this.line,
		                     column: this.column,
		                     name: this.name });
		      }
		    }
		  }
		};

		/**
		 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
		 * each of `this.children`.
		 *
		 * @param aSep The separator.
		 */
		SourceNode.prototype.join = function SourceNode_join(aSep) {
		  var newChildren;
		  var i;
		  var len = this.children.length;
		  if (len > 0) {
		    newChildren = [];
		    for (i = 0; i < len-1; i++) {
		      newChildren.push(this.children[i]);
		      newChildren.push(aSep);
		    }
		    newChildren.push(this.children[i]);
		    this.children = newChildren;
		  }
		  return this;
		};

		/**
		 * Call String.prototype.replace on the very right-most source snippet. Useful
		 * for trimming whitespace from the end of a source node, etc.
		 *
		 * @param aPattern The pattern to replace.
		 * @param aReplacement The thing to replace the pattern with.
		 */
		SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		  var lastChild = this.children[this.children.length - 1];
		  if (lastChild[isSourceNode]) {
		    lastChild.replaceRight(aPattern, aReplacement);
		  }
		  else if (typeof lastChild === 'string') {
		    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		  }
		  else {
		    this.children.push(''.replace(aPattern, aReplacement));
		  }
		  return this;
		};

		/**
		 * Set the source content for a source file. This will be added to the SourceMapGenerator
		 * in the sourcesContent field.
		 *
		 * @param aSourceFile The filename of the source file
		 * @param aSourceContent The content of the source file
		 */
		SourceNode.prototype.setSourceContent =
		  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
		  };

		/**
		 * Walk over the tree of SourceNodes. The walking function is called for each
		 * source file content and is passed the filename and source content.
		 *
		 * @param aFn The traversal function.
		 */
		SourceNode.prototype.walkSourceContents =
		  function SourceNode_walkSourceContents(aFn) {
		    for (var i = 0, len = this.children.length; i < len; i++) {
		      if (this.children[i][isSourceNode]) {
		        this.children[i].walkSourceContents(aFn);
		      }
		    }

		    var sources = Object.keys(this.sourceContents);
		    for (var i = 0, len = sources.length; i < len; i++) {
		      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
		    }
		  };

		/**
		 * Return the string representation of this source node. Walks over the tree
		 * and concatenates all the various snippets together to one string.
		 */
		SourceNode.prototype.toString = function SourceNode_toString() {
		  var str = "";
		  this.walk(function (chunk) {
		    str += chunk;
		  });
		  return str;
		};

		/**
		 * Returns the string representation of this source node along with a source
		 * map.
		 */
		SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		  var generated = {
		    code: "",
		    line: 1,
		    column: 0
		  };
		  var map = new SourceMapGenerator(aArgs);
		  var sourceMappingActive = false;
		  var lastOriginalSource = null;
		  var lastOriginalLine = null;
		  var lastOriginalColumn = null;
		  var lastOriginalName = null;
		  this.walk(function (chunk, original) {
		    generated.code += chunk;
		    if (original.source !== null
		        && original.line !== null
		        && original.column !== null) {
		      if(lastOriginalSource !== original.source
		         || lastOriginalLine !== original.line
		         || lastOriginalColumn !== original.column
		         || lastOriginalName !== original.name) {
		        map.addMapping({
		          source: original.source,
		          original: {
		            line: original.line,
		            column: original.column
		          },
		          generated: {
		            line: generated.line,
		            column: generated.column
		          },
		          name: original.name
		        });
		      }
		      lastOriginalSource = original.source;
		      lastOriginalLine = original.line;
		      lastOriginalColumn = original.column;
		      lastOriginalName = original.name;
		      sourceMappingActive = true;
		    } else if (sourceMappingActive) {
		      map.addMapping({
		        generated: {
		          line: generated.line,
		          column: generated.column
		        }
		      });
		      lastOriginalSource = null;
		      sourceMappingActive = false;
		    }
		    for (var idx = 0, length = chunk.length; idx < length; idx++) {
		      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
		        generated.line++;
		        generated.column = 0;
		        // Mappings end at eol
		        if (idx + 1 === length) {
		          lastOriginalSource = null;
		          sourceMappingActive = false;
		        } else if (sourceMappingActive) {
		          map.addMapping({
		            source: original.source,
		            original: {
		              line: original.line,
		              column: original.column
		            },
		            generated: {
		              line: generated.line,
		              column: generated.column
		            },
		            name: original.name
		          });
		        }
		      } else {
		        generated.column++;
		      }
		    }
		  });
		  this.walkSourceContents(function (sourceFile, sourceContent) {
		    map.setSourceContent(sourceFile, sourceContent);
		  });

		  return { code: generated.code, map: map };
		};

		sourceNode.SourceNode = SourceNode;
		return sourceNode;
	}

	/*
	 * Copyright 2009-2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE.txt or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var hasRequiredSourceMap;

	function requireSourceMap () {
		if (hasRequiredSourceMap) return sourceMap;
		hasRequiredSourceMap = 1;
		sourceMap.SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
		sourceMap.SourceMapConsumer = requireSourceMapConsumer().SourceMapConsumer;
		sourceMap.SourceNode = requireSourceNode().SourceNode;
		return sourceMap;
	}

	/* global define, require */

	(function (module, exports) {

		exports.__esModule = true;

		var _utils = utils;

		var SourceNode = undefined;

		try {
		  /* istanbul ignore next */
		  if (typeof undefined !== 'function' || !undefined.amd) {
		    // We don't support this in AMD environments. For these environments, we assume that
		    // they are running on the browser and thus have no need for the source-map library.
		    var SourceMap = requireSourceMap();
		    SourceNode = SourceMap.SourceNode;
		  }
		} catch (err) {}
		/* NOP */

		/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
		if (!SourceNode) {
		  SourceNode = function (line, column, srcFile, chunks) {
		    this.src = '';
		    if (chunks) {
		      this.add(chunks);
		    }
		  };
		  /* istanbul ignore next */
		  SourceNode.prototype = {
		    add: function add(chunks) {
		      if (_utils.isArray(chunks)) {
		        chunks = chunks.join('');
		      }
		      this.src += chunks;
		    },
		    prepend: function prepend(chunks) {
		      if (_utils.isArray(chunks)) {
		        chunks = chunks.join('');
		      }
		      this.src = chunks + this.src;
		    },
		    toStringWithSourceMap: function toStringWithSourceMap() {
		      return { code: this.toString() };
		    },
		    toString: function toString() {
		      return this.src;
		    }
		  };
		}

		function castChunk(chunk, codeGen, loc) {
		  if (_utils.isArray(chunk)) {
		    var ret = [];

		    for (var i = 0, len = chunk.length; i < len; i++) {
		      ret.push(codeGen.wrap(chunk[i], loc));
		    }
		    return ret;
		  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
		    // Handle primitives that the SourceNode will throw up on
		    return chunk + '';
		  }
		  return chunk;
		}

		function CodeGen(srcFile) {
		  this.srcFile = srcFile;
		  this.source = [];
		}

		CodeGen.prototype = {
		  isEmpty: function isEmpty() {
		    return !this.source.length;
		  },
		  prepend: function prepend(source, loc) {
		    this.source.unshift(this.wrap(source, loc));
		  },
		  push: function push(source, loc) {
		    this.source.push(this.wrap(source, loc));
		  },

		  merge: function merge() {
		    var source = this.empty();
		    this.each(function (line) {
		      source.add(['  ', line, '\n']);
		    });
		    return source;
		  },

		  each: function each(iter) {
		    for (var i = 0, len = this.source.length; i < len; i++) {
		      iter(this.source[i]);
		    }
		  },

		  empty: function empty() {
		    var loc = this.currentLocation || { start: {} };
		    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
		  },
		  wrap: function wrap(chunk) {
		    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

		    if (chunk instanceof SourceNode) {
		      return chunk;
		    }

		    chunk = castChunk(chunk, this, loc);

		    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
		  },

		  functionCall: function functionCall(fn, type, params) {
		    params = this.generateList(params);
		    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
		  },

		  quotedString: function quotedString(str) {
		    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
		    .replace(/\u2029/g, '\\u2029') + '"';
		  },

		  objectLiteral: function objectLiteral(obj) {
		    // istanbul ignore next

		    var _this = this;

		    var pairs = [];

		    Object.keys(obj).forEach(function (key) {
		      var value = castChunk(obj[key], _this);
		      if (value !== 'undefined') {
		        pairs.push([_this.quotedString(key), ':', value]);
		      }
		    });

		    var ret = this.generateList(pairs);
		    ret.prepend('{');
		    ret.add('}');
		    return ret;
		  },

		  generateList: function generateList(entries) {
		    var ret = this.empty();

		    for (var i = 0, len = entries.length; i < len; i++) {
		      if (i) {
		        ret.add(',');
		      }

		      ret.add(castChunk(entries[i], this));
		    }

		    return ret;
		  },

		  generateArray: function generateArray(entries) {
		    var ret = this.generateList(entries);
		    ret.prepend('[');
		    ret.add(']');

		    return ret;
		  }
		};

		exports['default'] = CodeGen;
		module.exports = exports['default'];
		
	} (codeGen, codeGen.exports));

	var codeGenExports = codeGen.exports;

	(function (module, exports) {

		exports.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _base = base$1;

		var _exception = exceptionExports;

		var _exception2 = _interopRequireDefault(_exception);

		var _utils = utils;

		var _codeGen = codeGenExports;

		var _codeGen2 = _interopRequireDefault(_codeGen);

		function Literal(value) {
		  this.value = value;
		}

		function JavaScriptCompiler() {}

		JavaScriptCompiler.prototype = {
		  // PUBLIC API: You can override these methods in a subclass to provide
		  // alternative compiled forms for name lookup and buffering semantics
		  nameLookup: function nameLookup(parent, name /*,  type */) {
		    return this.internalNameLookup(parent, name);
		  },
		  depthedLookup: function depthedLookup(name) {
		    return [this.aliasable('container.lookup'), '(depths, ', JSON.stringify(name), ')'];
		  },

		  compilerInfo: function compilerInfo() {
		    var revision = _base.COMPILER_REVISION,
		        versions = _base.REVISION_CHANGES[revision];
		    return [revision, versions];
		  },

		  appendToBuffer: function appendToBuffer(source, location, explicit) {
		    // Force a source as this simplifies the merge logic.
		    if (!_utils.isArray(source)) {
		      source = [source];
		    }
		    source = this.source.wrap(source, location);

		    if (this.environment.isSimple) {
		      return ['return ', source, ';'];
		    } else if (explicit) {
		      // This is a case where the buffer operation occurs as a child of another
		      // construct, generally braces. We have to explicitly output these buffer
		      // operations to ensure that the emitted code goes in the correct location.
		      return ['buffer += ', source, ';'];
		    } else {
		      source.appendToBuffer = true;
		      return source;
		    }
		  },

		  initializeBuffer: function initializeBuffer() {
		    return this.quotedString('');
		  },
		  // END PUBLIC API
		  internalNameLookup: function internalNameLookup(parent, name) {
		    this.lookupPropertyFunctionIsUsed = true;
		    return ['lookupProperty(', parent, ',', JSON.stringify(name), ')'];
		  },

		  lookupPropertyFunctionIsUsed: false,

		  compile: function compile(environment, options, context, asObject) {
		    this.environment = environment;
		    this.options = options;
		    this.stringParams = this.options.stringParams;
		    this.trackIds = this.options.trackIds;
		    this.precompile = !asObject;

		    this.name = this.environment.name;
		    this.isChild = !!context;
		    this.context = context || {
		      decorators: [],
		      programs: [],
		      environments: []
		    };

		    this.preamble();

		    this.stackSlot = 0;
		    this.stackVars = [];
		    this.aliases = {};
		    this.registers = { list: [] };
		    this.hashes = [];
		    this.compileStack = [];
		    this.inlineStack = [];
		    this.blockParams = [];

		    this.compileChildren(environment, options);

		    this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
		    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

		    var opcodes = environment.opcodes,
		        opcode = undefined,
		        firstLoc = undefined,
		        i = undefined,
		        l = undefined;

		    for (i = 0, l = opcodes.length; i < l; i++) {
		      opcode = opcodes[i];

		      this.source.currentLocation = opcode.loc;
		      firstLoc = firstLoc || opcode.loc;
		      this[opcode.opcode].apply(this, opcode.args);
		    }

		    // Flush any trailing content that might be pending.
		    this.source.currentLocation = firstLoc;
		    this.pushSource('');

		    /* istanbul ignore next */
		    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
		      throw new _exception2['default']('Compile completed with content left on stack');
		    }

		    if (!this.decorators.isEmpty()) {
		      this.useDecorators = true;

		      this.decorators.prepend(['var decorators = container.decorators, ', this.lookupPropertyFunctionVarDeclaration(), ';\n']);
		      this.decorators.push('return fn;');

		      if (asObject) {
		        this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
		      } else {
		        this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
		        this.decorators.push('}\n');
		        this.decorators = this.decorators.merge();
		      }
		    } else {
		      this.decorators = undefined;
		    }

		    var fn = this.createFunctionContext(asObject);
		    if (!this.isChild) {
		      var ret = {
		        compiler: this.compilerInfo(),
		        main: fn
		      };

		      if (this.decorators) {
		        ret.main_d = this.decorators; // eslint-disable-line camelcase
		        ret.useDecorators = true;
		      }

		      var _context = this.context;
		      var programs = _context.programs;
		      var decorators = _context.decorators;

		      for (i = 0, l = programs.length; i < l; i++) {
		        if (programs[i]) {
		          ret[i] = programs[i];
		          if (decorators[i]) {
		            ret[i + '_d'] = decorators[i];
		            ret.useDecorators = true;
		          }
		        }
		      }

		      if (this.environment.usePartial) {
		        ret.usePartial = true;
		      }
		      if (this.options.data) {
		        ret.useData = true;
		      }
		      if (this.useDepths) {
		        ret.useDepths = true;
		      }
		      if (this.useBlockParams) {
		        ret.useBlockParams = true;
		      }
		      if (this.options.compat) {
		        ret.compat = true;
		      }

		      if (!asObject) {
		        ret.compiler = JSON.stringify(ret.compiler);

		        this.source.currentLocation = { start: { line: 1, column: 0 } };
		        ret = this.objectLiteral(ret);

		        if (options.srcName) {
		          ret = ret.toStringWithSourceMap({ file: options.destName });
		          ret.map = ret.map && ret.map.toString();
		        } else {
		          ret = ret.toString();
		        }
		      } else {
		        ret.compilerOptions = this.options;
		      }

		      return ret;
		    } else {
		      return fn;
		    }
		  },

		  preamble: function preamble() {
		    // track the last context pushed into place to allow skipping the
		    // getContext opcode when it would be a noop
		    this.lastContext = 0;
		    this.source = new _codeGen2['default'](this.options.srcName);
		    this.decorators = new _codeGen2['default'](this.options.srcName);
		  },

		  createFunctionContext: function createFunctionContext(asObject) {
		    // istanbul ignore next

		    var _this = this;

		    var varDeclarations = '';

		    var locals = this.stackVars.concat(this.registers.list);
		    if (locals.length > 0) {
		      varDeclarations += ', ' + locals.join(', ');
		    }

		    // Generate minimizer alias mappings
		    //
		    // When using true SourceNodes, this will update all references to the given alias
		    // as the source nodes are reused in situ. For the non-source node compilation mode,
		    // aliases will not be used, but this case is already being run on the client and
		    // we aren't concern about minimizing the template size.
		    var aliasCount = 0;
		    Object.keys(this.aliases).forEach(function (alias) {
		      var node = _this.aliases[alias];
		      if (node.children && node.referenceCount > 1) {
		        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
		        node.children[0] = 'alias' + aliasCount;
		      }
		    });

		    if (this.lookupPropertyFunctionIsUsed) {
		      varDeclarations += ', ' + this.lookupPropertyFunctionVarDeclaration();
		    }

		    var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

		    if (this.useBlockParams || this.useDepths) {
		      params.push('blockParams');
		    }
		    if (this.useDepths) {
		      params.push('depths');
		    }

		    // Perform a second pass over the output to merge content when possible
		    var source = this.mergeSource(varDeclarations);

		    if (asObject) {
		      params.push(source);

		      return Function.apply(this, params);
		    } else {
		      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
		    }
		  },
		  mergeSource: function mergeSource(varDeclarations) {
		    var isSimple = this.environment.isSimple,
		        appendOnly = !this.forceBuffer,
		        appendFirst = undefined,
		        sourceSeen = undefined,
		        bufferStart = undefined,
		        bufferEnd = undefined;
		    this.source.each(function (line) {
		      if (line.appendToBuffer) {
		        if (bufferStart) {
		          line.prepend('  + ');
		        } else {
		          bufferStart = line;
		        }
		        bufferEnd = line;
		      } else {
		        if (bufferStart) {
		          if (!sourceSeen) {
		            appendFirst = true;
		          } else {
		            bufferStart.prepend('buffer += ');
		          }
		          bufferEnd.add(';');
		          bufferStart = bufferEnd = undefined;
		        }

		        sourceSeen = true;
		        if (!isSimple) {
		          appendOnly = false;
		        }
		      }
		    });

		    if (appendOnly) {
		      if (bufferStart) {
		        bufferStart.prepend('return ');
		        bufferEnd.add(';');
		      } else if (!sourceSeen) {
		        this.source.push('return "";');
		      }
		    } else {
		      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

		      if (bufferStart) {
		        bufferStart.prepend('return buffer + ');
		        bufferEnd.add(';');
		      } else {
		        this.source.push('return buffer;');
		      }
		    }

		    if (varDeclarations) {
		      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
		    }

		    return this.source.merge();
		  },

		  lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
		    return '\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    '.trim();
		  },

		  // [blockValue]
		  //
		  // On stack, before: hash, inverse, program, value
		  // On stack, after: return value of blockHelperMissing
		  //
		  // The purpose of this opcode is to take a block of the form
		  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
		  // replace it on the stack with the result of properly
		  // invoking blockHelperMissing.
		  blockValue: function blockValue(name) {
		    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
		        params = [this.contextName(0)];
		    this.setupHelperArgs(name, 0, params);

		    var blockName = this.popStack();
		    params.splice(1, 0, blockName);

		    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
		  },

		  // [ambiguousBlockValue]
		  //
		  // On stack, before: hash, inverse, program, value
		  // Compiler value, before: lastHelper=value of last found helper, if any
		  // On stack, after, if no lastHelper: same as [blockValue]
		  // On stack, after, if lastHelper: value
		  ambiguousBlockValue: function ambiguousBlockValue() {
		    // We're being a bit cheeky and reusing the options value from the prior exec
		    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
		        params = [this.contextName(0)];
		    this.setupHelperArgs('', 0, params, true);

		    this.flushInline();

		    var current = this.topStack();
		    params.splice(1, 0, current);

		    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
		  },

		  // [appendContent]
		  //
		  // On stack, before: ...
		  // On stack, after: ...
		  //
		  // Appends the string value of `content` to the current buffer
		  appendContent: function appendContent(content) {
		    if (this.pendingContent) {
		      content = this.pendingContent + content;
		    } else {
		      this.pendingLocation = this.source.currentLocation;
		    }

		    this.pendingContent = content;
		  },

		  // [append]
		  //
		  // On stack, before: value, ...
		  // On stack, after: ...
		  //
		  // Coerces `value` to a String and appends it to the current buffer.
		  //
		  // If `value` is truthy, or 0, it is coerced into a string and appended
		  // Otherwise, the empty string is appended
		  append: function append() {
		    if (this.isInline()) {
		      this.replaceStack(function (current) {
		        return [' != null ? ', current, ' : ""'];
		      });

		      this.pushSource(this.appendToBuffer(this.popStack()));
		    } else {
		      var local = this.popStack();
		      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
		      if (this.environment.isSimple) {
		        this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
		      }
		    }
		  },

		  // [appendEscaped]
		  //
		  // On stack, before: value, ...
		  // On stack, after: ...
		  //
		  // Escape `value` and append it to the buffer
		  appendEscaped: function appendEscaped() {
		    this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
		  },

		  // [getContext]
		  //
		  // On stack, before: ...
		  // On stack, after: ...
		  // Compiler value, after: lastContext=depth
		  //
		  // Set the value of the `lastContext` compiler value to the depth
		  getContext: function getContext(depth) {
		    this.lastContext = depth;
		  },

		  // [pushContext]
		  //
		  // On stack, before: ...
		  // On stack, after: currentContext, ...
		  //
		  // Pushes the value of the current context onto the stack.
		  pushContext: function pushContext() {
		    this.pushStackLiteral(this.contextName(this.lastContext));
		  },

		  // [lookupOnContext]
		  //
		  // On stack, before: ...
		  // On stack, after: currentContext[name], ...
		  //
		  // Looks up the value of `name` on the current context and pushes
		  // it onto the stack.
		  lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
		    var i = 0;

		    if (!scoped && this.options.compat && !this.lastContext) {
		      // The depthed query is expected to handle the undefined logic for the root level that
		      // is implemented below, so we evaluate that directly in compat mode
		      this.push(this.depthedLookup(parts[i++]));
		    } else {
		      this.pushContext();
		    }

		    this.resolvePath('context', parts, i, falsy, strict);
		  },

		  // [lookupBlockParam]
		  //
		  // On stack, before: ...
		  // On stack, after: blockParam[name], ...
		  //
		  // Looks up the value of `parts` on the given block param and pushes
		  // it onto the stack.
		  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
		    this.useBlockParams = true;

		    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
		    this.resolvePath('context', parts, 1);
		  },

		  // [lookupData]
		  //
		  // On stack, before: ...
		  // On stack, after: data, ...
		  //
		  // Push the data lookup operator
		  lookupData: function lookupData(depth, parts, strict) {
		    if (!depth) {
		      this.pushStackLiteral('data');
		    } else {
		      this.pushStackLiteral('container.data(data, ' + depth + ')');
		    }

		    this.resolvePath('data', parts, 0, true, strict);
		  },

		  resolvePath: function resolvePath(type, parts, i, falsy, strict) {
		    // istanbul ignore next

		    var _this2 = this;

		    if (this.options.strict || this.options.assumeObjects) {
		      this.push(strictLookup(this.options.strict && strict, this, parts, i, type));
		      return;
		    }

		    var len = parts.length;
		    for (; i < len; i++) {
		      /* eslint-disable no-loop-func */
		      this.replaceStack(function (current) {
		        var lookup = _this2.nameLookup(current, parts[i], type);
		        // We want to ensure that zero and false are handled properly if the context (falsy flag)
		        // needs to have the special handling for these values.
		        if (!falsy) {
		          return [' != null ? ', lookup, ' : ', current];
		        } else {
		          // Otherwise we can use generic falsy handling
		          return [' && ', lookup];
		        }
		      });
		      /* eslint-enable no-loop-func */
		    }
		  },

		  // [resolvePossibleLambda]
		  //
		  // On stack, before: value, ...
		  // On stack, after: resolved value, ...
		  //
		  // If the `value` is a lambda, replace it on the stack by
		  // the return value of the lambda
		  resolvePossibleLambda: function resolvePossibleLambda() {
		    this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
		  },

		  // [pushStringParam]
		  //
		  // On stack, before: ...
		  // On stack, after: string, currentContext, ...
		  //
		  // This opcode is designed for use in string mode, which
		  // provides the string value of a parameter along with its
		  // depth rather than resolving it immediately.
		  pushStringParam: function pushStringParam(string, type) {
		    this.pushContext();
		    this.pushString(type);

		    // If it's a subexpression, the string result
		    // will be pushed after this opcode.
		    if (type !== 'SubExpression') {
		      if (typeof string === 'string') {
		        this.pushString(string);
		      } else {
		        this.pushStackLiteral(string);
		      }
		    }
		  },

		  emptyHash: function emptyHash(omitEmpty) {
		    if (this.trackIds) {
		      this.push('{}'); // hashIds
		    }
		    if (this.stringParams) {
		      this.push('{}'); // hashContexts
		      this.push('{}'); // hashTypes
		    }
		    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
		  },
		  pushHash: function pushHash() {
		    if (this.hash) {
		      this.hashes.push(this.hash);
		    }
		    this.hash = { values: {}, types: [], contexts: [], ids: [] };
		  },
		  popHash: function popHash() {
		    var hash = this.hash;
		    this.hash = this.hashes.pop();

		    if (this.trackIds) {
		      this.push(this.objectLiteral(hash.ids));
		    }
		    if (this.stringParams) {
		      this.push(this.objectLiteral(hash.contexts));
		      this.push(this.objectLiteral(hash.types));
		    }

		    this.push(this.objectLiteral(hash.values));
		  },

		  // [pushString]
		  //
		  // On stack, before: ...
		  // On stack, after: quotedString(string), ...
		  //
		  // Push a quoted version of `string` onto the stack
		  pushString: function pushString(string) {
		    this.pushStackLiteral(this.quotedString(string));
		  },

		  // [pushLiteral]
		  //
		  // On stack, before: ...
		  // On stack, after: value, ...
		  //
		  // Pushes a value onto the stack. This operation prevents
		  // the compiler from creating a temporary variable to hold
		  // it.
		  pushLiteral: function pushLiteral(value) {
		    this.pushStackLiteral(value);
		  },

		  // [pushProgram]
		  //
		  // On stack, before: ...
		  // On stack, after: program(guid), ...
		  //
		  // Push a program expression onto the stack. This takes
		  // a compile-time guid and converts it into a runtime-accessible
		  // expression.
		  pushProgram: function pushProgram(guid) {
		    if (guid != null) {
		      this.pushStackLiteral(this.programExpression(guid));
		    } else {
		      this.pushStackLiteral(null);
		    }
		  },

		  // [registerDecorator]
		  //
		  // On stack, before: hash, program, params..., ...
		  // On stack, after: ...
		  //
		  // Pops off the decorator's parameters, invokes the decorator,
		  // and inserts the decorator into the decorators list.
		  registerDecorator: function registerDecorator(paramSize, name) {
		    var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
		        options = this.setupHelperArgs(name, paramSize);

		    this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
		  },

		  // [invokeHelper]
		  //
		  // On stack, before: hash, inverse, program, params..., ...
		  // On stack, after: result of helper invocation
		  //
		  // Pops off the helper's parameters, invokes the helper,
		  // and pushes the helper's return value onto the stack.
		  //
		  // If the helper is not found, `helperMissing` is called.
		  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
		    var nonHelper = this.popStack(),
		        helper = this.setupHelper(paramSize, name);

		    var possibleFunctionCalls = [];

		    if (isSimple) {
		      // direct call to helper
		      possibleFunctionCalls.push(helper.name);
		    }
		    // call a function from the input object
		    possibleFunctionCalls.push(nonHelper);
		    if (!this.options.strict) {
		      possibleFunctionCalls.push(this.aliasable('container.hooks.helperMissing'));
		    }

		    var functionLookupCode = ['(', this.itemsSeparatedBy(possibleFunctionCalls, '||'), ')'];
		    var functionCall = this.source.functionCall(functionLookupCode, 'call', helper.callParams);
		    this.push(functionCall);
		  },

		  itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
		    var result = [];
		    result.push(items[0]);
		    for (var i = 1; i < items.length; i++) {
		      result.push(separator, items[i]);
		    }
		    return result;
		  },
		  // [invokeKnownHelper]
		  //
		  // On stack, before: hash, inverse, program, params..., ...
		  // On stack, after: result of helper invocation
		  //
		  // This operation is used when the helper is known to exist,
		  // so a `helperMissing` fallback is not required.
		  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
		    var helper = this.setupHelper(paramSize, name);
		    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
		  },

		  // [invokeAmbiguous]
		  //
		  // On stack, before: hash, inverse, program, params..., ...
		  // On stack, after: result of disambiguation
		  //
		  // This operation is used when an expression like `{{foo}}`
		  // is provided, but we don't know at compile-time whether it
		  // is a helper or a path.
		  //
		  // This operation emits more code than the other options,
		  // and can be avoided by passing the `knownHelpers` and
		  // `knownHelpersOnly` flags at compile-time.
		  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
		    this.useRegister('helper');

		    var nonHelper = this.popStack();

		    this.emptyHash();
		    var helper = this.setupHelper(0, name, helperCall);

		    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

		    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
		    if (!this.options.strict) {
		      lookup[0] = '(helper = ';
		      lookup.push(' != null ? helper : ', this.aliasable('container.hooks.helperMissing'));
		    }

		    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
		  },

		  // [invokePartial]
		  //
		  // On stack, before: context, ...
		  // On stack after: result of partial invocation
		  //
		  // This operation pops off a context, invokes a partial with that context,
		  // and pushes the result of the invocation back.
		  invokePartial: function invokePartial(isDynamic, name, indent) {
		    var params = [],
		        options = this.setupParams(name, 1, params);

		    if (isDynamic) {
		      name = this.popStack();
		      delete options.name;
		    }

		    if (indent) {
		      options.indent = JSON.stringify(indent);
		    }
		    options.helpers = 'helpers';
		    options.partials = 'partials';
		    options.decorators = 'container.decorators';

		    if (!isDynamic) {
		      params.unshift(this.nameLookup('partials', name, 'partial'));
		    } else {
		      params.unshift(name);
		    }

		    if (this.options.compat) {
		      options.depths = 'depths';
		    }
		    options = this.objectLiteral(options);
		    params.push(options);

		    this.push(this.source.functionCall('container.invokePartial', '', params));
		  },

		  // [assignToHash]
		  //
		  // On stack, before: value, ..., hash, ...
		  // On stack, after: ..., hash, ...
		  //
		  // Pops a value off the stack and assigns it to the current hash
		  assignToHash: function assignToHash(key) {
		    var value = this.popStack(),
		        context = undefined,
		        type = undefined,
		        id = undefined;

		    if (this.trackIds) {
		      id = this.popStack();
		    }
		    if (this.stringParams) {
		      type = this.popStack();
		      context = this.popStack();
		    }

		    var hash = this.hash;
		    if (context) {
		      hash.contexts[key] = context;
		    }
		    if (type) {
		      hash.types[key] = type;
		    }
		    if (id) {
		      hash.ids[key] = id;
		    }
		    hash.values[key] = value;
		  },

		  pushId: function pushId(type, name, child) {
		    if (type === 'BlockParam') {
		      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
		    } else if (type === 'PathExpression') {
		      this.pushString(name);
		    } else if (type === 'SubExpression') {
		      this.pushStackLiteral('true');
		    } else {
		      this.pushStackLiteral('null');
		    }
		  },

		  // HELPERS

		  compiler: JavaScriptCompiler,

		  compileChildren: function compileChildren(environment, options) {
		    var children = environment.children,
		        child = undefined,
		        compiler = undefined;

		    for (var i = 0, l = children.length; i < l; i++) {
		      child = children[i];
		      compiler = new this.compiler(); // eslint-disable-line new-cap

		      var existing = this.matchExistingProgram(child);

		      if (existing == null) {
		        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
		        var index = this.context.programs.length;
		        child.index = index;
		        child.name = 'program' + index;
		        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
		        this.context.decorators[index] = compiler.decorators;
		        this.context.environments[index] = child;

		        this.useDepths = this.useDepths || compiler.useDepths;
		        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
		        child.useDepths = this.useDepths;
		        child.useBlockParams = this.useBlockParams;
		      } else {
		        child.index = existing.index;
		        child.name = 'program' + existing.index;

		        this.useDepths = this.useDepths || existing.useDepths;
		        this.useBlockParams = this.useBlockParams || existing.useBlockParams;
		      }
		    }
		  },
		  matchExistingProgram: function matchExistingProgram(child) {
		    for (var i = 0, len = this.context.environments.length; i < len; i++) {
		      var environment = this.context.environments[i];
		      if (environment && environment.equals(child)) {
		        return environment;
		      }
		    }
		  },

		  programExpression: function programExpression(guid) {
		    var child = this.environment.children[guid],
		        programParams = [child.index, 'data', child.blockParams];

		    if (this.useBlockParams || this.useDepths) {
		      programParams.push('blockParams');
		    }
		    if (this.useDepths) {
		      programParams.push('depths');
		    }

		    return 'container.program(' + programParams.join(', ') + ')';
		  },

		  useRegister: function useRegister(name) {
		    if (!this.registers[name]) {
		      this.registers[name] = true;
		      this.registers.list.push(name);
		    }
		  },

		  push: function push(expr) {
		    if (!(expr instanceof Literal)) {
		      expr = this.source.wrap(expr);
		    }

		    this.inlineStack.push(expr);
		    return expr;
		  },

		  pushStackLiteral: function pushStackLiteral(item) {
		    this.push(new Literal(item));
		  },

		  pushSource: function pushSource(source) {
		    if (this.pendingContent) {
		      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
		      this.pendingContent = undefined;
		    }

		    if (source) {
		      this.source.push(source);
		    }
		  },

		  replaceStack: function replaceStack(callback) {
		    var prefix = ['('],
		        stack = undefined,
		        createdStack = undefined,
		        usedLiteral = undefined;

		    /* istanbul ignore next */
		    if (!this.isInline()) {
		      throw new _exception2['default']('replaceStack on non-inline');
		    }

		    // We want to merge the inline statement into the replacement statement via ','
		    var top = this.popStack(true);

		    if (top instanceof Literal) {
		      // Literals do not need to be inlined
		      stack = [top.value];
		      prefix = ['(', stack];
		      usedLiteral = true;
		    } else {
		      // Get or create the current stack name for use by the inline
		      createdStack = true;
		      var _name = this.incrStack();

		      prefix = ['((', this.push(_name), ' = ', top, ')'];
		      stack = this.topStack();
		    }

		    var item = callback.call(this, stack);

		    if (!usedLiteral) {
		      this.popStack();
		    }
		    if (createdStack) {
		      this.stackSlot--;
		    }
		    this.push(prefix.concat(item, ')'));
		  },

		  incrStack: function incrStack() {
		    this.stackSlot++;
		    if (this.stackSlot > this.stackVars.length) {
		      this.stackVars.push('stack' + this.stackSlot);
		    }
		    return this.topStackName();
		  },
		  topStackName: function topStackName() {
		    return 'stack' + this.stackSlot;
		  },
		  flushInline: function flushInline() {
		    var inlineStack = this.inlineStack;
		    this.inlineStack = [];
		    for (var i = 0, len = inlineStack.length; i < len; i++) {
		      var entry = inlineStack[i];
		      /* istanbul ignore if */
		      if (entry instanceof Literal) {
		        this.compileStack.push(entry);
		      } else {
		        var stack = this.incrStack();
		        this.pushSource([stack, ' = ', entry, ';']);
		        this.compileStack.push(stack);
		      }
		    }
		  },
		  isInline: function isInline() {
		    return this.inlineStack.length;
		  },

		  popStack: function popStack(wrapped) {
		    var inline = this.isInline(),
		        item = (inline ? this.inlineStack : this.compileStack).pop();

		    if (!wrapped && item instanceof Literal) {
		      return item.value;
		    } else {
		      if (!inline) {
		        /* istanbul ignore next */
		        if (!this.stackSlot) {
		          throw new _exception2['default']('Invalid stack pop');
		        }
		        this.stackSlot--;
		      }
		      return item;
		    }
		  },

		  topStack: function topStack() {
		    var stack = this.isInline() ? this.inlineStack : this.compileStack,
		        item = stack[stack.length - 1];

		    /* istanbul ignore if */
		    if (item instanceof Literal) {
		      return item.value;
		    } else {
		      return item;
		    }
		  },

		  contextName: function contextName(context) {
		    if (this.useDepths && context) {
		      return 'depths[' + context + ']';
		    } else {
		      return 'depth' + context;
		    }
		  },

		  quotedString: function quotedString(str) {
		    return this.source.quotedString(str);
		  },

		  objectLiteral: function objectLiteral(obj) {
		    return this.source.objectLiteral(obj);
		  },

		  aliasable: function aliasable(name) {
		    var ret = this.aliases[name];
		    if (ret) {
		      ret.referenceCount++;
		      return ret;
		    }

		    ret = this.aliases[name] = this.source.wrap(name);
		    ret.aliasable = true;
		    ret.referenceCount = 1;

		    return ret;
		  },

		  setupHelper: function setupHelper(paramSize, name, blockHelper) {
		    var params = [],
		        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
		    var foundHelper = this.nameLookup('helpers', name, 'helper'),
		        callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : (container.nullContext || {})');

		    return {
		      params: params,
		      paramsInit: paramsInit,
		      name: foundHelper,
		      callParams: [callContext].concat(params)
		    };
		  },

		  setupParams: function setupParams(helper, paramSize, params) {
		    var options = {},
		        contexts = [],
		        types = [],
		        ids = [],
		        objectArgs = !params,
		        param = undefined;

		    if (objectArgs) {
		      params = [];
		    }

		    options.name = this.quotedString(helper);
		    options.hash = this.popStack();

		    if (this.trackIds) {
		      options.hashIds = this.popStack();
		    }
		    if (this.stringParams) {
		      options.hashTypes = this.popStack();
		      options.hashContexts = this.popStack();
		    }

		    var inverse = this.popStack(),
		        program = this.popStack();

		    // Avoid setting fn and inverse if neither are set. This allows
		    // helpers to do a check for `if (options.fn)`
		    if (program || inverse) {
		      options.fn = program || 'container.noop';
		      options.inverse = inverse || 'container.noop';
		    }

		    // The parameters go on to the stack in order (making sure that they are evaluated in order)
		    // so we need to pop them off the stack in reverse order
		    var i = paramSize;
		    while (i--) {
		      param = this.popStack();
		      params[i] = param;

		      if (this.trackIds) {
		        ids[i] = this.popStack();
		      }
		      if (this.stringParams) {
		        types[i] = this.popStack();
		        contexts[i] = this.popStack();
		      }
		    }

		    if (objectArgs) {
		      options.args = this.source.generateArray(params);
		    }

		    if (this.trackIds) {
		      options.ids = this.source.generateArray(ids);
		    }
		    if (this.stringParams) {
		      options.types = this.source.generateArray(types);
		      options.contexts = this.source.generateArray(contexts);
		    }

		    if (this.options.data) {
		      options.data = 'data';
		    }
		    if (this.useBlockParams) {
		      options.blockParams = 'blockParams';
		    }
		    return options;
		  },

		  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
		    var options = this.setupParams(helper, paramSize, params);
		    options.loc = JSON.stringify(this.source.currentLocation);
		    options = this.objectLiteral(options);
		    if (useRegister) {
		      this.useRegister('options');
		      params.push('options');
		      return ['options=', options];
		    } else if (params) {
		      params.push(options);
		      return '';
		    } else {
		      return options;
		    }
		  }
		};

		(function () {
		  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

		  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

		  for (var i = 0, l = reservedWords.length; i < l; i++) {
		    compilerWords[reservedWords[i]] = true;
		  }
		})();

		/**
		 * @deprecated May be removed in the next major version
		 */
		JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
		  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
		};

		function strictLookup(requireTerminal, compiler, parts, i, type) {
		  var stack = compiler.popStack(),
		      len = parts.length;
		  if (requireTerminal) {
		    len--;
		  }

		  for (; i < len; i++) {
		    stack = compiler.nameLookup(stack, parts[i], type);
		  }

		  if (requireTerminal) {
		    return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ', ', JSON.stringify(compiler.source.currentLocation), ' )'];
		  } else {
		    return stack;
		  }
		}

		exports['default'] = JavaScriptCompiler;
		module.exports = exports['default'];
		
	} (javascriptCompiler, javascriptCompiler.exports));

	var javascriptCompilerExports = javascriptCompiler.exports;

	(function (module, exports) {

		exports.__esModule = true;
		// istanbul ignore next

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _handlebarsRuntime = handlebars_runtimeExports;

		var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);

		// Compiler imports

		var _handlebarsCompilerAst = astExports;

		var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);

		var _handlebarsCompilerBase = base;

		var _handlebarsCompilerCompiler = compiler;

		var _handlebarsCompilerJavascriptCompiler = javascriptCompilerExports;

		var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);

		var _handlebarsCompilerVisitor = visitorExports;

		var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);

		var _handlebarsNoConflict = noConflictExports;

		var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

		var _create = _handlebarsRuntime2['default'].create;
		function create() {
		  var hb = _create();

		  hb.compile = function (input, options) {
		    return _handlebarsCompilerCompiler.compile(input, options, hb);
		  };
		  hb.precompile = function (input, options) {
		    return _handlebarsCompilerCompiler.precompile(input, options, hb);
		  };

		  hb.AST = _handlebarsCompilerAst2['default'];
		  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
		  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
		  hb.Parser = _handlebarsCompilerBase.parser;
		  hb.parse = _handlebarsCompilerBase.parse;
		  hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;

		  return hb;
		}

		var inst = create();
		inst.create = create;

		_handlebarsNoConflict2['default'](inst);

		inst.Visitor = _handlebarsCompilerVisitor2['default'];

		inst['default'] = inst;

		exports['default'] = inst;
		module.exports = exports['default'];
		
	} (handlebars$1, handlebars$1.exports));

	var handlebarsExports = handlebars$1.exports;
	var handlebars = /*@__PURE__*/getDefaultExportFromCjs(handlebarsExports);

	var ValueConvertMethods = {
	    evalExpression(s) {
	        if (typeof (s) !== 'string') {
	            return s;
	        }

	        return Compile$1(s)(this.memory);
	    },

	    renderString(s) {
	        if (typeof (s) !== 'string') {
	            return '';
	        }
	        return handlebars.render(s, this.memory);
	    },
	};

	var RunMethods = {
	    startGroup(groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        this.getTreeGroup(groupName).start();
	        return this;
	    },

	    start() {
	        var argumentsCount = arguments.length;
	        switch (argumentsCount) {
	            case 0:
	                // Run all event sheets in default group
	                this.getTreeGroup(this.defaultTreeGroupName).start();
	                break;

	            case 1:
	                // Start an event sheet by name (arg[0]), 
	                // in default group,
	                // will check condition
	                var name = arguments[0];
	                if (this.hasTreeGroup(name)) {
	                    this.getTreeGroup(name).start();
	                } else {
	                    this.getTreeGroup(this.defaultTreeGroupName).startTree(name);
	                }
	                break;

	            case 2:
	                // Start an event sheet by name (arg[0]),
	                // in a group by name (arg[1]), will check condition, or
	                // in default group, ignore condition checking (arg[1])
	                var title = arguments[0];
	                var ignoreCondition, groupName;
	                if (typeof (arguments[1]) === 'string') {
	                    ignoreCondition = true;
	                    groupName = arguments[1];
	                } else {
	                    ignoreCondition = arguments[1];
	                    groupName = this.defaultTreeGroupName;
	                }
	                this.getTreeGroup(groupName).startTree(title, ignoreCondition);
	                break;

	            default:
	                // Start an event sheet by name (arg[0]), 
	                // in a group by name (arg[1]), 
	                // can ignore condition checking (arg[2])
	                var title = arguments[0];
	                var groupName = arguments[1];
	                var ignoreCondition = arguments[2];
	                this.getTreeGroup(groupName).startTree(title, ignoreCondition);
	                break;
	        }
	        return this;
	    },

	    continue(groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        this.getTreeGroup(groupName).continue();
	        return this;
	    },
	};

	var StopMethods = {
	    stopGroup(groupName) {
	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }
	        this.getTreeGroup(groupName).stop();
	        return this;
	    },

	    stop(groupName) {
	        this.stopGroup(groupName);
	        return this;
	    },

	    stopAllGroups() {
	        for (var name in this.treeGroups) {
	            this.treeGroups[name].stop();
	        }
	        return this;
	    },

	    stopAll() {
	        this.stopAllGroups();
	        return this;
	    }
	};

	var BindEventMethods = {
	    startGroupByEvent(eventName, groupName, once) {
	        if (IsPlainObject(eventName)) {
	            var config = eventName;
	            eventName = config.eventName;
	            groupName = config.groupName;
	            once = config.once;
	        }

	        if (once === undefined) {
	            once = false;
	        }
	        var callback = function () {
	            this.startGroup(groupName);
	        };

	        if (!once) {
	            this.on(eventName, callback, this);
	        } else {
	            this.once(eventName, callback, this);
	        }

	        return this;
	    },


	};

	var RoundCounterMethods = {
	    getRoundCounter() {
	        return this.blackboard.getCurrentTime();
	    },

	    setRoundCounter(value) {
	        this.blackboard.setCurrentTime(value);
	        return this;
	    },

	    updateRoundCounter(value) {
	        if (value === undefined) {
	            this.blackboard.incCurrentTime(1);
	        } else {
	            this.blackboard.setCurrentTime(value);
	        }

	        return this;
	    }
	};

	var Methods$3 = {};

	Object.assign(
	    Methods$3,
	    PauseEventSheetMethods$1,
	    TreeMethods,
	    AddTreeMethods,
	    RemoveTreeMethods,
	    TreeActiveStateMethods,
	    SaveLoadTreesMethods,
	    DataMethods$3,
	    StateMethods,
	    ValueConvertMethods,
	    RunMethods,
	    StopMethods,
	    BindEventMethods,
	    RoundCounterMethods,
	);

	BehaviorTree.setStartIDValue(0);

	class EventSheetManager extends EventEmitter$2 {
	    constructor(scene, config) {
	        if (IsPlainObject(scene) && (config === undefined)) {
	            config = scene;
	            scene = undefined;
	        }

	        if (config === undefined) {
	            config = {};
	        }

	        super();

	        this.isShutdown = false;
	        this.scene = scene;

	        var {
	            commandExecutor,
	            parallel = false,
	        } = config;

	        this.defaultTreeGroupName = '_';

	        this.setCommandExecutor(commandExecutor);
	        this.parallel = parallel;

	        this.blackboard = new Blackboard({
	            currentTimeKey: '$roundCounter'
	        });
	        this.blackboard.eventSheetManager = this; // For TaskAction

	        this.treeGroups = {};

	        this.setRoundCounter(0);

	        this.boot();
	    }

	    boot() {
	    }

	    shutdown(fromScene) {
	        if (this.isShutdown) {
	            return;
	        }

	        if (this.commandExecutor && this.commandExecutor.destroy) {
	            this.commandExecutor.destroy(fromScene);
	        }

	        for (var name in this.treeGroups) {
	            this.treeGroups[name].destroy();
	        }

	        this.blackboard.destroy();

	        super.shutdown();

	        this.scene = undefined;
	        this.commandExecutor = undefined;
	        this.blackboard = undefined;
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


	    get memory() {
	        return this.blackboard.getGlobalMemory();
	    }

	    get $roundCounter() {
	        return this.getRoundCounter();
	    }

	    set $roundCounter(value) {
	        this.setRoundCounter(value);
	    }

	    setCommandExecutor(commandExecutor) {
	        this.commandExecutor = commandExecutor;
	        return this;
	    }

	}

	Object.assign(
	    EventSheetManager.prototype,
	    Methods$3
	);

	const RoundIdle = 0;
	const RoundRun = 1;
	const RoundComplete = 2;

	const PropertyTable = {
	    'groupName': { defaultValue: '_', rewritable: true },
	    'parallel': { defaultValue: false, rewritable: true },
	    'active': { defaultValue: true, rewritable: true },
	    'once': { defaultValue: false, rewritable: true },
	    'roundState': { defaultValue: RoundIdle, rewritable: false },
	    'conditionPassed': { defaultValue: undefined, rewritable: false },
	};

	class EventSheet extends BehaviorTree {
	    constructor(eventSheetManager, config) {
	        if (config === undefined) {
	            config = {};
	        }

	        var { condition = true } = config;
	        delete config.condition;

	        var properties = config.properties;
	        delete config.properties;

	        super(config);

	        // Store default properties
	        for (var propertyKey in PropertyTable) {
	            var { defaultValue, rewritable } = PropertyTable[propertyKey];

	            this.wrapProperty(propertyKey);

	            if (rewritable) {
	                if (propertyKey in properties) {
	                    this[propertyKey] = properties[propertyKey];
	                    delete properties[propertyKey];
	                } else {
	                    this[propertyKey] = defaultValue;
	                }
	            } else {
	                this[propertyKey] = defaultValue;
	            }

	        }

	        // Store custom properties
	        for (var propertyKey in properties) {
	            this.wrapProperty(propertyKey);
	            this[propertyKey] = properties[propertyKey];
	        }

	        // Store references
	        var groupName = this.groupName;
	        this.eventSheetManager = eventSheetManager;
	        this.blackboard = eventSheetManager.blackboard;
	        this.setTreeGroup(groupName);

	        var root = new IfSelector({
	            title: this.title,
	            expression: condition,
	            conditionEvalBreak: true   // Return RUNNING instead of SUCCESS for condition eval
	        });
	        this.setRoot(root);
	    }

	    wrapProperty(key) {
	        var treeProperties = this.properties;
	        Object.defineProperty(this, key, {
	            get() {
	                return treeProperties[key];
	            },
	            set(newValue) {
	                treeProperties[key] = newValue;
	            },
	            enumerable: true,
	            configurable: true,
	        });

	        return this;
	    }

	    setTreeGroup(groupName) {
	        this.groupName = groupName;
	        this.eventSheetGroup = this.eventSheetManager.getTreeGroup(groupName);
	        return this;
	    }

	    setActive(active) {
	        if (active === undefined) {
	            active = true;
	        }
	        this.active = active;
	        return this;
	    }

	    get roundComplete() {
	        return this.roundState === RoundComplete;
	    }

	    set roundComplete(value) {
	        this.roundState = (value) ? RoundComplete : RoundRun;
	    }

	    setConditionEnable(enable = true) {
	        var selectChildIndex = (enable) ? undefined : 0;
	        this.root.setSelectChildIndex(selectChildIndex);
	        return this;
	    }

	    start(blackboard, target) {
	        if (this.roundState === RoundRun) {
	            return false;
	        }

	        var startFromTop = (this.getState(blackboard) !== RUNNING$1);
	        if (startFromTop) {
	            this.resetState(blackboard);
	        }

	        this.roundState = RoundRun;

	        // First tick, condition-eval
	        super.tick(blackboard, target);

	        if (startFromTop) {
	            var nodeMemory = this.root.getNodeMemory(this.ticker);
	            this.conditionPassed = (nodeMemory.$runningChild === 0);
	        }

	        return true;
	    }

	    tick(blackboard, target) {
	        var state = super.tick(blackboard, target);

	        if (state !== RUNNING$1) {
	            // Will remove from pendingTrees
	            this.roundState = RoundComplete;

	            if (this.conditionPassed && this.properties.once) {
	                this.setActive(false);
	            }
	        }

	        return state;
	    }

	    abort(blackboard, target) {
	        this.roundState = RoundIdle;

	        super.abort(blackboard, target);
	    }
	}

	var marked_min = {exports: {}};

	/**
	 * marked v5.0.2 - a markdown parser
	 * Copyright (c) 2011-2023, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/markedjs/marked
	 */

	(function (module, exports) {
		!function(e,t){t(exports);}(commonjsGlobal,function(r){function i(e,t){for(var u=0;u<t.length;u++){var n=t[u];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,function(e){e=function(e,t){if("object"!=typeof e||null===e)return e;var u=e[Symbol.toPrimitive];if(void 0===u)return ("string"===t?String:Number)(e);u=u.call(e,t||"default");if("object"!=typeof u)return u;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return "symbol"==typeof e?e:String(e)}(n.key),n);}}function d(){return (d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var u,n=arguments[t];for(u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u]);}return e}).apply(this,arguments)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var u=0,n=new Array(t);u<t;u++)n[u]=e[u];return n}function D(e,t){var u,n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return (n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){var u;if(e)return "string"==typeof e?s(e,t):"Map"===(u="Object"===(u=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:u)||"Set"===u?Array.from(e):"Arguments"===u||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u)?s(e,t):void 0}(e))||t&&e&&"number"==typeof e.length)return n&&(e=n),u=0,function(){return u>=e.length?{done:!0}:{done:!1,value:e[u++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function e(){return {async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}r.defaults=e();function u(e){return t[e]}var n=/[&<>"']/,a=new RegExp(n.source,"g"),o=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,l=new RegExp(o.source,"g"),t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function A(e,t){if(t){if(n.test(e))return e.replace(a,u)}else if(o.test(e))return e.replace(l,u);return e}var c=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function m(e){return e.replace(c,function(e,t){return "colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}var p=/(^|[^\[])\^/g;function h(u,e){u="string"==typeof u?u:u.source,e=e||"";var n={replace:function(e,t){return t=(t=t.source||t).replace(p,"$1"),u=u.replace(e,t),n},getRegex:function(){return new RegExp(u,e)}};return n}var j=/[^\w:]/g,Z=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function f(e,t,u){if(e){try{n=decodeURIComponent(m(u)).replace(j,"").toLowerCase();}catch(e){return null}if(0===n.indexOf("javascript:")||0===n.indexOf("vbscript:")||0===n.indexOf("data:"))return null}var n;t&&!Z.test(u)&&(e=u,g[" "+(n=t)]||(O.test(n)?g[" "+n]=n+"/":g[" "+n]=C(n,"/",!0)),t=-1===(n=g[" "+n]).indexOf(":"),u="//"===e.substring(0,2)?t?e:n.replace(q,"$1")+e:"/"===e.charAt(0)?t?e:n.replace(P,"$1")+e:n+e);try{u=encodeURI(u).replace(/%25/g,"%");}catch(e){return null}return u}var g={},O=/^[^:]+:\/*[^/]*$/,q=/^([^:]+:)[\s\S]*$/,P=/^([^:]+:\/*[^/]*)[\s\S]*$/;var F={exec:function(){}};function k(e,t){var u=e.replace(/\|/g,function(e,t,u){for(var n=!1,r=t;0<=--r&&"\\"===u[r];)n=!n;return n?"|":" |"}).split(/ \|/),n=0;if(u[0].trim()||u.shift(),0<u.length&&!u[u.length-1].trim()&&u.pop(),u.length>t)u.splice(t);else for(;u.length<t;)u.push("");for(;n<u.length;n++)u[n]=u[n].trim().replace(/\\\|/g,"|");return u}function C(e,t,u){var n=e.length;if(0===n)return "";for(var r=0;r<n;){var i=e.charAt(n-r-1);if((i!==t||u)&&(i===t||!u))break;r++;}return e.slice(0,n-r)}function E(e,t){if(t<1)return "";for(var u="";1<t;)1&t&&(u+=e),t>>=1,e+=e;return u+e}function x(e,t,u,n){var r=t.href,t=t.title?A(t.title):null,i=e[1].replace(/\\([\[\]])/g,"$1");return "!"!==e[0].charAt(0)?(n.state.inLink=!0,e={type:"link",raw:u,href:r,title:t,text:i,tokens:n.inlineTokens(i)},n.state.inLink=!1,e):{type:"image",raw:u,href:r,title:t,text:A(i)}}var b=function(){function e(e){this.options=e||r.defaults;}var t=e.prototype;return t.space=function(e){e=this.rules.block.newline.exec(e);if(e&&0<e[0].length)return {type:"space",raw:e[0]}},t.code=function(e){var t,e=this.rules.block.code.exec(e);if(e)return t=e[0].replace(/^ {1,4}/gm,""),{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:C(t,"\n")}},t.fences=function(e){var t,u,n,r,e=this.rules.block.fences.exec(e);if(e)return t=e[0],u=t,n=e[3]||"",u=null===(u=t.match(/^(\s+)(?:```)/))?n:(r=u[1],n.split("\n").map(function(e){var t=e.match(/^\s+/);return null!==t&&t[0].length>=r.length?e.slice(r.length):e}).join("\n")),{type:"code",raw:t,lang:e[2]&&e[2].trim().replace(this.rules.inline._escapes,"$1"),text:u}},t.heading=function(e){var t,u,e=this.rules.block.heading.exec(e);if(e)return t=e[2].trim(),/#$/.test(t)&&(u=C(t,"#"),!this.options.pedantic&&u&&!/ $/.test(u)||(t=u.trim())),{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}},t.hr=function(e){e=this.rules.block.hr.exec(e);if(e)return {type:"hr",raw:e[0]}},t.blockquote=function(e){var t,u,n,e=this.rules.block.blockquote.exec(e);if(e)return t=e[0].replace(/^ *>[ \t]?/gm,""),u=this.lexer.state.top,this.lexer.state.top=!0,n=this.lexer.blockTokens(t),this.lexer.state.top=u,{type:"blockquote",raw:e[0],tokens:n,text:t}},t.list=function(e){var t=this.rules.block.list.exec(e);if(t){var u,n,r,i,s,a,o,l,D,c,p,h=1<(g=t[1].trim()).length,f={type:"list",raw:"",ordered:h,start:h?+g.slice(0,-1):"",loose:!1,items:[]},g=h?"\\d{1,9}\\"+g.slice(-1):"\\"+g;this.options.pedantic&&(g=h?g:"[*+-]");for(var F=new RegExp("^( {0,3}"+g+")((?:[\t ][^\\n]*)?(?:\\n|$))");e&&(p=!1,t=F.exec(e))&&!this.rules.block.hr.test(e);){if(u=t[0],e=e.substring(u.length),o=t[2].split("\n",1)[0].replace(/^\t+/,function(e){return " ".repeat(3*e.length)}),l=e.split("\n",1)[0],this.options.pedantic?(i=2,c=o.trimLeft()):(i=t[2].search(/[^ ]/),c=o.slice(i=4<i?1:i),i+=t[1].length),s=!1,!o&&/^ *$/.test(l)&&(u+=l+"\n",e=e.substring(l.length+1),p=!0),!p)for(var d=new RegExp("^ {0,"+Math.min(3,i-1)+"}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))"),A=new RegExp("^ {0,"+Math.min(3,i-1)+"}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"),k=new RegExp("^ {0,"+Math.min(3,i-1)+"}(?:```|~~~)"),C=new RegExp("^ {0,"+Math.min(3,i-1)+"}#");e&&(l=D=e.split("\n",1)[0],this.options.pedantic&&(l=l.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!k.test(l))&&!C.test(l)&&!d.test(l)&&!A.test(e);){if(l.search(/[^ ]/)>=i||!l.trim())c+="\n"+l.slice(i);else {if(s)break;if(4<=o.search(/[^ ]/))break;if(k.test(o))break;if(C.test(o))break;if(A.test(o))break;c+="\n"+l;}s||l.trim()||(s=!0),u+=D+"\n",e=e.substring(D.length+1),o=l.slice(i);}f.loose||(a?f.loose=!0:/\n *\n *$/.test(u)&&(a=!0)),this.options.gfm&&(n=/^\[[ xX]\] /.exec(c))&&(r="[ ] "!==n[0],c=c.replace(/^\[[ xX]\] +/,"")),f.items.push({type:"list_item",raw:u,task:!!n,checked:r,loose:!1,text:c}),f.raw+=u;}f.items[f.items.length-1].raw=u.trimRight(),f.items[f.items.length-1].text=c.trimRight(),f.raw=f.raw.trimRight();for(var E,m=f.items.length,x=0;x<m;x++)this.lexer.state.top=!1,f.items[x].tokens=this.lexer.blockTokens(f.items[x].text,[]),f.loose||(E=0<(E=f.items[x].tokens.filter(function(e){return "space"===e.type})).length&&E.some(function(e){return /\n.*\n/.test(e.raw)}),f.loose=E);if(f.loose)for(x=0;x<m;x++)f.items[x].loose=!0;return f}},t.html=function(e){var t,e=this.rules.block.html.exec(e);if(e)return t={type:"html",block:!0,raw:e[0],pre:!this.options.sanitizer&&("pre"===e[1]||"script"===e[1]||"style"===e[1]),text:e[0]},this.options.sanitize&&(e=this.options.sanitizer?this.options.sanitizer(e[0]):A(e[0]),t.type="paragraph",t.text=e,t.tokens=this.lexer.inline(e)),t},t.def=function(e){var t,u,n,e=this.rules.block.def.exec(e);if(e)return t=e[1].toLowerCase().replace(/\s+/g," "),u=e[2]?e[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",n=e[3]&&e[3].substring(1,e[3].length-1).replace(this.rules.inline._escapes,"$1"),{type:"def",tag:t,raw:e[0],href:u,title:n}},t.table=function(e){e=this.rules.block.table.exec(e);if(e){var t={type:"table",header:k(e[1]).map(function(e){return {text:e}}),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:e[3]&&e[3].trim()?e[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(t.header.length===t.align.length){t.raw=e[0];for(var u,n,r,i=t.align.length,s=0;s<i;s++)/^ *-+: *$/.test(t.align[s])?t.align[s]="right":/^ *:-+: *$/.test(t.align[s])?t.align[s]="center":/^ *:-+ *$/.test(t.align[s])?t.align[s]="left":t.align[s]=null;for(i=t.rows.length,s=0;s<i;s++)t.rows[s]=k(t.rows[s],t.header.length).map(function(e){return {text:e}});for(i=t.header.length,u=0;u<i;u++)t.header[u].tokens=this.lexer.inline(t.header[u].text);for(i=t.rows.length,u=0;u<i;u++)for(r=t.rows[u],n=0;n<r.length;n++)r[n].tokens=this.lexer.inline(r[n].text);return t}}},t.lheading=function(e){e=this.rules.block.lheading.exec(e);if(e)return {type:"heading",raw:e[0],depth:"="===e[2].charAt(0)?1:2,text:e[1],tokens:this.lexer.inline(e[1])}},t.paragraph=function(e){var t,e=this.rules.block.paragraph.exec(e);if(e)return t="\n"===e[1].charAt(e[1].length-1)?e[1].slice(0,-1):e[1],{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}},t.text=function(e){e=this.rules.block.text.exec(e);if(e)return {type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}},t.escape=function(e){e=this.rules.inline.escape.exec(e);if(e)return {type:"escape",raw:e[0],text:A(e[1])}},t.tag=function(e){e=this.rules.inline.tag.exec(e);if(e)return !this.lexer.state.inLink&&/^<a /i.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):A(e[0]):e[0]}},t.link=function(e){e=this.rules.inline.link.exec(e);if(e){var t=e[2].trim();if(!this.options.pedantic&&/^</.test(t)){if(!/>$/.test(t))return;var u=C(t.slice(0,-1),"\\");if((t.length-u.length)%2==0)return}else {u=function(e,t){if(-1!==e.indexOf(t[1]))for(var u=e.length,n=0,r=0;r<u;r++)if("\\"===e[r])r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&--n<0)return r;return -1}(e[2],"()");-1<u&&(r=(0===e[0].indexOf("!")?5:4)+e[1].length+u,e[2]=e[2].substring(0,u),e[0]=e[0].substring(0,r).trim(),e[3]="");}var n,u=e[2],r="";return this.options.pedantic?(n=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(u))&&(u=n[1],r=n[3]):r=e[3]?e[3].slice(1,-1):"",u=u.trim(),x(e,{href:(u=/^</.test(u)?this.options.pedantic&&!/>$/.test(t)?u.slice(1):u.slice(1,-1):u)&&u.replace(this.rules.inline._escapes,"$1"),title:r&&r.replace(this.rules.inline._escapes,"$1")},e[0],this.lexer)}},t.reflink=function(e,t){var u;if(u=(u=this.rules.inline.reflink.exec(e))||this.rules.inline.nolink.exec(e))return (e=t[(e=(u[2]||u[1]).replace(/\s+/g," ")).toLowerCase()])?x(u,e,u[0],this.lexer):{type:"text",raw:t=u[0].charAt(0),text:t}},t.emStrong=function(e,t,u){void 0===u&&(u="");var n=this.rules.inline.emStrong.lDelim.exec(e);if(n&&(!n[3]||!u.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/))){var r=n[1]||n[2]||"";if(!r||""===u||this.rules.inline.punctuation.exec(u)){var i=n[0].length-1,s=i,a=0,o="*"===n[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(o.lastIndex=0,t=t.slice(-1*e.length+i);null!=(n=o.exec(t));){var l,D=n[1]||n[2]||n[3]||n[4]||n[5]||n[6];if(D)if(l=D.length,n[3]||n[4])s+=l;else if((n[5]||n[6])&&i%3&&!((i+l)%3))a+=l;else if(!(0<(s-=l)))return l=Math.min(l,l+s+a),D=e.slice(0,i+n.index+(n[0].length-D.length)+l),Math.min(i,l)%2?(l=D.slice(1,-1),{type:"em",raw:D,text:l,tokens:this.lexer.inlineTokens(l)}):(l=D.slice(2,-2),{type:"strong",raw:D,text:l,tokens:this.lexer.inlineTokens(l)})}}}},t.codespan=function(e){var t,u,n,e=this.rules.inline.code.exec(e);if(e)return n=e[2].replace(/\n/g," "),t=/[^ ]/.test(n),u=/^ /.test(n)&&/ $/.test(n),n=A(n=t&&u?n.substring(1,n.length-1):n,!0),{type:"codespan",raw:e[0],text:n}},t.br=function(e){e=this.rules.inline.br.exec(e);if(e)return {type:"br",raw:e[0]}},t.del=function(e){e=this.rules.inline.del.exec(e);if(e)return {type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}},t.autolink=function(e,t){var u,e=this.rules.inline.autolink.exec(e);if(e)return t="@"===e[2]?"mailto:"+(u=A(this.options.mangle?t(e[1]):e[1])):u=A(e[1]),{type:"link",raw:e[0],text:u,href:t,tokens:[{type:"text",raw:u,text:u}]}},t.url=function(e,t){var u,n,r,i;if(u=this.rules.inline.url.exec(e)){if("@"===u[2])r="mailto:"+(n=A(this.options.mangle?t(u[0]):u[0]));else {for(;i=u[0],u[0]=this.rules.inline._backpedal.exec(u[0])[0],i!==u[0];);n=A(u[0]),r="www."===u[1]?"http://"+u[0]:u[0];}return {type:"link",raw:u[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}},t.inlineText=function(e,t){e=this.rules.inline.text.exec(e);if(e)return t=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):A(e[0]):e[0]:A(this.options.smartypants?t(e[0]):e[0]),{type:"text",raw:e[0],text:t}},e}(),B={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:F,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/},w=(B.def=h(B.def).replace("label",B._label).replace("title",B._title).getRegex(),B.bullet=/(?:[*+-]|\d{1,9}[.)])/,B.listItemStart=h(/^( *)(bull) */).replace("bull",B.bullet).getRegex(),B.list=h(B.list).replace(/bull/g,B.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+B.def.source+")").getRegex(),B._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",B._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,B.html=h(B.html,"i").replace("comment",B._comment).replace("tag",B._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),B.paragraph=h(B._paragraph).replace("hr",B.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",B._tag).getRegex(),B.blockquote=h(B.blockquote).replace("paragraph",B.paragraph).getRegex(),B.normal=d({},B),B.gfm=d({},B.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),B.gfm.table=h(B.gfm.table).replace("hr",B.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",B._tag).getRegex(),B.gfm.paragraph=h(B._paragraph).replace("hr",B.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",B.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",B._tag).getRegex(),B.pedantic=d({},B.normal,{html:h("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",B._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:F,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:h(B.normal._paragraph).replace("hr",B.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",B.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()}),{escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:F,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:F,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/});function L(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function v(e){for(var t,u="",n=e.length,r=0;r<n;r++)t=e.charCodeAt(r),u+="&#"+(t=.5<Math.random()?"x"+t.toString(16):t)+";";return u}w._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",w.punctuation=h(w.punctuation).replace(/punctuation/g,w._punctuation).getRegex(),w.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,w.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g,w._comment=h(B._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),w.emStrong.lDelim=h(w.emStrong.lDelim).replace(/punct/g,w._punctuation).getRegex(),w.emStrong.rDelimAst=h(w.emStrong.rDelimAst,"g").replace(/punct/g,w._punctuation).getRegex(),w.emStrong.rDelimUnd=h(w.emStrong.rDelimUnd,"g").replace(/punct/g,w._punctuation).getRegex(),w._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,w._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,w._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,w.autolink=h(w.autolink).replace("scheme",w._scheme).replace("email",w._email).getRegex(),w._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,w.tag=h(w.tag).replace("comment",w._comment).replace("attribute",w._attribute).getRegex(),w._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,w._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,w._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,w.link=h(w.link).replace("label",w._label).replace("href",w._href).replace("title",w._title).getRegex(),w.reflink=h(w.reflink).replace("label",w._label).replace("ref",B._label).getRegex(),w.nolink=h(w.nolink).replace("ref",B._label).getRegex(),w.reflinkSearch=h(w.reflinkSearch,"g").replace("reflink",w.reflink).replace("nolink",w.nolink).getRegex(),w.normal=d({},w),w.pedantic=d({},w.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:h(/^!?\[(label)\]\((.*?)\)/).replace("label",w._label).getRegex(),reflink:h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",w._label).getRegex()}),w.gfm=d({},w.normal,{escape:h(w.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/}),w.gfm.url=h(w.gfm.url,"i").replace("email",w.gfm._extended_email).getRegex(),w.breaks=d({},w.gfm,{br:h(w.br).replace("{2,}","*").getRegex(),text:h(w.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var y=function(){function u(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||r.defaults,this.options.tokenizer=this.options.tokenizer||new b,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,(this.tokenizer.lexer=this).inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};e={block:B.normal,inline:w.normal};this.options.pedantic?(e.block=B.pedantic,e.inline=w.pedantic):this.options.gfm&&(e.block=B.gfm,this.options.breaks?e.inline=w.breaks:e.inline=w.gfm),this.tokenizer.rules=e;}u.lex=function(e,t){return new u(t).lex(e)},u.lexInline=function(e,t){return new u(t).inlineTokens(e)};var e,t,n=u.prototype;return n.lex=function(e){var t;for(e=e.replace(/\r\n|\r/g,"\n"),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens},n.blockTokens=function(r,i){var s,a,o,l,D=this;for(void 0===i&&(i=[]),r=this.options.pedantic?r.replace(/\t/g,"    ").replace(/^ +$/gm,""):r.replace(/^( *)(\t+)/gm,function(e,t,u){return t+"    ".repeat(u.length)});r;){var e=function(){if(D.options.extensions&&D.options.extensions.block&&D.options.extensions.block.some(function(e){return !!(s=e.call({lexer:D},r,i))&&(r=r.substring(s.raw.length),i.push(s),!0)}))return "continue";if(s=D.tokenizer.space(r))return r=r.substring(s.raw.length),1===s.raw.length&&0<i.length?i[i.length-1].raw+="\n":i.push(s),"continue";if(s=D.tokenizer.code(r))return r=r.substring(s.raw.length),!(a=i[i.length-1])||"paragraph"!==a.type&&"text"!==a.type?i.push(s):(a.raw+="\n"+s.raw,a.text+="\n"+s.text,D.inlineQueue[D.inlineQueue.length-1].src=a.text),"continue";if(s=D.tokenizer.fences(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.heading(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.hr(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.blockquote(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.list(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.html(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.def(r))return r=r.substring(s.raw.length),!(a=i[i.length-1])||"paragraph"!==a.type&&"text"!==a.type?D.tokens.links[s.tag]||(D.tokens.links[s.tag]={href:s.href,title:s.title}):(a.raw+="\n"+s.raw,a.text+="\n"+s.raw,D.inlineQueue[D.inlineQueue.length-1].src=a.text),"continue";if(s=D.tokenizer.table(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.lheading(r))return r=r.substring(s.raw.length),i.push(s),"continue";var t,u,n;if(o=r,D.options.extensions&&D.options.extensions.startBlock&&(t=1/0,u=r.slice(1),D.options.extensions.startBlock.forEach(function(e){"number"==typeof(n=e.call({lexer:this},u))&&0<=n&&(t=Math.min(t,n));}),t<1/0)&&0<=t&&(o=r.substring(0,t+1)),D.state.top&&(s=D.tokenizer.paragraph(o)))return a=i[i.length-1],l&&"paragraph"===a.type?(a.raw+="\n"+s.raw,a.text+="\n"+s.text,D.inlineQueue.pop(),D.inlineQueue[D.inlineQueue.length-1].src=a.text):i.push(s),l=o.length!==r.length,r=r.substring(s.raw.length),"continue";if(s=D.tokenizer.text(r))return r=r.substring(s.raw.length),(a=i[i.length-1])&&"text"===a.type?(a.raw+="\n"+s.raw,a.text+="\n"+s.text,D.inlineQueue.pop(),D.inlineQueue[D.inlineQueue.length-1].src=a.text):i.push(s),"continue";if(r){var e="Infinite loop on byte: "+r.charCodeAt(0);if(D.options.silent)return console.error(e),"break";throw new Error(e)}}();if("continue"!==e&&"break"===e)break}return this.state.top=!0,i},n.inline=function(e,t){return this.inlineQueue.push({src:e,tokens:t=void 0===t?[]:t}),t},n.inlineTokens=function(r,i){var s,a,o,e,l,D,c=this,p=(void 0===i&&(i=[]),r);if(this.tokens.links){var t=Object.keys(this.tokens.links);if(0<t.length)for(;null!=(e=this.tokenizer.rules.inline.reflinkSearch.exec(p));)t.includes(e[0].slice(e[0].lastIndexOf("[")+1,-1))&&(p=p.slice(0,e.index)+"["+E("a",e[0].length-2)+"]"+p.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));}for(;null!=(e=this.tokenizer.rules.inline.blockSkip.exec(p));)p=p.slice(0,e.index)+"["+E("a",e[0].length-2)+"]"+p.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(e=this.tokenizer.rules.inline.escapedEmSt.exec(p));)p=p.slice(0,e.index+e[0].length-2)+"++"+p.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;r;){var u=function(){if(l||(D=""),l=!1,c.options.extensions&&c.options.extensions.inline&&c.options.extensions.inline.some(function(e){return !!(s=e.call({lexer:c},r,i))&&(r=r.substring(s.raw.length),i.push(s),!0)}))return "continue";if(s=c.tokenizer.escape(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.tag(r))return r=r.substring(s.raw.length),(a=i[i.length-1])&&"text"===s.type&&"text"===a.type?(a.raw+=s.raw,a.text+=s.text):i.push(s),"continue";if(s=c.tokenizer.link(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.reflink(r,c.tokens.links))return r=r.substring(s.raw.length),(a=i[i.length-1])&&"text"===s.type&&"text"===a.type?(a.raw+=s.raw,a.text+=s.text):i.push(s),"continue";if(s=c.tokenizer.emStrong(r,p,D))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.codespan(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.br(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.del(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.autolink(r,v))return r=r.substring(s.raw.length),i.push(s),"continue";if(!c.state.inLink&&(s=c.tokenizer.url(r,v)))return r=r.substring(s.raw.length),i.push(s),"continue";var t,u,n;if(o=r,c.options.extensions&&c.options.extensions.startInline&&(t=1/0,u=r.slice(1),c.options.extensions.startInline.forEach(function(e){"number"==typeof(n=e.call({lexer:this},u))&&0<=n&&(t=Math.min(t,n));}),t<1/0)&&0<=t&&(o=r.substring(0,t+1)),s=c.tokenizer.inlineText(o,L))return r=r.substring(s.raw.length),"_"!==s.raw.slice(-1)&&(D=s.raw.slice(-1)),l=!0,(a=i[i.length-1])&&"text"===a.type?(a.raw+=s.raw,a.text+=s.text):i.push(s),"continue";if(r){var e="Infinite loop on byte: "+r.charCodeAt(0);if(c.options.silent)return console.error(e),"break";throw new Error(e)}}();if("continue"!==u&&"break"===u)break}return i},n=u,t=[{key:"rules",get:function(){return {block:B,inline:w}}}],(e=null)&&i(n.prototype,e),t&&i(n,t),Object.defineProperty(n,"prototype",{writable:!1}),u}(),_=function(){function e(e){this.options=e||r.defaults;}var t=e.prototype;return t.code=function(e,t,u){var n,t=(t||"").match(/\S*/)[0];return this.options.highlight&&null!=(n=this.options.highlight(e,t))&&n!==e&&(u=!0,e=n),e=e.replace(/\n$/,"")+"\n",t?'<pre><code class="'+this.options.langPrefix+A(t)+'">'+(u?e:A(e,!0))+"</code></pre>\n":"<pre><code>"+(u?e:A(e,!0))+"</code></pre>\n"},t.blockquote=function(e){return "<blockquote>\n"+e+"</blockquote>\n"},t.html=function(e,t){return e},t.heading=function(e,t,u,n){return this.options.headerIds?"<h"+t+' id="'+(this.options.headerPrefix+n.slug(u))+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},t.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},t.list=function(e,t,u){var n=t?"ol":"ul";return "<"+n+(t&&1!==u?' start="'+u+'"':"")+">\n"+e+"</"+n+">\n"},t.listitem=function(e){return "<li>"+e+"</li>\n"},t.checkbox=function(e){return "<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},t.paragraph=function(e){return "<p>"+e+"</p>\n"},t.table=function(e,t){return "<table>\n<thead>\n"+e+"</thead>\n"+(t=t&&"<tbody>"+t+"</tbody>")+"</table>\n"},t.tablerow=function(e){return "<tr>\n"+e+"</tr>\n"},t.tablecell=function(e,t){var u=t.header?"th":"td";return (t.align?"<"+u+' align="'+t.align+'">':"<"+u+">")+e+"</"+u+">\n"},t.strong=function(e){return "<strong>"+e+"</strong>"},t.em=function(e){return "<em>"+e+"</em>"},t.codespan=function(e){return "<code>"+e+"</code>"},t.br=function(){return this.options.xhtml?"<br/>":"<br>"},t.del=function(e){return "<del>"+e+"</del>"},t.link=function(e,t,u){return null===(e=f(this.options.sanitize,this.options.baseUrl,e))?u:(e='<a href="'+e+'"',t&&(e+=' title="'+t+'"'),e+">"+u+"</a>")},t.image=function(e,t,u){return null===(e=f(this.options.sanitize,this.options.baseUrl,e))?u:(e='<img src="'+e+'" alt="'+u+'"',t&&(e+=' title="'+t+'"'),e+(this.options.xhtml?"/>":">"))},t.text=function(e){return e},e}(),z=function(){function e(){}var t=e.prototype;return t.strong=function(e){return e},t.em=function(e){return e},t.codespan=function(e){return e},t.del=function(e){return e},t.html=function(e){return e},t.text=function(e){return e},t.link=function(e,t,u){return ""+u},t.image=function(e,t,u){return ""+u},t.br=function(){return ""},e}(),$=function(){function e(){this.seen={};}var t=e.prototype;return t.serialize=function(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")},t.getNextSafeSlug=function(e,t){var u=e,n=0;if(this.seen.hasOwnProperty(u))for(n=this.seen[e];u=e+"-"+ ++n,this.seen.hasOwnProperty(u););return t||(this.seen[e]=n,this.seen[u]=0),u},t.slug=function(e,t){void 0===t&&(t={});e=this.serialize(e);return this.getNextSafeSlug(e,t.dryrun)},e}(),S=function(){function u(e){this.options=e||r.defaults,this.options.renderer=this.options.renderer||new _,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new z,this.slugger=new $;}u.parse=function(e,t){return new u(t).parse(e)},u.parseInline=function(e,t){return new u(t).parseInline(e)};var e=u.prototype;return e.parse=function(e,t){void 0===t&&(t=!0);for(var u,n,r,i,s,a,o,l,D,c,p,h,f,g,F,d,A="",k=e.length,C=0;C<k;C++)if(l=e[C],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[l.type]&&(!1!==(d=this.options.extensions.renderers[l.type].call({parser:this},l))||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)))A+=d||"";else switch(l.type){case"space":continue;case"hr":A+=this.renderer.hr();continue;case"heading":A+=this.renderer.heading(this.parseInline(l.tokens),l.depth,m(this.parseInline(l.tokens,this.textRenderer)),this.slugger);continue;case"code":A+=this.renderer.code(l.text,l.lang,l.escaped);continue;case"table":for(a=D="",r=l.header.length,u=0;u<r;u++)a+=this.renderer.tablecell(this.parseInline(l.header[u].tokens),{header:!0,align:l.align[u]});for(D+=this.renderer.tablerow(a),o="",r=l.rows.length,u=0;u<r;u++){for(a="",i=(s=l.rows[u]).length,n=0;n<i;n++)a+=this.renderer.tablecell(this.parseInline(s[n].tokens),{header:!1,align:l.align[n]});o+=this.renderer.tablerow(a);}A+=this.renderer.table(D,o);continue;case"blockquote":o=this.parse(l.tokens),A+=this.renderer.blockquote(o);continue;case"list":for(D=l.ordered,E=l.start,c=l.loose,r=l.items.length,o="",u=0;u<r;u++)f=(h=l.items[u]).checked,g=h.task,p="",h.task&&(F=this.renderer.checkbox(f),c?0<h.tokens.length&&"paragraph"===h.tokens[0].type?(h.tokens[0].text=F+" "+h.tokens[0].text,h.tokens[0].tokens&&0<h.tokens[0].tokens.length&&"text"===h.tokens[0].tokens[0].type&&(h.tokens[0].tokens[0].text=F+" "+h.tokens[0].tokens[0].text)):h.tokens.unshift({type:"text",text:F}):p+=F),p+=this.parse(h.tokens,c),o+=this.renderer.listitem(p,g,f);A+=this.renderer.list(o,D,E);continue;case"html":A+=this.renderer.html(l.text,l.block);continue;case"paragraph":A+=this.renderer.paragraph(this.parseInline(l.tokens));continue;case"text":for(o=l.tokens?this.parseInline(l.tokens):l.text;C+1<k&&"text"===e[C+1].type;)o+="\n"+((l=e[++C]).tokens?this.parseInline(l.tokens):l.text);A+=t?this.renderer.paragraph(o):o;continue;default:var E='Token with "'+l.type+'" type was not found.';if(this.options.silent)return void console.error(E);throw new Error(E)}return A},e.parseInline=function(e,t){t=t||this.renderer;for(var u,n,r="",i=e.length,s=0;s<i;s++)if(u=e[s],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[u.type]&&(!1!==(n=this.options.extensions.renderers[u.type].call({parser:this},u))||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(u.type)))r+=n||"";else switch(u.type){case"escape":r+=t.text(u.text);break;case"html":r+=t.html(u.text);break;case"link":r+=t.link(u.href,u.title,this.parseInline(u.tokens,t));break;case"image":r+=t.image(u.href,u.title,u.text);break;case"strong":r+=t.strong(this.parseInline(u.tokens,t));break;case"em":r+=t.em(this.parseInline(u.tokens,t));break;case"codespan":r+=t.codespan(u.text);break;case"br":r+=t.br();break;case"del":r+=t.del(this.parseInline(u.tokens,t));break;case"text":r+=t.text(u.text);break;default:var a='Token with "'+u.type+'" type was not found.';if(this.options.silent)return void console.error(a);throw new Error(a)}return r},u}(),T=function(){function e(e){this.options=e||r.defaults;}var t=e.prototype;return t.preprocess=function(e){return e},t.postprocess=function(e){return e},e}();function R(g,F){return function(e,u,n){"function"==typeof u&&(n=u,u=null);var r,i,s,t,a=d({},u),o=(u=d({},I.defaults,a),r=u.silent,i=u.async,s=n,function(e){var t;if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",r)return t="<p>An error occurred:</p><pre>"+A(e.message+"",!0)+"</pre>",i?Promise.resolve(t):s?void s(null,t):t;if(i)return Promise.reject(e);if(!s)throw e;s(e);});if(null==e)return o(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof e)return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(a=n,(t=u)&&!t.silent&&(a&&console.warn("marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async"),(t.sanitize||t.sanitizer)&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"),!t.highlight&&"language-"===t.langPrefix||console.warn("marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight."),t.mangle&&console.warn("marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`."),t.baseUrl&&console.warn("marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url."),t.smartypants&&console.warn("marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants."),t.xhtml&&console.warn("marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml."),t.headerIds||t.headerPrefix)&&console.warn("marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`."),u.hooks&&(u.hooks.options=u),n){var l,D=u.highlight;try{u.hooks&&(e=u.hooks.preprocess(e)),l=g(e,u);}catch(e){return o(e)}var c,p=function(t){var e;if(!t)try{u.walkTokens&&I.walkTokens(l,u.walkTokens),e=F(l,u),u.hooks&&(e=u.hooks.postprocess(e));}catch(e){t=e;}return u.highlight=D,t?o(t):n(null,e)};return !D||D.length<3?p():(delete u.highlight,l.length?(c=0,I.walkTokens(l,function(u){"code"===u.type&&(c++,setTimeout(function(){D(u.text,u.lang,function(e,t){if(e)return p(e);null!=t&&t!==u.text&&(u.text=t,u.escaped=!0),0===--c&&p();});},0));}),void(0===c&&p())):p())}if(u.async)return Promise.resolve(u.hooks?u.hooks.preprocess(e):e).then(function(e){return g(e,u)}).then(function(e){return u.walkTokens?Promise.all(I.walkTokens(e,u.walkTokens)).then(function(){return e}):e}).then(function(e){return F(e,u)}).then(function(e){return u.hooks?u.hooks.postprocess(e):e}).catch(o);try{u.hooks&&(e=u.hooks.preprocess(e));var h=g(e,u),f=(u.walkTokens&&I.walkTokens(h,u.walkTokens),F(h,u));return f=u.hooks?u.hooks.postprocess(f):f}catch(e){return o(e)}}}function I(e,t,u){return R(y.lex,S.parse)(e,t,u)}T.passThroughHooks=new Set(["preprocess","postprocess"]),I.options=I.setOptions=function(e){return I.defaults=d({},I.defaults,e),e=I.defaults,r.defaults=e,I},I.getDefaults=e,I.defaults=r.defaults,I.use=function(){for(var D=I.defaults.extensions||{renderers:{},childTokens:{}},e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];t.forEach(function(s){var u,e=d({},s);if(e.async=I.defaults.async||e.async||!1,s.extensions&&(s.extensions.forEach(function(r){if(!r.name)throw new Error("extension name required");var i;if(r.renderer&&(i=D.renderers[r.name],D.renderers[r.name]=i?function(){for(var e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];var n=r.renderer.apply(this,t);return n=!1===n?i.apply(this,t):n}:r.renderer),r.tokenizer){if(!r.level||"block"!==r.level&&"inline"!==r.level)throw new Error("extension level must be 'block' or 'inline'");D[r.level]?D[r.level].unshift(r.tokenizer):D[r.level]=[r.tokenizer],r.start&&("block"===r.level?D.startBlock?D.startBlock.push(r.start):D.startBlock=[r.start]:"inline"===r.level&&(D.startInline?D.startInline.push(r.start):D.startInline=[r.start]));}r.childTokens&&(D.childTokens[r.name]=r.childTokens);}),e.extensions=D),s.renderer){var t,a=I.defaults.renderer||new _;for(t in s.renderer)!function(r){var i=a[r];a[r]=function(){for(var e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];var n=s.renderer[r].apply(a,t);return n=!1===n?i.apply(a,t):n};}(t);e.renderer=a;}if(s.tokenizer){var n,o=I.defaults.tokenizer||new b;for(n in s.tokenizer)!function(r){var i=o[r];o[r]=function(){for(var e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];var n=s.tokenizer[r].apply(o,t);return n=!1===n?i.apply(o,t):n};}(n);e.tokenizer=o;}if(s.hooks){var r,l=I.defaults.hooks||new T;for(r in s.hooks)!function(r){var i=l[r];T.passThroughHooks.has(r)?l[r]=function(e){return I.defaults.async?Promise.resolve(s.hooks[r].call(l,e)).then(function(e){return i.call(l,e)}):(e=s.hooks[r].call(l,e),i.call(l,e))}:l[r]=function(){for(var e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];var n=s.hooks[r].apply(l,t);return n=!1===n?i.apply(l,t):n};}(r);e.hooks=l;}s.walkTokens&&(u=I.defaults.walkTokens,e.walkTokens=function(e){var t=[];return t.push(s.walkTokens.call(this,e)),t=u?t.concat(u.call(this,e)):t}),I.setOptions(e);});},I.walkTokens=function(e,a){for(var o,l=[],t=D(e);!(o=t()).done;)!function(){var t=o.value;switch(l=l.concat(a.call(I,t)),t.type){case"table":for(var e=D(t.header);!(u=e()).done;){var u=u.value;l=l.concat(I.walkTokens(u.tokens,a));}for(var n,r=D(t.rows);!(n=r()).done;)for(var i=D(n.value);!(s=i()).done;){var s=s.value;l=l.concat(I.walkTokens(s.tokens,a));}break;case"list":l=l.concat(I.walkTokens(t.items,a));break;default:I.defaults.extensions&&I.defaults.extensions.childTokens&&I.defaults.extensions.childTokens[t.type]?I.defaults.extensions.childTokens[t.type].forEach(function(e){l=l.concat(I.walkTokens(t[e],a));}):t.tokens&&(l=l.concat(I.walkTokens(t.tokens,a)));}}();return l},I.parseInline=R(y.lexInline,S.parseInline),I.Parser=S,I.parser=S.parse,I.Renderer=_,I.TextRenderer=z,I.Lexer=y,I.lexer=y.lex,I.Tokenizer=b,I.Slugger=$,I.Hooks=T;var F=(I.parse=I).options,U=I.setOptions,Q=I.use,M=I.walkTokens,N=I.parseInline,H=I,X=S.parse,G=y.lex;r.Hooks=T,r.Lexer=y,r.Parser=S,r.Renderer=_,r.Slugger=$,r.TextRenderer=z,r.Tokenizer=b,r.getDefaults=e,r.lexer=G,r.marked=I,r.options=F,r.parse=H,r.parseInline=N,r.parser=X,r.setOptions=U,r.use=Q,r.walkTokens=M;}); 
	} (marked_min, marked_min.exports));

	var marked_minExports = marked_min.exports;
	var marked = /*@__PURE__*/getDefaultExportFromCjs(marked_minExports);

	var GetHeadingTree = function (text) {
	    var items = marked.lexer(text);

	    var eventsheet = null;
	    var parents = [];
	    for (var i = 0; i < items.length; i++) {
	        var item = items[i];
	        switch (item.type) {
	            case 'heading':
	                var level = item.depth - 1;
	                // First node
	                if (eventsheet === null) {
	                    if (level === 0) {
	                        var node = CreateNewNode(item.text);
	                        parents.push(node);
	                        eventsheet = node;
	                    }
	                    // Ignore items if eventsheet is null
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
	                var node = { text: item.text };
	                if (item.lang) {
	                    node.block = item.lang;
	                }
	                lastNode.paragraphs.push(node);
	                break;

	            // Ignore other kinds of items
	        }
	    }

	    return eventsheet;
	};

	var CreateNewNode = function (title) {
	    return {
	        title: title,
	        paragraphs: [],
	        children: [],
	    }
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

	var ParseProperty = function (s, out) {
	    var index = s.indexOf('=');
	    if (index === -1) {
	        out[s] = true;
	    } else {
	        var name = s.substring(0, index).trimRight();
	        var expression = s.substring(index + 1);
	        var value = TypeConvert(expression);

	        // String post-processor
	        // Replace '\n' (2 characters) by '\n' (newline character, 1 character)
	        if (typeof (value) === 'string') {
	            value = value.replace(/\\n/g, '\n');
	        }

	        out[name] = value;
	    }

	    return out;
	};

	var GetTreeConfig = function (paragraphs, commentLineStart) {
	    // TODO: YAML format? 
	    var config = {};
	    paragraphs.forEach(function (paragraph) {
	        var lines = paragraph.text.split('\n');
	        lines.forEach(function (line) {
	            if (line.startsWith(commentLineStart)) {
	                return;
	            }
	            ParseProperty(line, config);
	        });
	    });

	    return config;
	};

	const TopLevelCommandTypes = [
	    { name: 'condition' },
	    { name: 'catch' },
	];

	const HeadingCommand = [
	    {
	        name: 'if',
	        pattern: new RegExp('^if\\s*(.*)', 'i')
	    },
	    { name: 'else' },
	    {
	        name: 'else if',
	        pattern: new RegExp('^else if\\s*(.*)', 'i')
	    },
	    {
	        name: 'while',
	        pattern: new RegExp('^while\\s*(.*)', 'i')
	    },
	    {
	        name: 'repeat',
	        pattern: new RegExp('^repeat\\s*(.*)', 'i')
	    },
	];

	const ActionCommandTypes = [
	    { name: 'exit' },
	    { name: 'break' },
	    {
	        name: 'activate',
	        pattern: new RegExp('^activate\\s*(.*)', 'i')
	    },
	    {
	        name: 'deactivate',
	        pattern: new RegExp('^deactivate\\s*(.*)', 'i')
	    },
	];

	var ParseType = function (s, patterns) {
	    s = s.trim();

	    if ((s[0] === '[') && (s[s.length - 1] === ']')) {
	        s = s.substring(1, s.length - 1);
	        var lowCaseString = s.toLowerCase();

	        for (var i = 0, cnt = patterns.length; i < cnt; i++) {
	            var pattern = patterns[i];
	            var patternName = pattern.name;
	            var testPattern = pattern.pattern;

	            if (testPattern) {
	                var result = s.match(testPattern);
	                if (result) {
	                    return { type: patternName, match: result };
	                }
	            } else if (patternName === lowCaseString) {
	                return { type: patternName };
	            }
	        }
	    }

	    return null;
	};

	const STATE_CONDITION = 1;
	const STATE_TASK = 2;
	const STATE_CATCH = 3;

	var ParseTopLevelNodes = function (nodes) {
	    var conditionNodes = [];
	    var mainTaskNodes = [];
	    var catchNodes = [];

	    var state = STATE_CONDITION;
	    var result = ParseType(nodes[0].title, TopLevelCommandTypes);
	    var nextNodeType = (result) ? result.type : '';
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

	        if ((i + 1) < cnt) {
	            result = ParseType(nodes[i + 1].title, TopLevelCommandTypes);
	            nextNodeType = (result) ? result.type : '';
	        }
	    }

	    return {
	        conditionNodes: conditionNodes,
	        mainTaskNodes: mainTaskNodes,
	        catchNodes: catchNodes,
	    }
	};

	var GetConditionExpression$1 = function (nodes) {
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
	                return `(${GetANDExpression(node)})`
	            }).join(' || ');
	            break;
	    }

	    return expression;
	};

	var GetANDExpression = function (node) {
	    var paragraphs = node.paragraphs;
	    var lines = [];
	    for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
	        var paragraph = paragraphs[i];
	        if (paragraph.hasOwnProperty('block')) {
	            continue;
	        }

	        lines.push(...paragraph.text.split('\n'));
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
	            expression = lines.map(function (line) { return `(${line})` }).join(' && ');
	            break;

	    }
	    return expression;
	};

	var CreateActionNode = function (paragraph, config) {
	    var commandData = GetCommandData(paragraph, config);
	    if (!commandData) {
	        return;
	    }

	    var actionNode;
	    switch (commandData.type) {
	        case 'exit':
	            actionNode = new Abort({ title: '[exit]' });
	            break;

	        case 'break':
	            actionNode = new Failer({ title: '[break]' });
	            break;

	        case 'activate':
	            var activateTreeTitle = commandData.match[1].trim();
	            actionNode = new ActivateAction({
	                title: '[activate]',
	                activateTreeTitle: activateTreeTitle,
	            });
	            break;

	        case 'deactivate':
	            var deactivateTreeTitle = commandData.match[1].trim();
	            actionNode = new DeactivateAction({
	                title: '[deactivate]',
	                deactivateTreeTitle: deactivateTreeTitle,
	            });
	            break;

	        default:
	            delete commandData.type;
	            actionNode = new TaskAction(commandData);
	            break;
	    }

	    return actionNode;
	};

	var GetCommandData = function (paragraph, config) {
	    var commandData;
	    if (paragraph.hasOwnProperty('block')) {
	        commandData = ParseCommandString(paragraph.block, ',', config);
	        commandData.parameters.text = paragraph.text;
	    } else {
	        commandData = ParseCommandString(paragraph.text, '\n', config);
	    }

	    return commandData;
	};


	var ParseCommandString = function (commandString, delimiter, {
	    lineBreak = '\\',
	    commentLineStart = '\/\/',
	} = {}) {
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

	            var result = ParseType(line, ActionCommandTypes);
	            if (result) {
	                return result;
	            }

	            if (line.indexOf(',') !== -1) {
	                lines = commandString.split(',');
	            }
	        }
	    }

	    var commandData = {
	        type: 'task',
	        name: TrimString(lines[0], lineBreak),
	        parameters: {}
	    };

	    var parameters = commandData.parameters;
	    for (var i = 1, cnt = lines.length; i < cnt; i++) {
	        ParseProperty(TrimString(lines[i], lineBreak), parameters);
	    }
	    return commandData;
	};

	var TrimString = function (s, lineBreak) {
	    if (lineBreak && (s.at(-1) === lineBreak)) {
	        s = s.substring(0, s.length - 1);
	    }
	    return s.trim();
	};

	var CreateActionSequence = function (node, config) {
	    var sequence = new TaskSequence({ title: node.title });
	    var paragraphs = node.paragraphs;  // paragraphs -> TaskAction[]
	    var actionNode;
	    for (var i = 0, cnt = paragraphs.length; i < cnt; i++) {
	        actionNode = CreateActionNode(paragraphs[i], config);
	        if (!actionNode) {
	            continue;
	        }
	        sequence.addChild(actionNode);
	    }
	    return sequence;
	};

	var ExtraNumberExpression = function (s) {
	    if (s.startsWith('#(') && s.endsWith(')')) {
	        return s.substring(2, s.length - 1);
	    }

	    return s;
	};

	var CreateParentNode = function (node, config, output) {
	    if (Array.isArray(node)) {
	        var nodes = node;
	        if (nodes.length === 1) {
	            return CreateParentNode(nodes[0], config);

	        } else {
	            // Create sequence from node.children
	            var sequence = (output) ? output : new Sequence();
	            var lastIfSelector;
	            for (var i = 0, cnt = nodes.length; i < cnt; i++) {
	                var node = nodes[i];
	                var child = CreateParentNode(node, config);
	                if (!child) {
	                    continue;
	                }

	                // Construct if-branch selector
	                switch (child.title) {
	                    case '[if]':
	                        sequence.addChild(child);
	                        lastIfSelector = child;
	                        break;

	                    case '[else]':
	                    case '[else if]':
	                        if (lastIfSelector) {
	                            lastIfSelector.insertChild(child, null, -1);
	                        } else {
	                            // No [If] heading before this [else] heading
	                            console.warn(`Can't find [If] heading before '${node.title}'`);
	                        }
	                        break;

	                    default:  // Normal tasks
	                        sequence.addChild(child);
	                        lastIfSelector = null;
	                        break;
	                }

	            }
	            return sequence;

	        }
	    }

	    var result = ParseType(node.title, HeadingCommand);
	    if (result) {
	        switch (result.type) {
	            case 'if':
	                var selector = new Selector({
	                    title: '[if]'
	                });

	                var ifDecorator;
	                var expression = GetConditionExpression(result.match[1], node);
	                try {
	                    ifDecorator = new If({
	                        expression: expression
	                    });
	                } catch (e) {
	                    console.error(`[EventSheet] Parse expression '${expression}' at Heading ${node.title} failed, replace expression by 'false'`);
	                    console.error(e);

	                    ifDecorator = new If({
	                        expression: 'false'
	                    });
	                }

	                if (node.children.length > 0) {
	                    ifDecorator.addChild(CreateParentNode(node.children, config));
	                } else {
	                    ifDecorator.addChild(CreateActionSequence(node, config));
	                }
	                selector.addChild(ifDecorator);

	                var succeeder = new Succeeder();
	                selector.addChild(succeeder);

	                return selector;

	            case 'else':
	            case 'else if':
	                var nodeTypeName = result.type;
	                var ifDecorator;
	                var expression = (nodeTypeName === 'else') ? 'true' : GetConditionExpression(result.match[1], node);
	                try {
	                    ifDecorator = new If({
	                        title: `[${nodeTypeName}]`,
	                        expression: expression
	                    });
	                } catch (e) {
	                    console.error(`[EventSheet] Parse expression '${expression}' at Heading ${node.title} failed, replace expression by 'false'`);
	                    console.error(e);

	                    ifDecorator = new If({
	                        title: `[${nodeTypeName}]`,
	                        expression: 'false'
	                    });
	                }

	                if (node.children.length > 0) {
	                    ifDecorator.addChild(CreateParentNode(node.children, config));
	                } else {
	                    ifDecorator.addChild(CreateActionSequence(node, config));
	                }
	                return ifDecorator;

	            case 'while':
	                var whileDecorator = new RepeatUntilFailure({
	                    title: '[while]',
	                    returnSuccess: true,
	                });

	                var ifDecorator;
	                var expression = GetConditionExpression(result.match[1], node);
	                try {
	                    ifDecorator = new If({
	                        title: '[while-IF]',
	                        expression: expression
	                    });
	                } catch (e) {
	                    console.error(`[EventSheet] Parse expression '${expression}' at Heading ${node.title} failed, replace expression by 'false'`);
	                    console.error(e);

	                    ifDecorator = new If({
	                        title: '[while-IF]',
	                        expression: 'false'
	                    });
	                }

	                if (node.children.length > 0) {
	                    ifDecorator.addChild(CreateParentNode(node.children, config));
	                } else {
	                    ifDecorator.addChild(CreateActionSequence(node, config));
	                }

	                whileDecorator.addChild(ifDecorator);
	                return whileDecorator;

	            case 'repeat':
	                var repeatCount = ExtraNumberExpression(result.match[1]);
	                var repeatDecorator = new Repeat({
	                    title: '[repeat]',
	                    maxLoop: repeatCount,
	                });
	                if (node.children.length > 0) {
	                    repeatDecorator.addChild(CreateParentNode(node.children, config));
	                } else {
	                    repeatDecorator.addChild(CreateActionSequence(node, config));
	                }
	                return repeatDecorator;

	            default:
	                // Error
	                console.error(`Missing ${result.type}'s handler`);
	                break;
	        }

	    } else {
	        var sequence;
	        if (node.children.length > 0) {
	            // A node has paragraphs and children
	            sequence = new Sequence();

	            if (node.paragraphs.length > 0) {
	                // Create ActionSequence from paragraphs
	                sequence.addChild(CreateActionSequence(node, config));
	            }

	            // Append nodes from node.children
	            CreateParentNode(node.children, config, sequence);

	        } else {
	            // A node has paragraphs only
	            sequence = CreateActionSequence(node, config);
	            // Always create a sequence no matter has paragraphs or not

	        }
	        return sequence;

	    }
	};

	var GetConditionExpression = function (payloadExpression, node) {
	    var expression = payloadExpression.trim();
	    if (expression === '') {
	        expression = GetConditionExpression$1(node);
	    }
	    return expression;
	};

	var Marked2Tree = function (
	    eventSheetManager,
	    markedString,
	    {
	        groupName,
	        lineBreak = '\\',
	        commentLineStart = '\/\/',
	        parallel = false,
	        active = true,
	        once = false,
	    } = {}
	) {

	    var headingTree = GetHeadingTree(markedString);
	    var { conditionNodes, mainTaskNodes, catchNodes } = ParseTopLevelNodes(headingTree.children);

	    var treeConfig = Object.assign(
	        { groupName, parallel, active, once },
	        GetTreeConfig(headingTree.paragraphs, commentLineStart)
	    );

	    var taskSequenceConfig = { lineBreak, commentLineStart };

	    var eventsheet = new EventSheet(
	        eventSheetManager,
	        {
	            title: headingTree.title,
	            condition: GetConditionExpression$1(conditionNodes),
	            properties: treeConfig
	        }
	    );

	    var rootNode = eventsheet.root;
	    rootNode.addChild(CreateParentNode(mainTaskNodes, taskSequenceConfig));

	    var forceFailure = new ForceFailure();
	    if (catchNodes.length > 0) {
	        forceFailure.addChild(CreateParentNode(catchNodes[0], taskSequenceConfig));
	    } else {
	        forceFailure.addChild(new Succeeder());
	    }
	    rootNode.addChild(forceFailure);

	    return eventsheet;
	};

	class MarkedEventSheets extends EventSheetManager {
	    boot() {
	        super.boot();

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

	        super.shutdown(fromScene);

	        return this;
	    }
	    addEventSheet(markedString, groupName, config) {
	        if (typeof (groupName) !== 'string') {
	            config = groupName;
	            groupName = undefined;
	        }

	        if (groupName === undefined) {
	            groupName = this.defaultTreeGroupName;
	        }

	        if (config === undefined) {
	            config = {};
	        }

	        var {
	            lineBreak = '\\',
	            commentLineStart = '\/\/',
	            parallel = this.parallel,
	            groupName = groupName
	        } = config;

	        var eventsheet = Marked2Tree(
	            this,
	            markedString,
	            {
	                groupName,
	                lineBreak,
	                commentLineStart,
	                parallel
	            }
	        );

	        this.addTree(eventsheet, eventsheet.groupName);

	        return this;
	    }
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

	var CSV2MD = function (
	    csvString,
	    config = {}
	) {

	    if (typeof (config) === 'string') {
	        config = { title: config };
	    }
	    var { title } = config;

	    var arr = CSVParser.parse(csvString).data;
	    var hasH1 = false,
	        hasH2 = false;
	    var content = [];
	    var row, col0, col1, startChar;
	    for (var i = 0, cnt = arr.length; i < cnt; i++) {
	        row = arr[i];
	        col0 = row[0] || '';
	        col1 = row[1] || '';
	        startChar = col0.charAt(0);

	        switch (startChar) {
	            case '#':
	            case '/':
	                content.push(`${col0} ${col1}`);

	                switch (col0) {
	                    case '#': hasH1 = true; break;
	                    case '##': hasH2 = true; break;
	                }

	                break;

	            default:
	                if ((col0 !== '') && (col1 !== '')) {
	                    content.push(`\n${col0}\n${col1}\n`);

	                } else if (col0 !== '') {
	                    content.push(`\n${col0}\n`);

	                } else {
	                    content.push(`\n${col1}\n`);

	                }
	                break;
	        }
	    }

	    if (!hasH2) {
	        content.unshift('## Script');
	    }
	    if (!hasH1) {
	        content.unshift(`# ${title}`);
	    }

	    return content.join('\n');
	};

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

	var PropertyMethods$1 = {
	    hasProperty(property) {
	        var gameObject = this.gameObject;
	        if (gameObject.hasOwnProperty(property)) {
	            return true;
	        } else {
	            var value = gameObject[property];
	            return (value !== undefined);
	        }
	    },

	    getProperty(property) {
	        return this.gameObject[property];
	    },

	    setProperty(property, value) {
	        this.gameObject[property] = value;
	        return this;
	    },

	    easeProperty(config) {
	        var property = config.property;
	        var value = config.value;
	        var duration = config.duration;
	        var delay = config.delay;
	        var ease = config.ease;
	        var repeat = config.repeat;
	        var isYoyo = config.yoyo;
	        var isFrom = config.from;
	        var onComplete = config.complete;
	        var target = config.target;

	        if (duration === undefined) {
	            duration = 1000;
	        }
	        if (delay === undefined) {
	            delay = 0;
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
	        if (target === undefined) {
	            target = this.gameObject;
	        }
	        if (isFrom) {
	            var startValue = value;
	            value = target[property];
	            target[property] = startValue;
	        }

	        var config = {
	            targets: target,
	            duration: duration,
	            delay: delay,
	            ease: ease,
	            repeat: repeat,
	            yoyo: isYoyo,
	            onComplete: onComplete,
	        };
	        config[property] = value;

	        this.addTweenTask(property, config);

	        return this;
	    },

	    addTweenTask(name, config) {
	        var tweenTasks = this.tweens;
	        var tweenTask = tweenTasks[name];
	        if (tweenTask) {
	            tweenTask.remove();
	        }

	        var onComplete = config.onComplete;
	        config.onComplete = function () {
	            tweenTasks[name].remove();
	            tweenTasks[name] = null;
	            if (onComplete) {
	                onComplete(config.targets, name);
	            }
	        };

	        tweenTask = this.scene.tweens.add(config);
	        tweenTask.timeScale = this.timeScale;
	        tweenTasks[name] = tweenTask;
	        return this;
	    },

	    getTweenTask(property) {
	        return this.tweens[property];
	    },

	    freeTweens() {
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

	};

	var CallMethods$1 = {
	    hasMethod(methodName) {
	        return typeof (this.gameObject[methodName]) === 'function';
	    },

	    call(methodName, ...parameters) {
	        if (!this.hasMethod(methodName)) {
	            console.warn(`[GameObjectManager] Game object '${this.name}' does not have method '${methodName}'`);
	            return this;
	        }

	        var gameObject = this.gameObject;
	        gameObject[methodName].apply(gameObject, parameters);

	        return this;
	    }
	};

	var DataMethods$2 = {
	    hasData(dataKey) {
	        var gameObject = this.gameObject;
	        return (gameObject.data) ? gameObject.data.has(dataKey) : false;
	    },

	    getData(dataKey) {
	        return this.gameObject.getData(dataKey);
	    },

	    setData(dataKey, value) {
	        this.gameObject.setData(dataKey, value);
	        return this;
	    },
	};

	class BobBase {
	    constructor(GOManager, gameObject, name) {
	        this.GOManager = GOManager;
	        this.tweens = {};
	        this.effects = {};
	        this.setGO(gameObject, name);
	    }

	    get scene() {
	        return this.GOManager.scene;
	    }

	    get timeScale() {
	        return this.GOManager.timeScale;
	    }

	    destroy() {
	        this.freeGO();
	        this.GOManager = undefined;
	    }

	    freeGO() {
	        this.freeTweens();
	        this.gameObject.bob = undefined;
	        this.gameObject.destroy();
	        this.gameObject = undefined;
	        return this;
	    }

	    setGO(gameObject, name) {
	        gameObject.goName = name;
	        gameObject.goType = this.GOManager.name;
	        gameObject.bob = this;
	        this.gameObject = gameObject;
	        this.name = name;
	        this.freeTweens();
	        return this;
	    }

	    setTimeScale(timeScale) {
	        var tweenTasks = this.tweens;
	        for (var key in tweenTasks) {
	            var tweenTask = tweenTasks[key];
	            if (tweenTask) {
	                tweenTask.timeScale = timeScale;
	            }
	        }

	        return this;
	    }

	}

	Object.assign(
	    BobBase.prototype,
	    PropertyMethods$1,
	    CallMethods$1,
	    DataMethods$2,
	);

	var IsEmpty = function (source) {
	    for (var k in source) {
	        return false;
	    }
	    return true;
	};

	var IsSingleBob = function (name) {
	    return name && (name.charAt(0) !== '!');
	};

	var GetMethods = {
	    has(name) {
	        return this.bobs.hasOwnProperty(name);
	    },

	    exists(name) {
	        return this.bobs.hasOwnProperty(name);
	    },

	    get(name, out) {
	        if (IsSingleBob(name)) {
	            return this.bobs[name];

	        } else {
	            if (out === undefined) {
	                out = [];
	            }

	            if (name) {
	                name = name.substring(1);
	            }

	            for (var key in this.bobs) {
	                if (name && (key === name)) {
	                    continue;
	                }

	                out.push(this.bobs[key]);
	            }

	            return out;
	        }
	    },

	    getFitst(excluded) {
	        if (excluded && (excluded.charAt(0) === '!')) {
	            excluded = excluded.substring(1);
	        }

	        for (var name in this.bobs) {
	            if (excluded && (excluded === name)) {
	                continue;
	            }

	            return this.bobs[name];
	        }
	        return null;
	    },

	    getGO(name, out) {
	        var bob = this.get(name);
	        if (!bob) {
	            return null;

	        } else if (!Array.isArray(bob)) {
	            return bob.gameObject;

	        } else {
	            if (out === undefined) {
	                out = [];
	            }
	            var bobs = bob;
	            bobs.forEach(function (bob) {
	                out.push(bob.gameObject);
	            });

	            return out;

	        }
	    },

	    forEachGO(callback, scope) {
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
	    },

	    getAllGO(out) {
	        if (out === undefined) {
	            out = [];
	        }

	        for (var name in this.bobs) {
	            var gameObject = this.bobs[name].gameObject;
	            out.push(gameObject);
	        }

	        return out;
	    }
	};

	var GetR = function (colorInt) {
	    return (colorInt >> 16) & 0xff;
	};

	var GetG = function (colorInt) {
	    return (colorInt >> 8) & 0xff;
	};

	var GetB = function (colorInt) {
	    return (colorInt) & 0xff;
	};

	const MaskR = (~(0xff << 16) & 0xffffff);
	const MaskG = (~(0xff << 8) & 0xffffff);
	const MaskB = (~(0xff) & 0xffffff);

	var SetR = function (colorInt, r) {
	    return ((r & 0xff) << 16) | (colorInt & MaskR);
	};

	var SetG = function (colorInt, g) {
	    return ((g & 0xff) << 8) | (colorInt & MaskG);
	};

	var SetB = function (colorInt, b) {
	    return (b & 0xff) | (colorInt & MaskB);
	};

	var SetRGB = function (colorInt, r, g, b) {
	    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff));
	};

	var AddTintRGBProperties = function (gameObject, tintRGB) {
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
	        get: function () {
	            return tintRGB;
	        },
	        set: function (value) {
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
	        get: function () {
	            return tintR;
	        },
	        set: function (value) {
	            value = Math.floor(value) & 0xff;
	            if (tintR !== value) {
	                tintR = value;
	                gameObject.tint = SetR(tintRGB, value);
	            }
	        },
	    });
	    Object.defineProperty(gameObject, 'tintG', {
	        get: function () {
	            return tintG;
	        },
	        set: function (value) {
	            value = Math.floor(value) & 0xff;
	            if (tintG !== value) {
	                tintG = value;
	                gameObject.tint = SetG(tintRGB, value);
	            }
	        },
	    });
	    Object.defineProperty(gameObject, 'tintB', {
	        get: function () {
	            return tintB;
	        },
	        set: function (value) {
	            value = Math.floor(value) & 0xff;
	            if (tintB !== value) {
	                tintB = value;
	                gameObject.tint = SetB(tintRGB, value);
	            }
	        },
	    });
	    Object.defineProperty(gameObject, 'tintGray', {
	        get: function () {
	            return Math.floor((tintR + tintG + tintB) / 3);
	        },
	        set: function (value) {
	            value = Math.floor(value) & 0xff;
	            if ((tintR !== value) || (tintG !== value) || (tintB !== value)) {
	                tintR = value;
	                tintG = value;
	                tintB = value;
	                gameObject.tint = SetRGB(tintRGB, value, value, value);
	            }
	        },
	    });

	    gameObject.tint = tintRGB;

	    return gameObject;
	};

	const EventEmitter$1 = Phaser.Events.EventEmitter;

	var MonitorViewport = function (viewport) {
	    // Don't monitor properties again
	    if (viewport.events) {
	        return viewport;
	    }

	    var events = new EventEmitter$1();

	    var x = viewport.x;
	    Object.defineProperty(viewport, 'x', {
	        get: function () {
	            return x;
	        },

	        set: function (value) {
	            if (x !== value) {
	                x = value;
	                events.emit('update', viewport);
	            }
	        },
	    });

	    var y = viewport.y;
	    Object.defineProperty(viewport, 'y', {
	        get: function () {
	            return y;
	        },

	        set: function (value) {
	            if (y !== value) {
	                y = value;
	                events.emit('update', viewport);
	            }
	        },
	    });

	    var width = viewport.width;
	    Object.defineProperty(viewport, 'width', {
	        get: function () {
	            return width;
	        },

	        set: function (value) {
	            if (width !== value) {
	                width = value;
	                events.emit('update', viewport);
	            }
	        },
	    });

	    var height = viewport.height;
	    Object.defineProperty(viewport, 'height', {
	        get: function () {
	            return height;
	        },

	        set: function (value) {
	            if (height !== value) {
	                height = value;
	                events.emit('update', viewport);
	            }
	        },
	    });

	    viewport.events = events;

	    return viewport;
	};

	var VPXYToXY = function (vpx, vpy, vpxOffset, vpyOffset, viewport, out) {
	    if (out === undefined) {
	        out = {};
	    } else if (out === true) {
	        out = GlobXY;
	    }

	    if (typeof (vpxOffset) !== 'number') {
	        vpxOffset = 0;
	        vpyOffset = 0;
	    }

	    out.x = viewport.x + (viewport.width * vpx) + vpxOffset;
	    out.y = viewport.y + (viewport.height * vpy) + vpyOffset;
	    return out;
	};

	var GlobXY = {};

	var AddViewportCoordinateProperties = function (gameObject, viewport, vpx, vpy, vpxOffset, vpyOffset, transformCallback) {
	    // Don't attach properties again
	    if (gameObject.hasOwnProperty('vp')) {
	        return gameObject;
	    }

	    if (typeof (vpx) === 'function') {
	        transformCallback = vpx;
	        vpx = undefined;
	    }

	    if (typeof (vpxOffset) === 'function') {
	        transformCallback = vpxOffset;
	        vpxOffset = undefined;
	    }


	    if (vpx === undefined) { vpx = 0.5; }
	    if (vpy === undefined) { vpy = 0.5; }
	    if (vpxOffset === undefined) { vpxOffset = 0; }
	    if (vpyOffset === undefined) { vpyOffset = 0; }

	    if (transformCallback === undefined) {
	        transformCallback = VPXYToXY;
	    }

	    MonitorViewport(viewport);
	    var events = viewport.events;

	    gameObject.vp = viewport;

	    // Set position of game object when view-port changed.
	    var Transform = function () {
	        transformCallback(vpx, vpy, vpxOffset, vpyOffset, viewport, gameObject);
	    };

	    events.on('update', Transform);
	    gameObject.once('destroy', function () {
	        events.off('update', Transform);
	        gameObject.vp = undefined;
	    });

	    Object.defineProperty(gameObject, 'vpx', {
	        get: function () {
	            return vpx;
	        },
	        set: function (value) {
	            if (vpx !== value) {
	                vpx = value;
	                Transform();
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'vpy', {
	        get: function () {
	            return vpy;
	        },
	        set: function (value) {
	            if (vpy !== value) {
	                vpy = value;
	                Transform();
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'vpxOffset', {
	        get: function () {
	            return vpxOffset;
	        },
	        set: function (value) {
	            if (vpxOffset !== value) {
	                vpxOffset = value;
	                Transform();
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'vpyOffset', {
	        get: function () {
	            return vpyOffset;
	        },
	        set: function (value) {
	            if (vpyOffset !== value) {
	                vpyOffset = value;
	                Transform();
	            }
	        },
	    });

	    Transform();
	};

	var HasProperty = function (obj, prop) {
	    if (!obj) {
	        return false;
	    }

	    if (obj.hasOwnProperty(prop)) {
	        return true;
	    }

	    while (obj) {
	        if (Object.getOwnPropertyDescriptor(obj, prop)) {
	            return true;
	        }
	        obj = obj.__proto__;
	    }

	    return false;
	};

	var GetFXFactory = function (gameObject) {
	    if (gameObject.preFX) {
	        return gameObject.preFX;
	    }
	    if (gameObject.postFX) {
	        return gameObject.postFX;
	    }
	    return null;
	};

	var AddClearEffectCallback = function (gameObject, effectSwitchName) {
	    if (!gameObject._effectSwitchNames) {
	        gameObject._effectSwitchNames = [];

	        gameObject.clearAllEffects = function () {
	            var effectSwitchNames = gameObject._effectSwitchNames;
	            for (var i = 0, cnt = effectSwitchNames.length; i < cnt; i++) {
	                gameObject[effectSwitchNames[i]] = null;
	            }

	            return gameObject;
	        };
	        gameObject.on('destroy', gameObject.clearAllEffects, gameObject);
	    }

	    gameObject._effectSwitchNames.push(effectSwitchName);
	};

	var AddBarrelProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'barrel')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var barrel;
	    Object.defineProperty(gameObject, 'barrel', {
	        get: function () {
	            return barrel;
	        },
	        set: function (value) {
	            if (barrel === value) {
	                return;
	            }

	            barrel = value;

	            if ((barrel === null) || (barrel === false)) {
	                if (gameObject._barrelEffect) {
	                    fxFactory.remove(gameObject._barrelEffect);
	                    gameObject._barrelEffect = undefined;
	                }
	            } else {
	                if (!gameObject._barrelEffect) {
	                    gameObject._barrelEffect = fxFactory.addBarrel();
	                }
	                gameObject._barrelEffect.amount = barrel;
	            }

	        },
	    });

	    gameObject.barrel = null;

	    AddClearEffectCallback(gameObject, 'barrel');

	    return gameObject;
	};

	var AddColorMatrixEffectPropertiesBase = function (gameObject, effectName, inputMode) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, effectName)) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var EffectInstancePropertyName = `_${effectName}Effect`;

	    var currentValue;
	    Object.defineProperty(gameObject, effectName, {
	        get: function () {
	            return currentValue;
	        },
	        set: function (value) {
	            if (currentValue === value) {
	                return;
	            }

	            currentValue = value;

	            if ((currentValue === null) || (currentValue === false)) {
	                if (gameObject[EffectInstancePropertyName]) {
	                    fxFactory.remove(gameObject[EffectInstancePropertyName]);
	                    gameObject[EffectInstancePropertyName] = undefined;
	                }
	            } else {
	                if (!gameObject[EffectInstancePropertyName]) {
	                    gameObject[EffectInstancePropertyName] = fxFactory.addColorMatrix();
	                }
	                var effectInstance = gameObject[EffectInstancePropertyName];
	                effectInstance[effectName]((inputMode === 1) ? value : undefined);
	            }

	        },
	    });

	    gameObject[effectName] = null;

	    AddClearEffectCallback(gameObject, effectName);

	    return gameObject;
	};

	var AddBlackWhiteProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'blackWhite');
	    return gameObject;
	};

	var AddBloomProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'bloomColor')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var bloomColor,
	        bloomOffsetX = 1,
	        bloomOffsetY = 1,
	        bloomBlurStrength = 1,
	        bloomStrength = 1,
	        bloomSteps = 4;
	    Object.defineProperty(gameObject, 'bloomColor', {
	        get: function () {
	            return bloomColor;
	        },
	        set: function (value) {
	            if (bloomColor === value) {
	                return;
	            }

	            bloomColor = value;

	            if ((bloomColor === null) || (bloomColor === false)) {
	                if (gameObject._bloom) {
	                    fxFactory.remove(gameObject._bloom);
	                    gameObject._bloom = undefined;
	                    fxFactory.setPadding(0);
	                }
	            } else {
	                if (!gameObject._bloom) {
	                    gameObject._bloom = fxFactory.addBloom(bloomColor, bloomOffsetX, bloomOffsetY, bloomBlurStrength, bloomStrength, bloomSteps);
	                    fxFactory.setPadding(Math.max(bloomOffsetX, bloomOffsetY) + 1);
	                }

	                gameObject._bloom.color = bloomColor;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'bloomOffsetX', {
	        get: function () {
	            return bloomOffsetX;
	        },
	        set: function (value) {
	            if (bloomOffsetX === value) {
	                return;
	            }

	            bloomOffsetX = value;

	            if (gameObject._bloom) {
	                var offset = Math.max(bloomOffsetX, bloomOffsetY);
	                fxFactory.setPadding(offset + 1);
	                gameObject._bloom.offsetX = bloomOffsetX;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'bloomOffsetY', {
	        get: function () {
	            return bloomOffsetY;
	        },
	        set: function (value) {
	            if (bloomOffsetY === value) {
	                return;
	            }

	            bloomOffsetY = value;

	            if (gameObject._bloom) {
	                var offset = Math.max(bloomOffsetX, bloomOffsetY);
	                fxFactory.setPadding(offset + 1);
	                gameObject._bloom.offsetY = bloomOffsetY;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'bloomBlurStrength', {
	        get: function () {
	            return bloomBlurStrength;
	        },
	        set: function (value) {
	            if (bloomBlurStrength === value) {
	                return;
	            }

	            bloomBlurStrength = value;

	            if (gameObject._bloom) {
	                gameObject._bloom.blurStrength = bloomBlurStrength;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'bloomStrength', {
	        get: function () {
	            return bloomStrength;
	        },
	        set: function (value) {
	            if (bloomStrength === value) {
	                return;
	            }

	            bloomStrength = value;

	            if (gameObject._bloom) {
	                gameObject._bloom.strength = bloomStrength;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'bloomSteps', {
	        get: function () {
	            return bloomSteps;
	        },
	        set: function (value) {
	            if (bloomSteps === value) {
	                return;
	            }

	            bloomSteps = value;

	            if (gameObject._bloom) {
	                gameObject._bloom.steps = bloomSteps;
	            }
	        },
	    });

	    gameObject.bloomColor = null;

	    AddClearEffectCallback(gameObject, 'bloomColor');

	    return gameObject;
	};

	var AddBlurProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'blurColor')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var blurColor,
	        blurQuality = 0,
	        blurX = 1,
	        blurY = 1,
	        blurStrength = 1,
	        blurSteps = 4;
	    Object.defineProperty(gameObject, 'blurColor', {
	        get: function () {
	            return blurColor;
	        },
	        set: function (value) {
	            if (blurColor === value) {
	                return;
	            }

	            blurColor = value;

	            if ((blurColor === null) || (blurColor === false)) {
	                if (gameObject._blur) {
	                    fxFactory.remove(gameObject._blur);
	                    gameObject._blur = undefined;
	                    fxFactory.setPadding(0);
	                }
	            } else {
	                if (!gameObject._blur) {
	                    gameObject._blur = fxFactory.addBlur(blurQuality, blurX, blurY, blurStrength, blurColor, blurSteps);
	                    fxFactory.setPadding(Math.max(blurX, blurY) + 1);
	                }

	                gameObject._blur.color = blurColor;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'blurQuality', {
	        get: function () {
	            return blurQuality;
	        },
	        set: function (value) {
	            if (blurQuality === value) {
	                return;
	            }

	            blurQuality = value;

	            if (gameObject._blur) {
	                gameObject._blur.quality = blurQuality;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'blurX', {
	        get: function () {
	            return blurX;
	        },
	        set: function (value) {
	            if (blurX === value) {
	                return;
	            }

	            blurX = value;

	            if (gameObject._blur) {
	                var offset = Math.max(blurX, blurY);
	                fxFactory.setPadding(offset + 1);
	                gameObject._blur.x = blurX;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'blurY', {
	        get: function () {
	            return blurY;
	        },
	        set: function (value) {
	            if (blurY === value) {
	                return;
	            }

	            blurY = value;

	            if (gameObject._blur) {
	                var offset = Math.max(blurX, blurY);
	                fxFactory.setPadding(offset + 1);
	                gameObject._blur.y = blurY;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'blurStrength', {
	        get: function () {
	            return blurStrength;
	        },
	        set: function (value) {
	            if (blurStrength === value) {
	                return;
	            }

	            blurStrength = value;

	            if (gameObject._blur) {
	                gameObject._blur.strength = blurStrength;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'blurSteps', {
	        get: function () {
	            return blurSteps;
	        },
	        set: function (value) {
	            if (blurSteps === value) {
	                return;
	            }

	            blurSteps = value;

	            if (gameObject._blur) {
	                gameObject._blur.steps = blurSteps;
	            }
	        },
	    });

	    gameObject.blurColor = null;

	    AddClearEffectCallback(gameObject, 'blurColor');

	    return gameObject;
	};

	var AddBokehProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'bokehRadius')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var bokehRadius,
	        bokehAmount = 1,
	        bokehContrast = 0.2;
	    Object.defineProperty(gameObject, 'bokehRadius', {
	        get: function () {
	            return bokehRadius;
	        },
	        set: function (value) {
	            if (bokehRadius === value) {
	                return;
	            }

	            bokehRadius = value;

	            if ((bokehRadius === null) || (bokehRadius === false)) {
	                if (gameObject._bokeh) {
	                    fxFactory.remove(gameObject._bokeh);
	                    gameObject._bokeh = undefined;
	                }
	            } else {
	                if (!gameObject._bokeh) {
	                    gameObject._bokeh = fxFactory.addBokeh(bokehRadius, bokehAmount, bokehContrast);
	                }

	                gameObject._bokeh.radius = bokehRadius;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'bokehAmount', {
	        get: function () {
	            return bokehAmount;
	        },
	        set: function (value) {
	            if (bokehAmount === value) {
	                return;
	            }

	            bokehAmount = value;

	            if (gameObject._bokeh) {
	                gameObject._bokeh.amount = bokehAmount;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'bokehContrast', {
	        get: function () {
	            return bokehContrast;
	        },
	        set: function (value) {
	            if (bokehContrast === value) {
	                return;
	            }

	            bokehContrast = value;

	            if (gameObject._bokeh) {
	                gameObject._bokeh.contrast = bokehContrast;
	            }
	        },
	    });

	    gameObject.bokehRadius = null;

	    AddClearEffectCallback(gameObject, 'bokehRadius');

	    return gameObject;
	};

	var AddBrightnessProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'brightness', 1);
	    return gameObject;
	};

	var AddBrownProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'brown');
	    return gameObject;
	};

	var AddCircleProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'circleColor')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var circleColor,
	        circleThickness = 8,
	        circleBackgroundColor = 0x000000,
	        circleBackgroundAlpha = 0.4,
	        circleScale = 1,
	        circleFeather = 0.005;
	    Object.defineProperty(gameObject, 'circleColor', {
	        get: function () {
	            return circleColor;
	        },
	        set: function (value) {
	            if (circleColor === value) {
	                return;
	            }

	            circleColor = value;

	            if ((circleColor === null) || (circleColor === false)) {
	                if (gameObject._circle) {
	                    fxFactory.remove(gameObject._circle);
	                    gameObject._circle = undefined;
	                }
	            } else {
	                if (!gameObject._circle) {
	                    gameObject._circle = fxFactory.addCircle(circleThickness, circleColor, circleBackgroundColor, circleScale, circleFeather);
	                    gameObject.circleBackgroundAlpha = circleBackgroundAlpha;
	                }

	                gameObject._circle.color = circleColor;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'circleThickness', {
	        get: function () {
	            return circleThickness;
	        },
	        set: function (value) {
	            if (circleThickness === value) {
	                return;
	            }

	            circleThickness = value;

	            if (gameObject._circle) {
	                gameObject._circle.thickness = circleThickness;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'circleBackgroundColor', {
	        get: function () {
	            return circleBackgroundColor;
	        },
	        set: function (value) {
	            if (circleBackgroundColor === value) {
	                return;
	            }

	            circleBackgroundColor = value;

	            if (gameObject._circle) {
	                gameObject._circle.backgroundColor = circleBackgroundColor;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'circleBackgroundAlpha', {
	        get: function () {
	            return circleBackgroundAlpha;
	        },
	        set: function (value) {
	            if (circleBackgroundAlpha === value) {
	                return;
	            }

	            circleBackgroundAlpha = value;

	            if (gameObject._circle) {
	                gameObject._circle.glcolor2[3] = circleBackgroundAlpha;
	            }
	        },
	    });


	    Object.defineProperty(gameObject, 'circleScale', {
	        get: function () {
	            return circleScale;
	        },
	        set: function (value) {
	            if (circleScale === value) {
	                return;
	            }

	            circleScale = value;

	            if (gameObject._circle) {
	                gameObject._circle.scale = circleScale;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'circleFeather', {
	        get: function () {
	            return circleFeather;
	        },
	        set: function (value) {
	            if (circleFeather === value) {
	                return;
	            }

	            circleFeather = value;

	            if (gameObject._circle) {
	                gameObject._circle.feather = circleFeather;
	            }
	        },
	    });

	    gameObject.circleColor = null;

	    AddClearEffectCallback(gameObject, 'circleColor');

	    return gameObject;
	};

	var AddContrastProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'contrast', 1);
	    return gameObject;
	};

	var AddDesaturateProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'desaturate', 1);
	    return gameObject;
	};

	var AddDesaturateLuminanceProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'desaturateLuminance');
	    return gameObject;
	};

	var AddDisplacementProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'displacementKey')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var displacementKey,
	        displacementX = 0.005,
	        displacementY = 0.005;
	    Object.defineProperty(gameObject, 'displacementKey', {
	        get: function () {
	            return displacementKey;
	        },
	        set: function (value) {
	            if (displacementKey === value) {
	                return;
	            }

	            displacementKey = value;

	            if ((displacementKey === null) || (displacementKey === false)) {
	                if (gameObject._displacement) {
	                    fxFactory.remove(gameObject._displacement);
	                    gameObject._displacement = undefined;
	                }
	            } else {
	                if (!gameObject._displacement) {
	                    gameObject._displacement = fxFactory.addDisplacement(displacementKey, displacementX, displacementY);
	                }

	                gameObject._displacement.setTexture(displacementKey);
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'displacementX', {
	        get: function () {
	            return displacementX;
	        },
	        set: function (value) {
	            if (displacementX === value) {
	                return;
	            }

	            displacementX = value;

	            if (gameObject._displacement) {
	                gameObject._displacement.x = displacementX;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'displacementY', {
	        get: function () {
	            return displacementY;
	        },
	        set: function (value) {
	            if (displacementY === value) {
	                return;
	            }

	            displacementY = value;

	            if (gameObject._displacement) {
	                gameObject._displacement.y = displacementY;
	            }
	        },
	    });

	    gameObject.displacementKey = null;

	    AddClearEffectCallback(gameObject, 'displacementKey');

	    return gameObject;
	};

	var AddGlowProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'glowColor')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var glowColor,
	        glowOuterStrength = 4,
	        glowInnerStrength = 0;
	    Object.defineProperty(gameObject, 'glowColor', {
	        get: function () {
	            return glowColor;
	        },
	        set: function (value) {
	            if (glowColor === value) {
	                return;
	            }

	            glowColor = value;

	            if ((glowColor === null) || (glowColor === false)) {
	                if (gameObject._glow) {
	                    fxFactory.remove(gameObject._glow);
	                    gameObject._glow = undefined;
	                    fxFactory.setPadding(0);
	                }
	            } else {
	                if (!gameObject._glow) {
	                    gameObject._glow = fxFactory.addGlow(glowColor, glowOuterStrength, glowInnerStrength);
	                    fxFactory.setPadding(glowOuterStrength + 1);
	                }

	                gameObject._glow.color = glowColor;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'glowOuterStrength', {
	        get: function () {
	            return glowOuterStrength;
	        },
	        set: function (value) {
	            if (glowOuterStrength === value) {
	                return;
	            }

	            glowOuterStrength = value;

	            if (gameObject._glow) {
	                fxFactory.setPadding(glowOuterStrength + 1);
	                gameObject._glow.outerStrength = glowOuterStrength;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'glowInnerStrength', {
	        get: function () {
	            return glowInnerStrength;
	        },
	        set: function (value) {
	            if (glowInnerStrength === value) {
	                return;
	            }

	            glowInnerStrength = value;

	            if (gameObject._glow) {
	                gameObject._glow.innerStrength = glowInnerStrength;
	            }
	        },
	    });

	    gameObject.glowColor = null;

	    AddClearEffectCallback(gameObject, 'glowColor');

	    return gameObject;
	};

	var AddGradientProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'gradientColor')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var gradientColor1,
	        gradientColor2,
	        gradientAlpha = 0.5,
	        gradientFromX = 0,
	        gradientFromY = 0,
	        gradientToX = 0,
	        gradientToY = 1,
	        gradientSize = 0;
	    Object.defineProperty(gameObject, 'gradientColor', {
	        get: function () {
	            return [gradientColor1, gradientColor2];
	        },

	        set: function (value) {
	            var color1, color2;
	            if ((value === null) || (value === false)) {
	                color1 = null;
	                color2 = null;
	            } else {
	                color1 = value[0];
	                color2 = value[1];
	            }

	            if ((gradientColor1 === color1) && (gradientColor2 === color2)) {
	                return;
	            }

	            gradientColor1 = color1;
	            gradientColor2 = color2;

	            if ((gradientColor1 === null) || (gradientColor1 === false)) {
	                if (gameObject._gradient) {
	                    fxFactory.remove(gameObject._gradient);
	                    gameObject._gradient = undefined;
	                }
	            } else {
	                if (!gameObject._gradient) {
	                    gameObject._gradient = fxFactory.addGradient(gradientColor1, gradientColor2, gradientAlpha, gradientFromX, gradientFromY, gradientToX, gradientToY, gradientSize);
	                }

	                gameObject._gradient.color1 = gradientColor1;
	                gameObject._gradient.color2 = gradientColor2;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'gradientColor1', {
	        get: function () {
	            return gradientColor1;
	        },
	        set: function (value) {
	            if ((value === null) || (value === false)) {
	                gameObject.gradientColor = value;
	                return;
	            }

	            if (gradientColor1 === value) {
	                return;
	            }

	            gradientColor1 = value;

	            if (gameObject._gradient) {
	                gameObject._gradient.color1 = gradientColor1;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'gradientColor2', {
	        get: function () {
	            return gradientColor2;
	        },
	        set: function (value) {
	            if ((value === null) || (value === false)) {
	                gameObject.gradientColor = value;
	                return;
	            }

	            if (gradientColor2 === value) {
	                return;
	            }

	            gradientColor2 = value;

	            if (gameObject._gradient) {
	                gameObject._gradient.color2 = gradientColor2;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'gradientAlpha', {
	        get: function () {
	            return gradientAlpha;
	        },
	        set: function (value) {
	            if (gradientAlpha === value) {
	                return;
	            }

	            gradientAlpha = value;

	            if (gameObject._gradient) {
	                gameObject._gradient.alpha = gradientAlpha;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'gradientFromX', {
	        get: function () {
	            return gradientFromX;
	        },
	        set: function (value) {
	            if (gradientFromX === value) {
	                return;
	            }

	            gradientFromX = value;

	            if (gameObject._gradient) {
	                gameObject._gradient.fromX = gradientFromX;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'gradientFromY', {
	        get: function () {
	            return gradientFromY;
	        },
	        set: function (value) {
	            if (gradientFromY === value) {
	                return;
	            }

	            gradientFromY = value;

	            if (gameObject._gradient) {
	                gameObject._gradient.fromY = gradientFromY;
	            }
	        },
	    });


	    Object.defineProperty(gameObject, 'gradientToX', {
	        get: function () {
	            return gradientToX;
	        },
	        set: function (value) {
	            if (gradientToX === value) {
	                return;
	            }

	            gradientToX = value;

	            if (gameObject._gradient) {
	                gameObject._gradient.toX = gradientToX;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'gradientToY', {
	        get: function () {
	            return gradientToY;
	        },
	        set: function (value) {
	            if (gradientToY === value) {
	                return;
	            }

	            gradientToY = value;

	            if (gameObject._gradient) {
	                gameObject._gradient.toY = gradientToY;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'gradientSize', {
	        get: function () {
	            return gradientSize;
	        },
	        set: function (value) {
	            if (gradientSize === value) {
	                return;
	            }

	            gradientSize = value;

	            if (gameObject._gradient) {
	                gameObject._gradient.size = gradientSize;
	            }
	        },
	    });

	    gameObject.gradientColor = null;

	    AddClearEffectCallback(gameObject, 'gradientColor');

	    return gameObject;
	};

	var AddGrayscaleProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'grayscale', 1);
	    return gameObject;
	};

	var AddHueProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'hue', 1);
	    return gameObject;
	};

	var AddKodachromeProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'kodachrome');
	    return gameObject;
	};

	var AddLSDProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'lsd');
	    return gameObject;
	};

	var AddNegativeProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'negative');
	    return gameObject;
	};

	var AddPixelateProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'pixelate')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var pixelate;
	    Object.defineProperty(gameObject, 'pixelate', {
	        get: function () {
	            return pixelate;
	        },
	        set: function (value) {
	            if (pixelate === value) {
	                return;
	            }

	            pixelate = value;

	            if ((pixelate === null) || (pixelate === false)) {
	                if (gameObject._pixelateEffect) {
	                    fxFactory.remove(gameObject._pixelateEffect);
	                    gameObject._pixelateEffect = undefined;
	                }
	            } else {
	                if (!gameObject._pixelateEffect) {
	                    gameObject._pixelateEffect = fxFactory.addPixelate();
	                }
	                gameObject._pixelateEffect.amount = pixelate;
	            }

	        },
	    });

	    gameObject.pixelate = null;

	    AddClearEffectCallback(gameObject, 'pixelate');

	    return gameObject;
	};

	var AddPolaroidProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'polaroid');
	    return gameObject;
	};

	var AddRevealProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'revealLeft')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var revealLeft,
	        revealRight,
	        revealUp,
	        revealDown,
	        revealWidth = 0.1;

	    var ClearRevealFlags = function () {
	        revealLeft = null;
	        revealRight = null;
	        revealUp = null;
	        revealDown = null;
	    };

	    var RemoveEffect = function (gameObject) {
	        if (gameObject._revealEffect) {
	            fxFactory.remove(gameObject._revealEffect);
	            gameObject._revealEffect = undefined;
	        }
	    };

	    Object.defineProperty(gameObject, 'revealLeft', {
	        get: function () {
	            return revealLeft;
	        },
	        set: function (value) {
	            if (revealLeft === value) {
	                return;
	            }

	            ClearRevealFlags();

	            revealLeft = value;

	            if ((revealLeft === null) || (revealLeft === false)) {
	                RemoveEffect(gameObject);
	            } else {
	                if (!gameObject._revealEffect) {
	                    gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
	                }

	                gameObject._revealEffect.direction = 1;
	                gameObject._revealEffect.axis = 0;
	                gameObject._revealEffect.progress = revealLeft;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'revealRight', {
	        get: function () {
	            return revealRight;
	        },
	        set: function (value) {
	            if (revealRight === value) {
	                return;
	            }

	            ClearRevealFlags();

	            revealRight = value;

	            if ((revealRight === null) || (revealRight === false)) {
	                RemoveEffect(gameObject);
	            } else {
	                if (!gameObject._revealEffect) {
	                    gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
	                }
	                gameObject._revealEffect.direction = 0;
	                gameObject._revealEffect.axis = 0;
	                gameObject._revealEffect.progress = revealRight;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'revealUp', {
	        get: function () {
	            return revealUp;
	        },
	        set: function (value) {
	            if (revealUp === value) {
	                return;
	            }

	            ClearRevealFlags();

	            revealUp = value;

	            if ((revealUp === null) || (revealUp === false)) {
	                RemoveEffect(gameObject);
	            } else {
	                if (!gameObject._revealEffect) {
	                    gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
	                }
	                gameObject._revealEffect.direction = 1;
	                gameObject._revealEffect.axis = 1;
	                gameObject._revealEffect.progress = revealUp;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'revealDown', {
	        get: function () {
	            return revealDown;
	        },
	        set: function (value) {
	            if (revealDown === value) {
	                return;
	            }

	            ClearRevealFlags();

	            revealDown = value;

	            if ((revealDown === null) || (revealDown === false)) {
	                RemoveEffect(gameObject);
	            } else {
	                if (!gameObject._revealEffect) {
	                    gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
	                }
	                gameObject._revealEffect.direction = 0;
	                gameObject._revealEffect.axis = 1;
	                gameObject._revealEffect.progress = revealDown;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'revealWidth', {
	        get: function () {
	            return revealWidth;
	        },
	        set: function (value) {
	            if (revealWidth === value) {
	                return;
	            }

	            revealWidth = value;

	            if (gameObject._revealEffect) {
	                gameObject._revealEffect.wipeWidth = revealWidth;
	            }
	        },
	    });

	    gameObject.revealLeft = null;

	    AddClearEffectCallback(gameObject, 'revealLeft');
	    AddClearEffectCallback(gameObject, 'revealRight');
	    AddClearEffectCallback(gameObject, 'revealUp');
	    AddClearEffectCallback(gameObject, 'revealDown');

	    return gameObject;
	};

	var AddSaturateProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'saturate', 1);
	    return gameObject;
	};

	var AddSepiaProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'sepia');
	    return gameObject;
	};

	var AddShadowProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'shadowColor')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var shadowColor,
	        shadowX = 0,
	        shadowY = 0,
	        shadowDecay = 0.1,
	        shadowPower = 1,
	        shadowSamples = 6,
	        shadowIntensity = 1;
	    Object.defineProperty(gameObject, 'shadowColor', {
	        get: function () {
	            return shadowColor;
	        },
	        set: function (value) {
	            if (shadowColor === value) {
	                return;
	            }

	            shadowColor = value;

	            if ((shadowColor === null) || (shadowColor === false)) {
	                if (gameObject._shadow) {
	                    fxFactory.remove(gameObject._shadow);
	                    gameObject._shadow = undefined;
	                }
	            } else {
	                if (!gameObject._shadow) {
	                    gameObject._shadow = fxFactory.addShadow(shadowX, shadowY, shadowDecay, shadowPower, shadowColor, shadowSamples, shadowIntensity);
	                }

	                gameObject._shadow.color = shadowColor;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'shadowX', {
	        get: function () {
	            return shadowX;
	        },
	        set: function (value) {
	            if (shadowX === value) {
	                return;
	            }

	            shadowX = value;

	            if (gameObject._shadow) {
	                gameObject._shadow.x = shadowX;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'shadowY', {
	        get: function () {
	            return shadowY;
	        },
	        set: function (value) {
	            if (shadowY === value) {
	                return;
	            }

	            shadowY = value;

	            if (gameObject._shadow) {
	                gameObject._shadow.y = shadowY;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'decay', {
	        get: function () {
	            return shadowDecay;
	        },
	        set: function (value) {
	            if (shadowDecay === value) {
	                return;
	            }

	            shadowDecay = value;

	            if (gameObject._shadow) {
	                gameObject._shadow.decay = shadowDecay;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'shadowPower', {
	        get: function () {
	            return shadowPower;
	        },
	        set: function (value) {
	            if (shadowPower === value) {
	                return;
	            }

	            shadowPower = value;

	            if (gameObject._shadow) {
	                gameObject._shadow.power = shadowPower;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'shadowSamples', {
	        get: function () {
	            return shadowSamples;
	        },
	        set: function (value) {
	            if (shadowSamples === value) {
	                return;
	            }

	            shadowSamples = value;

	            if (gameObject._shadow) {
	                gameObject._shadow.samples = shadowSamples;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'shadowIntensity', {
	        get: function () {
	            return shadowIntensity;
	        },
	        set: function (value) {
	            if (shadowIntensity === value) {
	                return;
	            }

	            shadowIntensity = value;

	            if (gameObject._shadow) {
	                gameObject._shadow.intensity = shadowIntensity;
	            }
	        },
	    });

	    gameObject.shadowColor = null;

	    AddClearEffectCallback(gameObject, 'shadowColor');

	    return gameObject;
	};

	var AddShiftToBGRProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'shiftToBGR');
	    return gameObject;
	};

	var AddShineProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'shineSpeed')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var shineSpeed,
	        shineLineWidth = 0.5,
	        shineGradient = 3;
	    Object.defineProperty(gameObject, 'shineSpeed', {
	        get: function () {
	            return shineSpeed;
	        },
	        set: function (value) {
	            if (shineSpeed === value) {
	                return;
	            }

	            shineSpeed = value;

	            if ((shineSpeed === null) || (shineSpeed === false)) {
	                if (gameObject._shine) {
	                    fxFactory.remove(gameObject._shine);
	                    gameObject._shine = undefined;
	                }
	            } else {
	                if (!gameObject._shine) {
	                    gameObject._shine = fxFactory.addShine(shineSpeed, shineLineWidth, shineGradient);
	                }

	                gameObject._shine.speed = shineSpeed;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'shineLineWidth', {
	        get: function () {
	            return shineLineWidth;
	        },
	        set: function (value) {
	            if (shineLineWidth === value) {
	                return;
	            }

	            shineLineWidth = value;

	            if (gameObject._shine) {
	                gameObject._shine.lineWidth = shineLineWidth;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'shineGradient', {
	        get: function () {
	            return shineGradient;
	        },
	        set: function (value) {
	            if (shineGradient === value) {
	                return;
	            }

	            shineGradient = value;

	            if (gameObject._shine) {
	                gameObject._shine.gradient = shineGradient;
	            }
	        },
	    });

	    gameObject.shineSpeed = null;

	    AddClearEffectCallback(gameObject, 'shineSpeed');

	    return gameObject;
	};

	var AddTechnicolorProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'technicolor');
	    return gameObject;
	};

	var AddTiltShiftProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'tiltShiftRadius')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var tiltShiftRadius,
	        tiltShiftAmount = 1,
	        tiltShiftContrast = 0.2,
	        tiltShiftBlurX = 1,
	        tiltShiftBlurY = 1,
	        tiltShiftStrength = 1;
	    Object.defineProperty(gameObject, 'tiltShiftRadius', {
	        get: function () {
	            return tiltShiftRadius;
	        },
	        set: function (value) {
	            if (tiltShiftRadius === value) {
	                return;
	            }

	            tiltShiftRadius = value;

	            if ((tiltShiftRadius === null) || (tiltShiftRadius === false)) {
	                if (gameObject._tiltShift) {
	                    fxFactory.remove(gameObject._tiltShift);
	                    gameObject._tiltShift = undefined;
	                }
	            } else {
	                if (!gameObject._tiltShift) {
	                    gameObject._tiltShift = fxFactory.addTiltShift(tiltShiftRadius, tiltShiftAmount, tiltShiftContrast, tiltShiftBlurX, tiltShiftBlurY, tiltShiftStrength);
	                }

	                gameObject._tiltShift.radius = tiltShiftRadius;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'tiltShiftAmount', {
	        get: function () {
	            return tiltShiftAmount;
	        },
	        set: function (value) {
	            if (tiltShiftAmount === value) {
	                return;
	            }

	            tiltShiftAmount = value;

	            if (gameObject._tiltShift) {
	                gameObject._tiltShift.amount = tiltShiftAmount;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'tiltShiftContrast', {
	        get: function () {
	            return tiltShiftContrast;
	        },
	        set: function (value) {
	            if (tiltShiftContrast === value) {
	                return;
	            }

	            tiltShiftContrast = value;

	            if (gameObject._tiltShift) {
	                gameObject._tiltShift.contrast = tiltShiftContrast;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'tiltShiftBlurX', {
	        get: function () {
	            return tiltShiftBlurX;
	        },
	        set: function (value) {
	            if (tiltShiftBlurX === value) {
	                return;
	            }

	            tiltShiftBlurX = value;

	            if (gameObject._tiltShift) {
	                gameObject._tiltShift.blurX = tiltShiftBlurX;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'tiltShiftBlurY', {
	        get: function () {
	            return tiltShiftBlurY;
	        },
	        set: function (value) {
	            if (tiltShiftBlurY === value) {
	                return;
	            }

	            tiltShiftBlurY = value;

	            if (gameObject._tiltShift) {
	                gameObject._tiltShift.blurY = tiltShiftBlurY;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'tiltShiftStrength', {
	        get: function () {
	            return tiltShiftStrength;
	        },
	        set: function (value) {
	            if (tiltShiftStrength === value) {
	                return;
	            }

	            tiltShiftStrength = value;

	            if (gameObject._tiltShift) {
	                gameObject._tiltShift.strength = tiltShiftStrength;
	            }
	        },
	    });

	    gameObject.tiltShiftRadius = null;

	    AddClearEffectCallback(gameObject, 'tiltShiftRadius');

	    return gameObject;
	};

	var AddVignetteProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'vignetteRadius')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var vignetteRadius,
	        vignetteX = 0.5,
	        vignetteY = 0.5,
	        vignetteStrength = 0.5;
	    Object.defineProperty(gameObject, 'vignetteRadius', {
	        get: function () {
	            return vignetteRadius;
	        },
	        set: function (value) {
	            if (vignetteRadius === value) {
	                return;
	            }

	            vignetteRadius = value;

	            if ((vignetteRadius === null) || (vignetteRadius === false)) {
	                if (gameObject._vignette) {
	                    fxFactory.remove(gameObject._vignette);
	                    gameObject._vignette = undefined;
	                }
	            } else {
	                if (!gameObject._vignette) {
	                    gameObject._vignette = fxFactory.addVignette(vignetteX, vignetteY, vignetteRadius, vignetteStrength);
	                }

	                gameObject._vignette.radius = vignetteRadius;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'vignetteX', {
	        get: function () {
	            return vignetteX;
	        },
	        set: function (value) {
	            if (vignetteX === value) {
	                return;
	            }

	            vignetteX = value;

	            if (gameObject._vignette) {
	                gameObject._vignette.x = vignetteX;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'vignetteY', {
	        get: function () {
	            return vignetteY;
	        },
	        set: function (value) {
	            if (vignetteY === value) {
	                return;
	            }

	            vignetteY = value;

	            if (gameObject._vignette) {
	                gameObject._vignette.y = vignetteY;
	            }
	        },
	    });

	    Object.defineProperty(gameObject, 'vignetteStrength', {
	        get: function () {
	            return vignetteStrength;
	        },
	        set: function (value) {
	            if (vignetteStrength === value) {
	                return;
	            }

	            vignetteStrength = value;

	            if (gameObject._vignette) {
	                gameObject._vignette.strength = vignetteStrength;
	            }
	        },
	    });

	    gameObject.vignetteRadius = null;

	    AddClearEffectCallback(gameObject, 'vignetteRadius');

	    return gameObject;
	};

	var AddVintagePinholeProperties = function (gameObject) {
	    AddColorMatrixEffectPropertiesBase(gameObject, 'vintagePinhole');
	    return gameObject;
	};

	var AddWipeProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'wipeLeft')) {
	        return gameObject;
	    }

	    var fxFactory = GetFXFactory(gameObject);
	    if (!fxFactory) {
	        return gameObject;
	    }

	    var wipeLeft,
	        wipeRight,
	        wipeUp,
	        wipeDown,
	        wipeWidth = 0.1;

	    var ClearWipeFlags = function () {
	        wipeLeft = null;
	        wipeRight = null;
	        wipeUp = null;
	        wipeDown = null;
	    };

	    var RemoveEffect = function (gameObject) {
	        if (gameObject._wipeEffect) {
	            fxFactory.remove(gameObject._wipeEffect);
	            gameObject._wipeEffect = undefined;
	        }
	    };

	    Object.defineProperty(gameObject, 'wipeLeft', {
	        get: function () {
	            return wipeLeft;
	        },
	        set: function (value) {
	            if (wipeLeft === value) {
	                return;
	            }

	            ClearWipeFlags();

	            wipeLeft = value;

	            if ((wipeLeft === null) || (wipeLeft === false)) {
	                RemoveEffect(gameObject);
	            } else {
	                if (!gameObject._wipeEffect) {
	                    gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
	                }

	                gameObject._wipeEffect.direction = 1;
	                gameObject._wipeEffect.axis = 0;
	                gameObject._wipeEffect.progress = wipeLeft;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'wipeRight', {
	        get: function () {
	            return wipeRight;
	        },
	        set: function (value) {
	            if (wipeRight === value) {
	                return;
	            }

	            ClearWipeFlags();

	            wipeRight = value;

	            if ((wipeRight === null) || (wipeRight === false)) {
	                RemoveEffect(gameObject);
	            } else {
	                if (!gameObject._wipeEffect) {
	                    gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
	                }
	                gameObject._wipeEffect.direction = 0;
	                gameObject._wipeEffect.axis = 0;
	                gameObject._wipeEffect.progress = wipeRight;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'wipeUp', {
	        get: function () {
	            return wipeUp;
	        },
	        set: function (value) {
	            if (wipeUp === value) {
	                return;
	            }

	            ClearWipeFlags();

	            wipeUp = value;

	            if ((wipeUp === null) || (wipeUp === false)) {
	                RemoveEffect(gameObject);
	            } else {
	                if (!gameObject._wipeEffect) {
	                    gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
	                }
	                gameObject._wipeEffect.direction = 1;
	                gameObject._wipeEffect.axis = 1;
	                gameObject._wipeEffect.progress = wipeUp;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'wipeDown', {
	        get: function () {
	            return wipeDown;
	        },
	        set: function (value) {
	            if (wipeDown === value) {
	                return;
	            }

	            ClearWipeFlags();

	            wipeDown = value;

	            if ((wipeDown === null) || (wipeDown === false)) {
	                RemoveEffect(gameObject);
	            } else {
	                if (!gameObject._wipeEffect) {
	                    gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
	                }
	                gameObject._wipeEffect.direction = 0;
	                gameObject._wipeEffect.axis = 1;
	                gameObject._wipeEffect.progress = wipeDown;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'wipeWidth', {
	        get: function () {
	            return wipeWidth;
	        },
	        set: function (value) {
	            if (wipeWidth === value) {
	                return;
	            }

	            wipeWidth = value;

	            if (gameObject._wipeEffect) {
	                gameObject._wipeEffect.wipeWidth = wipeWidth;
	            }
	        },
	    });

	    gameObject.wipeLeft = null;

	    AddClearEffectCallback(gameObject, 'wipeLeft');
	    AddClearEffectCallback(gameObject, 'wipeRight');
	    AddClearEffectCallback(gameObject, 'wipeUp');
	    AddClearEffectCallback(gameObject, 'wipeDown');

	    return gameObject;
	};

	const EffectMap = {
	    barrel: AddBarrelProperties,
	    blackWhite: AddBlackWhiteProperties,
	    bloom: AddBloomProperties,
	    blur: AddBlurProperties,
	    bokeh: AddBokehProperties,
	    brightness: AddBrightnessProperties,
	    brown: AddBrownProperties,
	    circle: AddCircleProperties,
	    contrast: AddContrastProperties,
	    desaturate: AddDesaturateProperties,
	    desaturateLuminance: AddDesaturateLuminanceProperties,
	    displacement: AddDisplacementProperties,
	    glow: AddGlowProperties,
	    gradient: AddGradientProperties,
	    grayscale: AddGrayscaleProperties,
	    hue: AddHueProperties,
	    kodachrome: AddKodachromeProperties,
	    lsd: AddLSDProperties,
	    negative: AddNegativeProperties,
	    pixelate: AddPixelateProperties,
	    polaroid: AddPolaroidProperties,
	    reveal: AddRevealProperties,
	    saturate: AddSaturateProperties,
	    sepia: AddSepiaProperties,
	    shadow: AddShadowProperties,
	    shiftToBGR: AddShiftToBGRProperties,
	    shine: AddShineProperties,
	    technicolor: AddTechnicolorProperties,
	    tiltShift: AddTiltShiftProperties,
	    vignette: AddVignetteProperties,
	    vintagePinhole: AddVintagePinholeProperties,
	    wipe: AddWipeProperties
	};

	var AddEffectProperties = function (gameObject, config) {
	    if (config === undefined) {
	        config = true;
	    } else if (typeof (config) === 'string') {
	        config = { config: true };
	    } else if (Array.isArray(config)) {
	        var nameList = config;
	        var config = {};
	        for (var i = 0, cnt = nameList.length; i < cnt; i++) {
	            config[nameList[i]] = true;
	        }
	    }

	    if (config === true) {
	        // Enable all effect properties
	        for (var name in EffectMap) {
	            EffectMap[name](gameObject);
	        }
	    } else {
	        for (var name in config) {
	            if (config[name] && EffectMap[name]) {
	                EffectMap[name](gameObject);
	            }
	        }
	    }

	    return gameObject;
	};

	const RemoveItem$2 = Phaser.Utils.Array.Remove;

	var AddMethods = {
	    addGO(name, gameObject) {
	        this.remove(name, true);

	        if (this.useTintFadeEffect(gameObject)) {
	            AddTintRGBProperties(gameObject);
	        }

	        if (this.viewportCoordinateEnable) {
	            AddViewportCoordinateProperties(gameObject, this.viewport);
	        }

	        if (this.effectPropertiesConfig) {
	            AddEffectProperties(gameObject, this.effectPropertiesConfig);
	        }

	        gameObject
	            .setName(name)
	            .once('destroy', function () {
	                RemoveItem$2(this.removedGOs, gameObject);
	                if (this.isEmpty) {
	                    this.emit('empty');
	                }
	            }, this);

	        var bob = new this.BobClass(this, gameObject, name);
	        this.bobs[name] = bob;

	        return this;
	    },

	    add(name, ...args) {
	        var callback = this.createGameObjectCallback;
	        var scope = this.createGameObjectScope;
	        var gameObject = callback.call(scope, this.scene, ...args);
	        this.addGO(name, gameObject);

	        if (this.gameObjectDepth != null) { // Not undefined, null
	            gameObject.setDepth(this.gameObjectDepth);
	        }

	        var bob = this.get(name);
	        this.fadeBob(bob, 0, 1);

	        return this;
	    },
	};

	var RemoveMethods = {
	    remove(name, ignoreFade) {
	        var bobs = this.get(name);
	        if (!bobs) {
	            return this;
	        } else if (!Array.isArray(bobs)) {
	            bobs = [bobs];
	        }

	        var self = this;
	        bobs.forEach(function (bob) {
	            delete self.bobs[bob.name];

	            var gameObject = bob.gameObject;
	            self.removedGOs.push(gameObject);
	            gameObject.setName();

	            if (!ignoreFade) {
	                self.fadeBob(
	                    bob,                  // bob
	                    undefined,            // fromValue
	                    0,                    // toValue
	                    function () {         // onComplete
	                        bob.destroy();
	                    }
	                );
	            } else {
	                bob.destroy();
	            }
	        });

	        return this;
	    },

	    removeAll() {
	        var bobs = this.bobs;
	        for (var name in bobs) {
	            this.remove(name);
	        }
	        return this;
	    },

	    clear(destroyChild) {
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
	    hasProperty(name, property) {
	        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
	        if (!bob) {
	            return false;
	        }

	        return bob.hasProperty(property);
	    },

	    getProperty(name, property) {
	        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
	        if (!bob) {
	            return undefined;
	        }

	        return bob.getProperty(property);
	    },

	    isNumberProperty(name, property) {
	        var value = this.getProperty(name, property);
	        return typeof (value) === 'number';
	    },

	    setProperty(name, property, value) {
	        var bobs = this.get(name);
	        if (!bobs) {
	            return this;
	        } else if (!Array.isArray(bobs)) {
	            bobs = [bobs];
	        }

	        if (this.symbols &&
	            (typeof (value) === 'string') &&
	            this.isNumberProperty(name, property)
	        ) {
	            if (value in this.symbols) {
	                value = this.symbols[value];
	            } else {
	                console.warn(`Can't find symbol ${value}`);
	            }
	        }

	        bobs.forEach(function (bob) {
	            bob.setProperty(property, value);
	        });

	        return this;
	    },

	    easeProperty(name, config) {
	        var bobs = this.get(name);
	        if (!bobs) {
	            return this;
	        } else if (!Array.isArray(bobs)) {
	            bobs = [bobs];
	        }

	        var value = config.value;
	        var property = config.property;

	        if (this.symbols &&
	            (typeof (value) === 'string') &&
	            this.isNumberProperty(name, property) &&
	            (value in this.symbols)
	        ) {
	            config.value = this.symbols[value];
	        }

	        bobs.forEach(function (bob) {
	            bob.easeProperty(config);
	        });

	        return this;
	    },

	    hasTweenTask(name, property) {
	        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
	        if (!bob) {
	            return false;
	        }

	        return bob.tweens.hasOwnProperty(property);
	    },

	    getTweenTask(name, property) {
	        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
	        if (!bob) {
	            return null;
	        }

	        return bob.tweens[property] || null;
	    }
	};

	var CallMethods = {
	    hasMethod(name, methodName) {
	        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
	        if (!bob) {
	            return false;
	        }

	        return bob.hasMethod(methodName);
	    },


	    call(name, methodName, ...parameters) {
	        var bobs = this.get(name);
	        if (!bobs) {
	            return this;
	        } else if (!Array.isArray(bobs)) {
	            bobs = [bobs];
	        }

	        bobs.forEach(function (bob) {
	            bob.call(methodName, ...parameters);
	        });

	        return this;
	    },
	};

	var DataMethods$1 = {
	    hasData(name, dataKey) {
	        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
	        if (!bob) {
	            return false;
	        }

	        return bob.hasData(dataKey);
	    },

	    getData(name, dataKey) {
	        if (!this.has(name)) {
	            return undefined;
	        }
	        return this.get(name).getData(dataKey);
	    },

	    setData(name, dataKey, value) {
	        var bobs = this.get(name);
	        if (!bobs) {
	            return this;
	        } else if (!Array.isArray(bobs)) {
	            bobs = [bobs];
	        }

	        bobs.forEach(function (bob) {
	            bob.setData(dataKey, value);
	        });

	        return this;
	    },
	};

	const FadeTint = 0;
	const FadeAlpha = 1;
	const FadeRevealUp = 2;
	const FadeRevealDown = 3;
	const FadeRevealLeft = 4;
	const FadeRevealRight = 5;

	const FadeMode = {
	    tint: FadeTint,
	    alpha: FadeAlpha,
	    revealUp: FadeRevealUp,
	    revealDown: FadeRevealDown,
	    revealLeft: FadeRevealLeft,
	    revealRight: FadeRevealRight,
	};

	var FadeMethods = {
	    setGOFadeMode(fadeMode) {
	        if (typeof (fadeMode) === 'string') {
	            fadeMode = FadeMode[fadeMode];
	        }

	        this.fadeMode = fadeMode;
	        return this;
	    },

	    setGOFadeTime(time) {
	        this.fadeTime = time;
	        return this;
	    },

	    useTintFadeEffect(gameObject) {
	        return ((this.fadeMode === undefined) || (this.fadeMode === FadeTint)) &&
	            (this.fadeTime > 0) && (gameObject.setTint !== undefined);
	    },

	    useAlphaFadeEffect(gameObject) {
	        return ((this.fadeMode === undefined) || (this.fadeMode === FadeAlpha)) &&
	            (this.fadeTime > 0) && (gameObject.setAlpha !== undefined);
	    },

	    useRevealEffect(gameObject) {
	        return ((this.fadeMode >= FadeRevealUp) && (this.fadeMode <= FadeRevealRight)) &&
	            (this.fadeTime > 0) && (gameObject.preFX || gameObject.postFX);
	    },

	    fadeBob(bob, fromValue, toValue, onComplete) {
	        var gameObject = bob.gameObject;
	        if (this.useTintFadeEffect(gameObject)) {
	            if (fromValue !== undefined) {
	                bob.setProperty('tintGray', 255 * fromValue);
	            }
	            bob.easeProperty({
	                property: 'tintGray',
	                value: Math.floor(255 * toValue),
	                duration: this.fadeTime,
	                delay: 0,
	                ease: 'Linear',
	                repeat: 0,
	                yoyo: false,
	                from: false,
	                complete: onComplete
	            });

	        } else if (this.useAlphaFadeEffect(gameObject)) {
	            if (fromValue !== undefined) {
	                bob.setProperty('alpha', fromValue);
	            }
	            bob.easeProperty({
	                property: 'alpha',
	                value: toValue,
	                duration: this.fadeTime,
	                delay: 0,
	                ease: 'Linear',
	                repeat: 0,
	                yoyo: false,
	                from: false,
	                complete: onComplete
	            });

	        } else if (this.useRevealEffect(gameObject)) {
	            AddEffectProperties(gameObject, 'reveal');
	            var propertyName;
	            switch (this.fadeMode) {
	                case FadeRevealUp: propertyName = 'revealUp'; break;
	                case FadeRevealDown: propertyName = 'revealDown'; break;
	                case FadeRevealLeft: propertyName = 'revealLeft'; break;
	                case FadeRevealRight: propertyName = 'revealRight'; break;
	            }

	            if (fromValue === undefined) {
	                fromValue = 0;
	            }
	            gameObject[propertyName] = fromValue;
	            bob.easeProperty({
	                property: propertyName,
	                value: toValue,
	                duration: this.fadeTime,
	                delay: 0,
	                ease: 'Linear',
	                repeat: 0,
	                yoyo: false,
	                from: false,
	                complete: onComplete
	            });

	            bob.getTweenTask(propertyName).once('complete', function () {
	                gameObject[propertyName] = null;
	            });

	        } else {
	            if (onComplete) {
	                onComplete(gameObject);
	            }

	        }

	        return this;
	    }

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

	Phaser.Geom.Rectangle;
	const Vector2 = Phaser.Math.Vector2;
	const RotateAround = Phaser.Math.RotateAround;
	Phaser.GameObjects.Container;

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

	const GetValue$g = Phaser.Utils.Objects.GetValue;

	var DrawBounds = function (gameObjects, graphics, config) {
	    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
	    if (typeof (config) === 'number') {
	        strokeColor = config;
	    } else {
	        strokeColor = GetValue$g(config, 'color');
	        lineWidth = GetValue$g(config, 'lineWidth');
	        fillColor = GetValue$g(config, 'fillColor');
	        fillAlpha = GetValue$g(config, 'fillAlpha', 1);
	        padding = GetValue$g(config, 'padding', 0);
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

	var DrawGameObjectsBounds = function (graphics, config) {
	    this.forEachGO(function (gameObject) {
	        if (gameObject.drawBounds) {
	            gameObject.drawBounds(graphics, config);
	        } else {
	            DrawBounds(gameObject, graphics, config);
	        }
	    });
	    return this;
	};

	var GetCameraByName = function (scene, name) {
	    var cameraManager = scene.cameras;
	    var camera;
	    if (name === undefined) {
	        camera = cameraManager.main;
	    } else {
	        var cameraNameType = typeof (name);
	        switch (cameraNameType) {
	            case 'string':
	                camera = cameraManager.getCamera(name);
	                break;

	            case 'number':
	                camera = cameraManager.cameras[name];
	                break;

	            default:
	                camera = name;
	                break;
	        }
	    }

	    return camera;
	};

	var CameraMethods$2 = {
	    setCamera(goName, cameraName) {
	        var bob = this.get(goName);
	        if (!bob) {
	            return this;
	        }

	        var camera = GetCameraByName(this.scene, cameraName);
	        if (!camera) {
	            return this;
	        }

	        bob.gameObject.cameraFilter = 0xffffffff ^ camera.id;
	        bob.camera = camera;

	        return this;
	    },

	    getCamera(goName) {
	        var bob = this.get(goName);
	        if (!bob) {
	            return null;
	        }

	        return bob.camera;
	    }
	};

	var Methods$2 = {
	    drawGameObjectsBounds: DrawGameObjectsBounds,
	};

	Object.assign(
	    Methods$2,
	    GetMethods,
	    AddMethods,
	    RemoveMethods,
	    PropertyMethods,
	    CallMethods,
	    DataMethods$1,
	    FadeMethods,
	    CameraMethods$2,
	);

	const CameraClass = Phaser.Cameras.Scene2D.BaseCamera;

	var IsCameraObject = function (object) {
	    return (object instanceof CameraClass);
	};

	const Rectangle = Phaser.Geom.Rectangle;

	var GetViewport = function (scene, camera, out) {
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

	const GetValue$f = Phaser.Utils.Objects.GetValue;

	class GOManager {
	    constructor(scene, config) {
	        this.scene = scene;

	        this.BobClass = GetValue$f(config, 'BobClass', BobBase);
	        this.setCreateGameObjectCallback(
	            GetValue$f(config, 'createGameObject'),
	            GetValue$f(config, 'createGameObjectScope')
	        );
	        this.setEventEmitter(GetValue$f(config, 'eventEmitter', undefined));

	        this.setGameObjectDepth(GetValue$f(config, 'depth', undefined));

	        var fadeConfig = GetValue$f(config, 'fade', 500);
	        if (typeof (fadeConfig) === 'number') {
	            this.setGOFadeMode();
	            this.setGOFadeTime(fadeConfig);
	        } else {
	            this.setGOFadeMode(GetValue$f(fadeConfig, 'mode'));
	            this.setGOFadeTime(GetValue$f(fadeConfig, 'time', 500));
	        }

	        var viewportCoordinateConfig = GetValue$f(config, 'viewportCoordinate', false);
	        if (viewportCoordinateConfig !== false) {
	            this.setViewportCoordinateEnable(GetValue$f(config, 'enable', true));
	            this.setViewport(GetValue$f(viewportCoordinateConfig, 'viewport'));
	        } else {
	            this.setViewportCoordinateEnable(false);
	        }

	        var effectPropertiesConfig = GetValue$f(config, 'effectProperties', false);
	        this.setEffectPropertiesConfig(effectPropertiesConfig);

	        this.setSymbols(GetValue$f(config, 'symbols'));

	        this.bobs = {};
	        this.removedGOs = [];
	        this._timeScale = 1;

	        this.name = GetValue$f(config, 'name');
	    }

	    destroy(fromScene) {
	        this.clear(!fromScene);
	        this.createGameObjectCallback = undefined;
	        this.viewport = undefined;
	        this.scene = undefined;
	    }

	    set timeScale(timeScale) {
	        if (this._timeScale === timeScale) {
	            return;
	        }

	        this._timeScale = timeScale;

	        var bobs = this.bobs;
	        for (var name in bobs) {
	            bobs[name].setTimeScale(timeScale);
	        }
	    }

	    get timeScale() {
	        return this._timeScale;
	    }

	    setTimeScale(timeScale) {
	        this.timeScale = timeScale;
	        return this;
	    }

	    setCreateGameObjectCallback(callback, scope) {
	        this.createGameObjectCallback = callback;
	        this.createGameObjectScope = scope;
	        return this;
	    }

	    setGameObjectDepth(depth) {
	        this.gameObjectDepth = depth;
	        return this;
	    }

	    setViewportCoordinateEnable(enable) {
	        if (enable === undefined) {
	            enable = true;
	        }

	        this.viewportCoordinateEnable = enable;
	        return this;
	    }

	    setEffectPropertiesConfig(config) {
	        if (config === undefined) {
	            config = true;
	        }

	        this.effectPropertiesConfig = config;
	        return this;
	    }

	    setViewport(viewport) {
	        if (viewport === undefined) {
	            viewport = GetViewport(this.scene, this.scene.cameras.main);
	        }

	        this.viewport = viewport;
	        return this;
	    }

	    setSymbols(symbols) {
	        this.symbols = symbols;
	        return this;
	    }

	    get isEmpty() {
	        return IsEmpty(this.bobs) && (this.removedGOs.length === 0);
	    }

	}

	Object.assign(
	    GOManager.prototype,
	    EventEmitterMethods$1,
	    Methods$2
	);

	const GameObjectClass = Phaser.GameObjects.GameObject;
	var IsGameObject = function (object) {
	    return (object instanceof GameObjectClass);
	};

	const LayerClass = Phaser.GameObjects.Layer;

	var IsLayerGameObject = function (gameObject) {
	    return (gameObject instanceof LayerClass);
	};

	var GetLayer = function (gameObject) {
	    var layer = gameObject.displayList;
	    if (!IsLayerGameObject(layer)) {
	        return null;
	    }

	    return layer;

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

	var LayerMethods = {
	    getLayer(name) {
	        return this.getGO(name);
	    },

	    getLayers(out) {
	        if (out === undefined) {
	            out = [];
	        }
	        this.forEachGO(function (gameObject) {
	            out.push(gameObject);
	        });
	        SortGameObjectsByDepth(out, false);
	        return out;
	    },

	    addToLayer(name, gameObjects) {
	        var layer = this.getGO(name);
	        if (!layer) {
	            console.warn(`[LayerManager] Can't get layer "${name}"`);
	            return;
	        }

	        if (!Array.isArray(gameObjects)) {
	            gameObjects = [gameObjects];
	        }

	        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
	            var gameObject = gameObjects[i];
	            if (gameObject.isRexContainerLite) {
	                gameObject.addToLayer(layer);
	            } else {
	                layer.add(gameObject);
	            }
	        }

	        if (layer.scrollFactorX !== undefined) {
	            gameObject.setScrollFactor(layer.scrollFactorX, layer.scrollFactorY);
	        }

	        return this;
	    },

	    addToBottomLayer(gameObjects) {
	        var bottomLayer = this.getLayers()[0];
	        this.addToLayer(bottomLayer.goName, gameObjects);
	        return this;
	    },

	    addToTopLayer(gameObjects) {
	        var layers = this.getLayers();
	        var topLayer = layers[layers.length - 1];
	        this.addToLayer(topLayer.goName, gameObjects);
	        return this;
	    },

	    removeFromLayer(name, gameObject, addToScene) {
	        var layer = this.getGO(name);
	        if (!layer) {
	            console.warn(`[LayerManager] Can't get layer "${name}"`);
	            return;
	        }

	        if (addToScene === undefined) {
	            addToScene = true;
	        }

	        if (gameObject.isRexContainerLite) {
	            gameObject.removeFromLayer(layer, addToScene);
	        } else {
	            layer.remove(gameObject);
	            if (addToScene) {
	                gameObject.addToDisplayList();
	            }
	        }

	        return this;
	    },

	    clearLayer(name, destroyChildren) {
	        if (destroyChildren === undefined) {
	            destroyChildren = true;
	        }

	        var layer = this.getGO(name);
	        if (!layer) {
	            console.warn(`Can't get layer "${name}"`);
	            return;
	        }

	        if (destroyChildren) {
	            var children = layer.getAll();
	            for (var i = 0, cnt = children.length; i < cnt; i++) {
	                children[i].destroy();
	            }
	        } else {
	            layer.removeAll();
	        }

	        return this;
	    },

	};

	var ScrollFactorMethods = {
	    setScrollFactor(name, scrollFactorX, scrollFactorY) {
	        if (scrollFactorY === undefined) {
	            scrollFactorY = scrollFactorX;
	        }

	        var layer = this.getLayer(name);
	        if (!layer) {
	            return this;
	        }
	        layer.scrollFactorX = scrollFactorX;
	        layer.scrollFactorY = scrollFactorY;
	        var children = layer.getAll();
	        for (var i = 0, cnt = children.length; i < cnt; i++) {
	            children[i].setScrollFactor(scrollFactorX, scrollFactorY);
	        }

	        return this;
	    }
	};

	const ArrayUtils = Phaser.Utils.Array;

	const BringMeToTop = function () {
	    var list;
	    if (this.parentContainer) {
	        list = this.parentContainer.list;
	    } else if (this.displayList) {
	        list = this.displayList.list;
	    }
	    if (!list) {
	        return this;
	    }

	    ArrayUtils.BringToTop(list, this);

	    return this;
	};

	const SendMeToBack = function () {
	    var list;
	    if (this.parentContainer) {
	        list = this.parentContainer.list;
	    } else if (this.displayList) {
	        list = this.displayList.list;
	    }
	    if (!list) {
	        return this;
	    }

	    ArrayUtils.SendToBack(list, this);

	    return this;
	};

	const MoveMyDepthBelow = function (gameObject) {
	    var list;
	    if (gameObject.parentContainer) {
	        list = gameObject.parentContainer.list;
	        if (list.indexOf(this) === -1) {
	            gameObject.parentContainer.add(this);
	        }
	    } else if (gameObject.displayList) {
	        list = gameObject.displayList.list;
	        if (list.indexOf(this) === -1) {
	            gameObject.displayList.add(this);
	        }
	    }
	    if (!list) {
	        return this;
	    }

	    ArrayUtils.MoveBelow(list, this, gameObject);

	    return this;
	};

	const MoveMyDepthAbove = function (gameObject) {
	    var list;
	    if (gameObject.parentContainer) {
	        list = gameObject.parentContainer.list;
	        if (list.indexOf(this) === -1) {
	            if (gameObject.isRexContainerLite) {
	                gameObject.addToContainer(gameObject.parentContainer);
	            } else {
	                gameObject.parentContainer.add(gameObject);
	            }
	        }
	    } else if (gameObject.displayList) {
	        list = gameObject.displayList.list;
	        if (list.indexOf(this) === -1) {
	            if (gameObject.isRexContainerLite) {
	                gameObject.addToLayer(gameObject.displayList);
	            } else {
	                gameObject.displayList.add(gameObject);
	            }
	        }
	    }
	    if (!list) {
	        return this;
	    }

	    ArrayUtils.MoveAbove(list, this, gameObject);

	    return this;
	};

	var DisplayListMethods = {
	    bringMeToTop: BringMeToTop,

	    sendMeToBack: SendMeToBack,

	    moveMyDepthBelow: MoveMyDepthBelow,

	    moveMyDepthAbove: MoveMyDepthAbove,
	};

	var DepthMethods = {

	    bringLayerToTop(layerName) {
	        var layer = this.getLayer(layerName);
	        if(!layer) {
	            return this;
	        }

	        DisplayListMethods.bringMeToTop.call(layer);

	        return this;
	    },

	    sendLayerToBack(layerName) {
	        var layer = this.getLayer(layerName);
	        if(!layer) {
	            return this;
	        }

	        DisplayListMethods.sendMeToBack.call(layer);

	        return this;
	    },

	    moveLayerBelow(layerName, baseLayerName) {
	        if (layerName === baseLayerName) {
	            return this;
	        }

	        var layer = this.getLayer(layerName);
	        var baseLayer = this.getLayer(baseLayerName);
	        if (!layer || !baseLayer) {
	            return this;
	        }

	        DisplayListMethods.moveMyDepthBelow.call(layer, baseLayer);

	        return this;
	    },

	    moveLayerAbove(layerName, baseLayerName) {
	        if (layerName === baseLayerName) {
	            return this;
	        }

	        var layer = this.getLayer(layerName);
	        var baseLayer = this.getLayer(baseLayerName);
	        if (!layer || !baseLayer) {
	            return this;
	        }

	        DisplayListMethods.moveMyDepthAbove.call(layer, baseLayer);

	        return this;
	    },

	};

	const SetCamera = GOManager.prototype.setCamera;
	var CameraMethods$1 = {
	    setCamera(layerName, cameraName) {
	        // Add a new camera if target camera is not existing
	        var camera = GetCameraByName(this.scene, cameraName);
	        if (!camera) {
	            camera = this.scene.cameras.add(undefined, undefined, undefined, undefined, false, cameraName);
	        }
	        SetCamera.call(this, layerName, camera);
	        return this;
	    },
	};

	var methods$2 = {

	};

	Object.assign(
	    methods$2,
	    LayerMethods,
	    ScrollFactorMethods,
	    DepthMethods,
	    CameraMethods$1,
	);

	const GetValue$e = Phaser.Utils.Objects.GetValue;

	class LayerManager extends GOManager {
	    constructor(scene, config) {
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

	        super(scene, config);

	        var rootLayer = GetValue$e(config, 'rootLayer');
	        this.setRootLayer(rootLayer);

	        var initLayers = GetValue$e(config, 'layers');
	        if (initLayers) {
	            for (var i = 0, cnt = initLayers.length; i < cnt; i++) {
	                var layerConfig = initLayers[i];
	                if (typeof (layerConfig) === 'string') {
	                    this.add(layerConfig);
	                } else {
	                    var layerName = layerConfig.name;

	                    this.add(layerName);

	                    var scrollFactor = layerConfig.scrollFactor;
	                    var scrollFactorX = GetValue$e(layerConfig, 'scrollFactorX', scrollFactor);
	                    var scrollFactorY = GetValue$e(layerConfig, 'scrollFactorY', scrollFactor);
	                    if (scrollFactorX !== undefined) {
	                        this.setScrollFactor(layerName, scrollFactorX, scrollFactorY);
	                    }

	                    this.setCamera(layerName, layerConfig.cameraName);

	                }
	            }
	        }
	    }

	    setCreateGameObjectCallback(callback, scope) {
	        if (!callback) {
	            callback = CreateLayer;
	        }
	        super.setCreateGameObjectCallback(callback, scope);
	        return this;
	    }

	    setRootLayer(rootLayer) {
	        if (rootLayer === this.rootLayer) {
	            return this;
	        }

	        var currentLayers = this.getAllGO();
	        if (rootLayer) {
	            rootLayer.add(currentLayers);
	        } else {
	            this.scene.displayList.add(currentLayers);
	        }

	        this.rootLayer = rootLayer;

	        return this;
	    }

	    // Override
	    addGO(name, gameObject) {
	        super.addGO(name, gameObject);
	        gameObject.name = name;

	        if (this.rootLayer) {
	            this.rootLayer.add(gameObject);
	        }

	        return this;
	    }

	    // Override
	    get(name, out) {
	        if (IsGameObject(name)) {
	            var layer = GetLayer(name);
	            if (!layer) {
	                return undefined;
	            }
	            name = layer.name;
	            if (!name) {
	                return undefined;
	            }
	        }

	        return super.get(name, out);
	    }

	}

	var CreateLayer = function (scene, depth) {
	    var layer = scene.add.layer();
	    if (depth !== undefined) {
	        layer.setDepth(depth);
	    }
	    return layer;
	};

	Object.assign(
	    LayerManager.prototype,
	    methods$2
	);

	const SceneClass = Phaser.Scene;
	var IsSceneObject = function (object) {
	    return (object instanceof SceneClass);
	};

	var GetSoundManager = function (game) {
	    if (IsSceneObject(game)) {
	        return game.sys.sound;
	    }
	    return game.sound;
	};

	var HasaAudio = function (key) {
	    return this.sound.game.cache.audio.has(key);
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

	const GetValue$d = Phaser.Utils.Objects.GetValue;

	class ComponentBase {
	    constructor(parent, config) {
	        this.setParent(parent);  // gameObject, scene, or game

	        this.isShutdown = false;

	        // Event emitter, default is private event emitter
	        this.setEventEmitter(GetValue$d(config, 'eventEmitter', true));

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

	const GetValue$c = Phaser.Utils.Objects.GetValue;

	class TickTask extends ComponentBase {
	    constructor(parent, config) {
	        super(parent, config);

	        this._isRunning = false;
	        this.isPaused = false;
	        this.tickingState = false;
	        this.setTickingMode(GetValue$c(config, 'tickingMode', 1));
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

	const GetValue$b = Phaser.Utils.Objects.GetValue;

	class SceneUpdateTickTask extends TickTask {
	    constructor(parent, config) {
	        super(parent, config);

	        // scene update : update, preupdate, postupdate, prerender, render
	        // game update : step, poststep, 

	        // If this.scene is not available, use game's 'step' event
	        var defaultEventName = (this.scene) ? 'update' : 'step';
	        this.tickEventName = GetValue$b(config, 'tickEventName', defaultEventName);
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

	const GetValue$a = Phaser.Utils.Objects.GetValue;
	const Clamp$1 = Phaser.Math.Clamp;

	let Timer$1 = class Timer {
	    constructor(config) {
	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.state = GetValue$a(o, 'state', IDLE);
	        this.timeScale = GetValue$a(o, 'timeScale', 1);
	        this.delay = GetValue$a(o, 'delay', 0);
	        this.repeat = GetValue$a(o, 'repeat', 0);
	        this.repeatCounter = GetValue$a(o, 'repeatCounter', 0);
	        this.repeatDelay = GetValue$a(o, 'repeatDelay', 0);
	        this.duration = GetValue$a(o, 'duration', 0);
	        this.nowTime = GetValue$a(o, 'nowTime', 0);
	        this.justRestart = GetValue$a(o, 'justRestart', false);
	    }

	    toJSON() {
	        return {
	            state: this.state,
	            timeScale: this.timeScale,
	            delay: this.delay,
	            repeat: this.repeat,
	            repeatCounter: this.repeatCounter,
	            repeatDelay: this.repeatDelay,
	            duration: this.duration,
	            nowTime: this.nowTime,
	            justRestart: this.justRestart,
	        }
	    }

	    destroy() {

	    }

	    setTimeScale(timeScale) {
	        this.timeScale = timeScale;
	        return this;
	    }

	    setDelay(delay) {
	        if (delay === undefined) {
	            delay = 0;
	        }
	        this.delay = delay;
	        return this;
	    }

	    setDuration(duration) {
	        this.duration = duration;
	        return this;
	    }

	    setRepeat(repeat) {
	        this.repeat = repeat;
	        return this;
	    }

	    setRepeatInfinity() {
	        this.repeat = -1;
	        return this;
	    }

	    setRepeatDelay(repeatDelay) {
	        this.repeatDelay = repeatDelay;
	        return this;
	    }

	    start() {
	        this.nowTime = (this.delay > 0) ? -this.delay : 0;
	        this.state = (this.nowTime >= 0) ? COUNTDOWN : DELAY;
	        this.repeatCounter = 0;
	        return this;
	    }

	    stop() {
	        this.state = IDLE;
	        return this;
	    }

	    update(time, delta) {
	        if (this.state === IDLE || this.state === DONE ||
	            delta === 0 || this.timeScale === 0
	        ) {
	            return;
	        }

	        this.nowTime += (delta * this.timeScale);
	        this.justRestart = false;
	        if (this.nowTime >= this.duration) {
	            if ((this.repeat === -1) || (this.repeatCounter < this.repeat)) {
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

	    get t() {
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
	    }

	    set t(value) {
	        value = Clamp$1(value, -1, 1);
	        if (value < 0) {
	            this.state = DELAY;
	            this.nowTime = -this.delay * value;
	        } else {
	            this.state = COUNTDOWN;
	            this.nowTime = this.duration * value;

	            if ((value === 1) && (this.repeat !== 0)) {
	                this.repeatCounter++;
	            }
	        }
	    }

	    setT(t) {
	        this.t = t;
	        return this;
	    }

	    get isIdle() {
	        return this.state === IDLE;
	    }

	    get isDelay() {
	        return this.state === DELAY;
	    }

	    get isCountDown() {
	        return this.state === COUNTDOWN;
	    }

	    get isRunning() {
	        return this.state === DELAY || this.state === COUNTDOWN;
	    }

	    get isDone() {
	        return this.state === DONE;
	    }

	    get isOddIteration() {
	        return (this.repeatCounter & 1) === 1;
	    }

	    get isEvenIteration() {
	        return (this.repeatCounter & 1) === 0;
	    }

	};

	const IDLE = 0;
	const DELAY = 1;
	const COUNTDOWN = 2;
	const REPEATDELAY = 3;
	const DONE = -1;

	class TimerTickTask extends SceneUpdateTickTask {
	    constructor(parent, config) {
	        super(parent, config);
	        this.timer = new Timer$1();
	        // boot() later 
	    }

	    // override
	    shutdown(fromScene) {
	        // Already shutdown
	        if (this.isShutdown) {
	            return;
	        }

	        super.shutdown(fromScene);
	        this.timer.destroy();
	        this.timer = undefined;
	    }

	    start() {
	        this.timer.start();
	        super.start();
	        return this;
	    }

	    stop() {
	        this.timer.stop();
	        super.stop();
	        return this;
	    }

	    complete() {
	        this.timer.stop();
	        super.complete();
	        return this;
	    }

	}

	const GetValue$9 = Phaser.Utils.Objects.GetValue;
	const GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
	const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

	class EaseValueTaskBase extends TimerTickTask {
	    resetFromJSON(o) {
	        this.timer.resetFromJSON(GetValue$9(o, 'timer'));
	        this.setEnable(GetValue$9(o, 'enable', true));
	        this.setTarget(GetValue$9(o, 'target', this.parent));
	        this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
	        this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
	        this.setEase(GetValue$9(o, 'ease', 'Linear'));
	        this.setRepeat(GetValue$9(o, 'repeat', 0));

	        return this;
	    }

	    setEnable(e) {
	        if (e == undefined) {
	            e = true;
	        }
	        this.enable = e;
	        return this;
	    }

	    setTarget(target) {
	        if (target === undefined) {
	            target = this.parent;
	        }
	        this.target = target;
	        return this;
	    }

	    setDelay(time) {
	        this.delay = time;
	        // Assign `this.timer.setRepeat(repeat)` manually
	        return this;
	    }

	    setDuration(time) {
	        this.duration = time;
	        return this;
	    }

	    setRepeat(repeat) {
	        this.repeat = repeat;
	        // Assign `this.timer.setRepeat(repeat)` manually
	        return this;
	    }

	    setRepeatDelay(repeatDelay) {
	        this.repeatDelay = repeatDelay;
	        // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
	        return this;
	    }

	    setEase(ease) {
	        if (ease === undefined) {
	            ease = 'Linear';
	        }
	        this.ease = ease;
	        this.easeFn = GetEaseFunction(ease);
	        return this;
	    }

	    // Override
	    start() {
	        // Ignore start if timer is running, i.e. in DELAY, o RUN state
	        if (this.timer.isRunning) {
	            return this;
	        }

	        super.start();
	        return this;
	    }

	    restart() {
	        this.timer.stop();
	        this.start.apply(this, arguments);
	        return this;
	    }

	    stop(toEnd) {
	        if (toEnd === undefined) {
	            toEnd = false;
	        }

	        super.stop();

	        if (toEnd) {
	            this.timer.setT(1);
	            this.updateTarget(this.target, this.timer);
	            this.complete();
	        }

	        return this;
	    }

	    update(time, delta) {
	        if (
	            (!this.isRunning) ||
	            (!this.enable) ||
	            (this.parent.hasOwnProperty('active') && !this.parent.active)
	        ) {
	            return this;
	        }

	        var target = this.target,
	            timer = this.timer;

	        timer.update(time, delta);

	        // isDelay, isCountDown, isDone
	        if (!timer.isDelay) {
	            this.updateTarget(target, timer);
	        }

	        this.emit('update', target, this);

	        if (timer.isDone) {
	            this.complete();
	        }

	        return this;
	    }

	    // Override
	    updateTarget(target, timer) {

	    }
	}

	const SoundObjectClass = Phaser.Sound.BaseSound;
	var IsSoundObject = function (object) {
	    return (object instanceof SoundObjectClass);
	};

	const GetValue$8 = Phaser.Utils.Objects.GetValue;
	const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
	const Linear = Phaser.Math.Linear;

	class Fade extends EaseValueTaskBase {
	    constructor(scene, sound, config) {
	        if (IsSoundObject(scene)) {
	            config = sound;
	            sound = scene;
	            scene = undefined;
	        }

	        sound.active = true;
	        sound.scene = scene;
	        sound.game = sound.manager.game;

	        super(sound, config);
	        // this.parent = parent
	        // this.timer

	        this.volume = {};
	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        super.resetFromJSON(o);
	        this.setMode(GetValue$8(o, 'mode', 0));
	        this.setEnable(GetValue$8(o, 'enable', true));
	        this.setVolumeRange(
	            GetAdvancedValue(o, 'volume.start', this.parent.volume),
	            GetAdvancedValue(o, 'volume.end', 0)
	        );
	        return this;
	    }

	    setMode(m) {
	        if (typeof (m) === 'string') {
	            m = MODE[m];
	        }
	        this.mode = m;
	        return this;
	    }

	    setVolumeRange(start, end) {
	        this.volume.start = start;
	        this.volume.end = end;
	        return this;
	    }

	    start() {
	        if (this.timer.isRunning) {
	            return this;
	        }

	        this.parent.setVolume(this.volume.start);

	        this.timer
	            .setDelay(this.delay)
	            .setDuration(this.duration);

	        super.start();
	        return this;
	    }

	    updateTarget(parent, timer) {
	        parent.volume = Linear(this.volume.start, this.volume.end, timer.t);
	    }

	    complete() {
	        super.complete();

	        switch (this.mode) {
	            case 1:
	                this.parent.stop();
	                break;
	            case 2:
	                this.parent.stop();
	                this.parent.destroy();
	                break;
	        }

	        return this;
	    }
	}

	const MODE = {
	    stop: 1,
	    destroy: 2
	};

	var FadeIn = function (scene, sound, duration, endVolume, startVolume) {
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
	    if (typeof (sound) === 'string') {
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

	var FadeOut = function (scene, sound, duration, destroy) {
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
	        mode: ((destroy) ? 2 : 1), // 1: stop, 2: destroy
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

	const GetValue$7 = Phaser.Utils.Objects.GetValue;

	var BackgroundMusicMethods$1 = {
	    setBackgroundMusicLoop(value) {
	        if (value === undefined) {
	            value = true;
	        }

	        this.backgroundMusicLoop = value;
	        return this;
	    },

	    setBackgroundMusicFadeTime(time) {
	        this.backgroundMusicFadeTime = time;
	        return this;
	    },

	    getBackgroundMusic() {
	        return this.backgroundMusic;
	    },

	    // Internal method
	    setCurrentBackgroundMusic(music) {
	        this.backgroundMusic = music;

	        if (music) {
	            music
	                .once('complete', function () {
	                    if (this.backgroundMusic === music) {
	                        this.backgroundMusic.destroy();
	                        this.backgroundMusic = undefined;
	                    }
	                }, this)
	                .once('destroy', function () {
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

	    playBackgroundMusic(key, config) {
	        if (!this.hasAudio(key)) {
	            console.error(`[Sound manager] Audio key'${key}' is not existed`);
	            return this;
	        }

	        // Don't re-play the same background music
	        if (this.backgroundMusic && (this.backgroundMusic.key === key)) {
	            return this;
	        }

	        this.stopBackgroundMusic(); // Stop previous background music

	        var music = this.sound.add(key, {
	            loop: GetValue$7(config, 'loop', this.backgroundMusicLoop),
	            mute: GetValue$7(config, 'mute', this.backgroundMusicMute),
	            volume: GetValue$7(config, 'volume', this.backgroundMusicVolume),
	            detune: GetValue$7(config, 'detune', 0),
	            rate: GetValue$7(config, 'rate', 1),
	        });

	        this.setCurrentBackgroundMusic(music);

	        // Fade volume
	        if (this.backgroundMusicFadeTime > 0) {
	            this.fadeInBackgroundMusic(this.backgroundMusicFadeTime);
	        }
	        return this;
	    },

	    pauseBackgroundMusic() {
	        if (this.backgroundMusic) {
	            this.backgroundMusic.pause();
	        }
	        return this;
	    },

	    resumeBackgroundMusic() {
	        if (this.backgroundMusic) {
	            this.backgroundMusic.resume();
	        }
	        return this;
	    },

	    stopBackgroundMusic() {
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

	    fadeInBackgroundMusic(time) {
	        if (this.backgroundMusic) {
	            FadeIn(this.backgroundMusic, time, this.backgroundMusicVolume, 0);
	        }

	        return this;
	    },

	    fadeOutBackgroundMusic(time, isStopped) {
	        if (this.backgroundMusic) {
	            FadeOut(this.backgroundMusic, time, isStopped);
	        }

	        return this;
	    },

	    crossFadeBackgroundMusic(key, time) {
	        if (!this.hasAudio(key)) {
	            console.error(`[Sound manager] Audio key'${key}' is not existed`);
	            return this;
	        }

	        var backgroundMusicFadeTimeSave = this.backgroundMusicFadeTime;
	        this.backgroundMusicFadeTime = 0;

	        this
	            .fadeOutBackgroundMusic(time, true)
	            .playBackgroundMusic(key)
	            .fadeInBackgroundMusic(time);

	        this.backgroundMusicFadeTime = backgroundMusicFadeTimeSave;

	        return this;
	    },

	    setBackgroundMusicMute(mute) {
	        if (mute === undefined) {
	            mute = true;
	        }

	        this.backgroundMusicMute = mute;
	        return this;
	    },


	    setBackgroundMusicVolume(volume) {
	        this.backgroundMusicVolume = volume;
	        return this;
	    },

	    setBackgroundMusicRate(rate) {
	        if (this.backgroundMusic) {
	            this.backgroundMusic.setRate(rate);
	        }
	        return this;
	    },

	    setBackgroundMusicDetune(detune) {
	        if (this.backgroundMusic) {
	            this.backgroundMusic.setDetune(detune);
	        }
	        return this;
	    },



	};

	const GetValue$6 = Phaser.Utils.Objects.GetValue;

	var BackgroundMusic2Methods$1 = {
	    setBackgroundMusic2Loop(value) {
	        if (value === undefined) {
	            value = true;
	        }

	        this.backgroundMusic2Loop = value;
	        return this;
	    },

	    setBackgroundMusic2FadeTime(time) {
	        this.backgroundMusic2FadeTime = time;
	        return this;
	    },

	    getBackgroundMusic2() {
	        return this.backgroundMusic2;
	    },

	    // Internal method
	    setCurrentBackgroundMusic2(music) {
	        this.backgroundMusic2 = music;

	        if (music) {
	            music
	                .once('complete', function () {
	                    if (this.backgroundMusic2 === music) {
	                        this.backgroundMusic2.destroy();
	                        this.backgroundMusic2 = undefined;
	                    }
	                }, this)
	                .once('destroy', function () {
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

	    playBackgroundMusic2(key, config) {
	        if (!this.hasAudio(key)) {
	            console.error(`[Sound manager] Audio key'${key}' is not existed`);
	            return this;
	        }

	        // Don't re-play the same background music
	        if (this.backgroundMusic2 && (this.backgroundMusic2.key === key)) {
	            return this;
	        }

	        this.stopBackgroundMusic2(); // Stop previous background music

	        var music = this.sound.add(key, {
	            loop: GetValue$6(config, 'loop', this.backgroundMusicLoop),
	            mute: GetValue$6(config, 'mute', this.backgroundMusic2Mute),
	            volume: GetValue$6(config, 'volume', this.backgroundMusic2Volume),
	            detune: GetValue$6(config, 'detune', 0),
	            rate: GetValue$6(config, 'rate', 1),
	        });

	        this.setCurrentBackgroundMusic2(music);

	        // Fade volume
	        if (this.backgroundMusic2FadeTime > 0) {
	            this.fadeInBackgroundMusic2(this.backgroundMusic2FadeTime);
	        }
	        return this;
	    },

	    pauseBackgroundMusic2() {
	        if (this.backgroundMusic2) {
	            this.backgroundMusic2.pause();
	        }
	        return this;
	    },

	    resumeBackgroundMusic2() {
	        if (this.backgroundMusic2) {
	            this.backgroundMusic2.resume();
	        }
	        return this;
	    },

	    stopBackgroundMusic2() {
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

	    fadeInBackgroundMusic2(time) {
	        if (this.backgroundMusic2) {
	            FadeIn(this.backgroundMusic2, time, this.backgroundMusic2Volume, 0);
	        }

	        return this;
	    },

	    fadeOutBackgroundMusic2(time, isStopped) {
	        if (this.backgroundMusic2) {
	            FadeOut(this.backgroundMusic2, time, isStopped);
	        }

	        return this;
	    },

	    crossFadeBackgroundMusic2(key, time) {
	        if (!this.hasAudio(key)) {
	            console.error(`[Sound manager] Audio key'${key}' is not existed`);
	            return this;
	        }

	        var backgroundMusic2FadeTimeSave = this.backgroundMusic2FadeTime;
	        this.backgroundMusic2FadeTime = 0;

	        this
	            .fadeOutBackgroundMusic2(time, true)
	            .playBackgroundMusic2(key)
	            .fadeInBackgroundMusic2(time);

	        this.backgroundMusic2FadeTime = backgroundMusic2FadeTimeSave;

	        return this;
	    },

	    setBackgroundMusic2Mute(mute) {
	        if (mute === undefined) {
	            mute = true;
	        }

	        this.backgroundMusic2Mute = mute;
	        return this;
	    },

	    setBackgroundMusic2Volume(volume) {
	        this.backgroundMusic2Volume = volume;
	        return this;
	    },

	    setBackgroundMusic2Rate(rate) {
	        if (this.backgroundMusic2) {
	            this.backgroundMusic2.setRate(rate);
	        }
	        return this;
	    },

	    setBackgroundMusic2Detune(detune) {
	        if (this.backgroundMusic2) {
	            this.backgroundMusic2.setDetune(detune);
	        }
	        return this;
	    },

	};

	const RemoveItem$1 = Phaser.Utils.Array.Remove;
	const GetValue$5 = Phaser.Utils.Objects.GetValue;

	var SoundEffectsMethods$1 = {

	    getSoundEffects() {
	        return this.soundEffects;
	    },

	    getLastSoundEffect() {
	        return this.soundEffects[this.soundEffects.length - 1];
	    },

	    playSoundEffect(key, config) {
	        if (!this.hasAudio(key)) {
	            console.error(`[Sound manager] Audio key'${key}' is not existed`);
	            return this;
	        }

	        var music = this.sound.add(key, {
	            mute: GetValue$5(config, 'mute', this.soundEffectsMute),
	            volume: GetValue$5(config, 'volume', this.soundEffectsVolume),
	            detune: GetValue$5(config, 'detune', 0),
	            rate: GetValue$5(config, 'rate', 1),
	        });


	        this.soundEffects.push(music);

	        music
	            .once('complete', function () {
	                music.destroy();

	                // SoundManager has been destroyed
	                if (!this.sound) {
	                    return;
	                }
	                RemoveItem$1(this.soundEffects, music);
	            }, this)
	            .once('destroy', function () {
	                // SoundManager has been destroyed
	                if (!this.sound) {
	                    return;
	                }
	                RemoveItem$1(this.soundEffects, music);
	            }, this)
	            .play();

	        return this;
	    },

	    stopAllSoundEffects() {
	        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
	            var soundEffect = this.soundEffects[i];
	            soundEffect.stop();
	            soundEffect.destroy();
	        }

	        return this;
	    },

	    fadeInSoundEffect(time) {
	        var soundEffect = this.getLastSoundEffect();
	        if (soundEffect) {
	            FadeIn(soundEffect, time, this.soundEffectsVolume, 0);
	        }

	        return this;
	    },

	    fadeOutSoundEffect(time, isStopped) {
	        var soundEffect = this.getLastSoundEffect();
	        if (soundEffect) {
	            FadeOut(soundEffect, time, isStopped);
	        }

	        return this;
	    },

	    fadeOutAllSoundEffects(time, isStopped) {
	        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
	            FadeOut(this.soundEffects[i], time, isStopped);
	        }

	        return this;
	    },

	    setSoundEffectMute(mute, lastSoundEffect) {
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
	    },

	    setSoundEffectVolume(volume, lastSoundEffect) {
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

	    setSoundEffectDetune(detune, lastSoundEffect) {
	        if (lastSoundEffect === undefined) {
	            lastSoundEffect = false;
	        }

	        var soundEffects;
	        if (lastSoundEffect) {
	            soundEffects = [this.getLastSoundEffect()];
	        } else {
	            soundEffects = this.soundEffects;
	        }

	        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
	            soundEffects[i].setDetune(detune);
	        }

	        return this;
	    },

	    setSoundEffectRate(rate, lastSoundEffect) {
	        if (lastSoundEffect === undefined) {
	            lastSoundEffect = false;
	        }

	        var soundEffects;
	        if (lastSoundEffect) {
	            soundEffects = [this.getLastSoundEffect()];
	        } else {
	            soundEffects = this.soundEffects;
	        }

	        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
	            soundEffects[i].setRate(rate);
	        }

	        return this;
	    },
	};

	const RemoveItem = Phaser.Utils.Array.Remove;
	const GetValue$4 = Phaser.Utils.Objects.GetValue;

	var SoundEffects2Methods$1 = {

	    getSoundEffects2() {
	        return this.soundEffects2;
	    },

	    getLastSoundEffect2() {
	        return this.soundEffects2[this.soundEffects2.length - 1];
	    },

	    playSoundEffect2(key, config) {
	        if (!this.hasAudio(key)) {
	            console.error(`[Sound manager] Audio key'${key}' is not existed`);
	            return this;
	        }

	        var music = this.sound.add(key, {
	            mute: GetValue$4(config, 'mute', this.soundEffects2Mute),
	            volume: GetValue$4(config, 'volume', this.soundEffects2Volume),
	            detune: GetValue$4(config, 'detune', 0),
	            rate: GetValue$4(config, 'rate', 1),
	        });

	        this.soundEffects2.push(music);

	        music
	            .once('complete', function () {
	                music.destroy();

	                // SoundManager has been destroyed
	                if (!this.sound) {
	                    return;
	                }
	                RemoveItem(this.soundEffects2, music);
	            }, this)
	            .once('destroy', function () {
	                // SoundManager has been destroyed
	                if (!this.sound) {
	                    return;
	                }
	                RemoveItem(this.soundEffects2, music);
	            }, this)
	            .play();

	        return this;
	    },

	    stopAllSoundEffects2() {
	        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
	            var soundEffect = this.soundEffects[i];
	            soundEffect.stop();
	            soundEffect.destroy();
	        }

	        return this;
	    },

	    fadeInSoundEffect2(time) {
	        var soundEffect = this.getLastSoundEffect2();
	        if (soundEffect) {
	            FadeIn(soundEffect, time, this.soundEffects2Volume, 0);
	        }

	        return this;
	    },

	    fadeOutSoundEffect2(time, isStopped) {
	        var soundEffect = this.getLastSoundEffect2();
	        if (soundEffect) {
	            FadeOut(soundEffect, time, isStopped);
	        }

	        return this;
	    },

	    fadeOutAllSoundEffects2(time, isStopped) {
	        for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
	            FadeOut(this.soundEffects2[i], time, isStopped);
	        }

	        return this;
	    },

	    setSoundEffect2Mute(mute, lastSoundEffect) {
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
	    },

	    setSoundEffect2Volume(volume, lastSoundEffect) {
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

	    setSoundEffect2Detune(detune, lastSoundEffect) {
	        if (lastSoundEffect === undefined) {
	            lastSoundEffect = false;
	        }

	        var soundEffects;
	        if (lastSoundEffect) {
	            soundEffects = [this.getLastSoundEffect2()];
	        } else {
	            soundEffects = this.soundEffects2;
	        }

	        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
	            soundEffects[i].setDetune(detune);
	        }

	        return this;
	    },

	    setSoundEffect2Rate(rate, lastSoundEffect) {
	        if (lastSoundEffect === undefined) {
	            lastSoundEffect = false;
	        }

	        var soundEffects;
	        if (lastSoundEffect) {
	            soundEffects = [this.getLastSoundEffect2()];
	        } else {
	            soundEffects = this.soundEffects2;
	        }

	        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
	            soundEffects[i].setRate(rate);
	        }

	        return this;
	    },
	};

	var Methods$1 = {
	    hasAudio: HasaAudio
	};

	Object.assign(
	    Methods$1,
	    BackgroundMusicMethods$1,
	    BackgroundMusic2Methods$1,
	    SoundEffectsMethods$1,
	    SoundEffects2Methods$1,
	);

	const GetValue$3 = Phaser.Utils.Objects.GetValue;

	class SoundManager {
	    constructor(game, config) {
	        this.sound = GetSoundManager(game);

	        // Background music will be (fade out)destroyed when play next one.
	        this.backgroundMusic = undefined;
	        this._backgroundMusicVolume = GetValue$3(config, 'bgm.volume', 1);
	        this._backgroundMusicMute = GetValue$3(config, 'bgm.mute', false);

	        this.setBackgroundMusicLoop(GetValue$3(config, 'bgm.loop', true));
	        this.setBackgroundMusicFadeTime(GetValue$3(config, 'bgm.fade', 500));

	        this.backgroundMusic2 = undefined;
	        this._backgroundMusic2Volume = GetValue$3(config, 'bgm2.volume', 1);
	        this._backgroundMusic2Mute = GetValue$3(config, 'bgm2.mute', false);

	        this.setBackgroundMusic2Loop(GetValue$3(config, 'bgm2.loop', true));
	        this.setBackgroundMusic2FadeTime(GetValue$3(config, 'bgm2.fade', 500));

	        // Sound effect will be destroyed when completed
	        this.soundEffects = [];
	        this._soundEffectsVolume = GetValue$3(config, 'soundEffect.volume', 1);

	        this.soundEffects2 = [];
	        this._soundEffects2Volume = GetValue$3(config, 'soundEffect2.volume', 1);


	        var initialBackgroundMusic = GetValue$3(config, 'bgm.initial', undefined);
	        if (initialBackgroundMusic) {
	            this.setCurrentBackgroundMusic(initialBackgroundMusic);
	        }

	        var initialBackgroundMusic2 = GetValue$3(config, 'bgm2.initial', undefined);
	        if (initialBackgroundMusic2) {
	            this.setCurrentBackgroundMusic2(initialBackgroundMusic2);
	        }
	    }

	    destroy() {
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

	    // backgroundMusic
	    // mute
	    get backgroundMusicMute() {
	        return this._backgroundMusicMute;
	    }

	    set backgroundMusicMute(value) {
	        this._backgroundMusicMute = value;
	        if (this.backgroundMusic) {
	            this.backgroundMusic.setMute(mute);
	        }
	    }

	    // volume
	    get backgroundMusicVolume() {
	        return this._backgroundMusicVolume;
	    }

	    set backgroundMusicVolume(value) {
	        this._backgroundMusicVolume = value;
	        if (this.backgroundMusic) {
	            this.backgroundMusic.setVolume(value);
	        }
	    }

	    // backgroundMusic2
	    // mute
	    get backgroundMusic2Mute() {
	        return this._backgroundMusic2Mute;
	    }

	    set backgroundMusic2Mute(value) {
	        this._backgroundMusic2Mute = value;
	        if (this.backgroundMusic2) {
	            this.backgroundMusic2.setMute(mute);
	        }
	    }

	    // volume
	    get backgroundMusic2Volume() {
	        return this._backgroundMusic2Volume;
	    }

	    set backgroundMusic2Volume(value) {
	        this._backgroundMusic2Volume = value;
	        if (this.backgroundMusic2) {
	            this.backgroundMusic2.setVolume(value);
	        }
	    }

	    // soundEffects
	    // mute
	    get soundEffectsMute() {
	        return this._soundEffectsMute;
	    }

	    set soundEffectsMute(value) {
	        this._soundEffectsMute = value;
	        var soundEffects = this.soundEffects;
	        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
	            soundEffects[i].setMute(value);
	        }
	    }

	    // volume
	    get soundEffectsVolume() {
	        return this._soundEffectsVolume;
	    }

	    set soundEffectsVolume(value) {
	        this._soundEffectsVolume = value;
	        var soundEffects = this.soundEffects;
	        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
	            soundEffects[i].setVolume(value);
	        }
	    }

	    // soundEffects2
	    // mute
	    get soundEffects2Mute() {
	        return this._soundEffects2Mute;
	    }

	    set soundEffects2Mute(value) {
	        this._soundEffects2Mute = value;
	        var soundEffects = this.soundEffects;
	        for (var i = 0, cnt = soundEffects2.length; i < cnt; i++) {
	            soundEffects[i].setMute(value);
	        }
	    }

	    // volume
	    get soundEffects2Volume() {
	        return this._soundEffects2Volume;
	    }

	    set soundEffects2Volume(value) {
	        this._soundEffects2Volume = value;
	        var soundEffects = this.soundEffects2;
	        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
	            soundEffects[i].setVolume(value);
	        }
	    }

	}

	Object.assign(
	    SoundManager.prototype,
	    Methods$1
	);

	const GetValue$2 = Phaser.Utils.Objects.GetValue;

	class BaseClock extends TickTask {
	    constructor(parent, config) {
	        super(parent, config);

	        this.resetFromJSON(config);
	        this.boot();
	    }

	    resetFromJSON(o) {
	        this.isRunning = GetValue$2(o, 'isRunning', false);
	        this.timeScale = GetValue$2(o, 'timeScale', 1);
	        this.now = GetValue$2(o, 'now', 0);
	        return this;
	    }

	    toJSON() {
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

	    start(startAt) {
	        if (startAt === undefined) {
	            startAt = 0;
	        }
	        this.delta = 0;
	        this.now = startAt;
	        super.start();
	        return this;
	    }

	    seek(time) {
	        this.now = time;
	        return this;
	    }

	    setTimeScale(value) {
	        this.timeScale = value;
	        return this;
	    }

	    tick(delta) {
	        delta *= this.timeScale;
	        this.now += delta;
	        this.delta = delta;
	        this.emit('update', this.now, this.delta);
	        return this;
	    }
	}

	class Clock extends BaseClock {
	    startTicking() {
	        super.startTicking();
	        this.scene.sys.events.on('update', this.update, this);
	    }

	    stopTicking() {
	        super.stopTicking();
	        if (this.scene) { // Scene might be destoryed
	            this.scene.sys.events.off('update', this.update, this);
	        }
	    }

	    update(time, delta) {
	        if ((!this.isRunning) || (this.timeScale === 0)) {
	            return this;
	        }
	        this.tick(delta);
	        return this;
	    }
	}

	var Yoyo = function (t, threshold) {
	    if (threshold === undefined) {
	        threshold = 0.5;
	    }
	    if (t <= threshold) {
	        t = t / threshold;
	    } else {
	        t = 1 - ((t - threshold) / (1 - threshold));
	    }

	    return t;
	};

	const Clamp = Phaser.Math.Clamp;

	class Timer {
	    constructor(timeline, config) {
	        this
	            .setTimeline(timeline)
	            .reset(config);
	    }

	    setTimeline(timeline) {
	        this.timeline = timeline;
	        return this;
	    }

	    setName(name) {
	        this.name = name;
	        return this;
	    }

	    setCallbacks(target, onStart, onProgress, onComplete) {
	        this.target = target;
	        this.onStart = onStart;
	        this.onProgress = onProgress;
	        this.onComplete = onComplete;
	        return this;
	    }

	    setDuration(duration, yoyo) {
	        if (yoyo === undefined) {
	            yoyo = false;
	        }
	        this.duration = duration;
	        this.remainder = duration;
	        this.t = 0;
	        this.yoyo = yoyo;
	        return this;
	    }

	    setPaused(state) {
	        this.isPaused = state;
	        return this;
	    }

	    pause() {
	        this.isPaused = true;
	        return this;
	    }

	    resume() {
	        this.isPaused = false;
	        return this;
	    }

	    setRemoved(state) {
	        this.removed = state;
	        return this;
	    }

	    remove() {
	        this.removed = true;
	        return this;
	    }

	    seek(t) {
	        this.remainder = this.duration * (1 - t);
	        return this;
	    }

	    reset(o) {
	        this
	            .setName(o.name)
	            .setDuration(o.duration, o.yoyo)
	            .setCallbacks(o.target, o.onStart, o.onProgress, o.onComplete)
	            .setPaused(false)
	            .setRemoved(false);
	        return this;
	    }

	    onFree() {
	        this
	            .setTimeline()
	            .setCallbacks();
	    }

	    getProgress() {
	        var value = 1 - (this.remainder / this.duration);
	        value = Clamp(value, 0, 1);
	        if (this.yoyo) {
	            value = Yoyo(value);
	        }
	        return value;
	    }

	    setProgress(value) {
	        value = Clamp(value, 0, 1);
	        this.remainder = this.duration * (1 - value);
	    }

	    runCallback(callback) {
	        if (!callback) {
	            return;
	        }
	        callback(this.target, this.t, this);
	    }

	    update(time, delta) {
	        if (this.removed) {
	            return true;
	        } else if (this.isPaused) {
	            return false;
	        }

	        this.remainder -= delta;
	        this.t = this.getProgress();
	        this.runCallback(this.onProgress);

	        var isCompleted = (this.remainder <= 0);
	        if (isCompleted) {
	            this.runCallback(this.onComplete);
	        }
	        return isCompleted;
	    }
	}

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

	let TimerPool$1 = class TimerPool extends Stack {
	    allocate() {
	        return this.pop();
	    }

	    free(timer) {
	        timer.onFree();
	        this.push(timer);
	    }

	    freeMultiple(arr) {
	        for (var i = 0, cnt = arr.length; i < cnt; i++) {
	            this.free(arr[i]);
	        }
	        return this;
	    }
	};

	const GetValue$1 = Phaser.Utils.Objects.GetValue;
	const TimerPool = new TimerPool$1();

	class Timeline extends Clock {
	    constructor(parent, config) {
	        super(parent, config);

	        this.addedTimers = [];
	        this.timers = [];
	        this.timerPool = GetValue$1(config, 'pool', TimerPool);
	    }

	    shutdown() {
	        // Already shutdown
	        if (this.isShutdown) {
	            return;
	        }

	        this.timerPool
	            .freeMultiple(this.addedTimers)
	            .freeMultiple(this.timers);

	        this.timerPool = undefined;
	        this.addedTimers = undefined;
	        this.timers = undefined;

	        super.shutdown();
	    }

	    addTimer(config) {
	        var timer = this.timerPool.allocate();
	        if (!timer) {
	            timer = new Timer(this, config);
	        } else {
	            timer
	                .setTimeline(this)
	                .reset(config);
	        }
	        this.addedTimers.push(timer);
	        timer.runCallback(timer.onStart);

	        if (!this.isRunning) {
	            this.start();
	        }
	        return timer;
	    }

	    delayCall(delay, callback, args, scope) {
	        var timer = this.addTimer({
	            duration: delay,
	            onComplete: function (target, t, timer) {
	                if (args === undefined) {
	                    args = [];
	                }
	                args.push(timer);
	                callback.apply(scope, args);
	            }
	        });
	        return timer;
	    }

	    delayEvent(delay, eventName) {       
	        this.removeDelayEvent(eventName);
	        // Clear existed event

	        var timer = this.delayCall(delay, function () {
	            this.removeDelayEvent(eventName);  // Clear this timer
	            this.emit(eventName);           
	        }, [], this);

	        this.once(`_remove.${eventName}`, function () {
	            timer.remove();
	            timer = undefined;
	        });
	        return this;
	    }

	    removeDelayEvent(eventName) {
	        this.emit(`_remove.${eventName}`);
	        return this;
	    }

	    getTimers(name) {
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

	    update(time, delta) {
	        super.update(time, delta);

	        if (!this.isRunning) {
	            return;
	        }

	        this.timers.push(...this.addedTimers);
	        this.addedTimers.length = 0;
	        var pendingTimers = [];
	        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
	            var timer = this.timers[i];
	            var isStopped = timer.update(this.now, this.delta);
	            if (isStopped) {
	                this.timerPool.free(timer);  // Free timer
	            } else {
	                pendingTimers.push(timer);  // Add to timer queue
	            }
	        }
	        this.timers = pendingTimers;

	        if ((this.timers.length === 0) && (this.addedTimers.length === 0)) {
	            this.complete(); // Emit 'complete' event
	        }
	    }
	}

	const WaitCompleteEvent = '_wait.complete';
	const RemoveWaitEvents = '_remove.wait';

	var PreUpdateDelayCall = function (gameObject, delay, callback, scope, args) {
	    // Invoke callback under scene's 'preupdate' event
	    var scene = GetSceneObject(gameObject);
	    var timer = scene.time.delayedCall(delay, function () {
	        scene.sys.events.once('preupdate', function () {
	            callback.call(scope, args);
	        });
	    });
	    return timer;
	};

	class WaitEvent {
	    constructor(parent) {
	        if (!parent) {
	            this.setEventEmitter(true);
	            parent = this;
	        }
	        this.parent = parent;

	        this.waitId = 0;

	        // Override it
	        this.waitCompleteEventName = WaitCompleteEvent;
	        this.removeWaitEventsEventName = RemoveWaitEvents;
	    }

	    destroy() {
	        this.removeWaitEvents();
	        this.clearWaitCompleteCallbacks();
	        this.parent = null;
	    }

	    // Emit completeEvent (default value is 'complete') when eventEmitter firing eventName
	    waitEvent(eventEmitter, eventName, completeNextTick) {
	        var callback = this.getWaitCompleteTriggerCallback(completeNextTick);
	        eventEmitter.once(eventName, callback, this);
	        // Once completeEvent firing, remove pending eventName from eventEmitter
	        this.parent.once(this.removeWaitEventsEventName, function () {
	            eventEmitter.off(eventName, callback, this);
	        });
	        // All pending eventName from eventEmitter will be removed at last
	        return this.parent;
	    }

	    getWaitCompleteTriggerCallback(completeNextTick) {
	        if (completeNextTick === undefined) {
	            completeNextTick = true;
	        }

	        var waitId = this.waitId;
	        var self = this;
	        var completeCallback = function () {
	            if (waitId < self.waitId) {
	                return;
	            }
	            self.waitId++;
	            self.removeWaitEvents();
	            self.parent.emit(self.waitCompleteEventName);
	        };

	        if (completeNextTick) {
	            var completeCallbackNextTick = function () {
	                PreUpdateDelayCall(self.parent, 0, completeCallback);
	            };
	            return completeCallbackNextTick;
	        } else {
	            return completeCallback;
	        }
	    }

	    removeWaitEvents() {
	        this.parent.emit(this.removeWaitEventsEventName);
	        return this;
	    }

	    addWaitCompleteCallback(callback, scope) {
	        this.parent.on(this.waitCompleteEventName, callback, scope);
	        return this;
	    }

	    clearWaitCompleteCallbacks() {
	        this.parent.off(this.waitCompleteEventName);
	        return this;
	    }
	}

	Object.assign(
	    WaitEvent.prototype,
	    EventEmitterMethods$1
	);

	var WaitTimeMethods = {
	    waitTime(duration) {
	        var timeline = this.parent.timeline;
	        timeline.delayEvent(duration, 'delay');

	        // Clear delay event on timeline manually
	        this.parent.once(this.removeWaitEventsEventName, function () {
	            timeline.removeDelayEvent('delay');
	        });
	        return this.waitEvent(timeline, 'delay');
	    },
	};

	var Split = function (s, delimiter) {
	    var regexString = `(?<!\\\\)\\${delimiter}`;
	    var escapeString = `\\${delimiter}`;
	    return s.split(new RegExp(regexString, 'g')).map(function (s) {
	        return s.replace(escapeString, delimiter);
	    })
	};

	var WaitInputMethods = {
	    setClickTarget(target) {
	        this.clickTarget = target;

	        if (!target) {
	            this.touchEE = null;
	        } else if (IsSceneObject(target)) {
	            this.touchEE = target.input;
	        } else {  // Assume that target is a gameObject
	            this.touchEE = target.setInteractive();
	        }
	        return this;
	    },

	    clearClickTarget() {
	        this.setClickTarget();
	        return this;
	    },

	    setClickShortcutKeys(keys) {
	        this.clickShortcutKeys = keys;
	        return this;
	    },

	    clearClickShortcutKeys() {
	        this.setClickShortcutKeys();
	        return this;
	    },

	    waitClick() {
	        var touchEE = this.touchEE;
	        var clickShortcutKeys = this.clickShortcutKeys;
	        if (touchEE || clickShortcutKeys) {
	            if (touchEE) {
	                this.waitEvent(touchEE, 'pointerdown');
	            }
	            if (clickShortcutKeys) {
	                this.waitKeyDown(clickShortcutKeys);
	            }
	        } else {
	            this.waitTime(0);
	        }

	        return this;
	    },

	    waitKeyDown(key) {
	        var eventEmitter = this.scene.input.keyboard;
	        if (typeof (key) === 'string') {
	            if (key.indexOf('|') === -1) {
	                return this.waitEvent(eventEmitter, `keydown-${key.toUpperCase()}`)
	            } else {
	                var keys = Split(key, '|');
	                for (var i = 0, cnt = keys.length; i < cnt; i++) {
	                    this.waitEvent(eventEmitter, `keydown-${keys[i].toUpperCase()}`);
	                }
	                return this.parent;
	            }
	        } else {
	            return this.waitEvent(eventEmitter, 'keydown');
	        }
	    }
	};

	var WaitGameObjectMethods = {
	    waitGameObjectTweenComplete(goType, name, property) {
	        var tweenTask = this.parent.getGameObjectTweenTask(goType, name, property);
	        if (tweenTask) {
	            return this.waitEvent(tweenTask, 'complete');
	        }
	        return this.waitTime(0);
	    },

	    waitGameObjectDataFlag(goType, name, dataKey, trueFlag) {
	        var gameObject = this.parent.getGameObject(goType, name);
	        if (!gameObject) {
	            return this.waitTime(0);
	        }

	        if (gameObject.getData(dataKey) === trueFlag) {
	            return this.waitTime(0);
	        }

	        var eventName = `changedata-${dataKey}`;
	        var callback = function (gameObject, value, previousValue) {
	            value = !!value;
	            if (value === trueFlag) {
	                gameObject.emit('_dataFlagMatch');
	            }
	        };
	        gameObject.on(eventName, callback);
	        // Clear changedata event on gameobject manually
	        this.parent.once(this.removeWaitEventsEventName, function () {
	            gameObject.off(eventName, callback);
	        });

	        return this.waitEvent(gameObject, '_dataFlagMatch');
	    },

	    waitGameObjectDestroy(goType, name) {
	        var gameObject = this.parent.getGameObject(goType, name);
	        if (!gameObject) {
	            return this.waitTime(0);
	        }
	        return this.waitEvent(gameObject, 'destroy');
	    },

	    waitGameObjectManagerEmpty(goType) {
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
	    setCameraTarget(camera) {
	        this.cameraTarget = camera;
	        return this;
	    },

	    clearCameraTarget() {
	        this.setCameraTarget();
	        return this;
	    },

	    waitCameraEffectComplete(effectName, cameraName) {
	        var camera;
	        if (cameraName) {
	            camera = this.scene.cameras.getCamera(cameraName);
	        } else {
	            camera = this.cameraTarget;
	        }

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
	    },
	};

	var WaitMusicMethods = {
	    waitSoundEffectComplete() {
	        if (!this.parent.soundManager) {
	            return this.waitTime(0);
	        }
	        var music = this.parent.soundManager.getLastSoundEffect();
	        if (!music) {
	            return this.waitTime(0);
	        }
	        return this.waitEvent(music, 'complete');
	    },

	    waitSoundEffect2Complete() {
	        if (!this.parent.soundManager) {
	            return this.waitTime(0);
	        }
	        var music = this.parent.soundManager.getLastSoundEffect2();
	        if (!music) {
	            return this.waitTime(0);
	        }
	        return this.waitEvent(music, 'complete');
	    },

	    waitBackgroundMusicComplete() {
	        if (!this.parent.soundManager) {
	            return this.waitTime(0);
	        }
	        var music = this.parent.soundManager.getBackgroundMusic();
	        if (!music) {
	            return this.waitTime(0);
	        }
	        return this.waitEvent(music, 'complete');
	    },

	    waitBackgroundMusic2Complete() {
	        if (!this.parent.soundManager) {
	            return this.waitTime(0);
	        }
	        var music = this.parent.soundManager.getBackgroundMusic2();
	        if (!music) {
	            return this.waitTime(0);
	        }
	        return this.waitEvent(music, 'complete');
	    },
	};

	var WaitAny = function (config) {
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
	                this.waitClick();
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
	                this.waitCameraEffectComplete(`camera.${config.camera.toLowerCase()}`, config.cameraName);
	                break;

	            default:
	                var names = name.split('.');
	                if (names.length === 2) {
	                    // GONAME.destroy, GONAME.PROPNAME, GONAME.DATAKEY, GONAME.EVTNAME

	                    var gameObjectName = names[0];
	                    var propName = names[1];
	                    var gameObjectManager = this.parent.getGameObjectManager(undefined, gameObjectName);
	                    if (!gameObjectManager) {
	                        continue;
	                    }

	                    // GONAME.destroy
	                    if (propName === 'destroy') {
	                        return this.waitGameObjectDestroy(undefined, gameObjectName);
	                    }

	                    // GONAME.PROPNAME (tween.complete)
	                    var value = gameObjectManager.getProperty(gameObjectName, propName);
	                    if (typeof (value) === 'number') {
	                        hasAnyWaitEvent = true;
	                        this.waitGameObjectTweenComplete(undefined, gameObjectName, propName);
	                        continue;

	                    }

	                    // GONAME.DATAKEY (boolean)
	                    var dataKey = propName;
	                    var matchFalseFlag = dataKey.startsWith('!');
	                    if (matchFalseFlag) {
	                        dataKey = dataKey.substring(1);
	                    }
	                    if (gameObjectManager.hasData(gameObjectName, propName)) {
	                        hasAnyWaitEvent = true;
	                        this.waitGameObjectDataFlag(undefined, gameObjectName, dataKey, !matchFalseFlag);
	                        continue;
	                    }

	                    // GONAME.EVTNAME
	                    this.waitEvent(gameObject, propName);
	                    continue;

	                } else if (names.length === 1) ;

	                break;

	        }
	    }

	    if (!hasAnyWaitEvent) {
	        this.waitTime(0);
	    }

	    return this.parent;
	};

	var methods$1 = {
	    waitAny: WaitAny,
	};
	Object.assign(
	    methods$1,
	    WaitTimeMethods,
	    WaitInputMethods,
	    WaitGameObjectMethods,
	    WaitCameraMethods,
	    WaitMusicMethods,
	);

	class WaitEventManager extends WaitEvent {
	    constructor(parent, config) {
	        super(parent);

	        this.waitCompleteEventName = GetValue$h(config, 'completeEventName', this.waitCompleteEventName);

	        this.setClickTarget(GetValue$h(config, 'clickTarget', this.scene));
	        this.setClickShortcutKeys(GetValue$h(config, 'clickShortcutKeys', undefined));
	        this.setCameraTarget(GetValue$h(config, 'camera', this.scene.cameras.main));
	    }

	    get clickTarget() {
	        return this.parent.clickTarget;
	    }

	    set clickTarget(value) {
	        this.parent.clickTarget = value;
	    }

	    get clickShortcutKeys() {
	        return this.parent.clickShortcutKeys;
	    }

	    set clickShortcutKeys(value) {
	        this.parent.clickShortcutKeys = value;
	    }

	    get cameraTarget() {
	        return this.parent.cameraTarget;
	    }

	    set cameraTarget(value) {
	        this.parent.cameraTarget = value;
	    }

	    destroy() {
	        this.clearClickTarget();
	        this.clearClickShortcutKeys();
	        this.clearCameraTarget();
	        super.destroy();
	    }

	    get scene() {
	        return this.parent.managersScene;
	    }
	}

	Object.assign(
	    WaitEventManager.prototype,
	    methods$1,
	);

	const GetValue = Phaser.Utils.Objects.GetValue;

	var InitManagers = function (scene, config) {
	    this.clickTarget = undefined;
	    this.clickShortcutKeys = undefined;
	    this.cameraTarget = undefined;

	    this.managersScene = scene;

	    this.gameObjectManagers = {};

	    var layerNames = GetValue(config, 'layers', false);
	    if (layerNames !== false) {
	        var layerManager = new LayerManager(scene, {
	            name: 'LAYER',
	            layers: layerNames,
	            rootLayer: GetValue(config, 'rootLayer', undefined),
	            depth: GetValue(config, 'layerDepth', undefined)
	        });
	        this.addGameObjectManager(layerManager);
	        this.layerManager = layerManager;
	    }

	    var soundManagerConfig = GetValue(config, 'sounds');
	    if (soundManagerConfig !== false) {
	        this.soundManager = new SoundManager(scene, soundManagerConfig);
	    }

	    this.timeline = new Timeline(this);

	    this.waitEventManager = new WaitEventManager(this, config);

	    return this;
	};

	var SetTimeScale = function (value) {
	    this.timeline.timeScale = value;
	    for (var name in this.gameObjectManagers) {
	        this.gameObjectManagers[name].setTimeScale(value);
	    }
	    return this;
	};

	var GetTimeScale = function () {
	    return this.timeline.timeScale;
	};

	var DestroyManagers = function (fromScene) {
	    this.waitEventManager.destroy();
	    this.waitEventManager = undefined;

	    // Destroy layerManager at last
	    delete this.gameObjectManagers.layer;

	    for (var name in this.gameObjectManagers) {
	        this.gameObjectManagers[name].destroy(fromScene);
	        delete this.gameObjectManagers[name];
	    }

	    if (this.layerManager) {
	        this.layerManager.destroy(fromScene);
	        this.layerManager = undefined;
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
	    this.clickShortcutKeys = undefined;
	    this.cameraTarget = undefined;
	    this.managersScene = undefined;
	};

	var GameObjectManagerMethods$1 = {
	    addGameObjectManager(config, GameObjectManagerClass) {
	        var gameobjectManager;

	        if (config instanceof (GOManager)) {
	            gameobjectManager = config;

	        } else if (typeof (config) === 'string') {
	            gameobjectManager = GameObjectManagerClass;
	            gameobjectManager.name = config;

	        } else {
	            if (config === undefined) {
	                config = {};
	            }
	            if (GameObjectManagerClass === undefined) {
	                GameObjectManagerClass = GOManager;
	            }

	            if (!config.createGameObjectScope) {
	                config.createGameObjectScope = this;
	            }

	            gameobjectManager = new GameObjectManagerClass(this.managersScene, config);
	        }


	        this.gameObjectManagers[gameobjectManager.name] = gameobjectManager;

	        return this;
	    },

	    getGameObjectManager(managerName, gameObjectName) {
	        if (managerName) {
	            var manager = this.gameObjectManagers[managerName];
	            return manager;
	        } else {
	            if (gameObjectName && (gameObjectName.charAt(0) === '!')) {
	                gameObjectName = gameObjectName.substring(1);
	            }

	            for (var managerName in this.gameObjectManagers) {
	                var manager = this.gameObjectManagers[managerName];
	                if (manager.has(gameObjectName)) {
	                    return manager;
	                }
	            }
	        }
	    },

	    getGameObjectManagerNames() {
	        var names = [];
	        for (var name in this.gameObjectManagers) {
	            names.push(name);
	        }
	        return names;
	    },

	    getGameObjectManagerName(gameObjectName) {
	        var gameObjectManager = this.getGameObjectManager(undefined, gameObjectName);
	        if (!gameObjectManager) {
	            return undefined;
	        }
	        return gameObjectManager.name;
	    },

	    hasGameObjectMananger(managerName) {
	        return managerName in this.gameObjectManagers;
	    }
	};

	var GameObjectMethods$1 = {
	    createGameObject(goType, name, ...params) {
	        this.getGameObjectManager(goType, name).add(name, ...params);
	        return this;
	    },

	    destroyGameObject(goType, name) {
	        var gameObjectManager = this.getGameObjectManager(goType, name);
	        if (name === undefined) {
	            gameObjectManager.removeAll();
	        } else {
	            gameObjectManager.remove(name);
	        }
	        return this;
	    },

	    hasGameObject(goType, name) {
	        return !!this.getGameObjectManager(goType, name);
	    },

	    callGameObjectMethod(goType, name, methodName, ...params) {
	        this.getGameObjectManager(goType, name).call(name, methodName, ...params);
	        return this;
	    },

	    setGameObjectProperty(goType, name, prop, value) {
	        this.getGameObjectManager(goType, name).setProperty(name, prop, value);
	        return this;
	    },

	    easeGameObjectProperty(goType, name, config) {
	        this.getGameObjectManager(goType, name).easeProperty(name, config);
	        return this;
	    },

	    getGameObjectTweenTask(goType, name, property) {
	        return this.getGameObjectManager(goType, name).getTweenTask(name, property);
	    },

	    getGameObject(goType, name, out) {
	        var gameobjectManager = this.getGameObjectManager(goType, name);
	        if (!gameobjectManager) {
	            return out;
	        }
	        if (typeof (name) === 'string') {
	            return gameobjectManager.getGO(name);
	        } else {
	            if (out === undefined) {
	                out = [];
	            }

	            var names = name;
	            if (names === undefined) {
	                names = Object.keys(gameobjectManager.bobs);
	            }

	            var isArrayOutput = Array.isArray(out);
	            for (var i = 0, cnt = names.length; i < cnt; i++) {
	                name = names[i];
	                var gameObject = gameobjectManager.getGO(name);
	                if (!gameObject) {
	                    continue;
	                }

	                if (isArrayOutput) {
	                    out.push(gameObject);
	                } else {
	                    out[name] = gameObject;
	                }

	            }

	            return out;
	        }
	    },

	    addGameObject(goType, name, gameObject) {
	        var gameobjectManager = this.getGameObjectManager(goType, name);
	        if (typeof (name) === 'string') {
	            gameobjectManager.addGO(name, gameObject);
	        } else {
	            var names = name;
	            for (name in names) {
	                gameobjectManager.addGO(name, names[name]);
	            }
	        }
	        return this;
	    },

	    drawGameObjectsBounds(goTypes, graphics, config) {
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

	var Extend = function (BaseClass) {
	    class Managers extends BaseClass { }

	    var Methods = {
	        initManagers: InitManagers,
	        setTimeScale: SetTimeScale,
	        getTimeScale: GetTimeScale,
	        destroyManagers: DestroyManagers,
	    };

	    Object.assign(
	        Managers.prototype,
	        Methods,
	        GameObjectManagerMethods$1,
	        GameObjectMethods$1,
	    );

	    return Managers;
	};

	const EventEmitter = Phaser.Events.EventEmitter;

	class Managers extends Extend(EventEmitter) {
	    constructor(scene, config) {
	        if (config === undefined) {
	            config = {};
	        }

	        // Fire 'complete' event to resume running of eventSheetGroup
	        config.completeEventName = 'complete';  

	        if (!config.hasOwnProperty('layers')) {
	            config.layers = undefined;
	        }

	        super();

	        this.scene = scene;

	        this.initManagers(scene, config);
	    }

	    destroy(fromScene) {
	        //  This Game Object has already been destroyed
	        if (!this.scene) {
	            return;
	        }

	        this.destroyManagers(fromScene);

	        this.scene = undefined;

	        super.destroy();
	    }
	}

	var EventEmitterMethods = {
	    setEventEmitter(eventEmitter, EventEmitterClass) {
	        if (EventEmitterClass === undefined) {
	            EventEmitterClass = EventEmitter$2;
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
	        this.setEventEmitter(GetValue$h(config, 'eventEmitter', undefined));

	        // Value convert
	        this.setValueConverter(GetValue$h(config, 'valueConvert', true));
	        // Loop
	        this.setLoopEnable(GetValue$h(config, 'loop', false));

	        // Brackets and generate regex
	        this.setMultipleLinesTagEnable(GetValue$h(config, 'multipleLinesTag', false));
	        var delimiters = GetValue$h(config, 'delimiters', '<>');
	        this.setDelimiters(delimiters[0], delimiters[1]);

	        // Translate tagName callback
	        this.setTranslateTagNameCallback(GetValue$h(config, 'translateTagNameCallback'));

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
	        this.setTagExpression(GetValue$h(config, 'regex.tag', undefined));
	        this.setValueExpression(GetValue$h(config, 'regex.value', undefined));
	        // Brackets and generate regex
	        var delimiters = GetValue$h(config, 'delimiters', '<>');
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

	var AddCommand = function (name, callback, scope) {
	    if (scope === undefined) {
	        scope = this;
	    }
	    if (scope) {
	        callback = callback.bind(scope);
	    }

	    if (this[name]) {
	        console.warn(`CommandExecutor: method '${name} is existed.`);
	    }

	    this[name] = callback;
	    return this;
	};

	var DataMethods = {
	    setData(config, eventSheetManager, eventsheet) {
	        for (var name in config) {
	            eventSheetManager.setData(name, config[name]);
	        }
	    },

	    incData(config, eventSheetManager, eventsheet) {
	        for (var name in config) {
	            eventSheetManager.incData(name, config[name]);
	        }
	    },

	    toggleData(config, eventSheetManager, eventsheet) {
	        for (var name in config) {
	            eventSheetManager.toggleData(name, config[name]);
	        }
	    },
	};

	var WaitMethods = {

	    wait(config, eventSheetManager, eventsheet) {
	        var { click, key, event } = config;

	        if (click) {
	            eventSheetManager.emit('pause.click');
	        }

	        if (key) {
	            eventSheetManager.emit('pause.key', config.key);
	        }

	        if (click | key) {
	            eventSheetManager.emit('pause.input');
	            this.sys.once('complete', function () {
	                eventSheetManager.emit('resume.input');
	            });
	        }

	        if (event) {
	            this.sys.waitEventManager.waitEvent(eventSheetManager, event);
	        }

	        this.sys.waitEventManager.waitAny(config);
	        eventSheetManager.pauseEventSheetUnitlEvent(this.sys, 'complete');
	        return this;
	    },

	    click(config, eventSheetManager, eventsheet) {
	        this.wait({ click: true }, eventSheetManager);
	        return this;
	    },

	    // Internal method
	    bindEventSheetManager(eventSheetManager) {
	        this.__eventSheetManager = eventSheetManager;
	    },

	    unBindEventSheetManager() {
	        this.__eventSheetManager = undefined;
	    },

	    _waitComplete() {
	        this.__eventSheetManager.pauseEventSheetUnitlEvent(this.sys, 'complete');
	    },

	    waitEvent(eventEmitter, eventName) {
	        this.sys.waitEventManager.waitEvent(eventEmitter, eventName);
	        this._waitComplete();
	        return this;
	    },

	};

	var BindEventWithGameObject = function (gameObject, eventEmitter, eventName, callback, scope, once) {
	    if (once === undefined) {
	        once = false;
	    }

	    eventEmitter[(once) ? 'once' : 'on'](eventName, callback, scope);

	    gameObject.once('destroy', function () {
	        eventEmitter.off(eventName, callback, scope);
	    });

	    return gameObject;
	};

	var BindEventWidthScene = function (scene, eventEmitter, eventName, callback, scope, once) {
	    if (once === undefined) {
	        once = false;
	    }

	    eventEmitter[(once) ? 'once' : 'on'](eventName, callback, scope);

	    scene.sys.events.once('shutdown', function () {
	        eventEmitter.off(eventName, callback, scope);
	    });

	    return scene;
	};

	var AddEvent = function (bindingTarget, eventEmitter, eventName, callback, scope, once) {
	    if (!IsSceneObject(bindingTarget)) {
	        BindEventWithGameObject(bindingTarget, eventEmitter, eventName, callback, scope, once);
	    } else {
	        BindEventWidthScene(bindingTarget, eventEmitter, eventName, callback, scope, once);
	    }

	    return bindingTarget;
	};

	var GameObjectManagerMethods = {
	    addGameObjectManager(config) {
	        // Register GameObjectManager
	        var sys = this.sys;
	        sys.addGameObjectManager(config);

	        var {
	            name, defaultLayer,
	            commands = {},
	            autoClear = true
	        } = config;

	        // Add custom commands
	        var gameObjectManager = sys.getGameObjectManager(name);
	        gameObjectManager.commands = commands;

	        var defaultAutoClear = autoClear;

	        // Add createGameObject command
	        var createGameObjectCallback = function (config, eventSheetManager, eventsheet) {
	            var {
	                id,
	                layer = defaultLayer,
	                autoClear = defaultAutoClear
	            } = config;

	            config.commandExecutor = this;
	            config.eventSheetManager = eventSheetManager;
	            config.eventsheet = eventsheet;

	            sys.createGameObject(name, id, config);
	            // Execute next command

	            delete config.commandExecutor;
	            delete config.eventSheetManager;
	            delete config.eventsheet;

	            if (layer) {
	                var layerManager = sys.layerManager;
	                if (layerManager) {
	                    var gameObject = sys.getGameObject(name, id);
	                    layerManager.addToLayer(layer, gameObject);
	                }
	            }

	            // Put reference of game object into memory
	            var memoryKey = `@${id}`;
	            if (eventSheetManager.hasData(memoryKey)) {
	                console.warn(`CommandExecutor: Duplicated GameObject ID=${id}`);
	            }
	            eventSheetManager.setData(memoryKey, gameObject);
	            gameObject.once('destroy', function () {
	                eventSheetManager.removeData(memoryKey);
	            });

	            if (autoClear) {
	                var gameObject = sys.getGameObject(name, id);

	                // When exit this eventsheet, destroy this game object (remove from gameObjectManager)
	                AddEvent(
	                    gameObject,
	                    eventSheetManager, 'eventsheet.exit',
	                    function (title, groupName, eventSheetManager) {
	                        if ((eventsheet.title === title) && (eventsheet.groupName === groupName)) {
	                            gameObjectManager.remove(id, true);
	                        }
	                    }
	                );
	            }
	        };
	        this.addCommand(name, createGameObjectCallback, null);

	        return this;
	    },

	    addGameObjectCommand(goType, commandName, callback) {
	        this.sys.getGameObjectManager(goType).commands[commandName] = callback;
	        return this;
	    },

	};

	var GameObjectMethods = {
	    setGOProperty(
	        config,
	        eventSheetManager, eventSheet
	    ) {

	        var { id, goType } = config;
	        delete config.id;
	        delete config.goType;

	        if (!goType) {
	            goType = this.sys.getGameObjectManagerName(id);
	        }
	        if (!goType) {
	            return this;
	        }

	        for (var prop in config) {
	            var value = eventSheetManager.evalExpression(config[prop]);
	            this.sys.setGameObjectProperty(goType, id, prop, value);
	        }
	        return this;
	    },

	    easeGOProperty(
	        config,
	        eventSheetManager, eventSheet
	    ) {

	        var { id, goType, duration, delay, ease, repeat, yoyo, from = false, wait = true } = config;
	        delete config.id;
	        delete config.goType;
	        delete config.duration;
	        delete config.delay;
	        delete config.ease;
	        delete config.repeat;
	        delete config.yoyo;
	        delete config.from;
	        delete config.wait;

	        if (!goType) {
	            goType = this.sys.getGameObjectManagerName(id);
	        }
	        if (!goType) {
	            return this;
	        }

	        var waitProperty;
	        for (var property in config) {
	            var value = eventSheetManager.evalExpression(config[property]);
	            this.sys.easeGameObjectProperty(goType, id, {
	                property, value,
	                duration, delay,
	                ease,
	                repeat, yoyo, from
	            });

	            if (!waitProperty) {
	                waitProperty = property;
	            }
	        }
	        if (wait && waitProperty) {
	            this.sys.waitEventManager.waitGameObjectTweenComplete(goType, id, waitProperty);
	            this._waitComplete();
	        }
	        return this;
	    },

	    destroyGO(
	        config,
	        eventSheetManager, eventSheet
	    ) {

	        var { id, goType, wait = false } = config;

	        if (!goType) {
	            goType = this.sys.getGameObjectManagerName(id);
	        }
	        if (!goType) {
	            return this;
	        }

	        this.sys.destroyGameObject(goType, id);
	        if (wait) {
	            this.sys.waitEventManager.waitGameObjectDestroy(goType, id);
	            this._waitComplete();
	        }
	        return this;
	    },

	    runGOMethod(
	        config,
	        eventSheetManager, eventSheet
	    ) {

	        var { id, goType, methodName, parameters } = config;

	        if (!goType) {
	            goType = this.sys.getGameObjectManagerName(id);
	        }
	        if (!goType) {
	            return this;
	        }

	        this.sys.callGameObjectMethod(goType, config.id, methodName, ...parameters);
	        return this;
	    },

	    getGameObject(name, out) {
	        if (this.sys.hasGameObjectMananger(name)) {
	            return this.sys.getGameObject(name, undefined, out);
	        } else {
	            return this.sys.getGameObject(undefined, name, out);
	        }
	    },
	};

	var BackgroundMusicMethods = {
	    'bgm.set'(
	        {
	            volume, mute, unmute
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        if (volume !== undefined) {
	            soundManager.setBackgroundMusicVolume(volume);
	        }

	        if (mute !== undefined) {
	            soundManager.setBackgroundMusicMute(mute);
	        } else if (unmute !== undefined) {
	            soundManager.setBackgroundMusicMute(!unmute);
	        }
	    },

	    'bgm.play'(
	        {
	            key,
	            volume, detune, rate, fadeIn = 0, loop,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        if (!key) {
	            return this;
	        }

	        if (loop !== undefined) {
	            soundManager.setBackgroundMusicLoopValue(loop);
	        }

	        soundManager.playBackgroundMusic(key);

	        if (volume !== undefined) {
	            soundManager.setBackgroundMusicVolume(volume);
	        }

	        if (detune !== undefined) {
	            soundManager.setBackgroundMusicDetune(detune);
	        }

	        if (rate !== undefined) {
	            soundManager.setBackgroundMusicRate(rate);
	        }

	        if (fadeIn > 0) {
	            soundManager.fadeInBackgroundMusic(fadeIn);
	        }

	        if (wait) {
	            this.wait({ bgm: true }, eventSheetManager);
	        }
	        return this;
	    },

	    'bgm.cross'(
	        {
	            key,
	            duration = 500,
	            wait = false
	        },
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        if (!key) {
	            return this;
	        }

	        soundManager.crossFadeBackgroundMusic(key, duration);

	        if (wait) {
	            this.wait({ bgm: true }, eventSheetManager);
	        }
	        return this;
	    },

	    'bgm.stop'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.stopBackgroundMusic();
	        return this;
	    },

	    'bgm.fadeOut'(
	        {
	            duration = 500, stop = true,
	            wait = false
	        },
	        eventSheetManager
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.fadeOutBackgroundMusic2(duration, stop);

	        if (wait) {
	            this.wait({ bgm: true }, eventSheetManager);
	        }
	        return this;
	    },

	    'bgm.fadeIn'(
	        {
	            duration = 500
	        },
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.fadeInBackgroundMusic(duration);
	        return this;
	    },

	    'bgm.pause'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.pauseBackgroundMusic();
	        return this;
	    },

	    'bgm.resume'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.resumeBackgroundMusic();
	        return this;
	    },

	    'bgm.mute'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        soundManager.setBackgroundMusicMute(true);
	        return this;
	    },

	    'bgm.unmute'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        soundManager.setBackgroundMusicMute(false);
	        return this;
	    },
	};

	var BackgroundMusic2Methods = {
	    'bgm2.set'(
	        {
	            volume, mute, unmute
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        if (volume !== undefined) {
	            soundManager.setBackgroundMusic2Volume(volume);
	        }

	        if (mute !== undefined) {
	            soundManager.setBackgroundMusic2Mute(mute);
	        } else if (unmute !== undefined) {
	            soundManager.setBackgroundMusic2Mute(!unmute);
	        }
	        return this;
	    },

	    'bgm2.play'(
	        {
	            key,
	            volume, detune, rate, fadeIn = 0, loop,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        if (!key) {
	            return this;
	        }

	        if (loop !== undefined) {
	            soundManager.setBackgroundMusic2LoopValue(loop);
	        }

	        soundManager.playBackgroundMusic2(key);

	        if (volume !== undefined) {
	            soundManager.setBackgroundMusic2Volume(volume);
	        }

	        if (detune !== undefined) {
	            soundManager.setBackgroundMusic2Detune(detune);
	        }

	        if (rate !== undefined) {
	            soundManager.setBackgroundMusic2Rate(rate);
	        }

	        if (fadeIn > 0) {
	            soundManager.fadeInBackgroundMusic2(fadeIn);
	        }

	        if (wait) {
	            this.wait({ bgm: true }, eventSheetManager);
	        }

	        return this;
	    },

	    'bgm2.cross'(
	        {
	            key,
	            duration = 500,
	            wait = false
	        },
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        if (!key) {
	            return this;
	        }

	        soundManager.crossFadeBackgroundMusic2(key, duration);

	        if (wait) {
	            this.wait({ bgm: true }, eventSheetManager);
	        }

	        return this;
	    },

	    'bgm2.stop'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.stopBackgroundMusic2();
	        return this;
	    },

	    'bgm2.fadeOut'(
	        {
	            duration = 500, stop = true,
	            wait = false
	        },
	        eventSheetManager
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.fadeOutBackgroundMusic2(duration, stop);

	        if (wait) {
	            this.wait({ bgm: true }, eventSheetManager);
	        }
	        return this;
	    },

	    'bgm2.fadeIn'(
	        {
	            duration = 500
	        },
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.fadeInBackgroundMusic2(duration);
	        return this;
	    },

	    'bgm2.pause'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.pauseBackgroundMusic2();
	        return this;
	    },

	    'bgm2.resume'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.resumeBackgroundMusic2();
	        return this;
	    },

	    'bgm2.mute'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        soundManager.setBackgroundMusic2Mute(true);
	        return this;
	    },

	    'bgm2.unmute'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        soundManager.setBackgroundMusic2Mute(false);
	        return this;
	    },
	};

	var SoundEffectsMethods = {
	    'se.set'(
	        {
	            volume, mute, unmute
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        if (volume !== undefined) {
	            soundManager.setSoundEffectVolume(volume);
	        }

	        if (mute !== undefined) {
	            soundManager.setSoundEffectMute(mute);
	        } else if (unmute !== undefined) {
	            soundManager.setSoundEffectMute(!unmute);
	        }
	        return this;
	    },

	    'se.play'(
	        {
	            key,
	            volume, detune, rate, fadeIn = 0,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        if (!key) {
	            return this;
	        }

	        soundManager.playSoundEffect(key);

	        if (volume !== undefined) {
	            soundManager.setSoundEffectVolume(volume, true);
	        }

	        if (detune !== undefined) {
	            soundManager.setSoundEffectDetune(detune, true);
	        }

	        if (rate !== undefined) {
	            soundManager.setSoundEffectRate(rate, true);
	        }

	        if (fadeIn > 0) {
	            soundManager.fadeInSoundEffect(fadeIn);
	        }

	        if (wait) {
	            this.wait({ se: true }, eventSheetManager);
	        }
	        return this;
	    },

	    'se.stop'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.stopAllSoundEffects();
	        return this;
	    },

	    'se.fadeOut'(
	        {
	            duration = 500, stop = true,
	            wait = false
	        },
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.fadeOutSoundEffect(duration, stop);

	        if (wait) {
	            this.wait({ bgm: true }, eventSheetManager);
	        }
	        return this;
	    },

	    'se.mute'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        soundManager.setSoundEffectMute(true);
	        return this;
	    },

	    'se.unmute'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        soundManager.setSoundEffectMute(false);
	        return this;
	    },
	};

	var SoundEffects2Methods = {
	    'se2.set'(
	        {
	            volume, mute, unmute
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        if (volume !== undefined) {
	            soundManager.setSoundEffect2Volume(volume);
	        }

	        if (mute !== undefined) {
	            soundManager.setSoundEffect2Mute(mute);
	        } else if (unmute !== undefined) {
	            soundManager.setSoundEffect2Mute(!unmute);
	        }
	        return this;
	    },

	    'se2.play'(
	        {
	            key,
	            volume, detune, rate, fadeIn = 0,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        if (!key) {
	            return this;
	        }

	        soundManager.playSoundEffect2(key);

	        if (volume !== undefined) {
	            soundManager.setSoundEffect2Volume(volume, true);
	        }

	        if (detune !== undefined) {
	            soundManager.setSoundEffect2Detune(detune, true);
	        }

	        if (rate !== undefined) {
	            soundManager.setSoundEffect2Rate(rate, true);
	        }

	        if (fadeIn > 0) {
	            soundManager.fadeInSoundEffect2(fadeIn);
	        }

	        if (wait) {
	            this.wait({ se: true }, eventSheetManager);
	        }
	        return this;
	    },

	    'se2.stop'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.stopAllSoundEffects2();
	        return this;
	    },

	    'se2.fadeOut'(
	        {
	            duration = 500,
	            stop = true,
	            wait = false
	        },
	        eventSheetManager, eventsheet
	    ) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }
	        soundManager.fadeOutSoundEffect2(duration, stop);

	        if (wait) {
	            this.wait({ bgm: true }, eventSheetManager);
	        }
	        return this;
	    },

	    'se2.mute'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        soundManager.setSoundEffect2Mute(true);
	        return this;
	    },

	    'se2.unmute'(config, eventSheetManager, eventsheet) {

	        var soundManager = this.sys.soundManager;
	        if (!soundManager) {
	            return this;
	        }

	        soundManager.setSoundEffect2Mute(false);
	        return this;
	    },
	};

	var CameraMethods = {
	    'camera.set'(
	        {
	            x, y, rotate, zoom,
	            name
	        } = {},
	        eventSheetManager, eventsheet
	    ) {
	        var camera;
	        if (name) {
	            camera = this.sys.scene.cameras.getCamera(name);
	        } else {
	            camera = this.sys.cameraTarget;
	        }

	        if (!camera) {
	            return this;
	        }

	        if ((x !== undefined) || (y !== undefined)) {
	            camera.setScroll(x, y);
	        }
	        if (rotate !== undefined) {
	            camera.setRotation(rotate);
	        }
	        if (zoom !== undefined) {
	            camera.setZoom(zoom);
	        }
	        return this;
	    },

	    'camera.fadeIn'
	        (
	            {
	                duration = 1000,
	                red, green, blue,
	                name,
	                wait = false
	            } = {},
	            eventSheetManager, eventsheet
	        ) {

	        var camera;
	        if (name) {
	            camera = this.sys.scene.cameras.getCamera(name);
	        } else {
	            camera = this.sys.cameraTarget;
	        }

	        if (!camera) {
	            return this;
	        }

	        camera.fadeIn(duration, red, green, blue);
	        if (wait) {
	            this.wait({ camera: 'fadeIn', cameraName: name }, eventSheetManager);
	        }
	        return this;
	    },

	    'camera.fadeOut'(
	        {
	            duration = 1000,
	            red, green, blue,
	            name,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var camera;
	        if (name) {
	            camera = this.sys.scene.cameras.getCamera(name);
	        } else {
	            camera = this.sys.cameraTarget;
	        }

	        if (!camera) {
	            return this;
	        }

	        camera.fadeOut(duration, red, green, blue);
	        if (wait) {
	            this.wait({ camera: 'fadeOut', cameraName: name }, eventSheetManager);
	        }
	        return this;
	    },

	    'camera.flash'(
	        {
	            duration = 1000,
	            red, green, blue,
	            name,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var camera;
	        if (name) {
	            camera = this.sys.scene.cameras.getCamera(name);
	        } else {
	            camera = this.sys.cameraTarget;
	        }

	        if (!camera) {
	            return this;
	        }

	        camera.flash(duration, red, green, blue);
	        if (wait) {
	            this.wait({ camera: 'flash', cameraName: name }, eventSheetManager);
	        }
	        return this;
	    },

	    'camera.shake'(
	        {
	            duration = 1000,
	            intensity,
	            name,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var camera;
	        if (name) {
	            camera = this.sys.scene.cameras.getCamera(name);
	        } else {
	            camera = this.sys.cameraTarget;
	        }

	        if (!camera) {
	            return this;
	        }

	        camera.shake(duration, intensity);
	        if (wait) {
	            this.wait({ camera: 'shake', cameraName: name }, eventSheetManager);
	        }
	        return this;
	    },

	    'camera.zoomTo'(
	        {
	            duration = 1000,
	            zoom,
	            name,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var camera;
	        if (name) {
	            camera = this.sys.scene.cameras.getCamera(name);
	        } else {
	            camera = this.sys.cameraTarget;
	        }

	        if (!camera) {
	            return this;
	        }

	        camera.zoomTo(zoom, duration);
	        if (wait) {
	            this.wait({ camera: 'zoom', cameraName: name }, eventSheetManager);
	        }
	        return this;
	    },

	    'camera.rotateTo'(
	        {
	            duration = 1000,
	            rotate, ease,
	            name,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var camera;
	        if (name) {
	            camera = this.sys.scene.cameras.getCamera(name);
	        } else {
	            camera = this.sys.cameraTarget;
	        }

	        if (!camera) {
	            return this;
	        }

	        camera.rotateTo(rotate, false, duration, ease);
	        if (wait) {
	            this.wait({ camera: 'rotate', cameraName: name }, eventSheetManager);
	        }
	        return this;
	    },

	    'camera.scrollTo'(
	        {
	            duration = 1000,
	            x, y, ease,
	            name,
	            wait = false
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        var camera;
	        if (name) {
	            camera = this.sys.scene.cameras.getCamera(name);
	        } else {
	            camera = this.sys.cameraTarget;
	        }

	        if (!camera) {
	            return this;
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
	            this.wait({ camera: 'scroll', cameraName: name }, eventSheetManager);
	        }
	        return this;
	    },

	};

	var CanLog = function (eventsheet) {
	    return !eventsheet.hasOwnProperty('logEnable') || eventsheet.logEnable;
	};

	var LogMethods = {
	    log({
	        text = '',
	        logType = 'log',
	        showTitle = true,
	        title = undefined,
	        titleColor = 'green'
	    } = {},
	        eventSheetManager, eventsheet
	    ) {
	        if (!CanLog(eventsheet)) {
	            return this;
	        }

	        if (showTitle) {
	            if (title === undefined) {
	                title = eventsheet.title;
	            }
	            text = `[round][bgcolor=${titleColor}]${title}[/bgcolor][/round] ${text}`;
	        }
	        this.sys.logger.log(text, logType);
	        return this;
	    },

	    'log.disable'(
	        {
	            title
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        if (title) {
	            eventsheet = eventSheetManager.getTree(title, eventsheet.groupName);
	        }

	        if (!eventsheet.hasOwnProperty('logEnable')) {
	            eventsheet.wrapProperty('logEnable');
	        }

	        eventsheet.logEnable = false;
	        return this;
	    },

	    'log.enable'(
	        {
	            title
	        } = {},
	        eventSheetManager, eventsheet
	    ) {

	        if (title) {
	            eventsheet = eventSheetManager.getTree(title, eventsheet.groupName);
	        }

	        if (!eventsheet.hasOwnProperty('logEnable')) {
	            return this;
	        }

	        eventsheet.logEnable = true;
	        return this;
	    },

	    'log.memory'(config, eventSheetManager, eventsheet) {
	        if (!CanLog(eventsheet)) {
	            return this;
	        }

	        this.log(config, eventSheetManager, eventsheet);

	        var memory = eventSheetManager.memory;

	        var table;
	        var { keys } = config;
	        if (keys) {
	            table = {};
	            keys.split(',').forEach(function (key) {
	                table[key] = memory[key];
	            });
	        } else {
	            table = memory;
	        }

	        this.sys.logger.log(table);
	        return this;
	    },
	};

	var DefaultHandler = function (name, config, eventSheetManager, eventSheet) {
	    var tokens = name.split('.');

	    var gameObjectID = tokens[0];
	    if (this.sys.hasGameObjectMananger(gameObjectID)) {
	        config.goType = gameObjectID;
	        config.id = null;
	    } else if (this.sys.hasGameObject(undefined, gameObjectID)) {
	        config.goType = undefined;
	        config.id = gameObjectID;
	    } else {
	        // TODO
	        console.warn(`CommandExecutor: '${gameObjectID}' does not exist`);
	        return this;
	    }

	    this.bindEventSheetManager(eventSheetManager); // For _waitComplete() / waitEvent()

	    var commandName = tokens[1];

	    var isDone = false;
	    // Try to run custom command first
	    var gameObjectManager = this.sys.getGameObjectManager(config.goType, config.id);
	    if (gameObjectManager) {
	        // Command registered in gameObjectManager
	        var command = gameObjectManager.commands[commandName];
	        if (command) {
	            var gameObjects = gameObjectManager.getGO(config.id);
	            if (!Array.isArray(gameObjects)) {
	                gameObjects = [gameObjects];
	            }
	            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
	                command(gameObjects[i], config, this, eventSheetManager, eventSheet);
	            }
	            isDone = true;
	        }
	    }

	    if (!isDone) {
	        // Try run default command
	        switch (commandName) {
	            case 'set':
	                this.setGOProperty(config, eventSheetManager, eventSheet);
	                break;

	            case 'to':
	                this.easeGOProperty(config, eventSheetManager, eventSheet);
	                break;

	            case 'yoyo':
	                config.yoyo = true;
	                this.easeGOProperty(config, eventSheetManager, eventSheet);
	                break;

	            case 'from':
	                config.from = true;
	                this.easeGOProperty(config, eventSheetManager, eventSheet);
	                break;

	            case 'destroy':
	                this.destroyGO(config, eventSheetManager, eventSheet);
	                break;

	            default:
	                // TODO
	                var parameters;
	                for (var key in config) {
	                    parameters = config[key];
	                    break;
	                }
	                config.methodName = commandName;
	                config.parameters = (parameters) ? StringToValues(parameters) : [];
	                this.runGOMethod(config, eventSheetManager, eventSheet);
	                break;
	        }

	    }

	    this.unBindEventSheetManager();

	    return this;
	};

	var Methods = {
	    addCommand: AddCommand,
	    defaultHandler: DefaultHandler,
	};

	Object.assign(
	    Methods,
	    DataMethods,
	    WaitMethods,
	    GameObjectManagerMethods,
	    GameObjectMethods,
	    BackgroundMusicMethods,
	    BackgroundMusic2Methods,
	    SoundEffectsMethods,
	    SoundEffects2Methods,
	    CameraMethods,
	    LogMethods,
	);

	class CommandExecutor {
	    constructor(scene, config = {}) {
	        this.sys = new Managers(scene, config);

	        var { log = {} } = config;
	        this.sys.logger = new BBCodeLog(log);
	    }

	    destroy(fromScene) {
	        this.sys.destroy(fromScene);
	    }
	}

	Object.assign(
	    CommandExecutor.prototype,
	    Methods,
	);

	class MarkedEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
	    constructor(pluginManager) {
	        super(pluginManager);
	    }

	    start() {
	        var eventEmitter = this.game.events;
	        eventEmitter.on('destroy', this.destroy, this);
	    }

	    add(config) {
	        return new MarkedEventSheets(config);
	    }

	    addCommandExecutor(scene, config) {
	        return new CommandExecutor(scene, config);
	    }

	}

	var methods = {
	    csv2md: CSV2MD
	};

	Object.assign(
	    MarkedEventSheetsPlugin.prototype,
	    methods,
	);

	return MarkedEventSheetsPlugin;

}));
