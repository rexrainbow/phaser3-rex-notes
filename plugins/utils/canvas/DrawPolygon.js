var DrawPolygon = function (
    canvas, context,
    points,
    fillStyle, strokeStyle, lineWidth, lineJoin
) {

    if (lineJoin === undefined) {
        lineJoin = 'round';
    }
    context.beginPath();

    context.lineJoin = lineJoin;

    var point = points[0];

    context.moveTo(point.x, point.y);

    for (var i = 1, cnt = points.length; i < cnt; i++) {
        point = points[i];
        context.lineTo(point.x, point.y);
    }

    context.closePath();

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

export default DrawPolygon