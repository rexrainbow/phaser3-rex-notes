import ShapeToTileXYArray from './ShapeToTileXYArray.js';
import Contains from '../../../utils/geom/ellipse/Contains.js';

var EllipseToTileXYArray = function (ellipse, out) {
    return ShapeToTileXYArray.call(this, ellipse.x, ellipse.y, ellipse, Contains, out);
}

export default EllipseToTileXYArray;