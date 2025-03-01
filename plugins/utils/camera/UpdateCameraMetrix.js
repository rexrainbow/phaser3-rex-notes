// BaseCamera.preRender()
var UpdateCameraMetrix = function (camera) {
    var width = camera.width;
    var height = camera.height;
    var halfWidth = width * 0.5;
    var halfHeight = height * 0.5;

    var zoomX = camera.zoomX;
    var zoomY = camera.zoomY;
    var matrix = camera.matrix;

    var sx = camera.scrollX;
    var sy = camera.scrollY;

    if (camera.useBounds) {
        sx = camera.clampX(sx);
        sy = camera.clampY(sy);
    }

    //  Values are in pixels and not impacted by zooming the Camera
    camera.scrollX = sx;
    camera.scrollY = sy;

    var midX = sx + halfWidth;
    var midY = sy + halfHeight;

    //  The center of the camera, in world space, so taking zoom into account
    //  Basically the pixel value of what it's looking at in the middle of the cam
    camera.midPoint.set(midX, midY);

    var displayWidth = width / zoomX;
    var displayHeight = height / zoomY;

    var vwx = midX - (displayWidth / 2);
    var vwy = midY - (displayHeight / 2);

    camera.worldView.setTo(vwx, vwy, displayWidth, displayHeight);

    var originX = width * camera.originX;
    var originY = height * camera.originY;

    matrix.applyITRS(camera.x + originX, camera.y + originY, camera.rotation, zoomX, zoomY);
    matrix.translate(-originX, -originY);
}

export default UpdateCameraMetrix;