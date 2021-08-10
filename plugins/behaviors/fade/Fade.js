import TweenTask from '../../utils/componentbase/TweenTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const Linear = Phaser.Math.Linear;

class Fade extends TweenTask {
    constructor(gameObject, config) {
        super(gameObject);
        // this.parent = gameObject;
        // this.timer

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue(o, 'timer'));
        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'mode', 0));
        this.setAlphaRange(
            GetAdvancedValue(o, 'start', this.parent.alpha),
            GetAdvancedValue(o, 'end', 0)
        );
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        return this;
    }

    toJSON() {
        return {
            timer: this.timer.toJSON(),
            enable: this.enable,
            mode: this.mode,
            start: this.alphaStart,
            end: this.alphaEnd,
            delay: this.delay,
            duration: this.duration
        };
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this.mode = m;
        return this;
    }

    setAlphaRange(start, end) {
        this.alphaStart = start;
        this.alphaEnd = end;
        return this;
    }

    setDelay(time) {
        this.delay = time;
        return this;
    }

    setDuration(time) {
        this.duration = time;
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        var gameObject = this.parent;
        gameObject.setAlpha(this.alphaStart);

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration)
            .setRepeat((this.mode === 2) ? -1 : 0);

        super.start();
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
        var t = this.timer.t;
        if (this.timer.isOddIteration) {  // Yoyo
            t = 1 - t;
        }

        gameObject.alpha = Linear(this.alphaStart, this.alphaEnd, t);

        if (this.timer.isDone) {
            this.complete();
        }
        return this;
    }

    complete() {
        super.complete();
        if (this.mode === 1) {
            this.parent.destroy();
            // Will also destroy this behavior
        }
        return this;
    }

}

const MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
}

export default Fade;