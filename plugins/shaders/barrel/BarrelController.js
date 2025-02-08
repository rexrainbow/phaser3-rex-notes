import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BarrelController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.shrinkMode = false;
        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution
        this.radius = 0;
        this.power = 1;
        this.intensity = 1;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setShrinkMode(GetValue(o, 'shrink', false));
        this.setRadius(GetValue(o, 'radius', 0));
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        this.setPower(GetValue(o, 'power', 0.5));
        this.setIntensity(GetValue(o, 'intensity', 1));
        return this;
    }

    // radius
    setRadius(value) {
        this.radius = value;
        return this;
    }

    // center
    setCenter(x, y) {
        if (x === undefined) {
            x = this.camera.centerX;
            y = this.camera.centerY;
        }
        this.centerX = x;
        this.centerY = y;
        return this;
    }

    // power
    setPower(power) {
        this.power = power;
        return this;
    }

    // intensity
    setIntensity(value) {
        this.intensity = value;
        return this;
    }

    // shrinkMode
    setShrinkMode(mode) {
        if (mode === undefined) {
            mode = true;
        }
        this.shrinkMode = mode;
        return this;
    }
}

export default BarrelController;