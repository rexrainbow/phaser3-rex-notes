import BuildRoundRectangle from './BuildRoundRectangle.js';
import BuildRoundRectangleBarDirection0 from './BuildRoundRectangleBarDirection0.js';
import BuildRoundRectangleBarDirection1 from './BuildRoundRectangleBarDirection1.js';
import BuildRoundRectangleBarDirection2 from './BuildRoundRectangleBarDirection2.js';
import BuildRoundRectangleBarDirection3 from './BuildRoundRectangleBarDirection3.js';

var BuildRoundRectangleBar = function (
    lines,
    width, height, cornerRadius,
    value, orientation, rtl,
    iteration
) {

    lines
        .setIterations(iteration)
        .start()

    if (value === 0) {
        return lines;
    } else if (value === 1) {
        return BuildRoundRectangle(lines, width, height, cornerRadius, iteration);
    }

    var callback;
    if (orientation === 0) {
        callback = (rtl) ? BuildRoundRectangleBarDirection2 : BuildRoundRectangleBarDirection0;
    } else {
        callback = (rtl) ? BuildRoundRectangleBarDirection3 : BuildRoundRectangleBarDirection1;
    }

    callback(lines, width, height, cornerRadius, value);

    lines.close();

    return lines;
}

export default BuildRoundRectangleBar;