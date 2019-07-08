import IsArray from '../../../utils/object/IsArray.js';
import RectangleShape from '../../../utils/geom/rectangle/Rectangle.js';
import Clamp from '../../../utils/math/Clamp.js';

var ShapeToTileXYArray = function (shape, containsCallback, searchRectangle, out) {
    if (IsArray(searchRectangle)) {
        out = searchRectangle;
        searchRectangle = undefined;
    }

    if (searchRectangle === undefined) {
        if (globSearchRectanlge === undefined) {
            globSearchRectanlge = new RectangleShape();
        }
        searchRectangle = ShapeToRectangle(shape, globSearchRectanlge);
    }
    if (out === undefined) {
        out = [];
    }

    globLeftToptileXY = this.worldXYToTileXY(searchRectangle.left, searchRectangle.top, globLeftToptileXY);
    globRightBottomTileXY = this.worldXYToTileXY(searchRectangle.right, searchRectangle.bottom, globRightBottomTileXY);
    var left = globLeftToptileXY.x - 1,
        top = globLeftToptileXY.y - 1,
        right = globRightBottomTileXY.x + 1,
        bottom = globRightBottomTileXY.y + 1;
    if (!this.infinityMode) {
        left = Clamp(left, 0, this.width - 1);
        top = Clamp(top, 0, this.height - 1);
        right = Clamp(right, 0, this.width - 1);
        bottom = Clamp(bottom, 0, this.height - 1);
    }

    var targetWorldXY;
    for (var x = left; x <= right; x++) {
        for (var y = top; y <= bottom; y++) {
            targetWorldXY = this.tileXYToWorldXY(x, y, true);
            if (containsCallback(shape, targetWorldXY.x, targetWorldXY.y)) {
                out.push({ x: x, y: y });
            }
        }
    }

    return out;
};

var ShapeToRectangle = function (shape, rectangle) {
    var left = shape.left,
        top = shape.top,
        right = shape.right,
        bottom = shape.bottom;
    rectangle.setTo(left, top, right - left, bottom - top);
    return rectangle;
}

var globSearchRectanlge;
var globLeftToptileXY, globRightBottomTileXY;

export default ShapeToTileXYArray;