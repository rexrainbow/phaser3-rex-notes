var WorldXYToChessArray = function(worldX?: any, worldY?: any, out?: any) {
    var tileXY = this.worldXYToTileXY(worldX, worldY, true);
    return this.tileXYToChessArray(tileXY.x, tileXY.y, out)
}

export default WorldXYToChessArray;