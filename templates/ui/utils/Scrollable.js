import Sizer from '../sizer/Sizer.js';
import GetScrollMode from './GetScrollMode.js';
import Slider from '../slider/Slider.js';
import Scroller from '../../../plugins/scroller.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Scrollable extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var scrollMode = GetScrollMode(config);
        // Create sizer
        config.orientation = scrollMode; // Left-to-right, or top-to-bottom
        super(scene, config);
        this.type = GetValue(config, 'type', 'rexScrollable');

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var child = GetValue(config, 'child.gameObject', undefined);
        var sliderConfig = GetValue(config, 'slider', undefined);
        var scrollerConfig = GetValue(config, 'scroller', true);

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var childSpace = GetValue(config, 'space.child', 0);


        if (background) {
            this.addBackground(background);
        }

        var proportion = GetValue(config, 'child.proportion', 1);
        var expand = GetValue(config, 'child.expand', true);
        var padding;
        if (scrollMode === 0) {
            padding = {
                left: paddingLeft,
                right: (sliderConfig) ? childSpace : paddingRight,
                top: paddingTop,
                bottom: paddingBottom
            };
        } else {
            padding = {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: (sliderConfig) ? childSpace : paddingBottom
            };
        }
        this.add(child, proportion, 'center', padding, expand);

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
            scroller = new Scroller(child, scrollerConfig);
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

        this.addChildrenMap('background', background);
        this.addChildrenMap('child', child);
        this.addChildrenMap('slider', slider);
        this.addChildrenMap('scroller', scroller);

        // Necessary properties of child object
        // child.t (RW), child.childOY (RW), child.topChildOY (R), child.bottomChildOY (R)
    }

    layout(parent, newWidth, newHeight) {
        super.layout(parent, newWidth, newHeight);
        this.resizeController();
        return this;
    }

    resizeController() {
        var topChildOY = this.topChildOY;
        var bottomChildOY = this.bottomChildOY;
        var scroller = this.childrenMap.scroller;
        var slider = this.childrenMap.slider;
        if (scroller) {
            scroller.setBounds(bottomChildOY, topChildOY);
        }
        if (slider) {
            slider.setEnable(bottomChildOY !== topChildOY);
        }
        return this;
    }

    updateController() {
        var scroller = this.childrenMap.scroller;
        var slider = this.childrenMap.slider;
        if (scroller) {
            scroller.setValue(this.childOY);
        }
        if (slider) {
            slider.setValue(this.t);
        }
    }

    set t(value) {
        this.childrenMap.child.t = value;
        this.updateController();
    }

    get t() {
        return this.childrenMap.child.t;
    }

    set childOY(value) {
        this.childrenMap.child.childOY = value;
        this.updateController();
    }

    get childOY() {
        return this.childrenMap.child.childOY;
    }

    get topChildOY() {
        return this.childrenMap.child.topChildOY;
    }

    get bottomChildOY() {
        return this.childrenMap.child.bottomChildOY;
    }

    setChildOY(value) {
        this.childOY = value;
        return this;
    }

    setT(value) {
        this.t = value;
        return this;
    }

    scrollToTop() {
        this.t = 0;
        return this;
    }

    scrollToBottom() {
        this.t = 1;
        return this;
    }

    get sliderEnable() {
        var slider = this.childrenMap.slider;
        if (!slider) {
            return undefined;
        }

        return slider.enable;
    }

    set sliderEnable(value) {
        var slider = this.childrenMap.slider;
        if (!slider) {
            return;
        }
        slider.setEnable(value);
    }

    setSliderEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.sliderEnable = enabled;
        return this;
    }

    get scrollerEnable() {
        var scroller = this.childrenMap.scroller;
        if (!scroller) {
            return undefined;
        }

        return scroller.enable;
    }

    set scrollerEnable(value) {
        var scroller = this.childrenMap.scroller;
        if (!scroller) {
            return;
        }
        scroller.setEnable(value);
    }

    setScrollerEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.scrollerEnable = enabled;
        return this;
    }
}
export default Scrollable;