var LineTo = function (x, y, out) {
    var cnt = out.length;
    if (cnt >= 2) {
        var lastX = out[cnt - 2];
        var lastY = out[cnt - 1];
        if ((x === lastX) && (y === lastY)) {
            return out;
        }
    }

    out.push(x, y);
    return out;
}

export default LineTo;