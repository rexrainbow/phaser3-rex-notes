import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class HslAdjustController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.hueRotate = 0;
        this.satAdjust = 1;
        this.lumAdjust = 0.5;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setHueRotate(GetValue(o, 'hueRotate', 0));
        this.setSatAdjust(GetValue(o, 'satAdjust', 1));
        this.setLumAdjust(GetValue(o, 'lumAdjust', 0.5));
        return this;
    }

    // hueRotate
    setHueRotate(value) {
        this.hueRotate = value; // 0: rotate 0 degrees, 0.5: rotate 180 degrees, 1: rotate 360 degrees
        return this;
    }

    // satAdjust
    setSatAdjust(value) {
        this.satAdjust = value;  // 0: gray, 1: original color, > 1: 
        return this;
    }

    // lumAdjust
    setLumAdjust(value) {
        this.lumAdjust = value;  // 0: dark, 0.5: original color, 1: white
        return this;
    }
}

export default HslAdjustController;