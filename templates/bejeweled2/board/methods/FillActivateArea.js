/*
1. Fill activate area
    - x: 1 ~ board.width - 2
    - y: 1 ~ board.height - 2
*/

var FillActivateArea = function (initSymbols) {
    var hasInitSymbols = (initSymbols !== undefined);
    var board = this.board;
    var chessTileZ = this.chessTileZ;

    var startX = 1
    var endX = board.width - 2;
    var startY = 1;
    var endY = board.height - 2;

    for (var tileY = startY; tileY <= endY; tileY++) {
        for (var tileX = startX; tileX <= endX; tileX++) {
            if (board.contains(tileX, tileY, chessTileZ)) { // not empty
                continue;
            }

            var candidateSymbols = this.candidateSymbols;
            if (hasInitSymbols) {
                var symbol = initSymbols[tileY - 1][tileX - 1];
                if (symbol !== '?') {
                    candidateSymbols = symbol;
                }
            }
            this.createChess(tileX, tileY, candidateSymbols);
        }
    }
}

export default FillActivateArea;