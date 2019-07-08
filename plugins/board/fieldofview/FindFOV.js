import IsArray from '../../utils/object/IsArray.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';

var FindFOV = function (visiblePoints, originTileXY, out) {
    if (IsPlainObject(visiblePoints)) {
        out = originTileXY;
        originTileXY = visiblePoints;
        visiblePoints = undefined;
    } else if (IsArray(visiblePoints)) {
        out = visiblePoints;
        originTileXY = undefined;
        visiblePoints = undefined;
    }
    if (IsArray(originTileXY)) {
        out = originTileXY;
        originTileXY = undefined;
    }

    if (out === undefined) {
        out = [];
    }

    var board = this.board;
    var myTileXYZ = this.chessData.tileXYZ;
    var isAnyVisible, radius = 1,
        targetTileXY;
    do {
        isAnyVisible = false;
        board.ringToTileXYArray(myTileXYZ, radius, globRing);
        for (var i = 0, cnt = globRing.length; i < cnt; i++) {
            targetTileXY = globRing[i];
            if (this.isInLOS(targetTileXY, visiblePoints, originTileXY)) {
                isAnyVisible = true;
                out.push(targetTileXY);
            }
        }
        radius++;
        globRing.length = 0;
    } while (isAnyVisible)

    return out;
}

var globRing = [];

export default FindFOV;