var DrawSpinleCurve = function (line) {
    var points = this.points;
    var startPoint = points[0];
    var startX = startPoint.x;
    var startY = startPoint.y;

    var splinePoints = [];
    for (var i = 1, cnt = points.length; i < cnt; i ++) {
        var point = points[i];
        splinePoints.push(point.x - startX);
        splinePoints.push(point.y - startY);
    }

    line
        .startAt(0, 0)
        .catmullRomTo(...splinePoints)
        .end();

}

export default DrawSpinleCurve;