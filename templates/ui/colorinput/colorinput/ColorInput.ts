import ColorInputBase from '../colorinputbase/ColorInputBase';
import Methods from './methods/Methods';
import CreateBackground from '../../utils/build/CreateBackground';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class ColorInput extends ColorInputBase {
    _readOnly: any;
    childrenMap: any;
    disableClick: any;
    enableClick: any;
    onClick: any;
    openColorPicker: any;
    setColorComponentsFormatLabelConfig: any;
    setColorComponentsHeight: any;
    setColorComponentsInputTextConfig: any;
    setColorComponentsSpace: any;
    setColorPickerBounds: any;
    setColorPickerEaseInDuration: any;
    setColorPickerEaseOutDuration: any;
    setColorPickerExpandDirection: any;
    setColorPickerHPalettePosition: any;
    setColorPickerSize: any;
    setColorPickerSpace: any;
    setColorPickerTransitInCallback: any;
    setColorPickerTransitOutCallback: any;
    setCreateColorPickerBackgroundCallback: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        this.type = 'rexColorInput';

        if (!config.hasOwnProperty('colorPicker')) {
            config.colorPicker = {
                background: { color: 0x0 }
            }
        }

        var colorPickerConfig = config.colorPicker;
        var hasColorPicker = (colorPickerConfig !== false) && (colorPickerConfig !== null);

        if (hasColorPicker?: any) {
            this.setColorPickerSize(
                GetValue(colorPickerConfig, 'width', 160),
                GetValue(colorPickerConfig, 'height', 170)
            );

            var createBackgroundCallback;
            var background = GetValue(colorPickerConfig, 'background');
            if (background?: any) {
                createBackgroundCallback = function(scene?: any) {
                    return CreateBackground(scene, background);
                }
            } else {
                createBackgroundCallback = GetValue(colorPickerConfig, 'createBackgroundCallback');
            }
            this.setCreateColorPickerBackgroundCallback(createBackgroundCallback);

            this.setColorPickerHPalettePosition(GetValue(colorPickerConfig, 'hPalettePosition', 0));
            this.setColorPickerExpandDirection(GetValue(colorPickerConfig, 'expandDirection'));
            this.setColorPickerEaseInDuration(GetValue(colorPickerConfig, 'easeIn', 200));
            this.setColorPickerEaseOutDuration(GetValue(colorPickerConfig, 'easeOut', 200));
            this.setColorPickerTransitInCallback(GetValue(colorPickerConfig, 'transitIn'));
            this.setColorPickerTransitOutCallback(GetValue(colorPickerConfig, 'transitOut'));
            this.setColorPickerBounds(GetValue(colorPickerConfig, 'bounds'));

            var colorPickerSpaceConfig = GetValue(colorPickerConfig, 'space');
            if (colorPickerSpaceConfig === undefined) {
                colorPickerSpaceConfig = { left: 10, right: 10, top: 10, bottom: 10, item: 8 }
            }
            this.setColorPickerSpace(colorPickerSpaceConfig);
        }

        var colorComponentsConfig = config.colorComponents;
        var hasColorComponents = (colorComponentsConfig !== false) && (colorComponentsConfig !== null);
        if (hasColorPicker && hasColorComponents) {
            this.setColorComponentsHeight(GetValue(colorComponentsConfig, 'height', 30));

            this.setColorComponentsFormatLabelConfig(GetValue(colorComponentsConfig, 'formatLabel'));

            var colorComponentsInputTextConfig = GetValue(colorComponentsConfig, 'inputText');
            if (!colorComponentsInputTextConfig) {
                colorComponentsInputTextConfig = GetValue(config, 'inputText');
            }
            this.setColorComponentsInputTextConfig(colorComponentsInputTextConfig);

            var colorComponentsSpace = GetValue(colorComponentsConfig, 'space');
            if (colorComponentsSpace === undefined) {
                colorComponentsSpace = { item: 8 }
            }
            this.setColorComponentsSpace(colorComponentsSpace);
        }



        var swatch = this.childrenMap.swatch;
        if (swatch && hasColorPicker) {
            this.onClick(swatch, this.openColorPicker, this);
        }
    }

    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        var swatch = this.childrenMap.swatch;
        if (swatch?: any) {
            if (value?: any) {
                this.disableClick(swatch);
            } else {
                this.enableClick(swatch);
            }
        }

        super.readOnly = value;
    }
}

Object.assign(
    ColorInput.prototype,
    Methods,
)

export default ColorInput;