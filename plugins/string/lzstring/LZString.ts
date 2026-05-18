import lzstringBase from '../../utils/lzstring/lz-string.min';

import { Utils as PhaserUtils } from 'phaser';
const GetFastValue = PhaserUtils.Objects.GetFastValue;

class LZString {
    constructor(config?: any) {
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o?: any) {
        this.setEncoding(GetFastValue(o, 'encoding', 0));
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            encoding: this.encoding
        };
    }

    setEncoding(m?: any) {
        if (m === undefined) {
            m = 0;
        } else if (typeof (m) === 'string') {
            m = ENCODINGMAP[m.toLowerCase()] || 0;
        }
        this.encoding = m;
        return this;
    }

    compress(s?: any) {
        var fnName = COMPRESSFNNAME[this.encoding];
        return lzstringBase[fnName](s);
    }

    decompress(s?: any) {
        var fnName = DECOMPRESSFNNAME[this.encoding];
        return lzstringBase[fnName](s);
    }
}

const ENCODINGMAP = {
    none: 0,
    base64: 1,
    utf16: 2,
    uri: 3
};

const COMPRESSFNNAME = [
    'compress',
    'compressToBase64',
    'compressToUTF16',
    'compressToEncodedURIComponent'
];
const DECOMPRESSFNNAME = [
    'decompress',
    'decompressFromBase64',
    'decompressFromUTF16',
    'decompressFromEncodedURIComponent'
];

export default LZString;