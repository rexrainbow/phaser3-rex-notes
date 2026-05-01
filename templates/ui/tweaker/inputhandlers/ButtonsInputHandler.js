import CreateButtons from './utils/CreateButtons.js';
import CreateLabel from './utils/CreateLabel.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import { GetOptionIndex } from './utils/OptionsMethods.js';
import SetButtonsActiveStateByIndex from './utils/SetButtonsActiveState.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var SetOptions = function (gameObject, options) {
    var buttons = gameObject.childrenMap.buttons;
    buttons.options = options;

    var scene = gameObject.scene;
    var buttonConfig = buttons.buttonConfig;
    buttons.clearButtons(true);
    for (var i = 0, cnt = options.length; i < cnt; i++) {
        var option = options[i];
        var button = CreateLabel(scene, buttonConfig)
            .setActiveState(false)
            .resetDisplayContent({ text: option.text })

        buttons.addButton(button);
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
    name: 'ButtonsInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'buttons')
        }

        return false;
    },

    // Callback after `constructor()`
    build(gameObject, config, inputRowStyle, styles) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.ButtonsInput';

        // TODO : DeepClone?
        var buttonConfig = (inputRowStyle.button) ? DeepClone(inputRowStyle.button) : {};
        var buttonExpand = GetValue(buttonConfig, 'expand', true);
        if (buttonExpand) {
            buttonConfig.align = 'center';
        }
        delete buttonConfig.expand;

        var buttons = CreateButtons(scene, {
            expand: buttonExpand
        });
        buttons.buttonConfig = buttonConfig;

        gameObject.add(
            buttons,
            { proportion: 1, expand: true, key: 'buttons' }
        );

        buttons.on('button.click', function (button, index, pointer, event) {
            var option = buttons.options[index];
            if (!option) {
                return;  // ??
            }
            gameObject._selectedIndex = index;
            gameObject.setValue(option.value);
            gameObject._selectedIndex = undefined;
        });
    },

    // Callback inside `setup()`
    setup(gameObject, config, setDefaults) {
        if (setDefaults || config.hasOwnProperty('options')) {
            SetOptions(gameObject, config.options);
        }
    },

    // Callback inside `setValue()`
    displayValue(gameObject, value) {
        var buttons = gameObject.childrenMap.buttons;
        var index = gameObject._selectedIndex;  // See buttons's 'button.click' event
        if (index === undefined) {
            index = GetOptionIndex(buttons.options, value);
        }
        SetButtonsActiveStateByIndex(buttons.childrenMap.buttons, index);
    },

    setReadOnly(gameObject, readOnly) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetButtonsReadOnly(gameObject, readOnly);
    }
}