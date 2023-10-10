var AddButton = function (config) {
    if (config === undefined) {
        config = {};
    }

    config.buttons = [{
        label: config.label,
        callback: config.callback
    }];
    delete config.label;
    delete config.callback;

    this.addButtons(config);
    return this;
}

export default AddButton;