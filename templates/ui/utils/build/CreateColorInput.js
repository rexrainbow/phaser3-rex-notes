import ColorInput from '../../colorinput/colorinput/ColorInput.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

var CreateColorInput = function (scene, config) {
    config = (config) ? DeepClone(config) : {};
    var inputText = new ColorInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateColorInput;