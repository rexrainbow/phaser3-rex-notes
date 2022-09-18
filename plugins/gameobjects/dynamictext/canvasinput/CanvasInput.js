import DynamicText from '../dynamictext/DynamicText.js';

class CanvasInput extends DynamicText {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexCanvasInput';
    }

}

export default CanvasInput;