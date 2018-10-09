var Offset = function (tileXY, OffsetTileX, OffsetTileY, out) {
    if (out === undefined) {
        out = tmp;
    }
    if ((OffsetTileX === 0) && (OffsetTileY === 0)) {
        out.x = tileXY.x;
        out.y = tileXY.y;
    } else {
        var resultTileXY = this.grid.offset(tileXY, OffsetTileX, OffsetTileY);
        out.x = resultTileXY.x;
        out.y = resultTileXY.y;
    }
    return out;
};

var tmp = {
    x: 0,
    y: 0
}
export default Offset;