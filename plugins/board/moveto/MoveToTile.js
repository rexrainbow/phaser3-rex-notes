import GetValue from '../../utils/object/GetValue.js';

var MoveToTile = function (tileX, tileY, direction) {
    var board = this.chessData.board;
    if (board === null) { // chess is not in a board
        this.lastMoveResult = false;
        return this;
    }

    if ((tileX != null) && (typeof (tileX) !== 'number')) {
        var config = tileX;
        tileX = GetValue(config, 'x', undefined);
        tileY = GetValue(config, 'y', undefined);
        direction = GetValue(config, 'direction', undefined);
    }
    var myTileXYZ = this.chessData.tileXYZ;
    if ((direction !== undefined) &&
        (tileX == null) || (tileY == null)) {
        // Get neighbor tile position if direction is not undefined
        var targetTileXY = board.getNeighborTileXY(myTileXYZ, direction);
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
        tmpTileXYZ.x = tileX;
        tmpTileXYZ.y = tileY
        direction = board.getNeighborTileDirection(myTileXYZ, tmpTileXYZ);
    }
    if (!this.canMoveTo(tileX, tileY, direction)) {
        this.lastMoveResult = false;
        return this;
    }
    this.destinationTileX = tileX;
    this.destinationTileY = tileY;
    this.destinationDirection = direction;

    if (board.wrapMode && (direction !== null)) {
        var originNeighborTileX = board.grid.getNeighborTileX(myTileXYZ.x, myTileXYZ.y, direction);
        var originNeighborTileY = board.grid.getNeighborTileY(myTileXYZ.x, myTileXYZ.y, direction);
        // wrap mode && neighbor
        if ((originNeighborTileX === tileX) && (originNeighborTileY === tileY)) {
            // not a wrapped neighbor
            var worldX = board.tileXYToWorldX(tileX, tileY);
            var worldY = board.tileXYToWorldY(tileX, tileY);
            this.moveAlongLine(undefined, undefined, worldX, worldY);
        } else {
            // wrapped neighbor
            // line 0
            var originNeighborWorldX = board.tileXYToWorldX(originNeighborTileX, originNeighborTileY);
            var originNeighborWorldY = board.tileXYToWorldY(originNeighborTileX, originNeighborTileY);
            var startX = board.tileXYToWorldX(myTileXYZ.x, myTileXYZ.y);
            var startY = board.tileXYToWorldY(myTileXYZ.x, myTileXYZ.y);
            var endX = (startX + originNeighborWorldX) / 2;
            var endY = (startY + originNeighborWorldY) / 2;
            this.moveAlongLine(undefined, undefined, endX, endY);
            // line 1
            var oppositeDirection = board.getOppositeDirection(tileX, tileY, direction);
            originNeighborTileX = board.grid.getNeighborTileX(tileX, tileY, oppositeDirection);
            originNeighborTileY = board.grid.getNeighborTileY(tileX, tileY, oppositeDirection);
            originNeighborWorldX = board.tileXYToWorldX(originNeighborTileX, originNeighborTileY);
            originNeighborWorldY = board.tileXYToWorldY(originNeighborTileX, originNeighborTileY);
            endX = board.tileXYToWorldX(tileX, tileY);
            endY = board.tileXYToWorldY(tileX, tileY);
            startX = (originNeighborWorldX + endX) / 2;
            startY = (originNeighborWorldY + endY) / 2;
            this.addMoveLine(startX, startY, endX, endY);
        }
    } else {
        var worldX = board.tileXYToWorldX(tileX, tileY);
        var worldY = board.tileXYToWorldY(tileX, tileY);
        this.moveAlongLine(undefined, undefined, worldX, worldY);
    }
    board.moveChess(this.gameObject, tileX, tileY);

    this.isRunning = true;
    this.lastMoveResult = true;
    return this;
}

var tmpTileXYZ = {
    x: 0,
    y: 0
};

export default MoveToTile;