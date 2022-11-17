import ColorInputBase from '../colorinputbase/ColorInputBase.js';
import ColorPickerPanel from './methods/ColorPickerPanel.js';

class ColorInput extends ColorInputBase {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexColorInput';

        var swatch = this.childrenMap.swatch;
        if (swatch) {
            this.onClick(swatch, function () {
                if (this.colorPickerPanel) {
                    return;
                }

                //this.colorPickerPanel = new ColorPickerPanel(scene, config)
                //    .once('destroy', function () {
                //        this.colorPickerPanel = null;
                //    }, this)
                //scene.add.existing(this.colorPickerPanel);
            }, this);
        }
    }
}

export default ColorInput;