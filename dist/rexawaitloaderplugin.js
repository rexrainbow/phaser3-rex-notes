(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexawaitloaderplugin = factory());
})(this, (function () { 'use strict';

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
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

  var FILE_POPULATED = Phaser.Loader.FILE_POPULATED;
  var UUID = Phaser.Utils.String.UUID;
  var AwaitFile = /*#__PURE__*/function (_Phaser$Loader$File) {
    _inherits(AwaitFile, _Phaser$Loader$File);
    function AwaitFile(loader, fileConfig) {
      _classCallCheck(this, AwaitFile);
      if (!fileConfig.hasOwnProperty('type')) {
        fileConfig.type = 'await';
      }
      if (!fileConfig.hasOwnProperty('url')) {
        fileConfig.url = '';
      }
      if (!fileConfig.hasOwnProperty('key')) {
        fileConfig.key = UUID();
      }
      return _callSuper(this, AwaitFile, [loader, fileConfig]);
    }
    _createClass(AwaitFile, [{
      key: "load",
      value: function load() {
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
            var successCallback = function successCallback() {
              if (runOnce) {
                return;
              }
              self.onLoad();
              runOnce = true;
            };
            var failureCallback = function failureCallback() {
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
    }, {
      key: "onLoad",
      value: function onLoad() {
        this.loader.nextFile(this, true);
      }
    }, {
      key: "onError",
      value: function onError() {
        this.loader.nextFile(this, false);
      }
    }]);
    return AwaitFile;
  }(Phaser.Loader.File);

  var IsFunction = function IsFunction(obj) {
    return obj && typeof obj === 'function';
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var loaderCallback = function loaderCallback(key, config) {
    if (IsFunction(key)) {
      var callback = key;
      var scope = config;
      config = {
        config: {
          callback: callback,
          scope: scope
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

  var AwaitLoaderPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(AwaitLoaderPlugin, _Phaser$Plugins$BaseP);
    function AwaitLoaderPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, AwaitLoaderPlugin);
      _this = _callSuper(this, AwaitLoaderPlugin, [pluginManager]);
      pluginManager.registerFileType('rexAwait', loaderCallback);
      return _this;
    }
    _createClass(AwaitLoaderPlugin, [{
      key: "addToScene",
      value: function addToScene(scene) {
        scene.sys.load.rexAwait = loaderCallback;
      }
    }]);
    return AwaitLoaderPlugin;
  }(Phaser.Plugins.BasePlugin);

  return AwaitLoaderPlugin;

}));
