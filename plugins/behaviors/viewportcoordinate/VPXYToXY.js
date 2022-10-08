var VPXYToXY = function (vpx, vpy, viewport, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobXY;
    }

    out.x = viewport.x + (viewport.width * vpx);
    out.y = viewport.y + (viewport.height * vpy);
    return out;
}

var GlobXY = {};

export default VPXYToXY;