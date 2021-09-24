import LZString from '../lzstring/lz-string.min.js';

// Serialize then compress
var Serialize = function (db) {
    return LZString.compress(db.serialize());
}

// Decompress then deserialize, load into db
var Deserialize = function (db, s) {
    db.loadJSON(LZString.decompress(s));
    return db;
}

export { Serialize, Deserialize };