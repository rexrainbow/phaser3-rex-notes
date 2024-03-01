(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexshockwavepipelineplugin = factory());
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

  // reference : https://www.geeks3d.com/20110408/cross-stitching-post-processing-shader-glsl-filter-geexlab-pixel-bender/

  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform vec2 texSize;\nuniform vec2 center;\nuniform float waveRadius;\nuniform float waveHalfWidth; // 10.0\nuniform float powBaseScale; // 0.8\nuniform float powExponent; // 0.1\n\nvoid main (void) {\n  if (waveHalfWidth > 0.0) {\n    vec2 tc = outTexCoord * texSize;\n    tc -= center;\n\n    float diff = length(tc) - waveRadius;\n    if ((diff <= waveHalfWidth) && (diff >= -waveHalfWidth)) {\n      diff /= max(texSize.x, texSize.y);\n      float powDiff = 1.0 - pow(abs(diff*powBaseScale), powExponent);\n      tc += texSize * diff * powDiff;\n    }\n\n    tc += center;\n    gl_FragColor = texture2D(uMainSampler, tc / texSize);\n  } else {\n    gl_FragColor = texture2D(uMainSampler, outTexCoord);\n  }\n}\n";

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue = Phaser.Utils.Objects.GetValue;
  Phaser.Math.Clamp;
  var ShockwavePostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(ShockwavePostFxPipeline, _PostFXPipeline);
    function ShockwavePostFxPipeline(game) {
      var _this;
      _classCallCheck(this, ShockwavePostFxPipeline);
      _this = _callSuper(this, ShockwavePostFxPipeline, [{
        name: 'rexShockwavePostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      }]);
      _this.centerX = 0; // position wo resolution
      _this.centerY = 0; // position wo resolution
      _this.waveWidth = 20;
      _this.powBaseScale = 0.8;
      _this.powExponent = 0.1;
      return _this;
    }
    _createClass(ShockwavePostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        this.setWaveRadius(GetValue(o, 'waveRadius', 0));
        this.setWaveWidth(GetValue(o, 'waveWidth', 20));
        this.setPowBaseScale(GetValue(o, 'powBaseScale', 0.8));
        this.setPowExponent(GetValue(o, 'powExponent', 0.1));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set1f('waveRadius', this.waveRadius);
        this.set1f('waveHalfWidth', this.waveWidth / 2);
        this.set1f('powBaseScale', this.powBaseScale);
        this.set1f('powExponent', this.powExponent);
        var texWidth = this.renderer.width,
          textHeight = this.renderer.height;
        this.set2f('center', this.centerX, textHeight - this.centerY);
        this.set2f('texSize', texWidth, textHeight);
      }

      // center
    }, {
      key: "setCenter",
      value: function setCenter(x, y) {
        if (x === undefined) {
          x = this.renderer.width / 2;
          y = this.renderer.height / 2;
        }
        this.centerX = x;
        this.centerY = y;
        return this;
      }

      // waveRadius
    }, {
      key: "setWaveRadius",
      value: function setWaveRadius(value) {
        if (value === undefined) {
          value = 0;
        }
        this.waveRadius = value;
        return this;
      }

      // waveWidth
    }, {
      key: "setWaveWidth",
      value: function setWaveWidth(value) {
        if (value === undefined) {
          value = 0;
        }
        this.waveWidth = value;
        return this;
      }

      // powBaseScale
    }, {
      key: "setPowBaseScale",
      value: function setPowBaseScale(value) {
        this.powBaseScale = value;
        return this;
      }

      // powExponent
    }, {
      key: "setPowExponent",
      value: function setPowExponent(value) {
        this.powExponent = value;
        return this;
      }
    }]);
    return ShockwavePostFxPipeline;
  }(PostFXPipeline);

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

  var ShockwavePipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(ShockwavePipelinePlugin, _BasePostFxPipelinePl);
    function ShockwavePipelinePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, ShockwavePipelinePlugin);
      _this = _callSuper(this, ShockwavePipelinePlugin, [pluginManager]);
      _this.setPostPipelineClass(ShockwavePostFxPipeline, 'rexShockwavePostFx');
      return _this;
    }
    return _createClass(ShockwavePipelinePlugin);
  }(BasePostFxPipelinePlugin);
  SetValue(window, 'RexPlugins.Pipelines.ShockwavePostFx', ShockwavePostFxPipeline);

  return ShockwavePipelinePlugin;

}));
