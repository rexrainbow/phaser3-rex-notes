import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CircleController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.thickness = 8;
        this.scale = 1;
        this.feather = 0.005;
        this.glcolor = [1, 0.2, 0.7];
        this.glcolor2 = [1, 0, 0, 0.4];

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setThickness(GetValue(o, 'thickness', 8));
        this.setScale(GetValue(o, 'scale', 1));
        this.setFeather(GetValue(o, 'feather', 0.005));
        this.setColor(GetValue(o, 'color', 0xFF33B2));
        this.setBackgroundColor(GetValue(o, 'backgroundColor', 0xFF0000));
        this.setBackgroundAlpha(GetValue(o, 'backgroundAlpha', 0.4));

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

    get backgroundColor() {
        var color = this.glcolor2;

        return (((color[0] * 255) << 16) + ((color[1] * 255) << 8) + (color[2] * 255 | 0));
    }

    set backgroundColor(value) {
        var color = this.glcolor2;

        color[0] = ((value >> 16) & 0xFF) / 255;
        color[1] = ((value >> 8) & 0xFF) / 255;
        color[2] = (value & 0xFF) / 255;
    }

    get backgroundAlpha() {
        var color = this.glcolor2;
        return color[3];
    }

    set backgroundAlpha(value) {
        var color = this.glcolor2;
        color[3] = value;
    }


    setThickness(thickness) {
        this.thickness = thickness;
        return this;
    }

    setScale(scale) {
        this.scale = scale;
        return this;
    }

    setFeather(feather) {
        this.feather = feather;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
        return this;
    }

    setBackgroundAlpha(alpha) {
        this.backgroundAlpha = alpha;
        return this;
    }

}

export default CircleController;