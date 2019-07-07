import InCenter from '../../../utils/geom/triangle/InCenter.js';
import ShapeToTileXYArray from './ShapeToTileXYArray.js';
import Contains from '../../../utils/geom/triangle/Contains.js';

var TriangleToTileXYArray = function (triangle, out) {
    globCenterXY = InCenter(triangle, globCenterXY);
    return ShapeToTileXYArray.call(this, globCenterXY.x, globCenterXY.y, triangle, Contains, out);
}

var globCenterXY;

export default TriangleToTileXYArray;