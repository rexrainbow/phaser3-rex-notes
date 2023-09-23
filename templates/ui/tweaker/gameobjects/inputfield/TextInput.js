import InputFiledBase from './InputFieldBase.js';
import CreateInputText from '../../../utils/build/CreateInputText.js';

class TextInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.TextInput';

        var inputTextConfig = config.inputText;
        var inputText = CreateInputText(scene, inputTextConfig);

        this.add(
            inputText,
            { proportion: 1, expand: true, key: 'inputText' }
        )

        inputText.on('close', function () {
            this.setValue(inputText.value);
        }, this);

        this.setDisplayValueCallback(function (gameObject, value) {
            inputText.setText(gameObject.getFotmatText(value));
        });

        this.setSetupCallback(function (gameObject, config) {
            gameObject.setInputTextReadOnly(!!config.inputTextReadOnly);
        })

    }

    setInputTextReadOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.childrenMap.inputText.setReadOnly(enable);
        return this;
    }
}

export default TextInput;