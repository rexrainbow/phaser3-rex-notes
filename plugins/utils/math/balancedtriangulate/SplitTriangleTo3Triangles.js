import Random from './Random.js';

const Triangle = Phaser.Geom.Triangle;

var SplitTriangleTo3Triangles = function (triangle, variation) {
    var r1 = Random(variation);
    var r2 = Random(variation);
    var s = Math.sqrt(r1);

    var ax = triangle.x1, ay = triangle.y1;
    var bx = triangle.x2, by = triangle.y2;
    var cx = triangle.x3, cy = triangle.y3;

    var px = ax * (1 - s) + bx * s * (1 - r2) + cx * s * r2;
    var py = ay * (1 - s) + by * s * (1 - r2) + cy * s * r2;
    var triangleA = new Triangle(ax, ay, bx, by, px, py);  // ABP
    var triangleB = new Triangle(bx, by, cx, cy, px, py);  // BCP
    var triangleC = new Triangle(cx, cy, ax, ay, px, py);  // CAP

    return [triangleA, triangleB, triangleC];
}

export default SplitTriangleTo3Triangles;