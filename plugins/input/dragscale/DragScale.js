import GetDefaultBounds from '../../utils/defaultbounds/GetDefaultBounds.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const SpliceOne = Phaser.Utils.Array.SpliceOne;
const DistanceBetween = Phaser.Math.Distance.Between;

class DragScale extends EE {
    constructor(scene, config) {
        var amount = scene.input.manager.pointersTotal;
        if (amount < 2) {
            scene.input.addPointer(2 - amount);
        }

        super();
        this.scene = scene;

        var bounds = GetValue(config, 'bounds', undefined);
        if (bounds === undefined) {
            bounds = GetDefaultBounds(scene);
        }
        this.bounds = bounds;
        this.state = TOUCH0;
        this.pointers = [];
        this.prevDragDistance = 0;
        this.boot();
    }
    boot() {
        this.scene.input.on('pointerdown', this.onPointerDown, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.on('destroy', this.destroy, this);
    }

    shutdown() {
        if (this.scene) {
            this.scene.input.off('pointerdown', this.onPointerDown, this);
            this.scene.input.off('pointerup', this.onPointerUp, this);
            this.scene.input.off('pointermove', this.onPointerMove, this);
            this.scene.off('destroy', this.destroy, this);
        }
    }

    destroy() {
        this.shutdown();
    }

    onPointerDown(pointer) {
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
        if (!this.bounds.contains(pointer.x, pointer.y)) {
            return;
        }

        var index = this.pointers.indexOf(pointer);
        if (index === -1) {
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

    cancel() {
        this.pointers.length = 0;
        this.state = TOUCH0;
        this.onDragEnd();
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
        var curDragDistance = this.prevDragDistance;
        var scaleFactor = curDragDistance / this.prevDragDistance;
        this.prevDragDistance = curDragDistance;
        return scaleFactor;
    }
}

const TOUCH0 = 0;
const TOUCH1 = 1;
const TOUCH2 = 2;

export default DragScale;