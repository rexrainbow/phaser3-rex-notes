import TweenTask from '../../utils/componentbase/TweenTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
const Linear = Phaser.Math.Linear;

class EaseMove extends TweenTask {
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

        if (o && (o.hasOwnProperty('x') || o.hasOwnProperty('y'))) {
            var endX = GetAdvancedValue(o, 'x', undefined);
            var endY = GetAdvancedValue(o, 'y', undefined);
            this.setTargetPosition(endX, endY);
        } else {
            this.setTargetPosition(o);
        }

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

    setTargetPosition(x, y) {
        if ((typeof (x) === 'number') || (typeof (y) === 'number')) {
            // endX, endY
            // x,y : a number, or undefined
            this.startX = this.parent.x;
            this.startY = this.parent.y;
            this.endX = x;
            this.endY = y;
        } else {
            var config = x;
            this.startX = GetAdvancedValue(config, 'startX', undefined);
            this.startY = GetAdvancedValue(config, 'startY', undefined);
            this.endX = GetAdvancedValue(config, 'endX', undefined);
            this.endY = GetAdvancedValue(config, 'endY', undefined);
        }

        this.hasMoveX = (this.startX !== undefined) && (this.endX !== undefined);
        this.hasMoveY = (this.startY !== undefined) && (this.endY !== undefined);
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
        if (this.hasMoveX) {
            gameObject.x = this.startX;
        }
        if (this.hasMoveY) {
            gameObject.y = this.startY;
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
        if (this.timer.isOddIteration) {   // Yoyo
            t = 1 - t;
        }
        t = this.easeFn(t);

        if (this.hasMoveX) {
            gameObject.x = Linear(this.startX, this.endX, t);
        }
        if (this.hasMoveY) {
            gameObject.y = Linear(this.startY, this.endY, t);
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

export default EaseMove;