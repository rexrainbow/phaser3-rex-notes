var KeyToTileXYZ = function(key?: any, out?: any, separator?: any) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXYZ;
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

var globTileXYZ = {};
export default KeyToTileXYZ;