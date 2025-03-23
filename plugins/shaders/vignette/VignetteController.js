import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class VignetteController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.x = 0.5;
        this.y = 0.5;
        this.radius = 0.5;
        this.strength = 0.5;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setPosition(GetValue(o, 'x', 0.5), GetValue(o, 'y', 0.5));
        this.setRadius(GetValue(o, 'radius', 0.5));
        this.setStrength(GetValue(o, 'strength', 0.5));

        return this;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setRadius(radius) {
        this.radius = radius;
        return this;
    }

    setStrength(strength) {
        this.strength = strength;
        return this;
    }
}

export default VignetteController;