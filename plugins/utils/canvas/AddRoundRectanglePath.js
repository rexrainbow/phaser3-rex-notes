import RoundRectangle from '../../geom/roundrectangle/RoundRectangle.js';

const DegToRad = Phaser.Math.DegToRad;
const Rad0 = DegToRad(0);
const Rad90 = DegToRad(90);
const Rad180 = DegToRad(180);
const Rad270 = DegToRad(270);

var AddRoundRectanglePath = function (context, x, y, width, height, radiusConfig) {
    var geom = new RoundRectangle(x, y, width, height, radiusConfig),
        minWidth = geom.minWidth,
        minHeight = geom.minHeight,
        scaleRX = (width >= minWidth) ? 1 : (width / minWidth),
        scaleRY = (height >= minHeight) ? 1 : (height / minHeight);

    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;

    context.beginPath();

    context.translate(x, y);

    // Bottom-right
    radius = cornerRadius.br;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = height - radiusY;
    if (IsArcCorner(radius) && (radiusX >= 0) && (radiusY >= 0)) {
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, Rad0, Rad90);
    } else {
        context.moveTo(width, centerY);
        context.lineTo(width, height);
        context.lineTo(centerX, height);
    }

    // Bottom-left
    radius = cornerRadius.bl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = height - radiusY;
    context.lineTo(radiusX, height);
    if (IsArcCorner(radius) && (radiusX >= 0) && (radiusY >= 0)) {
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, Rad90, Rad180);
    } else {
        context.lineTo(0, height);
        context.lineTo(0, centerY);
    }

    // Top-left
    radius = cornerRadius.tl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = radiusY;
    context.lineTo(0, centerY);
    if (IsArcCorner(radius) && (radiusX >= 0) && (radiusY >= 0)) {
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, Rad180, Rad270);
    } else {
        context.lineTo(0, 0);
        context.lineTo(centerX, 0);
    }

    // Top-right
    radius = cornerRadius.tr;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = radiusY;
    context.lineTo(centerX, 0);
    if (IsArcCorner(radius) && (radiusX >= 0) && (radiusY >= 0)) {
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, Rad270, Rad0);
    } else {
        context.lineTo(width, 0);
        context.lineTo(width, centerY);
    }

    context.closePath();
}

var IsArcCorner = function (radius) {
    return ((radius.x !== 0) && (radius.y !== 0));
}

export default AddRoundRectanglePath;