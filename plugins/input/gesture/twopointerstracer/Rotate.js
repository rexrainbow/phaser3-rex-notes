import TwoPointersTracer from './TwoPointersTracer.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 
const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
const DegToRad = Phaser.Math.DegToRad;

class Rotate extends TwoPointersTracer {
    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setRotationThreshold(GetValue(o, 'threshold', 0));
        this.rotationStart = false;
        this.angle = 0;
        return this;
    }

    onDrag2Start() {
        this.prevDragAngle = WrapDegrees(this.dragAngle); // Degrees
        if (this.rotationThreshold === 0) {
            this.rotationStart = true;
            this.emit('rotatestart', this);
        }
    }

    onDrag2End() {
        this.rotationStart = false;
        this.angle = 0;
        this.prevDragAngle = undefined;
        this.emit('rotateend', this);
    }

    onDrag2() {
        var curDragAngle = WrapDegrees(this.dragAngle);
        this.angle = ShortestBetween(this.prevDragAngle, curDragAngle);

        if (this.rotationStart) {
            this.prevDragAngle = curDragAngle;
            this.emit('rotate', this);
        } else {
            if (Math.abs(this.angle) >= this.rotationThreshold) {
                this.rotationStart = true;
                this.prevDragAngle = curDragAngle;
                this.emit('rotatestart', this);
            }
        }
    }

    get isRotation() {
        return this.isDrag2 && this.rotationStart;
    }

    get rotation() {
        return DegToRad(this.angle);
    }

    setRotationThreshold(angle) {
        if (angle === undefined) {
            angle = 0;
        }
        this.rotationThreshold = angle; // Degrees
        return this;
    }
}

export default Rotate;