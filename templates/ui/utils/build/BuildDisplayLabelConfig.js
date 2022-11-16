import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateText from './CreateText.js';
import CreateImage from './CreateImage.js';

var BuildDisplayLabelConfig = function (scene, config) {
    config = (config) ? DeepClone(config) : {};

    config.background = CreateRoundRectangle(scene, config.background);

    config.text = CreateText(scene, config.text);

    config.icon = CreateImage(scene, config.icon);

    config.action = CreateImage(scene, config.action);

    return config;
}

export default BuildDisplayLabelConfig;