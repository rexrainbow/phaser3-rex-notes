import Contains from '../../../utils/geom/polygon/Contains.js';
import GetAABB from '../../../utils/geom/polygon/GetAABB.js';

var PolygonToTileXYArray = function (polygon, out) {
    globSearchRectangle = GetAABB(polygon, globSearchRectangle);
    return this.shapeToTileXYArray(polygon, Contains, globSearchRectangle, out);
}

var globSearchRectangle;

export default PolygonToTileXYArray;