import CreateEmitterConfig from './CreateEmitterConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Vector2 = Phaser.Math.Vector2;
const PreUpdate = Phaser.GameObjects.Particles.ParticleEmitter.prototype.preUpdate;

var CreateEmitter = function (particles, config) {
    var emitter = particles.createEmitter(CreateEmitterConfig(config));

    // On particle fire
    var repeatCount = 1 + GetValue(config, 'repeat', 0);
    emitter.onParticleEmit(function () {
        if (emitter.emitZone.counter === 0) {
            if (repeatCount === 0) {
                emitter.stop();
            } else {
                repeatCount--;
            }
        }
    });

    // On particle death
    var reuse = GetValue(config, 'reuse', false);
    var gameObject = config.gameObject;
    emitter.onParticleDeath(function () {
        if (emitter.alive.length === 0) {
            particles.emit('complete', particles, gameObject);
            particles.removeEmitter(emitter);

            if (!reuse) {
                particles.destroy();
                particles = undefined;
            }
        }
    })

    // Override preUpdate, rotate gravity of game object is rotated
    var gravityX = GetValue(config, 'gravityX', 0);
    var gravityY = GetValue(config, 'gravityY', 0);
    if ((gravityX !== 0) || (gravityY !== 0)) {
        if (globGravityVector === undefined) {
            globGravityVector = new Vector2();
        }
        var gameObject = config.gameObject;
        emitter.preUpdate = (function (time, delta) {
            var localGravityX, localGravityY;
            if (gameObject.rotation !== 0) {
                globGravityVector
                    .setTo(gravityX, gravityY)
                    .rotate(-gameObject.rotation);
                localGravityX = globGravityVector.x;
                localGravityY = globGravityVector.y;
            } else {
                localGravityX = gravityX;
                localGravityY = gravityY;
            }
            emitter.setGravity(localGravityX, localGravityY);
            PreUpdate.call(this, time, delta);
        }).bind(emitter);
    }

    return emitter;
}

var globGravityVector;

export default CreateEmitter;