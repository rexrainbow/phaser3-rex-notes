import ColorInputLite from '../colorinputlite/ColorInputLite.js';

class ColorInput extends ColorInputLite {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexColorInput';
    }
}

export default ColorInput;