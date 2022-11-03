import HiddenTextEdit from './HiddenTextEdit.js';
import CopyProperty from '../../../../utils/object/CopyProperty.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateHiddenTextEdit = function (parent, parentConfig) {
    var config = GetValue(parentConfig, 'edit');
    if (config === undefined) {
        config = {};
    }

    CopyProperty(parentConfig, config, 'inputType');
    CopyProperty(parentConfig, config, 'readOnly');
    CopyProperty(parentConfig, config, 'enterClose');
    CopyProperty(parentConfig, config, 'onOpen');
    CopyProperty(parentConfig, config, 'onFocus');
    CopyProperty(parentConfig, config, 'onClose');
    CopyProperty(parentConfig, config, 'onBlur');
    CopyProperty(parentConfig, config, 'onUpdate');

    return new HiddenTextEdit(parent, config);
}

export default CreateHiddenTextEdit;