/* 
1. Move down (direction) 1 step
*/

import Range from '../../../plugins/utils/array/Range';
import { MovingIndices } from '../const';

var MoveAllPieces = function(direction?: any, board?: any, bejeweled?: any) {
    var { loopType, startX, endX, startY, endY } = MovingIndices[direction];

    if (startX < 0) {
        startX = board.width + startX;
    }
    if (endX < 0) {
        endX = board.width + endX;
    }
    if (startY < 0) {
        startY = board.width + startY;
    }
    if (endY < 0) {
        endY = board.width + endY;
    }

    var stepX = (endX >= startX) ? 1 : -1;
    var stepY = (endY >= startY) ? 1 : -1;
    var rangeX = Range(startX, endX + stepX, stepX);
    var rangeY = Range(startY, endY + stepY, stepY);

    var tileZ = bejeweled.getChessTileZ();
    if (loopType === 'xy') {
        rangeX.forEach(function(tileX?: any) {
            rangeY.forEach(function(tileY?: any) {
                LoopBody(bejeweled, board, tileX, tileY, tileZ, direction);
            })
        })
    } else { // loopType === 'yx'
        rangeY.forEach(function(tileY?: any) {
            rangeX.forEach(function(tileX?: any) {
                LoopBody(bejeweled, board, tileX, tileY, tileZ, direction);
            })
        })
    }
}

var LoopBody = function(bejeweled?: any, board?: any, tileX?: any, tileY?: any, tileZ?: any, direction?: any) {
    var chess = board.tileXYZToChess(tileX, tileY, tileZ);
    if (chess === null) {
        return;
    }
    var moveTo = bejeweled.getChessMoveTo(chess);
    moveTo.moveToward(direction);
    if (moveTo.isRunning) {
        bejeweled.waitEvent(moveTo, 'complete');
    }
}

export default MoveAllPieces;