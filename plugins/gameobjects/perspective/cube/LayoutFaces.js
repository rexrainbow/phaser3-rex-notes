import ForEachFace from '../utils/ForEachFace.js';

const DegToRad = Phaser.Math.DegToRad;
const RAD90 = DegToRad(90);

var LayoutFaces = function (parent, faces) {
    var frontFace = faces.front;
    if (frontFace) {
        frontFace.transformVerts(
            0, 0, 0.5,
            0, 0, 0
        )
    }

    var backFace = faces.back;
    if (backFace) {
        backFace.transformVerts(
            0, 0, -0.5,
            0, (RAD90 * 2), 0
        )
    }

    var leftFace = faces.left;
    if (leftFace) {
        leftFace.transformVerts(
            -0.5, 0, 0,
            0, -RAD90, 0
        )
    }

    var rightFace = faces.right;
    if (rightFace) {
        rightFace.transformVerts(
            0.5, 0, 0,
            0, RAD90, 0
        )
    }

    var topFace = faces.top;
    if (topFace) {
        topFace.transformVerts(
            0, 0.5, 0,
            -RAD90, 0, 0
        )
    }

    var bottomFace = faces.bottom;
    if (bottomFace) {
        bottomFace.transformVerts(
            0, -0.5, 0,
            RAD90, 0, 0
        )
    }

    ForEachFace(faces, function (face) {
        face.panZ(0.5);
    }, null, true)
}

export default LayoutFaces;