'use strict'

import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const getDist = Phaser.Math.Distance.Power;

class DragDelta extends EE {
    constructor(gameobject, config) {
        super();
        this.gameobject = gameobject;
        this.scene = GetSceneObject(gameobject);

        this.enable = null;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.x = undefined;
        this.y = undefined;
        this.preX = undefined;
        this.preY = undefined;
        this.dx = undefined;
        this.dy = undefined;
        this.setEnable(GetValue(o, "enable", true));
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
        super.shutdown();
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

        if (e === undefined) {
            e = true;
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
        var x = pointer.x,
            y = pointer.y;
        this.x = x;
        this.y = y;
        this.dx = x - this.preX;
        this.dy = y - this.preY;
        this.emit('dragdelta', this);
        this.preX = x;
        this.preY = y;
    }

    onDragEnd() {
        this.preX = undefined;
        this.preY = undefined;
    }

    get dt() {
        var game = this.scene.sys.game;
        var delta = game.loop.delta;
        return delta;
    }

    get speed() {
        var d = getDist(this.x, this.preX, this.y, this.preY);
        var speed = d / (this.dt * 0.001);
        return speed;
    }
}

export default DragDelta;