import EaseValueTask from './EaseValueTask';

import { Math as PhaserMath } from 'phaser';
const Percent = PhaserMath.Percent;

export default {
    setEaseValuePropName(name?: any) {
        this.easeValuePropName = name;
        return this;
    },

    setEaseValueDuration(duration?: any) {
        this.easeValueDuration = duration;
        return this;
    },

    setEaseValueFunction(ease?: any) {
        this.easeFunction = ease;
        return this;
    },

    stopEaseValue() {
        if (this.easeValueTask) {
            this.easeValueTask.stop();
        }
        return this;
    },

    easeValueTo(value?: any, min?: any, max?: any) {
        if ((value === undefined) || (value === null)) {
            return this;
        }

        if (min !== undefined) {
            value = Percent(value, min, max);
        }

        if (this.easeValueTask === undefined) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null })
        }

        this.easeValueTask.restart({
            key: this.easeValuePropName,
            to: value,
            duration: this.easeValueDuration,
            ease: this.easeFunction,
        });

        return this;
    },

    easeValueRepeat(from?: any, to?: any, repeat?: any, repeatDelay?: any) {
        if (repeat === undefined) {
            repeat = -1;
        }
        if (repeatDelay === undefined) {
            repeatDelay = 0;
        }

        if (this.easeValueTask === undefined) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null })
        }

        this.easeValueTask.restart({
            key: this.easeValuePropName,
            from: from, to: to,
            duration: this.easeValueDuration,
            ease: this.easeFunction,
            repeat: repeat, repeatDelay: repeatDelay,
        });

        return this;
    },
}