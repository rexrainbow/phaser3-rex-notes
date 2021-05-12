import TickTask from '../../utils/ticktask/TickTask.js';
import GetSceneObject from '../../utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Flash extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);

        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.setDuration(GetValue(o, 'duration', 500));
        this.setRepeat(GetValue(o, 'repeat', 2));
        this.repeatCounter = GetValue(o, 'repeatCounter', 0);
        this.nowTime = GetValue(o, 'nowTime', 0);
        this.timeScale = GetValue(o, 'timeScale', 1);
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
            tickingMode: this.tickingMode
        };
    }

    boot() {
        super.boot();
        if (this.gameObject.once) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        super.shutdown();
        this.gameObject = undefined;
        this.scene = undefined;
    }

    startTicking() {
        super.startTicking();
        this.scene.events.on('update', this.update, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('update', this.update, this);
        }
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    setRepeat(repeat) {
        this.repeat = repeat;
        return this;
    }

    start(duration, repeat) {
        if (typeof (duration) !== 'number') {
            var config = duration;
            duration = GetValue(config, 'duration', undefined);
            repeat = GetValue(config, 'repeat', undefined);
        }
        if (duration !== undefined) {
            this.setDuration(duration);
        }
        if (repeat !== undefined) {
            this.setRepeat(repeat);
        }

        if (this.isRunning) {
            // pend task
            this.repeatCounter = -1;
        } else {
            this.repeatCounter = 0;
            this.nowTime = 0;
            super.start();
        }
        return this;
    }

    flash(duration, repeat) {
        this.start(duration, repeat);
        return this;
    }

    stop() {
        this.gameObject.setVisible(true);
        super.stop();
        return this;
    }

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
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
                this.complete();
            }
        }
        return this;
    }
}

export default Flash;