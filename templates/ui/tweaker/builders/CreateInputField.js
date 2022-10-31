import {
    StringType, NumberType, RangeType, ListType,
    BooleanType, ColorType, Pointer2dType, Pointer3dType,
} from '../utils/inputs/InputTypes.js';
import CreateTextInput from './CreateTextInput.js';
import CreateNumberInput from './CreateNumberInput.js';
import CreateRangeInput from './CreateRangeInput.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

var CreateInputField = function (scene, config, style, gameObject) {
    var viewType = config.view;
    var callback;
    switch (viewType) {
        case StringType:
            callback = CreateTextInput;
            break;

        case NumberType:
            callback = CreateNumberInput;
            break;

        case RangeType:
            callback = CreateRangeInput;
            break;

        default:
            callback = IsFunction(viewType) ? viewType : CreateTextInput;
            break;
    }

    return callback(scene, config, style, gameObject);
}

export default CreateInputField;