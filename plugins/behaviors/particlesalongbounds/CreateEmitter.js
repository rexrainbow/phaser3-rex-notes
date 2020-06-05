import CreateEmitterConfig from './CreateEmitterConfig.js';
import BuildRepeatEdgeEmitter from '../../utils/particles/BuildRepeatEdgeEmitter.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Vector2 = Phaser.Math.Vector2;
const PreUpdate = Phaser.GameObjects.Particles.ParticleEmitter.prototype.preUpdate;

var CreateEmitter = function (particles, config) {
    var emitter = particles.createEmitter(CreateEmitterConfig(config));
    BuildRepeatEdgeEmitter(emitter, config);

    var reuse = GetValue(config, 'reuse', false);
    particles.on('complete', function () {
        particles.removeEmitter(emitter);
        emitter = null;
        if (!reuse) {
            particles.destroy();
            particles = null;
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