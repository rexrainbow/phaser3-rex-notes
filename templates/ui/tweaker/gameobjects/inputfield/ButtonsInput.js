import InputFiledBase from './InputFieldBase.js';
import CreateButtons from '../utils/CreateButtons.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateInteractiveLabel from '../../../utils/build/CreateInteractiveLabel.js';
import { GetOptionText, GetOptionValue } from '../../utils/OptionsMethods.js';
import SetButtonsActiveStateByText from '../utils/SetButtonsActiveState.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ButtonsInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.ButtonsInput';

        var buttonConfig = (config.button) ? DeepClone(config.button) : {};
        var buttonExpand = GetValue(buttonConfig, 'expand', true);
        if (buttonExpand) {
            buttonConfig.align = 'center';
        }
        delete buttonConfig.expand;

        var list = CreateButtons(scene, {
            expand: buttonExpand
        });
        list.buttonConfig = buttonConfig;

        this.add(
            list,
            { proportion: 1, expand: true }
        );

        this.addChildrenMap('list', list);

        list.on('button.click', function (button, index, pointer, event) {
            var value = GetOptionValue(list.options, button.text);
            this.setValue(value);
        }, this);

    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        var list = this.childrenMap.list;
        var text = GetOptionText(list.options, value);
        SetButtonsActiveStateByText(list.childrenMap.buttons, text);
        super.value = value;
    }

    setOptions(options) {
        var list = this.childrenMap.list;
        list.options = options;

        var scene = this.scene;
        var buttonConfig = list.buttonConfig;
        list.clearButtons(true);
        for (var i = 0, cnt = options.length; i < cnt; i++) {
            var option = options[i];
            var button = CreateInteractiveLabel(scene, buttonConfig)
                .setActiveState(false)
                .resetDisplayContent({ text: option.text })

            list.addButton(button);
        }

        return this;
    }
}

export default ButtonsInput;