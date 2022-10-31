import Sizer from '../../../sizer/Sizer.js';
import InputFiledBase from './InputFieldBase.js';
import CreateCanvasInput from '../utils/CreateCanvasInput.js';

class TextInput extends InputFiledBase(Sizer) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var sizerConfig = {
            orientation: 0, // x            
        }
        super(scene, sizerConfig);
        this.type = 'rexTweaker.TextInput';

        var inputTextConfig = config.inputText;
        var inputText = CreateCanvasInput(scene, inputTextConfig);

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

        this.childrenMap.inputText.setValue(value);
        super.value = value;
    }

}

export default TextInput;