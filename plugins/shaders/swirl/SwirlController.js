import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;

class SwirlController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution
        this.radius = 0;
        this.rotation = 0;
        
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
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
    setRadius(value) {
        this.radius = value;
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
}

export default SwirlController;