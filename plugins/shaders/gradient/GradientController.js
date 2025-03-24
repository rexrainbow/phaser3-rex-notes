import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GradientController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.alpha = 0.2;
        this.fromX = 0;
        this.fromY = 0;
        this.toX = 0;
        this.toY = 1;
        this.glcolor1 = [255, 0, 0];
        this.glcolor2 = [0, 255, 0];
        this.size = 0;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setAlpha(GetValue(o, 'alpha', 0.2));
        this.setFromPosition(GetValue(o, 'fromX', 0), GetValue(o, 'fromY', 0));
        this.setToPosition(GetValue(o, 'toX', 0), GetValue(o, 'toY', 1));
        this.setColor1(GetValue(o, 'color1', 0xff0000));
        this.setColor2(GetValue(o, 'color2', 0x00ff00));
        this.setSize(GetValue(o, 'size', 0))

        return this;
    }

    get color1() {
        var color = this.glcolor1;
        return (((color[0]) << 16) + ((color[1]) << 8) + (color[2] | 0));
    }

    set color1(value) {
        var color = this.glcolor1;
        color[0] = ((value >> 16) & 0xFF);
        color[1] = ((value >> 8) & 0xFF);
        color[2] = (value & 0xFF);
    }

    get color2() {
        var color = this.glcolor2;
        return (((color[0]) << 16) + ((color[1]) << 8) + (color[2] | 0));
    }

    set color2(value) {
        var color = this.glcolor2;
        color[0] = ((value >> 16) & 0xFF);
        color[1] = ((value >> 8) & 0xFF);
        color[2] = (value & 0xFF);
    }

    setAlpha(alpha) {
        this.alpha = alpha;
        return this;
    }

    setFromPosition(x, y) {
        this.fromX = x;
        this.fromY = y;
        return this;
    }

    setToPosition(x, y) {
        this.toX = x;
        this.toY = y;
        return this;
    }

    setColor1(color1) {
        this.color1 = color1;
        return this;
    }

    setColor2(color2) {
        this.color2 = color2;
        return this;
    }

    setSize(size) {
        this.size = size;
        return this;
    }

}

export default GradientController;