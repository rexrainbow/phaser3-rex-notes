import ScrollBar from '../../scrollbar/ScrollBar.js';
import Clone from '../../../../plugins/utils/object/Clone.js';

var CreateScrollbar = function (scene, config) {
    if (config === undefined) {
        config = {};
    }

    var sliderConfig = Clone(config);
    config = {
        slider: sliderConfig
    }

    // Move orientation parameter from sliderConfig to config
    config.orientation = sliderConfig.orientation;
    delete sliderConfig.orientation;

    // Move background parameter from sliderConfig to config
    config.background = sliderConfig.background;
    delete sliderConfig.background;

    // Move buttons parameter from sliderConfig to config
    config.buttons = sliderConfig.buttons;
    delete sliderConfig.buttons;

    config.value = null;  // Don't assign initial value (0)

    var scrollBar = new ScrollBar(scene, config);
    scene.add.existing(scrollBar);

    var slider = scrollBar.childrenMap.slider;
    scrollBar.addChildrenMap('track', slider.childrenMap.track);
    scrollBar.addChildrenMap('indicator', slider.childrenMap.indicator);
    scrollBar.addChildrenMap('thumb', slider.childrenMap.thumb);

    return scrollBar;
}

export default CreateScrollbar;