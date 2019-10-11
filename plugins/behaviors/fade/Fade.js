import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetSceneObject from '../../utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Fade {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.alphaStart = undefined;
        this.alphaEnd = undefined;
        this.tween = undefined;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 0));
        this.setAlphaRange(
            GetAdvancedValue(o, 'start', this.gameObject.alpha),
            GetAdvancedValue(o, 'end', 0)
        );
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        return this;
    }

    toJSON() {
        return {
            mode: this.mode,
            start: this.alphaStart,
            end: this.alphaEnd,
            delay: this.delay,
            duration: this.duration
        };
    }

    boot() {
        if (this.gameObject.once) { // oops, bob object does not have event emitter
            this.gameObject.once('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.stop();
        this.gameObject = undefined;
        this.scene = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this.mode = m;
        return this;
    }
    setAlphaRange(start, end) {
        this.alphaStart = start;
        this.alphaEnd = end;
        return this;
    }
    setDelay(time) {
        this.delay = time;
        return this;
    }
    setDuration(time) {
        this.duration = time;
        return this;
    }

    start() {
        if (this.tween) {
            return this;
        }

        if (this.duration === 0) {
            this.gameObject.setAlpha(this.alphaEnd);
            this.complete();
            return this;
        }

        this.gameObject.setAlpha(this.alphaStart);
        this.tween = this.scene.tweens.add({
            targets: this.gameObject,
            alpha: this.alphaEnd,

            delay: this.delay,
            duration: this.duration,
            ease: 'Linear',
            yoyo: (this.mode == 2),
            repeat: ((this.mode == 2) ? -1 : 0),
            onComplete: this.complete,
            onCompleteScope: this
        });
        this.setEventEmitter(this.tween);
        return this;
    }

    restart() {
        this.stop().start();
        return this;
    }

    stop() {
        if (!this.tween) {
            return this;
        }

        this.setEventEmitter(false);
        this.tween.remove();
        this.tween = undefined;
        return this;
    }

    complete() {
        this.stop();
        if (this.mode === 1) {
            this.gameObject.destroy();
        }
        return this;
    }

}

Object.assign(
    Fade.prototype,
    EventEmitterMethods
);

const MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
}

export default Fade;