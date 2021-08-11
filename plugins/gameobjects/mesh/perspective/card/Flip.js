import EaseValueTaskBase from '../../../../utils/componentbase/tweentask/EaseValueTaskBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Linear = Phaser.Math.Linear;

class Flip extends EaseValueTaskBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.timer

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setEase(GetValue(o, 'ease', 'Cubic'));

        this.setFrontToBackDirection(GetValue(o, 'frontToBack', 0));
        this.setBackToFrontDirection(GetValue(o, 'backToFront', 1));
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

    updateGameObject(gameObject, timer) {
        var t = this.easeFn(timer.t);

        var value = Linear(this.startAngle, this.endAngle, t);
        if (gameObject.orientation === 0) {
            gameObject.angleY = value;
        } else {
            gameObject.angleX = value;
        }
    }
}

const DIRMODE = {
    'right': 0,
    'left-to-right': 0,
    'left': 1,
    'right-to-left': 1
}

export default Flip;