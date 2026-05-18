import { FilterName } from './const';

import { Filters as PhaserFilters, Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Clamp = PhaserMath.Clamp;

class CrossStitchingController extends PhaserFilters.Controller {
    _brightness: any;
    stitchingHeight: any;
    stitchingWidth: any;

    static FilterName = FilterName;

    constructor(camera?: any, config?: any) {
        super(camera, FilterName);

        this.stitchingWidth = 6; // width of stitching wo resolution
        this.stitchingHeight = 6; // height of stitching wo resolution
        this._brightness = 0;

        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        this.setStitchingSize(GetValue(o, 'stitchingWidth', 6), GetValue(o, 'stitchingHeight', 6));
        this.setBrightness(GetValue(o, 'brightness', 0));
        return this;
    }

    // stitchingWidth
    setStitchingWidth(value?: any) {
        this.stitchingWidth = value;
        return this;
    }

    // stitchingHeight
    setStitchingHeight(value?: any) {
        this.stitchingHeight = value;
        return this;
    }

    setStitchingSize(width?: any, height?: any) {
        if (height === undefined) {
            height = width;
        }
        this.stitchingWidth = width;
        this.stitchingHeight = height;
        return this;
    }

    // brightness
    get brightness() {
        return this._brightness;
    }

    set brightness(value) {
        this._brightness = Clamp(value, 0, 1);
    }

    setBrightness(value?: any) {
        this.brightness = value;
        return this;
    }
}

export default CrossStitchingController;