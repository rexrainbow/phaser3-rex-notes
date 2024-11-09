var DrawPolyLine = function (lines) {
    var points = this.points;
    var startPoint = points[0];
    var startX = startPoint.x;
    var startY = startPoint.y;
    lines.startAt(0, 0);

    for (var i = 1, cnt = points.length; i < cnt; i++) {
        var point = points[i];
        var x = point.x - startX;
        var y = point.y - startY;
        lines.lineTo(x, y);
    }

    lines.end();
}

export default DrawPolyLine;