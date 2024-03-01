(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexoutlinepipelineplugin = factory());
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

  // Reference: https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag

  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform vec2 texSize;\nuniform float thickness;\nuniform vec3 outlineColor;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main() {\n  vec4 front = texture2D(uMainSampler, outTexCoord);\n\n  if (thickness > 0.0) {\n    vec2 mag = vec2(thickness/texSize.x, thickness/texSize.y);\n    vec4 curColor;\n    float maxAlpha = front.a;\n    vec2 offset;\n    for (float angle = 0.; angle < DOUBLE_PI; angle += #{angleStep}) {\n        offset = vec2(mag.x * cos(angle), mag.y * sin(angle));        \n        curColor = texture2D(uMainSampler, outTexCoord + offset);\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    vec3 resultColor = front.rgb + (outlineColor.rgb * (1. - front.a)) * maxAlpha;\n    gl_FragColor = vec4(resultColor, maxAlpha);\n  } else {\n    gl_FragColor = front;\n  }\n}\n";
  var MAX_SAMPLES = 100;
  var MIN_SAMPLES = 1;
  var GetFrag = function GetFrag(quality) {
    if (quality === undefined) {
      quality = 0.1;
    }
    var samples = Math.max(quality * MAX_SAMPLES, MIN_SAMPLES);
    var angleStep = (Math.PI * 2 / samples).toFixed(7);
    return frag.replace(/\#\{angleStep\}/, angleStep);
  };

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
  var Color = Phaser.Display.Color;
  var Quality = 0.1;
  var FragSrc = GetFrag(Quality);
  var OutlinePostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(OutlinePostFxPipeline, _PostFXPipeline);
    function OutlinePostFxPipeline(game) {
      var _this;
      _classCallCheck(this, OutlinePostFxPipeline);
      _this = _callSuper(this, OutlinePostFxPipeline, [{
        name: 'rexOutlinePostFx',
        game: game,
        renderTarget: true,
        fragShader: FragSrc
      }]);
      _this.thickness = 0;
      _this._outlineColor = new Color();
      return _this;
    }
    _createClass(OutlinePostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setThickness(GetValue$1(o, 'thickness', 3));
        this.setOutlineColor(GetValue$1(o, 'outlineColor', 0xffffff));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set1f('thickness', this.thickness);
        this.set3f('outlineColor', this._outlineColor.redGL, this._outlineColor.greenGL, this._outlineColor.blueGL);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
      }
    }, {
      key: "setThickness",
      value: function setThickness(value) {
        this.thickness = value;
        return this;
      }
    }, {
      key: "outlineColor",
      get: function get() {
        return this._outlineColor;
      },
      set: function set(value) {
        if (typeof value === 'number') {
          value = IntegerToRGB(value);
        }
        this._outlineColor.setFromRGB(value);
      }
    }, {
      key: "setOutlineColor",
      value: function setOutlineColor(value) {
        this.outlineColor = value;
        return this;
      }
    }], [{
      key: "setQuality",
      value: function setQuality(value) {
        if (Quality === value) {
          return;
        }
        Quality = value;
        FragSrc = GetFrag(value);
      }
    }, {
      key: "getQuality",
      value: function getQuality() {
        return Quality;
      }
    }]);
    return OutlinePostFxPipeline;
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

  var GetValue = Phaser.Utils.Objects.GetValue;
  var OutlinePipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(OutlinePipelinePlugin, _BasePostFxPipelinePl);
    function OutlinePipelinePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, OutlinePipelinePlugin);
      _this = _callSuper(this, OutlinePipelinePlugin, [pluginManager]);
      _this.setPostPipelineClass(OutlinePostFxPipeline, 'rexOutlinePostFx');
      return _this;
    }
    _createClass(OutlinePipelinePlugin, [{
      key: "add",
      value: function add(gameObject, config) {
        this.setQuality(GetValue(config, 'quality', this.quality));
        return _get(_getPrototypeOf(OutlinePipelinePlugin.prototype), "add", this).call(this, gameObject, config);
      }
    }, {
      key: "setQuality",
      value: function setQuality(value) {
        OutlinePostFxPipeline.setQuality(value);
        return this;
      }
    }, {
      key: "quality",
      get: function get() {
        return OutlinePostFxPipeline.getQuality();
      },
      set: function set(value) {
        this.setQuality(value);
      }
    }]);
    return OutlinePipelinePlugin;
  }(BasePostFxPipelinePlugin);
  SetValue(window, 'RexPlugins.Pipelines.OutlinePostFx', OutlinePostFxPipeline);

  return OutlinePipelinePlugin;

}));
