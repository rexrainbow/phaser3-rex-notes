import { FallingIndices } from '../../const.js';

var FillPrepareRow = function (direction) {
    /*
    direction:
    0: 'left-to-right', fill left row
    1: 'top-to-bottom', fill top row
    2: 'right-to-left', fill right row
    3: 'bottom-to-top', fill bottom row
    */

    var board = this.board;
    var { loopType, startX, endX, startY, endY } = FallingIndices[direction];
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
    var hasEmptyGrid = false;
    if (loopType === 'xy') {
        for (var y = startY; y <= endY; y++) {
            var result = LoopBody(this, endX, y, chessTileZ, candidateSymbols);
            if (result) {
                hasEmptyGrid = true;
            }
        }
    } else { // loopType === 'yx'
        for (var x = startX; x <= endX; x++) {
            var result = LoopBody(this, x, endY, chessTileZ, candidateSymbols);
            if (result) {
                hasEmptyGrid = true;
            }
        }
    }

    return hasEmptyGrid;
}

var LoopBody = function (self, tileX, tileY, tileZ, candidateSymbols) {
    if (self.board.contains(tileX, tileY, tileZ)) { // not empty
        return false;
    }
    self.createChess(tileX, tileY, candidateSymbols);
    return true;
}

export default FillPrepareRow;