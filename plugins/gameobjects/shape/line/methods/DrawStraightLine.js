var DrawStraightLine = function (line) {
    var points = this.points;
    var pointsCount = points.length;
    var endPoint = points[pointsCount - 1];

    line
        .startAt(0, 0)
        .lineTo(endPoint.x, endPoint.y)
        .end();

}

export default DrawStraightLine;