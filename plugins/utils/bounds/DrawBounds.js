import {
    GetTopLeft,
    GetTopRight,
    GetBottomLeft,
    GetBottomRight,
} from './GetBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var DrawBounds = function (gameObjects, graphics, config) {
    var color, lineWidth, padding;
    if (typeof (config) === 'number') {
        color = config;
    } else {
        color = GetValue(config, 'color');
        lineWidth = GetValue(config, 'lineWidth');
        padding = GetValue(config, 'padding', 0);
    }

    if (Array.isArray(gameObjects)) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            Draw(gameObjects[i], graphics, color, lineWidth);
        }
    } else {
        Draw(gameObjects, graphics, color, lineWidth);
    }
}

var Draw = function (gameObject, graphics, color, lineWidth, padding) {
    var canDrawBound = gameObject.getBounds ||
        ((gameObject.width !== undefined) && (gameObject.height !== undefined));
    if (!canDrawBound) {
        return;
    }

    if (color === undefined) { color = 0xffffff; }
    if (lineWidth === undefined) { lineWidth = 1; }
    if (padding === undefined) { padding = 0; }

    var p0 = GetTopLeft(gameObject, Points[0]);
    p0.x -= padding;
    p0.y -= padding;

    var p1 = GetTopRight(gameObject, Points[1]);
    p1.x += padding;
    p1.y -= padding;

    var p2 = GetBottomRight(gameObject, Points[2]);
    p2.x += padding;
    p2.y += padding;

    var p3 = GetBottomLeft(gameObject, Points[3]);
    p3.x -= padding;
    p3.y += padding;

    graphics
        .lineStyle(lineWidth, color)
        .strokePoints(Points, true, true);
}

var Points = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];

export default DrawBounds;