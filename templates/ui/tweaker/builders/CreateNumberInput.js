import CreateCanvasInput from './utils/CreateCanvasInput.js';

var CreateNumberInput = function (scene, config, styles, gameObject) {
    var canvasInputStyle = styles.input || {};
    return CreateCanvasInput(scene, config, canvasInputStyle, gameObject)
        .setNumberInput();
}

export default CreateNumberInput;