var Layout = function (carousel) {
    var faces = carousel.faces;
    if (faces.length === 0) {
        return;
    }

    var faceWidth = faces[0].width; // Assume that all faces have the same size.
    var angle = 360 / faces.length;
    var radius = (faceWidth / 2) / Math.tan(angle / 2);
}

export default Layout;