var WorldXYToTileXY = function (worldX, worldY, out) {
    if (out === undefined) {
        out = {};
    }
    out.x = this.grid.getTileX(worldX, worldY);
    out.y = this.grid.getTileY(worldX, worldY);
    return out;
}

export default WorldXYToTileXY;