import CreateButtons from '../builders/CreateButtons.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddButtons = function (config) {
    var scene = this.scene;

    if (config === undefined) {
        config = {};
    }

    if (config.hasOwnProperty('label')) {
        config.buttons = [{
            label: config.label,
            callback: config.callback
        }];
    }

    // Create buttons
    var buttonsStyle = GetValue(this.styles, 'inputRow') || {};
    var buttons = CreateButtons(scene, config, buttonsStyle);

    // Add buttons
    this.add(
        buttons,
        { expand: true }
    );

    return this;
}

export default AddButtons;