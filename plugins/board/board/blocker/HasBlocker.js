var HasBlocker = function (tileX, tileY, tileZ) {
    var chess, blocker;
    if (tileZ === undefined) {
        // any chess at (tileX, tileY) has blocker
        chess = this.tileXYToChessArray(tileX, tileY, globChessArray);
        for (var i = 0, cnt = chess.length; i < cnt; i++) {
            blocker = this.getChessData(chess[i]).blocker;
            if (blocker === true) {
                globChessArray.length = 0;
                return true;
            }
        }
        globChessArray.length = 0;
        return false;

    } else {
        // chess at (tileX, tileY, tileZ) has blocker
        var chess = this.tileXYZToChess(tileX, tileY, tileZ);
        if (chess === null) {
            return false;
        }
        blocker = this.getChessData(chess).blocker;
        return (blocker === true);

    }
}
var globChessArray = [];

export default HasBlocker;