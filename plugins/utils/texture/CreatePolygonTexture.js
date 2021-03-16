import GetStyle from '../canvas/GetStyle.js';
import DrawPolygon from '../canvas/DrawPolygon.js';

var CreatePolygonTexture = function (scene, key, points, fillStyle, strokeStyle, lineWidth, lineJoin) {

    if ((fillStyle === undefined) && (strokeStyle === undefined)) {
        fillStyle = 0xffffff;
    }
    if (strokeStyle === undefined) {
        lineWidth = 0;
    } else if (lineWidth === undefined) {
        lineWidth = 2;
    }

    var minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        var p = points[i], px = p.x, py = p.y;
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
    }

    var width = maxX - minX;
    var height = maxY - minY;

    var texture = scene.textures.createCanvas(key, Math.ceil(width), Math.ceil(height));
    var canvas = texture.getCanvas();
    var context = texture.getContext();

    var halfW = width / 2;
    var halfH = height / 2;
    var halfLW = lineWidth / 2;
    var drawPoints = [];
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        var p = points[i];
        drawPoints.push({
            x: Indent((p.x - minX), halfW, halfLW),
            y: Indent((p.y - minY), halfH, halfLW)
        })
    }

    DrawPolygon(
        canvas, context,
        drawPoints,
        GetStyle(fillStyle, canvas, context),
        GetStyle(strokeStyle, canvas, context),
        lineWidth,
        lineJoin
    )

    texture.refresh();
}

var Indent = function (value, halfBound, offset) {
    if (value < halfBound) {
        return (value + offset);
    } else if (value > halfBound) {
        return (value - offset);
    } else {
        return value;
    }
}

export default CreatePolygonTexture;