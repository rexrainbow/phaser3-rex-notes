import TweenTask from '../../utils/componentbase/TweenTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
const Linear = Phaser.Math.Linear;

class Scale extends TweenTask {
    constructor(gameObject, config) {
        super(gameObject);
        // this.parent = gameObject;
        // this.timer

        this.scaleStart = {};
        this.scaleEnd = {};

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue(o, 'timer'));
        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'mode', 0));
        this.setScaleRange(
            GetAdvancedValue(o, 'start', undefined),
            GetAdvancedValue(o, 'end', 0)
        );
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue(o, 'ease', 'Linear'));
        return this;
    }

    toJSON() {
        return {
            timer: this.timer.toJSON(),
            enable: this.enable,
            mode: this.mode,
            startX: this.startX,
            startY: this.startY,
            endX: this.endX,
            endY: this.endY,
            delay: this.delay,
            duration: this.duration,
            ease: this.ease,
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

    setScaleRange(start, end) {
        if (typeof (start) === 'number') {
            this.startX = start;
            this.startY = start;
        } else {
            this.startX = GetAdvancedValue(start, 'x', this.parent.scaleX);
            this.startY = GetAdvancedValue(start, 'y', this.parent.scaleY);
        }
        if (typeof (end) === 'number') {
            this.endX = end;
            this.endY = end;
        } else {
            this.endX = GetAdvancedValue(end, 'x', undefined);
            this.endY = GetAdvancedValue(end, 'y', undefined);
        }

        this.hasScaleX = (this.startX !== undefined) && (this.endX !== undefined);
        this.hasScaleY = (this.startY !== undefined) && (this.endY !== undefined);
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

    setEase(ease) {
        if (ease === undefined) {
            ease = 'Linear';
        }
        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        var gameObject = this.parent;
        if (this.hasScaleX) {
            gameObject.scaleX = this.startX;
        }
        if (this.hasScaleY) {
            gameObject.scaleY = this.startY;
        }

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
        t = this.easeFn(t);

        if (this.hasScaleX) {
            gameObject.scaleX = Linear(this.startX, this.endX, t);
        }
        if (this.hasScaleY) {
            gameObject.scaleY = Linear(this.startY, this.endY, t);
        }

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

export default Scale;