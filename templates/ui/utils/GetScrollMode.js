import SCROLLMODE from './ScrollModeConst.js';

var GetScrollMode = function (config, key) {
    if (key === undefined) {
        key = 'scrollMode';
    }

    if (!config.hasOwnProperty(key)) {
        config[key] = GetDefaultScrollMode(config);
    }

    var scrollMode = config[key]
    if (typeof (scrollMode) === 'string') {
        scrollMode = SCROLLMODE[scrollMode];
    }

    return scrollMode;
}

var GetDefaultScrollMode = function (config) {
    var hasSliderY = (!!config.sliderY) || (!!config.scrollerY);
    var hasSliderX = (!!config.sliderX) || (!!config.scrollerX);
    var scrollMode;
    if (hasSliderY && hasSliderX) {
        scrollMode = 2;
    } else if (hasSliderY) {
        scrollMode = 0;
    } else if (hasSliderX) {
        scrollMode = 1;
    } else {
        scrollMode = 0;
    }
    return scrollMode;
}

export default GetScrollMode;