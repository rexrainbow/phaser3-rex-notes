import ShapeToTileXYArray from './ShapeToTileXYArray.js';
import Contains from '../../../utils/geom/circle/Contains.js';

var CircleToTileXYArray = function (circle, out) {
    return ShapeToTileXYArray.call(this, circle.x, circle.y, circle, Contains, out);
}

export default CircleToTileXYArray;