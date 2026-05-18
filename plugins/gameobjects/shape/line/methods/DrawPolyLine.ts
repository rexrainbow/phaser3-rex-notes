var DrawPolyLine = function(line?: any) {
    var points = this.points;
    line.startAt(0, 0);

    for (var i = 1, cnt = points.length; i < cnt; i++) {
        var point = points[i];
        line.lineTo(point.x, point.y);
    }

    line.end();
}

export default DrawPolyLine;