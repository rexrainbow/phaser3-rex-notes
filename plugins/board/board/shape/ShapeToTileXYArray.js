import Clamp from '../../../utils/math/Clamp.js';

var ShapeToTileXYArray = function (shape, containsCallback, out) {
    if (out === undefined) {
        out = [];
    }

    globLeftToptileXY = this.worldXYToTileXY(shape.left, shape.top, globLeftToptileXY);
    globRightBottomTileXY = this.worldXYToTileXY(shape.right, shape.bottom, globRightBottomTileXY);
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

var globLeftToptileXY, globRightBottomTileXY;

export default ShapeToTileXYArray;