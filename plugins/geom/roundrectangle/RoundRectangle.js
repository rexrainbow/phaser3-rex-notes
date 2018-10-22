import CONST from './const.js';
import IsRectangle from './IsRectangle.js';
import IsCircle from './IsCircle.js';
import Contains from './Contains.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const ROUNDRECTANGLE = CONST.ROUNDRECTANGLE;
const RECTANGLE = CONST.RECTANGLE;
const CIRCLE = CONST.CIRCLE;

class RoundRectangle {
    constructor(x, y, width, height, radiusConfig) {
        this.cornerRadius = {};
        this.radius = 0;
        this.width = 0;
        this.height = 0;
        this.setTo(x, y, width, height, radiusConfig);
    }

    setTo(x, y, width, height, radiusConfig) {
        this.setPosition(x, y);
        this.setRadius(radiusConfig);
        this.setSize(width, height);
        return this;
    }

    setPosition(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = x;
        }
        this.x = x;
        this.y = y;
        return this;
    }

    setRadius(radiusConfig) {
        if (radiusConfig === undefined) {
            radiusConfig = 0;
        }
        var radius = this.cornerRadius;
        if (typeof (radiusConfig) === 'number') {
            radius.tl = radiusConfig;
            radius.tr = radiusConfig;
            radius.bl = radiusConfig;
            radius.br = radiusConfig;
        } else {
            radius.tl = GetValue(radiusConfig, 'tl', 0);
            radius.tr = GetValue(radiusConfig, 'tr', 0);
            radius.bl = GetValue(radiusConfig, 'bl', 0);
            radius.br = GetValue(radiusConfig, 'br', 0);
        }
        this.updateType();
        return this;
    }

    setSize(width, height) {
        if (width === undefined) {
            var radius = this.cornerRadius;
            width = Math.max(radius.tl + radius.tr, radius.bl + radius.br);
        }
        if (height === undefined) {
            var radius = this.cornerRadius;
            height = Math.max(radius.tl + radius.bl, radius.tr + radius.br);
        }
        this.width = width;
        this.height = height;
        this.updateType();
        return this;
    }

    setEmpty() {
        this.setSize(0, 0);
        return this;
    }

    updateType() {
        if (IsRectangle(this)) {
            this.type = RECTANGLE;
        } else if (IsCircle(this)) {
            this.type = CIRCLE;
            this.radius = this.cornerRadius.tl;
        } else {
            this.type = ROUNDRECTANGLE;
        }
        return this;
    }

    contains(x, y) {
        return Contains(this, x, y);
    }

    get left() {
        return this.x - (this.width / 2);
    }

    set left(value) {
        this.x = value + (this.width / 2);
    }

    get right() {
        return this.x + (this.width / 2);
    }

    set right(value) {
        this.x = value - (this.width / 2);
    }

    get top() {
        return this.y - (this.height / 2);
    }

    set top(value) {
        this.y = value + (this.height / 2);
    }

    get bottom() {
        return this.y + (this.height / 2);
    }

    set bottom(value) {
        this.y = value - (this.height / 2);
    }
}
export default RoundRectangle;