import Sizer from '../../../sizer/Sizer.js';
import InputFiledBase from './InputFieldBase.js';
import CreateSlider from '../utils/CreateSlider.js';
import CreateCanvasInput from '../utils/CreateCanvasInput.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Linear = Phaser.Math.Linear;
const SnapFloor = Phaser.Math.Snap.Floor;

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
        var trackSizeKey = (this.orientation === 0) ? 'track.height' : 'track.width';
        var trackSize = GetValue(sliderConfig, trackSizeKey);
        var slider = CreateSlider(scene, sliderConfig);

        var expand = (trackSize === undefined);
        this.add(
            slider,
            { proportion: 2, expand: expand }
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

        inputNumber.on('close', function () {
            this.setValue(inputNumber.value);
        }, this);

        slider.on('valuechange', function () {
            var value = Linear(this.minValue, this.maxValue, slider.value);
            if (this.step) {
                value = SnapFloor(value, this.step, this.minValue);
            }
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

        this.childrenMap.inputNumber.setText('').setValue(value);
        this.childrenMap.slider.setValue(value, this.minValue, this.maxValue);
        super.value = value;
    }

    setRange(min, max, step) {
        this.minValue = min;
        this.maxValue = max;
        this.step = step;

        this.childrenMap.slider.setGap(step, min, max);

        return this;
    }

}

export default RangeInput;