import CreateSeparator from '../builders/CreateSeparator.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddSeparator = function (config) {
    if (config === undefined) {
        config = {};
    }

    var scene = this.scene;

    // Create separator
    var separatorStyle = GetValue(this.styles, 'separator');
    var separator = CreateSeparator(scene, config, separatorStyle);

    // Add separator
    this.add(
        separator,
        { expand: true }
    );

    return this;
}

export default AddSeparator;