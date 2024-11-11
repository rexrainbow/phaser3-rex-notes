var DrawQuadraticBezierCurve = function (line) {
    var points = this.points;

    var startPoint = points[0];
    var startX = startPoint.x;
    var startY = startPoint.y;

    var controlPoint = points[1];
    var cx = controlPoint.x - startX;
    var cy = controlPoint.y - startY;

    var endPoint = points[2];
    var endX = endPoint.x - startX;
    var endY = endPoint.y - startY;

    line
        .startAt(0, 0)
        .quadraticBezierTo(cx, cy, endX, endY)
        .end();

}

export default DrawQuadraticBezierCurve;