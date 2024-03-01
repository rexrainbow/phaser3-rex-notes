(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexwarppipelineplugin = factory());
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

  // reference : https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/

  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform vec2 texSize;\nuniform vec2 amplitude;\nuniform vec2 frequency;\nuniform vec2 speed;\nuniform float time;\n\n\nvoid main (void) {\n  vec2 dxy = frequency/texSize;\n  vec2 r = amplitude/texSize;\n  vec2 spd = speed/texSize;\n  vec2 angle = (outTexCoord / dxy) + (spd*time);\n  vec2 tc = (vec2(cos(angle.x),sin(angle.y)) * r) + outTexCoord;\n  gl_FragColor = texture2D(uMainSampler, tc);\n}\n";

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
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

  var GetTickDelta = function GetTickDelta(game) {
    return GetGame(game).loop.delta;
  };

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var Vector2 = Phaser.Math.Vector2;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var WarpPostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(WarpPostFxPipeline, _PostFXPipeline);
    function WarpPostFxPipeline(game) {
      var _this;
      _classCallCheck(this, WarpPostFxPipeline);
      _this = _callSuper(this, WarpPostFxPipeline, [{
        name: 'rexWarpPostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      }]);
      _this.frequencyX = 10;
      _this.frequencyY = 10;
      _this.amplitudeX = 10;
      _this.amplitudeY = 10;
      _this.speedEnable = false;
      _this.now = 0;
      _this.speed = new Vector2(0, 0);
      return _this;
    }
    _createClass(WarpPostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        var frequency = GetValue(o, 'frequency', 10);
        this.setFrequency(GetValue(o, 'frequencyX', frequency), GetValue(o, 'frequencyY', frequency));
        var amplitude = GetValue(o, 'amplitude', 10);
        this.setAmplitude(GetValue(o, 'amplitudeX', amplitude), GetValue(o, 'amplitudeY', amplitude));
        var speed = GetValue(o, 'speed', 0);
        this.setSpeed(GetValue(o, 'speedX', speed), GetValue(o, 'speedY', speed));
        this.setSpeedEnable(GetValue(o, 'speedEnable', this.speedX !== 0 || this.speedY !== 0));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        if (this.speedEnable) {
          this.now += GetTickDelta(this.game);
        }
        this.set2f('frequency', this.frequencyX, this.frequencyY);
        this.set2f('amplitude', this.amplitudeX, this.amplitudeY);
        this.set2f('speed', this.speed.x, this.speed.y);
        this.set1f('time', this.now);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
      }

      // frequencyX
    }, {
      key: "setFrequencyX",
      value: function setFrequencyX(value) {
        this.frequencyX = value;
        return this;
      }

      // frequencyY
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
      }

      // amplitudeX
    }, {
      key: "setAmplitudeX",
      value: function setAmplitudeX(value) {
        this.amplitudeX = value;
        return this;
      }

      // amplitudeY
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
      }

      // speed
    }, {
      key: "setSpeedX",
      value: function setSpeedX(value) {
        this.speedX = value;
        return this;
      }
    }, {
      key: "setSpeedY",
      value: function setSpeedY(value) {
        this.speed.y = value;
        return this;
      }
    }, {
      key: "speedX",
      get: function get() {
        return this.speed.x;
      },
      set: function set(value) {
        this.speed.x = value;
      }
    }, {
      key: "speedY",
      get: function get() {
        return this.speed.y;
      },
      set: function set(value) {
        this.speed.y = value;
      }
    }, {
      key: "setSpeed",
      value: function setSpeed(x, y) {
        if (y === undefined) {
          y = x;
        }
        this.speedX = x;
        this.speedY = y;
        return this;
      }

      // Speed enable
    }, {
      key: "setSpeedEnable",
      value: function setSpeedEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.speedEnable = enable;
        return this;
      }
    }]);
    return WarpPostFxPipeline;
  }(PostFXPipeline);

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
    function BasePostFxPipelinePlugin() {
      _classCallCheck(this, BasePostFxPipelinePlugin);
      return _callSuper(this, BasePostFxPipelinePlugin, arguments);
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
    }

    // no object
    if (_typeof(target) !== 'object') {
      return;
    }

    // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      }
      // set target to another object
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
    function WarpPipelinePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, WarpPipelinePlugin);
      _this = _callSuper(this, WarpPipelinePlugin, [pluginManager]);
      _this.setPostPipelineClass(WarpPostFxPipeline, 'rexWarpPostFx');
      return _this;
    }
    return _createClass(WarpPipelinePlugin);
  }(BasePostFxPipelinePlugin);
  SetValue(window, 'RexPlugins.Pipelines.WarpPostFx', WarpPostFxPipeline);

  return WarpPipelinePlugin;

}));
