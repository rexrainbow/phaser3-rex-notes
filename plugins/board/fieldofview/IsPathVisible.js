import CONST from './const.js';
import AreTileXYEqual from '../utils/AreTileXYEqual.js';

const BLOCKER = CONST.BLOCKER;
const INFINITY = CONST.INFINITY;

var IsPathVisible = function (tileXYArray, visiblePoints) {
    var myTileXYZ = this.chessData.tileXYZ;
    var tileXY, cost;
    for (var i = 1, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        if (AreTileXYEqual(myTileXYZ, tileXY)) {
            continue;
        }
        cost = this.getCost(tileXY, tileXYArray);
        if (cost === BLOCKER) {
            return false;
        }
        if (visiblePoints !== INFINITY) {
            visiblePoints -= cost;
            if (visiblePoints < 0) {
                return false;
            }
        }
    }
    return true;
}
export default IsPathVisible;