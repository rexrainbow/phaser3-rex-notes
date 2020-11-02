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

        if (typeof (index) === 'string') {
            index = FaceNameToIndex(this.gameObject.faces, index);
            if (index === -1) {
                index = 0;
            }
        }
        index = Wrap(index, 0, this.gameObject.faces.length);

        if (duration !== undefined) {
            this.setDuration(duration);
        }

        var start = WrapDegrees(RadToDeg(this.gameObject.rotationY));
        var end = WrapDegrees(RadToDeg(-this.gameObject.faceAngle * index));
        var delta = ShortestBetween(start, end); // Degrees
        this.start(DegToRad(delta));

        this.gameObject.currentFaceIndex = index;
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
}

export default Roll;