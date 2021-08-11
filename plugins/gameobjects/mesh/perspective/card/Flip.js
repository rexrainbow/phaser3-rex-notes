import TweenTask from '../../../../utils/componentbase/TweenTask.js';

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
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue(o, 'ease', 'Cubic'));
        this.setFrontToBackDirection(GetValue(o, 'frontToBack', 0));
        this.setBackToFrontDirection(GetValue(o, 'backToFront', 1));
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

    setFrontToBackDirection(direction) {
        if (typeof (direction) === 'string') {
            direction = DIRMODE[direction];
        }
        this.endAngleFB = (direction === 0) ? 180 : -180;
        return this;
    }

    setBackToFrontDirection(direction) {
        if (typeof (direction) === 'string') {
            direction = DIRMODE[direction];
        }
        this.endAngleBF = (direction === 0) ? -180 : 180;
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration);

        var gameObject = this.parent;
        if (gameObject.face === 0) {  // isFrontToBack
            this.startAngle = 0
            this.endAngle = this.endAngleFB;
        } else {
            this.startAngle = this.endAngleBF
            this.endAngle = 0;
        }

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

        // Set face index
        var faceIndex = this.parent.currentFaceIndex;
        this.parent.currentFaceIndex = (faceIndex === 0) ? 1 : 0;
        return this;
    }

    flipRight(duration) {
        if (this.parent.currentFaceIndex === 0) { // Front to back
            this.setFrontToBackDirection(0);
        } else {  // Back to front
            this.setBackToFrontDirection(0);
        }
        this.flip(duration);
        return this;
    }

    flipLeft(duration) {
        if (this.parent.currentFaceIndex === 0) { // Front to back
            this.setFrontToBackDirection(1);
        } else {  // Back to front
            this.setBackToFrontDirection(1);
        }
        this.flip(duration);
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

        var value = Linear(this.startAngle, this.endAngle, t);
        if (this.parent.orientation === 0) {
            gameObject.angleY = value;
        } else {
            gameObject.angleX = value;
        }

        if (this.timer.isDone) {
            this.complete();
        }
        return this;
    }
}

const DIRMODE = {
    'right': 0,
    'left-to-right': 0,
    'left': 1,
    'right-to-left': 1
}

export default Flip;