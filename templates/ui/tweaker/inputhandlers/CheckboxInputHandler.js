import CreateCheckbox from './utils/CreateCheckbox.js';

export default {
    name: 'CheckboxInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'boolean')
        }

        return typeof (config.value) === 'boolean';
    },

    // Callback after `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.CheckboxInput';

        var checkboxConfig = style.checkbox;
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

        checkbox.on('valuechange', function (value) {
            gameObject.setValue(value);
        });
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var checkbox = gameObject.childrenMap.checkbox;
        checkbox.setValue(value);
    }
}