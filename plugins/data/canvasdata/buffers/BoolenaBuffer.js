const COLS = 8;
const SHIFT = 3;

class BoolenaBuffer {
    constructor(size) {
        this.resize(size);
    }

    get(offset) {
        var row = offset >> SHIFT;
        var col = offset % COLS;
        var bit = 1 << col;
        return (this._bin[row] & bit) > 0;
    }

    set(offset, value) {
        var row = offset >> SHIFT;
        var col = offset % COLS;
        var bit = 1 << col;
        if (value) {
            this._bin[row] |= bit;
        } else {
            bit = 255 ^ bit;
            this._bin[row] &= bit;
        }
        return this;
    }

    flip(offset) {
        var row = Math.floor(offset / COLS);
        var col = offset % COLS;
        var bit = 1 << col;
        this._bin[row] ^= bit;
        return this;
    }

    fill(value) {
        value = (value) ? 255 : 0;
        for (var i = 0, cnt = this._rows; i < cnt; i++) {
            this._bin[i] = value;
        }
        return this;
    }

    resize(size) {
        var rows = (size >> SHIFT) + 1;
        if (rows !== this._rows) {
            this._rows = rows;
            this._buf = new ArrayBuffer(this._rows);
            this._bin = new Uint8Array(this._buf);
        }
        return this;
    }
}

BoolenaBuffer.FillCallback = function (imgData, i) {
    return (imgData[i + 3] > 0);
}

export default BoolenaBuffer;