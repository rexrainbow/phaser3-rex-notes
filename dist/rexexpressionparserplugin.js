(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexexpressionparserplugin = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var empty = {};

  var empty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': empty
  });

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
    resolve: resolve,
    normalize: normalize,
    isAbsolute: isAbsolute,
    join: join,
    relative: relative,
    sep: sep,
    delimiter: delimiter,
    dirname: dirname,
    basename: basename,
    extname: extname,
    'default': path
  });

  var require$$0 = getCjsExportFromNamespace(empty$1);

  var require$$1 = getCjsExportFromNamespace(path$1);

  var parser_1 = createCommonjsModule(function (module, exports) {
    /* parser generated by jison 0.4.18 */

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
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {
        }

        return _o;
      },
          $V0 = [1, 10],
          $V1 = [1, 3],
          $V2 = [1, 4],
          $V3 = [1, 5],
          $V4 = [1, 6],
          $V5 = [1, 8],
          $V6 = [1, 9],
          $V7 = [1, 12],
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
          $Vl = [5, 7, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 28],
          $Vm = [5, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28],
          $Vn = [5, 7, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 26, 28],
          $Vo = [5, 7, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 26, 28],
          $Vp = [5, 7, 17, 18, 19, 20, 21, 22, 23, 24, 26, 28],
          $Vq = [5, 7, 23, 24, 26, 28],
          $Vr = [7, 26];

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
          "+": 11,
          "-": 12,
          "*": 13,
          "/": 14,
          "%": 15,
          "^": 16,
          ">": 17,
          "<": 18,
          "==": 19,
          "!=": 20,
          ">=": 21,
          "<=": 22,
          "||": 23,
          "&&": 24,
          "(": 25,
          ")": 26,
          "?": 27,
          ":": 28,
          "true": 29,
          "false": 30,
          "NUMBER": 31,
          "HEXNUMBER": 32,
          "$accept": 0,
          "$end": 1
        },
        terminals_: {
          2: "error",
          5: "EOF",
          7: ",",
          9: ".",
          10: "NAME",
          11: "+",
          12: "-",
          13: "*",
          14: "/",
          15: "%",
          16: "^",
          17: ">",
          18: "<",
          19: "==",
          20: "!=",
          21: ">=",
          22: "<=",
          23: "||",
          24: "&&",
          25: "(",
          26: ")",
          27: "?",
          28: ":",
          29: "true",
          30: "false",
          31: "NUMBER",
          32: "HEXNUMBER"
        },
        productions_: [0, [3, 2], [6, 3], [6, 1], [8, 3], [8, 1], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 2], [4, 3], [4, 7], [4, 1], [4, 1], [4, 1], [4, 3], [4, 4], [4, 1], [4, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate
        /* action[1] */
        , $$
        /* vstack */
        , _$
        /* lstack */
        ) {
          /* this == yyval */
          var $0 = $$.length - 1;

          switch (yystate) {
            case 1:
              return $$[$0 - 1];

            case 2:
              this.$ = $$[$0 - 2].concat([$$[$0]]);
              break;

            case 3:
              this.$ = [$$[$0]];
              break;

            case 4:
              this.$ = "".concat($$[$0 - 2], ".").concat($$[$0]);
              break;

            case 5:
              this.$ = $$[$0];
              break;

            case 6:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_add', [$$[$0 - 2], $$[$0]]);
              };

              break;

            case 7:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_subtract', [$$[$0 - 2], $$[$0]]);
              };

              break;

            case 8:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_multiply', [$$[$0 - 2], $$[$0]]);
              };

              break;

            case 9:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_divide', [$$[$0 - 2], $$[$0]]);
              };

              break;

            case 10:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_mod', [$$[$0 - 2], $$[$0]]);
              };

              break;

            case 11:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_pow', [$$[$0 - 2], $$[$0]]);
              };

              break;

            case 12:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_greaterThen', [$$[$0 - 2], $$[$0]]) == true;
              };

              break;

            case 13:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_lessThen', [$$[$0 - 2], $$[$0]]) == true;
              };

              break;

            case 14:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_equalTo', [$$[$0 - 2], $$[$0]]) == true;
              };

              break;

            case 15:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_equalTo', [$$[$0 - 2], $$[$0]]) == false;
              };

              break;

            case 16:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_lessThen', [$$[$0 - 2], $$[$0]]) == false;
              };

              break;

            case 17:
              this.$ = function (ctx) {
                return runMethod(yy.parser, '_greaterThen', [$$[$0 - 2], $$[$0]]) == false;
              };

              break;

            case 18:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_or', [$$[$0 - 2], $$[$0]]) == true;
              };

              break;

            case 19:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, '_and', [$$[$0 - 2], $$[$0]]) == true;
              };

              break;

            case 20:
              this.$ = function (ctx) {
                return -runFn($$[$0], ctx);
              };

              break;

            case 21:
              this.$ = function (ctx) {
                return runFn($$[$0 - 1], ctx);
              };

              break;

            case 22:
              this.$ = function (ctx) {
                return runFn($$[$0 - 5], ctx) ? runFn($$[$0 - 2], ctx) : runFn($$[$0], ctx);
              };

              break;

            case 23:
              this.$ = true;
              break;

            case 24:
              this.$ = false;
              break;

            case 25:
              this.$ = function (ctx) {
                return yy.parser.getDotProperty(ctx, $$[$0], 0);
              };

              break;

            case 26:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, $$[$0 - 2], undefined, true);
              };

              break;

            case 27:
              this.$ = function (ctx) {
                return runMethod(yy.parser, ctx, $$[$0 - 3], $$[$0 - 1], true);
              };

              break;

            case 28:
              this.$ = Number(yytext);
              break;

            case 29:
              this.$ = parseInt(yytext, 16);
              break;
          }
        },
        table: [{
          3: 1,
          4: 2,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          1: [3]
        }, {
          5: [1, 11],
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc,
          17: $Vd,
          18: $Ve,
          19: $Vf,
          20: $Vg,
          21: $Vh,
          22: $Vi,
          23: $Vj,
          24: $Vk
        }, {
          4: 26,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 27,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, o($Vl, [2, 23]), o($Vl, [2, 24]), o($Vl, [2, 25], {
          9: [1, 29],
          25: [1, 28]
        }), o($Vl, [2, 28]), o($Vl, [2, 29]), o($Vm, [2, 5]), {
          1: [2, 1]
        }, {
          4: 30,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 31,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 32,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 33,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 34,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 35,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 36,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 37,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 38,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 39,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 40,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 41,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 42,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          4: 43,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, o($Vl, [2, 20]), {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc,
          17: $Vd,
          18: $Ve,
          19: $Vf,
          20: $Vg,
          21: $Vh,
          22: $Vi,
          23: $Vj,
          24: $Vk,
          26: [1, 44]
        }, {
          4: 47,
          6: 46,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          26: [1, 45],
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          10: [1, 48]
        }, o($Vn, [2, 6], {
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc
        }), o($Vn, [2, 7], {
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc
        }), o($Vo, [2, 8], {
          16: $Vc
        }), o($Vo, [2, 9], {
          16: $Vc
        }), o([5, 7, 11, 12, 15, 17, 18, 19, 20, 21, 22, 23, 24, 26, 28], [2, 10], {
          13: $V9,
          14: $Va,
          16: $Vc
        }), o($Vl, [2, 11]), o($Vp, [2, 12], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc
        }), o($Vp, [2, 13], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc
        }), o($Vp, [2, 14], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc
        }), o($Vp, [2, 15], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc
        }), o($Vp, [2, 16], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc
        }), o($Vp, [2, 17], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc
        }), o($Vq, [2, 18], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc,
          17: $Vd,
          18: $Ve,
          19: $Vf,
          20: $Vg,
          21: $Vh,
          22: $Vi
        }), o($Vq, [2, 19], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc,
          17: $Vd,
          18: $Ve,
          19: $Vf,
          20: $Vg,
          21: $Vh,
          22: $Vi
        }), o($Vl, [2, 21], {
          27: [1, 49]
        }), o($Vl, [2, 26]), {
          7: [1, 51],
          26: [1, 50]
        }, o($Vr, [2, 3], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc,
          17: $Vd,
          18: $Ve,
          19: $Vf,
          20: $Vg,
          21: $Vh,
          22: $Vi,
          23: $Vj,
          24: $Vk
        }), o($Vm, [2, 4]), {
          4: 52,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, o($Vl, [2, 27]), {
          4: 53,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc,
          17: $Vd,
          18: $Ve,
          19: $Vf,
          20: $Vg,
          21: $Vh,
          22: $Vi,
          23: $Vj,
          24: $Vk,
          28: [1, 54]
        }, o($Vr, [2, 2], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc,
          17: $Vd,
          18: $Ve,
          19: $Vf,
          20: $Vg,
          21: $Vh,
          22: $Vi,
          23: $Vj,
          24: $Vk
        }), {
          4: 55,
          8: 7,
          10: $V0,
          12: $V1,
          25: $V2,
          29: $V3,
          30: $V4,
          31: $V5,
          32: $V6
        }, o([5, 7, 26, 28], [2, 22], {
          11: $V7,
          12: $V8,
          13: $V9,
          14: $Va,
          15: $Vb,
          16: $Vc,
          17: $Vd,
          18: $Ve,
          19: $Vf,
          20: $Vg,
          21: $Vh,
          22: $Vi,
          23: $Vj,
          24: $Vk
        })],
        defaultActions: {
          11: [2, 1]
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

      function runMethod(self, ctx, name, args, dotMode) {
        if (dotMode === undefined) {
          dotMode = false;
        }

        var method = self[dotMode ? "getDotProperty" : "getProperty"](ctx, name);

        if (method === undefined) {
          method = self.getProperty(ctx, 'defaultHandler');
        }

        if (args) {
          args = args.map(function (arg) {
            return runFn(arg, ctx);
          });
        }

        return method.apply(self, args);
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
            this.yytext = this.yytext.substr(0, this.yytext.length - len); //this.yyleng -= len;

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
              } // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)


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
                return 31;

              case 2:
                return 32;

              case 3:
                return 13;

              case 4:
                return 14;

              case 5:
                return 12;

              case 6:
                return 11;

              case 7:
                return 16;

              case 8:
                return 15;

              case 9:
                return ">=";

              case 10:
                return "<=";

              case 11:
                return 17;

              case 12:
                return 18;

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
                return 25;

              case 20:
                return 26;

              case 21:
                return 7;

              case 22:
                return 9;

              case 23:
                return 29;

              case 24:
                return 30;

              case 25:
                return 10;

              case 26:
                return 5;

              case 27:
                return 'INVALID';
            }
          },
          rules: [/^(?:\s+)/, /^(?:[0-9]+(\.[0-9]+)?\b)/, /^(?:\b0x[0-9A-Fa-f]+\b)/, /^(?:\*)/, /^(?:\/)/, /^(?:-)/, /^(?:\+)/, /^(?:\^)/, /^(?:%)/, /^(?:>=)/, /^(?:<=)/, /^(?:>)/, /^(?:<)/, /^(?:==)/, /^(?:!=)/, /^(?:\|\|)/, /^(?:&&)/, /^(?:\?)/, /^(?::)/, /^(?:\()/, /^(?:\))/, /^(?:,)/, /^(?:\.)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:[a-zA-Z]+(_[0-9a-zA-Z]+)?)/, /^(?:$)/, /^(?:.)/],
          conditions: {
            "INITIAL": {
              "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
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

      if (commonjsRequire.main === module) {
        exports.main(process.argv.slice(1));
      }
    }
  });
  parser_1.parser;
  parser_1.Parser;
  parser_1.parse;
  parser_1.main;

  var GetProperty = function GetProperty(context, key, defaultValue, dotMode) {
    if (!context || typeof context === 'number' || typeof context === 'string') {
      return defaultValue;
    } else if (HasProperty(context, key)) {
      return context[key];
    } else if (dotMode && key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var value = context; //  Use for loop here so we can break early

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (HasProperty(value, key)) {
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

  var HasProperty = function HasProperty(obj, name) {
    return obj.hasOwnProperty(name) || obj[name];
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
    }]);

    return FormulaParser;
  }(parser_1.Parser);

  var IsInValidKey = function IsInValidKey(keys) {
    return keys == null || keys === '' || keys.length === 0;
  };

  var GetEntry = function GetEntry(target, keys, defaultEntry) {
    var entry = target;

    if (IsInValidKey(keys)) ; else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }

      var key;

      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];

        if (entry[key] == null || _typeof(entry[key]) !== 'object') {
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

  var SetValue = function SetValue(target, keys, value) {
    // no object
    if (_typeof(target) !== 'object') {
      return;
    } // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      } // set target to another object
      else if (_typeof(value) === 'object') {
        target = value;
      }
    } else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }

      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }

    return target;
  };

  var ExpressionParserPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(ExpressionParserPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(ExpressionParserPlugin);

    function ExpressionParserPlugin(pluginManager) {
      _classCallCheck(this, ExpressionParserPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(ExpressionParserPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add() {
        return new FormulaParser();
      }
    }]);

    return ExpressionParserPlugin;
  }(Phaser.Plugins.BasePlugin);

  SetValue(window, 'RexPlugins.ExpressionParser', FormulaParser);

  return ExpressionParserPlugin;

})));
