import ButtonStyleBase from './ButtonStyleBase.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateClearButton = function (parent, config, style) {
    var clearItems = GetValue(config, 'clearItems', true);
    if (!clearItems) {
        return null;
    }

    var scene = parent;

    var clearButton;
    var clearButtonStyle = style.clearButton;
    if (clearButtonStyle) {
        clearButtonStyle = Object.assign(DeepClone(ButtonStyleBase), clearButtonStyle);
        clearButton = CreateLabel(scene, clearButtonStyle);
    } else {
        clearButtonStyle = GetValue(style, 'tweaker.inputRow.button') || {};
        clearButton = CreateLabel(scene, clearButtonStyle);
        clearButton.resetDisplayContent(GetValue(config, 'clearLabel', 'Clear'));
    }

    return clearButton;
}

export default CreateClearButton;
