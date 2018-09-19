var HasEdgeBlocker = function (tileX, tileY, tileZ, direction) {
    var chess, blocker;
    if (tileZ === undefined) {
        var chess = this.TileXYZToChess(tileX, tileY, tileZ);
        if (chess === null) {
            return false;
        }
        return isEdgeBlocker(this.getChessData(chess).blocker);

    } else {
        chess = this.TileXYToChessArray(tileX, tileY, tmpChessArray);
        for (var i = 0, cnt = chess.length; i < cnt; i++) {
            if (isEdgeBlocker(this.getChessData(chess[i]).blocker)) {
                tmpChessArray.length = 0;
                return true;
            }
        }
        tmpChessArray.length = 0;
        return false;
    }
}

var isEdgeBlocker = function (blocker, direction) {
    if ((blocker === false) || (blocker === true)) {
        return blocker;
    } else {
        return (blocker[direction] === true);
    }
}

var tmpChessArray = [];

export default HasEdgeBlocker;