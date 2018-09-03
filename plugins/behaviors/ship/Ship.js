'use strict'

// https://labs.phaser.io/view.html?src=src\physics\arcade\asteroids%20movement.js

import Proxy from 'rexPlugins/utils/arcade/proxy.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Ship {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = gameObject.scene;

        this.resetFromJSON(config);
        this.boot(config);
    }

    resetFromJSON(o) {
        this.setCascadeMode(GetValue(o, 'cascade', false));
        this.setEnable(GetValue(o, 'enable', true));
        this.setMaxSpeed(GetValue(o, 'maxSpeed', 200));
        this.setAcceleration(GetValue(o, 'acceleration', 200));
        this.setDrag(GetValue(o, 'drag', 0.99));
        this.setTurnSpeed(GetValue(o, 'turnSpeed', 300));
        this.setWrapMode(GetValue(o, 'wrap', true), GetValue(o, 'padding', 0));
        this.setCursorKeys(GetValue(o, 'cursorKeys', undefined));
        this.tickMe = GetValue(o, 'tickMe', true); // true to enable 'preupdate' callback
        return this;
    }

    toJSON() {
        return {
            tickMe: this.tickMe
        };
    }

    boot(config) {
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }

        if (this.tickMe) {
            this.scene.events.on('preupdate', this.preupdate, this);
        }
    }

    shutdown() {
        if (this.tickMe) {
            this.scene.events.off('preupdate', this.preupdate, this);
        }
        this.gameObject = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        } else {
            e = !!e;
        }
        if (e === this.enable) {
            return;
        }
        this.enable = e;
    }

    setMaxSpeed(speed) {
        var body = this.gameObject.body;
        body.setMaxVelocity(speed);
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
            this._setAcceleration(0);
            this._setAngularVelocity(0);
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
            this._setAcceleration(ax, ay);
        } else {
            this._setAcceleration(0);
        }

        debugger
        // turn left/right
        var dx = ((isLeftDown) ? -1 : 0) + ((isRightDown) ? 1 : 0);
        this._setAngularVelocity(this.angularVelocity * dx);

        if (this.wrap) {
            body.world.wrap(this.gameObject, this.padding);
        }
    }
}

// mixin
Object.assign(
    Ship.prototype,
    Proxy
);

export default Ship;