/*
1. Fill empty grids
*/

import Chess from '../chess/Chess.js';

var Fill = function (map) {
    var tileZ = this.chessTileZ,
        createCallback = this.chessCreateCallback,
        scope = this.chessCallbackScope,
        symbols = this.candidateSymbols;
    var symbol;
    var board = this.board;
    for (var tileY = 0, height = this.board.height; tileY < height; tileY++) {
        for (var tileX = 0, width = this.board.width; tileX < width; tileX++) {
            if (board.contains(tileX, tileY, tileZ)) { // not empty                
                continue;
            }

            if (map !== undefined) {
                symbol = map[tileX][tileY];
                if (symbol !== '?') {
                    symbols = symbol;
                }
            }
            new Chess(board, tileX, tileY, tileZ,
                symbols,
                createCallback,
                scope);
        }
    }
}
export default Fill;