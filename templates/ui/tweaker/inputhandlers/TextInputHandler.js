import CreateInputText from './utils/CreateInputText.js';

var SetInputTextReadOnly = function (gameObject, enable) {
    if (enable === undefined) {
        enable = true;
    }

    var inputText = gameObject.getElement('inputText');
    inputText.setReadOnly(enable);
}

export default {
    name: 'TextInput',

    accept(config, value) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'string')
        }

        return typeof (value) === 'string';
    },

    // Callback inside `constructor()`
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
    setup(gameObject, config) {
        SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly);
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var inputText = gameObject.getElement('inputText');
        inputText.setText(gameObject.getFotmatText(value));
    },

}