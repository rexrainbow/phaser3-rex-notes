import CONST from './const.js';
import Equal from '../../utils/math/fuzzy/Equal.js';
import GreaterThan from '../../utils/math/fuzzy/GreaterThan.js';

const BLOCKER = CONST.BLOCKER;
const INFINITY = CONST.INFINITY;

var IsInLOS = function (targetTileXY, visiblePoints) {
    if ((visiblePoints !== INFINITY) && (visiblePoints <= 0)) {
        return false;
    }

    var board = this.board;
    var myTileXYZ = this.chessData.tileXYZ;
    var targetAngle = board.angleBetween(myTileXYZ, targetTileXY);
    var deltaAngle = Math.abs(targetAngle - this.faceAngle);
    if (!Equal(deltaAngle, this.halfConeRad) && (deltaAngle > this.halfConeRad)) {
        return false;
    }
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