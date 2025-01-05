const InCenter = Phaser.Geom.Triangle.InCenter;

var GetInCenter = function (face, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobalOut;
    }

    GlobalTriangle.x1 = face.vertices[0].x;
    GlobalTriangle.y1 = face.vertices[0].y;
    GlobalTriangle.x2 = face.vertices[1].x;
    GlobalTriangle.y2 = face.vertices[1].y;
    GlobalTriangle.x3 = face.vertices[2].x;
    GlobalTriangle.y3 = face.vertices[2].y;

    return InCenter(GlobalTriangle, out);
}

var GlobalTriangle = {};
var GlobalOut = {};

export default GetInCenter;