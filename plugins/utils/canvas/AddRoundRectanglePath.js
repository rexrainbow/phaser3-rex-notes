import RoundRectangle from '../../geom/roundrectangle/RoundRectangle.js';

const DegToRad = Phaser.Math.DegToRad;
const Rad0 = DegToRad(0);
const Rad90 = DegToRad(90);
const Rad180 = DegToRad(180);
const Rad270 = DegToRad(270);

var AddRoundRectanglePath = function (context, x, y, width, height, radiusConfig, iteration) {
    var geom = new RoundRectangle(x, y, width, height, radiusConfig),
        minWidth = geom.minWidth,
        minHeight = geom.minHeight,
        scaleRX = (width >= minWidth) ? 1 : (width / minWidth),
        scaleRY = (height >= minHeight) ? 1 : (height / minHeight);

    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;

    context.save();
    context.beginPath();

    context.translate(x, y);

    // Bottom-right
    radius = cornerRadius.br;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = height - radiusY;
    context.moveTo(width, centerY);
    if ((radiusX > 0) && (radiusY > 0)) {
        ArcTo(context, centerX, centerY, radiusX, radiusY, Rad0, Rad90, iteration);
    } else {
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
    if ((radiusX > 0) && (radiusY > 0)) {
        ArcTo(context, centerX, centerY, radiusX, radiusY, Rad90, Rad180, iteration);
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
    if ((radiusX > 0) && (radiusY > 0)) {
        ArcTo(context, centerX, centerY, radiusX, radiusY, Rad180, Rad270, iteration);
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
    if ((radiusX > 0) && (radiusY > 0)) {
        ArcTo(context, centerX, centerY, radiusX, radiusY, Rad270, Rad0, iteration);
    } else {
        context.lineTo(width, 0);
        context.lineTo(width, centerY);
    }

    context.closePath();
    context.restore();
}

var ArcTo = function (context, centerX, centerY, radiusX, radiusY, startAngle, endAngle, iteration) {
    if (iteration == null) {  // undefined, or null
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle);
    } else {
        iteration += 1;
        var x, y, angle;
        var step = (endAngle - startAngle) / iteration;
        for (var i = 0; i <= iteration; i++) {
            angle = startAngle + (step * i);
            x = centerX + (radiusX * Math.cos(angle));
            y = centerY + (radiusY * Math.sin(angle));
            context.lineTo(x, y);
        }
    }
}

export default AddRoundRectanglePath;