var GetAABB = function (tileXYMap, out) {
    if (out === undefined) {
        out = tmpOut;
    }

    var tileXY;
    for (var i in tileXYMap) {
        tileXY = tileXYMap[i];
        minX = Math.min(minX, tileXY.x);
        minY = Math.min(minY, tileXY.y);
        maxX = Math.max(maxX, tileXY.x);
        maxY = Math.max(maxY, tileXY.y);
    }

    out.x = minX;
    out.y = minY;
    out.width = maxX - minX;
    out.height = maxY - minY;
}

var tmpOut = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
}

export default GetAABB;