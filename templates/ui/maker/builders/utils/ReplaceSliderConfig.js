import CreateChild from './CreateChild.js';

var ReplaceSliderConfig = function (scene, sliderConfig, styles, customBuilders) {
    if (sliderConfig) {
        CreateChild(scene, sliderConfig, 'background', styles, customBuilders);
        CreateChild(scene, sliderConfig, 'track', styles, customBuilders);
        CreateChild(scene, sliderConfig, 'indicator', styles, customBuilders);
        CreateChild(scene, sliderConfig, 'thumb', styles, customBuilders);
    }

    return sliderConfig;
}

export default ReplaceSliderConfig;