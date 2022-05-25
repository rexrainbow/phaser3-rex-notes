import CreateChild from './CreateChild.js';

var ReplaceSliderConfig = function (scene, sliderConfig, styles, customBuilders) {
    if (sliderConfig) {
        CreateChild(scene, sliderConfig, 'background', styles, customBuilders);
        CreateChild(scene, sliderConfig, 'track', styles, customBuilders);
        CreateChild(scene, sliderConfig, 'indicator', styles, customBuilders);
        CreateChild(scene, sliderConfig, 'thumb', styles, customBuilders);

        var sliderButtonsConfig = sliderConfig.buttons;
        if (sliderButtonsConfig) {
            CreateChild(scene, sliderButtonsConfig, 'top', styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'bottom', styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'left', styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'right', styles, customBuilders);
        }
    }

    return sliderConfig;
}

export default ReplaceSliderConfig;