import CreateTitleLabel from '../utils/CreateTitleLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var GetDisplayNameStyle = function(style?: any) {
    var displayNameStyle = GetValue(style, 'displayName');

    if (!displayNameStyle) {
        displayNameStyle = GetValue(style, 'tweaker.inputRow.title') || {};
    }

    return displayNameStyle;
}

var GetDisplayNameLabelCallback = function(config?: any) {
    var displayNameLabelCallback = GetValue(config, 'displayNameLabel');
    if (!displayNameLabelCallback) {
        displayNameLabelCallback = function(index?: any, item?: any, items?: any) {
            return { text: '' };  // Display nothing
        }
    }

    return displayNameLabelCallback;
}

var CreateDisplayNameLabel = function(scene?: any, style?: any) {
    return CreateTitleLabel(scene, undefined, style);
}

export {
    GetDisplayNameStyle,
    GetDisplayNameLabelCallback,
    CreateDisplayNameLabel,
}