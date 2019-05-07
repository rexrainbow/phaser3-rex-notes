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
        this.setMaxHoldTime(GetValue(o, 'time', 250)); // min-hold-time of Press is 251
        this.setTapInterval(GetValue(o, 'tapInterval', 300));
        this.setDragThreshold(GetValue(o, 'threshold', 9));
        this.setTapOffset(GetValue(o, 'tapOffset', 10));
        return this;
    }

    onDragStart() {
        switch (this.state) {
            case IDLE:
                this.recongizedState.goto(BEGIN);
                break;

            case BEGIN:
                var pointer = this.pointer;
                var tapsOffset = DistanceBetween(
                    pointer.upX,
                    pointer.upY,
                    pointer.downX,
                    pointer.downY);
                if (tapsOffset > this.tapOffset) { // Can't recognize next level, restart here
                    this.recongizedState.goto(RECOGNIZED);
                    this.recongizedState.goto(BEGIN);
                }
                break;

            case RECOGNIZED:
                this.recongizedState.goto(BEGIN);
                break;
        }
    }

    onDragEnd() {
        if (this.state === BEGIN) {
            this.tapsCount++; // Try recognize next level
            this.emit('tapping', this);
        }
    }

    onDrag() {
        if (this.state === IDLE) {
            return;
        }

        if (this.pointer.getDistance() > this.dragThreshold) { // Cancel
            this.recongizedState.goto(IDLE);
        }
    }

    onLastPointerMove() {
        if (this.state === BEGIN) {
            var pointer = this.pointer;
            var distance = DistanceBetween(
                pointer.upX,
                pointer.upY,
                pointer.x,
                pointer.y);
            if (distance > this.tapOffset) { // Can't recognize next level, stop here
                this.recongizedState.goto(RECOGNIZED);
            }
        }
    }

    everyTick(time, delta) {
        switch (this.state) {
            case BEGIN:
                var pointer = this.pointer;
                if (pointer.isDown) {
                    var holdTime = time - pointer.downTime;
                    if (holdTime > this.holdTime) {
                        this.recongizedState.goto(IDLE);
                    }
                } else { // isUp
                    var releasedTime = time - pointer.upTime;
                    if (releasedTime > this.tapInterval) {
                        this.recongizedState.goto(RECOGNIZED);
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