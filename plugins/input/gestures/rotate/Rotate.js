import TwoPointersTracer from '../twopointerstracer/TwoPointersTracer.js';
import FSM from '../../../fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 
const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

class Rotate extends TwoPointersTracer {
    constructor(scene, config) {
        super(scene, config);

        var self = this;
        var stateConfig = {
            states: {
                IDLE: {
                    enter: function () {
                        self.prevAngle = undefined;
                        self.angle = 0;
                    },
                },
                BEGIN: {
                },
                RECOGNIZED: {
                    enter: function () {
                        self.emit('rotatestart', self);
                    },
                    exit: function () {
                        self.emit('rotateend', self);
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
        this.setRotationThreshold(GetValue(o, 'threshold', 0));
        return this;
    }

    onDrag2Start() {
        this.prevAngle = WrapDegrees(this.dragAngle); // Degrees
        this.state = (this.rotationThreshold === 0) ? RECOGNIZED : BEGIN;
    }

    onDrag2End() {
        this.state = IDLE;
    }

    onDrag2() {
        var curAngle = WrapDegrees(RadToDeg(this.angleBetween));
        this.angle = ShortestBetween(this.prevAngle, curAngle);

        if (this.state === BEGIN) {
            if (Math.abs(this.angle) >= this.rotationThreshold) {
                this.state = RECOGNIZED;
                this.prevAngle = curAngle;
            }
        } else {
            this.emit('rotate', this);
            this.prevAngle = curAngle;
        }
    }

    get isRotation() {
        return (this.state === RECOGNIZED);
    }

    get rotation() {
        return DegToRad(this.angle);
    }

    setRotationThreshold(angle) {
        this.rotationThreshold = angle; // Degrees
        return this;
    }
}

const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const RECOGNIZED = 'RECOGNIZED';

export default Rotate;