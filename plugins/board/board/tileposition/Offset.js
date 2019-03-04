var Offset = function (tileXY, OffsetTileX, OffsetTileY, out) {
    if (out === undefined) {
        out = {};
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

export default Offset;