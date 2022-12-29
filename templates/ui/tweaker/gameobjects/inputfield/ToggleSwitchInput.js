import InputFiledBase from './InputFieldBase.js';
import CreateToggleSwitch from '../utils/CreateToggleSwitch.js';

class ToggleSwitchInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.ToggleSwitchInput';

        var toggleSwitchConfig = config.toggleSwitch;
        var toggleSwitch = CreateToggleSwitch(scene, toggleSwitchConfig);

        this
            .addSpace()
            .add(
                toggleSwitch,
                { proportion: 0, expand: false }
            )

        this.addChildrenMap('toggleSwitch', toggleSwitch);

        toggleSwitch.on('valuechange', function (value) {
            this.setValue(value);
        }, this);
    }

    preLayout() {
        var toggleSwitch = this.childrenMap.toggleSwitch;
        toggleSwitch.resize(1, 1);
    }

    postResolveSize(width, height) {
        var toggleSwitch = this.childrenMap.toggleSwitch;
        var innerHeight = height
            - this.getInnerPadding('top') - this.getInnerPadding('bottom')
            - this.getChildOuterPadding(toggleSwitch, 'top') - this.getChildOuterPadding(toggleSwitch, 'bottom');
        var innerWidth = width
            - this.getInnerPadding('left') - this.getInnerPadding('right')
            - this.getChildOuterPadding(toggleSwitch, 'left') - this.getChildOuterPadding(toggleSwitch, 'right')
        toggleSwitch.resize(Math.min(innerHeight * 1.2, innerWidth), innerHeight);

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

        this.childrenMap.toggleSwitch.setValue(value);
        super.value = value;
    }
}

export default ToggleSwitchInput;