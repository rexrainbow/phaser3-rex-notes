import CreateButtons from '../builders/CreateButtons.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddButtons = function (config) {
    if (config === undefined) {
        config = {};
    }

    var scene = this.scene;

    var target = config.bindingTarget;
    delete config.bindingTarget;

    // Create buttons
    var buttonsStyle = GetValue(this.styles, 'inputRow') || {};
    var buttons = CreateButtons(this, config, buttonsStyle);

    // Add buttons
    this.add(
        buttons,
        {
            proportion: (buttons.minWidth === 0) ? 1 : 0,
            expand: true
        }
    );

    // Set binding target
    if (target) {
        buttons.setBindingTarget(target);
    }

    if (config.readOnly) {
        buttons.setReadOnly();
    }

    if (config.key) {
        this.root.addChildrenMap(config.key, buttons);
    }

    return this;
}

export default AddButtons;