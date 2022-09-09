import Contains from '../../../utils/geom/ellipse/Contains.js';

var EllipseToTileXYArray = function (ellipse, testMode, out) {
    if (Array.isArray(testMode)) {
        out = testMode;
        testMode = undefined;
    }
    var config = {
        testMode: testMode,
    }
    return this.shapeToTileXYArray(ellipse, Contains, config, out);
}

export default EllipseToTileXYArray;