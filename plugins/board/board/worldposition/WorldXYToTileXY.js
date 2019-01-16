var WorldXYToTileXY = function (worldX, worldY, out) {
    if (out === undefined) {
        out = tmp;
    }
    out.x = this.grid.getTileX(worldX, worldY);
    out.y = this.grid.getTileY(worldX, worldY);
    return out;
}

var tmp = {
    x: 0,
    y: 0
}
export default WorldXYToTileXY;