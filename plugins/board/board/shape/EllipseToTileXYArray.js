import Contains from '../../../utils/geom/ellipse/Contains.js';

var EllipseToTileXYArray = function (ellipse, out) {
    return this.shapeToTileXYArray(ellipse, Contains, out);
}

export default EllipseToTileXYArray;