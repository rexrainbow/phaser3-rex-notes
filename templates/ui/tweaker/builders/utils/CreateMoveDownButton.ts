import ButtonStyleBase from './ButtonStyleBase';
import DeepClone from '../../../../../plugins/utils/object/DeepClone';
import CreateLabel from '../../../utils/build/CreateLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateMoveDownButton = function(scene?: any, config?: any, style?: any) {
    var moveDownButtonStyle = GetValue(style, 'moveDownButton');
    var moveDownLabel;

    if (moveDownButtonStyle?: any) {
        // If using dedicated moveDown-button style, keep its own display content config.
        moveDownButtonStyle = Object.assign(DeepClone(ButtonStyleBase), moveDownButtonStyle);
    } else {
        moveDownButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        moveDownLabel = GetValue(config, 'moveDownLabel', 'Down');
    }

    var moveDownButton = CreateLabel(scene, moveDownButtonStyle);
    if (moveDownLabel?: any) {
        moveDownButton.resetDisplayContent(moveDownLabel);
    }

    return moveDownButton;
}

export default CreateMoveDownButton;