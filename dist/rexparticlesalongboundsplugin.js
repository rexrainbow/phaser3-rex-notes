(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexparticlesalongboundsplugin = factory());
}(this, (function () { 'use strict';

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

  var PreUpdate$1 = Phaser.GameObjects.Particles.ParticleEmitterManager.prototype.preUpdate;

  var CreateParticles = function CreateParticles(gameObject) {
    var particles = gameObject.scene.add.particles(); // Override preUpdate, sync properties of particles to game object

    particles.preUpdate = function (time, delta) {
      if (!gameObject.scene) {
        // gameObject has been destroyed
        this.destroy();
        return;
      } // Sync to gameObject


      SyncTo.call(this, gameObject);
      PreUpdate$1.call(this, time, delta);
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

  var GetValue$4 = Phaser.Utils.Objects.GetValue;

  var GetBoundsConfig = function GetBoundsConfig(config, out) {
    if (out === undefined) {
      out = {};
    }

    if (typeof config === 'number') {
      out.left = config;
      out.right = config;
      out.top = config;
      out.bottom = config;
    } else {
      out.left = GetValue$4(config, 'left', 0);
      out.right = GetValue$4(config, 'right', 0);
      out.top = GetValue$4(config, 'top', 0);
      out.bottom = GetValue$4(config, 'bottom', 0);
    }

    return out;
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var GetValue$3 = Phaser.Utils.Objects.GetValue;

  var BoundsToPoints = function BoundsToPoints(gameObject, config) {
    if (globRect === undefined) {
      globRect = new Rectangle();
    }

    globPadding = GetBoundsConfig(GetValue$3(config, 'padding', 0), globPadding);
    var w = gameObject.width,
        h = gameObject.height;
    var x = -w / 2 - globPadding.left,
        y = -h / 2 - globPadding.top;
    w += globPadding.left + globPadding.right;
    h += globPadding.top + globPadding.bottom;
    globRect.setTo(x, y, w, h);
    var stepRate = GetValue$3(config, 'stepRate', 10);
    var points = globRect.getPoints(0, stepRate);
    return points; // Return new point array
  };

  var globRect;
  var globPadding;

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var TickTime = 1000 / 60;

  var CreateEmitterConfig = function CreateEmitterConfig(config) {
    var points = BoundsToPoints(config.gameObject, config);
    var emitterConfig = {
      blendMode: GetValue$2(config, 'blendMode', 'ADD'),
      emitZone: {
        type: 'edge',
        source: {
          getPoints: function getPoints() {
            return points;
          }
        },
        yoyo: GetValue$2(config, 'yoyo', false)
      },
      speed: GetValue$2(config, 'spread', 10)
    }; // Set lifespan

    var lifespan = GetValue$2(config, 'lifespan', 1000);
    emitterConfig.lifespan = lifespan; // Set quantity or frequency

    var duration = GetValue$2(config, 'duration', undefined);

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
    } // Set texture frame


    var textureFrames = GetValue$2(config, 'textureFrames', undefined);

    if (textureFrames) {
      emitterConfig.frame = {
        frames: textureFrames,
        cycle: GetValue$2(config, 'textureFrameCycle', true)
      };
    } // Set scale


    var scale = GetValue$2(config, 'scale', undefined);

    if (scale !== undefined) {
      emitterConfig.scale = scale;
    } // Set alpha


    var alpha = GetValue$2(config, 'alpha', undefined);

    if (alpha !== undefined) {
      emitterConfig.alpha = alpha;
    } // Set tint


    var tint = GetValue$2(config, 'tint', undefined);

    if (tint !== undefined) {
      emitterConfig.tint = tint;
    }

    return emitterConfig;
  };

  var Override = function Override(newCallback, newScope, oldCallback, oldScope, insertBefore) {
    if (insertBefore === undefined) {
      insertBefore = false;
    }

    if (oldCallback) {
      if (insertBefore) {
        return function () {
          newCallback.apply(newScope, arguments);
          oldCallback.apply(oldScope, arguments);
        };
      } else {
        return function () {
          oldCallback.apply(oldScope, arguments);
          newCallback.apply(newScope, arguments);
        };
      }
    } else {
      return newCallback.bind(newScope);
    }
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var BuildRepeatEdgeEmitter = function BuildRepeatEdgeEmitter(emitter, config) {
    // On particle fire
    var repeat = 1 + GetValue$1(config, 'repeat', 0);
    var repeatCount = 0;

    var emitCallback = function emitCallback() {
      if (emitter.emitZone.counter === 0) {
        if (repeatCount === repeat) {
          emitter.emitZone.counter = -1; // Reset to initial value

          repeatCount = 0;
          emitter.stop();
        } else {
          repeatCount++;
        }
      }
    };

    emitter.emitCallback = Override(emitCallback, undefined, emitter.emitCallback, emitter.emitCallbackScope);
    emitter.emitCallbackScope = null; // On particle death

    var deathCallback = function deathCallback() {
      if (emitter.alive.length === 0) {
        var particles = emitter.manager;
        particles.emit('emitter.complete', particles, emitter);
      }
    };

    emitter.deathCallback = Override(deathCallback, undefined, emitter.deathCallback, emitter.deathCallbackScope);
    emitter.deathCallbackScope = null;
    return emitter;
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Vector2 = Phaser.Math.Vector2;
  var PreUpdate = Phaser.GameObjects.Particles.ParticleEmitter.prototype.preUpdate;

  var CreateEmitter = function CreateEmitter(particles, config) {
    var emitter = particles.createEmitter(CreateEmitterConfig(config));
    BuildRepeatEdgeEmitter(emitter, config);
    particles.isRunning = true;
    var reuse = GetValue(config, 'reuse', false);
    particles.once('emitter.complete', function () {
      particles.isRunning = false;
      particles.removeEmitter(emitter);
      emitter = null;
      particles.emit('complete', config.gameObject, particles);

      if (!reuse) {
        particles.destroy();
        particles = null;
      }
    }); // Override preUpdate, rotate gravity of game object is rotated

    var gravityX = GetValue(config, 'gravityX', 0);
    var gravityY = GetValue(config, 'gravityY', 0);

    if (gravityX !== 0 || gravityY !== 0) {
      var gravityVector = new Vector2();
      var gameObject = config.gameObject;

      emitter.preUpdate = function (time, delta) {
        var localGravityX, localGravityY;

        if (gameObject.rotation !== 0) {
          gravityVector.setTo(gravityX, gravityY).rotate(-gameObject.rotation);
          localGravityX = gravityVector.x;
          localGravityY = gravityVector.y;
        } else {
          localGravityX = gravityX;
          localGravityY = gravityY;
        }

        emitter.setGravity(localGravityX, localGravityY);
        PreUpdate.call(this, time, delta);
      }.bind(emitter);
    }

    return emitter;
  };

  var ParticlesAlongBounds = function ParticlesAlongBounds(gameObject, config, particles) {
    if (config === undefined) {
      config = {};
    } // Create particles


    if (particles === undefined || !particles.scene) {
      particles = CreateParticles(gameObject);
    }

    particles.setTexture(config.textureKey); // Create emitter

    config.gameObject = gameObject;
    CreateEmitter(particles, config);
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
      value: function startEffect(gamObject, config, particles) {
        return ParticlesAlongBounds(gamObject, config, particles);
      }
    }]);

    return ParticlesAlongBoundsPlugin;
  }(Phaser.Plugins.BasePlugin);

  return ParticlesAlongBoundsPlugin;

})));
