'use strict'

import TouchState from 'rexPlugins/touchstate.js';
import VectorToCursorKeys from 'rexPlugins/utils/vectortocursorkeys/VectorToCursorKeys.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TouchCursor extends VectorToCursorKeys {
    constructor(gameObject, config) {
        super(config);
        //this.resetFromJSON(config); // this function had been called in super(config)

        this.gameObject = gameObject;
        this.touchState = new TouchState(gameObject, config);
        this.touchState.on('touchstart', this.keyPress, this);
        this.touchState.on('touchmove', this.keyPress, this);
        this.touchState.on('touchend', this.KeyRelease, this)
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        super.resetFromJSON(o);

        this.origin = undefined;
        var origin = GetValue(o, 'origin', undefined);
        if (origin) {
            this.setOrigin(origin.x, origin.y);
        }

        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        var o = super.toJSON();
        o.origin = this.origin;

        return o;
    }

    boot() {
        if (this.gameObject.on) {
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.touchState.destroy();
        this.gameObject = undefined;
    }

    destroy() {
        this.shutdown();
    }

    setOrigin(x, y) {
        if (this.origin === undefined) {
            this.origin = {};
        }
        this.origin.x = x;
        this.origin.y = y;
        return this;
    }

    keyPress(pointer) {
        var p0 = this.origin || this.gameObject,
            p1 = this.touchState;
        this.setVector(p0.x, p0.y, p1.x, p1.y);
    }

    KeyRelease(pointer) {
        this.cleanVector();
    }

}

export default TouchCursor;