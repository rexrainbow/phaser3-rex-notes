var DrawQuadraticBezierCurve = function (line) {
    var points = this.points;
    var controlPoint = points[1];
    var endPoint = points[2];

    line
        .startAt(0, 0)
        .quadraticBezierTo(
            controlPoint.x,
            controlPoint.y,
            endPoint.x, endPoint.y
        )
        .end();

}

export default DrawQuadraticBezierCurve;