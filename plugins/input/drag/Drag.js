'use strict'

import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const RotateAroundDistance = Phaser.Math.RotateAroundDistance;

class Drag {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.pointerId = undefined;
        this.setEnable(GetValue(o, "enable", true));
        this.setAxisMode(GetValue(o, "axis", 0));
        this.setAxisRotation(GetValue(o, "rotation", 0));
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
        var gameObject = this.gameObject;
        if (gameObject.on) {
            gameObject.on('dragstart', this.onDragStart, this);
            gameObject.on('drag', this.onDrag, this);
            gameObject.on('dragend', this.onDragEnd, this);
            gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
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
        this.scene.input.setDraggable(this.gameObject, e);
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
        var inputManager = this.scene.input.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers,
            pointer;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];
            if ((pointer.dragState === 0) &&
                pointer.primaryDown &&
                pointer.justDown &&
                this.hitTest(pointer)) {
                pointer.dragState = 1;
                break;
            }
        }
    }

    hitTest(pointer) {
        var gameObjects = [this.gameObject];
        var cameras = this.scene.input.cameras.getCamerasBelowPointer(pointer);
        var inputManager = this.scene.input.manager;
        var hitResult = false,
            output;
        for (var i = 0, len = cameras.length; i < len; i++) {
            output = inputManager.hitTest(pointer, gameObjects, cameras[i]);
            if (output.length > 0) {
                hitResult = true;
                break;
            }
        }

        return hitResult;
    }

    dragend() {
        if (!this.isDragging) {
            return;
        }
        var pointer = this.scene.input.manager.pointers[this.pointerId];
        pointer.dragState = 5;
    }

    onDragStart(pointer, dragX, dragY) {
        if (this.isDragging) {
            return;
        }
        this.pointerId = pointer.id;
    }

    onDrag(pointer, dragX, dragY) {
        if (pointer.id !== this.pointerId) {
            return;
        }
        var gameObject = this.gameObject;
        if (this.axisMode === 0) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        } else if (this.axisRotation === 0) {
            if (this.axisMode === 1) {
                gameObject.x = dragX;
            } else if (this.axisMode === 2) {
                gameObject.y = dragY;
            }
        } else {
            var dist;
            P1.x = dragX;
            P1.y = dragY;

            dist = DistanceBetween(P1.x, P1.y, gameObject.x, gameObject.y);
            P1 = RotateAroundDistance(P1, gameObject.x, gameObject.y, -this.axisRotation, dist);

            if (this.axisMode === 1) {
                P1.y = gameObject.y;
            } else if (this.axisMode === 2) {
                P1.x = gameObject.x;
            }
            dist = DistanceBetween(P1.x, P1.y, gameObject.x, gameObject.y);
            P1 = RotateAroundDistance(P1, gameObject.x, gameObject.y, this.axisRotation, dist);

            gameObject.x = P1.x;
            gameObject.y = P1.y;
        }

    }

    onDragEnd(pointer, dragX, dragY, dropped) {
        if (pointer.id !== this.pointerId) {
            return;
        }
        this.pointerId = undefined;
    }

    get isDragging() {
        return (this.pointerId !== undefined);
    }
}

var P1 = {}; // reuse this point object

/** @private */
const AXISMODE = {
    'both': 0,
    'h&v': 0,
    'x&y': 0,
    'horizontal': 1,
    'h': 1,
    'x': 1,
    'vertical': 2,
    'v': 2,
    'y': 2
};


export default Drag;