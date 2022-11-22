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
            { proportion: 0, expand: false }
        )

        this.addChildrenMap('checkbox', checkbox);

        checkbox.on('valuechange', function (value) {
            this.setValue(value);
        }, this);
    }

    preLayout() {
        var checkbox = this.childrenMap.checkbox;
        checkbox.resize(1, 1);
    }

    postResolveSize(width, height) {
        var checkbox = this.childrenMap.checkbox;
        var size = height
            - this.getInnerPadding('top') - this.getInnerPadding('bottom')
            - this.getChildOuterPadding(checkbox, 'top') - this.getChildOuterPadding(checkbox, 'bottom');
        checkbox.resize(size, size);

        // Recalculate proportionLength
        this.proportionLength = undefined;
        this._childrenWidth = undefined;
        this.resolveWidth(width, true);
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