import InputFiledBase from './InputFieldBase.js';
import CreateDropDownList from '../../../utils/build/CreateDropDownList.js';
import { GetOptionText } from '../../utils/OptionsMethods.js';


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
            this.setValue(button.value);
        }, this);

        this.setValueCallback = function (gameObject, value) {
            var text = GetOptionText(list.options, value);
            list.resetDisplayContent({ text: text });
        }

        this.setupCallback = function(gameObject, config) {
            gameObject.setOptions(config.options);
        }
    }

    setOptions(options) {
        this.childrenMap.list.setOptions(options);
        return this;
    }
}

export default ListInput;