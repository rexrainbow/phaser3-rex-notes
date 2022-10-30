import CanvasInput from '../../../canvasinput/CanvasInput.js';
import HasValue from '../../../../../plugins/utils/object/HasValue.js';

var CreateCanvasInput = function (scene, config) {
    var gameObject = new CanvasInput(scene, config);
    scene.add.existing(gameObject);

    if (!HasValue(config, 'wrap.vAlign')) {
        gameObject.setVAlign('center')
    }

    if (!HasValue(config, 'wrap.hAlign')) {
        gameObject.setHAlign('right')
    }

    return gameObject;
}

export default CreateCanvasInput;