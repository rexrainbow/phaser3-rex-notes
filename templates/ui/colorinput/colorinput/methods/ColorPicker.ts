import Sizer from '../../../sizer/Sizer';
import ColorPicker from '../../colorpicker/ColorPicker';
import ColorComponents from '../../colorcomponents/ColorComponents';
import TouchEventStop from '../../../toucheventstop/TouchEventStop';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class ColorPickerPanel extends Sizer {
    _value: any;
    add: any;
    addBackground: any;
    addChildrenMap: any;
    childrenMap: any;
    emit: any;
    type: any;

    constructor(scene?: any, config?: any) {
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

        var colorComponents;
        if (config.colorComponents) {
            colorComponents = new ColorComponents(scene, config.colorComponents);
            scene.add.existing(colorComponents);
        }

        if (background?: any) {
            this.addBackground(background);
            var touchEventStop = new TouchEventStop(background, {
                stopAllLevels: false,
            });
        }

        this.add(
            colorPicker,
            { proportion: 1, expand: true }
        );

        if (colorComponents?: any) {
            this.add(
                colorComponents,
                { proportion: 0, expand: true }
            );
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('colorPicker', colorPicker);
        this.addChildrenMap('colorComponents', colorComponents);

        colorPicker.on('valuechange', function(value?: any) {
            this.setValue(value);
        }, this)

        if (colorComponents?: any) {
            colorComponents.on('valuechange', function(value?: any) {
                this.setValue(value);
            }, this)
        }

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

        var colorPicker = this.childrenMap.colorPicker;
        colorPicker.setValue(value);

        var colorComponents = this.childrenMap.colorComponents;
        if (colorComponents?: any) {
            colorComponents.setValue(value);
        }

        this.emit('valuechange', value);
    }

    setValue(value?: any) {
        this.value = value;
        return this;
    }

}

export default ColorPickerPanel;