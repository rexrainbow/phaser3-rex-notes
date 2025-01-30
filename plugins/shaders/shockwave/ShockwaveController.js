import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ShockwaveController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution
        this.waveWidth = 20;
        this.powBaseScale = 0.8;
        this.powExponent = 0.1;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        this.setWaveRadius(GetValue(o, 'waveRadius', 0));
        this.setWaveWidth(GetValue(o, 'waveWidth', 20));
        this.setPowBaseScale(GetValue(o, 'powBaseScale', 0.8));
        this.setPowExponent(GetValue(o, 'powExponent', 0.1));
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

    // waveRadius
    setWaveRadius(value) {
        if (value === undefined) {
            value = 0;
        }
        this.waveRadius = value;
        return this;
    }

    // waveWidth
    setWaveWidth(value) {
        if (value === undefined) {
            value = 0;
        }
        this.waveWidth = value;
        return this;
    }

    // powBaseScale
    setPowBaseScale(value) {
        this.powBaseScale = value;
        return this;
    }

    // powExponent
    setPowExponent(value) {
        this.powExponent = value;
        return this;
    }

}

export default ShockwaveController;