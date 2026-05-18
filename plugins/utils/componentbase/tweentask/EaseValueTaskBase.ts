import TimerTask from '../timerticktask/TimerTask';

import { Tweens as PhaserTweens, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const GetEaseFunction = PhaserTweens.Builders.GetEaseFunction;

class EaseValueTaskBase extends TimerTask {
    ease: any;
    target: any;
    timer: any;

    complete: any;
    delay: any;
    duration: any;
    easeFn: any;
    emit: any;
    enable: any;
    isRunning: any;
    parent: any;
    repeat: any;
    repeatDelay: any;

    resetFromJSON(o?: any) {
        this.timer.resetFromJSON(GetValue(o, 'timer'));
        this.setEnable(GetValue(o, 'enable', true));
        this.setTarget(GetValue(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue(o, 'ease', 'Linear'));
        this.setRepeat(GetValue(o, 'repeat', 0));

        return this;
    }

    setEnable(e?: any) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setTarget(target?: any) {
        if (target === undefined) {
            target = this.parent;
        }
        this.target = target;
        return this;
    }

    setDelay(time?: any) {
        this.delay = time;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
    }

    setDuration(time?: any) {
        this.duration = time;
        return this;
    }

    setRepeat(repeat?: any) {
        this.repeat = repeat;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
    }

    setRepeatDelay(repeatDelay?: any) {
        this.repeatDelay = repeatDelay;
        // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
        return this;
    }

    setEase(ease?: any) {
        if (ease === undefined) {
            ease = 'Linear';
        }
        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
    }

    // Override
    start() {
        // Ignore start if timer is running, i.e. in DELAY, o RUN state
        if (this.timer.isRunning) {
            return this;
        }

        super.start();
        return this;
    }

    restart() {
        this.timer.stop();
        this.start.apply(this, arguments);
        return this;
    }

    stop(toEnd?: any) {
        if (toEnd === undefined) {
            toEnd = false;
        }

        super.stop();

        if (toEnd?: any) {
            this.timer.setT(1);
            this.updateTarget(this.target, this.timer);
            this.complete();
        }

        return this;
    }

    update(time?: any, delta?: any) {
        if (
            (!this.isRunning) ||
            (!this.enable) ||
            (this.parent.hasOwnProperty('active') && !this.parent.active)
        ) {
            return this;
        }

        var target = this.target,
            timer = this.timer;

        timer.update(time, delta);

        // isDelay, isCountDown, isDone
        if (!timer.isDelay) {
            this.updateTarget(target, timer);
        }

        this.emit('update', target, this);

        if (timer.isDone) {
            this.complete();
        }

        return this;
    }

    // Override
    updateTarget(target?: any, timer?: any) {

    }
}

export default EaseValueTaskBase;