import Sizer from '../../../sizer/Sizer.js';
import InputFiledBase from './InputFieldBase.js';
import CreateCanvasInput from '../utils/CreateCanvasInput.js';

class NumberInput extends InputFiledBase(Sizer) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var sizerConfig = {
            orientation: 0, // x            
        }
        super(scene, sizerConfig);
        this.type = 'rexTweaker.NumberInput';

        var inputNumberConfig = config.inputNumber || config.inputText;
        var inputNumber = CreateCanvasInput(scene, inputNumberConfig)
            .setNumberInput();

        this.add(
            inputNumber,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('inputNumber', inputNumber);

        inputNumber.on('close', function () {
            this.setValue(inputNumber.value);
        }, this);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        this.childrenMap.inputNumber.setValue(value);
        super.value = value;
    }

}

export default NumberInput;