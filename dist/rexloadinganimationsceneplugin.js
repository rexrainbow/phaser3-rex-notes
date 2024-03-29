(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexloadinganimationsceneplugin = factory());
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
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
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

  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
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
    } else if (IsPlainObject$1(key)) {
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

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetLoader = function GetLoader(loader) {
    if (IsSceneObject(loader)) {
      var scene = loader;
      return scene.load;
    }
    return loader;
  };

  var GetProgress = function GetProgress(loader, ignoreTaskCount) {
    if (ignoreTaskCount === undefined) {
      ignoreTaskCount = 0;
    }
    loader = GetLoader(loader);
    var total = loader.totalToLoad - ignoreTaskCount;
    var remainder = loader.list.size + loader.inflight.size - ignoreTaskCount;
    var progress = 1 - remainder / total;
    return progress;
  };

  var LastLoadTask = /*#__PURE__*/function (_Phaser$Events$EventE) {
    _inherits(LastLoadTask, _Phaser$Events$EventE);
    function LastLoadTask(scene) {
      var _this;
      _classCallCheck(this, LastLoadTask);
      _this = _callSuper(this, LastLoadTask);
      _this.scene = scene;
      _this.boot();
      return _this;
    }
    _createClass(LastLoadTask, [{
      key: "boot",
      value: function boot() {
        var self = this;
        var loader = this.scene.load;
        loaderCallback.call(loader, function (successCallback, failureCallback) {
          var onProgress = function onProgress() {
            var progress = GetProgress(loader, 1);
            self.emit('progress', progress);
            if (progress === 1) {
              var count = self.listenerCount('complete');
              if (count === 0) {
                onProgressComplete();
              } else {
                self.emit('complete', onProgressComplete);
              }
            }
          };
          var runOnce = false;
          var onProgressComplete = function onProgressComplete() {
            if (runOnce) {
              return;
            }
            runOnce = true;
            self.emit('shutdown');
            loader.off('progress', onProgress);
            successCallback();
            self.destroy();
          };
          loader.on('progress', onProgress);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scene = undefined;
        _get(_getPrototypeOf(LastLoadTask.prototype), "destroy", this).call(this);
      }
    }]);
    return LastLoadTask;
  }(Phaser.Events.EventEmitter);

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var StartLoadingAnimationScene = function StartLoadingAnimationScene(mainScene, animationSceneKey, data, onLoadingComplete, onLoadingProgress) {
    if (IsPlainObject(mainScene)) {
      var config = mainScene;
      mainScene = config.mainScene;
      animationSceneKey = config.animationScene;
      onLoadingComplete = config.onLoadingComplete;
      onLoadingProgress = config.onLoadingProgress;
    } else {
      if (typeof data === 'function') {
        onLoadingProgress = onLoadingComplete;
        onLoadingComplete = data;
        data = undefined;
      }
    }
    if (IsSceneObject(animationSceneKey)) {
      var animationScene = animationSceneKey;
      animationSceneKey = animationScene.sys.settings.key;
    }

    // Don't launch animation scene if it has been started
    if (mainScene.scene.getStatus(animationSceneKey) < Phaser.Scenes.START) {
      // Phaser.Scenes.START = 2
      mainScene.scene.launch(animationSceneKey, data);
    }
    var animationScene = mainScene.scene.get(animationSceneKey);
    new LastLoadTask(mainScene).on('progress', function (progress) {
      if (onLoadingProgress) {
        onLoadingProgress(progress, animationScene);
      }
    }).on('complete', function (onProgressComplete) {
      if (!onLoadingComplete) {
        onProgressComplete();
      } else {
        onLoadingComplete(onProgressComplete, animationScene);
      }
    }).on('shutdown', function () {
      animationScene.scene.stop();
    });
  };

  var LoadingAnimationScenePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(LoadingAnimationScenePlugin, _Phaser$Plugins$BaseP);
    function LoadingAnimationScenePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, LoadingAnimationScenePlugin);
      _this = _callSuper(this, LoadingAnimationScenePlugin, [pluginManager]);
      pluginManager.registerFileType('rexAwait', loaderCallback);
      return _this;
    }
    _createClass(LoadingAnimationScenePlugin, [{
      key: "addToScene",
      value: function addToScene(scene) {
        scene.sys.load.rexAwait = loaderCallback;
      }
    }, {
      key: "startScene",
      value: function startScene(scene, animationSceneKey, data, onLoadingComplete) {
        StartLoadingAnimationScene(scene, animationSceneKey, data, onLoadingComplete);
      }
    }]);
    return LoadingAnimationScenePlugin;
  }(Phaser.Plugins.BasePlugin);

  return LoadingAnimationScenePlugin;

}));
