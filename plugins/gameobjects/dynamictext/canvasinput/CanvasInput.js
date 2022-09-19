import DynamicText from '../dynamictext/DynamicText.js';
import HiddenInputText from './HiddenInputText.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CanvasInput extends DynamicText {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
        }

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexCanvasInput';

        this.textEdit = new HiddenInputText(this, GetValue(config, 'input'));
    }

}

export default CanvasInput;