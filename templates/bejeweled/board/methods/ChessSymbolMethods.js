export default {
    getSymbolAt(tileX, tileY) {
        var chess;
        if (typeof (tileX) === 'number') {
            chess = this.board.tileXYZToChess(tileX, tileY, this.chessTileZ);
        } else {
            chess = tileX;
        }

        return (chess) ? chess.getData('symbol') : null;
    },

    setSymbolAt(tileX, tileY, newSymbol) {
        var chess;
        if (typeof (tileX) === 'number') {
            chess = this.board.tileXYZToChess(tileX, tileY, this.chessTileZ);
        } else {
            chess = tileX;
            newSymbol = tileY;
        }

        if (chess) {
            chess.setData('symbol', newSymbol);
        }
        return this;
    },


}