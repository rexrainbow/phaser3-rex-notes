import InputFiledBase from './InputFieldBase.js';
import CreateTextInput from '../utils/CreateTextInput.js';

class NumberInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.NumberInput';

        var inputTextConfig = config.inputNumber || config.inputText;
        var inputText = CreateTextInput(scene, inputTextConfig)
            .setNumberInput();

        this.add(
            inputText,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('inputText', inputText);

        inputText.on('close', function () {
            this.setValue(inputText.value);
        }, this);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        var text = (this.textFormatCallback) ? this.textFormatCallback(value) : value;
        this.childrenMap.inputText.setText(text);
        super.value = value;
    }

    setInputTextReadOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.childrenMap.inputText.setReadOnly(enable);
        return this;
    }
}

export default NumberInput;