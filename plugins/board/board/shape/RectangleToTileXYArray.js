import ShapeToTileXYArray from './ShapeToTileXYArray.js';
import Contains from '../../../utils/geom/rectangle/Contains.js';

var RectangleToTileXYArray = function (rectangle, out) {
    return ShapeToTileXYArray.call(this, rectangle.centerX, rectangle.centerY, rectangle, Contains, out);
}

export default RectangleToTileXYArray;