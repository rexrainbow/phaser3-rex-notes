import Sizer from '../../sizer/Sizer.js';
import Methods from './methods/Methods.js';
import GetScrollMode from '../GetScrollMode.js';
import CreateScrollableSizer from './methods/CreateScrollableSizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Scrollable extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var scrollMode = GetScrollMode(config); // 0:y, 1:x, 2:xy
        // Create sizer
        var isRevererXY = (scrollMode === 1);
        config.orientation = (!isRevererXY) ? 1 : 0;
        super(scene, config);
        this.type = GetValue(config, 'type', 'rexScrollable');
        this.scrollMode = scrollMode;

        // Add elements
        // Background
        var background = GetValue(config, 'background', undefined);
        if (background) {
            this.addBackground(background);
        }

        var header = GetValue(config, 'header', undefined);
        if (header) {
            var align = GetValue(config, 'align.header', 'center');
            var headerSpace = GetValue(config, 'space.header', 0);
            var padding;
            if (!isRevererXY) {
                padding = { bottom: headerSpace };
            } else {
                padding = { right: headerSpace };
            }
            this.add(header,
                {
                    proportion: 0,
                    align: align,
                    padding: padding,
                    expand: GetValue(config, 'expand.header', true)
                }
            );
        }

        var scrollableSizer = CreateScrollableSizer(this, config);
        if (scrollableSizer) {
            this.add(scrollableSizer,
                {
                    proportion: 1,
                    align: 'center',
                    padding: 0,
                    expand: true
                }
            );
        }

        var footer = GetValue(config, 'footer', undefined);
        if (footer) {
            var align = GetValue(config, 'align.footer', 'center');
            var footerSpace = GetValue(config, 'space.footer', 0);
            var padding;
            if (!isRevererXY) {
                padding = { top: footerSpace };
            } else {
                padding = { left: footerSpace };
            }
            this.add(footer,
                {
                    proportion: 0,
                    align: align,
                    padding: padding,
                    expand: GetValue(config, 'expand.footer', true)
                }
            );
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('header', header);
        this.addChildrenMap('footer', footer);

        this.runLayoutFlag = false;

        /* 
        Necessary properties of child object :

        - child.t (RW), 
        - child.childOY (RW)        
        - child.topChildOY (R)
        - child.bottomChildOY (R)
        - child.childVisibleHeight (R)
        - child.childHeight (R)

        - child.s (RW), 
        - child.childOX (RW)
        - child.leftChildOX (R)
        - child.rightChildOX (R)
        - child.childVisibleWidth (R)
        - child.childWidth (R)        
        */
    }

    postLayout(parent, newWidth, newHeight) {
        var s = 0, t = 0;
        if (!this.runLayoutFlag) {
            this.runLayoutFlag = true;
        } else {
            t = this.t;

            if (this.scrollMode === 2) {
                s = this.s;
            }
        }

        this.resizeController();

        this.setT(t);
        if (this.scrollMode === 2) {
            this.setS(s);
        }

        super.postLayout(parent, newWidth, newHeight);

        return this;
    }

    set t(value) {
        // Get inner childT
        var childMargin = this.childMargin;
        if ((childMargin.top !== 0) || (childMargin.bottom !== 0)) {
            var child = this.childrenMap.child;
            var innerHeight = (child.topChildOY - child.bottomChildOY);
            var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
            var innerChildOY = (outerHeight * value) - childMargin.top;
            value = (innerHeight !== 0) ? (innerChildOY / innerHeight) : 0;
        }

        this.childrenMap.child.t = value;
        this.updateController();
    }

    get t() {
        var t = this.childrenMap.child.t;

        // Get outer childT
        var childMargin = this.childMargin;
        if ((childMargin.top !== 0) || (childMargin.bottom !== 0)) {
            var child = this.childrenMap.child;
            var innerHeight = (child.topChildOY - child.bottomChildOY);
            var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
            var outerChildOY = (innerHeight * t) + childMargin.top;
            t = (outerHeight !== 0) ? (outerChildOY / outerHeight) : 0;
        }
        return t;
    }

    set s(value) {
        // Get inner childS
        var childMargin = this.childMargin;
        if ((childMargin.left !== 0) || (childMargin.right !== 0)) {
            var child = this.childrenMap.child;
            var innerWidth = (child.leftChildOX - child.rightChildOX);
            var outerWidth = innerWidth + childMargin.left + childMargin.right;
            var innerChildOX = (outerWidth * value) - childMargin.left;
            value = (innerWidth !== 0) ? (innerChildOX / innerWidth) : 0;
        }

        this.childrenMap.child.s = value;
        this.updateController();
    }

    get s() {
        var s = this.childrenMap.child.s;

        // Get outer childT
        var childMargin = this.childMargin;
        if ((childMargin.left !== 0) || (childMargin.right !== 0)) {
            var child = this.childrenMap.child;
            var innerWidth = (child.leftChildOX - child.rightChildOX);
            var outerWidth = innerWidth + childMargin.left + childMargin.right;
            var outerChildOX = (innerWidth * s) + childMargin.left;
            s = (outerWidth !== 0) ? (outerChildOX / outerWidth) : 0;
        }
        return s;
    }

    set childOY(value) {
        this.childrenMap.child.childOY = value;
        this.updateController();
    }

    get childOY() {
        return this.childrenMap.child.childOY;
    }

    set childOX(value) {
        this.childrenMap.child.childOX = value;
        this.updateController();
    }

    get childOX() {
        return this.childrenMap.child.childOX;
    }

    get topChildOY() {
        return this.childrenMap.child.topChildOY + this.childMargin.top;
    }

    get bottomChildOY() {
        return this.childrenMap.child.bottomChildOY - this.childMargin.bottom;
    }

    get leftChildOX() {
        return this.childrenMap.child.leftChildOX + this.childMargin.left;
    }

    get rightChildOX() {
        return this.childrenMap.child.rightChildOX - this.childMargin.right;
    }

    get childVisibleHeight() {
        return this.childrenMap.child.childVisibleHeight;
    }

    get childHeight() {
        return this.childrenMap.child.childHeight;
    }

    get childVisibleWidth() {
        return this.childrenMap.child.childVisibleWidth;
    }

    get childWidth() {
        return this.childrenMap.child.childWidth;
    }

    get isOverflow() {
        var child = this.childrenMap.child;
        return child.topChildOY !== child.bottomChildOY;
    }

    get isOverflowY() {
        return this.isOverflow;
    }

    get isOverflowX() {
        var child = this.childrenMap.child;
        return child.leftChildOX !== child.rightChildOX;
    }

    get sliderEnable() {
        var slider = this.childrenMap.slider;
        if (!slider) {
            return false;
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

    get sliderYEnable() {
        return this.sliderEnable
    }

    set sliderYEnable(value) {
        this.sliderEnable = value;
    }

    setSliderYEnable(enabled) {
        this.setSliderEnable(enabled);
        return this;
    }

    get sliderXEnable() {
        var slider = this.childrenMap.sliderX;
        if (!slider) {
            return false;
        }

        return slider.enable;
    }

    set sliderXEnable(value) {
        var slider = this.childrenMap.sliderX;
        if (!slider) {
            return;
        }
        slider.setEnable(value);
    }

    setSliderXEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.sliderXEnable = enabled;
        return this;
    }

    get scrollerEnable() {
        var scroller = this.childrenMap.scroller;
        if (!scroller) {
            return false;
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

    get scrollerYEnable() {
        return this.scrollerEnable;
    }

    set scrollerYEnable(value) {
        this.scrollerEnable = value;
    }

    setScrollerYEnable(enabled) {
        this.setScrollerEnable(enabled);
        return this;
    }

    get scrollerXEnable() {
        var scroller = this.childrenMap.scrollerX;
        if (!scroller) {
            return false;
        }

        return scroller.enable;
    }

    set scrollerXEnable(value) {
        var scroller = this.childrenMap.scrollerX;
        if (!scroller) {
            return;
        }
        scroller.setEnable(value);
    }

    setScrollerXEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.scrollerXEnable = enabled;
        return this;
    }

    get scrollerXEnable() {
        var scroller = this.childrenMap.scrollerX;
        if (!scroller) {
            return false;
        }

        return scroller.enable;
    }

    set scrollerXEnable(value) {
        var scroller = this.childrenMap.scrollerX;
        if (!scroller) {
            return;
        }
        scroller.setEnable(value);
    }

    setScrollerXEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.scrollerXEnable = enabled;
        return this;
    }

    get mouseWheelScrollerEnable() {
        var mouseWheelScroller = this.childrenMap.mouseWheelScroller;
        if (!mouseWheelScroller) {
            return false;
        }

        return mouseWheelScroller.enable;
    }

    set mouseWheelScrollerEnable(value) {
        var mouseWheelScroller = this.childrenMap.mouseWheelScroller;
        if (!mouseWheelScroller) {
            return;
        }
        mouseWheelScroller.setEnable(value);
    }

    setMouseWheelScrollerEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.mouseWheelScrollerEnable = enabled;
        return this;
    }

    get mouseWheelScrollerYEnable() {
        return this.mouseWheelScrollerEnable;
    }

    set mouseWheelScrollerYEnable(value) {
        this.mouseWheelScrollerEnable = value;
    }

    setMouseWheelScrollerYEnable(enabled) {
        this.setMouseWheelScrollerEnable(enabled);
        return this;
    }

    get mouseWheelScrollerXEnable() {
        var mouseWheelScroller = this.childrenMap.mouseWheelScrollerX;
        if (!mouseWheelScroller) {
            return false;
        }

        return mouseWheelScroller.enable;
    }

    set mouseWheelScrollerXEnable(value) {
        var mouseWheelScroller = this.childrenMap.mouseWheelScrollerX;
        if (!mouseWheelScroller) {
            return;
        }
        mouseWheelScroller.setEnable(value);
    }

    setMouseWheelScrollerXEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.mouseWheelScrollerXEnable = enabled;
        return this;
    }

    setDropZoneEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        var child = this.childrenMap.child;
        child.setInteractive();
        child.input.dropZone = enable;
        return this;
    }
}

// mixin
Object.assign(
    Scrollable.prototype,
    Methods
);

export default Scrollable;