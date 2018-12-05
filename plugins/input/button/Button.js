import GetSceneObject from '../../utils/system/GetSceneObject.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class Button extends EE {
    constructor(gameObject, config) {
        super();
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

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
        return this;
    }

    boot() {
        this.gameObject.on('pointerdown', this.onPress, this);
        this.gameObject.on('pointerup', this.onRelease, this);
        this.gameObject.on('pointerout', this.onPointOut, this);
        this.gameObject.on('destroy', this.destroy, this);
    }

    shutdown() {
        super.shutdown();
        this.pointer = undefined;
        this.gameObject = undefined;
        this.scene = undefined;
        // gameObject events will be removed when this gameObject destroyed 
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
            this.pointer = undefined;
        }
        this.enable = e;
        this.gameObject.input.enabled = e;
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

    // internal
    onPress(pointer) {
        if (this.pointer !== undefined) {
            return;
        }
        this.pointer = pointer;
        if (this.mode === 0) {
            this.click(pointer.downTime);
        }
    }

    onRelease(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        if (this.mode === 1) {
            this.click(pointer.upTime);
        }
        this.pointer = undefined;
    }

    onPointOut(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
    }

    click(nowTime) {
        if (nowTime === undefined) {
            // fires 'click' event manually
            this.emit('click', this, this.gameObject);
            return this;
        }

        this.pointer = undefined;
        var lastClickTime = this.lastClickTime;
        if ((lastClickTime !== undefined) &&
            ((nowTime - lastClickTime) <= this.clickInterval)) {
            return this;
        }
        this.lastClickTime = nowTime;
        this.emit('click', this, this.gameObject);
        return this;
    }
}

const CLICKMODE = {
    'press': 0,
    'pointerdown': 0,
    'release': 1,
    'pointerup': 1,
};

export default Button;