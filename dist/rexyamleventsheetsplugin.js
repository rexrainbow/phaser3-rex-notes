(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexyamleventsheetsplugin = factory());
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

	    chainChild(node, nodePool) {
	        // Get last decorator
	        var decorator = this;
	        while (decorator.child instanceof Decorator) {
	            decorator = decorator.child;
	        }
	        decorator.addChild(node, nodePool);
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
	            onFailState = FAILURE,
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
	                    conditionEvalBreak,
	                    onFailState
	                },
	            },
	            nodePool
	        );

	        this.expression = this.addBooleanExpression(expression);
	        this.conditionEvalBreak = conditionEvalBreak;
	        this.onFailState = onFailState;
	    }

	    tick(tick) {
	        if (!this.child) {
	            return ERROR$1;
	        }

	        // child is not running
	        if (!this.isChildRunning(tick)) {
	            /* 
	            Return FAILURE/SUCCESS to run next node
	            
	              - FAILURE : parent node is a Selector
	              - SUCCESS : parent node is a Sequence

	            */
	            if (!tick.evalExpression(this.expression)) {
	                return this.onFailState;
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

	        this.name = '';

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

	var GetValue$o = function (source, key, defaultValue) {
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
	        return GetValue$o(memory, key);
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
	function isWhitespace$1 (string) {
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

	        if (isWhitespace$1(chr)) {
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
	    addEventSheet(data, groupName, config) {
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
	utils.extend = extend$1;
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

	function extend$1(obj /* , ...source */) {
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
	  var frame = extend$1({}, object);
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

	var exception$1 = {exports: {}};

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
		
	} (exception$1, exception$1.exports));

	var exceptionExports = exception$1.exports;

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

	const BuiltInProperties = {
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
	        for (var propertyKey in BuiltInProperties) {
	            var { defaultValue, rewritable } = BuiltInProperties[propertyKey];

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

	const Properties = ['groupName', 'parallel', 'active', 'once'];

	var GetTreeConfig = function (jsonData) {
	    var config = {};
	    for (var i = 0, cnt = Properties.length; i < cnt; i++) {
	        var name = Properties[i];
	        if (jsonData.hasOwnProperty(name)) {
	            config[name] = jsonData[name];
	        }
	    }

	    return config;
	};

	var GetConditionExpression = function (conditions) {
	    var t = typeof (conditions);

	    if (conditions == null) {
	        return 'true';
	    } else if ((t === 'string') || (t === 'number')) {
	        return conditions;
	    } else if (!Array.isArray(conditions) || !conditions.length) {
	        return 'true'
	    }
	    // conditions is an array
	    var condition;
	    for (var i = 0, cnt = conditions.length; i < cnt; i++) {
	        condition = conditions[i];
	        if (typeof (condition) === 'string') ; else if (Array.isArray(condition)) {
	            conditions[i] = `(${condition.join(') && (')})`;
	        } else if (condition.and) {
	            conditions[i] = `(${condition.and.join(') && (')})`;
	        } else {
	            conditions[i] = '(false)';
	        }
	    }
	    condition = `(${conditions.join(') || (')})`;

	    return condition;
	};

	var CreateIfDecorator = function (expression, onConditionFailValue) {
	    var onFailState = (onConditionFailValue) ? SUCCESS$1 : FAILURE;
	    var ifDecorator;
	    try {
	        ifDecorator = new If({
	            expression: expression,
	            onFailState: onFailState,
	        });
	    } catch (e) {
	        console.error(`[EventSheet] Parse expression '${expression}' failed, replace expression by 'false'`);
	        console.error(e);

	        ifDecorator = new If({
	            expression: 'false',
	            onFailState: onFailState,
	        });
	    }

	    return ifDecorator;
	};

	var CreateActionNode = function (nodeData) {
	    var node, ifDecorator;

	    var expression = GetConditionExpression(nodeData.condition);
	    if (expression !== 'true') {
	        ifDecorator = CreateIfDecorator(expression, true);
	    }

	    switch (nodeData.type) {
	        case 'command':
	        case undefined:
	            delete nodeData.type;
	            node = new TaskAction(nodeData);
	            break;

	        case 'exit':
	            node = new Abort({ title: '[exit]' });
	            break;

	        case 'break':
	            node = new Failer({ title: '[break]' });
	            break;

	        case 'activate':
	            var activateTreeTitle = nodeData.target || '';
	            node = new ActivateAction({
	                title: '[activate]',
	                activateTreeTitle: activateTreeTitle.trim(),
	            });
	            break;

	        case 'deactivate':
	            var deactivateTreeTitle = nodeData.target || '';
	            node = new DeactivateAction({
	                title: '[deactivate]',
	                deactivateTreeTitle: deactivateTreeTitle.trim(),
	            });
	            break;

	        default:
	            console.warn(`Unsupported nodeData.type '${nodeData.type}' - treated as success.`);
	            node = new Succeeder();
	            break;
	    }

	    if (ifDecorator) {
	        // If <- Action
	        ifDecorator.addChild(node);
	        node = ifDecorator;
	    }

	    return node;
	};

	var CreateActionSequence = function (actions, title, isTaskSequence) {
	    if (!actions || !actions.length) {
	        return new Succeeder();
	    }

	    var parentNode;
	    if (isTaskSequence) {
	        // label
	        parentNode = new TaskSequence({ title: title });
	    } else {
	        parentNode = new Sequence();
	    }

	    var node;
	    for (var i = 0, cnt = actions.length; i < cnt; i++) {
	        var nodeData = actions[i];
	        if (nodeData.type) {
	            nodeData.type = nodeData.type.toLowerCase();
	        }

	        switch (nodeData.type) {
	            case undefined:
	                if (nodeData.branches) {  // type: if
	                    node = CreateIFNode(nodeData);
	                } else if (nodeData.times) {  // type: repeat
	                    node = CreateRepeatNode(nodeData);
	                } else if (nodeData.actions) {  // type: label
	                    node = CreateSequenceNode(nodeData,
	                        {
	                            isTaskSequence: true,
	                            onConditionFailValue: true
	                        }
	                    );
	                } else {  // type: command
	                    node = CreateActionNode(nodeData);
	                }
	                break;

	            case 'if':
	                node = CreateIFNode(nodeData);
	                break;

	            case 'while':
	                node = CreateWhileNode(nodeData);
	                break;

	            case 'repeat':
	                node = CreateRepeatNode(nodeData);
	                break;

	            case 'label':
	                node = CreateSequenceNode(nodeData,
	                    {
	                        isTaskSequence: true,
	                        onConditionFailValue: true
	                    }
	                );
	                break;

	            default:
	                node = CreateActionNode(nodeData);
	                break;
	        }

	        parentNode.addChild(node);
	    }

	    return parentNode;
	};

	var CreateIFNode = function (nodeData) {
	    var node = new Selector({
	        title: '[if]'
	    });

	    var branches = nodeData.branches;
	    var hasTrueExpression = false;
	    for (var i = 0, cnt = branches.length; i < cnt; i++) {
	        var branchNode = CreateSequenceNode(branches[i]);
	        node.addChild(branchNode);

	        hasTrueExpression = !(branchNode instanceof If);
	        if (hasTrueExpression) {
	            break;
	        }
	    }

	    if (!hasTrueExpression) {
	        node.addChild(new Succeeder());
	    }
	    return node;
	};

	var CreateWhileNode = function (nodeData) {
	    var node = new RepeatUntilFailure({
	        title: '[while]',
	        returnSuccess: true,
	    });
	    node.addChild(CreateSequenceNode(nodeData));
	    return node;
	};

	var CreateRepeatNode = function (nodeData) {
	    var node = new Repeat({
	        title: '[repeat]',
	        maxLoop: nodeData.times,
	    });
	    node.addChild(CreateSequenceNode(nodeData, { ignoreCondition: true }));
	    return node;
	};

	var CreateSequenceNode = function (nodeData, config = {}) {
	    // properties: title(for label only), condition(can be ignored), actions

	    var {
	        isTaskSequence = false,
	        ignoreCondition = false,
	        onConditionFailValue = false,
	    } = config;

	    var node, ifDecorator;

	    if (!ignoreCondition) {
	        var expression = GetConditionExpression(nodeData.condition);
	        if (expression !== 'true') {
	            ifDecorator = CreateIfDecorator(expression, onConditionFailValue);
	        }
	    }

	    var title = (isTaskSequence) ? nodeData.title : undefined;
	    node = CreateActionSequence(nodeData.actions, title, isTaskSequence);

	    if (ifDecorator) {
	        ifDecorator.addChild(node);
	        node = ifDecorator;
	    }

	    return node;
	};

	var BuildTree = function (
	    eventSheetManager,
	    jsonData,
	    config = {}
	) {

	    var {
	        title,
	        condition = [],
	        script,
	        fallback,
	    } = jsonData;

	    var {
	        groupName,
	        parallel = false,
	        active = true,
	        once = false,
	    } = config;

	    var treeConfig = Object.assign(
	        { groupName, parallel, active, once },
	        GetTreeConfig(jsonData)
	    );

	    var eventsheet = new EventSheet(
	        eventSheetManager,
	        {
	            title: title,
	            condition: GetConditionExpression(condition),
	            properties: treeConfig
	        }
	    );

	    // Build node tree
	    var taskSequence = CreateActionSequence(script);
	    eventsheet.root.addChild(taskSequence);

	    var forceFailure = new ForceFailure();
	    forceFailure.addChild(CreateActionSequence(fallback));
	    eventsheet.root.addChild(forceFailure);

	    return eventsheet;
	};

	class JSONEventSheets extends EventSheetManager {
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

	    addEventSheet(jsonData, groupName, config) {
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
	            parallel = this.parallel,
	            groupName = groupName
	        } = config;

	        var eventsheet = BuildTree(
	            this,
	            jsonData,
	            {
	                groupName,
	                parallel
	            }
	        );

	        this.addTree(eventsheet, eventsheet.groupName);

	        return this;
	    }
	}

	/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
	function isNothing(subject) {
	  return (typeof subject === 'undefined') || (subject === null);
	}


	function isObject(subject) {
	  return (typeof subject === 'object') && (subject !== null);
	}


	function toArray(sequence) {
	  if (Array.isArray(sequence)) return sequence;
	  else if (isNothing(sequence)) return [];

	  return [ sequence ];
	}


	function extend(target, source) {
	  var index, length, key, sourceKeys;

	  if (source) {
	    sourceKeys = Object.keys(source);

	    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
	      key = sourceKeys[index];
	      target[key] = source[key];
	    }
	  }

	  return target;
	}


	function repeat(string, count) {
	  var result = '', cycle;

	  for (cycle = 0; cycle < count; cycle += 1) {
	    result += string;
	  }

	  return result;
	}


	function isNegativeZero(number) {
	  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
	}


	var isNothing_1      = isNothing;
	var isObject_1       = isObject;
	var toArray_1        = toArray;
	var repeat_1         = repeat;
	var isNegativeZero_1 = isNegativeZero;
	var extend_1         = extend;

	var common = {
		isNothing: isNothing_1,
		isObject: isObject_1,
		toArray: toArray_1,
		repeat: repeat_1,
		isNegativeZero: isNegativeZero_1,
		extend: extend_1
	};

	// YAML error class. http://stackoverflow.com/questions/8458984


	function formatError(exception, compact) {
	  var where = '', message = exception.reason || '(unknown reason)';

	  if (!exception.mark) return message;

	  if (exception.mark.name) {
	    where += 'in "' + exception.mark.name + '" ';
	  }

	  where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';

	  if (!compact && exception.mark.snippet) {
	    where += '\n\n' + exception.mark.snippet;
	  }

	  return message + ' ' + where;
	}


	function YAMLException$1(reason, mark) {
	  // Super constructor
	  Error.call(this);

	  this.name = 'YAMLException';
	  this.reason = reason;
	  this.mark = mark;
	  this.message = formatError(this, false);

	  // Include stack trace in error object
	  if (Error.captureStackTrace) {
	    // Chrome and NodeJS
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    // FF, IE 10+ and Safari 6+. Fallback for others
	    this.stack = (new Error()).stack || '';
	  }
	}


	// Inherit from Error
	YAMLException$1.prototype = Object.create(Error.prototype);
	YAMLException$1.prototype.constructor = YAMLException$1;


	YAMLException$1.prototype.toString = function toString(compact) {
	  return this.name + ': ' + formatError(this, compact);
	};


	var exception = YAMLException$1;

	// get snippet for a single line, respecting maxLength
	function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
	  var head = '';
	  var tail = '';
	  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;

	  if (position - lineStart > maxHalfLength) {
	    head = ' ... ';
	    lineStart = position - maxHalfLength + head.length;
	  }

	  if (lineEnd - position > maxHalfLength) {
	    tail = ' ...';
	    lineEnd = position + maxHalfLength - tail.length;
	  }

	  return {
	    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, '→') + tail,
	    pos: position - lineStart + head.length // relative position
	  };
	}


	function padStart(string, max) {
	  return common.repeat(' ', max - string.length) + string;
	}


	function makeSnippet(mark, options) {
	  options = Object.create(options || null);

	  if (!mark.buffer) return null;

	  if (!options.maxLength) options.maxLength = 79;
	  if (typeof options.indent      !== 'number') options.indent      = 1;
	  if (typeof options.linesBefore !== 'number') options.linesBefore = 3;
	  if (typeof options.linesAfter  !== 'number') options.linesAfter  = 2;

	  var re = /\r?\n|\r|\0/g;
	  var lineStarts = [ 0 ];
	  var lineEnds = [];
	  var match;
	  var foundLineNo = -1;

	  while ((match = re.exec(mark.buffer))) {
	    lineEnds.push(match.index);
	    lineStarts.push(match.index + match[0].length);

	    if (mark.position <= match.index && foundLineNo < 0) {
	      foundLineNo = lineStarts.length - 2;
	    }
	  }

	  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;

	  var result = '', i, line;
	  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
	  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);

	  for (i = 1; i <= options.linesBefore; i++) {
	    if (foundLineNo - i < 0) break;
	    line = getLine(
	      mark.buffer,
	      lineStarts[foundLineNo - i],
	      lineEnds[foundLineNo - i],
	      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
	      maxLineLength
	    );
	    result = common.repeat(' ', options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) +
	      ' | ' + line.str + '\n' + result;
	  }

	  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
	  result += common.repeat(' ', options.indent) + padStart((mark.line + 1).toString(), lineNoLength) +
	    ' | ' + line.str + '\n';
	  result += common.repeat('-', options.indent + lineNoLength + 3 + line.pos) + '^' + '\n';

	  for (i = 1; i <= options.linesAfter; i++) {
	    if (foundLineNo + i >= lineEnds.length) break;
	    line = getLine(
	      mark.buffer,
	      lineStarts[foundLineNo + i],
	      lineEnds[foundLineNo + i],
	      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
	      maxLineLength
	    );
	    result += common.repeat(' ', options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) +
	      ' | ' + line.str + '\n';
	  }

	  return result.replace(/\n$/, '');
	}


	var snippet = makeSnippet;

	var TYPE_CONSTRUCTOR_OPTIONS = [
	  'kind',
	  'multi',
	  'resolve',
	  'construct',
	  'instanceOf',
	  'predicate',
	  'represent',
	  'representName',
	  'defaultStyle',
	  'styleAliases'
	];

	var YAML_NODE_KINDS = [
	  'scalar',
	  'sequence',
	  'mapping'
	];

	function compileStyleAliases(map) {
	  var result = {};

	  if (map !== null) {
	    Object.keys(map).forEach(function (style) {
	      map[style].forEach(function (alias) {
	        result[String(alias)] = style;
	      });
	    });
	  }

	  return result;
	}

	function Type$1(tag, options) {
	  options = options || {};

	  Object.keys(options).forEach(function (name) {
	    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
	      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
	    }
	  });

	  // TODO: Add tag format check.
	  this.options       = options; // keep original options in case user wants to extend this type later
	  this.tag           = tag;
	  this.kind          = options['kind']          || null;
	  this.resolve       = options['resolve']       || function () { return true; };
	  this.construct     = options['construct']     || function (data) { return data; };
	  this.instanceOf    = options['instanceOf']    || null;
	  this.predicate     = options['predicate']     || null;
	  this.represent     = options['represent']     || null;
	  this.representName = options['representName'] || null;
	  this.defaultStyle  = options['defaultStyle']  || null;
	  this.multi         = options['multi']         || false;
	  this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);

	  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
	    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
	  }
	}

	var type = Type$1;

	/*eslint-disable max-len*/





	function compileList(schema, name) {
	  var result = [];

	  schema[name].forEach(function (currentType) {
	    var newIndex = result.length;

	    result.forEach(function (previousType, previousIndex) {
	      if (previousType.tag === currentType.tag &&
	          previousType.kind === currentType.kind &&
	          previousType.multi === currentType.multi) {

	        newIndex = previousIndex;
	      }
	    });

	    result[newIndex] = currentType;
	  });

	  return result;
	}


	function compileMap(/* lists... */) {
	  var result = {
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
	      }, index, length;

	  function collectType(type) {
	    if (type.multi) {
	      result.multi[type.kind].push(type);
	      result.multi['fallback'].push(type);
	    } else {
	      result[type.kind][type.tag] = result['fallback'][type.tag] = type;
	    }
	  }

	  for (index = 0, length = arguments.length; index < length; index += 1) {
	    arguments[index].forEach(collectType);
	  }
	  return result;
	}


	function Schema$1(definition) {
	  return this.extend(definition);
	}


	Schema$1.prototype.extend = function extend(definition) {
	  var implicit = [];
	  var explicit = [];

	  if (definition instanceof type) {
	    // Schema.extend(type)
	    explicit.push(definition);

	  } else if (Array.isArray(definition)) {
	    // Schema.extend([ type1, type2, ... ])
	    explicit = explicit.concat(definition);

	  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
	    // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
	    if (definition.implicit) implicit = implicit.concat(definition.implicit);
	    if (definition.explicit) explicit = explicit.concat(definition.explicit);

	  } else {
	    throw new exception('Schema.extend argument should be a Type, [ Type ], ' +
	      'or a schema definition ({ implicit: [...], explicit: [...] })');
	  }

	  implicit.forEach(function (type$1) {
	    if (!(type$1 instanceof type)) {
	      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
	    }

	    if (type$1.loadKind && type$1.loadKind !== 'scalar') {
	      throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
	    }

	    if (type$1.multi) {
	      throw new exception('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
	    }
	  });

	  explicit.forEach(function (type$1) {
	    if (!(type$1 instanceof type)) {
	      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
	    }
	  });

	  var result = Object.create(Schema$1.prototype);

	  result.implicit = (this.implicit || []).concat(implicit);
	  result.explicit = (this.explicit || []).concat(explicit);

	  result.compiledImplicit = compileList(result, 'implicit');
	  result.compiledExplicit = compileList(result, 'explicit');
	  result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);

	  return result;
	};


	var schema = Schema$1;

	var str = new type('tag:yaml.org,2002:str', {
	  kind: 'scalar',
	  construct: function (data) { return data !== null ? data : ''; }
	});

	var seq = new type('tag:yaml.org,2002:seq', {
	  kind: 'sequence',
	  construct: function (data) { return data !== null ? data : []; }
	});

	var map = new type('tag:yaml.org,2002:map', {
	  kind: 'mapping',
	  construct: function (data) { return data !== null ? data : {}; }
	});

	var failsafe = new schema({
	  explicit: [
	    str,
	    seq,
	    map
	  ]
	});

	function resolveYamlNull(data) {
	  if (data === null) return true;

	  var max = data.length;

	  return (max === 1 && data === '~') ||
	         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
	}

	function constructYamlNull() {
	  return null;
	}

	function isNull(object) {
	  return object === null;
	}

	var _null = new type('tag:yaml.org,2002:null', {
	  kind: 'scalar',
	  resolve: resolveYamlNull,
	  construct: constructYamlNull,
	  predicate: isNull,
	  represent: {
	    canonical: function () { return '~';    },
	    lowercase: function () { return 'null'; },
	    uppercase: function () { return 'NULL'; },
	    camelcase: function () { return 'Null'; },
	    empty:     function () { return '';     }
	  },
	  defaultStyle: 'lowercase'
	});

	function resolveYamlBoolean(data) {
	  if (data === null) return false;

	  var max = data.length;

	  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
	         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
	}

	function constructYamlBoolean(data) {
	  return data === 'true' ||
	         data === 'True' ||
	         data === 'TRUE';
	}

	function isBoolean(object) {
	  return Object.prototype.toString.call(object) === '[object Boolean]';
	}

	var bool = new type('tag:yaml.org,2002:bool', {
	  kind: 'scalar',
	  resolve: resolveYamlBoolean,
	  construct: constructYamlBoolean,
	  predicate: isBoolean,
	  represent: {
	    lowercase: function (object) { return object ? 'true' : 'false'; },
	    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
	    camelcase: function (object) { return object ? 'True' : 'False'; }
	  },
	  defaultStyle: 'lowercase'
	});

	function isHexCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
	         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
	         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
	}

	function isOctCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
	}

	function isDecCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
	}

	function resolveYamlInteger(data) {
	  if (data === null) return false;

	  var max = data.length,
	      index = 0,
	      hasDigits = false,
	      ch;

	  if (!max) return false;

	  ch = data[index];

	  // sign
	  if (ch === '-' || ch === '+') {
	    ch = data[++index];
	  }

	  if (ch === '0') {
	    // 0
	    if (index + 1 === max) return true;
	    ch = data[++index];

	    // base 2, base 8, base 16

	    if (ch === 'b') {
	      // base 2
	      index++;

	      for (; index < max; index++) {
	        ch = data[index];
	        if (ch === '_') continue;
	        if (ch !== '0' && ch !== '1') return false;
	        hasDigits = true;
	      }
	      return hasDigits && ch !== '_';
	    }


	    if (ch === 'x') {
	      // base 16
	      index++;

	      for (; index < max; index++) {
	        ch = data[index];
	        if (ch === '_') continue;
	        if (!isHexCode(data.charCodeAt(index))) return false;
	        hasDigits = true;
	      }
	      return hasDigits && ch !== '_';
	    }


	    if (ch === 'o') {
	      // base 8
	      index++;

	      for (; index < max; index++) {
	        ch = data[index];
	        if (ch === '_') continue;
	        if (!isOctCode(data.charCodeAt(index))) return false;
	        hasDigits = true;
	      }
	      return hasDigits && ch !== '_';
	    }
	  }

	  // base 10 (except 0)

	  // value should not start with `_`;
	  if (ch === '_') return false;

	  for (; index < max; index++) {
	    ch = data[index];
	    if (ch === '_') continue;
	    if (!isDecCode(data.charCodeAt(index))) {
	      return false;
	    }
	    hasDigits = true;
	  }

	  // Should have digits and should not end with `_`
	  if (!hasDigits || ch === '_') return false;

	  return true;
	}

	function constructYamlInteger(data) {
	  var value = data, sign = 1, ch;

	  if (value.indexOf('_') !== -1) {
	    value = value.replace(/_/g, '');
	  }

	  ch = value[0];

	  if (ch === '-' || ch === '+') {
	    if (ch === '-') sign = -1;
	    value = value.slice(1);
	    ch = value[0];
	  }

	  if (value === '0') return 0;

	  if (ch === '0') {
	    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
	    if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
	    if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
	  }

	  return sign * parseInt(value, 10);
	}

	function isInteger(object) {
	  return (Object.prototype.toString.call(object)) === '[object Number]' &&
	         (object % 1 === 0 && !common.isNegativeZero(object));
	}

	var int = new type('tag:yaml.org,2002:int', {
	  kind: 'scalar',
	  resolve: resolveYamlInteger,
	  construct: constructYamlInteger,
	  predicate: isInteger,
	  represent: {
	    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
	    octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
	    decimal:     function (obj) { return obj.toString(10); },
	    /* eslint-disable max-len */
	    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
	  },
	  defaultStyle: 'decimal',
	  styleAliases: {
	    binary:      [ 2,  'bin' ],
	    octal:       [ 8,  'oct' ],
	    decimal:     [ 10, 'dec' ],
	    hexadecimal: [ 16, 'hex' ]
	  }
	});

	var YAML_FLOAT_PATTERN = new RegExp(
	  // 2.5e4, 2.5 and integers
	  '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
	  // .2e4, .2
	  // special case, seems not from spec
	  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
	  // .inf
	  '|[-+]?\\.(?:inf|Inf|INF)' +
	  // .nan
	  '|\\.(?:nan|NaN|NAN))$');

	function resolveYamlFloat(data) {
	  if (data === null) return false;

	  if (!YAML_FLOAT_PATTERN.test(data) ||
	      // Quick hack to not allow integers end with `_`
	      // Probably should update regexp & check speed
	      data[data.length - 1] === '_') {
	    return false;
	  }

	  return true;
	}

	function constructYamlFloat(data) {
	  var value, sign;

	  value  = data.replace(/_/g, '').toLowerCase();
	  sign   = value[0] === '-' ? -1 : 1;

	  if ('+-'.indexOf(value[0]) >= 0) {
	    value = value.slice(1);
	  }

	  if (value === '.inf') {
	    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

	  } else if (value === '.nan') {
	    return NaN;
	  }
	  return sign * parseFloat(value, 10);
	}


	var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

	function representYamlFloat(object, style) {
	  var res;

	  if (isNaN(object)) {
	    switch (style) {
	      case 'lowercase': return '.nan';
	      case 'uppercase': return '.NAN';
	      case 'camelcase': return '.NaN';
	    }
	  } else if (Number.POSITIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '.inf';
	      case 'uppercase': return '.INF';
	      case 'camelcase': return '.Inf';
	    }
	  } else if (Number.NEGATIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '-.inf';
	      case 'uppercase': return '-.INF';
	      case 'camelcase': return '-.Inf';
	    }
	  } else if (common.isNegativeZero(object)) {
	    return '-0.0';
	  }

	  res = object.toString(10);

	  // JS stringifier can build scientific format without dots: 5e-100,
	  // while YAML requres dot: 5.e-100. Fix it with simple hack

	  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
	}

	function isFloat(object) {
	  return (Object.prototype.toString.call(object) === '[object Number]') &&
	         (object % 1 !== 0 || common.isNegativeZero(object));
	}

	var float = new type('tag:yaml.org,2002:float', {
	  kind: 'scalar',
	  resolve: resolveYamlFloat,
	  construct: constructYamlFloat,
	  predicate: isFloat,
	  represent: representYamlFloat,
	  defaultStyle: 'lowercase'
	});

	var json = failsafe.extend({
	  implicit: [
	    _null,
	    bool,
	    int,
	    float
	  ]
	});

	var core = json;

	var YAML_DATE_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9])'                    + // [2] month
	  '-([0-9][0-9])$');                   // [3] day

	var YAML_TIMESTAMP_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9]?)'                   + // [2] month
	  '-([0-9][0-9]?)'                   + // [3] day
	  '(?:[Tt]|[ \\t]+)'                 + // ...
	  '([0-9][0-9]?)'                    + // [4] hour
	  ':([0-9][0-9])'                    + // [5] minute
	  ':([0-9][0-9])'                    + // [6] second
	  '(?:\\.([0-9]*))?'                 + // [7] fraction
	  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
	  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

	function resolveYamlTimestamp(data) {
	  if (data === null) return false;
	  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
	  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
	  return false;
	}

	function constructYamlTimestamp(data) {
	  var match, year, month, day, hour, minute, second, fraction = 0,
	      delta = null, tz_hour, tz_minute, date;

	  match = YAML_DATE_REGEXP.exec(data);
	  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

	  if (match === null) throw new Error('Date resolve error');

	  // match: [1] year [2] month [3] day

	  year = +(match[1]);
	  month = +(match[2]) - 1; // JS month starts with 0
	  day = +(match[3]);

	  if (!match[4]) { // no hour
	    return new Date(Date.UTC(year, month, day));
	  }

	  // match: [4] hour [5] minute [6] second [7] fraction

	  hour = +(match[4]);
	  minute = +(match[5]);
	  second = +(match[6]);

	  if (match[7]) {
	    fraction = match[7].slice(0, 3);
	    while (fraction.length < 3) { // milli-seconds
	      fraction += '0';
	    }
	    fraction = +fraction;
	  }

	  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

	  if (match[9]) {
	    tz_hour = +(match[10]);
	    tz_minute = +(match[11] || 0);
	    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
	    if (match[9] === '-') delta = -delta;
	  }

	  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

	  if (delta) date.setTime(date.getTime() - delta);

	  return date;
	}

	function representYamlTimestamp(object /*, style*/) {
	  return object.toISOString();
	}

	var timestamp = new type('tag:yaml.org,2002:timestamp', {
	  kind: 'scalar',
	  resolve: resolveYamlTimestamp,
	  construct: constructYamlTimestamp,
	  instanceOf: Date,
	  represent: representYamlTimestamp
	});

	function resolveYamlMerge(data) {
	  return data === '<<' || data === null;
	}

	var merge = new type('tag:yaml.org,2002:merge', {
	  kind: 'scalar',
	  resolve: resolveYamlMerge
	});

	/*eslint-disable no-bitwise*/





	// [ 64, 65, 66 ] -> [ padding, CR, LF ]
	var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


	function resolveYamlBinary(data) {
	  if (data === null) return false;

	  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

	  // Convert one by one.
	  for (idx = 0; idx < max; idx++) {
	    code = map.indexOf(data.charAt(idx));

	    // Skip CR/LF
	    if (code > 64) continue;

	    // Fail on illegal characters
	    if (code < 0) return false;

	    bitlen += 6;
	  }

	  // If there are any bits left, source was corrupted
	  return (bitlen % 8) === 0;
	}

	function constructYamlBinary(data) {
	  var idx, tailbits,
	      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
	      max = input.length,
	      map = BASE64_MAP,
	      bits = 0,
	      result = [];

	  // Collect by 6*4 bits (3 bytes)

	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 4 === 0) && idx) {
	      result.push((bits >> 16) & 0xFF);
	      result.push((bits >> 8) & 0xFF);
	      result.push(bits & 0xFF);
	    }

	    bits = (bits << 6) | map.indexOf(input.charAt(idx));
	  }

	  // Dump tail

	  tailbits = (max % 4) * 6;

	  if (tailbits === 0) {
	    result.push((bits >> 16) & 0xFF);
	    result.push((bits >> 8) & 0xFF);
	    result.push(bits & 0xFF);
	  } else if (tailbits === 18) {
	    result.push((bits >> 10) & 0xFF);
	    result.push((bits >> 2) & 0xFF);
	  } else if (tailbits === 12) {
	    result.push((bits >> 4) & 0xFF);
	  }

	  return new Uint8Array(result);
	}

	function representYamlBinary(object /*, style*/) {
	  var result = '', bits = 0, idx, tail,
	      max = object.length,
	      map = BASE64_MAP;

	  // Convert every three bytes to 4 ASCII characters.

	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 3 === 0) && idx) {
	      result += map[(bits >> 18) & 0x3F];
	      result += map[(bits >> 12) & 0x3F];
	      result += map[(bits >> 6) & 0x3F];
	      result += map[bits & 0x3F];
	    }

	    bits = (bits << 8) + object[idx];
	  }

	  // Dump tail

	  tail = max % 3;

	  if (tail === 0) {
	    result += map[(bits >> 18) & 0x3F];
	    result += map[(bits >> 12) & 0x3F];
	    result += map[(bits >> 6) & 0x3F];
	    result += map[bits & 0x3F];
	  } else if (tail === 2) {
	    result += map[(bits >> 10) & 0x3F];
	    result += map[(bits >> 4) & 0x3F];
	    result += map[(bits << 2) & 0x3F];
	    result += map[64];
	  } else if (tail === 1) {
	    result += map[(bits >> 2) & 0x3F];
	    result += map[(bits << 4) & 0x3F];
	    result += map[64];
	    result += map[64];
	  }

	  return result;
	}

	function isBinary(obj) {
	  return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
	}

	var binary = new type('tag:yaml.org,2002:binary', {
	  kind: 'scalar',
	  resolve: resolveYamlBinary,
	  construct: constructYamlBinary,
	  predicate: isBinary,
	  represent: representYamlBinary
	});

	var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
	var _toString$2       = Object.prototype.toString;

	function resolveYamlOmap(data) {
	  if (data === null) return true;

	  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
	      object = data;

	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];
	    pairHasKey = false;

	    if (_toString$2.call(pair) !== '[object Object]') return false;

	    for (pairKey in pair) {
	      if (_hasOwnProperty$3.call(pair, pairKey)) {
	        if (!pairHasKey) pairHasKey = true;
	        else return false;
	      }
	    }

	    if (!pairHasKey) return false;

	    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
	    else return false;
	  }

	  return true;
	}

	function constructYamlOmap(data) {
	  return data !== null ? data : [];
	}

	var omap = new type('tag:yaml.org,2002:omap', {
	  kind: 'sequence',
	  resolve: resolveYamlOmap,
	  construct: constructYamlOmap
	});

	var _toString$1 = Object.prototype.toString;

	function resolveYamlPairs(data) {
	  if (data === null) return true;

	  var index, length, pair, keys, result,
	      object = data;

	  result = new Array(object.length);

	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];

	    if (_toString$1.call(pair) !== '[object Object]') return false;

	    keys = Object.keys(pair);

	    if (keys.length !== 1) return false;

	    result[index] = [ keys[0], pair[keys[0]] ];
	  }

	  return true;
	}

	function constructYamlPairs(data) {
	  if (data === null) return [];

	  var index, length, pair, keys, result,
	      object = data;

	  result = new Array(object.length);

	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];

	    keys = Object.keys(pair);

	    result[index] = [ keys[0], pair[keys[0]] ];
	  }

	  return result;
	}

	var pairs = new type('tag:yaml.org,2002:pairs', {
	  kind: 'sequence',
	  resolve: resolveYamlPairs,
	  construct: constructYamlPairs
	});

	var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;

	function resolveYamlSet(data) {
	  if (data === null) return true;

	  var key, object = data;

	  for (key in object) {
	    if (_hasOwnProperty$2.call(object, key)) {
	      if (object[key] !== null) return false;
	    }
	  }

	  return true;
	}

	function constructYamlSet(data) {
	  return data !== null ? data : {};
	}

	var set = new type('tag:yaml.org,2002:set', {
	  kind: 'mapping',
	  resolve: resolveYamlSet,
	  construct: constructYamlSet
	});

	var _default = core.extend({
	  implicit: [
	    timestamp,
	    merge
	  ],
	  explicit: [
	    binary,
	    omap,
	    pairs,
	    set
	  ]
	});

	/*eslint-disable max-len,no-use-before-define*/







	var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;


	var CONTEXT_FLOW_IN   = 1;
	var CONTEXT_FLOW_OUT  = 2;
	var CONTEXT_BLOCK_IN  = 3;
	var CONTEXT_BLOCK_OUT = 4;


	var CHOMPING_CLIP  = 1;
	var CHOMPING_STRIP = 2;
	var CHOMPING_KEEP  = 3;


	var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
	var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
	var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
	var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


	function _class(obj) { return Object.prototype.toString.call(obj); }

	function is_EOL(c) {
	  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
	}

	function is_WHITE_SPACE(c) {
	  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
	}

	function is_WS_OR_EOL(c) {
	  return (c === 0x09/* Tab */) ||
	         (c === 0x20/* Space */) ||
	         (c === 0x0A/* LF */) ||
	         (c === 0x0D/* CR */);
	}

	function is_FLOW_INDICATOR(c) {
	  return c === 0x2C/* , */ ||
	         c === 0x5B/* [ */ ||
	         c === 0x5D/* ] */ ||
	         c === 0x7B/* { */ ||
	         c === 0x7D/* } */;
	}

	function fromHexCode(c) {
	  var lc;

	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }

	  /*eslint-disable no-bitwise*/
	  lc = c | 0x20;

	  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
	    return lc - 0x61 + 10;
	  }

	  return -1;
	}

	function escapedHexLen(c) {
	  if (c === 0x78/* x */) { return 2; }
	  if (c === 0x75/* u */) { return 4; }
	  if (c === 0x55/* U */) { return 8; }
	  return 0;
	}

	function fromDecimalCode(c) {
	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }

	  return -1;
	}

	function simpleEscapeSequence(c) {
	  /* eslint-disable indent */
	  return (c === 0x30/* 0 */) ? '\x00' :
	        (c === 0x61/* a */) ? '\x07' :
	        (c === 0x62/* b */) ? '\x08' :
	        (c === 0x74/* t */) ? '\x09' :
	        (c === 0x09/* Tab */) ? '\x09' :
	        (c === 0x6E/* n */) ? '\x0A' :
	        (c === 0x76/* v */) ? '\x0B' :
	        (c === 0x66/* f */) ? '\x0C' :
	        (c === 0x72/* r */) ? '\x0D' :
	        (c === 0x65/* e */) ? '\x1B' :
	        (c === 0x20/* Space */) ? ' ' :
	        (c === 0x22/* " */) ? '\x22' :
	        (c === 0x2F/* / */) ? '/' :
	        (c === 0x5C/* \ */) ? '\x5C' :
	        (c === 0x4E/* N */) ? '\x85' :
	        (c === 0x5F/* _ */) ? '\xA0' :
	        (c === 0x4C/* L */) ? '\u2028' :
	        (c === 0x50/* P */) ? '\u2029' : '';
	}

	function charFromCodepoint(c) {
	  if (c <= 0xFFFF) {
	    return String.fromCharCode(c);
	  }
	  // Encode UTF-16 surrogate pair
	  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
	  return String.fromCharCode(
	    ((c - 0x010000) >> 10) + 0xD800,
	    ((c - 0x010000) & 0x03FF) + 0xDC00
	  );
	}

	var simpleEscapeCheck = new Array(256); // integer, for fast access
	var simpleEscapeMap = new Array(256);
	for (var i = 0; i < 256; i++) {
	  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
	  simpleEscapeMap[i] = simpleEscapeSequence(i);
	}


	function State$1(input, options) {
	  this.input = input;

	  this.filename  = options['filename']  || null;
	  this.schema    = options['schema']    || _default;
	  this.onWarning = options['onWarning'] || null;
	  // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
	  // if such documents have no explicit %YAML directive
	  this.legacy    = options['legacy']    || false;

	  this.json      = options['json']      || false;
	  this.listener  = options['listener']  || null;

	  this.implicitTypes = this.schema.compiledImplicit;
	  this.typeMap       = this.schema.compiledTypeMap;

	  this.length     = input.length;
	  this.position   = 0;
	  this.line       = 0;
	  this.lineStart  = 0;
	  this.lineIndent = 0;

	  // position of first leading tab in the current line,
	  // used to make sure there are no tabs in the indentation
	  this.firstTabInLine = -1;

	  this.documents = [];

	  /*
	  this.version;
	  this.checkLineBreaks;
	  this.tagMap;
	  this.anchorMap;
	  this.tag;
	  this.anchor;
	  this.kind;
	  this.result;*/

	}


	function generateError(state, message) {
	  var mark = {
	    name:     state.filename,
	    buffer:   state.input.slice(0, -1), // omit trailing \0
	    position: state.position,
	    line:     state.line,
	    column:   state.position - state.lineStart
	  };

	  mark.snippet = snippet(mark);

	  return new exception(message, mark);
	}

	function throwError(state, message) {
	  throw generateError(state, message);
	}

	function throwWarning(state, message) {
	  if (state.onWarning) {
	    state.onWarning.call(null, generateError(state, message));
	  }
	}


	var directiveHandlers = {

	  YAML: function handleYamlDirective(state, name, args) {

	    var match, major, minor;

	    if (state.version !== null) {
	      throwError(state, 'duplication of %YAML directive');
	    }

	    if (args.length !== 1) {
	      throwError(state, 'YAML directive accepts exactly one argument');
	    }

	    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

	    if (match === null) {
	      throwError(state, 'ill-formed argument of the YAML directive');
	    }

	    major = parseInt(match[1], 10);
	    minor = parseInt(match[2], 10);

	    if (major !== 1) {
	      throwError(state, 'unacceptable YAML version of the document');
	    }

	    state.version = args[0];
	    state.checkLineBreaks = (minor < 2);

	    if (minor !== 1 && minor !== 2) {
	      throwWarning(state, 'unsupported YAML version of the document');
	    }
	  },

	  TAG: function handleTagDirective(state, name, args) {

	    var handle, prefix;

	    if (args.length !== 2) {
	      throwError(state, 'TAG directive accepts exactly two arguments');
	    }

	    handle = args[0];
	    prefix = args[1];

	    if (!PATTERN_TAG_HANDLE.test(handle)) {
	      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
	    }

	    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
	      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
	    }

	    if (!PATTERN_TAG_URI.test(prefix)) {
	      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
	    }

	    try {
	      prefix = decodeURIComponent(prefix);
	    } catch (err) {
	      throwError(state, 'tag prefix is malformed: ' + prefix);
	    }

	    state.tagMap[handle] = prefix;
	  }
	};


	function captureSegment(state, start, end, checkJson) {
	  var _position, _length, _character, _result;

	  if (start < end) {
	    _result = state.input.slice(start, end);

	    if (checkJson) {
	      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
	        _character = _result.charCodeAt(_position);
	        if (!(_character === 0x09 ||
	              (0x20 <= _character && _character <= 0x10FFFF))) {
	          throwError(state, 'expected valid JSON character');
	        }
	      }
	    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
	      throwError(state, 'the stream contains non-printable characters');
	    }

	    state.result += _result;
	  }
	}

	function mergeMappings(state, destination, source, overridableKeys) {
	  var sourceKeys, key, index, quantity;

	  if (!common.isObject(source)) {
	    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
	  }

	  sourceKeys = Object.keys(source);

	  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
	    key = sourceKeys[index];

	    if (!_hasOwnProperty$1.call(destination, key)) {
	      destination[key] = source[key];
	      overridableKeys[key] = true;
	    }
	  }
	}

	function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode,
	  startLine, startLineStart, startPos) {

	  var index, quantity;

	  // The output is a plain object here, so keys can only be strings.
	  // We need to convert keyNode to a string, but doing so can hang the process
	  // (deeply nested arrays that explode exponentially using aliases).
	  if (Array.isArray(keyNode)) {
	    keyNode = Array.prototype.slice.call(keyNode);

	    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
	      if (Array.isArray(keyNode[index])) {
	        throwError(state, 'nested arrays are not supported inside keys');
	      }

	      if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
	        keyNode[index] = '[object Object]';
	      }
	    }
	  }

	  // Avoid code execution in load() via toString property
	  // (still use its own toString for arrays, timestamps,
	  // and whatever user schema extensions happen to have @@toStringTag)
	  if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
	    keyNode = '[object Object]';
	  }


	  keyNode = String(keyNode);

	  if (_result === null) {
	    _result = {};
	  }

	  if (keyTag === 'tag:yaml.org,2002:merge') {
	    if (Array.isArray(valueNode)) {
	      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
	        mergeMappings(state, _result, valueNode[index], overridableKeys);
	      }
	    } else {
	      mergeMappings(state, _result, valueNode, overridableKeys);
	    }
	  } else {
	    if (!state.json &&
	        !_hasOwnProperty$1.call(overridableKeys, keyNode) &&
	        _hasOwnProperty$1.call(_result, keyNode)) {
	      state.line = startLine || state.line;
	      state.lineStart = startLineStart || state.lineStart;
	      state.position = startPos || state.position;
	      throwError(state, 'duplicated mapping key');
	    }

	    // used for this specific key only because Object.defineProperty is slow
	    if (keyNode === '__proto__') {
	      Object.defineProperty(_result, keyNode, {
	        configurable: true,
	        enumerable: true,
	        writable: true,
	        value: valueNode
	      });
	    } else {
	      _result[keyNode] = valueNode;
	    }
	    delete overridableKeys[keyNode];
	  }

	  return _result;
	}

	function readLineBreak(state) {
	  var ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch === 0x0A/* LF */) {
	    state.position++;
	  } else if (ch === 0x0D/* CR */) {
	    state.position++;
	    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
	      state.position++;
	    }
	  } else {
	    throwError(state, 'a line break is expected');
	  }

	  state.line += 1;
	  state.lineStart = state.position;
	  state.firstTabInLine = -1;
	}

	function skipSeparationSpace(state, allowComments, checkIndent) {
	  var lineBreaks = 0,
	      ch = state.input.charCodeAt(state.position);

	  while (ch !== 0) {
	    while (is_WHITE_SPACE(ch)) {
	      if (ch === 0x09/* Tab */ && state.firstTabInLine === -1) {
	        state.firstTabInLine = state.position;
	      }
	      ch = state.input.charCodeAt(++state.position);
	    }

	    if (allowComments && ch === 0x23/* # */) {
	      do {
	        ch = state.input.charCodeAt(++state.position);
	      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
	    }

	    if (is_EOL(ch)) {
	      readLineBreak(state);

	      ch = state.input.charCodeAt(state.position);
	      lineBreaks++;
	      state.lineIndent = 0;

	      while (ch === 0x20/* Space */) {
	        state.lineIndent++;
	        ch = state.input.charCodeAt(++state.position);
	      }
	    } else {
	      break;
	    }
	  }

	  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
	    throwWarning(state, 'deficient indentation');
	  }

	  return lineBreaks;
	}

	function testDocumentSeparator(state) {
	  var _position = state.position,
	      ch;

	  ch = state.input.charCodeAt(_position);

	  // Condition state.position === state.lineStart is tested
	  // in parent on each call, for efficiency. No needs to test here again.
	  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
	      ch === state.input.charCodeAt(_position + 1) &&
	      ch === state.input.charCodeAt(_position + 2)) {

	    _position += 3;

	    ch = state.input.charCodeAt(_position);

	    if (ch === 0 || is_WS_OR_EOL(ch)) {
	      return true;
	    }
	  }

	  return false;
	}

	function writeFoldedLines(state, count) {
	  if (count === 1) {
	    state.result += ' ';
	  } else if (count > 1) {
	    state.result += common.repeat('\n', count - 1);
	  }
	}


	function readPlainScalar(state, nodeIndent, withinFlowCollection) {
	  var preceding,
	      following,
	      captureStart,
	      captureEnd,
	      hasPendingContent,
	      _line,
	      _lineStart,
	      _lineIndent,
	      _kind = state.kind,
	      _result = state.result,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (is_WS_OR_EOL(ch)      ||
	      is_FLOW_INDICATOR(ch) ||
	      ch === 0x23/* # */    ||
	      ch === 0x26/* & */    ||
	      ch === 0x2A/* * */    ||
	      ch === 0x21/* ! */    ||
	      ch === 0x7C/* | */    ||
	      ch === 0x3E/* > */    ||
	      ch === 0x27/* ' */    ||
	      ch === 0x22/* " */    ||
	      ch === 0x25/* % */    ||
	      ch === 0x40/* @ */    ||
	      ch === 0x60/* ` */) {
	    return false;
	  }

	  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
	    following = state.input.charCodeAt(state.position + 1);

	    if (is_WS_OR_EOL(following) ||
	        withinFlowCollection && is_FLOW_INDICATOR(following)) {
	      return false;
	    }
	  }

	  state.kind = 'scalar';
	  state.result = '';
	  captureStart = captureEnd = state.position;
	  hasPendingContent = false;

	  while (ch !== 0) {
	    if (ch === 0x3A/* : */) {
	      following = state.input.charCodeAt(state.position + 1);

	      if (is_WS_OR_EOL(following) ||
	          withinFlowCollection && is_FLOW_INDICATOR(following)) {
	        break;
	      }

	    } else if (ch === 0x23/* # */) {
	      preceding = state.input.charCodeAt(state.position - 1);

	      if (is_WS_OR_EOL(preceding)) {
	        break;
	      }

	    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
	               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
	      break;

	    } else if (is_EOL(ch)) {
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

	    if (!is_WHITE_SPACE(ch)) {
	      captureEnd = state.position + 1;
	    }

	    ch = state.input.charCodeAt(++state.position);
	  }

	  captureSegment(state, captureStart, captureEnd, false);

	  if (state.result) {
	    return true;
	  }

	  state.kind = _kind;
	  state.result = _result;
	  return false;
	}

	function readSingleQuotedScalar(state, nodeIndent) {
	  var ch,
	      captureStart, captureEnd;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x27/* ' */) {
	    return false;
	  }

	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;

	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x27/* ' */) {
	      captureSegment(state, captureStart, state.position, true);
	      ch = state.input.charCodeAt(++state.position);

	      if (ch === 0x27/* ' */) {
	        captureStart = state.position;
	        state.position++;
	        captureEnd = state.position;
	      } else {
	        return true;
	      }

	    } else if (is_EOL(ch)) {
	      captureSegment(state, captureStart, captureEnd, true);
	      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
	      captureStart = captureEnd = state.position;

	    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
	      throwError(state, 'unexpected end of the document within a single quoted scalar');

	    } else {
	      state.position++;
	      captureEnd = state.position;
	    }
	  }

	  throwError(state, 'unexpected end of the stream within a single quoted scalar');
	}

	function readDoubleQuotedScalar(state, nodeIndent) {
	  var captureStart,
	      captureEnd,
	      hexLength,
	      hexResult,
	      tmp,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x22/* " */) {
	    return false;
	  }

	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;

	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x22/* " */) {
	      captureSegment(state, captureStart, state.position, true);
	      state.position++;
	      return true;

	    } else if (ch === 0x5C/* \ */) {
	      captureSegment(state, captureStart, state.position, true);
	      ch = state.input.charCodeAt(++state.position);

	      if (is_EOL(ch)) {
	        skipSeparationSpace(state, false, nodeIndent);

	        // TODO: rework to inline fn with no type cast?
	      } else if (ch < 256 && simpleEscapeCheck[ch]) {
	        state.result += simpleEscapeMap[ch];
	        state.position++;

	      } else if ((tmp = escapedHexLen(ch)) > 0) {
	        hexLength = tmp;
	        hexResult = 0;

	        for (; hexLength > 0; hexLength--) {
	          ch = state.input.charCodeAt(++state.position);

	          if ((tmp = fromHexCode(ch)) >= 0) {
	            hexResult = (hexResult << 4) + tmp;

	          } else {
	            throwError(state, 'expected hexadecimal character');
	          }
	        }

	        state.result += charFromCodepoint(hexResult);

	        state.position++;

	      } else {
	        throwError(state, 'unknown escape sequence');
	      }

	      captureStart = captureEnd = state.position;

	    } else if (is_EOL(ch)) {
	      captureSegment(state, captureStart, captureEnd, true);
	      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
	      captureStart = captureEnd = state.position;

	    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
	      throwError(state, 'unexpected end of the document within a double quoted scalar');

	    } else {
	      state.position++;
	      captureEnd = state.position;
	    }
	  }

	  throwError(state, 'unexpected end of the stream within a double quoted scalar');
	}

	function readFlowCollection(state, nodeIndent) {
	  var readNext = true,
	      _line,
	      _lineStart,
	      _pos,
	      _tag     = state.tag,
	      _result,
	      _anchor  = state.anchor,
	      following,
	      terminator,
	      isPair,
	      isExplicitPair,
	      isMapping,
	      overridableKeys = Object.create(null),
	      keyNode,
	      keyTag,
	      valueNode,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch === 0x5B/* [ */) {
	    terminator = 0x5D;/* ] */
	    isMapping = false;
	    _result = [];
	  } else if (ch === 0x7B/* { */) {
	    terminator = 0x7D;/* } */
	    isMapping = true;
	    _result = {};
	  } else {
	    return false;
	  }

	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }

	  ch = state.input.charCodeAt(++state.position);

	  while (ch !== 0) {
	    skipSeparationSpace(state, true, nodeIndent);

	    ch = state.input.charCodeAt(state.position);

	    if (ch === terminator) {
	      state.position++;
	      state.tag = _tag;
	      state.anchor = _anchor;
	      state.kind = isMapping ? 'mapping' : 'sequence';
	      state.result = _result;
	      return true;
	    } else if (!readNext) {
	      throwError(state, 'missed comma between flow collection entries');
	    } else if (ch === 0x2C/* , */) {
	      // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
	      throwError(state, "expected the node content, but found ','");
	    }

	    keyTag = keyNode = valueNode = null;
	    isPair = isExplicitPair = false;

	    if (ch === 0x3F/* ? */) {
	      following = state.input.charCodeAt(state.position + 1);

	      if (is_WS_OR_EOL(following)) {
	        isPair = isExplicitPair = true;
	        state.position++;
	        skipSeparationSpace(state, true, nodeIndent);
	      }
	    }

	    _line = state.line; // Save the current line.
	    _lineStart = state.lineStart;
	    _pos = state.position;
	    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
	    keyTag = state.tag;
	    keyNode = state.result;
	    skipSeparationSpace(state, true, nodeIndent);

	    ch = state.input.charCodeAt(state.position);

	    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
	      isPair = true;
	      ch = state.input.charCodeAt(++state.position);
	      skipSeparationSpace(state, true, nodeIndent);
	      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
	      valueNode = state.result;
	    }

	    if (isMapping) {
	      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
	    } else if (isPair) {
	      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
	    } else {
	      _result.push(keyNode);
	    }

	    skipSeparationSpace(state, true, nodeIndent);

	    ch = state.input.charCodeAt(state.position);

	    if (ch === 0x2C/* , */) {
	      readNext = true;
	      ch = state.input.charCodeAt(++state.position);
	    } else {
	      readNext = false;
	    }
	  }

	  throwError(state, 'unexpected end of the stream within a flow collection');
	}

	function readBlockScalar(state, nodeIndent) {
	  var captureStart,
	      folding,
	      chomping       = CHOMPING_CLIP,
	      didReadContent = false,
	      detectedIndent = false,
	      textIndent     = nodeIndent,
	      emptyLines     = 0,
	      atMoreIndented = false,
	      tmp,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch === 0x7C/* | */) {
	    folding = false;
	  } else if (ch === 0x3E/* > */) {
	    folding = true;
	  } else {
	    return false;
	  }

	  state.kind = 'scalar';
	  state.result = '';

	  while (ch !== 0) {
	    ch = state.input.charCodeAt(++state.position);

	    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
	      if (CHOMPING_CLIP === chomping) {
	        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
	      } else {
	        throwError(state, 'repeat of a chomping mode identifier');
	      }

	    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
	      if (tmp === 0) {
	        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
	      } else if (!detectedIndent) {
	        textIndent = nodeIndent + tmp - 1;
	        detectedIndent = true;
	      } else {
	        throwError(state, 'repeat of an indentation width identifier');
	      }

	    } else {
	      break;
	    }
	  }

	  if (is_WHITE_SPACE(ch)) {
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (is_WHITE_SPACE(ch));

	    if (ch === 0x23/* # */) {
	      do { ch = state.input.charCodeAt(++state.position); }
	      while (!is_EOL(ch) && (ch !== 0));
	    }
	  }

	  while (ch !== 0) {
	    readLineBreak(state);
	    state.lineIndent = 0;

	    ch = state.input.charCodeAt(state.position);

	    while ((!detectedIndent || state.lineIndent < textIndent) &&
	           (ch === 0x20/* Space */)) {
	      state.lineIndent++;
	      ch = state.input.charCodeAt(++state.position);
	    }

	    if (!detectedIndent && state.lineIndent > textIndent) {
	      textIndent = state.lineIndent;
	    }

	    if (is_EOL(ch)) {
	      emptyLines++;
	      continue;
	    }

	    // End of the scalar.
	    if (state.lineIndent < textIndent) {

	      // Perform the chomping.
	      if (chomping === CHOMPING_KEEP) {
	        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	      } else if (chomping === CHOMPING_CLIP) {
	        if (didReadContent) { // i.e. only if the scalar is not empty.
	          state.result += '\n';
	        }
	      }

	      // Break this `while` cycle and go to the funciton's epilogue.
	      break;
	    }

	    // Folded style: use fancy rules to handle line breaks.
	    if (folding) {

	      // Lines starting with white space characters (more-indented lines) are not folded.
	      if (is_WHITE_SPACE(ch)) {
	        atMoreIndented = true;
	        // except for the first content line (cf. Example 8.1)
	        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

	      // End of more-indented block.
	      } else if (atMoreIndented) {
	        atMoreIndented = false;
	        state.result += common.repeat('\n', emptyLines + 1);

	      // Just one line break - perceive as the same line.
	      } else if (emptyLines === 0) {
	        if (didReadContent) { // i.e. only if we have already read some scalar content.
	          state.result += ' ';
	        }

	      // Several line breaks - perceive as different lines.
	      } else {
	        state.result += common.repeat('\n', emptyLines);
	      }

	    // Literal style: just add exact number of line breaks between content lines.
	    } else {
	      // Keep all line breaks except the header line break.
	      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	    }

	    didReadContent = true;
	    detectedIndent = true;
	    emptyLines = 0;
	    captureStart = state.position;

	    while (!is_EOL(ch) && (ch !== 0)) {
	      ch = state.input.charCodeAt(++state.position);
	    }

	    captureSegment(state, captureStart, state.position, false);
	  }

	  return true;
	}

	function readBlockSequence(state, nodeIndent) {
	  var _line,
	      _tag      = state.tag,
	      _anchor   = state.anchor,
	      _result   = [],
	      following,
	      detected  = false,
	      ch;

	  // there is a leading tab before this token, so it can't be a block sequence/mapping;
	  // it can still be flow sequence/mapping or a scalar
	  if (state.firstTabInLine !== -1) return false;

	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }

	  ch = state.input.charCodeAt(state.position);

	  while (ch !== 0) {
	    if (state.firstTabInLine !== -1) {
	      state.position = state.firstTabInLine;
	      throwError(state, 'tab characters must not be used in indentation');
	    }

	    if (ch !== 0x2D/* - */) {
	      break;
	    }

	    following = state.input.charCodeAt(state.position + 1);

	    if (!is_WS_OR_EOL(following)) {
	      break;
	    }

	    detected = true;
	    state.position++;

	    if (skipSeparationSpace(state, true, -1)) {
	      if (state.lineIndent <= nodeIndent) {
	        _result.push(null);
	        ch = state.input.charCodeAt(state.position);
	        continue;
	      }
	    }

	    _line = state.line;
	    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
	    _result.push(state.result);
	    skipSeparationSpace(state, true, -1);

	    ch = state.input.charCodeAt(state.position);

	    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
	      throwError(state, 'bad indentation of a sequence entry');
	    } else if (state.lineIndent < nodeIndent) {
	      break;
	    }
	  }

	  if (detected) {
	    state.tag = _tag;
	    state.anchor = _anchor;
	    state.kind = 'sequence';
	    state.result = _result;
	    return true;
	  }
	  return false;
	}

	function readBlockMapping(state, nodeIndent, flowIndent) {
	  var following,
	      allowCompact,
	      _line,
	      _keyLine,
	      _keyLineStart,
	      _keyPos,
	      _tag          = state.tag,
	      _anchor       = state.anchor,
	      _result       = {},
	      overridableKeys = Object.create(null),
	      keyTag        = null,
	      keyNode       = null,
	      valueNode     = null,
	      atExplicitKey = false,
	      detected      = false,
	      ch;

	  // there is a leading tab before this token, so it can't be a block sequence/mapping;
	  // it can still be flow sequence/mapping or a scalar
	  if (state.firstTabInLine !== -1) return false;

	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }

	  ch = state.input.charCodeAt(state.position);

	  while (ch !== 0) {
	    if (!atExplicitKey && state.firstTabInLine !== -1) {
	      state.position = state.firstTabInLine;
	      throwError(state, 'tab characters must not be used in indentation');
	    }

	    following = state.input.charCodeAt(state.position + 1);
	    _line = state.line; // Save the current line.

	    //
	    // Explicit notation case. There are two separate blocks:
	    // first for the key (denoted by "?") and second for the value (denoted by ":")
	    //
	    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

	      if (ch === 0x3F/* ? */) {
	        if (atExplicitKey) {
	          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
	          keyTag = keyNode = valueNode = null;
	        }

	        detected = true;
	        atExplicitKey = true;
	        allowCompact = true;

	      } else if (atExplicitKey) {
	        // i.e. 0x3A/* : */ === character after the explicit key.
	        atExplicitKey = false;
	        allowCompact = true;

	      } else {
	        throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
	      }

	      state.position += 1;
	      ch = following;

	    //
	    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
	    //
	    } else {
	      _keyLine = state.line;
	      _keyLineStart = state.lineStart;
	      _keyPos = state.position;

	      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
	        // Neither implicit nor explicit notation.
	        // Reading is done. Go to the epilogue.
	        break;
	      }

	      if (state.line === _line) {
	        ch = state.input.charCodeAt(state.position);

	        while (is_WHITE_SPACE(ch)) {
	          ch = state.input.charCodeAt(++state.position);
	        }

	        if (ch === 0x3A/* : */) {
	          ch = state.input.charCodeAt(++state.position);

	          if (!is_WS_OR_EOL(ch)) {
	            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
	          }

	          if (atExplicitKey) {
	            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
	            keyTag = keyNode = valueNode = null;
	          }

	          detected = true;
	          atExplicitKey = false;
	          allowCompact = false;
	          keyTag = state.tag;
	          keyNode = state.result;

	        } else if (detected) {
	          throwError(state, 'can not read an implicit mapping pair; a colon is missed');

	        } else {
	          state.tag = _tag;
	          state.anchor = _anchor;
	          return true; // Keep the result of `composeNode`.
	        }

	      } else if (detected) {
	        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

	      } else {
	        state.tag = _tag;
	        state.anchor = _anchor;
	        return true; // Keep the result of `composeNode`.
	      }
	    }

	    //
	    // Common reading code for both explicit and implicit notations.
	    //
	    if (state.line === _line || state.lineIndent > nodeIndent) {
	      if (atExplicitKey) {
	        _keyLine = state.line;
	        _keyLineStart = state.lineStart;
	        _keyPos = state.position;
	      }

	      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
	        if (atExplicitKey) {
	          keyNode = state.result;
	        } else {
	          valueNode = state.result;
	        }
	      }

	      if (!atExplicitKey) {
	        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
	        keyTag = keyNode = valueNode = null;
	      }

	      skipSeparationSpace(state, true, -1);
	      ch = state.input.charCodeAt(state.position);
	    }

	    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
	      throwError(state, 'bad indentation of a mapping entry');
	    } else if (state.lineIndent < nodeIndent) {
	      break;
	    }
	  }

	  //
	  // Epilogue.
	  //

	  // Special case: last mapping's node contains only the key in explicit notation.
	  if (atExplicitKey) {
	    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
	  }

	  // Expose the resulting mapping.
	  if (detected) {
	    state.tag = _tag;
	    state.anchor = _anchor;
	    state.kind = 'mapping';
	    state.result = _result;
	  }

	  return detected;
	}

	function readTagProperty(state) {
	  var _position,
	      isVerbatim = false,
	      isNamed    = false,
	      tagHandle,
	      tagName,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x21/* ! */) return false;

	  if (state.tag !== null) {
	    throwError(state, 'duplication of a tag property');
	  }

	  ch = state.input.charCodeAt(++state.position);

	  if (ch === 0x3C/* < */) {
	    isVerbatim = true;
	    ch = state.input.charCodeAt(++state.position);

	  } else if (ch === 0x21/* ! */) {
	    isNamed = true;
	    tagHandle = '!!';
	    ch = state.input.charCodeAt(++state.position);

	  } else {
	    tagHandle = '!';
	  }

	  _position = state.position;

	  if (isVerbatim) {
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (ch !== 0 && ch !== 0x3E/* > */);

	    if (state.position < state.length) {
	      tagName = state.input.slice(_position, state.position);
	      ch = state.input.charCodeAt(++state.position);
	    } else {
	      throwError(state, 'unexpected end of the stream within a verbatim tag');
	    }
	  } else {
	    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

	      if (ch === 0x21/* ! */) {
	        if (!isNamed) {
	          tagHandle = state.input.slice(_position - 1, state.position + 1);

	          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
	            throwError(state, 'named tag handle cannot contain such characters');
	          }

	          isNamed = true;
	          _position = state.position + 1;
	        } else {
	          throwError(state, 'tag suffix cannot contain exclamation marks');
	        }
	      }

	      ch = state.input.charCodeAt(++state.position);
	    }

	    tagName = state.input.slice(_position, state.position);

	    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
	      throwError(state, 'tag suffix cannot contain flow indicator characters');
	    }
	  }

	  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
	    throwError(state, 'tag name cannot contain such characters: ' + tagName);
	  }

	  try {
	    tagName = decodeURIComponent(tagName);
	  } catch (err) {
	    throwError(state, 'tag name is malformed: ' + tagName);
	  }

	  if (isVerbatim) {
	    state.tag = tagName;

	  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
	    state.tag = state.tagMap[tagHandle] + tagName;

	  } else if (tagHandle === '!') {
	    state.tag = '!' + tagName;

	  } else if (tagHandle === '!!') {
	    state.tag = 'tag:yaml.org,2002:' + tagName;

	  } else {
	    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
	  }

	  return true;
	}

	function readAnchorProperty(state) {
	  var _position,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x26/* & */) return false;

	  if (state.anchor !== null) {
	    throwError(state, 'duplication of an anchor property');
	  }

	  ch = state.input.charCodeAt(++state.position);
	  _position = state.position;

	  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
	    ch = state.input.charCodeAt(++state.position);
	  }

	  if (state.position === _position) {
	    throwError(state, 'name of an anchor node must contain at least one character');
	  }

	  state.anchor = state.input.slice(_position, state.position);
	  return true;
	}

	function readAlias(state) {
	  var _position, alias,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x2A/* * */) return false;

	  ch = state.input.charCodeAt(++state.position);
	  _position = state.position;

	  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
	    ch = state.input.charCodeAt(++state.position);
	  }

	  if (state.position === _position) {
	    throwError(state, 'name of an alias node must contain at least one character');
	  }

	  alias = state.input.slice(_position, state.position);

	  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
	    throwError(state, 'unidentified alias "' + alias + '"');
	  }

	  state.result = state.anchorMap[alias];
	  skipSeparationSpace(state, true, -1);
	  return true;
	}

	function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
	  var allowBlockStyles,
	      allowBlockScalars,
	      allowBlockCollections,
	      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
	      atNewLine  = false,
	      hasContent = false,
	      typeIndex,
	      typeQuantity,
	      typeList,
	      type,
	      flowIndent,
	      blockIndent;

	  if (state.listener !== null) {
	    state.listener('open', state);
	  }

	  state.tag    = null;
	  state.anchor = null;
	  state.kind   = null;
	  state.result = null;

	  allowBlockStyles = allowBlockScalars = allowBlockCollections =
	    CONTEXT_BLOCK_OUT === nodeContext ||
	    CONTEXT_BLOCK_IN  === nodeContext;

	  if (allowToSeek) {
	    if (skipSeparationSpace(state, true, -1)) {
	      atNewLine = true;

	      if (state.lineIndent > parentIndent) {
	        indentStatus = 1;
	      } else if (state.lineIndent === parentIndent) {
	        indentStatus = 0;
	      } else if (state.lineIndent < parentIndent) {
	        indentStatus = -1;
	      }
	    }
	  }

	  if (indentStatus === 1) {
	    while (readTagProperty(state) || readAnchorProperty(state)) {
	      if (skipSeparationSpace(state, true, -1)) {
	        atNewLine = true;
	        allowBlockCollections = allowBlockStyles;

	        if (state.lineIndent > parentIndent) {
	          indentStatus = 1;
	        } else if (state.lineIndent === parentIndent) {
	          indentStatus = 0;
	        } else if (state.lineIndent < parentIndent) {
	          indentStatus = -1;
	        }
	      } else {
	        allowBlockCollections = false;
	      }
	    }
	  }

	  if (allowBlockCollections) {
	    allowBlockCollections = atNewLine || allowCompact;
	  }

	  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
	    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
	      flowIndent = parentIndent;
	    } else {
	      flowIndent = parentIndent + 1;
	    }

	    blockIndent = state.position - state.lineStart;

	    if (indentStatus === 1) {
	      if (allowBlockCollections &&
	          (readBlockSequence(state, blockIndent) ||
	           readBlockMapping(state, blockIndent, flowIndent)) ||
	          readFlowCollection(state, flowIndent)) {
	        hasContent = true;
	      } else {
	        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
	            readSingleQuotedScalar(state, flowIndent) ||
	            readDoubleQuotedScalar(state, flowIndent)) {
	          hasContent = true;

	        } else if (readAlias(state)) {
	          hasContent = true;

	          if (state.tag !== null || state.anchor !== null) {
	            throwError(state, 'alias node should not have any properties');
	          }

	        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
	          hasContent = true;

	          if (state.tag === null) {
	            state.tag = '?';
	          }
	        }

	        if (state.anchor !== null) {
	          state.anchorMap[state.anchor] = state.result;
	        }
	      }
	    } else if (indentStatus === 0) {
	      // Special case: block sequences are allowed to have same indentation level as the parent.
	      // http://www.yaml.org/spec/1.2/spec.html#id2799784
	      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
	    }
	  }

	  if (state.tag === null) {
	    if (state.anchor !== null) {
	      state.anchorMap[state.anchor] = state.result;
	    }

	  } else if (state.tag === '?') {
	    // Implicit resolving is not allowed for non-scalar types, and '?'
	    // non-specific tag is only automatically assigned to plain scalars.
	    //
	    // We only need to check kind conformity in case user explicitly assigns '?'
	    // tag, for example like this: "!<?> [0]"
	    //
	    if (state.result !== null && state.kind !== 'scalar') {
	      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
	    }

	    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
	      type = state.implicitTypes[typeIndex];

	      if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
	        state.result = type.construct(state.result);
	        state.tag = type.tag;
	        if (state.anchor !== null) {
	          state.anchorMap[state.anchor] = state.result;
	        }
	        break;
	      }
	    }
	  } else if (state.tag !== '!') {
	    if (_hasOwnProperty$1.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
	      type = state.typeMap[state.kind || 'fallback'][state.tag];
	    } else {
	      // looking for multi type
	      type = null;
	      typeList = state.typeMap.multi[state.kind || 'fallback'];

	      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
	        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
	          type = typeList[typeIndex];
	          break;
	        }
	      }
	    }

	    if (!type) {
	      throwError(state, 'unknown tag !<' + state.tag + '>');
	    }

	    if (state.result !== null && type.kind !== state.kind) {
	      throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
	    }

	    if (!type.resolve(state.result, state.tag)) { // `state.result` updated in resolver if matched
	      throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
	    } else {
	      state.result = type.construct(state.result, state.tag);
	      if (state.anchor !== null) {
	        state.anchorMap[state.anchor] = state.result;
	      }
	    }
	  }

	  if (state.listener !== null) {
	    state.listener('close', state);
	  }
	  return state.tag !== null ||  state.anchor !== null || hasContent;
	}

	function readDocument(state) {
	  var documentStart = state.position,
	      _position,
	      directiveName,
	      directiveArgs,
	      hasDirectives = false,
	      ch;

	  state.version = null;
	  state.checkLineBreaks = state.legacy;
	  state.tagMap = Object.create(null);
	  state.anchorMap = Object.create(null);

	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    skipSeparationSpace(state, true, -1);

	    ch = state.input.charCodeAt(state.position);

	    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
	      break;
	    }

	    hasDirectives = true;
	    ch = state.input.charCodeAt(++state.position);
	    _position = state.position;

	    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	      ch = state.input.charCodeAt(++state.position);
	    }

	    directiveName = state.input.slice(_position, state.position);
	    directiveArgs = [];

	    if (directiveName.length < 1) {
	      throwError(state, 'directive name must not be less than one character in length');
	    }

	    while (ch !== 0) {
	      while (is_WHITE_SPACE(ch)) {
	        ch = state.input.charCodeAt(++state.position);
	      }

	      if (ch === 0x23/* # */) {
	        do { ch = state.input.charCodeAt(++state.position); }
	        while (ch !== 0 && !is_EOL(ch));
	        break;
	      }

	      if (is_EOL(ch)) break;

	      _position = state.position;

	      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	        ch = state.input.charCodeAt(++state.position);
	      }

	      directiveArgs.push(state.input.slice(_position, state.position));
	    }

	    if (ch !== 0) readLineBreak(state);

	    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
	      directiveHandlers[directiveName](state, directiveName, directiveArgs);
	    } else {
	      throwWarning(state, 'unknown document directive "' + directiveName + '"');
	    }
	  }

	  skipSeparationSpace(state, true, -1);

	  if (state.lineIndent === 0 &&
	      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
	    state.position += 3;
	    skipSeparationSpace(state, true, -1);

	  } else if (hasDirectives) {
	    throwError(state, 'directives end mark is expected');
	  }

	  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
	  skipSeparationSpace(state, true, -1);

	  if (state.checkLineBreaks &&
	      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
	    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
	  }

	  state.documents.push(state.result);

	  if (state.position === state.lineStart && testDocumentSeparator(state)) {

	    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
	      state.position += 3;
	      skipSeparationSpace(state, true, -1);
	    }
	    return;
	  }

	  if (state.position < (state.length - 1)) {
	    throwError(state, 'end of the stream or a document separator is expected');
	  } else {
	    return;
	  }
	}


	function loadDocuments(input, options) {
	  input = String(input);
	  options = options || {};

	  if (input.length !== 0) {

	    // Add tailing `\n` if not exists
	    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
	        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
	      input += '\n';
	    }

	    // Strip BOM
	    if (input.charCodeAt(0) === 0xFEFF) {
	      input = input.slice(1);
	    }
	  }

	  var state = new State$1(input, options);

	  var nullpos = input.indexOf('\0');

	  if (nullpos !== -1) {
	    state.position = nullpos;
	    throwError(state, 'null byte is not allowed in input');
	  }

	  // Use 0 as string terminator. That significantly simplifies bounds check.
	  state.input += '\0';

	  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
	    state.lineIndent += 1;
	    state.position += 1;
	  }

	  while (state.position < (state.length - 1)) {
	    readDocument(state);
	  }

	  return state.documents;
	}


	function loadAll$1(input, iterator, options) {
	  if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
	    options = iterator;
	    iterator = null;
	  }

	  var documents = loadDocuments(input, options);

	  if (typeof iterator !== 'function') {
	    return documents;
	  }

	  for (var index = 0, length = documents.length; index < length; index += 1) {
	    iterator(documents[index]);
	  }
	}


	function load$1(input, options) {
	  var documents = loadDocuments(input, options);

	  if (documents.length === 0) {
	    /*eslint-disable no-undefined*/
	    return undefined;
	  } else if (documents.length === 1) {
	    return documents[0];
	  }
	  throw new exception('expected a single document in the stream, but found more');
	}


	var loadAll_1 = loadAll$1;
	var load_1    = load$1;

	var loader = {
		loadAll: loadAll_1,
		load: load_1
	};

	/*eslint-disable no-use-before-define*/





	var _toString       = Object.prototype.toString;
	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	var CHAR_BOM                  = 0xFEFF;
	var CHAR_TAB                  = 0x09; /* Tab */
	var CHAR_LINE_FEED            = 0x0A; /* LF */
	var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
	var CHAR_SPACE                = 0x20; /* Space */
	var CHAR_EXCLAMATION          = 0x21; /* ! */
	var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
	var CHAR_SHARP                = 0x23; /* # */
	var CHAR_PERCENT              = 0x25; /* % */
	var CHAR_AMPERSAND            = 0x26; /* & */
	var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
	var CHAR_ASTERISK             = 0x2A; /* * */
	var CHAR_COMMA                = 0x2C; /* , */
	var CHAR_MINUS                = 0x2D; /* - */
	var CHAR_COLON                = 0x3A; /* : */
	var CHAR_EQUALS               = 0x3D; /* = */
	var CHAR_GREATER_THAN         = 0x3E; /* > */
	var CHAR_QUESTION             = 0x3F; /* ? */
	var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
	var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
	var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
	var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
	var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
	var CHAR_VERTICAL_LINE        = 0x7C; /* | */
	var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

	var ESCAPE_SEQUENCES = {};

	ESCAPE_SEQUENCES[0x00]   = '\\0';
	ESCAPE_SEQUENCES[0x07]   = '\\a';
	ESCAPE_SEQUENCES[0x08]   = '\\b';
	ESCAPE_SEQUENCES[0x09]   = '\\t';
	ESCAPE_SEQUENCES[0x0A]   = '\\n';
	ESCAPE_SEQUENCES[0x0B]   = '\\v';
	ESCAPE_SEQUENCES[0x0C]   = '\\f';
	ESCAPE_SEQUENCES[0x0D]   = '\\r';
	ESCAPE_SEQUENCES[0x1B]   = '\\e';
	ESCAPE_SEQUENCES[0x22]   = '\\"';
	ESCAPE_SEQUENCES[0x5C]   = '\\\\';
	ESCAPE_SEQUENCES[0x85]   = '\\N';
	ESCAPE_SEQUENCES[0xA0]   = '\\_';
	ESCAPE_SEQUENCES[0x2028] = '\\L';
	ESCAPE_SEQUENCES[0x2029] = '\\P';

	var DEPRECATED_BOOLEANS_SYNTAX = [
	  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
	  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
	];

	var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;

	function compileStyleMap(schema, map) {
	  var result, keys, index, length, tag, style, type;

	  if (map === null) return {};

	  result = {};
	  keys = Object.keys(map);

	  for (index = 0, length = keys.length; index < length; index += 1) {
	    tag = keys[index];
	    style = String(map[tag]);

	    if (tag.slice(0, 2) === '!!') {
	      tag = 'tag:yaml.org,2002:' + tag.slice(2);
	    }
	    type = schema.compiledTypeMap['fallback'][tag];

	    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
	      style = type.styleAliases[style];
	    }

	    result[tag] = style;
	  }

	  return result;
	}

	function encodeHex(character) {
	  var string, handle, length;

	  string = character.toString(16).toUpperCase();

	  if (character <= 0xFF) {
	    handle = 'x';
	    length = 2;
	  } else if (character <= 0xFFFF) {
	    handle = 'u';
	    length = 4;
	  } else if (character <= 0xFFFFFFFF) {
	    handle = 'U';
	    length = 8;
	  } else {
	    throw new exception('code point within a string may not be greater than 0xFFFFFFFF');
	  }

	  return '\\' + handle + common.repeat('0', length - string.length) + string;
	}


	var QUOTING_TYPE_SINGLE = 1,
	    QUOTING_TYPE_DOUBLE = 2;

	function State(options) {
	  this.schema        = options['schema'] || _default;
	  this.indent        = Math.max(1, (options['indent'] || 2));
	  this.noArrayIndent = options['noArrayIndent'] || false;
	  this.skipInvalid   = options['skipInvalid'] || false;
	  this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
	  this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
	  this.sortKeys      = options['sortKeys'] || false;
	  this.lineWidth     = options['lineWidth'] || 80;
	  this.noRefs        = options['noRefs'] || false;
	  this.noCompatMode  = options['noCompatMode'] || false;
	  this.condenseFlow  = options['condenseFlow'] || false;
	  this.quotingType   = options['quotingType'] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
	  this.forceQuotes   = options['forceQuotes'] || false;
	  this.replacer      = typeof options['replacer'] === 'function' ? options['replacer'] : null;

	  this.implicitTypes = this.schema.compiledImplicit;
	  this.explicitTypes = this.schema.compiledExplicit;

	  this.tag = null;
	  this.result = '';

	  this.duplicates = [];
	  this.usedDuplicates = null;
	}

	// Indents every line in a string. Empty lines (\n only) are not indented.
	function indentString(string, spaces) {
	  var ind = common.repeat(' ', spaces),
	      position = 0,
	      next = -1,
	      result = '',
	      line,
	      length = string.length;

	  while (position < length) {
	    next = string.indexOf('\n', position);
	    if (next === -1) {
	      line = string.slice(position);
	      position = length;
	    } else {
	      line = string.slice(position, next + 1);
	      position = next + 1;
	    }

	    if (line.length && line !== '\n') result += ind;

	    result += line;
	  }

	  return result;
	}

	function generateNextLine(state, level) {
	  return '\n' + common.repeat(' ', state.indent * level);
	}

	function testImplicitResolving(state, str) {
	  var index, length, type;

	  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
	    type = state.implicitTypes[index];

	    if (type.resolve(str)) {
	      return true;
	    }
	  }

	  return false;
	}

	// [33] s-white ::= s-space | s-tab
	function isWhitespace(c) {
	  return c === CHAR_SPACE || c === CHAR_TAB;
	}

	// Returns true if the character can be printed without escaping.
	// From YAML 1.2: "any allowed characters known to be non-printable
	// should also be escaped. [However,] This isn’t mandatory"
	// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
	function isPrintable(c) {
	  return  (0x00020 <= c && c <= 0x00007E)
	      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
	      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== CHAR_BOM)
	      ||  (0x10000 <= c && c <= 0x10FFFF);
	}

	// [34] ns-char ::= nb-char - s-white
	// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
	// [26] b-char  ::= b-line-feed | b-carriage-return
	// Including s-white (for some reason, examples doesn't match specs in this aspect)
	// ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
	function isNsCharOrWhitespace(c) {
	  return isPrintable(c)
	    && c !== CHAR_BOM
	    // - b-char
	    && c !== CHAR_CARRIAGE_RETURN
	    && c !== CHAR_LINE_FEED;
	}

	// [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
	//                             c = flow-in   ⇒ ns-plain-safe-in
	//                             c = block-key ⇒ ns-plain-safe-out
	//                             c = flow-key  ⇒ ns-plain-safe-in
	// [128] ns-plain-safe-out ::= ns-char
	// [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
	// [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
	//                            | ( /* An ns-char preceding */ “#” )
	//                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
	function isPlainSafe(c, prev, inblock) {
	  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
	  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
	  return (
	    // ns-plain-safe
	    inblock ? // c = flow-in
	      cIsNsCharOrWhitespace
	      : cIsNsCharOrWhitespace
	        // - c-flow-indicator
	        && c !== CHAR_COMMA
	        && c !== CHAR_LEFT_SQUARE_BRACKET
	        && c !== CHAR_RIGHT_SQUARE_BRACKET
	        && c !== CHAR_LEFT_CURLY_BRACKET
	        && c !== CHAR_RIGHT_CURLY_BRACKET
	  )
	    // ns-plain-char
	    && c !== CHAR_SHARP // false on '#'
	    && !(prev === CHAR_COLON && !cIsNsChar) // false on ': '
	    || (isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP) // change to true on '[^ ]#'
	    || (prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
	}

	// Simplified test for values allowed as the first character in plain style.
	function isPlainSafeFirst(c) {
	  // Uses a subset of ns-char - c-indicator
	  // where ns-char = nb-char - s-white.
	  // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
	  return isPrintable(c) && c !== CHAR_BOM
	    && !isWhitespace(c) // - s-white
	    // - (c-indicator ::=
	    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
	    && c !== CHAR_MINUS
	    && c !== CHAR_QUESTION
	    && c !== CHAR_COLON
	    && c !== CHAR_COMMA
	    && c !== CHAR_LEFT_SQUARE_BRACKET
	    && c !== CHAR_RIGHT_SQUARE_BRACKET
	    && c !== CHAR_LEFT_CURLY_BRACKET
	    && c !== CHAR_RIGHT_CURLY_BRACKET
	    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
	    && c !== CHAR_SHARP
	    && c !== CHAR_AMPERSAND
	    && c !== CHAR_ASTERISK
	    && c !== CHAR_EXCLAMATION
	    && c !== CHAR_VERTICAL_LINE
	    && c !== CHAR_EQUALS
	    && c !== CHAR_GREATER_THAN
	    && c !== CHAR_SINGLE_QUOTE
	    && c !== CHAR_DOUBLE_QUOTE
	    // | “%” | “@” | “`”)
	    && c !== CHAR_PERCENT
	    && c !== CHAR_COMMERCIAL_AT
	    && c !== CHAR_GRAVE_ACCENT;
	}

	// Simplified test for values allowed as the last character in plain style.
	function isPlainSafeLast(c) {
	  // just not whitespace or colon, it will be checked to be plain character later
	  return !isWhitespace(c) && c !== CHAR_COLON;
	}

	// Same as 'string'.codePointAt(pos), but works in older browsers.
	function codePointAt(string, pos) {
	  var first = string.charCodeAt(pos), second;
	  if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
	    second = string.charCodeAt(pos + 1);
	    if (second >= 0xDC00 && second <= 0xDFFF) {
	      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	    }
	  }
	  return first;
	}

	// Determines whether block indentation indicator is required.
	function needIndentIndicator(string) {
	  var leadingSpaceRe = /^\n* /;
	  return leadingSpaceRe.test(string);
	}

	var STYLE_PLAIN   = 1,
	    STYLE_SINGLE  = 2,
	    STYLE_LITERAL = 3,
	    STYLE_FOLDED  = 4,
	    STYLE_DOUBLE  = 5;

	// Determines which scalar styles are possible and returns the preferred style.
	// lineWidth = -1 => no limit.
	// Pre-conditions: str.length > 0.
	// Post-conditions:
	//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
	//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
	//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
	function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth,
	  testAmbiguousType, quotingType, forceQuotes, inblock) {

	  var i;
	  var char = 0;
	  var prevChar = null;
	  var hasLineBreak = false;
	  var hasFoldableLine = false; // only checked if shouldTrackWidth
	  var shouldTrackWidth = lineWidth !== -1;
	  var previousLineBreak = -1; // count the first line correctly
	  var plain = isPlainSafeFirst(codePointAt(string, 0))
	          && isPlainSafeLast(codePointAt(string, string.length - 1));

	  if (singleLineOnly || forceQuotes) {
	    // Case: no block styles.
	    // Check for disallowed characters to rule out plain and single.
	    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
	      char = codePointAt(string, i);
	      if (!isPrintable(char)) {
	        return STYLE_DOUBLE;
	      }
	      plain = plain && isPlainSafe(char, prevChar, inblock);
	      prevChar = char;
	    }
	  } else {
	    // Case: block styles permitted.
	    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
	      char = codePointAt(string, i);
	      if (char === CHAR_LINE_FEED) {
	        hasLineBreak = true;
	        // Check if any line can be folded.
	        if (shouldTrackWidth) {
	          hasFoldableLine = hasFoldableLine ||
	            // Foldable line = too long, and not more-indented.
	            (i - previousLineBreak - 1 > lineWidth &&
	             string[previousLineBreak + 1] !== ' ');
	          previousLineBreak = i;
	        }
	      } else if (!isPrintable(char)) {
	        return STYLE_DOUBLE;
	      }
	      plain = plain && isPlainSafe(char, prevChar, inblock);
	      prevChar = char;
	    }
	    // in case the end is missing a \n
	    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
	      (i - previousLineBreak - 1 > lineWidth &&
	       string[previousLineBreak + 1] !== ' '));
	  }
	  // Although every style can represent \n without escaping, prefer block styles
	  // for multiline, since they're more readable and they don't add empty lines.
	  // Also prefer folding a super-long line.
	  if (!hasLineBreak && !hasFoldableLine) {
	    // Strings interpretable as another type have to be quoted;
	    // e.g. the string 'true' vs. the boolean true.
	    if (plain && !forceQuotes && !testAmbiguousType(string)) {
	      return STYLE_PLAIN;
	    }
	    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
	  }
	  // Edge case: block indentation indicator can only have one digit.
	  if (indentPerLevel > 9 && needIndentIndicator(string)) {
	    return STYLE_DOUBLE;
	  }
	  // At this point we know block styles are valid.
	  // Prefer literal style unless we want to fold.
	  if (!forceQuotes) {
	    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
	  }
	  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
	}

	// Note: line breaking/folding is implemented for only the folded style.
	// NB. We drop the last trailing newline (if any) of a returned block scalar
	//  since the dumper adds its own newline. This always works:
	//    • No ending newline => unaffected; already using strip "-" chomping.
	//    • Ending newline    => removed then restored.
	//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
	function writeScalar(state, string, level, iskey, inblock) {
	  state.dump = (function () {
	    if (string.length === 0) {
	      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
	    }
	    if (!state.noCompatMode) {
	      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
	        return state.quotingType === QUOTING_TYPE_DOUBLE ? ('"' + string + '"') : ("'" + string + "'");
	      }
	    }

	    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
	    // As indentation gets deeper, let the width decrease monotonically
	    // to the lower bound min(state.lineWidth, 40).
	    // Note that this implies
	    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
	    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
	    // This behaves better than a constant minimum width which disallows narrower options,
	    // or an indent threshold which causes the width to suddenly increase.
	    var lineWidth = state.lineWidth === -1
	      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

	    // Without knowing if keys are implicit/explicit, assume implicit for safety.
	    var singleLineOnly = iskey
	      // No block styles in flow mode.
	      || (state.flowLevel > -1 && level >= state.flowLevel);
	    function testAmbiguity(string) {
	      return testImplicitResolving(state, string);
	    }

	    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth,
	      testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {

	      case STYLE_PLAIN:
	        return string;
	      case STYLE_SINGLE:
	        return "'" + string.replace(/'/g, "''") + "'";
	      case STYLE_LITERAL:
	        return '|' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(string, indent));
	      case STYLE_FOLDED:
	        return '>' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
	      case STYLE_DOUBLE:
	        return '"' + escapeString(string) + '"';
	      default:
	        throw new exception('impossible error: invalid scalar style');
	    }
	  }());
	}

	// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
	function blockHeader(string, indentPerLevel) {
	  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

	  // note the special case: the string '\n' counts as a "trailing" empty line.
	  var clip =          string[string.length - 1] === '\n';
	  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
	  var chomp = keep ? '+' : (clip ? '' : '-');

	  return indentIndicator + chomp + '\n';
	}

	// (See the note for writeScalar.)
	function dropEndingNewline(string) {
	  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
	}

	// Note: a long line without a suitable break point will exceed the width limit.
	// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
	function foldString(string, width) {
	  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
	  // unless they're before or after a more-indented line, or at the very
	  // beginning or end, in which case $k$ maps to $k$.
	  // Therefore, parse each chunk as newline(s) followed by a content line.
	  var lineRe = /(\n+)([^\n]*)/g;

	  // first line (possibly an empty line)
	  var result = (function () {
	    var nextLF = string.indexOf('\n');
	    nextLF = nextLF !== -1 ? nextLF : string.length;
	    lineRe.lastIndex = nextLF;
	    return foldLine(string.slice(0, nextLF), width);
	  }());
	  // If we haven't reached the first content line yet, don't add an extra \n.
	  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
	  var moreIndented;

	  // rest of the lines
	  var match;
	  while ((match = lineRe.exec(string))) {
	    var prefix = match[1], line = match[2];
	    moreIndented = (line[0] === ' ');
	    result += prefix
	      + (!prevMoreIndented && !moreIndented && line !== ''
	        ? '\n' : '')
	      + foldLine(line, width);
	    prevMoreIndented = moreIndented;
	  }

	  return result;
	}

	// Greedy line breaking.
	// Picks the longest line under the limit each time,
	// otherwise settles for the shortest line over the limit.
	// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
	function foldLine(line, width) {
	  if (line === '' || line[0] === ' ') return line;

	  // Since a more-indented line adds a \n, breaks can't be followed by a space.
	  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
	  var match;
	  // start is an inclusive index. end, curr, and next are exclusive.
	  var start = 0, end, curr = 0, next = 0;
	  var result = '';

	  // Invariants: 0 <= start <= length-1.
	  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
	  // Inside the loop:
	  //   A match implies length >= 2, so curr and next are <= length-2.
	  while ((match = breakRe.exec(line))) {
	    next = match.index;
	    // maintain invariant: curr - start <= width
	    if (next - start > width) {
	      end = (curr > start) ? curr : next; // derive end <= length-2
	      result += '\n' + line.slice(start, end);
	      // skip the space that was output as \n
	      start = end + 1;                    // derive start <= length-1
	    }
	    curr = next;
	  }

	  // By the invariants, start <= length-1, so there is something left over.
	  // It is either the whole string or a part starting from non-whitespace.
	  result += '\n';
	  // Insert a break if the remainder is too long and there is a break available.
	  if (line.length - start > width && curr > start) {
	    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
	  } else {
	    result += line.slice(start);
	  }

	  return result.slice(1); // drop extra \n joiner
	}

	// Escapes a double-quoted string.
	function escapeString(string) {
	  var result = '';
	  var char = 0;
	  var escapeSeq;

	  for (var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
	    char = codePointAt(string, i);
	    escapeSeq = ESCAPE_SEQUENCES[char];

	    if (!escapeSeq && isPrintable(char)) {
	      result += string[i];
	      if (char >= 0x10000) result += string[i + 1];
	    } else {
	      result += escapeSeq || encodeHex(char);
	    }
	  }

	  return result;
	}

	function writeFlowSequence(state, level, object) {
	  var _result = '',
	      _tag    = state.tag,
	      index,
	      length,
	      value;

	  for (index = 0, length = object.length; index < length; index += 1) {
	    value = object[index];

	    if (state.replacer) {
	      value = state.replacer.call(object, String(index), value);
	    }

	    // Write only valid elements, put null instead of invalid elements.
	    if (writeNode(state, level, value, false, false) ||
	        (typeof value === 'undefined' &&
	         writeNode(state, level, null, false, false))) {

	      if (_result !== '') _result += ',' + (!state.condenseFlow ? ' ' : '');
	      _result += state.dump;
	    }
	  }

	  state.tag = _tag;
	  state.dump = '[' + _result + ']';
	}

	function writeBlockSequence(state, level, object, compact) {
	  var _result = '',
	      _tag    = state.tag,
	      index,
	      length,
	      value;

	  for (index = 0, length = object.length; index < length; index += 1) {
	    value = object[index];

	    if (state.replacer) {
	      value = state.replacer.call(object, String(index), value);
	    }

	    // Write only valid elements, put null instead of invalid elements.
	    if (writeNode(state, level + 1, value, true, true, false, true) ||
	        (typeof value === 'undefined' &&
	         writeNode(state, level + 1, null, true, true, false, true))) {

	      if (!compact || _result !== '') {
	        _result += generateNextLine(state, level);
	      }

	      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	        _result += '-';
	      } else {
	        _result += '- ';
	      }

	      _result += state.dump;
	    }
	  }

	  state.tag = _tag;
	  state.dump = _result || '[]'; // Empty sequence if no valid values.
	}

	function writeFlowMapping(state, level, object) {
	  var _result       = '',
	      _tag          = state.tag,
	      objectKeyList = Object.keys(object),
	      index,
	      length,
	      objectKey,
	      objectValue,
	      pairBuffer;

	  for (index = 0, length = objectKeyList.length; index < length; index += 1) {

	    pairBuffer = '';
	    if (_result !== '') pairBuffer += ', ';

	    if (state.condenseFlow) pairBuffer += '"';

	    objectKey = objectKeyList[index];
	    objectValue = object[objectKey];

	    if (state.replacer) {
	      objectValue = state.replacer.call(object, objectKey, objectValue);
	    }

	    if (!writeNode(state, level, objectKey, false, false)) {
	      continue; // Skip this pair because of invalid key;
	    }

	    if (state.dump.length > 1024) pairBuffer += '? ';

	    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

	    if (!writeNode(state, level, objectValue, false, false)) {
	      continue; // Skip this pair because of invalid value.
	    }

	    pairBuffer += state.dump;

	    // Both key and value are valid.
	    _result += pairBuffer;
	  }

	  state.tag = _tag;
	  state.dump = '{' + _result + '}';
	}

	function writeBlockMapping(state, level, object, compact) {
	  var _result       = '',
	      _tag          = state.tag,
	      objectKeyList = Object.keys(object),
	      index,
	      length,
	      objectKey,
	      objectValue,
	      explicitPair,
	      pairBuffer;

	  // Allow sorting keys so that the output file is deterministic
	  if (state.sortKeys === true) {
	    // Default sorting
	    objectKeyList.sort();
	  } else if (typeof state.sortKeys === 'function') {
	    // Custom sort function
	    objectKeyList.sort(state.sortKeys);
	  } else if (state.sortKeys) {
	    // Something is wrong
	    throw new exception('sortKeys must be a boolean or a function');
	  }

	  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	    pairBuffer = '';

	    if (!compact || _result !== '') {
	      pairBuffer += generateNextLine(state, level);
	    }

	    objectKey = objectKeyList[index];
	    objectValue = object[objectKey];

	    if (state.replacer) {
	      objectValue = state.replacer.call(object, objectKey, objectValue);
	    }

	    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
	      continue; // Skip this pair because of invalid key.
	    }

	    explicitPair = (state.tag !== null && state.tag !== '?') ||
	                   (state.dump && state.dump.length > 1024);

	    if (explicitPair) {
	      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	        pairBuffer += '?';
	      } else {
	        pairBuffer += '? ';
	      }
	    }

	    pairBuffer += state.dump;

	    if (explicitPair) {
	      pairBuffer += generateNextLine(state, level);
	    }

	    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
	      continue; // Skip this pair because of invalid value.
	    }

	    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	      pairBuffer += ':';
	    } else {
	      pairBuffer += ': ';
	    }

	    pairBuffer += state.dump;

	    // Both key and value are valid.
	    _result += pairBuffer;
	  }

	  state.tag = _tag;
	  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
	}

	function detectType(state, object, explicit) {
	  var _result, typeList, index, length, type, style;

	  typeList = explicit ? state.explicitTypes : state.implicitTypes;

	  for (index = 0, length = typeList.length; index < length; index += 1) {
	    type = typeList[index];

	    if ((type.instanceOf  || type.predicate) &&
	        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
	        (!type.predicate  || type.predicate(object))) {

	      if (explicit) {
	        if (type.multi && type.representName) {
	          state.tag = type.representName(object);
	        } else {
	          state.tag = type.tag;
	        }
	      } else {
	        state.tag = '?';
	      }

	      if (type.represent) {
	        style = state.styleMap[type.tag] || type.defaultStyle;

	        if (_toString.call(type.represent) === '[object Function]') {
	          _result = type.represent(object, style);
	        } else if (_hasOwnProperty.call(type.represent, style)) {
	          _result = type.represent[style](object, style);
	        } else {
	          throw new exception('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
	        }

	        state.dump = _result;
	      }

	      return true;
	    }
	  }

	  return false;
	}

	// Serializes `object` and writes it to global `result`.
	// Returns true on success, or false on invalid object.
	//
	function writeNode(state, level, object, block, compact, iskey, isblockseq) {
	  state.tag = null;
	  state.dump = object;

	  if (!detectType(state, object, false)) {
	    detectType(state, object, true);
	  }

	  var type = _toString.call(state.dump);
	  var inblock = block;
	  var tagStr;

	  if (block) {
	    block = (state.flowLevel < 0 || state.flowLevel > level);
	  }

	  var objectOrArray = type === '[object Object]' || type === '[object Array]',
	      duplicateIndex,
	      duplicate;

	  if (objectOrArray) {
	    duplicateIndex = state.duplicates.indexOf(object);
	    duplicate = duplicateIndex !== -1;
	  }

	  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
	    compact = false;
	  }

	  if (duplicate && state.usedDuplicates[duplicateIndex]) {
	    state.dump = '*ref_' + duplicateIndex;
	  } else {
	    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
	      state.usedDuplicates[duplicateIndex] = true;
	    }
	    if (type === '[object Object]') {
	      if (block && (Object.keys(state.dump).length !== 0)) {
	        writeBlockMapping(state, level, state.dump, compact);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + state.dump;
	        }
	      } else {
	        writeFlowMapping(state, level, state.dump);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
	        }
	      }
	    } else if (type === '[object Array]') {
	      if (block && (state.dump.length !== 0)) {
	        if (state.noArrayIndent && !isblockseq && level > 0) {
	          writeBlockSequence(state, level - 1, state.dump, compact);
	        } else {
	          writeBlockSequence(state, level, state.dump, compact);
	        }
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + state.dump;
	        }
	      } else {
	        writeFlowSequence(state, level, state.dump);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
	        }
	      }
	    } else if (type === '[object String]') {
	      if (state.tag !== '?') {
	        writeScalar(state, state.dump, level, iskey, inblock);
	      }
	    } else if (type === '[object Undefined]') {
	      return false;
	    } else {
	      if (state.skipInvalid) return false;
	      throw new exception('unacceptable kind of an object to dump ' + type);
	    }

	    if (state.tag !== null && state.tag !== '?') {
	      // Need to encode all characters except those allowed by the spec:
	      //
	      // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
	      // [36] ns-hex-digit    ::=  ns-dec-digit
	      //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
	      // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
	      // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
	      // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
	      //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
	      //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
	      //
	      // Also need to encode '!' because it has special meaning (end of tag prefix).
	      //
	      tagStr = encodeURI(
	        state.tag[0] === '!' ? state.tag.slice(1) : state.tag
	      ).replace(/!/g, '%21');

	      if (state.tag[0] === '!') {
	        tagStr = '!' + tagStr;
	      } else if (tagStr.slice(0, 18) === 'tag:yaml.org,2002:') {
	        tagStr = '!!' + tagStr.slice(18);
	      } else {
	        tagStr = '!<' + tagStr + '>';
	      }

	      state.dump = tagStr + ' ' + state.dump;
	    }
	  }

	  return true;
	}

	function getDuplicateReferences(object, state) {
	  var objects = [],
	      duplicatesIndexes = [],
	      index,
	      length;

	  inspectNode(object, objects, duplicatesIndexes);

	  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
	    state.duplicates.push(objects[duplicatesIndexes[index]]);
	  }
	  state.usedDuplicates = new Array(length);
	}

	function inspectNode(object, objects, duplicatesIndexes) {
	  var objectKeyList,
	      index,
	      length;

	  if (object !== null && typeof object === 'object') {
	    index = objects.indexOf(object);
	    if (index !== -1) {
	      if (duplicatesIndexes.indexOf(index) === -1) {
	        duplicatesIndexes.push(index);
	      }
	    } else {
	      objects.push(object);

	      if (Array.isArray(object)) {
	        for (index = 0, length = object.length; index < length; index += 1) {
	          inspectNode(object[index], objects, duplicatesIndexes);
	        }
	      } else {
	        objectKeyList = Object.keys(object);

	        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
	        }
	      }
	    }
	  }
	}

	function dump$1(input, options) {
	  options = options || {};

	  var state = new State(options);

	  if (!state.noRefs) getDuplicateReferences(input, state);

	  var value = input;

	  if (state.replacer) {
	    value = state.replacer.call({ '': value }, '', value);
	  }

	  if (writeNode(state, 0, value, true, true)) return state.dump + '\n';

	  return '';
	}

	var dump_1 = dump$1;

	var dumper = {
		dump: dump_1
	};

	function renamed(from, to) {
	  return function () {
	    throw new Error('Function yaml.' + from + ' is removed in js-yaml 4. ' +
	      'Use yaml.' + to + ' instead, which is now safe by default.');
	  };
	}


	var Type                = type;
	var Schema              = schema;
	var FAILSAFE_SCHEMA     = failsafe;
	var JSON_SCHEMA         = json;
	var CORE_SCHEMA         = core;
	var DEFAULT_SCHEMA      = _default;
	var load                = loader.load;
	var loadAll             = loader.loadAll;
	var dump                = dumper.dump;
	var YAMLException       = exception;

	// Re-export all types in case user wants to create custom schema
	var types = {
	  binary:    binary,
	  float:     float,
	  map:       map,
	  null:      _null,
	  pairs:     pairs,
	  set:       set,
	  timestamp: timestamp,
	  bool:      bool,
	  int:       int,
	  merge:     merge,
	  omap:      omap,
	  seq:       seq,
	  str:       str
	};

	// Removed functions from JS-YAML 3.0.x
	var safeLoad            = renamed('safeLoad', 'load');
	var safeLoadAll         = renamed('safeLoadAll', 'loadAll');
	var safeDump            = renamed('safeDump', 'dump');

	var jsYaml = {
		Type: Type,
		Schema: Schema,
		FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
		JSON_SCHEMA: JSON_SCHEMA,
		CORE_SCHEMA: CORE_SCHEMA,
		DEFAULT_SCHEMA: DEFAULT_SCHEMA,
		load: load,
		loadAll: loadAll,
		dump: dump,
		YAMLException: YAMLException,
		types: types,
		safeLoad: safeLoad,
		safeLoadAll: safeLoadAll,
		safeDump: safeDump
	};

	var ParseYaml = function (ymlString) {
	    var doc;
	    try {
	        doc = jsYaml.load(ymlString);
	    } catch (e) {
	        console.log(e);
	    }
	    return doc;
	};

	class YAMLEventSheets extends JSONEventSheets {

	    addEventSheet(yamlString, groupName, config) {
	        var jsonData;
	        if (typeof (yamlString) === 'string') {
	            jsonData = ParseYaml(yamlString);
	        } else {
	            jsonData = yamlString;
	        }

	        super.addEventSheet(jsonData, groupName, config);

	        return this;
	    }
	}

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

	var GetFilterList = function (gameObject, external) {
	    if (external === undefined) {
	        external = false;
	    }

	    if (!gameObject.filters) {
	        gameObject.enableFilters().focusFilters();
	    }

	    var filterList = (!external) ? gameObject.filters.internal : gameObject.filters.external;

	    return filterList;
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

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._barrelEffect);
	                    gameObject._barrelEffect = undefined;
	                }
	            } else {
	                if (!gameObject._barrelEffect) {
	                    gameObject._barrelEffect = filterList.addBarrel();
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

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject[EffectInstancePropertyName]);
	                    gameObject[EffectInstancePropertyName] = undefined;
	                }
	            } else {
	                if (!gameObject[EffectInstancePropertyName]) {
	                    gameObject[EffectInstancePropertyName] = filterList.addColorMatrix();
	                }
	                var effectInstance = gameObject[EffectInstancePropertyName];
	                effectInstance.colorMatrix[effectName]((inputMode === 1) ? value : undefined);
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

	var AddBlockyProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'blockySize')) {
	        return gameObject;
	    }

	    var filterList = GetFilterList(gameObject);

	    var blockySize,
	        blockyOffsetX = 0,
	        blockyOffsetY = 0;
	    Object.defineProperty(gameObject, 'blockySize', {
	        get: function () {
	            return blockySize;
	        },
	        set: function (value) {
	            if (blockySize === value) {
	                return;
	            }

	            blockySize = value;

	            if ((blockySize === null) || (blockySize === false)) {
	                if (gameObject._blockyEffect) {
	                    filterList.remove(gameObject._blockyEffect);
	                    gameObject._blockyEffect = undefined;
	                }
	            } else {
	                if (!gameObject._blockyEffect) {
	                    gameObject._blockyEffect = filterList.addBlocky({
	                        size: blockySize,
	                        offset: { x: blockyOffsetX, y: blockyOffsetY },
	                    });
	                }
	                gameObject._blockyEffect.size.x = blockySize;
	                gameObject._blockyEffect.size.y = blockySize;
	            }

	        },
	    });

	    Object.defineProperty(gameObject, 'blockyOffsetX', {
	        get: function () {
	            return blockyOffsetX;
	        },
	        set: function (value) {
	            if (blockyOffsetX === value) {
	                return;
	            }

	            blockyOffsetX = value;

	            if (gameObject._blockyEffect) {
	                gameObject._blockyEffect.offset.x = blockyOffsetX;
	            }
	        },
	    });
	        Object.defineProperty(gameObject, 'blockyOffsetY', {
	        get: function () {
	            return blockyOffsetY;
	        },
	        set: function (value) {
	            if (blockyOffsetY === value) {
	                return;
	            }

	            blockyOffsetY = value;

	            if (gameObject._blockyEffect) {
	                gameObject._blockyEffect.offset.y = blockyOffsetY;
	            }
	        },
	    });

	    AddClearEffectCallback(gameObject, 'blockySize');

	    return gameObject;
	};

	const GameClass = Phaser.Game;
	var IsGame = function (object) {
	    return (object instanceof GameClass);
	};

	const SceneClass = Phaser.Scene;
	var IsSceneObject = function (object) {
	    return (object instanceof SceneClass);
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

	var RegisterFilter = function (game, FilterClass) {
	    var filterName = FilterClass.FilterName;
	    var renderNodes = GetGame(game).renderer.renderNodes;
	    if (renderNodes.hasNode(filterName)) {
	        return false;
	    }

	    renderNodes.addNodeConstructor(filterName, FilterClass);
	    return true;
	};

	var AddFilterListMethod = function (name, callback) {
	    var FilterListComponent = Phaser.GameObjects.Components.FilterList.prototype;
	    if (FilterListComponent[name]) {
	        return;
	    }

	    FilterListComponent[name] = callback;
	};

	const StepFilterName = 'FilterP3BloomStep';

	// Built-in fx in phaser3

	const frag$5 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec2 offset;
uniform float strength;
uniform vec3 color;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    vec4 sum = texture2D(uMainSampler, outTexCoord) * 0.204164 * strength;

    sum = sum + texture2D(uMainSampler, outTexCoord + offset * 1.407333) * 0.304005;
    sum = sum + texture2D(uMainSampler, outTexCoord - offset * 1.407333) * 0.304005;
    sum = sum + texture2D(uMainSampler, outTexCoord + offset * 3.294215) * 0.093913;
    sum = sum + texture2D(uMainSampler, outTexCoord - offset * 3.294215) * 0.093913;

    gl_FragColor = sum * vec4(color, 1);
}
`;

	class BloomStepFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
	    static FilterName = StepFilterName;

	    constructor(manager) {
	        super(StepFilterName, manager, null, frag$5);
	    }

	    // This method sets up the uniforms for the shader.
	    setupUniforms(controller, drawingContext) {
	        const programManager = this.programManager;

	        var x = (2 / drawingContext.width) * controller.offsetX;
	        var y = (2 / drawingContext.height) * controller.offsetY;
	        programManager.setUniform('offset', [x, y]);

	        programManager.setUniform('strength', controller.strength);
	        programManager.setUniform('color', controller.glcolor);

	    }

	}

	const GetValue$n = Phaser.Utils.Objects.GetValue;

	class BloomStepController extends Phaser.Filters.Controller {
	    static FilterName = StepFilterName;

	    constructor(camera, config) {
	        super(camera, StepFilterName);

	        this.offsetX = 1;
	        this.offsetY = 1;
	        this.strength = 1;
	        this.glcolor = [1, 1, 1];

	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.setOffset(GetValue$n(o, 'offsetX', 1), GetValue$n(o, 'offsetY', 1));
	        this.setStrength(GetValue$n(o, 'strength', 1));
	        this.setColor(GetValue$n(o, 'color', 0xFFFFFF));

	        return this;
	    }

	    get color() {
	        var color = this.glcolor;

	        return (((color[0] * 255) << 16) + ((color[1] * 255) << 8) + (color[2] * 255 | 0));
	    }

	    set color(value) {
	        var color = this.glcolor;

	        color[0] = ((value >> 16) & 0xFF) / 255;
	        color[1] = ((value >> 8) & 0xFF) / 255;
	        color[2] = (value & 0xFF) / 255;
	    }

	    setOffset(x, y) {
	        this.offsetX = x;
	        this.offsetY = y;
	        return this;
	    }

	    setStrength(strength) {
	        this.strength = strength;
	        return this;
	    }

	    setColor(color) {
	        this.color = color;
	        return this;
	    }

	}

	const GetValue$m = Phaser.Utils.Objects.GetValue;

	let BloomController$1 = class BloomController extends Phaser.Filters.ParallelFilters {
	    constructor(camera, config) {
	        super(camera);

	        this.steps = 0;
	        this.offsetX = 1;
	        this.offsetY = 1;
	        this.blurStrength = 1;
	        this.color = 0xffffff;
	        this.strength = 1;

	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.setOffset(GetValue$m(o, 'offsetX', 1), GetValue$m(o, 'offsetY', 1));
	        this.setBlurStrength(GetValue$m(o, 'blurStrength', 1));
	        this.setColor(GetValue$m(o, 'color', 0xFFFFFF));
	        this.setStrength(GetValue$m(o, 'strength', 1));
	        this.setSteps(GetValue$m(o, 'steps', 4));

	        return this;
	    }

	    forEachController(callback, scope) {
	        this.top.list.forEach(callback, scope);
	    }

	    get steps() {
	        return this._steps;
	    }

	    set steps(value) {
	        if (this._steps === value) {
	            return;
	        }

	        var camera = this.camera;
	        if (this.steps < value) {
	            var filters = this.top;
	            var startIndex = this.steps * 2;
	            var stopIndex = value * 2;
	            for (var i = startIndex; i < stopIndex; i++) {
	                filters.add(new BloomStepController(camera));
	            }
	        } else { // this.steps > value
	            var filtersList = this.top.list;
	            var startIndex = this.steps * 2;
	            var stopIndex = value * 2;
	            for (var i = startIndex - 1; i >= stopIndex; i--) {
	                filtersList[i].destroy();
	            }
	            filtersList.length = stopIndex;
	        }

	        this._steps = value;

	        this.setOffset(this.offsetX, this.offsetY);
	        this.setBlurStrength(this.strength);
	        this.setColor(this.color);
	    }

	    setSteps(steps) {
	        this.steps = steps;
	        return this;
	    }

	    get offsetX() {
	        return this._offsetX;
	    }

	    set offsetX(value) {
	        this._offsetX = value;
	        this.forEachController(function (bloomStepController, i) {
	            bloomStepController.offsetX = (i % 2 === 0) ? value : 0;
	        });
	    }

	    get offsetY() {
	        return this._offsetY;
	    }

	    set offsetY(value) {
	        this._offsetY = value;
	        this.forEachController(function (bloomStepController, i) {
	            bloomStepController.offsetY = (i % 2 === 1) ? value : 0;
	        });
	    }

	    setOffset(x, y) {
	        this.offsetX = x;
	        this.offsetY = y;
	        return this;
	    }

	    get blurStrength() {
	        return this._blurStrength;
	    }

	    set blurStrength(value) {
	        this._blurStrength = value;
	        this.forEachController(function (bloomStepController) {
	            bloomStepController.strength = value;
	        });
	    }

	    setBlurStrength(blurStrength) {
	        this.blurStrength = blurStrength;
	        return this;
	    }

	    get color() {
	        return this._color;
	    }

	    set color(value) {
	        this._color = value;
	        this.forEachController(function (bloomStepController) {
	            bloomStepController.color = value;
	        });
	    }

	    setColor(color) {
	        this.color = color;
	        return this;
	    }

	    get strength() {
	        return this._strength;
	    }

	    set strength(value) {
	        this._strength = value;
	        this.blend.amount = value;
	    }

	    setStrength(strength) {
	        this.strength = strength;
	        return this;
	    }

	};

	var InstallBloomFX = function (game) {
	    game = GetGame(game);

	    var success = RegisterFilter(game, BloomStepFilter);
	    if (!success) {
	        return false;
	    }

	    AddFilterListMethod(
	        'addP3Bloom',
	        function (color, offsetX, offsetY, blurStrength, strength, steps) {
	            if (color === undefined) { color = 0xFFFFFF; }
	            if (offsetX === undefined) { offsetX = 1; }
	            if (offsetY === undefined) { offsetY = 1; }
	            if (blurStrength === undefined) { blurStrength = 1; }
	            if (strength === undefined) { strength = 1; }
	            if (steps === undefined) { steps = 4; }

	            return this.add(new BloomController$1(
	                this.camera,
	                { color, offsetX, offsetY, blurStrength, strength, steps }
	            ));
	        }
	    );

	    return true;
	};

	var AddBloomProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'bloomColor')) {
	        return gameObject;
	    }

	    InstallBloomFX(gameObject);

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._bloom);
	                    gameObject._bloom = undefined;
	                }
	            } else {
	                if (!gameObject._bloom) {
	                    gameObject._bloom = filterList.addBloom(bloomColor, bloomOffsetX, bloomOffsetY, bloomBlurStrength, bloomStrength, bloomSteps);
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

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._blur);
	                    gameObject._blur = undefined;
	                }
	            } else {
	                if (!gameObject._blur) {
	                    gameObject._blur = filterList.addBlur(blurQuality, blurX, blurY, blurStrength, blurColor, blurSteps);
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

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._bokeh);
	                    gameObject._bokeh = undefined;
	                }
	            } else {
	                if (!gameObject._bokeh) {
	                    gameObject._bokeh = filterList.addBokeh(bokehRadius, bokehAmount, bokehContrast);
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

	const FilterName$4 = 'FilterP3Circle';

	// Built-in fx in phaser3

	const frag$4 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec2 texSize;
uniform vec3 color;
uniform vec4 backgroundColor;
uniform vec3 config;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    float thickness = config.x;
    float scale = config.y;
    float feather = config.z;

    vec4 texture = texture2D(uMainSampler, outTexCoord);

    vec2 position = (gl_FragCoord.xy / texSize.xy) * 2.0 - 1.0;

    float aspectRatio = texSize.x / texSize.y;

    position.x *= aspectRatio;

    float grad = length(position);

    //  height > width
    float outer = aspectRatio;
    float inner = outer - (thickness * 2.0 / texSize.y);

    //  width > height
    if (aspectRatio >= 1.0)
    {
        float f = 2.0 + (texSize.y / texSize.x);
        outer = 1.0;
        inner = 1.0 - (thickness * f / texSize.x);
    }

    outer *= scale;
    inner *= scale;

    float circle = smoothstep(outer, outer - 0.01, grad);

    float ring = circle - smoothstep(inner, inner - feather, grad);

    texture = mix(backgroundColor * backgroundColor.a, texture, texture.a);

    texture = (texture * (circle - ring));

    gl_FragColor = vec4(texture.rgb + (ring * color), texture.a);
}
`;

	class CircleFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
	    static FilterName = FilterName$4;

	    constructor(manager) {
	        super(FilterName$4, manager, null, frag$4);
	    }

	    // This method sets up the uniforms for the shader.
	    setupUniforms(controller, drawingContext) {
	        const programManager = this.programManager;

	        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
	        programManager.setUniform('color', controller.glcolor);
	        programManager.setUniform('backgroundColor', controller.glcolor2);
	        programManager.setUniform('config', [controller.thickness, controller.scale, controller.feather]);
	    }

	}

	const GetValue$l = Phaser.Utils.Objects.GetValue;

	class CircleController extends Phaser.Filters.Controller {
	    static FilterName = FilterName$4;

	    constructor(camera, config) {
	        super(camera, FilterName$4);

	        this.thickness = 8;
	        this.scale = 1;
	        this.feather = 0.005;
	        this.glcolor = [1, 0.2, 0.7];
	        this.glcolor2 = [1, 0, 0, 0.4];

	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.setThickness(GetValue$l(o, 'thickness', 8));
	        this.setScale(GetValue$l(o, 'scale', 1));
	        this.setFeather(GetValue$l(o, 'feather', 0.005));
	        this.setColor(GetValue$l(o, 'color', 0xFF33B2));
	        this.setBackgroundColor(GetValue$l(o, 'backgroundColor', 0xFF0000));
	        this.setBackgroundAlpha(GetValue$l(o, 'backgroundAlpha', 0.4));

	        return this;
	    }

	    get color() {
	        var color = this.glcolor;

	        return (((color[0] * 255) << 16) + ((color[1] * 255) << 8) + (color[2] * 255 | 0));
	    }

	    set color(value) {
	        var color = this.glcolor;

	        color[0] = ((value >> 16) & 0xFF) / 255;
	        color[1] = ((value >> 8) & 0xFF) / 255;
	        color[2] = (value & 0xFF) / 255;
	    }

	    get backgroundColor() {
	        var color = this.glcolor2;

	        return (((color[0] * 255) << 16) + ((color[1] * 255) << 8) + (color[2] * 255 | 0));
	    }

	    set backgroundColor(value) {
	        var color = this.glcolor2;

	        color[0] = ((value >> 16) & 0xFF) / 255;
	        color[1] = ((value >> 8) & 0xFF) / 255;
	        color[2] = (value & 0xFF) / 255;
	    }

	    get backgroundAlpha() {
	        var color = this.glcolor2;
	        return color[3];
	    }

	    set backgroundAlpha(value) {
	        var color = this.glcolor2;
	        color[3] = value;
	    }


	    setThickness(thickness) {
	        this.thickness = thickness;
	        return this;
	    }

	    setScale(scale) {
	        this.scale = scale;
	        return this;
	    }

	    setFeather(feather) {
	        this.feather = feather;
	        return this;
	    }

	    setColor(color) {
	        this.color = color;
	        return this;
	    }

	    setBackgroundColor(color) {
	        this.backgroundColor = color;
	        return this;
	    }

	    setBackgroundAlpha(alpha) {
	        this.backgroundAlpha = alpha;
	        return this;
	    }

	}

	var InstallCircleFX = function (game) {
	    game = GetGame(game);

	    var success = RegisterFilter(game, CircleFilter);
	    if (!success) {
	        return false;
	    }

	    AddFilterListMethod(
	        'addP3Bloom',
	        function (color, offsetX, offsetY, blurStrength, strength, steps) {
	            if (color === undefined) { color = 0xFFFFFF; }
	            if (offsetX === undefined) { offsetX = 1; }
	            if (offsetY === undefined) { offsetY = 1; }
	            if (blurStrength === undefined) { blurStrength = 1; }
	            if (strength === undefined) { strength = 1; }
	            if (steps === undefined) { steps = 4; }

	            return this.add(new BloomController(
	                this.camera,
	                { color, offsetX, offsetY, blurStrength, strength, steps }
	            ));
	        }
	    );

	    AddFilterListMethod(
	        'addP3Circle',
	        function (thickness, color, backgroundColor, scale, feather) {
	            if (thickness === undefined) { thickness = 8; }
	            if (color === undefined) { color = 0xFF33B2; }
	            if (backgroundColor === undefined) { backgroundColor = 0xFF0000; }
	            if (scale === undefined) { scale = 1; }
	            if (feather === undefined) { feather = 0.005; }

	            return this.add(new CircleController(
	                this.camera,
	                { thickness, color, backgroundColor, scale, feather }
	            ));
	        }
	    );

	    return true;
	};

	var AddCircleProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'circleColor')) {
	        return gameObject;
	    }

	    InstallCircleFX(gameObject);

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._circle);
	                    gameObject._circle = undefined;
	                }
	            } else {
	                if (!gameObject._circle) {
	                    gameObject._circle = filterList.addP3Circle(circleThickness, circleColor, circleBackgroundColor, circleScale, circleFeather);
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

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._displacement);
	                    gameObject._displacement = undefined;
	                }
	            } else {
	                if (!gameObject._displacement) {
	                    gameObject._displacement = filterList.addDisplacement(displacementKey, displacementX, displacementY);
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

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._glow);
	                    gameObject._glow = undefined;
	                }
	            } else {
	                if (!gameObject._glow) {
	                    gameObject._glow = filterList.addGlow(glowColor, glowOuterStrength, glowInnerStrength);
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

	const FilterName$3 = 'FilterP3Gradient';

	// Built-in fx in phaser3

	const frag$3 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

#define SRGB_TO_LINEAR(c) pow((c), vec3(2.2))
#define LINEAR_TO_SRGB(c) pow((c), vec3(1.0 / 2.2))
#define SRGB(r, g, b) SRGB_TO_LINEAR(vec3(float(r), float(g), float(b)) / 255.0)

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform float alpha;
uniform vec2 positionFrom;
uniform vec2 positionTo;
uniform vec3 color1;
uniform vec3 color2;
uniform int size;

#pragma phaserTemplate(fragmentHeader)

float gradientNoise(in vec2 uv)
{
    const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
    return fract(magic.z * fract(dot(uv, magic.xy)));
}

float stepped (in float s, in float scale, in int steps)
{
    return steps > 0 ? floor( s / ((1.0 * scale) / float(steps))) * 1.0 / float(steps - 1) : s;
}

void main ()
{
    vec2 a = positionFrom;
    vec2 b = positionTo;
    vec2 ba = b - a;

    float d = dot(outTexCoord - a, ba) / dot(ba, ba);
    float t = size > 0 ? stepped(d, 1.0, size) : d;

    t = smoothstep(0.0, 1.0, clamp(t, 0.0, 1.0));

    vec3 color = mix(SRGB(color1.r, color1.g, color1.b), SRGB(color2.r, color2.g, color2.b), t);

    color = LINEAR_TO_SRGB(color);
    color += (1.0 / 255.0) * gradientNoise(outTexCoord) - (0.5 / 255.0);

    vec4 texture = texture2D(uMainSampler, outTexCoord);

    gl_FragColor = vec4(mix(color.rgb, texture.rgb, alpha), 1.0) * texture.a;
}
`;

	class GradientFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
	    static FilterName = FilterName$3;

	    constructor(manager) {
	        super(FilterName$3, manager, null, frag$3);
	    }

	    // This method sets up the uniforms for the shader.
	    setupUniforms(controller, drawingContext) {
	        const programManager = this.programManager;

	        programManager.setUniform('alpha', controller.alpha);

	        programManager.setUniform('positionFrom', [controller.fromX, controller.fromY]);
	        programManager.setUniform('positionTo', [controller.toX, controller.toY]);
	        programManager.setUniform('color1', controller.glcolor1);
	        programManager.setUniform('color2', controller.glcolor2);
	        programManager.setUniform('size', controller.size);
	    }

	}

	const GetValue$k = Phaser.Utils.Objects.GetValue;

	class GradientController extends Phaser.Filters.Controller {
	    static FilterName = FilterName$3;

	    constructor(camera, config) {
	        super(camera, FilterName$3);

	        this.alpha = 0.2;
	        this.fromX = 0;
	        this.fromY = 0;
	        this.toX = 0;
	        this.toY = 1;
	        this.glcolor1 = [255, 0, 0];
	        this.glcolor2 = [0, 255, 0];
	        this.size = 0;

	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.setAlpha(GetValue$k(o, 'alpha', 0.2));
	        this.setFromPosition(GetValue$k(o, 'fromX', 0), GetValue$k(o, 'fromY', 0));
	        this.setToPosition(GetValue$k(o, 'toX', 0), GetValue$k(o, 'toY', 1));
	        this.setColor1(GetValue$k(o, 'color1', 0xff0000));
	        this.setColor2(GetValue$k(o, 'color2', 0x00ff00));
	        this.setSize(GetValue$k(o, 'size', 0));

	        return this;
	    }

	    get color1() {
	        var color = this.glcolor1;
	        return (((color[0]) << 16) + ((color[1]) << 8) + (color[2] | 0));
	    }

	    set color1(value) {
	        var color = this.glcolor1;
	        color[0] = ((value >> 16) & 0xFF);
	        color[1] = ((value >> 8) & 0xFF);
	        color[2] = (value & 0xFF);
	    }

	    get color2() {
	        var color = this.glcolor2;
	        return (((color[0]) << 16) + ((color[1]) << 8) + (color[2] | 0));
	    }

	    set color2(value) {
	        var color = this.glcolor2;
	        color[0] = ((value >> 16) & 0xFF);
	        color[1] = ((value >> 8) & 0xFF);
	        color[2] = (value & 0xFF);
	    }

	    setAlpha(alpha) {
	        this.alpha = alpha;
	        return this;
	    }

	    setFromPosition(x, y) {
	        this.fromX = x;
	        this.fromY = y;
	        return this;
	    }

	    setToPosition(x, y) {
	        this.toX = x;
	        this.toY = y;
	        return this;
	    }

	    setColor1(color1) {
	        this.color1 = color1;
	        return this;
	    }

	    setColor2(color2) {
	        this.color2 = color2;
	        return this;
	    }

	    setSize(size) {
	        this.size = size;
	        return this;
	    }

	}

	var InstallGradientFX = function (game) {
	    game = GetGame(game);

	    var success = RegisterFilter(game, GradientFilter);    if (!success) {
	        return false;
	    }

	    AddFilterListMethod(
	        'addP3Gradient',
	        function (color1, color2, alpha, fromX, fromY, toX, toY, size) {
	            if (color1 === undefined) { color1 = 0xff0000; }
	            if (color2 === undefined) { color2 = 0x00ff00; }
	            if (alpha === undefined) { alpha = 0.2; }
	            if (fromX === undefined) { fromX = 0; }
	            if (fromY === undefined) { fromY = 0; }
	            if (toX === undefined) { toX = 0; }
	            if (toY === undefined) { toY = 1; }
	            if (size === undefined) { size = 0; }

	            return this.add(new GradientController(
	                this.camera,
	                { color1, color2, alpha, fromX, fromY, toX, toY, size }
	            ));
	        }
	    );

	    return true;
	};

	var AddGradientProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'gradientColor')) {
	        return gameObject;
	    }

	    InstallGradientFX(gameObject);

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._gradient);
	                    gameObject._gradient = undefined;
	                }
	            } else {
	                if (!gameObject._gradient) {
	                    gameObject._gradient = filterList.addP3Gradient(gradientColor1, gradientColor2, gradientAlpha, gradientFromX, gradientFromY, gradientToX, gradientToY, gradientSize);
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

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._pixelateEffect);
	                    gameObject._pixelateEffect = undefined;
	                }
	            } else {
	                if (!gameObject._pixelateEffect) {
	                    gameObject._pixelateEffect = filterList.addPixelate();
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

	const FilterName$2 = 'FilterP3Wipe';

	// Built-in fx in phaser3

	const frag$2 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec4 config;
uniform bool reveal;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    vec2 uv = outTexCoord;

    vec4 color0;
    vec4 color1;

    if (reveal) {
        color0 = vec4(0);
        color1 = texture2D(uMainSampler, uv);
    } else {
        color0 = texture2D(uMainSampler, uv);
        color1 = vec4(0);
    }

    float distance = config.x;
    float width = config.y;
    float direction = config.z;
    float axis = uv.x;

    if (config.w == 1.0) {
        axis = uv.y;
    }

    float adjust = mix(width, -width, distance);
    float value = smoothstep(distance - width, distance + width, abs(direction - axis) + adjust);
    gl_FragColor = mix(color1, color0, value);
}
`;

	class WarpFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
	    static FilterName = FilterName$2;

	    constructor(manager) {
	        super(FilterName$2, manager, null, frag$2);
	    }

	    // This method sets up the uniforms for the shader.
	    setupUniforms(controller, drawingContext) {
	        const programManager = this.programManager;

	        programManager.setUniform('config', [controller.progress, controller.wipeWidth, controller.direction, controller.axis]);
	        programManager.setUniform('reveal', controller.reveal);
	    }

	}

	const GetValue$j = Phaser.Utils.Objects.GetValue;
	const Clamp$2 = Phaser.Math.Clamp;

	class WipeController extends Phaser.Filters.Controller {
	    static FilterName = FilterName$2;

	    constructor(camera, config) {
	        super(camera, FilterName$2);

	        this.progress = 0;
	        this.wipeWidth = 0.1;
	        this.direction = 0;
	        this.axis = 0;
	        this.reveal = false;

	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.setProgress(GetValue$j(o, 'progress', 0));
	        this.setWipeWidth(GetValue$j(o, 'wipeWidth', 0.1));
	        this.setDirection(GetValue$j(o, 'direction', 0));
	        this.setAxis(GetValue$j(o, 'axis', 0));

	        var reveal = GetValue$j(o, 'reveal', undefined);
	        if (reveal === undefined) {
	            reveal = !GetValue$j(o, 'wipe', true);
	        }
	        if (reveal) {
	            this.enableRevealMode();
	        } else {
	            this.enableWipeMode();
	        }

	        return this;
	    }

	    get progress() {
	        return this._progress;
	    }

	    set progress(value) {
	        this._progress = Clamp$2(value, 0, 1);
	    }

	    setProgress(value) {
	        this.progress = value;
	        return this;
	    }

	    get wipeWidth() {
	        return this._wipeWidth;
	    }

	    set wipeWidth(value) {
	        this._wipeWidth = Clamp$2(value, 0, 1);
	    }

	    setWipeWidth(wipeWidth) {
	        this.wipeWidth = wipeWidth;
	        return this;
	    }

	    setDirection(direction) {
	        this.direction = direction;
	        return this;
	    }

	    setAxis(axis) {
	        this.axis = axis;
	        return this;
	    }

	    enableWipeMode() {
	        this.reveal = false;
	        return this;
	    }

	    enableRevealMode() {
	        this.reveal = true;
	        return this;
	    }

	}

	var InstallWipeFX = function (game) {
	    game = GetGame(game);

	    var success = RegisterFilter(game, WarpFilter);
	    if (!success) {
	        return false;
	    }

	    AddFilterListMethod(
	        'addP3Wipe',
	        function (wipeWidth, direction, axis) {
	            if (wipeWidth === undefined) { wipeWidth = 0.1; }
	            if (direction === undefined) { direction = 0; }
	            if (axis === undefined) { axis = 0; }

	            return this.add(new WipeController(
	                this.camera,
	                { wipeWidth, direction, axis }
	            ));
	        }
	    );

	    AddFilterListMethod(
	        'addP3Reveal',
	        function (wipeWidth, direction, axis) {
	            if (wipeWidth === undefined) { wipeWidth = 0.1; }
	            if (direction === undefined) { direction = 0; }
	            if (axis === undefined) { axis = 0; }

	            return this.add(new WipeController(
	                this.camera,
	                { wipeWidth, direction, axis, reveal: true }
	            ));
	        }
	    );

	    return true;
	};

	var AddRevealProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'revealLeft')) {
	        return gameObject;
	    }

	    InstallWipeFX(gameObject);

	    var filterList = GetFilterList(gameObject);

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
	            filterList.remove(gameObject._revealEffect);
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
	                    gameObject._revealEffect = filterList.addP3Reveal(revealWidth, 0, 0);
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
	                    gameObject._revealEffect = filterList.addP3Reveal(revealWidth, 0, 0);
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
	                    gameObject._revealEffect = filterList.addP3Reveal(revealWidth, 0, 0);
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
	                    gameObject._revealEffect = filterList.addP3Reveal(revealWidth, 0, 0);
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

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._shadow);
	                    gameObject._shadow = undefined;
	                }
	            } else {
	                if (!gameObject._shadow) {
	                    gameObject._shadow = filterList.addShadow(shadowX, shadowY, shadowDecay, shadowPower, shadowColor, shadowSamples, shadowIntensity);
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

	const FilterName$1 = 'FilterP3Shine';

	// Built-in fx in phaser3

	const frag$1 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec4 config;
uniform bool reveal;
uniform vec2 texSize;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    float speed = config.x;
    float time = config.y;
    float lineWidth = config.z;
    float gradient = config.w;

	vec2 uv = gl_FragCoord.xy / texSize;

    vec4 tex = texture2D(uMainSampler, outTexCoord);

    vec4 col1 = vec4(0.3, 0.0, 0.0, 1.0);
    vec4 col2 = vec4(0.85, 0.85, 0.85, 1.0);

    uv.x = uv.x - mod(time * speed, 2.0) + 0.5;
    float y = uv.x * gradient;

    float s = smoothstep(y - lineWidth, y, uv.y) - smoothstep(y, y + lineWidth, uv.y);

    gl_FragColor = (((s * col1) + (s * col2)) * tex);

    if (!reveal)
    {
        //  Apply the shine effect
        gl_FragColor += tex;
    }
}
`;

	var GetTickDelta = function (game) {
	    return GetGame(game).loop.delta;
	};

	const MaxPeriod = 60 * 60 * 1000;

	var GetCurrentTime = function (scene, prevTime) {
	    var tickDelta = GetTickDelta(scene);
	    var currentTime = prevTime + tickDelta;
	    if (currentTime >= MaxPeriod) {
	        currentTime -= MaxPeriod;
	    }

	    return currentTime;
	};

	class ShineFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
	    static FilterName = FilterName$1;

	    constructor(manager) {
	        super(FilterName$1, manager, null, frag$1);
	    }

	    // This method sets up the uniforms for the shader.
	    setupUniforms(controller, drawingContext) {
	        const programManager = this.programManager;

	        controller.now = GetCurrentTime(this.manager.renderer.game, controller.now);
	        programManager.setUniform('config', [controller.speed, controller.now, controller.lineWidth, controller.gradient]);
	        programManager.setUniform('reveal', controller.reveal);
	        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
	    }

	}

	const GetValue$i = Phaser.Utils.Objects.GetValue;

	class ShineController extends Phaser.Filters.Controller {
	    static FilterName = FilterName$1;

	    constructor(camera, config) {
	        super(camera, FilterName$1);

	        this.now = 0;

	        this.speed = 0.5;
	        this.lineWidth = 0.5;
	        this.gradient = 3;
	        this.reveal = false;

	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.setSpeed(GetValue$i(o, 'speed', 0.5));
	        this.setLineWidth(GetValue$i(o, 'lineWidth', 0.5));
	        this.setGradient(GetValue$i(o, 'gradient', 3));
	        this.setReveal(GetValue$i(o, 'reveal', false));

	        return this;
	    }

	    setSpeed(speed) {
	        this.speed = speed;
	        return this;
	    }

	    setLineWidth(lineWidth) {
	        this.lineWidth = lineWidth;
	        return this;
	    }

	    setGradient(gradient) {
	        this.gradient = gradient;
	        return this;
	    }

	    setReveal(reveal) {
	        this.reveal = reveal;
	        return this;
	    }
	}

	var InstallShineFX = function (game) {
	    game = GetGame(game);

	    var success = RegisterFilter(game, ShineFilter);
	    if (!success) {
	        return false;
	    }

	    AddFilterListMethod(
	        'addP3Shine',
	        function (speed, lineWidth, gradient, reveal) {
	            if (speed === undefined) { speed = 0.5; }
	            if (lineWidth === undefined) { lineWidth = 0.5; }
	            if (gradient === undefined) { gradient = 3; }
	            if (reveal === undefined) { reveal = false; }

	            return this.add(new ShineController(
	                this.camera,
	                { speed, lineWidth, gradient, reveal }
	            ));
	        }
	    );

	    return true;
	};

	var AddShineProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'shineSpeed')) {
	        return gameObject;
	    }

	    InstallShineFX(gameObject);

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._shine);
	                    gameObject._shine = undefined;
	                }
	            } else {
	                if (!gameObject._shine) {
	                    gameObject._shine = filterList.addP3Shine(shineSpeed, shineLineWidth, shineGradient);
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

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._tiltShift);
	                    gameObject._tiltShift = undefined;
	                }
	            } else {
	                if (!gameObject._tiltShift) {
	                    gameObject._tiltShift = filterList.addTiltShift(tiltShiftRadius, tiltShiftAmount, tiltShiftContrast, tiltShiftBlurX, tiltShiftBlurY, tiltShiftStrength);
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

	const FilterName = 'FilterP3Vignette';

	// Built-in fx in phaser3

	const frag = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec2 config;
uniform vec2 position;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    float radius = config.x;
    float strength = config.y;

    vec4 col = vec4(1.0);

    float d = length(outTexCoord - position);

    if (d <= radius)
    {
        float g = d / radius;
        g = sin(g * 3.14 * strength);
    	col = vec4(g * g * g);
    }

    vec4 texture = texture2D(uMainSampler, outTexCoord);

    gl_FragColor = texture * (1.0 - col);
}
`;

	class VignetteFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
	    static FilterName = FilterName;

	    constructor(manager) {
	        super(FilterName, manager, null, frag);
	    }

	    // This method sets up the uniforms for the shader.
	    setupUniforms(controller, drawingContext) {
	        const programManager = this.programManager;

	        programManager.setUniform('config', [controller.radius, controller.strength]);
	        programManager.setUniform('position', [controller.x, controller.y]);
	    }

	}

	const GetValue$h = Phaser.Utils.Objects.GetValue;

	class VignetteController extends Phaser.Filters.Controller {
	    static FilterName = FilterName;

	    constructor(camera, config) {
	        super(camera, FilterName);

	        this.x = 0.5;
	        this.y = 0.5;
	        this.radius = 0.5;
	        this.strength = 0.5;

	        this.resetFromJSON(config);
	    }

	    resetFromJSON(o) {
	        this.setPosition(GetValue$h(o, 'x', 0.5), GetValue$h(o, 'y', 0.5));
	        this.setRadius(GetValue$h(o, 'radius', 0.5));
	        this.setStrength(GetValue$h(o, 'strength', 0.5));

	        return this;
	    }

	    setPosition(x, y) {
	        this.x = x;
	        this.y = y;
	        return this;
	    }

	    setRadius(radius) {
	        this.radius = radius;
	        return this;
	    }

	    setStrength(strength) {
	        this.strength = strength;
	        return this;
	    }
	}

	var InstallVignetteFX = function (game) {
	    game = GetGame(game);

	    var success = RegisterFilter(game, VignetteFilter);
	    if (!success) {
	        return false;
	    }

	    AddFilterListMethod(
	        'addP3Vignette',
	        function (x, y, radius, strength) {
	            if (x === undefined) { x = 0.5; }
	            if (y === undefined) { y = 0.5; }
	            if (radius === undefined) { radius = 0.5; }
	            if (strength === undefined) { strength = 0.5; }

	            return this.add(new VignetteController(
	                this.camera,
	                { x, y, radius, strength }
	            ));
	        }
	    );

	    return true;
	};

	var AddVignetteProperties = function (gameObject) {
	    // Don't attach properties again
	    if (HasProperty(gameObject, 'vignetteRadius')) {
	        return gameObject;
	    }

	    InstallVignetteFX(gameObject);

	    var filterList = GetFilterList(gameObject);

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
	                    filterList.remove(gameObject._vignette);
	                    gameObject._vignette = undefined;
	                }
	            } else {
	                if (!gameObject._vignette) {
	                    gameObject._vignette = filterList.addP3Vignette(vignetteX, vignetteY, vignetteRadius, vignetteStrength);
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

	    InstallWipeFX(gameObject);

	    var filterList = GetFilterList(gameObject);

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
	            filterList.remove(gameObject._wipeEffect);
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
	                    gameObject._wipeEffect = filterList.addP3Wipe(wipeWidth, 0, 0);
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
	                    gameObject._wipeEffect = filterList.addP3Wipe(wipeWidth, 0, 0);
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
	                    gameObject._wipeEffect = filterList.addP3Wipe(wipeWidth, 0, 0);
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
	                    gameObject._wipeEffect = filterList.addP3Wipe(wipeWidth, 0, 0);
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
	    blocky: AddBlockyProperties,
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
	const LayerClass$1 = Phaser.GameObjects.Layer;

	var IsGameObject = function (object) {
	    return (object instanceof GameObjectClass) || (object instanceof LayerClass$1);
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

	var methods$1 = {

	};

	Object.assign(
	    methods$1,
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
	    methods$1
	);

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

	var methods = {
	    waitAny: WaitAny,
	};
	Object.assign(
	    methods,
	    WaitTimeMethods,
	    WaitInputMethods,
	    WaitGameObjectMethods,
	    WaitCameraMethods,
	    WaitMusicMethods,
	);

	class WaitEventManager extends WaitEvent {
	    constructor(parent, config) {
	        super(parent);

	        this.waitCompleteEventName = GetValue$o(config, 'completeEventName', this.waitCompleteEventName);

	        this.setClickTarget(GetValue$o(config, 'clickTarget', this.scene));
	        this.setClickShortcutKeys(GetValue$o(config, 'clickShortcutKeys', undefined));
	        this.setCameraTarget(GetValue$o(config, 'camera', this.scene.cameras.main));
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
	    methods,
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
	        this.setEventEmitter(GetValue$o(config, 'eventEmitter', undefined));

	        // Value convert
	        this.setValueConverter(GetValue$o(config, 'valueConvert', true));
	        // Loop
	        this.setLoopEnable(GetValue$o(config, 'loop', false));

	        // Brackets and generate regex
	        this.setMultipleLinesTagEnable(GetValue$o(config, 'multipleLinesTag', false));
	        var delimiters = GetValue$o(config, 'delimiters', '<>');
	        this.setDelimiters(delimiters[0], delimiters[1]);

	        // Translate tagName callback
	        this.setTranslateTagNameCallback(GetValue$o(config, 'translateTagNameCallback'));

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
	        this.setTagExpression(GetValue$o(config, 'regex.tag', undefined));
	        this.setValueExpression(GetValue$o(config, 'regex.value', undefined));
	        // Brackets and generate regex
	        var delimiters = GetValue$o(config, 'delimiters', '<>');
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
	        var command = (gameObjectManager.commands) ? gameObjectManager.commands[commandName] : undefined;
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

	class YAMLEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
	    constructor(pluginManager) {
	        super(pluginManager);
	    }

	    start() {
	        var eventEmitter = this.game.events;
	        eventEmitter.on('destroy', this.destroy, this);
	    }

	    add(config) {
	        return new YAMLEventSheets(config);
	    }

	    addCommandExecutor(scene, config) {
	        return new CommandExecutor(scene, config);
	    }

	}

	return YAMLEventSheetsPlugin;

}));
