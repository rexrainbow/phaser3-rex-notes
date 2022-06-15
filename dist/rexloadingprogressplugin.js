(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexloadingprogressplugin = factory());
})(this, (function () { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
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

  var FILE_POPULATED = Phaser.Loader.FILE_POPULATED;
  var UUID = Phaser.Utils.String.UUID;

  var AwaitFile = /*#__PURE__*/function (_Phaser$Loader$File) {
    _inherits(AwaitFile, _Phaser$Loader$File);

    var _super = _createSuper(AwaitFile);

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

      return _super.call(this, loader, fileConfig);
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
          var successCallback = this.onLoad.bind(this);
          var failureCallback = this.onError.bind(this);

          if (callback) {
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

  var WaitEvent = function WaitEvent(eventEmitter, eventName) {
    return new Promise(function (resolve, reject) {
      eventEmitter.once(eventName, function () {
        resolve();
      });
    });
  };

  var NOOP = function NOOP() {//  NOOP
  };

  var GetValue = Phaser.Utils.Objects.GetValue;

  var LoadingProgress = function LoadingProgress(gameObject, config) {
    var TransitionInCallback = GetValue(config, 'transitIn', NOOP);
    var ProgressCallback = GetValue(config, 'progress', NOOP);
    var TransitionOutCallback = GetValue(config, 'transitionOut', NOOP);
    var scene = gameObject.scene; // Register AwaitLoader

    if (!scene.sys.load.rexAwait) {
      Phaser.Loader.FileTypesManager.register('rexAwait', loaderCallback);
      scene.sys.load.rexAwait = loaderCallback;
    } // Add await-task


    scene.load.rexAwait( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(successCallback, failureCallback) {
        var progress;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return TransitionInCallback(gameObject);

              case 2:
                progress = GetProgress(scene);

                if (!(progress < 1)) {
                  _context.next = 13;
                  break;
                }

              case 4:
                if (!(progress < 1)) {
                  _context.next = 11;
                  break;
                }

                _context.next = 7;
                return WaitEvent(scene.load, 'progress');

              case 7:
                progress = GetProgress(scene);
                ProgressCallback(gameObject, progress);
                _context.next = 4;
                break;

              case 11:
                _context.next = 14;
                break;

              case 13:
                // Progress is 1 already
                ProgressCallback(gameObject, progress);

              case 14:
                _context.next = 16;
                return TransitionOutCallback(gameObject);

              case 16:
                gameObject.destroy(); // Finish this loading task, goto create stage

                successCallback();

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };

  var GetProgress = function GetProgress(scene) {
    var loader = scene.load;
    var total = loader.totalToLoad - 1;
    var remainder = loader.list.size + loader.inflight.size - 1;
    var progress = 1 - remainder / total;
    return progress;
  };

  var Delay = function Delay(time, result) {
    if (time === undefined) {
      time = 0;
    }

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(result);
      }, time);
    });
  };

  var LoadingProgressPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(LoadingProgressPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(LoadingProgressPlugin);

    function LoadingProgressPlugin(pluginManager) {
      _classCallCheck(this, LoadingProgressPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(LoadingProgressPlugin, [{
      key: "add",
      value: function add(gameObject, config) {
        LoadingProgress(gameObject, config);
      }
    }, {
      key: "addDelayPromise",
      value: function addDelayPromise(time) {
        return Delay(time);
      }
    }]);

    return LoadingProgressPlugin;
  }(Phaser.Plugins.BasePlugin);

  return LoadingProgressPlugin;

}));
