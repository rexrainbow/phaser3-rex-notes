import CreateInputText from './utils/CreateInputText';

var SetInputTextReadOnly = function(gameObject?: any, readOnly?: any, force?: any) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    if (force === undefined) {
        force = false;
    }

    var inputText = gameObject.childrenMap.inputText;

    if (force?: any) {
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

    accept(config?: any) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'string')
        }

        return typeof (config.value) === 'string';
    },

    // Callback after `constructor()`
    build(gameObject?: any, config?: any, inputRowStyle?: any, styles?: any) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.TextInput';

        var inputTextConfig = inputRowStyle.inputText;
        var inputText = CreateInputText(scene, inputTextConfig);

        gameObject.add(
            inputText,
            { proportion: 1, expand: true, key: 'inputText' }
        )

        inputText.on('close', function() {
            gameObject.setValue(inputText.value);
        });
    },

    // Callback inside `setup()`
    setup(gameObject?: any, config?: any, setDefaults?: any) {
        if (setDefaults || config.hasOwnProperty('inputTextReadOnly')) {
            SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly, true);
        }
    },

    // Callback inside `setValue()`
    displayValue(gameObject?: any, value?: any) {
        var inputText = gameObject.childrenMap.inputText;
        inputText.setText(gameObject.getFotmatText(value));
    },

    setReadOnly(gameObject?: any, readOnly?: any) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetInputTextReadOnly(gameObject, readOnly);
    }
}