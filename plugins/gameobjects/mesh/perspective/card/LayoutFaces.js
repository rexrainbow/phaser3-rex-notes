var LayoutFaces = function (parent, faces) {
    var backFace = faces.back;
    if (backFace) {
        if (parent.orientation === 0) { // Flip around Y
            backFace.angleY = 180;
        } else { // Flip around X
            backFace.angleX = 180;
        }
    }
}

export default LayoutFaces;