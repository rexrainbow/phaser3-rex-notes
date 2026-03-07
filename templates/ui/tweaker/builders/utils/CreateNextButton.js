import ButtonStyleBase from './ButtonStyleBase.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateNextButton = function (scene, config, style) {
    var nextButtonStyle = GetValue(style, 'nextButton');
    var nextLabel;

    if (nextButtonStyle) {
        // If using dedicated next-button style, keep its own display content config.
        nextButtonStyle = Object.assign(DeepClone(ButtonStyleBase), nextButtonStyle);
    } else {
        nextButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        nextLabel = GetValue(config, 'nextLabel', 'Next');
    }

    var nextButton = CreateLabel(scene, nextButtonStyle);
    if (nextLabel) {
        nextButton.resetDisplayContent(nextLabel);
    }

    return nextButton;
}

export default CreateNextButton;
