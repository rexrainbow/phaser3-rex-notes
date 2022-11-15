import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateRoundRectangle from '../../../utils/build/CreateRoundRectangle.js';

var BuildSliderConfig = function (scene, config) {
    config = (config) ? DeepClone(config) : {};

    var trackConfig = config.track;
    if (trackConfig) {
        config.track = CreateRoundRectangle(scene, trackConfig);
    }

    var indicatorConfig = config.indicator;
    if (indicatorConfig) {
        config.indicator = CreateRoundRectangle(scene, indicatorConfig);
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