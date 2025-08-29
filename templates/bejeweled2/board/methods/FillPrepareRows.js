import { MovingIndices } from '../../const.js';

var FillPrepareRows = function () {
    var hasNewPiece = false;
    for (var direction = 0; direction < 4; direction++) {
        var result = FillPrepareRowByDirection.call(this, direction);
        if (result) {
            hasNewPiece = true;
        }
    }

    return hasNewPiece;
}

var FillPrepareRowByDirection = function (direction) {
    /*
    direction:
    0 (right): fill left row
    1 (down): fill top row
    2 (left): fill right row
    3 (up): fill bottom row
    */

    var board = this.board;
    var { loopType, startX, endX, startY, endY } = MovingIndices[direction];
    if (startX < 0) {
        startX = board.width + startX;
    }
    if (endX < 0) {
        endX = board.width + endX;
    }
    if (startY < 0) {
        startY = board.height + startY;
    }
    if (endY < 0) {
        endY = board.height + endY;
    }

    var chessTileZ = this.chessTileZ;
    var candidateSymbols = this.candidateSymbols;
    var hasNewPiece = false;
    if (loopType === 'xy') {
        for (var y = startY; y <= endY; y++) {
            var result = LoopBody(this, endX, y, chessTileZ, candidateSymbols);
            if (result) {
                hasNewPiece = true;
            }
        }
    } else { // loopType === 'yx'
        for (var x = startX; x <= endX; x++) {
            var result = LoopBody(this, x, endY, chessTileZ, candidateSymbols);
            if (result) {
                hasNewPiece = true;
            }
        }
    }

    return hasNewPiece;
}

var LoopBody = function (self, tileX, tileY, tileZ, candidateSymbols) {
    if (self.board.contains(tileX, tileY, tileZ)) { // not empty
        return false;
    }
    self.createChess(tileX, tileY, candidateSymbols);
    return true;
}

export default FillPrepareRows;