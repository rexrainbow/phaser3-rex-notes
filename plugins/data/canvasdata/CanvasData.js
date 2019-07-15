import BooleanBuffer from './buffers/BoolenaBuffer.js';

class CanvasData {
    constructor(width, height, BufferClass) {
        if (width === undefined) {
            width = 0;
        } else if (typeof (width) !== 'number') {
            var canvas = width;
            BufferClass = height;
            width = canvas.width;
            height = canvas.height;
        }
        if (height === undefined) {
            height = width;
        }
        if (BufferClass === undefined) {
            BufferClass = BooleanBuffer;
        }

        this.width = width;
        this.height = height;
        this.buffer = new BufferClass(width * height);
    }

    getOffset(x, y) {
        return y * this.width + x;
    }

    get(x, y) {
        var offset
        if (arguments.length === 2) {
            offset = this.getOffset(x, y);
        } else {
            offset = x;
        }
        return this.buffer.get(offset);
    }

    set(x, y, value) {
        var offset
        if (arguments.length === 3) {
            offset = this.getOffset(x, y);
        } else {
            offset = x;
            value = y;
        }
        this.buffer.set(offset, value);
        return this;
    }

    fill(canvas, callback, scope) {
        if (typeof (canvas) === 'number') {
            var value = canvas;
            this.buffer.fill(value);

        } else {
            this.resize(canvas);
            var context = canvas.getContext('2d');
            var imgData = context.getImageData(0, 0, this.width, this.height).data;
            var pixels = imgData.length, imgDataIndex;
            var value;
            for (var i = 0, cnt = pixels / 4; i < cnt; i++) {
                imgDataIndex = i * 4;
                if (scope) {
                    value = callback.call(scope, imgData, imgDataIndex);
                } else {
                    value = callback(imgData, imgDataIndex);
                }
                this.set(i, value);
            }
        }

        return this;
    }

    clear() {
        this.fill(0);
        return this;
    }

    resize(width, height) {
        if (typeof (width) !== 'number') {
            var canvas = width;
            width = canvas.width;
            height = canvas.height;
        }
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        this.width = width;
        this.height = height;
        this.buffer.resize(width * height);
        return this;
    }

    forEach(callback, scope) {
        var value;
        for (var y = 0, h = this.height; y < h; y++) {
            for (var x = 0, w = this.width; x < w; x++) {
                value = this.get(x, y);
                if (scope) {
                    callback.call(scope, value, x, y, this);
                } else {
                    callback(value, x, y, this);
                }
            }
        }
        return this;
    }
};

export default CanvasData;