const Rectangle = Phaser.Geom.Rectangle;

var GetBounds = function (points, out) {
    if (out === undefined) {
        out = new Rectangle();
    } else if (out === true) {
        out = GlobalBounds;
    }

    var minX = Infinity;
    var minY = Infinity;
    var maxX = -minX;
    var maxY = -minY;

    for (var i = 0, cnt = points.length; i < cnt; i += 2) {
        var x = points[i];
        var y = points[i + 1];

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }

    out.x = minX;
    out.y = minY;
    out.width = maxX - minX;
    out.height = maxY - minY;

    return out;
}

var GlobalBounds = new Rectangle();

export default GetBounds;