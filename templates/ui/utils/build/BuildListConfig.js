import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import BuildDisplayLabelConfig from './BuildDisplayLabelConfig.js';
import CreateInteractiveLabel from './CreateInteractiveLabel.js';

var BuildListConfig = function (scene, config) {
    config = (config) ? DeepClone(config) : {};

    var labelConfig = config.label || config.button;
    var listButtonConfig = config.button || config.label;
    delete config.label;
    delete config.button;

    var listConfig = BuildDisplayLabelConfig(scene, labelConfig);
    listConfig.list = config;
    listConfig.list.createButtonCallback = function (scene, option) {
        var gameObject = CreateInteractiveLabel(scene, listButtonConfig)
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
