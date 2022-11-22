import GetInputType from '../utils/inputs/GetInputType.js';
import CreateInputRow from '../builders/CreateInputRow.js';

var AddInput = function (object, key, config) {
    if (config === undefined) {
        config = {};
    }

    if (!config.title) {
        config.title = key;
    }

    config.view = GetInputType(object[key], config);

    // Create InputRow
    var inputSizer = CreateInputRow(this.scene, config, this.styles.inputRow);

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