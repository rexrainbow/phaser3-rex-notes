var RefreshSymbolCache = function () {
    var chessTileZ = this.chessTileZ;
    this.match.refreshSymbols(function (tileXY, board) {
        // Return null in upper board
        if (tileXY.y < (board.height / 2)) {
            return null;
        }
        var chess = board.tileXYZToChess(tileXY.x, tileXY.y, chessTileZ);
        if (chess == null) {
            return null;
        }
        return chess.getData('symbol');
    });
};

export default RefreshSymbolCache;