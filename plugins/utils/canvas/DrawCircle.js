var DrawCircle = function (canvas, context, x, y, rx, ry, fillStyle, strokeStyle, lineWidth) {

    context.beginPath();

    context.ellipse(x, y, rx, ry, 0, 0, (2 * Math.PI));

    if (fillStyle !== undefined) {
        context.fillStyle = fillStyle;
        context.fill();
    }

    if (strokeStyle !== undefined) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }
}

export default DrawCircle;