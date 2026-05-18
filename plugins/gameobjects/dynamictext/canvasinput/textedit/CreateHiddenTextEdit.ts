import HiddenTextEdit from './HiddenTextEdit';
import CopyProperty from '../../../../utils/object/CopyProperty';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const PropertiesList = [
    'inputType',
    'onOpen', 'clickOutSideTarget', 'onFocus', 'onClose', 'onBlur', 'onUpdate',
    'enterClose',
    'readOnly', 'maxLength', 'minLength', 'selectAll'
];

var CreateHiddenTextEdit = function(parent?: any, parentConfig?: any) {
    var config = GetValue(parentConfig, 'edit');
    if (config === undefined) {
        config = {};
    }

    CopyProperty(parentConfig, config, PropertiesList);

    return new HiddenTextEdit(parent, config);
}

export default CreateHiddenTextEdit;