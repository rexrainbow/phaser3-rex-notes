import GetSceneObject from '../../utils/system/GetSceneObject.js';
import GetFaceUpdatingCallback from './GetFaceUpdatingCallback.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Flip {
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
        this.setOrientation(GetValue(o, 'orientation', 0));
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 500));
        this.setEase(GetValue(o, 'ease', 'Sine'));

        this.setFrontFaceCallback(GetValue(o, 'front', undefined));
        this.setBackFaceCallback(GetValue(o, 'back', undefined));
        this.setFace(GetValue(o, 'face', 0));
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
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
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

    setOrientation(orientation) {
        if (typeof (orientation) === 'string') {
            orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
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

    get face() {
        return this._face;
    }

    set face(face) {
        if (typeof (face) === 'string') {
            face = FACEMODE[face];
        }
        this._face = face;
        if ((face === 0) && this.frontFaceCallback) {
            this.frontFaceCallback(this.gameObject);
        } else if ((face === 1) && this.backFaceCallback) {
            this.backFaceCallback(this.gameObject);
        }
    }

    setFace(face) {
        this.face = face;
        return this;
    }

    toggleFace() {
        var newFace = (this.face === 0) ? 1 : 0;
        this.setFace(newFace);
        return this;
    }

    setFrontFaceCallback(key, frame) {
        this.frontFaceCallback = GetFaceUpdatingCallback(key, frame, this.gameObject);
        return this;
    }

    setBackFaceCallback(key, frame) {
        this.backFaceCallback = GetFaceUpdatingCallback(key, frame, this.gameObject);
        return this;
    }

    start() {
        if (this.isRunning) {
            return this;
        }

        var config = {
            targets: this.gameObject,
            duration: this.duration / 2,
            ease: this.ease,
            yoyo: true,
            repeat: 0,

            onYoyo: this.toggleFace,
            onYoyoScope: this,
            onComplete: this.stop,
            onCompleteScope: this
        }

        var propKey = (this.orientation === 0) ? 'scaleX' : 'scaleY';
        config[propKey] = { from: 1, to: 0 };

        this.tween = this.scene.tweens.add(config);
        return this;
    }    

    restart() {
        this.stop().start();
        return this;
    }

    flip(duration) {
        if (this.isRunning) {
            return this;
        }
        if (duration !== undefined) {
            this.setDuration(duration);
        }
        this.start();
        return this;
    }

    stop() {
        if (!this.tween) {
            return this;
        }

        this.tween.remove();
        this.tween = undefined;
        return this;
    }

    get isRunning() {
        return (!!this.tween);
    }
}

const ORIENTATIONMODE = {
    x : 0,
    horizontal: 0,
    y : 1,
    vertical: 1,
}

const FACEMODE = {
    front: 0,
    back: 1,
}

export default Flip;