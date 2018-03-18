'use strict'

import Phaser from 'phaser';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class DragDropPlugin {
    constructor(gameobject, config) {
        this.gameobject = gameobject;
        this.scene = gameobject.scene;
        this.boot();

        this.enable = null;
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.setEnable(GetAdvancedValue(o, "enable", true));
        this.setAxisMode(GetAdvancedValue(o, "axis", 0));
        this.setAxisRotation(GetAdvancedValue(o, "rotation", 0));
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            enable: this.enable,
            axis: this.axisMode,
            rotation: this.axisRotation
        };
    }

    boot() {
        //var eventEmitter = this.gameobject;
        //if (eventEmitter) {
        //    eventEmitter.on('shutdown', this.shutdown, this);
        //    eventEmitter.on('destroy', this.destroy, this);
        //}                

        this.init();
    }

    init() {
        this.gameobject.on('drag', this.onDragging, this);
    }

    shutdown() {
        this.gameobject = undefined;
        this.scene = undefined;
        // gameobject event 'drag' will be removed when this gameobject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    setEnable(e) {
        if (this.enable === null) {
            this.gameobject.setInteractive(); // only need setInteractive once
        }

        e = !!e;
        if (this.enable === e) {
            return this;
        }

        this.enable = e;
        this.scene.input.setDraggable(this.gameobject, e);
        return this;
    }

    setAxisMode(m) {
        if (typeof (m) === 'string') {
            m = AXISMODE[m];
        }
        this.axisMode = m;
        return this;
    }

    setAxisRotation(a) {
        this.axisRotation = a;
        return this;
    }

    drag() {
        var activePointer = this.gameobject.scene.input.activePointer;
        if ((activePointer.dragState === 0) &&
            activePointer.primaryDown &&
            activePointer.justDown &&
            this.hitTest(activePointer)) {
            activePointer.dragState = 1;
        }
    }

    hitTest(pointer) {
        var gameobject = this.gameobject;
        var manager = pointer.manager;
        var camera = gameobject.scene.cameras.getCameraBelowPointer(pointer);
        var output = manager.hitTest(pointer.x, pointer.y, [gameobject], camera);
        return (output.length > 0);
    }

    dragend() {
        var activePointer = this.gameobject.scene.input.activePointer;
        if (activePointer.dragState > 0) {
            activePointer.dragState = 5;
        }
    }

    onDragging(pointer, dragX, dragY) {
        var gameobject = this.gameobject;
        if (this.axisMode === 0) {
            gameobject.x = dragX;
            gameobject.y = dragY;
        } else if (this.axisRotation === 0) {
            if (this.axisMode === 1) {
                gameobject.x = dragX;
            } else if (this.axisMode === 2) {
                gameobject.y = dragY;
            }
        } else {
            P0.x = gameobject.x;
            P0.y = gameobject.y;
            P1.x = dragX;
            P1.y = dragY;
            P1 = rotatePoint(P1, P0, -this.axisRotation);

            if (this.axisMode === 1) {
                P1.y = P0.y;
            } else if (this.axisMode === 2) {
                P1.x = P0.x;
            }
            P1 = rotatePoint(P1, P0, this.axisRotation);
            gameobject.x = P1.x;
            gameobject.y = P1.y;
        }

    }

    get isDragging() {
        return (this.gameobject.input.dragState > 0);
    }
}

var P0 = {};
var P1 = {};
var rotatePoint = function (p1, p0, rad) {
    var dx = p1.x - p0.x;
    var dy = p1.y - p0.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var newRad = Math.atan2(dy, dx) + rad;
    p1.x = p0.x + (dist * Math.cos(newRad));
    p1.y = p0.y + (dist * Math.sin(newRad));
    return p1;
}

/** @private */
const AXISMODE = {
    'both': 0,
    'h&v': 0,
    'horizontal': 1,
    'h': 1,
    'vertical': 2,
    'v': 2
};


export default DragDropPlugin;