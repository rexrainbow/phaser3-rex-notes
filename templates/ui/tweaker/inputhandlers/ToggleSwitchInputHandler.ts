import CreateToggleSwitch from './utils/CreateToggleSwitch';

var SetToggleSwitchReadOnly = function(gameObject?: any, readOnly?: any) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    var toggleSwitch = gameObject.childrenMap.toggleSwitch;
    toggleSwitch.setReadOnly(readOnly);
}

export default {
    name: 'ToggleSwitchInput',

    accept(config?: any) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'toggleSwitch')
        }

        return false;
    },

    // Callback after `constructor()`
    build(gameObject?: any, config?: any, inputRowStyle?: any, styles?: any) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.ToggleSwitchInput';

        var toggleSwitchConfig = inputRowStyle.toggleSwitch;
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

        toggleSwitch.on('valuechange', function(value?: any) {
            gameObject.setValue(value);
        });
    },

    // Callback inside `setValue()`
    displayValue(gameObject?: any, value?: any) {
        var toggleSwitch = gameObject.childrenMap.toggleSwitch;
        toggleSwitch.setValue(value);
    },

    setReadOnly(gameObject?: any, readOnly?: any) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetToggleSwitchReadOnly(gameObject, readOnly);
    }
}