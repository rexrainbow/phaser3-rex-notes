// string
import TextInputHandler from '../inputhandlers/TextInputHandler';
import TextAreaInputHandler from '../inputhandlers/TextAreaInputHandler';
// number
import NumberInputHandler from '../inputhandlers/NumberInputHandler';
import RangeInputHandler from '../inputhandlers/RangeInputHandler';
import IncDecInputHandler from '../inputhandlers/IncDecInputHandler';
import ColorInputHandler from '../inputhandlers/ColorInputHandler';
// boolean
import CheckboxInputHandler from '../inputhandlers/CheckboxInputHandler';
import ToggleSwitchInputHandler from '../inputhandlers/ToggleSwitchInputHandler';
// options
import ListInputHandler from '../inputhandlers/ListInputHandler';
import ButtonsInputHandler from '../inputhandlers/ButtonsInputHandler';
// Array
import ArrayInputHandler from '../inputhandlers/ArrayInputHandler';  // Number[] or string[]

var RegisterDefaultInputHandlers = function() {
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