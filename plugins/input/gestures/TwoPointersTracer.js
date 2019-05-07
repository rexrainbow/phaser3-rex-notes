const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const SpliceOne = Phaser.Utils.Array.SpliceOne;
const DistanceBetween = Phaser.Math.Distance.Between;
const AngleBetween = Phaser.Math.Angle.Between;

class TwoPointersTracer extends EE {
    constructor(scene, config) {
        var amount = scene.input.manager.pointersTotal - 1;
        if (amount < 2) {
            scene.input.addPointer(2 - amount);
        }

        super();
        this.scene = scene;
        this.pointers = [];
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, "enable", true));
        this.bounds = GetValue(o, 'bounds', undefined);

        this.tracerState = TOUCH0;
        this.pointers.length = 0;
        return this;
    }

    boot() {
        this.scene.input.on('pointerdown', this.onPointerDown, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.events.on('destroy', this.destroy, this);
    }

    shutdown() {
        if (this.scene) {
            this.scene.input.off('pointerdown', this.onPointerDown, this);
            this.scene.input.off('pointerup', this.onPointerUp, this);
            this.scene.input.off('pointermove', this.onPointerMove, this);
            this.scene.events.off('destroy', this.destroy, this);
            this.scene = undefined;
        }
    }

    destroy() {
        this.shutdown();
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        if (this.enable === e) {
            return this;
        }

        if (!e) {
            this.dragCancel();
        }
        this.enable = e;
        return this;
    }

    onPointerDown(pointer) {
        if (!this.enable) {
            return;
        }

        var index = this.pointers.indexOf(pointer);
        if (index !== -1) { // Already in catched pointers
            return;
        }

        var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
            return;
        }

        if (this.pointers.length === 2) {
            return;
        } else {
            this.pointers.push(pointer);
        }

        switch (this.tracerState) {
            case TOUCH0:
                this.tracerState = TOUCH1;
                this.onDrag1Start();
                break;
            case TOUCH1:
                this.tracerState = TOUCH2;
                this.onDrag2Start();
                break;
        }
    }

    onPointerUp(pointer) {
        if (!this.enable) {
            return;
        }

        var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
            return;
        }

        var index = this.pointers.indexOf(pointer);
        if (index === -1) { // Not in catched pointers
            return;
        } else {
            SpliceOne(this.pointers, index);
        }

        switch (this.tracerState) {
            case TOUCH1:
                this.tracerState = TOUCH0;
                this.onDrag1End();
                break;
            case TOUCH2:
                this.tracerState = TOUCH1;
                this.onDrag2End();
                this.onDrag1Start();
                break;
        }
    }

    onPointerMove(pointer) {
        if (!this.enable) {
            return;
        }

        if (!pointer.isDown) {
            return;
        }
        var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
        var isCatchedPointer = (this.pointers.indexOf(pointer) !== -1);
        if (!isCatchedPointer && isInsideBounds) { // Pointer moves into bounds
            this.onPointerDown(pointer);
        } else if (isCatchedPointer && !isInsideBounds) { // Pointer moves out of bounds
            this.onPointerUp(pointer);
        } else {  // Pointer drags in bounds
            switch (this.tracerState) {
                case TOUCH1:
                    this.onDrag1();
                    break;
                case TOUCH2:
                    this.onDrag2();
                    break;
            }
        }
    }

    dragCancel() {
        if (this.tracerState === TOUCH2) {
            this.onDrag2End();
        }
        this.pointers.length = 0;
        this.tracerState = TOUCH0;
        return this;
    }

    onDrag1Start() {
        this.emit('drag1start', this);
    }

    onDrag1End() {
        this.emit('drag1end', this);
    }

    onDrag1() {
        this.emit('drag1', this);
    }

    onDrag2Start() {
        this.emit('drag2start', this);
    }

    onDrag2End() {
        this.emit('drag2end', this);
    }

    onDrag2() {
        this.emit('drag2', this);
    }

    get isDrag() {
        return (this.tracerState === TOUCH1) && (this.pointers[0].justMoved);
    }

    get isDrag2() {
        return (this.tracerState === TOUCH2) && (this.pointers[0].justMoved || this.pointers[1].justMoved);
    }

    get distanceBetween() {
        if (this.tracerState !== TOUCH2) {
            return 0;
        }
        var p0 = this.pointers[0],
            p1 = this.pointers[1];
        return DistanceBetween(p0.x, p0.y, p1.x, p1.y);
    }

    get angleBetween() {
        if (this.tracerState !== TOUCH2) {
            return 0;
        }
        var p0 = this.pointers[0],
            p1 = this.pointers[1];
        return AngleBetween(p0.x, p0.y, p1.x, p1.y);
    }

    get drag1Vector() {
        var pointer = this.pointers[0];
        if (pointer) {
            tmpDragVector.x = pointer.x - pointer.prevPosition.x;
            tmpDragVector.y = pointer.y - pointer.prevPosition.y;
        } else {
            tmpDragVector.x = 0;
            tmpDragVector.y = 0;
        }
        return tmpDragVector;
    }
}

const TOUCH0 = 0;
const TOUCH1 = 1;
const TOUCH2 = 2;

var tmpDragVector = {};

export default TwoPointersTracer;