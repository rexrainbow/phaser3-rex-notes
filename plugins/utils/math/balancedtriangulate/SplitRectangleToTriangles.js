import TinyQueue from 'tinyqueue';
import SplitRectangleTo4Triangles from './SplitRectangleTo4Triangles.js';
import SplitTriangleTo3Triangles from './SplitTriangleTo3Triangles.js';
import SplitTriangleTo2Triangles from './SplitTriangleTo2Triangles.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Rectangle = Phaser.Geom.Rectangle;
const TriangleArea = Phaser.Geom.Triangle.Area;

var SplitRectangleToTriangles = function (config) {
    var rectangle = config.rectangle;
    if (!rectangle) {
        rectangle = new Rectangle(0, 0, config.width, config.height);
    }

    var amount = GetValue(config, 'amount', 10);
    var variation = GetValue(config, 'variation', 0.25);
    var triangleOutput = GetValue(config, 'triangleOutput', true);

    var triangles = SplitRectangleTo4Triangles(rectangle, variation);  // 4 Triangles
    amount -= 4;
    var heap = new TinyQueue(triangles, function (item0, item1) {
        return TriangleArea(item1) - TriangleArea(item0);
    });

    var splitMode;
    while (amount > 0) {
        var triangle = heap.pop();

        if (amount === 1) {
            splitMode = 1;
        } else if (amount === 2) {
            splitMode = 2;
        } else {
            splitMode = (Math.random() > 0.5) ? 2 : 1;
        }

        if (splitMode === 1) {
            triangles = SplitTriangleTo2Triangles(triangle, variation); // +1 Triangle
            amount -= 1;

        } else { // splitMode == 2
            triangles = SplitTriangleTo3Triangles(triangle, variation); // +2 Triangles  
            amount -= 2;
        }

        for (var i = 0, cnt = triangles.length; i < cnt; i++) {
            heap.push(triangles[i]);
        }
    }

    triangles = heap.data.slice();

    if (triangleOutput) {
        return triangles;

    } else {
        var vertices = [];
        for (var i = 0, cnt = triangles.length; i < cnt; i++) {
            var triagnle = triangles[i];
            vertices.push([triagnle.x1, triagnle.y1]);
            vertices.push([triagnle.x2, triagnle.y2]);
            vertices.push([triagnle.x3, triagnle.y3]);
        }

        var indices = [];
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            indices.push(i);
        }

        return {
            vertices: vertices,
            indices: indices
        }
    }


}

export default SplitRectangleToTriangles;