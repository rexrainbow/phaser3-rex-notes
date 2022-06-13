import GetInputType from '../utils/inputs/GetInputType.js';
import CreateInputItem from '../utils/inputs/CreateInputItem.js';

var AddInput = function (object, key, config) {
    if (config === undefined) {
        config = {};
    }

    if (!config.title) {
        config.title = key;
    }

    config.view = GetInputType(object[key], config);

    this.add(
        CreateInputItem(this.maker, config)
    )

    return this;
}

export default AddInput;