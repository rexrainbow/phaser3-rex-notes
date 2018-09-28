var ShiftToO = function (tileXYArray) {
    var minX = undefined,
        minY = undefined;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        if ((minX === undefined) || (tileXY.x < minX)) {
            minX = tileXY.x;
        }
        if ((minY === undefined) || (tileXY.y < minY)) {
            minY = tileXY.y;
        }
    }
    return this.offset(tileXYArray, -minX, -minY);
}

export default ShiftToO;