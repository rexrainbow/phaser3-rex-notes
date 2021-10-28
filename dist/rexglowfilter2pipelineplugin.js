(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexglowfilter2pipelineplugin = factory());
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

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  // Reference: https://github.com/pixijs/filters/blob/main/filters/glow/src/glow.frag
  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform vec2 texSize;\nuniform float outerStrength;\nuniform float innerStrength;\nuniform vec4 glowColor; // (0, 0, 0);\nuniform float knockout;\n\n// const\nconst float PI = 3.14159265358979323846264;\n\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);\nconst float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);\n\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;\n\n\nvoid main(void) {\n  vec2 px = vec2(1./texSize.x, 1./texSize.y);\n\n  float totalAlpha = 0.0;\n\n  vec2 direction;\n  vec2 offset;\n  vec4 curColor;\n\n  for (float angle = 0.; angle < PI * 2.; angle += ANGLE_STEP_SIZE) {\n     direction = vec2(cos(angle), sin(angle)) * px;\n\n     for (float curDistance = 0.0; curDistance < DIST; curDistance++) {\n         offset = direction * (curDistance + 1.0);\n         curColor = texture2D(uMainSampler, outTexCoord + offset);\n         totalAlpha += (DIST - curDistance) * curColor.a;\n     }\n  }\n  \n  curColor = texture2D(uMainSampler, outTexCoord);\n\n  float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);\n\n  float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;\n  float innerGlowStrength = min(1.0, innerGlowAlpha);\n  \n  vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n\n  float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);\n  float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);\n\n  vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;\n  \n  if (knockout > 0.) {\n    float resultAlpha = outerGlowAlpha + innerGlowAlpha;\n    gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n  }\n  else {\n    gl_FragColor = innerColor + outerGlowColor;\n  }\n}\n";
  var GetValue$2 = Phaser.Utils.Objects.GetValue;

  var GetFrag = function GetFrag(config) {
    var quality = GetValue$2(config, 'quality', 0, 1);
    var distance = GetValue$2(config, 'distance', 10);
    return frag.replace(/__ANGLE_STEP_SIZE__/gi, "".concat((1 / quality / distance).toFixed(7))).replace(/__DIST__/gi, "".concat(Math.round(distance).toFixed(0), ".0"));
  };

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
  var Color = Phaser.Display.Color;
  var Quality = 0.1;
  var Distance = 10;
  var FragSrc = GetFrag({
    quality: Quality,
    distance: Distance
  });

  var GlowFilterPostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(GlowFilterPostFxPipeline, _PostFXPipeline);

    var _super = _createSuper(GlowFilterPostFxPipeline);

    function GlowFilterPostFxPipeline(game) {
      var _this;

      _classCallCheck(this, GlowFilterPostFxPipeline);

      _this = _super.call(this, {
        name: 'rexGlowFilterPostFx',
        game: game,
        renderTarget: true,
        fragShader: FragSrc
      });
      _this.outerStrength = 0;
      _this.innerStrength = 0;
      _this._glowColor = new Color();
      _this.knockout = false;
      return _this;
    }

    _createClass(GlowFilterPostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setOuterStrength(GetValue$1(o, 'outerStrength', 4));
        this.setInnerStrength(GetValue$1(o, 'innerStrength', 0));
        this.setGlowColor(GetValue$1(o, 'glowColor', 0xffffff));
        this.setKnockout(GetValue$1(o, 'knockout', false));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set1f('outerStrength', this.outerStrength);
        this.set1f('innerStrength', this.innerStrength);
        var color = this._glowColor;
        this.set4f('glowColor', color.redGL, color.greenGL, color.blueGL, color.alphaGL);
        this.set1f('knockout', this.knockout ? 1 : 0);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
      } // outerStrength

    }, {
      key: "setOuterStrength",
      value: function setOuterStrength(value) {
        this.outerStrength = value;
        return this;
      } // innerStrength

    }, {
      key: "setInnerStrength",
      value: function setInnerStrength(value) {
        this.innerStrength = value;
        return this;
      } // glowColor

    }, {
      key: "glowColor",
      get: function get() {
        return this._glowColor;
      },
      set: function set(value) {
        if (typeof value === 'number') {
          value = IntegerToRGB(value);
        }

        this._glowColor.setFromRGB(value);
      }
    }, {
      key: "setGlowColor",
      value: function setGlowColor(value) {
        this.glowColor = value;
        return this;
      } // knockout

    }, {
      key: "setKnockout",
      value: function setKnockout(value) {
        this.knockout = value;
        return this;
      }
    }], [{
      key: "setQuality",
      value: function setQuality(value) {
        if (Quality === value) {
          return;
        }

        Quality = value;
        FragSrc = GetFrag({
          quality: Quality,
          distance: Distance
        });
      }
    }, {
      key: "getQuality",
      value: function getQuality() {
        return Quality;
      }
    }, {
      key: "setDistance",
      value: function setDistance(value) {
        if (Distance === value) {
          return;
        }

        Distance = value;
        FragSrc = GetFrag({
          quality: Quality,
          distance: Distance
        });
      }
    }, {
      key: "getDistance",
      value: function getDistance() {
        return Distance;
      }
    }]);

    return GlowFilterPostFxPipeline;
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

  var GetValue = Phaser.Utils.Objects.GetValue;

  var GlowFilterPipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(GlowFilterPipelinePlugin, _BasePostFxPipelinePl);

    var _super = _createSuper(GlowFilterPipelinePlugin);

    function GlowFilterPipelinePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, GlowFilterPipelinePlugin);

      _this = _super.call(this, pluginManager);

      _this.setPostPipelineClass(GlowFilterPostFxPipeline, 'rexGlowFilter2PostFx');

      return _this;
    }

    _createClass(GlowFilterPipelinePlugin, [{
      key: "add",
      value: function add(gameObject, config) {
        this.setQuality(GetValue(config, 'quality', this.quality));
        this.setDistance(GetValue(config, 'distance', this.distance));
        return _get(_getPrototypeOf(GlowFilterPipelinePlugin.prototype), "add", this).call(this, gameObject, config);
      }
    }, {
      key: "setQuality",
      value: function setQuality(value) {
        GlowFilterPostFxPipeline.setQuality(value);
        return this;
      }
    }, {
      key: "quality",
      get: function get() {
        return GlowFilterPostFxPipeline.getQuality();
      },
      set: function set(value) {
        this.setQuality(value);
      }
    }, {
      key: "setDistance",
      value: function setDistance(value) {
        GlowFilterPostFxPipeline.setDistance(value);
        return this;
      }
    }, {
      key: "distance",
      get: function get() {
        return GlowFilterPostFxPipeline.getDistance();
      },
      set: function set(value) {
        this.setDistance(value);
      }
    }]);

    return GlowFilterPipelinePlugin;
  }(BasePostFxPipelinePlugin);

  SetValue(window, 'RexPlugins.Pipelines.GlowFilter2PostFx', GlowFilterPostFxPipeline);

  return GlowFilterPipelinePlugin;

})));
