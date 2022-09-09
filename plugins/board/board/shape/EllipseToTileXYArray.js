var EllipseToTileXYArray = function (ellipse, testMode, out) {
    if (Array.isArray(testMode)) {
        out = testMode;
        testMode = undefined;
    }
    var config = {
        testMode: testMode,
    }
    return this.shapeToTileXYArray(ellipse, config, out);
}

export default EllipseToTileXYArray;