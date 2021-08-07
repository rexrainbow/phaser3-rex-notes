import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
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
        this.setWrapMode(GetValue(o, 'wrap', false), GetValue(o, 'padding', 0));
        this.setEnable(GetValue(o, 'enable', true));
        this.setSpeed(GetValue(o, 'speed', 200));
        return this;
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

    setWrapMode(wrap, padding) {
        if (wrap === undefined) {
            wrap = true;
        }
        this.wrap = wrap;
        this.padding = padding;
        return this;
    }

    update(time, delta) {
        var gameObject = this.parent;
        if (!this.enable) {
            SetVelocity(gameObject, 0, 0);
            return this;
        }

        if (!gameObject.active) {
            return this;
        }

        var rotation = gameObject.rotation;
        var vx = this.speed * Math.cos(rotation);
        var vy = this.speed * Math.sin(rotation);
        SetVelocity(gameObject, vx, vy);

        if (this.wrap) {
            gameObject.body.world.wrap(gameObject, this.padding);
        }

        return this;
    }
}

export default Bullet;