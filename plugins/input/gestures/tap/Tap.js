import OnePointerTracer from "../onepointertracer/OnePointerTracer.js";
import FSM from '../../../fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;

class Tap extends OnePointerTracer {
    constructor(scene, config) {
        super(scene, config);

        var self = this;
        var stateConfig = {
            states: {
                IDLE: {
                    enter: function () {
                        self.tapsCount = 0;
                        self.x = 0;
                        self.y = 0;
                        self.worldX = 0;
                        self.worldY = 0;
                    },
                    exit: function () {
                        var pointer = self.lastPointer;
                        self.x = pointer.x;
                        self.y = pointer.y;
                        self.worldX = pointer.worldX;
                        self.worldY = pointer.worldY;
                    }
                },
                BEGIN: {
                    enter: function () {
                        self.tapsCount = 0;
                        self.emit('tappingstart', self);
                        self.start();
                    },
                    exit: function () {
                        self.stop();
                    }
                },
                RECOGNIZED: {
                    enter: function () {
                        self.emit('tap', self);
                    },
                }
            },
            init: function () {
                this.state = IDLE;
            },
            eventEmitter: false,
        }
        this.setRecongizedStateObject(new FSM(stateConfig));
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setMaxHoldTime(GetValue(o, 'time', 250)); // min-hold-time of Press is 251
        this.setTapInterval(GetValue(o, 'tapInterval', 300));
        this.setDragThreshold(GetValue(o, 'threshold', 9));
        this.setTapOffset(GetValue(o, 'tapOffset', 10));
        this.setMaxTaps(GetValue(o, 'maxTaps', undefined));
        return this;
    }

    onDragStart() {
        switch (this.state) {
            case IDLE:
                this.state = BEGIN;
                break;

            case BEGIN:
                var pointer = this.lastPointer;
                var tapsOffset = DistanceBetween(
                    pointer.upX,
                    pointer.upY,
                    pointer.x,
                    pointer.y);
                if (tapsOffset > this.tapOffset) { // Can't recognize next level, restart here
                    this.state = RECOGNIZED;
                    this.state = BEGIN;
                }
                break;

            case RECOGNIZED:
                this.state = BEGIN;
                break;
        }
    }

    onDragEnd() {
        if (this.state === BEGIN) {
            this.tapsCount++; // Try recognize next level
            this.emit('tapping', this);

            if (this.maxTaps && (this.maxTaps === this.tapsCount)) { // Reach to maxTaps, stop here
                this.state = RECOGNIZED;
            }
        }
    }

    onDrag() {
        if (this.state === IDLE) {
            return;
        }

        if (this.pointer.getDistance() > this.dragThreshold) { // Cancel
            this.state = IDLE;
        }
    }

    onLastPointerMove() {
        if (this.state === BEGIN) {
            var pointer = this.lastPointer;
            var distance = DistanceBetween(
                pointer.upX,
                pointer.upY,
                pointer.x,
                pointer.y);
            if (distance > this.tapOffset) { // Can't recognize next level, stop here
                this.state = RECOGNIZED;
            }
        }
    }

    everyTick(time, delta) {
        switch (this.state) {
            case BEGIN:
                var pointer = this.lastPointer;
                if (pointer.isDown) {
                    var holdTime = time - pointer.downTime;
                    if (holdTime > this.holdTime) {
                        this.state = IDLE;
                    }
                } else { // isUp
                    var releasedTime = time - pointer.upTime;
                    if (releasedTime > this.tapInterval) {
                        this.state = RECOGNIZED;
                    }
                }
                break;

            case RECOGNIZED:
                // Keep RECOGNIZED state in 1 tick
                this.state = IDLE;
                break;
        }
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

    setMaxTaps(taps) {
        this.maxTaps = taps;
        return this;
    }
}

const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Tap;