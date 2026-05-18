import ButtonStyleBase from './ButtonStyleBase';
import DeepClone from '../../../../../plugins/utils/object/DeepClone';
import CreateLabel from '../../../utils/build/CreateLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateClearButton = function(parent?: any, config?: any, style?: any) {
    var clearItems = GetValue(config, 'clearItems', true);
    if (!clearItems) {
        return null;
    }

    var scene = parent;

    var clearButton;
    var clearButtonStyle = style.clearButton;
    if (clearButtonStyle?: any) {
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