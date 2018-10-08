var ContainPoint = function (worldX, worldY) {
    var tileX = this.worldXYToTileX(worldX, worldY);
    var tileY = this.worldXYToTileY(worldX, worldY);
    return this.contains(tileX, tileY);
}
export default ContainPoint;