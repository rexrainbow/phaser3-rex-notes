var KeyToTileXYZ = function (key, out, separator) {
    if (out === undefined) {
        out = tmp;
    }
    if (separator === undefined) {
        separator = ',';
    }
    var items = key.split(separator);
    out.x = items[0];
    out.y = items[1];
    out.z = items[2];
    return out;
}

var tmp = {
    x: 0,
    y: 0,
    z: 0
};

export default KeyToTileXYZ;