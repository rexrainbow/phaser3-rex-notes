var BuildInputSizer = function (config) {
    // Save config.addConfig
    var addConfigSave = config.addConfig;

    // Create InputSizer   
    var inputSizer = this.make('inputSizer', config);

    // Create InputTitle, add to InputSizer
    config.addConfig = {
        proportion: 1,
    };
    var inputTitle = this.make('inputTitle', config);
    inputSizer.add(inputTitle, config.addConfig);

    // Create InputField, add to InputSizer
    config.addConfig = {
        proportion: 1,
        expand: true,
    };
    var inputField = this.make('inputField', config);
    inputSizer.add(inputField, config.addConfig);

    // Set children map
    inputSizer.addChildrenMap('title', inputTitle);
    inputSizer.addChildrenMap('input', inputField);

    // Restore config.addConfig
    config.addConfig = addConfigSave;

    return inputSizer;
}

export default BuildInputSizer;