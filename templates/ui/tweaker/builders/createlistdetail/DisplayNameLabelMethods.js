import CreateTitleLabel from '../utils/CreateTitleLabel.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var GetDisplayNameStyle = function (style) {
    var displayNameStyle = GetValue(style, 'displayName');

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
