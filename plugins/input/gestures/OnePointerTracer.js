import TickTask from '../../utils/ticktask/TickTask.js';
import GetDefaultBounds from '../../utils/defaultbounds/GetDefaultBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class OnePointerTracer extends TickTask {
    constructor(scene, config) {
        super(scene, config);

        this.scene = scene;
        this.pointer = undefined;
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
        this.pointer = undefined;
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

        if (this.pointer === pointer) {
            return;
        }

        if (!this.bounds.contains(pointer.x, pointer.y)) {
            return;
        }

        if (this.pointer !== undefined) {
            return;
        }

        this.pointer = pointer;
        this.state = TOUCH1;
        this.onDragStart();
    }

    onPointerUp(pointer) {
        if (!this.enable) {
            return;
        }

        if (!this.bounds.contains(pointer.x, pointer.y)) {
            return;
        }

        if (this.pointer !== pointer) {
            return;
        }

        this.pointer = undefined;
        this.state = TOUCH0;
        this.onDragEnd();
    }

    onPointerMove(pointer) {
        if (!this.enable) {
            return;
        }

        if (!pointer.isDown) {
            return;
        }
        var isInsideBounds = this.bounds.contains(pointer.x, pointer.y);
        var isCatchedPointer = (this.pointer === pointer);
        if (!isCatchedPointer && isInsideBounds) {
            this.onPointerDown(pointer);
            return;
        } else if (isCatchedPointer && !isInsideBounds) {
            this.onPointerUp(pointer);
            return;
        }

        this.onDrag();
    }

    dragCancel() {
        if (this.state === TOUCH1) {
            this.onDragEnd();
        }
        this.pointer = undefined;
        this.state = TOUCH0;
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

    get isDrag() {
        return (this.state === TOUCH1) && (this.pointer.justMoved);
    }

    startTicking() {
        super.startTicking();
        this.scene.events.on('preupdate', this.everytick, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('preupdate', this.everytick, this);
        }
    }

    everytick(time, delta) {
        return this;
    }
}

const TOUCH0 = 0;
const TOUCH1 = 1;

export default OnePointerTracer;