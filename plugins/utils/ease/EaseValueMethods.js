import EaseValueTask from './EaseValueTask.js';

const Percent = Phaser.Math.Percent;

export default {
    setEaseValuePropName(name) {
        this.easeValuePropName = name;
        return this;
    },

    setEaseValueDuration(duration) {
        this.easeValueDuration = duration;
        return this;
    },

    setEaseValueFunction(ease) {
        this.easeFunction = ease;
        return this;
    },

    stopEaseValue() {
        if (this.easeValueTask) {
            this.easeValueTask.stop();
        }
        return this;
    },

    easeValueTo(value, min, max) {
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

    easeValueRepeat(from, to, repeat, repeatDelay) {
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