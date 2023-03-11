import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Step extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));
        this.setStepMode(GetValue(o, 'mode', 0));
        this.setStepLength(GetValue(o, 'step', 5));
    }

    toJSON() {
        return {
            enable: this.enable,

        };
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        this.isRunning = e;

        if (e) {
            var gameObject = this.parent;
            this.preX = gameObject.x;
            this.preY = gameObject.y;
        }

        return this;
    }

    setStepMode(mode) {
        if (typeof (mode) === 'string') {
            mode = StepMode[mode];
        }
        this.stepMode = mode;
        return this;
    }

    setStepLength(stepLength) {
        this.stepLength = stepLength;
        return this;
    }

    cancelStep() {
        this.cancelStepFlag = true;
        return this;
    }

    update(time, delta) {
        if (!this.enable) {
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        var x0 = this.preX,
            y0 = this.preY,
            x1 = gameObject.x,
            y1 = gameObject.y;

        if ((x0 === x1) && (y0 === y1)) {
            return this;
        }

        this.cancelStepFlag = false;
        switch (this.stepMode) {
            case 1: // 'x,y'
                this.step(x0, y0, x1, y0, this.stepLength);
                this.step(x1, y0, x1, y1, this.stepLength);
                break;

            case 2: // 'y,x'
                this.step(x0, y0, x0, y1, this.stepLength);
                this.step(x0, y1, x1, y1, this.stepLength);
                break;

            default:
                this.step(x0, y0, x1, y1, this.stepLength);
                break;

        }

        this.preX = x1;
        this.preY = y1;
        return this;
    }

    step(x0, y0, x1, y1, stepLength) {
        if (this.cancelStepFlag) {
            return this;
        }

        var dx = x1 - x0,
            dy = y1 - y0;
        var d = Math.sqrt(dx * dx + dy * dy);

        var steps = Math.round(d / stepLength);
        if (steps === 0) {
            steps = 1;
        }

        var stepX = dx / steps,
            stepY = dy / steps;
        var xt, yt;
        var gameObject = this.parent;
        for (var i = 1; i <= steps; i++) {
            xt = x0 + (stepX * i);
            yt = y0 + (stepY * i);
            this.emit('step', gameObject, this, xt, yt);

            if (this.cancelStepFlag) {
                break;
            }
        }

        return this;
    }

}

var StepMode = {
    linear: 0,
    'x,y': 1,
    'h,v': 1,
    'y,x': 2,
    'v,h': 2
}

export default Step;