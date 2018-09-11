'use strict'

import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;


class Flash extends EE {
    constructor(gameObject, config) {
        super();

        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setDuration(GetValue(o, 'duration', 500));
        this.setRepeat(GetValue(o, 'repeat', 2));
        this.repeatCounter = GetValue(o, 'repeatCounter', 0);
        this.nowTime = GetValue(o, 'nowTime', 0);
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.tickMe = GetValue(o, 'tickMe', true); // true to enable 'update' callback
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            duration: this.duration,
            repeat: this.repeat,
            repeatCounter: this.repeatCounter,
            nowTime: this.nowTime,
            timeScale: this.timeScale,
            tickMe: this.tickMe
        };
    }

    boot() {
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }

        if (this.tickMe) {
            this.scene.events.on('update', this.update, this);
        }
    }

    shutdown() {
        super.shutdown();
        if (this.tickMe) {
            this.scene.events.off('update', this.update, this);
        }
        this.gameObject = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    flash(duration, repeat) {
        this.stop();

        if (IsPlainObject(duration)) {
            var config = duration;
            duration = GetValue(config, 'x', undefined);
            repeat = GetValue(config, 'y', undefined);
        }
        if (duration !== undefined) {
            this.setDuration(duration);
        }
        if (repeat !== undefined) {
            this.setRepeat(repeat);
        }

        this.isRunning = true;
        this.repeatCounter = 0;
        this.nowTime = 0;
        return this;
    }

    stop() {
        this.isRunning = false;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    setRepeat(repeat) {
        this.repeat = repeat;
        return this;
    }

    update(time, delta) {
        if (!this.isRunning) {
            return this;
        }

        if ((this.timeScale === 0) || (delta === 0)) {
            return this;
        }

        this.nowTime += (delta * this.timeScale);
        var visible = (this.nowTime <= (this.duration / 2)) ? false : true;
        this.gameObject.setVisible(visible);

        if (this.nowTime >= this.duration) {
            if ((this.repeat === -1) || (this.repeatCounter < this.repeat)) {
                this.repeatCounter++;
                this.nowTime -= this.duration;
            } else {
                this.onReachTarget();
            }
        }
        return this;
    }

    onReachTarget() {
        this.isRunning = false;
        this.emit('complete', this, this.gameObject);
    }
}

export default Flash;