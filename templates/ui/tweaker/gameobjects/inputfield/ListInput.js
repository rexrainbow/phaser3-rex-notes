import InputFiledBase from './InputFieldBase.js';
import CreateDropDownList from '../../../utils/build/CreateDropDownList.js';
import { GetOptionText, GetOptionValue } from '../../utils/OptionsMethods.js';


class ListInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.ListInput';

        var list = CreateDropDownList(scene, config.list);

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
        list.resetDisplayContent({ text: text });
        super.value = value;
    }

    setOptions(options) {
        this.childrenMap.list.setOptions(options);
        return this;
    }
}

export default ListInput;