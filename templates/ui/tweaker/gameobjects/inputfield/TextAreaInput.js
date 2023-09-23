import InputFiledBase from './InputFieldBase.js';
import CreateInputTextArea from '../../../utils/build/CreateInputTextArea.js';

class TextAreaInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.TextAreaInput';

        var inputTextAreaConfig = config.inputTextArea;
        if (inputTextAreaConfig === undefined) {
            inputTextAreaConfig = {};
        }
        if (!inputTextAreaConfig.hasOwnProperty('text')) {
            inputTextAreaConfig.text = config.inputText;
        }
        if (!inputTextAreaConfig.hasOwnProperty('slider')) {
            inputTextAreaConfig.slider = config.slider;
        }

        var inputText = CreateInputTextArea(scene, inputTextAreaConfig);

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

export default TextAreaInput;