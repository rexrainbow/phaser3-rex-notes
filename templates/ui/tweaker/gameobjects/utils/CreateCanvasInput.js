import CanvasInput from '../../../canvasinput/CanvasInput.js';
import HasValue from '../../../../../plugins/utils/object/HasValue.js';
import SetValue from '../../../../../plugins/utils/object/SetValue.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';

var CreateCanvasInput = function (scene, config) {
    config = DeepClone(config);

    if (!HasValue(config, 'wrap.vAlign')) {
        SetValue(config, 'wrap.vAlign', 'center');
    }
    //if (!HasValue(config, 'wrap.hAlign')) {
    //    SetValue(config, 'wrap.hAlign', 'right');
    //}
    if (!HasValue(config, 'wrap.charWrap')) {
        SetValue(config, 'wrap.charWrap', true);
    }

    var gameObject = new CanvasInput(scene, config);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateCanvasInput;