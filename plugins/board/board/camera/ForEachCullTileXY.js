import GetValue from '../../../utils/object/GetValue.js';
import Rectangle from '../../../utils/geom/rectangle/Rectangle.js';

var ForEachCullTileXY = function (callback, scope, config) {
    var order;
    if (typeof (config) === 'number') {
        order = config;
        config = undefined;
    }

    if (config === undefined) {
        config = {};
    }

    order = GetValue(config, 'order', order);

    var camera = GetValue(config, 'camera', this.scene.cameras.main);
    var paddingX = GetValue(config, 'paddingX', 1);
    var paddingY = GetValue(config, 'paddingY', 1);

    ViewportBounds.width = (camera.width + paddingX * 2) / camera.zoomX;
    ViewportBounds.height = (camera.height + paddingY * 2) / camera.zoomY;
    ViewportBounds.centerX = camera.centerX + camera.scrollX;
    ViewportBounds.centerY = camera.centerY + camera.scrollY;

    this.forEachTileXY(function (tileXY, board) {
        // Center position in world bounds
        var worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
        if (!ViewportBounds.contains(worldXY.x, worldXY.y)) {
            // Tile bounds across world bounds
            var tileBounds = board.getGridBounds(tileXY.x, tileXY.y, true);
            if (ContainsPoints(ViewportBounds, tileBounds) === 0) {
                return;
            }
        }

        var isBreak;
        if (scope) {
            isBreak = callback.call(scope, tileXY, board);
        } else {
            isBreak = callback(tileXY, board);
        }
        return isBreak;
    }, undefined, order);

    return this;
}

var ContainsPoints = function (rectA, rectB) {
    var result = 0;
    var top = rectB.top,
        bottom = rectB.bottom,
        left = rectB.left,
        right = rectB.right;
    result += rectA.contains(left, top) ? 1 : 0;
    result += rectA.contains(left, bottom) ? 1 : 0;
    result += rectA.contains(right, top) ? 1 : 0;
    result += rectA.contains(right, bottom) ? 1 : 0;
    return result;
};

var ViewportBounds = new Rectangle();

export default ForEachCullTileXY;