import { StepFilterName as FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BloomStepController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.offsetX = 1;
        this.offsetY = 1;
        this.strength = 1;
        this.glcolor = [1, 1, 1];

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setOffset(GetValue(o, 'offsetX', 1), GetValue(o, 'offsetY', 1));
        this.setStrength(GetValue(o, 'strength', 1));
        this.setColor(GetValue(o, 'color', 0xFFFFFF));

        return this;
    }

    get color() {
        var color = this.glcolor;

        return (((color[0] * 255) << 16) + ((color[1] * 255) << 8) + (color[2] * 255 | 0));
    }

    set color(value) {
        var color = this.glcolor;

        color[0] = ((value >> 16) & 0xFF) / 255;
        color[1] = ((value >> 8) & 0xFF) / 255;
        color[2] = (value & 0xFF) / 255;
    }

    setOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        return this;
    }

    setStrength(strength) {
        this.strength = strength;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

}

export default BloomStepController;