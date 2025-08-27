var DumpSymbols = function () {
    var board = this.board;
    var chessTileZ = this.chessTileZ;

    var symbols = [];
    for (var tileY = 0, rowCnt = board.height; tileY < rowCnt; tileY++) {
        var row = [];
        symbols.push(row);
        for (var tileX = 0, colCnt = board.width; tileX < colCnt; tileX++) {
            var chess = board.tileXYZToChess(tileX, tileY, chessTileZ);
            var symbol = (chess == null) ? null : chess.getData('symbol');
            row.push(symbol);
        }
    }

    return symbols;
}

export default DumpSymbols;