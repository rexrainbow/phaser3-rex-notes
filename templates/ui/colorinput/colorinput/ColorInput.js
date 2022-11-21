import ColorInputBase from '../colorinputbase/ColorInputBase.js';
import Methods from './methods/Methods.js';
import CreateRoundRectangle from '../../utils/build/CreateRoundRectangle.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ColorInput extends ColorInputBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        this.type = 'rexColorInput';

        var colorPickerConfig = config.colorPicker;
        var hasColorPicker = !!colorPickerConfig;

        if (hasColorPicker) {
            this.setColorPickerSize(GetValue(colorPickerConfig, 'width'), GetValue(colorPickerConfig, 'height'));

            var createBackgroundCallback;
            var background = GetValue(colorPickerConfig, 'background');
            if (background) {
                createBackgroundCallback = function (scene) {
                    return CreateRoundRectangle(scene, background);
                }
            } else {
                createBackgroundCallback = GetValue(colorPickerConfig, 'createBackgroundCallback');
            }
            this.setCreateColorPickerBackgroundCallback(createBackgroundCallback);

            this.setColorPickerExpandDirection(GetValue(colorPickerConfig, 'expandDirection'));
            this.setColorPickerEaseInDuration(GetValue(colorPickerConfig, 'easeIn', 500));
            this.setColorPickerEaseOutDuration(GetValue(colorPickerConfig, 'easeOut', 500));
            this.setColorPickerTransitInCallback(GetValue(colorPickerConfig, 'transitIn'));
            this.setColorPickerTransitOutCallback(GetValue(colorPickerConfig, 'transitIn'));
            this.setColorPickerBounds(GetValue(colorPickerConfig, 'bounds'));
            this.setColorPickerSpace(GetValue(colorPickerConfig, 'space'));
        }

        var colorComponentsConfig = config.colorComponents;
        var hasColorComponents = !!colorComponentsConfig;
        if (hasColorPicker && hasColorComponents) {
            this.setColorComponentsHeight(GetValue(colorComponentsConfig, 'height', 30));

            this.setColorComponentsFormatLabelConfig(GetValue(colorComponentsConfig, 'formatLabel'));

            var colorComponentsInputTextConfig = GetValue(colorComponentsConfig, 'inputText');
            if (!colorComponentsInputTextConfig) {
                colorComponentsInputTextConfig = GetValue(config, 'inputText');
            }
            this.setColorComponentsInputTextConfig(colorComponentsInputTextConfig);

            this.setColorComponentsSpace(GetValue(colorComponentsConfig, 'space'));
        }



        var swatch = this.childrenMap.swatch;
        if (swatch && hasColorPicker) {
            this.onClick(swatch, this.openColorPicker, this);
        }
    }
}

Object.assign(
    ColorInput.prototype,
    Methods,
)

export default ColorInput;