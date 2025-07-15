import TinyQueue from 'tinyqueue';
import SplitRectangleTo4Triangles from './SplitRectangleTo4Triangles.js';
import SplitTriangleTo3Triangles from './SplitTriangleTo3Triangles.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Rectangle = Phaser.Geom.Rectangle;
const TriangleArea = Phaser.Geom.Triangle.Area;

var SplitRectangleToTriangles = function (config) {
    var rectangle = config.rectangle;
    if (!rectangle) {
        rectangle = new Rectangle(0, 0, config.width, config.height);
    }

    var minCount = GetValue(config, 'minCount', 10);
    var triangleOutput = GetValue(config, 'triangleOutput', true);

    var triangles = SplitRectangleTo4Triangles(rectangle);
    var heap = new TinyQueue(triangles, function (item0, item1) {
        return TriangleArea(item1) - TriangleArea(item0);
    });

    while (heap.length < minCount) {
        var maxAreaTriangle = heap.pop();
        var tirangles = SplitTriangleTo3Triangles(maxAreaTriangle);
        heap.push(...tirangles);
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