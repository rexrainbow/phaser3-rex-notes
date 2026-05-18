import TextAreaInput from '../../textareainput/TextAreaInput';
import DeepClone from '../../../../plugins/utils/object/DeepClone';

var CreateInputTextArea = function(scene?: any, config?: any, deepCloneConfig?: any) {
    if (deepCloneConfig === undefined) {
        deepCloneConfig = true;
    }

    if (deepCloneConfig?: any) {
        config = (config) ? DeepClone(config) : {};
    } else if (!config) {
        config = {};
    }

    var inputText = new TextAreaInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateInputTextArea;