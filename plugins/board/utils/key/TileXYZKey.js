var TileXYToKey = function (tileX, tileY, separator) {
    if (separator === undefined) {
        separator = ',';
    }
    return tileX + separator + tileY;
}

var TileXYZToKey = function (tileX, tileY, tileZ, separator) {
    if (separator === undefined) {
        separator = ',';
    }
    return tileX + separator + tileY + separator + tileZ;
}

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

export {
    TileXYToKey,
    TileXYZToKey,
    KeyToTileXYZ
};