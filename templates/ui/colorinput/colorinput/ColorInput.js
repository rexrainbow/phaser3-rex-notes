import ColorInputBase from '../colorinputbase/ColorInputBase.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ColorInput extends ColorInputBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        this.type = 'rexColorInput';

        var hasColorPicker = !!config.colorPicker;

        if (hasColorPicker) {
            this.setColorPickerTransitInCallback(GetValue(config.colorPicker, 'transitIn'));
            this.setColorPickerTransitOutCallback(GetValue(config.colorPicker, 'transitIn'));
        }

        var swatch = this.childrenMap.swatch;
        if (swatch && hasColorPicker) {
            this.onClick(swatch, function () {
                if (this.colorPickerPanel) {
                    return;
                }

                this.colorPickerPanel = this.createColorPickerPanel(scene, config)
                    .once('destroy', function () {
                        this.colorPickerPanel = null;
                    }, this)
                    .setOrigin(0, 0)
                    .layout()
                    .setPosition(this.left, this.bottom)
                    .on('valuechange', function (value) {
                        this.setValue(value);
                    }, this)

                this.pin(this.colorPickerPanel);

                this.delayCall(0, function () {
                    this.colorPickerPanel.onClickOutside(function () {
                        this.colorPickerPanel.destroy();
                    }, this)
                }, this)

            }, this);
        }
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        super.destroy(fromScene);
        this.removeDelayCall();
    }
}

Object.assign(
    ColorInput.prototype,
    Methods,
)

export default ColorInput;