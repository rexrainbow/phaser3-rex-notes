import CanvasInput from '../../../canvasinput/CanvasInput.js';

var CreateInputText = function (scene, config) {
    var inputText = new CanvasInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateInputText;