import ButtonStyleBase from './ButtonStyleBase.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateMoveDownButton = function (scene, config, style) {
    var moveDownButtonStyle = GetValue(style, 'moveDownButton');
    var moveDownLabel;

    if (moveDownButtonStyle) {
        // If using dedicated moveDown-button style, keep its own display content config.
        moveDownButtonStyle = Object.assign(DeepClone(ButtonStyleBase), moveDownButtonStyle);
    } else {
        moveDownButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        moveDownLabel = GetValue(config, 'moveDownLabel', 'Down');
    }

    var moveDownButton = CreateLabel(scene, moveDownButtonStyle);
    if (moveDownLabel) {
        moveDownButton.resetDisplayContent(moveDownLabel);
    }

    return moveDownButton;
}

export default CreateMoveDownButton;
