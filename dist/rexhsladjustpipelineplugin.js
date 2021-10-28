(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhsladjustpipelineplugin = factory());
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

  var frag$3 = "vec3 RGBToHSL(vec3 color) {\n  vec3 hsl = vec3(0.0, 0.0, 0.0);\n\t\n  float fmin = min(min(color.r, color.g), color.b);\n  float fmax = max(max(color.r, color.g), color.b);\n  float delta = fmax - fmin;\n\n  hsl.z = (fmax + fmin) / 2.0;\n\n  if (delta == 0.0) {\n\t\thsl.x = 0.0;\n\t\thsl.y = 0.0;\n\t} else {\n\t\tif (hsl.z < 0.5) {\n\t\t\thsl.y = delta / (fmax + fmin);\n    } else {\n      hsl.y = delta / (2.0 - fmax - fmin);\n    }\n\t\t\n\t\tfloat dR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;\n\t\tfloat dG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;\n\t\tfloat dB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;\n\n\t\tif (color.r == fmax) {\n\t\t\thsl.x = dB - dG;\n    } else if (color.g == fmax) {\n\t\t\thsl.x = (1.0 / 3.0) + dR - dB;\n\t\t} else if (color.b == fmax) {\n      hsl.x = (2.0 / 3.0) + dG - dR;\n    }\n\n\t\tif (hsl.x < 0.0) {\n\t\t\thsl.x += 1.0;\n    } else if (hsl.x > 1.0) {\n      hsl.x -= 1.0;\n    }\n\t}\n\n\treturn hsl;\n}\n";

  var frag$2 = "float HUEToRGB(float f1, float f2, float hue) {\n  if (hue < 0.0) {\n    hue += 1.0;\n  } else if (hue > 1.0) {\n    hue -= 1.0;\n  }\n   \t\n  float ret;\n\t\n\tif ((6.0 * hue) < 1.0) {\n\t\tret = f1 + (f2 - f1) * 6.0 * hue;\n  } else if ((2.0 * hue) < 1.0) {\n\t\tret = f2;\n\t} else if ((3.0 * hue) < 2.0) {\n\t\tret = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;\n  } else {\n      ret = f1;\n  }\n\t\n  return ret;\n}\n";

  var frag$1 = frag$2 + "vec3 HSLToRGB(vec3 hsl) {\n\tvec3 rgb = vec3(hsl.z);\n\t\n\tif (hsl.y != 0.0) {\n\t\tfloat f2;\n\t\t\n\t\tif (hsl.z < 0.5) {\n\t\t  f2 = hsl.z * (1.0 + hsl.y);\n    } else {\n      f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);\n    }\n\t\t\t\n\t\tfloat f1 = 2.0 * hsl.z - f2;\n\t\t\n\t\trgb.r = HUEToRGB(f1, f2, hsl.x + (1.0 / 3.0));\n\t\trgb.g = HUEToRGB(f1, f2, hsl.x);\n\t\trgb.b = HUEToRGB(f1, f2, hsl.x - (1.0 / 3.0));\n  }\n  \n  return rgb;\n}\n";

  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform float hueRotate;\nuniform float satAdjust;\nuniform float lumAdjust;\n" + frag$3 + frag$1 + "void main(void) {\n\tvec4 front = texture2D(uMainSampler, outTexCoord);\n\tvec3 hsl = RGBToHSL(front.rgb);\n\thsl.x -= hueRotate;\n\thsl.y *= satAdjust;\n\thsl.z += (lumAdjust - 0.5) * front.a;\n\tvec3 rgb = HSLToRGB(hsl);\n\tgl_FragColor = vec4(rgb, front.a);\n}\n";

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var HslAdjustPostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(HslAdjustPostFxPipeline, _PostFXPipeline);

    var _super = _createSuper(HslAdjustPostFxPipeline);

    function HslAdjustPostFxPipeline(game) {
      var _this;

      _classCallCheck(this, HslAdjustPostFxPipeline);

      _this = _super.call(this, {
        name: 'rexHslAdjustPostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      });
      _this.hueRotate = 0;
      _this.satAdjust = 1;
      _this.lumAdjust = 0.5;
      return _this;
    }

    _createClass(HslAdjustPostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setHueRotate(GetValue(o, 'hueRotate', 0));
        this.setSatAdjust(GetValue(o, 'satAdjust', 1));
        this.setLumAdjust(GetValue(o, 'lumAdjust', 0.5));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set1f('hueRotate', this.hueRotate % 1);
        this.set1f('satAdjust', this.satAdjust);
        this.set1f('lumAdjust', this.lumAdjust);
      } // hueRotate

    }, {
      key: "setHueRotate",
      value: function setHueRotate(value) {
        this.hueRotate = value; // 0: rotate 0 degrees, 0.5: rotate 180 degrees, 1: rotate 360 degrees

        return this;
      } // satAdjust

    }, {
      key: "setSatAdjust",
      value: function setSatAdjust(value) {
        this.satAdjust = value; // 0: gray, 1: original color, > 1: 

        return this;
      } // lumAdjust

    }, {
      key: "setLumAdjust",
      value: function setLumAdjust(value) {
        this.lumAdjust = value; // 0: dark, 0.5: original color, 1: white

        return this;
      }
    }]);

    return HslAdjustPostFxPipeline;
  }(PostFXPipeline);

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

  var HslAdjustPipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(HslAdjustPipelinePlugin, _BasePostFxPipelinePl);

    var _super = _createSuper(HslAdjustPipelinePlugin);

    function HslAdjustPipelinePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, HslAdjustPipelinePlugin);

      _this = _super.call(this, pluginManager);

      _this.setPostPipelineClass(HslAdjustPostFxPipeline, 'rexHslAdjustPostFx');

      return _this;
    }

    return HslAdjustPipelinePlugin;
  }(BasePostFxPipelinePlugin);

  SetValue(window, 'RexPlugins.Pipelines.HslAdjustPostFx', HslAdjustPostFxPipeline);

  return HslAdjustPipelinePlugin;

})));
