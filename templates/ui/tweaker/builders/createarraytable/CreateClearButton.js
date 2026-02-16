import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateClearButton = function (parent, config, style) {
    var clearItems = GetValue(config, 'clearItems', true);
    if (!clearItems) {
        return null;
    }

    var scene = parent;

    var clearButtonStyle = GetValue(style, 'clear');
    if (!clearButtonStyle) {
        clearButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
    }
    var clearLabel = GetValue(config, 'clearLabel', 'Clear');

    var clearButton = CreateLabel(scene, clearButtonStyle);
    clearButton.resetDisplayContent(clearLabel);

    return clearButton;
}

export default CreateClearButton;
