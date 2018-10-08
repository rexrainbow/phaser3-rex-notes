var IsOverlappingPoint = function (worldX, worldY) {
    var gird = this.grid;
    gird.saveOrigin();
    gird.setOriginPosition(this.x, this.y);

    var tileX = this.board.worldXYToTileX(worldX, worldY);
    var tileY = this.board.worldXYToTileY(worldX, worldY);
    var chessTileXYZ;
    var isOverlapping = false;
    for (var uid in this.tileXYZMap) {
        chessTileXYZ = this.tileXYZMap[uid];
        if ((chessTileXYZ.x === tileX) && (chessTileXYZ.y === tileY)) {
            isOverlapping = true;
            break;
        }
    }

    gird.restoreOrigin();
    return isOverlapping;
}

export default IsOverlappingPoint;