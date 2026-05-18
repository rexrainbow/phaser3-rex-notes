import CreateButtons from './utils/CreateButtons';
import CreateLabel from './utils/CreateLabel';
import DeepClone from '../../../../plugins/utils/object/DeepClone';
import { GetOptionIndex } from './utils/OptionsMethods';
import SetButtonsActiveStateByIndex from './utils/SetButtonsActiveState';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var SetOptions = function(gameObject?: any, options?: any) {
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

var SetButtonsReadOnly = function(gameObject?: any, readOnly?: any) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    var buttons = gameObject.childrenMap.buttons;
    buttons.setButtonEnable(!readOnly);
}

export default {
    name: 'ButtonsInput',

    accept(config?: any) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'buttons')
        }

        return false;
    },

    // Callback after `constructor()`
    build(gameObject?: any, config?: any, inputRowStyle?: any, styles?: any) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.ButtonsInput';

        // TODO : DeepClone?
        var buttonConfig = (inputRowStyle.button) ? DeepClone(inputRowStyle.button) : {};
        var buttonExpand = GetValue(buttonConfig, 'expand', true);
        if (buttonExpand?: any) {
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

        buttons.on('button.click', function(button?: any, index?: any, pointer?: any, event?: any) {
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
    setup(gameObject?: any, config?: any, setDefaults?: any) {
        if (setDefaults || config.hasOwnProperty('options')) {
            SetOptions(gameObject, config.options);
        }
    },

    // Callback inside `setValue()`
    displayValue(gameObject?: any, value?: any) {
        var buttons = gameObject.childrenMap.buttons;
        var index = gameObject._selectedIndex;  // See buttons's 'button.click' event
        if (index === undefined) {
            index = GetOptionIndex(buttons.options, value);
        }
        SetButtonsActiveStateByIndex(buttons.childrenMap.buttons, index);
    },

    setReadOnly(gameObject?: any, readOnly?: any) {
        if (readOnly === undefined) {
            readOnly = true;
        }
        SetButtonsReadOnly(gameObject, readOnly);
    }
}