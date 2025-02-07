import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class FishEyeController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.fishEyeMode = 0;
        this.radius = 0;
        this.intensity = 1;
        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setFishEyeMode(GetValue(o, 'mode', 0));
        this.setRadius(GetValue(o, 'radius', 0));
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        this.setIntensity(GetValue(o, 'intensity', 1));
        return this;
    }

    // Mode
    setFishEyeMode(mode) {
        if (typeof (mode) === 'string') {
            mode = FishEyeMode[mode];
        }
        this.fishEyeMode = mode;
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

    // intensity
    setIntensity(value) {
        this.intensity = value;
        return this;
    }
}

const FishEyeMode = {
    'asin': 0,
    'sin': 1
}

export default FishEyeController;