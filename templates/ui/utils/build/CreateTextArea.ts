import DeepClone from '../../../../plugins/utils/object/DeepClone';
import DefaultCreateBackground from './CreateBackground';
import DefaultCreateText from './CreateText';
import TextArea from '../../textarea/TextArea';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateTextArea = function(scene?: any, config?: any, creators?: any) {
    config = (config) ? DeepClone(config) : {};

    var createBackground = GetValue(creators, 'background', DefaultCreateBackground);
    var createText = GetValue(creators, 'text', DefaultCreateText);
    var createTrack = GetValue(creators, 'track', DefaultCreateBackground);
    var createThumb = GetValue(creators, 'thumb', DefaultCreateBackground);

    if (createBackground?: any) {
        config.background = createBackground(scene, config.background);
    } else {
        delete config.background;
    }

    if (createText?: any) {
        config.text = createText(scene, config.text);
    } else {
        delete config.text;
    }

    var sliderConfig = config.slider;
    if ((sliderConfig !== false) && (sliderConfig !== null)) {
        if (sliderConfig === undefined) {
            sliderConfig = {};
        }

        if (createTrack?: any) {
            sliderConfig.track = createTrack(scene, sliderConfig.track);
        } else {
            delete sliderConfig.track;
        }

        if (createThumb?: any) {
            sliderConfig.thumb = createThumb(scene, sliderConfig.thumb);
        } else {
            delete sliderConfig.thumb;
        }

        config.slider = sliderConfig;
    }

    // No header
    // No footer

    var gameObject = new TextArea(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateTextArea;