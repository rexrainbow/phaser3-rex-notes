const GetValue = Phaser.Utils.Objects.GetValue;

var ParticlesAloneBounds = function (gameObject, config, particles) {
    if (globRect === undefined) {
        globRect = new Phaser.Geom.Rectangle();
    }
    var w = gameObject.width,
        h = gameObject.height;
    globRect.setTo((-w / 2), (-h / 2), w, h);

    if (particles === undefined) {
        particles = CreateParticles(gameObject);
    }
    particles.setTexture(config.textureKey);
    var reuse = GetValue(config, 'reuse', true);

    var quantity = GetValue(config, 'quantity', 0);
    var stepRate = (quantity > 0) ? 0 : GetValue(config, 'stepRate', 10);
    var emitterConfig = {
        blendMode: GetValue(config, 'blendMode', 'ADD'),
        lifespan: GetValue(config, 'lifespan', 1000),
        emitZone: {
            type: 'edge',
            source: globRect,
            quantity: quantity,
            stepRate: stepRate,
            yoyo: GetValue(config, 'yoyo', false)
        }
    };
    var textureFrames = GetValue(config, 'textureFrames');
    if (textureFrames) {
        emitterConfig.frame = {
            frames: textureFrames,
            cycle: GetValue(config, 'textureFrameCycle', true)
        }
    }
    var scale = GetValue(config, 'scale');
    if (scale) {
        emitterConfig.scale = scale;
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
        .setScale(gameObject.scaleX, gameObject.scaleY)
        .setPosition(globPoint.x, globPoint.y)
        .setAngle(gameObject.angle)

    if (this.depth !== gameObject.depth) {
        this.setDepth(gameObject.depth);
    }
}

var globRect;
var globPoint;

export default ParticlesAloneBounds;