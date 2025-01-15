const InCenter = Phaser.Geom.Triangle.InCenter;

var GetInCenter = function (face, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobalOut;
    }

    GlobalTriangle.x1 = face.vertices[0].localX;
    GlobalTriangle.y1 = face.vertices[0].localY;
    GlobalTriangle.x2 = face.vertices[1].localX;
    GlobalTriangle.y2 = face.vertices[1].localY;
    GlobalTriangle.x3 = face.vertices[2].localX;
    GlobalTriangle.y3 = face.vertices[2].localY;

    return InCenter(GlobalTriangle, out);
}

var GlobalTriangle = {};
var GlobalOut = {};

export default GetInCenter;