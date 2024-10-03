import IsArcCorner from '../../utils/IsArcCorner.js';

var RadToDeg = Phaser.Math.RadToDeg;

var BuildRoundRectangleBarDirection2 = function (
    lines,
    width, height, cornerRadius,
    value,
) {
    var barWidth = width * value;

    // Top-right
    var radius = cornerRadius.tr;
    if (IsArcCorner(radius)) {
        var theta;
        if (barWidth > radius.x) {
            theta = 90;
        } else {
            theta = RadToDeg(Math.acos((radius.x - barWidth) / radius.x));
        }
        var centerX = width - radius.x;
        var centerY = radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 360 - theta, 360, false);
    } else {
        lines.lineTo(width, 0);
    }

    // Bottom-right
    var radius = cornerRadius.br;
    if (IsArcCorner(radius)) {
        var theta;
        if (barWidth > radius.x) {
            theta = 90;
        } else {
            theta = RadToDeg(Math.acos((radius.x - barWidth) / radius.x));
        }
        var centerX = width - radius.x;
        var centerY = height - radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 0, 0 + theta, false);
    } else {
        lines.lineTo(width, height);
    }

    // Bottom-left
    var radius = cornerRadius.bl;
    if (IsArcCorner(radius) && (barWidth > (width - radius.x))) {
        var theta = 90 - RadToDeg(Math.acos((barWidth - (width - radius.x)) / radius.x));
        var centerX = radius.x;
        var centerY = height - radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90, 90 + theta, false);
    } else {
        lines.lineTo(width - barWidth, height);
    }

    // Top-left
    var radius = cornerRadius.tl;
    if (IsArcCorner(radius) && (barWidth > (width - radius.x))) {
        var theta = 90 - RadToDeg(Math.acos((barWidth - (width - radius.x)) / radius.x));
        var centerX = radius.x;
        var centerY = radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270 - theta, 270, false);
    } else {
        lines.lineTo(width - barWidth, 0);
    }

}

export default BuildRoundRectangleBarDirection2;