var GetNeighborTileXY = function (srcTileXY, direction, out) {
    if (out === undefined) {
        out = tmp;
    }
    var tileX = this.grid.getNeighborTileX(srcTileXY.x, srcTileXY.y, direction);
    var tileY = this.grid.getNeighborTileY(srcTileXY.x, srcTileXY.y, direction);
    var wrapTileX = this.getWrapTileX(tileX, tileY);
    var wrapTileY = this.getWrapTileY(tileX, tileY);
    if ((wrapTileX == null) || (wrapTileY == null)) {
        out = null;
    } else {
        out.x = wrapTileX;
        out.y = wrapTileY;
    }
    return out;
};

var tmp = {
    x: 0,
    y: 0
}
export default GetNeighborTileXY;