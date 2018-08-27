'use strict'

import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const getDist = Phaser.Math.Distance.Between;

class TouchState extends EE {
    constructor(gameObject, config) {
        super();
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isInTouched = false;
        this.pointer = undefined;
        this.x = undefined;
        this.y = undefined;
        this.localX = undefined;
        this.localY = undefined;
        this.preX = undefined;
        this.preY = undefined;
        this.setEnable(GetValue(o, "enable", true));
        this.speedTrace = GetValue(o, 'speedTrace', false); // true to set 'preupdate' callback
        return this;
    }

    boot() {
        this.gameObject.on('pointerdown', this.onPointIn, this);
        this.gameObject.on('pointerover', this.onPointIn, this);
        this.gameObject.on('pointerup', this.onPointOut, this);
        this.gameObject.on('pointerout', this.onPointOut, this);
        this.gameObject.on('pointermove', this.onPointerMove, this);

        this.gameObject.on('destroy', this.destroy, this);

        if (this.speedTrace) {
            this.scene.events.on('postupdate', this.postupdate, this);
        }
    }

    shutdown() {
        super.shutdown();
        if (this.speedTrace) {
            this.scene.events.off('postupdate', this.postupdate, this);
        }        
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

        this.enable = e;
        this.gameObject.input.enabled = e;

        if (!e) {
            this.isInTouched = false;
        }
        return this;
    }

    onPointIn(pointer, localX, localY) {
        if (!pointer.isDown ||
            (this.pointer !== undefined)) {
            return;
        }
        this.isInTouched = true;
        this.pointer = pointer;
        this.preX = pointer.x;
        this.preY = pointer.y;
        this.x = pointer.x;
        this.y = pointer.y;
        this.localX = localX;
        this.localY = localY;
        this.emit('touchstart', pointer, localX, localY);
    }

    onPointOut(pointer) {
        if (this.pointer !== pointer) {
            return;
        }
        this.isInTouched = false;
        this.pointer = undefined;
        this.emit('touchend', pointer);
    }

    onPointerMove(pointer, localX, localY) {
        if (!pointer.isDown ||
            (this.pointer !== pointer)) {
            return;
        }
        this.preX = this.x;
        this.preY = this.y;
        this.x = pointer.x;
        this.y = pointer.y;
        this.localX = localX;
        this.localY = localY;
        this.emit('touchmove', pointer, localX, localY);
    }

    get dx() {
        return this.x - this.preX;
    }

    get dy() {
        return this.y - this.preY;
    }

    get dt() {
        var game = this.scene.sys.game;
        var delta = game.loop.delta;
        return delta;
    }

    get speed() {
        if ((this.x === this.preX) && (this.y === this.preY)) {
            return 0;
        }
        var d = getDist(this.x, this.preX, this.y, this.preY);
        var speed = d / (this.dt * 0.001);
        return speed;
    }

    postupdate(time, delta) {
        if (this.pointer === undefined) {
            return;
        }
        if (!this.pointer.justMoved) {
            this.preX = this.x;
            this.preY = this.y;
        }
    }
}

export default TouchState;