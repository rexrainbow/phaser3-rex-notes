import SetColorPickerTransitCallbackMethods from './SetColorPickerTransitCallbackMethods.js';
import CreateColorPickerPanel from './CreateColorPickerPanel.js';
import DelayCallMethods from './DelayCallMethods.js';

var methods = {
    createColorPickerPanel: CreateColorPickerPanel
}

Object.assign(
    methods,
    SetColorPickerTransitCallbackMethods,
    DelayCallMethods
);

export default methods;