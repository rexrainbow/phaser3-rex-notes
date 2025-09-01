var RefreshSymbolCache = function () {
    var self = this;
    var chessTileZ = this.chessTileZ;
    this.match.refreshSymbols(function (tileXY, board) {
        // Return null in prepare rows
        if (!self.isAtActivateArea(tileXY.x, tileXY.y)) {
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