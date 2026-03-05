import ButtonStyleBase from './ButtonStyleBase.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateMoveUpButton = function (scene, config, style) {
    var moveUpButtonStyle = GetValue(style, 'moveUpButton');
    var moveUpLabel;

    if (moveUpButtonStyle) {
        // If using dedicated moveUp-button style, keep its own display content config.
        moveUpButtonStyle = Object.assign(DeepClone(ButtonStyleBase), moveUpButtonStyle);
    } else {
        moveUpButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        moveUpLabel = GetValue(config, 'moveUpLabel', 'Up');
    }

    var moveUpButton = CreateLabel(scene, moveUpButtonStyle);
    if (moveUpLabel) {
        moveUpButton.resetDisplayContent(moveUpLabel);
    }

    return moveUpButton;
}

export default CreateMoveUpButton;
