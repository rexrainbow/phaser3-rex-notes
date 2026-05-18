import { FilterName } from './const';

import { Display as PhaserDisplay, Filters as PhaserFilters, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IntegerToRGB = PhaserDisplay.Color.IntegerToRGB;
const Color = PhaserDisplay.Color;

class OutlineController extends PhaserFilters.Controller {
    _outlineColor: any;
    currentPadding: any;
    paddingOverride: any;
    quality: any;
    setPaddingOverride: any;
    thickness: any;

    static FilterName = FilterName;

    constructor(camera?: any, config?: any) {
        super(camera, FilterName);

        this.thickness = 0;
        this._outlineColor = new Color();
        this.quality = 0.1;

        this.setPaddingOverride(null);
        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        this.setThickness(GetValue(o, 'thickness', 3));
        this.setOutlineColor(GetValue(o, 'outlineColor', 0xffffff));
        this.setQuality(GetValue(o, 'quality', 0.1));
        return this;
    }

    setThickness(value?: any) {
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

    setOutlineColor(value?: any) {
        this.outlineColor = value;
        return this;
    }

    setQuality(value?: any) {
        this.quality = value;
        return this;
    }

    getPadding() {
        var override = this.paddingOverride;
        if (override?: any)
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