import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class ToonifyController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.edgeThreshold = 0;
        this.hueLevels = 0;
        this._satLevels = 0;
        this._valLevels = 0;
        this._edgeColor = new Color();

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setEdgeThreshold(GetValue(o, 'edgeThreshold', 0.2));
        this.setHueLevels(GetValue(o, 'hueLevels', 0));
        this.setSatLevels(GetValue(o, 'satLevels', 0));
        this.setValLevels(GetValue(o, 'valLevels', 0));
        this.setEdgeColor(GetValue(o, 'edgeColor', 0));
        return this;
    }

    // edgeThreshold
    setEdgeThreshold(value) {
        this.edgeThreshold = value;
        return this;
    }

    // hueLevels
    setHueLevels(value) {
        this.hueLevels = value;
        return this;
    }

    get hueStep() {
        if (this.hueLevels > 0) {
            return 360 / this.hueLevels;
        } else {
            return 0;
        }
    }

    // satLevels
    get satLevels() {
        return this._satLevels;
    }

    set satLevels(value) {
        this._satLevels = value;
    }

    setSatLevels(value) {
        this.satLevels = value;
        return this;
    }

    get satStep() {
        if (this._satLevels > 0) {
            return 1 / this._satLevels;
        } else {
            return 0;
        }
    }

    // valLevels
    get valLevels() {
        return this._valLevels;
    }

    set valLevels(value) {
        this._valLevels = value;
    }

    setValLevels(value) {
        this.valLevels = value;
        return this;
    }

    get valStep() {
        if (this._valLevels > 0) {
            return 1 / this._valLevels;
        } else {
            return 0;
        }
    }

    // edgeColor
    get edgeColor() {
        return this._edgeColor;
    }

    set edgeColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._edgeColor.setFromRGB(value);
    }

    setEdgeColor(value) {
        this.edgeColor = value;
        return this;
    }
}

export default ToonifyController;