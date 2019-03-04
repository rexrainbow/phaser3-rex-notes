var CanMoveToTile = function (tileX, tileY, direction) {
    var miniBoard = this.miniBoard;
    var mainBoard = miniBoard.mainBoard;
    // Not on a mainBoard
    if (mainBoard == null) {
        return false;
    }

    myTileXY.x = miniBoard.tileX;
    myTileXY.y = miniBoard.tileY;
    targetTileXY.x = tileX;
    targetTileXY.y = tileY;
    // Move to current position
    if ((targetTileXY.x === myTileXY.x) && (targetTileXY.y === myTileXY.y)) {
        return true;
    }

    miniBoard.pullOutFromMainBoard();
    // Can not put on main board
    if (!miniBoard.canPutOnMainBoard(mainBoard, targetTileXY.x, targetTileXY.y)) {
        miniBoard.putBack();
        return false;
    }

    // Custom moveable test
    if (this.moveableTestCallback) {
        if (direction === undefined) {
            direction = mainBoard.getNeighborTileDirection(myTileXY, targetTileXY);
        }
        targetTileXY.direction = direction;
        if (this.moveableTestScope) {
            var moveable = this.moveableTestCallback.call(this.moveableTestScope, myTileXYZ, targetTileXY, mainBoard);
        } else {
            var moveable = this.moveableTestCallback(myTileXYZ, targetTileXY, mainBoard);
        }
        if (!moveable) {
            miniBoard.putBack();
            return false;
        }
    }

    miniBoard.putBack();
    return true;
}

var myTileXY = {
    x: 0,
    y: 0
};
var targetTileXY = {
    x: 0,
    y: 0,
    direction: null
};

export default CanMoveToTile;