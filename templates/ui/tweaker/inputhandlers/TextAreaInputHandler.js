import CreateInputTextArea from './utils/CreateInputTextArea.js';

var SetInputTextReadOnly = function (gameObject, enable) {
    if (enable === undefined) {
        enable = true;
    }

    var inputText = gameObject.childrenMap.inputText;
    inputText.setReadOnly(enable);
}

export default {
    name: 'TextAreaInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'textarea')
        }

        return false;
    },

    // Callback after `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        this.type = 'rexTweaker.TextAreaInput';

        var inputTextAreaConfig = style.inputTextArea;
        if (inputTextAreaConfig === undefined) {
            inputTextAreaConfig = {};
        }
        if (!inputTextAreaConfig.hasOwnProperty('text')) {
            inputTextAreaConfig.text = style.inputText;
        }
        if (!inputTextAreaConfig.hasOwnProperty('slider')) {
            inputTextAreaConfig.slider = style.slider;
        }

        var inputText = CreateInputTextArea(scene, inputTextAreaConfig);

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
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var inputText = gameObject.childrenMap.inputText;
        inputText.setText(gameObject.getFotmatText(value));
    },

    // Callback inside `setBindingTarget()`
    onBindTarget(gameObject) {
        var inputText = gameObject.childrenMap.inputText;
        inputText.scrollToTop();
    },

}