class FourBytesBuffer {
    _buf: any;
    _colors: any;
    _rows: any;

    constructor(size?: any) {
        this.resize(size);
    }

    destroy() {
        this._rows = undefined;
        this._buf = undefined;
        this._colors = undefined;
    }

    get(offset?: any) {
        return this._colors[offset];
    }

    set(offset?: any, value?: any) {
        this._colors[offset] = value;
        return this;
    }

    fill(value?: any) {
        for (var i = 0, cnt = this._rows; i < cnt; i++) {
            this._colors[i] = value;
        }
        return this;
    }

    resize(size?: any) {
        if (size !== this._rows) {
            this._rows = size;
            this._buf = new ArrayBuffer(this._rows * 4);
            this._colors = new Uint32Array(this._buf);
        }
        return this;
    }
}

export default FourBytesBuffer;