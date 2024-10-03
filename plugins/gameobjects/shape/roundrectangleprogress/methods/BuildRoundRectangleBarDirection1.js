import IsArcCorner from '../../utils/IsArcCorner.js';

var RadToDeg = Phaser.Math.RadToDeg;

var BuildRoundRectangleBarDirection1 = function (
    lines,
    width, height, cornerRadius,
    value,
) {
    var barHeight = height * value;

    // Top-left
    var radius = cornerRadius.tl;
    if (IsArcCorner(radius)) {
        var theta;
        if (barHeight > radius.y) {
            theta = 90;
        } else {
            theta = RadToDeg(Math.acos((radius.y - barHeight) / radius.y));
        }
        var centerX = radius.x;
        var centerY = radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270 - theta, 270, false);
    } else {
        lines.lineTo(0, 0);
    }

    // Top-right
    var radius = cornerRadius.tr;
    if (IsArcCorner(radius)) {
        var theta;
        if (barHeight > radius.y) {
            theta = 90;
        } else {
            theta = RadToDeg(Math.acos((radius.y - barHeight) / radius.y));
        }
        var centerX = width - radius.x;
        var centerY = radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270, 270 + theta, false);
    } else {
        lines.lineTo(width, 0);
    }

    // Bottom-right
    var radius = cornerRadius.br;
    if (IsArcCorner(radius) && (barHeight > (height - radius.y))) {
        var theta = 90 - RadToDeg(Math.acos((barHeight - (height - radius.y)) / radius.y));
        var centerX = width - radius.x;
        var centerY = height - radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 0, 0 + theta, false);
    } else {
        lines.lineTo(width, barHeight);
    }

    // Bottom-left
    var radius = cornerRadius.bl;
    if (IsArcCorner(radius) && (barHeight > (height - radius.y))) {
        var theta = 90 - RadToDeg(Math.acos((barHeight - (height - radius.y)) / radius.y));
        var centerX = radius.x;
        var centerY = height - radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180 - theta, 180, false);
    } else {
        lines.lineTo(0, barHeight);
    }
}

export default BuildRoundRectangleBarDirection1;