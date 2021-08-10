import TweenTask from '../../../../utils/componentbase/TweenTask.js';
import FaceNameToIndex from './FaceNameToIndex.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees;
const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
const Wrap = Phaser.Math.Wrap;
const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
const Linear = Phaser.Math.Linear;

class Roll extends TweenTask {
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
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue(o, 'ease', 'Cubic'));
        return this;
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
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

    start(deltaRotation) {
        if (this.timer.isRunning) {
            return this;
        }

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration);

        var gameObject = this.parent;
        this.startRotationY = gameObject.rotationY;
        this.endRotationY = this.startRotationY + deltaRotation;

        super.start();
        return this;
    }

    to(index, duration) {
        if (this.isRunning) {
            return this;
        }

        var carousel = this.parent;

        if (typeof (index) === 'string') {
            index = FaceNameToIndex(carousel.faces, index);
            if (index === -1) {
                index = 0;
            }
        }
        index = Wrap(index, 0, carousel.faces.length);

        if (duration !== undefined) {
            this.setDuration(duration);
        }

        var start = WrapDegrees(RadToDeg(carousel.rotationY));
        var end = WrapDegrees(RadToDeg(((carousel.rtl) ? 1 : -1) * carousel.faceAngle * index));
        var delta = ShortestBetween(start, end); // Degrees
        this.start(DegToRad(delta));

        carousel.currentFaceIndex = index;
        return this;
    }

    toNext(duration) {
        var index = this.parent.currentFaceIndex + 1;
        this.to(index, duration);
        return this;
    }

    toPrevious(duration) {
        var index = this.parent.currentFaceIndex - 1;
        this.to(index, duration);
        return this;
    }

    toRight(duration) {
        if (!this.parent.rtl) {
            this.toNext(duration);
        } else {
            this.toPrevious(duration);
        }
        return this;
    }

    toLeft(duration) {
        if (!this.parent.rtl) {
            this.toPrevious(duration);
        } else {
            this.toNext(duration);
        }
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

        this.timer.update(time, delta);
        var t = this.easeFn(this.timer.t);

        gameObject.rotationY = Linear(this.startRotationY, this.endRotationY, t);

        if (this.timer.isDone) {
            this.complete();
        }
        return this;
    }
}

export default Roll;