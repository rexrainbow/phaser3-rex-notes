'use strict'

const GetValue = Phaser.Utils.Objects.GetValue;
const AngleBetween = Phaser.Math.Angle.Between;
const DegToRad = Phaser.Math.DegToRad;

class EightDirection {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = gameObject.scene;

        this.resetFromJSON(config);
        this.boot(config);
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'dir', '8dir'));
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

    setMode(m) {
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
        var body = this.gameObject.body;
        if (!this.enable) {
            body.setVelocity(0, 0);
            return this;
        }
        var cursorKeys = this.cursorKeys;
        var isUpDown = cursorKeys.up.isDown;
        var isDownDown = cursorKeys.down.isDown;
        var isLeftDown = cursorKeys.left.isDown;
        var isRightDown = cursorKeys.right.isDown;
        var dy = ((isUpDown) ? -1 : 0) + ((isDownDown) ? 1 : 0),
            dx = ((isLeftDown) ? -1 : 0) + ((isRightDown) ? 1 : 0);
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
        if ((dx === 0) && (dy === 0)) {
            vx = 0;
            vy = 0;
        } else if (dy === 0) {
            vx = this.speed * dx;
            vy = 0;
            rotation = DegToRad((dx === 1) ? 0 : 180);
        } else if (dx === 0) {
            vx = 0;
            vy = this.speed * dy;
            rotation = DegToRad((dy === 1) ? 90 : 270);
        } else {
            rotation = AngleBetween(0, 0, dx, dy);
            vx = this.speed * Math.cos(rotation);
            vy = this.speed * Math.sin(rotation);
        }
        body.setVelocity(vx, vy);
        if (this.rotateToDirection && (rotation !== undefined)) {
            this.gameObject.rotation = rotation;
        }
        return this;
    }
}

/** @private */
const DIRMODE = {
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
};

export default EightDirection;