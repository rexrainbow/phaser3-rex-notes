import CreateButtons from './utils/CreateButtons.js';
import CreateInputText from './utils/CreateInputText.js';
import CreateLabel from './utils/CreateLabel.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

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

var SetButtonsReadOnly = function (gameObject, readOnly) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    var buttons = gameObject.childrenMap.buttons;
    buttons.setButtonEnable(!readOnly);
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
    build(gameObject, config, inputRowStyle, styles) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.IncDecInput';

        /*
        inputRow <-- buttons
        
        - incButton, inputText, decButton
        - inputText, incButton, decButton
        */

        var incDecConfig = GetValue(inputRowStyle, 'incDec') || {};
        var buttonConfigBase = { text: null, action: null };

        // buttons
        var buttons = CreateButtons(scene, {
            expand: false
        });
        var proportion = (inputRowStyle.defaultExpandWidth) ? 1 : 0;
        gameObject.add(
            buttons,
            { proportion: proportion, expand: true }
        );

        // inputText
        var inputTextConfig = inputRowStyle.inputNumber || inputRowStyle.inputText;
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

        gameObject.addChildrenMap('inputText', inputText);
        gameObject.addChildrenMap('incButton', incButton);
        gameObject.addChildrenMap('decButton', decButton);
        gameObject.addChildrenMap('buttons', buttons);
    },

    // Callback inside `setup()`
    setup(gameObject, config, setDefaults) {
        if (setDefaults || config.hasOwnProperty('inputTextReadOnly')) {
            SetInputTextReadOnly(gameObject, !!config.inputTextReadOnly, true);
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

    setReadOnly(gameObject, readOnly) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetInputTextReadOnly(gameObject, readOnly);
        SetButtonsReadOnly(gameObject, readOnly);
    }
}