import Sizer from '../../sizer/Sizer.js';
import BuildListConfig from '../../utils/build/BuildListConfig.js';
import CreateDropDownList from '../../utils/build/CreateDropDownList.js';
import CreateInputText from '../../utils/build/CreateInputText.js';
import SetLabelData from '../../utils/build/SetLabelData.js';
import SetComponentsValue from './methods/SetComponentsValue.js';
import GetComponentsValue from './methods/GetComponentsValue.js';


const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class ColorComponents extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 0;
        super(scene, config);
        this.type = 'rexColorComponents';

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var listConfig = BuildListConfig(scene, config.list);
        var list = CreateDropDownList(scene, listConfig)
            .setOptions([
                { text: 'RGB', value: 0 }
            ])
        SetLabelData(list, { text: 'RGB' })

        var inputTextConfig = GetValue(config, 'inputText');
        var components = [];
        for (var i = 0; i < 3; i++) {
            var inputText = CreateInputText(scene, inputTextConfig)
                .setMaxLength(3)

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
            //var value = GetOptionValue(list.options, button.text);
            //this.setValue(value);
        }, this);

        for (var i = 0, cnt = components.length; i < cnt; i++) {
            components[i].on('close', function () {
                var components = this.childrenMap.components;
                var value = GetComponentsValue(components);
                this.setValue(value);
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

        var components = this.childrenMap.components;
        SetComponentsValue(components, value);

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
}

export default ColorComponents;