var DrawCircle = function (canvas, context, x, y, rx, ry, fillStyle, strokeStyle, lineWidth) {

    context.beginPath();

    context.ellipse(x, y, rx, ry, 0, 0, (2 * Math.PI));

    if (fillStyle != null) {
        context.fillStyle = fillStyle;
        context.fill();
    }

    if (strokeStyle != null) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }
}

export default DrawCircle;