import CreateDropDownList from './utils/CreateDropDownList';
import { GetOption } from './utils/OptionsMethods';

var SetOptions = function(gameObject?: any, options?: any) {
    var list = gameObject.childrenMap.list;
    list.setOptions(options);
}

var SetListReadOnly = function(gameObject?: any, readOnly?: any) {
    if (readOnly === undefined) {
        readOnly = true;
    }

    var list = gameObject.childrenMap.list;
    if (readOnly?: any) {
        list.disableClick();
    } else {
        list.enableClick();
    }
}

export default {
    name: 'ListInput',

    accept(config?: any) {
        if (config.hasOwnProperty('view')) {
            return (config.view === 'list')
        }

        return (config.hasOwnProperty('options'));
    },

    // Callback after `constructor()`
    build(gameObject?: any, config?: any, inputRowStyle?: any, styles?: any) {
        var scene = gameObject.scene;

        gameObject.type = 'rexTweaker.ListInput';

        var list = CreateDropDownList(scene, inputRowStyle.list);

        gameObject.add(
            list,
            { proportion: 1, expand: true, key: 'list' }
        );

        list.on('button.click', function(dropDownList?: any, listPanel?: any, button?: any, index?: any, pointer?: any, event?: any) {
            gameObject.setValue(button.value);
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
        var list = gameObject.childrenMap.list;
        var option = GetOption(list.options, value);
        list
            .resetDisplayContent(option)
            .setMinSize(list.width, list.height)
            .layout()
            .setMinSize(0, 0);

    },

    setReadOnly(gameObject?: any, readOnly?: any) {
        if (readOnly === undefined) {
            readOnly = true;
        }

        SetListReadOnly(gameObject, readOnly);
    }
}