var Rotate = function (tileXY, direction, originTileXY, out) {
    if (out === undefined) {
        out = tmp;
    }
    if (originTileXY === undefined) {
        originTileXY = defaultOriginTileXY;
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
var tmp = {
    x: 0,
    y: 0
};
export default Rotate;