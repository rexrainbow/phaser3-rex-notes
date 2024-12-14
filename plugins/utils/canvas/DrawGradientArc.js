import ColorStringToInteger from '../color/ColorStringToInteger.js';
import { GetRGB } from '../color/GetRGB.js';

const DegToRad = Phaser.Math.DegToRad;
const Linear = Phaser.Math.Linear;

var DrawGradientArc = function (
    canvas, context,
    x, y,
    rx, ry,
    startColor, endColor, lineWidth,
    startAngle, endAngle, anticlockwise, AngleStepDeg
) {

    if (startAngle === undefined) {
        startAngle = 0;
    }
    if (endAngle === undefined) {
        endAngle = 2 * Math.PI;
    }
    if (anticlockwise === undefined) {
        anticlockwise = false;
    }
    if (AngleStepDeg === undefined) {
        AngleStepDeg = 2;
    }

    startColor = ColorStringToInteger(startColor);
    endColor = ColorStringToInteger(endColor);

    StartRGB = GetRGB(startColor, StartRGB);
    EndRGB = GetRGB(endColor, EndRGB);

    var angleStep = DegToRad(AngleStepDeg);

    var totalAngle;
    if (anticlockwise) {
        totalAngle = startAngle - endAngle;
    } else {
        totalAngle = endAngle - startAngle;
    }
    if (totalAngle < 0) {
        totalAngle += 2 * Math.PI;
    }
    var segments = Math.ceil(totalAngle / angleStep);
    var deltaAngle = totalAngle / segments;
    if (anticlockwise) {
        deltaAngle = -deltaAngle;
    }

    for (var i = 0; i < segments; i++) {
        var t = i / segments;
        var r = Math.round(Linear(StartRGB.r, EndRGB.r, t));
        var g = Math.round(Linear(StartRGB.g, EndRGB.g, t));
        var b = Math.round(Linear(StartRGB.b, EndRGB.b, t));
        var segmentStartAngle = startAngle + (i * deltaAngle);
        var segmentEndAngle = segmentStartAngle + deltaAngle;

        // Overlap segment except last segment
        if (i < segments - 1) {
            segmentEndAngle += (deltaAngle / 2);
        }

        context.beginPath();
        context.ellipse(x, y, rx, ry, 0, segmentStartAngle, segmentEndAngle, anticlockwise);
        context.strokeStyle = `rgb(${r},${g},${b})`;
        context.lineWidth = lineWidth;
        context.stroke();
    }
}

var StartRGB;
var EndRGB;

export default DrawGradientArc;