import ColorInputBase from '../colorinputbase/ColorInputBase.js';

class ColorInput extends ColorInputBase {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexColorInput';
    }
}

export default ColorInput;