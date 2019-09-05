import TickTask from '../../utils/ticktask/TickTask.js';
import Helpers from '../../utils/arcade/Helpers.js';
import DegToRad from '../../utils/math/DegToRad.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class EightDirection extends TickTask {
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
        this.setDirMode(GetValue(o, 'dir', '8dir'));
        this.setSpeed(GetValue(o, 'speed', 200));
        this.setRotateToDirection(GetValue(o, 'rotateToDirection', false));
        this.setCursorKeys(GetValue(o, 'cursorKeys', undefined));
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
        if (e && (this.body === undefined)) {
            this.scene.physics.add.existing(this.gameObject, false);
        }
        return this;
    }

    setDirMode(m) {
        if (typeof (m) === 'string') {
            m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setRotateToDirection(rotateToDirection) {
        this.rotateToDirection = rotateToDirection;
        return this;
    }

    setCursorKeys(cursorKeys) {
        if (cursorKeys === undefined) {
            cursorKeys = this.scene.input.keyboard.createCursorKeys();
        }
        this.cursorKeys = cursorKeys;
        return this;
    }

    preupdate(time, delta) {
        if (!this.enable) {
            this.bodySetVelocity(0, 0);
            return this;
        }
        var cursorKeys = this.cursorKeys;
        var isUpDown = cursorKeys.up.isDown;
        var isDownDown = cursorKeys.down.isDown;
        var isLeftDown = cursorKeys.left.isDown;
        var isRightDown = cursorKeys.right.isDown;
        var dy = ((isUpDown) ? -1 : 0) + ((isDownDown) ? 1 : 0),
            dx = ((isLeftDown) ? -1 : 0) + ((isRightDown) ? 1 : 0);
        if ((dx === 0) && (dy === 0)) {
            this.bodySetVelocity(0, 0);
            return this;
        }
        switch (this.dirMode) {
            case 0:
                dx = 0;
                break;
            case 1:
                dy = 0;
                break;
            case 2:
                if (dy !== 0) {
                    dx = 0;
                }
                break;
        }

        var rotation, vx, vy;
        if (dy === 0) { // dx !== 0
            vx = this.speed * dx;
            vy = 0;
            rotation = (dx === 1) ? RAD0 : RAD180;
        } else if (dx === 0) { // dy !== 0
            vx = 0;
            vy = this.speed * dy;
            rotation = (dy === 1) ? RAD90 : RAD270;
        } else { // (dx !== 0) && (dy !== 0)
            rotation = Math.atan2(dy, dx);
            vx = this.speed * Math.cos(rotation);
            vy = this.speed * Math.sin(rotation);
        }
        this.bodySetVelocity(vx, vy);
        if (this.rotateToDirection && (rotation !== undefined)) {
            this.gameObject.rotation = rotation;
        }
        return this;
    }
}

// mixin
Object.assign(
    EightDirection.prototype,
    Helpers
);

/** @private */
const DIRMODE = {
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
};
const RAD0 = DegToRad(0);
const RAD90 = DegToRad(90);
const RAD180 = DegToRad(180);
const RAD270 = DegToRad(270);

export default EightDirection;