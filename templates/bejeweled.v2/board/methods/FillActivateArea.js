/*
1. Fill activate grids
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
                var symbol = initSymbols[tileY][tileX];
                if (symbol !== '?') {
                    candidateSymbols = symbol;
                }
            }
            this.createChess(tileX, tileY, candidateSymbols);
        }
    }
}

export default FillActivateArea;