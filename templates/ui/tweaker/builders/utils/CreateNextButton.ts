import ButtonStyleBase from './ButtonStyleBase';
import DeepClone from '../../../../../plugins/utils/object/DeepClone';
import CreateLabel from '../../../utils/build/CreateLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateNextButton = function(scene?: any, config?: any, style?: any) {
    var nextButtonStyle = GetValue(style, 'nextButton');
    var nextLabel;

    if (nextButtonStyle?: any) {
        // If using dedicated next-button style, keep its own display content config.
        nextButtonStyle = Object.assign(DeepClone(ButtonStyleBase), nextButtonStyle);
    } else {
        nextButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        nextLabel = GetValue(config, 'nextLabel', 'Next');
    }

    var nextButton = CreateLabel(scene, nextButtonStyle);
    if (nextLabel?: any) {
        nextButton.resetDisplayContent(nextLabel);
    }

    return nextButton;
}

export default CreateNextButton;