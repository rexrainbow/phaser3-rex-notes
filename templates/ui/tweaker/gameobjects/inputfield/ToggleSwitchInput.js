import InputFiledBase from './InputFieldBase.js';
import CreateToggleSwitch from '../utils/CreateToggleSwitch.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ToggleSwitchInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.ToggleSwitchInput';

        var toggleSwitchConfig = config.toggleSwitch;
        var toggleSwitch = CreateToggleSwitch(scene, toggleSwitchConfig);

        var size = GetValue(toggleSwitchConfig, 'size');
        if (size !== undefined) {
            toggleSwitch.setSize(size, size);
        }

        var fitRatio = (size !== undefined) ? 0 : 1;

        this
            .addSpace()
            .add(
                toggleSwitch,
                { proportion: 0, expand: false, fitRatio: fitRatio, key: 'toggleSwitch' }
            )

        toggleSwitch.on('valuechange', function (value) {
            this.setValue(value);
        }, this);

        this.setDisplayValueCallback(function (gameObject, value) {
            toggleSwitch.setValue(value);
        });
    }
}

export default ToggleSwitchInput;