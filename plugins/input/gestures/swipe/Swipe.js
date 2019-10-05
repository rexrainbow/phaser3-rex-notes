import OnePointerTracer from "../onepointertracer/OnePointerTracer.js";
import FSM from '../../../fsm.js';
import VelocityMethods from './VelocityMethods.js';
import DIRMODE from '../../../utils/math/angle/angletodirections/Const.js';
import AngleToDirections from '../../../utils/math/angle/angletodirections/AngleToDirections.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const RadToDeg = Phaser.Math.RadToDeg;

class Swipe extends OnePointerTracer {
    constructor(gameObject, config) {
        super(gameObject, config);

        var self = this;
        var stateConfig = {
            states: {
                IDLE: {
                },
                BEGIN: {
                    enter: function () {
                        self.validDrag = false;
                    }
                },
                RECOGNIZED: {
                    enter: function () {
                        self.start();
                        self.updateDirectionStates();
                        self.emit('swipe', self, self.gameObject, self.lastPointer);
                    },

                    exit: function () {
                        self.stop();
                        self.clearDirectionStates();
                    }
                }
            },
            init: function () {
                this.state = IDLE;
            },
            eventEmitter: false,
        }
        this.setRecongizedStateObject(new FSM(stateConfig));
        this.clearDirectionStates();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setDragThreshold(GetValue(o, 'threshold', 10));
        this.setMinDragVelocity(GetValue(o, 'velocityThreshold', 1000));
        this.setDirectionMode(GetValue(o, 'dir', '8dir'));
        return this;
    }

    onDragStart() {
        this.state = BEGIN;
    }

    onDragEnd() {
        this.state = IDLE;
    }

    onDrag() {
        if (this.state === BEGIN) {
            if (!this.vaildDrag) {
                this.vaildDrag = (this.dragThreshold === 0) || (this.pointer.getDistance() >= this.dragThreshold);
            }
            if (this.vaildDrag && (this.dragVelocity > this.minDragVelocity)) {
                this.state = RECOGNIZED;
            }
        }
    }

    postUpdate(time, delta) {
        // Clear RECOGNIZED after update()
        if (this.state === RECOGNIZED) {
            this.state = IDLE;
        }
    }

    get isSwiped() {
        return (this.state === RECOGNIZED);
    }

    get dragVelocity() {
        var velocity;
        switch (this.dirMode) {
            case 0: velocity = this.getVelocityX(); break; // up & down
            case 1: velocity = this.getVelocityY(); break; // left & right
            default: velocity = this.getVelocity(); break; // 4 dir, 8 dir
        }
        return velocity;
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }

    setMinDragVelocity(velocity) {
        this.minDragVelocity = velocity;
        return this;
    }

    setDirectionMode(m) {
        if (typeof (m) === 'string') {
            m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
    }

    updateDirectionStates() {
        var angle = RadToDeg(this.getVelocityAngle());
        AngleToDirections(angle, this.dirMode, this);
        return this;
    }

    clearDirectionStates() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        return this;
    }
}

Object.assign(
    Swipe.prototype,
    VelocityMethods
);

const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Swipe;