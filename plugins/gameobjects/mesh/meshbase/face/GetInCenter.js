const InCenter = Phaser.Geom.Triangle.InCenter;

var GetInCenter = function (x1, y1, x2, y2, x3, y3, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobalOut;
    }

    GlobalTriangle.x1 = x1;
    GlobalTriangle.y1 = y1;
    GlobalTriangle.x2 = x2;
    GlobalTriangle.y2 = y2;
    GlobalTriangle.x3 = x3;
    GlobalTriangle.y3 = y3;

    return InCenter(GlobalTriangle, out);
}

var GlobalTriangle = {};
var GlobalOut = {};

export default GetInCenter;