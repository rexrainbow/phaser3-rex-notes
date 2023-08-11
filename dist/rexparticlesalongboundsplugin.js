(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexparticlesalongboundsplugin = factory());
})(this, (function () { 'use strict';

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
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var GetBoundsConfig = function GetBoundsConfig(config, out) {
    if (config === undefined) {
      config = 0;
    }
    if (out === undefined) {
      out = {};
    }
    if (typeof config === 'number') {
      out.left = config;
      out.right = config;
      out.top = config;
      out.bottom = config;
    } else {
      out.left = GetValue$3(config, 'left', 0);
      out.right = GetValue$3(config, 'right', 0);
      out.top = GetValue$3(config, 'top', 0);
      out.bottom = GetValue$3(config, 'bottom', 0);
    }
    return out;
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var BoundsToPoints = function BoundsToPoints(gameObject, config) {
    if (globRect === undefined) {
      globRect = new Rectangle();
    }
    globPadding = GetBoundsConfig(GetValue$2(config, 'padding', 0), globPadding);
    var w = gameObject.width,
      h = gameObject.height;
    var x = -w / 2 - globPadding.left,
      y = -h / 2 - globPadding.top;
    w += globPadding.left + globPadding.right;
    h += globPadding.top + globPadding.bottom;
    globRect.setTo(x, y, w, h);
    var stepRate = GetValue$2(config, 'stepRate', 10);
    var points = globRect.getPoints(0, stepRate);
    return points; // Return new point array
  };

  var globRect;
  var globPadding;

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var TickTime = 1000 / 60;
  var CreateEmitterConfig = function CreateEmitterConfig(gameObject, config) {
    var points = BoundsToPoints(gameObject, config);
    var emitterConfig = {
      blendMode: GetValue$1(config, 'blendMode', 'ADD'),
      emitZone: {
        type: 'edge',
        source: {
          getPoints: function getPoints() {
            return points;
          }
        },
        yoyo: GetValue$1(config, 'yoyo', false)
      },
      speed: GetValue$1(config, 'spread', 10)
    };

    // Set lifespan
    var lifespan = GetValue$1(config, 'lifespan', 1000);
    emitterConfig.lifespan = lifespan;
    // Set quantity or frequency
    var duration = GetValue$1(config, 'duration', undefined);
    if (duration !== undefined) {
      var lastDelay = duration - lifespan;
      if (lastDelay <= 0) {
        // Fire all particles at beginning
        emitterConfig.quantity = points.length;
      } else {
        var delayPerParticle = lastDelay / points.length;
        if (delayPerParticle <= TickTime) {
          // Fire more then 1 particle per tick
          emitterConfig.quantity = Math.ceil(TickTime / delayPerParticle);
        } else {
          // Not fire 1 particle per tick, set frequency
          emitterConfig.frequency = delayPerParticle;
        }
      }
    }

    // stopAfter
    var repeat = 1 + GetValue$1(config, 'repeat', 0);
    var totalParticleCount = repeat * points.length;
    if (emitterConfig.hasOwnProperty('frequency')) {
      // Can't use 'stopAfter' in this case
      emitterConfig.emitCallback = function (particle, emitter) {
        totalParticleCount -= 1;
        if (totalParticleCount <= 0) {
          emitter.stop();
        }
      };
    } else {
      emitterConfig.stopAfter = totalParticleCount;
    }

    // Set texture frame
    var textureFrames = GetValue$1(config, 'textureFrames', undefined);
    if (textureFrames) {
      emitterConfig.frame = {
        frames: textureFrames,
        cycle: GetValue$1(config, 'textureFrameCycle', true)
      };
    }

    // Set scale
    var scale = GetValue$1(config, 'scale', undefined);
    if (scale !== undefined) {
      emitterConfig.scale = scale;
    }

    // Set alpha
    var alpha = GetValue$1(config, 'alpha', undefined);
    if (alpha !== undefined) {
      emitterConfig.alpha = alpha;
    }

    // Set tint
    var tint = GetValue$1(config, 'tint', undefined);
    if (tint !== undefined) {
      emitterConfig.tint = tint;
    }
    return emitterConfig;
  };

  var PreUpdate = Phaser.GameObjects.Particles.ParticleEmitter.prototype.preUpdate;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var Vector2 = Phaser.Math.Vector2;
  var SyncToGameObject = function SyncToGameObject(particles, gameObject, config) {
    var gravityX = GetValue(config, 'gravityX', 0);
    var gravityY = GetValue(config, 'gravityY', 0);
    var hasGravity = gravityX !== 0 || gravityY !== 0;

    // Override update, sync properties of particles to game object
    particles.preUpdate = function (delta, step, processors) {
      if (!gameObject.scene) {
        // gameObject has been destroyed
        this.destroy();
        return;
      }

      // Sync to gameObject
      SyncTo.call(particles, gameObject);
      if (hasGravity) {
        var localGravityX, localGravityY;
        if (gameObject.rotation !== 0) {
          var gravityVector = new Vector2();
          gravityVector.setTo(gravityX, gravityY).rotate(-gameObject.rotation);
          localGravityX = gravityVector.x;
          localGravityY = gravityVector.y;
        } else {
          localGravityX = gravityX;
          localGravityY = gravityY;
        }
        particles.setParticleGravity(localGravityX, localGravityY);
      }
      PreUpdate.call(particles, delta, step, processors);
    }.bind(particles);
    return particles;
  };
  var SyncTo = function SyncTo(gameObject) {
    if (globPoint === undefined) {
      globPoint = {
        x: 0,
        y: 0
      };
    }
    gameObject.getCenter(globPoint);
    this.setPosition(globPoint.x, globPoint.y).setScale(gameObject.scaleX, gameObject.scaleY).setAngle(gameObject.angle).setAlpha(gameObject.alpha);
    if (this.depth !== gameObject.depth) {
      this.setDepth(gameObject.depth);
    }
  };
  var globPoint;

  var ParticlesAlongBounds = function ParticlesAlongBounds(gameObject, config) {
    if (config === undefined) {
      config = {};
    }
    var emitterConfig = CreateEmitterConfig(gameObject, config);
    var particles = gameObject.scene.add.particles(0, 0, config.textureKey, emitterConfig);
    SyncToGameObject(particles, gameObject, config);
    particles.once('complete', function () {
      particles.destroy();
    });
    return particles;
  };

  var ParticlesAlongBoundsPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(ParticlesAlongBoundsPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(ParticlesAlongBoundsPlugin);
    function ParticlesAlongBoundsPlugin(pluginManager) {
      _classCallCheck(this, ParticlesAlongBoundsPlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(ParticlesAlongBoundsPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "startEffect",
      value: function startEffect(gamObject, config) {
        return ParticlesAlongBounds(gamObject, config);
      }
    }]);
    return ParticlesAlongBoundsPlugin;
  }(Phaser.Plugins.BasePlugin);

  return ParticlesAlongBoundsPlugin;

}));
