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
                { proportion: 0, expand: false, fitRatio: 1 }
            )

        this.addChildrenMap('toggleSwitch', toggleSwitch);

        toggleSwitch.on('valuechange', function (value) {
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

        this.childrenMap.toggleSwitch.setValue(value);
        super.value = value;
    }
}

export default ToggleSwitchInput;