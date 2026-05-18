import CanvasInput from '../../canvasinput/CanvasInput';
import DeepClone from '../../../../plugins/utils/object/DeepClone';

var CreateInputText = function(scene?: any, config?: any, deepCloneConfig?: any) {
    if (deepCloneConfig === undefined) {
        deepCloneConfig = true;
    }

    if (deepCloneConfig?: any) {
        config = (config) ? DeepClone(config) : {};
    } else if (!config) {
        config = {};
    }


    var inputText = new CanvasInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateInputText;