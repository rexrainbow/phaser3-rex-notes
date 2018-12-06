const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const SpliceOne = Phaser.Utils.Array.SpliceOne;
const DistanceBetween = Phaser.Math.Distance.Between;

class DragScale extends EE {
    constructor(gameObject, config) {
        var scene = gameObject.scene;
        var amount = scene.input.manager.pointersTotal;
        if (amount < 2) {
            scene.input.addPointer(2 - amount);
        }

        super();
        this.gameObject = gameObject;
        this.scene = scene;
        this.state = TOUCH0;
        this.pointers = [];
        this.prevDragDistance = 0;
        this.setAutoScaleEnable(GetValue(config, 'autoScale', false));
        this.boot();
    }
    boot() {
        this.gameObject.on('pointerdown', this.onPointerDown, this);
        this.gameObject.on('pointerup', this.onPointerUp, this);
        this.gameObject.on('pointermove', this.onPointerMove, this);
        this.gameObject.on('pointerout', this.onPointerUp, this);

        this.gameObject.on('destroy', this.destroy, this);
    }

    shutdown() {
        // gameObject events will be removed when this gameObject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    setAutoScaleEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.autoScale = enable;
        return this;
    }

    onPointerDown(pointer) {
        if (this.pointer.length === 2) {
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
        var index = this.pointers.indexOf(pointer)
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
        if (this.autoScale) {
            var scaleFactor = this.scaleFactor;
            this.gameObject.scaleX *= scaleFactor;
            this.gameObject.scaleY *= scaleFactor;
        }
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