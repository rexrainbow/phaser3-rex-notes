import CreateCheckbox from './utils/CreateCheckbox';

var SetCheckboxReadOnly = function(gameObject?: any, readOnly?: any) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    var checkbox = gameObject.childrenMap.checkbox;
    checkbox.setReadOnly(readOnly);
}

export default {
    name: 'CheckboxInput',

    accept(config?: any) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'boolean')
        }

        return typeof (config.value) === 'boolean';
    },

    // Callback after `constructor()`
    build(gameObject?: any, config?: any, inputRowStyle?: any, styles?: any) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.CheckboxInput';

        var checkboxConfig = inputRowStyle.checkbox;
        var checkbox = CreateCheckbox(scene, checkboxConfig);

        var size = checkboxConfig.size;
        if (size !== undefined) {
            checkbox.setSize(size, size);
        }

        var fitRatio = (size !== undefined) ? 0 : 1;
        gameObject.add(
            checkbox,
            { proportion: 0, expand: false, fitRatio: fitRatio, key: 'checkbox' }
        )

        checkbox.on('valuechange', function(value?: any) {
            gameObject.setValue(value);
        });
    },

    // Callback inside `setValue()`
    displayValue(gameObject?: any, value?: any) {
        var checkbox = gameObject.childrenMap.checkbox;
        checkbox.setValue(value);
    },

    setReadOnly(gameObject?: any, readOnly?: any) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetCheckboxReadOnly(gameObject, readOnly);
    }
}