import CanvasInput from '../../../canvasinput/CanvasInput.js';

var CreateCanvasInput = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        gameObject = new CanvasInput(scene, styles);
        scene.add.existing(gameObject);
    }

    if (config) {
    }

    gameObject.setVAlign('center');

    return gameObject;
}

export default CreateCanvasInput;