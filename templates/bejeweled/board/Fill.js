/*
1. Fill empty grids
*/

var Fill = function (map) {
    var symbol;
    var board = this.board,
        symbols = this.candidateSymbols;
    for (var tileY = 0, height = this.board.height; tileY < height; tileY++) {
        for (var tileX = 0, width = this.board.width; tileX < width; tileX++) {
            if (board.contains(tileX, tileY, this.chessTileZ)) { // not empty                
                continue;
            }

            if (map !== undefined) {
                symbol = map[tileX][tileY];
                if (symbol !== '?') {
                    symbols = symbol;
                }
            }
            this.createChess(tileX, tileY, symbols);
        }
    }
}
export default Fill;