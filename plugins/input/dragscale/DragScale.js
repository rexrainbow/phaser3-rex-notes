import GetDefaultBounds from '../../utils/defaultbounds/GetDefaultBounds.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const SpliceOne = Phaser.Utils.Array.SpliceOne;
const DistanceBetween = Phaser.Math.Distance.Between;

class DragScale extends EE {
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
                break;
            case TOUCH1:
                this.state = TOUCH2;
                this.onDragStart();
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
                break;
            case TOUCH2:
                this.state = TOUCH1;
                this.onDragEnd();
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

        if (this.state !== TOUCH2) {
            return;
        }
        this.onDragging();
    }

    dragCancel() {
        if (this.state === TOUCH2) {
            this.onDragEnd();
        }
        this.pointers.length = 0;
        this.state = TOUCH0;
        return this;
    }

    onDragStart() {
        this.prevDragDistance = this.dragDistance;
        this.emit('dragstart', this);
    }

    onDragEnd() {
        this.prevDragDistance = 0;
        this.emit('dragend', this);
    }

    onDragging() {
        this.emit('drag', this);
    }

    get isDragging() {
        return (this.state === TOUCH2);
    }

    get dragDistance() {
        if (!this.isDragging) {
            return 0;
        }
        var p0 = this.pointers[0],
            p1 = this.pointers[1];

        return DistanceBetween(p0.x, p0.y, p1.x, p1.y);
    }

    get scaleFactor() {
        if (!this.isDragging) {
            return 0;
        }
        var curDragDistance = this.dragDistance;
        var scaleFactor = (curDragDistance / this.prevDragDistance);
        this.prevDragDistance = curDragDistance;
        return scaleFactor;
    }
}

const TOUCH0 = 0;
const TOUCH1 = 1;
const TOUCH2 = 2;

export default DragScale;