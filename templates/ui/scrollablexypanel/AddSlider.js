import Slider from '../scrollbar/ScrollBarWrap.js';
import Scroller from '../../../plugins/scroller.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddSlider = function (parent, axis, config) {
    axis = axis.toUpperCase();
    var isAxisX = (axis === 'X');

    var sliderConfig = GetValue(config, `slider${axis}`, undefined),
        slider;
    if (sliderConfig) {
        if (sliderConfig === true) {
            sliderConfig = {};
        }

        sliderConfig.orientation = (isAxisX) ? 0 : 1;
        slider = new Slider(parent.scene, sliderConfig);

        var column, row, padding;
        var sliderPosition = GetValue(sliderConfig, 'position', 0);
        if (typeof (sliderPosition) === 'string') {
            sliderPosition = SLIDER_POSITION_MAP[sliderPosition];
        }
        var sliderPadding = GetValue(config, 'space.slider', 0);
        if (isAxisX) {
            if (sliderPosition === 0) { // bottom
                column = 1;
                row = 2;
                padding = { top: sliderPadding };
            } else { // top
                column = 1;
                row = 0;
                padding = { bottom: sliderPadding };
            }

        } else {
            if (sliderPosition === 0) { // right
                column = 2;
                row = 1;
                padding = { left: sliderPadding };
            } else { // left
                column = 0;
                row = 1;
                padding = { right: sliderPadding };
            }
        }

        parent.add(slider,
            {
                column: column,
                row: row,
                align: 'center',
                padding: padding,
                expand: true,
                key: `slider${axis}`
            }
        );

        parent[`hideUnscrollableSlider${axis}`] = GetValue(sliderConfig, 'hideUnscrollableSlider', false);
        parent[`adaptThumb${axis}SizeMode`] = GetValue(sliderConfig, 'adaptThumbSize', false);
        parent[`minThumb${axis}Size`] = GetValue(sliderConfig, 'minThumbSize', undefined);

    } else {
        parent[`adaptThumb${axis}SizeMode`] = false;
        parent[`minThumb${axis}Size`] = undefined;
    }

    var scrollerConfig = GetValue(config, `scroller${axis}`, true),
        scroller;
    var panel = parent.childrenMap.panel;
    if (scrollerConfig && panel) {
        if (scrollerConfig === true) {
            scrollerConfig = {};
        }
        scrollerConfig.orientation = (isAxisX) ? 0 : 1;
        scroller = new Scroller(panel, scrollerConfig);
    }


    // Control
    if (slider) {
        var keyST = (isAxisX) ? 's' : 't';
        var eventName = `scroll${axis}`;
        slider
            .on('valuechange', function (newValue) {
                parent[keyST] = newValue;
                parent.emit(eventName, parent);
            });
    }

    if (scroller) {
        var keyChildOXY = `childO${axis}`;
        var eventName = `scroll${axis}`;
        scroller
            .on('valuechange', function (newValue) {
                parent[keyChildOXY] = newValue;
                parent.emit(eventName, parent);
            })
    }
}

var SLIDER_POSITION_MAP = {
    right: 0,
    left: 1,
    bottom: 0,
    top: 1,
}

export default AddSlider;