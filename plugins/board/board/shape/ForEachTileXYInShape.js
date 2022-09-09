import GetValue from '../../../utils/object/GetValue.js';
import Clamp from '../../../utils/math/Clamp.js';

var ForEachTileXYInShape = function (shape, containsCallback, callback, scope, config) {
    var testMode = GetValue(config, 'testMode', 0);
    var searchRectangle = GetValue(config, 'searchRectangle', shape);

    if (scope) {
        callback = callback.bind(scope);
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

    for (var x = left; x <= right; x++) {
        for (var y = top; y <= bottom; y++) {
            switch (testMode) {
                case 1:  // Test grid bounds (a rectangle)
                    var rect = this.getGridBounds(x, y, true);
                    if (OverlapRectangle(shape, rect)) {
                        globalTileXY.x = x;
                        globalTileXY.y = y;
                        callback(globalTileXY, this);
                    }
                    break;

                case 2:  // Test grid points
                    var points = this.getGridPoints(x, y, true);
                    if (ContainsAnyPoint(shape, points)) {
                        globalTileXY.x = x;
                        globalTileXY.y = y;
                        callback(globalTileXY, this);
                    }
                    break;

                default: // Test center position only
                    var targetWorldXY = this.tileXYToWorldXY(x, y, true);
                    if (containsCallback(shape, targetWorldXY.x, targetWorldXY.y)) {
                        globalTileXY.x = x;
                        globalTileXY.y = y;
                        callback(globalTileXY, this);
                    }
                    break;
            }

        }
    }

    return this;
};

var OverlapRectangle = function (shape, rectangle) {
    var top = rectangle.top,
        bottom = rectangle.bottom,
        left = rectangle.left,
        right = rectangle.right;
    if (shape.contains(left, top)) {
        return true;
    }
    if (shape.contains(left, bottom)) {
        return true;
    }
    if (shape.contains(right, top)) {
        return true;
    }
    if (shape.contains(right, bottom)) {
        return true;
    }
    return false;
}

var ContainsAnyPoint = function (shape, points) {
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        var point = points[i];
        if (shape.contains(point.x, point.y)) {
            return true;
        }
    }
    return false;
};

var globLeftToptileXY, globRightBottomTileXY;
var globalTileXY = {};

export default ForEachTileXYInShape;