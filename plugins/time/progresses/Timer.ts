import Yoyo from '../../utils/math/Yoyo';

import { Math as PhaserMath } from 'phaser';
const Clamp = PhaserMath.Clamp;

class Timer {
    yoyo: any;

    duration: any;
    isPaused: any;
    name: any;
    onComplete: any;
    onProgress: any;
    onStart: any;
    remainder: any;
    removed: any;
    t: any;
    target: any;
    timeline: any;

    constructor(timeline?: any, config?: any) {
        this
            .setTimeline(timeline)
            .reset(config)
    }

    setTimeline(timeline?: any) {
        this.timeline = timeline;
        return this;
    }

    setName(name?: any) {
        this.name = name;
        return this;
    }

    setCallbacks(target?: any, onStart?: any, onProgress?: any, onComplete?: any) {
        this.target = target;
        this.onStart = onStart;
        this.onProgress = onProgress;
        this.onComplete = onComplete;
        return this;
    }

    setDuration(duration?: any, yoyo?: any) {
        if (yoyo === undefined) {
            yoyo = false;
        }
        this.duration = duration;
        this.remainder = duration;
        this.t = 0;
        this.yoyo = yoyo;
        return this;
    }

    setPaused(state?: any) {
        this.isPaused = state;
        return this;
    }

    pause() {
        this.isPaused = true;
        return this;
    }

    resume() {
        this.isPaused = false;
        return this;
    }

    setRemoved(state?: any) {
        this.removed = state;
        return this;
    }

    remove() {
        this.removed = true;
        return this;
    }

    seek(t?: any) {
        this.remainder = this.duration * (1 - t);
        return this;
    }

    reset(o?: any) {
        this
            .setName(o.name)
            .setDuration(o.duration, o.yoyo)
            .setCallbacks(o.target, o.onStart, o.onProgress, o.onComplete)
            .setPaused(false)
            .setRemoved(false)
        return this;
    }

    onFree() {
        this
            .setTimeline()
            .setCallbacks()
    }

    getProgress() {
        var value = 1 - (this.remainder / this.duration);
        value = Clamp(value, 0, 1);
        if (this.yoyo) {
            value = Yoyo(value);
        }
        return value;
    }

    setProgress(value?: any) {
        value = Clamp(value, 0, 1);
        this.remainder = this.duration * (1 - value);
    }

    runCallback(callback?: any) {
        if (!callback) {
            return;
        }
        callback(this.target, this.t, this);
    }

    update(time?: any, delta?: any) {
        if (this.removed) {
            return true;
        } else if (this.isPaused) {
            return false;
        }

        this.remainder -= delta;
        this.t = this.getProgress();
        this.runCallback(this.onProgress);

        var isCompleted = (this.remainder <= 0);
        if (isCompleted?: any) {
            this.runCallback(this.onComplete);
        }
        return isCompleted;
    }
}

export default Timer;