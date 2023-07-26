import CreateScrollbar from './CreateScrollbar.js';
import Scroller from '../../../../plugins/scroller.js';
import MouseWheelScroller from '../../../../plugins/input/mousewheelscroller/MouseWheelScroller.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddSlider = function (topPatent, sliderParent, axis, config) {
    axis = axis.toUpperCase();
    var isAxisY = (axis === 'Y');
    var isScrollXYMode = (topPatent.scrollMode === 2);
    var child = topPatent.childrenMap.child;

    var sliderConfig = GetValue(config, (isScrollXYMode) ? `slider${axis}` : 'slider', undefined),
        slider;
    if (sliderConfig) {
        if (sliderConfig === true) {
            sliderConfig = {};
        }

        sliderConfig.orientation = (isAxisY) ? 1 : 0;
        slider = CreateScrollbar(topPatent.scene, sliderConfig);

        var column, row, padding;

        var sliderPosition = GetValue(sliderConfig, 'position', 0);
        if (typeof (sliderPosition) === 'string') {
            sliderPosition = SLIDER_POSITION_MAP[sliderPosition];
        }

        var sliderPadding = GetValue(config, `space.slider${axis}`, undefined);
        if (sliderPadding === undefined) {
            sliderPadding = GetValue(config, 'space.slider', 0);
        }
        var isNumberSliderPadding = (typeof (sliderPadding) === 'number');

        if (isAxisY) {
            if (sliderPosition === 0) { // right
                column = 2;
                row = 1;
                padding = (isNumberSliderPadding) ? { left: sliderPadding } : sliderPadding;
            } else { // left
                column = 0;
                row = 1;
                padding = (isNumberSliderPadding) ? { right: sliderPadding } : sliderPadding;
            }

        } else {
            if (sliderPosition === 0) { // bottom
                column = 1;
                row = 2;
                padding = (isNumberSliderPadding) ? { top: sliderPadding } : sliderPadding;
            } else { // top
                column = 1;
                row = 0;
                padding = (isNumberSliderPadding) ? { bottom: sliderPadding } : sliderPadding;
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
        topPatent[`adaptThumb${axis}SizeMode`] = GetValue(sliderConfig, 'adaptThumbSize', false);
        topPatent[`minThumb${axis}Size`] = GetValue(sliderConfig, 'minThumbSize', undefined);

    } else {
        topPatent[`hideUnscrollableSlider${axis}`] = false;
        topPatent[`adaptThumb${axis}SizeMode`] = false;
        topPatent[`minThumb${axis}Size`] = undefined;
    }

    var scrollerConfig = GetValue(config, (isScrollXYMode) ? `scroller${axis}` : 'scroller', true),
        scroller;

    if (scrollerConfig && child) {
        if (scrollerConfig === true) {
            scrollerConfig = {};
        }
        scrollerConfig.orientation = (isAxisY) ? 1 : 0;
        scroller = new Scroller(child, scrollerConfig);
    }

    var mouseWheelScrollerConfig = GetValue(config, (isScrollXYMode) ? `mouseWheelScroller${axis}` : 'mouseWheelScroller', false),
        mouseWheelScroller;
    if (mouseWheelScrollerConfig && child) {
        mouseWheelScroller = new MouseWheelScroller(child, mouseWheelScrollerConfig);
    }

    topPatent.addChildrenMap(`slider${axis}`, slider);
    topPatent.addChildrenMap(`scroller${axis}`, scroller);
    topPatent.addChildrenMap(`mouseWheelScroller${axis}`, mouseWheelScroller);

    if ((!isScrollXYMode) || (isAxisY)) {
        topPatent['hideUnscrollableSlider'] = topPatent[`hideUnscrollableSlider${axis}`];
        topPatent['adaptThumbSizeMode'] = topPatent[`adaptThumb${axis}SizeMode`];
        topPatent['minThumbSize'] = topPatent[`minThumb${axis}Size`];

        topPatent.addChildrenMap('slider', slider);
        topPatent.addChildrenMap('scroller', scroller);
        topPatent.addChildrenMap('mouseWheelScroller', mouseWheelScroller);
    }


    // Control
    if (slider) {
        var keyST = (isAxisY) ? 't' : 's';
        var eventName = `scroll${axis}`;
        slider
            .on('valuechange', function (newValue) {
                topPatent[keyST] = newValue;
                topPatent.emit(eventName, topPatent);
            });
    }

    if (scroller) {
        var keyChildOXY = `childO${axis}`;
        var eventName = `scroll${axis}`;
        scroller
            .on('valuechange', function (newValue) {
                topPatent[keyChildOXY] = newValue;
                topPatent.emit(eventName, topPatent);
            })
    }

    if (mouseWheelScroller) {
        var methodAddChildOXY = `addChildO${axis}`;
        mouseWheelScroller
            .on('scroll', function (incValue) {
                topPatent[methodAddChildOXY](-incValue, true);
            });
    }
}

var SLIDER_POSITION_MAP = {
    right: 0,
    left: 1,
    bottom: 0,
    top: 1,
}

export default AddSlider;