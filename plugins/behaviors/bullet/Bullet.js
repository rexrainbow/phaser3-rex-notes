import TickTask from '../../utils/ticktask/TickTask.js';
import Helpers from '../../utils/arcade/Helpers.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Bullet extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);

        this.setParent(gameObject);
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        if (!this.body) {
            this.scene.physics.add.existing(this.gameObject, false);
        }
        this.setCascadeMode(GetValue(o, 'cascade', false));
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
        this.scene.events.on('preupdate', this.preupdate, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('preupdate', this.preupdate, this);
        }
    }

    get enable() {
        return this.isRunning;
    }

    set enable(value) {
        this.isRunning = value;
        if (!value) {
            this.bodySetVelocity(0, 0);
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

    preupdate(time, delta) {
        if (!this.enable) {
            this.bodySetVelocity(0, 0);
            return this;
        }
        var rotation = this.gameObject.rotation;
        var vx = this.speed * Math.cos(rotation);
        var vy = this.speed * Math.sin(rotation);
        this.bodySetVelocity(vx, vy);
        return this;
    }
}

// mixin
Object.assign(
    Bullet.prototype,
    Helpers
);

export default Bullet;