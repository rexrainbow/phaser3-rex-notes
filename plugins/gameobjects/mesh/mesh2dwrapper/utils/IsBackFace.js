var IsBackFace = function (vertexObjects, faceIndices, offset) {
    if (offset === undefined) { offset = 0; }

    if (!vertexObjects || !faceIndices || faceIndices.length < offset + 3) {
        return false;
    }

    var vertex0 = vertexObjects[faceIndices[offset]];
    var vertex1 = vertexObjects[faceIndices[offset + 1]];
    var vertex2 = vertexObjects[faceIndices[offset + 2]];

    if (!vertex0 || !vertex1 || !vertex2) {
        return false;
    }

    var v0 = vertex0.xyz;  // [x,y,z]
    var v1 = vertex1.xyz;  // [x,y,z]
    var v2 = vertex2.xyz;  // [x,y,z]

    if (!v0 || !v1 || !v2) {
        return false;
    }

    var edge1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
    var edge2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];

    var normalZ = edge1[0] * edge2[1] - edge1[1] * edge2[0];

    return normalZ < 0;
}

export default IsBackFace;
