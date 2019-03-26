import IsArray from '../../utils/object/IsArray.js';

var TileXYIsEqual = function (tileA, tileB) {
    if (IsArray(tileA)) {
        var tileArrayA = tileA,
            tileArrayB = tileB;
        if (tileArrayA.length !== tileArrayB.length) {
            return false;
        } else {
            for (var i = 0, cnt = tileArrayA.length; i < cnt; i++) {
                if (!TileXYIsEqual(tileArrayA[i], tileArrayB[i])) {
                    return false;
                }
            }
            return true;
        }
    } else {
        return ((tileA.x === tileB.x) && (tileA.y === tileB.y));
    }
}
export default TileXYIsEqual;