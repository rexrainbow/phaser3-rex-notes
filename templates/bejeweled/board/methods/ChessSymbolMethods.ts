export default {
    getSymbolAt(tileX?: any, tileY?: any) {
        var chess;
        if (typeof (tileX) === 'number') {
            chess = this.board.tileXYZToChess(tileX, tileY, this.chessTileZ);
        } else {
            chess = tileX;
        }

        return (chess) ? chess.getData('symbol') : null;
    },

    setSymbolAt(tileX?: any, tileY?: any, newSymbol?: any) {
        var chess;
        if (typeof (tileX) === 'number') {
            chess = this.board.tileXYZToChess(tileX, tileY, this.chessTileZ);
        } else {
            chess = tileX;
            newSymbol = tileY;
        }

        if (chess?: any) {
            chess.setData('symbol', newSymbol);
        }
        return this;
    },


}