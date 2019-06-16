import CONST from './const.js';

const BLOCKER = CONST.BLOCKER;

var GetCost = function (curTileXY, tileXYArray) {
    // Occupied test
    if (this.occupiedTest) {
        if (this.board.contains(curTileXY.x, curTileXY.y, this.chessData.tileXYZ.z)) {
            return BLOCKER;
        }
    }
    // Blocker test
    if (this.blockerTest) {
        if (this.board.hasBlocker(curTileXY.x, curTileXY.y)) {
            return BLOCKER;
        }
    }
    // Edge-blocker test
    if (this.edgeBlockerTest) {
        // TODO
    }

    if (typeof (this.costCallback) === 'number') {
        return this.costCallback;
    }
    if (this.costCallbackScope) {
        return this.costCallback.call(this.costCallbackScope, curTileXY, this, tileXYArray);
    } else {
        return this.costCallback(curTileXY, this, tileXYArray);
    }
}
export default GetCost;