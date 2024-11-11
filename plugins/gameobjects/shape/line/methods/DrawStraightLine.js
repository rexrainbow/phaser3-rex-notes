var DrawStraightLine = function (line) {
    var points = this.points;
    var startPoint = points[0];
    var startX = startPoint.x;
    var startY = startPoint.y;


    var pointsCount = points.length;
    var endPoint = points[pointsCount - 1];
    var endX = endPoint.x - startX;
    var endY = endPoint.y - startY;

    line
        .startAt(0, 0)
        .lineTo(endX, endY)
        .end();

}

export default DrawStraightLine;