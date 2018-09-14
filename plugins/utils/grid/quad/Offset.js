var Offset = function (srcTile, offsetTileX, offsetTileY, out) {
    if (out === undefined) {
        out = tmp;
    }
    var newTileX = srcTile.x + offsetTileX;
    var newTileY = srcTile.y + offsetTileY;
    // TODO: staggered?
    out.x = newTileX;
    out.y = newTileY;
    return out;
}
var tmp = {
    x: 0,
    y: 0
};
export default Offset;