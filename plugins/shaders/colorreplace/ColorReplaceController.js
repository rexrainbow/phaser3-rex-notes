import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class ColorReplaceController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.epsilon = 0.4;
        this._originalColor = new Color();
        this._newColor = new Color();

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setEpsilon(GetValue(o, 'epsilon', 0.4));
        this.setOriginalColor(GetValue(o, 'originalColor', 0xff0000));
        this.setNewColor(GetValue(o, 'newColor', 0x000000));
        return this;
    }

    setEpsilon(value) {
        this.epsilon = value;
        return this;
    }

    get originalColor() {
        return this._originalColor;
    }

    set originalColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._originalColor.setFromRGB(value);
    }

    setOriginalColor(value) {
        this.originalColor = value;
        return this;
    }

    get newColor() {
        return this._newColor;
    }

    set newColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._newColor.setFromRGB(value);
    }

    setNewColor(value) {
        this.newColor = value;
        return this;
    }
}

export default ColorReplaceController;