import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import CreateBackground from './CreateBackground.js';
import CreateText from './CreateText.js';
import CreateImage from './CreateImage.js';

var BuildDisplayLabelConfig = function (scene, config, deepCloneConfig) {
    if (deepCloneConfig === undefined) {
        deepCloneConfig = true;
    }

    if (deepCloneConfig) {
        config = (config) ? DeepClone(config) : {};
    } else if (!config) {
        config = {};
    }


    config.background = CreateBackground(scene, config.background);

    config.text = CreateText(scene, config.text);

    if (config.icon !== null) {
        config.icon = CreateImage(scene, config.icon);
    }

    if (config.action !== null) {
        config.action = CreateImage(scene, config.action);
    }

    return config;
}

export default BuildDisplayLabelConfig;