var CircleToTileXYArray = function (circle, testMode, out) {
    if (Array.isArray(testMode)) {
        out = testMode;
        testMode = undefined;
    }
    var config = {
        testMode: testMode,
    }
    return this.shapeToTileXYArray(circle, config, out);
}

export default CircleToTileXYArray;