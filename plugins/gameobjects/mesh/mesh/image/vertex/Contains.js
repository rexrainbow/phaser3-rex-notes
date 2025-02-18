var Contains = function (face, x, y) {
    var vertices = face.vertices;
    var v0 = vertices[0];
    var v1 = vertices[1];
    var v2 = vertices[2];
    GlobTriangle.setTo(
        v0.localX, v0.localY,
        v1.localX, v1.localY,
        v2.localX, v2.localY,
    )

    return GlobTriangle.contains(x, y);
}

var GlobTriangle = new Phaser.Geom.Triangle();

export default Contains