'use strict'

import EE from 'eventemitter3';
import GetSceneObject from './../utils/system/GetSceneObject.js';
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class DragDeltaPlugin extends EE {
    constructor(gameobject, config) {
        super();
        this.gameobject = gameobject;
        this.scene = GetSceneObject(gameobject);

        this.enable = null;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.preX = undefined;
        this.preY = undefined;
        this.dX = undefined;
        this.dY = undefined;
        this.setEnable(GetAdvancedValue(o, "enable", true));
        return this;
    }

    boot() {
        if (this.gameobject.on) {
            this.gameobject.on('pointerdown', this.onDragStart, this);
            this.gameobject.on('pointermove', this.onDragging, this);
            this.gameobject.on('pointerup', this.onDragEnd, this);
            this.gameobject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.removeAllListeners();
        this.gameobject = undefined;
        this.scene = undefined;
        // gameobject event 'pointerdown','pointermove','pointerup' will be removed when this gameobject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    setEnable(e) {
        if (this.enable === null) {
            this.gameobject.setInteractive(); // only need setInteractive once
        }

        this.enable = !!e;
        if (!this.enable) {
            this.onDragEnd();
        }
        return this;
    }

    onDragStart(pointer) {
        if (!this.enable) {
            return;
        }
        this.preX = pointer.x;
        this.preY = pointer.y;
    }

    onDragging(pointer) {
        if (this.preX === undefined) {
            return;
        }        
        var x = pointer.x;
        var y = pointer.y;
        this.dX = x - this.preX;
        this.dY = y - this.preY;
        this.emit('dragdelta', this.dX, this.dY);
        this.preX = x;
        this.preY = y;
    }

    onDragEnd() {
        this.preX = undefined;
        this.preY = undefined;
    }
}

export default DragDeltaPlugin;