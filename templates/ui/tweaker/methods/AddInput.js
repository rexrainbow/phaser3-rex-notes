import GetInputType from '../utils/inputs/GetInputType.js';

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
    var inputSizer = this.make('inputSizer', config);
    var inputSizerAddConfig = config.addConfig;

    // Create InputTitle, add to InputSizer
    config.addConfig = {
        proportion: 1,
    };
    var inputTitle = this.make('inputTitle', config);
    var inputTitleAddConfig = config.addConfig;
    inputSizer.add(inputTitle, inputTitleAddConfig);

    //TODO: Add input

    // Add InputSizer to Twealer
    this.add(inputSizer, inputSizerAddConfig);

    return this;
}

export default AddInput;