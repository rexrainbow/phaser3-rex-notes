import CONST from './const.js';

const BLOCKER = CONST.BLOCKER;
const INFINITY = CONST.INFINITY;

var IsInLOS = function (chess, visiblePoints) {
    // chess: chess object or tileXY
    if ((visiblePoints !== INFINITY) && (visiblePoints <= 0)) {
        return false;
    }

    var board = this.board;
    var targetTileXY = board.chessToTileXYZ(chess);
    if (!this.isInCone(targetTileXY)) {
        return false;
    }


    var myTileXYZ = this.chessData.tileXYZ;
    board.lineToTileXYArray(
        board.tileXYToWorldX(myTileXYZ.x, myTileXYZ.y),
        board.tileXYToWorldY(myTileXYZ.x, myTileXYZ.y),
        board.tileXYToWorldX(targetTileXY.x, targetTileXY.y),
        board.tileXYToWorldY(targetTileXY.x, targetTileXY.y),
        globTileXYArray
    );
    var cost, result = true;
    for (var i = 1, cnt = globTileXYArray.length; i < cnt; i++) {
        cost = this.getCost(globTileXYArray[i]);
        if (cost === BLOCKER) {
            result = false;
            break;
        }
        if (visiblePoints !== INFINITY) {
            visiblePoints -= cost;
            if (visiblePoints < 0) {
                result = false;
                break;
            }
        }
    }
    globTileXYArray.length = 0;
    return result;
}

var globTileXYArray = [];
export default IsInLOS;