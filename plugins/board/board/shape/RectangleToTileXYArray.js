import Contains from '../../../utils/geom/rectangle/Contains.js';

var RectangleToTileXYArray = function (rectangle, out) {
    return this.shapeToTileXYArray(rectangle, Contains, out);
}

export default RectangleToTileXYArray;