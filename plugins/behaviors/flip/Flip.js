import TweenBase from '../../utils/tween/TweenBase.js';
import GetFaceUpdatingCallback from './GetFaceUpdatingCallback.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Flip extends TweenBase {
    constructor(gameObject, config) {
        super(gameObject, { eventEmitter: true });
        this.gameObject = gameObject;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setOrientation(GetValue(o, 'orientation', 0));
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 500));
        this.setEase(GetValue(o, 'ease', 'Sine'));

        this.setFrontFace(GetValue(o, 'front', undefined));
        this.setBackFace(GetValue(o, 'back', undefined));
        this.setFace(GetValue(o, 'face', 0));
        return this;
    }

    shutdown() {
        super.shutdown();
        this.gameObject = undefined;
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

    setFrontFace(key, frame) {
        this.frontFaceCallback = GetFaceUpdatingCallback(key, frame, this.gameObject);
        return this;
    }

    setBackFace(key, frame) {
        this.backFaceCallback = GetFaceUpdatingCallback(key, frame, this.gameObject);
        return this;
    }

    start() {
        if (this.isRunning) {
            return this;
        }

        var config = {
            targets: this.gameObject,
            delay: this.delay,
            duration: this.duration / 2,
            ease: this.ease,
            yoyo: true,
            repeat: 0,

            onYoyo: this.toggleFace,
            onYoyoScope: this
        }

        var propKey = (this.orientation === 0) ? 'scaleX' : 'scaleY';
        config[propKey] = { start: 1, to: 0 };

        super.start(config);
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
}

const ORIENTATIONMODE = {
    x: 0,
    horizontal: 0,
    y: 1,
    vertical: 1,
}

const FACEMODE = {
    front: 0,
    back: 1,
}

export default Flip;