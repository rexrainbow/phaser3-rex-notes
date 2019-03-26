var IsOverlappingPoint = function (worldX, worldY, tileZ) {
    if (this.infinityMode && (tileZ === undefined)) {
        return true;
    }

    var out = this.wroldXYToTileXY(worldX, worldY, true);
    return this.contains(out.x, out.y, tileZ);
}
export default IsOverlappingPoint;