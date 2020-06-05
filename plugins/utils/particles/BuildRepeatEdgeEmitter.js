import Override from '../function/Override.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var BuildRepeatEdgeEmitter = function (emitter, config) {
    // On particle fire
    var repeat = 1 + GetValue(config, 'repeat', 0);
    var repeatCount = 0;
    var emitCallback = function () {
        if (emitter.emitZone.counter === 0) {
            if (repeatCount === repeat) {
                emitter.emitZone.counter = -1; // Reset to initial value
                repeatCount = 0;
                emitter.stop();
            } else {
                repeatCount++;
            }
        }
    }
    emitter.emitCallback = Override(
        emitCallback, undefined,
        emitter.emitCallback, emitter.emitCallbackScope
    );
    emitter.emitCallbackScope = null;

    // On particle death
    var deathCallback = function () {
        if (emitter.alive.length === 0) {
            var particles = emitter.manager;
            particles.emit('complete', particles, emitter);
        }
    }
    emitter.deathCallback = Override(
        deathCallback, undefined,
        emitter.deathCallback, emitter.deathCallbackScope
    );
    emitter.deathCallbackScope = null;

    return emitter;
}

export default BuildRepeatEdgeEmitter;