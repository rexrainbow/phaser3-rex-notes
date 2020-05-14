import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetSceneObject from '../../utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Button {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this._enable = undefined;
        gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
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
        this.gameObject.on('pointerdown', this.onPress, this);
        this.gameObject.on('pointerup', this.onRelease, this);
        this.gameObject.on('pointerout', this.onPointOut, this);
        this.gameObject.on('pointermove', this.onMove, this);
        this.gameObject.on('destroy', this.destroy, this);
    }

    shutdown() {
        this.destroyEventEmitter();
        this.pointer = null;
        this.gameObject = null;
        this.scene = null;
        // gameObject events will be removed when this gameObject destroyed 
    }

    destroy() {
        this.shutdown();
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
        this.emit(eventName, this, this.gameObject);
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

    // internal
    onPress(pointer, localX, localY, event) {
        if (this.pointer !== undefined) {
            return;
        }
        this.pointer = pointer;
        if (this.mode === 0) {
            this.click(pointer.downTime, pointer, event);
        }
    }

    onRelease(pointer, localX, localY, event) {
        if (this.pointer !== pointer) {
            return;
        }
        if (this.mode === 1) {
            this.click(pointer.upTime, pointer, event);
        }
        this.pointer = undefined;
    }

    onPointOut(pointer, event) {
        if (this.pointer !== pointer) {
            return;
        }
        this.cancel();
    }

    onMove(pointer, localX, localY, event) {
        if (this.pointer !== pointer) {
            return;
        }

        if (this.dragThreshold === undefined) {
            return;
        }

        if (pointer.getDistance() >= this.dragThreshold) {
            this.cancel();
        }
    }

    click(nowTime, pointer, event) {
        if (!this.enable) {
            return this;
        }

        if (nowTime === undefined) {
            // fires 'click' event manually
            this.emit('click', this, this.gameObject, pointer, event);
            return this;
        }

        this.pointer = undefined;
        var lastClickTime = this.lastClickTime;
        if ((lastClickTime !== undefined) &&
            ((nowTime - lastClickTime) <= this.clickInterval)) {
            return this;
        }
        this.lastClickTime = nowTime;
        this.emit('click', this, this.gameObject, pointer, event);
        return this;
    }

    cancel() {
        this.pointer = undefined;
        return this;
    }
}

Object.assign(
    Button.prototype,
    EventEmitterMethods
);

const CLICKMODE = {
    press: 0,
    pointerdown: 0,
    release: 1,
    pointerup: 1,
};

export default Button;