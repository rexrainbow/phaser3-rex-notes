var TileXYToWorldXY = function (tileX, tileY, out) {
    if (out === undefined) {
        out = tmp;
    }
    out.x = this.grid.getWorldX(tileX, tileY);
    out.y = this.grid.getWorldY(tileX, tileY);
    return out;
}

var tmp = {
    x: 0,
    y: 0
}
export default TileXYToWorldXY;