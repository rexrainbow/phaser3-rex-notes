const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
var MoveToTile = function (tileX, tileY, direction, speed) {
    var board = this.chessData.board;
    if (board === null) { // chess is not in a board
        return this;
    }

    if (IsPlainObject(tileX)) {
        var config = tileX;
        tileX = GetValue(config, 'x', undefined);
        tileY = GetValue(config, 'y', undefined);
        direction = GetValue(config, 'direction', undefined);
        speed = GetValue(config, 'speed', undefined);
    }

    // invalid tile position
    if ((tileX == null) || (tileY == null)) {
        return this;
    }
    if (direction === undefined) {
        direction = this.chessData.getTileDirection(tileX, tileY);
    }
    if (!this.canMoveTo(tileX, tileY, direction)) {
        return this;
    }
    this.destinationTileX = tileX;
    this.destinationTileY = tileY;
    this.destinationDirection = direction;
    var worldX = board.tileXYToWorldX(tileX, tileY);
    var worldY = board.tileXYToWorldY(tileX, tileY);
    if (speed !== undefined) {
        this.speed = speed;
    }
    board.moveChess(this.gameObject, tileX, tileY);
    this.moveToTask.moveTo(worldX, worldY);

    this.isRunning = true;
    return this;
}

export default MoveToTile;