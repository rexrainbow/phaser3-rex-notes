/*
1. Fill empty grids
*/

var Fill = function (initSymbols) {
    var upperBoard = false;
    if (typeof (initSymbols) === 'boolean') {
        upperBoard = initSymbols;
        initSymbols = undefined;
    }

    var hasInitSymbols = (initSymbols !== undefined);
    var board = this.board;
    var height = board.height;
    var chessTileZ = this.chessTileZ;
    if (upperBoard) {
        height /= 2;
    }
    for (var tileY = 0; tileY < height; tileY++) {
        for (var tileX = 0, width = board.width; tileX < width; tileX++) {
            if (board.contains(tileX, tileY, chessTileZ)) { // not empty                
                continue;
            }

            var candidateSymbols = this.candidateSymbols;
            if (hasInitSymbols) {
                var symbol = initSymbols[tileY][tileX];
                if (symbol !== '?') {
                    candidateSymbols = symbol;
                }
            }
            this.createChess(tileX, tileY, candidateSymbols);
        }
    }
}
export default Fill;