import CreateButtons from './utils/CreateButtons.js';
import CreateLabel from './utils/CreateLabel.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import { GetOptionIndex } from './utils/OptionsMethods.js';
import SetButtonsActiveStateByIndex from './utils/SetButtonsActiveState.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SetOptions = function (gameObject, options) {
    var list = gameObject.childrenMap.list;
    list.options = options;

    var scene = gameObject.scene;
    var buttonConfig = list.buttonConfig;
    list.clearButtons(true);
    for (var i = 0, cnt = options.length; i < cnt; i++) {
        var option = options[i];
        var button = CreateLabel(scene, buttonConfig)
            .setActiveState(false)
            .resetDisplayContent({ text: option.text })

        list.addButton(button);
    }
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
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.ButtonsInput';

        // TODO : DeepClone?
        var buttonConfig = (style.button) ? DeepClone(style.button) : {};
        var buttonExpand = GetValue(buttonConfig, 'expand', true);
        if (buttonExpand) {
            buttonConfig.align = 'center';
        }
        delete buttonConfig.expand;

        var list = CreateButtons(scene, {
            expand: buttonExpand
        });
        list.buttonConfig = buttonConfig;

        gameObject.add(
            list,
            { proportion: 1, expand: true, key: 'list' }
        );

        list.on('button.click', function (button, index, pointer, event) {
            var option = list.options[index];
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
        var list = gameObject.childrenMap.list;
        var index = gameObject._selectedIndex;  // See list's 'button.click' event
        if (index === undefined) {
            index = GetOptionIndex(list.options, value);
        }
        SetButtonsActiveStateByIndex(list.childrenMap.buttons, index);
    },
}