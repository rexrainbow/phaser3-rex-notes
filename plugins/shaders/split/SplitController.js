import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;

class SplitController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.splitX = 0;
        this.splitY = 0;
        this.spaceLeft = 0;
        this.spaceRight = 0;
        this.spaceTop = 0;
        this.spaceBottom = 0;
        this.rotation = 0;
        this.shiftEnable = true;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var splittedWidth = GetValue(o, 'width', undefined);
        if (splittedWidth === undefined) {
            this.spaceLeft = GetValue(o, 'left', 0);
            this.spaceRight = GetValue(o, 'right', 0);
        } else {
            this.splittedWidth = splittedWidth;
        }

        var splittedHeight = GetValue(o, 'height', undefined);
        if (splittedHeight === undefined) {
            this.spaceTop = GetValue(o, 'top', 0);
            this.spaceBottom = GetValue(o, 'bottom', 0);
        } else {
            this.splittedHeight = splittedHeight;
        }

        this.splitX = GetValue(o, 'x', this.camera.centerX);
        this.splitY = GetValue(o, 'Y', this.camera.centerY);

        var rotation = GetValue(o, 'rotation', undefined);
        if (rotation === undefined) {
            this.setAngle(GetValue(o, 'angle', 0));
        } else {
            this.setRotation(rotation);
        }

        this.shiftEnable = GetValue(o, 'shiftEnable', true);
        return this;
    }

    // split
    setSplit(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        this.splitX = x;
        this.splitY = y;
        return this;
    }

    splitAtCenter(width, height) {
        this.setSplit(this.camera.centerX, this.camera.centerY);
        if (width !== undefined) {
            this.setSplittedWidth(width);
        }
        if (height !== undefined) {
            this.setSplittedHeight(height);
        }
        return this;
    }

    // rotation
    setRotation(value) {
        this.rotation = value;
        return this;
    }

    get angle() {
        return RadToDeg(this.rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(value) {
        this.angle = value;
        return this;
    }

    // space
    setSpace(left, right, top, bottom) {
        if (left === undefined) {
            left = 0;
        }
        if (right === undefined) {
            right = 0;
        }
        if (top === undefined) {
            top = 0;
        }
        if (bottom === undefined) {
            bottom = 0;
        }
        this.spaceLeft = left;
        this.spaceRight = right;
        this.spaceTop = top;
        this.spaceBottom = bottom;
        return this;
    }

    get splittedWidth() {
        return this.spaceLeft + this.spaceRight;
    }

    set splittedWidth(value) {
        this.spaceLeft = value / 2;
        this.spaceRight = this.spaceLeft;
    }

    setSplittedWidth(width) {
        if (width === undefined) {
            width = 0;
        }
        this.splittedWidth = width;
        return this;
    }

    get splittedHeight() {
        return this.spaceTop + this.spaceBottom;
    }

    set splittedHeight(value) {
        this.spaceTop = value / 2;
        this.spaceBottom = this.spaceTop;
    }

    setSplittedHeight(height) {
        if (height === undefined) {
            height = 0;
        }
        this.splittedHeight = height;
        return this;
    }

    // shiftEnable
    setShiftEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.shiftEnable = enable;
        return true;
    }
}

export default SplitController;