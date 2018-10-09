var IsOverlappingPoint = function (worldX, worldY, tileZ) {
    if (this.infinityMode && (tileZ === undefined)) {
        return true;
    }

    var tileX = this.worldXYToTileX(worldX, worldY);
    var tileY = this.worldXYToTileY(worldX, worldY);
    return this.contains(tileX, tileY, tileZ);
}
export default IsOverlappingPoint;