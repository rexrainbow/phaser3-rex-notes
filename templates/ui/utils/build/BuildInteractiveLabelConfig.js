import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import CreateButtonRoundRectangleBackground from './CreateButtonRoundRectangleBackground.js';
import CreateBBCodeText from './CreateBBCodeText.js';
import CreateImage from './CreateImage.js';

var BuildInteractiveLabelConfig = function (scene, config, deepCloneConfig) {
    if (deepCloneConfig === undefined) {
        deepCloneConfig = true;
    }

    if (deepCloneConfig) {
        config = (config) ? DeepClone(config) : {};
    } else if (!config) {
        config = {};
    }


    config.background = CreateButtonRoundRectangleBackground(scene, config.background);

    config.text = CreateBBCodeText(scene, config.text);

    if (config.icon !== null) {
        config.icon = CreateImage(scene, config.icon);
    }

    if (config.action !== null) {
        config.action = CreateImage(scene, config.action);
    }

    return config;
}

export default BuildInteractiveLabelConfig;