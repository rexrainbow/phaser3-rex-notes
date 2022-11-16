import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import CreateButtonRoundRectangleBackground from './CreateButtonRoundRectangleBackground.js';
import CreateText from './CreateText.js';
import CreateImage from './CreateImage.js';

var BuildInteractiveLabelConfig = function (scene, config) {
    config = (config) ? DeepClone(config) : {};

    config.background = CreateButtonRoundRectangleBackground(scene, config.background);

    config.text = CreateText(scene, config.text);

    if (config.icon !== null) {
        config.icon = CreateImage(scene, config.icon);
    }

    if (config.action != null) {
        config.action = CreateImage(scene, config.action);
    }

    return config;
}

export default BuildInteractiveLabelConfig;