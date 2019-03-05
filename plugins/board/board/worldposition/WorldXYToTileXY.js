var WorldXYToTileXY = function (worldX, worldY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    out.x = this.grid.getTileX(worldX, worldY);
    out.y = this.grid.getTileY(worldX, worldY);
    return out;
}

var globTileXY = {};
export default WorldXYToTileXY;