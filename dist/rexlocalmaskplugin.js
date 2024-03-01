(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlocalmaskplugin = factory());
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
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
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

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
      }
      this._privateEE = eventEmitter === true || eventEmitter === undefined;
      this._eventEmitter = this._privateEE ? new EventEmitterClass() : eventEmitter;
      return this;
    },
    destroyEventEmitter: function destroyEventEmitter() {
      if (this._eventEmitter && this._privateEE) {
        this._eventEmitter.shutdown();
      }
      return this;
    },
    getEventEmitter: function getEventEmitter() {
      return this._eventEmitter;
    },
    on: function on() {
      if (this._eventEmitter) {
        this._eventEmitter.on.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    once: function once() {
      if (this._eventEmitter) {
        this._eventEmitter.once.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    off: function off() {
      if (this._eventEmitter) {
        this._eventEmitter.off.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    emit: function emit(event) {
      if (this._eventEmitter && event) {
        this._eventEmitter.emit.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    addListener: function addListener() {
      if (this._eventEmitter) {
        this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    removeListener: function removeListener() {
      if (this._eventEmitter) {
        this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    removeAllListeners: function removeAllListeners() {
      if (this._eventEmitter) {
        this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    listenerCount: function listenerCount() {
      if (this._eventEmitter) {
        return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
      }
      return 0;
    },
    listeners: function listeners() {
      if (this._eventEmitter) {
        return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
      }
      return [];
    },
    eventNames: function eventNames() {
      if (this._eventEmitter) {
        return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
      }
      return [];
    }
  };

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetSceneObject = function GetSceneObject(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsSceneObject(object)) {
      // object = scene
      return object;
    } else if (object.scene && IsSceneObject(object.scene)) {
      // object = game object
      return object.scene;
    } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) {
      // parent = bob object
      return object.parent.scene;
    } else {
      return null;
    }
  };

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var GetGame = function GetGame(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsGame(object)) {
      return object;
    } else if (IsGame(object.game)) {
      return object.game;
    } else if (IsSceneObject(object)) {
      // object = scene object
      return object.sys.game;
    } else if (IsSceneObject(object.scene)) {
      // object = game object
      return object.scene.sys.game;
    }
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$1(config, 'eventEmitter', true));

      // Register callback of parent destroy event, also see `shutdown` method
      if (this.parent) {
        if (this.parent === this.scene) {
          // parent is a scene
          this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent === this.game) {
          // parent is game
          this.game.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent.once) {
          // parent is game object or something else
          this.parent.once('destroy', this.onParentDestroy, this);
        }

        // bob object does not have event emitter
      }
    }
    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // parent might not be shutdown yet
        if (this.parent) {
          if (this.parent === this.scene) {
            // parent is a scene
            this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent === this.game) {
            // parent is game
            this.game.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent.once) {
            // parent is game object or something else
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
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onEnvDestroy",
      value: function onEnvDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent; // gameObject, scene, or game

        this.scene = GetSceneObject(parent);
        this.game = GetGame(parent);
        return this;
      }
    }]);
    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var fragShader = "\nprecision mediump float;\nuniform sampler2D uMainSampler;\nuniform sampler2D uMaskSampler;\nvarying vec2 outTexCoord;\n\nvoid main ()\n{\n    vec4 color = texture2D(uMainSampler, outTexCoord);\n    vec4 maskColor = texture2D(uMaskSampler, outTexCoord);\n    gl_FragColor = vec4(color.rgb * maskColor.a, color.a * maskColor.a);\n}\n";

  var ControllerKey$1 = 'localMask';
  var LocalMaskPreFxPipeline = /*#__PURE__*/function (_Phaser$Renderer$WebG) {
    _inherits(LocalMaskPreFxPipeline, _Phaser$Renderer$WebG);
    function LocalMaskPreFxPipeline(game) {
      _classCallCheck(this, LocalMaskPreFxPipeline);
      return _callSuper(this, LocalMaskPreFxPipeline, [{
        game: game,
        fragShader: fragShader
      }]);
    }
    _createClass(LocalMaskPreFxPipeline, [{
      key: "onDraw",
      value: function onDraw(renderTarget) {
        var sprite = this.tempSprite;
        var glTexture = sprite[ControllerKey$1].maskGLTexture;
        this.set1i('uMainSampler', 0);
        this.set1i('uMaskSampler', 1);
        this.bindTexture(glTexture, 1);
        _get(_getPrototypeOf(LocalMaskPreFxPipeline.prototype), "onDraw", this).call(this, renderTarget);
      }
    }], [{
      key: "setControllerKey",
      value: function setControllerKey(key) {
        ControllerKey$1 = key;
      }
    }]);
    return LocalMaskPreFxPipeline;
  }(Phaser.Renderer.WebGL.Pipelines.PreFXPipeline);

  var GetValue = Phaser.Utils.Objects.GetValue;
  var PreFXName = 'RexLocalMaskFx';
  var ControllerKey = 'rexLocalMask';
  var LocalMaskController = /*#__PURE__*/function (_ComponentBase) {
    _inherits(LocalMaskController, _ComponentBase);
    function LocalMaskController(parent, config) {
      var _this;
      _classCallCheck(this, LocalMaskController);
      _this = _callSuper(this, LocalMaskController, [parent, {
        eventEmitter: false
      }]);
      // No event emitter
      // this.parent = gameObject;

      var scene = _this.scene;
      var pipelines = scene.sys.renderer.pipelines;
      var pipeline = pipelines.get(PreFXName);
      if (!pipeline) {
        ControllerKey = GetValue(config, 'controllerKey', ControllerKey);
        LocalMaskPreFxPipeline.setControllerKey(ControllerKey);
        pipeline = pipelines.add(PreFXName, new LocalMaskPreFxPipeline(scene.game));
      }
      _this.pipelineInstance = pipeline;
      _this.textures = scene.sys.textures;
      _this.parent[ControllerKey] = _assertThisInitialized(_this);
      _this.setMaskTexture(GetValue(config, 'key'), GetValue(config, 'frame'));
      _this.setEnable(GetValue(config, 'enable', true));
      return _this;
    }
    _createClass(LocalMaskController, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        this.pipelineInstance = undefined;
        this.textures = undefined;
        this.maskFrame = undefined;
        this.maskGLTexture = undefined;
        _get(_getPrototypeOf(LocalMaskController.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "controllerKey",
      get: function get() {
        return ControllerKey;
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(value) {
        if (value === this._enable) {
          return;
        }
        this._enable = value;
        var gameObject = this.parent;
        var currentPipeline = gameObject.pipeline;
        if (value) {
          // Enable
          if (currentPipeline !== this.pipelineInstance) {
            gameObject.setPipeline(this.pipelineInstance);
          }
        } else {
          // Reset to default
          if (currentPipeline === this.pipelineInstance) {
            gameObject.resetPipeline();
          }
        }
      }
    }, {
      key: "setEnable",
      value: function setEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.enable = enable;
        return this;
      }
    }, {
      key: "setMaskTexture",
      value: function setMaskTexture(key, frame) {
        this.maskKey = key;
        this.maskFrameName = frame;
        this.maskFrame = this.textures.getFrame(key, frame);
        this.maskGLTexture = this.maskFrame.glTexture;
        return this;
      }
    }]);
    return LocalMaskController;
  }(ComponentBase);

  var LocalMaskPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(LocalMaskPlugin, _Phaser$Plugins$BaseP);
    function LocalMaskPlugin(pluginManager) {
      _classCallCheck(this, LocalMaskPlugin);
      return _callSuper(this, LocalMaskPlugin, [pluginManager]);
    }
    _createClass(LocalMaskPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new LocalMaskController(gameObject, config);
      }
    }]);
    return LocalMaskPlugin;
  }(Phaser.Plugins.BasePlugin);

  return LocalMaskPlugin;

}));
