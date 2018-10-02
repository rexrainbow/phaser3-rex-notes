/* 
1. Falling down all chess
*/
var Falling = function (completeCallback, scope) {
    var board = this.board,
        chess, moveTo;
    var waitEvents = new WaitEvents(completeCallback, scope);
    for (var tileY = (this.board.height - 1); tileY >= 0; tileY--) { // bottom to top
        for (var tileX = 0, cnt = this.board.width; tileX < cnt; tileX++) { // left to right
            chess = board.tileXYZToChess(tileX, tileY, this.chessTileZ);
            if (chess === null) {
                continue;
            }
            moveTo = chess.moveTo;
            do {
                moveTo.moveToward(1);
            } while (moveTo.lastMoveResult)
            if (moveTo.isRunning) {
                waitEvents.pend(moveTo);
                moveTo.once('complete', function () {
                    waitEvents.resolve(this)
                }, moveTo);
            }
        }
    }
    return this;
}

const SetStruct = Phaser.Structs.Set;
class WaitEvents {
    constructor(completeCallback, scope) {
        this.completeCallback = completeCallback;
        this.scope = scope;
        this.waitEvents = new SetStruct();
    }
    pend(event) {
        this.waitEvents.set(event);
        return this;
    }
    resolve(event) {
        this.waitEvents.delete(event);
        if (this.waitEvents.size === 0) {
            if (this.scope) {
                this.completeCallback.call(this.scope);
            } else {
                this.completeCallback();
            }
        }
        return this;
    }
}
export default Falling;