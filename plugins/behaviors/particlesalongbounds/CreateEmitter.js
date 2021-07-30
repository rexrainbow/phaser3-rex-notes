import CreateEmitterConfig from './CreateEmitterConfig.js';
import BuildRepeatEdgeEmitter from '../../utils/particles/BuildRepeatEdgeEmitter.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Vector2 = Phaser.Math.Vector2;
const PreUpdate = Phaser.GameObjects.Particles.ParticleEmitter.prototype.preUpdate;

var CreateEmitter = function (particles, config) {
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
    })

    // Override preUpdate, rotate gravity of game object is rotated
    var gravityX = GetValue(config, 'gravityX', 0);
    var gravityY = GetValue(config, 'gravityY', 0);
    if ((gravityX !== 0) || (gravityY !== 0)) {
        var gravityVector = new Vector2();
        var gameObject = config.gameObject;
        emitter.preUpdate = (function (time, delta) {
            var localGravityX, localGravityY;
            if (gameObject.rotation !== 0) {
                gravityVector
                    .setTo(gravityX, gravityY)
                    .rotate(-gameObject.rotation);
                localGravityX = gravityVector.x;
                localGravityY = gravityVector.y;
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

export default CreateEmitter;