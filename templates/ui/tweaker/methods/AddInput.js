import GetInputType from '../utils/inputs/GetInputType.js';
import CreateInputRow from '../builders/CreateInputRow.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddInput = function (object, key, config) {
    if (config === undefined) {
        config = {};
    }

    if (!config.title) {
        config.title = key;
    }

    config.view = GetInputType(object[key], config);

    // Create InputRow
    var inputRowStyle = GetValue(this.styles, 'inputRow');
    var inputSizer = CreateInputRow(this.scene, config, inputRowStyle);

    // Add InputRow to Tweaker
    this.add(
        inputSizer,
        { expand: true }
    );

    // Bind target
    inputSizer.setBindingTarget(object, key)

    return this;
}

export default AddInput;