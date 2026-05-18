import EaseValueTaskBase from '../componentbase/tweentask/EaseValueTaskBase';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Linear = PhaserMath.Linear;

class EaseValueTask extends EaseValueTaskBase {
    boot: any;
    delay: any;
    duration: any;
    ease: any;
    easeFn: any;
    fromValue: any;
    parent: any;
    propertyKey: any;
    repeat: any;
    repeatDelay: any;
    resetFromJSON: any;
    setDelay: any;
    setDuration: any;
    setEase: any;
    setRepeat: any;
    setRepeatDelay: any;
    target: any;
    timer: any;
    toValue: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.timer

        this.resetFromJSON();
        this.boot();
    }

    start(config?: any) {
        if (this.timer.isRunning) {
            return this;
        }

        var target = this.target;
        this.propertyKey = GetValue(config, 'key', 'value');
        var currentValue = target[this.propertyKey];
        this.fromValue = GetValue(config, 'from', currentValue);
        this.toValue = GetValue(config, 'to', currentValue);

        this.setEase(GetValue(config, 'ease', this.ease));
        this.setDuration(GetValue(config, 'duration', this.duration));
        this.setRepeat(GetValue(config, 'repeat', 0));
        this.setDelay(GetValue(config, 'delay', 0));
        this.setRepeatDelay(GetValue(config, 'repeatDelay', 0));

        this.timer
            .setDuration(this.duration)
            .setRepeat(this.repeat)
            .setDelay(this.delay)
            .setRepeatDelay(this.repeatDelay)

        target[this.propertyKey] = this.fromValue;

        super.start();
        return this;
    }

    updateTarget(target?: any, timer?: any) {
        var t = timer.t;
        t = this.easeFn(t);

        target[this.propertyKey] = Linear(this.fromValue, this.toValue, t);
    }
}

export default EaseValueTask;