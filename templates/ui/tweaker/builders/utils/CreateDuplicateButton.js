import ButtonStyleBase from './ButtonStyleBase.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateDuplicateButton = function (scene, config, style) {
    var duplicateButtonStyle = GetValue(style, 'duplicateButton');
    var duplicateLabel;

    if (duplicateButtonStyle) {
        // If using dedicated duplicate-button style, keep its own display content config.
        duplicateButtonStyle = Object.assign(DeepClone(ButtonStyleBase), duplicateButtonStyle);
    } else {
        duplicateButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        duplicateLabel = GetValue(config, 'duplicateLabel', 'Duplicate');
    }

    var duplicateButton = CreateLabel(scene, duplicateButtonStyle);
    if (duplicateLabel) {
        duplicateButton.resetDisplayContent(duplicateLabel);
    }

    return duplicateButton;
}

export default CreateDuplicateButton;
