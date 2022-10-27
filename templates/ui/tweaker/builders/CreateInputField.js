import {
    StringType, NumberType, NumberRangeType, ListType,
    BooleanType, ColorType, Pointer2dType, Pointer3dType,
} from '../utils/inputs/InputTypes.js';
import CreateTextInput from './CreateTextInput.js';
import CreateNumberInput from './CreateNumberInput.js';

var CreateInputField = function (scene, config, styles, gameObject) {
    switch (config.view) {
        case StringType: return CreateTextInput(scene, config, styles, gameObject);
        case NumberType: return CreateNumberInput(scene, config, styles, gameObject);
        default: return CreateTextInput(scene, config, styles, gameObject);
    }
}

export default CreateInputField;