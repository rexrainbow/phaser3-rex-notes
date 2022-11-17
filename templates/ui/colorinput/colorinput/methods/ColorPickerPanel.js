import Sizer from '../../../sizer/Sizer.js';
import ColorPicker from '../../colorpicker/ColorPicker.js';
import ColorComponents from '../../colorcomponents/ColorComponents.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ColorPickerPanel extends Sizer {
    constructor(scene, config) {
        var colorPickerConfig = GetValue(config, 'colorPicker', undefined);
        if (colorPickerConfig === undefined) {
            colorPickerConfig = {};
        }

        colorPickerConfig.orientation = 1;
        super(scene, colorPickerConfig);
        this.type = 'rexColorInput.ColorPickerPanel';

        // Add elements
        var background = GetValue(colorPickerConfig, 'background', undefined);

        var colorPicker = new ColorPicker(scene, {
            hPalette: colorPickerConfig.hPalette,
            svPalette: colorPickerConfig.svPalette,
            space: {
                item: GetValue(colorPickerConfig, 'space.hPalette', 0)
            }
        });
        scene.add.existing(colorPicker);

        var colorComponents = new ColorComponents(scene, {
            text: GetValue(colorPickerConfig, 'text'),
        });
        scene.add.existing(colorComponents);

        this.add(
            colorPicker,
            {}
        );

        this.add(
            colorComponents,
            {}
        );

        this.addChildrenMap('background', background);
        this.addChildrenMap('hPalette', hPalette);
        this.addChildrenMap('svPalette', svPalette);
    }

}

export default ColorPickerPanel;