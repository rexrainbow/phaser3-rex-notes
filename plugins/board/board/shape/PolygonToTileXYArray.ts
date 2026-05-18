import GetAABB from '../../../utils/geom/polygon/GetAABB';

var PolygonToTileXYArray = function(polygon?: any, testMode?: any, out?: any) {
    if (Array.isArray(testMode)) {
        out = testMode;
        testMode = undefined;
    }
    globSearchRectangle = GetAABB(polygon, globSearchRectangle);
    var config = {
        testMode: testMode,
        searchRectangle: globSearchRectangle
    }
    return this.shapeToTileXYArray(polygon, config, out);
}

var globSearchRectangle;

export default PolygonToTileXYArray;