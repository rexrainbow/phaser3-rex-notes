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
    var sliderConfig = GetValue(config, 'slider', undefined), slider;
    var scrollerConfig = GetValue(config, 'scroller', true), scroller;

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

        var proportion = GetValue(config, 'child.proportion', 1);
        var expand = GetValue(config, 'child.expand', true);
        var padding;
        if (scrollMode === 0) {
            padding = {
                right: (sliderConfig) ? childSpace : 0,
            };
        } else {
            padding = {
                bottom: (sliderConfig) ? childSpace : 0
            };
        }
        scrollableSizer.add(child, proportion, 'center', padding, expand);

        if (sliderConfig) {
            if (sliderConfig === true) {
                sliderConfig = {};
            }
            sliderConfig.orientation = scrollableSizer.orientation;
            slider = new Slider(scene, sliderConfig);
            scrollableSizer.add(slider, 0, 'center', 0, true);
        }


        if (scrollerConfig) {
            if (scrollerConfig === true) {
                scrollerConfig = {};
            }
            scrollerConfig.orientation = scrollMode;
            scroller = new Scroller(child, scrollerConfig);
        }
    }

    // Control
    if (slider) {
        slider.on('valuechange', function (newValue) {
            this.t = newValue;
        }, this);
    }
    if (scroller) {
        scroller.on('valuechange', function (newValue) {
            this.childOY = newValue;
        }, this);
    }

    this.addChildrenMap('child', child);
    this.addChildrenMap('slider', slider);
    this.addChildrenMap('scroller', scroller);

    return scrollableSizer;
}

export default CreateScrollableSizer;