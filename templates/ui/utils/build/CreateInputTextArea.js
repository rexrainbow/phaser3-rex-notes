import TextAreaInput from '../../textareainput/TextAreaInput.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

var CreateInputTextArea = function (scene, config, deepCloneConfig) {
    if (deepCloneConfig === undefined) {
        deepCloneConfig = true;
    }

    if (deepCloneConfig) {
        config = (config) ? DeepClone(config) : {};
    } else if (!config) {
        config = {};
    }

    var inputText = new TextAreaInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateInputTextArea;