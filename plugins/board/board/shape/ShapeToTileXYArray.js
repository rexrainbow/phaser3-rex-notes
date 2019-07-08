var ShapeToTileXYArray = function (startWorldX, startWorldY, shape, containsCallback, out) {
    if (out === undefined) {
        out = [];
    }

    globStartWorldXY = this.worldXYToTileXY(startWorldX, startWorldY, globStartWorldXY);
    var isAnyInShape, radius = 0,
        targetTileXY, targetWorldXY;
    do {
        isAnyInShape = false;
        this.ringToTileXYArray(globStartWorldXY, radius, globRing);
        for (var i = 0, cnt = globRing.length; i < cnt; i++) {
            targetTileXY = globRing[i];
            targetWorldXY = this.tileXYToWorldXY(targetTileXY.x, targetTileXY.y, true);
            if (containsCallback(shape, targetWorldXY.x, targetWorldXY.y)) {
                isAnyInShape = true;
                out.push(targetTileXY);
            }
        }
        radius++;
        globRing.length = 0;
    } while (isAnyInShape)

    return out;
};

var globStartWorldXY;
var globRing = [];

export default ShapeToTileXYArray;