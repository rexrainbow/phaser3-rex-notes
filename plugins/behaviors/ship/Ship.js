// https://labs.phaser.io/view.html?src=src\physics\arcade\asteroids%20movement.js

import TickTask from '../../utils/ticktask/TickTask.js';
import Helpers from '../../utils/arcade/Helpers.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Ship extends TickTask {
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
        this.setMaxSpeed(GetValue(o, 'maxSpeed', 200));
        this.setAcceleration(GetValue(o, 'acceleration', 200));
        this.setDrag(GetValue(o, 'drag', 0.99));
        this.setTurnSpeed(GetValue(o, 'turnSpeed', 300));
        this.setWrapMode(GetValue(o, 'wrap', true), GetValue(o, 'padding', 0));
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
            this.bodySetAcceleration(0);
            this.bodySetAngularVelocity(0);
        }
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setMaxSpeed(speed) {
        var body = this.gameObject.body;
        body.setMaxSpeed(speed);
        return this;
    }

    setAcceleration(acceleration) {
        this.acceleration = acceleration;
        return this;
    }

    setDrag(drag) {
        var body = this.gameObject.body;
        body.setDrag(drag);
        this.drag = drag;

        body.useDamping = true;
        return this;
    }

    setTurnSpeed(angularVelocity) {
        this.angularVelocity = angularVelocity;
        return this;
    }

    setWrapMode(wrap, padding) {
        this.wrap = wrap;
        this.padding = padding;
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
            this.bodySetAcceleration(0);
            this.bodySetAngularVelocity(0);
            return this;
        }

        var cursorKeys = this.cursorKeys;
        var isUpDown = cursorKeys.up.isDown;
        var isLeftDown = cursorKeys.left.isDown;
        var isRightDown = cursorKeys.right.isDown;
        var body = this.gameObject.body;

        // speed up
        if (isUpDown) {
            var rotation = this.gameObject.rotation;
            var ax = Math.cos(rotation) * this.acceleration;
            var ay = Math.sin(rotation) * this.acceleration;
            this.bodySetAcceleration(ax, ay);
        } else {
            this.bodySetAcceleration(0);
        }

        // turn left/right
        var dx = ((isLeftDown) ? -1 : 0) + ((isRightDown) ? 1 : 0);
        this.bodySetAngularVelocity(this.angularVelocity * dx);

        if (this.wrap) {
            body.world.wrap(this.gameObject, this.padding);
        }
    }
}

// mixin
Object.assign(
    Ship.prototype,
    Helpers
);

export default Ship;