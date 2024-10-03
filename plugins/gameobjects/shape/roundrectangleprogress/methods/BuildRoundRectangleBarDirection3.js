import IsArcCorner from '../../utils/IsArcCorner.js';

var RadToDeg = Phaser.Math.RadToDeg;

var BuildRoundRectangleBarDirection3 = function (
    lines,
    width, height, cornerRadius,
    value,
) {
    var barHeight = height * value;

    // Bottom-right
    var radius = cornerRadius.br;
    if (IsArcCorner(radius)) {
        if (barHeight > radius.y) {
            theta = 90;
        } else {
            theta = RadToDeg(Math.acos((radius.y - barHeight) / radius.y));
        }
        var centerX = width - radius.x;
        var centerY = height - radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90 - theta, 90, false);
    } else {
        lines.lineTo(width, height);
    }

    // Bottom-left
    var radius = cornerRadius.bl;
    if (IsArcCorner(radius)) {
        if (barHeight > radius.y) {
            theta = 90;
        } else {
            theta = RadToDeg(Math.acos((radius.y - barHeight) / radius.y));
        }
        var centerX = radius.x;
        var centerY = height - radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90, 90 + theta, false);
    } else {
        lines.lineTo(0, height);
    }

    // Top-left
    var radius = cornerRadius.tl;
    if (IsArcCorner(radius) && (barHeight > (height - radius.y))) {
        var theta = 90 - RadToDeg(Math.acos((barHeight - (height - radius.y)) / radius.y));
        var centerX = radius.x;
        var centerY = radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180, 180 + theta, false);
    } else {
        lines.lineTo(0, height - barHeight);
    }

    // Top-right
    var radius = cornerRadius.tr;
    if (IsArcCorner(radius) && (barHeight > (height - radius.y))) {
        var theta = 90 - RadToDeg(Math.acos((barHeight - (height - radius.y)) / radius.y));
        var centerX = width - radius.x;
        var centerY = radius.y;
        lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 360 - theta, 360, false);
    } else {
        lines.lineTo(width, height - barHeight);
    }

}

export default BuildRoundRectangleBarDirection3;