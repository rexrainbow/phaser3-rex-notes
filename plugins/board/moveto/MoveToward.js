var MoveToward = function (direction) {
    var myTileXYZ = this.chessData.tileXYZ;
    if (myTileXYZ == null) { // not in board
        return this;
    }
    var board = this.chessData.board;
    var targetTileXY = board.getNeighborTileXY(myTileXYZ, direction);
    if (targetTileXY === null) {
        this.lastMoveableResult = false;
        return this;
    }
    this.moveTo(targetTileXY.x, targetTileXY.y, direction);
    return this;
}
export default MoveToward;