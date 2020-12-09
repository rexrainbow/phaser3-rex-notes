import Triangulate from './Triangulate.js';

const TWO_PI = Math.PI * 2;
const SampleCount = 12;
const Clamp = Phaser.Math.Clamp;

var ShatterRectangleToTriangles = function (rectangle, startPoint) {
    var left = rectangle.x,
        top = rectangle.y,
        width = rectangle.width,
        height = rectangle.height,
        right = left + width,
        bottom = top + height;

    var startX, startY;
    if (startPoint === undefined) {
        startX = (left + right) / 2;
        startY = (top + bottom) / 2;
    } else {
        startX = startPoint.x;
        startY = startPoint.y;
    }

    var vertices = [];
    vertices.push([startX, startY]);

    var radius = Math.max(width, height) * 1.5;
    for (var i = 0; i < 4; i++) {
        var r = radius * (3 ** i) / 27; // 1, 3, 9, 27
        for (var c = 0; c < SampleCount; c++) {
            var rad = (c / SampleCount) * TWO_PI;
            var x = startX + Math.cos(rad) * r * RandomRange(0.75, 1.25);
            var y = startY + Math.sin(rad) * r * RandomRange(0.75, 1.25);
            x = Clamp(x, left, right);
            y = Clamp(y, top, bottom);
            vertices.push([x, y]);
        }
    }

    return Triangulate(vertices);
}

var RandomRange = function (min, max) {
    return min + (max - min) * Math.random();
}

export default ShatterRectangleToTriangles;