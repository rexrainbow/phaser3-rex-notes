// string
import TextInputHandler from '../inputhandlers/TextInputHandler.js';
import TextAreaInputHandler from '../inputhandlers/TextAreaInputHandler.js';
// number
import NumberInputHandler from '../inputhandlers/NumberInputHandler.js';
import RangeInputHandler from '../inputhandlers/RangeInputHandler.js';
import IncDecInputHandler from '../inputhandlers/IncDecInputHandler.js';
import ColorInputHandler from '../inputhandlers/ColorInputHandler.js';
// boolean
import CheckboxInputHandler from '../inputhandlers/CheckboxInputHandler.js';
import ToggleSwitchInputHandler from '../inputhandlers/ToggleSwitchInputHandler.js';
// options
import ListInputHandler from '../inputhandlers/ListInputHandler.js';
import ButtonsInputHandler from '../inputhandlers/ButtonsInputHandler.js';
// Array
import ArrayInputHandler from '../inputhandlers/ArrayInputHandler.js';  // Number[] or string[]

var RegisterDefaultInputHandlers = function () {
    this
        // string
        .registerInputHandler(TextInputHandler)
        .registerInputHandler(TextAreaInputHandler)
        // number
        .registerInputHandler(NumberInputHandler)
        .registerInputHandler(RangeInputHandler)
        .registerInputHandler(IncDecInputHandler)
        .registerInputHandler(ColorInputHandler)
        // boolean
        .registerInputHandler(CheckboxInputHandler)
        .registerInputHandler(ToggleSwitchInputHandler)
        // options
        .registerInputHandler(ListInputHandler)
        .registerInputHandler(ButtonsInputHandler)
        // array
        .registerInputHandler(ArrayInputHandler)

}

export default RegisterDefaultInputHandlers;