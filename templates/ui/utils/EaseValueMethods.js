import TweenTask from '../../../plugins/utils/tween/TweenBase.js';

var SetEaseValueDuration = function (duration) {
    this.easeValueDuration = duration;
    return this;
}

var SetEaseValueFunction = function (mode) {
    this.easeValueMode = mode;
    return this;
}

var StopEaseValue = function () {
    if (this.tweenValueTask) {
        this.tweenValueTask.stop();
    }
    return this;
}

var EaseValueTo = function (value, min, max) {
    if ((value === undefined) || (value === null)) {
        return this;
    }

    if (min !== undefined) {
        value = Percent(value, min, max);
    }

    if (this.tweenValueTask === undefined) {
        this.tweenValueTask = new TweenTask(this, { eventEmitter: null })
    }

    this.tweenValueTask
        .stop()
        .start({
            targets: this,
            value: value,
            duration: this.easeValueDuration,
            ease: this.easeValueMode
        });

    return this;
}

export default {
    setEaseValueDuration: SetEaseValueDuration,
    setEaseValueFunction: SetEaseValueFunction,
    stopEaseValue: StopEaseValue,
    easeValueTo: EaseValueTo
}