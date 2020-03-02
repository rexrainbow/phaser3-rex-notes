import LineTo from './LineTo.js';
import DegToRad from '../../../utils/math/DegToRad.js';

var ArcTo = function (centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, out) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise) {
        endAngle += 360;
    }

    startAngle = DegToRad(startAngle);
    endAngle = DegToRad(endAngle);
    var x, y, angle;
    var step = (endAngle - startAngle) / iteration;
    for (var i = 0; i <= iteration; i++) {
        angle = startAngle + (step * i);
        x = centerX + (radiusX * Math.cos(angle));
        y = centerY + (radiusY * Math.sin(angle));
        LineTo(x, y, out);
    }
    return out;
}
export default ArcTo;