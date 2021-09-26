import LZString from '../lzstring/lz-string.min.js';

// Serialize then compress
var Serialize = function (db, compress) {
    if (compress === undefined) {
        compress = true;
    }
    var s = db.serialize();
    if (compress) {
        s = LZString.compress(s);
    }
    return s;
}

// Decompress then deserialize, load into db
var Deserialize = function (db, s, decompress) {
    if (decompress === undefined) {
        decompress = true;
    }
    if (decompress) {
        s = LZString.decompress(s);
    }
    db.loadJSON(s);
    return db;
}

export { Serialize, Deserialize };