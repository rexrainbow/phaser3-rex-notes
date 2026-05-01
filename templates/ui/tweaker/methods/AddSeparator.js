import CreateSeparator from '../builders/CreateSeparator.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var AddSeparator = function (config) {
    if (config === undefined) {
        config = {};
    }

    // Create separator
    var separatorStyle = GetValue(this.styles, 'separator');
    var separator = CreateSeparator(this, config, separatorStyle);

    // Add separator
    this.add(
        separator,
        { expand: true }
    );

    return this;
}

export default AddSeparator;