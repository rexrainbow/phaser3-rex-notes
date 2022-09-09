var TriangleToTileXYArray = function (triangle, testMode, out) {
    if (Array.isArray(testMode)) {
        out = testMode;
        testMode = undefined;
    }
    var config = {
        testMode: testMode,
    }
    return this.shapeToTileXYArray(triangle, config, out);
}

export default TriangleToTileXYArray;