import ButtonStyleBase from './ButtonStyleBase';
import DeepClone from '../../../../../plugins/utils/object/DeepClone';
import CreateLabel from '../../../utils/build/CreateLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateMoveUpButton = function(scene?: any, config?: any, style?: any) {
    var moveUpButtonStyle = GetValue(style, 'moveUpButton');
    var moveUpLabel;

    if (moveUpButtonStyle?: any) {
        // If using dedicated moveUp-button style, keep its own display content config.
        moveUpButtonStyle = Object.assign(DeepClone(ButtonStyleBase), moveUpButtonStyle);
    } else {
        moveUpButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        moveUpLabel = GetValue(config, 'moveUpLabel', 'Up');
    }

    var moveUpButton = CreateLabel(scene, moveUpButtonStyle);
    if (moveUpLabel?: any) {
        moveUpButton.resetDisplayContent(moveUpLabel);
    }

    return moveUpButton;
}

export default CreateMoveUpButton;