import TwoPointersTracer from '../TwoPointersTracer.js';
import State from './State.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Pinch extends TwoPointersTracer {
    constructor(scene, config) {
        super(scene, config);
        this.recongizedState = new State(this);
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setScaleThreshold(GetValue(o, 'threshold', 0));
        return this;
    }

    onDrag2Start() {
        this.prevDistance = this.distanceBetween;
        if (this.scaleThreshold === 0) {
            this.recongizedState.goto(RECOGNIZED);
        } else {
            this.recongizedState.goto(BEGIN);
        }
    }

    onDrag2End() {
        this.recongizedState.goto(IDLE);
    }

    onDrag2() {
        var curDistance = this.distanceBetween;
        this.scaleFactor = curDistance / this.prevDistance;

        if (this.recongizedState.state === BEGIN) {
            if (Math.abs(1 - this.scaleFactor) >= this.scaleThreshold) {
                this.recongizedState.goto(RECOGNIZED);
                this.prevDistance = curDistance;
            }
        } else {
            this.emit('pinch', this);
            this.prevDistance = curDistance;
        }
    }

    get state() {
        return this.recongizedState.state;
    }

    get isPinch() {
        return (this.state === RECOGNIZED);
    }

    setScaleThreshold(scale) {
        this.scaleThreshold = scale;
        return this;
    }
}

const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Pinch;