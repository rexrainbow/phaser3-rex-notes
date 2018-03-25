'use strict'

import Phaser from 'phaser';
import GetEventEmmiter from './../utils/system/GetEventEmmiter.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class ClockPlugin {
    constructor(parent, config) {
        this.resetFromJSON(config);

        this.parent = parent;
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.state = GetFastValue(o, 'state', 0);    // 0=IDLE, 1=RUN
        this.now = GetFastValue(o, 'now', 0);
        this.timeScale = GetFastValue(o, 'timeScale', 1);
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            state: this.state,
            now: this.now,
            timeScale: this.timeScale
        };
    }

    boot() {
        var eventEmitter = GetEventEmmiter(this.parent);
        eventEmitter.on('preupdate', this.updateNowTime, this); 
        eventEmitter.on('shutdown', this.shutdown, this);
        eventEmitter.on('destroy', this.destroy, this);
    }

    shutdown() {
        this.parent = undefined;
    }

    destroy() {
        this.shutdown();
    }

    start(startAt) {      
        if (startAt === undefined)  {
            startAt = 0;
        }
        this.state = 1;
        this.now = startAt;
        return this;
    }

    pause() {
        this.state = 0;
        return this;
    }

    resume() {
        this.state = 1;
        return this;
    }

    stop() {
        this.state = 0;
        this.now = 0;
        return this;
    }

    seek(time) {
        this.now = time;
        return this;
    }

    get isRunning() {
        return (this.state === 1);
    }

    updateNowTime(time, delta) {
        if (this.state === 0) {
            return;
        }
        this.now += (delta*this.timeScale);
    }
}

export default ClockPlugin;