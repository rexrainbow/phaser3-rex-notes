import CreateInputRow from '../builders/CreateInputRow.js';

var AddInput = function (object, key, config) {
    if (arguments.length === 1) {
        config = object;
        object = config.bindingTarget;
        key = config.bindingKey;
    } else {
        if (config === undefined) {
            config = {};
        }
        config.bindingTarget = object;
        config.bindingKey = key;
    }

    if (!config.title) {
        config.title = key;
    }

    if (config.bindingTarget && config.bindingKey) {
        config.value = config.bindingTarget[config.bindingKey];
    } else {
        config.value = undefined;
    }

    // Create InputRow
    var inputRowStyle = this.styles.inputRow || {};
    inputRowStyle.parentOrientation = this.styles.orientation;
    var inputSizer = CreateInputRow.call(this, this.scene, config, inputRowStyle);
    if (!inputSizer) {
        // Can't create inputField
        console.error(`[Tweaker] Can't add Input
    title: ${config.title}
    view: ${config.view}
`);

        return this;
    }

    var inputField = inputSizer.childrenMap.inputField;

    var proportion;
    if (this.orientation === 1) { // y
        proportion = 0;
    } else { // x
        proportion = (this.itemWidth > 0) ? 0 : 1;
        inputSizer.setMinWidth(this.itemWidth);
    }

    // Add InputRow to Tweaker
    this.add(
        inputSizer,
        { proportion: proportion, expand: true }
    );

    if (config.onValueChange) {
        inputField.on('valuechange', config.onValueChange);
    }

    // Bind target
    inputSizer.setAutoUpdateEnable(config.autoUpdate);
    inputSizer.setBindingTarget(object, key);

    if (config.monitor) {
        inputSizer.startMonitorTarget();
    }

    if (config.key) {
        this.root.addChildrenMap(config.key, inputSizer);
    }

    return this;
}

export default AddInput;