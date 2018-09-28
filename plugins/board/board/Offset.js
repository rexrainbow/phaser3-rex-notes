var Offset = function (tileXYArray, offsetX, offsetY) {
    if ((offsetX === 0) && (offsetY === 0)) {
        return tileXYArray;
    }
    var grid = this.grid;
    var tileXY, newTileXY;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        newTileXY = grid.offset(tileXY, offsetX, offsetY);
        tileXY.x = newTileXY.x;
        tileXY.y = newTileXY.y;
    }
    return tileXYArray;
};
export default Offset;