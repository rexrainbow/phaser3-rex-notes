import TwoPointersTracer from '../twopointerstracer/TwoPointersTracer.js';
import FSM from '../../../fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Pinch extends TwoPointersTracer {
    constructor(scene, config) {
        super(scene, config);

        var self = this;
        var stateConfig = {
            states: {
                IDLE: {
                    enter: function () {
                        self.prevDistance = undefined;
                        self.scaleFactor = 1;
                    },
                },
                BEGIN: {
                },
                RECOGNIZED: {
                    enter: function () {
                        self.emit('pinchstart', self);
                    },
                    exit: function () {
                        self.emit('pinchend', self);
                    }
                }
            },
            init: function () {
                this.state = IDLE;
            }
        }
        this.setRecongizedStateObject(new FSM(stateConfig));
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setScaleThreshold(GetValue(o, 'threshold', 0));
        return this;
    }

    onDrag2Start() {
        this.prevDistance = this.distanceBetween;
        this.state = (this.scaleThreshold === 0) ? RECOGNIZED : BEGIN;
    }

    onDrag2End() {
        this.state = IDLE;
    }

    onDrag2() {
        var curDistance = this.distanceBetween;
        this.scaleFactor = curDistance / this.prevDistance;

        if (this.state === BEGIN) {
            if (Math.abs(1 - this.scaleFactor) >= this.scaleThreshold) {
                this.state = RECOGNIZED;
                this.prevDistance = curDistance;
            }
        } else {
            this.emit('pinch', this);
            this.prevDistance = curDistance;
        }
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