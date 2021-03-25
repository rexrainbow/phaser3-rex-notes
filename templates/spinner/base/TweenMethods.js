import TweenBase from '../../../plugins/utils/tween/TweenBase.js';

var Start = function (duration) {
    if (duration !== undefined) {
        this.duration = duration;
    }

    if (!this.tweenTask) {
        this.tweenTask = new TweenBase(this);
    }
    this.setValue(0);
    this.tweenTask.start({
        targets: this,
        value: 1,
        ease: this.ease,       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: this.duration,
        repeat: -1,            // -1: infinity
        yoyo: false
    });
}

var Stop = function () {
    if (!this.tweenTask) {
        return this;
    }
    this.tweenTask.stop();
    return this;
}

var Pause = function () {
    if (!this.tweenTask) {
        return this;
    }
    this.tweenTask.pause();
    return this;
}

var Resume = function () {
    if (!this.tweenTask) {
        return this;
    }
    this.tweenTask.pause();
    return this;
}

export default {
    start: Start,
    stop: Stop,
    pause: Pause,
    resume: Resume
}