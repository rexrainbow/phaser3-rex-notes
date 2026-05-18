var IsOverlappingPoint = function(worldX?: any, worldY?: any, tileZ?: any) {
    if (this.infinityMode && (tileZ === undefined)) {
        return true;
    }

    var out = this.worldXYToTileXY(worldX, worldY, true);
    return this.contains(out.x, out.y, tileZ);
}
export default IsOverlappingPoint;