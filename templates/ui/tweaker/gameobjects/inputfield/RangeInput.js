import Sizer from '../../../sizer/Sizer.js';
import InputFiledBase from './InputFieldBase.js';
import CreateSlider from '../utils/CreateSlider.js';
import CreateCanvasInput from '../utils/CreateCanvasInput.js';

class RangeInput extends InputFiledBase(Sizer) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var sizerConfig = {
            orientation: 0, // x            
        }
        super(scene, sizerConfig);
        this.type = 'rexTweaker.RangeInput';

        var sliderConfig = config.slider;
        var slider = CreateSlider(scene, sliderConfig);

        this.add(
            slider,
            { proportion: 2, expand: true }
        )

        var inputNumberConfig = config.inputNumber || config.inputText;
        var inputNumber = CreateCanvasInput(scene, inputNumberConfig)
            .setNumberInput();

        this.add(
            inputNumber,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('slider', slider);
        this.addChildrenMap('inputNumber', inputNumber);

        inputNumber.on('close', this.onValueChange, this);
    }

    get value() {
        return this.childrenMap.inputNumber.value;
    }

    set value(value) {
        this.childrenMap.inputNumber.value = value;
    }

}

export default RangeInput;