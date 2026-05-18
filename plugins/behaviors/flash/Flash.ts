import { Utils as PhaserUtils } from 'phaser';
import TickTask from '../../utils/componentbase/timerticktask/TimerTask';

const GetValue = PhaserUtils.Objects.GetValue;

class Flash extends TickTask {
    boot: any;
    complete: any;
    parent: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.timer

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
        this.timer.resetFromJSON(GetValue(o, 'timer'));
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.setDuration(GetValue(o, 'duration', 500));
        this.setRepeat(GetValue(o, 'repeat', 2));
        return this;
    }

    toJSON() {
        return {
            timer: this.timer.toJSON(),
            enable: this.enable,
            isRunning: this.isRunning,
            duration: this.duration,
            repeat: this.repeat,
        };
    }

    setEnable(e?: any) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setDuration(duration?: any) {
        this.duration = duration;
        return this;
    }

    setRepeat(repeat?: any) {
        this.repeat = repeat;
        return this;
    }

    start(duration?: any, repeat?: any) {
        if (typeof (duration) !== 'number') {
            var config = duration;
            duration = GetValue(config, 'duration', undefined);
            repeat = GetValue(config, 'repeat', undefined);
        }
        if (duration !== undefined) {
            this.setDuration(duration);
        }
        if (repeat !== undefined) {
            this.setRepeat(repeat);
        }

        this.timer
            .setDuration(this.duration)
            .setRepeat(this.repeat);

        if (this.isRunning) {
            // pend task
            this.timer.repeatCounter = -1;
        } else {
            super.start();
        }
        return this;
    }

    flash(duration?: any, repeat?: any) {
        this.start(duration, repeat);
        return this;
    }

    stop() {
        this.parent.setVisible(true);
        super.stop();
        return this;
    }

    update(time?: any, delta?: any) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        this.timer.update(time, delta);
        gameObject.setVisible((this.timer.t > 0.5));

        if (this.timer.isDone) {
            this.complete();
        }
        return this;
    }
}

export default Flash;