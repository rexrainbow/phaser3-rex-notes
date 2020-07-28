import OnePointerTracer from "../onepointertracer/OnePointerTracer.js";
import FSM from '../../../fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Press extends OnePointerTracer {
    constructor(gameObject, config) {
        super(gameObject, config);

        var self = this;
        var stateConfig = {
            states: {
                IDLE: {
                    enter: function () {
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
                        self.start();
                    },
                    exit: function () {
                        self.stop();
                    }
                },
                RECOGNIZED: {
                    enter: function () {
                        self.emit('pressstart', self, self.gameObject, self.lastPointer);
                    },
                    exit: function () {
                        self.emit('pressend', self, self.gameObject, self.lastPointer);
                    }
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
        this.setDragThreshold(GetValue(o, 'threshold', 9));
        this.setMinHoldTime(GetValue(o, 'time', 251));
        return this;
    }

    onDragStart() {
        this.state = BEGIN;
        if (this.holdTime === 0) {
            this.state = RECOGNIZED;
        }
    }

    onDragEnd() {
        this.state = IDLE;
    }

    onDrag() {
        if (this.state === IDLE) {
            return;
        }

        if (this.pointer.getDistance() > this.dragThreshold) {
            this.state = IDLE;
        }
    }

    preUpdate(time, delta) {
        if (this.state === BEGIN) {
            var holdTime = time - this.pointer.downTime;
            if (holdTime >= this.holdTime) {
                this.state = RECOGNIZED;
            }
        }
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