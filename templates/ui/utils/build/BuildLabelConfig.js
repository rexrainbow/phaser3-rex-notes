import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import DefaultCreateBackground from './CreateBackground.js';
import DefaultCreateText from './CreateText.js';
import DefaultCreateImage from './CreateImage.js';


const GetValue = Phaser.Utils.Objects.GetValue;

var BuildLabelConfig = function (scene, config, creators) {
    config = (config) ? DeepClone(config) : {};

    var createBackground = GetValue(creators, 'background', DefaultCreateBackground);
    var createText = GetValue(creators, 'text', DefaultCreateText);
    var createIcon = GetValue(creators, 'icon', DefaultCreateImage);
    var createAction = GetValue(creators, 'action', DefaultCreateImage);

    if ((config.background !== null) && createBackground) {
        config.background = createBackground(scene, config.background);
    } else {
        delete config.background;
    }

    if ((config.text !== null) && createText) {
        config.text = createText(scene, config.text);
    } else {
        delete config.text;
    }

    if ((config.icon !== null) && createIcon) {
        config.icon = createIcon(scene, config.icon);
    } else {
        delete config.icon;
    }

    if ((config.action !== null) && createAction) {
        config.action = createAction(scene, config.action);
    } else {
        delete config.action;
    }

    return config;
}

export default BuildLabelConfig;