'use strict'

import GetSceneObject from './../utils/system/GetSceneObject.js';
import VectorToCursorKeys from './../utils/vectortocursorkeys/VectorToCursorKeys.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class DragCursorPlugin extends VectorToCursorKeys {
    constructor(parent, config) {
        super(config);
        this.parent = parent;        
        //this.resetFromJSON(config); // this function had been called in super(config)
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        super.resetFromJSON(o);

        this.pointerId = null;
        if (this.cfg.origin == undefined) {
            this.cfg.origin = {};
        }
        if (this.origin == undefined) {
            this.origin = {};
        }

        var ox = GetAdvancedValue(o, 'origin.x', null);
        var oy = GetAdvancedValue(o, 'origin.y', null);
        this.setOrigin(ox, oy);

        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        var o = super.toJSON();
        o.origin = {
            x: this.cfg.origin.x,
            y: this.cfg.origin.y
        };

        return o;
    }

    boot() {
        if (!this.parent || !this.parent.input) {
            return;
        }

        var input = this.parent.input;
        if (input instanceof Phaser.Input.InputPlugin) { // parent is scene      
            input.on('pointerdown', this.onDragStart, this);
            input.on('pointerup', this.onDrop, this);
            input.on('pointermove', this.onDragging, this);
        } else { // parent is gameobject
            // TODO
        }
    }
    
    shutdown() {
        var input = this.parent.input;
        input.off('pointerdown', this.onDragStart, this);
        input.off('pointerup', this.onDragStart, this);
        input.off('pointermove', this.onDragStart, this);
    }

    destroy() {
        this.shutdown();
    } 

    setOrigin(x, y) {
        var o = this.cfg.origin;
        o.x = x;
        o.y = y;
        return this;
    }

    onDragStart(pointer) {
        if (this.pointerId !== null) {
            return;
        }
        this.pointerId = pointer.id;
        var defaultOriginMode = (this.cfg.origin.x !== null);
        this.origin.x = (defaultOriginMode) ? this.cfg.origin.x : pointer.x;
        this.origin.y = (defaultOriginMode) ? this.cfg.origin.y : pointer.y;
        this.setVector(this.origin.x, this.origin.y, pointer.x, pointer.y);
    }

    onDragging(pointer) {
        if ((this.pointerId !== pointer.id) || (!pointer.isDown)) {
            return;
        }
        this.setVector(this.origin.x, this.origin.y, pointer.x, pointer.y);
    }

    onDrop(pointer) {
        if (this.pointerId !== pointer.id) {
            return;
        }
        this.pointerId = null;
        this.origin.x = null;
        this.origin.y = null;
        this.cleanVector();
    }

}

export default DragCursorPlugin;