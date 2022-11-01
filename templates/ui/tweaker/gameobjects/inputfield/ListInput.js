import InputFiledBase from './InputFieldBase.js';
import CreateList from '../utils/CreateList.js';

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

        var dropDownListConfig = config.dropDownList;
        var dropDownList = CreateList(scene, dropDownListConfig);

        this.add(
            dropDownList,
            { proportion: 1, expand: true }
        );

        this.addChildrenMap('list', dropDownList);

    }

    setOptions(options) {
        this.childrenMap.list.setOptions(options);
        return this;
    }
}

export default ListInput;