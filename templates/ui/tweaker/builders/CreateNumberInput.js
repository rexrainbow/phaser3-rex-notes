import CreateCanvasInput from './utils/CreateCanvasInput.js';

var CreateNumberInput = function (scene, config, styles, gameObject) {
    styles = styles.input || {};
    return CreateCanvasInput(scene, config, styles, gameObject).setNumberInput();
}

export default CreateNumberInput;