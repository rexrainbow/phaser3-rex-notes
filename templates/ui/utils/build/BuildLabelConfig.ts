import DeepClone from '../../../../plugins/utils/object/DeepClone';
import DefaultCreateBackground from './CreateBackground';
import DefaultCreateText from './CreateText';
import DefaultCreateImage from './CreateImage';


import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var BuildLabelConfig = function(scene?: any, config?: any, creators?: any) {
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