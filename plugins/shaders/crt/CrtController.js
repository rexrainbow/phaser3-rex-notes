import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CrtController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.warp = 0;
        this.scanLineStrength = 0.2;
        this.scanLineWidth = 1024;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setWarp(GetValue(o, 'warpX', 0.75), GetValue(o, 'warpY', 0.75));
        this.setScanStrength(GetValue(o, 'scanLineStrength', 0.2));
        this.setScanLineWidth(GetValue(o, 'scanLineWidth', 1024));
        return this;
    }

    // warp
    setWarp(warpX, warpY) {
        this.warpX = warpX;
        this.warpY = warpY;
        return this;
    }

    // scanLineStrength
    setScanStrength(value) {
        this.scanLineStrength = value;
        return this;
    }

    // scanLineWidth
    setScanLineWidth(value) {
        this.scanLineWidth = value;
        return this;
    }
}

export default CrtController;