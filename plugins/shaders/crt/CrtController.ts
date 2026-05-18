import { FilterName } from './const';

import { Filters as PhaserFilters, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class CrtController extends PhaserFilters.Controller {
    scanLineStrength: any;
    scanLineWidth: any;
    warp: any;
    warpX: any;
    warpY: any;

    static FilterName = FilterName;

    constructor(camera?: any, config?: any) {
        super(camera, FilterName);

        this.warp = 0;
        this.scanLineStrength = 0.2;
        this.scanLineWidth = 1024;

        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        this.setWarp(GetValue(o, 'warpX', 0.75), GetValue(o, 'warpY', 0.75));
        this.setScanLineStrength(GetValue(o, 'scanLineStrength', 0.2));
        this.setScanLineWidth(GetValue(o, 'scanLineWidth', 1024));
        return this;
    }

    // warp
    setWarp(warpX?: any, warpY?: any) {
        this.warpX = warpX;
        this.warpY = warpY;
        return this;
    }

    // scanLineStrength
    setScanLineStrength(value?: any) {
        this.scanLineStrength = value;
        return this;
    }

    // scanLineWidth
    setScanLineWidth(value?: any) {
        this.scanLineWidth = value;
        return this;
    }
}

export default CrtController;