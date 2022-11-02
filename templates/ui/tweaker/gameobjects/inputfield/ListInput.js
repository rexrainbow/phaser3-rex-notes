import InputFiledBase from './InputFieldBase.js';
import BuildListConfig from '../utils/BuildListConfig.js';
import CreateList from '../utils/CreateList.js';
import SetLabelData from '../utils/SetLabelData.js';


class ListInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var sizerConfig = {
            orientation: 0, // x
        }
        super(scene, sizerConfig);
        this.type = 'rexTweaker.ListInput';

        var listConfig = BuildListConfig(scene, config.list);
        var list = CreateList(scene, listConfig);

        this.add(
            list,
            { proportion: 1, expand: true }
        );

        this.addChildrenMap('list', list);

        list.on('button.click', function (dropDownList, listPanel, button, index, pointer, event) {
            var value = GetOptionValue(list.options, button.text);
            this.setValue(value);
        }, this);

    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        var list = this.childrenMap.list;
        var text = GetOptionText(list.options, value);
        SetLabelData(list, { text: text });
        super.value = value;
    }

    setOptions(options) {
        this.childrenMap.list.setOptions(options);
        return this;
    }
}

var GetOptionText = function (options, value) {
    for (var i = 0, cnt = options.length; i < cnt; i++) {
        var option = options[i];
        if (option.value === value) {
            return option.text;
        }
    }
    return undefined;
}

var GetOptionValue = function (options, text) {
    for (var i = 0, cnt = options.length; i < cnt; i++) {
        var option = options[i];
        if (option.text === text) {
            return option.value;
        }
    }
    return undefined;
}

export default ListInput;