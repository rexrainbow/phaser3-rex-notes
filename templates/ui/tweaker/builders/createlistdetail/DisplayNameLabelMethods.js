import CreateTitleLabel from '../utils/CreateTitleLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var GetDisplayNameStyle = function (style, altStyle) {
    var displayNameStyle = GetValue(style, 'displayName');

    if (!displayNameStyle && altStyle) {
        displayNameStyle = GetValue(altStyle, 'displayName');
    }

    if (!displayNameStyle) {
        displayNameStyle = GetValue(style, 'tweaker.inputRow.title') || {};
    }

    return displayNameStyle;
}

var GetDisplayNameLabelCallback = function (config) {
    var displayNameLabelCallback = GetValue(config, 'displayNameLabel');
    if (!displayNameLabelCallback) {
        displayNameLabelCallback = function (index, item, items) {
            return { text: '' };  // Display nothing
        }
    }

    return displayNameLabelCallback;
}

var CreateDisplayNameLabel = function (scene, style) {
    return CreateTitleLabel(scene, undefined, style);
}

export {
    GetDisplayNameStyle,
    GetDisplayNameLabelCallback,
    CreateDisplayNameLabel,
}
