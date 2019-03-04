var TileXYToWorldXY = function (tileX, tileY, out) {
    if (out === undefined) {
        out = {};
    }
    out.x = this.grid.getWorldX(tileX, tileY);
    out.y = this.grid.getWorldY(tileX, tileY);
    return out;
}
export default TileXYToWorldXY;