import GetInputType from '../utils/inputs/GetInputType.js';

var AddInput = function (object, key, config) {
    if (config === undefined) {
        config = {};
    }

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

    // Set content
    inputSizer
        .setTitle(config)
        .setBindingTarget(object, key)

    return this;
}

export default AddInput;