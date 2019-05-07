import TickTask from '../../utils/ticktask/TickTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class OnePointerTracer extends TickTask {
    constructor(scene, config) {
        super(scene, config);

        this.scene = scene;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, "enable", true));
        this.bounds = GetValue(o, 'bounds', undefined);

        this.tracerState = TOUCH0;
        this._pointer = undefined;
        this.pointer = undefined; // Last catched pointer
        return this;
    }

    boot() {
        super.boot();
        this.scene.input.on('pointerdown', this.onPointerDown, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.events.on('destroy', this.destroy, this);
    }

    shutdown() {
        super.shutdown();
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

        if (this._pointer === pointer) {
            return;
        }

        var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
            return;
        }

        if (this._pointer !== undefined) {
            return;
        }

        this._pointer = pointer;
        this.pointer = pointer;
        this.tracerState = TOUCH1;
        this.onDragStart();
    }

    onPointerUp(pointer) {
        if (!this.enable) {
            return;
        }

        var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
            return;
        }

        if (this._pointer !== pointer) {
            return;
        }

        this._pointer = undefined;
        this.tracerState = TOUCH0;
        this.onDragEnd();
    }

    onPointerMove(pointer) {
        if (!this.enable) {
            return;
        }

        if (pointer.isDown) {
            var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            var isCatchedPointer = (this._pointer === pointer);
            if (!isCatchedPointer && isInsideBounds) { // Pointer moves into bounds
                this.onPointerDown(pointer);
            } else if (isCatchedPointer && !isInsideBounds) { // Pointer moves out of bounds
                this.onPointerUp(pointer);
            } else { // Pointer drags in bounds
                this.onDrag();
            }
        } else {
            var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            var isLastCatchedPointer = (this.pointer === pointer);
            if (isLastCatchedPointer && isInsideBounds) {
                this.onLastPointerMove();
            }
        }
    }

    dragCancel() {
        if (this.tracerState === TOUCH1) {
            this.onDragEnd();
        }
        this._pointer = undefined;
        this.tracerState = TOUCH0;
        return this;
    }

    onDragStart() {
        this.emit('dragstart', this);
    }

    onDragEnd() {
        this.emit('dragend', this);
    }

    onDrag() {
        this.emit('drag', this);
    }

    onLastPointerMove() { }

    everyTick(time, delta) { }

    get isDrag() {
        return (this.tracerState === TOUCH1) && (this._pointer.justMoved);
    }

    startTicking() {
        super.startTicking();
        this.scene.events.on('preupdate', this.everyTick, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('preupdate', this.everyTick, this);
        }
    }

}

const TOUCH0 = 0;
const TOUCH1 = 1;

export default OnePointerTracer;