var InitFaces = function (quad) {
    var isNinePointMode = quad.isNinePointMode;
    var pointsPerSide = (isNinePointMode) ? 3 : 2;

    var vertices = [];
    for (var r = 0; r < pointsPerSide; r++) {
        for (var c = 0; c < pointsPerSide; c++) {
            var u = c / (pointsPerSide - 1);
            var v = r / (pointsPerSide - 1);
            var vertex = quad.createVertex(u, v);
            vertices.push(vertex);
        }
    }

    var indices;
    if (isNinePointMode) {
        indices = NinePointsIndices;
    } else {
        if (!quad.fourPointsModeRTL) {
            indices = FourPointsIndices;
        } else {
            indices = FourPointsIndicesRTL;
        }
    }

    for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
        var vertex0 = vertices[indices[i + 0]];
        var vertex1 = vertices[indices[i + 1]];
        var vertex2 = vertices[indices[i + 2]];
        var face = quad.createFace(vertex0, vertex1, vertex2);
        quad.addFace(face);
    }

    quad.vertices.sort(function (vertexA, vertexB) {
        if (vertexA.v === vertexB.v) {
            return vertexA.u - vertexB.u;
        } else {
            return vertexA.v - vertexB.v;
        }
    })

    if (isNinePointMode) {
        quad.topLeft = vertices[0];
        quad.topCenter = vertices[1];
        quad.topRight = vertices[2];
        quad.centerLeft = vertices[3];
        quad.center = vertices[4];
        quad.centerRight = vertices[5];
        quad.bottomLeft = vertices[6];
        quad.bottomCenter = vertices[7];
        quad.bottomRight = vertices[8];
    } else {
        quad.topLeft = vertices[0];
        quad.topRight = vertices[1];
        quad.bottomLeft = vertices[2];
        quad.bottomRight = vertices[3];
    }
}

/*
0, 1,
2, 3,
*/
const FourPointsIndices = [
    0, 2, 3,
    0, 3, 1
];

const FourPointsIndicesRTL = [
    1, 3, 2,
    1, 2, 0
];


/*
0, 1, 2,
3, 4, 5,
6, 7, 8
*/
const NinePointsIndices = [
    0, 3, 4,
    0, 4, 1,
    1, 4, 2,
    4, 5, 2,
    3, 6, 4,
    6, 7, 4,
    4, 7, 8,
    4, 8, 5
];

export default InitFaces;