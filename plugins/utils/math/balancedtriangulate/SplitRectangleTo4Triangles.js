import Random from './Random.js';

const Triangle = Phaser.Geom.Triangle;
const Linear = Phaser.Math.Linear;

var SplitRectangleTo4Triangles = function (rectangle, variation) {
    var ax = rectangle.x, ay = rectangle.y;
    var bx = rectangle.right, by = rectangle.y;
    var cx = rectangle.right, cy = rectangle.bottom;
    var dx = rectangle.x, dy = rectangle.bottom;
    var px = Linear(ax, cx, Random(variation));
    var py = Linear(ay, cy, Random(variation));

    var triangleA = new Triangle(ax, ay, bx, by, px, py);  // ABP
    var triangleB = new Triangle(bx, by, cx, cy, px, py);  // BCP
    var triangleC = new Triangle(cx, cy, dx, dy, px, py);  // CDP
    var triangleD = new Triangle(dx, dy, ax, ay, px, py);  // DAP

    return [triangleA, triangleB, triangleC, triangleD];

}

export default SplitRectangleTo4Triangles;