var MoveAway = function (tileX, tileY, moveAwayMode) {
    var board = this.chessData.board;
    if (board === null) { // chess is not in a board
        this.lastMoveResult = false;
        return this;
    }

    if (typeof (tileX) !== 'number') {
        var config = tileX;
        tileX = config.x;
        tileY = config.y;
    }
    targetTileXY.x = tileX;
    targetTileXY.y = tileY;
    if (moveAwayMode === undefined) {
        moveAwayMode = true;
    }

    var myTileXYZ = this.chessData.tileXYZ,
        chessInfo, direction;
    var directions = board.grid.allDirections;
    // Initial chess info of each neighbor and current tile position
    if (globChessInfo.length !== (directions.length + 1)) {
        globChessInfo.length = 0;
        // Neighbors
        for (var i = 0, cnt = directions.length; i < cnt; i++) {
            globChessInfo.push({
                direction: i
            });
        }
        // current tile position
        globChessInfo.push({
            direction: null
        });
    }
    // Get tileXY and distance of each neighbor and current tile position
    var out;
    for (var i = 0, cnt = globChessInfo.length; i < cnt; i++) {
        chessInfo = globChessInfo[i];
        direction = chessInfo.direction;
        if (direction === null) { // Current tile position
            chessInfo.x = myTileXYZ.x;
            chessInfo.y = myTileXYZ.y;
        } else { // Neighobrs
            out = board.getNeighborTileXY(myTileXYZ, direction, chessInfo);
            if (out === null) { // Invalid neighbor tile position
                chessInfo.x = null;
                chessInfo.y = null;
                chessInfo.distance = null;
                continue;
            }
        }
        chessInfo.distance = board.getDistance(chessInfo, targetTileXY, true);
    }
    var previousDirection = this.destinationDirection;
    // Sort chess info
    globChessInfo.sort(function (infoA, infoB) {
        // Invalid tile position
        if (infoA.distance === null) {
            return 1;
        }
        if (infoB.distance === null) {
            return -1;
        }

        if (infoA.distance > infoB.distance) {
            return (moveAwayMode) ? -1 : 1;
        }
        if (infoA.distance < infoB.distance) {
            return (moveAwayMode) ? 1 : -1;
        }

        // Equal-to case
        // Diagonal
        if (infoA.direction === previousDirection) {
            return 1;
        }
        if (infoB.direction === previousDirection) {
            return -1;
        }
        // Current tile position
        if (infoA.direction === null) {
            return 1;
        }
        if (infoB.direction === null) {
            return -1;
        }
        return 0;
    });
    // Try move to neighbor, or current tile position
    for (var i = 0, cnt = globChessInfo.length; i < cnt; i++) {
        chessInfo = globChessInfo[i];
        if (chessInfo.distance === null) { // Invalid tile position
            return this;
        }
        this.moveTo(chessInfo);
        if (this.lastMoveResult) {
            return this;
        }
    }
    return this;
}

var targetTileXY = {
    x: 0,
    y: 0
}
var globChessInfo = [];
export default MoveAway;