import CreateToggleSwitch from './utils/CreateToggleSwitch.js';

export default {
    name: 'ToggleSwitchInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'toggleSwitch')
        }

        return false;
    },

    // Callback after `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.ToggleSwitchInput';

        var toggleSwitchConfig = style.toggleSwitch;
        var toggleSwitch = CreateToggleSwitch(scene, toggleSwitchConfig);

        var size = toggleSwitchConfig.size;
        if (size !== undefined) {
            toggleSwitch.setSize(size, size);
        }

        var fitRatio = (size !== undefined) ? 0 : 1;

        gameObject
            .addSpace()
            .add(
                toggleSwitch,
                { proportion: 0, expand: false, fitRatio: fitRatio, key: 'toggleSwitch' }
            )

        toggleSwitch.on('valuechange', function (value) {
            gameObject.setValue(value);
        });
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var toggleSwitch = gameObject.childrenMap.toggleSwitch;
        toggleSwitch.setValue(value);
    },
}