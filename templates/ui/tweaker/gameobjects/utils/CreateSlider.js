import Slider from '../../../slider/Slider.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';

var CreateSlider = function (scene, config) {
    var trackConfig = config.track;
    if (trackConfig) {
        config.track = CreateRoundRectangle(scene, trackConfig);
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