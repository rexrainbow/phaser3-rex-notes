import TickTask from '../../utils/ticktask/TickTask.js';
import {
    SetVelocity
} from '../../utils/arcade/Helpers.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Bullet extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);

        this.gameObject = gameObject;
        this.scene = gameObject.scene;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        if (!this.gameObject.body) {
            this.scene.physics.add.existing(this.gameObject, false);
        }
        this.setEnable(GetValue(o, 'enable', true));
        this.setSpeed(GetValue(o, 'speed', 200));
        return this;
    }

    toJSON() {
        return {
            tickingMode: this.tickingMode
        };
    }

    boot() {
        super.boot();
        if (this.gameObject.once) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        super.shutdown();
        this.gameObject = undefined;
        this.scene = undefined;
    }

    startTicking() {
        super.startTicking();
        this.scene.events.on('update', this.update, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('update', this.update, this);
        }
    }

    get enable() {
        return this.isRunning;
    }

    set enable(value) {
        this.isRunning = value;
        if (!value) {
            SetVelocity(this.gameObject, 0, 0);
        }
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    update(time, delta) {
        if (!this.enable) {
            SetVelocity(this.gameObject, 0, 0);
            return this;
        }
        var rotation = this.gameObject.rotation;
        var vx = this.speed * Math.cos(rotation);
        var vy = this.speed * Math.sin(rotation);
        SetVelocity(this.gameObject, vx, vy);
        return this;
    }
}

export default Bullet;