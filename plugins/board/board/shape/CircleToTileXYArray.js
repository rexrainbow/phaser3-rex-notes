import Contains from '../../../utils/geom/circle/Contains.js';

var CircleToTileXYArray = function (circle, testMode, out) {
    if (Array.isArray(testMode)) {
        out = testMode;
        testMode = undefined;
    }
    var config = {
        testMode: testMode,
    }
    return this.shapeToTileXYArray(circle, Contains, config, out);
}

export default CircleToTileXYArray;