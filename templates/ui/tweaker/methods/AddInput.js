import GetInputType from '../utils/inputs/GetInputType.js';

var AddInput = function (object, key, config) {
    if (config === undefined) {
        config = {};
    }

    if (!config.title) {
        config.title = key;
    }

    config.view = GetInputType(object[key], config);

    var inputSizer = this.make('inputSizer', config);

    //TODO: Add title and input

    this.add(
        inputSizer
    )

    return this;
}

export default AddInput;