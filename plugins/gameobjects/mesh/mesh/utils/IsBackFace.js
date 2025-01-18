var IsBackFace = function (face) {
    var v0 = face.vertices[0].xyz;  // [x,y,z]
    var v1 = face.vertices[1].xyz;  // [x,y,z]
    var v2 = face.vertices[2].xyz;  // [x,y,z]

    var edge1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
    var edge2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];

    var normal = [
        edge1[1] * edge2[2] - edge1[2] * edge2[1],
        edge1[2] * edge2[0] - edge1[0] * edge2[2],
        edge1[0] * edge2[1] - edge1[1] * edge2[0]
    ];

    return normal[2] < 0;
}

export default IsBackFace;