import Pan from '../gestures/pan/Pan.js';
import IsPointerInHitArea from '../../utils/input/IsPointerInHitArea.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const RotateAroundDistance = Phaser.Math.RotateAroundDistance;

class Drag extends Pan {
    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setAxisMode(GetValue(o, "axis", 0));
        this.setAxisRotation(GetValue(o, "rotation", 0));
        return this;
    }

    setAxisMode(m) {
        if (typeof (m) === 'string') {
            m = DIRECTIONNODE[m];
        }
        this.axisMode = m;
        return this;
    }

    setAxisRotation(a) {
        this.axisRotation = a;
        return this;
    }

    drag() {
        var pointer = IsPointerInHitArea(this.gameObject, undefined, undefined, undefined, true);
        if (!pointer) {
            return this;
        }

        this.onPointerDown(pointer);
        return this;
    }

    dragend() {
        this.dragCancel();
        return this;
    }

    onDrag() {
        super.onDrag();

        if (!this.isDragging) {
            return;
        }

        if ((this.dx === 0) && (this.dy === 0)) {
            return;
        }

        var gameObject = this.gameObject;
        var dragX = gameObject.x + this.dx;
        var dragY = gameObject.y + this.dy;

        if (this.axisMode === 0) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        } else if (this.axisRotation === 0) {
            if (this.axisMode === 1) {
                gameObject.x = dragX;
            } else if (this.axisMode === 2) {
                gameObject.y = dragY;
            }
        } else {
            var dist;
            var p1 = { x: dragX, y: dragY };
            dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
            p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, -this.axisRotation, dist);

            if (this.axisMode === 1) {
                p1.y = gameObject.y;
            } else if (this.axisMode === 2) {
                p1.x = gameObject.x;
            }
            dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
            p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, this.axisRotation, dist);

            gameObject.x = p1.x;
            gameObject.y = p1.y;
        }

    }

    get isDragging() {
        return this.isPanned;
    }
}

const DIRECTIONNODE = {
    'both': 0,
    'h&v': 0,
    'x&y': 0,
    'horizontal': 1,
    'h': 1,
    'x': 1,
    'vertical': 2,
    'v': 2,
    'y': 2
};


export default Drag;