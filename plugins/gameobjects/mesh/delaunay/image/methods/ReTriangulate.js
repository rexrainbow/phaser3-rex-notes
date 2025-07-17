import RectangleToTriangles from '../../../../../utils/math/rectangletotriangles/delaunay/RectangleToTriangles.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var ReTriangulate = function (config) {
    if (IsPlainObject(config)) {
        if (config.hasOwnProperty('triangleCount')) {
            this.setTriangleCount(config.triangleCount);
        }
    }

    // Clear faces and vertices
    this.clear();
    if ((this.width === 0) || (this.height === 0)) {
        return this;
    }

    var result = RectangleToTriangles({
        width: 1, height: 1,
        amount: this.triangleCount,

        triangleOutput: false,
    })
    var vertices = result.vertices;
    var indices = result.indices;

    // Calculate vertex data
    // Build face
    for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
        var v0 = vertices[indices[i + 0]];
        var v1 = vertices[indices[i + 1]];
        var v2 = vertices[indices[i + 2]];

        var vertex0 = this.createVertex(v0[0], v0[1]);
        var vertex1 = this.createVertex(v1[0], v1[1]);
        var vertex2 = this.createVertex(v2[0], v2[1]);
        var face = this.createFace(vertex0, vertex1, vertex2);
        this.addFace(face);
    }

    return this;
}

export default ReTriangulate;