import InputFiledBase from './InputFieldBase.js';
import BuildLabelConfig from '../utils/BuildLabelConfig.js';
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

        var dropDownListConfig = BuildLabelConfig(scene, config.label);
        dropDownListConfig.list = {

        }
        var list = CreateList(scene, dropDownListConfig);

        this.add(
            list,
            { proportion: 1, expand: true }
        );

        this.addChildrenMap('list', list);

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

export default ListInput;