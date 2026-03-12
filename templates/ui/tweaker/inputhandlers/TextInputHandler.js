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
    name: 'TextInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'string')
        }

        return typeof (config.value) === 'string';
    },

    // Callback after `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.TextInput';

        var inputTextConfig = style.inputText;
        var inputText = CreateInputText(scene, inputTextConfig);

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