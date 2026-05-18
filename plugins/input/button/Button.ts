import ComponentBase from '../../utils/componentbase/ComponentBase';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Button extends ComponentBase {
    _enable: any;
    clickInterval: any;
    dragThreshold: any;
    emit: any;
    isDown: any;
    isOver: any;
    isShutdown: any;
    lastClickTime: any;
    mode: any;
    parent: any;
    pointer: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._enable = undefined;
        gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
        this.pointer = undefined;
        this.lastClickTime = undefined;
        this.isDown = false;
        this.isOver = false;
        this.setEnable(GetValue(o, "enable", true));
        this.setMode(GetValue(o, "mode", 1));
        this.setClickInterval(GetValue(o, "clickInterval", 100));
        this.setDragThreshold(GetValue(o, 'threshold', undefined));
        return this;
    }

    boot() {
        var gameObject = this.parent;
        gameObject.on('pointerdown', this.onPress, this);
        gameObject.on('pointerup', this.onRelease, this);
        gameObject.on('pointerout', this.onPointOut, this);
        gameObject.on('pointermove', this.onMove, this);

        gameObject.on('pointerover', this.onOver, this);
        gameObject.on('pointerout', this.onOut, this);
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // GameObject events will be removed when this gameObject destroyed 
        // this.parent.on('pointerdown', this.onPress, this);
        // this.parent.on('pointerup', this.onRelease, this);
        // this.parent.on('pointerout', this.onPointOut, this);
        // this.parent.on('pointermove', this.onMove, this);
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

    setEnable(e?: any) {
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

    setMode(m?: any) {
        if (typeof (m) === 'string') {
            m = CLICKMODE[m];
        }
        this.mode = m;
        return this;
    }

    setClickInterval(interval?: any) {
        this.clickInterval = interval; // ms
        return this;
    }

    setDragThreshold(distance?: any) {
        this.dragThreshold = distance;
        return this;
    }

    // internal
    onPress(pointer?: any, localX?: any, localY?: any, event?: any) {
        if (this.pointer !== undefined) {
            return;
        }

        this.pointer = pointer;

        this.isDown = true;
        this.emit('down', this, this.parent, pointer, event);

        if (this.mode === 0) {
            this.click(pointer.downTime, pointer, event);
        }

    }

    onRelease(pointer?: any, localX?: any, localY?: any, event?: any) {
        if (this.pointer !== pointer) {
            return;
        }

        this.isDown = false;
        this.emit('up', this, this.parent, pointer, event);

        if (this.mode === 1) {
            this.click(pointer.upTime, pointer, event);
        }

        this.pointer = undefined;
    }

    onPointOut(pointer?: any, event?: any) {
        if (this.pointer !== pointer) {
            return;
        }

        this.cancel();
    }

    onMove(pointer?: any, localX?: any, localY?: any, event?: any) {
        if (this.pointer !== pointer) {
            return;
        }

        if (this.dragThreshold === undefined) {
            return;
        }

        if (this.mode === 1) {
            if (pointer.getDistance() >= this.dragThreshold) {
                this.cancel();
            }
        }
    }

    onOver(pointer?: any, localX?: any, localY?: any, event?: any) {
        if (!this.enable) {
            return this;
        }

        this.isOver = true;
        this.emit('over', this, this.parent, pointer, event);

        return this;
    }

    onOut(pointer?: any, event?: any) {
        if (!this.enable) {
            return this;
        }

        this.isOver = false;
        this.emit('out', this, this.parent, pointer, event);

        return this;
    }

    click(nowTime?: any, pointer?: any, event?: any) {
        if (!this.enable) {
            return this;
        }

        if (nowTime === undefined) {
            // fires 'click' event manually
            this.emit('click', this, this.parent, pointer, event);
            return this;
        }

        this.pointer = undefined;
        var lastClickTime = this.lastClickTime;
        if ((lastClickTime !== undefined) &&
            ((nowTime - lastClickTime) <= this.clickInterval)) {
            return this;
        }
        this.lastClickTime = nowTime;
        this.emit('click', this, this.parent, pointer, event);
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

export default Button;