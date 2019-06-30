var FilledRingToTileXYArray = function (centerTileXY, radius, out) {
    if (out === undefined) {
        out = [];
    }
    for (var i = 0; i <= radius; i++) {
        this.ringToTileXYArray(centerTileXY, i, out);
    }
    return out;
}
export default FilledRingToTileXYArray;