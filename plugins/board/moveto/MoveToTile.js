const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
var MoveToTile = function (tileX, tileY, direction) {
    var board = this.chessData.board;
    if (board === null) { // chess is not in a board
        this.lastMoveResult = false;
        return this;
    }

    if (IsPlainObject(tileX)) {
        var config = tileX;
        tileX = GetValue(config, 'x', undefined);
        tileY = GetValue(config, 'y', undefined);
        direction = GetValue(config, 'direction', undefined);
    }
    if (direction !== undefined) {
        var targetTileXY = board.getNeighborTileXY(this.chessData.tileXYZ, direction);
        if (targetTileXY !== null) {
            tileX = targetTileXY.x;
            tileY = targetTileXY.y;
        } else {
            tileX = null;
            tileY = null;
        }
    }

    // invalid tile position
    if ((tileX == null) || (tileY == null)) {
        this.lastMoveResult = false;
        return this;
    }
    if (direction === undefined) {
        direction = this.chessData.getTileDirection(tileX, tileY);
    }
    if (!this.canMoveTo(tileX, tileY, direction)) {
        this.lastMoveResult = false;
        return this;
    }
    this.destinationTileX = tileX;
    this.destinationTileY = tileY;
    this.destinationDirection = direction;
    var worldX = board.tileXYToWorldX(tileX, tileY);
    var worldY = board.tileXYToWorldY(tileX, tileY);
    board.moveChess(this.gameObject, tileX, tileY);
    this.moveToTask.moveTo(worldX, worldY);

    this.isRunning = true;
    this.lastMoveResult = true;    
    return this;
}

export default MoveToTile;