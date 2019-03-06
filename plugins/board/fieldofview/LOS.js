import IsArray from '../../utils/object/IsArray.js';

var LOS = function (targetTileXYArray, visiblePoints, out) {
    if (!IsArray(targetTileXYArray)) {
        var targetTileXY = targetTileXYArray;
        return this.isInLOS(targetTileXY, visiblePoints);
    } else {
        if (out === undefined) {
            out = [];
        }
        var targetTileXY;
        for (var i = 0, cnt = targetTileXYArray.length; i < cnt; i++) {
            targetTileXY = targetTileXYArray[i];
            if (!this.isInLOS(targetTileXY, visiblePoints)) {
                continue;
            }
            out.append(targetTileXY)
        }
        return out;
    }
}

export default LOS;