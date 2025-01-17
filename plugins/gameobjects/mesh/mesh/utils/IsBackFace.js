var IsBackFace = function (face) {
    var vertex0 = face.vertices[0]; // Top-left
    var vertex1 = face.vertices[1]; // Top-right
    var vertex2 = face.vertices[2]; // Bottom-left

    var edge1 = [vertex1[0] - vertex0[0], vertex1[1] - vertex0[1], vertex1[2] - vertex0[2]];
    var edge2 = [vertex2[0] - vertex0[0], vertex2[1] - vertex0[1], vertex2[2] - vertex0[2]];

    var normal = [
        edge1[1] * edge2[2] - edge1[2] * edge2[1],
        edge1[2] * edge2[0] - edge1[0] * edge2[2],
        edge1[0] * edge2[1] - edge1[1] * edge2[0]
    ];

    return normal[2] < 0;
}

export default IsBackFace;