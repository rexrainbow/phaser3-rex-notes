'use strict'

import VectorToCursorKeys from 'rexPlugins/utils/vectortocursorkeys/VectorToCursorKeys.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Geom = Phaser.Geom;

class TouchCursor extends VectorToCursorKeys {
    constructor(gameObject, config) {
        super(config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        this.gameObject = gameObject;
        this.scene = gameObject.scene;
        this.radius = GetValue(config, 'radius', 100);
        gameObject.setInteractive(new Geom.Circle(0, 0, this.radius), Geom.Circle.Contains);
        this.boot();
    }


    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.pointerId = undefined;

        return this;
    }

    toJSON() {
        var o = super.toJSON();
        o.radius = this.radius;

        return o;
    }

    boot() {
        this.gameObject.on('pointerdown', this.onKeyDownStart, this);
        this.gameObject.on('pointerover', this.onKeyDownStart, this);

        var sceneInput = this.scene.input;
        sceneInput.on('pointermove', this.onKeyDown, this);
        sceneInput.on('pointerup', this.onKeyUp, this);

        this.gameObject.on('destroy', this.destroy, this);
    }

    shutdown() {
        var sceneInput = this.scene.input;
        sceneInput.off('pointermove', this.onKeyDown, this);
        sceneInput.off('pointerup', this.onKeyUp, this);

        this.gameObject = undefined;
        // gameObject events will be removed when this gameObject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    onKeyDownStart(pointer) {
        if ((!pointer.isDown) ||
            (this.pointerId !== undefined)) {
            return;
        }
        this.pointerId = pointer.id;
        this.onKeyDown(pointer);
    }

    onKeyDown(pointer) {
        if (this.pointerId !== pointer.id) {
            return;
        }

        var p0 = this.gameObject,
            p1 = pointer;
        this.setVector(p0.x, p0.y, p1.x, p1.y);
    }

    onKeyUp(pointer) {
        if (this.pointerId !== pointer.id) {
            return;
        }
        this.pointerId = undefined;
        this.cleanVector();
    }

}

export default TouchCursor;