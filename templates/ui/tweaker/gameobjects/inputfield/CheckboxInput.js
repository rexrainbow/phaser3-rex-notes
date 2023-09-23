import InputFiledBase from './InputFieldBase.js';
import CreateCheckbox from '../utils/CreateCheckbox.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CheckboxInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.CheckboxInput';

        var checkboxConfig = config.checkbox;
        var checkbox = CreateCheckbox(scene, checkboxConfig);

        var size = GetValue(checkboxConfig, 'size');
        if (size !== undefined) {
            checkbox.setSize(size, size);
        }

        var fitRatio = (size !== undefined) ? 0 : 1;
        this.add(
            checkbox,
            { proportion: 0, expand: false, fitRatio: fitRatio }
        )

        this.addChildrenMap('checkbox', checkbox);

        checkbox.on('valuechange', function (value) {
            this.setValue(value);
        }, this);

        this.setValueCallback = function(gameObject, value) {
            checkbox.setValue(value);
        }
    }
}

export default CheckboxInput;