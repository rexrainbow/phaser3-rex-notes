import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetSceneObject from '../../utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Scale {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.scaleStart = {};
        this.scaleEnd = {};
        this.tween = undefined;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 0));
        this.setScaleRange(
            GetAdvancedValue(o, 'start', undefined),
            GetAdvancedValue(o, 'end', 0)
        );
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue(o, 'ease', undefined));
        return this;
    }

    toJSON() {
        return {
            mode: this.mode,
            start: this.scaleStart,
            end: this.scaleEnd,
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

    setScaleRange(start, end) {
        if (typeof (start) === 'number') {
            this.scaleStart.x = start;
            this.scaleStart.y = start;
        } else {
            this.scaleStart.x = GetValue(start, 'x', this.gameObject.scaleX);
            this.scaleStart.y = GetValue(start, 'y', this.gameObject.scaleY);
        }
        if (typeof (end) === 'number') {
            this.scaleEnd.x = end;
            this.scaleEnd.y = end;
        } else {
            this.scaleEnd.x = GetValue(end, 'x', this.scaleStart.x);
            this.scaleEnd.y = GetValue(end, 'y', this.scaleStart.y);
        }
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

    setEase(ease) {
        if (ease === undefined) {
            ease = 'Linear';
        }
        this.ease = ease;
        return this;
    }

    start() {
        if (this.tween) {
            return this;
        }

        if (this.duration === 0) {
            this.gameObject.setScale(this.scaleEnd.x, this.scaleEnd.y);
            this.complete();
            return this;
        }

        this.gameObject.setScale(this.scaleStart.x, this.scaleStart.y);
        this.tween = this.scene.tweens.add({
            targets: this.gameObject,
            scaleX: this.scaleEnd.x,
            scaleY: this.scaleEnd.y,

            duration: this.duration,
            ease: this.ease,
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
    Scale.prototype,
    EventEmitterMethods
);

const MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
}

export default Scale;