import OnePointerTracer from "../onepointertracer/OnePointerTracer.js";
import FSM from '../../../fsm.js';
import GetPointerWorldXY from "../../../utils/input/GetPointerWorldXY.js";

const GetValue = Phaser.Utils.Objects.GetValue;

class Pan extends OnePointerTracer {
    constructor(gameObject, config) {
        super(gameObject, config);

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
                        self.emit('panstart', self, self.gameObject, self.lastPointer);
                    },
                    exit: function () {
                        var pointer = self.lastPointer;
                        self.endX = pointer.x;
                        self.endY = pointer.y;

                        var worldXY = GetPointerWorldXY(pointer, self.pointerCamera, true);
                        self.endWorldX = worldXY.x;
                        self.endWorldY = worldXY.y;

                        self.emit('panend', self, self.gameObject, self.lastPointer);
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
        this.state = BEGIN;
        if (this.dragThreshold === 0) {
            this.state = RECOGNIZED;
        }
    }

    onDragEnd() {
        this.state = IDLE;
    }

    onDrag() {
        switch (this.state) {
            case BEGIN:
                if (this.pointer.getDistance() >= this.dragThreshold) {
                    this.state = RECOGNIZED;

                    this.dx = 0;
                    this.dy = 0;
                    this.dWorldX = 0;
                    this.dWorldY = 0;

                    var pointer = this.pointer;
                    this.x = pointer.x;
                    this.y = pointer.y;
                    this.worldX = pointer.worldX;
                    this.worldY = pointer.worldY;
                }
                break;

            case RECOGNIZED:
                var pointerCamera = this.pointerCamera;

                var p1 = this.pointer.position;
                var p0 = this.pointer.prevPosition;
                this.dx = p1.x - p0.x;
                this.dy = p1.y - p0.y;
                this.dWorldX = this.dx / pointerCamera.zoom;
                this.dWorldY = this.dy / pointerCamera.zoom;


                var pointer = this.pointer;
                this.x = pointer.x;
                this.y = pointer.y;

                var worldXY = GetPointerWorldXY(pointer, pointerCamera, true);
                this.worldX = worldXY.x;
                this.worldY = worldXY.y;

                this.emit('pan', this, this.gameObject, this.lastPointer);
                break;
        }
    }

    get isPanning() {
        return (this.state === RECOGNIZED);
    }

    // Backward compatible
    get isPanned() {
        return this.isPanning;
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