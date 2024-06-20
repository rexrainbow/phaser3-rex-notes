import UpdateCameraMetrix from './UpdateCameraMetrix.js';

var ZoomFocusAt = function (camera, zoom, focusLocalX, focusLocalY) {
    var worldXY = camera.getWorldPoint(focusLocalX, focusLocalY);
    camera.zoom = zoom;

    UpdateCameraMetrix(camera);

    var newWorldXY = camera.getWorldPoint(focusLocalX, focusLocalY);
    camera.scrollX -= (newWorldXY.x - worldXY.x);
    camera.scrollY -= (newWorldXY.y - worldXY.y);
}

export default ZoomFocusAt;