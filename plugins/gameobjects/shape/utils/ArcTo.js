import LineTo from './LineTo.js';

const DegToRad = Phaser.Math.DegToRad;

var ArcTo = function (centerX, centerY, radius, startAngle, endAngle, antiClockWise, iteration, out) {
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
        x = centerX + (radius * Math.cos(angle));
        y = centerY + (radius * Math.sin(angle));
        LineTo(x, y, out);
    }
    return out;
}
export default ArcTo;