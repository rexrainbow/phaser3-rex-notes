import TweenTask from '../behaviorbase/TweenTask.js';

var SetEaseValuePropName = function (name) {
    this.easeValuePropName = name;
    return this;
}

var SetEaseValueDuration = function (duration) {
    this.easeValueDuration = duration;
    return this;
}

var SetEaseValueFunction = function (ease) {
    this.easeFunction = ease;
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

    var config = {};
    config.targets = this;
    config[this.easeValuePropName] = value;
    config.duration = this.easeValueDuration;
    config.ease = this.easeFunction;

    this.tweenValueTask
        .stop()
        .start(config);

    return this;
}

export default {
    setEaseValuePropName: SetEaseValuePropName,
    setEaseValueDuration: SetEaseValueDuration,
    setEaseValueFunction: SetEaseValueFunction,
    stopEaseValue: StopEaseValue,
    easeValueTo: EaseValueTo
}