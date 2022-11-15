import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import BuildLabelConfig from './BuildLabelConfig.js';
import CreateLabel from './CreateLabel.js';
import SetLabelData from './SetLabelData.js';

var BuildListConfig = function (scene, config) {
    config = (config) ? DeepClone(config) : {};

    var labelConfig = config.label || config.button;
    var listButtonConfig = config.button || config.label;
    delete config.label;
    delete config.button;

    var listConfig = BuildLabelConfig(scene, labelConfig);
    listConfig.list = config;
    listConfig.list.createButtonCallback = function (scene, option) {
        var gameObject = CreateLabel(scene, listButtonConfig);
        SetLabelData(gameObject, { text: option.text });
        return gameObject;
    }
    listConfig.list.onButtonOver = function (button, index, pointer, event) {
        button.setActiveState(true);
    }
    listConfig.list.onButtonOut = function (button, index, pointer, event) {
        button.setActiveState(false);
    }

    return listConfig;
}

export default BuildListConfig;
