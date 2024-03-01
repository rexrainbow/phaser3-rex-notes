(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextoonifypipelineplugin = factory());
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

  var frag$4 = "vec3 RGBToHSV(vec3 color) {\n  float minv, maxv, delta;\n  vec3 res;\n  minv = min(min(color.r, color.g), color.b);\n  maxv = max(max(color.r, color.g), color.b);\n  res.z = maxv;            // v\n\n  delta = maxv - minv;\n  if( maxv != 0.0 ) {\n    res.y = delta / maxv;      // s\n  } else {\n    // s = 0, v is undefined\n    res.y = 0.0;\n    res.x = -1.0;\n    return res;\n  }\n\n  if( color.r == maxv ) {\n    res.x = ( color.g - color.b ) / delta;      // between yellow & magenta\n  } else if( color.g == maxv ) {\n    res.x = 2.0 + ( color.b - color.r ) / delta;   // between cyan & yellow\n  } else {\n    res.x = 4.0 + ( color.r - color.g ) / delta;   // between magenta & cyan\n  }\n\n  res.x = res.x * 60.0;            // degrees\n  if( res.x < 0.0 ) {\n    res.x = res.x + 360.0;\n  }\n   \n  return res;\n}\n";

  var frag$3 = "vec3 HSVToRGB(float h, float s, float v) {\n  int i;\n  float f, p, q, t;\n  vec3 res;\n  if( s == 0.0 ) {\n    // achromatic (grey)\n    res.x = v;\n    res.y = v;\n    res.z = v;\n    return res;\n  }\n\n  h /= 60.0;         // sector 0 to 5\n  i = int(floor( h ));\n  f = h - float(i);         // factorial part of h\n  p = v * ( 1.0 - s );\n  q = v * ( 1.0 - s * f );\n  t = v * ( 1.0 - s * ( 1.0 - f ) );  \n  if (i == 0) {\n    res.x = v;\n    res.y = t;\n    res.z = p;\n  } else if (i == 1) {\n    res.x = q;\n    res.y = v;\n    res.z = p;\n  } else if (i == 2) {\n    res.x = p;\n    res.y = v;\n    res.z = t;\n  } else if (i == 3) {\n    res.x = p;\n    res.y = q;\n    res.z = v;\n  } else if (i == 4) {\n    res.x = t;\n    res.y = p;\n    res.z = v;\n  } else { // i == 5\n    res.x = v;\n    res.y = p;\n    res.z = q;\n  }\n  return res;\n}\n";

  var frag$2 = "float AvgRGB(vec4 color) {\n  return (color.r + color.g + color.b)/3.0;\n}\n";

  var frag$1 = frag$2 + "#define EDGEGAIN 5.0\nbool IsEdge(vec2 coords, vec2 texSize, float threshold) {\n  if (threshold > 1.0) {\n    return false;\n  }\n\n  vec2 tc = coords * texSize;\n  \n  float pixel[9];\n  int k = 0;\n  float delta;\n\n  // read neighboring pixel intensities\n  pixel[0] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float(-1), float(-1))) / texSize )  );\n  pixel[1] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float(-1), float( 0))) / texSize )  );\n  pixel[2] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float(-1), float( 1))) / texSize )  );\n  pixel[3] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 0), float(-1))) / texSize )  );\n  pixel[4] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 0), float( 0))) / texSize )  );\n  pixel[5] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 0), float( 1))) / texSize )  );\n  pixel[6] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 1), float(-1))) / texSize )  );\n  pixel[7] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 1), float( 0))) / texSize )  );\n  pixel[8] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 1), float( 1))) / texSize )  );\n\n  // average color differences around neighboring pixels\n  delta = (abs(pixel[1]-pixel[7])+\n           abs(pixel[5]-pixel[3]) +\n           abs(pixel[0]-pixel[8])+\n           abs(pixel[2]-pixel[6])\n           )/4.0;\n\n  return (clamp(delta*EDGEGAIN, 0.0, 1.0) >= threshold);\n}\n";

  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\nuniform vec2 texSize;\n\n// Effect parameters\nuniform float edgeThreshold; // 0.2;\nuniform float hStep;  // 60\nuniform float sStep;  // 0.15\nuniform float vStep;  // 0.33\nuniform vec3 edgeColor; // (0, 0, 0);\n" + frag$4 + frag$1 + frag$3 + "\nvoid main() {\n  vec4 front = texture2D(uMainSampler, outTexCoord);  \n  vec3 colorLevel;\n  if ((hStep > 0.0) || (sStep > 0.0) || (vStep > 0.0)) {\n    vec3 colorHsv = RGBToHSV(front.rgb);  \n    if (hStep > 0.0) {\n      colorHsv.x = min(floor((colorHsv.x / hStep) + 0.5) * hStep, 360.0);\n    }\n    if (sStep > 0.0) {\n      colorHsv.y = min(floor((colorHsv.y / sStep) + 0.5) * sStep, 1.0);\n    }\n    if (vStep > 0.0) {\n      colorHsv.z = min(floor((colorHsv.z / vStep) + 0.5) * vStep, 1.0);\n    }\n    colorLevel = HSVToRGB(colorHsv.x, colorHsv.y, colorHsv.z);\n  } else {\n    colorLevel = front.rgb;\n  }\n\n  vec3 outColor = (IsEdge(outTexCoord, texSize, edgeThreshold))? edgeColor : colorLevel;\n  gl_FragColor = vec4(outColor, front.a);\n}\n";

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
  var Color = Phaser.Display.Color;
  var ToonifyPostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(ToonifyPostFxPipeline, _PostFXPipeline);
    function ToonifyPostFxPipeline(game) {
      var _this;
      _classCallCheck(this, ToonifyPostFxPipeline);
      _this = _callSuper(this, ToonifyPostFxPipeline, [{
        name: 'rexToonifyPostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      }]);
      _this.edgeThreshold = 0;
      _this.hueLevels = 0;
      _this._satLevels = 0;
      _this._valLevels = 0;
      _this._edgeColor = new Color();
      return _this;
    }
    _createClass(ToonifyPostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEdgeThreshold(GetValue(o, 'edgeThreshold', 0.2));
        this.setHueLevels(GetValue(o, 'hueLevels', 0));
        this.setSatLevels(GetValue(o, 'satLevels', 0));
        this.setValLevels(GetValue(o, 'valLevels', 0));
        this.setEdgeColor(GetValue(o, 'edgeColor', 0));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set1f('edgeThreshold', this.edgeThreshold);
        this.set1f('hStep', this.hueStep);
        this.set1f('sStep', this.satStep);
        this.set1f('vStep', this.valStep);
        this.set3f('edgeColor', this._edgeColor.redGL, this._edgeColor.greenGL, this._edgeColor.blueGL);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
      }

      // edgeThreshold
    }, {
      key: "setEdgeThreshold",
      value: function setEdgeThreshold(value) {
        this.edgeThreshold = value;
        return this;
      }

      // hueLevels
    }, {
      key: "setHueLevels",
      value: function setHueLevels(value) {
        this.hueLevels = value;
        return this;
      }
    }, {
      key: "hueStep",
      get: function get() {
        if (this.hueLevels > 0) {
          return 360 / this.hueLevels;
        } else {
          return 0;
        }
      }

      // satLevels
    }, {
      key: "satLevels",
      get: function get() {
        return this._satLevels;
      },
      set: function set(value) {
        this._satLevels = value;
      }
    }, {
      key: "setSatLevels",
      value: function setSatLevels(value) {
        this.satLevels = value;
        return this;
      }
    }, {
      key: "satStep",
      get: function get() {
        if (this._satLevels > 0) {
          return 1 / this._satLevels;
        } else {
          return 0;
        }
      }

      // valLevels
    }, {
      key: "valLevels",
      get: function get() {
        return this._valLevels;
      },
      set: function set(value) {
        this._valLevels = value;
      }
    }, {
      key: "setValLevels",
      value: function setValLevels(value) {
        this.valLevels = value;
        return this;
      }
    }, {
      key: "valStep",
      get: function get() {
        if (this._valLevels > 0) {
          return 1 / this._valLevels;
        } else {
          return 0;
        }
      }

      // edgeColor
    }, {
      key: "edgeColor",
      get: function get() {
        return this._edgeColor;
      },
      set: function set(value) {
        if (typeof value === 'number') {
          value = IntegerToRGB(value);
        }
        this._edgeColor.setFromRGB(value);
      }
    }, {
      key: "setEdgeColor",
      value: function setEdgeColor(value) {
        this.edgeColor = value;
        return this;
      }
    }]);
    return ToonifyPostFxPipeline;
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

  var ToonifyPipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(ToonifyPipelinePlugin, _BasePostFxPipelinePl);
    function ToonifyPipelinePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, ToonifyPipelinePlugin);
      _this = _callSuper(this, ToonifyPipelinePlugin, [pluginManager]);
      _this.setPostPipelineClass(ToonifyPostFxPipeline, 'rexToonifyPostFx');
      return _this;
    }
    return _createClass(ToonifyPipelinePlugin);
  }(BasePostFxPipelinePlugin);
  SetValue(window, 'RexPlugins.Pipelines.ToonifyPostFx', ToonifyPostFxPipeline);

  return ToonifyPipelinePlugin;

}));
