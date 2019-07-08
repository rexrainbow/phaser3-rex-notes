import Contains from '../../../utils/geom/circle/Contains.js';

var CircleToTileXYArray = function (circle, out) {
    return this.shapeToTileXYArray(circle, Contains, out);
}

export default CircleToTileXYArray;