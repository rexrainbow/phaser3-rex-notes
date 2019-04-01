import Sizer from '../sizer/Sizer.js';
import SCROLLMODE from '../utils/ScrollModeConst.js';
import ScrollableBlock from '../scrollableblock/ScrollableBlock.js';
import Slider from '../slider/Slider.js';
import Scroller from '../../../plugins/scroller.js';
import UpdatePanel from './UpdatePanel.js';

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

        var panelWidth = GetValue(config, 'panelWidth', undefined);
        var panelHeight = GetValue(config, 'panelHeight', undefined);
        var panelMask = GetValue(config, 'panelMask', true);
        var scrollableBlock = new ScrollableBlock(scene, {
            scrollMode: scrollMode,
            width: panelWidth,
            height: panelHeight,
            child: panel,
            childMask: panelMask,
        });
        var proportion, padding, expand;
        if (scrollMode === 0) {
            proportion = (panelWidth === undefined) ? 1 : 0;
            padding = {
                left: paddingLeft,
                right: (sliderConfig) ? panelSpace : paddingRight,
                top: paddingTop,
                bottom: paddingBottom
            };
            expand = (panelHeight === undefined);
        } else {
            proportion = (panelHeight === undefined) ? 1 : 0;
            padding = {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: (sliderConfig) ? panelSpace : paddingBottom
            };
            expand = (panelWidth === undefined);
        }
        this.add(scrollableBlock, proportion, 'center', padding, expand);

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
            scroller = new Scroller(scrollableBlock, scrollerConfig);
        }

        // Control
        var ignored = false; // Set true to ignore event handler
        if (slider) {
            slider.on('valuechange', function (newValue) {
                if (ignored) {
                    ignored = false;
                    return;
                }
                scrollableBlock.setChildOYByPercentage(newValue);
                // reflect to scroller
                if (scroller) {
                    ignored = true;
                    scroller.setValue(scrollableBlock.childOY);
                }
            })
        }
        if (scroller) {
            scroller.on('valuechange', function (newValue) {
                if (ignored) {
                    ignored = false;
                    return;
                }
                scrollableBlock.setChildOY(newValue);
                // reflect to slider
                if (slider) {
                    ignored = true;
                    slider.setValue(scrollableBlock.getChildOYPercentage());
                }
            });
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('scrollableBlock', scrollableBlock);
        this.addChildrenMap('panel', panel);
        this.addChildrenMap('slider', slider);
        this.addChildrenMap('scroller', scroller);
    }
}

var methods = {
    updatePanel: UpdatePanel,
}
Object.assign(
    ScrollablePanel.prototype,
    methods
);

export default ScrollablePanel;