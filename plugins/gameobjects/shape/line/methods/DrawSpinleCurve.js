var DrawSpinleCurve = function (line) {
    var points = this.points;
    var splinePoints = [];
    for (var i = 1, cnt = points.length; i < cnt; i++) {
        var point = points[i];
        splinePoints.push(point.x);
        splinePoints.push(point.y);
    }

    line
        .startAt(0, 0)
        .catmullRomTo(...splinePoints)
        .end();

}

export default DrawSpinleCurve;