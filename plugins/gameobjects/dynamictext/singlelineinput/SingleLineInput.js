import CanvasInput from '../canvasinput/CanvasInput';
import SetValue from '../../../utils/object/SetValue';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class SingleIineInput extends CanvasInput {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
        }

        if (config === undefined) {
            config = {};
        }

        SetValue(config, 'wrap.vAlign', 'center');
        SetValue(config, 'wrap.charWrap', true);
        // SetValue(config, 'wrap.maxLines', 1);

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexSingleLineInput';
    }
}

export default SingleIineInput;