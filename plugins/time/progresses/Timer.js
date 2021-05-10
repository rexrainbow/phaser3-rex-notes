import Yoyo from '../../utils/math/Yoyo.js';

const Clamp = Phaser.Math.Clamp;

class Timer {
    constructor(timeline, config) {
        this
            .setTimeline(timeline)
            .reset(config);
    }

    setTimeline(timeline) {
        this.timeline = timeline;
        return this;
    }

    setCallbacks(target, onStart, onProgress, onComplete) {
        this.target = target;
        this.onStart = onStart;
        this.onProgress = onProgress;
        this.onComplete = onComplete;
        return this;
    }

    setDuration(duration, yoyo) {
        if (yoyo === undefined) {
            yoyo = false;
        }
        this.duration = duration;
        this.remainder = duration;
        this.t = 0;
        this.yoyo = yoyo;
        return this;
    }

    reset(o) {
        this
            .setDuration(o.duration, o.yoyo)
            .setCallbacks(o.target, o.onStart, o.onProgress, o.onComplete)
        return this;
    }

    onFree() {
        this
            .setTimeline()
            .setCallbacks();
    }

    getProgress() {
        var value = 1 - (this.remainder / this.duration);
        value = Clamp(value, 0, 1);
        if (this.yoyo) {
            value = Yoyo(value);
        }
        return value;
    }

    setProgress(value) {
        value = Clamp(value, 0, 1);
        this.remainder = this.duration * (1 - value);
    }

    runCallback(callback) {
        if (!callback) {
            return;
        }
        callback(this.target, this.t, this);
    }

    update(time, delta) {
        this.remainder -= delta;
        this.t = this.getProgress();
        this.runCallback(this.onProgress);

        var isCompleted = (this.remainder <= 0);
        if (isCompleted) {
            this.runCallback(this.onComplete);
        }
        return isCompleted;
    }
}

export default Timer;