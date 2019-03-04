var KeyToTileXYZ = function (key, out, separator) {
    if (out === undefined) {
        out = {};
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

export default KeyToTileXYZ;