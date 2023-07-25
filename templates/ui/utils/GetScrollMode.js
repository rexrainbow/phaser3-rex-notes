import SCROLLMODE from './ScrollModeConst.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var GetScrollMode = function (config, key, defaultValue) {
    if (key === undefined) {
        key = 'scrollMode';
    }
    if (defaultValue === undefined) {
        defaultValue = 0; // Vertical
    }
    var scrollMode = GetValue(config, key, defaultValue);
    if (typeof (scrollMode) === 'string') {
        scrollMode = SCROLLMODE[scrollMode];
    }
    return scrollMode;
}
export default GetScrollMode;