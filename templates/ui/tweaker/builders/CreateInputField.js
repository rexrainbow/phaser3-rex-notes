import {
    StringType, TextAreaType, NumberType, RangeType,
    ListType, ButtonsType,
    BooleanType, ToggleSwitchType,
    ColorType,
} from '../utils/inputs/InputTypes.js';
import CreateTextInput from './CreateTextInput.js';
import CreateTextAreaInput from './CreateTextAreaInput.js';
import CreateNumberInput from './CreateNumberInput.js';
import CreateRangeInput from './CreateRangeInput.js';
import CreateListInput from './CreateListInput.js';
import CreateButtonsInput from './CreateButtonsInput.js';
import CreateCheckboxInput from './CreateCheckboxInput.js';
import CreateToggleSwitchInput from './CreateToggleSwitchInput.js';
import CreateColorInput from './CreateColorInput.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

var CallbacksMap = {};
CallbacksMap[StringType] = CreateTextInput;
CallbacksMap[TextAreaType] = CreateTextAreaInput;
CallbacksMap[NumberType] = CreateNumberInput;
CallbacksMap[RangeType] = CreateRangeInput;
CallbacksMap[ListType] = CreateListInput;
CallbacksMap[ButtonsType] = CreateButtonsInput;
CallbacksMap[BooleanType] = CreateCheckboxInput;
CallbacksMap[ToggleSwitchType] = CreateToggleSwitchInput;
CallbacksMap[ColorType] = CreateColorInput;

var CreateInputField = function (scene, config, style) {
    var viewType = config.view;
    var callback;
    if (IsFunction(viewType)) {
        callback = viewType;
    } else {
        callback = (CallbacksMap.hasOwnProperty(viewType)) ? CallbacksMap[viewType] : CreateTextInput;
    }
    var gameObject = callback(scene, config, style);

    // Setup by config
    gameObject.setup(config);

    return gameObject;
}

export default CreateInputField;