import CreateCanvasInput from './utils/CreateCanvasInput.js';

var CreateNumberInput = function (scene, config, style, gameObject) {
    return CreateCanvasInput(scene, config, style, gameObject)
        .setNumberInput();
}

export default CreateNumberInput;