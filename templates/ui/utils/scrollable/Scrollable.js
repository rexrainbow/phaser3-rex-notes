import Sizer from '../../sizer/Sizer.js';
import GetScrollMode from '../GetScrollMode.js';
import CreateScrollableSizer from './CreateScrollableSizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Scrollable extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var scrollMode = GetScrollMode(config); // Left-to-right, or top-to-bottom
        // Create sizer
        config.orientation = (scrollMode === 0) ? 1 : 0;
        super(scene, config);
        this.type = GetValue(config, 'type', 'rexScrollable');

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var scrollableSizer = CreateScrollableSizer.call(this, config);
        var header = GetValue(config, 'header', undefined);
        var footer = GetValue(config, 'footer', undefined);

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);

        // Background
        if (background) {
            this.addBackground(background);
        }

        if (header) {
            var align = GetValue(config, 'align.header', 'center');
            var headerSpace = GetValue(config, 'space.header', 0);
            var padding;
            if (scrollMode === 0) {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: headerSpace,
                };
            } else {
                padding = {
                    left: paddingLeft,
                    right: headerSpace,
                    top: paddingTop,
                    bottom: paddingBottom,
                };
            }
            var expand = GetValue(config, 'expand.header', true);
            this.add(header, 0, align, padding, expand);
        }

        if (scrollableSizer) {
            var padding;
            if (scrollMode === 0) {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (header) ? 0 : paddingTop,
                    bottom: (footer) ? 0 : paddingBottom,
                };
            } else {
                padding = {
                    left: (header) ? 0 : paddingLeft,
                    right: (footer) ? 0 : paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom,
                };
            }
            this.add(scrollableSizer, 1, 'center', padding, true);
        }

        if (footer) {
            var align = GetValue(config, 'align.footer', 'center');
            var footerSpace = GetValue(config, 'space.footer', 0);
            var padding;
            if (scrollMode === 0) {
                padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: footerSpace,
                    bottom: paddingBottom,
                };
            } else {
                padding = {
                    left: footerSpace,
                    right: paddingRight,
                    top: paddingTop,
                    bottom: paddingBottom,
                };
            }
            var expand = GetValue(config, 'expand.footer', true);
            this.add(footer, 0, align, padding, expand);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('header', header);
        this.addChildrenMap('footer', footer);

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
        this.updateController();
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

    set t(t) {
        // Get inner childT
        var childPadding = this.childPadding;
        if ((childPadding.top !== 0) || (childPadding.bottom !== 0)) {
            var child = this.childrenMap.child
            var innerHeight = (child.topChildOY - child.bottomChildOY);
            var outterHeight = innerHeight + childPadding.top + childPadding.bottom;
            var innerChildOY = (outterHeight * t) - childPadding.top;
            t = innerChildOY / innerHeight;
        }

        this.childrenMap.child.t = t;
        this.updateController();
    }

    get t() {
        var t = this.childrenMap.child.t;

        // Get outter childT
        var childPadding = this.childPadding;
        if ((childPadding.top !== 0) || (childPadding.bottom !== 0)) {
            var child = this.childrenMap.child
            var innerHeight = (child.topChildOY - child.bottomChildOY);
            var outterHeight = innerHeight + childPadding.top + childPadding.bottom;
            var outterChildOY = (innerHeight * t) + childPadding.top;
            t = outterChildOY / outterHeight;
        }
        return t;
    }

    set childOY(value) {
        this.childrenMap.child.childOY = value;
        this.updateController();
    }

    get childOY() {
        return this.childrenMap.child.childOY;
    }

    get topChildOY() {
        return this.childrenMap.child.topChildOY + this.childPadding.top;
    }

    get bottomChildOY() {
        return this.childrenMap.child.bottomChildOY - this.childPadding.bottom;
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