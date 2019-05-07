import OnePointerTracer from "../OnePointerTracer";
import State from './State.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;

class Tap extends OnePointerTracer {
    constructor(scene, config) {
        super(scene, config);
        this.recongizedState = new State(this, config);
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setTaps(GetValue(o, 'taps', 1));
        this.setMaxHoldTime(GetValue(o, 'time', 250)); // min-hold-time of Press is 251
        this.setTapInterval(GetValue(o, 'tapInterval', 300));
        this.setDragThreshold(GetValue(o, 'threshold', 9));
        this.setTapOffset(GetValue(o, 'tapOffset', 10));
        return this;
    }

    onDragStart() {
        switch (this.recongizedState.state) {
            case IDLE:
                this.recongizedState.goto(BEGIN);
                break;

            case BEGIN:
                var pointer = this.pointer;
                var tapsOffset = DistanceBetween(pointer.upX,
                    pointer.upY,
                    pointer.downX,
                    pointer.downY);
                if (tapsOffset > this.tapOffset) {
                    this.recongizedState.goto(IDLE);
                }
                break;

            case RECOGNIZED:
                this.recongizedState.goto(BEGIN);
                break;
        }
    }

    onDragEnd() {
        if (this.recongizedState.state === BEGIN) {
            this.tapsCount++;
        }
    }

    onDrag() {
        if (this.recongizedState.state === IDLE) {
            return;
        }

        if (this.pointer.getDistance() > this.dragThreshold) {
            this.recongizedState.goto(IDLE);
        }
    }

    everyTick(time, delta) {
        switch (this.recongizedState.state) {
            case BEGIN:
                var pointer = this.lastCatchedPointer;
                if (pointer.isDown) {
                    var holdTime = time - pointer.downTime;
                    if (holdTime > this.holdTime) {
                        this.recongizedState.goto(IDLE);
                    }
                } else { // isUp
                    var releasedTime = time - pointer.upTime;
                    if (releasedTime > this.tapInterval) {
                        if (this.tapsCount === this.taps) {
                            this.recongizedState.goto(RECOGNIZED);
                        } else {
                            this.recongizedState.goto(IDLE);
                        }
                    }
                }
                break;

            case RECOGNIZED:
                // Keep RECOGNIZED state in 1 tick
                this.recongizedState.goto(IDLE);
                break;
        }
    }

    get state() {
        return this.recongizedState.state;
    }

    get isTapped() {
        return (this.state === RECOGNIZED);
    }

    setTaps(taps) {
        this.taps = taps;
        return this;
    }

    setMaxHoldTime(time) {
        this.holdTime = time; // ms
        return this;
    }

    setTapInterval(time) {
        this.tapInterval = time; // ms
        return this;
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }

    setTapOffset(distance) {
        this.tapOffset = distance;
        return this;
    }
}

const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Tap;