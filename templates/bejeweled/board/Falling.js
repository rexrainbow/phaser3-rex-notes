/* 
1. Falling down all chess
*/
import WaitEvents from '../../../plugins/waitevents.js';

var Falling = function (completeCallback, scope) {
    var board = this.board,
        chess, moveTo;
    if (this.waitEvents === undefined) {
        this.waitEvents = new WaitEvents();
    }
    this.waitEvents.setCompleteCallback(completeCallback, scope);
    for (var tileY = (this.board.height - 1); tileY >= 0; tileY--) { // bottom to top
        for (var tileX = 0, cnt = this.board.width; tileX < cnt; tileX++) { // left to right
            chess = board.tileXYZToChess(tileX, tileY, this.chessTileZ);
            if (chess === null) {
                continue;
            }
            moveTo = chess.rexMoveTo;
            do {
                moveTo.moveToward(1);
            } while (moveTo.lastMoveResult)
            if (moveTo.isRunning) {
                this.waitEvents.waitEvent(moveTo, 'complete');
            }
        }
    }
    return this;
}

export default Falling;