(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexscaleouterplugin = factory());
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

  var WarnCounter = 0;
  var CheckScaleMode = function CheckScaleMode(scene) {
    var scaleManager = scene.sys.scale;
    if (scaleManager.scaleMode === Phaser.Scale.RESIZE) {
      return true;
    }

    // Not RESIZE mode
    if (WarnCounter === 0) {
      console.warn('Scale outer only works with RESIZE scale mode');
    }
    WarnCounter++;
    return false;
  };

  var GetScaleOutCameraParameters = function GetScaleOutCameraParameters(scene, out) {
    if (out === undefined) {
      out = {};
    }
    var gameConfig = scene.game.config;
    var gameWidth = gameConfig.width,
      gameHeight = gameConfig.height;
    var gameAspectRatio = gameHeight === 0 ? 1 : gameWidth / gameHeight;
    var displaySize = scene.sys.scale.displaySize;
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

  var Rectangle$2 = Phaser.Geom.Rectangle;
  var GetInnerViewport = function GetInnerViewport(scaleOuter, out) {
    if (out === undefined) {
      out = new Rectangle$2();
    }
    var gameConfig = scaleOuter.scene.game.config;
    var width = gameConfig.width,
      height = gameConfig.height;
    out.setTo(0, 0, width, height);
    return out;
  };

  var Rectangle$1 = Phaser.Geom.Rectangle;
  var GetOuterViewport = function GetOuterViewport(scaleOuter, out) {
    if (out === undefined) {
      out = new Rectangle$1();
    }
    var scale = 1 / scaleOuter.zoom;
    var displaySize = scaleOuter.scene.sys.scale.displaySize;
    out.width = displaySize.width * scale;
    out.height = displaySize.height * scale;
    var gameConfig = scaleOuter.scene.game.config;
    out.centerX = gameConfig.width / 2;
    out.centerY = gameConfig.height / 2;
    return out;
  };

  var ShrinkSizeByRatio = function ShrinkSizeByRatio(rectangle, maxRatio, minRatio) {
    var width = rectangle.width,
      height = rectangle.height,
      ratio = width / height;
    if (maxRatio !== undefined && ratio > maxRatio) {
      rectangle.width = height * maxRatio; // Shrink width
    }
    if (minRatio !== undefined && ratio < minRatio) {
      rectangle.height = width / minRatio; // Shrink height
    }
    return rectangle;
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var CopyRectangle = Phaser.Geom.Rectangle.CopyFrom;
  var SetStruct = Phaser.Structs.Set;
  var ScaleOuter = /*#__PURE__*/function () {
    function ScaleOuter(scene) {
      _classCallCheck(this, ScaleOuter);
      this.scene = scene;
      // Set gameConfig.scale.mode to Phaser.Scale.RESIZE

      this.cameras = new SetStruct();
      this.scrollX = 0;
      this.scrollY = 0;
      this.zoom = 1;
      this._innerViewport = undefined;
      this._outerViewport = undefined;
      this._shrinkOuterViewport = undefined;
      this.boot();
    }
    _createClass(ScaleOuter, [{
      key: "boot",
      value: function boot() {
        var scene = this.scene;
        if (CheckScaleMode(scene)) {
          scene.sys.scale.on('resize', this.scale, this);
          scene.sys.game.events.once('prestep', this.start, this);
        }
        scene.sys.events.on('shutdown', function () {
          // cameras of this scene will be destroyed when scene shutdown
          this.cameras.clear();
        }, this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.stop();
        this.cameras.clear();
        this.cameras = undefined;
        this.scene = undefined;
        this._innerViewport = undefined;
        this._outerViewport = undefined;
        this._shrinkOuterViewport = undefined;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.cameras.size === 0) {
          // Add default camera
          this.add(this.scene.sys.cameras.main);
        }
        this.scale();
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        var scene = this.scene;
        scene.sys.scale.off('resize', this.scale, this);
        scene.sys.game.events.off('prestep', this.start, this);
        return this;
      }
    }, {
      key: "add",
      value: function add(camera) {
        this.cameras.set(camera);
        this.scale();
        return this;
      }
    }, {
      key: "innerViewport",
      get: function get() {
        return this._innerViewport;
      }
    }, {
      key: "outerViewport",
      get: function get() {
        return this._outerViewport;
      }
    }, {
      key: "getShrinkedOuterViewport",
      value: function getShrinkedOuterViewport(maxRatio, minRatio, out) {
        if (typeof minRatio !== 'number') {
          out = minRatio;
          minRatio = undefined;
        }
        if (out === undefined) {
          out = new Rectangle();
        } else if (out === true) {
          if (this._shrinkOuterViewport === undefined) {
            this._shrinkOuterViewport = new Rectangle();
          }
          out = this._shrinkOuterViewport;
        }
        CopyRectangle(this._outerViewport, out);
        ShrinkSizeByRatio(out, maxRatio, minRatio);
        out.centerX = this._outerViewport.centerX;
        out.centerY = this._outerViewport.centerY;
        return out;
      }

      // Internal methods
    }, {
      key: "onFirstTick",
      value: function onFirstTick() {
        if (this.cameras.size === 0) {
          // Add default camera
          this.add(this.scene.sys.cameras.main);
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
        this._innerViewport = GetInnerViewport(this, this._innerViewport);
        this._outerViewport = GetOuterViewport(this, this._outerViewport);
        return this;
      }
    }]);
    return ScaleOuter;
  }();

  var ScaleOuterPlugin = /*#__PURE__*/function (_Phaser$Plugins$Scene) {
    _inherits(ScaleOuterPlugin, _Phaser$Plugins$Scene);
    function ScaleOuterPlugin(scene, pluginManager) {
      var _this;
      _classCallCheck(this, ScaleOuterPlugin);
      _this = _callSuper(this, ScaleOuterPlugin, [scene, pluginManager]);
      _this.scaleOuter = new ScaleOuter(scene);
      return _this;
    }
    _createClass(ScaleOuterPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.scene.sys.events;
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
          this.add(this.scene.sys.cameras.main);
        }
        this.scaleOuter.scale();
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.scaleOuter.stop();
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
    }, {
      key: "getShrinkedOuterViewport",
      value: function getShrinkedOuterViewport(maxRatio, minRatio, out) {
        return this.scaleOuter.getShrinkedOuterViewport(maxRatio, minRatio, out);
      }
    }]);
    return ScaleOuterPlugin;
  }(Phaser.Plugins.ScenePlugin);

  return ScaleOuterPlugin;

}));
