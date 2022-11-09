import Sizer from '../sizer/Sizer.js';
import { CreateHPalette, CreateSVPalette } from './methods/CreateHSVPalette.js';


const GetValue = Phaser.Utils.Objects.GetValue;

class ColorPicker extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexColorPicker';

        // orientation
        var hPalettePosition = GetValue(config, 'hPalette.position', 'bottom');
        if (typeof (hPalettePosition) === 'string') {
            hPalettePosition = HPalettePositionNamesMap[hPalettePosition];
        }
        var orientation = (
            (hPalettePosition === 0) ||  // bottom
            (hPalettePosition === 2)     // top
        ) ? 1 :  // y
            0;   // x
        this.setOrientation(orientation)

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var hPaletteSize = GetValue(config, 'hPalette.size', 10);
        var hPaletteWidth, hPaletteHeight;
        if (this.orientation === 0) {
            hPaletteWidth = hPaletteSize;
        } else {
            hPaletteHeight = hPaletteSize;
        }
        var hPalette = CreateHPalette(scene, hPaletteWidth, hPaletteHeight);

        var svPaletteWidth = GetValue(config, 'svPalette.width', undefined);
        var svPaletteHeight = GetValue(config, 'svPalette.height', undefined);
        var svPalette = CreateSVPalette(scene, svPaletteWidth, svPaletteWidth);

        if (background) {
            this.addBackground(background);
        }

        var hPaletteAddConfig = {
            proportion: 0, expand: true
        }

        var svPaletteProportion, svPaletteExpand;
        if (this.orientation === 0) {
            svPaletteProportion = (svPaletteWidth === undefined) ? 1 : 0;
            svPaletteExpand = (svPaletteHeight === undefined) ? true : false;
        } else {
            svPaletteProportion = (svPaletteHeight === undefined) ? 1 : 0;
            svPaletteExpand = (svPaletteWidth === undefined) ? true : false;
        }
        var svPaletteAddConfig = {
            proportion: svPaletteProportion, expand: svPaletteExpand
        }

        if ((hPalettePosition === 0) || (hPalettePosition === 3)) {  // bottom, right
            this
                .add(svPalette, svPaletteAddConfig)
                .add(hPalette, hPaletteAddConfig)
        } else {  // left, top
            this
                .add(hPalette, hPaletteAddConfig)
                .add(svPalette, svPaletteAddConfig)
        }

        hPalette
            .on('input', function () {
                svPalette.setHue(hPalette.getHue());
                this.setValue(svPalette.getColor());
            }, this)

        svPalette
            .on('input', function () {
                this.setValue(svPalette.getColor());
            }, this)

        this.addChildrenMap('background', background);
        this.addChildrenMap('hPalette', hPalette);
        this.addChildrenMap('svPalette', svPalette);

        this.setValue(GetValue(config, 'value', 0xffffff));
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        this._value = value;

        this.childrenMap.hPalette.setColor(value);
        this.childrenMap.svPalette.setColor(value);

        this.emit('valuechange', this._value);
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    get color() {
        return this._value;
    }

    set color(color) {
        this.value = color;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    runLayout(parent, newWidth, newHeight) {
        if (this.ignoreLayout) {
            return this;
        }

        super.runLayout(parent, newWidth, newHeight);

        this.childrenMap.hPalette.setMarkerPosition(this.value);
        this.childrenMap.svPalette.setMarkerPosition(this.value);

        return this;
    }

}

var HPalettePositionNamesMap = {
    bottom: 0,
    left: 1,
    top: 2,
    right: 3
}

export default ColorPicker;