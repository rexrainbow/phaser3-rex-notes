var DrawBezierCurve = function (line) {
    var points = this.points;
    var controlPoint0 = points[1];
    var controlPoint1 = points[2];
    var endPoint = points[3];

    line
        .startAt(0, 0)
        .cubicBezierTo(
            controlPoint0.x, controlPoint0.y, 
            controlPoint1.x, controlPoint1.y, 
            endPoint.x, endPoint.y
        )
        .end();

}

export default DrawBezierCurve;