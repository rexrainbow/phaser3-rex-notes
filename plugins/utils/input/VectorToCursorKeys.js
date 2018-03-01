import Phaser from 'phaser';

const Key = Phaser.Input.Keyboard.Key;
const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const GetValue = Phaser.Utils.Objects.GetValue;
const RadToDeg = Phaser.Math.RadToDeg;

class VectorToCursorKeys {
    constructor(config) {
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        if (this.cfg == undefined) {
            this.cfg = {};
        }
        if (this.start == undefined) {
            this.start = {};
        }
        if (this.end == undefined) {
            this.end = {};
        }
        if (this.cursorKeys == undefined) {
            this.cursorKeys = {
                up: new Key(),
                down: new Key(),
                left: new Key(),
                right: new Key()
            }
        }

        this.enable(GetFastValue(o, 'enable', true));
        this.setMode(GetFastValue(o, 'dir', '8dir'));
        this.setDistanceThreshold(GetFastValue(o, 'distanceThreshold', 16))

        var startX = GetValue(o, "start.x", null);
        var startY = GetValue(o, "start.y", null);
        var endX = GetValue(o, "end.x", null);
        var endY = GetValue(o, "end.y", null);
        if ((startX !== null) &&
            (startY !== null) &&
            (endX !== null) &&
            (endY !== null)) {
            this.setVector(startX, startY, endX, endY);
        } else {
            this.cleanVector();
        }
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            dir: this.cfg.dirMode,
            distanceThreshold: this.cfg.distanceThreshold,

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

    /**
     * Set direction mode
     * @param {number|string} m 'up&down'(0), 'left&right'(1), '4dir'(2), or '8dir'(3)
     * @returns {object} this object
     */
    setMode(m) {
        if (typeof (m) === 'string') {
            m = DIRMODE[m];
        }
        this.cfg.dirMode = m;
        return this;
    }

    enable(e) {
        if (e == undefined) {
            e = true;
        } else {
            e = !!e;
        }
        if (e === this.cfg.enable) {
            return;
        }
        if (e === false) {
            this.cleanVector();
        }
        this.cfg.enable = e;
    }

    setDistanceThreshold(d) {
        if (d < 0) {
            d = 0;
        }
        this.cfg.distanceThreshold = d;
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

        // TBD
        //key._justDown = isDown;
        //key._justUp = isUp;
        //if (isDown) {
        //    key.timeDown = (new Date()).now();
        //    key.duration = 0;
        //    key.repeats++;
        //}
        //if (isUp) {
        //    key.timeUp = (new Date()).now();
        //    key.duration = key.timeUp - key.timeDown;
        //    key.repeats = 0;
        //}
    }

    cleanVector() {
        this.start.x = null;
        this.start.y = null;
        this.end.x = null;
        this.end.y = null;
        for (var keyName in this.cursorKeys) {
            this.setKeyState(keyName, false);
        }

        return this;
    }

    setVector(x0, y0, x1, y1) {
        if (!this.cfg.enable) {
            return this;
        }
        this.cleanVector();
        if (x0 == null) {
            return this;
        }

        this.start.x = x0;
        this.start.y = y0;
        this.end.x = x1;
        this.end.y = y1;
        var dx = x1 - x0;
        var dy = y1 - y0;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var deg = RadToDeg(Math.atan2(dy, dx)); // -180 ~ 180
        deg = (360 + deg) % 360;

        if (dist < this.cfg.distanceThreshold) {
            return this;
        }        
        switch (this.cfg.dirMode) {
            case 0: // up & down
                var keyName = (deg < 180) ? 'down' : 'up';
                this.setKeyState(keyName, true);
                break;
            case 1: // left & right
                var keyName = ((deg > 90) && (deg <= 270)) ? 'left' : 'right';
                this.setKeyState(keyName, true);
                break;
            case 2: // 4 dir
                var keyName =
                    ((deg > 45) && (deg <= 135)) ? 'down' :
                    ((deg > 135) && (deg <= 225)) ? 'left' :
                    ((deg > 225) && (deg <= 315)) ? 'up' :
                    'right';
                this.setKeyState(keyName, true);
                break;
            case 3: // 8 dir
                if ((deg > 22.5) && (deg <= 67.5)) {
                    this.setKeyState('down', true);
                    this.setKeyState('right', true);
                } else if ((deg > 67.5) && (deg <= 112.5)) {
                    this.setKeyState('down', true);
                } else if ((deg > 112.5) && (deg <= 157.5)) {
                    this.setKeyState('down', true);
                    this.setKeyState('left', true);
                } else if ((deg > 157.5) && (deg <= 202.5)) {
                    this.setKeyState('left', true);
                } else if ((deg > 202.5) && (deg <= 247.5)) {
                    this.setKeyState('left', true);
                    this.setKeyState('up', true);
                } else if ((deg > 247.5) && (deg <= 292.5)) {
                    this.setKeyState('up', true);
                } else if ((deg > 292.5) && (deg <= 337.5)) {
                    this.setKeyState('up', true);
                    this.setKeyState('right', true);
                } else {
                    this.setKeyState('right', true);
                }
                break;
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

export default VectorToCursorKeys;