// BaseCamera.preRender()
var UpdateCameraMetrix = function (camera) {
    var width = camera.width;
    var height = camera.height;
    var zoomX = camera.zoomX;
    var zoomY = camera.zoomY;
    var matrix = camera.matrix;

    var sx = camera.scrollX;
    var sy = camera.scrollY;

    if (camera.useBounds)
    {
        sx = camera.clampX(sx);
        sy = camera.clampY(sy);
    }

    //  Values are in pixels and not impacted by zooming the Camera
    camera.scrollX = sx;
    camera.scrollY = sy;

    var midX = sx + (width * 0.5);
    var midY = sy + (height * 0.5);

    //  The center of the camera, in world space, so taking zoom into account
    //  Basically the pixel value of what it's looking at in the middle of the cam
    camera.midPoint.set(midX, midY);

    var displayWidth = width / zoomX;
    var displayHeight = height / zoomY;

    camera.worldView.setTo(
        midX - (displayWidth / 2),
        midY - (displayHeight / 2),
        displayWidth,
        displayHeight
    );

    var originX = width * camera.originX;
    var originY = height * camera.originY;

    matrix.applyITRS(camera.x + originX, camera.y + originY, camera.rotation, zoomX, zoomY);
    matrix.translate(-originX, -originY);
}

export default UpdateCameraMetrix;