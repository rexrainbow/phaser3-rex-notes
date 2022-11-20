import Sizer from '../../../sizer/Sizer.js';
import ColorPicker from '../../colorpicker/ColorPicker.js';
// import ColorComponents from '../../colorcomponents/ColorComponents.js';
import TouchEventStop from '../../../toucheventstop/TouchEventStop.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ColorPickerPanel extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.orientation = 1;
        super(scene, config);
        this.type = 'rexColorInput.ColorPickerPanel';

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var colorPicker = new ColorPicker(scene, {
            hPalette: config.hPalette || {},
            svPalette: config.svPalette || {},
            space: {
                item: GetValue(config, 'space.hPalette', 8)
            }
        });
        scene.add.existing(colorPicker);

        //var colorComponents = new ColorComponents(scene, {
        //    text: GetValue(config, 'text'),
        //});
        //scene.add.existing(colorComponents);

        if (background) {
            this.addBackground(background);
            var touchEventStop = new TouchEventStop(background, {
                stopAllLevels: false,
            });
        }

        this.add(
            colorPicker,
            { proportion: 1, expand: true }
        );

        //this.add(
        //    colorComponents,
        //    {}
        //);

        this.addChildrenMap('background', background);
        this.addChildrenMap('colorPicker', colorPicker);
        //this.addChildrenMap('colorComponents', colorComponents);

        colorPicker.on('valuechange', function () {
            this.emit('valuechange', colorPicker.value);
        }, this)
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        this._value = value;
        this.childrenMap.colorPicker.setValue(value);
    }

    setValue(value) {
        this.value = value;
        return this;
    }

}

export default ColorPickerPanel;