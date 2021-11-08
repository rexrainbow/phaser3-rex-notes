(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexscaleouterplugin = factory());
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

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var WarnCounter = 0;

  var CheckScaleMode = function CheckScaleMode(scene) {
    var scaleManager = scene.scale;

    if (scaleManager.scaleMode !== Phaser.Scale.RESIZE) {
      if (WarnCounter === 0) {
        console.warn('Scale outer only works with RESIZE scale mode');
      }

      WarnCounter++;
      return false;
    }

    return true;
  };

  var GetScaleOutCameraParameters = function GetScaleOutCameraParameters(scene, out) {
    if (out === undefined) {
      out = {};
    }

    var gameConfig = scene.game.config;
    var gameWidth = gameConfig.width,
        gameHeight = gameConfig.height;
    var gameAspectRatio = gameHeight === 0 ? 1 : gameWidth / gameHeight;
    var displaySize = scene.scale.displaySize;
    var displayWidth = displaySize.width,
        displayHeight = displaySize.height;
    var displayAspectRatio = displayHeight === 0 ? 1 : displayWidth / displayHeight;
    out.scrollX = (gameWidth - displayWidth) / 2;
    out.scrollY = (gameHeight - displayHeight) / 2;

    if (gameAspectRatio < displayAspectRatio) {
      out.zoom = displayHeight / gameHeight;
    } else {
      out.zoom = displayWidth / gameWidth;
    }

    return out;
  };

  var Rectangle$1 = Phaser.Geom.Rectangle;

  var GetInnerViewport = function GetInnerViewport(scaleOuter, out) {
    if (out === undefined) {
      out = new Rectangle$1();
    }

    var gameConfig = scaleOuter.scene.game.config;
    var width = gameConfig.width,
        height = gameConfig.height;
    out.setTo(0, 0, width, height);
    return out;
  };

  var Rectangle = Phaser.Geom.Rectangle;

  var GetOuterViewport = function GetOuterViewport(scaleOuter, out) {
    if (out === undefined) {
      out = new Rectangle();
    }

    var scale = scaleOuter.zoom;
    var displaySize = scaleOuter.scene.scale.displaySize;
    out.width = displaySize.width / scale;
    out.height = displaySize.height / scale;
    var gameConfig = scaleOuter.scene.game.config;
    out.centerX = gameConfig.width / 2;
    out.centerY = gameConfig.height / 2;
    return out;
  };

  var SetStruct = Phaser.Structs.Set;

  var ScaleOuter = /*#__PURE__*/function () {
    function ScaleOuter(scene) {
      _classCallCheck(this, ScaleOuter);

      this.scene = scene; // Set gameConfig.scale.mode to Phaser.Scale.RESIZE

      this.cameras = new SetStruct();
      this.scrollX = 0;
      this.scrollY = 0;
      this.zoom = 1;
      this.boot();
    }

    _createClass(ScaleOuter, [{
      key: "boot",
      value: function boot() {
        var scene = this.scene;

        if (CheckScaleMode(scene)) {
          scene.scale.on('resize', this.scale, this);
          scene.events.once('preupdate', this.onFirstTick, this);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.stop();
        this.cameras.clear();
        this.cameras = undefined;
        this.scene = undefined;
      }
    }, {
      key: "stop",
      value: function stop() {
        var scene = this.scene;
        scene.scale.off('resize', this.scale, this);
        scene.events.off('preupdate', this.onFirstTick, this);
        return this;
      }
    }, {
      key: "innerViewport",
      get: function get() {
        return GetInnerViewport(this);
      }
    }, {
      key: "outerViewport",
      get: function get() {
        return GetOuterViewport(this);
      }
    }, {
      key: "add",
      value: function add(camera) {
        this.cameras.set(camera);
        this.scale();
        return this;
      } // Internal methods

    }, {
      key: "onFirstTick",
      value: function onFirstTick() {
        if (this.cameras.size === 0) {
          // Add default camera
          this.add(this.scene.cameras.main);
        }

        this.scale();
      }
    }, {
      key: "scale",
      value: function scale() {
        GetScaleOutCameraParameters(this.scene, this);
        this.cameras.iterate(function (camera, index) {
          camera.zoomX = this.zoom;
          camera.zoomY = this.zoom;
          camera.scrollX = this.scrollX;
          camera.scrollY = this.scrollY;
        }, this);
        return this;
      }
    }]);

    return ScaleOuter;
  }();

  var ScaleOuterPlugin = /*#__PURE__*/function (_Phaser$Plugins$Scene) {
    _inherits(ScaleOuterPlugin, _Phaser$Plugins$Scene);

    var _super = _createSuper(ScaleOuterPlugin);

    function ScaleOuterPlugin(scene, pluginManager) {
      var _this;

      _classCallCheck(this, ScaleOuterPlugin);

      _this = _super.call(this, scene, pluginManager);
      _this.scaleOuter = new ScaleOuter(scene);
      return _this;
    }

    _createClass(ScaleOuterPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scaleOuter.destroy();
        this.scaleOuter = undefined;

        _get(_getPrototypeOf(ScaleOuterPlugin.prototype), "destroy", this).call(this);
      }
    }, {
      key: "add",
      value: function add(camera) {
        this.scaleOuter.add(camera);
        return this;
      }
    }, {
      key: "scale",
      value: function scale() {
        if (this.scaleOuter.cameras.size === 0) {
          // Add default camera
          this.add(this.scene.cameras.main);
        }

        this.scaleOuter.scale();
        return this;
      }
    }, {
      key: "scrollX",
      get: function get() {
        return this.scaleOuter.scrollX;
      }
    }, {
      key: "scrollY",
      get: function get() {
        return this.scaleOuter.scrollY;
      }
    }, {
      key: "zoom",
      get: function get() {
        return this.scaleOuter.zoom;
      }
    }, {
      key: "innerViewport",
      get: function get() {
        return this.scaleOuter.innerViewport;
      }
    }, {
      key: "outerViewport",
      get: function get() {
        return this.scaleOuter.outerViewport;
      }
    }]);

    return ScaleOuterPlugin;
  }(Phaser.Plugins.ScenePlugin);

  return ScaleOuterPlugin;

})));
