import ShapeToTileXYArray from './ShapeToTileXYArray.js';
import Contains from '../../../utils/geom/polygon/Contains.js';

var PolygonToTileXYArray = function (polygon, out) {
    var pointer0 = polygon.points[0];
    return ShapeToTileXYArray.call(this, polygon, Contains, out);
}

export default PolygonToTileXYArray;