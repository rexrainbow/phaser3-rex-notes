import IsArray from '../../utils/object/IsArray.js';

var LOS = function (chessArray, visiblePoints, out) {
    // chessArray: array of chess object or tileXY
    if (!IsArray(chessArray)) {
        var chess = chessArray;
        return this.isInLOS(chess, visiblePoints);
    } else {
        if (out === undefined) {
            out = [];
        }
        var chess;
        for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
            chess = chessArray[i];
            if (!this.isInLOS(chess, visiblePoints)) {
                continue;
            }
            out.append(chess)
        }
        return out;
    }
}

export default LOS;