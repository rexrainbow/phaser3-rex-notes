const Polygon = Phaser.Geom.Polygon;

var BoundsToPolygon = function (gameObject, out) {
    if (out === undefined) {
        out = new Polygon();
    }
    var p0 = gameObject.getTopLeft(),
        p1 = gameObject.getTopRight(),
        p2 = gameObject.getBottomRight(),
        p3 = gameObject.getBottomLeft();
    out.setTo([p0, p1, p2, p3, p0]);
    return out;
}

export default BoundsToPolygon;