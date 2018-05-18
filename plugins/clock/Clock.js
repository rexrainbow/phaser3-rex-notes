'use strict'

import GetSceneObject from './../utils/system/GetSceneObject.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class Clock {
    constructor(parent, config) {
        this.parent = parent;        
        this.resetFromJSON(config);
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
        var scene = GetSceneObject(this.parent);    
        scene.sys.events.on('preupdate', this.updateNowTime, this); 
    }

    shutdown() {
        var scene = GetSceneObject(this.parent);   
        scene.sys.events.off('preupdate', this.updateNowTime, this);
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

export default Clock;