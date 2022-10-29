import GetInputType from '../utils/inputs/GetInputType.js';

var AddInput = function (object, key, config) {
    if (config === undefined) {
        config = {};
    }

    config.target = object;
    config.targetKey = key;

    if (!config.title) {
        config.title = key;
    }

    config.view = GetInputType(object[key], config);

    // Create InputRow
    var inputSizer = this.make('inputRow', config, 'inputRow');

    // Add InputRow to Tweaker
    this.add(
        inputSizer,
        { expand: true }
    );

    return this;
}

export default AddInput;