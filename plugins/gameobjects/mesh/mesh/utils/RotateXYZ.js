var RotateXYZ = function (gameObject, rotationX, rotationY, rotationZ, centerX, centerY) {
    var vertices = gameObject.vertices;

    if ((rotationX === 0) && (rotationY === 0) && (rotationZ === 0)) {
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            vertices[i].resetPosition();
        }
        return;
    }

    if (centerX === undefined) {
        centerX = gameObject.width / 2;
    }
    if (centerY === undefined) {
        centerY = gameObject.height / 2;
    }

    var vertex, x, y, z, xTemp, yTemp, zTemp;
    var cosX = Math.cos(rotationX),
        sinX = Math.sin(rotationX);
    var cosY = Math.cos(rotationY),
        sinY = Math.sin(rotationY);
    var cosZ = Math.cos(rotationZ),
        sinZ = Math.sin(rotationZ);
    var perspective = gameObject.scene.scale.gameSize.width,
        scale;
    for (var i = 0, cnt = vertices.length; i < cnt; i++) {
        vertex = vertices[i];
        x = vertex.frameX - centerX;
        y = vertex.frameY - centerY;
        z = 0;

        // Rotate around x-axis
        yTemp = y * cosX - z * sinX;
        zTemp = y * sinX + z * cosX;
        y = yTemp;
        z = zTemp;

        // Rotate around y-axis
        xTemp = x * cosY + z * sinY;
        zTemp = -x * sinY + z * cosY;
        x = xTemp;
        z = zTemp;

        // Rotate around z-axis
        xTemp = x * cosZ - y * sinZ;
        yTemp = x * sinZ + y * cosZ;
        x = xTemp;
        y = yTemp;

        scale = perspective / (perspective - z);
        vertex.localX = x * scale + centerX;
        vertex.localY = y * scale + centerY;
    }
}

export default RotateXYZ;