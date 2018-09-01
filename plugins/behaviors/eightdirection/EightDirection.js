'use strict'

const GetValue = Phaser.Utils.Objects.GetValue;
const AngleBetween = Phaser.Math.Angle.Between;
const RadToDeg = Phaser.Math.RadToDeg;

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
        this.setCursorKeys(GetValue(o, 'cursorKeys', undefined));
        this.setSpeed(GetValue(o, 'speed', 200));
        this.setRotateToDirection(GetValue(o, 'rotateToDirection', false));
        this.tickMe = GetValue(o, 'tickMe', true); // true to enable 'update' callback
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
            this.scene.events.on('update', this.update, this);
        }
    }

    shutdown() {
        if (this.tickMe) {
            this.scene.events.off('update', this.update, this);
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

    setCursorKeys(cursorKeys) {
        if (cursorKeys === undefined) {
            cursorKeys = this.scene.input.keyboard.createCursorKeys();
        }
        this.cursorKeys = cursorKeys;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setRotateToDirection(rotateToDirection) {
        this.rotateToDirection = rotateToDirection;
        return this;
    }

    update(time, delta) {
        var body = this.gameObject.body;
        if (!body) {
            return;
        }

        body.setVelocity(0, 0);
        if (this.enable) {
            this['update_dir' + this.dirMode]();
        }

        var speedX = body.velocity.x,
            speedY = body.velocity.y;
        if (this.rotateToDirection) {
            if ((speedX !== 0) || (speedY !== 0)) {
                this.gameObject.rotation = AngleBetween(0, 0, speedX, speedY);
            }
        }
    }

    update_dir0() {
        // up&down
        var body = this.gameObject.body;
        var cursorKeys = this.cursorKeys;
        var isUpDown = cursorKeys.up.isDown;
        var isDownDown = cursorKeys.down.isDown;
        if (isUpDown && !isDownDown) {
            body.setVelocityY(-this.speed);
        } else if (isDownDown && !isUpDown) {
            body.setVelocityY(this.speed);
        }
    }

    update_dir1() {
        // left&right
        var body = this.gameObject.body;
        var cursorKeys = this.cursorKeys;
        var isLeftDown = cursorKeys.left.isDown;
        var isRightDown = cursorKeys.right.isDown;
        if (isLeftDown && !isRightDown) {
            body.setVelocityX(-this.speed);
        } else if (isRightDown && !isLeftDown) {
            body.setVelocityX(this.speed);
        }
    }

    update_dir2() {
        // 4dir
        this.update_dir0();
        var body = this.gameObject.body;
        if (body.velocity.y === 0) {
            this.update_dir1();
        }
    }

    update_dir3() {
        // 8dir
        this.update_dir0();
        this.update_dir1();
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