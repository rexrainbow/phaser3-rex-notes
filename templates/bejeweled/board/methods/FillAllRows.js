var FillAllRows = function (symbols) {
    var board = this.board;
    board.removeAllChess(true);

    var height = board.height;
    var startY = 0;
    var endY = height - 1;
    for (var tileY = startY; tileY <= endY; tileY++) {
        for (var tileX = 0, width = board.width; tileX < width; tileX++) {
            var candidateSymbols = this.candidateSymbols;
            var symbol = symbols[tileY - startY][tileX];
            if (symbol !== '?') {
                candidateSymbols = symbol;
            }
            this.createChess(tileX, tileY, candidateSymbols);
        }
    }
}
export default FillAllRows;