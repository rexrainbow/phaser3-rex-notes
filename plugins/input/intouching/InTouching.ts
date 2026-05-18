import ComponentBase from '../../utils/componentbase/ComponentBase';
import Cooldown from '../../utils/time/cooldown/Cooldown';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class InTouching extends ComponentBase {
    _enable: any;
    cooldown: any;
    emit: any;
    isInTouching: any;
    isShutdown: any;
    parent: any;
    pointer: any;
    prevIsInTouch: any;
    scene: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._enable = undefined;
        this.cooldown = new Cooldown();
        this.parent.setInteractive(GetValue(config, 'inputConfig', undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
        this.pointer = undefined;
        this.prevIsInTouch = false;
        this.isInTouching = false;
        this.setEnable(GetValue(o, 'enable', true));
        this.setCooldown(GetValue(o, 'cooldown', undefined));
        return this;
    }

    boot() {
        var gameObject = this.parent;
        gameObject.on('pointerdown', this.onPointIn, this);
        gameObject.on('pointerover', this.onPointIn, this);
        gameObject.on('pointerup', this.onPointOut, this);
        gameObject.on('pointerout', this.onPointOut, this);
        this.scene.sys.events.on('preupdate', this.preupdate, this);
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // GameObject events will be removed when this gameObject destroyed 
        // this.parent.off('pointerdown', this.onPointIn, this);
        // this.parent.off('pointerover', this.onPointIn, this);
        // this.parent.off('pointerup', this.onPointOut, this);
        // this.parent.off('pointerout', this.onPointOut, this);
        this.scene.sys.events.off('preupdate', this.preupdate, this);

        this.pointer = undefined;
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
            this.prevIsInTouch = false;
            this.isInTouching = false;
            this.pointer = undefined;
        }
        this._enable = e;
        return this;
    }

    setEnable(e?: any) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    get cooldownTime() {
        return this.cooldown.cooldownTime;
    }

    set cooldownTime(time) {
        this.cooldown.setCooldownTime(time);
    }

    setCooldown(time?: any) {
        this.cooldownTime = time;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    // internal
    onPointIn(pointer?: any, localX?: any, localY?: any) {
        if ((!this.enable) ||
            (!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.isInTouching = true;
    }

    onPointOut(pointer?: any) {
        if ((!this.enable) ||
            (this.pointer !== pointer)) {
            return;
        }
        this.pointer = undefined;
        this.isInTouching = false;
    }

    preupdate(time?: any, delta?: any) {
        this.cooldown.update(time, delta);

        if (!this.prevIsInTouch && this.isInTouching) {
            this.emit('touchstart', this, this.parent);
        }

        if (this.isInTouching && this.cooldown.request()) {
            this.emit('intouch', this, this.parent, this.pointer);
        }
        
        if (this.prevIsInTouch && !this.isInTouching) {
            this.emit('touchend', this, this.parent);
        }

        this.prevIsInTouch = this.isInTouching;
    }
}

export default InTouching;