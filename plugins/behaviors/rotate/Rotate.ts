import { Utils as PhaserUtils } from 'phaser';
import TickTask from '../../utils/componentbase/SceneUpdateTickTask';

const GetValue = PhaserUtils.Objects.GetValue;

class Rotate extends TickTask {
    boot: any;
    isRunning: any;
    parent: any;
    start: any;
    stop: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 180));
        return this;
    }

    toJSON() {
        return {
            enable: this.isRunning,
            timeScale: this.timeScale,
            speed: this.speed,
            tickingMode: this.tickingMode
        };
    }

    get enable() {
        return this.isRunning;
    }

    set enable(enable) {
        if (enable?: any) {
            this.start();
        } else {
            this.stop();
        }
    }

    setEnable(enable?: any) {
        if (enable == undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setSpeed(speed?: any) {
        this.speed = speed;
        return this;
    }

    update(time?: any, delta?: any) {
        if (!this.isRunning) {
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        if ((this.speed === 0) || (delta === 0) || (this.timeScale === 0)) {
            return this;
        }

        var dt = (delta * this.timeScale) / 1000;
        gameObject.angle += this.speed * dt;
        return this;
    }
}

export default Rotate;