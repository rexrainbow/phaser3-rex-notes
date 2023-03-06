import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import BuildLabelConfig from './BuildLabelConfig.js';
import CreateLabel from './CreateLabel.js';

var BuildListConfig = function (scene, config, deepCloneConfig) {
    if (deepCloneConfig === undefined) {
        deepCloneConfig = true;
    }

    if (deepCloneConfig) {
        config = (config) ? DeepClone(config) : {};
    } else if (!config) {
        config = {};
    }


    var labelConfig = config.label || config.button;
    var listButtonConfig = config.button || config.label;
    delete config.label;
    delete config.button;

    var listConfig = BuildLabelConfig(scene, labelConfig);
    listConfig.list = config;
    listConfig.list.createButtonCallback = function (scene, option) {
        var gameObject = CreateLabel(scene, listButtonConfig)
            .resetDisplayContent({ text: option.text })
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
