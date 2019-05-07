import OnePointerTracer from "../OnePointerTracer";
import State from './State.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Press extends OnePointerTracer {
    constructor(scene, config) {
        super(scene, config);
        this.recongizedState = new State(this, config);
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setDragThreshold(GetValue(o, 'threshold', 9));
        this.setMinHoldTime(GetValue(o, 'time', 251));
        return this;
    }

    onDragStart() {
        if (this.holdTime === 0) {
            this.recongizedState.goto(RECOGNIZED);
        } else {
            this.recongizedState.goto(BEGIN);
        }
    }

    onDragEnd() {
        this.recongizedState.goto(IDLE);
    }

    onDrag() {
        if (this.state === IDLE) {
            return;
        }

        if (this.pointer.getDistance() > this.dragThreshold) {
            this.recongizedState.goto(IDLE);
        }
    }

    everyTick(time, delta) {
        if (this.state === BEGIN) {
            var holdTime = time - this.pointer.downTime;
            if (holdTime > this.holdTime) {
                this.recongizedState.goto(RECOGNIZED);
            }
        }
    }

    get state() {
        return this.recongizedState.state;
    }

    get isPressed() {
        return (this.state === RECOGNIZED);
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }

    setMinHoldTime(time) {
        this.holdTime = time; // ms
        return this;
    }
}

const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Press;