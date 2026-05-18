var LayoutFaces = function(parent?: any, faces?: any) {
    var backFace = faces.back;
    if (backFace?: any) {
        if (parent.orientation === 0) { // Flip around Y
            backFace.angleY = 180;
        } else { // Flip around X
            backFace.angleX = 180;
        }
    }
}

export default LayoutFaces;