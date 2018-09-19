var HasBlocker = function (tileX, tileY, tileZ) {
    var chess, blocker;
    if (tileZ === undefined) {
        var chess = this.TileXYZToChess(tileX, tileY, tileZ);
        if (chess === null) {
            return false;
        }
        blocker = this.getChessData(chess).blocker;
        return (blocker === true);
    } else {
        chess = this.TileXYToChessArray(tileX, tileY, tmpChessArray);
        for (var i = 0, cnt = chess.length; i < cnt; i++) {
            blocker = this.getChessData(chess[i]).blocker;
            if (blocker === true) {
                return true;
            }
        }
        tmpChessArray.length = 0;
        return false;
    }
}
var tmpChessArray = [];

export default HasBlocker;