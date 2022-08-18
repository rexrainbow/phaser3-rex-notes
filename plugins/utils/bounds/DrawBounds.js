import {
    GetTopLeft,
    GetTopRight,
    GetBottomLeft,
    GetBottomRight,
} from './GetBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var DrawBounds = function (gameObject, graphics, config) {
    var canDrawBound = gameObject.getBounds ||
        ((gameObject.width !== undefined) && (gameObject.height !== undefined));
    if (!canDrawBound) {
        return;
    }

    var color, lineWidth;
    if (typeof (config) === 'number') {
        color = config;
    } else {
        color = GetValue(config, 'color');
        lineWidth = GetValue(config, 'lineWidth');
    }

    if (color === undefined) {
        color = 0xffffff;
    }
    if (lineWidth === undefined) {
        lineWidth = 1;
    }

    Points[0] = GetTopLeft(gameObject, Points[0]);
    Points[1] = GetTopRight(gameObject, Points[1]);
    Points[2] = GetBottomRight(gameObject, Points[2]);
    Points[3] = GetBottomLeft(gameObject, Points[3]);
    graphics
        .lineStyle(lineWidth, color)
        .strokePoints(Points, true, true);
}

var Points = [undefined, undefined, undefined, undefined];

export default DrawBounds;