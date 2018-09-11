'use strict'

var PointerToTileXY = function (pointer, out) {
    if (out === undefined) {
        out = tmpTileXY;
    }
    if (this.grid === undefined) {
        return out;
    }
    var worldX = pointer.x;
    var worldY = pointer.y;
    out.x = this.grid.getTileX(worldX, worldY);
    out.y = this.grid.getTileY(worldX, worldY);
    return out;
}
var tmpTileXY = {
    x: 0,
    y: 0
}

export default PointerToTileXY;