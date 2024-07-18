(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextexttranslationplugin = factory());
})(this, (function () { 'use strict';

    function _mergeNamespaces(n, m) {
        m.forEach(function (e) {
            e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
                if (k !== 'default' && !(k in n)) {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        });
        return Object.freeze(n);
    }

    var EventEmitterMethods = {
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

    const FILE_POPULATED = Phaser.Loader.FILE_POPULATED;
    const UUID = Phaser.Utils.String.UUID;

    class AwaitFile extends Phaser.Loader.File {
        constructor(loader, fileConfig) {
            if (!fileConfig.hasOwnProperty('type')) {
                fileConfig.type = 'await';
            }
            if (!fileConfig.hasOwnProperty('url')) {
                fileConfig.url = '';
            }
            if (!fileConfig.hasOwnProperty('key')) {
                fileConfig.key = UUID();
            }
            super(loader, fileConfig);
        }

        load() {
            if (this.state === FILE_POPULATED) {
                //  Can happen for example in a JSONFile if they've provided a JSON object instead of a URL
                this.loader.nextFile(this, true);
            } else {
                // start loading task
                var config = this.config;
                var callback = config.callback;
                var scope = config.scope;
                if (callback) {

                    var self = this;
                    var runOnce = false;
                    var successCallback = function () {
                        if (runOnce) {
                            return;
                        }

                        self.onLoad();
                        runOnce = true;
                    };
                    var failureCallback = function () {
                        if (runOnce) {
                            return;
                        }

                        self.onError();
                        runOnce = true;
                    };

                    if (scope) {
                        callback.call(scope, successCallback, failureCallback);
                    } else {
                        callback(successCallback, failureCallback);
                    }
                } else {
                    this.onLoad();
                }
            }
        }

        onLoad() {
            this.loader.nextFile(this, true);
        }

        onError() {
            this.loader.nextFile(this, false);
        }
    }

    var IsFunction = function (obj) {    
        return obj && (typeof(obj) === 'function');
    };

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

    const loaderCallback = function (key, config) {
        if (IsFunction(key)) {
            var callback = key;
            var scope = config;
            config = {
                config: {
                    callback: callback,
                    scope: scope,
                }
            };
        } else if (IsPlainObject(key)) {
            config = key;
            if (!config.hasOwnProperty('config')) {
                config = {
                    config: config
                };
            }
        } else {
            config = {
                key: key,
                config: config
            };
        }
        this.addFile(new AwaitFile(this, config));

        return this;
    };

    Phaser.Loader.FileTypesManager.register('rexAwait', loaderCallback);

    function _typeof$3(o) {
      "@babel/helpers - typeof";

      return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
        return typeof o;
      } : function (o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
      }, _typeof$3(o);
    }

    function _classCallCheck$1(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }

    function toPrimitive(t, r) {
      if ("object" != _typeof$3(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof$3(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }

    function toPropertyKey(t) {
      var i = toPrimitive(t, "string");
      return "symbol" == _typeof$3(i) ? i : i + "";
    }

    function _defineProperties$1(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
      }
    }
    function _createClass$1(e, r, t) {
      return r && _defineProperties$1(e.prototype, r), t && _defineProperties$1(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
      }), e;
    }

    function _assertThisInitialized(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function _setPrototypeOf(t, e) {
      return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
        return t.__proto__ = e, t;
      }, _setPrototypeOf(t, e);
    }

    function _inherits(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && _setPrototypeOf(t, e);
    }

    function _possibleConstructorReturn(t, e) {
      if (e && ("object" == _typeof$3(e) || "function" == typeof e)) return e;
      if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
      return _assertThisInitialized(t);
    }

    function _getPrototypeOf(t) {
      return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      }, _getPrototypeOf(t);
    }

    function _defineProperty$2(e, r, t) {
      return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = t, e;
    }

    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }

    function _iterableToArray(r) {
      if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }

    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }

    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _toArray(r) {
      return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest();
    }

    function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    var consoleLogger = {
      type: 'logger',
      log: function log(args) {
        this.output('log', args);
      },
      warn: function warn(args) {
        this.output('warn', args);
      },
      error: function error(args) {
        this.output('error', args);
      },
      output: function output(type, args) {
        if (console && console[type]) console[type].apply(console, args);
      }
    };
    var Logger = function () {
      function Logger(concreteLogger) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        _classCallCheck$1(this, Logger);
        this.init(concreteLogger, options);
      }
      _createClass$1(Logger, [{
        key: "init",
        value: function init(concreteLogger) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          this.prefix = options.prefix || 'i18next:';
          this.logger = concreteLogger || consoleLogger;
          this.options = options;
          this.debug = options.debug;
        }
      }, {
        key: "setDebug",
        value: function setDebug(bool) {
          this.debug = bool;
        }
      }, {
        key: "log",
        value: function log() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return this.forward(args, 'log', '', true);
        }
      }, {
        key: "warn",
        value: function warn() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return this.forward(args, 'warn', '', true);
        }
      }, {
        key: "error",
        value: function error() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          return this.forward(args, 'error', '');
        }
      }, {
        key: "deprecate",
        value: function deprecate() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
        }
      }, {
        key: "forward",
        value: function forward(args, lvl, prefix, debugOnly) {
          if (debugOnly && !this.debug) return null;
          if (typeof args[0] === 'string') args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
          return this.logger[lvl](args);
        }
      }, {
        key: "create",
        value: function create(moduleName) {
          return new Logger(this.logger, _objectSpread$6(_objectSpread$6({}, {
            prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
          }), this.options));
        }
      }, {
        key: "clone",
        value: function clone(options) {
          options = options || this.options;
          options.prefix = options.prefix || this.prefix;
          return new Logger(this.logger, options);
        }
      }]);
      return Logger;
    }();
    var baseLogger = new Logger();

    var EventEmitter = function () {
      function EventEmitter() {
        _classCallCheck$1(this, EventEmitter);
        this.observers = {};
      }
      _createClass$1(EventEmitter, [{
        key: "on",
        value: function on(events, listener) {
          var _this = this;
          events.split(' ').forEach(function (event) {
            _this.observers[event] = _this.observers[event] || [];
            _this.observers[event].push(listener);
          });
          return this;
        }
      }, {
        key: "off",
        value: function off(event, listener) {
          if (!this.observers[event]) return;
          if (!listener) {
            delete this.observers[event];
            return;
          }
          this.observers[event] = this.observers[event].filter(function (l) {
            return l !== listener;
          });
        }
      }, {
        key: "emit",
        value: function emit(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          if (this.observers[event]) {
            var cloned = [].concat(this.observers[event]);
            cloned.forEach(function (observer) {
              observer.apply(void 0, args);
            });
          }
          if (this.observers['*']) {
            var _cloned = [].concat(this.observers['*']);
            _cloned.forEach(function (observer) {
              observer.apply(observer, [event].concat(args));
            });
          }
        }
      }]);
      return EventEmitter;
    }();

    function defer() {
      var res;
      var rej;
      var promise = new Promise(function (resolve, reject) {
        res = resolve;
        rej = reject;
      });
      promise.resolve = res;
      promise.reject = rej;
      return promise;
    }
    function makeString(object) {
      if (object == null) return '';
      return '' + object;
    }
    function copy(a, s, t) {
      a.forEach(function (m) {
        if (s[m]) t[m] = s[m];
      });
    }
    function getLastOfPath(object, path, Empty) {
      function cleanKey(key) {
        return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
      }
      function canNotTraverseDeeper() {
        return !object || typeof object === 'string';
      }
      var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
      while (stack.length > 1) {
        if (canNotTraverseDeeper()) return {};
        var key = cleanKey(stack.shift());
        if (!object[key] && Empty) object[key] = new Empty();
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          object = object[key];
        } else {
          object = {};
        }
      }
      if (canNotTraverseDeeper()) return {};
      return {
        obj: object,
        k: cleanKey(stack.shift())
      };
    }
    function setPath(object, path, newValue) {
      var _getLastOfPath = getLastOfPath(object, path, Object),
        obj = _getLastOfPath.obj,
        k = _getLastOfPath.k;
      obj[k] = newValue;
    }
    function pushPath(object, path, newValue, concat) {
      var _getLastOfPath2 = getLastOfPath(object, path, Object),
        obj = _getLastOfPath2.obj,
        k = _getLastOfPath2.k;
      obj[k] = obj[k] || [];
      if (concat) obj[k] = obj[k].concat(newValue);
      if (!concat) obj[k].push(newValue);
    }
    function getPath(object, path) {
      var _getLastOfPath3 = getLastOfPath(object, path),
        obj = _getLastOfPath3.obj,
        k = _getLastOfPath3.k;
      if (!obj) return undefined;
      return obj[k];
    }
    function getPathWithDefaults(data, defaultData, key) {
      var value = getPath(data, key);
      if (value !== undefined) {
        return value;
      }
      return getPath(defaultData, key);
    }
    function deepExtend(target, source, overwrite) {
      for (var prop in source) {
        if (prop !== '__proto__' && prop !== 'constructor') {
          if (prop in target) {
            if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
              if (overwrite) target[prop] = source[prop];
            } else {
              deepExtend(target[prop], source[prop], overwrite);
            }
          } else {
            target[prop] = source[prop];
          }
        }
      }
      return target;
    }
    function regexEscape(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
    var _entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
    };
    function escape(data) {
      if (typeof data === 'string') {
        return data.replace(/[&<>"'\/]/g, function (s) {
          return _entityMap[s];
        });
      }
      return data;
    }
    var isIE10 = typeof window !== 'undefined' && window.navigator && typeof window.navigator.userAgentData === 'undefined' && window.navigator.userAgent && window.navigator.userAgent.indexOf('MSIE') > -1;
    var chars = [' ', ',', '?', '!', ';'];
    function looksLikeObjectPath(key, nsSeparator, keySeparator) {
      nsSeparator = nsSeparator || '';
      keySeparator = keySeparator || '';
      var possibleChars = chars.filter(function (c) {
        return nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0;
      });
      if (possibleChars.length === 0) return true;
      var r = new RegExp("(".concat(possibleChars.map(function (c) {
        return c === '?' ? '\\?' : c;
      }).join('|'), ")"));
      var matched = !r.test(key);
      if (!matched) {
        var ki = key.indexOf(keySeparator);
        if (ki > 0 && !r.test(key.substring(0, ki))) {
          matched = true;
        }
      }
      return matched;
    }
    function deepFind(obj, path) {
      var keySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
      if (!obj) return undefined;
      if (obj[path]) return obj[path];
      var paths = path.split(keySeparator);
      var current = obj;
      for (var i = 0; i < paths.length; ++i) {
        if (!current) return undefined;
        if (typeof current[paths[i]] === 'string' && i + 1 < paths.length) {
          return undefined;
        }
        if (current[paths[i]] === undefined) {
          var j = 2;
          var p = paths.slice(i, i + j).join(keySeparator);
          var mix = current[p];
          while (mix === undefined && paths.length > i + j) {
            j++;
            p = paths.slice(i, i + j).join(keySeparator);
            mix = current[p];
          }
          if (mix === undefined) return undefined;
          if (mix === null) return null;
          if (path.endsWith(p)) {
            if (typeof mix === 'string') return mix;
            if (p && typeof mix[p] === 'string') return mix[p];
          }
          var joinedPath = paths.slice(i + j).join(keySeparator);
          if (joinedPath) return deepFind(mix, joinedPath, keySeparator);
          return undefined;
        }
        current = current[paths[i]];
      }
      return current;
    }

    function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
    function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
    var ResourceStore = function (_EventEmitter) {
      _inherits(ResourceStore, _EventEmitter);
      var _super = _createSuper$3(ResourceStore);
      function ResourceStore(data) {
        var _this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          ns: ['translation'],
          defaultNS: 'translation'
        };
        _classCallCheck$1(this, ResourceStore);
        _this = _super.call(this);
        if (isIE10) {
          EventEmitter.call(_assertThisInitialized(_this));
        }
        _this.data = data || {};
        _this.options = options;
        if (_this.options.keySeparator === undefined) {
          _this.options.keySeparator = '.';
        }
        if (_this.options.ignoreJSONStructure === undefined) {
          _this.options.ignoreJSONStructure = true;
        }
        return _this;
      }
      _createClass$1(ResourceStore, [{
        key: "addNamespaces",
        value: function addNamespaces(ns) {
          if (this.options.ns.indexOf(ns) < 0) {
            this.options.ns.push(ns);
          }
        }
      }, {
        key: "removeNamespaces",
        value: function removeNamespaces(ns) {
          var index = this.options.ns.indexOf(ns);
          if (index > -1) {
            this.options.ns.splice(index, 1);
          }
        }
      }, {
        key: "getResource",
        value: function getResource(lng, ns, key) {
          var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
          var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
          var ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
          var path = [lng, ns];
          if (key && typeof key !== 'string') path = path.concat(key);
          if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);
          if (lng.indexOf('.') > -1) {
            path = lng.split('.');
          }
          var result = getPath(this.data, path);
          if (result || !ignoreJSONStructure || typeof key !== 'string') return result;
          return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
        }
      }, {
        key: "addResource",
        value: function addResource(lng, ns, key, value) {
          var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
            silent: false
          };
          var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
          var path = [lng, ns];
          if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
          if (lng.indexOf('.') > -1) {
            path = lng.split('.');
            value = ns;
            ns = path[1];
          }
          this.addNamespaces(ns);
          setPath(this.data, path, value);
          if (!options.silent) this.emit('added', lng, ns, key, value);
        }
      }, {
        key: "addResources",
        value: function addResources(lng, ns, resources) {
          var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
            silent: false
          };
          for (var m in resources) {
            if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
              silent: true
            });
          }
          if (!options.silent) this.emit('added', lng, ns, resources);
        }
      }, {
        key: "addResourceBundle",
        value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
          var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
            silent: false
          };
          var path = [lng, ns];
          if (lng.indexOf('.') > -1) {
            path = lng.split('.');
            deep = resources;
            resources = ns;
            ns = path[1];
          }
          this.addNamespaces(ns);
          var pack = getPath(this.data, path) || {};
          if (deep) {
            deepExtend(pack, resources, overwrite);
          } else {
            pack = _objectSpread$5(_objectSpread$5({}, pack), resources);
          }
          setPath(this.data, path, pack);
          if (!options.silent) this.emit('added', lng, ns, resources);
        }
      }, {
        key: "removeResourceBundle",
        value: function removeResourceBundle(lng, ns) {
          if (this.hasResourceBundle(lng, ns)) {
            delete this.data[lng][ns];
          }
          this.removeNamespaces(ns);
          this.emit('removed', lng, ns);
        }
      }, {
        key: "hasResourceBundle",
        value: function hasResourceBundle(lng, ns) {
          return this.getResource(lng, ns) !== undefined;
        }
      }, {
        key: "getResourceBundle",
        value: function getResourceBundle(lng, ns) {
          if (!ns) ns = this.options.defaultNS;
          if (this.options.compatibilityAPI === 'v1') return _objectSpread$5(_objectSpread$5({}, {}), this.getResource(lng, ns));
          return this.getResource(lng, ns);
        }
      }, {
        key: "getDataByLanguage",
        value: function getDataByLanguage(lng) {
          return this.data[lng];
        }
      }, {
        key: "hasLanguageSomeTranslations",
        value: function hasLanguageSomeTranslations(lng) {
          var data = this.getDataByLanguage(lng);
          var n = data && Object.keys(data) || [];
          return !!n.find(function (v) {
            return data[v] && Object.keys(data[v]).length > 0;
          });
        }
      }, {
        key: "toJSON",
        value: function toJSON() {
          return this.data;
        }
      }]);
      return ResourceStore;
    }(EventEmitter);

    var postProcessor = {
      processors: {},
      addPostProcessor: function addPostProcessor(module) {
        this.processors[module.name] = module;
      },
      handle: function handle(processors, value, key, options, translator) {
        var _this = this;
        processors.forEach(function (processor) {
          if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
        });
        return value;
      }
    };

    function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
    function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
    var checkedLoadedFor = {};
    var Translator = function (_EventEmitter) {
      _inherits(Translator, _EventEmitter);
      var _super = _createSuper$2(Translator);
      function Translator(services) {
        var _this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        _classCallCheck$1(this, Translator);
        _this = _super.call(this);
        if (isIE10) {
          EventEmitter.call(_assertThisInitialized(_this));
        }
        copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, _assertThisInitialized(_this));
        _this.options = options;
        if (_this.options.keySeparator === undefined) {
          _this.options.keySeparator = '.';
        }
        _this.logger = baseLogger.create('translator');
        return _this;
      }
      _createClass$1(Translator, [{
        key: "changeLanguage",
        value: function changeLanguage(lng) {
          if (lng) this.language = lng;
        }
      }, {
        key: "exists",
        value: function exists(key) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            interpolation: {}
          };
          if (key === undefined || key === null) {
            return false;
          }
          var resolved = this.resolve(key, options);
          return resolved && resolved.res !== undefined;
        }
      }, {
        key: "extractFromKey",
        value: function extractFromKey(key, options) {
          var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
          if (nsSeparator === undefined) nsSeparator = ':';
          var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
          var namespaces = options.ns || this.options.defaultNS || [];
          var wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
          var seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
          if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
            var m = key.match(this.interpolator.nestingRegexp);
            if (m && m.length > 0) {
              return {
                key: key,
                namespaces: namespaces
              };
            }
            var parts = key.split(nsSeparator);
            if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
            key = parts.join(keySeparator);
          }
          if (typeof namespaces === 'string') namespaces = [namespaces];
          return {
            key: key,
            namespaces: namespaces
          };
        }
      }, {
        key: "translate",
        value: function translate(keys, options, lastKey) {
          var _this2 = this;
          if (_typeof$3(options) !== 'object' && this.options.overloadTranslationOptionHandler) {
            options = this.options.overloadTranslationOptionHandler(arguments);
          }
          if (_typeof$3(options) === 'object') options = _objectSpread$4({}, options);
          if (!options) options = {};
          if (keys === undefined || keys === null) return '';
          if (!Array.isArray(keys)) keys = [String(keys)];
          var returnDetails = options.returnDetails !== undefined ? options.returnDetails : this.options.returnDetails;
          var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
          var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
            key = _this$extractFromKey.key,
            namespaces = _this$extractFromKey.namespaces;
          var namespace = namespaces[namespaces.length - 1];
          var lng = options.lng || this.language;
          var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
          if (lng && lng.toLowerCase() === 'cimode') {
            if (appendNamespaceToCIMode) {
              var nsSeparator = options.nsSeparator || this.options.nsSeparator;
              if (returnDetails) {
                return {
                  res: "".concat(namespace).concat(nsSeparator).concat(key),
                  usedKey: key,
                  exactUsedKey: key,
                  usedLng: lng,
                  usedNS: namespace
                };
              }
              return "".concat(namespace).concat(nsSeparator).concat(key);
            }
            if (returnDetails) {
              return {
                res: key,
                usedKey: key,
                exactUsedKey: key,
                usedLng: lng,
                usedNS: namespace
              };
            }
            return key;
          }
          var resolved = this.resolve(keys, options);
          var res = resolved && resolved.res;
          var resUsedKey = resolved && resolved.usedKey || key;
          var resExactUsedKey = resolved && resolved.exactUsedKey || key;
          var resType = Object.prototype.toString.apply(res);
          var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
          var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
          var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
          var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';
          if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
            if (!options.returnObjects && !this.options.returnObjects) {
              if (!this.options.returnedObjectHandler) {
                this.logger.warn('accessing an object - but returnObjects options is not enabled!');
              }
              var r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, _objectSpread$4(_objectSpread$4({}, options), {}, {
                ns: namespaces
              })) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
              if (returnDetails) {
                resolved.res = r;
                return resolved;
              }
              return r;
            }
            if (keySeparator) {
              var resTypeIsArray = resType === '[object Array]';
              var copy = resTypeIsArray ? [] : {};
              var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
              for (var m in res) {
                if (Object.prototype.hasOwnProperty.call(res, m)) {
                  var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
                  copy[m] = this.translate(deepKey, _objectSpread$4(_objectSpread$4({}, options), {
                    joinArrays: false,
                    ns: namespaces
                  }));
                  if (copy[m] === deepKey) copy[m] = res[m];
                }
              }
              res = copy;
            }
          } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
            res = res.join(joinArrays);
            if (res) res = this.extendTranslation(res, keys, options, lastKey);
          } else {
            var usedDefault = false;
            var usedKey = false;
            var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
            var hasDefaultValue = Translator.hasDefaultValue(options);
            var defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : '';
            var defaultValue = options["defaultValue".concat(defaultValueSuffix)] || options.defaultValue;
            if (!this.isValidLookup(res) && hasDefaultValue) {
              usedDefault = true;
              res = defaultValue;
            }
            if (!this.isValidLookup(res)) {
              usedKey = true;
              res = key;
            }
            var missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
            var resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
            var updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
            if (usedKey || usedDefault || updateMissing) {
              this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
              if (keySeparator) {
                var fk = this.resolve(key, _objectSpread$4(_objectSpread$4({}, options), {}, {
                  keySeparator: false
                }));
                if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
              }
              var lngs = [];
              var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
              if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
                for (var i = 0; i < fallbackLngs.length; i++) {
                  lngs.push(fallbackLngs[i]);
                }
              } else if (this.options.saveMissingTo === 'all') {
                lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
              } else {
                lngs.push(options.lng || this.language);
              }
              var send = function send(l, k, specificDefaultValue) {
                var defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
                if (_this2.options.missingKeyHandler) {
                  _this2.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, options);
                } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
                  _this2.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, options);
                }
                _this2.emit('missingKey', l, namespace, k, res);
              };
              if (this.options.saveMissing) {
                if (this.options.saveMissingPlurals && needsPluralHandling) {
                  lngs.forEach(function (language) {
                    _this2.pluralResolver.getSuffixes(language, options).forEach(function (suffix) {
                      send([language], key + suffix, options["defaultValue".concat(suffix)] || defaultValue);
                    });
                  });
                } else {
                  send(lngs, key, defaultValue);
                }
              }
            }
            res = this.extendTranslation(res, keys, options, resolved, lastKey);
            if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
            if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
              if (this.options.compatibilityAPI !== 'v1') {
                res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(namespace, ":").concat(key) : key, usedDefault ? res : undefined);
              } else {
                res = this.options.parseMissingKeyHandler(res);
              }
            }
          }
          if (returnDetails) {
            resolved.res = res;
            return resolved;
          }
          return res;
        }
      }, {
        key: "extendTranslation",
        value: function extendTranslation(res, key, options, resolved, lastKey) {
          var _this3 = this;
          if (this.i18nFormat && this.i18nFormat.parse) {
            res = this.i18nFormat.parse(res, _objectSpread$4(_objectSpread$4({}, this.options.interpolation.defaultVariables), options), resolved.usedLng, resolved.usedNS, resolved.usedKey, {
              resolved: resolved
            });
          } else if (!options.skipInterpolation) {
            if (options.interpolation) this.interpolator.init(_objectSpread$4(_objectSpread$4({}, options), {
              interpolation: _objectSpread$4(_objectSpread$4({}, this.options.interpolation), options.interpolation)
            }));
            var skipOnVariables = typeof res === 'string' && (options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
            var nestBef;
            if (skipOnVariables) {
              var nb = res.match(this.interpolator.nestingRegexp);
              nestBef = nb && nb.length;
            }
            var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
            if (this.options.interpolation.defaultVariables) data = _objectSpread$4(_objectSpread$4({}, this.options.interpolation.defaultVariables), data);
            res = this.interpolator.interpolate(res, data, options.lng || this.language, options);
            if (skipOnVariables) {
              var na = res.match(this.interpolator.nestingRegexp);
              var nestAft = na && na.length;
              if (nestBef < nestAft) options.nest = false;
            }
            if (!options.lng && this.options.compatibilityAPI !== 'v1' && resolved && resolved.res) options.lng = resolved.usedLng;
            if (options.nest !== false) res = this.interpolator.nest(res, function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              if (lastKey && lastKey[0] === args[0] && !options.context) {
                _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));
                return null;
              }
              return _this3.translate.apply(_this3, args.concat([key]));
            }, options);
            if (options.interpolation) this.interpolator.reset();
          }
          var postProcess = options.postProcess || this.options.postProcess;
          var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;
          if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
            res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? _objectSpread$4({
              i18nResolved: resolved
            }, options) : options, this);
          }
          return res;
        }
      }, {
        key: "resolve",
        value: function resolve(keys) {
          var _this4 = this;
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var found;
          var usedKey;
          var exactUsedKey;
          var usedLng;
          var usedNS;
          if (typeof keys === 'string') keys = [keys];
          keys.forEach(function (k) {
            if (_this4.isValidLookup(found)) return;
            var extracted = _this4.extractFromKey(k, options);
            var key = extracted.key;
            usedKey = key;
            var namespaces = extracted.namespaces;
            if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
            var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
            var needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && _this4.pluralResolver.shouldUseIntlApi();
            var needsContextHandling = options.context !== undefined && (typeof options.context === 'string' || typeof options.context === 'number') && options.context !== '';
            var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
            namespaces.forEach(function (ns) {
              if (_this4.isValidLookup(found)) return;
              usedNS = ns;
              if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
                checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;
                _this4.logger.warn("key \"".concat(usedKey, "\" for languages \"").concat(codes.join(', '), "\" won't get resolved as namespace \"").concat(usedNS, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
              }
              codes.forEach(function (code) {
                if (_this4.isValidLookup(found)) return;
                usedLng = code;
                var finalKeys = [key];
                if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
                  _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
                } else {
                  var pluralSuffix;
                  if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count, options);
                  var zeroSuffix = "".concat(_this4.options.pluralSeparator, "zero");
                  if (needsPluralHandling) {
                    finalKeys.push(key + pluralSuffix);
                    if (needsZeroSuffixLookup) {
                      finalKeys.push(key + zeroSuffix);
                    }
                  }
                  if (needsContextHandling) {
                    var contextKey = "".concat(key).concat(_this4.options.contextSeparator).concat(options.context);
                    finalKeys.push(contextKey);
                    if (needsPluralHandling) {
                      finalKeys.push(contextKey + pluralSuffix);
                      if (needsZeroSuffixLookup) {
                        finalKeys.push(contextKey + zeroSuffix);
                      }
                    }
                  }
                }
                var possibleKey;
                while (possibleKey = finalKeys.pop()) {
                  if (!_this4.isValidLookup(found)) {
                    exactUsedKey = possibleKey;
                    found = _this4.getResource(code, ns, possibleKey, options);
                  }
                }
              });
            });
          });
          return {
            res: found,
            usedKey: usedKey,
            exactUsedKey: exactUsedKey,
            usedLng: usedLng,
            usedNS: usedNS
          };
        }
      }, {
        key: "isValidLookup",
        value: function isValidLookup(res) {
          return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
        }
      }, {
        key: "getResource",
        value: function getResource(code, ns, key) {
          var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
          if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
          return this.resourceStore.getResource(code, ns, key, options);
        }
      }], [{
        key: "hasDefaultValue",
        value: function hasDefaultValue(options) {
          var prefix = 'defaultValue';
          for (var option in options) {
            if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
              return true;
            }
          }
          return false;
        }
      }]);
      return Translator;
    }(EventEmitter);

    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    var LanguageUtil = function () {
      function LanguageUtil(options) {
        _classCallCheck$1(this, LanguageUtil);
        this.options = options;
        this.supportedLngs = this.options.supportedLngs || false;
        this.logger = baseLogger.create('languageUtils');
      }
      _createClass$1(LanguageUtil, [{
        key: "getScriptPartFromCode",
        value: function getScriptPartFromCode(code) {
          if (!code || code.indexOf('-') < 0) return null;
          var p = code.split('-');
          if (p.length === 2) return null;
          p.pop();
          if (p[p.length - 1].toLowerCase() === 'x') return null;
          return this.formatLanguageCode(p.join('-'));
        }
      }, {
        key: "getLanguagePartFromCode",
        value: function getLanguagePartFromCode(code) {
          if (!code || code.indexOf('-') < 0) return code;
          var p = code.split('-');
          return this.formatLanguageCode(p[0]);
        }
      }, {
        key: "formatLanguageCode",
        value: function formatLanguageCode(code) {
          if (typeof code === 'string' && code.indexOf('-') > -1) {
            var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
            var p = code.split('-');
            if (this.options.lowerCaseLng) {
              p = p.map(function (part) {
                return part.toLowerCase();
              });
            } else if (p.length === 2) {
              p[0] = p[0].toLowerCase();
              p[1] = p[1].toUpperCase();
              if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
            } else if (p.length === 3) {
              p[0] = p[0].toLowerCase();
              if (p[1].length === 2) p[1] = p[1].toUpperCase();
              if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
              if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
              if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
            }
            return p.join('-');
          }
          return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
        }
      }, {
        key: "isSupportedCode",
        value: function isSupportedCode(code) {
          if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
            code = this.getLanguagePartFromCode(code);
          }
          return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
        }
      }, {
        key: "getBestMatchFromCodes",
        value: function getBestMatchFromCodes(codes) {
          var _this = this;
          if (!codes) return null;
          var found;
          codes.forEach(function (code) {
            if (found) return;
            var cleanedLng = _this.formatLanguageCode(code);
            if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng)) found = cleanedLng;
          });
          if (!found && this.options.supportedLngs) {
            codes.forEach(function (code) {
              if (found) return;
              var lngOnly = _this.getLanguagePartFromCode(code);
              if (_this.isSupportedCode(lngOnly)) return found = lngOnly;
              found = _this.options.supportedLngs.find(function (supportedLng) {
                if (supportedLng === lngOnly) return supportedLng;
                if (supportedLng.indexOf('-') < 0 && lngOnly.indexOf('-') < 0) return;
                if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
              });
            });
          }
          if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
          return found;
        }
      }, {
        key: "getFallbackCodes",
        value: function getFallbackCodes(fallbacks, code) {
          if (!fallbacks) return [];
          if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
          if (typeof fallbacks === 'string') fallbacks = [fallbacks];
          if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
          if (!code) return fallbacks["default"] || [];
          var found = fallbacks[code];
          if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
          if (!found) found = fallbacks[this.formatLanguageCode(code)];
          if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
          if (!found) found = fallbacks["default"];
          return found || [];
        }
      }, {
        key: "toResolveHierarchy",
        value: function toResolveHierarchy(code, fallbackCode) {
          var _this2 = this;
          var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
          var codes = [];
          var addCode = function addCode(c) {
            if (!c) return;
            if (_this2.isSupportedCode(c)) {
              codes.push(c);
            } else {
              _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
            }
          };
          if (typeof code === 'string' && code.indexOf('-') > -1) {
            if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
            if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
            if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
          } else if (typeof code === 'string') {
            addCode(this.formatLanguageCode(code));
          }
          fallbackCodes.forEach(function (fc) {
            if (codes.indexOf(fc) < 0) addCode(_this2.formatLanguageCode(fc));
          });
          return codes;
        }
      }]);
      return LanguageUtil;
    }();

    var sets = [{
      lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'tl', 'ti', 'tr', 'uz', 'wa'],
      nr: [1, 2],
      fc: 1
    }, {
      lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kk', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
      nr: [1, 2],
      fc: 2
    }, {
      lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
      nr: [1],
      fc: 3
    }, {
      lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
      nr: [1, 2, 5],
      fc: 4
    }, {
      lngs: ['ar'],
      nr: [0, 1, 2, 3, 11, 100],
      fc: 5
    }, {
      lngs: ['cs', 'sk'],
      nr: [1, 2, 5],
      fc: 6
    }, {
      lngs: ['csb', 'pl'],
      nr: [1, 2, 5],
      fc: 7
    }, {
      lngs: ['cy'],
      nr: [1, 2, 3, 8],
      fc: 8
    }, {
      lngs: ['fr'],
      nr: [1, 2],
      fc: 9
    }, {
      lngs: ['ga'],
      nr: [1, 2, 3, 7, 11],
      fc: 10
    }, {
      lngs: ['gd'],
      nr: [1, 2, 3, 20],
      fc: 11
    }, {
      lngs: ['is'],
      nr: [1, 2],
      fc: 12
    }, {
      lngs: ['jv'],
      nr: [0, 1],
      fc: 13
    }, {
      lngs: ['kw'],
      nr: [1, 2, 3, 4],
      fc: 14
    }, {
      lngs: ['lt'],
      nr: [1, 2, 10],
      fc: 15
    }, {
      lngs: ['lv'],
      nr: [1, 2, 0],
      fc: 16
    }, {
      lngs: ['mk'],
      nr: [1, 2],
      fc: 17
    }, {
      lngs: ['mnk'],
      nr: [0, 1, 2],
      fc: 18
    }, {
      lngs: ['mt'],
      nr: [1, 2, 11, 20],
      fc: 19
    }, {
      lngs: ['or'],
      nr: [2, 1],
      fc: 2
    }, {
      lngs: ['ro'],
      nr: [1, 2, 20],
      fc: 20
    }, {
      lngs: ['sl'],
      nr: [5, 1, 2, 3],
      fc: 21
    }, {
      lngs: ['he', 'iw'],
      nr: [1, 2, 20, 21],
      fc: 22
    }];
    var _rulesPluralsTypes = {
      1: function _(n) {
        return Number(n > 1);
      },
      2: function _(n) {
        return Number(n != 1);
      },
      3: function _(n) {
        return 0;
      },
      4: function _(n) {
        return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
      },
      5: function _(n) {
        return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
      },
      6: function _(n) {
        return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
      },
      7: function _(n) {
        return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
      },
      8: function _(n) {
        return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
      },
      9: function _(n) {
        return Number(n >= 2);
      },
      10: function _(n) {
        return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
      },
      11: function _(n) {
        return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
      },
      12: function _(n) {
        return Number(n % 10 != 1 || n % 100 == 11);
      },
      13: function _(n) {
        return Number(n !== 0);
      },
      14: function _(n) {
        return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
      },
      15: function _(n) {
        return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
      },
      16: function _(n) {
        return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
      },
      17: function _(n) {
        return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
      },
      18: function _(n) {
        return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
      },
      19: function _(n) {
        return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
      },
      20: function _(n) {
        return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
      },
      21: function _(n) {
        return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
      },
      22: function _(n) {
        return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
      }
    };
    var deprecatedJsonVersions = ['v1', 'v2', 'v3'];
    var suffixesOrder = {
      zero: 0,
      one: 1,
      two: 2,
      few: 3,
      many: 4,
      other: 5
    };
    function createRules() {
      var rules = {};
      sets.forEach(function (set) {
        set.lngs.forEach(function (l) {
          rules[l] = {
            numbers: set.nr,
            plurals: _rulesPluralsTypes[set.fc]
          };
        });
      });
      return rules;
    }
    var PluralResolver = function () {
      function PluralResolver(languageUtils) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        _classCallCheck$1(this, PluralResolver);
        this.languageUtils = languageUtils;
        this.options = options;
        this.logger = baseLogger.create('pluralResolver');
        if ((!this.options.compatibilityJSON || this.options.compatibilityJSON === 'v4') && (typeof Intl === 'undefined' || !Intl.PluralRules)) {
          this.options.compatibilityJSON = 'v3';
          this.logger.error('Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.');
        }
        this.rules = createRules();
      }
      _createClass$1(PluralResolver, [{
        key: "addRule",
        value: function addRule(lng, obj) {
          this.rules[lng] = obj;
        }
      }, {
        key: "getRule",
        value: function getRule(code) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          if (this.shouldUseIntlApi()) {
            try {
              return new Intl.PluralRules(code, {
                type: options.ordinal ? 'ordinal' : 'cardinal'
              });
            } catch (_unused) {
              return;
            }
          }
          return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
        }
      }, {
        key: "needsPlural",
        value: function needsPlural(code) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var rule = this.getRule(code, options);
          if (this.shouldUseIntlApi()) {
            return rule && rule.resolvedOptions().pluralCategories.length > 1;
          }
          return rule && rule.numbers.length > 1;
        }
      }, {
        key: "getPluralFormsOfKey",
        value: function getPluralFormsOfKey(code, key) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          return this.getSuffixes(code, options).map(function (suffix) {
            return "".concat(key).concat(suffix);
          });
        }
      }, {
        key: "getSuffixes",
        value: function getSuffixes(code) {
          var _this = this;
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var rule = this.getRule(code, options);
          if (!rule) {
            return [];
          }
          if (this.shouldUseIntlApi()) {
            return rule.resolvedOptions().pluralCategories.sort(function (pluralCategory1, pluralCategory2) {
              return suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2];
            }).map(function (pluralCategory) {
              return "".concat(_this.options.prepend).concat(pluralCategory);
            });
          }
          return rule.numbers.map(function (number) {
            return _this.getSuffix(code, number, options);
          });
        }
      }, {
        key: "getSuffix",
        value: function getSuffix(code, count) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var rule = this.getRule(code, options);
          if (rule) {
            if (this.shouldUseIntlApi()) {
              return "".concat(this.options.prepend).concat(rule.select(count));
            }
            return this.getSuffixRetroCompatible(rule, count);
          }
          this.logger.warn("no plural rule found for: ".concat(code));
          return '';
        }
      }, {
        key: "getSuffixRetroCompatible",
        value: function getSuffixRetroCompatible(rule, count) {
          var _this2 = this;
          var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
          var suffix = rule.numbers[idx];
          if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
            if (suffix === 2) {
              suffix = 'plural';
            } else if (suffix === 1) {
              suffix = '';
            }
          }
          var returnSuffix = function returnSuffix() {
            return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
          };
          if (this.options.compatibilityJSON === 'v1') {
            if (suffix === 1) return '';
            if (typeof suffix === 'number') return "_plural_".concat(suffix.toString());
            return returnSuffix();
          } else if (this.options.compatibilityJSON === 'v2') {
            return returnSuffix();
          } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
            return returnSuffix();
          }
          return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
        }
      }, {
        key: "shouldUseIntlApi",
        value: function shouldUseIntlApi() {
          return !deprecatedJsonVersions.includes(this.options.compatibilityJSON);
        }
      }]);
      return PluralResolver;
    }();

    function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function deepFindWithDefaults(data, defaultData, key) {
      var keySeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
      var ignoreJSONStructure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var path = getPathWithDefaults(data, defaultData, key);
      if (!path && ignoreJSONStructure && typeof key === 'string') {
        path = deepFind(data, key, keySeparator);
        if (path === undefined) path = deepFind(defaultData, key, keySeparator);
      }
      return path;
    }
    var Interpolator = function () {
      function Interpolator() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck$1(this, Interpolator);
        this.logger = baseLogger.create('interpolator');
        this.options = options;
        this.format = options.interpolation && options.interpolation.format || function (value) {
          return value;
        };
        this.init(options);
      }
      _createClass$1(Interpolator, [{
        key: "init",
        value: function init() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          if (!options.interpolation) options.interpolation = {
            escapeValue: true
          };
          var iOpts = options.interpolation;
          this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
          this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
          this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
          this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
          this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
          this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
          this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
          this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
          this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
          this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
          this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
          this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
          this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
          this.resetRegExp();
        }
      }, {
        key: "reset",
        value: function reset() {
          if (this.options) this.init(this.options);
        }
      }, {
        key: "resetRegExp",
        value: function resetRegExp() {
          var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
          this.regexp = new RegExp(regexpStr, 'g');
          var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
          this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
          var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
          this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
        }
      }, {
        key: "interpolate",
        value: function interpolate(str, data, lng, options) {
          var _this = this;
          var match;
          var value;
          var replaces;
          var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
          function regexSafe(val) {
            return val.replace(/\$/g, '$$$$');
          }
          var handleFormat = function handleFormat(key) {
            if (key.indexOf(_this.formatSeparator) < 0) {
              var path = deepFindWithDefaults(data, defaultData, key, _this.options.keySeparator, _this.options.ignoreJSONStructure);
              return _this.alwaysFormat ? _this.format(path, undefined, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), data), {}, {
                interpolationkey: key
              })) : path;
            }
            var p = key.split(_this.formatSeparator);
            var k = p.shift().trim();
            var f = p.join(_this.formatSeparator).trim();
            return _this.format(deepFindWithDefaults(data, defaultData, k, _this.options.keySeparator, _this.options.ignoreJSONStructure), f, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), data), {}, {
              interpolationkey: k
            }));
          };
          this.resetRegExp();
          var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
          var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
          var todos = [{
            regex: this.regexpUnescape,
            safeValue: function safeValue(val) {
              return regexSafe(val);
            }
          }, {
            regex: this.regexp,
            safeValue: function safeValue(val) {
              return _this.escapeValue ? regexSafe(_this.escape(val)) : regexSafe(val);
            }
          }];
          todos.forEach(function (todo) {
            replaces = 0;
            while (match = todo.regex.exec(str)) {
              var matchedVar = match[1].trim();
              value = handleFormat(matchedVar);
              if (value === undefined) {
                if (typeof missingInterpolationHandler === 'function') {
                  var temp = missingInterpolationHandler(str, match, options);
                  value = typeof temp === 'string' ? temp : '';
                } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
                  value = '';
                } else if (skipOnVariables) {
                  value = match[0];
                  continue;
                } else {
                  _this.logger.warn("missed to pass in variable ".concat(matchedVar, " for interpolating ").concat(str));
                  value = '';
                }
              } else if (typeof value !== 'string' && !_this.useRawValueToEscape) {
                value = makeString(value);
              }
              var safeValue = todo.safeValue(value);
              str = str.replace(match[0], safeValue);
              if (skipOnVariables) {
                todo.regex.lastIndex += value.length;
                todo.regex.lastIndex -= match[0].length;
              } else {
                todo.regex.lastIndex = 0;
              }
              replaces++;
              if (replaces >= _this.maxReplaces) {
                break;
              }
            }
          });
          return str;
        }
      }, {
        key: "nest",
        value: function nest(str, fc) {
          var _this2 = this;
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var match;
          var value;
          var clonedOptions;
          function handleHasOptions(key, inheritedOptions) {
            var sep = this.nestingOptionsSeparator;
            if (key.indexOf(sep) < 0) return key;
            var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
            var optionsString = "{".concat(c[1]);
            key = c[0];
            optionsString = this.interpolate(optionsString, clonedOptions);
            var matchedSingleQuotes = optionsString.match(/'/g);
            var matchedDoubleQuotes = optionsString.match(/"/g);
            if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
              optionsString = optionsString.replace(/'/g, '"');
            }
            try {
              clonedOptions = JSON.parse(optionsString);
              if (inheritedOptions) clonedOptions = _objectSpread$3(_objectSpread$3({}, inheritedOptions), clonedOptions);
            } catch (e) {
              this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
              return "".concat(key).concat(sep).concat(optionsString);
            }
            delete clonedOptions.defaultValue;
            return key;
          }
          while (match = this.nestingRegexp.exec(str)) {
            var formatters = [];
            clonedOptions = _objectSpread$3({}, options);
            clonedOptions = clonedOptions.replace && typeof clonedOptions.replace !== 'string' ? clonedOptions.replace : clonedOptions;
            clonedOptions.applyPostProcessor = false;
            delete clonedOptions.defaultValue;
            var doReduce = false;
            if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
              var r = match[1].split(this.formatSeparator).map(function (elem) {
                return elem.trim();
              });
              match[1] = r.shift();
              formatters = r;
              doReduce = true;
            }
            value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
            if (value && match[0] === str && typeof value !== 'string') return value;
            if (typeof value !== 'string') value = makeString(value);
            if (!value) {
              this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
              value = '';
            }
            if (doReduce) {
              value = formatters.reduce(function (v, f) {
                return _this2.format(v, f, options.lng, _objectSpread$3(_objectSpread$3({}, options), {}, {
                  interpolationkey: match[1].trim()
                }));
              }, value.trim());
            }
            str = str.replace(match[0], value);
            this.regexp.lastIndex = 0;
          }
          return str;
        }
      }]);
      return Interpolator;
    }();

    function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function parseFormatStr(formatStr) {
      var formatName = formatStr.toLowerCase().trim();
      var formatOptions = {};
      if (formatStr.indexOf('(') > -1) {
        var p = formatStr.split('(');
        formatName = p[0].toLowerCase().trim();
        var optStr = p[1].substring(0, p[1].length - 1);
        if (formatName === 'currency' && optStr.indexOf(':') < 0) {
          if (!formatOptions.currency) formatOptions.currency = optStr.trim();
        } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
          if (!formatOptions.range) formatOptions.range = optStr.trim();
        } else {
          var opts = optStr.split(';');
          opts.forEach(function (opt) {
            if (!opt) return;
            var _opt$split = opt.split(':'),
              _opt$split2 = _toArray(_opt$split),
              key = _opt$split2[0],
              rest = _opt$split2.slice(1);
            var val = rest.join(':').trim().replace(/^'+|'+$/g, '');
            if (!formatOptions[key.trim()]) formatOptions[key.trim()] = val;
            if (val === 'false') formatOptions[key.trim()] = false;
            if (val === 'true') formatOptions[key.trim()] = true;
            if (!isNaN(val)) formatOptions[key.trim()] = parseInt(val, 10);
          });
        }
      }
      return {
        formatName: formatName,
        formatOptions: formatOptions
      };
    }
    function createCachedFormatter(fn) {
      var cache = {};
      return function invokeFormatter(val, lng, options) {
        var key = lng + JSON.stringify(options);
        var formatter = cache[key];
        if (!formatter) {
          formatter = fn(lng, options);
          cache[key] = formatter;
        }
        return formatter(val);
      };
    }
    var Formatter = function () {
      function Formatter() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck$1(this, Formatter);
        this.logger = baseLogger.create('formatter');
        this.options = options;
        this.formats = {
          number: createCachedFormatter(function (lng, opt) {
            var formatter = new Intl.NumberFormat(lng, _objectSpread$2({}, opt));
            return function (val) {
              return formatter.format(val);
            };
          }),
          currency: createCachedFormatter(function (lng, opt) {
            var formatter = new Intl.NumberFormat(lng, _objectSpread$2(_objectSpread$2({}, opt), {}, {
              style: 'currency'
            }));
            return function (val) {
              return formatter.format(val);
            };
          }),
          datetime: createCachedFormatter(function (lng, opt) {
            var formatter = new Intl.DateTimeFormat(lng, _objectSpread$2({}, opt));
            return function (val) {
              return formatter.format(val);
            };
          }),
          relativetime: createCachedFormatter(function (lng, opt) {
            var formatter = new Intl.RelativeTimeFormat(lng, _objectSpread$2({}, opt));
            return function (val) {
              return formatter.format(val, opt.range || 'day');
            };
          }),
          list: createCachedFormatter(function (lng, opt) {
            var formatter = new Intl.ListFormat(lng, _objectSpread$2({}, opt));
            return function (val) {
              return formatter.format(val);
            };
          })
        };
        this.init(options);
      }
      _createClass$1(Formatter, [{
        key: "init",
        value: function init(services) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            interpolation: {}
          };
          var iOpts = options.interpolation;
          this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
        }
      }, {
        key: "add",
        value: function add(name, fc) {
          this.formats[name.toLowerCase().trim()] = fc;
        }
      }, {
        key: "addCached",
        value: function addCached(name, fc) {
          this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
        }
      }, {
        key: "format",
        value: function format(value, _format, lng) {
          var _this = this;
          var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
          var formats = _format.split(this.formatSeparator);
          var result = formats.reduce(function (mem, f) {
            var _parseFormatStr = parseFormatStr(f),
              formatName = _parseFormatStr.formatName,
              formatOptions = _parseFormatStr.formatOptions;
            if (_this.formats[formatName]) {
              var formatted = mem;
              try {
                var valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
                var l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
                formatted = _this.formats[formatName](mem, l, _objectSpread$2(_objectSpread$2(_objectSpread$2({}, formatOptions), options), valOptions));
              } catch (error) {
                _this.logger.warn(error);
              }
              return formatted;
            } else {
              _this.logger.warn("there was no format function for ".concat(formatName));
            }
            return mem;
          }, value);
          return result;
        }
      }]);
      return Formatter;
    }();

    function ownKeys$1$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$1$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1$1(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
    function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
    function removePending(q, name) {
      if (q.pending[name] !== undefined) {
        delete q.pending[name];
        q.pendingCount--;
      }
    }
    var Connector = function (_EventEmitter) {
      _inherits(Connector, _EventEmitter);
      var _super = _createSuper$1(Connector);
      function Connector(backend, store, services) {
        var _this;
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        _classCallCheck$1(this, Connector);
        _this = _super.call(this);
        if (isIE10) {
          EventEmitter.call(_assertThisInitialized(_this));
        }
        _this.backend = backend;
        _this.store = store;
        _this.services = services;
        _this.languageUtils = services.languageUtils;
        _this.options = options;
        _this.logger = baseLogger.create('backendConnector');
        _this.waitingReads = [];
        _this.maxParallelReads = options.maxParallelReads || 10;
        _this.readingCalls = 0;
        _this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
        _this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
        _this.state = {};
        _this.queue = [];
        if (_this.backend && _this.backend.init) {
          _this.backend.init(services, options.backend, options);
        }
        return _this;
      }
      _createClass$1(Connector, [{
        key: "queueLoad",
        value: function queueLoad(languages, namespaces, options, callback) {
          var _this2 = this;
          var toLoad = {};
          var pending = {};
          var toLoadLanguages = {};
          var toLoadNamespaces = {};
          languages.forEach(function (lng) {
            var hasAllNamespaces = true;
            namespaces.forEach(function (ns) {
              var name = "".concat(lng, "|").concat(ns);
              if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
                _this2.state[name] = 2;
              } else if (_this2.state[name] < 0) ; else if (_this2.state[name] === 1) {
                if (pending[name] === undefined) pending[name] = true;
              } else {
                _this2.state[name] = 1;
                hasAllNamespaces = false;
                if (pending[name] === undefined) pending[name] = true;
                if (toLoad[name] === undefined) toLoad[name] = true;
                if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
              }
            });
            if (!hasAllNamespaces) toLoadLanguages[lng] = true;
          });
          if (Object.keys(toLoad).length || Object.keys(pending).length) {
            this.queue.push({
              pending: pending,
              pendingCount: Object.keys(pending).length,
              loaded: {},
              errors: [],
              callback: callback
            });
          }
          return {
            toLoad: Object.keys(toLoad),
            pending: Object.keys(pending),
            toLoadLanguages: Object.keys(toLoadLanguages),
            toLoadNamespaces: Object.keys(toLoadNamespaces)
          };
        }
      }, {
        key: "loaded",
        value: function loaded(name, err, data) {
          var s = name.split('|');
          var lng = s[0];
          var ns = s[1];
          if (err) this.emit('failedLoading', lng, ns, err);
          if (data) {
            this.store.addResourceBundle(lng, ns, data);
          }
          this.state[name] = err ? -1 : 2;
          var loaded = {};
          this.queue.forEach(function (q) {
            pushPath(q.loaded, [lng], ns);
            removePending(q, name);
            if (err) q.errors.push(err);
            if (q.pendingCount === 0 && !q.done) {
              Object.keys(q.loaded).forEach(function (l) {
                if (!loaded[l]) loaded[l] = {};
                var loadedKeys = q.loaded[l];
                if (loadedKeys.length) {
                  loadedKeys.forEach(function (n) {
                    if (loaded[l][n] === undefined) loaded[l][n] = true;
                  });
                }
              });
              q.done = true;
              if (q.errors.length) {
                q.callback(q.errors);
              } else {
                q.callback();
              }
            }
          });
          this.emit('loaded', loaded);
          this.queue = this.queue.filter(function (q) {
            return !q.done;
          });
        }
      }, {
        key: "read",
        value: function read(lng, ns, fcName) {
          var _this3 = this;
          var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.retryTimeout;
          var callback = arguments.length > 5 ? arguments[5] : undefined;
          if (!lng.length) return callback(null, {});
          if (this.readingCalls >= this.maxParallelReads) {
            this.waitingReads.push({
              lng: lng,
              ns: ns,
              fcName: fcName,
              tried: tried,
              wait: wait,
              callback: callback
            });
            return;
          }
          this.readingCalls++;
          var resolver = function resolver(err, data) {
            _this3.readingCalls--;
            if (_this3.waitingReads.length > 0) {
              var next = _this3.waitingReads.shift();
              _this3.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
            }
            if (err && data && tried < _this3.maxRetries) {
              setTimeout(function () {
                _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
              }, wait);
              return;
            }
            callback(err, data);
          };
          var fc = this.backend[fcName].bind(this.backend);
          if (fc.length === 2) {
            try {
              var r = fc(lng, ns);
              if (r && typeof r.then === 'function') {
                r.then(function (data) {
                  return resolver(null, data);
                })["catch"](resolver);
              } else {
                resolver(null, r);
              }
            } catch (err) {
              resolver(err);
            }
            return;
          }
          return fc(lng, ns, resolver);
        }
      }, {
        key: "prepareLoading",
        value: function prepareLoading(languages, namespaces) {
          var _this4 = this;
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var callback = arguments.length > 3 ? arguments[3] : undefined;
          if (!this.backend) {
            this.logger.warn('No backend was added via i18next.use. Will not load resources.');
            return callback && callback();
          }
          if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
          if (typeof namespaces === 'string') namespaces = [namespaces];
          var toLoad = this.queueLoad(languages, namespaces, options, callback);
          if (!toLoad.toLoad.length) {
            if (!toLoad.pending.length) callback();
            return null;
          }
          toLoad.toLoad.forEach(function (name) {
            _this4.loadOne(name);
          });
        }
      }, {
        key: "load",
        value: function load(languages, namespaces, callback) {
          this.prepareLoading(languages, namespaces, {}, callback);
        }
      }, {
        key: "reload",
        value: function reload(languages, namespaces, callback) {
          this.prepareLoading(languages, namespaces, {
            reload: true
          }, callback);
        }
      }, {
        key: "loadOne",
        value: function loadOne(name) {
          var _this5 = this;
          var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var s = name.split('|');
          var lng = s[0];
          var ns = s[1];
          this.read(lng, ns, 'read', undefined, undefined, function (err, data) {
            if (err) _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
            if (!err && data) _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);
            _this5.loaded(name, err, data);
          });
        }
      }, {
        key: "saveMissing",
        value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
          var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
          var clb = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function () {};
          if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
            this.logger.warn("did not save key \"".concat(key, "\" as the namespace \"").concat(namespace, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
            return;
          }
          if (key === undefined || key === null || key === '') return;
          if (this.backend && this.backend.create) {
            var opts = _objectSpread$1$1(_objectSpread$1$1({}, options), {}, {
              isUpdate: isUpdate
            });
            var fc = this.backend.create.bind(this.backend);
            if (fc.length < 6) {
              try {
                var r;
                if (fc.length === 5) {
                  r = fc(languages, namespace, key, fallbackValue, opts);
                } else {
                  r = fc(languages, namespace, key, fallbackValue);
                }
                if (r && typeof r.then === 'function') {
                  r.then(function (data) {
                    return clb(null, data);
                  })["catch"](clb);
                } else {
                  clb(null, r);
                }
              } catch (err) {
                clb(err);
              }
            } else {
              fc(languages, namespace, key, fallbackValue, clb, opts);
            }
          }
          if (!languages || !languages[0]) return;
          this.store.addResource(languages[0], namespace, key, fallbackValue);
        }
      }]);
      return Connector;
    }(EventEmitter);

    function get() {
      return {
        debug: false,
        initImmediate: true,
        ns: ['translation'],
        defaultNS: ['translation'],
        fallbackLng: ['dev'],
        fallbackNS: false,
        supportedLngs: false,
        nonExplicitSupportedLngs: false,
        load: 'all',
        preload: false,
        simplifyPluralSuffix: true,
        keySeparator: '.',
        nsSeparator: ':',
        pluralSeparator: '_',
        contextSeparator: '_',
        partialBundledLanguages: false,
        saveMissing: false,
        updateMissing: false,
        saveMissingTo: 'fallback',
        saveMissingPlurals: true,
        missingKeyHandler: false,
        missingInterpolationHandler: false,
        postProcess: false,
        postProcessPassResolved: false,
        returnNull: true,
        returnEmptyString: true,
        returnObjects: false,
        joinArrays: false,
        returnedObjectHandler: false,
        parseMissingKeyHandler: false,
        appendNamespaceToMissingKey: false,
        appendNamespaceToCIMode: false,
        overloadTranslationOptionHandler: function handle(args) {
          var ret = {};
          if (_typeof$3(args[1]) === 'object') ret = args[1];
          if (typeof args[1] === 'string') ret.defaultValue = args[1];
          if (typeof args[2] === 'string') ret.tDescription = args[2];
          if (_typeof$3(args[2]) === 'object' || _typeof$3(args[3]) === 'object') {
            var options = args[3] || args[2];
            Object.keys(options).forEach(function (key) {
              ret[key] = options[key];
            });
          }
          return ret;
        },
        interpolation: {
          escapeValue: true,
          format: function format(value, _format, lng, options) {
            return value;
          },
          prefix: '{{',
          suffix: '}}',
          formatSeparator: ',',
          unescapePrefix: '-',
          nestingPrefix: '$t(',
          nestingSuffix: ')',
          nestingOptionsSeparator: ',',
          maxReplaces: 1000,
          skipOnVariables: true
        }
      };
    }
    function transformOptions(options) {
      if (typeof options.ns === 'string') options.ns = [options.ns];
      if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
      if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];
      if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
        options.supportedLngs = options.supportedLngs.concat(['cimode']);
      }
      return options;
    }

    function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
    function noop() {}
    function bindMemberFunctions(inst) {
      var mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
      mems.forEach(function (mem) {
        if (typeof inst[mem] === 'function') {
          inst[mem] = inst[mem].bind(inst);
        }
      });
    }
    var I18n = function (_EventEmitter) {
      _inherits(I18n, _EventEmitter);
      var _super = _createSuper(I18n);
      function I18n() {
        var _this;
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = arguments.length > 1 ? arguments[1] : undefined;
        _classCallCheck$1(this, I18n);
        _this = _super.call(this);
        if (isIE10) {
          EventEmitter.call(_assertThisInitialized(_this));
        }
        _this.options = transformOptions(options);
        _this.services = {};
        _this.logger = baseLogger;
        _this.modules = {
          external: []
        };
        bindMemberFunctions(_assertThisInitialized(_this));
        if (callback && !_this.isInitialized && !options.isClone) {
          if (!_this.options.initImmediate) {
            _this.init(options, callback);
            return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
          }
          setTimeout(function () {
            _this.init(options, callback);
          }, 0);
        }
        return _this;
      }
      _createClass$1(I18n, [{
        key: "init",
        value: function init() {
          var _this2 = this;
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var callback = arguments.length > 1 ? arguments[1] : undefined;
          if (typeof options === 'function') {
            callback = options;
            options = {};
          }
          if (!options.defaultNS && options.defaultNS !== false && options.ns) {
            if (typeof options.ns === 'string') {
              options.defaultNS = options.ns;
            } else if (options.ns.indexOf('translation') < 0) {
              options.defaultNS = options.ns[0];
            }
          }
          var defOpts = get();
          this.options = _objectSpread$7(_objectSpread$7(_objectSpread$7({}, defOpts), this.options), transformOptions(options));
          if (this.options.compatibilityAPI !== 'v1') {
            this.options.interpolation = _objectSpread$7(_objectSpread$7({}, defOpts.interpolation), this.options.interpolation);
          }
          if (options.keySeparator !== undefined) {
            this.options.userDefinedKeySeparator = options.keySeparator;
          }
          if (options.nsSeparator !== undefined) {
            this.options.userDefinedNsSeparator = options.nsSeparator;
          }
          function createClassOnDemand(ClassOrObject) {
            if (!ClassOrObject) return null;
            if (typeof ClassOrObject === 'function') return new ClassOrObject();
            return ClassOrObject;
          }
          if (!this.options.isClone) {
            if (this.modules.logger) {
              baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
            } else {
              baseLogger.init(null, this.options);
            }
            var formatter;
            if (this.modules.formatter) {
              formatter = this.modules.formatter;
            } else if (typeof Intl !== 'undefined') {
              formatter = Formatter;
            }
            var lu = new LanguageUtil(this.options);
            this.store = new ResourceStore(this.options.resources, this.options);
            var s = this.services;
            s.logger = baseLogger;
            s.resourceStore = this.store;
            s.languageUtils = lu;
            s.pluralResolver = new PluralResolver(lu, {
              prepend: this.options.pluralSeparator,
              compatibilityJSON: this.options.compatibilityJSON,
              simplifyPluralSuffix: this.options.simplifyPluralSuffix
            });
            if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
              s.formatter = createClassOnDemand(formatter);
              s.formatter.init(s, this.options);
              this.options.interpolation.format = s.formatter.format.bind(s.formatter);
            }
            s.interpolator = new Interpolator(this.options);
            s.utils = {
              hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
            };
            s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
            s.backendConnector.on('*', function (event) {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              _this2.emit.apply(_this2, [event].concat(args));
            });
            if (this.modules.languageDetector) {
              s.languageDetector = createClassOnDemand(this.modules.languageDetector);
              if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
            }
            if (this.modules.i18nFormat) {
              s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
              if (s.i18nFormat.init) s.i18nFormat.init(this);
            }
            this.translator = new Translator(this.services, this.options);
            this.translator.on('*', function (event) {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              _this2.emit.apply(_this2, [event].concat(args));
            });
            this.modules.external.forEach(function (m) {
              if (m.init) m.init(_this2);
            });
          }
          this.format = this.options.interpolation.format;
          if (!callback) callback = noop;
          if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
            var codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
            if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
          }
          if (!this.services.languageDetector && !this.options.lng) {
            this.logger.warn('init: no languageDetector is used and no lng is defined');
          }
          var storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
          storeApi.forEach(function (fcName) {
            _this2[fcName] = function () {
              var _this2$store;
              return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
            };
          });
          var storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
          storeApiChained.forEach(function (fcName) {
            _this2[fcName] = function () {
              var _this2$store2;
              (_this2$store2 = _this2.store)[fcName].apply(_this2$store2, arguments);
              return _this2;
            };
          });
          var deferred = defer();
          var load = function load() {
            var finish = function finish(err, t) {
              if (_this2.isInitialized && !_this2.initializedStoreOnce) _this2.logger.warn('init: i18next is already initialized. You should call init just once!');
              _this2.isInitialized = true;
              if (!_this2.options.isClone) _this2.logger.log('initialized', _this2.options);
              _this2.emit('initialized', _this2.options);
              deferred.resolve(t);
              callback(err, t);
            };
            if (_this2.languages && _this2.options.compatibilityAPI !== 'v1' && !_this2.isInitialized) return finish(null, _this2.t.bind(_this2));
            _this2.changeLanguage(_this2.options.lng, finish);
          };
          if (this.options.resources || !this.options.initImmediate) {
            load();
          } else {
            setTimeout(load, 0);
          }
          return deferred;
        }
      }, {
        key: "loadResources",
        value: function loadResources(language) {
          var _this3 = this;
          var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
          var usedCallback = callback;
          var usedLng = typeof language === 'string' ? language : this.language;
          if (typeof language === 'function') usedCallback = language;
          if (!this.options.resources || this.options.partialBundledLanguages) {
            if (usedLng && usedLng.toLowerCase() === 'cimode') return usedCallback();
            var toLoad = [];
            var append = function append(lng) {
              if (!lng) return;
              var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
              lngs.forEach(function (l) {
                if (toLoad.indexOf(l) < 0) toLoad.push(l);
              });
            };
            if (!usedLng) {
              var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
              fallbacks.forEach(function (l) {
                return append(l);
              });
            } else {
              append(usedLng);
            }
            if (this.options.preload) {
              this.options.preload.forEach(function (l) {
                return append(l);
              });
            }
            this.services.backendConnector.load(toLoad, this.options.ns, function (e) {
              if (!e && !_this3.resolvedLanguage && _this3.language) _this3.setResolvedLanguage(_this3.language);
              usedCallback(e);
            });
          } else {
            usedCallback(null);
          }
        }
      }, {
        key: "reloadResources",
        value: function reloadResources(lngs, ns, callback) {
          var deferred = defer();
          if (!lngs) lngs = this.languages;
          if (!ns) ns = this.options.ns;
          if (!callback) callback = noop;
          this.services.backendConnector.reload(lngs, ns, function (err) {
            deferred.resolve();
            callback(err);
          });
          return deferred;
        }
      }, {
        key: "use",
        value: function use(module) {
          if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
          if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
          if (module.type === 'backend') {
            this.modules.backend = module;
          }
          if (module.type === 'logger' || module.log && module.warn && module.error) {
            this.modules.logger = module;
          }
          if (module.type === 'languageDetector') {
            this.modules.languageDetector = module;
          }
          if (module.type === 'i18nFormat') {
            this.modules.i18nFormat = module;
          }
          if (module.type === 'postProcessor') {
            postProcessor.addPostProcessor(module);
          }
          if (module.type === 'formatter') {
            this.modules.formatter = module;
          }
          if (module.type === '3rdParty') {
            this.modules.external.push(module);
          }
          return this;
        }
      }, {
        key: "setResolvedLanguage",
        value: function setResolvedLanguage(l) {
          if (!l || !this.languages) return;
          if (['cimode', 'dev'].indexOf(l) > -1) return;
          for (var li = 0; li < this.languages.length; li++) {
            var lngInLngs = this.languages[li];
            if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
            if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
              this.resolvedLanguage = lngInLngs;
              break;
            }
          }
        }
      }, {
        key: "changeLanguage",
        value: function changeLanguage(lng, callback) {
          var _this4 = this;
          this.isLanguageChangingTo = lng;
          var deferred = defer();
          this.emit('languageChanging', lng);
          var setLngProps = function setLngProps(l) {
            _this4.language = l;
            _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
            _this4.resolvedLanguage = undefined;
            _this4.setResolvedLanguage(l);
          };
          var done = function done(err, l) {
            if (l) {
              setLngProps(l);
              _this4.translator.changeLanguage(l);
              _this4.isLanguageChangingTo = undefined;
              _this4.emit('languageChanged', l);
              _this4.logger.log('languageChanged', l);
            } else {
              _this4.isLanguageChangingTo = undefined;
            }
            deferred.resolve(function () {
              return _this4.t.apply(_this4, arguments);
            });
            if (callback) callback(err, function () {
              return _this4.t.apply(_this4, arguments);
            });
          };
          var setLng = function setLng(lngs) {
            if (!lng && !lngs && _this4.services.languageDetector) lngs = [];
            var l = typeof lngs === 'string' ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);
            if (l) {
              if (!_this4.language) {
                setLngProps(l);
              }
              if (!_this4.translator.language) _this4.translator.changeLanguage(l);
              if (_this4.services.languageDetector && _this4.services.languageDetector.cacheUserLanguage) _this4.services.languageDetector.cacheUserLanguage(l);
            }
            _this4.loadResources(l, function (err) {
              done(err, l);
            });
          };
          if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
            setLng(this.services.languageDetector.detect());
          } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
            if (this.services.languageDetector.detect.length === 0) {
              this.services.languageDetector.detect().then(setLng);
            } else {
              this.services.languageDetector.detect(setLng);
            }
          } else {
            setLng(lng);
          }
          return deferred;
        }
      }, {
        key: "getFixedT",
        value: function getFixedT(lng, ns, keyPrefix) {
          var _this5 = this;
          var fixedT = function fixedT(key, opts) {
            var options;
            if (_typeof$3(opts) !== 'object') {
              for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                rest[_key3 - 2] = arguments[_key3];
              }
              options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
            } else {
              options = _objectSpread$7({}, opts);
            }
            options.lng = options.lng || fixedT.lng;
            options.lngs = options.lngs || fixedT.lngs;
            options.ns = options.ns || fixedT.ns;
            options.keyPrefix = options.keyPrefix || keyPrefix || fixedT.keyPrefix;
            var keySeparator = _this5.options.keySeparator || '.';
            var resultKey;
            if (options.keyPrefix && Array.isArray(key)) {
              resultKey = key.map(function (k) {
                return "".concat(options.keyPrefix).concat(keySeparator).concat(k);
              });
            } else {
              resultKey = options.keyPrefix ? "".concat(options.keyPrefix).concat(keySeparator).concat(key) : key;
            }
            return _this5.t(resultKey, options);
          };
          if (typeof lng === 'string') {
            fixedT.lng = lng;
          } else {
            fixedT.lngs = lng;
          }
          fixedT.ns = ns;
          fixedT.keyPrefix = keyPrefix;
          return fixedT;
        }
      }, {
        key: "t",
        value: function t() {
          var _this$translator;
          return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
        }
      }, {
        key: "exists",
        value: function exists() {
          var _this$translator2;
          return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
        }
      }, {
        key: "setDefaultNamespace",
        value: function setDefaultNamespace(ns) {
          this.options.defaultNS = ns;
        }
      }, {
        key: "hasLoadedNamespace",
        value: function hasLoadedNamespace(ns) {
          var _this6 = this;
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          if (!this.isInitialized) {
            this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
            return false;
          }
          if (!this.languages || !this.languages.length) {
            this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
            return false;
          }
          var lng = options.lng || this.resolvedLanguage || this.languages[0];
          var fallbackLng = this.options ? this.options.fallbackLng : false;
          var lastLng = this.languages[this.languages.length - 1];
          if (lng.toLowerCase() === 'cimode') return true;
          var loadNotPending = function loadNotPending(l, n) {
            var loadState = _this6.services.backendConnector.state["".concat(l, "|").concat(n)];
            return loadState === -1 || loadState === 2;
          };
          if (options.precheck) {
            var preResult = options.precheck(this, loadNotPending);
            if (preResult !== undefined) return preResult;
          }
          if (this.hasResourceBundle(lng, ns)) return true;
          if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
          if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
          return false;
        }
      }, {
        key: "loadNamespaces",
        value: function loadNamespaces(ns, callback) {
          var _this7 = this;
          var deferred = defer();
          if (!this.options.ns) {
            if (callback) callback();
            return Promise.resolve();
          }
          if (typeof ns === 'string') ns = [ns];
          ns.forEach(function (n) {
            if (_this7.options.ns.indexOf(n) < 0) _this7.options.ns.push(n);
          });
          this.loadResources(function (err) {
            deferred.resolve();
            if (callback) callback(err);
          });
          return deferred;
        }
      }, {
        key: "loadLanguages",
        value: function loadLanguages(lngs, callback) {
          var deferred = defer();
          if (typeof lngs === 'string') lngs = [lngs];
          var preloaded = this.options.preload || [];
          var newLngs = lngs.filter(function (lng) {
            return preloaded.indexOf(lng) < 0;
          });
          if (!newLngs.length) {
            if (callback) callback();
            return Promise.resolve();
          }
          this.options.preload = preloaded.concat(newLngs);
          this.loadResources(function (err) {
            deferred.resolve();
            if (callback) callback(err);
          });
          return deferred;
        }
      }, {
        key: "dir",
        value: function dir(lng) {
          if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
          if (!lng) return 'rtl';
          var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
          var languageUtils = this.services && this.services.languageUtils || new LanguageUtil(get());
          return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
        }
      }, {
        key: "cloneInstance",
        value: function cloneInstance() {
          var _this8 = this;
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
          var mergedOptions = _objectSpread$7(_objectSpread$7(_objectSpread$7({}, this.options), options), {
            isClone: true
          });
          var clone = new I18n(mergedOptions);
          if (options.debug !== undefined || options.prefix !== undefined) {
            clone.logger = clone.logger.clone(options);
          }
          var membersToCopy = ['store', 'services', 'language'];
          membersToCopy.forEach(function (m) {
            clone[m] = _this8[m];
          });
          clone.services = _objectSpread$7({}, this.services);
          clone.services.utils = {
            hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
          };
          clone.translator = new Translator(clone.services, clone.options);
          clone.translator.on('*', function (event) {
            for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
              args[_key4 - 1] = arguments[_key4];
            }
            clone.emit.apply(clone, [event].concat(args));
          });
          clone.init(mergedOptions, callback);
          clone.translator.options = clone.options;
          clone.translator.backendConnector.services.utils = {
            hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
          };
          return clone;
        }
      }, {
        key: "toJSON",
        value: function toJSON() {
          return {
            options: this.options,
            store: this.store,
            language: this.language,
            languages: this.languages,
            resolvedLanguage: this.resolvedLanguage
          };
        }
      }]);
      return I18n;
    }(EventEmitter);
    _defineProperty$2(I18n, "createInstance", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      return new I18n(options, callback);
    });
    var instance = I18n.createInstance();
    instance.createInstance = I18n.createInstance;

    instance.createInstance;
    instance.dir;
    instance.init;
    instance.loadResources;
    instance.reloadResources;
    instance.use;
    instance.changeLanguage;
    instance.getFixedT;
    instance.t;
    instance.exists;
    instance.setDefaultNamespace;
    instance.hasLoadedNamespace;
    instance.loadNamespaces;
    instance.loadLanguages;

    function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
    function hasXMLHttpRequest() {
      return typeof XMLHttpRequest === 'function' || (typeof XMLHttpRequest === "undefined" ? "undefined" : _typeof$2(XMLHttpRequest)) === 'object';
    }
    function isPromise(maybePromise) {
      return !!maybePromise && typeof maybePromise.then === 'function';
    }
    function makePromise(maybePromise) {
      if (isPromise(maybePromise)) {
        return maybePromise;
      }
      return Promise.resolve(maybePromise);
    }

    var global$1 = (typeof global !== "undefined" ? global :
                typeof self !== "undefined" ? self :
                typeof window !== "undefined" ? window : {});

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function commonjsRequire(path) {
    	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }

    var getFetch$1 = {exports: {}};

    var browserPonyfill = {exports: {}};

    var hasRequiredBrowserPonyfill;

    function requireBrowserPonyfill () {
    	if (hasRequiredBrowserPonyfill) return browserPonyfill.exports;
    	hasRequiredBrowserPonyfill = 1;
    	(function (module, exports) {
    		// Save global object in a variable
    		var __global__ =
    		(typeof globalThis !== 'undefined' && globalThis) ||
    		(typeof self !== 'undefined' && self) ||
    		(typeof commonjsGlobal !== 'undefined' && commonjsGlobal);
    		// Create an object that extends from __global__ without the fetch function
    		var __globalThis__ = (function () {
    		function F() {
    		this.fetch = false;
    		this.DOMException = __global__.DOMException;
    		}
    		F.prototype = __global__; // Needed for feature detection on whatwg-fetch's code
    		return new F();
    		})();
    		// Wraps whatwg-fetch with a function scope to hijack the global object
    		// "globalThis" that's going to be patched
    		(function(globalThis) {

    		((function (exports) {

    		  var global =
    		    (typeof globalThis !== 'undefined' && globalThis) ||
    		    (typeof self !== 'undefined' && self) ||
    		    (typeof global !== 'undefined' && global);

    		  var support = {
    		    searchParams: 'URLSearchParams' in global,
    		    iterable: 'Symbol' in global && 'iterator' in Symbol,
    		    blob:
    		      'FileReader' in global &&
    		      'Blob' in global &&
    		      (function() {
    		        try {
    		          new Blob();
    		          return true
    		        } catch (e) {
    		          return false
    		        }
    		      })(),
    		    formData: 'FormData' in global,
    		    arrayBuffer: 'ArrayBuffer' in global
    		  };

    		  function isDataView(obj) {
    		    return obj && DataView.prototype.isPrototypeOf(obj)
    		  }

    		  if (support.arrayBuffer) {
    		    var viewClasses = [
    		      '[object Int8Array]',
    		      '[object Uint8Array]',
    		      '[object Uint8ClampedArray]',
    		      '[object Int16Array]',
    		      '[object Uint16Array]',
    		      '[object Int32Array]',
    		      '[object Uint32Array]',
    		      '[object Float32Array]',
    		      '[object Float64Array]'
    		    ];

    		    var isArrayBufferView =
    		      ArrayBuffer.isView ||
    		      function(obj) {
    		        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    		      };
    		  }

    		  function normalizeName(name) {
    		    if (typeof name !== 'string') {
    		      name = String(name);
    		    }
    		    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    		      throw new TypeError('Invalid character in header field name: "' + name + '"')
    		    }
    		    return name.toLowerCase()
    		  }

    		  function normalizeValue(value) {
    		    if (typeof value !== 'string') {
    		      value = String(value);
    		    }
    		    return value
    		  }

    		  // Build a destructive iterator for the value list
    		  function iteratorFor(items) {
    		    var iterator = {
    		      next: function() {
    		        var value = items.shift();
    		        return {done: value === undefined, value: value}
    		      }
    		    };

    		    if (support.iterable) {
    		      iterator[Symbol.iterator] = function() {
    		        return iterator
    		      };
    		    }

    		    return iterator
    		  }

    		  function Headers(headers) {
    		    this.map = {};

    		    if (headers instanceof Headers) {
    		      headers.forEach(function(value, name) {
    		        this.append(name, value);
    		      }, this);
    		    } else if (Array.isArray(headers)) {
    		      headers.forEach(function(header) {
    		        this.append(header[0], header[1]);
    		      }, this);
    		    } else if (headers) {
    		      Object.getOwnPropertyNames(headers).forEach(function(name) {
    		        this.append(name, headers[name]);
    		      }, this);
    		    }
    		  }

    		  Headers.prototype.append = function(name, value) {
    		    name = normalizeName(name);
    		    value = normalizeValue(value);
    		    var oldValue = this.map[name];
    		    this.map[name] = oldValue ? oldValue + ', ' + value : value;
    		  };

    		  Headers.prototype['delete'] = function(name) {
    		    delete this.map[normalizeName(name)];
    		  };

    		  Headers.prototype.get = function(name) {
    		    name = normalizeName(name);
    		    return this.has(name) ? this.map[name] : null
    		  };

    		  Headers.prototype.has = function(name) {
    		    return this.map.hasOwnProperty(normalizeName(name))
    		  };

    		  Headers.prototype.set = function(name, value) {
    		    this.map[normalizeName(name)] = normalizeValue(value);
    		  };

    		  Headers.prototype.forEach = function(callback, thisArg) {
    		    for (var name in this.map) {
    		      if (this.map.hasOwnProperty(name)) {
    		        callback.call(thisArg, this.map[name], name, this);
    		      }
    		    }
    		  };

    		  Headers.prototype.keys = function() {
    		    var items = [];
    		    this.forEach(function(value, name) {
    		      items.push(name);
    		    });
    		    return iteratorFor(items)
    		  };

    		  Headers.prototype.values = function() {
    		    var items = [];
    		    this.forEach(function(value) {
    		      items.push(value);
    		    });
    		    return iteratorFor(items)
    		  };

    		  Headers.prototype.entries = function() {
    		    var items = [];
    		    this.forEach(function(value, name) {
    		      items.push([name, value]);
    		    });
    		    return iteratorFor(items)
    		  };

    		  if (support.iterable) {
    		    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    		  }

    		  function consumed(body) {
    		    if (body.bodyUsed) {
    		      return Promise.reject(new TypeError('Already read'))
    		    }
    		    body.bodyUsed = true;
    		  }

    		  function fileReaderReady(reader) {
    		    return new Promise(function(resolve, reject) {
    		      reader.onload = function() {
    		        resolve(reader.result);
    		      };
    		      reader.onerror = function() {
    		        reject(reader.error);
    		      };
    		    })
    		  }

    		  function readBlobAsArrayBuffer(blob) {
    		    var reader = new FileReader();
    		    var promise = fileReaderReady(reader);
    		    reader.readAsArrayBuffer(blob);
    		    return promise
    		  }

    		  function readBlobAsText(blob) {
    		    var reader = new FileReader();
    		    var promise = fileReaderReady(reader);
    		    reader.readAsText(blob);
    		    return promise
    		  }

    		  function readArrayBufferAsText(buf) {
    		    var view = new Uint8Array(buf);
    		    var chars = new Array(view.length);

    		    for (var i = 0; i < view.length; i++) {
    		      chars[i] = String.fromCharCode(view[i]);
    		    }
    		    return chars.join('')
    		  }

    		  function bufferClone(buf) {
    		    if (buf.slice) {
    		      return buf.slice(0)
    		    } else {
    		      var view = new Uint8Array(buf.byteLength);
    		      view.set(new Uint8Array(buf));
    		      return view.buffer
    		    }
    		  }

    		  function Body() {
    		    this.bodyUsed = false;

    		    this._initBody = function(body) {
    		      /*
    		        fetch-mock wraps the Response object in an ES6 Proxy to
    		        provide useful test harness features such as flush. However, on
    		        ES5 browsers without fetch or Proxy support pollyfills must be used;
    		        the proxy-pollyfill is unable to proxy an attribute unless it exists
    		        on the object before the Proxy is created. This change ensures
    		        Response.bodyUsed exists on the instance, while maintaining the
    		        semantic of setting Request.bodyUsed in the constructor before
    		        _initBody is called.
    		      */
    		      this.bodyUsed = this.bodyUsed;
    		      this._bodyInit = body;
    		      if (!body) {
    		        this._bodyText = '';
    		      } else if (typeof body === 'string') {
    		        this._bodyText = body;
    		      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
    		        this._bodyBlob = body;
    		      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
    		        this._bodyFormData = body;
    		      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
    		        this._bodyText = body.toString();
    		      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
    		        this._bodyArrayBuffer = bufferClone(body.buffer);
    		        // IE 10-11 can't handle a DataView body.
    		        this._bodyInit = new Blob([this._bodyArrayBuffer]);
    		      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
    		        this._bodyArrayBuffer = bufferClone(body);
    		      } else {
    		        this._bodyText = body = Object.prototype.toString.call(body);
    		      }

    		      if (!this.headers.get('content-type')) {
    		        if (typeof body === 'string') {
    		          this.headers.set('content-type', 'text/plain;charset=UTF-8');
    		        } else if (this._bodyBlob && this._bodyBlob.type) {
    		          this.headers.set('content-type', this._bodyBlob.type);
    		        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
    		          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    		        }
    		      }
    		    };

    		    if (support.blob) {
    		      this.blob = function() {
    		        var rejected = consumed(this);
    		        if (rejected) {
    		          return rejected
    		        }

    		        if (this._bodyBlob) {
    		          return Promise.resolve(this._bodyBlob)
    		        } else if (this._bodyArrayBuffer) {
    		          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
    		        } else if (this._bodyFormData) {
    		          throw new Error('could not read FormData body as blob')
    		        } else {
    		          return Promise.resolve(new Blob([this._bodyText]))
    		        }
    		      };

    		      this.arrayBuffer = function() {
    		        if (this._bodyArrayBuffer) {
    		          var isConsumed = consumed(this);
    		          if (isConsumed) {
    		            return isConsumed
    		          }
    		          if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
    		            return Promise.resolve(
    		              this._bodyArrayBuffer.buffer.slice(
    		                this._bodyArrayBuffer.byteOffset,
    		                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
    		              )
    		            )
    		          } else {
    		            return Promise.resolve(this._bodyArrayBuffer)
    		          }
    		        } else {
    		          return this.blob().then(readBlobAsArrayBuffer)
    		        }
    		      };
    		    }

    		    this.text = function() {
    		      var rejected = consumed(this);
    		      if (rejected) {
    		        return rejected
    		      }

    		      if (this._bodyBlob) {
    		        return readBlobAsText(this._bodyBlob)
    		      } else if (this._bodyArrayBuffer) {
    		        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    		      } else if (this._bodyFormData) {
    		        throw new Error('could not read FormData body as text')
    		      } else {
    		        return Promise.resolve(this._bodyText)
    		      }
    		    };

    		    if (support.formData) {
    		      this.formData = function() {
    		        return this.text().then(decode)
    		      };
    		    }

    		    this.json = function() {
    		      return this.text().then(JSON.parse)
    		    };

    		    return this
    		  }

    		  // HTTP methods whose capitalization should be normalized
    		  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    		  function normalizeMethod(method) {
    		    var upcased = method.toUpperCase();
    		    return methods.indexOf(upcased) > -1 ? upcased : method
    		  }

    		  function Request(input, options) {
    		    if (!(this instanceof Request)) {
    		      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    		    }

    		    options = options || {};
    		    var body = options.body;

    		    if (input instanceof Request) {
    		      if (input.bodyUsed) {
    		        throw new TypeError('Already read')
    		      }
    		      this.url = input.url;
    		      this.credentials = input.credentials;
    		      if (!options.headers) {
    		        this.headers = new Headers(input.headers);
    		      }
    		      this.method = input.method;
    		      this.mode = input.mode;
    		      this.signal = input.signal;
    		      if (!body && input._bodyInit != null) {
    		        body = input._bodyInit;
    		        input.bodyUsed = true;
    		      }
    		    } else {
    		      this.url = String(input);
    		    }

    		    this.credentials = options.credentials || this.credentials || 'same-origin';
    		    if (options.headers || !this.headers) {
    		      this.headers = new Headers(options.headers);
    		    }
    		    this.method = normalizeMethod(options.method || this.method || 'GET');
    		    this.mode = options.mode || this.mode || null;
    		    this.signal = options.signal || this.signal;
    		    this.referrer = null;

    		    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    		      throw new TypeError('Body not allowed for GET or HEAD requests')
    		    }
    		    this._initBody(body);

    		    if (this.method === 'GET' || this.method === 'HEAD') {
    		      if (options.cache === 'no-store' || options.cache === 'no-cache') {
    		        // Search for a '_' parameter in the query string
    		        var reParamSearch = /([?&])_=[^&]*/;
    		        if (reParamSearch.test(this.url)) {
    		          // If it already exists then set the value with the current time
    		          this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
    		        } else {
    		          // Otherwise add a new '_' parameter to the end with the current time
    		          var reQueryString = /\?/;
    		          this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
    		        }
    		      }
    		    }
    		  }

    		  Request.prototype.clone = function() {
    		    return new Request(this, {body: this._bodyInit})
    		  };

    		  function decode(body) {
    		    var form = new FormData();
    		    body
    		      .trim()
    		      .split('&')
    		      .forEach(function(bytes) {
    		        if (bytes) {
    		          var split = bytes.split('=');
    		          var name = split.shift().replace(/\+/g, ' ');
    		          var value = split.join('=').replace(/\+/g, ' ');
    		          form.append(decodeURIComponent(name), decodeURIComponent(value));
    		        }
    		      });
    		    return form
    		  }

    		  function parseHeaders(rawHeaders) {
    		    var headers = new Headers();
    		    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    		    // https://tools.ietf.org/html/rfc7230#section-3.2
    		    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    		    // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
    		    // https://github.com/github/fetch/issues/748
    		    // https://github.com/zloirock/core-js/issues/751
    		    preProcessedHeaders
    		      .split('\r')
    		      .map(function(header) {
    		        return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    		      })
    		      .forEach(function(line) {
    		        var parts = line.split(':');
    		        var key = parts.shift().trim();
    		        if (key) {
    		          var value = parts.join(':').trim();
    		          headers.append(key, value);
    		        }
    		      });
    		    return headers
    		  }

    		  Body.call(Request.prototype);

    		  function Response(bodyInit, options) {
    		    if (!(this instanceof Response)) {
    		      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    		    }
    		    if (!options) {
    		      options = {};
    		    }

    		    this.type = 'default';
    		    this.status = options.status === undefined ? 200 : options.status;
    		    this.ok = this.status >= 200 && this.status < 300;
    		    this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
    		    this.headers = new Headers(options.headers);
    		    this.url = options.url || '';
    		    this._initBody(bodyInit);
    		  }

    		  Body.call(Response.prototype);

    		  Response.prototype.clone = function() {
    		    return new Response(this._bodyInit, {
    		      status: this.status,
    		      statusText: this.statusText,
    		      headers: new Headers(this.headers),
    		      url: this.url
    		    })
    		  };

    		  Response.error = function() {
    		    var response = new Response(null, {status: 0, statusText: ''});
    		    response.type = 'error';
    		    return response
    		  };

    		  var redirectStatuses = [301, 302, 303, 307, 308];

    		  Response.redirect = function(url, status) {
    		    if (redirectStatuses.indexOf(status) === -1) {
    		      throw new RangeError('Invalid status code')
    		    }

    		    return new Response(null, {status: status, headers: {location: url}})
    		  };

    		  exports.DOMException = global.DOMException;
    		  try {
    		    new exports.DOMException();
    		  } catch (err) {
    		    exports.DOMException = function(message, name) {
    		      this.message = message;
    		      this.name = name;
    		      var error = Error(message);
    		      this.stack = error.stack;
    		    };
    		    exports.DOMException.prototype = Object.create(Error.prototype);
    		    exports.DOMException.prototype.constructor = exports.DOMException;
    		  }

    		  function fetch(input, init) {
    		    return new Promise(function(resolve, reject) {
    		      var request = new Request(input, init);

    		      if (request.signal && request.signal.aborted) {
    		        return reject(new exports.DOMException('Aborted', 'AbortError'))
    		      }

    		      var xhr = new XMLHttpRequest();

    		      function abortXhr() {
    		        xhr.abort();
    		      }

    		      xhr.onload = function() {
    		        var options = {
    		          status: xhr.status,
    		          statusText: xhr.statusText,
    		          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
    		        };
    		        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
    		        var body = 'response' in xhr ? xhr.response : xhr.responseText;
    		        setTimeout(function() {
    		          resolve(new Response(body, options));
    		        }, 0);
    		      };

    		      xhr.onerror = function() {
    		        setTimeout(function() {
    		          reject(new TypeError('Network request failed'));
    		        }, 0);
    		      };

    		      xhr.ontimeout = function() {
    		        setTimeout(function() {
    		          reject(new TypeError('Network request failed'));
    		        }, 0);
    		      };

    		      xhr.onabort = function() {
    		        setTimeout(function() {
    		          reject(new exports.DOMException('Aborted', 'AbortError'));
    		        }, 0);
    		      };

    		      function fixUrl(url) {
    		        try {
    		          return url === '' && global.location.href ? global.location.href : url
    		        } catch (e) {
    		          return url
    		        }
    		      }

    		      xhr.open(request.method, fixUrl(request.url), true);

    		      if (request.credentials === 'include') {
    		        xhr.withCredentials = true;
    		      } else if (request.credentials === 'omit') {
    		        xhr.withCredentials = false;
    		      }

    		      if ('responseType' in xhr) {
    		        if (support.blob) {
    		          xhr.responseType = 'blob';
    		        } else if (
    		          support.arrayBuffer &&
    		          request.headers.get('Content-Type') &&
    		          request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
    		        ) {
    		          xhr.responseType = 'arraybuffer';
    		        }
    		      }

    		      if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
    		        Object.getOwnPropertyNames(init.headers).forEach(function(name) {
    		          xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
    		        });
    		      } else {
    		        request.headers.forEach(function(value, name) {
    		          xhr.setRequestHeader(name, value);
    		        });
    		      }

    		      if (request.signal) {
    		        request.signal.addEventListener('abort', abortXhr);

    		        xhr.onreadystatechange = function() {
    		          // DONE (success or failure)
    		          if (xhr.readyState === 4) {
    		            request.signal.removeEventListener('abort', abortXhr);
    		          }
    		        };
    		      }

    		      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    		    })
    		  }

    		  fetch.polyfill = true;

    		  if (!global.fetch) {
    		    global.fetch = fetch;
    		    global.Headers = Headers;
    		    global.Request = Request;
    		    global.Response = Response;
    		  }

    		  exports.Headers = Headers;
    		  exports.Request = Request;
    		  exports.Response = Response;
    		  exports.fetch = fetch;

    		  return exports;

    		}))({});
    		})(__globalThis__);
    		// This is a ponyfill, so...
    		__globalThis__.fetch.ponyfill = true;
    		delete __globalThis__.fetch.polyfill;
    		// Choose between native implementation (__global__) or custom implementation (__globalThis__)
    		var ctx = __global__.fetch ? __global__ : __globalThis__;
    		exports = ctx.fetch; // To enable: import fetch from 'cross-fetch'
    		exports.default = ctx.fetch; // For TypeScript consumers without esModuleInterop.
    		exports.fetch = ctx.fetch; // To enable: import {fetch} from 'cross-fetch'
    		exports.Headers = ctx.Headers;
    		exports.Request = ctx.Request;
    		exports.Response = ctx.Response;
    		module.exports = exports; 
    	} (browserPonyfill, browserPonyfill.exports));
    	return browserPonyfill.exports;
    }

    (function (module, exports) {
    	var fetchApi;
    	if (typeof fetch === 'function') {
    	  if (typeof commonjsGlobal !== 'undefined' && commonjsGlobal.fetch) {
    	    fetchApi = commonjsGlobal.fetch;
    	  } else if (typeof window !== 'undefined' && window.fetch) {
    	    fetchApi = window.fetch;
    	  } else {
    	    fetchApi = fetch;
    	  }
    	}

    	if (typeof commonjsRequire !== 'undefined' && typeof window === 'undefined') {
    	  var f = fetchApi || requireBrowserPonyfill();
    	  if (f.default) f = f.default;
    	  exports.default = f;
    	  module.exports = exports.default;
    	} 
    } (getFetch$1, getFetch$1.exports));

    var getFetchExports = getFetch$1.exports;
    var getFetch = /*@__PURE__*/getDefaultExportFromCjs(getFetchExports);

    var fetchNode = /*#__PURE__*/_mergeNamespaces({
        __proto__: null,
        default: getFetch
    }, [getFetchExports]);

    function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : i + ""; }
    function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
    var fetchApi;
    if (typeof fetch === 'function') {
      if (typeof global$1 !== 'undefined' && global$1.fetch) {
        fetchApi = global$1.fetch;
      } else if (typeof window !== 'undefined' && window.fetch) {
        fetchApi = window.fetch;
      } else {
        fetchApi = fetch;
      }
    }
    var XmlHttpRequestApi;
    if (hasXMLHttpRequest()) {
      if (typeof global$1 !== 'undefined' && global$1.XMLHttpRequest) {
        XmlHttpRequestApi = global$1.XMLHttpRequest;
      } else if (typeof window !== 'undefined' && window.XMLHttpRequest) {
        XmlHttpRequestApi = window.XMLHttpRequest;
      }
    }
    var ActiveXObjectApi;
    if (typeof ActiveXObject === 'function') {
      if (typeof global$1 !== 'undefined' && global$1.ActiveXObject) {
        ActiveXObjectApi = global$1.ActiveXObject;
      } else if (typeof window !== 'undefined' && window.ActiveXObject) {
        ActiveXObjectApi = window.ActiveXObject;
      }
    }
    if (!fetchApi && fetchNode && !XmlHttpRequestApi && !ActiveXObjectApi) fetchApi = getFetch || fetchNode;
    if (typeof fetchApi !== 'function') fetchApi = undefined;
    var addQueryString = function addQueryString(url, params) {
      if (params && _typeof$1(params) === 'object') {
        var queryString = '';
        for (var paramName in params) {
          queryString += '&' + encodeURIComponent(paramName) + '=' + encodeURIComponent(params[paramName]);
        }
        if (!queryString) return url;
        url = url + (url.indexOf('?') !== -1 ? '&' : '?') + queryString.slice(1);
      }
      return url;
    };
    var fetchIt = function fetchIt(url, fetchOptions, callback, altFetch) {
      var resolver = function resolver(response) {
        if (!response.ok) return callback(response.statusText || 'Error', {
          status: response.status
        });
        response.text().then(function (data) {
          callback(null, {
            status: response.status,
            data: data
          });
        }).catch(callback);
      };
      if (altFetch) {
        var altResponse = altFetch(url, fetchOptions);
        if (altResponse instanceof Promise) {
          altResponse.then(resolver).catch(callback);
          return;
        }
      }
      if (typeof fetch === 'function') {
        fetch(url, fetchOptions).then(resolver).catch(callback);
      } else {
        fetchApi(url, fetchOptions).then(resolver).catch(callback);
      }
    };
    var omitFetchOptions = false;
    var requestWithFetch = function requestWithFetch(options, url, payload, callback) {
      if (options.queryStringParams) {
        url = addQueryString(url, options.queryStringParams);
      }
      var headers = _objectSpread$1({}, typeof options.customHeaders === 'function' ? options.customHeaders() : options.customHeaders);
      if (typeof window === 'undefined' && typeof global$1 !== 'undefined' && typeof global$1.process !== 'undefined' && global$1.process.versions && global$1.process.versions.node) {
        headers['User-Agent'] = "i18next-http-backend (node/".concat(global$1.process.version, "; ").concat(global$1.process.platform, " ").concat(global$1.process.arch, ")");
      }
      if (payload) headers['Content-Type'] = 'application/json';
      var reqOptions = typeof options.requestOptions === 'function' ? options.requestOptions(payload) : options.requestOptions;
      var fetchOptions = _objectSpread$1({
        method: payload ? 'POST' : 'GET',
        body: payload ? options.stringify(payload) : undefined,
        headers: headers
      }, omitFetchOptions ? {} : reqOptions);
      var altFetch = typeof options.alternateFetch === 'function' && options.alternateFetch.length >= 1 ? options.alternateFetch : undefined;
      try {
        fetchIt(url, fetchOptions, callback, altFetch);
      } catch (e) {
        if (!reqOptions || Object.keys(reqOptions).length === 0 || !e.message || e.message.indexOf('not implemented') < 0) {
          return callback(e);
        }
        try {
          Object.keys(reqOptions).forEach(function (opt) {
            delete fetchOptions[opt];
          });
          fetchIt(url, fetchOptions, callback, altFetch);
          omitFetchOptions = true;
        } catch (err) {
          callback(err);
        }
      }
    };
    var requestWithXmlHttpRequest = function requestWithXmlHttpRequest(options, url, payload, callback) {
      if (payload && _typeof$1(payload) === 'object') {
        payload = addQueryString('', payload).slice(1);
      }
      if (options.queryStringParams) {
        url = addQueryString(url, options.queryStringParams);
      }
      try {
        var x;
        if (XmlHttpRequestApi) {
          x = new XmlHttpRequestApi();
        } else {
          x = new ActiveXObjectApi('MSXML2.XMLHTTP.3.0');
        }
        x.open(payload ? 'POST' : 'GET', url, 1);
        if (!options.crossDomain) {
          x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        x.withCredentials = !!options.withCredentials;
        if (payload) {
          x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        if (x.overrideMimeType) {
          x.overrideMimeType('application/json');
        }
        var h = options.customHeaders;
        h = typeof h === 'function' ? h() : h;
        if (h) {
          for (var i in h) {
            x.setRequestHeader(i, h[i]);
          }
        }
        x.onreadystatechange = function () {
          x.readyState > 3 && callback(x.status >= 400 ? x.statusText : null, {
            status: x.status,
            data: x.responseText
          });
        };
        x.send(payload);
      } catch (e) {
        console && console.log(e);
      }
    };
    var request = function request(options, url, payload, callback) {
      if (typeof payload === 'function') {
        callback = payload;
        payload = undefined;
      }
      callback = callback || function () {};
      if (fetchApi && url.indexOf('file:') !== 0) {
        return requestWithFetch(options, url, payload, callback);
      }
      if (hasXMLHttpRequest() || typeof ActiveXObject === 'function') {
        return requestWithXmlHttpRequest(options, url, payload, callback);
      }
      callback(new Error('No fetch and no xhr implementation found!'));
    };

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var getDefaults = function getDefaults() {
      return {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        addPath: '/locales/add/{{lng}}/{{ns}}',
        parse: function parse(data) {
          return JSON.parse(data);
        },
        stringify: JSON.stringify,
        parsePayload: function parsePayload(namespace, key, fallbackValue) {
          return _defineProperty({}, key, fallbackValue || '');
        },
        parseLoadPayload: function parseLoadPayload(languages, namespaces) {
          return undefined;
        },
        request: request,
        reloadInterval: typeof window !== 'undefined' ? false : 60 * 60 * 1000,
        customHeaders: {},
        queryStringParams: {},
        crossDomain: false,
        withCredentials: false,
        overrideMimeType: false,
        requestOptions: {
          mode: 'cors',
          credentials: 'same-origin',
          cache: 'default'
        }
      };
    };
    var Backend = function () {
      function Backend(services) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        _classCallCheck(this, Backend);
        this.services = services;
        this.options = options;
        this.allOptions = allOptions;
        this.type = 'backend';
        this.init(services, options, allOptions);
      }
      return _createClass(Backend, [{
        key: "init",
        value: function init(services) {
          var _this = this;
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          this.services = services;
          this.options = _objectSpread(_objectSpread(_objectSpread({}, getDefaults()), this.options || {}), options);
          this.allOptions = allOptions;
          if (this.services && this.options.reloadInterval) {
            var timer = setInterval(function () {
              return _this.reload();
            }, this.options.reloadInterval);
            if (_typeof(timer) === 'object' && typeof timer.unref === 'function') timer.unref();
          }
        }
      }, {
        key: "readMulti",
        value: function readMulti(languages, namespaces, callback) {
          this._readAny(languages, languages, namespaces, namespaces, callback);
        }
      }, {
        key: "read",
        value: function read(language, namespace, callback) {
          this._readAny([language], language, [namespace], namespace, callback);
        }
      }, {
        key: "_readAny",
        value: function _readAny(languages, loadUrlLanguages, namespaces, loadUrlNamespaces, callback) {
          var _this2 = this;
          var loadPath = this.options.loadPath;
          if (typeof this.options.loadPath === 'function') {
            loadPath = this.options.loadPath(languages, namespaces);
          }
          loadPath = makePromise(loadPath);
          loadPath.then(function (resolvedLoadPath) {
            if (!resolvedLoadPath) return callback(null, {});
            var url = _this2.services.interpolator.interpolate(resolvedLoadPath, {
              lng: languages.join('+'),
              ns: namespaces.join('+')
            });
            _this2.loadUrl(url, callback, loadUrlLanguages, loadUrlNamespaces);
          });
        }
      }, {
        key: "loadUrl",
        value: function loadUrl(url, callback, languages, namespaces) {
          var _this3 = this;
          var lng = typeof languages === 'string' ? [languages] : languages;
          var ns = typeof namespaces === 'string' ? [namespaces] : namespaces;
          var payload = this.options.parseLoadPayload(lng, ns);
          this.options.request(this.options, url, payload, function (err, res) {
            if (res && (res.status >= 500 && res.status < 600 || !res.status)) return callback('failed loading ' + url + '; status code: ' + res.status, true);
            if (res && res.status >= 400 && res.status < 500) return callback('failed loading ' + url + '; status code: ' + res.status, false);
            if (!res && err && err.message && err.message.indexOf('Failed to fetch') > -1) return callback('failed loading ' + url + ': ' + err.message, true);
            if (err) return callback(err, false);
            var ret, parseErr;
            try {
              if (typeof res.data === 'string') {
                ret = _this3.options.parse(res.data, languages, namespaces);
              } else {
                ret = res.data;
              }
            } catch (e) {
              parseErr = 'failed parsing ' + url + ' to json';
            }
            if (parseErr) return callback(parseErr, false);
            callback(null, ret);
          });
        }
      }, {
        key: "create",
        value: function create(languages, namespace, key, fallbackValue, callback) {
          var _this4 = this;
          if (!this.options.addPath) return;
          if (typeof languages === 'string') languages = [languages];
          var payload = this.options.parsePayload(namespace, key, fallbackValue);
          var finished = 0;
          var dataArray = [];
          var resArray = [];
          languages.forEach(function (lng) {
            var addPath = _this4.options.addPath;
            if (typeof _this4.options.addPath === 'function') {
              addPath = _this4.options.addPath(lng, namespace);
            }
            var url = _this4.services.interpolator.interpolate(addPath, {
              lng: lng,
              ns: namespace
            });
            _this4.options.request(_this4.options, url, payload, function (data, res) {
              finished += 1;
              dataArray.push(data);
              resArray.push(res);
              if (finished === languages.length) {
                if (typeof callback === 'function') callback(dataArray, resArray);
              }
            });
          });
        }
      }, {
        key: "reload",
        value: function reload() {
          var _this5 = this;
          var _this$services = this.services,
            backendConnector = _this$services.backendConnector,
            languageUtils = _this$services.languageUtils,
            logger = _this$services.logger;
          var currentLanguage = backendConnector.language;
          if (currentLanguage && currentLanguage.toLowerCase() === 'cimode') return;
          var toLoad = [];
          var append = function append(lng) {
            var lngs = languageUtils.toResolveHierarchy(lng);
            lngs.forEach(function (l) {
              if (toLoad.indexOf(l) < 0) toLoad.push(l);
            });
          };
          append(currentLanguage);
          if (this.allOptions.preload) this.allOptions.preload.forEach(function (l) {
            return append(l);
          });
          toLoad.forEach(function (lng) {
            _this5.allOptions.ns.forEach(function (ns) {
              backendConnector.read(lng, ns, 'read', null, null, function (err, data) {
                if (err) logger.warn("loading namespace ".concat(ns, " for language ").concat(lng, " failed"), err);
                if (!err && data) logger.log("loaded namespace ".concat(ns, " for language ").concat(lng), data);
                backendConnector.loaded("".concat(lng, "|").concat(ns), err, data);
              });
            });
          });
        }
      }]);
    }();
    Backend.type = 'backend';

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
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

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$1(config, 'eventEmitter', true));

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
        EventEmitterMethods
    );

    var i18next;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class TextTranslation extends ComponentBase {
        static setI18Next(obj) {
            i18next = obj;
        }

        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.resetFromJSON(config);

            this.onLanguageChanged = this.updateText.bind(this);
            i18next.on('languageChanged', this.onLanguageChanged);
        }

        resetFromJSON(o) {
            this.setSetTextCallback(GetValue(o, 'setText', DefaultSetTextCallback));
            this.setInterpolation(GetValue(o, 'interpolation'));
            this.setTranslationKey(GetValue(o, 'translationKey', ''));
            if (GetValue(o, 'updateText', true)) {
                this.updateText();
            }
            return this;
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            i18next.off('languageChanged', this.onLanguageChanged);
            this.interpolation = null;

            super.shutdown(fromScene);
        }

        setSetTextCallback(callback) {
            this.setTextCallback = callback;
            return this;
        }

        setInterpolation(interpolation) {
            this.interpolation = interpolation;
            return this;
        }

        updateInterpolation(key, value) {
            if (!this.interpolation) {
                this.interpolation = {};
            }

            if (typeof (key) === 'string') {
                this.interpolation[key] = value;
            } else {
                var data = key;
                for (key in data) {
                    this.interpolation[key] = data[key];
                }
            }
            return this;
        }

        setTranslationKey(key) {
            this.translationKey = key;
            return this;
        }

        updateText() {
            var text = i18next.t(this.translationKey, this.interpolation);
            this.setTextCallback(this.parent, text);
            return this;
        }

    }

    var DefaultSetTextCallback = function (gameObject, text) {
        gameObject.setText(text);
    };

    class TextTranslationPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            // Event emitter
            this.setEventEmitter();

            this.i18next = instance;
            TextTranslation.setI18Next(instance);

            // Route 'languageChanged' event        
            this.onLanguageChanged = (function (lng) {
                this.emit('languageChanged', lng);
            }).bind(this);
            instance.on('languageChanged', this.onLanguageChanged);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        destroy() {
            instance.off('languageChanged', this.onLanguageChanged);

            super.destroy();

            this.destroyEventEmitter();
        }

        initI18Next(scene, config) {
            loaderCallback.call(scene.load, function (successCallback, failureCallback) {
                instance.use(Backend).init(config, successCallback);
            });
            return this;
        }


        add(gameObject, config) {
            return new TextTranslation(gameObject, config);
        }

        changeLanguage(lng, onComplete) {
            instance.changeLanguage(lng, onComplete);
            return this;
        }

        setDefaultNamespace(namespace) {
            instance.setDefaultNamespace(namespace);
            return this;
        }

        t(translationKey, interpolation) {
            return instance.t(translationKey, interpolation);
        }
    }

    Object.assign(
        TextTranslationPlugin.prototype,
        EventEmitterMethods
    );

    return TextTranslationPlugin;

}));
