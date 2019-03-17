var WorldXYSnapToGrid = function (worldX, worldY, out) {
    if (out === undefined) {
        out = {};
    }
    var tileX = this.worldXYToTileX(worldX, worldY);
    var tileY = this.worldXYToTileY(worldX, worldY);
    out.x = this.tileXYToWorldX(tileX, tileY);
    out.y = this.tileXYToWorldY(tileX, tileY);
    return out;
};

export default WorldXYSnapToGrid;