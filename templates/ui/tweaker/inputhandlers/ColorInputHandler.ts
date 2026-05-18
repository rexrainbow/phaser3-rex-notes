import CreateColorInput from './utils/CreateColorInput';

var SetColorInputReadOnly = function(gameObject?: any, readOnly?: any) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    var colorInput = gameObject.childrenMap.colorInput;
    colorInput.setReadOnly(readOnly);
}

export default {
    name: 'ColorInput',

    accept(config?: any) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'color')
        }
        return false;
    },

    // Callback after `constructor()`
    build(gameObject?: any, config?: any, inputRowStyle?: any, styles?: any) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.ColorInput';

        var colorInputConfig = inputRowStyle.colorInput;
        if (colorInputConfig === undefined) {
            colorInputConfig = {};
        }
        if (!colorInputConfig.hasOwnProperty('inputText')) {
            colorInputConfig.inputText = inputRowStyle.inputText;
        }
        var colorInput = CreateColorInput(scene, colorInputConfig);

        gameObject.add(
            colorInput,
            { proportion: 1, expand: true, key: 'colorInput' }
        )

        colorInput.on('valuechange', function(value?: any) {
            gameObject.setValue(value);
        });

    },

    // Callback inside `setValue()`
    displayValue(gameObject?: any, value?: any) {
        var colorInput = gameObject.childrenMap.colorInput;
        colorInput.setValue(value);
    },

    setReadOnly(gameObject?: any, readOnly?: any) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetColorInputReadOnly(gameObject, readOnly);
    }
}