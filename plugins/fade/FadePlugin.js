'use strict'

import Phaser from 'phaser';
import GetSceneObject from './../utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class FadeOutPlugin {
    constructor(gameobject, config) {
        this.gameobject = gameobject;
        this.scene = GetSceneObject(gameobject);

        this.value = {};
        this.tween = undefined;
        this.resetFromJSON(config);
        this.boot();

        var activate = GetValue(config, 'activate', true);
        if (activate) {
            this.start();
        }
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 1));
        this.setAlphaRange(GetAdvancedValue(o, 'alpha.start', 1), GetAdvancedValue(o, 'alpha.end', 0));
        this.setDelay(GetAdvancedValue(o, 'delay', 0));        
        this.setFadeOutTime(GetAdvancedValue(o, 'duration', 1000));
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            mode: this.mode,
            delay: this.delay,
            duration: this.duration
        };
    }

    boot() {
        if (this.gameobject.once) { // oops, bob object does not have event emitter
            this.gameobject.once('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.stop();
        this.gameobject = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this.mode = m;
    }
    setAlphaRange(start, end) {
        this.value.getStart = function () {
            return start;
        }
        this.value.getEnd = function () {
            return end;
        }
    }
    setDelay(time) {
        this.delay = time;
    }
    setFadeOutTime(time) {
        this.duration = time;
    }

    start() {
        if (this.tween) {
            return;
        }

        this.tween = this.scene.tweens.add({
            targets: this.gameobject,
            alpha: this.value,

            delay: this.delay,
            duration: this.duration,
            ease: 'Power0',
            yoyo: (this.mode == 2),
            repeat: ((this.mode == 2) ? -1 : 0),
            onComplete: (this.mode == 1) ? this.complete.bind(this) : undefined
        });
    }

    stop() {
        if (!this.tween) {
            return;
        }

        this.tween.stop();
        this.tween = undefined;
    }

    complete() {
        if (this.mode == 1) {
            this.gameobject.destroy();
        }
    }

}

const MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
}

export default FadeOutPlugin;