import TickTask from '../../utils/behaviorbase/TickTask.js';
import { SetVelocity } from '../../utils/arcade/Helpers.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Bullet extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        if (!this.parent.body) {
            this.scene.physics.add.existing(this.parent, false);
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
            SetVelocity(this.parent, 0, 0);
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
            SetVelocity(this.parent, 0, 0);
            return this;
        }

        var gameObject = this.parent;
        var rotation = gameObject.rotation;
        var vx = this.speed * Math.cos(rotation);
        var vy = this.speed * Math.sin(rotation);
        SetVelocity(gameObject, vx, vy);
        return this;
    }
}

export default Bullet;