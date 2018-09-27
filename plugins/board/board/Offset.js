var Offset = function (tileXYArray, offsetX, offsetY) {
    var grid = this.grid;
    var tileXY;

    if (offsetX === undefined) {
        var minX = undefined,
            minY = undefined;
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            tileXY = tileXYArray[i];
            if ((minX === undefined) || (tileXY.x < minX)) {
                minX = tileXY.x;
            }
            if ((minY === undefined) || (tileXY.y < minY)) {
                minY = tileXY.y;
            }
        }
        offsetX = -minX;
        offsetY = -minY
    }

    if ((offsetX !== 0) || (offsetY !== 0)) {
        var newTileXY;
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            tileXY = tileXYArray[i];
            newTileXY = grid.offset(tileXY, offsetX, offsetY);
            tileXY.x = newTileXY.x;
            tileXY.y = newTileXY.y;
        }
    }
    return tileXYArray;
};
export default Offset;