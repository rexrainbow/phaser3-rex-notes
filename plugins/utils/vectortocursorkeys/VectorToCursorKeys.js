const GetValue = Phaser.Utils.Objects.GetValue;
const Key = Phaser.Input.Keyboard.Key;
const GetDist = Phaser.Math.Distance.Between;
const GetAngle = Phaser.Math.Angle.Between;
const RadToDeg = Phaser.Math.RadToDeg;
const MathWrap = Phaser.Math.Wrap;

class VectorToCursorKeys {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        if (this.start == undefined) {
            this.start = {};
        }
        if (this.end == undefined) {
            this.end = {};
        }
        this.noKeyDown = GetValue(o, 'noKeyDown', true);
        if (this.cursorKeys == undefined) {
            this.cursorKeys = {
                up: new Key(),
                down: new Key(),
                left: new Key(),
                right: new Key()
            }
        }

        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'dir', '8dir'));
        this.setDistanceThreshold(GetValue(o, 'forceMin', 16));

        var startX = GetValue(o, "start.x", null);
        var startY = GetValue(o, "start.y", null);
        var endX = GetValue(o, "end.x", null);
        var endY = GetValue(o, "end.y", null);
        this.setVector(startX, startY, endX, endY);
        return this;
    }

    toJSON() {
        return {
            enable: this.enable,
            dir: this.dirMode,
            forceMin: this.forceMin,

            noKeyDown: this.noKeyDown,
            start: {
                x: this.start.x,
                y: this.start.y
            },
            end: {
                x: this.end.x,
                y: this.end.y
            }
        };
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
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
        if (e === false) {
            this.cleanVector();
        }
        this.enable = e;
    }

    setDistanceThreshold(d) {
        if (d < 0) {
            d = 0;
        }
        this.forceMin = d;
        return this;
    }

    createCursorKeys() {
        return this.cursorKeys;
    }

    setKeyState(keyName, isDown) {
        var key = this.cursorKeys[keyName];

        if (!key.enabled) {
            return;
        }

        var isUp = !isDown;
        key.isDown = isDown;
        key.isUp = isUp;
        if (isDown) {
            this.noKeyDown = false;
        }
    }

    getKeyState(keyName) {
        return this.cursorKeys[keyName];
    }

    cleanVector() {
        this.start.x = 0;
        this.start.y = 0;
        this.end.x = 0;
        this.end.y = 0;
        this.noKeyDown = true;
        for (var keyName in this.cursorKeys) {
            this.setKeyState(keyName, false);
        }

        return this;
    }

    setVector(x0, y0, x1, y1) {
        this.cleanVector();
        if (!this.enable) {
            return this;
        }
        if (x0 === null) {
            return this;
        }

        this.start.x = x0;
        this.start.y = y0;
        this.end.x = x1;
        this.end.y = y1;
        if (this.force < this.forceMin) {
            return this;
        }

        var angle = (this.angle + 360) % 360;
        switch (this.dirMode) {
            case 0: // up & down
                var keyName = (angle < 180) ? 'down' : 'up';
                this.setKeyState(keyName, true);
                break;
            case 1: // left & right
                var keyName = ((angle > 90) && (angle <= 270)) ? 'left' : 'right';
                this.setKeyState(keyName, true);
                break;
            case 2: // 4 dir
                var keyName =
                    ((angle > 45) && (angle <= 135)) ? 'down' :
                    ((angle > 135) && (angle <= 225)) ? 'left' :
                    ((angle > 225) && (angle <= 315)) ? 'up' :
                    'right';
                this.setKeyState(keyName, true);
                break;
            case 3: // 8 dir
                if ((angle > 22.5) && (angle <= 67.5)) {
                    this.setKeyState('down', true);
                    this.setKeyState('right', true);
                } else if ((angle > 67.5) && (angle <= 112.5)) {
                    this.setKeyState('down', true);
                } else if ((angle > 112.5) && (angle <= 157.5)) {
                    this.setKeyState('down', true);
                    this.setKeyState('left', true);
                } else if ((angle > 157.5) && (angle <= 202.5)) {
                    this.setKeyState('left', true);
                } else if ((angle > 202.5) && (angle <= 247.5)) {
                    this.setKeyState('left', true);
                    this.setKeyState('up', true);
                } else if ((angle > 247.5) && (angle <= 292.5)) {
                    this.setKeyState('up', true);
                } else if ((angle > 292.5) && (angle <= 337.5)) {
                    this.setKeyState('up', true);
                    this.setKeyState('right', true);
                } else {
                    this.setKeyState('right', true);
                }
                break;
        }

        return this;
    }

    get forceX() {
        return this.end.x - this.start.x;
    }

    get forceY() {
        return this.end.y - this.start.y;
    }

    get force() {
        return GetDist(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    get rotation() {
        return GetAngle(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    get angle() {
        return RadToDeg(this.rotation);; // -180 ~ 180
    }

    get octant() {
        var octant = 0;
        if (this.rightKeyDown) {
            octant = (this.downKeyDown) ? 45 : 0;
        } else if (this.downKeyDown) {
            octant = (this.leftKeyDown) ? 135 : 90;
        } else if (this.leftKeyDown) {
            octant = (this.upKeyDown) ? 225 : 180;
        } else if (this.upKeyDown) {
            octant = (this.rightKeyDown) ? 315 : 270;
        }
        return octant;
    }

    get upKeyDown() {
        return this.cursorKeys.up.isDown;
    }

    get downKeyDown() {
        return this.cursorKeys.down.isDown;
    }

    get leftKeyDown() {
        return this.cursorKeys.left.isDown;
    }

    get rightKeyDown() {
        return this.cursorKeys.right.isDown;
    }

    get anyKeyDown() {
        return !this.noKeyDown;
    }
}

/** @private */
const DIRMODE = {
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
};

export default VectorToCursorKeys;