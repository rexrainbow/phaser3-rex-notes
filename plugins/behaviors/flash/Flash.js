import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Flash extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

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
        this.parent.setVisible(true);
        super.stop();
        return this;
    }

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        if ((this.timeScale === 0) || (delta === 0)) {
            return this;
        }

        this.nowTime += (delta * this.timeScale);
        var visible = (this.nowTime <= (this.duration / 2)) ? false : true;
        gameObject.setVisible(visible);

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