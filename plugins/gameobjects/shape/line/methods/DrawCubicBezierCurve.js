var DrawBezierCurve = function (line) {
    var points = this.points;
    var startPoint = points[0];
    var startX = startPoint.x;
    var startY = startPoint.y;

    var controlPoint0 = points[1];
    var cx0 = controlPoint0.x - startX;
    var cy0 = controlPoint0.y - startY;

    var controlPoint1 = points[2];
    var cx1 = controlPoint1.x - startX;
    var cy1 = controlPoint1.y - startY;

    var endPoint = points[3];
    var endX = endPoint.x - startX;
    var endY = endPoint.y - startY;

    line
        .startAt(0, 0)
        .cubicBezierTo(cx0, cy0, cx1, cy1, endX, endY)
        .end();

}

export default DrawBezierCurve;