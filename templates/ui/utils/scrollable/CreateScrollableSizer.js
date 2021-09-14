import Sizer from '../../sizer/Sizer.js';
import GetScrollMode from '../GetScrollMode.js';
import Slider from '../../slider/Slider.js';
import Scroller from '../../../../plugins/scroller.js';
import MouseWheelScroller from '../../../../plugins/input/mousewheeldcroller/MouseWheelScroller.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateScrollableSizer = function (config) {
    var scene = this.scene;
    var scrollMode = GetScrollMode(config);
    var scrollableSizer = new Sizer(scene, { orientation: scrollMode });
    // A child which not put into scene

    var child = GetValue(config, 'child.gameObject', undefined);
    var sliderConfig = GetValue(config, 'slider', undefined),
        slider,
        sliderPosition = GetValue(sliderConfig, 'position', 0);
    if (typeof (sliderPosition) === 'string') {
        sliderPosition = SLIDER_POSITION_MAP[sliderPosition];
    }
    var isRightSlider = (sliderPosition === 0);  // Right/bottom slider

    var scrollerConfig = GetValue(config, 'scroller', true),
        scroller;
    var mouseWheelScrollerConfig = GetValue(config, 'mouseWheelScroller', false),
        mouseWheelScroller;

    // Child, slider, scroller, mouseWheelScroller
    if (child) {
        var childSpace = GetValue(config, 'space.child', 0);
        var childPadding = {};
        this.childMargin = {};
        if (typeof (childSpace) !== 'number') {
            var paddingConfig = childSpace;
            if (scrollMode === 0) {
                childPadding.left = GetValue(paddingConfig, 'left', 0);
                childPadding.right = GetValue(paddingConfig, 'right', 0);
                this.childMargin.top = GetValue(paddingConfig, 'top', 0);
                this.childMargin.bottom = GetValue(paddingConfig, 'bottom', 0);
            } else {
                childPadding.top = GetValue(paddingConfig, 'top', 0);
                childPadding.bottom = GetValue(paddingConfig, 'bottom', 0);
                this.childMargin.top = GetValue(paddingConfig, 'left', 0);
                this.childMargin.bottom = GetValue(paddingConfig, 'right', 0);
            }
        } else {
            if (sliderConfig) { // Has slider
                if (scrollMode === 0) {
                    childPadding = (isRightSlider) ? { right: childSpace } : { left: childSpace };
                } else {
                    childPadding = (isRightSlider) ? { bottom: childSpace } : { top: childSpace };
                }
            }
            this.childMargin.top = 0;
            this.childMargin.bottom = 0;
        }

        if (sliderConfig) {
            if (sliderConfig === true) {
                sliderConfig = {};
            }

            // Vertical slider(orientation=1) for left-right scrollableSizer(orientation=0)
            // Horizontal slider(orientation=0) for top-bottom scrollableSizer(orientation=1)
            sliderConfig.orientation = (scrollableSizer.orientation === 0) ? 1 : 0;
            slider = new Slider(scene, sliderConfig);
        }

        if (scrollerConfig) {
            if (scrollerConfig === true) {
                scrollerConfig = {};
            }
            scrollerConfig.orientation = scrollMode;
            scroller = new Scroller(child, scrollerConfig);
        }

        if (mouseWheelScrollerConfig) {
            mouseWheelScroller = new MouseWheelScroller(child, mouseWheelScrollerConfig);
        }

        // Add slider to parent sizer at left/top side
        if (slider && (!isRightSlider)) {
            scrollableSizer.add(slider,
                {
                    proportion: 0,
                    align: 'center',
                    expand: true
                }
            );
        }

        // Add child to parent sizer
        var proportion = GetValue(config, 'child.proportion', 1);
        var expand = GetValue(config, 'child.expand', true);
        scrollableSizer.add(child,
            {
                proportion: proportion,
                align: 'center',
                padding: childPadding,
                expand: expand,
            }
        );

        // Add slider to parent sizer at right/bottom side
        if (slider && isRightSlider) {
            scrollableSizer.add(slider,
                {
                    proportion: 0,
                    align: 'center',
                    expand: true
                }
            );
        }

    }

    // Control
    if (slider) {
        slider.on('valuechange', function (newValue) {
            this.t = newValue;
            this.emit('scroll', this);
        }, this);
    }
    if (scroller) {
        scroller.on('valuechange', function (newValue) {
            this.childOY = newValue;
            this.emit('scroll', this);
        }, this);
    }
    if (mouseWheelScroller) {
        mouseWheelScroller.on('scroll', function (incValue) {
            this.addChildOY(-incValue, true);
        }, this);
    }

    this.addChildrenMap('child', child);
    this.addChildrenMap('slider', slider);
    this.addChildrenMap('scroller', scroller);
    this.addChildrenMap('mouseWheelScroller', mouseWheelScroller);

    return scrollableSizer;
}

var SLIDER_POSITION_MAP = {
    right: 0,
    left: 1,
    bottom: 0,
    top: 1,
}

export default CreateScrollableSizer;