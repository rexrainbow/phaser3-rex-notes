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
        var panelConfig = GetValue(config, 'panel', undefined);
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

        if (panelConfig === undefined) {
            panelConfig = {};
        }
        panelConfig.scrollMode = scrollMode;
        var scrollableBlock = new ScrollableBlock(scene, panelConfig);
        var panel = GetValue(panelConfig, 'child', undefined);
        var panelWidth = GetValue(panelConfig, 'width', undefined);
        var panelHeight = GetValue(panelConfig, 'height', undefined);
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
            scrollerConfig.orientation = scrollMode;
            scroller = new Scroller(scrollableBlock, scrollerConfig);
        }

        // Control
        if (slider) {
            slider.on('valuechange', function (newValue) {
                scrollableBlock.t = newValue;
                this.updateController();
            }, this);
        }
        if (scroller) {
            scroller.on('valuechange', function (newValue) {
                scrollableBlock.childOY = newValue;
                this.updateController();
            }, this);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('scrollableBlock', scrollableBlock);
        this.addChildrenMap('panel', panel);
        this.addChildrenMap('slider', slider);
        this.addChildrenMap('scroller', scroller);
    }

    updateController() {
        var scrollableBlock = this.childrenMap.scrollableBlock;
        var scroller = this.childrenMap.scroller;
        var slider = this.childrenMap.slider;
        if (scroller) {
            scroller.setValue(scrollableBlock.childOY);
        }
        if (slider) {
            slider.setValue(scrollableBlock.t);
        }
    }

    layout(parent, newWidth, newHeight) {
        super.layout(parent, newWidth, newHeight);

        var scroller = this.childrenMap.scroller;
        if (scroller) {
            var scrollableBlock = this.childrenMap.scrollableBlock;
            var bottomOY = scrollableBlock.bottomChildOY,
                topOY = scrollableBlock.topChildOY;
            scroller.setBounds(bottomOY, topOY);
        }
        return this;
    }

    set t(value) {
        this.childrenMap.scrollableBlock.t = value;
        this.updateController();
    }

    get t() {
        return this.childrenMap.scrollableBlock.t;
    }

    setChildOYByPercentage(percentage) {
        this.t = percentage;
        return this;
    }

    get childOY() {
        return this.childrenMap.scrollableBlock.childOY;
    }

    set childOY(value) {
        this.childrenMap.scrollableBlock.childOY = value;
        this.updateController();
    }

    setChildOY(value) {
        this.childOY = value;
        return this;
    }

    get topChildOY() {
        return this.childrenMap.scrollableBlock.topChildOY;
    }

    get bottomChildOY() {
        return this.childrenMap.scrollableBlock.bottomChildOY;
    }

    scrollToTop() {
        this.t = 0;
        return this;
    }

    scrollToBottom() {
        this.t = 1;
        return this;
    }

    enableScrolling(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        var scroller = this.childrenMap.scroller;
        var slider = this.childrenMap.slider;
        if (scroller) {
            scroller.setEnable(enabled);
        }
        if (slider) {
            slider.setEnable(enabled);
        }
        return this;
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