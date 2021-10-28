(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexpersistenceeffectplugin = factory());
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

  var Blitter = Phaser.GameObjects.Blitter;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var PersistenceEffect = /*#__PURE__*/function (_Blitter) {
    _inherits(PersistenceEffect, _Blitter);

    var _super = _createSuper(PersistenceEffect);

    function PersistenceEffect(scene, texture, frame, config) {
      var _this;

      _classCallCheck(this, PersistenceEffect);

      if (IsPlainObject(texture)) {
        config = texture;
        texture = GetValue(config, 'key', undefined);
        frame = GetValue(config, 'frame', undefined);
      } else if (IsPlainObject(frame)) {
        config = frame;
        frame = GetValue(config, 'frame', undefined);
      }

      _this = _super.call(this, scene, 0, 0, texture, frame);
      _this.reuseBob = GetValue(config, 'reuseBob', true);

      _this.setDefaultLifeSpan(GetValue(config, 'lifespan', 1000));

      _this.setDefaultAlphaStart(GetValue(config, 'alphaStart', 1));

      _this.aliveCount = 0;
      return _this;
    }

    _createClass(PersistenceEffect, [{
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        this.fadeOutBobs(time, delta);
      }
    }, {
      key: "fadeOutBobs",
      value: function fadeOutBobs(time, delta) {
        if (this.aliveCount === 0) {
          return;
        }

        var bobs = this.children.list;
        var bob, data;

        for (var i = bobs.length - 1; i >= 0; i--) {
          // From last to first
          bob = bobs[i]; // Skip dead bob    

          if (this.reuseBob && !bob.visible) {
            continue;
          }

          data = bob.data;
          data.lifeCurr -= delta;

          if (data.lifeCurr <= 0) {
            // Kill bob
            if (this.reuseBob) {
              bob.alpha = 0;
              bob.visible = false;
            } else {
              bob.destroy();
            }

            this.aliveCount--;
          } else {
            bob.alpha = data.alphaStart * (data.lifeCurr / data.life);
          }
        }
      }
    }, {
      key: "setDefaultLifeSpan",
      value: function setDefaultLifeSpan(lifespan) {
        this.lifespan = lifespan;
        return this;
      }
    }, {
      key: "setDefaultAlphaStart",
      value: function setDefaultAlphaStart(alphaStart) {
        this.alphaStart = alphaStart;
        return this;
      }
    }, {
      key: "paste",
      value: function paste(x, y, lifespan, alphaStart, frame) {
        if (lifespan === undefined) {
          lifespan = this.lifespan;
        }

        if (alphaStart === undefined) {
          alphaStart = this.alphaStart;
        }

        var bob;

        if (this.reuseBob) {
          bob = this.children.getFirst('visible', false); // Get first dead bob
        }

        if (bob) {
          this.children.bringToTop(bob);
          bob.reset(x, y, frame);
        } else {
          bob = this.create(x, y, frame);
        }

        bob.alpha = alphaStart;
        this.aliveCount++;
        var data = bob.data;
        data.life = lifespan;
        data.lifeCurr = lifespan;
        data.alphaStart = alphaStart;
        return this;
      }
    }]);

    return PersistenceEffect;
  }(Blitter);

  function Factory (texture, frame, config) {
    var gameObject = new PersistenceEffect(this.scene, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function Creator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }

    if (addToScene !== undefined) {
      config.add = addToScene;
    }

    var gameObject = new PersistenceEffect(this.scene, config);
    BuildGameObject(this.scene, gameObject, config);
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

  var PersistenceEffectPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(PersistenceEffectPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(PersistenceEffectPlugin);

    function PersistenceEffectPlugin(pluginManager) {
      var _this;

      _classCallCheck(this, PersistenceEffectPlugin);

      _this = _super.call(this, pluginManager); //  Register our new Game Object type

      pluginManager.registerGameObject('rexPersistenceEffect', Factory, Creator);
      return _this;
    }

    _createClass(PersistenceEffectPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);

    return PersistenceEffectPlugin;
  }(Phaser.Plugins.BasePlugin);

  SetValue(window, 'RexPlugins.GameObjects.PersistenceEffect', PersistenceEffect);

  return PersistenceEffectPlugin;

})));
