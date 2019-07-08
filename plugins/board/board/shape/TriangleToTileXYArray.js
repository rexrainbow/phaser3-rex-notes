import Contains from '../../../utils/geom/triangle/Contains.js';

var TriangleToTileXYArray = function (triangle, out) {
    return Sthis.shapeToTileXYArray(triangle, Contains, out);
}

export default TriangleToTileXYArray;