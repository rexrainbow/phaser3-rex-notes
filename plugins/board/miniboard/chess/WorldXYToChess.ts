var WorldXYToChess = function(x?: any, y?: any, out?: any) {
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);
    var tileXY = this.board.worldXYToTileXY(x, y, true);
    var tileX = tileXY.x,
        tileY = tileXY.y;
    grid.restoreOrigin();

    var gameObjects = this.board.tileXYToChessArray(tileX, tileY, out);
    return gameObjects;
}

export default WorldXYToChess;