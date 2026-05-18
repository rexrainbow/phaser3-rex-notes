import ButtonStyleBase from './ButtonStyleBase';
import DeepClone from '../../../../../plugins/utils/object/DeepClone';
import CreateLabel from '../../../utils/build/CreateLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateDeleteButton = function(scene?: any, config?: any, style?: any) {
    var deleteButtonStyle = GetValue(style, 'deleteButton');
    var deleteLabel;

    if (deleteButtonStyle?: any) {
        // If using dedicated delete-button style, keep its own display content config.
        deleteButtonStyle = Object.assign(DeepClone(ButtonStyleBase), deleteButtonStyle);
    } else {
        deleteButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        deleteLabel = GetValue(config, 'deleteLabel', 'X');
    }

    var deleteButton = CreateLabel(scene, deleteButtonStyle);
    if (deleteLabel?: any) {
        deleteButton.resetDisplayContent(deleteLabel);
    }

    return deleteButton;
}

export default CreateDeleteButton;