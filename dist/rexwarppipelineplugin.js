(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexwarppipelineplugin = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  // reference : https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/
  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform vec2 texSize;\nuniform vec2 amplitude;\nuniform vec2 frequency;\nuniform vec2 progress;\n\n\nvoid main (void) {\n  vec2 dxy = frequency/texSize;\n  vec2 r = amplitude/texSize;\n  vec2 angle = (outTexCoord / dxy) + progress;\n  vec2 tc = (vec2(cos(angle.x),sin(angle.y)) * r) + outTexCoord;\n  gl_FragColor = texture2D(uMainSampler, tc);\n}\n";

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var PI2 = Math.PI * 2;

  var WarpPostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(WarpPostFxPipeline, _PostFXPipeline);

    var _super = _createSuper(WarpPostFxPipeline);

    function WarpPostFxPipeline(game) {
      var _this;

      _classCallCheck(this, WarpPostFxPipeline);

      _this = _super.call(this, {
        name: 'rexWarpPostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      });
      _this.frequencyX = 10;
      _this.frequencyY = 10;
      _this.amplitudeX = 10;
      _this.amplitudeY = 10;
      _this.progressX = 0;
      _this.progressY = 0;
      return _this;
    }

    _createClass(WarpPostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        var frequency = GetValue$1(o, 'frequency', 10);
        this.setFrequency(GetValue$1(o, 'frequencyX', frequency), GetValue$1(o, 'frequencyY', frequency));
        var amplitude = GetValue$1(o, 'amplitude', 10);
        this.setAmplitude(GetValue$1(o, 'amplitudeX', amplitude), GetValue$1(o, 'amplitudeY', amplitude));
        var progress = GetValue$1(o, 'progress', 0);
        this.setProgress(GetValue$1(o, 'progressX', progress), GetValue$1(o, 'progressY', progress));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set2f('frequency', this.frequencyX, this.frequencyY);
        this.set2f('amplitude', this.amplitudeX, this.amplitudeY);
        this.set2f('progress', this.progressX * PI2, this.progressY * PI2);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
      } // frequencyX

    }, {
      key: "setFrequencyX",
      value: function setFrequencyX(value) {
        this.frequencyX = value;
        return this;
      } // frequencyY

    }, {
      key: "setFrequencyY",
      value: function setFrequencyY(value) {
        this.frequencyY = value;
        return this;
      }
    }, {
      key: "setFrequency",
      value: function setFrequency(width, height) {
        if (height === undefined) {
          height = width;
        }

        this.frequencyX = width;
        this.frequencyY = height;
        return this;
      }
    }, {
      key: "frequency",
      get: function get() {
        return (this.frequencyX + this.frequencyY) / 2;
      },
      set: function set(value) {
        this.frequencyX = value;
        this.frequencyY = value;
      } // amplitudeX

    }, {
      key: "setAmplitudeX",
      value: function setAmplitudeX(value) {
        this.amplitudeX = value;
        return this;
      } // amplitudeY

    }, {
      key: "setAmplitudeY",
      value: function setAmplitudeY(value) {
        this.amplitudeY = value;
        return this;
      }
    }, {
      key: "setAmplitude",
      value: function setAmplitude(x, y) {
        if (y === undefined) {
          y = x;
        }

        this.amplitudeX = x;
        this.amplitudeY = y;
        return this;
      }
    }, {
      key: "amplitude",
      get: function get() {
        return (this.amplitudeX + this.amplitudeY) / 2;
      },
      set: function set(value) {
        this.amplitudeX = value;
        this.amplitudeY = value;
      } // progress

    }, {
      key: "setProgressX",
      value: function setProgressX(value) {
        this.progressX = value;
        return this;
      }
    }, {
      key: "setProgressY",
      value: function setProgressY(value) {
        this.progressY = value;
        return this;
      }
    }, {
      key: "setProgress",
      value: function setProgress(x, y) {
        if (y === undefined) {
          y = x;
        }

        this.progressX = x;
        this.progressY = y;
        return this;
      }
    }, {
      key: "progress",
      get: function get() {
        return (this.progressX + this.progressY) / 2;
      },
      set: function set(value) {
        this.progressX = value;
        this.progressY = value;
      }
    }]);

    return WarpPostFxPipeline;
  }(PostFXPipeline);

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
    }
  };

  var GetValue = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

      if (this.parent && this.parent === this.scene) {
        // parent is a scene
        this.scene.sys.events.once('shutdown', this.onSceneDestroy, this);
      } else if (this.parent && this.parent.once) {
        // bob object does not have event emitter
        this.parent.once('destroy', this.onParentDestroy, this);
      }
    }

    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // parent might not be shutdown yet


        if (this.parent && this.parent === this.scene) {
          // parent is a scene
          this.scene.sys.events.off('shutdown', this.onSceneDestroy, this);
        } else if (this.parent && this.parent.once) {
          // bob object does not have event emitter
          this.parent.off('destroy', this.onParentDestroy, this);
        }

        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onSceneDestroy",
      value: function onSceneDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }]);

    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var RemoveIte = Phaser.Utils.Array.Remove;

  var PostFxPipelineControllerBase = /*#__PURE__*/function (_ComponentBase) {
    _inherits(PostFxPipelineControllerBase, _ComponentBase);

    var _super = _createSuper(PostFxPipelineControllerBase);

    function PostFxPipelineControllerBase(gameObject, config) {
      var _this;

      _classCallCheck(this, PostFxPipelineControllerBase);

      _this = _super.call(this, gameObject, {
        eventEmitter: false
      }); // No event emitter
      // this.parent = gameObject;
      // this.scene

      if (config !== false) {
        _this.getPipeline(config);
      }

      return _this;
    }

    _createClass(PostFxPipelineControllerBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.freePipeline();

        _get(_getPrototypeOf(PostFxPipelineControllerBase.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "getPipeline",
      value: function getPipeline(config) {
        if (!this.pipeline) {
          var pipeline = this.createPipeline(this.scene.game);
          var gameObject = this.parent;
          var postPipelines = gameObject.postPipelines;
          pipeline.gameObject = gameObject;
          postPipelines.push(pipeline);
          gameObject.hasPostPipeline = postPipelines.length > 0;
          this.pipeline = pipeline;
        }

        if (config) {
          this.pipeline.resetFromJSON(config);
        }

        return this.pipeline;
      }
    }, {
      key: "freePipeline",
      value: function freePipeline() {
        if (!this.pipeline) {
          return this;
        }

        var gameObject = this.parent;
        var postPipelines = gameObject.postPipelines;
        RemoveIte(postPipelines, this.pipeline);
        gameObject.hasPostPipeline = postPipelines.length > 0;
        this.pipeline.destroy();
        this.pipeline = undefined;
        return this;
      } // Override

    }, {
      key: "createPipeline",
      value: function createPipeline(game) {}
    }]);

    return PostFxPipelineControllerBase;
  }(ComponentBase);

  var WarpPostFxPipelineBehavior = /*#__PURE__*/function (_BasePostFxPipelineBe) {
    _inherits(WarpPostFxPipelineBehavior, _BasePostFxPipelineBe);

    var _super = _createSuper(WarpPostFxPipelineBehavior);

    function WarpPostFxPipelineBehavior() {
      _classCallCheck(this, WarpPostFxPipelineBehavior);

      return _super.apply(this, arguments);
    }

    _createClass(WarpPostFxPipelineBehavior, [{
      key: "createPipeline",
      value: function createPipeline(game) {
        return new WarpPostFxPipeline(game);
      }
    }]);

    return WarpPostFxPipelineBehavior;
  }(PostFxPipelineControllerBase);

  var GameClass = Phaser.Game;

  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var GetGame = function GetGame(object) {
    if (IsGame(object)) {
      return object;
    } else if (IsSceneObject(object)) {
      return object.game;
    } else if (object.scene && IsSceneObject(object.scene)) {
      // object = game object
      return object.scene.game;
    }
  };

  var RegisterPostPipeline = function RegisterPostPipeline(game, postFxPipelineName, PostFxPipelineClass) {
    GetGame(game).renderer.pipelines.addPostPipeline(postFxPipelineName, PostFxPipelineClass);
  };

  var AddPostFxPipelineInstance = function AddPostFxPipelineInstance(gameObject, PostFxPipelineClass, config) {
    if (config === undefined) {
      config = {};
    }

    gameObject.setPostPipeline(PostFxPipelineClass);
    var pipeline = gameObject.postPipelines[gameObject.postPipelines.length - 1];
    pipeline.resetFromJSON(config);

    if (config.name) {
      pipeline.name = config.name;
    }

    return pipeline;
  };

  var SpliceOne = Phaser.Utils.Array.SpliceOne;

  var RemovePostFxPipelineInstance = function RemovePostFxPipelineInstance(gameObject, PostFxPipelineClass, name) {
    if (name === undefined) {
      var pipelines = gameObject.postPipelines;

      for (var i = pipelines.length - 1; i >= 0; i--) {
        var instance = pipelines[i];

        if (instance instanceof PostFxPipelineClass) {
          instance.destroy();
          SpliceOne(pipelines, i);
        }
      }
    } else {
      var pipelines = gameObject.postPipelines;

      for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
        var instance = pipelines[i];

        if (instance instanceof PostFxPipelineClass && instance.name === name) {
          instance.destroy();
          SpliceOne(pipelines, i);
        }
      }
    }
  };

  var GetPostFxPipelineInstance = function GetPostFxPipelineInstance(gameObject, PostFxPipelineClass, name) {
    if (name === undefined) {
      var result = [];
      var pipelines = gameObject.postPipelines;

      for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
        var instance = pipelines[i];

        if (instance instanceof PostFxPipelineClass) {
          result.push(instance);
        }
      }

      return result;
    } else {
      var pipelines = gameObject.postPipelines;

      for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
        var instance = pipelines[i];

        if (instance instanceof PostFxPipelineClass && instance.name === name) {
          return instance;
        }
      }
    }
  };

  var BasePostFxPipelinePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(BasePostFxPipelinePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(BasePostFxPipelinePlugin);

    function BasePostFxPipelinePlugin() {
      _classCallCheck(this, BasePostFxPipelinePlugin);

      return _super.apply(this, arguments);
    }

    _createClass(BasePostFxPipelinePlugin, [{
      key: "setPostPipelineClass",
      value: function setPostPipelineClass(PostFxPipelineClass, postFxPipelineName) {
        this.PostFxPipelineClass = PostFxPipelineClass;
        this.postFxPipelineName = postFxPipelineName;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
        RegisterPostPipeline(this.game, this.postFxPipelineName, this.PostFxPipelineClass);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return AddPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, config);
      }
    }, {
      key: "remove",
      value: function remove(gameObject, name) {
        RemovePostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
        return this;
      }
    }, {
      key: "get",
      value: function get(gameObject, name) {
        return GetPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
      }
    }]);

    return BasePostFxPipelinePlugin;
  }(Phaser.Plugins.BasePlugin);

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

  var SetValue = function SetValue(target, keys, value, delimiter) {
    if (delimiter === undefined) {
      delimiter = '.';
    } // no object


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
        keys = keys.split(delimiter);
      }

      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }

    return target;
  };

  var WarpPipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(WarpPipelinePlugin, _BasePostFxPipelinePl);

    var _super = _createSuper(WarpPipelinePlugin);

    function WarpPipelinePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, WarpPipelinePlugin);

      _this = _super.call(this, pluginManager);

      _this.setPostPipelineClass(WarpPostFxPipeline, 'rexWarpPostFx');

      return _this;
    }

    _createClass(WarpPipelinePlugin, [{
      key: "addBehavior",
      value: function addBehavior(gameObject, config) {
        return new WarpPostFxPipelineBehavior(gameObject, config);
      }
    }]);

    return WarpPipelinePlugin;
  }(BasePostFxPipelinePlugin);

  SetValue(window, 'RexPlugins.Pipelines.WarpPostFx', WarpPostFxPipeline);

  return WarpPipelinePlugin;

}));
