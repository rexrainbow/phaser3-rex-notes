import ComponentBase from '../../utils/componentbase/ComponentBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const GetAngle = Phaser.Math.Angle.Between;
const WrapAngle = Phaser.Math.Angle.Wrap;
const RadToDeg = Phaser.Math.RadToDeg;

const STATE_TOUCH0 = 0;
const STATE_TOUCH1 = 1;

class DragRotate extends ComponentBase {
    constructor(scene, config) {
        super(scene);
        // No event emitter
        // this.scene = scene

        this._enable = undefined;
        this._deltaRotation = undefined;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.pointer = undefined;
        this.setEnable(GetValue(o, "enable", true));
        this.setOrigin(o);
        this.setRadius(GetValue(o, 'maxRadius', 100), GetValue(o, 'minRadius', 0));
        this.state = STATE_TOUCH0;
    }

    boot() {
        this.scene.input.on('pointerdown', this.onPointerDown, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.scene.input.off('pointerdown', this.onPointerDown, this);
        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.scene.input.off('pointermove', this.onPointerMove, this);

        this.pointer = undefined;

        super.shutdown(fromScene);
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        if (!e) {
            this.dragCancel();
        }
        this._enable = e;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    setOrigin(x, y) {
        if (y === undefined) {
            var point = x;
            x = GetValue(point, 'x', 0);
            y = GetValue(point, 'y', 0);
        }
        this.x = x;  // World position
        this.y = y;  // World position
        return this;
    }

    setRadius(maxRadius, minRadius) {
        if (minRadius === undefined) {
            minRadius = 0;
        }
        this.maxRadius = maxRadius;
        this.minRadius = minRadius;
        return this;
    }

    contains(x, y) {
        var r = DistanceBetween(this.x, this.y, x, y);
        return (r >= this.minRadius) && (r <= this.maxRadius);
    }

    onPointerDown(pointer) {
        if ((!this.enable) ||
            this.pointer) {
            return;
        }

        if (!this.contains(pointer.worldX, pointer.worldY)) {
            return;
        }

        this.onDragStart(pointer);
    }

    onPointerUp(pointer) {
        if ((!this.enable) ||
            (this.pointer !== pointer)) {
            return;
        }

        this.onDragEnd();
    }

    onPointerMove(pointer) {
        if ((!this.enable) ||
            (!pointer.isDown)) {
            return;
        }

        switch (this.state) {
            case STATE_TOUCH0:
                if (this.contains(pointer.worldX, pointer.worldY)) {
                    this.onDragStart(pointer);
                }
                break;

            case STATE_TOUCH1:
                if (this.contains(pointer.worldX, pointer.worldY)) {
                    this.onDrag();
                } else {
                    this.onDragEnd();
                }
                break;
        }
    }

    dragCancel() {
        if (this.state === STATE_TOUCH1) {
            this.onDragEnd();
        }
        this.pointer = undefined;
        this.state = STATE_TOUCH0;
        return this;
    }

    onDragStart(pointer) {
        this.pointer = pointer;
        this.state = STATE_TOUCH1;
        this._deltaRotation = undefined;
        this.emit('dragstart', this);
    }

    onDragEnd() {
        this.pointer = undefined;
        this.state = STATE_TOUCH0;
        this._deltaRotation = undefined;
        this.emit('dragend', this);
    }

    onDrag() {
        this._deltaRotation = undefined;
        this.emit('drag', this);
    }

    get deltaRotation() {
        if (this.state === STATE_TOUCH0) {
            return 0;
        }

        if (this._deltaRotation === undefined) {
            var p0 = this.pointer.prevPosition,
                p1 = this.pointer.position;
            var a0 = GetAngle(this.x, this.y, p0.x, p0.y),
                a1 = GetAngle(this.x, this.y, p1.x, p1.y);
            this._deltaRotation = WrapAngle(a1 - a0);
        }

        return this._deltaRotation;

    }

    get deltaAngle() {
        if (this.state === STATE_TOUCH0) {
            return 0;
        }

        return RadToDeg(this.deltaRotation);
    }

    get cw() {
        return (this.deltaRotation >= 0);
    }

    get ccw() {
        return !this.cw;
    }
}


export default DragRotate;