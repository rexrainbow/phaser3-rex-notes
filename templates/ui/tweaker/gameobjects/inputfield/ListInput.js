import InputFiledBase from './InputFieldBase.js';
import BuildLabelConfig from '../utils/BuildLabelConfig.js';
import CreateLabel from '../utils/CreateLabel.js';
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

        var self = this;

        var listConfig = config.list || {};
        var labelConfig = listConfig.label || listConfig.button;
        var listButtonConfig = listConfig.button || listConfig.label ;
        var dropDownListConfig = BuildLabelConfig(scene, labelConfig);
        dropDownListConfig.list = {
            createButtonCallback(scene, option) {
                var gameObject = CreateLabel(scene, listButtonConfig);
                SetLabelData(gameObject, { text: option.text });
                gameObject.value = option.value;
                return gameObject;
            },
            onButtonClick(gameObject) {
                self.setValue(gameObject.value);
            }
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