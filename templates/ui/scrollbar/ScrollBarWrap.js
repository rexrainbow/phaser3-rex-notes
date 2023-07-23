/*
Scrollbar class for ScrollablePanel and ScrollableXYPanel
*/

import Base from './ScrollBar.js';
import Clone from '../../../plugins/utils/object/Clone.js';

class ScrollBarWrap extends Base {
    constructor(scene, config) {
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

        super(scene, config);

        var sliderChildrenMap = this.childrenMap.slider.childrenMap;
        this.addChildrenMap('track', sliderChildrenMap.track);
        this.addChildrenMap('indicator', sliderChildrenMap.indicator);
        this.addChildrenMap('thumb', sliderChildrenMap.thumb);
    }
}

export default ScrollBarWrap;