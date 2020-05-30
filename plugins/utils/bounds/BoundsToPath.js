var BoundsToPath = function (gameObject, out) {
    if (out === undefined) {
        var out = Create4Lines();
    }
    var lines = out.curves, line;
    // top-left -> top-right
    line = lines[0];
    gameObject.getTopLeft(line.p0);
    gameObject.getTopRight(line.p1);

    // top-right -> bottom-right
    CopyEndPoint(lines[1], line);
    line = lines[1];
    gameObject.getBottomRight(line.p1);

    // bottom-right -> bottom-left
    CopyEndPoint(lines[2], line);
    line = lines[2];
    gameObject.getBottomLeft(line.p1);

    // bottom-left -> top-left
    CopyEndPoint(lines[3], line);
    CopyStartPoint(lines[3], lines[0]);
    return out;
}

var Create4Lines = function () {
    var path = new Phaser.Curves.Path();
    for (var i = 0; i < 4; i++) {
        path.add(new Phaser.Curves.Line({ x: 0, y: 0 }, { x: 0, y: 0 }));
    }
    return path;
}

var CopyEndPoint = function (curLine, prevLine) {
    curLine.p0.x = prevLine.p1.x;
    curLine.p0.y = prevLine.p1.y;
}

var CopyStartPoint = function (curLine, prevLine) {
    curLine.p1.x = prevLine.p0.x;
    curLine.p1.y = prevLine.p0.y;
}

export default BoundsToPath;