var RectangleToTileXYArray = function (rectangle, testMode, out) {
    if (Array.isArray(testMode)) {
        out = testMode;
        testMode = undefined;
    }
    var config = {
        testMode: testMode,
    }
    return this.shapeToTileXYArray(rectangle, config, out);
}

export default RectangleToTileXYArray;