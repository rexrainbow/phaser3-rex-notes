import TweenTask from '../../utils/componentbase/TweenTask.js';
import GetFaceUpdatingCallback from './GetFaceUpdatingCallback.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
const Linear = Phaser.Math.Linear;

class Flip extends TweenTask {
    constructor(gameObject, config) {
        super(gameObject);
        // this.parent = gameObject;
        // this.timer

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue(o, 'timer'));
        this.setEnable(GetValue(o, 'enable', true));
        this.setOrientation(GetValue(o, 'orientation', 0));
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 500));
        this.setEase(GetValue(o, 'ease', 'Sine'));

        this.setFrontFace(GetValue(o, 'front', undefined));
        this.setBackFace(GetValue(o, 'back', undefined));
        this.setFace(GetValue(o, 'face', 0));
        return this;
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
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
        this.easeFn = GetEaseFunction(ease);
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
            this.frontFaceCallback(this.parent);
        } else if ((face === 1) && this.backFaceCallback) {
            this.backFaceCallback(this.parent);
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
        this.frontFaceCallback = GetFaceUpdatingCallback(key, frame, this.parent);
        return this;
    }

    setBackFace(key, frame) {
        this.backFaceCallback = GetFaceUpdatingCallback(key, frame, this.parent);
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration / 2)
            .setRepeat(1);  // 2 times

        super.start();
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

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        var prevRepeatCounter = this.timer.repeatCounter;
        this.timer.update(time, delta);

        if ((prevRepeatCounter === 0) && (this.timer.repeatCounter === 1)) {
            this.toggleFace();
        }

        var t = this.timer.t;
        if (this.timer.isOddIteration) {  // Yoyo
            t = 1 - t;
        }
        t = this.easeFn(t);

        var value = Linear(1, 0, t);
        if (this.orientation === 0) {
            gameObject.scaleX = value;
        } else {
            gameObject.scaleY = value;
        }

        if (this.timer.isDone) {
            this.complete();
        }
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