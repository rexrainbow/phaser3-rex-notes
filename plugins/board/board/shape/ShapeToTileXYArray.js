var ShapeToTileXYArray = function (startWorldX, startWorldY, shape, containsCallback, out) {
    if (out === undefined) {
        out = [];
    }

    globStartWorldXY = this.worldXYSnapToGrid(startWorldX, startWorldY, globStartWorldXY);
    var isAnyInShape, radius = 0,
        targetTileXY, targetWorldXY;
    do {
        isAnyVisible = false;
        radius++;
        this.ringToTileXYArray(globStartWorldXY, radius, globRing);
        for (var i = 0, cnt = globRing.length; i < cnt; i++) {
            targetTileXY = globRing[i];
            targetWorldXY = this.tileXYToWorldXY(targetTileXY.x, targetTileXY.y, true);
            if (containsCallback(shape, targetWorldXY)) {
                isAnyVisible = true;
                out.push(targetTileXY);
            }
        }
        globRing.length = 0;
    } while (isAnyInShape)

};

var globStartWorldXY;
var globRing = [];

export default ShapeToTileXYArray;