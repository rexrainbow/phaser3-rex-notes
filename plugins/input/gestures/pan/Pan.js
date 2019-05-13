import OnePointerTracer from "../onepointertracer/OnePointerTracer.js";
import FSM from '../../../fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Pan extends OnePointerTracer {
    constructor(scene, config) {
        super(scene, config);

        var self = this;
        var stateConfig = {
            states: {
                IDLE: {
                },
                BEGIN: {
                    enter: function () {
                        var pointer = self.pointer;
                        self.startX = pointer.x;
                        self.startY = pointer.y;
                        self.startWorldX = pointer.worldX;
                        self.startWorldY = pointer.worldY;
                    }
                },
                RECOGNIZED: {
                    enter: function () {
                        self.emit('panstart', self);
                    },
                    exit: function () {
                        var pointer = self.lastPointer;
                        self.endX = pointer.x;
                        self.endY = pointer.y;
                        self.endWorldX = pointer.worldX;
                        self.endWorldY = pointer.worldY;
                        self.emit('panend', self);
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
        this.setDragThreshold(GetValue(o, 'threshold', 10));
        return this;
    }

    onDragStart() {
        this.state = (this.dragThreshold === 0) ? RECOGNIZED : BEGIN;
    }

    onDragEnd() {
        this.state = IDLE;
    }

    onDrag() {
        switch (this.state) {
            case BEGIN:
                if (this.pointer.getDistance() >= this.dragThreshold) {
                    this.state = RECOGNIZED;
                }
                break;

            case RECOGNIZED:
                var p1 = this.pointer.position;
                var p0 = this.pointer.prevPosition;
                this.dx = p1.x - p0.x;
                this.dy = p1.y - p0.y;
                this.emit('pan', this);
                break;
        }
    }

    get isPan() {
        return (this.state === RECOGNIZED);
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }
}

const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Pan;