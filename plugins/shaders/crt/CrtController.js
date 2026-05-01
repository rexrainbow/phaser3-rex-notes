import { FilterName } from './const.js';

import { Filters as PhaserFilters, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class CrtController extends PhaserFilters.Controller {
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
        this.setScanLineStrength(GetValue(o, 'scanLineStrength', 0.2));
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
    setScanLineStrength(value) {
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