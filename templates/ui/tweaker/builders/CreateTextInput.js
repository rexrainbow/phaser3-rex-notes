import CreateCanvasInput from './utils/CreateCanvasInput.js';

var CreateTextInput = function (scene, config, styles, gameObject) {
    styles = styles.input || {};
    return CreateCanvasInput(scene, config, styles, gameObject);
}

export default CreateTextInput;