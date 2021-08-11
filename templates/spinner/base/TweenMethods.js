import TweenTask from '../../../plugins/utils/componentbase/tweentask/TweenTask.js';

var Start = function (duration) {
    if (!this.tweenTask) {
        this.tweenTask = new TweenTask(this);
    }

    if (duration !== undefined) {
        this.duration = duration;
        this.tweenTask.stop();  // Will restart with new duration
    }

    // Won't restart if tweenTask is running
    if (this.tweenTask.isRunning) {
        return this;
    }

    // Start tweenTask
    this.setValue(0);
    this.tweenTask.start({
        targets: this,
        value: 1,
        ease: this.ease,       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: this.duration,
        repeat: -1,            // -1: infinity
        yoyo: false
    });

    this.setDirty();

    return this;
}

var Stop = function () {
    if (!this.tweenTask) {
        return this;
    }
    this.tweenTask.stop();
    this.setDirty();
    return this;
}

var Pause = function () {
    if (!this.tweenTask) {
        return this;
    }
    this.tweenTask.pause();
    this.setDirty();
    return this;
}

var Resume = function () {
    if (!this.tweenTask) {
        return this;
    }
    this.tweenTask.pause();
    this.setDirty();
    return this;
}

export default {
    start: Start,
    stop: Stop,
    pause: Pause,
    resume: Resume
}