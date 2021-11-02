import LZString from '../../utils/lzstring/lz-string.min.js';

var Zip = function (obj) {
    var s = JSON.stringify(obj);
    return LZString.compress(s);
}

var Unzip = function (s) {
    s = LZString.decompress(s);
    return JSON.parse(s);
}

export { Zip, Unzip };