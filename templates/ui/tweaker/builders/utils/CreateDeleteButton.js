import ButtonStyleBase from './ButtonStyleBase.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateDeleteButton = function (scene, config, style) {
    var deleteButtonStyle = GetValue(style, 'deleteButton');
    var deleteLabel;

    if (deleteButtonStyle) {
        // If using dedicated delete-button style, keep its own display content config.
        deleteButtonStyle = Object.assign(DeepClone(ButtonStyleBase), deleteButtonStyle);
    } else {
        deleteButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        deleteLabel = GetValue(config, 'deleteLabel', 'X');
    }

    var deleteButton = CreateLabel(scene, deleteButtonStyle);
    if (deleteLabel) {
        deleteButton.resetDisplayContent(deleteLabel);
    }

    return deleteButton;
}

export default CreateDeleteButton;
