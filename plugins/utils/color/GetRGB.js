var GetR = function (colorInt) {
    return (colorInt >> 16) & 0xff;
}

var GetG = function (colorInt) {
    return (colorInt >> 8) & 0xff;
}

var GetB = function (colorInt) {
    return (colorInt) & 0xff;
}

var GetRGB = function (colorInt, out) {
    if (out === undefined) {
        out = {};
    }

    out.r = (colorInt >> 16) & 0xff;
    out.g = (colorInt >> 8) & 0xff;
    out.b = (colorInt) & 0xff;

    return out;

}

export {
    GetR, GetG, GetB, GetRGB
}