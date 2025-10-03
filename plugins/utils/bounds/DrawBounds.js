import {
    GetTopLeft,
    GetTopRight,
    GetBottomLeft,
    GetBottomRight,
} from './GetBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var DrawBounds = function (gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent;
    if (typeof (config) === 'number') {
        strokeColor = config;
    } else {
        strokeColor = GetValue(config, 'color');
        lineWidth = GetValue(config, 'lineWidth');
        fillColor = GetValue(config, 'fillColor');
        fillAlpha = GetValue(config, 'fillAlpha');
        padding = GetValue(config, 'padding');
        includeParent = GetValue(config, 'includeParent');
    }

    if (strokeColor === undefined) { strokeColor = 0xffffff; }
    if (lineWidth === undefined) { lineWidth = 1; }
    if (fillColor === undefined) { fillColor = null };
    if (fillAlpha === undefined) { fillAlpha = 1 };
    if (padding === undefined) { padding = 0; }
    if (includeParent === undefined) { includeParent = true; }

    if (Array.isArray(gameObjects)) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            Draw(gameObjects[i], graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent);
        }
    } else {
        Draw(gameObjects, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent);
    }
}

var Draw = function (gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent) {
    var canDrawBound = gameObject.getBounds ||
        ((gameObject.width !== undefined) && (gameObject.height !== undefined));
    if (!canDrawBound) {
        return;
    }

    var p0 = GetTopLeft(gameObject, Points[0], includeParent);
    p0.x -= padding;
    p0.y -= padding;

    var p1 = GetTopRight(gameObject, Points[1], includeParent);
    p1.x += padding;
    p1.y -= padding;

    var p2 = GetBottomRight(gameObject, Points[2], includeParent);
    p2.x += padding;
    p2.y += padding;

    var p3 = GetBottomLeft(gameObject, Points[3], includeParent);
    p3.x -= padding;
    p3.y += padding;

    if (fillColor !== null) {
        graphics
            .fillStyle(fillColor, fillAlpha)
            .fillPoints(Points, true, true);
    }
    if (strokeColor !== null) {
        graphics
            .lineStyle(lineWidth, strokeColor)
            .strokePoints(Points, true, true);
    }

}

var Points = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];

export default DrawBounds;