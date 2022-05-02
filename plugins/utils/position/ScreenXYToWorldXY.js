var ScreenXYToWorldXY = function (screenX, screenY, camera, out) {
    if (out === undefined) {
        out = { x: 0, y: 0 };
    } else if (out === true) {
        out = globalOut;
    }

    camera.getWorldPoint(screenX, screenY, out);
    return out;
}

var globalOut = { x: 0, y: 0 };

export default ScreenXYToWorldXY;