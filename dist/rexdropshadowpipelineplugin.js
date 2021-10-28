(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdropshadowpipelineplugin = factory());
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var frag$1 = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform float alpha;\nuniform vec3 color;\nuniform vec2 offset;\n\nvoid main (void) {\n  vec4 sample = texture2D(uMainSampler, outTexCoord - offset);\n\n  // Premultiply alpha\n  sample.rgb = color.rgb * sample.a;\n\n  // alpha user alpha\n  sample *= alpha;\n\n  gl_FragColor = sample;\n}\n";

  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform vec2 uOffset;\n\nvoid main (void) {\n  vec4 color = vec4(0.0);\n\n  // Sample top left pixel\n  color += texture2D(uMainSampler, vec2(outTexCoord.x - uOffset.x, outTexCoord.y + uOffset.y));\n\n  // Sample top right pixel\n  color += texture2D(uMainSampler, vec2(outTexCoord.x + uOffset.x, outTexCoord.y + uOffset.y));\n\n  // Sample bottom right pixel\n  color += texture2D(uMainSampler, vec2(outTexCoord.x + uOffset.x, outTexCoord.y - uOffset.y));\n\n  // Sample bottom left pixel\n  color += texture2D(uMainSampler, vec2(outTexCoord.x - uOffset.x, outTexCoord.y - uOffset.y));\n\n  // Average\n  color *= 0.25;\n\n  gl_FragColor = color;\n}\n";

  var GenerateKernels = function GenerateKernels(blur, quality, out) {
    if (out === undefined) {
      out = [];
    }

    out.length = quality;

    for (var i = quality; i > 0; i--) {
      out[i] = blur * (i / quality);
    }

    return out;
  };

  var Drawer = /*#__PURE__*/function () {
    function Drawer(postFXPipeline, shader) {
      _classCallCheck(this, Drawer);

      this.postFXPipeline = postFXPipeline;
      this.shader = shader;
    }

    _createClass(Drawer, [{
      key: "getAnotherFrame",
      value: function getAnotherFrame(frame) {
        var self = this.postFXPipeline;
        var frame1 = self.fullFrame1,
            frame2 = self.fullFrame2;
        return frame === frame1 ? frame2 : frame1;
      }
    }, {
      key: "init",
      value: function init(renderTarget, startFrame) {
        var self = this.postFXPipeline;

        if (startFrame === undefined) {
          startFrame = self.fullFrame1;
        }

        self.copyFrame(renderTarget, startFrame);
        return startFrame;
      } // Override

    }, {
      key: "draw",
      value: function draw(startFrame, returnLastFrame) {// var self = this.postFXPipeline;
        // var shader = this.shader;
        // var sourceFrame = startFrame;
        // var targetFrame = this.getAnotherFrame(sourceFrame);
        // var returnFrame;
        // ...
        // return returnFrame;
      }
    }]);

    return Drawer;
  }();

  var ShadowDrawer = /*#__PURE__*/function (_Drawer) {
    _inherits(ShadowDrawer, _Drawer);

    var _super = _createSuper(ShadowDrawer);

    function ShadowDrawer() {
      _classCallCheck(this, ShadowDrawer);

      return _super.apply(this, arguments);
    }

    _createClass(ShadowDrawer, [{
      key: "draw",
      value: function draw(startFrame, returnLastFrame) {
        var self = this.postFXPipeline;
        var shader = this.shader;
        var sourceFrame = startFrame;
        var targetFrame = this.getAnotherFrame(sourceFrame);
        var returnFrame; // Set uniforms

        var offsetX = self.distance / self.renderer.width * Math.cos(self.rotation);
        var offsetY = self.distance / self.renderer.height * Math.sin(self.rotation);
        self.set2f('offset', offsetX, offsetY, shader);
        self.set3f('color', self._shadowColor.redGL, self._shadowColor.greenGL, self._shadowColor.blueGL, shader);
        self.set1f('alpha', self.alpha, shader); // Bind and draw

        if (returnLastFrame) {
          self.bindAndDraw(sourceFrame, targetFrame, true, true, shader);
          returnFrame = targetFrame;
        } else {
          self.bindAndDraw(sourceFrame, null, true, true, shader);
        }

        return returnFrame;
      }
    }]);

    return ShadowDrawer;
  }(Drawer);

  var KawaseBlurDrawer = /*#__PURE__*/function (_Drawer) {
    _inherits(KawaseBlurDrawer, _Drawer);

    var _super = _createSuper(KawaseBlurDrawer);

    function KawaseBlurDrawer() {
      _classCallCheck(this, KawaseBlurDrawer);

      return _super.apply(this, arguments);
    }

    _createClass(KawaseBlurDrawer, [{
      key: "draw",
      value: function draw(startFrame, returnLastFrame) {
        var self = this.postFXPipeline;
        var shader = this.shader;
        var sourceFrame = startFrame;
        var targetFrame = this.getAnotherFrame(sourceFrame);
        var returnFrame;
        var uvX = self.pixelWidth / self.renderer.width;
        var uvY = self.pixelHeight / self.renderer.height;
        var offset, uOffsetX, uOffsetY;

        for (var i = 0, last = self._quality - 1; i <= last; i++) {
          // Set uniforms
          offset = self._kernels[i] + 0.5;
          uOffsetX = offset * uvX;
          uOffsetY = offset * uvY;
          self.set2f('uOffset', uOffsetX, uOffsetY, shader); // Bind and draw

          if (i < last) {
            self.bindAndDraw(sourceFrame, targetFrame, true, true, shader);
            sourceFrame = targetFrame;
            targetFrame = this.getAnotherFrame(sourceFrame);
          } else {
            // Last step
            if (returnLastFrame) {
              self.bindAndDraw(sourceFrame, targetFrame, true, true, shader);
              returnFrame = targetFrame;
            } else {
              self.bindAndDraw(sourceFrame, null, true, true, shader);
            }
          }
        }

        return returnFrame;
      }
    }]);

    return KawaseBlurDrawer;
  }(Drawer);

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var DegToRad = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
  var Color = Phaser.Display.Color;

  var DropShadowPostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(DropShadowPostFxPipeline, _PostFXPipeline);

    var _super = _createSuper(DropShadowPostFxPipeline);

    function DropShadowPostFxPipeline(game) {
      var _this;

      _classCallCheck(this, DropShadowPostFxPipeline);

      _this = _super.call(this, {
        name: 'rexDropShadowPostFx',
        game: game,
        shaders: [{
          fragShader: frag$1
        }, {
          fragShader: frag
        }]
      });
      _this.shadowDrawer = new ShadowDrawer(_assertThisInitialized(_this), _this.shaders[0]);
      _this.kawaseBlurDrawer = new KawaseBlurDrawer(_assertThisInitialized(_this), _this.shaders[1]);
      _this.rotation = 0;
      _this.distance = 0;
      _this._shadowColor = new Color();
      _this.alpha = 0.5;
      _this.shadowOnly = false; // KawaseBlur

      _this._kernels = [0];
      _this._blur = 0;
      _this._quality = 1;
      _this.pixelWidth = 1; // width of pixel wo resolution

      _this.pixelHeight = 1; // height of pixel wo resolution

      return _this;
    }

    _createClass(DropShadowPostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        var rotation = GetValue(o, 'rotation', undefined);

        if (rotation === undefined) {
          this.setAngle(GetValue(o, 'angle', 45));
        } else {
          this.setRotation(rotation);
        }

        this.setDistance(GetValue(o, 'distance', 5));
        this.setShadowColor(GetValue(o, 'shadowColor', 0xffffff));
        this.setAlpha(GetValue(o, 'alpha', 0.5));
        this.setShadowOnly(GetValue(o, 'shadowOnly', false)); // KawaseBlur

        var blur = GetValue(o, 'blur', 4);

        if (typeof blur === 'number') {
          this.setBlur(blur);
          this.setQuality(GetValue(o, 'quality', 3));
        } else {
          this.setKernela(blur);
        }

        this.setPixelSize(GetValue(o, 'pixelWidth', 1), GetValue(o, 'pixelHeight', 1));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {}
    }, {
      key: "onDraw",
      value: function onDraw(renderTarget) {
        var targetFrame; // shadow

        targetFrame = this.shadowDrawer.draw(this.shadowDrawer.init(renderTarget), true); // kawase-blur

        targetFrame = this.kawaseBlurDrawer.draw(targetFrame, true); // Add renderTarget to result

        if (!this.shadowOnly) {
          this.copyFrame(renderTarget, targetFrame, 1, false);
        }

        this.copyToGame(targetFrame);
      } // rotation

    }, {
      key: "setRotation",
      value: function setRotation(value) {
        this.rotation = value;
        return this;
      }
    }, {
      key: "angle",
      get: function get() {
        return RadToDeg(this.rotation);
      },
      set: function set(value) {
        this.rotation = DegToRad(value);
      }
    }, {
      key: "setAngle",
      value: function setAngle(value) {
        this.angle = value;
        return this;
      } // distance

    }, {
      key: "setDistance",
      value: function setDistance(value) {
        this.distance = value;
        return this;
      } // shadow color

    }, {
      key: "shadowColor",
      get: function get() {
        return this._shadowColor;
      },
      set: function set(value) {
        if (typeof value === 'number') {
          value = IntegerToRGB(value);
        }

        this._shadowColor.setFromRGB(value);
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(value) {
        this.shadowColor = value;
        return this;
      } // alpha

    }, {
      key: "setAlpha",
      value: function setAlpha(value) {
        this.alpha = value;
        return this;
      } // shadowOnly

    }, {
      key: "setShadowOnly",
      value: function setShadowOnly(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.shadowOnly = enable;
        return this;
      } // KawaseBlur
      // blur

    }, {
      key: "blur",
      get: function get() {
        return this._blur;
      },
      set: function set(value) {
        if (this._blur === value) {
          return;
        }

        this._blur = value;
        GenerateKernels(this._blur, this._quality, this._kernels);
      }
    }, {
      key: "setBlur",
      value: function setBlur(value) {
        this.blur = value;
        return this;
      } // quality

    }, {
      key: "quality",
      get: function get() {
        return this._quality;
      },
      set: function set(value) {
        if (this._quality === value) {
          return;
        }

        this._quality = value;
        GenerateKernels(this._blur, this._quality, this._kernels);
      }
    }, {
      key: "setQuality",
      value: function setQuality(value) {
        this.quality = value;
        return this;
      } // kernels

    }, {
      key: "kernels",
      get: function get() {
        return this._kernels;
      },
      set: function set(value) {
        if (value === undefined) {
          value = [0];
        }

        this._kernels = value;
        this._quality = value.length;
        this._blur = Math.max.apply(Math, _toConsumableArray(value));
      }
    }, {
      key: "setKernela",
      value: function setKernela(value) {
        this.kernels = value;
        return this;
      } // pixelWidth

    }, {
      key: "setPixelWidth",
      value: function setPixelWidth(value) {
        this.pixelWidth = value;
        return this;
      } // pixelHeight

    }, {
      key: "setPixelHeight",
      value: function setPixelHeight(value) {
        this.pixelHeight = value;
        return this;
      }
    }, {
      key: "setPixelSize",
      value: function setPixelSize(width, height) {
        if (height === undefined) {
          height = width;
        }

        this.pixelWidth = width;
        this.pixelHeight = height;
        return this;
      }
    }]);

    return DropShadowPostFxPipeline;
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

  var DropShadowPipelinePlugin = /*#__PURE__*/function (_BasePostFxPipelinePl) {
    _inherits(DropShadowPipelinePlugin, _BasePostFxPipelinePl);

    var _super = _createSuper(DropShadowPipelinePlugin);

    function DropShadowPipelinePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, DropShadowPipelinePlugin);

      _this = _super.call(this, pluginManager);

      _this.setPostPipelineClass(DropShadowPostFxPipeline, 'rexDropShadowPostFx');

      return _this;
    }

    return DropShadowPipelinePlugin;
  }(BasePostFxPipelinePlugin);

  SetValue(window, 'RexPlugins.Pipelines.DropShadowPostFx', DropShadowPostFxPipeline);

  return DropShadowPipelinePlugin;

})));
