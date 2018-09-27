var GetMaxTileXY = function (tileXYArray, out) {
    if (out === undefined) {
        out = tmp;
    }
    var maxX = undefined,
        maxY = undefined;
    var tileXY;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        if ((maxX === undefined) || (tileXY.x > maxX)) {
            maxX = tileXY.x;
        }
        if ((maxY === undefined) || (tileXY.y > maxY)) {
            maxY = tileXY.y;
        }
    }
    out.x = maxX;
    out.y = maxY;
    return out;
}

var tmp = {
    x: 0,
    y: 0
}

export default GetMaxTileXY;