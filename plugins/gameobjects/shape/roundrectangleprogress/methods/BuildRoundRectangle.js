import IsArcCorner from '../../utils/IsArcCorner.js';

var BuildRoundRectangle = function (
    lines,
    width, height, cornerRadius,
    iteration
) {

    lines
        .setIterations(iteration)
        .start()

    // Top-left
    var radius = cornerRadius.tl;
    if (IsArcCorner(radius)) {
        if (radius.convex) {
            var centerX = radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180, 270, false);
        } else {
            var centerX = 0;
            var centerY = 0;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90, 0, true);
        }
    } else {
        lines.lineTo(0, 0);
    }

    // Top-right
    var radius = cornerRadius.tr;
    if (IsArcCorner(radius)) {
        if (radius.convex) {
            var centerX = width - radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270, 360, false);
        } else {
            var centerX = width;
            var centerY = 0;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180, 90, true);
        }
    } else {
        lines.lineTo(width, 0);
    }

    // Bottom-right
    var radius = cornerRadius.br;
    if (IsArcCorner(radius)) {
        if (radius.convex) {
            var centerX = width - radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 0, 90, false);
        } else {
            var centerX = width;
            var centerY = height;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270, 180, true);
        }
    } else {
        lines.lineTo(width, height);
    }

    // Bottom-left
    var radius = cornerRadius.bl;
    if (IsArcCorner(radius)) {
        if (radius.convex) {
            var centerX = radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90, 180, false);
        } else {
            var centerX = 0;
            var centerY = height;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 360, 270, true);
        }
    } else {
        lines.lineTo(0, height);
    }

    lines.close();

    return lines;
}



export default BuildRoundRectangle;