import ButtonStyleBase from './ButtonStyleBase.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var DefaultCallback = function () {
    return {};
}

var CreateAddButton = function (parent, config, style) {
    var createDefaultItem = GetValue(config, 'createDefaultItem', DefaultCallback);
    if (!createDefaultItem) {
        return null;
    }

    var scene = parent;

    var addButton;
    var addButtonStyle = style.addButton;
    if (addButtonStyle) {
        addButtonStyle = Object.assign(DeepClone(ButtonStyleBase), addButtonStyle);
        addButton = CreateLabel(scene, addButtonStyle);
    } else {
        addButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        addButton = CreateLabel(scene, addButtonStyle);
        addButton.resetDisplayContent(GetValue(config, 'addLabel', 'Add'));
    }

    addButton.createDefaultItem = GetValue(config, 'createDefaultItem', DefaultCallback);

    return addButton;
}

export default CreateAddButton;