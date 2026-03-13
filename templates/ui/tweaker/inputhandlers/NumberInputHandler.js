import CreateInputText from './utils/CreateInputText.js';

var SetInputTextReadOnly = function (gameObject, readOnly, force) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    if (force === undefined) {
        force = false;
    }

    var inputText = gameObject.childrenMap.inputText;

    if (force) {
        gameObject.inputTextReadOnly = readOnly;
        inputText.setReadOnly(readOnly);
    } else {
        if (!gameObject.inputTextReadOnly) {
            inputText.setReadOnly(readOnly);
        }
    }
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
    build(gameObject, config, inputRowStyle, styles) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.NumberInput';

        var inputTextConfig = inputRowStyle.inputNumber || inputRowStyle.inputText;
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
            SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly, true);
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

    setReadOnly(gameObject, readOnly) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetInputTextReadOnly(gameObject, readOnly);
    }
}
