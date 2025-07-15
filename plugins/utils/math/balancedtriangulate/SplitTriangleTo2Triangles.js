import Random from './Random.js';

const Triangle = Phaser.Geom.Triangle;
const LineLength = Phaser.Geom.Line.Length;

var SplitTriangleTo3Triangles = function (triangle, variation) {
    var ax = triangle.x1, ay = triangle.y1;
    var bx = triangle.x2, by = triangle.y2;
    var cx = triangle.x3, cy = triangle.y3;

    var lineA = triangle.getLineA();  // A - B
    var lineB = triangle.getLineB();  // B - C
    var lineC = triangle.getLineC();  // C - A
    var lenA = LineLength(lineA);
    var lenB = LineLength(lineB);
    var lenC = LineLength(lineC);

    var triangleA, triangleB;
    if ((lenA >= lenB) && (lenA >= lenC)) { // Split at lineA (A - B)
        var p = lineA.getPoint(Random(variation));
        triangleA = new Triangle(ax, ay, p.x, p.y, cx, cy);  // APC
        triangleB = new Triangle(p.x, p.y, cx, cy, bx, by);  // PCB
    } else if ((lenB >= lenA) && (lenB >= lenC)) {  // Split at lineB (B - C)
        var p = lineB.getPoint(Random(variation));
        triangleA = new Triangle(bx, by, p.x, p.y, ax, ay);  // BPA
        triangleB = new Triangle(cx, cy, ax, ay, p.x, p.y);  // CAP
    } else { // Split at lineC (C - A)
        var p = lineC.getPoint(Random(variation));
        triangleA = new Triangle(p.x, p.y, ax, ay, bx, by);  // PAB
        triangleB = new Triangle(cx, cy, p.x, p.y, bx, by);  // CPB
    }

    return [triangleA, triangleB];
}

export default SplitTriangleTo3Triangles;