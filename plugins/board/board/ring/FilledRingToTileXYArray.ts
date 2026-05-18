import IsArray from '../../../utils/object/IsArray';

var FilledRingToTileXYArray = function(centerTileXY?: any, radius?: any, nearToFar?: any, out?: any) {
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
        this.ringToTileXYArray(centerTileXY, level, out);
    }
    return out;
}
export default FilledRingToTileXYArray;