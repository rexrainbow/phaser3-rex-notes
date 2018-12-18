import GetDefaultBounds from '../../utils/defaultbounds/GetDefaultBounds.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const SpliceOne = Phaser.Utils.Array.SpliceOne;
const DistanceBetween = Phaser.Math.Distance.Between;

class Pinch extends EE {
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
        var bounds = GetValue(o, 'bounds', undefined);
        if (bounds === undefined) {
            bounds = GetDefaultBounds(this.scene);
        }
        this.bounds = bounds;

        this.state = TOUCH0;
        this.pointers.length = 0;
        this.prevDragDistance = 0;
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

        if (!this.bounds.contains(pointer.x, pointer.y)) {
            return;
        }

        if (this.pointers.length === 2) {
            return;
        } else {
            this.pointers.push(pointer);
        }

        switch (this.state) {
            case TOUCH0:
                this.state = TOUCH1;
                this.onDrag1Start();
                break;
            case TOUCH1:
                this.state = TOUCH2;
                this.onDrag2Start();
                break;
        }
    }

    onPointerUp(pointer) {
        if (!this.enable) {
            return;
        }

        if (!this.bounds.contains(pointer.x, pointer.y)) {
            return;
        }

        var index = this.pointers.indexOf(pointer);
        if (index === -1) { // Not in catched pointers
            return;
        } else {
            SpliceOne(this.pointers, index);
        }

        switch (this.state) {
            case TOUCH1:
                this.state = TOUCH0;
                this.onDrag1End();
                break;
            case TOUCH2:
                this.state = TOUCH1;
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
        var isInsideBounds = this.bounds.contains(pointer.x, pointer.y);
        var isCatchedPointer = (this.pointers.indexOf(pointer) !== -1);
        if (!isCatchedPointer && isInsideBounds) {
            this.onPointerDown(pointer);
            return;
        } else if (isCatchedPointer && !isInsideBounds) {
            this.onPointerUp(pointer);
            return;
        }

        switch (this.state) {
            case TOUCH1:
                this.onDrag1();
                break;
            case TOUCH2:
                this.onDrag2();
                break;
        }
    }

    dragCancel() {
        if (this.state === TOUCH2) {
            this.onDrag2End();
        }
        this.pointers.length = 0;
        this.state = TOUCH0;
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
        this.prevDragDistance = this.dragDistance;
        this.emit('pinchstart', this);
    }

    onDrag2End() {
        this.prevDragDistance = 0;
        this.emit('pinchend', this);
    }

    onDrag2() {
        this.emit('pinch', this);
    }

    get isDrag() {
        return (this.state === TOUCH1) && (this.pointers[0].justMoved);
    }

    get isPinch() {
        return (this.state === TOUCH2) && (this.pointers[0].justMoved || this.pointers[1].justMoved);
    }

    get dragDistance() {
        if (this.state !== TOUCH2) {
            return 0;
        }
        var p0 = this.pointers[0],
            p1 = this.pointers[1];

        return DistanceBetween(p0.x, p0.y, p1.x, p1.y);
    }

    get scaleFactor() {
        if (this.state !== TOUCH2) {
            return 0;
        }
        var curDragDistance = this.dragDistance;
        var scaleFactor = (curDragDistance / this.prevDragDistance);
        this.prevDragDistance = curDragDistance;
        return scaleFactor;
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

export default Pinch;