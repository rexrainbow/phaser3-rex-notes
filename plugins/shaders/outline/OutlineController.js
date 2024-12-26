import { FilterName } from './const.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class OutlineController extends Phaser.Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.thickness = 0;
        this._outlineColor = new Color();
        this.quality = 0.1;

        this.setPaddingOverride(null);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setThickness(GetValue(o, 'thickness', 3));
        this.setOutlineColor(GetValue(o, 'outlineColor', 0xffffff));
        this.setQuality(GetValue(o, 'quality', 0.1));
        return this;
    }

    setThickness(value) {
        this.thickness = value;
        return this;
    }

    get outlineColor() {
        return this._outlineColor;
    }

    set outlineColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._outlineColor.setFromRGB(value);
    }

    setOutlineColor(value) {
        this.outlineColor = value;
        return this;
    }

    setQuality(value) {
        this.quality = value;
        return this;
    }

    getPadding() {
        var override = this.paddingOverride;
        if (override)
        {
            this.currentPadding.setTo(override.x, override.y, override.width, override.height);
            return override;
        }

        var padding = this.currentPadding;
        var distance = this.thickness;

        padding.left = -distance;
        padding.top = -distance;
        padding.right = distance;
        padding.bottom = distance;

        return padding;
    }
}

export default OutlineController;