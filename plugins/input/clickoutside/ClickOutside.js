import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import IsPointerInHitArea from '../../utils/input/IsPointerInHitArea.js';
import IsPointerInBounds from '../../utils/input/IsPointerInBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ClickOutside extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._enable = undefined;

        var inputConfig = GetValue(config, "inputConfig", undefined);
        if (inputConfig) {
            gameObject.setInteractive(inputConfig);
        }

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.pointer = undefined;
        this.lastClickTime = undefined;
        this.setEnable(GetValue(o, "enable", true));
        this.setMode(GetValue(o, "mode", 1));
        this.setClickInterval(GetValue(o, "clickInterval", 100));
        this.setDragThreshold(GetValue(o, 'threshold', undefined));
        return this;
    }

    boot() {
        var scene = this.parent.scene;
        scene.input.on('pointerdown', this.onPress, this);
        scene.input.on('pointerup', this.onRelease, this);
        scene.input.on('pointermove', this.onMove, this);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        var scene = this.parent.scene;
        scene.input.off('pointerdown', this.onPress, this);
        scene.input.off('pointerup', this.onRelease, this);
        scene.input.off('pointermove', this.onMove, this);
        this.pointer = null;

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
            this.cancel();
        }
        this._enable = e;

        var eventName = (e) ? 'enable' : 'disable';
        this.emit(eventName, this, this.parent);
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

    setMode(m) {
        if (typeof (m) === 'string') {
            m = CLICKMODE[m];
        }
        this.mode = m;
        return this;
    }

    setClickInterval(interval) {
        this.clickInterval = interval; // ms
        return this;
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }

    isPointerInside(pointer) {
        var gameObject = this.parent;
        var isInsideCallback = (gameObject.input) ? IsPointerInHitArea : IsPointerInBounds;
        return isInsideCallback(gameObject, pointer);
    }

    // internal
    onPress(pointer) {
        // Do nothing if game object is not visible
        if (!this.parent.willRender(pointer.camera)) {
            return;
        }

        if (this.pointer !== undefined) {
            return;
        }

        if (this.isPointerInside(pointer)) {
            return;
        }

        this.pointer = pointer;

        if (this.mode === 0) {
            if (!this.isPointerInside(pointer)) {
                this.click(pointer.downTime, pointer);
            }
        }
    }

    onRelease(pointer) {
        // Do nothing if game object is not visible
        if (!this.parent.willRender(pointer.camera)) {
            return;
        }

        if (this.pointer !== pointer) {
            return;
        }

        if (this.mode === 1) {
            if (!this.isPointerInside(pointer)) {
                this.click(pointer.upTime, pointer);
            }
        }

        this.pointer = undefined;
    }

    onMove(pointer, localX, localY, event) {
        if (this.pointer !== pointer) {
            return;
        }

        if (this.dragThreshold === undefined) {
            return;
        }

        if (this.mode === 1) {
            if ((pointer.getDistance() >= this.dragThreshold) ||
                (this.isPointerInside(pointer))) {
                this.cancel();
            }
        }
    }

    click(nowTime, pointer) {
        if (!this.enable) {
            return this;
        }

        if (nowTime === undefined) {
            // fires 'clickoutside' event manually
            this.emit('clickoutside', this, this.parent, pointer);
            return this;
        }

        this.pointer = undefined;
        var lastClickTime = this.lastClickTime;
        if ((lastClickTime !== undefined) &&
            ((nowTime - lastClickTime) <= this.clickInterval)) {
            return this;
        }
        this.lastClickTime = nowTime;
        this.emit('clickoutside', this, this.parent, pointer);

        return this;
    }

    cancel() {
        this.pointer = undefined;
        return this;
    }
}

const CLICKMODE = {
    press: 0,
    pointerdown: 0,
    release: 1,
    pointerup: 1,
};

export default ClickOutside;