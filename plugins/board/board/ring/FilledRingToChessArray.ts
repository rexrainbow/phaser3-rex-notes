import IsArray from '../../../utils/object/IsArray';

var FilledRingToChessArray = function(centerTileXY?: any, radius?: any, tileZ?: any, nearToFar?: any, out?: any) {
    if (IsArray(nearToFar)) {
        out = nearToFar;
        nearToFar = undefined;
    }

    if (nearToFar === undefined) {
        nearToFar = true;
    }
    if (out === undefined) {
        out = [];
    }

    centerTileXY = this.chessToTileXYZ(centerTileXY);

    var level;
    for (var i = 0; i <= radius; i++) {
        level = (nearToFar) ? i : (radius - i);
        this.ringToChessArray(centerTileXY, level, tileZ, out);
    }
    return out;
}
export default FilledRingToChessArray;