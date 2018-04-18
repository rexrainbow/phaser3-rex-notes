'use strict'

import GetSceneObject from './../utils/system/GetSceneObject.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const RotateAroundDistance = Phaser.Math.RotateAroundDistance;

var P1 = {
    x: 0,
    y: 0
}; // reuse this point object

class DragDropPlugin {
    constructor(gameobject, config) {
        this.gameobject = gameobject;
        this.scene = GetSceneObject(gameobject);
        
        this.enable = null;
        this.resetFromJSON(config);
        this.boot();
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
        this.gameobject.on('drag', this.onDragging, this);
        this.gameobject.on('destroy', this.destroy, this);     
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
            var dist;
            P1.x = dragX;
            P1.y = dragY;

            dist = DistanceBetween(P1.x, P1.y, gameobject.x, gameobject.y);
            P1 = RotateAroundDistance(P1, gameobject.x, gameobject.y, -this.axisRotation, dist);

            if (this.axisMode === 1) {
                P1.y = gameobject.y;
            } else if (this.axisMode === 2) {
                P1.x = gameobject.x;
            }
            dist = DistanceBetween(P1.x, P1.y, gameobject.x, gameobject.y);
            P1 = RotateAroundDistance(P1, gameobject.x, gameobject.y, this.axisRotation, dist);

            gameobject.x = P1.x;
            gameobject.y = P1.y;
        }

    }

    get isDragging() {
        return (this.gameobject.input.dragState > 0);
    }
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