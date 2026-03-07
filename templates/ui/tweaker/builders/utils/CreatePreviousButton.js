import ButtonStyleBase from './ButtonStyleBase.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreatePreviousButton = function (scene, config, style) {
    var previousButtonStyle = GetValue(style, 'previousButton');
    var previousLabel;

    if (previousButtonStyle) {
        // If using dedicated previous-button style, keep its own display content config.
        previousButtonStyle = Object.assign(DeepClone(ButtonStyleBase), previousButtonStyle);
    } else {
        previousButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        previousLabel = GetValue(config, 'previousLabel', 'Previous');
    }

    var previousButton = CreateLabel(scene, previousButtonStyle);
    if (previousLabel) {
        previousButton.resetDisplayContent(previousLabel);
    }

    return previousButton;
}

export default CreatePreviousButton;
