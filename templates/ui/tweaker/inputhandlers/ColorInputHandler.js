import CreateColorInput from './utils/CreateColorInput.js';

export default {
    name: 'ColorInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'color')
        }
        return false;
    },

    // Callback after `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.ColorInput';

        var colorInputConfig = style.colorInput;
        if (colorInputConfig === undefined) {
            colorInputConfig = {};
        }
        if (!colorInputConfig.hasOwnProperty('inputText')) {
            colorInputConfig.inputText = style.inputText;
        }
        var colorInput = CreateColorInput(scene, colorInputConfig);

        gameObject.add(
            colorInput,
            { proportion: 1, expand: true, key: 'colorInput' }
        )

        colorInput.on('valuechange', function (value) {
            gameObject.setValue(value);
        });

    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var colorInput = gameObject.childrenMap.colorInput;
        colorInput.setValue(value);
    },
}