import CreateInputRow from '../builders/CreateInputRow.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddInput = function (target, bindingKey, config) {
    if (arguments.length === 1) {
        config = target;
        target = config.bindingTarget;
        bindingKey = config.bindingKey;
    } else {
        if (config === undefined) {
            config = {};
        }
        config.bindingTarget = target;
        config.bindingKey = bindingKey;
    }

    if (!config.title) {
        config.title = bindingKey;
    }

    config.value = GetValue(target, bindingKey, undefined);

    // Create InputRow
    var inputRowStyle = this.styles.inputRow || {};

    if (!this.isWrapMode) {
        inputRowStyle.defaultExpandWidth = (this.styles.orientation === 1);
    } else {
        inputRowStyle.defaultExpandWidth = true;
    }

    var inputSizer = CreateInputRow.call(this, this.scene, config, inputRowStyle);
    if (!inputSizer) {
        // Can't create inputField
        console.error(`[Tweaker] Can't add Input
    title: ${config.title}
    view: ${config.view}
`);

        return this;
    }

    // Add InputRow to Tweaker
    if (!this.isWrapMode) {
        var proportion;
        if (this.orientation === 1) { // y
            proportion = 0;
        } else { // x
            proportion = (this.itemWidth > 0) ? 0 : 1;

            if (inputSizer.minWidth === 0) {
                inputSizer.setMinWidth(this.itemWidth);
            }
        }

        if (inputSizer.minHeight === 0) {
            inputSizer.setMinHeight(this.itemHeight);
        }

        this.add(
            inputSizer,
            { proportion: proportion, expand: true }
        );

    } else {
        inputSizer.setMinWidth(this.itemWidth);
        inputSizer.setMinHeight(this.itemHeight);
        this.add(inputSizer);

    }


    if (config.onValueChange) {
        var inputField = inputSizer.childrenMap.inputField;
        inputField.on('valuechange', config.onValueChange);
    }

    // Bind target
    inputSizer.setAutoUpdateEnable(config.autoUpdate);
    inputSizer.setBindingTarget(target, bindingKey);

    if (config.monitor) {
        inputSizer.startMonitorTarget();
    }

    if (config.key) {
        this.root.addChildrenMap(config.key, inputSizer);
    }

    return this;
}

export default AddInput;