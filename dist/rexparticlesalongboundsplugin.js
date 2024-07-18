(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexparticlesalongboundsplugin = factory());
})(this, (function () { 'use strict';

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    var GetBoundsConfig = function (config, out) {
        if (config === undefined) {
            config = 0;
        }
        if (out === undefined) {
            out = {};
        }

        if (typeof (config) === 'number') {
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

    const Rectangle = Phaser.Geom.Rectangle;
    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    var BoundsToPoints = function (gameObject, config) {
        if (globRect === undefined) {
            globRect = new Rectangle();
        }

        globPadding = GetBoundsConfig(GetValue$2(config, 'padding', 0), globPadding);
        var w = gameObject.width,
            h = gameObject.height;
        var x = (-w / 2) - globPadding.left,
            y = (-h / 2) - globPadding.top;
        w += globPadding.left + globPadding.right;
        h += globPadding.top + globPadding.bottom;
        globRect.setTo(x, y, w, h);
        var stepRate = GetValue$2(config, 'stepRate', 10);
        var points = globRect.getPoints(0, stepRate);
        return points; // Return new point array
    };

    var globRect;
    var globPadding;

    const GetValue$1 = Phaser.Utils.Objects.GetValue;
    const TickTime = (1000 / 60);

    var CreateEmitterConfig = function (gameObject, config) {
        var points = BoundsToPoints(gameObject, config);
        var emitterConfig = {
            blendMode: GetValue$1(config, 'blendMode', 'ADD'),
            emitZone: {
                type: 'edge',
                source: {
                    getPoints: function () {
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
            if (lastDelay <= 0) { // Fire all particles at beginning
                emitterConfig.quantity = points.length;
            } else {
                var delayPerParticle = lastDelay / points.length;
                if (delayPerParticle <= TickTime) { // Fire more then 1 particle per tick
                    emitterConfig.quantity = Math.ceil(TickTime / delayPerParticle);
                } else { // Not fire 1 particle per tick, set frequency
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

    const PreUpdate = Phaser.GameObjects.Particles.ParticleEmitter.prototype.preUpdate;
    const GetValue = Phaser.Utils.Objects.GetValue;
    const Vector2 = Phaser.Math.Vector2;

    var SyncToGameObject = function (particles, gameObject, config) {
        var gravityX = GetValue(config, 'gravityX', 0);
        var gravityY = GetValue(config, 'gravityY', 0);
        var hasGravity = (gravityX !== 0) || (gravityY !== 0);

        // Override update, sync properties of particles to game object
        particles.preUpdate = (function (delta, step, processors) {
            if (!gameObject.scene) { // gameObject has been destroyed
                this.destroy();
                return;
            }

            // Sync to gameObject
            SyncTo.call(particles, gameObject);

            if (hasGravity) {
                var localGravityX, localGravityY;
                if (gameObject.rotation !== 0) {
                    var gravityVector = new Vector2();
                    gravityVector
                        .setTo(gravityX, gravityY)
                        .rotate(-gameObject.rotation);
                    localGravityX = gravityVector.x;
                    localGravityY = gravityVector.y;
                } else {
                    localGravityX = gravityX;
                    localGravityY = gravityY;
                }
                particles.setParticleGravity(localGravityX, localGravityY);
            }

            PreUpdate.call(particles, delta, step, processors);
        }).bind(particles);

        return particles;
    };

    var SyncTo = function (gameObject) {
        if (globPoint === undefined) {
            globPoint = { x: 0, y: 0 };
        }
        gameObject.getCenter(globPoint);
        this
            .setPosition(globPoint.x, globPoint.y)
            .setScale(gameObject.scaleX, gameObject.scaleY)
            .setAngle(gameObject.angle)
            .setAlpha(gameObject.alpha);

        if (this.depth !== gameObject.depth) {
            this.setDepth(gameObject.depth);
        }
    };

    var globPoint;

    var ParticlesAlongBounds = function (gameObject, config) {
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

    class ParticlesAlongBoundsPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        startEffect(gamObject, config) {
            return ParticlesAlongBounds(gamObject, config);
        }
    }

    return ParticlesAlongBoundsPlugin;

}));
