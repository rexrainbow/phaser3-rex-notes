import ButtonStyleBase from './ButtonStyleBase.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateResetButton = function (scene, config, style) {
    var resetButtonStyle = GetValue(style, 'resetButton');
    var resetLabel;

    if (resetButtonStyle) {
        // If using dedicated reset-button style, keep its own display content config.
        resetButtonStyle = Object.assign(DeepClone(ButtonStyleBase), resetButtonStyle);
    } else {
        resetButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        resetLabel = GetValue(config, 'resetLabel', 'Reset');
    }

    var resetButton = CreateLabel(scene, resetButtonStyle);
    if (resetLabel) {
        resetButton.resetDisplayContent(resetLabel);
    }

    return resetButton;
}

export default CreateResetButton;
