import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var DefaultCallback = function () {
    return {};
}

var CreateAddButton = function (parent, config, style) {
    var scene = parent;

    var addButtonStyle = GetValue(style, 'add');
    if (!addButtonStyle) {
        addButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
    }
    var addItemLabel = GetValue(config, 'addLabel', 'Add');

    var addButton = CreateLabel(scene, addButtonStyle);
    addButton.resetDisplayContent(addItemLabel);
    addButton.createDefaultItem = GetValue(config, 'createDefaultItem', DefaultCallback);

    return addButton;
}

export default CreateAddButton;