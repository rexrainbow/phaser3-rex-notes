var ZoomAt = function(camera?: any, zoom?: any, focusLocalX?: any, focusLocalY?: any) {
    if (focusLocalX === undefined) {
        camera.zoom = zoom;
        return;
    }

    var worldXY = camera.getWorldPoint(focusLocalX, focusLocalY);
    camera.zoom = zoom;

    camera.preRender();

    var newWorldXY = camera.getWorldPoint(focusLocalX, focusLocalY);
    camera.scrollX -= (newWorldXY.x - worldXY.x);
    camera.scrollY -= (newWorldXY.y - worldXY.y);
}

export default ZoomAt;