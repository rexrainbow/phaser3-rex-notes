(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexnoisefadepipelineplugin = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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

  // Reference: https://medium.com/neosavvy-labs/webgl-with-perlin-noise-part-1-a87b56bbc9fb
  var frag$1 = "vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\nvec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\nfloat Perlin(vec3 P) {\n    vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.0));\n    vec3 f0 = fract(P), f1 = f0 - vec3(1.0), f = fade(f0);\n    vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy);\n    vec4 iz0 = i0.zzzz, iz1 = i1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0), gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    vec4 gx1 = ixy1 * (1.0 / 7.0), gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0); gx1 = fract(gx1);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),\n        g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),\n        g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),\n        g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3)));\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));\n    g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;\n    g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;\n    vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),\n        dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),\n        vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),\n            dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);\n    return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);\n}\nfloat Perlin(vec2 P) { return Perlin(vec3(P, 0.0)); }\n";

  // https://github.com/ykob/glsl-dissolve/blob/master/src/glsl/dissolve.fs
  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Progress\nuniform float progress;\n// Noise\nuniform float noiseX;\nuniform float noiseY;\nuniform float noiseZ;\n// Alpha\nuniform float alpha0;\nuniform float alpha1;\n\n".concat(frag$1, "\n\nvoid main (void) {\n  float t = (Perlin(vec3(outTexCoord.x * noiseX, outTexCoord.y * noiseY, noiseZ)) + 1.0) / 2.0;\n  t -= progress;  // progress: 0->1, t: 1->0\n  t = min(max(t, 0.0), 1.0);\n  float alpha = mix(alpha0, alpha1, (1.0 - t));\n  vec4 front = texture2D(uMainSampler, outTexCoord);\n  gl_FragColor = vec4(front.rgb * alpha, front.a * alpha);\n}\n");

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;

  var NoiseFadePostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(NoiseFadePostFxPipeline, _PostFXPipeline);

    var _super = _createSuper(NoiseFadePostFxPipeline);

    function NoiseFadePostFxPipeline(game) {
      var _this;

      _classCallCheck(this, NoiseFadePostFxPipeline);

      _this = _super.call(this, {
        name: 'rexNoiseDelayFadePostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      }); // Progress

      _this._progress = 0; // Noise

      _this.noiseX = 0;
      _this.noiseY = 0;
      _this.noiseZ = 0; // Alpha

      _this.alpha0 = 1;
      _this.alpha1 = 0;
      return _this;
    }

    _createClass(NoiseFadePostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setProgress(GetValue(o, 'progress', 0));
        this.setNoise(GetValue(o, 'noiseX', undefined), GetValue(o, 'noiseY', undefined), GetValue(o, 'noiseZ', undefined));
        this.setFadeMode(GetValue(o, 'mode', 0));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set1f('progress', this.progress);
        this.set1f('activeRate', this.activeRate);
        this.set1f('noiseX', this.noiseX);
        this.set1f('noiseY', this.noiseY);
        this.set1f('noiseZ', this.noiseZ);
        this.set1f('alpha0', this.alpha0);
        this.set1f('alpha1', this.alpha1);
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
      key: "setNoise",
      value: function setNoise(x, y, z) {
        if (x === undefined) {
          x = 4 + Math.random() * 30;
        }

        if (y === undefined) {
          y = 4 + Math.random() * 30;
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
      key: "setFadeMode",
      value: function setFadeMode(mode) {
        if (typeof mode === 'string') {
          mode = FadeMode[mode];
        }

        if (mode === 0) {
          this.alpha0 = 1;
          this.alpha1 = 0;
        } else {
          this.alpha0 = 0;
          this.alpha1 = 1;
        }

        return this;
      }
    }]);

    return NoiseFadePostFxPipeline;
  }(PostFXPipeline);

  var FadeMode = {
    fadeOut: 0,
    fadeIn: 1
  };

  var SpliceOne = Phaser.Utils.Array.SpliceOne;

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
        this.game.renderer.pipelines.addPostPipeline(this.postFxPipelineName, this.PostFxPipelineClass);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        if (config === undefined) {
          config = {};
        }

        gameObject.setPostPipeline(this.PostFxPipelineClass);
        var pipeline = gameObject.postPipelines[gameObject.postPipelines.length - 1];
        pipeline.resetFromJSON(config);

        if (config.name) {
          pipeline.name = config.name;
        }

        return pipeline;
      }
    }, {
      key: "remove",
      value: function remove(gameObject, name) {
        var PostFxPipelineClass = this.PostFxPipelineClass;

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

        return this;
      }
    }, {
      key: "get",
      value: function get(gameObject, name) {
        var PostFxPipelineClass = this.PostFxPipelineClass;

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

  var SetValue = function SetValue(target, keys, value) {
    // no object
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
        keys = keys.split('.');
      }

      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }

    return target;
  };

  var NoiseFadePipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(NoiseFadePipelinePlugin, _BasePostFxPipelinePl);

    var _super = _createSuper(NoiseFadePipelinePlugin);

    function NoiseFadePipelinePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, NoiseFadePipelinePlugin);

      _this = _super.call(this, pluginManager);

      _this.setPostPipelineClass(NoiseFadePostFxPipeline, 'rexNoiseFadePostFx');

      return _this;
    }

    return NoiseFadePipelinePlugin;
  }(BasePostFxPipelinePlugin);

  SetValue(window, 'RexPlugins.Pipelines.NoiseFadePostFx', NoiseFadePostFxPipeline);

  return NoiseFadePipelinePlugin;

})));
