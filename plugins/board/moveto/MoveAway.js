var MoveAway = function (tileX, tileY) {
    var board = this.chessData.board;
    if (board === null) { // chess is not in a board
        this.lastMoveResult = false;
        return this;
    }

    if (typeof (tileX) === 'number') {
        targetTileXY.x = tileX;
        targetTileXY.y = tileY;
    } else {
        var tileXY = tileX;
        targetTileXY.x = tileXY.x;
        targetTileXY.y = tileXY.y;
    }

    var myTileXYZ = this.chessData.tileXYZ,
        chessInfo, direction;
    var directions = board.grid.allDirections;
    // Initial chess info of each neighbor and current tile position
    if (tmpChessInfo.length !== (directions.length + 1)) {
        tmpChessInfo.length = 0;
        // Neighbors
        for (var i = 0, cnt = directions.length; i < cnt; i++) {
            tmpChessInfo.push({
                direction: i
            });
        }
        // current tile position
        tmpChessInfo.push({
            direction: null
        });
    }
    // Get tileXY and distance of each neighbor and current tile position
    var out;
    for (var i = 0, cnt = tmpChessInfo.length; i < cnt; i++) {
        chessInfo = tmpChessInfo[i];
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
    // Sort chess info
    tmpChessInfo.sort(function (infoA, infoB) {
        return (infoA.distance === null) ? 1 :
            (infoB.distance === null) ? -1 :
            (infoA.distance > infoB.distance) ? -1 :
            (infoA.distance < infoB.distance) ? 1 :
            // Equal-to case
            (infoA.direction === null) ? 1 :
            (infoB.direction === null) ? -1 :
            0;
    });
    // Find moveable neighbor, or don't move (current tile position)
    for (var i = 0, cnt = tmpChessInfo.length; i < cnt; i++) {
        chessInfo = tmpChessInfo[i];
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
var tmpChessInfo = [];
export default MoveAway;