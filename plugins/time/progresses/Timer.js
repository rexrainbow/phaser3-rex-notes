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

    setDuration(duration) {
        this.duration = duration;
        this.remainder = duration;
        this.t = 0;
        return this;
    }

    reset(o) {
        this
            .setDuration(o.duration)
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
        return Clamp(value, 0, 1);
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

        var isCompleted = (this.t === 1)
        if (isCompleted) {
            this.runCallback(this.onComplete);
        }
        return isCompleted;
    }
}

export default Timer;