import CreateButtons from './utils/CreateButtons.js';
import CreateInputText from './utils/CreateInputText.js';
import CreateLabel from './utils/CreateLabel.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SetInputTextReadOnly = function (gameObject, enable) {
    if (enable === undefined) {
        enable = true;
    }

    var inputText = gameObject.childrenMap.inputText;
    inputText.setReadOnly(enable);
}

export default {
    name: 'RangeInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'incdec')
        }

        return false;
    },

    // Callback after `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.IncDecInput';

        /*
        inputRow <-- buttons
        
        - incButton, inputText, decButton
        - inputText, incButton, decButton
        */

        var incDecConfig = GetValue(style, 'incDec') || {};
        var buttonConfigBase = { text: null, action: null };

        // buttons
        var buttons = CreateButtons(scene, {
            expand: false
        });
        var proportion = (style.defaultExpandWidth) ? 1 : 0;
        gameObject.add(
            buttons,
            { proportion: proportion, expand: true }
        );

        // inputText
        var inputTextConfig = style.inputNumber || style.inputText;
        var inputText = CreateInputText(scene, inputTextConfig)
            .setNumberInput();

        inputText.on('close', function () {
            gameObject.setValue(inputText.value);
        });

        // incButton
        var incButtonConfig = Object.assign(DeepClone(buttonConfigBase), (incDecConfig.incButton || {}));
        var incButton = CreateLabel(scene, incButtonConfig);

        // decButton
        var decButtonConfig = Object.assign(DeepClone(buttonConfigBase), (incDecConfig.decButton || {}));
        var decButton = CreateLabel(scene, decButtonConfig);

        // inputTextIndex
        buttons.addButton(incButton);
        buttons.addButton(decButton);

        var inputTextIndex = incDecConfig.inputTextIndex || 0;
        buttons.insert(
            inputTextIndex, inputText,
            { proportion: 1, expand: true }
        );

        gameObject.step = 1;
        gameObject.minValue = undefined;
        gameObject.maxValue = undefined;
        buttons.on('button.click', function (button, index, pointer, event) {
            var value = gameObject.value;
            if (index === 0) { // inc
                value += gameObject.step;
            } else { // dec
                value -= gameObject.step;
            }
            if ((gameObject.maxValue !== undefined) && (value > gameObject.maxValue)) {
                value = gameObject.maxValue;
            }
            if ((gameObject.minValue !== undefined) && (value < gameObject.minValue)) {
                value = gameObject.minValue;
            }
            gameObject.setValue(value);
        });

        gameObject.addChildrenMap('incButton', incButton);
        gameObject.addChildrenMap('decButton', decButton);
        gameObject.addChildrenMap('inputText', inputText);
    },

    // Callback inside `setup()`
    setup(gameObject, config, setDefaults) {
        if (setDefaults || config.hasOwnProperty('inputTextReadOnly')) {
            SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly);
        }

        if (setDefaults || config.hasOwnProperty('step')) {
            gameObject.step = (config.hasOwnProperty('step')) ? config.step : 1;
        }
        if (setDefaults || config.hasOwnProperty('min')) {
            gameObject.minValue = config.min;
        }
        if (setDefaults || config.hasOwnProperty('max')) {
            gameObject.maxValue = config.max;
        }
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var inputText = gameObject.childrenMap.inputText;
        inputText.setText('').setText(gameObject.getFotmatText(value));

    },
}