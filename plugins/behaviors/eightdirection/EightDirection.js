'use strict'

import Proxy from 'rexPlugins/utils/arcade/proxy.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const AngleBetween = Phaser.Math.Angle.Between;
const DegToRad = Phaser.Math.DegToRad;

class EightDirection {
    constructor(gameObject, config) {
        this.setParent(gameObject);
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setCascadeMode(GetValue(o, 'cascade', false));        
        this.setEnable(GetValue(o, 'enable', true));
        this.setDirMode(GetValue(o, 'dir', '8dir'));
        this.setSpeed(GetValue(o, 'speed', 200));
        this.setRotateToDirection(GetValue(o, 'rotateToDirection', false));
        this.setCursorKeys(GetValue(o, 'cursorKeys', undefined));
        this.tickMe = GetValue(o, 'tickMe', true); // true to enable 'preupdate' callback
        return this;
    }

    toJSON() {
        return {
            tickMe: this.tickMe
        };
    }

    boot() {
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
            rotation = AngleBetween(0, 0, dx, dy);
            // TODO maxSpeed?
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
    Proxy
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