'use strict'

import Phaser from 'phaser';
import GetEventEmmiter from './../utils/system/GetEventEmmiter.js';
import VectorToCursorKeys from './../utils/input/VectorToCursorKeys.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class DragCursorPlugin extends VectorToCursorKeys {
    constructor(parent, config) {
        super(config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        this.parent = parent;
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

        var ox = GetValue(o, 'origin.x', null);
        var oy = GetValue(o, 'origin.y', null);
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
        var eventEmitter = GetEventEmmiter(this.parent);
        if (eventEmitter) {
            eventEmitter.on('shutdown', this.shutdown, this);
            eventEmitter.on('destroy', this.destroy, this);
        }

        this.init();
    }

    init() {
        if (!this.parent || !this.parent.input) {
            return;
        }

        var self = this;
        var input = this.parent.input;
        if (input instanceof Phaser.Input.InputPlugin) { // parent is scene      
            input.on('pointerdown', this.onDragStart, this);
            input.on('pointerup', this.onDrop, this);
            input.on('pointermove', this.onDragging, this);
        } else { // parent is gameobject
            // TODO
        }
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

    shutdown() {
        var input = this.parent.input;
        input.removeListener('pointerdown', this.onDragStart, this);
        input.removeListener('pointerup', this.onDragStart, this);
        input.removeListener('pointermove', this.onDragStart, this);
    }

    destroy() {
        this.shutdown();
    }
}

export default DragCursorPlugin;