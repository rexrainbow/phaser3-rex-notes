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

        var symbol = chess.getData('symbol');

        if (self.matchAcceptList && !(symbol in self.matchAcceptList)) {
            symbol = null;
        } else if (self.matchIgnoreList && (symbol in self.matchIgnoreList)) {
            symbol = null;
        }

        return symbol;
    });
};

export default RefreshSymbolCache;