const GetValue = Phaser.Utils.Objects.GetValue;
const TickTime = (1000 / 60);

var ParticlesAloneBounds = function (gameObject, config, particles) {
    if ((particles === undefined) || (!particles.scene)) {
        particles = CreateParticles(gameObject);
    }
    particles.setTexture(config.textureKey);
    var reuse = GetValue(config, 'reuse', false);
    var points = BoundsToPoints(gameObject, config);
    var lifespan = GetValue(config, 'lifespan', 1000);
    var emitterConfig = {
        blendMode: GetValue(config, 'blendMode', 'ADD'),
        lifespan: lifespan,
        emitZone: {
            type: 'edge',
            source: {
                getPoints: function () {
                    return points;
                }
            },
            yoyo: GetValue(config, 'yoyo', false)
        },
        speed: GetValue(config, 'spread', 10)
    };

    // Set quantity or frequency of emitterConfig
    var duration = GetValue(config, 'duration', undefined);
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

    // Set texture frame of emitterConfig
    var textureFrames = GetValue(config, 'textureFrames');
    if (textureFrames) {
        emitterConfig.frame = {
            frames: textureFrames,
            cycle: GetValue(config, 'textureFrameCycle', true)
        }
    }
    // Set scale of emitterConfig
    var scale = GetValue(config, 'scale', undefined);
    if (scale !== undefined) {
        emitterConfig.scale = scale;
    }
    // Set alpha of emitterConfig
    var alpha = GetValue(config, 'alpha', undefined);
    if (alpha !== undefined) {
        emitterConfig.alpha = alpha;
    }

    var repeatCount = GetValue(config, 'repeat', 1);
    var emitter = particles.createEmitter(emitterConfig)
        .onParticleEmit(function () {
            if (emitter.emitZone.counter === 0) {
                if (repeatCount === 0) {
                    emitter.stop();
                } else {
                    repeatCount--;
                }
            }
        })
        .onParticleDeath(function () {
            if (emitter.alive.length === 0) {
                particles.emit('complete');
                particles.removeEmitter(emitter);

                if (!reuse) {
                    particles.destroy();
                    particles = undefined;
                }
            }
        })

    return particles;
}

const PreUpdate = Phaser.GameObjects.Particles.ParticleEmitterManager.prototype.preUpdate;
var CreateParticles = function (gameObject) {
    var particles = gameObject.scene.add.particles();
    particles.preUpdate = (function (time, delta) {
        if (!gameObject.scene) { // gameObject has been destroyed
            this.destroy();
            return;
        }
        // Sync to gameObject
        SyncTo.call(this, gameObject);
        PreUpdate.call(this, time, delta);
    }).bind(particles);

    return particles;
}

var SyncTo = function (gameObject) {
    if (globPoint === undefined) {
        globPoint = { x: 0, y: 0 };
    }
    gameObject.getCenter(globPoint);
    this
        .setPosition(globPoint.x, globPoint.y)
        .setScale(gameObject.scaleX, gameObject.scaleY)
        .setAngle(gameObject.angle)

    if (this.depth !== gameObject.depth) {
        this.setDepth(gameObject.depth);
    }
}

var BoundsToPoints = function (gameObject, config) {
    if (globRect === undefined) {
        globRect = new Phaser.Geom.Rectangle();
    }
    var w = gameObject.width,
        h = gameObject.height;
    globRect.setTo((-w / 2), (-h / 2), w, h);
    var quantity = GetValue(config, 'quantity', 0);
    var stepRate = (quantity > 0) ? 0 : GetValue(config, 'stepRate', 10);
    var points = globRect.getPoints(quantity, stepRate);
    return points;
}

var globRect;
var globPoint;

export default ParticlesAloneBounds;