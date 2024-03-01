(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhorrifipipelineplugin = factory());
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

  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\nuniform float time;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\n#define SAMPLES 32.\n\n// Bloom\nuniform float bloomEnable;\nuniform vec3 bloom;\nuniform vec2 bloomTexel;\n\n// Chromatic abberation\nuniform float chromaticEnable;\nuniform float chabIntensity;\n\n// Vignette\nuniform float vignetteEnable;\nuniform vec2 vignette;\n\n// Noise\nuniform float noiseEnable;\nuniform float noiseStrength;\nuniform float noiseSeed;\n\n// VHS\nuniform float vhsEnable;\nuniform float vhsStrength;\n\n// Scanlines\nuniform float scanlinesEnable;\nuniform float scanStrength;\n\n// CRT\nuniform float crtEnable;\nuniform vec2 crtSize;\n\n\n// Noise\nfloat noise(vec2 uv) {\n  return fract(sin(uv.x*12.9898+uv.y*78.233)*437.585453*noiseSeed);\n}\n\n// VHS\nvec4 vhs(vec2 uv) {\n  vec2 tcoord = uv;\n  tcoord.x += sin(time*noise(uv));\n  return texture2D( uMainSampler, tcoord)*vhsStrength;\t\n}\n\n// Vignette\nfloat vig(vec2 uv) {\n  uv *= 1. - uv;\n  return ( pow(uv.x*uv.y*vignette.x*10.,vignette.y) );\n}\n\n// Chromatic abberation\nvec3 chromatic(vec2 uv, float offset) {\n  float r = texture2D( uMainSampler, vec2(uv.x+offset, uv.y)).r;\n  float g = texture2D( uMainSampler, uv).g;\n  float b = texture2D( uMainSampler, vec2(uv.x-offset, uv.y)).b;\n  return vec3(r,g,b);\n}\n\n// Bloom\nvec4 blur(vec2 uv) {\n  float total = 0.;\n  float rad = 1.;\n  mat2 ang = mat2(.73736882209777832,-.67549037933349609,.67549037933349609,.73736882209777832);\n  vec2 point = normalize(fract(cos(uv*mat2(195,174,286,183))*742.)-.5)*(bloom.x/sqrt(SAMPLES));\n  vec4 amount = vec4(0);\n\t\n  for ( float i=0.; i<SAMPLES; i++ ) {\n    point*=ang;\n    rad+=1./rad;\n    vec4 samp = texture2D(uMainSampler, uv + point * (rad-1.) * bloomTexel);\n    \n    float mul = 1.;\n    float lum = ( samp.r+samp.g+samp.b )/3.;\n    if ( lum < bloom.z ){ mul = 0.; }\n    \n    amount += samp*(1./rad)*mul;\n    total+=(1./rad);\n  }\n  amount /= total;\n  return amount*bloom.y;\n}\n\n// TV Curve\nvec2 crtCurve( vec2 uv ) {\n  uv = uv*2.-1.;\n  vec2 uvoff = abs(uv.xy) / crtSize;\n  uv = uv + uv * uvoff * uvoff;\n  uv = uv * .5 + .5;\n  return uv;\n}\n\nvoid main() {\t\n  vec2 mainUv = outTexCoord;\n\n  // CRT\n  if ( crtEnable > .5 ) {\n    mainUv = crtCurve(outTexCoord);\n  }\n\t\n  // Base coloring\n  vec4 color = texture2D( uMainSampler, mainUv);\n\t\n  // Chromatic abberation\n  if ( chromaticEnable > .5 ) {\n    color.rgb *= chromatic(mainUv, chabIntensity * 0.01);\n  }\n\t\n  // Scanlines\n  if ( scanlinesEnable > .5 ) {\n    color.rgb *= (1.-scanStrength)+(sin(mainUv.y*1024.)*scanStrength);\n  }\n\n  // Bloom\n  if ( bloomEnable > .5 ) {\n    color.rgb += blur(mainUv).rgb;\n  }\n\t\n  // Noise\n  if ( noiseEnable > .5 ) {\n    color.rgb += noise(mainUv)*noiseStrength;\n  }\n\t\n  // VHS\n  if ( vhsEnable > .5 ) {\n    color += vhs(mainUv);\n  }\n\t\n  // Vignette\n  if ( vignetteEnable > .5) {\n    color.rgb *= vig(mainUv);\n  }\n\t\n  // Cutoff edges\n  if ( crtEnable > .5) {\n    if ( (mainUv.x < 0.)|| (mainUv.y < 0.) || (mainUv.x > 1.)|| (mainUv.y > 1.) ) {\n      color.rgb *= 0.;\n    }\n  }\n\t\n  gl_FragColor = color;\n}\n";

  var SetEnable = function SetEnable(enable) {
    if (enable === undefined) {
      enable = true;
    }
    this.bloomEnable = enable;
    this.chromaticEnable = enable;
    this.vignetteEnable = enable;
    this.noiseEnable = enable;
    this.vhsEnable = enable;
    this.scanlinesEnable = enable;
    this.crtEnable = enable;
    return this;
  };

  var BloonConfigurationMethods = {
    setBloomEnable: function setBloomEnable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.bloomEnable = enable;
      return this;
    },
    setBloomRadius: function setBloomRadius(value) {
      this.bloomRadius = value;
      return this;
    },
    setBloomIntensity: function setBloomIntensity(value) {
      this.bloomIntensity = value;
      return this;
    },
    setBloomThreshold: function setBloomThreshold(value) {
      this.bloomThreshold = value;
      return this;
    },
    setBloomTexelSize: function setBloomTexelSize(width, height) {
      if (height === undefined) {
        height = width;
      }
      this.bloomTexelWidth = width;
      this.bloomTexelHeight = height;
      return this;
    }
  };

  var ChromaticConfigurationMethods = {
    setChromaticEnable: function setChromaticEnable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.chromaticEnable = enable;
      return this;
    },
    setChabIntensity: function setChabIntensity(value) {
      this.chabIntensity = value;
      return this;
    }
  };

  var VignetteConfigurationMethod = {
    setVignetteEnable: function setVignetteEnable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.vignetteEnable = enable;
      return this;
    },
    setVignetteStrength: function setVignetteStrength(value) {
      this.vignetteStrength = value;
      return this;
    },
    setVignetteIntensity: function setVignetteIntensity(value) {
      this.vignetteIntensity = value;
      return this;
    }
  };

  var NoiseConfigurationMethod = {
    setNoiseEnable: function setNoiseEnable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.noiseEnable = enable;
      return this;
    },
    setNoiseStrength: function setNoiseStrength(value) {
      this.noiseStrength = value;
      return this;
    },
    setNoiseSeed: function setNoiseSeed(value) {
      this.noiseSeed = value;
      return this;
    }
  };

  var VHSConfigurationMethod = {
    setVHSEnable: function setVHSEnable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.vhsEnable = enable;
      return this;
    },
    setVhsStrength: function setVhsStrength(value) {
      this.vhsStrength = value;
      return this;
    }
  };

  var ScanlinesConfigurationMethod = {
    setScanlinesEnable: function setScanlinesEnable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.scanlinesEnable = enable;
      return this;
    },
    setScanStrength: function setScanStrength(value) {
      this.scanStrength = value;
      return this;
    }
  };

  var CRTConfigurationMethod = {
    setCRTEnable: function setCRTEnable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.crtEnable = enable;
      return this;
    },
    setCrtSize: function setCrtSize(width, height) {
      if (height === undefined) {
        height = width;
      }
      this.crtWidth = width;
      this.crtHeight = height;
      return this;
    }
  };

  var Methods = {
    setEnable: SetEnable
  };
  Object.assign(Methods, BloonConfigurationMethods, ChromaticConfigurationMethods, VignetteConfigurationMethod, NoiseConfigurationMethod, VHSConfigurationMethod, ScanlinesConfigurationMethod, CRTConfigurationMethod);

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
  var GetValue = Phaser.Utils.Objects.GetValue;
  var HorrifiPostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(HorrifiPostFxPipeline, _PostFXPipeline);
    function HorrifiPostFxPipeline(game) {
      var _this;
      _classCallCheck(this, HorrifiPostFxPipeline);
      _this = _callSuper(this, HorrifiPostFxPipeline, [{
        name: 'rexHorrifiPostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      }]);
      _this.now = 0;

      // Bloon
      _this.bloomEnable = false;
      _this.bloomRadius = 0;
      _this.bloomIntensity = 0;
      _this.bloomThreshold = 0;
      _this.bloomTexelWidth = 0;
      _this.bloomTexelHeight = 0;

      // Chromatic abberation
      _this.chromaticEnable = false;
      _this.chabIntensity = 0;

      // Vignette
      _this.vignetteEnable = false;
      _this.vignetteStrength = 0;
      _this.vignetteIntensity = 0;

      // Noise
      _this.noiseEnable = false;
      _this.noiseStrength = 0;
      _this.noiseSeed = Math.random();

      // VHS
      _this.vhsEnable = false;
      _this.vhsStrength = 0;

      // Scanlines
      _this.scanlinesEnable = false;
      _this.scanStrength = 0;

      // CRT
      _this.crtEnable = false;
      _this.crtWidth = 0;
      _this.crtHeight = 0;
      return _this;
    }
    _createClass(HorrifiPostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        var enable = GetValue(o, 'enable', false);

        // Bloom
        this.setBloomEnable(GetValue(o, 'bloomEnable', enable));
        this.setBloomRadius(GetValue(o, 'bloomRadius', 0));
        this.setBloomIntensity(GetValue(o, 'bloomIntensity', 0));
        this.setBloomThreshold(GetValue(o, 'bloomThreshold', 0));
        this.setBloomTexelSize(GetValue(o, 'bloomTexelWidth', 0), GetValue(o, 'bloomTexelHeight'));

        // Chromatic abberation
        this.setChromaticEnable(GetValue(o, 'chromaticEnable', enable));
        this.setChabIntensity(GetValue(o, 'chabIntensity', 0));

        // Vignette
        this.setVignetteEnable(GetValue(o, 'vignetteEnable', enable));
        this.setVignetteStrength(GetValue(o, 'vignetteStrength', 0));
        this.setVignetteIntensity(GetValue(o, 'vignetteIntensity', 0));

        // Noise
        this.setNoiseEnable(GetValue(o, 'noiseEnable', enable));
        this.setNoiseStrength(GetValue(o, 'noiseStrength', 0));
        this.setNoiseSeed(GetValue(0, 'noiseSeed', Math.random()));

        // VHS
        this.setVHSEnable(GetValue(o, 'vhsEnable', enable));
        this.setVhsStrength(GetValue(o, 'vhsStrength', 0));

        // Scanlines
        this.setScanlinesEnable(GetValue(o, 'scanlinesEnable', enable));
        this.setScanStrength(GetValue(o, 'scanStrength', 0));

        // CRT
        this.setCRTEnable(GetValue(o, 'crtEnable', enable));
        this.setCrtSize(GetValue(o, 'crtWidth', 0), GetValue(o, 'crtHeight', undefined));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set1f('noiseSeed', this.noiseSeed);

        // Bloon
        this.set1f('bloomEnable', this.bloomEnable ? 1 : 0);
        this.set3f('bloom', this.bloomRadius, this.bloomIntensity, this.bloomThreshold);
        this.set2f('bloomTexel', this.bloomTexelWidth, this.bloomTexelHeight);

        // Chromatic abberation
        this.set1f('chromaticEnable', this.chromaticEnable ? 1 : 0);
        this.set1f('chabIntensity', this.chabIntensity);

        // Vignette
        this.set1f('vignetteEnable', this.vignetteEnable ? 1 : 0);
        this.set2f('vignette', this.vignetteStrength, this.vignetteIntensity);

        // Noise
        this.set1f('noiseEnable', this.noiseEnable ? 1 : 0);
        this.set1f('noiseStrength', this.noiseStrength);

        // VHS
        this.set1f('vhsEnable', this.vhsEnable ? 1 : 0);
        this.set1f('vhsStrength', this.vhsStrength);

        // Scanlines
        this.set1f('scanlinesEnable', this.scanlinesEnable ? 1 : 0);
        this.set1f('scanStrength', this.scanStrength);

        // CRT        
        this.set1f('crtEnable', this.crtEnable ? 1 : 0);
        this.set2f('crtSize', this.crtWidth, this.crtHeight);

        // Eanble by VHS    
        if (this.vhsEnable) {
          this.now += GetTickDelta(this.game);
        }
        this.set1f('time', this.now);
      }
    }]);
    return HorrifiPostFxPipeline;
  }(PostFXPipeline);
  Object.assign(HorrifiPostFxPipeline.prototype, Methods);

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

  var HorrifiPipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(HorrifiPipelinePlugin, _BasePostFxPipelinePl);
    function HorrifiPipelinePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, HorrifiPipelinePlugin);
      _this = _callSuper(this, HorrifiPipelinePlugin, [pluginManager]);
      _this.setPostPipelineClass(HorrifiPostFxPipeline, 'rexHorrifiPostFx');
      return _this;
    }
    return _createClass(HorrifiPipelinePlugin);
  }(BasePostFxPipelinePlugin);
  SetValue(window, 'RexPlugins.Pipelines.HorrifiPostFx', HorrifiPostFxPipeline);

  return HorrifiPipelinePlugin;

}));
