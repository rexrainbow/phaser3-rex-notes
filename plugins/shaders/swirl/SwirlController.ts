import { FilterName } from './const';

import { Filters as PhaserFilters, Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const DegToRad = PhaserMath.DegToRad;
const RadToDeg = PhaserMath.RadToDeg;

class SwirlController extends PhaserFilters.Controller {
    camera: any;
    centerX: any;
    centerY: any;
    radius: any;
    rotation: any;

    static FilterName = FilterName;

    constructor(camera?: any, config?: any) {
        super(camera, FilterName);

        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution
        this.radius = 0;
        this.rotation = 0;
        
        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        this.radius = GetValue(o, 'radius', 0);
        var rotation = GetValue(o, 'rotation', undefined);
        if (rotation === undefined) {
            this.setAngle(GetValue(o, 'angle', 0));
        } else {
            this.setRotation(rotation);
        }
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        return this;
    }

    // radius
    setRadius(value?: any) {
        this.radius = value;
        return this;
    }

    // rotation
    setRotation(value?: any) {
        this.rotation = value;
        return this;
    }

    get angle() {
        return RadToDeg(this.rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(value?: any) {
        this.angle = value;
        return this;
    }

    // center
    setCenter(x?: any, y?: any) {
        if (x === undefined) {
            x = this.camera.centerX;
            y = this.camera.centerY;
        }
        this.centerX = x;
        this.centerY = y;
        return this;
    }
}

export default SwirlController;