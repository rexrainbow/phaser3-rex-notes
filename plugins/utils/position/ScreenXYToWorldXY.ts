var ScreenXYToWorldXY = function(screenX?: any, screenY?: any, camera?: any, out?: any) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globalOut;
    }

    camera.getWorldPoint(screenX, screenY, out);
    return out;
}

var globalOut = {};

export default ScreenXYToWorldXY;