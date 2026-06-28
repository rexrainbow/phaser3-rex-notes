var RotateXYZ = function (gameObject, rotationX, rotationY, rotationZ, centerX, centerY) {
    var vertexObjects = gameObject.vertexObjects;

    if (!vertexObjects) {
        return;
    }

    if (rotationX === undefined) { rotationX = 0; }
    if (rotationY === undefined) { rotationY = 0; }
    if (rotationZ === undefined) { rotationZ = 0; }

    if (centerX === undefined) {
        centerX = gameObject.width / 2;
    }
    if (centerY === undefined) {
        centerY = gameObject.height / 2;
    }

    var i, cnt, vertexObject, xyz;

    if ((rotationX === 0) && (rotationY === 0) && (rotationZ === 0)) {
        for (i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            vertexObject = vertexObjects[i];
            vertexObject.resetPosition();

            if (!vertexObject.hasOwnProperty('xyz')) {
                vertexObject.xyz = [0, 0, 0];
            }

            xyz = vertexObject.xyz;
            xyz[0] = vertexObject.frameX - centerX;
            xyz[1] = vertexObject.frameY - centerY;
            xyz[2] = 0;
        }

    } else {
        var x, y, z, xTemp, yTemp, zTemp;
        var cosX = Math.cos(rotationX),
            sinX = Math.sin(rotationX);
        var cosY = Math.cos(rotationY),
            sinY = Math.sin(rotationY);
        var cosZ = Math.cos(rotationZ),
            sinZ = Math.sin(rotationZ);
        var perspective = gameObject.scene.scale.gameSize.width,
            scale;

        for (i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            vertexObject = vertexObjects[i];
            x = vertexObject.frameX - centerX;
            y = vertexObject.frameY - centerY;
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

            // Project from 3d to 2d
            scale = perspective / (perspective - z);
            vertexObject.localX = x * scale + centerX;
            vertexObject.localY = y * scale + centerY;

            // Store [x,y,z]
            if (!vertexObject.hasOwnProperty('xyz')) {
                vertexObject.xyz = [0, 0, 0];
            }
            xyz = vertexObject.xyz;
            xyz[0] = x;
            xyz[1] = y;
            xyz[2] = z;
        }
    }

}

export default RotateXYZ;
