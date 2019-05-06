import TwoPointersTracer from '../TwoPointersTracer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Pinch extends TwoPointersTracer {
    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setScaleThreshold(GetValue(o, 'threshold', 0));
        this.scaleStart = false;
        this.scaleFactor = 0;
        return this;
    }

    onDrag2Start() {
        this.prevDragDistance = this.dragDistance;
        if (this.scaleThreshold === 0) {
            this.scaleStart = true;
            this.emit('pinchstart', this);
        }
    }

    onDrag2End() {
        this.scaleStart = false;
        this.scaleFactor = 0;
        this.prevDragDistance = undefined;
        this.emit('pinchend', this);
    }

    onDrag2() {
        var curDragDistance = this.dragDistance;
        this.scaleFactor = curDragDistance / this.prevDragDistance;

        if (this.scaleStart) {
            this.prevDragDistance = curDragDistance;
            this.emit('pinch', this);
        } else {
            if (Math.abs(1 - this.scaleFactor) >= this.scaleThreshold) {
                this.scaleStart = true;
                this.prevDragDistance = curDragDistance;
                this.emit('pinchstart', this);
            }
        }
    }

    get isPinch() {
        return this.isDrag2 && this.scaleStart;
    }

    setScaleThreshold(scale) {
        if (scale === undefined) {
            scale = 0;
        }
        this.scaleThreshold = scale;
        return this;
    }
}

export default Pinch;