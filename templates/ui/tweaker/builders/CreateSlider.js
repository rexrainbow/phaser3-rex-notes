import CreateBackground from './CreateBackground.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

var CreateSlider = function (scene, config, style) {
    if (!style && !config) {
        return undefined;
    }

    if (!config) {
        config = {};
    }

    var slider = (style) ? DeepClone(style) : {};

    var trackStyle = style.track;
    var trackConfig = config.track;
    if (trackStyle || trackConfig) {
        slider.track = CreateBackground(scene, (trackConfig || {}), (trackStyle || {}));
    }

    var thumbStyle = style.thumb;
    var thumbConfig = config.thumb;
    if (thumbStyle || thumbConfig) {
        slider.thumb = CreateBackground(scene, (thumbConfig || {}), (thumbStyle || {}));
    }

    return slider;
}

export default CreateSlider;