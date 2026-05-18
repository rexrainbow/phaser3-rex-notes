import CreateInputTextArea from './utils/CreateInputTextArea';

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
    name: 'TextAreaInput',

    accept(config?: any) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'textarea')
        }

        return false;
    },

    // Callback after `constructor()`
    build(gameObject?: any, config?: any, inputRowStyle?: any, styles?: any) {
        var scene = gameObject.scene;

        this.type = 'rexTweaker.TextAreaInput';

        var inputTextAreaConfig = inputRowStyle.inputTextArea;
        if (inputTextAreaConfig === undefined) {
            inputTextAreaConfig = {};
        }
        if (!inputTextAreaConfig.hasOwnProperty('text')) {
            inputTextAreaConfig.text = inputRowStyle.inputText;
        }
        if (!inputTextAreaConfig.hasOwnProperty('slider')) {
            inputTextAreaConfig.slider = inputRowStyle.slider;
        }

        var inputText = CreateInputTextArea(scene, inputTextAreaConfig);

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
            SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly);
        }
    },

    // Callback inside `setValue()`
    displayValue(gameObject?: any, value?: any) {
        var inputText = gameObject.childrenMap.inputText;
        inputText.setText(gameObject.getFotmatText(value));
    },

    // Callback inside `setBindingTarget()`
    onBindTarget(gameObject?: any) {
        var inputText = gameObject.childrenMap.inputText;
        inputText.scrollToTop();
    },

    setReadOnly(gameObject?: any, readOnly?: any) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetInputTextReadOnly(gameObject, readOnly);
    }
}