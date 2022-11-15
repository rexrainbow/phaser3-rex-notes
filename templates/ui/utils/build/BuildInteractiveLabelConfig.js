import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import CreateButtonRoundRectangleBackground from './CreateButtonRoundRectangleBackground.js';
import CreateText from './CreateText.js';
import CreateImage from './CreateImage.js';

var BuildInteractiveLabelConfig = function (scene, config) {
    config = (config) ? DeepClone(config) : {};

    var backgroundStyle = config.background || {};
    config.background = CreateButtonRoundRectangleBackground(scene, backgroundStyle);

    var textStyle = config.text || {};
    config.text = CreateText(scene, textStyle);

    var iconConfig = config.icon || {};
    config.icon = CreateImage(scene, iconConfig);

    var actionConfig = config.action || {};
    config.action = CreateImage(scene, actionConfig);

    return config;
}

export default BuildInteractiveLabelConfig;