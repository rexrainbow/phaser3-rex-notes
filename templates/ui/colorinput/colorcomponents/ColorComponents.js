import Sizer from '../../sizer/Sizer.js';
import BuildListConfig from '../../utils/build/BuildListConfig.js';
import CreateDropDownList from '../../utils/build/CreateDropDownList.js';
import CreateInputText from '../../utils/build/CreateInputText.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Color = Phaser.Display.Color;
const ColorToRGBA = Phaser.Display.Color.ColorToRGBA;
const HSVToRGB = Phaser.Display.Color.HSVToRGB;
const Clamp = Phaser.Math.Clamp;

const ColorTypeList = [
    { text: 'RGB' },
    { text: 'HSV' }
]

class ColorComponents extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 0;
        super(scene, config);
        this.type = 'rexColorComponents';

        this.colorObject = new Color();

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var listConfig = BuildListConfig(scene, config.list);
        var list = CreateDropDownList(scene, listConfig)
            .setOptions(ColorTypeList)
            .resetDisplayContent(ColorTypeList[0])

        var inputTextConfig = GetValue(config, 'inputText');
        var components = [];
        for (var i = 0; i < 3; i++) {
            var inputText = CreateInputText(scene, inputTextConfig)
                .setMaxLength(3)
                .setNumberInput()

            components.push(inputText);
        }

        if (background) {
            this.addBackground(background);
        }

        this.add(
            list,
            { proportion: 0, expand: true }
        );

        var proportion = (GetValue(inputTextConfig, 'width') === undefined) ? 1 : 0;
        var expand = (GetValue(inputTextConfig, 'height') === undefined) ? true : false;
        for (var i = 0, cnt = components.length; i < cnt; i++) {
            this.add(
                components[i],
                { proportion: proportion, expand: expand }
            )
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('list', list);
        this.addChildrenMap('components', components);

        list.on('button.click', function (dropDownList, listPanel, button, index, pointer, event) {
            this.colorType = button.text;
        }, this);

        for (var i = 0, cnt = components.length; i < cnt; i++) {
            components[i].on('close', function () {
                this.updateColorObject();
                this.setValue(this.colorObject.color);
            }, this);
        }

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }

        this.setValue(GetValue(config, 'value', 0xffffff));
    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Clamp(Math.floor(value), 0, 0xffffff);

        if (this._value === value) {
            return;
        }

        this._value = value;

        this.colorObject.setFromRGB(ColorToRGBA(value));
        this.updateComponents();

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

    get colorType() {
        return this.childrenMap.list.text;
    }

    set colorType(value) {
        if (this.colorType === value) {
            return;
        }
        this.childrenMap.list.setText(value);
        this.updateComponents();
    }

    setColorType(colrType) {
        this.colorType = colrType;
        return this;
    }

    updateComponents() {
        var components = this.childrenMap.components;
        var value0, value1, value2
        if (this.colorType === 'RGB') {
            value0 = this.colorObject.red;
            value1 = this.colorObject.green;
            value2 = this.colorObject.blue;
        } else { // colorType === 'HSV'
            value0 = Math.floor(this.colorObject.h * 360);
            value1 = Math.floor(this.colorObject.s * 100);
            value2 = Math.floor(this.colorObject.v * 100);
        }

        components[0].setValue(value0);
        components[1].setValue(value1);
        components[2].setValue(value2);
        return this;
    }

    updateColorObject() {
        var components = this.childrenMap.components;
        if (this.colorType === 'RGB') {
            var red = Clamp(components[0].value, 0, 255);
            var green = Clamp(components[1].value, 0, 255);
            var blue = Clamp(components[2].value, 0, 255);
            this.colorObject.setTo(red, green, blue);
        } else {
            var h = Clamp(components[0].value, 0, 359) / 360;
            var s = Clamp(components[1].value, 0, 100) / 100;
            var v = Clamp(components[2].value, 0, 100) / 100;
            this.colorObject.setFromRGB(HSVToRGB(h, s, v));
        }
        return this;
    }
}

export default ColorComponents;