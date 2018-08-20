'use strict'

import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class PathFollower {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this._t = 0;
        this.pos = undefined;
        this.resetFromJSON(config);
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.setPath(GetValue(o, 'path', undefined));
        var t = GetValue(o, 't', undefined);
        if (t !== undefined) {
            this.setT(t);
        }
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            path: this.path,
            t: this.t
        };
    }

    boot() {
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.gameObject = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    setPath(path) {
        this.path = path;
        return this;
    }

    setT(t) {
        this.t = t;
        return this;
    }

    get t() {
        return this._t;
    }

    set t(value) {
        this._t = value;
        this.update();
    }

    update() {
        if (this.path === undefined) {
            return;
        }

        this.pos = this.path.getPoint(this.t, this.pos);
        this.gameObject.setPosition(this.pos.x, this.pos.y);
    }
}

export default PathFollower;