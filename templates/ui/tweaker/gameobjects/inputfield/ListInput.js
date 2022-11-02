import InputFiledBase from './InputFieldBase.js';
import BuildListConfig from '../utils/BuildListConfig.js';
import CreateList from '../utils/CreateList.js';
import SetLabelData from '../utils/SetLabelData.js';
import { GetOptionText, GetOptionValue } from '../../utils/OptionsMethods.js';


class ListInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
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

export default ListInput;