import CreateDropDownList from './utils/CreateDropDownList.js';
import { GetOption } from './utils/OptionsMethods.js';

var SetOptions = function (gameObject, options) {
    var list = gameObject.childrenMap.list;
    list.setOptions(options);
}

export default {
    name: 'ListInput',

    accept(config) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'list')
        }

        return (config.hasOwnProperty('options'));
    },

    // Callback after `constructor()`
    build(gameObject, style) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.ListInput';

        var list = CreateDropDownList(scene, style.list);

        gameObject.add(
            list,
            { proportion: 1, expand: true, key: 'list' }
        );

        list.on('button.click', function (dropDownList, listPanel, button, index, pointer, event) {
            gameObject.setValue(button.value);
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
        var option = GetOption(list.options, value);
        list
            .resetDisplayContent(option)
            .setMinSize(list.width, list.height)
            .layout()
            .setMinSize(0, 0);

    },
}