import GetInputType from '../../utils/inputs/GetInputType.js';
import BuildInputSizer from './BuildInputSizer.js';
import BindObject from './BindObject.js';

var AddInput = function (object, key, config) {
    if (config === undefined) {
        config = {};
    }

    if (!config.title) {
        config.title = key;
    }

    config.view = GetInputType(object[key], config);

    // Create InputSizer
    config.addConfig = {
        expand: true
    };
    var inputSizer = BuildInputSizer.call(this, config);
    // Add InputSizer to Twealer
    this.add(inputSizer, config.addConfig);

    BindObject.call(this, inputSizer.getElement('input'), object, key);

    return this;
}

export default AddInput;