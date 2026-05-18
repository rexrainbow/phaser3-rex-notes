import ColorInput from '../../colorinput/colorinput/ColorInput';
import DeepClone from '../../../../plugins/utils/object/DeepClone';

var CreateColorInput = function(scene?: any, config?: any, deepCloneConfig?: any) {
    if (deepCloneConfig === undefined) {
        deepCloneConfig = true;
    }

    if (deepCloneConfig?: any) {
        config = (config) ? DeepClone(config) : {};
    } else if (!config) {
        config = {};
    }


    var inputText = new ColorInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateColorInput;