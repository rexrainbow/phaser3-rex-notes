(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdissolvepipelineplugin = factory());
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

  // Reference: https://medium.com/neosavvy-labs/webgl-with-perlin-noise-part-1-a87b56bbc9fb
  var frag$1 = "vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\nvec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\nfloat Perlin(vec3 P) {\n    vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.0));\n    vec3 f0 = fract(P), f1 = f0 - vec3(1.0), f = fade(f0);\n    vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy);\n    vec4 iz0 = i0.zzzz, iz1 = i1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0), gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    vec4 gx1 = ixy1 * (1.0 / 7.0), gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0); gx1 = fract(gx1);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),\n        g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),\n        g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),\n        g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3)));\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));\n    g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;\n    g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;\n    vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),\n        dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),\n        vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),\n            dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);\n    return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);\n}\nfloat Perlin(vec2 P) { return Perlin(vec3(P, 0.0)); }\n";

  // https://github.com/ykob/glsl-dissolve/blob/master/src/glsl/dissolve.fs

  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n// Scene buffer\nuniform sampler2D uMainSampler;\nuniform sampler2D uMainSampler2;\n\nuniform int resizeMode;\nuniform float progress;\nuniform float fromRatio;\nuniform float toRatio;\nvarying vec2 outFragCoord;\n// Effect parameters\nuniform float noiseX;\nuniform float noiseY;\nuniform float noiseZ;\nuniform float fromEdgeStart;\nuniform float fromEdgeWidth;\nuniform float toEdgeStart;\nuniform float toEdgeWidth;\n\n".concat(frag$1, "\n\nvec4 getFromColor (vec2 uv) {\n  return texture2D(uMainSampler, uv);\n}\n\nvec4 getToColor (vec2 uv) {\n  if (resizeMode == 2) {\n    //  cover\n    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, 1.0 - uv.y) - 0.5) * vec2(min(fromRatio / toRatio, 1.0), min((toRatio / fromRatio), 1.0)));\n  } else if (resizeMode == 1) {\n    //  contain\n    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, 1.0 - uv.y) - 0.5) * vec2(max(fromRatio / toRatio, 1.0), max((toRatio / fromRatio), 1.0)));\n  } else {\n    //  stretch\n    return texture2D(uMainSampler2, vec2(uv.x, 1.0 - uv.y));\n  }\n}\n\nvec4 transition (vec2 uv) {    \n  vec4 colorFront = getFromColor(uv);\n  vec4 colorTo = getToColor(uv);\n\n  float noise = (Perlin(vec3(uv.x * noiseX, uv.y * noiseY, noiseZ)) + 1.0) / 2.0\n    * (1.0 - (fromEdgeStart + fromEdgeWidth + toEdgeStart + toEdgeWidth))\n    + (fromEdgeStart + fromEdgeWidth + toEdgeStart + toEdgeWidth) * 0.5;\n  vec4 colorResult = colorFront * smoothstep(progress - (fromEdgeStart + fromEdgeWidth), progress - fromEdgeStart, noise)\n    + colorTo * smoothstep((1.0 - progress) - (toEdgeStart + toEdgeWidth), (1.0 - progress) - toEdgeStart, (1.0 - noise));\n  return colorResult;\n}\n\nvoid main () {\n  vec2 uv = outFragCoord;\n  gl_FragColor = transition(uv);\n}\n");

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  var DissolvePostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(DissolvePostFxPipeline, _PostFXPipeline);
    function DissolvePostFxPipeline(game) {
      var _this;
      _classCallCheck(this, DissolvePostFxPipeline);
      _this = _callSuper(this, DissolvePostFxPipeline, [{
        name: 'rexDissolvePostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      }]);
      _this._progress = 0;
      _this.toFrame = null;
      _this.targetTexture = null;
      _this.resizeMode = 1;
      _this.toRatio = 1;
      _this.noiseX = 0;
      _this.noiseY = 0;
      _this.noiseZ = 0;
      _this.fromEdgeStart = 0.01;
      _this.fromEdgeWidth = 0.05;
      _this.toEdgeStart = 0.01;
      _this.toEdgeWidth = 0.05;
      return _this;
    }
    _createClass(DissolvePostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setProgress(GetValue(o, 'progress', 0));
        this.setTransitionTargetTexture(GetValue(o, 'toTexture', '__DEFAULT'), GetValue(o, 'toFrame', undefined), GetValue(o, 'resizeMode', 1));
        this.setNoise(GetValue(o, 'noiseX', undefined), GetValue(o, 'noiseY', undefined), GetValue(o, 'noiseZ', undefined));
        this.setFromEdge(GetValue(o, 'fromEdgeStart', 0.01), GetValue(o, 'fromEdgeWidth', 0.05));
        this.setToEdge(GetValue(o, 'toEdgeStart', 0.01), GetValue(o, 'toEdgeWidth', 0.05));
        return this;
      }
    }, {
      key: "onBoot",
      value: function onBoot() {}
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set1f('progress', this.progress);
        this.set1i('resizeMode', this.resizeMode);
        this.set1f('noiseX', this.noiseX);
        this.set1f('noiseY', this.noiseY);
        this.set1f('noiseZ', this.noiseZ);
        this.set1f('fromEdgeStart', this.fromEdgeStart);
        this.set1f('fromEdgeWidth', this.fromEdgeWidth);
        this.set1f('toEdgeStart', this.toEdgeStart);
        this.set1f('toEdgeWidth', this.toEdgeWidth);
      }
    }, {
      key: "onDraw",
      value: function onDraw(renderTarget) {
        this.set1f('fromRatio', renderTarget.width / renderTarget.height);
        this.set1f('toRatio', this.toRatio);
        this.set1i('uMainSampler2', 1);
        this.bindTexture(this.targetTexture, 1);
        this.bindAndDraw(renderTarget);
      }
    }, {
      key: "progress",
      get: function get() {
        return this._progress;
      },
      set: function set(value) {
        this._progress = Clamp(value, 0, 1);
      }
    }, {
      key: "setProgress",
      value: function setProgress(value) {
        this.progress = value;
        return this;
      }
    }, {
      key: "setTransitionTargetTexture",
      value: function setTransitionTargetTexture(key, frame, resizeMode) {
        if (key === undefined) {
          key = '__DEFAULT';
        }
        var phaserTexture = this.game.textures.getFrame(key, frame);
        if (!phaserTexture) {
          phaserTexture = this.game.textures.getFrame('__DEFAULT');
        }
        this.toRatio = phaserTexture.width / phaserTexture.height;
        this.toFrame = phaserTexture;
        this.targetTexture = phaserTexture.glTexture;
        if (resizeMode !== undefined) {
          this.resizeMode = resizeMode;
        }
        return this;
      }
    }, {
      key: "setResizeMode",
      value: function setResizeMode(mode) {
        if (typeof mode === 'string') {
          mode = ResizeMode[mode];
        }
        this.resizeMode = mode;
        return this;
      }
    }, {
      key: "setNoise",
      value: function setNoise(x, y, z) {
        if (x === undefined) {
          x = 4 + Math.random() * 6;
        }
        if (y === undefined) {
          y = 4 + Math.random() * 6;
        }
        if (z === undefined) {
          z = Math.random() * 10;
        }
        this.noiseX = x;
        this.noiseY = y;
        this.noiseZ = z;
        return this;
      }
    }, {
      key: "setFromEdge",
      value: function setFromEdge(edgeStart, edgeWidth) {
        this.fromEdgeStart = edgeStart;
        this.fromEdgeWidth = edgeWidth;
        return this;
      }
    }, {
      key: "setToEdge",
      value: function setToEdge(edgeStart, edgeWidth) {
        this.toEdgeStart = edgeStart;
        this.toEdgeWidth = edgeWidth;
        return this;
      }
    }]);
    return DissolvePostFxPipeline;
  }(PostFXPipeline);
  /**
   * Set the resize mode of the target texture.
   * 
   * Can be either:
   * 
   * 0 - Stretch. The target texture is stretched to the size of the source texture.
   * 1 - Contain. The target texture is resized to fit the source texture. This is the default.
   * 2 - Cover. The target texture is resized to cover the source texture.
   * 
   * If the source and target textures are the same size, then use a resize mode of zero
   * for speed.
   *
   */
  var ResizeMode = {
    stretch: 0,
    contain: 1,
    cover: 2
  };

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

  var DissolvePipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(DissolvePipelinePlugin, _BasePostFxPipelinePl);
    function DissolvePipelinePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, DissolvePipelinePlugin);
      _this = _callSuper(this, DissolvePipelinePlugin, [pluginManager]);
      _this.setPostPipelineClass(DissolvePostFxPipeline, 'rexDissolvePostFx');
      return _this;
    }
    return _createClass(DissolvePipelinePlugin);
  }(BasePostFxPipelinePlugin);
  SetValue(window, 'RexPlugins.Pipelines.DissolvePostFx', DissolvePostFxPipeline);

  return DissolvePipelinePlugin;

}));
