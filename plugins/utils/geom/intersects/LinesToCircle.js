const LineToCircle = Phaser.Geom.Intersects.LineToCircle;

const tmpLine = new Phaser.Geom.Line();

var LinesToCircle = function (points, circle) {
    tmpLine.x1 = points[0];
    tmpLine.y1 = points[1];
    for (var i = 2, cnt = points.length; i < cnt; i += 2) {
        tmpLine.x2 = points[i];
        tmpLine.y2 = points[i + 1];

        if (LineToCircle(tmpLine, circle)) {
            return true;
        }

        tmpLine.x1 = tmpLine.x2;
        tmpLine.y1 = tmpLine.y2;
    }

    return false;
}

export default LinesToCircle;