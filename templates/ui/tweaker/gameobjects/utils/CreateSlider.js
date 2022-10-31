import Slider from '../../../slider/Slider.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';

var CreateSlider = function (scene, config) {
    config = DeepClone(config);

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

    var gameObject = new Slider(scene, config);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateSlider;