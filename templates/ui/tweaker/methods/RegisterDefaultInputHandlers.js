import TextInputHandler from '../inputhandlers/TextInputHandler.js';
import TextAreaInputHandler from '../inputhandlers/TextAreaInputHandler.js';
import NumberInputHandler from '../inputhandlers/NumberInputHandler.js';
import RangeInputHandler from '../inputhandlers/RangeInputHandler.js';
import ColorInputHandler from '../inputhandlers/ColorInputHandler.js';
import CheckboxInputHandler from '../inputhandlers/CheckboxInputHandler.js';
import ToggleSwitchInputHandler from '../inputhandlers/ToggleSwitchInputHandler.js';
import ListInputHandler from '../inputhandlers/ListInputHandler.js';
import ButtonsInputHandler from '../inputhandlers/ButtonsInputHandler.js';

var RegisterDefaultInputHandlers = function () {
    this
        .registerInputHandler(TextInputHandler)
        .registerInputHandler(TextAreaInputHandler)
        .registerInputHandler(NumberInputHandler)
        .registerInputHandler(RangeInputHandler)
        .registerInputHandler(ColorInputHandler)
        .registerInputHandler(CheckboxInputHandler)
        .registerInputHandler(ToggleSwitchInputHandler)
        .registerInputHandler(ListInputHandler)
        .registerInputHandler(ButtonsInputHandler)

}

export default RegisterDefaultInputHandlers;