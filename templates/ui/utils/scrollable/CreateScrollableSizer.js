import Sizer from '../../sizer/Sizer.js';
import GetScrollMode from '../GetScrollMode.js';
import Slider from '../../slider/Slider.js';
import Scroller from '../../../../plugins/scroller.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateScrollableSizer = function (config) {
    var scene = this.scene;
    var scrollMode = GetScrollMode(config);
    var scrollableSizer = new Sizer(scene, { orientation: scrollMode });

    var child = GetValue(config, 'child.gameObject', undefined);
    var sliderConfig = GetValue(config, 'slider', undefined),
        slider,
        sliderPosition;
    var scrollerConfig = GetValue(config, 'scroller', true),
        scroller;

    // Child, slider, scroller
    if (child) {
        var childSpace = GetValue(config, 'space.child', 0);
        this.childPadding = {};
        if (typeof (childSpace) !== 'number') {
            var childPadding = childSpace;
            if (scrollMode === 0) {
                childSpace = GetValue(childPadding, 'right', 0);
                this.childPadding.top = GetValue(childPadding, 'top', 0);
                this.childPadding.bottom = GetValue(childPadding, 'bottom', 0);
            } else {
                childSpace = GetValue(childPadding, 'bottom', 0);
                this.childPadding.top = GetValue(childPadding, 'left', 0);
                this.childPadding.bottom = GetValue(childPadding, 'right', 0);
            }
        } else {
            this.childPadding.top = 0;
            this.childPadding.bottom = 0;
        }

        if (sliderConfig) {
            if (sliderConfig === true) {
                sliderConfig = {};
            }
            sliderPosition = GetValue(sliderConfig, 'position', 0);
            if (typeof (sliderPosition) === 'string') {
                sliderPosition = SLIDER_POSITION_MAP[sliderPosition];
            }

            var padding;
            if (scrollMode === 0) {
                padding = (sliderPosition === 0) ? { left: childSpace } : { right: childSpace };
            } else {
                padding = (sliderPosition === 0) ? { top: childSpace } : { bottom: childSpace };
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

        // Add slider to parent sizer at left/top side
        if (slider && (sliderPosition === 1)) {
            scrollableSizer.add(slider, 0, 'center', padding, true);
        }

        // Add child to parent sizer
        var proportion = GetValue(config, 'child.proportion', 1);
        var expand = GetValue(config, 'child.expand', true);
        scrollableSizer.add(child, proportion, 'center', 0, expand);

        // Add slider to parent sizer at right/bottom side
        if (slider && (sliderPosition === 0)) {
            scrollableSizer.add(slider, 0, 'center', padding, true);
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

    this.addChildrenMap('child', child);
    this.addChildrenMap('slider', slider);
    this.addChildrenMap('scroller', scroller);

    return scrollableSizer;
}

var SLIDER_POSITION_MAP = {
    right: 0,
    left: 1,
    bottom: 0,
    top: 1,
}

export default CreateScrollableSizer;