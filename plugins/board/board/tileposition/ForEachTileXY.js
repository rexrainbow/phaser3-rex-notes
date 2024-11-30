import GetValue from '../../../utils/object/GetValue.js';
import Clamp from '../../../utils/math/Clamp.js';

var ForEachTileXY = function (callback, scope, config) {
    if (typeof (config) === 'number') {
        config = {
            order: config
        }
    }

    var order = GetValue(config, 'order', 0);

    var top, bottom, left, right;
    if (this.infinityMode && (this.width === undefined)) {
        var bounds = this.boardData.getBounds();
        left = bounds.left;
        right = bounds.right;
        top = bounds.top;
        bottom = bounds.bottom;
    } else {
        var lastX = this.width - 1,
            lastY = this.height - 1;
        left = Clamp(GetValue(config, 'left', 0), 0, lastX);
        right = Clamp(GetValue(config, 'right', lastX), 0, lastX);
        top = Clamp(GetValue(config, 'top', 0), 0, lastY);
        bottom = Clamp(GetValue(config, 'bottom', lastY), 0, lastY);
    }

    switch (order) {
        case 0: // x+,y+
            var isBreak;
            for (var y = top; y <= bottom; y++) {
                for (var x = left; x <= right; x++) {
                    globTileXY.x = x;
                    globTileXY.y = y;
                    if (scope) {
                        isBreak = callback.call(scope, globTileXY, this);
                    } else {
                        isBreak = callback(globTileXY, this);
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
                    globTileXY.x = x;
                    globTileXY.y = y;
                    if (scope) {
                        isBreak = callback.call(scope, globTileXY, this);
                    } else {
                        isBreak = callback(globTileXY, this);
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
                    globTileXY.x = x;
                    globTileXY.y = y;
                    if (scope) {
                        isBreak = callback.call(scope, globTileXY, this);
                    } else {
                        isBreak = callback(globTileXY, this);
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
                    globTileXY.x = x;
                    globTileXY.y = y;
                    if (scope) {
                        isBreak = callback.call(scope, globTileXY, this);
                    } else {
                        isBreak = callback(globTileXY, this);
                    }

                    if (isBreak) {
                        break;
                    }
                }
            }
    }
    return this;
};

var globTileXY = {
    x: 0,
    y: 0
}

export default ForEachTileXY;