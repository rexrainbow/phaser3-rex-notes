import CreateScrollbar from './CreateScrollbar.js';
import Scroller from '../../../../plugins/scroller.js';
import MouseWheelScroller from '../../../../plugins/input/mousewheelscroller/MouseWheelScroller.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddSlider = function (topPatent, sliderParent, axis, config) {
    axis = axis.toUpperCase();
    var isAxisY = (axis === 'Y');
    var isScrollXYMode = (topPatent.scrollMode === 2);
    var child = topPatent.childrenMap.child;

    var sliderConfig, slider;
    var sliderConfigKey = `slider${axis}`;
    if (isScrollXYMode) {
        sliderConfig = GetValue(config, sliderConfigKey, undefined)
    } else {
        if (config.hasOwnProperty(sliderConfigKey)) {
            sliderConfig = GetValue(config, sliderConfigKey, undefined)
        } else {
            sliderConfig = GetValue(config, 'slider', undefined);
        }
    }

    if (sliderConfig) {
        if (sliderConfig === true) {
            sliderConfig = {};
        }

        sliderConfig.orientation = (isAxisY) ? 1 : 0;
        slider = CreateScrollbar(topPatent.scene, sliderConfig);

        slider.tickLength = GetValue(sliderConfig, 'tickLength', undefined);

        var column, row, padding;

        var sliderPosition = GetValue(sliderConfig, 'position', 0);
        if (typeof (sliderPosition) === 'string') {
            sliderPosition = SLIDER_POSITION_MAP[sliderPosition];
        }

        /*
        1. space.sliderX, space.sliderY
        2. space.slider
        3. space.child
        */
        var sliderPadding = GetValue(config, `space.slider${axis}`, undefined);
        var childPadding;  // Legacy
        if (sliderPadding === undefined) {
            sliderPadding = GetValue(config, 'space.slider', undefined);
            if (sliderPadding === undefined) {
                if (isScrollXYMode) {
                    sliderPadding = 0;
                } else {
                    childPadding = GetValue(config, 'space.child', 0);
                }
            }
        }

        var isNumberSliderPadding;
        if (childPadding === undefined) {
            isNumberSliderPadding = (typeof (sliderPadding) === 'number');
        } else {
            isNumberSliderPadding = (typeof (childPadding) === 'number');
        }

        if (isAxisY) {
            if (sliderPosition === 0) { // right
                column = 2;
                row = 1;

                if (childPadding === undefined) {
                    padding = (isNumberSliderPadding) ? { left: sliderPadding } : sliderPadding;
                } else {
                    padding = { left: GetValue(childPadding, 'right', childPadding) };
                }

            } else { // left
                column = 0;
                row = 1;

                if (childPadding === undefined) {
                    padding = (isNumberSliderPadding) ? { right: sliderPadding } : sliderPadding;
                } else {
                    padding = { right: GetValue(childPadding, 'left', childPadding) };
                }
            }

        } else {
            if (sliderPosition === 0) { // bottom
                column = 1;
                row = 2;

                if (childPadding === undefined) {
                    padding = (isNumberSliderPadding) ? { top: sliderPadding } : sliderPadding;
                } else {
                    padding = { top: GetValue(childPadding, 'bottom', childPadding) };
                }

            } else { // top
                column = 1;
                row = 0;

                if (childPadding === undefined) {
                    padding = (isNumberSliderPadding) ? { bottom: sliderPadding } : sliderPadding;
                } else {
                    padding = { bottom: GetValue(childPadding, 'top', childPadding) };
                }
            }
        }

        sliderParent.add(slider,
            {
                column: column,
                row: row,
                align: 'center',
                padding: padding,
                expand: true,
            }
        );

        topPatent[`hideUnscrollableSlider${axis}`] = GetValue(sliderConfig, 'hideUnscrollableSlider', false);
        topPatent[`disableUnscrollableDrag${axis}`] = GetValue(sliderConfig, 'disableUnscrollableDrag', false);
        topPatent[`adaptThumb${axis}SizeMode`] = GetValue(sliderConfig, 'adaptThumbSize', false);
        topPatent[`minThumb${axis}Size`] = GetValue(sliderConfig, 'minThumbSize', undefined);

    } else {
        topPatent[`hideUnscrollableSlider${axis}`] = false;
        topPatent[`disableUnscrollableDrag${axis}`] = false;
        topPatent[`adaptThumb${axis}SizeMode`] = false;
        topPatent[`minThumb${axis}Size`] = undefined;
    }

    // 0=gameObject, 1=rectBounds
    var scrollDetectionMode = GetValue(config, 'scrollDetectionMode');
    if (typeof (scrollDetectionMode) === 'string') {
        scrollDetectionMode = SCROLLDECTIONMODE_MAP[scrollDetectionMode];
    }

    var scrollerConfig, scroller;
    var scrollerConfigKey = `scroller${axis}`;
    if (isScrollXYMode) {
        scrollerConfig = GetValue(config, scrollerConfigKey, true);
    } else {
        if (config.hasOwnProperty(scrollerConfigKey)) {
            scrollerConfig = GetValue(config, scrollerConfigKey, true);
        } else {
            scrollerConfig = GetValue(config, 'scroller', true);
        }
    }

    if (scrollerConfig && child) {
        if (scrollerConfig === true) {
            scrollerConfig = {};
        }

        scrollerConfig.orientation = (isAxisY) ? 0 : 1;

        if (scrollDetectionMode !== undefined) {
            scrollerConfig.rectBoundsInteractive = (scrollDetectionMode === 1);
        }

        scroller = new Scroller(child, scrollerConfig);

        if (child.isRexContainerLite) {
            // Send touch detection sensor to back
            child.sendChildToBack(child);
        }
    }

    var mouseWheelScrollerConfig = GetValue(config, ((isScrollXYMode) ? `mouseWheelScroller${axis}` : 'mouseWheelScroller'), false),
        mouseWheelScroller;
    if (mouseWheelScrollerConfig && child) {
        if (scrollDetectionMode !== undefined) {
            mouseWheelScrollerConfig.focus = (scrollDetectionMode === 1) ? 2 : 0;
        }

        mouseWheelScroller = new MouseWheelScroller(child, mouseWheelScrollerConfig);
    }

    topPatent.addChildrenMap(`slider${axis}`, slider);
    topPatent.addChildrenMap(`scroller${axis}`, scroller);
    topPatent.addChildrenMap(`mouseWheelScroller${axis}`, mouseWheelScroller);

    if ((!isScrollXYMode) || (isAxisY)) {
        topPatent['hideUnscrollableSlider'] = topPatent[`hideUnscrollableSlider${axis}`];
        topPatent['disableUnscrollableDrag'] = topPatent[`disableUnscrollableDrag${axis}`];
        topPatent['adaptThumbSizeMode'] = topPatent[`adaptThumb${axis}SizeMode`];
        topPatent['minThumbSize'] = topPatent[`minThumb${axis}Size`];

        topPatent.addChildrenMap('slider', slider);
        topPatent.addChildrenMap('scroller', scroller);
        topPatent.addChildrenMap('mouseWheelScroller', mouseWheelScroller);
    }


    // Control
    if (slider) {
        var keyST, eventName;
        if (isScrollXYMode) {
            keyST = (isAxisY) ? 't' : 's';
            eventName = `scroll${axis}`;
        } else {
            keyST = 't';
            eventName = 'scroll';
        }
        slider
            .on('valuechange', function (newValue) {
                topPatent[keyST] = newValue;
                topPatent.emit(eventName, topPatent);
            });
    }

    if (scroller) {
        var keyChildOXY, eventName;
        if (isScrollXYMode) {
            keyChildOXY = `childO${axis}`;
            eventName = `scroll${axis}`;
        } else {
            keyChildOXY = 'childOY';
            eventName = 'scroll';
        }
        scroller
            .on('valuechange', function (newValue) {
                topPatent[keyChildOXY] = newValue;
                topPatent.emit(eventName, topPatent);
            })
    }

    if (mouseWheelScroller) {
        var methodAddChildOXY;
        if (isScrollXYMode) {
            methodAddChildOXY = `addChildO${axis}`;
        } else {
            methodAddChildOXY = 'addChildOY';
        }
        mouseWheelScroller
            .on('scroll', function (incValue) {
                topPatent[methodAddChildOXY](-incValue, true);
            });
    }
}

const SLIDER_POSITION_MAP = {
    right: 0,
    left: 1,
    bottom: 0,
    top: 1,
}

const SCROLLDECTIONMODE_MAP = {
    gameObject: 0,
    rectBounds: 1,
}

export default AddSlider;