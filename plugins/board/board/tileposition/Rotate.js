var Rotate = function (tileXY, direction, originTileXY, out) {
    if (originTileXY === undefined) {
        originTileXY = defaultOriginTileXY;
    }
    if (out === undefined) {
        out = {};
    }

    this.offset(tileXY, -originTileXY.x, -originTileXY.y, out);
    this.grid.rotate(out, direction, out);
    this.offset(out, originTileXY.x, originTileXY.y, out);
    return out;
};

var defaultOriginTileXY = {
    x: 0,
    y: 0
};
export default Rotate;