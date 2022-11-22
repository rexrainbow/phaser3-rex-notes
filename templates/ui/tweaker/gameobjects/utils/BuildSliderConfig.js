import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateRoundRectangle from '../../../utils/build/CreateRoundRectangle.js';

var BuildSliderConfig = function (scene, config) {
    config = (config) ? DeepClone(config) : {};

    if (config.track) {
        config.track = CreateRoundRectangle(scene, config.track);
    }

    if (config.indicator) {
        config.indicator = CreateRoundRectangle(scene, config.indicator);
    }

    var thumbConfig = config.thumb;
    if (thumbConfig) {
        var thumbSize = thumbConfig.size;
        if (thumbSize) {
            thumbConfig.width = thumbSize;
            thumbConfig.height = thumbSize;
        }

        config.thumb = CreateRoundRectangle(scene, thumbConfig);
    }

    return config;
}

export default BuildSliderConfig;