import ButtonStyleBase from './ButtonStyleBase';
import DeepClone from '../../../../../plugins/utils/object/DeepClone';
import CreateLabel from '../../../utils/build/CreateLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateResetButton = function(scene?: any, config?: any, style?: any) {
    var resetButtonStyle = GetValue(style, 'resetButton');
    var resetLabel;

    if (resetButtonStyle?: any) {
        // If using dedicated reset-button style, keep its own display content config.
        resetButtonStyle = Object.assign(DeepClone(ButtonStyleBase), resetButtonStyle);
    } else {
        resetButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        resetLabel = GetValue(config, 'resetLabel', 'Reset');
    }

    var resetButton = CreateLabel(scene, resetButtonStyle);
    if (resetLabel?: any) {
        resetButton.resetDisplayContent(resetLabel);
    }

    return resetButton;
}

export default CreateResetButton;