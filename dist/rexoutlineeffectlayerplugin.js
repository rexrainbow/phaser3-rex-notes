(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexoutlineeffectlayerplugin = factory());
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

  var NearestPowerOf2 = function NearestPowerOf2(value) {
    value--;
    value |= value >> 1;
    value |= value >> 2;
    value |= value >> 4;
    value |= value >> 8;
    value |= value >> 16;
    value++;
    return value;
  };

  var Shader = Phaser.GameObjects.Shader;
  var AddItem = Phaser.Utils.Array.Add;
  var RemoveItem = Phaser.Utils.Array.Remove;
  var EffectLayer = /*#__PURE__*/function (_Shader) {
    _inherits(EffectLayer, _Shader);
    function EffectLayer(scene, key, x, y, width, height) {
      var _this;
      _classCallCheck(this, EffectLayer);
      // gameObjects -> render-texture -> shader

      if (_typeof(x) === 'object') {
        var config = x;
        x = config.x;
        y = config.y;
        width = config.width;
        height = config.height;
      }
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = scene.sys.scale.width;
      }
      if (height === undefined) {
        height = scene.sys.scale.height;
      }

      // render-texture -> shader
      width = NearestPowerOf2(width);
      height = NearestPowerOf2(height);
      var rt = scene.make.renderTexture({
        x: x,
        y: y,
        width: width,
        height: height,
        add: false
      });
      _this = _callSuper(this, EffectLayer, [scene, key, x, y, width, height]);
      _this.type = 'rexEffectLayer';
      _this.setSampler2DBuffer('iChannel0', rt.frame.glTexture, width, height, 0).setScrollFactor(0).setOrigin(0);
      _this.rt = rt;
      _this.children = [];
      _this.boot();
      return _this;
    }
    _createClass(EffectLayer, [{
      key: "boot",
      value: function boot() {
        this.scene.game.events.on('prerender', this.drawTargets, this);
        this.scene.sys.scale.on('resize', this.onWindowResize, this);
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        this.scene.game.events.off('prerender', this.drawTargets, this);
        this.scene.sys.scale.off('resize', this.onWindowResize, this);
        // Private texture will be removed by shader game object
        this.clear();
        _get(_getPrototypeOf(EffectLayer.prototype), "destroy", this).call(this, fromScene);
        this.rt.destroy(fromScene);
        this.rt = null;
      }
    }, {
      key: "drawTargets",
      value: function drawTargets() {
        // Assume that game objects are displayed on main camera.
        var camera = this.scene.sys.cameras.main;
        var offsetX = camera.scrollX + this.x;
        var offsetY = camera.scrollY + this.y;
        var rt = this.rt;
        rt.clear();
        var child;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
          child = this.children[i];
          rt.draw(child, child.x - offsetX, child.y - offsetY);
        }
      }
    }, {
      key: "set1f",
      value: function set1f(key, value) {
        this.setUniform("".concat(key, ".value"), value);
        return this;
      }
    }, {
      key: "set2f",
      value: function set2f(key, x, y) {
        this.setUniform("".concat(key, ".value.x"), x);
        this.setUniform("".concat(key, ".value.y"), y);
        return this;
      }
    }, {
      key: "set3f",
      value: function set3f(key, x, y, z) {
        this.setUniform("".concat(key, ".value.x"), x);
        this.setUniform("".concat(key, ".value.y"), y);
        this.setUniform("".concat(key, ".value.z"), z);
        return this;
      }
    }, {
      key: "setFloat4",
      value: function setFloat4(key, x, y, z, w) {
        this.setUniform("".concat(key, ".value.x"), x);
        this.setUniform("".concat(key, ".value.y"), y);
        this.setUniform("".concat(key, ".value.z"), z);
        this.setUniform("".concat(key, ".value.w"), w);
        return this;
      }
    }, {
      key: "contains",
      value: function contains(gameObject) {
        return this.children.indexOf(gameObject) !== -1;
      }
    }, {
      key: "add",
      value: function add(gameObjects) {
        AddItem(this.children, gameObjects, 0,
        // Callback of item added
        function (gameObject) {
          gameObject.once('destroy', this.onChildDestroy, this);
        }, this);
        return this;
      }
    }, {
      key: "remove",
      value: function remove(gameObjects, destroyChild) {
        if (destroyChild === undefined) {
          destroyChild = false;
        }
        RemoveItem(this.children, gameObjects,
        // Callback of item removed
        function (gameObject) {
          gameObject.off('destroy', this.onChildDestroy, this);
          if (destroyChild) {
            gameObject.destroy();
          }
        });
        return this;
      }
    }, {
      key: "clear",
      value: function clear(destroyChild) {
        var gameObject;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
          gameObject = this.children[i];
          gameObject.off('destroy', this.onChildDestroy, this);
          if (destroyChild) {
            gameObject.destroy();
          }
        }
        this.children.length = 0;
        return this;
      }
    }, {
      key: "onChildDestroy",
      value: function onChildDestroy(child, fromScene) {
        this.remove(child, !fromScene);
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        width = NearestPowerOf2(width);
        height = NearestPowerOf2(height);
        var rt = this.rt;

        // Set size of render texture
        rt.setSize(width, height);
        this.setSampler2DBuffer('iChannel0', rt.frame.glTexture, width, height, 0);

        // Set size of shader
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "onWindowResize",
      value: function onWindowResize() {
        // Get new window size
        var width = this.scene.sys.scale.width;
        var height = this.scene.sys.scale.height;
        this.resize(width, height);
      }
    }]);
    return EffectLayer;
  }(Shader);

  // Reference: https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag

  var frag = "\n#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define highmedp highp\n#else\n#define highmedp mediump\n#endif\nprecision highmedp float;\n\n// Scene buffer\nuniform sampler2D iChannel0; \nvarying vec2 fragCoord;\nuniform vec2 resolution;\n\n// Effect parameters\nuniform bool knockout;\nuniform vec2 thickness;\nuniform vec3 outlineColor; // (0, 0, 0);\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main() {\n  vec2 uv = fragCoord / resolution;\n  if ((thickness.x > 0.0) || (thickness.y > 0.0)) {\n    vec4 front = texture2D(iChannel0, uv);\n    vec2 mag = thickness/resolution;\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 offset;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += #{angleStep}) {\n        offset = vec2(mag.x * cos(angle), mag.y * sin(angle));        \n        curColor = texture2D(iChannel0, uv + offset);\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, front.a);\n    vec4 resultColor = vec4((front.rgb + (outlineColor.rgb * (1. - front.a) * resultAlpha)), resultAlpha);\n\n    if (knockout && (resultColor == front)) {\n      gl_FragColor = vec4(0);\n    } else {\n      gl_FragColor = resultColor;\n    }\n\n  } else {\n    if (knockout) {\n      gl_FragColor = vec4(0);\n    } else {\n      gl_FragColor = texture2D(iChannel0, uv);\n    }\n\n  }\n\n}";
  var MAX_SAMPLES = 100;
  var MIN_SAMPLES = 1;
  function GetFrag(_ref) {
    var _ref$quality = _ref.quality,
      quality = _ref$quality === void 0 ? 0.1 : _ref$quality;
    var samples = Math.max(quality * MAX_SAMPLES, MIN_SAMPLES);
    var angleStep = (Math.PI * 2 / samples).toFixed(7);
    return frag.replace(/\#\{angleStep\}/, angleStep);
  }

  var BaseShader = Phaser.Display.BaseShader;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
  var Color = Phaser.Display.Color;
  var OutlineEffectLayer = /*#__PURE__*/function (_EffectLayer) {
    _inherits(OutlineEffectLayer, _EffectLayer);
    function OutlineEffectLayer(scene, config) {
      var _this;
      _classCallCheck(this, OutlineEffectLayer);
      if (config === undefined) {
        config = {};
      }

      // Note: quality can't be changed during runtime
      var frag = GetFrag(config); // GLSL shader
      var uniforms = {
        knockout: {
          type: '1f',
          value: true
        },
        thickness: {
          type: '2f',
          value: {
            x: 0,
            y: 0
          }
        },
        outlineColor: {
          type: '3f',
          value: {
            x: 0,
            y: 0,
            z: 0
          }
        }
      };
      var baseShader = new BaseShader('Outline', frag, undefined, uniforms);
      _this = _callSuper(this, OutlineEffectLayer, [scene, baseShader, config]);
      _this.type = 'rexOutlineEffectLayer';
      _this._knockout = 0;
      _this._thickness = 0;
      _this._outlineColor = new Color();
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(OutlineEffectLayer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setKnockout(GetValue(o, 'knockout', false));
        this.setThickness(GetValue(o, 'thickness', 3));
        this.setOutlineColor(GetValue(o, 'outlineColor', 0xffffff));
        return this;
      }

      // knockout
    }, {
      key: "knockout",
      get: function get() {
        return this._knockout;
      },
      set: function set(value) {
        value = !!value;
        if (this._knockout === value) {
          return;
        }
        this._knockout = value;
        this.set1f('knockout', value);
      }
    }, {
      key: "setKnockout",
      value: function setKnockout(value) {
        this.knockout = value;
        return this;
      }

      // thickness
    }, {
      key: "thickness",
      get: function get() {
        return this._thickness;
      },
      set: function set(value) {
        if (this._thickness === value) {
          return;
        }
        this._thickness = value;
        this.set2f('thickness', value, value);
      }
    }, {
      key: "setThickness",
      value: function setThickness(value) {
        this.thickness = value;
        return this;
      }

      // outlineColor
    }, {
      key: "outlineColor",
      get: function get() {
        return this._outlineColor;
      },
      set: function set(value) {
        if (typeof value === 'number') {
          value = IntegerToRGB(value);
        }
        // value: {r, g, b}
        var color = this._outlineColor;
        color.setFromRGB(value);
        this.set3f('outlineColor', color.redGL, color.greenGL, color.blueGL);
      }
    }, {
      key: "setOutlineColor",
      value: function setOutlineColor(value) {
        this.outlineColor = value;
        return this;
      }
    }]);
    return OutlineEffectLayer;
  }(EffectLayer);

  function Factory (config) {
    var gameObject = new OutlineEffectLayer(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  function Creator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var gameObject = new OutlineEffectLayer(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

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

  var OutlineEffectLayerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(OutlineEffectLayerPlugin, _Phaser$Plugins$BaseP);
    function OutlineEffectLayerPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, OutlineEffectLayerPlugin);
      _this = _callSuper(this, OutlineEffectLayerPlugin, [pluginManager]);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexOutlineEffectLayer', Factory, Creator);
      return _this;
    }
    _createClass(OutlineEffectLayerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return OutlineEffectLayerPlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.OutlineEffectLayer', OutlineEffectLayer);

  return OutlineEffectLayerPlugin;

}));
