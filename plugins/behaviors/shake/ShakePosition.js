import TickTask from '../../utils/ticktask/TickTask.js';
import GetSceneObject from '../../utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ShakePosition extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);

        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 1));
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setMagnitudeMode(GetValue(o, 'magnitudeMode', 1));
        this.setDuration(GetValue(o, 'duration', 500));
        this.setMagnitude(GetValue(o, 'magnitude', 10));
        this.nowTime = GetValue(o, 'nowTime', 0);
        this.ox = GetValue(o, 'ox', undefined);
        this.oy = GetValue(o, 'oy', undefined);
        return this;
    }

    toJSON() {
        return {
            mode: this.mode,
            isRunning: this.isRunning,
            enable: this.enable,
            timeScale: this.timeScale,
            magnitudeMode: magnitudeMode,
            duration: this.duration,
            magnitude: this.magnitude,
            nowTime: this.nowTime,
            ox: this.ox,
            oy: this.oy,
        };
    }

    boot() {
        super.boot();
        if (this.gameObject.once) { // oops, bob object does not have event emitter
            this.gameObject.once('destroy', this.destroy, this);
        }
    }

    shutdown() {
        super.shutdown();
        this.gameObject = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    startTicking() {
        super.startTicking();

        if (this.mode === 0) { // Effect mode
            this.scene.game.events.on('poststep', this.update, this);
            this.scene.game.events.on('step', this.backToOrigin, this);
        } else { // Behavior Mode
            this.scene.events.on('preupdate', this.update, this);
        }
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            if (this.mode === 0) { // Effect mode
                this.scene.game.events.off('poststep', this.update, this);
                this.scene.game.events.off('step', this.backToOrigin, this);
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

        this.nowTime = 0;
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

        var gameObject = this.gameObject;
        this.nowTime += (delta * this.timeScale);
        if (this.nowTime >= this.duration) {
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
                magnitude *= (this.duration - this.nowTime) / this.duration;
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

        var gameObject = this.gameObject;
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