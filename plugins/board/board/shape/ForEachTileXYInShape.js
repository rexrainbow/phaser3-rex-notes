import GetValue from '../../../utils/object/GetValue.js';
import Clamp from '../../../utils/math/Clamp.js';

var ForEachTileXYInShape = function (shape, callback, scope, config) {
    var testMode = GetValue(config, 'testMode', 0);
    var searchRectangle = GetValue(config, 'searchRectangle', shape);
    var order = GetValue(config, 'order', 0);

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

    switch (order) {
        case 0: // x+,y+
            var isBreak;
            for (var y = top; y <= bottom; y++) {
                for (var x = left; x <= right; x++) {
                    if (IsInShape.call(this, shape, x, y, testMode)) {
                        globalTileXY.x = x;
                        globalTileXY.y = y;
                        isBreak = callback(globalTileXY, this);
                    }
                    if (isBreak) {
                        break;
                    }
                }
            }
            break;

        case 1: // x-,y+
            var isBreak;
            for (var y = top; y <= bottom; y++) {
                for (var x = right; x >= left; x--) {
                    if (IsInShape.call(this, shape, x, y, testMode)) {
                        globalTileXY.x = x;
                        globalTileXY.y = y;
                        isBreak = callback(globalTileXY, this);
                    }
                    if (isBreak) {
                        break;
                    }
                }
            }
            break;

        case 2: // y+,x+
            var isBreak;
            for (var x = left; x <= right; x++) {
                for (var y = top; y <= bottom; y++) {
                    if (IsInShape.call(this, shape, x, y, testMode)) {
                        globalTileXY.x = x;
                        globalTileXY.y = y;
                        isBreak = callback(globalTileXY, this);
                    }
                    if (isBreak) {
                        break;
                    }
                }
            }
            break;

        case 3: // y-,x+
            var isBreak;
            for (var x = left; x <= right; x++) {
                for (var y = bottom; y >= top; y--) {
                    if (IsInShape.call(this, shape, x, y, testMode)) {
                        globalTileXY.x = x;
                        globalTileXY.y = y;
                        isBreak = callback(globalTileXY, this);
                    }
                    if (isBreak) {
                        break;
                    }
                }
            }
    }

    return this;
};

var IsInShape = function (shape, x, y, testMode) {
    switch (testMode) {
        case 1:  // Test grid bounds (a rectangle)
            var rect = this.getGridBounds(x, y, true);
            return OverlapRectangle(shape, rect);

        case 2:  // Test grid points
            var points = this.getGridPoints(x, y, true);
            return ContainsAnyPoint(shape, points);

        default: // Test center position only
            var targetWorldXY = this.tileXYToWorldXY(x, y, true);
            return shape.contains(targetWorldXY.x, targetWorldXY.y);
    }
}

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