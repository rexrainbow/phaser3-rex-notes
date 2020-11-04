import TweenBase from '../../../utils/tween/TweenBase.js';
import FaceNameToIndex from './FaceNameToIndex.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees;
const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
const Wrap = Phaser.Math.Wrap;

class Roll extends TweenBase {
    constructor(gameObject, config) {
        super(gameObject, { eventEmitter: true });
        this.gameObject = gameObject;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue(o, 'ease', 'Cubic'));
        return this;
    }

    shutdown() {
        super.shutdown();
        this.gameObject = undefined;
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

    start(deltaRotation) {
        if (this.isRunning) {
            return this;
        }

        var config = {
            targets: this.gameObject,
            rotationY: `+=${deltaRotation}`,
            delay: this.delay,
            duration: this.duration,
            ease: this.ease,
            repeat: 0
        }

        super.start(config);
        return this;
    }

    to(index, duration) {
        if (this.isRunning) {
            return this;
        }

        var carousel = this.gameObject;

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
        var index = this.gameObject.currentFaceIndex + 1;
        this.to(index, duration);
        return this;
    }

    toPrevious(duration) {
        var index = this.gameObject.currentFaceIndex - 1;
        this.to(index, duration);
        return this;
    }

    toRight(duration) {
        if (!this.gameObject.rtl) {
            this.toNext(duration);
        } else {
            this.toPrevious(duration);
        }
        return this;
    }

    toLeft(duration) {
        if (!this.gameObject.rtl) {
            this.toPrevious(duration);
        } else {
            this.toNext(duration);
        }
        return this;
    }
}

export default Roll;