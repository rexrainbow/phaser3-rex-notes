import ButtonStyleBase from './ButtonStyleBase';
import DeepClone from '../../../../../plugins/utils/object/DeepClone';
import CreateLabel from '../../../utils/build/CreateLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreatePreviousButton = function(scene?: any, config?: any, style?: any) {
    var previousButtonStyle = GetValue(style, 'previousButton');
    var previousLabel;

    if (previousButtonStyle?: any) {
        // If using dedicated previous-button style, keep its own display content config.
        previousButtonStyle = Object.assign(DeepClone(ButtonStyleBase), previousButtonStyle);
    } else {
        previousButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        previousLabel = GetValue(config, 'previousLabel', 'Previous');
    }

    var previousButton = CreateLabel(scene, previousButtonStyle);
    if (previousLabel?: any) {
        previousButton.resetDisplayContent(previousLabel);
    }

    return previousButton;
}

export default CreatePreviousButton;