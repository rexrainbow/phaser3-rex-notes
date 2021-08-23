import TickTask from '../../utils/componentbase/TickTask';
import Timer from '../../utils/componentbase/timerticktask/Timer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ShakePosition extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.timer = new Timer();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue(o, 'timer'));
        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'mode', 1));
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setMagnitudeMode(GetValue(o, 'magnitudeMode', 1));
        this.setDuration(GetValue(o, 'duration', 500));
        this.setMagnitude(GetValue(o, 'magnitude', 10));
        this.ox = GetValue(o, 'ox', undefined);
        this.oy = GetValue(o, 'oy', undefined);
        return this;
    }

    toJSON() {
        return {
            timer: this.timer.toJSON(),
            enable: this.enable,
            mode: this.mode,
            isRunning: this.isRunning,
            magnitudeMode: magnitudeMode,
            duration: this.duration,
            magnitude: this.magnitude,
            ox: this.ox,
            oy: this.oy,
        };
    }

    // override
    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        super.shutdown(fromScene);
        this.timer.destroy();
        this.timer = undefined;
    }

    startTicking() {
        super.startTicking();

        if (this.mode === 0) { // Effect mode
            this.scene.game.events.on('poststep', this.update, this);
            this.scene.game.events.on('prestep', this.backToOrigin, this);
        } else { // Behavior Mode
            this.scene.events.on('preupdate', this.update, this);
        }
    }

    stopTicking() {
        super.stopTicking();

        if (this.scene) { // Scene might be destoryed
            if (this.mode === 0) { // Effect mode
                this.scene.game.events.off('poststep', this.update, this);
                this.scene.game.events.off('prestep', this.backToOrigin, this);
            } else { // Behavior Mode
                this.scene.events.off('preupdate', this.update, this);
            }

        }
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setMode(mode) {
        if (typeof (mode) === 'string') {
            mode = MODE[mode];
        }
        this.mode = mode;
        return this;
    }

    setMagnitudeMode(magnitudeMode) {
        if (typeof (magnitudeMode) === 'string') {
            magnitudeMode = MANITUDEMODE[magnitudeMode];
        }

        this.magnitudeMode = magnitudeMode;
        return this;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    setMagnitude(magnitude) {
        this.magnitude = magnitude;
        return this;
    }

    start(duration, magnitude) {
        if (typeof (duration) !== 'number') {
            var config = duration;
            magnitude = GetValue(config, 'magnitude', undefined);
            duration = GetValue(config, 'duration', undefined);
        }
        if (magnitude !== undefined) {
            this.setMagnitude(magnitude);
        }
        if (duration !== undefined) {
            this.setDuration(duration);
        }

        this.timer
            .setDuration(this.duration)
            .start()

        super.start();
        return this;
    }

    shake(duration, magnitude) {
        this.start(duration, magnitude);
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
        if (this.timer.isDone) {
            this.backToOrigin();
            this.complete();
        } else {
            if (this.ox === undefined) {
                this.ox = gameObject.x;
                this.oy = gameObject.y;
            }

            var magnitude = this.magnitude;
            if (this.magnitudeMode === 1) // decay
            {
                magnitude *= (1 - this.timer.t);
            }
            var a = Math.random() * Math.PI * 2;
            var offsetX = Math.cos(a) * magnitude;
            var offsetY = Math.sin(a) * magnitude;
            gameObject.setPosition(this.ox + offsetX, this.oy + offsetY);
        }

        return this;
    }

    backToOrigin() {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        if (this.ox === undefined) {
            return this;
        }

        var gameObject = this.parent;
        if ((this.ox === gameObject.x) && (this.oy === gameObject.y)) {
            return this;
        }

        gameObject.setPosition(this.ox, this.oy);
        this.ox = undefined;
        this.oy = undefined;
        return this;
    }
}

const MODE = {
    effect: 0,
    behavior: 1,
}

const MANITUDEMODE = {
    constant: 0,
    decay: 1,
}

export default ShakePosition;