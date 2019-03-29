import Sizer from '../sizer/Sizer.js';
import SCROLLMODE from '../utils/ScrollModeConst.js';
import Slider from '../slider/Slider.js';
import Scroller from '../../../plugins/scroller.js'

const GetValue = Phaser.Utils.Objects.GetValue;

class ScrollablePanel extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        var scrollMode = GetValue(config, 'scrollMode', 0); // vertical
        if (typeof (scrollMode) === 'string') {
            scrollMode = SCROLLMODE[tableOrientation];
        }

        // Create sizer
        config.orientation = scrollMode; // Left-to-right, or top-to-bottom
        super(scene, config);
        this.type = 'rexScrollablePanel';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var sliderConfig = GetValue(config, 'slider', undefined);
        var scrollerConfig = GetValue(config, 'scrollerConfig', true);

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var panelSpace = GetValue(config, 'space.panel', 0);


        if (background) {
            this.addBackground(background);
        }

        var padding;
        if (scrollMode === 0) {
            padding = {
                left: paddingLeft,
                right: (sliderConfig) ? panelSpace : paddingRight,
                top: paddingTop,
                bottom: paddingBottom
            }
        } else {
            padding = {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: (sliderConfig) ? panelSpace : paddingBottom
            }
        }
        this.add(panel, 1, 'center', padding, true);

        var slider;
        if (sliderConfig) {
            if (sliderConfig === true) {
                sliderConfig = {};
            }
            sliderConfig.orientation = this.orientation;
            slider = new Slider(scene, sliderConfig);
            var padding;
            if (scrollMode === 0) {
                padding = {
                    left: 0,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom
                }
            } else {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: 0,
                    bottom: paddingBottom
                }
            }
            this.add(slider, 0, 'center', padding, true);
        }

        var scroller;
        if (scrollerConfig) {
            if (scrollerConfig === true) {
                scrollerConfig = {};
            }
            scroller = new Scroller(textBlock, scrollerConfig);
        }

        // Control
        var ignored = false; // Set true to ignore event handler
        if (slider) {
            slider.on('valuechange', function (newValue) {
                if (ignored) {
                    ignored = false;
                    return;
                }
                textBlock.setPanelOYByPercentage(newValue);
                // reflect to scroller
                if (scroller) {
                    ignored = true;
                    scroller.setValue(textBlock.textOY);
                }
            })
        }
        if (scroller) {
            scroller.on('valuechange', function (newValue) {
                if (ignored) {
                    ignored = false;
                    return;
                }
                textBlock.setPanelOY(newValue);
                // reflect to slider
                if (slider) {
                    ignored = true;
                    slider.setValue(textBlock.getPanelOYPercentage());
                }
            });
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('panel', panel);
        this.addChildrenMap('slider', slider);
        this.addChildrenMap('scroller', scroller);
    }
}

export default ScrollablePanel;