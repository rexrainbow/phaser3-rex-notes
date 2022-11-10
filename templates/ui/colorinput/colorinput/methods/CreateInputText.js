import SingleLineInput from '../../../singlelineinput/SingleLineInput.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';

var CreateInputText = function (scene, config) {
    config = (config) ? DeepClone(config) : {};
    var inputText = new SingleLineInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateInputText;