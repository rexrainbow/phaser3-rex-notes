import LZString from '../lzstring/lz-string.min';

// Serialize then compress
var Serialize = function(db?: any, compress?: any) {
    if ((compress === undefined) || (compress === true)) {
        compress = 'compress';
    }
    var s = db.serialize();
    if (compress?: any) {
        s = LZString[compress](s);
    }
    return s;
}

// Decompress then deserialize, load into db
var Deserialize = function(db?: any, s?: any, decompress?: any) {
    if ((decompress === undefined) || (decompress === true)) {
        decompress = 'decompress';
    }
    if (decompress?: any) {
        s = LZString[decompress](s);
    }
    db.loadJSON(s);
    return db;
}

export { Serialize, Deserialize };