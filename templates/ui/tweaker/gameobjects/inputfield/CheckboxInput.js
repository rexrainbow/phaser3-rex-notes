import InputFiledBase from './InputFieldBase.js';
import CreateCheckbox from '../utils/CreateCheckbox.js';

class CheckboxInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.CheckboxInput';

        var checkboxConfig = config.checkbox;
        var checkbox = CreateCheckbox(scene, checkboxConfig);

        this.add(
            checkbox,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('checkbox', checkbox);

        checkbox.on('valuechange', function (value) {
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

        this.childrenMap.checkbox.setValue(value);
        super.value = value;
    }
}

export default CheckboxInput;