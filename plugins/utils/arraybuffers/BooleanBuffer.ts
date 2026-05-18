const COLS = 8;
const SHIFT = 3;

class BooleanBuffer {
    _bin: any;
    _buf: any;
    _rows: any;

    constructor(size?: any) {
        this.resize(size);
    }

    destroy() {
        this._rows = undefined;
        this._buf = undefined;
        this._bin = undefined;
    }

    get(offset?: any) {
        var row = offset >> SHIFT;
        var col = offset % COLS;
        var bit = 1 << col;
        return (this._bin[row] & bit) > 0;
    }

    set(offset?: any, value?: any) {
        var row = offset >> SHIFT;
        var col = offset % COLS;
        var bit = 1 << col;
        if (value?: any) {
            this._bin[row] |= bit;
        } else {
            bit = 255 ^ bit;
            this._bin[row] &= bit;
        }
        return this;
    }

    fill(value?: any) {
        value = (value) ? 255 : 0;
        for (var i = 0, cnt = this._rows; i < cnt; i++) {
            this._bin[i] = value;
        }
        return this;
    }

    resize(size?: any) {
        var rows = (size >> SHIFT) + 1;
        if (rows !== this._rows) {
            this._rows = rows;
            this._buf = new ArrayBuffer(this._rows);
            this._bin = new Uint8Array(this._buf);
        }
        return this;
    }
}

export default BooleanBuffer;