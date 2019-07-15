class ColorBuffer {
    constructor(size) {
        this.resize(size);
    }

    get(offset) {
        return this._colors[offset];
    }

    set(offset, value) {
        this._colors[offset] = value;
        return this;
    }

    fill(value) {
        for (var i = 0, cnt = this._rows; i < cnt; i++) {
            this._colors[i] = value;
        }
        return this;
    }

    resize(size) {
        if (size !== this._rows) {
            this._rows = size;
            this._buf = new ArrayBuffer(this._rows);
            this._colors = new Uint32Array(this._buf);
        }
        return this;
    }
}

var globColor;
ColorBuffer.FillCallback = function (imgData, imgDataIndex) {
    if (globColor === undefined) {
        globColor = new Phaser.Display.Color();
    }
    globColor.setTo(imgData[0], imgData[1], imgData[2], imgData[3]);
    return globColor.color;
}

export default ColorBuffer;