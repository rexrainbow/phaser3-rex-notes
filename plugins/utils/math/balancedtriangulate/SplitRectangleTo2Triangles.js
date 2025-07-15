const Triangle = Phaser.Geom.Triangle;

var SplitRectangleTo2Triangles = function (rectangle, variation) {
    var ax = rectangle.x, ay = rectangle.y;
    var bx = rectangle.right, by = rectangle.y;
    var cx = rectangle.right, cy = rectangle.bottom;
    var dx = rectangle.x, dy = rectangle.bottom;

    var triangleA = new Triangle(ax, ay, bx, by, dx, dy);  // ABD
    var triangleB = new Triangle(bx, by, cx, cy, dx, dy);  // BCD

    return [triangleA, triangleB];

}

export default SplitRectangleTo2Triangles;