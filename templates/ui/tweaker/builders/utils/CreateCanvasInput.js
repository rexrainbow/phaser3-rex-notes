import CanvasInput from '../../../canvasinput/CanvasInput.js';

var CreateCanvasInput = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new CanvasInput(scene, style);
        scene.add.existing(gameObject);
    }

    if (config) {
    }

    gameObject.setVAlign(1); // Force vAlign to 1/'center'

    return gameObject;
}

export default CreateCanvasInput;