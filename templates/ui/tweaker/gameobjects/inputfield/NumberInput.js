import InputFiledBase from './InputFieldBase.js';
import CreateInputText from '../../../utils/build/CreateInputText.js';

class NumberInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.NumberInput';

        var inputTextConfig = config.inputNumber || config.inputText;
        var inputText = CreateInputText(scene, inputTextConfig)
            .setNumberInput();

        this.add(
            inputText,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('inputText', inputText);

        inputText.on('close', function () {
            this.setValue(inputText.value);
        }, this);

        this.setValueCallback = function (gameObject, value) {
            inputText.setText(gameObject.getFotmatText(value));
        }

        this.setupCallback = function(gameObject, config) {
            gameObject.setInputTextReadOnly(!!config.inputTextReadOnly);
        }
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