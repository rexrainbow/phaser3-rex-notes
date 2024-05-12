import CreateInputText from './utils/CreateInputText.js';

var SetInputTextReadOnly = function (gameObject, enable) {
    if (enable === undefined) {
        enable = true;
    }
    var inputText = gameObject.childrenMap.inputText;
    inputText.setReadOnly(enable);
}

export default {
    name: 'NumberInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'number');
        }

        return typeof (config.value) === 'number';
    },

    // Callback after `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.NumberInput';

        var inputTextConfig = style.inputNumber || style.inputText;
        var inputText = CreateInputText(scene, inputTextConfig)
            .setNumberInput();

        gameObject.add(
            inputText,
            { proportion: 1, expand: true, key: 'inputText' }
        )

        inputText.on('close', function () {
            gameObject.setValue(inputText.value);
        });
    },

    // Callback inside `setup()`
    setup(gameObject, config, setDefaults) {
        if (setDefaults || config.hasOwnProperty('inputTextReadOnly')) {
            SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly);
        }

        gameObject.isFloatType = !config.int;
    },

    // Callback inside `setValue()`
    filterValue(gameObject, value) {
        if (gameObject.isFloatType) {
            return value;
        } else {
            return Math.floor(value);
        }
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var inputText = gameObject.childrenMap.inputText;
        inputText.setText(gameObject.getFotmatText(value));
    },
}