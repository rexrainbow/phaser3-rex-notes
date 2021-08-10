import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import Timer from '../../utils/timer/Timer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Flash extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.timer = new Timer();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
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
            isRunning: this.isRunning,
            duration: this.duration,
            repeat: this.repeat,
        };
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.timer.destroy();
        this.timer = undefined;

        super.shutdown(fromScene);
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    get duration() {
        return this.timer.duration;
    }

    set duration(value) {
        this.timer.duration = value;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    get repeat() {
        return this.timer.repeat;
    }

    set repeat(value) {
        this.timer.repeat = value;
    }

    setRepeat(repeat) {
        this.repeat = repeat;
        return this;
    }

    start(duration, repeat) {
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

        if (this.isRunning) {
            // pend task
            this.timer.repeatCounter = -1;
        } else {
            this.timer.start();
            super.start();
        }
        return this;
    }

    flash(duration, repeat) {
        this.start(duration, repeat);
        return this;
    }

    stop() {
        this.parent.setVisible(true);
        this.timer.stop();
        super.stop();
        return this;
    }

    update(time, delta) {
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