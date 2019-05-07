import TwoPointersTracer from '../TwoPointersTracer.js';
import State from './State.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 
const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

class Rotate extends TwoPointersTracer {
    constructor(scene, config) {
        super(scene, config);
        this.recongizedState = new State(this, config);
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setRotationThreshold(GetValue(o, 'threshold', 0));
        return this;
    }

    onDrag2Start() {
        this.prevAngle = WrapDegrees(this.dragAngle); // Degrees
        if (this.rotationThreshold === 0) {
            this.recongizedState.goto(RECOGNIZED);
        } else {
            this.recongizedState.goto(BEGIN);
        }
    }

    onDrag2End() {
        this.recongizedState.goto(IDLE);
    }

    onDrag2() {
        var curAngle = WrapDegrees(RadToDeg(this.angleBetween));
        this.angle = ShortestBetween(this.prevAngle, curAngle);

        if (this.state === BEGIN) {
            if (Math.abs(this.angle) >= this.rotationThreshold) {
                this.recongizedState.goto(RECOGNIZED);
                this.prevAngle = curAngle;
            }
        } else {
            this.emit('rotate', this);
            this.prevAngle = curAngle;
        }
    }

    get state() {
        return this.recongizedState.state;
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