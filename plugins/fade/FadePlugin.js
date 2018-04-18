'use strict'

import GetSceneObject from './../utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class FadeOutPlugin {
    constructor(gameobject, config) {
        this.gameobject = gameobject;
        this.scene = GetSceneObject(gameobject);

        this.alpha = {};
        this.tween = undefined;
        this.resetFromJSON(config);
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 0));
        this.setAlphaRange(
            GetAdvancedValue(o, 'alpha.start', this.gameobject.alpha),
            GetAdvancedValue(o, 'alpha.end', 0)
        );
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
            alpha: this.alpha,
            delay: this.delay,
            duration: this.duration
        };
    }

    boot() {
        if (this.gameobject.on) { // oops, bob object does not have event emitter
            this.gameobject.on('destroy', this.destroy, this);
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
        return this;        
    }
    setAlphaRange(start, end) {
        this.alpha.start = start;
        this.alpha.end = end;
        return this;        
    }
    setDelay(time) {
        this.delay = time;
        return this;        
    }
    setFadeOutTime(time) {
        this.duration = time;
        return this;        
    }

    start() {
        if (this.tween) {
            return;
        }

        var alpha = this.alpha;
        this.tween = this.scene.tweens.add({
            targets: this.gameobject,
            alpha: {
                getStart: function () {
                    return alpha.start;
                },
                getEnd: function () {
                    return alpha.end;
                }
            },

            delay: this.delay,
            duration: this.duration,
            ease: 'Linear',
            yoyo: (this.mode == 2),
            repeat: ((this.mode == 2) ? -1 : 0),
            onComplete: this.complete,
            onCompleteScope: this
        });
        return this;        
    }

    stop() {
        if (!this.tween) {
            return;
        }

        this.tween.stop();
        this.tween = undefined;
        return this;        
    }

    complete() {
        if (this.mode === 1) {
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