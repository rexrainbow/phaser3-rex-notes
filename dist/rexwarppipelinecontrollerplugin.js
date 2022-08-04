(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexwarppipelinecontrollerplugin = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  var GameClass = Phaser.Game;

  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var SceneClass = Phaser.Scene;

  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetGame = function GetGame(object) {
    if (IsGame(object)) {
      return object;
    } else if (IsSceneObject(object)) {
      return object.game;
    } else if (object.scene && IsSceneObject(object.scene)) {
      // object = game object
      return object.scene.game;
    }
  };

  var RemoveIte = Phaser.Utils.Array.Remove;

  var PostFxPipelineControllerBase = function PostFxPipelineControllerBase(PostFxPipelineClass) {
    return /*#__PURE__*/function (_PostFxPipelineClass) {
      _inherits(Base, _PostFxPipelineClass);

      var _super = _createSuper(Base);

      function Base(gameObject, config) {
        var _this;

        _classCallCheck(this, Base);

        _this = _super.call(this, GetGame(gameObject));
        _this.gameObject = gameObject;

        _this.resetFromJSON(config);

        return _this;
      }

      _createClass(Base, [{
        key: "resetFromJSON",
        value: function resetFromJSON(o) {
          if (o === undefined) {
            o = {};
          }

          _get(_getPrototypeOf(Base.prototype), "resetFromJSON", this).call(this, o);

          this.setEnable(o.enable);
          return this;
        }
      }, {
        key: "enable",
        get: function get() {
          return this._enable;
        },
        set: function set(value) {
          value = !!value;

          if (this._enable === value) {
            return;
          }

          this._enable = value;
          var gameObject = this.gameObject;
          var postPipelines = gameObject.postPipelines;

          if (value) {
            postPipelines.push(this);
          } else {
            RemoveIte(postPipelines, this);
          }

          gameObject.hasPostPipeline = postPipelines.length > 0;
        }
      }, {
        key: "setEnable",
        value: function setEnable(enable) {
          if (enable === undefined) {
            enable = true;
          }

          this.enable = enable;
          return this;
        }
      }]);

      return Base;
    }(PostFxPipelineClass);
  };

  // reference : https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/
  var frag = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D uMainSampler; \nvarying vec2 outTexCoord;\n\n// Effect parameters\nuniform vec2 texSize;\nuniform vec2 amplitude;\nuniform vec2 frequency;\nuniform vec2 progress;\n\n\nvoid main (void) {\n  vec2 dxy = frequency/texSize;\n  vec2 r = amplitude/texSize;\n  vec2 angle = (outTexCoord / dxy) + progress;\n  vec2 tc = (vec2(cos(angle.x),sin(angle.y)) * r) + outTexCoord;\n  gl_FragColor = texture2D(uMainSampler, tc);\n}\n";

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var PI2 = Math.PI * 2;

  var WarpPostFxPipeline = /*#__PURE__*/function (_PostFXPipeline) {
    _inherits(WarpPostFxPipeline, _PostFXPipeline);

    var _super = _createSuper(WarpPostFxPipeline);

    function WarpPostFxPipeline(game) {
      var _this;

      _classCallCheck(this, WarpPostFxPipeline);

      _this = _super.call(this, {
        name: 'rexWarpPostFx',
        game: game,
        renderTarget: true,
        fragShader: frag
      });
      _this.frequencyX = 10;
      _this.frequencyY = 10;
      _this.amplitudeX = 10;
      _this.amplitudeY = 10;
      _this.progressX = 0;
      _this.progressY = 0;
      return _this;
    }

    _createClass(WarpPostFxPipeline, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        var frequency = GetValue(o, 'frequency', 10);
        this.setFrequency(GetValue(o, 'frequencyX', frequency), GetValue(o, 'frequencyY', frequency));
        var amplitude = GetValue(o, 'amplitude', 10);
        this.setAmplitude(GetValue(o, 'amplitudeX', amplitude), GetValue(o, 'amplitudeY', amplitude));
        var progress = GetValue(o, 'progress', 0);
        this.setProgress(GetValue(o, 'progressX', progress), GetValue(o, 'progressY', progress));
        return this;
      }
    }, {
      key: "onPreRender",
      value: function onPreRender() {
        this.set2f('frequency', this.frequencyX, this.frequencyY);
        this.set2f('amplitude', this.amplitudeX, this.amplitudeY);
        this.set2f('progress', this.progressX * PI2, this.progressY * PI2);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
      } // frequencyX

    }, {
      key: "setFrequencyX",
      value: function setFrequencyX(value) {
        this.frequencyX = value;
        return this;
      } // frequencyY

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
      } // amplitudeX

    }, {
      key: "setAmplitudeX",
      value: function setAmplitudeX(value) {
        this.amplitudeX = value;
        return this;
      } // amplitudeY

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
      } // progress

    }, {
      key: "setProgressX",
      value: function setProgressX(value) {
        this.progressX = value;
        return this;
      }
    }, {
      key: "setProgressY",
      value: function setProgressY(value) {
        this.progressY = value;
        return this;
      }
    }, {
      key: "setProgress",
      value: function setProgress(x, y) {
        if (y === undefined) {
          y = x;
        }

        this.progressX = x;
        this.progressY = y;
        return this;
      }
    }, {
      key: "progress",
      get: function get() {
        return (this.progressX + this.progressY) / 2;
      },
      set: function set(value) {
        this.progressX = value;
        this.progressY = value;
      }
    }]);

    return WarpPostFxPipeline;
  }(PostFXPipeline);

  var WarpPostFxPipelineController = /*#__PURE__*/function (_BasePostFxPipelineCo) {
    _inherits(WarpPostFxPipelineController, _BasePostFxPipelineCo);

    var _super = _createSuper(WarpPostFxPipelineController);

    function WarpPostFxPipelineController() {
      _classCallCheck(this, WarpPostFxPipelineController);

      return _super.apply(this, arguments);
    }

    return _createClass(WarpPostFxPipelineController);
  }(PostFxPipelineControllerBase(WarpPostFxPipeline));

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
    } // no object


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
        keys = keys.split(delimiter);
      }

      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }

    return target;
  };

  var WarpPipelineControllerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(WarpPipelineControllerPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(WarpPipelineControllerPlugin);

    function WarpPipelineControllerPlugin(pluginManager) {
      _classCallCheck(this, WarpPipelineControllerPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(WarpPipelineControllerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new WarpPostFxPipelineController(gameObject, config);
      }
    }]);

    return WarpPipelineControllerPlugin;
  }(Phaser.Plugins.BasePlugin);

  SetValue(window, 'RexPlugins.Pipelines.WarpPostFxPipelineController', WarpPostFxPipelineController);

  return WarpPipelineControllerPlugin;

}));
