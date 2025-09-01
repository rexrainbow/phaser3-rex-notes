var DumpSymbols = function () {
    // Dump symbols of all grids
    var board = this.board;
    var chessTileZ = this.chessTileZ;
    var board = this.board;
    var height = board.height;
    var startY = 0;
    var endY = height - 1;

    var symbols = [];
    for (var tileY = startY; tileY <= endY; tileY++) {
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