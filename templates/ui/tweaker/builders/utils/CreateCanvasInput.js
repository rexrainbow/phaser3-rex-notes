import CanvasInput from '../../../canvasinput/CanvasInput.js';
import HasValue from '../../../../../plugins/utils/object/HasValue.js';

var CreateCanvasInput = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new CanvasInput(scene, style);
        scene.add.existing(gameObject);
    }

    if (config) {
    }

    if (!HasValue(style, 'wrap.vAlign')) {
        gameObject.setVAlign('center')
    }

    if (!HasValue(style, 'wrap.hAlign')) {
        gameObject.setHAlign('right')
    }

    return gameObject;
}

export default CreateCanvasInput;