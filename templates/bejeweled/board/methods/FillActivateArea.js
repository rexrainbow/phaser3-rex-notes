/*
1. Fill activate area
*/

var FillActivateArea = function (symbols) {
    var hasInitSymbols = (symbols !== undefined);
    var board = this.board;
    var height = board.height;
    var startY = (height / 2);
    var endY = height - 1;
    var chessTileZ = this.chessTileZ;
    for (var tileY = startY; tileY <= endY; tileY++) {
        for (var tileX = 0, width = board.width; tileX < width; tileX++) {
            if (board.contains(tileX, tileY, chessTileZ)) { // not empty
                continue;
            }

            var candidateSymbols = this.candidateSymbols;
            if (hasInitSymbols) {
                var symbol = symbols[tileY - startY][tileX];
                if (symbol !== '?') {
                    candidateSymbols = symbol;
                }
            }
            this.createChess(tileX, tileY, candidateSymbols);
        }
    }
}
export default FillActivateArea;