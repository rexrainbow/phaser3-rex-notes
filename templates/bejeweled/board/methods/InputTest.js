/*
1. Return true if the user can make a next move:
  - There is at least one clickable chess piece
  - Or, there exists a swappable pair of chess pieces that would result in a match-3
*/

import RefreshSymbolCache from '../match/RefreshSymbolCache.js';
import AnyMatch from '../match/AnyMatch.js';

var InputTest = function () {
    var match = this.match;
    var board = this.board;
    var directions = board.grid.halfDirections;

    RefreshSymbolCache.call(this); // only refresh symbol cache once

    var tileZ = this.chessTileZ;
    var tileA = {}, tileB;
    var chessA, chessB;
    var matchResult;

    for (var tileY = 0, rowCnt = board.height; tileY < rowCnt; tileY++) {
        for (var tileX = 0, colCnt = board.width; tileX < colCnt; tileX++) {

            // In prepare rows
            if (!this.isAtActivateArea(tileX, tileY)) {
                continue;
            }

            chessA = board.tileXYZToChess(tileX, tileY, tileZ);

            // chess is clickable, return true
            if (chessA.getData('clickable')) {
                return true;
            }

            if (!chessA.getData('swappable')) {
                continue;
            }
            // chessA is swappable

            tileA.x = tileX;
            tileA.y = tileY;

            for (var dir = 0, dirCnt = directions.length; dir < dirCnt; dir++) {
                tileB = board.getNeighborTileXY(tileA, dir);

                // In prepare rows
                if (!this.isAtActivateArea(tileB.x, tileB.y)) {
                    continue;
                }

                chessB = board.tileXYZToChess(tileB.x, tileB.y, tileZ);
                if (!chessB.getData('swappable')) {
                    continue;
                }

                // chessA and chessB are swappable
                // Swap symbol
                SwapSymbols(match, tileA, tileB);
                // Any match?
                matchResult = AnyMatch.call(this, 3);
                // Swap symbol back
                SwapSymbols(match, tileA, tileB);

                if (matchResult) {
                    return true;
                }
            }
        }
    }
    return false;
}

var SwapSymbols = function (match, tileA, tileB) {
    var symbolA = match.getSymbol(tileA.x, tileA.y);
    var symbolB = match.getSymbol(tileB.x, tileB.y);
    match.setSymbol(tileA.x, tileA.y, symbolB);
    match.setSymbol(tileB.x, tileB.y, symbolA);
};

export default InputTest;