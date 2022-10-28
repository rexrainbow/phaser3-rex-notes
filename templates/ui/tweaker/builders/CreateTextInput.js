import CreateCanvasInput from './utils/CreateCanvasInput.js';

var CreateTextInput = function (scene, config, styles, gameObject) {
    var canvasInputStyle = styles.input || {};
    return CreateCanvasInput(scene, config, canvasInputStyle, gameObject);
}

export default CreateTextInput;